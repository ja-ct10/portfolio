export type Category = "project" | "competition" | "workshop" | "seminar";

export interface PortfolioItem {
  id: number;
  slug: string;
  category: Category;
  title: string;
  subtitle: string;
  description: string;
  details?: string;
  image: string;
  tags: string[];
  href?: string;
  placement?: string;
  year: string;
  // Case study fields
  client?: string;
  timeline?: string;
  role?: string;
  features?: string[];
  stack?: string[];
  outcomes?: string[];
  highlights?: { label: string; value: string }[];
}

export const portfolioItems: PortfolioItem[] = [
  // Projects
  {
    id: 1,
    slug: "enroll360",
    category: "project",
    title: "Enroll360",
    subtitle: "Web-based school enrollment and payment management system",
    description:
      "A web-based school enrollment and payment management system streamlining student enrollment, re-enrollment, tracking, and reporting.",
    details:
      "Enroll360 was developed to address the growing challenges schools encounter in managing student enrollment and payment processes under traditional, paper-based systems. Schools deal with hundreds or thousands of applicants every year, and the absence of a centralized digital system often results in slow procedures, inconsistent documentation, and overwhelming workloads for both staff and parents. Students and parents often wait for hours to secure an enrollment slot, sometimes arriving before the school opens, leading to long lines where many are cut off and forced to return the following day. Current practices rely heavily on manual handling of forms, records, and payments, making the system susceptible to errors such as misplaced documents, incomplete records, duplicate entries, or inconsistent data. By digitizing these tasks, Enroll360 provides a more organized and transparent system for managing student applications and tuition-related transactions.",
    image: "/images/enroll360.png",
    tags: ["WEB", "LARAVEL", "MYSQL"],
    href: "https://github.com/ja-ct10/School-Management-System.git",
    year: "2025",
    client: "Academic Institution",
    timeline: "3 months",
    role: "Full-Stack Developer",
    features: [
      "Online enrollment and re-enrollment with form submission, document upload, and status updates",
      "Payment tracking module for tuition fees, installments, and proof of payment validation",
      "Printable/downloadable PDF payment reminders for parents",
      "Dashboards and reports with enrollment statistics, student distribution by grade, and payment status",
      "Communication features: announcements, comments, and email notifications for updates",
    ],
    stack: ["PHP", "Laravel", "MySQL"],
    outcomes: [
      "Eliminated long queues by enabling parents to enroll and submit documents online",
      "Reduced misplaced documents and duplicate entries through centralized digital records",
      "Enabled administrators to review, verify, approve or reject applications efficiently",
      "Provided transparent payment tracking with history and proof of payment validation",
      "Improved school-parent communication through announcements and email notifications",
    ],
    highlights: [
      { label: "PLATFORM", value: "Web" },
      { label: "FRAMEWORK", value: "Laravel" },
      { label: "DATABASE", value: "MySQL" },
    ],
  },
  {
    id: 2,
    slug: "ibrgy",
    category: "project",
    title: "iBrgy",
    subtitle: "Barangay Management System",
    description:
      "A mobile app for barangay certificate requests and community communication - realtime tracking and digital document workflows.",
    details:
      "iBrgy is a mobile-based application designed to streamline barangay services and community communication. It provides a digital platform for residents to request official documents and for barangay officials to manage these requests and share important announcements efficiently.",
    image: "/images/ibrgy.png",
    tags: ["MOBILE", "ANDROID", "FIREBASE"],
    href: "https://github.com/ja-ct10/Barangay-Management-System.git",
    year: "2026",
    client: "Local Government Unit",
    timeline: "2 months",
    role: "Mobile Developer",
    features: [
      "Secure registration and login with real-time password strength validation",
      "Document requests: Barangay Clearance, Certificate of Indigency, Residency, and other permits",
      "Digital attachments via Cloudinary integration (images or PDFs)",
      "Real-time request tracking (Pending, Processing, Ready for Pickup)",
      "Community announcements with priority levels",
      "Admin dashboard with request management and status updates",
      "Role-based access for authorized personnel",
    ],
    stack: ["Android", "Firebase", "Java", "Cloudinary"],
    outcomes: [
      "Enabled residents to request documents directly from the app",
      "Provided real-time status tracking for all applications",
      "Gave barangay staff a comprehensive dashboard for request management",
      "Improved community engagement through digital announcements",
    ],
    highlights: [
      { label: "PLATFORM", value: "Mobile" },
      { label: "BACKEND", value: "Firebase" },
      { label: "LANGUAGE", value: "Java" },
    ],
  },
  {
    id: 3,
    slug: "coinstrike",
    category: "project",
    title: "CoinStrike",
    subtitle: "2D Side-Scrolling Action Platformer",
    description:
      "A browser-playable 2D action platformer with procedurally generated worlds, combo mechanics, and a final boss fight.",
    details:
      "CoinStrike is a 2D side-scrolling action platformer inspired by classic games like Super Mario Bros., where speed, combat, and survival collide. Run through an endless procedurally generated world, gathering coins, taking down enemies, and pushing your limits before the final boss arrives. Platforms break beneath you, rocks fall from above, and enemies grow stronger the longer you survive. CoinStrike is an objective-based game rather than a purely score-driven experience. Players are required to complete missions and defeat the final boss in order to finish the game. A scoring system measures how well players perform in combat, and high scores are saved for future playthroughs.",
    image: "/images/coinstrike.png",
    tags: ["WEB", "PYGAME"],
    href: "https://coinstrike.vercel.app/",
    year: "2026",
    client: "Personal Project",
    timeline: "1 month",
    role: "Game Developer",
    features: [
      "Three weapons: Gun, Spear, and Grenade with in-game shop",
      "Combo system: consecutive kills multiply score and boost speed/damage",
      "Objective-based progression: complete 3 missions to unlock the final boss",
      "Powerups: Magnet, Turbo, Shield, and Ammo",
      "Procedurally generated platforming with increasing difficulty",
      "High score recording system saved across runs",
      "Final boss fight as the conclusion of each run",
    ],
    stack: ["Python", "Pygame", "JavaScript", "Vercel"],
    outcomes: [
      "Deployed as a fully playable browser game",
      "Implemented procedural world generation with environmental hazards",
      "Built combo and scoring system with persistent high scores",
    ],
    highlights: [
      { label: "PLATFORM", value: "Browser" },
      { label: "ENGINE", value: "Pygame" },
      { label: "LEVELS", value: "Procedural" },
    ],
  },
  {
    id: 4,
    slug: "iponpay",
    category: "project",
    title: "IponPay",
    subtitle: "Blockchain-powered Paluwagan savings on Stellar",
    description:
      "The centuries-old Filipino paluwagan tradition on the Stellar blockchain - transparent, on-chain, verifiable rotating savings.",
    details:
      "IponPay is a decentralized Paluwagan platform built on the Stellar blockchain. Members contribute a fixed amount of XLM each cycle into a shared pool, and the full pool is paid out to one member at a time - fully transparent, fully on-chain, and verifiable by anyone. The app uses Freighter wallet for authentication, fetches pool balances directly from Stellar Horizon in real time, and records every transaction in a Soroban smart contract. The payout schedule is derived automatically from contribution order, and every tx hash links to Stellar Expert for independent verification.",
    image: "/images/ipon-pay.png",
    tags: ["WEB3", "BLOCKCHAIN"],
    href: "http://iponpay.vercel.app/",
    year: "2026",
    client: "Stellar Ecosystem",
    timeline: "6 weeks",
    role: "Blockchain Developer",
    features: [
      "Self-registering members via Freighter wallet - no sign-ups needed",
      "Live pool tracking with real-time balance from Stellar Horizon (polls every 15s)",
      "Dynamic payout schedule derived from contribution order with Claim Payout button",
      "All contributions submitted to Stellar Testnet and recorded in Soroban smart contract",
      "Every transaction linked to Stellar Expert for independent verification",
      "Dashboard with XLM balance, pool progress, group stats, and member list",
      "Confetti animation and toast with Stellar Expert link on successful contribution",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Stellar SDK", "Soroban", "Freighter"],
    outcomes: [
      "Deployed on Stellar Testnet with fully functional pool and payout system",
      "Demonstrated trustless rotating savings with on-chain verification",
      "Submitted to Stellar Journey to Mastery: Monthly Builder Challenges",
    ],
    highlights: [
      { label: "NETWORK", value: "Stellar" },
      { label: "CONTRACTS", value: "Soroban" },
      { label: "TRUST", value: "On-chain" },
    ],
  },
  // Competitions
  {
    id: 5,
    slug: "android-hackathon",
    category: "competition",
    title: "Android Hackathon - 2nd Placer",

    subtitle: "Main Developer",
    description:
      "Built an e-commerce mobile-based platform under 5 hours with a 3-person team.",
    details:
      "Within a limited time, we were tasked with designing and developing a mobile application based on an e-commerce platform, with the goal of creating a functional and user-friendly app that demonstrates a complete ordering process during the Android Hackathon, a competition under Collaboratech 2026. We were able to create an application named ShopLift, where I served as the main developer, and our team won 2nd place.",
    image: "/images/android-hackathon.jpg",
    tags: ["HACKATHON", "ANDROID"],
    placement: "2ND",
    year: "2026",
    role: "Main Developer",
    highlights: [
      { label: "PLACEMENT", value: "2nd Place" },
      { label: "TIME", value: "5 hours" },
      { label: "TEAM", value: "3 members" },
    ],
  },
  {
    id: 6,
    slug: "hack-it-banking",
    category: "competition",
    title: "hack-it! The New Era of Banking - Participant",

    subtitle: "Main Developer, Database Designer",
    description:
      "Built AI-assisted KYC insurance platform for faster application review and processing.",
    details:
      "We competed with 12 teams in the 2-day hackathon event hack-It! The New Era of Banking, presenting LifeGard as our contribution\u2014an AI-assisted life insurance system designed to improve underwriting efficiency and application processing speed. LifeGard uses machine learning trained on historical approved and rejected applications to adapt risk assessments based on each insurance company's criteria, including factors such as age and medical conditions. As a decision-support tool, it streamlines the evaluation process while still requiring human underwriters for complex cases such as fraud detection and final approval. Although this was our first hackathon event and we did not win, the experience provided us with valuable learning opportunities and strengthened our skills in innovation, teamwork, and system development.",
    image: "/images/hackathon-1.jpg",
    tags: ["FINTECH", "AI"],
    placement: "PARTICIPANT",
    year: "2025",
    role: "Main Developer, Database Designer",
    highlights: [
      { label: "TEAMS", value: "12 competing" },
      { label: "DURATION", value: "2 days" },
      { label: "PRODUCT", value: "LifeGard" },
    ],
  },
  {
    id: 7,
    slug: "it-skills-olympics",
    category: "competition",
    title: "14th IT Skills Olympics - Participant",

    subtitle: "Java Programming",
    description:
      "Represented my school in a team-based Java programming competition, solving algorithmic challenges under time constraints.",
    details:
      "Represented my school as a competitor in the Java Programming Competition, a team-based face-to-face coding contest that challenged participants to solve algorithmic and programming problems using Java within strict time constraints. Working alongside a fellow representative, I applied problem-solving, debugging, and collaboration skills to develop efficient solutions while competing against students from other schools. The experience strengthened my technical knowledge in Java, improved my ability to think critically under pressure, and enhanced my teamwork and communication skills in a competitive environment.",
    image: "/images/it-olympics.jpeg",
    tags: ["JAVA", "ALGORITHMS"],
    placement: "PARTICIPANT",
    year: "2025",
    role: "Team Competitor",
    highlights: [
      { label: "FORMAT", value: "Team-based" },
      { label: "LANGUAGE", value: "Java" },
      { label: "LEVEL", value: "Regional" },
    ],
  },
  {
    id: 8,
    slug: "code-fest",
    category: "competition",
    title: "Tagisan ng Talino: Code Fest - 2nd Placer",

    subtitle: "Main Developer",
    description:
      "Built an e-commerce mobile app under 5 hours with a 3-person team.",
    details:
      "We competed in Tagisan ng Talino: CodeFest, a local-level mobile app hackathon, where we were tasked to develop an Android application focused on managing construction inventory and handling the borrowing and returning of construction equipment. The system also required features such as tracking item availability, recording transactions, and generating PDF reports for documentation and monitoring purposes. As the main developer, I was able to design and implement a functional and user-friendly interface, including core features for inventory management and equipment borrowing/returning workflows. The application also emphasized accurate record keeping and efficient data management to support real-world construction site operations.",
    image: "/images/code-fest.jpg",
    tags: ["HACKATHON", "ANDROID"],
    placement: "2ND",
    year: "2026",
    role: "Main Developer",
    highlights: [
      { label: "PLACEMENT", value: "2nd Place" },
      { label: "TIME", value: "5 hours" },
      { label: "FOCUS", value: "Inventory" },
    ],
  },
  {
    id: 9,
    slug: "stellar-builder-challenge",
    category: "competition",
    title: "Stellar Journey to Mastery: Monthly Builder Challenges",

    subtitle: "Building IponPay on Stellar",
    description:
      "Developed IponPay on the Stellar Testnet \u2014 a blockchain-powered community savings platform inspired by Filipino Paluwagan.",
    details:
      "Joined in the Stellar Journey to Mastery: Monthly Builder Challenges, where I designed and developed IponPay\u2014a blockchain-powered community savings platform built on the Stellar Testnet. Inspired by the Filipino Paluwagan system, IponPay modernizes informal rotating savings groups by enabling transparent XLM contributions, wallet-based authentication, on-chain transaction verification, and immutable contribution records through Soroban smart contracts. Throughout the competition, I applied modern web development practices using Next.js, TypeScript, Tailwind CSS, and Stellar SDK while gaining hands-on experience with blockchain development, smart contract programming in Rust, wallet integration, and decentralized application architecture. This experience strengthened my skills in Web3 development, financial technology, problem-solving, and building production-ready applications on the Stellar ecosystem.",
    image: "/images/stellar.png",
    tags: ["STELLAR", "BLOCKCHAIN"],
    placement: "PARTICIPANT",
    year: "2026",
    role: "Solo Builder",
    highlights: [
      { label: "CHAIN", value: "Stellar" },
      { label: "LANGUAGE", value: "Rust" },
      { label: "STATUS", value: "Deployed" },
    ],
  },
  // Workshops
  {
    id: 10,
    slug: "figma-workshop",
    category: "workshop",
    title: "Exploring the Basics of Figma: From Sketch to Prototype",
    subtitle: "Learned the basics of Figma",
    description:
      "Learned the basics of Figma thru hands-on practices.",
    details:"Participated in the Collaboratech 2025: Into the Tech Maze workshop, 'Exploring the Basics of Figma: From Sketch to Prototype,' where I learned the fundamentals of UI/UX design and gained hands-on experience creating designs from scratch using Figma.",
    image: "/images/collaboratech.jpg",
    tags: ["UI/UX", "FIGMA"],
    placement: "ATTENDEE",
    year: "2025",
    role: "Workshop Participant",
    highlights: [
      { label: "TOOL", value: "Figma" },
      { label: "FOCUS", value: "UI/UX" },
      { label: "TYPE", value: "Hands-on" },
    ],
  },
  {
    id: 11,
    slug: "stellar-bootcamp",
    category: "workshop",
    title: "Build on Stellar Bootcamp - STI Global",

    subtitle: "Learning Blockchain & Smart Contract Development",
    description:
      "Learned to build and deploy smart contracts on the Stellar network using Soroban.",
    details:
      "Attended the Build on Stellar Bootcamp: STI Global Edition, a hands-on blockchain workshop focused on developing decentralized applications on the Stellar network. Throughout the bootcamp, I learned the fundamentals of Stellar and Soroban, wrote and deployed my first smart contract, and gained practical experience building blockchain applications through live coding sessions. The workshop emphasized learning by doing, allowing participants to experiment, receive real-time guidance, and deploy working smart contracts on Stellar Testnet. This experience strengthened my understanding of Web3 development, smart contract programming in Rust, the Stellar ecosystem, and decentralized application architecture, while also providing a portfolio-ready project and preparing me for future Stellar hackathons and ecosystem opportunities.",
    image: "/images/stellar-bootcamp.jpg",
    tags: ["BLOCKCHAIN", "SOROBAN"],
    placement: "ATTENDEE",
    year: "2026",
    role: "Bootcamp Participant",
    highlights: [
      { label: "DURATION", value: "3 days" },
      { label: "FOCUS", value: "Soroban" },
      { label: "FORMAT", value: "Bootcamp" },
    ],
  },
  {
    id: 12,
    slug: "kiroverse-workshop",
    category: "workshop",
    title: "Build Nights: Design to Code Workshop",

    subtitle: "Kiroverse Workshop Week 2",
    description:
      "Attended Build Nights: Design to Code hosted by AWSUG \u2014 learned Figma-to-Kiro workflow and MCP integration.",
    details:
      "I've been using Kiro for about 3 months, but I was still figuring out how to make the most of its features, especially Kiro Powers and Skills. This workshop helped me understand how to connect Figma to Kiro using the MCP server, generate production-ready code, organize projects with a proper design system, and learn the complete workflow for transforming Figma designs into production-ready web applications. I gained hands-on experience with Kiro, Figma MCP, design systems, and AI-powered development tools while building a responsive portfolio website using Next.js, React, TypeScript, and Tailwind CSS. One of the things I enjoyed most was the hands-on activities, where I was able to follow along and apply what was being taught. After the workshop, I started using what I learned in the projects I'm currently building, and it's already helping me work more efficiently. I also had a great time meeting and connecting with fellow developers. Grateful to my friends, Rhenmart Delacruz and Reymark Panes, for encouraging me to attend this event. Looking forward to joining more workshops like this!",
    image: "/images/kiroverse-workshop-1.jpg",
    tags: ["KIRO", "AWS", "MCP"],
    placement: "ATTENDEE",
    year: "2026",
    role: "Workshop Participant",
    highlights: [
      { label: "TOOL", value: "Kiro" },
      { label: "HOST", value: "AWSUG" },
      { label: "FLOW", value: "Design to Code" },
    ],
  },
  {
    id: 13,
    slug: "skill-builder-workshop",
    category: "workshop",
    title: "Skill Builder Execution Workshop",

    subtitle: "Build your skills. Empower your community. Create impact.",
    description:
      "Learned about leadership, technical skills, and NextWork AI at the AWS Cloud Clubs Philippines workshop.",
    details:
      "I learned a lot from this workshop. Even though I'm not a member of any club or organization, the fact that I'm always the one leading every group project has taught me that it's not only about technical skills but also about leadership skills. Since I'm the type of person who has high expectations for everything I do, when those expectations are not met, I tend to get frustrated and disappointed in myself because I feel like I've failed as a leader. But after this workshop, I've realized that I need to lower my expectations and understand that effective leadership is about helping the team grow, not expecting perfection from everyone. Aside from that, one thing I enjoyed in this workshop was the introduction to NextWork AI, as it was my first time hearing about this platform. NextWork AI is an online learning platform focused on helping people build practical AI, cloud, software engineering, and DevOps skills through hands-on projects, which I loved the most because it provides a guide for me to follow and offers a wide variety of projects to choose from. During the workshop, I chose the Prompt Engineering project, specifically for Healthcare. You have the option to start on your own or follow a step-by-step guide, and I chose the latter. I finished the task in about an hour, and I would say that it really improved how I utilize AI through proper prompt engineering techniques to produce more accurate and trustworthy outputs. It also helped me understand how proper prompt design can reduce AI hallucinations. Big thanks to Sir Nikko for introducing this platform, I will definitely dive deeper into it!",
    image: "/images/skill-builder.jpg",
    tags: ["AWS", "LEADERSHIP"],
    placement: "ATTENDEE",
    year: "2026",
    role: "Workshop Participant",
    highlights: [
      { label: "HOST", value: "AWS Clubs PH" },
      { label: "FOCUS", value: "Leadership" },
      { label: "PLATFORM", value: "NextWork AI" },
    ],
  },
  // Seminars
  {
    id: 14,
    slug: "ai-at-work-ph",
    category: "seminar",
    title: "AI at Work PH 2026",

    subtitle: "Insights into AI Agents, Gemini Enterprise, and Google Workplace AI",
    description:
      "Attended AI at Work PH 2026 at Seda BGC, organized by Symph and Google.",
    details: "Attended AI at Work PH 2026 at Seda BGC, organized by Symph and Google. Gained insights into AI Agents, Gemini Enterprise, and Google Workspace, and learned how AI empowers people to work more efficiently, make better decisions, and improve productivity in modern workplaces.",
    image: "/images/symph-workshop-1.png",
    tags: ["AI", "GOOGLE"],
    placement: "ATTENDEE",
    year: "2026",
    role: "Seminar Attendee",
    highlights: [
      { label: "VENUE", value: "Seda BGC" },
      { label: "FOCUS", value: "AI Agents" },
      { label: "BY", value: "Symph + Google" },
    ],
  },
];

export type FilterKey = "all" | Category;

export const FILTERS: { key: FilterKey; label: string }[] = [
  { key: "all", label: "ALL" },
  { key: "project", label: "PROJECT" },
  { key: "competition", label: "COMPETITION" },
  { key: "workshop", label: "WORKSHOP" },
  { key: "seminar", label: "SEMINAR" },
];

export function getCount(key: FilterKey): number {
  if (key === "all") return portfolioItems.length;
  return portfolioItems.filter((item) => item.category === key).length;
}

export function getItemBySlug(slug: string): PortfolioItem | undefined {
  return portfolioItems.find((item) => item.slug === slug);
}

export function getAdjacentItems(slug: string): { prev: PortfolioItem | null; next: PortfolioItem | null } {
  const idx = portfolioItems.findIndex((item) => item.slug === slug);
  return {
    prev: idx > 0 ? portfolioItems[idx - 1] : portfolioItems[portfolioItems.length - 1],
    next: idx < portfolioItems.length - 1 ? portfolioItems[idx + 1] : portfolioItems[0],
  };
}
