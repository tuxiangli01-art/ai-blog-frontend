"use client";

import { useRouter } from "next/navigation";

export default function DeleteButton({ id }: { id: string }) {
    const router = useRouter();

    const handleDelete = async () => {
        if (!confirm("确定要删除这篇文章吗？(Are you sure?)")) return;

        const res = await fetch(`/api/posts/${id}`, {
            method: "DELETE",
        });

        if (res.ok) {
            router.refresh();
        } else {
            alert("删除失败 (Failed to delete)");
        }
    };

    return (
        <button
            onClick={handleDelete}
            title="删除文章"
            style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '0.9rem' }}
        >
            删除
        </button>
    );
}
