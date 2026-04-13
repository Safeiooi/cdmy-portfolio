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
  Github, 
  Mail, 
  MessageCircle,
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
  Check
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
          company: "Central Retail Corp (Power Buy)",
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
      title: "AI Automation Architect",
      subtitle: "ลองปรึกษาผมดูสิครับ! พิมพ์งานที่คุณคิดว่าน่าเบื่อหรือซ้ำซ้อน แล้ว AI (ในตัวตนของผม) จะเสนอทางแก้ด้วย AppSheet หรือ LINE API ให้ทันที",
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
          company: "Central Retail Corp (Power Buy)",
          period: "Part-time",
          desc: "Assisted customers with IT products/gadgets inquiries and managed inventory.",
          icon: Cpu,
          color: "red"
        },
        {
          role: "Call Center",
          company: "True Corporation",
          period: "2022",
          desc: "Handled customer calls, provided accurate information on products and promotions.",
          icon: Phone,
          color: "green"
        }
      ]
    },
    skills: {
      title: "Skillset",
      subtitle: "Click on badges to see details",
      design: "Creative & Media Tools",
      dev: "General IT Support",
      tools: "Automation & Data"
    },
    portfolio: {
      title: "Web Projects",
      subtitle: "Design projects and learning journey"
    },
    media: {
      title: "Creative Studio",
      subtitle: "Short video clips, AI music, and graphics (Click to Open)",
    },
    bots: {
      title: "Automation & Chatbots",
      subtitle: "Practice projects using LINE API and AppSheet",
      bot1: {
        name: "File Saver Bot",
        desc: "An automated file archiving bot. It fetches files from LINE chat, saves them to Google Drive, and returns a shareable link, solving file expiration issues.",
        tags: ["LINE API", "Google Drive API", "Cloud Functions"]
      },
      bot2: {
        name: "Smart Planner Assistant",
        desc: "A planning assistant bot. Handles notifications, summaries, syncs with Google Calendar, and logs data to Google Sheets for KPI analysis.",
        tags: ["Task Management", "Calendar API", "Sheets API", "Data Analysis"],
        qrCode: "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=https://line.me/R/ti/p/@745rnmvz",
        qrLabel: "LINE ID: @745rnmvz"
      }
    },
    ai: {
      title: "AI Automation Architect",
      subtitle: "Tell me a boring or repetitive task, and my AI Persona will suggest how I can automate it using AppSheet or LINE API.",
      placeholder: "Ex: Tracking employee leave, Sending daily sales reports to LINE...",
      button: "Generate Solution with AI",
      loading: "Analyzing solution...",
      resultTitle: "Suggestion from Kamphon (AI Version):"
    },
    hobbies: {
      title: "Hobbies & Achievements",
      subtitle: "Personal interests and self-development",
      items: [
        {
          title: "The 5%ers Funded Trader",
          role: "Professional Forex Trader",
          desc: "Certified as a Funded Trader by The 5%ers (Proprietary Trading Firm). Demonstrated consistent profitability and strict risk management skills.",
          tags: ["Forex Trading", "Risk Management", "Investment Analysis"],
          img: "https://lh5.googleusercontent.com/d/1yGuhylTn-qqrfe8BuzgPb6Rwc1agBswB",
          color: "yellow",
          icon: TrendingUp
        },
        {
          title: "Weekend Home Cook",
          role: "Amateur Cook",
          desc: "I cook simple meals for myself. Not exactly a master chef, but I put my heart into it. (The photo shows my lovely sous-chef 🐱)",
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

const webProjects = [
  {
    title: "Prime x Legal",
    desc: "เว็บไซต์ที่ปรึกษากฎหมายและธุรกิจ ดีไซน์เรียบหรู น่าเชื่อถือ (Professional Consulting Platform)",
    url: "https://kamphon203.wixsite.com/prime-x-legal",
    tags: ["Wix", "Business", "Legal Consulting"],
    color: "from-amber-500 to-orange-600",
    featured: true
  },
  {
    title: "Canva Design Portfolio",
    desc: "รวมผลงานการออกแบบกราฟิกและพรีเซนเทชั่นด้วย Canva ดีไซน์ทันสมัย สื่อสารชัดเจน",
    url: "https://prime-property-group.my.canva.site/prime-property-group-co-ltd",
    tags: ["Canva", "Graphic Design", "Presentation"],
    color: "from-purple-600 to-pink-500",
    featured: true
  },
  {
    title: "The Best",
    desc: "Modern corporate identity website presentation.",
    url: "https://pggitdev.github.io/ppg-files/thebest.html",
    tags: ["HTML", "CSS", "Animation"],
    color: "from-purple-500 to-indigo-500"
  },
  {
    title: "Puri Portfolio",
    desc: "Personal portfolio showcasing character and style.",
    url: "https://pggitdev.github.io/ppg-files/Puri.html",
    tags: ["Design", "Responsive", "Portfolio"],
    color: "from-blue-500 to-cyan-500"
  },
  {
    title: "Sense Saimai 56",
    desc: "Real estate or location showcase project.",
    url: "https://pggitdev.github.io/ppg-files/sensesaimai56.html",
    tags: ["UI/UX", "Gallery", "Layout"],
    color: "from-emerald-500 to-teal-500"
  },
  {
    title: "Project 4.1",
    desc: "Experimental design and functional layout.",
    url: "https://pggitdev.github.io/ppg-files/4.1.html",
    tags: ["Experimental", "Web Tech"],
    color: "from-orange-500 to-red-500"
  }
];

const skillDetails = {
  "Google Workspace": {
    desc: "จัดการเอกสาร (Docs), ตารางงาน (Sheets) และการทำงานร่วมกันในทีมแบบ Real-time",
    connect: ["AppSheet", "Google Calendar", "Gmail", "Google Drive"]
  },
  "CapCut": {
    desc: "ตัดต่อวิดีโอสั้น (Short-form) สำหรับ Social Media ใส่เอฟเฟกต์และเสียงประกอบได้อย่างรวดเร็ว",
    connect: ["TikTok", "Instagram Reels", "YouTube Shorts", "Facebook"]
  },
  "Canva": {
    desc: "ออกแบบกราฟิก พรีเซนเทชั่น และสื่อโฆษณาต่างๆ ได้อย่างสวยงามและรวดเร็ว",
    connect: ["Social Media", "Print Media", "Websites", "Brand Identity"]
  },
  "Adobe Photoshop": {
    desc: "ตกแต่งภาพถ่าย รีทัช และสร้างสรรค์งานกราฟิกขั้นสูง",
    connect: ["Lightroom", "Illustrator", "Premiere Pro", "After Effects"]
  },
  "Hardware/Network": {
    desc: "ติดตั้ง ดูแลรักษา และแก้ไขปัญหาอุปกรณ์คอมพิวเตอร์และระบบเครือข่ายพื้นฐาน (LAN/WiFi)",
    connect: ["Printers", "Routers", "Servers", "Office Devices"]
  },
  "Printer Setup": {
    desc: "ติดตั้งไดรเวอร์ แก้ไขปัญหากระดาษติด และตั้งค่าการพิมพ์ผ่านเครือข่าย",
    connect: ["Network Sharing", "Scan to Email", "Maintenance"]
  },
  "Microsoft Office": {
    desc: "จัดการงานเอกสาร (Word), การนำเสนอ (PowerPoint) และคำนวณข้อมูล (Excel) อย่างมืออาชีพ",
    connect: ["OneDrive", "Outlook", "Teams", "SharePoint"]
  },
  "Wordpress": {
    desc: "ดูแลและอัปเดตเนื้อหาเว็บไซต์ ปรับแต่งธีมและปลั๊กอินพื้นฐาน",
    connect: ["WooCommerce", "SEO Tools", "Google Analytics"]
  },
  "LINE OA & API": {
    desc: "จัดการบัญชี LINE Official Account, สร้าง Rich Menu และเชื่อมต่อ API เพื่อทำระบบอัตโนมัติ",
    connect: ["Flex Message", "Webhooks", "Chatbots", "CRM"]
  },
  "AppSheet": {
    desc: "พัฒนาแอปพลิเคชันสำหรับองค์กรแบบ No-Code เพื่อจัดการข้อมูลและ Workflow",
    connect: ["Google Sheets", "Google Calendar", "Email Automation", "PDF Generation"]
  },
  "Data Analysis": {
    desc: "รวบรวมและวิเคราะห์ข้อมูลเพื่อหาแนวโน้มและสรุปผลเพื่อการตัดสินใจ",
    connect: ["Google Looker Studio", "Excel Pivot Tables", "Business Reports"]
  }
};

const mediaItems = [
  {
    title: "My Creative Assets Folder",
    type: "folder",
    url: "https://drive.google.com/drive/folders/1uSlSHdOXbweXo0U8FxoGYkyBEkOnWoT2?usp=sharing",
    icon: Folder,
    color: "text-blue-400"
  },
  {
    title: "Short Clip Showcase 1",
    type: "video",
    url: "https://drive.google.com/file/d/1MTxCRRwX0IpQMfCXEK50A_ml32mVRnds/view?usp=sharing",
    icon: Film,
    color: "text-pink-400"
  },
  {
    title: "Short Clip Showcase 2",
    type: "video",
    url: "https://drive.google.com/file/d/14vRG2JB0gA7CNiw8Kq0ZZ80chWsx1li7/view?usp=sharing",
    icon: Film,
    color: "text-pink-400"
  },
  {
    title: "Short Clip Showcase 3",
    type: "video",
    url: "https://drive.google.com/file/d/1b4BsMabp4SFESSE0oygtX04QWHH3gu9w/view?usp=sharing",
    icon: Film,
    color: "text-pink-400"
  },
  {
    title: "AI Generated Music",
    type: "audio",
    url: "https://drive.google.com/file/d/16hruUsp0ooJEf_dNPEEHPMNBtb5M7Ji/view?usp=sharing",
    icon: Music,
    color: "text-green-400"
  }
];

// --- COMPONENTS ---

const Typewriter = ({ texts, speed = 100, pause = 2000 }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    if (index >= texts.length) {
      setIndex(0);
      return;
    }

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

const SectionTitle = ({ title, subtitle, note }) => (
  <div className="mb-12 text-center fade-in-section">
    <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 mb-4">
      {title}
    </h2>
    {subtitle && <p className="text-gray-400 max-w-2xl mx-auto mb-4">{subtitle}</p>}
    {note && (
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full animate-pulse">
        <Clock size={16} className="text-blue-400" />
        <span className="text-sm font-bold text-blue-300">{note}</span>
      </div>
    )}
    {!note && <div className="w-24 h-1 bg-blue-500 mx-auto mt-4 rounded-full"></div>}
    {note && <div className="w-24 h-1 bg-blue-500 mx-auto mt-6 rounded-full"></div>}
  </div>
);

// --- SKILL BADGE & MODAL ---

const SkillModal = ({ skill, onClose }) => {
  if (!skill) return null;
  const details = skillDetails[skill.label] || {
    desc: "เครื่องมือที่ช่วยเพิ่มประสิทธิภาพการทำงาน",
    connect: ["General Use"]
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200" onClick={onClose}>
      <div 
        className="bg-gray-900 border border-blue-500/30 rounded-2xl p-8 max-w-md w-full relative shadow-[0_0_50px_rgba(59,130,246,0.2)] transform animate-in zoom-in-95 duration-200"
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
          <X size={24} />
        </button>

        <div className="flex items-center gap-4 mb-6">
          <div className="p-4 bg-blue-500/20 rounded-xl border border-blue-500/30">
            <skill.icon size={40} className="text-blue-400" />
          </div>
          <h3 className="text-2xl font-bold text-white">{skill.label}</h3>
        </div>

        <div className="space-y-6">
          <div>
            <h4 className="text-blue-400 text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
              <Zap size={14} /> ความสามารถ (Capabilities)
            </h4>
            <p className="text-gray-300 text-sm leading-relaxed border-l-2 border-blue-500/30 pl-3">
              {details.desc}
            </p>
          </div>

          <div>
            <h4 className="text-purple-400 text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
              <Share2 size={14} /> เชื่อมต่อกับ (Integrations)
            </h4>
            <div className="flex flex-wrap gap-2">
              {details.connect.map((item, i) => (
                <span key={i} className="px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-300 text-xs font-medium">
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

const SkillBadge = ({ icon: Icon, label, onClick }) => (
  <button 
    onClick={onClick}
    className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full hover:bg-white/10 transition-all cursor-pointer hover:scale-105 transform duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 hover:border-blue-500/30"
  >
    <Icon size={18} className="text-blue-400" />
    <span className="text-sm font-medium text-gray-200">{label}</span>
  </button>
);

const ProjectCard = ({ project, className = "" }) => (
  <a 
    href={project.url} 
    target="_blank" 
    rel="noopener noreferrer"
    className={`group relative bg-gray-900/50 border border-white/10 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] flex flex-col h-full hover:-translate-y-2 ${className}`}
  >
    <div className={`h-2 bg-gradient-to-r ${project.color}`} />
    <div className="p-6 flex flex-col h-full">
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-white/5 rounded-xl group-hover:bg-blue-500/20 transition-colors">
          {project.tags.includes('Canva') ? (
             <Palette className="text-white group-hover:text-blue-400" size={24} />
          ) : (
             <Layout className="text-white group-hover:text-blue-400" size={24} />
          )}
        </div>
        {project.featured && (
           <div className="flex items-center gap-1 px-3 py-1 bg-amber-500/20 border border-amber-500/30 rounded-full">
             <Star size={12} className="text-amber-400 fill-amber-400" />
             <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wide">Featured</span>
           </div>
        )}
        {!project.featured && (
          <ExternalLink className="text-gray-500 group-hover:text-white transition-colors" size={20} />
        )}
      </div>
      <h3 className={`font-bold text-white mb-2 group-hover:text-blue-400 transition-colors ${project.featured ? 'text-2xl' : 'text-xl'}`}>
        {project.title}
      </h3>
      <p className="text-gray-400 text-sm mb-6 flex-grow">
        {project.desc}
      </p>
      <div className="flex flex-wrap gap-2 mt-auto">
        {project.tags.map((tag, i) => (
          <span key={i} className="text-xs px-2 py-1 rounded-md bg-white/5 text-gray-300 border border-white/5">
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
    className="bg-gray-900/50 border border-white/10 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all duration-300 flex flex-col h-full group relative p-6 items-center text-center justify-center min-h-[180px] hover:bg-white/5 hover:-translate-y-1"
  >
    <div className="mb-4 relative">
        <div className="p-5 bg-gradient-to-br from-gray-800 to-gray-700 rounded-full group-hover:from-purple-900 group-hover:to-blue-900 transition-all duration-300 shadow-lg">
            <item.icon size={32} className={`${item.color}`} />
        </div>
        <div className="absolute -bottom-1 -right-1 bg-white text-black p-1 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            <ExternalLink size={12} />
        </div>
    </div>

    <h3 className="font-bold text-white text-md mb-2 group-hover:text-purple-400 transition-colors">{item.title}</h3>
    <span className="text-xs text-gray-500 bg-white/5 px-3 py-1 rounded-full uppercase tracking-wider font-medium">
      {item.type}
    </span>
  </a>
);

const BotCard = ({ title, desc, tags, icon: Icon, workflow, qrCode, qrLabel }) => {
  const [showQR, setShowQR] = useState(false);

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-2xl p-6 md:p-8 hover:border-green-500/50 transition-all duration-300 relative overflow-hidden group h-full flex flex-col hover:-translate-y-2">
      <div className="absolute top-0 right-0 p-32 bg-green-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-green-500/10 transition-all"></div>
      
      <div className="relative z-10 flex-grow">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-green-500/20 rounded-2xl border border-green-500/20">
              <Icon className="text-green-400" size={32} />
            </div>
            <h3 className="text-2xl font-bold text-white leading-tight">{title}</h3>
          </div>
          {qrCode && (
            <button 
              onClick={() => setShowQR(true)}
              className="p-2 bg-green-500/10 hover:bg-green-500/20 text-green-400 rounded-lg border border-green-500/30 transition-all"
              title="Scan Bot ID"
            >
              <ScanLine size={24} />
            </button>
          )}
        </div>
        
        <p className="text-gray-300 mb-6 leading-relaxed">
          {desc}
        </p>
  
        {/* Visual Workflow Representation */}
        <div className="bg-black/30 rounded-xl p-4 mb-6 border border-white/5 flex items-center justify-between gap-2 overflow-x-auto">
          {workflow.map((step, index) => (
            <React.Fragment key={index}>
              <div className="flex flex-col items-center min-w-[60px]">
                <step.icon size={20} className="text-gray-400 mb-1" />
                <span className="text-[10px] text-gray-500 uppercase tracking-wider">{step.label}</span>
              </div>
              {index < workflow.length - 1 && (
                <ChevronRight size={16} className="text-gray-600 flex-shrink-0" />
              )}
            </React.Fragment>
          ))}
        </div>
  
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, i) => (
            <span key={i} className="text-xs px-3 py-1 rounded-full bg-green-900/30 text-green-300 border border-green-500/20">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* QR Code Modal Overlay */}
      {showQR && (
        <div className="absolute inset-0 z-20 bg-black/95 backdrop-blur-sm flex flex-col items-center justify-center p-6 animate-in fade-in duration-200">
           <button 
             onClick={() => setShowQR(false)}
             className="absolute top-4 right-4 text-gray-400 hover:text-white"
           >
             <X size={24} />
           </button>
           <div className="bg-white p-2 rounded-xl mb-4 shadow-[0_0_30px_rgba(34,197,94,0.3)] border-2 border-green-500">
             <img src={qrCode} alt="Bot QR Code" className="w-48 h-48 object-contain" />
           </div>
           <div className="flex flex-col items-center gap-1">
             <span className="text-green-400 font-bold uppercase tracking-widest text-sm animate-pulse">
               Scan to Order Tasks
             </span>
             <span className="text-gray-400 text-xs font-mono bg-white/5 px-2 py-1 rounded">
               {qrLabel}
             </span>
           </div>
        </div>
      )}
    </div>
  );
};

// --- EXPERIENCE TIMELINE COMPONENT ---
const ExperienceTimeline = ({ items }) => {
  return (
    <div className="relative border-l border-gray-700 ml-3 md:ml-6 space-y-12">
      {items.map((item, index) => (
        <div key={index} className="mb-10 ml-6 relative group">
          <span className={`absolute flex items-center justify-center w-8 h-8 rounded-full -left-[44px] ring-8 ring-black bg-gray-800 border-2 border-${item.color}-500 group-hover:scale-110 transition-transform`}>
            <item.icon size={14} className={`text-${item.color}-400`} />
          </span>
          <div className="p-6 bg-gray-900/40 border border-white/5 rounded-2xl hover:bg-gray-900/80 hover:border-blue-500/30 transition-all duration-300">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
              <h3 className="flex items-center text-xl font-bold text-white">
                {item.role} 
              </h3>
              <span className="text-sm font-medium text-blue-400 bg-blue-900/20 px-3 py-1 rounded-full border border-blue-500/20 w-fit mt-2 md:mt-0">
                {item.period}
              </span>
            </div>
            <p className="text-gray-400 font-medium mb-3">{item.company}</p>
            <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

// --- AI COMPONENT ---

const AISection = ({ content }) => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!input) return;
    
    if (!genAI) {
      setResult("ขออภัยครับ ระบบ AI ยังไม่ได้ตั้งค่า API Key กรุณาติดต่อผู้ดูแลระบบ หรือติดต่อผมโดยตรงผ่าน LINE นะครับ!");
      return;
    }
    
    setLoading(true);
    setResult('');

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });
      const prompt = `
        You are Kamphon Prayoonhan, a Junior IT Support & Automation enthusiast. 
        You are humble, enthusiastic, and love using technology to solve problems.
        Your toolkit includes: LINE API, AppSheet, Google Sheets, and Google Forms.
        
        The user has a manual task or problem: "${input}"
        
        Your task:
        1. Acknowledge the problem with empathy.
        2. Suggest a specific, simple solution using your toolkit (AppSheet or LINE API).
        3. Explain briefly how it would work (e.g., "User fills form -> Data goes to Sheet -> LINE notifies boss").
        4. End by saying you are ready to help design this solution.
        
        Keep the response short (under 4 sentences), friendly, and professional (Thai language).
      `;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      setResult(response.text());
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      setResult("ขออภัยครับ ระบบ AI ขัดข้องชั่วคราว แต่ผมสามารถให้คำปรึกษาได้โดยตรงผ่าน LINE นะครับ!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-500/30 rounded-3xl p-8 md:p-12 relative overflow-hidden">
       {/* Background Decoration */}
       <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/20 rounded-full blur-[80px]"></div>
       
       <div className="relative z-10">
         <div className="flex items-center gap-3 mb-6">
           <div className="p-3 bg-blue-500/20 rounded-xl border border-blue-500/30">
             <Sparkles className="text-blue-400" size={24} />
           </div>
           <h3 className="text-2xl font-bold text-white">{content.title}</h3>
         </div>

         <p className="text-gray-300 mb-8 max-w-2xl">
           {content.subtitle}
         </p>

         <div className="grid md:grid-cols-2 gap-8">
           {/* Input Area */}
           <div className="space-y-4">
             <textarea
               className="w-full h-32 bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all resize-none"
               placeholder={content.placeholder}
               value={input}
               onChange={(e) => setInput(e.target.value)}
             />
             <button
               onClick={handleGenerate}
               disabled={loading || !input}
               className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                 loading || !input 
                   ? "bg-gray-800 text-gray-500 cursor-not-allowed" 
                   : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-lg shadow-blue-500/25 hover:scale-105"
               }`}
             >
               {loading ? (
                 <>
                   <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                   {content.loading}
                 </>
               ) : (
                 <>
                   <MessageSquare size={18} />
                   {content.button}
                 </>
               )}
             </button>
           </div>

           {/* Result Area */}
           <div className={`bg-black/30 border border-white/5 rounded-xl p-6 relative min-h-[200px] flex flex-col ${result ? 'justify-start' : 'justify-center items-center'}`}>
             {!result && !loading && (
               <div className="text-center text-gray-500">
                 <Bot size={48} className="mx-auto mb-3 opacity-20" />
                 <p className="text-sm">รอรับโจทย์จากคุณอยู่ครับ...</p>
               </div>
             )}
             
             {result && (
               <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                 <div className="flex items-center gap-2 mb-4 text-blue-400 text-sm font-bold uppercase tracking-wider">
                   <Bot size={16} />
                   {content.resultTitle}
                 </div>
                 <div className="prose prose-invert prose-sm">
                   <p className="text-gray-200 leading-relaxed whitespace-pre-wrap">{result}</p>
                 </div>
               </div>
             )}
           </div>
         </div>
       </div>
    </div>
  );
};


// --- MAIN APP ---

export default function Portfolio() {
  const [lang, setLang] = useState('th');
  const [scrolled, setScrolled] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [copied, setCopied] = useState(false);
  const t = content[lang];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);

    const handleContextMenu = (e) => {
      e.preventDefault();
    };
    
    const handleKeyDown = (e) => {
      if (e.key === 'F12') {
        e.preventDefault();
      }
      if (
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) || 
        (e.ctrlKey && e.key === 'U')
      ) {
        e.preventDefault();
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const toggleLang = () => setLang(prev => prev === 'th' ? 'en' : 'th');

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-blue-500/30 overflow-x-hidden">
      {/* Background Gradients */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-900/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-900/20 rounded-full blur-[120px]"></div>
      </div>

      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/80 backdrop-blur-md border-b border-white/10 py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="text-2xl font-bold tracking-tighter flex items-center gap-2">
            <span className="text-blue-500">&lt;</span>
            <span className="text-white">Kamphon</span>
            <span className="text-blue-500">/&gt;</span>
          </div>
          
          <div className="flex items-center gap-4 lg:gap-6">
            <div className="hidden lg:flex gap-6 text-sm font-medium text-gray-300">
              <a href="#about" className="hover:text-white transition-colors">{t.nav.about}</a>
              <a href="#experience" className="hover:text-white transition-colors">{t.nav.exp}</a>
              <a href="#works" className="hover:text-white transition-colors">{t.nav.works}</a>
              <a href="#media" className="hover:text-white transition-colors">{t.nav.media}</a>
              <a href="#automation" className="hover:text-white transition-colors">{t.nav.automation}</a>
              <a href="#ai-lab" className="hover:text-white transition-colors flex items-center gap-1">
                 <Sparkles size={12} className="text-blue-400" />
                 {t.nav.ai}
              </a>
            </div>
            
            <div className="flex items-center gap-3">
              <button 
                onClick={handleShare}
                className="p-2 rounded-full border border-white/20 hover:bg-white/10 transition-all text-gray-300 hover:text-white relative group"
                title={lang === 'th' ? "แชร์หน้านี้" : "Share this page"}
              >
                {copied ? <Check size={16} className="text-green-400" /> : <Share2 size={16} />}
                
                <span className={`absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] bg-white text-black px-2 py-1 rounded whitespace-nowrap transition-opacity ${copied ? 'opacity-100' : 'opacity-0'}`}>
                   {lang === 'th' ? 'คัดลอกลิงก์แล้ว!' : 'Link Copied!'}
                </span>
              </button>

              <button 
                onClick={toggleLang}
                className="px-3 py-1 rounded-full border border-white/20 text-xs font-bold hover:bg-white hover:text-black transition-all"
              >
                {lang === 'th' ? 'EN' : 'TH'}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative z-10 pt-40 pb-20 md:pt-60 md:pb-32 px-6 container mx-auto text-center">
        <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium animate-fade-in-up">
          Open to Work
        </div>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight flex flex-col md:block">
          {t.hero.greeting} <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">Kamphon.</span>
        </h1>
        
        <div className="text-xl md:text-3xl text-gray-300 h-10 mb-8 font-light flex justify-center items-center gap-2">
           I am a <span className="text-blue-400 font-semibold"><Typewriter texts={t.hero.roles} /></span>
        </div>

        <p className="text-gray-500 max-w-2xl mx-auto mb-12 leading-relaxed">
          {t.hero.desc}
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-4 items-center">
          <a href="#works" className="px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 hover:scale-105 transform duration-200">
            <Layers size={20} />
            {t.hero.cta}
          </a>
          <a href="#contact" className="px-8 py-3 bg-white/5 border border-white/10 text-white font-medium rounded-full hover:bg-white/10 transition-colors flex items-center justify-center gap-2 hover:scale-105 transform duration-200">
            <Mail size={20} />
            {t.nav.contact}
          </a>
        </div>

        <div className="mt-16 flex justify-center animate-bounce-slow">
          <a 
            href="https://kamphon203.wixsite.com/prime-x-legal"
            target="_blank" 
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-4 px-8 py-4 bg-gray-900/80 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden hover:border-blue-500/50 transition-all duration-500 hover:shadow-[0_0_40px_rgba(59,130,246,0.3)]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="p-3 bg-blue-500/20 rounded-xl group-hover:bg-blue-500/30 transition-colors">
               <Zap className="text-blue-400 fill-blue-400" size={24} />
            </div>
            
            <div className="text-left relative z-10">
              <div className="text-[10px] text-blue-400 font-bold uppercase tracking-widest mb-0.5 flex items-center gap-2">
                {t.hero.latest}
              </div>
              <div className="text-white font-bold text-lg group-hover:text-blue-200 transition-colors">
                Prime x Legal Platform
              </div>
            </div>
            
            <ChevronRight className="text-gray-500 group-hover:text-white group-hover:translate-x-1 transition-all" size={20} />
          </a>
        </div>

      </header>

      {/* About & Skills Grid */}
      <section id="about" className="relative z-10 py-20 border-t border-white/5 bg-black/50">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <User className="text-blue-500" />
                  {t.about.title}
                </h3>
                <div className="bg-gray-900/50 p-6 rounded-2xl border border-white/5 space-y-4 hover:border-blue-500/20 transition-colors">
                   <div className="flex items-start gap-4">
                      <User size={20} className="text-gray-500 mt-1" />
                      <div>
                        <span className="text-sm text-gray-500 block">Name</span>
                        <span className="text-white font-medium">{t.about.name}</span>
                      </div>
                   </div>
                   <div className="flex items-start gap-4">
                      <Calendar size={20} className="text-gray-500 mt-1" />
                      <div>
                        <span className="text-sm text-gray-500 block">Age</span>
                        <span className="text-white font-medium">{t.about.age}</span>
                      </div>
                   </div>
                   <div className="flex items-start gap-4">
                      <GraduationCap size={20} className="text-gray-500 mt-1" />
                      <div>
                        <span className="text-sm text-gray-500 block">Education</span>
                        <span className="text-white font-medium">{t.about.education}</span>
                      </div>
                   </div>
                </div>
              </div>
              
              <div className="bg-gray-900/30 p-6 rounded-2xl border border-white/5">
                 <p className="text-gray-400 leading-relaxed italic mb-6">
                   "{t.about.text}"
                 </p>
                 
                 <div className="space-y-6">
                    <div className="bg-white/5 p-4 rounded-xl">
                       <h4 className="text-blue-400 text-sm font-bold uppercase mb-2 flex items-center gap-2">
                         <Smile size={16} /> {t.about.personality.title}
                       </h4>
                       <p className="text-gray-400 text-sm leading-relaxed mb-3">
                         {t.about.personality.desc}
                       </p>
                       <div className="flex flex-wrap gap-2">
                         {t.about.personality.tags.map((tag, i) => (
                           <span key={i} className="text-[10px] px-2 py-1 bg-blue-500/10 text-blue-300 rounded border border-blue-500/20">
                             {tag}
                           </span>
                         ))}
                       </div>
                    </div>

                    <div className="bg-white/5 p-4 rounded-xl">
                       <h4 className="text-purple-400 text-sm font-bold uppercase mb-2 flex items-center gap-2">
                         <Lightbulb size={16} /> {t.about.workStyle.title}
                       </h4>
                       <p className="text-gray-400 text-sm leading-relaxed mb-3">
                         {t.about.workStyle.desc}
                       </p>
                       <div className="flex flex-wrap gap-2">
                         {t.about.workStyle.tags.map((tag, i) => (
                           <span key={i} className="text-[10px] px-2 py-1 bg-purple-500/10 text-purple-300 rounded border border-purple-500/20">
                             {tag}
                           </span>
                         ))}
                       </div>
                    </div>
                 </div>
              </div>
            </div>

            <div className="bg-gray-900/50 p-6 rounded-2xl border border-white/5 h-full relative">
              <div className="flex justify-between items-center mb-6">
                <h4 className="text-sm font-bold text-gray-500 uppercase flex items-center gap-2">
                  <Terminal size={16} />
                  {t.skills.title}
                </h4>
                <span className="text-[10px] text-blue-400 bg-blue-900/30 px-2 py-1 rounded animate-pulse">
                  {t.skills.subtitle}
                </span>
              </div>
              
              <div className="space-y-6">
                <div>
                  <span className="text-xs text-blue-400 mb-3 block uppercase tracking-wider">{t.skills.design}</span>
                  <div className="flex flex-wrap gap-3">
                    <SkillBadge icon={Briefcase} label="Google Workspace" onClick={() => setSelectedSkill({icon: Briefcase, label: "Google Workspace"})} />
                    <SkillBadge icon={Video} label="CapCut" onClick={() => setSelectedSkill({icon: Video, label: "CapCut"})} />
                    <SkillBadge icon={Globe} label="Canva" onClick={() => setSelectedSkill({icon: Globe, label: "Canva"})} />
                    <SkillBadge icon={Layers} label="Adobe Photoshop" onClick={() => setSelectedSkill({icon: Layers, label: "Adobe Photoshop"})} />
                  </div>
                </div>
                <div>
                  <span className="text-xs text-purple-400 mb-3 block uppercase tracking-wider">{t.skills.dev}</span>
                  <div className="flex flex-wrap gap-3">
                    <SkillBadge icon={Wrench} label="Hardware/Network" onClick={() => setSelectedSkill({icon: Wrench, label: "Hardware/Network"})} />
                    <SkillBadge icon={Cpu} label="Printer Setup" onClick={() => setSelectedSkill({icon: Cpu, label: "Printer Setup"})} />
                    <SkillBadge icon={FileText} label="Microsoft Office" onClick={() => setSelectedSkill({icon: FileText, label: "Microsoft Office"})} />
                    <SkillBadge icon={Globe} label="Wordpress" onClick={() => setSelectedSkill({icon: Globe, label: "Wordpress"})} />
                  </div>
                </div>
                <div>
                  <span className="text-xs text-green-400 mb-3 block uppercase tracking-wider">{t.skills.tools}</span>
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

      {/* Experience Timeline Section */}
      <section id="experience" className="relative z-10 py-24 bg-gradient-to-b from-black to-gray-900/20">
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

      {/* Creative Media Studio */}
      <section id="media" className="relative z-10 py-20 bg-gray-900/30 border-y border-white/5">
        <div className="container mx-auto px-6">
          <SectionTitle title={t.media.title} subtitle={t.media.subtitle} />
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {mediaItems.map((item, index) => (
              <MediaCard key={index} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* Automation / Chatbots */}
      <section id="automation" className="relative z-10 py-24 bg-gradient-to-b from-black to-gray-900/30">
        <div className="container mx-auto px-6">
          <SectionTitle title={t.bots.title} subtitle={t.bots.subtitle} />

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <BotCard 
              icon={FileText}
              title={t.bots.bot1.name}
              desc={t.bots.bot1.desc}
              tags={t.bots.bot1.tags}
              workflow={[
                { icon: Bot, label: "Line" },
                { icon: Zap, label: "Trigger" },
                { icon: FileText, label: "Drive" },
                { icon: ExternalLink, label: "Link" }
              ]}
            />

            <BotCard 
              icon={Bot}
              title={t.bots.bot2.name}
              desc={t.bots.bot2.desc}
              tags={t.bots.bot2.tags}
              qrCode={t.bots.bot2.qrCode}
              qrLabel={t.bots.bot2.qrLabel}
              workflow={[
                { icon: Calendar, label: "Plan" },
                { icon: Bot, label: "Notify" },
                { icon: BarChart, label: "Sheet" },
                { icon: Zap, label: "KPI" }
              ]}
            />
          </div>

          <div id="ai-lab">
            <AISection content={t.ai} />
          </div>
        </div>
      </section>

      {/* Hobbies & Achievements */}
      <section id="hobbies" className="relative z-10 py-24 container mx-auto px-6">
        <SectionTitle title={t.hobbies.title} subtitle={t.hobbies.subtitle} />
        
        <div className="max-w-5xl mx-auto space-y-8">
          {t.hobbies.items.map((item, index) => {
            const isYellow = item.color === 'yellow';
            const gradientClass = isYellow 
              ? "from-yellow-900/40 to-amber-900/20 border-yellow-500/30" 
              : "from-orange-900/40 to-red-900/20 border-orange-500/30";
            const shadowClass = isYellow 
              ? "shadow-[0_0_50px_rgba(234,179,8,0.1)]" 
              : "shadow-[0_0_50px_rgba(249,115,22,0.1)]";
            const textClass = isYellow ? "text-yellow-400" : "text-orange-400";
            const bgClass = isYellow ? "bg-yellow-500/10 border-yellow-500/20 text-yellow-200 hover:bg-yellow-500/20" : "bg-orange-500/10 border-orange-500/20 text-orange-200 hover:bg-orange-500/20";
            
            return (
              <div key={index} className={`bg-gradient-to-r ${gradientClass} border rounded-3xl overflow-hidden relative group ${shadowClass} hover:-translate-y-2 transition-all duration-300`}>
                
                <div className="flex flex-col md:flex-row h-full">
                   <div className="md:w-5/12 relative min-h-[300px] md:min-h-full bg-black overflow-hidden">
                     <img 
                       src={item.img} 
                       alt={item.title} 
                       className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-black/90"></div>
                     
                     <div className="absolute top-4 left-4">
                        <div className={`flex items-center gap-1.5 px-3 py-1 bg-black/60 backdrop-blur-md border rounded-full ${isYellow ? 'border-yellow-500/30' : 'border-orange-500/30'}`}>
                           <Award size={14} className={textClass} />
                           <span className={`text-xs font-bold uppercase tracking-wider ${isYellow ? 'text-yellow-100' : 'text-orange-100'}`}>
                             {isYellow ? 'Certified' : 'Passion'}
                           </span>
                        </div>
                     </div>
                   </div>

                   <div className="p-8 md:p-12 md:w-7/12 relative z-10 flex flex-col justify-center">
                     <div className="inline-block mb-3">
                       <span className={`${textClass} text-sm font-bold uppercase tracking-widest flex items-center gap-2`}>
                         <item.icon size={16} />
                         {item.role}
                       </span>
                     </div>
                     
                     <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                       {item.title}
                     </h3>
                     
                     <p className="text-gray-300 leading-relaxed mb-8 text-lg">
                       {item.desc}
                     </p>
                     
                     <div className="flex flex-wrap gap-3">
                       {item.tags.map((tag, i) => (
                         <div key={i} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm transition-colors ${bgClass}`}>
                           {isYellow ? <DollarSign size={14} className={textClass} /> : <Cat size={14} className={textClass} />}
                           {tag}
                         </div>
                       ))}
                     </div>
                   </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="relative z-10 py-24 container mx-auto px-6 text-center">
        <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-white/10 rounded-3xl p-12 md:p-20 transform hover:scale-[1.01] transition-transform duration-500">
          <h2 className="text-4xl font-bold mb-6 text-white">{t.nav.contact}</h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            {lang === 'th' 
              ? "สนใจร่วมงานหรือต้องการพูดคุยเกี่ยวกับโปรเจกต์? ติดต่อผมได้ทุกช่องทางครับ" 
              : "Interested in working together or want to discuss a project? Feel free to reach out via any channel."}
          </p>
          
          <div className="flex flex-wrap justify-center gap-6">
            <a href="mailto:kamphon203@gmail.com" className="flex items-center gap-3 bg-white text-black px-6 py-3 rounded-full font-bold hover:bg-gray-200 transition-colors hover:-translate-y-1">
              <Mail size={20} />
              kamphon203@gmail.com
            </a>
            <a href="tel:0825385515" className="flex items-center gap-3 bg-gray-800 text-white px-6 py-3 rounded-full font-bold hover:bg-gray-700 transition-colors border border-gray-700 hover:-translate-y-1">
              <Phone size={20} />
              082-538-5515
            </a>
            <a href="https://www.facebook.com/kamphon.safe/" target="_blank" rel="noreferrer" className="flex items-center gap-3 bg-[#1877F2] text-white px-6 py-3 rounded-full font-bold hover:bg-[#166fe5] transition-colors hover:-translate-y-1">
              <MessageCircle size={20} />
              Facebook
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-8 text-center text-gray-600 text-sm border-t border-white/5">
        <p>{t.footer.text} • Built with React & Tailwind</p>
      </footer>

      {selectedSkill && (
        <SkillModal skill={selectedSkill} onClose={() => setSelectedSkill(null)} />
      )}
    </div>
  );
}
