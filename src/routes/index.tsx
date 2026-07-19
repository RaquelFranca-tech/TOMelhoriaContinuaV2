import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { LoadingScreen } from "@/components/LoadingScreen";

export const Route = createFileRoute("/")({
  ssr: false,
  component: Gate,
});

function Gate() {
  const navigate = useNavigate();
  useEffect(() => {
    const t = setTimeout(async () => {
      const { data } = await supabase.auth.getSession();
      navigate({ to: data.session ? "/executivo" : "/auth", replace: true });
    }, 600);
    return () => clearTimeout(t);
  }, [navigate]);
  return <LoadingScreen />;
}
