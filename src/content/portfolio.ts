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
  };
  skillGroups: SkillGroup[];
  techStack: SkillGroup[];
  workItems: WorkItem[];
  experience: ExperienceItem[];
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
      title: "Lê Quang Toàn | Full-stack Web Fresher",
      description:
        "Portfolio của Lê Quang Toàn, lập trình viên Full-stack Web Fresher tập trung vào React, Next.js, Vue, Node.js và ứng dụng desktop automation.",
    },
    nav: [
      { label: "Trang Chủ", href: "/#home" },
      { label: "Giới thiệu", href: "/#about" },
      { label: "Kỹ Năng", href: "/#stack" },
      { label: "Dự Án", href: "/#work" },
      { label: "Liên Hệ", href: "/#contact" },
    ],
    hero: {
      eyebrow: "Full-stack Web Fresher",
      title: "Lê Quang Toàn",
      summary:
        "Lập trình viên Full-stack Web Fresher tại Đà Nẵng, tập trung xây dựng web app và desktop app có kiến trúc rõ ràng, dễ bảo trì và gắn với trải nghiệm người dùng.",
      primaryCta: "Xem công việc",
      secondaryCta: "Liên hệ",
    },
    skills: {
      title: "Kỹ Năng",
      summary:
        "Các kỹ năng chuyên môn và công nghệ tôi sử dụng trong quá trình phát triển sản phẩm web, backend và ứng dụng desktop.",
    },
    work: {
      title: "Dự Án",
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
        "Tôi là Fullstack Developer với hơn 1 năm kinh nghiệm, chuyên nhận phát triển các web bán hàng, landing page, web chat nội bộ, app desktop nội bộ, SaaS và tự động hóa quy trình (Automation). Thành thạo các công nghệ như Node.js, React, Next.js, Vue, JavaScript, TypeScript và các công nghệ hiện đại khác.\n\nĐã triển khai thành công nhiều dự án lớn nhỏ như Invibrowser (Trình duyệt Anti-detect), 1Clickdown (nền tảng tự động hóa quy trình) cùng các dự án web đặt phòng, quản lý khách sạn, clone Instagram và landing page khác. Tôi cam kết mang đến giải pháp tối ưu, code chất lượng cao và hỗ trợ tận tình cho mọi dự án.",
      avatarUrl: "/developer-avatar.png",
      avatarAlt: "Lê Quang Toàn - Full-stack Web Developer",
      stats: [
        { value: "1+", label: "Năm Kinh Nghiệm" },
        { value: "24/7", label: "Hỗ Trợ Liên Tục" },
      ],
      statusBadge: "Sẵn sàng nhận dự án mới",
      tags: ["Fullstack Web", "Desktop SaaS", "Automation", "Clean Code"],
      values: [
        {
          title: "Code Sạch",
          description:
            "Tôi viết code dễ đọc, dễ bảo trì và có khả năng mở rộng tốt, tuân thủ các nguyên tắc thiết kế hệ thống chuẩn mực.",
        },
        {
          title: "Thiết Kế Đẹp",
          description:
            "Tôi tin vào việc tạo ra giao diện người dùng tối ưu UI/UX, thu hút về mặt thị giác và mang lại trải nghiệm mượt mà.",
        },
        {
          title: "Hiệu Suất",
          description:
            "Tôi tối ưu hóa tốc độ tải trang, luồng xử lý dữ liệu và tự động hóa các tác vụ phức tạp một cách hiệu quả.",
        },
        {
          title: "Hợp Tác",
          description:
            "Tôi làm việc tốt trong môi trường nhóm, giao tiếp rõ ràng và chủ động kết nối với các bên liên quan.",
        },
        {
          title: "Đam Mê",
          description:
            "Tôi đam mê công nghệ và liên tục cập nhật các giải pháp, công nghệ mới nhất để áp dụng vào sản phẩm thực tế.",
        },
        {
          title: "Sáng Tạo",
          description:
            "Tôi yêu thích thử thách, giải quyết các bài toán kỹ thuật phức tạp và đưa ra giải pháp sáng tạo, tối ưu.",
        },
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
    footer: "Lê Quang Toàn Portfolio 2026",
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
    nav: [
      { label: "Home", href: "/en#home" },
      { label: "About", href: "/en#about" },
      { label: "Skills", href: "/en#stack" },
      { label: "Projects", href: "/en#work" },
      { label: "Contact", href: "/en#contact" },
    ],
    hero: {
      eyebrow: "Full-stack Web Fresher",
      title: "Le Quang Toan",
      summary:
        "A Full-stack Web Fresher based in Da Nang, focused on building maintainable web and desktop applications with clear architecture and thoughtful user experience.",
      primaryCta: "View work",
      secondaryCta: "Contact",
    },
    skills: {
      title: "Skills",
      summary:
        "Technical skills and core stack I leverage to build web applications, APIs, and desktop automation tools.",
    },
    work: {
      title: "Projects",
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
        "I am a Full-stack Developer with over 1 year of experience, specializing in custom development of e-commerce platforms, landing pages, internal chat systems, desktop SaaS applications, and workflow automation. Proficient in modern technologies including Node.js, React, Next.js, Vue, JavaScript, and TypeScript.\n\nI have successfully delivered diverse projects such as Invibrowser (Anti-detect browser), 1Clickdown (workflow automation platform), hotel booking systems, Instagram clones, and high-performance landing pages. I am dedicated to delivering optimal solutions, clean code, and committed support for every project.",
      avatarUrl: "/developer-avatar.png",
      avatarAlt: "Le Quang Toan - Full-stack Web Developer",
      stats: [
        { value: "1+", label: "Years Experience" },
        { value: "24/7", label: "Dedicated Support" },
      ],
      statusBadge: "Available for new projects",
      tags: ["Fullstack Web", "Desktop SaaS", "Automation", "Clean Code"],
      values: [
        {
          title: "Clean Code",
          description:
            "I write readable, scalable, and maintainable code adhering to solid system design principles.",
        },
        {
          title: "Beautiful Design",
          description:
            "I focus on modern UI/UX design, creating visually engaging and intuitive user interfaces.",
        },
        {
          title: "Performance",
          description:
            "I optimize application loading speed, data processing flows, and background automation tasks.",
        },
        {
          title: "Collaboration",
          description:
            "I thrive in team environments, communicate clearly with stakeholders, and proactively solve issues.",
        },
        {
          title: "Passion",
          description:
            "I am passionate about technology and constantly learn modern techniques to apply to real products.",
        },
        {
          title: "Creativity",
          description:
            "I enjoy tackling complex technical challenges and finding creative, effective solutions.",
        },
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
