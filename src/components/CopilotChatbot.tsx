import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { MessageCircle, X, Settings as Cog, AlertTriangle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

type CopilotConfig = {
  token_endpoint?: string;
  chatbot_url?: string;
  nome?: string;
  mensagem_inicial?: string;
};

const WEBCHAT_CDN = "https://cdn.botframework.com/botframework-webchat/latest/webchat.js";

declare global {
  interface Window {
    WebChat?: {
      createDirectLine: (opts: { token: string }) => unknown;
      renderWebChat: (opts: any, el: HTMLElement) => void;
      createStore?: () => unknown;
    };
  }
}

function loadWebChatScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") return reject(new Error("SSR"));
    if (window.WebChat) return resolve();
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${WEBCHAT_CDN}"]`);
    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () => reject(new Error("Falha ao carregar Web Chat")));
      return;
    }
    const s = document.createElement("script");
    s.src = WEBCHAT_CDN;
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("Falha ao carregar Web Chat"));
    document.head.appendChild(s);
  });
}

export function CopilotChatbot() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { data: cfg, isLoading } = useQuery({
    queryKey: ["copilot-config"],
    queryFn: async () => {
      const { data } = await supabase
        .from("app_configuracoes")
        .select("valor")
        .eq("chave", "copilot_studio")
        .maybeSingle();
      return (data?.valor as CopilotConfig | null) ?? null;
    },
  });

  const tokenEndpoint = cfg?.token_endpoint?.trim();
  const chatbotUrl = cfg?.chatbot_url?.trim();
  const botName = cfg?.nome?.trim() || "Assistente VIBRA";
  const welcome =
    cfg?.mensagem_inicial?.trim() || "Olá! Como posso ajudar com Melhoria Contínua hoje?";

  // Render WebChat when opened (only if we are using DirectLine tokenEndpoint)
  useEffect(() => {
    if (!open || !tokenEndpoint || chatbotUrl || mounted || !containerRef.current) return;
    let cancelled = false;
    setError(null);

    (async () => {
      try {
        await loadWebChatScript();
        if (cancelled) return;
        const res = await fetch(tokenEndpoint, { method: "GET" });
        if (!res.ok) throw new Error(`Token endpoint ${res.status}`);
        const json = await res.json();
        const token: string | undefined = json.token ?? json.access_token;
        if (!token) throw new Error("Resposta do endpoint sem 'token'");
        if (cancelled || !containerRef.current || !window.WebChat) return;
        const directLine = window.WebChat.createDirectLine({ token });
        window.WebChat.renderWebChat(
          {
            directLine,
            locale: "pt-BR",
            styleOptions: {
              accent: "#0d4a8a",
              bubbleBackground: "#f4f8fc",
              bubbleFromUserBackground: "#0d4a8a",
              bubbleFromUserTextColor: "#ffffff",
              botAvatarInitials: "MC",
              userAvatarInitials: "EU",
              hideUploadButton: true,
              backgroundColor: "transparent",
            },
          },
          containerRef.current,
        );
        setMounted(true);
      } catch (e: any) {
        if (!cancelled) setError(e?.message ?? "Erro ao iniciar o chat");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [open, tokenEndpoint, chatbotUrl, mounted]);

  // If endpoint or chatbot url changes after mount, force re-render
  useEffect(() => {
    setMounted(false);
  }, [tokenEndpoint, chatbotUrl]);

  return (
    <>
      {/* Launcher */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-vibra-700 text-white shadow-vibra ring-2 ring-white transition hover:scale-105 hover:bg-vibra-800"
        title={open ? "Fechar assistente" : "Abrir assistente"}
        aria-label="Assistente Copilot"
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      {/* Panel */}
      {open && (
        <div className="fixed bottom-24 right-5 z-40 flex h-[600px] max-h-[80vh] w-[400px] max-w-[92vw] flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-vibra">
          <header className="flex items-center justify-between gap-2 bg-vibra-800 px-4 py-3 text-white">
            <div className="min-w-0">
              <p className="truncate text-[13px] font-bold">{botName}</p>
              <p className="text-[10.5px] uppercase tracking-wider text-white/70">
                Copilot Studio · Microsoft
              </p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="rounded-md p-1 text-white/80 hover:bg-white/10"
            >
              <X className="h-4 w-4" />
            </button>
          </header>

          <div className="flex-1 overflow-hidden bg-white">
            {isLoading ? (
              <p className="p-6 text-center text-[12.5px] text-muted-foreground">
                Carregando configuração…
              </p>
            ) : !tokenEndpoint && !chatbotUrl ? (
              <SetupHint />
            ) : chatbotUrl ? (
              <div className="h-full w-full bg-white relative">
                <iframe
                  src={chatbotUrl}
                  title={botName}
                  className="h-full w-full border-0"
                  allow="microphone; camera; clipboard-write; geolocation"
                />
              </div>
            ) : error ? (
              <div className="p-6 text-center">
                <AlertTriangle className="mx-auto h-8 w-8 text-amber-500" />
                <p className="mt-2 text-[13px] font-semibold text-vibra-800">
                  Não foi possível conectar
                </p>
                <p className="mt-1 text-[11.5px] text-muted-foreground">{error}</p>
                <button
                  onClick={() => {
                    setError(null);
                    setMounted(false);
                  }}
                  className="mt-3 rounded-md bg-vibra-700 px-3 py-1.5 text-[11.5px] font-semibold text-white hover:bg-vibra-800"
                >
                  Tentar novamente
                </button>
              </div>
            ) : (
              <>
                {!mounted && (
                  <p className="p-6 text-center text-[12.5px] text-muted-foreground">
                    Conectando ao assistente…
                  </p>
                )}
                <div ref={containerRef} className="h-full w-full" />
              </>
            )}
          </div>

          {!chatbotUrl && tokenEndpoint && mounted && (
            <p className="border-t border-border bg-vibra-50 px-3 py-1.5 text-center text-[10px] italic text-muted-foreground">
              {welcome}
            </p>
          )}
        </div>
      )}
    </>
  );
}

function SetupHint() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 p-6 text-center overflow-y-auto">
      <Cog className="h-10 w-10 text-vibra-600 shrink-0" />
      <h3 className="text-[14px] font-bold text-vibra-800">Configurar Copilot Studio</h3>
      <p className="text-[11.5px] leading-relaxed text-muted-foreground">
        Habilite o assistente informando os parâmetros do seu agente do Microsoft Copilot Studio em:
        <br />
        <Link to="/configuracoes" className="font-semibold text-vibra-700 underline">
          Configurações → Integrações
        </Link>
        .
      </p>

      <div className="text-left w-full mt-2 space-y-3 border-t border-neutral-100 pt-3">
        <div>
          <p className="text-[11px] font-bold text-emerald-700 uppercase">
            Método 1: Sem Pacote Premium (Recomendado)
          </p>
          <p className="text-[10.5px] text-muted-foreground mt-0.5 leading-snug">
            Informe o <strong>Link de Compartilhamento / URL do Chatbot</strong> obtido no Copilot
            Studio. Os usuários se autenticam via SSO corporativo do próprio navegador dentro do
            Iframe sem custo adicional.
          </p>
        </div>
        <div>
          <p className="text-[11px] font-bold text-blue-700 uppercase">
            Método 2: Com Token Endpoint (Premium)
          </p>
          <p className="text-[10.5px] text-muted-foreground mt-0.5 leading-snug">
            Informe o <strong>Token Endpoint</strong> do canal <em>Site Personalizado</em> para usar
            renderização via Direct Line nativa.
          </p>
        </div>
      </div>
    </div>
  );
}
