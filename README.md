# Eros — Portfolio

## Conteúdo dos projetos

Edite `app/data/ai-assisted.json` e `app/data/legacy.json`. Cada arquivo contém um array de projetos; os cards aparecem automaticamente na respectiva página. O Legacy contém cinco projetos reais importados do [portfólio antigo](https://eros-chagas-portfolio.netlify.app/), com nomes e descrições em português e inglês. Os links individuais de repositório foram omitidos porque não constavam na página de origem. AI Assisted contém o [File Manager](https://github.com/eroschagas/file-manager), com descrição bilíngue baseada no README do repositório, link para o download de Windows indicado nele e link para o código-fonte. Os mocks foram removidos.

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

### Empresas e projetos de Work

Cada JSON em `app/data/work/` gera automaticamente um card em `/work`. O nome do arquivo define a rota da empresa: `aurora-studio.json` abre `/work/aurora-studio`. Aurora Studio e Northstar Labs são fictícias e estão identificadas como demonstrações. `econet.json` contém a experiência real na Econet Editora (07/2022 a 08/2024, período confirmado pelo autor) e 12 projetos com nomes e descrições bilíngues baseados nas informações fornecidas pelo autor. A apresentação da empresa foi resumida a partir do [site institucional](https://grupo.econeteditora.com.br/sobre-econet.html). Os projetos sem imagens não exibem galeria; para adicioná-las, use os respectivos IDs em `public/work/<id>/`.

```json
{
  "name": { "en": "Company name", "pt": "Nome da empresa" },
  "description": {
    "en": "Company description.",
    "pt": "Descrição da empresa."
  },
  "start": "01/2024",
  "end": "12/2025",
  "projects": [
    {
      "id": "customer-portal",
      "name": { "en": "Customer Portal", "pt": "Portal do cliente" },
      "description": {
        "en": "Project description.",
        "pt": "Descrição do projeto."
      }
    }
  ]
}
```

O campo `start` é obrigatório e `end` é opcional. Ambos usam o formato `MM/AAAA` (por exemplo, `01/2026`). Omita `end` ou deixe uma string vazia para trabalhos atuais, exibidos como “Atual” em português e “Present” em inglês. O período aparece no card e, em tamanho discreto, abaixo da descrição na página da empresa. O mês deve ser válido e a data final não pode ser anterior à inicial. As datas dos mocks são fictícias e devem ser substituídas junto com os dados das empresas; Northstar Labs demonstra um trabalho atual.

A listagem mostra primeiro os trabalhos atuais, ordenados pelo `start` mais recente. Em seguida vêm os trabalhos concluídos, ordenados pelo `end` mais recente, usando `start` como desempate. Datas idênticas usam o slug da empresa para manter a ordem estável.

Use IDs únicos entre todas as empresas, em minúsculas e separados por hífen. O `id` é uma string independente do idioma e identifica a pasta de imagens. Apenas `name` e `description` possuem versões em português e inglês.

Coloque as imagens diretamente em `public/work/<id>/`, por exemplo `public/work/customer-portal/01-home.png`. Não é necessário listar imagens no JSON. São aceitos PNG, JPG/JPEG, WebP, AVIF, GIF e SVG, ordenados pelo nome do arquivo; use prefixos como `01-`, `02-` e `03-` para controlar a ordem. Subpastas e arquivos que não são imagens são ignorados.

A lista de imagens é gerada ao iniciar o Nuxt ou gerar o build. Reinicie `npm run dev` após adicionar/remover imagens ou pastas; em produção, gere e publique um novo build. Uma pasta ausente ou sem imagens não gera galeria. Junto à descrição, as miniaturas aparecem lado a lado: até três em áreas maiores que 900 px, duas entre 561 e 900 px e uma em áreas de até 560 px. Havendo imagens restantes, um card `+N` mostra a quantidade não exibida. Clique em uma miniatura para abrir o carrossel ampliado naquela imagem; o card `+N` abre a primeira imagem oculta. No modal, há navegação circular por botões, setas do teclado e gesto horizontal de toque. Feche com Escape, botão de fechar ou clique no fundo. Uma imagem única não exibe contador de extras nem setas no modal. As imagens dos mocks são ilustrações SVG, não trabalhos reais.

Validação: `node --experimental-strip-types --test tests/work-models.test.mjs`. Após `npm run build`, execute `npm exec --yes --package=playwright -- node tests/work-gallery.mjs` com Google Chrome instalado para testar a navegação e o modal.

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

After `npm run build`, run `npm exec --yes --package=playwright -- node tests/responsive.mjs` with Google Chrome installed. The audit checks the four main pages, both demo company pages and Econet in both languages at 11 widths from 360 to 1920 px, including horizontal overflow, header spacing, fixed positioning, and browser runtime errors. Playwright runs temporarily without changing the project dependencies.

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
