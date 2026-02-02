"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Project {
    id: string;
    name: string;
    description: string;
    url: string;
    image: string;
    order: number;
}

export default function ProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        const res = await fetch("/api/projects");
        const data = await res.json();
        if (Array.isArray(data)) {
            setProjects(data);
        } else {
            setProjects([]);
            console.error("Failed to load projects:", data);
        }
        setLoading(false);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("确定要删除这个项目吗？(Delete project?)")) return;

        const res = await fetch(`/api/projects/${id}`, {
            method: "DELETE",
        });

        if (res.ok) {
            fetchProjects();
        } else {
            alert("删除失败");
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-40">
                <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>项目管理 (Projects)</h1>
                <Link href="/admin/projects/new" className="btn" style={{ padding: '10px 20px' }}>
                    + 新建项目 (Add Project)
                </Link>
            </div>

            {loading ? (
                <p>加载中...</p>
            ) : (
                <div style={{ background: '#111', borderRadius: '8px', border: '1px solid #333', overflow: 'hidden' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid #333', background: '#151515' }}>
                                <th style={{ padding: '15px', color: '#888', width: '80px' }}>封面</th>
                                <th style={{ padding: '15px', color: '#888' }}>项目名称</th>
                                <th style={{ padding: '15px', color: '#888' }}>链接 (URL)</th>
                                <th style={{ padding: '15px', color: '#888' }}>排序</th>
                                <th style={{ padding: '15px', textAlign: 'right', color: '#888' }}>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            {projects.map(project => (
                                <tr key={project.id} style={{ borderBottom: '1px solid #333' }}>
                                    <td style={{ padding: '15px' }}>
                                        {project.image && (
                                            <img
                                                src={project.image}
                                                alt={project.name}
                                                style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }}
                                            />
                                        )}
                                    </td>
                                    <td style={{ padding: '15px', fontWeight: 'bold' }}>{project.name}</td>
                                    <td style={{ padding: '15px', color: '#666', fontSize: '0.9rem' }}>
                                        <a href={project.url} target="_blank" rel="noopener noreferrer" style={{ color: '#666', textDecoration: 'none' }}>
                                            {project.url}
                                        </a>
                                    </td>
                                    <td style={{ padding: '15px' }}>{project.order}</td>
                                    <td style={{ padding: '15px', textAlign: 'right' }}>
                                        <Link
                                            href={`/admin/projects/${project.id}/edit`}
                                            style={{ marginRight: '15px', color: 'var(--primary)', fontWeight: '500' }}
                                        >
                                            编辑
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(project.id)}
                                            style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem' }}
                                        >
                                            删除
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {projects.length === 0 && (
                                <tr>
                                    <td colSpan={5} style={{ padding: '40px', textAlign: 'center', color: '#666' }}>
                                        暂无项目，点击右上角新建。
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
