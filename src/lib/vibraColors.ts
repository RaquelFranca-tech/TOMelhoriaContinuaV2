// Paleta oficial VIBRA — usar nestes módulos executivos
export const VIBRA = {
  greenDark: "#044317",
  green: "#268200",
  orange: "#FF6900",
  yellow: "#FEDC00",
  blue: "#0000FF",
  greenSoft: "#a9c78e",
  yellowSoft: "#fced96",
  blueSoft: "#75a7d2",
} as const;

export const VIBRA_SERIES = [
  VIBRA.green,
  VIBRA.orange,
  VIBRA.blue,
  VIBRA.yellow,
  VIBRA.greenDark,
  VIBRA.greenSoft,
  VIBRA.blueSoft,
  VIBRA.yellowSoft,
];

// Cor determinística por id (processo) — paleta Vibra
export function colorForId(id: string | null | undefined): string {
  if (!id) return VIBRA.greenSoft;
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0;
  return VIBRA_SERIES[h % VIBRA_SERIES.length];
}

export type PrazoStatus = "no_prazo" | "alerta" | "atrasada" | "sem_data";

export function prazoStatus(dataFimPrevista?: string | null, status?: string | null): PrazoStatus {
  if (status && /conclu/i.test(status)) return "no_prazo";
  if (!dataFimPrevista) return "sem_data";
  const today = new Date();
  const fim = new Date(dataFimPrevista);
  const diff = Math.floor((fim.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  if (diff < 0) return "atrasada";
  if (diff <= 7) return "alerta";
  return "no_prazo";
}

export function prazoBadge(s: PrazoStatus): { label: string; cls: string } {
  switch (s) {
    case "no_prazo":
      return { label: "✅ No prazo", cls: "bg-emerald-100 text-emerald-800" };
    case "alerta":
      return { label: "⚠ Alerta", cls: "bg-amber-100 text-amber-800" };
    case "atrasada":
      return { label: "❌ Atrasada", cls: "bg-red-100 text-red-700" };
    default:
      return { label: "— Sem data", cls: "bg-slate-100 text-slate-600" };
  }
}
