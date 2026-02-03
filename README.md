# SysControleGastos — Full-Stack App

Sistema de **controle de gastos**, desenvolvido como projeto **Full-Stack**, com backend em **ASP.NET Core (.NET)** e frontend em **Next.js 14**, utilizando **SQLite** como banco de dados.

Projeto criado com foco em organização de arquitetura, boas práticas, clareza de responsabilidades e preparação para evolução futura.

---

## 🛠️ Tecnologias Utilizadas

### 🔹 Frontend

- **Next.js 14** (React 18 — App Router)
- **TypeScript**
- **Tailwind CSS**
- **Radix UI** (componentes acessíveis)
- **React Hook Form + Zod** (formulários e validação)
- **@tanstack/react-table** (tabelas dinâmicas)
- **date-fns / react-day-picker** (datas)
- **react-number-format** (inputs monetários)
- **Lucide Icons**

Utilização de **shadcn/ui**, permitindo total controle e customização dos componentes

Ferramentas de qualidade:

- ESLint
- Prettier (+ plugin Tailwind)
- Husky + lint-staged
- Commit message lint

---

### 🔹 Backend

- **ASP.NET Core (.NET)**
- **Entity Framework Core**
- **SQLite** (banco local)
- API REST

---

## 🚀 Funcionalidades

### Frontend

- Formulários tipados com validação
- Componentes reutilizáveis e acessíveis
- Tabelas dinâmicas
- Inputs de datas e valores monetários
- Layout responsivo

### Backend

- API REST para operações de CRUD
- Persistência com SQLite
- Inicialização automática do banco de dados
- Estrutura em camadas visando manutenção e escalabilidade

---

## 🧩 Estrutura do Projeto

```
/
├── backend/ # API ASP.NET Core
├── frontend/ # Next.js 14 (React)
├── README.md
```

---

## 📥 Pré-requisitos

### Backend

- .NET 7 ou superior
- EF Core Tools (opcional, para migrations)

### Frontend

- Node.js (versão LTS recomendada)
- npm ou yarn

---

## ▶️ Como Rodar o Projeto

### 🔹 Backend

```bash
cd backend
dotnet restore
dotnet build
dotnet ef database update
dotnet run

```

A API estará disponível em:

http://localhost:5266

Frontend
cd frontend
npm install
npm run dev

O frontend estará disponível em:

http://localhost:3000
