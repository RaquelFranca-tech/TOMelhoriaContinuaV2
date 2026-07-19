Pedido é grande e toca em ~10 áreas distintas. Proponho dividir em **5 entregas sequenciais** para reduzir risco de regressão. Confirme se posso seguir nesta ordem (ou reordene/recorte).

---

## Entrega 1 — Formulário da Iniciativa (visual do HTML anexo + novas regras)

**Objetivo:** substituir o visual atual do `FormularioTab` pelo layout do HTML `Cliente_na_Veia_Governanca_v22`, mantendo toda a lógica/persistência atual.

- Reestruturar `src/modules/mapeamento/FormularioTab.tsx` em seções visuais idênticas ao HTML (Identificação, Escopo, Indicadores, Cronograma, Ganhos, Sustentação, etc.).
- **Manter o campo "Processo"** como campo livre/picklist na iniciativa (sem voltar à hierarquia).
- **Remover** campo "Potencial de Automação".
- **Campos calculados em cor pastel** (criar classe `.field-calculated` com fundo pastel + ícone calculadora). Inclui: % Avanço, ROI, Payback, Esforço×Impacto, Score Priorização, etc.
- Aplicar novas fórmulas/regras do `Prompt_Completo` v4.0 em `src/lib/iniciativaCalc.ts` (ROI consolidado, score, classificação automática).
- **Botão "+ Novo Projeto"** ao lado do seletor de projeto no header global (`AppShell`), abrindo modal rápido.
- Garantir que iniciativas criadas no Kanban (sem projeto) apareçam na busca do formulário (remover filtro obrigatório por projeto na combo de busca).

## Entrega 2 — View Switcher Universal (Executivo + Mapeamento)

- **Executivo:** fundir `KanbanTab`, `TimelineTab`, `AcoesTab` (tabela) em uma única aba **"Iniciativas"** com toggle Kanban / Tabela / Timeline / Cards, **filtros compartilhados persistentes** (zustand).
- Remover as abas individuais da navegação executiva; manter rotas redirecionando para a nova aba com query param `?view=kanban`.
- **Mapeamento:** consolidar abas com sinergia em grupos com switcher interno:
  - **Análise** = ASIS + TOBE + SIPOC + Fluxo + BPMN
  - **Causa & Melhoria** = Causa Raiz + Ishikawa + 5 Porquês + DMAIC + Kaizen + Lean
  - **Resultados** = Resultados + Ganhos + Indicadores + Evolução
  - **Governança** = Status + Controle + Riscos + Cronograma
  - Mantém isoladas: Formulário, Playbook, Calculadora, Ajuda, Agenda.

## Entrega 3 — Painel "Meu Dia" + Presence Avatars

- **Meu Dia:** nova rota `/` (home autenticada) com widget central listando todas as `tarefas` WHERE `responsavel_id = auth.uid()` agrupadas por status/prazo, independente de projeto/iniciativa. Acesso rápido também via botão fixo no header.
- **Presence Avatars:** no topo do `InitiativeDrawer` e do `FormularioTab`, canal Realtime do Supabase (`presence`) por `iniciativa_id`, exibindo avatares dos usuários ativos com tooltip de nome. Lock visual quando outro usuário estiver editando o mesmo campo.

## Entrega 4 — Chatbot flutuante Copilot Studio

- Componente `<CopilotChatbot />` montado em `__root.tsx`, botão flutuante canto inferior direito, expansível em painel 400×600.
- Integração via **Copilot Studio Direct Line / Web Chat**: usuário cola o **token endpoint** (ou Direct Line secret) em **Configurações → Integrações → Copilot Studio**, persistido em `app_configuracoes`.
- Renderiza o iframe oficial do `webchat` ou usa `botframework-webchat` (lib oficial). Passo a passo de obtenção do token incluído na UI.
- Secret se preferir server-side: armazenar `COPILOT_DIRECTLINE_SECRET` e gerar token via server function.

## Entrega 5 — Ajustes MC³ + polimento final

- MC³: trocar a fonte da frase "Quando um dashboard revela comportamentos…" para uma **serif elegante** (Playfair Display ou Cormorant Garamond) via `<link>` em `__root.tsx` + classe utilitária `.font-elegant`.
- Aplicar resto das melhorias do `Prompt_Sistema_MC_Vibra_v3`: ranking MC³, badges, reconhecimento peer-to-peer (se ainda não existirem).
- Migração SQL final se necessário (campos extras no `iniciativas`, tabela `presence_log` opcional).

---

## Confirmações antes de começar

1. **Sigo entrega por entrega** (recomendado) ou faço tudo num bloco grande?
2. **Copilot Studio**: você fornece o **Direct Line token endpoint** público (mais simples, sem secret no servidor) ou prefere armazenar o **secret** e gerar token via server function (mais seguro)?
3. **Campo "Processo"** no formulário: vira **picklist editável em Configurações** (como hoje os outros picklists) ou **texto livre**?
4. Posso começar pela **Entrega 1** já?
