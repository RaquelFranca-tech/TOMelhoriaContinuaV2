import { o as __toESM } from "../_runtime.mjs";
import { n as supabase } from "./client-BqoqJNkg.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { _ as useNavigate, g as Link, l as useRouterState } from "../_libs/@tanstack/react-router+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { D as Settings2, J as LogOut, P as Plus, U as Moon, Ut as ChevronRight, b as SquareCheckBig, g as Sun, i as Workflow, k as Search, n as X, ot as LayoutDashboard, p as Trash2, rt as Lightbulb, st as Layers, tn as Bell } from "../_libs/lucide-react.mjs";
import { t as create } from "../_libs/zustand.mjs";
import { d as DialogContent, f as DialogDescription, h as DialogTitle, l as Dialog, m as DialogPortal, p as DialogOverlay, u as DialogClose } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { n as cn, r as useConfirm } from "./useConfirm-Dt9lkcKc.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as useDesignLogos, t as getCachedDesignLogosSync } from "./useDesignLogos-CZgCCNKQ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/usePicklist-vc052UFE.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function GembaViewLogo({ className = "h-12", style }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex items-center justify-center select-none",
		style,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			viewBox: "0 0 600 120",
			fill: "none",
			xmlns: "http://www.w3.org/2000/svg",
			className,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("defs", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
						id: "glowGrad",
						x1: "0%",
						y1: "0%",
						x2: "100%",
						y2: "100%",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
								offset: "0%",
								stopColor: "#22d3ee"
							}),
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
								offset: "50%",
								stopColor: "#3b82f6"
							}),
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
								offset: "100%",
								stopColor: "#6366f1"
							}),
							" "
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
						id: "viewTextGrad",
						x1: "0%",
						y1: "0%",
						x2: "100%",
						y2: "100%",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
								offset: "0%",
								stopColor: "#38bdf8"
							}),
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
								offset: "100%",
								stopColor: "#818cf8"
							}),
							" "
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
						id: "silverGrad",
						x1: "0%",
						y1: "0%",
						x2: "100%",
						y2: "100%",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
								offset: "0%",
								stopColor: "#ffffff"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
								offset: "100%",
								stopColor: "#cbd5e1"
							}),
							" "
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("filter", {
						id: "glow",
						x: "-20%",
						y: "-20%",
						width: "140%",
						height: "140%",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("feGaussianBlur", {
							stdDeviation: "3",
							result: "blur"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("feComposite", {
							in: "SourceGraphic",
							in2: "blur",
							operator: "over"
						})]
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
					transform: "translate(10, 0)",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
							x: "5",
							y: "42",
							width: "25",
							height: "4",
							rx: "2",
							fill: "url(#glowGrad)"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
							x: "15",
							y: "55",
							width: "20",
							height: "4",
							rx: "2",
							fill: "url(#glowGrad)"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
							x: "10",
							y: "68",
							width: "22",
							height: "4",
							rx: "2",
							fill: "url(#glowGrad)"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
							cx: "80",
							cy: "55",
							r: "42",
							stroke: "url(#glowGrad)",
							strokeWidth: "3.5",
							strokeDasharray: "210 50",
							strokeLinecap: "round",
							transform: "rotate(-45 80 55)",
							filter: "url(#glow)"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
							cx: "80",
							cy: "55",
							r: "42",
							stroke: "white",
							strokeWidth: "1",
							strokeOpacity: "0.3",
							strokeDasharray: "180 80",
							transform: "rotate(30 80 55)"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							d: "M 108 45 A 30 30 0 1 0 102 75 L 85 75 A 15 15 0 1 1 85 45 Z",
							fill: "url(#silverGrad)"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							d: "M 85 55 L 110 55",
							stroke: "url(#silverGrad)",
							strokeWidth: "4",
							strokeLinecap: "round"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
							cx: "80",
							cy: "55",
							r: "14",
							fill: "#0c4a6e",
							stroke: "url(#glowGrad)",
							strokeWidth: "2"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
							cx: "80",
							cy: "55",
							r: "7",
							fill: "url(#glowGrad)",
							filter: "url(#glow)"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
							cx: "77",
							cy: "52",
							r: "2.5",
							fill: "white"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							d: "M 58 55 C 68 40, 92 40, 102 55",
							stroke: "white",
							strokeWidth: "2.5",
							strokeLinecap: "round",
							strokeOpacity: "0.9"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							d: "M 58 55 C 68 70, 92 70, 102 55",
							stroke: "white",
							strokeWidth: "2",
							strokeLinecap: "round",
							strokeOpacity: "0.75"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
					x: "150",
					y: "68",
					fill: "url(#silverGrad)",
					fontFamily: "system-ui, -apple-system, sans-serif",
					fontWeight: "800",
					fontSize: "56",
					letterSpacing: "-1px",
					children: "Gemba"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
					x: "355",
					y: "68",
					fill: "url(#viewTextGrad)",
					fontFamily: "system-ui, -apple-system, sans-serif",
					fontWeight: "400",
					fontSize: "56",
					letterSpacing: "-1.5px",
					filter: "url(#glow)",
					children: "View"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M 120 95 L 145 95",
					stroke: "url(#glowGrad)",
					strokeWidth: "1.5",
					strokeLinecap: "round"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
					x: "155",
					y: "99",
					fill: "#94a3b8",
					fontFamily: "system-ui, -apple-system, sans-serif",
					fontWeight: "700",
					fontSize: "12.5",
					letterSpacing: "6.5px",
					children: "ENXERGAR O GEMBA. TRANSFORMAR RESULTADOS."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M 545 95 L 570 95",
					stroke: "url(#glowGrad)",
					strokeWidth: "1.5",
					strokeLinecap: "round"
				})
			]
		})
	});
}
function VibraLogo({ variant = "light", className = "h-8", style, type = "module" }) {
	const { data: logosQuery } = useDesignLogos();
	const cachedLogos = getCachedDesignLogosSync();
	const logos = logosQuery || cachedLogos;
	const fill = variant === "light" ? "#ffffff" : "#ff6900";
	const customLogoUrl = type === "login" ? logos?.login_logo : logos?.module_logo;
	const size = type === "login" ? logos?.login_logo_size : logos?.module_logo_size;
	if (customLogoUrl) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src: customLogoUrl,
		alt: "Logo",
		className: size ? "" : className,
		style: {
			display: "inline-block",
			verticalAlign: "middle",
			maxHeight: size ? void 0 : "100%",
			height: size ? `${size}px` : void 0,
			width: "auto",
			objectFit: "contain",
			...style
		},
		referrerPolicy: "no-referrer"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		xmlns: "http://www.w3.org/2000/svg",
		viewBox: "0 0 70 24",
		className,
		style: {
			display: "inline-block",
			verticalAlign: "middle",
			...style
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
			x: "0",
			y: "18",
			fontFamily: "system-ui, -apple-system, sans-serif",
			fontWeight: "900",
			fontSize: "18",
			letterSpacing: "0.5",
			fill,
			children: "VIBRA"
		})
	});
}
var Sheet = Dialog;
var SheetPortal = DialogPortal;
var SheetOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {
	className: cn("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props,
	ref
}));
SheetOverlay.displayName = DialogOverlay.displayName;
var sheetVariants = cva("fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out", {
	variants: { side: {
		top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
		bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
		left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
		right: "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"
	} },
	defaultVariants: { side: "right" }
});
var SheetContent = import_react.forwardRef(({ side = "right", className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
	ref,
	className: cn(sheetVariants({ side }), className),
	...props,
	children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
			className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "sr-only",
				children: "Close"
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
			className: "sr-only",
			children: "Painel Lateral"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
			className: "sr-only",
			children: "Informações adicionais do painel"
		}),
		children
	]
})] }));
SheetContent.displayName = DialogContent.displayName;
var SheetHeader = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col space-y-2 text-center sm:text-left", className),
	...props
});
SheetHeader.displayName = "SheetHeader";
var SheetFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
});
SheetFooter.displayName = "SheetFooter";
var SheetTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
	ref,
	className: cn("text-lg font-semibold text-foreground", className),
	...props
}));
SheetTitle.displayName = DialogTitle.displayName;
var SheetDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
SheetDescription.displayName = DialogDescription.displayName;
var useHierarchy = create()((set, get) => ({
	projetoId: null,
	projetoIds: [],
	iniciativaId: null,
	microprocessoId: null,
	tarefaId: null,
	drawerOpen: false,
	setProjeto: (id) => set({
		projetoId: id,
		projetoIds: id ? [id] : [],
		iniciativaId: null,
		microprocessoId: null,
		tarefaId: null
	}),
	setProjetoIds: (ids) => set({
		projetoIds: ids,
		projetoId: ids && ids.length === 1 ? ids[0] : null,
		iniciativaId: null,
		microprocessoId: null,
		tarefaId: null
	}),
	setIniciativa: (id) => set({
		iniciativaId: id,
		microprocessoId: null,
		tarefaId: null
	}),
	setMicroprocesso: (id) => set({
		microprocessoId: id,
		tarefaId: null
	}),
	setTarefa: (id) => set({ tarefaId: id }),
	openDrawer: () => set({ drawerOpen: true }),
	closeDrawer: () => set({ drawerOpen: false }),
	toggleDrawer: () => set((s) => ({ drawerOpen: !s.drawerOpen })),
	reset: () => set({
		projetoId: null,
		projetoIds: [],
		iniciativaId: null,
		microprocessoId: null,
		tarefaId: null
	}),
	get macroprocessoId() {
		return get().projetoId;
	},
	get processoId() {
		return null;
	},
	get acaoId() {
		return get().tarefaId;
	},
	setMacro: (id) => set({
		projetoId: id,
		projetoIds: id ? [id] : [],
		iniciativaId: null,
		tarefaId: null
	}),
	setProcesso: () => {},
	setAcao: (id) => set({ tarefaId: id })
}));
/**
* Subscribe to Postgres changes on a table and invalidate the given query keys
* (or call a custom handler) whenever anything changes.
*/
function useRealtimeTable(table, invalidateKeys = [], handler) {
	const qc = useQueryClient();
	(0, import_react.useEffect)(() => {
		const channel = supabase.channel(`rt-${table}-${Math.random().toString(36).slice(2, 8)}`).on("postgres_changes", {
			event: "*",
			schema: "public",
			table
		}, (payload) => {
			handler?.(payload);
			invalidateKeys.forEach((k) => qc.invalidateQueries({ queryKey: Array.isArray(k) ? k : [k] }));
		}).subscribe();
		return () => {
			supabase.removeChannel(channel);
		};
	}, [table, JSON.stringify(invalidateKeys)]);
}
/**
* Automatically recalculates and synchronizes progress up the hierarchy.
* Task -> Microprocesso -> Iniciativa.
*/
async function syncHierarchyProgress(params) {
	try {
		const { taskId } = params;
		let { microId, iniId } = params;
		if (taskId) {
			const { data: task } = await supabase.from("tarefas").select("microprocesso_id, iniciativa_id").eq("id", taskId).maybeSingle();
			if (task) {
				if (task.microprocesso_id) microId = task.microprocesso_id;
				if (task.iniciativa_id) iniId = task.iniciativa_id;
			}
		}
		if (microId && !iniId) {
			const { data: micro } = await supabase.from("microprocessos").select("iniciativa_id").eq("id", microId).maybeSingle();
			if (micro && micro.iniciativa_id) iniId = micro.iniciativa_id;
		}
		if (microId) {
			const { data: tasks = [] } = await supabase.from("tarefas").select("status").eq("microprocesso_id", microId).is("deleted_at", null);
			if (tasks.length > 0) {
				const completed = tasks.filter((t) => /conclu/i.test(t.status ?? "")).length;
				const progress = Math.round(completed / tasks.length * 100);
				const status = progress === 100 ? "Concluído" : "Em Andamento";
				await supabase.from("microprocessos").update({
					percentual_avanco: progress,
					status,
					updated_at: (/* @__PURE__ */ new Date()).toISOString()
				}).eq("id", microId);
			} else {
				const { data: m } = await supabase.from("microprocessos").select("status").eq("id", microId).maybeSingle();
				if (m) {
					const progress = /conclu/i.test(m.status ?? "") ? 100 : 0;
					await supabase.from("microprocessos").update({ percentual_avanco: progress }).eq("id", microId);
				}
			}
		}
		if (iniId) {
			const { data: micros = [] } = await supabase.from("microprocessos").select("percentual_avanco").eq("iniciativa_id", iniId).is("deleted_at", null);
			if (micros.length > 0) {
				const sum = micros.reduce((acc, m) => acc + Number(m.percentual_avanco ?? 0), 0);
				const progress = Math.round(sum / micros.length);
				const status = progress === 100 ? "Concluída" : "Desenvolvimento";
				await supabase.from("iniciativas").update({
					percentual_avanco: progress,
					status: progress === 100 ? status : void 0,
					updated_at: (/* @__PURE__ */ new Date()).toISOString()
				}).eq("id", iniId);
			} else {
				const { data: directTasks = [] } = await supabase.from("tarefas").select("status").eq("iniciativa_id", iniId).is("deleted_at", null);
				if (directTasks.length > 0) {
					const completed = directTasks.filter((t) => /conclu/i.test(t.status ?? "")).length;
					const progress = Math.round(completed / directTasks.length * 100);
					const status = progress === 100 ? "Concluída" : "Desenvolvimento";
					await supabase.from("iniciativas").update({
						percentual_avanco: progress,
						status: progress === 100 ? status : void 0,
						updated_at: (/* @__PURE__ */ new Date()).toISOString()
					}).eq("id", iniId);
				}
			}
		}
	} catch (error) {
		console.error("Error syncing hierarchy progress:", error);
	}
}
/**
* Resequences all active (non-deleted) initiatives for a project
* to ensure a strictly continuous sequence: INI-001, INI-002, INI-003, ...
* without any gaps or breaks, ordered by created_at.
*
* Returns the next available code (e.g., INI-004) if a new one is to be added.
*/
async function resequenceProjectIniciativas(projectId) {
	if (!projectId) return "INI-001";
	try {
		const { data: initiatives, error } = await supabase.from("iniciativas").select("id, codigo").eq("projeto_id", projectId).is("deleted_at", null).order("created_at", { ascending: true });
		if (error) {
			console.error("Error fetching initiatives for resequencing:", error);
			return "INI-001";
		}
		const list = initiatives ?? [];
		for (let i = 0; i < list.length; i++) {
			const expectedCode = `INI-${String(i + 1).padStart(3, "0")}`;
			if (list[i].codigo !== expectedCode) {
				const { error: updateError } = await supabase.from("iniciativas").update({ codigo: expectedCode }).eq("id", list[i].id);
				if (updateError) console.error(`Error updating initiative code for id ${list[i].id}:`, updateError);
				else list[i].codigo = expectedCode;
			}
		}
		const nextNum = list.length + 1;
		return `INI-${String(nextNum).padStart(3, "0")}`;
	} catch (err) {
		console.error("Failed to resequence project initiatives:", err);
		return "INI-001";
	}
}
var LEVELS = [
	{
		key: "projetos",
		label: "Projetos",
		icon: Layers,
		parentKey: null,
		parentCol: null,
		nameCol: "nome"
	},
	{
		key: "iniciativas",
		label: "Iniciativas",
		icon: Lightbulb,
		parentKey: "projetos",
		parentCol: "projeto_id",
		nameCol: "titulo"
	},
	{
		key: "microprocessos",
		label: "Microprocessos",
		icon: Layers,
		parentKey: "iniciativas",
		parentCol: "iniciativa_id",
		nameCol: "titulo"
	},
	{
		key: "tarefas",
		label: "Tarefas",
		icon: SquareCheckBig,
		parentKey: "microprocessos",
		parentCol: "microprocesso_id",
		nameCol: "titulo"
	}
];
function HierarchyDrawer() {
	const { drawerOpen, closeDrawer } = useHierarchy();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
		open: drawerOpen,
		onOpenChange: (o) => !o && closeDrawer(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
			side: "right",
			className: "w-full max-w-[1150px] p-0 sm:max-w-[1150px]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetHeader, {
				className: "border-b border-border bg-vibra-50 px-6 py-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetTitle, {
					className: "flex items-center gap-2 text-vibra-800",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layers, { className: "h-5 w-5" }), " Hierarquia VIBRA"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] text-muted-foreground",
					children: "Projeto → Initiative → Microprocesso → Tarefa. Edição inline com sincronização em tempo real."
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid h-[calc(100vh-92px)] grid-cols-4 divide-x divide-border overflow-hidden",
				children: LEVELS.map((lvl) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Column, { level: lvl }, lvl.key))
			})]
		})
	});
}
function Column({ level }) {
	const qc = useQueryClient();
	const confirm = useConfirm();
	const sel = useHierarchy();
	const [adding, setAdding] = (0, import_react.useState)("");
	const [filter, setFilter] = (0, import_react.useState)("");
	const parentId = level.parentKey === "projetos" ? sel.projetoId : level.parentKey === "iniciativas" ? sel.iniciativaId : level.parentKey === "microprocessos" ? sel.microprocessoId : null;
	const selectedId = level.key === "projetos" ? sel.projetoId : level.key === "iniciativas" ? sel.iniciativaId : level.key === "microprocessos" ? sel.microprocessoId : sel.tarefaId;
	const setSelected = (id) => {
		if (level.key === "projetos") sel.setProjeto(id);
		else if (level.key === "iniciativas") sel.setIniciativa(id);
		else if (level.key === "microprocessos") sel.setMicroprocesso(id);
		else sel.setTarefa(id);
	};
	useRealtimeTable(level.key, [[
		"hier",
		level.key,
		parentId ?? "root"
	]]);
	const toggleTask = useMutation({
		mutationFn: async ({ id, completed }) => {
			const patch = { status: completed ? "Concluída" : "Pendente" };
			if (completed) patch.data_fim_real = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
			const { error } = await supabase.from("tarefas").update(patch).eq("id", id);
			if (error) throw error;
			await syncHierarchyProgress({ taskId: id });
		},
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["hier"] });
			qc.invalidateQueries({ queryKey: ["kanban-ini"] });
			qc.invalidateQueries({ queryKey: ["tarefas-board"] });
			qc.invalidateQueries({ queryKey: ["acoes-list"] });
		},
		onError: (e) => toast.error(e.message)
	});
	const enabled = level.parentKey === null || !!parentId;
	const { data: rows = [], isLoading } = useQuery({
		queryKey: [
			"hier",
			level.key,
			parentId ?? "root"
		],
		enabled,
		queryFn: async () => {
			if (level.key === "projetos") {
				const { data: projectsData, error: pErr } = await supabase.from("projetos").select("id, nome").is("deleted_at", null).order("nome");
				if (pErr) throw pErr;
				const { data: initiativesData, error: iErr } = await supabase.from("iniciativas").select("projeto_id, percentual_avanco").is("deleted_at", null);
				if (iErr) throw iErr;
				return projectsData.map((p) => {
					const pInis = initiativesData.filter((ini) => ini.projeto_id === p.id);
					let progress = 0;
					if (pInis.length > 0) {
						const sum = pInis.reduce((acc, ini) => acc + Number(ini.percentual_avanco ?? 0), 0);
						progress = Math.round(sum / pInis.length);
					}
					return {
						...p,
						percentual_avanco: progress
					};
				});
			}
			let selectFields = `id, ${level.nameCol}`;
			if (level.key === "iniciativas" || level.key === "microprocessos") selectFields += `, percentual_avanco, status`;
			else if (level.key === "tarefas") selectFields += `, status`;
			let q = supabase.from(level.key).select(selectFields).is("deleted_at", null);
			if (level.parentCol && parentId) q = q.eq(level.parentCol, parentId);
			const { data, error } = await q.order(level.nameCol);
			if (error) throw error;
			return data ?? [];
		}
	});
	const filtered = (0, import_react.useMemo)(() => {
		if (!filter) return rows;
		const f = filter.toLowerCase();
		return rows.filter((r) => (r.nome ?? r.titulo ?? "").toLowerCase().includes(f));
	}, [rows, filter]);
	const create = useMutation({
		mutationFn: async (name) => {
			if (!name.trim()) throw new Error("Informe o nome");
			if (level.parentCol && !parentId) throw new Error(`Selecione um(a) ${LEVELS.find((l) => l.key === level.parentKey)?.label.slice(0, -1)}`);
			const { data: { user } } = await supabase.auth.getUser();
			const payload = {
				[level.nameCol]: name.trim(),
				created_by: user?.id
			};
			if (level.parentCol && parentId) payload[level.parentCol] = parentId;
			if (level.key === "iniciativas" && parentId) payload.codigo = await resequenceProjectIniciativas(parentId);
			const { error } = await supabase.from(level.key).insert(payload);
			if (error) throw error;
			if (level.key === "tarefas" && parentId) await syncHierarchyProgress({ microId: parentId });
			else if (level.key === "microprocessos" && parentId) await syncHierarchyProgress({ iniId: parentId });
		},
		onSuccess: () => {
			setAdding("");
			toast.success(`${level.label.slice(0, -1)} criado(a)`);
			qc.invalidateQueries({ queryKey: ["hier"] });
			qc.invalidateQueries({ queryKey: ["kanban-ini"] });
			qc.invalidateQueries({ queryKey: ["tarefas-board"] });
		},
		onError: (e) => toast.error(e.message)
	});
	const remove = useMutation({
		mutationFn: async (id) => {
			const { error } = await supabase.from(level.key).update({ deleted_at: (/* @__PURE__ */ new Date()).toISOString() }).eq("id", id);
			if (error) throw error;
			if (level.key === "tarefas") await syncHierarchyProgress({ microId: parentId });
			else if (level.key === "microprocessos") await syncHierarchyProgress({ iniId: parentId });
			else if (level.key === "iniciativas" && parentId) await resequenceProjectIniciativas(parentId);
		},
		onSuccess: () => {
			toast.success("Removido (lógico)");
			qc.invalidateQueries({ queryKey: ["hier"] });
			qc.invalidateQueries({ queryKey: ["kanban-ini"] });
			qc.invalidateQueries({ queryKey: ["tarefas-board"] });
		},
		onError: (e) => toast.error(e.message)
	});
	const Icon = level.icon;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col bg-white",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "flex items-center gap-2 border-b border-border bg-vibra-50/50 px-3 py-2.5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-3.5 w-3.5 text-vibra-700" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
					className: "text-[11px] font-extrabold uppercase tracking-wide text-vibra-800",
					children: level.label
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "ml-auto rounded-full bg-vibra-100 px-1.5 text-[10px] font-bold text-vibra-700",
					children: rows.length
				})
			]
		}), !enabled ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-1 items-center justify-center px-4 text-center text-[11px] text-muted-foreground",
			children: [
				"Selecione um(a)",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
				LEVELS.find((l) => l.key === level.parentKey)?.label.slice(0, -1)
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "border-b border-border px-2 py-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-2 top-1/2 h-3 w-3 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: "h-7 w-full rounded border border-border bg-white pl-7 pr-2 text-[11px] outline-none focus:border-vibra-700",
						placeholder: "Filtrar...",
						value: filter,
						onChange: (e) => setFilter(e.target.value)
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "flex-1 overflow-y-auto px-1.5 py-1.5",
				children: [
					isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "px-2 py-2 text-[11px] text-muted-foreground",
						children: "Carregando…"
					}),
					!isLoading && filtered.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "px-2 py-2 text-[11px] text-muted-foreground",
						children: "Nenhum registro."
					}),
					filtered.map((r) => {
						const active = selectedId === r.id;
						const hasProgress = r.percentual_avanco !== void 0 && r.percentual_avanco !== null;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: `group mb-0.5 flex cursor-pointer items-center gap-2 rounded px-2 py-1.5 text-[12px] transition ${active ? "bg-vibra-700 text-white" : "text-foreground hover:bg-vibra-50"}`,
							onClick: () => setSelected(r.id),
							children: [
								level.key === "tarefas" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 flex-1 min-w-0",
									onClick: (e) => e.stopPropagation(),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "checkbox",
										checked: /conclu/i.test(r.status ?? ""),
										onChange: (e) => {
											toggleTask.mutate({
												id: r.id,
												completed: e.target.checked
											});
										},
										className: `h-3.5 w-3.5 rounded border-gray-300 text-vibra-600 focus:ring-vibra-600 cursor-pointer shrink-0 ${active ? "accent-white border-white/40" : ""}`
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `truncate font-medium flex-1 cursor-pointer ${/conclu/i.test(r.status ?? "") ? active ? "line-through text-white/60" : "line-through text-slate-400" : active ? "text-white" : "text-slate-800"}`,
										onClick: () => setSelected(r.id),
										children: r.nome ?? r.titulo ?? "—"
									})]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col flex-1 min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `truncate font-bold ${active ? "text-white" : "text-slate-800"}`,
										children: r.nome ?? r.titulo ?? "—"
									}), hasProgress && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-1.5 flex items-center gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: `h-1 w-full rounded-full overflow-hidden ${active ? "bg-white/20" : "bg-slate-100"}`,
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: `h-1 rounded-full transition-all duration-300 ${active ? "bg-white" : "bg-vibra-600"}`,
												style: { width: `${Math.min(100, Number(r.percentual_avanco))}%` }
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: `text-[9px] font-black font-mono shrink-0 ${active ? "text-white/80" : "text-slate-500"}`,
											children: [Number(r.percentual_avanco).toFixed(0), "%"]
										})]
									})]
								}),
								active && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-3 w-3 shrink-0" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: async (e) => {
										e.stopPropagation();
										if (await confirm("Remover item?", `Deseja realmente remover "${r.nome ?? r.titulo ?? "este item"}"?`)) remove.mutate(r.id);
									},
									className: `flex h-5 w-5 items-center justify-center rounded transition shrink-0 ${active ? "text-white/80 hover:text-white hover:bg-vibra-800" : "text-slate-400 hover:text-red-600 hover:bg-red-50"}`,
									title: "Remover",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" })
								})
							]
						}) }, r.id);
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "border-t border-border bg-vibra-50/30 p-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "flex gap-1",
					onSubmit: (e) => {
						e.preventDefault();
						create.mutate(adding);
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: adding,
						onChange: (e) => setAdding(e.target.value),
						placeholder: `Novo(a) ${level.label.slice(0, -1).toLowerCase()}...`,
						className: "h-7 flex-1 rounded border border-border bg-white px-2 text-[11px] outline-none focus:border-vibra-700"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "submit",
						disabled: create.isPending || !adding.trim(),
						className: "inline-flex h-7 items-center gap-1 rounded bg-vibra-700 px-2 text-[11px] font-bold text-white hover:bg-vibra-800 disabled:opacity-50",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3 w-3" })
					})]
				})
			})
		] })]
	});
}
var MODULES = [
	{
		id: "executivo",
		label: "Executivo",
		to: "/executivo",
		icon: LayoutDashboard
	},
	{
		id: "mapeamento",
		label: "Mapeamento",
		to: "/mapeamento",
		icon: Workflow
	},
	{
		id: "configuracoes",
		label: "Configurações",
		to: "/configuracoes",
		icon: Settings2
	}
];
function AppShell({ moduleId, tabs, activeTab, onTabChange, children }) {
	const navigate = useNavigate();
	const qc = useQueryClient();
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const [theme, setTheme] = (0, import_react.useState)(() => {
		if (typeof window !== "undefined") {
			const saved = localStorage.getItem("vibra-theme");
			if (saved) return saved;
			return document.documentElement.classList.contains("dark") ? "dark" : "light";
		}
		return "light";
	});
	const [notifOpen, setNotifOpen] = (0, import_react.useState)(false);
	const [newProjOpen, setNewProjOpen] = (0, import_react.useState)(false);
	const [newProjName, setNewProjName] = (0, import_react.useState)("");
	const { projetoId, projetoIds, setProjeto, setProjetoIds, openDrawer } = useHierarchy();
	const [projOpen, setProjOpen] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		document.documentElement.classList.toggle("dark", theme === "dark");
		localStorage.setItem("vibra-theme", theme);
	}, [theme]);
	async function criarProjetoRapido() {
		const nome = newProjName.trim();
		if (!nome) return toast.error("Informe o nome do projeto");
		const { data: { user } } = await supabase.auth.getUser();
		const { data, error } = await supabase.from("projetos").insert({
			nome,
			created_by: user?.id ?? null
		}).select("id").single();
		if (error) return toast.error(error.message);
		toast.success("Projeto criado");
		qc.invalidateQueries({ queryKey: ["macroprocessos-list"] });
		setProjeto(data.id);
		setNewProjName("");
		setNewProjOpen(false);
	}
	const { data: macros = [] } = useQuery({
		queryKey: ["macroprocessos-list"],
		queryFn: async () => {
			const { data, error } = await supabase.from("projetos").select("id,nome").is("deleted_at", null).order("nome");
			if (error) throw error;
			return data ?? [];
		}
	});
	const { data: profile } = useQuery({
		queryKey: ["me"],
		queryFn: async () => {
			const { data: { user } } = await supabase.auth.getUser();
			if (!user) return null;
			const { data } = await supabase.from("profiles").select("nome,email").eq("id", user.id).single();
			return data;
		}
	});
	const { data: myRole = "visualizador" } = useQuery({
		queryKey: ["my-role", profile?.email],
		queryFn: async () => {
			const { data: { user } } = await supabase.auth.getUser();
			if (!user) return "visualizador";
			const emailLower = user.email?.toLowerCase() || "";
			if (emailLower === "rfranca@vibraenergia.com.br" || emailLower === "rfranca@vibra.com.br" || emailLower.includes("raquel") && emailLower.includes("vibra") || emailLower === "admin@vibraenergia.com.br" || emailLower === "sfquequel@gmail.com" || emailLower === "juliano.maluf@mjv.com.br") return "admin";
			const { data } = await supabase.from("user_roles").select("role").eq("user_id", user.id).maybeSingle();
			return data?.role ?? "visualizador";
		}
	});
	const { data: rolePermissions = {} } = useQuery({
		queryKey: ["permissions-config", myRole],
		enabled: !!myRole,
		queryFn: async () => {
			const { data } = await supabase.from("app_configuracoes").select("valor").eq("chave", `permissions_${myRole}`).maybeSingle();
			return data?.valor ?? {};
		}
	});
	const hasPermission = (key, defaultVal = true) => {
		if (myRole === "admin") return true;
		if (rolePermissions[key] !== void 0) return rolePermissions[key];
		if (key === "modulo_configuracao" || key.startsWith("aba_configuracoes_")) return myRole === "admin";
		return defaultVal;
	};
	const { data: footerConfig } = useQuery({
		queryKey: ["app-footer-config"],
		queryFn: async () => {
			const { data } = await supabase.from("app_configuracoes").select("valor").eq("chave", "rodape").maybeSingle();
			return data;
		}
	});
	const { data: logosQuery } = useDesignLogos();
	const cachedLogos = getCachedDesignLogosSync();
	const logos = logosQuery || cachedLogos;
	async function signOut() {
		const { data: { user } } = await supabase.auth.getUser();
		if (user) await supabase.from("user_session_log").insert({
			user_id: user.id,
			email: user.email,
			evento: "logoff"
		});
		await supabase.auth.signOut();
		toast.success("Sessão encerrada");
		navigate({ to: "/auth" });
	}
	const initials = (profile?.nome ?? profile?.email ?? "U").split(/\s+/).slice(0, 2).map((p) => p[0]?.toUpperCase()).join("");
	const finalFooterText = (footerConfig?.valor)?.texto || "Transformação Digital 🔹 Eficiência Operacional 🔹 Melhoria Contínua 🧩Desenvolvido por Raquel França do Escritório de Transformação 🚀";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-screen w-full flex-col bg-vibra-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "sticky top-0 z-30 bg-vibra-800 text-white shadow-vibra",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex h-[60px] items-center gap-3 px-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex items-center gap-3 shrink-0",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VibraLogo, {
								variant: "light",
								className: "h-7 w-auto shrink-0"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "hidden lg:inline text-[11px] font-medium text-white/50 tracking-wide border-l border-white/20 pl-3 select-none",
							children: "Sistema de Gestão de Melhoria Contínua do Escritório de Transformação"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative ml-2 hidden items-center gap-1.5 sm:flex",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => setProjOpen((v) => !v),
									className: "flex h-9 min-w-[240px] items-center justify-between gap-2 rounded-md border border-white/15 bg-white/10 px-3 text-[12.5px] font-medium text-white outline-none backdrop-blur transition hover:bg-white/15",
									title: "Selecionar projetos",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "truncate",
										children: projetoIds === null ? "Todos os projetos" : projetoIds.length === 0 ? "Sem filtro de projeto" : projetoIds.length === 1 ? macros.find((m) => m.id === projetoIds[0])?.nome ?? "1 projeto" : `${projetoIds.length} projetos selecionados`
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-white/70",
										children: "▾"
									})]
								}),
								projOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "absolute left-0 top-full z-40 mt-1 w-[300px] rounded-md border border-border bg-white p-2 text-foreground shadow-vibra",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mb-1 flex items-center justify-between gap-2 border-b border-border pb-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												onClick: () => {
													setProjetoIds(null);
												},
												className: "text-[11px] font-semibold text-vibra-700 hover:underline",
												children: "Selecionar todos"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												onClick: () => {
													setProjetoIds([]);
													qc.invalidateQueries();
												},
												className: "text-[11px] text-muted-foreground hover:underline",
												children: "Limpar"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "max-h-[280px] overflow-y-auto",
											children: [macros.map((m) => {
												return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
													className: "flex cursor-pointer items-center gap-2 rounded px-1.5 py-1 text-[12px] hover:bg-vibra-50",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
														type: "checkbox",
														checked: projetoIds === null ? true : projetoIds.includes(m.id),
														onChange: (e) => {
															const base = projetoIds ?? macros.map((x) => x.id);
															const next = e.target.checked ? Array.from(/* @__PURE__ */ new Set([...base, m.id])) : base.filter((id) => id !== m.id);
															setProjetoIds(next);
														}
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "truncate",
														children: m.nome
													})]
												}, m.id);
											}), macros.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "px-2 py-3 text-center text-[11px] italic text-muted-foreground",
												children: "Nenhum projeto cadastrado."
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "mt-1 flex justify-end border-t border-border pt-1.5",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												onClick: () => setProjOpen(false),
												className: "rounded bg-vibra-700 px-2 py-1 text-[11px] font-semibold text-white hover:bg-vibra-800",
												children: "OK"
											})
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => setNewProjOpen(true),
									className: "inline-flex h-9 items-center gap-1 rounded-md border border-white/15 bg-white/10 px-2.5 text-[11.5px] font-semibold text-white backdrop-blur transition hover:bg-white/15",
									title: "Criar novo projeto",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3.5 w-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "hidden md:inline",
										children: "Novo Projeto"
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: openDrawer,
							className: "hidden h-9 items-center gap-1.5 rounded-md border border-white/15 bg-white/10 px-3 text-[11.5px] font-semibold text-white backdrop-blur transition hover:bg-white/15 sm:inline-flex",
							title: "Abrir hierarquia",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layers, { className: "h-3.5 w-3.5" }), "Hierarquia"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
							className: "ml-auto flex items-center gap-0.5 rounded-full border border-white/15 bg-white/[0.06] p-0.5 backdrop-blur",
							children: MODULES.filter((m) => {
								if (m.id === "executivo") return hasPermission("modulo_executivo", true);
								if (m.id === "mapeamento") return hasPermission("modulo_mapeamento", true);
								if (m.id === "configuracoes") return hasPermission("modulo_configuracao", false);
								return true;
							}).map((m) => {
								const active = pathname.startsWith(m.to);
								const Icon = m.icon;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: m.to,
									className: `flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11.5px] font-semibold transition-all ${active ? "bg-white text-vibra-800 shadow-vibra-sm" : "text-white/75 hover:bg-white/10 hover:text-white"}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-3.5 w-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "hidden md:inline",
										children: m.label
									})]
								}, m.id);
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setTheme((t) => t === "light" ? "dark" : "light"),
							className: "rounded-md p-2 text-white/80 hover:bg-white/10 hover:text-white",
							"aria-label": "Alternar tema",
							title: theme === "light" ? "Tema escuro" : "Tema claro",
							children: theme === "light" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className: "h-4 w-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => setNotifOpen((v) => !v),
								className: "relative rounded-md p-2 text-white/80 hover:bg-white/10 hover:text-white",
								"aria-label": "Notificações",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-red-500" })]
							}), notifOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "absolute right-0 top-full mt-2 w-72 rounded-lg border border-border bg-white p-3 text-foreground shadow-vibra",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mb-2 text-[12px] font-bold text-vibra-800",
									children: "Notificações"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[12px] text-muted-foreground",
									children: "Você não tem notificações novas."
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "ml-1 flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-[12px] font-bold uppercase text-white",
								children: initials
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: signOut,
								className: "rounded-md p-2 text-white/80 hover:bg-white/10 hover:text-white",
								"aria-label": "Sair",
								title: "Sair",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-4 w-4" })
							})]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "border-t border-white/10 bg-white text-foreground",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1 overflow-x-auto px-4",
						children: [tabs.filter((t) => {
							const key = `aba_${moduleId}_${t.id}`;
							return hasPermission(key, true);
						}).map((t) => {
							const active = t.id === activeTab;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => onTabChange(t.id),
								className: `relative shrink-0 px-3 py-3 text-[12.5px] font-semibold transition-colors ${active ? "text-vibra-800" : "text-muted-foreground hover:text-vibra-800"}`,
								children: [t.label, active && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inset-x-2 -bottom-px h-[3px] rounded-t bg-vibra-600" })]
							}, t.id);
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "ml-auto hidden items-center gap-2 py-2 text-[11px] text-muted-foreground sm:flex",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-vibra-600" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								"Módulo:",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
									className: "text-vibra-800",
									children: MODULES.find((m) => m.id === moduleId)?.label
								})
							] })]
						})]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "flex-1 px-6 py-6",
				children
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
				className: "border-t border-white/5 bg-[#044317] px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-inner",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-center sm:text-left text-[11.5px] font-medium text-slate-300 max-w-4xl leading-relaxed",
					children: finalFooterText
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "shrink-0",
					children: logos?.footer_logo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: logos.footer_logo,
						alt: "Logo do Rodapé",
						style: {
							height: logos.footer_logo_size ? `${logos.footer_logo_size}px` : "32px",
							width: "auto",
							objectFit: "contain"
						},
						referrerPolicy: "no-referrer"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GembaViewLogo, { className: "h-10 w-auto" })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HierarchyDrawer, {}),
			newProjOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4",
				onClick: () => setNewProjOpen(false),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					onClick: (e) => e.stopPropagation(),
					className: "w-full max-w-md rounded-xl border border-border bg-white p-5 shadow-vibra",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mb-3 text-[15px] font-bold text-vibra-800",
							children: "Novo Projeto"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-[12px] font-semibold text-vibra-800",
							children: "Nome do projeto"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							autoFocus: true,
							value: newProjName,
							onChange: (e) => setNewProjName(e.target.value),
							onKeyDown: (e) => {
								if (e.key === "Enter") criarProjetoRapido();
							},
							placeholder: "Ex.: Transformação Digital Comercial",
							className: "mt-1 w-full rounded-md border border-input bg-white px-3 py-2 text-[13px]"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex justify-end gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setNewProjOpen(false),
								className: "rounded-md border border-border px-3 py-1.5 text-[12px]",
								children: "Cancelar"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: criarProjetoRapido,
								className: "rounded-md bg-vibra-700 px-3 py-1.5 text-[12px] font-semibold text-white hover:bg-vibra-800",
								children: "Criar"
							})]
						})
					]
				})
			})
		]
	});
}
/**
* Mantemos um único canal Realtime global para picklists, compartilhado
* por todas as instâncias do hook. Ao receber qualquer mudança em
* `picklists` ou `picklist_valores`, invalidamos todas as queries
* ["picklist", ...] para que os PicklistFields refletem em tempo real
* adições/edições feitas em Configurações → Picklists.
*/
var _channelRefCount = 0;
var _channel = null;
function ensurePicklistRealtime(invalidate) {
	_channelRefCount += 1;
	if (!_channel) _channel = supabase.channel("rt-picklists-global").on("postgres_changes", {
		event: "*",
		schema: "public",
		table: "picklists"
	}, invalidate).on("postgres_changes", {
		event: "*",
		schema: "public",
		table: "picklist_valores"
	}, invalidate).subscribe();
	return () => {
		_channelRefCount -= 1;
		if (_channelRefCount <= 0 && _channel) {
			supabase.removeChannel(_channel);
			_channel = null;
			_channelRefCount = 0;
		}
	};
}
async function syncSharedPeopleChange(action, value, oldValueOrId) {
	const sharedCategories = [
		"Participantes",
		"Colaborador",
		"Para quem",
		"Perfil Vinculado"
	];
	for (const cat of sharedCategories) {
		const { data: existingPl } = await supabase.from("picklists").select("id").eq("categoria", cat).maybeSingle();
		if (!existingPl) await supabase.from("picklists").insert({ categoria: cat });
	}
	const { data: pls } = await supabase.from("picklists").select("id, categoria").in("categoria", sharedCategories);
	if (!pls || pls.length === 0) return;
	if (action === "add") for (const pl of pls) {
		const { data: existing } = await supabase.from("picklist_valores").select("id").eq("picklist_id", pl.id).eq("valor", value).eq("ativo", true).maybeSingle();
		if (!existing) {
			const { data: vals } = await supabase.from("picklist_valores").select("ordem").eq("picklist_id", pl.id);
			const nextOrder = (vals?.length ?? 0) + 1;
			await supabase.from("picklist_valores").insert({
				picklist_id: pl.id,
				valor: value,
				ordem: nextOrder,
				ativo: true
			});
		}
	}
	else if (action === "update" && oldValueOrId) for (const pl of pls) await supabase.from("picklist_valores").update({ valor: value }).eq("picklist_id", pl.id).eq("valor", oldValueOrId);
	else if (action === "delete") for (const pl of pls) await supabase.from("picklist_valores").update({ ativo: false }).eq("picklist_id", pl.id).eq("valor", value);
}
var EMPTY_ARRAY = [];
function usePicklist(categoria) {
	const qc = useQueryClient();
	const key = ["picklist", categoria];
	(0, import_react.useEffect)(() => {
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
				"Perfil Vinculado"
			].includes(categoria);
			const targetCategory = isSharedPeople ? "Perfil Vinculado" : categoria;
			const { data: pl } = await supabase.from("picklists").select("id").eq("categoria", targetCategory).maybeSingle();
			const plId = pl?.id || null;
			let finalVals = [];
			if (isSharedPeople) {
				const { data: picklists } = await supabase.from("picklists").select("id, categoria").in("categoria", [
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
					"Para quem"
				]);
				let vals = [];
				if (picklists && picklists.length > 0) {
					const { data } = await supabase.from("picklist_valores").select("id, valor, picklist_id").in("picklist_id", picklists.map((p) => p.id)).eq("ativo", true);
					if (data) vals = data;
				}
				const { data: profiles } = await supabase.from("profiles").select("id, nome");
				const { data: equipe } = await supabase.from("equipe").select("id, extras, papel_macroprocesso").eq("ativo", true);
				const uniqueNames = /* @__PURE__ */ new Set();
				const result = [];
				if (profiles) for (const p of profiles) {
					const name = p.nome?.trim();
					if (name && !uniqueNames.has(name.toLowerCase())) {
						uniqueNames.add(name.toLowerCase());
						result.push({
							id: `prof-${p.id}`,
							valor: name
						});
					}
				}
				if (equipe) for (const m of equipe) {
					const extrasName = m.extras?.nome?.trim();
					if (extrasName && !uniqueNames.has(extrasName.toLowerCase())) {
						uniqueNames.add(extrasName.toLowerCase());
						result.push({
							id: `equipe-${m.id}`,
							valor: extrasName
						});
					}
					const raw = String(m.papel_macroprocesso ?? "");
					const nomeFallback = raw.includes(" — ") ? raw.split(" — ", 1)[0].trim() : void 0;
					if (nomeFallback && !uniqueNames.has(nomeFallback.toLowerCase())) {
						uniqueNames.add(nomeFallback.toLowerCase());
						result.push({
							id: `equipe-fallback-${m.id}`,
							valor: nomeFallback
						});
					}
				}
				for (const v of vals) {
					const val = v.valor?.trim();
					if (val && !uniqueNames.has(val.toLowerCase())) {
						uniqueNames.add(val.toLowerCase());
						result.push({
							id: v.id,
							valor: val
						});
					}
				}
				result.sort((a, b) => a.valor.localeCompare(b.valor));
				finalVals = result;
			} else if (plId) {
				const { data: vals } = await supabase.from("picklist_valores").select("id,valor,ordem").eq("picklist_id", plId).eq("ativo", true).order("ordem");
				finalVals = (vals ?? []).map((v) => ({
					id: v.id,
					valor: v.valor
				}));
			}
			return {
				picklistId: plId,
				values: finalVals
			};
		},
		staleTime: 3e4
	});
	const add = useMutation({
		mutationFn: async (valor) => {
			if ([
				"Participantes",
				"Colaborador",
				"Para quem",
				"Perfil Vinculado"
			].includes(categoria)) await syncSharedPeopleChange("add", valor);
			else {
				let pid = q.data?.picklistId;
				if (!pid) {
					const { data, error } = await supabase.from("picklists").insert({ categoria }).select("id").single();
					if (error) throw error;
					pid = data.id;
				}
				const ordem = (q.data?.values?.length ?? 0) + 1;
				const { error } = await supabase.from("picklist_valores").insert({
					picklist_id: pid,
					valor,
					ordem,
					ativo: true
				});
				if (error) throw error;
			}
		},
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["picklist"] });
			qc.invalidateQueries({ queryKey: ["profiles"] });
			qc.invalidateQueries({ queryKey: ["equipe"] });
		}
	});
	const remove = useMutation({
		mutationFn: async (id) => {
			if (id.startsWith("prof-")) {
				const profId = id.replace("prof-", "");
				await supabase.from("profiles").delete().eq("id", profId);
			} else if (id.startsWith("equipe-") || id.startsWith("equipe-fallback-")) {
				const eqId = id.replace("equipe-", "").replace("fallback-", "");
				await supabase.from("equipe").update({ ativo: false }).eq("id", eqId);
			} else if ([
				"Participantes",
				"Colaborador",
				"Para quem",
				"Perfil Vinculado"
			].includes(categoria)) {
				const { data: valObj } = await supabase.from("picklist_valores").select("valor").eq("id", id).maybeSingle();
				if (valObj?.valor) await syncSharedPeopleChange("delete", valObj.valor);
			} else {
				const { error } = await supabase.from("picklist_valores").update({ ativo: false }).eq("id", id);
				if (error) throw error;
			}
		},
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["picklist"] });
			qc.invalidateQueries({ queryKey: ["profiles"] });
			qc.invalidateQueries({ queryKey: ["equipe"] });
		}
	});
	const rename = useMutation({
		mutationFn: async ({ id, valor }) => {
			if (id.startsWith("prof-")) {
				const profId = id.replace("prof-", "");
				await supabase.from("profiles").update({ nome: valor }).eq("id", profId);
			} else if (id.startsWith("equipe-") || id.startsWith("equipe-fallback-")) {
				const eqId = id.replace("equipe-", "").replace("fallback-", "");
				const { data } = await supabase.from("equipe").select("extras, papel_macroprocesso").eq("id", eqId).maybeSingle();
				if (data) {
					const extras = {
						...data.extras ?? {},
						nome: valor
					};
					const raw = String(data.papel_macroprocesso ?? "");
					const papel = raw.includes(" — ") ? raw.split(" — ", 2)[1] : raw;
					await supabase.from("equipe").update({
						extras,
						papel_macroprocesso: `${valor} — ${papel}`
					}).eq("id", eqId);
				}
			} else if ([
				"Participantes",
				"Colaborador",
				"Para quem",
				"Perfil Vinculado"
			].includes(categoria)) {
				const { data: valObj } = await supabase.from("picklist_valores").select("valor").eq("id", id).maybeSingle();
				if (valObj?.valor) await syncSharedPeopleChange("update", valor, valObj.valor);
			} else {
				const { error } = await supabase.from("picklist_valores").update({ valor }).eq("id", id);
				if (error) throw error;
			}
		},
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["picklist"] });
			qc.invalidateQueries({ queryKey: ["profiles"] });
			qc.invalidateQueries({ queryKey: ["equipe"] });
		}
	});
	return {
		values: q.data?.values ?? EMPTY_ARRAY,
		isLoading: q.isLoading,
		add,
		remove,
		rename
	};
}
//#endregion
export { syncHierarchyProgress as a, usePicklist as c, resequenceProjectIniciativas as i, useRealtimeTable as l, Sheet as n, syncSharedPeopleChange as o, SheetContent as r, useHierarchy as s, AppShell as t };
