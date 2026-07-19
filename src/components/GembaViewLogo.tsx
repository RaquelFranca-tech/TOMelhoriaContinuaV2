import React from "react";

type Props = {
  className?: string;
  style?: React.CSSProperties;
};

export function GembaViewLogo({ className = "h-12", style }: Props) {
  return (
    <div className="flex items-center justify-center select-none" style={style}>
      <svg
        viewBox="0 0 600 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <defs>
          {/* Gradients */}
          <linearGradient id="glowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22d3ee" /> {/* cyan-400 */}
            <stop offset="50%" stopColor="#3b82f6" /> {/* blue-500 */}
            <stop offset="100%" stopColor="#6366f1" /> {/* indigo-500 */}
          </linearGradient>
          <linearGradient id="viewTextGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" /> {/* sky-400 */}
            <stop offset="100%" stopColor="#818cf8" /> {/* indigo-400 */}
          </linearGradient>
          <linearGradient id="silverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#cbd5e1" /> {/* slate-300 */}
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* --- ICON: Left part (x: 10 - 130, y: 10 - 110) --- */}
        <g transform="translate(10, 0)">
          {/* Motion Lines (3 lines on the left) */}
          <rect x="5" y="42" width="25" height="4" rx="2" fill="url(#glowGrad)" />
          <rect x="15" y="55" width="20" height="4" rx="2" fill="url(#glowGrad)" />
          <rect x="10" y="68" width="22" height="4" rx="2" fill="url(#glowGrad)" />

          {/* Outer Glowing Ring */}
          <circle
            cx="80"
            cy="55"
            r="42"
            stroke="url(#glowGrad)"
            strokeWidth="3.5"
            strokeDasharray="210 50"
            strokeLinecap="round"
            transform="rotate(-45 80 55)"
            filter="url(#glow)"
          />
          <circle
            cx="80"
            cy="55"
            r="42"
            stroke="white"
            strokeWidth="1"
            strokeOpacity="0.3"
            strokeDasharray="180 80"
            transform="rotate(30 80 55)"
          />

          {/* Stylized 'G' with Eye (The inner structure) */}
          {/* Outer circle of the G */}
          <path
            d="M 108 45 A 30 30 0 1 0 102 75 L 85 75 A 15 15 0 1 1 85 45 Z"
            fill="url(#silverGrad)"
          />
          {/* G Middle Bar / Eye center */}
          <path
            d="M 85 55 L 110 55"
            stroke="url(#silverGrad)"
            strokeWidth="4"
            strokeLinecap="round"
          />

          {/* Eye Core (Pupil & Iris) */}
          <circle cx="80" cy="55" r="14" fill="#0c4a6e" stroke="url(#glowGrad)" strokeWidth="2" />
          <circle cx="80" cy="55" r="7" fill="url(#glowGrad)" filter="url(#glow)" />
          {/* Pupil Reflection */}
          <circle cx="77" cy="52" r="2.5" fill="white" />

          {/* Eye Outline Eyelids (Sleek curve on top and bottom of pupil) */}
          <path
            d="M 58 55 C 68 40, 92 40, 102 55"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeOpacity="0.9"
          />
          <path
            d="M 58 55 C 68 70, 92 70, 102 55"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeOpacity="0.75"
          />
        </g>

        {/* --- TEXT: Right part (x: 140+) --- */}
        {/* "Gemba" */}
        <text
          x="150"
          y="68"
          fill="url(#silverGrad)"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="800"
          fontSize="56"
          letterSpacing="-1px"
        >
          Gemba
        </text>

        {/* "View" */}
        <text
          x="355"
          y="68"
          fill="url(#viewTextGrad)"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="400"
          fontSize="56"
          letterSpacing="-1.5px"
          filter="url(#glow)"
        >
          View
        </text>

        {/* Tagline: "ENXERGAR O GEMBA. TRANSFORMAR RESULTADOS." */}
        {/* Left tagline accent */}
        <path
          d="M 120 95 L 145 95"
          stroke="url(#glowGrad)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        <text
          x="155"
          y="99"
          fill="#94a3b8" /* slate-400 */
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="700"
          fontSize="12.5"
          letterSpacing="6.5px"
        >
          ENXERGAR O GEMBA. TRANSFORMAR RESULTADOS.
        </text>

        {/* Right tagline accent */}
        <path
          d="M 545 95 L 570 95"
          stroke="url(#glowGrad)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
