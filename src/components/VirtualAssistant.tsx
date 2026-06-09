/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { Send, ArrowRight, Sparkles, User, ShieldAlert, HeartHandshake, Loader2, RefreshCw } from 'lucide-react';
import { motion } from 'motion/react';
import { Message } from '../types';

export default function VirtualAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: "Marhaban bikoum! مرحباً بك على منصة الآثر للسلام النفسي. 🌸\n\nJe suis votre assistant d'accueil virtuel dédié. Mon rôle est de vous écouter sans jugement, de vous orienter avec douceur et de répondre à toutes vos interrogations sur notre plateforme. Tout ce que vous écrivez ici reste strictement anonyme et chiffré.\n\nمن فضلك، كيف يمكنني مساعدتك أو توجيهك اليوم؟",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Suggested quick prompts in Arabic and French
  const quickPrompts = [
    { text: "هل الجلسات سرية ومجهولة الهوية؟", category: "Sécurité" },
    { text: "Quels sont les tarifs et comment payer par BaridiMob ?", category: "Paiement" },
    { text: "Comment programmer une consultation vidéo avec un psy ?", category: "Rendez-vous" },
    { text: "أريد القيام باختبار تقييم التوتر الحالات النفسية", category: "Auto-évaluation" }
  ];

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: Message = {
      id: `msg-${Date.now()}-user`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMsg].map((m) => ({
            sender: m.sender,
            text: m.text
          }))
        }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Une erreur s'est produite.");
      }

      const data = await response.json();
      
      const botMsg: Message = {
        id: `msg-${Date.now()}-bot`,
        sender: 'bot',
        text: data.text,
        timestamp: new Date()
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (error: any) {
      console.error("Error chatting with Al-Athar chatbot:", error);
      
      // Detailed reassuring fallback explanation inside the chat widget
      const alertErrorMessage = error.message && error.message.includes("GEMINI_API_KEY")
        ? "أهلاً بك! يرجى تهيئة مفتاح الآلة (GEMINI_API_KEY) لتفعيل الذكاء الاصطناعي بشكل كامل. حالياً، يمكنك طرح أسئلتك أو تجربة الأزرار السريعة."
        : "Nous rencontrons un problème de connexion temporaire.";

      setErrorMessage(alertErrorMessage);

      // Add a warm simulated fallback response matching therapist's guidelines
      setTimeout(() => {
        const fallbackBotMsg: Message = {
          id: `msg-${Date.now()}-fallback`,
          sender: 'bot',
          text: `[Service d'Orientation Al-Athar]\n\nJe comprends tout à fait vos préoccupations. En tant qu'assistant de la plateforme الآثر, je tiens à vous rappeler que :\n\n1. 🔒 Tous vos échanges sont 100% sécurisés et confidentiels conformément à notre slogan : « آثر آمن ..يبدأ من الداخل و يصل إليك بسرية ».\n2. 💳 Notre mode de paiement supporte pleinement les cartes nationales CIB/Edahabia, le CCP traditionnel, ainsi que les transferts simples et rapides via l'application BaridiMob d'Algérie Poste (RIP: 00799999002233445566).\n3. 🩺 Nous proposons des consultations thérapeutiques vidéo individuelles avec des experts agréés, des groupes de paroles, et des exercices psycho-corporels de respiration.\n\nComment aimeriez-vous progresser aujourd'hui ?`,
          timestamp: new Date()
        };
        setMessages((prev) => [...prev, fallbackBotMsg]);
        setLoading(false);
      }, 1000);
    } finally {
      if (!errorMessage) {
        setLoading(false);
      }
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSend(input);
  };

  return (
    <div id="virtual-assistant" className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-140px)] min-h-[600px]">
      
      {/* SIDEBAR CONTEXT GUIDE */}
      <div id="chatbot-context" className="lg:col-span-4 bg-slate-900 rounded-2xl p-6 border border-slate-800 flex flex-col justify-between hidden lg:flex">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-200">Conseiller d'Orientation</h3>
              <p className="text-xs text-slate-400">Rôle de l'accueil Al-Athar</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-slate-950 p-4 rounded-xl border border-teal-950 text-xs text-slate-300 leading-relaxed">
              <p className="font-semibold text-emerald-400 mb-1">📢 Charte de non-diagnostic</p>
              L'assistant virtuel accueille de manière empathique mais <strong className="text-white">ne remplace jamais un psychologue clinicien</strong>. Son but est d'écouter brièvement vos besoins afin de vous proposer le service Al-Athar le plus adapté.
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-mono uppercase text-slate-500 tracking-wider">Ce que vous pouvez demander :</h4>
              <ul className="text-xs text-slate-400 space-y-2.5">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-0.5">•</span>
                  <span>Comment fonctionnent les séances de thérapie vidéo ?</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-0.5">•</span>
                  <span>Quelles sont les garanties d'anonymat pour un jeune en Algérie ?</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-0.5">•</span>
                  <span>Quelles sont les modalités de rechargement CCP ?</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* SECURITY REMINDER */}
        <div className="bg-gradient-to-r from-teal-950 to-slate-950 p-4 rounded-xl border border-emerald-500/10">
          <p className="text-[11px] text-slate-400 italic text-center">
            « آثر آمن ..يبدأ من الداخل و يصل إليك بسرية »
          </p>
        </div>
      </div>

      {/* CHAT INTERFACE CONTAINER */}
      <div id="chat-interface" className="lg:col-span-8 bg-slate-900 rounded-2xl border border-slate-800 flex flex-col overflow-hidden">
        
        {/* CHAT STATUS HEADER */}
        <div id="chat-header" className="px-5 py-4 bg-slate-950/60 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-9 h-9 rounded-full bg-emerald-500/15 flex items-center justify-center text-emerald-400 text-sm font-bold">
                آ
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-slate-950 rounded-full animate-pulse" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-slate-200">الآثر • Accueil</h4>
              <p className="text-[10px] text-emerald-400 font-mono">Confidentiel & Anonyme</p>
            </div>
          </div>
          <button 
            type="button"
            onClick={() => setMessages([messages[0]])}
            className="text-slate-500 hover:text-slate-300 p-1.5 rounded-lg hover:bg-slate-800 transition-colors"
            title="Réinitialiser la conversation"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* API KEY EMPTY NOTIFICATION */}
        {errorMessage && (
          <div id="error-alert" className="px-5 py-3 bg-teal-950/40 border-b border-teal-500/20 text-xs text-teal-300 flex items-center gap-2.5">
            <ShieldAlert className="w-4 h-4 shrink-0 text-emerald-400" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* MESSAGE AREA */}
        <div id="message-scroller" className="flex-1 p-5 overflow-y-auto space-y-4 font-sans text-sm scrollbar-thin scrollbar-thumb-slate-800">
          {messages.map((msg) => {
            const isBot = msg.sender === 'bot';
            return (
              <div
                key={msg.id}
                id={`chat-msg-${msg.id}`}
                className={`flex gap-3.5 max-w-[85%] ${isBot ? 'mr-auto' : 'ml-auto flex-row-reverse'}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                  isBot ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/20' : 'bg-slate-800 text-slate-300'
                }`}>
                  {isBot ? <span className="font-bold text-xs">آ</span> : <User className="w-4 h-4" />}
                </div>
                
                <div className="space-y-1">
                  <div className={`p-4 rounded-2xl whitespace-pre-wrap leading-relaxed ${
                    isBot 
                      ? 'bg-slate-950 text-slate-200 rounded-tl-none border border-slate-800/80 shadow-md' 
                      : 'bg-emerald-600 text-white rounded-tr-none shadow-sm'
                  }`}>
                    {msg.text}
                  </div>
                  <div className={`text-[10px] text-slate-500 font-mono ${!isBot && 'text-right'}`}>
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            );
          })}

          {/* LOADING STATE INDICATOR */}
          {loading && (
            <div id="bot-typing-indicator" className="flex gap-3.5 max-w-[80%] mr-auto">
              <div className="w-8 h-8 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/20 flex items-center justify-center shrink-0">
                <span className="font-bold text-xs">آ</span>
              </div>
              <div className="bg-slate-950 text-slate-400 p-4 rounded-2xl rounded-tl-none border border-slate-800 flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-emerald-400" />
                <span className="text-xs italic font-mono">Al-Athar cherche à vous orienter...</span>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* SUGGESTED CHIPS PANEL */}
        <div id="chat-suggestions" className="px-5 py-3 border-t border-slate-800/60 bg-slate-950/20 flex gap-2 overflow-x-auto whitespace-nowrap scrollbar-none">
          {quickPrompts.map((prompt, index) => (
            <button
              key={index}
              onClick={() => handleSend(prompt.text)}
              className="px-3.5 py-1.5 rounded-full bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs text-slate-300 hover:text-emerald-300 transition-all font-sans cursor-pointer focus:outline-none"
            >
              <span className="font-mono text-[9px] uppercase tracking-wider text-emerald-500/60 mr-1.5 font-bold">[{prompt.category}]</span>
              {prompt.text}
            </button>
          ))}
        </div>

        {/* INPUT PANEL */}
        <form id="chat-input-form" onSubmit={handleFormSubmit} className="p-4 bg-slate-950/60 border-t border-slate-800 flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
            placeholder="Écrivez un message ou posez une question..."
            className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:bg-slate-800 disabled:text-slate-600 text-slate-950 font-semibold text-sm transition-all flex items-center gap-2 cursor-pointer shadow-md shadow-emerald-500/10"
          >
            <span>Envoyer</span>
            <Send className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
}
