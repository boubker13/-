/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Home, MessageSquare, Award, Compass, Share2, Shield, HelpCircle } from 'lucide-react';
import AlAtharLogo from './AlAtharLogo';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', name: 'الاستقبال • Accueil', icon: Home },
    { id: 'chatbot', name: 'المساعد الافتراضي • Assistant', icon: MessageSquare },
    { id: 'assessment', name: 'التقييم الذاتي • Tests', icon: Award },
    { id: 'breathing', name: 'الاسترخاء • Respiration', icon: Compass },
    { id: 'marketing', name: 'استوديو الإعلام • Marketing', icon: Share2 },
  ];

  return (
    <aside id="sidebar-container" className="w-full lg:w-72 bg-slate-900 border-b lg:border-b-0 lg:border-r border-teal-950 flex flex-col justify-between text-slate-100 shrink-0">
      <div className="p-6">
        {/* LOGO AND BRANDING */}
        <div id="brand-header" className="flex items-center gap-3 mb-8">
          <AlAtharLogo size="sm" className="w-11 h-11 shrink-0" />
          <div>
            <h1 className="text-lg font-semibold tracking-tight font-sans text-slate-100 leading-tight">Al-Athar • الآثر</h1>
            <p className="text-[9px] text-emerald-400 font-mono tracking-widest uppercase">Santé Mentale Algérie</p>
          </div>
        </div>

        {/* NAVIGATION LINKS */}
        <nav id="main-navigation" className="space-y-1.5">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-btn-${item.id}`}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-medium transition-all group ${
                  isActive
                    ? 'bg-gradient-to-r from-emerald-950 to-teal-900 text-emerald-300 border-l-4 border-emerald-400 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <IconComponent className={`w-5 h-5 transition-transform ${isActive ? 'text-emerald-400' : 'text-slate-500 group-hover:scale-105'}`} />
                <span className="text-left font-sans">{item.name}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* FOOTER VALUES CARD */}
      <div id="sidebar-footer" className="p-5 border-t border-teal-950 bg-slate-950/40">
        <div className="bg-emerald-950/20 rounded-xl p-3.5 border border-emerald-500/10 text-xs">
          <div className="flex items-center gap-1.5 text-emerald-400 font-medium mb-1">
            <Shield className="w-4 h-4 shrink-0" />
            <span>Confidentialité 100%</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
            Données chiffrées et anonymes, hébergées en sécurité.
          </p>
          <div className="mt-2.5 text-[10px] italic text-emerald-500 text-center font-serif">
            "آثر آمن ..يبدأ من الداخل"
          </div>
        </div>
      </div>
    </aside>
  );
}
