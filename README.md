# Site Profissional — Romulo Galvao

Site institucional e portfólio profissional de **Romulo Galvao** (Rômulo Galvão de Araújo Souza) — Especialista em Desenvolvimento Web (PHP / Laravel), Engenharia de Servidores Linux, Redes Corporativas MikroTik e Cibersegurança.

---

## 🚀 Visão Geral e Recursos

- **Design System & UX/UI Corporativo**: Interface sóbria, elegante e moderna com tema escuro (Dark Mode) padrão e alternância para tema claro (Light Mode) com persistência em `localStorage`.
- **Performance de Alto Nível**: Vanilla JavaScript e CSS3 puro, sem dependências pesadas externas, garantindo pontuação máxima no Google Core Web Vitals e PageSpeed Insights.
- **Copywriting Técnico B2B**: Seções com comunicação madura no formato *Problema → Solução → Benefício*, ideal para tomada de decisão por gestores, diretores e recrutadores.
- **Acessibilidade & Semântica**: Estrutura em conformidade com as diretrizes WCAG 2.1 AA (foco visível, navegação por teclado, contraste verificado e leitor de tela).
- **SEO Completo**: Metadados Open Graph para pré-visualizações ricas no WhatsApp e LinkedIn, Twitter Cards, `sitemap.xml`, `robots.txt` e dados estruturados Schema.org (`Person` e `ProfessionalService`).
- **Resumo Executivo para Impressão**: Suporte a folha de impressão (`print.css`), formatando automaticamente o site em um currículo executivo limpo ao pressionar `Ctrl + P` ou clicar em "Imprimir Perfil".

---

## 📁 Estrutura de Arquivos

```
site_romulo_galvao/
├── index.html                   # Documento HTML5 semântico e estruturado
├── robots.txt                   # Diretivas para motores de busca
├── sitemap.xml                  # Mapa XML do site
├── README.md                    # Documentação do projeto
└── assets/
    ├── css/
    │   ├── style.css            # Folha de estilos master (Design System, Dark/Light, Layout)
    │   └── print.css            # Estilo otimizado para impressão / PDF
    ├── js/
    │   └── main.js              # Controlador JavaScript (Temas, Menus, Filtros, Contato, WhatsApp)
    └── images/
        ├── favicon.svg          # Favicon vetorial com monograma RG
        ├── placeholder-avatar.svg # Avatar vetorial profissional
        └── og-image.svg         # Banner para compartilhamento social
```

---

## 🛠️ Instruções de Personalização

### 1. Inserir sua Foto Profissional
Quando desejar utilizar uma foto sua:
1. Adicione sua fotografia na pasta `assets/images/` (ex: `foto-romulo.jpg` ou `foto-romulo.png`).
2. No arquivo `index.html`, localize a tag `<img src="assets/images/placeholder-avatar.svg"...>` e altere o atributo `src` para `assets/images/foto-romulo.jpg`.

### 2. Configurar o Número do WhatsApp Direto
No arquivo `assets/js/main.js`, localize a linha:
```javascript
const phone = '5584999999999'; // Substitua pelo seu número com DDD (ex: 5584988887777)
```
Insira o seu número no formato internacional (`55` + `DDD` + `NÚMERO`).

### 3. Configurar o Domínio / E-mail de Recebimento
- No `index.html`, atualize as URLs canônicas caso venha a utilizar um domínio personalizado.
- No `assets/js/main.js`, o e-mail padrão configurado é `contato@romulogalvao.com.br`.

---

## 🌐 Como Publicar / Hospedar

### Opção A: GitHub Pages (Gratuito e Rápido)
1. Crie um repositório no seu GitHub (ex: `romuog/romuog.github.io` ou `romuog/site-profissional`).
2. Faça o push dos arquivos deste diretório para a branch `main`.
3. Em **Settings > Pages**, selecione a branch `main` e a pasta `/ (root)`.

### Opção B: Servidor Próprio Linux (Nginx / Apache)
Como você domina Linux e servidores:
1. Aponte o VirtualHost do Nginx para a pasta `/var/www/site_romulo_galvao`.
2. Habilite compactação Gzip e cache de cabeçalhos para arquivos estáticos (`.svg`, `.css`, `.js`).
3. Emita o certificado SSL gratuito via Certbot: `sudo certbot --nginx -d seudominio.com.br`.

---

## 📄 Licença e Direitos
Copyright © 2026 **Romulo Galvao**. Todos os direitos reservados.
