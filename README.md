# Thezis Web

Thezis é um projeto pessoal que estou desenvolvendo para ajudar estudantes a se prepararem para a redação do ENEM. A ideia surgiu da minha própria necessidade de treinar redações de forma prática e receber feedback real — e resolvi transformar isso em um produto.

A aplicação permite que o estudante gere temas com textos de apoio simulando o formato do ENEM, escreva sua redação e receba uma análise detalhada com notas por competência, pontos de melhoria e dicas personalizadas geradas por IA.

> 🚧 Projeto em desenvolvimento ativo.

---

## 🛠️ Tecnologias

- [TypeScript](https://www.typescriptlang.org/)
- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)

---

## ⚙️ Instalação e configuração

**1. Clone o repositório**
```bash
git clone https://github.com/seu-usuario/thezis-web.git
cd thezis-web
```

**2. Instale as dependências**
```bash
npm install
```

**3. Configure as variáveis de ambiente**

Crie um arquivo `.env.local` na raiz do projeto com base no `.env.example`:
```bash
cp .env.example .env.local
```

Preencha as variáveis necessárias:
```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

---

## 🚀 Como rodar

**Desenvolvimento**
```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:3000`.

**Produção**
```bash
npm run build
npm start
```

---

## 🗂️ Estrutura do projeto

```
thezis-web/
├── app/
├── components/
│   └── ui/          # Componentes do shadcn/ui
├── contexts/
├── hooks/
├── lib/
├── public/
├── schemas/
├── types/
├── .env.example
├── docker-compose.yaml
├── Dockerfile
├── middleware.ts
└── README.md
```

---

## 🔗 Repositórios relacionados

- [thezis-api](https://github.com/seu-usuario/thezis-api) — API do projeto

---

## 📄 Licença

Este projeto está sob desenvolvimento. Todos os direitos reservados © Thezis.