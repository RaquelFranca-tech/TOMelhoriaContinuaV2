import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

type PresenceUser = {
  user_id: string;
  nome: string;
  email: string;
  online_at: string;
};

function colorFromId(id: string) {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) % 360;
  return `hsl(${h}, 55%, 45%)`;
}

function initials(name: string) {
  return (
    name
      .split(/\s+/)
      .slice(0, 2)
      .map((p) => p[0]?.toUpperCase())
      .join("") || "?"
  );
}

/**
 * Mostra avatares em tempo real de quem está vendo a mesma iniciativa.
 * Usa Supabase Realtime Presence (channel: presence:initiative:<id>).
 */
export function PresenceAvatars({ initiativeId }: { initiativeId: string | null }) {
  const [users, setUsers] = useState<PresenceUser[]>([]);

  useEffect(() => {
    if (!initiativeId) return;
    let cancelled = false;
    let channel: ReturnType<typeof supabase.channel> | null = null;

    (async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user || cancelled) return;
      const { data: profile } = await supabase
        .from("profiles")
        .select("nome,email")
        .eq("id", user.id)
        .maybeSingle();
      const me: PresenceUser = {
        user_id: user.id,
        nome: profile?.nome ?? profile?.email ?? user.email ?? "Usuário",
        email: profile?.email ?? user.email ?? "",
        online_at: new Date().toISOString(),
      };

      channel = supabase.channel(`presence:initiative:${initiativeId}`, {
        config: { presence: { key: user.id } },
      });

      channel
        .on("presence", { event: "sync" }, () => {
          const state = channel!.presenceState<PresenceUser>();
          const flat: PresenceUser[] = [];
          for (const key of Object.keys(state)) {
            const entry = state[key]?.[0];
            if (entry) flat.push(entry);
          }
          setUsers(flat);
        })
        .subscribe(async (status) => {
          if (status === "SUBSCRIBED") {
            await channel!.track(me);
          }
        });
    })();

    return () => {
      cancelled = true;
      if (channel) supabase.removeChannel(channel);
    };
  }, [initiativeId]);

  if (!initiativeId || users.length === 0) return null;

  const visible = users.slice(0, 5);
  const extra = users.length - visible.length;

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex -space-x-2">
        {visible.map((u) => (
          <div
            key={u.user_id}
            title={`${u.nome} · online`}
            className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white text-[10px] font-bold uppercase text-white shadow-sm"
            style={{ background: colorFromId(u.user_id) }}
          >
            {initials(u.nome)}
          </div>
        ))}
        {extra > 0 && (
          <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-vibra-100 text-[10px] font-bold text-vibra-800 shadow-sm">
            +{extra}
          </div>
        )}
      </div>
      <span className="hidden text-[10.5px] font-semibold uppercase tracking-wider text-vibra-700 sm:inline">
        {users.length} {users.length === 1 ? "vendo agora" : "vendo agora"}
      </span>
    </div>
  );
}
