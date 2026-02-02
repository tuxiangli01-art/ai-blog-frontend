import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getIronSession } from "iron-session";
import { sessionOptions, SessionData } from "@/lib/session";
import { cookies } from "next/headers";

export async function GET() {
    try {
        const categories = await prisma.category.findMany();
        return NextResponse.json(categories);
    } catch (e) {
        return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    const session = await getIronSession<SessionData>(await cookies(), sessionOptions);
    if (!session.user?.isLoggedIn) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name, slug } = await request.json();

    try {
        const category = await prisma.category.create({
            data: { name, slug }
        });
        return NextResponse.json(category);
    } catch (e) {
        return NextResponse.json({ error: "Failed to create category" }, { status: 500 });
    }
}
