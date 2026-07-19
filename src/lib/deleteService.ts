import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { resequenceProjectIniciativas } from "./iniciativaSequence";

/**
 * Enterprise Delete Service for Vibra 2026 Platform
 * Handles cascade soft deletion for related entities to prevent foreign key violations.
 */

export async function deleteProjectCascade(projectId: string, qc: any): Promise<boolean> {
  try {
    const timestamp = new Date().toISOString();

    // 1. Fetch related initiatives
    const { data: initiatives } = await supabase
      .from("iniciativas")
      .select("id")
      .eq("projeto_id", projectId);

    const initiativeIds = (initiatives ?? []).map((i: any) => i.id);

    // 2. Soft delete all child records under those initiatives
    for (const iniId of initiativeIds) {
      // Find microprocesses under this initiative to soft delete their tasks/anexos specifically
      const { data: micros } = await supabase
        .from("microprocessos")
        .select("id")
        .eq("iniciativa_id", iniId);

      if (micros && micros.length > 0) {
        for (const m of micros) {
          await supabase
            .from("tarefas")
            .update({ deleted_at: timestamp })
            .eq("microprocesso_id", m.id);
          await supabase
            .from("anexos")
            .update({ deleted_at: timestamp })
            .eq("microprocesso_id", m.id);
        }
      }

      await supabase.from("tarefas").update({ deleted_at: timestamp }).eq("iniciativa_id", iniId);
      await supabase
        .from("microprocessos")
        .update({ deleted_at: timestamp })
        .eq("iniciativa_id", iniId);
      await supabase.from("anexos").update({ deleted_at: timestamp }).eq("iniciativa_id", iniId);
      await supabase.from("riscos").update({ deleted_at: timestamp }).eq("iniciativa_id", iniId);
      await supabase.from("kaizen").update({ deleted_at: timestamp }).eq("iniciativa_id", iniId);
      await supabase
        .from("indicadores")
        .update({ deleted_at: timestamp })
        .eq("iniciativa_id", iniId);
      await supabase.from("sipoc").update({ deleted_at: timestamp }).eq("iniciativa_id", iniId);
      await supabase.from("dmaic").update({ deleted_at: timestamp }).eq("iniciativa_id", iniId);
      await supabase
        .from("comentarios")
        .update({ deleted_at: timestamp })
        .eq("iniciativa_id", iniId);
      await supabase.from("agenda").update({ deleted_at: timestamp }).eq("iniciativa_id", iniId);
      await supabase
        .from("mc3_registros")
        .update({ deleted_at: timestamp })
        .eq("iniciativa_id", iniId);
    }

    // Soft delete the initiatives themselves
    if (initiativeIds.length > 0) {
      await supabase
        .from("iniciativas")
        .update({ deleted_at: timestamp })
        .eq("projeto_id", projectId);
    }

    // 3. Soft delete the project itself
    const { error } = await supabase
      .from("projetos")
      .update({ deleted_at: timestamp })
      .eq("id", projectId);

    if (error) {
      toast.error("Erro ao excluir projeto: " + error.message);
      return false;
    }

    // 4. Invalidate related queries for automatic UI updates without reloading
    qc.invalidateQueries();

    toast.success("Projeto e todos os registros vinculados foram excluídos com sucesso.");
    return true;
  } catch (err: any) {
    toast.error("Falha na exclusão: " + (err.message || err));
    return false;
  }
}

export async function deleteInitiativeCascade(initiativeId: string, qc: any): Promise<boolean> {
  try {
    const timestamp = new Date().toISOString();

    // Fetch the initiative to get its project_id for resequencing
    const { data: iniData } = await supabase
      .from("iniciativas")
      .select("projeto_id")
      .eq("id", initiativeId)
      .single();

    const projectId = iniData?.projeto_id;

    // Find microprocesses under this initiative to soft delete their specific tasks/anexos
    const { data: micros } = await supabase
      .from("microprocessos")
      .select("id")
      .eq("iniciativa_id", initiativeId);

    if (micros && micros.length > 0) {
      for (const m of micros) {
        await supabase
          .from("tarefas")
          .update({ deleted_at: timestamp })
          .eq("microprocesso_id", m.id);
        await supabase
          .from("anexos")
          .update({ deleted_at: timestamp })
          .eq("microprocesso_id", m.id);
      }
    }

    // 1. Soft delete associated tasks
    await supabase
      .from("tarefas")
      .update({ deleted_at: timestamp })
      .eq("iniciativa_id", initiativeId);

    // 2. Soft delete associated microprocesses
    await supabase
      .from("microprocessos")
      .update({ deleted_at: timestamp })
      .eq("iniciativa_id", initiativeId);

    // 3. Soft delete associated anexos
    await supabase
      .from("anexos")
      .update({ deleted_at: timestamp })
      .eq("iniciativa_id", initiativeId);

    // 4. Soft delete other linked records
    await supabase
      .from("riscos")
      .update({ deleted_at: timestamp })
      .eq("iniciativa_id", initiativeId);
    await supabase
      .from("kaizen")
      .update({ deleted_at: timestamp })
      .eq("iniciativa_id", initiativeId);
    await supabase
      .from("indicadores")
      .update({ deleted_at: timestamp })
      .eq("iniciativa_id", initiativeId);
    await supabase
      .from("sipoc")
      .update({ deleted_at: timestamp })
      .eq("iniciativa_id", initiativeId);
    await supabase
      .from("dmaic")
      .update({ deleted_at: timestamp })
      .eq("iniciativa_id", initiativeId);
    await supabase
      .from("comentarios")
      .update({ deleted_at: timestamp })
      .eq("iniciativa_id", initiativeId);
    await supabase
      .from("agenda")
      .update({ deleted_at: timestamp })
      .eq("iniciativa_id", initiativeId);
    await supabase
      .from("mc3_registros")
      .update({ deleted_at: timestamp })
      .eq("iniciativa_id", initiativeId);

    // 5. Soft delete the initiative itself
    const { error } = await supabase
      .from("iniciativas")
      .update({ deleted_at: timestamp })
      .eq("id", initiativeId);

    if (error) {
      toast.error("Erro ao excluir iniciativa: " + error.message);
      return false;
    }

    // Resequence project initiatives to avoid gaps
    if (projectId) {
      await resequenceProjectIniciativas(projectId);
    }

    // Invalidate queries for instant reactive refresh
    qc.invalidateQueries();

    toast.success("Iniciativa e dependências excluídas com sucesso.");
    return true;
  } catch (err: any) {
    toast.error("Falha na exclusão: " + (err.message || err));
    return false;
  }
}

export async function deleteMicroprocessCascade(
  microId: string,
  qc: any,
  initiativeId?: string | null,
): Promise<boolean> {
  try {
    const timestamp = new Date().toISOString();

    // 1. Soft delete tasks linked to this microprocess
    await supabase
      .from("tarefas")
      .update({ deleted_at: timestamp })
      .eq("microprocesso_id", microId);

    // 2. Soft delete attachments linked to this microprocess
    await supabase.from("anexos").update({ deleted_at: timestamp }).eq("microprocesso_id", microId);

    // 3. Soft delete the microprocess itself
    const { error } = await supabase
      .from("microprocessos")
      .update({ deleted_at: timestamp })
      .eq("id", microId);

    if (error) {
      toast.error("Erro ao excluir microprocesso: " + error.message);
      return false;
    }

    // Invalidate queries
    qc.invalidateQueries();

    toast.success("Microprocesso e tarefas vinculadas excluídos.");
    return true;
  } catch (err: any) {
    toast.error("Falha na exclusão: " + (err.message || err));
    return false;
  }
}

export async function deleteTaskSimple(
  taskId: string,
  qc: any,
  parentId?: string | null,
): Promise<boolean> {
  try {
    const timestamp = new Date().toISOString();
    const { error } = await supabase
      .from("tarefas")
      .update({ deleted_at: timestamp })
      .eq("id", taskId);
    if (error) {
      toast.error("Erro ao excluir tarefa: " + error.message);
      return false;
    }

    qc.invalidateQueries();

    toast.success("Tarefa excluída com sucesso.");
    return true;
  } catch (err: any) {
    toast.error("Falha na exclusão: " + (err.message || err));
    return false;
  }
}
