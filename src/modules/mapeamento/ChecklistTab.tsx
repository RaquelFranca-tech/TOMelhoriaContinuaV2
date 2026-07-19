import { useState, useEffect } from "react";
import { useHierarchy } from "@/stores/hierarchy";
import { CheckSquare, Square, ClipboardCheck, Info, RotateCcw } from "lucide-react";
import { toast } from "sonner";

interface ChecklistItem {
  id: string;
  category: string;
  title: string;
  description: string;
}

const CHECKLIST_ITEMS: ChecklistItem[] = [
  {
    id: "step1_1",
    category: "1. Alinhamento & Setup",
    title: "Definição do Sponsor e Stakeholders",
    description: "Identificar os patrocinadores e os principais tomadores de decisão do processo.",
  },
  {
    id: "step1_2",
    category: "1. Alinhamento & Setup",
    title: "Reunião de Kick-off",
    description: "Realizar o alinhamento inicial com a equipe executora para alinhar objetivos.",
  },
  {
    id: "step2_1",
    category: "2. Mapeamento AS IS",
    title: "Entrevistas com Especialistas",
    description: "Entrevistar quem executa o processo para entender o fluxo de trabalho atual.",
  },
  {
    id: "step2_2",
    category: "2. Mapeamento AS IS",
    title: "Identificação e Registro de Dores (Desperdícios)",
    description: "Registrar sistemas legados, planilhas paralelas, retrabalho e gargalos.",
  },
  {
    id: "step3_1",
    category: "3. Desenho & Modelagem",
    title: "Desenho do Fluxo AS IS",
    description: "Criar o fluxo rascunho ou diagrama BPMN representando o cenário atual.",
  },
  {
    id: "step3_2",
    category: "3. Desenho & Modelagem",
    title: "Estruturação de SIPOC",
    description: "Mapear fornecedores, entradas, macro-passos, saídas e clientes do processo.",
  },
  {
    id: "step4_1",
    category: "4. Engenharia TO BE",
    title: "Definição de Oportunidades de Melhoria",
    description: "Planejar soluções para eliminar dores (automação, eliminação de passos, etc.).",
  },
  {
    id: "step4_2",
    category: "4. Engenharia TO BE",
    title: "Desenho do Fluxo TO BE",
    description: "Modelar o fluxo futuro otimizado contendo as melhorias integradas.",
  },
  {
    id: "step5_1",
    category: "5. Homologação & Entrega",
    title: "Apresentação e Validação",
    description: "Apresentar os resultados e fluxo TO BE para aprovação final do Sponsor.",
  },
  {
    id: "step5_2",
    category: "5. Homologação & Entrega",
    title: "Procedimentação & Gestão de Mudança",
    description: "Garantir que os novos procedimentos estão documentados e a equipe está treinada.",
  },
];

export function ChecklistTab() {
  const { projetoId } = useHierarchy();
  const [completedItems, setCompletedItems] = useState<string[]>([]);

  // Load from localStorage for the active project
  useEffect(() => {
    if (!projetoId) return;
    const stored = localStorage.getItem(`vibra_checklist_${projetoId}`);
    if (stored) {
      try {
        setCompletedItems(JSON.parse(stored));
      } catch (e) {
        setCompletedItems([]);
      }
    } else {
      setCompletedItems([]);
    }
  }, [projetoId]);

  // Save to localStorage when changed
  const toggleItem = (id: string) => {
    if (!projetoId) {
      toast.error("Selecione um projeto na barra superior para registrar o progresso.");
      return;
    }
    const newCompleted = completedItems.includes(id)
      ? completedItems.filter((i) => i !== id)
      : [...completedItems, id];

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
  const percentage = total > 0 ? Math.round((completedCount / total) * 100) : 0;

  // Group items by category
  const categories = Array.from(new Set(CHECKLIST_ITEMS.map((item) => item.category)));

  return (
    <div
      id="checklist-root"
      className="bg-neutral-50 rounded-xl p-6 border border-[#DBDBDB] space-y-6"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-[#044317] flex items-center gap-2">
            <ClipboardCheck className="h-5 w-5 text-[#268200]" /> Checklist de Metodologia e
            Mapeamento
          </h2>
          <p className="text-xs text-[#54585A]">
            Acompanhe o andamento das etapas canônicas de levantamento de processos para o projeto
            selecionado.
          </p>
        </div>
        {projetoId && (
          <button
            onClick={resetChecklist}
            className="flex items-center gap-1 text-[11.5px] font-bold text-[#54585A] hover:text-[#044317] bg-white border border-[#DBDBDB] px-3 py-1.5 rounded-lg hover:bg-neutral-50 transition"
          >
            <RotateCcw className="h-3 w-3" /> Reiniciar Progresso
          </button>
        )}
      </div>

      {!projetoId ? (
        <div className="flex items-center gap-2.5 p-4 bg-[#fced96] border border-[#FEDC00] rounded-xl text-[12.5px] text-[#54585A]">
          <Info className="h-4.5 w-4.5 text-[#FF6900] shrink-0" />
          <span>
            <strong>Nenhum projeto selecionado:</strong> Por favor, selecione um projeto no seletor
            da barra superior do sistema para visualizar e salvar o progresso do checklist.
          </span>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Progress Widget */}
          <div className="bg-white p-4 rounded-xl border border-[#DBDBDB] space-y-2 shadow-sm">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-[#044317]">Progresso de Mapeamento do Projeto</span>
              <span className="font-extrabold text-[#268200]">{percentage}% Concluído</span>
            </div>
            <div className="w-full h-3 bg-neutral-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#268200] transition-all duration-500 rounded-full"
                style={{ width: `${percentage}%` }}
              />
            </div>
            <div className="text-[11px] text-[#54585A]">
              {completedCount} de {total} atividades essenciais concluídas.
            </div>
          </div>

          {/* Checklist Categories & Items */}
          <div className="grid gap-6 md:grid-cols-2">
            {categories.map((category) => (
              <div
                key={category}
                className="bg-white p-4 rounded-xl border border-[#DBDBDB] shadow-sm space-y-3"
              >
                <h3 className="text-xs font-extrabold text-[#044317] border-b border-neutral-100 pb-1 uppercase tracking-wider">
                  {category}
                </h3>
                <div className="space-y-3">
                  {CHECKLIST_ITEMS.filter((item) => item.category === category).map((item) => {
                    const isChecked = completedItems.includes(item.id);
                    return (
                      <div
                        key={item.id}
                        onClick={() => toggleItem(item.id)}
                        className={`flex items-start gap-3 p-2.5 rounded-lg border transition-all cursor-pointer ${
                          isChecked
                            ? "bg-[#a9c78e]/10 border-[#a9c78e] shadow-sm"
                            : "bg-white border-neutral-100 hover:border-[#DBDBDB]"
                        }`}
                      >
                        <button type="button" className="mt-0.5 text-[#268200] focus:outline-none">
                          {isChecked ? (
                            <CheckSquare className="h-5 w-5 text-[#268200] fill-[#a9c78e]/20" />
                          ) : (
                            <Square className="h-5 w-5 text-[#DBDBDB] hover:text-[#54585A]" />
                          )}
                        </button>
                        <div className="space-y-0.5 select-none">
                          <h4
                            className={`text-xs font-bold ${isChecked ? "text-neutral-500 line-through" : "text-[#54585A]"}`}
                          >
                            {item.title}
                          </h4>
                          <p className="text-[11px] text-muted-foreground leading-snug">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
