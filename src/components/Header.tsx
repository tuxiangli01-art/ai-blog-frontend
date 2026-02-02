import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
    return (
        <header style={{
            padding: '20px 0',
            borderBottom: '1px solid var(--border)',
            position: 'sticky',
            top: 0,
            background: 'rgba(10, 10, 10, 0.8)',
            backdropFilter: 'blur(10px)',
            zIndex: 100
        }}>
            <div className="container flex items-center justify-between">
                <Link href="/" className="flex items-center" style={{ gap: '15px' }}>
                    <Image
                        src="/logo.png"
                        alt="NOLAN Logo"
                        width={40}
                        height={40}
                        style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
                    />
                    <span style={{ fontSize: '1.2rem', fontWeight: 'bold', letterSpacing: '-0.5px' }}>NOLAN</span>
                </Link>
                <nav className="flex" style={{ gap: '20px' }}>
                    <Link href="/">首页</Link>
                    <Link href="/blog">文章</Link>
                    <Link href="/projects">实践</Link>
                    <Link href="/community">社区</Link>
                    <Link href="/about">关于我</Link>
                </nav>
            </div>
        </header>
    )
}
