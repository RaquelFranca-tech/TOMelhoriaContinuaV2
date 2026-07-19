import type { LucideIcon } from "lucide-react";
import { Construction } from "lucide-react";

export function TabPlaceholder({
  title,
  description,
  icon: Icon = Construction,
  bullets,
}: {
  title: string;
  description?: string;
  icon?: LucideIcon;
  bullets?: string[];
}) {
  return (
    <div className="mx-auto max-w-3xl">
      <div className="rounded-2xl border border-border bg-white p-8 shadow-vibra-sm">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-vibra-50 text-vibra-700 ring-1 ring-vibra-200">
            <Icon className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="text-[16px] font-extrabold text-vibra-800">{title}</h3>
              <span className="rounded-full bg-vibra-100 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-vibra-700">
                Em construção
              </span>
            </div>
            <p className="mt-1.5 text-[12.5px] leading-relaxed text-muted-foreground">
              {description ?? "Esta aba está sendo implementada e estará disponível em breve."}
            </p>
            {bullets && bullets.length > 0 && (
              <ul className="mt-4 space-y-1.5">
                {bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-[12px] text-foreground/80">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-vibra-600" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
