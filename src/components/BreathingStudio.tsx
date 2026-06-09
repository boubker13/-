/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Compass, Sparkles, Play, Square, RefreshCcw, Eye, BookOpen, Clock, Loader2, ArrowUp, ArrowDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function BreathingStudio() {
  // Breathing States: 'idle' | 'inhale' | 'hold' | 'exhale'
  const [breathState, setBreathState] = useState<'idle' | 'inhale' | 'hold' | 'exhale'>('idle');
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [completedCycles, setCompletedCycles] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [activeTab, setActiveTab] = useState<'guide' | 'script'>('guide');

  // Script Generator States
  const [scriptTopic, setScriptTopic] = useState('');
  const [scriptGenerating, setScriptGenerating] = useState(false);
  const [scriptOutput, setScriptOutput] = useState<string>('');
  const [isTeleprompterMode, setIsTeleprompterMode] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // 4-7-8 Technique specifications: Inhale 4s, Hold 7s, Exhale 8s
  const stages = {
    inhale: { duration: 4, text: "Inhalez profondément par le nez • استنشق بهدوء", color: "bg-emerald-500", scale: 1.5 },
    hold: { duration: 7, text: "Retenez votre souffle • احبس أنفاسك", color: "bg-amber-500", scale: 1.5 },
    exhale: { duration: 8, text: "Expirez lentement par la bouche • ازفر ببطء", color: "bg-teal-500", scale: 1.0 }
  };

  const startBreathing = () => {
    setCompletedCycles(0);
    triggerState('inhale');
  };

  const stopBreathing = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setBreathState('idle');
    setSecondsLeft(0);
  };

  const triggerState = (state: 'inhale' | 'hold' | 'exhale') => {
    setBreathState(state);
    setSecondsLeft(stages[state].duration);
  };

  useEffect(() => {
    if (breathState === 'idle') return;

    timerRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          // Move to next state
          if (breathState === 'inhale') {
            triggerState('hold');
          } else if (breathState === 'hold') {
            triggerState('exhale');
          } else if (breathState === 'exhale') {
            // End of one full cycle
            setCompletedCycles((c) => c + 1);
            triggerState('inhale');
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [breathState]);

  const handleGenerateScript = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!scriptTopic.trim()) return;

    setScriptGenerating(true);
    try {
      const response = await fetch('/api/generate/script', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: scriptTopic }),
      });

      if (!response.ok) {
        throw new Error("Erreur serveur.");
      }

      const data = await response.json();
      setScriptOutput(data.script);
      setIsTeleprompterMode(true);
    } catch (err: any) {
      console.error(err);
      
      // Clinical video script template fallback
      const fallbackScript = `[SCÈNE - INTRODUCTION EMPATHIQUE - 0:00 - 0:30]
[Plan serré sur le psychologue, décor calme de la plateforme Al-Athar, lumière tamisée]
Psychologue : "Bonjour, je suis heureux de vous accueillir aujourd'hui sur la plateforme Al-Athar. S'il vous arrive d'être submergé(e) brusquement par une vague de panique ou un sentiment d'angoisse oppressant, rassurez-vous : ce que vous traversez est humain, temporaire, et vous êtes dans un endroit parfaitement sûr d'écoute. N'oubliez pas notre principe : « آثر آمن ..يبدأ من الداخل و يصل إليك بسرية »."

[EXERCICE GUIDÉ - LA RESPIRATION 4-7-8 - 0:30 - 2:30]
[Une bille de respiration animée s'affiche à côté, une douce musique s'enclenche dans la capsule]
Psychologue : "Prenez une posture assise confortable. Nous allons rétablir votre harmonie biologique grâce à la technique respiratoire 4-7-8."
Psychologue (voix apaisante, ralentie) : 
"Inspirez tranquillement par le nez pendant 4 secondes... [Inhale] 1, 2, 3, 4.
Maintenez maintenant l'air à l'intérieur, détendez vos épaules pendant 7 secondes... 1, 2, 3, 4, 5, 6, 7.
Enfin, de manière continue, expirez l'ensemble des soucis et tensions par la bouche pendant 8 secondes... [Exhale] 1, 2, 3, 4, 5, 6, 7, 8.
Répétez cela quatre cycles de suite..."

[CONCLUSION ET INVITATION - 2:30 - 3:00]
[Le psychologue sourit avec bienveillance, les coordonnées de la plateforme s'affichent]
Psychologue : "En calmant votre souffle, vous avez calmé votre système nerveux. Demander de l'aide n'est jamais un aveu de vulnérabilité, mais une preuve de courage et de force admirable. Si vous souhaitez rejoindre nos cercles de partage amicaux ou programmer un suivi vidéo intime et hautement sécurisé, l'équipe d'Al-Athar vous attend avec patience. Prenez soin de vous."`;
      
      setScriptOutput(fallbackScript);
      setIsTeleprompterMode(true);
    } finally {
      setScriptGenerating(false);
    }
  };

  return (
    <div id="breathing-studio" className="space-y-8 max-w-5xl mx-auto">
      
      {/* HEADER SECTION NAV */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-semibold text-slate-100 flex items-center gap-2">
            <Compass className="w-5.5 h-5.5 text-emerald-400" />
            Espace d'Apaisement & Scripts Éducatifs
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Rejoignez notre guide de cohérence cardiaque 4-7-8 ou rédigez des capsules vidéo d'éducation thérapeutique.
          </p>
        </div>

        <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab('guide')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'guide' 
                ? 'bg-emerald-500 text-slate-950 font-bold shadow' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Clock className="w-4 h-4" />
            Guide Respiratoire
          </button>
          <button
            onClick={() => setActiveTab('script')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'script' 
                ? 'bg-emerald-500 text-slate-950 font-bold shadow' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-4 h-4 text-emerald-950" />
            Scripts Vidéos
          </button>
        </div>
      </div>

      {/* SUB-TAB 1: GUIDED BREATHING INSTRUMENT */}
      {activeTab === 'guide' && (
        <div id="guide-pulse-box" className="p-6 lg:p-10 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col items-center justify-center text-center space-y-8 min-h-[500px]">
          
          <div className="space-y-2 max-w-lg">
            <h3 className="text-lg font-semibold text-slate-200">Respiration Thérapeutique Algorithmique 4-7-8</h3>
            <p className="text-xs text-slate-400">
              Inspirée du yoga pranayama, la méthode 4-7-8 apaise le rythme cardiaque, combat l'insomnie et bloque les crises d'angoisse en augmentant d'oxygène.
            </p>
          </div>

          {/* BREATHING CIRCLE METRONOME */}
          <div className="relative flex items-center justify-center h-64 w-64">
            
            {/* outer visual ripples */}
            <AnimatePresence>
              {breathState !== 'idle' && (
                <motion.div
                  key={breathState}
                  initial={{ scale: 0.8, opacity: 0.4 }}
                  animate={{ scale: stages[breathState].scale + 0.15, opacity: 0.0 }}
                  exit={{ opacity: 0 }}
                  transition={{ 
                    duration: stages[breathState].duration, 
                    ease: "easeInOut",
                    repeat: Infinity 
                  }}
                  className={`absolute h-40 w-40 rounded-full ${stages[breathState].color}/10 border border-emerald-500/20`}
                />
              )}
            </AnimatePresence>

            {/* Inner responsive circle */}
            <motion.div
              animate={{
                scale: breathState === 'idle' ? 1.0 : stages[breathState].scale
              }}
              transition={{
                duration: breathState === 'idle' ? 0.5 : stages[breathState].duration,
                ease: "easeInOut"
              }}
              className={`h-40 w-40 rounded-full flex flex-col items-center justify-center text-slate-950 shadow-2xl relative border-4 border-slate-950/65 ${
                breathState === 'idle' 
                  ? 'bg-slate-950 text-slate-300' 
                  : stages[breathState].color
              }`}
            >
              {breathState === 'idle' ? (
                <Compass className="w-10 h-10 text-emerald-400 animate-spin-slow" />
              ) : (
                <div className="text-center select-none font-sans">
                  {/* Big counter number */}
                  <span className="text-4xl font-extrabold font-mono tracking-tighter block">{secondsLeft}</span>
                  <span className="text-[10px] font-semibold tracking-wider uppercase block opacity-85">{breathState}</span>
                </div>
              )}
            </motion.div>
          </div>

          {/* STATE DIRECTIVES LABEL */}
          <div className="space-y-4">
            <div className="min-h-[44px] px-4 py-2 border border-slate-800 rounded-xl bg-slate-950/50 flex items-center justify-center text-center">
              <p className="text-xs md:text-sm font-medium text-slate-300">
                {breathState === 'idle' 
                  ? "Prêt(e) à commencer ? Installez-vous sur une chaise, le dos droit." 
                  : stages[breathState].text
                }
              </p>
            </div>

            {/* PROGRESS AND STATS INLINE */}
            <div className="flex items-center gap-6 justify-center text-xs font-mono text-slate-500">
              <div>
                Cycles Complétés : <span className="text-emerald-400 font-bold">{completedCycles}</span> <span className="opacity-60">/ 4 conseillés</span>
              </div>
            </div>
          </div>

          {/* CONTROLLERS ROW */}
          <div className="flex items-center gap-3">
            {breathState === 'idle' ? (
              <button
                onClick={startBreathing}
                className="py-3 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs md:text-sm transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-emerald-500/15"
              >
                <Play className="w-4.5 h-4.5 fill-slate-950 text-slate-950" />
                Démarrer la séance d’apaisement
              </button>
            ) : (
              <>
                <button
                  onClick={stopBreathing}
                  className="py-3 px-5 rounded-xl bg-rose-500 hover:bg-rose-400 text-white font-bold text-xs md:text-sm transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-rose-500/10"
                >
                  <Square className="w-4 h-4 fill-white text-white" />
                  Interrompre le cycle
                </button>
                <button
                  onClick={() => {
                    stopBreathing();
                    setTimeout(startBreathing, 200);
                  }}
                  className="p-3 rounded-xl bg-slate-950 text-slate-300 border border-slate-800 hover:bg-slate-800 transition-all cursor-pointer"
                  title="Recommencer"
                >
                  <RefreshCcw className="w-4 h-4" />
                </button>
              </>
            )}
          </div>

        </div>
      )}

      {/* SUB-TAB 2: AI CLINICAL SCRIPT BUILDER WITH TELEPROMPTER */}
      {activeTab === 'script' && (
        <div id="script-workspace" className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[700px]">
          
          {/* CONTROL GENERATOR FORM ROW */}
          <div className="lg:col-span-5 bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col justify-between h-full">
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-slate-200">Créateur de Script pour Vidéo Psycho-éducative</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Générez un canevas de script thérapeutique de 3 minutes prêt à enregistrer, écrit sous la direction d'Al-Athar pour briser les tabous et outiller les patients.
                </p>
              </div>

              <form onSubmit={handleGenerateScript} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Sujet de la vidéo guidée :</label>
                  <textarea
                    value={scriptTopic}
                    onChange={(e) => setScriptTopic(e.target.value)}
                    placeholder="Ex: 'Comment désamorcer une crise d'angoisse en public par la méthode 4-7-8', 'Pourquoi la thérapie n'est pas une honte', 'Accepter sa fatigue mentale'..."
                    rows={4}
                    disabled={scriptGenerating}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl px-4 py-3 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all font-sans"
                  />
                </div>

                <button
                  type="submit"
                  disabled={!scriptTopic.trim() || scriptGenerating}
                  className="py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-semibold text-xs md:text-sm tracking-wide hover:brightness-110 disabled:opacity-45 transition-all flex items-center justify-center gap-2 w-full cursor-pointer"
                >
                  {scriptGenerating ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Rédaction du script thérapeutique...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-slate-950" />
                      <span>Rédiger le script (3 min)</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* RECOMMENDATIONS BOX */}
            <div className="p-4 rounded-xl bg-slate-950/60 border border-teal-950 text-[11px] text-slate-400 space-y-2">
              <p className="font-semibold text-emerald-400 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                Recommandations éditoriales Al-Athar :
              </p>
              <ul className="list-disc pl-4 space-y-1 font-sans">
                <li>Conservez un débit ralenti pour de l'apaisement</li>
                <li>Incluez toujours des repères de respiration</li>
                <li>Intégrez le slogan comme ancrage de réassurance</li>
              </ul>
            </div>
          </div>

          {/* TELEPROMPTER WRAPPER */}
          <div className="lg:col-span-7 bg-slate-950 border border-slate-800 rounded-2xl flex flex-col justify-between overflow-hidden h-full">
            <div className="px-5 py-3.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
                <span className="text-xs font-semibold text-slate-300">STUDIO TELEPROMPT AL-ATHAR</span>
              </div>
              <span className="text-[10px] font-mono text-slate-500">Aperçu Défilement Éducatif</span>
            </div>

            {/* SCREEN VIEWPORT */}
            <div className="flex-1 p-6 overflow-y-auto leading-relaxed text-sm select-none scrollbar-thin scrollbar-thumb-teal-950">
              {scriptOutput ? (
                <div className="space-y-6 text-slate-300 font-sans p-2">
                  {scriptOutput.split('\n\n').map((para, pIdx) => {
                    const isDirection = para.startsWith('[') && para.endsWith(']');
                    return (
                      <p 
                        key={pIdx} 
                        className={`text-slate-300 ${
                          isDirection 
                            ? 'text-xs text-emerald-400 bg-emerald-950/20 px-3 py-1.5 rounded-lg border border-emerald-500/10 font-mono italic' 
                            : 'font-serif text-sm md:text-base leading-relaxed'
                        }`}
                      >
                        {para}
                      </p>
                    );
                  })}
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-3">
                  <BookOpen className="w-12 h-12 text-slate-700" />
                  <p className="text-sm text-slate-500 max-w-sm">
                    Aucun script généré pour l'instant. Saisissez une thématique à gauche pour rédiger le script de votre atelier psycho-éducatif.
                  </p>
                </div>
              )}
            </div>

            {/* CONTROL BAR */}
            <div className="px-5 py-3.5 bg-slate-900 border-t border-slate-800 text-xs text-slate-500 flex justify-between items-center">
              <span>Rôle: Clinique & Sensibilisation</span>
              <span>« آثر آمن ..يبدأ من الداخل »</span>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
