"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface ProjectEditorProps {
    initialData?: {
        id?: string;
        name: string;
        description: string;
        image: string;
        url: string;
        techs: string;
        order: number;
    };
    isEditing?: boolean;
}

export default function ProjectEditor({ initialData, isEditing = false }: ProjectEditorProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    // Form States
    const [name, setName] = useState(initialData?.name || "");
    const [description, setDescription] = useState(initialData?.description || "");
    const [image, setImage] = useState(initialData?.image || "");
    const [url, setUrl] = useState(initialData?.url || "");
    const [techs, setTechs] = useState(initialData?.techs || "");
    const [order, setOrder] = useState(initialData?.order || 0);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const projectData = { name, description, image, url, techs, order };

        try {
            const endpoint = isEditing ? `/api/projects/${initialData?.id}` : "/api/projects";
            const method = isEditing ? "PUT" : "POST";

            const res = await fetch(endpoint, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(projectData),
            });

            if (res.ok) {
                router.push("/admin/projects");
                router.refresh();
            } else {
                alert("保存失败 (Save failed)");
            }
        } catch (error) {
            console.error(error);
            alert("发生错误 (Error occurred)");
        } finally {
            setLoading(false);
        }
    };

    const commonInputStyle = {
        width: '100%',
        padding: '12px',
        background: '#1a1a1a',
        border: '1px solid #444',
        borderRadius: '6px',
        color: '#fff',
        fontSize: '1rem',
        outline: 'none'
    };

    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h1 style={{ fontSize: '2rem', marginBottom: '30px', fontWeight: 'bold' }}>
                {isEditing ? "编辑项目 (Edit Project)" : "新建项目 (New Project)"}
            </h1>

            <div className="mb-20">
                <label className="block mb-10" style={{ fontWeight: 'bold', color: '#ccc' }}>项目名称 (Name)</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={commonInputStyle}
                    placeholder="如: 简历优化助手"
                    required
                />
            </div>

            <div className="mb-20">
                <label className="block mb-10" style={{ fontWeight: 'bold', color: '#ccc' }}>项目描述 (Description)</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    style={{ ...commonInputStyle, minHeight: '100px' }}
                    placeholder="简短介绍项目的功能和价值..."
                    required
                />
            </div>

            <div className="mb-20 grid grid-cols-2 gap-4" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                    <label className="block mb-10" style={{ fontWeight: 'bold', color: '#ccc' }}>项目链接 (URL)</label>
                    <input
                        type="text"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        style={commonInputStyle}
                        placeholder="https://..."
                        required
                    />
                </div>
                <div>
                    <label className="block mb-10" style={{ fontWeight: 'bold', color: '#ccc' }}>排序 (Order)</label>
                    <input
                        type="number"
                        value={order}
                        onChange={(e) => setOrder(parseInt(e.target.value))}
                        style={commonInputStyle}
                        placeholder="0"
                    />
                </div>
            </div>

            <div className="mb-20">
                <label className="block mb-10" style={{ fontWeight: 'bold', color: '#ccc' }}>技术栈 (Tech Stack)</label>
                <input
                    type="text"
                    value={techs}
                    onChange={(e) => setTechs(e.target.value)}
                    style={commonInputStyle}
                    placeholder="如: Next.js, OpenAI API, Tailwind CSS (逗号分隔)"
                    required
                />
            </div>

            <div className="mb-40">
                <label className="block mb-10" style={{ fontWeight: 'bold', color: '#ccc' }}>封面图片 URL (Cover Image)</label>
                <input
                    type="text"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    style={commonInputStyle}
                    placeholder="https://example.com/image.jpg"
                />
                {image && (
                    <div style={{ marginTop: '15px', maxWidth: '300px', border: '1px solid #444', borderRadius: '4px', overflow: 'hidden' }}>
                        <img src={image} alt="Preview" style={{ width: '100%', display: 'block' }} />
                    </div>
                )}
            </div>

            <div className="flex gap-4" style={{ gap: '20px', borderTop: '1px solid #333', paddingTop: '30px' }}>
                <button type="submit" className="btn" disabled={loading} style={{ padding: '12px 30px', fontSize: '1rem' }}>
                    {loading ? "正在保存..." : "保存项目"}
                </button>
                <button type="button" className="btn-outline" onClick={() => router.back()} style={{ padding: '12px 30px', fontSize: '1rem' }}>
                    取消
                </button>
            </div>
        </form>
    );
}
