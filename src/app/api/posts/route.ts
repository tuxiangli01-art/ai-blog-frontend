import { NextRequest, NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { sessionOptions, SessionData } from "@/lib/session";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
    const session = await getIronSession<SessionData>(await cookies(), sessionOptions);
    const isLoggedIn = session.user?.isLoggedIn;

    if (isLoggedIn) {
        const posts = await prisma.post.findMany({
            orderBy: { createdAt: 'desc' }
        });
        return NextResponse.json(posts);
    } else {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
}


export async function POST(request: NextRequest) {
    const session = await getIronSession<SessionData>(await cookies(), sessionOptions);
    if (!session.user?.isLoggedIn) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await request.json();
    const { title, slug, content, excerpt, coverImage, published, categoryId, tags } = data;

    try {
        const post = await prisma.post.create({
            data: {
                title,
                slug,
                content,
                excerpt,
                coverImage,
                published,
                authorId: session.user.id,
                categoryId: categoryId || undefined,
                tags: tags && Array.isArray(tags) ? {
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
        return NextResponse.json({ error: "Failed to create post." }, { status: 500 });
    }
}
