# 🚀 Stack Base Frontend

<div align="center">

![Next.js](https://img.shields.io/badge/next-16-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/react-19-61DAFB?style=for-the-badge&logo=react)
![Tailwind](https://img.shields.io/badge/tailwind-4-38B2AC?style=for-the-badge&logo=tailwindcss)
![TypeScript](https://img.shields.io/badge/typescript-5-blue?style=for-the-badge&logo=typescript)
![Zod](https://img.shields.io/badge/zod-validation-3068b7?style=for-the-badge)
![Docker](https://img.shields.io/badge/docker-ready-2496ED?style=for-the-badge&logo=docker)

**Starter kit frontend profissional, organizado e escalável, baseado em Next.js App Router e boas práticas modernas.**

</div>

---

## 📌 Visão geral

O **Stack Base Frontend** é um *starter kit* para aplicações em Next.js criado para servir como base sólida de projetos reais — SaaS, ERPs, painéis administrativos e interfaces modernas integradas a APIs.

Ele foi pensado para desenvolvedores que:

- desejam um ponto de partida profissional  
- não querem reinventar estrutura a cada projeto  
- valorizam organização, tipagem e produtividade  
- precisam de integração clara com backend

Este projeto entrega um padrão reutilizável para construção de frontends escaláveis.

---

## 🎯 Objetivos do projeto

- Padronizar a criação de novos frontends  
- Centralizar boas práticas de UI e arquitetura  
- Separar interface de regras de negócio  
- Facilitar manutenção e evolução  
- Servir como base profissional e material de referência

---

## 🧱 Arquitetura

Baseado no **Next.js App Router**, o projeto adota:

- Componentes reutilizáveis  
- Actions server-first  
- Services isolados  
- Validação com Zod  
- Tipagem forte ponta a ponta

Fluxo simplificado:

Página → Componente → Action → Service → API → UI atualizada


---

## 🛠️ Tecnologias

- **Next.js 16 – App Router**  
- **React 19**  
- **Tailwind CSS 4**  
- **shadcn/ui + Radix**  
- **React Hook Form**  
- **Zod**  
- **TanStack Table**  
- **Socket.io**  
- **next-themes**  
- **lucide-react**  
- **iconoir-react**

---

## 📁 Organização do código

A estrutura foi desenhada para deixar clara a responsabilidade de cada parte:

- `app/` → rotas e páginas  
- `components/` → componentes reutilizáveis  
- `hooks/` → lógica React reutilizável  
- `lib/` → comunicação com API  
- `types/` → tipagens globais  
- `context/` → estados globais

A documentação detalhada está disponível em **docs.pdf**.

---

## ⚡ Começando

### 1. Instalação

```bash
pnpm install
```

2. Variáveis de ambiente

Crie um .env.local baseado no .env.example:
```bash
NEXT_PUBLIC_API_URL=http://localhost:3333
```

3. Executar o projeto
```bash
pnpm dev
```

Build:

```bash
pnpm build
pnpm start
```

🐳 Docker (opcional)
```bash
docker-compose up -d
```

Ambiente isolado e padronizado para execução do frontend.

---

✅ Boas práticas aplicadas

Componentes sem regra de negócio
Validação com Zod nas actions
Services isolados
Tipagem forte
Reutilização via hooks
UI desacoplada da API

---

📦 Quando usar este stack

Painéis administrativos
Frontends para APIs REST
SaaS e ERPs
Sistemas com autenticação JWT
Aplicações que precisam escalar

---


## 👨‍💻 Autor

**Yuri Donizete**
Frontend Developer • Next.js Enthusiast

* GitHub: `yuri-dzt`
* LinkedIn: `Yuri Donizete`
* Email: `yuridonizete303@gmail.com`

---

> Este projeto é opinativo. Siga o padrão, adapte quando necessário e mantenha a consistência arquitetural.
