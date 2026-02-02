export default function Footer() {
    return (
        <footer style={{
            padding: '40px 0',
            borderTop: '1px solid var(--border)',
            marginTop: 'auto',
            color: '#888',
            fontSize: '0.9rem'
        }}>
            <div className="container text-center">
                <p>&copy; {new Date().getFullYear()} NOLAN. 保留所有权利。</p>
                <p style={{ marginTop: '5px' }}>专注于 AI 学习、实战应用与一人公司创业。</p>
            </div>
        </footer>
    )
}
