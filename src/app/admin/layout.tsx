"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();

    const handleLogout = async () => {
        await fetch("/api/logout", { method: "POST" });
        router.push("/admin/login");
        router.refresh();
    };

    // Don't show sidebar on login page
    if (pathname === '/admin/login') {
        return <>{children}</>;
    }

    const navItems = [
        { name: '仪表盘 (Dashboard)', href: '/admin/dashboard', icon: '📊' },
        { name: '文章管理 (Posts)', href: '/admin/dashboard', icon: '📝' }, // Dashboard is the post list
        { name: '分类管理 (Categories)', href: '/admin/categories', icon: '📁' },
        { name: '标签管理 (Tags)', href: '/admin/tags', icon: '🏷️' },
        { name: '项目管理 (Projects)', href: '/admin/projects', icon: '🚀' },
        { name: '系统设置 (Settings)', href: '/admin/settings', icon: '⚙️' },
    ];

    return (
        <div style={{ minHeight: '100vh', display: 'flex', background: '#000', color: '#fff' }}>
            {/* Sidebar */}
            <aside style={{
                width: '260px',
                background: '#111',
                borderRight: '1px solid #333',
                display: 'flex',
                flexDirection: 'column',
                position: 'fixed',
                height: '100vh',
                left: 0,
                top: 0,
                zIndex: 10
            }}>
                <div style={{ padding: '20px', borderBottom: '1px solid #333' }}>
                    <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#fff' }}>NOLAN Admin</h2>
                    <Link href="/" target="_blank" style={{ fontSize: '0.8rem', color: '#888', textDecoration: 'none', display: 'block', marginTop: '5px' }}>
                        查看站点 (View Site) &nearr;
                    </Link>
                </div>

                <nav style={{ flex: 1, padding: '20px 10px' }}>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        {navItems.map((item) => {
                            const isActive = pathname === item.href || (item.href !== '/admin/dashboard' && pathname.startsWith(item.href));
                            return (
                                <li key={item.name} style={{ marginBottom: '5px' }}>
                                    <Link href={item.href} style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        padding: '12px 15px',
                                        borderRadius: '8px',
                                        color: isActive ? '#fff' : '#888',
                                        background: isActive ? 'var(--primary)' : 'transparent',
                                        textDecoration: 'none',
                                        transition: 'all 0.2s',
                                        fontSize: '0.95rem'
                                    }}>
                                        <span style={{ marginRight: '10px' }}>{item.icon}</span>
                                        {item.name}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                <div style={{ padding: '20px', borderTop: '1px solid #333' }}>
                    <button
                        onClick={handleLogout}
                        style={{
                            width: '100%',
                            padding: '10px',
                            background: '#1a1a1a',
                            border: '1px solid #333',
                            color: '#ef4444',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            transition: 'background 0.2s'
                        }}
                    >
                        退出登录 (Logout)
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main style={{
                flex: 1,
                marginLeft: '260px', // Offset for sidebar
                padding: '40px',
                maxWidth: '1200px',
                width: '100%'
            }}>
                {children}
            </main>
        </div>
    );
}
