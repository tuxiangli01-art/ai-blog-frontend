import Link from 'next/link';
import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import ReactMarkdown from 'react-markdown';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';

interface Props {
    params: Promise<{ slug: string }>;
}

async function getPost(slug: string) {
    const post = await prisma.post.findUnique({
        where: { slug },
        include: {
            author: true,
            tags: true,
            category: true
        },
    });
    if (!post) return null;
    return post;
}

export async function generateMetadata({ params }: Props) {
    const { slug } = await params;
    const post = await getPost(slug);
    if (!post) return { title: '未找到文章' };
    return {
        title: `${post.title} - NOLAN`,
        description: post.excerpt,
    };
}

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params;
    const post = await getPost(slug);

    if (!post) {
        notFound();
    }

    return (
        <article className="container" style={{ padding: '60px 20px', maxWidth: '800px' }}>
            <header className="text-center mb-40">
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '15px' }}>
                    {post.category && (
                        <span style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.9rem' }}>
                            {post.category.name}
                        </span>
                    )}
                    <span style={{ color: '#666' }}>•</span>
                    <span style={{ color: '#888', fontSize: '0.9rem' }}>
                        {format(new Date(post.createdAt), 'yyyy年MM月dd日', { locale: zhCN })}
                    </span>
                </div>

                <h1 style={{ fontSize: '2.5rem', fontWeight: 800, lineHeight: '1.3', marginBottom: '30px' }}>
                    {post.title}
                </h1>

                {post.tags.length > 0 && (
                    <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '30px' }}>
                        {post.tags.map(tag => (
                            <span key={tag.id} style={{
                                background: '#1a1a1a',
                                padding: '4px 10px',
                                borderRadius: '20px',
                                fontSize: '0.8rem',
                                color: '#bbb',
                                border: '1px solid #333'
                            }}>
                                #{tag.name}
                            </span>
                        ))}
                    </div>
                )}

                {post.coverImage && (
                    <div style={{
                        marginTop: '30px',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        border: '1px solid var(--border)'
                    }}>
                        <img src={post.coverImage} alt={post.title} style={{ width: '100%', display: 'block' }} />
                    </div>
                )}
            </header>

            <div className="markdown-content" style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#ddd' }}>
                <ReactMarkdown>{post.content}</ReactMarkdown>
            </div>

            <div style={{ marginTop: '80px', borderTop: '1px solid var(--border)', paddingTop: '40px', textAlign: 'center' }}>
                <Link href="/blog" className="btn btn-outline" style={{ display: 'inline-flex', gap: '10px' }}>
                    &larr; 返回文章列表
                </Link>
            </div>
        </article>
    );
}
