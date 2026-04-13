import React, { useState, useEffect, useRef } from 'react';
import { 
  ExternalLink, 
  ChevronRight, 
  Code, 
  Cpu, 
  Globe, 
  Layout, 
  MessageCircle, 
  Zap, 
  Bot, 
  Terminal, 
  Database, 
  Workflow, 
  Search, 
  Layers, 
  Sparkles,
  ChefHat,
  TrendingUp,
  Monitor,
  Smartphone,
  Server,
  Cloud,
  FileCode,
  CheckCircle2,
  ArrowRight,
  Info,
  Play,
  Music
} from 'lucide-react';

// --- Components ---

const SectionTitle = ({ title, subtitle, icon: Icon }) => (
  <div className="mb-12 relative">
    <div className="flex items-center gap-4 mb-2">
      {Icon && <Icon className="text-orange-500 w-8 h-8" />}
      <h2 className="text-4xl font-bold tracking-tighter text-white uppercase italic">
        {title}
      </h2>
    </div>
    <div className="h-1 w-24 bg-orange-500 mb-4"></div>
    {subtitle && <p className="text-gray-400 font-mono text-sm uppercase tracking-widest">{subtitle}</p>}
    <div className="absolute -left-8 top-0 w-1 h-full bg-gray-800 opacity-50"></div>
  </div>
);

const TechBadge = ({ name }) => (
  <span className="px-3 py-1 bg-gray-900 border border-gray-700 text-gray-300 text-xs font-mono rounded-sm hover:border-orange-500 transition-colors">
    {name}
  </span>
);

const ProjectModal = ({ project, isOpen, onClose }) => {
  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
      <div className="bg-gray-900 border border-orange-500/30 w-full max-w-4xl max-h-[90vh] overflow-y-auto relative rounded-lg shadow-2xl shadow-orange-500/10">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors p-2 bg-gray-800 rounded-full"
        >
          <ChevronRight className="w-6 h-6 rotate-90" />
        </button>
        
        <div className="p-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/2">
              <img 
                src={project.image || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800"} 
                alt={project.title}
                className="w-full h-64 object-cover rounded-lg border border-gray-700"
              />
              <div className="mt-6 flex flex-wrap gap-2">
                {project.tech?.map(t => <TechBadge key={t} name={t} />)}
              </div>
            </div>
            
            <div className="md:w-1/2">
              <h3 className="text-3xl font-bold text-white mb-2">{project.title}</h3>
              <p className="text-orange-500 font-mono text-sm mb-6 uppercase tracking-widest">{project.category}</p>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-white font-bold mb-2 flex items-center gap-2">
                    <Info className="w-4 h-4 text-orange-500" /> Problem
                  </h4>
                  <p className="text-gray-400 leading-relaxed">{project.problem || "No details provided."}</p>
                </div>
                <div>
                  <h4 className="text-white font-bold mb-2 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-orange-500" /> Solution
                  </h4>
                  <p className="text-gray-400 leading-relaxed">{project.solution || "No details provided."}</p>
                </div>
                <div>
                  <h4 className="text-white font-bold mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-orange-500" /> Result
                  </h4>
                  <p className="text-gray-400 leading-relaxed">{project.result || "No details provided."}</p>
                </div>
              </div>
              
              <div className="mt-8 flex gap-4">
                {project.link && (
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-all"
                  >
                    View Project <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main App ---

function App() {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [aiInput, setAiInput] = useState('');
  const [aiResponse, setAiResponse] = useState(null);
  const [isAiLoading, setIsAiLoading] = useState(false);

  const personality = [
    { icon: Sparkles, label: "Creative Thinker", desc: "ชอบคิดนอกกรอบและหาทางออกใหม่ๆ" },
    { icon: Zap, label: "Fast Learner", desc: "เรียนรู้เทคโนโลยีใหม่ๆ ได้อย่างรวดเร็ว" },
    { icon: MessageCircle, label: "Collaborative", desc: "ทำงานร่วมกับทีมและ AI ได้อย่างดีเยี่ยม" }
  ];

  const workStyle = [
    { title: "AI-Native Workflow", desc: "ใช้ AI Agent (Manus) ช่วยในการ Coding และ Automation" },
    { title: "Problem-First Approach", desc: "เน้นแก้ปัญหาที่ต้นเหตุด้วยเทคโนโลยีที่เหมาะสม" },
    { title: "Continuous Iteration", desc: "พัฒนาและปรับปรุงงานอย่างต่อเนื่องสม่ำเสมอ" }
  ];

  const skills = [
    { name: "React / Vite", level: 90, icon: Code },
    { name: "Tailwind CSS", level: 95, icon: Layout },
    { name: "AI Agent (Manus)", level: 85, icon: Bot },
    { name: "Cloudflare / GitHub", level: 80, icon: Cloud },
    { name: "Gemini / OpenAI API", level: 75, icon: Cpu }
  ];

  const webProjects = [
    {
      id: 1,
      title: "Prime x Legal",
      category: "Web Application",
      image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=800",
      link: "https://primexlegal.com/",
      tech: ["React", "Tailwind", "Node.js"],
      problem: "ระบบจัดการเอกสารกฎหมายที่ซับซ้อนและใช้งานยากสำหรับผู้ใช้ทั่วไป",
      solution: "สร้าง Dashboard ที่เรียบง่ายและใช้ AI ช่วยในการจัดหมวดหมู่เอกสาร",
      result: "ลดเวลาในการค้นหาเอกสารลง 60% และเพิ่มความพึงพอใจของผู้ใช้"
    },
    {
      id: 2,
      title: "Canva Portfolio",
      category: "Design Showcase",
      image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=800",
      link: "https://www.canva.com/design/DAGf6769918/m-Yf8V033_pY9Z6-Yf8V033/view",
      tech: ["Canva", "UI/UX Design"],
      problem: "ต้องการนำเสนอผลงานการออกแบบในรูปแบบที่เข้าถึงง่ายและสวยงาม",
      solution: "ออกแบบ Interactive Portfolio บน Canva ที่รองรับการดูผ่านมือถือ",
      result: "มียอดเข้าชมมากกว่า 1,000 ครั้ง และได้รับคำชมเรื่องดีไซน์"
    },
    {
      id: 3,
      title: "The Best Project",
      category: "E-Commerce",
      image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&q=80&w=800",
      link: "https://thebest-project.com/",
      tech: ["Next.js", "Shopify", "Tailwind"],
      problem: "ร้านค้าออนไลน์เดิมโหลดช้าและไม่รองรับการชำระเงินที่หลากหลาย",
      solution: "Rebuild ใหม่ด้วย Next.js และเชื่อมต่อระบบชำระเงินแบบ Seamless",
      result: "ความเร็วในการโหลดเพิ่มขึ้น 3 เท่า และยอดขายเพิ่มขึ้น 25%"
    }
  ];

  const creativeMedia = [
    { type: "Video", title: "Motion Graphics Showcase", icon: Play, link: "#" },
    { type: "Music", title: "Lo-fi Study Beats", icon: Music, link: "#" }
  ];

  const hobbies = [
    { title: "Funded Trader", desc: "วิเคราะห์กราฟและบริหารความเสี่ยงในตลาดการเงิน", icon: TrendingUp },
    { title: "Creative Cooking", desc: "ทดลองทำเมนูใหม่ๆ และจัดจานสไตล์ Fine Dining", icon: ChefHat }
  ];

  const handleAiConsult = async () => {
    if (!aiInput) return;
    setIsAiLoading(true);
    // Simulate AI Agent Workflow
    setTimeout(() => {
      setAiResponse({
        plan: [
          "Analyze requirement using SimilarWeb & Google Search",
          "Design system architecture with Cloudflare Workers",
          "Automate deployment via GitHub Actions",
          "Monitor performance using Manus AI Agent"
        ],
        tools: ["Manus AI", "Cloudflare", "GitHub", "Gemini API"]
      });
      setIsAiLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-300 font-sans selection:bg-orange-500 selection:text-white overflow-x-hidden">
      {/* Grid Background Effect */}
      <div className="fixed inset-0 pointer-events-none opacity-20" 
           style={{ backgroundImage: 'radial-gradient(#333 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
      
      {/* Scanline Effect */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-50 bg-[length:100%_2px,3px_100%]"></div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-40 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-orange-500 rounded-sm flex items-center justify-center font-bold text-black italic">K</div>
            <span className="text-xl font-bold tracking-tighter text-white uppercase italic">Kamphon <span className="text-orange-500">.Dev</span></span>
          </div>
          <div className="hidden md:flex items-center gap-8 font-mono text-xs uppercase tracking-widest">
            <a href="#about" className="hover:text-orange-500 transition-colors">About</a>
            <a href="#projects" className="hover:text-orange-500 transition-colors">Projects</a>
            <a href="#ai-lab" className="hover:text-orange-500 transition-colors">AI Lab</a>
            <a href="#contact" className="px-4 py-2 bg-orange-500 text-black font-bold hover:bg-orange-600 transition-all">Hire Me</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-40 pb-32 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 text-xs font-mono mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
            </span>
            AVAILABLE FOR NEW PROJECTS
          </div>
          <h1 className="text-6xl md:text-8xl font-bold text-white tracking-tighter mb-6 leading-none uppercase italic">
            AI Automation <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500">Architect</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mb-10 leading-relaxed">
            Helping businesses scale with <span className="text-white font-bold">Autonomous AI Agents</span> and modern web technologies. 
            Specializing in high-performance React apps and automated workflows.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#projects" className="bg-white text-black font-bold py-4 px-8 rounded-sm hover:bg-orange-500 hover:text-white transition-all flex items-center gap-2 group">
              VIEW PROJECTS <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <div className="flex items-center gap-4 px-6 border-l border-gray-800">
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Code className="w-6 h-6" /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Code className="w-6 h-6" /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Code className="w-6 h-6" /></a>
            </div>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-1/3 h-full bg-gradient-to-l from-orange-500/10 to-transparent blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent"></div>
      </header>

      <main className="max-w-7xl mx-auto px-6 space-y-32 pb-32">
        
        {/* About Section */}
        <section id="about" className="grid md:grid-columns-2 gap-16 items-start">
          <div>
            <SectionTitle title="Personality" subtitle="Who I am" icon={Sparkles} />
            <div className="grid gap-6">
              {personality.map((item, i) => (
                <div key={i} className="p-6 bg-gray-900/50 border border-gray-800 rounded-lg hover:border-orange-500/50 transition-all group">
                  <div className="flex items-center gap-4 mb-3">
                    <item.icon className="text-orange-500 w-6 h-6" />
                    <h3 className="text-xl font-bold text-white">{item.label}</h3>
                  </div>
                  <p className="text-gray-400">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <SectionTitle title="Work Style" subtitle="How I build" icon={Zap} />
            <div className="space-y-8">
              {workStyle.map((style, i) => (
                <div key={i} className="relative pl-8 border-l-2 border-gray-800 hover:border-orange-500 transition-colors py-2">
                  <div className="absolute -left-[9px] top-4 w-4 h-4 bg-[#0a0a0a] border-2 border-orange-500 rounded-full"></div>
                  <h3 className="text-xl font-bold text-white mb-2">{style.title}</h3>
                  <p className="text-gray-400">{style.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section>
          <SectionTitle title="Core Skills" subtitle="Technical Expertise" icon={Cpu} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((skill, i) => (
              <div key={i} className="p-8 bg-gray-900/30 border border-gray-800 rounded-xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <skill.icon className="w-16 h-16" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                  <skill.icon className="text-orange-500 w-5 h-5" />
                  {skill.name}
                </h3>
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-orange-500 to-yellow-500 transition-all duration-1000"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
                <div className="mt-2 text-right font-mono text-xs text-orange-500">{skill.level}%</div>
              </div>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects">
          <SectionTitle title="Web Projects" subtitle="Featured Work" icon={Globe} />
          <div className="grid md:grid-cols-3 gap-8">
            {webProjects.map((project) => (
              <div 
                key={project.id} 
                className="group cursor-pointer"
                onClick={() => {
                  setSelectedProject(project);
                  setIsModalOpen(true);
                }}
              >
                <div className="relative overflow-hidden rounded-xl border border-gray-800 aspect-video mb-4">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="px-6 py-2 bg-orange-500 text-black font-bold rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform">
                      View Details
                    </span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-orange-500 transition-colors">{project.title}</h3>
                <p className="text-gray-500 font-mono text-xs uppercase tracking-widest mt-1">{project.category}</p>
              </div>
            ))}
          </div>
        </section>

        {/* AI Lab Section */}
        <section id="ai-lab" className="bg-gray-900/30 border border-orange-500/20 rounded-3xl p-8 md:p-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2"></div>
          
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="md:w-1/2">
                <SectionTitle title="AI Lab" subtitle="Manus AI Collaboration" icon={Bot} />
                <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                  สัมผัสพลังของ <span className="text-white font-bold italic">Autonomous AI Agent</span> ที่ช่วยให้การทำงานซับซ้อนกลายเป็นเรื่องง่าย 
                  ผมใช้ Manus AI ในการวิเคราะห์ข้อมูล, เขียนโค้ด และจัดการระบบ Cloud แบบอัตโนมัติ
                </p>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3 text-white font-mono text-sm">
                    <CheckCircle2 className="text-orange-500 w-5 h-5" />
                    Autonomous Coding & Refactoring
                  </div>
                  <div className="flex items-center gap-3 text-white font-mono text-sm">
                    <CheckCircle2 className="text-orange-500 w-5 h-5" />
                    Market Analysis via SimilarWeb
                  </div>
                  <div className="flex items-center gap-3 text-white font-mono text-sm">
                    <CheckCircle2 className="text-orange-500 w-5 h-5" />
                    Automated Cloud Deployment
                  </div>
                </div>
              </div>

              <div className="md:w-1/2 w-full">
                <div className="bg-black/50 border border-gray-800 rounded-2xl p-6 font-mono">
                  <div className="flex items-center gap-2 mb-4 border-b border-gray-800 pb-4">
                    <Terminal className="text-orange-500 w-5 h-5" />
                    <span className="text-xs text-gray-500 uppercase tracking-widest">AI Automation Architect</span>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="text-sm text-gray-400 italic">// Describe your business problem below</div>
                    <textarea 
                      value={aiInput}
                      onChange={(e) => setAiInput(e.target.value)}
                      placeholder="e.g., I want to automate my customer support using AI..."
                      className="w-full bg-gray-900 border border-gray-800 rounded-lg p-4 text-white focus:border-orange-500 outline-none transition-all h-32 resize-none"
                    />
                    <button 
                      onClick={handleAiConsult}
                      disabled={isAiLoading}
                      className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-700 text-black font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2"
                    >
                      {isAiLoading ? "AGENT THINKING..." : "CONSULT AI AGENT"}
                      <Zap className="w-4 h-4" />
                    </button>

                    {aiResponse && (
                      <div className="mt-6 p-4 bg-orange-500/5 border border-orange-500/20 rounded-lg animate-in fade-in slide-in-from-bottom-4">
                        <div className="text-orange-500 text-xs font-bold mb-3 uppercase tracking-widest flex items-center gap-2">
                          <Sparkles className="w-3 h-3" /> Proposed Workflow:
                        </div>
                        <ul className="space-y-2">
                          {aiResponse.plan.map((step, i) => (
                            <li key={i} className="text-xs text-gray-300 flex items-start gap-2">
                              <span className="text-orange-500">{i+1}.</span> {step}
                            </li>
                          ))}
                        </ul>
                        <div className="mt-4 pt-4 border-t border-orange-500/10 flex flex-wrap gap-2">
                          {aiResponse.tools.map(t => (
                            <span key={t} className="text-[10px] bg-orange-500/10 text-orange-500 px-2 py-1 rounded border border-orange-500/20">{t}</span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Hobby & Creative Section */}
        <section className="grid md:grid-cols-2 gap-16">
          <div>
            <SectionTitle title="Creative Studio" subtitle="Media & Content" icon={Layers} />
            <div className="grid gap-4">
              {creativeMedia.map((media, i) => (
                <a key={i} href={media.link} className="flex items-center justify-between p-6 bg-gray-900/30 border border-gray-800 rounded-xl hover:border-orange-500 transition-all group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center group-hover:bg-orange-500 transition-colors">
                      <media.icon className="text-white w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white">{media.title}</h3>
                      <p className="text-xs text-gray-500 uppercase tracking-widest">{media.type}</p>
                    </div>
                  </div>
                  <ExternalLink className="w-5 h-5 text-gray-600 group-hover:text-orange-500" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <SectionTitle title="Life Style" subtitle="Hobbies & Interests" icon={ChefHat} />
            <div className="grid gap-6">
              {hobbies.map((hobby, i) => (
                <div key={i} className="p-6 bg-gray-900/30 border border-gray-800 rounded-xl flex gap-6 items-start">
                  <div className="p-3 bg-orange-500/10 rounded-lg">
                    <hobby.icon className="text-orange-500 w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">{hobby.title}</h3>
                    <p className="text-gray-400">{hobby.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer id="contact" className="bg-black border-t border-gray-900 py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tighter uppercase italic">
            Let's Build Something <br />
            <span className="text-orange-500">Legendary</span>
          </h2>
          <p className="text-gray-400 mb-12 max-w-xl mx-auto">
            พร้อมที่จะยกระดับธุรกิจของคุณด้วย AI และเทคโนโลยีสมัยใหม่แล้วหรือยัง? ติดต่อผมได้เลยครับ!
          </p>
          <a href="mailto:contact@kamphon.dev" className="inline-flex items-center gap-3 bg-orange-500 hover:bg-orange-600 text-black font-bold py-5 px-10 rounded-full text-xl transition-all transform hover:scale-105">
            <Code className="w-6 h-6" /> Say Hello
          </a>
          
          <div className="mt-20 pt-10 border-t border-gray-900 flex flex-col md:flex-row justify-between items-center gap-6 text-gray-500 font-mono text-xs uppercase tracking-widest">
            <p>© 2026 KAMPHON.DEV - ALL RIGHTS RESERVED</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Project Modal */}
      <ProjectModal 
        project={selectedProject} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}

export default App;
