import React, { useState, useEffect, useMemo } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { 
  Terminal, Layout, Bot, FileText, Calendar, BarChart, Globe, Code, Mail, MessageCircle,
  Phone, ChevronRight, Cpu, Zap, Layers, ExternalLink, Wrench, Star, TrendingUp, Award,
  DollarSign, Video, Clock, Briefcase, Utensils, Flame, Cat, ScanLine, X, Sparkles,
  MessageSquare, ArrowRight, Play, Music, Film, Folder, Palette, MapPin, GraduationCap,
  User, Share2, Brain, Lightbulb, Smile, Check, Sun, Moon, Shield, Activity, Database,
  Search, Settings, Layers2, Monitor, Smartphone, Laptop, Server, HardDrive, Wifi,
  MousePointer2, Keyboard, Command, Box, Package, Layers3, Rocket, Info, AlertCircle,
  Workflow, GitBranch, Cloud, Link
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
      manusTitle: "POWERED BY MANUS AI (AUTONOMOUS AGENT)",
      manusDesc: "โปรเจกต์นี้ถูกสร้างและจัดการโดยใช้ Manus AI เพื่อเพิ่มประสิทธิภาพในการทำงานแบบอัตโนมัติ",
      collaborationTitle: "AI AGENT COLLABORATION WORKFLOW",
      collaborationDesc: "แสดงขั้นตอนการทำงานร่วมกับ AI Agent ในการแก้ปัญหาและพัฒนาโปรเจกต์"
    },
    hobbies: {
      title: "HOBBIES & ACHIEVEMENTS",
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
      manusTitle: "POWERED BY MANUS AI (AUTONOMOUS AGENT)",
      manusDesc: "This project is built and managed using Manus AI to enhance workflow automation.",
      collaborationTitle: "AI AGENT COLLABORATION WORKFLOW",
      collaborationDesc: "Visualizing the collaboration between human and AI Agent in project development."
    },
    hobbies: {
      title: "HOBBIES & ACHIEVEMENTS",
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
    footer: { text: "© 2026 KAMPHON PRAYOONHAN. OVER THE FRONTIER / INTO THE FRONT." }
  }
};

const webProjects = [
  {
    title: "Prime x Legal",
    desc: "เว็บไซต์ที่ปรึกษากฎหมายและธุรกิจ ดีไซน์เรียบหรู น่าเชื่อถือ (Professional Consulting Platform)",
    url: "https://kamphon203.wixsite.com/prime-x-legal",
    tags: ["Wix", "Business", "Legal Consulting"],
    color: "from-amber-500 to-orange-600",
    featured: true,
    problem: "ธุรกิจที่ปรึกษากฎหมายต้องการความน่าเชื่อถือสูง แต่เว็บไซต์เดิมดูไม่ทันสมัยและเข้าถึงยาก",
    solution: "ออกแบบใหม่โดยเน้นความ Minimalist และใช้โทนสีที่ดูเป็นมืออาชีพ พร้อมระบบจองคิวปรึกษา",
    result: "เพิ่มความน่าเชื่อถือและยอดผู้ติดต่อสอบถามผ่านเว็บไซต์ขึ้น 40%"
  },
  {
    title: "Canva Design Portfolio",
    desc: "รวมผลงานการออกแบบกราฟิกและพรีเซนเทชั่นด้วย Canva ดีไซน์ทันสมัย สื่อสารชัดเจน",
    url: "https://prime-property-group.my.canva.site/prime-property-group-co-ltd",
    tags: ["Canva", "Graphic Design", "Presentation"],
    color: "from-purple-600 to-pink-500",
    featured: true,
    problem: "การนำเสนอผลงานอสังหาริมทรัพย์แบบเดิมดูน่าเบื่อและไม่ดึงดูดใจลูกค้า",
    solution: "ใช้ Canva สร้างสื่อที่เน้น Visual Impact และการเล่าเรื่อง (Storytelling) ผ่านกราฟิก",
    result: "ได้รับคำชมจากลูกค้าและช่วยให้ปิดการขายได้รวดเร็วขึ้น"
  },
  {
    title: "The Best",
    desc: "Modern corporate identity website presentation.",
    url: "https://pggitdev.github.io/ppg-files/thebest.html",
    tags: ["HTML", "CSS", "Animation"],
    color: "from-purple-500 to-indigo-500",
    problem: "ต้องการหน้าเว็บนำเสนอตัวตนของแบรนด์ที่ดูทันสมัยและมีลูกเล่น",
    solution: "พัฒนาด้วย HTML/CSS และใส่ Animation เพื่อเพิ่มความน่าสนใจ",
    result: "เป็นต้นแบบในการพัฒนาเว็บไซต์บริษัทในเครือ"
  },
  {
    title: "Puri Portfolio",
    desc: "Personal portfolio showcasing character and style.",
    url: "https://pggitdev.github.io/ppg-files/Puri.html",
    tags: ["Design", "Responsive", "Portfolio"],
    color: "from-blue-500 to-cyan-500",
    problem: "ต้องการพื้นที่แสดงผลงานส่วนตัวที่สะท้อนสไตล์เฉพาะตัว",
    solution: "ออกแบบ Layout ที่เน้นความสะอาดตาและรองรับการแสดงผลทุกหน้าจอ",
    result: "ใช้เป็นหน้าแนะนำตัวในการติดต่อประสานงานโปรเจกต์ต่างๆ"
  },
  {
    title: "Sense Saimai 56",
    desc: "Real estate or location showcase project.",
    url: "https://pggitdev.github.io/ppg-files/sensesaimai56.html",
    tags: ["UI/UX", "Gallery", "Layout"],
    color: "from-emerald-500 to-teal-500",
    problem: "การแสดงข้อมูลโครงการหมู่บ้านจัดสรรต้องการความชัดเจนและเห็นภาพรวม",
    solution: "ทำ Gallery และ Layout ที่แบ่งสัดส่วนข้อมูลโครงการให้เข้าใจง่าย",
    result: "ช่วยให้ลูกค้าตัดสินใจเข้าชมโครงการจริงได้ง่ายขึ้น"
  },
  {
    title: "Project 4.1",
    desc: "Experimental design and functional layout.",
    url: "https://pggitdev.github.io/ppg-files/4.1.html",
    tags: ["Experimental", "Web Tech"],
    color: "from-orange-500 to-red-500",
    problem: "ทดลองการจัดวาง Layout แบบใหม่ๆ ที่นอกเหนือจากมาตรฐานทั่วไป",
    solution: "ใช้เทคนิค CSS Grid และ Flexbox ขั้นสูงในการจัดวางองค์ประกอบ",
    result: "ได้เรียนรู้เทคนิคใหม่ๆ มาปรับใช้กับงานจริง"
  }
];

const skillDetails = {
  "Photoshop": { desc: "ออกแบบกราฟิกขั้นสูง ตกแต่งภาพ และสร้างสื่อโฆษณา (Graphic Design & Photo Manipulation)", connect: ["Print Media", "Social Media", "Web Assets"] },
  "Illustrator": { desc: "สร้าง Vector Graphics, Logo และงานออกแบบที่ต้องการความคมชัดสูง (Vector Design & Branding)", connect: ["Branding", "Iconography", "Typography"] },
  "Premiere Pro": { desc: "ตัดต่อวิดีโอระดับมืออาชีพ ใส่เอฟเฟกต์ และจัดการเสียง (Professional Video Editing)", connect: ["YouTube", "Corporate Video", "Marketing Content"] },
  "CapCut": { desc: "ตัดต่อวิดีโอสั้น (Short-form) สำหรับ Social Media ใส่เอฟเฟกต์และเสียงประกอบได้อย่างรวดเร็ว", connect: ["TikTok", "Instagram Reels", "YouTube Shorts", "Facebook"] },
  "Canva": { desc: "ออกแบบกราฟิก พรีเซนเทชั่น และสื่อโฆษณาต่างๆ ได้อย่างสวยงามและรวดเร็ว", connect: ["Social Media", "Print Media", "Websites", "Brand Identity"] },
  "Hardware/Network": { desc: "ติดตั้ง ดูแลรักษา และแก้ไขปัญหาอุปกรณ์คอมพิวเตอร์และระบบเครือข่ายพื้นฐาน (LAN/WiFi)", connect: ["Printers", "Routers", "Servers", "Office Devices"] },
  "Printer Setup": { desc: "ติดตั้งไดรเวอร์ แก้ไขปัญหากระดาษติด และตั้งค่าการพิมพ์ผ่านเครือข่าย", connect: ["Network Sharing", "Scan to Email", "Maintenance"] },
  "Microsoft Office": { desc: "จัดการงานเอกสาร (Word), การนำเสนอ (PowerPoint) และคำนวณข้อมูล (Excel) อย่างมืออาชีพ", connect: ["OneDrive", "Outlook", "Teams", "SharePoint"] },
  "Wordpress": { desc: "ดูแลและอัปเดตเนื้อหาเว็บไซต์ ปรับแต่งธีมและปลั๊กอินพื้นฐาน", connect: ["WooCommerce", "SEO Tools", "Google Analytics"] },
  "LINE OA & API": { desc: "จัดการบัญชี LINE Official Account, สร้าง Rich Menu และเชื่อมต่อ API เพื่อทำระบบอัตโนมัติ", connect: ["Flex Message", "Webhooks", "Chatbots", "CRM"] },
  "AppSheet": { desc: "พัฒนาแอปพลิเคชันสำหรับองค์กรแบบ No-Code เพื่อจัดการข้อมูลและ Workflow", connect: ["Google Sheets", "Google Calendar", "Email Automation", "PDF Generation"] },
  "Data Analysis": { desc: "รวบรวมและวิเคราะห์ข้อมูลเพื่อหาแนวโน้มและสรุปผลเพื่อการตัดสินใจ", connect: ["Google Looker Studio", "Excel Pivot Tables", "Business Reports"] },
  "Manus AI": { desc: "ใช้งาน Autonomous AI Agent ในการช่วยเขียนโค้ด, วิเคราะห์ข้อมูล และจัดการระบบอัตโนมัติ", connect: ["GitHub", "Cloudflare", "SimilarWeb", "Automation"] },
  "Gemini API": { desc: "เชื่อมต่อ AI Model ระดับสูงเพื่อสร้างระบบโต้ตอบและวิเคราะห์ข้อมูลอัจฉริยะ", connect: ["Chatbots", "Content Generation", "Data Processing"] }
};

const mediaItems = [
  { title: "My Creative Assets Folder", type: "folder", url: "https://drive.google.com/drive/folders/1uSlSHdOXbweXo0U8FxoGYkyBEkOnWoT2?usp=sharing", icon: Folder, color: "text-blue-400" },
  { title: "Short Clip Showcase 1", type: "video", url: "https://drive.google.com/file/d/1MTxCRRwX0IpQMfCXEK50A_ml32mVRnds/view?usp=sharing", icon: Film, color: "text-pink-400" },
  { title: "Short Clip Showcase 2", type: "video", url: "https://drive.google.com/file/d/14vRG2JB0gA7CNiw8Kq0ZZ80chWsx1li7/view?usp=sharing", icon: Film, color: "text-pink-400" },
  { title: "Short Clip Showcase 3", type: "video", url: "https://drive.google.com/file/d/1b4BsMabp4SFESSE0oygtX04QWHH3gu9w/view?usp=sharing", icon: Film, color: "text-pink-400" },
  { title: "AI Generated Music", type: "audio", url: "https://drive.google.com/file/d/16hruUsp0ooJEf_dNPEEHPMNBtb5M7Ji/view?usp=sharing", icon: Music, color: "text-green-400" }
];

// --- COMPONENTS ---

const Typewriter = ({ texts, speed = 100, pause = 2000 }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    if (index >= texts.length) { setIndex(0); return; }
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

const SectionTitle = ({ title, subtitle }) => (
  <div className="mb-12 text-center">
    <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 mb-4 tracking-widest">
      {title}
    </h2>
    {subtitle && <p className="text-gray-400 max-w-2xl mx-auto mb-4 font-light uppercase tracking-widest text-xs">{subtitle}</p>}
    <div className="w-24 h-1 bg-orange-500 mx-auto mt-4 rounded-full"></div>
  </div>
);

const SkillBadge = ({ icon: Icon, label, onClick }) => (
  <button 
    onClick={onClick}
    className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-sm hover:bg-orange-500/20 transition-all cursor-pointer hover:scale-105 transform duration-200 hover:border-orange-500/50"
  >
    <Icon size={18} className="text-orange-400" />
    <span className="text-sm font-medium text-gray-200">{label}</span>
  </button>
);

const SkillModal = ({ skill, onClose }) => {
  if (!skill) return null;
  const details = skillDetails[skill.label] || { desc: "เครื่องมือที่ช่วยเพิ่มประสิทธิภาพการทำงาน", connect: ["General Use"] };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-gray-900 border border-orange-500/30 rounded-sm p-8 max-w-md w-full relative shadow-[0_0_50px_rgba(249,115,22,0.2)]" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white"><X size={24} /></button>
        <div className="flex items-center gap-4 mb-6">
          <div className="p-4 bg-orange-500/20 rounded-sm border border-orange-500/30"><skill.icon size={40} className="text-orange-400" /></div>
          <h3 className="text-2xl font-bold text-white tracking-widest">{skill.label}</h3>
        </div>
        <div className="space-y-6">
          <div>
            <h4 className="text-orange-400 text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2"><Zap size={14} /> CAPABILITIES</h4>
            <p className="text-gray-300 text-sm leading-relaxed border-l-2 border-orange-500/30 pl-3">{details.desc}</p>
          </div>
          <div>
            <h4 className="text-blue-400 text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2"><Share2 size={14} /> INTEGRATIONS</h4>
            <div className="flex flex-wrap gap-2">
              {details.connect.map((item, i) => (
                <span key={i} className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-300 text-xs font-medium">{item}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ExperienceTimeline = ({ items }) => (
  <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-700 before:to-transparent">
    {items.map((item, index) => (
      <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
        <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-gray-900 text-gray-400 group-hover:border-orange-500 group-hover:text-orange-500 transition-all duration-500 z-10 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
          <item.icon size={20} />
        </div>
        <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-gray-900/50 p-6 rounded-sm border border-white/5 hover:border-orange-500/30 transition-all duration-300">
          <div className="flex items-center justify-between space-x-2 mb-1">
            <div className="font-bold text-white text-lg">{item.role}</div>
            <time className="font-mono text-xs text-orange-500 font-bold">{item.period}</time>
          </div>
          <div className="text-gray-400 text-sm font-medium mb-2">{item.company}</div>
          <div className="text-gray-500 text-sm leading-relaxed">{item.desc}</div>
        </div>
      </div>
    ))}
  </div>
);

const AppContent = () => {
  const { isDark } = useTheme();
  const [lang, setLang] = useState('th');
  const [activeProject, setActiveProject] = useState(null);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [aiInput, setAiInput] = useState("");
  const [aiResult, setAiResult] = useState("");
  const [isAiLoading, setIsAiLoading] = useState(false);

  const t = content[lang];

  const handleAiSubmit = async (e) => {
    e.preventDefault();
    if (!aiInput.trim() || !genAI) return;
    setIsAiLoading(true);
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = `You are Kamphon, an AI Automation Architect. Suggest a solution using AppSheet or LINE API for this task: ${aiInput}. Keep it concise and professional in ${lang === 'th' ? 'Thai' : 'English'}.`;
      const result = await model.generateContent(prompt);
      setAiResult(result.response.text());
    } catch (error) {
      setAiResult("Error generating solution. Please try again.");
    }
    setIsAiLoading(false);
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 ${isDark ? 'bg-[#0a0a0a] text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Grid Background */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05]" 
           style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-xl border-b border-white/5">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-orange-500 rounded-sm flex items-center justify-center font-bold text-black">K</div>
            <span className="font-bold tracking-widest text-lg hidden md:block">KAMPHON.SYS</span>
          </div>
          <div className="flex items-center gap-6">
            <div className="hidden lg:flex gap-6 text-[10px] font-bold tracking-widest text-gray-400">
              {Object.entries(t.nav).map(([key, val]) => (
                <a key={key} href={`#${key}`} className="hover:text-orange-500 transition-colors">{val}</a>
              ))}
            </div>
            <div className="flex items-center gap-3 border-l border-white/10 pl-6">
              <ThemeToggle />
              <button onClick={() => setLang(lang === 'th' ? 'en' : 'th')} className="text-xs font-bold hover:text-orange-500 transition-colors">
                {lang === 'th' ? 'EN' : 'TH'}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative z-10 pt-40 pb-20 md:pt-60 md:pb-32 px-6 container mx-auto text-center">
        <div className="inline-block mb-4 px-4 py-1.5 rounded-sm bg-orange-500/10 border border-orange-500/20 text-orange-400 text-[10px] font-bold tracking-widest animate-pulse">
          {t.hero.greeting}
        </div>
        <h1 className="text-5xl md:text-8xl font-bold mb-6 tracking-tighter">
          KAMPHON <span className="text-orange-500">P.</span>
        </h1>
        <div className="text-lg md:text-2xl text-gray-400 h-10 mb-8 font-light tracking-widest uppercase">
          <Typewriter texts={t.hero.roles} />
        </div>
        <p className="text-gray-500 max-w-2xl mx-auto mb-12 leading-relaxed font-light">
          {t.hero.desc}
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-4 items-center">
          <a href="#works" className="px-10 py-4 bg-orange-500 text-black font-bold rounded-sm hover:bg-orange-400 transition-all flex items-center justify-center gap-2 tracking-widest text-xs">
            <Layers size={18} /> {t.hero.cta}
          </a>
          <a href="#contact" className="px-10 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-sm hover:bg-white/10 transition-all flex items-center justify-center gap-2 tracking-widest text-xs">
            <Mail size={18} /> {t.nav.contact}
          </a>
        </div>
      </header>

      {/* Profile Section */}
      <section id="about" className="relative z-10 py-24 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-10">
              <div>
                <h3 className="text-xs font-bold text-orange-500 tracking-[0.3em] mb-8 flex items-center gap-3">
                  <User size={16} /> {t.about.title}
                </h3>
                <div className="bg-gray-900/30 p-8 rounded-sm border border-white/5 space-y-6">
                  <div className="flex items-start gap-4">
                    <User size={20} className="text-gray-500 mt-1" />
                    <div><span className="text-[10px] text-gray-500 block uppercase tracking-widest mb-1">Name</span><span className="text-white font-medium">{t.about.name}</span></div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Calendar size={20} className="text-gray-500 mt-1" />
                    <div><span className="text-[10px] text-gray-500 block uppercase tracking-widest mb-1">Age</span><span className="text-white font-medium">{t.about.age}</span></div>
                  </div>
                  <div className="flex items-start gap-4">
                    <GraduationCap size={20} className="text-gray-500 mt-1" />
                    <div><span className="text-[10px] text-gray-500 block uppercase tracking-widest mb-1">Education</span><span className="text-white font-medium">{t.about.education}</span></div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-900/20 p-8 rounded-sm border border-white/5">
                <p className="text-gray-400 leading-relaxed italic mb-8 font-light">"{t.about.text}"</p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white/5 p-6 rounded-sm border border-white/5">
                    <h4 className="text-orange-400 text-[10px] font-bold uppercase mb-4 flex items-center gap-2"><Smile size={14} /> {t.about.personality.title}</h4>
                    <p className="text-gray-500 text-xs leading-relaxed mb-4">{t.about.personality.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {t.about.personality.tags.map((tag, i) => (
                        <span key={i} className="text-[9px] px-2 py-1 bg-orange-500/10 text-orange-300 rounded-sm border border-orange-500/20 uppercase tracking-tighter">{tag}</span>
                      ))}
                    </div>
                  </div>
                  <div className="bg-white/5 p-6 rounded-sm border border-white/5">
                    <h4 className="text-blue-400 text-[10px] font-bold uppercase mb-4 flex items-center gap-2"><Lightbulb size={14} /> {t.about.workStyle.title}</h4>
                    <p className="text-gray-500 text-xs leading-relaxed mb-4">{t.about.workStyle.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {t.about.workStyle.tags.map((tag, i) => (
                        <span key={i} className="text-[9px] px-2 py-1 bg-blue-500/10 text-blue-300 rounded-sm border border-blue-500/20 uppercase tracking-tighter">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-900/30 p-8 rounded-sm border border-white/5 h-full">
              <div className="flex justify-between items-center mb-10">
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-[0.3em] flex items-center gap-2"><Terminal size={16} /> {t.skills.title}</h4>
                <span className="text-[9px] text-orange-400 bg-orange-900/30 px-3 py-1 rounded-sm border border-orange-500/30 uppercase tracking-widest">{t.skills.subtitle}</span>
              </div>
              <div className="space-y-10">
                <div>
                  <span className="text-[10px] text-orange-400 mb-4 block uppercase tracking-[0.2em] font-bold">{t.skills.design}</span>
                  <div className="flex flex-wrap gap-3">
                    <SkillBadge icon={Layers} label="Photoshop" onClick={() => setSelectedSkill({icon: Layers, label: "Photoshop"})} />
                    <SkillBadge icon={Palette} label="Illustrator" onClick={() => setSelectedSkill({icon: Palette, label: "Illustrator"})} />
                    <SkillBadge icon={Video} label="Premiere Pro" onClick={() => setSelectedSkill({icon: Video, label: "Premiere Pro"})} />
                    <SkillBadge icon={Play} label="CapCut" onClick={() => setSelectedSkill({icon: Play, label: "CapCut"})} />
                    <SkillBadge icon={Globe} label="Canva" onClick={() => setSelectedSkill({icon: Globe, label: "Canva"})} />
                  </div>
                </div>
                <div>
                  <span className="text-[10px] text-blue-400 mb-4 block uppercase tracking-[0.2em] font-bold">{t.skills.dev}</span>
                  <div className="flex flex-wrap gap-3">
                    <SkillBadge icon={Wrench} label="Hardware/Network" onClick={() => setSelectedSkill({icon: Wrench, label: "Hardware/Network"})} />
                    <SkillBadge icon={Cpu} label="Printer Setup" onClick={() => setSelectedSkill({icon: Cpu, label: "Printer Setup"})} />
                    <SkillBadge icon={FileText} label="Microsoft Office" onClick={() => setSelectedSkill({icon: FileText, label: "Microsoft Office"})} />
                    <SkillBadge icon={Globe} label="Wordpress" onClick={() => setSelectedSkill({icon: Globe, label: "Wordpress"})} />
                  </div>
                </div>
                <div>
                  <span className="text-[10px] text-green-400 mb-4 block uppercase tracking-[0.2em] font-bold">{t.skills.tools}</span>
                  <div className="flex flex-wrap gap-3">
                    <SkillBadge icon={Bot} label="LINE OA & API" onClick={() => setSelectedSkill({icon: Bot, label: "LINE OA & API"})} />
                    <SkillBadge icon={Calendar} label="AppSheet" onClick={() => setSelectedSkill({icon: Calendar, label: "AppSheet"})} />
                    <SkillBadge icon={BarChart} label="Data Analysis" onClick={() => setSelectedSkill({icon: BarChart, label: "Data Analysis"})} />
                    <SkillBadge icon={Brain} label="Manus AI" onClick={() => setSelectedSkill({icon: Brain, label: "Manus AI"})} />
                    <SkillBadge icon={Sparkles} label="Gemini API" onClick={() => setSelectedSkill({icon: Sparkles, label: "Gemini API"})} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section id="exp" className="py-24 bg-black/20">
        <div className="container mx-auto px-6">
          <SectionTitle title={t.experience.title} subtitle={t.experience.subtitle} />
          <div className="max-w-4xl mx-auto"><ExperienceTimeline items={t.experience.items} /></div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="works" className="py-24 container mx-auto px-6">
        <SectionTitle title={t.portfolio.title} subtitle={t.portfolio.subtitle} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {webProjects.map((project, index) => (
            <div key={index} onClick={() => setActiveProject(project)} className="group relative bg-gray-900/50 border border-white/5 rounded-sm overflow-hidden hover:border-orange-500/50 transition-all duration-500 cursor-pointer">
              <div className={`h-1 bg-gradient-to-r ${project.color}`} />
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-white/5 rounded-sm group-hover:bg-orange-500/20 transition-colors"><Layout size={24} className="text-gray-400 group-hover:text-orange-400" /></div>
                  <ExternalLink size={18} className="text-gray-600 group-hover:text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 tracking-widest group-hover:text-orange-400 transition-colors">{project.title}</h3>
                <p className="text-gray-500 text-sm mb-6 line-clamp-2 font-light">{project.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="text-[9px] px-2 py-1 bg-white/5 text-gray-400 border border-white/5 uppercase tracking-tighter">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Media Section */}
      <section id="media" className="py-24 bg-gray-900/30 border-y border-white/5">
        <div className="container mx-auto px-6">
          <SectionTitle title={t.media.title} subtitle={t.media.subtitle} />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {mediaItems.map((item, index) => (
              <a key={index} href={item.url} target="_blank" rel="noopener noreferrer" className="bg-gray-900/50 border border-white/5 p-8 rounded-sm text-center group hover:border-blue-500/50 transition-all">
                <div className="mb-4 flex justify-center"><item.icon size={32} className={`${item.color} group-hover:scale-110 transition-transform`} /></div>
                <h3 className="text-xs font-bold text-white mb-2 tracking-widest uppercase">{item.title}</h3>
                <span className="text-[9px] text-gray-600 uppercase tracking-widest">{item.type}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* AI Lab Section */}
      <section id="ai" className="py-24 container mx-auto px-6">
        <SectionTitle title={t.ai.title} subtitle={t.ai.subtitle} />
        
        <div className="grid lg:grid-cols-2 gap-12">
          {/* AI Collaboration Visual UI */}
          <div className="bg-gray-900/50 border border-orange-500/20 rounded-sm p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-20 bg-orange-500/5 blur-3xl rounded-full"></div>
            <h3 className="text-xs font-bold text-orange-500 tracking-[0.3em] mb-8 flex items-center gap-2">
              <Workflow size={16} /> {t.ai.collaborationTitle}
            </h3>
            <p className="text-gray-500 text-xs mb-10 font-light">{t.ai.collaborationDesc}</p>
            
            <div className="space-y-8 relative">
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 bg-blue-500/20 rounded-sm border border-blue-500/30 flex items-center justify-center text-blue-400"><User size={24} /></div>
                <div className="flex-grow h-px bg-gradient-to-r from-blue-500/50 to-orange-500/50 relative">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 py-1 bg-gray-900 border border-white/10 text-[8px] text-gray-400 uppercase tracking-widest">Natural Language</div>
                </div>
                <div className="w-12 h-12 bg-orange-500/20 rounded-sm border border-orange-500/30 flex items-center justify-center text-orange-400 animate-pulse"><Brain size={24} /></div>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white/5 p-4 rounded-sm border border-white/5 text-center group hover:border-orange-500/30 transition-all">
                  <Github size={20} className="mx-auto mb-2 text-gray-400 group-hover:text-white" />
                  <span className="text-[8px] text-gray-500 uppercase tracking-widest">GitHub</span>
                </div>
                <div className="bg-white/5 p-4 rounded-sm border border-white/5 text-center group hover:border-orange-500/30 transition-all">
                  <Cloud size={20} className="mx-auto mb-2 text-gray-400 group-hover:text-white" />
                  <span className="text-[8px] text-gray-500 uppercase tracking-widest">Cloudflare</span>
                </div>
                <div className="bg-white/5 p-4 rounded-sm border border-white/5 text-center group hover:border-orange-500/30 transition-all">
                  <Database size={20} className="mx-auto mb-2 text-gray-400 group-hover:text-white" />
                  <span className="text-[8px] text-gray-500 uppercase tracking-widest">SimilarWeb</span>
                </div>
              </div>

              <div className="bg-orange-500/5 border border-orange-500/20 p-6 rounded-sm">
                <h4 className="text-[10px] font-bold text-orange-400 mb-4 uppercase tracking-widest flex items-center gap-2"><Zap size={14} /> {t.ai.manusTitle}</h4>
                <p className="text-gray-400 text-xs leading-relaxed font-light">{t.ai.manusDesc}</p>
              </div>
            </div>
          </div>

          {/* AI Interaction */}
          <div className="bg-gray-900/30 border border-white/5 rounded-sm p-8">
            <form onSubmit={handleAiSubmit} className="space-y-6">
              <textarea 
                value={aiInput}
                onChange={(e) => setAiInput(e.target.value)}
                placeholder={t.ai.placeholder}
                className="w-full h-40 bg-black/50 border border-white/10 rounded-sm p-6 text-sm text-white focus:border-orange-500/50 outline-none transition-all resize-none font-light"
              />
              <button 
                type="submit" 
                disabled={isAiLoading}
                className="w-full py-4 bg-orange-500 text-black font-bold rounded-sm hover:bg-orange-400 transition-all flex items-center justify-center gap-3 tracking-widest text-xs disabled:opacity-50"
              >
                {isAiLoading ? <Clock className="animate-spin" size={18} /> : <Sparkles size={18} />}
                {isAiLoading ? t.ai.loading : t.ai.button}
              </button>
            </form>
            {aiResult && (
              <div className="mt-8 p-6 bg-white/5 border border-orange-500/20 rounded-sm animate-in fade-in slide-in-from-bottom-4">
                <h4 className="text-orange-400 text-[10px] font-bold uppercase mb-4 tracking-widest">{t.ai.resultTitle}</h4>
                <p className="text-gray-300 text-sm leading-relaxed font-light whitespace-pre-wrap">{aiResult}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Hobbies Section */}
      <section id="hobbies" className="py-24 bg-black/20 border-t border-white/5">
        <div className="container mx-auto px-6">
          <SectionTitle title={t.hobbies.title} subtitle={t.hobbies.subtitle} />
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {t.hobbies.items.map((hobby, index) => (
              <div key={index} className="bg-gray-900/50 border border-white/5 rounded-sm overflow-hidden group hover:border-orange-500/30 transition-all">
                <div className="h-48 overflow-hidden relative">
                  <img src={hobby.img} alt={hobby.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-60" />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
                  <div className="absolute bottom-6 left-8">
                    <div className="p-3 bg-orange-500/20 rounded-sm border border-orange-500/30 inline-block mb-3"><hobby.icon size={24} className="text-orange-400" /></div>
                    <h3 className="text-xl font-bold text-white tracking-widest">{hobby.title}</h3>
                  </div>
                </div>
                <div className="p-8">
                  <span className="text-[10px] text-orange-500 font-bold uppercase tracking-widest mb-2 block">{hobby.role}</span>
                  <p className="text-gray-500 text-sm mb-6 font-light leading-relaxed">{hobby.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {hobby.tags.map((tag, i) => (
                      <span key={i} className="text-[9px] px-2 py-1 bg-white/5 text-gray-400 border border-white/5 uppercase tracking-tighter">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 text-center">
        <div className="container mx-auto px-6">
          <div className="flex justify-center gap-6 mb-8">
            <a href="https://github.com/Safeiooi" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors"><Github size={20} /></a>
            <a href="mailto:kamphon203@gmail.com" className="text-gray-500 hover:text-white transition-colors"><Mail size={20} /></a>
            <a href="tel:0956631135" className="text-gray-500 hover:text-white transition-colors"><Phone size={20} /></a>
          </div>
          <p className="text-[10px] text-gray-600 uppercase tracking-[0.4em] font-bold">{t.footer.text}</p>
        </div>
      </footer>

      {/* Modals */}
      {activeProject && <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />}
      {selectedSkill && <SkillModal skill={selectedSkill} onClose={() => setSelectedSkill(null)} />}
    </div>
  );
};

const App = () => (
  <ThemeProvider>
    <AppContent />
  </ThemeProvider>
);

export default App;
