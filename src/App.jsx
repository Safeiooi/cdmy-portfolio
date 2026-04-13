import React, { useState, useEffect, useMemo } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { 
  Terminal, Layout, Bot, FileText, Calendar, BarChart, Globe, Code, Mail, MessageCircle,
  Phone, ChevronRight, Cpu, Zap, Layers, ExternalLink, Wrench, Star, TrendingUp, Award,
  DollarSign, Video, Clock, Briefcase, Utensils, Flame, Cat, ScanLine, X, Sparkles,
  MessageSquare, ArrowRight, Play, Music, Film, Folder, Palette, MapPin, GraduationCap,
  User, Share2, Brain, Lightbulb, Smile, Check, Sun, Moon, Shield, Activity, Database,
  Search, Settings, Layers2, Monitor, Smartphone, Laptop, Server, HardDrive, Wifi,
  MousePointer2, Keyboard, Command, Box, Package, Layers3, Zap2, Rocket, Info, AlertCircle
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
    nav: { about: "PROFILE", exp: "TIMELINE", skills: "SKILLS", works: "PROJECTS", media: "MEDIA", ai: "AI LAB", contact: "CONTACT" },
    hero: {
      greeting: "SYSTEM STATUS: ONLINE",
      roles: ["Creative & Junior IT Support", "Graphic Designer", "Automation Enthusiast", "Funded Trader"],
      desc: "ผมทำงานด้านไอทีซัพพอร์ตเบื้องต้น (Basic Support) ควบคู่กับการออกแบบสื่อ (Visual Design) และกำลังศึกษาการพัฒนา AppSheet เพื่อช่วยลดภาระงานซ้ำซ้อน",
      cta: "ACCESS PROJECTS",
      latest: "LATEST LOG"
    },
    about: {
      title: "PROFILE & MINDSET",
      name: "Kamphon Prayoonhan",
      age: "25 ปี (เกิด 22/05/2000)",
      education: "ปริญญาตรี สาขาการจัดการ (Bachelor of Management), มหาวิทยาลัยขอนแก่น",
      text: "ผมเริ่มทำงานในสาย Customer Service และ HR ก่อนจะผันตัวมาทำ IT Support และ Graphic Design อย่างเต็มตัว ทำให้ผมมีจุดแข็งคือ 'เข้าใจคน' และ 'เข้าใจระบบ' ผมชอบแก้ปัญหาและเรียนรู้เทคโนโลยีใหม่ๆ เสมอครับ",
      personality: {
        title: "PERSONALITY",
        desc: "เฟรนลี่เข้าได้กับทุกวัย เป็นคนขี้สงสัยชอบตั้งคำถามหาเหตุผล (อยากรู้อะไรต้องรู้ให้ได้) ใจเย็น ชอบวางแผนและมีแผนสำรองเสมอ มีเอเนอจี้ในการทำงานสูงและมุ่งมั่นมาก",
        tags: ["Friendly", "Curious", "Strategic Planner", "High Energy", "Determined"]
      },
      workStyle: {
        title: "WORK STYLE",
        desc: "บางทีสมาธิสั้นเพราะไอเดียพุ่งพล่านตลอดเวลา ไม่ชอบงานจำเจเลยมักหาวิธีลดเวลาทำงาน (Smart Lazy) เพื่อให้มีเวลาเพิ่ม เป็น Perfectionist ที่เชื่อว่า 'ผลลัพธ์ที่ดีต้องมาจากทรัพยากร เวลา และเครื่องมือที่ดี'",
        tags: ["Idea Generator", "Smart Lazy", "Perfectionist", "Forward Thinking", "Resource Oriented"]
      }
    },
    experience: {
      title: "TIMELINE",
      subtitle: "เส้นทางการเรียนรู้และการเติบโตในสายอาชีพ",
      items: [
        { role: "IT Support / Graphic Design", company: "PRIME PROPERTY GROUP CO., LTD.", period: "ปัจจุบัน", desc: "ดูแลงานออกแบบสื่อสิ่งพิมพ์และดิจิทัล, ตัดต่อวิดีโอ, ดูแล Line OA, พัฒนา AppSheet และแก้ไขปัญหาคอมพิวเตอร์เบื้องต้นในสำนักงาน", icon: Wrench, color: "blue" },
        { role: "Marketing Online Staff", company: "HANDYMAN AUTO CO., LTD.", period: "2023", desc: "ดูแลสื่อออนไลน์ Website/Social Media, สร้างคอนเทนต์การตลาด และจัดการฐานข้อมูลลูกค้า", icon: Globe, color: "purple" },
        { role: "Human Resource Staff", company: "Future Engineering Consultants Co., Ltd.", period: "2023", desc: "ดูแลสรรหาบุคลากร (Recruitment), ปฐมนิเทศพนักงานใหม่ (Onboarding) และวิเคราะห์ความต้องการฝึกอบรม", icon: User, color: "orange" },
        { role: "Customer Service IT Gadget", company: "Central Retail Corp (Power Buy)", period: "Part-time", desc: "ให้คำแนะนำลูกค้าเกี่ยวกับสินค้าไอทีและ Gadget, จัดการสต็อกสินค้า", icon: Cpu, color: "red" },
        { role: "Call Center", company: "True Corporation", period: "2022", desc: "รับสายบริการลูกค้า ตอบข้อซักถาม แจ้งข้อมูลผลิตภัณฑ์และโปรโมชั่น", icon: Phone, color: "green" }
      ]
    },
    skills: { title: "SKILLS", subtitle: "คลิกที่ปุ่มเพื่อดูรายละเอียดเพิ่มเติม", design: "Creative & Media Tools", dev: "General IT Support", tools: "Automation & Data" },
    portfolio: { title: "PROJECTS", subtitle: "ผลงานการออกแบบและการเรียนรู้ (คลิกเพื่อดูรายละเอียดเจาะลึก)" },
    media: { title: "CREATIVE STUDIO", subtitle: "คลังผลงานวิดีโอ เพลง และกราฟิก (คลิกเพื่อเปิดดูไฟล์ต้นฉบับ)" },
    bots: {
      title: "AUTOMATION & CHATBOTS",
      subtitle: "โปรเจกต์ฝึกฝนการใช้ LINE API และ AppSheet",
      bot1: { name: "File Saver Bot", desc: "บอทช่วยเก็บไฟล์อัตโนมัติ ดึงไฟล์จากห้องแชท LINE ไปบันทึกยัง Google Drive และส่งลิงก์กลับมาทันที ช่วยลดปัญหาไฟล์หมดอายุในแชท", tags: ["LINE API", "Google Drive API", "Cloud Functions"] },
      bot2: { name: "Smart Planner Assistant", desc: "บอทผู้ช่วยวางแผนงาน แจ้งเตือน และสรุปงาน เชื่อมต่อ Google Calendar เพื่อลงตาราง และส่งข้อมูลเข้า Google Sheets เพื่อวิเคราะห์ KPI", tags: ["Task Management", "Calendar API", "Sheets API", "Data Analysis"], qrCode: "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=https://line.me/R/ti/p/@745rnmvz", qrLabel: "LINE ID: @745rnmvz" }
    },
    ai: {
      title: "AI LAB: MANUS INTEGRATION",
      subtitle: "ลองปรึกษาผมดูสิครับ! พิมพ์งานที่คุณคิดว่าน่าเบื่อหรือซ้ำซ้อน แล้ว AI จะเสนอทางแก้ให้ทันที",
      placeholder: "เช่น: อยากเก็บข้อมูลการลาของพนักงาน, ต้องคอยส่งสรุปยอดขายเข้าไลน์ทุกวัน...",
      button: "GENERATE AI SOLUTION",
      loading: "ANALYZING SOLUTION...",
      resultTitle: "KAMPHON'S AI SUGGESTION:",
      manusTitle: "POWERED BY MANUS AI",
      manusDesc: "โปรเจกต์นี้ถูกสร้างและจัดการโดยใช้ Manus AI (Autonomous AI Agent) เพื่อเพิ่มประสิทธิภาพในการทำงานแบบอัตโนมัติ"
    },
    footer: { text: "© 2026 KAMPHON PRAYOONHAN. OVER THE FRONTIER / INTO THE FRONT." }
  },
  en: {
    nav: { about: "PROFILE", exp: "TIMELINE", skills: "SKILLS", works: "PROJECTS", media: "MEDIA", ai: "AI LAB", contact: "CONTACT" },
    hero: {
      greeting: "SYSTEM STATUS: ONLINE",
      roles: ["Creative & Junior IT Support", "Graphic Designer", "Automation Enthusiast", "Funded Trader"],
      desc: "I provide basic IT support and visual design services. I am passionate about learning automation tools like AppSheet to improve workflow efficiency.",
      cta: "ACCESS PROJECTS",
      latest: "LATEST LOG"
    },
    about: {
      title: "PROFILE & MINDSET",
      name: "Kamphon Prayoonhan",
      age: "25 Years Old (Born 22/05/2000)",
      education: "Bachelor of Management, Khon Kaen University",
      text: "I transitioned from Customer Service & HR to full-time IT Support & Graphic Design. My strength lies in understanding both 'People' and 'Systems'. I love solving problems and learning new technologies.",
      personality: { title: "PERSONALITY", desc: "Friendly, curious, and always asking 'Why' to understand things deeply. A determined learner who is calm, strategic (always has a Plan B), and full of energy.", tags: ["Friendly", "Curious", "Strategic Planner", "High Energy", "Determined"] },
      workStyle: { title: "WORK STYLE", desc: "Constant ideator (can be distracted by new ideas). I dislike repetitive tasks, so I act 'Smart Lazy' by automating them to save time. A perfectionist who believes great results need proper time, tools, and resources.", tags: ["Idea Generator", "Smart Lazy", "Perfectionist", "Forward Thinking", "Resource Oriented"] }
    },
    experience: {
      title: "TIMELINE",
      subtitle: "My professional journey and growth",
      items: [
        { role: "IT Support / Graphic Design", company: "PRIME PROPERTY GROUP CO., LTD.", period: "Present", desc: "Graphic/Digital design, Video editing, Line OA management, AppSheet development, and basic office IT troubleshooting.", icon: Wrench, color: "blue" },
        { role: "Marketing Online Staff", company: "HANDYMAN AUTO CO., LTD.", period: "2023", desc: "Managed online presence (Website/Social), created marketing content, and maintained customer databases.", icon: Globe, color: "purple" },
        { role: "Human Resource Staff", company: "Future Engineering Consultants Co., Ltd.", period: "2023", desc: "Handled recruitment, new employee onboarding, and training needs analysis.", icon: User, color: "orange" },
        { role: "Customer Service IT Gadget", company: "Central Retail Corp (Power Buy)", period: "Part-time", desc: "Assisted customers with IT products/gadgets inquiries and managed inventory.", icon: Cpu, color: "red" },
        { role: "Call Center", company: "True Corporation", period: "2022", desc: "Provided customer support, handled inquiries, and informed about products and promotions.", icon: Phone, color: "green" }
      ]
    },
    skills: { title: "SKILLS", subtitle: "Click on badges for more details", design: "Creative & Media Tools", dev: "General IT Support", tools: "Automation & Data" },
    portfolio: { title: "PROJECTS", subtitle: "Design and development showcase (Click for details)" },
    media: { title: "CREATIVE STUDIO", subtitle: "Video, Music, and Graphics collection" },
    bots: {
      title: "AUTOMATION & CHATBOTS",
      subtitle: "LINE API and AppSheet projects",
      bot1: { name: "File Saver Bot", desc: "Automatically saves files from LINE chat to Google Drive and returns a link, preventing file expiration.", tags: ["LINE API", "Google Drive API", "Cloud Functions"] },
      bot2: { name: "Smart Planner Assistant", desc: "Task planning assistant that syncs with Google Calendar and summarizes work in Google Sheets for KPI analysis.", tags: ["Task Management", "Calendar API", "Sheets API", "Data Analysis"], qrCode: "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=https://line.me/R/ti/p/@745rnmvz", qrLabel: "LINE ID: @745rnmvz" }
    },
    ai: {
      title: "AI LAB: MANUS INTEGRATION",
      subtitle: "Consult with me! Describe a repetitive task, and AI will suggest an automation solution.",
      placeholder: "e.g., I want to track employee leave, send daily sales summaries to LINE...",
      button: "GENERATE AI SOLUTION",
      loading: "ANALYZING SOLUTION...",
      resultTitle: "KAMPHON'S AI SUGGESTION:",
      manusTitle: "POWERED BY MANUS AI",
      manusDesc: "This project is built and managed using Manus AI (Autonomous AI Agent) to enhance workflow automation."
    },
    footer: { text: "© 2026 KAMPHON PRAYOONHAN. OVER THE FRONTIER / INTO THE FRONT." }
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
  <div className="mb-16 text-left border-l-4 border-orange-600 pl-6">
    <div className="flex items-center gap-2 text-orange-600 text-xs font-black tracking-[0.3em] mb-2">
      <div className="w-2 h-2 bg-orange-600 rotate-45" />
      {title}
    </div>
    <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-4 uppercase">
      {title}
    </h2>
    {subtitle && <p className="text-gray-500 dark:text-gray-400 max-w-2xl font-medium">{subtitle}</p>}
  </div>
);

const SkillBadge = ({ icon: Icon, label, onClick }) => (
  <button 
    onClick={onClick}
    className="group relative flex items-center gap-3 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/10 px-6 py-3 rounded-none hover:bg-orange-600 hover:border-orange-600 transition-all cursor-pointer overflow-hidden"
  >
    <div className="absolute top-0 left-0 w-1 h-full bg-orange-600 group-hover:bg-white transition-colors" />
    <Icon size={18} className="text-orange-600 group-hover:text-white transition-colors" />
    <span className="text-sm font-black tracking-widest text-gray-700 dark:text-gray-200 group-hover:text-white transition-colors uppercase">{label}</span>
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
      const prompt = `You are Kamphon, an IT Support and Automation expert. Suggest a solution using AppSheet or LINE API for: ${aiInput}. Keep it concise and professional in ${lang === 'th' ? 'Thai' : 'English'}. Mention that this analysis is powered by Manus AI.`;
      const result = await model.generateContent(prompt);
      setAiResult(result.response.text());
    } catch (error) {
      setAiResult("Error connecting to AI. Please try again later.");
    }
    setIsAiLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] dark:bg-[#0a0a0a] text-gray-900 dark:text-white transition-colors duration-300 font-sans selection:bg-orange-600 selection:text-white">
      {/* Scanline Effect */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] dark:opacity-[0.05] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
      
      {/* Grid Background */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.05] dark:opacity-[0.1] bg-[radial-gradient(#888_1px,transparent_1px)] [background-size:20px_20px]" />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-40 bg-white/90 dark:bg-black/90 backdrop-blur-md border-b-2 border-gray-200 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-orange-600 flex items-center justify-center text-white font-black text-xl">K</div>
            <div className="text-xl font-black tracking-tighter uppercase">
              KAMPHON<span className="text-orange-600">.</span>DEV
            </div>
          </div>
          <div className="hidden md:flex items-center gap-8 text-[10px] font-black tracking-[0.2em] uppercase">
            {Object.entries(t.nav).map(([key, label]) => (
              <a key={key} href={`#${key}`} className="hover:text-orange-600 transition-colors relative group">
                {label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-600 group-hover:w-full transition-all" />
              </a>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => setLang(lang === 'th' ? 'en' : 'th')} className="text-[10px] font-black px-3 py-1 border-2 border-gray-900 dark:border-white hover:bg-orange-600 hover:border-orange-600 hover:text-white transition-all">
              {lang.toUpperCase()}
            </button>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-48 pb-32 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-[2px] bg-orange-600" />
              <div className="text-orange-600 text-xs font-black tracking-[0.4em] uppercase animate-pulse">
                {t.hero.greeting}
              </div>
            </div>
            <h1 className="text-6xl md:text-8xl font-black mb-8 leading-[0.9] tracking-tighter uppercase">
              KAMPHON <br />
              <span className="text-orange-600">
                <TypingText texts={t.hero.roles} />
              </span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-12 max-w-lg leading-relaxed font-medium border-l-2 border-gray-300 dark:border-white/20 pl-6">
              {t.hero.desc}
            </p>
            <div className="flex flex-wrap gap-6">
              <a href="#works" className="group relative px-10 py-5 bg-orange-600 text-white font-black tracking-widest uppercase overflow-hidden">
                <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative z-10 flex items-center gap-3">
                  {t.hero.cta} <ArrowRight size={20} />
                </span>
              </a>
              <div className="flex items-center gap-4 px-8 py-5 bg-white dark:bg-white/5 border-2 border-gray-200 dark:border-white/10">
                <Activity size={20} className="text-orange-600 animate-pulse" />
                <span className="text-[10px] font-black tracking-widest uppercase">{t.hero.latest}: MANUS AI INTEGRATED</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="relative w-full aspect-square border-2 border-gray-200 dark:border-white/10 p-4">
              <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-orange-600 -translate-x-2 -translate-y-2" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-orange-600 translate-x-2 translate-y-2" />
              <div className="w-full h-full bg-gray-200 dark:bg-white/5 relative overflow-hidden group">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000')] bg-cover bg-center opacity-40 group-hover:scale-110 transition-transform duration-1000 grayscale group-hover:grayscale-0" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#f5f5f5] dark:from-[#0a0a0a] via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="text-[10px] font-black tracking-[0.5em] text-orange-600 mb-2">OPERATOR IDENTIFIED</div>
                  <div className="text-2xl font-black tracking-tighter uppercase">KAMPHON PRAYOONHAN</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-6 bg-white dark:bg-white/[0.02]">
        <div className="max-w-7xl mx-auto">
          <SectionTitle title={t.about.title} />
          <div className="grid md:grid-cols-2 gap-16">
            <div className="space-y-12">
              <div className="relative p-10 bg-[#f5f5f5] dark:bg-white/5 border border-gray-200 dark:border-white/10">
                <div className="absolute top-0 right-0 w-16 h-16 bg-orange-600/10 flex items-center justify-center">
                  <User className="text-orange-600" />
                </div>
                <h3 className="text-3xl font-black mb-6 uppercase tracking-tighter">{t.about.name}</h3>
                <div className="flex gap-4 mb-8">
                  <span className="px-4 py-1 bg-orange-600 text-white text-[10px] font-black uppercase tracking-widest">{t.about.age}</span>
                  <span className="px-4 py-1 bg-gray-200 dark:bg-white/10 text-[10px] font-black uppercase tracking-widest">{t.about.education}</span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium">{t.about.text}</p>
              </div>
              <div className="p-10 bg-orange-600 text-white">
                <h3 className="text-xl font-black mb-6 flex items-center gap-3 uppercase tracking-widest"><Smile /> {t.about.personality.title}</h3>
                <p className="mb-8 opacity-90 font-medium leading-relaxed">{t.about.personality.desc}</p>
                <div className="flex flex-wrap gap-3">
                  {t.about.personality.tags.map((tag, i) => (
                    <span key={i} className="px-4 py-2 bg-white/20 text-[10px] font-black uppercase tracking-widest">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className="p-10 bg-gray-900 text-white relative overflow-hidden group border-b-8 border-orange-600">
              <div className="absolute top-0 right-0 p-48 bg-orange-600/10 rounded-full blur-[100px]" />
              <div className="relative z-10">
                <h3 className="text-xl font-black mb-6 flex items-center gap-3 text-orange-500 uppercase tracking-widest"><Zap /> {t.about.workStyle.title}</h3>
                <p className="mb-8 text-gray-300 font-medium leading-relaxed">{t.about.workStyle.desc}</p>
                <div className="flex flex-wrap gap-3">
                  {t.about.workStyle.tags.map((tag, i) => (
                    <span key={i} className="px-4 py-2 bg-orange-600/20 border border-orange-600/30 text-[10px] font-black text-orange-400 uppercase tracking-widest">{tag}</span>
                  ))}
                </div>
                <div className="mt-16 pt-16 border-t border-white/10">
                  <div className="text-[10px] font-black tracking-[0.5em] text-orange-600 mb-4">SYSTEM CORE VALUES</div>
                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <div className="text-3xl font-black mb-1">100%</div>
                      <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest">DETERMINATION</div>
                    </div>
                    <div>
                      <div className="text-3xl font-black mb-1">0.1s</div>
                      <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest">RESPONSE TIME</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="exp" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionTitle title={t.experience.title} subtitle={t.experience.subtitle} />
          <div className="space-y-8">
            {t.experience.items.map((item, i) => (
              <div key={i} className="group relative flex flex-col md:flex-row gap-8 p-10 bg-white dark:bg-white/5 border-2 border-gray-200 dark:border-white/10 hover:border-orange-600 transition-all">
                <div className="absolute top-0 right-0 w-24 h-24 bg-orange-600/5 -z-0" />
                <div className="relative z-10 p-6 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 h-fit">
                  <item.icon className="text-orange-600" size={40} />
                </div>
                <div className="relative z-10 flex-grow">
                  <div className="flex flex-wrap justify-between items-start mb-6">
                    <div>
                      <h3 className="text-2xl font-black mb-2 uppercase tracking-tighter">{item.role}</h3>
                      <p className="text-orange-600 font-black text-sm tracking-widest uppercase">{item.company}</p>
                    </div>
                    <span className="px-6 py-2 bg-gray-900 text-white text-[10px] font-black uppercase tracking-[0.2em]">{item.period}</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-32 px-6 bg-white dark:bg-white/[0.02]">
        <div className="max-w-7xl mx-auto">
          <SectionTitle title={t.skills.title} subtitle={t.skills.subtitle} />
          <div className="grid md:grid-cols-3 gap-12">
            <div className="space-y-8">
              <h3 className="text-xs font-black tracking-[0.4em] text-orange-600 uppercase flex items-center gap-3">
                <Palette size={16} /> {t.skills.design}
              </h3>
              <div className="grid gap-4">
                {["Photoshop", "Illustrator", "Premiere Pro", "CapCut", "Canva"].map(s => (
                  <SkillBadge key={s} icon={Palette} label={s} onClick={() => setActiveSkill({label: s, icon: Palette})} />
                ))}
              </div>
            </div>
            <div className="space-y-8">
              <h3 className="text-xs font-black tracking-[0.4em] text-orange-600 uppercase flex items-center gap-3">
                <Wrench size={16} /> {t.skills.dev}
              </h3>
              <div className="grid gap-4">
                {["Basic Hardware", "Software Setup", "Network Basic", "Basic Server"].map(s => (
                  <SkillBadge key={s} icon={Wrench} label={s} onClick={() => setActiveSkill({label: s, icon: Wrench})} />
                ))}
              </div>
            </div>
            <div className="space-y-8">
              <h3 className="text-xs font-black tracking-[0.4em] text-orange-600 uppercase flex items-center gap-3">
                <Zap size={16} /> {t.skills.tools}
              </h3>
              <div className="grid gap-4">
                {["AppSheet", "LINE API", "Google Workspace", "Automation"].map(s => (
                  <SkillBadge key={s} icon={Zap} label={s} onClick={() => setActiveSkill({label: s, icon: Zap})} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="works" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionTitle title={t.portfolio.title} subtitle={t.portfolio.subtitle} />
          <div className="grid md:grid-cols-3 gap-10">
            {projects.map((project, i) => (
              <div 
                key={i} 
                onClick={() => setActiveProject(project)}
                className="group cursor-pointer bg-white dark:bg-[#111] border-2 border-gray-200 dark:border-white/10 hover:border-orange-600 transition-all overflow-hidden"
              >
                <div className="relative h-48 bg-gray-200 dark:bg-white/5 overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-20`} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Layout size={64} className="text-gray-400 dark:text-white/10 group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="absolute top-4 right-4 p-2 bg-black/50 text-white backdrop-blur-md">
                    <ExternalLink size={16} />
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-black mb-4 uppercase tracking-tighter group-hover:text-orange-600 transition-colors">{project.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-8 font-medium leading-relaxed line-clamp-2">{project.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, j) => (
                      <span key={j} className="text-[9px] font-black uppercase tracking-widest px-3 py-1 bg-gray-100 dark:bg-white/10 border border-gray-200 dark:border-white/10">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Lab Section (Manus Integration) */}
      <section id="ai" className="py-32 px-6 bg-black text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="grid md:grid-cols-5 gap-16 items-center">
            <div className="md:col-span-2 space-y-8">
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-orange-600 text-white text-[10px] font-black tracking-[0.3em] uppercase">
                <Bot size={16} /> {t.ai.manusTitle}
              </div>
              <h2 className="text-5xl font-black tracking-tighter uppercase leading-[0.9]">
                AI AGENT <br />
                <span className="text-orange-600 text-3xl">COLLABORATION</span>
              </h2>
              <p className="text-gray-400 font-medium leading-relaxed">
                {t.ai.manusDesc}
              </p>
              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-center gap-4 p-4 bg-white/5 border border-white/10">
                  <Code className="text-orange-600" />
                  <span className="text-[10px] font-black tracking-widest uppercase">Autonomous Coding</span>
                </div>
                <div className="flex items-center gap-4 p-4 bg-white/5 border border-white/10">
                  <BarChart className="text-orange-600" />
                  <span className="text-[10px] font-black tracking-widest uppercase">Data Analytics</span>
                </div>
                <div className="flex items-center gap-4 p-4 bg-white/5 border border-white/10">
                  <Rocket className="text-orange-600" />
                  <span className="text-[10px] font-black tracking-widest uppercase">Cloud Automation</span>
                </div>
              </div>
            </div>
            <div className="md:col-span-3">
              <div className="bg-[#111] border-2 border-orange-600/50 p-10 relative">
                <div className="absolute -top-1 -left-1 w-4 h-4 bg-orange-600" />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-orange-600" />
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-4 bg-orange-600 text-white"><Brain size={32} /></div>
                  <div>
                    <h3 className="text-2xl font-black uppercase tracking-tighter">{t.ai.title}</h3>
                    <p className="text-gray-500 text-xs font-bold tracking-widest uppercase">{t.ai.subtitle}</p>
                  </div>
                </div>
                <div className="space-y-6">
                  <textarea 
                    value={aiInput}
                    onChange={(e) => setAiInput(e.target.value)}
                    placeholder={t.ai.placeholder}
                    className="w-full h-40 bg-black border-2 border-white/10 p-6 focus:border-orange-600 outline-none transition-all resize-none font-medium text-gray-300"
                  />
                  <button 
                    onClick={handleAiSubmit}
                    disabled={isAiLoading}
                    className="w-full py-5 bg-orange-600 text-white font-black tracking-[0.2em] uppercase hover:bg-orange-700 transition-all flex items-center justify-center gap-4 disabled:opacity-50"
                  >
                    {isAiLoading ? <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" /> : <Sparkles size={20} />}
                    {t.ai.button}
                  </button>
                </div>
                {aiResult && (
                  <div className="mt-10 p-8 bg-orange-600/10 border border-orange-600/30 animate-in fade-in slide-in-from-bottom-4">
                    <h4 className="font-black text-orange-500 mb-4 flex items-center gap-3 text-xs tracking-[0.2em] uppercase"><Bot size={18} /> {t.ai.resultTitle}</h4>
                    <p className="text-gray-300 leading-relaxed whitespace-pre-wrap font-medium">{aiResult}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t-2 border-gray-200 dark:border-white/10 text-center bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center gap-8 mb-12">
            <a href="#" className="group p-4 bg-gray-100 dark:bg-white/5 border border-transparent hover:border-orange-600 transition-all">
              <Code size={24} className="group-hover:text-orange-600 transition-colors" />
            </a>
            <a href="#" className="group p-4 bg-gray-100 dark:bg-white/5 border border-transparent hover:border-orange-600 transition-all">
              <Mail size={24} className="group-hover:text-orange-600 transition-colors" />
            </a>
            <a href="#" className="group p-4 bg-gray-100 dark:bg-white/5 border border-transparent hover:border-orange-600 transition-all">
              <MessageCircle size={24} className="group-hover:text-orange-600 transition-colors" />
            </a>
          </div>
          <div className="text-[10px] font-black tracking-[0.5em] text-gray-400 dark:text-gray-600 uppercase mb-4">
            {t.footer.text}
          </div>
          <div className="flex justify-center items-center gap-4 opacity-30 grayscale">
            <div className="w-8 h-8 bg-orange-600" />
            <div className="w-8 h-8 bg-gray-400" />
            <div className="w-8 h-8 bg-gray-600" />
          </div>
        </div>
      </footer>

      {/* Modals */}
      {activeProject && <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />}
      {activeSkill && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md" onClick={() => setActiveSkill(null)}>
          <div className="bg-white dark:bg-[#111] p-12 rounded-none border-2 border-orange-600 max-w-lg w-full relative" onClick={e => e.stopPropagation()}>
            <div className="absolute -top-1 -left-1 w-4 h-4 bg-orange-600" />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-orange-600" />
            <button onClick={() => setActiveSkill(null)} className="absolute top-6 right-6 text-gray-400 hover:text-orange-600 transition-colors"><X size={32} /></button>
            <div className="flex items-center gap-6 mb-10">
              <div className="p-6 bg-orange-600/10 border border-orange-600/20 text-orange-600"><activeSkill.icon size={48} /></div>
              <h3 className="text-4xl font-black uppercase tracking-tighter">{activeSkill.label}</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-10 text-lg font-medium leading-relaxed">{skillDetails[activeSkill.label]?.desc}</p>
            <div className="flex flex-wrap gap-3">
              {skillDetails[activeSkill.label]?.connect.map(c => (
                <span key={c} className="px-4 py-2 bg-orange-600/10 text-orange-600 border border-orange-600/20 text-[10px] font-black uppercase tracking-widest">{c}</span>
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
