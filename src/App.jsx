import React, { useState, useEffect, useMemo } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { 
  Terminal, Layout, Bot, FileText, Calendar, BarChart, Globe, Code, Mail, MessageCircle,
  Phone, ChevronRight, Cpu, Zap, Layers, ExternalLink, Wrench, Star, TrendingUp, Award,
  DollarSign, Video, Clock, Briefcase, Utensils, Flame, Cat, ScanLine, X, Sparkles,
  MessageSquare, ArrowRight, Play, Music, Film, Folder, Palette, MapPin, GraduationCap,
  User, Share2, Brain, Lightbulb, Smile, Check, Sun, Moon
} from 'lucide-react';

import { ThemeProvider, useTheme } from './components/ThemeContext';
import ThemeToggle from './components/ThemeToggle';
import ProjectModal from './components/ProjectModal';

// --- GEMINI API SETUP ---
const apiKey = import.meta.env.VITE_GEMINI_API_KEY || "";
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

// --- DATA & TRANSLATIONS ---
const content = {
  th: {
    nav: { about: "เกี่ยวกับ", exp: "ประสบการณ์", skills: "ทักษะ", works: "ผลงาน", media: "สื่อสร้างสรรค์", ai: "AI Lab", contact: "ติดต่อ" },
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
        { role: "IT Support / Graphic Design", company: "PRIME PROPERTY GROUP CO., LTD.", period: "ปัจจุบัน", desc: "ดูแลงานออกแบบสื่อสิ่งพิมพ์และดิจิทัล, ตัดต่อวิดีโอ, ดูแล Line OA, พัฒนา AppSheet และแก้ไขปัญหาคอมพิวเตอร์เบื้องต้นในสำนักงาน", icon: Wrench, color: "blue" },
        { role: "Marketing Online Staff", company: "HANDYMAN AUTO CO., LTD.", period: "2023", desc: "ดูแลสื่อออนไลน์ Website/Social Media, สร้างคอนเทนต์การตลาด และจัดการฐานข้อมูลลูกค้า", icon: Globe, color: "purple" },
        { role: "Human Resource Staff", company: "Future Engineering Consultants Co., Ltd.", period: "2023", desc: "ดูแลสรรหาบุคลากร (Recruitment), ปฐมนิเทศพนักงานใหม่ (Onboarding) และวิเคราะห์ความต้องการฝึกอบรม", icon: User, color: "orange" },
        { role: "Customer Service IT Gadget", company: "Central Retail Corp (Power Buy)", period: "Part-time", desc: "ให้คำแนะนำลูกค้าเกี่ยวกับสินค้าไอทีและ Gadget, จัดการสต็อกสินค้า", icon: Cpu, color: "red" },
        { role: "Call Center", company: "True Corporation", period: "2022", desc: "รับสายบริการลูกค้า ตอบข้อซักถาม แจ้งข้อมูลผลิตภัณฑ์และโปรโมชั่น", icon: Phone, color: "green" }
      ]
    },
    skills: { title: "ความสามารถ (Skills)", subtitle: "คลิกที่ปุ่มเพื่อดูรายละเอียดเพิ่มเติม", design: "Creative & Media Tools", dev: "General IT Support", tools: "Automation & Data" },
    portfolio: { title: "ผลงานเว็บไซต์ (Web Projects)", subtitle: "ผลงานการออกแบบและการเรียนรู้ (คลิกเพื่อดูรายละเอียดเจาะลึก)" },
    media: { title: "Creative Studio", subtitle: "คลังผลงานวิดีโอ เพลง และกราฟิก (คลิกเพื่อเปิดดูไฟล์ต้นฉบับ)" },
    bots: {
      title: "ระบบอัตโนมัติ & Chatbots",
      subtitle: "โปรเจกต์ฝึกฝนการใช้ LINE API และ AppSheet",
      bot1: { name: "File Saver Bot", desc: "บอทช่วยเก็บไฟล์อัตโนมัติ ดึงไฟล์จากห้องแชท LINE ไปบันทึกยัง Google Drive และส่งลิงก์กลับมาทันที ช่วยลดปัญหาไฟล์หมดอายุในแชท", tags: ["LINE API", "Google Drive API", "Cloud Functions"] },
      bot2: { name: "Smart Planner Assistant", desc: "บอทผู้ช่วยวางแผนงาน แจ้งเตือน และสรุปงาน เชื่อมต่อ Google Calendar เพื่อลงตาราง และส่งข้อมูลเข้า Google Sheets เพื่อวิเคราะห์ KPI", tags: ["Task Management", "Calendar API", "Sheets API", "Data Analysis"], qrCode: "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=https://line.me/R/ti/p/@745rnmvz", qrLabel: "LINE ID: @745rnmvz" }
    },
    ai: {
      title: "AI Automation Architect",
      subtitle: "ลองปรึกษาผมดูสิครับ! พิมพ์งานที่คุณคิดว่าน่าเบื่อหรือซ้ำซ้อน แล้ว AI จะเสนอทางแก้ให้ทันที",
      placeholder: "เช่น: อยากเก็บข้อมูลการลาของพนักงาน, ต้องคอยส่งสรุปยอดขายเข้าไลน์ทุกวัน...",
      button: "ขอไอเดียลดงานด้วย AI",
      loading: "กำลังวิเคราะห์โซลูชัน...",
      resultTitle: "คำแนะนำจาก Kamphon (AI Version):"
    },
    footer: { text: "© 2026 Kamphon Prayoonhan. Created with Passion." }
  },
  en: {
    nav: { about: "About", exp: "Experience", skills: "Skills", works: "Works", media: "Media", ai: "AI Lab", contact: "Contact" },
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
      personality: { title: "Personality", desc: "Friendly, curious, and always asking 'Why' to understand things deeply. A determined learner who is calm, strategic (always has a Plan B), and full of energy.", tags: ["Friendly", "Curious", "Strategic Planner", "High Energy", "Determined"] },
      workStyle: { title: "Work Style", desc: "Constant ideator (can be distracted by new ideas). I dislike repetitive tasks, so I act 'Smart Lazy' by automating them to save time. A perfectionist who believes great results need proper time, tools, and resources.", tags: ["Idea Generator", "Smart Lazy", "Perfectionist", "Forward Thinking", "Resource Oriented"] }
    },
    experience: {
      title: "Work Experience",
      subtitle: "My professional journey and growth",
      items: [
        { role: "IT Support / Graphic Design", company: "PRIME PROPERTY GROUP CO., LTD.", period: "Present", desc: "Graphic/Digital design, Video editing, Line OA management, AppSheet development, and basic office IT troubleshooting.", icon: Wrench, color: "blue" },
        { role: "Marketing Online Staff", company: "HANDYMAN AUTO CO., LTD.", period: "2023", desc: "Managed online presence (Website/Social), created marketing content, and maintained customer databases.", icon: Globe, color: "purple" },
        { role: "Human Resource Staff", company: "Future Engineering Consultants Co., Ltd.", period: "2023", desc: "Handled recruitment, new employee onboarding, and training needs analysis.", icon: User, color: "orange" },
        { role: "Customer Service IT Gadget", company: "Central Retail Corp (Power Buy)", period: "Part-time", desc: "Assisted customers with IT products/gadgets inquiries and managed inventory.", icon: Cpu, color: "red" },
        { role: "Call Center", company: "True Corporation", period: "2022", desc: "Provided customer support, handled inquiries, and informed about products and promotions.", icon: Phone, color: "green" }
      ]
    },
    skills: { title: "Skills", subtitle: "Click on badges for more details", design: "Creative & Media Tools", dev: "General IT Support", tools: "Automation & Data" },
    portfolio: { title: "Web Projects", subtitle: "Design and development showcase (Click for details)" },
    media: { title: "Creative Studio", subtitle: "Video, Music, and Graphics collection" },
    bots: {
      title: "Automation & Chatbots",
      subtitle: "LINE API and AppSheet projects",
      bot1: { name: "File Saver Bot", desc: "Automatically saves files from LINE chat to Google Drive and returns a link, preventing file expiration.", tags: ["LINE API", "Google Drive API", "Cloud Functions"] },
      bot2: { name: "Smart Planner Assistant", desc: "Task planning assistant that syncs with Google Calendar and summarizes work in Google Sheets for KPI analysis.", tags: ["Task Management", "Calendar API", "Sheets API", "Data Analysis"], qrCode: "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=https://line.me/R/ti/p/@745rnmvz", qrLabel: "LINE ID: @745rnmvz" }
    },
    ai: {
      title: "AI Automation Architect",
      subtitle: "Consult with me! Describe a repetitive task, and AI will suggest an automation solution.",
      placeholder: "e.g., I want to track employee leave, send daily sales summaries to LINE...",
      button: "Get AI Solution",
      loading: "Analyzing solution...",
      resultTitle: "Kamphon's AI Suggestion:"
    },
    footer: { text: "© 2026 Kamphon Prayoonhan. Created with Passion." }
  }
};

const skillDetails = {
  "Photoshop": { desc: "ออกแบบกราฟิกขั้นสูง ตกแต่งภาพ และสร้างสื่อโฆษณา (Graphic Design & Photo Manipulation)", connect: ["Print Media", "Social Media", "Web Assets"] },
  "Illustrator": { desc: "สร้าง Vector Graphics, Logo และงานออกแบบที่ต้องการความคมชัดสูง (Vector Design & Branding)", connect: ["Branding", "Iconography", "Typography"] },
  "Premiere Pro": { desc: "ตัดต่อวิดีโอระดับมืออาชีพ ใส่เอฟเฟกต์ และจัดการเสียง (Professional Video Editing)", connect: ["YouTube", "Corporate Video", "Marketing Content"] },
  "CapCut": { desc: "ตัดต่อวิดีโอสั้น (Short-form) สำหรับ Social Media ใส่เอฟเฟกต์และเสียงประกอบได้อย่างรวดเร็ว", connect: ["TikTok", "Instagram Reels", "YouTube Shorts", "Facebook"] },
  "Canva": { desc: "ออกแบบกราฟิก พรีเซนเทชั่น และสื่อโฆษณาต่างๆ ได้อย่างสวยงามและรวดเร็ว", connect: ["Social Media", "Print Media", "Websites", "Brand Identity"] },
  "Basic Hardware": { desc: "ตรวจเช็คและแก้ไขปัญหาคอมพิวเตอร์เบื้องต้น (PC/Laptop Troubleshooting)", connect: ["Office IT", "Maintenance", "Setup"] },
  "Software Setup": { desc: "ติดตั้งและตั้งค่าโปรแกรมต่างๆ ให้พร้อมใช้งาน (OS & Application Installation)", connect: ["Windows", "macOS", "Office Suite"] },
  "Network Basic": { desc: "ดูแลระบบเครือข่ายเบื้องต้น และแก้ไขปัญหาการเชื่อมต่อ (Basic Networking & Connectivity)", connect: ["Wi-Fi", "LAN", "Printer Sharing"] },
  "Basic Server": { desc: "ดูแลและจัดการ Server เบื้องต้น (Basic Server Management)", connect: ["File Server", "Backup", "User Access"] },
  "AppSheet": { desc: "พัฒนา No-code Application เพื่อจัดการข้อมูลและลดขั้นตอนการทำงาน (No-code App Development)", connect: ["Google Sheets", "Automation", "Data Management"] },
  "LINE API": { desc: "พัฒนา Chatbot และระบบแจ้งเตือนผ่าน LINE (LINE Bot & Messaging API)", connect: ["Messaging API", "Rich Menu", "LIFF"] },
  "Google Workspace": { desc: "ใช้งานและจัดการเครื่องมือใน Google Workspace อย่างเต็มประสิทธิภาพ", connect: ["Docs", "Sheets", "Drive", "Forms"] },
  "Automation": { desc: "สร้างระบบทำงานอัตโนมัติเพื่อลดภาระงานซ้ำซ้อน (Workflow Automation)", connect: ["Make.com", "Zapier", "Apps Script"] }
};

const projects = [
  { title: "Portfolio Website", desc: "เว็บไซต์รวบรวมผลงานและทักษะส่วนตัว พัฒนาด้วย React และ Tailwind CSS", url: "#", tags: ["React", "Tailwind", "Vite"], color: "from-blue-500 to-cyan-500", featured: true, problem: "ต้องการพื้นที่แสดงผลงานที่ดูเป็นมืออาชีพและเข้าถึงง่าย", solution: "สร้างเว็บไซต์แบบ Single Page Application ที่รองรับทุกหน้าจอ", result: "มีพื้นที่รวบรวมผลงานที่ชัดเจนและแชร์ให้ผู้สนใจดูได้ทันที" },
  { title: "Real Estate Web Design", desc: "ออกแบบหน้าเว็บไซต์สำหรับธุรกิจอสังหาริมทรัพย์ เน้นความหรูหราและใช้งานง่าย", url: "https://www.canva.com/design/DAGX60_817M/8Y98Y98Y98Y98Y98Y98Y98/view", tags: ["Canva", "UI/UX", "Design"], color: "from-purple-500 to-pink-500", problem: "เว็บไซต์เดิมดูเก่าและใช้งานยากบนมือถือ", solution: "ออกแบบ UI ใหม่ที่เน้นความโปร่งใสและรูปภาพขนาดใหญ่", result: "ภาพลักษณ์แบรนด์ดูทันสมัยขึ้นและรองรับการใช้งานทุกอุปกรณ์" },
  { title: "IT Support Dashboard", desc: "ระบบจัดการเคสแจ้งซ่อมและติดตามสถานะงานไอทีซัพพอร์ต", url: "#", tags: ["AppSheet", "Google Sheets"], color: "from-green-500 to-emerald-500", problem: "การแจ้งซ่อมผ่านไลน์ทำให้ข้อมูลตกหล่นและติดตามงานยาก", solution: "ใช้ AppSheet สร้างแอปแจ้งซ่อมที่เก็บข้อมูลลง Google Sheets อัตโนมัติ", result: "ติดตามสถานะงานได้ 100% และสรุปรายงานประจำเดือนได้ในคลิกเดียว" }
];

const mediaItems = [
  { title: "Short Film Editing", type: "Video", icon: Film, url: "#", color: "text-red-400" },
  { title: "Lo-fi Beats", type: "Music", icon: Music, url: "#", color: "text-purple-400" },
  { title: "Brand Identity", type: "Graphic", icon: Palette, url: "#", color: "text-blue-400" }
];

// --- COMPONENTS ---
const TypingText = ({ texts, speed = 100, pause = 2000 }) => {
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
      {displayedText}<span className="animate-pulse">|</span>
    </span>
  );
};

const SectionTitle = ({ title, subtitle, note }) => (
  <div className="mb-12 text-center">
    <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 mb-4">
      {title}
    </h2>
    {subtitle && <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-4">{subtitle}</p>}
    {note && (
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full animate-pulse">
        <Clock size={16} className="text-blue-500 dark:text-blue-400" />
        <span className="text-sm font-bold text-blue-600 dark:text-blue-300">{note}</span>
      </div>
    )}
    <div className="w-24 h-1 bg-blue-500 mx-auto mt-4 rounded-full"></div>
  </div>
);

const SkillBadge = ({ icon: Icon, label, onClick }) => (
  <button 
    onClick={onClick}
    className="flex items-center gap-2 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 px-4 py-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-all cursor-pointer hover:scale-105 transform duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 hover:border-blue-500/30"
  >
    <Icon size={18} className="text-blue-600 dark:text-blue-400" />
    <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{label}</span>
  </button>
);

const AppContent = () => {
  const [lang, setLang] = useState('th');
  const [activeSkill, setActiveSkill] = useState(null);
  const [activeProject, setActiveProject] = useState(null);
  const [aiInput, setAiInput] = useState("");
  const [aiResult, setAiResult] = useState("");
  const [isAiLoading, setIsAiLoading] = useState(false);
  const { isDark } = useTheme();

  const t = content[lang];

  const handleAiSubmit = async () => {
    if (!aiInput.trim() || !genAI) return;
    setIsAiLoading(true);
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = `You are Kamphon, an IT Support and Automation expert. Suggest a solution using AppSheet or LINE API for: ${aiInput}. Keep it concise and professional in ${lang === 'th' ? 'Thai' : 'English'}.`;
      const result = await model.generateContent(prompt);
      setAiResult(result.response.text());
    } catch (error) {
      setAiResult("Error connecting to AI. Please try again later.");
    }
    setIsAiLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] text-gray-900 dark:text-white transition-colors duration-300">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-40 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-200 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-xl font-black tracking-tighter bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            KAMPHON.DEV
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-bold uppercase tracking-widest">
            {Object.entries(t.nav).map(([key, label]) => (
              <a key={key} href={`#${key}`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{label}</a>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => setLang(lang === 'th' ? 'en' : 'th')} className="text-xs font-black px-3 py-1 border-2 border-gray-900 dark:border-white rounded-md hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-black transition-all">
              {lang.toUpperCase()}
            </button>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="relative z-10">
            <div className="inline-block px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-600 dark:text-blue-400 text-sm font-bold mb-6">
              {t.hero.greeting}
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
              Kamphon <br />
              <span className="text-blue-600 dark:text-blue-500">
                <TypingText texts={t.hero.roles} />
              </span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-lg leading-relaxed">
              {t.hero.desc}
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#works" className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 flex items-center gap-2">
                {t.hero.cta} <ArrowRight size={20} />
              </a>
              <div className="flex items-center gap-4 px-6 py-4 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-ping" />
                <span className="text-sm font-bold">{t.hero.latest}: AppSheet Automation</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="w-full aspect-square bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-3xl border border-blue-500/20 relative overflow-hidden group">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000')] bg-cover bg-center opacity-50 group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-50 dark:from-[#0a0a0a] via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* About Section (Restored) */}
      <section id="about" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionTitle title={t.about.title} />
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="p-8 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-3xl">
                <h3 className="text-2xl font-bold mb-4">{t.about.name}</h3>
                <p className="text-blue-600 dark:text-blue-400 font-bold mb-4">{t.about.age} | {t.about.education}</p>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{t.about.text}</p>
              </div>
              <div className="p-8 bg-blue-600 text-white rounded-3xl shadow-xl shadow-blue-600/20">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><Smile /> {t.about.personality.title}</h3>
                <p className="mb-6 opacity-90">{t.about.personality.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {t.about.personality.tags.map((tag, i) => (
                    <span key={i} className="px-3 py-1 bg-white/20 rounded-full text-xs font-bold">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className="p-8 bg-gray-900 text-white rounded-3xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-32 bg-purple-600/20 rounded-full blur-3xl" />
              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-purple-400"><Zap /> {t.about.workStyle.title}</h3>
                <p className="mb-6 text-gray-300">{t.about.workStyle.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {t.about.workStyle.tags.map((tag, i) => (
                    <span key={i} className="px-3 py-1 bg-purple-600/20 border border-purple-600/30 rounded-full text-xs font-bold text-purple-300">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="exp" className="py-20 px-6 bg-white dark:bg-white/[0.02]">
        <div className="max-w-7xl mx-auto">
          <SectionTitle title={t.experience.title} subtitle={t.experience.subtitle} />
          <div className="grid gap-6">
            {t.experience.items.map((item, i) => (
              <div key={i} className="group flex flex-col md:flex-row gap-6 p-8 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-3xl hover:border-blue-500/50 transition-all">
                <div className={`p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 h-fit`}>
                  <item.icon className={`text-blue-600 dark:text-blue-400`} size={32} />
                </div>
                <div className="flex-grow">
                  <div className="flex flex-wrap justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold mb-1">{item.role}</h3>
                      <p className="text-blue-600 dark:text-blue-400 font-bold">{item.company}</p>
                    </div>
                    <span className="px-4 py-1 bg-gray-200 dark:bg-white/10 rounded-full text-xs font-bold">{item.period}</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section (Restored) */}
      <section id="skills" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionTitle title={t.skills.title} subtitle={t.skills.subtitle} />
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-3xl">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-blue-600"><Palette size={20} /> {t.skills.design}</h3>
              <div className="flex flex-wrap gap-3">
                {["Photoshop", "Illustrator", "Premiere Pro", "CapCut", "Canva"].map(s => (
                  <SkillBadge key={s} icon={Palette} label={s} onClick={() => setActiveSkill({label: s, icon: Palette})} />
                ))}
              </div>
            </div>
            <div className="p-8 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-3xl">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-purple-600"><Wrench size={20} /> {t.skills.dev}</h3>
              <div className="flex flex-wrap gap-3">
                {["Basic Hardware", "Software Setup", "Network Basic", "Basic Server"].map(s => (
                  <SkillBadge key={s} icon={Wrench} label={s} onClick={() => setActiveSkill({label: s, icon: Wrench})} />
                ))}
              </div>
            </div>
            <div className="p-8 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-3xl">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-green-600"><Zap size={20} /> {t.skills.tools}</h3>
              <div className="flex flex-wrap gap-3">
                {["AppSheet", "LINE API", "Google Workspace", "Automation"].map(s => (
                  <SkillBadge key={s} icon={Zap} label={s} onClick={() => setActiveSkill({label: s, icon: Zap})} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="works" className="py-20 px-6 bg-white dark:bg-white/[0.02]">
        <div className="max-w-7xl mx-auto">
          <SectionTitle title={t.portfolio.title} subtitle={t.portfolio.subtitle} />
          <div className="grid md:grid-cols-3 gap-8">
            {projects.map((project, i) => (
              <div 
                key={i} 
                onClick={() => setActiveProject(project)}
                className="group cursor-pointer bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/10 rounded-3xl overflow-hidden hover:shadow-2xl transition-all hover:-translate-y-2"
              >
                <div className={`h-2 bg-gradient-to-r ${project.color}`} />
                <div className="p-8">
                  <div className="flex justify-between mb-6">
                    <div className="p-3 bg-blue-500/10 rounded-xl text-blue-600"><Layout size={24} /></div>
                    <ExternalLink size={20} className="text-gray-400" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-600 transition-colors">{project.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">{project.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, j) => (
                      <span key={j} className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 bg-gray-100 dark:bg-white/5 rounded-full">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Media & Bots Section (Restored) */}
      <section id="media" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionTitle title={t.media.title} subtitle={t.media.subtitle} />
          <div className="grid md:grid-cols-3 gap-6 mb-20">
            {mediaItems.map((item, i) => (
              <a key={i} href={item.url} className="p-6 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-3xl flex items-center gap-4 hover:border-purple-500/50 transition-all group">
                <div className={`p-4 rounded-2xl bg-gray-100 dark:bg-white/5 ${item.color}`}><item.icon size={24} /></div>
                <div>
                  <h4 className="font-bold group-hover:text-purple-600 transition-colors">{item.title}</h4>
                  <span className="text-xs opacity-50 uppercase tracking-widest">{item.type}</span>
                </div>
              </a>
            ))}
          </div>

          <SectionTitle title={t.bots.title} subtitle={t.bots.subtitle} />
          <div className="grid md:grid-cols-2 gap-8">
            {[t.bots.bot1, t.bots.bot2].map((bot, i) => (
              <div key={i} className="p-8 bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-[2.5rem] relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-32 bg-green-500/10 rounded-full blur-3xl" />
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-6">
                    <div className="p-4 bg-green-500/20 rounded-2xl text-green-400"><Bot size={32} /></div>
                    {bot.qrCode && <img src={bot.qrCode} alt="QR" className="w-20 h-20 rounded-lg border-2 border-white/10" />}
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{bot.name}</h3>
                  <p className="text-gray-400 mb-6 leading-relaxed">{bot.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {bot.tags.map((tag, j) => (
                      <span key={j} className="px-3 py-1 bg-white/10 rounded-full text-xs font-bold">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Lab Section */}
      <section id="ai" className="py-20 px-6 bg-gradient-to-b from-transparent to-blue-500/5">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-900 border border-blue-500/30 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-32 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-4 bg-blue-600 rounded-2xl text-white shadow-lg shadow-blue-600/30"><Brain size={32} /></div>
                <div>
                  <h2 className="text-3xl font-black">{t.ai.title}</h2>
                  <p className="text-gray-600 dark:text-gray-400">{t.ai.subtitle}</p>
                </div>
              </div>
              <div className="space-y-4">
                <textarea 
                  value={aiInput}
                  onChange={(e) => setAiInput(e.target.value)}
                  placeholder={t.ai.placeholder}
                  className="w-full h-32 bg-gray-50 dark:bg-black/50 border-2 border-gray-200 dark:border-white/10 rounded-2xl p-6 focus:border-blue-500 outline-none transition-all resize-none"
                />
                <button 
                  onClick={handleAiSubmit}
                  disabled={isAiLoading}
                  className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {isAiLoading ? <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" /> : <Sparkles size={20} />}
                  {t.ai.button}
                </button>
              </div>
              {aiResult && (
                <div className="mt-8 p-8 bg-blue-500/5 border border-blue-500/20 rounded-2xl animate-in fade-in slide-in-from-bottom-4">
                  <h4 className="font-bold text-blue-600 dark:text-blue-400 mb-4 flex items-center gap-2"><Bot size={20} /> {t.ai.resultTitle}</h4>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">{aiResult}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-gray-200 dark:border-white/10 text-center">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center gap-6 mb-8">
            <a href="#" className="p-3 bg-gray-100 dark:bg-white/5 rounded-full hover:bg-blue-600 hover:text-white transition-all"><Code size={20} /></a>
            <a href="#" className="p-3 bg-gray-100 dark:bg-white/5 rounded-full hover:bg-blue-600 hover:text-white transition-all"><Mail size={20} /></a>
            <a href="#" className="p-3 bg-gray-100 dark:bg-white/5 rounded-full hover:bg-blue-600 hover:text-white transition-all"><MessageCircle size={20} /></a>
          </div>
          <p className="text-gray-500 text-sm font-medium">{t.footer.text}</p>
        </div>
      </footer>

      {/* Modals */}
      {activeProject && <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />}
      {activeSkill && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setActiveSkill(null)}>
          <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl max-w-md w-full relative" onClick={e => e.stopPropagation()}>
            <button onClick={() => setActiveSkill(null)} className="absolute top-4 right-4"><X /></button>
            <div className="flex items-center gap-4 mb-6">
              <div className="p-4 bg-blue-500/10 rounded-2xl text-blue-600"><activeSkill.icon size={32} /></div>
              <h3 className="text-2xl font-bold">{activeSkill.label}</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-6">{skillDetails[activeSkill.label]?.desc}</p>
            <div className="flex flex-wrap gap-2">
              {skillDetails[activeSkill.label]?.connect.map(c => (
                <span key={c} className="px-3 py-1 bg-blue-500/10 text-blue-600 rounded-full text-xs font-bold">{c}</span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const App = () => (
  <ThemeProvider>
    <AppContent />
  </ThemeProvider>
);

export default App;
