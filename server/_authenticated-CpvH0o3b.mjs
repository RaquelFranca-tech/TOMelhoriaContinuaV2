import { o as __toESM } from "./_runtime.mjs";
import { n as supabase } from "./_ssr/client-BqoqJNkg.mjs";
import { u as require_react } from "./_libs/@floating-ui/react-dom+[...].mjs";
import { f as Outlet, g as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { v as require_jsx_runtime } from "./_libs/@radix-ui/react-accordion+[...].mjs";
import { n as useQuery } from "./_libs/tanstack__react-query.mjs";
import { E as Settings, W as MessageCircle, n as X, u as TriangleAlert } from "./_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_authenticated-CpvH0o3b.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var WEBCHAT_CDN = "https://cdn.botframework.com/botframework-webchat/latest/webchat.js";
function loadWebChatScript() {
	return new Promise((resolve, reject) => {
		if (typeof window === "undefined") return reject(/* @__PURE__ */ new Error("SSR"));
		if (window.WebChat) return resolve();
		const existing = document.querySelector(`script[src="${WEBCHAT_CDN}"]`);
		if (existing) {
			existing.addEventListener("load", () => resolve());
			existing.addEventListener("error", () => reject(/* @__PURE__ */ new Error("Falha ao carregar Web Chat")));
			return;
		}
		const s = document.createElement("script");
		s.src = WEBCHAT_CDN;
		s.async = true;
		s.onload = () => resolve();
		s.onerror = () => reject(/* @__PURE__ */ new Error("Falha ao carregar Web Chat"));
		document.head.appendChild(s);
	});
}
function CopilotChatbot() {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [mounted, setMounted] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const containerRef = (0, import_react.useRef)(null);
	const { data: cfg, isLoading } = useQuery({
		queryKey: ["copilot-config"],
		queryFn: async () => {
			const { data } = await supabase.from("app_configuracoes").select("valor").eq("chave", "copilot_studio").maybeSingle();
			return data?.valor ?? null;
		}
	});
	const tokenEndpoint = cfg?.token_endpoint?.trim();
	const chatbotUrl = cfg?.chatbot_url?.trim();
	const botName = cfg?.nome?.trim() || "Assistente VIBRA";
	const welcome = cfg?.mensagem_inicial?.trim() || "Olá! Como posso ajudar com Melhoria Contínua hoje?";
	(0, import_react.useEffect)(() => {
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
				const token = json.token ?? json.access_token;
				if (!token) throw new Error("Resposta do endpoint sem 'token'");
				if (cancelled || !containerRef.current || !window.WebChat) return;
				const directLine = window.WebChat.createDirectLine({ token });
				window.WebChat.renderWebChat({
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
						backgroundColor: "transparent"
					}
				}, containerRef.current);
				setMounted(true);
			} catch (e) {
				if (!cancelled) setError(e?.message ?? "Erro ao iniciar o chat");
			}
		})();
		return () => {
			cancelled = true;
		};
	}, [
		open,
		tokenEndpoint,
		chatbotUrl,
		mounted
	]);
	(0, import_react.useEffect)(() => {
		setMounted(false);
	}, [tokenEndpoint, chatbotUrl]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		onClick: () => setOpen((v) => !v),
		className: "fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-vibra-700 text-white shadow-vibra ring-2 ring-white transition hover:scale-105 hover:bg-vibra-800",
		title: open ? "Fechar assistente" : "Abrir assistente",
		"aria-label": "Assistente Copilot",
		children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-6 w-6" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "h-6 w-6" })
	}), open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed bottom-24 right-5 z-40 flex h-[600px] max-h-[80vh] w-[400px] max-w-[92vw] flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-vibra",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-center justify-between gap-2 bg-vibra-800 px-4 py-3 text-white",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "truncate text-[13px] font-bold",
						children: botName
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[10.5px] uppercase tracking-wider text-white/70",
						children: "Copilot Studio · Microsoft"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setOpen(false),
					className: "rounded-md p-1 text-white/80 hover:bg-white/10",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex-1 overflow-hidden bg-white",
				children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "p-6 text-center text-[12.5px] text-muted-foreground",
					children: "Carregando configuração…"
				}) : !tokenEndpoint && !chatbotUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SetupHint, {}) : chatbotUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-full w-full bg-white relative",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
						src: chatbotUrl,
						title: botName,
						className: "h-full w-full border-0",
						allow: "microphone; camera; clipboard-write; geolocation"
					})
				}) : error ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-6 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "mx-auto h-8 w-8 text-amber-500" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-[13px] font-semibold text-vibra-800",
							children: "Não foi possível conectar"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-[11.5px] text-muted-foreground",
							children: error
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => {
								setError(null);
								setMounted(false);
							},
							className: "mt-3 rounded-md bg-vibra-700 px-3 py-1.5 text-[11.5px] font-semibold text-white hover:bg-vibra-800",
							children: "Tentar novamente"
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [!mounted && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "p-6 text-center text-[12.5px] text-muted-foreground",
					children: "Conectando ao assistente…"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					ref: containerRef,
					className: "h-full w-full"
				})] })
			}),
			!chatbotUrl && tokenEndpoint && mounted && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "border-t border-border bg-vibra-50 px-3 py-1.5 text-center text-[10px] italic text-muted-foreground",
				children: welcome
			})
		]
	})] });
}
function SetupHint() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full flex-col items-center justify-center gap-3 p-6 text-center overflow-y-auto",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { className: "h-10 w-10 text-vibra-600 shrink-0" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "text-[14px] font-bold text-vibra-800",
				children: "Configurar Copilot Studio"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-[11.5px] leading-relaxed text-muted-foreground",
				children: [
					"Habilite o assistente informando os parâmetros do seu agente do Microsoft Copilot Studio em:",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/configuracoes",
						className: "font-semibold text-vibra-700 underline",
						children: "Configurações → Integrações"
					}),
					"."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-left w-full mt-2 space-y-3 border-t border-neutral-100 pt-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] font-bold text-emerald-700 uppercase",
					children: "Método 1: Sem Pacote Premium (Recomendado)"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-[10.5px] text-muted-foreground mt-0.5 leading-snug",
					children: [
						"Informe o ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Link de Compartilhamento / URL do Chatbot" }),
						" obtido no Copilot Studio. Os usuários se autenticam via SSO corporativo do próprio navegador dentro do Iframe sem custo adicional."
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] font-bold text-blue-700 uppercase",
					children: "Método 2: Com Token Endpoint (Premium)"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-[10.5px] text-muted-foreground mt-0.5 leading-snug",
					children: [
						"Informe o ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Token Endpoint" }),
						" do canal ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "Site Personalizado" }),
						" para usar renderização via Direct Line nativa."
					]
				})] })]
			})
		]
	});
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CopilotChatbot, {})] });
//#endregion
export { SplitComponent as component };
