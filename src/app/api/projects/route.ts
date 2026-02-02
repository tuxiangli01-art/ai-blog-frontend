import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getIronSession } from "iron-session";
import { sessionOptions, SessionData } from "@/lib/session";
import { cookies } from "next/headers";

export async function GET() {
    try {
        // Double check prisma presence just in case
        if (!prisma.project) {
            console.error("CRITICAL: prisma.project is undefined.");
            return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
        }

        const projects = await prisma.project.findMany({
            orderBy: { order: 'asc' }
        });
        return NextResponse.json(projects);
    } catch (e: any) {
        console.error("API Error in /api/projects:", e);
        return NextResponse.json({ error: String(e?.message || "Failed to fetch projects") }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    const session = await getIronSession<SessionData>(await cookies(), sessionOptions);
    if (!session.user?.isLoggedIn) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { name, description, image, url, techs, order } = await request.json();

        // Basic validation
        if (!name || !description) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const project = await prisma.project.create({
            data: {
                name,
                description,
                image,
                url,
                techs,
                order: parseInt(order) || 0
            }
        });
        return NextResponse.json(project);
    } catch (e: any) {
        console.error("API Error in POST /api/projects:", e);
        return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
    }
}
