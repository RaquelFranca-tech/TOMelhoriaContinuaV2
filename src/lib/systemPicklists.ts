/**
 * Mapeamento canônico Campo do Sistema ↔ Categoria de Picklist.
 *
 * Sempre que um <PicklistField categoria="..."/> for adicionado no app,
 * registre aqui para que apareça automaticamente em Configurações → Picklists.
 *
 * Esta lista alimenta:
 *  - a aba "Picklists" (mostra ícone de "campo de sistema" e os campos vinculados)
 *  - validações / seeds futuros
 */
export type SystemPicklistDef = {
  categoria: string;
  modulo: "Mapeamento" | "Executivo" | "Equipe" | "Sistema";
  campos: string[]; // labels exibidos nos forms
  multi?: boolean;
  descricao?: string;
  valoresDefault: string[]; // default values for seeding
};

export const SYSTEM_PICKLISTS: SystemPicklistDef[] = [
  // Governança e Papéis (Novos e Refatorados)
  {
    categoria: "Sponsor",
    modulo: "Mapeamento",
    campos: ["Sponsor"],
    valoresDefault: [
      "Sponsor Executivo A",
      "Sponsor Executivo B",
      "Diretoria de Operações",
      "Diretoria Comercial",
    ],
  },
  {
    categoria: "Líder",
    modulo: "Mapeamento",
    campos: ["Líder"],
    valoresDefault: [
      "Líder de Iniciativa A",
      "Líder de Iniciativa B",
      "Coordenador de TI",
      "Coordenador de Negócios",
    ],
  },
  {
    categoria: "Analista",
    modulo: "Mapeamento",
    campos: ["Analista"],
    valoresDefault: [
      "Analista de Processos Sênior",
      "Analista de Processos Pleno",
      "Analista de Sistemas",
      "Analista de Negócios",
    ],
  },
  {
    categoria: "Perfil Vinculado",
    modulo: "Mapeamento",
    campos: ["Perfil Vinculado"],
    valoresDefault: [
      "Diretor(a)",
      "Gerente",
      "Coordenador(a)",
      "Analista",
      "Especialista Lean",
      "Operador(a)",
    ],
  },
  {
    categoria: "Diretoria",
    modulo: "Mapeamento",
    campos: ["Diretoria"],
    valoresDefault: [
      "Diretoria de Operações",
      "Diretoria de Tecnologia",
      "Diretoria Comercial",
      "Diretoria Financeira",
      "Diretoria de Gente e Gestão",
    ],
  },
  {
    categoria: "Diretor(a)",
    modulo: "Mapeamento",
    campos: ["Diretor(a)"],
    valoresDefault: [
      "Diretor de Operações",
      "Diretora de TI",
      "Diretor Financeiro",
      "Diretor Comercial",
    ],
  },
  {
    categoria: "Gerência",
    modulo: "Mapeamento",
    campos: ["Gerência"],
    valoresDefault: [
      "Gerência de Sistemas",
      "Gerência de Operações",
      "Gerência Financeira",
      "Gerência de Gente e Gestão",
    ],
  },
  {
    categoria: "Gerente",
    modulo: "Mapeamento",
    campos: ["Gerente"],
    valoresDefault: [
      "Gerente de TI",
      "Gerente de Operações",
      "Gerente Financeiro",
      "Gerente Geral",
    ],
  },
  {
    categoria: "Vice-Presidência",
    modulo: "Mapeamento",
    campos: ["Vice-Presidência"],
    valoresDefault: ["VP de Negócios", "VP de Operações", "VP de Tecnologia", "VP Financeira"],
  },
  {
    categoria: "Vice-Presidente",
    modulo: "Mapeamento",
    campos: ["Vice-Presidente"],
    valoresDefault: [
      "Vice-Presidente de Operações",
      "Vice-Presidente de Tecnologia",
      "Vice-Presidente Comercial",
    ],
  },
  {
    categoria: "Área",
    modulo: "Mapeamento",
    campos: ["Área Responsável"],
    valoresDefault: [
      "Tecnologia da Informação",
      "Logística e Suprimentos",
      "Financeiro",
      "Recursos Humanos",
      "Jurídico",
      "Comercial",
      "Operações",
    ],
  },
  {
    categoria: "Papel",
    modulo: "Mapeamento",
    campos: ["Papel"],
    valoresDefault: ["Sponsor", "Líder", "Analista", "Colaborador", "Mapeador", "Visualizador"],
  },
  {
    categoria: "Participantes",
    modulo: "Equipe",
    campos: ["Participantes"],
    multi: true,
    descricao: "Participantes da tarefa",
    valoresDefault: [
      "Equipe de Projetos",
      "Equipe de Operações",
      "Equipe de TI",
      "Consultores Externos",
      "Time Lean",
    ],
  },
  {
    categoria: "Colaborador",
    modulo: "Equipe",
    campos: ["Colaborador"],
    descricao: "Colaborador do projeto",
    valoresDefault: [
      "Colaborador Operacional A",
      "Colaborador Operacional B",
      "Consultor Lean",
      "Analista de Processos",
    ],
  },
  {
    categoria: "Para quem",
    modulo: "Equipe",
    campos: ["Para quem"],
    descricao: "Para quem é feita a tarefa",
    valoresDefault: [
      "Área de Negócios",
      "Cliente Interno",
      "Cliente Externo",
      "Diretoria",
      "Parceiro de Negócios",
    ],
  },
  {
    categoria: "Tipo de Tarefa",
    modulo: "Equipe",
    campos: ["Tipo de Tarefa"],
    descricao: "Tipo de tarefa (Agenda, Rotina, etc.)",
    valoresDefault: ["Agenda", "Rotina", "Projeto", "Outro"],
  },

  // Outros campos de Governança legados ou adicionais
  {
    categoria: "Gestor Responsável",
    modulo: "Mapeamento",
    campos: ["Gestor Responsável"],
    valoresDefault: ["Gestor de Área A", "Gestor de Área B", "Gerente de Operações"],
  },
  {
    categoria: "Analista Responsável",
    modulo: "Mapeamento",
    campos: ["Analista Responsável"],
    valoresDefault: ["Analista Responsável A", "Analista Responsável B", "Especialista Lean"],
  },
  {
    categoria: "Cliente do Processo",
    modulo: "Mapeamento",
    campos: ["Cliente do Processo"],
    multi: true,
    valoresDefault: [
      "Cliente Final",
      "Área Cliente",
      "Parceiros Logísticos",
      "Gente e Gestão",
      "Diretoria",
    ],
  },
  {
    categoria: "Processo",
    modulo: "Mapeamento",
    campos: ["Processo"],
    valoresDefault: [
      "Processo de Faturamento",
      "Processo de Abastecimento",
      "Processo de Cadastro",
      "Processo de Suporte",
    ],
  },

  // Status
  {
    categoria: "Status da Iniciativa",
    modulo: "Sistema",
    campos: ["Status da Iniciativa (Formulário, Kanban, Tarefas)"],
    valoresDefault: [
      "Backlog",
      "Priorizada",
      "Em Diagnóstico",
      "Desenvolvimento",
      "Sprints – Dev",
      "Deploy – Entrega",
      "Acompanhamento",
      "Concluída",
      "Despriorizada",
      "Cancelada",
    ],
  },
  {
    categoria: "Status de Projeto",
    modulo: "Sistema",
    campos: ["Status do Projeto"],
    valoresDefault: ["Planejamento", "Em Andamento", "Suspenso", "Concluído", "Atrasado"],
  },
  {
    categoria: "Status de Microprocesso",
    modulo: "Sistema",
    campos: ["Status do Microprocesso"],
    valoresDefault: ["Pendente", "Em Andamento", "Concluído", "Impedido"],
  },
  {
    categoria: "Status da Tarefa",
    modulo: "Sistema",
    campos: ["Status da Tarefa"],
    valoresDefault: ["Pendente", "Em Andamento", "Concluída", "Atrasada", "Bloqueada"],
  },

  // Classificação
  {
    categoria: "Tipo de Melhoria",
    modulo: "Mapeamento",
    campos: ["Tipo de Melhoria"],
    valoresDefault: [
      "Automação RPA",
      "Melhoria de Processo",
      "Eliminação de Desperdício",
      "Novo Sistema",
      "Treinamento",
    ],
  },
  {
    categoria: "Prioridade",
    modulo: "Mapeamento",
    campos: ["Prioridade"],
    valoresDefault: ["Alta", "Média", "Baixa"],
  },
  {
    categoria: "Urgência",
    modulo: "Mapeamento",
    campos: ["Nível de Urgência"],
    valoresDefault: ["Crítica", "Alta", "Média", "Baixa"],
  },
  {
    categoria: "Complexidade do Processo",
    modulo: "Mapeamento",
    campos: ["Complexidade do Processo"],
    valoresDefault: ["Muito Alta", "Alta", "Média", "Baixa", "Muito Baixa"],
  },

  // Diagnóstico
  {
    categoria: "Categorias de Dor",
    modulo: "Mapeamento",
    campos: ["Categoria da Dor"],
    valoresDefault: [
      "Retrabalho Manual",
      "Gargalo de Aprovação",
      "Sistemas não Integrados",
      "Informação Descentralizada",
      "Morosidade no Processamento",
    ],
  },
  {
    categoria: "Frequências",
    modulo: "Mapeamento",
    campos: ["Frequência"],
    valoresDefault: ["Diária", "Semanal", "Mensal", "Sob Demanda", "Anual"],
  },
  {
    categoria: "Sistemas Utilizados",
    modulo: "Mapeamento",
    campos: ["Sistemas Utilizados"],
    multi: true,
    valoresDefault: [
      "SAP",
      "Salesforce",
      "ServiceNow",
      "Excel",
      "Outlook",
      "Teams",
      "Portal Vibra",
      "Sistema Legado",
    ],
  },
  {
    categoria: "Desperdícios Lean",
    modulo: "Mapeamento",
    campos: ["Desperdícios Lean"],
    multi: true,
    valoresDefault: [
      "Superprodução",
      "Tempo de Espera",
      "Transporte desnecessário",
      "Excesso de Processamento",
      "Inventário",
      "Movimentação desnecessária",
      "Defeitos/Retrabalho",
      "Intelecto não utilizado",
    ],
  },

  // Automação
  {
    categoria: "Sistemas Paralelos",
    modulo: "Mapeamento",
    campos: ["Sistemas Paralelos"],
    multi: true,
    valoresDefault: [
      "Planilha local",
      "Controle manual",
      "Anotações físicas",
      "WhatsApp",
      "E-mail de controle",
    ],
  },
  {
    categoria: "Alternância de Telas",
    modulo: "Mapeamento",
    campos: ["Alternância de Telas"],
    multi: true,
    valoresDefault: ["Baixa (1 a 3 telas)", "Média (4 a 6 telas)", "Alta (Mais de 6 telas)"],
  },
  {
    categoria: "Locais de Consulta",
    modulo: "Mapeamento",
    campos: ["Locais de Consulta"],
    multi: true,
    valoresDefault: [
      "Diretório na Rede",
      "E-mail Corporativo",
      "Portal do Cliente",
      "Intranet",
      "Sistema SAP",
    ],
  },
  {
    categoria: "Passos Manuais",
    modulo: "Mapeamento",
    campos: ["Passos Manuais"],
    multi: true,
    valoresDefault: [
      "Digitação de dados",
      "Cópia e cola de planilhas",
      "Validação visual",
      "Envio manual de e-mail",
    ],
  },
  {
    categoria: "Local das Planilhas",
    modulo: "Mapeamento",
    campos: ["Local das Planilhas"],
    multi: true,
    valoresDefault: [
      "Máquina Local",
      "OneDrive Compartilhado",
      "Google Drive",
      "SharePoint da Área",
    ],
  },
  {
    categoria: "Integrações",
    modulo: "Mapeamento",
    campos: ["Integrações Necessárias"],
    multi: true,
    valoresDefault: [
      "API REST / JSON",
      "Arquivo CSV via FTP",
      "WebService SOAP",
      "RPA Dedicado",
      "Acesso Direto ao Banco",
    ],
  },
  {
    categoria: "Quantidade de Regras",
    modulo: "Mapeamento",
    campos: ["Quantidade de Regras"],
    valoresDefault: ["Baixa (Até 5 regras)", "Média (6 a 15 regras)", "Alta (Mais de 15 regras)"],
  },
  {
    categoria: "Volume de Exceções",
    modulo: "Mapeamento",
    campos: ["Volume de Exceções"],
    valoresDefault: ["Baixo (Até 5%)", "Moderado (6% a 15%)", "Alto (Mais de 15%)"],
  },

  // SIPOC
  {
    categoria: "Fornecedores",
    modulo: "Mapeamento",
    campos: ["SIPOC · Fornecedores"],
    multi: true,
    valoresDefault: [
      "Logística Interna",
      "Fornecedor Externo de Insumos",
      "TI Corporativa",
      "Time de Compras",
    ],
  },
  {
    categoria: "Entradas",
    modulo: "Mapeamento",
    campos: ["SIPOC · Entradas"],
    multi: true,
    valoresDefault: [
      "Pedido de Compra",
      "Nota Fiscal de Entrada",
      "Planilha de Programação",
      "Solicitação via Chamado",
    ],
  },
  {
    categoria: "Saídas",
    modulo: "Mapeamento",
    campos: ["SIPOC · Saídas"],
    multi: true,
    valoresDefault: [
      "Produto Entregue",
      "Nota Fiscal Emitida",
      "Relatório de Fechamento",
      "Confirmação via Sistema",
    ],
  },
  {
    categoria: "Clientes",
    modulo: "Mapeamento",
    campos: ["SIPOC · Clientes"],
    multi: true,
    valoresDefault: [
      "Área de Operações",
      "Cliente Externo Vibra",
      "Diretoria Financeira",
      "Time de Planejamento",
    ],
  },
];

export function findSystemPicklist(categoria: string): SystemPicklistDef | undefined {
  return SYSTEM_PICKLISTS.find(
    (s) => s.categoria.localeCompare(categoria, "pt-BR", { sensitivity: "accent" }) === 0,
  );
}
