import { useState, type ReactElement, type ReactNode } from "react";
import {
  BookOpen,
  ChevronRight,
  Lightbulb,
  Users,
  Calculator,
  MessageCircle,
  Wrench,
  Sparkles,
  ListChecks,
  ShieldAlert,
  Compass,
  ArrowRight,
  Layers,
  HelpCircle,
  FileText,
  Percent,
  CheckCircle,
  GitPullRequest,
} from "lucide-react";

type Sec = { id: string; title: string; icon: any; render: () => ReactElement };

export function PlaybookTab() {
  const [active, setActive] = useState("intro");

  const SECTIONS: Sec[] = [
    { id: "intro", title: "1. Introdução & Programa MC", icon: BookOpen, render: Intro },
    {
      id: "glossario",
      title: "2. Glossário de Termos & Siglas",
      icon: HelpCircle,
      render: Glossario,
    },
    {
      id: "hierarquia",
      title: "3. Hierarquia & Rastreabilidade",
      icon: Layers,
      render: Hierarquia,
    },
    { id: "guia", title: "4. Jornada de Uso do Sistema", icon: Compass, render: Guia },
    {
      id: "exploracao_abas",
      title: "5. Guia Completo das Abas",
      icon: FileText,
      render: ExploraAbas,
    },
    {
      id: "metodologias",
      title: "6. Metodologias Operacionais",
      icon: Sparkles,
      render: Metodologias,
    },
    { id: "ferramentas", title: "7. Ferramentas de Mapeamento", icon: Wrench, render: Ferramentas },
    { id: "stakeholders", title: "8. Stakeholders & Personas", icon: Users, render: Stakeholders },
    {
      id: "abordagem",
      title: "9. Abordagem de Consultoria",
      icon: MessageCircle,
      render: Abordagem,
    },
    {
      id: "resistencias",
      title: "10. Gestão de Resistências",
      icon: ShieldAlert,
      render: Resistencias,
    },
    { id: "calculos", title: "11. Memória de Cálculo & KPIs", icon: Calculator, render: Calculos },
    {
      id: "insights",
      title: "12. Inovação & Visão Especialista",
      icon: Lightbulb,
      render: Insights,
    },
  ];

  const Current = SECTIONS.find((s) => s.id === active)?.render ?? Intro;

  return (
    <div className="grid grid-cols-[280px_minmax(0,1fr)] gap-6 items-start">
      {/* Sidebar Navigation */}
      <aside className="sticky top-6 max-h-[calc(100vh-140px)] overflow-y-auto rounded-xl border border-neutral-200/80 bg-white p-3 shadow-sm dark:border-neutral-800 dark:bg-neutral-900 scrollbar-thin">
        <div className="px-3 pb-3 pt-1 border-b border-neutral-100 dark:border-neutral-800 mb-3">
          <p className="text-[10px] font-bold uppercase tracking-widest text-vibra-700 dark:text-vibra-400">
            Escritório de Transformação
          </p>
          <h2 className="text-[14px] font-bold text-vibra-850 dark:text-neutral-150">
            Playbook de Melhoria Contínua
          </h2>
        </div>
        <nav className="flex flex-col gap-1">
          {SECTIONS.map((s) => {
            const Ic = s.icon;
            const isActive = s.id === active;
            return (
              <button
                key={s.id}
                onClick={() => setActive(s.id)}
                className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-left text-[12px] font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-vibra-700 text-white shadow-md shadow-vibra-700/10"
                    : "text-neutral-600 hover:bg-neutral-50 hover:text-vibra-800 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white"
                }`}
              >
                <Ic
                  className={`h-4 w-4 shrink-0 ${isActive ? "text-white" : "text-neutral-400"}`}
                />
                <span className="truncate flex-1">{s.title}</span>
                <ChevronRight
                  className={`h-3.5 w-3.5 shrink-0 transition-transform ${
                    isActive ? "opacity-100 translate-x-0.5" : "opacity-30"
                  }`}
                />
              </button>
            );
          })}
        </nav>
        <div className="mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-800 px-3">
          <p className="text-[10.5px] italic text-neutral-400 leading-normal">
            Leitura consultiva obrigatória para analistas, gestores e facilitadores de processos.
          </p>
        </div>
      </aside>

      {/* Content Area */}
      <main className="rounded-xl border border-neutral-200/80 bg-white p-7 shadow-sm dark:border-neutral-800 dark:bg-neutral-900 min-h-[600px] animate-fadeIn">
        <Current />
      </main>
    </div>
  );
}

/* ===================== Custom Styled Components for Playbook ===================== */

function H1({ children }: { children: ReactNode }) {
  return (
    <div className="border-b border-neutral-100 dark:border-neutral-800 pb-3 mb-5">
      <h2 className="text-[22px] font-extrabold text-vibra-850 dark:text-white tracking-tight leading-tight">
        {children}
      </h2>
    </div>
  );
}

function H2({ children }: { children: ReactNode }) {
  return (
    <h3 className="mb-3 mt-6 border-l-[3.5px] border-vibra-700 pl-3 text-[14px] font-bold text-vibra-800 dark:text-neutral-200 uppercase tracking-wider">
      {children}
    </h3>
  );
}

function P({ children }: { children: ReactNode }) {
  return (
    <p className="text-[12.5px] leading-relaxed text-neutral-600 dark:text-neutral-300 mb-4 font-medium">
      {children}
    </p>
  );
}

function UL({ items }: { items: ReactNode[] }) {
  return (
    <ul className="mt-2 list-none space-y-2 mb-4">
      {items.map((item, idx) => (
        <li
          key={idx}
          className="flex items-start gap-2 text-[12.5px] text-neutral-600 dark:text-neutral-300 font-medium"
        >
          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-vibra-600" />
          <span className="flex-1">{item}</span>
        </li>
      ))}
    </ul>
  );
}

function Card({
  title,
  children,
  tone = "vibra",
}: {
  title?: string;
  children: ReactNode;
  tone?: "vibra" | "orange" | "yellow" | "blue" | "green";
}) {
  const map = {
    vibra:
      "border-vibra-100 bg-vibra-50/20 text-vibra-900 dark:border-vibra-900/30 dark:bg-vibra-950/20",
    orange:
      "border-orange-100 bg-orange-50/30 text-orange-950 dark:border-orange-950/30 dark:bg-orange-950/20",
    yellow:
      "border-amber-100 bg-amber-50/20 text-amber-950 dark:border-amber-950/30 dark:bg-amber-950/20",
    blue: "border-blue-100 bg-blue-50/20 text-blue-950 dark:border-blue-950/30 dark:bg-blue-950/20",
    green:
      "border-emerald-100 bg-emerald-50/20 text-emerald-950 dark:border-emerald-950/30 dark:bg-emerald-950/20",
  };
  return (
    <div
      className={`mt-3 mb-4 rounded-xl border p-4 shadow-sm transition-all duration-200 hover:shadow-md ${map[tone]}`}
    >
      {title && (
        <p className="mb-2 text-[12.5px] font-bold uppercase tracking-wide text-vibra-800 dark:text-vibra-400">
          {title}
        </p>
      )}
      <div className="text-[12px] leading-relaxed font-medium">{children}</div>
    </div>
  );
}

function Tbl({ head, rows }: { head: string[]; rows: (string | ReactNode)[][] }) {
  return (
    <div className="mt-3 mb-5 overflow-x-auto rounded-xl border border-neutral-100 bg-white dark:border-neutral-800 dark:bg-neutral-900 shadow-sm">
      <table className="w-full table-auto border-collapse text-[12px] text-left">
        <thead>
          <tr className="bg-neutral-55 dark:bg-neutral-800 border-b border-neutral-100 dark:border-neutral-700">
            {head.map((h, i) => (
              <th
                key={i}
                className="px-4 py-3 font-bold text-neutral-750 dark:text-neutral-250 uppercase tracking-wider text-[11px]"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
          {rows.map((row, rIdx) => (
            <tr
              key={rIdx}
              className="hover:bg-neutral-50/50 dark:hover:bg-neutral-800/30 transition-colors"
            >
              {row.map((cell, cIdx) => (
                <td
                  key={cIdx}
                  className="px-4 py-2.5 align-top text-neutral-600 dark:text-neutral-300 font-medium leading-relaxed"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ===================== Section Components ===================== */

function Intro() {
  return (
    <>
      <H1>Introdução & Programa de Melhoria Contínua</H1>
      <P>
        O <strong>Programa de Melhoria Contínua (MC)</strong> do Escritório de Transformação foi
        idealizado para estabelecer uma cultura de alta performance, simplificação de processos e
        maximização de resultados. Este Playbook consolida todas as técnicas de consultoria e
        documentação do sistema.
      </P>
      <H2>A Filosofia por Trás</H2>
      <P>
        Na nossa visão, mapear processos não é desenhar caixas e setas. É um diagnóstico clínico e
        uma ferramenta de intervenção cultural. Nosso objetivo final é{" "}
        <strong>gerar valor real e mensurável</strong>: aumento de produtividade, eficiência,
        redução de erros, mitigação de riscos, e melhora expressiva na experiência do cliente
        interno e externo.
      </P>

      <Card title="OS 4 PILARES DA TRANSFORMAÇÃO" tone="vibra">
        <Tbl
          head={["Pilar", "Foco Estratégico", "Entrega de Valor"]}
          rows={[
            [
              "1. Diagnóstico Clínico",
              "Compreensão aprofundada das dores, gargalos e custos operacionais da situação atual.",
              "Baseline quantitativo de tempo e custo.",
            ],
            [
              "2. Engajamento Ativo",
              "Envolvimento genuíno do time de ponta e quebra de resistências através da co-criação.",
              "Sustentação da mudança cultural.",
            ],
            [
              "3. Implantação Ágil",
              "Execução disciplinada com entregas parciais de melhorias rápidas (Quick Wins).",
              "Aceleração do retorno do investimento.",
            ],
            [
              "4. Sustentação Robusta",
              "Padronização por meio de POPs e medição constante dos indicadores-chave.",
              "Prevenção contra o retrocesso operacional.",
            ],
          ]}
        />
      </Card>
    </>
  );
}

function Glossario() {
  return (
    <>
      <H1>Glossário de Termos & Siglas</H1>
      <P>
        Use esta lista abrangente de termos e siglas para uniformizar a linguagem técnica entre
        analistas, facilitadores, liderança executiva e clientes internos. Esta documentação
        estabelece o vocabulário oficial do nosso Escritório de Transformação.
      </P>

      <H2>Siglas de Produtividade, Finanças & Governança</H2>
      <Tbl
        head={["Sigla", "Nome Completo", "Definição Técnica e Contextual no Sistema"]}
        rows={[
          [
            "MC³",
            "Melhoria Contínua Cognitiva e Conectada",
            "Framework de vanguarda que une o mapeamento ágil de processos, a modelagem de fluxo de valor (VSM) e a automação de baixo código para criar fluxos enxutos de alta performance.",
          ],
          [
            "FTE",
            "Full-Time Equivalent (Equivalente em Tempo Integral)",
            "Unidade métrica que padroniza o esforço de trabalho. 1,0 FTE equivale à carga horária de uma pessoa trabalhando em período integral (adotamos 176 horas produtivas por mês no sistema).",
          ],
          [
            "HC",
            "Headcount (Contagem de Cabeças)",
            "Número real absoluto de pessoas físicas vinculadas a um determinado departamento ou processo, independente de sua jornada horária.",
          ],
          [
            "SLA",
            "Service Level Agreement (Acordo de Nível de Serviço)",
            "Compromisso formal que define o prazo limite ou nível de qualidade aceitável para a entrega de uma etapa ou serviço ao cliente final ou área parceira.",
          ],
          [
            "ROI",
            "Return on Investment (Retorno sobre Investimento)",
            "Métrica de saúde financeira que calcula o rendimento obtido em relação ao capital investido na implantação da melhoria (ex: custo de licenças de RPA ou desenvolvimento de sistemas).",
          ],
          [
            "VSM",
            "Value Stream Mapping (Mapeamento do Fluxo de Valor)",
            "Técnica Lean para visualizar e analisar todos os fluxos de materiais, informações e processos ponta a ponta de uma família de produtos/serviços.",
          ],
          [
            "SIPOC",
            "Suppliers, Inputs, Process, Outputs, Customers",
            "Diagrama estruturado que delimita as fronteiras e escopo de um processo: Fornecedores (S), Entradas (I), Atividades de Alto Nível (P), Saídas (O) e Clientes (C).",
          ],
          [
            "DMAIC",
            "Define, Measure, Analyze, Improve, Control",
            "Método disciplinado do Lean Six Sigma com cinco fases sequenciais, focado em estabilização de processos e eliminação de variação/defeitos.",
          ],
          [
            "PDCA",
            "Plan, Do, Check, Act",
            "Método interativo de gestão em quatro passos, voltado para o controle e melhoria contínua de processos e produtos.",
          ],
          [
            "POP",
            "Procedimento Operacional Padrão",
            "Instrução de trabalho escrita e ilustrada que detalha a única e melhor forma atualizada de executar uma operação, garantindo constância de entrega.",
          ],
          [
            "VMO",
            "Value Management Office (Escritório de Gestão de Valor)",
            "Equipe e estrutura responsável por quantificar, rastrear, auditar e validar a captura de ganhos (saving) prometidos nas fases de projeto.",
          ],
          [
            "RPA",
            "Robotic Process Automation (Automação de Processos por Robôs)",
            "Tecnologia de software que imita ações humanas em computadores para automatizar tarefas repetitivas baseadas em regras.",
          ],
          [
            "ICE",
            "Impact, Confidence, Ease (Impacto, Confiança, Facilidade)",
            "Metodologia de priorização que auxilia na classificação matemática de ideias ou contramedidas de melhoria.",
          ],
          [
            "CAPEX",
            "Capital Expenditure (Investimento em Bens de Capital)",
            "Montante de recursos financeiros despendido para aquisição de infraestrutura, licenças permanentes ou ativos de longo prazo.",
          ],
          [
            "OPEX",
            "Operational Expenditure (Despesas Operacionais)",
            "Custo contínuo para manter um sistema, processo ou departamento funcionando no dia a dia (ex: salários do time de operação).",
          ],
          [
            "VOC",
            "Voice of the Customer (Voz do Cliente)",
            "Processo de captura de necessidades, feedbacks e expectativas explícitas e implícitas do cliente final em relação ao serviço prestado.",
          ],
          [
            "KPI",
            "Key Performance Indicator (Indicador-Chave de Desempenho)",
            "Métrica quantificável que reflete os fatores críticos de sucesso da organização ou de um processo específico.",
          ],
        ]}
      />

      <H2>Glossário de Termos de Melhoria Contínua</H2>
      <Tbl
        head={["Termo Técnico", "Foco Operacional", "Descrição e Aplicação Prática"]}
        rows={[
          [
            "Lead Time",
            "Velocidade do Processo",
            "Tempo total decorrido desde o gatilho inicial (pedido do cliente) até a entrega final efetiva. Inclui tempos de execução e tempos de espera.",
          ],
          [
            "Cycle Time (Tempo de Ciclo)",
            "Velocidade do Passo",
            "Tempo em que um executor realmente trabalha na atividade para concluir uma única unidade de entrega.",
          ],
          [
            "Takt Time",
            "Ritmo de Atendimento",
            "O ritmo de produção necessário para atender perfeitamente à demanda do cliente. Calculado dividindo o tempo útil de trabalho disponível pela demanda.",
          ],
          [
            "Gargalo (Bottleneck)",
            "Capacidade Restrita",
            "A etapa do processo que possui menor capacidade de processamento por hora, limitando a produtividade de toda a cadeia ponta a ponta.",
          ],
          [
            "Contramedida",
            "Eliminação de Causa",
            "Ação corretiva implantada para neutralizar uma causa-raiz identificada, impedindo a recorrência de um problema operacional.",
          ],
          [
            "Quick Win (Ganho Rápido)",
            "Aceleração de Resultados",
            "Ideia de melhoria de altíssimo impacto que pode ser implantada rapidamente com baixíssimo custo ou esforço (priorizada na Matriz Esforço x Impacto).",
          ],
          [
            "Gemba",
            "Observação no Local Real",
            "Palavra japonesa que significa 'o local real onde o valor é gerado'. Na prática, significa sair da sala de reunião e ir à pista do posto ou à mesa do analista para ver o trabalho acontecer.",
          ],
          [
            "Kaizen",
            "Melhoria Incremental",
            "Conceito que visa a melhoria contínua e gradual em todos os aspectos da vida profissional e pessoal, com foco em eliminar desperdícios diariamente.",
          ],
          [
            "Andon",
            "Gestão Visual de Alertas",
            "Dispositivo ou sistema visual (como a aba Pedido de Ajuda) que sinaliza imediatamente uma falha ou anomalia no processo, permitindo ação imediata.",
          ],
          [
            "Jidoka",
            "Autonomação",
            "Capacidade de dotar as máquinas e sistemas de inteligência para detectar desvios e parar o fluxo automaticamente quando um erro for encontrado, evitando a propagação do defeito.",
          ],
          [
            "AS-IS (Estado Atual)",
            "Situação de Partida",
            "O mapeamento fiel e honesto do processo exatamente como ele ocorre hoje, incluindo retrabalhos, erros, esperas e gambiarras operacionais.",
          ],
          [
            "TO-BE (Estado Futuro)",
            "Cenário Alvo",
            "O desenho otimizado do processo idealizado livre de desperdícios, com aplicação de automações cognitivas e simplificação de fluxos.",
          ],
        ]}
      />

      <H2>Diferenciações Críticas para o Mapeador</H2>
      <div className="grid gap-4 md:grid-cols-2">
        <Card tone="blue" title="HC (Headcount) vs. FTE (Full-Time Equivalent)">
          <P>
            <strong>HC</strong> é o número total de pessoas físicas no time. <strong>FTE</strong>{" "}
            mede a capacidade produtiva em horas. Se uma atividade consome 88 horas mensais de
            trabalho, ela consome exatamente <strong>0,5 FTE</strong>, independentemente de ser
            executada por uma única pessoa em tempo parcial ou dividida entre cinco pessoas. O FTE
            normaliza a métrica de capacidade humana.
          </P>
        </Card>
        <Card tone="green" title="Lead Time vs. Cycle Time">
          <P>
            O <strong>Cycle Time</strong> é o tempo gasto de fato executando a tarefa (ex: 5 minutos
            digitando um formulário). O <strong>Lead Time</strong> engloba toda a jornada do
            processo, incluindo as filas de espera (ex: o formulário levou 3 dias na caixa de
            entrada até ser aberto). Melhorias Lean focam prioritariamente na redução dos tempos de
            fila que inflam o Lead Time.
          </P>
        </Card>
      </div>
    </>
  );
}

function Hierarquia() {
  return (
    <>
      <H1>Hierarquia & Rastreabilidade do Sistema</H1>
      <P>
        O sistema de melhoria contínua opera sob uma rigorosa árvore de agregação, herança e
        subordinação de dados. Isso garante que cada tarefa diária esteja diretamente alinhada à
        estratégia corporativa geral e aos programas de eficiência de nível VP.
      </P>

      <H2>A Árvore Estrutural e de Escopo</H2>
      <div className="space-y-3 my-4">
        <div className="flex items-center gap-3 p-3 rounded-lg border border-neutral-150 bg-neutral-55 dark:border-neutral-800 dark:bg-neutral-850">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-800 text-[11px] font-bold text-white shrink-0">
            1
          </span>
          <div>
            <p className="text-[12.5px] font-bold text-emerald-850 dark:text-emerald-150">
              Projetos (Macroprojetos / Programas)
            </p>
            <p className="text-[11px] text-neutral-500">
              Nível macro que agrupa as iniciativas. Define os grandes programas de transformação de
              eficiência operacional ou logística (ex: Eficiência em Refino, Transformação Digital
              de Processos).
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-lg border border-neutral-150 bg-neutral-55 dark:border-neutral-800 dark:bg-neutral-850 ml-4">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-vibra-800 text-[11px] font-bold text-white shrink-0">
            2
          </span>
          <div>
            <p className="text-[12.5px] font-bold text-vibra-850 dark:text-neutral-150">
              Iniciativas + Tarefas (atreladas às iniciativas)
            </p>
            <p className="text-[11px] text-neutral-500">
              A célula principal de atuação. Contém a análise de causa-raiz, matriz de desperdícios,
              dmaic e cronogramas. Possui <strong>Tarefas Diretas da Iniciativa</strong> focadas na
              governança do projeto, reuniões, comitês de facilitação e entregas de marcos
              estratégicos.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-lg border border-neutral-150 bg-neutral-55 dark:border-neutral-800 dark:bg-neutral-850 ml-8">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-800 text-[11px] font-bold text-white shrink-0">
            3
          </span>
          <div>
            <p className="text-[12.5px] font-bold text-blue-850 dark:text-blue-150">
              Microprocessos + Tarefas (atreladas aos microprocessos)
            </p>
            <p className="text-[11px] text-neutral-500">
              Mapeamento granular sequencial de passos executados no dia a dia. Vinculados
              diretamente à Iniciativa principal. Possui <strong>Tarefas de Microprocesso</strong>{" "}
              que detalham os passos reais mapeados nos estados AS-IS e TO-BE (ex: conferir
              documentos, realizar lançamento no ERP, obter assinatura física).
            </p>
          </div>
        </div>
      </div>

      <H2>Rastreabilidade e Propagação Matemática de Dados</H2>
      <P>
        Como o sistema aglutina e consolida as informações das bases? Entenda as regras rígidas de
        propagação de dados de baixo para cima:
      </P>
      <Tbl
        head={[
          "Nível de Origem",
          "Dados e Entradas Coletadas",
          "Mecanismo de Propagação",
          "Resultado e Consolidação",
        ]}
        rows={[
          [
            "Tarefas de Microprocessos",
            "Tempo de ciclo (minutos), volume mensal de repetições, sistemas utilizados, se há dupla digitação ou digitação manual.",
            "Multiplica tempo e volume mensais individuais para obter o total de horas mensais. Divide-se por 176 para consolidar em FTEs ativos do microprocesso.",
            "Baseline quantitativo de tempo, custo e carga de trabalho por microprocesso mapeado.",
          ],
          [
            "Tarefas de Iniciativas",
            "Atividades do cronograma (Kick-off, Mapeamento AS-IS concluído, Homologação de RPA, Auditoria Lean), prazos, percentual físico de avanço.",
            "O progresso físico de cada tarefa direta atualiza de forma ponderada o percentual de avanço geral da Iniciativa principal.",
            "Progresso consolidado exibido dinamicamente no portfólio executivo e no painel Kanban de acompanhamento.",
          ],
          [
            "Iniciativas",
            "Somatório de horas recuperadas, savings mensais e anuais calculados, payback de implantação, notas de impacto (ICE).",
            "Agrega o valor total de saving, ROI médio de soluções e horas poupadas agrupando os dados por Projeto Macro de vinculação.",
            "Executive Vision Dashboard (Gráficos de Pareto, Carga Horária Liberada e Portfólio Geral).",
          ],
          [
            "Projetos Macros",
            "Soma geral de saving previsto versus realizado, total de iniciativas em andamento, concluídas ou suspensas.",
            "Filtro interativo tridimensional de governança por diretoria, VP e gerência operacional.",
            "Visão corporativa de eficiência operacional unificada para reportes de diretoria.",
          ],
        ]}
      />

      <Card tone="orange" title="PRINCÍPIO DE INTEGRIDADE DE REGISTRO">
        <P>
          Para garantir relatórios de auditoria íntegos no GCP, toda iniciativa{" "}
          <strong>precisa</strong> estar vinculada a um Projeto Macro ativo. Caso contrário, as
          variáveis econômicas de FTE e ROI ficarão órfãs e não aparecerão na consolidação geral dos
          painéis executivos.
        </P>
      </Card>
    </>
  );
}

function Guia() {
  return (
    <>
      <H1>Jornada de Uso do Sistema</H1>
      <P>
        O fluxo ideal de condução de um projeto de melhoria contínua segue este roteiro sequencial,
        garantindo que nenhuma etapa fundamental seja esquecida.
      </P>

      <H2>Fases da Jornada Operacional</H2>
      <div className="grid gap-4 md:grid-cols-2 my-4">
        <div className="p-4 border border-neutral-100 rounded-xl bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-850">
          <div className="flex items-center gap-2 mb-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-vibra-800 text-[11px] font-bold text-white">
              1
            </span>
            <h4 className="font-bold text-[13px] text-vibra-800 dark:text-neutral-100">
              Setup Inicial & Cadastro
            </h4>
          </div>
          <p className="text-[11.5px] text-neutral-600 dark:text-neutral-450 leading-relaxed">
            Abra a Iniciativa no <strong>Módulo Executivo</strong> informando nome, sponsor, líder e
            descrição. Garanta que o macroprocesso correspondente esteja selecionado.
          </p>
        </div>

        <div className="p-4 border border-neutral-100 rounded-xl bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-850">
          <div className="flex items-center gap-2 mb-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-vibra-800 text-[11px] font-bold text-white">
              2
            </span>
            <h4 className="font-bold text-[13px] text-vibra-800 dark:text-neutral-100">
              Mapeamento Clínico
            </h4>
          </div>
          <p className="text-[11.5px] text-neutral-600 dark:text-neutral-450 leading-relaxed">
            Na aba <strong>Análise</strong>, documente o SIPOC e levante detalhadamente as etapas do
            processo atual (AS IS). Registre o tempo unitário de cada executor para o cálculo
            automático do baseline.
          </p>
        </div>

        <div className="p-4 border border-neutral-100 rounded-xl bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-850">
          <div className="flex items-center gap-2 mb-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-vibra-800 text-[11px] font-bold text-white">
              3
            </span>
            <h4 className="font-bold text-[13px] text-vibra-800 dark:text-neutral-100">
              Identificação de Causas
            </h4>
          </div>
          <p className="text-[11.5px] text-neutral-600 dark:text-neutral-450 leading-relaxed">
            Vá para a aba <strong>Metodologias</strong> e aplique os 5 Porquês e o Diagrama de
            Ishikawa. Classifique cada causa e estruture as contramedidas.
          </p>
        </div>

        <div className="p-4 border border-neutral-100 rounded-xl bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-850">
          <div className="flex items-center gap-2 mb-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-vibra-800 text-[11px] font-bold text-white">
              4
            </span>
            <h4 className="font-bold text-[13px] text-vibra-800 dark:text-neutral-100">
              Priorização & Futuro
            </h4>
          </div>
          <p className="text-[11.5px] text-neutral-600 dark:text-neutral-450 leading-relaxed">
            Insira as contramedidas na <strong>Matriz Esforço x Impacto</strong>. Mapeie o estado
            futuro (TO BE) e compare em tempo real a redução de carga de trabalho e complexidade.
          </p>
        </div>
      </div>
    </>
  );
}

function ExploraAbas() {
  return (
    <>
      <H1>Guia Completo de Abas do Mapeamento</H1>
      <P>
        Entenda o propósito, as funcionalidades disponíveis e o valor metodológico de cada uma das
        abas que compõem o módulo de Mapeamento do sistema:
      </P>

      <H2>1. Formulário de Iniciativa</H2>
      <UL
        items={[
          <>
            <strong>Propósito:</strong> Ficha cadastral e de escopo geral do projeto de melhoria
            contínua.
          </>,
          <>
            <strong>Funcionalidades:</strong> Edição de título, objetivos estratégicos, metas, datas
            marcos, seleção de sponsors, co-líderes e identificação de diretoria/área impactada.
          </>,
          <>
            <strong>Valor Metodológico:</strong> Estabelece o termo de abertura (Project Charter)
            oficial, formalizando o escopo e garantindo patrocínio executivo.
          </>,
        ]}
      />

      <H2>2. Postos Petrobras</H2>
      <UL
        items={[
          <>
            <strong>Propósito:</strong> Cadastro e análise visual focados na rede de distribuição e
            postos.
          </>,
          <>
            <strong>Funcionalidades:</strong> Upload de fotos do posto, detalhamento operacional de
            melhorias em pista, checklists locais e localização geográfica.
          </>,
          <>
            <strong>Valor Metodológico:</strong> Conecta a melhoria corporativa diretamente com as
            operações do ponto de venda no Gemba.
          </>,
        ]}
      />

      <H2>3. Análise (SIPOC, AS IS, TO BE, Comparativo)</H2>
      <UL
        items={[
          <>
            <strong>Propósito:</strong> Coração analítico da ferramenta. Diagnóstico minucioso e de
            desenlace operacional.
          </>,
          <>
            <strong>Subtab SIPOC:</strong> Alinha as fronteiras do projeto (Fornecedores, Entradas,
            Atividades, Saídas e Clientes) antes de se aprofundar.
          </>,
          <>
            <strong>Subtab AS IS:</strong> Mapeamento do cenário de trabalho atual com tempos em
            minutos, executores, freqüência e cálculo automatizado de FTE consumido.
          </>,
          <>
            <strong>Subtab TO BE:</strong> Modelagem ideal eliminando desperdícios, estimando
            redução de passos operacionais e automações cognitivas.
          </>,
          <>
            <strong>Subtab AS IS x TO BE:</strong> Painel comparativo analítico consolidando o ganho
            de produtividade em horas e a economia financeira.
          </>,
        ]}
      />

      <H2>4. Metodologias (Causa Raiz, Lean, Kaizen, DMAIC, Matriz)</H2>
      <UL
        items={[
          <>
            <strong>Subtab Causa Raiz:</strong> Ishikawa (Espinha de peixe) e 5 Porquês para
            descobrir as origens reais dos problemas em vez de remediar sintomas.
          </>,
          <>
            <strong>Subtab Lean:</strong> Detalhamento dos 8 desperdícios clássicos (superprodução,
            espera, transporte, processamento excessivo, estoque, movimentação, defeitos,
            intelectual).
          </>,
          <>
            <strong>Subtab Kaizen:</strong> Controle de planos de melhoria rápida e ciclos de Kaizen
            diários ou semanais.
          </>,
          <>
            <strong>Subtab DMAIC:</strong> Checklist disciplinado de avanço metodológico do projeto
            nas etapas Define, Measure, Analyze, Improve, Control.
          </>,
          <>
            <strong>Subtab Matriz:</strong> Posicionamento gráfico de ideias de solução no quadrante
            Esforço × Impacto para rápida priorização (Quick Wins).
          </>,
        ]}
      />

      <H2>5. Resultados (Evolução, Top 15, Status Estratégico)</H2>
      <UL
        items={[
          <>
            <strong>Propósito:</strong> Prestação de contas e governança executiva dos ganhos.
          </>,
          <>
            <strong>Funcionalidades:</strong> Gráficos de evolução financeira acumulada de ganhos,
            ranking Top 15 de iniciativas mais lucrativas e semáforo de status estratégico.
          </>,
          <>
            <strong>Valor Metodológico:</strong> Transforma esforço de engenharia em métricas claras
            de negócio para reporte ao conselho executivo.
          </>,
        ]}
      />

      <H2>6. Mural de Imagens</H2>
      <UL
        items={[
          <>
            <strong>Propósito:</strong> Registro visual histórico das transformações operacionais.
          </>,
          <>
            <strong>Funcionalidades:</strong> Galeria dinâmica de fotos tiradas no Gemba com tags
            contextuais (ex: Antes / Depois) e notas explicativas.
          </>,
          <>
            <strong>Valor Metodológico:</strong> Evidência concreta de melhorias (ex: 5S, ergonomia,
            layout fabril), impulsionando a motivação coletiva.
          </>,
        ]}
      />

      <H2>7. Governança (Riscos, Cronograma, Controle & Sustentação)</H2>
      <UL
        items={[
          <>
            <strong>Subtab Riscos:</strong> Matriz de risco qualitativo (Probabilidade × Impacto)
            para prever impedimentos.
          </>,
          <>
            <strong>Subtab Cronograma:</strong> Gestão de marcos do projeto, datas planejadas vs.
            realizadas com indicadores visuais de desvios.
          </>,
          <>
            <strong>Subtab Controle & Sustentação:</strong> Plano formal de controle pós-implantação
            (responsável pela métrica, frequência, limites de controle e gatilho de atuação).
          </>,
        ]}
      />

      <H2>8. Ferramentas (Fluxo, Playbook, Calculadora, Checklist)</H2>
      <UL
        items={[
          <>
            <strong>Subtab Fluxo:</strong> Visualizador de processos e modelagem conceitual
            sequencial rápida.
          </>,
          <>
            <strong>Subtab Playbook:</strong> Esta biblioteca consultiva integrada de conhecimentos.
          </>,
          <>
            <strong>Subtab Calculadora:</strong> Simulador de ROI e viabilidade econômica para novas
            ideias de projeto.
          </>,
          <>
            <strong>Subtab Checklist de Mapeamento:</strong> Roteiro interativo de auditoria interna
            para validar a integridade de um mapeamento de processo.
          </>,
        ]}
      />

      <H2>9. BPMN</H2>
      <UL
        items={[
          <>
            <strong>Propósito:</strong> Modelagem de processos de alta precisão em notação BPMN
            padrão.
          </>,
          <>
            <strong>Funcionalidades:</strong> Desenho de raias, piscinas, eventos de início/fim,
            gateways decisórios, envio e recepção de mensagens.
          </>,
          <>
            <strong>Valor Metodológico:</strong> Padroniza a documentação técnica do TO BE para
            entrega direta à equipe de engenharia e TI para automação.
          </>,
        ]}
      />

      <H2>10. Agenda</H2>
      <UL
        items={[
          <>
            <strong>Propósito:</strong> Calendário integrado de facilitação e rituais operacionais.
          </>,
          <>
            <strong>Funcionalidades:</strong> Agendamento de reuniões de Kick-off, alinhamentos
            diários, comitês de governança e workshops de co-criação.
          </>,
          <>
            <strong>Valor Metodológico:</strong> Ritmo de governança ativa, essencial para evitar a
            estagnação de projetos longos.
          </>,
        ]}
      />

      <H2>11. Pedido de Ajuda</H2>
      <UL
        items={[
          <>
            <strong>Propósito:</strong> Canal oficial de escalonamento para superação de gargalos.
          </>,
          <>
            <strong>Funcionalidades:</strong> Envio imediato de chamados de suporte ao Escritório de
            Transformação em caso de barreiras políticas, metodológicas ou técnicas.
          </>,
          <>
            <strong>Valor Metodológico:</strong> Segurança operacional para o consultor, que sabe
            onde recorrer para destravar impedimentos.
          </>,
        ]}
      />
    </>
  );
}

function Metodologias() {
  return (
    <>
      <H1>Metodologias Operacionais</H1>
      <P>
        A Melhoria Contínua utiliza múltiplos caminhos científicos para solucionar problemas de
        negócios. Escolha a abordagem correta de acordo com o desafio:
      </P>

      <Tbl
        head={["Metodologia", "Foco Operacional", "Sintoma que Ataca", "Exemplo de Aplicação"]}
        rows={[
          [
            "Lean Manufacturing / Service",
            "Combate implacável de desperdícios e atrito operacional.",
            "Lentidão, muitas aprovações, planilhas paralelas, esperas.",
            "Redução de lead-time de faturamento de 5 para 2 dias.",
          ],
          [
            "Six Sigma (DMAIC)",
            "Redução radical de erros, defeitos e variabilidade de processo.",
            "Erros recorrentes, falhas sistêmicas, divergência de caixa.",
            "Zerar quebra de regras fiscais no faturamento.",
          ],
          [
            "Design Thinking",
            "Inovação centrada no ser humano através da empatia.",
            "Desengajamento do usuário, sistemas difíceis, alta insatisfação.",
            "Reestruturação do portal do cliente para autoatendimento.",
          ],
          [
            "BPM (Business Process Management)",
            "Arquitetura ponta a ponta e integração entre sistemas.",
            "Silos departamentais, falta de clareza de atribuições.",
            "Padronização da jornada de onboarding de novos colaboradores.",
          ],
        ]}
      />

      <H2>DMAIC: O Ciclo Científico</H2>
      <Card tone="vibra" title="Roteiro Disciplinado de Resolução">
        <UL
          items={[
            <>
              <strong>Define (D):</strong> Qual é o problema real? Qual o tamanho da perda
              financeira? Quem compõe o time?
            </>,
            <>
              <strong>Measure (M):</strong> Qual o baseline? Como medimos esse processo hoje? Qual a
              qualidade real do dado?
            </>,
            <>
              <strong>Analyze (A):</strong> Onde estão as causas-raiz? Por que os erros acontecem?
              (Ishikawa + 5 Porquês).
            </>,
            <>
              <strong>Improve (I):</strong> Ideação e teste controlado da solução (Teste Piloto /
              Plano de Ação 5W2H).
            </>,
            <>
              <strong>Control (C):</strong> Como garantir a estabilidade? Treinamentos, POPs e
              painéis visuais de monitoramento.
            </>,
          ]}
        />
      </Card>
    </>
  );
}

function Ferramentas() {
  return (
    <>
      <H1>Ferramentas de Mapeamento Clínico</H1>
      <P>
        Conheça as principais ferramentas analíticas integradas no sistema e as diretrizes
        recomendadas para preenchimento:
      </P>

      <H2>1. SIPOC (Escopo do Processo)</H2>
      <P>
        Antes de detalhar o processo atual, alinhe o escopo macro do projeto preenchendo estas 5
        colunas fundamentais:
      </P>
      <UL
        items={[
          <>
            <strong>Suppliers (Fornecedores):</strong> Quem fornece a matéria-prima ou informação?
            (Ex: Área Comercial).
          </>,
          <>
            <strong>Inputs (Entradas):</strong> O que é fornecido? (Ex: Proposta de Venda, CPF do
            Cliente).
          </>,
          <>
            <strong>Process (Atividades):</strong> Quais são os 4 a 6 passos principais do processo?
          </>,
          <>
            <strong>Outputs (Saídas):</strong> O que é produzido de fato ao final? (Ex: Pedido
            aprovado, Nota Fiscal emitida).
          </>,
          <>
            <strong>Customers (Clientes):</strong> Quem consome a entrega final? (Ex: Logística,
            Cliente final).
          </>,
        ]}
      />

      <H2>2. Ishikawa (Diagrama 6M)</H2>
      <P>
        Ideal para sessões de brainstorming de causa-raiz. Agrupe as potenciais hipóteses nas 6
        dimensões clássicas:
      </P>
      <Tbl
        head={["Dimensão", "Pergunta de Investigação", "Exemplo Comum"]}
        rows={[
          [
            "Método",
            "Há falta de padronização, regras ambíguas ou burocracia excessiva?",
            "Cada analista aprova pedidos de um jeito diferente.",
          ],
          [
            "Máquina",
            "Os sistemas apresentam instabilidades, lentidão ou falta de recursos?",
            "O ERP fica lento nos horários de fechamento.",
          ],
          [
            "Mão de Obra",
            "Há falta de treinamento, pressões por produtividade ou erros manuais?",
            "A equipe nova não recebeu treinamento sobre as regras fiscais.",
          ],
          [
            "Material",
            "Os insumos ou informações de entrada possuem baixa qualidade ou erros?",
            "Cadastro do cliente veio incompleto ou ilegível.",
          ],
          [
            "Medida",
            "Faltam indicadores de qualidade de dados ou metas mal dimensionadas?",
            "Não medimos o tempo de retrabalho do analista.",
          ],
          [
            "Meio Ambiente",
            "O espaço de trabalho físico ou virtual provoca dispersão e desconforto?",
            "Excesso de notificações ou barulho prejudicando o foco.",
          ],
        ]}
      />
    </>
  );
}

function Stakeholders() {
  return (
    <>
      <H1>Stakeholders & Personas</H1>
      <P>
        Mapear as pessoas influenciadas ou patrocinadoras de seu projeto é tão crítico quanto mapear
        as atividades operacionais. Use este guia de perfis típicos:
      </P>

      <H2>Matriz de Personas no Projeto de MC</H2>
      <Tbl
        head={["Perfil", "Foco Primário", "Principais Dores", "Estratégia de Engajamento"]}
        rows={[
          [
            "Sponsor (Diretor/VP)",
            "ROI financeiro, metas estratégicas, ganho de eficiência.",
            "Lentidão de entregas, falta de dados para decisão estruturada.",
            "Reportes extremamente executivos (1 slide), foco total em ROI e payback.",
          ],
          [
            "Process Owner (Gerente)",
            "Estabilidade do setor, cumprimento de SLAs operacionais.",
            "Equipe sobrecarregada, gargalos constantes, reclamações de clientes.",
            "Demonstrar que o projeto liberará FTE produtivo para absorver novas demandas sem contratação.",
          ],
          [
            "Analista Operacional",
            "Executar as tarefas do dia a dia com menos estresse.",
            "Sistemas ruins, retrabalho, processos burocráticos, planilhas paralelas.",
            "Focar na melhoria da ergonomia mental: eliminação de cliques desnecessários e tarefas mecânicas.",
          ],
        ]}
      />
    </>
  );
}

function Abordagem() {
  return (
    <>
      <H1>Abordagem de Consultoria Operacional & Facilitação</H1>
      <P>
        A postura de um especialista do Escritório de Transformação é o fator de sucesso primordial
        no mapeamento de processos. Devemos agir como parceiros estratégicos e consultores clínicos,
        focando na empatia operacional e no respeito ao time de ponta.
      </P>

      <H2>1. Estratégia de Abordagem Sutil (Construção de Rapport)</H2>
      <P>
        Quando um consultor de melhoria chega a um departamento, os colaboradores geralmente sentem
        receio (medo de auditoria, de punição ou de cortes). É vital desarmar esses gatilhos
        defensivos de forma sutil e sincera nas primeiras conversas:
      </P>
      <Card tone="blue" title="O DISCURSO DE ENTRADA (Mudar a Percepção)">
        <P>
          <strong>Abordagem Amadora:</strong>{" "}
          <em>
            “Oi, sou da Transformação e estou aqui para cronometrar seu trabalho e otimizar seu
            processo.”
          </em>{" "}
          (Gera rejeição imediata e respostas defensivas).
          <br />
          <br />
          <strong>Abordagem Consultiva (Recomendada):</strong>{" "}
          <em>
            “Olá! Estou aqui para entender os atritos sistêmicos e as dores que sobrecarregam o seu
            dia a dia. Meu objetivo é mapear o que consome seu tempo em cliques repetitivos,
            planilhas paralelas e esperas burocráticas, para que possamos defender investimentos em
            sistemas ou robôs para automatizar essas tarefas repetitivas. Você é o especialista no
            que faz e o protagonista desta melhoria.”
          </em>
        </P>
      </Card>

      <H2>2. Perguntas Estratégicas para Entrevistas de Processo</H2>
      <P>
        Em vez de apenas solicitar uma descrição linear básica do fluxo, use perguntas estratégicas
        que revelam gargalos profundos, complexidades cognitivas e desvios ocultos:
      </P>

      <div className="space-y-4 my-4">
        <div className="p-4 border border-neutral-100 rounded-lg bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-850">
          <p className="text-[12.5px] font-bold text-vibra-800 dark:text-neutral-200">
            🔍 Investigando Atritos & Dores Reais (Ergonomia Mental)
          </p>
          <UL
            items={[
              "“Se você pudesse apertar um botão mágico e eliminar a atividade mais chata ou repetitiva do seu dia hoje, qual seria?”",
              "“Em qual etapa você precisa fazer dupla ou tripla checagem manual para garantir que não ocorram erros graves? Por que esse passo é tão propenso ao erro?”",
              "“Quais planilhas ou arquivos locais você mantém como 'segurança' paralela para gerir o setor hoje?”",
            ]}
          />
        </div>

        <div className="p-4 border border-neutral-100 rounded-lg bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-850">
          <p className="text-[12.5px] font-bold text-vibra-800 dark:text-neutral-200">
            ⌛ Investigando Esperas, Filas & Gargalos
          </p>
          <UL
            items={[
              "“Onde vocês costumam perder mais tempo esperando a resposta, liberação ou aprovação de outras gerências/diretorias?”",
              "“Quando ocorre um pico de demanda (ex: fechamento mensal), em qual etapa o trabalho fica acumulado em fila de espera?”",
              "“O que acontece no processo se o executor chave desse setor ficar doente ou tirar férias repentinas?”",
            ]}
          />
        </div>

        <div className="p-4 border border-neutral-100 rounded-lg bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-850">
          <p className="text-[12.5px] font-bold text-vibra-800 dark:text-neutral-200">
            🌐 Investigando Interfaces, Exceções & SLA
          </p>
          <UL
            items={[
              "“Com qual frequência os inputs que você recebe (de outras áreas ou do cliente) vêm com erros, dados incompletos ou rasuras? O que você faz quando isso ocorre?”",
              "“Quantos sistemas diferentes você precisa manter abertos simultaneamente e copiar e colar informações entre eles para processar uma única solicitação?”",
              "“Qual percentual aproximado de casos desvia do fluxo idealizado normal e exige caminhos alternativos ou contatos telefônicos diretos para resolver?”",
            ]}
          />
        </div>
      </div>

      <H2>3. Roteiro Prático para Condução do Workshop</H2>
      <P>
        Para dinâmicas de mapeamento colaborativo (Kaizen ou VSM), siga esta sequência de
        facilitação para maximizar o engajamento:
      </P>
      <UL
        items={[
          <>
            <strong>Passo 1: Empatia e Contexto (15 min):</strong> Explique o propósito do projeto,
            apresente o Sponsor e estabeleça que o time de ponta tem o poder de decisão sobre as
            melhorias.
          </>,
          <>
            <strong>Passo 2: Mapear o AS-IS sem Censura (45 min):</strong> Registre a realidade nua
            e crua exatamente como ela funciona hoje. Estimule o time a falar sobre as dificuldades.
            Colete os volumes reais e tempos de ciclo.
          </>,
          <>
            <strong>Passo 3: Identificar Desperdícios (30 min):</strong> Aplique a matriz dos 8
            desperdícios Lean. Classifique os tempos em que o processo agrega valor (VA) versus não
            agrega valor (NVA).
          </>,
          <>
            <strong>Passo 4: Co-criar o TO-BE (45 min):</strong> Remova gargalos, idealize caminhos
            diretos, desenhe automações em raias claras e valide as contramedidas propostas de forma
            unânime.
          </>,
        ]}
      />
    </>
  );
}

function Resistencias() {
  return (
    <>
      <H1>Gestão de Resistências em Ambientes Difíceis</H1>
      <P>
        Processos de melhoria contínua alteram a zona de conforto das equipes, o que invariavelmente
        gera resistências. Use estas técnicas verbais para desarmar conflitos:
      </P>

      <H2>Desarmando Objeções Clássicas</H2>
      <Tbl
        head={["Objeção Comum", "Medo Oculto", "Como Responder de Forma Construtiva"]}
        rows={[
          [
            "“Isso não funciona na nossa área. Nosso trabalho é complexo demais.”",
            "Medo de simplificação forçada ou perda de status de importância.",
            "“Concordo que seu trabalho é altamente especializado. Justamente por isso, queremos automatizar as partes repetitivas para que você foque na parte nobre.”",
          ],
          [
            "“Sempre fizemos assim e deu certo há 10 anos.”",
            "Apego à rotina e medo de novas tecnologias.",
            "“O processo nos trouxe com sucesso até aqui. Agora, precisamos de novas formas de trabalhar para suportar o crescimento acelerado da empresa.”",
          ],
          [
            "“Estou sem tempo para participar de reuniões de mapeamento.”",
            "Equipe genuinamente sobrecarregada.",
            "“Entendo perfeitamente o aperto. O mapeamento é o remédio: vamos investir 1 hora hoje para recuperar 20 horas mensais para você nas próximas semanas.”",
          ],
        ]}
      />
    </>
  );
}

function Calculos() {
  return (
    <>
      <H1>Dicionário de Fórmulas Matemáticas & KPIs do Sistema</H1>
      <P>
        A credibilidade científica do Escritório de Transformação apoia-se na transparência e
        exatidão das métricas e coeficientes cadastrados. Abaixo, listamos todas as fórmulas
        matemáticas ativas no sistema, explicando seu propósito técnico e foco de atuação
        operacional.
      </P>

      <H2>Catálogo Geral de Fórmulas de Engenharia de Processos</H2>
      <Tbl
        head={[
          "Nome da Fórmula",
          "Fórmula Matemática Utilizada",
          "Foco Operacional e de Negócio",
          "Propósito Prático",
        ]}
        rows={[
          [
            "1. FTE Consumido (Carga de Trabalho)",
            "FTE = (Tempo Unitário (min) × Volume Mensal) ÷ 60 ÷ 176",
            "Análise de Capacidade (Capacity Planning)",
            "Mede o esforço humano real exigido por um passo operacional em relação a uma jornada de 176 horas mensais regulamentares.",
          ],
          [
            "2. Custo Mensal do Passo",
            "Custo = FTE Consumido × Custo de 1 FTE",
            "Atribuição de Custo (Activity Based Costing)",
            "Traduz a carga horária em desperdício monetário direto para o OPEX do setor.",
          ],
          [
            "3. Redução de Tempo Unitário",
            "Ganho_Tempo = Tempo_AS_IS − Tempo_TO_BE",
            "Velocidade do Processo (Throughput)",
            "Demonstra de forma unitária a eficácia das otimizações estruturais.",
          ],
          [
            "4. Horas Mensais Liberadas",
            "Horas_Mensais = ((Tempo_AS_IS − Tempo_TO_BE) × Volume Mensal) ÷ 60",
            "Liberação de Carga de Trabalho",
            "Demonstra o somatório de horas de esforço repetitivo poupadas do time operacional a cada mês.",
          ],
          [
            "5. Ganhos de FTE (FTE Economizados)",
            "FTE_Liberado = Horas_Mensais_Liberadas ÷ 176",
            "Eficiência e Redistribuição",
            "Mede a fração exata de recursos humanos que foram libertados de tarefas repetitivas para assumir rotinas mais estratégicas (FTE Up).",
          ],
          [
            "6. ROI de Projetos (Retorno Financeiro)",
            "ROI = ((Saving Anual Previsto − Custo Implantação) ÷ Custo Implantação) × 100",
            "Análise de Investimento (Business Case)",
            "Comprova em termos percentuais a rentabilidade das intervenções operacionais diante do investimento despendido (CAPEX).",
          ],
          [
            "7. Payback (Prazo de Retorno do Investimento)",
            "Payback = Custo de Implantação ÷ (Saving Anual Previsto ÷ 12)",
            "Análise de Risco Financeiro",
            "Calcula o número de meses necessários para que os ganhos de produtividade amortizem integralmente os custos de implantação.",
          ],
          [
            "8. Score de Priorização ICE",
            "Score = ((Impacto_Negocio + Impacto_Cliente + Impacto_Financeiro) ÷ (Esforco_Implantacao + Complexidade_Tecnica)) × 10",
            "Governança de Portfólio",
            "Algoritmo dinâmico (valores de 1 a 100) que ranqueia de forma impessoal os projetos com maior retorno e menor complexidade.",
          ],
          [
            "9. Score de Potencial de Automação",
            "Potencial = ((Alternancia_Telas × 3) + (Digitacao_Manual × 4) + (Repetitividade × 3)) ÷ 10",
            "Triagem de Soluções de RPA",
            "Auxilia a equipe de desenvolvimento a classificar se o processo é ideal para robotização sistêmica baseada em regras.",
          ],
        ]}
      />

      <H2>Exemplo de Cálculo Padrão do Sistema</H2>
      <Card tone="vibra" title="PASSO A PASSO DA MATEMÁTICA DE FTE & ECONOMIA">
        <P>Para cada atividade mapeada na aba Análise do Mapeamento:</P>
        <ol className="list-decimal pl-5 text-[12px] space-y-1 mb-2 font-medium">
          <li>
            Multiplica-se o <strong>Tempo Unitário</strong> (em minutos) pelo{" "}
            <strong>Volume Mensal</strong> daquela atividade para descobrir os minutos de esforço
            totais do mês.
          </li>
          <li>
            Divide-se o resultado por <strong>60 minutos</strong> para encontrar a quantidade de{" "}
            <strong>Horas Mensais</strong> consumidas.
          </li>
          <li>
            Divide-se o total de Horas Mensais por <strong>176 (horas equivalentes a 1 FTE)</strong>{" "}
            para encontrar a equivalência exata de FTEs consumidos no AS-IS.
          </li>
          <li>
            O mesmo cálculo é realizado no cenário projetado (TO-BE). A diferença do somatório de
            FTEs do AS-IS e do TO-BE representa o <strong>FTE Liberado</strong>.
          </li>
        </ol>
        <div className="bg-neutral-900 text-green-400 font-mono p-2.5 rounded text-[11px] mt-2 border border-neutral-700">
          # Caso de Sucesso do Processo de Triagem Fiscal:
          <br />
          Volume Mensal: 12.000 notas fiscais | Tempo Unitário AS-IS: 4 minutos
          <br />
          Tempo Unitário TO-BE (com robô): 0,5 minutos | Custo Médio do Executor: R$ 35,00/hora
          <br />
          <br />
          - Horas Mensais AS-IS: (12.000 * 4) / 60 = 800 horas (4,54 FTE)
          <br />
          - Horas Mensais TO-BE: (12.000 * 0,5) / 60 = 100 horas (0,56 FTE)
          <br />
          - Horas Liberadas Mensalmente: 800 - 100 = 700 horas (Gain: 3,98 FTE)
          <br />- Economia Financeira Anual: 700 horas * R$ 35,00/hora * 12 meses = R$ 294.000,00
          anuais
        </div>
      </Card>
    </>
  );
}

function Insights() {
  return (
    <>
      <H1>Inovação, Diferenciais & Visão de Especialista</H1>
      <P>
        O Escritório de Transformação orgulha-se de usar o framework exclusivo{" "}
        <strong>MC³ (Melhoria Contínua Cognitiva e Conectada)</strong>.
      </P>

      <H2>1. O Conceito Cognitivo do MC³</H2>
      <P>
        Projetos tradicionais de melhoria focam em movimentações físicas e digitação manual simples.
        O framework <strong>MC³</strong> vai além: ele rastreia a carga cognitiva dos processos.
      </P>
      <UL
        items={[
          <>
            <strong>Diferencial Conectado:</strong> O sistema não trabalha isolado. Ele integra em
            tempo real as bases locais de persistência, promovendo agilidade nas atualizações.
          </>,
          <>
            <strong>Foco em Tomada de Decisão:</strong> Analisa onde o executor perde tempo
            raciocinando sobre regras ambíguas e atua com inteligência artificial e regras claras
            para liberar processamento intelectual.
          </>,
        ]}
      />

      <H2>2. Checklist de Qualidade do Mapeamento (O que NÃO fazer)</H2>
      <Tbl
        head={["Prática Ruim", "Por que Evitar", "O que Fazer em Vez disso"]}
        rows={[
          [
            "Mapear sem baseline quantitativo prévio.",
            "Sem números no AS IS, é impossível comprovar cientificamente que a melhoria gerou economia.",
            "Não avance para o TO BE sem registrar o tempo unitário e o volume na aba correspondente.",
          ],
          [
            "Desenhar fluxos TO BE inatingíveis.",
            "Gera frustração na equipe de TI, atrasa entregas e desacredita o programa.",
            "Crie um TO BE incremental, focando primeiro em automações simples com tecnologia disponível.",
          ],
          [
            "Ignorar o plano de sustentação.",
            "Em menos de 3 meses, o setor voltará aos velhos hábitos ineficientes devido à rotatividade e falta de supervisão.",
            "Sempre formalize o responsável pelo indicador de controle na aba Governança.",
          ],
        ]}
      />
    </>
  );
}
