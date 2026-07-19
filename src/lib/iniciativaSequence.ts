import { supabase } from "@/integrations/supabase/client";

/**
 * Resequences all active (non-deleted) initiatives for a project
 * to ensure a strictly continuous sequence: INI-001, INI-002, INI-003, ...
 * without any gaps or breaks, ordered by created_at.
 *
 * Returns the next available code (e.g., INI-004) if a new one is to be added.
 */
export async function resequenceProjectIniciativas(projectId: string): Promise<string> {
  if (!projectId) return "INI-001";

  try {
    // Fetch all active initiatives for the project, ordered by created_at ascending
    const { data: initiatives, error } = await supabase
      .from("iniciativas")
      .select("id, codigo")
      .eq("projeto_id", projectId)
      .is("deleted_at", null)
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Error fetching initiatives for resequencing:", error);
      return "INI-001";
    }

    const list = initiatives ?? [];

    // Update codes that are out of sequence
    for (let i = 0; i < list.length; i++) {
      const expectedCode = `INI-${String(i + 1).padStart(3, "0")}`;
      if (list[i].codigo !== expectedCode) {
        const { error: updateError } = await supabase
          .from("iniciativas")
          .update({ codigo: expectedCode })
          .eq("id", list[i].id);
        if (updateError) {
          console.error(`Error updating initiative code for id ${list[i].id}:`, updateError);
        } else {
          list[i].codigo = expectedCode; // Update local copy
        }
      }
    }

    // Next code is simply INI-{list.length + 1}
    const nextNum = list.length + 1;
    return `INI-${String(nextNum).padStart(3, "0")}`;
  } catch (err) {
    console.error("Failed to resequence project initiatives:", err);
    return "INI-001";
  }
}
