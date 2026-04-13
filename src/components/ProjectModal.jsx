import React from 'react';
import { X, ExternalLink, Zap, CheckCircle2, AlertCircle } from 'lucide-react';

const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-blue-500/30 rounded-2xl p-6 md:p-8 max-w-2xl w-full relative shadow-2xl transform animate-in zoom-in-95 duration-200 overflow-y-auto max-h-[90vh]"
        onClick={e => e.stopPropagation()}
      >
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white transition-colors"
        >
          <X size={24} />
        </button>

        <div className="mb-6">
          <div className={`h-2 w-24 rounded-full bg-gradient-to-r ${project.color} mb-4`} />
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{project.title}</h3>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag, i) => (
              <span key={i} className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-600 dark:text-blue-300 text-xs font-medium">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <section>
            <h4 className="text-red-500 dark:text-red-400 text-sm font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
              <AlertCircle size={16} /> Problem (ปัญหาที่พบ)
            </h4>
            <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed border-l-2 border-red-500/30 pl-3">
              {project.problem || "งานที่ต้องทำซ้ำๆ และใช้เวลานานในการจัดการข้อมูลแบบเดิม"}
            </p>
          </section>

          <section>
            <h4 className="text-blue-500 dark:text-blue-400 text-sm font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
              <Zap size={16} /> Solution (แนวทางแก้ไข)
            </h4>
            <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed border-l-2 border-blue-500/30 pl-3">
              {project.solution || "พัฒนาเครื่องมืออัตโนมัติเพื่อลดขั้นตอนการทำงานและเพิ่มความแม่นยำ"}
            </p>
          </section>

          <section>
            <h4 className="text-green-500 dark:text-green-400 text-sm font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
              <CheckCircle2 size={16} /> Result (ผลลัพธ์ที่ได้)
            </h4>
            <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed border-l-2 border-green-500/30 pl-3">
              {project.result || "ลดเวลาทำงานลงได้มากกว่า 50% และข้อมูลมีความเป็นระเบียบมากขึ้น"}
            </p>
          </section>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800 flex justify-end">
          <a 
            href={project.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white bg-gradient-to-r ${project.color} hover:opacity-90 transition-opacity shadow-lg`}
          >
            <ExternalLink size={18} />
            Visit Project
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
