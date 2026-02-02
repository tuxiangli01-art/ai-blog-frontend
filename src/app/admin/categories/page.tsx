"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Category {
    id: string;
    name: string;
    slug: string;
}

export default function CategoriesPage() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState("");
    const [slug, setSlug] = useState("");
    const [editingId, setEditingId] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        const res = await fetch("/api/categories");
        const data = await res.json();
        setCategories(data);
        setLoading(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (editingId) {
            const res = await fetch(`/api/categories/${editingId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, slug }),
            });
            if (res.ok) {
                setEditingId(null);
                setName("");
                setSlug("");
                fetchCategories();
            }
        } else {
            const res = await fetch("/api/categories", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, slug }),
            });
            if (res.ok) {
                setName("");
                setSlug("");
                fetchCategories();
            }
        }
    };

    const handleEdit = (cat: Category) => {
        setEditingId(cat.id);
        setName(cat.name);
        setSlug(cat.slug);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("确定要删除这个分类吗？删除后相关文章通过该分类将找不到 (Delete category?)")) return;

        const res = await fetch(`/api/categories/${id}`, {
            method: "DELETE",
        });

        if (res.ok) {
            fetchCategories();
        } else {
            alert("删除失败");
        }
    };

    const commonInputStyle = {
        padding: '10px',
        background: '#1a1a1a',
        border: '1px solid #444',
        borderRadius: '6px',
        color: '#fff',
        outline: 'none',
        width: '100%'
    };

    return (
        <div>
            <h1 style={{ fontSize: '2rem', marginBottom: '30px', fontWeight: 'bold' }}>分类管理 (Categories)</h1>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '40px' }}>
                {/* Form Section */}
                <div style={{ background: '#111', padding: '20px', borderRadius: '8px', height: 'fit-content', border: '1px solid #333' }}>
                    <h2 style={{ marginBottom: '20px', fontSize: '1.2rem' }}>{editingId ? "编辑分类" : "新建分类"}</h2>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '5px', color: '#888', fontSize: '0.9rem' }}>名称 (Name)</label>
                            <input
                                type="text"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                style={commonInputStyle}
                                placeholder="如: AI 实践"
                                required
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '5px', color: '#888', fontSize: '0.9rem' }}>Slug (URL别名)</label>
                            <input
                                type="text"
                                value={slug}
                                onChange={e => setSlug(e.target.value)}
                                style={commonInputStyle}
                                placeholder="如: ai-practice"
                                required
                            />
                        </div>

                        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                            <button type="submit" className="btn" style={{ flex: 1 }}>
                                {editingId ? "更新 (Update)" : "创建 (Create)"}
                            </button>
                            {editingId && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setEditingId(null);
                                        setName("");
                                        setSlug("");
                                    }}
                                    style={{ padding: '10px', background: '#333', border: 'none', borderRadius: '6px', color: '#fff', cursor: 'pointer' }}
                                >
                                    取消
                                </button>
                            )}
                        </div>
                    </form>
                </div>

                {/* List Section */}
                <div>
                    {loading ? (
                        <p>加载中...</p>
                    ) : (
                        <div style={{ background: '#111', borderRadius: '8px', border: '1px solid #333', overflow: 'hidden' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                                <thead>
                                    <tr style={{ borderBottom: '1px solid #333', background: '#151515' }}>
                                        <th style={{ padding: '15px', color: '#888' }}>名称</th>
                                        <th style={{ padding: '15px', color: '#888' }}>Slug</th>
                                        <th style={{ padding: '15px', textAlign: 'right', color: '#888' }}>操作</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {categories.map(cat => (
                                        <tr key={cat.id} style={{ borderBottom: '1px solid #333' }}>
                                            <td style={{ padding: '15px' }}>{cat.name}</td>
                                            <td style={{ padding: '15px', color: '#666' }}>{cat.slug}</td>
                                            <td style={{ padding: '15px', textAlign: 'right' }}>
                                                <button
                                                    onClick={() => handleEdit(cat)}
                                                    style={{ marginRight: '15px', color: 'var(--primary)', background: 'none', border: 'none', cursor: 'pointer' }}
                                                >
                                                    编辑
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(cat.id)}
                                                    style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer' }}
                                                >
                                                    删除
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {categories.length === 0 && (
                                        <tr>
                                            <td colSpan={3} style={{ padding: '30px', textAlign: 'center', color: '#666' }}>暂无分类</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
