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
    const data = await request.json();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id: _, authorId, createdAt, updatedAt, tags, categoryId, ...updateData } = data;

    try {
        const post = await prisma.post.update({
            where: { id },
            data: {
                ...updateData,
                categoryId: categoryId || null,
                tags: tags && Array.isArray(tags) ? {
                    set: [], // Disconnect all current tags
                    connectOrCreate: tags.map((t: string) => {
                        const tagSlug = t.trim().toLowerCase().replace(/\s+/g, '-');
                        return {
                            where: { slug: tagSlug },
                            create: { name: t.trim(), slug: tagSlug }
                        }
                    })
                } : undefined
            }
        });
        return NextResponse.json(post);
    } catch (e) {
        console.error(e);
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
        await prisma.post.delete({ where: { id } });
        return NextResponse.json({ success: true });
    } catch (e) {
        return NextResponse.json({ error: "Delete failed" }, { status: 500 });
    }
}

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await getIronSession<SessionData>(await cookies(), sessionOptions);
    if (!session.user?.isLoggedIn) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const post = await prisma.post.findUnique({
        where: { id },
        include: {
            tags: true,
            category: true
        }
    });
    return NextResponse.json(post);
}
