                export type Locale = "vi" | "en";

type NavItem = {
  label: string;
  href: string;
};

type SkillGroup = {
  title: string;
  items: string[];
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
  work: {
    title: string;
    summary: string;
    coreSkillsTitle: string;
    techStackTitle: string;
    selectedWorkTitle: string;
    experienceTitle: string;
  };
  skillGroups: SkillGroup[];
  techStack: SkillGroup[];
  workItems: WorkItem[];
  experience: ExperienceItem[];
  about: {
    title: string;
    summary: string;
    points: string[];
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

const sharedNavIds = ["home", "work", "stack", "about", "contact"] as const;

function localizedAnchors(locale: Locale, labels: string[]): NavItem[] {
  const prefix = locale === "vi" ? "/" : "/en";

  return sharedNavIds.map((id, index) => ({
    label: labels[index],
    href: `${prefix}#${id}`,
  }));
}

export const portfolioContent: Record<Locale, PortfolioContent> = {
  vi: {
    locale: "vi",
    homePath: "/",
    alternatePath: "/en",
    alternateLabel: "English",
    seo: {
      title: "Le Quang Toan | Full-stack Web Fresher",
      description:
        "Portfolio của Lê Quang Toàn, lập trình viên Full-stack Web Fresher tập trung vào React, Next.js, Vue, Node.js và ứng dụng desktop automation.",
    },
    nav: localizedAnchors("vi", ["Trang chủ", "Công việc", "Stack", "Giới thiệu", "Liên hệ"]),
    hero: {
      eyebrow: "Full-stack Web Fresher",
      title: "Le Quang Toan",
      summary:
        "Lập trình viên Full-stack Web Fresher tại Đà Nẵng, tập trung xây dựng web app và desktop app có kiến trúc rõ ràng, dễ bảo trì và gắn với trải nghiệm người dùng.",
      primaryCta: "Xem công việc",
      secondaryCta: "Liên hệ",
    },
    work: {
      title: "Công việc",
      summary:
        "Kinh nghiệm của tôi nằm ở giao điểm giữa frontend hiện đại, backend Node.js và các workflow desktop automation cần tính ổn định trong môi trường sản phẩm thật.",
      coreSkillsTitle: "Kỹ năng chính",
      techStackTitle: "Tech Stack",
      selectedWorkTitle: "Dự án tiêu biểu",
      experienceTitle: "Kinh nghiệm",
    },
    skillGroups: [
      {
        title: "Frontend product UI",
        items: ["React", "Next.js", "Vue", "TypeScript", "Tailwind CSS", "State management"],
      },
      {
        title: "Backend and APIs",
        items: ["Node.js", "Express", "REST API", "JWT", "Socket.io", "Authorization"],
      },
      {
        title: "Desktop automation",
        items: ["Electron", "Puppeteer", "Playwright", "CDP", "FFmpeg", "Local data"],
      },
    ],
    techStack: [
      {
        title: "Frontend",
        items: ["HTML", "CSS", "Tailwind CSS", "React", "Next.js", "Vue", "React Query", "Zustand"],
      },
      {
        title: "Backend",
        items: ["TypeScript", "Node.js", "Express", "JWT", "Socket.io", "Cloudinary", "Casbin"],
      },
      {
        title: "Data and tools",
        items: ["PostgreSQL", "SQLite", "MongoDB", "Supabase", "Docker", "GitHub Actions", "Vercel"],
      },
    ],
    workItems: [
      {
        title: "Invibrowser",
        period: "05/2026 - 08/2026",
        role: "Fullstack Desktop App",
        summary:
          "Ứng dụng desktop SaaS cho quản lý browser profiles, đồng bộ cloud, phân quyền theo team và xây dựng workflow trực quan.",
        highlights: [
          "Triển khai soft distributed lock để giảm xung đột profile giữa nhiều thiết bị.",
          "Xây dựng auto-sync queue nền để đồng bộ folder và trạng thái profile với cloud.",
          "Thiết kế Visual Workflow Builder bằng Vue Flow và ELK.js.",
        ],
        stack: ["Vue 3", "TypeScript", "Electron", "Node.js", "PostgreSQL", "Casbin"],
        href: "https://invibrowser.com",
      },
      {
        title: "1Clickdown",
        period: "10/2025 - 05/2026",
        role: "Fullstack Desktop App",
        summary:
          "Nền tảng desktop nội bộ cho xử lý media và workflow automation, kết hợp Electron, React, Node.js, SQLite và FFmpeg.",
        highlights: [
          "Tách các tác vụ nặng sang child processes trong kiến trúc Electron nhiều tiến trình.",
          "Xây dựng media pipeline bằng FFmpeg cho batch video editing và progress tracking.",
          "Thiết lập build và release pipeline bằng Docker và GitHub Actions.",
        ],
        stack: ["React", "TypeScript", "Electron", "Node.js", "SQLite", "FFmpeg"],
      },
      {
        title: "Product landing pages",
        period: "2025 - 2026",
        role: "Web Developer",
        summary:
          "Thiết kế và phát triển landing pages cho Invibrowser.com và Sellnity.com với cấu trúc nội dung thân thiện SEO/GEO.",
        highlights: [
          "Tổ chức nội dung theo product positioning và search intent.",
          "Xây dựng giao diện web gọn, rõ thông điệp và dễ crawl.",
          "Tập trung vào performance, responsive layout và khả năng index độc lập.",
        ],
        stack: ["React", "Next.js", "Tailwind CSS", "SEO", "GEO"],
      },
    ],
    experience: [
      {
        company: "Sellnity",
        period: "09/2025 - 08/2026",
        role: "Developer Fullstack Web App",
        summary:
          "Tham gia phát triển web app, desktop app, landing pages và các công cụ automation trong môi trường sản phẩm thực tế.",
      },
    ],
    about: {
      title: "Giới thiệu",
      summary:
        "Tôi thích cách tiếp cận có hệ thống: tách lớp rõ ràng, giữ code dễ đọc và xây dựng tính năng với suy nghĩ về vận hành thật sau khi release.",
      points: [
        "Ưu tiên clean architecture và khả năng bảo trì.",
        "Có kinh nghiệm làm việc với frontend, backend, desktop runtime và automation.",
        "Đọc/viết tài liệu kỹ thuật tiếng Anh tốt, giao tiếp cơ bản.",
      ],
    },
    contact: {
      title: "Liên hệ",
      summary:
        "Nếu bạn cần một fresher full-stack có nền tảng React, Vue, Node.js và kinh nghiệm sản phẩm desktop automation, hãy kết nối với tôi.",
      emailLabel: "Email",
      githubLabel: "GitHub",
      locationLabel: "Location",
      location: "Da Nang, Viet Nam",
    },
    accessibility: {
      mainNavigation: "Điều hướng chính",
      quickLinks: "Liên kết nhanh",
      profileSummary: "Thông tin tóm tắt",
    },
    footer: "Le Quang Toan Portfolio 2026",
  },
  en: {
    locale: "en",
    homePath: "/en",
    alternatePath: "/",
    alternateLabel: "Tiếng Việt",
    seo: {
      title: "Le Quang Toan | Full-stack Web Fresher",
      description:
        "Portfolio of Le Quang Toan, a Full-stack Web Fresher focused on React, Next.js, Vue, Node.js, and automation-heavy desktop applications.",
    },
    nav: localizedAnchors("en", ["Home", "Work", "Stack", "About", "Contact"]),
    hero: {
      eyebrow: "Full-stack Web Fresher",
      title: "Le Quang Toan",
      summary:
        "A Full-stack Web Fresher based in Da Nang, focused on building maintainable web and desktop applications with clear architecture and thoughtful user experience.",
      primaryCta: "View work",
      secondaryCta: "Contact",
    },
    work: {
      title: "Work",
      summary:
        "My experience sits between modern frontend, Node.js backends, and desktop automation workflows that need reliability in real product environments.",
      coreSkillsTitle: "Core Skills",
      techStackTitle: "Tech Stack",
      selectedWorkTitle: "Selected Work",
      experienceTitle: "Experience",
    },
    skillGroups: [
      {
        title: "Frontend product UI",
        items: ["React", "Next.js", "Vue", "TypeScript", "Tailwind CSS", "State management"],
      },
      {
        title: "Backend and APIs",
        items: ["Node.js", "Express", "REST API", "JWT", "Socket.io", "Authorization"],
      },
      {
        title: "Desktop automation",
        items: ["Electron", "Puppeteer", "Playwright", "CDP", "FFmpeg", "Local data"],
      },
    ],
    techStack: [
      {
        title: "Frontend",
        items: ["HTML", "CSS", "Tailwind CSS", "React", "Next.js", "Vue", "React Query", "Zustand"],
      },
      {
        title: "Backend",
        items: ["TypeScript", "Node.js", "Express", "JWT", "Socket.io", "Cloudinary", "Casbin"],
      },
      {
        title: "Data and tools",
        items: ["PostgreSQL", "SQLite", "MongoDB", "Supabase", "Docker", "GitHub Actions", "Vercel"],
      },
    ],
    workItems: [
      {
        title: "Invibrowser",
        period: "05/2026 - 08/2026",
        role: "Fullstack Desktop App",
        summary:
          "A desktop SaaS application for browser profile management, cloud synchronization, team authorization, and visual workflow building.",
        highlights: [
          "Implemented a soft distributed lock to reduce profile conflicts across devices.",
          "Built a background auto-sync queue for profile folders and cloud state.",
          "Designed a Visual Workflow Builder with Vue Flow and ELK.js.",
        ],
        stack: ["Vue 3", "TypeScript", "Electron", "Node.js", "PostgreSQL", "Casbin"],
        href: "https://invibrowser.com",
      },
      {
        title: "1Clickdown",
        period: "10/2025 - 05/2026",
        role: "Fullstack Desktop App",
        summary:
          "An internal desktop platform for media processing and automation workflows, built with Electron, React, Node.js, SQLite, and FFmpeg.",
        highlights: [
          "Separated heavy background tasks into child processes in a multi-process Electron architecture.",
          "Built an FFmpeg media pipeline for batch video editing and progress tracking.",
          "Set up build and release workflows with Docker and GitHub Actions.",
        ],
        stack: ["React", "TypeScript", "Electron", "Node.js", "SQLite", "FFmpeg"],
      },
      {
        title: "Product landing pages",
        period: "2025 - 2026",
        role: "Web Developer",
        summary:
          "Designed and developed landing pages for Invibrowser.com and Sellnity.com with SEO/GEO-friendly content structure.",
        highlights: [
          "Organized content around product positioning and search intent.",
          "Built focused web interfaces with clear messaging and crawlable structure.",
          "Prioritized performance, responsive layout, and independent indexing.",
        ],
        stack: ["React", "Next.js", "Tailwind CSS", "SEO", "GEO"],
      },
    ],
    experience: [
      {
        company: "Sellnity",
        period: "09/2025 - 08/2026",
        role: "Developer Fullstack Web App",
        summary:
          "Built web apps, desktop apps, landing pages, and automation tools in a real product environment.",
      },
    ],
    about: {
      title: "About",
      summary:
        "I like a system-oriented way of building: clear boundaries, readable code, and features designed with real operations after release in mind.",
      points: [
        "Prioritizes clean architecture and maintainability.",
        "Works across frontend, backend, desktop runtime, and automation.",
        "Comfortable reading and writing technical documentation in English, with basic communication.",
      ],
    },
    contact: {
      title: "Contact",
      summary:
        "If you need a fresher full-stack developer with React, Vue, Node.js, and desktop automation product experience, let us connect.",
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
