import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";

/**
 * Subscribe to Postgres changes on a table and invalidate the given query keys
 * (or call a custom handler) whenever anything changes.
 */
export function useRealtimeTable(
  table: string,
  invalidateKeys: (string | unknown[])[] = [],
  handler?: (payload: unknown) => void,
) {
  const qc = useQueryClient();
  const keySignature = JSON.stringify(invalidateKeys);
  useEffect(() => {
    const channel = supabase
      .channel(`rt-${table}-${Math.random().toString(36).slice(2, 8)}`)
      .on("postgres_changes", { event: "*", schema: "public", table }, (payload) => {
        handler?.(payload);
        invalidateKeys.forEach((k) =>
          qc.invalidateQueries({ queryKey: Array.isArray(k) ? k : [k] }),
        );
      })
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table, keySignature]);
}
