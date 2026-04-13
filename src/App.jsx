import React, { useState, useEffect } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { 
  Code, 
  Terminal, 
  Layout, 
  Bot, 
  FileText, 
  Calendar, 
  BarChart, 
  Globe, 
  Mail, 
  Phone,
  ChevronRight,
  Cpu,
  Zap,
  Layers,
  ExternalLink,
  Wrench,
  Star,
  TrendingUp,
  Award,
  DollarSign,
  Video,
  Clock,
  Briefcase,
  Utensils,
  Flame,
  Cat,
  ScanLine,
  X,
  Sparkles,
  MessageSquare,
  ArrowRight,
  Play,
  Music,
  Film,
  Folder,
  Palette,
  MapPin,
  GraduationCap,
  User,
  Share2,
  Brain,
  Lightbulb,
  Smile,
  Check,
  Search,
  Workflow,
  Database,
  Server,
  Cloud,
  Monitor,
  Smartphone,
  CheckCircle2,
  Info,
  Settings,
  Activity,
  Box,
  Cpu as Chip,
  Layers as Stack,
  MousePointer2,
  Send,
  MessageCircle as Facebook
} from 'lucide-react';

// --- GEMINI API SETUP ---
const apiKey = import.meta.env.VITE_GEMINI_API_KEY || "";
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

// --- DATA & TRANSLATIONS ---

const content = {
  th: {
    nav: {
      about: "เกี่ยวกับ",
      exp: "ประสบการณ์",
      skills: "ทักษะ",
      works: "ผลงาน",
      media: "สื่อสร้างสรรค์",
      ai: "AI Lab",
      contact: "ติดต่อ"
    },
    hero: {
      greeting: "สวัสดีครับ, ผมคือ",
      roles: ["Creative & Junior IT Support", "Graphic Designer", "Automation Enthusiast", "Funded Trader"],
      desc: "ผมทำงานด้านไอทีซัพพอร์ตเบื้องต้น (Basic Support) ควบคู่กับการออกแบบสื่อ (Visual Design) และกำลังศึกษาการพัฒนา AppSheet เพื่อช่วยลดภาระงานซ้ำซ้อน",
      cta: "ดูผลงานของผม",
      latest: "ผลงานล่าสุด"
    },
    about: {
      title: "ข้อมูลส่วนตัว & แนวคิด",
      name: "Kamphon Prayoonhan",
      age: "25 ปี (เกิด 22/05/2000)",
      education: "ปริญญาตรี สาขาการจัดการ (Bachelor of Management), มหาวิทยาลัยขอนแก่น",
      text: "ผมเริ่มทำงานในสาย Customer Service และ HR ก่อนจะผันตัวมาทำ IT Support และ Graphic Design อย่างเต็มตัว ทำให้ผมมีจุดแข็งคือ 'เข้าใจคน' และ 'เข้าใจระบบ' ผมชอบแก้ปัญหาและเรียนรู้เทคโนโลยีใหม่ๆ เสมอครับ",
      personality: {
        title: "นิสัยส่วนตัว (Personality)",
        desc: "เฟรนลี่เข้าได้กับทุกวัย เป็นคนขี้สงสัยชอบตั้งคำถามหาเหตุผล (อยากรู้อะไรต้องรู้ให้ได้) ใจเย็น ชอบวางแผนและมีแผนสำรองเสมอ มีเอเนอจี้ในการทำงานสูงและมุ่งมั่นมาก",
        tags: ["Friendly", "Curious", "Strategic Planner", "High Energy", "Determined"]
      },
      workStyle: {
        title: "สไตล์การทำงาน (Work Style)",
        desc: "บางทีสมาธิสั้นเพราะไอเดียพุ่งพล่านตลอดเวลา ไม่ชอบงานจำเจเลยมักหาวิธีลดเวลาทำงาน (Smart Lazy) เพื่อให้มีเวลาเพิ่ม เป็น Perfectionist ที่เชื่อว่า 'ผลลัพธ์ที่ดีต้องมาจากทรัพยากร เวลา และเครื่องมือที่ดี'",
        tags: ["Idea Generator", "Smart Lazy", "Perfectionist", "Forward Thinking", "Resource Oriented"]
      }
    },
    experience: {
      title: "ประสบการณ์ทำงาน (Timeline)",
      subtitle: "เส้นทางการเรียนรู้และการเติบโตในสายอาชีพ",
      items: [
        {
          role: "IT Support / Graphic Design",
          company: "PRIME PROPERTY GROUP CO., LTD.",
          period: "ปัจจุบัน",
          desc: "ดูแลงานออกแบบสื่อสิ่งพิมพ์และดิจิทัล, ตัดต่อวิดีโอ, ดูแล Line OA, พัฒนา AppSheet และแก้ไขปัญหาคอมพิวเตอร์เบื้องต้นในสำนักงาน",
          icon: Wrench,
          color: "blue"
        },
        {
          role: "Marketing Online Staff",
          company: "HANDYMAN AUTO CO., LTD.",
          period: "2023",
          desc: "ดูแลสื่อออนไลน์ Website/Social Media, สร้างคอนเทนต์การตลาด และจัดการฐานข้อมูลลูกค้า",
          icon: Globe,
          color: "purple"
        },
        {
          role: "Human Resource Staff",
          company: "Future Engineering Consultants Co., Ltd.",
          period: "2023",
          desc: "ดูแลสรรหาบุคลากร (Recruitment), ปฐมนิเทศพนักงานใหม่ (Onboarding) และวิเคราะห์ความต้องการฝึกอบรม",
          icon: User,
          color: "orange"
        },
        {
          role: "Customer Service IT Gadget",
          company: "Power Buy (Central Retail)",
          period: "Part-time",
          desc: "ให้คำแนะนำลูกค้าเกี่ยวกับสินค้าไอทีและ Gadget, จัดการสต็อกสินค้า",
          icon: Cpu,
          color: "red"
        },
        {
          role: "Call Center",
          company: "True Corporation",
          period: "2022",
          desc: "รับสายบริการลูกค้า ตอบข้อซักถาม แจ้งข้อมูลผลิตภัณฑ์และโปรโมชั่น",
          icon: Phone,
          color: "green"
        }
      ]
    },
    skills: {
      title: "ความสามารถ (Skills)",
      subtitle: "คลิกที่ปุ่มเพื่อดูรายละเอียดเพิ่มเติม",
      design: "Creative & Media Tools",
      dev: "General IT Support",
      tools: "Automation & Data"
    },
    portfolio: {
      title: "ผลงานเว็บไซต์ (Web Projects)",
      subtitle: "ผลงานการออกแบบและการเรียนรู้"
    },
    media: {
      title: "Creative Studio",
      subtitle: "คลังผลงานวิดีโอ เพลง และกราฟิก (คลิกเพื่อเปิดดูไฟล์ต้นฉบับ)",
    },
    bots: {
      title: "ระบบอัตโนมัติ & Chatbots",
      subtitle: "โปรเจกต์ฝึกฝนการใช้ LINE API และ AppSheet",
      bot1: {
        name: "File Saver Bot",
        desc: "บอทช่วยเก็บไฟล์อัตโนมัติ ดึงไฟล์จากห้องแชท LINE ไปบันทึกยัง Google Drive และส่งลิงก์กลับมาทันที ช่วยลดปัญหาไฟล์หมดอายุในแชท",
        tags: ["LINE API", "Google Drive API", "Cloud Functions"]
      },
      bot2: {
        name: "Smart Planner Assistant",
        desc: "บอทผู้ช่วยวางแผนงาน แจ้งเตือน และสรุปงาน เชื่อมต่อ Google Calendar เพื่อลงตาราง และส่งข้อมูลเข้า Google Sheets เพื่อวิเคราะห์ KPI",
        tags: ["Task Management", "Calendar API", "Sheets API", "Data Analysis"],
        qrCode: "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=https://line.me/R/ti/p/@745rnmvz", 
        qrLabel: "LINE ID: @745rnmvz"
      }
    },
    ai: {
      title: "AI Agent Collaboration",
      subtitle: "การทำงานร่วมกับ AI ยุคใหม่เพื่อเพิ่มประสิทธิภาพสูงสุด",
      placeholder: "เช่น: อยากเก็บข้อมูลการลาของพนักงาน, ต้องคอยส่งสรุปยอดขายเข้าไลน์ทุกวัน...",
      button: "ขอไอเดียลดงานด้วย AI",
      loading: "กำลังวิเคราะห์โซลูชัน...",
      resultTitle: "คำแนะนำจาก Kamphon (AI Version):"
    },
    hobbies: {
      title: "งานอดิเรก & ความสำเร็จ",
      subtitle: "กิจกรรมยามว่างและการพัฒนาตนเอง",
      items: [
        {
          title: "The 5%ers Funded Trader",
          role: "Professional Forex Trader",
          desc: "ผ่านการทดสอบและได้รับการรับรองเป็น Funded Trader จาก The 5%ers (Proprietary Trading Firm) พิสูจน์ความสามารถในการบริหารความเสี่ยงและทำกำไรอย่างสม่ำเสมอ",
          tags: ["Forex Trading", "Risk Management", "Investment Analysis"],
          img: "https://lh5.googleusercontent.com/d/1yGuhylTn-qqrfe8BuzgPb6Rwc1agBswB",
          color: "yellow",
          icon: TrendingUp
        },
        {
          title: "Weekend Home Cook",
          role: "Amateur Cook (พ่อครัวมือสมัครเล่น)",
          desc: "พอทำทานได้ครับ ไม่ได้เก่งระดับเชฟแต่ตั้งใจทำทุกจาน เน้นเมนูง่ายๆ ทำทานเองในวันหยุดครับ (ส่วนในรูปคือกำลังใจสำคัญ ผู้ช่วยเชฟประจำตัวครับ 🐱)",
          tags: ["Cooking for Fun", "Simple Recipes", "Cat Lover"],
          img: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=1000",
          color: "orange",
          icon: Utensils
        }
      ]
    },
    footer: {
      text: "© 2026 Kamphon Prayoonhan. Created with Passion."
    }
  },
  en: {
    nav: {
      about: "About",
      exp: "Experience",
      skills: "Skills",
      works: "Works",
      media: "Media",
      ai: "AI Lab",
      contact: "Contact"
    },
    hero: {
      greeting: "Hello, I'm",
      roles: ["Creative & Junior IT Support", "Graphic Designer", "Automation Enthusiast", "Funded Trader"],
      desc: "I provide basic IT support and visual design services. I am passionate about learning automation tools like AppSheet to improve workflow efficiency.",
      cta: "View My Work",
      latest: "Latest Launch"
    },
    about: {
      title: "Profile & Mindset",
      name: "Kamphon Prayoonhan",
      age: "25 Years Old (Born 22/05/2000)",
      education: "Bachelor of Management, Khon Kaen University",
      text: "I transitioned from Customer Service & HR to full-time IT Support & Graphic Design. My strength lies in understanding both 'People' and 'Systems'. I love solving problems and learning new technologies.",
      personality: {
        title: "Personality",
        desc: "Friendly, curious, and always asking 'Why' to understand things deeply. A determined learner who is calm, strategic (always has a Plan B), and full of energy.",
        tags: ["Friendly", "Curious", "Strategic Planner", "High Energy", "Determined"]
      },
      workStyle: {
        title: "Work Style",
        desc: "Constant ideator (can be distracted by new ideas). I dislike repetitive tasks, so I act 'Smart Lazy' by automating them to save time. A perfectionist who believes great results need proper time, tools, and resources.",
        tags: ["Idea Generator", "Smart Lazy", "Perfectionist", "Forward Thinking", "Resource Oriented"]
      }
    },
    experience: {
      title: "Work Experience",
      subtitle: "My professional journey and growth",
      items: [
        {
          role: "IT Support / Graphic Design",
          company: "PRIME PROPERTY GROUP CO., LTD.",
          period: "Present",
          desc: "Graphic/Digital design, Video editing, Line OA management, AppSheet development, and basic office IT troubleshooting.",
          icon: Wrench,
          color: "blue"
        },
        {
          role: "Marketing Online Staff",
          company: "HANDYMAN AUTO CO., LTD.",
          period: "2023",
          desc: "Managed online presence (Website/Social), created marketing content, and maintained customer databases.",
          icon: Globe,
          color: "purple"
        },
        {
          role: "Human Resource Staff",
          company: "Future Engineering Consultants Co., Ltd.",
          period: "2023",
          desc: "Handled recruitment, new employee onboarding, and training needs analysis.",
          icon: User,
          color: "orange"
        },
        {
          role: "Customer Service IT Gadget",
          company: "Power Buy (Central Retail)",
          period: "Part-time",
          desc: "Assisted customers with IT products/gadgets inquiries and managed inventory.",
          icon: Cpu,
          color: "red"
        },
        {
          role: "Call Center",
          company: "True Corporation",
          period: "2022",
          desc: "Provided customer support, handled inquiries, and informed customers about products and promotions.",
          icon: Phone,
          color: "green"
        }
      ]
    },
    skills: {
      title: "Skills & Expertise",
      subtitle: "Click on each badge for more details",
      design: "Creative & Media Tools",
      dev: "General IT Support",
      tools: "Automation & Data"
    },
    portfolio: {
      title: "Web Portfolio",
      subtitle: "Design and development projects"
    },
    media: {
      title: "Creative Studio",
      subtitle: "Video, Music, and Graphic gallery (Click to view original files)",
    },
    bots: {
      title: "Automation & Chatbots",
      subtitle: "LINE API and AppSheet training projects",
      bot1: {
        name: "File Saver Bot",
        desc: "Automatically saves files from LINE chat to Google Drive and returns a link, preventing file expiration.",
        tags: ["LINE API", "Google Drive API", "Cloud Functions"]
      },
      bot2: {
        name: "Smart Planner Assistant",
        desc: "Helps with task planning, reminders, and summaries. Connects to Google Calendar and Sheets for KPI analysis.",
        tags: ["Task Management", "Calendar API", "Sheets API", "Data Analysis"],
        qrCode: "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=https://line.me/R/ti/p/@745rnmvz",
        qrLabel: "LINE ID: @745rnmvz"
      }
    },
    ai: {
      title: "AI Agent Collaboration",
      subtitle: "Working with modern AI to maximize efficiency",
      placeholder: "e.g., I want to track employee leave, need to send daily sales summaries to LINE...",
      button: "Get AI Idea",
      loading: "Analyzing solution...",
      resultTitle: "Advice from Kamphon (AI Version):"
    },
    hobbies: {
      title: "Hobbies & Achievements",
      subtitle: "Personal growth and leisure activities",
      items: [
        {
          title: "The 5%ers Funded Trader",
          role: "Professional Forex Trader",
          desc: "Certified Funded Trader by The 5%ers. Proven ability in risk management and consistent profitability.",
          tags: ["Forex Trading", "Risk Management", "Investment Analysis"],
          img: "https://lh5.googleusercontent.com/d/1yGuhylTn-qqrfe8BuzgPb6Rwc1agBswB",
          color: "yellow",
          icon: TrendingUp
        },
        {
          title: "Weekend Home Cook",
          role: "Amateur Cook",
          desc: "I enjoy cooking simple meals on weekends. Not a pro, but I put my heart into every dish. (Pictured with my sous-chef 🐱)",
          tags: ["Cooking for Fun", "Simple Recipes", "Cat Lover"],
          img: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=1000",
          color: "orange",
          icon: Utensils
        }
      ]
    },
    footer: {
      text: "© 2026 Kamphon Prayoonhan. Created with Passion."
    }
  }
};

const skillDetails = {
  "Google Workspace": {
    desc: "จัดการเอกสาร ข้อมูล และการทำงานร่วมกันอย่างเป็นระบบผ่าน Docs, Sheets, Slides และ Forms",
    connect: ["Cloud Storage", "Team Collaboration", "Data Management"]
  },
  "CapCut": {
    desc: "ตัดต่อวิดีโอสั้นสำหรับ Social Media เน้นความรวดเร็วและเอฟเฟกต์ที่ทันสมัย",
    connect: ["TikTok", "Reels", "YouTube Shorts"]
  },
  "Canva": {
    desc: "ออกแบบสื่อกราฟิกทุกรูปแบบอย่างรวดเร็วและสวยงาม ทั้ง Presentation, Poster และ Social Media Content",
    connect: ["Visual Design", "Branding", "Marketing Materials"]
  },
  "Adobe Photoshop": {
    desc: "ตกแต่งภาพถ่ายขั้นสูง ออกแบบกราฟิกที่ต้องการความละเอียดและเลเยอร์ที่ซับโซน",
    connect: ["Photo Editing", "Digital Art", "UI Elements"]
  },
  "Hardware/Network": {
    desc: "แก้ไขปัญหาคอมพิวเตอร์เบื้องต้น ติดตั้งอุปกรณ์ต่อพ่วง และดูแลระบบเครือข่ายภายในสำนักงาน",
    connect: ["IT Troubleshooting", "LAN/Wi-Fi", "PC Assembly"]
  },
  "Printer Setup": {
    desc: "ติดตั้งและตั้งค่าเครื่องพิมพ์ทุกรูปแบบ ทั้งแบบ Network, USB และการแชร์เครื่องพิมพ์ในวงแลน",
    connect: ["Office Equipment", "Driver Installation", "Maintenance"]
  },
  "Microsoft Office": {
    desc: "ใช้งาน Word, Excel, PowerPoint ขั้นสูงเพื่อการจัดการงานเอกสารและวิเคราะห์ข้อมูล",
    connect: ["Documentation", "Spreadsheets", "Presentations"]
  },
  "Wordpress": {
    desc: "สร้างและดูแลเว็บไซต์เบื้องต้น จัดการคอนเทนต์ และติดตั้ง Plugin ที่จำเป็น",
    connect: ["CMS", "Web Management", "Blogging"]
  },
  "LINE OA & API": {
    desc: "สร้างระบบตอบโต้ผ่าน LINE OA เชื่อมต่อ API เพื่อทำ Chatbot และระบบแจ้งเตือนอัตโนมัติ",
    connect: ["Messaging API", "Rich Menu", "Automation"]
  },
  "AppSheet": {
    desc: "พัฒนาแอปพลิเคชันแบบ No-code เพื่อจัดการฐานข้อมูลและกระบวนการทำงานในองค์กร",
    connect: ["Google Sheets", "Mobile Apps", "Workflow Automation"]
  },
  "Data Analysis": {
    desc: "วิเคราะห์ข้อมูลเบื้องต้นเพื่อหา Insight และนำเสนอผ่าน Dashboard หรือรายงานที่เข้าใจง่าย",
    connect: ["Data Visualization", "Excel Pivot", "KPI Tracking"]
  }
};

const webProjects = [
  {
    title: "Prime x Legal Platform",
    desc: "แพลตฟอร์มรวบรวมข้อมูลและบริการด้านกฎหมาย ออกแบบ UI ให้ใช้งานง่ายและดูเป็นมืออาชีพ",
    url: "https://kamphon203.wixsite.com/prime-x-legal",
    tags: ["Wix", "UI Design", "Legal Tech"],
    color: "from-blue-600 to-blue-400",
    featured: true
  },
  {
    title: "Canva Portfolio Showcase",
    desc: "รวบรวมงานออกแบบกราฟิกและสื่อต่างๆ ที่สร้างสรรค์ผ่าน Canva",
    url: "https://www.canva.com/design/DAGf7797-p8/uW_m79X76997797-p8/view",
    tags: ["Canva", "Graphic Design"],
    color: "from-purple-600 to-purple-400",
    featured: false
  },
  {
    title: "The Best Property",
    desc: "เว็บไซต์แนะนำอสังหาริมทรัพย์ เน้นการแสดงผลรูปภาพที่สวยงามและข้อมูลที่ครบถ้วน",
    url: "https://kamphon203.wixsite.com/the-best",
    tags: ["Wix", "Real Estate", "Web Design"],
    color: "from-amber-600 to-amber-400",
    featured: false
  },
  {
    title: "Handyman Auto",
    desc: "เว็บไซต์บริการดูแลรักษารถยนต์ ให้ข้อมูลบริการและช่องทางการติดต่อ",
    url: "https://kamphon203.wixsite.com/handyman-auto",
    tags: ["Wix", "Automotive", "Business Site"],
    color: "from-red-600 to-red-400",
    featured: false
  }
];

const mediaItems = [
  { title: "Corporate Video", type: "Video", icon: Video, url: "#", color: "text-red-500" },
  { title: "Social Media Ads", type: "Graphic", icon: Palette, url: "#", color: "text-blue-500" },
  { title: "Music Production", type: "Audio", icon: Music, url: "#", color: "text-purple-500" },
  { title: "Short Film Edit", type: "Video", icon: Film, url: "#", color: "text-orange-500" },
  { title: "Logo Design", type: "Graphic", icon: Layout, url: "#", color: "text-green-500" }
];

// --- HELPER COMPONENTS ---

const Typewriter = ({ texts, speed = 100, pause = 2000 }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    if (subIndex === texts[index].length + 1 && !reverse) {
      const timeout = setTimeout(() => setReverse(true), pause);
      return () => clearTimeout(timeout);
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % texts.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
      setDisplayedText(texts[index].substring(0, subIndex));
    }, reverse ? speed / 2 : speed);

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, texts, speed, pause]);

  return (
    <span className="inline-block min-w-[200px] text-left">
      {displayedText}
      <span className="animate-pulse">|</span>
    </span>
  );
};

const SectionTitle = ({ title, subtitle }) => (
  <div className="mb-12 text-center">
    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
      {title}
    </h2>
    {subtitle && <p className="text-gray-600 max-w-2xl mx-auto">{subtitle}</p>}
    <div className="w-24 h-1 bg-orange-500 mx-auto mt-4 rounded-full"></div>
  </div>
);

const SkillBadge = ({ icon: Icon, label, onClick }) => (
  <button 
    onClick={onClick}
    className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-full hover:bg-orange-50 hover:border-orange-200 transition-all cursor-pointer hover:scale-105 transform duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500/50"
  >
    <Icon size={18} className="text-orange-500" />
    <span className="text-sm font-medium text-gray-700">{label}</span>
  </button>
);

const SkillModal = ({ skill, onClose }) => {
  if (!skill) return null;
  const details = skillDetails[skill.label] || {
    desc: "เครื่องมือที่ช่วยเพิ่มประสิทธิภาพการทำงาน",
    connect: ["General Use"]
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200" onClick={onClose}>
      <div 
        className="bg-white rounded-2xl p-8 max-w-md w-full relative shadow-2xl transform animate-in zoom-in-95 duration-200"
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors">
          <X size={24} />
        </button>

        <div className="flex items-center gap-4 mb-6">
          <div className="p-4 bg-orange-100 rounded-xl">
            <skill.icon size={40} className="text-orange-500" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{skill.label}</h3>
        </div>

        <div className="space-y-6">
          <div>
            <h4 className="text-orange-600 text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
              <Zap size={14} /> ความสามารถ (Capabilities)
            </h4>
            <p className="text-gray-600 text-sm leading-relaxed border-l-2 border-orange-500 pl-3">
              {details.desc}
            </p>
          </div>

          <div>
            <h4 className="text-blue-600 text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
              <Share2 size={14} /> เชื่อมต่อกับ (Integrations)
            </h4>
            <div className="flex flex-wrap gap-2">
              {details.connect.map((item, i) => (
                <span key={i} className="px-3 py-1 bg-blue-50 border border-blue-100 rounded-full text-blue-600 text-xs font-medium">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProjectCard = ({ project, className = "" }) => (
  <a 
    href={project.url} 
    target="_blank" 
    rel="noopener noreferrer"
    className={`group relative bg-white border border-gray-100 rounded-2xl overflow-hidden hover:border-orange-500/50 transition-all duration-300 hover:shadow-xl flex flex-col h-full hover:-translate-y-2 ${className}`}
  >
    <div className={`h-2 bg-gradient-to-r ${project.color}`} />
    <div className="p-6 flex flex-col h-full">
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-gray-50 rounded-xl group-hover:bg-orange-100 transition-colors">
          {project.tags.includes('Canva') ? (
             <Palette className="text-gray-600 group-hover:text-orange-600" size={24} />
          ) : (
             <Layout className="text-gray-600 group-hover:text-orange-600" size={24} />
          )}
        </div>
        {project.featured && (
           <div className="flex items-center gap-1 px-3 py-1 bg-amber-100 border border-amber-200 rounded-full">
             <Star size={12} className="text-amber-600 fill-amber-600" />
             <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wide">Featured</span>
           </div>
        )}
        {!project.featured && (
          <ExternalLink className="text-gray-400 group-hover:text-orange-500 transition-colors" size={20} />
        )}
      </div>
      <h3 className={`font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors ${project.featured ? 'text-2xl' : 'text-xl'}`}>
        {project.title}
      </h3>
      <p className="text-gray-600 text-sm mb-6 flex-grow">
        {project.desc}
      </p>
      <div className="flex flex-wrap gap-2 mt-auto">
        {project.tags.map((tag, i) => (
          <span key={i} className="text-xs px-2 py-1 rounded-md bg-gray-50 text-gray-500 border border-gray-100">
            {tag}
          </span>
        ))}
      </div>
    </div>
  </a>
);

const MediaCard = ({ item }) => (
  <a 
    href={item.url}
    target="_blank"
    rel="noopener noreferrer"
    className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:border-orange-500/50 transition-all duration-300 flex flex-col h-full group relative p-6 items-center text-center justify-center min-h-[180px] hover:bg-orange-50 hover:-translate-y-1"
  >
    <div className="mb-4 relative">
        <div className="p-5 bg-gray-50 rounded-full group-hover:bg-orange-100 transition-all duration-300 shadow-sm">
            <item.icon size={32} className={`${item.color}`} />
        </div>
        <div className="absolute -bottom-1 -right-1 bg-orange-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            <ExternalLink size={12} />
        </div>
    </div>

    <h3 className="font-bold text-gray-900 text-md mb-2 group-hover:text-orange-600 transition-colors">{item.title}</h3>
    <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full uppercase tracking-wider font-medium">
      {item.type}
    </span>
  </a>
);

const ExperienceTimeline = ({ items }) => (
  <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 before:to-transparent">
    {items.map((item, index) => (
      <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
        <div className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-200 bg-white text-gray-400 group-hover:border-orange-500 group-hover:text-orange-500 transition-all duration-500 z-10 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
          <item.icon size={18} />
        </div>
        <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="flex items-center justify-between space-x-2 mb-1">
            <div className="font-bold text-gray-900">{item.role}</div>
            <time className="font-mono text-xs text-orange-600">{item.period}</time>
          </div>
          <div className="text-orange-600 text-sm font-medium mb-2">{item.company}</div>
          <div className="text-gray-600 text-sm leading-relaxed">{item.desc}</div>
        </div>
      </div>
    ))}
  </div>
);

// --- MAIN APP COMPONENT ---

export default function App() {
  const [lang, setLang] = useState('th');
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [aiInput, setAiInput] = useState("");
  const [aiResult, setAiResult] = useState("");
  const [isAiLoading, setIsAiLoading] = useState(false);
  const t = content[lang];

  const handleAiConsult = async () => {
    if (!aiInput.trim() || !genAI) return;
    setIsAiLoading(true);
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = `You are Kamphon, an IT Support and Automation expert. A user asks: "${aiInput}". 
      Suggest a solution using AppSheet, LINE API, or AI tools. Keep it concise, professional, and in ${lang === 'th' ? 'Thai' : 'English'}.`;
      const result = await model.generateContent(prompt);
      setAiResult(result.response.text());
    } catch (error) {
      setAiResult("Error connecting to AI. Please try again later.");
    }
    setIsAiLoading(false);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-orange-500/30 selection:text-orange-900 overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center font-black text-white transform group-hover:rotate-12 transition-transform duration-300">K</div>
            <span className="font-bold tracking-tighter text-xl group-hover:text-orange-500 transition-colors">Kamphon.dev</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-bold text-gray-500">
            <a href="#about" className="hover:text-orange-500 transition-colors">{t.nav.about}</a>
            <a href="#experience" className="hover:text-orange-500 transition-colors">{t.nav.exp}</a>
            <a href="#works" className="hover:text-orange-500 transition-colors">{t.nav.works}</a>
            <a href="#ai" className="hover:text-orange-500 transition-colors">{t.nav.ai}</a>
            <button 
              onClick={() => setLang(lang === 'th' ? 'en' : 'th')}
              className="px-3 py-1 border border-gray-200 rounded-full hover:border-orange-500 hover:text-orange-500 transition-all text-xs"
            >
              {lang === 'th' ? 'EN' : 'TH'}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative z-10 pt-40 pb-20 md:pt-60 md:pb-32 px-6 container mx-auto text-center">
        <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-orange-50 border border-orange-100 text-orange-600 text-sm font-medium animate-fade-in-up">
          OPEN TO COLLABORATION
        </div>
        <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight text-gray-900">
          {t.hero.greeting} <span className="text-orange-500">Kamphon.</span>
        </h1>
        
        <div className="text-xl md:text-3xl text-gray-600 h-10 mb-8 font-light flex justify-center items-center gap-2">
           I am a <span className="text-orange-500 font-bold"><Typewriter texts={t.hero.roles} /></span>
        </div>

        <p className="text-gray-500 max-w-2xl mx-auto mb-12 leading-relaxed">
          {t.hero.desc}
        </p>
        
        <div className="flex flex-col md:flex-row justify-center gap-4 items-center">
          <a href="#works" className="px-10 py-4 bg-orange-500 text-white font-bold rounded-full hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2 group">
            {t.hero.cta} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <div className="flex items-center gap-6 px-8 border-l border-gray-200">
            <a href="https://github.com/Safeiooi" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-gray-900 transition-colors"><Code className="w-6 h-6" /></a>
            <a href="https://www.facebook.com/kamphon.safe/" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-blue-600 transition-colors"><Facebook className="w-6 h-6" /></a>
            <a href="mailto:kamphon203@gmail.com" className="text-gray-400 hover:text-orange-500 transition-colors"><Mail className="w-6 h-6" /></a>
          </div>
        </div>
      </header>

      {/* About & Skills */}
      <section id="about" className="relative z-10 py-24 border-t border-gray-50 bg-gray-50/50">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div className="space-y-10">
              <div>
                <h3 className="text-2xl font-bold mb-8 flex items-center gap-3 text-gray-900">
                  <User className="text-orange-500" /> {t.about.title}
                </h3>
                <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6">
                   <div className="flex items-start gap-4">
                      <div className="p-2 bg-orange-50 rounded-lg"><User size={20} className="text-orange-500" /></div>
                      <div>
                        <span className="text-[10px] text-gray-400 uppercase font-bold tracking-widest block mb-1">Name</span>
                        <span className="text-gray-900 font-bold text-lg">{t.about.name}</span>
                      </div>
                   </div>
                   <div className="flex items-start gap-4">
                      <div className="p-2 bg-blue-50 rounded-lg"><GraduationCap size={20} className="text-blue-500" /></div>
                      <div>
                        <span className="text-[10px] text-gray-400 uppercase font-bold tracking-widest block mb-1">Education</span>
                        <span className="text-gray-900 font-bold">{t.about.education}</span>
                      </div>
                   </div>
                </div>
              </div>
              
              <div className="space-y-6">
                 <p className="text-gray-600 leading-relaxed text-lg">
                   {t.about.text}
                 </p>
                 
                 <div className="grid grid-cols-1 gap-6">
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                       <h4 className="text-orange-600 text-xs font-bold uppercase mb-3 flex items-center gap-2 tracking-wider">
                         <Smile size={16} /> {t.about.personality.title}
                       </h4>
                       <p className="text-gray-600 text-sm leading-relaxed mb-4">
                         {t.about.personality.desc}
                       </p>
                       <div className="flex flex-wrap gap-2">
                         {t.about.personality.tags.map((tag, i) => (
                           <span key={i} className="text-[10px] px-3 py-1 bg-orange-50 text-orange-600 font-bold rounded-full border border-orange-100">
                             {tag}
                           </span>
                         ))}
                       </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                       <h4 className="text-blue-600 text-xs font-bold uppercase mb-3 flex items-center gap-2 tracking-wider">
                         <Lightbulb size={16} /> {t.about.workStyle.title}
                       </h4>
                       <p className="text-gray-600 text-sm leading-relaxed mb-4">
                         {t.about.workStyle.desc}
                       </p>
                       <div className="flex flex-wrap gap-2">
                         {t.about.workStyle.tags.map((tag, i) => (
                           <span key={i} className="text-[10px] px-3 py-1 bg-blue-50 text-blue-600 font-bold rounded-full border border-blue-100">
                             {tag}
                           </span>
                         ))}
                       </div>
                    </div>
                 </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm h-full">
              <div className="flex justify-between items-center mb-10">
                <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <Terminal size={16} />
                  {t.skills.title}
                </h4>
              </div>
              
              <div className="space-y-10">
                <div>
                  <span className="text-[10px] text-orange-600 mb-4 block uppercase font-bold tracking-widest">{t.skills.design}</span>
                  <div className="flex flex-wrap gap-3">
                    <SkillBadge icon={Briefcase} label="Google Workspace" onClick={() => setSelectedSkill({icon: Briefcase, label: "Google Workspace"})} />
                    <SkillBadge icon={Video} label="CapCut" onClick={() => setSelectedSkill({icon: Video, label: "CapCut"})} />
                    <SkillBadge icon={Globe} label="Canva" onClick={() => setSelectedSkill({icon: Globe, label: "Canva"})} />
                    <SkillBadge icon={Layers} label="Adobe Photoshop" onClick={() => setSelectedSkill({icon: Layers, label: "Adobe Photoshop"})} />
                  </div>
                </div>
                <div>
                  <span className="text-[10px] text-blue-600 mb-4 block uppercase font-bold tracking-widest">{t.skills.dev}</span>
                  <div className="flex flex-wrap gap-3">
                    <SkillBadge icon={Wrench} label="Hardware/Network" onClick={() => setSelectedSkill({icon: Wrench, label: "Hardware/Network"})} />
                    <SkillBadge icon={Cpu} label="Printer Setup" onClick={() => setSelectedSkill({icon: Cpu, label: "Printer Setup"})} />
                    <SkillBadge icon={FileText} label="Microsoft Office" onClick={() => setSelectedSkill({icon: FileText, label: "Microsoft Office"})} />
                    <SkillBadge icon={Globe} label="Wordpress" onClick={() => setSelectedSkill({icon: Globe, label: "Wordpress"})} />
                  </div>
                </div>
                <div>
                  <span className="text-[10px] text-green-600 mb-4 block uppercase font-bold tracking-widest">{t.skills.tools}</span>
                  <div className="flex flex-wrap gap-3">
                    <SkillBadge icon={Bot} label="LINE OA & API" onClick={() => setSelectedSkill({icon: Bot, label: "LINE OA & API"})} />
                    <SkillBadge icon={Calendar} label="AppSheet" onClick={() => setSelectedSkill({icon: Calendar, label: "AppSheet"})} />
                    <SkillBadge icon={BarChart} label="Data Analysis" onClick={() => setSelectedSkill({icon: BarChart, label: "Data Analysis"})} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section id="experience" className="relative z-10 py-24 bg-white">
        <div className="container mx-auto px-6">
          <SectionTitle title={t.experience.title} subtitle={t.experience.subtitle} />
          <div className="max-w-4xl mx-auto">
            <ExperienceTimeline items={t.experience.items} />
          </div>
        </div>
      </section>

      {/* Web Portfolio */}
      <section id="works" className="relative z-10 py-24 container mx-auto px-6">
        <SectionTitle 
          title={t.portfolio.title} 
          subtitle={t.portfolio.subtitle} 
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {webProjects.map((project, index) => (
            <ProjectCard 
              key={index} 
              project={project} 
              className={project.featured ? "md:col-span-2 lg:col-span-2" : ""}
            />
          ))}
        </div>
      </section>

      {/* AI Lab & Agent Showcase */}
      <section id="ai" className="relative z-10 py-24 bg-gray-50 border-y border-gray-100">
        <div className="container mx-auto px-6">
          <SectionTitle title={t.ai.title} subtitle={t.ai.subtitle} />
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Visual Workflow Showcase */}
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-20 bg-orange-500/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2"></div>
              
              <h4 className="text-xl font-bold mb-8 flex items-center gap-3 text-gray-900">
                <Workflow size={24} className="text-orange-500" /> AI Agent Workflow
              </h4>
              
              <div className="space-y-8 relative z-10">
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center border border-orange-100">
                    <MessageSquare className="text-orange-500" />
                  </div>
                  <div className="flex-grow">
                    <div className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">Step 01: Input</div>
                    <div className="text-gray-900 font-bold">รับโจทย์ปัญหาผ่านภาษาธรรมชาติ</div>
                  </div>
                </div>
                
                <div className="ml-6 h-8 border-l-2 border-dashed border-gray-200"></div>
                
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center border border-blue-100">
                    <Brain className="text-blue-500" />
                  </div>
                  <div className="flex-grow">
                    <div className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">Step 02: Analysis</div>
                    <div className="text-gray-900 font-bold">AI Agent (Manus) วางแผนและวิเคราะห์</div>
                  </div>
                </div>

                <div className="ml-6 h-8 border-l-2 border-dashed border-gray-200"></div>

                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center border border-green-100">
                    <Zap className="text-green-500" />
                  </div>
                  <div className="flex-grow">
                    <div className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">Step 03: Execution</div>
                    <div className="text-gray-900 font-bold">ดำเนินการอัตโนมัติผ่านเครื่องมือต่างๆ</div>
                  </div>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-gray-50 grid grid-cols-3 md:grid-cols-6 gap-4">
                <div className="flex flex-col items-center gap-2 group">
                  <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-blue-50 transition-colors"><Code size={20} className="text-gray-400 group-hover:text-gray-900" /></div>
                  <span className="text-[8px] font-bold uppercase text-gray-400">GitHub</span>
                </div>
                <div className="flex flex-col items-center gap-2 group">
                  <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-orange-50 transition-colors"><Cloud size={20} className="text-gray-400 group-hover:text-orange-500" /></div>
                  <span className="text-[8px] font-bold uppercase text-gray-400">Cloudflare</span>
                </div>
                <div className="flex flex-col items-center gap-2 group">
                  <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-green-50 transition-colors"><Database size={20} className="text-gray-400 group-hover:text-green-600" /></div>
                  <span className="text-[8px] font-bold uppercase text-gray-400">Sheets</span>
                </div>
                <div className="flex flex-col items-center gap-2 group">
                  <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-blue-50 transition-colors"><Facebook size={20} className="text-gray-400 group-hover:text-blue-600" /></div>
                  <span className="text-[8px] font-bold uppercase text-gray-400">Facebook</span>
                </div>
                <div className="flex flex-col items-center gap-2 group">
                  <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-purple-50 transition-colors"><Palette size={20} className="text-gray-400 group-hover:text-purple-600" /></div>
                  <span className="text-[8px] font-bold uppercase text-gray-400">Canva</span>
                </div>
                <div className="flex flex-col items-center gap-2 group">
                  <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-green-50 transition-colors"><Bot size={20} className="text-gray-400 group-hover:text-green-500" /></div>
                  <span className="text-[8px] font-bold uppercase text-gray-400">LINE API</span>
                </div>
              </div>
            </div>

            {/* Interactive AI Lab */}
            <div className="space-y-6">
              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-lg">
                <textarea 
                  value={aiInput}
                  onChange={(e) => setAiInput(e.target.value)}
                  placeholder={t.ai.placeholder}
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all min-h-[150px] mb-4"
                />
                <button 
                  onClick={handleAiConsult}
                  disabled={isAiLoading}
                  className="w-full py-4 bg-orange-500 text-white font-bold rounded-2xl hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/25 flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {isAiLoading ? (
                    <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> {t.ai.loading}</>
                  ) : (
                    <><Sparkles size={20} /> {t.ai.button}</>
                  )}
                </button>
              </div>

              {aiResult && (
                <div className="bg-orange-50 border border-orange-100 p-6 rounded-2xl animate-in fade-in slide-in-from-bottom-4">
                  <h5 className="text-orange-600 font-bold uppercase text-xs mb-3 tracking-widest flex items-center gap-2">
                    <Bot size={16} /> {t.ai.resultTitle}
                  </h5>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {aiResult}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Hobbies Section */}
      <section id="hobbies" className="relative z-10 py-24 container mx-auto px-6">
        <SectionTitle title={t.hobbies.title} subtitle={t.hobbies.subtitle} />
        <div className="grid md:grid-cols-2 gap-8">
          {t.hobbies.items.map((hobby, index) => (
            <div key={index} className="bg-white border border-gray-100 rounded-3xl overflow-hidden group hover:shadow-xl transition-all">
              <div className="h-64 overflow-hidden relative">
                <img src={hobby.img} alt={hobby.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-6">
                  <div className="flex items-center gap-2 text-orange-400 mb-1">
                    <hobby.icon size={20} />
                    <span className="text-xs font-bold uppercase tracking-widest">{hobby.role}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white">{hobby.title}</h3>
                </div>
              </div>
              <div className="p-8">
                <p className="text-gray-600 mb-6 leading-relaxed">{hobby.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {hobby.tags.map((tag, i) => (
                    <span key={i} className="text-[10px] px-3 py-1 bg-gray-50 text-gray-500 border border-gray-100 rounded-full font-bold">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="relative z-10 py-20 border-t border-gray-100 bg-gray-50">
        <div className="container mx-auto px-6 text-center">
          <div className="mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">LET'S <span className="text-orange-500">COLLABORATE.</span></h2>
            <p className="text-gray-500 max-w-xl mx-auto mb-10">
              พร้อมที่จะยกระดับธุรกิจของคุณด้วย AI และเทคโนโลยีสมัยใหม่แล้วหรือยัง? ติดต่อผมได้เลยครับ!
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <a href="mailto:kamphon203@gmail.com" className="inline-flex items-center gap-4 bg-orange-500 text-white font-bold py-5 px-12 rounded-full hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/25 group text-xl">
                <Mail className="w-6 h-6" /> Say Hello <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </a>
              <a href="https://www.facebook.com/kamphon.safe/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-4 bg-[#1877F2] text-white font-bold py-5 px-12 rounded-full hover:bg-[#166fe5] transition-all shadow-lg shadow-blue-500/25 group text-xl">
                <Facebook className="w-6 h-6" /> Facebook
              </a>
            </div>
          </div>
          
          <div className="pt-12 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            <p>{t.footer.text}</p>
            <div className="flex gap-8">
              <a href="https://www.facebook.com/kamphon.safe/" target="_blank" rel="noreferrer" className="hover:text-blue-600 transition-colors">Facebook</a>
              <a href="https://github.com/Safeiooi" target="_blank" rel="noreferrer" className="hover:text-gray-900 transition-colors">GitHub</a>
              <a href="mailto:kamphon203@gmail.com" className="hover:text-orange-500 transition-colors">Email</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {selectedSkill && (
        <SkillModal skill={selectedSkill} onClose={() => setSelectedSkill(null)} />
      )}
    </div>
  );
}
