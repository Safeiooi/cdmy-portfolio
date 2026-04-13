import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  Database,
  LineChart,
  Settings,
  ShieldCheck,
  Smartphone
} from 'lucide-react';
import { FaFacebook, FaGithub, FaLine, FaGoogleDrive, FaCloudflare } from 'react-icons/fa';
import { SiCanva, SiGooglesheets } from 'react-icons/si';

// --- DATA & TRANSLATIONS ---
const content = {
  th: {
    nav: {
      about: "เกี่ยวกับ",
      exp: "ประสบการณ์",
      skills: "ทักษะ",
      works: "ผลงาน",
      media: "สื่อสร้างสรรค์",
      ai: "AI Showcase",
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
      subtitle: "เครื่องมือและเทคโนโลยีที่เชี่ยวชาญ",
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
      subtitle: "คลังผลงานวิดีโอ เพลง และกราฟิก",
    },
    aiShowcase: {
      title: "AI Agent Visual Showcase",
      subtitle: "การเชื่อมต่อ Manus AI กับเครื่องมือต่างๆ เพื่อเพิ่มประสิทธิภาพการทำงาน",
      desc: "แสดงให้เห็นว่า AI Agent สามารถทำงานร่วมกับแอปพลิเคชันที่คุณใช้ทุกวันได้อย่างไร"
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
          role: "Amateur Cook",
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
          desc: "Provided customer support, handled inquiries, and informed customers about products and promotions.",
          icon: Phone,
          color: "green"
        }
      ]
    },
    skills: {
      title: "Skills & Expertise",
      subtitle: "Tools and technologies I use",
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
      subtitle: "Video, Music, and Graphic gallery",
    },
    aiShowcase: {
      title: "AI Agent Visual Showcase",
      subtitle: "Connecting Manus AI with various tools to maximize efficiency",
      desc: "Showing how AI Agents can work with the apps you use every day."
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

const projects = [
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
    color: "from-purple-600 to-pink-500"
  },
  {
    title: "The Best",
    desc: "Modern corporate identity website presentation.",
    url: "https://pggitdev.github.io/ppg-files/thebest.html",
    tags: ["HTML", "CSS", "Animation"],
    color: "from-purple-500 to-indigo-500"
  },
  {
    title: "Handyman Auto",
    desc: "Marketing and content management for automotive services.",
    url: "https://pggitdev.github.io/ppg-files/sensesaimai56.html",
    tags: ["Marketing", "Content", "Web"],
    color: "from-emerald-500 to-teal-500"
  }
];

const aiIntegrations = [
  { name: "Facebook", icon: FaFacebook, color: "text-blue-600", desc: "Auto-post & Reply" },
  { name: "Canva", icon: SiCanva, color: "text-blue-400", desc: "Design Automation" },
  { name: "GitHub", icon: FaGithub, color: "text-gray-800", desc: "Code Management" },
  { name: "Cloudflare", icon: FaCloudflare, color: "text-orange-500", desc: "Deployment" },
  { name: "Google Sheets", icon: SiGooglesheets, color: "text-green-600", desc: "Data Sync" },
  { name: "LINE API", icon: FaLine, color: "text-green-500", desc: "Chatbot Service" }
];

// --- COMPONENTS ---

const EndfieldLogo = () => (
  <motion.div 
    className="flex items-center gap-2"
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.8, ease: "easeOut" }}
  >
    <div className="relative w-10 h-10 flex items-center justify-center">
      <motion.div 
        className="absolute inset-0 border-2 border-orange-500 rounded-sm rotate-45"
        animate={{ rotate: [45, 225, 45] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />
      <div className="w-6 h-6 bg-orange-500 flex items-center justify-center text-white font-bold text-xs">
        KP
      </div>
    </div>
    <div className="flex flex-col leading-none">
      <span className="text-lg font-black tracking-tighter text-gray-900">KAMPHON</span>
      <span className="text-[10px] font-bold tracking-[0.2em] text-orange-500">PRAYOONHAN.SYS</span>
    </div>
  </motion.div>
);

const SectionTitle = ({ title, subtitle }) => (
  <motion.div 
    className="mb-16 text-center"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
  >
    <div className="inline-block mb-2">
      <div className="flex items-center gap-2">
        <div className="w-8 h-[2px] bg-orange-500" />
        <span className="text-xs font-bold tracking-widest text-orange-500 uppercase">Section</span>
        <div className="w-8 h-[2px] bg-orange-500" />
      </div>
    </div>
    <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">
      {title}
    </h2>
    {subtitle && <p className="text-gray-500 max-w-2xl mx-auto font-medium">{subtitle}</p>}
  </motion.div>
);

const App = () => {
  const [lang, setLang] = useState('th');
  const t = content[lang];

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-orange-500 selection:text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <EndfieldLogo />
          
          <div className="hidden md:flex items-center gap-8">
            {Object.entries(t.nav).map(([key, label]) => (
              <a 
                key={key} 
                href={`#${key}`} 
                className="text-sm font-bold text-gray-500 hover:text-orange-500 transition-colors tracking-wide uppercase"
              >
                {label}
              </a>
            ))}
          </div>

          <button 
            onClick={() => setLang(lang === 'th' ? 'en' : 'th')}
            className="px-4 py-2 border-2 border-gray-900 text-xs font-black hover:bg-gray-900 hover:text-white transition-all tracking-widest uppercase"
          >
            {lang === 'th' ? 'EN' : 'TH'}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative pt-40 pb-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-100 text-orange-600 rounded-full mb-6">
              <ScanLine size={16} />
              <span className="text-xs font-bold tracking-wider uppercase">{t.hero.greeting}</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-gray-900 mb-6 leading-[0.9] tracking-tighter">
              KAMPHON <br />
              <span className="text-orange-500">PRAYOONHAN</span>
            </h1>
            <div className="flex flex-wrap gap-3 mb-8">
              {t.hero.roles.map((role, i) => (
                <span key={i} className="px-4 py-2 bg-gray-100 text-gray-700 text-xs font-bold rounded-sm border-l-4 border-orange-500">
                  {role}
                </span>
              ))}
            </div>
            <p className="text-xl text-gray-600 mb-10 max-w-lg leading-relaxed font-medium">
              {t.hero.desc}
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#works" className="px-8 py-4 bg-orange-500 text-white font-black rounded-sm hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/20 flex items-center gap-2 group">
                {t.hero.cta} <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <div className="flex items-center gap-4 px-6">
                <a href="https://www.facebook.com/kamphon.safe/" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-blue-600 transition-colors"><FaFacebook size={24} /></a>
                <a href="https://github.com/Safeiooi" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-gray-900 transition-colors"><FaGithub size={24} /></a>
                <a href="mailto:kamphon203@gmail.com" className="text-gray-400 hover:text-orange-500 transition-colors"><Mail size={24} /></a>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden relative border-4 border-gray-900 shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000" 
                alt="IT Tech" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <div className="flex items-center gap-3 text-white mb-2">
                  <div className="w-2 h-2 bg-orange-500 animate-pulse" />
                  <span className="text-xs font-bold tracking-widest uppercase">System Status: Active</span>
                </div>
                <div className="h-1 w-full bg-white/20 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-orange-500"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 2, delay: 1 }}
                  />
                </div>
              </div>
            </div>
            {/* Decorative Elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 border-t-4 border-r-4 border-orange-500" />
            <div className="absolute -bottom-6 -left-6 w-24 h-24 border-b-4 border-l-4 border-gray-900" />
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <SectionTitle title={t.about.title} />
          
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div 
              className="md:col-span-2 bg-white p-10 border-2 border-gray-900 shadow-[8px_8px_0_0_#111827]"
              whileHover={{ x: -4, y: -4, shadow: "12px 12px 0 0 #111827" }}
            >
              <h3 className="text-2xl font-black mb-6 flex items-center gap-3">
                <User className="text-orange-500" /> {t.about.name}
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed mb-8 font-medium">
                {t.about.text}
              </p>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="p-6 bg-gray-50 border-l-4 border-orange-500">
                  <h4 className="font-black text-sm uppercase tracking-wider mb-2">{t.about.personality.title}</h4>
                  <p className="text-sm text-gray-500 mb-4">{t.about.personality.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {t.about.personality.tags.map(tag => (
                      <span key={tag} className="text-[10px] font-bold px-2 py-1 bg-white border border-gray-200 rounded-sm">{tag}</span>
                    ))}
                  </div>
                </div>
                <div className="p-6 bg-gray-50 border-l-4 border-gray-900">
                  <h4 className="font-black text-sm uppercase tracking-wider mb-2">{t.about.workStyle.title}</h4>
                  <p className="text-sm text-gray-500 mb-4">{t.about.workStyle.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {t.about.workStyle.tags.map(tag => (
                      <span key={tag} className="text-[10px] font-bold px-2 py-1 bg-white border border-gray-200 rounded-sm">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="space-y-8">
              <div className="bg-gray-900 text-white p-8 rounded-sm">
                <GraduationCap className="text-orange-500 mb-4" size={32} />
                <h4 className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-2">Education</h4>
                <p className="font-bold leading-tight">{t.about.education}</p>
              </div>
              <div className="bg-orange-500 text-white p-8 rounded-sm">
                <Award className="text-white mb-4" size={32} />
                <h4 className="text-xs font-bold tracking-widest uppercase text-orange-200 mb-2">Age</h4>
                <p className="text-3xl font-black">{t.about.age}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Showcase Section */}
      <section id="ai" className="py-32 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <SectionTitle title={t.aiShowcase.title} subtitle={t.aiShowcase.subtitle} />
          
          <div className="relative bg-gray-900 rounded-3xl p-12 overflow-hidden">
            {/* Background Animation */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-500 via-transparent to-transparent" />
            </div>

            <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/20 text-orange-400 rounded-full mb-8 border border-orange-500/30">
                  <Bot size={20} />
                  <span className="text-sm font-black tracking-widest uppercase">Manus AI Integration</span>
                </div>
                <h3 className="text-4xl font-black text-white mb-6 leading-tight">
                  Automate Your Workflow <br />
                  <span className="text-orange-500">Across All Platforms</span>
                </h3>
                <p className="text-gray-400 text-lg mb-10 leading-relaxed">
                  {t.aiShowcase.desc}
                </p>
                
                <div className="grid grid-cols-2 gap-6">
                  {aiIntegrations.map((item, i) => (
                    <motion.div 
                      key={i}
                      className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all"
                      whileHover={{ scale: 1.05 }}
                    >
                      <item.icon className={`${item.color} text-2xl`} />
                      <div>
                        <h4 className="text-white font-bold text-sm">{item.name}</h4>
                        <p className="text-gray-500 text-[10px] uppercase tracking-wider">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="aspect-square bg-gradient-to-br from-orange-500/20 to-purple-500/20 rounded-full flex items-center justify-center p-8 border border-white/10">
                  <motion.div 
                    className="w-full h-full bg-gray-800 rounded-2xl border-2 border-orange-500 shadow-2xl shadow-orange-500/20 p-8 flex flex-col justify-center items-center text-center"
                    animate={{ y: [0, -20, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-orange-500/40">
                      <Cpu size={40} className="text-white" />
                    </div>
                    <h4 className="text-2xl font-black text-white mb-2">AI AGENT ACTIVE</h4>
                    <div className="flex gap-1 mb-6">
                      {[1,2,3,4,5].map(i => (
                        <motion.div 
                          key={i}
                          className="w-1 h-4 bg-orange-500"
                          animate={{ height: [4, 16, 4] }}
                          transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                        />
                      ))}
                    </div>
                    <p className="text-gray-400 text-sm font-medium">
                      Processing tasks for <br />
                      <span className="text-white">Kamphon's Portfolio</span>
                    </p>
                  </motion.div>
                  
                  {/* Orbiting Icons */}
                  {aiIntegrations.map((item, i) => (
                    <motion.div
                      key={i}
                      className="absolute p-3 bg-white rounded-full shadow-xl"
                      animate={{ 
                        rotate: 360,
                        x: Math.cos(i * (360 / aiIntegrations.length) * (Math.PI / 180)) * 180,
                        y: Math.sin(i * (360 / aiIntegrations.length) * (Math.PI / 180)) * 180
                      }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    >
                      <item.icon className={`${item.color} text-xl`} />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="exp" className="py-32 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <SectionTitle title={t.experience.title} subtitle={t.experience.subtitle} />
          
          <div className="space-y-6">
            {t.experience.items.map((item, i) => (
              <motion.div 
                key={i}
                className="group bg-white p-8 border-2 border-gray-900 flex flex-col md:flex-row gap-8 items-start md:items-center hover:bg-orange-50 transition-all"
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="w-16 h-16 bg-gray-900 text-white flex items-center justify-center shrink-0">
                  <item.icon size={32} />
                </div>
                <div className="flex-grow">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                    <h3 className="text-2xl font-black text-gray-900">{item.role}</h3>
                    <span className="text-sm font-black text-orange-500 uppercase tracking-widest">{item.period}</span>
                  </div>
                  <h4 className="text-lg font-bold text-gray-500 mb-4">{item.company}</h4>
                  <p className="text-gray-600 font-medium">{item.desc}</p>
                </div>
                <div className="hidden md:block">
                  <ChevronRight className="text-gray-300 group-hover:text-orange-500 transition-colors" size={40} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Works Section */}
      <section id="works" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionTitle title={t.portfolio.title} subtitle={t.portfolio.subtitle} />
          
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, i) => (
              <motion.a 
                key={i}
                href={project.url}
                target="_blank"
                rel="noreferrer"
                className={`group relative overflow-hidden border-4 border-gray-900 ${project.featured ? 'md:col-span-2' : ''}`}
                whileHover={{ y: -8 }}
              >
                <div className={`h-2 bg-gradient-to-r ${project.color}`} />
                <div className="p-10 bg-white">
                  <div className="flex justify-between items-start mb-6">
                    <div className="p-4 bg-gray-100 group-hover:bg-orange-500 group-hover:text-white transition-all">
                      <Layout size={32} />
                    </div>
                    {project.featured && (
                      <span className="px-4 py-1 bg-orange-500 text-white text-[10px] font-black uppercase tracking-widest">Featured Project</span>
                    )}
                  </div>
                  <h3 className="text-3xl font-black mb-4 group-hover:text-orange-500 transition-colors">{project.title}</h3>
                  <p className="text-gray-600 text-lg mb-8 font-medium max-w-2xl">{project.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-gray-900 text-white text-[10px] font-bold uppercase tracking-widest">{tag}</span>
                    ))}
                  </div>
                </div>
                <div className="absolute bottom-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ExternalLink size={32} className="text-orange-500" />
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Hobbies Section */}
      <section id="media" className="py-32 px-6 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto">
          <SectionTitle title={t.hobbies.title} subtitle={t.hobbies.subtitle} />
          
          <div className="grid md:grid-cols-2 gap-12">
            {t.hobbies.items.map((hobby, i) => (
              <motion.div 
                key={i}
                className="group relative overflow-hidden rounded-2xl border-2 border-white/10 hover:border-orange-500 transition-all"
                whileHover={{ scale: 1.02 }}
              >
                <div className="aspect-video overflow-hidden">
                  <img src={hobby.img} alt={hobby.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                </div>
                <div className="p-8 bg-gray-800/50 backdrop-blur-md">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-orange-500 rounded-lg">
                      <hobby.icon size={24} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black">{hobby.title}</h3>
                      <p className="text-orange-500 text-xs font-bold uppercase tracking-widest">{hobby.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-400 font-medium mb-6">{hobby.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {hobby.tags.map(tag => (
                      <span key={tag} className="text-[10px] font-bold px-3 py-1 bg-white/5 border border-white/10 rounded-full">{tag}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <SectionTitle title={t.nav.contact} />
          <div className="bg-white border-4 border-gray-900 p-12 shadow-[16px_16px_0_0_#f97316]">
            <h3 className="text-4xl font-black mb-8">LET'S WORK <span className="text-orange-500">TOGETHER</span></h3>
            <div className="flex flex-col gap-4">
              <a href="mailto:kamphon203@gmail.com" className="flex items-center justify-center gap-4 p-6 bg-gray-900 text-white font-black text-xl hover:bg-orange-500 transition-all group">
                <Mail size={28} /> kamphon203@gmail.com
                <ArrowRight className="group-hover:translate-x-2 transition-transform" />
              </a>
              <div className="grid grid-cols-2 gap-4">
                <a href="tel:0825385515" className="flex items-center justify-center gap-3 p-4 border-2 border-gray-900 font-black hover:bg-gray-100 transition-all">
                  <Phone size={20} /> 082-538-5515
                </a>
                <a href="https://www.facebook.com/kamphon.safe/" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-3 p-4 bg-[#1877F2] text-white font-black hover:opacity-90 transition-all">
                  <FaFacebook size={20} /> FACEBOOK
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-100 text-center">
        <EndfieldLogo />
        <p className="mt-6 text-sm font-bold text-gray-400 uppercase tracking-widest">
          {t.footer.text}
        </p>
      </footer>
    </div>
  );
};

export default App;
