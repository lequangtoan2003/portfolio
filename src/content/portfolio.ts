export type Locale = "vi" | "en";

type NavItem = {
  label: string;
  href: string;
};

type SkillGroup = {
  title: string;
  items: string[];
};

export type SubSkillItem = {
  label: string;
  items: string;
};

export type SkillCard = {
  id: string;
  icon: "monitor" | "react" | "flutter" | "terminal";
  titleAccent: string;
  titleSecondLine: string;
  accentColor: string;
  description: string;
  primarySkills: string[];
  subSkills: SubSkillItem[];
};

type WorkItem = {
  title: string;
  period: string;
  role: string;
  summary: string;
  highlights: string[];
  stack: string[];
  href?: string;
};

type ExperienceItem = {
  company: string;
  period: string;
  role: string;
  summary: string;
};

export type EducationItem = {
  institution: string;
  degree: string;
  period: string;
  gpa: string;
  english: string;
};

export type CertificateItem = {
  title: string;
  issuer: string;
  issueDate?: string;
  credentialUrl?: string;
};

type AboutStat = {
  value: string;
  label: string;
};

type AboutValueCard = {
  title: string;
  description: string;
};

type PortfolioContent = {
  locale: Locale;
  homePath: "/" | "/en";
  alternatePath: "/" | "/en";
  alternateLabel: string;
  seo: {
    title: string;
    description: string;
  };
  nav: NavItem[];
  hero: {
    eyebrow: string;
    title: string;
    summary: string;
    primaryCta: string;
    secondaryCta: string;
  };
  skills: {
    title: string;
    summary: string;
  };
  work: {
    title: string;
    summary: string;
    coreSkillsTitle: string;
    techStackTitle: string;
    selectedWorkTitle: string;
    experienceTitle: string;
    educationTitle: string;
    certificatesTitle: string;
  };
  skillCards: SkillCard[];
  skillGroups: SkillGroup[];
  techStack: SkillGroup[];
  workItems: WorkItem[];
  experience: ExperienceItem[];
  education: EducationItem[];
  certificates: CertificateItem[];
  about: {
    title: string;
    summary: string;
    avatarUrl: string;
    avatarAlt: string;
    stats: AboutStat[];
    statusBadge?: string;
    tags?: string[];
    values: AboutValueCard[];
  };
  contact: {
    title: string;
    summary: string;
    emailLabel: string;
    githubLabel: string;
    locationLabel: string;
    location: string;
  };
  accessibility: {
    mainNavigation: string;
    quickLinks: string;
    profileSummary: string;
  };
  footer: string;
};

export const portfolioContent: Record<Locale, PortfolioContent> = {
  vi: {
    locale: "vi",
    homePath: "/",
    alternatePath: "/en",
    alternateLabel: "English",
    seo: {
      title: "Lê Quang Toàn | Full-stack Web & Desktop Developer",
      description:
        "Portfolio của Lê Quang Toàn - Lập trình viên Full-stack Web & Desktop App tại Đà Nẵng, chuyên xây dựng sản phẩm tối ưu hiệu năng với React, Next.js, Vue, Node.js và Electron.",
    },
    nav: [
      { label: "Trang Chủ", href: "/#home" },
      { label: "Giới thiệu", href: "/#about" },
      { label: "Kỹ Năng", href: "/#stack" },
      { label: "Dự Án", href: "/#work" },
      { label: "Liên Hệ", href: "/#contact" },
    ],
    hero: {
      eyebrow: "Full-stack Web & Desktop Developer",
      title: "Lê Quang Toàn",
      summary:
        "Lập trình viên Full-stack tại Đà Nẵng, chuyên xây dựng web app và desktop app có kiến trúc rõ ràng, dễ bảo trì và tối ưu trải nghiệm người dùng.",
      primaryCta: "Xem công việc",
      secondaryCta: "Liên hệ ngay",
    },
    skills: {
      title: "Kỹ Năng Của Tôi",
      summary:
        "Tổng hợp kỹ năng chuyên sâu và công nghệ sử dụng trong quá trình phát triển sản phẩm web, hệ thống backend và ứng dụng desktop automation.",
    },
    work: {
      title: "Dự Án",
      summary:
        "Kinh nghiệm thực tế từ phát triển frontend hiện đại, backend Node.js đến các ứng dụng desktop automation cần tính ổn định cao.",
      coreSkillsTitle: "Kỹ năng chính",
      techStackTitle: "Tech Stack",
      selectedWorkTitle: "Dự án tiêu biểu",
      experienceTitle: "Kinh nghiệm thực tế",
      educationTitle: "Học vấn",
      certificatesTitle: "Chứng chỉ chuyên môn",
    },
    skillCards: [
      {
        id: "software",
        icon: "monitor",
        titleAccent: "Software",
        titleSecondLine: "Development",
        accentColor: "#ec4899",
        description:
          "Thành thạo xây dựng hệ thống backend linh hoạt và bảo mật. Ưu tiên cấu trúc code rõ ràng (MVC, Repository Pattern), tối ưu hóa cơ sở dữ liệu và thiết kế RESTful APIs dễ mở rộng.",
        primarySkills: [
          "Node.js",
          "Express 5",
          "TypeScript",
          "RESTful API",
          "Casbin",
        ],
        subSkills: [
          {
            label: "Xác thực & Bảo mật",
            items:
              "JWT, OAuth 2.0, Casbin (RBAC/ABAC IAM), Mã hóa AES-256-GCM, Rate Limiting",
          },
          {
            label: "Realtime & Data Pipeline",
            items:
              "Socket.io (Websocket), Cloudinary API, Webhooks, Background Queue",
          },
          {
            label: "Cơ sở dữ liệu",
            items:
              "PostgreSQL, SQLite local, MongoDB, Supabase, Prisma/ORM, Repository Pattern",
          },
          {
            label: "DevOps, Arch & QA",
            items:
              "Docker, CI/CD GitHub Actions, Vercel, Render, E2E & Unit Testing, Postman",
          },
        ],
      },
      {
        id: "frontend",
        icon: "react",
        titleAccent: "Frontend Dev",
        titleSecondLine: "React, NextJS, Vue",
        accentColor: "#38bdf8",
        description:
          "Chuyên phát triển giao diện hiện đại, phản hồi mượt mà trên mọi thiết bị và tối ưu tốc độ tải trang cực nhanh với hệ sinh thái React 19, Next.js và Vue 3.",
        primarySkills: [
          "React 19",
          "Next.js",
          "Vue 3",
          "TypeScript",
          "Tailwind CSS",
        ],
        subSkills: [
          {
            label: "Quản lý State & Forms",
            items:
              "Zustand, Redux Toolkit, Pinia, TanStack Query (React Query), Context API, Zod",
          },
          {
            label: "Giao diện & Đồ họa Workflow",
            items:
              "Tailwind CSS 4, Vue Flow, ELK.js, CSS Modules, Responsive Design, Web Vitals, SEO/GEO",
          },
          {
            label: "Nền tảng kỹ thuật",
            items:
              "JavaScript (ES6+), TypeScript, HTML5/CSS3, Component-driven Architecture, Vite",
          },
        ],
      },
      {
        id: "desktop",
        icon: "flutter",
        titleAccent: "Desktop Dev",
        titleSecondLine: "Electron, Automation",
        accentColor: "#f97316",
        description:
          "Chuyên môn phát triển ứng dụng desktop đa nền tảng và pipeline tự động hóa (Automation) giúp tối ưu hóa quy trình làm việc và tiết kiệm hàng giờ thao tác thủ công.",
        primarySkills: ["Electron 40", "Puppeteer", "Playwright", "FFmpeg"],
        subSkills: [
          {
            label: "Tự động hóa & Scraping",
            items:
              "Puppeteer, Playwright, Chrome DevTools Protocol (CDP), Anti-detect Profile, Custom Chromium",
          },
          {
            label: "Đa tiến trình & Media Pipeline",
            items:
              "Electron Child Processes, Worker Threads, Soft Distributed Lock, Auto-sync Queue, FFmpeg",
          },
          {
            label: "Đóng gói & Vận hành",
            items:
              "Docker, GitHub Actions CI/CD, SQLite local mã hóa, Multi-window, Windows Installer & Auto-update",
          },
        ],
      },
    ],
    skillGroups: [
      {
        title: "Frontend product UI",
        items: [
          "React 19",
          "Next.js",
          "Vue 3",
          "Pinia",
          "TypeScript",
          "Tailwind CSS 4",
          "Zustand",
          "React Query",
          "Zod",
        ],
      },
      {
        title: "Backend and APIs",
        items: [
          "Node.js",
          "Express 5",
          "REST API",
          "JWT",
          "Casbin (IAM)",
          "Socket.io",
          "AES-256 Encryption",
          "Repository Pattern",
        ],
      },
      {
        title: "Desktop automation",
        items: [
          "Electron 40",
          "Puppeteer",
          "Playwright",
          "CDP",
          "FFmpeg",
          "GravBrowser",
          "Anti-detect Profile",
          "Child Processes",
        ],
      },
    ],
    techStack: [
      {
        title: "Frontend",
        items: [
          "HTML5",
          "CSS3",
          "Tailwind CSS 4",
          "React 19",
          "Next.js",
          "Vue 3",
          "Pinia",
          "Zustand",
          "React Query",
          "Zod",
          "Vite",
          "Vue Flow",
          "ELK.js",
        ],
      },
      {
        title: "Backend & Security",
        items: [
          "TypeScript",
          "Node.js",
          "Express 5",
          "JWT",
          "Casbin (RBAC/ABAC)",
          "Socket.io",
          "Cloudinary",
          "AES-256-GCM",
          "PBKDF2",
          "Repository Pattern",
        ],
      },
      {
        title: "Desktop & Automation",
        items: [
          "Electron 40",
          "Puppeteer",
          "Playwright",
          "CDP",
          "Custom Chromium Launcher",
          "GravBrowser",
          "FFmpeg",
          "Child Processes",
          "Auto-update",
        ],
      },
      {
        title: "Data, Tools & Testing",
        items: [
          "PostgreSQL",
          "SQLite",
          "MongoDB",
          "Supabase",
          "Docker",
          "GitHub Actions",
          "Vercel",
          "Render",
          "Postman",
          "E2E Testing",
          "Unit Testing",
        ],
      },
    ],
    workItems: [
      {
        title: "Invibrowser",
        period: "05/2026 - 08/2026",
        role: "Fullstack Desktop SaaS App",
        summary:
          "Ứng dụng desktop SaaS giúp quản lý hàng trăm browser profile độc lập, hỗ trợ đồng bộ dữ liệu cloud và phân quyền làm việc nhóm mượt mà.",
        highlights: [
          "Phát triển cơ chế Soft Distributed Lock (Runtime Presence) giúp nhận biết thiết bị đang mở profile, tránh xung đột dữ liệu giữa nhiều máy.",
          "Xây dựng hàng chờ tự động đồng bộ (Auto-sync Queue) chạy ngầm mượt mà giữa máy local và cloud storage.",
          "Xây dựng trình kéo thả quy trình làm việc (Visual Workflow Builder) trực quan bằng Vue Flow và ELK.js.",
          "Phân quyền thành viên nhóm chi tiết theo vai trò và nhóm làm việc bằng Casbin IAM.",
          "Tổ chức kiến trúc 3 tầng chuẩn chỉnh (Frontend, Runtime, Server) kết hợp Repository Pattern giúp dự án dễ bảo trì lâu dài.",
        ],
        stack: [
          "Vue 3",
          "TypeScript",
          "Electron 40",
          "Node.js",
          "Express 5",
          "PostgreSQL",
          "Casbin",
          "Pinia",
          "Vue Flow",
          "ELK.js",
          "CDP",
        ],
        href: "https://invibrowser.com",
      },
      {
        title: "1Clickdown",
        period: "10/2025 - 05/2026",
        role: "Fullstack Desktop Automation App",
        summary:
          "Công cụ desktop tự động hóa việc xử lý video hàng loạt và thu thập dữ liệu thông minh, giúp tiết kiệm đến 80-90% thời gian thao tác thủ công.",
        highlights: [
          "Tách các tác vụ nặng sang child processes độc lập trong kiến trúc Electron đa tiến trình, xử lý mượt mà tới 5 video cùng lúc mà không giật lag.",
          "Xây dựng media pipeline tự động hóa bằng FFmpeg (cắt ghép, zoom, chèn nhạc, chữ) chỉ với vài cú click.",
          "Thiết lập kịch bản Puppeteer/CDP kết hợp anti-detect profile để tự động crawl dữ liệu group Facebook và phân tích insights tài khoản.",
          "Lưu trữ dữ liệu an toàn trên SQLite local theo Repository Pattern và mã hóa chuẩn AES-256-GCM.",
          "Tự động hóa luồng build và phát hành bộ cài Windows (Signed installer & Auto-update) với Docker và GitHub Actions.",
        ],
        stack: [
          "React 19",
          "TypeScript",
          "Electron",
          "Node.js",
          "SQLite",
          "FFmpeg",
          "Puppeteer",
          "CDP",
          "AES-256",
          "Docker",
          "GitHub Actions",
        ],
      },
      {
        title: "Product landing pages",
        period: "2025 - 2026",
        role: "Web Developer",
        summary:
          "Các trang giới thiệu sản phẩm cho Invibrowser.com và Sellnity.com với thiết kế hiện đại, nội dung mạch lạc và tối ưu chuẩn SEO/GEO.",
        highlights: [
          "Truyền tải rõ nét giá trị sản phẩm và giải quyết đúng nhu cầu của khách hàng.",
          "Giao diện tinh gọn, phản hồi cực nhanh trên thiết bị di động và tối ưu khả năng index độc lập theo ngôn ngữ.",
          "Đạt điểm hiệu năng Web Vitals cao, thân thiện với các công cụ tìm kiếm và mô hình AI.",
        ],
        stack: ["React", "Next.js", "Tailwind CSS", "TypeScript", "SEO", "GEO"],
      },
    ],
    experience: [
      {
        company: "Sellnity",
        period: "09/2025 - 08/2026",
        role: "Developer Fullstack Web App",
        summary:
          "Phát triển các bài toán thực tế: ứng dụng web, app desktop SaaS, landing page giới thiệu sản phẩm đến các quy trình tự động hóa thu thập dữ liệu khách hàng tiềm năng cho đội ngũ kinh doanh.",
      },
    ],
    education: [
      {
        institution: "Trường Đại học Đông Á",
        degree: "Cử nhân Công nghệ Thông tin",
        period: "2021 - 2025",
        gpa: "GPA: 3.28/4.0 (8.09/10)",
        english: "Trình độ Tiếng Anh: B1",
      },
    ],
    certificates: [
      {
        title: "The Ultimate React Course 2024: React, Next.js, Redux & More",
        issuer: "Udemy (Giảng viên Jonas Schmedtmann)",
        issueDate: "2024",
        credentialUrl:
          "https://www.udemy.com/certificate/UC-195fc030-2dc0-4e20-8de7-82c733491b11",
      },
    ],
    about: {
      title: "Giới thiệu",
      summary:
        "Lập trình viên Full-stack với hơn 1 năm kinh nghiệm thực chiến trong phát triển sản phẩm web/app và ứng dụng desktop. Chuyên giải quyết các bài toán công nghệ đa dạng — từ landing page bắt mắt, ứng dụng web giao dịch, hệ thống chat nội bộ cho đến các ứng dụng desktop SaaS và hệ thống tự động hóa (Automation) phức tạp.\n\nĐề cao tinh thần trách nhiệm, chuẩn mực code sạch (Clean Code), tư duy kiến trúc hệ thống bài bản và phối hợp hiệu quả cùng đồng đội. Đã tham gia triển khai thành công các sản phẩm như Invibrowser (trình duyệt anti-detect SaaS), 1Clickdown (nền tảng tự động hóa xử lý media) và nhiều dự án web chất lượng cao.",
      avatarUrl: "/developer-avatar.png",
      avatarAlt: "Lê Quang Toàn - Full-stack Web & Desktop Developer",
      stats: [
        { value: "1+", label: "Năm Kinh Nghiệm" },
        { value: "24/7", label: "Hỗ Trợ & Đồng Hành" },
      ],
      statusBadge: "Sẵn sàng cho dự án mới",
      tags: ["Fullstack Web", "Desktop SaaS", "Automation", "Clean Code"],
      values: [
        {
          title: "Code Sạch",
          description:
            "Chú trọng viết code dễ đọc, dễ bảo trì và mở rộng lâu dài, tuân thủ các nguyên tắc thiết kế hệ thống chuẩn mực.",
        },
        {
          title: "Giao Diện Mượt",
          description:
            "Tạo ra trải nghiệm người dùng (UI/UX) tinh tế, thu hút về thị giác và tương tác mượt mà trên mọi thiết bị.",
        },
        {
          title: "Tối Ưu Hiệu Năng",
          description:
            "Tối ưu tốc độ tải trang, luồng xử lý dữ liệu backend và tự động hóa các thao tác lặp đi lặp lại một cách hiệu quả.",
        },
        {
          title: "Làm Việc Nhóm",
          description:
            "Lắng nghe, giao tiếp cởi mở và chủ động phối hợp với đồng đội để cùng hướng tới mục tiêu chung của sản phẩm.",
        },
        {
          title: "Luôn Học Hỏi",
          description:
            "Chủ động cập nhật các công nghệ, công cụ và giải pháp kỹ thuật mới nhất để áp dụng hiệu quả vào sản phẩm thực tế.",
        },
        {
          title: "Tư Duy Sáng Tạo",
          description:
            "Thích chinh phục những bài toán khó, không ngại thử thách kỹ thuật và tìm ra giải pháp tối ưu nhất cho bài toán.",
        },
      ],
    },
    contact: {
      title: "Liên hệ",
      summary:
        "Cần phát triển dự án web app, phần mềm desktop SaaS hoặc công cụ tự động hóa quy trình? Kết nối ngay để cùng trao đổi!",
      emailLabel: "Email",
      githubLabel: "GitHub",
      locationLabel: "Địa điểm",
      location: "Đà Nẵng, Việt Nam",
    },
    accessibility: {
      mainNavigation: "Điều hướng chính",
      quickLinks: "Liên kết nhanh",
      profileSummary: "Thông tin tóm tắt",
    },
    footer: "Lê Quang Toàn Portfolio 2026",
  },
  en: {
    locale: "en",
    homePath: "/en",
    alternatePath: "/",
    alternateLabel: "Tiếng Việt",
    seo: {
      title: "Le Quang Toan | Full-stack Web & Desktop Developer",
      description:
        "Portfolio of Le Quang Toan - Full-stack Web & Desktop Developer based in Da Nang, crafting performant applications with React, Next.js, Vue, Node.js, and Electron.",
    },
    nav: [
      { label: "Home", href: "/en#home" },
      { label: "About", href: "/en#about" },
      { label: "Skills", href: "/en#stack" },
      { label: "Projects", href: "/en#work" },
      { label: "Contact", href: "/en#contact" },
    ],
    hero: {
      eyebrow: "Full-stack Web & Desktop Developer",
      title: "Le Quang Toan",
      summary:
        "Full-stack Developer based in Da Nang, focused on building maintainable web and desktop applications with clean architecture.",
      primaryCta: "View work",
      secondaryCta: "Get in touch",
    },
    skills: {
      title: "Skills",
      summary:
        "Technical skills and core stack I leverage to build web applications, APIs, and desktop automation tools.",
    },
    work: {
      title: "Projects",
      summary:
        "Hands-on experience across modern frontend, Node.js backends, and desktop automation applications.",
      coreSkillsTitle: "Core Skills",
      techStackTitle: "Tech Stack",
      selectedWorkTitle: "Selected Projects",
      experienceTitle: "Work Experience",
      educationTitle: "Education",
      certificatesTitle: "Certifications",
    },
    skillCards: [
      {
        id: "software",
        icon: "monitor",
        titleAccent: "Software",
        titleSecondLine: "Development",
        accentColor: "#ec4899",
        description:
          "Experienced in building secure, flexible backends. Prioritizing clean code architecture (MVC, Repository Pattern), efficient database design, and intuitive RESTful APIs.",
        primarySkills: [
          "Node.js",
          "Express 5",
          "TypeScript",
          "RESTful API",
          "Casbin",
        ],
        subSkills: [
          {
            label: "Auth & Security",
            items:
              "JWT, OAuth 2.0, Casbin (RBAC/ABAC IAM), AES-256-GCM Encryption, Rate Limiting",
          },
          {
            label: "Realtime & Data Pipeline",
            items:
              "Socket.io (Websocket), Cloudinary API, Webhooks, Background Queue",
          },
          {
            label: "Databases",
            items:
              "PostgreSQL, Local SQLite, MongoDB, Supabase, Prisma/ORM, Repository Pattern",
          },
          {
            label: "DevOps, Arch & QA",
            items:
              "Docker, CI/CD GitHub Actions, Vercel, Render, E2E & Unit Testing, Postman",
          },
        ],
      },
      {
        id: "frontend",
        icon: "react",
        titleAccent: "Frontend Dev",
        titleSecondLine: "React, NextJS, Vue",
        accentColor: "#38bdf8",
        description:
          "Specialized in bringing designs to life with fluid animations, responsive layouts, and fast loading speeds using React 19, Next.js, and Vue 3.",
        primarySkills: [
          "React 19",
          "Next.js",
          "Vue 3",
          "TypeScript",
          "Tailwind CSS",
        ],
        subSkills: [
          {
            label: "State Management & Forms",
            items:
              "Zustand, Redux Toolkit, Pinia, TanStack Query (React Query), Context API, Zod",
          },
          {
            label: "UI Architecture & Workflows",
            items:
              "Tailwind CSS 4, Vue Flow, ELK.js, CSS Modules, Responsive Design, Web Vitals, SEO/GEO",
          },
          {
            label: "Core Foundation",
            items:
              "JavaScript (ES6+), TypeScript, HTML5/CSS3, Component-driven Architecture, Vite",
          },
        ],
      },
      {
        id: "desktop",
        icon: "flutter",
        titleAccent: "Desktop Dev",
        titleSecondLine: "Electron, Automation",
        accentColor: "#f97316",
        description:
          "Focused on building cross-platform desktop SaaS applications and automation pipelines that save users hours of repetitive manual work.",
        primarySkills: ["Electron 40", "Puppeteer", "Playwright", "FFmpeg"],
        subSkills: [
          {
            label: "Automation & Scraping",
            items:
              "Puppeteer, Playwright, Chrome DevTools Protocol (CDP), Anti-detect Profile, Custom Chromium",
          },
          {
            label: "Multi-process & Media Pipeline",
            items:
              "Electron Child Processes, Worker Threads, Soft Distributed Lock, Auto-sync Queue, FFmpeg",
          },
          {
            label: "Build & Operations",
            items:
              "Docker, GitHub Actions CI/CD, Encrypted Local SQLite, Multi-window, Windows Installer & Auto-update",
          },
        ],
      },
    ],
    skillGroups: [
      {
        title: "Frontend product UI",
        items: [
          "React 19",
          "Next.js",
          "Vue 3",
          "Pinia",
          "TypeScript",
          "Tailwind CSS 4",
          "Zustand",
          "React Query",
          "Zod",
        ],
      },
      {
        title: "Backend and APIs",
        items: [
          "Node.js",
          "Express 5",
          "REST API",
          "JWT",
          "Casbin (IAM)",
          "Socket.io",
          "AES-256 Encryption",
          "Repository Pattern",
        ],
      },
      {
        title: "Desktop automation",
        items: [
          "Electron 40",
          "Puppeteer",
          "Playwright",
          "CDP",
          "FFmpeg",
          "GravBrowser",
          "Anti-detect Profile",
          "Child Processes",
        ],
      },
    ],
    techStack: [
      {
        title: "Frontend",
        items: [
          "HTML5",
          "CSS3",
          "Tailwind CSS 4",
          "React 19",
          "Next.js",
          "Vue 3",
          "Pinia",
          "Zustand",
          "React Query",
          "Zod",
          "Vite",
          "Vue Flow",
          "ELK.js",
        ],
      },
      {
        title: "Backend & Security",
        items: [
          "TypeScript",
          "Node.js",
          "Express 5",
          "JWT",
          "Casbin (RBAC/ABAC)",
          "Socket.io",
          "Cloudinary",
          "AES-256-GCM",
          "PBKDF2",
          "Repository Pattern",
        ],
      },
      {
        title: "Desktop & Automation",
        items: [
          "Electron 40",
          "Puppeteer",
          "Playwright",
          "CDP",
          "Custom Chromium Launcher",
          "GravBrowser",
          "FFmpeg",
          "Child Processes",
          "Auto-update",
        ],
      },
      {
        title: "Data, Tools & Testing",
        items: [
          "PostgreSQL",
          "SQLite",
          "MongoDB",
          "Supabase",
          "Docker",
          "GitHub Actions",
          "Vercel",
          "Render",
          "Postman",
          "E2E Testing",
          "Unit Testing",
        ],
      },
    ],
    workItems: [
      {
        title: "Invibrowser",
        period: "05/2026 - 08/2026",
        role: "Fullstack Desktop SaaS App",
        summary:
          "A desktop SaaS app for managing isolated browser profiles, featuring seamless cloud auto-sync and granular multi-tenant team permissions.",
        highlights: [
          "Engineered a Soft Distributed Lock mechanism using Runtime Presence to detect and prevent profile data conflicts across devices.",
          "Built a seamless background Auto-sync Queue for keeping profile folders in sync between local storage and cloud servers.",
          "Designed an intuitive drag-and-drop Visual Workflow Builder using Vue Flow and ELK.js.",
          "Implemented fine-grained multi-tenant access control based on user roles and teams with Casbin IAM.",
          "Structured a clean 3-tier architecture (Frontend, Runtime, Server) paired with the Repository Pattern for long-term maintainability.",
        ],
        stack: [
          "Vue 3",
          "TypeScript",
          "Electron 40",
          "Node.js",
          "Express 5",
          "PostgreSQL",
          "Casbin",
          "Pinia",
          "Vue Flow",
          "ELK.js",
          "CDP",
        ],
        href: "https://invibrowser.com",
      },
      {
        title: "1Clickdown",
        period: "10/2025 - 05/2026",
        role: "Fullstack Desktop Automation App",
        summary:
          "An internal desktop platform for automated batch video processing and web data harvesting, saving up to 80-90% of manual effort.",
        highlights: [
          "Offloaded heavy processing to background child processes in Electron, enabling parallel video rendering (up to 5 streams) with zero UI lag.",
          "Built an automated FFmpeg media pipeline for batch cutting, zooming, and audio/text overlays in just a few clicks.",
          "Created Puppeteer/CDP automation scripts integrated with anti-detect profiles for Facebook group crawling and account insights.",
          "Secured sensitive user data in a local SQLite database using the Repository Pattern and AES-256-GCM encryption.",
          "Set up automated build pipelines using Docker and GitHub Actions, delivering signed Windows installers and auto-updates.",
        ],
        stack: [
          "React 19",
          "TypeScript",
          "Electron",
          "Node.js",
          "SQLite",
          "FFmpeg",
          "Puppeteer",
          "CDP",
          "AES-256",
          "Docker",
          "GitHub Actions",
        ],
      },
      {
        title: "Product landing pages",
        period: "2025 - 2026",
        role: "Web Developer",
        summary:
          "Product landing pages for Invibrowser.com and Sellnity.com featuring modern design, clear positioning, and SEO/GEO optimization.",
        highlights: [
          "Crafted content focused on product value propositions and user search intent.",
          "Built responsive, lightning-fast web pages optimized for independent multi-language indexing.",
          "Achieved top Web Vitals scores for enhanced discoverability on search engines and AI search engines.",
        ],
        stack: ["React", "Next.js", "Tailwind CSS", "TypeScript", "SEO", "GEO"],
      },
    ],
    experience: [
      {
        company: "Sellnity",
        period: "09/2025 - 08/2026",
        role: "Developer Fullstack Web App",
        summary:
          "Hands-on product development experience: building web apps, desktop SaaS applications, high-converting landing pages, and automated lead generation crawlers for sales teams.",
      },
    ],
    education: [
      {
        institution: "Dong A University",
        degree: "Bachelor of Information Technology",
        period: "2021 - 2025",
        gpa: "GPA: 3.28/4.0 (8.09/10)",
        english: "English Level: B1",
      },
    ],
    certificates: [
      {
        title: "The Ultimate React Course 2024: React, Next.js, Redux & More",
        issuer: "Udemy (Instructor Jonas Schmedtmann)",
        issueDate: "2024",
        credentialUrl:
          "https://www.udemy.com/certificate/UC-195fc030-2dc0-4e20-8de7-82c733491b11",
      },
    ],
    about: {
      title: "About",
      summary:
        "Full-stack Developer with over 1 year of hands-on product experience in web, app, and desktop software development. Specialized in technical problem-solving across diverse domains — from eye-catching landing pages, custom e-commerce web apps, and internal chat platforms to complex desktop SaaS tools and automation pipelines.\n\nCommitted to strong ownership, clean code standards, disciplined system architecture, and effective team collaboration. Successfully delivered production-ready software including Invibrowser (Anti-detect browser SaaS) and 1Clickdown (media automation platform).",
      avatarUrl: "/developer-avatar.png",
      avatarAlt: "Le Quang Toan - Full-stack Web & Desktop Developer",
      stats: [
        { value: "1+", label: "Years Experience" },
        { value: "24/7", label: "Support & Dedication" },
      ],
      statusBadge: "Available for new projects",
      tags: ["Fullstack Web", "Desktop SaaS", "Automation", "Clean Code"],
      values: [
        {
          title: "Clean Code",
          description:
            "Prioritizing readable, scalable, and maintainable code adhering to solid system design principles.",
        },
        {
          title: "Fluid UI/UX",
          description:
            "Creating visually engaging, intuitive, and highly responsive user experiences across all devices.",
        },
        {
          title: "Performance",
          description:
            "Optimizing page load speeds, backend data flows, and background task automation.",
        },
        {
          title: "Teamwork",
          description:
            "Active listening, clear communication, and proactive collaboration to drive product goals forward.",
        },
        {
          title: "Continuous Growth",
          description:
            "Constantly updating skills with modern tools and technical solutions to apply effectively in production.",
        },
        {
          title: "Creative Mindset",
          description:
            "Tackling complex challenges and finding effective, well-engineered solutions.",
        },
      ],
    },
    contact: {
      title: "Contact",
      summary:
        "Looking for a developer for web apps, desktop SaaS tools, or workflow automation? Let us connect!",
      emailLabel: "Email",
      githubLabel: "GitHub",
      locationLabel: "Location",
      location: "Da Nang, Viet Nam",
    },
    accessibility: {
      mainNavigation: "Main navigation",
      quickLinks: "Quick links",
      profileSummary: "Profile summary",
    },
    footer: "Le Quang Toan Portfolio 2026",
  },
};

export const contactLinks = {
  email: "mailto:lequangtoan1904@gmail.com",
  emailText: "lequangtoan1904@gmail.com",
  github: "https://github.com/lequangtoan2003",
  githubText: "github.com/lequangtoan2003",
} as const;
