import { useState, useMemo } from "react";
import { usePicklist } from "@/hooks/usePicklist";
import { Check, Pencil, Plus, Settings2, Trash2, X, ChevronDown } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useFormContext } from "@/components/FormContext";

type Props = {
  categoria: string;
  value: string | null | undefined;
  onChange: (v: string) => void;
  multi?: false;
  placeholder?: string;
  size?: "sm" | "md";
  disabled?: boolean;
};

type MultiProps = {
  categoria: string;
  value: string[];
  onChange: (v: string[]) => void;
  multi: true;
  placeholder?: string;
  size?: "sm" | "md";
  disabled?: boolean;
};

export function PicklistField(props: Props | MultiProps) {
  const formContext = useFormContext();
  const { categoria, size = "md", disabled = props.disabled || formContext.disabled } = props;
  const { values, add, remove, rename } = usePicklist(categoria);
  const [manage, setManage] = useState(false);
  const [selectOpen, setSelectOpen] = useState(false);
  const [newVal, setNewVal] = useState("");
  const [editing, setEditing] = useState<{ id: string; valor: string } | null>(null);
  const [search, setSearch] = useState("");

  const isSm = size === "sm";

  // Filter values based on search
  const filteredValues = useMemo(() => {
    return values.filter((v) => v.valor.toLowerCase().includes(search.toLowerCase()));
  }, [values, search]);

  // Check if search query has exact match
  const hasExactMatch = useMemo(() => {
    const normalized = search.trim().toLowerCase();
    return values.some((v) => v.valor.toLowerCase() === normalized);
  }, [values, search]);

  // Handle inline adding of option
  const handleAddInline = async () => {
    const val = search.trim();
    if (!val) return;
    try {
      await add.mutateAsync(val);
      if (props.multi) {
        const arr = Array.isArray(props.value) ? props.value : [];
        if (!arr.includes(val)) {
          props.onChange([...arr, val]);
        }
      } else {
        props.onChange(val);
      }
      setSearch("");
    } catch (err) {
      console.error("Erro ao cadastrar opção inline:", err);
    }
  };

  // Handle multi-select selection toggle
  const handleMultiSelect = (val: string) => {
    if (props.multi) {
      const arr = Array.isArray(props.value) ? props.value : [];
      if (arr.includes(val)) {
        props.onChange(arr.filter((item) => item !== val));
      } else {
        props.onChange([...arr, val]);
      }
    }
  };

  const selectedValues = props.multi ? (Array.isArray(props.value) ? props.value : []) : [];

  return (
    <div className="flex w-full items-center gap-1.5">
      <div className="flex-1 min-w-0">
        {props.multi ? (
          // Multi Select using a beautiful Dropdown Popover with Inline Add & Search
          <Popover open={selectOpen} onOpenChange={setSelectOpen}>
            <PopoverTrigger asChild>
              <button
                type="button"
                disabled={disabled}
                className={`flex w-full items-center justify-between rounded-md border border-[#DBDBDB] bg-white px-3 text-left shadow-sm outline-none transition focus:border-[#268200] focus:ring-1 focus:ring-[#268200] ${
                  isSm ? "h-7 text-[11px]" : "h-9 text-[12.5px]"
                } ${disabled ? "bg-neutral-50 opacity-60 cursor-not-allowed" : ""}`}
              >
                <span className="truncate text-slate-700 font-medium">
                  {selectedValues.length > 0
                    ? selectedValues.join(", ")
                    : (props.placeholder ?? "Selecione...")}
                </span>
                <ChevronDown className="h-4 w-4 shrink-0 text-slate-400" />
              </button>
            </PopoverTrigger>
            <PopoverContent
              className="w-72 p-2 bg-white border border-[#DBDBDB] shadow-lg rounded-lg z-50"
              align="start"
            >
              <div className="mb-1.5 text-[10px] font-extrabold uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-1 flex justify-between items-center">
                <span>
                  {categoria} ({selectedValues.length} selecionados)
                </span>
                {selectedValues.length > 0 && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      props.onChange([]);
                    }}
                    className="text-red-500 hover:text-red-700 text-[10px]"
                  >
                    Limpar tudo
                  </button>
                )}
              </div>

              {/* Inline Search & Add */}
              <div className="mb-2 flex gap-1 px-1">
                <input
                  type="text"
                  placeholder="Pesquisar / Cadastrar..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="h-7 flex-1 rounded border border-[#DBDBDB] px-1.5 text-[11px] outline-none focus:border-[#268200]"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && search.trim()) {
                      e.preventDefault();
                      e.stopPropagation();
                      handleAddInline();
                    }
                  }}
                />
                {!hasExactMatch && search.trim() && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleAddInline();
                    }}
                    className="inline-flex h-7 items-center justify-center rounded bg-[#268200] px-2 text-[11px] font-bold text-white hover:bg-[#044317]"
                    title="Adicionar"
                  >
                    <Plus className="h-3 w-3" />
                  </button>
                )}
              </div>

              <div className="max-h-56 space-y-0.5 overflow-y-auto">
                {filteredValues.map((v) => {
                  const isSelected = selectedValues.includes(v.valor);
                  return (
                    <div
                      key={v.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMultiSelect(v.valor);
                      }}
                      className={`flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-[#268200]/5 cursor-pointer text-[12px] font-medium transition ${
                        isSelected ? "text-[#268200] bg-[#268200]/5" : "text-slate-700"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isSelected}
                        readOnly
                        className="h-3.5 w-3.5 rounded border-[#DBDBDB] text-[#268200] focus:ring-[#268200]"
                      />
                      <span className="truncate">{v.valor}</span>
                    </div>
                  );
                })}
                {filteredValues.length === 0 && (
                  <p className="p-2 text-[11px] text-slate-400 italic">
                    Nenhuma opção correspondente.
                  </p>
                )}
              </div>
            </PopoverContent>
          </Popover>
        ) : (
          // Single Select Dropdown with Search and Inline Add
          <Popover open={selectOpen} onOpenChange={setSelectOpen}>
            <PopoverTrigger asChild>
              <button
                type="button"
                disabled={disabled}
                className={`flex w-full items-center justify-between rounded-md border border-[#DBDBDB] bg-white px-3 text-left shadow-sm outline-none transition focus:border-[#268200] focus:ring-1 focus:ring-[#268200] ${
                  isSm ? "h-7 text-[11px]" : "h-9 text-[12.5px]"
                } ${disabled ? "bg-neutral-50 opacity-60 cursor-not-allowed" : ""}`}
              >
                <span className="truncate text-slate-700 font-medium">
                  {props.value ? props.value : (props.placeholder ?? "Selecione...")}
                </span>
                <ChevronDown className="h-4 w-4 shrink-0 text-slate-400" />
              </button>
            </PopoverTrigger>
            <PopoverContent
              className="w-72 p-2 bg-white border border-[#DBDBDB] shadow-lg rounded-lg z-50"
              align="start"
            >
              <div className="mb-1.5 text-[10px] font-extrabold uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-1 flex justify-between items-center">
                <span>{categoria}</span>
                {props.value && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      props.onChange("");
                      setSelectOpen(false);
                    }}
                    className="text-red-500 hover:text-red-700 text-[10px]"
                  >
                    Limpar
                  </button>
                )}
              </div>

              {/* Inline Search & Add */}
              <div className="mb-2 flex gap-1 px-1">
                <input
                  type="text"
                  placeholder="Pesquisar / Cadastrar..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="h-7 flex-1 rounded border border-[#DBDBDB] px-1.5 text-[11px] outline-none focus:border-[#268200]"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && search.trim()) {
                      e.preventDefault();
                      e.stopPropagation();
                      handleAddInline();
                      setSelectOpen(false);
                    }
                  }}
                />
                {!hasExactMatch && search.trim() && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleAddInline();
                      setSelectOpen(false);
                    }}
                    className="inline-flex h-7 items-center justify-center rounded bg-[#268200] px-2 text-[11px] font-bold text-white hover:bg-[#044317]"
                    title="Adicionar"
                  >
                    <Plus className="h-3 w-3" />
                  </button>
                )}
              </div>

              <div className="max-h-56 space-y-0.5 overflow-y-auto">
                {filteredValues.map((v) => {
                  const isSelected = props.value === v.valor;
                  return (
                    <div
                      key={v.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        props.onChange(v.valor);
                        setSelectOpen(false);
                        setSearch("");
                      }}
                      className={`flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-[#268200]/5 cursor-pointer text-[12px] font-medium transition ${
                        isSelected ? "text-[#268200] bg-[#268200]/5" : "text-slate-700"
                      }`}
                    >
                      {isSelected && <Check className="h-3.5 w-3.5 text-[#268200]" />}
                      <span className="truncate">{v.valor}</span>
                    </div>
                  );
                })}
                {filteredValues.length === 0 && (
                  <p className="p-2 text-[11px] text-slate-400 italic">
                    Nenhuma opção correspondente.
                  </p>
                )}
              </div>
            </PopoverContent>
          </Popover>
        )}
      </div>

      {/* Inline Options Management Resource */}
      {!disabled && (
        <Popover open={manage} onOpenChange={setManage}>
          <PopoverTrigger asChild>
            <button
              type="button"
              className={`inline-flex items-center justify-center rounded-md border border-[#DBDBDB] bg-white text-[#268200] hover:bg-neutral-50 shadow-sm shrink-0 transition ${
                isSm ? "h-7 w-7" : "h-9 w-9"
              }`}
              title="Gerenciar opções desta picklist"
            >
              <Settings2 className="h-4 w-4" />
            </button>
          </PopoverTrigger>
          <PopoverContent
            className="w-72 p-2 bg-white border border-[#DBDBDB] shadow-lg rounded-lg z-50"
            align="end"
          >
            <div className="mb-2 text-[11px] font-extrabold uppercase tracking-wider text-[#268200]">
              {categoria}
            </div>
            <div className="mb-2 flex gap-1">
              <input
                value={newVal}
                onChange={(e) => setNewVal(e.target.value)}
                placeholder="Nova opção..."
                className="h-8 flex-1 rounded-md border border-[#DBDBDB] px-2 text-[12px] outline-none focus:border-[#268200]"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && newVal.trim()) {
                    add.mutate(newVal.trim());
                    setNewVal("");
                  }
                }}
              />
              <button
                type="button"
                onClick={() => {
                  if (newVal.trim()) {
                    add.mutate(newVal.trim());
                    setNewVal("");
                  }
                }}
                className="inline-flex h-8 items-center gap-1 rounded-md bg-[#268200] px-2 text-[11.5px] font-bold text-white hover:bg-[#044317] transition"
              >
                <Plus className="h-3 w-3" /> Add
              </button>
            </div>
            <ul className="max-h-56 space-y-1 overflow-auto pr-1">
              {values.map((v) => (
                <li
                  key={v.id}
                  className="flex items-center gap-1 rounded-md border border-[#DBDBDB] px-2 py-1 bg-white"
                >
                  {editing?.id === v.id ? (
                    <>
                      <input
                        value={editing.valor}
                        onChange={(e) => setEditing({ id: v.id, valor: e.target.value })}
                        className="h-6 flex-1 rounded border border-[#DBDBDB] px-1 text-[12px] outline-none focus:border-[#268200]"
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && editing.valor.trim()) {
                            rename.mutate({ id: v.id, valor: editing.valor.trim() });
                            setEditing(null);
                          }
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (editing.valor.trim()) {
                            rename.mutate({ id: v.id, valor: editing.valor.trim() });
                            setEditing(null);
                          }
                        }}
                        className="text-[#268200] p-1 hover:bg-[#268200]/5 rounded"
                      >
                        <Check className="h-3.5 w-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditing(null)}
                        className="text-slate-500 p-1 hover:bg-slate-100 rounded"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </>
                  ) : (
                    <>
                      <span className="flex-1 text-[12px] text-slate-700 truncate">{v.valor}</span>
                      <button
                        type="button"
                        onClick={() => setEditing({ id: v.id, valor: v.valor })}
                        className="text-[#268200] p-1 hover:bg-[#268200]/5 rounded transition"
                        title="Renomear"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (confirm(`Deseja realmente remover a opção "${v.valor}"?`)) {
                            remove.mutate(v.id);
                          }
                        }}
                        className="text-red-600 p-1 hover:bg-red-50 rounded transition"
                        title="Excluir"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </>
                  )}
                </li>
              ))}
              {values.length === 0 && (
                <li className="px-2 py-1 text-[11.5px] text-slate-400 italic">
                  Nenhuma opção cadastrada.
                </li>
              )}
            </ul>
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
}
