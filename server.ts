import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize GoogleGenAI SDK lazily as recommended to prevent startup crashes if GEMINI_API_KEY is not defined yet.
let aiClient: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is required. Please set it in Settings > Secrets.");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// 1. CHATBOT ENDPOINT with System Prompt
app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      res.status(400).json({ error: "Invalid messages array." });
      return;
    }

    const ai = getAiClient();

    // Map messages into Gemini SDK format
    // Ensure we send structured conversational contents
    const contents = messages.map((m: any) => ({
      role: m.sender === "user" ? "user" : "model",
      parts: [{ text: m.text }]
    }));

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents,
      config: {
        systemInstruction: "Tu es l'assistant virtuel d'accueil de la plateforme algérienne de santé mentale 'الآثر' (Al-Athar). Ton rôle est d'accueillir les utilisateurs avec une extrême empathie, de la douceur et de la bienveillance (sans aucun jugement). Ta priorité absolue est de rassurer l'utilisateur sur la confidentialité totale (100% anonyme, chiffré) et la sécurité de notre plateforme, conformément au slogan de la plateforme :\n'آثر آمن ..يبدأ من الداخل و يصل إليك بسرية'\n\nRègle stricte et incontournable : Tu n'es PAS un thérapeute. Tu ne dois JAMAIS poser de diagnostic, proposer de prescription médicale ou donner des conseils de traitement. Ton but est uniquement d'écouter brièvement et chaleureusement le besoin de l'utilisateur, de l'orienter vers l'un des nos services :\n- Consultation par appel vidéo avec un vrai psychologue agréé\n- Échanges par chat textuel privé de soutien\n- Tests d'auto-évaluation en ligne (comme le test de stress au travail)\n- Groupes de soutien thématiques\n\nTu dois également clarifier la simplicité des modalités de paiement s'ils demandent (CIB, CCP ou application BaridiMob de Algérie Poste).\n\nRéponds de manière concise, très humaine et douce, dans un langage chaleureux. S'ils écrivent en arabe (darija ou classique), réponds en arabe. S'ils écrivent en français, réponds en français. Surtout, favorise un sentiment d'écoute authentique.",
        temperature: 0.7,
      },
    });

    const text = response.text || "Désolé, je n'ai pas pu générer de réponse pour le moment.";
    res.json({ text });
  } catch (error: any) {
    console.error("Error in /api/chat:", error);
    res.status(500).json({ error: error.message || "Une erreur s'est produite lors de la connexion à l'IA." });
  }
});

// 2. EDUCATIONAL CONTENT GENERATOR (Quiz / Self-Assessment Generator)
app.post("/api/generate/quiz", async (req, res) => {
  try {
    const { focus } = req.body;
    const ai = getAiClient();

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: `Agis en tant que psychologue clinicien. Rédige un test d'auto-évaluation court (7 questions à choix multiples) pour aider un utilisateur à identifier son niveau de ${focus || "stress ou d'anxiété lié au travail"}. 
      Les questions doivent être simples, bienveillantes, et accessibles en français et en arabe. 
      Pour chaque question, fournis 3 options de réponse avec des points correspondants (ex: 1, 2, 3 points).
      À la fin de la réponse générée, intègre un message de conclusion chaleureux précisant que ce test ne remplace pas un avis clinique professionnel et suggère de réserver une écoute privée sur la plateforme 'الآثر' (Al-Athar).
      Renvoie la réponse sous forme de JSON en utilisant le schéma suivant:
      {
        "title": "Nom du test",
        "description": "Courte description",
        "questions": [
          {
            "id": 1,
            "text": "Question en français",
            "textAr": "Question en arabe",
            "options": [
              {"text": "Option 1 en français / arabe", "points": 1},
              {"text": "Option 2 en français / arabe", "points": 2},
              {"text": "Option 3 en français / arabe", "points": 3}
            ]
          }
        ],
        "conclusion": "Message de conclusion bienveillant"
      }`,
      config: {
        responseMimeType: "application/json",
      }
    });

    res.json(JSON.parse(response.text || "{}"));
  } catch (error: any) {
    console.error("Error in /api/generate/quiz:", error);
    res.status(500).json({ error: error.message || "Impossible de générer le quiz." });
  }
});

// 3. THERAPEUTIC SCRIPT GENERATOR
app.post("/api/generate/script", async (req, res) => {
  try {
    const { topic } = req.body;
    const ai = getAiClient();

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: `Rédige un script complet et engageant de 3 minutes pour une vidéo ou un podcast thérapeutique conçu pour la plateforme algérienne 'الآثر'. 
      Thème : ${topic || "Comment gérer une crise de panique grâce à la respiration guidée"}.
      Le ton doit être calme, hautement rassurant et professionnel.
      Structure le script très précisément avec :
      1. Introduction empathique (environ 30s)
      2. Exercice ou démonstration pratique étape par étape, comme la technique de respiration 4-7-8 ou la cohérence cardiaque (environ 2 min)
      3. Clôture douce invitant à s'abonner et à rejoindre nos groupes de soutien psychologique privés sur Al-Athar (environ 30s).
      
      Rends-le vivant en insérant des directives de mise en scène ou de voix (ex: [Prendre une inspiration calme], [Parler encore plus lentement]).`,
    });

    res.json({ script: response.text });
  } catch (error: any) {
    console.error("Error in /api/generate/script:", error);
    res.status(500).json({ error: error.message || "Opération échouée." });
  }
});

// 4. SOCIAL MEDIA POST GENERATOR
app.post("/api/generate/social", async (req, res) => {
  try {
    const { objective } = req.body;
    const ai = getAiClient();

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: `Rédige un post de marketing à fort impact émotionnel pour Facebook et Instagram destiné à faire connaître la plateforme de santé mentale 'الآثر' en Algérie.
      Objectif de la publication : ${objective || "briser le tabou du recours à un psy"}.
      Directives strictes :
      - Rappelle avec finesse et compassion que solliciter de l'aide psychologique est un acte de force et de courage.
      - Mentionne explicitement nos principaux services de consultations anonymes (appel vidéo, audio ou chat privé sécurisé) et nos groupes de soutien thématiques.
      - Rassure à 100% sur la confidentialité absolue.
      - Mentionne la simplicité des paiements locaux en Algérie : cartes CIB, compte CCP, ou transfert instantané par l'application BaridiMob.
      - Intègre obligatoirement notre slogan de marque : 'آثر آمن ..يبدأ من الداخل و يصل إليك بسرية'.
      - Ajoute des émojis adéquats et des hashtags pertinents comme #SantéMentaleAlgérie, #الآثر et #الدعم_النفسي.`,
    });

    res.json({ post: response.text });
  } catch (error: any) {
    console.error("Error in /api/generate/social:", error);
    res.status(500).json({ error: error.message || "Erreur lors de la rédaction de la publication." });
  }
});

// Integrations middleware for DEV vs PRODUCTION
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    // Dynamically import Vite server in development
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running beautifully on http://localhost:${PORT}`);
  });
}

startServer();
