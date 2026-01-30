// AI Blog - Vue Application
const { createApp, ref, computed, onMounted, onUnmounted, watch, nextTick } = Vue;

const app = createApp({
  setup() {
    // State
    const currentRoute = ref('home');
    const routeParams = ref({});
    const mobileMenuOpen = ref(false);
    const scrolled = ref(false);
    const isDark = ref(false);
    const searchQuery = ref('');
    const filterCategory = ref(null);
    const sortBy = ref('newest');
    const liked = ref(false);
    const readingProgress = ref(0);
    const showReadingProgress = ref(false);
    const activeHeading = ref('');
    const articleHeadings = ref([]);
    const searchResults = ref([]);
    
    // Comment form
    const commentForm = ref({
      name: '',
      email: '',
      content: ''
    });

    // Navigation items - 修改后的导航：首页、文章、实践、社区
    const navItems = [
      { id: 'home', label: '首页', icon: 'fas fa-home', route: 'home' },
      { id: 'articles', label: '文章', icon: 'fas fa-book', route: 'articles' },
      { id: 'practice', label: '实践', icon: 'fas fa-code', route: 'practice' },
      { id: 'community', label: '社区', icon: 'fas fa-users', route: 'community' }
    ];

    // Data from blogData
    const user = ref(blogData.user);
    const categories = ref(blogData.categories);
    const tags = ref(blogData.tags);
    const articles = ref(blogData.articles);
    const comments = ref(blogData.comments);
    const popularSearches = ref(blogData.popularSearches);
    const projects = ref(blogData.projects);
    const communityStats = ref(blogData.communityStats);

    // Computed
    const featuredArticles = computed(() => articles.value.slice(0, 3));
    const latestArticles = computed(() => articles.value.slice(0, 5));
    
    const currentArticle = computed(() => {
      if (currentRoute.value === 'article' && routeParams.value.slug) {
        return articles.value.find(a => a.slug === routeParams.value.slug);
      }
      return null;
    });

    const currentCategory = computed(() => {
      if (currentRoute.value === 'category' && routeParams.value.slug) {
        return categories.value.find(c => c.slug === routeParams.value.slug);
      }
      return null;
    });

    const currentTag = computed(() => {
      if (currentRoute.value === 'tag' && routeParams.value.slug) {
        return tags.value.find(t => t.slug === routeParams.value.slug);
      }
      return null;
    });

    const categoryArticles = computed(() => {
      if (currentCategory.value) {
        return articles.value.filter(a => a.category.slug === currentCategory.value.slug);
      }
      return [];
    });

    const tagArticles = computed(() => {
      if (currentTag.value) {
        return articles.value.filter(a => a.tags.some(t => t.slug === currentTag.value.slug));
      }
      return [];
    });

    const filteredArticles = computed(() => {
      let result = [...articles.value];
      
      if (filterCategory.value) {
        result = result.filter(a => a.category.slug === filterCategory.value);
      }
      
      if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        result = result.filter(a => 
          a.title.toLowerCase().includes(query) ||
          a.summary.toLowerCase().includes(query)
        );
      }
      
      result.sort((a, b) => {
        switch (sortBy.value) {
          case 'newest':
            return new Date(b.publishedAt) - new Date(a.publishedAt);
          case 'popular':
            return b.views - a.views;
          case 'liked':
            return b.likes - a.likes;
          default:
            return 0;
        }
      });
      
      return result;
    });

    const articleComments = computed(() => {
      if (currentArticle.value) {
        return comments.value.filter(c => c.articleId === currentArticle.value.id);
      }
      return [];
    });

    const relatedArticles = computed(() => {
      if (currentArticle.value) {
        return articles.value
          .filter(a => a.id !== currentArticle.value.id && a.category.id === currentArticle.value.category.id)
          .slice(0, 3);
      }
      return [];
    });

    const renderedContent = computed(() => {
      if (currentArticle.value) {
        return marked.parse(currentArticle.value.content);
      }
      return '';
    });

    const sortedTags = computed(() => {
      return [...tags.value].sort((a, b) => b.count - a.count);
    });

    const maxTagCount = computed(() => {
      return Math.max(...tags.value.map(t => t.count));
    });

    const totalArticles = computed(() => articles.value.length);
    const totalViews = computed(() => articles.value.reduce((sum, a) => sum + a.views, 0));
    const totalLikes = computed(() => articles.value.reduce((sum, a) => sum + a.likes, 0));

    const groupedArticles = computed(() => {
      const groups = {};
      articles.value.forEach(article => {
        const date = new Date(article.publishedAt);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const key = `${year}-${month}`;
        
        if (!groups[key]) {
          groups[key] = { year, month, articles: [] };
        }
        groups[key].articles.push(article);
      });
      
      // Sort by date descending
      const sortedKeys = Object.keys(groups).sort((a, b) => b.localeCompare(a));
      const sortedGroups = {};
      sortedKeys.forEach(key => {
        sortedGroups[key] = groups[key];
      });
      
      return sortedGroups;
    });

    // Methods
    const navigateTo = (route, params = {}) => {
      currentRoute.value = route;
      routeParams.value = params;
      mobileMenuOpen.value = false;
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
      // Reset states
      liked.value = false;
      readingProgress.value = 0;
      showReadingProgress.value = route === 'article';
      searchQuery.value = '';
      filterCategory.value = null;
      
      // Update URL hash for sharing
      let hash = route;
      if (route === 'article' && params.slug) hash += '/' + params.slug;
      if (route === 'category' && params.slug) hash += '/category/' + params.slug;
      if (route === 'tag' && params.slug) hash += '/tag/' + params.slug;
      window.location.hash = hash;
    };

    const navigateToArticle = (slug) => {
      navigateTo('article', { slug });
    };

    const navigateToCategory = (slug) => {
      navigateTo('category', { slug });
    };

    const navigateToTag = (slug) => {
      navigateTo('tag', { slug });
    };

    const openProject = (url) => {
      if (url) {
        window.open(url, '_blank');
      }
    };

    const goBack = () => {
      if (window.history.length > 1) {
        navigateTo('articles');
      } else {
        navigateTo('home');
      }
    };

    const toggleDarkMode = () => {
      isDark.value = !isDark.value;
      document.documentElement.classList.toggle('dark');
      localStorage.setItem('darkMode', isDark.value);
    };

    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    };

    const formatNumber = (num) => {
      if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'k';
      }
      return num.toString();
    };

    const readingTime = (content) => {
      const wordsPerMinute = 300;
      const words = content.trim().split(/\s+/).length;
      const minutes = Math.ceil(words / wordsPerMinute);
      return minutes + '分钟阅读';
    };

    const likeArticle = () => {
      if (!liked.value && currentArticle.value) {
        liked.value = true;
        // In real app, send API request
      }
    };

    const shareArticle = () => {
      if (navigator.share) {
        navigator.share({
          title: currentArticle.value.title,
          text: currentArticle.value.summary,
          url: window.location.href
        });
      } else {
        // Copy to clipboard
        navigator.clipboard.writeText(window.location.href);
        alert('链接已复制到剪贴板！');
      }
    };

    const submitComment = () => {
      if (!commentForm.value.name || !commentForm.value.email || !commentForm.value.content) {
        alert('请填写完整信息');
        return;
      }
      
      const newComment = {
        id: Date.now().toString(),
        articleId: currentArticle.value.id,
        author: {
          name: commentForm.value.name,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${commentForm.value.name}`
        },
        content: commentForm.value.content,
        createdAt: new Date().toISOString()
      };
      
      comments.value.push(newComment);
      commentForm.value = { name: '', email: '', content: '' };
      alert('评论已提交！');
    };

    const performSearch = () => {
      if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        searchResults.value = articles.value.filter(a =>
          a.title.toLowerCase().includes(query) ||
          a.summary.toLowerCase().includes(query)
        );
      } else {
        searchResults.value = [];
      }
    };

    const extractHeadings = () => {
      if (!currentArticle.value) return;
      
      const content = currentArticle.value.content;
      const headingRegex = /^(#{1,6})\s+(.+)$/gm;
      const matches = [...content.matchAll(headingRegex)];
      
      articleHeadings.value = matches.map((match, index) => ({
        id: 'heading-' + index,
        text: match[2],
        level: match[1].length
      }));
    };

    const scrollToHeading = (id) => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        activeHeading.value = id;
      }
    };

    const handleScroll = () => {
      scrolled.value = window.scrollY > 10;
      
      if (currentRoute.value === 'article') {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        readingProgress.value = (window.scrollY / totalHeight) * 100;
        
        // Update active heading
        articleHeadings.value.forEach(heading => {
          const element = document.getElementById(heading.id);
          if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top >= 0 && rect.top <= 200) {
              activeHeading.value = heading.id;
            }
          }
        });
      }
    };

    // Parse URL hash on load
    const parseHash = () => {
      const hash = window.location.hash.slice(1);
      if (!hash) return;
      
      const parts = hash.split('/');
      const route = parts[0];
      
      switch (route) {
        case 'article':
          if (parts[1]) navigateTo('article', { slug: parts[1] });
          break;
        case 'category':
          if (parts[1]) navigateTo('category', { slug: parts[1] });
          break;
        case 'tag':
          if (parts[1]) navigateTo('tag', { slug: parts[1] });
          break;
        default:
          if (['home', 'articles', 'practice', 'community', 'tags', 'archive', 'about', 'search'].includes(route)) {
            navigateTo(route);
          }
      }
    };

    // Lifecycle
    onMounted(() => {
      // Initialize dark mode
      const savedDarkMode = localStorage.getItem('darkMode');
      if (savedDarkMode === 'true') {
        isDark.value = true;
        document.documentElement.classList.add('dark');
      }
      
      // Parse URL hash
      parseHash();
      
      // Listen for hash changes
      window.addEventListener('hashchange', parseHash);
      
      // Scroll handler
      window.addEventListener('scroll', handleScroll);
    });

    onUnmounted(() => {
      window.removeEventListener('hashchange', parseHash);
      window.removeEventListener('scroll', handleScroll);
    });

    // Watch for article changes to extract headings
    watch(currentArticle, () => {
      if (currentArticle.value) {
        nextTick(() => {
          extractHeadings();
          // Highlight code blocks
          document.querySelectorAll('pre code').forEach((block) => {
            hljs.highlightElement(block);
          });
        });
      }
    });

    return {
      // State
      currentRoute,
      mobileMenuOpen,
      scrolled,
      searchQuery,
      filterCategory,
      sortBy,
      liked,
      readingProgress,
      showReadingProgress,
      activeHeading,
      articleHeadings,
      searchResults,
      commentForm,
      
      // Data
      navItems,
      user,
      categories,
      tags,
      articles,
      comments,
      popularSearches,
      projects,
      communityStats,
      
      // Computed
      featuredArticles,
      latestArticles,
      currentArticle,
      currentCategory,
      currentTag,
      categoryArticles,
      tagArticles,
      filteredArticles,
      articleComments,
      relatedArticles,
      renderedContent,
      sortedTags,
      maxTagCount,
      totalArticles,
      totalViews,
      totalLikes,
      groupedArticles,
      
      // Methods
      navigateTo,
      navigateToArticle,
      navigateToCategory,
      navigateToTag,
      openProject,
      goBack,
      toggleDarkMode,
      formatDate,
      formatNumber,
      readingTime,
      likeArticle,
      shareArticle,
      submitComment,
      performSearch,
      scrollToHeading
    };
  }
});

// Mount the app
app.mount('#app');