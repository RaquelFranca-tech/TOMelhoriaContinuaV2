import { ReactNode } from "react";
import { useHierarchy } from "@/stores/hierarchy";
import { Layers } from "lucide-react";

export function RequireIniciativa({ children }: { children: ReactNode }) {
  const { iniciativaId, openDrawer } = useHierarchy();
  if (!iniciativaId) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border bg-card/60 px-6 py-12 text-center shadow-vibra-sm">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-vibra-100 text-vibra-700">
          <Layers className="h-5 w-5" />
        </div>
        <div>
          <p className="text-[13px] font-semibold text-vibra-800">Selecione uma Iniciativa</p>
          <p className="mt-1 text-[12px] text-muted-foreground">
            Esta aba precisa de uma iniciativa ativa para criar passos, riscos ou registros
            relacionados.
          </p>
        </div>
        <button
          type="button"
          onClick={openDrawer}
          className="rounded-md bg-vibra-700 px-3 py-1.5 text-[12px] font-semibold text-white hover:bg-vibra-800"
        >
          Escolher Iniciativa
        </button>
      </div>
    );
  }
  return <>{children}</>;
}

export function Section({
  title,
  icon: Ic,
  action,
  children,
}: {
  title: string;
  icon?: any;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-4 shadow-vibra-sm">
      <div className="mb-3 flex items-center justify-between gap-2">
        <h3 className="flex items-center gap-2 text-[13px] font-bold text-vibra-800">
          {Ic && <Ic className="h-4 w-4" />} {title}
        </h3>
        {action}
      </div>
      {children}
    </div>
  );
}

export function Kpi({
  label,
  value,
  tone = "green",
}: {
  label: string;
  value: string | number;
  tone?: "green" | "orange" | "yellow" | "blue" | "red";
}) {
  const cls = {
    green: "bg-vibra-100 text-vibra-800",
    orange: "bg-orange-100 text-orange-800",
    yellow: "bg-amber-100 text-amber-800",
    blue: "bg-blue-100 text-blue-800",
    red: "bg-red-100 text-red-700",
  }[tone];
  return (
    <div className="rounded-xl border border-border bg-card p-3 shadow-vibra-sm">
      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className={`mt-1 inline-block rounded-md px-2 py-0.5 text-[18px] font-bold ${cls}`}>
        {value}
      </p>
    </div>
  );
}

export const inputCls =
  "w-full rounded-md border border-input bg-white px-2 py-1.5 text-[12px] outline-none focus:border-vibra-600";
export const btnPrimary =
  "rounded-md bg-vibra-700 px-3 py-1.5 text-[12px] font-semibold text-white hover:bg-vibra-800";
export const btnGhost =
  "rounded-md border border-border bg-white px-2 py-1 text-[11px] hover:bg-vibra-50";
export const btnDanger =
  "rounded-md border border-red-200 bg-red-50 px-2 py-1 text-[11px] text-red-700 hover:bg-red-100";
