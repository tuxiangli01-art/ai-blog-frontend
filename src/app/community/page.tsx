import Image from 'next/image';

export const metadata = {
    title: '加入社区 - NOLAN',
    description: '加入 AI 独立开发者社区',
};

export default function CommunityPage() {
    return (
        <div className="container" style={{ padding: '100px 20px', textAlign: 'center' }}>
            <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '20px' }}>加入 Nolan 的社区</h1>
                <p style={{ color: '#aaa', fontSize: '1.2rem', marginBottom: '50px', lineHeight: '1.6' }}>
                    与其独自摸索，不如同频共振。<br />
                    加入我们的微信群，与 500+ 全部关注 AI 应用与独立开发的伙伴一起交流。
                </p>

                <div style={{
                    background: 'white',
                    padding: '20px',
                    borderRadius: '20px',
                    display: 'inline-block',
                    marginBottom: '40px'
                }}>
                    {/* Placeholder for QR Code */}
                    <div style={{
                        width: '250px',
                        height: '250px',
                        background: '#f0f0f0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#333'
                    }}>
                        <img
                            src="https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=https://nolan-blog.com"
                            alt="WeChat QR Code"
                            style={{ width: '100%', height: '100%' }}
                        />
                    </div>
                </div>

                <p style={{ color: '#666', fontSize: '0.9rem' }}>
                    如果二维码过期，请添加我的个人微信：<strong>NolanAI_2025</strong><br />
                    备注：<span style={{ color: 'var(--primary)' }}>AI交流</span>
                </p>
            </div>
        </div>
    );
}
