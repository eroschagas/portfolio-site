# Eros — Portfolio

## Conteúdo dos projetos

Edite `app/data/ai-assisted.json` e `app/data/legacy.json`. Cada arquivo contém um array de projetos; os cards aparecem automaticamente na respectiva página. Os arquivos incluem mocks identificados como exemplos, com conteúdo em português e inglês e links do Google. Substitua-os pelos seus projetos reais antes de publicar. Há exemplos com GitHub preenchido, omitido e vazio, além de títulos e descrições de tamanhos diferentes.

```json
[
  {
    "name": "My project",
    "description": {
      "en": "What the project does and how it was built.",
      "pt": "O que o projeto faz e como foi construído."
    },
    "link": "https://example.com",
    "github": "https://github.com/your-user/your-project"
  }
]
```

`name`, `description` e `link` são obrigatórios. `github` é opcional: remova a propriedade se não houver um repositório público. Links devem ser URLs absolutas HTTP ou HTTPS. Tanto `name` quanto `description` aceitam texto simples, usado nos dois idiomas, ou um objeto com as chaves `en` e `pt`. Ao usar um objeto, preencha os dois idiomas. Não use comentários nem vírgulas finais nos JSONs.

Durante `npm run dev`, alterações nos arquivos são recarregadas. Em produção, gere um novo build para publicar alterações nos JSONs.

## Arquitetura

- `app/components/layout`: header, seletor de idioma e footer.
- `app/components/home`: seções independentes da home.
- `app/components/projects`: grid e card de projeto reutilizáveis.
- `app/models`: classes `Project`, `ProjectCollection` e `PortfolioProfile`, responsáveis pelos dados e comportamento do domínio.
- `app/services/ProjectRepository.ts`: leitura dos JSONs e criação das coleções de objetos.
- `app/pages`: composição das telas e integração com as rotas.
- `app/composables/usePortfolio.ts`: traduções e estado reativo do idioma, integrado à Composition API do Vue.

Personalize nome, stack e redes sociais em `app/data/profile.ts`. O idioma inicial é inglês; uma preferência já salva pelo visitante é respeitada. O header ocupa a largura da janela e fica fixo durante a rolagem.

## Nuxt

### Responsive regression check

After `npm run build`, run `npm exec --yes --package=playwright -- node tests/responsive.mjs` with Google Chrome installed. The audit checks all four pages in both languages at 11 widths from 360 to 1920 px, including horizontal overflow, header spacing, fixed positioning, and browser runtime errors. Playwright runs temporarily without changing the project dependencies.

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
