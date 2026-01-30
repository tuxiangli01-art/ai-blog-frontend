// AI Blog - Mock Data
const blogData = {
  user: {
    name: 'NOLAN',
    bio: 'AI领域从业者，专注于AI学习、应用与创业。分享技术干货与创业思考，与志同道合的朋友一起成长。',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
    email: 'ai@example.com',
    skills: ['机器学习', '深度学习', '自然语言处理', '计算机视觉', 'Python', 'TensorFlow', 'PyTorch', 'LangChain', 'ChatGPT', '大模型', 'AI应用开发', '系统设计'],
    socials: [
      { name: 'GitHub', icon: 'fab fa-github', url: 'https://github.com' },
      { name: 'Twitter', icon: 'fab fa-twitter', url: 'https://twitter.com' },
      { name: 'LinkedIn', icon: 'fab fa-linkedin', url: 'https://linkedin.com' },
      { name: 'Email', icon: 'fas fa-envelope', url: 'mailto:ai@example.com' }
    ],
    experiences: [
      { year: '2023 - 现在', title: 'AI创业者', company: '自主创业', description: '创办AI客服SaaS平台，服务100+企业客户', icon: 'rocket' },
      { year: '2021 - 2023', title: '高级AI工程师', company: '某知名科技公司', description: '负责NLP和大模型相关项目研发', icon: 'briefcase' },
      { year: '2019 - 2021', title: 'AI工程师', company: '某互联网公司', description: '参与推荐系统和搜索算法优化', icon: 'code' },
      { year: '2017 - 2019', title: '计算机科学硕士', company: '某知名大学', description: '研究方向：深度学习与自然语言处理', icon: 'graduation-cap' }
    ]
  },

  categories: [
    { id: '1', name: 'AI学习', slug: 'ai-learning', description: 'AI基础知识、学习路径、教程分享', icon: 'book', count: 12 },
    { id: '2', name: 'AI应用', slug: 'ai-application', description: 'AI在实际场景中的应用案例', icon: 'bolt', count: 8 },
    { id: '3', name: 'AI创业', slug: 'ai-entrepreneurship', description: 'AI创业经验、商业模式、行业洞察', icon: 'rocket', count: 6 },
    { id: '4', name: '个人思考', slug: 'personal-thoughts', description: '技术思考、行业观察、个人成长', icon: 'brain', count: 5 }
  ],

  tags: [
    { id: '1', name: '机器学习', slug: 'machine-learning', color: '#3B82F6', count: 15 },
    { id: '2', name: '深度学习', slug: 'deep-learning', color: '#8B5CF6', count: 12 },
    { id: '3', name: 'NLP', slug: 'nlp', color: '#10B981', count: 8 },
    { id: '4', name: '计算机视觉', slug: 'computer-vision', color: '#F59E0B', count: 6 },
    { id: '5', name: '大模型', slug: 'llm', color: '#EF4444', count: 10 },
    { id: '6', name: 'ChatGPT', slug: 'chatgpt', color: '#06B6D4', count: 7 },
    { id: '7', name: '创业', slug: 'startup', color: '#EC4899', count: 5 },
    { id: '8', name: 'Python', slug: 'python', color: '#3776AB', count: 14 },
    { id: '9', name: 'TensorFlow', slug: 'tensorflow', color: '#FF6F00', count: 4 },
    { id: '10', name: 'PyTorch', slug: 'pytorch', color: '#EE4C2C', count: 6 },
    { id: '11', name: 'LangChain', slug: 'langchain', color: '#1C4ED8', count: 5 },
    { id: '12', name: 'Transformer', slug: 'transformer', color: '#7C3AED', count: 8 }
  ],

  // 实践项目数据
  projects: [
    {
      id: '1',
      name: 'AI智能客服系统',
      description: '基于ChatGPT API开发的企业级智能客服解决方案，支持多轮对话、知识库检索、工单管理等功能。',
      image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80',
      url: 'https://github.com',
      techs: ['Vue.js', 'Node.js', 'OpenAI', 'PostgreSQL']
    },
    {
      id: '2',
      name: 'AI写作助手APP',
      description: '移动端AI写作应用，集成多种大模型，支持文章生成、润色、翻译等功能，帮助用户提升写作效率。',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80',
      url: 'https://github.com',
      techs: ['React Native', 'Python', 'FastAPI', 'Redis']
    },
    {
      id: '3',
      name: '图像生成工具站',
      description: '基于Stable Diffusion的在线图像生成平台，支持文生图、图生图、风格迁移等多种AI绘画功能。',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80',
      url: 'https://github.com',
      techs: ['Next.js', 'Python', 'SD', 'AWS']
    },
    {
      id: '4',
      name: '代码审查助手',
      description: 'IDE插件形式的AI代码审查工具，能够自动检测代码bug、优化建议、安全漏洞等。',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80',
      url: 'https://github.com',
      techs: ['TypeScript', 'VSCode API', 'GPT-4', 'AST']
    }
  ],

  // 社区统计数据
  communityStats: {
    members: '1,200+',
    weeklyTopics: '50+',
    resources: '200+'
  },

  articles: [
    {
      id: '1',
      title: '从零开始学习深度学习：完整学习路线图',
      slug: 'deep-learning-roadmap',
      summary: '一份完整的深度学习学习路线图，涵盖数学基础、编程技能、核心概念、框架学习和实践项目，帮助你系统性地掌握深度学习技术。',
      content: `# 从零开始学习深度学习：完整学习路线图

深度学习是人工智能领域最热门的技术之一。本文将为你提供一份完整的学习路线图，帮助你从零基础成长为深度学习工程师。

## 1. 基础知识准备

### 1.1 数学基础
- **线性代数**：矩阵运算、向量空间、特征值分解
- **微积分**：导数、梯度、链式法则
- **概率论**：概率分布、贝叶斯定理、最大似然估计
- **统计学**：假设检验、置信区间、回归分析

### 1.2 编程基础
- **Python**：Python是深度学习的主流编程语言
- **NumPy**：数值计算库
- **Pandas**：数据处理库
- **Matplotlib**：数据可视化库

\`\`\`python
import numpy as np
import matplotlib.pyplot as plt

# 创建一个简单的数据可视化
x = np.linspace(0, 10, 100)
y = np.sin(x)
plt.plot(x, y)
plt.show()
\`\`\`

## 2. 机器学习基础

在深入学习深度学习之前，建议先掌握传统机器学习的基础知识：

- 监督学习 vs 无监督学习
- 分类与回归
- 模型评估与选择
- 过拟合与正则化

## 3. 深度学习核心概念

### 3.1 神经网络基础
- 感知机与多层感知机
- 激活函数：ReLU、Sigmoid、Tanh
- 损失函数与优化器
- 反向传播算法

### 3.2 卷积神经网络（CNN）
- 卷积层与池化层
- 经典架构：LeNet、AlexNet、VGG、ResNet
- 图像分类与目标检测

### 3.3 循环神经网络（RNN）
- RNN与LSTM
- 序列到序列模型
- 注意力机制

## 4. 深度学习框架

### 4.1 PyTorch
PyTorch是目前最流行的深度学习框架之一：

\`\`\`python
import torch
import torch.nn as nn

# 定义一个简单的神经网络
class SimpleNet(nn.Module):
    def __init__(self):
        super().__init__()
        self.fc1 = nn.Linear(784, 256)
        self.fc2 = nn.Linear(256, 10)
    
    def forward(self, x):
        x = torch.relu(self.fc1(x))
        x = self.fc2(x)
        return x
\`\`\`

### 4.2 TensorFlow
TensorFlow是Google开发的深度学习框架，适合生产环境部署。

## 5. 进阶主题

- Transformer架构
- 预训练模型（BERT、GPT）
- 生成对抗网络（GAN）
- 强化学习

## 6. 实践项目

1. **图像分类**：使用CNN进行图像分类
2. **文本分类**：使用RNN或Transformer进行情感分析
3. **目标检测**：实现YOLO或Faster R-CNN
4. **生成模型**：实现GAN生成图像

## 7. 学习资源推荐

- **课程**：吴恩达深度学习课程、Fast.ai
- **书籍**：《深度学习》（花书）、《动手学深度学习》
- **论文**：arXiv.org、Papers With Code
- **社区**：GitHub、Kaggle、Reddit

## 结语

深度学习是一个不断发展的领域，保持学习的热情和持续实践是成功的关键。希望这份路线图能够帮助你开启深度学习之旅！`,
      coverImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
      category: { id: '1', name: 'AI学习', slug: 'ai-learning' },
      tags: [
        { id: '1', name: '机器学习', slug: 'machine-learning', color: '#3B82F6' },
        { id: '2', name: '深度学习', slug: 'deep-learning', color: '#8B5CF6' },
        { id: '8', name: 'Python', slug: 'python', color: '#3776AB' }
      ],
      views: 3256,
      likes: 186,
      createdAt: '2024-01-15T08:00:00Z',
      publishedAt: '2024-01-15T08:00:00Z'
    },
    {
      id: '2',
      title: 'ChatGPT API实战：构建智能客服系统',
      slug: 'chatgpt-api-customer-service',
      summary: '详细讲解如何使用ChatGPT API构建企业级智能客服系统，涵盖架构设计、API集成、知识库管理、性能优化和成本控制等核心内容。',
      content: `# ChatGPT API实战：构建智能客服系统

本文将详细介绍如何使用ChatGPT API构建一个企业级智能客服系统。

## 1. 系统设计概述

### 1.1 架构设计
我们的智能客服系统采用微服务架构：

- **API Gateway**：统一入口，负责请求路由和限流
- **Chat Service**：核心对话服务，集成ChatGPT API
- **Context Service**：上下文管理服务
- **Knowledge Base**：企业知识库
- **Analytics Service**：数据分析服务

### 1.2 技术栈
- **后端**：Node.js + Express
- **数据库**：PostgreSQL + Redis
- **消息队列**：RabbitMQ
- **部署**：Docker + Kubernetes

## 2. ChatGPT API集成

### 2.1 基础调用

\`\`\`typescript
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function getChatResponse(message: string) {
  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      { role: 'system', content: 'You are a helpful customer service assistant.' },
      { role: 'user', content: message },
    ],
    temperature: 0.7,
    max_tokens: 500,
  });
  
  return response.choices[0].message.content;
}
\`\`\`

### 2.2 上下文管理

\`\`\`typescript
class ConversationManager {
  private conversations: Map<string, Message[]> = new Map();
  
  addMessage(sessionId: string, message: Message) {
    if (!this.conversations.has(sessionId)) {
      this.conversations.set(sessionId, []);
    }
    this.conversations.get(sessionId).push(message);
  }
  
  getContext(sessionId: string, limit: number = 10): Message[] {
    const history = this.conversations.get(sessionId) || [];
    return history.slice(-limit);
  }
}
\`\`\`

## 3. 知识库集成

### 3.1 向量数据库

\`\`\`python
from sentence_transformers import SentenceTransformer
import faiss

model = SentenceTransformer('all-MiniLM-L6-v2')
dimension = 384
index = faiss.IndexFlatIP(dimension)

documents = ["产品使用方法", "退换货政策", "常见问题解答"]
embeddings = model.encode(documents)
index.add(embeddings)
\`\`\`

## 4. 性能优化

- **缓存策略**：响应缓存、嵌入缓存、会话缓存
- **流式响应**：使用SSE实现打字机效果
- **成本控制**：Token优化、分层策略

## 结语

通过本文的介绍，你应该能够构建一个基础的智能客服系统。`,
      coverImage: 'https://images.unsplash.com/photo-1676299081847-824916de030a?w=800&q=80',
      category: { id: '2', name: 'AI应用', slug: 'ai-application' },
      tags: [
        { id: '5', name: '大模型', slug: 'llm', color: '#EF4444' },
        { id: '6', name: 'ChatGPT', slug: 'chatgpt', color: '#06B6D4' },
        { id: '8', name: 'Python', slug: 'python', color: '#3776AB' }
      ],
      views: 2143,
      likes: 142,
      createdAt: '2024-01-10T10:00:00Z',
      publishedAt: '2024-01-10T10:00:00Z'
    },
    {
      id: '3',
      title: 'AI创业第一年：从0到1的实战经验',
      slug: 'ai-startup-first-year',
      summary: '分享AI创业第一年的真实经历，包括产品定位、技术架构、获客增长、融资经历、团队管理和踩过的坑，为AI创业者提供实战经验参考。',
      content: `# AI创业第一年：从0到1的实战经验

创业第一年是最艰难的时期。本文分享我在AI创业第一年的真实经历和宝贵经验。

## 1. 创业背景

### 1.1 为什么选择AI创业
2023年初，ChatGPT的爆火让我看到了AI的巨大机会。作为一名有5年AI开发经验的工程师，我决定辞职创业。

### 1.2 初始团队
- 我：技术负责人，负责产品研发
- 合伙人：产品经理，负责市场和运营
- 实习生：2名，协助开发和数据标注

## 2. 产品定位

### 2.1 市场分析
经过一个月的市场调研，我们发现：
- 中小企业对AI客服需求强烈
- 现有解决方案价格昂贵
- 定制化程度不够

### 2.2 产品MVP
我们决定做一个面向中小企业的AI客服SaaS平台。

## 3. 获客与增长

### 3.1 早期获客渠道
- **内容营销**：技术博客、知乎、公众号
- **社群运营**：加入创业者群、AI交流群
- **线下活动**：参加创业路演、行业会议

### 3.2 增长数据
- 第1季度：10家企业试用，0付费
- 第2季度：50家企业试用，5家付费
- 第3季度：200家企业试用，30家付费

## 4. 融资经历

天使轮：200万人民币，估值1000万

## 5. 关键数据

- 年度收入：150万
- 付费客户：80家
- ARR：200万

## 结语

创业是一场马拉松，坚持、学习、迭代是成功的关键。`,
      coverImage: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&q=80',
      category: { id: '3', name: 'AI创业', slug: 'ai-entrepreneurship' },
      tags: [
        { id: '5', name: '大模型', slug: 'llm', color: '#EF4444' },
        { id: '7', name: '创业', slug: 'startup', color: '#EC4899' },
        { id: '6', name: 'ChatGPT', slug: 'chatgpt', color: '#06B6D4' }
      ],
      views: 4521,
      likes: 298,
      createdAt: '2024-01-05T14:00:00Z',
      publishedAt: '2024-01-05T14:00:00Z'
    },
    {
      id: '4',
      title: '大模型时代，程序员的生存指南',
      slug: 'llm-era-programmer-survival',
      summary: '探讨大模型时代程序员的职业发展方向，分析AI对程序员工作的影响，提供转型建议、学习路径和工具推荐，帮助程序员在这个变革时代保持竞争力。',
      content: `# 大模型时代，程序员的生存指南

ChatGPT、Copilot等大模型的出现，正在深刻改变程序员的工作方式。

## 1. 大模型对程序员的影响

### 1.1 积极影响
- **提高效率**：自动生成代码、文档、测试
- **降低门槛**：新手可以更快上手
- **知识获取**：快速学习新技术
- **创新加速**：更多时间专注于创造性工作

### 1.2 挑战与威胁
- **基础编码工作被替代**
- **技能要求变化**
- **竞争加剧**
- **技术更新加速**

## 2. 程序员的转型方向

### 2.1 AI工程师
- 掌握机器学习基础
- 学习Prompt Engineering
- 了解大模型API使用

### 2.2 AI产品经理
- 深入理解AI能力边界
- 设计AI驱动的产品

### 2.3 深耕专业领域
- 系统架构设计
- 性能优化专家

## 3. 核心能力培养

- 系统设计与架构
- 算法与数据结构
- 代码质量与工程实践
- AI工具使用能力

## 结语

**AI不会取代程序员，但会AI的程序员会取代不会AI的程序员。**`,
      coverImage: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80',
      category: { id: '4', name: '个人思考', slug: 'personal-thoughts' },
      tags: [
        { id: '5', name: '大模型', slug: 'llm', color: '#EF4444' },
        { id: '6', name: 'ChatGPT', slug: 'chatgpt', color: '#06B6D4' },
        { id: '1', name: '机器学习', slug: 'machine-learning', color: '#3B82F6' }
      ],
      views: 5632,
      likes: 342,
      createdAt: '2024-01-01T09:00:00Z',
      publishedAt: '2024-01-01T09:00:00Z'
    },
    {
      id: '5',
      title: 'Transformer架构详解：从Attention到BERT',
      slug: 'transformer-architecture-explained',
      summary: '深入解析Transformer架构的工作原理，包括Attention机制、Encoder-Decoder结构、位置编码和BERT模型，配有详细的代码实现。',
      content: `# Transformer架构详解：从Attention到BERT

Transformer架构是近年来NLP领域最重要的突破。

## 1. Attention机制

### 1.1 Self-Attention原理

\`\`\`python
import torch
import torch.nn as nn
import math

class SelfAttention(nn.Module):
    def __init__(self, d_model=512, num_heads=8):
        super().__init__()
        self.d_model = d_model
        self.num_heads = num_heads
        self.d_k = d_model // num_heads
        
        self.W_q = nn.Linear(d_model, d_model)
        self.W_k = nn.Linear(d_model, d_model)
        self.W_v = nn.Linear(d_model, d_model)
    
    def forward(self, x):
        Q = self.W_q(x)
        K = self.W_k(x)
        V = self.W_v(x)
        
        scores = torch.matmul(Q, K.transpose(-2, -1)) / math.sqrt(self.d_k)
        attn = torch.softmax(scores, dim=-1)
        return torch.matmul(attn, V)
\`\`\`

## 2. BERT详解

BERT使用Transformer的Encoder部分，采用双向上下文建模。

## 结语

理解Transformer原理对掌握现代NLP技术至关重要。`,
      coverImage: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&q=80',
      category: { id: '1', name: 'AI学习', slug: 'ai-learning' },
      tags: [
        { id: '2', name: '深度学习', slug: 'deep-learning', color: '#8B5CF6' },
        { id: '3', name: 'NLP', slug: 'nlp', color: '#10B981' },
        { id: '12', name: 'Transformer', slug: 'transformer', color: '#7C3AED' }
      ],
      views: 2876,
      likes: 198,
      createdAt: '2023-12-28T11:00:00Z',
      publishedAt: '2023-12-28T11:00:00Z'
    },
    {
      id: '6',
      title: '使用LangChain构建AI应用：从入门到实践',
      slug: 'langchain-ai-application-tutorial',
      summary: '全面介绍LangChain框架的核心概念和使用方法，包括模型、提示词、链、记忆、RAG和Agents，配有丰富的代码示例和实际案例。',
      content: `# 使用LangChain构建AI应用：从入门到实践

LangChain是目前最流行的AI应用开发框架。

## 1. 快速开始

\`\`\`python
from langchain.llms import OpenAI
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain

llm = OpenAI(temperature=0.7)

template = "你是一个专业的{role}。请回答：{question}"
prompt = PromptTemplate(
  input_variables=["role", "question"],
  template=template
)

chain = LLMChain(llm=llm, prompt=prompt)
result = chain.predict(role="AI专家", question="什么是深度学习？")
\`\`\`

## 2. RAG实现

检索增强生成（RAG）是目前最流行的AI应用模式。

## 结语

LangChain极大地简化了LLM应用的开发。`,
      coverImage: 'https://images.unsplash.com/photo-1664575602554-2087b04935a5?w=800&q=80',
      category: { id: '2', name: 'AI应用', slug: 'ai-application' },
      tags: [
        { id: '5', name: '大模型', slug: 'llm', color: '#EF4444' },
        { id: '11', name: 'LangChain', slug: 'langchain', color: '#1C4ED8' },
        { id: '8', name: 'Python', slug: 'python', color: '#3776AB' }
      ],
      views: 1876,
      likes: 134,
      createdAt: '2023-12-20T16:00:00Z',
      publishedAt: '2023-12-20T16:00:00Z'
    }
  ],

  comments: [
    {
      id: '1',
      articleId: '1',
      author: { name: '小明', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=xiaoming' },
      content: '写得太好了！正好在找深度学习的入门资料，这篇路线图非常清晰。',
      createdAt: '2024-01-15T12:00:00Z'
    },
    {
      id: '2',
      articleId: '1',
      author: { name: 'AI爱好者', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ailover' },
      content: '感谢分享！已经开始按照路线图学习了。',
      createdAt: '2024-01-16T09:30:00Z'
    },
    {
      id: '3',
      articleId: '3',
      author: { name: '创业者小李', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=startup' },
      content: '感同身受！创业第一年确实是最艰难的，你的分享给了我很大鼓励。',
      createdAt: '2024-01-06T14:00:00Z'
    }
  ],

  popularSearches: ['ChatGPT', '深度学习', 'LangChain', '创业', '大模型', 'Transformer']
};