import { useState } from "react";
import { HelpCircle } from "lucide-react";

interface CalculatedFieldProps {
  label: string;
  value: string | number;
  formulaName: string;
  expression: string;
  description: string;
}

export function CalculatedField({
  label,
  value,
  formulaName,
  expression,
  description,
}: CalculatedFieldProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="relative block">
      <span className="block text-[10px] font-semibold uppercase tracking-wider text-vibra-700">
        {label}
      </span>
      <div
        className="relative mt-0.5 flex h-9 w-full cursor-help items-center justify-between rounded-md border border-amber-200 bg-amber-50 px-2.5 text-[12.5px] font-bold text-vibra-950 shadow-sm transition-all hover:bg-amber-100/70"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onTouchStart={() => setShowTooltip(!showTooltip)}
      >
        <span className="font-mono text-[13px]">{value}</span>
        <HelpCircle className="h-3.5 w-3.5 text-amber-600 shrink-0" />

        {showTooltip && (
          <div className="absolute bottom-full left-1/2 z-50 mb-2 w-72 -translate-x-1/2 rounded-lg border border-amber-200 bg-amber-50 p-3 text-[11px] font-normal leading-relaxed text-neutral-800 shadow-xl backdrop-blur-sm animate-in fade-in slide-in-from-bottom-1 duration-150">
            <div className="flex items-center gap-1 border-b border-amber-200/60 pb-1.5 font-bold text-amber-900 uppercase tracking-wide text-[10px]">
              <span>Formula:</span>
              <span>{formulaName}</span>
            </div>
            <div className="mt-2 font-mono text-[10px] bg-white/70 rounded p-1.5 border border-amber-100 text-amber-950 break-words">
              {expression}
            </div>
            <p className="mt-2 text-neutral-600 text-[11px]">{description}</p>
            <div className="absolute top-full left-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1 rotate-45 border-r border-b border-amber-200 bg-amber-50"></div>
          </div>
        )}
      </div>
    </div>
  );
}
