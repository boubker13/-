/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface LogoProps {
  className?: string;
  showSlogan?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export default function AlAtharLogo({ className = '', showSlogan = false, size = 'md' }: LogoProps) {
  // Size resolver
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-32 h-32',
    lg: 'w-48 h-48',
    xl: 'w-64 h-64',
  };

  return (
    <div className={`flex flex-col items-center justify-center text-center ${className}`}>
      {/* SVG Vector Logo */}
      <svg 
        id="al-athar-logo-svg"
        viewBox="0 0 400 450" 
        className={`${sizeClasses[size]} h-auto drop-shadow-xl`}
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Gradients to match the colors of the calligraphy */}
          <linearGradient id="calligraphyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" /> {/* Emerald */}
            <stop offset="50%" stopColor="#047857" /> {/* Dark emerald */}
            <stop offset="100%" stopColor="#064e3b" /> {/* Deep forest */}
          </linearGradient>
          
          <linearGradient id="psiGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f8fafc" /> {/* Slate 50 */}
            <stop offset="100%" stopColor="#cbd5e1" /> {/* Slate 300 */}
          </linearGradient>

          {/* Profile shadows for depth */}
          <filter id="subtleShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#000000" floodOpacity="0.25" />
          </filter>
        </defs>

        {/* 1. ARABIC CALLIGRAPHY "الآثر" (Styled atop) */}
        <g id="calligraphy-word-group" transform="translate(0, -5)">
          {/* Stylized custom bezier arcs representing Al-Athar word "الآثر" */}
          {/* Alef */}
          <path 
            d="M 230 40 C 230 40, 222 65, 215 95 C 214 100, 218 102, 222 98 C 228 92, 235 75, 235 48 C 235 42, 232 40, 230 40 Z" 
            fill="url(#calligraphyGradient)" 
          />
          {/* Maddah on Alef */}
          <path 
            d="M 215 32 C 220 28, 228 28, 235 34 C 235 34, 238 24, 230 25 C 222 26, 217 31, 215 32 Z" 
            fill="url(#calligraphyGradient)" 
          />
          
          {/* Lam + Alef Maqsurah / The stylized "Athar" body */}
          <path 
            d="M 185 30 
               C 185 30, 202 38, 208 65 
               C 212 85, 202 110, 178 112 
               C 155 114, 140 102, 145 80 
               C 148 68, 158 55, 172 50 
               C 178 48, 182 52, 176 56 
               C 165 62, 160 72, 158 84 
               C 156 94, 168 102, 180 100 
               C 192 98, 198 85, 196 68 
               C 194 54, 185 40, 185 30 Z" 
            fill="url(#calligraphyGradient)" 
          />

          {/* Tha + Re loop (the beautiful trailing loop) */}
          <path 
            d="M 175 110 
               C 175 110, 192 112, 195 125 
               C 198 138, 178 148, 155 152 
               C 135 155, 118 146, 120 135 
               C 122 124, 138 118, 148 122 
               C 152 124, 148 128, 144 127 
               C 135 125, 130 130, 130 136 
               C 130 142, 145 146, 158 143 
               C 175 139, 184 132, 181 122 
               C 179 116, 175 112, 175 110 Z" 
            fill="url(#calligraphyGradient)" 
          />
          
          {/* 3 Calligraphy dots (for 'Tha') */}
          <circle cx="165" cy="94" r="5" fill="url(#calligraphyGradient)" />
          <circle cx="176" cy="94" r="5" fill="url(#calligraphyGradient)" />
          <circle cx="170.5" cy="85" r="5" fill="url(#calligraphyGradient)" />
        </g>

        {/* 2. THE OUTWARD-FACING SILHOUETTES (Light slate-grays) */}
        {/* Left Profile: Man with Spiky Hair */}
        <path 
          id="man-profile"
          d="M 150 148
             C 142 146, 134 150, 128 155
             C 125 152, 120 152, 115 156
             C 114 162, 118 168, 112 174
             C 108 178, 102 175, 98 182
             C 96 186, 99 192, 95 198
             C 92 201, 88 198, 85 204
             C 86 210, 92 214, 88 221
             C 84 225, 78 221, 74 228
             C 71 232, 75 238, 72 245
             C 70 250, 68 252, 60 258
             C 52 264, 46 270, 52 278
             C 55 282, 62 284, 58 290
             C 54 296, 44 290, 41 302
             C 41 306, 45 310, 46 314
             C 48 318, 44 322, 46 328
             C 48 334, 54 336, 52 344
             C 50 352, 41 350, 42 360
             C 43 368, 48 372, 53 380
             C 56 384, 52 390, 58 396
             C 64 402, 70 404, 75 410
             L 115 410
             C 110 395, 112 375, 110 360
             C 108 340, 116 312, 128 295
             C 140 278, 155 264, 168 255
             Z" 
          fill="#475569" 
          fillOpacity="0.45"
          filter="url(#subtleShadow)"
        />

        {/* Right Profile: Woman Silhouette with Eyelashes & Curved Neck */}
        <path 
          id="woman-profile"
          d="M 250 148
             C 258 146, 266 150, 272 155
             C 275 152, 280 152, 285 156
             C 286 162, 282 168, 288 174
             C 292 178, 298 175, 302 182
             C 304 186, 301 192, 305 198
             C 308 201, 312 198, 315 204
             C 314 210, 308 214, 312 221
             C 316 225, 322 221, 326 228
             C 329 232, 325 238, 328 245
             C 334 252, 342 258, 346 266
             C 350 274, 355 284, 348 292
             C 344 296, 335 292, 332 300
             C 328 308, 336 315, 330 324
             C 326 330, 318 328, 314 336
             C 310 344, 316 352, 312 360
             C 308 368, 298 365, 294 374
             C 290 382, 296 390, 290 398
             C 285 404, 278 406, 272 410
             L 285 410
             L 245 410
             C 255 390, 252 368, 256 348
             C 260 328, 252 300, 240 285
             C 228 270, 212 258, 200 250
             Z" 
          fill="#64748b" 
          fillOpacity="0.45"
          filter="url(#subtleShadow)"
        />

        {/* 3. CENTRAL COMBINED "A" / PSI (Ψ) SYMBOL (High contrast black/cream) */}
        {/* Left curve of Psi */}
        <path 
          d="M 95 145 
             C 125 145, 160 162, 165 240
             C 165 240, 163 245, 160 242
             C 142 225, 115 195, 95 145 Z" 
          fill="#10b981" 
        />
        
        {/* Right curve of Psi */}
        <path 
          d="M 305 145 
             C 275 145, 240 162, 235 240
             C 235 240, 237 245, 240 242
             C 258 225, 285 195, 305 145 Z" 
          fill="#10b981" 
        />

        {/* Main "A" legs (Left leg) */}
        <polygon 
          points="200,150 120,410 160,410 200,280" 
          fill="#0f172a" 
          id="a-left-leg"
        />
        
        {/* Main "A" legs (Right leg) */}
        <polygon 
          points="200,150 280,410 240,410 200,280" 
          fill="#0f172a" 
          id="a-right-leg"
        />

        {/* Triangle Crossbar / Connecting center */}
        <polygon 
          points="155,300 245,300 236,270 164,270" 
          fill="#0f172a" 
        />
      </svg>

      {/* 4. SLOGAN (SPEECH BUBBLE AT BOT) */}
      {showSlogan && (
        <div id="logo-slogan-box" className="mt-4 max-w-sm">
          <div className="bg-slate-900 border border-teal-900/40 text-slate-100 rounded-2xl px-5 py-3 relative shadow-inner">
            <p className="text-sm font-semibold leading-relaxed font-sans text-center" dir="rtl">
              آثر آمن ..يبدأ من الداخل و يصل إليك بسرية
            </p>
            {/* Speech bubble tail */}
            <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-4 h-3 bg-slate-900 border-r border-b border-teal-900/20 rotate-45" />
          </div>
        </div>
      )}
    </div>
  );
}
