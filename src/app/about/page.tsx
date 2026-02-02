import Image from 'next/image';

export const metadata = {
    title: '关于我 - NOLAN',
    description: '了解更多关于 Nolan 的故事。',
};

export default function AboutPage() {
    return (
        <div className="container" style={{ padding: '80px 20px', maxWidth: '800px' }}>
            <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '40px', textAlign: 'center' }}>关于我</h1>

            <div style={{
                background: 'var(--secondary)',
                padding: '40px',
                borderRadius: '12px',
                border: '1px solid var(--border)'
            }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '30px' }}>
                    <Image
                        src="/logo.png"
                        alt="Nolan"
                        width={120}
                        height={120}
                        style={{ borderRadius: '50%', border: '4px solid var(--background)' }}
                    />
                </div>

                <div style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#ccc' }}>
                    <p className="mb-20">
                        你好，我是 <strong>Nolan</strong>。欢迎来到我的个人博客。
                    </p>
                    <p className="mb-20">
                        我是一名热衷于 <strong style={{ color: 'var(--primary)' }}>人工智能</strong> 与技术的独立开发者。
                        在这个博客中，我致力于探索普通人如何在 AI 时代找到自己的位置，如何通过技术杠杆建立一人公司。
                    </p>
                    <p className="mb-20">
                        我的目标是分享最实用的 AI 实战技巧、创业路上的真实思考，以及那些能让你事半功倍的效率工具。
                        无论你是程序员、产品经理，还是对未来充满好奇的探索者，这里都有适合你的内容。
                    </p>
                    <p>
                        保持好奇，持续构建。
                    </p>
                </div>
            </div>
        </div>
    );
}
