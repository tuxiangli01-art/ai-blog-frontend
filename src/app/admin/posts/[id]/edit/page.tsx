import PostEditor from "@/components/PostEditor";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

interface Props {
    params: Promise<{ id: string }>;
}

export default async function EditPostPage({ params }: Props) {
    const { id } = await params;
    const post = await prisma.post.findUnique({
        where: { id },
    });

    if (!post) {
        notFound();
    }

    return (
        <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '30px' }}>Edit Post</h1>
            <PostEditor post={post} />
        </div>
    );
}
