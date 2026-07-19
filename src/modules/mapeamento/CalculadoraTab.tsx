import { useState } from "react";
import { Kpi, inputCls, Section } from "./_shared";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";

const FIELDS: [string, string, string][] = [
  ["horasEco", "Horas Economizadas/Mês", ""],
  ["custoHora", "Custo Médio Hora (R$)", ""],
  ["hcAtual", "HC Atual (FTE)", ""],
  ["custoImpl", "Custo Implementação (R$)", ""],
  ["erroAtual", "Taxa de Erro Atual (%)", ""],
  ["erroFuturo", "Taxa de Erro Futuro (%)", ""],
  ["volume", "Volume Total Mensal", ""],
  ["leadAtual", "Lead Time Atual (dias)", ""],
  ["tempoAtual", "Tempo Processo Atual (min)", ""],
  ["tempoFuturo", "Tempo Processo Futuro (min)", ""],
];

function formatMin(val?: number): string {
  if (val === undefined || val === null || isNaN(val) || val <= 0) return "";
  const rounded = Math.round(val);
  const hours = Math.floor(rounded / 60);
  const minutes = rounded % 60;
  return `(${hours}h ${minutes < 10 ? "0" + minutes : minutes}min)`;
}

export function CalculadoraTab() {
  const [v, setV] = useState<Record<string, number>>({});
  const [hist, setHist] = useState<any[]>([]);

  const hc = (v.horasEco ?? 0) / 176;
  const econMensal = (v.horasEco ?? 0) * (v.custoHora ?? 0);
  const econAnual = econMensal * 12;
  const roi = v.custoImpl ? ((econAnual - v.custoImpl) / v.custoImpl) * 100 : 0;
  const payback = econMensal ? (v.custoImpl ?? 0) / econMensal : 0;
  const redErr = v.erroAtual ? ((v.erroAtual - (v.erroFuturo ?? 0)) / v.erroAtual) * 100 : 0;
  const redTempo = v.tempoAtual ? ((v.tempoAtual - (v.tempoFuturo ?? 0)) / v.tempoAtual) * 100 : 0;
  const capExtra = v.tempoAtual ? ((v.horasEco ?? 0) * 60) / v.tempoAtual : 0;

  function salvar() {
    setHist((h) => [{ ts: new Date(), hc, roi, payback, econAnual }, ...h]);
  }

  return (
    <TooltipProvider>
      <div className="space-y-4">
        <Section title="Parâmetros de Entrada">
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {FIELDS.map(([k, l]) => {
              const conversion =
                (k === "tempoAtual" || k === "tempoFuturo") && v[k] ? formatMin(v[k]) : "";

              const currencyHint =
                (k === "custoHora" || k === "custoImpl") && v[k]
                  ? v[k].toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
                  : "";

              return (
                <label key={k} className="flex flex-col gap-1">
                  <div className="flex items-center justify-between text-[11px] font-semibold text-vibra-700">
                    <span>{l}</span>
                    {conversion && (
                      <span className="text-[10px] text-blue-600 font-extrabold">{conversion}</span>
                    )}
                    {currencyHint && (
                      <span className="text-[10px] text-emerald-600 font-extrabold">
                        {currencyHint}
                      </span>
                    )}
                  </div>
                  <input
                    type="number"
                    className={inputCls}
                    value={v[k] ?? ""}
                    onChange={(e) => setV((s) => ({ ...s, [k]: Number(e.target.value) }))}
                  />
                </label>
              );
            })}
          </div>
        </Section>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Calc
            label="HC Potencial Liberar"
            value={`${hc.toFixed(2)} FTE`}
            tip="Horas Eco ÷ 176 (1 FTE = 176h/mês)"
          />
          <Calc
            label="ROI Estimado"
            value={`${roi.toFixed(0)}%`}
            tip="((Economia Anual − Custo) ÷ Custo) × 100"
          />
          <Calc
            label="Payback (meses)"
            value={`${payback.toFixed(1)}`}
            tip="Custo ÷ Economia Mensal"
          />
          <Calc
            label="Economia Anual"
            value={econAnual.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
            tip="Horas Eco × Custo Hora × 12"
          />
          <Calc
            label="Redução de Erros"
            value={`${redErr.toFixed(1)}%`}
            tip="((Erro Atual − Erro Futuro) ÷ Erro Atual) × 100"
          />
          <Calc
            label="Redução de Tempo"
            value={`${redTempo.toFixed(1)}%`}
            tip="((Tempo Atual − Tempo Futuro) ÷ Tempo Atual) × 100"
          />
          <Calc
            label="Capacidade Extra/h"
            value={`${capExtra.toFixed(1)}`}
            tip="(Horas Eco × 60) ÷ Tempo Atual"
          />
        </div>

        <div className="flex justify-end">
          <button
            onClick={salvar}
            className="rounded-md bg-vibra-700 px-4 py-2 text-[12px] font-semibold text-white hover:bg-vibra-800"
          >
            Salvar no Histórico
          </button>
        </div>

        <Section title="Histórico">
          {hist.length === 0 ? (
            <p className="text-center text-[12px] text-muted-foreground">Sem registros.</p>
          ) : (
            <table className="w-full text-[12px]">
              <thead className="text-[10.5px] uppercase text-vibra-800">
                <tr>
                  <th className="text-left">Data</th>
                  <th>HC</th>
                  <th>ROI</th>
                  <th>Payback</th>
                  <th>Anual</th>
                </tr>
              </thead>
              <tbody>
                {hist.map((h, i) => (
                  <tr key={i} className="border-t">
                    <td className="py-1">{h.ts.toLocaleString("pt-BR")}</td>
                    <td className="text-center">{h.hc.toFixed(2)} FTE</td>
                    <td className="text-center">{h.roi.toFixed(0)}%</td>
                    <td className="text-center">{h.payback.toFixed(1)}m</td>
                    <td className="text-center">
                      {h.econAnual.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </Section>
      </div>
    </TooltipProvider>
  );
}

function Calc({ label, value, tip }: { label: string; value: string; tip: string }) {
  return (
    <div className="rounded-xl border border-vibra-200 bg-vibra-50/60 p-3 shadow-vibra-sm">
      <div className="flex items-center gap-1">
        <p className="text-[10px] uppercase tracking-wider text-vibra-700">{label}</p>
        <Tooltip>
          <TooltipTrigger>
            <Info className="h-3 w-3 text-vibra-600" />
          </TooltipTrigger>
          <TooltipContent className="max-w-[220px] text-[11px]">{tip}</TooltipContent>
        </Tooltip>
      </div>
      <p className="mt-1 text-[18px] font-bold text-vibra-800">{value}</p>
    </div>
  );
}
