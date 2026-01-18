# Dashboard - Desafio Técnico

Dashboard desenvolvido para visualização de métricas de produtos e usuários. O projeto foca em arquitetura escalável, performance e fidelidade ao layout proposto, utilizando **Next.js** e **SCSS**.

## 🛠 Tech Stack

* **Core:** Next.js 16 + React 19
* **Linguagem:** TypeScript 5
* **Estilização:** SCSS (Sass) + CSS Modules
* **Gerenciador de Pacotes:** NPM

## 🏗 Arquitetura & Decisões Técnicas

### 1. CSS Grid & Layout Global
Optei por utilizar **CSS Grid Areas** no `layout.tsx` global.
* **Motivo:** Permite fixar o Header e a Sidebar visualmente enquanto apenas o conteúdo (`main`) possui scroll. Isso garante uma estrutura semântica (`<header>`, `<aside>`, `<main>`) e responsiva.
* **Implementação:** As dimensões do grid (largura da sidebar, altura do header) foram abstraídas para variáveis, facilitando ajustes futuros.

### 2. Design System & Tokens
Implementei um sistema de **Design Tokens** via variáveis SCSS (`_variables.scss`).
* **Paleta de Cores:** Adotei a identidade utilizada no site da Omie https://www.omie.com.br/.
* **Escalabilidade:** Espaçamentos e cores centralizados permitem mudanças globais com uma única linha de código.

### 3. Modularização (CSS Modules)
Utilizei **CSS Modules** (`styles.module.scss`) para todos os componentes.
* **Motivo:** Garante escopo local para as classes, evitando conflitos de especificidade e "vazamento" de estilos (side-effects).
* **Padrão de Nomenclatura:** Adotei **CamelCase** para as classes para alinhar com a sintaxe de importação do JavaScript.