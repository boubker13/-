/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: Date;
}

export interface Question {
  id: number;
  text: string;
  textAr?: string;
  points: number; // For stress scoring
}

export interface Quiz {
  id: string;
  title: string;
  titleAr?: string;
  description: string;
  questions: Question[];
}

export interface ScriptGenerated {
  title: string;
  introduction: string;
  steps: { title: string; text: string }[];
  conclusion: string;
}

export interface MarketingPost {
  id: string;
  platform: 'facebook' | 'instagram';
  text: string;
  imageTheme: string;
  likes: number;
  comments: number;
  shares: number;
}
