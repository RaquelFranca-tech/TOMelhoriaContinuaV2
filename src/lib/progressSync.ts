import { supabase } from "@/integrations/supabase/client";

/**
 * Automatically recalculates and synchronizes progress up the hierarchy.
 * Task -> Microprocesso -> Iniciativa.
 */
export async function syncHierarchyProgress(params: {
  taskId?: string | null;
  microId?: string | null;
  iniId?: string | null;
}) {
  try {
    const { taskId } = params;
    let { microId, iniId } = params;

    // 1. Resolve parent IDs if starting from a task
    if (taskId) {
      const { data: task } = await supabase
        .from("tarefas")
        .select("microprocesso_id, iniciativa_id")
        .eq("id", taskId)
        .maybeSingle();
      if (task) {
        if (task.microprocesso_id) microId = task.microprocesso_id;
        if (task.iniciativa_id) iniId = task.iniciativa_id;
      }
    }

    // 2. Resolve Initiative ID if starting from a microprocess
    if (microId && !iniId) {
      const { data: micro } = await supabase
        .from("microprocessos" as any)
        .select("iniciativa_id")
        .eq("id", microId)
        .maybeSingle();
      if (micro && micro.iniciativa_id) {
        iniId = micro.iniciativa_id;
      }
    }

    // 3. Recalculate Microprocess Progress & Status
    if (microId) {
      const { data: tasks = [] } = await supabase
        .from("tarefas")
        .select("status")
        .eq("microprocesso_id", microId)
        .is("deleted_at", null);

      if (tasks.length > 0) {
        const completed = tasks.filter((t) => /conclu/i.test(t.status ?? "")).length;
        const progress = Math.round((completed / tasks.length) * 100);
        const status = progress === 100 ? "Concluído" : "Em Andamento";

        await supabase
          .from("microprocessos" as any)
          .update({
            percentual_avanco: progress,
            status,
            updated_at: new Date().toISOString(),
          } as any)
          .eq("id", microId);
      } else {
        // No tasks: if status is Concluído, keep 100, else default to 0
        const { data: m } = await supabase
          .from("microprocessos" as any)
          .select("status")
          .eq("id", microId)
          .maybeSingle();
        if (m) {
          const progress = /conclu/i.test(m.status ?? "") ? 100 : 0;
          await supabase
            .from("microprocessos" as any)
            .update({ percentual_avanco: progress } as any)
            .eq("id", microId);
        }
      }
    }

    // 4. Recalculate Initiative Progress & Status
    if (iniId) {
      // Check if initiative has microprocesses
      const { data: micros = [] } = await supabase
        .from("microprocessos" as any)
        .select("percentual_avanco")
        .eq("iniciativa_id", iniId)
        .is("deleted_at", null);

      if (micros.length > 0) {
        const sum = micros.reduce((acc, m) => acc + Number(m.percentual_avanco ?? 0), 0);
        const progress = Math.round(sum / micros.length);
        const status = progress === 100 ? "Concluída" : "Desenvolvimento";

        await supabase
          .from("iniciativas")
          .update({
            percentual_avanco: progress,
            status: progress === 100 ? status : undefined, // only auto-complete to Concluída, don't overwrite custom status otherwise unless it was concluded
            updated_at: new Date().toISOString(),
          })
          .eq("id", iniId);
      } else {
        // If no microprocesses, base progress on direct tasks of the initiative
        const { data: directTasks = [] } = await supabase
          .from("tarefas")
          .select("status")
          .eq("iniciativa_id", iniId)
          .is("deleted_at", null);

        if (directTasks.length > 0) {
          const completed = directTasks.filter((t) => /conclu/i.test(t.status ?? "")).length;
          const progress = Math.round((completed / directTasks.length) * 100);
          const status = progress === 100 ? "Concluída" : "Desenvolvimento";

          await supabase
            .from("iniciativas")
            .update({
              percentual_avanco: progress,
              status: progress === 100 ? status : undefined,
              updated_at: new Date().toISOString(),
            })
            .eq("id", iniId);
        }
      }
    }
  } catch (error) {
    console.error("Error syncing hierarchy progress:", error);
  }
}
