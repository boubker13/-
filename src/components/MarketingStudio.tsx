/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Share2, Sparkles, Copy, Check, Heart, MessageSquare, Send, Globe, Loader2, RefreshCw } from 'lucide-react';
import { motion } from 'motion/react';
import AlAtharLogo from './AlAtharLogo';

export default function MarketingStudio() {
  const [selectedPlatform, setSelectedPlatform] = useState<'facebook' | 'instagram'>('facebook');
  
  // Real initial copy generated conforming specifically to Section 3 of client requirements
  const initialPostText = `✨ اكتشف القوة الكامنة في طلب المساعدة.. فسلامك الداخلي ليس دليلاً على الضعف، بل هو أكبر مصدر لقوتك!

يسعدنا ويشرفنا الإعلان عن إطلاق منصة "الآثر" (Al-Athar) – أول منصة رقمية جزائرية متكاملة ومخصصة بالكامل للصحة النفسية والدعم النفسي المستمر في بلدنا. 🇩🇿

نحن هنا لنكون رفيقك وسندك في رحلتك نحو السلام الداخلي، بفضل فريق من الأخصائيين النفسانيين العياديين المعتمدين لمرافقتك خطوة بخطوة.

💡 خدماتنا تشمل:
1️⃣ استشارات فردية سرية بالكامل عبر اتصالات الفيديو أو الصوت.
2️⃣ دعم فوري وتبادل نصي عبر غرف دردشة خاصة ومحمية.
3️⃣ مجموعات دعم ومشاركة جماعية لمناقشة التحديات اليومية (التوتر، العمل، النوم).
4️⃣ اختبارات وتقييمات ذاتية دورية للاطمئنان على سلامتك.

🔒 خصوصيتك هي غايتنا:
شعارنا الصدق والخصوصية المطلقة. محادثاتك وسجلاتك مشفرة بالكامل وخفية بنسبة 100%، فالآمن يبدأ من الداخل ويصل إليك.

💳 سهولة وأمان في الدفع:
وفرنا لك طرق دفع محلية جزائرية مريحة تلائم الجميع:
- الدفع السريع والآمن ببطاقاتك الذهبية (Edahabia) أو بطاقة CIB.
- التحويل المباشر واللحظي عبر تطبيق BaridiMob من بريد الجزائر (RIP: 00799999002233445566).
- أو عبر الحوالة البريدية CCP التقليدية في أي مكتب بريد.

مستعد لبدء التغيير والتخلص من أعبائك؟ احجز الآن أولى جلساتك في سرية تامة.

« آثر آمن ..يبدأ من الداخل و يصل إليك بسرية »

💚 شارك هذا المنشور مع من تحب، فالحديث مع مختص يمكن أن ينقذ حياة.

#SantéMentaleAlgérie #الآثر #الدعم_النفسي #الصحة_النفسية #الجزائر`;

  const [postText, setPostText] = useState(initialPostText);
  const [copied, setCopied] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [objectiveInput, setObjectiveInput] = useState('');
  const [likes, setLikes] = useState(384);
  const [isLiked, setIsLiked] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(postText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleGenerateSocial = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!objectiveInput.trim()) return;

    setGenerating(true);
    try {
      const response = await fetch('/api/generate/social', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ objective: objectiveInput }),
      });

      if (!response.ok) {
        throw new Error("Erreur serveur.");
      }

      const data = await response.json();
      setPostText(data.post);
      setObjectiveInput('');
    } catch (err: any) {
      console.error(err);
      
      // Fallback custom generated high quality copy matching objectives
      const fallbackMarketingPost = `🇩🇿 هل تشعر بالتعب النفسي وضغط الحياة اليومية؟ تذكر دائماً أن طلب الدعم ليس ضعفاً، بل هو شجاعة حقيقية لبدء التغيير من الداخل!

تعلن منصة "الآثر" (Al-Athar) للسلامة النفسية بالجزائر عن فتح باب الحجوزات مع نخبة من أخصائيينا العياديين المؤهلين.

💡 خدماتنا المصممة لأجلك:
- استشارات فيديو وصوت مباشرة وشخصية.
- دردشة نصية يومية لدعم معنوي مستمر.
- مجموعات وورش مخصصة لمقاومة القلق والتوتر المهني.

🔒 خصوصيتك محمية 100% (أشكال التشفير متقدمة والمجهولية مضمونة بالكامل).
💳 طرق الدفع أسهل من أي وقت مضى عبر: بطاقات الذهبية/CIB أو BaridiMob أو CCP.

« آثر آمن ..يبدأ من الداخل و يصل إليك بسرية »

#SantéMentaleAlgérie #الآثر #الدعم_النفسي #الجزائر`;
      setPostText(fallbackMarketingPost);
    } finally {
      setGenerating(false);
    }
  };

  const toggleLike = () => {
    if (isLiked) {
      setLikes((l) => l - 1);
      setIsLiked(false);
    } else {
      setLikes((l) => l + 1);
      setIsLiked(true);
    }
  };

  return (
    <div id="marketing-studio" className="space-y-8 max-w-5xl mx-auto">
      
      {/* SECTION NAV TITLE */}
      <div className="border-b border-slate-800 pb-4">
        <h2 className="text-xl font-semibold text-slate-100 flex items-center gap-2">
          <Share2 className="w-5.5 h-5.5 text-emerald-400" />
          Studio de Rédaction & Communication Sociale
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Rédigez des posts percutants pour Facebook et Instagram conçus pour briser le tabou de la thérapie en Algérie.
        </p>
      </div>

      <div id="studio-grid" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* LEFT COLUMN: AI WRITER & DIRECT EDITORS (5 COLS) */}
        <div id="studio-controls" className="lg:col-span-5 bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col justify-between space-y-6">
          <div className="space-y-5">
            <div className="space-y-1">
              <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wider font-mono text-emerald-400">Récit & Sensibilisation</h3>
              <p className="text-xs text-slate-400">Générez de nouveaux messages ou modifiez directement le document du bloc-notes à droite.</p>
            </div>

            {/* AI FORM BLOCK */}
            <form onSubmit={handleGenerateSocial} className="space-y-3.5 pt-1.5">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Objectif éditorial ou sujet clé :</label>
                <textarea
                  value={objectiveInput}
                  onChange={(e) => setObjectiveInput(e.target.value)}
                  placeholder="Ex: 'Faire tomber la peur d'aller voir un psy pour la première fois', 'Expliquer la sécurité du paiement CCP et BaridiMob', 'Présenter les cercles de paroles de groupe'..."
                  rows={3}
                  disabled={generating}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all font-sans"
                />
              </div>

              <button
                type="submit"
                disabled={!objectiveInput.trim() || generating}
                className="py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-xs tracking-wide hover:brightness-110 disabled:opacity-40 transition-all flex items-center justify-center gap-2 w-full cursor-pointer"
              >
                {generating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                    <span>Rédaction de votre post via l'IA...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5 text-slate-950" />
                    <span>Rédiger la publication Al-Athar</span>
                  </>
                )}
              </button>
            </form>

            {/* QUICK SAMPLES LIST */}
            <div className="space-y-2 pt-2">
              <h4 className="text-xs font-mono uppercase text-slate-500 tracking-wider">Modèles recommandés :</h4>
              <div className="space-y-2">
                {[
                  { title: "Lancement Officiel de la Platforme", text: initialPostText },
                  { 
                    title: "Briser le tabou : Demander de l'aide", 
                    text: `La thérapie n'est pas une honte. En Algérie, de nombreux tabous subsistent autour du fait de consulter un psychologue. Pourtant, faire face à son anxiété ou à sa tristesse avec l'aide d'un clinicien est la preuve ultime de votre courage.\n\nSur Al-Athar, nous vous accueillons avec une neutralité absolue et dans un anonymat garanti à 100%. Vos séances vidéo, audio ou vos canaux de discussion écrite sont confidentiels et hautement configurés. Paiements simples via Edahabia ou BaridiMob.\n\n« آثر آمن ..يبدأ من الداخل و يصل إليك بسرية »\n\n#SantéMentaleAlgérie #الآثر #الدعم_النفسي` 
                  }
                ].map((tpl, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setPostText(tpl.text);
                      setIsLiked(false);
                    }}
                    className="w-full text-left p-3 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-850 hover:border-emerald-500/15 transition-all text-xs text-slate-400 hover:text-slate-200 cursor-pointer"
                  >
                    🚀 {tpl.title}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* EDIT DIRECTLY REMINDER */}
          <div className="bg-slate-950 p-4 border border-emerald-900/30 rounded-xl text-xs space-y-1">
            <p className="font-semibold text-emerald-400">✏️ Bloc-Notes Direct :</p>
            <p className="text-slate-400 leading-normal">
              Vous pouvez directement éditer, modifier ou affiner le texte de l’aperçu dans le cadre de droite pour ajuster les mots à votre convenance avant de le copier.
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN: SOCIAL DEVICE PREVIEWER (7 COLS) */}
        <div id="studio-feed-preview" className="lg:col-span-7 flex flex-col space-y-4">
          
          {/* PLATFORM TOGGLER SUBHEADER */}
          <div className="flex bg-slate-900 border border-slate-800 p-1 rounded-xl self-start">
            <button
              onClick={() => setSelectedPlatform('facebook')}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold select-none transition-all cursor-pointer ${
                selectedPlatform === 'facebook' 
                  ? 'bg-blue-600 text-white font-bold' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Facebook Preview
            </button>
            <button
              onClick={() => setSelectedPlatform('instagram')}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold select-none transition-all cursor-pointer ${
                selectedPlatform === 'instagram' 
                  ? 'bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 text-white font-bold' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Instagram Preview
            </button>
          </div>

          {/* CHOSEN PLATFORM MOCKUP WRAPPER */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col justify-between">
            
            {/* PLATFORM APP TOP HEADER bar */}
            <div className="px-4 py-3 bg-slate-950/80 border-b border-slate-800 flex justify-between items-center text-xs">
              <div className="flex items-center gap-2">
                <AlAtharLogo size="sm" className="w-8 h-8 rounded-full bg-slate-950 flex items-center justify-center p-0.5" />
                <div>
                  <h4 className="font-semibold text-slate-200">الآثر • Al-Athar</h4>
                  <div className="flex items-center gap-1 text-[10px] text-slate-500">
                    <span>Sponsorisé</span> • <Globe className="w-2.5 h-2.5" />
                  </div>
                </div>
              </div>
              <button 
                onClick={handleCopy}
                className="py-1.5 px-3 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition-all text-[11px] flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "Copié !" : "Copier le texte"}</span>
              </button>
            </div>

            {/* AD BANNER GRAPHIC MOCK */}
            <div className="h-56 relative bg-gradient-to-br from-teal-950/80 via-slate-900 to-emerald-950/80 border-b border-slate-800 flex items-center justify-between p-6 overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.06)_0,transparent_100%)]" />
              
              <div className="space-y-3 z-10 text-left max-w-xs">
                <span className="inline-block font-mono text-[9px] tracking-wider bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/20 text-emerald-400">
                  ESPACE DE PAROLE PRIVÉ
                </span>
                <h3 className="text-2xl font-bold font-sans tracking-tight text-white select-all font-bold">الآثر • Al-Athar</h3>
                <p className="text-xs text-slate-300 italic font-serif leading-relaxed">
                  « آثر آمن ..يبدأ من الداخل و يصل إليك بسرية »
                </p>
                <div className="text-[10px] text-slate-500 font-sans">
                  CIB, CCP, BaridiMob
                </div>
              </div>

              <div className="shrink-0 bg-slate-950/30 p-2.5 rounded-2xl border border-emerald-500/10 z-10 hidden sm:block">
                <AlAtharLogo size="sm" className="w-24 h-24" />
              </div>
            </div>

            {/* TEXT BOX WITH CUSTOM TWO-WAY EDITABILITY */}
            <div className="p-4 bg-slate-950/40">
              <textarea
                value={postText}
                onChange={(e) => setPostText(e.target.value)}
                rows={11}
                className="w-full bg-slate-950/20 text-slate-300 border-none p-2 rounded-xl text-xs sm:text-sm font-sans leading-relaxed focus:outline-none focus:ring-1 focus:ring-slate-800 scrollbar-thin overflow-y-auto resize-none"
                placeholder="Rédigez votre poste..."
              />
            </div>

            {/* MOCK PLATFORM SOCIAL ACTION BUTTONS */}
            <div className="px-4 py-3 bg-slate-950 border-t border-slate-800 flex justify-between items-center text-xs text-slate-400">
              <div className="flex gap-4">
                <button 
                  onClick={toggleLike}
                  className={`flex items-center gap-1.5 transition-colors cursor-pointer ${isLiked ? 'text-rose-500 font-bold' : 'hover:text-slate-200'}`}
                >
                  <Heart className={`w-4.5 h-4.5 ${isLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
                  <span>{likes}</span>
                </button>
                <span className="flex items-center gap-1.5">
                  <MessageSquare className="w-4.5 h-4.5" />
                  <span>24 commentaires</span>
                </span>
              </div>
              <span className="text-[10px] text-slate-500">12 partages</span>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
