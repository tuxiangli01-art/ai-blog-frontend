"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        const res = await fetch("/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        if (res.ok) {
            router.push("/admin/dashboard");
            router.refresh();
        } else {
            setError("邮箱或密码错误 (Invalid email or password)");
        }
    };

    const commonInputStyle = {
        width: '100%',
        padding: '12px',
        borderRadius: '6px',
        border: '1px solid #444',
        background: '#1a1a1a', // Ensure consistent lighter dark background
        color: '#fff',
        fontSize: '1rem',
        outline: 'none'
    };

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '80vh'
        }}>
            <div style={{
                width: '100%',
                maxWidth: '420px',
                padding: '40px',
                background: 'var(--secondary)',
                borderRadius: '12px',
                border: '1px solid var(--border)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
            }}>
                <h1 className="text-center" style={{ marginBottom: '10px', fontWeight: 'bold', fontSize: '1.8rem' }}>管理员登录</h1>
                <p className="text-center" style={{ color: '#888', marginBottom: '30px' }}>Admin Dashboard Login</p>

                {error && (
                    <div style={{ color: '#ef4444', marginBottom: '20px', padding: '10px', background: 'rgba(239,68,68,0.1)', borderRadius: '4px', textAlign: 'center' }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-20">
                        <label style={{ display: 'block', marginBottom: '8px', color: '#ccc', fontWeight: 'bold' }}>邮箱 (Email)</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={commonInputStyle}
                            placeholder="admin@nolan.com"
                            required
                        />
                    </div>
                    <div className="mb-20">
                        <label style={{ display: 'block', marginBottom: '8px', color: '#ccc', fontWeight: 'bold' }}>密码 (Password)</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={commonInputStyle}
                            placeholder="••••••••"
                            required
                        />
                    </div>
                    <button type="submit" className="btn" style={{ width: '100%', padding: '12px', fontSize: '1rem', marginTop: '10px' }}>
                        登录系统 (Login)
                    </button>
                </form>
            </div>
        </div>
    );
}
