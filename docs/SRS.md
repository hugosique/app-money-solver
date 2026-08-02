# Documento de Requisitos do Sistema — Money Solver

**Versão:** 3.0
**Status:** Documento Inicial de Requisitos
**Tipo:** Especificação de Requisitos de Software (SRS)
**Produto:** Money Solver

---

# 1. Introdução

## 1.1 Objetivo

O Money Solver é um sistema de gerenciamento financeiro pessoal e compartilhado.

O sistema permite que usuários organizem suas finanças através de grupos, registrem movimentações financeiras, acompanhem seus estados e realizem transferências ou solicitações financeiras entre diferentes grupos.

O sistema deverá permitir operação offline, sincronização entre dispositivos, histórico financeiro, relatórios, análises e planejamento financeiro.

Este documento descreve os requisitos do produto independentemente das tecnologias utilizadas.

---

# 2. Visão do Produto

O sistema será baseado em três conceitos centrais:

```text
Usuário
   ↓
Grupo
   ↓
Movimentação
```

Todo usuário possuirá automaticamente um **grupo individual**.

Usuários também poderão criar ou participar de grupos compartilhados.

Toda movimentação financeira deverá obrigatoriamente pertencer a um grupo.

Exemplo:

```text
Usuário 1

├── Grupo Individual
│   ├── Salário
│   ├── Aluguel
│   └── Mercado
│
└── Grupo Casa
    ├── Energia
    ├── Internet
    └── Supermercado
```

---

# 3. Objetivos

O sistema deverá:

1. Organizar finanças individuais.
2. Organizar finanças compartilhadas.
3. Permitir múltiplos grupos.
4. Associar toda movimentação a um grupo.
5. Permitir acompanhar o estado de cada movimentação.
6. Permitir adiamento de movimentações.
7. Permitir cancelamento de movimentações.
8. Permitir transferências entre grupos.
9. Permitir transferências entre grupos pertencentes ao mesmo usuário.
10. Permitir solicitações entre grupos pertencentes a usuários diferentes.
11. Permitir aceite ou rejeição de solicitações.
12. Permitir confirmação bilateral de alterações de estado.
13. Manter histórico financeiro completo.
14. Disponibilizar relatórios e análises.
15. Permitir planejamento financeiro.
16. Funcionar offline.
17. Sincronizar alterações entre dispositivos.
18. Permitir importação e exportação.
19. Possibilitar backup e restauração.
20. Possuir observabilidade básica.
21. Possuir CI/CD.

---

# 4. Conceitos Fundamentais

# 4.1 Usuário

Representa uma pessoa que utiliza o sistema.

Um usuário poderá:

* Possuir um grupo individual.
* Criar grupos compartilhados.
* Participar de grupos compartilhados.
* Criar movimentações.
* Alterar movimentações.
* Solicitar transferências.
* Receber solicitações.
* Aceitar ou rejeitar solicitações.
* Confirmar alterações realizadas por outro usuário.

---

# 4.2 Grupo

Grupo é o contexto financeiro no qual as movimentações são registradas.

Um grupo poderá ser:

* Individual
* Compartilhado

Um usuário poderá participar de múltiplos grupos.

---

# 4.3 Grupo Individual

Todo usuário possuirá automaticamente um grupo individual.

O grupo individual:

* Será criado automaticamente.
* Pertencerá exclusivamente ao usuário.
* Não poderá ser excluído.
* Será utilizado para suas finanças pessoais.

---

# 4.4 Grupo Compartilhado

Um usuário poderá criar um grupo compartilhado e adicionar outros usuários.

Exemplo:

```text
Grupo: Casa

├── Usuário 1
└── Usuário 2
```

O grupo poderá representar:

* Casa
* Família
* Viagem
* Projeto
* Evento
* Qualquer outro contexto financeiro compartilhado

---

# 4.5 Movimentação

Movimentação é o principal registro financeiro do sistema.

Toda movimentação deverá estar associada a exatamente um grupo.

Exemplos:

```text
Despesa
R$ 300
Grupo: Casa
```

ou:

```text
Receita
R$ 5.000
Grupo: Usuário 1
```

Uma movimentação deverá possuir um ciclo de vida.

---

# 4.6 Estado da Movimentação

Uma movimentação poderá possuir estados como:

```text
Pendente
   │
   ├── Paga
   ├── Recebida
   ├── Adiada
   └── Cancelada
```

O conjunto exato de estados dependerá do tipo da movimentação.

---

# 4.7 Transferência

Transferência representa uma movimentação de valor ou responsabilidade entre dois grupos.

Exemplo:

```text
Grupo A
   │
   │ transferência
   ▼
Grupo B
```

A transferência deverá possuir:

* Grupo de origem
* Grupo de destino
* Usuário solicitante
* Valor
* Data
* Descrição
* Estado

---

# 4.8 Solicitação entre Usuários

Quando uma transferência envolver grupos pertencentes ao mesmo usuário, ela poderá ser processada diretamente.

Quando envolver grupos pertencentes a usuários diferentes, deverá ser criada uma solicitação.

Exemplo:

```text
Usuário A
   │
   │ Grupo A
   │
   │ solicita
   ▼
Usuário B
   │
   │ Grupo B
```

O usuário B deverá decidir se aceita ou rejeita a solicitação.

---

# 4.9 Confirmação Bilateral

Quando uma operação envolver usuários diferentes, determinadas alterações deverão exigir confirmação do usuário que iniciou a operação.

Exemplo:

```text
Usuário A
   │
   │ envia cobrança
   ▼
Usuário B
   │
   ├── Aceita
   │
   ├── Paga
   ├── Adia
   └── Cancela
          │
          ▼
      Usuário A
          │
          └── Confirma
```

Isso garante que ambos os lados possuam conhecimento e concordância sobre o estado final da operação.

---

# 5. Requisitos Funcionais

# 5.1 Usuários

### RF-001 — Cadastro

O sistema deverá permitir o cadastro de usuários.

### RF-002 — Autenticação

O sistema deverá permitir autenticação.

### RF-003 — Perfil

O usuário poderá consultar e editar suas informações permitidas.

### RF-004 — Sessão

O sistema deverá controlar sessões autenticadas.

### RF-005 — Recuperação

O sistema deverá permitir recuperação de acesso.

---

# 6. Grupos

### RF-010 — Grupo individual

O sistema deverá criar automaticamente um grupo individual para cada usuário.

### RF-011 — Grupo compartilhado

O usuário poderá criar grupos compartilhados.

### RF-012 — Adicionar usuário

Usuários autorizados poderão adicionar participantes.

### RF-013 — Remover usuário

Usuários autorizados poderão remover participantes.

### RF-014 — Múltiplos grupos

Um usuário poderá participar de múltiplos grupos.

### RF-015 — Permissões

O sistema deverá controlar permissões dos participantes.

### RF-016 — Seleção de grupo

O usuário poderá selecionar o grupo no qual deseja operar.

### RF-017 — Inativação

Grupos compartilhados poderão ser inativados sem perda do histórico.

---

# 7. Movimentações

### RF-020 — Criar movimentação

O usuário poderá criar uma movimentação.

### RF-021 — Grupo obrigatório

Toda movimentação deverá possuir exatamente um grupo.

### RF-022 — Tipo

O sistema deverá permitir diferentes tipos de movimentação.

Tipos iniciais:

* Receita
* Despesa

### RF-023 — Valor

A movimentação deverá possuir valor.

### RF-024 — Data

A movimentação deverá possuir data.

### RF-025 — Descrição

O usuário poderá informar uma descrição.

### RF-026 — Categoria

A movimentação poderá possuir uma categoria.

### RF-027 — Estado

Toda movimentação deverá possuir um estado.

### RF-028 — Alteração

Usuários autorizados poderão alterar movimentações.

### RF-029 — Cancelamento

Usuários autorizados poderão cancelar movimentações.

---

# 8. Estados das Movimentações

### RF-030 — Pendente

Movimentações poderão iniciar no estado pendente.

### RF-031 — Pagamento

Uma despesa poderá ser marcada como paga.

### RF-032 — Recebimento

Uma receita poderá ser marcada como recebida.

### RF-033 — Adiamento

Uma movimentação poderá ser adiada.

### RF-034 — Cancelamento

Uma movimentação poderá ser cancelada.

### RF-035 — Histórico de estados

O sistema deverá preservar o histórico das alterações de estado.

Exemplo:

```text
Pendente
   ↓
Adiada
   ↓
Pendente
   ↓
Paga
```

---

# 9. Transferências

### RF-040 — Criar transferência

O usuário poderá criar uma transferência entre grupos.

### RF-041 — Grupo de origem

A transferência deverá possuir grupo de origem.

### RF-042 — Grupo de destino

A transferência deverá possuir grupo de destino.

### RF-043 — Valor

A transferência deverá possuir valor.

### RF-044 — Descrição

A transferência poderá possuir descrição.

### RF-045 — Transferência dentro do mesmo usuário

Transferências entre grupos pertencentes ao mesmo usuário poderão ser processadas diretamente.

### RF-046 — Transferência entre usuários

Transferências entre grupos pertencentes a usuários diferentes deverão gerar uma solicitação.

---

# 10. Solicitações e Cobranças

### RF-050 — Criar solicitação

Quando uma transferência envolver usuários diferentes, o sistema deverá criar uma solicitação.

### RF-051 — Destinatário

A solicitação deverá identificar o usuário destinatário.

### RF-052 — Grupo de origem

A solicitação deverá identificar o grupo de origem.

### RF-053 — Grupo de destino

O destinatário deverá selecionar o grupo de destino.

### RF-054 — Aceitar solicitação

O destinatário poderá aceitar a solicitação.

### RF-055 — Rejeitar solicitação

O destinatário poderá rejeitar a solicitação.

### RF-056 — Estado

A solicitação deverá possuir estados:

```text
Pendente
Aceita
Rejeitada
Cancelada
Concluída
```

### RF-057 — Notificação

O sistema deverá informar o usuário sobre novas solicitações.

---

# 11. Alteração de Estado por Outro Usuário

Quando uma movimentação compartilhada entre usuários for alterada por um dos envolvidos, o sistema deverá gerar uma solicitação de confirmação quando aplicável.

### RF-060 — Alteração para paga

O usuário poderá indicar que uma movimentação foi paga.

### RF-061 — Alteração para adiada

O usuário poderá indicar que uma movimentação foi adiada.

### RF-062 — Alteração para cancelada

O usuário poderá indicar que uma movimentação foi cancelada.

### RF-063 — Solicitação de confirmação

O sistema deverá enviar a alteração ao usuário responsável pela outra ponta da operação.

### RF-064 — Aceite

O usuário deverá poder aceitar a alteração.

### RF-065 — Rejeição

O usuário deverá poder rejeitar a alteração.

### RF-066 — Estado pendente de confirmação

Enquanto não houver confirmação, a alteração deverá ser identificada como pendente.

---

# 12. Protocolo de Confirmação

Toda operação entre usuários deverá manter o histórico das decisões.

Exemplo:

```text
Usuário A
    │
    │ cria cobrança
    ▼
Usuário B
    │
    │ aceita
    ▼
Cobrança ativa
    │
    │ B informa "Paga"
    ▼
Usuário A
    │
    ├── aceita
    │
    └── rejeita
```

O sistema deverá registrar:

* Quem realizou a ação.
* Qual ação foi realizada.
* Quando foi realizada.
* Estado anterior.
* Novo estado.
* Quem confirmou.
* Quando confirmou.

---

# 13. Histórico Financeiro

### RF-070 — Histórico

O sistema deverá manter histórico financeiro.

### RF-071 — Histórico por grupo

O usuário poderá consultar o histórico de um grupo.

### RF-072 — Histórico por movimentação

O usuário poderá consultar o histórico completo de uma movimentação.

### RF-073 — Histórico de estados

O sistema deverá apresentar as alterações de estado.

### RF-074 — Histórico de solicitações

O sistema deverá apresentar o histórico das solicitações relacionadas.

### RF-075 — Filtros

O usuário poderá filtrar por:

* Grupo
* Data
* Tipo
* Categoria
* Estado
* Usuário
* Valor

---

# 14. Categorias

### RF-080 — Criar categoria

O usuário poderá criar categorias.

### RF-081 — Categoria de grupo

Categorias poderão pertencer a um grupo.

### RF-082 — Inativação

Categorias poderão ser inativadas.

### RF-083 — Histórico

A alteração de categorias não deverá comprometer movimentações existentes.

---

# 15. Planejamento Financeiro

### RF-090 — Orçamento

O usuário poderá criar orçamentos para grupos.

### RF-091 — Limite

Um orçamento deverá possuir limite financeiro.

### RF-092 — Período

O orçamento deverá possuir período.

### RF-093 — Acompanhamento

O sistema deverá acompanhar a utilização do orçamento.

### RF-094 — Metas

O sistema deverá permitir criação de metas financeiras.

### RF-095 — Progresso

O sistema deverá apresentar o progresso das metas.

---

# 16. Relatórios e Análises

### RF-100 — Relatórios

O sistema deverá permitir geração de relatórios financeiros.

### RF-101 — Análise por grupo

O sistema deverá permitir analisar grupos individualmente.

### RF-102 — Análise temporal

O sistema deverá permitir analisar períodos.

### RF-103 — Categorias

O sistema deverá apresentar distribuição por categoria.

### RF-104 — Evolução

O sistema deverá apresentar evolução financeira.

### RF-105 — Movimentações pendentes

O sistema deverá apresentar movimentações pendentes.

### RF-106 — Solicitações

O sistema deverá apresentar solicitações pendentes, aceitas e rejeitadas.

---

# 17. Offline

### RF-110 — Funcionamento offline

O sistema deverá permitir operações sem conexão.

### RF-111 — Persistência local

Operações offline deverão ser armazenadas localmente.

### RF-112 — Movimentações offline

O usuário deverá poder criar e alterar movimentações offline.

### RF-113 — Solicitações offline

Operações que dependam de outro usuário deverão permanecer pendentes até a sincronização.

### RF-114 — Indicador

O sistema deverá indicar o estado da sincronização.

---

# 18. Sincronização

### RF-120 — Sincronização automática

O sistema deverá sincronizar alterações automaticamente quando houver conectividade.

### RF-121 — Sincronização incremental

Somente alterações necessárias deverão ser sincronizadas.

### RF-122 — Identificação

Cada operação deverá possuir identificador único.

### RF-123 — Idempotência

Uma operação não poderá ser aplicada duas vezes.

### RF-124 — Conflitos

O sistema deverá identificar conflitos.

### RF-125 — Recuperação

Operações que falharem deverão poder ser reprocessadas.

---

# 19. Importação

### RF-130 — Importação

O sistema deverá permitir importar dados financeiros.

Formatos iniciais:

* CSV
* OFX
* JSON

### RF-131 — Grupo

O usuário deverá selecionar o grupo de destino.

### RF-132 — Validação

Os dados deverão ser validados.

### RF-133 — Pré-visualização

O usuário deverá visualizar os dados antes da confirmação.

### RF-134 — Duplicidade

O sistema deverá detectar possíveis duplicidades.

---

# 20. Exportação

### RF-140 — Exportação

O sistema deverá permitir exportar dados.

### RF-141 — Por grupo

O usuário poderá exportar dados de grupos específicos.

### RF-142 — Completa

O usuário poderá exportar todos os dados aos quais possui acesso.

### RF-143 — Filtros

A exportação poderá utilizar filtros.

### RF-144 — Backup

A exportação poderá ser utilizada para restauração.

---

# 21. Auditoria

### RF-150 — Auditoria

O sistema deverá registrar eventos relevantes.

### RF-151 — Usuário

Cada alteração deverá identificar o usuário responsável.

### RF-152 — Estado anterior

Alterações deverão preservar o estado anterior.

### RF-153 — Novo estado

Alterações deverão preservar o novo estado.

### RF-154 — Confirmações

Aceites e rejeições deverão ser auditáveis.

### RF-155 — Transferências

Transferências deverão possuir histórico completo.

---

# 22. Observabilidade

### RF-160 — Saúde

O sistema deverá permitir verificar seu estado operacional.

### RF-161 — Erros

Erros deverão ser registrados.

### RF-162 — Sincronização

Falhas de sincronização deverão ser identificáveis.

### RF-163 — Processamento

Operações pendentes e falhas de processamento deverão ser identificáveis.

---

# 23. CI/CD

### RF-170 — Integração contínua

Alterações deverão passar por validações automatizadas.

### RF-171 — Testes

Testes deverão ser executados automaticamente.

### RF-172 — Build

O projeto deverá validar automaticamente o build.

### RF-173 — Qualidade

O pipeline deverá verificar qualidade do código.

### RF-174 — Entrega

Versões aprovadas poderão ser disponibilizadas automaticamente.

### RF-175 — Migrações

Alterações estruturais deverão possuir processo controlado.

### RF-176 — Rollback

O sistema deverá possuir estratégia de recuperação.

---

# 24. Requisitos Não Funcionais

## RNF-001 — Offline First

Funcionalidades essenciais deverão funcionar sem conectividade.

## RNF-002 — Integridade financeira

O sistema não deverá produzir estados financeiros inconsistentes.

## RNF-003 — Idempotência

Operações sincronizadas não poderão ser duplicadas.

## RNF-004 — Consistência

Alterações financeiras deverão manter consistência entre os usuários envolvidos.

## RNF-005 — Segurança

Dados deverão ser protegidos contra acesso não autorizado.

## RNF-006 — Privacidade

Usuários somente poderão acessar grupos autorizados.

## RNF-007 — Auditabilidade

Alterações financeiras deverão ser rastreáveis.

## RNF-008 — Recuperação

Falhas de conectividade não deverão resultar em perda de dados.

## RNF-009 — Desempenho

Operações comuns deverão possuir baixa latência percebida.

## RNF-010 — Usabilidade

O sistema deverá possuir interface simples e intuitiva.

## RNF-011 — Responsividade

O sistema deverá funcionar em diferentes tamanhos de tela.

## RNF-012 — Testabilidade

As regras de negócio deverão ser testáveis isoladamente.

## RNF-013 — Observabilidade

Falhas deverão ser diagnosticáveis.

## RNF-014 — Backup

Dados deverão possuir mecanismos de backup e restauração.

## RNF-015 — Manutenibilidade

O sistema deverá permitir evolução sem alterações excessivamente acopladas.

---

# 25. Regras de Negócio

## RN-001 — Grupo obrigatório

Toda movimentação deverá pertencer a exatamente um grupo.

## RN-002 — Grupo individual

Todo usuário deverá possuir exatamente um grupo individual.

## RN-003 — Múltiplos grupos

Um usuário poderá participar de múltiplos grupos.

## RN-004 — Movimentação

Uma movimentação não poderá existir sem grupo.

## RN-005 — Transferência

Uma transferência deverá possuir grupo de origem e grupo de destino.

## RN-006 — Mesmo usuário

Se origem e destino pertencerem ao mesmo usuário, a transferência poderá ser processada diretamente.

## RN-007 — Usuários diferentes

Se origem e destino pertencerem a usuários diferentes, deverá existir uma solicitação.

## RN-008 — Aceite

O destinatário deverá aceitar uma solicitação antes que ela seja efetivada.

## RN-009 — Rejeição

Uma solicitação rejeitada não deverá produzir a movimentação financeira solicitada.

## RN-010 — Estado compartilhado

Quando uma operação entre usuários alterar seu estado, a outra parte deverá ser notificada.

## RN-011 — Confirmação

Alterações de estado que exigirem confirmação somente serão consideradas definitivas após o aceite correspondente.

## RN-012 — Adiamento

Uma movimentação poderá ser adiada sem perder seu histórico anterior.

## RN-013 — Cancelamento

Uma movimentação cancelada deverá permanecer no histórico.

## RN-014 — Histórico imutável

Eventos históricos não deverão ser fisicamente apagados.

## RN-015 — Idempotência

Uma mesma operação não poderá produzir efeitos financeiros duplicados.

## RN-016 — Valores

Valores monetários deverão possuir precisão adequada para operações financeiras.

---

# 26. Modelo Conceitual

O domínio principal será:

```text
┌────────────┐
│    User    │
└─────┬──────┘
      │
      │ possui / participa
      ▼
┌────────────┐
│   Group    │
└─────┬──────┘
      │
      │ possui
      ▼
┌────────────────┐
│  Transaction   │
└───────┬────────┘
        │
        │ possui
        ▼
┌────────────────┐
│ TransactionState│
└────────────────┘
```

Transferências:

```text
┌────────────┐                 ┌────────────┐
│  Group A   │ ── Transfer ──► │  Group B   │
└────────────┘                 └────────────┘
```

Entre usuários diferentes:

```text
Group A
   │
   │
   ▼
Transfer Request
   │
   ▼
User B
   │
   ▼
Group B
```

Confirmação:

```text
User B
   │
   │ altera estado
   ▼
State Change Request
   │
   ▼
User A
   │
   ├── Aceita
   └── Rejeita
```

---

# 27. Ciclo de Vida de uma Movimentação

Uma movimentação poderá seguir diferentes fluxos.

## Despesa

```text
Pendente
   │
   ├── Paga
   │
   ├── Adiada
   │     │
   │     └── Pendente
   │
   └── Cancelada
```

## Receita

```text
Pendente
   │
   ├── Recebida
   │
   ├── Adiada
   │     │
   │     └── Pendente
   │
   └── Cancelada
```

---

# 28. Fluxo de Cobrança

Exemplo:

Usuário A possui:

```text
Grupo Casa
Despesa: R$ 500
```

Usuário A deseja cobrar Usuário B.

```text
Usuário A
    │
    │ cria cobrança
    ▼
Cobrança R$ 250
    │
    ▼
Usuário B
```

Usuário B recebe:

```text
Nova cobrança

Valor: R$ 250

Origem:
Usuário A / Grupo Casa
```

Usuário B escolhe:

```text
Adicionar em:

● Grupo Individual
○ Grupo Viagem
○ Grupo Casa
```

Após aceitar:

```text
Usuário A
Grupo Casa
    │
    └── Conta/obrigação a receber: R$ 250

Usuário B
Grupo Individual
    │
    └── Obrigação: R$ 250
```

Quando Usuário B realizar a ação:

```text
Pagar
```

o Usuário A deverá receber:

```text
Usuário B informou:

"Pagamento realizado"

[ Aceitar ]
[ Rejeitar ]
```

Somente após a confirmação do Usuário A a operação será considerada definitivamente concluída.

O mesmo princípio deverá ser aplicado para:

```text
Adiar
Cancelar
```

quando essas ações exigirem confirmação.

---

# 29. Histórico de Eventos

O sistema deverá preservar o histórico de eventos relevantes.

Exemplo:

```text
01/08 10:00
Usuário A criou cobrança
R$ 250

01/08 10:03
Usuário B aceitou cobrança

03/08 18:30
Usuário B informou pagamento

03/08 18:31
Usuário A confirmou pagamento
```

O histórico deverá permitir reconstruir o ciclo completo da operação.

---

# 30. Testes

O sistema deverá possuir testes automatizados para:

### Grupos

* Criação
* Participação
* Permissões
* Grupo individual

### Movimentações

* Criação
* Alteração
* Pagamento
* Recebimento
* Adiamento
* Cancelamento

### Transferências

* Mesmo usuário
* Usuários diferentes
* Aceite
* Rejeição

### Confirmações

* Aceite
* Rejeição
* Estados pendentes
* Reprocessamento

### Offline

* Operações offline
* Sincronização
* Idempotência
* Conflitos
* Recuperação

---

# 31. MVP

O MVP deverá conter:

## Usuários

* Cadastro
* Autenticação
* Grupo individual

## Grupos

* Criar grupo
* Adicionar usuário
* Remover usuário
* Múltiplos grupos

## Movimentações

* Receita
* Despesa
* Categorias
* Estados
* Histórico

## Transferências

* Entre grupos do mesmo usuário
* Solicitação entre usuários

## Cobranças

* Criar cobrança
* Aceitar
* Rejeitar
* Pagar
* Adiar
* Cancelar
* Confirmar alterações

## Consultas

* Dashboard
* Histórico
* Relatórios básicos

## Offline

* Persistência local
* Operação offline
* Sincronização

## Dados

* Importação
* Exportação
* Backup

## Engenharia

* Testes
* CI/CD
* Observabilidade

---

# 32. Critérios de Sucesso

O sistema será considerado funcional quando:

1. Cada usuário possuir automaticamente um grupo individual.
2. Usuários puderem criar grupos compartilhados.
3. Usuários puderem participar de múltiplos grupos.
4. Toda movimentação estiver associada a um grupo.
5. Movimentações possuírem ciclo de vida.
6. Usuários puderem transferir valores entre seus grupos.
7. Transferências para grupos de outros usuários gerarem solicitações.
8. O destinatário puder aceitar ou rejeitar solicitações.
9. O destinatário puder escolher seu grupo de destino.
10. Alterações de estado entre usuários puderem exigir confirmação.
11. O histórico preservar todas as etapas.
12. O sistema funcionar offline.
13. A sincronização não duplicar operações.
14. Relatórios refletirem corretamente os estados financeiros.
15. Dados puderem ser exportados e restaurados.

---

# 33. Documentação Relacionada

```text
docs/

requirements/
    system-requirements.md

domain/
    domain-model.md
    business-rules.md
    state-machine.md

architecture/
    architecture.md
    tech-spec.md

sync/
    synchronization.md
    conflict-resolution.md

api/
    api-spec.md

database/
    database-model.md

testing/
    testing-strategy.md

operations/
    observability.md
    backup.md
    deployment.md

cicd/
    pipeline.md
```

---

# 34. Histórico de Versões

| Versão | Descrição                                                                                                                                                                                    |
| ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1.0    | Documento inicial                                                                                                                                                                            |
| 2.0    | Modelo baseado em grupos e cobranças                                                                                                                                                         |
| 3.0    | Remoção do conceito de contas bancárias como entidade central; movimentações passaram a possuir ciclo de vida; transferências entre grupos e protocolo de confirmação bilateral introduzidos |
