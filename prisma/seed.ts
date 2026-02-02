import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
    console.log('Start seeding...')

    // 1. Create Admin User
    const email = 'admin@nolan.com'
    const password = await bcrypt.hash('admin123', 10)

    const user = await prisma.user.upsert({
        where: { email },
        update: {},
        create: {
            email,
            name: 'Nolan',
            password,
        },
    })

    // 2. Create Categories
    const categoriesData = [
        { name: 'AI 学习', slug: 'ai-learning' },
        { name: 'AI 实战应用', slug: 'ai-practice' },
        { name: '一人公司', slug: 'one-person-company' },
        { name: '个人思考', slug: 'personal-thoughts' },
    ]

    const categories: Record<string, string> = {}
    for (const cat of categoriesData) {
        const c = await prisma.category.upsert({
            where: { slug: cat.slug },
            update: {},
            create: cat,
        })
        categories[cat.slug] = c.id
    }

    // 3. Create Tags
    const tagsData = [
        'ChatGPT', 'LLM', 'Prompt Engineering', 'Next.js', '独立开发',
        '创业', '效率工具', 'Midjourney', 'RAG', 'Agent',
        '个人思考', 'AI Art', 'Marketing', '未来趋势', 'Coding', 'AI 学习'
    ]

    const tags: Record<string, string> = {}
    for (const name of tagsData) {
        const slug = name.toLowerCase().replace(/\s+/g, '-').replace(/\./g, '')
        const t = await prisma.tag.upsert({
            where: { slug },
            update: {},
            create: { name, slug },
        })
        tags[name] = t.id
    }

    // 4. Create Posts
    const postsData = [
        {
            title: '普通人如何利用 AI 开启副业：从零开始的实战指南',
            slug: 'ai-side-hustle-guide',
            category: 'one-person-company',
            tags: ['创业', '效率工具', 'Marketing'],
            coverImage: 'https://image.pollinations.ai/prompt/person%20working%20on%20laptop%20money%20growth%20concept',
            excerpt: '不需要懂代码，不需要巨额资金。本文分享 5 个适合普通人的 AI 变现思路，以及我自己的实操经验。',
            content: `
# 普通人的 AI 变现之路

AI 时代的到来，让“一人公司”的门槛降到了历史最低。你不需要成为了不起的技术专家，只需要懂得如何利用工具。

## 1. AI 内容创作
利用 ChatGPT 和 Midjourney 制作绘本、小红书图文或短视频脚本。
- **案例**：某博主通过 AI 生成儿童故事绘本，在亚马逊 KDP 上月入 3000 刀。
- **工具**：Midjourney (图), ChatGPT (文), Canva (排版)。

## 2. AI 咨询与培训
当大家都想学 AI 时，“教人使用 AI”本身就是一门好生意。
- **服务**：企业 AI 员工培训、个人效率提升咨询。
- **核心**：你只需要比你的客户多懂 20% 即可。

## 3. 定制化 AI 服务
为特定行业提供解决方案。例如：为电商卖家批量生成产品图，为律师整理案卷。

## 结语
行动力永远比想法重要。找准一个细分领域，狠狠地深耕下去。
      `,
            views: 5245,
            likes: 389
        },
        {
            title: 'Midjourney V6 商业级海报设计实流',
            slug: 'midjourney-v6-poster-design',
            category: 'ai-practice',
            tags: ['Midjourney', 'AI Art'],
            coverImage: 'https://image.pollinations.ai/prompt/artistic%20colorful%20poster%20design%20creative',
            excerpt: '如何用 MJ 生成可以直接商用的海报素材？掌握这些核心思路，让你的设计稿一次过。',
            content: `
# Midjourney V6 实战

V6 版本对于文字生成的支持有了巨大提升，图像质感也更接近摄影大片。

## 核心思路
不讲复杂的参数，只讲设计逻辑。
1. **主体明确**：告诉 AI 画面中心是什么。
2. **风格限定**：是“极简主义”、“赛博朋克”还是“油画风格”？
3. **光影描述**：侧光、顶光、自然光，光影决定质感。

## 商业应用场景
- **电商主图**：生成不同场景的产品展示图，省去拍摄成本。
- **活动海报**：快速出几十套方案供客户选择。
- **Logo 灵感**：虽然不能直接用，但能提供无限的创意方向。
      `,
            views: 1540,
            likes: 98
        },
        {
            title: '一人公司实战：我是如何用 AI 运营三个自媒体账号的',
            slug: 'solopreneur-social-media-ops',
            category: 'one-person-company',
            tags: ['独立开发', '效率工具', '创业'],
            coverImage: 'https://image.pollinations.ai/prompt/social%20media%20analytics%20dashboard%20futuristic',
            excerpt: '一个人就是一支队伍。揭秘我的 AI 工作流，如何每天只花 2 小时，维持三个平台的高质量日更。',
            content: `
# 打造自动化内容工厂

做一人公司，精力的分配至关重要。我将繁琐的、重复的工作全丢给了 AI。

## 我的工作流
1. **选题挖掘**：每天早上，AI 帮我扫描全网热点，总结出 5 个适合我的选题。
2. **初稿生成**：选定题目后，用预设好的 Prompt 让 ChatGPT 生成文章大纲和初稿。
3. **人工润色**：这是最关键的一步，注入我的个人观点和情绪，注入“灵魂”。
4. **多平台分发**：一键同步到公众号、小红书和推特。

## 核心不仅仅是快
用 AI 是为了把时间省下来，去深度思考，去和用户产生真实的链接。内容由于 AI 变得廉价，但“观点”永远昂贵。
      `,
            views: 4567,
            likes: 420
        },
        {
            title: '为什么我不再追求融资，而是选择做一家“慢公司”',
            slug: 'why-slow-company',
            category: 'personal-thoughts',
            tags: ['创业', '个人思考'],
            coverImage: 'https://image.pollinations.ai/prompt/calm%20zen%20slow%20life%20nature',
            excerpt: '在浮躁的创投圈，"慢"似乎是一种原罪。但我认为，对于个人创业者而言，追求现金流和生活平衡远比估值更重要。',
            content: `
# 慢公司的哲学

在这个追求 "10倍增长" 的时代，我选择慢下来。

## 什么是慢公司？
不依赖外部输血，通过健康的现金流维持运营。关注产品质量和用户口碑，而不是用户数量的爆发式增长。

## 为什么选择慢？
1. **掌控权**：拿了投资人的钱，就要听投资人的话。我希望对自己的产品有 100% 的决策权。
2. **生活质量**：创业是为了更好的生活，而不是为了把自己累死。
3. **长期主义**：可以在一个细分领域深耕十年，而不是为了风口频繁换赛道。

建立一个可以持续盈利的小而美的生意，是我目前的终极目标。
      `,
            views: 890,
            likes: 145
        },
        {
            title: 'DeepSeek + Kimi：打造你的超级私人助理',
            slug: 'deepseek-kimi-assistant',
            category: 'ai-practice',
            tags: ['ChatGPT', '效率工具', 'Agent'],
            coverImage: 'https://image.pollinations.ai/prompt/robot%20assistant%20futuristic%20office',
            excerpt: '不需要懂技术部署。教你如何组合使用市面上的免费 AI 工具，处理文档、整理会议纪要、安排日程。',
            content: `
# 超级助理组合拳

市面上的工具各有千秋，我们要学会组合拳。

## Kimi：长文档处理之王
当你有一份 100 页的行业报告要看时，直接丢给 Kimi。
提示词：“请总结这份报告的核心观点，并列出与我行业相关的机遇。”

## DeepSeek：逻辑推理大师
遇到复杂的商业决策或逻辑问题时，DeepSeek 的推理能力往往能给你惊喜。
提示词：“如果你是麦肯锡的顾问，请分析以下商业模式的优劣势...”

## 场景实战
**场景**：准备明天的客户提案。
1. 用 Kimi 搜索客户背景资料。
2. 用 DeepSeek 生成提案大纲和策略。
3. 用 PPT AI 工具一键生成演示文稿。
        `,
            views: 2100,
            likes: 180
        },
        {
            title: '独立开发者的 10 个免费获客渠道总结',
            slug: 'indie-hacker-marketing-channels',
            category: 'one-person-company',
            tags: ['独立开发', '创业', 'Marketing'],
            coverImage: 'https://image.pollinations.ai/prompt/megaphone%20marketing%20growth%20concept',
            excerpt: '产品做好了没人用？除了 Product Hunt，还有这些渠道值得关注。小红书引流实操。',
            content: `
# 免费流量哪里来？\n\n对于个人创业者，每一分钱都要花在刀刃上。付费广告玩不起，SEO 见效慢，社交媒体是最好的切入点...\n\n1. **Twitter/X**: #buildinpublic\n2. **小红书**: 视觉冲击力\n...
        `,
            views: 3300,
            likes: 420
        },
        {
            title: 'Agent 智能体：AI 如何像人一样工作',
            slug: 'what-is-ai-agent-biz',
            category: 'ai-learning',
            tags: ['Agent', '未来趋势'],
            coverImage: 'https://image.pollinations.ai/prompt/ai%20robot%20working%20at%20desk',
            excerpt: '不谈技术实现，只谈商业应用。未来的公司，可能只有你一个人类，剩下的全是 AI 员工（Agent）。',
            content: `
# 什么是 AI 员工？

如果说 ChatGPT 是一个博学的教授，你问他答。那么 Agent 就是一个能干的员工，你吩咐他做。

## 想象一下未来
早上醒来，你的“销售 Agent”已经帮你回复了 50 个客户咨询，并整理好了意向名单。
你的“财务 Agent”已经处理好了昨日的账单，并报税完毕。
你的“内容 Agent”已经写好了今天的公众号文章，等待你确认发布。

这不再是科幻，这是正在发生的现实。我们要做的，是学会如何管理这些 AI 员工。
        `,
            views: 1890,
            likes: 167
        },
        {
            title: '打造个人 IP：在 AI 时代如何建立不可替代性',
            slug: 'personal-branding-in-ai-era',
            category: 'personal-thoughts',
            tags: ['个人思考', '创业'],
            coverImage: 'https://image.pollinations.ai/prompt/person%20standing%20out%20from%20crowd%20spotlight',
            excerpt: '当内容创作成本趋近于零，个人的独特观点和人格魅力变得前所未有的重要。',
            content: '# AI 时代的个人 IP\n\nAI 可以生成 100 篇高质量文章，但无法生成一个"你"...\n\n保持真实，分享失败，建立连接。',
            views: 980,
            likes: 76
        },
        {
            title: '从打工到自由职业：思维方式的三个转变',
            slug: 'employee-to-freelancer-mindset',
            category: 'personal-thoughts',
            tags: ['个人思考', '创业'],
            coverImage: 'https://image.pollinations.ai/prompt/bird%20flying%20free%20sky',
            excerpt: '最难的不是技能的提升，而是身份认同的转变。如何像经营公司一样经营自己？',
            content: '# 思维跃迁\n\n1. **从出售时间到出售结果**\n2. **从等待指令到主动出击**\n3. **从规避风险到管理风险**',
            views: 1670,
            likes: 210
        },
        {
            title: 'Notion + AI：构建你的第二大脑',
            slug: 'notion-ai-second-brain',
            category: 'ai-practice',
            tags: ['效率工具', 'AI 学习'],
            coverImage: 'https://image.pollinations.ai/prompt/brain%20neural%20network%20digital%20concept',
            excerpt: '信息爆炸时代，我们不需要记住所有东西。学会构建知识库，让 AI 帮你整理、回忆和创造。',
            content: '# 你的知识库活了\n\nNotion AI 的加入，让静态的笔记变成了动态的助手...',
            views: 2980,
            likes: 340
        }
    ]


    for (const p of postsData) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { category, tags: postTags, ...data } = p

        await prisma.post.upsert({
            where: { slug: p.slug },
            update: {
                ...data,
                coverImage: data.coverImage,
                tags: {
                    set: [], // Clear existing tags
                    connect: postTags.map(t => ({ id: tags[t] }))
                }
            },
            create: {
                ...data,
                published: true,
                authorId: user.id,
                categoryId: category ? categories[category] : undefined,
                tags: {
                    connect: postTags.map(t => ({ id: tags[t] }))
                }
            },
        })
    }

    // 5. Create Projects
    const projectsData = [
        {
            name: 'AI 简历优化助手',
            description: '一个基于 GPT-4 的简历润色工具，针对程序员岗位进行深度优化。上线首周获得 500+ 用户。',
            techs: 'Next.js, OpenAI API, Stripe',
            image: 'https://image.pollinations.ai/prompt/resume%20cv%20optimization%20ai%20tool%20interface',
            url: '/blog/solopreneur-nextjs-ai-launch',
            order: 1
        },
        {
            name: '智能客服 Agent',
            description: '为独立开发者设计的自动回复机器人，接入微信和 Discord，每天节省 2 小时客服时间。',
            techs: 'Python, LangChain, WeChat',
            image: 'https://image.pollinations.ai/prompt/chatbot%20customer%20service%20ai%20robot%20interface',
            url: '/blog/what-is-ai-agent-biz',
            order: 2
        },
        {
            name: 'Midjourney 提示词生成器',
            description: '针对 V6 版本优化的提示词生成工具，帮助小白快速生成高质量图片。',
            techs: 'Vue, Midjourney, Tool',
            image: 'https://image.pollinations.ai/prompt/midjourney%20prompt%20generator%20tool%20color',
            url: '/blog/midjourney-v6-poster-design',
            order: 3
        },
        {
            name: 'Notion 自动归档助手',
            description: '连接 iOS 快捷指令与 Notion API，实现碎片化信息的自动分类和归档。',
            techs: 'Automation, Notion, iOS',
            image: 'https://image.pollinations.ai/prompt/workflow%20automation%20ios%20notion%20clean',
            url: '/blog/notion-ai-second-brain',
            order: 4
        }
    ]

    // Use loop with upsert-like logic (though Prisma schema doesn't have unique constraint on name, we will just create)
    // To avoid duplicates on re-seed, we delete all projects first or check existence. 
    // For simplicity in this seed script, let's delete existing projects first.
    await prisma.project.deleteMany({})

    for (const p of projectsData) {
        await prisma.project.create({ data: p })
    }

    console.log('Seeding finished.')
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
