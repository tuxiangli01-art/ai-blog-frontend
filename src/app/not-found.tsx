import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="container" style={{
            padding: '100px 20px',
            textAlign: 'center',
            minHeight: '60vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <h1 style={{ fontSize: '6rem', fontWeight: 900, color: 'var(--primary)', lineHeight: 1 }}>404</h1>
            <h2 style={{ fontSize: '2rem', marginBottom: '20px' }}>页面未找到</h2>
            <p style={{ color: '#888', marginBottom: '40px', maxWidth: '500px' }}>
                你访问的页面似乎已经消失，或者链接有误。
            </p>
            <Link href="/" className="btn">
                返回首页
            </Link>
        </div>
    );
}
