import type { WorkCompanyData } from "../../models/WorkCompany";

const company: WorkCompanyData = {
  name: "SóCarrão",
  description: {
    en: "Vehicle listing platform connecting private sellers, dealerships and buyers. My work includes front-end development, code reviews and responsibility for code quality and architecture across the company's two systems, alongside platform maintenance, backend integration and the development of listing flows, internal management tools and the partner dealership area.",
    pt: "Plataforma de anúncios de veículos que conecta vendedores particulares, revendas e compradores. Minha atuação inclui desenvolvimento front-end, code review e responsabilidade pela qualidade do código e pela arquitetura dos dois sistemas da empresa, além de manutenção da plataforma, integração com o backend e desenvolvimento de fluxos de anúncios, ferramentas de gestão interna e área logada para revendas parceiras.",
  },
  start: "08/2024",
  end: "11/2026",
  projects: [
    {
      id: "socarrao-front-end-development-code-review",
      name: {
        en: "Front-end Development and Code Review",
        pt: "Desenvolvimento Front-end e Code Review",
      },
      description: {
        en: "Front-end development of new features, evolutionary maintenance and bug fixes across SóCarrão's two systems. In addition to writing code, I reviewed other developers' contributions and was responsible for code quality and architecture, focusing on organization, consistent development standards, scalability and maintainability.",
        pt: "Atuação como desenvolvedor front-end na implementação de novas funcionalidades, manutenção evolutiva e correção de bugs nos dois sistemas da SóCarrão. Além de escrever código, realizava code review das contribuições de outros desenvolvedores e era responsável pela qualidade do código e pela arquitetura, com foco em organização, padronização, escalabilidade e manutenibilidade.",
      },
    },
    {
      id: "socarrao-private-seller-listings",
      name: {
        en: "Private Seller Listings",
        pt: "Anunciante Particular SóCarrão",
      },
      description: {
        en: "Development of a new vehicle listing structure for private sellers, using reusable components and a more robust architecture. The implementation introduced more direct and efficient communication with the backend, improving performance and maintainability while establishing a foundation for evolving the listing experience.",
        pt: "Desenvolvimento de uma nova estrutura de anúncios de veículos voltada a pessoas físicas, utilizando componentes reutilizáveis e uma arquitetura mais robusta. A implementação trouxe uma comunicação mais direta e eficiente com o backend, melhorando o desempenho e a manutenibilidade e criando uma base para a evolução da experiência de anúncio.",
      },
    },
    {
      id: "socarrao-backend-architecture-migration",
      name: {
        en: "Front-end Migration to the New Backend Architecture",
        pt: "Adaptação à Nova Arquitetura de Backend",
      },
      description: {
        en: "Complete adaptation of the website's front end to a new backend architecture, including updated API routes and response structures. Existing endpoint integrations were refactored for compatibility with the new API, with a focus on maintaining platform stability throughout the transition.",
        pt: "Adaptação completa do front-end do site a uma nova arquitetura de backend, com atualização de rotas e estruturas de retorno da API. As integrações com os endpoints antigos foram refatoradas para compatibilidade com a nova API, com foco em manter a estabilidade da plataforma durante a transição.",
      },
    },
    {
      id: "socarrao-internal-management-platform",
      name: {
        en: "Internal Management Platform",
        pt: "Sistema de Gerenciamento Interno SóCarrão",
      },
      description: {
        en: "Development of an internal system for managing users, vehicles and registration records within the platform's new architecture. The tool supports maintenance, editing and control of administrative data that is not accessible to end users, bringing internal management workflows into a dedicated interface.",
        pt: "Desenvolvimento de um sistema interno para gerenciamento de usuários, veículos e cadastros na nova arquitetura da plataforma. A ferramenta apoia a manutenção, edição e controle de dados administrativos não acessíveis aos usuários finais, reunindo os fluxos de gestão interna em uma interface dedicada.",
      },
      subprojects: [
        {
          id: "socarrao-internal-users",
          name: { en: "Users", pt: "Usuários" },
          description: {
            en: "User listing interface with multiple search filters and actions for viewing and editing registration records, deactivating or blocking accounts, and requesting password changes. For professional users representing dealerships, it also supports creating and editing featured listing packages and websites for specific dealerships. Access to these features depends on the permissions assigned to the logged-in account.",
            pt: "Interface de listagem de usuários com diversos filtros de busca e ações para visualização e edição dos cadastros, inativação e bloqueio de contas e solicitação de alteração de senha. Para usuários profissionais, que representam revendas, também permite criar e editar pacotes de destaques e sites para revendas específicas. O acesso a essas funcionalidades depende das permissões atribuídas à conta logada.",
          },
        },
        {
          id: "socarrao-internal-groups",
          name: { en: "Groups", pt: "Grupos" },
          description: {
            en: "Interface for organizing dealership groups and assigning their administrators. Dealerships are linked to the group as professional users representing businesses, while administrators are registered as common users representing individuals. This relationship gives administrators access to the group's dealerships in the Partner Dealership Portal, where they can select a specific dealership and perform all the actions available to that dealership's own account.",
            pt: "Interface para organização de grupos de revendas e definição de seus administradores. As revendas são vinculadas ao grupo como usuários do tipo profissional, que representam empresas, enquanto os administradores são cadastrados como usuários do tipo comum, que representam pessoas físicas. Esse vínculo permite que os administradores acessem as lojas do grupo na Área Logada SóCarrão, escolham uma revenda específica e realizem todas as ações disponíveis para a própria conta da revenda.",
          },
        },
        {
          id: "socarrao-internal-permissions",
          name: { en: "Permissions", pt: "Permissões" },
          description: {
            en: "Interface for managing permissions that define access to internal system features.",
            pt: "Interface para gerenciamento das permissões que definem o acesso às funcionalidades do sistema interno.",
          },
        },
        {
          id: "socarrao-internal-integrator",
          name: { en: "Integrator", pt: "Integrador" },
          description: {
            en: "Administrative page dedicated to managing the platform's integrator-related records.",
            pt: "Página administrativa dedicada à gestão dos cadastros relacionados ao integrador da plataforma.",
          },
        },
        {
          id: "socarrao-internal-brands",
          name: { en: "Vehicle Brands", pt: "Marcas" },
          description: {
            en: "Interface for managing the vehicle brands, models and versions registered on the website. It lists existing brands and allows new brands to be added. Selecting a brand opens its content for editing. The brand creation and editing modal also supports SEO content for display on the website. With a brand selected, users can add models or select an existing model from that brand's list. The model creation and editing modal likewise supports SEO content, displayed on the website when searching for that specific model. Selecting a model provides access to its versions and the option to add a new one. Selecting a version displays its data and allows its content to be edited, without SEO content fields.",
            pt: "Interface para gerenciamento das marcas, modelos e versões de veículos cadastrados no site. A tela lista as marcas existentes e permite cadastrar novas marcas. Ao selecionar uma marca, é possível editar seu conteúdo. O modal de cadastro e edição da marca também permite incluir conteúdo de SEO para exibição no site. Com uma marca selecionada, é possível cadastrar novos modelos ou selecionar um modelo da lista daquela marca. O modal de cadastro e edição de modelos também permite incluir conteúdo de SEO, exibido no site quando há uma pesquisa pelo modelo específico. Ao selecionar um modelo, ficam disponíveis a lista de versões e a opção de adicionar uma nova versão. A seleção de uma versão exibe seus dados e permite editar seu conteúdo, sem campos de conteúdo de SEO.",
          },
        },
        {
          id: "socarrao-internal-inspected-vehicles",
          name: { en: "Inspected Vehicles", pt: "Vistoriados" },
          description: {
            en: "Administrative page for managing vehicles associated with the Vistoriados product.",
            pt: "Página administrativa para gerenciamento dos veículos vinculados ao produto Vistoriados.",
          },
        },
        {
          id: "socarrao-internal-equalizer",
          name: { en: "Equalizer", pt: "Equalizador" },
          description: {
            en: "Administrative page dedicated to the Equalizador feature within the platform's featured listing tools.",
            pt: "Página administrativa dedicada à funcionalidade Equalizador, na área de ferramentas de destaque de anúncios da plataforma.",
          },
        },
        {
          id: "socarrao-internal-vehicle-fair",
          name: { en: "Vehicle Fair", pt: "Feirão" },
          description: {
            en: "Administrative page for managing the Feirão feature within the platform's featured listing area.",
            pt: "Página administrativa para gerenciamento da funcionalidade Feirão na área de destaques da plataforma.",
          },
        },
        {
          id: "socarrao-internal-moderation",
          name: { en: "Moderation", pt: "Moderação" },
          description: {
            en: "Interface for reviewing and moderating vehicle listings submitted by private sellers.",
            pt: "Interface para análise e moderação dos anúncios de veículos enviados por anunciantes particulares.",
          },
        },
        {
          id: "socarrao-internal-coupons",
          name: { en: "Coupons", pt: "Cupom" },
          description: {
            en: "Administrative page for managing coupons associated with the private seller area.",
            pt: "Página administrativa para gerenciamento de cupons vinculados à área de anunciantes particulares.",
          },
        },
      ],
    },
    {
      id: "socarrao-dealership-portal",
      name: {
        en: "Partner Dealership Portal",
        pt: "Área Logada SóCarrão",
      },
      description: {
        en: "Development of the authenticated area for SóCarrão's partner dealerships. Features include a dashboard with performance charts and statistics, vehicle creation and management, featured listing management, financial information and boleto payments. The portal also provides access to vehicles advertised by private users and tools for managing leads.",
        pt: "Desenvolvimento da área logada destinada às revendas parceiras da SóCarrão. As funcionalidades incluem dashboard com gráficos e estatísticas de desempenho, cadastro e gestão de veículos e seus respectivos destaques, consulta de informações financeiras e pagamento de boletos. O portal também permite visualizar veículos anunciados por usuários e gerenciar leads.",
      },
    },
  ],
};

export default company;
