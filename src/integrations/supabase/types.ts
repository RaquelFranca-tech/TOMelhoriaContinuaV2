export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5";
  };
  public: {
    Tables: {
      agenda: {
        Row: {
          concluida: boolean | null;
          concluida_em: string | null;
          created_at: string;
          created_by: string | null;
          data_evento: string;
          deleted_at: string | null;
          duracao_min: number | null;
          id: string;
          iniciativa_id: string | null;
          notas: string | null;
          observacoes: string | null;
          tipo_reuniao: string | null;
          titulo: string;
          updated_at: string;
        };
        Insert: {
          concluida?: boolean | null;
          concluida_em?: string | null;
          created_at?: string;
          created_by?: string | null;
          data_evento: string;
          deleted_at?: string | null;
          duracao_min?: number | null;
          id?: string;
          iniciativa_id?: string | null;
          notas?: string | null;
          observacoes?: string | null;
          tipo_reuniao?: string | null;
          titulo: string;
          updated_at?: string;
        };
        Update: {
          concluida?: boolean | null;
          concluida_em?: string | null;
          created_at?: string;
          created_by?: string | null;
          data_evento?: string;
          deleted_at?: string | null;
          duracao_min?: number | null;
          id?: string;
          iniciativa_id?: string | null;
          notas?: string | null;
          observacoes?: string | null;
          tipo_reuniao?: string | null;
          titulo?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "agenda_iniciativa_id_fkey";
            columns: ["iniciativa_id"];
            isOneToOne: false;
            referencedRelation: "iniciativas";
            referencedColumns: ["id"];
          },
        ];
      };
      agenda_participantes: {
        Row: {
          agenda_id: string;
          created_at: string;
          id: string;
          minutos_creditados: number | null;
          profile_id: string;
        };
        Insert: {
          agenda_id: string;
          created_at?: string;
          id?: string;
          minutos_creditados?: number | null;
          profile_id: string;
        };
        Update: {
          agenda_id?: string;
          created_at?: string;
          id?: string;
          minutos_creditados?: number | null;
          profile_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "agenda_participantes_agenda_id_fkey";
            columns: ["agenda_id"];
            isOneToOne: false;
            referencedRelation: "agenda";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "agenda_participantes_profile_id_fkey";
            columns: ["profile_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      anexos: {
        Row: {
          acao_id: string | null;
          created_at: string;
          id: string;
          iniciativa_id: string | null;
          microprocesso_id: string | null;
          mime_type: string | null;
          nome: string;
          tamanho_bytes: number | null;
          tarefa_id: string | null;
          uploaded_by: string | null;
          url: string;
        };
        Insert: {
          acao_id?: string | null;
          created_at?: string;
          id?: string;
          iniciativa_id?: string | null;
          microprocesso_id?: string | null;
          mime_type?: string | null;
          nome: string;
          tamanho_bytes?: number | null;
          tarefa_id?: string | null;
          uploaded_by?: string | null;
          url: string;
        };
        Update: {
          acao_id?: string | null;
          created_at?: string;
          id?: string;
          iniciativa_id?: string | null;
          microprocesso_id?: string | null;
          mime_type?: string | null;
          nome?: string;
          tamanho_bytes?: number | null;
          tarefa_id?: string | null;
          uploaded_by?: string | null;
          url?: string;
        };
        Relationships: [
          {
            foreignKeyName: "anexos_acao_id_fkey";
            columns: ["acao_id"];
            isOneToOne: false;
            referencedRelation: "tarefas";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "anexos_iniciativa_id_fkey";
            columns: ["iniciativa_id"];
            isOneToOne: false;
            referencedRelation: "iniciativas";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "anexos_microprocesso_id_fkey";
            columns: ["microprocesso_id"];
            isOneToOne: false;
            referencedRelation: "microprocessos";
            referencedColumns: ["id"];
          },
        ];
      };
      app_configuracoes: {
        Row: {
          chave: string;
          created_at: string;
          updated_at: string;
          valor: Json;
        };
        Insert: {
          chave: string;
          created_at?: string;
          updated_at?: string;
          valor?: Json;
        };
        Update: {
          chave?: string;
          created_at?: string;
          updated_at?: string;
          valor?: Json;
        };
        Relationships: [];
      };
      asis_passos: {
        Row: {
          ator: string | null;
          created_at: string;
          created_by: string | null;
          deleted_at: string | null;
          dor: string | null;
          id: string;
          impacto: string | null;
          iniciativa_id: string;
          ordem: number | null;
          passo: string | null;
          processo: string | null;
          quick_win: boolean | null;
          tempo: number | null;
          ti: boolean | null;
          tipo: string | null;
          updated_at: string;
          volume: number | null;
        };
        Insert: {
          ator?: string | null;
          created_at?: string;
          created_by?: string | null;
          deleted_at?: string | null;
          dor?: string | null;
          id?: string;
          impacto?: string | null;
          iniciativa_id: string;
          ordem?: number | null;
          passo?: string | null;
          processo?: string | null;
          quick_win?: boolean | null;
          tempo?: number | null;
          ti?: boolean | null;
          tipo?: string | null;
          updated_at?: string;
          volume?: number | null;
        };
        Update: {
          ator?: string | null;
          created_at?: string;
          created_by?: string | null;
          deleted_at?: string | null;
          dor?: string | null;
          id?: string;
          impacto?: string | null;
          iniciativa_id?: string;
          ordem?: number | null;
          passo?: string | null;
          processo?: string | null;
          quick_win?: boolean | null;
          tempo?: number | null;
          ti?: boolean | null;
          tipo?: string | null;
          updated_at?: string;
          volume?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "asis_passos_iniciativa_id_fkey";
            columns: ["iniciativa_id"];
            isOneToOne: false;
            referencedRelation: "iniciativas";
            referencedColumns: ["id"];
          },
        ];
      };
      audit_log: {
        Row: {
          acao: string;
          created_at: string;
          id: string;
          payload: Json | null;
          registro_id: string | null;
          tabela: string;
          user_id: string | null;
        };
        Insert: {
          acao: string;
          created_at?: string;
          id?: string;
          payload?: Json | null;
          registro_id?: string | null;
          tabela: string;
          user_id?: string | null;
        };
        Update: {
          acao?: string;
          created_at?: string;
          id?: string;
          payload?: Json | null;
          registro_id?: string | null;
          tabela?: string;
          user_id?: string | null;
        };
        Relationships: [];
      };
      board_widgets: {
        Row: {
          altura: number | null;
          board_id: string;
          config: Json | null;
          created_at: string;
          id: string;
          largura: number | null;
          pos_x: number | null;
          pos_y: number | null;
          tipo: string;
          titulo: string | null;
          updated_at: string;
        };
        Insert: {
          altura?: number | null;
          board_id: string;
          config?: Json | null;
          created_at?: string;
          id?: string;
          largura?: number | null;
          pos_x?: number | null;
          pos_y?: number | null;
          tipo: string;
          titulo?: string | null;
          updated_at?: string;
        };
        Update: {
          altura?: number | null;
          board_id?: string;
          config?: Json | null;
          created_at?: string;
          id?: string;
          largura?: number | null;
          pos_x?: number | null;
          pos_y?: number | null;
          tipo?: string;
          titulo?: string | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "board_widgets_board_id_fkey";
            columns: ["board_id"];
            isOneToOne: false;
            referencedRelation: "boards";
            referencedColumns: ["id"];
          },
        ];
      };
      boards: {
        Row: {
          aba_destino: string | null;
          concluido_em: string | null;
          created_at: string;
          created_by: string | null;
          deleted_at: string | null;
          descricao: string | null;
          id: string;
          layout: Json | null;
          nome: string;
          publico: boolean | null;
          situacao: string;
          tipo: string | null;
          updated_at: string;
        };
        Insert: {
          aba_destino?: string | null;
          concluido_em?: string | null;
          created_at?: string;
          created_by?: string | null;
          deleted_at?: string | null;
          descricao?: string | null;
          id?: string;
          layout?: Json | null;
          nome: string;
          publico?: boolean | null;
          situacao?: string;
          tipo?: string | null;
          updated_at?: string;
        };
        Update: {
          aba_destino?: string | null;
          concluido_em?: string | null;
          created_at?: string;
          created_by?: string | null;
          deleted_at?: string | null;
          descricao?: string | null;
          id?: string;
          layout?: Json | null;
          nome?: string;
          publico?: boolean | null;
          situacao?: string;
          tipo?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      bpmn_arquivos: {
        Row: {
          anotacoes: string | null;
          created_at: string;
          created_by: string | null;
          deleted_at: string | null;
          id: string;
          iniciativa_id: string;
          nome: string | null;
          tipo: string;
          updated_at: string;
          url: string;
        };
        Insert: {
          anotacoes?: string | null;
          created_at?: string;
          created_by?: string | null;
          deleted_at?: string | null;
          id?: string;
          iniciativa_id: string;
          nome?: string | null;
          tipo: string;
          updated_at?: string;
          url: string;
        };
        Update: {
          anotacoes?: string | null;
          created_at?: string;
          created_by?: string | null;
          deleted_at?: string | null;
          id?: string;
          iniciativa_id?: string;
          nome?: string | null;
          tipo?: string;
          updated_at?: string;
          url?: string;
        };
        Relationships: [
          {
            foreignKeyName: "bpmn_arquivos_iniciativa_id_fkey";
            columns: ["iniciativa_id"];
            isOneToOne: false;
            referencedRelation: "iniciativas";
            referencedColumns: ["id"];
          },
        ];
      };
      causa_raiz: {
        Row: {
          conteudo: Json;
          created_at: string;
          created_by: string | null;
          id: string;
          iniciativa_id: string;
          metodologia: string;
          updated_at: string;
        };
        Insert: {
          conteudo?: Json;
          created_at?: string;
          created_by?: string | null;
          id?: string;
          iniciativa_id: string;
          metodologia: string;
          updated_at?: string;
        };
        Update: {
          conteudo?: Json;
          created_at?: string;
          created_by?: string | null;
          id?: string;
          iniciativa_id?: string;
          metodologia?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "causa_raiz_iniciativa_id_fkey";
            columns: ["iniciativa_id"];
            isOneToOne: false;
            referencedRelation: "iniciativas";
            referencedColumns: ["id"];
          },
        ];
      };
      comentarios: {
        Row: {
          acao_id: string | null;
          autor_id: string;
          conteudo: string;
          created_at: string;
          id: string;
          iniciativa_id: string | null;
          tarefa_id: string | null;
          updated_at: string;
        };
        Insert: {
          acao_id?: string | null;
          autor_id: string;
          conteudo: string;
          created_at?: string;
          id?: string;
          iniciativa_id?: string | null;
          tarefa_id?: string | null;
          updated_at?: string;
        };
        Update: {
          acao_id?: string | null;
          autor_id?: string;
          conteudo?: string;
          created_at?: string;
          id?: string;
          iniciativa_id?: string | null;
          tarefa_id?: string | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "comentarios_acao_id_fkey";
            columns: ["acao_id"];
            isOneToOne: false;
            referencedRelation: "tarefas";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "comentarios_iniciativa_id_fkey";
            columns: ["iniciativa_id"];
            isOneToOne: false;
            referencedRelation: "iniciativas";
            referencedColumns: ["id"];
          },
        ];
      };
      controle_sustentacao: {
        Row: {
          created_at: string;
          created_by: string | null;
          data_referencia: string;
          deleted_at: string | null;
          desvio: number | null;
          fte_preservado: number | null;
          ganho_financeiro: number | null;
          horas_economizadas: number | null;
          id: string;
          iniciativa_id: string;
          observacoes: string | null;
          status: string | null;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          created_by?: string | null;
          data_referencia?: string;
          deleted_at?: string | null;
          desvio?: number | null;
          fte_preservado?: number | null;
          ganho_financeiro?: number | null;
          horas_economizadas?: number | null;
          id?: string;
          iniciativa_id: string;
          observacoes?: string | null;
          status?: string | null;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          created_by?: string | null;
          data_referencia?: string;
          deleted_at?: string | null;
          desvio?: number | null;
          fte_preservado?: number | null;
          ganho_financeiro?: number | null;
          horas_economizadas?: number | null;
          id?: string;
          iniciativa_id?: string;
          observacoes?: string | null;
          status?: string | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "controle_sustentacao_iniciativa_id_fkey";
            columns: ["iniciativa_id"];
            isOneToOne: false;
            referencedRelation: "iniciativas";
            referencedColumns: ["id"];
          },
        ];
      };
      dmaic: {
        Row: {
          analyze_phase: string | null;
          control_phase: string | null;
          created_at: string;
          created_by: string | null;
          define_phase: string | null;
          deleted_at: string | null;
          id: string;
          improve_phase: string | null;
          iniciativa_id: string;
          measure_phase: string | null;
          updated_at: string;
        };
        Insert: {
          analyze_phase?: string | null;
          control_phase?: string | null;
          created_at?: string;
          created_by?: string | null;
          define_phase?: string | null;
          deleted_at?: string | null;
          id?: string;
          improve_phase?: string | null;
          iniciativa_id: string;
          measure_phase?: string | null;
          updated_at?: string;
        };
        Update: {
          analyze_phase?: string | null;
          control_phase?: string | null;
          created_at?: string;
          created_by?: string | null;
          define_phase?: string | null;
          deleted_at?: string | null;
          id?: string;
          improve_phase?: string | null;
          iniciativa_id?: string;
          measure_phase?: string | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "dmaic_iniciativa_id_fkey";
            columns: ["iniciativa_id"];
            isOneToOne: true;
            referencedRelation: "iniciativas";
            referencedColumns: ["id"];
          },
        ];
      };
      equipe: {
        Row: {
          area: string | null;
          ativo: boolean;
          card_x: number;
          card_y: number;
          created_at: string;
          diretoria: string | null;
          extras: Json;
          id: string;
          ordem: number | null;
          papel_macroprocesso: string | null;
          profile_id: string | null;
          projeto_id: string | null;
          updated_at: string;
        };
        Insert: {
          area?: string | null;
          ativo?: boolean;
          card_x?: number;
          card_y?: number;
          created_at?: string;
          diretoria?: string | null;
          extras?: Json;
          id?: string;
          ordem?: number | null;
          papel_macroprocesso?: string | null;
          profile_id?: string | null;
          projeto_id?: string | null;
          updated_at?: string;
        };
        Update: {
          area?: string | null;
          ativo?: boolean;
          card_x?: number;
          card_y?: number;
          created_at?: string;
          diretoria?: string | null;
          extras?: Json;
          id?: string;
          ordem?: number | null;
          papel_macroprocesso?: string | null;
          profile_id?: string | null;
          projeto_id?: string | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "equipe_profile_id_fkey";
            columns: ["profile_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "equipe_projeto_id_fkey";
            columns: ["projeto_id"];
            isOneToOne: false;
            referencedRelation: "projetos";
            referencedColumns: ["id"];
          },
        ];
      };
      fluxo_rascunho: {
        Row: {
          canvas: Json | null;
          created_at: string;
          created_by: string | null;
          deleted_at: string | null;
          id: string;
          iniciativa_id: string;
          updated_at: string;
        };
        Insert: {
          canvas?: Json | null;
          created_at?: string;
          created_by?: string | null;
          deleted_at?: string | null;
          id?: string;
          iniciativa_id: string;
          updated_at?: string;
        };
        Update: {
          canvas?: Json | null;
          created_at?: string;
          created_by?: string | null;
          deleted_at?: string | null;
          id?: string;
          iniciativa_id?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "fluxo_rascunho_iniciativa_id_fkey";
            columns: ["iniciativa_id"];
            isOneToOne: true;
            referencedRelation: "iniciativas";
            referencedColumns: ["id"];
          },
        ];
      };
      formulas: {
        Row: {
          contexto: string | null;
          created_at: string;
          descricao: string | null;
          expressao: string;
          id: string;
          nome: string;
          updated_at: string;
          variaveis: Json | null;
        };
        Insert: {
          contexto?: string | null;
          created_at?: string;
          descricao?: string | null;
          expressao: string;
          id?: string;
          nome: string;
          updated_at?: string;
          variaveis?: Json | null;
        };
        Update: {
          contexto?: string | null;
          created_at?: string;
          descricao?: string | null;
          expressao?: string;
          id?: string;
          nome?: string;
          updated_at?: string;
          variaveis?: Json | null;
        };
        Relationships: [];
      };
      indicador_valores: {
        Row: {
          ano: number;
          created_at: string;
          id: string;
          indicador_id: string;
          mes: number;
          meta: number | null;
          realizado: number | null;
        };
        Insert: {
          ano: number;
          created_at?: string;
          id?: string;
          indicador_id: string;
          mes: number;
          meta?: number | null;
          realizado?: number | null;
        };
        Update: {
          ano?: number;
          created_at?: string;
          id?: string;
          indicador_id?: string;
          mes?: number;
          meta?: number | null;
          realizado?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "indicador_valores_indicador_id_fkey";
            columns: ["indicador_id"];
            isOneToOne: false;
            referencedRelation: "indicadores";
            referencedColumns: ["id"];
          },
        ];
      };
      indicadores: {
        Row: {
          cor_meta: string | null;
          cor_realizado: string | null;
          created_at: string;
          created_by: string | null;
          deleted_at: string | null;
          descricao: string | null;
          formula: string | null;
          id: string;
          iniciativa_id: string | null;
          meta_anual: number | null;
          nome: string;
          projeto_id: string | null;
          tipo_grafico: string | null;
          unidade: string | null;
          updated_at: string;
        };
        Insert: {
          cor_meta?: string | null;
          cor_realizado?: string | null;
          created_at?: string;
          created_by?: string | null;
          deleted_at?: string | null;
          descricao?: string | null;
          formula?: string | null;
          id?: string;
          iniciativa_id?: string | null;
          meta_anual?: number | null;
          nome: string;
          projeto_id?: string | null;
          tipo_grafico?: string | null;
          unidade?: string | null;
          updated_at?: string;
        };
        Update: {
          cor_meta?: string | null;
          cor_realizado?: string | null;
          created_at?: string;
          created_by?: string | null;
          deleted_at?: string | null;
          descricao?: string | null;
          formula?: string | null;
          id?: string;
          iniciativa_id?: string | null;
          meta_anual?: number | null;
          nome?: string;
          projeto_id?: string | null;
          tipo_grafico?: string | null;
          unidade?: string | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "indicadores_iniciativa_id_fkey";
            columns: ["iniciativa_id"];
            isOneToOne: false;
            referencedRelation: "iniciativas";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "indicadores_projeto_id_fkey";
            columns: ["projeto_id"];
            isOneToOne: false;
            referencedRelation: "projetos";
            referencedColumns: ["id"];
          },
        ];
      };
      iniciativas: {
        Row: {
          alternancia_telas: string[] | null;
          analista_id: string | null;
          analista_responsavel: string | null;
          area_responsavel: string | null;
          as_is: string | null;
          atividade_manual: boolean | null;
          automacao_sugerida: string | null;
          categoria_dor: string | null;
          causa_raiz_inicial: string | null;
          cliente_processo: string[] | null;
          codigo: string | null;
          complexidade: number | null;
          complexidade_automacao: string | null;
          complexidade_automacao_score: number | null;
          complexidade_processo: string | null;
          copia_cola: boolean | null;
          created_at: string;
          created_by: string | null;
          custo_hora: number | null;
          custo_implementacao: number | null;
          data_diagnostico: string | null;
          data_fim_prevista: string | null;
          data_fim_real: string | null;
          data_inicio: string | null;
          data_inicio_real: string | null;
          decisoes_tomadas: string | null;
          deleted_at: string | null;
          dep_pessoa: number | null;
          dep_pessoa_chave: boolean | null;
          dependencia_ti: boolean | null;
          descricao: string | null;
          desperdicios_lean: Json | null;
          digitacao_manual: boolean | null;
          diretoria: string | null;
          dor_identificada: string | null;
          esforco: number | null;
          evidencia_atual: string | null;
          evidencia_futura: string | null;
          excel_paralelo: boolean | null;
          execucoes_dia: number | null;
          execucoes_mes: number | null;
          execucoes_semana: number | null;
          expectativa_produtividade: number | null;
          frequencia: string | null;
          fte_participacao: number | null;
          ganho_financeiro: number | null;
          ganho_horas: number | null;
          gerencia: string | null;
          gestor_responsavel: string | null;
          hc_alcancado: number | null;
          hc_atual: number | null;
          hc_estimado: number | null;
          hc_liberado: number | null;
          horas_futuras_mes: number | null;
          horas_gastas_mes: number | null;
          id: string;
          impacto_cliente: number | null;
          impacto_cliente_sn: boolean | null;
          impacto_compliance_sn: boolean | null;
          impacto_financeiro: number | null;
          impacto_financeiro_sn: boolean | null;
          impacto_negocio: number | null;
          impactos_qualitativos: string | null;
          impedimento: string | null;
          integracoes: Json | null;
          lider_id: string | null;
          links_relacionados: string | null;
          locais_consulta: string[] | null;
          local_planilhas: string[] | null;
          memoria_roi: string | null;
          motivo_reducao: string | null;
          multas_evitadas: number | null;
          objetivo_processo: string | null;
          observacoes: string | null;
          passos_manuais: string[] | null;
          percentual_avanco: number | null;
          pessoas_envolvidas: number | null;
          potencial_automacao: string | null;
          prioridade: string | null;
          processo: string | null;
          projeto_id: string;
          qtd_planilhas: number | null;
          qtd_regras: string | null;
          responsavel_id: string | null;
          retrabalho: number | null;
          risco_operacional: number | null;
          roi: number | null;
          saving_previsto: number | null;
          saving_realizado: number | null;
          score: number | null;
          score_automacao: number | null;
          sem_substituto: number | null;
          sistemas: Json | null;
          sistemas_paralelos: string[] | null;
          sla_existe: boolean | null;
          sla_min: number | null;
          solucao_proposta: string | null;
          sponsor_id: string | null;
          status: string | null;
          substituto_treinado: boolean | null;
          substitutos_detalhes: string | null;
          taxa_erro: number | null;
          tempo_capacitacao: number | null;
          tempo_espera: number | null;
          tempo_futuro: number | null;
          tempo_ideal: number | null;
          tempo_max: number | null;
          tempo_min: number | null;
          tempo_treino: number | null;
          tipo_melhoria: string | null;
          titulo: string;
          to_be: string | null;
          updated_at: string;
          urgencia: string | null;
          vice_presidencia: string | null;
          vice_presidente: string | null;
          diretor: string | null;
          gerente: string | null;
          papel: string | null;
          area: string | null;
          volume_excecoes: string | null;
          volume_financeiro: number | null;
        };
        Insert: {
          alternancia_telas?: string[] | null;
          analista_id?: string | null;
          analista_responsavel?: string | null;
          area_responsavel?: string | null;
          as_is?: string | null;
          atividade_manual?: boolean | null;
          automacao_sugerida?: string | null;
          categoria_dor?: string | null;
          causa_raiz_inicial?: string | null;
          cliente_processo?: string[] | null;
          codigo?: string | null;
          complexidade?: number | null;
          complexidade_automacao?: string | null;
          complexidade_automacao_score?: number | null;
          complexidade_processo?: string | null;
          copia_cola?: boolean | null;
          created_at?: string;
          created_by?: string | null;
          custo_hora?: number | null;
          custo_implementacao?: number | null;
          data_diagnostico?: string | null;
          data_fim_prevista?: string | null;
          data_fim_real?: string | null;
          data_inicio?: string | null;
          data_inicio_real?: string | null;
          decisoes_tomadas?: string | null;
          deleted_at?: string | null;
          dep_pessoa?: number | null;
          dep_pessoa_chave?: boolean | null;
          dependencia_ti?: boolean | null;
          descricao?: string | null;
          desperdicios_lean?: Json | null;
          digitacao_manual?: boolean | null;
          diretoria?: string | null;
          dor_identificada?: string | null;
          esforco?: number | null;
          evidencia_atual?: string | null;
          evidencia_futura?: string | null;
          excel_paralelo?: boolean | null;
          execucoes_dia?: number | null;
          execucoes_mes?: number | null;
          execucoes_semana?: number | null;
          expectativa_produtividade?: number | null;
          frequencia?: string | null;
          fte_participacao?: number | null;
          ganho_financeiro?: number | null;
          ganho_horas?: number | null;
          gerencia?: string | null;
          gestor_responsavel?: string | null;
          hc_alcancado?: number | null;
          hc_atual?: number | null;
          hc_estimado?: number | null;
          hc_liberado?: number | null;
          horas_futuras_mes?: number | null;
          horas_gastas_mes?: number | null;
          id?: string;
          impacto_cliente?: number | null;
          impacto_cliente_sn?: boolean | null;
          impacto_compliance_sn?: boolean | null;
          impacto_financeiro?: number | null;
          impacto_financeiro_sn?: boolean | null;
          impacto_negocio?: number | null;
          impactos_qualitativos?: string | null;
          impedimento?: string | null;
          integracoes?: Json | null;
          lider_id?: string | null;
          links_relacionados?: string | null;
          locais_consulta?: string[] | null;
          local_planilhas?: string[] | null;
          memoria_roi?: string | null;
          motivo_reducao?: string | null;
          multas_evitadas?: number | null;
          objetivo_processo?: string | null;
          observacoes?: string | null;
          passos_manuais?: string[] | null;
          percentual_avanco?: number | null;
          pessoas_envolvidas?: number | null;
          potencial_automacao?: string | null;
          prioridade?: string | null;
          processo?: string | null;
          projeto_id: string;
          qtd_planilhas?: number | null;
          qtd_regras?: string | null;
          responsavel_id?: string | null;
          retrabalho?: number | null;
          risco_operacional?: number | null;
          roi?: number | null;
          saving_previsto?: number | null;
          saving_realizado?: number | null;
          score?: number | null;
          score_automacao?: number | null;
          sem_substituto?: number | null;
          sistemas?: Json | null;
          sistemas_paralelos?: string[] | null;
          sla_existe?: boolean | null;
          sla_min?: number | null;
          solucao_proposta?: string | null;
          sponsor_id?: string | null;
          status?: string | null;
          substituto_treinado?: boolean | null;
          substitutos_detalhes?: string | null;
          taxa_erro?: number | null;
          tempo_capacitacao?: number | null;
          tempo_espera?: number | null;
          tempo_futuro?: number | null;
          tempo_ideal?: number | null;
          tempo_max?: number | null;
          tempo_min?: number | null;
          tempo_treino?: number | null;
          tipo_melhoria?: string | null;
          titulo: string;
          to_be?: string | null;
          updated_at?: string;
          urgencia?: string | null;
          vice_presidencia?: string | null;
          vice_presidente?: string | null;
          diretor?: string | null;
          gerente?: string | null;
          papel?: string | null;
          area?: string | null;
          volume_excecoes?: string | null;
          volume_financeiro?: number | null;
        };
        Update: {
          alternancia_telas?: string[] | null;
          analista_id?: string | null;
          analista_responsavel?: string | null;
          area_responsavel?: string | null;
          as_is?: string | null;
          atividade_manual?: boolean | null;
          automacao_sugerida?: string | null;
          categoria_dor?: string | null;
          causa_raiz_inicial?: string | null;
          cliente_processo?: string[] | null;
          codigo?: string | null;
          complexidade?: number | null;
          complexidade_automacao?: string | null;
          complexidade_automacao_score?: number | null;
          complexidade_processo?: string | null;
          copia_cola?: boolean | null;
          created_at?: string;
          created_by?: string | null;
          custo_hora?: number | null;
          custo_implementacao?: number | null;
          data_diagnostico?: string | null;
          data_fim_prevista?: string | null;
          data_fim_real?: string | null;
          data_inicio?: string | null;
          data_inicio_real?: string | null;
          decisoes_tomadas?: string | null;
          deleted_at?: string | null;
          dep_pessoa?: number | null;
          dep_pessoa_chave?: boolean | null;
          dependencia_ti?: boolean | null;
          descricao?: string | null;
          desperdicios_lean?: Json | null;
          digitacao_manual?: boolean | null;
          diretoria?: string | null;
          dor_identificada?: string | null;
          esforco?: number | null;
          evidencia_atual?: string | null;
          evidencia_futura?: string | null;
          excel_paralelo?: boolean | null;
          execucoes_dia?: number | null;
          execucoes_mes?: number | null;
          execucoes_semana?: number | null;
          expectativa_produtividade?: number | null;
          frequencia?: string | null;
          fte_participacao?: number | null;
          ganho_financeiro?: number | null;
          ganho_horas?: number | null;
          gerencia?: string | null;
          gestor_responsavel?: string | null;
          hc_alcancado?: number | null;
          hc_atual?: number | null;
          hc_estimado?: number | null;
          hc_liberado?: number | null;
          horas_futuras_mes?: number | null;
          horas_gastas_mes?: number | null;
          id?: string;
          impacto_cliente?: number | null;
          impacto_cliente_sn?: boolean | null;
          impacto_compliance_sn?: boolean | null;
          impacto_financeiro?: number | null;
          impacto_financeiro_sn?: boolean | null;
          impacto_negocio?: number | null;
          impactos_qualitativos?: string | null;
          impedimento?: string | null;
          integracoes?: Json | null;
          lider_id?: string | null;
          links_relacionados?: string | null;
          locais_consulta?: string[] | null;
          local_planilhas?: string[] | null;
          memoria_roi?: string | null;
          motivo_reducao?: string | null;
          multas_evitadas?: number | null;
          objetivo_processo?: string | null;
          observacoes?: string | null;
          passos_manuais?: string[] | null;
          percentual_avanco?: number | null;
          pessoas_envolvidas?: number | null;
          potencial_automacao?: string | null;
          prioridade?: string | null;
          processo?: string | null;
          projeto_id?: string;
          qtd_planilhas?: number | null;
          qtd_regras?: string | null;
          responsavel_id?: string | null;
          retrabalho?: number | null;
          risco_operacional?: number | null;
          roi?: number | null;
          saving_previsto?: number | null;
          saving_realizado?: number | null;
          score?: number | null;
          score_automacao?: number | null;
          sem_substituto?: number | null;
          sistemas?: Json | null;
          sistemas_paralelos?: string[] | null;
          sla_existe?: boolean | null;
          sla_min?: number | null;
          solucao_proposta?: string | null;
          sponsor_id?: string | null;
          status?: string | null;
          substituto_treinado?: boolean | null;
          substitutos_detalhes?: string | null;
          taxa_erro?: number | null;
          tempo_capacitacao?: number | null;
          tempo_espera?: number | null;
          tempo_futuro?: number | null;
          tempo_ideal?: number | null;
          tempo_max?: number | null;
          tempo_min?: number | null;
          tempo_treino?: number | null;
          tipo_melhoria?: string | null;
          titulo?: string;
          to_be?: string | null;
          updated_at?: string;
          urgencia?: string | null;
          vice_presidencia?: string | null;
          vice_presidente?: string | null;
          diretor?: string | null;
          gerente?: string | null;
          papel?: string | null;
          area?: string | null;
          volume_excecoes?: string | null;
          volume_financeiro?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "iniciativas_analista_id_fkey";
            columns: ["analista_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "iniciativas_lider_id_fkey";
            columns: ["lider_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "iniciativas_responsavel_id_fkey";
            columns: ["responsavel_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "iniciativas_sponsor_id_fkey";
            columns: ["sponsor_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      kaizen: {
        Row: {
          acao: string | null;
          causa: string | null;
          created_at: string;
          created_by: string | null;
          data_evento: string | null;
          deleted_at: string | null;
          id: string;
          iniciativa_id: string | null;
          meta: string | null;
          problema: string | null;
          responsavel_id: string | null;
          resultado: string | null;
          updated_at: string;
        };
        Insert: {
          acao?: string | null;
          causa?: string | null;
          created_at?: string;
          created_by?: string | null;
          data_evento?: string | null;
          deleted_at?: string | null;
          id?: string;
          iniciativa_id?: string | null;
          meta?: string | null;
          problema?: string | null;
          responsavel_id?: string | null;
          resultado?: string | null;
          updated_at?: string;
        };
        Update: {
          acao?: string | null;
          causa?: string | null;
          created_at?: string;
          created_by?: string | null;
          data_evento?: string | null;
          deleted_at?: string | null;
          id?: string;
          iniciativa_id?: string | null;
          meta?: string | null;
          problema?: string | null;
          responsavel_id?: string | null;
          resultado?: string | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "kaizen_iniciativa_id_fkey";
            columns: ["iniciativa_id"];
            isOneToOne: false;
            referencedRelation: "iniciativas";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "kaizen_responsavel_id_fkey";
            columns: ["responsavel_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      kanban_historico: {
        Row: {
          created_at: string;
          id: string;
          iniciativa_id: string;
          movido_por: string | null;
          status_de: string | null;
          status_para: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          iniciativa_id: string;
          movido_por?: string | null;
          status_de?: string | null;
          status_para: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          iniciativa_id?: string;
          movido_por?: string | null;
          status_de?: string | null;
          status_para?: string;
        };
        Relationships: [
          {
            foreignKeyName: "kanban_historico_iniciativa_id_fkey";
            columns: ["iniciativa_id"];
            isOneToOne: false;
            referencedRelation: "iniciativas";
            referencedColumns: ["id"];
          },
        ];
      };
      lean_avaliacoes: {
        Row: {
          created_at: string;
          created_by: string | null;
          defeitos: number | null;
          deleted_at: string | null;
          espera: number | null;
          estoque: number | null;
          id: string;
          iniciativa_id: string;
          movimentacao: number | null;
          observacoes: string | null;
          superprocessamento: number | null;
          superproducao: number | null;
          talento: number | null;
          transporte: number | null;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          created_by?: string | null;
          defeitos?: number | null;
          deleted_at?: string | null;
          espera?: number | null;
          estoque?: number | null;
          id?: string;
          iniciativa_id: string;
          movimentacao?: number | null;
          observacoes?: string | null;
          superprocessamento?: number | null;
          superproducao?: number | null;
          talento?: number | null;
          transporte?: number | null;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          created_by?: string | null;
          defeitos?: number | null;
          deleted_at?: string | null;
          espera?: number | null;
          estoque?: number | null;
          id?: string;
          iniciativa_id?: string;
          movimentacao?: number | null;
          observacoes?: string | null;
          superprocessamento?: number | null;
          superproducao?: number | null;
          talento?: number | null;
          transporte?: number | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "lean_avaliacoes_iniciativa_id_fkey";
            columns: ["iniciativa_id"];
            isOneToOne: true;
            referencedRelation: "iniciativas";
            referencedColumns: ["id"];
          },
        ];
      };
      mc3_registros: {
        Row: {
          acoes: string | null;
          atitude_inovadora: string | null;
          categoria_diferenciada: string | null;
          contribuicao: string | null;
          created_at: string;
          created_by: string | null;
          custo: number | null;
          deleted_at: string | null;
          dor: string | null;
          ferramentas: Json | null;
          id: string;
          iniciativa_id: string | null;
          kpi_humano: string;
          pessoas_envolvidas: Json | null;
          profile_id: string;
          projeto_id: string | null;
          responsabilidades: string | null;
          resultado_imediato: string | null;
          solucao: string | null;
          status: string | null;
          tags: Json | null;
          tempo_dedicado_min: number | null;
          tipo_esforco: string | null;
          updated_at: string;
        };
        Insert: {
          acoes?: string | null;
          atitude_inovadora?: string | null;
          categoria_diferenciada?: string | null;
          contribuicao?: string | null;
          created_at?: string;
          created_by?: string | null;
          custo?: number | null;
          deleted_at?: string | null;
          dor?: string | null;
          ferramentas?: Json | null;
          id?: string;
          iniciativa_id?: string | null;
          kpi_humano: string;
          pessoas_envolvidas?: Json | null;
          profile_id: string;
          projeto_id?: string | null;
          responsabilidades?: string | null;
          resultado_imediato?: string | null;
          solucao?: string | null;
          status?: string | null;
          tags?: Json | null;
          tempo_dedicado_min?: number | null;
          tipo_esforco?: string | null;
          updated_at?: string;
        };
        Update: {
          acoes?: string | null;
          atitude_inovadora?: string | null;
          categoria_diferenciada?: string | null;
          contribuicao?: string | null;
          created_at?: string;
          created_by?: string | null;
          custo?: number | null;
          deleted_at?: string | null;
          dor?: string | null;
          ferramentas?: Json | null;
          id?: string;
          iniciativa_id?: string | null;
          kpi_humano?: string;
          pessoas_envolvidas?: Json | null;
          profile_id?: string;
          projeto_id?: string | null;
          responsabilidades?: string | null;
          resultado_imediato?: string | null;
          solucao?: string | null;
          status?: string | null;
          tags?: Json | null;
          tempo_dedicado_min?: number | null;
          tipo_esforco?: string | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "mc3_registros_iniciativa_id_fkey";
            columns: ["iniciativa_id"];
            isOneToOne: false;
            referencedRelation: "iniciativas";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "mc3_registros_profile_id_fkey";
            columns: ["profile_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      microprocessos: {
        Row: {
          area_responsavel: string | null;
          areas_envolvidas: Json | null;
          asis_areas: string | null;
          asis_clientes: string | null;
          asis_entradas: string | null;
          asis_esperas: string | null;
          asis_fluxo: string | null;
          asis_fornecedores: string | null;
          asis_gargalos: string | null;
          asis_problemas: string | null;
          asis_retrabalhos: string | null;
          asis_saidas: string | null;
          asis_sistemas: Json | null;
          baseline_atual: number | null;
          beneficios: Json | null;
          categoria: string | null;
          codigo: string | null;
          created_at: string;
          created_by: string | null;
          custo_atual: number | null;
          custo_futuro: number | null;
          data_fim_prevista: string | null;
          data_fim_real: string | null;
          data_inicio: string | null;
          deleted_at: string | null;
          descricao: string | null;
          diag_causa_raiz: string | null;
          diag_impacto: string | null;
          diag_oportunidade: string | null;
          diag_problema: string | null;
          diag_risco: string | null;
          escopo: string | null;
          extras: Json | null;
          hc_atual: number | null;
          hc_futuro: number | null;
          id: string;
          iniciativa_id: string;
          justificativa: string | null;
          lead_time_atual: number | null;
          lead_time_futuro: number | null;
          lider_id: string | null;
          marcos: Json | null;
          meta_futura: number | null;
          objetivo: string | null;
          participantes: Json | null;
          percentual_avanco: number | null;
          percentual_evolucao: number | null;
          prioridade: string | null;
          responsavel_id: string | null;
          saving_previsto: number | null;
          sipoc_customers: string | null;
          sipoc_inputs: string | null;
          sipoc_outputs: string | null;
          sipoc_process: string | null;
          sipoc_suppliers: string | null;
          sponsor_id: string | null;
          status: string | null;
          titulo: string;
          tobe_automacoes: string | null;
          tobe_eliminacoes: string | null;
          tobe_fluxo: string | null;
          tobe_ia: string | null;
          tobe_melhorias: string | null;
          tobe_simplificacoes: string | null;
          updated_at: string;
          valor_atual: number | null;
          valor_projetado: number | null;
          volume_atual: number | null;
          volume_futuro: number | null;
        };
        Insert: {
          area_responsavel?: string | null;
          areas_envolvidas?: Json | null;
          asis_areas?: string | null;
          asis_clientes?: string | null;
          asis_entradas?: string | null;
          asis_esperas?: string | null;
          asis_fluxo?: string | null;
          asis_fornecedores?: string | null;
          asis_gargalos?: string | null;
          asis_problemas?: string | null;
          asis_retrabalhos?: string | null;
          asis_saidas?: string | null;
          asis_sistemas?: Json | null;
          baseline_atual?: number | null;
          beneficios?: Json | null;
          categoria?: string | null;
          codigo?: string | null;
          created_at?: string;
          created_by?: string | null;
          custo_atual?: number | null;
          custo_futuro?: number | null;
          data_fim_prevista?: string | null;
          data_fim_real?: string | null;
          data_inicio?: string | null;
          deleted_at?: string | null;
          descricao?: string | null;
          diag_causa_raiz?: string | null;
          diag_impacto?: string | null;
          diag_oportunidade?: string | null;
          diag_problema?: string | null;
          diag_risco?: string | null;
          escopo?: string | null;
          extras?: Json | null;
          hc_atual?: number | null;
          hc_futuro?: number | null;
          id?: string;
          iniciativa_id: string;
          justificativa?: string | null;
          lead_time_atual?: number | null;
          lead_time_futuro?: number | null;
          lider_id?: string | null;
          marcos?: Json | null;
          meta_futura?: number | null;
          objetivo?: string | null;
          participantes?: Json | null;
          percentual_avanco?: number | null;
          percentual_evolucao?: number | null;
          prioridade?: string | null;
          responsavel_id?: string | null;
          saving_previsto?: number | null;
          sipoc_customers?: string | null;
          sipoc_inputs?: string | null;
          sipoc_outputs?: string | null;
          sipoc_process?: string | null;
          sipoc_suppliers?: string | null;
          sponsor_id?: string | null;
          status?: string | null;
          titulo: string;
          tobe_automacoes?: string | null;
          tobe_eliminacoes?: string | null;
          tobe_fluxo?: string | null;
          tobe_ia?: string | null;
          tobe_melhorias?: string | null;
          tobe_simplificacoes?: string | null;
          updated_at?: string;
          valor_atual?: number | null;
          valor_projetado?: number | null;
          volume_atual?: number | null;
          volume_futuro?: number | null;
        };
        Update: {
          area_responsavel?: string | null;
          areas_envolvidas?: Json | null;
          asis_areas?: string | null;
          asis_clientes?: string | null;
          asis_entradas?: string | null;
          asis_esperas?: string | null;
          asis_fluxo?: string | null;
          asis_fornecedores?: string | null;
          asis_gargalos?: string | null;
          asis_problemas?: string | null;
          asis_retrabalhos?: string | null;
          asis_saidas?: string | null;
          asis_sistemas?: Json | null;
          baseline_atual?: number | null;
          beneficios?: Json | null;
          categoria?: string | null;
          codigo?: string | null;
          created_at?: string;
          created_by?: string | null;
          custo_atual?: number | null;
          custo_futuro?: number | null;
          data_fim_prevista?: string | null;
          data_fim_real?: string | null;
          data_inicio?: string | null;
          deleted_at?: string | null;
          descricao?: string | null;
          diag_causa_raiz?: string | null;
          diag_impacto?: string | null;
          diag_oportunidade?: string | null;
          diag_problema?: string | null;
          diag_risco?: string | null;
          escopo?: string | null;
          extras?: Json | null;
          hc_atual?: number | null;
          hc_futuro?: number | null;
          id?: string;
          iniciativa_id?: string;
          justificativa?: string | null;
          lead_time_atual?: number | null;
          lead_time_futuro?: number | null;
          lider_id?: string | null;
          marcos?: Json | null;
          meta_futura?: number | null;
          objetivo?: string | null;
          participantes?: Json | null;
          percentual_avanco?: number | null;
          percentual_evolucao?: number | null;
          prioridade?: string | null;
          responsavel_id?: string | null;
          saving_previsto?: number | null;
          sipoc_customers?: string | null;
          sipoc_inputs?: string | null;
          sipoc_outputs?: string | null;
          sipoc_process?: string | null;
          sipoc_suppliers?: string | null;
          sponsor_id?: string | null;
          status?: string | null;
          titulo?: string;
          tobe_automacoes?: string | null;
          tobe_eliminacoes?: string | null;
          tobe_fluxo?: string | null;
          tobe_ia?: string | null;
          tobe_melhorias?: string | null;
          tobe_simplificacoes?: string | null;
          updated_at?: string;
          valor_atual?: number | null;
          valor_projetado?: number | null;
          volume_atual?: number | null;
          volume_futuro?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "microprocessos_iniciativa_id_fkey";
            columns: ["iniciativa_id"];
            isOneToOne: false;
            referencedRelation: "iniciativas";
            referencedColumns: ["id"];
          },
        ];
      };
      pedido_ajuda: {
        Row: {
          created_at: string;
          created_by: string | null;
          deleted_at: string | null;
          descricao: string | null;
          email_destino: string | null;
          gestor_id: string | null;
          id: string;
          iniciativa_id: string | null;
          status: string | null;
          teams_payload: Json | null;
          titulo: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          created_by?: string | null;
          deleted_at?: string | null;
          descricao?: string | null;
          email_destino?: string | null;
          gestor_id?: string | null;
          id?: string;
          iniciativa_id?: string | null;
          status?: string | null;
          teams_payload?: Json | null;
          titulo: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          created_by?: string | null;
          deleted_at?: string | null;
          descricao?: string | null;
          email_destino?: string | null;
          gestor_id?: string | null;
          id?: string;
          iniciativa_id?: string | null;
          status?: string | null;
          teams_payload?: Json | null;
          titulo?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "pedido_ajuda_gestor_id_fkey";
            columns: ["gestor_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "pedido_ajuda_iniciativa_id_fkey";
            columns: ["iniciativa_id"];
            isOneToOne: false;
            referencedRelation: "iniciativas";
            referencedColumns: ["id"];
          },
        ];
      };
      picklist_valores: {
        Row: {
          ativo: boolean;
          cor: string | null;
          created_at: string;
          id: string;
          ordem: number | null;
          picklist_id: string;
          valor: string;
        };
        Insert: {
          ativo?: boolean;
          cor?: string | null;
          created_at?: string;
          id?: string;
          ordem?: number | null;
          picklist_id: string;
          valor: string;
        };
        Update: {
          ativo?: boolean;
          cor?: string | null;
          created_at?: string;
          id?: string;
          ordem?: number | null;
          picklist_id?: string;
          valor?: string;
        };
        Relationships: [
          {
            foreignKeyName: "picklist_valores_picklist_id_fkey";
            columns: ["picklist_id"];
            isOneToOne: false;
            referencedRelation: "picklists";
            referencedColumns: ["id"];
          },
        ];
      };
      picklists: {
        Row: {
          categoria: string;
          created_at: string;
          descricao: string | null;
          id: string;
          updated_at: string;
        };
        Insert: {
          categoria: string;
          created_at?: string;
          descricao?: string | null;
          id?: string;
          updated_at?: string;
        };
        Update: {
          categoria?: string;
          created_at?: string;
          descricao?: string | null;
          id?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      profiles: {
        Row: {
          area: string | null;
          consultoria: string | null;
          created_at: string;
          diretoria: string | null;
          email: string | null;
          foto_url: string | null;
          funcao: string | null;
          gerencia: string | null;
          id: string;
          nome: string;
          papel: string | null;
          updated_at: string;
          vice_presidencia: string | null;
        };
        Insert: {
          area?: string | null;
          consultoria?: string | null;
          created_at?: string;
          diretoria?: string | null;
          email?: string | null;
          foto_url?: string | null;
          funcao?: string | null;
          gerencia?: string | null;
          id: string;
          nome?: string;
          papel?: string | null;
          updated_at?: string;
          vice_presidencia?: string | null;
        };
        Update: {
          area?: string | null;
          consultoria?: string | null;
          created_at?: string;
          diretoria?: string | null;
          email?: string | null;
          foto_url?: string | null;
          funcao?: string | null;
          gerencia?: string | null;
          id?: string;
          nome?: string;
          papel?: string | null;
          updated_at?: string;
          vice_presidencia?: string | null;
        };
        Relationships: [];
      };
      projetos: {
        Row: {
          cor: string | null;
          created_at: string;
          created_by: string | null;
          deleted_at: string | null;
          descricao: string | null;
          id: string;
          nome: string;
          responsavel_id: string | null;
          updated_at: string;
        };
        Insert: {
          cor?: string | null;
          created_at?: string;
          created_by?: string | null;
          deleted_at?: string | null;
          descricao?: string | null;
          id?: string;
          nome: string;
          responsavel_id?: string | null;
          updated_at?: string;
        };
        Update: {
          cor?: string | null;
          created_at?: string;
          created_by?: string | null;
          deleted_at?: string | null;
          descricao?: string | null;
          id?: string;
          nome?: string;
          responsavel_id?: string | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "macroprocessos_responsavel_id_fkey";
            columns: ["responsavel_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      reconhecimentos: {
        Row: {
          codigo: string;
          concedido_por: string | null;
          created_at: string;
          descricao: string | null;
          id: string;
          pontos: number | null;
          profile_id: string;
          titulo: string;
        };
        Insert: {
          codigo: string;
          concedido_por?: string | null;
          created_at?: string;
          descricao?: string | null;
          id?: string;
          pontos?: number | null;
          profile_id: string;
          titulo: string;
        };
        Update: {
          codigo?: string;
          concedido_por?: string | null;
          created_at?: string;
          descricao?: string | null;
          id?: string;
          pontos?: number | null;
          profile_id?: string;
          titulo?: string;
        };
        Relationships: [
          {
            foreignKeyName: "reconhecimentos_profile_id_fkey";
            columns: ["profile_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      riscos: {
        Row: {
          created_at: string;
          descricao: string;
          id: string;
          impacto: number | null;
          iniciativa_id: string;
          mitigacao: string | null;
          probabilidade: number | null;
          responsavel_id: string | null;
          severidade: number | null;
          status: string | null;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          descricao: string;
          id?: string;
          impacto?: number | null;
          iniciativa_id: string;
          mitigacao?: string | null;
          probabilidade?: number | null;
          responsavel_id?: string | null;
          severidade?: number | null;
          status?: string | null;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          descricao?: string;
          id?: string;
          impacto?: number | null;
          iniciativa_id?: string;
          mitigacao?: string | null;
          probabilidade?: number | null;
          responsavel_id?: string | null;
          severidade?: number | null;
          status?: string | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "riscos_iniciativa_id_fkey";
            columns: ["iniciativa_id"];
            isOneToOne: false;
            referencedRelation: "iniciativas";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "riscos_responsavel_id_fkey";
            columns: ["responsavel_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      sipoc: {
        Row: {
          categoria: string;
          created_at: string;
          created_by: string | null;
          deleted_at: string | null;
          id: string;
          iniciativa_id: string;
          ordem: number | null;
          updated_at: string;
          valor: string;
        };
        Insert: {
          categoria: string;
          created_at?: string;
          created_by?: string | null;
          deleted_at?: string | null;
          id?: string;
          iniciativa_id: string;
          ordem?: number | null;
          updated_at?: string;
          valor: string;
        };
        Update: {
          categoria?: string;
          created_at?: string;
          created_by?: string | null;
          deleted_at?: string | null;
          id?: string;
          iniciativa_id?: string;
          ordem?: number | null;
          updated_at?: string;
          valor?: string;
        };
        Relationships: [
          {
            foreignKeyName: "sipoc_iniciativa_id_fkey";
            columns: ["iniciativa_id"];
            isOneToOne: false;
            referencedRelation: "iniciativas";
            referencedColumns: ["id"];
          },
        ];
      };
      status_estrategico: {
        Row: {
          created_at: string;
          created_by: string | null;
          decisoes: string | null;
          deleted_at: string | null;
          id: string;
          indicadores_sucesso: string | null;
          iniciativa_id: string;
          o_que_mudou: string | null;
          proximas_acoes: string | null;
          retorno: string | null;
          riscos: string | null;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          created_by?: string | null;
          decisoes?: string | null;
          deleted_at?: string | null;
          id?: string;
          indicadores_sucesso?: string | null;
          iniciativa_id: string;
          o_que_mudou?: string | null;
          proximas_acoes?: string | null;
          retorno?: string | null;
          riscos?: string | null;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          created_by?: string | null;
          decisoes?: string | null;
          deleted_at?: string | null;
          id?: string;
          indicadores_sucesso?: string | null;
          iniciativa_id?: string;
          o_que_mudou?: string | null;
          proximas_acoes?: string | null;
          retorno?: string | null;
          riscos?: string | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "status_estrategico_iniciativa_id_fkey";
            columns: ["iniciativa_id"];
            isOneToOne: false;
            referencedRelation: "iniciativas";
            referencedColumns: ["id"];
          },
        ];
      };
      tarefas: {
        Row: {
          checklist: Json | null;
          created_at: string;
          created_by: string | null;
          data_fim_prevista: string | null;
          data_fim_real: string | null;
          data_inicio: string | null;
          deleted_at: string | null;
          descricao: string | null;
          diretoria: string | null;
          id: string;
          iniciativa_id: string | null;
          microprocesso_id: string | null;
          observacoes: string | null;
          percentual_avanco: number | null;
          prioridade: string | null;
          responsavel_id: string | null;
          status: string | null;
          titulo: string;
          updated_at: string;
        };
        Insert: {
          checklist?: Json | null;
          created_at?: string;
          created_by?: string | null;
          data_fim_prevista?: string | null;
          data_fim_real?: string | null;
          data_inicio?: string | null;
          deleted_at?: string | null;
          descricao?: string | null;
          diretoria?: string | null;
          id?: string;
          iniciativa_id?: string | null;
          microprocesso_id?: string | null;
          observacoes?: string | null;
          percentual_avanco?: number | null;
          prioridade?: string | null;
          responsavel_id?: string | null;
          status?: string | null;
          titulo: string;
          updated_at?: string;
        };
        Update: {
          checklist?: Json | null;
          created_at?: string;
          created_by?: string | null;
          data_fim_prevista?: string | null;
          data_fim_real?: string | null;
          data_inicio?: string | null;
          deleted_at?: string | null;
          descricao?: string | null;
          diretoria?: string | null;
          id?: string;
          iniciativa_id?: string | null;
          microprocesso_id?: string | null;
          observacoes?: string | null;
          percentual_avanco?: number | null;
          prioridade?: string | null;
          responsavel_id?: string | null;
          status?: string | null;
          titulo?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "acoes_iniciativa_id_fkey";
            columns: ["iniciativa_id"];
            isOneToOne: false;
            referencedRelation: "iniciativas";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "acoes_responsavel_id_fkey";
            columns: ["responsavel_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "tarefas_microprocesso_id_fkey";
            columns: ["microprocesso_id"];
            isOneToOne: false;
            referencedRelation: "microprocessos";
            referencedColumns: ["id"];
          },
        ];
      };
      tobe_passos: {
        Row: {
          ator: string | null;
          created_at: string;
          created_by: string | null;
          deleted_at: string | null;
          ganho_financeiro: number | null;
          ganho_fte: number | null;
          id: string;
          iniciativa_id: string;
          lead_time: number | null;
          ordem: number | null;
          passo: string | null;
          processo: string | null;
          tempo: number | null;
          tipo: string | null;
          updated_at: string;
          volume: number | null;
        };
        Insert: {
          ator?: string | null;
          created_at?: string;
          created_by?: string | null;
          deleted_at?: string | null;
          ganho_financeiro?: number | null;
          ganho_fte?: number | null;
          id?: string;
          iniciativa_id: string;
          lead_time?: number | null;
          ordem?: number | null;
          passo?: string | null;
          processo?: string | null;
          tempo?: number | null;
          tipo?: string | null;
          updated_at?: string;
          volume?: number | null;
        };
        Update: {
          ator?: string | null;
          created_at?: string;
          created_by?: string | null;
          deleted_at?: string | null;
          ganho_financeiro?: number | null;
          ganho_fte?: number | null;
          id?: string;
          iniciativa_id?: string;
          lead_time?: number | null;
          ordem?: number | null;
          passo?: string | null;
          processo?: string | null;
          tempo?: number | null;
          tipo?: string | null;
          updated_at?: string;
          volume?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "tobe_passos_iniciativa_id_fkey";
            columns: ["iniciativa_id"];
            isOneToOne: false;
            referencedRelation: "iniciativas";
            referencedColumns: ["id"];
          },
        ];
      };
      user_roles: {
        Row: {
          created_at: string;
          id: string;
          role: Database["public"]["Enums"]["app_role"];
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          role: Database["public"]["Enums"]["app_role"];
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          role?: Database["public"]["Enums"]["app_role"];
          user_id?: string;
        };
        Relationships: [];
      };
      user_session_log: {
        Row: {
          created_at: string;
          email: string | null;
          evento: string;
          id: string;
          user_id: string | null;
        };
        Insert: {
          created_at?: string;
          email?: string | null;
          evento: string;
          id?: string;
          user_id?: string | null;
        };
        Update: {
          created_at?: string;
          email?: string | null;
          evento?: string;
          id?: string;
          user_id?: string | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      can_edit: { Args: { _user_id: string }; Returns: boolean };
      can_move_kanban: { Args: { _user_id: string }; Returns: boolean };
      converter_iniciativa_para_microprocesso:
        | {
            Args: { _destino_iniciativa_id: string; _iniciativa_id: string };
            Returns: string;
          }
        | {
            Args: {
              _actor_id: string;
              _destino_iniciativa_id: string;
              _iniciativa_id: string;
            };
            Returns: string;
          };
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"];
          _user_id: string;
        };
        Returns: boolean;
      };
    };
    Enums: {
      app_role: "admin" | "editor_master" | "editor_basico" | "visualizador";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] & DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "editor_master", "editor_basico", "visualizador"],
    },
  },
} as const;
