import Link from 'next/link';
import prisma from "@/lib/prisma";

export const metadata = {
    title: 'AI 实践项目 - NOLAN',
    description: '我的 AI 落地项目展示',
};

// Revalidate data every 60 seconds or on demand
export const revalidate = 60;

export default async function ProjectsPage() {
    // Fetch projects from database, ordered by 'order' field
    const projects = await prisma.project.findMany({
        orderBy: { order: 'asc' }
    });

    return (
        <div className="container" style={{ padding: '60px 20px' }}>
            <header className="text-center mb-60">
                <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '20px' }}>AI 实战项目</h1>
                <p style={{ color: '#888', maxWidth: '600px', margin: '0 auto' }}>
                    纸上得来终觉浅。这里展示了我利用 AI 技术构建的实际产品和工具，
                    <br />旨在验证 AI 在一人公司模式下的落地潜力。
                </p>
            </header>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                gap: '40px'
            }}>
                {projects.map(project => {
                    // Tech specs are stored as comma separated strings in DB
                    const tags = project.techs ? project.techs.split(/[,\uff0c]/).map(t => t.trim()) : [];

                    return (
                        <div key={project.id} style={{
                            background: 'var(--secondary)',
                            borderRadius: '12px',
                            overflow: 'hidden',
                            border: '1px solid var(--border)',
                            display: 'flex',
                            flexDirection: 'column'
                        }}>
                            <div style={{ height: '200px', position: 'relative' }}>
                                {project.image ? (
                                    <img
                                        src={project.image}
                                        alt={project.name}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                ) : (
                                    <div style={{
                                        width: '100%',
                                        height: '100%',
                                        background: '#222',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: '#444'
                                    }}>
                                        No Image
                                    </div>
                                )}
                            </div>

                            <div style={{ padding: '25px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                <div className="flex gap-10 mb-15">
                                    {tags.map((tag, index) => (
                                        <span key={index} style={{
                                            fontSize: '0.75rem',
                                            color: 'var(--primary)',
                                            background: 'rgba(255, 255, 255, 0.05)',
                                            padding: '2px 8px',
                                            borderRadius: '4px'
                                        }}>
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>{project.name}</h3>
                                <p style={{ color: '#aaa', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '20px', flex: 1 }}>
                                    {project.description}
                                </p>

                                <Link href={project.url} target={project.url.startsWith('http') ? "_blank" : "_self"} className="btn btn-outline" style={{ textAlign: 'center' }}>
                                    查看详情
                                </Link>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
