# GUIA DE MIGRAÇÕES DE BANCO DE DADOS (VERSIONADO) — GCP CLOUD SQL / ALLOYDB

Este documento orienta a equipe de engenharia e DevOps sobre como executar, rastrear e reverter migrações de banco de dados em ambientes produtivos da **Google Cloud Platform (GCP)**.

---

## 1. Controle de Versão de Migrações

Para garantir que o banco de dados evolua de forma previsível e sem indisponibilidade (Zero Downtime), as alterações são versionadas em arquivos de migração sequenciais.

Cada alteração segue a nomenclatura:
`V<ANO_MES_DIA_HORA_MINUTO>__<DESCRICAO>.sql`

### Histórico de Migrações do Sistema

| Versão              | Script                                    | Descrição                                                         | Status       |
| :------------------ | :---------------------------------------- | :---------------------------------------------------------------- | :----------- |
| **V20260703120000** | `V20260703120000__init_schema.sql`        | Criação das tabelas fundamentais de perfil, projetos e picklists. | **Aplicada** |
| **V20260703123000** | `V20260703123000__process_mapping.sql`    | Estrutura para modelagem Lean, AS IS, TO BE, SIPOC e Dores.       | **Aplicada** |
| **V20260703130000** | `V20260703130000__initiatives_core.sql`   | Tabelas de iniciativas, microprocessos, tarefas e orçamentos.     | **Aplicada** |
| **V20260703133000** | `V20260703133000__audit_and_triggers.sql` | Gatilhos PL/pgSQL para logs automáticos de auditoria (CDC).       | **Aplicada** |

---

## 2. Tabela de Metadados de Migração (Schema Versioning)

O sistema utiliza um validador para garantir que migrações duplicadas ou inconsistentes não sejam aplicadas:

```sql
CREATE TABLE IF NOT EXISTS public.schema_version (
    installed_rank INT PRIMARY KEY,
    version VARCHAR(50) UNIQUE,
    description VARCHAR(200) NOT NULL,
    type VARCHAR(20) NOT NULL,
    script VARCHAR(1000) NOT NULL,
    checksum INT NOT NULL,
    installed_by VARCHAR(100) NOT NULL,
    installed_on TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    execution_time_ms INT NOT NULL,
    success BOOLEAN NOT NULL
);
```

---

## 3. Instruções de Implantação no Google Cloud SQL (PostgreSQL)

### Passo 1: Autenticar na GCP

```bash
gcloud auth login
gcloud config set project <PROJECT_ID>
```

### Passo 2: Instalar Cloud SQL Auth Proxy (Para conexões seguras sem IP público)

```bash
curl -o cloud-sql-proxy https://storage.googleapis.com/cloud-sql-connectors/v2.1.0/binaries/linux/amd64/cloud_sql_proxy
chmod +x cloud-sql-proxy
```

### Passo 3: Iniciar o Proxy de Conexão

```bash
./cloud-sql-proxy <PROJECT_CONNECTION_NAME> --port 5432
```

### Passo 4: Rodar a Migração DDL Inicial via CLI do PostgreSQL (`psql`)

```bash
psql -h 127.0.0.1 -U postgres -d postgres -f /src/db/enterprise_schema.sql
```

---

## 4. Estratégia de Rollback (Reversão Segura)

Caso uma migração falhe ou introduza um bug crítico, cada script `.sql` possui um arquivo correspondente de reversão: `U<VERSAO>__<DESCRICAO>.sql`.

### Exemplo de Reversão de Tabelas (Soft Rollback):

```sql
-- Reversão segura sem perda de dados históricos
ALTER TABLE public.iniciativas DROP COLUMN IF EXISTS novo_campo_experimental;
```
