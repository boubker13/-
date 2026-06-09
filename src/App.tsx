/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import DashboardHome from './components/DashboardHome';
import VirtualAssistant from './components/VirtualAssistant';
import AssessmentStudio from './components/AssessmentStudio';
import BreathingStudio from './components/BreathingStudio';
import MarketingStudio from './components/MarketingStudio';
import { ShieldCheck, HelpCircle } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('dashboard');

  const renderActiveContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardHome />;
      case 'chatbot':
        return <VirtualAssistant />;
      case 'assessment':
        return <AssessmentStudio />;
      case 'breathing':
        return <BreathingStudio />;
      case 'marketing':
        return <MarketingStudio />;
      default:
        return <DashboardHome />;
    }
  };

  return (
    <div id="app-root-container" className="min-h-screen bg-slate-950 text-slate-100 flex flex-col lg:flex-row relative">
      
      {/* SIDEBAR NAVIGATION COLUMN */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* MAIN MAIN SCROLLER CONTAINER */}
      <main id="app-main-viewport" className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        
        {/* UPPER STATUS BAR */}
        <header id="app-top-header" className="h-16 px-6 lg:px-8 border-b border-teal-950/60 bg-slate-900/40 flex items-center justify-between sticky top-0 backdrop-blur z-20 shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-mono font-bold tracking-wider text-slate-400 uppercase">
              Centre de Contrôle Al-Athar
            </span>
          </div>
          
          <div className="flex items-center gap-4.5 text-xs text-slate-400">
            <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <ShieldCheck className="w-4 h-4" />
              <span className="hidden sm:inline">Anonyme & Sécurisé</span>
            </div>
            <span className="opacity-15">|</span>
            <span className="font-mono text-[11px] hidden sm:inline">Algeria (DZD)</span>
          </div>
        </header>

        {/* COMPONENT TRANSITIONAL VIEWPORT */}
        <div id="app-view-body" className="flex-1 p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {renderActiveContent()}
          </div>
        </div>

        {/* BOTTOM GLOBAL FOOTER */}
        <footer id="app-global-footer" className="py-4 border-t border-teal-950/40 bg-slate-950/40 text-center text-[11px] text-slate-500 font-sans mt-auto">
          <div>Plateforme Algérienne de Santé Mentale • الآثر © 2026</div>
          <div className="text-[9px] tracking-widest uppercase opacity-45 mt-1">« آثر آمن ..يبدأ من الداخل و يصل إليك بسرية »</div>
        </footer>

      </main>
    </div>
  );
}
