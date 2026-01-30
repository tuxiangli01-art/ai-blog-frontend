# NOLAN Blog

NOLAN个人博客 - 专注于AI学习、应用与创业

## 项目简介

这是一个基于Vue.js 3 + Tailwind CSS构建的现代化个人博客网站，采用单页应用(SPA)架构。

## 功能特性

- 🏠 **首页**：精选文章、最新文章、侧边栏
- 📝 **文章**：分类筛选、搜索、排序
- 💻 **实践**：展示AI项目
- 👥 **社区**：微信群入口
- 🌓 **深色模式**：一键切换主题
- 📱 **响应式设计**：适配各种设备

## 技术栈

- **前端框架**: Vue.js 3 (CDN)
- **样式**: Tailwind CSS
- **图标**: Font Awesome
- **代码高亮**: highlight.js
- **Markdown**: marked.js

## 本地开发

```bash
# 克隆仓库
git clone https://github.com/tuxiangli01-art/nolan-blog.git
cd nolan-blog

# 使用任意静态服务器
python3 -m http.server 8080
# 或
npx serve .
```

访问 http://localhost:8080

## 部署

项目配置了GitHub Actions自动部署到阿里云服务器。

### 部署流程

1. 推送代码到 `main` 分支
2. GitHub Actions 自动触发部署
3. 代码通过SSH/SCP部署到阿里云服务器
4. Nginx 自动重启

## 目录结构

```
.
├── index.html          # 主入口
├── js/
│   ├── app.js          # Vue应用逻辑
│   └── data.js         # 数据
├── css/                # 样式文件
├── images/             # 图片资源
├── .github/
│   └── workflows/
│       └── deploy.yml  # 自动部署配置
└── README.md
```

## License

MIT License