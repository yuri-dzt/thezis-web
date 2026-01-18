# 📁 Documentação de Arquitetura – Stack Base Frontend

Este documento descreve **como o projeto frontend está organizado**, **por que essa organização existe** e **quais padrões devem ser seguidos** ao evoluir a aplicação.

Ele serve como **manual técnico** para desenvolvedores que utilizam ou estendem o Stack Base Frontend.

---

## 🎯 Objetivo da Arquitetura

A arquitetura deste projeto foi definida para:

- Separar interface de regras de negócio  
- Facilitar manutenção e reutilização  
- Padronizar comunicação com o backend  
- Garantir tipagem e validação consistentes  
- Servir como base escalável para aplicações reais

O projeto segue boas práticas do ecossistema **Next.js App Router**, com abordagem server-first e componentes reutilizáveis.

---

## 🧱 Visão Geral do Fluxo

Página (app/)
↓
Componente
↓
Action (server)
↓
Service / lib
↓
API Backend
↓
Resposta tratada
↓
UI atualizada


### Regras importantes

- Actions são responsáveis por orquestração  
- Services centralizam comunicação HTTP  
- Validações são feitas com Zod  
- Tipagem deve ser forte ponta a ponta

---

## 📂 Estrutura de Pastas

stack-base-frontend/
│
├── app/ # Rotas e páginas Next.js
│ ├── (auth)/
│ └── page.tsx
│
├── components/ # Componentes reutilizáveis
│ └── ui/ # Base shadcn/Radix
│
├── hooks/ # Hooks customizados
│
├── lib/ # Comunicação com API
│ └── apiClient.ts
│
├── types/ # Tipagens globais
│
├── context/ # Estados globais
│ ├── theme
│
├── public/
├── Dockerfile
├── docker-compose.yml
├── README.md
├── docs.md
├── .env.example
└── .env.local


---

## 📌 Responsabilidade das Camadas

### `app/`

- Contém todas as rotas da aplicação  
- Cada pasta representa uma página ou módulo  
- Pode conter:
  - page.tsx  
  - layout.tsx  
  - loading.tsx  
  - error.tsx  
  - server actions

Responsável por orquestrar UI e chamadas às actions.

---

### `components/`

- Componentes reutilizáveis  
- Baseados em:
  - shadcn/ui  
  - Radix  
  - Tailwind

A UI deve ser desacoplada de regras de negócio.

---

### `hooks/`

- Lógica reutilizável do React  
- Exemplos:
  - useAuth  
  - useFetch  
  - useDebounce  
  - useTheme

Mantém componentes limpos e focados apenas na renderização.

---

### `lib/`

- Comunicação com o backend  
- Centraliza:
  - fetch  
  - headers  
  - tokens  
  - tratamento de erro

---

### `types/`

- Tipagens globais  
- Interfaces de DTO  
- Contratos de resposta da API

---

### `context/`

- Estados globais:
  - Tema  

---

## 🔐 Autenticação no Frontend

O frontend foi projetado para trabalhar com:

- JWT (access token)  
- Sessões persistidas  

### Fluxo básico

Login →
Recebe tokens →
Salva sessão →
Acessa rotas protegidas

---

## 🚫 Regras Arquiteturais (Obrigatórias)

- ❌ Validações sem Zod  
- ❌ Misturar UI com acesso a API

---

## 🧪 Boas Práticas

- Componentização reutilizável  
- Services isolados  
- Tipagem forte  
- Actions server-first  
- Hooks desacoplados  
- UI independente da API

---

## ✅ Checklist de Qualidade

### UI
- Componentes reutilizáveis  
- Tailwind padronizado  
- shadcn como base

### Dados
- Zod para validação  
- Types centralizados  
- Services tipados

### Arquitetura
- Actions server-first  
- Hooks sem acoplamento  
- Contexts isolados

---

## 🎁 Benefícios da Estrutura

- Código organizado  
- Escalável  
- Fácil manutenção  
- Integração clara com backend  
- Padrão profissional

> Este documento define o padrão do Stack Base Frontend. Adaptações são permitidas desde que a consistência arquitetural seja mantida.

