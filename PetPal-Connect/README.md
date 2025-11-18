🐾 PetPal Connect
Sistema web para gestão de saúde e cuidados de animais de estimação (Vacinas, Medicamentos, Agenda e Perfil).

🛠️ Tecnologias Utilizadas
Frontend: React, Vite

Linguagem: JavaScript (JSX)

Estilização: Tailwind CSS

Ícones & UI: Lucide React, Radix UI (Simulado)

Animações: Framer Motion

Backend (BaaS): Supabase (PostgreSQL)

 Como Rodar o Projeto


npm install react-router-dom lucide-react framer-motion clsx tailwind-merge date-fns lodash @supabase/supabase-js



npm install -D tailwindcss postcss autoprefixer
3. Configuração do Banco de Dados (Supabase)
Crie um projeto no Supabase.

Vá no SQL Editor do Supabase e rode este script para criar as tabelas:

SQL

-- Tabela de Pets
create table pets (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  nome text not null,
  tipo_animal text not null,
  raca text,
  idade numeric,
  peso numeric,
  sexo text,
  cor text,
  foto_url text,
  observacoes text,
  data_nascimento date,
  castrado boolean default false,
  microchip text
);

-- Tabela de Medicamentos
create table medicamentos (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  pet_id uuid references pets(id) not null,
  nome_medicamento text not null,
  dosagem text,
  horarios text,
  data_inicio date,
  duracao_dias numeric,
  instrucoes text,
  status text default 'ativo'
);

-- Tabela de Eventos Médicos (Calendário)
create table eventos_medicos (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  pet_id uuid references pets(id) not null,
  tipo text not null,
  titulo text not null,
  descricao text,
  data date,
  hora text,
  veterinario text,
  clinica text,
  status text default 'agendado',
  preco numeric,
  lembrete boolean default true
);
4. Configuração das Variáveis de Ambiente
Crie um arquivo chamado .env na raiz do projeto e adicione suas chaves do Supabase (pegue em Project Settings > API):

Snippet de código

VITE_SUPABASE_URL=Sua_URL_do_Supabase_Aqui
VITE_SUPABASE_ANON_KEY=Sua_Chave_Anon_Public_Aqui
(Caso prefira, pode colocar direto no arquivo src/lib/supabase.js).

5. Executar o Projeto
Para iniciar o servidor de desenvolvimento:

Bash

npm run dev
Acesse no navegador: http://localhost:5173