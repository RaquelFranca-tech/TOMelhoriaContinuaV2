import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase, generateUUID } from "@/integrations/supabase/client";
import { useHierarchy } from "@/stores/hierarchy";
import { RequireIniciativa, btnPrimary, btnGhost } from "./_shared";
import { useEffect, useRef, useState } from "react";
import {
  Plus,
  Trash2,
  Type as TypeIcon,
  Square,
  Circle as CircleIcon,
  ArrowRight,
} from "lucide-react";
import { toast } from "sonner";

type Shape = {
  id: string;
  kind: "rect" | "circle" | "text" | "arrow";
  x: number;
  y: number;
  w: number;
  h: number;
  text: string;
  color: string;
};

export function FluxoTab() {
  return (
    <RequireIniciativa>
      <Inner />
    </RequireIniciativa>
  );
}

function Inner() {
  const qc = useQueryClient();
  const { iniciativaId } = useHierarchy();
  const { data } = useQuery({
    queryKey: ["fluxo", iniciativaId],
    queryFn: async () =>
      (
        await supabase
          .from("fluxo_rascunho")
          .select("*")
          .eq("iniciativa_id", iniciativaId!)
          .is("deleted_at", null)
          .maybeSingle()
      ).data,
  });
  const [shapes, setShapes] = useState<Shape[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const drag = useRef<{ id: string; offX: number; offY: number } | null>(null);
  useEffect(() => {
    setShapes(((data?.canvas as any)?.shapes ?? []) as Shape[]);
  }, [data]);

  const add = (kind: Shape["kind"]) =>
    setShapes((s) => [
      ...s,
      {
        id: generateUUID(),
        kind,
        x: 60,
        y: 60,
        w: kind === "text" ? 160 : 120,
        h: kind === "text" ? 32 : 80,
        text: kind === "text" ? "Texto" : "",
        color: kind === "arrow" ? "#268200" : "#a9c78e",
      },
    ]);
  const remove = () => {
    if (selected) {
      setShapes((s) => s.filter((x) => x.id !== selected));
      setSelected(null);
    }
  };
  const clear = () => setShapes([]);

  async function save() {
    const payload = { iniciativa_id: iniciativaId!, canvas: { shapes } };
    const { error } = data?.id
      ? await supabase.from("fluxo_rascunho").update(payload).eq("id", data.id)
      : await supabase.from("fluxo_rascunho").insert(payload);
    if (error) toast.error(error.message);
    else {
      toast.success("Fluxo salvo");
      qc.invalidateQueries({ queryKey: ["fluxo"] });
    }
  }

  function onDown(e: React.MouseEvent, sh: Shape) {
    setSelected(sh.id);
    drag.current = { id: sh.id, offX: e.clientX - sh.x, offY: e.clientY - sh.y };
  }
  function onMove(e: React.MouseEvent) {
    if (!drag.current) return;
    const d = drag.current;
    setShapes((s) =>
      s.map((x) => (x.id === d.id ? { ...x, x: e.clientX - d.offX, y: e.clientY - d.offY } : x)),
    );
  }
  function onUp() {
    drag.current = null;
  }

  const sel = shapes.find((s) => s.id === selected);

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <button className={btnGhost} onClick={() => add("rect")}>
          <Square className="mr-1 inline h-3 w-3" />
          Retângulo
        </button>
        <button className={btnGhost} onClick={() => add("circle")}>
          <CircleIcon className="mr-1 inline h-3 w-3" />
          Círculo
        </button>
        <button className={btnGhost} onClick={() => add("text")}>
          <TypeIcon className="mr-1 inline h-3 w-3" />
          Texto
        </button>
        <button className={btnGhost} onClick={() => add("arrow")}>
          <ArrowRight className="mr-1 inline h-3 w-3" />
          Seta
        </button>
        <div className="mx-2 h-5 w-px bg-border" />
        <button className={btnGhost} onClick={remove} disabled={!selected}>
          <Trash2 className="mr-1 inline h-3 w-3" />
          Excluir
        </button>
        <button className={btnGhost} onClick={clear}>
          Limpar
        </button>
        <div className="ml-auto" />
        <button className={btnPrimary} onClick={save}>
          Salvar
        </button>
      </div>
      {sel && (
        <div className="flex items-center gap-2 rounded-md border border-border bg-vibra-50/40 p-2 text-[11px]">
          <span className="font-bold">Selecionado:</span>
          <input
            value={sel.text}
            onChange={(e) =>
              setShapes((s) => s.map((x) => (x.id === sel.id ? { ...x, text: e.target.value } : x)))
            }
            className="rounded border px-2 py-0.5"
            placeholder="texto"
          />
          <input
            type="color"
            value={sel.color}
            onChange={(e) =>
              setShapes((s) =>
                s.map((x) => (x.id === sel.id ? { ...x, color: e.target.value } : x)),
              )
            }
          />
        </div>
      )}
      <div
        onMouseMove={onMove}
        onMouseUp={onUp}
        onMouseLeave={onUp}
        className="relative h-[480px] overflow-hidden rounded-xl border-2 border-dashed border-vibra-300 bg-white"
      >
        {shapes.map((sh) => (
          <div
            key={sh.id}
            onMouseDown={(e) => onDown(e, sh)}
            className={`absolute flex cursor-move items-center justify-center text-[12px] font-semibold select-none ${selected === sh.id ? "ring-2 ring-vibra-700" : ""}`}
            style={{
              left: sh.x,
              top: sh.y,
              width: sh.w,
              height: sh.h,
              background: sh.kind === "arrow" ? "transparent" : sh.color,
              borderRadius: sh.kind === "circle" ? "50%" : sh.kind === "text" ? 4 : 8,
              border:
                sh.kind === "text"
                  ? "1px dashed #999"
                  : sh.kind === "arrow"
                    ? `3px solid ${sh.color}`
                    : "none",
              borderTop: sh.kind === "arrow" ? "none" : undefined,
            }}
          >
            {sh.kind === "arrow" ? "▶" : sh.text}
          </div>
        ))}
        {shapes.length === 0 && (
          <p className="absolute inset-0 flex items-center justify-center text-muted-foreground text-[12px]">
            Adicione formas para iniciar o fluxo livre.
          </p>
        )}
      </div>
    </div>
  );
}
