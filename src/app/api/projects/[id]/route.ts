import { NextRequest, NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { sessionOptions, SessionData } from "@/lib/session";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await getIronSession<SessionData>(await cookies(), sessionOptions);
    if (!session.user?.isLoggedIn) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const { name, description, image, url, techs, order } = await request.json();

    try {
        const project = await prisma.project.update({
            where: { id },
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
    } catch (e) {
        return NextResponse.json({ error: "Update failed" }, { status: 500 });
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await getIronSession<SessionData>(await cookies(), sessionOptions);
    if (!session.user?.isLoggedIn) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    try {
        await prisma.project.delete({ where: { id } });
        return NextResponse.json({ success: true });
    } catch (e) {
        return NextResponse.json({ error: "Delete failed" }, { status: 500 });
    }
}
