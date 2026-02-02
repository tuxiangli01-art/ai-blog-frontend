import Link from 'next/link';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';

interface PostCardProps {
    post: {
        slug: string;
        title: string;
        excerpt: string | null;
        createdAt: Date | string;
        coverImage?: string | null;
        tags?: { id: string; name: string }[];
        category?: { name: string } | null;
    }
}

export default function PostCard({ post }: PostCardProps) {
    return (
        <Link href={`/blog/${post.slug}`} style={{ display: 'block' }}>
            <div style={{
                border: '1px solid var(--border)',
                borderRadius: '8px',
                overflow: 'hidden',
                transition: 'transform 0.2s',
                background: 'var(--secondary)',
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
            }} className="post-card text-white">
                {post.coverImage && (
                    <div style={{ height: '200px', background: `url(${post.coverImage}) center/cover no-repeat` }} />
                )}
                {!post.coverImage && (
                    <div style={{ height: '200px', background: 'linear-gradient(45deg, #111, #222)' }} />
                )}
                <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ fontSize: '0.8rem', color: 'var(--primary)', marginBottom: '8px', fontWeight: 600 }}>
                        {post.category?.name || '未分类'}
                    </div>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '10px', lineHeight: '1.4' }}>{post.title}</h3>
                    <p style={{ color: '#aaa', fontSize: '0.95rem', marginBottom: '15px', lineHeight: '1.6', flex: 1 }}>
                        {post.excerpt || '暂无描述'}
                    </p>

                    <div className="flex items-center justify-between" style={{ fontSize: '0.85rem', color: '#666', marginTop: 'auto' }}>
                        <div>{format(new Date(post.createdAt), 'yyyy年MM月dd日', { locale: zhCN })}</div>
                    </div>

                    {post.tags && post.tags.length > 0 && (
                        <div className="flex gap-10 mt-20" style={{ flexWrap: 'wrap' }}>
                            {post.tags.slice(0, 3).map(tag => (
                                <span key={tag.id} style={{
                                    background: '#1a1a1a',
                                    padding: '2px 8px',
                                    borderRadius: '4px',
                                    fontSize: '0.75rem',
                                    color: '#999'
                                }}>
                                    #{tag.name}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </Link>
    )
}
