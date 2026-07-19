import { o as __toESM } from "./_runtime.mjs";
import { n as supabase, t as generateUUID } from "./_ssr/client-BqoqJNkg.mjs";
import { u as require_react } from "./_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "./_libs/@radix-ui/react-accordion+[...].mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "./_libs/tanstack__react-query.mjs";
import { A as Save, Bt as CircleCheckBig, Dt as DollarSign, Ft as ClipboardCheck, Gt as Check, I as Percent, It as Circle, K as Maximize2, Lt as CircleQuestionMark, Nt as Coins, O as Send, P as Plus, Pt as Clock, Q as ListOrdered, Qt as Calculator, R as Pen, Rt as CirclePlus, St as FileSpreadsheet, T as ShieldAlert, Ut as ChevronRight, W as MessageCircle, X as LoaderCircle, Y as Lock, Yt as Calendar, a as Users, b as SquareCheckBig, bt as Flame, c as Type, d as TrendingUp, dt as Image, en as BookOpen, f as TrendingDown, in as ArrowUpRight, it as LifeBuoy, j as RotateCcw, jt as Compass, k as Search, n as X, on as ArrowRight, p as Trash2, q as MapPin, r as Wrench, rt as Lightbulb, s as Upload, st as Layers, t as Zap, u as TriangleAlert, ut as Info, v as Square, vt as Funnel, x as Sparkles, xt as FileText } from "./_libs/lucide-react.mjs";
import { n as cn } from "./_ssr/useConfirm-Dt9lkcKc.mjs";
import { n as toast } from "./_libs/sonner.mjs";
import { i as resequenceProjectIniciativas, l as useRealtimeTable, s as useHierarchy, t as AppShell } from "./_ssr/usePicklist-vc052UFE.mjs";
import { n as VIBRA, t as PicklistField } from "./_ssr/PicklistField-t34RnOYJ.mjs";
import { C as PolarRadiusAxis, D as Tooltip, E as ResponsiveContainer, O as Legend, S as PolarAngleAxis, _ as ReferenceLine, a as RadarChart, b as Radar, c as BarChart, d as XAxis, f as Scatter, g as CartesianGrid, i as ScatterChart, p as ZAxis, u as YAxis, v as Bar, w as PolarGrid } from "./_libs/recharts+[...].mjs";
import { t as motion } from "./_libs/motion.mjs";
import { a as Trigger, i as Root3, n as Portal, r as Provider, t as Content2 } from "./_libs/@radix-ui/react-tooltip+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_authenticated.mapeamento-Cvr7gnyn.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function RequireIniciativa({ children }) {
	const { iniciativaId, openDrawer } = useHierarchy();
	if (!iniciativaId) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border bg-card/60 px-6 py-12 text-center shadow-vibra-sm",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex h-12 w-12 items-center justify-center rounded-full bg-vibra-100 text-vibra-700",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layers, { className: "h-5 w-5" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[13px] font-semibold text-vibra-800",
				children: "Selecione uma Iniciativa"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-[12px] text-muted-foreground",
				children: "Esta aba precisa de uma iniciativa ativa para criar passos, riscos ou registros relacionados."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: openDrawer,
				className: "rounded-md bg-vibra-700 px-3 py-1.5 text-[12px] font-semibold text-white hover:bg-vibra-800",
				children: "Escolher Iniciativa"
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
function Section({ title, icon: Ic, action, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-border bg-card p-4 shadow-vibra-sm",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-3 flex items-center justify-between gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
				className: "flex items-center gap-2 text-[13px] font-bold text-vibra-800",
				children: [
					Ic && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ic, { className: "h-4 w-4" }),
					" ",
					title
				]
			}), action]
		}), children]
	});
}
function Kpi({ label, value, tone = "green" }) {
	const cls = {
		green: "bg-vibra-100 text-vibra-800",
		orange: "bg-orange-100 text-orange-800",
		yellow: "bg-amber-100 text-amber-800",
		blue: "bg-blue-100 text-blue-800",
		red: "bg-red-100 text-red-700"
	}[tone];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-border bg-card p-3 shadow-vibra-sm",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-[10px] uppercase tracking-wider text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: `mt-1 inline-block rounded-md px-2 py-0.5 text-[18px] font-bold ${cls}`,
			children: value
		})]
	});
}
var inputCls = "w-full rounded-md border border-input bg-white px-2 py-1.5 text-[12px] outline-none focus:border-vibra-600";
var btnPrimary = "rounded-md bg-vibra-700 px-3 py-1.5 text-[12px] font-semibold text-white hover:bg-vibra-800";
var btnGhost = "rounded-md border border-border bg-white px-2 py-1 text-[11px] hover:bg-vibra-50";
var btnDanger = "rounded-md border border-red-200 bg-red-50 px-2 py-1 text-[11px] text-red-700 hover:bg-red-100";
var CATS = [
	{
		id: "fornecedor",
		label: "FORNECEDORES",
		categoria: "Fornecedores"
	},
	{
		id: "entrada",
		label: "ENTRADAS",
		categoria: "Entradas"
	},
	{
		id: "processo",
		label: "PROCESSO",
		categoria: "Processo"
	},
	{
		id: "saida",
		label: "SAÍDAS",
		categoria: "Saídas"
	},
	{
		id: "cliente",
		label: "CLIENTES",
		categoria: "Clientes"
	}
];
function SipocTab() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireIniciativa, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Inner$13, {}) });
}
function Inner$13() {
	const qc = useQueryClient();
	const { iniciativaId } = useHierarchy();
	const { data: items = [] } = useQuery({
		queryKey: ["sipoc", iniciativaId],
		queryFn: async () => (await supabase.from("sipoc").select("*").eq("iniciativa_id", iniciativaId).is("deleted_at", null).order("ordem")).data ?? []
	});
	const grouped = Object.fromEntries(CATS.map((c) => [c.id, items.filter((i) => i.categoria === c.id)]));
	async function add(cat, valor) {
		if (!valor.trim()) return;
		const existing = grouped[cat] ?? [];
		if (existing.some((i) => (i.valor ?? "").toLowerCase() === valor.trim().toLowerCase())) {
			toast.info("Item já adicionado.");
			return;
		}
		const ordem = existing.length + 1;
		const { error } = await supabase.from("sipoc").insert({
			iniciativa_id: iniciativaId,
			categoria: cat,
			valor: valor.trim(),
			ordem
		});
		if (error) toast.error(error.message);
		else qc.invalidateQueries({ queryKey: ["sipoc"] });
	}
	async function remove(id) {
		await supabase.from("sipoc").update({ deleted_at: (/* @__PURE__ */ new Date()).toISOString() }).eq("id", id);
		qc.invalidateQueries({ queryKey: ["sipoc"] });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid gap-3 md:grid-cols-5",
		children: CATS.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Column, {
			label: c.label,
			categoria: c.categoria,
			items: grouped[c.id],
			onAdd: (v) => add(c.id, v),
			onRemove: remove
		}, c.id))
	});
}
function Column({ label, categoria, items, onAdd, onRemove }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-border bg-card shadow-vibra-sm",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "rounded-t-xl bg-vibra-700 px-3 py-2 text-[11px] font-bold tracking-wider text-white",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-1.5 p-2",
			children: [items?.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "group flex items-center justify-between gap-1 rounded-md border border-border bg-white px-2 py-1 text-[11.5px]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "break-words",
					children: i.valor
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => onRemove(i.id),
					className: "opacity-0 group-hover:opacity-100",
					title: "Remover",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-3 w-3 text-red-600" })
				})]
			}, i.id)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PicklistField, {
				categoria,
				value: "",
				onChange: (v) => {
					if (v) onAdd(v);
				},
				placeholder: "+ Selecionar/Adicionar"
			})]
		})]
	});
}
function AsisTab() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireIniciativa, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Inner$12, {}) });
}
function Inner$12() {
	const qc = useQueryClient();
	const { iniciativaId } = useHierarchy();
	const { data: ini } = useQuery({
		queryKey: ["iniciativa-detalhes", iniciativaId],
		queryFn: async () => {
			const { data } = await supabase.from("iniciativas").select("tempo_max, passos_manuais").eq("id", iniciativaId).single();
			return data;
		},
		enabled: !!iniciativaId
	});
	const passosManuaisOptions = Array.isArray(ini?.passos_manuais) ? ini.passos_manuais : [];
	const { data: rows = [] } = useQuery({
		queryKey: ["asis", iniciativaId],
		queryFn: async () => (await supabase.from("asis_passos").select("*").eq("iniciativa_id", iniciativaId).is("deleted_at", null).order("ordem")).data ?? []
	});
	async function handleTempoChange(rowId, val) {
		const maxTempoPermitido = Number(ini?.tempo_max || 0);
		const sumOthers = rows.filter((r) => r.id !== rowId).reduce((s, r) => s + Number(r.tempo ?? 0), 0);
		if (maxTempoPermitido > 0 && sumOthers + val > maxTempoPermitido) {
			toast.error(`A soma dos tempos dos passos (${(sumOthers + val).toFixed(1)} min) não pode ultrapassar o Tempo Máximo de ${maxTempoPermitido} min preenchido no formulário!`);
			await patch(rowId, { tempo: Math.max(0, maxTempoPermitido - sumOthers) });
		} else await patch(rowId, { tempo: val });
	}
	const totalTempo = rows.reduce((s, r) => s + Number(r.tempo ?? 0), 0);
	const quickWins = rows.filter((r) => r.quick_win).length;
	async function syncInitiativeGains() {
		try {
			const { data: steps } = await supabase.from("tobe_passos").select("ganho_fte, ganho_financeiro, tempo").eq("iniciativa_id", iniciativaId).is("deleted_at", null);
			const { data: asisSteps } = await supabase.from("asis_passos").select("tempo").eq("iniciativa_id", iniciativaId).is("deleted_at", null);
			const fteSum = steps ? steps.reduce((sum, s) => sum + Number(s.ganho_fte ?? 0), 0) : 0;
			const finSum = steps ? steps.reduce((sum, s) => sum + Number(s.ganho_financeiro ?? 0), 0) : 0;
			const tAsis = asisSteps ? asisSteps.reduce((sum, s) => sum + Number(s.tempo ?? 0), 0) : 0;
			const tTobe = steps ? steps.reduce((sum, s) => sum + Number(s.tempo ?? 0), 0) : 0;
			const redPercent = tAsis ? (tAsis - tTobe) / tAsis * 100 : 0;
			const { data: ini } = await supabase.from("iniciativas").select("hc_atual").eq("id", iniciativaId).single();
			const hcA = ini ? Number(ini.hc_atual ?? 0) : 0;
			const hcLiberado = fteSum > 0 ? fteSum : hcA * (redPercent / 100);
			const hcB = Math.max(hcA * (1 - redPercent / 100), hcA - hcLiberado);
			await supabase.from("iniciativas").update({
				hc_estimado: Number(hcB.toFixed(2)),
				hc_liberado: Number(hcLiberado.toFixed(2)),
				saving_previsto: finSum > 0 ? finSum : null
			}).eq("id", iniciativaId);
			qc.invalidateQueries({ queryKey: ["res-ini", iniciativaId] });
			qc.invalidateQueries({ queryKey: ["iniciativa", iniciativaId] });
			qc.invalidateQueries({ queryKey: ["iniciativas"] });
		} catch (e) {
			console.error("Error syncing initiative gains:", e);
		}
	}
	async function add() {
		const { error } = await supabase.from("asis_passos").insert({
			iniciativa_id: iniciativaId,
			ordem: rows.length + 1,
			passo: ""
		});
		if (error) toast.error(error.message);
		else {
			qc.invalidateQueries({ queryKey: ["asis"] });
			await syncInitiativeGains();
		}
	}
	async function patch(id, p) {
		await supabase.from("asis_passos").update(p).eq("id", id);
		qc.invalidateQueries({ queryKey: ["asis"] });
		await syncInitiativeGains();
	}
	async function remove(id) {
		await supabase.from("asis_passos").update({ deleted_at: (/* @__PURE__ */ new Date()).toISOString() }).eq("id", id);
		qc.invalidateQueries({ queryKey: ["asis"] });
		await syncInitiativeGains();
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						label: "Passos Mapeados",
						value: rows.length
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						label: "Tempo Total (min)",
						value: `${totalTempo.toFixed(0)} min (${Math.floor(totalTempo / 60)}h ${String(Math.round(totalTempo % 60)).padStart(2, "0")}min)`,
						tone: "blue"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						label: "Quick Wins",
						value: quickWins,
						tone: "orange"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex justify-end",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: btnPrimary,
					onClick: add,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-1 inline h-3.5 w-3.5" }), "Passo"]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-x-auto rounded-xl border border-border bg-card shadow-vibra-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "min-w-[900px] w-full text-[12px]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
						className: "bg-vibra-50 text-[10.5px] uppercase tracking-wider text-vibra-800",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: [
							"#",
							"Passo",
							"Ator",
							"Tipo",
							"Tempo",
							"Volume",
							"Dor",
							"Impacto",
							"QW",
							"TI",
							""
						].map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-2 py-2 text-left",
							children: h
						}, h)) })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [rows.map((r, i) => {
						const atorArray = r.ator ? r.ator.split(",").map((s) => s.trim()).filter(Boolean) : [];
						const tipoArray = r.tipo ? r.tipo.split(",").map((s) => s.trim()).filter(Boolean) : [];
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-t border-border",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-2 py-1",
									children: i + 1
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: "px-2 py-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										className: inputCls,
										defaultValue: r.passo ?? "",
										onBlur: (e) => patch(r.id, { passo: e.target.value }),
										list: `steps-options-${r.id}`
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("datalist", {
										id: `steps-options-${r.id}`,
										children: passosManuaisOptions.map((p, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: p }, idx))
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-2 py-1 w-48",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PicklistField, {
										multi: true,
										size: "sm",
										categoria: "Ator",
										placeholder: "Ator...",
										value: atorArray,
										onChange: (vals) => patch(r.id, { ator: vals.join(", ") })
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-2 py-1 w-48",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PicklistField, {
										multi: true,
										size: "sm",
										categoria: "Tipo",
										placeholder: "Tipo...",
										value: tipoArray,
										onChange: (vals) => patch(r.id, { tipo: vals.join(", ") })
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-2 py-1 w-20",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "number",
										className: inputCls,
										defaultValue: r.tempo ?? 0,
										onBlur: (e) => handleTempoChange(r.id, Number(e.target.value))
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-2 py-1 w-20",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "number",
										className: inputCls,
										defaultValue: r.volume ?? 0,
										onBlur: (e) => patch(r.id, { volume: Number(e.target.value) })
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-2 py-1",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										className: inputCls,
										defaultValue: r.dor ?? "",
										onBlur: (e) => patch(r.id, { dor: e.target.value })
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-2 py-1",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										className: inputCls,
										defaultValue: r.impacto ?? "",
										onChange: (e) => patch(r.id, { impacto: e.target.value }),
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "",
												children: "—"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Alto" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Médio" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Baixo" })
										]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-2 py-1 text-center",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "checkbox",
										defaultChecked: r.quick_win,
										onChange: (e) => patch(r.id, { quick_win: e.target.checked })
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-2 py-1 text-center",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "checkbox",
										defaultChecked: r.ti,
										onChange: (e) => patch(r.id, { ti: e.target.checked })
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-2 py-1",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										className: btnDanger,
										onClick: () => remove(r.id),
										children: "🗑️"
									})
								})
							]
						}, r.id);
					}), rows.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						colSpan: 11,
						className: "px-3 py-8 text-center text-muted-foreground",
						children: "Nenhum passo. Clique em \"+ Passo\"."
					}) })] })]
				})
			})
		]
	});
}
function TobeTab() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireIniciativa, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Inner$11, {}) });
}
function Inner$11() {
	const qc = useQueryClient();
	const { iniciativaId } = useHierarchy();
	const { data: tobe = [] } = useQuery({
		queryKey: ["tobe", iniciativaId],
		queryFn: async () => (await supabase.from("tobe_passos").select("*").eq("iniciativa_id", iniciativaId).is("deleted_at", null).order("ordem")).data ?? []
	});
	const { data: asis = [] } = useQuery({
		queryKey: ["asis-for-tobe", iniciativaId],
		queryFn: async () => (await supabase.from("asis_passos").select("tempo").eq("iniciativa_id", iniciativaId).is("deleted_at", null)).data ?? []
	});
	const ganhoFte = tobe.reduce((s, r) => s + Number(r.ganho_fte ?? 0), 0);
	const ganhoFin = tobe.reduce((s, r) => s + Number(r.ganho_financeiro ?? 0), 0);
	const tAsisTotal = asis.reduce((s, r) => s + Number(r.tempo ?? 0), 0);
	const tTobeTotal = tobe.reduce((s, r) => s + Number(r.tempo ?? 0), 0);
	const tempoEcon = tAsisTotal - tTobeTotal;
	const reducao = tAsisTotal > 0 ? tempoEcon / tAsisTotal * 100 : 0;
	const chart = [{
		name: "Lead Time (min)",
		"AS-IS": tAsisTotal,
		"TO-BE": tTobeTotal
	}];
	async function syncInitiativeGains() {
		try {
			const { data: steps } = await supabase.from("tobe_passos").select("ganho_fte, ganho_financeiro, tempo").eq("iniciativa_id", iniciativaId).is("deleted_at", null);
			if (!steps) return;
			const { data: asisSteps } = await supabase.from("asis_passos").select("tempo").eq("iniciativa_id", iniciativaId).is("deleted_at", null);
			const fteSum = steps.reduce((sum, s) => sum + Number(s.ganho_fte ?? 0), 0);
			const finSum = steps.reduce((sum, s) => sum + Number(s.ganho_financeiro ?? 0), 0);
			const tAsis = asisSteps ? asisSteps.reduce((sum, s) => sum + Number(s.tempo ?? 0), 0) : 0;
			const tTobe = steps.reduce((sum, s) => sum + Number(s.tempo ?? 0), 0);
			const redPercent = tAsis ? (tAsis - tTobe) / tAsis * 100 : 0;
			const { data: ini } = await supabase.from("iniciativas").select("hc_atual").eq("id", iniciativaId).single();
			const hcA = ini ? Number(ini.hc_atual ?? 0) : 0;
			const hcLiberado = fteSum > 0 ? fteSum : hcA * (redPercent / 100);
			const hcB = Math.max(hcA * (1 - redPercent / 100), hcA - hcLiberado);
			await supabase.from("iniciativas").update({
				hc_estimado: Number(hcB.toFixed(2)),
				hc_liberado: Number(hcLiberado.toFixed(2)),
				saving_previsto: finSum > 0 ? finSum : null
			}).eq("id", iniciativaId);
			qc.invalidateQueries({ queryKey: ["res-ini", iniciativaId] });
			qc.invalidateQueries({ queryKey: ["iniciativa", iniciativaId] });
			qc.invalidateQueries({ queryKey: ["iniciativas"] });
		} catch (e) {
			console.error("Error syncing initiative gains:", e);
		}
	}
	async function add() {
		const { error } = await supabase.from("tobe_passos").insert({
			iniciativa_id: iniciativaId,
			ordem: tobe.length + 1,
			passo: ""
		});
		if (error) toast.error(error.message);
		else {
			qc.invalidateQueries({ queryKey: ["tobe"] });
			await syncInitiativeGains();
		}
	}
	async function patch(id, p) {
		await supabase.from("tobe_passos").update(p).eq("id", id);
		qc.invalidateQueries({ queryKey: ["tobe"] });
		await syncInitiativeGains();
	}
	async function remove(id) {
		await supabase.from("tobe_passos").update({ deleted_at: (/* @__PURE__ */ new Date()).toISOString() }).eq("id", id);
		qc.invalidateQueries({ queryKey: ["tobe"] });
		await syncInitiativeGains();
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 sm:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						label: "Ganho FTE",
						value: ganhoFte.toFixed(1)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						label: "Ganho R$/ano",
						value: ganhoFin.toLocaleString("pt-BR", {
							style: "currency",
							currency: "BRL",
							minimumFractionDigits: 2,
							maximumFractionDigits: 2
						}),
						tone: "green"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						label: "Tempo Economizado (min)",
						value: `${tempoEcon.toFixed(0)} min (${Math.floor(tempoEcon / 60)}h ${String(Math.round(tempoEcon % 60)).padStart(2, "0")}min)`,
						tone: "blue"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						label: "Redução Lead Time",
						value: `${reducao.toFixed(1)}%`,
						tone: "orange"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex justify-end",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: btnPrimary,
					onClick: add,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-1 inline h-3.5 w-3.5" }), "Passo TO-BE"]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-x-auto rounded-xl border border-border bg-card shadow-vibra-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "min-w-[900px] w-full text-[12px]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
						className: "bg-vibra-50 text-[10.5px] uppercase tracking-wider text-vibra-800",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: [
							"#",
							"Passo TO-BE",
							"Ator",
							"Tipo",
							"T.AS-IS",
							"T.TO-BE",
							"Ganho",
							"Elimina",
							"Melhoria",
							"Status",
							"HC",
							"R$/ano",
							""
						].map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-2 py-2 text-left",
							children: h
						}, h)) })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [tobe.map((r, i) => {
						const ganho = Number(r.tempo_atual ?? 0) - Number(r.tempo ?? 0);
						const atorArray = r.ator ? r.ator.split(",").map((s) => s.trim()).filter(Boolean) : [];
						const tipoArray = r.tipo ? r.tipo.split(",").map((s) => s.trim()).filter(Boolean) : [];
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-t border-border",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-2 py-1",
									children: i + 1
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-2 py-1",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										className: inputCls,
										defaultValue: r.passo ?? "",
										onBlur: (e) => patch(r.id, { passo: e.target.value })
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-2 py-1 w-44",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PicklistField, {
										multi: true,
										size: "sm",
										categoria: "Ator",
										placeholder: "Ator...",
										value: atorArray,
										onChange: (vals) => patch(r.id, { ator: vals.join(", ") })
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-2 py-1 w-44",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PicklistField, {
										multi: true,
										size: "sm",
										categoria: "Tipo de Atividade",
										placeholder: "Tipo...",
										value: tipoArray,
										onChange: (vals) => patch(r.id, { tipo: vals.join(", ") })
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-2 py-1 w-20",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "number",
										className: inputCls,
										defaultValue: r.tempo_atual ?? 0,
										onBlur: (e) => patch(r.id, { tempo_atual: Number(e.target.value) })
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-2 py-1 w-20",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "number",
										className: inputCls,
										defaultValue: r.tempo ?? 0,
										onBlur: (e) => patch(r.id, { tempo: Number(e.target.value) })
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-2 py-1 bg-vibra-50/60 font-semibold",
									children: ganho
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-2 py-1 text-center",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "checkbox",
										defaultChecked: r.elimina,
										onChange: (e) => patch(r.id, { elimina: e.target.checked })
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-2 py-1",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										className: inputCls,
										defaultValue: r.melhoria ?? "",
										onBlur: (e) => patch(r.id, { melhoria: e.target.value })
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-2 py-1",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										className: inputCls,
										defaultValue: r.status ?? "",
										onChange: (e) => patch(r.id, { status: e.target.value }),
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "",
												children: "—"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Planejado" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Em Progresso" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Concluído" })
										]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-2 py-1 w-16",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "number",
										className: inputCls,
										defaultValue: r.ganho_fte ?? 0,
										onBlur: (e) => patch(r.id, { ganho_fte: Number(e.target.value) })
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-2 py-1 w-24",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "number",
										className: inputCls,
										defaultValue: r.ganho_financeiro ?? 0,
										onBlur: (e) => patch(r.id, { ganho_financeiro: Number(e.target.value) })
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-2 py-1",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										className: btnDanger,
										onClick: () => remove(r.id),
										children: "🗑️"
									})
								})
							]
						}, r.id);
					}), tobe.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						colSpan: 13,
						className: "px-3 py-8 text-center text-muted-foreground",
						children: "Nenhum passo TO-BE."
					}) })] })]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-border bg-card p-5 shadow-vibra-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mb-2 text-[13px] font-bold text-vibra-800 flex items-center gap-1.5",
						children: "📊 Eficiência de Lead Time de Processo (AS-IS vs TO-BE)"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] text-muted-foreground mb-4",
						children: "Visualização gráfica do impacto acumulado das otimizações propostas no tempo total do fluxo."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
						width: "100%",
						height: 240,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
							data: chart,
							barSize: 45,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
									strokeDasharray: "3 3",
									stroke: "#f1f5f9"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
									dataKey: "name",
									tick: { fontSize: 10 },
									stroke: "#94a3b8"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
									tick: { fontSize: 10 },
									stroke: "#94a3b8",
									label: {
										value: "Minutos",
										angle: -90,
										position: "insideLeft",
										style: {
											textAnchor: "middle",
											fontSize: 10,
											fill: "#64748b"
										}
									}
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
									contentStyle: {
										borderRadius: "8px",
										border: "1px solid #e2e8f0",
										backgroundColor: "#fff",
										fontSize: "11px",
										fontFamily: "sans-serif"
									},
									itemStyle: { fontWeight: "bold" }
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, {
									iconSize: 8,
									iconType: "circle",
									wrapperStyle: {
										fontSize: 10,
										paddingTop: 10
									}
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
									name: "Lead Time Atual (AS-IS)",
									dataKey: "AS-IS",
									fill: VIBRA.orange,
									radius: [
										4,
										4,
										0,
										0
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
									name: "Alvo de Eficiência (TO-BE)",
									dataKey: "TO-BE",
									fill: VIBRA.green,
									radius: [
										4,
										4,
										0,
										0
									]
								})
							]
						})
					})
				]
			})
		]
	});
}
function CausaRaizTab() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireIniciativa, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Inner$10, {}) });
}
function Inner$10() {
	const qc = useQueryClient();
	const { iniciativaId } = useHierarchy();
	const { data } = useQuery({
		queryKey: ["causa", iniciativaId],
		queryFn: async () => (await supabase.from("causa_raiz").select("*").eq("iniciativa_id", iniciativaId).maybeSingle()).data
	});
	const [c, setC] = (0, import_react.useState)({});
	(0, import_react.useEffect)(() => {
		setC(data?.conteudo ?? {});
	}, [data]);
	async function save() {
		const payload = {
			iniciativa_id: iniciativaId,
			metodologia: "todas",
			conteudo: c
		};
		const { error } = data?.id ? await supabase.from("causa_raiz").update(payload).eq("id", data.id) : await supabase.from("causa_raiz").insert(payload);
		if (error) toast.error(error.message);
		else {
			toast.success("Salvo");
			qc.invalidateQueries({ queryKey: ["causa"] });
		}
	}
	const upd = (k, v) => setC((prev) => ({
		...prev,
		[k]: {
			...prev[k],
			...v
		}
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
				title: "PDCA — Ciclo de Melhoria",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-3 sm:grid-cols-2",
					children: [
						["plan", "P — PLAN"],
						["do", "D — DO"],
						["check", "C — CHECK"],
						["act", "A — ACT"]
					].map(([k, l]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-1 text-[11px] font-bold text-vibra-700",
						children: l
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						className: inputCls + " min-h-[80px]",
						value: c.pdca?.[k] ?? "",
						onChange: (e) => upd("pdca", { [k]: e.target.value })
					})] }, k))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
				title: "5 Porquês",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-2",
					children: [
						0,
						1,
						2,
						3,
						4
					].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "w-20 text-[11px] font-bold text-vibra-700",
							children: ["Por quê ", i + 1]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: inputCls,
							value: c.porques?.[i] ?? "",
							onChange: (e) => {
								const arr = [...c.porques ?? []];
								arr[i] = e.target.value;
								setC((p) => ({
									...p,
									porques: arr
								}));
							}
						})]
					}, i))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
				title: "Ishikawa — Espinha de Peixe (6M)",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-3",
					children: [
						["metodo", "Método"],
						["maquina", "Máquina"],
						["material", "Material"],
						["mao_obra", "Mão de Obra"],
						["medicao", "Medição"],
						["meio_ambiente", "Meio Ambiente"]
					].map(([k, l]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mb-1 text-[11px] font-bold text-vibra-700",
						children: ["🔹 ", l]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						className: inputCls + " min-h-[70px]",
						value: c.ishikawa?.[k] ?? "",
						onChange: (e) => upd("ishikawa", { [k]: e.target.value })
					})] }, k))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex justify-end",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: save,
					className: "rounded-md bg-vibra-700 px-4 py-2 text-[12px] font-semibold text-white hover:bg-vibra-800",
					children: "Salvar Análise"
				})
			})
		]
	});
}
var KEYS = [
	["espera", "Espera"],
	["defeitos", "Retrabalho"],
	["transporte", "Transporte"],
	["movimentacao", "Movimentação"],
	["estoque", "Estoque"],
	["superproducao", "Superprodução"],
	["superprocessamento", "Processamento Excessivo"],
	["talento", "Talentos Não Aproveitados"]
];
function LeanTab() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireIniciativa, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Inner$9, {}) });
}
function Inner$9() {
	const qc = useQueryClient();
	const { iniciativaId } = useHierarchy();
	const { data } = useQuery({
		queryKey: ["lean", iniciativaId],
		queryFn: async () => (await supabase.from("lean_avaliacoes").select("*").eq("iniciativa_id", iniciativaId).is("deleted_at", null).order("created_at", { ascending: false }).limit(1).maybeSingle()).data
	});
	const [vals, setVals] = (0, import_react.useState)({});
	(0, import_react.useEffect)(() => {
		const v = {};
		KEYS.forEach(([k]) => {
			v[k] = data?.[k] ?? 0;
		});
		setVals(v);
	}, [data]);
	async function save() {
		const payload = {
			iniciativa_id: iniciativaId,
			...vals
		};
		const { error } = data?.id ? await supabase.from("lean_avaliacoes").update(payload).eq("id", data.id) : await supabase.from("lean_avaliacoes").insert(payload);
		if (error) toast.error(error.message);
		else {
			toast.success("Salvo");
			qc.invalidateQueries({ queryKey: ["lean"] });
		}
	}
	const radarData = KEYS.map(([k, l]) => ({
		subject: l,
		score: vals[k] ?? 0
	}));
	const ranking = [...KEYS].map(([k, l]) => ({
		k,
		l,
		score: vals[k] ?? 0
	})).sort((a, b) => b.score - a.score);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 lg:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
				title: "Radar dos 8 Desperdícios",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
					width: "100%",
					height: 320,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RadarChart, {
						data: radarData,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PolarGrid, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PolarAngleAxis, {
								dataKey: "subject",
								tick: { fontSize: 10 }
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PolarRadiusAxis, {
								domain: [0, 5],
								tick: { fontSize: 9 }
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radar, {
								dataKey: "score",
								stroke: VIBRA.green,
								fill: VIBRA.green,
								fillOpacity: .5
							})
						]
					})
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
				title: "Ranking de Criticidade",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-1.5",
					children: ranking.map((r, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 text-[12px]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "w-6 font-bold text-vibra-700",
								children: [i + 1, "º"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "w-44 truncate",
								children: r.l
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex-1 h-2 rounded-full bg-vibra-50",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-2 rounded-full bg-vibra-600",
									style: { width: `${r.score / 5 * 100}%` }
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "w-10 text-right font-bold",
								children: [r.score, "/5"]
							})
						]
					}, r.k))
				})
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
			title: "Configurar Pontuações (1-5)",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
				children: KEYS.map(([k, l]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "rounded-lg border border-border bg-vibra-50/40 p-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] font-bold text-vibra-700",
						children: l
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "range",
							min: 0,
							max: 5,
							value: vals[k] ?? 0,
							onChange: (e) => setVals((v) => ({
								...v,
								[k]: Number(e.target.value)
							})),
							className: "flex-1"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "w-6 text-right text-[12px] font-bold text-vibra-800",
							children: vals[k] ?? 0
						})]
					})]
				}, k))
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 flex justify-end",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: save,
					className: "rounded-md bg-vibra-700 px-4 py-2 text-[12px] font-semibold text-white hover:bg-vibra-800",
					children: "Salvar Avaliação"
				})
			})]
		})]
	});
}
function FluxoTab() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireIniciativa, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Inner$8, {}) });
}
function Inner$8() {
	const qc = useQueryClient();
	const { iniciativaId } = useHierarchy();
	const { data } = useQuery({
		queryKey: ["fluxo", iniciativaId],
		queryFn: async () => (await supabase.from("fluxo_rascunho").select("*").eq("iniciativa_id", iniciativaId).is("deleted_at", null).maybeSingle()).data
	});
	const [shapes, setShapes] = (0, import_react.useState)([]);
	const [selected, setSelected] = (0, import_react.useState)(null);
	const drag = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		setShapes((data?.canvas)?.shapes ?? []);
	}, [data]);
	const add = (kind) => setShapes((s) => [...s, {
		id: generateUUID(),
		kind,
		x: 60,
		y: 60,
		w: kind === "text" ? 160 : 120,
		h: kind === "text" ? 32 : 80,
		text: kind === "text" ? "Texto" : "",
		color: kind === "arrow" ? "#268200" : "#a9c78e"
	}]);
	const remove = () => {
		if (selected) {
			setShapes((s) => s.filter((x) => x.id !== selected));
			setSelected(null);
		}
	};
	const clear = () => setShapes([]);
	async function save() {
		const payload = {
			iniciativa_id: iniciativaId,
			canvas: { shapes }
		};
		const { error } = data?.id ? await supabase.from("fluxo_rascunho").update(payload).eq("id", data.id) : await supabase.from("fluxo_rascunho").insert(payload);
		if (error) toast.error(error.message);
		else {
			toast.success("Fluxo salvo");
			qc.invalidateQueries({ queryKey: ["fluxo"] });
		}
	}
	function onDown(e, sh) {
		setSelected(sh.id);
		drag.current = {
			id: sh.id,
			offX: e.clientX - sh.x,
			offY: e.clientY - sh.y
		};
	}
	function onMove(e) {
		if (!drag.current) return;
		const d = drag.current;
		setShapes((s) => s.map((x) => x.id === d.id ? {
			...x,
			x: e.clientX - d.offX,
			y: e.clientY - d.offY
		} : x));
	}
	function onUp() {
		drag.current = null;
	}
	const sel = shapes.find((s) => s.id === selected);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: btnGhost,
						onClick: () => add("rect"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Square, { className: "mr-1 inline h-3 w-3" }), "Retângulo"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: btnGhost,
						onClick: () => add("circle"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Circle, { className: "mr-1 inline h-3 w-3" }), "Círculo"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: btnGhost,
						onClick: () => add("text"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Type, { className: "mr-1 inline h-3 w-3" }), "Texto"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: btnGhost,
						onClick: () => add("arrow"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "mr-1 inline h-3 w-3" }), "Seta"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mx-2 h-5 w-px bg-border" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: btnGhost,
						onClick: remove,
						disabled: !selected,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "mr-1 inline h-3 w-3" }), "Excluir"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: btnGhost,
						onClick: clear,
						children: "Limpar"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "ml-auto" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: btnPrimary,
						onClick: save,
						children: "Salvar"
					})
				]
			}),
			sel && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 rounded-md border border-border bg-vibra-50/40 p-2 text-[11px]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-bold",
						children: "Selecionado:"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: sel.text,
						onChange: (e) => setShapes((s) => s.map((x) => x.id === sel.id ? {
							...x,
							text: e.target.value
						} : x)),
						className: "rounded border px-2 py-0.5",
						placeholder: "texto"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "color",
						value: sel.color,
						onChange: (e) => setShapes((s) => s.map((x) => x.id === sel.id ? {
							...x,
							color: e.target.value
						} : x))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				onMouseMove: onMove,
				onMouseUp: onUp,
				onMouseLeave: onUp,
				className: "relative h-[480px] overflow-hidden rounded-xl border-2 border-dashed border-vibra-300 bg-white",
				children: [shapes.map((sh) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					onMouseDown: (e) => onDown(e, sh),
					className: `absolute flex cursor-move items-center justify-center text-[12px] font-semibold select-none ${selected === sh.id ? "ring-2 ring-vibra-700" : ""}`,
					style: {
						left: sh.x,
						top: sh.y,
						width: sh.w,
						height: sh.h,
						background: sh.kind === "arrow" ? "transparent" : sh.color,
						borderRadius: sh.kind === "circle" ? "50%" : sh.kind === "text" ? 4 : 8,
						border: sh.kind === "text" ? "1px dashed #999" : sh.kind === "arrow" ? `3px solid ${sh.color}` : "none",
						borderTop: sh.kind === "arrow" ? "none" : void 0
					},
					children: sh.kind === "arrow" ? "▶" : sh.text
				}, sh.id)), shapes.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "absolute inset-0 flex items-center justify-center text-muted-foreground text-[12px]",
					children: "Adicione formas para iniciar o fluxo livre."
				})]
			})
		]
	});
}
function BpmnTab() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireIniciativa, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Inner$7, {}) });
}
function Inner$7() {
	const qc = useQueryClient();
	const { iniciativaId } = useHierarchy();
	const { data: rows = [] } = useQuery({
		queryKey: ["bpmn", iniciativaId],
		queryFn: async () => (await supabase.from("bpmn_arquivos").select("*").eq("iniciativa_id", iniciativaId).is("deleted_at", null).order("created_at")).data ?? []
	});
	const asis = rows.find((r) => r.tipo === "asis");
	const tobe = rows.find((r) => r.tipo === "tobe");
	const [notas, setNotas] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		setNotas(asis?.anotacoes ?? tobe?.anotacoes ?? "");
	}, [asis, tobe]);
	async function upload(tipo, file) {
		const url = await new Promise((res) => {
			const r = new FileReader();
			r.onload = () => res(r.result);
			r.readAsDataURL(file);
		});
		const existing = rows.find((r) => r.tipo === tipo);
		const payload = {
			iniciativa_id: iniciativaId,
			tipo,
			nome: file.name,
			url,
			anotacoes: notas
		};
		const { error } = existing ? await supabase.from("bpmn_arquivos").update(payload).eq("id", existing.id) : await supabase.from("bpmn_arquivos").insert(payload);
		if (error) toast.error(error.message);
		else {
			toast.success("Upload concluído");
			qc.invalidateQueries({ queryKey: ["bpmn"] });
		}
	}
	async function remove(id) {
		await supabase.from("bpmn_arquivos").update({ deleted_at: (/* @__PURE__ */ new Date()).toISOString() }).eq("id", id);
		qc.invalidateQueries({ queryKey: ["bpmn"] });
	}
	async function saveNotas() {
		for (const r of rows) await supabase.from("bpmn_arquivos").update({ anotacoes: notas }).eq("id", r.id);
		toast.success("Notas salvas");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-4 md:grid-cols-2",
			children: ["asis", "tobe"].map((t) => {
				const r = t === "asis" ? asis : tobe;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-border bg-card p-4 shadow-vibra-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mb-2 text-[12px] font-bold text-vibra-800",
							children: t === "asis" ? "🗂 FLUXO AS-IS" : "🚀 FLUXO TO-BE"
						}),
						r?.url ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: r.url ?? "",
								alt: r.nome ?? "",
								className: "max-h-[260px] w-full rounded border object-contain"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between text-[11px]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "truncate",
									children: r.nome
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: btnDanger,
									onClick: () => remove(r.id),
									children: "Remover"
								})]
							})]
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "mt-2 flex cursor-pointer items-center justify-center gap-2 rounded-md border-2 border-dashed border-vibra-300 bg-vibra-50/40 px-3 py-6 text-[12px] text-vibra-800 hover:bg-vibra-50",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "h-4 w-4" }),
								" Upload (PNG/JPG/SVG)",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "file",
									accept: "image/*",
									className: "hidden",
									onChange: (e) => e.target.files?.[0] && upload(t, e.target.files[0])
								})
							]
						})
					]
				}, t);
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-xl border border-border bg-card p-4 shadow-vibra-sm",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-2 text-[12px] font-bold text-vibra-800",
					children: "📝 Anotações"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					className: inputCls + " min-h-[100px]",
					value: notas,
					onChange: (e) => setNotas(e.target.value)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-2 flex justify-end",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: btnPrimary,
						onClick: saveNotas,
						children: "Salvar Notas"
					})
				})
			]
		})]
	});
}
var FIELDS$1 = [
	["problema", "IDENTIFICAÇÃO DO PROBLEMA"],
	["meta", "META DO KAIZEN"],
	["causa", "CAUSA IDENTIFICADA"],
	["acao", "AÇÃO PROPOSTA"],
	["resultado", "RESULTADO OBTIDO"]
];
function KaizenTab() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireIniciativa, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Inner$6, {}) });
}
function Inner$6() {
	const qc = useQueryClient();
	const { iniciativaId } = useHierarchy();
	const { data: rows = [] } = useQuery({
		queryKey: ["kaizen", iniciativaId],
		queryFn: async () => (await supabase.from("kaizen").select("*").eq("iniciativa_id", iniciativaId).is("deleted_at", null).order("created_at")).data ?? []
	});
	async function add() {
		const { error } = await supabase.from("kaizen").insert({
			iniciativa_id: iniciativaId,
			problema: "",
			data_evento: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10)
		});
		if (error) toast.error(error.message);
		else qc.invalidateQueries({ queryKey: ["kaizen"] });
	}
	async function patch(id, p) {
		await supabase.from("kaizen").update(p).eq("id", id);
		qc.invalidateQueries({ queryKey: ["kaizen"] });
	}
	async function remove(id) {
		await supabase.from("kaizen").update({ deleted_at: (/* @__PURE__ */ new Date()).toISOString() }).eq("id", id);
		qc.invalidateQueries({ queryKey: ["kaizen"] });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex justify-end",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				className: btnPrimary,
				onClick: add,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-1 inline h-3.5 w-3.5" }), "Novo Kaizen"]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 md:grid-cols-2",
			children: [rows.map((k, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-border bg-card p-4 shadow-vibra-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-3 flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "rounded-md bg-vibra-700 px-2 py-0.5 text-[11px] font-bold text-white",
						children: [
							"[",
							i + 1,
							"]"
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: btnDanger,
						onClick: () => remove(k.id),
						children: "🗑️ Remover"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-2",
					children: FIELDS$1.map(([f, l]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[10.5px] font-bold uppercase tracking-wider text-vibra-700",
						children: l
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						className: inputCls + " min-h-[50px]",
						defaultValue: k[f] ?? "",
						onBlur: (e) => patch(k.id, { [f]: e.target.value })
					})] }, f))
				})]
			}, k.id)), rows.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "col-span-2 rounded-xl border border-dashed border-border bg-card p-8 text-center text-[12px] text-muted-foreground",
				children: "Nenhum Kaizen registrado."
			})]
		})]
	});
}
var STATUS$2 = [
	"Pendente",
	"Em Análise",
	"Resolvido",
	"Cancelado"
];
function AjudaTab() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireIniciativa, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Inner$5, {}) });
}
function Inner$5() {
	const qc = useQueryClient();
	const { iniciativaId } = useHierarchy();
	const [desc, setDesc] = (0, import_react.useState)("");
	const { data: rows = [] } = useQuery({
		queryKey: ["ajuda", iniciativaId],
		queryFn: async () => (await supabase.from("pedido_ajuda").select("*").eq("iniciativa_id", iniciativaId).is("deleted_at", null).order("created_at", { ascending: false })).data ?? []
	});
	async function enviar() {
		if (!desc.trim()) return toast.error("Descreva o impedimento");
		const { error } = await supabase.from("pedido_ajuda").insert({
			iniciativa_id: iniciativaId,
			descricao: desc,
			status: "Pendente",
			titulo: desc.slice(0, 80)
		});
		if (error) toast.error(error.message);
		else {
			toast.success("Pedido enviado");
			setDesc("");
			qc.invalidateQueries({ queryKey: ["ajuda"] });
		}
	}
	async function patch(id, p) {
		await supabase.from("pedido_ajuda").update(p).eq("id", id);
		qc.invalidateQueries({ queryKey: ["ajuda"] });
	}
	async function remove(id) {
		await supabase.from("pedido_ajuda").update({ deleted_at: (/* @__PURE__ */ new Date()).toISOString() }).eq("id", id);
		qc.invalidateQueries({ queryKey: ["ajuda"] });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-xl border border-border bg-card p-4 shadow-vibra-sm",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mb-2 flex items-center gap-2 text-[13px] font-bold text-vibra-800",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LifeBuoy, { className: "h-4 w-4" }), "Registrar Novo Impedimento"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					className: inputCls + " min-h-[90px]",
					placeholder: "Descreva o impedimento, bloqueio ou necessidade de apoio da gestão...",
					value: desc,
					onChange: (e) => setDesc(e.target.value)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-2 flex justify-end",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: btnPrimary,
						onClick: enviar,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "mr-1 inline h-3 w-3" }), "Enviar Pedido"]
					})
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-xl border border-border bg-card p-4 shadow-vibra-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mb-2 text-[13px] font-bold text-vibra-800",
				children: [
					"📋 Histórico (",
					rows.length,
					")"
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [rows.map((r, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-md border border-border p-3 text-[12px]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-1 flex items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-bold text-vibra-700",
								children: ["HR-", String(i + 1).padStart(3, "0")]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground",
								children: new Date(r.created_at).toLocaleDateString("pt-BR")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								className: "ml-auto rounded border px-1.5 py-0.5 text-[11px]",
								value: r.status ?? "",
								onChange: (e) => patch(r.id, { status: e.target.value }),
								children: STATUS$2.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: s }, s))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: btnDanger,
								onClick: () => remove(r.id),
								children: "🗑️"
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "whitespace-pre-wrap",
						children: r.descricao
					})]
				}, r.id)), rows.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-center text-muted-foreground",
					children: "Nenhum pedido registrado."
				})]
			})]
		})]
	});
}
var TIPOS = [
	"Status",
	"Demo",
	"Review",
	"Comitê",
	"Go-live"
];
function AgendaTab() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireIniciativa, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Inner$4, {}) });
}
function Inner$4() {
	const qc = useQueryClient();
	const { iniciativaId } = useHierarchy();
	const [open, setOpen] = (0, import_react.useState)(false);
	const [partSearch, setPartSearch] = (0, import_react.useState)("");
	const [form, setForm] = (0, import_react.useState)({
		titulo: "",
		data_evento: "",
		tipo_reuniao: "Status",
		duracao_min: 60,
		notas: "",
		participantes: []
	});
	const { data: rows = [] } = useQuery({
		queryKey: ["agenda", iniciativaId],
		queryFn: async () => (await supabase.from("agenda").select("*").eq("iniciativa_id", iniciativaId).is("deleted_at", null).order("data_evento")).data ?? []
	});
	const { data: profiles = [] } = useQuery({
		queryKey: ["profiles"],
		queryFn: async () => (await supabase.from("profiles").select("id,nome,email").limit(200)).data ?? []
	});
	const { data: parts = [] } = useQuery({
		queryKey: ["agenda-parts", rows.map((r) => r.id).join(",")],
		enabled: rows.length > 0,
		queryFn: async () => (await supabase.from("agenda_participantes").select("*").in("agenda_id", rows.map((r) => r.id))).data ?? []
	});
	async function criar() {
		if (!form.titulo || !form.data_evento) return toast.error("Título e data obrigatórios");
		const { data, error } = await supabase.from("agenda").insert({
			iniciativa_id: iniciativaId,
			titulo: form.titulo,
			data_evento: form.data_evento,
			tipo_reuniao: form.tipo_reuniao,
			duracao_min: form.duracao_min,
			notas: form.notas
		}).select().single();
		if (error || !data) return toast.error(error?.message ?? "Erro");
		if (form.participantes && form.participantes.length) {
			const minutos = form.duracao_min;
			const { data: allProfs } = await supabase.from("profiles").select("id, nome");
			const payloadParts = [];
			for (const name of form.participantes) {
				const matchedProf = allProfs?.find((p) => p.nome?.toLowerCase() === name.toLowerCase());
				if (matchedProf) payloadParts.push({
					agenda_id: data.id,
					profile_id: matchedProf.id,
					minutos_creditados: minutos
				});
				else {
					const { data: newProf } = await supabase.from("profiles").insert({ nome: name }).select().single();
					if (newProf) payloadParts.push({
						agenda_id: data.id,
						profile_id: newProf.id,
						minutos_creditados: minutos
					});
				}
			}
			if (payloadParts.length > 0) await supabase.from("agenda_participantes").insert(payloadParts);
		}
		toast.success("Evento criado");
		setOpen(false);
		setForm({
			titulo: "",
			data_evento: "",
			tipo_reuniao: "Status",
			duracao_min: 60,
			notas: "",
			participantes: []
		});
		qc.invalidateQueries({ queryKey: ["agenda"] });
		qc.invalidateQueries({ queryKey: ["agenda-parts"] });
	}
	async function concluir(id) {
		await supabase.from("agenda").update({
			concluida: true,
			concluida_em: (/* @__PURE__ */ new Date()).toISOString()
		}).eq("id", id);
		qc.invalidateQueries({ queryKey: ["agenda"] });
	}
	async function remove(id) {
		await supabase.from("agenda").update({ deleted_at: (/* @__PURE__ */ new Date()).toISOString() }).eq("id", id);
		qc.invalidateQueries({ queryKey: ["agenda"] });
	}
	const futuros = rows.filter((r) => !r.concluida);
	const concluidos = rows.filter((r) => r.concluida);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex justify-end",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: btnPrimary,
					onClick: () => setOpen(true),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-1 inline h-3.5 w-3.5" }), "Novo Evento"]
				})
			}),
			open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-vibra-300 bg-vibra-50/40 p-4 shadow-vibra-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-2 text-[12px] font-bold text-vibra-800",
						children: "Novo Evento"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-2 sm:grid-cols-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "w-full rounded-md border border-input bg-white px-2 py-1.5 text-[12px] outline-none focus:border-vibra-600",
								placeholder: "Título",
								value: form.titulo,
								onChange: (e) => setForm({
									...form,
									titulo: e.target.value
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "w-full rounded-md border border-input bg-white px-2 py-1.5 text-[12px] outline-none focus:border-vibra-600",
								type: "datetime-local",
								value: form.data_evento,
								onChange: (e) => setForm({
									...form,
									data_evento: e.target.value
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								className: "w-full rounded-md border border-input bg-white px-2 py-1.5 text-[12px] outline-none focus:border-vibra-600",
								value: form.tipo_reuniao,
								onChange: (e) => setForm({
									...form,
									tipo_reuniao: e.target.value
								}),
								children: TIPOS.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: t }, t))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "w-full rounded-md border border-input bg-white px-2 py-1.5 text-[12px] outline-none focus:border-vibra-600",
								type: "number",
								placeholder: "Duração (min)",
								value: form.duracao_min,
								onChange: (e) => setForm({
									...form,
									duracao_min: Number(e.target.value)
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "sm:col-span-2 space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "text-[11px] font-bold uppercase tracking-wider text-muted-foreground block",
									children: [
										"Selecionar Participantes (",
										form.participantes?.length || 0,
										" selecionado(s))"
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PicklistField, {
									multi: true,
									categoria: "Participantes",
									value: form.participantes || [],
									onChange: (v) => setForm({
										...form,
										participantes: v
									}),
									placeholder: "Selecione os participantes (pesquise e crie novos inline)..."
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								className: "w-full rounded-md border border-input bg-white px-2 py-1.5 text-[12px] outline-none focus:border-vibra-600 sm:col-span-2 min-h-[60px]",
								placeholder: "Notas / pauta",
								value: form.notas,
								onChange: (e) => setForm({
									...form,
									notas: e.target.value
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2 flex justify-end gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "rounded-md border border-border bg-white px-2 py-1 text-[11px] hover:bg-vibra-50",
							onClick: () => setOpen(false),
							children: "Cancelar"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "rounded-md bg-vibra-700 px-3 py-1.5 text-[12px] font-semibold text-white hover:bg-vibra-800",
							onClick: criar,
							children: "Criar"
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 md:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-border bg-card p-4 shadow-vibra-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mb-3 flex items-center gap-2 text-[13px] font-bold text-vibra-800",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "h-4 w-4" }),
								"📌 Próximos Eventos (",
								futuros.length,
								")"
							]
						}),
						futuros.map((r) => {
							const ps = parts.filter((p) => p.agenda_id === r.id);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-3 rounded-lg border border-border p-3 text-[12px] bg-white shadow-sm hover:shadow transition",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "font-bold text-vibra-800 text-[13px]",
											children: ["● ", r.titulo]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-muted-foreground mt-0.5",
											children: [
												new Date(r.data_evento).toLocaleString("pt-BR"),
												" •",
												" ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "font-semibold text-vibra-700",
													children: [r.duracao_min, "min"]
												}),
												" •",
												" ",
												r.tipo_reuniao
											]
										}),
										r.notas && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[11.5px] text-muted-foreground bg-slate-50 border border-slate-100 rounded p-1.5 mt-1.5 italic",
											children: r.notas
										})
									] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex gap-1 shrink-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											className: `${btnGhost} py-1 px-1.5`,
											onClick: () => concluir(r.id),
											title: "Concluir Evento",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "mr-0.5 inline h-3 w-3 text-emerald-600 stroke-[3]" }), "Concluir"]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											className: `${btnDanger} p-1`,
											onClick: () => remove(r.id),
											title: "Excluir Evento",
											children: "🗑️"
										})]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InlineParticipants, {
									agendaId: r.id,
									duracaoMin: r.duracao_min,
									allProfiles: profiles,
									currentParts: ps,
									qc
								})]
							}, r.id);
						}),
						futuros.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[12px] text-muted-foreground italic",
							children: "Nenhum evento futuro."
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-border bg-card p-4 shadow-vibra-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mb-3 text-[13px] font-bold text-vibra-800",
							children: [
								"✅ Concluídos (",
								concluidos.length,
								")"
							]
						}),
						concluidos.map((r) => {
							const ps = parts.filter((p) => p.agenda_id === r.id);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-3 rounded-lg border border-border p-3 text-[12px] bg-slate-50/50",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "font-bold text-emerald-700 text-[13px]",
										children: ["● ", r.titulo]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-muted-foreground mt-0.5",
										children: [
											new Date(r.data_evento).toLocaleString("pt-BR"),
											" •",
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "font-semibold",
												children: [r.duracao_min, "min"]
											}),
											" • ",
											r.tipo_reuniao
										]
									}),
									r.notas && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[11.5px] text-muted-foreground bg-white border border-slate-100 rounded p-1.5 mt-1.5 italic",
										children: r.notas
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InlineParticipants, {
										agendaId: r.id,
										duracaoMin: r.duracao_min,
										allProfiles: profiles,
										currentParts: ps,
										qc
									})
								]
							}, r.id);
						}),
						concluidos.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[12px] text-muted-foreground italic",
							children: "Nenhum evento concluído."
						})
					]
				})]
			})
		]
	});
}
function InlineParticipants({ agendaId, duracaoMin, allProfiles, currentParts, qc }) {
	const [showAdd, setShowAdd] = (0, import_react.useState)(false);
	const [search, setSearch] = (0, import_react.useState)("");
	const currentProfileIds = currentParts.map((p) => p.profile_id);
	async function handleToggleParticipant(profileId, isSelected) {
		if (isSelected) {
			const { error } = await supabase.from("agenda_participantes").delete().eq("agenda_id", agendaId).eq("profile_id", profileId);
			if (error) toast.error("Erro ao remover participante: " + error.message);
			else {
				toast.success("Participante removido");
				qc.invalidateQueries({ queryKey: ["agenda-parts"] });
			}
		} else {
			const { error } = await supabase.from("agenda_participantes").insert({
				agenda_id: agendaId,
				profile_id: profileId,
				minutos_creditados: duracaoMin
			});
			if (error) toast.error("Erro ao adicionar participante: " + error.message);
			else {
				toast.success("Participante adicionado com sucesso!");
				qc.invalidateQueries({ queryKey: ["agenda-parts"] });
			}
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-3 border-t border-dashed border-border pt-2.5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-[10.5px] font-extrabold uppercase tracking-wider text-muted-foreground",
					children: [
						"Participantes (",
						currentParts.length,
						")"
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setShowAdd(!showAdd),
					className: "rounded px-1.5 py-0.5 text-[10.5px] font-semibold text-vibra-700 bg-vibra-50 hover:bg-vibra-100 transition border border-vibra-200",
					children: showAdd ? "Fechar" : "+ Vincular (inline)"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-2 flex flex-wrap gap-1",
				children: [currentParts.map((part) => {
					const prof = allProfiles.find((p) => p.id === part.profile_id);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-1 rounded bg-slate-100 px-1.5 py-0.5 text-[11px] text-slate-700 border border-slate-200 shadow-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "max-w-[120px] truncate",
								children: prof ? prof.nome || prof.email : "Usuário"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-[9px] text-slate-500 font-mono",
								children: [
									"(",
									part.minutos_creditados ?? duracaoMin,
									" min)"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => handleToggleParticipant(part.profile_id, true),
								className: "ml-0.5 shrink-0 rounded-full p-0.5 text-slate-400 hover:bg-slate-200 hover:text-red-600 transition",
								title: "Remover",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-2.5 w-2.5" })
							})
						]
					}, part.id || part.profile_id);
				}), currentParts.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] italic text-muted-foreground",
					children: "Nenhum participante vinculado."
				})]
			}),
			showAdd && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-2 rounded-lg border border-vibra-200 bg-slate-50 p-2 shadow-inner",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative mb-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-2 top-2 h-3.5 w-3.5 text-slate-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "text",
						placeholder: "🔍 Buscar participante por nome...",
						className: "w-full rounded border border-neutral-300 bg-white pl-7.5 pr-2 py-1 text-[11px] outline-none focus:border-vibra-500",
						value: search,
						onChange: (e) => setSearch(e.target.value)
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "max-h-36 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 gap-1.5 pr-1",
					children: allProfiles.filter((p) => {
						const term = search.toLowerCase();
						return (p.nome || p.email || "").toLowerCase().includes(term);
					}).map((p) => {
						const isSelected = currentProfileIds.includes(p.id);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => handleToggleParticipant(p.id, isSelected),
							className: `flex items-center justify-between rounded border px-2 py-1 text-left text-[11px] transition ${isSelected ? "bg-emerald-50 text-emerald-800 font-medium border-emerald-300" : "bg-white hover:bg-slate-100 text-slate-700 border-neutral-200"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "truncate",
								children: p.nome || p.email || "Sem Nome"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[9px] font-mono shrink-0",
								children: isSelected ? "✓ Vinculado" : `+ ${duracaoMin} min`
							})]
						}, p.id);
					})
				})]
			})
		]
	});
}
var BLOCKS = [
	[
		"o_que_mudou",
		"🔄 O Que Mudou",
		"Principais mudanças e avanços"
	],
	[
		"riscos",
		"⚠️ Principais Riscos",
		"Riscos identificados e status"
	],
	[
		"decisoes",
		"✅ Decisões Tomadas",
		"Decisões relevantes do período"
	],
	[
		"retorno",
		"📈 Retorno Esperado",
		"Benefícios e ganhos projetados"
	],
	[
		"proximas_acoes",
		"📋 Próximas Ações",
		"Próximos passos planejados"
	],
	[
		"indicadores_sucesso",
		"📊 Indicadores de Sucesso",
		"KPIs e métricas"
	]
];
function StatusEstrategicoTab() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireIniciativa, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Inner$3, {}) });
}
function Inner$3() {
	const qc = useQueryClient();
	const { iniciativaId } = useHierarchy();
	const { data } = useQuery({
		queryKey: ["status-estrat", iniciativaId],
		queryFn: async () => (await supabase.from("status_estrategico").select("*").eq("iniciativa_id", iniciativaId).is("deleted_at", null).order("created_at", { ascending: false }).limit(1).maybeSingle()).data
	});
	const [v, setV] = (0, import_react.useState)({});
	(0, import_react.useEffect)(() => {
		setV(data ?? {});
	}, [data]);
	async function save() {
		const payload = { iniciativa_id: iniciativaId };
		BLOCKS.forEach(([k]) => {
			payload[k] = v[k] ?? "";
		});
		const { error } = data?.id ? await supabase.from("status_estrategico").update(payload).eq("id", data.id) : await supabase.from("status_estrategico").insert(payload);
		if (error) toast.error(error.message);
		else {
			toast.success("Salvo");
			qc.invalidateQueries({ queryKey: ["status-estrat"] });
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-3 md:grid-cols-2",
			children: BLOCKS.map(([k, l, d]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-border bg-card p-4 shadow-vibra-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[12px] font-bold text-vibra-800",
						children: l
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-1 text-[10.5px] text-muted-foreground",
						children: d
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						className: inputCls + " min-h-[100px]",
						value: v[k] ?? "",
						onChange: (e) => setV((s) => ({
							...s,
							[k]: e.target.value
						}))
					})
				]
			}, k))
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex justify-end",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				className: btnPrimary,
				onClick: save,
				children: "Salvar"
			})
		})]
	});
}
var MAP = {
	3: "Alto/Alta",
	2: "Médio/Média",
	1: "Baixo/Baixa"
};
function scoreColor(s) {
	return s >= 7 ? "bg-red-100 text-red-700" : s >= 4 ? "bg-orange-100 text-orange-800" : "bg-emerald-100 text-emerald-800";
}
function scoreLabel(s) {
	return s >= 7 ? "Crítico" : s >= 4 ? "Alto" : "Baixo";
}
function RiscosTab() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireIniciativa, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Inner$2, {}) });
}
function Inner$2() {
	const qc = useQueryClient();
	const { iniciativaId } = useHierarchy();
	const { data: rows = [] } = useQuery({
		queryKey: ["riscos", iniciativaId],
		queryFn: async () => (await supabase.from("riscos").select("*").eq("iniciativa_id", iniciativaId).order("severidade", { ascending: false })).data ?? []
	});
	const crit = rows.filter((r) => Number(r.severidade ?? 0) >= 7).length;
	const altos = rows.filter((r) => {
		const s = Number(r.severidade ?? 0);
		return s >= 4 && s < 7;
	}).length;
	const baixos = rows.filter((r) => Number(r.severidade ?? 0) < 4 && Number(r.severidade ?? 0) > 0).length;
	async function add() {
		const { error } = await supabase.from("riscos").insert({
			iniciativa_id: iniciativaId,
			descricao: "",
			probabilidade: 1,
			impacto: 1,
			severidade: 1
		});
		if (error) toast.error(error.message);
		else qc.invalidateQueries({ queryKey: ["riscos"] });
	}
	async function patch(id, p) {
		if ("probabilidade" in p || "impacto" in p) {
			const cur = rows.find((r) => r.id === id);
			const prob = p.probabilidade ?? cur?.probabilidade ?? 1;
			const imp = p.impacto ?? cur?.impacto ?? 1;
			p.severidade = Number(prob) * Number(imp);
		}
		await supabase.from("riscos").update(p).eq("id", id);
		qc.invalidateQueries({ queryKey: ["riscos"] });
	}
	async function remove(id) {
		await supabase.from("riscos").delete().eq("id", id);
		qc.invalidateQueries({ queryKey: ["riscos"] });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						label: "Críticos (7-9)",
						value: crit,
						tone: "red"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						label: "Altos (4-6)",
						value: altos,
						tone: "orange"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						label: "Baixos (1-3)",
						value: baixos,
						tone: "green"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex justify-end",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: btnPrimary,
					onClick: add,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-1 inline h-3.5 w-3.5" }), "Novo Risco"]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-x-auto rounded-xl border border-border bg-card shadow-vibra-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "min-w-[800px] w-full text-[12px]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
						className: "bg-vibra-50 text-[10.5px] uppercase tracking-wider text-vibra-800",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: [
							"ID",
							"Risco",
							"Probabilidade",
							"Impacto",
							"Score",
							"Classe",
							"Mitigação",
							""
						].map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-2 py-2 text-left",
							children: h
						}, h)) })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [rows.map((r, i) => {
						const s = Number(r.severidade ?? 0);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-t border-border",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: "px-2 py-1 font-bold text-vibra-700",
									children: ["R-", String(i + 1).padStart(3, "0")]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-2 py-1",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										className: inputCls,
										defaultValue: r.descricao ?? "",
										onBlur: (e) => patch(r.id, { descricao: e.target.value })
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-2 py-1 w-32",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
										className: inputCls,
										defaultValue: r.probabilidade ?? 1,
										onChange: (e) => patch(r.id, { probabilidade: Number(e.target.value) }),
										children: [
											3,
											2,
											1
										].map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: n,
											children: MAP[n].split("/")[1]
										}, n))
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-2 py-1 w-32",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
										className: inputCls,
										defaultValue: r.impacto ?? 1,
										onChange: (e) => patch(r.id, { impacto: Number(e.target.value) }),
										children: [
											3,
											2,
											1
										].map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: n,
											children: MAP[n].split("/")[0]
										}, n))
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-2 py-1",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `rounded-md px-2 py-0.5 font-bold ${scoreColor(s)}`,
										children: s
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-2 py-1 font-semibold",
									children: scoreLabel(s)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-2 py-1",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										className: inputCls,
										defaultValue: r.mitigacao ?? "",
										onBlur: (e) => patch(r.id, { mitigacao: e.target.value })
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-2 py-1",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										className: btnDanger,
										onClick: () => remove(r.id),
										children: "🗑️"
									})
								})
							]
						}, r.id);
					}), rows.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						colSpan: 8,
						className: "px-3 py-8 text-center text-muted-foreground",
						children: "Nenhum risco."
					}) })] })]
				})
			})
		]
	});
}
function MatrizTab() {
	const { projetoId } = useHierarchy();
	const { data: iniciativas = [] } = useQuery({
		queryKey: ["matriz-ini", projetoId],
		queryFn: async () => {
			let q = supabase.from("iniciativas").select("id,titulo,codigo,esforco,impacto_negocio,score").is("deleted_at", null);
			if (projetoId) q = q.eq("projeto_id", projetoId);
			return (await q).data ?? [];
		}
	});
	const data = iniciativas.map((i) => ({
		x: Number(i.esforco ?? 3),
		y: Number(i.impacto_negocio ?? 3),
		z: Number(i.score ?? 10),
		nome: `${i.codigo ?? ""} ${i.titulo ?? ""}`.trim()
	}));
	const top = [...iniciativas].sort((a, b) => Number(b.score ?? 0) - Number(a.score ?? 0)).slice(0, 10);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-xl border border-border bg-card p-4 shadow-vibra-sm",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-2 text-[13px] font-bold text-vibra-800",
					children: "Matriz Esforço × Impacto"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
					width: "100%",
					height: 420,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ScatterChart, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, { strokeDasharray: "3 3" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
							type: "number",
							dataKey: "x",
							name: "Esforço",
							domain: [0, 5],
							label: {
								value: "Esforço →",
								position: "bottom"
							}
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
							type: "number",
							dataKey: "y",
							name: "Impacto",
							domain: [0, 5],
							label: {
								value: "Impacto ↑",
								angle: -90,
								position: "left"
							}
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZAxis, {
							type: "number",
							dataKey: "z",
							range: [60, 400]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReferenceLine, {
							x: 2.5,
							stroke: "#aaa"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReferenceLine, {
							y: 2.5,
							stroke: "#aaa"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
							cursor: { strokeDasharray: "3 3" },
							formatter: (v, n) => [v, n],
							labelFormatter: () => "",
							content: ({ payload }) => payload?.[0] ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-md border bg-white p-2 text-[11px] shadow",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: payload[0].payload.nome }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
									"Esforço ",
									payload[0].payload.x,
									" / Impacto ",
									payload[0].payload.y,
									" / Score",
									" ",
									payload[0].payload.z
								]
							}) : null
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scatter, {
							data,
							fill: VIBRA.green
						})
					] })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-2 grid grid-cols-2 gap-2 text-[10.5px] text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "rounded bg-vibra-50 p-1.5 text-center font-semibold",
							children: "QUICK WINS (alto impacto, baixo esforço)"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "rounded bg-orange-50 p-1.5 text-center font-semibold",
							children: "GRANDES PROJETOS"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "rounded bg-zinc-100 p-1.5 text-center font-semibold",
							children: "FILL-INS"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "rounded bg-red-50 p-1.5 text-center font-semibold",
							children: "EVITAR"
						})
					]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-xl border border-border bg-card p-4 shadow-vibra-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-2 text-[13px] font-bold text-vibra-800",
				children: "Ranking Top 10"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full text-[12px]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
					className: "text-[10.5px] uppercase text-vibra-800",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "text-left",
							children: "#"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "text-left",
							children: "Iniciativa"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "text-right",
							children: "Score"
						})
					] })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [top.map((i, n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-t",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
							className: "py-1",
							children: [n + 1, "º"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
							className: "py-1",
							children: [
								i.codigo ?? "—",
								" — ",
								i.titulo
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "py-1 text-right font-bold text-vibra-700",
							children: Number(i.score ?? 0).toFixed(0)
						})
					]
				}, i.id)), top.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
					colSpan: 3,
					className: "py-4 text-center text-muted-foreground",
					children: "Nenhuma iniciativa."
				}) })] })]
			})]
		})]
	});
}
var STATUS$1 = [
	"Não Iniciado",
	"Em Andamento",
	"Concluído"
];
function CronogramaTab() {
	const qc = useQueryClient();
	const { projetoId } = useHierarchy();
	const { data: rows = [] } = useQuery({
		queryKey: ["crono-ini", projetoId],
		queryFn: async () => {
			let q = supabase.from("iniciativas").select("id,codigo,titulo,gestor_responsavel,data_inicio,data_fim_prevista,status,percentual_avanco").is("deleted_at", null);
			if (projetoId) q = q.eq("projeto_id", projetoId);
			return (await q.order("data_inicio")).data ?? [];
		}
	});
	async function patch(id, p) {
		await supabase.from("iniciativas").update(p).eq("id", id);
		qc.invalidateQueries({ queryKey: ["crono-ini"] });
	}
	const concl = rows.filter((r) => /conclu/i.test(r.status ?? "")).length;
	const and = rows.filter((r) => /andamento/i.test(r.status ?? "")).length;
	const ni = rows.length - concl - and;
	const progMedio = rows.length ? rows.reduce((s, r) => s + Number(r.percentual_avanco ?? 0), 0) / rows.length : 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-3 sm:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
					label: "Concluídos",
					value: concl,
					tone: "green"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
					label: "Em Andamento",
					value: and,
					tone: "blue"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
					label: "Não Iniciado",
					value: ni,
					tone: "orange"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
					label: "Progresso Médio",
					value: `${progMedio.toFixed(0)}%`
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "overflow-x-auto rounded-xl border border-border bg-card shadow-vibra-sm",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "min-w-[900px] w-full text-[12px]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
					className: "bg-vibra-50 text-[10.5px] uppercase tracking-wider text-vibra-800",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: [
						"Processo / Iniciativa",
						"Responsável",
						"Início",
						"Fim",
						"Dias",
						"Status",
						"Progresso (%)"
					].map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "px-2 py-2 text-left",
						children: h
					}, h)) })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [rows.map((r) => {
					const dias = r.data_inicio && r.data_fim_prevista ? Math.round((+new Date(r.data_fim_prevista) - +new Date(r.data_inicio)) / 864e5) : 0;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-t border-border",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								className: "px-2 py-1 font-semibold text-vibra-800",
								children: [
									r.codigo ?? "",
									" ",
									r.titulo
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-2 py-1",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: inputCls,
									defaultValue: r.gestor_responsavel ?? "",
									onBlur: (e) => patch(r.id, { gestor_responsavel: e.target.value })
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-2 py-1 w-36",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "date",
									className: inputCls,
									defaultValue: r.data_inicio ?? "",
									onBlur: (e) => patch(r.id, { data_inicio: e.target.value })
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-2 py-1 w-36",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "date",
									className: inputCls,
									defaultValue: r.data_fim_prevista ?? "",
									onBlur: (e) => patch(r.id, { data_fim_prevista: e.target.value })
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-2 py-1 w-16 bg-vibra-50/50 font-semibold",
								children: dias
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-2 py-1",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									className: inputCls,
									defaultValue: r.status ?? "",
									onChange: (e) => patch(r.id, { status: e.target.value }),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "",
										children: "—"
									}), STATUS$1.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: s }, s))]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-2 py-1 w-32",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "number",
									min: 0,
									max: 100,
									className: inputCls,
									defaultValue: r.percentual_avanco ?? 0,
									onBlur: (e) => patch(r.id, { percentual_avanco: Number(e.target.value) })
								})
							})
						]
					}, r.id);
				}), rows.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
					colSpan: 7,
					className: "px-3 py-8 text-center text-muted-foreground",
					children: "Nenhuma iniciativa no escopo."
				}) })] })]
			})
		})]
	});
}
var PHASES = [
	[
		"define_phase",
		"🔍 DEFINE",
		"Definir o problema, escopo e objetivos do projeto."
	],
	[
		"measure_phase",
		"📊 MEASURE",
		"Medir a situação atual com dados e indicadores."
	],
	[
		"analyze_phase",
		"🔬 ANALYZE",
		"Analisar dados para identificar causas raiz."
	],
	[
		"improve_phase",
		"💡 IMPROVE",
		"Desenvolver e implementar soluções para as causas."
	],
	[
		"control_phase",
		"🎯 CONTROL",
		"Monitorar resultados e padronizar melhorias."
	]
];
function DmaicTab() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireIniciativa, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Inner$1, {}) });
}
function Inner$1() {
	const qc = useQueryClient();
	const { iniciativaId } = useHierarchy();
	const { data } = useQuery({
		queryKey: ["dmaic", iniciativaId],
		queryFn: async () => (await supabase.from("dmaic").select("*").eq("iniciativa_id", iniciativaId).is("deleted_at", null).maybeSingle()).data
	});
	const [v, setV] = (0, import_react.useState)({});
	(0, import_react.useEffect)(() => {
		setV(data ?? {});
	}, [data]);
	async function save() {
		const payload = { iniciativa_id: iniciativaId };
		PHASES.forEach(([k]) => {
			payload[k] = v[k] ?? "";
		});
		const { error } = data?.id ? await supabase.from("dmaic").update(payload).eq("id", data.id) : await supabase.from("dmaic").insert(payload);
		if (error) toast.error(error.message);
		else {
			toast.success("Salvo");
			qc.invalidateQueries({ queryKey: ["dmaic"] });
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-3",
		children: [PHASES.map(([k, l, d]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-xl border border-border bg-card p-4 shadow-vibra-sm",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[13px] font-bold text-vibra-800",
					children: l
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-1 text-[10.5px] text-muted-foreground",
					children: d
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					className: inputCls + " min-h-[80px]",
					value: v[k] ?? "",
					onChange: (e) => setV((s) => ({
						...s,
						[k]: e.target.value
					}))
				})
			]
		}, k)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex justify-end",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				className: btnPrimary,
				onClick: save,
				children: "Salvar DMAIC"
			})
		})]
	});
}
function EvolucaoTab() {
	const { projetoId } = useHierarchy();
	const { data: rows = [] } = useQuery({
		queryKey: ["evol-ini", projetoId],
		queryFn: async () => {
			let q = supabase.from("iniciativas").select("id,codigo,titulo,gestor_responsavel,data_inicio,data_fim_prevista,status,percentual_avanco").is("deleted_at", null);
			if (projetoId) q = q.eq("projeto_id", projetoId);
			return (await q.order("data_inicio")).data ?? [];
		}
	});
	const concl = rows.filter((r) => /conclu/i.test(r.status ?? "")).length;
	const and = rows.filter((r) => /andamento/i.test(r.status ?? "")).length;
	const ni = rows.length - concl - and;
	const prog = rows.length ? rows.reduce((s, r) => s + Number(r.percentual_avanco ?? 0), 0) / rows.length : 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-3 sm:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
					label: "Concluídos",
					value: concl,
					tone: "green"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
					label: "Em Andamento",
					value: and,
					tone: "blue"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
					label: "Não Iniciado",
					value: ni,
					tone: "orange"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
					label: "Progresso Médio",
					value: `${prog.toFixed(0)}%`
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-xl border border-border bg-card p-4 shadow-vibra-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-3 text-[13px] font-bold text-vibra-800",
				children: "📅 Timeline de Mapeamento"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3",
				children: [rows.map((r) => {
					const p = Number(r.percentual_avanco ?? 0);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "border-l-4 border-vibra-600 pl-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-[12px] font-bold text-vibra-800",
								children: [
									"● ",
									r.codigo ?? "",
									" ",
									r.titulo
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-[11px] text-muted-foreground",
								children: [
									r.gestor_responsavel ?? "—",
									" • ",
									r.data_inicio ?? "?",
									" —",
									" ",
									r.data_fim_prevista ?? "?"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-1 flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-2 flex-1 rounded-full bg-vibra-50",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-2 rounded-full bg-vibra-600",
										style: { width: `${p}%` }
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "w-28 text-right text-[11px] font-semibold",
									children: [
										p,
										"% ",
										r.status ?? ""
									]
								})]
							})
						]
					}, r.id);
				}), rows.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-center text-[12px] text-muted-foreground",
					children: "Sem iniciativas."
				})]
			})]
		})]
	});
}
function ResultadosTab() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireIniciativa, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Inner, {}) });
}
function Inner() {
	const { iniciativaId } = useHierarchy();
	const { data: ini } = useQuery({
		queryKey: ["res-ini", iniciativaId],
		queryFn: async () => {
			return (await supabase.from("iniciativas").select("*").eq("id", iniciativaId).single()).data;
		}
	});
	const { data: asis = [] } = useQuery({
		queryKey: ["res-asis", iniciativaId],
		queryFn: async () => {
			return (await supabase.from("asis_passos").select("tempo").eq("iniciativa_id", iniciativaId).is("deleted_at", null)).data ?? [];
		}
	});
	const { data: tobe = [] } = useQuery({
		queryKey: ["res-tobe-rich", iniciativaId],
		queryFn: async () => {
			return (await supabase.from("tobe_passos").select("tempo, ganho_fte, ganho_financeiro").eq("iniciativa_id", iniciativaId).is("deleted_at", null)).data ?? [];
		}
	});
	const tA = asis.reduce((s, r) => s + Number(r.tempo ?? 0), 0);
	const tB = tobe.reduce((s, r) => s + Number(r.tempo ?? 0), 0);
	const redTempoPercent = tA ? (tA - tB) / tA * 100 : 0;
	const ganhoFteSum = tobe.reduce((s, r) => s + Number(r.ganho_fte ?? 0), 0);
	const hcA = Number(ini?.hc_atual ?? 0);
	const hcLiberado = ganhoFteSum > 0 ? ganhoFteSum : hcA * (redTempoPercent / 100);
	const hcB = Math.max(hcA * (1 - redTempoPercent / 100), hcA - hcLiberado);
	const ganhoFinSum = tobe.reduce((s, r) => s + Number(r.ganho_financeiro ?? 0), 0);
	const ganhoAno = ganhoFinSum > 0 ? ganhoFinSum : Number(ini?.saving_previsto ?? 0);
	const formatTime = (minutes) => {
		const rounded = Math.round(minutes);
		const hours = Math.floor(rounded / 60);
		const remainingMinutes = rounded % 60;
		return `${rounded} min (${hours}h ${remainingMinutes < 10 ? `0${remainingMinutes}` : `${remainingMinutes}`}min)`;
	};
	const timeChartData = [{
		name: "Lead Time (Horas)",
		"AS-IS": Number((tA / 60).toFixed(1)),
		"TO-BE": Number((tB / 60).toFixed(1))
	}];
	const hcChartData = [{
		name: "Dimensionamento (HC)",
		"AS-IS": Number(hcA.toFixed(2)),
		"TO-BE": Number(hcB.toFixed(2))
	}];
	asis.length, tobe.length;
	const CustomTooltip = ({ active, payload }) => {
		if (active && payload && payload.length) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-lg border border-slate-200 bg-white p-3 shadow-md text-xs font-sans",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-extrabold text-slate-800 mb-2",
				children: payload[0].payload.name
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-1.5",
				children: payload.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-1.5 text-slate-500",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "h-2 w-2 rounded-full",
								style: { backgroundColor: p.fill }
							}),
							p.name,
							":"
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-black text-slate-900",
						children: p.value
					})]
				}, p.name))
			})]
		});
		return null;
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: {
							opacity: 0,
							y: 10
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: { duration: .3 },
						className: "relative overflow-hidden rounded-xl border border-blue-100 bg-blue-50/20 p-5 shadow-vibra-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-[11px] font-extrabold uppercase tracking-wider text-blue-800 flex items-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-4 w-4 text-blue-600" }), " Redução de Lead Time"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded-full bg-blue-100/50 p-1.5 text-blue-700",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingDown, { className: "h-4 w-4" })
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 flex items-baseline gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-3xl font-black text-blue-900 tracking-tight",
									children: [redTempoPercent.toFixed(1), "%"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[11px] font-extrabold text-blue-600",
									children: "de eficiência"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 border-t border-blue-100/30 pt-2 flex justify-between text-[11px] text-blue-800/80",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Tempo AS-IS: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: formatTime(tA) })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Alvo TO-BE: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: formatTime(tB) })] })]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: {
							opacity: 0,
							y: 10
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: {
							duration: .3,
							delay: .1
						},
						className: "relative overflow-hidden rounded-xl border border-indigo-100 bg-indigo-50/20 p-5 shadow-vibra-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-[11px] font-extrabold uppercase tracking-wider text-indigo-800 flex items-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-4 w-4 text-indigo-600" }), " Colaboradores Liberados (HC)"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded-full bg-indigo-100/50 p-1.5 text-indigo-700",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "h-4 w-4" })
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 flex items-baseline gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-3xl font-black text-indigo-900 tracking-tight",
									children: hcLiberado.toFixed(2)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[11px] font-extrabold text-indigo-600",
									children: "colaboradores (HC)"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 border-t border-indigo-100/30 pt-2 flex justify-between text-[11px] text-indigo-800/80",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["AS-IS Equipe: ", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [hcA.toFixed(1), " HC"] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["TO-BE Alvo: ", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [hcB.toFixed(1), " HC"] })] })]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: {
							opacity: 0,
							y: 10
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: {
							duration: .3,
							delay: .2
						},
						className: "relative overflow-hidden rounded-xl border border-emerald-100 bg-emerald-50/20 p-5 shadow-vibra-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-[11px] font-extrabold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DollarSign, { className: "h-4 w-4 text-emerald-600" }), " Saving Sincronizado"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded-full bg-emerald-100/50 px-2 py-0.5 text-emerald-700 font-extrabold text-[9px] uppercase tracking-wider",
									children: "Anual"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-3 flex items-baseline gap-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-3xl font-black text-emerald-900 tracking-tight",
									children: ganhoAno.toLocaleString("pt-BR", {
										style: "currency",
										currency: "BRL",
										minimumFractionDigits: 2,
										maximumFractionDigits: 2
									})
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 border-t border-emerald-100/30 pt-2 flex justify-between text-[11px] text-emerald-800/80",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Retorno Mapeado" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-black text-emerald-700",
									children: "100% Sincronizado"
								})]
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 md:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					initial: {
						opacity: 0,
						scale: .98
					},
					animate: {
						opacity: 1,
						scale: 1
					},
					transition: { duration: .4 },
					className: "rounded-xl border border-border bg-card p-5 shadow-vibra-sm flex flex-col justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between mb-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
							className: "text-[13.5px] font-bold text-slate-900 flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-4.5 w-4.5 text-blue-600" }), " Lead Time do Processo (Horas)"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-[10px] bg-blue-100 text-blue-800 font-extrabold px-2 py-0.5 rounded-full flex items-center gap-0.5",
							children: [
								"-",
								redTempoPercent.toFixed(0),
								"% de Tempo"
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] text-muted-foreground mb-4",
						children: "Comparativo direto de horas de trabalho operacionais no fluxo."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-[220px] w-full mt-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
							width: "100%",
							height: "100%",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
								data: timeChartData,
								margin: {
									left: -20,
									right: 10
								},
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
										strokeDasharray: "3 3",
										stroke: "#f1f5f9"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
										dataKey: "name",
										tick: {
											fontSize: 9.5,
											fill: "#64748b"
										}
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, { tick: {
										fontSize: 9.5,
										fill: "#64748b"
									} }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CustomTooltip, {}) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, {
										iconSize: 8,
										iconType: "circle",
										wrapperStyle: {
											fontSize: 10,
											paddingTop: 10
										}
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
										name: "Cenário Atual (AS-IS)",
										dataKey: "AS-IS",
										fill: "#0B2545",
										radius: [
											4,
											4,
											0,
											0
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
										name: "Cenário Alvo (TO-BE)",
										dataKey: "TO-BE",
										fill: "#007BFF",
										radius: [
											4,
											4,
											0,
											0
										]
									})
								]
							})
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					initial: {
						opacity: 0,
						scale: .98
					},
					animate: {
						opacity: 1,
						scale: 1
					},
					transition: {
						duration: .4,
						delay: .1
					},
					className: "rounded-xl border border-border bg-card p-5 shadow-vibra-sm flex flex-col justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between mb-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
							className: "text-[13.5px] font-bold text-slate-900 flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-4.5 w-4.5 text-indigo-600" }), " Dimensionamento de Equipe (HC)"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[10px] bg-indigo-100 text-indigo-800 font-extrabold px-2 py-0.5 rounded-full",
							children: "Sincronizado"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] text-muted-foreground mb-4",
						children: "Equivalente de headcount (HC) exigido para a realização do processo."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-[220px] w-full mt-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
							width: "100%",
							height: "100%",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
								data: hcChartData,
								margin: {
									left: -20,
									right: 10
								},
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
										strokeDasharray: "3 3",
										stroke: "#f1f5f9"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
										dataKey: "name",
										tick: {
											fontSize: 9.5,
											fill: "#64748b"
										}
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, { tick: {
										fontSize: 9.5,
										fill: "#64748b"
									} }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CustomTooltip, {}) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, {
										iconSize: 8,
										iconType: "circle",
										wrapperStyle: {
											fontSize: 10,
											paddingTop: 10
										}
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
										name: "Cenário Atual (AS-IS)",
										dataKey: "AS-IS",
										fill: "#0B2545",
										radius: [
											4,
											4,
											0,
											0
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
										name: "Cenário Alvo (TO-BE)",
										dataKey: "TO-BE",
										fill: "#007BFF",
										radius: [
											4,
											4,
											0,
											0
										]
									})
								]
							})
						})
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: {
					opacity: 0,
					y: 15
				},
				animate: {
					opacity: 1,
					y: 0
				},
				transition: {
					duration: .4,
					delay: .2
				},
				className: "rounded-xl border border-border bg-card p-5 shadow-vibra-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col sm:flex-row sm:items-center justify-between mb-4 border-b border-slate-100 pb-3 gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
						className: "text-[13.5px] font-bold text-slate-900 flex items-center gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListOrdered, { className: "h-4.5 w-4.5 text-blue-600" }), " Estrutura Comparativa de Processo"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] text-muted-foreground mt-0.5",
						children: "Diagnóstico de complexidade entre as etapas mapeadas em tempo real."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-[11.5px] font-extrabold text-blue-700 bg-blue-50 border border-blue-100 px-3 py-1 rounded-md flex items-center gap-1.5",
						children: [
							asis.length,
							" Passos AS-IS ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-3 w-3" }),
							" ",
							tobe.length,
							" Passos TO-BE"
						]
					}) })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4 sm:grid-cols-2 text-xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2 rounded-xl bg-slate-50 p-4 border border-slate-100",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-extrabold text-slate-800 flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2.5 w-2.5 rounded-full bg-[#0B2545]" }), " Diagnóstico Atual (AS-IS)"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-muted-foreground leading-relaxed",
							children: [
								"O fluxo de trabalho conta com ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [asis.length, " etapas mapeadas"] }),
								", somando um esforço total de ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: formatTime(tA) }),
								" com",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [hcA, " colaboradores dedicados"] }),
								". O tempo operacional é impactado por etapas manuais redundantes e tempos excessivos de ciclo."
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2 rounded-xl bg-blue-50/20 p-4 border border-blue-100/50",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-extrabold text-blue-800 flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2.5 w-2.5 rounded-full bg-[#007BFF]" }), " Proposta de Otimização (TO-BE)"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-muted-foreground leading-relaxed",
							children: [
								"Com as melhorias estruturadas, o fluxo é otimizado para",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [tobe.length, " etapas eficientes"] }),
								", diminuindo o Lead Time para",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: formatTime(tB) }),
								". Isso liberta",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [hcLiberado.toFixed(2), " HC"] }),
								", deixando a equipe alvo dimensionada em",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [hcB.toFixed(2), " HC"] }),
								" e gerando um saving de",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [ganhoAno.toLocaleString("pt-BR", {
									style: "currency",
									currency: "BRL",
									minimumFractionDigits: 2,
									maximumFractionDigits: 2
								}), "/ano"] }),
								"."
							]
						})]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-3 bg-slate-50 border border-slate-100 rounded-lg text-[10.5px] text-slate-500 leading-normal font-medium mt-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-bold text-slate-700",
						children: "Nota de Premissa:"
					}),
					" Todos os cálculos e indicadores acima são focados exclusivamente em",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-bold text-slate-700",
						children: "Headcount (HC)"
					}),
					" para evitar confusões de alocação de equipe. Informações e estudos de",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-extrabold text-slate-700",
						children: "FTE (Full-Time Equivalent)"
					}),
					" são tratados como observações acessórias onde",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-bold text-slate-700",
						children: "1 FTE equivale a 165 horas úteis mensais"
					}),
					" ",
					"de esforço dedicado."
				]
			})
		]
	});
}
var TooltipProvider = Provider;
var Tooltip$1 = Root3;
var TooltipTrigger = Trigger;
var TooltipContent = import_react.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
	ref,
	sideOffset,
	className: cn("z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-tooltip-content-transform-origin)", className),
	...props
}) }));
TooltipContent.displayName = Content2.displayName;
var FIELDS = [
	[
		"horasEco",
		"Horas Economizadas/Mês",
		""
	],
	[
		"custoHora",
		"Custo Médio Hora (R$)",
		""
	],
	[
		"hcAtual",
		"HC Atual (FTE)",
		""
	],
	[
		"custoImpl",
		"Custo Implementação (R$)",
		""
	],
	[
		"erroAtual",
		"Taxa de Erro Atual (%)",
		""
	],
	[
		"erroFuturo",
		"Taxa de Erro Futuro (%)",
		""
	],
	[
		"volume",
		"Volume Total Mensal",
		""
	],
	[
		"leadAtual",
		"Lead Time Atual (dias)",
		""
	],
	[
		"tempoAtual",
		"Tempo Processo Atual (min)",
		""
	],
	[
		"tempoFuturo",
		"Tempo Processo Futuro (min)",
		""
	]
];
function formatMin(val) {
	if (val === void 0 || val === null || isNaN(val) || val <= 0) return "";
	const rounded = Math.round(val);
	const hours = Math.floor(rounded / 60);
	const minutes = rounded % 60;
	return `(${hours}h ${minutes < 10 ? "0" + minutes : minutes}min)`;
}
function CalculadoraTab() {
	const [v, setV] = (0, import_react.useState)({});
	const [hist, setHist] = (0, import_react.useState)([]);
	const hc = (v.horasEco ?? 0) / 176;
	const econMensal = (v.horasEco ?? 0) * (v.custoHora ?? 0);
	const econAnual = econMensal * 12;
	const roi = v.custoImpl ? (econAnual - v.custoImpl) / v.custoImpl * 100 : 0;
	const payback = econMensal ? (v.custoImpl ?? 0) / econMensal : 0;
	const redErr = v.erroAtual ? (v.erroAtual - (v.erroFuturo ?? 0)) / v.erroAtual * 100 : 0;
	const redTempo = v.tempoAtual ? (v.tempoAtual - (v.tempoFuturo ?? 0)) / v.tempoAtual * 100 : 0;
	const capExtra = v.tempoAtual ? (v.horasEco ?? 0) * 60 / v.tempoAtual : 0;
	function salvar() {
		setHist((h) => [{
			ts: /* @__PURE__ */ new Date(),
			hc,
			roi,
			payback,
			econAnual
		}, ...h]);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
				title: "Parâmetros de Entrada",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-2 sm:grid-cols-2 lg:grid-cols-3",
					children: FIELDS.map(([k, l]) => {
						const conversion = (k === "tempoAtual" || k === "tempoFuturo") && v[k] ? formatMin(v[k]) : "";
						const currencyHint = (k === "custoHora" || k === "custoImpl") && v[k] ? v[k].toLocaleString("pt-BR", {
							style: "currency",
							currency: "BRL"
						}) : "";
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex flex-col gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between text-[11px] font-semibold text-vibra-700",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: l }),
									conversion && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] text-blue-600 font-extrabold",
										children: conversion
									}),
									currencyHint && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] text-emerald-600 font-extrabold",
										children: currencyHint
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "number",
								className: inputCls,
								value: v[k] ?? "",
								onChange: (e) => setV((s) => ({
									...s,
									[k]: Number(e.target.value)
								}))
							})]
						}, k);
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calc, {
						label: "HC Potencial Liberar",
						value: `${hc.toFixed(2)} FTE`,
						tip: "Horas Eco ÷ 176 (1 FTE = 176h/mês)"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calc, {
						label: "ROI Estimado",
						value: `${roi.toFixed(0)}%`,
						tip: "((Economia Anual − Custo) ÷ Custo) × 100"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calc, {
						label: "Payback (meses)",
						value: `${payback.toFixed(1)}`,
						tip: "Custo ÷ Economia Mensal"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calc, {
						label: "Economia Anual",
						value: econAnual.toLocaleString("pt-BR", {
							style: "currency",
							currency: "BRL",
							minimumFractionDigits: 2,
							maximumFractionDigits: 2
						}),
						tip: "Horas Eco × Custo Hora × 12"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calc, {
						label: "Redução de Erros",
						value: `${redErr.toFixed(1)}%`,
						tip: "((Erro Atual − Erro Futuro) ÷ Erro Atual) × 100"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calc, {
						label: "Redução de Tempo",
						value: `${redTempo.toFixed(1)}%`,
						tip: "((Tempo Atual − Tempo Futuro) ÷ Tempo Atual) × 100"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calc, {
						label: "Capacidade Extra/h",
						value: `${capExtra.toFixed(1)}`,
						tip: "(Horas Eco × 60) ÷ Tempo Atual"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex justify-end",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: salvar,
					className: "rounded-md bg-vibra-700 px-4 py-2 text-[12px] font-semibold text-white hover:bg-vibra-800",
					children: "Salvar no Histórico"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
				title: "Histórico",
				children: hist.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-center text-[12px] text-muted-foreground",
					children: "Sem registros."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full text-[12px]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
						className: "text-[10.5px] uppercase text-vibra-800",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "text-left",
								children: "Data"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "HC" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "ROI" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Payback" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Anual" })
						] })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: hist.map((h, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-t",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-1",
								children: h.ts.toLocaleString("pt-BR")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								className: "text-center",
								children: [h.hc.toFixed(2), " FTE"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								className: "text-center",
								children: [h.roi.toFixed(0), "%"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								className: "text-center",
								children: [h.payback.toFixed(1), "m"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "text-center",
								children: h.econAnual.toLocaleString("pt-BR", {
									style: "currency",
									currency: "BRL",
									minimumFractionDigits: 2,
									maximumFractionDigits: 2
								})
							})
						]
					}, i)) })]
				})
			})
		]
	}) });
}
function Calc({ label, value, tip }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-vibra-200 bg-vibra-50/60 p-3 shadow-vibra-sm",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-1",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[10px] uppercase tracking-wider text-vibra-700",
				children: label
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tooltip$1, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, { className: "h-3 w-3 text-vibra-600" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipContent, {
				className: "max-w-[220px] text-[11px]",
				children: tip
			})] })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-[18px] font-bold text-vibra-800",
			children: value
		})]
	});
}
function Top15Tab() {
	const { projetoId } = useHierarchy();
	const { data: rows = [] } = useQuery({
		queryKey: ["top15", projetoId],
		queryFn: async () => {
			let q = supabase.from("iniciativas").select("id,codigo,titulo,status,prioridade,score,saving_previsto,saving_realizado,hc_atual,hc_liberado,impacto_negocio,esforco").is("deleted_at", null);
			if (projetoId) q = q.eq("projeto_id", projetoId);
			return (await q.order("score", { ascending: false }).limit(15)).data ?? [];
		}
	});
	const chart = rows.slice(0, 10).map((r) => ({
		nome: (r.codigo ?? "").slice(0, 8),
		score: Number(r.score ?? 0),
		saving: Number(r.saving_previsto ?? 0) / 1e3
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "overflow-x-auto rounded-xl border border-border bg-card shadow-vibra-sm",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "min-w-[1000px] w-full text-[12px]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
					className: "bg-vibra-50 text-[10.5px] uppercase tracking-wider text-vibra-800",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: [
						"Pos",
						"ID",
						"Título",
						"Status",
						"Prioridade",
						"Score",
						"Saving",
						"HC Atual",
						"HC Liberar",
						"Impacto",
						"Esforço"
					].map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "px-2 py-2 text-left",
						children: h
					}, h)) })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [rows.map((r, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-t border-border",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-2 py-1 font-bold",
							children: i + 1
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-2 py-1 text-vibra-700 font-semibold",
							children: r.codigo ?? "—"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-2 py-1",
							children: r.titulo
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-2 py-1",
							children: r.status ?? "—"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-2 py-1",
							children: r.prioridade ?? "—"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-2 py-1 font-bold text-vibra-700",
							children: Number(r.score ?? 0).toFixed(0)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-2 py-1",
							children: Number(r.saving_previsto ?? 0).toLocaleString("pt-BR", {
								style: "currency",
								currency: "BRL",
								minimumFractionDigits: 2,
								maximumFractionDigits: 2
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-2 py-1",
							children: Number(r.hc_atual ?? 0).toFixed(1)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-2 py-1",
							children: Number(r.hc_liberado ?? 0).toFixed(1)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
							className: "px-2 py-1",
							children: [r.impacto_negocio ?? "—", "/5"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
							className: "px-2 py-1",
							children: [r.esforco ?? "—", "/5"]
						})
					]
				}, r.id)), rows.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
					colSpan: 11,
					className: "px-3 py-8 text-center text-muted-foreground",
					children: "Nenhuma iniciativa."
				}) })] })]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 lg:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-border bg-card p-4 shadow-vibra-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-2 text-[13px] font-bold text-vibra-800",
					children: "Score por Iniciativa"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
					width: "100%",
					height: 260,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
						data: chart,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
								strokeDasharray: "3 3",
								stroke: "#eee"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
								dataKey: "nome",
								tick: { fontSize: 10 }
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
								dataKey: "score",
								fill: VIBRA.green,
								radius: [
									6,
									6,
									0,
									0
								]
							})
						]
					})
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-border bg-card p-4 shadow-vibra-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-2 text-[13px] font-bold text-vibra-800",
					children: "Saving Previsto (R$ mil)"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
					width: "100%",
					height: 260,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
						data: chart,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
								strokeDasharray: "3 3",
								stroke: "#eee"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
								dataKey: "nome",
								tick: { fontSize: 10 }
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
								dataKey: "saving",
								fill: VIBRA.orange,
								radius: [
									6,
									6,
									0,
									0
								]
							})
						]
					})
				})]
			})]
		})]
	});
}
function PlaybookTab() {
	const [active, setActive] = (0, import_react.useState)("intro");
	const SECTIONS = [
		{
			id: "intro",
			title: "1. Introdução & Programa MC",
			icon: BookOpen,
			render: Intro
		},
		{
			id: "glossario",
			title: "2. Glossário de Termos & Siglas",
			icon: CircleQuestionMark,
			render: Glossario
		},
		{
			id: "hierarquia",
			title: "3. Hierarquia & Rastreabilidade",
			icon: Layers,
			render: Hierarquia
		},
		{
			id: "guia",
			title: "4. Jornada de Uso do Sistema",
			icon: Compass,
			render: Guia
		},
		{
			id: "exploracao_abas",
			title: "5. Guia Completo das Abas",
			icon: FileText,
			render: ExploraAbas
		},
		{
			id: "metodologias",
			title: "6. Metodologias Operacionais",
			icon: Sparkles,
			render: Metodologias
		},
		{
			id: "ferramentas",
			title: "7. Ferramentas de Mapeamento",
			icon: Wrench,
			render: Ferramentas
		},
		{
			id: "stakeholders",
			title: "8. Stakeholders & Personas",
			icon: Users,
			render: Stakeholders
		},
		{
			id: "abordagem",
			title: "9. Abordagem de Consultoria",
			icon: MessageCircle,
			render: Abordagem
		},
		{
			id: "resistencias",
			title: "10. Gestão de Resistências",
			icon: ShieldAlert,
			render: Resistencias
		},
		{
			id: "calculos",
			title: "11. Memória de Cálculo & KPIs",
			icon: Calculator,
			render: Calculos
		},
		{
			id: "insights",
			title: "12. Inovação & Visão Especialista",
			icon: Lightbulb,
			render: Insights
		}
	];
	const Current = SECTIONS.find((s) => s.id === active)?.render ?? Intro;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid grid-cols-[280px_minmax(0,1fr)] gap-6 items-start",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "sticky top-6 max-h-[calc(100vh-140px)] overflow-y-auto rounded-xl border border-neutral-200/80 bg-white p-3 shadow-sm dark:border-neutral-800 dark:bg-neutral-900 scrollbar-thin",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "px-3 pb-3 pt-1 border-b border-neutral-100 dark:border-neutral-800 mb-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[10px] font-bold uppercase tracking-widest text-vibra-700 dark:text-vibra-400",
						children: "Escritório de Transformação"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-[14px] font-bold text-vibra-850 dark:text-neutral-150",
						children: "Playbook de Melhoria Contínua"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "flex flex-col gap-1",
					children: SECTIONS.map((s) => {
						const Ic = s.icon;
						const isActive = s.id === active;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setActive(s.id),
							className: `flex items-center gap-2.5 rounded-lg px-3 py-2 text-left text-[12px] font-semibold transition-all duration-200 ${isActive ? "bg-vibra-700 text-white shadow-md shadow-vibra-700/10" : "text-neutral-600 hover:bg-neutral-50 hover:text-vibra-800 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white"}`,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ic, { className: `h-4 w-4 shrink-0 ${isActive ? "text-white" : "text-neutral-400"}` }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "truncate flex-1",
									children: s.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: `h-3.5 w-3.5 shrink-0 transition-transform ${isActive ? "opacity-100 translate-x-0.5" : "opacity-30"}` })
							]
						}, s.id);
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-800 px-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[10.5px] italic text-neutral-400 leading-normal",
						children: "Leitura consultiva obrigatória para analistas, gestores e facilitadores de processos."
					})
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
			className: "rounded-xl border border-neutral-200/80 bg-white p-7 shadow-sm dark:border-neutral-800 dark:bg-neutral-900 min-h-[600px] animate-fadeIn",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Current, {})
		})]
	});
}
function H1({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "border-b border-neutral-100 dark:border-neutral-800 pb-3 mb-5",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "text-[22px] font-extrabold text-vibra-850 dark:text-white tracking-tight leading-tight",
			children
		})
	});
}
function H2({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
		className: "mb-3 mt-6 border-l-[3.5px] border-vibra-700 pl-3 text-[14px] font-bold text-vibra-800 dark:text-neutral-200 uppercase tracking-wider",
		children
	});
}
function P({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-[12.5px] leading-relaxed text-neutral-600 dark:text-neutral-300 mb-4 font-medium",
		children
	});
}
function UL({ items }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "mt-2 list-none space-y-2 mb-4",
		children: items.map((item, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
			className: "flex items-start gap-2 text-[12.5px] text-neutral-600 dark:text-neutral-300 font-medium",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-vibra-600" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "flex-1",
				children: item
			})]
		}, idx))
	});
}
function Card({ title, children, tone = "vibra" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `mt-3 mb-4 rounded-xl border p-4 shadow-sm transition-all duration-200 hover:shadow-md ${{
			vibra: "border-vibra-100 bg-vibra-50/20 text-vibra-900 dark:border-vibra-900/30 dark:bg-vibra-950/20",
			orange: "border-orange-100 bg-orange-50/30 text-orange-950 dark:border-orange-950/30 dark:bg-orange-950/20",
			yellow: "border-amber-100 bg-amber-50/20 text-amber-950 dark:border-amber-950/30 dark:bg-amber-950/20",
			blue: "border-blue-100 bg-blue-50/20 text-blue-950 dark:border-blue-950/30 dark:bg-blue-950/20",
			green: "border-emerald-100 bg-emerald-50/20 text-emerald-950 dark:border-emerald-950/30 dark:bg-emerald-950/20"
		}[tone]}`,
		children: [title && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mb-2 text-[12.5px] font-bold uppercase tracking-wide text-vibra-800 dark:text-vibra-400",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-[12px] leading-relaxed font-medium",
			children
		})]
	});
}
function Tbl({ head, rows }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-3 mb-5 overflow-x-auto rounded-xl border border-neutral-100 bg-white dark:border-neutral-800 dark:bg-neutral-900 shadow-sm",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
			className: "w-full table-auto border-collapse text-[12px] text-left",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
				className: "bg-neutral-55 dark:bg-neutral-800 border-b border-neutral-100 dark:border-neutral-700",
				children: head.map((h, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
					className: "px-4 py-3 font-bold text-neutral-750 dark:text-neutral-250 uppercase tracking-wider text-[11px]",
					children: h
				}, i))
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
				className: "divide-y divide-neutral-100 dark:divide-neutral-800",
				children: rows.map((row, rIdx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
					className: "hover:bg-neutral-50/50 dark:hover:bg-neutral-800/30 transition-colors",
					children: row.map((cell, cIdx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "px-4 py-2.5 align-top text-neutral-600 dark:text-neutral-300 font-medium leading-relaxed",
						children: cell
					}, cIdx))
				}, rIdx))
			})]
		})
	});
}
function Intro() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(H1, { children: "Introdução & Programa de Melhoria Contínua" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(P, { children: [
			"O ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Programa de Melhoria Contínua (MC)" }),
			" do Escritório de Transformação foi idealizado para estabelecer uma cultura de alta performance, simplificação de processos e maximização de resultados. Este Playbook consolida todas as técnicas de consultoria e documentação do sistema."
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(H2, { children: "A Filosofia por Trás" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(P, { children: [
			"Na nossa visão, mapear processos não é desenhar caixas e setas. É um diagnóstico clínico e uma ferramenta de intervenção cultural. Nosso objetivo final é",
			" ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "gerar valor real e mensurável" }),
			": aumento de produtividade, eficiência, redução de erros, mitigação de riscos, e melhora expressiva na experiência do cliente interno e externo."
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			title: "OS 4 PILARES DA TRANSFORMAÇÃO",
			tone: "vibra",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tbl, {
				head: [
					"Pilar",
					"Foco Estratégico",
					"Entrega de Valor"
				],
				rows: [
					[
						"1. Diagnóstico Clínico",
						"Compreensão aprofundada das dores, gargalos e custos operacionais da situação atual.",
						"Baseline quantitativo de tempo e custo."
					],
					[
						"2. Engajamento Ativo",
						"Envolvimento genuíno do time de ponta e quebra de resistências através da co-criação.",
						"Sustentação da mudança cultural."
					],
					[
						"3. Implantação Ágil",
						"Execução disciplinada com entregas parciais de melhorias rápidas (Quick Wins).",
						"Aceleração do retorno do investimento."
					],
					[
						"4. Sustentação Robusta",
						"Padronização por meio de POPs e medição constante dos indicadores-chave.",
						"Prevenção contra o retrocesso operacional."
					]
				]
			})
		})
	] });
}
function Glossario() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(H1, { children: "Glossário de Termos & Siglas" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "Use esta lista abrangente de termos e siglas para uniformizar a linguagem técnica entre analistas, facilitadores, liderança executiva e clientes internos. Esta documentação estabelece o vocabulário oficial do nosso Escritório de Transformação." }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(H2, { children: "Siglas de Produtividade, Finanças & Governança" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tbl, {
			head: [
				"Sigla",
				"Nome Completo",
				"Definição Técnica e Contextual no Sistema"
			],
			rows: [
				[
					"MC³",
					"Melhoria Contínua Cognitiva e Conectada",
					"Framework de vanguarda que une o mapeamento ágil de processos, a modelagem de fluxo de valor (VSM) e a automação de baixo código para criar fluxos enxutos de alta performance."
				],
				[
					"FTE",
					"Full-Time Equivalent (Equivalente em Tempo Integral)",
					"Unidade métrica que padroniza o esforço de trabalho. 1,0 FTE equivale à carga horária de uma pessoa trabalhando em período integral (adotamos 176 horas produtivas por mês no sistema)."
				],
				[
					"HC",
					"Headcount (Contagem de Cabeças)",
					"Número real absoluto de pessoas físicas vinculadas a um determinado departamento ou processo, independente de sua jornada horária."
				],
				[
					"SLA",
					"Service Level Agreement (Acordo de Nível de Serviço)",
					"Compromisso formal que define o prazo limite ou nível de qualidade aceitável para a entrega de uma etapa ou serviço ao cliente final ou área parceira."
				],
				[
					"ROI",
					"Return on Investment (Retorno sobre Investimento)",
					"Métrica de saúde financeira que calcula o rendimento obtido em relação ao capital investido na implantação da melhoria (ex: custo de licenças de RPA ou desenvolvimento de sistemas)."
				],
				[
					"VSM",
					"Value Stream Mapping (Mapeamento do Fluxo de Valor)",
					"Técnica Lean para visualizar e analisar todos os fluxos de materiais, informações e processos ponta a ponta de uma família de produtos/serviços."
				],
				[
					"SIPOC",
					"Suppliers, Inputs, Process, Outputs, Customers",
					"Diagrama estruturado que delimita as fronteiras e escopo de um processo: Fornecedores (S), Entradas (I), Atividades de Alto Nível (P), Saídas (O) e Clientes (C)."
				],
				[
					"DMAIC",
					"Define, Measure, Analyze, Improve, Control",
					"Método disciplinado do Lean Six Sigma com cinco fases sequenciais, focado em estabilização de processos e eliminação de variação/defeitos."
				],
				[
					"PDCA",
					"Plan, Do, Check, Act",
					"Método interativo de gestão em quatro passos, voltado para o controle e melhoria contínua de processos e produtos."
				],
				[
					"POP",
					"Procedimento Operacional Padrão",
					"Instrução de trabalho escrita e ilustrada que detalha a única e melhor forma atualizada de executar uma operação, garantindo constância de entrega."
				],
				[
					"VMO",
					"Value Management Office (Escritório de Gestão de Valor)",
					"Equipe e estrutura responsável por quantificar, rastrear, auditar e validar a captura de ganhos (saving) prometidos nas fases de projeto."
				],
				[
					"RPA",
					"Robotic Process Automation (Automação de Processos por Robôs)",
					"Tecnologia de software que imita ações humanas em computadores para automatizar tarefas repetitivas baseadas em regras."
				],
				[
					"ICE",
					"Impact, Confidence, Ease (Impacto, Confiança, Facilidade)",
					"Metodologia de priorização que auxilia na classificação matemática de ideias ou contramedidas de melhoria."
				],
				[
					"CAPEX",
					"Capital Expenditure (Investimento em Bens de Capital)",
					"Montante de recursos financeiros despendido para aquisição de infraestrutura, licenças permanentes ou ativos de longo prazo."
				],
				[
					"OPEX",
					"Operational Expenditure (Despesas Operacionais)",
					"Custo contínuo para manter um sistema, processo ou departamento funcionando no dia a dia (ex: salários do time de operação)."
				],
				[
					"VOC",
					"Voice of the Customer (Voz do Cliente)",
					"Processo de captura de necessidades, feedbacks e expectativas explícitas e implícitas do cliente final em relação ao serviço prestado."
				],
				[
					"KPI",
					"Key Performance Indicator (Indicador-Chave de Desempenho)",
					"Métrica quantificável que reflete os fatores críticos de sucesso da organização ou de um processo específico."
				]
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(H2, { children: "Glossário de Termos de Melhoria Contínua" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tbl, {
			head: [
				"Termo Técnico",
				"Foco Operacional",
				"Descrição e Aplicação Prática"
			],
			rows: [
				[
					"Lead Time",
					"Velocidade do Processo",
					"Tempo total decorrido desde o gatilho inicial (pedido do cliente) até a entrega final efetiva. Inclui tempos de execução e tempos de espera."
				],
				[
					"Cycle Time (Tempo de Ciclo)",
					"Velocidade do Passo",
					"Tempo em que um executor realmente trabalha na atividade para concluir uma única unidade de entrega."
				],
				[
					"Takt Time",
					"Ritmo de Atendimento",
					"O ritmo de produção necessário para atender perfeitamente à demanda do cliente. Calculado dividindo o tempo útil de trabalho disponível pela demanda."
				],
				[
					"Gargalo (Bottleneck)",
					"Capacidade Restrita",
					"A etapa do processo que possui menor capacidade de processamento por hora, limitando a produtividade de toda a cadeia ponta a ponta."
				],
				[
					"Contramedida",
					"Eliminação de Causa",
					"Ação corretiva implantada para neutralizar uma causa-raiz identificada, impedindo a recorrência de um problema operacional."
				],
				[
					"Quick Win (Ganho Rápido)",
					"Aceleração de Resultados",
					"Ideia de melhoria de altíssimo impacto que pode ser implantada rapidamente com baixíssimo custo ou esforço (priorizada na Matriz Esforço x Impacto)."
				],
				[
					"Gemba",
					"Observação no Local Real",
					"Palavra japonesa que significa 'o local real onde o valor é gerado'. Na prática, significa sair da sala de reunião e ir à pista do posto ou à mesa do analista para ver o trabalho acontecer."
				],
				[
					"Kaizen",
					"Melhoria Incremental",
					"Conceito que visa a melhoria contínua e gradual em todos os aspectos da vida profissional e pessoal, com foco em eliminar desperdícios diariamente."
				],
				[
					"Andon",
					"Gestão Visual de Alertas",
					"Dispositivo ou sistema visual (como a aba Pedido de Ajuda) que sinaliza imediatamente uma falha ou anomalia no processo, permitindo ação imediata."
				],
				[
					"Jidoka",
					"Autonomação",
					"Capacidade de dotar as máquinas e sistemas de inteligência para detectar desvios e parar o fluxo automaticamente quando um erro for encontrado, evitando a propagação do defeito."
				],
				[
					"AS-IS (Estado Atual)",
					"Situação de Partida",
					"O mapeamento fiel e honesto do processo exatamente como ele ocorre hoje, incluindo retrabalhos, erros, esperas e gambiarras operacionais."
				],
				[
					"TO-BE (Estado Futuro)",
					"Cenário Alvo",
					"O desenho otimizado do processo idealizado livre de desperdícios, com aplicação de automações cognitivas e simplificação de fluxos."
				]
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(H2, { children: "Diferenciações Críticas para o Mapeador" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 md:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				tone: "blue",
				title: "HC (Headcount) vs. FTE (Full-Time Equivalent)",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(P, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "HC" }),
					" é o número total de pessoas físicas no time. ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "FTE" }),
					" ",
					"mede a capacidade produtiva em horas. Se uma atividade consome 88 horas mensais de trabalho, ela consome exatamente ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "0,5 FTE" }),
					", independentemente de ser executada por uma única pessoa em tempo parcial ou dividida entre cinco pessoas. O FTE normaliza a métrica de capacidade humana."
				] })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				tone: "green",
				title: "Lead Time vs. Cycle Time",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(P, { children: [
					"O ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Cycle Time" }),
					" é o tempo gasto de fato executando a tarefa (ex: 5 minutos digitando um formulário). O ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Lead Time" }),
					" engloba toda a jornada do processo, incluindo as filas de espera (ex: o formulário levou 3 dias na caixa de entrada até ser aberto). Melhorias Lean focam prioritariamente na redução dos tempos de fila que inflam o Lead Time."
				] })
			})]
		})
	] });
}
function Hierarquia() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(H1, { children: "Hierarquia & Rastreabilidade do Sistema" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "O sistema de melhoria contínua opera sob uma rigorosa árvore de agregação, herança e subordinação de dados. Isso garante que cada tarefa diária esteja diretamente alinhada à estratégia corporativa geral e aos programas de eficiência de nível VP." }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(H2, { children: "A Árvore Estrutural e de Escopo" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-3 my-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3 p-3 rounded-lg border border-neutral-150 bg-neutral-55 dark:border-neutral-800 dark:bg-neutral-850",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "flex h-7 w-7 items-center justify-center rounded-full bg-emerald-800 text-[11px] font-bold text-white shrink-0",
						children: "1"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[12.5px] font-bold text-emerald-850 dark:text-emerald-150",
						children: "Projetos (Macroprojetos / Programas)"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] text-neutral-500",
						children: "Nível macro que agrupa as iniciativas. Define os grandes programas de transformação de eficiência operacional ou logística (ex: Eficiência em Refino, Transformação Digital de Processos)."
					})] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3 p-3 rounded-lg border border-neutral-150 bg-neutral-55 dark:border-neutral-800 dark:bg-neutral-850 ml-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "flex h-7 w-7 items-center justify-center rounded-full bg-vibra-800 text-[11px] font-bold text-white shrink-0",
						children: "2"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[12.5px] font-bold text-vibra-850 dark:text-neutral-150",
						children: "Iniciativas + Tarefas (atreladas às iniciativas)"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-[11px] text-neutral-500",
						children: [
							"A célula principal de atuação. Contém a análise de causa-raiz, matriz de desperdícios, dmaic e cronogramas. Possui ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Tarefas Diretas da Iniciativa" }),
							" focadas na governança do projeto, reuniões, comitês de facilitação e entregas de marcos estratégicos."
						]
					})] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3 p-3 rounded-lg border border-neutral-150 bg-neutral-55 dark:border-neutral-800 dark:bg-neutral-850 ml-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "flex h-7 w-7 items-center justify-center rounded-full bg-blue-800 text-[11px] font-bold text-white shrink-0",
						children: "3"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[12.5px] font-bold text-blue-850 dark:text-blue-150",
						children: "Microprocessos + Tarefas (atreladas aos microprocessos)"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-[11px] text-neutral-500",
						children: [
							"Mapeamento granular sequencial de passos executados no dia a dia. Vinculados diretamente à Iniciativa principal. Possui ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Tarefas de Microprocesso" }),
							" ",
							"que detalham os passos reais mapeados nos estados AS-IS e TO-BE (ex: conferir documentos, realizar lançamento no ERP, obter assinatura física)."
						]
					})] })]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(H2, { children: "Rastreabilidade e Propagação Matemática de Dados" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "Como o sistema aglutina e consolida as informações das bases? Entenda as regras rígidas de propagação de dados de baixo para cima:" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tbl, {
			head: [
				"Nível de Origem",
				"Dados e Entradas Coletadas",
				"Mecanismo de Propagação",
				"Resultado e Consolidação"
			],
			rows: [
				[
					"Tarefas de Microprocessos",
					"Tempo de ciclo (minutos), volume mensal de repetições, sistemas utilizados, se há dupla digitação ou digitação manual.",
					"Multiplica tempo e volume mensais individuais para obter o total de horas mensais. Divide-se por 176 para consolidar em FTEs ativos do microprocesso.",
					"Baseline quantitativo de tempo, custo e carga de trabalho por microprocesso mapeado."
				],
				[
					"Tarefas de Iniciativas",
					"Atividades do cronograma (Kick-off, Mapeamento AS-IS concluído, Homologação de RPA, Auditoria Lean), prazos, percentual físico de avanço.",
					"O progresso físico de cada tarefa direta atualiza de forma ponderada o percentual de avanço geral da Iniciativa principal.",
					"Progresso consolidado exibido dinamicamente no portfólio executivo e no painel Kanban de acompanhamento."
				],
				[
					"Iniciativas",
					"Somatório de horas recuperadas, savings mensais e anuais calculados, payback de implantação, notas de impacto (ICE).",
					"Agrega o valor total de saving, ROI médio de soluções e horas poupadas agrupando os dados por Projeto Macro de vinculação.",
					"Executive Vision Dashboard (Gráficos de Pareto, Carga Horária Liberada e Portfólio Geral)."
				],
				[
					"Projetos Macros",
					"Soma geral de saving previsto versus realizado, total de iniciativas em andamento, concluídas ou suspensas.",
					"Filtro interativo tridimensional de governança por diretoria, VP e gerência operacional.",
					"Visão corporativa de eficiência operacional unificada para reportes de diretoria."
				]
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			tone: "orange",
			title: "PRINCÍPIO DE INTEGRIDADE DE REGISTRO",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(P, { children: [
				"Para garantir relatórios de auditoria íntegos no GCP, toda iniciativa",
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "precisa" }),
				" estar vinculada a um Projeto Macro ativo. Caso contrário, as variáveis econômicas de FTE e ROI ficarão órfãs e não aparecerão na consolidação geral dos painéis executivos."
			] })
		})
	] });
}
function Guia() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(H1, { children: "Jornada de Uso do Sistema" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "O fluxo ideal de condução de um projeto de melhoria contínua segue este roteiro sequencial, garantindo que nenhuma etapa fundamental seja esquecida." }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(H2, { children: "Fases da Jornada Operacional" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 md:grid-cols-2 my-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-4 border border-neutral-100 rounded-xl bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-850",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 mb-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "flex h-6 w-6 items-center justify-center rounded-full bg-vibra-800 text-[11px] font-bold text-white",
							children: "1"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
							className: "font-bold text-[13px] text-vibra-800 dark:text-neutral-100",
							children: "Setup Inicial & Cadastro"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-[11.5px] text-neutral-600 dark:text-neutral-450 leading-relaxed",
						children: [
							"Abra a Iniciativa no ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Módulo Executivo" }),
							" informando nome, sponsor, líder e descrição. Garanta que o macroprocesso correspondente esteja selecionado."
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-4 border border-neutral-100 rounded-xl bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-850",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 mb-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "flex h-6 w-6 items-center justify-center rounded-full bg-vibra-800 text-[11px] font-bold text-white",
							children: "2"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
							className: "font-bold text-[13px] text-vibra-800 dark:text-neutral-100",
							children: "Mapeamento Clínico"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-[11.5px] text-neutral-600 dark:text-neutral-450 leading-relaxed",
						children: [
							"Na aba ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Análise" }),
							", documente o SIPOC e levante detalhadamente as etapas do processo atual (AS IS). Registre o tempo unitário de cada executor para o cálculo automático do baseline."
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-4 border border-neutral-100 rounded-xl bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-850",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 mb-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "flex h-6 w-6 items-center justify-center rounded-full bg-vibra-800 text-[11px] font-bold text-white",
							children: "3"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
							className: "font-bold text-[13px] text-vibra-800 dark:text-neutral-100",
							children: "Identificação de Causas"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-[11.5px] text-neutral-600 dark:text-neutral-450 leading-relaxed",
						children: [
							"Vá para a aba ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Metodologias" }),
							" e aplique os 5 Porquês e o Diagrama de Ishikawa. Classifique cada causa e estruture as contramedidas."
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-4 border border-neutral-100 rounded-xl bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-850",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 mb-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "flex h-6 w-6 items-center justify-center rounded-full bg-vibra-800 text-[11px] font-bold text-white",
							children: "4"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
							className: "font-bold text-[13px] text-vibra-800 dark:text-neutral-100",
							children: "Priorização & Futuro"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-[11.5px] text-neutral-600 dark:text-neutral-450 leading-relaxed",
						children: [
							"Insira as contramedidas na ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Matriz Esforço x Impacto" }),
							". Mapeie o estado futuro (TO BE) e compare em tempo real a redução de carga de trabalho e complexidade."
						]
					})]
				})
			]
		})
	] });
}
function ExploraAbas() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(H1, { children: "Guia Completo de Abas do Mapeamento" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "Entenda o propósito, as funcionalidades disponíveis e o valor metodológico de cada uma das abas que compõem o módulo de Mapeamento do sistema:" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(H2, { children: "1. Formulário de Iniciativa" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UL, { items: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Propósito:" }), " Ficha cadastral e de escopo geral do projeto de melhoria contínua."] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Funcionalidades:" }), " Edição de título, objetivos estratégicos, metas, datas marcos, seleção de sponsors, co-líderes e identificação de diretoria/área impactada."] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Valor Metodológico:" }), " Estabelece o termo de abertura (Project Charter) oficial, formalizando o escopo e garantindo patrocínio executivo."] })
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(H2, { children: "2. Postos Petrobras" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UL, { items: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Propósito:" }), " Cadastro e análise visual focados na rede de distribuição e postos."] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Funcionalidades:" }), " Upload de fotos do posto, detalhamento operacional de melhorias em pista, checklists locais e localização geográfica."] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Valor Metodológico:" }), " Conecta a melhoria corporativa diretamente com as operações do ponto de venda no Gemba."] })
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(H2, { children: "3. Análise (SIPOC, AS IS, TO BE, Comparativo)" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UL, { items: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Propósito:" }), " Coração analítico da ferramenta. Diagnóstico minucioso e de desenlace operacional."] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Subtab SIPOC:" }), " Alinha as fronteiras do projeto (Fornecedores, Entradas, Atividades, Saídas e Clientes) antes de se aprofundar."] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Subtab AS IS:" }), " Mapeamento do cenário de trabalho atual com tempos em minutos, executores, freqüência e cálculo automatizado de FTE consumido."] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Subtab TO BE:" }), " Modelagem ideal eliminando desperdícios, estimando redução de passos operacionais e automações cognitivas."] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Subtab AS IS x TO BE:" }), " Painel comparativo analítico consolidando o ganho de produtividade em horas e a economia financeira."] })
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(H2, { children: "4. Metodologias (Causa Raiz, Lean, Kaizen, DMAIC, Matriz)" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UL, { items: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Subtab Causa Raiz:" }), " Ishikawa (Espinha de peixe) e 5 Porquês para descobrir as origens reais dos problemas em vez de remediar sintomas."] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Subtab Lean:" }), " Detalhamento dos 8 desperdícios clássicos (superprodução, espera, transporte, processamento excessivo, estoque, movimentação, defeitos, intelectual)."] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Subtab Kaizen:" }), " Controle de planos de melhoria rápida e ciclos de Kaizen diários ou semanais."] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Subtab DMAIC:" }), " Checklist disciplinado de avanço metodológico do projeto nas etapas Define, Measure, Analyze, Improve, Control."] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Subtab Matriz:" }), " Posicionamento gráfico de ideias de solução no quadrante Esforço × Impacto para rápida priorização (Quick Wins)."] })
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(H2, { children: "5. Resultados (Evolução, Top 15, Status Estratégico)" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UL, { items: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Propósito:" }), " Prestação de contas e governança executiva dos ganhos."] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Funcionalidades:" }), " Gráficos de evolução financeira acumulada de ganhos, ranking Top 15 de iniciativas mais lucrativas e semáforo de status estratégico."] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Valor Metodológico:" }), " Transforma esforço de engenharia em métricas claras de negócio para reporte ao conselho executivo."] })
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(H2, { children: "6. Mural de Imagens" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UL, { items: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Propósito:" }), " Registro visual histórico das transformações operacionais."] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Funcionalidades:" }), " Galeria dinâmica de fotos tiradas no Gemba com tags contextuais (ex: Antes / Depois) e notas explicativas."] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Valor Metodológico:" }), " Evidência concreta de melhorias (ex: 5S, ergonomia, layout fabril), impulsionando a motivação coletiva."] })
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(H2, { children: "7. Governança (Riscos, Cronograma, Controle & Sustentação)" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UL, { items: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Subtab Riscos:" }), " Matriz de risco qualitativo (Probabilidade × Impacto) para prever impedimentos."] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Subtab Cronograma:" }), " Gestão de marcos do projeto, datas planejadas vs. realizadas com indicadores visuais de desvios."] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Subtab Controle & Sustentação:" }), " Plano formal de controle pós-implantação (responsável pela métrica, frequência, limites de controle e gatilho de atuação)."] })
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(H2, { children: "8. Ferramentas (Fluxo, Playbook, Calculadora, Checklist)" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UL, { items: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Subtab Fluxo:" }), " Visualizador de processos e modelagem conceitual sequencial rápida."] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Subtab Playbook:" }), " Esta biblioteca consultiva integrada de conhecimentos."] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Subtab Calculadora:" }), " Simulador de ROI e viabilidade econômica para novas ideias de projeto."] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Subtab Checklist de Mapeamento:" }), " Roteiro interativo de auditoria interna para validar a integridade de um mapeamento de processo."] })
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(H2, { children: "9. BPMN" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UL, { items: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Propósito:" }), " Modelagem de processos de alta precisão em notação BPMN padrão."] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Funcionalidades:" }), " Desenho de raias, piscinas, eventos de início/fim, gateways decisórios, envio e recepção de mensagens."] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Valor Metodológico:" }), " Padroniza a documentação técnica do TO BE para entrega direta à equipe de engenharia e TI para automação."] })
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(H2, { children: "10. Agenda" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UL, { items: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Propósito:" }), " Calendário integrado de facilitação e rituais operacionais."] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Funcionalidades:" }), " Agendamento de reuniões de Kick-off, alinhamentos diários, comitês de governança e workshops de co-criação."] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Valor Metodológico:" }), " Ritmo de governança ativa, essencial para evitar a estagnação de projetos longos."] })
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(H2, { children: "11. Pedido de Ajuda" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UL, { items: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Propósito:" }), " Canal oficial de escalonamento para superação de gargalos."] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Funcionalidades:" }), " Envio imediato de chamados de suporte ao Escritório de Transformação em caso de barreiras políticas, metodológicas ou técnicas."] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Valor Metodológico:" }), " Segurança operacional para o consultor, que sabe onde recorrer para destravar impedimentos."] })
		] })
	] });
}
function Metodologias() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(H1, { children: "Metodologias Operacionais" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "A Melhoria Contínua utiliza múltiplos caminhos científicos para solucionar problemas de negócios. Escolha a abordagem correta de acordo com o desafio:" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tbl, {
			head: [
				"Metodologia",
				"Foco Operacional",
				"Sintoma que Ataca",
				"Exemplo de Aplicação"
			],
			rows: [
				[
					"Lean Manufacturing / Service",
					"Combate implacável de desperdícios e atrito operacional.",
					"Lentidão, muitas aprovações, planilhas paralelas, esperas.",
					"Redução de lead-time de faturamento de 5 para 2 dias."
				],
				[
					"Six Sigma (DMAIC)",
					"Redução radical de erros, defeitos e variabilidade de processo.",
					"Erros recorrentes, falhas sistêmicas, divergência de caixa.",
					"Zerar quebra de regras fiscais no faturamento."
				],
				[
					"Design Thinking",
					"Inovação centrada no ser humano através da empatia.",
					"Desengajamento do usuário, sistemas difíceis, alta insatisfação.",
					"Reestruturação do portal do cliente para autoatendimento."
				],
				[
					"BPM (Business Process Management)",
					"Arquitetura ponta a ponta e integração entre sistemas.",
					"Silos departamentais, falta de clareza de atribuições.",
					"Padronização da jornada de onboarding de novos colaboradores."
				]
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(H2, { children: "DMAIC: O Ciclo Científico" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			tone: "vibra",
			title: "Roteiro Disciplinado de Resolução",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UL, { items: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Define (D):" }), " Qual é o problema real? Qual o tamanho da perda financeira? Quem compõe o time?"] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Measure (M):" }), " Qual o baseline? Como medimos esse processo hoje? Qual a qualidade real do dado?"] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Analyze (A):" }), " Onde estão as causas-raiz? Por que os erros acontecem? (Ishikawa + 5 Porquês)."] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Improve (I):" }), " Ideação e teste controlado da solução (Teste Piloto / Plano de Ação 5W2H)."] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Control (C):" }), " Como garantir a estabilidade? Treinamentos, POPs e painéis visuais de monitoramento."] })
			] })
		})
	] });
}
function Ferramentas() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(H1, { children: "Ferramentas de Mapeamento Clínico" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "Conheça as principais ferramentas analíticas integradas no sistema e as diretrizes recomendadas para preenchimento:" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(H2, { children: "1. SIPOC (Escopo do Processo)" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "Antes de detalhar o processo atual, alinhe o escopo macro do projeto preenchendo estas 5 colunas fundamentais:" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UL, { items: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Suppliers (Fornecedores):" }), " Quem fornece a matéria-prima ou informação? (Ex: Área Comercial)."] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Inputs (Entradas):" }), " O que é fornecido? (Ex: Proposta de Venda, CPF do Cliente)."] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Process (Atividades):" }), " Quais são os 4 a 6 passos principais do processo?"] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Outputs (Saídas):" }), " O que é produzido de fato ao final? (Ex: Pedido aprovado, Nota Fiscal emitida)."] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Customers (Clientes):" }), " Quem consome a entrega final? (Ex: Logística, Cliente final)."] })
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(H2, { children: "2. Ishikawa (Diagrama 6M)" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "Ideal para sessões de brainstorming de causa-raiz. Agrupe as potenciais hipóteses nas 6 dimensões clássicas:" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tbl, {
			head: [
				"Dimensão",
				"Pergunta de Investigação",
				"Exemplo Comum"
			],
			rows: [
				[
					"Método",
					"Há falta de padronização, regras ambíguas ou burocracia excessiva?",
					"Cada analista aprova pedidos de um jeito diferente."
				],
				[
					"Máquina",
					"Os sistemas apresentam instabilidades, lentidão ou falta de recursos?",
					"O ERP fica lento nos horários de fechamento."
				],
				[
					"Mão de Obra",
					"Há falta de treinamento, pressões por produtividade ou erros manuais?",
					"A equipe nova não recebeu treinamento sobre as regras fiscais."
				],
				[
					"Material",
					"Os insumos ou informações de entrada possuem baixa qualidade ou erros?",
					"Cadastro do cliente veio incompleto ou ilegível."
				],
				[
					"Medida",
					"Faltam indicadores de qualidade de dados ou metas mal dimensionadas?",
					"Não medimos o tempo de retrabalho do analista."
				],
				[
					"Meio Ambiente",
					"O espaço de trabalho físico ou virtual provoca dispersão e desconforto?",
					"Excesso de notificações ou barulho prejudicando o foco."
				]
			]
		})
	] });
}
function Stakeholders() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(H1, { children: "Stakeholders & Personas" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "Mapear as pessoas influenciadas ou patrocinadoras de seu projeto é tão crítico quanto mapear as atividades operacionais. Use este guia de perfis típicos:" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(H2, { children: "Matriz de Personas no Projeto de MC" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tbl, {
			head: [
				"Perfil",
				"Foco Primário",
				"Principais Dores",
				"Estratégia de Engajamento"
			],
			rows: [
				[
					"Sponsor (Diretor/VP)",
					"ROI financeiro, metas estratégicas, ganho de eficiência.",
					"Lentidão de entregas, falta de dados para decisão estruturada.",
					"Reportes extremamente executivos (1 slide), foco total em ROI e payback."
				],
				[
					"Process Owner (Gerente)",
					"Estabilidade do setor, cumprimento de SLAs operacionais.",
					"Equipe sobrecarregada, gargalos constantes, reclamações de clientes.",
					"Demonstrar que o projeto liberará FTE produtivo para absorver novas demandas sem contratação."
				],
				[
					"Analista Operacional",
					"Executar as tarefas do dia a dia com menos estresse.",
					"Sistemas ruins, retrabalho, processos burocráticos, planilhas paralelas.",
					"Focar na melhoria da ergonomia mental: eliminação de cliques desnecessários e tarefas mecânicas."
				]
			]
		})
	] });
}
function Abordagem() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(H1, { children: "Abordagem de Consultoria Operacional & Facilitação" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "A postura de um especialista do Escritório de Transformação é o fator de sucesso primordial no mapeamento de processos. Devemos agir como parceiros estratégicos e consultores clínicos, focando na empatia operacional e no respeito ao time de ponta." }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(H2, { children: "1. Estratégia de Abordagem Sutil (Construção de Rapport)" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "Quando um consultor de melhoria chega a um departamento, os colaboradores geralmente sentem receio (medo de auditoria, de punição ou de cortes). É vital desarmar esses gatilhos defensivos de forma sutil e sincera nas primeiras conversas:" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			tone: "blue",
			title: "O DISCURSO DE ENTRADA (Mudar a Percepção)",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(P, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Abordagem Amadora:" }),
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "“Oi, sou da Transformação e estou aqui para cronometrar seu trabalho e otimizar seu processo.”" }),
				" ",
				"(Gera rejeição imediata e respostas defensivas).",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Abordagem Consultiva (Recomendada):" }),
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "“Olá! Estou aqui para entender os atritos sistêmicos e as dores que sobrecarregam o seu dia a dia. Meu objetivo é mapear o que consome seu tempo em cliques repetitivos, planilhas paralelas e esperas burocráticas, para que possamos defender investimentos em sistemas ou robôs para automatizar essas tarefas repetitivas. Você é o especialista no que faz e o protagonista desta melhoria.”" })
			] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(H2, { children: "2. Perguntas Estratégicas para Entrevistas de Processo" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "Em vez de apenas solicitar uma descrição linear básica do fluxo, use perguntas estratégicas que revelam gargalos profundos, complexidades cognitivas e desvios ocultos:" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-4 my-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-4 border border-neutral-100 rounded-lg bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-850",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[12.5px] font-bold text-vibra-800 dark:text-neutral-200",
						children: "🔍 Investigando Atritos & Dores Reais (Ergonomia Mental)"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UL, { items: [
						"“Se você pudesse apertar um botão mágico e eliminar a atividade mais chata ou repetitiva do seu dia hoje, qual seria?”",
						"“Em qual etapa você precisa fazer dupla ou tripla checagem manual para garantir que não ocorram erros graves? Por que esse passo é tão propenso ao erro?”",
						"“Quais planilhas ou arquivos locais você mantém como 'segurança' paralela para gerir o setor hoje?”"
					] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-4 border border-neutral-100 rounded-lg bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-850",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[12.5px] font-bold text-vibra-800 dark:text-neutral-200",
						children: "⌛ Investigando Esperas, Filas & Gargalos"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UL, { items: [
						"“Onde vocês costumam perder mais tempo esperando a resposta, liberação ou aprovação de outras gerências/diretorias?”",
						"“Quando ocorre um pico de demanda (ex: fechamento mensal), em qual etapa o trabalho fica acumulado em fila de espera?”",
						"“O que acontece no processo se o executor chave desse setor ficar doente ou tirar férias repentinas?”"
					] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-4 border border-neutral-100 rounded-lg bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-850",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[12.5px] font-bold text-vibra-800 dark:text-neutral-200",
						children: "🌐 Investigando Interfaces, Exceções & SLA"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UL, { items: [
						"“Com qual frequência os inputs que você recebe (de outras áreas ou do cliente) vêm com erros, dados incompletos ou rasuras? O que você faz quando isso ocorre?”",
						"“Quantos sistemas diferentes você precisa manter abertos simultaneamente e copiar e colar informações entre eles para processar uma única solicitação?”",
						"“Qual percentual aproximado de casos desvia do fluxo idealizado normal e exige caminhos alternativos ou contatos telefônicos diretos para resolver?”"
					] })]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(H2, { children: "3. Roteiro Prático para Condução do Workshop" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "Para dinâmicas de mapeamento colaborativo (Kaizen ou VSM), siga esta sequência de facilitação para maximizar o engajamento:" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UL, { items: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Passo 1: Empatia e Contexto (15 min):" }), " Explique o propósito do projeto, apresente o Sponsor e estabeleça que o time de ponta tem o poder de decisão sobre as melhorias."] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Passo 2: Mapear o AS-IS sem Censura (45 min):" }), " Registre a realidade nua e crua exatamente como ela funciona hoje. Estimule o time a falar sobre as dificuldades. Colete os volumes reais e tempos de ciclo."] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Passo 3: Identificar Desperdícios (30 min):" }), " Aplique a matriz dos 8 desperdícios Lean. Classifique os tempos em que o processo agrega valor (VA) versus não agrega valor (NVA)."] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Passo 4: Co-criar o TO-BE (45 min):" }), " Remova gargalos, idealize caminhos diretos, desenhe automações em raias claras e valide as contramedidas propostas de forma unânime."] })
		] })
	] });
}
function Resistencias() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(H1, { children: "Gestão de Resistências em Ambientes Difíceis" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "Processos de melhoria contínua alteram a zona de conforto das equipes, o que invariavelmente gera resistências. Use estas técnicas verbais para desarmar conflitos:" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(H2, { children: "Desarmando Objeções Clássicas" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tbl, {
			head: [
				"Objeção Comum",
				"Medo Oculto",
				"Como Responder de Forma Construtiva"
			],
			rows: [
				[
					"“Isso não funciona na nossa área. Nosso trabalho é complexo demais.”",
					"Medo de simplificação forçada ou perda de status de importância.",
					"“Concordo que seu trabalho é altamente especializado. Justamente por isso, queremos automatizar as partes repetitivas para que você foque na parte nobre.”"
				],
				[
					"“Sempre fizemos assim e deu certo há 10 anos.”",
					"Apego à rotina e medo de novas tecnologias.",
					"“O processo nos trouxe com sucesso até aqui. Agora, precisamos de novas formas de trabalhar para suportar o crescimento acelerado da empresa.”"
				],
				[
					"“Estou sem tempo para participar de reuniões de mapeamento.”",
					"Equipe genuinamente sobrecarregada.",
					"“Entendo perfeitamente o aperto. O mapeamento é o remédio: vamos investir 1 hora hoje para recuperar 20 horas mensais para você nas próximas semanas.”"
				]
			]
		})
	] });
}
function Calculos() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(H1, { children: "Dicionário de Fórmulas Matemáticas & KPIs do Sistema" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "A credibilidade científica do Escritório de Transformação apoia-se na transparência e exatidão das métricas e coeficientes cadastrados. Abaixo, listamos todas as fórmulas matemáticas ativas no sistema, explicando seu propósito técnico e foco de atuação operacional." }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(H2, { children: "Catálogo Geral de Fórmulas de Engenharia de Processos" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tbl, {
			head: [
				"Nome da Fórmula",
				"Fórmula Matemática Utilizada",
				"Foco Operacional e de Negócio",
				"Propósito Prático"
			],
			rows: [
				[
					"1. FTE Consumido (Carga de Trabalho)",
					"FTE = (Tempo Unitário (min) × Volume Mensal) ÷ 60 ÷ 176",
					"Análise de Capacidade (Capacity Planning)",
					"Mede o esforço humano real exigido por um passo operacional em relação a uma jornada de 176 horas mensais regulamentares."
				],
				[
					"2. Custo Mensal do Passo",
					"Custo = FTE Consumido × Custo de 1 FTE",
					"Atribuição de Custo (Activity Based Costing)",
					"Traduz a carga horária em desperdício monetário direto para o OPEX do setor."
				],
				[
					"3. Redução de Tempo Unitário",
					"Ganho_Tempo = Tempo_AS_IS − Tempo_TO_BE",
					"Velocidade do Processo (Throughput)",
					"Demonstra de forma unitária a eficácia das otimizações estruturais."
				],
				[
					"4. Horas Mensais Liberadas",
					"Horas_Mensais = ((Tempo_AS_IS − Tempo_TO_BE) × Volume Mensal) ÷ 60",
					"Liberação de Carga de Trabalho",
					"Demonstra o somatório de horas de esforço repetitivo poupadas do time operacional a cada mês."
				],
				[
					"5. Ganhos de FTE (FTE Economizados)",
					"FTE_Liberado = Horas_Mensais_Liberadas ÷ 176",
					"Eficiência e Redistribuição",
					"Mede a fração exata de recursos humanos que foram libertados de tarefas repetitivas para assumir rotinas mais estratégicas (FTE Up)."
				],
				[
					"6. ROI de Projetos (Retorno Financeiro)",
					"ROI = ((Saving Anual Previsto − Custo Implantação) ÷ Custo Implantação) × 100",
					"Análise de Investimento (Business Case)",
					"Comprova em termos percentuais a rentabilidade das intervenções operacionais diante do investimento despendido (CAPEX)."
				],
				[
					"7. Payback (Prazo de Retorno do Investimento)",
					"Payback = Custo de Implantação ÷ (Saving Anual Previsto ÷ 12)",
					"Análise de Risco Financeiro",
					"Calcula o número de meses necessários para que os ganhos de produtividade amortizem integralmente os custos de implantação."
				],
				[
					"8. Score de Priorização ICE",
					"Score = ((Impacto_Negocio + Impacto_Cliente + Impacto_Financeiro) ÷ (Esforco_Implantacao + Complexidade_Tecnica)) × 10",
					"Governança de Portfólio",
					"Algoritmo dinâmico (valores de 1 a 100) que ranqueia de forma impessoal os projetos com maior retorno e menor complexidade."
				],
				[
					"9. Score de Potencial de Automação",
					"Potencial = ((Alternancia_Telas × 3) + (Digitacao_Manual × 4) + (Repetitividade × 3)) ÷ 10",
					"Triagem de Soluções de RPA",
					"Auxilia a equipe de desenvolvimento a classificar se o processo é ideal para robotização sistêmica baseada em regras."
				]
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(H2, { children: "Exemplo de Cálculo Padrão do Sistema" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			tone: "vibra",
			title: "PASSO A PASSO DA MATEMÁTICA DE FTE & ECONOMIA",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "Para cada atividade mapeada na aba Análise do Mapeamento:" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
					className: "list-decimal pl-5 text-[12px] space-y-1 mb-2 font-medium",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
							"Multiplica-se o ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Tempo Unitário" }),
							" (em minutos) pelo",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Volume Mensal" }),
							" daquela atividade para descobrir os minutos de esforço totais do mês."
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
							"Divide-se o resultado por ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "60 minutos" }),
							" para encontrar a quantidade de",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Horas Mensais" }),
							" consumidas."
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
							"Divide-se o total de Horas Mensais por ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "176 (horas equivalentes a 1 FTE)" }),
							" ",
							"para encontrar a equivalência exata de FTEs consumidos no AS-IS."
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
							"O mesmo cálculo é realizado no cenário projetado (TO-BE). A diferença do somatório de FTEs do AS-IS e do TO-BE representa o ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "FTE Liberado" }),
							"."
						] })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-neutral-900 text-green-400 font-mono p-2.5 rounded text-[11px] mt-2 border border-neutral-700",
					children: [
						"# Caso de Sucesso do Processo de Triagem Fiscal:",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						"Volume Mensal: 12.000 notas fiscais | Tempo Unitário AS-IS: 4 minutos",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						"Tempo Unitário TO-BE (com robô): 0,5 minutos | Custo Médio do Executor: R$ 35,00/hora",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						"- Horas Mensais AS-IS: (12.000 * 4) / 60 = 800 horas (4,54 FTE)",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						"- Horas Mensais TO-BE: (12.000 * 0,5) / 60 = 100 horas (0,56 FTE)",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						"- Horas Liberadas Mensalmente: 800 - 100 = 700 horas (Gain: 3,98 FTE)",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						"- Economia Financeira Anual: 700 horas * R$ 35,00/hora * 12 meses = R$ 294.000,00 anuais"
					]
				})
			]
		})
	] });
}
function Insights() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(H1, { children: "Inovação, Diferenciais & Visão de Especialista" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(P, { children: [
			"O Escritório de Transformação orgulha-se de usar o framework exclusivo",
			" ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "MC³ (Melhoria Contínua Cognitiva e Conectada)" }),
			"."
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(H2, { children: "1. O Conceito Cognitivo do MC³" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(P, { children: [
			"Projetos tradicionais de melhoria focam em movimentações físicas e digitação manual simples. O framework ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "MC³" }),
			" vai além: ele rastreia a carga cognitiva dos processos."
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UL, { items: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Diferencial Conectado:" }), " O sistema não trabalha isolado. Ele integra em tempo real as bases locais de persistência, promovendo agilidade nas atualizações."] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Foco em Tomada de Decisão:" }), " Analisa onde o executor perde tempo raciocinando sobre regras ambíguas e atua com inteligência artificial e regras claras para liberar processamento intelectual."] })] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(H2, { children: "2. Checklist de Qualidade do Mapeamento (O que NÃO fazer)" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tbl, {
			head: [
				"Prática Ruim",
				"Por que Evitar",
				"O que Fazer em Vez disso"
			],
			rows: [
				[
					"Mapear sem baseline quantitativo prévio.",
					"Sem números no AS IS, é impossível comprovar cientificamente que a melhoria gerou economia.",
					"Não avance para o TO BE sem registrar o tempo unitário e o volume na aba correspondente."
				],
				[
					"Desenhar fluxos TO BE inatingíveis.",
					"Gera frustração na equipe de TI, atrasa entregas e desacredita o programa.",
					"Crie um TO BE incremental, focando primeiro em automações simples com tecnologia disponível."
				],
				[
					"Ignorar o plano de sustentação.",
					"Em menos de 3 meses, o setor voltará aos velhos hábitos ineficientes devido à rotatividade e falta de supervisão.",
					"Sempre formalize o responsável pelo indicador de controle na aba Governança."
				]
			]
		})
	] });
}
var STATUS = [
	"Sustentado",
	"Atenção",
	"Desvio"
];
function ControleTab() {
	const qc = useQueryClient();
	const { projetoId } = useHierarchy();
	const { data: iniciativas = [] } = useQuery({
		queryKey: ["ctrl-ini", projetoId],
		queryFn: async () => {
			let q = supabase.from("iniciativas").select("id,codigo,titulo,saving_previsto,horas_gastas_mes,hc_estimado").is("deleted_at", null).eq("status", "Concluída");
			if (projetoId) q = q.eq("projeto_id", projetoId);
			return (await q).data ?? [];
		}
	});
	const { data: ctrl = [] } = useQuery({
		queryKey: ["ctrl-rows", iniciativas.map((i) => i.id).join(",")],
		enabled: iniciativas.length > 0,
		queryFn: async () => (await supabase.from("controle_sustentacao").select("*").in("iniciativa_id", iniciativas.map((i) => i.id)).is("deleted_at", null).order("data_referencia", { ascending: false })).data ?? []
	});
	const sustentadas = ctrl.filter((c) => c.status === "Sustentado").length;
	const atencao = ctrl.filter((c) => c.status === "Atenção").length;
	const desvio = ctrl.filter((c) => c.status === "Desvio").length;
	const ganhoF = ctrl.reduce((s, c) => s + Number(c.ganho_financeiro ?? 0), 0);
	const horas = ctrl.reduce((s, c) => s + Number(c.horas_economizadas ?? 0), 0);
	const fte = ctrl.reduce((s, c) => s + Number(c.fte_preservado ?? 0), 0);
	async function add(iniciativaId) {
		const { error } = await supabase.from("controle_sustentacao").insert({
			iniciativa_id: iniciativaId,
			data_referencia: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
			status: "Sustentado"
		});
		if (error) toast.error(error.message);
		else qc.invalidateQueries({ queryKey: ["ctrl-rows"] });
	}
	async function patch(id, p) {
		await supabase.from("controle_sustentacao").update(p).eq("id", id);
		qc.invalidateQueries({ queryKey: ["ctrl-rows"] });
	}
	async function remove(id) {
		await supabase.from("controle_sustentacao").update({ deleted_at: (/* @__PURE__ */ new Date()).toISOString() }).eq("id", id);
		qc.invalidateQueries({ queryKey: ["ctrl-rows"] });
	}
	const iniMap = new Map(iniciativas.map((i) => [i.id, i]));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 sm:grid-cols-3 lg:grid-cols-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						label: "Sustentadas",
						value: sustentadas,
						tone: "green"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						label: "Em Atenção",
						value: atencao,
						tone: "yellow"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						label: "Desvio",
						value: desvio,
						tone: "red"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						label: "Ganho Sustentado",
						value: ganhoF.toLocaleString("pt-BR", {
							style: "currency",
							currency: "BRL",
							minimumFractionDigits: 2,
							maximumFractionDigits: 2
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						label: "Horas Econ.",
						value: horas.toFixed(0),
						tone: "blue"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						label: "FTE Preservado",
						value: fte.toFixed(2)
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-[12px] font-semibold text-vibra-800",
					children: "Adicionar registro para:"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					className: inputCls + " max-w-xs",
					onChange: (e) => e.target.value && add(e.target.value),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "",
						children: "— escolha iniciativa concluída —"
					}), iniciativas.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
						value: i.id,
						children: [
							i.codigo ?? "",
							" ",
							i.titulo
						]
					}, i.id))]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-x-auto rounded-xl border border-border bg-card shadow-vibra-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "min-w-[1000px] w-full text-[12px]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
						className: "bg-vibra-50 text-[10.5px] uppercase tracking-wider text-vibra-800",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: [
							"Iniciativa",
							"Data Ref.",
							"Ganho R$",
							"Horas",
							"FTE",
							"Desvio",
							"Status",
							"Observações",
							""
						].map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-2 py-2 text-left",
							children: h
						}, h)) })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [ctrl.map((r) => {
						const ini = iniMap.get(r.iniciativa_id);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-t border-border",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: "px-2 py-1",
									children: [
										ini?.codigo ?? "",
										" ",
										ini?.titulo ?? "—"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-2 py-1 w-36",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "date",
										className: inputCls,
										defaultValue: r.data_referencia ?? "",
										onBlur: (e) => patch(r.id, { data_referencia: e.target.value })
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-2 py-1 w-28",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "number",
										className: inputCls,
										defaultValue: r.ganho_financeiro ?? 0,
										onBlur: (e) => patch(r.id, { ganho_financeiro: Number(e.target.value) })
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-2 py-1 w-20",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "number",
										className: inputCls,
										defaultValue: r.horas_economizadas ?? 0,
										onBlur: (e) => patch(r.id, { horas_economizadas: Number(e.target.value) })
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-2 py-1 w-20",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "number",
										step: "0.1",
										className: inputCls,
										defaultValue: r.fte_preservado ?? 0,
										onBlur: (e) => patch(r.id, { fte_preservado: Number(e.target.value) })
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-2 py-1 w-20",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "number",
										className: inputCls,
										defaultValue: r.desvio ?? 0,
										onBlur: (e) => patch(r.id, { desvio: Number(e.target.value) })
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-2 py-1",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										className: inputCls,
										defaultValue: r.status ?? "",
										onChange: (e) => patch(r.id, { status: e.target.value }),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "",
											children: "—"
										}), STATUS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: s }, s))]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-2 py-1",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										className: inputCls,
										defaultValue: r.observacoes ?? "",
										onBlur: (e) => patch(r.id, { observacoes: e.target.value })
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-2 py-1",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										className: btnDanger,
										onClick: () => remove(r.id),
										children: "🗑️"
									})
								})
							]
						}, r.id);
					}), ctrl.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						colSpan: 9,
						className: "px-3 py-8 text-center text-muted-foreground",
						children: "Nenhum registro de sustentação."
					}) })] })]
				})
			})
		]
	});
}
function MuralImagensTab() {
	const { projetoId } = useHierarchy();
	if (!projetoId) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col items-center justify-center p-12 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, { className: "h-12 w-12 text-slate-400 mb-4 animate-pulse" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "text-base font-bold text-slate-800",
				children: "Selecione um Projeto"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted-foreground max-w-sm mt-1",
				children: "Por favor, selecione um projeto no seletor do topo para gerenciar o mural de imagens estratégicas."
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MuralImagensInner, { projetoId });
}
function MuralImagensInner({ projetoId }) {
	const qc = useQueryClient();
	const fileInputRef = (0, import_react.useRef)(null);
	const [uploading, setUploading] = (0, import_react.useState)(false);
	const [selectedRatio, setSelectedRatio] = (0, import_react.useState)("16:9");
	const [legend, setLegend] = (0, import_react.useState)("");
	const [activeViewerImage, setActiveViewerImage] = (0, import_react.useState)(null);
	const { data: images = [], isLoading } = useQuery({
		queryKey: ["projeto_imagens", projetoId],
		queryFn: async () => {
			const { data, error } = await supabase.from("projeto_imagens").select("*").eq("projeto_id", projetoId).is("deleted_at", null).order("created_at", { ascending: true });
			if (error) {
				console.error(error);
				return [];
			}
			return data ?? [];
		}
	});
	const fileToDataURL = (file) => {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onloadend = () => resolve(reader.result);
			reader.onerror = reject;
			reader.readAsDataURL(file);
		});
	};
	const handleFileUpload = async (files) => {
		if (!files || files.length === 0) return;
		if (images.length >= 8) {
			toast.error("Limite máximo de 8 imagens estratégicas por projeto atingido!");
			return;
		}
		setUploading(true);
		try {
			const file = files[0];
			if (!file.type.startsWith("image/")) {
				toast.error("O arquivo selecionado não é uma imagem válida.");
				return;
			}
			if (file.size > 1.5 * 1024 * 1024) {
				toast.error("A imagem excede 1.5MB de tamanho. Por favor, utilize uma imagem mais leve ou otimizada.");
				return;
			}
			const dataUrl = await fileToDataURL(file);
			const { error } = await supabase.from("projeto_imagens").insert({
				projeto_id: projetoId,
				url: dataUrl,
				legenda: legend.trim() || file.name.split(".")[0],
				aspect_ratio: selectedRatio
			});
			if (error) toast.error("Erro ao salvar imagem: " + error.message);
			else {
				toast.success("Imagem enviada com sucesso!");
				setLegend("");
				qc.invalidateQueries({ queryKey: ["projeto_imagens", projetoId] });
			}
		} catch (e) {
			toast.error("Falha ao ler o arquivo: " + e.message);
		} finally {
			setUploading(false);
		}
	};
	const handleDragOver = (e) => {
		e.preventDefault();
	};
	const handleDrop = (e) => {
		e.preventDefault();
		handleFileUpload(e.dataTransfer.files);
	};
	const handleDeleteImage = async (id, e) => {
		e.stopPropagation();
		if (!confirm("Tem certeza que deseja remover esta imagem estratégica do mural?")) return;
		const { error } = await supabase.from("projeto_imagens").update({ deleted_at: (/* @__PURE__ */ new Date()).toISOString() }).eq("id", id);
		if (error) toast.error("Erro ao remover imagem: " + error.message);
		else {
			toast.success("Imagem removida com sucesso.");
			qc.invalidateQueries({ queryKey: ["projeto_imagens", projetoId] });
			if (activeViewerImage?.id === id) setActiveViewerImage(null);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-2xl border border-blue-100 bg-gradient-to-r from-slate-900 to-blue-950 p-5 text-white shadow-vibra-md",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[10px] uppercase tracking-widest text-blue-300 font-bold bg-white/10 px-2 py-0.5 rounded",
							children: "Módulo Executivo & Comunicação"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-[18px] font-black tracking-tight mt-1.5",
							children: "Mural Estratégico do Projeto"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-blue-100/80 mt-1",
							children: "Faça upload das até 8 imagens mais importantes e de maior impacto (fluxos As Is, diagramas, fotos da operação ou protótipos To Be) para visualização em tamanho grande no Dashboard Executivo."
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "self-start sm:self-center rounded-xl bg-blue-500/20 px-3 py-1.5 text-xs font-bold text-blue-300 border border-blue-500/30",
						children: [images.length, "/8 Imagens Carregadas"]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 lg:grid-cols-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border bg-card p-4 shadow-vibra-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
							className: "text-[13px] font-bold text-slate-900 mb-3 flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "h-4.5 w-4.5 text-blue-600" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Adicionar ao Mural" })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block text-[11px] font-bold text-slate-700",
									children: "Formato Proporcional"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-2 gap-2 mt-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => setSelectedRatio("16:9"),
										className: `rounded border p-2 text-center text-xs font-bold flex flex-col items-center justify-center gap-1 transition ${selectedRatio === "16:9" ? "border-blue-600 bg-blue-50 text-blue-700" : "border-input bg-white text-muted-foreground hover:bg-slate-50"}`,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "w-10 h-6 bg-slate-200 border border-slate-300 rounded mb-0.5 flex items-center justify-center text-[8px] font-mono",
											children: "16:9"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Paisagem (16:9)" })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => setSelectedRatio("9:16"),
										className: `rounded border p-2 text-center text-xs font-bold flex flex-col items-center justify-center gap-1 transition ${selectedRatio === "9:16" ? "border-blue-600 bg-blue-50 text-blue-700" : "border-input bg-white text-muted-foreground hover:bg-slate-50"}`,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "w-6 h-10 bg-slate-200 border border-slate-300 rounded mb-0.5 flex items-center justify-center text-[8px] font-mono",
											children: "9:16"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Retrato (9:16)" })]
									})]
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block text-[11px] font-bold text-slate-700",
									children: "Legenda da Imagem"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									placeholder: "Ex: Novo Fluxo de Trabalho (TO BE) Automatizado",
									className: "mt-1 w-full rounded border border-input px-2.5 py-2 text-xs bg-white focus:outline-none focus:border-blue-600",
									value: legend,
									onChange: (e) => setLegend(e.target.value)
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									onDragOver: handleDragOver,
									onDrop: handleDrop,
									onClick: () => fileInputRef.current?.click(),
									className: `border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition flex flex-col items-center justify-center ${uploading ? "bg-slate-50 border-blue-400" : "bg-white border-slate-200 hover:border-blue-500 hover:bg-blue-50/20"}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "file",
										ref: fileInputRef,
										className: "hidden",
										accept: "image/*",
										onChange: (e) => handleFileUpload(e.target.files),
										disabled: uploading
									}), uploading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent mx-auto" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-slate-600 font-bold",
											children: "Processando e salvando imagem..."
										})]
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "h-8 w-8 text-slate-400 mb-2" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs font-bold text-slate-800",
											children: "Clique para escolher ou arraste a imagem"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[10px] text-muted-foreground mt-1",
											children: "PNG, JPG, WEBP de no máximo 1.5 MB"
										})
									] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-[10.5px] text-amber-800 flex items-start gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-4 w-4 shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "As imagens enviadas aqui serão compartilhadas diretamente com as instâncias executivas. Planeje o mural de forma estratégica." })]
								})
							]
						})]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "lg:col-span-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border bg-card p-4 shadow-vibra-sm h-full flex flex-col",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-4 flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-[13px] font-bold text-slate-900",
								children: "Mural de Exposição do Projeto"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] text-muted-foreground",
								children: "Clique na imagem para visualizar em tela cheia."
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "rounded bg-blue-50 border border-blue-100 px-2 py-0.5 text-[10px] font-bold text-blue-700",
								children: [images.length, "/8 imagens"]
							})]
						}), images.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex-1 flex flex-col items-center justify-center p-12 text-center text-muted-foreground bg-slate-50 border border-dashed border-slate-200 rounded-lg",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, { className: "h-10 w-10 text-slate-300 mb-2" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11.5px] font-medium",
									children: "Nenhuma imagem carregada no mural."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[10px] mt-0.5",
									children: "Faça o upload do seu primeiro diagrama estratégico no painel lateral."
								})
							]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-2 gap-4",
							children: images.map((img) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								onClick: () => setActiveViewerImage(img),
								className: "group relative cursor-pointer overflow-hidden rounded-lg border border-border bg-slate-100 shadow hover:shadow-md hover:border-blue-500 transition-all flex flex-col",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: `relative w-full ${img.aspect_ratio === "16:9" ? "aspect-video" : "aspect-[9/16] h-[240px] flex items-center justify-center bg-slate-900"}`,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: img.url,
											alt: img.legenda,
											className: `w-full h-full object-cover group-hover:scale-105 transition-transform duration-300`,
											referrerPolicy: "no-referrer"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "absolute top-2 left-2 rounded bg-black/60 px-1.5 py-0.5 text-[8.5px] font-bold text-white uppercase tracking-wider backdrop-blur-sm",
											children: ["Proporção ", img.aspect_ratio]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Maximize2, { className: "h-5 w-5 text-white animate-bounce" })
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "p-2 bg-white flex items-center justify-between border-t border-slate-100",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[11px] font-bold text-slate-800 truncate pr-2 flex-1",
										children: img.legenda
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: (e) => handleDeleteImage(img.id, e),
										className: "p-1 text-red-500 hover:bg-red-50 rounded transition shrink-0",
										title: "Remover",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3 w-3" })
									})]
								})]
							}, img.id))
						})]
					})
				})]
			}),
			activeViewerImage && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 backdrop-blur-md animate-fade-in",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setActiveViewerImage(null),
					className: "absolute top-4 right-4 rounded-full bg-white/10 p-2.5 text-white hover:bg-white/20 transition",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-5xl w-full flex flex-col items-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: `relative ${activeViewerImage.aspect_ratio === "16:9" ? "w-full aspect-video" : "h-[85vh] aspect-[9/16]"} bg-slate-950 rounded-lg overflow-hidden flex items-center justify-center border border-white/10`,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: activeViewerImage.url,
							alt: activeViewerImage.legenda,
							className: "max-h-full max-w-full object-contain",
							referrerPolicy: "no-referrer"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 text-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "rounded bg-blue-500/20 border border-blue-500/30 px-2 py-0.5 text-[10px] font-bold text-blue-300 uppercase tracking-widest",
							children: ["Formato ", activeViewerImage.aspect_ratio]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
							className: "text-[15px] font-black text-white mt-1.5",
							children: activeViewerImage.legenda
						})]
					})]
				})]
			})
		]
	});
}
var CHECKLIST_ITEMS = [
	{
		id: "step1_1",
		category: "1. Alinhamento & Setup",
		title: "Definição do Sponsor e Stakeholders",
		description: "Identificar os patrocinadores e os principais tomadores de decisão do processo."
	},
	{
		id: "step1_2",
		category: "1. Alinhamento & Setup",
		title: "Reunião de Kick-off",
		description: "Realizar o alinhamento inicial com a equipe executora para alinhar objetivos."
	},
	{
		id: "step2_1",
		category: "2. Mapeamento AS IS",
		title: "Entrevistas com Especialistas",
		description: "Entrevistar quem executa o processo para entender o fluxo de trabalho atual."
	},
	{
		id: "step2_2",
		category: "2. Mapeamento AS IS",
		title: "Identificação e Registro de Dores (Desperdícios)",
		description: "Registrar sistemas legados, planilhas paralelas, retrabalho e gargalos."
	},
	{
		id: "step3_1",
		category: "3. Desenho & Modelagem",
		title: "Desenho do Fluxo AS IS",
		description: "Criar o fluxo rascunho ou diagrama BPMN representando o cenário atual."
	},
	{
		id: "step3_2",
		category: "3. Desenho & Modelagem",
		title: "Estruturação de SIPOC",
		description: "Mapear fornecedores, entradas, macro-passos, saídas e clientes do processo."
	},
	{
		id: "step4_1",
		category: "4. Engenharia TO BE",
		title: "Definição de Oportunidades de Melhoria",
		description: "Planejar soluções para eliminar dores (automação, eliminação de passos, etc.)."
	},
	{
		id: "step4_2",
		category: "4. Engenharia TO BE",
		title: "Desenho do Fluxo TO BE",
		description: "Modelar o fluxo futuro otimizado contendo as melhorias integradas."
	},
	{
		id: "step5_1",
		category: "5. Homologação & Entrega",
		title: "Apresentação e Validação",
		description: "Apresentar os resultados e fluxo TO BE para aprovação final do Sponsor."
	},
	{
		id: "step5_2",
		category: "5. Homologação & Entrega",
		title: "Procedimentação & Gestão de Mudança",
		description: "Garantir que os novos procedimentos estão documentados e a equipe está treinada."
	}
];
function ChecklistTab() {
	const { projetoId } = useHierarchy();
	const [completedItems, setCompletedItems] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		if (!projetoId) return;
		const stored = localStorage.getItem(`vibra_checklist_${projetoId}`);
		if (stored) try {
			setCompletedItems(JSON.parse(stored));
		} catch (e) {
			setCompletedItems([]);
		}
		else setCompletedItems([]);
	}, [projetoId]);
	const toggleItem = (id) => {
		if (!projetoId) {
			toast.error("Selecione um projeto na barra superior para registrar o progresso.");
			return;
		}
		const newCompleted = completedItems.includes(id) ? completedItems.filter((i) => i !== id) : [...completedItems, id];
		setCompletedItems(newCompleted);
		localStorage.setItem(`vibra_checklist_${projetoId}`, JSON.stringify(newCompleted));
	};
	const resetChecklist = () => {
		if (!projetoId) return;
		setCompletedItems([]);
		localStorage.removeItem(`vibra_checklist_${projetoId}`);
		toast.success("Checklist reiniciado para este projeto.");
	};
	const total = CHECKLIST_ITEMS.length;
	const completedCount = CHECKLIST_ITEMS.filter((item) => completedItems.includes(item.id)).length;
	const percentage = total > 0 ? Math.round(completedCount / total * 100) : 0;
	const categories = Array.from(new Set(CHECKLIST_ITEMS.map((item) => item.category)));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		id: "checklist-root",
		className: "bg-neutral-50 rounded-xl p-6 border border-[#DBDBDB] space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col md:flex-row md:items-center justify-between gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
				className: "text-lg font-bold text-[#044317] flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClipboardCheck, { className: "h-5 w-5 text-[#268200]" }), " Checklist de Metodologia e Mapeamento"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-[#54585A]",
				children: "Acompanhe o andamento das etapas canônicas de levantamento de processos para o projeto selecionado."
			})] }), projetoId && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: resetChecklist,
				className: "flex items-center gap-1 text-[11.5px] font-bold text-[#54585A] hover:text-[#044317] bg-white border border-[#DBDBDB] px-3 py-1.5 rounded-lg hover:bg-neutral-50 transition",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "h-3 w-3" }), " Reiniciar Progresso"]
			})]
		}), !projetoId ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2.5 p-4 bg-[#fced96] border border-[#FEDC00] rounded-xl text-[12.5px] text-[#54585A]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, { className: "h-4.5 w-4.5 text-[#FF6900] shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Nenhum projeto selecionado:" }), " Por favor, selecione um projeto no seletor da barra superior do sistema para visualizar e salvar o progresso do checklist."] })]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-white p-4 rounded-xl border border-[#DBDBDB] space-y-2 shadow-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between items-center text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-bold text-[#044317]",
							children: "Progresso de Mapeamento do Projeto"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-extrabold text-[#268200]",
							children: [percentage, "% Concluído"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "w-full h-3 bg-neutral-100 rounded-full overflow-hidden",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-full bg-[#268200] transition-all duration-500 rounded-full",
							style: { width: `${percentage}%` }
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-[11px] text-[#54585A]",
						children: [
							completedCount,
							" de ",
							total,
							" atividades essenciais concluídas."
						]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-6 md:grid-cols-2",
				children: categories.map((category) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-white p-4 rounded-xl border border-[#DBDBDB] shadow-sm space-y-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-xs font-extrabold text-[#044317] border-b border-neutral-100 pb-1 uppercase tracking-wider",
						children: category
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-3",
						children: CHECKLIST_ITEMS.filter((item) => item.category === category).map((item) => {
							const isChecked = completedItems.includes(item.id);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								onClick: () => toggleItem(item.id),
								className: `flex items-start gap-3 p-2.5 rounded-lg border transition-all cursor-pointer ${isChecked ? "bg-[#a9c78e]/10 border-[#a9c78e] shadow-sm" : "bg-white border-neutral-100 hover:border-[#DBDBDB]"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "mt-0.5 text-[#268200] focus:outline-none",
									children: isChecked ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SquareCheckBig, { className: "h-5 w-5 text-[#268200] fill-[#a9c78e]/20" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Square, { className: "h-5 w-5 text-[#DBDBDB] hover:text-[#54585A]" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-0.5 select-none",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
										className: `text-xs font-bold ${isChecked ? "text-neutral-500 line-through" : "text-[#54585A]"}`,
										children: item.title
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[11px] text-muted-foreground leading-snug",
										children: item.description
									})]
								})]
							}, item.id);
						})
					})]
				}, category))
			})]
		})]
	});
}
function GroupTab({ subtabs, initial }) {
	const { data: myRole = "visualizador" } = useQuery({
		queryKey: ["my-role"],
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
		return defaultVal;
	};
	const visibleSubtabs = subtabs.filter((s) => {
		return hasPermission(`sub_mapeamento_${s.id}`, true);
	});
	const [active, setActive] = (0, import_react.useState)(initial ?? visibleSubtabs[0]?.id);
	const activeTabId = visibleSubtabs.some((s) => s.id === active) ? active : visibleSubtabs[0]?.id ?? "";
	const Comp = visibleSubtabs.find((s) => s.id === activeTabId)?.render ?? visibleSubtabs[0]?.render;
	if (visibleSubtabs.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "rounded-xl border border-neutral-200 bg-white p-6 text-center text-muted-foreground shadow-vibra-sm",
		children: "Você não tem permissão para visualizar nenhuma sub-aba deste módulo."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex items-center gap-0.5 overflow-x-auto rounded-xl border border-border bg-card px-2 py-1.5 shadow-vibra-sm",
			children: visibleSubtabs.map((s) => {
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setActive(s.id),
					className: `shrink-0 rounded-full px-3 py-1.5 text-[11.5px] font-semibold transition-all ${s.id === activeTabId ? "bg-vibra-700 text-white shadow-vibra-sm" : "text-muted-foreground hover:bg-vibra-50 hover:text-vibra-800"}`,
					children: s.label
				}, s.id);
			})
		}), Comp && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Comp, {})]
	});
}
var n = (v, d = 0) => typeof v === "number" && !isNaN(v) ? v : d;
var b = (v) => v ? 1 : 0;
function calcTempoMedio(i) {
	const tmin = n(i.tempo_min), tmax = n(i.tempo_max);
	const v = (tmin + tmax) / 2;
	return {
		value: v,
		memoria: `Tempo médio = (mín + máx) / 2 = (${tmin} + ${tmax}) / 2 = ${v.toFixed(2)} min`
	};
}
function calcGanhoTempo(i) {
	const medio = calcTempoMedio(i).value;
	const ideal = n(i.tempo_ideal);
	const v = Math.max(0, medio - ideal);
	return {
		value: v,
		memoria: `Ganho de tempo = tempo médio − tempo ideal = ${medio.toFixed(2)} − ${ideal} = ${v.toFixed(2)} min`
	};
}
function calcPercReducao(i) {
	const atual = calcTempoMedio(i).value;
	const futuro = n(i.tempo_futuro);
	if (atual <= 0) return {
		value: 0,
		memoria: "Percentual de redução = ((atual − futuro) / atual) × 100\nAtual = 0 → não calculado"
	};
	const v = (atual - futuro) / atual * 100;
	return {
		value: v,
		memoria: `Percentual de redução = ((atual − futuro) / atual) × 100\n= ((${atual.toFixed(2)} − ${futuro}) / ${atual.toFixed(2)}) × 100 = ${v.toFixed(1)}%`
	};
}
function calcHorasDesperdicadasMes(i) {
	const ganho = calcGanhoTempo(i).value;
	const exec = n(i.execucoes_mes);
	const v = ganho / 60 * exec;
	return {
		value: v,
		memoria: `Horas desperdiçadas/mês = (ganho de tempo / 60) × execuções/mês\n= (${ganho.toFixed(2)} / 60) × ${exec} = ${v.toFixed(2)} h`
	};
}
function calcHorasMes(i) {
	const t = calcTempoMedio(i).value;
	const exec = n(i.execucoes_mes);
	const v = t * exec / 60;
	return {
		value: v,
		memoria: `Horas/mês = (tempo médio × execuções/mês) / 60 = (${t.toFixed(2)} × ${exec}) / 60 = ${v.toFixed(2)} h`
	};
}
function calcIndiceQualidade(i) {
	const erro = n(i.taxa_erro), retr = n(i.retrabalho);
	const v = (1 - erro / 100) * (1 - retr / 100) * 100;
	return {
		value: v,
		memoria: `Índice de qualidade = (1 − erro%) × (1 − retrabalho%) × 100\n= (1 − ${erro}/100) × (1 − ${retr}/100) × 100 = ${v.toFixed(1)}`
	};
}
function calcScoreAutomacao(i) {
	const m = b(i.atividade_manual) * 10;
	const d = b(i.digitacao_manual) * 10;
	const c = b(i.copia_cola) * 10;
	const e = b(i.excel_paralelo) * 10;
	const v = m + d + c + e;
	return {
		value: v,
		memoria: `Score de Automação (0–40) = Manual(${m}) + Digitação(${d}) + Copia/Cola(${c}) + Excel(${e}) = ${v}`
	};
}
var REG_W = {
	"Até 3": 1,
	"4 a 10": 2,
	"11 a 20": 3,
	"21 a 50": 4,
	"Mais de 50": 5
};
var EXC_W = {
	Nenhuma: 1,
	Poucas: 2,
	Moderadas: 3,
	Muitas: 4,
	"Muito elevadas": 5
};
function calcComplexidadeAutomacao(i) {
	const sis = Array.isArray(i.sistemas) ? i.sistemas.length : 0;
	const alt = Array.isArray(i.alternancia_telas) ? i.alternancia_telas.length : 0;
	const loc = Array.isArray(i.locais_consulta) ? i.locais_consulta.length : 0;
	const pas = Array.isArray(i.passos_manuais) ? i.passos_manuais.length : 0;
	const intg = Array.isArray(i.integracoes) ? i.integracoes.length : 0;
	const reg = REG_W[String(i.qtd_regras ?? "")] ?? 0;
	const exc = EXC_W[String(i.volume_excecoes ?? "")] ?? 0;
	const manualAct = i.atividade_manual ? 3 : 0;
	const manualTyp = i.digitacao_manual ? 4 : 0;
	const manualCc = i.copia_cola ? 3 : 0;
	const v = sis * 2 + alt * 2 + loc * 2 + pas * 2 + intg * 3 + reg * 2 + exc * 2 + manualAct + manualTyp + manualCc;
	let label = "Baixa";
	if (v > 35) label = "Muito Alta";
	else if (v > 25) label = "Alta";
	else if (v > 15) label = "Média";
	return {
		value: v,
		label,
		memoria: `Complexidade da Automação (Pontos: ${v} - Nível: ${label})\n• Sistemas Conectados: ${sis} × 2 = ${sis * 2}\n• Alternância de Telas: ${alt} × 2 = ${alt * 2}\n• Locais de Consulta: ${loc} × 2 = ${loc * 2}\n• Passos Manuais: ${pas} × 2 = ${pas * 2}\n• Integrações Necessárias: ${intg} × 3 = ${intg * 3}\n• Quantidade de Regras: Peso ${reg} × 2 = ${reg * 2}\n• Volume de Exceções: Peso ${exc} × 2 = ${exc * 2}\n• Atividades Manuais: Atividade (${manualAct}) + Digitação (${manualTyp}) + Copia/Cola (${manualCc}) = ${manualAct + manualTyp + manualCc}`
	};
}
function calcRiscoOperacional(i) {
	const dep = b(i.dep_pessoa_chave) * 3;
	const sub = (i.substituto_treinado === false || i.substituto_treinado == null ? 1 : 0) * 2;
	const tr = n(i.tempo_capacitacao) * .5;
	const v = dep + sub + tr;
	return {
		value: Math.round(v * 10) / 10,
		memoria: `Risco Operacional = (Dep.Pessoa×3) + (Sem Substituto×2) + (Tempo Treino×0,5)\n= ${dep} + ${sub} + ${tr.toFixed(2)} = ${v.toFixed(2)}`
	};
}
function getFormulaFromLocalStorage(id, fallbackExpressao) {
	try {
		if (typeof window !== "undefined") {
			const stored = localStorage.getItem("vibra_db_formulas");
			if (stored) {
				const list = JSON.parse(stored);
				if (Array.isArray(list)) {
					const found = list.find((f) => f.id === id);
					if (found && found.expressao) return found.expressao;
				}
			}
		}
	} catch (e) {
		console.warn("Could not read formulas from localStorage:", e);
	}
	return fallbackExpressao;
}
function evaluateFormula(expression, variables) {
	try {
		let sanitized = expression;
		const keys = Object.keys(variables).sort((a, b) => b.length - a.length);
		for (const key of keys) {
			const val = variables[key] ?? 0;
			const regex = new RegExp(`\\b${key}\\b`, "g");
			sanitized = sanitized.replace(regex, String(val));
		}
		sanitized = sanitized.replace(/[^0-9\s+\-*/().%]/g, "");
		const result = new Function(`return (${sanitized})`)();
		if (typeof result === "number" && !isNaN(result) && isFinite(result)) return result;
		return 0;
	} catch (err) {
		console.error("Error evaluating expression:", expression, err);
		return 0;
	}
}
function calcHorasEconomizadasMes(i) {
	const g = n(i.horas_gastas_mes), f = n(i.horas_futuras_mes);
	const v = Math.max(0, g - f);
	return {
		value: v,
		memoria: `Horas economizadas/mês = horas gastas − horas futuras = ${g} − ${f} = ${v.toFixed(2)} h`
	};
}
function calcEconomiaAnual(i) {
	const h = calcHorasEconomizadasMes(i).value;
	const c = n(i.custo_hora);
	const v = h * c * 12;
	return {
		value: v,
		memoria: `Economia anual = horas economizadas × custo/hora × 12 = ${h.toFixed(2)} × ${c} × 12 = R$ ${v.toFixed(2)}`
	};
}
function calcFteLiberado(i) {
	const h = calcHorasEconomizadasMes(i).value;
	const hc_estimado = n(i.hc_estimado);
	const hc_alcancado = n(i.hc_alcancado);
	const expr = getFormulaFromLocalStorage("f-fte", "hc_estimado - hc_alcancado");
	let value = evaluateFormula(expr, {
		hc_estimado,
		hc_alcancado
	});
	if (value === 0 && h > 0) value = h / 176;
	return {
		value,
		memoria: `FTE Liberado calculado via fórmula dinâmica: ${expr}\nVariáveis: hc_estimado = ${hc_estimado}, hc_alcancado = ${hc_alcancado}\nResultado = ${value.toFixed(3)} FTE`
	};
}
function calcRoi(i) {
	const saving = n(i.saving_previsto) || calcEconomiaAnual(i).value;
	const custo = n(i.custo_implementacao);
	if (custo <= 0) return {
		value: 0,
		memoria: "ROI = (saving − custo) / custo × 100\nCusto = 0 → não calculado"
	};
	const expr = getFormulaFromLocalStorage("f-roi", "((saving_realizado - custo_implementacao) / custo_implementacao) * 100");
	const value = evaluateFormula(expr, {
		saving_realizado: saving,
		custo_implementacao: custo
	});
	return {
		value,
		memoria: `ROI calculado via fórmula dinâmica: ${expr}\nVariáveis: saving_realizado = ${saving.toFixed(2)}, custo_implementacao = ${custo.toFixed(2)}\nResultado = ${value.toFixed(1)}%`
	};
}
function calcPayback(i) {
	const saving = n(i.saving_previsto) || calcEconomiaAnual(i).value;
	const custo = n(i.custo_implementacao);
	if (saving <= 0) return {
		value: 0,
		memoria: "Payback = custo / (saving/12). Saving = 0 → não calculado"
	};
	const expr = getFormulaFromLocalStorage("f-payback", "custo_implementacao / (saving_previsto / 12)");
	const value = evaluateFormula(expr, {
		custo_implementacao: custo,
		saving_previsto: saving
	});
	return {
		value,
		memoria: `Payback calculado via fórmula dinâmica: ${expr}\nVariáveis: custo_implementacao = ${custo.toFixed(2)}, saving_previsto = ${saving.toFixed(2)}\nResultado = ${value.toFixed(1)} meses`
	};
}
function calcSmartScore(i) {
	const impNeg = n(i.impacto_negocio), impCli = n(i.impacto_cliente), impFin = n(i.impacto_financeiro);
	const esf = n(i.esforco), comp = n(i.complexidade);
	const expr = getFormulaFromLocalStorage("f-score", "(impacto_negocio + impacto_cliente + impacto_financeiro) / (esforco + complexidade) * 10");
	const value = evaluateFormula(expr, {
		impacto_negocio: impNeg,
		impacto_cliente: impCli,
		impacto_financeiro: impFin,
		esforco: esf,
		complexidade: comp
	});
	return {
		value: Math.max(0, Math.min(100, Math.round(value))),
		memoria: `Score de Priorização calculado via fórmula dinâmica: ${expr}\nVariáveis: impacto_negocio = ${impNeg}, impacto_cliente = ${impCli}, impacto_financeiro = ${impFin}, esforço = ${esf}, complexidade = ${comp}\nResultado = ${value.toFixed(1)}`
	};
}
function nivelPrioridade(score) {
	if (score >= 50) return {
		label: "Crítica",
		tone: "red"
	};
	if (score >= 35) return {
		label: "Alta",
		tone: "orange"
	};
	if (score >= 20) return {
		label: "Média",
		tone: "yellow"
	};
	if (score >= 10) return {
		label: "Baixa",
		tone: "vibra"
	};
	return {
		label: "Muito Baixa",
		tone: "vibra"
	};
}
var initialFormState = {
	titulo: "",
	descricao: "",
	status: "Backlog",
	prioridade: "Média",
	impacto_negocio: 3,
	impacto_cliente: 3,
	impacto_financeiro: 3,
	esforco: 3,
	complexidade: 3,
	vice_presidente: "",
	diretor: "",
	gerente: "",
	area_responsavel: "",
	gestor_responsavel: "",
	analista_responsavel: "",
	data_diagnostico: "",
	cliente_processo: [],
	processo: "",
	objetivo_processo: "",
	dor_identificada: "",
	causa_raiz_inicial: "",
	categoria_dor: "",
	frequencia: "",
	sistemas_paralelos: [],
	desperdicios_lean: [],
	impacto_cliente_sn: false,
	impacto_financeiro_sn: false,
	impacto_compliance_sn: false,
	tempo_min: 0,
	tempo_max: 0,
	tempo_ideal: 0,
	tempo_futuro: 0,
	tempo_espera: 0,
	motivo_reducao: "",
	execucoes_dia: 0,
	execucoes_semana: 0,
	execucoes_mes: 0,
	taxa_erro: 0,
	retrabalho: 0,
	sla_existe: false,
	sla_min: 0,
	atividade_manual: false,
	digitacao_manual: false,
	copia_cola: false,
	excel_paralelo: false,
	qtd_planilhas: 0,
	local_planilhas: [],
	locais_consulta: [],
	passos_manuais: [],
	alternancia_telas: [],
	integracoes_necessarias: [],
	qtd_regras: "Até 3",
	volume_excecoes: "Nenhuma",
	automacao_sugerida: "",
	hc_atual: 0,
	pessoas_envolvidas: 0,
	dep_pessoa_chave: false,
	tempo_capacitacao: 0,
	substituto_treinado: true,
	substitutos_detalhes: "",
	custo_hora: 0,
	horas_gastas_mes: 0,
	horas_futuras_mes: 0,
	multas_evitadas: 0,
	custo_implementacao: 0,
	volume_financeiro: 0,
	links_relacionados: "",
	evidencia_atual: "",
	evidencia_futura: "",
	urgencia: "Normal",
	expectativa_produtividade: 0,
	complexidade_processo: "Baixa",
	dependencia_ti: false,
	tipo_melhoria: "Otimização",
	observacoes: "",
	postos_total: 0,
	postos_nova_imagem: 0,
	tempo_embandeiramento_inicial: 0,
	tempo_embandeiramento_estimado: 0,
	tempo_embandeiramento_real: 0,
	meta_postos_nova_imagem: 0,
	capacidade_nova_imagem_atual: 0,
	capacidade_implantacao_atual: 0,
	capacidade_implantacao_estimada: 0,
	capacidade_embandeiramento_atual: 0,
	capacidade_embandeiramento_estimada: 0,
	capacidade_renovacao_atual: 0,
	capacidade_renovacao_estimada: 0,
	capacidade_geral_futura_estimada: 0
};
function FormularioTab() {
	const qc = useQueryClient();
	const { projetoId, setProjeto, iniciativaId, setIniciativa } = useHierarchy();
	const [form, setForm] = (0, import_react.useState)(initialFormState);
	const [novoProjetoNome, setNovoProjetoNome] = (0, import_react.useState)("");
	const [savingStatus, setSavingStatus] = (0, import_react.useState)("idle");
	const [isCreatingNew, setIsCreatingNew] = (0, import_react.useState)(false);
	const [autoPriorizacao, setAutoPriorizacao] = (0, import_react.useState)(true);
	const [pesoOperacional, setPesoOperacional] = (0, import_react.useState)(0);
	const [pessoasDetalhes, setPessoasDetalhes] = (0, import_react.useState)("");
	const [fteDistrib, setFteDistrib] = (0, import_react.useState)([
		{
			area: "SNEG (Operações)",
			fte: 0
		},
		{
			area: "SPCOM (Comercial)",
			fte: 0
		},
		{
			area: "Financeiro",
			fte: 0
		},
		{
			area: "Operações / Logística",
			fte: 0
		},
		{
			area: "TI & Sistemas",
			fte: 0
		},
		{
			area: "Atendimento & Backoffice",
			fte: 0
		}
	]);
	const sumFteDistrib = (0, import_react.useMemo)(() => {
		return fteDistrib.reduce((sum, item) => sum + (Number(item.fte) || 0), 0);
	}, [fteDistrib]);
	const isFteValidationValid = (0, import_react.useMemo)(() => {
		const hcVal = Number(form.hc_atual) || 0;
		return Math.abs(sumFteDistrib - hcVal) < .001;
	}, [sumFteDistrib, form.hc_atual]);
	const { data: myRole = "visualizador" } = useQuery({
		queryKey: ["my-role"],
		queryFn: async () => {
			const { data: { user } } = await supabase.auth.getUser();
			if (!user) return "visualizador";
			const emailLower = user.email?.toLowerCase() || "";
			if (emailLower === "rfranca@vibraenergia.com.br" || emailLower === "rfranca@vibra.com.br" || emailLower.includes("raquel") && emailLower.includes("vibra") || emailLower === "admin@vibraenergia.com.br" || emailLower === "sfquequel@gmail.com" || emailLower === "juliano.maluf@mjv.com.br") return "admin";
			const { data } = await supabase.from("user_roles").select("role").eq("user_id", user.id).maybeSingle();
			return data?.role ?? "visualizador";
		}
	});
	const isAdmin = myRole === "admin" || myRole === "editor_master" || myRole === "editor_basico";
	const { data: projetos = [], isLoading: isLoadingProjetos } = useQuery({
		queryKey: ["projetos-list"],
		queryFn: async () => {
			const { data, error } = await supabase.from("projetos").select("id, nome").is("deleted_at", null).order("nome");
			if (error) throw error;
			return data ?? [];
		}
	});
	const { data: iniciativas = [], isLoading: isLoadingIniciativas } = useQuery({
		queryKey: ["iniciativas-by-projeto", projetoId],
		enabled: !!projetoId,
		queryFn: async () => {
			const { data, error } = await supabase.from("iniciativas").select("*").eq("projeto_id", projetoId).is("deleted_at", null).order("titulo");
			if (error) throw error;
			return data ?? [];
		}
	});
	const { data: asisSteps = [] } = useQuery({
		queryKey: ["form-asis-steps", iniciativaId],
		enabled: !!iniciativaId,
		queryFn: async () => {
			const { data, error } = await supabase.from("asis_passos").select("tempo").eq("iniciativa_id", iniciativaId).is("deleted_at", null);
			if (error) throw error;
			return data ?? [];
		}
	});
	const { data: tobeSteps = [] } = useQuery({
		queryKey: ["form-tobe-steps", iniciativaId],
		enabled: !!iniciativaId,
		queryFn: async () => {
			const { data, error } = await supabase.from("tobe_passos").select("tempo, ganho_fte").eq("iniciativa_id", iniciativaId).is("deleted_at", null);
			if (error) throw error;
			return data ?? [];
		}
	});
	const activeProject = (0, import_react.useMemo)(() => {
		return projetos.find((p) => p.id === projetoId);
	}, [projetos, projetoId]);
	const activeInitiative = (0, import_react.useMemo)(() => {
		if (isCreatingNew) return null;
		return iniciativas.find((i) => i.id === iniciativaId);
	}, [
		iniciativas,
		iniciativaId,
		isCreatingNew
	]);
	const lastLoadedIdRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		if (isCreatingNew) {
			setForm(initialFormState);
			setSavingStatus("idle");
			setPesoOperacional(0);
			setFteDistrib([
				{
					area: "SNEG (Operações)",
					fte: 0
				},
				{
					area: "SPCOM (Comercial)",
					fte: 0
				},
				{
					area: "Financeiro",
					fte: 0
				},
				{
					area: "Operações / Logística",
					fte: 0
				},
				{
					area: "TI & Sistemas",
					fte: 0
				},
				{
					area: "Atendimento & Backoffice",
					fte: 0
				}
			]);
			lastLoadedIdRef.current = "__new__";
		} else if (activeInitiative) {
			if (iniciativaId !== lastLoadedIdRef.current) {
				const merged = { ...initialFormState };
				Object.keys(initialFormState).forEach((k) => {
					const val = activeInitiative[k];
					if (val !== void 0 && val !== null) merged[k] = val;
				});
				if (activeInitiative.integracoes) merged.integracoes_necessarias = Array.isArray(activeInitiative.integracoes) ? activeInitiative.integracoes : [];
				setForm(merged);
				let parsedPesoOperacional = 0;
				let parsedPessoasDetalhes = "";
				let parsedFteDistrib_list = [
					{
						area: "SNEG (Operações)",
						fte: 0
					},
					{
						area: "SPCOM (Comercial)",
						fte: 0
					},
					{
						area: "Financeiro",
						fte: 0
					},
					{
						area: "Operações / Logística",
						fte: 0
					},
					{
						area: "TI & Sistemas",
						fte: 0
					},
					{
						area: "Atendimento & Backoffice",
						fte: 0
					}
				];
				if (activeInitiative.substitutos_detalhes) try {
					const dataObj = JSON.parse(activeInitiative.substitutos_detalhes);
					if (dataObj && typeof dataObj === "object") {
						if (dataObj.peso_operacional !== void 0) parsedPesoOperacional = Number(dataObj.peso_operacional) || 0;
						if (dataObj.pessoas_detalhes !== void 0) parsedPessoasDetalhes = String(dataObj.pessoas_detalhes || "");
						if (Array.isArray(dataObj.fte_distribuicao)) parsedFteDistrib_list = dataObj.fte_distribuicao.map((item) => ({
							area: String(item.area || ""),
							fte: Number(item.fte) || 0
						}));
					}
				} catch (e) {
					const num = parseFloat(activeInitiative.substitutos_detalhes);
					if (!isNaN(num)) parsedPesoOperacional = num;
				}
				setPesoOperacional(parsedPesoOperacional);
				setPessoasDetalhes(parsedPessoasDetalhes);
				setFteDistrib(parsedFteDistrib_list);
				setSavingStatus("saved");
				lastLoadedIdRef.current = iniciativaId;
			}
		} else {
			setForm(initialFormState);
			setSavingStatus("idle");
			setPesoOperacional(0);
			setPessoasDetalhes("");
			setFteDistrib([
				{
					area: "SNEG (Operações)",
					fte: 0
				},
				{
					area: "SPCOM (Comercial)",
					fte: 0
				},
				{
					area: "Financeiro",
					fte: 0
				},
				{
					area: "Operações / Logística",
					fte: 0
				},
				{
					area: "TI & Sistemas",
					fte: 0
				},
				{
					area: "Atendimento & Backoffice",
					fte: 0
				}
			]);
			lastLoadedIdRef.current = null;
		}
	}, [
		activeInitiative,
		iniciativaId,
		isCreatingNew
	]);
	const autoSaveTimeoutRef = (0, import_react.useRef)(null);
	const saveToGCP = async (idToSave, currentFormState, pOperacional, fDistrib, pDetalhes) => {
		if (!idToSave || isCreatingNew || !isAdmin) return;
		setSavingStatus("saving");
		try {
			const activePeso = pOperacional !== void 0 ? pOperacional : pesoOperacional;
			const activeFte = fDistrib !== void 0 ? fDistrib : fteDistrib;
			const activeDetalhes = pDetalhes !== void 0 ? pDetalhes : pessoasDetalhes;
			const sumFteDistribVal = activeFte.reduce((sum, item) => sum + (Number(item.fte) || 0), 0);
			const hcVal = Number(currentFormState.hc_atual) || 0;
			if (!(Math.abs(sumFteDistribVal - hcVal) < .001)) {
				setSavingStatus("error");
				return;
			}
			const calculatedVals = getCalculations(currentFormState);
			const pctParticipacao = currentFormState.hc_atual > 0 ? currentFormState.pessoas_envolvidas / currentFormState.hc_atual * 100 : 0;
			const jsonStr = JSON.stringify({
				peso_operacional: activePeso,
				fte_distribuicao: activeFte,
				pessoas_detalhes: activeDetalhes
			});
			const payload = {
				...currentFormState,
				substitutos_detalhes: jsonStr,
				score: calculatedVals.smartScore,
				prioridade: calculatedVals.prioridadeStr,
				score_automacao: calculatedVals.scoreAutomacao,
				complexidade_automacao_score: calculatedVals.complexidadeAutomacao,
				risco_operacional: calculatedVals.riscoOperacional,
				roi: calculatedVals.roi,
				fte_participacao: pctParticipacao,
				updated_at: (/* @__PURE__ */ new Date()).toISOString(),
				integracoes: currentFormState.integracoes_necessarias
			};
			delete payload.integracoes_necessarias;
			const { error } = await supabase.from("iniciativas").update(payload).eq("id", idToSave);
			if (error) {
				toast.error("Erro ao salvar automaticamente: " + error.message);
				setSavingStatus("error");
			} else {
				setSavingStatus("saved");
				qc.invalidateQueries({ queryKey: ["iniciativas-by-projeto"] });
				qc.invalidateQueries({ queryKey: ["kanban-ini"] });
				qc.invalidateQueries({ queryKey: ["timeline-ini"] });
				qc.invalidateQueries({ queryKey: ["acoes-ini"] });
				qc.invalidateQueries({ queryKey: ["dash-iniciativas-cockpit"] });
				qc.invalidateQueries({ queryKey: ["ini-full"] });
			}
		} catch (err) {
			console.error("Auto-save error:", err);
			setSavingStatus("error");
		}
	};
	const getAutoPrioridadeValues = (f) => {
		let impNeg = 1;
		if (f.impacto_compliance_sn) impNeg += 2;
		const leanCount = Array.isArray(f.desperdicios_lean) ? f.desperdicios_lean.length : 0;
		if (leanCount > 3) impNeg += 2;
		else if (leanCount > 0) impNeg += 1;
		impNeg = Math.min(5, Math.max(1, impNeg));
		let impCli = 2;
		if (f.impacto_cliente_sn) impCli = f.sla_existe ? 5 : 4;
		let impFin = 1;
		const hgastas = Number(f.horas_gastas_mes) || 0;
		const hfuturas = Number(f.horas_futuras_mes) || 0;
		const econAnual = Math.max(0, hgastas - hfuturas) * (Number(f.custo_hora) || 0) * 12;
		if (econAnual >= 1e5) impFin = 5;
		else if (econAnual >= 5e4) impFin = 4;
		else if (econAnual >= 2e4) impFin = 3;
		else if (econAnual >= 5e3) impFin = 2;
		let esf = 1;
		if (f.dependencia_ti) esf += 1.5;
		const intCount = Array.isArray(f.integracoes_necessarias) ? f.integracoes_necessarias.length : 0;
		if (intCount > 2) esf += 1.5;
		else if (intCount > 0) esf += 1;
		if ((Array.isArray(f.sistemas_paralelos) ? f.sistemas_paralelos.length : 0) > 3) esf += 1;
		if ((Number(f.custo_implementacao) || 0) > 5e4) esf += 1;
		else if ((Number(f.custo_implementacao) || 0) > 1e4) esf += .5;
		esf = Math.min(5, Math.max(1, Math.round(esf)));
		const compScore = calcComplexidadeAutomacao({
			...f,
			sistemas: f.sistemas_paralelos,
			integracoes: f.integracoes_necessarias
		}).value;
		let comp = 1;
		if (compScore <= 10) comp = 1;
		else if (compScore <= 20) comp = 2;
		else if (compScore <= 30) comp = 3;
		else if (compScore <= 40) comp = 4;
		else comp = 5;
		return {
			impacto_negocio: impNeg,
			impacto_cliente: impCli,
			impacto_financeiro: impFin,
			esforco: esf,
			complexidade: comp
		};
	};
	const handleFieldChange = (field, value) => {
		const updated = {
			...form,
			[field]: value
		};
		if (field === "tempo_min" || field === "tempo_espera" || field === "tempo_max") {
			const min = Number(updated.tempo_min) || 0;
			const espera = Number(updated.tempo_espera) || 0;
			const max = Number(updated.tempo_max) || 0;
			if (min + espera > max) {
				toast.error(`Atenção: A soma do Tempo Mínimo (${min} min) + Tempo de Espera (${espera} min) excedeu o Tempo Máximo (${max} min)!`);
				if (field === "tempo_min") updated.tempo_min = Math.max(0, max - espera);
				else if (field === "tempo_espera") updated.tempo_espera = Math.max(0, max - min);
				else if (field === "tempo_max") updated.tempo_max = min + espera;
			}
		}
		if (field === "execucoes_dia") {
			const dia = Number(value) || 0;
			updated.execucoes_semana = dia * 5;
			updated.execucoes_mes = dia * 22;
		} else if (field === "execucoes_semana") {
			const sem = Number(value) || 0;
			updated.execucoes_dia = Math.round(sem / 5);
			updated.execucoes_mes = Math.round(sem * 4.4);
		} else if (field === "execucoes_mes") {
			const mes = Number(value) || 0;
			updated.execucoes_semana = Math.round(mes / 4.4);
			updated.execucoes_dia = Math.round(mes / 22);
		}
		if (field === "tempo_min" || field === "tempo_max" || field === "tempo_futuro" || field === "execucoes_dia" || field === "execucoes_semana" || field === "execucoes_mes") {
			const gastas = (Number(updated.tempo_min) + Number(updated.tempo_max)) / 2 * Number(updated.execucoes_mes) / 60;
			const futuras = Number(updated.tempo_futuro) * Number(updated.execucoes_mes) / 60;
			updated.horas_gastas_mes = Number(gastas.toFixed(2));
			updated.horas_futuras_mes = Number(futuras.toFixed(2));
		}
		if (autoPriorizacao) {
			const autoVals = getAutoPrioridadeValues(updated);
			updated.impacto_negocio = autoVals.impacto_negocio;
			updated.impacto_cliente = autoVals.impacto_cliente;
			updated.impacto_financeiro = autoVals.impacto_financeiro;
			updated.esforco = autoVals.esforco;
			updated.complexidade = autoVals.complexidade;
		}
		setForm(updated);
		if (iniciativaId && !isCreatingNew && isAdmin) {
			setSavingStatus("saving");
			if (autoSaveTimeoutRef.current) clearTimeout(autoSaveTimeoutRef.current);
			const currentId = iniciativaId;
			autoSaveTimeoutRef.current = setTimeout(() => {
				saveToGCP(currentId, updated);
			}, 1500);
		}
	};
	const handleFieldBlur = () => {
		if (iniciativaId && !isCreatingNew && isAdmin) {
			if (autoSaveTimeoutRef.current) clearTimeout(autoSaveTimeoutRef.current);
			saveToGCP(iniciativaId, form);
		}
	};
	const handlePesoOperacionalChange = (val) => {
		setPesoOperacional(val);
		if (iniciativaId && !isCreatingNew && isAdmin) {
			if (autoSaveTimeoutRef.current) clearTimeout(autoSaveTimeoutRef.current);
			autoSaveTimeoutRef.current = setTimeout(() => {
				saveToGCP(iniciativaId, form, val, fteDistrib);
			}, 1500);
		}
	};
	const handleFteDistribChange = (index, val) => {
		const updated = [...fteDistrib];
		updated[index] = {
			...updated[index],
			fte: val
		};
		setFteDistrib(updated);
		if (iniciativaId && !isCreatingNew && isAdmin) {
			if (autoSaveTimeoutRef.current) clearTimeout(autoSaveTimeoutRef.current);
			autoSaveTimeoutRef.current = setTimeout(() => {
				saveToGCP(iniciativaId, form, pesoOperacional, updated);
			}, 1500);
		}
	};
	const handleAreaNameChange = (index, name) => {
		const updated = [...fteDistrib];
		updated[index] = {
			...updated[index],
			area: name
		};
		setFteDistrib(updated);
		if (iniciativaId && !isCreatingNew && isAdmin) {
			if (autoSaveTimeoutRef.current) clearTimeout(autoSaveTimeoutRef.current);
			autoSaveTimeoutRef.current = setTimeout(() => {
				saveToGCP(iniciativaId, form, pesoOperacional, updated);
			}, 1500);
		}
	};
	const handleAddArea = () => {
		const updated = [...fteDistrib, {
			area: `Nova Área ${fteDistrib.length + 1}`,
			fte: 0
		}];
		setFteDistrib(updated);
		if (iniciativaId && !isCreatingNew && isAdmin) {
			if (autoSaveTimeoutRef.current) clearTimeout(autoSaveTimeoutRef.current);
			autoSaveTimeoutRef.current = setTimeout(() => {
				saveToGCP(iniciativaId, form, pesoOperacional, updated);
			}, 1500);
		}
	};
	const handleRemoveArea = (index) => {
		const updated = fteDistrib.filter((_, i) => i !== index);
		setFteDistrib(updated);
		if (iniciativaId && !isCreatingNew && isAdmin) {
			if (autoSaveTimeoutRef.current) clearTimeout(autoSaveTimeoutRef.current);
			autoSaveTimeoutRef.current = setTimeout(() => {
				saveToGCP(iniciativaId, form, pesoOperacional, updated);
			}, 1500);
		}
	};
	const handlePessoasDetalhesChange = (val) => {
		setPessoasDetalhes(val);
		if (iniciativaId && !isCreatingNew && isAdmin) {
			if (autoSaveTimeoutRef.current) clearTimeout(autoSaveTimeoutRef.current);
			autoSaveTimeoutRef.current = setTimeout(() => {
				saveToGCP(iniciativaId, form, pesoOperacional, fteDistrib, val);
			}, 1500);
		}
	};
	(0, import_react.useEffect)(() => {
		return () => {
			if (autoSaveTimeoutRef.current) clearTimeout(autoSaveTimeoutRef.current);
		};
	}, []);
	const handleCreateProject = async (e) => {
		e.preventDefault();
		const nome = novoProjetoNome.trim();
		if (!nome) return;
		if (!isAdmin) return toast.error("Apenas administradores podem criar projetos.");
		try {
			const { data, error } = await supabase.from("projetos").insert({ nome }).select().single();
			if (error) toast.error("Erro ao criar projeto: " + error.message);
			else {
				toast.success(`Projeto "${nome}" criado com sucesso!`);
				setNovoProjetoNome("");
				qc.invalidateQueries({ queryKey: ["projetos-list"] });
				setProjeto(data.id);
				setIniciativa(null);
				setIsCreatingNew(true);
			}
		} catch (err) {
			toast.error(err.message || "Erro desconhecido");
		}
	};
	const handleCreateInitiative = async () => {
		if (!projetoId) return toast.error("Selecione um projeto para vincular a nova iniciativa!");
		if (!form.titulo.trim()) return toast.error("O título da iniciativa é obrigatório!");
		if (!isAdmin) return toast.error("Apenas administradores podem criar iniciativas.");
		try {
			setSavingStatus("saving");
			const codigo = await resequenceProjectIniciativas(projetoId);
			const { data: { user } } = await supabase.auth.getUser();
			const calculatedVals = getCalculations(form);
			const uuid = crypto.randomUUID();
			const payload = {
				...form,
				id: uuid,
				projeto_id: projetoId,
				codigo,
				score: calculatedVals.smartScore,
				prioridade: calculatedVals.prioridadeStr,
				score_automacao: calculatedVals.scoreAutomacao,
				complexidade_automacao_score: calculatedVals.complexidadeAutomacao,
				risco_operacional: calculatedVals.riscoOperacional,
				roi: calculatedVals.roi,
				created_by: user?.id,
				created_at: (/* @__PURE__ */ new Date()).toISOString(),
				integracoes: form.integracoes_necessarias
			};
			delete payload.integracoes_necessarias;
			const { error } = await supabase.from("iniciativas").insert(payload);
			if (error) {
				toast.error("Erro ao salvar iniciativa: " + error.message);
				setSavingStatus("error");
			} else {
				toast.success(`Iniciativa "${payload.titulo}" (${codigo}) criada com sucesso!`);
				setIsCreatingNew(false);
				setIniciativa(uuid);
				qc.invalidateQueries({ queryKey: ["iniciativas-by-projeto", projetoId] });
				qc.invalidateQueries({ queryKey: ["kanban-ini"] });
				qc.invalidateQueries({ queryKey: ["timeline-ini"] });
				qc.invalidateQueries({ queryKey: ["acoes-ini"] });
				qc.invalidateQueries({ queryKey: ["dash-iniciativas-cockpit"] });
			}
		} catch (err) {
			toast.error("Erro desconhecido: " + err.message);
			setSavingStatus("error");
		}
	};
	const handleNovaIniciativaClick = () => {
		if (autoSaveTimeoutRef.current && iniciativaId && !isCreatingNew && isAdmin) {
			clearTimeout(autoSaveTimeoutRef.current);
			autoSaveTimeoutRef.current = null;
			saveToGCP(iniciativaId, form);
		}
		setIsCreatingNew(true);
		setIniciativa(null);
		setForm(initialFormState);
	};
	const handleExcluirIniciativa = async () => {
		if (!iniciativaId || isCreatingNew) return;
		if (!isAdmin) return toast.error("Apenas administradores podem excluir iniciativas.");
		if (autoSaveTimeoutRef.current) {
			clearTimeout(autoSaveTimeoutRef.current);
			autoSaveTimeoutRef.current = null;
		}
		if (!window.confirm(`Tem certeza que deseja excluir permanentemente a iniciativa "${form.titulo || "esta"}"? Todos os microprocessos, tarefas e dados associados serão removidos permanentemente. Esta ação não pode ser desfeita.`)) return;
		try {
			setSavingStatus("saving");
			const { error } = await supabase.from("iniciativas").update({ deleted_at: (/* @__PURE__ */ new Date()).toISOString() }).eq("id", iniciativaId);
			if (error) {
				toast.error("Erro ao excluir: " + error.message);
				setSavingStatus("error");
			} else {
				if (projetoId) await resequenceProjectIniciativas(projetoId);
				toast.success("Iniciativa excluída com sucesso!");
				setIniciativa(null);
				setIsCreatingNew(false);
				setForm(initialFormState);
				qc.invalidateQueries({ queryKey: ["iniciativas-by-projeto", projetoId] });
				qc.invalidateQueries({ queryKey: ["kanban-ini"] });
				qc.invalidateQueries({ queryKey: ["timeline-ini"] });
				qc.invalidateQueries({ queryKey: ["acoes-ini"] });
				qc.invalidateQueries({ queryKey: ["dash-iniciativas-cockpit"] });
			}
		} catch (err) {
			toast.error("Erro ao excluir: " + err.message);
			setSavingStatus("error");
		}
	};
	const handleLimparFormulario = () => {
		if (window.confirm("Deseja realmente limpar todos os campos preenchidos do formulário?")) setForm(initialFormState);
	};
	const getCalculations = (state) => {
		const input = {
			...state,
			sistemas: state.sistemas_paralelos,
			integracoes: state.integracoes_necessarias
		};
		const smartScoreVal = calcSmartScore(input);
		const prioridadeObj = nivelPrioridade(smartScoreVal.value);
		const paybackVal = calcPayback(input);
		const roiVal = calcRoi(input);
		const fteVal = calcFteLiberado(input);
		const riscoVal = calcRiscoOperacional(input);
		const scoreAutVal = calcScoreAutomacao(input);
		return {
			smartScore: smartScoreVal.value,
			smartScoreMem: smartScoreVal.memoria,
			prioridadeStr: prioridadeObj.label,
			prioridadeTone: prioridadeObj.tone,
			payback: paybackVal.value,
			paybackMem: paybackVal.memoria,
			roi: roiVal.value,
			roiMem: roiVal.memoria,
			fteLiberado: fteVal.value,
			fteLiberadoMem: fteVal.memoria,
			riscoOperacional: riscoVal.value,
			riscoOperacionalMem: riscoVal.memoria,
			scoreAutomacao: scoreAutVal.value,
			scoreAutomacaoMem: scoreAutVal.memoria,
			complexidadeAutomacao: calcComplexidadeAutomacao(input).value
		};
	};
	const calcs = (0, import_react.useMemo)(() => getCalculations(form), [form]);
	const tempoMedio = (0, import_react.useMemo)(() => calcTempoMedio(form), [form]);
	const ganhoTempo = (0, import_react.useMemo)(() => calcGanhoTempo(form), [form]);
	const percReducao = (0, import_react.useMemo)(() => calcPercReducao(form), [form]);
	const horasDesperdicadas = (0, import_react.useMemo)(() => calcHorasDesperdicadasMes(form), [form]);
	const indiceQualidade = (0, import_react.useMemo)(() => calcIndiceQualidade(form), [form]);
	const complexidadeAut = (0, import_react.useMemo)(() => calcComplexidadeAutomacao({
		...form,
		sistemas: form.sistemas_paralelos,
		integracoes: form.integracoes_necessarias
	}), [form]);
	const horasEconomizadas = (0, import_react.useMemo)(() => calcHorasEconomizadasMes(form), [form]);
	const economiaAnual = (0, import_react.useMemo)(() => calcEconomiaAnual(form), [form]);
	const pctParticipacao = (0, import_react.useMemo)(() => {
		const envolvidas = Number(form.pessoas_envolvidas) || 0;
		const hc_atual = Number(form.hc_atual) || 0;
		const v = hc_atual > 0 ? envolvidas / hc_atual * 100 : 0;
		return {
			value: v,
			memoria: `% de Participação = (Pessoas envolvidas / HC Atual da Área) × 100\n= (${envolvidas} / ${hc_atual}) × 100 = ${v.toFixed(1)}%`
		};
	}, [form.pessoas_envolvidas, form.hc_atual]);
	const gestaoCapacidade = (0, import_react.useMemo)(() => {
		const hc = Number(form.hc_atual || 0);
		const envolvidas = Number(form.pessoas_envolvidas || 0);
		const h_mes = Number(calcHorasMes(form).value) || 0;
		const t_medio = Number(calcTempoMedio(form).value) || 0;
		const t_ideal = Number(form.tempo_ideal || 0);
		const t_futuro = Number(form.tempo_futuro || 0);
		const exec_mes = Number(form.execucoes_mes || 0);
		const g_tempo = Number(calcGanhoTempo(form).value) || 0;
		const h_desp = Number(calcHorasDesperdicadasMes(form).value) || 0;
		const complex = Number(form.complexidade || 1);
		const criticidade = Number(form.impacto_negocio || 1);
		const valHc = hc;
		const toolHc = `Headcount (HC) = Número de colaboradores\n= ${valHc} colaboradores`;
		const valFte = h_mes / 165;
		const toolFte = `FTE = Horas dedicadas / Horas padrão\n= ${h_mes.toFixed(2)}h / 165h = ${valFte.toFixed(3)} FTE`;
		const valPart = hc > 0 ? envolvidas / hc * 100 : 0;
		const toolPart = `% Participação = (Pessoas envolvidas / HC da Área) × 100\n= (${envolvidas} / ${hc}) × 100 = ${valPart.toFixed(1)}%`;
		const valPesoOp = exec_mes * complex;
		const toolPesoOp = `Peso Operacional = Volume × Complexidade\n= ${exec_mes} × ${complex} = ${valPesoOp.toLocaleString("pt-BR")}`;
		const valPesoPond = exec_mes * complex * criticidade;
		const toolPesoPond = `Peso Operacional Ponderado = Volume × Complexidade × Criticidade\n= ${exec_mes} × ${complex} × ${criticidade} = ${valPesoPond.toLocaleString("pt-BR")}`;
		const hrsDisponiveis = hc * 165;
		const valOcupacao = hrsDisponiveis > 0 ? h_mes / hrsDisponiveis * 100 : 0;
		const toolOcupacao = `Ocupação = Horas utilizadas / Horas disponíveis\n= ${h_mes.toFixed(2)}h / (${hc} HC × 165h) = ${valOcupacao.toFixed(1)}%`;
		const tempoDispMin = hc * 165 * 60;
		const valCapacidade = t_medio > 0 ? tempoDispMin / t_medio : 0;
		const toolCapacidade = `Capacidade = Tempo disponível (min) / Tempo médio (min)\n= (${hc} HC × 165h × 60min) / ${t_medio.toFixed(1)}min = ${valCapacidade.toLocaleString("pt-BR", { maximumFractionDigits: 0 })} execuções/mês`;
		const valProdutividade = h_mes > 0 ? exec_mes / h_mes : 0;
		const toolProdutividade = `Produtividade = Produção / Tempo\n= ${exec_mes} execuções / ${h_mes.toFixed(2)}h = ${valProdutividade.toFixed(2)} execuções/hora`;
		const valTempoMedio = t_medio;
		const toolTempoMedio = `Tempo Médio = (Tempo Mínimo + Tempo Máximo) / 2\n= (${form.tempo_min} + ${form.tempo_max}) / 2 = ${valTempoMedio.toFixed(1)} min`;
		const valDemandaFte = h_mes / 165;
		const toolDemandaFte = `Demanda de FTE = Volume × Tempo médio / Horas disponíveis\n= ${exec_mes} × ${(t_medio / 60).toFixed(3)}h / 165h = ${valDemandaFte.toFixed(3)} FTE`;
		const valUtilizacao = hrsDisponiveis > 0 ? h_mes / hrsDisponiveis * 100 : 0;
		const toolUtilizacao = `Utilização = Horas trabalhadas / Horas contratadas\n= ${h_mes.toFixed(2)}h / (${hc} × 165h) = ${valUtilizacao.toFixed(1)}%`;
		const valEficiencia = t_medio > 0 ? t_ideal / t_medio * 100 : 0;
		const toolEficiencia = `Eficiência = Tempo padrão (Ideal) / Tempo real (Médio) × 100\n= ${t_ideal}min / ${t_medio.toFixed(1)}min × 100 = ${valEficiencia.toFixed(1)}%`;
		const valGanhoProd = t_medio > 0 ? (t_medio - t_futuro) / t_medio * 100 : 0;
		const toolGanhoProd = `Ganho de Produtividade = (Antes − Depois) / Antes × 100\n= (${t_medio.toFixed(1)} − ${t_futuro}) / ${t_medio.toFixed(1)} × 100 = ${valGanhoProd.toFixed(1)}%`;
		const valHorasEcon = h_desp;
		const toolHorasEcon = `Horas Economizadas = Volume × Tempo economizado\n= ${exec_mes} × ${(g_tempo / 60).toFixed(3)}h = ${valHorasEcon.toFixed(2)} h`;
		const valEconFte = h_desp / 165;
		const toolEconFte = `Economia de FTE = Horas economizadas / 165h\n= ${h_desp.toFixed(2)}h / 165h = ${valEconFte.toFixed(3)} FTE`;
		return {
			hc: {
				val: valHc,
				tool: toolHc
			},
			fte: {
				val: valFte,
				tool: toolFte
			},
			part: {
				val: valPart,
				tool: toolPart
			},
			pesoOp: {
				val: valPesoOp,
				tool: toolPesoOp
			},
			pesoPond: {
				val: valPesoPond,
				tool: toolPesoPond
			},
			ocupacao: {
				val: valOcupacao,
				tool: toolOcupacao
			},
			capacidade: {
				val: valCapacidade,
				tool: toolCapacidade
			},
			produtividade: {
				val: valProdutividade,
				tool: toolProdutividade
			},
			tempoMedio: {
				val: valTempoMedio,
				tool: toolTempoMedio
			},
			demandaFte: {
				val: valDemandaFte,
				tool: toolDemandaFte
			},
			utilizacao: {
				val: valUtilizacao,
				tool: toolUtilizacao
			},
			eficiencia: {
				val: valEficiencia,
				tool: toolEficiencia
			},
			ganhoProd: {
				val: valGanhoProd,
				tool: toolGanhoProd
			},
			horasEcon: {
				val: valHorasEcon,
				tool: toolHorasEcon
			},
			econFte: {
				val: valEconFte,
				tool: toolEconFte
			}
		};
	}, [form]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6 pb-24",
		id: "formulario_tab_container",
		children: [
			!isAdmin && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2.5 rounded-xl border border-amber-200 bg-amber-50/70 p-4 text-amber-800 shadow-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "h-5 w-5 shrink-0 text-amber-600" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-[12.5px] font-medium leading-relaxed",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-extrabold uppercase",
						children: "Modo de Apenas Consulta:"
					}), " Apenas usuários com papel de administrador global possuem permissões para alterar, incluir ou excluir qualquer dado das iniciativas."]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-neutral-200 bg-white p-5 shadow-sm",
				id: "section_contexto_iniciativa",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
					className: "mb-4 text-[13px] font-black uppercase tracking-wider text-neutral-800 flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4 text-[#268200]" }), "Contexto da Iniciativa"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-5 md:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { label: "Projeto Vinculado *" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: projetoId || "",
								onChange: (e) => {
									setProjeto(e.target.value || null);
									setIniciativa(null);
									setIsCreatingNew(false);
								},
								className: "h-9 w-full rounded-md border border-[#DBDBDB] bg-white px-3 text-[12.5px] font-medium text-slate-700 outline-none focus:border-[#268200] focus:ring-1 focus:ring-[#268200] transition",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "",
									children: "-- Selecione o Projeto --"
								}), projetos.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: p.id,
									children: p.nome
								}, p.id))]
							})] }),
							isAdmin && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
								onSubmit: handleCreateProject,
								className: "flex gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									placeholder: "Cadastrar novo projeto...",
									value: novoProjetoNome,
									onChange: (e) => setNovoProjetoNome(e.target.value),
									className: "h-9 flex-1 rounded-md border border-[#DBDBDB] bg-white px-3 text-[12px] font-medium outline-none focus:border-[#268200]"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "submit",
									className: "inline-flex h-9 w-9 items-center justify-center rounded-md bg-[#268200] hover:bg-[#1c6000] text-white shadow transition-all duration-150",
									title: "Criar novo projeto",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4 font-bold" })
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center gap-1.5 rounded-full border border-emerald-100 bg-emerald-50/80 px-3.5 py-1 text-xs font-bold text-emerald-800",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" }),
										"Projeto: ",
										activeProject ? activeProject.nome : "—"
									]
								}), projetoId && isAdmin && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: handleNovaIniciativaClick,
									className: "ml-auto inline-flex items-center gap-1 rounded-md bg-[#268200] hover:bg-[#1a5b00] px-3 py-1.5 text-xs font-bold text-white shadow-sm transition",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3.5 w-3.5" }), " Nova Iniciativa"]
								})]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-col justify-between",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { label: "Selecione a Iniciativa para carregar" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								disabled: !projetoId,
								value: isCreatingNew ? "__new__" : iniciativaId || "",
								onChange: (e) => {
									const val = e.target.value;
									if (autoSaveTimeoutRef.current && iniciativaId && !isCreatingNew && isAdmin) {
										clearTimeout(autoSaveTimeoutRef.current);
										autoSaveTimeoutRef.current = null;
										saveToGCP(iniciativaId, form);
									}
									if (val === "__new__") {
										setIsCreatingNew(true);
										setIniciativa(null);
									} else {
										setIsCreatingNew(false);
										setIniciativa(val || null);
									}
								},
								className: "h-9 w-full rounded-md border border-[#DBDBDB] bg-white px-3 text-[12.5px] font-medium text-slate-700 outline-none focus:border-[#268200] focus:ring-1 focus:ring-[#268200] transition disabled:bg-neutral-50 disabled:opacity-60",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "",
										children: "-- Selecione uma Iniciativa --"
									}),
									isCreatingNew && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "__new__",
										children: "Nova Iniciativa (Rascunho)"
									}),
									iniciativas.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
										value: i.id,
										children: [
											"[",
											i.codigo || "INI-—",
											"] ",
											i.titulo
										]
									}, i.id))
								]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-wrap items-center gap-2 text-[11px] font-medium text-slate-500",
								children: isCreatingNew ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded-full bg-amber-100 px-2.5 py-0.5 text-amber-800 font-bold border border-amber-200",
									children: "Preenchendo nova iniciativa"
								}) : activeInitiative ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "rounded-full bg-blue-100 px-2.5 py-0.5 text-blue-800 font-bold border border-blue-200",
									children: ["Editando iniciativa: ", activeInitiative.codigo]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "italic text-slate-400",
									children: "Nenhuma iniciativa carregada. Selecione acima ou clique em Nova Iniciativa."
								})
							})]
						})
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-neutral-200 bg-white p-5 shadow-sm",
				id: "section_calculos_kpis",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
					className: "mb-4 text-[11px] font-black uppercase tracking-widest text-slate-400",
					children: "Resultados do Diagnóstico & Indicadores Calculados"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
							title: "SMART SCORE",
							value: calcs.smartScore,
							tooltip: calcs.smartScoreMem,
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4 text-emerald-600" }),
							color: "emerald"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
							title: "PRIORIDADE",
							value: calcs.prioridadeStr,
							tooltip: "Calculada com base na pontuação de impacto dividida por esforço e complexidade.",
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, { className: "h-4 w-4 text-orange-600" }),
							color: calcs.prioridadeTone === "red" ? "red" : calcs.prioridadeTone === "orange" ? "orange" : "emerald"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
							title: "ROI",
							value: `${calcs.roi.toFixed(1)}%`,
							tooltip: calcs.roiMem,
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "h-4 w-4 text-[#FF6900]" }),
							color: "orange"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
							title: "PAYBACK (M)",
							value: calcs.payback.toFixed(1),
							tooltip: calcs.paybackMem,
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Coins, { className: "h-4 w-4 text-[#FEDC00]" }),
							color: "yellow"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
							title: "FTE LIBERADO",
							value: calcs.fteLiberado.toFixed(3),
							tooltip: calcs.fteLiberadoMem,
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-4 w-4 text-emerald-600" }),
							color: "emerald"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
							title: "RISCO OP.",
							value: calcs.riscoOperacional.toFixed(1),
							tooltip: calcs.riscoOperacionalMem,
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-4 w-4 text-amber-600" }),
							color: "yellow"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
							title: "SCORE AUT.",
							value: `${calcs.scoreAutomacao} / 40`,
							tooltip: calcs.scoreAutomacaoMem,
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wrench, { className: "h-4 w-4 text-emerald-600" }),
							color: "emerald"
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-6",
				id: "core_form_fields_sections",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
						title: "1 · Identificação da Iniciativa",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheckBig, { className: "h-4 w-4" }),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { label: "ID DO PROJETO VINCULADO" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									value: projetoId || "—",
									disabled: true,
									className: "h-9 w-full rounded-md border border-[#DBDBDB] bg-neutral-50 px-3 text-[12px] text-slate-500 cursor-not-allowed outline-none"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { label: "CÓDIGO DA INICIATIVA" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									value: activeInitiative?.codigo || "(gerado ao salvar)",
									disabled: true,
									className: "h-9 w-full rounded-md border border-[#DBDBDB] bg-neutral-50 px-3 text-[12px] text-slate-500 cursor-not-allowed outline-none"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { label: "STATUS DA INICIATIVA" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PicklistField, {
									categoria: "Status",
									value: form.status,
									disabled: !isAdmin,
									onChange: (v) => handleFieldChange("status", v)
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "sm:col-span-2 lg:col-span-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { label: "NOME DA INICIATIVA * (TÍTULO DO CARD)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										required: true,
										disabled: !isAdmin,
										value: form.titulo,
										placeholder: "Ex: Automatizar Conciliação Financeira...",
										onChange: (e) => handleFieldChange("titulo", e.target.value),
										onBlur: handleFieldBlur,
										className: "h-9 w-full rounded-md border border-[#DBDBDB] px-3 text-[12.5px] font-medium outline-none focus:border-[#268200] focus:ring-1 focus:ring-[#268200] text-slate-700 disabled:bg-slate-50"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "sm:col-span-2 lg:col-span-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { label: "DESCRIÇÃO DETALHADA" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
										disabled: !isAdmin,
										value: form.descricao,
										placeholder: "Descreva a dor, escopo e metas gerais da iniciativa...",
										onChange: (e) => handleFieldChange("descricao", e.target.value),
										onBlur: handleFieldBlur,
										rows: 3,
										className: "w-full rounded-md border border-[#DBDBDB] p-3 text-[12.5px] font-medium outline-none focus:border-[#268200] focus:ring-1 focus:ring-[#268200] text-slate-700 disabled:bg-slate-50"
									})]
								})
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
						title: "2 · Governança e Responsabilidades",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-4 w-4" }),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { label: "VICE-PRESIDENTE" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PicklistField, {
									categoria: "Vice-Presidente",
									value: form.vice_presidente,
									disabled: !isAdmin,
									onChange: (v) => handleFieldChange("vice_presidente", v)
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { label: "DIRETOR" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PicklistField, {
									categoria: "Diretor",
									value: form.diretor,
									disabled: !isAdmin,
									onChange: (v) => handleFieldChange("diretor", v)
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { label: "GERENTE" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PicklistField, {
									categoria: "Gerente",
									value: form.gerente,
									disabled: !isAdmin,
									onChange: (v) => handleFieldChange("gerente", v)
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { label: "ÁREA RESPONSÁVEL" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PicklistField, {
									categoria: "Área Responsável",
									value: form.area_responsavel,
									disabled: !isAdmin,
									onChange: (v) => handleFieldChange("area_responsavel", v)
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { label: "GESTOR RESPONSÁVEL" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PicklistField, {
									categoria: "Gestor Responsável",
									value: form.gestor_responsavel,
									disabled: !isAdmin,
									onChange: (v) => handleFieldChange("gestor_responsavel", v)
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { label: "ANALISTA RESPONSÁVEL" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PicklistField, {
									categoria: "Analista Responsável",
									value: form.analista_responsavel,
									disabled: !isAdmin,
									onChange: (v) => handleFieldChange("analista_responsavel", v)
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { label: "DATA DO DIAGNÓSTICO" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "date",
									disabled: !isAdmin,
									value: form.data_diagnostico,
									onChange: (e) => handleFieldChange("data_diagnostico", e.target.value),
									onBlur: handleFieldBlur,
									className: "h-9 w-full rounded-md border border-[#DBDBDB] px-3 text-[12.5px] font-medium outline-none focus:border-[#268200] focus:ring-1 focus:ring-[#268200] text-slate-700 disabled:bg-slate-50 bg-white"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { label: "CLIENTE DO PROCESSO" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PicklistField, {
									categoria: "Cliente do Processo",
									value: form.cliente_processo,
									multi: true,
									disabled: !isAdmin,
									onChange: (v) => handleFieldChange("cliente_processo", v)
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { label: "PROCESSO" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PicklistField, {
									categoria: "Processo",
									value: form.processo,
									disabled: !isAdmin,
									onChange: (v) => handleFieldChange("processo", v)
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "sm:col-span-2 lg:col-span-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { label: "OBJETIVO DO PROCESSO" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
										disabled: !isAdmin,
										value: form.objetivo_processo,
										placeholder: "Descreva o objetivo fim do macroprocesso ou processo diagnosticado...",
										onChange: (e) => handleFieldChange("objetivo_processo", e.target.value),
										onBlur: handleFieldBlur,
										rows: 2,
										className: "w-full rounded-md border border-[#DBDBDB] p-3 text-[12.5px] font-medium outline-none focus:border-[#268200] focus:ring-1 focus:ring-[#268200] text-slate-700 disabled:bg-slate-50"
									})]
								})
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
						title: "3 · Diagnóstico da Dor",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-4 w-4" }),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "sm:col-span-2 lg:col-span-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { label: "DOR IDENTIFICADA (PROBLEMA)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
										disabled: !isAdmin,
										value: form.dor_identificada,
										placeholder: "Ex: Trabalho repetitivo de copiar dados entre 3 sistemas legados, gerando erros e atrasos de 2 dias...",
										onChange: (e) => handleFieldChange("dor_identificada", e.target.value),
										onBlur: handleFieldBlur,
										rows: 2,
										className: "w-full rounded-md border border-[#DBDBDB] p-3 text-[12.5px] font-medium outline-none focus:border-[#268200] focus:ring-1 focus:ring-[#268200] text-slate-700 disabled:bg-slate-50"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "sm:col-span-2 lg:col-span-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { label: "CAUSA RAIZ INICIAL DETECTADA" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
										disabled: !isAdmin,
										value: form.causa_raiz_inicial,
										placeholder: "Ex: Sistemas legados não integrados por API, exigindo validação manual...",
										onChange: (e) => handleFieldChange("causa_raiz_inicial", e.target.value),
										onBlur: handleFieldBlur,
										rows: 2,
										className: "w-full rounded-md border border-[#DBDBDB] p-3 text-[12.5px] font-medium outline-none focus:border-[#268200] focus:ring-1 focus:ring-[#268200] text-slate-700 disabled:bg-slate-50"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { label: "CATEGORIA DA DOR" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PicklistField, {
									categoria: "Categoria da Dor",
									value: form.categoria_dor,
									disabled: !isAdmin,
									onChange: (v) => handleFieldChange("categoria_dor", v)
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { label: "FREQUÊNCIA" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PicklistField, {
									categoria: "Frequência",
									value: form.frequencia,
									disabled: !isAdmin,
									onChange: (v) => handleFieldChange("frequencia", v)
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { label: "SISTEMA PRINCIPAL UTILIZADO" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PicklistField, {
									categoria: "Sistema Utilizado",
									value: form.sistemas_paralelos || [],
									multi: true,
									disabled: !isAdmin,
									onChange: (v) => handleFieldChange("sistemas_paralelos", v)
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "sm:col-span-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { label: "DESPERDÍCIOS LEAN DETECTADOS" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PicklistField, {
										categoria: "Desperdícios Lean",
										value: form.desperdicios_lean,
										multi: true,
										disabled: !isAdmin,
										onChange: (v) => handleFieldChange("desperdicios_lean", v)
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-3 gap-3 col-span-1 sm:col-span-3 lg:col-span-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { label: "IMP. CLIENTE" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleField, {
											value: form.impacto_cliente_sn,
											disabled: !isAdmin,
											onChange: (v) => handleFieldChange("impacto_cliente_sn", v)
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { label: "IMP. FINAN." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleField, {
											value: form.impacto_financeiro_sn,
											disabled: !isAdmin,
											onChange: (v) => handleFieldChange("impacto_financeiro_sn", v)
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { label: "IMP. COMPLIANCE" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleField, {
											value: form.impacto_compliance_sn,
											disabled: !isAdmin,
											onChange: (v) => handleFieldChange("impacto_compliance_sn", v)
										})] })
									]
								})
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
						title: "4 · Componente de Tempo",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-4 w-4" }),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
									label: "TEMPO MÍNIMO (MIN)",
									durationInMinutes: form.tempo_min
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "number",
									min: "0",
									disabled: !isAdmin,
									value: form.tempo_min,
									onChange: (e) => handleFieldChange("tempo_min", Number(e.target.value)),
									onBlur: handleFieldBlur,
									className: "h-9 w-full rounded-md border border-[#DBDBDB] px-3 text-[12.5px] outline-none focus:border-[#268200] focus:ring-1 focus:ring-[#268200] text-slate-700 disabled:bg-slate-50"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
									label: "TEMPO MÁXIMO (MIN)",
									durationInMinutes: form.tempo_max
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "number",
									min: "0",
									disabled: !isAdmin,
									value: form.tempo_max,
									onChange: (e) => handleFieldChange("tempo_max", Number(e.target.value)),
									onBlur: handleFieldBlur,
									className: "h-9 w-full rounded-md border border-[#DBDBDB] px-3 text-[12.5px] outline-none focus:border-[#268200] focus:ring-1 focus:ring-[#268200] text-slate-700 disabled:bg-slate-50"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
									label: "TEMPO MÉDIO ATUAL (MIN)",
									tooltip: tempoMedio.memoria,
									durationInMinutes: tempoMedio.value
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									disabled: true,
									value: tempoMedio.value.toFixed(2),
									className: "h-9 w-full rounded-md border border-[#DBDBDB] bg-yellow-50 px-3 text-[12.5px] font-extrabold text-neutral-800 cursor-not-allowed outline-none"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
									label: "TEMPO IDEAL (MIN)",
									durationInMinutes: form.tempo_ideal
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "number",
									min: "0",
									disabled: !isAdmin,
									value: form.tempo_ideal,
									onChange: (e) => handleFieldChange("tempo_ideal", Number(e.target.value)),
									onBlur: handleFieldBlur,
									className: "h-9 w-full rounded-md border border-[#DBDBDB] px-3 text-[12.5px] outline-none focus:border-[#268200] focus:ring-1 focus:ring-[#268200] text-slate-700 disabled:bg-slate-50"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
									label: "TEMPO DE ESPERA / GARGALO (MIN)",
									durationInMinutes: form.tempo_espera
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "number",
									min: "0",
									disabled: !isAdmin,
									value: form.tempo_espera,
									onChange: (e) => handleFieldChange("tempo_espera", Number(e.target.value)),
									onBlur: handleFieldBlur,
									className: "h-9 w-full rounded-md border border-[#DBDBDB] px-3 text-[12.5px] outline-none focus:border-[#268200] focus:ring-1 focus:ring-[#268200] text-slate-700 disabled:bg-slate-50"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
									label: "TEMPO FUTURO ESTIMADO (MIN)",
									durationInMinutes: form.tempo_futuro
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "number",
									min: "0",
									disabled: !isAdmin,
									value: form.tempo_futuro,
									onChange: (e) => handleFieldChange("tempo_futuro", Number(e.target.value)),
									onBlur: handleFieldBlur,
									className: "h-9 w-full rounded-md border border-[#DBDBDB] px-3 text-[12.5px] outline-none focus:border-[#268200] focus:ring-1 focus:ring-[#268200] text-slate-700 disabled:bg-slate-50"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
									label: "GANHO DE TEMPO ESPERADO (MIN)",
									tooltip: ganhoTempo.memoria,
									durationInMinutes: ganhoTempo.value
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									disabled: true,
									value: ganhoTempo.value.toFixed(2),
									className: "h-9 w-full rounded-md border border-[#DBDBDB] bg-yellow-50 px-3 text-[12.5px] font-extrabold text-neutral-800 cursor-not-allowed outline-none"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
									label: "PERCENTUAL DE REDUÇÃO (%)",
									tooltip: percReducao.memoria
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									disabled: true,
									value: `${percReducao.value.toFixed(1)}%`,
									className: "h-9 w-full rounded-md border border-[#DBDBDB] bg-yellow-50 px-3 text-[12.5px] font-extrabold text-neutral-800 cursor-not-allowed outline-none"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "sm:col-span-2 lg:col-span-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { label: "MOTIVO DA REDUÇÃO DE TEMPO" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										disabled: !isAdmin,
										value: form.motivo_reducao,
										placeholder: "Fim de retrabalhos, eliminação de digitação...",
										onChange: (e) => handleFieldChange("motivo_reducao", e.target.value),
										onBlur: handleFieldBlur,
										className: "h-9 w-full rounded-md border border-[#DBDBDB] px-3 text-[12.5px] outline-none focus:border-[#268200] focus:ring-1 focus:ring-[#268200] text-slate-700 disabled:bg-slate-50"
									})]
								})
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
						title: "5 · Componente de Volume",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Percent, { className: "h-4 w-4" }),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { label: "EXECUÇÕES POR DIA" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "number",
									min: "0",
									disabled: !isAdmin,
									value: form.execucoes_dia,
									onChange: (e) => handleFieldChange("execucoes_dia", Number(e.target.value)),
									onBlur: handleFieldBlur,
									className: "h-9 w-full rounded-md border border-[#DBDBDB] px-3 text-[12.5px] outline-none focus:border-[#268200] focus:ring-1 focus:ring-[#268200] text-slate-700 disabled:bg-slate-50"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { label: "EXECUÇÕES POR SEMANA" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "number",
									min: "0",
									disabled: !isAdmin,
									value: form.execucoes_semana,
									onChange: (e) => handleFieldChange("execucoes_semana", Number(e.target.value)),
									onBlur: handleFieldBlur,
									className: "h-9 w-full rounded-md border border-[#DBDBDB] px-3 text-[12.5px] outline-none focus:border-[#268200] focus:ring-1 focus:ring-[#268200] text-slate-700 disabled:bg-slate-50"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { label: "EXECUÇÕES POR MÊS" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "number",
									min: "0",
									disabled: !isAdmin,
									value: form.execucoes_mes,
									onChange: (e) => handleFieldChange("execucoes_mes", Number(e.target.value)),
									onBlur: handleFieldBlur,
									className: "h-9 w-full rounded-md border border-[#DBDBDB] px-3 text-[12.5px] outline-none focus:border-[#268200] focus:ring-1 focus:ring-[#268200] text-slate-700 disabled:bg-slate-50"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
									label: "HORAS DESPERDIÇADAS/MÊS",
									tooltip: horasDesperdicadas.memoria,
									durationInMinutes: horasDesperdicadas.value * 60
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									disabled: true,
									value: `${horasDesperdicadas.value.toLocaleString("pt-BR", {
										minimumFractionDigits: 2,
										maximumFractionDigits: 2
									})} horas (${formatMinutesToHoursMinutesSuffix(horasDesperdicadas.value * 60)})`,
									className: "h-9 w-full rounded-md border border-[#DBDBDB] bg-yellow-50 px-3 text-[12.5px] font-extrabold text-neutral-800 cursor-not-allowed outline-none"
								})] })
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
						title: "6 · Componente de Qualidade",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheckBig, { className: "h-4 w-4 text-emerald-600" }),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { label: "TAXA DE ERRO / RETRABALHO (%)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "number",
									min: "0",
									max: "100",
									disabled: !isAdmin,
									value: form.taxa_erro,
									onChange: (e) => handleFieldChange("taxa_erro", Number(e.target.value)),
									onBlur: handleFieldBlur,
									className: "h-9 w-full rounded-md border border-[#DBDBDB] px-3 text-[12.5px] outline-none focus:border-[#268200] focus:ring-1 focus:ring-[#268200] text-slate-700 disabled:bg-slate-50"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { label: "OUTROS REPROCESSOS (%)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "number",
									min: "0",
									max: "100",
									disabled: !isAdmin,
									value: form.retrabalho,
									onChange: (e) => handleFieldChange("retrabalho", Number(e.target.value)),
									onBlur: handleFieldBlur,
									className: "h-9 w-full rounded-md border border-[#DBDBDB] px-3 text-[12.5px] outline-none focus:border-[#268200] focus:ring-1 focus:ring-[#268200] text-slate-700 disabled:bg-slate-50"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { label: "SLA EXISTE?" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleField, {
									value: form.sla_existe,
									disabled: !isAdmin,
									onChange: (v) => handleFieldChange("sla_existe", v)
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
									label: "SLA ATUAL (MIN)",
									durationInMinutes: form.sla_min
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "number",
									min: "0",
									disabled: !isAdmin || !form.sla_existe,
									value: form.sla_min,
									onChange: (e) => handleFieldChange("sla_min", Number(e.target.value)),
									onBlur: handleFieldBlur,
									className: "h-9 w-full rounded-md border border-[#DBDBDB] px-3 text-[12.5px] outline-none focus:border-[#268200] focus:ring-1 focus:ring-[#268200] text-slate-700 disabled:bg-slate-50 bg-white"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
									label: "ÍNDICE DE QUALIDADE",
									tooltip: indiceQualidade.memoria
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									disabled: true,
									value: indiceQualidade.value.toFixed(1),
									className: "h-9 w-full rounded-md border border-[#DBDBDB] bg-yellow-50 px-3 text-[12.5px] font-extrabold text-neutral-800 cursor-not-allowed outline-none"
								})] })
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
						title: "7 · Componente de Automação",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wrench, { className: "h-4 w-4" }),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-3 gap-2 sm:col-span-2 lg:col-span-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { label: "ATIVIDADE MANUAL" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleField, {
											value: form.atividade_manual,
											disabled: !isAdmin,
											onChange: (v) => handleFieldChange("atividade_manual", v)
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { label: "DIGITAÇÃO MANUAL" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleField, {
											value: form.digitacao_manual,
											disabled: !isAdmin,
											onChange: (v) => handleFieldChange("digitacao_manual", v)
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { label: "COPIA E COLA" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleField, {
											value: form.copia_cola,
											disabled: !isAdmin,
											onChange: (v) => handleFieldChange("copia_cola", v)
										})] })
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { label: "SISTEMAS CONECTADOS" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PicklistField, {
									categoria: "Sistemas Paralelos",
									value: form.sistemas_paralelos,
									multi: true,
									disabled: !isAdmin,
									onChange: (v) => handleFieldChange("sistemas_paralelos", v)
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { label: "ALTERNÂNCIA DE TELAS" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PicklistField, {
									categoria: "Alternância de Telas",
									value: form.alternancia_telas,
									multi: true,
									disabled: !isAdmin,
									onChange: (v) => handleFieldChange("alternancia_telas", v)
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { label: "LOCAIS DE CONSULTA" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PicklistField, {
									categoria: "Locais de Consulta",
									value: form.locais_consulta,
									multi: true,
									disabled: !isAdmin,
									onChange: (v) => handleFieldChange("locais_consulta", v)
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { label: "PASSOS MANUAIS" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PicklistField, {
									categoria: "Passos Manuais",
									value: form.passos_manuais,
									multi: true,
									disabled: !isAdmin,
									onChange: (v) => handleFieldChange("passos_manuais", v)
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-2 gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { label: "EXCEL PARALELO?" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleField, {
										value: form.excel_paralelo,
										disabled: !isAdmin,
										onChange: (v) => handleFieldChange("excel_paralelo", v)
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { label: "QUANTIDADE" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "number",
										min: "0",
										disabled: !isAdmin || !form.excel_paralelo,
										value: form.qtd_planilhas,
										onChange: (e) => handleFieldChange("qtd_planilhas", Number(e.target.value)),
										onBlur: handleFieldBlur,
										className: "h-9 w-full rounded-md border border-[#DBDBDB] px-3 text-[12.5px] outline-none focus:border-[#268200] focus:ring-1 focus:ring-[#268200] text-slate-700 disabled:bg-slate-50"
									})] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { label: "LOCAL DAS PLANILHAS" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PicklistField, {
									categoria: "Local das Planilhas",
									value: form.local_planilhas,
									multi: true,
									disabled: !isAdmin,
									onChange: (v) => handleFieldChange("local_planilhas", v)
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { label: "INTEGRAÇÕES NECESSÁRIAS" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PicklistField, {
									categoria: "Integrações Necessárias",
									value: form.integracoes_necessarias,
									multi: true,
									disabled: !isAdmin,
									onChange: (v) => handleFieldChange("integracoes_necessarias", v)
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { label: "QUANTIDADE DE REGRAS" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PicklistField, {
									categoria: "Quantidade de Regras",
									value: form.qtd_regras,
									disabled: !isAdmin,
									onChange: (v) => handleFieldChange("qtd_regras", v)
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { label: "VOLUME DE EXCEÇÕES" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PicklistField, {
									categoria: "Volume de Exceções",
									value: form.volume_excecoes,
									disabled: !isAdmin,
									onChange: (v) => handleFieldChange("volume_excecoes", v)
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "sm:col-span-2 lg:col-span-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { label: "SOLUÇÃO DE AUTOMAÇÃO SUGERIDA" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
										disabled: !isAdmin,
										value: form.automacao_sugerida,
										placeholder: "Ex: Desenvolver robô RPA em Python para extrair os dados e inserir na API do SAP...",
										onChange: (e) => handleFieldChange("automacao_sugerida", e.target.value),
										onBlur: handleFieldBlur,
										rows: 2,
										className: "w-full rounded-md border border-[#DBDBDB] p-3 text-[12.5px] font-medium outline-none focus:border-[#268200] focus:ring-1 focus:ring-[#268200] text-slate-700 disabled:bg-slate-50"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-2 gap-4 sm:col-span-2 lg:col-span-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
										label: "SCORE DE AUTOMAÇÃO (0-40)",
										tooltip: calcs.scoreAutomacaoMem
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										disabled: true,
										value: `${calcs.scoreAutomacao} / 40`,
										className: "h-9 w-full rounded-md border border-[#DBDBDB] bg-yellow-50 px-3 text-[12.5px] font-extrabold text-neutral-800 cursor-not-allowed outline-none"
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
										label: "COMPLEXIDADE DA AUTOMAÇÃO",
										tooltip: complexidadeAut.memoria
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										disabled: true,
										value: `${complexidadeAut.value} pts (${complexidadeAut.label})`,
										className: "h-9 w-full rounded-md border border-[#DBDBDB] bg-yellow-50 px-3 text-[12.5px] font-extrabold text-[#268200] cursor-not-allowed outline-none"
									})] })]
								})
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SectionCard, {
						title: "8 · Componente de Pessoas",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-4 w-4 text-emerald-600" }),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { label: "HC ATUAL DA ÁREA (FTE)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "number",
									min: "0",
									step: "0.01",
									disabled: !isAdmin,
									value: form.hc_atual,
									onChange: (e) => handleFieldChange("hc_atual", Number(e.target.value)),
									onBlur: handleFieldBlur,
									className: "h-9 w-full rounded-md border border-[#DBDBDB] px-3 text-[12.5px] outline-none focus:border-[#268200] focus:ring-1 focus:ring-[#268200] text-slate-700 disabled:bg-slate-50"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { label: "NÚMERO DE PESSOAS ENVOLVIDAS" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "number",
									min: "0",
									disabled: !isAdmin,
									value: form.pessoas_envolvidas,
									onChange: (e) => handleFieldChange("pessoas_envolvidas", Number(e.target.value)),
									onBlur: handleFieldBlur,
									className: "h-9 w-full rounded-md border border-[#DBDBDB] px-3 text-[12.5px] outline-none focus:border-[#268200] focus:ring-1 focus:ring-[#268200] text-slate-700 disabled:bg-slate-50"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { label: "DEP. PESSOA CHAVE?" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleField, {
									value: form.dep_pessoa_chave,
									disabled: !isAdmin,
									onChange: (v) => handleFieldChange("dep_pessoa_chave", v)
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { label: "TEMPO CAPACITAÇÃO (H/DIA)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "number",
									min: "0",
									disabled: !isAdmin,
									value: form.tempo_capacitacao,
									onChange: (e) => handleFieldChange("tempo_capacitacao", Number(e.target.value)),
									onBlur: handleFieldBlur,
									className: "h-9 w-full rounded-md border border-[#DBDBDB] px-3 text-[12.5px] outline-none focus:border-[#268200] focus:ring-1 focus:ring-[#268200] text-slate-700 disabled:bg-slate-50"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { label: "PESO OPERACIONAL" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "number",
									min: "0",
									disabled: !isAdmin,
									value: pesoOperacional,
									onChange: (e) => handlePesoOperacionalChange(Number(e.target.value)),
									className: "h-9 w-full rounded-md border border-[#DBDBDB] px-3 text-[12.5px] outline-none focus:border-[#268200] focus:ring-1 focus:ring-[#268200] text-slate-700 disabled:bg-slate-50 bg-white",
									placeholder: "Ex: 5"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
									label: "% DE PARTICIPAÇÃO",
									tooltip: pctParticipacao.memoria
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									disabled: true,
									value: `${pctParticipacao.value.toFixed(1)}%`,
									className: "h-9 w-full rounded-md border border-[#DBDBDB] bg-yellow-50 px-3 text-[12.5px] font-extrabold text-neutral-800 cursor-not-allowed outline-none"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
									label: "RISCO OPERACIONAL",
									tooltip: calcs.riscoOperacionalMem
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									disabled: true,
									value: calcs.riscoOperacional.toFixed(1),
									className: "h-9 w-full rounded-md border border-[#DBDBDB] bg-yellow-50 px-3 text-[12.5px] font-extrabold text-neutral-800 cursor-not-allowed outline-none"
								})] })
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 border-t border-slate-100 pt-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { label: "DETALHES" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								disabled: !isAdmin,
								value: pessoasDetalhes,
								onChange: (e) => handlePessoasDetalhesChange(e.target.value),
								className: "mt-1 w-full min-h-[70px] rounded-md border border-[#DBDBDB] p-3 text-[12.5px] outline-none focus:border-[#268200] focus:ring-1 focus:ring-[#268200] text-slate-700 disabled:bg-slate-50 resize-y",
								placeholder: "Descreva aqui detalhes adicionais do componente de pessoas, tais como observações de capacitação, competências ou restrições..."
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
						title: "Distribuição de FTE por Área",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-4 w-4 text-[#268200]" }),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "space-y-2",
									children: fteDistrib.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex gap-4 items-center bg-slate-50 p-2 rounded-lg border border-slate-100",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
													className: "text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1",
													children: "Nome da Área"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													type: "text",
													disabled: !isAdmin,
													value: item.area,
													onChange: (e) => handleAreaNameChange(index, e.target.value),
													className: "h-9 w-full rounded-md border border-[#DBDBDB] px-3 text-[12.5px] outline-none focus:border-[#268200] focus:ring-1 focus:ring-[#268200] text-slate-700 bg-white",
													placeholder: "Ex: Financeiro"
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "w-32",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
													className: "text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1",
													children: "FTE Alocado"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													type: "number",
													min: "0",
													max: "999",
													step: "0.01",
													disabled: !isAdmin,
													value: item.fte || 0,
													onChange: (e) => handleFteDistribChange(index, Number(e.target.value)),
													className: "h-9 w-full rounded-md border border-[#DBDBDB] px-3 text-[12.5px] outline-none focus:border-[#268200] focus:ring-1 focus:ring-[#268200] text-slate-700 bg-white",
													placeholder: "0.00"
												})]
											}),
											isAdmin && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "self-end pb-1",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													type: "button",
													onClick: () => handleRemoveArea(index),
													className: "p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors",
													title: "Remover Linha",
													children: "🗑️"
												})
											})
										]
									}, index))
								}),
								isAdmin && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex justify-start",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: handleAddArea,
										className: "flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors border border-slate-200",
										children: "➕ Adicionar Área"
									})
								}),
								isFteValidationValid ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "p-3 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center gap-2 text-emerald-800 text-[11.5px] font-medium",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheckBig, { className: "h-4.5 w-4.5 text-emerald-600 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
										"Soma dos FTEs distribuídos (",
										sumFteDistrib.toFixed(2),
										" FTE) coincide perfeitamente com o HC Atual da Área (",
										Number(form.hc_atual || 0).toFixed(2),
										" FTE)."
									] })]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-800 text-[11.5px] font-medium",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-4.5 w-4.5 text-red-600 shrink-0 animate-pulse" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
										"A soma dos FTEs distribuídos (",
										sumFteDistrib.toFixed(2),
										" FTE) deve ser exatamente igual ao HC Atual da Área (",
										Number(form.hc_atual || 0).toFixed(2),
										" FTE). Por favor, ajuste as alocações. Alterações pendentes de validação não serão salvas!"
									] })]
								})
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
						title: "Gestão da Capacidade",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-4 w-4 text-[#268200]" }),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-5 text-slate-800",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "bg-slate-50/75 p-2 rounded-lg border border-slate-100 flex flex-col justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
												label: "HC",
												tooltip: gestaoCapacidade.hc.tool
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[14px] font-bold mt-1 text-slate-900",
												children: gestaoCapacidade.hc.val
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "bg-slate-50/75 p-2 rounded-lg border border-slate-100 flex flex-col justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
												label: "FTE",
												tooltip: gestaoCapacidade.fte.tool
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[14px] font-bold mt-1 text-slate-900",
												children: gestaoCapacidade.fte.val.toFixed(3)
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "bg-slate-50/75 p-2 rounded-lg border border-slate-100 flex flex-col justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
												label: "% PARTICIPAÇÃO",
												tooltip: gestaoCapacidade.part.tool
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-[14px] font-bold mt-1 text-slate-900",
												children: [gestaoCapacidade.part.val.toFixed(1), "%"]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "bg-slate-50/75 p-2 rounded-lg border border-slate-100 flex flex-col justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
												label: "PESO OPERACIONAL",
												tooltip: gestaoCapacidade.pesoOp.tool
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[14px] font-bold mt-1 text-slate-900",
												children: gestaoCapacidade.pesoOp.val.toLocaleString("pt-BR")
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "bg-slate-50/75 p-2 rounded-lg border border-slate-100 flex flex-col justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
												label: "PESO OP. PONDERADO",
												tooltip: gestaoCapacidade.pesoPond.tool
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[14px] font-bold mt-1 text-slate-900",
												children: gestaoCapacidade.pesoPond.val.toLocaleString("pt-BR")
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "bg-slate-50/75 p-2 rounded-lg border border-slate-100 flex flex-col justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
												label: "OCUPAÇÃO",
												tooltip: gestaoCapacidade.ocupacao.tool
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-[14px] font-bold mt-1 text-slate-900",
												children: [gestaoCapacidade.ocupacao.val.toFixed(1), "%"]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "bg-slate-50/75 p-2 rounded-lg border border-slate-100 flex flex-col justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
												label: "CAPACIDADE",
												tooltip: gestaoCapacidade.capacidade.tool
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[14px] font-bold mt-1 text-slate-900",
												children: gestaoCapacidade.capacidade.val.toLocaleString("pt-BR", { maximumFractionDigits: 0 })
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "bg-slate-50/75 p-2 rounded-lg border border-slate-100 flex flex-col justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
												label: "PRODUTIVIDADE",
												tooltip: gestaoCapacidade.produtividade.tool
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-[14px] font-bold mt-1 text-slate-900",
												children: [gestaoCapacidade.produtividade.val.toFixed(2), "/h"]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "bg-slate-50/75 p-2 rounded-lg border border-slate-100 flex flex-col justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
												label: "TEMPO MÉDIO",
												tooltip: gestaoCapacidade.tempoMedio.tool
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-[14px] font-bold mt-1 text-slate-900",
												children: [gestaoCapacidade.tempoMedio.val.toFixed(1), " min"]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "bg-slate-50/75 p-2 rounded-lg border border-slate-100 flex flex-col justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
												label: "DEMANDA DE FTE",
												tooltip: gestaoCapacidade.demandaFte.tool
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[14px] font-bold mt-1 text-slate-900",
												children: gestaoCapacidade.demandaFte.val.toFixed(3)
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "bg-slate-50/75 p-2 rounded-lg border border-slate-100 flex flex-col justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
												label: "UTILIZAÇÃO",
												tooltip: gestaoCapacidade.utilizacao.tool
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-[14px] font-bold mt-1 text-slate-900",
												children: [gestaoCapacidade.utilizacao.val.toFixed(1), "%"]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "bg-slate-50/75 p-2 rounded-lg border border-slate-100 flex flex-col justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
												label: "EFICIÊNCIA",
												tooltip: gestaoCapacidade.eficiencia.tool
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-[14px] font-bold mt-1 text-slate-900",
												children: [gestaoCapacidade.eficiencia.val.toFixed(1), "%"]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "bg-slate-50/75 p-2 rounded-lg border border-slate-100 flex flex-col justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
												label: "GANHO DE PROD.",
												tooltip: gestaoCapacidade.ganhoProd.tool
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-[14px] font-bold mt-1 text-slate-900",
												children: [gestaoCapacidade.ganhoProd.val.toFixed(1), "%"]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "bg-slate-50/75 p-2 rounded-lg border border-slate-100 flex flex-col justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
												label: "HORAS ECONOMIZADAS",
												tooltip: gestaoCapacidade.horasEcon.tool
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-[14px] font-bold mt-1 text-slate-900",
												children: [gestaoCapacidade.horasEcon.val.toFixed(2), " h"]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "bg-slate-50/75 p-2 rounded-lg border border-slate-100 flex flex-col justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
												label: "ECONOMIA DE FTE",
												tooltip: gestaoCapacidade.econFte.tool
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[14px] font-bold mt-1 text-slate-900",
												children: gestaoCapacidade.econFte.val.toFixed(3)
											})]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "p-2.5 bg-slate-50 border border-slate-100 rounded-lg text-[10.5px] text-slate-500 leading-normal font-medium",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-bold text-slate-700",
											children: "Nota de Premissa:"
										}),
										" Para todos os cálculos de capacidade e esforço acima, é considerada a jornada produtiva padrão de",
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-extrabold text-slate-700",
											children: "165 horas úteis por mês"
										}),
										" por colaborador (FTE), correspondendo a 8 horas diárias descontando intervalos e tempos de fadiga/ociosidade técnica."
									]
								}),
								(() => {
									const hc = Number(form.hc_atual || 0);
									const exec_mes = Number(form.execucoes_mes || 0);
									const t_medio = asisSteps.length > 0 ? asisSteps.reduce((acc, step) => acc + Number(step.tempo ?? 0), 0) : calcTempoMedio(form).value || 0;
									const t_futuro = tobeSteps.length > 0 ? tobeSteps.reduce((acc, step) => acc + Number(step.tempo ?? 0), 0) : Number(form.tempo_futuro || 0);
									const fteAtual = t_medio * exec_mes / 60 / 165;
									const fteFuturo = t_futuro * exec_mes / 60 / 165;
									const ocupacao = hc > 0 ? fteAtual / hc * 100 : 0;
									const ocupacaoFutura = hc > 0 ? fteFuturo / hc * 100 : 0;
									const ganhoEficiencia = t_medio > 0 ? (t_medio - t_futuro) / t_medio * 100 : 0;
									const fteSalvo = Math.max(0, fteAtual - fteFuturo);
									const horasSalvas = fteSalvo * 165;
									let statusCard = {
										bg: "bg-emerald-50 border-emerald-100 text-emerald-800",
										text: "Estável / Saudável",
										desc: "A equipe possui capacidade de sobra ou está perfeitamente equilibrada para absorver a carga de trabalho atual.",
										badge: "bg-emerald-100 text-emerald-800"
									};
									if (ocupacao > 115) statusCard = {
										bg: "bg-red-50 border-red-100 text-red-800",
										text: "CRÍTICO - Alta Sobrecarga",
										desc: `Equipe severamente sobrecarregada, operando a ${ocupacao.toFixed(1)}% de sua capacidade. Risco de fadiga, gargalos no fluxo de valor e alta taxa de erros.`,
										badge: "bg-red-100 text-red-800"
									};
									else if (ocupacao > 95) statusCard = {
										bg: "bg-amber-50 border-amber-100 text-amber-800",
										text: "ALERTA - Limite Produtivo",
										desc: `Equipe trabalhando próxima do teto operacional (${ocupacao.toFixed(1)}%). Qualquer oscilação de volume causará atrasos ou horas extras.`,
										badge: "bg-amber-100 text-amber-800"
									};
									let hcRecomendacao = "";
									let hcTomDeDecisao = "";
									if (fteFuturo > hc) {
										const hcDiff = Math.ceil(fteFuturo) - hc;
										hcRecomendacao = `⚠️ Aumentar em +${hcDiff} HC(s)`;
										hcTomDeDecisao = `Mesmo após otimizar e aplicar as melhorias (TO BE), o tempo de processamento necessário (${fteFuturo.toFixed(2)} FTE) ainda excede a capacidade atual de ${hc} pessoas. Sugere-se alocar mais ${hcDiff} colaborador(es) para estabilizar o fluxo sem sobrecarga.`;
									} else if (ocupacaoFutura > 100 && fteFuturo <= hc) {
										hcRecomendacao = `🔄 Balanceamento Interno`;
										hcTomDeDecisao = `As melhorias reduzem a sobrecarga para ${ocupacaoFutura.toFixed(1)}%. Não é necessário contratar novas pessoas, mas sim otimizar a distribuição interna de tarefas e balancear o fluxo entre os turnos.`;
									} else {
										hcRecomendacao = `✅ Manter Quadro Atual e Reatribuir`;
										hcTomDeDecisao = `Com o novo processo (TO BE), a ocupação cairá para ${ocupacaoFutura.toFixed(1)}%, gerando um excedente produtivo de ${fteSalvo.toFixed(2)} FTE (${horasSalvas.toFixed(1)} horas/mês livres). Esta capacidade ociosa qualificada pode ser reatribuída para tarefas estratégicas de maior valor agregado.`;
									}
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-5 border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "bg-slate-50 border-b border-slate-100 px-4 py-3 flex items-center justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "flex items-center gap-2",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-[13px] font-black text-slate-800 uppercase tracking-tight",
													children: "🔍 Diagnóstico Lean de Capacidade e Dimensionamento (Kaizen)"
												})
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[9px] font-black tracking-wider uppercase bg-blue-50 border border-blue-100 text-blue-700 px-2.5 py-0.5 rounded-full",
												children: "Mapeamento Ativo"
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "p-4 space-y-4",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-5",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "bg-slate-50/50 p-3 rounded-lg border border-slate-100 flex flex-col justify-between",
															children: [
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: "text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-1",
																	children: "Capacidade Atual"
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																	className: "text-[14px] font-black text-slate-800",
																	children: [
																		hc > 0 ? (hc * 165).toFixed(0) : "0",
																		" ",
																		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																			className: "text-[10px] text-slate-500 font-medium",
																			children: "horas úteis/mês"
																		})
																	]
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
																	className: "text-[9.5px] text-slate-500 mt-1",
																	children: [
																		"Disponibilizada por ",
																		hc,
																		" HC(s)"
																	]
																})
															]
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "bg-slate-50/50 p-3 rounded-lg border border-slate-100 flex flex-col justify-between",
															children: [
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: "text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-1",
																	children: "Capacidade Necessária"
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																	className: "text-[14px] font-black text-blue-600",
																	children: [
																		(fteAtual * 165).toFixed(0),
																		" ",
																		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																			className: "text-[10px] text-slate-500 font-medium",
																			children: "horas úteis/mês"
																		})
																	]
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
																	className: "text-[9.5px] text-slate-500 mt-1",
																	children: [
																		"Equivale a ",
																		fteAtual.toFixed(2),
																		" FTE necessário(s)"
																	]
																})
															]
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "bg-slate-50/50 p-3 rounded-lg border border-slate-100 flex flex-col justify-between",
															children: [
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: "text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-1",
																	children: "Capacidade Futura (TO BE)"
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																	className: "text-[14px] font-black text-emerald-600",
																	children: [
																		(fteFuturo * 165).toFixed(0),
																		" ",
																		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																			className: "text-[10px] text-slate-500 font-medium",
																			children: "horas úteis/mês"
																		})
																	]
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
																	className: "text-[9.5px] text-slate-500 mt-1",
																	children: [
																		"Reduz para ",
																		fteFuturo.toFixed(2),
																		" FTE necessário(s)"
																	]
																})
															]
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "bg-emerald-50/50 p-3 rounded-lg border border-emerald-100 flex flex-col justify-between",
															children: [
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: "text-[9px] font-bold text-emerald-600 uppercase tracking-wider block mb-1",
																	children: "FTEs Liberados"
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																	className: "text-[14px] font-black text-emerald-700",
																	children: [
																		fteSalvo.toFixed(3),
																		" ",
																		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																			className: "text-[10px] text-emerald-500 font-medium",
																			children: "FTE"
																		})
																	]
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
																	className: "text-[9.5px] text-emerald-600 mt-1",
																	children: [
																		"Liberados: ",
																		horasSalvas.toFixed(1),
																		" horas/mês"
																	]
																})
															]
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "bg-slate-50/50 p-3 rounded-lg border border-slate-100 flex flex-col justify-between",
															children: [
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: "text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-1",
																	children: "Eficiência Potencial"
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																	className: "text-[14px] font-black text-emerald-700",
																	children: [
																		"+",
																		ganhoEficiencia.toFixed(1),
																		"%"
																	]
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: "text-[9.5px] text-emerald-600 font-bold mt-1",
																	children: "Ganho em tempo médio"
																})
															]
														})
													]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "grid gap-4 grid-cols-1 md:grid-cols-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: `p-3.5 rounded-lg border ${statusCard.bg} flex flex-col justify-between`,
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																className: "flex items-center justify-between mb-1.5",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: "text-[10px] font-black uppercase tracking-wider",
																	children: "Status de Sobrecarga (Atual)"
																}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: `text-[9px] font-bold px-2 py-0.5 rounded-full uppercase ${statusCard.badge}`,
																	children: statusCard.text
																})]
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																className: "text-[11.5px] leading-relaxed font-medium mb-1",
																children: statusCard.desc
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
																className: "text-[10px] font-bold opacity-80 mt-1.5 block",
																children: [
																	"• Ocupação real do time em relação à jornada contratada:",
																	" ",
																	ocupacao.toFixed(1),
																	"%"
																]
															})
														]
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "p-3.5 rounded-lg border border-slate-200 bg-blue-50/30 flex flex-col justify-between text-slate-800",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																className: "flex items-center justify-between mb-1.5",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: "text-[10px] font-black uppercase tracking-wider text-slate-500",
																	children: "Decisão de Headcount (TO BE)"
																}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: "text-[9.5px] font-extrabold px-2.5 py-0.5 rounded-full uppercase bg-blue-100 text-blue-800",
																	children: hcRecomendacao
																})]
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																className: "text-[11.5px] leading-relaxed font-medium text-slate-600 mb-1",
																children: hcTomDeDecisao
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
																className: "text-[10px] font-bold text-slate-500 mt-1.5 block",
																children: [
																	"• Horas liberadas p/ mês com otimização: ",
																	horasSalvas.toFixed(1),
																	"h (-",
																	ganhoEficiencia.toFixed(1),
																	"% de esforço)"
																]
															})
														]
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "bg-slate-50 p-3 rounded-lg border border-slate-100 text-[11px] text-slate-600 leading-relaxed",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "font-extrabold text-slate-700 block mb-1",
														children: "📋 Diretrizes Lean para Gestão de Capacidade (Kaizen):"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
														className: "list-disc pl-4 space-y-1 font-medium",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: "font-bold text-slate-700",
																	children: "Eliminação de Desperdício (Muda):"
																}),
																" ",
																"O ganho de eficiência de",
																" ",
																/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
																	className: "font-bold text-slate-900",
																	children: [ganhoEficiencia.toFixed(1), "%"]
																}),
																" ",
																"é obtido pela simplificação ou automação das atividades repetitivas (tempo médio cai de ",
																t_medio.toFixed(1),
																" min para ",
																t_futuro,
																" min)."
															] }),
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: "font-bold text-slate-700",
																	children: "Estabilização do Fluxo:"
																}),
																" ",
																"Priorize a padronização das etapas operacionais antes de qualquer automatização para garantir que os desvios e reprocessos sejam erradicados."
															] }),
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: "font-bold text-slate-700",
																	children: "Monitoramento da Capacidade:"
																}),
																" ",
																"Mantenha a utilização saudável entre",
																" ",
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: "font-bold text-slate-900",
																	children: "75% e 85%"
																}),
																" para absorver variações sazonais de volume sem gerar gargalos ou fadiga no time."
															] })
														]
													})]
												})
											]
										})]
									});
								})()
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
						title: "9 · Componente Financeiro",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Coins, { className: "h-4 w-4" }),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
									label: "CUSTO POR HORA (R$)",
									monetaryValue: form.custo_hora
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "number",
									min: "0",
									step: "0.01",
									disabled: !isAdmin,
									value: form.custo_hora,
									onChange: (e) => handleFieldChange("custo_hora", Number(e.target.value)),
									onBlur: handleFieldBlur,
									className: "h-9 w-full rounded-md border border-[#DBDBDB] px-3 text-[12.5px] outline-none focus:border-[#268200] focus:ring-1 focus:ring-[#268200] text-slate-700 disabled:bg-slate-50"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { label: "HORAS GASTAS ATUAL/MÊS" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "number",
									min: "0",
									disabled: !isAdmin,
									value: form.horas_gastas_mes,
									onChange: (e) => handleFieldChange("horas_gastas_mes", Number(e.target.value)),
									onBlur: handleFieldBlur,
									className: "h-9 w-full rounded-md border border-[#DBDBDB] px-3 text-[12.5px] outline-none focus:border-[#268200] focus:ring-1 focus:ring-[#268200] text-slate-700 disabled:bg-slate-50"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { label: "HORAS FUTURAS ESTIMADAS/MÊS" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "number",
									min: "0",
									disabled: !isAdmin,
									value: form.horas_futuras_mes,
									onChange: (e) => handleFieldChange("horas_futuras_mes", Number(e.target.value)),
									onBlur: handleFieldBlur,
									className: "h-9 w-full rounded-md border border-[#DBDBDB] px-3 text-[12.5px] outline-none focus:border-[#268200] focus:ring-1 focus:ring-[#268200] text-slate-700 disabled:bg-slate-50"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
									label: "HORAS ECONOMIZADAS/MÊS",
									tooltip: horasEconomizadas.memoria
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									disabled: true,
									value: `${horasEconomizadas.value.toFixed(2)} h`,
									className: "h-9 w-full rounded-md border border-[#DBDBDB] bg-yellow-50 px-3 text-[12.5px] font-extrabold text-neutral-800 cursor-not-allowed outline-none"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
									label: "MULTAS EVITADAS/ANO (R$)",
									monetaryValue: form.multas_evitadas
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "number",
									min: "0",
									disabled: !isAdmin,
									value: form.multas_evitadas,
									onChange: (e) => handleFieldChange("multas_evitadas", Number(e.target.value)),
									onBlur: handleFieldBlur,
									className: "h-9 w-full rounded-md border border-[#DBDBDB] px-3 text-[12.5px] outline-none focus:border-[#268200] focus:ring-1 focus:ring-[#268200] text-slate-700 disabled:bg-slate-50"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
									label: "CUSTO DE IMPLEMENTAÇÃO (R$)",
									monetaryValue: form.custo_implementacao
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "number",
									min: "0",
									disabled: !isAdmin,
									value: form.custo_implementacao,
									onChange: (e) => handleFieldChange("custo_implementacao", Number(e.target.value)),
									onBlur: handleFieldBlur,
									className: "h-9 w-full rounded-md border border-[#DBDBDB] px-3 text-[12.5px] outline-none focus:border-[#268200] focus:ring-1 focus:ring-[#268200] text-slate-700 disabled:bg-slate-50"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
									label: "VOLUME FINANCEIRO ENVOLVIDO (R$)",
									monetaryValue: form.volume_financeiro
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "number",
									min: "0",
									disabled: !isAdmin,
									value: form.volume_financeiro,
									onChange: (e) => handleFieldChange("volume_financeiro", Number(e.target.value)),
									onBlur: handleFieldBlur,
									className: "h-9 w-full rounded-md border border-[#DBDBDB] px-3 text-[12.5px] outline-none focus:border-[#268200] focus:ring-1 focus:ring-[#268200] text-slate-700 disabled:bg-slate-50"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
									label: "ECONOMIA ANUAL ESTIMADA",
									tooltip: economiaAnual.memoria
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									disabled: true,
									value: economiaAnual.value.toLocaleString("pt-BR", {
										style: "currency",
										currency: "BRL",
										minimumFractionDigits: 2,
										maximumFractionDigits: 2
									}),
									className: "h-9 w-full rounded-md border border-[#DBDBDB] bg-yellow-50 px-3 text-[12.5px] font-extrabold text-neutral-800 cursor-not-allowed outline-none"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-3 gap-3 sm:col-span-2 lg:col-span-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
											label: "HC POTENCIAL LIBERADO",
											tooltip: calcs.fteLiberadoMem
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "text",
											disabled: true,
											value: calcs.fteLiberado.toFixed(3),
											className: "h-9 w-full rounded-md border border-[#DBDBDB] bg-yellow-50 px-3 text-[12.5px] font-extrabold text-neutral-800 cursor-not-allowed outline-none"
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
											label: "ROI (%)",
											tooltip: calcs.roiMem
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "text",
											disabled: true,
											value: `${calcs.roi.toFixed(1)}%`,
											className: "h-9 w-full rounded-md border border-[#DBDBDB] bg-yellow-50 px-3 text-[12.5px] font-extrabold text-neutral-800 cursor-not-allowed outline-none"
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
											label: "PAYBACK (MESES)",
											tooltip: calcs.paybackMem
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "text",
											disabled: true,
											value: calcs.payback.toFixed(1),
											className: "h-9 w-full rounded-md border border-[#DBDBDB] bg-yellow-50 px-3 text-[12.5px] font-extrabold text-neutral-800 cursor-not-allowed outline-none"
										})] })
									]
								})
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SectionCard, {
						title: "10 · Priorização (Score Inteligente)",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, { className: "h-4 w-4" }),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-5 bg-[#268200]/5 border border-emerald-100 p-3 rounded-xl flex items-center justify-between shadow-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										id: "auto-priority-calc",
										type: "checkbox",
										checked: autoPriorizacao,
										onChange: (e) => {
											const checked = e.target.checked;
											setAutoPriorizacao(checked);
											if (checked) {
												const autoVals = getAutoPrioridadeValues(form);
												setForm((prev) => ({
													...prev,
													...autoVals
												}));
											}
										},
										className: "h-4 w-4 rounded border-slate-300 text-[#268200] focus:ring-[#268200] cursor-pointer"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										htmlFor: "auto-priority-calc",
										className: "text-xs font-extrabold text-neutral-800 uppercase tracking-wider cursor-pointer select-none",
										children: "Ativar Cálculo Inteligente Automático (Recomendado)"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] font-black uppercase text-emerald-700 bg-emerald-100/50 px-2.5 py-1 rounded",
									children: autoPriorizacao ? "Automático" : "Manual"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-5 mb-5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderField, {
										label: "IMPACTO NEGÓCIO",
										value: form.impacto_negocio,
										disabled: autoPriorizacao || !isAdmin,
										onChange: (v) => handleFieldChange("impacto_negocio", v)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderField, {
										label: "IMPACTO CLIENTE",
										value: form.impacto_cliente,
										disabled: autoPriorizacao || !isAdmin,
										onChange: (v) => handleFieldChange("impacto_cliente", v)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderField, {
										label: "IMPACTO FINANCEIRO",
										value: form.impacto_financeiro,
										disabled: autoPriorizacao || !isAdmin,
										onChange: (v) => handleFieldChange("impacto_financeiro", v)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderField, {
										label: "ESFORÇO IMPLEMENTAÇÃO",
										value: form.esforco,
										disabled: autoPriorizacao || !isAdmin,
										onChange: (v) => handleFieldChange("esforco", v)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderField, {
										label: "COMPLEXIDADE",
										value: form.complexidade,
										disabled: autoPriorizacao || !isAdmin,
										onChange: (v) => handleFieldChange("complexidade", v)
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-4 border-t border-slate-100 pt-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
									label: "SCORE INTELIGENTE OBTIDO",
									tooltip: calcs.smartScoreMem
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									disabled: true,
									value: calcs.smartScore,
									className: "h-9 w-full rounded-md border border-[#DBDBDB] bg-yellow-50 px-3 text-[14px] font-black text-neutral-800 cursor-not-allowed outline-none"
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { label: "NÍVEL DE PRIORIDADE DERIVADO" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `flex h-9 w-full items-center justify-center rounded-md border border-neutral-200 text-center text-[12.5px] font-extrabold uppercase shadow-sm ${calcs.prioridadeTone === "red" ? "bg-red-100 text-red-800 border-red-200" : calcs.prioridadeTone === "orange" ? "bg-amber-100 text-amber-800 border-amber-200" : "bg-emerald-100 text-emerald-800 border-emerald-200"}`,
									children: calcs.prioridadeStr
								})] })]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
						title: "11 · Governança da Execução",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "h-4 w-4" }),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { label: "STATUS DA GOVERNANÇA" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PicklistField, {
									categoria: "Status",
									value: form.status,
									disabled: !isAdmin,
									onChange: (v) => handleFieldChange("status", v)
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { label: "PRIORIDADE DA EXECUÇÃO" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PicklistField, {
									categoria: "Prioridade",
									value: form.prioridade,
									disabled: !isAdmin,
									onChange: (v) => handleFieldChange("prioridade", v)
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { label: "DATA DE INÍCIO DA DIAGNÓSTICO" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "date",
									disabled: !isAdmin,
									value: form.data_inicio,
									onChange: (e) => handleFieldChange("data_inicio", e.target.value),
									onBlur: handleFieldBlur,
									className: "h-9 w-full rounded-md border border-[#DBDBDB] px-3 text-[12.5px] outline-none focus:border-[#268200] focus:ring-1 focus:ring-[#268200] text-slate-700 disabled:bg-slate-50 bg-white"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { label: "PREVISÃO DE CONCLUSÃO" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "date",
									disabled: !isAdmin,
									value: form.data_fim_prevista,
									onChange: (e) => handleFieldChange("data_fim_prevista", e.target.value),
									onBlur: handleFieldBlur,
									className: "h-9 w-full rounded-md border border-[#DBDBDB] px-3 text-[12.5px] outline-none focus:border-[#268200] focus:ring-1 focus:ring-[#268200] text-slate-700 disabled:bg-slate-50 bg-white"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { label: "CONCLUSÃO REAL" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "date",
									disabled: !isAdmin,
									value: form.data_fim_real,
									onChange: (e) => handleFieldChange("data_fim_real", e.target.value),
									onBlur: handleFieldBlur,
									className: "h-9 w-full rounded-md border border-[#DBDBDB] px-3 text-[12.5px] outline-none focus:border-[#268200] focus:ring-1 focus:ring-[#268200] text-slate-700 disabled:bg-slate-50 bg-white"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { label: "CONVERSÃO / IMPLEMENTAÇÃO (%)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "number",
									min: "0",
									max: "100",
									disabled: !isAdmin,
									value: form.expectativa_produtividade,
									onChange: (e) => handleFieldChange("expectativa_produtividade", Number(e.target.value)),
									onBlur: handleFieldBlur,
									className: "h-9 w-full rounded-md border border-[#DBDBDB] px-3 text-[12.5px] outline-none focus:border-[#268200] focus:ring-1 focus:ring-[#268200] text-slate-700 disabled:bg-slate-50"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "sm:col-span-2 lg:col-span-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { label: "OBSERVAÇÕES ADICIONAIS" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
										disabled: !isAdmin,
										value: form.observacoes,
										placeholder: "Insira detalhes sobre reuniões, decisões ou pontos em aberto...",
										onChange: (e) => handleFieldChange("observacoes", e.target.value),
										onBlur: handleFieldBlur,
										rows: 2,
										className: "w-full rounded-md border border-[#DBDBDB] p-3 text-[12.5px] font-medium outline-none focus:border-[#268200] focus:ring-1 focus:ring-[#268200] text-slate-700 disabled:bg-slate-50"
									})]
								})
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
						title: "12 · Evidências e Anexos",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileSpreadsheet, { className: "h-4 w-4" }),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 sm:grid-cols-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "sm:col-span-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { label: "LINKS DE APRESENTAÇÃO / DIAGNÓSTICO (Separados por vírgula)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										disabled: !isAdmin,
										value: form.links_relacionados,
										placeholder: "Ex: https://sharepoint.com/doc1, https://youtube.com/video...",
										onChange: (e) => handleFieldChange("links_relacionados", e.target.value),
										onBlur: handleFieldBlur,
										className: "h-9 w-full rounded-md border border-[#DBDBDB] px-3 text-[12.5px] outline-none focus:border-[#268200] focus:ring-1 focus:ring-[#268200] text-slate-700 disabled:bg-slate-50"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { label: "EVIDÊNCIA DA SITUAÇÃO ATUAL (COMO É HOJE)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
									disabled: !isAdmin,
									value: form.evidencia_atual,
									placeholder: "Descrição dos gargalos, fluxos manuais pesados...",
									onChange: (e) => handleFieldChange("evidencia_atual", e.target.value),
									onBlur: handleFieldBlur,
									rows: 2,
									className: "w-full rounded-md border border-[#DBDBDB] p-3 text-[12.5px] font-medium outline-none focus:border-[#268200] focus:ring-1 focus:ring-[#268200] text-slate-700 disabled:bg-slate-50"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { label: "EVIDÊNCIA DA SITUAÇÃO FUTURA (COMO DEVE SER)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
									disabled: !isAdmin,
									value: form.evidencia_futura,
									placeholder: "Descrição do ganho, automação executando em segundos...",
									onChange: (e) => handleFieldChange("evidencia_futura", e.target.value),
									onBlur: handleFieldBlur,
									rows: 2,
									className: "w-full rounded-md border border-[#DBDBDB] p-3 text-[12.5px] font-medium outline-none focus:border-[#268200] focus:ring-1 focus:ring-[#268200] text-slate-700 disabled:bg-slate-50"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "sm:col-span-2 text-[11px] italic text-slate-400 mt-1 flex items-center gap-1.5",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
										"📎 Nota: Arquivos físicos ou mídias anexas devem ser carregados e gerenciados diretamente através da aba ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Mural de Imagens" }),
										" ou nos anexos das tarefas."
									] })
								})
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
						title: "13 · Campos Adicionais",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "h-4 w-4 text-orange-500" }),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { label: "NÍVEL DE URGÊNCIA" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PicklistField, {
									categoria: "Urgência",
									value: form.urgencia,
									disabled: !isAdmin,
									onChange: (v) => handleFieldChange("urgencia", v)
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { label: "EXPECTATIVA PRODUTIVIDADE (%)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "number",
									min: "0",
									max: "100",
									disabled: !isAdmin,
									value: form.expectativa_produtividade,
									onChange: (e) => handleFieldChange("expectativa_produtividade", Number(e.target.value)),
									onBlur: handleFieldBlur,
									className: "h-9 w-full rounded-md border border-[#DBDBDB] px-3 text-[12.5px] outline-none focus:border-[#268200] focus:ring-1 focus:ring-[#268200] text-slate-700 disabled:bg-slate-50"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { label: "COMPLEXIDADE PROCESSO" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PicklistField, {
									categoria: "Complexidade do Processo",
									value: form.complexidade_processo,
									disabled: !isAdmin,
									onChange: (v) => handleFieldChange("complexidade_processo", v)
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { label: "DEPENDÊNCIA DE TI?" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleField, {
									value: form.dependencia_ti,
									disabled: !isAdmin,
									onChange: (v) => handleFieldChange("dependencia_ti", v)
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { label: "TIPO DE MELHORIA" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PicklistField, {
									categoria: "Tipo de Melhoria",
									value: form.tipo_melhoria,
									disabled: !isAdmin,
									onChange: (v) => handleFieldChange("tipo_melhoria", v)
								})] })
							]
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed bottom-0 left-0 right-0 z-30 border-t border-[#E5E5E5] bg-neutral-900 px-6 py-4 shadow-xl",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-7xl items-center justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [
							savingStatus === "saving" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-1.5 text-xs text-amber-400 font-bold",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }), "Salvando na Nuvem (GCP)..."]
							}),
							savingStatus === "saved" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-1.5 text-xs text-emerald-400 font-bold",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" }), "Sincronizado e Salvo na Nuvem (GCP)"]
							}),
							savingStatus === "error" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-1.5 text-xs text-red-400 font-bold",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-4 w-4" }), "Erro ao sincronizar."]
							}),
							savingStatus === "idle" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[11px] text-slate-400",
								children: isCreatingNew ? "Preenchendo Rascunho. Clique em Criar para ativar o autosave." : "Nenhuma iniciativa carregada para salvar."
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [isAdmin && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: handleLimparFormulario,
							className: "rounded-lg border border-neutral-700 bg-transparent px-4 py-2 text-xs font-bold text-slate-300 hover:bg-neutral-800 transition",
							children: "Limpar"
						}), isCreatingNew ? isAdmin && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: handleCreateInitiative,
							className: "inline-flex items-center gap-1.5 rounded-lg bg-[#268200] hover:bg-[#1f6b00] px-5 py-2 text-xs font-bold text-white shadow-sm transition",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), "Criar Iniciativa"]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [activeInitiative && isAdmin && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: handleExcluirIniciativa,
							className: "inline-flex items-center gap-1.5 rounded-lg border border-red-900 bg-red-950/40 hover:bg-red-950/80 px-4 py-2 text-xs font-bold text-red-400 transition",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" }), "Excluir Iniciativa"]
						}), activeInitiative && isAdmin && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => {
								if (autoSaveTimeoutRef.current) clearTimeout(autoSaveTimeoutRef.current);
								saveToGCP(iniciativaId, form);
							},
							className: "inline-flex items-center gap-1.5 rounded-lg bg-[#268200] hover:bg-[#1a5b00] px-5 py-2 text-xs font-bold text-white shadow transition",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "h-4 w-4" }), "Salvar Iniciativa"]
						})] })]
					})]
				})
			})
		]
	});
}
function KpiCard({ title, value, tooltip, icon, color }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `group relative rounded-lg border p-3 flex flex-col justify-between h-[78px] transition-all duration-200 hover:shadow-sm ${color === "red" ? "text-red-700 border-red-200 bg-red-50" : color === "orange" ? "text-[#FF6900] border-orange-100 bg-orange-50/50" : color === "yellow" ? "text-amber-700 border-amber-100 bg-amber-50/50" : "text-[#268200] border-emerald-100 bg-[#268200]/5"}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between text-[8px] font-black tracking-widest text-slate-400 uppercase",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "truncate",
					children: title
				}), icon]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-[17px] font-black tracking-tight leading-none mt-2 truncate",
				children: value
			}),
			tooltip && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 w-64 -translate-x-1/2 rounded-md bg-slate-800 p-2.5 text-[10px] font-medium text-white opacity-0 shadow-lg transition-opacity duration-200 group-hover:pointer-events-auto group-hover:opacity-100 whitespace-pre-line leading-relaxed",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "font-extrabold uppercase text-[8.5px] border-b border-slate-700 pb-1 mb-1.5 text-slate-300 flex items-center gap-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, { className: "h-3 w-3" }),
						" Memória de Cálculo (",
						title,
						")"
					]
				}), tooltip]
			})
		]
	});
}
function SectionCard({ title, icon, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-neutral-200 bg-white p-5 shadow-sm",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
			className: "mb-4 text-[13px] font-black uppercase tracking-wider text-neutral-800 border-b border-neutral-100 pb-2.5 flex items-center gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-[#268200]",
				children: icon
			}), title]
		}), children]
	});
}
function formatMinutesToHoursMinutesSuffix(minutes) {
	const rounded = Math.round(minutes);
	const hours = Math.floor(rounded / 60);
	const remainingMinutes = rounded % 60;
	return `${hours}h ${remainingMinutes < 10 ? `0${remainingMinutes}` : `${remainingMinutes}`}min`;
}
function FieldLabel({ label, tooltip, durationInMinutes, monetaryValue }) {
	const timeStr = durationInMinutes !== void 0 && durationInMinutes !== null && !isNaN(durationInMinutes) ? formatMinutesToHoursMinutesSuffix(durationInMinutes) : "";
	const moneyStr = monetaryValue !== void 0 && monetaryValue !== null && !isNaN(monetaryValue) ? monetaryValue.toLocaleString("pt-BR", {
		style: "currency",
		currency: "BRL",
		minimumFractionDigits: 2,
		maximumFractionDigits: 2
	}) : "";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center justify-between gap-1 text-[10.5px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 w-full",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label }), tooltip && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "group relative cursor-help text-[#268200]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, { className: "h-3.5 w-3.5 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "pointer-events-none absolute bottom-full left-1/2 z-50 mb-1 w-64 -translate-x-1/2 rounded-md bg-slate-800 p-2.5 text-[10px] font-medium text-white opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100 whitespace-pre-line leading-relaxed",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "font-extrabold uppercase text-[8.5px] border-b border-slate-700 pb-1 mb-1.5 text-slate-300 flex items-center gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, { className: "h-3 w-3" }), " Fórmula"]
						}), tooltip]
					})]
				})]
			}),
			timeStr && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "text-[10px] font-black text-blue-600 normal-case ml-1",
				children: [
					"(",
					timeStr,
					")"
				]
			}),
			moneyStr && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-[10.5px] font-black text-emerald-600 normal-case ml-1",
				children: moneyStr
			})
		]
	});
}
function ToggleField({ value, onChange, disabled }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		disabled,
		onClick: () => onChange(!value),
		className: `w-full h-9 rounded-md border text-center text-[12.5px] font-bold transition-all duration-150 ${value ? "bg-[#268200] text-white border-[#268200] hover:bg-[#1f6b00]" : "bg-white text-slate-700 border-[#DBDBDB] hover:bg-slate-50"} ${disabled ? "opacity-60 cursor-not-allowed bg-neutral-50" : ""}`,
		children: value ? "Sim" : "Não"
	});
}
function SliderField({ label, value, onChange, disabled }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-1.5 bg-neutral-50 p-2.5 rounded-lg border border-neutral-100",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex justify-between items-center text-[10px] font-black text-slate-400 uppercase tracking-widest",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-[13px] font-black text-[#268200]",
				children: value
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative pt-1",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				type: "range",
				min: "1",
				max: "5",
				value,
				disabled,
				onChange: (e) => onChange(Number(e.target.value)),
				className: "w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#268200] focus:outline-none disabled:opacity-60 disabled:cursor-not-allowed"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex justify-between text-[9px] text-slate-400 font-extrabold px-0.5 mt-1.5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "1" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "2" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "3" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "4" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "5" })
				]
			})]
		})]
	});
}
var DEFAULT_MACROS = [
	{
		id: "m-1",
		nome: "Originação e Prospecção",
		area_responsavel: "Comercial / Expansão",
		tempo_total: 15,
		ordem: 1
	},
	{
		id: "m-2",
		nome: "Qualificação Cadastral",
		area_responsavel: "Cadastro / Inteligência",
		tempo_total: 10,
		ordem: 2
	},
	{
		id: "m-3",
		nome: "Análise de Crédito e Limites",
		area_responsavel: "Crédito e Cobrança",
		tempo_total: 12,
		ordem: 3
	},
	{
		id: "m-4",
		nome: "Due Diligence e Compliance",
		area_responsavel: "Compliance / Jurídico",
		tempo_total: 15,
		ordem: 4
	},
	{
		id: "m-5",
		nome: "Avaliação de Viabilidade",
		area_responsavel: "Planejamento Financeiro",
		tempo_total: 10,
		ordem: 5
	},
	{
		id: "m-6",
		nome: "Negociação Comercial",
		area_responsavel: "Comercial",
		tempo_total: 20,
		ordem: 6
	},
	{
		id: "m-7",
		nome: "Aprovação de Alçada",
		area_responsavel: "Diretoria / Comitê",
		tempo_total: 7,
		ordem: 7
	},
	{
		id: "m-8",
		nome: "Assinatura de Contrato (DECON)",
		area_responsavel: "Jurídico / Cadastro",
		tempo_total: 14,
		ordem: 8
	},
	{
		id: "m-9",
		nome: "Projetos Executivos",
		area_responsavel: "Engenharia / Projetos",
		tempo_total: 18,
		ordem: 9
	},
	{
		id: "m-10",
		nome: "Licenciamento Ambiental",
		area_responsavel: "SMS / Regulatório",
		tempo_total: 45,
		ordem: 10
	},
	{
		id: "m-11",
		nome: "Alvarás e Autorizações",
		area_responsavel: "Regulatório",
		tempo_total: 30,
		ordem: 11
	},
	{
		id: "m-12",
		nome: "Concessões Financeiras",
		area_responsavel: "Financeiro",
		tempo_total: 15,
		ordem: 12
	},
	{
		id: "m-13",
		nome: "Obras Civis e Adequação",
		area_responsavel: "Engenharia",
		tempo_total: 60,
		ordem: 13
	},
	{
		id: "m-14",
		nome: "Nova Imagem",
		area_responsavel: "Branding / Engenharia",
		tempo_total: 25,
		ordem: 14
	},
	{
		id: "m-15",
		nome: "Adequação e Testes",
		area_responsavel: "SMS / Operações",
		tempo_total: 30,
		ordem: 15
	},
	{
		id: "m-16",
		nome: "Instalação de Sistemas",
		area_responsavel: "TI / Automação",
		tempo_total: 10,
		ordem: 16
	},
	{
		id: "m-17",
		nome: "Treinamento e Inauguração",
		area_responsavel: "Treinamento / Vendas",
		tempo_total: 7,
		ordem: 17
	}
];
function PostosPetrobrasTab() {
	const qc = useQueryClient();
	useRealtimeTable("app_configuracoes", [["postos_petrobras_data"]]);
	const [searchTerm, setSearchTerm] = (0, import_react.useState)("");
	const [editingRecord, setEditingRecord] = (0, import_react.useState)(null);
	const [isFormOpen, setIsFormOpen] = (0, import_react.useState)(false);
	const [formTab, setFormTab] = (0, import_react.useState)("geral");
	const [activeTab, setActiveTab] = (0, import_react.useState)("postos");
	const [selectedMacroId, setSelectedMacroId] = (0, import_react.useState)("m-1");
	const [editedMacros, setEditedMacros] = (0, import_react.useState)([]);
	const { data: macroprocessos = DEFAULT_MACROS, isLoading: isLoadingMacros } = useQuery({
		queryKey: ["jornada-macroprocessos"],
		queryFn: async () => {
			const { data } = await supabase.from("app_configuracoes").select("valor").eq("chave", "jornada_macroprocessos").maybeSingle();
			if (!data?.valor) return DEFAULT_MACROS;
			const list = data.valor;
			if (list.length < 17) return DEFAULT_MACROS;
			return list.sort((a, b) => a.ordem - b.ordem);
		}
	});
	const { data: dbMicroprocessos = [] } = useQuery({
		queryKey: ["jornada-db-microprocessos"],
		queryFn: async () => {
			const { data } = await supabase.from("microprocessos").select("*").is("deleted_at", null);
			return data ?? [];
		}
	});
	(0, import_react.useEffect)(() => {
		if (macroprocessos && macroprocessos.length > 0) setEditedMacros(macroprocessos);
	}, [macroprocessos]);
	const saveMacrosMutation = useMutation({
		mutationFn: async (updated) => {
			const { error } = await supabase.from("app_configuracoes").upsert({
				chave: "jornada_macroprocessos",
				valor: updated
			});
			if (error) throw error;
		},
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["jornada-macroprocessos"] });
			toast.success("Configuração da Jornada salva com sucesso!");
		},
		onError: (err) => {
			toast.error(`Erro ao salvar jornada: ${err.message}`);
		}
	});
	const selectedMacro = editedMacros.find((m) => m.id === selectedMacroId) || macroprocessos.find((m) => m.id === selectedMacroId);
	const handleUpdateMacroField = (field, value) => {
		setEditedMacros((prev) => prev.map((m) => {
			if (m.id === selectedMacroId) return {
				...m,
				[field]: value
			};
			return m;
		}));
	};
	const handleUpdateMicroField = (microId, field, value) => {
		setEditedMacros((prev) => prev.map((m) => {
			if (m.id === selectedMacroId) {
				const updatedMicros = (m.microprocessos || []).map((mic) => {
					if (mic.id === microId) {
						const updated = {
							...mic,
							[field]: value
						};
						if (field === "isMapped" && value === true) {
							if (dbMicroprocessos.length > 0) {
								const firstDb = dbMicroprocessos[0];
								updated.id = firstDb.id;
								updated.nome = firstDb.titulo;
								updated.status = firstDb.status || "Mapeada";
								updated.progress = firstDb.percentual_avanco ?? 0;
								updated.tempo_asis = firstDb.lead_time_atual ?? 0;
								updated.tempo_tobe = firstDb.lead_time_futuro ?? 0;
								updated.hc = firstDb.hc_atual ?? 0;
								updated.automation = firstDb.percentual_evolucao ?? 0;
							}
						}
						if (field === "id" && value && mic.isMapped) {
							const matchedDb = dbMicroprocessos.find((dbM) => dbM.id === value);
							if (matchedDb) {
								updated.nome = matchedDb.titulo;
								updated.status = matchedDb.status || "Mapeada";
								updated.progress = matchedDb.percentual_avanco ?? 0;
								updated.tempo_asis = matchedDb.lead_time_atual ?? 0;
								updated.tempo_tobe = matchedDb.lead_time_futuro ?? 0;
								updated.hc = matchedDb.hc_atual ?? 0;
								updated.automation = matchedDb.percentual_evolucao ?? 0;
							}
						}
						return updated;
					}
					return mic;
				});
				return {
					...m,
					microprocessos: updatedMicros
				};
			}
			return m;
		}));
	};
	const handleAddMicro = () => {
		setEditedMacros((prev) => prev.map((m) => {
			if (m.id === selectedMacroId) {
				const currentMicros = m.microprocessos || [];
				const newMicro = {
					id: "micro-" + Math.random().toString(36).substring(2, 9),
					nome: "Novo Microprocesso",
					status: "Mapeada",
					progress: 0,
					tempo_asis: 5,
					tempo_tobe: 3,
					hc: 1,
					automation: 0,
					isMapped: false
				};
				return {
					...m,
					microprocessos: [...currentMicros, newMicro]
				};
			}
			return m;
		}));
	};
	const handleRemoveMicro = (microId) => {
		setEditedMacros((prev) => prev.map((m) => {
			if (m.id === selectedMacroId) {
				const currentMicros = m.microprocessos || [];
				return {
					...m,
					microprocessos: currentMicros.filter((mic) => mic.id !== microId)
				};
			}
			return m;
		}));
	};
	const handleSaveJourney = () => {
		saveMacrosMutation.mutate(editedMacros);
	};
	const { data: userProfile } = useQuery({
		queryKey: ["user-profile-postos"],
		queryFn: async () => {
			const { data: { user } } = await supabase.auth.getUser();
			return user;
		}
	});
	const { data: myRole = "visualizador" } = useQuery({
		queryKey: ["my-role-postos"],
		queryFn: async () => {
			const { data: { user } } = await supabase.auth.getUser();
			if (!user) return "visualizador";
			const emailLower = user.email?.toLowerCase() || "";
			if (emailLower === "rfranca@vibraenergia.com.br" || emailLower === "rfranca@vibra.com.br" || emailLower.includes("raquel") && emailLower.includes("vibra") || emailLower === "admin@vibraenergia.com.br" || emailLower === "sfquequel@gmail.com" || emailLower === "juliano.maluf@mjv.com.br") return "admin";
			const { data } = await supabase.from("user_roles").select("role").eq("user_id", user.id).maybeSingle();
			return data?.role ?? "visualizador";
		}
	});
	const isAdmin = myRole === "admin";
	const { data: mereoRealValue = 0, isLoading: isLoadingMereo } = useQuery({
		queryKey: ["postos-mereo-real-val"],
		queryFn: async () => {
			try {
				const { data: indicators } = await supabase.from("indicadores").select("id, codigo_mereo").in("codigo_mereo", [
					"GTESG00183",
					"GTESG00207",
					"GTESG00208"
				]);
				if (!indicators || indicators.length === 0) return 106.5;
				const indicatorIds = indicators.map((i) => i.id);
				const { data: values } = await supabase.from("indicador_valores").select("realizado").in("indicador_id", indicatorIds).not("realizado", "is", null);
				if (!values || values.length === 0) return 106.5;
				const sum = values.reduce((acc, val) => acc + Number(val.realizado || 0), 0);
				return Number((sum / values.length).toFixed(2));
			} catch (e) {
				console.warn("Error calculating Mereo values, fallback to default", e);
				return 106.5;
			}
		}
	});
	const { data: records = [], isLoading } = useQuery({
		queryKey: ["postos-petrobras-records"],
		queryFn: async () => {
			const { data } = await supabase.from("app_configuracoes").select("valor").eq("chave", "postos_petrobras_list").maybeSingle();
			return data?.valor ?? [];
		}
	});
	const filteredRecords = (0, import_react.useMemo)(() => {
		if (!searchTerm) return records;
		return records.filter((r) => {
			const matchPeriod = `${r.periodo_inicio} a ${r.periodo_fim}`.toLowerCase().includes(searchTerm.toLowerCase());
			const matchUser = r.created_by?.toLowerCase().includes(searchTerm.toLowerCase());
			return matchPeriod || matchUser;
		});
	}, [records, searchTerm]);
	const initialFormState = (rec) => ({
		id: rec?.id || "p-" + Math.random().toString(36).substring(2, 9),
		periodo_inicio: rec?.periodo_inicio || (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
		periodo_fim: rec?.periodo_fim || new Date(Date.now() + 720 * 3600 * 1e3).toISOString().split("T")[0],
		total_postos: rec?.total_postos ?? 0,
		total_postos_nova_imagem: rec?.total_postos_nova_imagem ?? 0,
		meta_postos_nova_imagem: rec?.meta_postos_nova_imagem ?? 0,
		capacidade_atual_nova_imagem: rec?.capacidade_atual_nova_imagem ?? 0,
		tempo_embandeiramento_inicial: rec?.tempo_embandeiramento_inicial ?? 0,
		tempo_embandeiramento_1etapa: rec?.tempo_embandeiramento_1etapa ?? 0,
		tempo_embandeiramento_2etapa: rec?.tempo_embandeiramento_2etapa ?? 0,
		tempo_embandeiramento_estimado_jornada_completa: rec?.tempo_embandeiramento_estimado_jornada_completa ?? 0,
		tempo_embandeiramento_estimado_1etapa: rec?.tempo_embandeiramento_estimado_1etapa ?? 0,
		tempo_embandeiramento_estimada_2etapa: rec?.tempo_embandeiramento_estimada_2etapa ?? 0,
		tempo_embandeiramento_real: rec?.tempo_embandeiramento_real ?? 0,
		tempo_embandeiramento_real_mereo: rec?.tempo_embandeiramento_real_mereo ?? mereoRealValue,
		capacidade_geral_futura_estimada: rec?.capacidade_geral_futura_estimada ?? 0,
		total_postos_renovacao: rec?.total_postos_renovacao ?? 0,
		total_postos_embandeiramento: rec?.total_postos_embandeiramento ?? 0,
		total_postos_implantacao: rec?.total_postos_implantacao ?? 0,
		total_postos_vinculacao: rec?.total_postos_vinculacao ?? 0,
		oportunidades_aprovadas: rec?.oportunidades_aprovadas ?? 0,
		oportunidades_aprovadas_estimada: rec?.oportunidades_aprovadas_estimada ?? 0,
		contatos_assinados: rec?.contatos_assinados ?? 0,
		contatos_assinados_estimado: rec?.contatos_assinados_estimado ?? 0,
		meta_rede_embandeirada: rec?.meta_rede_embandeirada ?? 0,
		realizado_rede_embandeirada: rec?.realizado_rede_embandeirada ?? 0,
		engenharia_embandeiramento: rec?.engenharia_embandeiramento ?? 0,
		meta_engenharia_embandeiramento: rec?.meta_engenharia_embandeiramento ?? 0,
		concessoes_financeiras_total: rec?.concessoes_financeiras_total ?? 0,
		sem_garantia_real: rec?.sem_garantia_real ?? 0,
		com_garantia_real_hipoteca: rec?.com_garantia_real_hipoteca ?? 0,
		amaral_maia_hipotecas: rec?.amaral_maia_hipotecas ?? 0,
		tempo_sem_garantia_real: rec?.tempo_sem_garantia_real ?? 0,
		tempo_com_garantia_real_hipoteca: rec?.tempo_com_garantia_real_hipoteca ?? 0,
		tempo_oportunidade_ate_pagamento_com_termo: rec?.tempo_oportunidade_ate_pagamento_com_termo ?? 0,
		tempo_oportunidade_ate_pagamento_sem_termo: rec?.tempo_oportunidade_ate_pagamento_sem_termo ?? 0
	});
	const [formData, setFormData] = (0, import_react.useState)(initialFormState());
	const saveMutation = useMutation({
		mutationFn: async (updatedList) => {
			const { error } = await supabase.from("app_configuracoes").upsert({
				chave: "postos_petrobras_list",
				valor: updatedList
			});
			if (error) throw error;
		},
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["postos-petrobras-records"] });
			toast.success("Dados de Postos Petrobras atualizados com sucesso!");
			setIsFormOpen(false);
			setEditingRecord(null);
		},
		onError: (err) => {
			toast.error(`Erro ao salvar os dados: ${err.message}`);
		}
	});
	const handleSubmit = (e) => {
		e.preventDefault();
		if (!isAdmin) {
			toast.error("Apenas administradores podem inserir ou alterar dados.");
			return;
		}
		const payload = {
			...formData,
			updated_at: (/* @__PURE__ */ new Date()).toISOString(),
			created_by: userProfile?.email || "Administrador"
		};
		let updatedList = [];
		if (editingRecord) updatedList = records.map((r) => r.id === editingRecord.id ? payload : r);
		else updatedList = [payload, ...records];
		saveMutation.mutate(updatedList);
	};
	const handleDelete = (id) => {
		if (!isAdmin) {
			toast.error("Apenas administradores podem excluir dados.");
			return;
		}
		if (confirm("Deseja realmente excluir este registro de período?")) {
			const updatedList = records.filter((r) => r.id !== id);
			saveMutation.mutate(updatedList);
		}
	};
	const handleEdit = (rec) => {
		setEditingRecord(rec);
		setFormData(initialFormState(rec));
		setFormTab("geral");
		setIsFormOpen(true);
	};
	const handleCreateNew = () => {
		setEditingRecord(null);
		setFormData(initialFormState(null));
		setFormTab("geral");
		setIsFormOpen(true);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col md:flex-row md:items-center md:justify-between border-b border-border pb-4 gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "rounded-full bg-emerald-50 border border-emerald-200 px-3 py-0.5 text-[10px] font-black text-emerald-800 uppercase tracking-wider",
						children: "Gestão Operacional"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-[20px] font-black tracking-tight text-slate-900 mt-1",
						children: "Mapeamento de Postos Petrobras"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[12px] text-muted-foreground mt-0.5",
						children: "Gerenciamento e consolidação de KPIs de embandeiramento, concessões financeiras, obras de Nova Imagem e prazos operacionais."
					})
				] }), isAdmin && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: handleCreateNew,
					className: "inline-flex h-9 items-center justify-center gap-1.5 rounded-lg bg-vibra-700 px-4 text-xs font-bold text-white shadow hover:bg-vibra-800 transition",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Inserir Novo Período" })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex border-b border-slate-200 shrink-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setActiveTab("postos"),
					className: `px-4 py-2.5 text-xs font-bold border-b-2 transition-all duration-200 ${activeTab === "postos" ? "border-vibra-700 text-vibra-800 font-extrabold" : "border-transparent text-slate-500 hover:text-slate-800"}`,
					children: "Indicadores do Período"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setActiveTab("jornada"),
					className: `px-4 py-2.5 text-xs font-bold border-b-2 transition-all duration-200 ${activeTab === "jornada" ? "border-vibra-700 text-vibra-800 font-extrabold" : "border-transparent text-slate-500 hover:text-slate-800"}`,
					children: "Mapeamento da Jornada (Macro / Microprocessos)"
				})]
			}),
			activeTab === "postos" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col sm:flex-row gap-3 bg-white p-3.5 rounded-xl border border-border shadow-vibra-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "text",
						placeholder: "Buscar por período ou criado por...",
						value: searchTerm,
						onChange: (e) => setSearchTerm(e.target.value),
						className: "h-9 w-full rounded-lg border border-slate-200 bg-slate-50/50 pl-9 pr-4 text-xs font-semibold text-slate-800 outline-none transition focus:border-vibra-500 focus:bg-white"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 text-slate-500 text-[11px] font-bold shrink-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Funnel, { className: "h-3.5 w-3.5 text-vibra-700" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Filtro de Período Ativo" })]
				})]
			}), isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex justify-center py-12",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-6 w-6 animate-spin text-vibra-700" })
			}) : filteredRecords.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-dashed border-slate-300 p-8 text-center bg-slate-50/50",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-8 w-8 text-slate-300 mx-auto mb-2" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-bold text-slate-700",
						children: "Nenhum registro cadastrado no momento."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] text-muted-foreground mt-1",
						children: isAdmin ? "Clique em 'Inserir Novo Período' acima para começar." : "Aguarde o cadastro de informações pelo administrador."
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-xl border border-border bg-card overflow-hidden shadow-vibra-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full text-left text-[11px] border-collapse",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
							className: "bg-slate-50 border-b border-border text-[9.5px] font-extrabold uppercase text-slate-500 tracking-wider",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3",
									children: "Período"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3",
									children: "Total de Postos"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3",
									children: "Nova Imagem (Meta × Real)"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3 text-right",
									children: "Lead Time Real"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3 text-right",
									children: "Mereo Real (Média)"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3",
									children: "Responsável"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3",
									children: "Atualizado em"
								}),
								isAdmin && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3 text-center",
									children: "Ações"
								})
							] })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
							className: "divide-y divide-border bg-white text-slate-700",
							children: filteredRecords.map((rec) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "hover:bg-slate-50/50 transition",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
										className: "px-4 py-3.5 font-bold text-slate-900 whitespace-nowrap flex items-center gap-1.5",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "h-3.5 w-3.5 text-vibra-700" }),
											new Date(rec.periodo_inicio).toLocaleDateString("pt-BR"),
											" a",
											" ",
											new Date(rec.periodo_fim).toLocaleDateString("pt-BR")
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
										className: "px-4 py-3.5 font-semibold text-slate-700",
										children: [rec.total_postos, " postos"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-3.5",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-1.5",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-bold text-slate-800",
													children: rec.total_postos_nova_imagem
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-muted-foreground",
													children: "/"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "text-slate-500",
													children: [rec.meta_postos_nova_imagem, " meta"]
												})
											]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
										className: "px-4 py-3.5 text-right font-black text-orange-600 whitespace-nowrap",
										children: [rec.tempo_embandeiramento_real, " dias"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
										className: "px-4 py-3.5 text-right font-black text-emerald-600 whitespace-nowrap",
										children: [rec.tempo_embandeiramento_real_mereo || 106.5, " dias"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-3.5 text-slate-500 truncate max-w-[120px]",
										title: rec.created_by,
										children: rec.created_by
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-3.5 text-slate-400 whitespace-nowrap",
										children: new Date(rec.updated_at).toLocaleString("pt-BR")
									}),
									isAdmin && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-3.5 text-center",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-center gap-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												onClick: () => handleEdit(rec),
												className: "p-1.5 hover:bg-slate-100 rounded text-slate-600 transition",
												title: "Editar",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pen, { className: "h-3.5 w-3.5" })
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												onClick: () => handleDelete(rec.id),
												className: "p-1.5 hover:bg-red-50 rounded text-red-600 transition",
												title: "Excluir",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" })
											})]
										})
									})
								]
							}, rec.id))
						})]
					})
				})
			})] }),
			activeTab === "jornada" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 lg:grid-cols-12 gap-6 items-start",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "lg:col-span-4 bg-white rounded-xl border border-border overflow-hidden shadow-vibra-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-4 bg-slate-50 border-b border-border flex justify-between items-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-xs font-black text-slate-800 uppercase tracking-tight",
							children: "Macroprocessos da Estrada (17)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-[10px] bg-vibra-100 text-vibra-800 font-extrabold px-2 py-0.5 rounded-full",
							children: [editedMacros.length, " Frentes"]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "divide-y divide-slate-100 max-h-[600px] overflow-y-auto",
						children: editedMacros.map((macro) => {
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setSelectedMacroId(macro.id),
								className: `w-full text-left p-3.5 flex items-center justify-between transition ${macro.id === selectedMacroId ? "bg-vibra-50 text-vibra-900 border-l-4 border-vibra-700 font-extrabold" : "hover:bg-slate-50/50 text-slate-700 border-l-4 border-transparent"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0 pr-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] font-black text-slate-400 font-mono",
											children: macro.ordem < 10 ? `0${macro.ordem}` : macro.ordem
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
											className: "text-[11.5px] font-black truncate",
											children: macro.nome
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[9.5px] text-slate-400 truncate mt-0.5",
										children: macro.area_responsavel
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-[11px] font-bold text-orange-600 shrink-0 font-mono",
									children: [macro.tempo_total, "d"]
								})]
							}, macro.id);
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "lg:col-span-8 bg-white rounded-xl border border-border p-5 space-y-6 shadow-vibra-sm",
					children: selectedMacro ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "border-b border-slate-100 pb-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-[9px] font-black bg-slate-100 text-slate-500 border border-slate-200 px-2 py-0.5 rounded uppercase font-mono",
								children: [
									"Macro",
									" ",
									selectedMacro.ordem < 10 ? `0${selectedMacro.ordem}` : selectedMacro.ordem
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
								className: "text-sm font-black text-slate-900 mt-1",
								children: ["Configurar: ", selectedMacro.nome]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: handleSaveJourney,
								disabled: saveMacrosMutation.isPending,
								className: "inline-flex h-8.5 items-center justify-center gap-1.5 rounded-lg bg-emerald-600 px-4 text-xs font-bold text-white shadow hover:bg-emerald-700 transition",
								children: [saveMacrosMutation.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3 w-3 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheckBig, { className: "h-3.5 w-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Salvar Configuração" })]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 sm:grid-cols-3 mt-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-[10px] font-bold text-slate-500 uppercase tracking-wider",
										children: "Nome do Macroprocesso"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										value: selectedMacro.nome,
										onChange: (e) => handleUpdateMacroField("nome", e.target.value),
										className: "h-8.5 w-full rounded-md border border-slate-200 px-3 text-xs font-semibold text-slate-800 outline-none focus:border-vibra-600 bg-slate-50/50"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-[10px] font-bold text-slate-500 uppercase tracking-wider",
										children: "Área Responsável"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										value: selectedMacro.area_responsavel,
										onChange: (e) => handleUpdateMacroField("area_responsavel", e.target.value),
										className: "h-8.5 w-full rounded-md border border-slate-200 px-3 text-xs font-semibold text-slate-800 outline-none focus:border-vibra-600 bg-slate-50/50"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-[10px] font-bold text-slate-500 uppercase tracking-wider",
										children: "Duração Estimada (Dias)"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "number",
										min: "1",
										value: selectedMacro.tempo_total,
										onChange: (e) => handleUpdateMacroField("tempo_total", Number(e.target.value)),
										className: "h-8.5 w-full rounded-md border border-slate-200 px-3 text-xs font-bold text-slate-800 outline-none focus:border-vibra-600 bg-slate-50/50"
									})]
								})
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "text-[12px] font-black text-slate-950 uppercase tracking-wider",
								children: "Microprocessos Associados"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] text-muted-foreground mt-0.5",
								children: "Adicione, associe e defina status, as-is, to-be, HC e nível de automação para cada etapa."
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: handleAddMicro,
								className: "inline-flex h-8 items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 text-[11px] font-bold text-slate-700 hover:bg-slate-100 px-3 transition shadow-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CirclePlus, { className: "h-4 w-4 text-vibra-700" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Adicionar Microprocesso" })]
							})]
						}), !selectedMacro.microprocessos || selectedMacro.microprocessos.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl border border-dashed border-slate-200 p-8 text-center bg-slate-50/40",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layers, { className: "h-7 w-7 text-slate-300 mx-auto mb-2" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] font-bold text-slate-600",
									children: "Nenhum microprocesso customizado para esta etapa."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[10px] text-slate-400 mt-1",
									children: "Serão exibidos os microprocessos default mapeados na tela da jornada até que você adicione ou associe novos itens."
								})
							]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-4 overflow-x-auto pb-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
								className: "w-full text-left text-[11px] border-collapse min-w-[700px]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "bg-slate-50 border-b border-slate-200 text-[9px] font-extrabold uppercase text-slate-400 tracking-wider",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "px-3 py-2 w-1/4",
											children: "Tipo / Identificação"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "px-3 py-2",
											children: "Status"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "px-3 py-2",
											children: "Avanço %"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "px-3 py-2",
											children: "AS IS (d)"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "px-3 py-2",
											children: "TO BE (d)"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "px-3 py-2",
											children: "HC"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "px-3 py-2",
											children: "Automação %"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "px-3 py-2 text-center w-10",
											children: "Ação"
										})
									]
								}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
									className: "divide-y divide-slate-100 bg-white",
									children: selectedMacro.microprocessos.map((mic) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
										className: "hover:bg-slate-50/50 transition",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "px-3 py-3 font-semibold",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "space-y-1.5",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "flex items-center gap-2",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
															className: "inline-flex items-center gap-1 cursor-pointer",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
																type: "checkbox",
																checked: !!mic.isMapped,
																onChange: (e) => handleUpdateMicroField(mic.id, "isMapped", e.target.checked),
																className: "rounded border-slate-300 text-vibra-600 focus:ring-vibra-500 h-3 w-3"
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "text-[9px] text-slate-500 uppercase",
																children: "Processo Mapeado"
															})]
														})
													}), mic.isMapped ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
														value: mic.id,
														onChange: (e) => handleUpdateMicroField(mic.id, "id", e.target.value),
														className: "h-8 w-full rounded border border-slate-200 bg-white px-2 text-[11px] font-semibold text-slate-700 outline-none",
														children: dbMicroprocessos.map((dbM) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
															value: dbM.id,
															children: dbM.titulo
														}, dbM.id))
													}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
														type: "text",
														value: mic.nome,
														onChange: (e) => handleUpdateMicroField(mic.id, "nome", e.target.value),
														className: "h-8 w-full rounded border border-slate-200 bg-white px-2 text-[11px] font-semibold text-slate-700 outline-none",
														placeholder: "Título do processo..."
													})]
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "px-3 py-3",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
													value: mic.status,
													onChange: (e) => handleUpdateMicroField(mic.id, "status", e.target.value),
													className: "h-8 rounded border border-slate-200 bg-white px-1.5 text-[10.5px] font-semibold text-slate-700 outline-none",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
															value: "Mapeada",
															children: "Mapeada"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
															value: "Em Desenvolvimento",
															children: "Em Desenvolvimento"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
															value: "Implantada",
															children: "Implantada"
														})
													]
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "px-3 py-3",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													type: "number",
													min: "0",
													max: "100",
													value: mic.progress,
													onChange: (e) => handleUpdateMicroField(mic.id, "progress", Number(e.target.value)),
													className: "h-8 w-14 rounded border border-slate-200 px-1 text-center font-bold text-slate-700 outline-none"
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "px-3 py-3",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													type: "number",
													min: "0",
													value: mic.tempo_asis,
													onChange: (e) => handleUpdateMicroField(mic.id, "tempo_asis", Number(e.target.value)),
													className: "h-8 w-14 rounded border border-slate-200 px-1 text-center font-bold text-slate-700 outline-none"
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "px-3 py-3",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													type: "number",
													min: "0",
													value: mic.tempo_tobe,
													onChange: (e) => handleUpdateMicroField(mic.id, "tempo_tobe", Number(e.target.value)),
													className: "h-8 w-14 rounded border border-slate-200 px-1 text-center font-bold text-slate-700 outline-none"
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "px-3 py-3",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													type: "number",
													min: "0",
													value: mic.hc,
													onChange: (e) => handleUpdateMicroField(mic.id, "hc", Number(e.target.value)),
													className: "h-8 w-12 rounded border border-slate-200 px-1 text-center font-bold text-slate-700 outline-none"
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "px-3 py-3",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													type: "number",
													min: "0",
													max: "100",
													value: mic.automation,
													onChange: (e) => handleUpdateMicroField(mic.id, "automation", Number(e.target.value)),
													className: "h-8 w-14 rounded border border-slate-200 px-1 text-center font-bold text-slate-700 outline-none"
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "px-3 py-3 text-center",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													type: "button",
													onClick: () => handleRemoveMicro(mic.id),
													className: "p-1.5 text-red-500 hover:bg-red-50 rounded transition",
													title: "Excluir Microprocesso",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" })
												})
											})
										]
									}, mic.id))
								})]
							})
						})]
					})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-center py-12 text-slate-400",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-6 w-6 animate-spin mx-auto mb-2" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Carregando dados da etapa..." })]
					})
				})]
			}),
			isFormOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm animate-fade-in",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-white rounded-xl shadow-xl max-w-4xl w-full border border-border overflow-hidden flex flex-col max-h-[90vh]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-4 bg-slate-50 border-b border-border flex justify-between items-center shrink-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-sm font-black text-slate-900",
								children: editingRecord ? "Editar Registro de Postos Petrobras" : "Inserir Novo Registro de Postos"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] text-muted-foreground",
								children: "Preencha as informações divididas de maneira inteligente nas abas temáticas abaixo."
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setIsFormOpen(false),
								className: "text-slate-400 hover:text-slate-600 font-bold text-xs p-1",
								children: "✕"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex border-b border-border shrink-0 bg-slate-50/50 overflow-x-auto",
							children: [
								{
									id: "geral",
									label: "Período & Geral",
									icon: Layers
								},
								{
									id: "tempos",
									label: "Tempos de Jornada",
									icon: Clock
								},
								{
									id: "postos",
									label: "Distribuição",
									icon: MapPin
								},
								{
									id: "vendas",
									label: "Oportunidades & Contratos",
									icon: TrendingUp
								},
								{
									id: "concessoes",
									label: "Concessões & Garantias",
									icon: DollarSign
								}
							].map((tab) => {
								const Icon = tab.icon;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => setFormTab(tab.id),
									className: `flex items-center gap-1.5 px-4 py-2.5 text-[11px] font-bold border-b-2 transition focus:outline-none whitespace-nowrap ${formTab === tab.id ? "border-vibra-700 text-vibra-800 bg-white" : "border-transparent text-muted-foreground hover:bg-slate-50"}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-3.5 w-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: tab.label })]
								}, tab.id);
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: handleSubmit,
							className: "flex-1 overflow-y-auto p-5 space-y-4",
							children: [
								formTab === "geral" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-4 sm:grid-cols-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "text-[10.5px] font-bold text-slate-700",
												children: "Data de Início do Período"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "date",
												required: true,
												value: formData.periodo_inicio || "",
												onChange: (e) => setFormData((p) => ({
													...p,
													periodo_inicio: e.target.value
												})),
												className: "h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-[12px] font-semibold text-slate-800 outline-none focus:border-vibra-600"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "text-[10.5px] font-bold text-slate-700",
												children: "Data de Fim do Período"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "date",
												required: true,
												value: formData.periodo_fim || "",
												onChange: (e) => setFormData((p) => ({
													...p,
													periodo_fim: e.target.value
												})),
												className: "h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-[12px] font-semibold text-slate-800 outline-none focus:border-vibra-600"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "text-[10.5px] font-bold text-slate-700",
												children: "TOTAL DE POSTOS"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "number",
												required: true,
												min: "0",
												value: formData.total_postos ?? "",
												onChange: (e) => setFormData((p) => ({
													...p,
													total_postos: Number(e.target.value)
												})),
												className: "h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-[12px] font-semibold text-slate-800 outline-none focus:border-vibra-600"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "text-[10.5px] font-bold text-slate-700",
												children: "TOTAL POSTOS NOVA IMAGEM"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "number",
												required: true,
												min: "0",
												value: formData.total_postos_nova_imagem ?? "",
												onChange: (e) => setFormData((p) => ({
													...p,
													total_postos_nova_imagem: Number(e.target.value)
												})),
												className: "h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-[12px] font-semibold text-slate-800 outline-none focus:border-vibra-600"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "text-[10.5px] font-bold text-slate-700",
												children: "META POSTOS NOVA IMAGEM"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "number",
												required: true,
												min: "0",
												value: formData.meta_postos_nova_imagem ?? "",
												onChange: (e) => setFormData((p) => ({
													...p,
													meta_postos_nova_imagem: Number(e.target.value)
												})),
												className: "h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-[12px] font-semibold text-slate-800 outline-none focus:border-vibra-600"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "text-[10.5px] font-bold text-slate-700",
												children: "CAPACIDADE ATUAL NOVA IMAGEM"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "number",
												required: true,
												min: "0",
												value: formData.capacidade_atual_nova_imagem ?? "",
												onChange: (e) => setFormData((p) => ({
													...p,
													capacidade_atual_nova_imagem: Number(e.target.value)
												})),
												className: "h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-[12px] font-semibold text-slate-800 outline-none focus:border-vibra-600"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1 sm:col-span-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "text-[10.5px] font-bold text-slate-700",
												children: "CAPACIDADE GERAL FUTURA ESTIMADA"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "number",
												required: true,
												min: "0",
												value: formData.capacidade_geral_futura_estimada ?? "",
												onChange: (e) => setFormData((p) => ({
													...p,
													capacidade_geral_futura_estimada: Number(e.target.value)
												})),
												className: "h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-[12px] font-semibold text-slate-800 outline-none focus:border-vibra-600"
											})]
										})
									]
								}),
								formTab === "tempos" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-4 sm:grid-cols-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "text-[10.5px] font-bold text-slate-700",
												children: "TEMPO EMBANDEIRAMENTO (INICIAL)"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "number",
												required: true,
												min: "0",
												value: formData.tempo_embandeiramento_inicial ?? "",
												onChange: (e) => setFormData((p) => ({
													...p,
													tempo_embandeiramento_inicial: Number(e.target.value)
												})),
												className: "h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-[12px] font-semibold text-slate-800 outline-none focus:border-vibra-600"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "text-[10.5px] font-bold text-slate-700",
												children: "TEMPO EMBANDEIRAMENTO (1ª Etapa)"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "number",
												required: true,
												min: "0",
												value: formData.tempo_embandeiramento_1etapa ?? "",
												onChange: (e) => setFormData((p) => ({
													...p,
													tempo_embandeiramento_1etapa: Number(e.target.value)
												})),
												className: "h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-[12px] font-semibold text-slate-800 outline-none focus:border-vibra-600"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "text-[10.5px] font-bold text-slate-700",
												children: "TEMPO EMBANDEIRAMENTO (2ª Etapa)"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "number",
												required: true,
												min: "0",
												value: formData.tempo_embandeiramento_2etapa ?? "",
												onChange: (e) => setFormData((p) => ({
													...p,
													tempo_embandeiramento_2etapa: Number(e.target.value)
												})),
												className: "h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-[12px] font-semibold text-slate-800 outline-none focus:border-vibra-600"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "text-[10.5px] font-bold text-slate-700",
												children: "TEMPO ESTIMADO DA JORNADA COMPLETA"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "number",
												required: true,
												min: "0",
												value: formData.tempo_embandeiramento_estimado_jornada_completa ?? "",
												onChange: (e) => setFormData((p) => ({
													...p,
													tempo_embandeiramento_estimado_jornada_completa: Number(e.target.value)
												})),
												className: "h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-[12px] font-semibold text-slate-800 outline-none focus:border-vibra-600"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "text-[10.5px] font-bold text-slate-700",
												children: "TEMPO ESTIMADO 1ª Etapa"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "number",
												required: true,
												min: "0",
												value: formData.tempo_embandeiramento_estimado_1etapa ?? "",
												onChange: (e) => setFormData((p) => ({
													...p,
													tempo_embandeiramento_estimado_1etapa: Number(e.target.value)
												})),
												className: "h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-[12px] font-semibold text-slate-800 outline-none focus:border-vibra-600"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "text-[10.5px] font-bold text-slate-700",
												children: "TEMPO ESTIMADA 2ª Etapa"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "number",
												required: true,
												min: "0",
												value: formData.tempo_embandeiramento_estimada_2etapa ?? "",
												onChange: (e) => setFormData((p) => ({
													...p,
													tempo_embandeiramento_estimada_2etapa: Number(e.target.value)
												})),
												className: "h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-[12px] font-semibold text-slate-800 outline-none focus:border-vibra-600"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "text-[10.5px] font-bold text-slate-700",
												children: "TEMPO EMBANDEIRAMENTO (REAL)"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "number",
												required: true,
												min: "0",
												value: formData.tempo_embandeiramento_real ?? "",
												onChange: (e) => setFormData((p) => ({
													...p,
													tempo_embandeiramento_real: Number(e.target.value)
												})),
												className: "h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-[12px] font-semibold text-slate-800 outline-none focus:border-vibra-600"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center justify-between",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
														className: "text-[10.5px] font-bold text-emerald-800 flex items-center gap-1",
														children: ["TEMPO EMBANDEIRAMENTO (REAL - MEREO)", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-[9px] bg-emerald-50 text-emerald-700 border border-emerald-100 rounded px-1.5 py-0.2",
															children: "Auto Mereo"
														})]
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														type: "button",
														onClick: () => setFormData((p) => ({
															...p,
															tempo_embandeiramento_real_mereo: mereoRealValue
														})),
														className: "text-[9px] font-black text-vibra-700 hover:underline",
														children: "Recarregar"
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													type: "number",
													required: true,
													min: "0",
													value: formData.tempo_embandeiramento_real_mereo ?? "",
													onChange: (e) => setFormData((p) => ({
														...p,
														tempo_embandeiramento_real_mereo: Number(e.target.value)
													})),
													className: "h-9 w-full rounded-md border border-emerald-200 bg-emerald-50/50 px-3 text-[12px] font-black text-emerald-800 outline-none focus:border-emerald-600"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-[9.5px] text-muted-foreground mt-0.5 leading-relaxed",
													children: "Calculado automaticamente da média dos resultados Mereo (GTESG00183, GTESG00207, GTESG00208) até hoje."
												})
											]
										})
									]
								}),
								formTab === "postos" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-4 sm:grid-cols-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "text-[10.5px] font-bold text-slate-700",
												children: "TOTAL POSTOS RENOVAÇÃO"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "number",
												required: true,
												min: "0",
												value: formData.total_postos_renovacao ?? "",
												onChange: (e) => setFormData((p) => ({
													...p,
													total_postos_renovacao: Number(e.target.value)
												})),
												className: "h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-[12px] font-semibold text-slate-800 outline-none focus:border-vibra-600"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "text-[10.5px] font-bold text-slate-700",
												children: "TOTAL POSTOS EMBANDEIRAMENTO"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "number",
												required: true,
												min: "0",
												value: formData.total_postos_embandeiramento ?? "",
												onChange: (e) => setFormData((p) => ({
													...p,
													total_postos_embandeiramento: Number(e.target.value)
												})),
												className: "h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-[12px] font-semibold text-slate-800 outline-none focus:border-vibra-600"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "text-[10.5px] font-bold text-slate-700",
												children: "TOTAL POSTOS IMPLANTAÇÃO"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "number",
												required: true,
												min: "0",
												value: formData.total_postos_implantacao ?? "",
												onChange: (e) => setFormData((p) => ({
													...p,
													total_postos_implantacao: Number(e.target.value)
												})),
												className: "h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-[12px] font-semibold text-slate-800 outline-none focus:border-vibra-600"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "text-[10.5px] font-bold text-slate-700",
												children: "TOTAL DE POSTOS VINCULAÇÃO"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "number",
												required: true,
												min: "0",
												value: formData.total_postos_vinculacao ?? "",
												onChange: (e) => setFormData((p) => ({
													...p,
													total_postos_vinculacao: Number(e.target.value)
												})),
												className: "h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-[12px] font-semibold text-slate-800 outline-none focus:border-vibra-600"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "text-[10.5px] font-bold text-slate-700",
												children: "ENGENHARIA EMBANDEIRAMENTO"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "number",
												required: true,
												min: "0",
												value: formData.engenharia_embandeiramento ?? "",
												onChange: (e) => setFormData((p) => ({
													...p,
													engenharia_embandeiramento: Number(e.target.value)
												})),
												className: "h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-[12px] font-semibold text-slate-800 outline-none focus:border-vibra-600"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "text-[10.5px] font-bold text-slate-700",
												children: "META ENGENHARIA EMBANDEIRAMENTO"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "number",
												required: true,
												min: "0",
												value: formData.meta_engenharia_embandeiramento ?? "",
												onChange: (e) => setFormData((p) => ({
													...p,
													meta_engenharia_embandeiramento: Number(e.target.value)
												})),
												className: "h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-[12px] font-semibold text-slate-800 outline-none focus:border-vibra-600"
											})]
										})
									]
								}),
								formTab === "vendas" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-4 sm:grid-cols-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "text-[10.5px] font-bold text-slate-700",
												children: "OPORTUNIDADES APROVADAS"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "number",
												required: true,
												min: "0",
												value: formData.oportunidades_aprovadas ?? "",
												onChange: (e) => setFormData((p) => ({
													...p,
													oportunidades_aprovadas: Number(e.target.value)
												})),
												className: "h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-[12px] font-semibold text-slate-800 outline-none focus:border-vibra-600"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "text-[10.5px] font-bold text-slate-700",
												children: "OPORTUNIDADES APROVADAS (ESTIMADA)"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "number",
												required: true,
												min: "0",
												value: formData.oportunidades_aprovadas_estimada ?? "",
												onChange: (e) => setFormData((p) => ({
													...p,
													oportunidades_aprovadas_estimada: Number(e.target.value)
												})),
												className: "h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-[12px] font-semibold text-slate-800 outline-none focus:border-vibra-600"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "text-[10.5px] font-bold text-slate-700",
												children: "CONTATOS ASSINADOS"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "number",
												required: true,
												min: "0",
												value: formData.contatos_assinados ?? "",
												onChange: (e) => setFormData((p) => ({
													...p,
													contatos_assinados: Number(e.target.value)
												})),
												className: "h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-[12px] font-semibold text-slate-800 outline-none focus:border-vibra-600"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "text-[10.5px] font-bold text-slate-700",
												children: "CONTATOS ASSINADOS (ESTIMADO)"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "number",
												required: true,
												min: "0",
												value: formData.contatos_assinados_estimado ?? "",
												onChange: (e) => setFormData((p) => ({
													...p,
													contatos_assinados_estimado: Number(e.target.value)
												})),
												className: "h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-[12px] font-semibold text-slate-800 outline-none focus:border-vibra-600"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "text-[10.5px] font-bold text-slate-700",
												children: "META REDE EMBANDEIRADA"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "number",
												required: true,
												min: "0",
												value: formData.meta_rede_embandeirada ?? "",
												onChange: (e) => setFormData((p) => ({
													...p,
													meta_rede_embandeirada: Number(e.target.value)
												})),
												className: "h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-[12px] font-semibold text-slate-800 outline-none focus:border-vibra-600"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "text-[10.5px] font-bold text-slate-700",
												children: "REALIZADO REDE EMBANDEIRADA"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "number",
												required: true,
												min: "0",
												value: formData.realizado_rede_embandeirada ?? "",
												onChange: (e) => setFormData((p) => ({
													...p,
													realizado_rede_embandeirada: Number(e.target.value)
												})),
												className: "h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-[12px] font-semibold text-slate-800 outline-none focus:border-vibra-600"
											})]
										})
									]
								}),
								formTab === "concessoes" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-4 sm:grid-cols-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "text-[10.5px] font-bold text-slate-700",
												children: "CONCESSÕES FINANCEIRAS TOTAL"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "number",
												required: true,
												min: "0",
												value: formData.concessoes_financeiras_total ?? "",
												onChange: (e) => setFormData((p) => ({
													...p,
													concessoes_financeiras_total: Number(e.target.value)
												})),
												className: "h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-[12px] font-semibold text-slate-800 outline-none focus:border-vibra-600"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "text-[10.5px] font-bold text-slate-700",
												children: "SEM GARANTIA REAL"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "number",
												required: true,
												min: "0",
												value: formData.sem_garantia_real ?? "",
												onChange: (e) => setFormData((p) => ({
													...p,
													sem_garantia_real: Number(e.target.value)
												})),
												className: "h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-[12px] font-semibold text-slate-800 outline-none focus:border-vibra-600"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "text-[10.5px] font-bold text-slate-700",
												children: "COM GARANTIA REAL (HIPOTECA)"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "number",
												required: true,
												min: "0",
												value: formData.com_garantia_real_hipoteca ?? "",
												onChange: (e) => setFormData((p) => ({
													...p,
													com_garantia_real_hipoteca: Number(e.target.value)
												})),
												className: "h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-[12px] font-semibold text-slate-800 outline-none focus:border-vibra-600"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "text-[10.5px] font-bold text-slate-700",
												children: "AMARAL MAIA (HIPOTECAS)"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "number",
												required: true,
												min: "0",
												value: formData.amaral_maia_hipotecas ?? "",
												onChange: (e) => setFormData((p) => ({
													...p,
													amaral_maia_hipotecas: Number(e.target.value)
												})),
												className: "h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-[12px] font-semibold text-slate-800 outline-none focus:border-vibra-600"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "text-[10.5px] font-bold text-slate-700",
												children: "TEMPO SEM GARANTIA REAL"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "number",
												required: true,
												min: "0",
												value: formData.tempo_sem_garantia_real ?? "",
												onChange: (e) => setFormData((p) => ({
													...p,
													tempo_sem_garantia_real: Number(e.target.value)
												})),
												className: "h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-[12px] font-semibold text-slate-800 outline-none focus:border-vibra-600"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "text-[10.5px] font-bold text-slate-700",
												children: "TEMPO COM GARANTIA REAL (HIPOTECA)"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "number",
												required: true,
												min: "0",
												value: formData.tempo_com_garantia_real_hipoteca ?? "",
												onChange: (e) => setFormData((p) => ({
													...p,
													tempo_com_garantia_real_hipoteca: Number(e.target.value)
												})),
												className: "h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-[12px] font-semibold text-slate-800 outline-none focus:border-vibra-600"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "text-[10.5px] font-bold text-slate-700",
												children: "TEMPO OPORTUNIDADE ATÉ PAGAMENTO COM TERMO DE CESSÃO"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "number",
												required: true,
												min: "0",
												value: formData.tempo_oportunidade_ate_pagamento_com_termo ?? "",
												onChange: (e) => setFormData((p) => ({
													...p,
													tempo_oportunidade_ate_pagamento_com_termo: Number(e.target.value)
												})),
												className: "h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-[12px] font-semibold text-slate-800 outline-none focus:border-vibra-600"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "text-[10.5px] font-bold text-slate-700",
												children: "TEMPO OPORTUNIDADE ATÉ PAGAMENTO SEM TERMO DE CESSÃO"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "number",
												required: true,
												min: "0",
												value: formData.tempo_oportunidade_ate_pagamento_sem_termo ?? "",
												onChange: (e) => setFormData((p) => ({
													...p,
													tempo_oportunidade_ate_pagamento_sem_termo: Number(e.target.value)
												})),
												className: "h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-[12px] font-semibold text-slate-800 outline-none focus:border-vibra-600"
											})]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "pt-4 border-t border-slate-100 flex items-center justify-end gap-2 shrink-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setIsFormOpen(false),
										className: "px-4 py-2 border border-slate-200 text-xs font-bold text-slate-700 rounded-lg hover:bg-slate-50 transition",
										children: "Cancelar"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "submit",
										disabled: saveMutation.isPending,
										className: "px-4 py-2 bg-vibra-700 text-white text-xs font-bold rounded-lg hover:bg-vibra-800 transition flex items-center gap-1.5 shadow",
										children: [saveMutation.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4.5 w-4.5 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheckBig, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Salvar Dados" })]
									})]
								})
							]
						})
					]
				})
			})
		]
	});
}
var TABS = [
	{
		id: "formulario",
		label: "Formulário"
	},
	{
		id: "postos",
		label: "Postos Petrobras"
	},
	{
		id: "analise",
		label: "Análise"
	},
	{
		id: "causa",
		label: "Metodologias"
	},
	{
		id: "resultados",
		label: "Resultados"
	},
	{
		id: "mural",
		label: "Mural de Imagens"
	},
	{
		id: "governanca",
		label: "Governança"
	},
	{
		id: "ferramentas",
		label: "Ferramentas"
	},
	{
		id: "bpmn",
		label: "BPMN"
	},
	{
		id: "agenda",
		label: "Agenda"
	},
	{
		id: "ajuda",
		label: "Pedido de Ajuda"
	}
];
var RENDER = {
	formulario: FormularioTab,
	postos: PostosPetrobrasTab,
	analise: () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GroupTab, { subtabs: [
		{
			id: "sipoc",
			label: "SIPOC",
			render: SipocTab
		},
		{
			id: "asis",
			label: "AS IS",
			render: AsisTab
		},
		{
			id: "tobe",
			label: "TO BE",
			render: TobeTab
		},
		{
			id: "resultados",
			label: "AS IS × TO BE",
			render: ResultadosTab
		}
	] }),
	causa: () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GroupTab, { subtabs: [
		{
			id: "causa",
			label: "Causa Raiz",
			render: CausaRaizTab
		},
		{
			id: "lean",
			label: "Lean",
			render: LeanTab
		},
		{
			id: "kaizen",
			label: "Kaizen",
			render: KaizenTab
		},
		{
			id: "dmaic",
			label: "DMAIC / Six Sigma",
			render: DmaicTab
		},
		{
			id: "matriz",
			label: "Matriz Esforço×Impacto",
			render: MatrizTab
		}
	] }),
	resultados: () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GroupTab, { subtabs: [
		{
			id: "evolucao",
			label: "Evolução",
			render: EvolucaoTab
		},
		{
			id: "top15",
			label: "Top 15",
			render: Top15Tab
		},
		{
			id: "status",
			label: "Status Estratégico",
			render: StatusEstrategicoTab
		}
	] }),
	mural: MuralImagensTab,
	governanca: () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GroupTab, { subtabs: [
		{
			id: "riscos",
			label: "Riscos",
			render: RiscosTab
		},
		{
			id: "cronograma",
			label: "Cronograma",
			render: CronogramaTab
		},
		{
			id: "controle",
			label: "Controle & Sustentação",
			render: ControleTab
		}
	] }),
	ferramentas: () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GroupTab, { subtabs: [
		{
			id: "fluxo",
			label: "Fluxo",
			render: FluxoTab
		},
		{
			id: "playbook",
			label: "Playbook",
			render: PlaybookTab
		},
		{
			id: "calculadora",
			label: "Calculadora",
			render: CalculadoraTab
		},
		{
			id: "checklist",
			label: "Checklist de Mapeamento",
			render: ChecklistTab
		}
	] }),
	bpmn: BpmnTab,
	agenda: AgendaTab,
	ajuda: AjudaTab
};
function MapeamentoPage() {
	const [tab, setTab] = (0, import_react.useState)("formulario");
	const { data: myRole = "visualizador" } = useQuery({
		queryKey: ["my-role"],
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
		return defaultVal;
	};
	const visibleTabs = TABS.filter((t) => hasPermission(`aba_mapeamento_${t.id}`, true));
	const currentTab = visibleTabs.some((t) => t.id === tab) ? tab : visibleTabs[0]?.id ?? "formulario";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		moduleId: "mapeamento",
		tabs: TABS,
		activeTab: currentTab,
		onTabChange: setTab,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RENDER[currentTab] ?? (() => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "p-6 text-slate-500",
			children: "Nenhuma aba disponível."
		})), {})
	});
}
//#endregion
export { MapeamentoPage as component };
