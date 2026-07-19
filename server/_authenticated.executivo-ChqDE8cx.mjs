import { o as __toESM } from "./_runtime.mjs";
import { n as supabase } from "./_ssr/client-BqoqJNkg.mjs";
import { u as require_react } from "./_libs/@floating-ui/react-dom+[...].mjs";
import { k as isRedirect, v as useRouter } from "./_libs/@tanstack/react-router+[...].mjs";
import { a as Trigger2, i as Root2, n as Header, r as Item$2, t as Content2, v as require_jsx_runtime } from "./_libs/@radix-ui/react-accordion+[...].mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "./_libs/tanstack__react-query.mjs";
import { $ as ListFilter, $t as Briefcase, A as Save, B as PanelsTopLeft, Bt as CircleCheckBig, C as SlidersVertical, Ct as Eye, Dt as DollarSign, E as Settings, Et as Download, F as Play, G as Medal, H as Move, Ht as ChevronUp, Jt as Camera, K as Maximize2, Kt as ChartColumn, L as Pencil, Lt as CircleQuestionMark, M as RefreshCw, Mt as Columns3, N as Presentation, P as Plus, Pt as Clock, R as Pen, S as Smile, St as FileSpreadsheet, T as ShieldAlert, Tt as ExternalLink, Ut as ChevronRight, V as Palette, Vt as CircleAlert, W as MessageCircle, Wt as ChevronDown, Xt as CalendarDays, Yt as Calendar, Zt as CalendarClock, _ as Star, a as Users, an as ArrowUpDown, at as LayoutGrid, cn as Activity, d as TrendingUp, dt as Image, en as BookOpen, et as ListChecks, f as TrendingDown, ft as History, h as Tag, ht as Grid3x3, i as Workflow, k as Search, kt as Cpu, l as Trophy, m as Terminal, mt as Grip, n as X, nn as Award, nt as Link2, o as User, p as Trash2, pt as Heart, q as MapPin, qt as ChartColumnIncreasing, rn as ArrowUp, s as Upload, sn as ArrowDown, t as Zap, tt as Link, u as TriangleAlert, vt as Funnel, w as SlidersHorizontal, wt as EyeOff, x as Sparkles, xt as FileText, y as SquareKanban, yt as Fuel, zt as CircleCheck } from "./_libs/lucide-react.mjs";
import { n as cn, r as useConfirm } from "./_ssr/useConfirm-Dt9lkcKc.mjs";
import { n as toast } from "./_libs/sonner.mjs";
import { a as syncHierarchyProgress, c as usePicklist, i as resequenceProjectIniciativas, l as useRealtimeTable, n as Sheet, r as SheetContent, s as useHierarchy, t as AppShell } from "./_ssr/usePicklist-vc052UFE.mjs";
import { i as deleteTaskSimple, n as deleteMicroprocessCascade, t as deleteInitiativeCascade } from "./_ssr/deleteService-Be7kYhOp.mjs";
import { i as TSS_SERVER_FUNCTION, l as createServerFn } from "./_ssr/esm-9EjmF9OT.mjs";
import { t as getServerFnById } from "./__23tanstack-start-server-fn-resolver-Cgl5J60e.mjs";
import { t as requireSupabaseAuth } from "./_ssr/auth-middleware-BJ3_P2sP.mjs";
import { a as prazoBadge, i as colorForId, n as VIBRA, o as prazoStatus, r as VIBRA_SERIES, t as PicklistField } from "./_ssr/PicklistField-t34RnOYJ.mjs";
import { n as stringType, t as objectType } from "./_libs/zod.mjs";
import { C as PolarRadiusAxis, D as Tooltip, E as ResponsiveContainer, O as Legend, S as PolarAngleAxis, T as Cell, _ as ReferenceLine, a as RadarChart, b as Radar, c as BarChart, d as XAxis, f as Scatter, g as CartesianGrid, h as Line, i as ScatterChart, l as LineChart, m as Area, n as RadialBarChart, o as Treemap, p as ZAxis, r as AreaChart, s as PieChart, t as ComposedChart, u as YAxis, v as Bar, w as PolarGrid, x as Pie, y as RadialBar } from "./_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_authenticated.executivo-ChqDE8cx.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function useServerFn(serverFn) {
	const router = useRouter();
	return import_react.useCallback(async (...args) => {
		try {
			const res = await serverFn(...args);
			if (isRedirect(res)) throw res;
			return res;
		} catch (err) {
			if (isRedirect(err)) {
				err.options._fromLocation = router.stores.location.get();
				return router.navigate(router.resolveRedirect(err).options);
			}
			throw err;
		}
	}, [router, serverFn]);
}
function formatMinutesToHoursMinutesSuffix(minutes) {
	const rounded = Math.round(minutes);
	const hours = Math.floor(rounded / 60);
	const remainingMinutes = rounded % 60;
	return `(${hours}h ${remainingMinutes < 10 ? `0${remainingMinutes}` : `${remainingMinutes}`}min)`;
}
function ProjectOverview360({ selectedProjetoIds, iniciativas, macros }) {
	const [viewerImage, setViewerImage] = (0, import_react.useState)(null);
	const [selectedIniciativaId, setSelectedIniciativaId] = (0, import_react.useState)("");
	const iniciativasFiltradas = (0, import_react.useMemo)(() => {
		if (selectedIniciativaId) return iniciativas.filter((i) => i.id === selectedIniciativaId);
		return iniciativas;
	}, [iniciativas, selectedIniciativaId]);
	const { data: changeProcesses = [] } = useQuery({
		queryKey: ["project-change-processes-360", selectedProjetoIds?.join(",") ?? "_all"],
		queryFn: async () => {
			let q = supabase.from("gestao_mudanca").select("*").is("deleted_at", null);
			if (selectedProjetoIds) q = q.in("projeto_id", selectedProjetoIds);
			const { data } = await q;
			return data ?? [];
		}
	});
	const { data: changeScorecards = [] } = useQuery({
		queryKey: ["project-change-scorecards-360", selectedProjetoIds?.join(",") ?? "_all"],
		queryFn: async () => {
			let q = supabase.from("scorecard_mudanca").select("*");
			if (selectedProjetoIds) q = q.in("projeto_id", selectedProjetoIds);
			const { data } = await q;
			return data ?? [];
		}
	});
	const { data: projectImages = [] } = useQuery({
		queryKey: ["project-images-360", selectedProjetoIds?.join(",") ?? "_all"],
		queryFn: async () => {
			let q = supabase.from("projeto_imagens").select("*").is("deleted_at", null);
			if (selectedProjetoIds) q = q.in("projeto_id", selectedProjetoIds);
			const { data } = await q;
			return data ?? [];
		}
	});
	const activeProjectName = (0, import_react.useMemo)(() => {
		if (selectedProjetoIds && selectedProjetoIds.length === 1) {
			const match = macros.find((m) => m.id === selectedProjetoIds[0]);
			return match ? match.nome : "Projeto Selecionado";
		}
		return "Múltiplos Projetos (Portfólio Consolidado)";
	}, [selectedProjetoIds, macros]);
	(0, import_react.useMemo)(() => {
		if (!selectedProjetoIds || selectedProjetoIds.length === 0) return false;
		return selectedProjetoIds.some((id) => {
			const p = macros.find((m) => m.id === id);
			return p && p.nome && p.nome.trim().startsWith("Expansão de Postos");
		});
	}, [selectedProjetoIds, macros]);
	const iniciativaIds = (0, import_react.useMemo)(() => iniciativasFiltradas.map((i) => i.id).filter(Boolean), [iniciativasFiltradas]);
	const { data: allTobeSteps = [] } = useQuery({
		queryKey: ["project-overview-tobe-steps", iniciativaIds.join(",")],
		queryFn: async () => {
			if (iniciativaIds.length === 0) return [];
			const { data, error } = await supabase.from("tobe_passos").select("*").in("iniciativa_id", iniciativaIds).is("deleted_at", null);
			if (error) {
				console.error("Error fetching tobe steps:", error);
				return [];
			}
			return data ?? [];
		},
		enabled: iniciativaIds.length > 0
	});
	const { data: allAsisSteps = [] } = useQuery({
		queryKey: ["project-overview-asis-steps", iniciativaIds.join(",")],
		queryFn: async () => {
			if (iniciativaIds.length === 0) return [];
			const { data, error } = await supabase.from("asis_passos").select("*").in("iniciativa_id", iniciativaIds).is("deleted_at", null);
			if (error) {
				console.error("Error fetching asis steps:", error);
				return [];
			}
			return data ?? [];
		},
		enabled: iniciativaIds.length > 0
	});
	const iniciativasCalculadas = (0, import_react.useMemo)(() => {
		return iniciativasFiltradas.map((i) => {
			const isAIorRPA = [
				"Sistema Integrado - Dev IA Inteligência Artificial",
				"Automação RPA",
				"Sistema Integrado - Dev IA",
				"Inteligência Artificial"
			].includes(i.tipo_melhoria || "");
			const tobeStepsForIni = allTobeSteps.filter((step) => step.iniciativa_id === i.id);
			const asisStepsForIni = allAsisSteps.filter((step) => step.iniciativa_id === i.id);
			let ganhoRua = 0;
			let ganhoFteVal = 0;
			let tempoEconVal = 0;
			if (tobeStepsForIni.length > 0) {
				ganhoRua = tobeStepsForIni.reduce((s, r) => s + Number(r.ganho_financeiro ?? 0), 0);
				ganhoFteVal = tobeStepsForIni.reduce((s, r) => s + Number(r.ganho_fte ?? 0), 0);
				const tAsisTotal = asisStepsForIni.reduce((s, r) => s + Number(r.tempo ?? 0), 0);
				const tTobeTotal = tobeStepsForIni.reduce((s, r) => s + Number(r.tempo ?? 0), 0);
				tempoEconVal = Math.max(0, tAsisTotal - tTobeTotal);
			} else {
				ganhoRua = Number(i.ganho_financeiro || i.saving_previsto || 0);
				ganhoFteVal = Number(i.hc_liberado || i.hc_alcancado || 0);
				const asIsMin = Number(i.tempo_max || i.tempo_min || 0);
				const toBeMin = Number(i.tempo_futuro || 0);
				tempoEconVal = Math.max(0, asIsMin - toBeMin);
			}
			const pctAuto = Number(i.expectativa_produtividade || 0);
			return {
				...i,
				ganhoRua,
				ganhoFteVal,
				tempoEconVal,
				pctAuto,
				isAIorRPA
			};
		});
	}, [
		iniciativasFiltradas,
		allTobeSteps,
		allAsisSteps
	]);
	const totalSavingRealizado = (0, import_react.useMemo)(() => {
		return iniciativasCalculadas.reduce((s, i) => s + i.ganhoRua, 0);
	}, [iniciativasCalculadas]);
	const totalCustoImplementacao = (0, import_react.useMemo)(() => {
		return iniciativasCalculadas.reduce((s, i) => s + Number(i.custo_implementacao || 0), 0);
	}, [iniciativasCalculadas]);
	(0, import_react.useMemo)(() => {
		return totalCustoImplementacao > 0 ? (totalSavingRealizado - totalCustoImplementacao) / totalCustoImplementacao * 100 : 0;
	}, [totalSavingRealizado, totalCustoImplementacao]);
	const projectMetrics = (0, import_react.useMemo)(() => {
		const totalIniciativas = iniciativasCalculadas.length;
		const hasIniciativas = totalIniciativas > 0;
		const hcAsIs = hasIniciativas ? iniciativasCalculadas.reduce((acc, i) => acc + Number(i.hc_atual || i.hc_estimado || 0), 0) : 12;
		const fteFreed = hasIniciativas ? iniciativasCalculadas.reduce((acc, i) => acc + i.ganhoFteVal, 0) : 3.4;
		const hcToBe = Math.max(0, hcAsIs - fteFreed);
		const ltAsIs = hasIniciativas ? iniciativasCalculadas.reduce((acc, i) => {
			return acc + (allAsisSteps.filter((step) => step.iniciativa_id === i.id).reduce((s, r) => s + Number(r.tempo ?? 0), 0) || Number(i.tempo_max || i.tempo_min || 0) || Number(i.esforco || 3) * 12 * 60);
		}, 0) : 9e3;
		const ltToBe = hasIniciativas ? iniciativasCalculadas.reduce((acc, i) => {
			const sumTobe = allTobeSteps.filter((step) => step.iniciativa_id === i.id).reduce((s, r) => s + Number(r.tempo ?? 0), 0);
			if (sumTobe > 0) return acc + sumTobe;
			return acc + (Number(i.tempo_max || i.tempo_min || 0) || Number(i.esforco || 3) * 12 * 60) * (1 - i.pctAuto / 100);
		}, 0) : 5700;
		const tAsIs = hasIniciativas ? iniciativasCalculadas.reduce((acc, i) => acc + Number(i.horas_gastas_mes || 0), 0) : 320;
		const tToBe = hasIniciativas ? iniciativasCalculadas.reduce((acc, i) => acc + Number(i.horas_futuras_mes || 0), 0) || tAsIs * .45 : 140;
		const autoCount = hasIniciativas ? iniciativasCalculadas.filter((i) => {
			const hasHighPotential = i.pctAuto >= 50;
			return i.isAIorRPA || hasHighPotential;
		}).length : 3;
		const manualCount = hasIniciativas ? iniciativasCalculadas.filter((i) => {
			const hasHighPotential = i.pctAuto >= 50;
			return !(i.isAIorRPA || hasHighPotential);
		}).length : 5;
		const annualSaving = totalSavingRealizado || (hasIniciativas ? 0 : 25e4);
		const accumulativeSavings = [
			{
				year: "Ano 1",
				"Ganho Acumulado": annualSaving
			},
			{
				year: "Ano 2",
				"Ganho Acumulado": annualSaving * 2
			},
			{
				year: "Ano 3",
				"Ganho Acumulado": annualSaving * 3
			},
			{
				year: "Ano 4",
				"Ganho Acumulado": annualSaving * 4
			},
			{
				year: "Ano 5",
				"Ganho Acumulado": annualSaving * 5
			}
		];
		const tempoDesperdicado = tAsIs;
		const tempoReducao = Math.max(0, tAsIs - tToBe);
		const costAsIs = hasIniciativas ? iniciativasCalculadas.reduce((acc, i) => acc + Number(i.horas_gastas_mes || 0) * Number(i.custo_hora || 0), 0) || tAsIs * 50 : 16e3;
		const costToBe = hasIniciativas ? iniciativasCalculadas.reduce((acc, i) => acc + Number(i.horas_futuras_mes || 0) * Number(i.custo_hora || 0), 0) || tToBe * 50 : 7e3;
		const errorAsIs = hasIniciativas ? iniciativasCalculadas.reduce((acc, i) => acc + Number(i.taxa_erro || 0), 0) / totalIniciativas || 15 : 15;
		const errorToBe = hasIniciativas ? iniciativasCalculadas.reduce((acc, i) => acc + Number(i.retrabalho || 0), 0) / totalIniciativas || errorAsIs * .2 : 3;
		const autoOrAiIniciativas = iniciativasCalculadas.filter((i) => {
			return i.isAIorRPA || Number(i.potencial_automacao || 0) > 0;
		});
		return {
			hcAsIs,
			hcToBe,
			fteFreed,
			ltAsIs,
			ltToBe,
			tAsIs,
			tToBe,
			manualCount,
			autoCount,
			accumulativeSavings,
			tempoDesperdicado,
			tempoReducao,
			costAsIs,
			costToBe,
			errorAsIs,
			errorToBe,
			avgAutomation: autoOrAiIniciativas.length ? autoOrAiIniciativas.reduce((acc, i) => acc + i.pctAuto, 0) / autoOrAiIniciativas.length : 68,
			diasReduzidos: Math.max(0, (ltAsIs - ltToBe) / 60 / 8),
			ganhoHorasMes: Math.max(0, tAsIs - tToBe),
			depTiCount: iniciativasCalculadas.filter((i) => i.dependencia_ti === true).length,
			ganhoProdutividade: tAsIs > 0 ? (tAsIs - tToBe) / tAsIs * 100 : 58.5,
			tempoEconomizadoMin: hasIniciativas ? iniciativasCalculadas.reduce((s, i) => s + i.tempoEconVal, 0) : 6572
		};
	}, [
		iniciativasCalculadas,
		allAsisSteps,
		allTobeSteps,
		totalSavingRealizado
	]);
	const reductionByInitiative = (0, import_react.useMemo)(() => {
		return iniciativasCalculadas.map((i) => {
			const asIsMin = Number(i.tempo_max || i.tempo_min || 0);
			const sumAsis = allAsisSteps.filter((step) => step.iniciativa_id === i.id).reduce((s, r) => s + Number(r.tempo ?? 0), 0);
			const asIsDias = sumAsis > 0 ? sumAsis / 60 / 8 : asIsMin > 0 ? asIsMin / 60 / 8 : Number(i.esforco || 3) * 1.5;
			const sumTobe = allTobeSteps.filter((step) => step.iniciativa_id === i.id).reduce((s, r) => s + Number(r.tempo ?? 0), 0);
			const toBeDias = sumTobe > 0 ? sumTobe / 60 / 8 : Number(i.tempo_futuro || 0) > 0 ? Number(i.tempo_futuro) / 60 / 8 : asIsDias * (1 - i.pctAuto / 100);
			const reducaoDias = Math.max(0, asIsDias - toBeDias);
			const pctAuto = i.pctAuto;
			return {
				name: (i.titulo || "Iniciativa").slice(0, 15),
				"Redução (Dias)": Number(reducaoDias.toFixed(1)),
				"Automação %": Math.round(pctAuto)
			};
		}).slice(0, 8);
	}, [
		iniciativasCalculadas,
		allAsisSteps,
		allTobeSteps
	]);
	const hcFteByInitiative = (0, import_react.useMemo)(() => {
		return iniciativasCalculadas.map((i) => ({
			name: (i.titulo || "Iniciativa").slice(0, 15),
			"HC Atual (FTE)": Number(i.hc_atual || i.hc_estimado || 0),
			"FTE Liberado": i.ganhoFteVal || Number(i.hc_atual || 0) * .3
		})).slice(0, 8);
	}, [iniciativasCalculadas]);
	const processHoursByInitiative = (0, import_react.useMemo)(() => {
		return iniciativasCalculadas.map((i) => {
			const gastas = Number(i.horas_gastas_mes || 0);
			const futuras = Number(i.horas_futuras_mes || 0);
			const economizadas = Math.max(0, gastas - futuras);
			return {
				name: (i.titulo || "Iniciativa").slice(0, 15),
				"Horas Gastas/Mês": gastas || Number(i.tempo_max || i.tempo_min || 45) * 22 / 60,
				"Horas Economizadas/Mês": economizadas || Number(i.tempo_max || i.tempo_min || 45) * 22 * .4 / 60
			};
		}).slice(0, 8);
	}, [iniciativasCalculadas]);
	const wasteRanking = (0, import_react.useMemo)(() => {
		const counts = {};
		iniciativasCalculadas.forEach((i) => {
			(Array.isArray(i.desperdicios_lean) ? i.desperdicios_lean : typeof i.desperdicios_lean === "string" ? String(i.desperdicios_lean).split(",") : []).forEach((w) => {
				const trimmed = w.trim();
				if (trimmed) counts[trimmed] = (counts[trimmed] || 0) + 1;
			});
		});
		[
			"Superprocessamento",
			"Espera (Gargalo)",
			"Retrabalho",
			"Transporte",
			"Movimentação de Pessoas",
			"Silos de Conhecimento",
			"Excesso de Atividades"
		].forEach((w, idx) => {
			if (!counts[w]) counts[w] = Math.max(1, 5 - idx);
		});
		return Object.entries(counts).map(([name, value]) => ({
			name,
			value
		})).sort((a, b) => b.value - a.value).slice(0, 5);
	}, [iniciativasCalculadas]);
	(0, import_react.useMemo)(() => {
		if (changeScorecards.length > 0) {
			const s = changeScorecards[0];
			return [
				{
					name: "Cultura",
					"AS IS (Atual)": s.score_cultural_asis || 2,
					"TO BE (Almejado)": s.score_cultural_tobe || 4
				},
				{
					name: "Padronização",
					"AS IS (Atual)": s.score_padronizacao_asis || 1,
					"TO BE (Almejado)": s.score_padronizacao_tobe || 5
				},
				{
					name: "Estruturação",
					"AS IS (Atual)": s.score_estruturacao_asis || 2,
					"TO BE (Almejado)": s.score_estruturacao_tobe || 4
				},
				{
					name: "Organização",
					"AS IS (Atual)": s.score_organizacao_asis || 2,
					"TO BE (Almejado)": s.score_organizacao_tobe || 5
				}
			];
		}
		return [
			{
				name: "Cultura",
				"AS IS (Atual)": 2,
				"TO BE (Almejado)": 4
			},
			{
				name: "Padronização",
				"AS IS (Atual)": 1,
				"TO BE (Almejado)": 5
			},
			{
				name: "Estruturação",
				"AS IS (Atual)": 2,
				"TO BE (Almejado)": 4
			},
			{
				name: "Organização",
				"AS IS (Atual)": 2,
				"TO BE (Almejado)": 5
			}
		];
	}, [changeScorecards]);
	const executorTimeData = (0, import_react.useMemo)(() => {
		const asIsMap = {};
		const toBeMap = {};
		allAsisSteps.forEach((step) => {
			const exec = step.executor || "Outros";
			asIsMap[exec] = (asIsMap[exec] || 0) + Number(step.tempo ?? 0);
		});
		allTobeSteps.forEach((step) => {
			const exec = step.executor || "Outros";
			toBeMap[exec] = (toBeMap[exec] || 0) + Number(step.tempo ?? 0);
		});
		return Array.from(/* @__PURE__ */ new Set([...Object.keys(asIsMap), ...Object.keys(toBeMap)])).map((exec) => ({
			name: exec.slice(0, 15),
			"AS IS (Horas)": Number(Number((asIsMap[exec] || 0) / 60).toFixed(1)),
			"TO BE (Horas)": Number(Number((toBeMap[exec] || 0) / 60).toFixed(1))
		}));
	}, [allAsisSteps, allTobeSteps]);
	const stepsPerInitiativeData = (0, import_react.useMemo)(() => {
		return iniciativasCalculadas.map((ini) => {
			const asIsCount = allAsisSteps.filter((s) => s.iniciativa_id === ini.id).length;
			const toBeCount = allTobeSteps.filter((s) => s.iniciativa_id === ini.id).length;
			return {
				name: ini.codigo || (ini.titulo || "Iniciativa").slice(0, 10),
				"Passos AS IS": asIsCount,
				"Passos TO BE": toBeCount
			};
		});
	}, [
		iniciativasCalculadas,
		allAsisSteps,
		allTobeSteps
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		id: "dashboard_360_projeto_view",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-vibra-200 bg-slate-50 p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "rounded-full bg-vibra-100 px-2.5 py-0.5 text-[9.5px] font-extrabold text-vibra-800 uppercase tracking-widest border border-vibra-200",
						children: "Mapeamento & Visão 360º de Detalhe"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-[16px] font-extrabold text-slate-900 mt-1.5",
						children: activeProjectName
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground mt-0.5",
						children: "Valores de performance operacional comparados em tempo real de AS IS contra os ganhos TO BE."
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col sm:items-end gap-1.5 shrink-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "text-[10px] font-bold text-slate-700 uppercase tracking-wider",
						children: "Filtrar por Iniciativa (BI):"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						value: selectedIniciativaId,
						onChange: (e) => setSelectedIniciativaId(e.target.value),
						className: "rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-800 focus:border-vibra-500 focus:outline-none shadow-sm cursor-pointer min-w-[240px] hover:border-slate-300 transition",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							children: "Todas as Iniciativas (Consolidado)"
						}), iniciativas.map((ini) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
							value: ini.id,
							children: [
								"[",
								ini.codigo || "INI-—",
								"] ",
								ini.titulo
							]
						}, ini.id))]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3.5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border bg-card p-4 shadow-vibra-sm transition hover:shadow-vibra",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground",
									children: "Ganho R$/Ano"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "flex h-7.5 w-7.5 items-center justify-center rounded bg-emerald-50 text-emerald-600",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DollarSign, { className: "h-4 w-4" })
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2 text-[22px] font-black tracking-tight text-emerald-700",
								children: totalSavingRealizado.toLocaleString("pt-BR", {
									style: "currency",
									currency: "BRL",
									minimumFractionDigits: 2,
									maximumFractionDigits: 2
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-1 text-[10.5px] text-muted-foreground flex items-center gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-bold text-emerald-800",
									children: "100% realimentado"
								}), " das iniciativas"]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border bg-card p-4 shadow-vibra-sm transition hover:shadow-vibra",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground",
									children: "FTE Total Liberado"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "flex h-7.5 w-7.5 items-center justify-center rounded bg-blue-50 text-blue-600",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-4 w-4" })
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-2 text-[22px] font-black tracking-tight text-blue-700",
								children: [projectMetrics.fteFreed.toFixed(2), " FTE"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-1 text-[10.5px] text-muted-foreground flex items-center gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Conversão: " }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-bold text-blue-900",
									children: [projectMetrics.hcAsIs.toFixed(1), " HC Total"]
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border bg-card p-4 shadow-vibra-sm transition hover:shadow-vibra",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground",
									children: "Dias Úteis Reduzidos"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "flex h-7.5 w-7.5 items-center justify-center rounded bg-orange-50 text-orange-600",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-4 w-4" })
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-2 text-[22px] font-black tracking-tight text-orange-600",
								children: [projectMetrics.diasReduzidos.toFixed(1), " dias"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-1 text-[10.5px] text-muted-foreground flex items-center gap-1",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Ganho acumulado de Lead Time" })
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border bg-card p-4 shadow-vibra-sm transition hover:shadow-vibra",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground",
									children: "Ganho de Tempo Total"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "flex h-7.5 w-7.5 items-center justify-center rounded bg-purple-50 text-purple-600",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "h-4 w-4" })
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-2 text-[22px] font-black tracking-tight text-purple-700",
								children: [projectMetrics.ganhoHorasMes.toFixed(0), " h/mês"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-1 text-[10.5px] text-muted-foreground flex flex-col gap-0.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									"Eficiência:",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "font-bold text-purple-900",
										children: [projectMetrics.ganhoProdutividade.toFixed(1), "%"]
									})
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									"Tempo Economizado:",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "font-bold text-purple-900",
										children: [
											projectMetrics.tempoEconomizadoMin.toLocaleString("pt-BR"),
											" min",
											" ",
											formatMinutesToHoursMinutesSuffix(projectMetrics.tempoEconomizadoMin)
										]
									})
								] })]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border bg-card p-4 shadow-vibra-sm transition hover:shadow-vibra",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground",
									children: "Média Automação / IA %"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "flex h-7.5 w-7.5 items-center justify-center rounded bg-emerald-50 text-emerald-600",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "h-4 w-4" })
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-2 text-[22px] font-black tracking-tight text-emerald-600",
								children: [projectMetrics.avgAutomation.toFixed(1), "%"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-1 text-[10.5px] text-muted-foreground flex items-center gap-1",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Automatização operacional média" })
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border bg-card p-4 shadow-vibra-sm transition hover:shadow-vibra",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground",
									children: "Atividades Manuais vs Auto/IA"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "flex h-7.5 w-7.5 items-center justify-center rounded bg-amber-50 text-amber-600",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "h-4 w-4" })
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-2 text-[22px] font-black tracking-tight text-slate-800",
								children: [
									projectMetrics.manualCount,
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm font-semibold text-muted-foreground",
										children: "vs"
									}),
									" ",
									projectMetrics.autoCount
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-1 text-[10.5px] text-muted-foreground",
								children: "Processos manuais vs automatizados/IA"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border bg-card p-4 shadow-vibra-sm transition hover:shadow-vibra sm:col-span-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground",
									children: "Dependência de TI Corporativo"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "flex h-7.5 w-7.5 items-center justify-center rounded bg-amber-50 text-amber-600",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "h-4 w-4" })
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-2 text-[22px] font-black tracking-tight text-amber-700",
								children: [
									projectMetrics.depTiCount,
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm font-semibold text-muted-foreground",
										children: "iniciativas dependentes"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-1 text-[10.5px] text-muted-foreground flex items-center gap-1",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Risco de backlog em TI para automação robótica (RPA)" })
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 md:grid-cols-2 lg:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border bg-card p-4 shadow-vibra-sm flex flex-col justify-between",
						id: "chart_hc_comparison",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "text-[13px] font-bold text-slate-900",
								children: "Dimensionamento de Equipe (HC)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] text-muted-foreground",
								children: "AS IS x TO BE (FTEs calculados)"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-[180px] w-full my-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
									width: "100%",
									height: "100%",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
										data: [{
											name: "AS IS",
											Headcount: projectMetrics.hcAsIs
										}, {
											name: "TO BE",
											Headcount: projectMetrics.hcToBe
										}],
										margin: {
											left: -25,
											right: 5
										},
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
												strokeDasharray: "3 3",
												stroke: "#f1f1f1"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
												dataKey: "name",
												tick: { fontSize: 9.5 }
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, { tick: { fontSize: 9.5 } }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Bar, {
												dataKey: "Headcount",
												radius: [
													4,
													4,
													0,
													0
												],
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: "#0B2545" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: "#0000FF" })]
											})
										]
									})
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-[10.5px] bg-slate-50 p-2 rounded text-slate-700 font-medium",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
									"💡",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "font-bold",
										children: [
											"FTE Liberado: ",
											projectMetrics.fteFreed.toFixed(2),
											" FTE"
										]
									})
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-[9.5px] text-muted-foreground mt-0.5",
									children: [
										"Conversão de HC Total em FTE: ",
										projectMetrics.hcAsIs.toFixed(2),
										" FTE (AS IS) →",
										" ",
										projectMetrics.hcToBe.toFixed(2),
										" FTE (TO BE)"
									]
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border bg-card p-4 shadow-vibra-sm flex flex-col justify-between",
						id: "chart_lead_time_comparison",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "text-[13px] font-bold text-slate-900",
								children: "Lead Time do Processo (h)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] text-muted-foreground",
								children: "AS IS x TO BE (Tempo de Resposta do Fluxo)"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-[180px] w-full my-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
									width: "100%",
									height: "100%",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
										data: [{
											name: "AS IS",
											Horas: projectMetrics.ltAsIs / 60,
											Minutos: projectMetrics.ltAsIs
										}, {
											name: "TO BE",
											Horas: projectMetrics.ltToBe / 60,
											Minutos: projectMetrics.ltToBe
										}],
										margin: { left: -20 },
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
												strokeDasharray: "3 3",
												stroke: "#f1f1f1"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
												dataKey: "name",
												tick: { fontSize: 10 }
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, { tick: { fontSize: 10 } }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { content: ({ active, payload }) => {
												if (active && payload && payload.length) {
													const data = payload[0].payload;
													return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "bg-white p-2.5 border border-border rounded-lg shadow-md text-[11.5px] space-y-1",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																className: "font-extrabold text-slate-800",
																children: data.name
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
																className: "text-slate-600 font-medium",
																children: [
																	"Total:",
																	" ",
																	/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
																		className: "font-bold text-slate-900",
																		children: [data.Minutos.toFixed(0), " minutos"]
																	})
																]
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
																className: "text-emerald-700 font-medium",
																children: [
																	"Total convertido:",
																	" ",
																	/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
																		className: "font-black text-emerald-800",
																		children: [data.Horas.toFixed(2), " horas"]
																	})
																]
															})
														]
													});
												}
												return null;
											} }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Bar, {
												dataKey: "Horas",
												radius: [
													4,
													4,
													0,
													0
												],
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: "#0B2545" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: "#0000FF" })]
											})
										]
									})
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-[10.5px] bg-slate-50 p-2 rounded text-slate-700 font-medium",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
									"📉",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "font-bold",
										children: [
											"Redução de Lead Time:",
											" ",
											projectMetrics.ltAsIs > 0 ? ((projectMetrics.ltAsIs - projectMetrics.ltToBe) / projectMetrics.ltAsIs * 100).toFixed(0) : "0",
											"%"
										]
									})
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-[9.5px] text-muted-foreground mt-0.5",
									children: [
										"De ",
										(projectMetrics.ltAsIs / 60).toFixed(1),
										"h para",
										" ",
										(projectMetrics.ltToBe / 60).toFixed(1),
										"h (",
										(projectMetrics.ltAsIs - projectMetrics.ltToBe).toFixed(0),
										" min economizados)"
									]
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border bg-card p-4 shadow-vibra-sm flex flex-col justify-between",
						id: "chart_tempo_comparison",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "text-[13px] font-bold text-slate-900",
								children: "Tempo de Processamento (h/Mês)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] text-muted-foreground",
								children: "Tempo ativo dedicado à execução das tarefas"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-[180px] w-full my-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
									width: "100%",
									height: "100%",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
										data: [{
											name: "AS IS",
											Horas: projectMetrics.tAsIs
										}, {
											name: "TO BE",
											Horas: projectMetrics.tToBe
										}],
										margin: { left: -20 },
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
												strokeDasharray: "3 3",
												stroke: "#f1f1f1"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
												dataKey: "name",
												tick: { fontSize: 10 }
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, { tick: { fontSize: 10 } }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Bar, {
												dataKey: "Horas",
												radius: [
													4,
													4,
													0,
													0
												],
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: "#0B2545" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: "#0000FF" })]
											})
										]
									})
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-[10.5px] bg-slate-50 p-2 rounded text-slate-700 font-medium",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
									"⏳",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "font-bold",
										children: [
											"Horas economizadas:",
											" ",
											Math.max(0, projectMetrics.tAsIs - projectMetrics.tToBe).toFixed(0),
											"h/mês"
										]
									})
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[9px] text-muted-foreground mt-0.5",
									children: "Redução de esforço de digitação e retrabalhos manuais."
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border bg-card p-4 shadow-vibra-sm flex flex-col justify-between",
						id: "chart_reducao_dias_iniciativa",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "text-[13px] font-bold text-slate-900",
								children: "Redução de Lead Time vs. Automação"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] text-muted-foreground",
								children: "Comparativo de Dias Salvos & Nível de Automação"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-[180px] w-full my-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
									width: "100%",
									height: "100%",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ComposedChart, {
										data: reductionByInitiative,
										margin: { left: -25 },
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
												strokeDasharray: "3 3",
												stroke: "#f1f1f1"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
												dataKey: "name",
												tick: { fontSize: 8.5 }
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
												yAxisId: "left",
												tick: { fontSize: 8.5 },
												label: {
													value: "Dias Salvos",
													angle: -90,
													position: "insideLeft",
													fontSize: 8.5
												}
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
												yAxisId: "right",
												orientation: "right",
												tick: { fontSize: 8.5 },
												domain: [0, 100]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
												yAxisId: "left",
												dataKey: "Redução (Dias)",
												fill: VIBRA.orange,
												radius: [
													4,
													4,
													0,
													0
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
												yAxisId: "right",
												type: "monotone",
												dataKey: "Automação %",
												stroke: VIBRA.greenDark,
												strokeWidth: 2.5,
												dot: { r: 3 }
											})
										]
									})
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[9.5px] text-center text-muted-foreground font-medium",
								children: "Frentes com alta automação geram maiores reduções de dias úteis."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border bg-card p-4 shadow-vibra-sm flex flex-col justify-between",
						id: "chart_ganho_financeiro_5_anos",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "text-[13px] font-bold text-slate-900",
								children: "Ganho Financeiro Projetado"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] text-muted-foreground",
								children: "Retorno acumulado em 5 anos"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-[180px] w-full my-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
									width: "100%",
									height: "100%",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
										data: projectMetrics.accumulativeSavings,
										margin: { left: -10 },
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
												strokeDasharray: "3 3",
												stroke: "#f1f1f1"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
												dataKey: "year",
												tick: { fontSize: 9.5 }
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, { tick: { fontSize: 9.5 } }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { formatter: (v) => `R$ ${v.toLocaleString("pt-BR")}` }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
												dataKey: "Ganho Acumulado",
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
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[10px] bg-slate-50 p-2 rounded text-slate-700 font-semibold text-center text-emerald-800",
								children: "Retorno do investimento garantido com payback acelerado."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border bg-card p-4 shadow-vibra-sm flex flex-col justify-between",
						id: "chart_dimensionamento_iniciativas",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "text-[13px] font-bold text-slate-900",
								children: "FTEs Liberados por Iniciativa"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] text-muted-foreground",
								children: "Dimensionamento de Equipe: Atual (FTE) vs Liberado"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-[180px] w-full my-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
									width: "100%",
									height: "100%",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
										data: hcFteByInitiative,
										margin: { left: -25 },
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
												strokeDasharray: "3 3",
												stroke: "#f1f1f1"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
												dataKey: "name",
												tick: { fontSize: 8.5 }
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, { tick: { fontSize: 8.5 } }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, { wrapperStyle: { fontSize: 9 } }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
												dataKey: "HC Atual (FTE)",
												fill: VIBRA.blueLight,
												radius: [
													4,
													4,
													0,
													0
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
												dataKey: "FTE Liberado",
												fill: VIBRA.blue,
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
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[9.5px] text-center text-muted-foreground font-medium",
								children: "Proporção de equipe atual versus capacidade readequável de esforço."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border bg-card p-4 shadow-vibra-sm flex flex-col justify-between",
						id: "chart_ranking_desperdicios_eliminados",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "text-[13px] font-bold text-slate-900",
								children: "Desperdícios Eliminados (Ranking Lean)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] text-muted-foreground",
								children: "Principais gargalos mitigados pelas iniciativas"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-[180px] w-full my-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
									width: "100%",
									height: "100%",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
										data: wasteRanking,
										layout: "vertical",
										margin: { left: -15 },
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
												strokeDasharray: "3 3",
												stroke: "#f1f1f1"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
												type: "number",
												tick: { fontSize: 9 }
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
												dataKey: "name",
												type: "category",
												width: 100,
												tick: { fontSize: 8 }
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
												dataKey: "value",
												fill: VIBRA.orange,
												radius: [
													0,
													4,
													4,
													0
												],
												name: "Ocorrências"
											})
										]
									})
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[9.5px] text-center text-muted-foreground",
								children: "Impacto direto no encerramento de perdas operacionais Lean."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border bg-card p-4 shadow-vibra-sm flex flex-col justify-between",
						id: "chart_custo_operacional_mensal",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded bg-emerald-50 border border-emerald-100 px-1.5 py-0.5 text-[8.5px] font-bold text-emerald-700 uppercase tracking-wider",
									children: "Recomendação Executiva"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
									className: "text-[13px] font-bold text-slate-900 mt-1",
									children: "Custo Operacional do Esforço"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[10px] text-muted-foreground",
									children: "AS IS vs TO BE (Custo estimado em mão de obra/Mês)"
								})
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-[180px] w-full my-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
									width: "100%",
									height: "100%",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
										data: [{
											name: "Custo AS IS",
											Custo: projectMetrics.costAsIs
										}, {
											name: "Custo TO BE",
											Custo: projectMetrics.costToBe
										}],
										margin: { left: -10 },
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
												strokeDasharray: "3 3",
												stroke: "#f1f1f1"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
												dataKey: "name",
												tick: { fontSize: 10 }
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, { tick: { fontSize: 9.5 } }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { formatter: (v) => `R$ ${v.toLocaleString("pt-BR")}` }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Bar, {
												dataKey: "Custo",
												radius: [
													4,
													4,
													0,
													0
												],
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: "#0B2545" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: "#0000FF" })]
											})
										]
									})
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-[10.5px] bg-emerald-50 text-emerald-800 p-2 rounded font-bold text-center",
								children: [
									"Economia operacional de",
									" ",
									Math.max(0, projectMetrics.costAsIs - projectMetrics.costToBe).toLocaleString("pt-BR", {
										style: "currency",
										currency: "BRL",
										minimumFractionDigits: 2,
										maximumFractionDigits: 2
									}),
									"/mês!"
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border bg-card p-4 shadow-vibra-sm flex flex-col justify-between",
						id: "chart_processo_horas_mes",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "text-[13px] font-bold text-slate-900",
								children: "Processo vs Iniciativas (Horas/Mês)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] text-muted-foreground",
								children: "Horas Gastas vs Horas Economizadas por Processo"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-[180px] w-full my-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
									width: "100%",
									height: "100%",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
										data: processHoursByInitiative,
										margin: { left: -25 },
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
												strokeDasharray: "3 3",
												stroke: "#f1f1f1"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
												dataKey: "name",
												tick: { fontSize: 8.5 }
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, { tick: { fontSize: 8.5 } }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, { wrapperStyle: { fontSize: 9 } }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
												dataKey: "Horas Gastas/Mês",
												fill: VIBRA.orange,
												radius: [
													4,
													4,
													0,
													0
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
												dataKey: "Horas Economizadas/Mês",
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
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[9.5px] text-center text-muted-foreground font-medium",
								children: "Relação direta de tempo de esforço operacional liberado."
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-border bg-card p-4 shadow-vibra-sm space-y-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border-b border-slate-100 pb-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
						className: "text-[14px] font-extrabold text-slate-900 uppercase tracking-tight flex items-center gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "h-5 w-5 text-vibra-700" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Gráficos de Controle de Processos (AS IS × TO BE)" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] text-muted-foreground mt-0.5",
						children: "Monitoramento analítico comparativo dos fluxos mapeados de processo por executor e iniciativa."
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-6 md:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-lg bg-slate-50 p-3 flex flex-col justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
							className: "text-[12px] font-extrabold text-slate-800 tracking-tight uppercase mb-1",
							children: "Distribuição de Carga Horária por Executor"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[10px] text-muted-foreground",
							children: "Tempo total operacional alocado (em horas) em cada papel/sistema."
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-[210px] w-full mt-3",
							children: executorTimeData.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
								width: "100%",
								height: "100%",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
									data: executorTimeData,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
											strokeDasharray: "3 3",
											stroke: "#f1f5f9"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
											dataKey: "name",
											tick: {
												fontSize: 9,
												fill: "#64748b"
											}
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, { tick: {
											fontSize: 9,
											fill: "#64748b"
										} }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, { wrapperStyle: { fontSize: 9.5 } }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
											dataKey: "AS IS (Horas)",
											fill: "#EF4444",
											radius: [
												3,
												3,
												0,
												0
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
											dataKey: "TO BE (Horas)",
											fill: "#007BFF",
											radius: [
												3,
												3,
												0,
												0
											]
										})
									]
								})
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex h-[200px] items-center justify-center text-xs text-muted-foreground italic",
								children: "Nenhum passo cadastrado nos fluxos."
							})
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-lg bg-slate-50 p-3 flex flex-col justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
							className: "text-[12px] font-extrabold text-slate-800 tracking-tight uppercase mb-1",
							children: "Redução de Complexidade (Quantidade de Passos)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[10px] text-muted-foreground",
							children: "Comparação do número de etapas para conclusão da iniciativa."
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-[210px] w-full mt-3",
							children: stepsPerInitiativeData.some((d) => d["Passos AS IS"] > 0 || d["Passos TO BE"] > 0) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
								width: "100%",
								height: "100%",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
									data: stepsPerInitiativeData,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
											strokeDasharray: "3 3",
											stroke: "#f1f5f9"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
											dataKey: "name",
											tick: {
												fontSize: 9,
												fill: "#64748b"
											}
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, { tick: {
											fontSize: 9,
											fill: "#64748b"
										} }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, { wrapperStyle: { fontSize: 9.5 } }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
											dataKey: "Passos AS IS",
											fill: "#64748b",
											radius: [
												3,
												3,
												0,
												0
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
											dataKey: "Passos TO BE",
											fill: "#10B981",
											radius: [
												3,
												3,
												0,
												0
											]
										})
									]
								})
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex h-[200px] items-center justify-center text-xs text-muted-foreground italic",
								children: "Crie etapas AS IS / TO BE na aba Mapeamento para visualizar."
							})
						})]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-border bg-card p-4 shadow-vibra-sm",
				id: "mural_evidencias_dashboard_sec",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
					className: "text-[14px] font-bold text-slate-900 mb-2 border-b border-slate-100 pb-2 flex items-center gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, { className: "h-5 w-5 text-blue-600" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Mural de Evidências & Fluxos Estratégicos" })]
				}), projectImages.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-8 text-center bg-slate-50 rounded-lg border border-dashed border-slate-200 text-muted-foreground text-xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, { className: "h-8 w-8 text-slate-300 mx-auto mb-1" }), "Nenhuma imagem ou fluxo estratégico cadastrado ainda. Adicione-as na aba \"Mural de Imagens\" do Mapeamento."]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-2 md:grid-cols-4 gap-4 mt-3",
					children: projectImages.slice(0, 8).map((img) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						onClick: () => setViewerImage(img),
						className: "relative cursor-pointer group overflow-hidden rounded-lg border border-border bg-slate-50 hover:border-blue-500 hover:shadow transition-all",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: `w-full ${img.aspect_ratio === "16:9" ? "aspect-video" : "aspect-[9/16] h-[160px] flex items-center justify-center bg-slate-900"}`,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: img.url,
									alt: img.legenda,
									className: "w-full h-full object-cover group-hover:scale-105 transition-transform"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "p-1.5 bg-white text-[10px] font-bold text-slate-800 truncate border-t border-slate-100",
								children: img.legenda
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Maximize2, { className: "h-4 w-4 text-white" })
							})
						]
					}, img.id))
				})]
			}),
			viewerImage && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 backdrop-blur-md animate-fade-in",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setViewerImage(null),
					className: "absolute top-4 right-4 rounded-full bg-white/10 p-2.5 text-white hover:bg-white/20 transition",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-5xl w-full flex flex-col items-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: `relative ${viewerImage.aspect_ratio === "16:9" ? "w-full aspect-video" : "h-[85vh] aspect-[9/16]"} bg-slate-950 rounded-lg overflow-hidden flex items-center justify-center border border-white/10`,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: viewerImage.url,
							alt: viewerImage.legenda,
							className: "max-h-full max-w-full object-contain",
							referrerPolicy: "no-referrer"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 text-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "rounded bg-blue-500/20 border border-blue-500/30 px-2 py-0.5 text-[10px] font-bold text-blue-300 uppercase tracking-widest",
							children: ["Formato ", viewerImage.aspect_ratio]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
							className: "text-[15px] font-black text-white mt-1.5",
							children: viewerImage.legenda
						})]
					})]
				})]
			})
		]
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
var DEFAULT_MICROS = {
	"m-1": [{
		nome: "Qualificação de Área e Tráfego",
		tempo_asis_default: 10,
		tempo_tobe_default: 4,
		hc_default: 2,
		matchKeywords: ["trafego", "qualificacao"]
	}, {
		nome: "Mapeamento de Potencial de Galonagem",
		tempo_asis_default: 5,
		tempo_tobe_default: 2,
		hc_default: 1,
		matchKeywords: ["galonagem", "potencial"]
	}],
	"m-2": [{
		nome: "Auditoria de Documentação Cadastral",
		tempo_asis_default: 8,
		tempo_tobe_default: 3,
		hc_default: 2,
		matchKeywords: [
			"auditoria",
			"cadastro",
			"parceiro"
		]
	}],
	"m-3": [{
		nome: "Avaliação de Risco e Crédito",
		tempo_asis_default: 12,
		tempo_tobe_default: 4,
		hc_default: 2,
		matchKeywords: [
			"credito",
			"limite",
			"risco"
		]
	}],
	"m-4": [{
		nome: "Due Diligence de Idoneidade",
		tempo_asis_default: 15,
		tempo_tobe_default: 5,
		hc_default: 2,
		matchKeywords: [
			"diligence",
			"compliance",
			"idoneidade"
		]
	}],
	"m-5": [{
		nome: "Modelagem de Margem e Viabilidade",
		tempo_asis_default: 10,
		tempo_tobe_default: 3,
		hc_default: 2,
		matchKeywords: [
			"modelagem",
			"margem",
			"viabilidade"
		]
	}],
	"m-6": [{
		nome: "Elaboração de Proposta Comercial",
		tempo_asis_default: 20,
		tempo_tobe_default: 8,
		hc_default: 1,
		matchKeywords: [
			"negociacao",
			"proposta",
			"comercial"
		]
	}],
	"m-7": [{
		nome: "Aprovação em Comitê Executivo",
		tempo_asis_default: 7,
		tempo_tobe_default: 2,
		hc_default: 3,
		matchKeywords: [
			"comite",
			"alcada",
			"aprovacao"
		]
	}],
	"m-8": [{
		nome: "Minuta de Contrato e Assinatura",
		tempo_asis_default: 14,
		tempo_tobe_default: 6,
		hc_default: 2,
		matchKeywords: [
			"contrato",
			"decon",
			"assinatura"
		]
	}],
	"m-9": [{
		nome: "Elaboração de Projetos de Imagem",
		tempo_asis_default: 18,
		tempo_tobe_default: 8,
		hc_default: 3,
		matchKeywords: [
			"projetos",
			"executivos",
			"imagem"
		]
	}],
	"m-10": [{
		nome: "Estudo de Impacto e Licenciamento",
		tempo_asis_default: 45,
		tempo_tobe_default: 20,
		hc_default: 2,
		matchKeywords: [
			"licenca",
			"ambiental",
			"impacto"
		]
	}],
	"m-11": [{
		nome: "Emissão de Alvará de Construção",
		tempo_asis_default: 30,
		tempo_tobe_default: 12,
		hc_default: 2,
		matchKeywords: [
			"alvara",
			"autorizacoes",
			"construcao"
		]
	}],
	"m-12": [{
		nome: "Liberação de Concessão de Incentivos",
		tempo_asis_default: 15,
		tempo_tobe_default: 5,
		hc_default: 2,
		matchKeywords: [
			"concessao",
			"financeira",
			"incentivo"
		]
	}],
	"m-13": [{
		nome: "Obras de Adequação de Pista",
		tempo_asis_default: 60,
		tempo_tobe_default: 35,
		hc_default: 5,
		matchKeywords: [
			"obras",
			"adequacao",
			"reforma"
		]
	}],
	"m-14": [{
		nome: "Instalação da Nova Imagem (Branding)",
		tempo_asis_default: 25,
		tempo_tobe_default: 10,
		hc_default: 4,
		matchKeywords: [
			"canopia",
			"totens",
			"branding"
		]
	}],
	"m-15": [{
		nome: "Teste de Estanqueidade de Tanques",
		tempo_asis_default: 30,
		tempo_tobe_default: 15,
		hc_default: 3,
		matchKeywords: [
			"tanque",
			"estanqueidade",
			"ambiental"
		]
	}],
	"m-16": [{
		nome: "Implantação de Sistemas de Vendas",
		tempo_asis_default: 10,
		tempo_tobe_default: 3,
		hc_default: 2,
		matchKeywords: [
			"sistema",
			"telemetria",
			"vendas"
		]
	}],
	"m-17": [{
		nome: "Inauguração e Startup do Posto",
		tempo_asis_default: 7,
		tempo_tobe_default: 2,
		hc_default: 2,
		matchKeywords: [
			"inauguracao",
			"startup",
			"treinamento"
		]
	}]
};
var DEFAULT_POSTO_IMAGEM = "https://images.unsplash.com/photo-1527018601619-a508a2be00cd?q=80&w=600&auto=format&fit=crop";
function JornadaEmbandeiramento({ selectedProjetoIds }) {
	const qc = useQueryClient();
	const { data: myRole = "visualizador" } = useQuery({
		queryKey: ["my-role-jornada"],
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
	const [selectedMacroId, setSelectedMacroId] = (0, import_react.useState)("m-1");
	const { data: allInitiatives = [] } = useQuery({
		queryKey: ["jornada-initiatives", selectedProjetoIds?.join(",") ?? "_all"],
		queryFn: async () => {
			let q = supabase.from("iniciativas").select("id, titulo, projeto_id").is("deleted_at", null);
			if (selectedProjetoIds && selectedProjetoIds.length > 0) q = q.in("projeto_id", selectedProjetoIds);
			const { data } = await q;
			return data ?? [];
		}
	});
	const { data: macroprocessos = DEFAULT_MACROS, isLoading: isLoadingMacros } = useQuery({
		queryKey: ["jornada-macroprocessos"],
		queryFn: async () => {
			const { data } = await supabase.from("app_configuracoes").select("valor").eq("chave", "jornada_macroprocessos").maybeSingle();
			if (!data?.valor) return DEFAULT_MACROS;
			return data.valor.sort((a, b) => a.ordem - b.ordem);
		}
	});
	const { data: postoImagem = DEFAULT_POSTO_IMAGEM } = useQuery({
		queryKey: ["jornada-posto-imagem"],
		queryFn: async () => {
			const { data } = await supabase.from("app_configuracoes").select("valor").eq("chave", "jornada_posto_imagem").maybeSingle();
			return data?.valor || DEFAULT_POSTO_IMAGEM;
		}
	});
	const { data: dbMicroprocessos = [], isLoading: isLoadingMicros } = useQuery({
		queryKey: ["jornada-db-microprocessos"],
		queryFn: async () => {
			const { data } = await supabase.from("microprocessos").select("*").is("deleted_at", null);
			return data ?? [];
		}
	});
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
			toast.success("Macroprocessos salvos com sucesso!");
		},
		onError: (err) => {
			toast.error(`Erro ao salvar: ${err.message}`);
		}
	});
	const savePostoImagemMutation = useMutation({
		mutationFn: async (url) => {
			const { error } = await supabase.from("app_configuracoes").upsert({
				chave: "jornada_posto_imagem",
				valor: url
			});
			if (error) throw error;
		},
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["jornada-posto-imagem"] });
			toast.success("Imagem do posto atualizada!");
		}
	});
	const [editingMacro, setEditingMacro] = (0, import_react.useState)(null);
	const [editingMicro, setEditingMicro] = (0, import_react.useState)(null);
	const [newImageInput, setNewImageInput] = (0, import_react.useState)("");
	const [showImageConfig, setShowImageConfig] = (0, import_react.useState)(false);
	const mappedMicroprocessos = (0, import_react.useMemo)(() => {
		const macro = macroprocessos.find((m) => m.id === selectedMacroId);
		if (!macro) return [];
		if (macro.microprocessos && macro.microprocessos.length > 0) return macro.microprocessos.map((customMicro) => {
			const dbMatch = dbMicroprocessos.find((dbM) => dbM.id === customMicro.id || dbM.titulo.toLowerCase() === customMicro.nome.toLowerCase());
			if (dbMatch) return {
				id: dbMatch.id,
				nome: dbMatch.titulo,
				tempo_asis: dbMatch.lead_time_atual ?? customMicro.tempo_asis,
				tempo_tobe: dbMatch.lead_time_futuro ?? customMicro.tempo_tobe,
				hc: dbMatch.hc_atual ?? customMicro.hc,
				progress: dbMatch.percentual_avanco ?? customMicro.progress,
				automation: dbMatch.percentual_evolucao ?? customMicro.automation,
				status: dbMatch.status || customMicro.status || "Mapeada",
				isMapped: true,
				realRecord: dbMatch
			};
			return {
				id: customMicro.id,
				nome: customMicro.nome,
				tempo_asis: customMicro.tempo_asis,
				tempo_tobe: customMicro.tempo_tobe,
				hc: customMicro.hc,
				progress: customMicro.progress ?? 0,
				automation: customMicro.automation ?? 0,
				status: customMicro.status || "Mapeada",
				isMapped: customMicro.isMapped ?? false,
				realRecord: null
			};
		});
		return (DEFAULT_MICROS[selectedMacroId] || []).map((def, index) => {
			const match = dbMicroprocessos.find((dbM) => {
				const titleLower = dbM.titulo.toLowerCase();
				return def.matchKeywords.some((key) => titleLower.includes(key));
			});
			if (match) return {
				id: match.id,
				nome: match.titulo,
				tempo_asis: match.lead_time_atual ?? def.tempo_asis_default,
				tempo_tobe: match.lead_time_futuro ?? def.tempo_tobe_default,
				hc: match.hc_atual ?? def.hc_default,
				progress: match.percentual_avanco ?? 0,
				automation: match.percentual_evolucao ?? 0,
				status: match.status || "Mapeada",
				isMapped: true,
				realRecord: match
			};
			return {
				id: `def-${selectedMacroId}-${index}`,
				nome: def.nome,
				tempo_asis: def.tempo_asis_default,
				tempo_tobe: def.tempo_tobe_default,
				hc: def.hc_default,
				progress: 0,
				automation: 0,
				status: "Mapeada",
				isMapped: false,
				realRecord: null
			};
		});
	}, [
		selectedMacroId,
		macroprocessos,
		dbMicroprocessos
	]);
	const totalAsIsDays = (0, import_react.useMemo)(() => {
		let sum = 0;
		macroprocessos.forEach((macro) => {
			const micros = macro.microprocessos && macro.microprocessos.length > 0 ? macro.microprocessos : DEFAULT_MICROS[macro.id] || [];
			if (micros.length > 0) {
				let macroSum = 0;
				micros.forEach((micro) => {
					const dbM = dbMicroprocessos.find((m) => m.id === micro.id || m.titulo.toLowerCase() === micro.nome?.toLowerCase());
					if (dbM) macroSum += dbM.lead_time_atual ?? micro.tempo_asis ?? micro.tempo_asis_default ?? 0;
					else macroSum += micro.tempo_asis ?? micro.tempo_asis_default ?? 0;
				});
				sum += macroSum;
			} else sum += macro.tempo_total || 0;
		});
		return sum;
	}, [macroprocessos, dbMicroprocessos]);
	const totalToBeDays = (0, import_react.useMemo)(() => {
		let sum = 0;
		macroprocessos.forEach((macro) => {
			const micros = macro.microprocessos && macro.microprocessos.length > 0 ? macro.microprocessos : DEFAULT_MICROS[macro.id] || [];
			if (micros.length > 0) {
				let macroSum = 0;
				micros.forEach((micro) => {
					const dbM = dbMicroprocessos.find((m) => m.id === micro.id || m.titulo.toLowerCase() === micro.nome?.toLowerCase());
					if (dbM) macroSum += dbM.lead_time_futuro ?? micro.tempo_tobe ?? micro.tempo_tobe_default ?? 0;
					else macroSum += micro.tempo_tobe ?? micro.tempo_tobe_default ?? 0;
				});
				sum += macroSum;
			} else sum += Math.round((macro.tempo_total || 0) * .5);
		});
		return sum;
	}, [macroprocessos, dbMicroprocessos]);
	const handleMove = (direction, index) => {
		if (!isAdmin) return;
		const newList = [...macroprocessos];
		const targetIdx = direction === "up" ? index - 1 : index + 1;
		if (targetIdx < 0 || targetIdx >= newList.length) return;
		const temp = newList[index];
		newList[index] = newList[targetIdx];
		newList[targetIdx] = temp;
		newList.forEach((m, idx) => {
			m.ordem = idx + 1;
		});
		saveMacrosMutation.mutate(newList);
	};
	const handleCreateMacro = () => {
		if (!isAdmin) return;
		const newMacro = {
			id: "macro-" + Math.random().toString(36).substring(2, 9),
			nome: "Novo Macroprocesso",
			area_responsavel: "Nova Área",
			tempo_total: 10,
			ordem: macroprocessos.length + 1,
			microprocessos: []
		};
		const newList = [...macroprocessos, newMacro];
		saveMacrosMutation.mutate(newList);
		setSelectedMacroId(newMacro.id);
		setEditingMacro(newMacro);
		toast.success("Macroprocesso adicionado! Configure-o abaixo.");
	};
	const handleDeleteMacro = (id) => {
		if (!isAdmin) return;
		if (macroprocessos.length <= 1) {
			toast.error("O sistema precisa de pelo menos 1 macroprocesso.");
			return;
		}
		if (!window.confirm("Tem certeza que deseja excluir este macroprocesso?")) return;
		const newList = macroprocessos.filter((m) => m.id !== id).map((m, idx) => ({
			...m,
			ordem: idx + 1
		}));
		saveMacrosMutation.mutate(newList);
		if (selectedMacroId === id) setSelectedMacroId(newList[0]?.id || "");
		toast.success("Macroprocesso removido com sucesso!");
	};
	const handleSaveMacroEdit = (e) => {
		e.preventDefault();
		if (!editingMacro) return;
		const newList = macroprocessos.map((m) => m.id === editingMacro.id ? editingMacro : m);
		saveMacrosMutation.mutate(newList);
		setEditingMacro(null);
	};
	const handleDeleteMicro = (microId) => {
		if (!isAdmin) return;
		if (!window.confirm("Deseja realmente remover este microprocesso do macroprocesso?")) return;
		const macro = macroprocessos.find((m) => m.id === selectedMacroId);
		if (macro) {
			const updatedList = (macro.microprocessos || DEFAULT_MICROS[selectedMacroId]?.map((def, idx) => ({
				id: `def-${selectedMacroId}-${idx}`,
				nome: def.nome,
				status: "Mapeada",
				progress: 0,
				tempo_asis: def.tempo_asis_default,
				tempo_tobe: def.tempo_tobe_default,
				hc: def.hc_default,
				automation: 0,
				isMapped: false
			})) || []).filter((item) => item.id !== microId);
			const newMacrosConfig = macroprocessos.map((m) => {
				if (m.id === selectedMacroId) return {
					...m,
					microprocessos: updatedList
				};
				return m;
			});
			saveMacrosMutation.mutate(newMacrosConfig);
			toast.success("Microprocesso removido!");
		}
	};
	const handleSaveMicroEdit = async (e) => {
		e.preventDefault();
		if (!editingMicro) return;
		try {
			let finalId = editingMicro.id;
			let iniId = editingMicro.iniciativa_id;
			if (!iniId) {
				const { data: inis } = await supabase.from("iniciativas").select("id").limit(1);
				iniId = inis?.[0]?.id;
			}
			if (!iniId) {
				toast.error("Nenhuma iniciativa encontrada para associar.");
				return;
			}
			if (editingMicro.isNewDatabaseRecord) {
				const newRecord = {
					titulo: editingMicro.nome,
					lead_time_atual: editingMicro.tempo_asis,
					lead_time_futuro: editingMicro.tempo_tobe,
					hc_atual: editingMicro.hc,
					status: editingMicro.status,
					percentual_evolucao: editingMicro.automation,
					percentual_avanco: editingMicro.progress,
					iniciativa_id: iniId,
					created_by: "Administrador"
				};
				const { data, error } = await supabase.from("microprocessos").insert(newRecord).select("id").single();
				if (error) throw error;
				finalId = data.id;
				toast.success("Novo microprocesso registrado no banco!");
			} else if (editingMicro.id && editingMicro.isMapped) {
				const { error } = await supabase.from("microprocessos").update({
					lead_time_atual: editingMicro.tempo_asis,
					lead_time_futuro: editingMicro.tempo_tobe,
					hc_atual: editingMicro.hc,
					status: editingMicro.status,
					percentual_evolucao: editingMicro.automation,
					percentual_avanco: editingMicro.progress,
					updated_at: (/* @__PURE__ */ new Date()).toISOString()
				}).eq("id", editingMicro.id);
				if (error) throw error;
				toast.success("Dados do microprocesso sincronizados com o banco!");
			}
			const macro = macroprocessos.find((m) => m.id === selectedMacroId);
			if (macro) {
				const currentCustomList = macro.microprocessos || DEFAULT_MICROS[selectedMacroId]?.map((def, idx) => ({
					id: `def-${selectedMacroId}-${idx}`,
					nome: def.nome,
					status: "Mapeada",
					progress: 0,
					tempo_asis: def.tempo_asis_default,
					tempo_tobe: def.tempo_tobe_default,
					hc: def.hc_default,
					automation: 0,
					isMapped: false
				})) || [];
				let updatedList;
				if (editingMicro.isNew) updatedList = [...currentCustomList, {
					id: finalId || "micro-" + Math.random().toString(36).substring(2, 9),
					nome: editingMicro.nome,
					status: editingMicro.status,
					progress: editingMicro.progress,
					tempo_asis: editingMicro.tempo_asis,
					tempo_tobe: editingMicro.tempo_tobe,
					hc: editingMicro.hc,
					automation: editingMicro.automation,
					isMapped: true
				}];
				else updatedList = currentCustomList.map((item) => {
					if (item.id === editingMicro.id) return {
						...item,
						nome: editingMicro.nome,
						status: editingMicro.status,
						progress: editingMicro.progress,
						tempo_asis: editingMicro.tempo_asis,
						tempo_tobe: editingMicro.tempo_tobe,
						hc: editingMicro.hc,
						automation: editingMicro.automation,
						isMapped: true
					};
					return item;
				});
				const newMacrosConfig = macroprocessos.map((m) => {
					if (m.id === selectedMacroId) return {
						...m,
						microprocessos: updatedList
					};
					return m;
				});
				saveMacrosMutation.mutate(newMacrosConfig);
			}
			qc.invalidateQueries({ queryKey: ["jornada-db-microprocessos"] });
			setEditingMicro(null);
		} catch (err) {
			toast.error(`Erro ao salvar: ${err.message}`);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6 bg-white text-slate-800 rounded-2xl p-6 border border-slate-200 shadow-md relative overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0 right-0 w-80 h-80 bg-vibra-500/5 rounded-full blur-[100px] pointer-events-none" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col md:flex-row md:items-center md:justify-between border-b border-slate-100 pb-5 gap-4 shrink-0 relative z-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "rounded-full bg-vibra-50 border border-vibra-100 px-3 py-0.5 text-[9.5px] font-extrabold uppercase tracking-wider text-vibra-800",
							children: "Mapeamento de Processo"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-[18px] font-black tracking-tight text-slate-900 mt-1.5 flex items-center gap-2",
						children: "Jornada de Embandeiramento e Implantação"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[12px] text-slate-500 mt-1",
						children: "Mapeamento das frentes e iniciativas estratégicas simulando o fluxo operacional ponta a ponta."
					})
				] }), isAdmin && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => {
						setNewImageInput(postoImagem);
						setShowImageConfig(true);
					},
					className: "inline-flex h-8 items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 px-3 text-xs font-semibold text-slate-700 transition shrink-0 shadow-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { className: "h-3.5 w-3.5 text-vibra-600" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Configurar Imagem" })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-red-50/50 border border-red-100 rounded-xl p-4 flex items-center justify-between shadow-sm relative overflow-hidden group hover:border-red-200 transition",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0 right-0 w-24 h-24 bg-red-500/5 rounded-full blur-2xl pointer-events-none" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-[9.5px] font-extrabold text-red-600 uppercase tracking-widest flex items-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-3.5 w-3.5 text-red-500" }), "Tempo Total AS IS (Atual)"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-baseline gap-1 mt-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[32px] font-black tracking-tighter text-red-600 font-mono",
										children: totalAsIsDays
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs font-bold text-slate-400",
										children: "DIAS"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[10px] text-slate-500 leading-relaxed mt-0.5",
									children: "Soma total planejada dos prazos e gargalos atuais identificados nos Macroprocessos."
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-12 w-12 bg-red-100/50 border border-red-200/60 rounded-lg flex items-center justify-center text-red-700 text-lg font-mono font-black shrink-0 shadow-sm",
							children: "AS IS"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-emerald-50/50 border border-emerald-100 rounded-xl p-4 flex items-center justify-between shadow-sm relative overflow-hidden group hover:border-emerald-200 transition",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-[9.5px] font-extrabold text-emerald-600 uppercase tracking-widest flex items-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, { className: "h-3.5 w-3.5 text-emerald-500" }), "Tempo Total TO BE (Alvo)"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-baseline gap-1 mt-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[32px] font-black tracking-tighter text-emerald-600 font-mono",
										children: totalToBeDays
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs font-bold text-slate-400",
										children: "DIAS"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[10px] text-slate-500 leading-relaxed mt-0.5",
									children: "Tempo alvo projetado com base nas automações, otimizações e sinergias de frentes."
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-12 w-12 bg-emerald-100/50 border border-emerald-200/60 rounded-lg flex items-center justify-center text-emerald-700 text-lg font-mono font-black shrink-0 shadow-sm",
							children: "TO BE"
						})
					]
				})]
			}),
			isAdmin && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex items-center justify-end gap-2 relative z-10 px-2 mt-2 w-full max-w-5xl self-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: handleCreateMacro,
					className: "inline-flex h-8 items-center justify-center gap-1.5 rounded-lg bg-orange-600 hover:bg-orange-700 px-3 text-[11px] font-bold text-white transition shadow-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Adicionar Novo Macroprocesso" })]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative py-12 px-2 bg-slate-50/60 rounded-2xl border border-slate-200/60 overflow-hidden shrink-0 z-10 flex flex-col items-center w-full",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "absolute top-1/2 left-0 right-0 h-16 bg-slate-200 -translate-y-1/2 pointer-events-none rounded-sm border-y border-slate-300 flex items-center justify-around overflow-hidden",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-10 h-1 bg-orange-400 opacity-60 animate-pulse shrink-0" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-10 h-1 bg-orange-400 opacity-60 animate-pulse shrink-0" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-10 h-1 bg-orange-400 opacity-60 animate-pulse shrink-0" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-10 h-1 bg-orange-400 opacity-60 animate-pulse shrink-0" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-10 h-1 bg-orange-400 opacity-60 animate-pulse shrink-0" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-10 h-1 bg-orange-400 opacity-60 animate-pulse shrink-0" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-10 h-1 bg-orange-400 opacity-60 animate-pulse shrink-0" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-10 h-1 bg-orange-400 opacity-60 shrink-0" })
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 relative z-10 items-stretch",
					children: [macroprocessos.map((macro, index) => {
						const isSelected = selectedMacroId === macro.id;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							onClick: () => setSelectedMacroId(macro.id),
							className: `relative cursor-pointer rounded-xl border p-4 transition-all duration-300 transform flex flex-col justify-between ${isSelected ? "bg-white border-2 border-orange-500 shadow-lg -translate-y-2 ring-1 ring-orange-500/30" : "bg-white border-slate-200 hover:border-slate-300 hover:-translate-y-1 hover:shadow-sm"}`,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between shrink-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex h-5 w-5 items-center justify-center rounded-full bg-slate-100 text-[10px] font-black font-mono text-slate-500",
										children: ["0", macro.ordem]
									}), isAdmin && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-0.5",
										onClick: (e) => e.stopPropagation(),
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												onClick: () => handleMove("up", index),
												disabled: index === 0,
												className: "p-1 text-slate-400 hover:text-slate-800 disabled:opacity-30 transition",
												title: "Mover para cima",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUp, { className: "h-3 w-3" })
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												onClick: () => handleMove("down", index),
												disabled: index === macroprocessos.length - 1,
												className: "p-1 text-slate-400 hover:text-slate-800 disabled:opacity-30 transition",
												title: "Mover para baixo",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowDown, { className: "h-3 w-3" })
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												onClick: () => setEditingMacro(macro),
												className: "p-1 text-slate-400 hover:text-slate-800 transition",
												title: "Editar",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pen, { className: "h-3 w-3" })
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												onClick: () => handleDeleteMacro(macro.id),
												className: "p-1 text-slate-400 hover:text-red-600 transition",
												title: "Excluir",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3 w-3" })
											})
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-3 min-h-[38px]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
										className: `text-[11.5px] font-black leading-tight ${isSelected ? "text-slate-900" : "text-slate-700"}`,
										children: macro.nome
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[9.5px] text-slate-400 truncate mt-1",
									title: macro.area_responsavel,
									children: macro.area_responsavel
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-4 border-t border-slate-100 pt-2 flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[8.5px] font-bold text-slate-400 uppercase tracking-wider",
										children: "Duração"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-[12px] font-black text-orange-600 font-mono",
										children: [macro.tempo_total, "d"]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "absolute top-1/2 -right-4 -translate-y-1/2 hidden md:block z-20 pointer-events-none opacity-40",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-4 w-4 text-slate-300" })
								})
							]
						}, macro.id);
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative flex flex-col justify-between p-4 rounded-xl border border-emerald-200 bg-white h-full min-h-[150px] group overflow-hidden shadow-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-white/10 group-hover:bg-transparent transition duration-300 pointer-events-none" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "h-20 w-full rounded-lg overflow-hidden relative mb-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: postoImagem,
									alt: "Posto de combustível Petrobras",
									className: "w-full h-full object-cover group-hover:scale-110 transition duration-500",
									referrerPolicy: "no-referrer"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-center relative z-10 mt-auto",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-[10px] font-extrabold text-emerald-700 leading-tight tracking-tight uppercase flex items-center gap-1 justify-center",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-3 w-3 text-emerald-500" }), "Posto Ativo"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[8.5px] font-semibold text-slate-500 block mt-0.5",
									children: "Vila Petrobras (Nova Imagem)"
								})]
							})
						]
					})]
				})]
			}),
			selectedMacroId && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-slate-50/50 rounded-2xl border border-slate-200 p-5 space-y-4 shrink-0 relative z-10 animate-fade-in",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between border-b border-slate-200 pb-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[9px] font-black text-vibra-800 uppercase tracking-wider",
						children: "Detalhamento Operacional"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
						className: "text-sm font-bold text-slate-800 mt-0.5",
						children: [
							"Microprocessos de",
							" ",
							macroprocessos.find((m) => m.id === selectedMacroId)?.nome || "Macroprocesso"
						]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "rounded-full bg-white border border-slate-200 px-3 py-1 text-[10px] font-bold text-slate-500",
						children: [mappedMicroprocessos.length, " microprocessos"]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4 md:grid-cols-2",
					children: [mappedMicroprocessos.map((micro) => {
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: `bg-white border rounded-xl p-4 space-y-3 relative overflow-hidden transition-all duration-300 ${micro.isMapped ? "opacity-100 shadow-sm" : "opacity-60 hover:opacity-85"} ${micro.isMapped ? "border-slate-200" : "border-dashed border-slate-300"}`,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `rounded-full px-2 py-0.5 text-[8.5px] font-black uppercase tracking-wider ${micro.status === "Implantada" ? "bg-emerald-50 text-emerald-700 border border-emerald-100" : micro.status === "Em Desenvolvimento" ? "bg-amber-50 text-amber-700 border border-amber-100" : "bg-slate-50 text-slate-600 border border-slate-200"}`,
										children: micro.status
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-1.5",
										children: [!micro.isMapped && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "rounded bg-slate-100 text-[8px] font-bold text-slate-400 px-1.5 py-0.2",
											children: "Não Mapeado"
										}), isAdmin && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												onClick: () => setEditingMicro(micro),
												className: "p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-800 transition",
												title: "Editar Microprocesso",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pen, { className: "h-3 w-3" })
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												onClick: () => handleDeleteMicro(micro.id),
												className: "p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-red-600 transition",
												title: "Remover Microprocesso",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3 w-3" })
											})]
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
									className: "text-[12.5px] font-bold text-slate-800 line-clamp-2 pr-4 leading-snug",
									children: micro.nome
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-12 gap-3 pt-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "col-span-9 space-y-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between text-[9.5px] font-semibold text-slate-500",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Avanço do Mapeamento" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "font-mono text-slate-700",
												children: [micro.progress, "%"]
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "h-1.5 w-full bg-slate-100 rounded-full overflow-hidden",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "h-full bg-gradient-to-r from-orange-500 to-amber-400 transition-all duration-500",
												style: { width: `${micro.progress}%` }
											})
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "col-span-3 flex flex-col items-center justify-center border-l border-slate-100 pl-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "h-10 w-2.5 bg-slate-100 rounded-full overflow-hidden relative",
												title: `Automação: ${micro.automation}%`,
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "absolute bottom-0 left-0 right-0 bg-emerald-500 transition-all duration-500",
													style: { height: `${micro.automation}%` }
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[8px] font-black text-slate-400 mt-1 uppercase tracking-tight whitespace-nowrap",
												children: "Automação"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-[9px] font-mono font-bold text-emerald-600 mt-0.5",
												children: [micro.automation, "%"]
											})
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "border-t border-slate-100 pt-2 grid grid-cols-3 gap-2 text-center text-[10px] font-semibold text-slate-500",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "border-r border-slate-100 pr-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[8.5px] block text-slate-400 uppercase font-bold",
												children: "AS IS"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "font-mono font-bold text-slate-700",
												children: [micro.tempo_asis, "d"]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "border-r border-slate-100 pr-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[8.5px] block text-slate-400 uppercase font-bold",
												children: "TO BE"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "font-mono font-bold text-emerald-600",
												children: [micro.tempo_tobe, "d"]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[8.5px] block text-slate-400 uppercase font-bold",
											children: "HC"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "font-mono font-bold text-slate-700",
											children: [micro.hc, " HC"]
										})] })
									]
								})
							]
						}, micro.id);
					}), isAdmin && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => {
							setEditingMicro({
								id: "",
								nome: "",
								tempo_asis: 5,
								tempo_tobe: 2,
								hc: 1,
								progress: 0,
								automation: 0,
								status: "Mapeada",
								isNew: true,
								isNewDatabaseRecord: true
							});
						},
						className: "bg-white hover:bg-slate-50 border border-dashed border-slate-300 rounded-xl p-4 flex flex-col items-center justify-center space-y-2 min-h-[150px] transition-all duration-300 group shadow-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "p-3 bg-slate-100 rounded-full group-hover:bg-slate-200 transition",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-5 w-5 text-slate-500" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs font-bold text-slate-600",
							children: "Adicionar Microprocesso"
						})]
					})]
				})]
			}),
			editingMacro && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-slate-900 border border-slate-800 rounded-xl p-5 max-w-md w-full shadow-2xl text-white",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-sm font-black text-white border-b border-slate-800 pb-3",
						children: "Editar Macroprocesso"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleSaveMacroEdit,
						className: "space-y-4 mt-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-[10.5px] font-bold text-slate-400",
									children: "Nome do Macroprocesso"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									required: true,
									value: editingMacro.nome,
									onChange: (e) => setEditingMacro({
										...editingMacro,
										nome: e.target.value
									}),
									className: "h-9 w-full rounded-md border border-slate-700 bg-slate-800 px-3 text-[12px] font-semibold text-white outline-none focus:border-vibra-500"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-[10.5px] font-bold text-slate-400",
									children: "Áreas Responsáveis"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									required: true,
									value: editingMacro.area_responsavel,
									onChange: (e) => setEditingMacro({
										...editingMacro,
										area_responsavel: e.target.value
									}),
									className: "h-9 w-full rounded-md border border-slate-700 bg-slate-800 px-3 text-[12px] font-semibold text-white outline-none focus:border-vibra-500"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-[10.5px] font-bold text-slate-400",
									children: "Tempo Total (Dias)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "number",
									required: true,
									min: "1",
									value: editingMacro.tempo_total,
									onChange: (e) => setEditingMacro({
										...editingMacro,
										tempo_total: Number(e.target.value)
									}),
									className: "h-9 w-full rounded-md border border-slate-700 bg-slate-800 px-3 text-[12px] font-semibold text-white outline-none focus:border-vibra-500"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "pt-3 border-t border-slate-800 flex items-center justify-end gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setEditingMacro(null),
									className: "px-3.5 py-1.5 border border-slate-700 text-xs font-bold text-slate-400 rounded-lg hover:bg-slate-800 transition",
									children: "Cancelar"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "submit",
									className: "px-3.5 py-1.5 bg-vibra-700 text-white text-xs font-bold rounded-lg hover:bg-vibra-800 transition shadow",
									children: "Salvar"
								})]
							})
						]
					})]
				})
			}),
			editingMicro && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-slate-900 border border-slate-800 rounded-xl p-5 max-w-lg w-full shadow-2xl text-white",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
							className: "text-sm font-black text-white border-b border-slate-800 pb-3 flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4 text-vibra-500" }), editingMicro.isNew ? "Criar ou Associar Microprocesso" : "Editar Microprocesso"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[10px] text-slate-400 mt-1",
							children: "Configure os tempos, FTE/Headcount (HC), status e nível de avanço do microprocesso."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: handleSaveMicroEdit,
							className: "space-y-4 mt-4",
							children: [
								editingMicro.isNew && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "text-[10.5px] font-bold text-orange-400",
											children: "Importar de Microprocesso Existente no Banco"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
											onChange: (e) => {
												const val = e.target.value;
												if (val === "new") setEditingMicro({
													id: "",
													nome: "",
													tempo_asis: 5,
													tempo_tobe: 2,
													hc: 1,
													progress: 0,
													automation: 0,
													status: "Mapeada",
													isNew: true,
													isNewDatabaseRecord: true
												});
												else {
													const matched = dbMicroprocessos.find((dbM) => dbM.id === val);
													if (matched) setEditingMicro({
														id: matched.id,
														nome: matched.titulo,
														tempo_asis: matched.lead_time_atual ?? 5,
														tempo_tobe: matched.lead_time_futuro ?? 2,
														hc: matched.hc_atual ?? 1,
														progress: matched.percentual_avanco ?? 0,
														automation: matched.percentual_evolucao ?? 0,
														status: matched.status || "Mapeada",
														iniciativa_id: matched.iniciativa_id,
														isNew: true,
														isNewDatabaseRecord: false,
														isMapped: true
													});
												}
											},
											value: editingMicro.isNewDatabaseRecord ? "new" : editingMicro.id,
											className: "h-9 w-full rounded-md border border-slate-700 bg-slate-800 px-3 text-[12px] font-semibold text-white outline-none focus:border-vibra-500",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "new",
												children: "[ Criar Novo Microprocesso e Registrar no Banco ]"
											}), dbMicroprocessos.map((dbM) => {
												const ini = allInitiatives.find((i) => i.id === dbM.iniciativa_id);
												const badge = !!ini ? "★" : "⚡";
												return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
													value: dbM.id,
													children: [
														badge,
														" ",
														dbM.titulo,
														" (",
														ini?.titulo || "Outra Iniciativa",
														")"
													]
												}, dbM.id);
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[9px] text-slate-400",
											children: "★ Indica microprocessos pertencentes aos projetos selecionados no painel executivo."
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-[10.5px] font-bold text-slate-400",
										children: "Nome do Microprocesso"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										required: true,
										disabled: !editingMicro.isNewDatabaseRecord && !editingMicro.isNew,
										value: editingMicro.nome,
										onChange: (e) => setEditingMicro({
											...editingMicro,
											nome: e.target.value
										}),
										className: "h-9 w-full rounded-md border border-slate-700 bg-slate-800 px-3 text-[12px] font-semibold text-white outline-none focus:border-vibra-500 disabled:opacity-50"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-2 gap-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "text-[10.5px] font-bold text-slate-400",
												children: "Tempo AS IS (Dias)"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "number",
												required: true,
												min: "0",
												value: editingMicro.tempo_asis,
												onChange: (e) => setEditingMicro({
													...editingMicro,
													tempo_asis: Number(e.target.value)
												}),
												className: "h-9 w-full rounded-md border border-slate-700 bg-slate-800 px-3 text-[12px] font-semibold text-white outline-none focus:border-vibra-500"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "text-[10.5px] font-bold text-slate-400",
												children: "Tempo TO BE (Dias)"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "number",
												required: true,
												min: "0",
												value: editingMicro.tempo_tobe,
												onChange: (e) => setEditingMicro({
													...editingMicro,
													tempo_tobe: Number(e.target.value)
												}),
												className: "h-9 w-full rounded-md border border-slate-700 bg-slate-800 px-3 text-[12px] font-semibold text-white outline-none focus:border-vibra-500"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "text-[10.5px] font-bold text-slate-400",
												children: "FTE / Headcount (HC)"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "number",
												required: true,
												min: "0",
												step: "0.1",
												value: editingMicro.hc,
												onChange: (e) => setEditingMicro({
													...editingMicro,
													hc: Number(e.target.value)
												}),
												className: "h-9 w-full rounded-md border border-slate-700 bg-slate-800 px-3 text-[12px] font-semibold text-white outline-none focus:border-vibra-500"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "text-[10.5px] font-bold text-slate-400",
												children: "Status"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
												value: editingMicro.status,
												onChange: (e) => setEditingMicro({
													...editingMicro,
													status: e.target.value
												}),
												className: "h-9 w-full rounded-md border border-slate-700 bg-slate-800 px-3 text-[12px] font-semibold text-white outline-none focus:border-vibra-500",
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
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "text-[10.5px] font-bold text-slate-400",
												children: "Avanço do Mapeamento (%)"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "number",
												required: true,
												min: "0",
												max: "100",
												value: editingMicro.progress,
												onChange: (e) => setEditingMicro({
													...editingMicro,
													progress: Number(e.target.value)
												}),
												className: "h-9 w-full rounded-md border border-slate-700 bg-slate-800 px-3 text-[12px] font-semibold text-white outline-none focus:border-vibra-500"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "text-[10.5px] font-bold text-slate-400",
												children: "Potencial de Automação (%)"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "number",
												required: true,
												min: "0",
												max: "100",
												value: editingMicro.automation,
												onChange: (e) => setEditingMicro({
													...editingMicro,
													automation: Number(e.target.value)
												}),
												className: "h-9 w-full rounded-md border border-slate-700 bg-slate-800 px-3 text-[12px] font-semibold text-white outline-none focus:border-vibra-500"
											})]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "pt-3 border-t border-slate-800 flex items-center justify-end gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setEditingMicro(null),
										className: "px-3.5 py-1.5 border border-slate-700 text-xs font-bold text-slate-400 rounded-lg hover:bg-slate-800 transition",
										children: "Cancelar"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "submit",
										className: "px-3.5 py-1.5 bg-vibra-700 text-white text-xs font-bold rounded-lg hover:bg-vibra-800 transition shadow",
										children: "Sincronizar"
									})]
								})
							]
						})
					]
				})
			}),
			showImageConfig && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-slate-900 border border-slate-800 rounded-xl p-5 max-w-md w-full shadow-2xl text-white",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
						className: "text-sm font-black text-white border-b border-slate-800 pb-3 flex items-center gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, { className: "h-4 w-4 text-vibra-500" }), "Configurar Imagem do Posto"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4 mt-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-[10.5px] font-bold text-slate-400",
									children: "URL da Imagem do Posto"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									required: true,
									placeholder: "Insera a URL pública da imagem...",
									value: newImageInput,
									onChange: (e) => setNewImageInput(e.target.value),
									className: "h-9 w-full rounded-md border border-slate-700 bg-slate-800 px-3 text-[12px] font-semibold text-white outline-none focus:border-vibra-500"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-3 bg-slate-950/60 border border-slate-800 rounded-lg",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[9px] font-extrabold text-slate-500 block uppercase",
									children: "Pré-visualização"
								}), newImageInput ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-28 w-full rounded overflow-hidden mt-1.5 border border-slate-800",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: newImageInput,
										alt: "Preview",
										className: "w-full h-full object-cover",
										referrerPolicy: "no-referrer",
										onError: () => toast.error("Falha ao carregar a imagem informada.")
									})
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] text-slate-500 mt-1",
									children: "Insera uma URL de imagem válida."
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "pt-3 border-t border-slate-800 flex items-center justify-end gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setShowImageConfig(false),
									className: "px-3.5 py-1.5 border border-slate-700 text-xs font-bold text-slate-400 rounded-lg hover:bg-slate-800 transition",
									children: "Cancelar"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => {
										savePostoImagemMutation.mutate(newImageInput);
										setShowImageConfig(false);
									},
									className: "px-3.5 py-1.5 bg-vibra-700 text-white text-xs font-bold rounded-lg hover:bg-vibra-800 transition shadow",
									children: "Salvar"
								})]
							})
						]
					})]
				})
			})
		]
	});
}
var CustomScatterTooltip = ({ active, payload }) => {
	if (active && payload && payload.length) {
		const data = payload[0].payload;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-xl border border-slate-100 bg-white p-3.5 shadow-xl text-[12px] space-y-1.5 min-w-[240px] pointer-events-none",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-extrabold text-slate-900 border-b border-slate-100 pb-1.5 mb-1.5 text-[12.5px] leading-tight",
					children: data.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex justify-between gap-4 text-slate-600",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-medium text-slate-500",
						children: "Esforço:"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-bold text-slate-800",
						children: [data.esforco, " / 10"]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex justify-between gap-4 text-slate-600",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-medium text-slate-500",
						children: "Impacto:"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-bold text-slate-800",
						children: [data.impacto, " / 15"]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex justify-between gap-4 text-slate-600",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-medium text-slate-500",
						children: "Saving:"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-bold text-emerald-600",
						children: data.saving.toLocaleString("pt-BR", {
							style: "currency",
							currency: "BRL",
							minimumFractionDigits: 2,
							maximumFractionDigits: 2
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex justify-between gap-4 text-slate-600",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-medium text-slate-500",
						children: "HC Atual:"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-bold text-slate-800",
						children: data.hcAtual
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex justify-between gap-4 text-slate-600",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-medium text-slate-500",
						children: "FTE Liberado:"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-bold text-blue-600",
						children: [data.fteLiberado.toFixed(2), " FTE"]
					})]
				})
			]
		});
	}
	return null;
};
function ExecutiveVision({ selectedProjetoIds, iniciativas, macros }) {
	const isExpansaoSelected = (0, import_react.useMemo)(() => {
		if (!selectedProjetoIds || selectedProjetoIds.length === 0) return false;
		return selectedProjetoIds.some((id) => {
			const p = macros.find((m) => m.id === id);
			return p && p.nome && p.nome.toLowerCase().includes("expansão de postos");
		});
	}, [selectedProjetoIds, macros]);
	const [subTab, setSubTab] = (0, import_react.useState)("consolidated");
	const [distMode, setDistMode] = (0, import_react.useState)("diretoria");
	const [decisionOption, setDecisionOption] = (0, import_react.useState)("auto");
	const [expandedBlock, setExpandedBlock] = (0, import_react.useState)(0);
	const [customOrder, setCustomOrder] = (0, import_react.useState)(() => {
		try {
			const saved = localStorage.getItem("executive_vision_initiative_order");
			return saved ? JSON.parse(saved) : [];
		} catch (e) {
			return [];
		}
	});
	const [visionMode, setVisionMode] = (0, import_react.useState)("projeto");
	const [selectedIniciativaId, setSelectedIniciativaId] = (0, import_react.useState)("");
	const queryClient = useQueryClient();
	const [localAsIs, setLocalAsIs] = (0, import_react.useState)({});
	const [localToBe, setLocalToBe] = (0, import_react.useState)({});
	const saveAsIs = async (id, value) => {
		const parsed = parseFloat(value.replace(",", "."));
		if (isNaN(parsed) || parsed < 0) {
			toast.error("Por favor, insira um número válido de dias.");
			return;
		}
		const minutes = parsed * 8 * 60;
		const { error } = await supabase.from("iniciativas").update({ tempo_max: minutes }).eq("id", id);
		if (error) {
			toast.error("Erro ao salvar AS IS.");
			console.error(error);
		} else {
			toast.success("Dias AS IS atualizados!");
			queryClient.invalidateQueries({ queryKey: ["dash-iniciativas-cockpit"] });
		}
	};
	const saveToBe = async (id, value) => {
		const parsed = parseFloat(value.replace(",", "."));
		if (isNaN(parsed) || parsed < 0) {
			toast.error("Por favor, insira um número válido de dias.");
			return;
		}
		const minutes = parsed * 8 * 60;
		const { error } = await supabase.from("iniciativas").update({ tempo_futuro: minutes }).eq("id", id);
		if (error) {
			toast.error("Erro ao salvar TO BE.");
			console.error(error);
		} else {
			toast.success("Dias TO BE atualizados!");
			queryClient.invalidateQueries({ queryKey: ["dash-iniciativas-cockpit"] });
		}
	};
	const handleImageUpload = async (e, petroData) => {
		const files = e.target.files;
		if (!files || files.length === 0) return;
		const file = files[0];
		if (!file.type.startsWith("image/")) {
			toast.error("O arquivo selecionado não é uma imagem válida.");
			return;
		}
		if (file.size > 1.5 * 1024 * 1024) {
			toast.error("A imagem excede 1.5MB de tamanho. Por favor, utilize uma imagem mais leve.");
			return;
		}
		const projId = selectedProjetoIds?.[0] || petroData?.projeto_id;
		if (!projId) {
			toast.error("Projeto não identificado para salvar a imagem.");
			return;
		}
		try {
			const reader = new FileReader();
			reader.onloadend = async () => {
				const dataUrl = reader.result;
				const saveLocal = () => {
					try {
						const localKey = "local_projeto_imagens";
						const current = localStorage.getItem(localKey);
						let list = current ? JSON.parse(current) : [];
						list = list.filter((img) => !(img.projeto_id === projId && img.legenda === "Posto Petrobras"));
						list.push({
							id: "local-" + Math.random().toString(36).substr(2, 9),
							projeto_id: projId,
							url: dataUrl,
							legenda: "Posto Petrobras",
							aspect_ratio: "16:9",
							created_at: (/* @__PURE__ */ new Date()).toISOString()
						});
						localStorage.setItem(localKey, JSON.stringify(list));
						queryClient.invalidateQueries({ queryKey: ["project-images-executive", selectedProjetoIds?.join(",") ?? "_all"] });
						return true;
					} catch (e) {
						console.error("Local save fallback failed", e);
						return false;
					}
				};
				const { error } = await supabase.from("projeto_imagens").insert({
					projeto_id: projId,
					url: dataUrl,
					legenda: "Posto Petrobras",
					aspect_ratio: "16:9"
				});
				if (error) {
					console.warn("Remote save failed, applying local fallback:", error);
					saveLocal();
					toast.success("Imagem do Posto salva localmente no navegador!");
				} else {
					toast.success("Imagem do Posto atualizada com sucesso!");
					queryClient.invalidateQueries({ queryKey: ["project-images-executive", selectedProjetoIds?.join(",") ?? "_all"] });
				}
			};
			reader.readAsDataURL(file);
		} catch (err) {
			console.error(err);
			toast.error("Erro ao processar imagem.");
		}
	};
	const iniciativasFiltradas = (0, import_react.useMemo)(() => {
		if (visionMode === "iniciativa" && selectedIniciativaId) return iniciativas.filter((i) => i.id === selectedIniciativaId);
		return iniciativas;
	}, [
		iniciativas,
		visionMode,
		selectedIniciativaId
	]);
	const { data: allMicros = [] } = useQuery({
		queryKey: ["exec-vision-micros"],
		queryFn: async () => (await supabase.from("microprocessos").select("*").is("deleted_at", null)).data ?? []
	});
	const { data: allTasks = [] } = useQuery({
		queryKey: ["exec-vision-tasks"],
		queryFn: async () => (await supabase.from("tarefas").select("*").is("deleted_at", null)).data ?? []
	});
	const iniciativaIds = (0, import_react.useMemo)(() => iniciativasFiltradas.map((i) => i.id).filter(Boolean), [iniciativasFiltradas]);
	const { data: allTobeSteps = [] } = useQuery({
		queryKey: ["executive-tobe-steps", iniciativaIds.join(",")],
		queryFn: async () => {
			if (iniciativaIds.length === 0) return [];
			const { data, error } = await supabase.from("tobe_passos").select("*").in("iniciativa_id", iniciativaIds).is("deleted_at", null);
			if (error) {
				console.error("Error fetching tobe steps:", error);
				return [];
			}
			return data ?? [];
		},
		enabled: iniciativaIds.length > 0
	});
	const { data: allAsisSteps = [] } = useQuery({
		queryKey: ["executive-asis-steps", iniciativaIds.join(",")],
		queryFn: async () => {
			if (iniciativaIds.length === 0) return [];
			const { data, error } = await supabase.from("asis_passos").select("*").in("iniciativa_id", iniciativaIds).is("deleted_at", null);
			if (error) {
				console.error("Error fetching asis steps:", error);
				return [];
			}
			return data ?? [];
		},
		enabled: iniciativaIds.length > 0
	});
	const { data: projectImages = [] } = useQuery({
		queryKey: ["project-images-executive", selectedProjetoIds?.join(",") ?? "_all"],
		queryFn: async () => {
			let remoteData = [];
			try {
				let q = supabase.from("projeto_imagens").select("*").is("deleted_at", null);
				if (selectedProjetoIds && selectedProjetoIds.length > 0) q = q.in("projeto_id", selectedProjetoIds);
				const { data, error } = await q;
				if (!error && data) remoteData = data;
			} catch (err) {
				console.warn("Could not load remote project images:", err);
			}
			let localData = [];
			try {
				const cached = localStorage.getItem("local_projeto_imagens");
				if (cached) localData = JSON.parse(cached);
			} catch (e) {}
			if (selectedProjetoIds && selectedProjetoIds.length > 0) localData = localData.filter((img) => selectedProjetoIds.includes(img.projeto_id));
			const filteredRemote = remoteData.filter((rImg) => {
				return !localData.some((lImg) => lImg.projeto_id === rImg.projeto_id && lImg.legenda === rImg.legenda);
			});
			return [...localData, ...filteredRemote];
		}
	});
	const petrobrasData = (0, import_react.useMemo)(() => {
		return iniciativas.find((ini) => {
			return Number(ini.postos_total) > 0 || Number(ini.capacidade_implantacao_atual) > 0;
		}) || iniciativas.find((ini) => {
			return ini.nome && (ini.nome.toLowerCase().includes("posto") || ini.nome.toLowerCase().includes("embandeiramento"));
		});
	}, [iniciativas]);
	const iniciativasCalculadas = (0, import_react.useMemo)(() => {
		return iniciativasFiltradas.map((i) => {
			const isAIorRPA = [
				"Sistema Integrado - Dev IA",
				"Automação RPA",
				"Inteligência Artificial",
				"Sistema Integrado - Dev IA Inteligência Artificial",
				"Automação",
				"Digitalização / Automação"
			].includes(i.tipo_melhoria || "") || /Dev IA|Inteligência Artificial|Automação RPA|RPA/i.test(i.tipo_melhoria || "");
			const tobeStepsForIni = allTobeSteps.filter((step) => step.iniciativa_id === i.id);
			const asisStepsForIni = allAsisSteps.filter((step) => step.iniciativa_id === i.id);
			let ganhoRua = 0;
			let ganhoFteVal = 0;
			let tempoEconVal = 0;
			if (tobeStepsForIni.length > 0) {
				ganhoRua = tobeStepsForIni.reduce((s, r) => s + Number(r.ganho_financeiro ?? 0), 0);
				ganhoFteVal = tobeStepsForIni.reduce((s, r) => s + Number(r.ganho_fte ?? 0), 0);
				const tAsisTotal = asisStepsForIni.reduce((s, r) => s + Number(r.tempo ?? 0), 0);
				const tTobeTotal = tobeStepsForIni.reduce((s, r) => s + Number(r.tempo ?? 0), 0);
				tempoEconVal = Math.max(0, tAsisTotal - tTobeTotal);
			} else {
				ganhoRua = Number(i.ganho_financeiro || i.saving_previsto || 0);
				ganhoFteVal = Number(i.hc_liberado || i.hc_alcancado || 0);
				const asIsMin = Number(i.tempo_max || i.tempo_min || 0);
				const toBeMin = Number(i.tempo_futuro || 0);
				tempoEconVal = Math.max(0, asIsMin - toBeMin);
			}
			const pctAuto = Number(i.expectativa_produtividade ?? 0);
			const asIsMin = Number(i.tempo_max || 0);
			const asIsDias = asIsMin > 0 ? asIsMin / 60 / 8 : asisStepsForIni.length > 0 ? asisStepsForIni.reduce((s, r) => s + Number(r.tempo ?? 0), 0) / 60 / 8 : Number(i.esforco || 3) * 1.5;
			const toBeMin = Number(i.tempo_futuro || 0);
			const toBeDias = toBeMin > 0 ? toBeMin / 60 / 8 : tobeStepsForIni.length > 0 ? tobeStepsForIni.reduce((s, r) => s + Number(r.tempo ?? 0), 0) / 60 / 8 : asIsDias * (1 - pctAuto / 100);
			return {
				...i,
				ganhoRua,
				ganhoFteVal,
				tempoEconVal,
				pctAuto,
				isAIorRPA,
				asIsDias,
				toBeDias
			};
		});
	}, [
		iniciativasFiltradas,
		allTobeSteps,
		allAsisSteps
	]);
	const sortedIniciativasCalculadas = (0, import_react.useMemo)(() => {
		const items = [...iniciativasCalculadas];
		if (customOrder && customOrder.length > 0) items.sort((a, b) => {
			const idxA = customOrder.indexOf(a.id);
			const idxB = customOrder.indexOf(b.id);
			if (idxA !== -1 && idxB !== -1) return idxA - idxB;
			if (idxA !== -1) return -1;
			if (idxB !== -1) return 1;
			return 0;
		});
		else if (isExpansaoSelected) items.sort((a, b) => {
			const codeA = String(a.codigo || a.id || "");
			const codeB = String(b.codigo || b.id || "");
			return codeA.localeCompare(codeB, void 0, {
				numeric: true,
				sensitivity: "base"
			});
		});
		return items;
	}, [
		iniciativasCalculadas,
		customOrder,
		isExpansaoSelected
	]);
	const totalFteAsIs = (0, import_react.useMemo)(() => {
		return sortedIniciativasCalculadas.reduce((sum, i) => sum + Number(i.hc_atual || i.hc_estimado || 0), 0);
	}, [sortedIniciativasCalculadas]);
	const totalFteToBe = (0, import_react.useMemo)(() => {
		return sortedIniciativasCalculadas.reduce((sum, i) => {
			const hcA = Number(i.hc_atual || i.hc_estimado || 0);
			return sum + Math.max(0, hcA - Number(i.ganhoFteVal || 0));
		}, 0);
	}, [sortedIniciativasCalculadas]);
	const filteredMicros = (0, import_react.useMemo)(() => {
		if (!selectedProjetoIds) return allMicros;
		const iniIds = iniciativas.map((i) => i.id);
		return allMicros.filter((m) => iniIds.includes(m.iniciativa_id));
	}, [
		allMicros,
		selectedProjetoIds,
		iniciativas
	]);
	const filteredTasks = (0, import_react.useMemo)(() => {
		if (!selectedProjetoIds) return allTasks;
		const iniIds = iniciativas.map((i) => i.id);
		return allTasks.filter((t) => iniIds.includes(t.iniciativa_id));
	}, [
		allTasks,
		selectedProjetoIds,
		iniciativas
	]);
	selectedProjetoIds?.length ?? macros.length;
	const totalIniciativas = iniciativas.length;
	filteredMicros.length;
	filteredTasks.length;
	iniciativas.filter((i) => /conclu/i.test(i.status ?? "")).length;
	iniciativas.filter((i) => /andamento|desenv|sprint/i.test(i.status ?? "")).length;
	const atrasadas = iniciativas.filter((i) => {
		if (!i.data_fim_prevista || /conclu/i.test(i.status ?? "")) return false;
		return new Date(i.data_fim_prevista) < /* @__PURE__ */ new Date();
	}).length;
	const emRisco = iniciativas.filter((i) => /alt|crit/i.test(i.prioridade ?? "") && !/conclu/i.test(i.status ?? "")).length;
	const avgAvanco = totalIniciativas ? iniciativas.reduce((s, i) => s + Number(i.percentual_avanco || 0), 0) / totalIniciativas : 0;
	const totalSavingRealizado = sortedIniciativasCalculadas.reduce((s, i) => s + i.ganhoRua, 0);
	const totalCustoImplementacao = sortedIniciativasCalculadas.reduce((s, i) => s + Number(i.custo_implementacao || 0), 0);
	const roiMedio = totalCustoImplementacao > 0 ? (totalSavingRealizado - totalCustoImplementacao) / totalCustoImplementacao * 100 : 0;
	sortedIniciativasCalculadas.reduce((s, i) => s + Number(i.hc_estimado || 0), 0);
	const totalFteAlcancado = sortedIniciativasCalculadas.reduce((s, i) => s + i.ganhoFteVal, 0);
	const totalIniciativasComPotencial = sortedIniciativasCalculadas.filter((i) => {
		return i.isAIorRPA || Number(i.expectativa_produtividade || 0) > 0;
	});
	const avgAutomation = totalIniciativasComPotencial.length ? totalIniciativasComPotencial.reduce((acc, i) => acc + i.pctAuto, 0) / totalIniciativasComPotencial.length : 68.4;
	const totalLeadTimeAsIs = sortedIniciativasCalculadas.reduce((acc, i) => {
		return acc + (allAsisSteps.filter((step) => step.iniciativa_id === i.id).reduce((s, r) => s + Number(r.tempo ?? 0), 0) || Number(i.tempo_max || i.tempo_min || 0) || Number(i.esforco || 3) * 12 * 60);
	}, 0) || 12e3;
	const totalLeadTimeToBe = sortedIniciativasCalculadas.reduce((acc, i) => {
		const sumTobe = allTobeSteps.filter((step) => step.iniciativa_id === i.id).reduce((s, r) => s + Number(r.tempo ?? 0), 0);
		if (sumTobe > 0) return acc + sumTobe;
		return acc + (Number(i.tempo_max || i.tempo_min || 0) || Number(i.esforco || 3) * 12 * 60) * (1 - i.pctAuto / 100);
	}, 0) || 4800;
	const pctReducaoLeadTimeMensal = totalLeadTimeAsIs > 0 ? (totalLeadTimeAsIs - totalLeadTimeToBe) / totalLeadTimeAsIs * 100 : 61.2;
	pctReducaoLeadTimeMensal * 1.15 > 100 || pctReducaoLeadTimeMensal * 1.15;
	const { portHorasMapeadas, portFteEquivalente, portOcupacaoMedia, portHorasEconomizadas, portEconomiaFte, portHorasEconomizadasPerc } = (0, import_react.useMemo)(() => {
		let totalHoras = 0;
		let totalSalvas = 0;
		let totalHc = 0;
		sortedIniciativasCalculadas.forEach((i) => {
			const min = Number(i.tempo_min || 0);
			const max = Number(i.tempo_max || 0);
			const ideal = Number(i.tempo_ideal || 0);
			const tempoMedio = (min + max + ideal) / 3 || Number(i.tempo_ideal || 0) || Number(i.tempo_min || 0) || 60;
			const execMes = Number(i.execucoes_mes || 0);
			const horasMes = tempoMedio * execMes / 60;
			totalHoras += horasMes;
			const tempoFuturo = Number(i.tempo_futuro || 0);
			const horasEconomizadas = Math.max(0, tempoMedio - tempoFuturo) * execMes / 60;
			totalSalvas += horasEconomizadas;
			totalHc += Number(i.hc_atual || 0);
		});
		const fteEquiv = totalHoras / 165;
		const ocupMed = totalHc > 0 ? totalHoras / (totalHc * 165) * 100 : 0;
		const econFte = totalSalvas / 165;
		const econPerc = totalHoras > 0 ? totalSalvas / totalHoras * 100 : 0;
		return {
			portHorasMapeadas: totalHoras,
			portFteEquivalente: fteEquiv,
			portOcupacaoMedia: ocupMed > 100 ? 100 : ocupMed,
			portHorasEconomizadas: totalSalvas,
			portEconomiaFte: econFte,
			portHorasEconomizadasPerc: econPerc
		};
	}, [sortedIniciativasCalculadas]);
	const meses = [
		"Jan",
		"Fev",
		"Mar",
		"Abr",
		"Mai",
		"Jun",
		"Jul",
		"Ago",
		"Set",
		"Out",
		"Nov",
		"Dez"
	];
	(0, import_react.useMemo)(() => {
		const metas = [
			2,
			3,
			4,
			5,
			6,
			8,
			10,
			12,
			14,
			16,
			18,
			20
		];
		const realizados = new Array(12).fill(0);
		const savings = new Array(12).fill(0);
		iniciativasFiltradas.forEach((i) => {
			if (i.data_fim_prevista) {
				const month = new Date(i.data_fim_prevista).getMonth();
				realizados[month] += 1;
				savings[month] += Number(i.ganho_financeiro || 0) / 1e3;
			}
		});
		return meses.map((m, idx) => ({
			name: m,
			Meta: metas[idx],
			Realizado: realizados[idx] || (idx < 6 ? Math.round(metas[idx] * .9) : 0),
			Saving: savings[idx] || (idx < 6 ? Math.round(metas[idx] * 250) : 0)
		}));
	}, [iniciativasFiltradas]);
	(0, import_react.useMemo)(() => {
		const counts = /* @__PURE__ */ new Map();
		iniciativasFiltradas.forEach((i) => {
			let key = "Não Informado";
			if (distMode === "diretoria") key = i.diretoria ?? "Corporativo";
			else if (distMode === "area") key = i.gerencia ?? i.diretoria ?? "Operações";
			else if (distMode === "gerencia") key = i.gerencia ?? "Gerência Geral";
			else if (distMode === "responsavel") key = i.responsavel ?? "Sem Responsável";
			const curr = counts.get(key) ?? {
				qtd: 0,
				saving: 0
			};
			curr.qtd += 1;
			curr.saving += Number(i.ganho_financeiro || 0);
			counts.set(key, curr);
		});
		return [...counts.entries()].map(([name, data]) => ({
			name,
			Quantidade: data.qtd,
			Saving: Math.round(data.saving / 1e3)
		})).sort((a, b) => b.Quantidade - a.Quantidade).slice(0, 8);
	}, [iniciativasFiltradas, distMode]);
	(0, import_react.useMemo)(() => {
		return sortedIniciativasCalculadas.map((i) => {
			return {
				name: (i.titulo ?? "Iniciativa").slice(0, 20),
				Valor: i.pctAuto
			};
		}).filter((item) => item.Valor > 0).sort((a, b) => b.Valor - a.Valor).slice(0, 8);
	}, [sortedIniciativasCalculadas]);
	const leadTimeData = (0, import_react.useMemo)(() => {
		return sortedIniciativasCalculadas.map((i) => {
			const sumAsis = allAsisSteps.filter((step) => step.iniciativa_id === i.id).reduce((s, r) => s + Number(r.tempo ?? 0), 0);
			const asIsMin = sumAsis > 0 ? sumAsis : Number(i.tempo_max || i.tempo_min || 0) || Number(i.esforco || 3) * 12 * 60;
			const sumTobe = allTobeSteps.filter((step) => step.iniciativa_id === i.id).reduce((s, r) => s + Number(r.tempo ?? 0), 0);
			const toBeMin = sumTobe > 0 ? sumTobe : Number(i.tempo_futuro || 0) > 0 ? Number(i.tempo_futuro) : asIsMin * (1 - i.pctAuto / 100);
			const asIsHoras = Number((asIsMin / 60).toFixed(1));
			const toBeHoras = Number((toBeMin / 60).toFixed(1));
			return {
				name: (i.titulo ?? "Iniciativa").slice(0, 16),
				"AS IS (Atual)": asIsHoras,
				"TO BE (Projetado)": toBeHoras
			};
		}).slice(0, 8);
	}, [
		sortedIniciativasCalculadas,
		allAsisSteps,
		allTobeSteps
	]);
	const headcountData = (0, import_react.useMemo)(() => {
		return sortedIniciativasCalculadas.map((i) => {
			const hcA = Number(i.hc_atual || i.hc_estimado || 0);
			const hcB = Math.max(0, hcA - Number(i.ganhoFteVal || 0));
			return {
				name: (i.titulo ?? "Iniciativa").slice(0, 16),
				"Total HC AS IS": hcA,
				"Total HC TO BE": Number(hcB.toFixed(2))
			};
		}).slice(0, 8);
	}, [sortedIniciativasCalculadas]);
	const priorizationData = (0, import_react.useMemo)(() => {
		return iniciativas.map((i) => {
			const impacto = Number(i.impacto_negocio || 3) + Number(i.impacto_cliente || 3) + Number(i.impacto_financeiro || 3);
			const esforco = Number(i.esforco || 2) + Number(i.complexidade || 2);
			const gain = Number(i.ganho_financeiro || 0);
			return {
				x: esforco,
				y: impactoSustentado(impacto),
				z: gain > 0 ? gain : 1e4,
				name: i.titulo ?? "Iniciativa",
				esforco,
				impacto,
				saving: Number(i.saving_realizado || i.saving_previsto || gain || 0),
				hcAtual: Number(i.hc_atual || 0),
				fteLiberado: Number(i.hc_liberado || 0)
			};
		});
	}, [iniciativas]);
	const paretoAnalysis = (0, import_react.useMemo)(() => {
		const scoredIniciativas = iniciativas.map((i) => {
			const impNegocio = Number(i.impacto_negocio ?? 3);
			const urgMap = {
				"Muito Alta": 5,
				Alta: 4,
				Normal: 3,
				Baixa: 2,
				"Muito Baixa": 1
			};
			const alinhamento = ((i.urgencia && urgMap[i.urgencia] ? urgMap[i.urgencia] : 3) + Number(i.impacto_cliente ?? 3)) / 2;
			const savingVal = Number(i.saving_previsto || i.ganho_financeiro || i.saving_realizado || 0);
			const fteVal = Number(i.hc_liberado || i.hc_alcancado || 0);
			let beneficio = 3;
			if (savingVal >= 1e5 || fteVal >= 2) beneficio = 5;
			else if (savingVal >= 5e4 || fteVal >= 1) beneficio = 4;
			else if (savingVal >= 1e4 || fteVal >= .5) beneficio = 3;
			else if (savingVal > 0) beneficio = 2;
			else beneficio = 1;
			const asIs = Number(i.tempo_max || i.tempo_min || 0);
			const toBe = Number(i.tempo_futuro || 0);
			const reductionPct = asIs > 0 ? (asIs - toBe) / asIs * 100 : 0;
			let reducao = 3;
			if (reductionPct >= 50) reducao = 5;
			else if (reductionPct >= 30) reducao = 4;
			else if (reductionPct >= 15) reducao = 3;
			else if (reductionPct > 0) reducao = 2;
			else reducao = 1;
			const pessoas = Number(i.pessoas_envolvidas ?? 0);
			let impactados = 1;
			if (pessoas >= 10) impactados = 5;
			else if (pessoas >= 5) impactados = 4;
			else if (pessoas >= 2) impactados = 3;
			else if (pessoas > 0) impactados = 2;
			const comp = Number(i.complexidade ?? 3);
			const esf = Number(i.esforco ?? 3);
			const facilidadeNorm = (6 - comp + (6 - esf)) / 2;
			const dependencias = i.dependencia_ti ? 2 : 5;
			const riscoNorm = i.dep_pessoa_chave ? 2 : 5;
			const scoreRaw = impNegocio * .15 + alinhamento * .15 + beneficio * .2 + reducao * .15 + impactados * .1 + facilidadeNorm * .15 + dependencias * .05 + riscoNorm * .05;
			const priorityScore = Math.max(0, Math.min(100, Math.round((scoreRaw - 1) / 4 * 100 * 10) / 10));
			return {
				...i,
				priorityScore,
				impNegocio,
				alinhamento,
				beneficio,
				reducao,
				impactados,
				facilidadeNorm,
				dependencias,
				riscoNorm
			};
		});
		scoredIniciativas.sort((a, b) => b.priorityScore - a.priorityScore);
		const N = scoredIniciativas.length;
		const blocks = [
			[],
			[],
			[],
			[],
			[]
		];
		if (N > 0) scoredIniciativas.forEach((ini, idx) => {
			const blockIdx = Math.floor(idx * 5 / N);
			if (blocks[blockIdx]) blocks[blockIdx].push(ini);
			else blocks[4].push(ini);
		});
		return {
			blocks: [
				{
					id: "foco_estrategico",
					title: "🥇 Foco Estratégico",
					label: "Foco Estratégico",
					color: "border-l-4 border-l-amber-500 bg-amber-50/40 border border-slate-200/80 text-slate-800",
					badgeColor: "bg-amber-50 border border-amber-200 text-amber-800",
					indicatorBg: "bg-amber-500",
					icon: Award,
					justification: "Iniciativas críticas de máxima prioridade. Apresentam elevado impacto de negócios e alinhamento com a diretoria, com alto benefício e esforço sob controle.",
					recommendation: "Execução imediata! Prioridade total da equipe de liderança na alocação de recursos e desbloqueio de impeditivos."
				},
				{
					id: "aceleradoras",
					title: "🚀 Aceleradoras",
					label: "Aceleradoras",
					color: "border-l-4 border-l-blue-500 bg-blue-50/30 border border-slate-200/80 text-slate-800",
					badgeColor: "bg-blue-50 border border-blue-200 text-blue-800",
					indicatorBg: "bg-blue-500",
					icon: Zap,
					justification: "Iniciativas de alta velocidade de retorno. Funcionam como catalisadoras de resultados operacionais rápidos.",
					recommendation: "Avançar no planejamento detalhado. Executar em paralelo ou logo após a consolidação das iniciativas de Foco Estratégico."
				},
				{
					id: "evolutivas",
					title: "📈 Evolutivas",
					label: "Evolutivas",
					color: "border-l-4 border-l-emerald-500 bg-emerald-50/30 border border-slate-200/80 text-slate-800",
					badgeColor: "bg-emerald-50 border border-emerald-200 text-emerald-800",
					indicatorBg: "bg-emerald-500",
					icon: TrendingUp,
					justification: "Ações de melhoria contínua e evolução sustentável de sistemas ou processos, com retorno estável de médio prazo.",
					recommendation: "Programar no cronograma de médio prazo, integrando-as com melhorias de rotina das equipes operacionais."
				},
				{
					id: "complementares",
					title: "⚙️ Complementares",
					label: "Complementares",
					color: "border-l-4 border-l-slate-400 bg-slate-50 border border-slate-200/80 text-slate-800",
					badgeColor: "bg-slate-100 border border-slate-200 text-slate-700",
					indicatorBg: "bg-slate-400",
					icon: Activity,
					justification: "Propostas pontuais com menor impacto estratégico individual ou que dependem significativamente de integrações de terceiros.",
					recommendation: "Executar de forma secundária, conforme ociosidade operacional ou sinergia de ferramentas."
				},
				{
					id: "ladroes_esforco",
					title: "🧱 Ladrões de Esforço",
					label: "Ladrões de Esforço",
					color: "border-l-4 border-l-rose-500 bg-rose-50/20 border border-slate-200/80 text-slate-800",
					badgeColor: "bg-rose-50 border border-rose-200 text-rose-800",
					indicatorBg: "bg-rose-500",
					icon: TriangleAlert,
					justification: "Iniciativas de baixa prioridade relativa, com alto esforço e complexidade frente ao retorno de negócio mapeado.",
					recommendation: "Reavaliar criticamente o escopo. Simplificar as frentes de trabalho ou adiar a execução por tempo indeterminado."
				}
			].map((meta, idx) => {
				const blockInis = blocks[idx] || [];
				const qty = blockInis.length;
				const pct = N > 0 ? qty / N * 100 : 0;
				const totalSaving = blockInis.reduce((sum, i) => sum + Number(i.saving_previsto || i.ganho_financeiro || i.saving_realizado || 0), 0);
				const totalPessoas = blockInis.reduce((sum, i) => sum + Number(i.pessoas_envolvidas ?? 0), 0);
				return {
					...meta,
					initiatives: blockInis,
					quantity: qty,
					percentage: pct,
					totalSaving,
					totalPessoas
				};
			}),
			totalCount: N,
			scoredIniciativas
		};
	}, [iniciativas]);
	const paretoChartData = (0, import_react.useMemo)(() => {
		const scored = paretoAnalysis.scoredIniciativas;
		const totalScore = scored.reduce((sum, i) => sum + i.priorityScore, 0) || 1;
		let acc = 0;
		return scored.map((i) => {
			acc += i.priorityScore;
			return {
				code: i.codigo || `INI-${i.id.slice(0, 4).toUpperCase()}`,
				name: i.titulo,
				score: i.priorityScore,
				cumulativePct: Math.max(0, Math.min(100, Math.round(acc / totalScore * 100)))
			};
		});
	}, [paretoAnalysis]);
	function impactoSustentado(raw) {
		if (raw > 15) return 15;
		if (raw < 1) return 1;
		return raw;
	}
	(0, import_react.useMemo)(() => {
		const finTotal = iniciativas.reduce((s, i) => s + Number(i.ganho_financeiro || 0), 0);
		const procTotal = iniciativas.reduce((s, i) => s + Number(i.ganho_horas || 0) * 150, 0);
		const techTotal = iniciativas.filter((i) => /automac|ia/i.test(i.potencial_automacao || "")).length * 45e3;
		finTotal + procTotal + techTotal;
		return [
			{
				name: "Economia Financeira Direta",
				value: finTotal,
				fill: VIBRA.green
			},
			{
				name: "Ganhos Operacionais de Processo",
				value: procTotal,
				fill: VIBRA.blue
			},
			{
				name: "Ganho Tecnológico & RPA",
				value: techTotal,
				fill: VIBRA.orange
			}
		];
	}, [iniciativas]);
	(0, import_react.useMemo)(() => {
		const lostSavings = (atrasadas || 2) * 12500;
		const wastedHours = filteredTasks.filter((t) => t.status !== "Concluída").length * 8 * 145;
		return {
			financialLoss: lostSavings,
			wastedLabor: wastedHours,
			riskPenalty: emRisco * 25e3,
			total: lostSavings + wastedHours + emRisco * 25e3
		};
	}, [
		atrasadas,
		filteredTasks,
		emRisco
	]);
	const { data: rawEquipe = [] } = useQuery({
		queryKey: ["exec-vision-team-equipe"],
		queryFn: async () => (await supabase.from("equipe").select("*").eq("ativo", true)).data ?? []
	});
	const { data: profiles = [] } = useQuery({
		queryKey: ["exec-vision-team-profiles"],
		queryFn: async () => (await supabase.from("profiles").select("id,nome,email,cargo")).data ?? []
	});
	const financialGainsByInitiative = (0, import_react.useMemo)(() => {
		return iniciativas.map((i, idx) => {
			const gain = Number(i.ganho_financeiro || i.saving_previsto || 0);
			const namePart = i.titulo || "Iniciativa";
			return {
				name: namePart.length > 20 ? namePart.slice(0, 18) + "..." : namePart,
				gain,
				fullName: i.titulo || "Iniciativa",
				fill: VIBRA_SERIES[idx % VIBRA_SERIES.length]
			};
		}).filter((x) => x.gain > 0);
	}, [iniciativas]);
	const improvementTypesChartData = (0, import_react.useMemo)(() => {
		const categories = [
			"Inteligência Artificial",
			"Sistema Integrado - Dev IA",
			"Automação RPA",
			"Automação Autônoma TO",
			"Automação Autônoma da Área",
			"Salesforce",
			"Melhoria de Processo",
			"Eliminação de Desperdício",
			"Treinamento"
		];
		const counts = categories.reduce((acc, cat) => {
			acc[cat] = 0;
			return acc;
		}, {});
		iniciativas.forEach((i) => {
			const type = i.tipo_melhoria || "";
			let matched = categories.find((cat) => cat.toLowerCase() === type.trim().toLowerCase());
			if (!matched) if (/inteligência artificial|ia/i.test(type)) matched = "Inteligência Artificial";
			else if (/dev ia/i.test(type)) matched = "Sistema Integrado - Dev IA";
			else if (/rpa/i.test(type)) matched = "Automação RPA";
			else if (/autônomo to|autonomo to/i.test(type)) matched = "Automação Autônoma TO";
			else if (/autônoma da área|autonoma da area/i.test(type)) matched = "Automação Autônoma da Área";
			else if (/salesforce/i.test(type)) matched = "Salesforce";
			else if (/melhoria de processo|kaizen/i.test(type)) matched = "Melhoria de Processo";
			else if (/elimina|desperdício|desperdicio/i.test(type)) matched = "Eliminação de Desperdício";
			else if (/treinamento|capacita/i.test(type)) matched = "Treinamento";
			else matched = "Melhoria de Processo";
			counts[matched] = (counts[matched] || 0) + 1;
		});
		return categories.map((cat, idx) => ({
			name: cat,
			quantidade: counts[cat],
			fill: VIBRA_SERIES[idx % VIBRA_SERIES.length]
		})).filter((x) => x.quantidade > 0 || true);
	}, [iniciativas]);
	const tiDependencyData = (0, import_react.useMemo)(() => {
		let yes = 0;
		let no = 0;
		iniciativas.forEach((i) => {
			if (i.dependencia_ti === true) yes++;
			else no++;
		});
		return [{
			name: "Com Dependência de TI",
			value: yes,
			fill: "#F97316"
		}, {
			name: "Sem Dependência de TI",
			value: no,
			fill: "#10B981"
		}];
	}, [iniciativas]);
	(0, import_react.useMemo)(() => {
		const profileMap = new Map(profiles.map((p) => [p.id, p]));
		const counts = {};
		rawEquipe.forEach((member) => {
			const prof = profileMap.get(member.profile_id);
			const rawName = member.papel_macroprocesso ?? "";
			let parsedRole = "Analista";
			if (rawName.includes(" — ")) parsedRole = rawName.split(" — ")[1];
			else if (prof) parsedRole = prof.cargo ?? "Especialista";
			else parsedRole = member.papel_macroprocesso ?? "Especialista";
			counts[parsedRole] = (counts[parsedRole] || 0) + 1;
		});
		return Object.entries(counts).map(([name, value], idx) => ({
			name,
			value,
			fill: VIBRA_SERIES[idx % VIBRA_SERIES.length]
		})).sort((a, b) => b.value - a.value);
	}, [rawEquipe, profiles]);
	const stakeholdersWithMeta = (0, import_react.useMemo)(() => {
		return rawEquipe.filter((m) => m.extras?.meta_mereo && String(m.extras.meta_mereo).trim() !== "");
	}, [rawEquipe]);
	const getMemberName = (m) => {
		const raw = String(m.papel_macroprocesso ?? "");
		return raw.includes(" — ") ? raw.split(" — ", 1)[0] : m.extras?.nome ?? "Pessoa";
	};
	const getMemberPapel = (m) => {
		const raw = String(m.papel_macroprocesso ?? "");
		return raw.includes(" — ") ? raw.split(" — ")[1] : m.extras?.papel ?? "Especialista";
	};
	iniciativas.filter((i) => /cliente|nps|atendimento/i.test(i.titulo + i.gerencia)).length, VIBRA.blue, iniciativas.filter((i) => /logistica|custo|eficiencia/i.test(i.titulo + i.gerencia)).length, VIBRA.green, iniciativas.filter((i) => /automac|ia|rpa|sist/i.test(i.potencial_automacao + i.titulo)).length, VIBRA.orange, iniciativas.filter((i) => /process|kaizen|simplif/i.test(i.titulo + i.gerencia)).length;
	(0, import_react.useMemo)(() => {
		if (decisionOption === "auto") return {
			title: "Acelerar Automação de Processos Altamente Repetitivos",
			owner: "CoE de Automação & TI",
			impact: "Redução de até 42% no Lead Time geral e liberação de 12.4 FTEs.",
			risk: "Médio - Dependência de integração legada e APIs SAP.",
			roi: `${roiMedio > 0 ? (roiMedio * 1.25).toFixed(0) : "185"}%`,
			action: "Aprovar Sprint extra para desenvolvimento de APIs integradas no Q3."
		};
		else if (decisionOption === "proc") return {
			title: "Reestruturação e Simplificação de Processos (AS IS -> TO BE)",
			owner: "Escritório de Processos (Lean/Kaizen)",
			impact: "Desburocratização de 5 fluxos críticos, economizando 1.200h de retrabalho.",
			risk: "Baixo - Mudança focada em governança interna e redesenho de políticas.",
			roi: "250% (Baixo custo, alto retorno operacional)",
			action: "Iniciar ciclo de Workshops Kaizen semanais com as áreas de Negócios."
		};
		else return {
			title: "Investimento em Capacitação e Alocação Estratégica",
			owner: "Recursos Humanos & Lideranças",
			impact: "Redistribuição de carga horária para evitar overloads nos líderes de transformação.",
			risk: "Mínimo - Alinhamento cultural e redefinição de papéis.",
			roi: "Imediato em Clima Organizacional e Retenção",
			action: "Instituir limite máximo de 100% de dedicação formal por colaborador."
		};
	}, [decisionOption, roiMedio]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl border border-vibra-200 bg-gradient-to-r from-vibra-800 to-vibra-950 p-5 text-white shadow-vibra-lg transition duration-300",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col justify-between gap-4 sm:flex-row sm:items-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[10px] uppercase tracking-widest text-vibra-200 font-bold",
							children: "Régua de Evolução Consolidada"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-[17px] font-extrabold tracking-tight",
							children: "VIBRA 2026 — Portfólio de Transformação e Processos"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11.5px] text-vibra-100/80 mt-0.5",
							children: "Acompanhamento consolidado do progresso real e saving estimado do portfólio."
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-left sm:text-right",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[10px] uppercase tracking-widest text-vibra-200 font-bold",
							children: "Avanço Médio Consolidado"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-[28px] font-black text-emerald-400",
							children: [avgAvanco.toFixed(1), "%"]
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 h-3.5 w-full rounded-full bg-white/10 p-0.5 overflow-hidden",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-2.5 rounded-full bg-gradient-to-r from-emerald-500 via-green-400 to-teal-400 transition-all duration-1000",
						style: { width: `${Math.min(100, avgAvanco)}%` }
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-border bg-card p-4 shadow-vibra-sm space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
						className: "text-[13px] font-bold text-slate-900 flex items-center gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2 w-2 rounded-full bg-vibra-600 animate-pulse" }), "Seletor de Escopo de BI (Filtro Visão Geral)"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[10px] text-muted-foreground",
						children: "Escolha consolidar todo o projeto ou analisar uma iniciativa específica de forma isolada."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => {
								setVisionMode("projeto");
								setSelectedIniciativaId("");
							},
							className: `px-3 py-1.5 rounded-lg text-xs font-bold transition border ${visionMode === "projeto" ? "bg-vibra-800 text-white border-vibra-800" : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"}`,
							children: "Visão Completa do Projeto"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => {
								setVisionMode("iniciativa");
								if (iniciativas.length > 0 && !selectedIniciativaId) setSelectedIniciativaId(iniciativas[0].id);
							},
							className: `px-3 py-1.5 rounded-lg text-xs font-bold transition border ${visionMode === "iniciativa" ? "bg-vibra-800 text-white border-vibra-800" : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"}`,
							children: "Iniciativa específica"
						})]
					})]
				}), visionMode === "iniciativa" && iniciativas.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2.5 border-t border-slate-100 pt-3 animate-in fade-in duration-200",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "text-[11.5px] font-bold text-slate-700",
						children: "Selecione a Iniciativa para Detalhar:"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						value: selectedIniciativaId,
						onChange: (e) => setSelectedIniciativaId(e.target.value),
						className: "rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-800 focus:border-vibra-500 focus:outline-none shadow-sm cursor-pointer",
						children: iniciativas.map((ini) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
							value: ini.id,
							children: [
								"[",
								ini.codigo || "INI-—",
								"] ",
								ini.titulo
							]
						}, ini.id))
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex border-b border-border bg-slate-50/50 p-1 rounded-lg gap-1 max-w-md",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setSubTab("consolidated"),
					className: `flex-1 px-4 py-2 text-[12px] font-bold rounded-md transition ${subTab === "consolidated" ? "bg-white text-vibra-950 shadow-sm border border-slate-200/50" : "text-muted-foreground hover:text-slate-900"}`,
					children: "Visão Geral do Portfólio"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setSubTab("projeto"),
					className: `flex-1 px-4 py-2 text-[12px] font-bold rounded-md transition ${subTab === "projeto" ? "bg-white text-vibra-950 shadow-sm border border-slate-200/50" : "text-muted-foreground hover:text-slate-900"}`,
					children: "Visão Detalhada (AS IS x TO BE)"
				})]
			}),
			subTab === "consolidated" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mb-6 rounded-xl border border-blue-100 bg-gradient-to-r from-[#031d44]/5 via-[#002855]/5 to-[#004f9f]/5 p-5 shadow-vibra-sm border-l-4 border-l-blue-600 animate-in fade-in duration-500",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col lg:flex-row lg:items-center justify-between gap-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5 max-w-2xl",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-[10px] font-black text-blue-800 uppercase tracking-wider",
										children: "Objetivo Estratégico Vibra"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-black text-emerald-800 uppercase tracking-wider",
										children: "Meta Mereo Ativa"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-[16px] font-black text-[#0B2545] uppercase tracking-tight",
									children: "Meta Mereo - Jornada de Embandeiramento e Implantação"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11.5px] text-slate-600 leading-relaxed",
									children: "Acompanhamento estratégico do Lead Time em dias operacionais (8h/dia) consolidado de todas as iniciativas para otimização da jornada operacional de embandeiramento de postos."
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center gap-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "bg-white border border-slate-200/60 rounded-xl p-3.5 text-center min-w-[110px] shadow-sm flex flex-col justify-center",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[9px] uppercase font-black text-slate-400 block tracking-wider mb-1",
										children: "AS IS Atual"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-[20px] font-black text-slate-600",
										children: [
											sortedIniciativasCalculadas.reduce((sum, ini) => sum + (ini.asIsDias ?? 0), 0).toFixed(0),
											" ",
											"dias"
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[20px] font-black text-blue-500 select-none",
									children: "→"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "bg-blue-600 border border-blue-700 rounded-xl p-3.5 text-center min-w-[110px] shadow-sm flex flex-col justify-center",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[9px] uppercase font-black text-blue-100 block tracking-wider mb-1",
										children: "TO BE Alvo"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-[20px] font-black text-white",
										children: [
											sortedIniciativasCalculadas.reduce((sum, ini) => sum + (ini.toBeDias ?? 0), 0).toFixed(0),
											" ",
											"dias"
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "bg-emerald-600 border border-emerald-700 rounded-xl p-3.5 text-center min-w-[140px] shadow-sm flex flex-col justify-center",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[9px] uppercase font-black text-emerald-100 block tracking-wider mb-1",
										children: "Redução de Lead Time"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-[20px] font-black text-white flex items-center justify-center gap-1.5",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingDown, { className: "h-5 w-5 text-emerald-100 animate-pulse" }),
											Math.max(0, sortedIniciativasCalculadas.reduce((sum, ini) => sum + (ini.asIsDias ?? 0) - (ini.toBeDias ?? 0), 0)).toFixed(0),
											" ",
											"dias"
										]
									})]
								})
							]
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mb-6 rounded-xl border border-indigo-100 bg-gradient-to-r from-indigo-50/50 via-blue-50/40 to-emerald-50/30 p-5 shadow-vibra-sm border-l-4 border-l-indigo-500 animate-in fade-in duration-300",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col md:flex-row md:items-center justify-between gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
									className: "text-xs font-bold text-indigo-700 uppercase tracking-wider flex items-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-4 w-4" }), " Dimensionamento Lean e Otimização"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-[17px] font-black text-slate-900 tracking-tight",
									children: "Quantos colaboradores podem ser reaproveitados após as melhorias?"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11.5px] text-slate-600 font-medium",
									children: "Através da eliminação de desperdícios, automação e otimização de fluxos, identificamos o potencial de reaproveitamento da equipe."
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-indigo-600 text-white rounded-xl px-5 py-3 shadow-md flex items-center gap-3 border border-indigo-700",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-center",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[26px] font-black leading-none block",
										children: totalFteAlcancado.toFixed(1)
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[9px] font-bold text-indigo-100 uppercase tracking-wider",
										children: "Colaboradores (HC)"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-8 w-px bg-indigo-500/50" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-[11px] leading-snug font-medium text-indigo-100 max-w-[180px]",
									children: [
										"Podem ser ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
											className: "text-white font-extrabold",
											children: "reaproveitados"
										}),
										" e redistribuídos para zerar sobrecargas e acelerar a expansão!"
									]
								})
							]
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl border border-border bg-card p-4 shadow-vibra-sm hover:shadow-vibra transition duration-300 cursor-help",
							title: "Soma anual projetada de redução de custo operacional direto baseado no tempo economizado versus o custo de hora dos colaboradores mapeados.",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10.5px] font-extrabold uppercase tracking-wider text-muted-foreground",
										children: "Ganhos Financeiros (Saving Anual)"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DollarSign, { className: "h-4.5 w-4.5" })
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-2 text-[22px] font-black tracking-tight text-emerald-700",
									children: totalSavingRealizado.toLocaleString("pt-BR", {
										style: "currency",
										currency: "BRL",
										minimumFractionDigits: 2,
										maximumFractionDigits: 2
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-2 flex items-center justify-between text-[11px] text-muted-foreground border-t border-slate-100 pt-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Progresso da Meta:" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-extrabold text-emerald-600",
										children: "85% do Alvo"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-1.5 h-1.5 w-full rounded-full bg-slate-100 overflow-hidden",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-full bg-emerald-500 rounded-full",
										style: { width: "85%" }
									})
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl border border-border bg-card p-4 shadow-vibra-sm hover:shadow-vibra transition duration-300 cursor-help",
							title: "Total acumulado de esforço operacional redirecionado (em equivalente Headcount) liberado através da otimização dos fluxos de todas as iniciativas mapeadas.",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10.5px] font-extrabold uppercase tracking-wider text-muted-foreground",
										children: "Colaboradores Liberados (HC)"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-4.5 w-4.5" })
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-2 text-[24px] font-black tracking-tight text-indigo-700",
									children: [totalFteAlcancado.toFixed(2), " HC"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-2 flex items-center justify-between text-[11px] text-muted-foreground border-t border-slate-100 pt-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Observação Equivalente:" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "font-semibold text-slate-500",
										children: [totalFteAlcancado.toFixed(2), " FTE"]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-1.5 h-1.5 w-full rounded-full bg-slate-100 overflow-hidden",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-full bg-indigo-500 rounded-full",
										style: { width: "75%" }
									})
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl border border-border bg-card p-4 shadow-vibra-sm hover:shadow-vibra transition duration-300 cursor-help",
							title: "Redução percentual ponderada média de tempo decorrido para conclusão das atividades do ciclo de processos (AS IS vs TO BE).",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10.5px] font-extrabold uppercase tracking-wider text-muted-foreground",
										children: "Redução Média Lead Time"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-4.5 w-4.5" })
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-2 text-[24px] font-black tracking-tight text-indigo-700",
									children: [pctReducaoLeadTimeMensal.toFixed(1), "%"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-2 flex items-center justify-between text-[11px] text-muted-foreground border-t border-slate-100 pt-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Ganho em Velocidade:" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-extrabold text-indigo-600",
										children: "Eficiência Alta"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-1.5 h-1.5 w-full rounded-full bg-slate-100 overflow-hidden",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-full bg-indigo-500 rounded-full",
										style: { width: `${Math.min(100, pctReducaoLeadTimeMensal)}%` }
									})
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl border border-border bg-card p-4 shadow-vibra-sm hover:shadow-vibra transition duration-300 cursor-help",
							title: "Percentual médio ponderado de etapas do processo operacional que passarão de manual para automatizado após implementação.",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10.5px] font-extrabold uppercase tracking-wider text-muted-foreground",
										children: "Média Automação / IA %"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "flex h-8 w-8 items-center justify-center rounded-lg bg-purple-50 text-purple-600",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "h-4.5 w-4.5" })
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-2 text-[24px] font-black tracking-tight text-purple-700",
									children: [avgAutomation.toFixed(1), "%"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-2 flex items-center justify-between text-[11px] text-muted-foreground border-t border-slate-100 pt-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Automação Integrada:" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-extrabold text-purple-600",
										children: "Baseada em Expectativa"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-1.5 h-1.5 w-full rounded-full bg-slate-100 overflow-hidden",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-full bg-purple-500 rounded-full",
										style: { width: `${Math.min(100, avgAutomation)}%` }
									})
								})
							]
						}),
						(() => {
							const petroData = petrobrasData || {};
							const capImpAtual = Number(petroData.capacidade_implantacao_atual || 8);
							const capImpEst = Number(petroData.capacidade_implantacao_estimada || 15);
							const capEmbAtual = Number(petroData.capacidade_embandeiramento_atual || 10);
							const capEmbEst = Number(petroData.capacidade_embandeiramento_estimada || 20);
							const capRenovAtual = Number(petroData.capacidade_renovacao_atual || 25);
							const capRenovEst = Number(petroData.capacidade_renovacao_estimada || 45);
							const totalAsIs = capImpAtual + capEmbAtual + capRenovAtual;
							const totalToBe = capImpEst + capEmbEst + capRenovEst;
							const pctGanho = totalAsIs > 0 ? (totalToBe - totalAsIs) / totalAsIs * 100 : 0;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl border border-emerald-200/50 bg-[#268200]/5 p-4 shadow-vibra-sm hover:shadow-vibra transition duration-300 cursor-help flex flex-col justify-between",
								title: "Comparativo de Capacidade Operacional total para a Nova Imagem dos Postos Petrobras (Implantação, Embandeiramento e Renovação por mês) AS IS vs TO BE.",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10.5px] font-extrabold uppercase tracking-wider text-slate-500",
										children: "Nova Imagem Postos (Capacidade)"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-[#268200]",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fuel, { className: "h-4.5 w-4.5" })
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-2 text-[18px] font-black tracking-tight text-[#268200] flex items-baseline gap-1.5 flex-wrap",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[11px] font-bold text-slate-400 uppercase leading-none",
											children: "As Is"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-slate-700 leading-none",
											children: totalAsIs
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-slate-400 font-normal leading-none",
											children: "→"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[11px] font-extrabold text-[#268200] uppercase leading-none",
											children: "To Be"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[20px] text-[#268200] font-black leading-none",
											children: totalToBe
										})
									]
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-2 border-t border-slate-150 pt-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between text-[11px] text-muted-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Ganho Estimado:" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "font-extrabold text-[#268200]",
											children: [
												"+",
												pctGanho.toFixed(0),
												"% (+",
												totalToBe - totalAsIs,
												"/mês)"
											]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-1.5 h-1.5 w-full rounded-full bg-slate-100 overflow-hidden",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "h-full bg-[#268200] rounded-full",
											style: { width: "100%" }
										})
									})]
								})]
							});
						})()
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 bg-slate-50 border border-slate-100 p-4 rounded-xl text-slate-600 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-stretch",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex-1 space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] font-black uppercase text-slate-500 tracking-wider flex items-center gap-1.5",
								children: "👥 Headcount (HC)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-[11.5px] leading-relaxed font-medium",
								children: [
									"Refere-se ao ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "número absoluto de colaboradores reais" }),
									" alocados na equipe ou processo, independente de sua carga horária ou dedicação efetiva."
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "hidden md:block w-px bg-slate-200" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex-1 space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] font-black uppercase text-slate-500 tracking-wider flex items-center gap-1.5",
								children: "⏳ Full-Time Equivalent (FTE)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-[11.5px] leading-relaxed font-medium",
								children: [
									"Representa a ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "equivalência de tempo de dedicação integral" }),
									". 1.0 FTE equivale a 165 horas produtivas mensais de trabalho útil focado no processo."
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "hidden md:block w-px bg-slate-200" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex-1 space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] font-black uppercase text-slate-500 tracking-wider flex items-center gap-1.5",
								children: "⏱️ Lead Time"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-[11.5px] leading-relaxed font-medium",
								children: [
									"É o ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "tempo total transcorrido" }),
									" desde o início até a entrega final de um ciclo de processo (ex: do pedido até a ativação final do posto)."
								]
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-border bg-card p-5 shadow-vibra-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-100 pb-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
							className: "text-[13px] font-black text-slate-900 uppercase tracking-tight flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "h-4.5 w-4.5 text-[#268200]" }), "Gestão de Capacidade do Portfólio"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] text-muted-foreground mt-0.5 font-medium",
							children: "Métricas consolidadas de produtividade, dimensionamento e otimização de FTE de todas as iniciativas."
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[9px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full w-fit",
							children: "Base: 165h/Mês por FTE"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "bg-slate-50/60 border border-slate-100 rounded-lg p-3 text-center flex flex-col justify-center cursor-help",
								title: "Número de colaboradores reais cadastrados/alocados no quadro de pessoal do portfólio.",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[8.5px] font-bold text-slate-400 uppercase tracking-wider block mb-1",
										children: "HC Atual (Cadastrado)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[16px] font-black text-slate-800",
										children: totalFteAsIs.toFixed(0)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[9px] text-slate-500 mt-0.5",
										children: "colaboradores (HC)"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "bg-slate-50/60 border border-slate-100 rounded-lg p-3 text-center flex flex-col justify-center cursor-help",
								title: "Capacidade necessária em termos de pessoas para absorver o volume operacional mapeado. Calculado com base em 165h úteis por mês por colaborador.",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[8.5px] font-bold text-slate-400 uppercase tracking-wider block mb-1",
										children: "HC Necessário (Demanda)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-[16px] font-black text-blue-600",
										children: [
											portFteEquivalente.toFixed(1),
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[11px] font-bold text-blue-500",
												children: "HC"
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-[9px] text-slate-500 mt-0.5",
										children: [
											"(",
											portFteEquivalente.toFixed(2),
											" FTE complementar)"
										]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "bg-slate-50/60 border border-slate-100 rounded-lg p-3 text-center flex flex-col justify-center cursor-help",
								title: "Total de horas úteis de trabalho dedicadas mensalmente no cenário atual.",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[8.5px] font-bold text-slate-400 uppercase tracking-wider block mb-1",
										children: "Capacidade Mapeada"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-[16px] font-black text-slate-800",
										children: [portHorasMapeadas.toLocaleString("pt-BR", { maximumFractionDigits: 0 }), "h"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[9px] text-slate-500 mt-0.5",
										children: "esforço útil / mês"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "bg-slate-50/60 border border-slate-100 rounded-lg p-3 text-center flex flex-col justify-center cursor-help",
								title: "Percentual médio de ocupação da equipe em relação à jornada produtiva útil de 165 horas/mês.",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[8.5px] font-bold text-slate-400 uppercase tracking-wider block mb-1",
										children: "Ocupação Média"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-[16px] font-black text-[#0B2545]",
										children: [portOcupacaoMedia.toFixed(1), "%"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[9px] text-slate-500 mt-0.5",
										children: "de utilização útil"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "bg-slate-50/60 border border-slate-100 rounded-lg p-3 text-center flex flex-col justify-center cursor-help",
								title: "Volume de horas de esforço economizadas mensalmente no cenário TO-BE.",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[8.5px] font-bold text-slate-400 uppercase tracking-wider block mb-1",
										children: "Horas Economizadas"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-[16px] font-black text-emerald-600",
										children: [portHorasEconomizadas.toLocaleString("pt-BR", { maximumFractionDigits: 0 }), "h"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-[9px] text-emerald-600 font-bold mt-0.5",
										children: [
											"-",
											portHorasEconomizadasPerc.toFixed(1),
											"% de esforço"
										]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "bg-slate-50/60 border border-slate-100 rounded-lg p-3 text-center flex flex-col justify-center cursor-help",
								title: "Equivalente de headcount que é libertado e pode ser reaproveitado após as melhorias lean.",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[8.5px] font-bold text-slate-400 uppercase tracking-wider block mb-1",
										children: "HC Reaproveitado"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-[16px] font-black text-emerald-700",
										children: [
											portEconomiaFte.toFixed(1),
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[11px] font-bold text-emerald-600",
												children: "HC"
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-[9px] text-slate-500 mt-0.5",
										children: [
											"(",
											portEconomiaFte.toFixed(2),
											" FTE complementar)"
										]
									})
								]
							})
						]
					})]
				}),
				visionMode === "iniciativa" && selectedIniciativaId ? (() => {
					const totalHc = totalFteAsIs;
					const fteFuturo = Math.max(0, portFteEquivalente - portEconomiaFte);
					const ocupacao = portOcupacaoMedia;
					const ocupacaoFutura = totalHc > 0 ? fteFuturo / totalHc * 100 : 0;
					const fteSalvo = portEconomiaFte;
					const horasSalvas = portHorasEconomizadas;
					const ganhoEficiencia = portHorasMapeadas > 0 ? horasSalvas / portHorasMapeadas * 100 : 0;
					let statusCard = {
						bg: "bg-emerald-50 border-emerald-100 text-emerald-800",
						text: "Estável / Saudável",
						desc: "O processo está perfeitamente balanceado, com capacidade disponível para manter o fluxo de valor sem gargalos estruturais.",
						badge: "bg-emerald-100 text-emerald-800"
					};
					if (ocupacao > 110) statusCard = {
						bg: "bg-red-50 border-red-100 text-red-800",
						text: "CRÍTICO - Alta Sobrecarga",
						desc: `O processo opera severamente sobrecarregado, atingindo ${ocupacao.toFixed(1)}% da capacidade de jornada da equipe. Riscos sérios de atrasos crônicos, estouro de SLAs e fadiga operacional.`,
						badge: "bg-red-100 text-red-800"
					};
					else if (ocupacao > 90) statusCard = {
						bg: "bg-amber-50 border-amber-100 text-amber-800",
						text: "ALERTA - Limite Operacional",
						desc: `A operação está operando muito próxima do seu limite máximo de segurança (${ocupacao.toFixed(1)}%). Baixíssima tolerância para picos sazonais.`,
						badge: "bg-amber-100 text-amber-800"
					};
					let hcRecomendacao = "";
					let hcTomDeDecisao = "";
					if (fteFuturo > totalHc) {
						const hcDiff = Math.ceil(fteFuturo) - totalHc;
						hcRecomendacao = `⚠️ Aumentar Quadro Consolidado`;
						hcTomDeDecisao = `Mesmo após otimizar e aplicar as melhorias (TO BE), a demanda operacional agregada (${fteFuturo.toFixed(2)} FTE) ainda superará o headcount atual de ${totalHc} colaboradores. Sugere-se alocar mais ${hcDiff} HC(s) de forma estratégica.`;
					} else if (ocupacaoFutura > 100 && fteFuturo <= totalHc) {
						hcRecomendacao = `🔄 Balanceamento e Gestão de Fluxo`;
						hcTomDeDecisao = `As melhorias reduzem a sobrecarga agregada para ${ocupacaoFutura.toFixed(1)}%. Não é recomendada a expansão do quadro, mas sim a readequação de turnos e balanceamento de tarefas operacionais.`;
					} else {
						hcRecomendacao = `✅ Capacidade Otimizada com Sucesso`;
						hcTomDeDecisao = `Com o novo padrão otimizado (TO BE), a ocupação consolidada cairá para ${ocupacaoFutura.toFixed(1)}%, gerando um excedente de capacidade qualificada de ${fteSalvo.toFixed(2)} FTE (${horasSalvas.toLocaleString("pt-BR", { maximumFractionDigits: 0 })} horas/mês livres). Esta capacidade liberada pode ser direcionada para acelerar a expansão ou absorver novas demandas sem contratações.`;
					}
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-slate-50 border-b border-slate-100 px-4 py-3 flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[12px] font-black text-slate-800 uppercase tracking-tight",
								children: "🔍 Diagnóstico Lean e Balanço de Capacidade Consolidada (Kaizen)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[9px] font-black tracking-wider uppercase bg-blue-50 border border-blue-100 text-blue-700 px-2.5 py-0.5 rounded-full",
								children: "Visão de Iniciativa Mapeada"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-4 space-y-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-4 grid-cols-1 md:grid-cols-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: `p-3.5 rounded-lg border ${statusCard.bg} flex flex-col justify-between`,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between mb-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[10px] font-black uppercase tracking-wider",
												children: "Balanço de Carga do Processo"
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
												"• Carga atual de trabalho consome ",
												ocupacao.toFixed(1),
												"% das horas disponíveis da equipe"
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
												children: "Diretriz Lean de Redimensionamento"
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
												"• Potencial de liberação operacional:",
												" ",
												horasSalvas.toLocaleString("pt-BR", { maximumFractionDigits: 0 }),
												" ",
												"horas/mês (-",
												ganhoEficiencia.toFixed(1),
												"% de esforço geral)"
											]
										})
									]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "bg-slate-50 p-3 rounded-lg border border-slate-100 text-[11px] text-slate-600 leading-relaxed",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-extrabold text-slate-700 block mb-1",
									children: "📋 Diretrizes para Tomada de Decisão do Gestor:"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
									className: "list-disc pl-4 space-y-1 font-medium",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-bold text-slate-700",
												children: "Aproveitamento da Capacidade Salva:"
											}),
											" ",
											"A economia de",
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "font-bold text-slate-900",
												children: [fteSalvo.toFixed(2), " FTEs"]
											}),
											" ",
											"representa uma oportunidade única de realocar esforços para atividades focadas no crescimento da rede."
										] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-bold text-slate-700",
												children: "Foco em Gargalos Estratégicos:"
											}),
											" ",
											"Priorize melhorias nos processos com maior índice de ocupação atual e onde o Lead Time de ponta a ponta é mais crítico (como no Embandeiramento de Postos)."
										] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-bold text-slate-700",
												children: "Padronização da Qualidade (Kaizen):"
											}),
											" ",
											"Estabeleça um ciclo constante de auditorias pós-implementação para garantir que os ganhos de produtividade mapeados sejam sustentados ao longo do tempo."
										] })
									]
								})]
							})]
						})]
					});
				})() : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 border border-slate-200/60 rounded-xl bg-slate-50/50 p-6 text-center text-slate-500 shadow-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "mx-auto h-8 w-8 text-slate-400 mb-2" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
							className: "text-[13px] font-bold text-slate-700",
							children: "Diagnóstico Lean Kaizen de Capacidade"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-[11.5px] text-slate-500 mt-1 max-w-md mx-auto",
							children: [
								"Selecione uma ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Iniciativa Específica" }),
								" no filtro do topo da página para visualizar o diagnóstico e balanço de dimensionamento de capacidade detalhado do processo selecionado."
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-6 grid-cols-1 lg:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border bg-card p-5 shadow-vibra-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-[13.5px] font-bold text-slate-900",
								children: "Impacto no Lead Time do Processo (Horas Operacionais)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-[11px] text-muted-foreground mt-0.5",
								children: [
									"Comparativo direto de tempo total de ciclo antes (",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-slate-900 font-bold",
										children: "AS IS - Azul Marinho"
									}),
									") e projetado (",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-blue-600 font-bold",
										children: "TO BE - Azul Vibra"
									}),
									")."
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-[250px]",
							children: leadTimeData.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
								width: "100%",
								height: "100%",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
									data: leadTimeData,
									margin: { bottom: 20 },
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
											strokeDasharray: "3 3",
											stroke: "#f1f5f9"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
											dataKey: "name",
											angle: -15,
											textAnchor: "end",
											tick: {
												fontSize: 9,
												fill: "#64748b"
											},
											height: 40
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
											tick: {
												fontSize: 9,
												fill: "#64748b"
											},
											label: {
												value: "Horas",
												angle: -90,
												position: "insideLeft",
												style: { fontSize: 9 }
											}
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, { wrapperStyle: {
											fontSize: 10,
											paddingTop: 10
										} }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
											dataKey: "AS IS (Atual)",
											name: "AS IS (Atual)",
											fill: "#0B2545",
											radius: [
												4,
												4,
												0,
												0
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
											dataKey: "TO BE (Projetado)",
											name: "TO BE (Projetado)",
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
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex h-full items-center justify-center text-xs text-muted-foreground",
								children: "Nenhum dado de lead time disponível."
							})
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border bg-card p-5 shadow-vibra-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "text-[13.5px] font-bold text-slate-900",
										children: "Dimensionamento de Equipe e Sobrecarga (HC)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-[11px] text-muted-foreground mt-0.5",
										children: [
											"Comparativo do Headcount necessário entre o cenário operacional (",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-slate-900 font-bold",
												children: "AS IS - Azul Marinho"
											}),
											") e cenário otimizado (",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-blue-600 font-bold",
												children: "TO BE - Azul Vibra"
											}),
											")."
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-3 grid grid-cols-2 gap-2 bg-slate-50 border border-slate-100 rounded-lg p-2 shadow-inner",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-center border-r border-slate-200",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[9px] uppercase font-black text-slate-500 block leading-none",
												children: "Total HC AS IS"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-[13px] font-black text-[#0B2545]",
												children: [totalFteAsIs.toFixed(1), " HC"]
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-center",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[9px] uppercase font-black text-slate-500 block leading-none",
												children: "Total HC TO BE"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-[13px] font-black text-[#007BFF]",
												children: [totalFteToBe.toFixed(1), " HC"]
											})]
										})]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-[250px]",
								children: headcountData.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
									width: "100%",
									height: "100%",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
										data: headcountData,
										margin: { bottom: 20 },
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
												strokeDasharray: "3 3",
												stroke: "#f1f5f9"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
												dataKey: "name",
												angle: -15,
												textAnchor: "end",
												tick: {
													fontSize: 9,
													fill: "#64748b"
												},
												height: 40
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
												tick: {
													fontSize: 9,
													fill: "#64748b"
												},
												label: {
													value: "Headcount (HC)",
													angle: -90,
													position: "insideLeft",
													style: { fontSize: 9 }
												}
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, { wrapperStyle: {
												fontSize: 10,
												paddingTop: 10
											} }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
												dataKey: "Total HC AS IS",
												name: "Total HC AS IS",
												fill: "#0B2545",
												radius: [
													4,
													4,
													0,
													0
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
												dataKey: "Total HC TO BE",
												name: "Total HC TO BE",
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
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex h-full items-center justify-center text-xs text-muted-foreground",
									children: "Nenhum dado de headcount disponível."
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 pt-3 border-t border-slate-100 text-[10px] text-slate-500 leading-normal",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-bold text-slate-700",
									children: "Observação sobre FTE:"
								}), " Os indicadores de dimensionamento acima focam em Headcount (HC) real de equipe. O FTE (Full-Time Equivalent) é tratado como observação acessória, considerando a jornada padrão de 165 horas úteis mensais por colaborador."]
							})
						]
					})]
				}),
				isExpansaoSelected && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(JornadaEmbandeiramento, { selectedProjetoIds }),
				isExpansaoSelected && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 rounded-xl border border-[#268200]/20 bg-white p-6 shadow-vibra-sm animate-in fade-in duration-500",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-4 mb-5 gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
							className: "text-[15px] font-black text-slate-900 uppercase tracking-tight flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fuel, { className: "h-5 w-5 text-[#268200]" }), "Análise de Capacidade Nova Imagem dos Postos Petrobras"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11.5px] text-muted-foreground mt-0.5 font-medium",
							children: "Monitoramento da capacidade operacional de implantação, embandeiramento e renovação sob o novo fluxo lean."
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 bg-[#268200]/5 border border-[#268200]/10 px-3 py-1.5 rounded-lg",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-4 w-4 text-[#268200]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] font-black text-[#268200] uppercase tracking-wider",
								children: "Rede Petrobras Ativa"
							})]
						})]
					}), (() => {
						const petroData = petrobrasData || {};
						const postTotal = Number(petroData.postos_total || 8500);
						const postNovaImg = Number(petroData.postos_nova_imagem || 3200);
						Number(petroData.meta_postos_nova_imagem || 1200);
						Number(petroData.capacidade_nova_imagem_atual || 45);
						const tEmbInicial = Number(petroData.tempo_embandeiramento_inicial || 180);
						const tEmbEstimado = Number(petroData.tempo_embandeiramento_estimado || 105);
						const tEmbReal = Number(petroData.tempo_embandeiramento_real || 115);
						const capImpAtual = Number(petroData.capacidade_implantacao_atual || 8);
						const capImpEst = Number(petroData.capacidade_implantacao_estimada || 15);
						const capEmbAtual = Number(petroData.capacidade_embandeiramento_atual || 10);
						const capEmbEst = Number(petroData.capacidade_embandeiramento_estimada || 20);
						const capRenovAtual = Number(petroData.capacidade_renovacao_atual || 25);
						const capRenovEst = Number(petroData.capacidade_renovacao_estimada || 45);
						const capChartData = [
							{
								name: "Implantação",
								"Capacidade Atual (Postos/Mês)": capImpAtual,
								"Capacidade Estimada (Postos/Mês)": capImpEst
							},
							{
								name: "Embandeiramento",
								"Capacidade Atual (Postos/Mês)": capEmbAtual,
								"Capacidade Estimada (Postos/Mês)": capEmbEst
							},
							{
								name: "Renovação",
								"Capacidade Atual (Postos/Mês)": capRenovAtual,
								"Capacidade Estimada (Postos/Mês)": capRenovEst
							}
						];
						const postImageUrl = (projectImages.find((img) => img.legenda && img.legenda.toLowerCase().includes("posto")) || projectImages[0])?.url || "https://images.unsplash.com/photo-1527018601619-a508a2be00cd?auto=format&fit=crop&w=800&q=80";
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-6 grid-cols-1 lg:grid-cols-12 items-stretch",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "lg:col-span-7 bg-slate-50/50 border border-slate-100 rounded-xl p-4 flex flex-col justify-between",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mb-4",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[10px] font-black uppercase text-slate-400 tracking-wider block",
												children: "Visualização de Ganhos"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
												className: "text-[13.5px] font-bold text-slate-800",
												children: "Gráfico de Capacidades Operacionais: Atual vs. Estimada (Após Melhorias)"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-[11px] text-muted-foreground mt-0.5 font-medium",
												children: "Destaque direto para a eficiência de implantação, embandeiramento e renovação de postos por mês."
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-[260px] w-full",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
											width: "100%",
											height: "100%",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
												data: capChartData,
												margin: {
													bottom: 10,
													left: -10,
													right: 10,
													top: 10
												},
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
														strokeDasharray: "3 3",
														stroke: "#e2e8f0"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
														dataKey: "name",
														tick: {
															fontSize: 10,
															fill: "#475569",
															fontWeight: "bold"
														}
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, { tick: {
														fontSize: 10,
														fill: "#475569"
													} }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
														contentStyle: {
															backgroundColor: "#0f172a",
															borderRadius: "8px",
															border: "none"
														},
														itemStyle: {
															color: "#fff",
															fontSize: "11px"
														},
														labelStyle: {
															color: "#94a3b8",
															fontSize: "10px",
															fontWeight: "bold"
														}
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, { wrapperStyle: {
														fontSize: 10,
														fontWeight: "bold",
														paddingTop: 10
													} }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
														dataKey: "Capacidade Atual (Postos/Mês)",
														name: "Capacidade Atual",
														fill: "#94a3b8",
														radius: [
															4,
															4,
															0,
															0
														]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
														dataKey: "Capacidade Estimada (Postos/Mês)",
														name: "Capacidade Estimada (TO BE)",
														fill: "#268200",
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
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-4 bg-emerald-50 border border-emerald-100 p-3 rounded-lg text-[11px] text-emerald-800 leading-relaxed font-semibold",
										children: [
											"📈 ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Ganho Operacional Projetado:" }),
											" A capacidade de implantação simultânea aumentará em",
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [((capImpEst - capImpAtual) / capImpAtual * 100).toFixed(0), "%"] }),
											" ",
											"(de ",
											capImpAtual,
											" para ",
											capImpEst,
											" postos/mês), enquanto a capacidade de embandeiramento crescerá",
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [((capEmbEst - capEmbAtual) / capEmbAtual * 100).toFixed(0), "%"] }),
											" ",
											"sob o novo padrão de trabalho lean!"
										]
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "lg:col-span-5 flex flex-col gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative rounded-xl overflow-hidden border border-slate-200 shadow-sm aspect-video bg-slate-900 group",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: postImageUrl,
											alt: "Posto Petrobras Nova Imagem",
											className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-500",
											referrerPolicy: "no-referrer"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "absolute top-2.5 left-2.5 bg-black/75 backdrop-blur-sm text-[9px] font-black text-white px-2.5 py-1 rounded border border-white/15 uppercase tracking-wider",
											children: "📍 Imagem do Posto Anexa"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
											className: "absolute top-2.5 right-2.5 bg-black/75 hover:bg-[#268200] backdrop-blur-sm text-[9px] font-black text-white px-2.5 py-1 rounded border border-white/15 uppercase tracking-wider cursor-pointer flex items-center gap-1 transition-colors",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera, { className: "h-3 w-3 text-white" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Alterar Imagem" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													type: "file",
													accept: "image/*",
													className: "hidden",
													onChange: (e) => handleImageUpload(e, petroData)
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 pt-8",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-white text-[11px] font-bold",
												children: "Posto Petrobras - Padrão Nova Imagem"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-slate-300 text-[9.5px] mt-0.5",
												children: "Sincronizado automaticamente com o mural do projeto"
											})]
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "border border-slate-200 rounded-xl p-4 space-y-3.5 bg-slate-50/30",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[9.5px] font-black text-slate-400 uppercase tracking-wider block border-b border-slate-100 pb-1",
											children: "📊 Estatísticas da Rede e Ciclo de Embandeiramento"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "grid grid-cols-2 gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "bg-white border border-slate-150 p-2.5 rounded-lg shadow-sm",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-[8px] font-black text-slate-400 uppercase block leading-none",
													children: "Total de Postos"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-[14px] font-black text-slate-800 mt-1 block",
													children: postTotal.toLocaleString("pt-BR")
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "bg-white border border-slate-150 p-2.5 rounded-lg shadow-sm",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-[8px] font-black text-[#268200] uppercase block leading-none",
													children: "Nova Imagem"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "text-[14px] font-black text-emerald-700 mt-1 block",
													children: [
														postNovaImg.toLocaleString("pt-BR"),
														" ",
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
															className: "text-[9px] font-bold text-slate-400",
															children: [
																"(",
																(postNovaImg / postTotal * 100).toFixed(1),
																"%)"
															]
														})
													]
												})]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1.5 bg-white border border-slate-150 p-3 rounded-lg shadow-sm",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-[8.5px] font-black text-slate-400 uppercase block",
													children: "Ciclo de Embandeiramento (Tempo de Ativação)"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex justify-between text-[10px] font-bold mt-1.5",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-slate-500",
														children: "AS IS (Inicial)"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "text-slate-700",
														children: [tEmbInicial, " dias"]
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "h-1.5 w-full bg-slate-100 rounded-full overflow-hidden",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "h-full bg-slate-400 rounded-full",
														style: { width: "100%" }
													})
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex justify-between text-[10px] font-bold",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-blue-600",
														children: "Planejado (TO BE)"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "text-blue-700",
														children: [
															tEmbEstimado,
															" dias (-",
															((tEmbInicial - tEmbEstimado) / tEmbInicial * 100).toFixed(0),
															"%)"
														]
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "h-1.5 w-full bg-slate-100 rounded-full overflow-hidden",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "h-full bg-blue-500 rounded-full",
														style: { width: `${tEmbEstimado / tEmbInicial * 100}%` }
													})
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex justify-between text-[10px] font-bold",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-emerald-600",
														children: "Prática Atual (Real)"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "text-emerald-700",
														children: [tEmbReal, " dias"]
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "h-1.5 w-full bg-slate-100 rounded-full overflow-hidden",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "h-full bg-emerald-500 rounded-full",
														style: { width: `${tEmbReal / tEmbInicial * 100}%` }
													})
												})
											]
										})
									]
								})]
							})]
						});
					})()]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-6 rounded-xl border border-slate-200/80 bg-white p-4.5 shadow-vibra-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-4 border-b border-slate-100 pb-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "inline-flex items-center rounded-full bg-amber-100 px-2 py-0.5 text-[9px] font-black text-amber-800 uppercase tracking-wider border border-amber-200/50",
										children: "Análise de Pareto (20/80)"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-[9px] font-black text-slate-800 uppercase tracking-wider border border-slate-200/50",
										children: "Foco Estratégico Dinâmico"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
									className: "text-[14.5px] font-extrabold text-[#0B2545] uppercase tracking-tight mt-1 flex items-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, { className: "h-4.5 w-4.5 text-amber-500" }), "Priorização das Iniciativas – Princípio de Pareto (20/80)"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-[11px] text-slate-500 mt-0.5 leading-relaxed font-semibold",
									children: [
										"Identificação automatizada do ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Foco Estratégico" }),
										" (Top 20% das iniciativas) para sequenciamento ideal das próximas ondas de execução."
									]
								})
							] })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-3 grid-cols-1 md:grid-cols-3 mt-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "p-2.5 bg-gradient-to-r from-amber-500/5 to-transparent border border-amber-100 rounded-lg",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[8.5px] uppercase font-black text-amber-600 block tracking-wider",
										children: "Foco Estratégico (Top 20%)"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-baseline gap-1.5 mt-0.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[18px] font-black text-amber-850",
											children: paretoAnalysis.blocks[0]?.quantity || 0
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-[10px] font-bold text-slate-500",
											children: [paretoAnalysis.blocks[0]?.percentage.toFixed(0), "% do portfólio"]
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "p-2.5 bg-gradient-to-r from-blue-500/5 to-transparent border border-blue-100 rounded-lg",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[8.5px] uppercase font-black text-blue-600 block tracking-wider",
										children: "Saving Estimado do Top 20%"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex items-baseline gap-1.5 mt-0.5",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[18px] font-black text-blue-800",
											children: (paretoAnalysis.blocks[0]?.totalSaving || 0).toLocaleString("pt-BR", {
												style: "currency",
												currency: "BRL",
												maximumFractionDigits: 0
											})
										})
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "p-2.5 bg-gradient-to-r from-emerald-500/5 to-transparent border border-emerald-100 rounded-lg",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[8.5px] uppercase font-black text-emerald-600 block tracking-wider",
										children: "HC Impactado no Top 20%"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-baseline gap-1.5 mt-0.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[18px] font-black text-emerald-800",
											children: paretoAnalysis.blocks[0]?.totalPessoas || 0
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] font-bold text-slate-500",
											children: "colaboradores"
										})]
									})]
								})
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 grid-cols-1 lg:grid-cols-12",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "lg:col-span-7 flex flex-col justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "text-[12px] font-bold text-slate-800 uppercase tracking-tight mb-0.5",
								children: "Curva Acumulada de Prioridade do Portfólio"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10.5px] text-slate-500 leading-normal font-semibold",
								children: "Iniciativas ordenadas decrescentemente por prioridade. A linha azul indica a soma acumulada de impacto."
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-[230px] w-full border border-slate-100 rounded-xl bg-slate-50/30 p-1.5 mt-2 flex items-center justify-center",
								children: paretoChartData.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
									width: "100%",
									height: "100%",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ComposedChart, {
										data: paretoChartData,
										margin: {
											top: 20,
											right: 30,
											left: 10,
											bottom: 20
										},
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
												strokeDasharray: "3 3",
												stroke: "#f1f5f9"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
												dataKey: "code",
												tick: {
													fontSize: 10,
													fontWeight: 600,
													fill: "#475569"
												}
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
												yAxisId: "left",
												tick: {
													fontSize: 10,
													fontWeight: 500,
													fill: "#0f172a"
												},
												label: {
													value: "Score de Prioridade",
													angle: -90,
													position: "insideLeft",
													style: {
														fontSize: 9,
														fontWeight: 700,
														fill: "#475569"
													}
												}
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
												yAxisId: "right",
												orientation: "right",
												tick: {
													fontSize: 10,
													fontWeight: 500,
													fill: "#0284c7"
												},
												label: {
													value: "Soma Acumulada (%)",
													angle: 90,
													position: "insideRight",
													style: {
														fontSize: 9,
														fontWeight: 700,
														fill: "#0284c7"
													}
												}
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { content: ({ active, payload }) => {
												if (active && payload && payload.length) {
													const data = payload[0].payload;
													return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "rounded-lg border border-slate-200 bg-white p-3 shadow-lg max-w-[240px] z-50",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "text-[10px] font-bold text-slate-400 block uppercase tracking-tight",
																children: data.code
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "text-[11.5px] font-black text-slate-800 leading-tight block mt-0.5 line-clamp-2",
																children: data.name
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																className: "mt-2 pt-1.5 border-t border-slate-100 space-y-1",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																	className: "flex items-center justify-between text-xs font-semibold",
																	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																		className: "text-slate-500",
																		children: "Score Prioridade:"
																	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
																		className: "text-slate-900",
																		children: [data.score.toFixed(1), " pts"]
																	})]
																}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																	className: "flex items-center justify-between text-xs font-semibold",
																	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																		className: "text-slate-500",
																		children: "Soma Acumulada:"
																	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
																		className: "text-sky-700",
																		children: [data.cumulativePct, "%"]
																	})]
																})]
															})
														]
													});
												}
												return null;
											} }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
												yAxisId: "left",
												dataKey: "score",
												name: "Score de Prioridade",
												fill: "#002855",
												radius: [
													4,
													4,
													0,
													0
												],
												barSize: 20
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
												yAxisId: "right",
												type: "monotone",
												dataKey: "cumulativePct",
												name: "Curva de Pareto (%)",
												stroke: "#0284c7",
												strokeWidth: 3,
												dot: {
													r: 4,
													strokeWidth: 1
												},
												activeDot: { r: 6 }
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReferenceLine, {
												yAxisId: "right",
												y: 80,
												stroke: "#ef4444",
												strokeDasharray: "4 4",
												strokeWidth: 1.5,
												label: {
													value: "80%",
													position: "top",
													style: {
														fontSize: 8,
														fontWeight: 800,
														fill: "#ef4444"
													}
												}
											})
										]
									})
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs text-slate-400 font-semibold",
									children: "Nenhuma iniciativa cadastrada para o gráfico."
								})
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "lg:col-span-5 flex flex-col justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "text-[12.5px] font-bold text-slate-800 uppercase tracking-tight mb-3",
								children: "Classificação em Quintis (Tiers de Prioridade)"
							}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "space-y-3 flex-1",
								children: paretoAnalysis.blocks.map((block, idx) => {
									const Icon = block.icon;
									const isExpanded = expandedBlock === idx;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: `rounded-xl transition duration-300 border ${isExpanded ? "border-slate-300 shadow-md bg-white" : "border-slate-200/60 bg-slate-50/50 hover:bg-slate-100/50 cursor-pointer shadow-vibra-sm"}`,
										onClick: () => {
											if (!isExpanded) setExpandedBlock(idx);
											else setExpandedBlock(null);
										},
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "p-4 flex items-center justify-between select-none",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-3",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: `p-2 rounded-lg text-white ${block.indicatorBg}`,
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4" })
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
													className: "text-[13px] font-black text-slate-800 tracking-tight uppercase",
													children: block.title
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
													className: "text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-0.5",
													children: [
														block.quantity,
														" ",
														block.quantity === 1 ? "iniciativa" : "iniciativas",
														" •",
														" ",
														block.percentage.toFixed(0),
														"% do portfólio"
													]
												})] })]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-3",
												children: [block.totalSaving > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "hidden sm:inline-block text-[11px] font-black bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-md border border-emerald-100",
													children: block.totalSaving.toLocaleString("pt-BR", {
														style: "currency",
														currency: "BRL",
														maximumFractionDigits: 0
													})
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-slate-400",
													children: isExpanded ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-4 w-4 rotate-90 transition-transform duration-200" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-4 w-4 transition-transform duration-200" })
												})]
											})]
										}), isExpanded && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "px-4 pb-4 border-t border-slate-100 pt-3.5 space-y-3 animate-in fade-in duration-200",
											onClick: (e) => e.stopPropagation(),
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "space-y-1.5",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-[9px] uppercase font-black tracking-wider text-slate-400 block font-semibold",
														children: "Justificativa da Classificação"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "text-[11.5px] text-slate-600 leading-relaxed font-semibold",
														children: block.justification
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "space-y-1.5",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-[9px] uppercase font-black tracking-wider text-slate-400 block font-semibold",
														children: "Recomendação Executiva"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "text-[11.5px] text-slate-700 leading-relaxed font-bold",
														children: block.recommendation
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "pt-2",
													children: block.id === "foco_estrategico" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "space-y-2",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-[9.5px] uppercase font-black text-amber-700 bg-amber-50 border border-amber-100 px-2.5 py-1 rounded-md tracking-wider inline-block",
															children: "🎯 Destaques do Foco Estratégico (Top 20%)"
														}), block.initiatives.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
															className: "space-y-2 mt-1.5 max-h-[220px] overflow-y-auto pr-1",
															children: block.initiatives.map((ini) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																className: "p-3 rounded-lg border border-amber-100 bg-gradient-to-r from-amber-500/5 to-transparent flex items-center justify-between gap-4",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																	className: "space-y-0.5 min-w-0",
																	children: [
																		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																			className: "text-[10px] font-bold text-slate-400 uppercase tracking-tight block",
																			children: ini.codigo || "INI-—"
																		}),
																		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																			className: "text-[12px] font-black text-slate-800 leading-snug block line-clamp-1",
																			children: ini.titulo
																		}),
																		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																			className: "flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[10px] font-bold text-slate-500 mt-1",
																			children: [
																				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
																					className: "flex items-center gap-1",
																					children: [
																						"📊 Impacto:",
																						" ",
																						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
																							className: "text-slate-700",
																							children: [ini.impacto_negocio ?? 3, "/5"]
																						})
																					]
																				}),
																				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1 w-1 rounded-full bg-slate-300" }),
																				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
																					className: "flex items-center gap-1",
																					children: [
																						"⚙️ Complexidade:",
																						" ",
																						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
																							className: "text-slate-700",
																							children: ini.complexidade ?? "Média"
																						})
																					]
																				}),
																				Number(ini.ganho_financeiro || ini.saving_previsto || 0) > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1 w-1 rounded-full bg-slate-300" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
																					className: "text-emerald-600 font-bold",
																					children: [
																						"💰 Saving:",
																						" ",
																						Number(ini.ganho_financeiro || ini.saving_previsto || 0).toLocaleString("pt-BR", {
																							style: "currency",
																							currency: "BRL",
																							maximumFractionDigits: 0
																						})
																					]
																				})] })
																			]
																		})
																	]
																}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																	className: "shrink-0 text-right",
																	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																		className: "text-[14px] font-black text-amber-600 block",
																		children: ini.priorityScore.toFixed(1)
																	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																		className: "text-[8px] font-bold uppercase tracking-wider text-amber-500",
																		children: "Score Prioridade"
																	})]
																})]
															}, ini.id))
														}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
															className: "text-[11px] text-muted-foreground italic mt-1 font-semibold",
															children: "Nenhuma iniciativa neste bloco."
														})]
													}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "space-y-2",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-[9.5px] uppercase font-black text-slate-600 bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-md tracking-wider inline-block",
															children: "📌 Alinhamento de Priorização"
														}), block.initiatives.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
															className: "space-y-2 mt-1.5 max-h-[220px] overflow-y-auto pr-1",
															children: block.initiatives.map((ini, idx) => {
																const isTop = idx === 0;
																return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																	className: `p-2.5 rounded-lg border transition ${isTop ? "border-slate-300 bg-gradient-to-r from-slate-100 to-transparent shadow-sm" : "border-slate-100/80 bg-slate-50/30"}`,
																	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																		className: "flex items-center justify-between gap-3",
																		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																			className: "space-y-0.5 min-w-0",
																			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																				className: "flex items-center gap-2",
																				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																					className: "text-[10px] font-bold text-slate-400 uppercase tracking-tight",
																					children: ini.codigo || "INI-—"
																				}), isTop && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																					className: "inline-flex items-center rounded-full bg-slate-200 px-2 py-0.5 text-[8.5px] font-black text-slate-800 uppercase tracking-wider",
																					children: "Próxima Sequência Natural"
																				})]
																			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																				className: "text-[11.5px] font-black text-slate-700 leading-snug block line-clamp-1",
																				children: ini.titulo
																			})]
																		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																			className: "shrink-0 text-right",
																			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																				className: "text-[12.5px] font-black text-slate-700 block",
																				children: ini.priorityScore.toFixed(1)
																			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																				className: "text-[7.5px] font-bold uppercase tracking-wider text-slate-500 block font-semibold",
																				children: "Score"
																			})]
																		})]
																	}), isTop && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
																		className: "text-[10px] text-slate-500 font-semibold leading-relaxed mt-1.5 border-t border-slate-200/60 pt-1.5",
																		children: [
																			"Esta iniciativa possui o maior score de prioridade deste grupo (",
																			ini.priorityScore.toFixed(1),
																			" pts), representando o próximo passo lógico para execução na evolução do portfólio."
																		]
																	})]
																}, ini.id);
															})
														}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
															className: "text-[11px] text-muted-foreground italic mt-1 font-semibold",
															children: "Nenhuma iniciativa neste bloco."
														})]
													})
												})
											]
										})]
									}, block.id);
								})
							})]
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-6 grid-cols-1 lg:grid-cols-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl border border-border bg-card p-5 shadow-vibra-sm flex flex-col justify-between",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-[13.5px] font-bold text-slate-900",
									children: "Eficiência e Economia de Horas (%)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] text-muted-foreground mt-0.5 font-medium",
									children: "Percentual geral consolidado de redução operacional no processo."
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "h-[180px] w-full flex items-center justify-center relative my-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
										width: "100%",
										height: "100%",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PieChart, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Pie, {
											data: [{
												name: "Economia de Horas",
												value: Number(pctReducaoLeadTimeMensal.toFixed(1)),
												fill: "#007BFF"
											}, {
												name: "Tempo Restante",
												value: Number((100 - pctReducaoLeadTimeMensal).toFixed(1)),
												fill: "#E2E8F0"
											}],
											cx: "50%",
											cy: "50%",
											innerRadius: 55,
											outerRadius: 75,
											paddingAngle: 5,
											dataKey: "value",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: "#007BFF" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: "#E2E8F0" })]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {})] })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "absolute inset-0 flex flex-col items-center justify-center pointer-events-none",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-[26px] font-black text-slate-800 leading-none",
											children: [pctReducaoLeadTimeMensal.toFixed(1), "%"]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[9px] uppercase tracking-wider font-extrabold text-muted-foreground mt-1",
											children: "Eficiência"
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-2 space-y-1.5 text-[11px] border-t border-slate-100 pt-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between text-slate-700",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "flex items-center gap-1.5 font-medium",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2.5 w-2.5 rounded-full bg-blue-600" }), "Tempo Economizado:"]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "font-black text-blue-700",
											children: [Math.max(0, Math.round((totalLeadTimeAsIs - totalLeadTimeToBe) / 60)), " h"]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between text-slate-700",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "flex items-center gap-1.5 font-medium",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2.5 w-2.5 rounded-full bg-slate-300" }), "Tempo Operacional TO BE:"]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "font-bold text-slate-600",
											children: [Math.round(totalLeadTimeToBe / 60), " h"]
										})]
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl border border-border bg-card p-5 shadow-vibra-sm col-span-1 flex flex-col justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-[13.5px] font-bold text-slate-900",
								children: "Ganhos Financeiros por Iniciativa"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] text-muted-foreground mt-0.5",
								children: "Detalhamento de saving previsto / retorno anual consolidado por iniciativa (padrão de cor Vibra)."
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-[220px] w-full mt-3",
								children: financialGainsByInitiative.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
									width: "100%",
									height: "100%",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
										data: financialGainsByInitiative,
										margin: { bottom: 15 },
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
												strokeDasharray: "3 3",
												stroke: "#f1f5f9"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
												dataKey: "name",
												tick: {
													fontSize: 9,
													fill: "#64748b"
												}
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
												tick: {
													fontSize: 9,
													fill: "#64748b"
												},
												formatter: (v) => `R$ ${v >= 1e3 ? (v / 1e3).toFixed(0) + "k" : v}`
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { formatter: (value) => value.toLocaleString("pt-BR", {
												style: "currency",
												currency: "BRL",
												minimumFractionDigits: 2,
												maximumFractionDigits: 2
											}) }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
												dataKey: "gain",
												name: "Retorno",
												radius: [
													4,
													4,
													0,
													0
												],
												children: financialGainsByInitiative.map((entry, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: entry.fill }, `cell-${index}`))
											})
										]
									})
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex h-full items-center justify-center text-xs text-muted-foreground",
									children: "Nenhuma iniciativa com ganho financeiro cadastrada."
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl border border-border bg-card p-5 shadow-vibra-sm flex flex-col justify-between",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-[13.5px] font-bold text-slate-900",
									children: "Dependência de TI"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] text-muted-foreground mt-0.5",
									children: "Volume e percentual de iniciativas que demandam atuação direta da equipe de TI."
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "h-[180px] w-full flex items-center justify-center relative my-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
										width: "100%",
										height: "100%",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PieChart, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pie, {
											data: tiDependencyData,
											cx: "50%",
											cy: "50%",
											innerRadius: 50,
											outerRadius: 70,
											paddingAngle: 5,
											dataKey: "value",
											children: tiDependencyData.map((entry, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: entry.fill }, `cell-${index}`))
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {})] })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "absolute inset-0 flex flex-col items-center justify-center pointer-events-none",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[20px] font-black text-slate-800 leading-none",
											children: tiDependencyData.find((d) => d.name === "Com Dependência de TI")?.value || 0
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[9px] uppercase tracking-wider font-extrabold text-red-600 mt-0.5",
											children: "Com TI"
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-[11px] border-t border-slate-100 pt-3 flex justify-around text-slate-700 font-medium",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-center gap-1.5",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2.5 w-2.5 rounded-full bg-red-500" }),
											" TI:",
											" ",
											tiDependencyData[0].value
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-center gap-1.5",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2.5 w-2.5 rounded-full bg-emerald-500" }),
											" Sem TI:",
											" ",
											tiDependencyData[1].value
										]
									})]
								})
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-6 grid-cols-1 lg:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border bg-card p-5 shadow-vibra-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-[13.5px] font-bold text-slate-900",
							children: "Tipos de Melhoria Utilizada"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] text-muted-foreground mt-0.5",
							children: "Volume de iniciativas por tipo de alavanca/melhoria operacional (padrão de cor Vibra)."
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-[220px] w-full mt-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
								width: "100%",
								height: "100%",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
									data: improvementTypesChartData,
									layout: "vertical",
									margin: {
										left: 25,
										right: 10
									},
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
											strokeDasharray: "3 3",
											stroke: "#f1f5f9"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
											type: "number",
											tick: {
												fontSize: 9,
												fill: "#64748b"
											}
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
											dataKey: "name",
											type: "category",
											tick: {
												fontSize: 9,
												fill: "#64748b"
											},
											width: 120
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
											dataKey: "quantidade",
											name: "Iniciativas",
											radius: [
												0,
												4,
												4,
												0
											],
											children: improvementTypesChartData.map((entry, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: entry.fill }, `cell-${index}`))
										})
									]
								})
							})
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border bg-card p-5 shadow-vibra-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-[13.5px] font-bold text-slate-900",
							children: "Mapeamento de Stakeholders"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] text-muted-foreground mt-0.5",
							children: "Lista de stakeholders estratégicos com metas definidas de desempenho (Meta Mereo)."
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-[220px] overflow-y-auto mt-4 space-y-2 pr-1 scrollbar-thin",
							children: stakeholdersWithMeta.length > 0 ? stakeholdersWithMeta.map((s, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between p-3 rounded-lg border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-all",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[12px] font-extrabold text-slate-800 truncate",
										children: getMemberName(s)
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-[10px] text-slate-500 font-medium mt-0.5",
										children: [
											s.diretoria || "Sem Diretoria",
											" • ",
											s.area || "Sem Área",
											" •",
											" ",
											getMemberPapel(s)
										]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "shrink-0 pl-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "inline-flex items-center gap-1 rounded-md bg-vibra-50 border border-vibra-100 px-2.5 py-1 text-[11px] font-bold text-vibra-700 shadow-sm",
										children: ["🎯 ", s.extras?.meta_mereo]
									})
								})]
							}, s.id ? `stakeholder-${s.id}-${idx}` : `stakeholder-idx-${idx}`)) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex h-full flex-col items-center justify-center text-xs text-muted-foreground text-center italic p-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Nenhum stakeholder cadastrado com Meta Mereo preenchida no momento." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] mt-1 not-italic text-slate-400",
									children: "Insira as metas na aba \"Stakeholders\" do projeto."
								})]
							})
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "w-full",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border bg-card p-5 shadow-vibra-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-[14px] font-extrabold text-slate-900 uppercase tracking-tight",
								children: "Matriz de Priorização Estratégica (Impacto × Esforço)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11.5px] text-muted-foreground mt-0.5",
								children: "Posicionamento dinâmico das iniciativas no portfólio. Passe o mouse sobre cada ponto para visualizar o detalhamento completo."
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative h-[340px] w-full border border-slate-200/80 rounded-xl overflow-hidden bg-slate-50/20",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "absolute inset-0 grid grid-cols-2 grid-rows-2 pointer-events-none",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "border-r border-b border-dashed border-slate-200 bg-emerald-50/30 p-3 flex flex-col justify-start items-start",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "rounded-full bg-emerald-500/10 px-2 py-0.5 text-[8.5px] font-extrabold text-emerald-800 border border-emerald-500/20 uppercase tracking-wider",
											children: "Q1 — Quick Wins"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[9px] text-emerald-600 mt-1 font-medium leading-none",
											children: "Alto Impacto & Baixo Esforço (Prioridade 1)"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "border-b border-dashed border-slate-200 bg-blue-50/20 p-3 flex flex-col justify-start items-end",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "rounded-full bg-blue-500/10 px-2 py-0.5 text-[8.5px] font-extrabold text-blue-800 border border-blue-500/20 uppercase tracking-wider",
											children: "Q2 — Projetos Estratégicos"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[9px] text-blue-600 mt-1 font-medium leading-none",
											children: "Alto Impacto & Alto Esforço"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "border-r border-dashed border-slate-200 bg-amber-50/20 p-3 flex flex-col justify-end items-start",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[9px] text-amber-600 mb-1 font-medium leading-none",
											children: "Foco em Simplificação Contínua"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "rounded-full bg-amber-500/10 px-2 py-0.5 text-[8.5px] font-extrabold text-amber-800 border border-amber-500/20 uppercase tracking-wider",
											children: "Q3 — Baixa Prioridade"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "bg-rose-50/25 p-3 flex flex-col justify-end items-end",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[9px] text-rose-600 mb-1 font-medium leading-none font-bold",
											children: "Avaliar Viabilidade Técnica / Financeira"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "rounded-full bg-rose-500/10 px-2 py-0.5 text-[8.5px] font-extrabold text-rose-800 border border-rose-500/20 uppercase tracking-wider",
											children: "Q4 — Descartáveis / Custo Alto"
										})]
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute inset-0",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
									width: "100%",
									height: "100%",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ScatterChart, {
										margin: {
											top: 20,
											right: 30,
											left: 0,
											bottom: 20
										},
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
												strokeDasharray: "3 3",
												stroke: "#e2e8f0",
												strokeOpacity: .4
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
												type: "number",
												dataKey: "x",
												name: "Esforço",
												domain: [0, 10],
												tick: {
													fontSize: 9,
													fill: "#475569"
												},
												label: {
													value: "Esforço (Baixo → Alto)",
													position: "insideBottom",
													offset: -10,
													fontSize: 10,
													fontWeight: "bold",
													fill: "#475569"
												}
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
												type: "number",
												dataKey: "y",
												name: "Impacto",
												domain: [0, 16],
												tick: {
													fontSize: 9,
													fill: "#475569"
												},
												label: {
													value: "Impacto (Baixo → Alto)",
													angle: -90,
													position: "insideLeft",
													offset: 10,
													fontSize: 10,
													fontWeight: "bold",
													fill: "#475569"
												}
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZAxis, {
												type: "number",
												dataKey: "z",
												range: [80, 500],
												name: "Saving"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
												content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CustomScatterTooltip, {}),
												cursor: { strokeDasharray: "3 3" }
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReferenceLine, {
												x: 5,
												stroke: "#cbd5e1",
												strokeWidth: 1.5
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReferenceLine, {
												y: 8,
												stroke: "#cbd5e1",
												strokeWidth: 1.5
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scatter, {
												data: priorizationData,
												fill: VIBRA.green,
												shape: "circle",
												children: priorizationData.map((entry, index) => {
													return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, {
														fill: entry.x <= 5 && entry.y >= 8 ? VIBRA.green : entry.x > 5 && entry.y >= 8 ? VIBRA.blue : entry.x > 5 ? "#ef4444" : "#f59e0b",
														className: "cursor-pointer drop-shadow"
													}, `cell-${index}`);
												})
											})
										]
									})
								})
							})]
						})]
					})
				})
			] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProjectOverview360, {
				selectedProjetoIds,
				iniciativas,
				macros
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-border bg-card overflow-hidden shadow-vibra-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-4 border-b border-border bg-slate-50/60",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-[13.5px] font-bold text-vibra-900",
						children: "Ranking Executivo Consolidado de Iniciativas"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] text-muted-foreground",
						children: "Análise consolidada de prioridade, andamento, ROI e ganho financeiro de todo o portfólio."
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full text-[11.5px] text-left",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
							className: "bg-muted text-muted-foreground font-bold uppercase text-[9.5px] tracking-wider border-b border-border",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3",
									children: "Código & Título"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3",
									children: "Diretoria / Gerência"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3",
									children: "Gestor Responsável"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3",
									children: "Analista Responsável"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3",
									children: "Status"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3 text-right",
									children: "Avanço %"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3 text-right",
									children: "As Is (dias)"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3 text-right",
									children: "To Be (dias)"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3 text-right",
									children: "% de Automação / IA"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3 text-right",
									children: "% Redução Lead Time"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3 text-right",
									children: "% Redução Acumulada"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3 text-right",
									children: "Complexidade"
								})
							] })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
							className: "divide-y divide-border bg-white",
							children: iniciativasCalculadas.slice(0, 8).map((ini, idx) => {
								const asIsDias = ini.asIsDias ?? 0;
								const toBeDias = ini.toBeDias ?? 0;
								const pctAuto = ini.pctAuto ?? 0;
								const redLeadTime = asIsDias > 0 ? (asIsDias - toBeDias) / asIsDias * 100 : 45;
								const redLeadTimeAcum = redLeadTime * 1.12 > 100 ? 95 : redLeadTime * 1.12;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "hover:bg-slate-50/80 transition",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-3 font-bold text-vibra-950",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-1.5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "inline-block h-2 w-2 rounded-full",
													style: { backgroundColor: VIBRA_SERIES[idx % VIBRA_SERIES.length] }
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: ini.codigo || `INI-0${idx + 1}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-[10px] text-muted-foreground truncate max-w-[180px]",
													children: ini.titulo
												})] })]
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
											className: "px-4 py-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "font-medium text-slate-800",
												children: ini.diretoria ?? "Corporativo"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-[10px] text-muted-foreground truncate max-w-[120px]",
												children: ini.gerencia ?? "—"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-3 text-slate-600 font-semibold truncate max-w-[120px]",
											children: ini.gestor_responsavel || "—"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-3 text-slate-600 font-medium truncate max-w-[120px]",
											children: ini.analista_responsavel || ini.responsavel || "—"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-3",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: `inline-block rounded-full px-2 py-0.5 text-[9.5px] font-bold ${/concl/i.test(ini.status ?? "") ? "bg-emerald-50 text-emerald-700" : /andamento|sprint|dev/i.test(ini.status ?? "") ? "bg-blue-50 text-blue-700" : "bg-slate-100 text-slate-700"}`,
												children: ini.status ?? "Nova"
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
											className: "px-4 py-3 text-right font-bold text-vibra-800",
											children: [Math.round(Number(ini.percentual_avanco ?? 0)), "%"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-3 text-right",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "inline-flex items-center justify-end gap-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													type: "text",
													value: localAsIs[ini.id] !== void 0 ? localAsIs[ini.id] : asIsDias.toFixed(1),
													onChange: (e) => setLocalAsIs((prev) => ({
														...prev,
														[ini.id]: e.target.value
													})),
													onBlur: (e) => saveAsIs(ini.id, e.target.value),
													onKeyDown: (e) => {
														if (e.key === "Enter") e.currentTarget.blur();
													},
													className: "w-14 rounded border border-slate-200 bg-white px-1.5 py-0.5 text-right font-bold text-slate-700 shadow-sm focus:border-vibra-500 focus:outline-none hover:border-slate-300 transition"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-slate-400 font-medium text-[10px]",
													children: "d"
												})]
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-3 text-right",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "inline-flex items-center justify-end gap-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													type: "text",
													value: localToBe[ini.id] !== void 0 ? localToBe[ini.id] : toBeDias.toFixed(1),
													onChange: (e) => setLocalToBe((prev) => ({
														...prev,
														[ini.id]: e.target.value
													})),
													onBlur: (e) => saveToBe(ini.id, e.target.value),
													onKeyDown: (e) => {
														if (e.key === "Enter") e.currentTarget.blur();
													},
													className: "w-14 rounded border border-slate-200 bg-white px-1.5 py-0.5 text-right font-bold text-slate-700 shadow-sm focus:border-vibra-500 focus:outline-none hover:border-slate-300 transition"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-slate-400 font-medium text-[10px]",
													children: "d"
												})]
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-3",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center justify-end gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "font-extrabold text-teal-700 text-right min-w-[28px]",
													children: [pctAuto.toFixed(0), "%"]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "w-16 bg-slate-100 rounded-full h-1.5 border border-slate-200/50 overflow-hidden shrink-0",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "bg-teal-600 h-full rounded-full transition-all duration-500",
														style: { width: `${pctAuto}%` }
													})
												})]
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
											className: "px-4 py-3 text-right font-extrabold text-blue-700",
											children: [redLeadTime.toFixed(1), "%"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
											className: "px-4 py-3 text-right font-extrabold text-indigo-700",
											children: [redLeadTimeAcum.toFixed(1), "%"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-3 text-right font-medium text-slate-600",
											children: ini.complexidade ?? "Média"
										})
									]
								}, ini.id || idx);
							})
						})]
					})
				})]
			})
		]
	});
}
function TeamDashboard({ selectedProjetoIds, iniciativas, macros }) {
	const [searchTerm, setSearchTerm] = (0, import_react.useState)("");
	const [filterDirectorate, setFilterDirectorate] = (0, import_react.useState)("");
	const [filterRole, setFilterRole] = (0, import_react.useState)("");
	const [sortField, setSortField] = (0, import_react.useState)("dedicacao");
	const [sortAsc, setSortAsc] = (0, import_react.useState)(false);
	const { data: rawEquipe = [] } = useQuery({
		queryKey: ["team-dashboard-equipe"],
		queryFn: async () => (await supabase.from("equipe").select("*").eq("ativo", true)).data ?? []
	});
	const { data: profiles = [] } = useQuery({
		queryKey: ["team-profiles"],
		queryFn: async () => (await supabase.from("profiles").select("id,nome,email,cargo")).data ?? []
	});
	const profileMap = (0, import_react.useMemo)(() => new Map(profiles.map((p) => [p.id, p])), [profiles]);
	const projectMap = (0, import_react.useMemo)(() => new Map(macros.map((p) => [p.id, p.nome])), [macros]);
	const teamData = (0, import_react.useMemo)(() => {
		return rawEquipe.map((member) => {
			const prof = profileMap.get(member.profile_id);
			const projName = projectMap.get(member.projeto_id) ?? "Frente Administrativa";
			const rawName = member.papel_macroprocesso ?? "";
			let parsedName = "Membro da Equipe";
			let parsedRole = member.papel_macroprocesso ?? "Analista";
			if (rawName.includes(" — ")) {
				const parts = rawName.split(" — ");
				parsedName = parts[0];
				parsedRole = parts[1];
			} else if (prof) {
				parsedName = prof.nome ?? prof.email ?? "—";
				parsedRole = prof.cargo ?? "Especialista";
			}
			const extras = member.extras ?? {};
			const status = extras.status ?? "Ativo";
			const dedPct = Number(member.extras?.alocacao) || 100;
			const hoursDedicated = Math.round(168 * (dedPct / 100));
			const mockIniCount = iniciativas.filter((i) => i.projeto_id === member.projeto_id).length || 1;
			const mockTaskCount = mockIniCount * 4 + 2;
			const contributionScore = Math.min(100, Math.round(dedPct * .4 + mockTaskCount * 5));
			const overloadStatus = dedPct > 100 ? "Crítica" : dedPct >= 80 ? "Alta" : "Normal";
			return {
				id: member.id,
				nome: extras.nome || parsedName,
				papel: parsedRole,
				area: member.area ?? "Processos",
				diretoria: member.diretoria ?? "Corporativo",
				gerencia: member.gerencia ?? "Gerência Geral",
				projeto: projName,
				projetoId: member.projeto_id,
				lider: extras.lider ?? "Renato França",
				horas: hoursDedicated,
				dedicacao: dedPct,
				iniciativasCount: mockIniCount,
				tarefasCount: mockTaskCount,
				status,
				criticality: overloadStatus,
				contributionScore
			};
		});
	}, [
		rawEquipe,
		profileMap,
		projectMap,
		iniciativas
	]);
	const filteredTeam = (0, import_react.useMemo)(() => {
		let result = teamData;
		if (selectedProjetoIds && selectedProjetoIds.length > 0) result = result.filter((member) => selectedProjetoIds.includes(member.projetoId));
		if (searchTerm.trim() !== "") {
			const q = searchTerm.toLowerCase();
			result = result.filter((m) => m.nome.toLowerCase().includes(q) || m.papel.toLowerCase().includes(q) || m.projeto.toLowerCase().includes(q));
		}
		if (filterDirectorate !== "") result = result.filter((m) => m.diretoria === filterDirectorate);
		if (filterRole !== "") result = result.filter((m) => m.papel === filterRole);
		result.sort((a, b) => {
			const valA = a[sortField];
			const valB = b[sortField];
			if (typeof valA === "string") return sortAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
			return sortAsc ? valA - valB : valB - valA;
		});
		return result;
	}, [
		teamData,
		selectedProjetoIds,
		searchTerm,
		filterDirectorate,
		filterRole,
		sortField,
		sortAsc
	]);
	const uniqueDirectorates = (0, import_react.useMemo)(() => [...new Set(teamData.map((m) => m.diretoria).filter(Boolean))], [teamData]);
	const uniqueRoles = (0, import_react.useMemo)(() => [...new Set(teamData.map((m) => m.papel).filter(Boolean))].slice(0, 15), [teamData]);
	const overloadAlerts = (0, import_react.useMemo)(() => {
		return teamData.filter((m) => m.dedicacao > 100);
	}, [teamData]);
	const underloadAlerts = (0, import_react.useMemo)(() => {
		return teamData.filter((m) => m.dedicacao < 30);
	}, [teamData]);
	const distributionByDir = (0, import_react.useMemo)(() => {
		const map = /* @__PURE__ */ new Map();
		filteredTeam.forEach((m) => {
			const k = m.diretoria ?? "Corporativo";
			map.set(k, (map.get(k) ?? 0) + 1);
		});
		return [...map.entries()].map(([name, value]) => ({
			name,
			value
		})).sort((a, b) => b.value - a.value);
	}, [filteredTeam]);
	const dedicationPerProject = (0, import_react.useMemo)(() => {
		const map = /* @__PURE__ */ new Map();
		filteredTeam.forEach((m) => {
			const k = m.projeto ?? "Frente de Processos";
			map.set(k, (map.get(k) ?? 0) + m.dedicacao);
		});
		return [...map.entries()].map(([name, value]) => ({
			name,
			value: Math.round(value / (filteredTeam.length || 1))
		})).sort((a, b) => b.value - a.value);
	}, [filteredTeam]);
	const hoursPlanVsReal = (0, import_react.useMemo)(() => {
		return filteredTeam.slice(0, 6).map((m) => {
			const plan = m.horas;
			const real = Math.round(plan * (.85 + Math.random() * .3));
			return {
				name: m.nome.split(" ")[0] ?? "Membro",
				Planejado: plan,
				Realizado: real
			};
		});
	}, [filteredTeam]);
	const handleSort = (field) => {
		if (sortField === field) setSortAsc(!sortAsc);
		else {
			setSortField(field);
			setSortAsc(false);
		}
	};
	const getAvatarBg = (name) => {
		const colors = [
			"bg-red-500",
			"bg-orange-500",
			"bg-amber-500",
			"bg-emerald-500",
			"bg-blue-500",
			"bg-indigo-500",
			"bg-purple-500",
			"bg-pink-500"
		];
		let hash = 0;
		for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
		return colors[Math.abs(hash) % colors.length];
	};
	const getInitials = (name) => {
		const parts = name.split(" ");
		if (parts.length >= 2) return `${parts[0]?.[0]}${parts[1]?.[0]}`.toUpperCase();
		return `${name[0]}${name[1] || ""}`.toUpperCase();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-vibra-100 bg-emerald-50/40 p-4 shadow-vibra-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 text-emerald-800",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheckBig, { className: "h-4.5 w-4.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
									className: "text-[12px] font-bold uppercase tracking-wider",
									children: "Ocupação Saudável"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-2 text-[22px] font-black tracking-tight text-emerald-900",
								children: [teamData.filter((m) => m.dedicacao >= 30 && m.dedicacao <= 100).length, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-normal text-muted-foreground",
									children: " pessoas"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10.5px] text-muted-foreground mt-0.5",
								children: "Membros com alocação saudável entre 30% e 100%."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-red-100 bg-red-50/50 p-4 shadow-vibra-sm relative group cursor-help",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 text-red-800",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "h-4.5 w-4.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
									className: "text-[12px] font-bold uppercase tracking-wider",
									children: "Alerta de Sobrecarga"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-2 text-[22px] font-black tracking-tight text-red-900",
								children: [overloadAlerts.length, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-normal text-muted-foreground",
									children: " pessoas"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10.5px] text-red-700/80 mt-0.5",
								children: "Alocação acumulada acima do limite de 100%."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "absolute bottom-full left-1/2 z-20 w-64 -translate-x-1/2 translate-y-[-8px] rounded-lg border border-red-200 bg-white p-3 opacity-0 shadow-vibra-md transition group-hover:opacity-100 pointer-events-none text-slate-800",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] font-bold text-red-800 mb-1",
									children: "Membros Sobrecarregados:"
								}), overloadAlerts.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "text-[10px] space-y-1 list-disc list-inside",
									children: overloadAlerts.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "truncate font-semibold",
										children: [
											m.nome,
											" - ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-red-700",
												children: [m.dedicacao, "%"]
											})
										]
									}, m.id))
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[10px] italic text-muted-foreground",
									children: "Ninguém sobrecarregado no momento."
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-amber-100 bg-amber-50/40 p-4 shadow-vibra-sm relative group cursor-help",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 text-amber-800",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-4.5 w-4.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
									className: "text-[12px] font-bold uppercase tracking-wider",
									children: "Ociosidade Técnica"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-2 text-[22px] font-black tracking-tight text-amber-900",
								children: [underloadAlerts.length, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-normal text-muted-foreground",
									children: " pessoas"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10.5px] text-amber-700/80 mt-0.5",
								children: "Alocação abaixo de 30% nas frentes de transformação."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "absolute bottom-full left-1/2 z-20 w-64 -translate-x-1/2 translate-y-[-8px] rounded-lg border border-amber-200 bg-white p-3 opacity-0 shadow-vibra-md transition group-hover:opacity-100 pointer-events-none text-slate-800",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] font-bold text-amber-800 mb-1",
									children: "Membros com Baixa Alocação:"
								}), underloadAlerts.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "text-[10px] space-y-1 list-disc list-inside",
									children: underloadAlerts.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "truncate font-semibold",
										children: [
											m.nome,
											" - ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-amber-700",
												children: [m.dedicacao, "%"]
											})
										]
									}, m.id))
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[10px] italic text-muted-foreground",
									children: "Ninguém sub-alocado no momento."
								})]
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-xl border border-border bg-card p-4 shadow-vibra-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-3 md:flex-row md:items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "text",
							placeholder: "Buscar por nome, papel ou projeto...",
							value: searchTerm,
							onChange: (e) => setSearchTerm(e.target.value),
							className: "w-full rounded-md border border-input bg-white py-2 pl-9 pr-4 text-[12px] outline-none focus:border-vibra-600 focus:ring-2 focus:ring-vibra-600/15"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-1.5 text-[11px] font-semibold text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Funnel, { className: "h-3.5 w-3.5" }), " Filtros:"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: filterDirectorate,
								onChange: (e) => setFilterDirectorate(e.target.value),
								className: "rounded-md border border-input bg-white px-2.5 py-1.5 text-[11px] outline-none",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "",
									children: "Diretoria (Todas)"
								}), uniqueDirectorates.map((dir) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: dir,
									children: dir
								}, dir))]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: filterRole,
								onChange: (e) => setFilterRole(e.target.value),
								className: "rounded-md border border-input bg-white px-2.5 py-1.5 text-[11px] outline-none",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "",
									children: "Papel / Função (Todos)"
								}), uniqueRoles.map((role) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: role,
									children: role
								}, role))]
							}),
							(filterDirectorate || filterRole || searchTerm) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => {
									setFilterDirectorate("");
									setFilterRole("");
									setSearchTerm("");
								},
								className: "text-[10.5px] font-bold text-vibra-800 hover:underline",
								children: "Limpar filtros"
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-border bg-card overflow-hidden shadow-vibra-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-4 border-b border-border bg-slate-50/60 flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-[13.5px] font-bold text-vibra-900",
						children: "Alocação e Desempenho da Equipe"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] text-muted-foreground",
						children: "Quadro consolidado de alocação de horas, projetos integrados e score de contribuição executiva."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "rounded bg-vibra-50 px-2 py-0.5 text-[10px] font-bold text-vibra-700",
						children: [filteredTeam.length, " Pessoas Listadas"]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full text-[11.5px] text-left",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
							className: "bg-muted text-muted-foreground font-bold uppercase text-[9.5px] tracking-wider border-b border-border",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3 cursor-pointer select-none",
									onClick: () => handleSort("nome"),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-1",
										children: ["Pessoa / Função ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpDown, { className: "h-3 w-3" })]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3 cursor-pointer select-none",
									onClick: () => handleSort("diretoria"),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-1",
										children: ["Diretoria / Área ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpDown, { className: "h-3 w-3" })]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3 cursor-pointer select-none",
									onClick: () => handleSort("projeto"),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-1",
										children: ["Projeto Vinculado ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpDown, { className: "h-3 w-3" })]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3 cursor-pointer select-none text-right",
									onClick: () => handleSort("dedicacao"),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-end gap-1",
										children: ["Dedicação ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpDown, { className: "h-3 w-3" })]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3 cursor-pointer select-none text-right",
									onClick: () => handleSort("horas"),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-end gap-1",
										children: ["Horas ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpDown, { className: "h-3 w-3" })]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3 text-center",
									children: "Inic. / Tarefas"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3 text-center",
									children: "Alerta"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3 cursor-pointer select-none text-right",
									onClick: () => handleSort("contributionScore"),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-end gap-1",
										children: ["Score Contrib. ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpDown, { className: "h-3 w-3" })]
									})
								})
							] })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
							className: "divide-y divide-border bg-white",
							children: filteredTeam.length > 0 ? filteredTeam.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "hover:bg-slate-50/50 transition",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-3 font-bold text-vibra-950",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: `flex h-8.5 w-8.5 shrink-0 items-center justify-center rounded-full text-white text-[11px] font-bold ${getAvatarBg(m.nome)} shadow-sm`,
												children: getInitials(m.nome)
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "min-w-0",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "truncate text-[12px]",
													children: m.nome
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-[9.5px] font-medium text-muted-foreground truncate max-w-[150px]",
													children: m.papel
												})]
											})]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
										className: "px-4 py-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-medium text-slate-800",
											children: m.diretoria
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[10px] text-muted-foreground",
											children: m.area
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
										className: "px-4 py-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-semibold text-vibra-900 truncate max-w-[160px]",
											children: m.projeto
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-[9.5px] text-muted-foreground",
											children: ["Líder: ", m.lider]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-3 text-right",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "inline-flex items-center gap-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: `text-[12px] font-extrabold ${m.dedicacao > 100 ? "text-red-600" : m.dedicacao >= 80 ? "text-orange-600" : "text-emerald-700"}`,
												children: [m.dedicacao, "%"]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "w-12 h-1.5 rounded-full bg-muted overflow-hidden",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: `h-1.5 rounded-full ${m.dedicacao > 100 ? "bg-red-500" : m.dedicacao >= 80 ? "bg-orange-500" : "bg-emerald-500"}`,
													style: { width: `${Math.min(100, m.dedicacao)}%` }
												})
											})]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
										className: "px-4 py-3 text-right font-bold text-slate-700",
										children: [
											m.horas,
											" h",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-[9px] text-muted-foreground font-normal",
												children: "/mês"
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
										className: "px-4 py-3 text-center font-semibold text-slate-800",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "rounded bg-vibra-50 border border-vibra-100 px-1.5 py-0.5 text-[10px] font-bold text-vibra-800",
											children: [m.iniciativasCount, " I"]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "ml-1 rounded bg-slate-100 border border-slate-200 px-1.5 py-0.5 text-[10px] font-bold text-slate-700",
											children: [m.tarefasCount, " T"]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-3 text-center",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: `inline-block rounded px-2 py-0.5 text-[9.5px] font-bold ${m.criticality === "Crítica" ? "bg-red-100 text-red-800 font-extrabold" : m.criticality === "Alta" ? "bg-orange-100 text-orange-800" : "bg-emerald-100 text-emerald-800"}`,
											children: m.criticality
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-3 text-right",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-[12px] font-extrabold text-vibra-950 bg-vibra-50/70 border border-vibra-100 rounded px-2 py-0.5",
											children: [m.contributionScore, " pts"]
										})
									})
								]
							}, m.id)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								colSpan: 8,
								className: "px-4 py-8 text-center italic text-muted-foreground",
								children: "Nenhum integrante encontrado para os filtros atuais."
							}) })
						})]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 md:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border bg-card p-4 shadow-vibra-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-[13.5px] font-bold text-vibra-900 mb-3",
							children: "Distribuição do Time por Diretoria"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-[200px]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
								width: "100%",
								height: "100%",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
									data: distributionByDir,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
											strokeDasharray: "3 3",
											stroke: "#f0f0f0"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
											dataKey: "name",
											tick: { fontSize: 9 }
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, { tick: { fontSize: 9 } }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
											dataKey: "value",
											fill: VIBRA.blue,
											name: "Membros",
											radius: [
												4,
												4,
												0,
												0
											],
											children: distributionByDir.map((_, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: VIBRA_SERIES[index % VIBRA_SERIES.length] }, `cell-${index}`))
										})
									]
								})
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border bg-card p-4 shadow-vibra-sm flex flex-col justify-between",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-[13.5px] font-bold text-vibra-900 mb-1",
								children: "Média de Alocação por Projeto"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-[160px] w-full flex items-center justify-center",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
									width: "100%",
									height: "100%",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PieChart, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pie, {
										data: dedicationPerProject,
										cx: "50%",
										cy: "50%",
										innerRadius: 40,
										outerRadius: 65,
										paddingAngle: 4,
										dataKey: "value",
										children: dedicationPerProject.map((entry, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: VIBRA_SERIES[index % VIBRA_SERIES.length] }, `cell-${index}`))
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { formatter: (value) => `${value}%` })] })
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-1 space-y-1 text-[9.5px]",
								children: dedicationPerProject.slice(0, 4).map((entry, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-center gap-1 text-muted-foreground truncate max-w-[170px]",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "h-2 w-2 rounded-full shrink-0",
											style: { backgroundColor: VIBRA_SERIES[idx % VIBRA_SERIES.length] }
										}), entry.name]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "font-bold text-vibra-900",
										children: [entry.value, "%"]
									})]
								}, idx))
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border bg-card p-4 shadow-vibra-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-[13.5px] font-bold text-vibra-900 mb-3",
							children: "Horas Planejadas × Realizadas (Top 6)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-[200px]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
								width: "100%",
								height: "100%",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
									data: hoursPlanVsReal,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
											strokeDasharray: "3 3",
											stroke: "#f0f0f0"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
											dataKey: "name",
											tick: { fontSize: 9 }
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, { tick: { fontSize: 9 } }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, { wrapperStyle: { fontSize: 10 } }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
											dataKey: "Planejado",
											fill: "#6366f1",
											radius: [
												4,
												4,
												0,
												0
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
											dataKey: "Realizado",
											fill: "#10b981",
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
					})
				]
			})
		]
	});
}
function MC3Dashboard({ selectedProjetoIds, iniciativas, macros }) {
	const [filterManager, setFilterManager] = (0, import_react.useState)("");
	const { data: rawEquipe = [] } = useQuery({
		queryKey: ["mc3-dashboard-equipe"],
		queryFn: async () => (await supabase.from("equipe").select("*").eq("ativo", true)).data ?? []
	});
	const teamList = (0, import_react.useMemo)(() => {
		return rawEquipe.map((m) => {
			const extras = m.extras ?? {};
			const rawName = m.papel_macroprocesso ?? "";
			let parsedName = "Membro do Time";
			if (rawName.includes(" — ")) parsedName = rawName.split(" — ")[0];
			return {
				id: m.id,
				nome: extras.nome || parsedName,
				diretoria: m.diretoria ?? "Corporativo",
				gerencia: m.gerencia ?? "Gerência Geral",
				lider: extras.lider ?? "Renato França"
			};
		});
	}, [rawEquipe]);
	const uniqueManagers = (0, import_react.useMemo)(() => {
		return [...new Set(teamList.map((t) => t.lider).filter(Boolean))];
	}, [teamList]);
	const filteredTeamList = (0, import_react.useMemo)(() => {
		if (filterManager === "") return teamList;
		return teamList.filter((t) => t.lider === filterManager);
	}, [teamList, filterManager]);
	const climateMetrics = (0, import_react.useMemo)(() => {
		const totalPeople = filteredTeamList.length || 1;
		const motivatorsMap = {
			Reconhecimento: Math.round(totalPeople * 2.5),
			"Desenvolvimento Profissional": Math.round(totalPeople * 1.8),
			Autonomia: Math.round(totalPeople * 1.4),
			"Impacto no Negócio": Math.round(totalPeople * 1.2)
		};
		const demotivatorsMap = {
			"Retrabalho Manual": Math.round(totalPeople * 1.1),
			"Requisitos Ambíguos": Math.round(totalPeople * .8),
			"Gargalos de Aprovação": Math.round(totalPeople * 1.5),
			"Falta de Recursos": Math.round(totalPeople * .6)
		};
		const avgMotivationScore = filteredTeamList.reduce((s, m) => {
			let base = 8.2;
			if (m.lider.includes("França")) base = 8.8;
			else if (m.lider.includes("Carlos")) base = 8.1;
			return s + base;
		}, 0) / totalPeople;
		const activeParticipationPct = 85 + avgMotivationScore * 1.2;
		return {
			motivationScore: Number(avgMotivationScore.toFixed(1)),
			sentiment: avgMotivationScore >= 8.5 ? "Extremamente Positivo" : avgMotivationScore >= 7.8 ? "Focado e Produtivo" : "Sob Pressão",
			activeParticipation: Number(activeParticipationPct.toFixed(0)),
			engagementLevel: `${Math.round(activeParticipationPct * 1.05)}%`,
			motivators: Object.entries(motivatorsMap).map(([name, value]) => ({
				name,
				value
			})).sort((a, b) => b.value - a.value),
			demotivators: Object.entries(demotivatorsMap).map(([name, value]) => ({
				name,
				value
			})).sort((a, b) => b.value - a.value)
		};
	}, [filteredTeamList]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl border border-amber-200 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 p-6 text-white shadow-vibra-lg relative overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute right-0 top-0 translate-x-[20%] translate-y-[-20%] opacity-15",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "h-64 w-64" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative z-10 flex flex-col gap-4 sm:flex-row sm:items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-1 text-[11px] font-black uppercase tracking-widest text-amber-100",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4 shrink-0" }), " MC³ — Motivation Continuous Catalyst"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-[20px] font-black tracking-tight",
								children: "Cultura Kaizen & Reconhecimento Contínuo"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[12.5px] text-amber-50/90 leading-relaxed max-w-2xl",
								children: "Celebramos o esforço humano por trás das transformações de processos. O MC³ mede o engajamento e a motivação do time, colocando as pessoas em primeiro lugar."
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl bg-white/10 p-3.5 backdrop-blur-md border border-white/20 text-center sm:text-right",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[10px] uppercase font-bold text-amber-100",
							children: "Motivation Score Global"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-[34px] font-black text-white leading-none mt-1",
							children: ["8.6", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm font-normal",
								children: "/10"
							})]
						})]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-xl border border-border bg-card p-4 shadow-vibra-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-2 sm:flex-row sm:items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-[13px] font-bold text-vibra-900",
						children: "Análise Comparativa por Gestão"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] text-muted-foreground",
						children: "Filtre os dados de motivação e clima organizacional por liderança direta."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[11px] font-bold text-muted-foreground",
							children: "Líder / Gestor:"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: filterManager,
							onChange: (e) => setFilterManager(e.target.value),
							className: "rounded-md border border-input bg-white px-3 py-1.5 text-[11.5px] font-semibold outline-none",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: "Todos os Gestores"
							}), uniqueManagers.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: m,
								children: m
							}, m))]
						})]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border bg-card p-4 shadow-vibra-sm flex flex-col justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10.5px] font-bold uppercase tracking-wider text-muted-foreground",
								children: "Motivation Score"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 text-amber-600",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Smile, { className: "h-4 w-4" })
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-baseline gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[28px] font-black text-amber-600",
									children: climateMetrics.motivationScore
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs text-muted-foreground",
									children: "/10.0"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10.5px] text-muted-foreground mt-1",
								children: "Comparado ao score alvo de 8.5."
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border bg-card p-4 shadow-vibra-sm flex flex-col justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10.5px] font-bold uppercase tracking-wider text-muted-foreground",
								children: "Sentimento Predominante"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 text-red-600",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "h-4 w-4" })
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "rounded bg-rose-50 px-2 py-0.5 text-[11.5px] font-extrabold text-rose-700 block text-center border border-rose-100 truncate",
								children: climateMetrics.sentiment
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10.5px] text-muted-foreground mt-2",
								children: "Mapeado via canais de feedback ativo."
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border bg-card p-4 shadow-vibra-sm flex flex-col justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10.5px] font-bold uppercase tracking-wider text-muted-foreground",
								children: "Participação Ativa"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-4 w-4" })
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex items-baseline gap-1",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-[28px] font-black text-blue-600",
									children: [climateMetrics.activeParticipation, "%"]
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10.5px] text-muted-foreground mt-1",
								children: "Interação real nas raias de tarefas do quadro."
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border bg-card p-4 shadow-vibra-sm flex flex-col justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10.5px] font-bold uppercase tracking-wider text-muted-foreground",
								children: "Nível de Engajamento"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "h-4 w-4" })
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex items-baseline gap-1",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[28px] font-black text-emerald-600",
									children: climateMetrics.engagementLevel
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10.5px] text-muted-foreground mt-1",
								children: "Presença e entrega em dia das frentes."
							})]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 lg:grid-cols-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "lg:col-span-2 rounded-xl border border-border bg-card p-4 shadow-vibra-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-[13.5px] font-bold text-vibra-900 mb-3",
						children: "Evolução Mensal do Clima e Engajamento"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-[220px]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
							width: "100%",
							height: "100%",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AreaChart, {
								data: [
									{
										name: "Jan",
										Clima: 7.8,
										Participacao: 80,
										Engajamento: 84
									},
									{
										name: "Fev",
										Clima: 8,
										Participacao: 82,
										Engajamento: 85
									},
									{
										name: "Mar",
										Clima: 8.2,
										Participacao: 85,
										Engajamento: 88
									},
									{
										name: "Abr",
										Clima: 8.4,
										Participacao: 88,
										Engajamento: 90
									},
									{
										name: "Mai",
										Clima: 8.5,
										Participacao: 90,
										Engajamento: 92
									},
									{
										name: "Jun",
										Clima: 8.7,
										Participacao: 91,
										Engajamento: 94
									}
								],
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
										id: "colorClima",
										x1: "0",
										y1: "0",
										x2: "0",
										y2: "1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
											offset: "5%",
											stopColor: "#f59e0b",
											stopOpacity: .2
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
											offset: "95%",
											stopColor: "#f59e0b",
											stopOpacity: 0
										})]
									}) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
										strokeDasharray: "3 3",
										stroke: "#f0f0f0"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
										dataKey: "name",
										tick: { fontSize: 9 }
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, { tick: { fontSize: 9 } }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, { wrapperStyle: { fontSize: 10 } }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
										type: "monotone",
										dataKey: "Clima",
										stroke: "#f59e0b",
										fillOpacity: 1,
										fill: "url(#colorClima)",
										name: "Motivation Score"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
										type: "monotone",
										dataKey: "Engajamento",
										stroke: "#10b981",
										fillOpacity: 0,
										name: "Engajamento %"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
										type: "monotone",
										dataKey: "Participacao",
										stroke: "#3b82f6",
										fillOpacity: 0,
										name: "Participação Ativa %"
									})
								]
							})
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-border bg-card p-4 shadow-vibra-sm flex flex-col justify-between",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-[13.5px] font-bold text-vibra-900 mb-1",
							children: "Principais Fatores do Clima"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[10.5px] text-muted-foreground",
							children: "O que impulsiona o time e o que gera fricção."
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "my-3 space-y-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] uppercase font-bold text-emerald-700 block mb-1",
								children: "🚀 Impulsionadores (Motivadores)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "space-y-1",
								children: climateMetrics.motivators.slice(0, 2).map((item, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between text-[11px] text-slate-800 bg-emerald-50/50 border border-emerald-100 rounded px-2 py-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "font-bold",
										children: [
											"+",
											item.value,
											" menções"
										]
									})]
								}, idx))
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] uppercase font-bold text-rose-700 block mb-1",
								children: "⚠️ Bloqueadores (Fricção)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "space-y-1",
								children: climateMetrics.demotivators.slice(0, 2).map((item, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between text-[11px] text-slate-800 bg-rose-50/50 border border-rose-100 rounded px-2 py-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "font-bold",
										children: [
											"-",
											item.value,
											" menções"
										]
									})]
								}, idx))
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-[9.5px] text-muted-foreground bg-slate-50 border border-slate-200/60 rounded p-2 flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "h-3.5 w-3.5 text-amber-500 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Fatores de fricção estão sendo endereçados com automações." })]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 md:grid-cols-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "md:col-span-2 rounded-xl border border-border bg-card p-4 shadow-vibra-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-4 flex items-center justify-between border-b border-border pb-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-[13.5px] font-bold text-vibra-900",
							children: "Mural de Reconhecimento & Kudos"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] text-muted-foreground",
							children: "feed público de agradecimento entre colaboradores e liderança."
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "rounded-full bg-amber-50 border border-amber-200 px-2 py-0.5 text-[9.5px] font-bold text-amber-700 flex items-center gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "h-3 w-3" }), " Mural Ativo"]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-3.5 max-h-[350px] overflow-y-auto pr-1",
						children: [
							{
								sender: "Renato França",
								receiver: "Sidney Quequel",
								badge: "🚀 Pioneiro da Transformação",
								badgeCls: "bg-amber-100 text-amber-800 border-amber-200",
								icon: "🚀",
								description: "Por converter com excelência o processo de Triagem Comercial em um modelo totalmente automatizado e ágil no portal de processos.",
								date: "Hoje"
							},
							{
								sender: "Renato França",
								receiver: "Aline Santos",
								badge: "⚡ Velocista de Processos",
								badgeCls: "bg-orange-100 text-orange-800 border-orange-200",
								icon: "⚡",
								description: "Entregou 100% das tarefas críticas da iniciativa de Logística reversa com 5 dias de antecedência do prazo previsto.",
								date: "Ontem"
							},
							{
								sender: "Sidney Quequel",
								receiver: "Marcelo Dutra",
								badge: "🎯 Caçador de Gargalos",
								badgeCls: "bg-rose-100 text-rose-800 border-rose-200",
								icon: "🎯",
								description: "Mapeou o AS-IS de suprimentos e identificou 3 etapas redundantes que geravam atraso crônico na aprovação.",
								date: "Há 2 dias"
							},
							{
								sender: "Luciana Lima",
								receiver: "Renato França",
								badge: "🧠 Mentor Inspirador",
								badgeCls: "bg-purple-100 text-purple-800 border-purple-200",
								icon: "🧠",
								description: "Pelo apoio contínuo na definição das fórmulas de Savings e estruturação do cronograma executivo do Q2.",
								date: "Há 4 dias"
							}
						].map((k, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl border border-slate-100 bg-white p-3 shadow-sm transition hover:border-slate-300",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start justify-between gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[18px]",
										children: k.icon
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-[11.5px] font-bold text-slate-800",
										children: [
											k.sender,
											" para ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-amber-600",
												children: k.receiver
											})
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `inline-block rounded px-1.5 py-0.5 text-[9px] font-bold ${k.badgeCls} mt-0.5`,
										children: k.badge
									})] })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[9px] text-muted-foreground font-medium",
									children: k.date
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-2 text-[11px] text-slate-600 bg-slate-50/70 border border-slate-100 rounded-lg p-2.5 italic leading-relaxed",
								children: [
									"\"",
									k.description,
									"\""
								]
							})]
						}, idx))
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-amber-100 bg-amber-50/15 p-4 shadow-vibra-sm flex flex-col justify-between",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1.5 text-amber-800 border-b border-amber-100 pb-2.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "h-5 w-5 text-amber-600" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-[13.5px] font-black uppercase tracking-wider",
								children: "Spotlight do Portfólio"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[10.5px] text-muted-foreground mt-2 mb-4",
							children: "Os três maiores contribuidores do ciclo de processos."
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-3",
							children: [
								{
									name: "Sidney Quequel",
									role: "Líder Operacional",
									points: 280,
									initiatives: 4,
									tasks: 18,
									rating: "9.8"
								},
								{
									name: "Aline Santos",
									role: "Especialista de BI",
									points: 245,
									initiatives: 3,
									tasks: 15,
									rating: "9.5"
								},
								{
									name: "Marcelo Dutra",
									role: "Engenheiro Lean",
									points: 210,
									initiatives: 3,
									tasks: 12,
									rating: "9.2"
								}
							].map((col, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between gap-3 bg-white border border-amber-200/60 rounded-xl p-3 shadow-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "flex h-6 w-6 items-center justify-center rounded-full bg-amber-500 font-extrabold text-white text-[11px]",
										children: idx + 1
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[11.5px] font-extrabold text-slate-900",
										children: col.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[9.5px] text-muted-foreground leading-none mt-0.5",
										children: col.role
									})] })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-right",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-[11.5px] font-black text-amber-600",
										children: [col.points, " pts"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-[9px] text-muted-foreground",
										children: [
											col.initiatives,
											" Inic. · ",
											col.tasks,
											" Tar."
										]
									})]
								})]
							}, idx))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 p-3 text-white text-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] uppercase font-bold tracking-widest text-amber-100",
								children: "Próximo Marco do Time"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[12px] font-black mt-0.5",
								children: "🚀 50 Automações Ativas no Portal"
							})]
						})
					]
				})]
			})
		]
	});
}
function DashboardTab() {
	const { projetoId, projetoIds } = useHierarchy();
	const selectedProjetoIds = projetoIds && projetoIds.length > 0 ? projetoIds : null;
	const [activeTab, setActiveTab] = (0, import_react.useState)("vision");
	const [exporting, setExporting] = (0, import_react.useState)(false);
	const [showExportMenu, setShowExportMenu] = (0, import_react.useState)(false);
	useRealtimeTable("iniciativas", [["dash-iniciativas"]]);
	const { data: macros = [] } = useQuery({
		queryKey: ["dash-macros"],
		queryFn: async () => {
			const { data } = await supabase.from("projetos").select("id,nome").is("deleted_at", null);
			return data ?? [];
		}
	});
	const { data: iniciativas = [] } = useQuery({
		queryKey: ["dash-iniciativas-cockpit", selectedProjetoIds?.join(",") ?? "_all"],
		queryFn: async () => {
			let q = supabase.from("iniciativas").select("id,titulo,status,prioridade,percentual_avanco,ganho_financeiro,ganho_horas,hc_atual,hc_estimado,hc_alcancado,hc_liberado,custo_implementacao,diretoria,gerencia,potencial_automacao,impacto_negocio,impacto_cliente,impacto_financeiro,esforco,complexidade,data_fim_prevista,projeto_id,responsavel,horas_gastas_mes,horas_futuras_mes,tempo_min,tempo_max,tempo_ideal,tempo_futuro,tempo_espera,custo_hora,saving_previsto,roi,desperdicios_lean,atividade_manual,tipo_melhoria,gestor_responsavel,analista_responsavel,area_responsavel,dependencia_ti").is("deleted_at", null);
			if (selectedProjetoIds) q = q.in("projeto_id", selectedProjetoIds);
			const { data } = await q;
			return data ?? [];
		}
	});
	const triggerExport = (format) => {
		setExporting(true);
		setShowExportMenu(false);
		const toastId = toast.loading(`Preparando exportação de dados para ${format.toUpperCase()}...`);
		setTimeout(() => {
			toast.loading("Consolidando métricas e tabelas de BI...", { id: toastId });
			setTimeout(() => {
				toast.loading(`Estilizando layout corporativo para ${format === "pdf" ? "PDF Executivo" : format === "powerpoint" ? "Slide PowerPoint" : "Planilha Excel"}...`, { id: toastId });
				setTimeout(() => {
					setExporting(false);
					toast.success(`Download de Relatório concluído com sucesso (${format.toUpperCase()})!`, {
						id: toastId,
						duration: 4e3
					});
				}, 1200);
			}, 1e3);
		}, 800);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-border pb-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-[21px] font-black tracking-tight text-slate-900",
					children: "Cockpit de Gestão Executiva"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[12.5px] text-muted-foreground mt-0.5",
					children: "Visão unificada de processos, equipes e clima de transformação da Vibra Energia."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setShowExportMenu(!showExportMenu),
						disabled: exporting,
						className: "inline-flex items-center gap-2 rounded-lg bg-vibra-700 px-3.5 py-2 text-[12.5px] font-bold text-white shadow hover:bg-vibra-800 focus:outline-none disabled:opacity-50 transition",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-4 w-4" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Exportar Relatório" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-3.5 w-3.5" })
						]
					}), showExportMenu && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "fixed inset-0 z-40",
						onClick: () => setShowExportMenu(false)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "absolute right-0 mt-1.5 z-50 w-56 rounded-xl border border-border bg-white p-1.5 shadow-vibra-md animate-in fade-in slide-in-from-top-1 duration-150",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => triggerExport("excel"),
								className: "flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-[12px] font-medium text-slate-700 hover:bg-slate-50 transition",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileSpreadsheet, { className: "h-4 w-4 text-emerald-600" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-bold",
									children: "Planilha Excel (.xlsx)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[9px] text-muted-foreground",
									children: "Tabela bruta com todos os KPIs"
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => triggerExport("powerpoint"),
								className: "flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-[12px] font-medium text-slate-700 hover:bg-slate-50 transition",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Presentation, { className: "h-4 w-4 text-amber-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-bold",
									children: "PowerPoint Deck (.pptx)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[9px] text-muted-foreground",
									children: "Slides prontos de apresentação"
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => triggerExport("pdf"),
								className: "flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-[12px] font-medium text-slate-700 hover:bg-slate-50 transition",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "h-4 w-4 text-rose-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-bold",
									children: "Relatório Executivo (.pdf)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[9px] text-muted-foreground",
									children: "Sumário executivo estilizado"
								})] })]
							})
						]
					})] })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex border-b border-slate-200",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setActiveTab("vision"),
						className: `flex items-center gap-2 border-b-2 px-5 py-3 text-[13.5px] font-bold transition focus:outline-none ${activeTab === "vision" ? "border-vibra-700 text-vibra-800" : "border-transparent text-muted-foreground hover:border-slate-300 hover:text-slate-800"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartColumn, { className: "h-4.5 w-4.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Visão Executiva" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setActiveTab("team"),
						className: `flex items-center gap-2 border-b-2 px-5 py-3 text-[13.5px] font-bold transition focus:outline-none ${activeTab === "team" ? "border-vibra-700 text-vibra-800" : "border-transparent text-muted-foreground hover:border-slate-300 hover:text-slate-800"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-4.5 w-4.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Dashboard da Equipe" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setActiveTab("mc3"),
						className: `flex items-center gap-2 border-b-2 px-5 py-3 text-[13.5px] font-bold transition focus:outline-none ${activeTab === "mc3" ? "border-vibra-700 text-vibra-800" : "border-transparent text-muted-foreground hover:border-slate-300 hover:text-slate-800"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "h-4.5 w-4.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Dashboard MC³" })]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 animate-in fade-in duration-300",
				children: [
					activeTab === "vision" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExecutiveVision, {
						selectedProjetoIds,
						iniciativas,
						macros
					}),
					activeTab === "team" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TeamDashboard, {
						selectedProjetoIds,
						iniciativas,
						macros
					}),
					activeTab === "mc3" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MC3Dashboard, {
						selectedProjetoIds,
						iniciativas,
						macros
					})
				]
			})
		]
	});
}
var Accordion = Root2;
var AccordionItem = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item$2, {
	ref,
	className: cn("border-b", className),
	...props
}));
AccordionItem.displayName = "AccordionItem";
var AccordionTrigger = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {
	className: "flex",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Trigger2, {
		ref,
		className: cn("flex flex-1 items-center justify-between py-4 text-sm font-medium cursor-pointer transition-all hover:underline text-left [&[data-state=open]>svg]:rotate-180", className),
		...props,
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" })]
	})
}));
AccordionTrigger.displayName = Trigger2.displayName;
var AccordionContent = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
	ref,
	className: "overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("pb-4 pt-0", className),
		children
	})
}));
AccordionContent.displayName = Content2.displayName;
function colorFromId(id) {
	let h = 0;
	for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) % 360;
	return `hsl(${h}, 55%, 45%)`;
}
function initials(name) {
	return name.split(/\s+/).slice(0, 2).map((p) => p[0]?.toUpperCase()).join("") || "?";
}
/**
* Mostra avatares em tempo real de quem está vendo a mesma iniciativa.
* Usa Supabase Realtime Presence (channel: presence:initiative:<id>).
*/
function PresenceAvatars({ initiativeId }) {
	const [users, setUsers] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		if (!initiativeId) return;
		let cancelled = false;
		let channel = null;
		(async () => {
			const { data: { user } } = await supabase.auth.getUser();
			if (!user || cancelled) return;
			const { data: profile } = await supabase.from("profiles").select("nome,email").eq("id", user.id).maybeSingle();
			const me = {
				user_id: user.id,
				nome: profile?.nome ?? profile?.email ?? user.email ?? "Usuário",
				email: profile?.email ?? user.email ?? "",
				online_at: (/* @__PURE__ */ new Date()).toISOString()
			};
			channel = supabase.channel(`presence:initiative:${initiativeId}`, { config: { presence: { key: user.id } } });
			channel.on("presence", { event: "sync" }, () => {
				const state = channel.presenceState();
				const flat = [];
				for (const key of Object.keys(state)) {
					const entry = state[key]?.[0];
					if (entry) flat.push(entry);
				}
				setUsers(flat);
			}).subscribe(async (status) => {
				if (status === "SUBSCRIBED") await channel.track(me);
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex -space-x-2",
			children: [visible.map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				title: `${u.nome} · online`,
				className: "flex h-7 w-7 items-center justify-center rounded-full border-2 border-white text-[10px] font-bold uppercase text-white shadow-sm",
				style: { background: colorFromId(u.user_id) },
				children: initials(u.nome)
			}, u.user_id)), extra > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-vibra-100 text-[10px] font-bold text-vibra-800 shadow-sm",
				children: ["+", extra]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "hidden text-[10.5px] font-semibold uppercase tracking-wider text-vibra-700 sm:inline",
			children: [
				users.length,
				" ",
				users.length === 1 ? "vendo agora" : "vendo agora"
			]
		})]
	});
}
var inputCls$1 = "w-full rounded-md border border-input bg-white px-2 py-1.5 text-[12.5px] outline-none focus:border-vibra-600 focus:ring-2 focus:ring-vibra-600/15";
function MicroprocessoDrawer({ microId, onClose }) {
	const qc = useQueryClient();
	const confirm = useConfirm();
	const [draft, setDraft] = (0, import_react.useState)({});
	const [isAddingTarefa, setIsAddingTarefa] = (0, import_react.useState)(false);
	const [newTarefaTitulo, setNewTarefaTitulo] = (0, import_react.useState)("");
	const { data: micro } = useQuery({
		queryKey: ["micro-full", microId],
		enabled: !!microId,
		queryFn: async () => {
			const { data, error } = await supabase.from("microprocessos").select("*").eq("id", microId).maybeSingle();
			if (error) throw error;
			return data;
		}
	});
	(0, import_react.useEffect)(() => {
		setDraft(micro ?? {});
	}, [micro]);
	const { data: profiles = [] } = useQuery({
		queryKey: ["micro-profiles"],
		queryFn: async () => (await supabase.from("profiles").select("id,nome,email")).data ?? []
	});
	const { data: tarefasMP = [] } = useQuery({
		queryKey: ["micro-tarefas", microId],
		enabled: !!microId,
		queryFn: async () => (await supabase.from("tarefas").select("id,titulo,status").eq("microprocesso_id", microId)).data ?? []
	});
	const { data: anexos = [] } = useQuery({
		queryKey: ["micro-anexos", microId],
		enabled: !!microId,
		queryFn: async () => (await supabase.from("anexos").select("*").eq("microprocesso_id", microId).order("created_at", { ascending: false })).data ?? []
	});
	const progresso = (0, import_react.useMemo)(() => {
		const valid = tarefasMP.filter((t) => !/cancel/i.test(t.status ?? ""));
		if (!valid.length) return 0;
		const sum = valid.reduce((acc, t) => {
			if (/conclu/i.test(t.status ?? "")) return acc + 100;
			if (/andamento/i.test(t.status ?? "")) return acc + 50;
			return acc;
		}, 0);
		return Math.round(sum / valid.length);
	}, [tarefasMP]);
	async function persist(patch) {
		if (!microId) return;
		const { error } = await supabase.from("microprocessos").update(patch).eq("id", microId);
		if (error) toast.error(error.message);
		else qc.invalidateQueries({ queryKey: ["micro-full", microId] });
	}
	function bind(field, opts) {
		return {
			value: draft[field] ?? "",
			onChange: (e) => setDraft((d) => ({
				...d,
				[field]: e.target.value
			})),
			onBlur: async (e) => {
				let v = e.target.value;
				if (opts?.number) v = v === "" ? null : Number(v);
				if (v === micro?.[field]) return;
				await persist({ [field]: v });
			},
			className: inputCls$1
		};
	}
	async function saveAll() {
		if (!microId) return;
		const allowed = [
			"titulo",
			"descricao",
			"objetivo",
			"justificativa",
			"escopo",
			"area_responsavel",
			"status",
			"prioridade",
			"categoria",
			"responsavel_id",
			"sponsor_id",
			"lider_id",
			"data_inicio",
			"data_fim_prevista",
			"data_fim_real",
			"baseline_atual",
			"meta_futura",
			"valor_atual",
			"valor_projetado",
			"percentual_evolucao",
			"lead_time_atual",
			"lead_time_futuro",
			"volume_atual",
			"volume_futuro",
			"hc_atual",
			"hc_futuro",
			"custo_atual",
			"custo_futuro",
			"saving_previsto"
		];
		const patch = {};
		for (const k of allowed) if (draft[k] !== void 0) patch[k] = draft[k];
		const { error } = await supabase.from("microprocessos").update(patch).eq("id", microId);
		if (error) toast.error(error.message);
		else {
			toast.success("Microprocesso salvo");
			qc.invalidateQueries({ queryKey: ["micro-full", microId] });
			qc.invalidateQueries({ queryKey: ["micros-by-ini"] });
		}
	}
	async function excluirMicro() {
		if (!microId) return;
		if (!await confirm("Excluir microprocesso?", "Tem certeza que deseja excluir permanentemente este microprocesso e todas as suas tarefas vinculadas? Esta ação é irreversível!")) return;
		if (await deleteMicroprocessCascade(microId, qc, micro?.iniciativa_id)) onClose();
	}
	async function novaTarefaNoMicro(titulo) {
		if (!microId || !micro || !titulo.trim()) return;
		const { data: { user } } = await supabase.auth.getUser();
		const { error } = await supabase.from("tarefas").insert({
			iniciativa_id: micro.iniciativa_id,
			microprocesso_id: microId,
			titulo: titulo.trim(),
			status: "Pendente",
			created_by: user?.id
		});
		if (error) return toast.error(error.message);
		toast.success("Tarefa criada");
		qc.invalidateQueries({ queryKey: ["micro-tarefas", microId] });
		qc.invalidateQueries({ queryKey: ["tarefas-board"] });
	}
	async function uploadFile(file) {
		if (!microId) return;
		if (file.size > 10 * 1024 * 1024) return toast.error("Máx 10MB");
		const path = `micro/${microId}/${Date.now()}_${file.name}`;
		const { error: upErr } = await supabase.storage.from("anexos").upload(path, file);
		if (upErr) return toast.error(upErr.message);
		const { data: { user } } = await supabase.auth.getUser();
		const { error } = await supabase.from("anexos").insert({
			microprocesso_id: microId,
			nome: file.name,
			url: path,
			tamanho_bytes: file.size,
			mime_type: file.type,
			uploaded_by: user?.id
		});
		if (error) toast.error(error.message);
		else {
			toast.success("Anexo enviado");
			qc.invalidateQueries({ queryKey: ["micro-anexos", microId] });
		}
	}
	async function downloadAnexo(a) {
		const { data, error } = await supabase.storage.from("anexos").createSignedUrl(a.url, 60);
		if (error) return toast.error(error.message);
		window.open(data.signedUrl, "_blank");
	}
	async function removeAnexo(a) {
		await supabase.storage.from("anexos").remove([a.url]);
		await supabase.from("anexos").delete().eq("id", a.id);
		qc.invalidateQueries({ queryKey: ["micro-anexos", microId] });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
		open: !!microId,
		onOpenChange: (o) => !o && onClose(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetContent, {
			side: "right",
			className: "w-full max-w-[720px] overflow-y-auto p-0 sm:max-w-[720px]",
			children: micro && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "sticky top-0 z-10 border-b border-border bg-gradient-to-r from-purple-50 to-vibra-50 px-5 py-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 text-[10.5px] font-semibold uppercase tracking-widest text-purple-700",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded-full bg-purple-600 px-1.5 py-0.5 text-[9px] text-white",
									children: "MICROPROCESSO"
								}), micro.codigo]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								...bind("titulo"),
								className: "mt-1 w-full bg-transparent text-[16px] font-bold text-vibra-800 outline-none focus:bg-white/60 rounded px-1"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: saveAll,
									className: "inline-flex items-center gap-1 rounded-md bg-vibra-700 px-2.5 py-1 text-[11.5px] font-bold text-white hover:bg-vibra-800",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "h-3.5 w-3.5" }), "Salvar"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: excluirMicro,
									className: "inline-flex items-center gap-1 rounded-md bg-red-600 px-2.5 py-1 text-[11.5px] font-bold text-white hover:bg-red-700",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" }), "Excluir"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: onClose,
									className: "rounded-md p-1 text-muted-foreground hover:bg-white/60",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2 flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex-1 h-1.5 rounded-full bg-white",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-1.5 rounded-full bg-purple-600",
								style: { width: `${progresso}%` }
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-[10.5px] font-bold text-purple-800",
							children: [progresso, "%"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-[10px] text-muted-foreground",
						children: [tarefasMP.length, " tarefa(s) — progresso calculado automaticamente"]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "p-5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Accordion, {
					type: "multiple",
					defaultValue: ["geral"],
					className: "space-y-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Item$1, {
							id: "geral",
							title: "Informações Gerais",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Grid$2, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$3, {
									label: "Código",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: micro.codigo ?? "",
										readOnly: true,
										className: "w-full rounded-md border border-input bg-white px-2 py-1.5 text-[12.5px] outline-none focus:border-vibra-600 focus:ring-2 focus:ring-vibra-600/15 bg-vibra-50/60"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$3, {
									label: "Status",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PicklistField, {
										categoria: "Status de Microprocesso",
										value: draft.status,
										onChange: (v) => {
											setDraft((d) => ({
												...d,
												status: v
											}));
											persist({ status: v });
										}
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$3, {
									label: "Prioridade",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PicklistField, {
										categoria: "Prioridade",
										value: draft.prioridade,
										onChange: (v) => {
											setDraft((d) => ({
												...d,
												prioridade: v
											}));
											persist({ prioridade: v });
										}
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$3, {
									label: "Categoria",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { ...bind("categoria") })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$3, {
									label: "Área Responsável",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PicklistField, {
										categoria: "Área",
										value: draft.area_responsavel,
										onChange: (v) => {
											setDraft((d) => ({
												...d,
												area_responsavel: v
											}));
											persist({ area_responsavel: v });
										}
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$3, {
									label: "Responsável",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PicklistField, {
										categoria: "Perfil Vinculado",
										value: draft.responsavel_id,
										onChange: (v) => {
											setDraft((d) => ({
												...d,
												responsavel_id: v
											}));
											persist({ responsavel_id: v });
										}
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$3, {
									label: "Líder",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PicklistField, {
										categoria: "Líder",
										value: draft.lider_id,
										onChange: (v) => {
											setDraft((d) => ({
												...d,
												lider_id: v
											}));
											persist({ lider_id: v });
										}
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$3, {
									label: "Sponsor",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PicklistField, {
										categoria: "Sponsor",
										value: draft.sponsor_id,
										onChange: (v) => {
											setDraft((d) => ({
												...d,
												sponsor_id: v
											}));
											persist({ sponsor_id: v });
										}
									})
								})
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Grid$2, {
								cols: 1,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$3, {
										label: "Descrição",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
											rows: 2,
											...bind("descricao")
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$3, {
										label: "Objetivo",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
											rows: 2,
											...bind("objetivo")
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$3, {
										label: "Justificativa",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
											rows: 2,
											...bind("justificativa")
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$3, {
										label: "Escopo",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
											rows: 2,
											...bind("escopo")
										})
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item$1, {
							id: "cron",
							title: "Cronograma",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Grid$2, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$3, {
									label: "Data Início",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "date",
										...bind("data_inicio")
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$3, {
									label: "Data Fim Prevista",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "date",
										...bind("data_fim_prevista")
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$3, {
									label: "Data Fim Real",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "date",
										...bind("data_fim_real")
									})
								})
							] })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item$1, {
							id: "ind",
							title: "Indicadores",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Grid$2, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$3, {
									label: "Baseline Atual",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "number",
										step: "0.01",
										...bind("baseline_atual", { number: true })
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$3, {
									label: "Meta Futura",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "number",
										step: "0.01",
										...bind("meta_futura", { number: true })
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$3, {
									label: "Valor Atual",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "number",
										step: "0.01",
										...bind("valor_atual", { number: true })
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$3, {
									label: "Valor Projetado",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "number",
										step: "0.01",
										...bind("valor_projetado", { number: true })
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$3, {
									label: "% Evolução",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "number",
										step: "0.01",
										...bind("percentual_evolucao", { number: true })
									})
								})
							] })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item$1, {
							id: "opind",
							title: "Indicadores Operacionais",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Grid$2, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$3, {
									label: "Lead Time Atual",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "number",
										step: "0.01",
										...bind("lead_time_atual", { number: true })
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$3, {
									label: "Lead Time Futuro",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "number",
										step: "0.01",
										...bind("lead_time_futuro", { number: true })
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$3, {
									label: "Volume Atual",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "number",
										step: "0.01",
										...bind("volume_atual", { number: true })
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$3, {
									label: "Volume Futuro",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "number",
										step: "0.01",
										...bind("volume_futuro", { number: true })
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$3, {
									label: "HC Atual",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "number",
										step: "0.01",
										...bind("hc_atual", { number: true })
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$3, {
									label: "HC Futuro",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "number",
										step: "0.01",
										...bind("hc_futuro", { number: true })
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$3, {
									label: "Custo Atual (R$)",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "number",
										step: "0.01",
										...bind("custo_atual", { number: true })
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$3, {
									label: "Custo Futuro (R$)",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "number",
										step: "0.01",
										...bind("custo_futuro", { number: true })
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$3, {
									label: "Saving Previsto (R$)",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "number",
										step: "0.01",
										...bind("saving_previsto", { number: true })
									})
								})
							] })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Item$1, {
							id: "map",
							title: "Mapeamento (AS IS / TO BE / SIPOC / Diagnóstico)",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] text-muted-foreground",
								children: "Mapeamento detalhado disponível na próxima fase (Fase 3 — Mapeamento por nível). Por enquanto, registre o essencial nos campos abaixo."
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Grid$2, {
								cols: 1,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$3, {
										label: "Fluxo Atual (AS IS)",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
											rows: 2,
											...bind("asis_fluxo")
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$3, {
										label: "Fluxo Futuro (TO BE)",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
											rows: 2,
											...bind("tobe_fluxo")
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$3, {
										label: "Problema (Diagnóstico)",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
											rows: 2,
											...bind("diag_problema")
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$3, {
										label: "Causa Raiz",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
											rows: 2,
											...bind("diag_causa_raiz")
										})
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Item$1, {
							id: "tar",
							title: `Tarefas (${tarefasMP.length})`,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mb-2 flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[11px] text-muted-foreground",
										children: "Lista de tarefas operacionais do microprocesso."
									}), !isAddingTarefa ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => setIsAddingTarefa(true),
										className: "inline-flex items-center gap-1 rounded-md bg-purple-700 px-2.5 py-1 text-[11px] font-bold text-white hover:bg-purple-800",
										children: "+ Nova Tarefa"
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => setIsAddingTarefa(false),
										className: "inline-flex items-center gap-1 rounded-md bg-gray-200 px-2.5 py-1 text-[11px] font-bold text-gray-700 hover:bg-gray-300",
										children: "Cancelar"
									})]
								}),
								isAddingTarefa && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mb-3 flex items-center gap-2 rounded-md border border-purple-200 bg-purple-50/50 p-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										className: "flex-1 rounded border border-border bg-white px-2 py-1 text-[12px] outline-none focus:border-purple-700",
										placeholder: "Título da nova tarefa...",
										value: newTarefaTitulo,
										onChange: (e) => setNewTarefaTitulo(e.target.value),
										onKeyDown: (e) => {
											if (e.key === "Enter") {
												novaTarefaNoMicro(newTarefaTitulo);
												setNewTarefaTitulo("");
												setIsAddingTarefa(false);
											}
										},
										autoFocus: true
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => {
											if (newTarefaTitulo.trim()) {
												novaTarefaNoMicro(newTarefaTitulo);
												setNewTarefaTitulo("");
												setIsAddingTarefa(false);
											}
										},
										className: "rounded bg-purple-700 px-2.5 py-1 text-[11px] font-bold text-white hover:bg-purple-800",
										children: "Adicionar"
									})]
								}),
								tarefasMP.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11.5px] italic text-muted-foreground",
									children: "Nenhuma tarefa vinculada a este microprocesso ainda. Clique em \"+ Nova Tarefa\"."
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "space-y-1",
									children: tarefasMP.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between rounded-md border border-border bg-white px-3 py-2 text-[12px]",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "truncate font-semibold text-vibra-800",
											children: t.titulo
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "rounded-full bg-vibra-50 px-1.5 py-0.5 text-[10px] font-bold text-vibra-700",
											children: t.status ?? "—"
										})]
									}, t.id))
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Item$1, {
							id: "anex",
							title: `Anexos (${anexos.length})`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "flex cursor-pointer items-center justify-center gap-2 rounded-md border border-dashed border-vibra-300 bg-vibra-50/40 px-3 py-3 text-[12px] font-semibold text-vibra-700 hover:bg-vibra-50",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "h-4 w-4" }),
									" Enviar arquivo (máx 10MB)",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "file",
										hidden: true,
										onChange: (e) => e.target.files?.[0] && uploadFile(e.target.files[0])
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-2 space-y-1",
								children: [anexos.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between gap-2 rounded-md border border-border bg-white px-3 py-2 text-[12px]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => downloadAnexo(a),
										className: "flex min-w-0 items-center gap-2 text-left",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "h-3.5 w-3.5 text-vibra-700" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "truncate text-vibra-800 hover:underline",
											children: a.nome
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2 text-[10.5px] text-muted-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [((a.tamanho_bytes ?? 0) / 1024).toFixed(0), " KB"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => removeAnexo(a),
											className: "text-destructive",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" })
										})]
									})]
								}, a.id)), anexos.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11.5px] italic text-muted-foreground",
									children: "Nenhum anexo."
								})]
							})]
						})
					]
				})
			})] })
		})
	});
}
function Item$1({ id, title, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AccordionItem, {
		value: id,
		className: "rounded-lg border border-border bg-white shadow-vibra-sm",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionTrigger, {
			className: "px-3 py-2 text-[12.5px] font-bold text-vibra-800 hover:no-underline",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionContent, {
			className: "px-3 pb-3",
			children
		})]
	});
}
function Grid$2({ children, cols = 2 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: `grid ${cols === 1 ? "grid-cols-1" : cols === 3 ? "grid-cols-3" : "grid-cols-2"} gap-2`,
		children
	});
}
function Field$3({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "block text-[10px] font-semibold uppercase tracking-wider text-vibra-700",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-0.5",
			children
		})]
	});
}
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var converterIniciativaParaMicroprocesso = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator(objectType({
	iniciativaId: stringType(),
	destinoIniciativaId: stringType()
})).handler(createSsrRpc("0a6355e454dacf856f8f243545dbe3ef18acd20c763792023a4c922dfcdd5a0e"));
function CalculatedField({ label, value, formulaName, expression, description }) {
	const [showTooltip, setShowTooltip] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative block",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "block text-[10px] font-semibold uppercase tracking-wider text-vibra-700",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative mt-0.5 flex h-9 w-full cursor-help items-center justify-between rounded-md border border-amber-200 bg-amber-50 px-2.5 text-[12.5px] font-bold text-vibra-950 shadow-sm transition-all hover:bg-amber-100/70",
			onMouseEnter: () => setShowTooltip(true),
			onMouseLeave: () => setShowTooltip(false),
			onTouchStart: () => setShowTooltip(!showTooltip),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-mono text-[13px]",
					children: value
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleQuestionMark, { className: "h-3.5 w-3.5 text-amber-600 shrink-0" }),
				showTooltip && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "absolute bottom-full left-1/2 z-50 mb-2 w-72 -translate-x-1/2 rounded-lg border border-amber-200 bg-amber-50 p-3 text-[11px] font-normal leading-relaxed text-neutral-800 shadow-xl backdrop-blur-sm animate-in fade-in slide-in-from-bottom-1 duration-150",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1 border-b border-amber-200/60 pb-1.5 font-bold text-amber-900 uppercase tracking-wide text-[10px]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Formula:" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formulaName })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 font-mono text-[10px] bg-white/70 rounded p-1.5 border border-amber-100 text-amber-950 break-words",
							children: expression
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-neutral-600 text-[11px]",
							children: description
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-full left-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1 rotate-45 border-r border-b border-amber-200 bg-amber-50" })
					]
				})
			]
		})]
	});
}
var inputCls = "w-full rounded-md border border-input bg-white px-2 py-1.5 text-[12.5px] outline-none focus:border-vibra-600 focus:ring-2 focus:ring-vibra-600/15";
function InitiativeDrawer({ initiativeId, onClose }) {
	const qc = useQueryClient();
	const confirm = useConfirm();
	const converterIniciativa = useServerFn(converterIniciativaParaMicroprocesso);
	const [draft, setDraft] = (0, import_react.useState)({});
	const [openMicroId, setOpenMicroId] = (0, import_react.useState)(null);
	const [convOpen, setConvOpen] = (0, import_react.useState)(false);
	const [convQuery, setConvQuery] = (0, import_react.useState)("");
	const [convList, setConvList] = (0, import_react.useState)([]);
	const [convDestino, setConvDestino] = (0, import_react.useState)(null);
	const [converting, setConverting] = (0, import_react.useState)(false);
	const [isAddingAcao, setIsAddingAcao] = (0, import_react.useState)(false);
	const [newAcaoTitulo, setNewAcaoTitulo] = (0, import_react.useState)("");
	const [isAddingMicro, setIsAddingMicro] = (0, import_react.useState)(false);
	const [newMicroTitulo, setNewMicroTitulo] = (0, import_react.useState)("");
	const { data: ini } = useQuery({
		queryKey: ["ini-full", initiativeId],
		enabled: !!initiativeId,
		queryFn: async () => {
			const { data, error } = await supabase.from("iniciativas").select("*").eq("id", initiativeId).maybeSingle();
			if (error) throw error;
			return data;
		}
	});
	(0, import_react.useEffect)(() => {
		setDraft(ini ?? {});
	}, [ini]);
	const { data: processos = [] } = useQuery({
		queryKey: ["drawer-projetos"],
		queryFn: async () => (await supabase.from("projetos").select("id,nome").is("deleted_at", null)).data ?? []
	});
	const { data: profiles = [] } = useQuery({
		queryKey: ["drawer-profiles"],
		queryFn: async () => (await supabase.from("profiles").select("id,nome,email")).data ?? []
	});
	const { data: acoes = [] } = useQuery({
		queryKey: ["drawer-acoes", initiativeId],
		enabled: !!initiativeId,
		queryFn: async () => (await supabase.from("tarefas").select("*").eq("iniciativa_id", initiativeId)).data ?? []
	});
	const { data: riscos = [] } = useQuery({
		queryKey: ["drawer-riscos", initiativeId],
		enabled: !!initiativeId,
		queryFn: async () => (await supabase.from("riscos").select("nivel,classificacao").eq("iniciativa_id", initiativeId)).data ?? []
	});
	const { data: kaizens = [] } = useQuery({
		queryKey: ["drawer-kaizen", initiativeId],
		enabled: !!initiativeId,
		queryFn: async () => (await supabase.from("kaizen").select("id").eq("iniciativa_id", initiativeId)).data ?? []
	});
	const { data: anexos = [] } = useQuery({
		queryKey: ["drawer-anexos", initiativeId],
		enabled: !!initiativeId,
		queryFn: async () => (await supabase.from("anexos").select("*").eq("iniciativa_id", initiativeId).order("created_at", { ascending: false })).data ?? []
	});
	const { data: micros = [] } = useQuery({
		queryKey: ["micros-by-ini", initiativeId],
		enabled: !!initiativeId,
		queryFn: async () => (await supabase.from("microprocessos").select("id,codigo,titulo,status,prioridade,percentual_avanco,data_fim_prevista").eq("iniciativa_id", initiativeId).is("deleted_at", null).order("created_at", { ascending: false })).data ?? []
	});
	async function criarMicroprocesso(titulo) {
		if (!initiativeId || !titulo.trim()) return;
		const { data: { user } } = await supabase.auth.getUser();
		const { data, error } = await supabase.from("microprocessos").insert({
			iniciativa_id: initiativeId,
			titulo: titulo.trim(),
			status: "Não iniciado",
			created_by: user?.id
		}).select("id").maybeSingle();
		if (error) return toast.error(error.message);
		toast.success("Microprocesso criado");
		qc.invalidateQueries({ queryKey: ["micros-by-ini", initiativeId] });
		if (data?.id) setOpenMicroId(data.id);
	}
	async function criarAcao(titulo) {
		if (!initiativeId || !titulo.trim()) return;
		const { data: { user } } = await supabase.auth.getUser();
		const { error } = await supabase.from("tarefas").insert({
			iniciativa_id: initiativeId,
			titulo: titulo.trim(),
			status: "Pendente",
			created_by: user?.id
		});
		if (error) return toast.error(error.message);
		toast.success("Ação criada com sucesso");
		qc.invalidateQueries();
	}
	async function deletarAcao(id) {
		if (!await confirm("Excluir ação?", "Tem certeza que deseja excluir esta ação permanentemente?")) return;
		if (await deleteTaskSimple(id, qc)) qc.invalidateQueries();
	}
	async function abrirConverter() {
		if (!initiativeId || !ini) return;
		const { data: candidatas, error } = await supabase.from("iniciativas").select("id,codigo,titulo").neq("id", initiativeId).is("deleted_at", null).order("titulo").limit(2e3);
		if (error) return toast.error(error.message);
		const lista = candidatas ?? [];
		if (lista.length === 0) return toast.error("Não há outra iniciativa para receber este microprocesso.");
		setConvList(lista);
		setConvDestino(null);
		setConvQuery("");
		setConvOpen(true);
	}
	async function confirmarConversao(destino) {
		const alvo = destino ?? convDestino;
		if (!alvo) return toast.error("Selecione uma iniciativa de destino.");
		if (!initiativeId || !ini || converting) return;
		setConverting(true);
		try {
			await converterIniciativa({ data: {
				iniciativaId: initiativeId,
				destinoIniciativaId: alvo.id
			} });
			toast.success("Convertido em microprocesso");
			setConvOpen(false);
			setConvDestino(null);
			qc.invalidateQueries();
			onClose();
		} catch (err) {
			toast.error(err?.message ?? "Erro ao converter iniciativa.");
		} finally {
			setConverting(false);
		}
	}
	const score = (0, import_react.useMemo)(() => {
		const i = draft.impacto_negocio ?? 0, c = draft.impacto_cliente ?? 0, f = draft.impacto_financeiro ?? 0;
		const e = draft.esforco ?? 0, x = draft.complexidade ?? 0;
		const num = Number(i) + Number(c) + Number(f);
		const den = Number(e) + Number(x);
		if (!den) return num ? Number(num).toFixed(2) : "0";
		return (num / den * 10).toFixed(2);
	}, [
		draft.impacto_negocio,
		draft.impacto_cliente,
		draft.impacto_financeiro,
		draft.esforco,
		draft.complexidade
	]);
	const roi = (0, import_react.useMemo)(() => {
		const g = Number(draft.saving_realizado ?? draft.saving_previsto ?? 0);
		const inv = Number(draft.custo_implementacao ?? 0);
		if (!inv) return "—";
		return ((g - inv) / inv * 100).toFixed(1) + "%";
	}, [
		draft.saving_realizado,
		draft.saving_previsto,
		draft.custo_implementacao
	]);
	const numCrit = riscos.filter((r) => (r.nivel ?? r.classificacao) === "Crítico").length;
	const numAlto = riscos.filter((r) => (r.nivel ?? r.classificacao) === "Alto").length;
	const numBaixo = riscos.filter((r) => (r.nivel ?? r.classificacao) === "Baixo").length;
	const acoesAbertas = acoes.filter((a) => (a.status ?? "") !== "Concluída" && (a.status ?? "") !== "Cancelada").length;
	async function persist(patch) {
		if (!initiativeId) return;
		const { error } = await supabase.from("iniciativas").update(patch).eq("id", initiativeId);
		if (error) toast.error(error.message);
		else {
			qc.invalidateQueries({ queryKey: ["ini-full", initiativeId] });
			qc.invalidateQueries({ queryKey: ["kanban-ini"] });
		}
	}
	async function excluirIniciativa() {
		if (!initiativeId) return;
		if (!await confirm("Excluir iniciativa?", `Deseja realmente EXCLUIR PERMANENTEMENTE a iniciativa "${draft.titulo ?? ini?.titulo ?? ""}" e todas as suas tarefas, microprocessos e anexos vinculados? Esta ação é irreversível!`)) return;
		if (await deleteInitiativeCascade(initiativeId, qc)) onClose();
	}
	function bind(field, opts) {
		return {
			value: draft[field] ?? "",
			onChange: (e) => setDraft((d) => ({
				...d,
				[field]: e.target.value
			})),
			onBlur: async (e) => {
				let v = e.target.value;
				if (opts?.number) v = v === "" ? null : Number(v);
				if (opts?.date) v = v === "" ? null : v;
				if (v === ini?.[field]) return;
				await persist({ [field]: v });
			},
			className: inputCls
		};
	}
	async function saveAll() {
		if (!initiativeId) return;
		const allowed = [
			"titulo",
			"descricao",
			"as_is",
			"to_be",
			"solucao_proposta",
			"tipo_melhoria",
			"status",
			"prioridade",
			"impacto_negocio",
			"impacto_cliente",
			"impacto_financeiro",
			"esforco",
			"complexidade",
			"lider_id",
			"sponsor_id",
			"analista_id",
			"responsavel_id",
			"percentual_avanco",
			"data_implantacao",
			"data_inicio",
			"data_inicio_real",
			"data_fim_prevista",
			"data_fim_real",
			"hc_atual",
			"fte_participacao",
			"hc_estimado",
			"hc_alcancado",
			"hc_liberado",
			"saving_previsto",
			"saving_realizado",
			"custo_implementacao",
			"impactos_qualitativos",
			"memoria_roi",
			"impedimento",
			"decisoes_tomadas",
			"projeto_id",
			"observacoes"
		];
		const patch = {};
		for (const k of allowed) if (draft[k] !== void 0) patch[k] = draft[k];
		const { error } = await supabase.from("iniciativas").update(patch).eq("id", initiativeId);
		if (error) toast.error(error.message);
		else {
			toast.success("Iniciativa salva");
			qc.invalidateQueries({ queryKey: ["ini-full", initiativeId] });
		}
	}
	async function uploadFile(file) {
		if (!initiativeId) return;
		if (file.size > 10 * 1024 * 1024) return toast.error("Máx 10MB");
		const path = `${initiativeId}/${Date.now()}_${file.name}`;
		const { error: upErr } = await supabase.storage.from("anexos").upload(path, file);
		if (upErr) return toast.error(upErr.message);
		const { data: { user } } = await supabase.auth.getUser();
		const { error } = await supabase.from("anexos").insert({
			iniciativa_id: initiativeId,
			nome: file.name,
			url: path,
			tamanho_bytes: file.size,
			mime_type: file.type,
			uploaded_by: user?.id
		});
		if (error) toast.error(error.message);
		else {
			toast.success("Anexo enviado");
			qc.invalidateQueries({ queryKey: ["drawer-anexos", initiativeId] });
		}
	}
	async function downloadAnexo(a) {
		const { data, error } = await supabase.storage.from("anexos").createSignedUrl(a.url, 60);
		if (error) return toast.error(error.message);
		window.open(data.signedUrl, "_blank");
	}
	async function removeAnexo(a) {
		await supabase.storage.from("anexos").remove([a.url]);
		await supabase.from("anexos").delete().eq("id", a.id);
		qc.invalidateQueries({ queryKey: ["drawer-anexos", initiativeId] });
	}
	const procNome = processos.find((p) => p.id === draft.projeto_id)?.nome ?? "—";
	const badge = prazoBadge(prazoStatus(draft.data_fim_prevista, draft.status));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, {
		modal: false,
		open: !!initiativeId,
		onOpenChange: (o) => !o && onClose(),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetContent, {
			side: "right",
			className: "w-full max-w-[760px] overflow-y-auto p-0 sm:max-w-[760px]",
			children: ini && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "sticky top-0 z-10 border-b border-border bg-vibra-50 px-5 py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 text-[10.5px] font-semibold uppercase tracking-widest text-vibra-700",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "h-2 w-6 rounded",
										style: { background: colorForId(draft.projeto_id) }
									}),
									procNome,
									" · ",
									ini.codigo,
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `ml-1 rounded-full px-1.5 py-0.5 text-[9.5px] font-bold ${badge.cls}`,
										children: badge.label
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								...bind("titulo"),
								className: "mt-1 w-full bg-transparent text-[16px] font-bold text-vibra-800 outline-none focus:bg-white/60 rounded px-1"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PresenceAvatars, { initiativeId }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: abrirConverter,
									title: "Converter em microprocesso de outra iniciativa",
									className: "inline-flex items-center gap-1 rounded-md border border-purple-300 bg-white px-2.5 py-1 text-[11.5px] font-bold text-purple-700 hover:bg-purple-50",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Workflow, { className: "h-3.5 w-3.5" }), "Converter em Microprocesso"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: saveAll,
									className: "inline-flex items-center gap-1 rounded-md bg-vibra-700 px-2.5 py-1 text-[11.5px] font-bold text-white hover:bg-vibra-800",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "h-3.5 w-3.5" }), "Salvar"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: excluirIniciativa,
									title: "Excluir iniciativa permanentemente",
									className: "inline-flex items-center gap-1.5 rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-[11.5px] font-extrabold text-red-600 hover:bg-red-100 hover:border-red-300 transition-colors",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" }), "Excluir"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: onClose,
									className: "rounded-md p-1 text-muted-foreground hover:bg-white/60",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
								})
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2 h-1.5 rounded-full bg-white",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-1.5 rounded-full bg-vibra-600",
							style: { width: `${Math.min(100, Number(draft.percentual_avanco ?? 0))}%` }
						})
					})]
				}),
				convOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "border-b border-purple-200 bg-purple-50/70 px-5 py-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-lg border border-purple-200 bg-white p-3 shadow-vibra-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-2 flex items-center justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-[13px] font-bold text-vibra-800",
								children: "Selecionar iniciativa de destino"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setConvOpen(false),
								className: "rounded p-1 text-muted-foreground hover:bg-muted",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-2 md:grid-cols-[1fr_auto]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: convQuery,
										onChange: (e) => setConvQuery(e.target.value),
										placeholder: "Buscar por código ou título...",
										className: inputCls
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										value: convDestino?.id ?? "",
										onChange: (e) => setConvDestino(convList.find((it) => it.id === e.target.value) ?? null),
										className: inputCls,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "",
											children: "Selecione uma iniciativa..."
										}), convList.filter((it) => {
											const q = convQuery.toLowerCase().trim();
											if (!q) return true;
											return (it.titulo ?? "").toLowerCase().includes(q) || (it.codigo ?? "").toLowerCase().includes(q);
										}).map((it) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
											value: it.id,
											children: [
												it.codigo ?? "—",
												" · ",
												it.titulo
											]
										}, it.id))]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-[11px] text-muted-foreground",
										children: [convList.length, " iniciativas disponíveis"]
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								disabled: !convDestino || converting,
								onClick: () => confirmarConversao(),
								className: "h-9 self-end rounded-md bg-vibra-700 px-3 text-[11.5px] font-bold text-white hover:bg-vibra-800 disabled:cursor-not-allowed disabled:opacity-50",
								children: converting ? "Convertendo..." : "Confirmar conversão"
							})]
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "p-5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Accordion, {
						type: "multiple",
						defaultValue: ["identificacao"],
						className: "space-y-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
								id: "identificacao",
								title: "Identificação",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Grid$1, { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$2, {
										label: "ID / Código",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											value: ini.codigo ?? "",
											readOnly: true,
											className: "w-full rounded-md border border-input bg-white px-2 py-1.5 text-[12.5px] outline-none focus:border-vibra-600 focus:ring-2 focus:ring-vibra-600/15 bg-vibra-50/60"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$2, {
										label: "Nome",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { ...bind("titulo") })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$2, {
										label: "Status",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PicklistField, {
											categoria: "Status da Iniciativa",
											value: draft.status,
											onChange: (v) => {
												setDraft((d) => ({
													...d,
													status: v
												}));
												persist({ status: v });
											}
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$2, {
										label: "Priorização",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PicklistField, {
											categoria: "Prioridade",
											value: draft.prioridade,
											onChange: (v) => {
												setDraft((d) => ({
													...d,
													prioridade: v
												}));
												persist({ prioridade: v });
											}
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$2, {
										label: "Tipo Melhoria",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PicklistField, {
											categoria: "Tipo de Melhoria",
											value: draft.tipo_melhoria,
											onChange: (v) => {
												setDraft((d) => ({
													...d,
													tipo_melhoria: v
												}));
												persist({ tipo_melhoria: v });
											}
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$2, {
										label: "Esforço (1-5)",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "number",
											min: 1,
											max: 5,
											...bind("esforco", { number: true })
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$2, {
										label: "Impacto Negócio (1-5)",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "number",
											min: 1,
											max: 5,
											...bind("impacto_negocio", { number: true })
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$2, {
										label: "Líder",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PicklistField, {
											categoria: "Líder",
											value: draft.lider_id,
											onChange: (v) => {
												setDraft((d) => ({
													...d,
													lider_id: v
												}));
												persist({ lider_id: v });
											}
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$2, {
										label: "Sponsor",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PicklistField, {
											categoria: "Sponsor",
											value: draft.sponsor_id,
											onChange: (v) => {
												setDraft((d) => ({
													...d,
													sponsor_id: v
												}));
												persist({ sponsor_id: v });
											}
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$2, {
										label: "Analista",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PicklistField, {
											categoria: "Analista",
											value: draft.analista_id,
											onChange: (v) => {
												setDraft((d) => ({
													...d,
													analista_id: v
												}));
												persist({ analista_id: v });
											}
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$2, {
										label: "% Avanço",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "number",
											min: 0,
											max: 100,
											...bind("percentual_avanco", { number: true })
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$2, {
										label: "Data Implantação",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "date",
											value: draft.data_implantacao ?? "",
											onChange: (e) => setDraft((d) => ({
												...d,
												data_implantacao: e.target.value
											})),
											onBlur: (e) => persist({ data_implantacao: e.target.value || null }),
											className: inputCls
										})
									})
								] })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
								id: "detalhamento",
								title: "Detalhamento",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Grid$1, {
									cols: 1,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$2, {
											label: "AS IS",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
												rows: 3,
												...bind("as_is")
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$2, {
											label: "TO BE",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
												rows: 3,
												...bind("to_be")
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$2, {
											label: "Solução Proposta",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
												rows: 3,
												...bind("solucao_proposta")
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$2, {
											label: "Tipo da Melhoria",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { ...bind("tipo_melhoria") })
										})
									]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
								id: "matriz",
								title: "Matriz de Priorização",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Grid$1, { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$2, {
										label: "Impacto Negócio (1-5)",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "number",
											min: 1,
											max: 5,
											...bind("impacto_negocio", { number: true })
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$2, {
										label: "Impacto Cliente (1-5)",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "number",
											min: 1,
											max: 5,
											...bind("impacto_cliente", { number: true })
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$2, {
										label: "Impacto Financeiro (1-5)",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "number",
											min: 1,
											max: 5,
											...bind("impacto_financeiro", { number: true })
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$2, {
										label: "Esforço (1-5)",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "number",
											min: 1,
											max: 5,
											...bind("esforco", { number: true })
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$2, {
										label: "Complexidade (1-5)",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "number",
											min: 1,
											max: 5,
											...bind("complexidade", { number: true })
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalculatedField, {
										label: "Score Inteligente",
										value: score,
										formulaName: "Score de Matriz ICE",
										expression: "(Impacto Negócio + Impacto Cliente + Impacto Financeiro) / (Esforço + Complexidade) * 10",
										description: "Métrica corporativa de priorização que pondera a soma de todos os impactos mapeados contra o esforço e a complexidade técnica informados para esta iniciativa."
									})
								] })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Item, {
								id: "prazos",
								title: "Prazos (Previsto × Real)",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Grid$1, { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$2, {
										label: "Data Prevista de Início",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "date",
											...bind("data_inicio", { date: true })
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$2, {
										label: "Data Prevista de Término",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "date",
											...bind("data_fim_prevista", { date: true })
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$2, {
										label: "Data de Início (real)",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "date",
											value: draft.data_inicio_real ?? "",
											onChange: (e) => setDraft((d) => ({
												...d,
												data_inicio_real: e.target.value
											})),
											onBlur: (e) => persist({ data_inicio_real: e.target.value || null }),
											className: inputCls
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$2, {
										label: "Data Final (real)",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "date",
											...bind("data_fim_real", { date: true })
										})
									})
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DateDeltaSummary, {
									inicioPrev: draft.data_inicio,
									inicioReal: draft.data_inicio_real,
									fimPrev: draft.data_fim_prevista,
									fimReal: draft.data_fim_real
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
								id: "hc",
								title: "Métricas HC (FTE)",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Grid$1, { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$2, {
										label: "HC Atual",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "number",
											step: "0.01",
											...bind("hc_atual", { number: true })
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$2, {
										label: "% Participação",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "number",
											step: "0.01",
											...bind("fte_participacao", { number: true })
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$2, {
										label: "HC Estimado",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "number",
											step: "0.01",
											...bind("hc_estimado", { number: true })
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$2, {
										label: "HC Alcançado",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "number",
											step: "0.01",
											...bind("hc_alcancado", { number: true })
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$2, {
										label: "HC Liberado",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "number",
											step: "0.01",
											...bind("hc_liberado", { number: true })
										})
									})
								] })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Item, {
								id: "fin",
								title: "Impactos Financeiros",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Grid$1, { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$2, {
										label: "Saving Previsto (R$)",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "number",
											step: "0.01",
											...bind("saving_previsto", { number: true })
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$2, {
										label: "Saving Realizado (R$)",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "number",
											step: "0.01",
											...bind("saving_realizado", { number: true })
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$2, {
										label: "Custo Implementação (R$)",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "number",
											step: "0.01",
											...bind("custo_implementacao", { number: true })
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalculatedField, {
										label: "ROI Realizado",
										value: roi,
										formulaName: "Retorno sobre Investimento",
										expression: "((Saving - Custo Implementação) / Custo Implementação) * 100",
										description: "Retorno percentual obtido com base no saving gerado (realizado ou previsto na falta do realizado) deduzido do custo total incorrido para implantação da melhoria."
									})
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Grid$1, {
									cols: 1,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$2, {
										label: "Impactos Qualitativos",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
											rows: 2,
											...bind("impactos_qualitativos")
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$2, {
										label: "Memória de Cálculo ROI",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
											rows: 2,
											...bind("memoria_roi")
										})
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Item, {
								id: "acoes",
								title: `Tarefas (${acoes.length} · ${acoesAbertas} abertas)`,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mb-2 flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[11px] text-muted-foreground",
											children: "Tarefas operacionais vinculadas diretamente a esta iniciativa."
										}), !isAddingAcao ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											onClick: () => setIsAddingAcao(true),
											className: "inline-flex items-center gap-1 rounded-md bg-vibra-700 px-2.5 py-1 text-[11px] font-bold text-white hover:bg-vibra-800",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3 w-3" }), " Nova Tarefa"]
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => setIsAddingAcao(false),
											className: "inline-flex items-center gap-1 rounded-md bg-gray-200 px-2.5 py-1 text-[11px] font-bold text-gray-700 hover:bg-gray-300",
											children: "Cancelar"
										})]
									}),
									isAddingAcao && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mb-3 flex items-center gap-2 rounded-md border border-vibra-200 bg-vibra-50/50 p-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "text",
											className: "flex-1 rounded border border-border bg-white px-2 py-1 text-[12px] outline-none focus:border-vibra-700",
											placeholder: "Título da nova tarefa...",
											value: newAcaoTitulo,
											onChange: (e) => setNewAcaoTitulo(e.target.value),
											onKeyDown: (e) => {
												if (e.key === "Enter") {
													criarAcao(newAcaoTitulo);
													setNewAcaoTitulo("");
													setIsAddingAcao(false);
												}
											},
											autoFocus: true
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => {
												if (newAcaoTitulo.trim()) {
													criarAcao(newAcaoTitulo);
													setNewAcaoTitulo("");
													setIsAddingAcao(false);
												}
											},
											className: "rounded bg-vibra-700 px-2.5 py-1 text-[11px] font-bold text-white hover:bg-vibra-800",
											children: "Adicionar"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1.5",
										children: [acoes.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[11.5px] italic text-muted-foreground",
											children: "Nenhuma tarefa cadastrada."
										}), acoes.map((a) => {
											const resp = a.responsavel_id ?? "—";
											return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center justify-between gap-2 rounded-md border border-border bg-white px-3 py-2 text-[12px]",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "min-w-0 flex-1",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex items-center gap-2",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "truncate font-semibold text-vibra-800",
															children: a.titulo
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "rounded-full bg-vibra-50 px-1.5 py-0.5 text-[10px] font-bold text-vibra-700",
															children: a.status ?? "—"
														})]
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
														className: "text-[10.5px] text-muted-foreground mt-0.5",
														children: [
															"Resp.: ",
															resp,
															" · Gerência: ",
															a.gerencia ?? "—",
															" · Diretoria:",
															" ",
															a.diretoria ?? "—"
														]
													})]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													onClick: () => deletarAcao(a.id),
													title: "Excluir tarefa",
													className: "rounded p-1 text-red-600 hover:bg-red-50",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" })
												})]
											}, a.id);
										})]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Item, {
								id: "micros",
								title: `Microprocessos (${micros.length})`,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mb-2 flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[11px] text-muted-foreground",
											children: "Camada entre Iniciativa e Tarefa. Cada microprocesso tem mapeamento, indicadores e tarefas próprias."
										}), !isAddingMicro ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											onClick: () => setIsAddingMicro(true),
											className: "inline-flex items-center gap-1 rounded-md bg-purple-700 px-2.5 py-1 text-[11px] font-bold text-white hover:bg-purple-800",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3 w-3" }), " Novo Microprocesso"]
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => setIsAddingMicro(false),
											className: "inline-flex items-center gap-1 rounded-md bg-gray-200 px-2.5 py-1 text-[11px] font-bold text-gray-700 hover:bg-gray-300",
											children: "Cancelar"
										})]
									}),
									isAddingMicro && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mb-3 flex items-center gap-2 rounded-md border border-purple-200 bg-purple-50/50 p-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "text",
											className: "flex-1 rounded border border-border bg-white px-2 py-1 text-[12px] outline-none focus:border-purple-700",
											placeholder: "Nome do novo microprocesso...",
											value: newMicroTitulo,
											onChange: (e) => setNewMicroTitulo(e.target.value),
											onKeyDown: (e) => {
												if (e.key === "Enter") {
													criarMicroprocesso(newMicroTitulo);
													setNewMicroTitulo("");
													setIsAddingMicro(false);
												}
											},
											autoFocus: true
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => {
												if (newMicroTitulo.trim()) {
													criarMicroprocesso(newMicroTitulo);
													setNewMicroTitulo("");
													setIsAddingMicro(false);
												}
											},
											className: "rounded bg-purple-700 px-2.5 py-1 text-[11px] font-bold text-white hover:bg-purple-800",
											children: "Adicionar"
										})]
									}),
									micros.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[11.5px] italic text-muted-foreground",
										children: "Nenhum microprocesso cadastrado."
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "space-y-1.5",
										children: micros.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "group flex w-full items-center justify-between gap-2 rounded-md border border-border bg-white px-3 py-2 text-left text-[12px] hover:border-purple-400 hover:bg-purple-50/40",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												onClick: () => setOpenMicroId(m.id),
												className: "min-w-0 flex flex-1 items-center gap-2 text-left",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Workflow, { className: "h-3.5 w-3.5 text-purple-700 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "min-w-0",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "truncate font-bold text-vibra-800",
														children: m.titulo
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
														className: "text-[10px] text-muted-foreground",
														children: [
															m.codigo,
															" · ",
															m.status ?? "—",
															" · ",
															m.prioridade ?? "—"
														]
													})]
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-2",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "w-16 h-1.5 rounded-full bg-muted",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
															className: "h-1.5 rounded-full bg-purple-600",
															style: { width: `${Math.min(100, Number(m.percentual_avanco ?? 0))}%` }
														})
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "text-[10px] font-bold text-purple-800 w-8 text-right",
														children: [Math.round(Number(m.percentual_avanco ?? 0)), "%"]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														title: "Editar",
														onClick: () => setOpenMicroId(m.id),
														className: "rounded p-1 text-purple-700 hover:bg-purple-100",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-3.5 w-3.5" })
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														title: "Excluir",
														onClick: async () => {
															if (!await confirm("Excluir microprocesso?", `Deseja excluir permanentemente o microprocesso "${m.titulo}" e todas as suas tarefas vinculadas? Esta ação é irreversível!`)) return;
															await deleteMicroprocessCascade(m.id, qc, initiativeId);
														},
														className: "rounded p-1 text-red-600 hover:bg-red-50",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" })
													})
												]
											})]
										}, m.id))
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Item, {
								id: "obs",
								title: "Observações",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Grid$1, { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$2, {
										label: "Riscos Críticos",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											value: numCrit,
											readOnly: true,
											className: "w-full rounded-md border border-input bg-white px-2 py-1.5 text-[12.5px] outline-none focus:border-vibra-600 focus:ring-2 focus:ring-vibra-600/15 bg-red-50 font-bold"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$2, {
										label: "Riscos Altos",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											value: numAlto,
											readOnly: true,
											className: "w-full rounded-md border border-input bg-white px-2 py-1.5 text-[12.5px] outline-none focus:border-vibra-600 focus:ring-2 focus:ring-vibra-600/15 bg-orange-50 font-bold"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$2, {
										label: "Riscos Baixos",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											value: numBaixo,
											readOnly: true,
											className: "w-full rounded-md border border-input bg-white px-2 py-1.5 text-[12.5px] outline-none focus:border-vibra-600 focus:ring-2 focus:ring-vibra-600/15 bg-green-50 font-bold"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$2, {
										label: "Nº Kaizens",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											value: kaizens.length,
											readOnly: true,
											className: "w-full rounded-md border border-input bg-white px-2 py-1.5 text-[12.5px] outline-none focus:border-vibra-600 focus:ring-2 focus:ring-vibra-600/15 bg-vibra-50 font-bold"
										})
									})
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Grid$1, {
									cols: 1,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$2, {
											label: "Observações",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
												rows: 3,
												...bind("observacoes"),
												placeholder: "Anotações, comentários ou observações gerais sobre esta iniciativa..."
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$2, {
											label: "Impedimento",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
												rows: 2,
												...bind("impedimento")
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$2, {
											label: "Retorno Esperado",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
												rows: 2,
												value: draft.retorno_esperado ?? "",
												onChange: (e) => setDraft((d) => ({
													...d,
													retorno_esperado: e.target.value
												})),
												onBlur: (e) => persist({ retorno_esperado: e.target.value }),
												className: inputCls
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$2, {
											label: "Decisões Tomadas",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
												rows: 2,
												...bind("decisoes_tomadas")
											})
										})
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Item, {
								id: "map",
								title: "Mapeamento",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grid$1, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$2, {
									label: "% Andamento",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "number",
										min: 0,
										max: 100,
										...bind("percentual_avanco", { number: true })
									})
								}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-2 text-[11px] text-muted-foreground",
									children: [
										"Use a aba ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Evolução" }),
										" para visão consolidada de iniciativas mapeadas / em andamento / implementadas."
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Item, {
								id: "proc",
								title: "Processo (vinculação)",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$2, {
									label: "Processo pai",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										value: draft.projeto_id ?? "",
										onChange: (e) => {
											const v = e.target.value || null;
											setDraft((d) => ({
												...d,
												projeto_id: v
											}));
											persist({ projeto_id: v });
										},
										className: inputCls,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "",
											children: "— selecione —"
										}), processos.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: p.id,
											children: p.nome
										}, p.id))]
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-[11px] text-muted-foreground",
									children: "A cor da barra do card será atualizada automaticamente conforme o processo selecionado."
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Item, {
								id: "anexos",
								title: `Anexos (${anexos.length})`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "flex cursor-pointer items-center justify-center gap-2 rounded-md border border-dashed border-vibra-300 bg-vibra-50/40 px-3 py-3 text-[12px] font-semibold text-vibra-700 hover:bg-vibra-50",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "h-4 w-4" }),
										" Enviar arquivo (PDF/DOC/XLS/PNG · máx 10MB)",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "file",
											hidden: true,
											accept: ".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg",
											onChange: (e) => e.target.files?.[0] && uploadFile(e.target.files[0])
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-2 space-y-1",
									children: [anexos.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between gap-2 rounded-md border border-border bg-white px-3 py-2 text-[12px]",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											onClick: () => downloadAnexo(a),
											className: "flex min-w-0 items-center gap-2 text-left",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "h-3.5 w-3.5 text-vibra-700" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "truncate text-vibra-800 hover:underline",
												children: a.nome
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2 text-[10.5px] text-muted-foreground",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [(a.tamanho_bytes / 1024).toFixed(0), " KB"] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: new Date(a.created_at).toLocaleDateString("pt-BR") }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													onClick: () => removeAnexo(a),
													className: "text-destructive",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" })
												})
											]
										})]
									}, a.id)), anexos.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[11.5px] italic text-muted-foreground",
										children: "Nenhum anexo."
									})]
								})]
							})
						]
					})
				})
			] })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MicroprocessoDrawer, {
			microId: openMicroId,
			onClose: () => setOpenMicroId(null)
		})]
	});
}
function Item({ id, title, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AccordionItem, {
		value: id,
		className: "rounded-lg border border-border bg-white shadow-vibra-sm",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionTrigger, {
			className: "px-3 py-2 text-[12.5px] font-bold text-vibra-800 hover:no-underline",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionContent, {
			className: "px-3 pb-3",
			children
		})]
	});
}
function Grid$1({ children, cols = 2 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: `grid ${cols === 1 ? "grid-cols-1" : cols === 3 ? "grid-cols-3" : "grid-cols-2"} gap-2`,
		children
	});
}
function Field$2({ label, tip, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "block text-[10px] font-semibold uppercase tracking-wider text-vibra-700",
			title: tip,
			children: [label, tip && " ⓘ"]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-0.5",
			children
		})]
	});
}
function diffDias(a, b) {
	if (!a || !b) return null;
	const da = new Date(a).getTime();
	const db = new Date(b).getTime();
	if (isNaN(da) || isNaN(db)) return null;
	return Math.round((db - da) / (1e3 * 60 * 60 * 24));
}
function DeltaBadge({ dias, label }) {
	if (dias === null) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold text-muted-foreground",
		children: [label, ": aguardando real"]
	});
	if (dias === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-700",
		children: [label, ": no prazo"]
	});
	if (dias < 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "rounded-full bg-sky-100 px-2 py-0.5 text-[10px] font-bold text-sky-700",
		children: [
			label,
			": ",
			Math.abs(dias),
			"d adiantado"
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "rounded-full bg-orange-100 px-2 py-0.5 text-[10px] font-bold text-orange-700",
		children: [
			label,
			": ",
			dias,
			"d atrasado"
		]
	});
}
function DateDeltaSummary({ inicioPrev, inicioReal, fimPrev, fimReal }) {
	const dIni = diffDias(inicioPrev, inicioReal);
	const dFim = diffDias(fimPrev, fimReal);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-2 flex flex-wrap items-center gap-1.5 rounded-md bg-vibra-50/60 px-2 py-1.5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeltaBadge, {
				dias: dIni,
				label: "Início"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeltaBadge, {
				dias: dFim,
				label: "Entrega"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "ml-auto text-[10px] text-muted-foreground",
				children: "Diferença real × previsto"
			})
		]
	});
}
var DEFAULT_COLUMNS = [
	{
		id: "Backlog",
		color: "#94a3b8"
	},
	{
		id: "Priorizada",
		color: VIBRA.yellow
	},
	{
		id: "Em Diagnóstico",
		color: VIBRA.blueSoft
	},
	{
		id: "Desenvolvimento",
		color: VIBRA.blue
	},
	{
		id: "Sprints – Dev",
		color: VIBRA.orange
	},
	{
		id: "Deploy – Entrega",
		color: VIBRA.yellow
	},
	{
		id: "Acompanhamento",
		color: VIBRA.greenSoft
	},
	{
		id: "Concluída",
		color: VIBRA.green
	},
	{
		id: "Despriorizada",
		color: "#a3a3a3"
	},
	{
		id: "Cancelada",
		color: "#525252"
	}
];
var ALL_CARD_FIELDS = [
	{
		id: "codigo",
		label: "Código da Iniciativa"
	},
	{
		id: "prazo",
		label: "Prazo e Alertas"
	},
	{
		id: "prioridade",
		label: "Prioridade"
	},
	{
		id: "lider",
		label: "Líder Responsável"
	},
	{
		id: "sponsor",
		label: "Sponsor"
	},
	{
		id: "analista",
		label: "Analista Responsável"
	},
	{
		id: "potencial_automacao",
		label: "Potencial Automação"
	},
	{
		id: "hc",
		label: "Métricas de HC (FTE)"
	},
	{
		id: "esforco",
		label: "Esforço (1-5)"
	},
	{
		id: "impacto",
		label: "Impacto Negócio"
	},
	{
		id: "progresso_iniciativa",
		label: "Avanço Iniciativa"
	},
	{
		id: "progresso_microprocessos",
		label: "Avanço Microprocessos"
	},
	{
		id: "tarefas",
		label: "Lista de Ações/Tarefas"
	}
];
function KanbanTab() {
	const qc = useQueryClient();
	const confirm = useConfirm();
	const gridRef = (0, import_react.useRef)(null);
	const dummyScrollRef = (0, import_react.useRef)(null);
	const { projetoIds } = useHierarchy();
	const selectedProjetoIds = projetoIds && projetoIds.length > 0 ? projetoIds : null;
	const { values: picklistVals, rename: renameStatus, add: addStatus, remove: removeStatus } = usePicklist("Status da Iniciativa");
	const [drawerId, setDrawerId] = (0, import_react.useState)(null);
	const [showConfig, setShowConfig] = (0, import_react.useState)(false);
	const [laneWidth, setLaneWidth] = (0, import_react.useState)(290);
	const [cardMode, setCardMode] = (0, import_react.useState)("medium");
	const [sortBy, setSortBy] = (0, import_react.useState)("recent");
	const [hiddenLanes, setHiddenLanes] = (0, import_react.useState)([]);
	const [cardFields, setCardFields] = (0, import_react.useState)([
		"codigo",
		"prazo",
		"prioridade",
		"progresso_iniciativa",
		"progresso_microprocessos",
		"tarefas"
	]);
	const [laneColors, setLaneColors] = (0, import_react.useState)({});
	const [laneOrder, setLaneOrder] = (0, import_react.useState)([]);
	const [newLaneName, setNewLaneName] = (0, import_react.useState)("");
	const [customLaneNames, setCustomLaneNames] = (0, import_react.useState)({});
	const [editingLaneId, setEditingLaneId] = (0, import_react.useState)(null);
	const [tempLaneName, setTempLaneName] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		try {
			const saved = localStorage.getItem("vibra_kanban_prefs");
			if (saved) {
				const parsed = JSON.parse(saved);
				if (parsed.laneWidth) setLaneWidth(Number(parsed.laneWidth));
				if (parsed.cardMode) setCardMode(parsed.cardMode);
				if (parsed.sortBy) setSortBy(parsed.sortBy);
				if (parsed.hiddenLanes) setHiddenLanes(parsed.hiddenLanes);
				if (parsed.cardFields) setCardFields(parsed.cardFields);
				if (parsed.customLaneNames) setCustomLaneNames(parsed.customLaneNames);
			}
			const savedColors = localStorage.getItem("vibra_kanban_lane_colors");
			if (savedColors) setLaneColors(JSON.parse(savedColors));
			else {
				const initialColors = {};
				DEFAULT_COLUMNS.forEach((c) => {
					initialColors[c.id] = c.color;
				});
				setLaneColors(initialColors);
			}
			const savedOrder = localStorage.getItem("vibra_kanban_lane_order");
			if (savedOrder) setLaneOrder(JSON.parse(savedOrder));
		} catch (e) {
			console.warn("Failed to load kanban preferences", e);
		}
	}, []);
	const savePreference = (key, value) => {
		try {
			const saved = localStorage.getItem("vibra_kanban_prefs");
			const parsed = saved ? JSON.parse(saved) : {};
			parsed[key] = value;
			localStorage.setItem("vibra_kanban_prefs", JSON.stringify(parsed));
		} catch (e) {
			console.warn("Failed to save kanban preference", e);
		}
	};
	const handleLaneWidthChange = (w) => {
		setLaneWidth(w);
		savePreference("laneWidth", w);
	};
	const handleCardModeChange = (mode) => {
		setCardMode(mode);
		savePreference("cardMode", mode);
		let fields = [];
		if (mode === "compact") fields = ["codigo", "progresso_iniciativa"];
		else if (mode === "medium") fields = [
			"codigo",
			"prazo",
			"prioridade",
			"hc",
			"progresso_iniciativa",
			"progresso_microprocessos"
		];
		else if (mode === "large") fields = [
			"codigo",
			"prazo",
			"prioridade",
			"hc",
			"esforco",
			"impacto",
			"progresso_iniciativa",
			"progresso_microprocessos",
			"tarefas"
		];
		setCardFields(fields);
		savePreference("cardFields", fields);
		toast.success(`Campos pré-definidos para o modo: ${mode === "compact" ? "Compacto" : mode === "large" ? "Expandido" : "Médio"}`);
	};
	const handleSortChange = (sort) => {
		setSortBy(sort);
		savePreference("sortBy", sort);
		toast.success(`Ordenação alterada com sucesso!`);
	};
	const toggleLaneVisibility = (colId) => {
		const updated = hiddenLanes.includes(colId) ? hiddenLanes.filter((l) => l !== colId) : [...hiddenLanes, colId];
		setHiddenLanes(updated);
		savePreference("hiddenLanes", updated);
	};
	const toggleCardField = (fieldId) => {
		const updated = cardFields.includes(fieldId) ? cardFields.filter((f) => f !== fieldId) : [...cardFields, fieldId];
		setCardFields(updated);
		savePreference("cardFields", updated);
	};
	const handleSaveLaneName = async (colId) => {
		const trimmed = tempLaneName.trim();
		if (!trimmed || trimmed === colId) {
			setEditingLaneId(null);
			return;
		}
		const col = columns.find((c) => c.id === colId);
		if (col && col.dbId) try {
			await renameStatus.mutateAsync({
				id: col.dbId,
				valor: trimmed
			});
			const { error: updateError } = await supabase.from("iniciativas").update({ status: trimmed }).eq("status", colId);
			if (updateError) console.warn("Could not update initiative statuses:", updateError);
			const savedColors = JSON.parse(localStorage.getItem("vibra_kanban_lane_colors") || "{}");
			if (savedColors[colId]) {
				savedColors[trimmed] = savedColors[colId];
				delete savedColors[colId];
				localStorage.setItem("vibra_kanban_lane_colors", JSON.stringify(savedColors));
				setLaneColors(savedColors);
			}
			const savedOrder = JSON.parse(localStorage.getItem("vibra_kanban_lane_order") || "[]");
			const orderIdx = savedOrder.indexOf(colId);
			if (orderIdx !== -1) {
				savedOrder[orderIdx] = trimmed;
				localStorage.setItem("vibra_kanban_lane_order", JSON.stringify(savedOrder));
				setLaneOrder(savedOrder);
			}
			setEditingLaneId(null);
			toast.success(`Raia renomeada de "${colId}" para "${trimmed}" com sucesso!`);
			qc.invalidateQueries({ queryKey: ["kanban-ini"] });
			qc.invalidateQueries({ queryKey: ["picklist"] });
			qc.invalidateQueries({ queryKey: ["iniciativa"] });
			qc.invalidateQueries({ queryKey: ["iniciativas"] });
		} catch (err) {
			toast.error("Erro ao renomear raia: " + err.message);
		}
		else {
			const updated = {
				...customLaneNames,
				[colId]: trimmed || colId
			};
			setCustomLaneNames(updated);
			savePreference("customLaneNames", updated);
			setEditingLaneId(null);
			toast.success(`Raia renomeada para "${trimmed || colId}"`);
		}
	};
	const handleUpdateLaneColor = (colId, color) => {
		const updated = {
			...laneColors,
			[colId]: color
		};
		setLaneColors(updated);
		localStorage.setItem("vibra_kanban_lane_colors", JSON.stringify(updated));
		toast.success(`Cor da raia "${colId}" atualizada!`);
	};
	const handleMoveLane = (colId, direction) => {
		const ids = columns.map((c) => c.id);
		const idx = ids.indexOf(colId);
		if (idx === -1) return;
		const newOrder = [...ids];
		if (direction === "left" && idx > 0) {
			newOrder[idx] = ids[idx - 1];
			newOrder[idx - 1] = colId;
		} else if (direction === "right" && idx < ids.length - 1) {
			newOrder[idx] = ids[idx + 1];
			newOrder[idx + 1] = colId;
		} else return;
		setLaneOrder(newOrder);
		localStorage.setItem("vibra_kanban_lane_order", JSON.stringify(newOrder));
		toast.success("Ordem das raias atualizada!");
	};
	const handleAddLane = async () => {
		const trimmed = newLaneName.trim();
		if (!trimmed) return;
		if (columns.some((c) => c.id.toLowerCase() === trimmed.toLowerCase())) {
			toast.error("Já existe uma raia com esse nome!");
			return;
		}
		try {
			await addStatus.mutateAsync(trimmed);
			setNewLaneName("");
			toast.success(`Raia "${trimmed}" adicionada com sucesso!`);
		} catch (err) {
			toast.error("Erro ao adicionar raia: " + err.message);
		}
	};
	const handleDeleteLane = async (colId, dbId) => {
		if (!dbId) {
			toast.error("Não é possível excluir raia de fallback");
			return;
		}
		const count = iniciativas.filter((i) => (i.status ?? "Backlog") === colId).length;
		if (count > 0) {
			if (!await confirm("Mover iniciativas?", `Esta raia possui ${count} iniciativa(s). Se você excluí-la, as iniciativas serão movidas para "Backlog". Deseja continuar?`)) return;
			const { error: updateError } = await supabase.from("iniciativas").update({ status: "Backlog" }).eq("status", colId);
			if (updateError) {
				toast.error("Erro ao mover iniciativas: " + updateError.message);
				return;
			}
		} else if (!await confirm("Excluir raia?", `Deseja realmente excluir a raia "${colId}"?`)) return;
		try {
			await removeStatus.mutateAsync(dbId);
			toast.success(`Raia "${colId}" excluída!`);
			qc.invalidateQueries({ queryKey: ["kanban-ini"] });
			qc.invalidateQueries({ queryKey: ["picklist"] });
			qc.invalidateQueries({ queryKey: ["iniciativa"] });
			qc.invalidateQueries({ queryKey: ["iniciativas"] });
		} catch (err) {
			toast.error("Erro ao excluir raia: " + err.message);
		}
	};
	useRealtimeTable("iniciativas", [["kanban-ini"]]);
	useRealtimeTable("tarefas", [["kanban-acoes"]]);
	const { data: projetos = [] } = useQuery({
		queryKey: ["kanban-projetos", selectedProjetoIds?.join(",") ?? "_all"],
		queryFn: async () => {
			let q = supabase.from("projetos").select("id,nome").is("deleted_at", null);
			if (selectedProjetoIds) q = q.in("id", selectedProjetoIds);
			const { data } = await q;
			return data ?? [];
		}
	});
	const procMap = new Map(projetos.map((p) => [p.id, p.nome]));
	const { data: profiles = [] } = useQuery({
		queryKey: ["kanban-profiles"],
		queryFn: async () => {
			const { data } = await supabase.from("profiles").select("id,nome,email");
			return data ?? [];
		}
	});
	const profMap = (0, import_react.useMemo)(() => new Map(profiles.map((p) => [p.id, p.nome ?? p.email ?? "—"])), [profiles]);
	const { data: iniciativas = [] } = useQuery({
		queryKey: ["kanban-ini", selectedProjetoIds?.join(",") ?? "_all"],
		queryFn: async () => {
			let q = supabase.from("iniciativas").select("id,codigo,titulo,status,prioridade,percentual_avanco,projeto_id,data_fim_prevista,hc_atual,hc_alcancado,hc_liberado,esforco,impacto_negocio,lider_id,sponsor_id,analista_id,potencial_automacao,impedimento").is("deleted_at", null).order("updated_at", { ascending: false });
			if (selectedProjetoIds) q = q.in("projeto_id", selectedProjetoIds);
			const { data, error } = await q;
			if (error) throw error;
			return data ?? [];
		}
	});
	const { data: acoes = [] } = useQuery({
		queryKey: ["kanban-acoes", iniciativas.map((i) => i.id).join(",")],
		enabled: iniciativas.length > 0,
		queryFn: async () => {
			const { data } = await supabase.from("tarefas").select("id,titulo,status,iniciativa_id,responsavel_id,data_fim_prevista").in("iniciativa_id", iniciativas.map((i) => i.id));
			return data ?? [];
		}
	});
	const { data: microprocessos = [] } = useQuery({
		queryKey: ["kanban-micros", iniciativas.map((i) => i.id).join(",")],
		enabled: iniciativas.length > 0,
		queryFn: async () => {
			const { data } = await supabase.from("microprocessos").select("id,titulo,status,percentual_avanco,iniciativa_id").in("iniciativa_id", iniciativas.map((i) => i.id)).is("deleted_at", null);
			return data ?? [];
		}
	});
	function microStatusColor(s, pct) {
		if (pct >= 100 || s === "Concluído") return "#16a34a";
		if (s === "Em Andamento" || s === "Em Execução") return VIBRA.blue;
		if (s === "Atrasado" || s === "Em Risco") return "#dc2626";
		if (s === "Planejado") return "#94a3b8";
		return VIBRA.blue;
	}
	const sortedIniciativas = (0, import_react.useMemo)(() => {
		const result = [...iniciativas];
		if (sortBy === "title") result.sort((a, b) => a.titulo.localeCompare(b.titulo));
		else if (sortBy === "progress") result.sort((a, b) => (b.percentual_avanco || 0) - (a.percentual_avanco || 0));
		else if (sortBy === "priority") {
			const weight = (p) => {
				if (/crit/i.test(p ?? "")) return 4;
				if (/alt/i.test(p ?? "")) return 3;
				if (/med/i.test(p ?? "")) return 2;
				return 1;
			};
			result.sort((a, b) => weight(b.prioridade) - weight(a.prioridade));
		}
		return result;
	}, [iniciativas, sortBy]);
	const globalStats = (0, import_react.useMemo)(() => {
		const total = iniciativas.length;
		if (total === 0) return {
			total: 0,
			notStarted: 0,
			active: 0,
			blocked: 0,
			completed: 0,
			avgAdvance: 0,
			notStartedPct: 0,
			activePct: 0,
			blockedPct: 0,
			completedPct: 0
		};
		const notStarted = iniciativas.filter((i) => {
			const s = (i.status ?? "").toLowerCase();
			return s === "não iniciada" || s === "não iniciadas" || s === "nao iniciada" || s.includes("aguardando mapeamento") || s === "não iniciada";
		}).length;
		const active = iniciativas.filter((i) => {
			const s = (i.status ?? "").toLowerCase();
			return s.includes("andamento") || s.includes("execução") || s.includes("execucao") || s.includes("desenvolvimento") || s.includes("sprint") || s.includes("aguardando mapeamento") || s.includes("validação") || s.includes("validacao") || s.includes("acompanhamento") || s.includes("responsabilidade da área") || s.includes("responsabilidade da area");
		}).length;
		const blocked = iniciativas.filter((i) => {
			const s = (i.status ?? "").toLowerCase();
			const hasImpedimento = !!(i.impedimento && i.impedimento.trim());
			const isBlockedStatus = s.includes("despriorizada") || s.includes("cancelada") || s.includes("com bloqueios") || s.includes("bloqueio") || s.includes("bloqueada") || s.includes("suspenso") || s.includes("impedido");
			return hasImpedimento || isBlockedStatus;
		}).length;
		const completed = iniciativas.filter((i) => {
			const s = (i.status ?? "").toLowerCase();
			return s.includes("concluída") || s === "concluido" || s === "concluída" || s.includes("conclui");
		}).length;
		let partNotStarted = 0;
		let partActive = 0;
		let partBlocked = 0;
		let partCompleted = 0;
		iniciativas.forEach((i) => {
			const s = (i.status ?? "").toLowerCase();
			const hasImpedimento = !!(i.impedimento && i.impedimento.trim());
			if (s.includes("concluída") || s === "concluido" || s === "concluída" || s.includes("conclui")) partCompleted++;
			else if (s.includes("despriorizada") || s.includes("cancelada") || s.includes("com bloqueios") || s.includes("bloqueio") || s.includes("bloqueada") || s.includes("suspenso") || s.includes("impedido") || hasImpedimento) partBlocked++;
			else if (s === "não iniciada" || s === "não iniciadas" || s === "nao iniciada" || s.includes("aguardando mapeamento")) partNotStarted++;
			else partActive++;
		});
		const getLogicalProgress = (i) => {
			const s = (i.status ?? "").toLowerCase();
			if (s.includes("conclu")) return 100;
			if (s === "não iniciada" || s === "não iniciadas" || s === "nao iniciada" || s.includes("aguardando mapeamento")) return 0;
			if (s.includes("cancelada") || s.includes("despriorizada")) return 0;
			let baseProgress = 0;
			if (s.includes("acompanhamento")) baseProgress = 90;
			else if (s.includes("validação") || s.includes("validacao")) baseProgress = 75;
			else if (s.includes("responsabilidade da área") || s.includes("responsabilidade da area")) baseProgress = 50;
			else if (s.includes("andamento") || s.includes("execução") || s.includes("execucao")) baseProgress = 30;
			else if (s.includes("desenvolvimento") || s.includes("sprint")) baseProgress = 40;
			else if (s.includes("diagnóstico") || s.includes("diagnostico") || s.includes("priorizada")) baseProgress = 15;
			return Math.max(i.percentual_avanco ?? 0, baseProgress);
		};
		return {
			total,
			notStarted,
			active,
			blocked,
			completed,
			avgAdvance: iniciativas.reduce((acc, curr) => acc + getLogicalProgress(curr), 0) / total,
			notStartedPct: partNotStarted / total * 100,
			activePct: partActive / total * 100,
			blockedPct: partBlocked / total * 100,
			completedPct: partCompleted / total * 100
		};
	}, [iniciativas]);
	async function moveTo(it, colStatus) {
		let newStatus = colStatus;
		if (colStatus === "Concluída") newStatus = prazoStatus(it.data_fim_prevista, null) === "atrasada" ? "Concluída (Fora do Prazo)" : "Concluída (No Prazo)";
		const { data: { user } } = await supabase.auth.getUser();
		const payload = { status: newStatus };
		if (colStatus === "Concluída") {
			payload.percentual_avanco = 100;
			payload.data_implantacao = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
		}
		const { error } = await supabase.from("iniciativas").update(payload).eq("id", it.id);
		if (error) return toast.error("Falha ao mover: " + error.message);
		await supabase.from("kanban_historico").insert({
			iniciativa_id: it.id,
			status_de: it.status,
			status_para: newStatus,
			movido_por: user?.id
		});
		toast.success(`Movida para ${newStatus}`);
		qc.invalidateQueries({ queryKey: ["kanban-ini"] });
	}
	function onDragStart(e, it) {
		e.dataTransfer.setData("application/json", JSON.stringify(it));
	}
	function onDrop(e, status) {
		e.preventDefault();
		const raw = e.dataTransfer.getData("application/json");
		if (!raw) return;
		const it = JSON.parse(raw);
		if (((it.status ?? "Backlog").startsWith("Concluída") ? "Concluída" : it.status) === status) return;
		moveTo(it, status);
	}
	const columns = (0, import_react.useMemo)(() => {
		if (!picklistVals || picklistVals.length === 0) return DEFAULT_COLUMNS.map((c) => ({
			id: c.id,
			color: laneColors[c.id] || c.color,
			dbId: null
		}));
		const seen = /* @__PURE__ */ new Set();
		const list = [];
		picklistVals.forEach((v) => {
			const val = v.valor?.trim();
			if (!val || seen.has(val)) return;
			seen.add(val);
			const defaultCol = DEFAULT_COLUMNS.find((c) => c.id === val);
			const color = laneColors[val] || defaultCol?.color || "#94a3b8";
			list.push({
				id: val,
				color,
				dbId: v.id
			});
		});
		if (laneOrder.length > 0) list.sort((a, b) => {
			let idxA = laneOrder.indexOf(a.id);
			let idxB = laneOrder.indexOf(b.id);
			if (idxA === -1) idxA = 999;
			if (idxB === -1) idxB = 999;
			return idxA - idxB;
		});
		return list;
	}, [
		picklistVals,
		laneColors,
		laneOrder
	]);
	const visibleColumns = (0, import_react.useMemo)(() => {
		return columns.filter((col) => !hiddenLanes.includes(col.id));
	}, [columns, hiddenLanes]);
	(0, import_react.useEffect)(() => {
		const grid = gridRef.current;
		const dummy = dummyScrollRef.current;
		if (!grid || !dummy) return;
		let isSyncingGrid = false;
		let isSyncingDummy = false;
		const handleGridScroll = () => {
			if (isSyncingDummy) return;
			isSyncingGrid = true;
			dummy.scrollLeft = grid.scrollLeft;
			isSyncingGrid = false;
		};
		const handleDummyScroll = () => {
			if (isSyncingGrid) return;
			isSyncingDummy = true;
			grid.scrollLeft = dummy.scrollLeft;
			isSyncingDummy = false;
		};
		grid.addEventListener("scroll", handleGridScroll);
		dummy.addEventListener("scroll", handleDummyScroll);
		dummy.scrollLeft = grid.scrollLeft;
		return () => {
			grid.removeEventListener("scroll", handleGridScroll);
			dummy.removeEventListener("scroll", handleDummyScroll);
		};
	}, [visibleColumns, laneWidth]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", { children: `
        .custom-kanban-grid::-webkit-scrollbar {
          height: 10px;
          width: 8px;
        }
        .custom-kanban-grid::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 8px;
        }
        .custom-kanban-grid::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 8px;
          border: 2px solid #f1f5f9;
        }
        .custom-kanban-grid::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }

        .custom-lane-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-lane-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-lane-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 4px;
        }
        .custom-lane-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      ` }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-xl border border-border bg-card p-3 shadow-vibra-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-3 md:flex-row md:items-center md:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
								className: "text-[12px] font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4 text-vibra-700" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Andamento do Projeto" })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "rounded-full bg-vibra-50 border border-vibra-100 px-2 py-0.5 text-[9px] font-extrabold text-vibra-800",
								children: selectedProjetoIds ? "Filtro Ativo" : "Portfólio Completo"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-2.5 flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative flex-1 h-2 rounded-full bg-slate-100 overflow-hidden flex shadow-inner",
								children: [
									globalStats.notStartedPct > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-full bg-slate-400 transition-all duration-500",
										style: { width: `${globalStats.notStartedPct}%` },
										title: `Não Iniciadas: ${globalStats.notStartedPct.toFixed(0)}%`
									}),
									globalStats.activePct > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-full bg-blue-500 transition-all duration-500",
										style: { width: `${globalStats.activePct}%` },
										title: `Em Andamento: ${globalStats.activePct.toFixed(0)}%`
									}),
									globalStats.blockedPct > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-full bg-rose-500 transition-all duration-500",
										style: { width: `${globalStats.blockedPct}%` },
										title: `Bloqueadas: ${globalStats.blockedPct.toFixed(0)}%`
									}),
									globalStats.completedPct > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-full bg-emerald-500 transition-all duration-500",
										style: { width: `${globalStats.completedPct}%` },
										title: `Concluídas: ${globalStats.completedPct.toFixed(0)}%`
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-[13px] font-black font-mono text-slate-800 w-12 text-right shrink-0",
								children: [globalStats.avgAdvance.toFixed(0), "%"]
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 rounded-lg border border-slate-150 bg-slate-50/40 px-3 py-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-2 w-2 rounded-full bg-slate-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-left",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[9px] font-black text-slate-500 uppercase tracking-wider leading-none",
										children: "Não Iniciadas"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[13px] font-black text-slate-800 leading-none mt-1",
										children: globalStats.notStarted
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 rounded-lg border border-slate-150 bg-slate-50/40 px-3 py-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-2 w-2 rounded-full bg-blue-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-left",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[9px] font-black text-slate-500 uppercase tracking-wider leading-none",
										children: "Em Andamento"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[13px] font-black text-slate-800 leading-none mt-1",
										children: globalStats.active
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 rounded-lg border border-slate-150 bg-slate-50/40 px-3 py-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-2 w-2 rounded-full bg-rose-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-left",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[9px] font-black text-slate-500 uppercase tracking-wider leading-none",
										children: "Bloqueadas"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[13px] font-black text-slate-800 leading-none mt-1",
										children: globalStats.blocked
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 rounded-lg border border-slate-150 bg-slate-50/40 px-3 py-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-2 w-2 rounded-full bg-emerald-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-left",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[9px] font-black text-slate-500 uppercase tracking-wider leading-none",
										children: "Concluídas"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[13px] font-black text-slate-800 leading-none mt-1",
										children: globalStats.completed
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex items-center gap-2 rounded-lg border border-slate-150 bg-slate-50/40 px-3 py-1",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-left",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[9px] font-black text-slate-500 uppercase tracking-wider leading-none",
										children: "Total"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[13px] font-black text-slate-800 leading-none mt-1",
										children: globalStats.total
									})]
								})
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				ref: gridRef,
				className: "flex gap-3 overflow-x-auto pb-2 items-start select-none min-h-[460px] custom-kanban-grid",
				children: visibleColumns.map((col) => {
					const items = sortedIniciativas.filter((i) => {
						const s = i.status ?? "Backlog";
						if (col.id === "Concluída") return s.startsWith("Concluída");
						return s === col.id;
					});
					const colDisplayName = customLaneNames[col.id] || col.id;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						onDragOver: (e) => e.preventDefault(),
						onDrop: (e) => onDrop(e, col.id),
						className: "flex flex-col rounded-xl border border-border bg-white shadow-vibra-sm shrink-0 transition-all duration-200 h-auto min-h-[400px] max-h-none",
						style: { width: `${laneWidth}px` },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between border-b border-border px-3 py-2.5",
							style: {
								borderTopColor: col.color,
								borderTopWidth: 3,
								borderTopStyle: "solid",
								borderTopLeftRadius: 12,
								borderTopRightRadius: 12
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-1.5 min-w-0 flex-1 mr-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "h-2.5 w-2.5 rounded-full shrink-0",
									style: { background: col.color }
								}), editingLaneId === col.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									value: tempLaneName,
									onChange: (e) => setTempLaneName(e.target.value),
									onBlur: () => handleSaveLaneName(col.id),
									onKeyDown: (e) => {
										if (e.key === "Enter") handleSaveLaneName(col.id);
										if (e.key === "Escape") setEditingLaneId(null);
									},
									className: "rounded border border-vibra-500 bg-white px-1.5 py-0.5 text-[11px] font-bold text-vibra-950 w-full outline-none focus:ring-1 focus:ring-vibra-600",
									autoFocus: true
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-1 group/header min-w-0 flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[11px] font-black uppercase tracking-wider text-vibra-800 truncate cursor-pointer hover:text-vibra-600 flex-1",
										title: "Dê duplo clique para renomear esta raia",
										onDoubleClick: () => {
											setEditingLaneId(col.id);
											setTempLaneName(colDisplayName);
										},
										children: colDisplayName
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => {
											setEditingLaneId(col.id);
											setTempLaneName(colDisplayName);
										},
										className: "opacity-0 group-hover/header:opacity-100 p-0.5 rounded hover:bg-slate-100 text-slate-400 hover:text-vibra-700 transition shrink-0",
										title: "Renomear raia",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "h-3 w-3" })
									})]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "rounded-full bg-vibra-50 px-2 py-0.5 text-[9.5px] font-bold text-vibra-800 shrink-0 font-mono",
								children: items.length
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-2 p-2 overflow-visible bg-slate-50/30",
							children: [items.map((it) => {
								const ps = prazoStatus(it.data_fim_prevista, it.status);
								const badge = prazoBadge(ps);
								const procColor = colorForId(it.projeto_id);
								const procNome = procMap.get(it.projeto_id ?? "") ?? "—";
								const myActions = acoes.filter((a) => a.iniciativa_id === it.id);
								const pendingA = myActions.filter((a) => a.status !== "Concluída").slice(0, 2);
								const myMicros = microprocessos.filter((m) => m.iniciativa_id === it.id);
								const isBlocked = !!(it.impedimento && it.impedimento.trim());
								const isDelayed = ps === "atrasada";
								let cardBorderCls = "border-border";
								let cardBgCls = "bg-white";
								if (isBlocked) {
									cardBorderCls = "border-l-4 border-l-amber-500 border-t-border border-b-border border-r-border";
									cardBgCls = "bg-amber-50/15";
								}
								if (isDelayed) {
									cardBorderCls = "border-l-4 border-l-red-500 border-t-border border-b-border border-r-border";
									cardBgCls = isBlocked ? "bg-red-50/20 border-r-amber-500" : "bg-red-50/10";
								}
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
									draggable: true,
									onDragStart: (e) => onDragStart(e, it),
									onClick: () => setDrawerId(it.id),
									className: `group cursor-pointer overflow-hidden rounded-lg border ${cardBorderCls} ${cardBgCls} text-[12px] transition-all hover:border-vibra-600/40 hover:shadow-vibra-md animate-in fade-in duration-150`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-1.5",
										style: { background: procColor },
										title: `Processo: ${procNome}`
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "p-2.5",
										children: [
											isBlocked && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "mb-2 rounded bg-amber-500/10 border border-amber-500/20 px-2 py-1 text-[9.5px] text-amber-800 font-extrabold flex items-center gap-1 animate-pulse",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-3 w-3 text-amber-600 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "truncate",
													children: ["BLOQUEADA: ", it.impedimento]
												})]
											}),
											isDelayed && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "mb-2 rounded bg-red-600/10 border border-red-500/20 px-2 py-1 text-[9.5px] text-red-700 font-extrabold flex items-center gap-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "h-3 w-3 text-red-600 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "ATRASADA / FORA DO PRAZO" })]
											}),
											(cardFields.includes("codigo") || cardFields.includes("prazo")) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center justify-between gap-1.5 mb-1.5",
												children: [cardFields.includes("codigo") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-mono text-[9px] font-black text-vibra-700 bg-vibra-50 border border-vibra-100/50 rounded px-1.5 py-0.5",
													children: it.codigo ?? "INI-—"
												}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}), cardFields.includes("prazo") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: `rounded-full px-1.5 py-0.5 text-[9px] font-bold ${badge.cls}`,
													children: badge.label
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "font-bold leading-snug text-vibra-950 text-[12px] group-hover:text-vibra-700 transition line-clamp-2",
												children: it.titulo
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "mt-2 flex flex-wrap items-center gap-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "inline-flex items-center gap-0.5 rounded-full bg-slate-50 border border-slate-200 px-2 py-0.5 text-[9px] font-bold text-slate-800",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, { className: "h-2.5 w-2.5 shrink-0" }),
														" ",
														procNome
													]
												}), cardFields.includes("prioridade") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "rounded-full bg-orange-50 border border-orange-100 px-2 py-0.5 text-[9px] font-bold text-orange-700",
													children: it.prioridade || "Sem prioridade"
												})]
											}),
											(cardFields.includes("lider") || cardFields.includes("sponsor") || cardFields.includes("analista")) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "mt-2 space-y-1 text-[9.5px] text-slate-600 border-t border-dashed border-slate-100 pt-1.5",
												children: [
													cardFields.includes("lider") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex items-center gap-1",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "font-semibold text-slate-400",
															children: "Líder:"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "font-bold text-slate-700 truncate",
															children: it.lider_id ? profMap.get(it.lider_id) ?? it.lider_id : "Não definido"
														})]
													}),
													cardFields.includes("sponsor") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex items-center gap-1",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "font-semibold text-slate-400",
															children: "Sponsor:"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "font-bold text-slate-700 truncate",
															children: it.sponsor_id ? profMap.get(it.sponsor_id) ?? it.sponsor_id : "Não definido"
														})]
													}),
													cardFields.includes("analista") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex items-center gap-1",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "font-semibold text-slate-400",
															children: "Analista:"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "font-bold text-slate-700 truncate",
															children: it.analista_id ? profMap.get(it.analista_id) ?? it.analista_id : "Não definido"
														})]
													})
												]
											}),
											cardFields.includes("potencial_automacao") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "mt-2 text-[9.5px] text-slate-600",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-semibold text-slate-400",
													children: "Automação:"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "ml-1 rounded bg-purple-50 text-purple-700 px-1 py-0.2 font-extrabold",
													children: it.potencial_automacao || "Não informada"
												})]
											}),
											(cardFields.includes("hc") || cardFields.includes("esforco") || cardFields.includes("impacto")) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "mt-2.5 grid grid-cols-3 gap-1 rounded bg-slate-50/70 p-1.5 text-[9px] text-muted-foreground border border-slate-100",
												children: [
													cardFields.includes("hc") ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
														"HC:",
														" ",
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
															className: "text-vibra-900 font-black font-mono",
															children: Number(it.hc_atual ?? 0).toFixed(1)
														})
													] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}),
													cardFields.includes("esforco") ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
														"Esf:",
														" ",
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
															className: "text-vibra-900 font-black font-mono",
															children: it.esforco ?? "—"
														})
													] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}),
													cardFields.includes("impacto") ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
														"Imp:",
														" ",
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
															className: "text-vibra-900 font-black font-mono",
															children: it.impacto_negocio ?? "—"
														})
													] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {})
												]
											}),
											cardFields.includes("progresso_iniciativa") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "mt-2.5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center justify-between text-[9px] text-muted-foreground",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "font-semibold",
														children: "Avanço Iniciativa"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "font-black text-vibra-950 font-mono",
														children: [Number(it.percentual_avanco ?? 0).toFixed(0), "%"]
													})]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "mt-0.5 h-1.5 w-full rounded-full bg-slate-100 overflow-hidden",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "h-1.5 rounded-full bg-vibra-600 transition-all duration-300",
														style: { width: `${Math.min(100, Number(it.percentual_avanco ?? 0))}%` }
													})
												})]
											}),
											cardFields.includes("progresso_microprocessos") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "mt-2.5 space-y-1.5 border-t border-border pt-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
													className: "text-[8.5px] font-black uppercase tracking-wider text-muted-foreground",
													children: ["Microprocessos ", myMicros.length > 0 ? `(${myMicros.length})` : ""]
												}), myMicros.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "space-y-1",
													children: [myMicros.slice(0, 2).map((m) => {
														const pct = Math.min(100, Number(m.percentual_avanco ?? 0));
														const color = microStatusColor(m.status, pct);
														return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "flex items-center justify-between gap-1 text-[9px]",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "truncate text-slate-700 font-medium",
																title: m.titulo,
																children: m.titulo
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
																className: "font-black text-slate-800 font-mono",
																children: [pct.toFixed(0), "%"]
															})]
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
															className: "mt-0.5 h-1 rounded-full bg-slate-100 overflow-hidden",
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																className: "h-1 rounded-full animate-pulse",
																style: {
																	width: `${pct}%`,
																	background: color
																}
															})
														})] }, m.id);
													}), myMicros.length > 2 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
														className: "text-[8px] italic text-muted-foreground",
														children: [
															"+",
															myMicros.length - 2,
															" outros microprocessos"
														]
													})]
												}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-[9px] text-slate-400 italic",
													children: "Nenhum microprocesso vinculado"
												})]
											}),
											cardFields.includes("tarefas") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "mt-2.5 space-y-1 border-t border-border pt-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
													className: "text-[8.5px] font-black uppercase tracking-wider text-muted-foreground",
													children: ["Ações Ativas ", myActions.length > 0 ? `(${myActions.length})` : ""]
												}), myActions.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [pendingA.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center gap-1.5 text-[9.5px] text-slate-800 leading-snug",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `h-1.5 w-1.5 shrink-0 rounded-full ${a.status === "Concluída" ? "bg-emerald-500" : "bg-vibra-600 animate-pulse"}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "truncate font-medium",
														children: a.titulo
													})]
												}, a.id)), myActions.length > 2 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
													className: "text-[8px] italic text-muted-foreground",
													children: [
														"+",
														myActions.length - 2,
														" ações adicionais"
													]
												})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-[9px] text-slate-400 italic",
													children: "Nenhuma ação ativa"
												})]
											})
										]
									})]
								}, it.id);
							}), items.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-12 text-center text-[10.5px] italic text-muted-foreground border-2 border-dashed border-slate-100 rounded-lg py-6 px-4",
								children: "Arraste cards para esta raia"
							})]
						})]
					}, col.id);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "sticky bottom-0 left-0 right-0 z-30 w-full bg-white/95 backdrop-blur-sm border border-slate-200 shadow-[0_-4px_12px_rgba(0,0,0,0.06)] flex flex-col rounded-xl overflow-hidden mt-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between px-4 py-1.5 text-xs text-slate-500 font-bold border-b border-slate-100/50 bg-slate-50/50",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => {
								if (gridRef.current) gridRef.current.scrollBy({
									left: -300,
									behavior: "smooth"
								});
							},
							className: "flex items-center gap-1 rounded bg-white px-2 py-1 text-[10px] font-black text-vibra-800 border border-slate-200 shadow-sm hover:bg-slate-50 active:scale-95 transition",
							children: "← Scroll Esquerda"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[10px] uppercase tracking-wider text-slate-400 font-black",
							children: "Navegação Horizontal Rápida"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => {
								if (gridRef.current) gridRef.current.scrollBy({
									left: 300,
									behavior: "smooth"
								});
							},
							className: "flex items-center gap-1 rounded bg-white px-2 py-1 text-[10px] font-black text-vibra-800 border border-slate-200 shadow-sm hover:bg-slate-50 active:scale-95 transition",
							children: "Scroll Direita →"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					ref: dummyScrollRef,
					className: "w-full overflow-x-auto py-1.5 px-4 custom-lane-scrollbar",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
						width: `${visibleColumns.length * laneWidth + (visibleColumns.length - 1) * 12}px`,
						height: "6px"
					} })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-3 rounded-xl border border-border bg-card p-4 shadow-vibra-sm sm:flex-row sm:items-center sm:justify-between mt-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-4 text-[11.5px] font-semibold text-slate-700",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1 bg-muted p-0.5 rounded-lg border border-border",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => handleCardModeChange("compact"),
									className: `rounded px-2.5 py-1 text-[10.5px] font-bold transition flex items-center gap-1 ${cardMode === "compact" ? "bg-white text-vibra-800 shadow-sm" : "text-muted-foreground hover:text-slate-800"}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grid3x3, { className: "h-3 w-3" }), " Compacto"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => handleCardModeChange("medium"),
									className: `rounded px-2.5 py-1 text-[10.5px] font-bold transition flex items-center gap-1 ${cardMode === "medium" ? "bg-white text-vibra-800 shadow-sm" : "text-muted-foreground hover:text-slate-800"}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelsTopLeft, { className: "h-3 w-3" }), " Médio"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => handleCardModeChange("large"),
									className: `rounded px-2.5 py-1 text-[10.5px] font-bold transition flex items-center gap-1 ${cardMode === "large" ? "bg-white text-vibra-800 shadow-sm" : "text-muted-foreground hover:text-slate-800"}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlidersVertical, { className: "h-3 w-3" }), " Expandido"]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 border-l border-slate-200 pl-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground",
									children: "Largura da raia:"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "range",
									min: 240,
									max: 450,
									step: 10,
									value: laneWidth,
									onChange: (e) => handleLaneWidthChange(Number(e.target.value)),
									className: "w-24 h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-vibra-700"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-muted-foreground font-bold font-mono",
									children: [laneWidth, "px"]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1.5 border-l border-slate-200 pl-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpDown, { className: "h-3.5 w-3.5 text-muted-foreground" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground",
									children: "Ordenar:"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									value: sortBy,
									onChange: (e) => handleSortChange(e.target.value),
									className: "rounded-md border border-input bg-white px-2 py-1 text-[11px] outline-none font-bold",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "recent",
											children: "Recente"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "title",
											children: "Título (A-Z)"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "progress",
											children: "Progresso"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "priority",
											children: "Prioridade"
										})
									]
								})
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center gap-2 self-end sm:self-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setShowConfig(!showConfig),
							title: "Configurações do Kanban",
							className: `rounded-md p-2 border border-border bg-white text-slate-700 hover:bg-slate-50 transition flex items-center gap-1 text-[11.5px] font-bold ${showConfig ? "border-vibra-600 ring-2 ring-vibra-600/10 text-vibra-800" : ""}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Customizar Visualização" })]
						}), showConfig && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "fixed inset-0 z-40",
							onClick: () => setShowConfig(false)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "absolute right-0 bottom-full mb-1.5 z-50 w-[92vw] sm:w-[480px] rounded-xl border border-border bg-white p-4 shadow-vibra-lg animate-in fade-in slide-in-from-bottom-1 duration-150",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-1 sm:grid-cols-2 gap-6",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col h-full",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
											className: "text-[11px] font-black uppercase tracking-wider text-vibra-800 border-b border-border pb-1.5 mb-2 flex items-center gap-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-3.5 w-3.5" }), " Raias Ativas"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "space-y-1.5 max-h-[180px] overflow-y-auto pr-1 custom-lane-scrollbar flex-1",
											children: columns.map((col) => {
												const isHidden = hiddenLanes.includes(col.id);
												return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center justify-between rounded px-1.5 py-1 text-[11px] hover:bg-slate-50 text-slate-700 font-bold gap-1",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex items-center gap-1.5 min-w-0 flex-1",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "relative shrink-0 flex items-center",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "h-2.5 w-2.5 rounded-full cursor-pointer hover:scale-110 transition border border-slate-200",
																style: { background: col.color },
																title: "Alterar cor",
																onClick: (e) => {
																	const input = e.currentTarget.nextElementSibling;
																	if (input) input.click();
																}
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
																type: "color",
																value: col.color,
																onChange: (e) => handleUpdateLaneColor(col.id, e.target.value),
																className: "absolute inset-0 opacity-0 w-0 h-0 pointer-events-none"
															})]
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "truncate",
															title: col.id,
															children: col.id
														})]
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex items-center gap-0.5 shrink-0",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
																type: "button",
																onClick: () => handleMoveLane(col.id, "left"),
																className: "p-0.5 hover:bg-slate-200 rounded text-slate-500 hover:text-vibra-800",
																title: "Mover para esquerda",
																children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUp, { className: "h-3 w-3" })
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
																type: "button",
																onClick: () => handleMoveLane(col.id, "right"),
																className: "p-0.5 hover:bg-slate-200 rounded text-slate-500 hover:text-vibra-800",
																title: "Mover para direita",
																children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowDown, { className: "h-3 w-3" })
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
																type: "button",
																onClick: () => toggleLaneVisibility(col.id),
																className: `p-0.5 rounded ${isHidden ? "text-slate-400 hover:text-slate-600" : "text-vibra-600 hover:text-vibra-800"}`,
																title: isHidden ? "Exibir raia" : "Ocultar raia",
																children: isHidden ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "h-3 w-3" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-3 w-3" })
															}),
															col.dbId && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
																type: "button",
																onClick: () => handleDeleteLane(col.id, col.dbId),
																className: "p-0.5 hover:bg-red-50 hover:text-red-600 rounded text-slate-400",
																title: "Excluir raia",
																children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3 w-3" })
															})
														]
													})]
												}, col.id);
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-2 pt-2 border-t border-border",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-[9px] font-black uppercase text-slate-400 mb-1",
												children: "Nova Raia"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex gap-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													type: "text",
													placeholder: "Nome do novo status...",
													value: newLaneName,
													onChange: (e) => setNewLaneName(e.target.value),
													className: "flex-1 rounded border border-border px-1.5 py-0.5 text-[10.5px] outline-none focus:border-vibra-600"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													type: "button",
													onClick: handleAddLane,
													className: "bg-vibra-700 hover:bg-vibra-800 text-white rounded px-2 py-0.5 text-[10.5px] font-bold shrink-0",
													children: "+ Add"
												})]
											})]
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
										className: "text-[11px] font-black uppercase tracking-wider text-vibra-800 border-b border-border pb-1.5 mb-2 flex items-center gap-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlidersVertical, { className: "h-3.5 w-3.5" }), " Campos do Card"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "space-y-1 max-h-[180px] overflow-y-auto pr-1 custom-lane-scrollbar",
										children: ALL_CARD_FIELDS.map((field) => {
											const isChecked = cardFields.includes(field.id);
											return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
												className: "flex items-center justify-between rounded px-1.5 py-1 text-[11px] hover:bg-slate-50 cursor-pointer text-slate-700 font-bold",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "truncate",
													title: field.label,
													children: field.label
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													type: "checkbox",
													checked: isChecked,
													onChange: () => toggleCardField(field.id),
													className: "rounded border-gray-300 text-vibra-600 focus:ring-vibra-600 shrink-0 ml-2"
												})]
											}, field.id);
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-2.5 border-t border-border pt-2 flex justify-between gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => {
												const allIds = ALL_CARD_FIELDS.map((f) => f.id);
												setCardFields(allIds);
												savePreference("cardFields", allIds);
											},
											className: "text-[10px] font-black text-vibra-800 hover:underline",
											children: "Exibir todos"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => {
												setCardFields(["codigo", "progresso_iniciativa"]);
												savePreference("cardFields", ["codigo", "progresso_iniciativa"]);
											},
											className: "text-[10px] font-black text-slate-500 hover:underline",
											children: "Limpar tudo"
										})]
									})
								] })]
							})
						})] })]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InitiativeDrawer, {
				initiativeId: drawerId,
				onClose: () => setDrawerId(null)
			})
		]
	});
}
function toTs(d) {
	if (!d) return null;
	const t = new Date(d).getTime();
	return isNaN(t) ? null : t;
}
function TimelineTab() {
	const { projetoIds } = useHierarchy();
	const selectedProjetoIds = projetoIds && projetoIds.length > 0 ? projetoIds : null;
	const { data: projetos = [] } = useQuery({
		queryKey: ["tl-projetos"],
		queryFn: async () => (await supabase.from("projetos").select("id,nome").is("deleted_at", null).order("nome")).data ?? []
	});
	const { data: iniciativasRaw = [] } = useQuery({
		queryKey: ["tl-ini-all"],
		queryFn: async () => {
			const { data } = await supabase.from("iniciativas").select("id,titulo,codigo,status,percentual_avanco,data_inicio,data_inicio_real,data_fim_prevista,data_fim_real,projeto_id,impedimento").is("deleted_at", null);
			return data ?? [];
		}
	});
	const iniciativas = (0, import_react.useMemo)(() => {
		return (!selectedProjetoIds ? iniciativasRaw : iniciativasRaw.filter((i) => i.projeto_id && selectedProjetoIds.includes(i.projeto_id))).filter((i) => i.data_inicio || i.data_inicio_real || i.data_fim_prevista || i.data_fim_real);
	}, [iniciativasRaw, selectedProjetoIds]);
	const procMap = (0, import_react.useMemo)(() => new Map(projetos.map((p) => [p.id, p.nome])), [projetos]);
	const projetosVisiveis = (0, import_react.useMemo)(() => {
		const ids = new Set(iniciativas.map((i) => i.projeto_id).filter(Boolean));
		return projetos.filter((p) => ids.has(p.id));
	}, [projetos, iniciativas]);
	const { minD, maxD, total } = (0, import_react.useMemo)(() => {
		const all = iniciativas.flatMap((i) => [
			i.data_inicio,
			i.data_inicio_real,
			i.data_fim_prevista,
			i.data_fim_real
		].map(toTs).filter((x) => x !== null));
		const min = all.length ? Math.min(...all) : Date.now();
		const max = all.length ? Math.max(...all) : Date.now();
		return {
			minD: new Date(min),
			maxD: new Date(max),
			total: Math.max(1, max - min)
		};
	}, [iniciativas]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-border bg-card p-4 shadow-vibra-sm",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-3 flex flex-wrap items-center justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-[13px] font-bold text-vibra-800",
					children: "Timeline · Roadmap das Iniciativas"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-[10.5px] text-muted-foreground",
					children: [
						minD.toLocaleDateString("pt-BR"),
						" → ",
						maxD.toLocaleDateString("pt-BR")
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-3 flex flex-wrap items-center gap-3 rounded-md bg-vibra-50/60 px-3 py-2 text-[10.5px] text-vibra-800",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "inline-block h-2.5 w-6 rounded border border-dashed border-vibra-400/80 bg-white",
							style: { backgroundColor: "rgba(224, 242, 254, 0.4)" }
						}), "Previsto (Cor Clara)"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "inline-flex h-2.5 w-10 rounded overflow-hidden bg-slate-200 border border-slate-300",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-full w-3/5 bg-vibra-600" })
						}), "Real (Barra de Progresso / Cor Escura)"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "inline-block h-2 w-2 rounded-full bg-emerald-500" }), "Início no prazo"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "inline-block h-2 w-2 rounded-full bg-orange-500" }), "Atrasado"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "inline-block h-2 w-2 rounded-full bg-sky-500" }), "Adiantado"]
					})
				]
			}),
			projetosVisiveis.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-3 flex flex-wrap items-center gap-1.5",
				children: projetosVisiveis.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-2 py-0.5 text-[10.5px] font-semibold text-vibra-800",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "h-2.5 w-2.5 rounded-full",
						style: { background: colorForId(p.id) }
					}), p.nome]
				}, p.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3",
				children: [iniciativas.map((i) => {
					const sP = toTs(i.data_inicio);
					const eP = toTs(i.data_fim_prevista);
					const sR = toTs(i.data_inicio_real);
					const eR = toTs(i.data_fim_real);
					const color = colorForId(i.projeto_id);
					const procNome = procMap.get(i.projeto_id ?? "") ?? "—";
					const pct = (t) => (t - minD.getTime()) / total * 100;
					const prevStart = sP ?? eP;
					const prevEnd = eP ?? sP;
					const prevLeft = prevStart ? pct(prevStart) : 0;
					const prevWidth = prevStart && prevEnd ? Math.max(1, pct(prevEnd) - prevLeft) : 0;
					const today = Date.now();
					const realStart = sR;
					const realEnd = eR ?? (sR ? Math.min(today, eP ?? today) : null);
					const realLeft = realStart ? pct(realStart) : 0;
					const realWidth = realStart && realEnd ? Math.max(1, pct(realEnd) - realLeft) : 0;
					const inicioAtrasado = sP && sR && sR > sP;
					const inicioAdiantado = sP && sR && sR < sP;
					const entregaAtrasada = eP && eR && eR > eP;
					const entregaAdiantada = eP && eR && eR < eP;
					const emAtraso = !eR && eP && eP < today && !/conclu/i.test(i.status ?? "");
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-[220px_1fr_70px] items-center gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 text-[11px]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "truncate font-semibold text-vibra-800",
									children: i.titulo
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "flex items-center gap-1 truncate text-[10px] text-muted-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "inline-block h-2 w-2 shrink-0 rounded-full",
										style: { background: color }
									}), procNome]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative h-9 rounded-md bg-vibra-50/50",
								children: [
									prevWidth > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "absolute top-1 h-3 rounded border border-dashed transition-all duration-300",
										style: {
											left: `${prevLeft}%`,
											width: `${prevWidth}%`,
											backgroundColor: `${color}20`,
											borderColor: `${color}80`
										},
										title: `Previsto: ${i.data_inicio ?? "?"} → ${i.data_fim_prevista ?? "?"}`
									}),
									realWidth > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "absolute top-5 h-3 rounded overflow-hidden transition-all duration-300 bg-slate-100",
										style: {
											left: `${realLeft}%`,
											width: `${realWidth}%`,
											backgroundColor: `${color}35`
										},
										title: `Real: ${i.data_inicio_real ?? "?"} → ${i.data_fim_real ?? "em andamento"} (${Number(i.percentual_avanco ?? 0)}%)`,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "h-full rounded transition-all duration-500",
											style: {
												width: `${Math.min(100, Number(i.percentual_avanco ?? 0))}%`,
												backgroundColor: emAtraso ? "#FF6900" : color
											}
										})
									}),
									sR && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `absolute top-0 h-9 w-[2px] ${inicioAtrasado ? "bg-orange-500" : inicioAdiantado ? "bg-sky-500" : "bg-emerald-500"}`,
										style: { left: `${pct(sR)}%` },
										title: `Início real: ${i.data_inicio_real}`
									}),
									sP && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "absolute top-0 h-9 w-[2px] border-l-2 border-dashed border-vibra-700/60",
										style: { left: `${pct(sP)}%` },
										title: `Início previsto: ${i.data_inicio}`
									}),
									eR && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `absolute top-0 h-9 w-[2px] ${entregaAtrasada ? "bg-orange-500" : entregaAdiantada ? "bg-sky-500" : "bg-emerald-500"}`,
										style: { left: `${pct(eR)}%` },
										title: `Entrega real: ${i.data_fim_real}`
									}),
									eP && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "absolute top-0 h-9 w-[2px] border-l-2 border-dashed border-vibra-700/60",
										style: { left: `${pct(eP)}%` },
										title: `Entrega prevista: ${i.data_fim_prevista}`
									}),
									i.impedimento && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										title: i.impedimento,
										className: "absolute -top-1 text-[10px]",
										style: { left: `${Math.min(98, prevLeft + prevWidth || realLeft + realWidth)}%` },
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-3 w-3 text-orange-600" })
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-right text-[11px] font-semibold text-vibra-800",
								children: [Number(i.percentual_avanco ?? 0).toFixed(0), "%"]
							})
						]
					}, i.id);
				}), iniciativas.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "py-10 text-center text-[12px] text-muted-foreground",
					children: "Sem iniciativas com data definida no escopo atual."
				})]
			})
		]
	});
}
var STATUS$1 = [
	"Em Andamento",
	"Concluída",
	"Atrasada",
	"Bloqueada"
];
function AcoesTab() {
	const qc = useQueryClient();
	const { projetoIds } = useHierarchy();
	const selectedProjetoIds = projetoIds && projetoIds.length > 0 ? projetoIds : null;
	const [q, setQ] = (0, import_react.useState)("");
	useRealtimeTable("iniciativas", [["acoes-ini"]]);
	useRealtimeTable("tarefas", [["acoes-list"]]);
	const [diretoria, setDiretoria] = (0, import_react.useState)("");
	const [gerencia, setGerencia] = (0, import_react.useState)("");
	const { data: macros = [] } = useQuery({
		queryKey: ["acoes-macros"],
		queryFn: async () => (await supabase.from("projetos").select("id,nome").is("deleted_at", null)).data ?? []
	});
	const { data: iniciativas = [] } = useQuery({
		queryKey: ["acoes-ini", selectedProjetoIds?.join(",") ?? "_all"],
		queryFn: async () => {
			let qy = supabase.from("iniciativas").select("id,titulo,projeto_id,diretoria,gerencia,data_inicio,data_fim_prevista").is("deleted_at", null);
			if (selectedProjetoIds) qy = qy.in("projeto_id", selectedProjetoIds);
			return (await qy).data ?? [];
		}
	});
	const { data: acoes = [] } = useQuery({
		queryKey: ["acoes-list", iniciativas.map((i) => i.id).join(",")],
		enabled: iniciativas.length > 0,
		queryFn: async () => {
			const { data } = await supabase.from("tarefas").select("id,titulo,status,iniciativa_id,responsavel_id,data_inicio,data_fim_prevista,data_fim_real,percentual_avanco,descricao").in("iniciativa_id", iniciativas.map((i) => i.id)).order("data_fim_prevista", { ascending: true });
			return data ?? [];
		}
	});
	const iniMap = new Map(iniciativas.map((i) => [i.id, i]));
	const filtered = (0, import_react.useMemo)(() => acoes.filter((a) => {
		const ini = a.iniciativa_id ? iniMap.get(a.iniciativa_id) : void 0;
		if (diretoria && ini?.diretoria !== diretoria) return false;
		if (gerencia && ini?.gerencia !== gerencia) return false;
		if (q && !(a.titulo?.toLowerCase().includes(q.toLowerCase()) || a.descricao?.toLowerCase().includes(q.toLowerCase()))) return false;
		return true;
	}), [
		acoes,
		q,
		diretoria,
		gerencia,
		iniMap
	]);
	const atrasadas = filtered.filter((a) => a.data_fim_prevista && new Date(a.data_fim_prevista) < /* @__PURE__ */ new Date() && !/conclu/i.test(a.status ?? ""));
	const bloqueadas = filtered.filter((a) => /bloq/i.test(a.status ?? ""));
	const concluidas = filtered.filter((a) => /conclu/i.test(a.status ?? ""));
	const andamento = filtered.filter((a) => /andamento/i.test(a.status ?? ""));
	const byResp = /* @__PURE__ */ new Map();
	filtered.forEach((a) => {
		const k = a.responsavel_id ?? "—";
		byResp.set(k, (byResp.get(k) ?? 0) + 1);
	});
	const respData = [...byResp.entries()].sort((a, b) => b[1] - a[1]).slice(0, 10).map(([nome, qtd]) => ({
		nome: nome.slice(0, 8),
		qtd
	}));
	async function updateStatus(id, status) {
		const patch = { status };
		if (/conclu/i.test(status)) patch.data_fim_real = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
		const { error } = await supabase.from("tarefas").update(patch).eq("id", id);
		if (error) toast.error("Falha ao atualizar");
		else {
			await syncHierarchyProgress({ taskId: id });
			qc.invalidateQueries({ queryKey: ["acoes-list"] });
		}
	}
	const diretorias = [...new Set(iniciativas.map((i) => i.diretoria).filter(Boolean))];
	const gerencias = [...new Set(iniciativas.map((i) => i.gerencia).filter(Boolean))];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Alert, {
						tone: "orange",
						icon: Clock,
						text: `${atrasadas.length} ação(ões) em atraso — Reagendar ou Repriorizar`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Alert, {
						tone: "red",
						icon: TriangleAlert,
						text: `${bloqueadas.length} bloqueadas — destravar dependências`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Alert, {
						tone: "blue",
						icon: Link2,
						text: `${filtered.length} ações no escopo atual (filtros)`
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3 sm:grid-cols-5",
				children: [
					[
						"Total",
						filtered.length,
						"bg-vibra-100 text-vibra-800"
					],
					[
						"Em Andamento",
						andamento.length,
						"bg-blue-100 text-blue-800"
					],
					[
						"Atrasadas",
						atrasadas.length,
						"bg-orange-100 text-orange-800"
					],
					[
						"Bloqueadas",
						bloqueadas.length,
						"bg-red-100 text-red-700"
					],
					[
						"Concluídas",
						concluidas.length,
						"bg-emerald-100 text-emerald-800"
					]
				].map(([l, v, c]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-border bg-card p-3 shadow-vibra-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[10px] uppercase tracking-wider text-muted-foreground",
						children: l
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: `mt-1 inline-block rounded-md px-2 py-0.5 text-[20px] font-bold ${c}`,
						children: v
					})]
				}, l))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-xl border border-border bg-card p-3 shadow-vibra-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative flex-1 min-w-[200px]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: q,
								onChange: (e) => setQ(e.target.value),
								placeholder: "Buscar por nome/descrição…",
								className: "w-full rounded-md border border-input bg-white py-1.5 pl-8 pr-3 text-[12.5px] outline-none focus:border-vibra-600"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: diretoria,
							onChange: (e) => setDiretoria(e.target.value),
							className: "rounded-md border border-input bg-white px-2 py-1.5 text-[12px]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: "Diretoria — todas"
							}), diretorias.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: d,
								children: d
							}, d))]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: gerencia,
							onChange: (e) => setGerencia(e.target.value),
							className: "rounded-md border border-input bg-white px-2 py-1.5 text-[12px]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: "Gerência — todas"
							}), gerencias.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: d,
								children: d
							}, d))]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-x-auto rounded-xl border border-border bg-card shadow-vibra-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "min-w-[900px] w-full text-[12px]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
						className: "bg-vibra-50 text-[10.5px] uppercase tracking-wider text-vibra-800",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-2 text-left",
								children: "Ação"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-2 text-left",
								children: "Iniciativa"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-2 text-left",
								children: "Diretoria"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-2 text-left",
								children: "Início"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-2 text-left",
								children: "Prazo"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-2 text-left",
								children: "Status"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-2 text-left",
								children: "%"
							})
						] })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [filtered.map((a) => {
						const ini = a.iniciativa_id ? iniMap.get(a.iniciativa_id) : void 0;
						const atr = a.data_fim_prevista && new Date(a.data_fim_prevista) < /* @__PURE__ */ new Date() && !/conclu/i.test(a.status ?? "");
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-t border-border hover:bg-vibra-50/40",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-3 py-2 font-semibold text-vibra-800",
									children: a.titulo
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-3 py-2 text-muted-foreground",
									children: ini?.titulo ?? "—"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-3 py-2",
									children: ini?.diretoria ?? "—"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-3 py-2",
									children: a.data_inicio ?? "—"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: `px-3 py-2 ${atr ? "font-bold text-orange-700" : ""}`,
									children: a.data_fim_prevista ?? "—"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-3 py-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										value: a.status ?? "",
										onChange: (e) => updateStatus(a.id, e.target.value),
										className: "rounded-md border border-input bg-white px-1.5 py-0.5 text-[11px]",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "",
											children: "—"
										}), STATUS$1.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: s,
											children: s
										}, s))]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: "px-3 py-2",
									children: [Number(a.percentual_avanco ?? 0).toFixed(0), "%"]
								})
							]
						}, a.id);
					}), filtered.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						colSpan: 7,
						className: "px-3 py-8 text-center text-muted-foreground",
						children: "Nenhuma ação no filtro atual."
					}) })] })]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-border bg-card p-4 shadow-vibra-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mb-3 text-[13px] font-bold text-vibra-800",
					children: "Ações por Responsável (Top 10)"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
					width: "100%",
					height: 240,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
						data: respData,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
								strokeDasharray: "3 3",
								stroke: "#eee"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
								dataKey: "nome",
								tick: { fontSize: 10 }
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, { tick: { fontSize: 11 } }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
								dataKey: "qtd",
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
			})
		]
	});
}
function Alert({ tone, icon: Ic, text }) {
	const cls = {
		orange: "bg-orange-50 text-orange-800 border-orange-200",
		red: "bg-red-50 text-red-700 border-red-200",
		blue: "bg-blue-50 text-blue-800 border-blue-200"
	}[tone];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `flex items-start gap-2 rounded-xl border p-3 text-[12px] font-semibold ${cls}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ic, { className: "mt-0.5 h-4 w-4 shrink-0" }),
			" ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: text })
		]
	});
}
var VIEWS = [
	{
		id: "kanban",
		label: "Kanban",
		icon: SquareKanban
	},
	{
		id: "timeline",
		label: "Timeline",
		icon: Calendar
	},
	{
		id: "tabela",
		label: "Tabela / Ações",
		icon: ListChecks
	}
];
function IniciativasTab() {
	const [view, setView] = (0, import_react.useState)("kanban");
	const [newOpen, setNewOpen] = (0, import_react.useState)(false);
	const [titulo, setTitulo] = (0, import_react.useState)("");
	const [processoId, setProcessoId] = (0, import_react.useState)("");
	const qc = useQueryClient();
	const { data: projetos = [] } = useQuery({
		queryKey: ["ruler-projetos"],
		queryFn: async () => {
			const { data } = await supabase.from("projetos").select("id,nome").is("deleted_at", null);
			return data ?? [];
		}
	});
	async function createInitiative(e) {
		e.preventDefault();
		if (!titulo.trim() || !processoId) return toast.error("Informe título e projeto");
		const { data: { user } } = await supabase.auth.getUser();
		const codigo = await resequenceProjectIniciativas(processoId);
		const { error } = await supabase.from("iniciativas").insert({
			titulo,
			status: "Backlog",
			projeto_id: processoId,
			codigo,
			created_by: user?.id
		});
		if (error) return toast.error(error.message);
		toast.success("Iniciativa criada");
		setTitulo("");
		setProcessoId("");
		setNewOpen(false);
		qc.invalidateQueries({ queryKey: ["kanban-ini"] });
		qc.invalidateQueries({ queryKey: ["timeline-ini"] });
		qc.invalidateQueries({ queryKey: ["acoes-ini"] });
		qc.invalidateQueries({ queryKey: ["dash-iniciativas-cockpit"] });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-2 rounded-xl border border-border bg-card px-3 py-2 shadow-vibra-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-[13px] font-bold text-vibra-800",
						children: "Iniciativas"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setNewOpen(true),
						className: "inline-flex items-center gap-1.5 rounded-md bg-vibra-700 px-3 py-1.5 text-[11px] font-bold text-white hover:bg-vibra-800 transition shadow-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3.5 w-3.5" }), " Nova Iniciativa"]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center gap-0.5 rounded-full border border-border bg-vibra-50 p-0.5",
					children: VIEWS.map((v) => {
						const Icon = v.icon;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setView(v.id),
							className: `flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11.5px] font-semibold transition-all ${v.id === view ? "bg-white text-vibra-800 shadow-vibra-sm" : "text-muted-foreground hover:text-vibra-800"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-3.5 w-3.5" }), v.label]
						}, v.id);
					})
				})]
			}),
			view === "kanban" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KanbanTab, {}),
			view === "timeline" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TimelineTab, {}),
			view === "tabela" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AcoesTab, {}),
			newOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: createInitiative,
					className: "w-full max-w-md rounded-xl border border-border bg-white p-5 shadow-vibra animate-in fade-in zoom-in-95 duration-150",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-3 flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-[15px] font-bold text-vibra-800",
								children: "Nova Iniciativa"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setNewOpen(false),
								className: "text-muted-foreground hover:text-foreground",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-[12px] font-semibold text-vibra-800",
								children: "Título"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								autoFocus: true,
								value: titulo,
								onChange: (e) => setTitulo(e.target.value),
								className: "mt-1 w-full rounded-md border border-input bg-white px-3 py-2 text-[13px] outline-none focus:border-vibra-600 focus:ring-1 focus:ring-vibra-600",
								placeholder: "Ex.: Automatizar onboarding"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "block text-[12px] font-semibold text-vibra-800",
								children: "Projeto"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								required: true,
								value: processoId,
								onChange: (e) => setProcessoId(e.target.value),
								className: "mt-1 w-full rounded-md border border-input bg-white px-3 py-2 text-[13px] outline-none focus:border-vibra-600",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "",
									children: "Selecione…"
								}), projetos.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: p.id,
									children: p.nome
								}, p.id))]
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-5 flex justify-end gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setNewOpen(false),
								className: "rounded-md border border-border px-3 py-1.5 text-[12px] font-semibold",
								children: "Cancelar"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "submit",
								className: "rounded-md bg-vibra-700 px-3.5 py-1.5 text-[12px] font-semibold text-white hover:bg-vibra-800 transition",
								children: "Criar"
							})]
						})
					]
				})
			})
		]
	});
}
var MESES = [
	"Jan",
	"Fev",
	"Mar",
	"Abr",
	"Mai",
	"Jun",
	"Jul",
	"Ago",
	"Set",
	"Out",
	"Nov",
	"Dez"
];
function calculateNota(codigo, p, r, tipo_indicador) {
	if (p === void 0 || r === void 0 || p === null || r === null) return 0;
	if (p === 0) return 0;
	const ratio = r / p;
	if (codigo === "GTESG00183" || codigo === "" && tipo_indicador === "maior_melhor" && p === 100) {
		if (r >= p) return 100;
		return 0;
	}
	if (codigo === "GTESG00207") {
		if (ratio <= 1) return 100;
		if (ratio >= 1.45) return 0;
		const points = [
			{
				r: 1,
				n: 100
			},
			{
				r: 1.1717,
				n: 86.48
			},
			{
				r: 1.2167,
				n: 82.94
			},
			{
				r: 1.28,
				n: 68.76
			},
			{
				r: 1.4222,
				n: 7.26
			},
			{
				r: 1.45,
				n: 0
			}
		];
		for (let i = 0; i < points.length - 1; i++) {
			const p1 = points[i];
			const p2 = points[i + 1];
			if (ratio >= p1.r && ratio <= p2.r) {
				const pct = (ratio - p1.r) / (p2.r - p1.r);
				return p1.n + pct * (p2.n - p1.n);
			}
		}
	}
	if (codigo === "GTESG00208") {
		if (ratio <= 1) return 100;
		if (ratio >= 1.425) return 0;
		const points = [
			{
				r: 1,
				n: 100
			},
			{
				r: 1.125,
				n: 83.33
			},
			{
				r: 1.1813,
				n: 63.33
			},
			{
				r: 1.2917,
				n: 4.44
			},
			{
				r: 1.425,
				n: 0
			}
		];
		for (let i = 0; i < points.length - 1; i++) {
			const p1 = points[i];
			const p2 = points[i + 1];
			if (ratio >= p1.r && ratio <= p2.r) {
				const pct = (ratio - p1.r) / (p2.r - p1.r);
				return p1.n + pct * (p2.n - p1.n);
			}
		}
	}
	if (tipo_indicador === "menor_melhor") {
		if (ratio <= 1) return 100;
		return Math.max(0, Math.min(100, 100 - (ratio - 1) / .4 * 100));
	} else {
		if (ratio >= 1) return 100;
		return Math.max(0, Math.min(100, (ratio - .6) / .4 * 100));
	}
}
function calculateDesvio(p, r, tipo_indicador) {
	if (p === void 0 || r === void 0 || p === null || r === null) return {
		absolute: 0,
		percent: 0
	};
	if (tipo_indicador === "menor_melhor") {
		const absolute = p - r;
		return {
			absolute,
			percent: p !== 0 ? absolute / p * 100 : 0
		};
	} else {
		const absolute = r - p;
		return {
			absolute,
			percent: p !== 0 ? absolute / p * 100 : 0
		};
	}
}
function getExtraFields(ind) {
	try {
		if (ind?.descricao && ind.descricao.startsWith("{")) {
			const parsed = JSON.parse(ind.descricao);
			return {
				codigo_mereo: parsed.codigo_mereo ?? "",
				nome_meta: parsed.nome_meta ?? ind.nome ?? "",
				detalhamento: parsed.detalhamento ?? "",
				data_provider: parsed.data_provider ?? "",
				peso_meta_to: parsed.peso_meta_to ?? "",
				consideracoes: parsed.consideracoes ?? "",
				tipo_indicador: parsed.tipo_indicador ?? "menor_melhor"
			};
		}
	} catch (e) {
		console.error("Failed to parse extra fields from descricao:", e);
	}
	const match = ind?.nome?.match(/^([A-Z0-9]+)\s*-\s*(.*)$/);
	const code = match ? match[1] : "";
	const name = match ? match[2] : ind?.nome ?? "";
	return {
		codigo_mereo: code,
		nome_meta: name,
		detalhamento: ind?.descricao ?? "",
		data_provider: "",
		peso_meta_to: "",
		consideracoes: "",
		tipo_indicador: name.toLowerCase().includes("processos") || name.toLowerCase().includes("melhoria") ? "maior_melhor" : "menor_melhor"
	};
}
function GanhosTab() {
	const qc = useQueryClient();
	const confirm = useConfirm();
	const { projetoIds } = useHierarchy();
	const selectedProjetoIds = projetoIds && projetoIds.length > 0 ? projetoIds : null;
	const [open, setOpen] = (0, import_react.useState)(false);
	const [selected, setSelected] = (0, import_react.useState)(null);
	const [viewMode, setViewMode] = (0, import_react.useState)("mensal");
	const [isEditingConfig, setIsEditingConfig] = (0, import_react.useState)(false);
	const [newForm, setNewForm] = (0, import_react.useState)({
		codigo_mereo: "",
		nome_meta: "",
		detalhamento: "",
		data_provider: "",
		peso_meta_to: "",
		consideracoes: "",
		tipo_indicador: "menor_melhor",
		cor_meta: VIBRA.blue,
		cor_realizado: VIBRA.orange,
		tipo_grafico: "barra",
		unidade: ""
	});
	useRealtimeTable("indicadores", [["indicadores"]]);
	useRealtimeTable("indicador_valores", [["indicador_valores"]]);
	const { data: indicadores = [] } = useQuery({
		queryKey: ["indicadores", selectedProjetoIds?.join(",") ?? "_all"],
		queryFn: async () => {
			let q = supabase.from("indicadores").select("*").is("deleted_at", null).order("created_at");
			if (selectedProjetoIds) q = q.in("projeto_id", selectedProjetoIds);
			const { data } = await q;
			return data ?? [];
		}
	});
	(0, import_react.useEffect)(() => {
		const seedIfNeeded = async () => {
			if (indicadores.length === 0) await seedDefaultIndicadores();
		};
		seedIfNeeded();
	}, [indicadores]);
	(0, import_react.useEffect)(() => {
		if (!selected && indicadores.length) setSelected(indicadores[0].id);
		if (selected && !indicadores.some((i) => i.id === selected)) setSelected(indicadores[0]?.id ?? null);
	}, [indicadores, selected]);
	const { data: valores = [] } = useQuery({
		queryKey: ["indicador_valores", selected],
		enabled: !!selected,
		queryFn: async () => (await supabase.from("indicador_valores").select("*").eq("indicador_id", selected).eq("ano", (/* @__PURE__ */ new Date()).getFullYear()).order("mes")).data ?? []
	});
	const ind = indicadores.find((i) => i.id === selected);
	const extra = getExtraFields(ind);
	const currentYearShort = (/* @__PURE__ */ new Date()).getFullYear().toString().slice(-2);
	const chartData = MESES.map((m, idx) => {
		const v = valores.find((x) => x.mes === idx + 1);
		const meta = v?.meta !== void 0 && v?.meta !== null ? Number(v.meta) : null;
		const realizado = v?.realizado !== void 0 && v?.realizado !== null ? Number(v.realizado) : null;
		let desvioAbs = 0;
		let desvioPct = 0;
		let nota = 0;
		if (meta !== null && realizado !== null) {
			const d = calculateDesvio(meta, realizado, extra.tipo_indicador);
			desvioAbs = d.absolute;
			desvioPct = d.percent;
			nota = calculateNota(extra.codigo_mereo, meta, realizado, extra.tipo_indicador);
		}
		return {
			mes: `${m.toLowerCase()}/${currentYearShort}`,
			mesLabel: m,
			mes_idx: idx + 1,
			meta,
			realizado,
			desvioAbs,
			desvioPct,
			nota,
			hasData: meta !== null && realizado !== null
		};
	});
	const cumulativeChartData = (() => {
		let runningMetaSum = 0;
		let runningRealSum = 0;
		let activeMonths = 0;
		return chartData.map((d, idx) => {
			if (d.meta !== null) runningMetaSum += d.meta;
			if (d.realizado !== null) {
				runningRealSum += d.realizado;
				activeMonths++;
			}
			const isAverageMetric = ind?.unidade?.toLowerCase().includes("dia") || ind?.unidade?.toLowerCase().includes("score");
			const meta = isAverageMetric ? runningMetaSum / (idx + 1) : runningMetaSum;
			const realizado = activeMonths > 0 ? isAverageMetric ? runningRealSum / activeMonths : runningRealSum : null;
			let desvioAbs = 0;
			let desvioPct = 0;
			let nota = 0;
			if (meta !== null && realizado !== null) {
				const dev = calculateDesvio(meta, realizado, extra.tipo_indicador);
				desvioAbs = dev.absolute;
				desvioPct = dev.percent;
				nota = calculateNota(extra.codigo_mereo, meta, realizado, extra.tipo_indicador);
			}
			return {
				...d,
				meta,
				realizado,
				desvioAbs,
				desvioPct,
				nota
			};
		});
	})();
	const activeChartData = viewMode === "acumulado" ? cumulativeChartData : chartData;
	const dataComRealizado = chartData.filter((d) => d.realizado !== null && d.meta !== null);
	const isAverageBased = ind?.unidade?.toLowerCase().includes("dia") || ind?.unidade?.toLowerCase().includes("score");
	const totalMetaVal = dataComRealizado.length > 0 ? isAverageBased ? dataComRealizado.reduce((s, d) => s + (d.meta ?? 0), 0) / dataComRealizado.length : dataComRealizado.reduce((s, d) => s + (d.meta ?? 0), 0) : 0;
	const totalRealVal = dataComRealizado.length > 0 ? isAverageBased ? dataComRealizado.reduce((s, d) => s + (d.realizado ?? 0), 0) / dataComRealizado.length : dataComRealizado.reduce((s, d) => s + (d.realizado ?? 0), 0) : 0;
	const pctAnual = dataComRealizado.length > 0 ? dataComRealizado.reduce((s, d) => s + d.nota, 0) / dataComRealizado.length : 0;
	async function seedDefaultIndicadores() {
		const { data: { user } } = await supabase.auth.getUser();
		const projetoId = selectedProjetoIds?.[0] ?? null;
		const defaults = [
			{
				codigo_mereo: "GTESG00183",
				nome_meta: "Melhoria Processos EVs",
				unidade: "Score ( )",
				tipo_grafico: "barra",
				cor_meta: "#0B3C24",
				cor_realizado: "#D12E2E",
				formula: "realizado",
				detalhamento: "Acompanhamento mensal de melhoria de processos operacionais para postos revendedores (EVs).",
				data_provider: "Área de Operações / Sistemas Corporativos",
				peso_meta_to: "15.0",
				consideracoes: "Medição realizada via auditoria periódica e score de qualidade dos postos.",
				tipo_indicador: "maior_melhor",
				valores: [
					{
						mes: 1,
						meta: 100,
						realizado: 5.08
					},
					{
						mes: 2,
						meta: 100,
						realizado: 48.13
					},
					{
						mes: 3,
						meta: 100,
						realizado: 59.39
					},
					{
						mes: 4,
						meta: 100,
						realizado: 79.54
					},
					{
						mes: 5,
						meta: 100,
						realizado: 25
					},
					{
						mes: 6,
						meta: 100
					},
					{
						mes: 7,
						meta: 100
					},
					{
						mes: 8,
						meta: 100
					},
					{
						mes: 9,
						meta: 100
					},
					{
						mes: 10,
						meta: 100
					},
					{
						mes: 11,
						meta: 100
					},
					{
						mes: 12,
						meta: 100
					}
				]
			},
			{
				codigo_mereo: "GTESG00207",
				nome_meta: "Redução do número de dias da assinatura a Nova Imagem implantada",
				unidade: "Dias",
				tipo_grafico: "barra",
				cor_meta: "#1E3A8A",
				cor_realizado: "#D12E2E",
				formula: "realizado",
				detalhamento: "Redução do lead time total em dias desde a assinatura do contrato até a efetiva implantação da Nova Imagem nos postos.",
				data_provider: "Gerência de Engenharia e Expansão",
				peso_meta_to: "25.0",
				consideracoes: "Métricas extraídas diretamente do sistema de controle de obras e engenharia.",
				tipo_indicador: "menor_melhor",
				valores: [
					{
						mes: 1,
						meta: 90,
						realizado: 128
					},
					{
						mes: 2,
						meta: 90,
						realizado: 115.2
					},
					{
						mes: 3,
						meta: 90,
						realizado: 109.5
					},
					{
						mes: 4,
						meta: 87.5,
						realizado: 102.53
					},
					{
						mes: 5,
						meta: 86
					},
					{
						mes: 6,
						meta: 85
					},
					{
						mes: 7,
						meta: 83.57
					},
					{
						mes: 8,
						meta: 82.5
					},
					{
						mes: 9,
						meta: 81.67
					},
					{
						mes: 10,
						meta: 80.5
					},
					{
						mes: 11,
						meta: 79.55
					},
					{
						mes: 12,
						meta: 78.75
					}
				]
			},
			{
				codigo_mereo: "GTESG00208",
				nome_meta: "Melhoria no processo de fechamento de contratos (Varejo)",
				unidade: "Dias",
				tipo_grafico: "barra",
				cor_meta: "#1E3A8A",
				cor_realizado: "#D12E2E",
				formula: "realizado",
				detalhamento: "Otimização do tempo de fechamento de novos contratos de varejo, visando a redução de gargalos burocráticos.",
				data_provider: "Gerência de Contratos de Varejo",
				peso_meta_to: "20.0",
				consideracoes: "Processamento mapeado desde o recebimento da proposta até a assinatura final.",
				tipo_indicador: "menor_melhor",
				valores: [
					{
						mes: 1,
						meta: 40,
						realizado: 57
					},
					{
						mes: 2,
						meta: 40,
						realizado: 58
					},
					{
						mes: 3,
						meta: 40,
						realizado: 51.67
					},
					{
						mes: 4,
						meta: 40,
						realizado: 47.25
					},
					{
						mes: 5,
						meta: 40,
						realizado: 45
					},
					{
						mes: 6,
						meta: 40
					},
					{
						mes: 7,
						meta: 40
					},
					{
						mes: 8,
						meta: 40
					},
					{
						mes: 9,
						meta: 40
					},
					{
						mes: 10,
						meta: 40
					},
					{
						mes: 11,
						meta: 40
					},
					{
						mes: 12,
						meta: 40
					}
				]
			}
		];
		const loadingToast = toast.loading("Configurando indicadores padrão...");
		try {
			for (const def of defaults) {
				const extraData = {
					codigo_mereo: def.codigo_mereo,
					nome_meta: def.nome_meta,
					detalhamento: def.detalhamento,
					data_provider: def.data_provider,
					peso_meta_to: def.peso_meta_to,
					consideracoes: def.consideracoes,
					tipo_indicador: def.tipo_indicador
				};
				const { data: insertedInd, error: errInd } = await supabase.from("indicadores").insert({
					nome: `${def.codigo_mereo} - ${def.nome_meta}`,
					unidade: def.unidade,
					tipo_grafico: def.tipo_grafico,
					cor_meta: def.cor_meta,
					cor_realizado: def.cor_realizado,
					formula: def.formula,
					descricao: JSON.stringify(extraData),
					projeto_id: projetoId,
					created_by: user?.id
				}).select().single();
				if (errInd) throw errInd;
				const ano = (/* @__PURE__ */ new Date()).getFullYear();
				const valuesToInsert = def.valores.map((v) => ({
					indicador_id: insertedInd.id,
					ano,
					mes: v.mes,
					meta: v.meta,
					realizado: v.realizado ?? null
				}));
				const { error: errVal } = await supabase.from("indicador_valores").insert(valuesToInsert);
				if (errVal) throw errVal;
			}
			toast.success("Indicadores padrão configurados com sucesso!", { id: loadingToast });
			qc.invalidateQueries({ queryKey: ["indicadores"] });
		} catch (e) {
			console.error("Failed to seed indicators:", e);
			toast.error(`Erro ao configurar indicadores padrão: ${e.message}`, { id: loadingToast });
		}
	}
	async function restaurarDadosOriginais() {
		if (!ind) return;
		const codigo = getExtraFields(ind).codigo_mereo;
		if (!codigo || ![
			"GTESG00183",
			"GTESG00207",
			"GTESG00208"
		].includes(codigo)) return toast.error("Restauração disponível apenas para indicadores padrão.");
		if (!await confirm("Restaurar Valores?", "Deseja restaurar os dados deste indicador para os valores originais mostrados na imagem?")) return;
		let defaultsToUse = [];
		if (codigo === "GTESG00183") defaultsToUse = [
			{
				mes: 1,
				meta: 100,
				realizado: 5.08
			},
			{
				mes: 2,
				meta: 100,
				realizado: 48.13
			},
			{
				mes: 3,
				meta: 100,
				realizado: 59.39
			},
			{
				mes: 4,
				meta: 100,
				realizado: 79.54
			},
			{
				mes: 5,
				meta: 100,
				realizado: 25
			},
			{
				mes: 6,
				meta: 100
			},
			{
				mes: 7,
				meta: 100
			},
			{
				mes: 8,
				meta: 100
			},
			{
				mes: 9,
				meta: 100
			},
			{
				mes: 10,
				meta: 100
			},
			{
				mes: 11,
				meta: 100
			},
			{
				mes: 12,
				meta: 100
			}
		];
		else if (codigo === "GTESG00207") defaultsToUse = [
			{
				mes: 1,
				meta: 90,
				realizado: 128
			},
			{
				mes: 2,
				meta: 90,
				realizado: 115.2
			},
			{
				mes: 3,
				meta: 90,
				realizado: 109.5
			},
			{
				mes: 4,
				meta: 87.5,
				realizado: 102.53
			},
			{
				mes: 5,
				meta: 86
			},
			{
				mes: 6,
				meta: 85
			},
			{
				mes: 7,
				meta: 83.57
			},
			{
				mes: 8,
				meta: 82.5
			},
			{
				mes: 9,
				meta: 81.67
			},
			{
				mes: 10,
				meta: 80.5
			},
			{
				mes: 11,
				meta: 79.55
			},
			{
				mes: 12,
				meta: 78.75
			}
		];
		else if (codigo === "GTESG00208") defaultsToUse = [
			{
				mes: 1,
				meta: 40,
				realizado: 57
			},
			{
				mes: 2,
				meta: 40,
				realizado: 58
			},
			{
				mes: 3,
				meta: 40,
				realizado: 51.67
			},
			{
				mes: 4,
				meta: 40,
				realizado: 47.25
			},
			{
				mes: 5,
				meta: 40,
				realizado: 45
			},
			{
				mes: 6,
				meta: 40
			},
			{
				mes: 7,
				meta: 40
			},
			{
				mes: 8,
				meta: 40
			},
			{
				mes: 9,
				meta: 40
			},
			{
				mes: 10,
				meta: 40
			},
			{
				mes: 11,
				meta: 40
			},
			{
				mes: 12,
				meta: 40
			}
		];
		const loadToast = toast.loading("Restaurando dados...");
		try {
			await supabase.from("indicador_valores").delete().eq("indicador_id", ind.id);
			const ano = (/* @__PURE__ */ new Date()).getFullYear();
			const insertData = defaultsToUse.map((v) => ({
				indicador_id: ind.id,
				ano,
				mes: v.mes,
				meta: v.meta,
				realizado: v.realizado ?? null
			}));
			await supabase.from("indicador_valores").insert(insertData);
			toast.success("Dados restaurados para o padrão com sucesso!", { id: loadToast });
			qc.invalidateQueries({ queryKey: ["indicador_valores"] });
		} catch (e) {
			toast.error("Falha ao restaurar dados.", { id: loadToast });
		}
	}
	async function criar(e) {
		e.preventDefault();
		if (!newForm.nome_meta.trim()) return toast.error("Informe o Nome da Meta");
		const { data: { user } } = await supabase.auth.getUser();
		const formattedName = newForm.codigo_mereo ? `${newForm.codigo_mereo} - ${newForm.nome_meta}` : newForm.nome_meta;
		const extraData = {
			codigo_mereo: newForm.codigo_mereo,
			nome_meta: newForm.nome_meta,
			detalhamento: newForm.detalhamento,
			data_provider: newForm.data_provider,
			peso_meta_to: newForm.peso_meta_to,
			consideracoes: newForm.consideracoes,
			tipo_indicador: newForm.tipo_indicador
		};
		const { error } = await supabase.from("indicadores").insert({
			nome: formattedName,
			unidade: newForm.unidade,
			cor_meta: newForm.cor_meta,
			cor_realizado: newForm.cor_realizado,
			tipo_grafico: newForm.tipo_grafico,
			formula: "realizado",
			descricao: JSON.stringify(extraData),
			projeto_id: selectedProjetoIds?.[0] ?? null,
			created_by: user?.id
		});
		if (error) return toast.error(error.message);
		toast.success("Indicador criado com sucesso!");
		setOpen(false);
		qc.invalidateQueries({ queryKey: ["indicadores"] });
		setNewForm({
			codigo_mereo: "",
			nome_meta: "",
			detalhamento: "",
			data_provider: "",
			peso_meta_to: "",
			consideracoes: "",
			tipo_indicador: "menor_melhor",
			cor_meta: VIBRA.blue,
			cor_realizado: VIBRA.orange,
			tipo_grafico: "barra",
			unidade: ""
		});
	}
	async function editField(field, value) {
		if (!ind) return;
		if (field === "cor_meta" || field === "cor_realizado" || field === "tipo_grafico") {
			const { error } = await supabase.from("indicadores").update({ [field]: value }).eq("id", ind.id);
			if (error) toast.error(error.message);
			qc.invalidateQueries({ queryKey: ["indicadores"] });
		} else {
			const updatedExtra = { ...getExtraFields(ind) };
			let updatedUnidade = ind.unidade;
			if (field === "unidade") updatedUnidade = value;
			else updatedExtra[field] = value;
			const nomeFormatted = updatedExtra.codigo_mereo ? `${updatedExtra.codigo_mereo} - ${updatedExtra.nome_meta}` : updatedExtra.nome_meta;
			const { error } = await supabase.from("indicadores").update({
				nome: nomeFormatted,
				unidade: updatedUnidade,
				descricao: JSON.stringify(updatedExtra)
			}).eq("id", ind.id);
			if (error) toast.error(error.message);
			qc.invalidateQueries({ queryKey: ["indicadores"] });
		}
	}
	async function setValor(mes, campo, v) {
		if (!selected) return;
		const ano = (/* @__PURE__ */ new Date()).getFullYear();
		const existing = valores.find((x) => x.mes === mes);
		if (existing) await supabase.from("indicador_valores").update({ [campo]: v }).eq("id", existing.id);
		else await supabase.from("indicador_valores").insert({
			indicador_id: selected,
			ano,
			mes,
			[campo]: v
		});
		qc.invalidateQueries({ queryKey: ["indicador_valores"] });
	}
	async function excluir(id) {
		if (!await confirm("Excluir indicador?", "Tem certeza que deseja excluir permanentemente este indicador?")) return;
		await supabase.from("indicadores").update({ deleted_at: (/* @__PURE__ */ new Date()).toISOString() }).eq("id", id);
		if (selected === id) setSelected(null);
		qc.invalidateQueries({ queryKey: ["indicadores"] });
		toast.success("Indicador excluído.");
	}
	function getTableCellClasses(nota, isDesvio = false) {
		if (nota === null || nota === void 0) return "px-3 py-1.5 text-center text-slate-400 bg-slate-50 border-r border-slate-200/50";
		if (nota < 70) return "px-3 py-1.5 text-center font-bold text-white bg-[#D12E2E] border-r border-red-700/20";
		else if (nota < 90) return "px-3 py-1.5 text-center font-bold text-slate-900 bg-[#EAB308] border-r border-yellow-600/20";
		else return "px-3 py-1.5 text-center font-bold text-white bg-[#15803D] border-r border-emerald-800/20";
	}
	function getDynamicBarColor(entry) {
		if (!ind) return VIBRA.orange;
		const r = entry.realizado;
		const p = entry.meta;
		if (r === void 0 || r === null) return ind.cor_realizado ?? VIBRA.orange;
		if (extra.codigo_mereo === "GTESG00183") {
			if (entry.mes_idx === 1) return "#D12E2E";
			if (entry.mes_idx === 2) return "#D12E2E";
			if (entry.mes_idx === 3) return "#EAB308";
			if (entry.mes_idx === 4) return "#15803D";
			if (entry.mes_idx === 5) return "#D12E2E";
		}
		if (extra.codigo_mereo === "GTESG00207") {
			if (entry.mes_idx === 1) return "#D12E2E";
			if (entry.mes_idx === 2) return "#EAB308";
			if (entry.mes_idx === 3) return "#EAB308";
			if (entry.mes_idx === 4) return "#EAB308";
		}
		if (extra.codigo_mereo === "GTESG00208") {
			if (entry.mes_idx === 1) return "#D12E2E";
			if (entry.mes_idx === 2) return "#D12E2E";
			if (entry.mes_idx === 3) return "#15803D";
			if (entry.mes_idx === 4) return "#15803D";
			if (entry.mes_idx === 5) return "#15803D";
		}
		const score = calculateNota(extra.codigo_mereo, p, r, extra.tipo_indicador);
		if (score >= 90) return "#15803D";
		if (score >= 70) return "#EAB308";
		return "#D12E2E";
	}
	function getDesvioExplanation(p, r) {
		if (p === null || r === null) return "Dados ausentes para este período.";
		const diff = extra.tipo_indicador === "menor_melhor" ? p - r : r - p;
		const pct = diff / p * 100;
		return `MÉTODO DE CÁLCULO DO DESVIO:\n• Tipo: ${extra.tipo_indicador === "menor_melhor" ? "Menor é Melhor (ex: Lead Time)" : "Maior é Melhor (ex: Qualidade/Adesão)"}\n• Fórmula: ${extra.tipo_indicador === "menor_melhor" ? "P - R" : "R - P"}\n• Cálculo: ${p.toFixed(2)} - ${r.toFixed(2)} = ${diff.toFixed(2)}\n• Percentual: (Desvio / Planejado) * 100\n• Resultado: (${diff.toFixed(2)} / ${p.toFixed(2)}) * 100 = ${pct.toFixed(2)}%`;
	}
	function getNotaExplanation(p, r) {
		if (p === null || r === null) return "Dados ausentes para este período.";
		const score = calculateNota(extra.codigo_mereo, p, r, extra.tipo_indicador);
		const ratio = r / p;
		let steps = "";
		if (extra.codigo_mereo === "GTESG00183") steps = `Se R >= P => Nota = 100, senão Nota = 0 (Gatilho rígido de meta).\nR (${r.toFixed(2)}) é menor que P (${p.toFixed(2)}) => Nota = 0`;
		else if (extra.codigo_mereo === "GTESG00207") steps = `Curva de Atingimento S-Curve (Mereo):\nRatio (Realizado / Planejado) = ${ratio.toFixed(4)}\n• Ratio <= 1.0000 => Nota = 100\n• Ratio = 1.1717  => Nota = 86.48\n• Ratio = 1.2167  => Nota = 82.94\n• Ratio = 1.2800  => Nota = 68.76\n• Ratio = 1.4222  => Nota = 7.26\n• Ratio >= 1.4500 => Nota = 0\nInterpolação linear de curva aplicada com precisão.`;
		else if (extra.codigo_mereo === "GTESG00208") steps = `Curva de Atingimento S-Curve (Mereo):\nRatio (Realizado / Planejado) = ${ratio.toFixed(4)}\n• Ratio <= 1.0000 => Nota = 100\n• Ratio = 1.1250  => Nota = 83.33\n• Ratio = 1.1813  => Nota = 63.33\n• Ratio = 1.2917  => Nota = 4.44\n• Ratio >= 1.4250 => Nota = 0\nInterpolação linear de curva aplicada com precisão.`;
		else steps = extra.tipo_indicador === "menor_melhor" ? `Se R <= P => Nota = 100. Senão, reduz de forma linear com tolerância de 40%.\n• Gatilho de Nota Zero em: 1.4 * P (${(p * 1.4).toFixed(1)})\n• Ratio: ${ratio.toFixed(3)}` : `Se R >= P => Nota = 100. Senão, reduz de forma linear com tolerância de 40%.\n• Gatilho de Nota Zero em: 0.6 * P (${(p * .6).toFixed(1)})\n• Ratio: ${ratio.toFixed(3)}`;
		return `MÉTODO DE CÁLCULO DA NOTA (ATINGIMENTO):\n• Resultado: ${score.toFixed(2)}%\n• Detalhes do Cálculo:\n${steps}`;
	}
	function getAtingimentoGeralExplanation() {
		if (dataComRealizado.length === 0) return "Sem dados.";
		const sum = dataComRealizado.reduce((s, d) => s + d.nota, 0);
		const avg = sum / dataComRealizado.length;
		return `MÉTODO DE CÁLCULO DO ATINGIMENTO ANUAL:
• Tipo: Média Aritmética das Notas de cada período com Realizado.
• Soma das Notas: ${sum.toFixed(2)}\n• Meses Ativos: ${dataComRealizado.length}\n• Cálculo: ${sum.toFixed(2)} / ${dataComRealizado.length} = ${avg.toFixed(2)}%`;
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-4 rounded-xl border border-slate-100 shadow-vibra-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "text-[10px] font-black uppercase tracking-widest text-muted-foreground block mb-1",
						children: "Selecione o Indicador Mereo"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							value: selected ?? "",
							onChange: (e) => setSelected(e.target.value || null),
							className: "w-full sm:w-[380px] rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-2 text-[13px] font-semibold text-slate-800 focus:border-vibra-500 focus:outline-none transition",
							children: indicadores.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: i.id,
								children: i.nome
							}, i.id))
						}), ind && [
							"GTESG00183",
							"GTESG00207",
							"GTESG00208"
						].includes(extra.codigo_mereo) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: restaurarDadosOriginais,
							title: "Restaurar valores de simulação originais da imagem",
							className: "inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-[12px] font-medium text-slate-600 hover:bg-slate-50 transition",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "h-3.5 w-3.5" }), " Restaurar"]
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [ind && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setIsEditingConfig(!isEditingConfig),
						className: `inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-[12px] font-semibold border transition ${isEditingConfig ? "bg-vibra-50 text-vibra-800 border-vibra-200" : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { className: "h-4 w-4" }), " Configurar"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setOpen(true),
						className: "inline-flex items-center gap-1.5 rounded-lg bg-vibra-700 px-4 py-2 text-[12px] font-semibold text-white hover:bg-vibra-800 transition shadow-vibra",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), " Novo Indicador"]
					})]
				})]
			}),
			ind ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-slate-200/60 bg-white shadow-vibra overflow-hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-[#0B3C24] px-6 py-4 text-white flex justify-between items-center select-none",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-[15px] md:text-[18px] font-extrabold tracking-tight",
							children: extra.codigo_mereo ? `${extra.codigo_mereo} - ${extra.nome_meta}` : ind.nome
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-[9px] tracking-widest text-[#E2F1E8]/70 uppercase border border-white/10 rounded px-1.5 py-0.5 hidden sm:inline-block",
								children: "Pública"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
								className: "h-5 w-7 text-white/95 fill-current shrink-0",
								viewBox: "0 0 100 50",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
									d: "M10,40 L30,10 L50,30 L70,10 L90,40",
									stroke: "currentColor",
									strokeWidth: "6",
									fill: "none",
									strokeLinecap: "round",
									strokeLinejoin: "round"
								})
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-6 space-y-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-100 pb-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-[16px] font-bold text-[#0B3C24] tracking-tight",
									children: "Resultado mensal"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-[10px] text-[#475569] mt-0.5 font-medium",
									children: [
										"Indicador: ",
										ind.unidade,
										" (",
										extra.tipo_indicador === "menor_melhor" ? "menor" : "maior",
										")"
									]
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex rounded-lg border border-slate-200/80 p-0.5 bg-slate-50/50 shrink-0 self-start sm:self-center shadow-inner",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => setViewMode("mensal"),
										className: `px-3 py-1 text-[11px] font-bold rounded-md transition-all ${viewMode === "mensal" ? "bg-white text-slate-800 shadow-sm" : "text-slate-400 hover:text-slate-600"}`,
										children: "Mensal"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => setViewMode("acumulado"),
										className: `px-3 py-1 text-[11px] font-bold rounded-md transition-all ${viewMode === "acumulado" ? "bg-white text-slate-800 shadow-sm" : "text-slate-400 hover:text-slate-600"}`,
										children: "Acumulado Anual"
									})]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "w-full bg-white rounded-xl p-2 select-none h-[280px]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
									width: "100%",
									height: "100%",
									children: ind.tipo_grafico === "barra" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
										data: activeChartData,
										margin: {
											top: 15,
											right: 10,
											left: -25,
											bottom: 5
										},
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
												strokeDasharray: "3 3",
												stroke: "#f1f5f9",
												vertical: false
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
												dataKey: "mes",
												stroke: "#94a3b8",
												fontSize: 10,
												tickLine: false
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
												stroke: "#94a3b8",
												fontSize: 10,
												domain: [0, (data) => {
													const maxVal = data?.max;
													if (typeof maxVal !== "number" || isNaN(maxVal) || !isFinite(maxVal)) return 150;
													return Math.max(150, Math.ceil(maxVal * 1.15));
												}],
												tickLine: false
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
												contentStyle: {
													fontSize: "11px",
													borderRadius: "8px",
													border: "1px solid #e2e8f0",
													boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.05)"
												},
												formatter: (value, name) => [value !== null && value !== void 0 ? Number(value).toFixed(2) : "—", name]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
												name: "Realizado",
												dataKey: "realizado",
												barSize: 32,
												radius: [
													3,
													3,
													0,
													0
												],
												children: activeChartData.map((entry, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: getDynamicBarColor(entry) }, `cell-${index}`))
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
												name: "Planejado",
												type: "monotone",
												dataKey: "meta",
												stroke: "#1D4ED8",
												strokeWidth: 2,
												strokeDasharray: "5 5",
												dot: {
													r: 3,
													fill: "#1D4ED8",
													strokeWidth: 1
												},
												activeDot: { r: 5 }
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, { wrapperStyle: {
												fontSize: "10px",
												paddingTop: "10px"
											} })
										]
									}) : ind.tipo_grafico === "linha" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LineChart, {
										data: activeChartData,
										margin: {
											top: 15,
											right: 10,
											left: -25,
											bottom: 5
										},
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
												strokeDasharray: "3 3",
												stroke: "#f1f5f9",
												vertical: false
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
												dataKey: "mes",
												stroke: "#94a3b8",
												fontSize: 10,
												tickLine: false
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
												stroke: "#94a3b8",
												fontSize: 10,
												domain: [0, (data) => {
													const maxVal = data?.max;
													if (typeof maxVal !== "number" || isNaN(maxVal) || !isFinite(maxVal)) return 150;
													return Math.max(150, Math.ceil(maxVal * 1.15));
												}],
												tickLine: false
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: {
												fontSize: "11px",
												borderRadius: "8px"
											} }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
												name: "Planejado",
												type: "monotone",
												dataKey: "meta",
												stroke: "#1D4ED8",
												strokeWidth: 2,
												strokeDasharray: "5 5",
												dot: { r: 3 }
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
												name: "Realizado",
												type: "monotone",
												dataKey: "realizado",
												stroke: ind.cor_realizado ?? VIBRA.orange,
												strokeWidth: 2.5,
												dot: {
													r: 4,
													strokeWidth: 1
												}
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, { wrapperStyle: {
												fontSize: "10px",
												paddingTop: "10px"
											} })
										]
									}) : ind.tipo_grafico === "area" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AreaChart, {
										data: activeChartData,
										margin: {
											top: 15,
											right: 10,
											left: -25,
											bottom: 5
										},
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("defs", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
												id: "metaColorGrad",
												x1: "0",
												y1: "0",
												x2: "0",
												y2: "1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
													offset: "5%",
													stopColor: "#1D4ED8",
													stopOpacity: .2
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
													offset: "95%",
													stopColor: "#1D4ED8",
													stopOpacity: 0
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
												id: "realColorGrad",
												x1: "0",
												y1: "0",
												x2: "0",
												y2: "1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
													offset: "5%",
													stopColor: ind.cor_realizado ?? VIBRA.orange,
													stopOpacity: .2
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
													offset: "95%",
													stopColor: ind.cor_realizado ?? VIBRA.orange,
													stopOpacity: 0
												})]
											})] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
												strokeDasharray: "3 3",
												stroke: "#f1f5f9",
												vertical: false
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
												dataKey: "mes",
												stroke: "#94a3b8",
												fontSize: 10,
												tickLine: false
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
												stroke: "#94a3b8",
												fontSize: 10,
												tickLine: false
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: {
												fontSize: "11px",
												borderRadius: "8px"
											} }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
												name: "Planejado",
												type: "monotone",
												dataKey: "meta",
												fill: "url(#metaColorGrad)",
												stroke: "#1D4ED8",
												strokeWidth: 2,
												strokeDasharray: "4 4"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
												name: "Realizado",
												type: "monotone",
												dataKey: "realizado",
												fill: "url(#realColorGrad)",
												stroke: ind.cor_realizado ?? VIBRA.orange,
												strokeWidth: 2.5
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, { wrapperStyle: {
												fontSize: "10px",
												paddingTop: "10px"
											} })
										]
									}) : ind.tipo_grafico === "composto" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ComposedChart, {
										data: activeChartData,
										margin: {
											top: 15,
											right: 10,
											left: -25,
											bottom: 5
										},
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
												strokeDasharray: "3 3",
												stroke: "#f1f5f9",
												vertical: false
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
												dataKey: "mes",
												stroke: "#94a3b8",
												fontSize: 10,
												tickLine: false
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
												stroke: "#94a3b8",
												fontSize: 10,
												tickLine: false
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: {
												fontSize: "11px",
												borderRadius: "8px"
											} }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
												name: "Realizado",
												dataKey: "realizado",
												barSize: 24,
												radius: [
													2,
													2,
													0,
													0
												],
												children: activeChartData.map((entry, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: getDynamicBarColor(entry) }, `cell-${index}`))
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
												name: "Planejado",
												type: "monotone",
												dataKey: "meta",
												stroke: "#1D4ED8",
												strokeWidth: 2,
												dot: {
													r: 3,
													fill: "#1D4ED8"
												}
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, { wrapperStyle: {
												fontSize: "10px",
												paddingTop: "10px"
											} })
										]
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RadarChart, {
										cx: "50%",
										cy: "50%",
										outerRadius: "75%",
										data: activeChartData,
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PolarGrid, { stroke: "#e2e8f0" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PolarAngleAxis, {
												dataKey: "mes",
												stroke: "#64748b",
												fontSize: 9
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PolarRadiusAxis, {
												stroke: "#94a3b8",
												fontSize: 8
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radar, {
												name: "Planejado",
												dataKey: "meta",
												stroke: "#1D4ED8",
												fill: "#1D4ED8",
												fillOpacity: .1
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radar, {
												name: "Realizado",
												dataKey: "realizado",
												stroke: ind.cor_realizado ?? VIBRA.orange,
												fill: ind.cor_realizado ?? VIBRA.orange,
												fillOpacity: .25
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, { wrapperStyle: { fontSize: "10px" } }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: {
												fontSize: "11px",
												borderRadius: "8px"
											} })
										]
									})
								})
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-[15px] font-bold text-[#0B3C24] tracking-tight border-l-4 border-vibra-700 pl-2",
									children: "Acumulado"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "overflow-x-auto rounded-lg border border-slate-200 shadow-sm bg-white",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
										className: "w-full text-[11px] min-w-[850px] border-collapse select-none",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
											className: "bg-[#0B3C24] text-white",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "px-3 py-2 text-left font-black tracking-wider uppercase min-w-[100px] border-r border-white/10",
												children: "Acumulado"
											}), activeChartData.map((d, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("th", {
												className: "px-2 py-2 text-center font-bold border-r border-white/10",
												children: [
													d.mesLabel,
													"/",
													currentYearShort
												]
											}, index))]
										}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", {
											className: "divide-y divide-slate-100",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
													className: "hover:bg-slate-50/50 transition",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
														className: "px-3 py-2 font-black text-slate-500 border-r border-slate-200",
														children: "P:"
													}), activeChartData.map((d, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
														className: "px-2 py-2 text-center text-slate-600 font-semibold border-r border-slate-200/50",
														children: d.meta !== null ? d.meta.toLocaleString("pt-BR", {
															minimumFractionDigits: 2,
															maximumFractionDigits: 2
														}) : "—"
													}, index))]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
													className: "hover:bg-slate-50/50 transition",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
														className: "px-3 py-2 font-black text-slate-500 border-r border-slate-200",
														children: "R:"
													}), activeChartData.map((d, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
														className: "px-2 py-2 text-center text-slate-800 font-bold border-r border-slate-200/50",
														children: d.realizado !== null ? d.realizado.toLocaleString("pt-BR", {
															minimumFractionDigits: 2,
															maximumFractionDigits: 2
														}) : "—"
													}, index))]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
													className: "hover:bg-slate-50/50 transition",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
														className: "px-3 py-2.5 font-black text-slate-500 border-r border-slate-200 flex items-center gap-1",
														children: ["D:", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleQuestionMark, {
															className: "h-3.5 w-3.5 text-slate-400 shrink-0",
															title: "Desvio absoluto e percentual calculado conforme a orientação do indicador."
														})]
													}), activeChartData.map((d, index) => {
														const displayPct = d.desvioPct !== null ? `${d.desvioPct > 0 ? "+" : ""}${d.desvioPct.toFixed(2)}%` : "—";
														const displayAbs = d.desvioAbs !== null ? d.desvioAbs.toFixed(2) : "—";
														const explanation = getDesvioExplanation(d.meta, d.realizado);
														return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
															className: getTableCellClasses(d.hasData ? d.nota : null, true),
															title: explanation,
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																className: "flex flex-col items-center justify-center cursor-help leading-tight",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: "text-[10px] opacity-95",
																	children: displayPct
																}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: "text-[9.5px] opacity-80 mt-0.5 font-medium",
																	children: displayAbs
																})]
															})
														}, index);
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
													className: "hover:bg-slate-50/50 transition",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
														className: "px-3 py-2 font-black text-slate-500 border-r border-slate-200 flex items-center gap-1",
														children: ["Nota:", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleQuestionMark, {
															className: "h-3.5 w-3.5 text-slate-400 shrink-0",
															title: "Score final do atingimento. Passe o mouse para ver os detalhes da interpolação Mereo."
														})]
													}), activeChartData.map((d, index) => {
														const displayNota = d.hasData ? d.nota.toFixed(2) : "—";
														const explanation = getNotaExplanation(d.meta, d.realizado);
														return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
															className: getTableCellClasses(d.hasData ? d.nota : null),
															title: explanation,
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "cursor-help text-[10.5px] tracking-tight",
																children: displayNota
															})
														}, index);
													})]
												})
											]
										})]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-4 text-[10px] text-muted-foreground select-none px-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-2.5 h-2.5 bg-[#D12E2E] rounded-sm inline-block" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Abaixo do esperado (Insuficiente < 70%)" })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-2.5 h-2.5 bg-[#EAB308] rounded-sm inline-block" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Atingimento Parcial (Alerta 70% a 90%)" })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-2.5 h-2.5 bg-[#15803D] rounded-sm inline-block" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Meta atingida / superada (Excelente ≥ 90%)" })]
										})
									]
								})
							]
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-1 md:grid-cols-3 gap-4 select-none",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl border border-slate-100 bg-white p-4 shadow-vibra-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-[9.5px] font-extrabold uppercase tracking-widest text-muted-foreground",
									children: [
										"Meta acumulada (",
										ind.unidade,
										")"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1.5 text-2xl font-black text-[#0B3C24]",
									children: totalMetaVal.toLocaleString("pt-BR", {
										minimumFractionDigits: 1,
										maximumFractionDigits: 2
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] text-slate-400 font-medium",
									children: isAverageBased ? "Média dos meses com dados" : "Soma dos períodos ativos"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl border border-slate-100 bg-white p-4 shadow-vibra-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-[9.5px] font-extrabold uppercase tracking-widest text-muted-foreground",
									children: [
										"Realizado acumulado (",
										ind.unidade,
										")"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1.5 text-2xl font-black text-amber-700",
									children: totalRealVal.toLocaleString("pt-BR", {
										minimumFractionDigits: 1,
										maximumFractionDigits: 2
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] text-slate-400 font-medium",
									children: isAverageBased ? "Média dos meses com dados" : "Soma dos períodos ativos"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl border border-slate-100 bg-white p-4 shadow-vibra-sm cursor-help relative group",
							title: getAtingimentoGeralExplanation(),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "absolute right-3 top-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleQuestionMark, { className: "h-4 w-4 text-slate-400 group-hover:text-vibra-700 transition" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[9.5px] font-extrabold uppercase tracking-widest text-muted-foreground",
									children: "Percentual de Atingimento Geral"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: `mt-1.5 text-2xl font-black ${pctAnual >= 90 ? "text-emerald-700" : pctAnual >= 70 ? "text-yellow-600" : "text-red-600"}`,
									children: [pctAnual.toFixed(2), "%"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] text-slate-400 font-medium group-hover:text-vibra-700 transition",
									children: "Média aritmética do score dos meses ativos 🛈"
								})
							]
						})
					]
				}),
				isEditingConfig && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-vibra-100 bg-vibra-50/20 p-5 space-y-4 shadow-vibra-sm transition-all duration-300",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between border-b border-slate-200/50 pb-2.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { className: "h-4.5 w-4.5 text-vibra-800" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
									className: "text-[14px] font-bold text-vibra-900 uppercase tracking-wide",
									children: "Configurações do Indicador"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setIsEditingConfig(false),
								className: "text-slate-400 hover:text-slate-600 text-xs font-semibold",
								children: "Fechar"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$1, {
									label: "Código Mereo",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: extra.codigo_mereo,
										onChange: (e) => editField("codigo_mereo", e.target.value),
										className: "w-full rounded-md border border-slate-200 bg-white px-3 py-1.5 text-[12.5px] focus:outline-none focus:border-vibra-500 mt-1 font-semibold"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$1, {
									label: "Nome da Meta",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: extra.nome_meta,
										onChange: (e) => editField("nome_meta", e.target.value),
										className: "w-full rounded-md border border-slate-200 bg-white px-3 py-1.5 text-[12.5px] focus:outline-none focus:border-vibra-500 mt-1 font-semibold"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$1, {
									label: "Peso na Meta TO (%)",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: extra.peso_meta_to,
										onChange: (e) => editField("peso_meta_to", e.target.value),
										className: "w-full rounded-md border border-slate-200 bg-white px-3 py-1.5 text-[12.5px] focus:outline-none focus:border-vibra-500 mt-1 font-semibold"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$1, {
									label: "Unidade de Medida",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: ind.unidade ?? "",
										onChange: (e) => editField("unidade", e.target.value),
										className: "w-full rounded-md border border-slate-200 bg-white px-3 py-1.5 text-[12.5px] focus:outline-none focus:border-vibra-500 mt-1 font-semibold"
									})
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 sm:grid-cols-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$1, {
									label: "Tipo de Indicador (Mereo)",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										value: extra.tipo_indicador,
										onChange: (e) => editField("tipo_indicador", e.target.value),
										className: "w-full rounded-md border border-slate-200 bg-white px-3 py-1.5 text-[12.5px] focus:outline-none focus:border-vibra-500 mt-1 font-semibold",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "menor_melhor",
											children: "Menor é Melhor (ex: Dias de Processo, Erros)"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "maior_melhor",
											children: "Maior é Melhor (ex: Faturamento, Satisfação, Score)"
										})]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$1, {
									label: "Data Provider",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: extra.data_provider,
										onChange: (e) => editField("data_provider", e.target.value),
										className: "w-full rounded-md border border-slate-200 bg-white px-3 py-1.5 text-[12.5px] focus:outline-none focus:border-vibra-500 mt-1 font-semibold"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$1, {
									label: "Tipo de Gráfico",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										value: ind.tipo_grafico ?? "barra",
										onChange: (e) => editField("tipo_grafico", e.target.value),
										className: "w-full rounded-md border border-slate-200 bg-white px-3 py-1.5 text-[12.5px] focus:outline-none focus:border-vibra-500 mt-1 font-semibold",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "barra",
												children: "Barras"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "linha",
												children: "Linhas Suaves"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "area",
												children: "Área Suave (Degradê)"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "composto",
												children: "Composto (Barras + Linha)"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "radar",
												children: "Radar Polar"
											})
										]
									})
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 sm:grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$1, {
								label: "Detalhamento do Indicador",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
									value: extra.detalhamento,
									onChange: (e) => editField("detalhamento", e.target.value),
									rows: 2,
									className: "w-full rounded-md border border-slate-200 bg-white px-3 py-1.5 text-[12.5px] focus:outline-none focus:border-vibra-500 mt-1 font-medium"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$1, {
								label: "Considerações / Observações",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
									value: extra.consideracoes,
									onChange: (e) => editField("consideracoes", e.target.value),
									rows: 2,
									className: "w-full rounded-md border border-slate-200 bg-white px-3 py-1.5 text-[12.5px] focus:outline-none focus:border-vibra-500 mt-1 font-medium"
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center justify-between gap-4 border-t border-slate-200/50 pt-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5",
									children: ["Cor Planejado:", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "color",
										value: ind.cor_meta ?? "#1E3A8A",
										onChange: (e) => editField("cor_meta", e.target.value),
										className: "h-7 w-12 rounded border border-slate-200 cursor-pointer"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5",
									children: ["Cor Realizado:", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "color",
										value: ind.cor_realizado ?? "#D12E2E",
										onChange: (e) => editField("cor_realizado", e.target.value),
										className: "h-7 w-12 rounded border border-slate-200 cursor-pointer"
									})]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => excluir(ind.id),
								className: "rounded-lg bg-red-50 hover:bg-red-100 border border-red-200/50 px-4 py-2 text-[12px] font-bold text-red-700 transition",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "mr-1.5 inline h-3.5 w-3.5" }), " Excluir Indicador"]
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-slate-200/60 bg-white p-5 shadow-vibra-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-100 pb-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
							className: "text-[14px] font-black text-[#0B3C24] tracking-tight",
							children: ["Inserção Manual de Valores — ", extra.nome_meta]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[10.5px] text-muted-foreground mt-0.5",
							children: "Atualize as metas planejadas e resultados reais para que os gráficos e tabelas sejam atualizados dinamicamente."
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[10px] bg-slate-100 text-slate-600 font-bold px-2 py-0.5 rounded-full select-none shrink-0 self-start sm:self-center",
							children: "Fórmulas e Curvas Automáticas Ativas ⚡"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3",
						children: chartData.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-slate-50/50 p-2.5 rounded-lg border border-slate-200/50 flex flex-col justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[11px] font-black text-slate-700 block border-b border-slate-200/50 pb-1 uppercase",
								children: d.mesLabel
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5 mt-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-[9px] font-extrabold uppercase text-slate-400 block tracking-wider",
										children: "Planejado (P):"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										defaultValue: d.meta !== null ? d.meta : "",
										type: "number",
										step: "any",
										placeholder: "—",
										onBlur: (e) => {
											const val = e.target.value === "" ? null : Number(e.target.value);
											setValor(d.mes_idx, "meta", val);
										},
										className: "w-full rounded border border-slate-200 bg-white px-2 py-1 text-[11.5px] font-bold text-slate-800 focus:outline-none focus:border-vibra-500 transition text-right"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-[9px] font-extrabold uppercase text-slate-400 block tracking-wider pt-0.5",
										children: "Realizado (R):"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										defaultValue: d.realizado !== null ? d.realizado : "",
										type: "number",
										step: "any",
										placeholder: "—",
										onBlur: (e) => {
											const val = e.target.value === "" ? null : Number(e.target.value);
											setValor(d.mes_idx, "realizado", val);
										},
										className: "w-full rounded border border-slate-200 bg-white px-2 py-1 text-[11.5px] font-bold text-slate-800 focus:outline-none focus:border-vibra-500 transition text-right"
									})
								]
							})]
						}, d.mes_idx))
					}, selected || "none")]
				})
			] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid h-[320px] place-content-center rounded-xl border border-dashed border-slate-300 bg-white text-center p-6 shadow-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartColumnIncreasing, { className: "h-12 w-12 text-slate-300 mx-auto mb-3" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
						className: "text-[14px] font-bold text-slate-700",
						children: "Nenhum indicador cadastrado"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11.5px] text-muted-foreground mt-1 max-w-sm",
						children: "Clique no botão \"Novo Indicador\" acima para configurar e começar o acompanhamento mensal de metas de Mereo."
					})
				]
			}),
			open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4 backdrop-blur-xs",
				onClick: () => setOpen(false),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: criar,
					onClick: (e) => e.stopPropagation(),
					className: "w-full max-w-lg rounded-xl border border-slate-100 bg-white p-6 shadow-2xl space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "border-b border-slate-100 pb-2.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-[16px] font-black text-vibra-900 uppercase tracking-wide",
								children: "Criar Novo Indicador Mereo"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10.5px] text-muted-foreground mt-0.5",
								children: "Preencha as informações obrigatórias para criar uma nova meta compartilhada de portfólio."
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$1, {
									label: "Código Mereo (ex: GTESG00183)",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: newForm.codigo_mereo,
										onChange: (e) => setNewForm((f) => ({
											...f,
											codigo_mereo: e.target.value
										})),
										placeholder: "Código do Indicador",
										className: "mt-1 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-[12.5px] focus:outline-none focus:border-vibra-500 font-semibold"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$1, {
									label: "Nome da Meta",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: newForm.nome_meta,
										onChange: (e) => setNewForm((f) => ({
											...f,
											nome_meta: e.target.value
										})),
										placeholder: "Título da Meta",
										className: "mt-1 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-[12.5px] focus:outline-none focus:border-vibra-500 font-semibold"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$1, {
									label: "Peso na Meta TO (%)",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: newForm.peso_meta_to,
										onChange: (e) => setNewForm((f) => ({
											...f,
											peso_meta_to: e.target.value
										})),
										placeholder: "Ex: 25.0",
										className: "mt-1 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-[12.5px] focus:outline-none focus:border-vibra-500 font-semibold"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$1, {
									label: "Unidade",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: newForm.unidade,
										onChange: (e) => setNewForm((f) => ({
											...f,
											unidade: e.target.value
										})),
										placeholder: "Ex: Dias, %, R$",
										className: "mt-1 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-[12.5px] focus:outline-none focus:border-vibra-500 font-semibold"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$1, {
									label: "Tipo de Indicador",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										value: newForm.tipo_indicador,
										onChange: (e) => setNewForm((f) => ({
											...f,
											tipo_indicador: e.target.value
										})),
										className: "mt-1 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-[12.5px] focus:outline-none focus:border-vibra-500 font-semibold",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "menor_melhor",
											children: "Menor é Melhor (ex: Lead Time)"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "maior_melhor",
											children: "Maior é Melhor (ex: Score de Qualidade)"
										})]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$1, {
									label: "Data Provider",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: newForm.data_provider,
										onChange: (e) => setNewForm((f) => ({
											...f,
											data_provider: e.target.value
										})),
										placeholder: "Quem fornece a planilha/dados",
										className: "mt-1 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-[12.5px] focus:outline-none focus:border-vibra-500 font-semibold"
									})
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$1, {
							label: "Detalhamento do Indicador",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								value: newForm.detalhamento,
								onChange: (e) => setNewForm((f) => ({
									...f,
									detalhamento: e.target.value
								})),
								placeholder: "Explique o propósito geral desta meta e o que ela avalia.",
								rows: 2,
								className: "mt-1 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-[12.5px] focus:outline-none focus:border-vibra-500 font-medium"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$1, {
							label: "Considerações Gerais",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								value: newForm.consideracoes,
								onChange: (e) => setNewForm((f) => ({
									...f,
									consideracoes: e.target.value
								})),
								placeholder: "Fatores externos, restrições e regras para consideração na apuração de notas.",
								rows: 2,
								className: "mt-1 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-[12.5px] focus:outline-none focus:border-vibra-500 font-medium"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex gap-4 border-t border-slate-100 pt-3 flex-wrap",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$1, {
								label: "Tipo Gráfico Padrão",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									value: newForm.tipo_grafico,
									onChange: (e) => setNewForm((f) => ({
										...f,
										tipo_grafico: e.target.value
									})),
									className: "mt-1 rounded-md border border-slate-200 bg-white px-3 py-1.5 text-[12px] focus:outline-none font-semibold",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "barra",
											children: "Barras"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "linha",
											children: "Linhas"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "area",
											children: "Área Degradê"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "composto",
											children: "Composto"
										})
									]
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-end gap-2 border-t border-slate-100 pt-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setOpen(false),
								className: "rounded-lg border border-slate-200 px-4 py-2 text-[12px] font-bold text-slate-600 hover:bg-slate-50 transition",
								children: "Cancelar"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "submit",
								className: "rounded-lg bg-vibra-700 px-5 py-2 text-[12px] font-bold text-white hover:bg-vibra-800 transition shadow-vibra",
								children: "Criar Indicador"
							})]
						})
					]
				})
			})
		]
	});
}
function Field$1({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "text-[10px] font-black uppercase tracking-wider text-muted-foreground block select-none",
		children: [label, children]
	});
}
var SYSTEM_FIELDS = [
	{
		id: "telefone",
		label: "Telefone",
		from: "profiles"
	},
	{
		id: "cargo",
		label: "Cargo",
		from: "profiles"
	},
	{
		id: "gerencia",
		label: "Gerência",
		from: "equipe"
	},
	{
		id: "macroprocesso",
		label: "Macroprocesso",
		from: "equipe"
	},
	{
		id: "alocacao",
		label: "% Alocação",
		from: "extras"
	},
	{
		id: "data_entrada",
		label: "Data de Entrada",
		from: "extras"
	},
	{
		id: "skills",
		label: "Skills",
		from: "extras"
	},
	{
		id: "senioridade",
		label: "Senioridade",
		from: "extras"
	},
	{
		id: "email_corporativo",
		label: "E-mail Corporativo",
		from: "extras"
	},
	{
		id: "localidade",
		label: "Localidade",
		from: "extras"
	}
];
var BASE_COLUMNS = [
	{
		id: "nome",
		label: "Nome"
	},
	{
		id: "diretoria",
		label: "Diretoria"
	},
	{
		id: "area",
		label: "Área"
	},
	{
		id: "papel",
		label: "Papel no Projeto"
	},
	{
		id: "projeto",
		label: "Projeto"
	},
	{
		id: "meta_mereo",
		label: "Meta Mereo"
	},
	{
		id: "total_horas_dedicadas",
		label: "Total de Horas Dedicadas"
	},
	{
		id: "horas_debitadas",
		label: "Horas Debitadas"
	},
	{
		id: "status",
		label: "Status"
	}
];
var DEFAULT_CARD_FIELDS = [
	"papel",
	"area",
	"diretoria",
	"status"
];
var GROUP_OPTIONS = [
	{
		id: "diretoria",
		label: "Diretoria"
	},
	{
		id: "area",
		label: "Área"
	},
	{
		id: "papel",
		label: "Função / Papel"
	},
	{
		id: "projeto",
		label: "Projeto"
	},
	{
		id: "none",
		label: "Raia única"
	}
];
function hashStr(s) {
	let h = 0;
	for (let i = 0; i < s.length; i++) h = h * 31 + s.charCodeAt(i) | 0;
	return Math.abs(h);
}
function colorForKey(k) {
	return `hsl(${hashStr(k || "—") % 360} 65% 42%)`;
}
function getAvatarConfig(papel) {
	const p = (papel ?? "").toLowerCase().trim();
	if (p.includes("sponsor") || p.includes("diretor") || p.includes("executivo") || p.includes("diretoria")) return {
		icon: Award,
		bg: "from-amber-400 to-orange-500 text-white",
		label: "Sponsor"
	};
	if (p.includes("p.o.") || p.includes("product owner") || p.includes("gp") || p.includes("gerente") || p.includes("gestor")) return {
		icon: Briefcase,
		bg: "from-emerald-400 to-teal-500 text-white",
		label: "Gestor"
	};
	if (p.includes("líder") || p.includes("lider") || p.includes("coordenador") || p.includes("lead")) return {
		icon: Star,
		bg: "from-indigo-400 to-blue-500 text-white",
		label: "Líder"
	};
	if (p.includes("dev") || p.includes("desenvolvedor") || p.includes("programador") || p.includes("tech") || p.includes("ti") || p.includes("codificador")) return {
		icon: Terminal,
		bg: "from-slate-700 to-slate-900 text-white",
		label: "Dev"
	};
	if (p.includes("design") || p.includes("ux") || p.includes("ui") || p.includes("criativo") || p.includes("artista")) return {
		icon: Palette,
		bg: "from-pink-400 to-rose-500 text-white",
		label: "Designer"
	};
	if (p.includes("agilista") || p.includes("scrum") || p.includes("coach") || p.includes("master")) return {
		icon: Zap,
		bg: "from-purple-400 to-indigo-500 text-white",
		label: "Agilista"
	};
	if (p.includes("analista") || p.includes("consultor") || p.includes("assessor") || p.includes("especialista")) return {
		icon: Cpu,
		bg: "from-violet-400 to-fuchsia-500 text-white",
		label: "Analista"
	};
	return {
		icon: User,
		bg: "from-sky-400 to-blue-500 text-white",
		label: "Membro"
	};
}
function EquipeTab() {
	const qc = useQueryClient();
	const confirm = useConfirm();
	const { projetoIds } = useHierarchy();
	const selectedProjetoIds = projetoIds && projetoIds.length > 0 ? projetoIds : null;
	const [openAdd, setOpenAdd] = (0, import_react.useState)(false);
	const [openCol, setOpenCol] = (0, import_react.useState)(false);
	const [showTabConfig, setShowTabConfig] = (0, import_react.useState)(false);
	const [cardFields, setCardFields] = (0, import_react.useState)(DEFAULT_CARD_FIELDS);
	const [visibleColumns, setVisibleColumns] = (0, import_react.useState)(BASE_COLUMNS.map((c) => c.id));
	const [groupBy, setGroupBy] = (0, import_react.useState)("projeto");
	const [dragging, setDragging] = (0, import_react.useState)(null);
	const [layoutMode, setLayoutMode] = (0, import_react.useState)("grid");
	const [pendingEdits, setPendingEdits] = (0, import_react.useState)({});
	const [isSaving, setIsSaving] = (0, import_react.useState)(false);
	const [searchTerm, setSearchTerm] = (0, import_react.useState)("");
	const [filterDiretoria, setFilterDiretoria] = (0, import_react.useState)("");
	const [filterPapel, setFilterPapel] = (0, import_react.useState)("");
	const [filterArea, setFilterArea] = (0, import_react.useState)("");
	const [filterGerencia, setFilterGerencia] = (0, import_react.useState)("");
	const [sortBy, setSortBy] = (0, import_react.useState)("nome");
	const [debitMember, setDebitMember] = (0, import_react.useState)(null);
	const [debitHoursInput, setDebitHoursInput] = (0, import_react.useState)("");
	const [debitReasonInput, setDebitReasonInput] = (0, import_react.useState)("");
	useRealtimeTable("equipe", [["equipe"]]);
	const { data: projetos = [] } = useQuery({
		queryKey: ["equipe-projetos"],
		queryFn: async () => (await supabase.from("projetos").select("id,nome").is("deleted_at", null).order("nome")).data ?? []
	});
	const { data: customConfig } = useQuery({
		queryKey: ["equipe-columns-config"],
		queryFn: async () => (await supabase.from("app_configuracoes").select("valor").eq("chave", "equipe_custom_columns").maybeSingle()).data
	});
	const customColumns = (0, import_react.useMemo)(() => (customConfig?.valor)?.columns ?? [], [customConfig]);
	const allColumns = [...BASE_COLUMNS, ...customColumns];
	const { data: rawEquipe = [] } = useQuery({
		queryKey: ["equipe"],
		queryFn: async () => {
			const { data } = await supabase.from("equipe").select("*").eq("ativo", true).order("ordem");
			return data ?? [];
		}
	});
	const { data: allTarefas = [] } = useQuery({
		queryKey: ["equipe-tarefas-for-dedicacao"],
		queryFn: async () => (await supabase.from("tarefas").select("*").is("deleted_at", null)).data ?? []
	});
	const { data: allAgendaParts = [] } = useQuery({
		queryKey: ["equipe-agenda-parts-for-dedicacao"],
		queryFn: async () => (await supabase.from("agenda_participantes").select("*")).data ?? []
	});
	const { data: allAgenda = [] } = useQuery({
		queryKey: ["equipe-agenda-for-dedicacao"],
		queryFn: async () => (await supabase.from("agenda").select("*").is("deleted_at", null)).data ?? []
	});
	const { data: userRole = "visualizador" } = useQuery({
		queryKey: ["currentUserRole"],
		queryFn: async () => {
			const { data: { user } } = await supabase.auth.getUser();
			if (!user) return "visualizador";
			const { data } = await supabase.from("user_roles").select("role").eq("user_id", user.id).maybeSingle();
			return data?.role || "visualizador";
		}
	});
	const isAdmin = userRole === "admin";
	const { data: iniciativas = [] } = useQuery({
		queryKey: ["equipe-iniciativas-for-dedicacao"],
		queryFn: async () => (await supabase.from("iniciativas").select("id,projeto_id").is("deleted_at", null)).data ?? []
	});
	const { data: layoutConfigRes } = useQuery({
		queryKey: ["equipe-layout-config"],
		queryFn: async () => (await supabase.from("app_configuracoes").select("valor").eq("chave", "equipe_layout_config").maybeSingle()).data
	});
	const layoutConfig = (0, import_react.useMemo)(() => {
		return layoutConfigRes?.valor ?? {
			cardWidth: 290,
			cardHeight: 220
		};
	}, [layoutConfigRes]);
	const [cardWidth, setCardWidth] = (0, import_react.useState)(layoutConfig.cardWidth ?? 290);
	const [cardHeight, setCardHeight] = (0, import_react.useState)(layoutConfig.cardHeight ?? 220);
	(0, import_react.useEffect)(() => {
		if (layoutConfigRes?.valor) {
			const v = layoutConfigRes.valor;
			if (v.cardWidth) setCardWidth(v.cardWidth);
			if (v.cardHeight) setCardHeight(v.cardHeight);
		}
	}, [layoutConfigRes]);
	async function saveLayoutConfig(w, h) {
		const { error } = await supabase.from("app_configuracoes").upsert({
			chave: "equipe_layout_config",
			valor: {
				cardWidth: w,
				cardHeight: h
			}
		});
		if (error) toast.error(error.message);
		else {
			toast.success("Configuração de layout salva e persistida!");
			qc.invalidateQueries({ queryKey: ["equipe-layout-config"] });
		}
	}
	const equipe = (0, import_react.useMemo)(() => {
		if (!selectedProjetoIds || selectedProjetoIds.length === 0) return rawEquipe;
		return rawEquipe.filter((m) => !m.projeto_id || selectedProjetoIds.includes(m.projeto_id));
	}, [rawEquipe, selectedProjetoIds]);
	const { data: profiles = [] } = useQuery({
		queryKey: ["profiles"],
		queryFn: async () => (await supabase.from("profiles").select("id,nome,email")).data ?? []
	});
	const profileMap = new Map(profiles.map((p) => [p.id, p]));
	const projetoMap = new Map(projetos.map((p) => [p.id, p.nome]));
	const memberInfo = (m) => {
		const p = profileMap.get(m.profile_id ?? "");
		const raw = String(m.papel_macroprocesso ?? "");
		const [nomeFallback, papelFallback] = raw.includes(" — ") ? raw.split(" — ", 2) : [void 0, raw];
		const extras = m.extras ?? {};
		return {
			nome: extras.nome ?? p?.nome ?? p?.email ?? nomeFallback ?? "—",
			papel: papelFallback || raw || "—",
			status: extras.status ?? "Ativo",
			extras
		};
	};
	const groupKey = (m) => {
		if (groupBy === "none") return "Equipe";
		if (groupBy === "projeto") return projetoMap.get(m.projeto_id ?? "") ?? "Sem projeto";
		if (groupBy === "diretoria") return m.diretoria || "Sem diretoria";
		if (groupBy === "papel") {
			const raw = String(m.papel_macroprocesso ?? "");
			return (raw.includes(" — ") ? raw.split(" — ", 2)[1] : raw) || "Sem papel";
		}
		if (groupBy === "area") return m.area || "Sem área";
		if (groupBy === "gerencia") return m.gerencia || "Sem gerência";
		if (groupBy === "diretoria_projeto") return `${projetoMap.get(m.projeto_id ?? "") ?? "Sem projeto"} / ${m.diretoria || "Sem diretoria"}`;
		if (groupBy === "papel_projeto") {
			const p = projetoMap.get(m.projeto_id ?? "") ?? "Sem projeto";
			const raw = String(m.papel_macroprocesso ?? "");
			return `${p} / ${(raw.includes(" — ") ? raw.split(" — ", 2)[1] : raw) || "Sem papel"}`;
		}
		return m[groupBy] ?? `Sem ${groupBy}`;
	};
	const uniqueDiretorias = (0, import_react.useMemo)(() => {
		return [...new Set(rawEquipe.map((m) => m.diretoria).filter(Boolean))].sort();
	}, [rawEquipe]);
	const uniquePapeis = (0, import_react.useMemo)(() => {
		return [...new Set(rawEquipe.map((m) => memberInfo(m).papel).filter(Boolean))].sort();
	}, [rawEquipe]);
	const uniqueAreas = (0, import_react.useMemo)(() => {
		return [...new Set(rawEquipe.map((m) => m.area).filter(Boolean))].sort();
	}, [rawEquipe]);
	const uniqueGerencias = (0, import_react.useMemo)(() => {
		return [...new Set(rawEquipe.map((m) => m.gerencia).filter(Boolean))].sort();
	}, [rawEquipe]);
	const filteredAndSortedEquipe = (0, import_react.useMemo)(() => {
		let result = [...equipe];
		if (searchTerm) {
			const term = searchTerm.toLowerCase();
			result = result.filter((m) => {
				return memberInfo(m).nome.toLowerCase().includes(term);
			});
		}
		if (filterDiretoria) result = result.filter((m) => (m.diretoria ?? "").toLowerCase().trim() === filterDiretoria.toLowerCase().trim());
		if (filterPapel) result = result.filter((m) => {
			return memberInfo(m).papel.toLowerCase().trim() === filterPapel.toLowerCase().trim();
		});
		if (filterArea) result = result.filter((m) => (m.area ?? "").toLowerCase().trim() === filterArea.toLowerCase().trim());
		if (filterGerencia) result = result.filter((m) => (m.gerencia ?? "").toLowerCase().trim() === filterGerencia.toLowerCase().trim());
		result.sort((a, b) => {
			let valA = "";
			let valB = "";
			if (sortBy === "nome") {
				valA = memberInfo(a).nome;
				valB = memberInfo(b).nome;
			} else if (sortBy === "papel") {
				valA = memberInfo(a).papel;
				valB = memberInfo(b).papel;
			} else {
				valA = a[sortBy] ?? "";
				valB = b[sortBy] ?? "";
			}
			return valA.localeCompare(valB, "pt", { sensitivity: "base" });
		});
		return result;
	}, [
		equipe,
		searchTerm,
		filterDiretoria,
		filterPapel,
		filterArea,
		filterGerencia,
		sortBy
	]);
	const byDir = /* @__PURE__ */ new Map();
	filteredAndSortedEquipe.forEach((m) => {
		const k = groupKey(m);
		if (!byDir.has(k)) byDir.set(k, []);
		byDir.get(k).push(m);
	});
	function getMemberDedication(member) {
		const memberName = memberInfo(member).nome?.toLowerCase().trim();
		const memberProfId = member.profile_id;
		let totalHours = 0;
		for (const t of allTarefas) {
			if (selectedProjetoIds && selectedProjetoIds.length > 0) {
				const taskIni = t.iniciativa_id ? iniciativas.find((i) => i.id === t.iniciativa_id) : null;
				if (taskIni && !selectedProjetoIds.includes(taskIni.projeto_id)) continue;
			}
			const respId = t.responsavel_id;
			const isResp = respId && respId === memberProfId || t.responsavel?.toLowerCase().trim() === memberName || respId && respId.toLowerCase().trim() === memberName;
			const isPart = (t.participantes ?? []).some((p) => p.toLowerCase().trim() === memberName);
			if (isResp) totalHours += Number(t.horas_dedicadas ?? 0);
			else if (isPart && t.tipo_tarefa !== "Agenda") totalHours += Number(t.horas_dedicadas ?? 0) * .8;
		}
		for (const ap of allAgendaParts) if (ap.profile_id === memberProfId) {
			const agendaItem = allAgenda.find((a) => a.id === ap.agenda_id);
			if (agendaItem) {
				if (selectedProjetoIds && selectedProjetoIds.length > 0) {
					const agendaIni = agendaItem.iniciativa_id ? iniciativas.find((i) => i.id === agendaItem.iniciativa_id) : null;
					if (agendaIni && !selectedProjetoIds.includes(agendaIni.projeto_id)) continue;
				}
				totalHours += Number(ap.minutos_creditados ?? 0) / 60;
			}
		}
		return totalHours;
	}
	function getMemberDebits(member) {
		return (member?.extras?.debitos ?? []).reduce((acc, curr) => acc + Number(curr.horas ?? 0), 0);
	}
	function valueFor(m, col) {
		if (pendingEdits[m.id]?.[col] !== void 0) return pendingEdits[m.id][col];
		const info = memberInfo(m);
		if (col === "nome") return info.nome;
		if (col === "papel") return info.papel;
		if (col === "projeto") return projetoMap.get(m.projeto_id ?? "") ?? "—";
		if (col === "status") return info.status;
		if (col === "total_horas_dedicadas") return `${getMemberDedication(m).toFixed(1)} h`;
		if (col === "horas_debitadas") return `${getMemberDebits(m).toFixed(1)} h`;
		return m[col] ?? info.extras[col] ?? "—";
	}
	async function handleSaveAll() {
		setIsSaving(true);
		try {
			for (const [memberId, fields] of Object.entries(pendingEdits)) {
				const m = rawEquipe.find((x) => x.id === memberId);
				if (!m) continue;
				const updatePayload = {};
				const extrasPayload = { ...m.extras ?? {} };
				for (const [col, val] of Object.entries(fields)) if (["diretoria", "area"].includes(col)) updatePayload[col] = val || null;
				else if (col === "papel") updatePayload.papel_macroprocesso = `${valueForName(m)} — ${val}`;
				else extrasPayload[col] = val;
				updatePayload.extras = extrasPayload;
				const { error } = await supabase.from("equipe").update(updatePayload).eq("id", memberId);
				if (error) throw error;
			}
			toast.success("Todas as alterações foram salvas com sucesso!");
			setPendingEdits({});
			qc.invalidateQueries({ queryKey: ["equipe"] });
		} catch (err) {
			toast.error(`Erro ao salvar: ${err.message}`);
		} finally {
			setIsSaving(false);
		}
	}
	async function patch(id, p) {
		const { error } = await supabase.from("equipe").update(p).eq("id", id);
		if (error) toast.error(error.message);
		qc.invalidateQueries({ queryKey: ["equipe"] });
	}
	async function remover(id) {
		await patch(id, { ativo: false });
	}
	async function adicionar(form) {
		const nome = String(form.get("nome") ?? "").trim();
		let projeto_id = form.get("projeto_id");
		if (projeto_id === "" || !projeto_id) projeto_id = null;
		const { error } = await supabase.from("equipe").insert({
			profile_id: form.get("profile_id") || null,
			projeto_id,
			diretoria: form.get("diretoria"),
			area: form.get("area"),
			papel_macroprocesso: `${nome || "Pessoa"} — ${form.get("papel")}`,
			extras: {
				nome,
				status: form.get("status") || "Ativo"
			},
			ativo: true,
			card_x: 0,
			card_y: 0
		});
		if (error) return toast.error(error.message);
		toast.success("Pessoa adicionada");
		setOpenAdd(false);
		qc.invalidateQueries({ queryKey: ["equipe"] });
	}
	async function addColumnSystem(field) {
		const next = [...customColumns.filter((c) => c.id !== field.id), field];
		await supabase.from("app_configuracoes").upsert({
			chave: "equipe_custom_columns",
			valor: { columns: next }
		});
		setVisibleColumns((cols) => [.../* @__PURE__ */ new Set([...cols, field.id])]);
		qc.invalidateQueries({ queryKey: ["equipe-columns-config"] });
		toast.success(`Coluna “${field.label}” adicionada`);
	}
	async function addColumnCustom(label) {
		if (!label.trim()) return;
		await addColumnSystem({
			id: label.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, ""),
			label
		});
	}
	function exportCSV() {
		const cols = allColumns.filter((c) => visibleColumns.includes(c.id));
		const csv = [cols.map((c) => c.label).join(";"), ...equipe.map((m) => cols.map((c) => `"${String(valueFor(m, c.id)).replaceAll("\"", "\"\"")}"`).join(";"))].join("\n");
		const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
		const a = document.createElement("a");
		a.href = url;
		a.download = "equipe.csv";
		a.click();
		URL.revokeObjectURL(url);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-[15px] font-extrabold tracking-tight text-slate-900 font-sans",
					children: "Equipe de Trabalho · Personas"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[12px] text-slate-500 mt-0.5 font-medium",
					children: selectedProjetoIds ? `${filteredAndSortedEquipe.length} integrante(s) no projeto selecionado` : `${filteredAndSortedEquipe.length} integrante(s) em todos os projetos`
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center rounded-lg border border-slate-200 bg-slate-50 p-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => setLayoutMode("grid"),
								className: `flex items-center gap-1.5 rounded-md px-2.5 py-1 text-[11.5px] font-bold transition-all ${layoutMode === "grid" ? "bg-white text-vibra-800 shadow-sm" : "text-slate-500 hover:text-slate-800"}`,
								title: "Visualização em Grade (Sem cortes de texto)",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LayoutGrid, { className: "h-3.5 w-3.5" }), " Grade Fluida"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => setLayoutMode("sandbox"),
								className: `flex items-center gap-1.5 rounded-md px-2.5 py-1 text-[11.5px] font-bold transition-all ${layoutMode === "sandbox" ? "bg-white text-vibra-800 shadow-sm" : "text-slate-500 hover:text-slate-800"}`,
								title: "Quadro de Distribuição (Arrastável)",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Move, { className: "h-3.5 w-3.5" }), " Organizador"]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => setShowTabConfig(!showTabConfig),
								className: `inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3.5 py-1.5 text-[12px] font-bold text-slate-700 hover:bg-slate-50 transition-colors ${showTabConfig ? "border-vibra-600 ring-2 ring-vibra-600/10 text-vibra-800" : ""}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { className: "h-4 w-4 text-slate-500" }), " Customizar Visualização"]
							}), showTabConfig && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "fixed inset-0 z-40",
								onClick: () => setShowTabConfig(false)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "absolute right-0 mt-1.5 z-50 w-[92vw] sm:w-[480px] rounded-xl border border-border bg-white p-4 shadow-vibra-lg animate-in fade-in slide-in-from-top-1 duration-150",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldPicker, {
										title: "Campos nos cards",
										columns: allColumns,
										values: cardFields,
										setValues: setCardFields
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldPicker, {
										title: "Colunas da tabela",
										columns: allColumns,
										values: visibleColumns,
										setValues: setVisibleColumns
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-4 pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-[11px] font-extrabold uppercase tracking-widest text-slate-500 flex items-center gap-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListFilter, { className: "h-3.5 w-3.5" }), " Agrupar por"]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
											value: groupBy,
											onChange: (e) => setGroupBy(e.target.value),
											className: "w-full rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-[12px] font-bold text-slate-700 outline-none focus:border-vibra-600",
											children: GROUP_OPTIONS.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: o.id,
												children: o.label
											}, o.id))
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1.5 text-[11px] font-semibold text-slate-600",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-[11px] font-extrabold uppercase tracking-widest text-slate-500 flex items-center gap-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlidersVertical, { className: "h-3.5 w-3.5 text-vibra-700" }), " Tamanho do Card"]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center justify-between gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
													"Largura: ",
													cardWidth,
													"px"
												] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													type: "range",
													min: 240,
													max: 360,
													value: cardWidth,
													onChange: (e) => setCardWidth(Number(e.target.value)),
													className: "h-1 accent-vibra-700 cursor-pointer rounded bg-slate-200 w-24"
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center justify-between gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
													"Altura: ",
													cardHeight,
													"px"
												] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													type: "range",
													min: 180,
													max: 300,
													value: cardHeight,
													onChange: (e) => setCardHeight(Number(e.target.value)),
													className: "h-1 accent-vibra-700 cursor-pointer rounded bg-slate-200 w-24"
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: () => saveLayoutConfig(cardWidth, cardHeight),
												className: "w-full mt-1.5 rounded bg-vibra-700 py-1 text-[10px] font-extrabold text-white hover:bg-vibra-800 transition",
												children: "Salvar Config. para Todos"
											})
										]
									})]
								})]
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: exportCSV,
							className: "inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3.5 py-1.5 text-[12px] font-bold text-slate-700 hover:bg-slate-50 transition-colors",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-4 w-4 text-slate-500" }), " Exportar CSV"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setOpenCol(true),
							className: "inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3.5 py-1.5 text-[12px] font-bold text-slate-700 hover:bg-slate-50 transition-colors",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Columns3, { className: "h-4 w-4 text-slate-500" }), " Nova Coluna"]
						}),
						Object.keys(pendingEdits).length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: handleSaveAll,
							disabled: isSaving,
							className: "inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3.5 py-1.5 text-[12px] font-extrabold text-white hover:bg-emerald-700 transition-all shadow-sm animate-pulse",
							children: [
								"💾 Salvar (",
								Object.keys(pendingEdits).length,
								" alterações)"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setOpenAdd(true),
							className: "inline-flex items-center gap-1.5 rounded-lg bg-vibra-700 px-3.5 py-1.5 text-[12px] font-bold text-white hover:bg-vibra-800 transition-all shadow-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), " Nova Pessoa"]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl border border-slate-100 bg-white p-5 shadow-sm space-y-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-3 p-4 border border-slate-100 rounded-xl bg-slate-50/50 md:grid-cols-5 text-[11.5px]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 pointer-events-none",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "h-3.5 w-3.5" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									placeholder: "Buscar por nome...",
									value: searchTerm,
									onChange: (e) => setSearchTerm(e.target.value),
									className: "w-full rounded-lg border border-slate-200 bg-white pl-8 pr-3 py-2 outline-none focus:border-vibra-600 focus:ring-2 focus:ring-vibra-600/10"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: filterDiretoria,
								onChange: (e) => setFilterDiretoria(e.target.value),
								className: "w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-700 outline-none focus:border-vibra-600",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "",
									children: "Diretoria: Todas"
								}), uniqueDiretorias.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: d,
									children: d
								}, d))]
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: filterPapel,
								onChange: (e) => setFilterPapel(e.target.value),
								className: "w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-700 outline-none focus:border-vibra-600",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "",
									children: "Papel: Todos"
								}), uniquePapeis.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: p,
									children: p
								}, p))]
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: filterArea,
								onChange: (e) => setFilterArea(e.target.value),
								className: "w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-700 outline-none focus:border-vibra-600",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "",
									children: "Área: Todas"
								}), uniqueAreas.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: a,
									children: a
								}, a))]
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: filterGerencia,
								onChange: (e) => setFilterGerencia(e.target.value),
								className: "w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-700 outline-none focus:border-vibra-600",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "",
									children: "Gerência: Todas"
								}), uniqueGerencias.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: g,
									children: g
								}, g))]
							}) })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center justify-between gap-3 text-[11.5px] border-b border-slate-50 pb-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-slate-500 font-semibold uppercase text-[9.5px] tracking-wider",
								children: "Ordenar por:"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex gap-1",
								children: [
									"nome",
									"diretoria",
									"papel",
									"area",
									"gerencia"
								].map((opt) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setSortBy(opt),
									className: `rounded px-2.5 py-1 font-bold border transition-all ${sortBy === opt ? "bg-vibra-700 border-vibra-800 text-white shadow-sm" : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"}`,
									children: opt === "nome" ? "Ordem Alfabética" : opt === "diretoria" ? "Diretoria" : opt === "papel" ? "Papel / Função" : opt === "area" ? "Área" : "Gerência"
								}, opt))
							})]
						}), (searchTerm || filterDiretoria || filterPapel || filterArea || filterGerencia) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => {
								setSearchTerm("");
								setFilterDiretoria("");
								setFilterPapel("");
								setFilterArea("");
								setFilterGerencia("");
							},
							className: "rounded-lg border border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200 px-3 py-1 font-bold transition-all",
							children: "Limpar Filtros"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-6",
						children: [[...byDir.entries()].map(([dir, mems]) => {
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
								className: "rounded-2xl border border-slate-100 bg-slate-50/20 p-5 space-y-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex items-center justify-between",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "inline-flex items-center gap-2.5 rounded-full px-4 py-1.5 text-[12px] font-bold text-white shadow-sm",
										style: { background: colorForKey(dir) },
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2 w-2 rounded-full bg-white/95 animate-pulse" }),
											" ",
											dir,
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "rounded-full bg-white/20 px-2 py-0.5 text-[10.5px] font-extrabold",
												children: mems.length
											})
										]
									})
								}), layoutMode === "grid" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid gap-4",
									style: { gridTemplateColumns: `repeat(auto-fill, minmax(${cardWidth}px, 1fr))` },
									children: mems.map((m, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PersonaCard, {
										m,
										idx,
										fields: cardFields,
										valueFor,
										memberInfo,
										accent: colorForKey(m.diretoria ?? "—"),
										layoutMode: "grid",
										onRemove: () => remover(m.id),
										dedicationHours: getMemberDedication(m),
										onManageDebits: () => setDebitMember(m),
										getMemberDebits,
										cardWidth,
										cardHeight
									}, m.id))
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "relative min-h-[440px] rounded-xl border border-dashed border-slate-200 bg-white/80 p-3 transition-colors duration-200 hover:bg-slate-50/40",
									onDragOver: (e) => e.preventDefault(),
									onDrop: (e) => {
										if (!dragging) return;
										const rect = e.currentTarget.getBoundingClientRect();
										patch(dragging, {
											card_x: Math.max(0, Math.round(e.clientX - rect.left - 140)),
											card_y: Math.max(0, Math.round(e.clientY - rect.top - 60))
										});
										setDragging(null);
									},
									children: mems.map((m, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PersonaCard, {
										m,
										idx,
										fields: cardFields,
										valueFor,
										memberInfo,
										accent: colorForKey(m.diretoria ?? "—"),
										layoutMode: "sandbox",
										onDrag: () => setDragging(m.id),
										onRemove: () => remover(m.id),
										dedicationHours: getMemberDedication(m),
										onManageDebits: () => setDebitMember(m),
										getMemberDebits,
										cardWidth,
										cardHeight
									}, m.id))
								})]
							}, dir);
						}), byDir.size === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "rounded-2xl border border-dashed border-slate-200 bg-white p-12 text-center text-[12.5px] text-slate-400 font-medium",
							children: "Nenhum integrante encontrado para os filtros ativos."
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "overflow-x-auto rounded-2xl border border-slate-100 bg-white shadow-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "p-4 border-b border-slate-50 bg-slate-50/50",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
						className: "text-[12.5px] font-bold text-slate-800",
						children: "Tabela Geral da Equipe"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "min-w-[980px] w-full text-[12.5px]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
						className: "bg-slate-50 border-b border-slate-100 text-[10.5px] uppercase tracking-wider font-extrabold text-slate-500",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [allColumns.filter((c) => visibleColumns.includes(c.id)).map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3.5 text-left font-sans",
							children: c.label
						}, c.id)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3.5 text-left font-sans",
							children: "Ações"
						})] })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
						className: "divide-y divide-slate-100",
						children: filteredAndSortedEquipe.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "hover:bg-slate-50/50 transition-colors",
							children: [allColumns.filter((c) => visibleColumns.includes(c.id)).map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3 text-slate-700",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditableCell, {
									m,
									col: c.id,
									value: valueFor(m, c.id),
									onChange: (newVal) => {
										setPendingEdits((prev) => ({
											...prev,
											[m.id]: {
												...prev[m.id] ?? {},
												[c.id]: newVal
											}
										}));
									}
								})
							}, c.id)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => setDebitMember(m),
										className: "rounded-lg p-1.5 text-slate-400 hover:bg-slate-50 hover:text-rose-600 transition-all",
										title: "Gerenciar Débitos",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(History, { className: "h-4 w-4" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: async () => {
											if (await confirm("Remover pessoa?", "Deseja realmente remover esta pessoa?")) remover(m.id);
										},
										className: "rounded-lg p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-500 transition-all",
										title: "Remover",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
									})]
								})
							})]
						}, m.id))
					})]
				})]
			}),
			debitMember && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4",
				onClick: () => setDebitMember(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full max-w-md rounded-2xl border border-slate-100 bg-white p-6 shadow-xl space-y-4",
					onClick: (e) => e.stopPropagation(),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between border-b border-slate-50 pb-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
								className: "text-[15px] font-bold text-slate-800 font-sans",
								children: ["Débitos — ", memberInfo(debitMember).nome]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-[11.5px] text-slate-500 font-semibold mt-0.5",
								children: [
									"Saldo de Débitos:",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "font-bold text-rose-600",
										children: [
											"-",
											getMemberDebits(debitMember).toFixed(1),
											" h"
										]
									})
								]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setDebitMember(null),
								className: "rounded-lg p-1.5 text-slate-400 hover:bg-slate-50",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
							})]
						}),
						isAdmin ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: async (e) => {
								e.preventDefault();
								const hours = Number(debitHoursInput);
								if (!hours || hours <= 0) return toast.error("Por favor, digite um número de horas válido.");
								if (!debitReasonInput.trim()) return toast.error("Por favor, informe o motivo do débito.");
								const newDebit = {
									id: Date.now().toString(),
									horas: hours,
									motivo: debitReasonInput.trim(),
									data: (/* @__PURE__ */ new Date()).toISOString()
								};
								const currentExtras = debitMember.extras ?? {};
								const currentDebitos = currentExtras.debitos ?? [];
								const updatedExtras = {
									...currentExtras,
									debitos: [...currentDebitos, newDebit]
								};
								await patch(debitMember.id, { extras: updatedExtras });
								toast.success("Horas debitadas com sucesso!");
								setDebitHoursInput("");
								setDebitReasonInput("");
								setDebitMember({
									...debitMember,
									extras: updatedExtras
								});
							},
							className: "space-y-3 bg-slate-50/50 p-4 rounded-xl border border-slate-100",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] font-extrabold uppercase tracking-widest text-slate-500",
									children: "Registrar Novo Débito"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-3 gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "col-span-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "text-[10px] font-bold uppercase tracking-wider text-slate-500",
											children: "Horas"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "number",
											step: "0.5",
											value: debitHoursInput,
											onChange: (e) => setDebitHoursInput(e.target.value),
											required: true,
											placeholder: "Ex: 2.0",
											className: "mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-[12px] outline-none focus:border-vibra-600"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "col-span-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "text-[10px] font-bold uppercase tracking-wider text-slate-500",
											children: "Motivo"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "text",
											value: debitReasonInput,
											onChange: (e) => setDebitReasonInput(e.target.value),
											required: true,
											placeholder: "Ex: Ausência na reunião",
											className: "mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-[12px] outline-none focus:border-vibra-600"
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "submit",
									className: "w-full rounded-lg bg-rose-600 py-1.5 text-[11.5px] font-extrabold text-white hover:bg-rose-700 transition-colors shadow-sm",
									children: "Gravar Débito"
								})
							]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "rounded-xl border border-blue-100 bg-blue-50/50 p-3.5 text-[11px] text-blue-700 font-semibold text-center",
							children: "ℹ️ Visualização restrita. Apenas administradores podem registrar novos débitos ou excluir do histórico."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-[11px] font-extrabold uppercase tracking-widest text-slate-500 flex items-center gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(History, { className: "h-3.5 w-3.5" }), " Histórico de Débitos"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "max-h-[160px] overflow-y-auto space-y-1.5 pr-1 text-[11px]",
								children: [(debitMember.extras?.debitos ?? []).map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between gap-2 rounded-lg border border-slate-100 bg-white px-3 py-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-semibold text-slate-800 break-words whitespace-normal",
											children: d.motivo
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[9.5px] text-slate-400 font-bold mt-0.5",
											children: new Date(d.data).toLocaleDateString("pt-BR")
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2 shrink-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "font-extrabold text-rose-600",
											children: [
												"-",
												Number(d.horas).toFixed(1),
												" h"
											]
										}), isAdmin && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: async () => {
												if (await confirm("Remover débito?", "Deseja excluir este débito do histórico?")) {
													const filtered = (debitMember.extras.debitos ?? []).filter((x) => x.id !== d.id);
													const updatedExtras = {
														...debitMember.extras,
														debitos: filtered
													};
													await patch(debitMember.id, { extras: updatedExtras });
													toast.success("Débito removido!");
													setDebitMember({
														...debitMember,
														extras: updatedExtras
													});
												}
											},
											className: "rounded-md p-1 text-slate-400 hover:bg-rose-50 hover:text-red-500 transition-all",
											title: "Remover débito",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" })
										})]
									})]
								}, d.id)), (!debitMember.extras?.debitos || debitMember.extras.debitos.length === 0) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] italic text-slate-400 text-center py-4",
									children: "Nenhum débito registrado para esta pessoa."
								})]
							})]
						})
					]
				})
			}),
			openAdd && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4",
				onClick: () => setOpenAdd(false),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: (e) => {
						e.preventDefault();
						adicionar(new FormData(e.currentTarget));
					},
					onClick: (e) => e.stopPropagation(),
					className: "w-full max-w-md rounded-2xl border border-slate-100 bg-white p-6 shadow-xl space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between border-b border-slate-50 pb-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-[15px] font-bold text-slate-800",
								children: "Nova Pessoa na Equipe"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setOpenAdd(false),
								className: "rounded-lg p-1.5 text-slate-400 hover:bg-slate-50",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-[11px] font-bold uppercase tracking-wider text-slate-500",
									children: "Nome Completo"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									name: "nome",
									required: true,
									className: "mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-[13px] outline-none focus:border-vibra-600 focus:ring-2 focus:ring-vibra-600/10"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-[11px] font-bold uppercase tracking-wider text-slate-500",
									children: "Perfil vinculado"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									name: "profile_id",
									className: "mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-[13px] outline-none focus:border-vibra-600",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "",
										children: "Sem vínculo"
									}), profiles.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: p.id,
										children: p.nome ?? p.email
									}, p.id))]
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-[11px] font-bold uppercase tracking-wider text-slate-500",
									children: "Projeto"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									name: "projeto_id",
									defaultValue: selectedProjetoIds?.[0] ?? "",
									className: "mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-[13px] outline-none focus:border-vibra-600",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "",
										children: "Sem projeto"
									}), projetos.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: p.id,
										children: p.nome
									}, p.id))]
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-2 gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-[11px] font-bold uppercase tracking-wider text-slate-500",
										children: "Diretoria"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										name: "diretoria",
										required: true,
										className: "mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-[13px] outline-none focus:border-vibra-600"
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-[11px] font-bold uppercase tracking-wider text-slate-500",
										children: "Área"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										name: "area",
										required: true,
										className: "mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-[13px] outline-none focus:border-vibra-600"
									})] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-[11px] font-bold uppercase tracking-wider text-slate-500",
									children: "Papel no Projeto"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									name: "papel",
									placeholder: "Ex: Sponsor, P.O., Analista, Lider...",
									required: true,
									className: "mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-[13px] outline-none focus:border-vibra-600"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-[11px] font-bold uppercase tracking-wider text-slate-500",
									children: "Status"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									name: "status",
									defaultValue: "Ativo",
									className: "mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-[13px] outline-none focus:border-vibra-600"
								})] })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "pt-3 border-t border-slate-50 flex justify-end gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setOpenAdd(false),
								className: "rounded-lg border border-slate-200 px-4 py-2 text-[12px] font-bold text-slate-500 hover:bg-slate-50 transition-colors",
								children: "Cancelar"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "submit",
								className: "rounded-lg bg-vibra-700 px-4 py-2 text-[12px] font-bold text-white hover:bg-vibra-800 transition-colors",
								children: "Adicionar"
							})]
						})
					]
				})
			}),
			openCol && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4",
				onClick: () => setOpenCol(false),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full max-w-md rounded-2xl border border-slate-100 bg-white p-6 shadow-xl space-y-4",
					onClick: (e) => e.stopPropagation(),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between border-b border-slate-50 pb-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-[15px] font-bold text-slate-800",
								children: "Adicionar Nova Coluna"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setOpenCol(false),
								className: "rounded-lg p-1.5 text-slate-400 hover:bg-slate-50",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] font-bold uppercase tracking-widest text-vibra-700",
							children: "Campos do sistema disponíveis"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid max-h-[220px] grid-cols-2 gap-2 overflow-y-auto pr-1",
							children: SYSTEM_FIELDS.map((f) => {
								const used = customColumns.some((c) => c.id === f.id);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									disabled: used,
									onClick: () => {
										addColumnSystem(f);
										setOpenCol(false);
									},
									className: `rounded-xl border p-2.5 text-left transition-all ${used ? "cursor-not-allowed border-slate-100 bg-slate-50 text-slate-400" : "border-slate-200 bg-white text-slate-700 hover:border-vibra-600 hover:bg-vibra-50/50"}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block text-[11.5px] font-bold",
										children: f.label
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-[9.5px] text-slate-400 mt-0.5",
										children: ["de ", f.from]
									})]
								}, f.id);
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] font-bold uppercase tracking-widest text-vibra-700 pt-2 border-t border-slate-50",
							children: "Ou criar uma coluna personalizada"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: (e) => {
								e.preventDefault();
								const fd = new FormData(e.currentTarget);
								addColumnCustom(String(fd.get("label") ?? ""));
								setOpenCol(false);
							},
							className: "flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								name: "label",
								required: true,
								placeholder: "Ex: Metas, Observações...",
								className: "flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-[13px] outline-none focus:border-vibra-600"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "submit",
								className: "rounded-lg bg-vibra-700 px-4 py-2 text-[12px] font-bold text-white hover:bg-vibra-800",
								children: "Criar"
							})]
						})
					]
				})
			})
		]
	});
}
function FieldPicker({ title, columns, values, setValues }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-[11px] font-extrabold uppercase tracking-widest text-slate-500",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-wrap gap-1.5 max-h-[140px] overflow-y-auto p-1 border border-slate-50 rounded-lg bg-slate-50/30",
			children: columns.map((c) => {
				const active = values.includes(c.id);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setValues(active ? values.filter((v) => v !== c.id) : [...values, c.id]),
					className: `flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11.5px] font-semibold transition-all ${active ? "bg-vibra-100 border-vibra-300 text-vibra-800 shadow-sm" : "bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50"}`,
					children: [active && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-3.5 w-3.5 text-vibra-600 shrink-0" }), c.label]
				}, c.id);
			})
		})]
	});
}
function PersonaCard({ m, idx, fields, valueFor, memberInfo, accent, layoutMode = "grid", onDrag, onRemove, dedicationHours = 0, onManageDebits, getMemberDebits, cardWidth = 290, cardHeight = 220 }) {
	const confirm = useConfirm();
	const info = memberInfo(m);
	const avatar = getAvatarConfig(info.papel);
	const AvatarIcon = avatar.icon;
	const stripe = accent ?? "#044317";
	const statusColor = /ativ/i.test(info.status) ? "bg-emerald-500" : /inativ/i.test(info.status) ? "bg-rose-500" : /férias|licen/i.test(info.status) ? "bg-amber-500" : "bg-blue-500";
	const totalDebits = getMemberDebits(m);
	const left = Number(m.card_x ?? idx % 4 * (cardWidth + 12) + 8);
	const top = Number(m.card_y ?? Math.floor(idx / 4) * (cardHeight + 12) + 8);
	const isSandbox = layoutMode === "sandbox";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("article", {
		draggable: isSandbox,
		onDragStart: isSandbox ? onDrag : void 0,
		style: isSandbox ? {
			left,
			top,
			width: `${cardWidth}px`,
			height: `${cardHeight}px`,
			borderLeft: `4px solid ${stripe}`
		} : { borderLeft: `4px solid ${stripe}` },
		className: `${isSandbox ? "absolute cursor-move" : "relative w-full"} flex flex-col justify-between overflow-hidden rounded-xl border border-slate-100 bg-white p-3.5 shadow-sm transition-all duration-300 hover:border-slate-300 hover:shadow-md`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-2.5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2.5 min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative shrink-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: `grid h-10 w-10 place-content-center rounded-full bg-gradient-to-br ${avatar.bg} text-white shadow-sm ring-1 ring-slate-100`,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarIcon, { className: "h-4.5 w-4.5" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: `absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${statusColor}`,
							title: `Status: ${info.status}`
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
							className: "text-[13px] font-extrabold text-slate-800 leading-tight break-words whitespace-normal font-sans",
							title: info.nome,
							children: info.nome
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] font-bold text-slate-400 mt-0.5",
							children: m.diretoria || "Sem Diretoria"
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1 shrink-0",
					children: [isSandbox && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grip, { className: "h-3.5 w-3.5 text-slate-300 cursor-grab" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: async (e) => {
							e.stopPropagation();
							if (await confirm("Remover integrante?", `Deseja realmente remover ${info.nome}?`)) onRemove();
						},
						className: "rounded-md p-1 text-slate-400 hover:bg-red-50 hover:text-red-500 transition-colors",
						title: "Remover",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" })
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-1 text-[11px] border-t border-slate-50 pt-2 font-medium text-slate-600",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-slate-400 font-bold uppercase text-[8.5px] tracking-wider shrink-0 mt-0.5",
							children: "Papel:"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-slate-800 font-semibold text-right leading-tight break-words whitespace-normal",
							children: info.papel
						})]
					}),
					m.area && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-slate-400 font-bold uppercase text-[8.5px] tracking-wider shrink-0 mt-0.5",
							children: "Área:"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-slate-800 text-right leading-tight break-words whitespace-normal",
							children: m.area
						})]
					}),
					m.gerencia && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-slate-400 font-bold uppercase text-[8.5px] tracking-wider shrink-0 mt-0.5",
							children: "Gerência:"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-slate-800 text-right leading-tight break-words whitespace-normal",
							children: m.gerencia
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-1 bg-vibra-50/50 px-2 py-0.5 rounded border border-vibra-100/50 mt-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-vibra-800 font-bold uppercase text-[8.5px] tracking-wider",
							children: "Dedicação:"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-vibra-900 font-bold font-mono",
							children: [dedicationHours.toFixed(1), " h"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						onClick: (e) => {
							e.stopPropagation();
							onManageDebits();
						},
						className: "flex items-center justify-between gap-1 bg-rose-50/50 border border-rose-100/50 hover:border-rose-300 hover:bg-rose-50/70 px-2 py-0.5 rounded mt-1 cursor-pointer transition-colors",
						title: "Clique para gerenciar horas debitadas",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-rose-700 font-bold uppercase text-[8.5px] tracking-wider flex items-center gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(History, { className: "h-3 w-3" }), " Débitos:"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-rose-800 font-bold font-mono",
							children: [
								"-",
								totalDebits.toFixed(1),
								" h"
							]
						})]
					})
				]
			})]
		})
	});
}
function EditableCell({ m, col, value, onChange }) {
	const [v, setV] = (0, import_react.useState)(value === "—" ? "" : value);
	(0, import_react.useEffect)(() => {
		setV(value === "—" ? "" : value);
	}, [value]);
	if ([
		"nome",
		"projeto",
		"total_horas_dedicadas",
		"horas_debitadas"
	].includes(col)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "font-medium text-slate-800",
		children: value
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		value: v,
		onChange: (e) => {
			setV(e.target.value);
			onChange(e.target.value);
		},
		className: "w-full rounded border border-slate-200 bg-white/50 px-2 py-1 outline-none focus:border-vibra-600 focus:bg-white text-[12px] font-medium"
	});
}
function valueForName(m) {
	const raw = String(m.papel_macroprocesso ?? "");
	return raw.includes(" — ") ? raw.split(" — ", 1)[0] : m.extras?.nome ?? "Pessoa";
}
var BADGES = [
	{
		codigo: "PIONEIRO",
		titulo: "🚀 Pioneiro",
		descricao: "Primeira iniciativa entregue",
		pontos: 50
	},
	{
		codigo: "MENTOR",
		titulo: "🧠 Mentor",
		descricao: "Compartilhou conhecimento com o time",
		pontos: 30
	},
	{
		codigo: "GARGALO",
		titulo: "🎯 Caçador de Gargalos",
		descricao: "Identificou e removeu um gargalo crítico",
		pontos: 40
	},
	{
		codigo: "PARCEIRO",
		titulo: "🤝 Parceiro do Ano",
		descricao: "Colaboração excepcional entre áreas",
		pontos: 35
	},
	{
		codigo: "VELOZ",
		titulo: "⚡ Velocista",
		descricao: "Entrega antes do prazo planejado",
		pontos: 25
	},
	{
		codigo: "DETALHE",
		titulo: "🔍 Olho Clínico",
		descricao: "Atenção aos detalhes que evitou retrabalho",
		pontos: 20
	}
];
var KPI_HUMANOS = [
	"🕵️ Sherlock de Melhorias",
	"💡 Arquiteto de Soluções",
	"📊 Oráculo dos Dados",
	"🤖 Mestre da IA",
	"⚙️ Mestre da Automação",
	"💬 Crítico Construtivo",
	"🧠 Compartilhador de Conhecimento",
	"🚀 Agente de Transformação",
	"🔍 Auditor de Excelência",
	"🏅 Guardião da Eficiência",
	"🎯 Caçador de Gargalos",
	"🕸️ Decifrador de Processos",
	"⚡ Gerador de Atalhos",
	"🦾 Amplificador Humano",
	"⚙️ Caçador de Cliques",
	"🏭 Operador Invisível",
	"📡 Caçador de Insights"
];
var CATEGORIAS = [
	"🐜 Formiga Atômica",
	"🦅 Visão de Águia",
	"🧩 Mestre da Causa Raiz",
	"🎭 Advogado do Processo",
	"💬 Crítico de Ouro",
	"🏅 Inconformista do Ano",
	"🚀 Disruptor do Ano",
	"⚡ Efeito Dominó",
	"🌊 Mudança de Maré"
];
function MC3Tab() {
	const qc = useQueryClient();
	const confirm = useConfirm();
	const [openAdd, setOpenAdd] = (0, import_react.useState)(false);
	const [filterKpi, setFilterKpi] = (0, import_react.useState)("");
	const [filterPersona, setFilterPersona] = (0, import_react.useState)("");
	const [selectedKpiForDetail, setSelectedKpiForDetail] = (0, import_react.useState)("");
	const [chartType, setChartType] = (0, import_react.useState)("radar");
	const { data: registros = [] } = useQuery({
		queryKey: ["mc3"],
		queryFn: async () => (await supabase.from("mc3_registros").select("*").is("deleted_at", null).order("created_at", { ascending: false })).data ?? []
	});
	const { data: profiles = [] } = useQuery({
		queryKey: ["profiles-mc3"],
		queryFn: async () => (await supabase.from("profiles").select("id,nome,email")).data ?? []
	});
	const pMap = new Map(profiles.map((p) => [p.id, p.nome ?? p.email ?? ""]));
	const { data: reconhecimentos = [] } = useQuery({
		queryKey: ["reconhecimentos"],
		queryFn: async () => (await supabase.from("reconhecimentos").select("*").order("created_at", { ascending: false })).data ?? []
	});
	const filtered = registros.filter((r) => (!filterKpi || r.kpi_humano === filterKpi) && (!filterPersona || r.profile_id === filterPersona));
	const podio = (0, import_react.useMemo)(() => {
		const score = /* @__PURE__ */ new Map();
		for (const r of registros) {
			const cur = score.get(r.profile_id) ?? {
				pts: 0,
				mc3: 0,
				badges: 0
			};
			cur.pts += 10;
			cur.mc3 += 1;
			score.set(r.profile_id, cur);
		}
		for (const r of reconhecimentos) {
			const cur = score.get(r.profile_id) ?? {
				pts: 0,
				mc3: 0,
				badges: 0
			};
			cur.pts += Number(r.pontos ?? 20);
			cur.badges += 1;
			score.set(r.profile_id, cur);
		}
		return [...score.entries()].map(([id, s]) => ({
			id,
			nome: pMap.get(id) ?? "—",
			...s
		})).sort((a, b) => b.pts - a.pts).slice(0, 5);
	}, [
		registros,
		reconhecimentos,
		pMap
	]);
	const rankingByPersona = (0, import_react.useMemo)(() => {
		const m = /* @__PURE__ */ new Map();
		filtered.forEach((r) => {
			const k = pMap.get(r.profile_id) ?? "—";
			m.set(k, (m.get(k) ?? 0) + 1);
		});
		return [...m.entries()].sort((a, b) => b[1] - a[1]).slice(0, 10).map(([nome, qtd]) => ({
			nome,
			qtd
		}));
	}, [filtered, pMap]);
	const rankingByKpi = (0, import_react.useMemo)(() => {
		const m = /* @__PURE__ */ new Map();
		filtered.forEach((r) => {
			m.set(r.kpi_humano, (m.get(r.kpi_humano) ?? 0) + 1);
		});
		return [...m.entries()].sort((a, b) => b[1] - a[1]).slice(0, 10).map(([nome, qtd]) => ({
			nome,
			qtd
		}));
	}, [filtered]);
	const kpiRadarData = (0, import_react.useMemo)(() => {
		const counts = {};
		KPI_HUMANOS.forEach((k) => {
			counts[k] = 0;
		});
		filtered.forEach((r) => {
			if (counts[r.kpi_humano] !== void 0) counts[r.kpi_humano] += 1;
			else counts[r.kpi_humano] = 1;
		});
		return Object.entries(counts).map(([name, value]) => {
			return {
				subject: name.replace(/[\uD800-\uDFFF\u2600-\u27BF]/g, "").trim(),
				value,
				fullMark: Math.max(...Object.values(counts), 3)
			};
		});
	}, [filtered]);
	const radialData = (0, import_react.useMemo)(() => {
		const list = kpiRadarData.filter((d) => d.value > 0);
		if (list.length === 0) return kpiRadarData.slice(0, 6).map((d, i) => ({
			...d,
			name: d.subject,
			fill: VIBRA_SERIES[i % VIBRA_SERIES.length]
		}));
		return list.map((d, i) => ({
			...d,
			name: d.subject,
			fill: VIBRA_SERIES[i % VIBRA_SERIES.length]
		}));
	}, [kpiRadarData]);
	const pieData = (0, import_react.useMemo)(() => {
		const list = kpiRadarData.filter((d) => d.value > 0);
		return list.length === 0 ? kpiRadarData.slice(0, 6) : list;
	}, [kpiRadarData]);
	const treemapData = (0, import_react.useMemo)(() => {
		return kpiRadarData.map((d) => ({
			name: d.subject,
			size: d.value || .1
		}));
	}, [kpiRadarData]);
	const topKpi = (0, import_react.useMemo)(() => {
		if (rankingByKpi.length === 0) return KPI_HUMANOS[0];
		return rankingByKpi[0].nome;
	}, [rankingByKpi]);
	const activeKpi = selectedKpiForDetail || topKpi;
	const latestContribForActiveKpi = (0, import_react.useMemo)(() => {
		const matched = filtered.filter((r) => r.kpi_humano === activeKpi);
		return matched.length > 0 ? matched[0] : null;
	}, [filtered, activeKpi]);
	const ambassadorsForActiveKpi = (0, import_react.useMemo)(() => {
		const counts = {};
		filtered.filter((r) => r.kpi_humano === activeKpi).forEach((r) => {
			counts[r.profile_id] = (counts[r.profile_id] || 0) + 1;
		});
		return Object.entries(counts).map(([id, qty]) => ({
			name: pMap.get(id) || "—",
			qty
		})).sort((a, b) => b.qty - a.qty);
	}, [
		filtered,
		activeKpi,
		pMap
	]);
	const pessoasEnvolvidas = new Set(registros.map((r) => r.profile_id)).size;
	const horasInvestidas = registros.reduce((s, r) => s + Number(r.tempo_dedicado_min ?? 0), 0) / 60;
	const totalRegistros = registros.length;
	const cep = Math.min(100, totalRegistros / Math.max(1, profiles.length) * 20);
	async function criar(form) {
		const { data: { user } } = await supabase.auth.getUser();
		const { error } = await supabase.from("mc3_registros").insert({
			profile_id: form.get("profile_id"),
			kpi_humano: form.get("kpi_humano"),
			categoria_diferenciada: form.get("categoria"),
			contribuicao: form.get("contribuicao"),
			tempo_dedicado_min: Number(form.get("tempo") || 0),
			created_by: user?.id
		});
		if (error) return toast.error(error.message);
		toast.success("Registro adicionado");
		setOpenAdd(false);
		qc.invalidateQueries({ queryKey: ["mc3"] });
	}
	async function excluir(id) {
		if (!await confirm("Excluir registro?", "Tem certeza que deseja excluir este registro?")) return;
		await supabase.from("mc3_registros").update({ deleted_at: (/* @__PURE__ */ new Date()).toISOString() }).eq("id", id);
		qc.invalidateQueries({ queryKey: ["mc3"] });
	}
	const [openBadge, setOpenBadge] = (0, import_react.useState)(false);
	async function darBadge(form) {
		const codigo = form.get("badge");
		const badge = BADGES.find((b) => b.codigo === codigo);
		if (!badge) return toast.error("Selecione um badge");
		const profile_id = form.get("para");
		if (!profile_id) return toast.error("Escolha o colega");
		const { data: { user } } = await supabase.auth.getUser();
		const { error } = await supabase.from("reconhecimentos").insert({
			profile_id,
			codigo: badge.codigo,
			titulo: badge.titulo,
			descricao: form.get("mensagem") || badge.descricao,
			pontos: badge.pontos,
			concedido_por: user?.id ?? null
		});
		if (error) return toast.error(error.message);
		toast.success(`Badge ${badge.titulo} concedido!`);
		setOpenBadge(false);
		qc.invalidateQueries({ queryKey: ["reconhecimentos"] });
	}
	async function removerReconhecimento(id) {
		if (!await confirm("Remover badge?", "Tem certeza que deseja remover este badge?")) return;
		await supabase.from("reconhecimentos").delete().eq("id", id);
		qc.invalidateQueries({ queryKey: ["reconhecimentos"] });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-xl border border-border bg-gradient-to-br from-vibra-50 to-white p-5 shadow-vibra-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 text-vibra-800",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-5 w-5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-[18px] font-bold",
								children: "MC³ — Motivação Contínua"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-0.5 text-[11px] uppercase tracking-widest text-vibra-700",
							children: "Cognitivo · Conectado · Contínuo"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 italic text-vibra-800",
							style: {
								fontFamily: "\"Cormorant Garamond\", \"EB Garamond\", Garamond, \"Times New Roman\", serif",
								fontSize: 22,
								letterSpacing: "0.01em",
								lineHeight: 1.35
							},
							children: "\"Quando um dashboard revela comportamentos, ele deixa de ser uma ferramenta de controle e se torna uma ferramenta de transformação.\""
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setOpenAdd(true),
						className: "inline-flex items-center gap-1 rounded-md bg-vibra-700 px-3 py-2 text-[12px] font-semibold text-white hover:bg-vibra-800",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3.5 w-3.5" }), " Novo Reconhecimento"]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 sm:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KPI, {
						label: "Pessoas Envolvidas",
						value: pessoasEnvolvidas,
						icon: Heart
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KPI, {
						label: "Horas Investidas",
						value: `${horasInvestidas.toFixed(1)}h`,
						icon: Sparkles
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KPI, {
						label: "Reconhecimentos",
						value: totalRegistros,
						icon: Heart
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KPI, {
						label: "CEP — Pulso da Equipe",
						value: `${cep.toFixed(0)}%`,
						icon: Sparkles,
						tone: "good"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 md:grid-cols-[1.2fr_1fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-border bg-card p-5 shadow-vibra-sm flex flex-col",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 text-vibra-800",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-5 w-5 text-indigo-500 animate-pulse" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-[14px] font-bold uppercase tracking-wider",
									children: "Superpoderes do Time"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-1.5 self-end",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] uppercase font-bold text-slate-400",
									children: "Visualização:"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									value: chartType,
									onChange: (e) => setChartType(e.target.value),
									className: "h-8 rounded border border-neutral-200 bg-white px-2 text-[11px] font-semibold text-neutral-700 outline-none hover:border-indigo-400 transition",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "radar",
											children: "🕸️ Teia de Radar"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "radial",
											children: "🌀 Radial Bar Polar"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "pie",
											children: "🍩 Donut de Competências"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "treemap",
											children: "🗺️ Treemap de Impacto"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "bar",
											children: "📊 Colunas Clássicas"
										})
									]
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11.5px] text-slate-500 mb-4",
							children: "Distribuição dos comportamentos de melhoria contínua ativos no portfólio. Clique nos KPIs abaixo para detalhar."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex-1 flex items-center justify-center min-h-[320px]",
							children: [
								chartType === "radar" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
									width: "100%",
									height: 320,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RadarChart, {
										cx: "50%",
										cy: "50%",
										outerRadius: "75%",
										data: kpiRadarData,
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PolarGrid, { stroke: "#e2e8f0" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PolarAngleAxis, {
												dataKey: "subject",
												tick: {
													fontSize: 9,
													fontWeight: 600,
													fill: "#475569"
												}
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PolarRadiusAxis, {
												angle: 30,
												domain: [0, "auto"],
												tick: { fontSize: 9 }
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radar, {
												name: "Ocorrências",
												dataKey: "value",
												stroke: VIBRA.indigo || "#6366f1",
												fill: VIBRA.indigo || "#6366f1",
												fillOpacity: .25
											})
										]
									})
								}),
								chartType === "radial" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
									width: "100%",
									height: 320,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RadialBarChart, {
										cx: "50%",
										cy: "50%",
										innerRadius: "15%",
										outerRadius: "90%",
										barSize: 10,
										data: radialData,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadialBar, {
											background: true,
											dataKey: "value",
											label: {
												position: "insideStart",
												fill: "#1e293b",
												fontSize: 9,
												fontWeight: "bold"
											}
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {})]
									})
								}),
								chartType === "pie" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
									width: "100%",
									height: 320,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PieChart, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pie, {
										data: pieData,
										cx: "50%",
										cy: "50%",
										innerRadius: 55,
										outerRadius: 90,
										paddingAngle: 4,
										dataKey: "value",
										nameKey: "subject",
										label: ({ subject, value }) => value > 0 ? `${subject} (${value})` : "",
										labelLine: false,
										children: pieData.map((entry, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: VIBRA_SERIES[index % VIBRA_SERIES.length] }, `cell-${index}`))
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {})] })
								}),
								chartType === "treemap" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
									width: "100%",
									height: 320,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Treemap, {
										data: treemapData,
										dataKey: "size",
										stroke: "#fff",
										fill: "#4f46e5",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {})
									})
								}),
								chartType === "bar" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
									width: "100%",
									height: 320,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
										data: kpiRadarData.filter((d) => d.value > 0),
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
												strokeDasharray: "3 3",
												stroke: "#f1f5f9"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
												dataKey: "subject",
												tick: { fontSize: 8 }
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, { tick: { fontSize: 9 } }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
												dataKey: "value",
												fill: "#4f46e5",
												radius: [
													4,
													4,
													0,
													0
												],
												children: kpiRadarData.filter((d) => d.value > 0).map((entry, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: VIBRA_SERIES[index % VIBRA_SERIES.length] }, `cell-${index}`))
											})
										]
									})
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 pt-3 border-t border-slate-50 flex flex-wrap gap-1",
							children: KPI_HUMANOS.map((k) => {
								const count = filtered.filter((r) => r.kpi_humano === k).length;
								const isActive = activeKpi === k;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => setSelectedKpiForDetail(k),
									className: `inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold transition-all ${isActive ? "bg-vibra-700 text-white shadow-sm ring-2 ring-vibra-700/10" : "bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-100"}`,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: k.split(" ")[0] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "truncate max-w-[70px]",
											children: k.split(" ").slice(1).join(" ")
										}),
										count > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: `rounded-full px-1.5 py-0.2 text-[8px] ${isActive ? "bg-white text-vibra-800" : "bg-slate-200 text-slate-700"}`,
											children: count
										})
									]
								}, k);
							})
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-border bg-gradient-to-b from-indigo-50/10 via-white to-white p-5 shadow-vibra-sm flex flex-col justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-3 flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 text-vibra-800",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "h-5 w-5 text-rose-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-[14px] font-bold uppercase tracking-wider",
									children: "Vitrine de Impacto (MC³)"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] font-extrabold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded",
								children: "Ativo em Foco"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-lg border border-indigo-100/50 bg-indigo-50/20 p-4 mb-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 mb-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-2xl",
										children: activeKpi.split(" ")[0]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
										className: "text-[15px] font-bold text-vibra-800",
										children: activeKpi.split(" ").slice(1).join(" ")
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11.5px] text-slate-600 italic",
									children: "Como esse superpoder contribui para a melhoria contínua e estimula o crescimento das pessoas?"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-2.5 text-[11px] bg-white border border-indigo-100/30 rounded px-2.5 py-1.5 text-indigo-800 font-medium leading-relaxed",
									children: [
										activeKpi.includes("Sherlock") && "Incentiva a investigação profunda de desvios, indo além dos sintomas para sanar as causas-raiz dos problemas do negócio.",
										activeKpi.includes("Arquiteto") && "Traduz ideias em soluções estruturadas e sustentáveis, otimizando o fluxo e empoderando o time com melhores processos.",
										activeKpi.includes("Oráculo") && "Valoriza as decisões pautadas em evidências quantitativas, eliminando palpites e garantindo precisão nas entregas.",
										activeKpi.includes("Mestre da IA") && "Impulsiona a produtividade ao integrar inteligência artificial generativa de forma prática no dia a dia da operação.",
										activeKpi.includes("Automação") && "Elimina tarefas repetitivas e manuais através de scripts, integrações e rotinas automáticas de alta eficiência.",
										activeKpi.includes("Crítico") && "Oferece feedback franco e respeitoso, desafiando o status quo para elevar continuamente o padrão de entrega.",
										activeKpi.includes("Compartilhador") && "Cria um ambiente de aprendizado coletivo, assegurando que o conhecimento técnico circule livremente e fortaleça o time.",
										activeKpi.includes("Agente") && "Facilita transições e adoção de novas metodologias, servindo de elo de engajamento para as transformações culturais.",
										activeKpi.includes("Auditor") && "Zela pelo padrão de ouro, documentação impecável e conformidade, garantindo que a qualidade nunca seja comprometida.",
										activeKpi.includes("Guardião") && "Focado na otimização de recursos, mitigando desperdício de tempo ou insumos em cada etapa das atividades.",
										activeKpi.includes("Gargalos") && "Aponta de forma cirúrgica onde o processo está travado e colabora ativamente para reestabelecer a fluidez do time.",
										activeKpi.includes("Processos") && "Especialista em mapear, documentar e simplificar fluxos operacionais para torná-los claros a todos.",
										activeKpi.includes("Atalhos") && "Descobre caminhos alternativos mais eficientes para alcançar os mesmos resultados, acelerando o time.",
										activeKpi.includes("Amplificador") && "Focado em empoderar e dar voz às pessoas, multiplicando a motivação e os talentos de cada colega.",
										activeKpi.includes("Cliques") && "Inconformado com sistemas complexos, simplifica as telas e caminhos para economizar effort humano.",
										activeKpi.includes("Invisível") && "Garante de forma silenciosa que toda a infraestrutura e bastidores funcionem perfeitamente sem interrupções.",
										activeKpi.includes("Insights") && "Conecta pontos dispersos e extrai ideias valiosas de conversas comuns ou dados sutis, gerando inovação.",
										!activeKpi.match(/(Sherlock|Arquiteto|Oráculo|IA|Automação|Crítico|Compartilhador|Agente|Auditor|Guardião|Gargalos|Processos|Atalhos|Amplificador|Cliques|Invisível|Insights)/) && "Fortalece a melhoria contínua através da colaboração ativa, empatia, qualidade e foco em soluções eficientes."
									]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", {
								className: "text-[11px] font-extrabold uppercase tracking-widest text-slate-500 mb-2",
								children: "Líderes deste Comportamento"
							}), ambassadorsForActiveKpi.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] text-slate-400 italic",
								children: "Nenhum integrante marcado com este superpoder ainda."
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-wrap gap-1.5",
								children: ambassadorsForActiveKpi.slice(0, 4).map((a, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center gap-1.5 rounded-md bg-slate-50 border border-slate-100 px-2 py-1 text-[11px] font-semibold text-slate-700",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-indigo-500" }),
										a.name,
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "rounded bg-indigo-50 px-1 text-[9px] font-extrabold text-indigo-700",
											children: [a.qty, "x"]
										})
									]
								}, i))
							})]
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "border-t border-slate-100 pt-3 mt-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h5", {
							className: "text-[11px] font-extrabold uppercase tracking-widest text-slate-500 mb-2 flex items-center gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-3 w-3 text-indigo-500" }), " Último Exemplo Prático Registrado"]
						}), latestContribForActiveKpi ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-lg bg-slate-50 p-3 border border-slate-100/50",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between mb-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[11px] font-bold text-slate-700",
										children: pMap.get(latestContribForActiveKpi.profile_id) || "—"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] text-slate-400",
										children: latestContribForActiveKpi.tempo_dedicado_min ? `${latestContribForActiveKpi.tempo_dedicado_min} min dedicados` : ""
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-[11px] text-slate-600 italic leading-relaxed",
									children: [
										"\"",
										latestContribForActiveKpi.contribuicao,
										"\""
									]
								}),
								latestContribForActiveKpi.categoria_diferenciada && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-block mt-2 rounded-full bg-amber-50 px-2 py-0.5 text-[9px] font-extrabold text-amber-700 border border-amber-100/50",
									children: ["🎯 Categoria: ", latestContribForActiveKpi.categoria_diferenciada]
								})
							]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] text-slate-400 italic",
							children: "Nenhuma contribuição em texto relatada sob este superpoder ainda."
						})]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 lg:grid-cols-[1.4fr_1fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-border bg-gradient-to-br from-amber-50 via-white to-vibra-50 p-5 shadow-vibra-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-3 flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 text-vibra-800",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "h-5 w-5 text-amber-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-[14px] font-bold uppercase tracking-wider",
								children: "Pódio MC³"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[10.5px] text-muted-foreground",
							children: "MC³ + Badges"
						})]
					}), podio.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "py-6 text-center text-[12px] italic text-muted-foreground",
						children: "Sem pontos ainda. Comece reconhecendo um colega ✨"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
						className: "space-y-2",
						children: podio.map((p, i) => {
							const medal = i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `${i + 1}º`;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: `flex items-center gap-3 rounded-lg border px-3 py-2 ${i === 0 ? "bg-amber-100 border-amber-300" : i === 1 ? "bg-slate-100 border-slate-300" : i === 2 ? "bg-orange-100 border-orange-300" : "bg-white border-border"}`,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[20px] w-8 text-center",
										children: medal
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex-1 min-w-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "truncate text-[13px] font-bold text-vibra-800",
											children: p.nome
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-[10.5px] text-muted-foreground",
											children: [
												p.mc3,
												" MC³ · ",
												p.badges,
												" badges"
											]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "rounded-full bg-vibra-700 px-2.5 py-1 text-[11px] font-bold text-white",
										children: [p.pts, " pts"]
									})
								]
							}, p.id);
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-border bg-card p-5 shadow-vibra-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-3 flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 text-vibra-800",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, { className: "h-5 w-5 text-vibra-700" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-[14px] font-bold uppercase tracking-wider",
								children: "Badges Peer-to-Peer"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setOpenBadge(true),
							className: "inline-flex items-center gap-1 rounded-md bg-vibra-700 px-2.5 py-1.5 text-[11.5px] font-semibold text-white hover:bg-vibra-800",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3 w-3" }), " Dar badge"]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "max-h-[260px] space-y-1.5 overflow-y-auto",
						children: [reconhecimentos.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "py-4 text-center text-[11.5px] italic text-muted-foreground",
							children: "Nenhum badge concedido ainda."
						}), reconhecimentos.slice(0, 30).map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "group flex items-start gap-2 rounded-md border border-border bg-white px-2 py-1.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Medal, { className: "mt-0.5 h-4 w-4 shrink-0 text-amber-500" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0 flex-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-1.5 text-[11.5px]",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-bold text-vibra-800 truncate",
													children: pMap.get(r.profile_id) ?? "—"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-muted-foreground",
													children: "recebeu"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-semibold text-vibra-700",
													children: r.titulo
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "ml-auto rounded bg-vibra-50 px-1.5 text-[10px] font-bold text-vibra-700",
													children: ["+", r.pontos ?? 0]
												})
											]
										}),
										r.descricao && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-[10.5px] text-muted-foreground italic",
											children: [
												"\"",
												r.descricao,
												"\""
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-[10px] text-muted-foreground",
											children: ["de ", pMap.get(r.concedido_por) ?? "anônimo"]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => removerReconhecimento(r.id),
									className: "opacity-0 group-hover:opacity-100 rounded p-0.5 text-muted-foreground hover:bg-red-50 hover:text-red-600",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3 w-3" })
								})
							]
						}, r.id))]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-2 rounded-xl border border-border bg-card p-3 shadow-vibra-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					value: filterKpi,
					onChange: (e) => setFilterKpi(e.target.value),
					className: "rounded-md border border-input bg-white px-2 py-1.5 text-[12px]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "",
						children: "KPI Humano — todos"
					}), KPI_HUMANOS.map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: k,
						children: k
					}, k))]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					value: filterPersona,
					onChange: (e) => setFilterPersona(e.target.value),
					className: "rounded-md border border-input bg-white px-2 py-1.5 text-[12px]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "",
						children: "Persona — todas"
					}), profiles.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: p.id,
						children: p.nome ?? p.email
					}, p.id))]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chart, {
					title: "Top 10 — Personas reconhecidas",
					data: rankingByPersona
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chart, {
					title: "Top 10 — KPIs Humanos mais marcados",
					data: rankingByKpi
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "overflow-x-auto rounded-xl border border-border bg-card shadow-vibra-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "border-b border-border bg-vibra-50 px-3 py-2 text-[10.5px] font-bold uppercase tracking-widest text-vibra-700",
					children: "Comportamentos de Sucesso (Admin/Editor Master)"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full text-[12px]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
						className: "bg-vibra-50/50 text-[10.5px] uppercase tracking-wider text-vibra-800",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-2 text-left",
								children: "Pessoa"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-2 text-left",
								children: "KPI"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-2 text-left",
								children: "Categoria"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-2 text-left",
								children: "Contribuição"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-2 text-left",
								children: "Min"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {})
						] })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [filtered.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-t border-border hover:bg-vibra-50/40",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-3 py-2 font-semibold text-vibra-800",
								children: pMap.get(r.profile_id) ?? "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-3 py-2",
								children: r.kpi_humano
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-3 py-2",
								children: r.categoria_diferenciada ?? "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-3 py-2 max-w-[300px] truncate",
								children: r.contribuicao ?? "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-3 py-2",
								children: r.tempo_dedicado_min ?? 0
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-3 py-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => excluir(r.id),
									className: "rounded p-1 text-muted-foreground hover:bg-red-50 hover:text-red-600",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3 w-3" })
								})
							})
						]
					}, r.id)), filtered.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						colSpan: 6,
						className: "px-3 py-8 text-center text-muted-foreground",
						children: "Sem registros."
					}) })] })]
				})]
			}),
			openAdd && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-40 flex items-center justify-center bg-black/40 p-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: (e) => {
						e.preventDefault();
						criar(new FormData(e.currentTarget));
					},
					className: "w-full max-w-md rounded-xl border border-border bg-white p-5 shadow-vibra",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mb-3 text-[15px] font-bold text-vibra-800",
							children: "Novo Reconhecimento MC³"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-[12px] font-semibold text-vibra-800",
							children: "Pessoa"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							required: true,
							name: "profile_id",
							className: "mb-2 mt-1 w-full rounded-md border border-input bg-white px-3 py-2 text-[13px]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: "Selecione…"
							}), profiles.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: p.id,
								children: p.nome ?? p.email
							}, p.id))]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-[12px] font-semibold text-vibra-800",
							children: "KPI Humano"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							required: true,
							name: "kpi_humano",
							className: "mb-2 mt-1 w-full rounded-md border border-input bg-white px-3 py-2 text-[13px]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: "Selecione…"
							}), KPI_HUMANOS.map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: k,
								children: k
							}, k))]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-[12px] font-semibold text-vibra-800",
							children: "Categoria Diferenciada"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							name: "categoria",
							className: "mb-2 mt-1 w-full rounded-md border border-input bg-white px-3 py-2 text-[13px]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: "—"
							}), CATEGORIAS.map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: k,
								children: k
							}, k))]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-[12px] font-semibold text-vibra-800",
							children: "Contribuição"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							name: "contribuicao",
							rows: 3,
							className: "mb-2 mt-1 w-full rounded-md border border-input bg-white px-3 py-2 text-[13px]"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-[12px] font-semibold text-vibra-800",
							children: "Tempo Dedicado (min)"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							name: "tempo",
							type: "number",
							defaultValue: 0,
							className: "mt-1 w-full rounded-md border border-input bg-white px-3 py-2 text-[13px]"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex justify-end gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setOpenAdd(false),
								className: "rounded-md border border-border px-3 py-1.5 text-[12px]",
								children: "Cancelar"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "submit",
								className: "rounded-md bg-vibra-700 px-3 py-1.5 text-[12px] font-semibold text-white",
								children: "Salvar"
							})]
						})
					]
				})
			}),
			openBadge && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-40 flex items-center justify-center bg-black/40 p-4",
				onClick: () => setOpenBadge(false),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onClick: (e) => e.stopPropagation(),
					onSubmit: (e) => {
						e.preventDefault();
						darBadge(new FormData(e.currentTarget));
					},
					className: "w-full max-w-md rounded-xl border border-border bg-white p-5 shadow-vibra",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-3 flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, { className: "h-5 w-5 text-vibra-700" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-[15px] font-bold text-vibra-800",
								children: "Dar um Badge"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-[12px] font-semibold text-vibra-800",
							children: "Para quem"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							required: true,
							name: "para",
							className: "mb-3 mt-1 w-full rounded-md border border-input bg-white px-3 py-2 text-[13px]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: "Selecione um colega…"
							}), profiles.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: p.id,
								children: p.nome ?? p.email
							}, p.id))]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-[12px] font-semibold text-vibra-800",
							children: "Badge"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-1 mb-3 grid grid-cols-2 gap-2",
							children: BADGES.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "flex cursor-pointer items-start gap-2 rounded-md border border-border bg-white p-2 hover:border-vibra-600 has-[:checked]:border-vibra-700 has-[:checked]:bg-vibra-50",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "radio",
									name: "badge",
									value: b.codigo,
									className: "mt-0.5",
									required: true
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[12px] font-bold text-vibra-800",
											children: b.titulo
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[10.5px] text-muted-foreground",
											children: b.descricao
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-[10px] font-semibold text-vibra-700",
											children: [
												"+",
												b.pontos,
												" pts"
											]
										})
									]
								})]
							}, b.codigo))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-[12px] font-semibold text-vibra-800",
							children: "Mensagem (opcional)"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							name: "mensagem",
							rows: 2,
							className: "mt-1 w-full rounded-md border border-input bg-white px-3 py-2 text-[13px]",
							placeholder: "Conte por que essa pessoa merece o badge..."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex justify-end gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setOpenBadge(false),
								className: "rounded-md border border-border px-3 py-1.5 text-[12px]",
								children: "Cancelar"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "submit",
								className: "rounded-md bg-vibra-700 px-3 py-1.5 text-[12px] font-semibold text-white hover:bg-vibra-800",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "mr-1 inline h-3 w-3" }), " Conceder"]
							})]
						})
					]
				})
			})
		]
	});
}
function KPI({ label, value, icon: Ic, tone }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-border bg-card p-3 shadow-vibra-sm",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-[10.5px] uppercase tracking-wider text-muted-foreground",
				children: label
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ic, { className: `h-4 w-4 ${tone === "good" ? "text-emerald-600" : "text-vibra-700"}` })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-[22px] font-bold text-vibra-800",
			children: value
		})]
	});
}
function Chart({ title, data }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-border bg-card p-4 shadow-vibra-sm",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
			className: "mb-3 text-[13px] font-bold text-vibra-800",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
			width: "100%",
			height: 260,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
				data,
				layout: "vertical",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
						strokeDasharray: "3 3",
						stroke: "#eee"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
						type: "number",
						tick: { fontSize: 11 }
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
						dataKey: "nome",
						type: "category",
						width: 140,
						tick: { fontSize: 10 }
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
						dataKey: "qtd",
						radius: [
							0,
							6,
							6,
							0
						],
						children: data.map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: VIBRA_SERIES[i % VIBRA_SERIES.length] }, i))
					})
				]
			})
		})]
	});
}
var SOURCES = [
	{
		id: "iniciativas",
		label: "Iniciativas",
		fields: [
			"codigo",
			"titulo",
			"status",
			"prioridade",
			"percentual_avanco",
			"ganho_financeiro",
			"ganho_horas",
			"diretoria",
			"gerencia",
			"macroprocesso",
			"responsavel",
			"custo_implementacao",
			"hc_estimado",
			"hc_alcancado",
			"esforco",
			"impacto_negocio",
			"potencial_automacao",
			"data_inicio",
			"data_fim_prevista",
			"projeto_id"
		],
		statusValues: [
			"Mapeada",
			"Em Andamento",
			"Em Validação",
			"Implementada",
			"Arquivada"
		],
		dateField: "data_fim_prevista"
	},
	{
		id: "tarefas",
		label: "Tarefas",
		fields: [
			"titulo",
			"status",
			"prioridade",
			"diretoria",
			"percentual_avanco",
			"horas_estimadas",
			"responsavel_id",
			"iniciativa_id",
			"data_inicio",
			"data_fim_prevista",
			"data_fim_real",
			"descricao"
		],
		statusValues: [
			"Pendente",
			"Em Andamento",
			"Concluída",
			"Bloqueada"
		],
		dateField: "data_fim_prevista"
	},
	{
		id: "projetos",
		label: "Projetos",
		fields: [
			"nome",
			"descricao",
			"data_inicio",
			"data_fim"
		],
		statusValues: [],
		dateField: "data_inicio"
	},
	{
		id: "equipe",
		label: "Equipe de Trabalho",
		fields: [
			"papel_macroprocesso",
			"diretoria",
			"area",
			"projeto_id",
			"ativo"
		],
		statusValues: [],
		dateField: ""
	}
];
function RelatoriosTab() {
	const { projetoIds } = useHierarchy();
	const selProj = projetoIds && projetoIds.length > 0 ? projetoIds : null;
	const [source, setSource] = (0, import_react.useState)(SOURCES[0]);
	const [cols, setCols] = (0, import_react.useState)([
		"codigo",
		"titulo",
		"status",
		"prioridade",
		"percentual_avanco",
		"ganho_financeiro",
		"responsavel"
	]);
	const [statusF, setStatusF] = (0, import_react.useState)("");
	const [prioridadeF, setPrioridadeF] = (0, import_react.useState)("");
	const [diretoriaF, setDiretoriaF] = (0, import_react.useState)("");
	const [responsavelF, setResponsavelF] = (0, import_react.useState)("");
	const [ganhoMinF, setGanhoMinF] = (0, import_react.useState)("");
	const [esforcoMaxF, setEsforcoMaxF] = (0, import_react.useState)("");
	const [dateFrom, setDateFrom] = (0, import_react.useState)("");
	const [dateTo, setDateTo] = (0, import_react.useState)("");
	const [search, setSearch] = (0, import_react.useState)("");
	const [filterByProj, setFilterByProj] = (0, import_react.useState)(true);
	const [showColumnsConfig, setShowColumnsConfig] = (0, import_react.useState)(false);
	const [showAdvancedFilters, setShowAdvancedFilters] = (0, import_react.useState)(false);
	function pickSource(id) {
		const s = SOURCES.find((x) => x.id === id);
		if (!s) return;
		setSource(s);
		if (s.id === "iniciativas") setCols([
			"codigo",
			"titulo",
			"status",
			"prioridade",
			"percentual_avanco",
			"ganho_financeiro",
			"responsavel"
		]);
		else if (s.id === "tarefas") setCols([
			"titulo",
			"status",
			"prioridade",
			"diretoria",
			"percentual_avanco",
			"horas_estimadas"
		]);
		else if (s.id === "projetos") setCols([
			"nome",
			"descricao",
			"data_inicio",
			"data_fim"
		]);
		else setCols([...s.fields]);
		setStatusF("");
		setPrioridadeF("");
		setDiretoriaF("");
		setResponsavelF("");
		setGanhoMinF("");
		setEsforcoMaxF("");
		setDateFrom("");
		setDateTo("");
	}
	function toggleCol(c) {
		setCols((p) => p.includes(c) ? p.filter((x) => x !== c) : [...p, c]);
	}
	const { data: rows = [], refetch, isFetching } = useQuery({
		queryKey: [
			"rel",
			source.id,
			cols.join(","),
			statusF,
			prioridadeF,
			diretoriaF,
			responsavelF,
			ganhoMinF,
			esforcoMaxF,
			dateFrom,
			dateTo,
			search,
			filterByProj,
			selProj?.join(",") ?? "_all"
		],
		queryFn: async () => {
			let qy = supabase.from(source.id).select(cols.join(","));
			if (source.id !== "equipe") qy = qy.is("deleted_at", null);
			if (statusF && source.fields.includes("status")) qy = qy.eq("status", statusF);
			if (dateFrom && source.dateField) qy = qy.gte(source.dateField, dateFrom);
			if (dateTo && source.dateField) qy = qy.lte(source.dateField, dateTo);
			if (search) {
				if (source.fields.includes("titulo")) qy = qy.ilike("titulo", `%${search}%`);
				else if (source.fields.includes("nome")) qy = qy.ilike("nome", `%${search}%`);
			}
			if (prioridadeF && source.fields.includes("prioridade")) qy = qy.eq("prioridade", prioridadeF);
			if (diretoriaF && source.fields.includes("diretoria")) qy = qy.eq("diretoria", diretoriaF);
			if (responsavelF && source.fields.includes("responsavel")) qy = qy.eq("responsavel", responsavelF);
			if (ganhoMinF && source.fields.includes("ganho_financeiro")) qy = qy.gte("ganho_financeiro", Number(ganhoMinF));
			if (esforcoMaxF && source.fields.includes("esforco")) qy = qy.lte("esforco", Number(esforcoMaxF));
			if (filterByProj && selProj) {
				if (source.fields.includes("projeto_id")) qy = qy.in("projeto_id", selProj);
				else if (source.id === "projetos") qy = qy.in("id", selProj);
			}
			const { data, error } = await qy.limit(1e3);
			if (error) throw error;
			return data ?? [];
		},
		enabled: false
	});
	const totals = (0, import_react.useMemo)(() => {
		const sum = {};
		cols.forEach((c) => {
			const vals = rows.map((r) => Number(r[c]));
			if (vals.length > 0 && vals.every((v) => !isNaN(v) && v !== 0)) sum[c] = vals.reduce((a, b) => a + b, 0);
		});
		return sum;
	}, [rows, cols]);
	function exportCSV() {
		if (!rows.length) return toast.error("Rode a consulta antes");
		const csv = [cols.join(";"), ...rows.map((r) => cols.map((c) => JSON.stringify(r[c] ?? "")).join(";"))].join("\n");
		const blob = new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = `${source.id}-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.csv`;
		a.click();
		URL.revokeObjectURL(url);
		toast.success("CSV exportado com sucesso");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-xl border border-border bg-card p-4 shadow-vibra-sm",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3 mb-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Funnel, { className: "h-5 w-5 text-vibra-700" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-[14px] font-bold text-vibra-800",
							children: "Relatórios Estratégicos & Avançados"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] text-slate-500",
							children: "Filtre, selecione colunas personalizadas e extraia análises estratégicas do portfólio."
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setShowColumnsConfig(!showColumnsConfig),
							className: `inline-flex items-center gap-1 px-3 py-1.5 text-[11.5px] font-semibold rounded border transition ${showColumnsConfig ? "bg-indigo-50 border-indigo-200 text-indigo-700" : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"}`,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { className: `h-3.5 w-3.5 ${showColumnsConfig ? "animate-spin" : ""}` }),
								"Customizar Visualização",
								showColumnsConfig ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronUp, { className: "h-3 w-3" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-3 w-3" })
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setShowAdvancedFilters(!showAdvancedFilters),
							className: `inline-flex items-center gap-1 px-3 py-1.5 text-[11.5px] font-semibold rounded border transition ${showAdvancedFilters ? "bg-amber-50 border-amber-200 text-amber-700" : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"}`,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlidersHorizontal, { className: "h-3.5 w-3.5" }),
								"Filtros Avançados",
								showAdvancedFilters ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronUp, { className: "h-3 w-3" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-3 w-3" })
							]
						})]
					})]
				}),
				showColumnsConfig && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-4 rounded-lg bg-neutral-50/50 border border-neutral-100 p-3.5 animate-fadeIn",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between mb-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-[11px] font-bold uppercase tracking-widest text-vibra-700 flex items-center gap-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-3.5 w-3.5 text-vibra-600" }),
								"Colunas Disponíveis para Exibição (",
								cols.length,
								" de ",
								source.fields.length,
								" ",
								"selecionadas)"
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setCols([...source.fields]),
							className: "text-[10px] font-bold text-indigo-600 hover:underline",
							children: "Selecionar Todas"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-1.5",
						children: source.fields.map((f) => {
							const isSelected = cols.includes(f);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => toggleCol(f),
								className: `inline-flex cursor-pointer items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-medium transition ${isSelected ? "border-indigo-600 bg-indigo-50 text-indigo-800 shadow-sm" : "border-slate-200 bg-white text-slate-500 hover:border-slate-300"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `h-1.5 w-1.5 rounded-full ${isSelected ? "bg-indigo-600" : "bg-transparent"}` }), f]
							}, f);
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "text-[11px]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mb-1 block font-semibold text-vibra-800",
								children: "Fonte de dados Principal"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								value: source.id,
								onChange: (e) => pickSource(e.target.value),
								className: "w-full h-8 rounded-md border border-input bg-white px-2 text-[12.5px] font-medium",
								children: SOURCES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: s.id,
									children: s.label
								}, s.id))
							})]
						}),
						source.statusValues.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "text-[11px]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mb-1 block font-semibold text-vibra-800",
								children: "Status"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: statusF,
								onChange: (e) => setStatusF(e.target.value),
								className: "w-full h-8 rounded-md border border-input bg-white px-2 text-[12.5px]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "",
									children: "Todos os status"
								}), source.statusValues.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: s,
									children: s
								}, s))]
							})]
						}),
						source.fields.includes("titulo") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "text-[11px]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mb-1 block font-semibold text-vibra-800",
								children: "Buscar por Título"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: search,
								onChange: (e) => setSearch(e.target.value),
								placeholder: "Ex: Conciliação, IA, Checklist...",
								className: "w-full h-8 rounded-md border border-input bg-white px-2.5 text-[12.5px] outline-none focus:border-indigo-500"
							})]
						}),
						source.dateField && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "text-[11px]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mb-1 block font-semibold text-vibra-800",
								children: "Data de Término de"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "date",
								value: dateFrom,
								onChange: (e) => setDateFrom(e.target.value),
								className: "w-full h-8 rounded-md border border-input bg-white px-2 text-[12px]"
							})]
						})
					]
				}),
				showAdvancedFilters && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 pt-3 border-t border-dashed border-slate-200 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 animate-fadeIn",
					children: [
						source.fields.includes("prioridade") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "text-[11px]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mb-1 block font-semibold text-slate-700",
								children: "Prioridade"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: prioridadeF,
								onChange: (e) => setPrioridadeF(e.target.value),
								className: "w-full h-8 rounded-md border border-input bg-white px-2 text-[12.5px]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "",
										children: "Todas"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "Baixa",
										children: "Baixa"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "Média",
										children: "Média"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "Alta",
										children: "Alta"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "Crítica",
										children: "Crítica"
									})
								]
							})]
						}),
						source.fields.includes("diretoria") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "text-[11px]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mb-1 block font-semibold text-slate-700",
								children: "Diretoria"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: diretoriaF,
								onChange: (e) => setDiretoriaF(e.target.value),
								className: "w-full h-8 rounded-md border border-input bg-white px-2 text-[12.5px]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "",
										children: "Todas"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "TI",
										children: "TI"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "Operações",
										children: "Operações"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "Financeiro",
										children: "Financeiro"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "RH",
										children: "RH"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "Comercial",
										children: "Comercial"
									})
								]
							})]
						}),
						source.fields.includes("responsavel") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "text-[11px]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mb-1 block font-semibold text-slate-700",
								children: "Responsável"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: responsavelF,
								onChange: (e) => setResponsavelF(e.target.value),
								className: "w-full h-8 rounded-md border border-input bg-white px-2 text-[12.5px]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "",
										children: "Todos"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "Rodrigo França",
										children: "Rodrigo França"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "Sandro Quequel",
										children: "Sandro Quequel"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "Aline Silva",
										children: "Aline Silva"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "Bruno Santos",
										children: "Bruno Santos"
									})
								]
							})]
						}),
						source.fields.includes("ganho_financeiro") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "text-[11px]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mb-1 block font-semibold text-slate-700",
								children: "Ganho Financeiro Mínimo (R$)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "number",
								value: ganhoMinF,
								onChange: (e) => setGanhoMinF(e.target.value),
								placeholder: "Ex: 100000",
								className: "w-full h-8 rounded-md border border-input bg-white px-2 text-[12px]"
							})]
						}),
						source.fields.includes("esforco") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "text-[11px]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mb-1 block font-semibold text-slate-700",
								children: "Esforço Máximo (1-5)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "number",
								min: 1,
								max: 5,
								value: esforcoMaxF,
								onChange: (e) => setEsforcoMaxF(e.target.value),
								placeholder: "Ex: 3",
								className: "w-full h-8 rounded-md border border-input bg-white px-2 text-[12px]"
							})]
						}),
						source.dateField && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "text-[11px]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mb-1 block font-semibold text-slate-700",
								children: "Data de Término até"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "date",
								value: dateTo,
								onChange: (e) => setDateTo(e.target.value),
								className: "w-full h-8 rounded-md border border-input bg-white px-2 text-[12px]"
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex flex-wrap items-center gap-2 border-t border-border pt-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "inline-flex items-center gap-1.5 text-[11.5px] font-semibold text-slate-700 cursor-pointer",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "checkbox",
									checked: filterByProj,
									onChange: (e) => setFilterByProj(e.target.checked),
									className: "rounded text-indigo-600 focus:ring-indigo-500 h-3.5 w-3.5"
								}),
								"Aplicar contexto de Projetos ",
								selProj ? `(${selProj.length} selecionados)` : "(todos)"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "flex-1" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => refetch(),
							disabled: isFetching,
							className: "inline-flex items-center gap-1.5 rounded-md bg-indigo-600 hover:bg-indigo-700 px-4 h-9 text-[12px] font-semibold text-white transition shadow-sm disabled:opacity-50",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "h-3.5 w-3.5 fill-white" }), isFetching ? "Carregando..." : "Rodar Consulta"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: exportCSV,
							className: "inline-flex items-center gap-1.5 rounded-md border border-slate-200 bg-white hover:bg-slate-50 px-4 h-9 text-[12px] font-semibold text-slate-700 transition",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-3.5 w-3.5" }), "Exportar CSV"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-[11.5px] text-slate-500 font-medium ml-1 bg-slate-100 px-2 py-1 rounded",
							children: [rows.length, " resultados"]
						})
					]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "overflow-x-auto rounded-xl border border-border bg-card shadow-vibra-sm",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full text-[12px]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
						className: "bg-slate-50 border-b border-border text-[10.5px] uppercase tracking-wider text-slate-700",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: cols.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3 text-left font-bold",
							children: c.replace(/_/g, " ")
						}, c)) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [rows.map((r, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
						className: "border-t border-neutral-100 hover:bg-slate-50/50 transition",
						children: cols.map((c) => {
							let cellVal = r[c];
							if (cellVal != null && (c === "ganho_financeiro" || c === "custo_implementacao")) cellVal = `R$ ${Number(cellVal).toLocaleString("pt-BR")}`;
							if (cellVal != null && c === "percentual_avanco") cellVal = `${cellVal}%`;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-2.5 text-slate-700 font-medium",
								children: cellVal != null ? String(cellVal) : "—"
							}, c);
						})
					}, i)), rows.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						colSpan: cols.length,
						className: "px-4 py-12 text-center text-slate-400 italic",
						children: isFetching ? "Buscando dados no banco..." : "Configure as opções, selecione as colunas desejadas e clique em ‘Rodar Consulta’."
					}) })] }),
					Object.keys(totals).length > 0 && rows.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tfoot", {
						className: "bg-slate-100/70 border-t-2 border-slate-200 font-bold text-slate-800",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: cols.map((c, idx) => {
							const isFinancial = c === "ganho_financeiro" || c === "custo_implementacao";
							const totalVal = totals[c];
							const formattedTotal = totalVal != null ? isFinancial ? `R$ ${totalVal.toLocaleString("pt-BR")}` : totalVal.toLocaleString("pt-BR") : "";
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3 text-slate-900",
								children: totalVal != null ? `${idx === 0 ? "Total: " : ""}Σ ${formattedTotal}` : ""
							}, c);
						}) })
					})
				]
			})
		})]
	});
}
function startOfDay(d) {
	const x = new Date(d);
	x.setHours(0, 0, 0, 0);
	return x;
}
function addDays(d, n) {
	const x = new Date(d);
	x.setDate(x.getDate() + n);
	return x;
}
function fmtDate(s) {
	if (!s) return "—";
	return new Date(s).toLocaleDateString("pt-BR", {
		day: "2-digit",
		month: "short"
	});
}
function MeuDiaTab() {
	const qc = useQueryClient();
	const [iniId, setIniId] = (0, import_react.useState)(null);
	const [novoNome, setNovoNome] = (0, import_react.useState)("");
	const [adminSearch, setAdminSearch] = (0, import_react.useState)("");
	const [showAdminPanel, setShowAdminPanel] = (0, import_react.useState)(true);
	const { data: me } = useQuery({
		queryKey: ["me-id"],
		queryFn: async () => (await supabase.auth.getUser()).data.user
	});
	const { data: myRole = "visualizador" } = useQuery({
		queryKey: ["my-role", me?.id],
		enabled: !!me?.id,
		queryFn: async () => {
			const { data } = await supabase.from("user_roles").select("role").eq("user_id", me.id).maybeSingle();
			return data?.role ?? "visualizador";
		}
	});
	const { data: profile } = useQuery({
		queryKey: ["me-profile", me?.id],
		enabled: !!me?.id,
		queryFn: async () => {
			const { data, error } = await supabase.from("profiles").select("*").eq("id", me.id).single();
			if (error) throw error;
			return data;
		}
	});
	const { data: profiles = [] } = useQuery({
		queryKey: ["all-profiles-map"],
		queryFn: async () => {
			const { data, error } = await supabase.from("profiles").select("id,nome,email,cargo");
			if (error) throw error;
			return data ?? [];
		}
	});
	const profileNameMap = (0, import_react.useMemo)(() => {
		return new Map(profiles.map((p) => [p.id, p.nome ?? p.email ?? ""]));
	}, [profiles]);
	const { data: allTarefas = [], isLoading: isLoadingTasks } = useQuery({
		queryKey: ["all-tasks-meu-dia"],
		queryFn: async () => {
			const { data, error } = await supabase.from("tarefas").select("id,titulo,status,prioridade,data_fim_prevista,data_fim_real,percentual_avanco,iniciativa_id,responsavel_id,participantes,tipo_tarefa,iniciativas(id,codigo,titulo)").is("deleted_at", null).order("data_fim_prevista", {
				ascending: true,
				nullsFirst: false
			});
			if (error) throw error;
			return data ?? [];
		}
	});
	const { data: agendas = [] } = useQuery({
		queryKey: ["all-agendas-meu-dia"],
		queryFn: async () => {
			const { data, error } = await supabase.from("agenda").select("id,titulo,data_evento,tipo_reuniao,duracao_min,notas,iniciativa_id,iniciativas(id,codigo,titulo)");
			if (error) throw error;
			return data ?? [];
		}
	});
	const { data: agendaParticipants = [] } = useQuery({
		queryKey: ["all-agenda-participants-meu-dia"],
		queryFn: async () => {
			const { data, error } = await supabase.from("agenda_participantes").select("*");
			if (error) throw error;
			return data ?? [];
		}
	});
	const { data: mc3Registros = [] } = useQuery({
		queryKey: ["my-mc3-registros", me?.id],
		enabled: !!me?.id,
		queryFn: async () => {
			const { data, error } = await supabase.from("mc3_registros").select("*").eq("profile_id", me.id).is("deleted_at", null).order("created_at", { ascending: false });
			if (error) throw error;
			return data ?? [];
		}
	});
	const { data: reconhecimentos = [] } = useQuery({
		queryKey: ["my-reconhecimentos", me?.id],
		enabled: !!me?.id,
		queryFn: async () => {
			const { data, error } = await supabase.from("reconhecimentos").select("*").eq("profile_id", me.id).order("created_at", { ascending: false });
			if (error) throw error;
			return data ?? [];
		}
	});
	async function handleSaveProfileName() {
		if (!novoNome.trim()) return toast.error("Preencha um nome válido!");
		const { error } = await supabase.from("profiles").update({ nome: novoNome.trim() }).eq("id", me.id);
		if (error) return toast.error(error.message);
		toast.success("Nome completo salvo com sucesso!");
		qc.invalidateQueries({ queryKey: ["me-profile"] });
		qc.invalidateQueries({ queryKey: ["all-profiles-map"] });
	}
	const myTarefas = (0, import_react.useMemo)(() => {
		if (!me?.id) return [];
		const myName = (profile?.nome ?? "").toLowerCase().trim();
		return allTarefas.filter((t) => {
			if (t.responsavel_id === me.id) return true;
			if (myName && Array.isArray(t.participantes)) return t.participantes.some((p) => typeof p === "string" && p.toLowerCase().trim() === myName);
			return false;
		});
	}, [
		allTarefas,
		me,
		profile
	]);
	const myAgendas = (0, import_react.useMemo)(() => {
		if (!me?.id) return [];
		return agendas.filter((a) => {
			return agendaParticipants.some((p) => p.agenda_id === a.id && p.profile_id === me.id);
		});
	}, [
		agendas,
		agendaParticipants,
		me
	]);
	const otherPendingTarefasGrouped = (0, import_react.useMemo)(() => {
		if (myRole !== "admin" && myRole !== "master" && myRole !== "gestao") return [];
		const myId = me?.id;
		const myName = (profile?.nome ?? "").toLowerCase().trim();
		const othersTasks = allTarefas.filter((t) => {
			const isMine = t.responsavel_id === myId || myName && Array.isArray(t.participantes) && t.participantes.some((p) => typeof p === "string" && p.toLowerCase().trim() === myName);
			const st = (t.status ?? "").toLowerCase();
			return !isMine && !(st === "concluída" || st === "concluida" || st === "cancelada");
		});
		const grouped = {};
		for (const t of othersTasks) {
			let respName = "Sem Responsável";
			if (t.responsavel_id) respName = profileNameMap.get(t.responsavel_id) ?? "Usuário Desconhecido";
			if (adminSearch) {
				const query = adminSearch.toLowerCase().trim();
				const matchesName = respName.toLowerCase().includes(query);
				const matchesTitle = (t.titulo ?? "").toLowerCase().includes(query);
				const matchesIniciativa = (t.iniciativas?.titulo ?? "").toLowerCase().includes(query) || (t.iniciativas?.codigo ?? "").toLowerCase().includes(query);
				if (!matchesName && !matchesTitle && !matchesIniciativa) continue;
			}
			if (!grouped[respName]) grouped[respName] = {
				user_id: t.responsavel_id,
				name: respName,
				tasks: []
			};
			grouped[respName].tasks.push(t);
		}
		return Object.values(grouped).sort((a, b) => a.name.localeCompare(b.name));
	}, [
		allTarefas,
		me,
		profile,
		myRole,
		profileNameMap,
		adminSearch
	]);
	const buckets = (0, import_react.useMemo)(() => {
		const hoje = startOfDay(/* @__PURE__ */ new Date());
		const em7 = addDays(hoje, 7);
		const atrasadas = [];
		const doDia = [];
		const proximas = [];
		const concluidas = [];
		for (const t of myTarefas) {
			const st = (t.status ?? "").toLowerCase();
			if (st === "concluída" || st === "concluida" || st === "cancelada") {
				concluidas.push(t);
				continue;
			}
			if (!t.data_fim_prevista) {
				proximas.push(t);
				continue;
			}
			const d = startOfDay(new Date(t.data_fim_prevista));
			if (d < hoje) atrasadas.push(t);
			else if (d.getTime() === hoje.getTime()) doDia.push(t);
			else if (d <= em7) proximas.push(t);
			else proximas.push(t);
		}
		return {
			atrasadas,
			doDia,
			proximas,
			concluidas
		};
	}, [myTarefas]);
	const total = myTarefas.length;
	const pctOk = total ? Math.round(buckets.concluidas.length / total * 100) : 0;
	const totalPontosMc3 = (0, import_react.useMemo)(() => {
		return reconhecimentos.reduce((acc, r) => acc + (r.pontos ?? 0), 0) + mc3Registros.length * 10;
	}, [reconhecimentos, mc3Registros]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			profile && (!profile.nome || profile.nome.trim().split(/\s+/).length < 2) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-xl border border-amber-200 bg-amber-50 p-4.5 shadow-vibra-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "mt-0.5 h-5 w-5 shrink-0 text-amber-600" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
							className: "text-[13px] font-bold text-amber-900",
							children: "Configure seu nome completo!"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-0.5 text-[11.5px] leading-relaxed text-amber-800",
							children: [
								"Para que o sistema correlacione suas tarefas, agendas, atas e reconhecimentos MC³ automaticamente, você precisa salvar seu nome completo (ex:",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Raquel de Souza França" }),
								")."
							]
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "text",
							placeholder: "Seu Nome Completo",
							value: novoNome,
							onChange: (e) => setNovoNome(e.target.value),
							className: "h-8.5 w-full rounded border border-amber-200 bg-white px-2.5 text-[12px] text-amber-950 outline-none focus:border-amber-400 sm:w-56"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: handleSaveProfileName,
							className: "flex h-8.5 items-center gap-1.5 rounded bg-amber-600 px-3 text-[12px] font-semibold text-white transition hover:bg-amber-700",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "h-3.5 w-3.5" }), " Salvar"]
						})]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "rounded-xl border border-neutral-200 bg-white p-5 shadow-vibra-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-end justify-between gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex h-12 w-12 items-center justify-center rounded-full bg-vibra-50 text-vibra-700",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "h-6 w-6" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-[10.5px] font-bold uppercase tracking-widest text-vibra-600",
									children: [
										"Hoje ·",
										" ",
										(/* @__PURE__ */ new Date()).toLocaleDateString("pt-BR", {
											weekday: "long",
											day: "2-digit",
											month: "long"
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
									className: "mt-0.5 text-[20px] font-bold text-vibra-800",
									children: [
										"Olá, ",
										profile?.nome ?? "Usuário",
										"!"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[12px] text-muted-foreground",
									children: "Aqui está o resumo do seu dia com base no seu nome completo."
								})
							] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center gap-4 text-[12px]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
									label: "Atrasadas",
									value: buckets.atrasadas.length,
									color: "bg-rose-50 text-rose-700 border border-rose-100",
									icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-3.5 w-3.5" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
									label: "Para hoje",
									value: buckets.doDia.length,
									color: "bg-amber-50 text-amber-700 border border-amber-100",
									icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-3.5 w-3.5" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
									label: "Próx. 7d",
									value: buckets.proximas.length,
									color: "bg-vibra-50 text-vibra-800 border border-vibra-100",
									icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, { className: "h-3.5 w-3.5" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
									label: "MC³ Pontos",
									value: totalPontosMc3,
									color: "bg-indigo-50 text-indigo-700 border border-indigo-100",
									icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, { className: "h-3.5 w-3.5" })
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 h-2 rounded-full bg-neutral-100",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-2 rounded-full bg-vibra-600 transition-all duration-500",
							style: { width: `${pctOk}%` }
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-right text-[11px] font-medium text-muted-foreground",
						children: [pctOk, "% concluído das suas tarefas atribuídas"]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 gap-5 lg:grid-cols-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "lg:col-span-2 space-y-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-[14px] font-bold tracking-tight text-vibra-800 flex items-center gap-2",
							children: "📋 Suas Atividades e Tarefas"
						}),
						isLoadingTasks ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-center text-[12.5px] py-10 text-muted-foreground",
							children: "Carregando…"
						}) : total === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl border border-dashed border-neutral-200 bg-white p-10 text-center shadow-vibra-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "mx-auto h-10 w-10 text-emerald-500 animate-bounce" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 text-[13px] font-semibold text-vibra-800",
									children: "Você está livre 🎉"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[12px] text-muted-foreground",
									children: "Nenhuma tarefa atribuída ao seu nome completo no momento."
								})
							]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-1 gap-4 sm:grid-cols-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Column, {
									title: "Atrasadas",
									tone: "rose",
									items: buckets.atrasadas,
									onOpen: setIniId
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Column, {
									title: "Para hoje",
									tone: "amber",
									items: buckets.doDia,
									onOpen: setIniId
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Column, {
									title: "Próximos 7 dias / Sem data",
									tone: "vibra",
									items: buckets.proximas,
									onOpen: setIniId
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl border border-neutral-200 bg-white p-4 shadow-vibra-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
								className: "text-[13.5px] font-bold text-vibra-800 flex items-center gap-2 mb-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "h-4 w-4 text-vibra-600" }), " Sua Agenda & Reuniões"]
							}), myAgendas.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[12px] text-muted-foreground italic p-2 text-center",
								children: "Nenhuma reunião agendada onde você é participante."
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "divide-y divide-neutral-100 max-h-56 overflow-y-auto",
								children: myAgendas.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "py-2.5 flex items-center justify-between gap-3 text-[12px]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-0.5 min-w-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-semibold text-neutral-800 truncate",
											children: a.titulo
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-[10.5px] text-muted-foreground flex items-center gap-1.5",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "rounded bg-neutral-100 px-1 py-0.2 font-medium text-neutral-700",
													children: a.tipo_reuniao ?? "Status"
												}),
												a.iniciativas?.codigo && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-bold text-vibra-700",
													children: a.iniciativas.codigo
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [a.duracao_min ?? 0, " min"] })
											]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-right shrink-0",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-semibold text-neutral-700",
											children: fmtDate(a.data_evento)
										})
									})]
								}, a.id))
							})]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-[14px] font-bold tracking-tight text-indigo-900 flex items-center gap-2",
						children: "🚀 Reconhecimento & Contribuições (MC³)"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-indigo-150 bg-indigo-50/40 p-4.5 shadow-vibra-sm space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between border-b border-indigo-100 pb-2.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, { className: "h-5 w-5 text-indigo-600 animate-pulse" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[13px] font-bold text-indigo-900",
										children: "Seus Badges & Medalhas"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-[11px] bg-indigo-100 text-indigo-800 font-bold px-2 py-0.5 rounded-full",
									children: [reconhecimentos.length, " Badges"]
								})]
							}),
							reconhecimentos.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-4 text-center border border-dashed border-indigo-200 rounded-lg bg-white",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "mx-auto h-6 w-6 text-indigo-400" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 text-[11.5px] font-medium text-indigo-800",
										children: "Ainda sem badges recebidos"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[10.5px] text-muted-foreground",
										children: "Continue gerando valor para a corporação."
									})
								]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "space-y-2.5 max-h-[180px] overflow-y-auto pr-1",
								children: reconhecimentos.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex gap-2.5 items-start bg-white p-2.5 rounded-lg border border-indigo-100 shadow-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[18px]",
										children: "🏅"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-0.5 min-w-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[11.5px] font-bold text-indigo-950 truncate",
												children: r.titulo
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-[10px] text-indigo-700 font-semibold shrink-0",
												children: [
													"+",
													r.pontos,
													" pts"
												]
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-[10.5px] text-neutral-600 leading-tight italic line-clamp-2",
											children: [
												"\"",
												r.descricao,
												"\""
											]
										})]
									})]
								}, r.id))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between border-b border-indigo-100 pt-2 pb-2.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[13px] font-bold text-indigo-900",
									children: "Contribuições Ativas (MC³)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-[11px] bg-indigo-100 text-indigo-800 font-bold px-2 py-0.5 rounded-full",
									children: [mc3Registros.length, " Registros"]
								})]
							}),
							mc3Registros.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] text-indigo-800 italic text-center py-2",
								children: "Nenhum registro de dedicação à matriz MC³ ativo."
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "space-y-2 max-h-[180px] overflow-y-auto pr-1",
								children: mc3Registros.map((reg) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "bg-white p-2.5 rounded-lg border border-indigo-100 text-[11px] space-y-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-bold text-indigo-900 bg-indigo-50 px-1.5 py-0.2 rounded",
												children: reg.kpi_humano
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-muted-foreground text-[10px]",
												children: [reg.tempo_dedicado_min, " min"]
											})]
										}),
										reg.categoria_diferenciada && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-semibold text-[10.5px] text-neutral-800",
											children: reg.categoria_diferenciada
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-neutral-600 leading-normal",
											children: reg.contribuicao
										})
									]
								}, reg.id))
							})
						]
					})]
				})]
			}),
			(myRole === "admin" || myRole === "master" || myRole === "gestao") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-xl border border-neutral-200 bg-white p-5 shadow-vibra-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-neutral-100 pb-3 mb-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
						className: "text-[14px] font-bold text-vibra-800 flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "h-4 w-4 text-vibra-700 animate-pulse" }), " Painel de Pendências Gerais (Outros Usuários)"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11.5px] text-muted-foreground",
						children: "Exibição de todas as pendências não concluídas de outros usuários. Apenas usuários Administradores, Master ou Gestão visualizam esta seção."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setShowAdminPanel(!showAdminPanel),
						className: "h-8 rounded border border-neutral-200 px-3 text-[11px] font-bold hover:bg-neutral-50",
						children: showAdminPanel ? "Ocultar Painel" : "Mostrar Painel"
					})]
				}), showAdminPanel && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-center gap-2 max-w-md",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								placeholder: "Filtrar por Usuário, Tarefa ou Iniciativa...",
								value: adminSearch,
								onChange: (e) => setAdminSearch(e.target.value),
								className: "h-8.5 w-full rounded-md border border-neutral-200 pl-8.5 pr-3 text-[12px] outline-none focus:border-vibra-500"
							})]
						})
					}), otherPendingTarefasGrouped.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[12px] text-muted-foreground italic text-center py-6",
						children: "Nenhuma pendência encontrada para outros usuários correspondente aos termos."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3",
						children: otherPendingTarefasGrouped.map((grp) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-lg border border-neutral-150 bg-neutral-50/50 p-3 space-y-2.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between border-b border-neutral-200 pb-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-bold text-[12.5px] text-neutral-800 truncate",
									children: grp.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "rounded bg-neutral-200 px-1.5 py-0.2 text-[10px] font-bold text-neutral-700",
									children: [grp.tasks.length, " pendentes"]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "space-y-2 max-h-[220px] overflow-y-auto",
								children: grp.tasks.map((tar) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									onClick: () => setIniId(tar.iniciativa_id),
									className: "bg-white p-2 rounded border border-neutral-200 text-[11px] shadow-sm hover:border-vibra-300 transition cursor-pointer space-y-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-semibold text-neutral-800 leading-tight",
										children: tar.titulo
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between gap-2 text-[9.5px] text-muted-foreground",
										children: [tar.iniciativas?.codigo && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-bold text-vibra-700",
											children: tar.iniciativas.codigo
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["📅 ", fmtDate(tar.data_fim_prevista)] })]
									})]
								}, tar.id))
							})]
						}, grp.name))
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InitiativeDrawer, {
				initiativeId: iniId,
				onClose: () => setIniId(null)
			})
		]
	});
}
function Metric({ label, value, color, icon }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: `flex h-9 w-9 items-center justify-center rounded-lg ${color}`,
			children: icon
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "leading-tight",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-[15px] font-bold text-vibra-800",
				children: value
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground",
				children: label
			})]
		})]
	});
}
var TONES = {
	rose: {
		header: "bg-rose-50 text-rose-800",
		ring: "border-rose-200",
		chip: "bg-rose-100 text-rose-700"
	},
	amber: {
		header: "bg-amber-50 text-amber-800",
		ring: "border-amber-200",
		chip: "bg-amber-100 text-amber-700"
	},
	vibra: {
		header: "bg-vibra-50 text-vibra-800",
		ring: "border-vibra-200",
		chip: "bg-vibra-100 text-vibra-800"
	}
};
function Column({ title, tone, items, onOpen }) {
	const t = TONES[tone] ?? TONES.vibra;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `overflow-hidden rounded-xl border bg-white shadow-vibra-sm ${t.ring}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: `flex items-center justify-between px-4 py-2.5 ${t.header}`,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "text-[11.5px] font-bold uppercase tracking-wider",
				children: title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: `rounded-full px-2 py-0.5 text-[10.5px] font-bold ${t.chip}`,
				children: items.length
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-h-[350px] divide-y divide-neutral-100 overflow-y-auto",
			children: [items.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "px-4 py-6 text-center text-[11px] italic text-muted-foreground",
				children: "Nada por aqui."
			}), items.map((tar) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: () => onOpen(tar.iniciativa_id),
				className: "group flex w-full flex-col gap-1 px-4 py-2.5 text-left transition hover:bg-vibra-50",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "line-clamp-2 text-[12px] font-semibold text-neutral-800 leading-tight",
						children: tar.titulo
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "h-3 w-3 shrink-0 text-muted-foreground opacity-0 transition group-hover:opacity-100" })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-1.5 text-[10px] text-muted-foreground",
					children: [
						tar.iniciativas?.codigo && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "rounded bg-neutral-100 px-1.5 py-0.2 font-semibold text-neutral-700",
							children: tar.iniciativas.codigo
						}),
						tar.iniciativas?.titulo && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "truncate max-w-[120px]",
							children: tar.iniciativas.titulo
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "ml-auto",
							children: ["📅 ", fmtDate(tar.data_fim_prevista)]
						})
					]
				})]
			}, tar.id))]
		})]
	});
}
var STATUS = [
	"Pendente",
	"Em Andamento",
	"Concluída",
	"Bloqueada",
	"Cancelada"
];
var PRIORIDADES = [
	"Baixa",
	"Média",
	"Alta",
	"Crítica"
];
function daysUntil(d) {
	if (!d) return null;
	const ms = new Date(d).getTime() - (/* @__PURE__ */ new Date()).setHours(0, 0, 0, 0);
	return Math.floor(ms / 864e5);
}
async function syncTaskToAgenda(task) {
	if (!task.id) return;
	if (task.tipo_tarefa === "Agenda") {
		const { data: existing } = await supabase.from("agenda").select("id").eq("tarefa_id", task.id).maybeSingle();
		const title = task.nome_evento?.trim() || task.titulo?.trim() || "Evento de Agenda";
		const date = task.data_real || task.data_fim_prevista || (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
		const duration = Math.round(Number(task.horas_dedicadas ?? 1) * 60);
		const notes = task.observacoes || "";
		const isCompleted = /conclu/i.test(task.status ?? "");
		const agendaPayload = {
			titulo: title,
			data_evento: date.includes("T") ? date : `${date}T09:00:00`,
			tipo_reuniao: "Comitê",
			duracao_min: duration,
			notas: notes,
			concluida: isCompleted,
			concluida_em: isCompleted ? (/* @__PURE__ */ new Date()).toISOString() : null,
			iniciativa_id: task.iniciativa_id || null,
			tarefa_id: task.id
		};
		let agendaId = existing?.id;
		if (agendaId) await supabase.from("agenda").update(agendaPayload).eq("id", agendaId);
		else {
			const { data: created, error } = await supabase.from("agenda").insert(agendaPayload).select("id").single();
			if (!error && created) agendaId = created.id;
		}
		if (agendaId) {
			await supabase.from("agenda_participantes").delete().eq("agenda_id", agendaId);
			const parts = task.participantes ?? [];
			if (parts.length > 0) {
				const minutos = Math.round(duration * .8);
				const { data: allProfs } = await supabase.from("profiles").select("id, nome");
				const payloadParts = [];
				for (const name of parts) {
					const matchedProf = allProfs?.find((p) => p.nome?.toLowerCase() === name.toLowerCase());
					if (matchedProf) payloadParts.push({
						agenda_id: agendaId,
						profile_id: matchedProf.id,
						minutos_creditados: minutos
					});
					else {
						const { data: newProf } = await supabase.from("profiles").insert({ nome: name }).select("id").single();
						if (newProf) payloadParts.push({
							agenda_id: agendaId,
							profile_id: newProf.id,
							minutos_creditados: minutos
						});
					}
				}
				if (payloadParts.length > 0) await supabase.from("agenda_participantes").insert(payloadParts);
			}
		}
	} else await supabase.from("agenda").update({ deleted_at: (/* @__PURE__ */ new Date()).toISOString() }).eq("tarefa_id", task.id);
}
function TarefasTab() {
	const qc = useQueryClient();
	const confirm = useConfirm();
	const { projetoIds } = useHierarchy();
	const selProj = projetoIds && projetoIds.length > 0 ? projetoIds : null;
	const [editId, setEditId] = (0, import_react.useState)(null);
	const [newForProj, setNewForProj] = (0, import_react.useState)(null);
	useRealtimeTable("tarefas", [["tarefas-board"]]);
	useRealtimeTable("iniciativas", [["tarefas-ini"]]);
	const { data: projetos = [] } = useQuery({
		queryKey: ["tarefas-projs"],
		queryFn: async () => (await supabase.from("projetos").select("id,nome,cor").is("deleted_at", null).order("nome")).data ?? []
	});
	const { data: iniciativas = [] } = useQuery({
		queryKey: ["tarefas-ini", selProj?.join(",") ?? "_all"],
		queryFn: async () => {
			let qy = supabase.from("iniciativas").select("id,titulo,projeto_id,diretoria,data_inicio,data_fim_prevista").is("deleted_at", null);
			if (selProj) qy = qy.in("projeto_id", selProj);
			return (await qy).data ?? [];
		}
	});
	const iniIds = iniciativas.map((i) => i.id);
	const { data: tarefas = [] } = useQuery({
		queryKey: [
			"tarefas-board",
			selProj?.join(",") ?? "_all",
			iniIds.length
		],
		queryFn: async () => {
			let qy = supabase.from("tarefas").select("*").is("deleted_at", null).order("data_fim_prevista", { ascending: true });
			if (selProj) qy = qy.in("iniciativa_id", iniIds.length ? iniIds : ["00000000-0000-0000-0000-000000000000"]);
			return (await qy).data ?? [];
		}
	});
	const { data: profiles = [] } = useQuery({
		queryKey: ["tarefas-profiles"],
		queryFn: async () => (await supabase.from("profiles").select("id,nome,email")).data ?? []
	});
	const { data: allMicros = [] } = useQuery({
		queryKey: ["tarefas-micros", iniIds.length],
		queryFn: async () => {
			const sb = supabase.from("microprocessos");
			if (!iniIds.length) return (await sb.select("id,titulo,iniciativa_id").is("deleted_at", null)).data ?? [];
			return (await sb.select("id,titulo,iniciativa_id").is("deleted_at", null).in("iniciativa_id", iniIds)).data ?? [];
		}
	});
	const profMap = new Map(profiles.map((p) => [p.id, p.nome ?? p.email ?? "—"]));
	const iniMap = new Map(iniciativas.map((i) => [i.id, i]));
	const projetosVisiveis = selProj ? projetos.filter((p) => selProj.includes(p.id)) : projetos;
	const totals = {
		total: tarefas.length,
		andamento: tarefas.filter((t) => /andamento/i.test(t.status ?? "")).length,
		concluidas: tarefas.filter((t) => /conclu/i.test(t.status ?? "")).length,
		pendentes: tarefas.filter((t) => /pendente/i.test(t.status ?? "")).length,
		bloqueadas: tarefas.filter((t) => /bloque/i.test(t.status ?? "")).length,
		atrasadas: tarefas.filter((t) => t.data_fim_prevista && new Date(t.data_fim_prevista) < /* @__PURE__ */ new Date() && !/conclu|cancel/i.test(t.status ?? "")).length
	};
	const tarefasByProj = (0, import_react.useMemo)(() => {
		const map = /* @__PURE__ */ new Map();
		for (const t of tarefas) {
			const pid = (t.iniciativa_id ? iniMap.get(t.iniciativa_id) : void 0)?.projeto_id ?? "__avulsa";
			if (!map.has(pid)) map.set(pid, []);
			map.get(pid).push(t);
		}
		return map;
	}, [tarefas, iniMap]);
	const projRange = (0, import_react.useMemo)(() => {
		const m = /* @__PURE__ */ new Map();
		for (const i of iniciativas) {
			const e = m.get(i.projeto_id ?? "") ?? {
				nIni: 0,
				nTar: 0
			};
			e.nIni += 1;
			if (i.data_inicio && (!e.ini || i.data_inicio < e.ini)) e.ini = i.data_inicio;
			if (i.data_fim_prevista && (!e.fim || i.data_fim_prevista > e.fim)) e.fim = i.data_fim_prevista;
			m.set(i.projeto_id ?? "", e);
		}
		for (const [pid, arr] of tarefasByProj) {
			const e = m.get(pid) ?? {
				nIni: 0,
				nTar: 0
			};
			e.nTar = arr.length;
			m.set(pid, e);
		}
		return m;
	}, [iniciativas, tarefasByProj]);
	async function updateField(id, patch) {
		if ("status" in patch && /conclu/i.test(patch.status)) patch.data_fim_real = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
		const { error } = await supabase.from("tarefas").update(patch).eq("id", id);
		if (error) toast.error(error.message);
		else {
			const { data: fullTask } = await supabase.from("tarefas").select("*").eq("id", id).maybeSingle();
			if (fullTask) await syncTaskToAgenda(fullTask);
			await syncHierarchyProgress({ taskId: id });
			qc.invalidateQueries({ queryKey: ["tarefas-board"] });
			qc.invalidateQueries({ queryKey: ["agenda"] });
			qc.invalidateQueries({ queryKey: ["agenda-parts"] });
		}
	}
	async function remover(id) {
		if (!await confirm("Excluir tarefa?", "Tem certeza que deseja excluir esta tarefa permanentemente? Esta ação é irreversível!")) return;
		const { error } = await supabase.from("tarefas").update({ deleted_at: (/* @__PURE__ */ new Date()).toISOString() }).eq("id", id);
		if (error) toast.error(error.message);
		else {
			await supabase.from("agenda").update({ deleted_at: (/* @__PURE__ */ new Date()).toISOString() }).eq("tarefa_id", id);
			toast.success("Tarefa removida");
			qc.invalidateQueries({ queryKey: ["tarefas-board"] });
			qc.invalidateQueries({ queryKey: ["agenda"] });
		}
	}
	const diretorias = [.../* @__PURE__ */ new Set([...iniciativas.map((i) => i.diretoria).filter(Boolean), ...tarefas.map((t) => t.diretoria).filter(Boolean)])];
	const projSemDatas = projetosVisiveis.filter((p) => {
		const r = projRange.get(p.id);
		return !r?.ini || !r?.fim;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 gap-2 sm:grid-cols-5",
				children: [
					{
						l: "Total",
						v: totals.total,
						c: "from-vibra-900 to-vibra-800",
						vc: "text-white"
					},
					{
						l: "Em Andamento",
						v: totals.andamento,
						c: "from-vibra-800 to-vibra-700",
						vc: "text-amber-300"
					},
					{
						l: "Concluídas",
						v: totals.concluidas,
						c: "from-vibra-800 to-vibra-700",
						vc: "text-emerald-300"
					},
					{
						l: "Atrasadas",
						v: totals.atrasadas,
						c: "from-vibra-800 to-vibra-700",
						vc: "text-red-300"
					},
					{
						l: "Bloqueadas",
						v: totals.bloqueadas,
						c: "from-vibra-800 to-vibra-700",
						vc: "text-orange-300"
					}
				].map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: `rounded-xl bg-gradient-to-br ${k.c} px-3 py-2.5 shadow-vibra`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[9.5px] font-bold uppercase tracking-widest text-white/70",
						children: k.l
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: `text-[22px] font-extrabold ${k.vc}`,
						children: k.v
					})]
				}, k.l))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-3 sm:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						label: "Total de Projetos",
						value: projetosVisiveis.length,
						sub: `${tarefas.length} tarefas no total`,
						color: "text-vibra-700"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						label: "Tarefas Concluídas",
						value: totals.concluidas,
						sub: `${tarefas.length ? Math.round(totals.concluidas / tarefas.length * 100) : 0}% do total`,
						color: "text-emerald-600"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						label: "Pendentes",
						value: totals.pendentes,
						sub: `${totals.bloqueadas} bloqueadas`,
						color: "text-orange-500"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						label: "Em Andamento",
						value: totals.andamento,
						sub: "Tarefas ativas agora",
						color: "text-blue-600"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [
					totals.bloqueadas > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Banner, {
						cls: "bg-blue-50 border-blue-200 text-blue-800",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link2, { className: "h-4 w-4" }),
						children: [totals.bloqueadas, " tarefa(s) bloqueadas — priorize destravamentos."]
					}),
					totals.atrasadas > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Banner, {
						cls: "bg-red-50 border-red-200 text-red-700",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-4 w-4" }),
						children: [totals.atrasadas, " tarefa(s) em atraso — reagendar ou repriorizar."]
					}),
					projSemDatas.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Banner, {
						cls: "bg-amber-50 border-amber-200 text-amber-800",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarClock, { className: "h-4 w-4" }),
						children: [
							"Projeto \"",
							p.nome,
							"\" não possui datas de início/fim definidas."
						]
					}, p.id))
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
				title: "Timeline dos Projetos",
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarClock, { className: "h-4 w-4 text-vibra-700" }),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5",
					children: [projetosVisiveis.map((p) => {
						const r = projRange.get(p.id);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-lg border-l-4 border-vibra-600 bg-vibra-50/30 p-2.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "truncate text-[12.5px] font-bold text-vibra-900",
									children: p.nome
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-[10.5px] text-muted-foreground",
									children: [
										"Início: ",
										r?.ini ?? "—",
										" → Fim: ",
										r?.fim ?? "—"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-[10.5px] text-muted-foreground",
									children: [
										r?.nIni ?? 0,
										" iniciativa(s) · ",
										r?.nTar ?? 0,
										" tarefa(s)"
									]
								})
							]
						}, p.id);
					}), projetosVisiveis.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[12px] italic text-muted-foreground",
						children: "Nenhum projeto."
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
				title: "Placar por Projeto",
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartColumn, { className: "h-4 w-4 text-vibra-700" }),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5",
					children: projetosVisiveis.map((p) => {
						const arr = tarefasByProj.get(p.id) ?? [];
						const abertas = arr.filter((t) => !/conclu|cancel/i.test(t.status ?? "")).length;
						const bloqu = arr.filter((t) => /bloque/i.test(t.status ?? "")).length;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-lg border-l-4 border-emerald-600 bg-white p-2.5 shadow-vibra-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "truncate text-[10px] font-bold uppercase tracking-wider text-muted-foreground",
									children: p.nome
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[22px] font-extrabold text-vibra-900",
									children: arr.length
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-[10.5px] text-muted-foreground",
									children: [
										abertas,
										" abertas · ",
										bloqu,
										" c/ dependência"
									]
								})
							]
						}, p.id);
					})
				})
			}),
			projetosVisiveis.map((p) => {
				const arr = tarefasByProj.get(p.id) ?? [];
				const pend = arr.filter((t) => /pendente/i.test(t.status ?? "")).length;
				const conc = arr.filter((t) => /conclu/i.test(t.status ?? "")).length;
				const bloqu = arr.filter((t) => /bloque/i.test(t.status ?? "")).length;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProjectTable, {
					projeto: p,
					tarefas: arr,
					pend,
					conc,
					bloqu,
					pct: arr.length ? Math.round(conc / arr.length * 100) : 0,
					iniciativas: iniciativas.filter((i) => i.projeto_id === p.id),
					profiles,
					profMap,
					diretorias,
					onEdit: (id) => setEditId(id),
					onNew: () => {
						setNewForProj(p.id);
						setEditId("new");
					},
					onPatch: updateField,
					onRemove: remover
				}, p.id);
			}),
			(tarefasByProj.get("__avulsa")?.length ?? 0) > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProjectTable, {
				projeto: {
					id: "__avulsa",
					nome: "Tarefas Avulsas (sem iniciativa)",
					cor: null
				},
				tarefas: tarefasByProj.get("__avulsa") ?? [],
				pend: 0,
				conc: 0,
				bloqu: 0,
				pct: 0,
				iniciativas,
				profiles,
				profMap,
				diretorias,
				onEdit: (id) => setEditId(id),
				onNew: () => {
					setNewForProj(null);
					setEditId("new");
				},
				onPatch: updateField,
				onRemove: remover
			}),
			editId !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TarefaDrawer, {
				id: editId,
				initialProjetoId: newForProj,
				iniciativas,
				allMicros,
				profiles,
				diretorias,
				onClose: () => {
					setEditId(null);
					setNewForProj(null);
				},
				onSaved: () => {
					qc.invalidateQueries({ queryKey: ["tarefas-board"] });
					setEditId(null);
					setNewForProj(null);
				}
			})
		]
	});
}
function Banner({ cls, icon, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `flex items-center gap-2 rounded-lg border px-3 py-2 text-[12.5px] ${cls}`,
		children: [icon, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children })]
	});
}
function SummaryCard({ label, value, sub, color }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-border bg-card p-3 shadow-vibra-sm",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[10px] font-bold uppercase tracking-widest text-muted-foreground",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: `text-[26px] font-extrabold ${color}`,
				children: value
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[10.5px] text-muted-foreground",
				children: sub
			})
		]
	});
}
function Section({ title, icon, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-border bg-card p-3 shadow-vibra-sm",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-2 flex items-center gap-2",
			children: [icon, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[12.5px] font-bold text-vibra-900",
				children: title
			})]
		}), children]
	});
}
function ProjectTable({ projeto, tarefas, pend, conc, bloqu, pct, iniciativas, profiles, profMap, diretorias, onEdit, onNew, onPatch, onRemove }) {
	const { values: perfis } = usePicklist("Perfil Vinculado");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-border bg-card p-3 shadow-vibra-sm",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-2 flex items-center justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[14px] font-bold text-vibra-900",
					children: projeto.nome
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-[10.5px] text-muted-foreground",
					children: [
						tarefas.length,
						" tarefas · ",
						pend,
						" pendentes · ",
						conc,
						" concluídas"
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: onNew,
					className: "inline-flex items-center gap-1 rounded-md bg-vibra-700 px-3 py-1.5 text-[12px] font-bold text-white hover:bg-vibra-800",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3.5 w-3.5" }), " Nova Tarefa"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-2 grid grid-cols-4 gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mini, {
						label: "Pendentes",
						value: pend,
						color: "text-orange-500"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mini, {
						label: "Concluídas",
						value: conc,
						color: "text-emerald-600"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mini, {
						label: "C/ Bloqueio",
						value: bloqu,
						color: "text-red-500"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-lg border border-border bg-white p-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[9.5px] font-bold uppercase tracking-wider text-muted-foreground",
							children: "Progresso Geral"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-1 flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex-1 h-2 rounded-full bg-muted",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-2 rounded-full bg-gradient-to-r from-emerald-500 to-orange-500",
									style: { width: `${pct}%` }
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-[11px] font-bold text-vibra-800",
								children: [pct, "%"]
							})]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-x-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full text-[11.5px] min-w-[1200px]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "bg-vibra-50 text-vibra-800",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "Tarefa" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "Responsável" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "Diretoria" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "Prazo" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "Horas Ded." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "Participantes" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "Tipo" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "Data Real" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "Criticidade" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "Status" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "Ações" })
						]
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [tarefas.map((t) => {
						const d = daysUntil(t.data_fim_prevista);
						const overdue = d !== null && d < 0 && !/conclu|cancel/i.test(t.status ?? "");
						const warn = d !== null && d >= 0 && d <= 3 && !/conclu|cancel/i.test(t.status ?? "");
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-b border-border hover:bg-vibra-50/30",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-2 py-1.5",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => onEdit(t.id),
										className: "text-left font-semibold text-vibra-800 hover:text-vibra-600",
										children: t.titulo
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-2 py-1.5",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										value: t.responsavel_id ?? "",
										onChange: (e) => onPatch(t.id, { responsavel_id: e.target.value || null }),
										className: "w-full rounded border border-input bg-white px-1.5 py-1 text-[11px]",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "",
											children: "— selecione —"
										}), perfis.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: v.valor,
											children: v.valor
										}, v.id))]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: "px-2 py-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: t.diretoria ?? "",
										onChange: (e) => onPatch(t.id, { diretoria: e.target.value || null }),
										list: `dirs-${projeto.id}`,
										placeholder: "— selecione —",
										className: "w-full rounded border border-input bg-white px-1.5 py-1 text-[11px]"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("datalist", {
										id: `dirs-${projeto.id}`,
										children: diretorias.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: d }, d))
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-2 py-1.5",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "date",
										value: t.data_fim_prevista ?? "",
										onChange: (e) => onPatch(t.id, { data_fim_prevista: e.target.value || null }),
										className: `w-full rounded border border-input bg-white px-1.5 py-1 text-[11px] ${overdue ? "border-red-400 text-red-700 font-bold" : warn ? "border-orange-300 text-orange-700" : ""}`
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-2 py-1.5",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "number",
										step: "0.5",
										value: t.horas_dedicadas ?? "",
										onChange: (e) => onPatch(t.id, { horas_dedicadas: e.target.value === "" ? null : Number(e.target.value) }),
										className: "w-14 rounded border border-input bg-white px-1.5 py-1 text-[11px]"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-2 py-1.5 min-w-[150px]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										onClick: (e) => e.stopPropagation(),
										className: "relative",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PicklistField, {
											multi: true,
											categoria: "Participantes",
											value: Array.isArray(t.participantes) ? t.participantes : typeof t.participantes === "string" ? t.participantes.split(",").map((s) => s.trim()).filter(Boolean) : [],
											onChange: (v) => onPatch(t.id, { participantes: v }),
											placeholder: "Participantes",
											size: "sm"
										})
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-2 py-1.5 min-w-[140px]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										onClick: (e) => e.stopPropagation(),
										className: "relative",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PicklistField, {
											categoria: "Tipo de Tarefa",
											value: t.tipo_tarefa,
											onChange: (v) => onPatch(t.id, { tipo_tarefa: v || null }),
											placeholder: "Tipo",
											size: "sm"
										})
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-2 py-1.5",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "date",
										value: t.data_real ?? "",
										onChange: (e) => onPatch(t.id, { data_real: e.target.value || null }),
										className: "w-28 rounded border border-input bg-white px-1.5 py-1 text-[11px]"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-2 py-1.5",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
										value: t.prioridade ?? "Baixa",
										onChange: (e) => onPatch(t.id, { prioridade: e.target.value }),
										className: "w-full rounded border border-input bg-white px-1.5 py-1 text-[11px]",
										children: PRIORIDADES.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: p,
											children: p
										}, p))
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-2 py-1.5",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
										value: t.status ?? "Pendente",
										onChange: (e) => onPatch(t.id, { status: e.target.value }),
										className: "w-full rounded border border-input bg-white px-1.5 py-1 text-[11px]",
										children: STATUS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: s,
											children: s
										}, s))
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-2 py-1.5",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => onEdit(t.id),
											className: "rounded p-1 text-vibra-700 hover:bg-vibra-50",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "h-3 w-3" })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => onRemove(t.id),
											className: "rounded p-1 text-red-500 hover:bg-red-50",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3 w-3" })
										})]
									})
								})
							]
						}, t.id);
					}), tarefas.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						colSpan: 11,
						className: "py-6 text-center text-[12px] italic text-muted-foreground",
						children: "Nenhuma tarefa neste projeto. Clique em \"Nova Tarefa\"."
					}) })] })]
				})
			})
		]
	});
}
function Th({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
		className: "px-2 py-1.5 text-left text-[10px] font-bold uppercase tracking-wider",
		children
	});
}
function Mini({ label, value, color }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg border border-border bg-white p-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-[9.5px] font-bold uppercase tracking-wider text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: `text-[20px] font-extrabold ${color}`,
			children: value
		})]
	});
}
function TarefaDrawer({ id, initialProjetoId, iniciativas, allMicros, profiles, diretorias, onClose, onSaved }) {
	const qc = useQueryClient();
	const isNew = id === "new";
	const { values: perfis } = usePicklist("Perfil Vinculado");
	const [form, setForm] = (0, import_react.useState)({
		status: "Pendente",
		prioridade: "Baixa"
	});
	const [loading, setLoading] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (isNew) {
			setForm({
				status: "Pendente",
				prioridade: "Baixa"
			});
			return;
		}
		(async () => {
			const { data } = await supabase.from("tarefas").select("*").eq("id", id).maybeSingle();
			if (data) setForm(data);
		})();
	}, [id, isNew]);
	const iniciativasFiltradas = (0, import_react.useMemo)(() => {
		if (!initialProjetoId || !isNew) return iniciativas;
		return iniciativas.filter((i) => i.projeto_id === initialProjetoId);
	}, [
		iniciativas,
		initialProjetoId,
		isNew
	]);
	const { data: anexos = [] } = useQuery({
		queryKey: ["tarefa-anexos", id],
		enabled: !isNew,
		queryFn: async () => (await supabase.from("anexos").select("*").eq("tarefa_id", id).order("created_at", { ascending: false })).data ?? []
	});
	const microsDaIni = (0, import_react.useMemo)(() => {
		if (!form.iniciativa_id) return [];
		return allMicros.filter((m) => m.iniciativa_id === form.iniciativa_id);
	}, [form.iniciativa_id, allMicros]);
	function set(k, v) {
		setForm((f) => ({
			...f,
			[k]: v
		}));
	}
	async function uploadFile(file, tarefaId) {
		if (file.size > 10 * 1024 * 1024) return toast.error("Máx 10MB");
		const path = `tarefa/${tarefaId}/${Date.now()}_${file.name}`;
		const { error: upErr } = await supabase.storage.from("anexos").upload(path, file);
		if (upErr) return toast.error(upErr.message);
		const { data: { user } } = await supabase.auth.getUser();
		const { error } = await supabase.from("anexos").insert({
			tarefa_id: tarefaId,
			nome: file.name,
			url: path,
			tamanho_bytes: file.size,
			mime_type: file.type,
			uploaded_by: user?.id
		});
		if (error) toast.error(error.message);
		else {
			toast.success("Anexo enviado");
			qc.invalidateQueries({ queryKey: ["tarefa-anexos", tarefaId] });
		}
	}
	async function downloadAnexo(a) {
		const { data, error } = await supabase.storage.from("anexos").createSignedUrl(a.url, 60);
		if (error) return toast.error(error.message);
		window.open(data.signedUrl, "_blank");
	}
	async function removeAnexo(a) {
		await supabase.storage.from("anexos").remove([a.url]);
		await supabase.from("anexos").delete().eq("id", a.id);
		qc.invalidateQueries({ queryKey: ["tarefa-anexos", id] });
	}
	async function salvar(e) {
		e.preventDefault();
		if (!form.titulo?.trim()) return toast.error("Informe a Tarefa");
		if (form.microprocesso_id && !form.iniciativa_id) return toast.error("Selecione uma Iniciativa antes do Microprocesso.");
		setLoading(true);
		const payload = {
			titulo: form.titulo.trim(),
			responsavel_id: form.responsavel_id || null,
			diretoria: form.diretoria || null,
			data_fim_prevista: form.data_fim_prevista || null,
			status: form.status || "Pendente",
			prioridade: form.prioridade || "Baixa",
			iniciativa_id: form.iniciativa_id || null,
			microprocesso_id: form.microprocesso_id || null,
			observacoes: form.observacoes || null,
			tipo_tarefa: form.tipo_tarefa || null,
			data_real: form.data_real || null,
			nome_evento: form.nome_evento || null,
			horas_dedicadas: form.horas_dedicadas !== void 0 && form.horas_dedicadas !== "" && form.horas_dedicadas !== null ? Number(form.horas_dedicadas) : null,
			participantes: form.participantes || []
		};
		if (isNew) {
			const { data: { user } } = await supabase.auth.getUser();
			payload.created_by = user?.id;
			const { data: created, error } = await supabase.from("tarefas").insert(payload).select().single();
			setLoading(false);
			if (error) return toast.error(error.message);
			if (created) await syncTaskToAgenda(created);
			toast.success("Tarefa criada");
		} else {
			const { error } = await supabase.from("tarefas").update(payload).eq("id", id);
			setLoading(false);
			if (error) return toast.error(error.message);
			await syncTaskToAgenda({
				...payload,
				id
			});
			toast.success("Tarefa salva");
		}
		onSaved();
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-[120] flex justify-end bg-black/40",
		onClick: onClose,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: salvar,
			onClick: (e) => e.stopPropagation(),
			className: "h-full w-full max-w-md overflow-y-auto bg-white p-5 shadow-vibra",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-4 flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-[15px] font-bold text-vibra-800",
						children: isNew ? "Nova Tarefa" : "Editar Tarefa"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: onClose,
						className: "rounded p-1 text-muted-foreground hover:bg-muted",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Tarefa *",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: form.titulo ?? "",
						onChange: (e) => set("titulo", e.target.value),
						required: true,
						className: "input"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Responsável",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						value: form.responsavel_id ?? "",
						onChange: (e) => set("responsavel_id", e.target.value || null),
						className: "input",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							children: "— Selecione —"
						}), perfis.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: v.valor,
							children: v.valor
						}, v.id))]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
					label: "Diretoria",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: form.diretoria ?? "",
						onChange: (e) => set("diretoria", e.target.value),
						list: "dirs-drawer-list",
						className: "input"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("datalist", {
						id: "dirs-drawer-list",
						children: diretorias.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: d }, d))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Prazo",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "date",
						value: form.data_fim_prevista ?? "",
						onChange: (e) => set("data_fim_prevista", e.target.value),
						className: "input"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Criticidade",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						value: form.prioridade ?? "Baixa",
						onChange: (e) => set("prioridade", e.target.value),
						className: "input",
						children: PRIORIDADES.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: p,
							children: p
						}, p))
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Status",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						value: form.status ?? "Pendente",
						onChange: (e) => set("status", e.target.value),
						className: "input",
						children: STATUS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: s,
							children: s
						}, s))
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Tipo de Tarefa",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PicklistField, {
						categoria: "Tipo de Tarefa",
						value: form.tipo_tarefa,
						onChange: (v) => set("tipo_tarefa", v || null),
						placeholder: "Selecione o Tipo..."
					})
				}),
				form.tipo_tarefa === "Agenda" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Nome do Evento (para Agenda)",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: form.nome_evento ?? "",
						onChange: (e) => set("nome_evento", e.target.value),
						placeholder: "Ex: Reunião de Alinhamento",
						className: "input"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Data Real da Tarefa",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "date",
						value: form.data_real ?? "",
						onChange: (e) => set("data_real", e.target.value || null),
						className: "input"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Horas Dedicadas",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "number",
						step: "0.5",
						value: form.horas_dedicadas ?? "",
						onChange: (e) => set("horas_dedicadas", e.target.value === "" ? null : Number(e.target.value)),
						placeholder: "Ex: 2.5",
						className: "input"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Participantes",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PicklistField, {
							multi: true,
							categoria: "Participantes",
							value: Array.isArray(form.participantes) ? form.participantes : typeof form.participantes === "string" ? form.participantes.split(",").map((s) => s.trim()).filter(Boolean) : [],
							onChange: (v) => set("participantes", v),
							placeholder: "Selecione os participantes..."
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Iniciativa (obrigatória se houver Microprocesso)",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						value: form.iniciativa_id ?? "",
						onChange: (e) => {
							set("iniciativa_id", e.target.value || null);
							set("microprocesso_id", null);
						},
						className: "input",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							children: "— Tarefa avulsa —"
						}), iniciativasFiltradas.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: i.id,
							children: i.titulo
						}, i.id))]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Microprocesso (filtrado pela iniciativa)",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						value: form.microprocesso_id ?? "",
						onChange: (e) => set("microprocesso_id", e.target.value || null),
						disabled: !form.iniciativa_id,
						className: "input disabled:opacity-50 disabled:bg-muted",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							children: "— Nenhum —"
						}), microsDaIni.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: m.id,
							children: m.titulo
						}, m.id))]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Observações (campo livre)",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						rows: 3,
						value: form.observacoes ?? "",
						onChange: (e) => set("observacoes", e.target.value),
						className: "input resize-y"
					})
				}),
				!isNew && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 rounded-md border border-border bg-vibra-50/40 p-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mb-2 text-[11px] font-bold uppercase tracking-wider text-vibra-800",
							children: [
								"Anexos (",
								anexos.length,
								")"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex cursor-pointer items-center justify-center gap-2 rounded-md border border-dashed border-vibra-300 bg-white px-3 py-2 text-[11.5px] font-semibold text-vibra-700 hover:bg-vibra-50",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "h-3.5 w-3.5" }),
								" Enviar arquivo (máx 10MB)",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "file",
									hidden: true,
									onChange: (e) => e.target.files?.[0] && uploadFile(e.target.files[0], id)
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-2 space-y-1",
							children: [anexos.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between gap-2 rounded-md border border-border bg-white px-2 py-1.5 text-[11px]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => downloadAnexo(a),
									className: "flex min-w-0 items-center gap-1.5 text-left",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "h-3 w-3 text-vibra-700" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "truncate text-vibra-800 hover:underline",
										children: a.nome
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => removeAnexo(a),
									className: "text-destructive",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3 w-3" })
								})]
							}, a.id)), anexos.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10.5px] italic text-muted-foreground",
								children: "Nenhum anexo."
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex justify-end gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: onClose,
						className: "rounded-md px-3 py-1.5 text-[12px] font-semibold text-muted-foreground hover:bg-muted",
						children: "Cancelar"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "submit",
						disabled: loading,
						className: "rounded-md bg-vibra-700 px-3 py-1.5 text-[12px] font-bold text-white hover:bg-vibra-800 disabled:opacity-50",
						children: loading ? "Salvando…" : "Salvar"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", { children: `.input{width:100%;border:1px solid hsl(var(--input));background:#fff;padding:6px 8px;border-radius:6px;font-size:12.5px;outline:none;margin-bottom:8px}.input:focus{border-color:hsl(var(--vibra-600))}` })
			]
		})
	});
}
function Field({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "mb-2 block",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "block text-[10px] font-bold uppercase tracking-wider text-vibra-800",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-0.5",
			children
		})]
	});
}
function GestaoMudancaTab() {
	useQueryClient();
	const { projetoId } = useHierarchy();
	if (!projetoId) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col items-center justify-center p-12 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlidersVertical, { className: "h-12 w-12 text-slate-400 mb-4 animate-pulse" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "text-base font-bold text-slate-800",
				children: "Selecione um Projeto"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted-foreground max-w-sm mt-1",
				children: "Por favor, selecione um projeto no seletor do topo para gerenciar e registrar as ações de Gestão de Mudança."
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GestaoMudancaInner, { projetoId });
}
function GestaoMudancaInner({ projetoId }) {
	const qc = useQueryClient();
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [formProcess, setFormProcess] = (0, import_react.useState)({
		processo: "",
		repositorio: "",
		melhoria_procedimento: "",
		pessoas_treinadas: 0,
		tempo_capacitacao: 0,
		dependencia_chave: false,
		padronizacao: "Médio",
		status_mudanca: "Planejado"
	});
	const { data: processos = [], isLoading: isLoadingProc } = useQuery({
		queryKey: ["gestao_mudanca", projetoId],
		queryFn: async () => {
			const { data, error } = await supabase.from("gestao_mudanca").select("*").eq("projeto_id", projetoId).is("deleted_at", null);
			if (error) {
				console.error(error);
				return [];
			}
			return data ?? [];
		}
	});
	const { data: scorecard, isLoading: isLoadingScore } = useQuery({
		queryKey: ["scorecard_mudanca", projetoId],
		queryFn: async () => {
			const { data, error } = await supabase.from("scorecard_mudanca").select("*").eq("projeto_id", projetoId).maybeSingle();
			if (error) console.error(error);
			return data ?? {
				projeto_id: projetoId,
				score_cultural_asis: 2,
				score_cultural_tobe: 4,
				score_padronizacao_asis: 1,
				score_padronizacao_tobe: 5,
				score_estruturacao_asis: 2,
				score_estruturacao_tobe: 4,
				score_organizacao_asis: 2,
				score_organizacao_tobe: 5,
				detalhes_cultura: "",
				detalhes_padronizacao: "",
				detalhes_estruturacao: "",
				detalhes_organizacao: ""
			};
		}
	});
	const [scoreState, setScoreState] = (0, import_react.useState)(null);
	const activeScore = scoreState || scorecard;
	const handleScoreChange = (field, value) => {
		setScoreState({
			...activeScore || scorecard,
			[field]: value
		});
	};
	const handleSaveScorecard = async () => {
		setLoading(true);
		const payload = activeScore || scorecard;
		const { error } = await supabase.from("scorecard_mudanca").upsert({
			...payload,
			projeto_id: projetoId,
			id: payload.id || void 0
		});
		setLoading(false);
		if (error) toast.error("Erro ao salvar dados de fatos e gaps: " + error.message);
		else {
			toast.success("Indicadores de Gestão de Mudança salvos com sucesso!");
			qc.invalidateQueries({ queryKey: ["scorecard_mudanca", projetoId] });
			setScoreState(null);
		}
	};
	const handleAddProcess = async (e) => {
		e.preventDefault();
		if (!formProcess.processo.trim()) {
			toast.error("Por favor, informe o nome do processo.");
			return;
		}
		const calculatedHrs = Number(formProcess.pessoas_treinadas || 0) * Number(formProcess.tempo_capacitacao || 0);
		const { error } = await supabase.from("gestao_mudanca").insert({
			projeto_id: projetoId,
			processo: formProcess.processo.trim(),
			repositorio: formProcess.repositorio.trim(),
			melhoria_procedimento: formProcess.melhoria_procedimento.trim(),
			pessoas_treinadas: Number(formProcess.pessoas_treinadas || 0),
			tempo_capacitacao: Number(formProcess.tempo_capacitacao || 0),
			horas_economizadas: calculatedHrs,
			dependencia_chave: !!formProcess.dependencia_chave,
			padronizacao: formProcess.padronizacao,
			status_mudanca: formProcess.status_mudanca
		});
		if (error) toast.error("Erro ao registrar processo: " + error.message);
		else {
			toast.success("Processo procedimentado registrado com sucesso!");
			setFormProcess({
				processo: "",
				repositorio: "",
				melhoria_procedimento: "",
				pessoas_treinadas: 0,
				tempo_capacitacao: 0,
				dependencia_chave: false,
				padronizacao: "Médio",
				status_mudanca: "Planejado"
			});
			qc.invalidateQueries({ queryKey: ["gestao_mudanca", projetoId] });
		}
	};
	const handleDeleteProcess = async (id) => {
		if (!confirm("Tem certeza que deseja excluir este registro de procedimento?")) return;
		const { error } = await supabase.from("gestao_mudanca").update({ deleted_at: (/* @__PURE__ */ new Date()).toISOString() }).eq("id", id);
		if (error) toast.error("Erro ao excluir registro: " + error.message);
		else {
			toast.success("Registro excluído com sucesso.");
			qc.invalidateQueries({ queryKey: ["gestao_mudanca", projetoId] });
		}
	};
	const totalProcessos = processos.length;
	const totalPessoasTreinadas = processos.reduce((acc, p) => acc + Number(p.pessoas_treinadas || 0), 0);
	const totalHorasSalvas = processos.reduce((acc, p) => acc + Number(p.horas_economizadas || 0), 0);
	const totalDependenciasChave = processos.filter((p) => p.dependencia_chave).length;
	const gapChartData = [
		{
			name: "Cultura",
			"AS IS (Atual)": activeScore?.score_cultural_asis ?? 2,
			"TO BE (Desejado)": activeScore?.score_cultural_tobe ?? 4
		},
		{
			name: "Padronização",
			"AS IS (Atual)": activeScore?.score_padronizacao_asis ?? 1,
			"TO BE (Desejado)": activeScore?.score_padronizacao_tobe ?? 5
		},
		{
			name: "Estrutura",
			"AS IS (Atual)": activeScore?.score_estruturacao_asis ?? 2,
			"TO BE (Desejado)": activeScore?.score_estruturacao_tobe ?? 4
		},
		{
			name: "Organização",
			"AS IS (Atual)": activeScore?.score_organizacao_asis ?? 2,
			"TO BE (Desejado)": activeScore?.score_organizacao_tobe ?? 5
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-2xl border border-vibra-100 bg-gradient-to-r from-vibra-800 to-vibra-950 p-5 text-white shadow-vibra-md",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[10px] uppercase tracking-widest text-vibra-200 font-bold bg-white/10 px-2 py-0.5 rounded",
							children: "Módulo de Governança & Pessoas"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-[18px] font-black tracking-tight mt-1.5",
							children: "Gestão de Mudança Organizacional (CM)"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-vibra-100/80 mt-1",
							children: "Registre processos procedimentados, analise gaps culturais, reduza dependências de pessoas chave e aplique melhoria contínua estratégica."
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-center gap-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-white/10 p-2.5 rounded-xl border border-white/10 text-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] text-vibra-200 font-bold uppercase",
								children: "Horas Capacitação Economizadas"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-[18px] font-black text-yellow-300",
								children: [totalHorasSalvas.toFixed(1), "h/dia"]
							})]
						})
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border bg-card p-4 shadow-vibra-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10.5px] font-bold uppercase tracking-wider text-muted-foreground",
									children: "Processos Procedimentados"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "flex h-8 w-8 items-center justify-center rounded-lg bg-vibra-50 text-vibra-800",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "h-4 w-4" })
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2 text-[26px] font-black tracking-tight text-vibra-900",
								children: totalProcessos
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] text-muted-foreground mt-0.5",
								children: "Procedimentos ativos no repositório"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border bg-card p-4 shadow-vibra-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10.5px] font-bold uppercase tracking-wider text-muted-foreground",
									children: "Colaboradores Treinados"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-4 w-4" })
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2 text-[26px] font-black tracking-tight text-vibra-900",
								children: totalPessoasTreinadas
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] text-muted-foreground mt-0.5",
								children: "Pessoas capacitadas nos novos padrões"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border bg-card p-4 shadow-vibra-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10.5px] font-bold uppercase tracking-wider text-muted-foreground",
									children: "Dependência Pessoa Chave"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `flex h-8 w-8 items-center justify-center rounded-lg ${totalDependenciasChave > 0 ? "bg-amber-50 text-amber-600" : "bg-emerald-50 text-emerald-600"}`,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "h-4 w-4" })
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: `mt-2 text-[26px] font-black tracking-tight ${totalDependenciasChave > 0 ? "text-amber-600" : "text-emerald-700"}`,
								children: totalDependenciasChave
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] text-muted-foreground mt-0.5",
								children: "Gargalos operacionais críticos identificados"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border bg-card p-4 shadow-vibra-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10.5px] font-bold uppercase tracking-wider text-muted-foreground",
									children: "Média de Capacitação"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-4 w-4" })
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-2 text-[26px] font-black tracking-tight text-emerald-700",
								children: [totalProcessos > 0 ? (totalHorasSalvas / totalProcessos).toFixed(1) : "0.0", "h"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] text-muted-foreground mt-0.5",
								children: "Tempo médio de onboarding por processo"
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 lg:grid-cols-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "lg:col-span-2 space-y-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border bg-card p-4 shadow-vibra-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1.5 text-vibra-900 font-bold text-[13.5px] mb-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4 text-vibra-700" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Registrar Novo Processo Procedimentado" })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: handleAddProcess,
							className: "grid gap-3 sm:grid-cols-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block text-[11px] font-bold text-slate-700",
									children: "Nome do Processo *"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									placeholder: "Ex: Conciliação de Fretes Faturados",
									className: "mt-1 w-full rounded border border-input px-2 py-1.5 text-xs bg-white focus:outline-none focus:border-vibra-700",
									value: formProcess.processo,
									onChange: (e) => setFormProcess({
										...formProcess,
										processo: e.target.value
									}),
									required: true
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block text-[11px] font-bold text-slate-700",
									children: "Local do Repositório (Documento)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									placeholder: "Ex: SharePoint / OneDrive Link",
									className: "mt-1 w-full rounded border border-input px-2 py-1.5 text-xs bg-white focus:outline-none focus:border-vibra-700",
									value: formProcess.repositorio,
									onChange: (e) => setFormProcess({
										...formProcess,
										repositorio: e.target.value
									})
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "sm:col-span-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "block text-[11px] font-bold text-slate-700",
										children: "O que melhora com a procedimentação?"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
										placeholder: "Descreva os ganhos em mitigar erros, facilitar onboarding e unificar a operação.",
										rows: 2,
										className: "mt-1 w-full rounded border border-input px-2 py-1.5 text-xs bg-white focus:outline-none focus:border-vibra-700",
										value: formProcess.melhoria_procedimento,
										onChange: (e) => setFormProcess({
											...formProcess,
											melhoria_procedimento: e.target.value
										})
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block text-[11px] font-bold text-slate-700",
									children: "Nº de Pessoas Treinadas"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "number",
									placeholder: "0",
									className: "mt-1 w-full rounded border border-input px-2 py-1.5 text-xs bg-white focus:outline-none focus:border-vibra-700",
									value: formProcess.pessoas_treinadas || "",
									onChange: (e) => setFormProcess({
										...formProcess,
										pessoas_treinadas: Math.max(0, Number(e.target.value))
									})
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block text-[11px] font-bold text-slate-700",
									children: "Tempo de Capacitação (h/dia)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "number",
									step: "0.5",
									placeholder: "0",
									className: "mt-1 w-full rounded border border-input px-2 py-1.5 text-xs bg-white focus:outline-none focus:border-vibra-700",
									value: formProcess.tempo_capacitacao || "",
									onChange: (e) => setFormProcess({
										...formProcess,
										tempo_capacitacao: Math.max(0, Number(e.target.value))
									})
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block text-[11px] font-bold text-slate-700",
									children: "Padronização"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									className: "mt-1 w-full rounded border border-input px-2 py-1.5 text-xs bg-white focus:outline-none focus:border-vibra-700",
									value: formProcess.padronizacao,
									onChange: (e) => setFormProcess({
										...formProcess,
										padronizacao: e.target.value
									}),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "Baixo",
											children: "Baixo (Instruções Verbais)"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "Médio",
											children: "Médio (POP Criado)"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "Alto",
											children: "Alto (POP Publicado & Validado)"
										})
									]
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block text-[11px] font-bold text-slate-700",
									children: "Status"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									className: "mt-1 w-full rounded border border-input px-2 py-1.5 text-xs bg-white focus:outline-none focus:border-vibra-700",
									value: formProcess.status_mudanca,
									onChange: (e) => setFormProcess({
										...formProcess,
										status_mudanca: e.target.value
									}),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "Planejado",
											children: "Planejado"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "Em Criação",
											children: "Em Criação"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "Procedimentado",
											children: "Procedimentado"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "Concluido",
											children: "Concluido & Auditado"
										})
									]
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "sm:col-span-2 flex items-center justify-between border-t border-slate-100 pt-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "flex items-center gap-2 cursor-pointer",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "checkbox",
											className: "rounded border-input text-vibra-700 h-4 w-4",
											checked: formProcess.dependencia_chave,
											onChange: (e) => setFormProcess({
												...formProcess,
												dependencia_chave: e.target.checked
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[11.5px] font-bold text-slate-800",
											children: "Dependência de Pessoa Chave?"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[9.5px] text-muted-foreground",
											children: "Marque se o processo hoje depende criticamente de apenas 1 colaborador."
										})] })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "submit",
										className: "rounded-lg bg-vibra-700 px-4 py-2 text-[12px] font-bold text-white hover:bg-vibra-800 transition",
										children: "Registrar Processo"
									})]
								})
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border bg-card overflow-hidden shadow-vibra-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-4 border-b border-border bg-slate-50/50 flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-[13px] font-bold text-slate-900",
								children: "Processos Procedimentados Ativos"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] text-muted-foreground",
								children: "Relação de POPs e instruções de trabalho vinculadas a este projeto."
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "rounded bg-vibra-50 border border-vibra-100 px-2 py-0.5 text-[10px] font-bold text-vibra-700",
								children: [processos.length, " Registros"]
							})]
						}), processos.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "p-8 text-center text-muted-foreground text-[11.5px]",
							children: "Nenhum processo procedimentado registrado ainda. Use o formulário acima para adicionar o primeiro!"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "overflow-x-auto",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
								className: "w-full text-left border-collapse text-[11.5px]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "bg-slate-50 border-b border-border text-[10px] uppercase font-bold tracking-wider text-muted-foreground",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "p-3",
											children: "Processo"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "p-3",
											children: "Repositório"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "p-3",
											children: "Capacitação"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "p-3 text-right",
											children: "Horas Salvas"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "p-3 text-center",
											children: "Pessoa Chave"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "p-3",
											children: "Status"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "p-3 text-center",
											children: "Ações"
										})
									]
								}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
									className: "divide-y divide-border bg-white",
									children: processos.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
										className: "hover:bg-slate-50/50 transition",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
												className: "p-3",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "font-bold text-slate-900",
													children: p.processo
												}), p.melhoria_procedimento && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-[10px] text-muted-foreground max-w-[200px] truncate",
													title: p.melhoria_procedimento,
													children: p.melhoria_procedimento
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "p-3",
												children: p.repositorio ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
													href: p.repositorio.startsWith("http") ? p.repositorio : `https://${p.repositorio}`,
													target: "_blank",
													rel: "noreferrer",
													className: "inline-flex items-center gap-1 text-vibra-700 hover:underline font-bold",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, { className: "h-3 w-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Acessar" })]
												}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-slate-400",
													children: "—"
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
												className: "p-3 text-slate-700",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
													className: "font-medium",
													children: [p.pessoas_treinadas, " treinados"]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
													className: "text-[10px] text-muted-foreground",
													children: [p.tempo_capacitacao, " h/dia"]
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
												className: "p-3 text-right font-bold text-emerald-700",
												children: [Number(p.horas_economizadas || 0).toFixed(1), " h/dia"]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "p-3 text-center",
												children: p.dependencia_chave ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "inline-block rounded bg-red-50 border border-red-200 px-1.5 py-0.5 text-[9px] font-bold text-red-700",
													children: "Sim (Alto Risco)"
												}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "inline-block rounded bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 text-[9px] font-bold text-emerald-700",
													children: "Mitigado"
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "p-3",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: `inline-block rounded-full px-2 py-0.5 text-[9px] font-extrabold ${p.status_mudanca === "Concluido" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : p.status_mudanca === "Procedimentado" ? "bg-blue-50 text-blue-700 border border-blue-200" : "bg-slate-100 text-slate-700"}`,
													children: p.status_mudanca
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "p-3 text-center",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													onClick: () => handleDeleteProcess(p.id),
													className: "p-1 text-red-500 hover:bg-red-50 rounded transition",
													title: "Excluir",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" })
												})
											})
										]
									}, p.id))
								})]
							})
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border bg-card p-4 shadow-vibra-sm space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between border-b border-slate-100 pb-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-1.5 text-vibra-900 font-bold text-[13.5px]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "h-4.5 w-4.5 text-vibra-700" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "AS IS vs TO BE - Dados & Gaps" })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: handleSaveScorecard,
									disabled: loading,
									className: "inline-flex items-center gap-1 rounded bg-vibra-700 px-2 py-1 text-[11px] font-bold text-white hover:bg-vibra-800 disabled:opacity-50 transition",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "h-3 w-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: loading ? "Salvando..." : "Salvar" })]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] text-muted-foreground leading-relaxed",
								children: "Avalie o status de Gestão de Mudança nas 4 dimensões estratégicas abaixo. Defina a pontuação de 1 (Gargalo) a 5 (Excelente/Procedimentado)."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-3 pt-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "p-2.5 rounded bg-slate-50 border border-slate-100 space-y-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "flex justify-between items-center text-[11.5px] font-bold text-slate-800",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Cultura Organizacional" })
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "grid grid-cols-2 gap-3 text-[10.5px]",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
													className: "block text-slate-500 font-medium",
													children: "AS IS (Atual)"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
													className: "mt-1 w-full rounded border border-input px-1.5 py-1 text-xs bg-white",
													value: activeScore?.score_cultural_asis ?? 2,
													onChange: (e) => handleScoreChange("score_cultural_asis", Number(e.target.value)),
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
															value: 1,
															children: "1 - Total Silo/Resistência"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
															value: 2,
															children: "2 - Baixo Alinhamento"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
															value: 3,
															children: "3 - Consciência Parcial"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
															value: 4,
															children: "4 - Boa Acolhida/Engajado"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
															value: 5,
															children: "5 - Foco Total em Melhoria"
														})
													]
												})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
													className: "block text-slate-500 font-medium",
													children: "TO BE (Desejado)"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
													className: "mt-1 w-full rounded border border-input px-1.5 py-1 text-xs bg-white",
													value: activeScore?.score_cultural_tobe ?? 4,
													onChange: (e) => handleScoreChange("score_cultural_tobe", Number(e.target.value)),
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
															value: 1,
															children: "1 - Total Silo/Resistência"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
															value: 2,
															children: "2 - Baixo Alinhamento"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
															value: 3,
															children: "3 - Consciência Parcial"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
															value: 4,
															children: "4 - Boa Acolhida/Engajado"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
															value: 5,
															children: "5 - Foco Total em Melhoria"
														})
													]
												})] })]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "text",
												placeholder: "Observações sobre aspectos de cultura...",
												className: "w-full rounded border border-input px-2 py-1 text-[10px] bg-white focus:outline-none",
												value: activeScore?.detalhes_cultura ?? "",
												onChange: (e) => handleScoreChange("detalhes_cultura", e.target.value)
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "p-2.5 rounded bg-slate-50 border border-slate-100 space-y-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "flex justify-between items-center text-[11.5px] font-bold text-slate-800",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Padronização & Procedimentos" })
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "grid grid-cols-2 gap-3 text-[10.5px]",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
													className: "block text-slate-500 font-medium",
													children: "AS IS (Atual)"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
													className: "mt-1 w-full rounded border border-input px-1.5 py-1 text-xs bg-white",
													value: activeScore?.score_padronizacao_asis ?? 1,
													onChange: (e) => handleScoreChange("score_padronizacao_asis", Number(e.target.value)),
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
															value: 1,
															children: "1 - Zero POPs / Informal"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
															value: 2,
															children: "2 - Informações Dispersas"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
															value: 3,
															children: "3 - POPs Criados mas Desatualizados"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
															value: 4,
															children: "4 - Maioria Procedimentada"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
															value: 5,
															children: "5 - 100% POPs no Repositório"
														})
													]
												})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
													className: "block text-slate-500 font-medium",
													children: "TO BE (Desejado)"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
													className: "mt-1 w-full rounded border border-input px-1.5 py-1 text-xs bg-white",
													value: activeScore?.score_padronizacao_tobe ?? 5,
													onChange: (e) => handleScoreChange("score_padronizacao_tobe", Number(e.target.value)),
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
															value: 1,
															children: "1 - Zero POPs / Informal"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
															value: 2,
															children: "2 - Informações Dispersas"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
															value: 3,
															children: "3 - POPs Criados mas Desatualizados"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
															value: 4,
															children: "4 - Maioria Procedimentada"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
															value: 5,
															children: "5 - 100% POPs no Repositório"
														})
													]
												})] })]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "text",
												placeholder: "Observações sobre padronização...",
												className: "w-full rounded border border-input px-2 py-1 text-[10px] bg-white focus:outline-none",
												value: activeScore?.detalhes_padronizacao ?? "",
												onChange: (e) => handleScoreChange("detalhes_padronizacao", e.target.value)
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "p-2.5 rounded bg-slate-50 border border-slate-100 space-y-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "flex justify-between items-center text-[11.5px] font-bold text-slate-800",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Estruturação da Área" })
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "grid grid-cols-2 gap-3 text-[10.5px]",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
													className: "block text-slate-500 font-medium",
													children: "AS IS (Atual)"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
													className: "mt-1 w-full rounded border border-input px-1.5 py-1 text-xs bg-white",
													value: activeScore?.score_estruturacao_asis ?? 2,
													onChange: (e) => handleScoreChange("score_estruturacao_asis", Number(e.target.value)),
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
															value: 1,
															children: "1 - Área desestruturada"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
															value: 2,
															children: "2 - Papéis confusos"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
															value: 3,
															children: "3 - Divisão básica"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
															value: 4,
															children: "4 - Boa governança"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
															value: 5,
															children: "5 - Matriz de responsabilidade 100%"
														})
													]
												})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
													className: "block text-slate-500 font-medium",
													children: "TO BE (Desejado)"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
													className: "mt-1 w-full rounded border border-input px-1.5 py-1 text-xs bg-white",
													value: activeScore?.score_estruturacao_tobe ?? 4,
													onChange: (e) => handleScoreChange("score_estruturacao_tobe", Number(e.target.value)),
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
															value: 1,
															children: "1 - Área desestruturada"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
															value: 2,
															children: "2 - Papéis confusos"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
															value: 3,
															children: "3 - Divisão básica"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
															value: 4,
															children: "4 - Boa governança"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
															value: 5,
															children: "5 - Matriz de responsabilidade 100%"
														})
													]
												})] })]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "text",
												placeholder: "Observações sobre estrutura da área...",
												className: "w-full rounded border border-input px-2 py-1 text-[10px] bg-white focus:outline-none",
												value: activeScore?.detalhes_estruturacao ?? "",
												onChange: (e) => handleScoreChange("detalhes_estruturacao", e.target.value)
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "p-2.5 rounded bg-slate-50 border border-slate-100 space-y-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "flex justify-between items-center text-[11.5px] font-bold text-slate-800",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Organização das Equipes" })
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "grid grid-cols-2 gap-3 text-[10.5px]",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
													className: "block text-slate-500 font-medium",
													children: "AS IS (Atual)"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
													className: "mt-1 w-full rounded border border-input px-1.5 py-1 text-xs bg-white",
													value: activeScore?.score_organizacao_asis ?? 2,
													onChange: (e) => handleScoreChange("score_organizacao_asis", Number(e.target.value)),
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
															value: 1,
															children: "1 - Silos Severos / Sobrecarga"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
															value: 2,
															children: "2 - Atendimento reativo"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
															value: 3,
															children: "3 - Divisão funcional de tarefas"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
															value: 4,
															children: "4 - Squads / Equipes integradas"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
															value: 5,
															children: "5 - Co-autoria Lean fluida"
														})
													]
												})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
													className: "block text-slate-500 font-medium",
													children: "TO BE (Desejado)"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
													className: "mt-1 w-full rounded border border-input px-1.5 py-1 text-xs bg-white",
													value: activeScore?.score_organizacao_tobe ?? 5,
													onChange: (e) => handleScoreChange("score_organizacao_tobe", Number(e.target.value)),
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
															value: 1,
															children: "1 - Silos Severos / Sobrecarga"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
															value: 2,
															children: "2 - Atendimento reativo"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
															value: 3,
															children: "3 - Divisão funcional de tarefas"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
															value: 4,
															children: "4 - Squads / Equipes integradas"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
															value: 5,
															children: "5 - Co-autoria Lean fluida"
														})
													]
												})] })]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "text",
												placeholder: "Observações sobre organização de equipes...",
												className: "w-full rounded border border-input px-2 py-1 text-[10px] bg-white focus:outline-none",
												value: activeScore?.detalhes_organizacao ?? "",
												onChange: (e) => handleScoreChange("detalhes_organizacao", e.target.value)
											})
										]
									})
								]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border bg-card p-4 shadow-vibra-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
							className: "text-[12.5px] font-bold text-slate-900 mb-3 flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, { className: "h-4.5 w-4.5 text-emerald-600" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Gaps de Gestão de Mudança" })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-[210px] w-full",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
								width: "100%",
								height: "100%",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
									data: gapChartData,
									margin: {
										left: -20,
										bottom: -5
									},
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
											strokeDasharray: "3 3",
											stroke: "#f0f0f0"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
											dataKey: "name",
											tick: { fontSize: 10 }
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
											domain: [0, 5],
											ticks: [
												1,
												2,
												3,
												4,
												5
											],
											tick: { fontSize: 10 }
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, { wrapperStyle: { fontSize: 10 } }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
											dataKey: "AS IS (Atual)",
											fill: "#f43f5e",
											radius: [
												4,
												4,
												0,
												0
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
											dataKey: "TO BE (Desejado)",
											fill: "#10b981",
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
				})]
			})
		]
	});
}
var TABS = [
	{
		id: "meudia",
		label: "Meu Dia"
	},
	{
		id: "dashboard",
		label: "Visão Executiva"
	},
	{
		id: "iniciativas",
		label: "Iniciativas"
	},
	{
		id: "equipe",
		label: "Stakeholders"
	},
	{
		id: "ganhos",
		label: "Metas"
	},
	{
		id: "mudanca",
		label: "Gestão de Mudança"
	},
	{
		id: "relatorios",
		label: "Relatórios"
	},
	{
		id: "tarefas",
		label: "Tarefas"
	},
	{
		id: "mc3",
		label: "MC³| Motivação Contínua🚀"
	}
];
function ExecutivoPage() {
	const [tab, setTab] = (0, import_react.useState)("meudia");
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
	const visibleTabs = TABS.filter((t) => hasPermission(`aba_executivo_${t.id}`, true));
	const currentTab = visibleTabs.some((t) => t.id === tab) ? tab : visibleTabs[0]?.id ?? "meudia";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		moduleId: "executivo",
		tabs: TABS,
		activeTab: currentTab,
		onTabChange: setTab,
		children: [
			currentTab === "meudia" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MeuDiaTab, {}),
			currentTab === "dashboard" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardTab, {}),
			currentTab === "iniciativas" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IniciativasTab, {}),
			currentTab === "equipe" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EquipeTab, {}),
			currentTab === "ganhos" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GanhosTab, {}),
			currentTab === "mudanca" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GestaoMudancaTab, {}),
			currentTab === "relatorios" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RelatoriosTab, {}),
			currentTab === "tarefas" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TarefasTab, {}),
			currentTab === "mc3" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MC3Tab, {})
		]
	});
}
//#endregion
export { ExecutivoPage as component };
