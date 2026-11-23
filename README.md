# Eros — Portfolio

## Conteúdo dos projetos

Edite `app/data/ai-assisted.ts` e `app/data/legacy.ts`. Cada arquivo contém um array de projetos; os cards aparecem automaticamente na respectiva página. O Legacy contém cinco projetos reais importados do [portfólio antigo](https://eros-chagas-portfolio.netlify.app/), com nomes e descrições em português e inglês. Os links individuais de repositório foram omitidos porque não constavam na página de origem. AI Assisted contém o [File Manager](https://github.com/eroschagas/file-manager), com descrição bilíngue baseada no README do repositório, link para o download de Windows indicado nele e link para o código-fonte. Os mocks foram removidos.

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

### Imagens de AI Assisted

Os projetos de `app/data/ai-assisted.ts` aceitam um campo opcional `images`. Coloque os arquivos em `public/ai-assisted/<projeto>/` e liste-os na ordem de exibição:

```ts
images: [
  {
    src: "/ai-assisted/lunera/01-home.png",
    alt: { en: "Lunera home screen", pt: "Tela inicial do Lunera" },
    description: {
      en: "Optional description of the screen.",
      pt: "Descrição opcional da tela.",
    },
  },
],
```

O exemplo deve ser incluído dentro do objeto do projeto, junto de `name`, `description` e `link`, depois de adicionar a imagem real. `src` aceita um caminho a partir de `public` (sem incluir `public` na URL) ou uma URL absoluta HTTP/HTTPS. `alt` deve descrever a imagem nos dois idiomas; `description` é opcional e também bilíngue. Os arquivos não são descobertos automaticamente nesta seção. Projetos sem `images` ou com uma lista vazia continuam sem galeria. O mesmo campo também está disponível para Legacy, que compartilha o modelo e o card.

As miniaturas abrem a galeria existente de Work, com navegação por botões, teclado e toque. Publique um novo build após adicionar as imagens. Nenhuma imagem ilustrativa foi cadastrada nos projetos reais.

### Empresas e projetos de Work

Cada arquivo TypeScript em `app/data/work/` gera automaticamente um card em `/work`. O nome do arquivo define a rota da empresa: `econet.ts` abre `/work/econet`. Esse arquivo contém a experiência real na Econet Editora (07/2022 a 08/2024, período confirmado pelo autor) e 12 projetos com nomes e descrições bilíngues baseados nas informações fornecidas pelo autor. A apresentação da empresa foi resumida a partir do [site institucional](https://grupo.econeteditora.com.br/sobre-econet.html). As empresas fictícias e suas imagens foram removidas. Os projetos sem imagens não exibem galeria; para adicioná-las, use os respectivos IDs em `public/work/<id>/`.

`socarrao.ts` contém a experiência na SóCarrão (08/2024 a 11/2026, período confirmado pelo autor), com cinco itens bilíngues: responsabilidade técnica front-end, anúncios para particulares, adaptação à nova arquitetura de backend, gerenciamento interno e área logada para revendas. O conteúdo foi elaborado a partir das informações fornecidas pelo autor, sem adicionar projetos não confirmados. A página fica em `/work/socarrao`.

```ts
import type { WorkCompanyData } from "../../models/WorkCompany";

const company: WorkCompanyData = {
  name: { en: "Company name", pt: "Nome da empresa" },
  description: {
    en: "Company description.",
    pt: "Descrição da empresa.",
  },
  start: "01/2024",
  end: "12/2025",
  projects: [
    {
      id: "customer-portal",
      name: { en: "Customer Portal", pt: "Portal do cliente" },
      description: {
        en: "Project description.",
        pt: "Descrição do projeto.",
      },
    },
  ],
};

export default company;
```

O campo `start` é obrigatório e `end` é opcional. Ambos usam o formato `MM/AAAA` (por exemplo, `01/2026`). Omita `end` ou deixe uma string vazia para trabalhos atuais, exibidos como “Atual” em português e “Present” em inglês. O período aparece no card e, em tamanho discreto, abaixo da descrição na página da empresa. O mês deve ser válido e a data final não pode ser anterior à inicial.

A listagem mostra primeiro os trabalhos atuais, ordenados pelo `start` mais recente. Em seguida vêm os trabalhos concluídos, ordenados pelo `end` mais recente, usando `start` como desempate. Datas idênticas usam o slug da empresa para manter a ordem estável.

Use IDs únicos entre todas as empresas, em minúsculas e separados por hífen. O `id` é uma string independente do idioma e identifica a pasta de imagens. Apenas `name` e `description` possuem versões em português e inglês.

Em empresas e projetos de Work, `name` aceita um objeto com `pt` e `en` ou uma string única, como `"name": "Econet Editora"`. Uma string é exibida igualmente nos dois idiomas; um objeto usa a tradução correspondente ao idioma selecionado. `description` continua exigindo as duas versões. AI Assisted e Legacy também aceitam os dois formatos de nome.

Coloque as imagens diretamente em `public/work/<id>/`, por exemplo `public/work/customer-portal/01-home.png`. Não é necessário listar imagens no JSON. São aceitos PNG, JPG/JPEG, WebP, AVIF, GIF e SVG, ordenados pelo nome do arquivo; use prefixos como `01-`, `02-` e `03-` para controlar a ordem. Subpastas e arquivos que não são imagens são ignorados.

A lista de imagens é gerada ao iniciar o Nuxt ou gerar o build. Em desenvolvimento, adicionar ou remover arquivos em `public/work` faz o Nuxt reiniciar automaticamente e atualizar a galeria, sem reinício manual. Em produção, gere e publique um novo build. Uma pasta ausente ou sem imagens não gera galeria. Junto à descrição, as miniaturas aparecem lado a lado: até três em áreas maiores que 900 px, duas entre 561 e 900 px e uma em áreas de até 560 px. Havendo imagens restantes, um card `+N` mostra a quantidade não exibida. Clique em uma miniatura para abrir o carrossel ampliado naquela imagem; o card `+N` abre a primeira imagem oculta. No modal, há navegação circular por botões, setas do teclado e gesto horizontal de toque. Feche com Escape, botão de fechar ou clique no fundo. Uma imagem única não exibe contador de extras nem setas no modal.

Validação: `node --experimental-strip-types --test tests/work-models.test.mjs`. Após `npm run build`, execute `npm exec --yes --package=playwright -- node tests/work-gallery.mjs` com Google Chrome instalado para testar a navegação e o modal.

- `app/components/layout`: header, seletor de idioma e footer.
- `app/components/home`: seções independentes da home.
- `app/components/home/HomeCollectionCard.vue` e `HomeCodeArtwork.vue`: card de navegação e ilustração da home em SFCs próprios.
- `app/components/projects`: grid e card de projeto reutilizáveis.
- `app/models`: classes `Project`, `ProjectCollection` e `PortfolioProfile`, responsáveis pelos dados e comportamento do domínio.
- `app/services/ProjectRepository.ts`: leitura dos JSONs e criação das coleções de objetos.
- `CollectionCategory`, `CollectionRepository` e `useCollections`: definição tipada e compartilhada das categorias usadas na home e nas páginas de coleção.
- `app/pages`: composição das telas e integração com as rotas.
- `app/data/translations.ts`: catálogo de traduções; `app/composables/usePortfolio.ts` integra o catálogo ao estado reativo do idioma.
- `app/composables/useGalleryDialog.ts`: integração do modal com o estado do carrossel, pré-carregamento, bloqueio da rolagem e limpeza no ciclo de vida.
- Os componentes usam SFCs com `<script setup lang="ts">` e estilos SCSS locais com `scoped`. `app/assets/main.scss` mantém fontes, variáveis, resets e utilitários compartilhados; os mixins em `app/assets/styles` reutilizam a apresentação dos cards e das coleções sem depender de estilos globais de componentes.

Personalize nome, stack e redes sociais em `app/data/profile.ts`. O parâmetro global `?lang=pt` ou `?lang=en` define o idioma em qualquer página e atualiza o cookie `portfolio-language`. Sem um parâmetro válido, usa-se a preferência do cookie; se não houver uma preferência válida, o cookie é criado em inglês. Por exemplo: `/work/econet?lang=pt`. Valores inválidos ou parâmetros `lang` repetidos são ignorados. O seletor de idioma usa links com o parâmetro explícito, preservando outros parâmetros e o fragmento. Os links internos mantêm o idioma selecionado. O header ocupa a largura da janela e fica fixo durante a rolagem.

Valide a resolução do idioma com `node --experimental-strip-types --test tests/language-preference.test.mjs`. Após o build, `npm exec --yes --package=playwright -- node tests/language-routing.mjs` verifica a renderização no servidor, a criação do cookie, a prioridade do parâmetro e a navegação no Chrome.

## Nuxt

### SEO, idiomas e descoberta

O domínio oficial é `https://eros-chagas.netlify.app`, configurado em `nuxt.config.ts`. Para mudar de domínio, configure `NUXT_PUBLIC_SITE_URL` no ambiente de build e execução; veja `.env.example`. Não use URLs de preview como domínio canônico.

Cada página tem duas URLs indexáveis: `?lang=en` e `?lang=pt`. O parâmetro tem prioridade sobre o cookie, portanto cada URL entrega seu idioma no HTML inicial mesmo para visitantes com outra preferência salva. Canônicos próprios e alternates `en`, `pt-BR` e `x-default` são gerados por `usePageSeo`; a navegação e os links de idioma preservam URLs rastreáveis. As URLs antigas sem parâmetro continuam respeitando o cookie e apontam para a versão explícita correspondente. URLs com barra final nas páginas públicas redirecionam com HTTP 308 para a forma sem barra, preservando os parâmetros.

- `/sitemap.xml`: gerado a partir das páginas principais e dos arquivos `app/data/work/*.ts`, com ambas as versões de idioma e alternates recíprocos. Não inventa datas de modificação.
- `/robots.txt`: permite rastreamento em produção e referencia o sitemap. Desenvolvimento e previews recebem bloqueio de rastreamento, metadados `noindex` e cabeçalho `X-Robots-Tag`.
- `/llms.txt`: índice complementar bilíngue gerado com as mesmas rotas, identidade, stack e perfis públicos. Não substitui o HTML ou o sitemap e não garante citação por IA.
- JSON-LD: `Person`, `WebSite`, `ProfilePage` e `CollectionPage`, com listas dos projetos e links reais. Os dados vêm dos modelos existentes, sem duplicar descrições manualmente.
- Open Graph e cards sociais: títulos, descrições, URLs e idiomas localizados, com capturas reais da home em `public/social/portfolio-en.png` e `portfolio-pt.png` (1200 × 630).

O conteúdo dos subprojetos de Work está no HTML inicial, dentro de painéis `<details>` recolhidos. Não depende de JavaScript ou de um clique para existir no documento. As imagens continuam usando carregamento preguiçoso.

No Netlify, `CONTEXT=production` habilita indexação; deploy previews e branches ficam fora do índice. Fora do Netlify, builds de produção habilitam indexação por padrão. Defina `NUXT_PUBLIC_INDEXABLE=false` em qualquer ambiente privado e não sobrescreva essa opção com `true` em previews. Estes endpoints são rotas do servidor: publique com SSR (`npm run build` e o adaptador da hospedagem), não apenas a pasta estática `.output/public`. Não configure fallback de todas as URLs para uma página HTML com status 200, pois isso quebraria os 404 reais.

Ao adicionar empresas em Work, o próximo build atualiza o sitemap e o índice complementar automaticamente. Ao alterar projetos, os dados estruturados acompanham as fontes existentes. Ao criar novos tipos de página pública, atualize `discoveryPaths` em `nuxt.config.ts` e use `usePageSeo`. Ao alterar a home, revise as imagens sociais; gere-as novamente com o comando abaixo e execute outro build para incluir os PNGs atualizados:

```bash
npm run build
npm exec --yes --package=playwright -- node tests/seo.mjs --capture-social
npm run build
npm exec --yes --package=playwright -- node tests/seo.mjs
```

O teste valida o HTML SSR nos dois idiomas, canônicos, hreflang, XML, JSON-LD, metadados sociais, navegação no navegador, conteúdo dos subprojetos, respostas 404 e proteção de previews. Requer Google Chrome instalado. Testes do modelo de descoberta: `node --experimental-strip-types --test tests/site-discovery.test.mjs`.

Após publicar, confira as mesmas URLs no domínio real, envie `/sitemap.xml` ao Google Search Console e ao Bing Webmaster Tools nas contas do proprietário e acompanhe os relatórios de indexação. Verificações de propriedade exigem os tokens reais dessas plataformas. Confira também eventuais regras de firewall/CDN e autenticação da hospedagem, que podem bloquear crawlers independentemente do código. Nenhuma dessas configurações garante indexação, ranking ou inclusão em respostas de IA.

Referências: [Google Search Essentials](https://developers.google.com/search/docs/essentials), [Google AI features](https://developers.google.com/search/docs/appearance/ai-features), [versões localizadas](https://developers.google.com/search/docs/specialty/international/localized-versions) e [Bing Webmaster Guidelines](https://www.bing.com/webmasters/help/bing-webmaster-guidelines-30fba23a).

### Responsive regression check

After `npm run build`, run `npm exec --yes --package=playwright -- node tests/responsive.mjs` with Google Chrome installed. The audit checks the four main pages, Econet and SóCarrão in both languages at 11 widths from 360 to 1920 px, including horizontal overflow, header spacing, fixed positioning, and browser runtime errors. Playwright runs temporarily without changing the project dependencies.

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

## Work subprojects

Each file exports a default object typed as `WorkCompanyData`, providing editor suggestions and validation for companies, projects and nested subprojects.

Entries in `app/data/work/*.ts` accept an optional `subprojects` array. Each child uses the same fields and gallery as its parent. For example (replace the illustrative content with real project details):

```json
{
  "id": "parent-project",
  "name": { "en": "Project name", "pt": "Nome do projeto" },
  "description": { "en": "Project description", "pt": "Descri??o do projeto" },
  "subprojects": [
    {
      "id": "child-project",
      "name": { "en": "Subproject name", "pt": "Nome do subprojeto" },
      "description": {
        "en": "Subproject description",
        "pt": "Descri??o do subprojeto"
      }
    }
  ]
}
```

Place child images directly in `public/work/child-project/`, using the child's exact `id`, just as for top-level projects. Keep IDs unique across the portfolio. Subprojects appear in a collapsed panel below the parent gallery; empty or omitted arrays show no panel. Children may also contain `subprojects`. Names and descriptions must include English and Portuguese translations. Rebuild for production after adding images.
