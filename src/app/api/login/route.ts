import { NextRequest, NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { sessionOptions, SessionData } from "@/lib/session";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
    const { email, password } = await request.json();

    const user = await prisma.user.findUnique({
        where: { email },
    });

    if (!user) {
        return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
        return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const session = await getIronSession<SessionData>(await cookies(), sessionOptions);
    session.user = {
        id: user.id,
        email: user.email,
        name: user.name || "",
        isLoggedIn: true,
    };
    await session.save();

    return NextResponse.json({ success: true });
}
