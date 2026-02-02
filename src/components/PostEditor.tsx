"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Category {
    id: string;
    name: string;
}

interface Tag {
    id: string;
    name: string;
}

interface PostEditorProps {
    post?: {
        id: string;
        title: string;
        slug: string;
        excerpt: string | null;
        content: string;
        coverImage: string | null;
        published: boolean;
        categoryId?: string | null;
        tags?: Tag[];
    };
}

export default function PostEditor({ post }: PostEditorProps) {
    const router = useRouter();
    const [title, setTitle] = useState(post?.title || "");
    const [slug, setSlug] = useState(post?.slug || "");
    const [excerpt, setExcerpt] = useState(post?.excerpt || "");
    const [content, setContent] = useState(post?.content || "");
    const [coverImage, setCoverImage] = useState(post?.coverImage || "");
    const [published, setPublished] = useState(post?.published || false);

    // New State
    const [categories, setCategories] = useState<Category[]>([]);
    const [categoryId, setCategoryId] = useState(post?.categoryId || "");
    const [tagsInput, setTagsInput] = useState(post?.tags?.map(t => t.name).join(", ") || "");

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Fetch categories on mount
        fetch("/api/categories")
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) setCategories(data);
            })
            .catch(err => console.error("Failed to fetch categories", err));
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const tagsArray = tagsInput.split(/[,，]/).map(t => t.trim()).filter(Boolean); // Split by comma (en/cn)

        const data = {
            title,
            slug,
            excerpt,
            content,
            coverImage,
            published,
            categoryId: categoryId || null,
            tags: tagsArray
        };

        const url = post ? `/api/posts/${post.id}` : "/api/posts";
        const method = post ? "PUT" : "POST";

        const res = await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        if (res.ok) {
            router.push("/admin/dashboard");
            router.refresh();
        } else {
            alert("Failed to save post");
            setLoading(false);
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.[0]) return;
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("/api/upload", {
            method: "POST",
            body: formData,
        });

        if (res.ok) {
            const data = await res.json();
            setCoverImage(data.url);
        } else {
            alert("Image upload failed");
        }
    };

    const commonInputStyle = {
        width: '100%',
        padding: '12px',
        background: '#1a1a1a', // Slightly lighter background
        border: '1px solid #444', // Higher contrast border
        borderRadius: '6px',
        color: '#fff',
        fontSize: '1rem',
        outline: 'none',
        transition: 'border-color 0.2s'
    };

    const focusStyle = {
        borderColor: '#fff'
    };

    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div className="mb-20">
                <label className="block mb-10" style={{ fontWeight: 'bold', color: '#ccc' }}>文章标题 (Title)</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    style={commonInputStyle}
                    placeholder="请输入文章标题..."
                    required
                />
            </div>

            <div className="mb-20 grid grid-cols-2 gap-4" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                    <label className="block mb-10" style={{ fontWeight: 'bold', color: '#ccc' }}>URL 别名 (Slug)</label>
                    <input
                        type="text"
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                        style={commonInputStyle}
                        placeholder="例如: ai-learning-guide"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-10" style={{ fontWeight: 'bold', color: '#ccc' }}>发布状态</label>
                    <div className="flex items-center gap-2" style={{ height: '48px', display: 'flex', alignItems: 'center', background: '#1a1a1a', border: '1px solid #444', borderRadius: '6px', padding: '0 15px' }}>
                        <input
                            type="checkbox"
                            checked={published}
                            onChange={(e) => setPublished(e.target.checked)}
                            style={{ marginRight: '10px', transform: 'scale(1.2)', accentColor: 'white' }}
                        />
                        <span>是否公开发布</span>
                    </div>
                </div>
            </div>

            <div className="mb-20 grid grid-cols-2 gap-4" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                    <label className="block mb-10" style={{ fontWeight: 'bold', color: '#ccc' }}>文章分类 (Category)</label>
                    <select
                        value={categoryId}
                        onChange={(e) => setCategoryId(e.target.value)}
                        style={commonInputStyle}
                    >
                        <option value="">-- 请选择分类 --</option>
                        {categories.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block mb-10" style={{ fontWeight: 'bold', color: '#ccc' }}>标签 (Tags)</label>
                    <input
                        type="text"
                        value={tagsInput}
                        onChange={(e) => setTagsInput(e.target.value)}
                        placeholder="例如: AI, 效率工具, 创业 (用逗号分隔)"
                        style={commonInputStyle}
                    />
                </div>
            </div>

            <div className="mb-20">
                <label className="block mb-10" style={{ fontWeight: 'bold', color: '#ccc' }}>文章摘要 (Excerpt)</label>
                <textarea
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    style={{ ...commonInputStyle, minHeight: '80px' }}
                    placeholder="简短描述文章内容，将显示在列表页..."
                />
            </div>

            <div className="mb-20">
                <label className="block mb-10" style={{ fontWeight: 'bold', color: '#ccc' }}>封面图片 (Cover Image)</label>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', background: '#1a1a1a', padding: '20px', borderRadius: '6px', border: '1px solid #444' }}>
                    {/* URL Input */}
                    <div>
                        <span style={{ fontSize: '0.9rem', color: '#888', marginBottom: '5px', display: 'block' }}>方式一：输入图片 URL</span>
                        <input
                            type="text"
                            value={coverImage}
                            onChange={(e) => setCoverImage(e.target.value)}
                            placeholder="https://example.com/image.jpg"
                            style={{ ...commonInputStyle, background: '#000' }}
                        />
                    </div>

                    {/* File Upload */}
                    <div>
                        <span style={{ fontSize: '0.9rem', color: '#888', marginBottom: '5px', display: 'block' }}>方式二：上传本地图片</span>
                        <input type="file" onChange={handleImageUpload} style={{ color: '#ccc' }} />
                    </div>
                </div>

                {coverImage && (
                    <div style={{ marginTop: '15px', maxWidth: '300px', border: '1px solid #444', borderRadius: '4px', overflow: 'hidden' }}>
                        <img src={coverImage} alt="Cover Preview" style={{ width: '100%', display: 'block' }} />
                    </div>
                )}
            </div>

            <div className="mb-40">
                <label className="block mb-10" style={{ fontWeight: 'bold', color: '#ccc' }}>正文内容 (Markdown Content)</label>
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    style={{ ...commonInputStyle, minHeight: '500px', fontFamily: 'monospace', lineHeight: '1.6' }}
                    placeholder="# 在这里开始写作..."
                    required
                />
            </div>

            <div className="flex gap-4" style={{ gap: '20px', borderTop: '1px solid #333', paddingTop: '30px' }}>
                <button type="submit" className="btn" disabled={loading} style={{ padding: '12px 30px', fontSize: '1rem' }}>
                    {loading ? "正在保存..." : "保存文章"}
                </button>
                <button type="button" className="btn-outline" onClick={() => router.back()} style={{ padding: '12px 30px', fontSize: '1rem' }}>
                    取消
                </button>
            </div>
        </form>
    );
}
