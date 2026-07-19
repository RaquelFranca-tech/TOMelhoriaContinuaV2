import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { generateUUID } from "@/integrations/supabase/client";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

export const converterIniciativaParaMicroprocesso = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(
    z.object({
      iniciativaId: z.string(),
      destinoIniciativaId: z.string(),
    }),
  )
  .handler(async ({ data, context }) => {
    const { iniciativaId, destinoIniciativaId } = data;
    const actorId = context.userId;
    const timestamp = new Date().toISOString();

    // 1. Fetch source initiative
    const { data: iniData, error: iniError } = await supabaseAdmin
      .from("iniciativas")
      .select("*")
      .eq("id", iniciativaId)
      .single();

    if (iniError || !iniData) {
      throw new Error("Iniciativa de origem não encontrada.");
    }

    // 2. Create microprocess
    const newMicroId = generateUUID();

    const microData = {
      id: newMicroId,
      iniciativa_id: destinoIniciativaId,
      titulo: iniData.titulo || "Sem título",
      descricao: iniData.descricao || "",
      status: iniData.status || "Mapeada",
      prioridade: iniData.prioridade || "Média",
      area_responsavel: iniData.area_responsavel || "",
      responsavel_id: iniData.responsavel_id || null,
      lider_id: iniData.lider_id || null,
      sponsor_id: iniData.sponsor_id || null,
      volume: iniData.volume ?? null,
      tempo: iniData.tempo ?? null,
      created_at: timestamp,
      updated_at: timestamp,
      created_by: actorId || "system",
      updated_by: actorId || "system",
    };

    const { error: insertError } = await supabaseAdmin.from("microprocessos").insert(microData);

    if (insertError) {
      throw new Error(`Erro ao criar microprocesso: ${insertError.message}`);
    }

    // 3. Migrate tasks from source initiative to new microprocess and destination initiative
    const { error: tasksError } = await supabaseAdmin
      .from("tarefas")
      .update({
        iniciativa_id: destinoIniciativaId,
        microprocesso_id: newMicroId,
        updated_at: timestamp,
        updated_by: actorId || "system",
      })
      .eq("iniciativa_id", iniciativaId);

    if (tasksError) {
      console.warn("Erro ao migrar tarefas:", tasksError);
    }

    // 4. Migrate attachments from source initiative
    const { error: anexosError } = await supabaseAdmin
      .from("anexos")
      .update({
        iniciativa_id: destinoIniciativaId,
        microprocesso_id: newMicroId,
        updated_at: timestamp,
        updated_by: actorId || "system",
      })
      .eq("iniciativa_id", iniciativaId);

    if (anexosError) {
      console.warn("Erro ao migrar anexos:", anexosError);
    }

    // 5. Soft-delete the source initiative
    const { error: deleteError } = await supabaseAdmin
      .from("iniciativas")
      .update({
        deleted_at: timestamp,
        updated_at: timestamp,
        updated_by: actorId || "system",
      })
      .eq("id", iniciativaId);

    if (deleteError) {
      throw new Error(`Erro ao desativar iniciativa de origem: ${deleteError.message}`);
    }

    return { microprocessoId: newMicroId };
  });
