/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ShieldCheck, Heart, Users, Sparkles, Smartphone, ArrowRight, CreditCard, Landmark, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import AlAtharLogo from './AlAtharLogo';

export default function DashboardHome() {
  const [selectedGreetingIndex, setSelectedGreetingIndex] = useState(0);

  // 5 Warm, non-intrusive micro-copy phrases in French and Arabic
  const greetings = [
    {
      fr: "Marhaban, prends une inspiration tranquille aujourd'hui. Que ressens-tu en ce moment ?",
      ar: "مرحباً بك، خذ نفساً عميقاً وهادئاً اليوم. بمَ تشعر في هذه اللحظة؟",
      feeling: "Calme & Apaisement"
    },
    {
      fr: "Ravi de te retrouver sur Al-Athar. C'est un espace sûr. Si tu as besoin de déposer un poids, nous sommes là.",
      ar: "سعداء بوجودك معنا في الآثر. هذا مكانك الآمن، إن كنت تبحث عن مساحة مريحة للحديث، نحن معك.",
      feeling: "Confiance & Sécurité"
    },
    {
      fr: "Chaque pas vers toi-même est précieux. Comment s'est passée ta journée ?",
      ar: "كل خطوة تخطوها نحو سلامك الداخلي هي خطوة ثمينة. كيف سارت أمور يومك؟",
      feeling: "Valorisation & Progrès"
    },
    {
      fr: "Installe-toi confortablement. L'anonymat est total, ta parole libre. Comment vas-tu, vraiment ?",
      ar: "خذ كامل وقتك وراحتك. هنا الخصوصية مطلقة، وبوحك حر بالكامل. كيف حالك اليوم، بصدق؟",
      feeling: "Écoute Authentique"
    },
    {
      fr: "Un moment juste pour toi dans le tumulte du quotidien. Qu'aimerais-tu explorer aujourd'hui ?",
      ar: "لحظة مخصصة لك أنت فقط بعيداً عن صخب الحياة اليومية. ما الذي تود تسليط الضوء عليه اليوم؟",
      feeling: "Retrait & Clarté"
    }
  ];

  const coreServices = [
    {
      title: "Consultation Vidéo",
      desc: "Appels vidéo confidentiels de 45 minutes avec un psychologue clinicien certifié.",
      icon: Smartphone,
      color: "from-emerald-500/20 to-teal-500/20"
    },
    {
      title: "Chat Clinique Chiffré",
      desc: "Discutez par écrit à votre rythme via des canaux cryptés de bout en bout.",
      icon: ShieldCheck,
      color: "from-blue-500/20 to-teal-500/20"
    },
    {
      title: "Auto-Évaluations",
      desc: "Tests psychométriques validés scientifiquement pour mesurer stress, fatigue ou anxiété.",
      icon: Sparkles,
      color: "from-purple-500/20 to-pink-500/20"
    },
    {
      title: "Groupes de Soutien",
      desc: "Espaces thérapeutiques guidés sur des thématiques communes (deuil, stress pro, etc.).",
      icon: Users,
      color: "from-amber-500/20 to-orange-500/25"
    }
  ];

  return (
    <div id="dashboard-home" className="space-y-10">
      
      {/* SLA INTERACTIVE HERO WITH SLOGAN */}
      <div id="hero-banner" className="relative bg-gradient-to-br from-teal-950 via-slate-900 to-emerald-950 rounded-3xl p-8 lg:p-12 border border-teal-500/15 overflow-hidden shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl -z-10" />
        
        <div className="max-w-2xl space-y-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            Accompagnement Éthique & Sans Jugement
          </span>
          
          <h2 className="text-3xl lg:text-5xl font-semibold tracking-tight text-slate-100 leading-tight">
            Plateforme de Santé Mentale <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
              Al-Athar • الآثر
            </span>
          </h2>
          
          <p className="text-lg text-slate-300 leading-relaxed max-w-xl font-serif italic border-l-2 border-emerald-500/40 pl-4 py-1">
            « آثر آمن ..يبدأ من الداخل و يصل إليك بسرية »
          </p>
          
          <p className="text-sm text-slate-400 max-w-xl leading-relaxed">
            Trouvez l'écoute bienveillante d'un professionnel agréé en Algérie. 15 minutes d'évaluation initiale gratuite avec notre assistant d'orientation virtuel.
          </p>
        </div>

        <div className="shrink-0 bg-slate-950/20 p-5 rounded-3xl border border-teal-500/10 shadow-lg flex items-center justify-center">
          <AlAtharLogo size="lg" className="w-32 h-32 md:w-40 md:h-40 lg:w-44 lg:h-44" />
        </div>
      </div>

      {/* 5 MICRO-COPY PHRASES INTERACTIVE BOARD */}
      <section id="microcopy-board" className="bg-slate-900 rounded-2xl p-6 border border-slate-800 shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-lg font-semibold text-slate-200 flex items-center gap-2">
              <Heart className="w-5 h-5 text-emerald-400" />
              Micro-Copy d’Accueil de l'Application
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Petites phrases intégrées lors de la connexion pour inviter l'utilisateur à exprimer ses émotions.
            </p>
          </div>
          <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-lg self-start">
            {greetings.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedGreetingIndex(idx)}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                  selectedGreetingIndex === idx 
                    ? 'bg-emerald-500 text-slate-950 shadow-sm' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Phr. {idx + 1}
              </button>
            ))}
          </div>
        </div>

        {/* INTERACTIVE DEMO VIEWER */}
        <div className="bg-slate-950 rounded-xl p-6 border border-emerald-950 relative min-h-[160px] flex flex-col justify-between">
          <div className="absolute top-3 right-4 text-[10px] uppercase tracking-wider font-mono text-emerald-500/50">
            Sensation ciblée : {greetings[selectedGreetingIndex].feeling}
          </div>
          
          <div className="space-y-4 my-auto">
            {/* Arabic Text (Rich and warm styled) */}
            <p className="text-2xl lg:text-3xl font-semibold text-slate-100 text-right leading-relaxed font-sans" dir="rtl">
              {greetings[selectedGreetingIndex].ar}
            </p>
            {/* French Text */}
            <p className="text-sm md:text-base text-slate-300 italic border-l-2 border-emerald-400/30 pl-3">
              {greetings[selectedGreetingIndex].fr}
            </p>
          </div>

          <div className="mt-4 flex items-center justify-between text-xs text-slate-500 border-t border-slate-900 pt-3">
            <span>Intégration d'interface Al-Athar</span>
            <span className="flex items-center gap-1 text-emerald-400 bg-emerald-500/5 px-2.5 py-0.5 rounded-full ring-1 ring-emerald-500/20">
              <CheckCircle className="w-3 h-3" /> Chaleureux & Non intrusif
            </span>
          </div>
        </div>
      </section>

      {/* CORE OFFERS */}
      <section id="services-section" className="space-y-5">
        <h3 className="text-xl font-semibold text-slate-100">Explorer l'accompagnement</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {coreServices.map((srv, i) => {
            const Icon = srv.icon;
            return (
              <div 
                key={i} 
                className={`bg-slate-900 rounded-xl p-5 border border-slate-800 hover:border-emerald-500/20 transition-all flex flex-col justify-between group`}
              >
                <div>
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${srv.color} flex items-center justify-center text-slate-200 mb-4 ring-1 ring-white/10`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-semibold text-slate-200 group-hover:text-emerald-400 transition-colors mb-2">{srv.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{srv.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ALGERIAN PAYMENTS GUIDE */}
      <section id="payments-guide" className="bg-slate-900 rounded-2xl p-6 lg:p-8 border border-slate-800">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-slate-200 flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-emerald-400" />
            Modalités de Paiement Locaux en Algérie
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Afin de rendre la thérapie accessible à tous les citoyens algériens, Al-Athar propose trois moyens simples de recharger votre portefeuille ou de régler vos sessions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Card 1: CIB / Dahabia */}
          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md">Option 1</span>
                <CreditCard className="w-6 h-6 text-emerald-400" />
              </div>
              <h4 className="font-semibold text-slate-200 text-sm">Cartes CIB & Edahabia</h4>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Réglez en toute sécurité directement sur notre passerelle web dédiée en utilisant votre carte interbancaire nationale (CIB) ou la carte Edahabia d'Algérie Poste. 
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-900 text-[11px] text-slate-500">
              • Rechargement instantané du compte
            </div>
          </div>

          {/* Card 2: BaridiMob */}
          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded-md">Option 2</span>
                <Smartphone className="w-6 h-6 text-teal-400" />
              </div>
              <h4 className="font-semibold text-slate-200 text-sm">Application BaridiMob</h4>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Effectuez un transfert direct via BaridiMob. Entrez simplement notre RIP de compte de plateforme d’Algérie Poste, saisissez le montant de la séance et soumettez la capture d'écran.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-900 text-[11px] text-teal-400 bg-teal-500/5 px-2 py-1 rounded">
              RIP : <span className="font-mono text-slate-200 select-all font-bold">00799999002233445566</span>
            </div>
          </div>

          {/* Card 3: CCP Traditional */}
          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md">Option 3</span>
                <Landmark className="w-6 h-6 text-amber-400" />
              </div>
              <h4 className="font-semibold text-slate-200 text-sm font-sans">Versement CCP Classique</h4>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Vous préférez les bureaux physiques ? Effectuez un dépôt postal directement sur notre Compte CCP. Prenez en photo le reçu de versement estampillé par Algérie Poste.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-900 text-[11px] text-slate-500">
              CCP : Compte <span className="font-mono text-slate-200 font-bold">2102931 / Clé 49</span>
            </div>
          </div>
        </div>
      </section>
      
    </div>
  );
}
