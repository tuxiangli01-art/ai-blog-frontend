import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getIronSession } from "iron-session";
import { sessionOptions, SessionData } from "@/lib/session";
import { cookies } from "next/headers";

export async function GET() {
    try {
        const tags = await prisma.tag.findMany();
        return NextResponse.json(tags);
    } catch (e) {
        return NextResponse.json({ error: "Failed to fetch tags" }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    const session = await getIronSession<SessionData>(await cookies(), sessionOptions);
    if (!session.user?.isLoggedIn) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name, slug } = await request.json();

    try {
        const tag = await prisma.tag.create({
            data: { name, slug }
        });
        return NextResponse.json(tag);
    } catch (e) {
        return NextResponse.json({ error: "Failed to create tag" }, { status: 500 });
    }
}
