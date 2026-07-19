import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

/**
 * Mantemos um único canal Realtime global para picklists, compartilhado
 * por todas as instâncias do hook. Ao receber qualquer mudança em
 * `picklists` ou `picklist_valores`, invalidamos todas as queries
 * ["picklist", ...] para que os PicklistFields refletem em tempo real
 * adições/edições feitas em Configurações → Picklists.
 */
let _channelRefCount = 0;
let _channel: ReturnType<typeof supabase.channel> | null = null;

function ensurePicklistRealtime(invalidate: () => void) {
  _channelRefCount += 1;
  if (!_channel) {
    _channel = supabase
      .channel("rt-picklists-global")
      .on("postgres_changes", { event: "*", schema: "public", table: "picklists" }, invalidate)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "picklist_valores" },
        invalidate,
      )
      .subscribe();
  }
  return () => {
    _channelRefCount -= 1;
    if (_channelRefCount <= 0 && _channel) {
      supabase.removeChannel(_channel);
      _channel = null;
      _channelRefCount = 0;
    }
  };
}

export async function syncSharedPeopleChange(
  action: "add" | "update" | "delete",
  value: string,
  oldValueOrId?: string,
) {
  const sharedCategories = ["Participantes", "Colaborador", "Para quem", "Perfil Vinculado"];

  // Garante que todas as categorias compartilhadas existam na tabela de picklists
  for (const cat of sharedCategories) {
    const { data: existingPl } = await supabase
      .from("picklists")
      .select("id")
      .eq("categoria", cat)
      .maybeSingle();
    if (!existingPl) {
      await supabase.from("picklists").insert({ categoria: cat });
    }
  }

  const { data: pls } = await supabase
    .from("picklists")
    .select("id, categoria")
    .in("categoria", sharedCategories);
  if (!pls || pls.length === 0) return;

  if (action === "add") {
    for (const pl of pls) {
      const { data: existing } = await supabase
        .from("picklist_valores")
        .select("id")
        .eq("picklist_id", pl.id)
        .eq("valor", value)
        .eq("ativo", true)
        .maybeSingle();

      if (!existing) {
        const { data: vals } = await supabase
          .from("picklist_valores")
          .select("ordem")
          .eq("picklist_id", pl.id);
        const nextOrder = (vals?.length ?? 0) + 1;
        await supabase.from("picklist_valores").insert({
          picklist_id: pl.id,
          valor: value,
          ordem: nextOrder,
          ativo: true,
        });
      }
    }
  } else if (action === "update" && oldValueOrId) {
    for (const pl of pls) {
      await supabase
        .from("picklist_valores")
        .update({ valor: value })
        .eq("picklist_id", pl.id)
        .eq("valor", oldValueOrId);
    }
  } else if (action === "delete") {
    for (const pl of pls) {
      await supabase
        .from("picklist_valores")
        .update({ ativo: false })
        .eq("picklist_id", pl.id)
        .eq("valor", value);
    }
  }
}

const EMPTY_ARRAY: any[] = [];

export function usePicklist(categoria: string) {
  const qc = useQueryClient();
  const key = ["picklist", categoria];

  useEffect(() => {
    return ensurePicklistRealtime(() => {
      qc.invalidateQueries({ queryKey: ["picklist"] });
      qc.invalidateQueries({ queryKey: ["config-picklists"] });
      qc.invalidateQueries({ queryKey: ["profiles"] });
      qc.invalidateQueries({ queryKey: ["equipe"] });
    });
  }, [qc]);

  const q = useQuery({
    queryKey: key,
    queryFn: async () => {
      const isSharedPeople = [
        "Participantes",
        "Colaborador",
        "Para quem",
        "Perfil Vinculado",
      ].includes(categoria);
      const targetCategory = isSharedPeople ? "Perfil Vinculado" : categoria;

      const { data: pl } = await supabase
        .from("picklists")
        .select("id")
        .eq("categoria", targetCategory)
        .maybeSingle();
      const plId = pl?.id || null;

      let finalVals: { id: string; valor: string }[] = [];

      if (isSharedPeople) {
        // Aggregate names from multiple categories to build the ultimate picklist
        const categoriesToFetch = [
          "Perfil Vinculado",
          "Sponsor",
          "Líder",
          "Analista",
          "Gerente",
          "Diretor(a)",
          "Diretor",
          "Vice-Presidente",
          "Gestor Responsável",
          "Analista Responsável",
          "Participantes",
          "Colaborador",
          "Para quem",
        ];

        const { data: picklists } = await supabase
          .from("picklists")
          .select("id, categoria")
          .in("categoria", categoriesToFetch);
        let vals: any[] = [];
        if (picklists && picklists.length > 0) {
          const { data } = await supabase
            .from("picklist_valores")
            .select("id, valor, picklist_id")
            .in(
              "picklist_id",
              picklists.map((p) => p.id),
            )
            .eq("ativo", true);
          if (data) vals = data;
        }

        const { data: profiles } = await supabase.from("profiles").select("id, nome");
        const { data: equipe } = await supabase
          .from("equipe")
          .select("id, extras, papel_macroprocesso")
          .eq("ativo", true);

        const uniqueNames = new Set<string>();
        const result: { id: string; valor: string }[] = [];

        if (profiles) {
          for (const p of profiles) {
            const name = p.nome?.trim();
            if (name && !uniqueNames.has(name.toLowerCase())) {
              uniqueNames.add(name.toLowerCase());
              result.push({ id: `prof-${p.id}`, valor: name });
            }
          }
        }

        if (equipe) {
          for (const m of equipe) {
            const extrasName = m.extras?.nome?.trim();
            if (extrasName && !uniqueNames.has(extrasName.toLowerCase())) {
              uniqueNames.add(extrasName.toLowerCase());
              result.push({ id: `equipe-${m.id}`, valor: extrasName });
            }
            const raw = String(m.papel_macroprocesso ?? "");
            const nomeFallback = raw.includes(" — ") ? raw.split(" — ", 1)[0].trim() : undefined;
            if (nomeFallback && !uniqueNames.has(nomeFallback.toLowerCase())) {
              uniqueNames.add(nomeFallback.toLowerCase());
              result.push({ id: `equipe-fallback-${m.id}`, valor: nomeFallback });
            }
          }
        }

        for (const v of vals) {
          const val = v.valor?.trim();
          if (val && !uniqueNames.has(val.toLowerCase())) {
            uniqueNames.add(val.toLowerCase());
            result.push({ id: v.id, valor: val });
          }
        }

        result.sort((a, b) => a.valor.localeCompare(b.valor));
        finalVals = result;
      } else {
        if (plId) {
          const { data: vals } = await supabase
            .from("picklist_valores")
            .select("id,valor,ordem")
            .eq("picklist_id", plId)
            .eq("ativo", true)
            .order("ordem");
          finalVals = (vals ?? []).map((v) => ({ id: v.id, valor: v.valor }));
        }
      }

      return { picklistId: plId, values: finalVals };
    },
    staleTime: 30_000,
  });

  const add = useMutation({
    mutationFn: async (valor: string) => {
      const isSharedPeople = [
        "Participantes",
        "Colaborador",
        "Para quem",
        "Perfil Vinculado",
      ].includes(categoria);

      if (isSharedPeople) {
        await syncSharedPeopleChange("add", valor);
      } else {
        let pid = q.data?.picklistId;
        if (!pid) {
          const { data, error } = await supabase
            .from("picklists")
            .insert({ categoria })
            .select("id")
            .single();
          if (error) throw error;
          pid = data.id;
        }
        const ordem = (q.data?.values?.length ?? 0) + 1;
        const { error } = await supabase
          .from("picklist_valores")
          .insert({ picklist_id: pid, valor, ordem, ativo: true });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["picklist"] });
      qc.invalidateQueries({ queryKey: ["profiles"] });
      qc.invalidateQueries({ queryKey: ["equipe"] });
    },
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      if (id.startsWith("prof-")) {
        const profId = id.replace("prof-", "");
        await supabase.from("profiles").delete().eq("id", profId);
      } else if (id.startsWith("equipe-") || id.startsWith("equipe-fallback-")) {
        const eqId = id.replace("equipe-", "").replace("fallback-", "");
        await supabase.from("equipe").update({ ativo: false }).eq("id", eqId);
      } else {
        const isSharedPeople = [
          "Participantes",
          "Colaborador",
          "Para quem",
          "Perfil Vinculado",
        ].includes(categoria);
        if (isSharedPeople) {
          const { data: valObj } = await supabase
            .from("picklist_valores")
            .select("valor")
            .eq("id", id)
            .maybeSingle();
          if (valObj?.valor) {
            await syncSharedPeopleChange("delete", valObj.valor);
          }
        } else {
          const { error } = await supabase
            .from("picklist_valores")
            .update({ ativo: false })
            .eq("id", id);
          if (error) throw error;
        }
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["picklist"] });
      qc.invalidateQueries({ queryKey: ["profiles"] });
      qc.invalidateQueries({ queryKey: ["equipe"] });
    },
  });

  const rename = useMutation({
    mutationFn: async ({ id, valor }: { id: string; valor: string }) => {
      if (id.startsWith("prof-")) {
        const profId = id.replace("prof-", "");
        await supabase.from("profiles").update({ nome: valor }).eq("id", profId);
      } else if (id.startsWith("equipe-") || id.startsWith("equipe-fallback-")) {
        const eqId = id.replace("equipe-", "").replace("fallback-", "");
        const { data } = await supabase
          .from("equipe")
          .select("extras, papel_macroprocesso")
          .eq("id", eqId)
          .maybeSingle();
        if (data) {
          const extras = { ...(data.extras ?? {}), nome: valor };
          const raw = String(data.papel_macroprocesso ?? "");
          const papel = raw.includes(" — ") ? raw.split(" — ", 2)[1] : raw;
          await supabase
            .from("equipe")
            .update({ extras, papel_macroprocesso: `${valor} — ${papel}` })
            .eq("id", eqId);
        }
      } else {
        const isSharedPeople = [
          "Participantes",
          "Colaborador",
          "Para quem",
          "Perfil Vinculado",
        ].includes(categoria);
        if (isSharedPeople) {
          const { data: valObj } = await supabase
            .from("picklist_valores")
            .select("valor")
            .eq("id", id)
            .maybeSingle();
          if (valObj?.valor) {
            await syncSharedPeopleChange("update", valor, valObj.valor);
          }
        } else {
          const { error } = await supabase.from("picklist_valores").update({ valor }).eq("id", id);
          if (error) throw error;
        }
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["picklist"] });
      qc.invalidateQueries({ queryKey: ["profiles"] });
      qc.invalidateQueries({ queryKey: ["equipe"] });
    },
  });

  return { values: q.data?.values ?? EMPTY_ARRAY, isLoading: q.isLoading, add, remove, rename };
}
