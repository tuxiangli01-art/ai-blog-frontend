import Link from 'next/link';
import PostCard from '@/components/PostCard';
import prisma from '@/lib/prisma';

export const metadata = {
    title: '文章 - NOLAN',
    description: 'AI 学习、实战应用与创业心得',
};

export default async function BlogPage() {
    const posts = await prisma.post.findMany({
        where: { published: true },
        orderBy: { createdAt: 'desc' },
        include: {
            tags: true,
            category: true
        }
    });

    return (
        <div className="container" style={{ padding: '60px 20px' }}>
            <header className="text-center mb-40">
                <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '20px' }}>所有文章</h1>
                <p style={{ color: '#888', maxWidth: '600px', margin: '0 auto' }}>
                    记录 AI 时代的思考与实践，从技术细节到商业逻辑。
                </p>
            </header>

            {posts.length > 0 ? (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                    gap: '30px'
                }}>
                    {posts.map(post => (
                        <PostCard key={post.id} post={post} />
                    ))}
                </div>
            ) : (
                <div className="text-center" style={{ padding: '80px', background: 'var(--secondary)', borderRadius: '8px' }}>
                    <p>暂无文章。</p>
                </div>
            )}
        </div>
    );
}
