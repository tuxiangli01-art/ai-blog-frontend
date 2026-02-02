"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
    const router = useRouter();
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(null);

        if (newPassword !== confirmPassword) {
            setMessage({ type: 'error', text: '两次输入的新密码不一致 (Passwords do not match)' });
            return;
        }

        setLoading(true);

        try {
            const res = await fetch("/api/user/password", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ currentPassword, newPassword }),
            });

            if (res.ok) {
                setMessage({ type: 'success', text: '密码修改成功，请重新登录 (Password updated, please login again)' });
                setTimeout(() => {
                    // Redirect to login or just clear form
                    router.push('/admin/login');
                }, 2000);
            } else {
                const data = await res.json();
                setMessage({ type: 'error', text: data.error || '修改失败' });
            }
        } catch (error) {
            setMessage({ type: 'error', text: '请求发生错误' });
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
        <div style={{ maxWidth: '600px' }}>
            <h1 style={{ fontSize: '2rem', marginBottom: '30px', fontWeight: 'bold' }}>系统设置 (Settings)</h1>

            <div style={{ background: '#111', padding: '30px', borderRadius: '8px', border: '1px solid #333' }}>
                <h2 style={{ marginBottom: '25px', fontSize: '1.3rem', borderBottom: '1px solid #333', paddingBottom: '10px' }}>修改密码 (Change Password)</h2>

                {message && (
                    <div style={{
                        padding: '10px',
                        borderRadius: '4px',
                        marginBottom: '20px',
                        background: message.type === 'success' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                        color: message.type === 'success' ? '#34d399' : '#f87171',
                        border: `1px solid ${message.type === 'success' ? 'rgba(52, 211, 153, 0.2)' : 'rgba(248, 113, 113, 0.2)'}`
                    }}>
                        {message.text}
                    </div>
                )}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '8px', color: '#ccc' }}>当前密码 (Current Password)</label>
                        <input
                            type="password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            style={commonInputStyle}
                            required
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '8px', color: '#ccc' }}>新密码 (New Password)</label>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            style={commonInputStyle}
                            required
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '8px', color: '#ccc' }}>确认新密码 (Confirm New Password)</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            style={commonInputStyle}
                            required
                        />
                    </div>

                    <div style={{ paddingTop: '20px' }}>
                        <button
                            type="submit"
                            className="btn"
                            disabled={loading}
                            style={{ padding: '12px 30px', fontSize: '1rem' }}
                        >
                            {loading ? "提交中..." : "修改密码 (Update Password)"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
