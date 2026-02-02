import Link from 'next/link';
import PostCard from '@/components/PostCard';
import prisma from '@/lib/prisma';

async function getLatestPosts() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
    take: 6,
    include: {
      tags: true,
      category: true
    }
  });
  return posts;
}

export default async function Home() {
  const posts = await getLatestPosts();

  return (
    <div>
      {/* Hero Section */}
      <section style={{
        padding: '120px 0',
        textAlign: 'center',
        background: 'radial-gradient(circle at center, #1a1a1a 0%, #0a0a0a 70%)'
      }}>
        <div className="container">
          <h1 style={{ fontSize: '3.5rem', fontWeight: 800, marginBottom: '20px', letterSpacing: '-1px' }}>
            专注 <span style={{ color: 'var(--primary)' }}>AI学习</span> 与 <span style={{ color: 'var(--primary)' }}>AI实践应用</span>
          </h1>
          <p style={{ fontSize: '1.3rem', color: '#b0b0b0', maxWidth: '700px', margin: '0 auto 40px', lineHeight: '1.6' }}>
            探索人工智能的实际应用，分享独立开发的实战经验。
            <br />即便是一个人，也能构建出具有影响力的产品。
          </p>
          <div className="flex" style={{ gap: '20px', justifyContent: 'center' }}>
            <Link href="/blog" className="btn">
              阅读文章
            </Link>
            <Link href="/about" className="btn btn-outline">
              关于我
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Posts */}
      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <div className="flex justify-between items-center mb-40">
            <h2 style={{ fontSize: '2rem', fontWeight: 'bold' }}>最新发布</h2>
            <Link href="/blog" style={{ color: 'var(--primary)', fontWeight: 500 }}>
              查看全部 &rarr;
            </Link>
          </div>

          {posts.length > 0 ? (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '30px'
            }}>
              {posts.map(post => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center" style={{ padding: '50px', background: 'var(--secondary)', borderRadius: '8px' }}>
              <p>暂无文章发布。</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
