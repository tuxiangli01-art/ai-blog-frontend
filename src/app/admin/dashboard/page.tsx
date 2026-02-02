import Link from "next/link";
import prisma from "@/lib/prisma";
import { getIronSession } from "iron-session";
import { sessionOptions, SessionData } from "@/lib/session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import DeleteButton from "./DeleteButton";

export default async function DashboardPage() {
    const session = await getIronSession<SessionData>(await cookies(), sessionOptions);
    if (!session.user?.isLoggedIn) {
        redirect("/admin/login");
    }

    const posts = await prisma.post.findMany({
        orderBy: { createdAt: "desc" },
    });

    return (
        <div>
            <div className="flex justify-between items-center mb-40">
                <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>文章管理 (Manage Posts)</h1>
                <Link href="/admin/posts/new" className="btn" style={{ padding: '10px 20px' }}>
                    + 新建文章 (New Post)
                </Link>
            </div>

            <div style={{ background: 'var(--secondary)', borderRadius: '8px', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid var(--border)', background: '#111' }}>
                            <th style={{ padding: '15px', color: '#ccc' }}>文章标题 (Title)</th>
                            <th style={{ padding: '15px', color: '#ccc' }}>状态 (Status)</th>
                            <th style={{ padding: '15px', color: '#ccc' }}>发布日期 (Date)</th>
                            <th style={{ padding: '15px', textAlign: 'right', color: '#ccc' }}>操作 (Actions)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.map(post => (
                            <tr key={post.id} style={{ borderBottom: '1px solid var(--border)' }}>
                                <td style={{ padding: '15px' }}>
                                    <div style={{ fontWeight: '500', fontSize: '1.05rem' }}>{post.title}</div>
                                    <div style={{ fontSize: '0.8rem', color: '#666' }}>/{post.slug}</div>
                                </td>
                                <td style={{ padding: '15px' }}>
                                    <span style={{
                                        padding: '4px 8px',
                                        borderRadius: '4px',
                                        background: post.published ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                                        color: post.published ? '#34d399' : '#f87171',
                                        fontSize: '0.85rem',
                                        border: post.published ? '1px solid rgba(52, 211, 153, 0.2)' : '1px solid rgba(248, 113, 113, 0.2)'
                                    }}>
                                        {post.published ? '已发布' : '草稿'}
                                    </span>
                                </td>
                                <td style={{ padding: '15px', color: '#888', fontSize: '0.9rem' }}>
                                    {new Date(post.createdAt).toLocaleDateString('zh-CN')}
                                </td>
                                <td style={{ padding: '15px', textAlign: 'right' }}>
                                    <Link href={`/admin/posts/${post.id}/edit`} style={{ marginRight: '15px', color: 'var(--primary)', fontWeight: '500' }}>
                                        编辑
                                    </Link>
                                    <DeleteButton id={post.id} />
                                </td>
                            </tr>
                        ))}
                        {posts.length === 0 && (
                            <tr>
                                <td colSpan={4} style={{ padding: '40px', textAlign: 'center', color: '#666' }}>
                                    暂无文章，点击右上角新建。
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
