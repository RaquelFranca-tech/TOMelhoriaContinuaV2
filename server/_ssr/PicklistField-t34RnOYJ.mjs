import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { D as Settings2, Gt as Check, L as Pencil, P as Plus, Wt as ChevronDown, n as X, p as Trash2 } from "../_libs/lucide-react.mjs";
import { n as cn } from "./useConfirm-Dt9lkcKc.mjs";
import { c as usePicklist } from "./usePicklist-vc052UFE.mjs";
import { i as Trigger, n as Portal, r as Root2, t as Content2 } from "../_libs/@radix-ui/react-popover+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/PicklistField-t34RnOYJ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var VIBRA = {
	greenDark: "#044317",
	green: "#268200",
	orange: "#FF6900",
	yellow: "#FEDC00",
	blue: "#0000FF",
	greenSoft: "#a9c78e",
	yellowSoft: "#fced96",
	blueSoft: "#75a7d2"
};
var VIBRA_SERIES = [
	VIBRA.green,
	VIBRA.orange,
	VIBRA.blue,
	VIBRA.yellow,
	VIBRA.greenDark,
	VIBRA.greenSoft,
	VIBRA.blueSoft,
	VIBRA.yellowSoft
];
function colorForId(id) {
	if (!id) return VIBRA.greenSoft;
	let h = 0;
	for (let i = 0; i < id.length; i++) h = h * 31 + id.charCodeAt(i) >>> 0;
	return VIBRA_SERIES[h % VIBRA_SERIES.length];
}
function prazoStatus(dataFimPrevista, status) {
	if (status && /conclu/i.test(status)) return "no_prazo";
	if (!dataFimPrevista) return "sem_data";
	const today = /* @__PURE__ */ new Date();
	const fim = new Date(dataFimPrevista);
	const diff = Math.floor((fim.getTime() - today.getTime()) / (1e3 * 60 * 60 * 24));
	if (diff < 0) return "atrasada";
	if (diff <= 7) return "alerta";
	return "no_prazo";
}
function prazoBadge(s) {
	switch (s) {
		case "no_prazo": return {
			label: "✅ No prazo",
			cls: "bg-emerald-100 text-emerald-800"
		};
		case "alerta": return {
			label: "⚠ Alerta",
			cls: "bg-amber-100 text-amber-800"
		};
		case "atrasada": return {
			label: "❌ Atrasada",
			cls: "bg-red-100 text-red-700"
		};
		default: return {
			label: "— Sem data",
			cls: "bg-slate-100 text-slate-600"
		};
	}
}
var Popover = Root2;
var PopoverTrigger = Trigger;
var PopoverContent = import_react.forwardRef(({ className, align = "center", sideOffset = 4, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
	ref,
	align,
	sideOffset,
	className: cn("z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-popover-content-transform-origin)", className),
	...props
}) }));
PopoverContent.displayName = Content2.displayName;
var FormContext = (0, import_react.createContext)({ disabled: false });
var useFormContext = () => (0, import_react.useContext)(FormContext);
function PicklistField(props) {
	const formContext = useFormContext();
	const { categoria, size = "md", disabled = props.disabled || formContext.disabled } = props;
	const { values, add, remove, rename } = usePicklist(categoria);
	const [manage, setManage] = (0, import_react.useState)(false);
	const [selectOpen, setSelectOpen] = (0, import_react.useState)(false);
	const [newVal, setNewVal] = (0, import_react.useState)("");
	const [editing, setEditing] = (0, import_react.useState)(null);
	const [search, setSearch] = (0, import_react.useState)("");
	const isSm = size === "sm";
	const filteredValues = (0, import_react.useMemo)(() => {
		return values.filter((v) => v.valor.toLowerCase().includes(search.toLowerCase()));
	}, [values, search]);
	const hasExactMatch = (0, import_react.useMemo)(() => {
		const normalized = search.trim().toLowerCase();
		return values.some((v) => v.valor.toLowerCase() === normalized);
	}, [values, search]);
	const handleAddInline = async () => {
		const val = search.trim();
		if (!val) return;
		try {
			await add.mutateAsync(val);
			if (props.multi) {
				const arr = Array.isArray(props.value) ? props.value : [];
				if (!arr.includes(val)) props.onChange([...arr, val]);
			} else props.onChange(val);
			setSearch("");
		} catch (err) {
			console.error("Erro ao cadastrar opção inline:", err);
		}
	};
	const handleMultiSelect = (val) => {
		if (props.multi) {
			const arr = Array.isArray(props.value) ? props.value : [];
			if (arr.includes(val)) props.onChange(arr.filter((item) => item !== val));
			else props.onChange([...arr, val]);
		}
	};
	const selectedValues = props.multi ? Array.isArray(props.value) ? props.value : [] : [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex w-full items-center gap-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex-1 min-w-0",
			children: props.multi ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Popover, {
				open: selectOpen,
				onOpenChange: setSelectOpen,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverTrigger, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						disabled,
						className: `flex w-full items-center justify-between rounded-md border border-[#DBDBDB] bg-white px-3 text-left shadow-sm outline-none transition focus:border-[#268200] focus:ring-1 focus:ring-[#268200] ${isSm ? "h-7 text-[11px]" : "h-9 text-[12.5px]"} ${disabled ? "bg-neutral-50 opacity-60 cursor-not-allowed" : ""}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "truncate text-slate-700 font-medium",
							children: selectedValues.length > 0 ? selectedValues.join(", ") : props.placeholder ?? "Selecione..."
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4 shrink-0 text-slate-400" })]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PopoverContent, {
					className: "w-72 p-2 bg-white border border-[#DBDBDB] shadow-lg rounded-lg z-50",
					align: "start",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-1.5 text-[10px] font-extrabold uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-1 flex justify-between items-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								categoria,
								" (",
								selectedValues.length,
								" selecionados)"
							] }), selectedValues.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: (e) => {
									e.stopPropagation();
									props.onChange([]);
								},
								className: "text-red-500 hover:text-red-700 text-[10px]",
								children: "Limpar tudo"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-2 flex gap-1 px-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								placeholder: "Pesquisar / Cadastrar...",
								value: search,
								onChange: (e) => setSearch(e.target.value),
								className: "h-7 flex-1 rounded border border-[#DBDBDB] px-1.5 text-[11px] outline-none focus:border-[#268200]",
								onKeyDown: (e) => {
									if (e.key === "Enter" && search.trim()) {
										e.preventDefault();
										e.stopPropagation();
										handleAddInline();
									}
								}
							}), !hasExactMatch && search.trim() && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: (e) => {
									e.preventDefault();
									e.stopPropagation();
									handleAddInline();
								},
								className: "inline-flex h-7 items-center justify-center rounded bg-[#268200] px-2 text-[11px] font-bold text-white hover:bg-[#044317]",
								title: "Adicionar",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3 w-3" })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "max-h-56 space-y-0.5 overflow-y-auto",
							children: [filteredValues.map((v) => {
								const isSelected = selectedValues.includes(v.valor);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									onClick: (e) => {
										e.stopPropagation();
										handleMultiSelect(v.valor);
									},
									className: `flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-[#268200]/5 cursor-pointer text-[12px] font-medium transition ${isSelected ? "text-[#268200] bg-[#268200]/5" : "text-slate-700"}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "checkbox",
										checked: isSelected,
										readOnly: true,
										className: "h-3.5 w-3.5 rounded border-[#DBDBDB] text-[#268200] focus:ring-[#268200]"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "truncate",
										children: v.valor
									})]
								}, v.id);
							}), filteredValues.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "p-2 text-[11px] text-slate-400 italic",
								children: "Nenhuma opção correspondente."
							})]
						})
					]
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Popover, {
				open: selectOpen,
				onOpenChange: setSelectOpen,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverTrigger, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						disabled,
						className: `flex w-full items-center justify-between rounded-md border border-[#DBDBDB] bg-white px-3 text-left shadow-sm outline-none transition focus:border-[#268200] focus:ring-1 focus:ring-[#268200] ${isSm ? "h-7 text-[11px]" : "h-9 text-[12.5px]"} ${disabled ? "bg-neutral-50 opacity-60 cursor-not-allowed" : ""}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "truncate text-slate-700 font-medium",
							children: props.value ? props.value : props.placeholder ?? "Selecione..."
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4 shrink-0 text-slate-400" })]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PopoverContent, {
					className: "w-72 p-2 bg-white border border-[#DBDBDB] shadow-lg rounded-lg z-50",
					align: "start",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-1.5 text-[10px] font-extrabold uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-1 flex justify-between items-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: categoria }), props.value && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: (e) => {
									e.stopPropagation();
									props.onChange("");
									setSelectOpen(false);
								},
								className: "text-red-500 hover:text-red-700 text-[10px]",
								children: "Limpar"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-2 flex gap-1 px-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								placeholder: "Pesquisar / Cadastrar...",
								value: search,
								onChange: (e) => setSearch(e.target.value),
								className: "h-7 flex-1 rounded border border-[#DBDBDB] px-1.5 text-[11px] outline-none focus:border-[#268200]",
								onKeyDown: (e) => {
									if (e.key === "Enter" && search.trim()) {
										e.preventDefault();
										e.stopPropagation();
										handleAddInline();
										setSelectOpen(false);
									}
								}
							}), !hasExactMatch && search.trim() && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: (e) => {
									e.preventDefault();
									e.stopPropagation();
									handleAddInline();
									setSelectOpen(false);
								},
								className: "inline-flex h-7 items-center justify-center rounded bg-[#268200] px-2 text-[11px] font-bold text-white hover:bg-[#044317]",
								title: "Adicionar",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3 w-3" })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "max-h-56 space-y-0.5 overflow-y-auto",
							children: [filteredValues.map((v) => {
								const isSelected = props.value === v.valor;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									onClick: (e) => {
										e.stopPropagation();
										props.onChange(v.valor);
										setSelectOpen(false);
										setSearch("");
									},
									className: `flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-[#268200]/5 cursor-pointer text-[12px] font-medium transition ${isSelected ? "text-[#268200] bg-[#268200]/5" : "text-slate-700"}`,
									children: [isSelected && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3.5 w-3.5 text-[#268200]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "truncate",
										children: v.valor
									})]
								}, v.id);
							}), filteredValues.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "p-2 text-[11px] text-slate-400 italic",
								children: "Nenhuma opção correspondente."
							})]
						})
					]
				})]
			})
		}), !disabled && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Popover, {
			open: manage,
			onOpenChange: setManage,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverTrigger, {
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: `inline-flex items-center justify-center rounded-md border border-[#DBDBDB] bg-white text-[#268200] hover:bg-neutral-50 shadow-sm shrink-0 transition ${isSm ? "h-7 w-7" : "h-9 w-9"}`,
					title: "Gerenciar opções desta picklist",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings2, { className: "h-4 w-4" })
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PopoverContent, {
				className: "w-72 p-2 bg-white border border-[#DBDBDB] shadow-lg rounded-lg z-50",
				align: "end",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-2 text-[11px] font-extrabold uppercase tracking-wider text-[#268200]",
						children: categoria
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-2 flex gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: newVal,
							onChange: (e) => setNewVal(e.target.value),
							placeholder: "Nova opção...",
							className: "h-8 flex-1 rounded-md border border-[#DBDBDB] px-2 text-[12px] outline-none focus:border-[#268200]",
							onKeyDown: (e) => {
								if (e.key === "Enter" && newVal.trim()) {
									add.mutate(newVal.trim());
									setNewVal("");
								}
							}
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => {
								if (newVal.trim()) {
									add.mutate(newVal.trim());
									setNewVal("");
								}
							},
							className: "inline-flex h-8 items-center gap-1 rounded-md bg-[#268200] px-2 text-[11.5px] font-bold text-white hover:bg-[#044317] transition",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3 w-3" }), " Add"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "max-h-56 space-y-1 overflow-auto pr-1",
						children: [values.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "flex items-center gap-1 rounded-md border border-[#DBDBDB] px-2 py-1 bg-white",
							children: editing?.id === v.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: editing.valor,
									onChange: (e) => setEditing({
										id: v.id,
										valor: e.target.value
									}),
									className: "h-6 flex-1 rounded border border-[#DBDBDB] px-1 text-[12px] outline-none focus:border-[#268200]",
									onKeyDown: (e) => {
										if (e.key === "Enter" && editing.valor.trim()) {
											rename.mutate({
												id: v.id,
												valor: editing.valor.trim()
											});
											setEditing(null);
										}
									}
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => {
										if (editing.valor.trim()) {
											rename.mutate({
												id: v.id,
												valor: editing.valor.trim()
											});
											setEditing(null);
										}
									},
									className: "text-[#268200] p-1 hover:bg-[#268200]/5 rounded",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3.5 w-3.5" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setEditing(null),
									className: "text-slate-500 p-1 hover:bg-slate-100 rounded",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-3.5 w-3.5" })
								})
							] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "flex-1 text-[12px] text-slate-700 truncate",
									children: v.valor
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setEditing({
										id: v.id,
										valor: v.valor
									}),
									className: "text-[#268200] p-1 hover:bg-[#268200]/5 rounded transition",
									title: "Renomear",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "h-3.5 w-3.5" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => {
										if (confirm(`Deseja realmente remover a opção "${v.valor}"?`)) remove.mutate(v.id);
									},
									className: "text-red-600 p-1 hover:bg-red-50 rounded transition",
									title: "Excluir",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" })
								})
							] })
						}, v.id)), values.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "px-2 py-1 text-[11.5px] text-slate-400 italic",
							children: "Nenhuma opção cadastrada."
						})]
					})
				]
			})]
		})]
	});
}
//#endregion
export { prazoBadge as a, colorForId as i, VIBRA as n, prazoStatus as o, VIBRA_SERIES as r, PicklistField as t };
