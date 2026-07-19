import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useHierarchy } from "@/stores/hierarchy";
import { RequireIniciativa, inputCls, btnPrimary, btnDanger } from "./_shared";
import { Upload } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export function BpmnTab() {
  return (
    <RequireIniciativa>
      <Inner />
    </RequireIniciativa>
  );
}

function Inner() {
  const qc = useQueryClient();
  const { iniciativaId } = useHierarchy();
  const { data: rows = [] } = useQuery({
    queryKey: ["bpmn", iniciativaId],
    queryFn: async () =>
      (
        await supabase
          .from("bpmn_arquivos")
          .select("*")
          .eq("iniciativa_id", iniciativaId!)
          .is("deleted_at", null)
          .order("created_at")
      ).data ?? [],
  });
  const asis = rows.find((r: any) => r.tipo === "asis");
  const tobe = rows.find((r: any) => r.tipo === "tobe");
  const [notas, setNotas] = useState("");
  useEffect(() => {
    setNotas(asis?.anotacoes ?? tobe?.anotacoes ?? "");
  }, [asis, tobe]);

  async function upload(tipo: "asis" | "tobe", file: File) {
    const url = await new Promise<string>((res) => {
      const r = new FileReader();
      r.onload = () => res(r.result as string);
      r.readAsDataURL(file);
    });
    const existing = rows.find((r: any) => r.tipo === tipo);
    const payload: any = {
      iniciativa_id: iniciativaId!,
      tipo,
      nome: file.name,
      url,
      anotacoes: notas,
    };
    const { error } = existing
      ? await supabase.from("bpmn_arquivos").update(payload).eq("id", existing.id)
      : await supabase.from("bpmn_arquivos").insert(payload);
    if (error) toast.error(error.message);
    else {
      toast.success("Upload concluído");
      qc.invalidateQueries({ queryKey: ["bpmn"] });
    }
  }
  async function remove(id: string) {
    await supabase
      .from("bpmn_arquivos")
      .update({ deleted_at: new Date().toISOString() })
      .eq("id", id);
    qc.invalidateQueries({ queryKey: ["bpmn"] });
  }
  async function saveNotas() {
    for (const r of rows)
      await supabase.from("bpmn_arquivos").update({ anotacoes: notas }).eq("id", r.id);
    toast.success("Notas salvas");
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        {(["asis", "tobe"] as const).map((t) => {
          const r = t === "asis" ? asis : tobe;
          return (
            <div key={t} className="rounded-xl border border-border bg-card p-4 shadow-vibra-sm">
              <p className="mb-2 text-[12px] font-bold text-vibra-800">
                {t === "asis" ? "🗂 FLUXO AS-IS" : "🚀 FLUXO TO-BE"}
              </p>
              {r?.url ? (
                <div className="space-y-2">
                  <img
                    src={r.url ?? ""}
                    alt={r.nome ?? ""}
                    className="max-h-[260px] w-full rounded border object-contain"
                  />
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="truncate">{r.nome}</span>
                    <button className={btnDanger} onClick={() => remove(r.id)}>
                      Remover
                    </button>
                  </div>
                </div>
              ) : null}
              <label className="mt-2 flex cursor-pointer items-center justify-center gap-2 rounded-md border-2 border-dashed border-vibra-300 bg-vibra-50/40 px-3 py-6 text-[12px] text-vibra-800 hover:bg-vibra-50">
                <Upload className="h-4 w-4" /> Upload (PNG/JPG/SVG)
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => e.target.files?.[0] && upload(t, e.target.files[0])}
                />
              </label>
            </div>
          );
        })}
      </div>
      <div className="rounded-xl border border-border bg-card p-4 shadow-vibra-sm">
        <p className="mb-2 text-[12px] font-bold text-vibra-800">📝 Anotações</p>
        <textarea
          className={inputCls + " min-h-[100px]"}
          value={notas}
          onChange={(e) => setNotas(e.target.value)}
        />
        <div className="mt-2 flex justify-end">
          <button className={btnPrimary} onClick={saveNotas}>
            Salvar Notas
          </button>
        </div>
      </div>
    </div>
  );
}
