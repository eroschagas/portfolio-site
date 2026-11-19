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
      images: [
        {
          alt: {
            en: "Internal system home in light mode",
            pt: "Página inicial do sistema interno em modo claro",
          },
          description: {
            en: "Welcome screen with the logged-in account summary and sidebar navigation to the administrative modules.",
            pt: "Tela de boas-vindas com resumo da conta logada e navegação lateral para os módulos administrativos.",
          },
        },
        {
          alt: {
            en: "Internal system home in dark mode",
            pt: "Página inicial do sistema interno em modo escuro",
          },
          description: {
            en: "Dark theme applied to the home screen, sidebar and account summary.",
            pt: "Tema escuro aplicado à página inicial, ao menu lateral e ao resumo da conta.",
          },
        },
      ],
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
          images: [
            {
              alt: {
                en: "User table with search filters and account statuses",
                pt: "Tabela de usuários com filtros de busca e status das contas",
              },
              description: {
                en: "User listing with searches by name, email and document, filters by account type and status, and actions for each record.",
                pt: "Listagem de usuários com buscas por nome, e-mail e documento, filtros por tipo e status da conta e ações por cadastro.",
              },
            },
            {
              alt: {
                en: "Actions menu for a professional user",
                pt: "Menu de ações de um usuário profissional",
              },
              description: {
                en: "Account actions include viewing, editing, managing packages, creating a site, blocking, deactivating and requesting a new password, according to permissions.",
                pt: "Ações da conta incluem visualizar, editar, gerenciar pacotes, criar site, bloquear, inativar e solicitar nova senha, conforme as permissões.",
              },
            },
            {
              alt: {
                en: "User editing modal on the data tab",
                pt: "Modal de edição de usuário na aba de dados",
              },
              description: {
                en: "Form for editing account details, address, professional registration, feature flags and plan information.",
                pt: "Formulário de edição dos dados da conta, endereço, cadastro profissional, opções de funcionalidades e informações do plano.",
              },
            },
            {
              alt: {
                en: "User editing modal on the files tab",
                pt: "Modal de edição de usuário na aba de arquivos",
              },
              description: {
                en: "Files tab for managing the account logo and attached documents, with upload, editing and removal controls.",
                pt: "Aba de arquivos para gerenciar a logomarca da conta e os documentos anexados, com controles de envio, edição e remoção.",
              },
            },
            {
              alt: {
                en: "User details modal showing registration and address",
                pt: "Modal de visualização de usuário com cadastro e endereço",
              },
              description: {
                en: "Read-only account summary brings together contact details, address, business registration and enabled features.",
                pt: "Resumo de consulta da conta reúne contato, endereço, cadastro da empresa e funcionalidades habilitadas.",
              },
            },
            {
              alt: {
                en: "Featured listing allocation in the user details modal",
                pt: "Distribuição de destaques no modal de visualização do usuário",
              },
              description: {
                en: "The highlights tab displays the contracted highlight type, available quantity and quantity already used.",
                pt: "A aba de destaques exibe o tipo contratado, a quantidade disponível e a quantidade já utilizada.",
              },
            },
            {
              alt: {
                en: "Vehicles associated with a professional user",
                pt: "Veículos vinculados a um usuário profissional",
              },
              description: {
                en: "Vehicle table shows brand, model, version, status and links to view each listing on the website.",
                pt: "Tabela de veículos apresenta marca, modelo, versão, status e links para visualizar cada anúncio no site.",
              },
            },
            {
              alt: {
                en: "Account change history in the user details modal",
                pt: "Histórico de alterações da conta no modal de usuário",
              },
              description: {
                en: "History tab lists account changes with the responsible user, affected data, change type and timestamp.",
                pt: "A aba de histórico lista alterações da conta com responsável, dados afetados, tipo da alteração e data.",
              },
            },
            {
              alt: {
                en: "Before and after values for an account history entry",
                pt: "Valores anteriores e novos em um registro do histórico da conta",
              },
              description: {
                en: "A selected history entry compares previous and updated address fields and the one-year warranty setting.",
                pt: "Um registro selecionado do histórico compara os valores anteriores e novos do endereço e da opção de garantia de um ano.",
              },
            },
          ],
          name: { en: "Users", pt: "Usuários" },
          description: {
            en: "User listing interface with multiple search filters and actions for viewing and editing registration records, deactivating or blocking accounts, and requesting password changes. For professional users representing dealerships, it also supports creating and editing featured listing packages and websites for specific dealerships. Access to these features depends on the permissions assigned to the logged-in account.",
            pt: "Interface de listagem de usuários com diversos filtros de busca e ações para visualização e edição dos cadastros, inativação e bloqueio de contas e solicitação de alteração de senha. Para usuários profissionais, que representam revendas, também permite criar e editar pacotes de destaques e sites para revendas específicas. O acesso a essas funcionalidades depende das permissões atribuídas à conta logada.",
          },
          subprojects: [
            {
              id: "socarrao-internal-user-featured-packages",
              images: [
                {
                  alt: {
                    en: "Dealership featured package list with expanded details",
                    pt: "Lista de pacotes de destaques da revenda com detalhes expandidos",
                  },
                  description: {
                    en: "Packages show their status, highlight type, quantity, validity period, bonus allocation and recurrence.",
                    pt: "Os pacotes exibem status, tipo de destaque, quantidade, período de validade, bonificação e recorrência.",
                  },
                },
                {
                  alt: {
                    en: "New package form with Bronze, Silver, Gold and Super options",
                    pt: "Formulário de novo pacote com opções Bronze, Prata, Ouro e Super",
                  },
                  description: {
                    en: "Package creation allows choosing a highlight tier, quantity, validity dates and bonus or recurring allocation.",
                    pt: "O cadastro de pacotes permite escolher o nível de destaque, a quantidade, as datas de validade e as opções de bonificação ou recorrência.",
                  },
                },
                {
                  alt: {
                    en: "Editing an existing Super featured package",
                    pt: "Edição de um pacote de Super Destaque existente",
                  },
                  description: {
                    en: "The editing form displays a Super package with quantity, recurrence and start and end dates.",
                    pt: "O formulário de edição apresenta um pacote Super com quantidade, recorrência e datas de início e término.",
                  },
                },
              ],
              name: {
                en: "Featured Listing Package Management",
                pt: "Gerenciamento de Pacotes de Destaques",
              },
              description: {
                en: "Modal for creating and editing featured listing packages sold by SóCarrão to dealerships. The packages include Bronze, Silver, Gold and Super, which give vehicles higher placement in search results. Management is available through professional user accounts in the internal system, subject to the logged-in account's permissions.",
                pt: "Modal para criação e edição dos pacotes de destaques vendidos pela SóCarrão às revendas. Os pacotes incluem Bronze, Prata, Ouro e Super, que posicionam os veículos acima na listagem dos resultados de busca. O gerenciamento é realizado a partir dos cadastros de usuários profissionais no sistema interno, conforme as permissões da conta logada.",
              },
            },
            {
              id: "socarrao-internal-user-dealership-hotsites",
              images: [
                {
                  alt: {
                    en: "Hotsite builder with templates, colors and site preview",
                    pt: "Construtor de hotsites com modelos, cores e preview do site",
                  },
                  description: {
                    en: "The editor combines domain, social and analytics settings with predefined layouts, theme colors and a preview of the dealership website.",
                    pt: "O editor reúne domínio, redes sociais e configurações de análise com modelos de layout, cores do tema e preview do site da revenda.",
                  },
                },
                {
                  alt: {
                    en: "Hotsite text, services and image settings beside the preview",
                    pt: "Configurações de textos, serviços e imagens ao lado do preview do hotsite",
                  },
                  description: {
                    en: "Additional settings include About and manifesto text, service switches and image uploads while the site preview remains visible.",
                    pt: "Configurações adicionais incluem textos sobre a empresa e manifesto, opções de serviços e envio de imagens, mantendo o preview do site visível.",
                  },
                },
                {
                  alt: {
                    en: "Hotsite home preview with logo and vehicle banner",
                    pt: "Preview da página inicial do hotsite com logo e banner de veículo",
                  },
                  description: {
                    en: "Uploaded logo, favicon and banner images appear alongside the home preview, including vehicle search and stock cards.",
                    pt: "Logo, favicon e banners enviados aparecem ao lado do preview da página inicial, com busca de veículos e cards do estoque.",
                  },
                },
                {
                  alt: {
                    en: "Dealership stock page preview in the hotsite editor",
                    pt: "Preview da página de estoque no editor de hotsites",
                  },
                  description: {
                    en: "The stock preview shows the search field and vehicle grid using the configured dealership visual identity.",
                    pt: "O preview do estoque mostra o campo de busca e a grade de veículos com a identidade visual configurada para a revenda.",
                  },
                },
                {
                  alt: {
                    en: "Hotsite services preview with a consignment contact form",
                    pt: "Preview de serviços do hotsite com formulário de consignação",
                  },
                  description: {
                    en: "The services preview displays the consignment section, contact form and illustration within the selected layout.",
                    pt: "O preview de serviços exibe a seção de consignação, o formulário de contato e a ilustração no layout escolhido.",
                  },
                },
                {
                  alt: {
                    en: "Hotsite contact page preview with form and opening hours",
                    pt: "Preview da página de contato do hotsite com formulário e horários",
                  },
                  description: {
                    en: "The contact preview combines a message form with dealership contact channels and opening hours.",
                    pt: "O preview de contato reúne formulário de mensagem, canais de atendimento da revenda e horários de funcionamento.",
                  },
                },
                {
                  alt: {
                    en: "Hotsite About page preview with an uploaded illustration",
                    pt: "Preview da página Sobre do hotsite com ilustração enviada",
                  },
                  description: {
                    en: "The About preview displays the configured text and image, followed by the dealership footer and social links.",
                    pt: "O preview da página Sobre apresenta o texto e a imagem configurados, seguidos pelo rodapé da revenda e links sociais.",
                  },
                },
              ],
              name: {
                en: "Dealership Hotsite Builder",
                pt: "Construção de Hotsites para Revendas",
              },
              description: {
                en: "Interface for creating and editing hotsites for dealerships that purchase this feature. The layout is configured using predefined templates, and the site is built based on the selected options. A preview allows the dealership's hotsite to be viewed with the chosen configuration. Access is available through professional user accounts in the internal system, subject to the logged-in account's permissions.",
                pt: "Interface para criação e edição de hotsites para revendas que contratam a funcionalidade. O layout é configurado a partir de modelos padrão, e o site é construído com base nas opções escolhidas. A interface também oferece um preview do hotsite da revenda com a configuração selecionada. O acesso é realizado a partir dos cadastros de usuários profissionais no sistema interno, conforme as permissões da conta logada.",
              },
            },
          ],
        },
        {
          id: "socarrao-internal-groups",
          images: [
            {
              alt: {
                en: "Dealership groups table with an expanded subgroup list",
                pt: "Tabela de grupos de revendas com lista de subgrupos expandida",
              },
              description: {
                en: "Groups can be expanded to reveal their subgroups, with editing and removal actions for each entry.",
                pt: "Os grupos podem ser expandidos para exibir seus subgrupos, com ações de edição e remoção em cada registro.",
              },
            },
            {
              alt: {
                en: "Subgroup editor linking administrators and dealerships",
                pt: "Editor de subgrupo com vínculos de administradores e revendas",
              },
              description: {
                en: "The subgroup form links individual administrators to professional dealership accounts, defining which stores they can manage in the portal.",
                pt: "O formulário de subgrupo vincula administradores pessoas físicas às contas profissionais das revendas, definindo as lojas que podem administrar no portal.",
              },
            },
          ],
          name: { en: "Groups", pt: "Grupos" },
          description: {
            en: "Interface for organizing dealership groups and assigning their administrators. Dealerships are linked to the group as professional users representing businesses, while administrators are registered as common users representing individuals. This relationship gives administrators access to the group's dealerships in the Partner Dealership Portal, where they can select a specific dealership and perform all the actions available to that dealership's own account.",
            pt: "Interface para organização de grupos de revendas e definição de seus administradores. As revendas são vinculadas ao grupo como usuários do tipo profissional, que representam empresas, enquanto os administradores são cadastrados como usuários do tipo comum, que representam pessoas físicas. Esse vínculo permite que os administradores acessem as lojas do grupo na Área Logada SóCarrão, escolham uma revenda específica e realizem todas as ações disponíveis para a própria conta da revenda.",
          },
        },
        {
          id: "socarrao-internal-permissions",
          images: [
            {
              alt: {
                en: "Internal permission list with management actions",
                pt: "Lista de permissões internas com ações de gerenciamento",
              },
              description: {
                en: "The permissions table provides an entry point to manage the users associated with each permission.",
                pt: "A tabela de permissões permite acessar o gerenciamento dos usuários associados a cada permissão.",
              },
            },
            {
              alt: {
                en: "User assignment modal for a selected permission",
                pt: "Modal de vínculo de usuários a uma permissão selecionada",
              },
              description: {
                en: "The modal lists assigned users and supports searching, adding and removing accounts from the selected permission.",
                pt: "O modal lista os usuários vinculados e permite buscar, adicionar e remover contas da permissão selecionada.",
              },
            },
          ],
          name: { en: "Permissions", pt: "Permissões" },
          description: {
            en: "Interface for managing permissions that define access to internal system features.",
            pt: "Interface para gerenciamento das permissões que definem o acesso às funcionalidades do sistema interno.",
          },
        },
        {
          id: "socarrao-internal-integrator",
          images: [
            {
              alt: {
                en: "Integrator registration table with API key and creation columns",
                pt: "Tabela de integradores com colunas de chave de API e data de criação",
              },
              description: {
                en: "Integrator records are listed with their identifiers, API key column and creation dates, alongside the new integrator action.",
                pt: "Os integradores são listados com identificadores, coluna de chave de API e datas de criação, além da ação de cadastrar novo integrador.",
              },
            },
          ],
          name: { en: "Integrator", pt: "Integrador" },
          description: {
            en: "Administrative page dedicated to managing the platform's integrator-related records.",
            pt: "Página administrativa dedicada à gestão dos cadastros relacionados ao integrador da plataforma.",
          },
        },
        {
          id: "socarrao-internal-brands",
          images: [
            {
              alt: {
                en: "Vehicle brand list with search and add controls",
                pt: "Listagem de marcas de veículos com busca e cadastro",
              },
              description: {
                en: "The brand selection screen lists registered brands, supports searching and opens the model list when a brand is selected.",
                pt: "A tela de seleção lista as marcas cadastradas, oferece busca e abre a lista de modelos ao selecionar uma marca.",
              },
            },
            {
              alt: {
                en: "New brand modal with name and SEO content controls",
                pt: "Modal de nova marca com nome e opção de conteúdo SEO",
              },
              description: {
                en: "Brand creation starts with the name and provides an option to add SEO content for the website.",
                pt: "O cadastro da marca começa pelo nome e oferece a opção de adicionar conteúdo SEO para o site.",
              },
            },
            {
              alt: {
                en: "Honda selected with its model list",
                pt: "Marca Honda selecionada com sua lista de modelos",
              },
              description: {
                en: "Selecting Honda reveals its models, search filters and actions to add a model or edit the brand.",
                pt: "A seleção da Honda exibe seus modelos, filtros de busca e ações para adicionar modelo ou editar a marca.",
              },
            },
            {
              alt: {
                en: "Brand editor with SEO description and FAQ fields",
                pt: "Editor de marca com descrição SEO e campos de FAQ",
              },
              description: {
                en: "The brand editor combines its name with rich text SEO content and frequently asked questions.",
                pt: "O editor da marca reúne o nome, conteúdo SEO em texto rico e perguntas frequentes.",
              },
            },
            {
              alt: {
                en: "Brand FAQ editor with question and rich text answer",
                pt: "Editor de FAQ da marca com pergunta e resposta em texto rico",
              },
              description: {
                en: "The FAQ section allows editing questions and formatted answers, adding entries and changing their order.",
                pt: "A seção de FAQ permite editar perguntas e respostas formatadas, adicionar registros e alterar sua ordem.",
              },
            },
            {
              alt: {
                en: "New model form with years, category and SEO content",
                pt: "Formulário de novo modelo com anos, categoria e conteúdo SEO",
              },
              description: {
                en: "Model creation includes name, production years, category, SEO description and optional FAQ entries.",
                pt: "O cadastro de modelo inclui nome, anos de produção, categoria, descrição SEO e perguntas frequentes opcionais.",
              },
            },
            {
              alt: {
                en: "Honda Civic selected with its version list",
                pt: "Modelo Honda Civic selecionado com sua lista de versões",
              },
              description: {
                en: "The model screen displays production years, version search and actions to add a version or edit the model.",
                pt: "A tela do modelo apresenta anos de produção, busca de versões e ações para adicionar versão ou editar o modelo.",
              },
            },
            {
              alt: {
                en: "Honda Civic model editor with SEO and FAQ content",
                pt: "Editor do modelo Honda Civic com conteúdo SEO e FAQ",
              },
              description: {
                en: "Editing the model covers its name, production years and the SEO text and FAQ shown for model-specific searches.",
                pt: "A edição do modelo reúne nome, anos de produção e os textos SEO e FAQ exibidos nas buscas específicas pelo modelo.",
              },
            },
            {
              alt: {
                en: "New version modal with technical vehicle fields",
                pt: "Modal de nova versão com campos técnicos do veículo",
              },
              description: {
                en: "Version creation includes name, doors, production years, transmission and body type, without SEO content fields.",
                pt: "O cadastro da versão inclui nome, portas, anos de produção, câmbio e carroceria, sem campos de conteúdo SEO.",
              },
            },
            {
              alt: {
                en: "Selected Civic version showing technical specifications",
                pt: "Versão do Civic selecionada com suas especificações técnicas",
              },
              description: {
                en: "The version details show its identifier, FIPE code, doors, transmission, body type and production years.",
                pt: "Os detalhes da versão exibem identificador, código FIPE, portas, câmbio, carroceria e anos de produção.",
              },
            },
            {
              alt: {
                en: "Version editing modal with linked model selector",
                pt: "Modal de edição da versão com seletor do modelo vinculado",
              },
              description: {
                en: "The version editor allows updating its name, doors, transmission, body type and linked model.",
                pt: "O editor da versão permite atualizar nome, portas, câmbio, carroceria e modelo vinculado.",
              },
            },
          ],
          name: { en: "Vehicle Brands", pt: "Marcas" },
          description: {
            en: "Interface for managing the vehicle brands, models and versions registered on the website. It lists existing brands and allows new brands to be added. Selecting a brand opens its content for editing. The brand creation and editing modal also supports SEO content for display on the website. With a brand selected, users can add models or select an existing model from that brand's list. The model creation and editing modal likewise supports SEO content, displayed on the website when searching for that specific model. Selecting a model provides access to its versions and the option to add a new one. Selecting a version displays its data and allows its content to be edited, without SEO content fields.",
            pt: "Interface para gerenciamento das marcas, modelos e versões de veículos cadastrados no site. A tela lista as marcas existentes e permite cadastrar novas marcas. Ao selecionar uma marca, é possível editar seu conteúdo. O modal de cadastro e edição da marca também permite incluir conteúdo de SEO para exibição no site. Com uma marca selecionada, é possível cadastrar novos modelos ou selecionar um modelo da lista daquela marca. O modal de cadastro e edição de modelos também permite incluir conteúdo de SEO, exibido no site quando há uma pesquisa pelo modelo específico. Ao selecionar um modelo, ficam disponíveis a lista de versões e a opção de adicionar uma nova versão. A seleção de uma versão exibe seus dados e permite editar seu conteúdo, sem campos de conteúdo de SEO.",
          },
        },
        {
          id: "socarrao-internal-inspected-vehicles",
          images: [
            {
              alt: {
                en: "Dealerships enrolled in the Vistoriados warranty program",
                pt: "Revendas participantes do programa de garantia Vistoriados",
              },
              description: {
                en: "The list identifies participating dealerships and provides search, registration, plate editing and removal actions.",
                pt: "A lista reúne as revendas participantes e oferece busca, cadastro, edição de placas e remoção.",
              },
            },
            {
              alt: {
                en: "Vistoriados enrollment form with dealership and license plates",
                pt: "Formulário de adesão ao Vistoriados com revenda e placas",
              },
              description: {
                en: "Enrollment links a dealership to vehicle license plates covered by the one-year warranty program.",
                pt: "O cadastro vincula uma revenda às placas dos veículos contemplados pelo programa de garantia de um ano.",
              },
            },
            {
              alt: {
                en: "Plate editor showing additions and removals for a dealership",
                pt: "Editor de placas com inclusões e remoções de uma revenda",
              },
              description: {
                en: "The editor separates existing plates from pending additions and removals before saving the warranty vehicle list.",
                pt: "O editor separa placas existentes das inclusões e remoções pendentes antes de salvar a lista de veículos com garantia.",
              },
            },
            {
              alt: {
                en: "Confirmation to remove a dealership from Vistoriados",
                pt: "Confirmação de remoção de uma revenda do Vistoriados",
              },
              description: {
                en: "The confirmation explains that removing the dealership also removes its registered plates from the program.",
                pt: "A confirmação informa que a remoção da revenda também exclui suas placas cadastradas no programa.",
              },
            },
          ],
          name: { en: "Inspected Vehicles", pt: "Vistoriados" },
          description: {
            en: "Feature for adding dealerships participating in the Vistoriados program and identifying their vehicles with a one-year warranty. Vehicles are linked to each participating dealership by registering their license plates, allowing the vehicles covered by the warranty to be marked on the platform.",
            pt: "Funcionalidade para adicionar as revendas participantes do programa Vistoriados e identificar seus veículos com um ano de garantia. Os veículos são vinculados a cada revenda participante por meio do cadastro de suas placas, permitindo marcar na plataforma aqueles que possuem essa garantia.",
          },
        },
        {
          id: "socarrao-internal-equalizer",
          images: [
            {
              alt: {
                en: "Dealership search ranking adjustments with positive and negative actions",
                pt: "Ajustes de posicionamento das revendas com ações positivas e negativas",
              },
              description: {
                en: "The equalizer lists dealerships and their current ranking status, with controls to favor or penalize their vehicles in searches.",
                pt: "O equalizador lista as revendas e seu status de posicionamento, com controles para favorecer ou penalizar seus veículos nas buscas.",
              },
            },
            {
              alt: {
                en: "CSV upload modal in the equalizer",
                pt: "Modal de envio de CSV no equalizador",
              },
              description: {
                en: "A drag-and-drop upload area accepts a CSV file for equalizer adjustments.",
                pt: "Uma área de envio por clique ou arraste permite selecionar um arquivo CSV para ajustes do equalizador.",
              },
            },
            {
              alt: {
                en: "Confirmation to reset all dealership ranking adjustments",
                pt: "Confirmação para neutralizar os ajustes de todas as revendas",
              },
              description: {
                en: "The confirmation asks whether all dealerships should return to a neutral ranking status.",
                pt: "A confirmação pergunta se todas as revendas devem voltar ao status neutro de posicionamento.",
              },
            },
          ],
          name: { en: "Equalizer", pt: "Equalizador" },
          description: {
            en: "Feature for adjusting the search ranking of vehicles from specific dealerships. It allows these vehicles to be given an advantage or penalized, increasing or reducing their priority in search results.",
            pt: "Funcionalidade para ajustar o posicionamento dos veículos de determinadas revendas nas buscas. Permite dar vantagens ou aplicar penalizações a esses veículos, aumentando ou reduzindo sua prioridade nos resultados de busca.",
          },
        },
        {
          id: "socarrao-internal-vehicle-fair",
          images: [
            {
              alt: {
                en: "Vehicle fair list with scheduled start and end dates",
                pt: "Lista de feirões com datas de início e término",
              },
              description: {
                en: "The fair list shows each event and its scheduled period, with actions to manage entries or create a new fair.",
                pt: "A lista apresenta cada feirão e seu período programado, com ações para gerenciar registros ou criar um novo evento.",
              },
            },
            {
              alt: {
                en: "New vehicle fair form with dates, rules and badge settings",
                pt: "Formulário de novo feirão com datas, regulamento e configuração de selos",
              },
              description: {
                en: "Fair setup includes name, start and end times, rules, description, badge uploads and a background color.",
                pt: "A configuração do feirão inclui nome, datas e horários de início e término, regulamento, descrição, envio de selos e cor de fundo.",
              },
            },
            {
              alt: {
                en: "Vehicle fair user assignment and highlight allocation",
                pt: "Vínculo de usuários ao feirão e distribuição de destaques",
              },
              description: {
                en: "The users tab adds participating accounts and configures highlight quantities and whether their listings receive a highlight.",
                pt: "A aba de usuários adiciona contas participantes e configura a quantidade de destaques e a marcação de destaque dos anúncios.",
              },
            },
          ],
          name: { en: "Vehicle Fair", pt: "Feirão" },
          description: {
            en: "Feature for registering vehicle sales fairs and defining the period during which each fair takes place.",
            pt: "Funcionalidade para cadastrar feirões de veículos e definir o período de realização de cada feirão.",
          },
        },
        {
          id: "socarrao-internal-moderation",
          images: [
            {
              alt: {
                en: "Pending private seller vehicles in the moderation queue",
                pt: "Veículos de particulares pendentes na fila de moderação",
              },
              description: {
                en: "The queue lists flagged listings with date, vehicle, price, mileage and review status.",
                pt: "A fila lista anúncios sinalizados com data, veículo, preço, quilometragem e status da análise.",
              },
            },
            {
              alt: {
                en: "Vehicle moderation modal with review reason and approval controls",
                pt: "Modal de moderação com motivo da análise e controles de aprovação",
              },
              description: {
                en: "Review combines seller and plan information, vehicle specifications and the moderation reason, with approval or rejection and a justification field.",
                pt: "A análise reúne dados do vendedor e do plano, especificações do veículo e motivo da moderação, com aprovação ou reprovação e campo de justificativa.",
              },
            },
          ],
          name: { en: "Moderation", pt: "Moderação" },
          description: {
            en: "Feature for reviewing and moderating vehicle listings from private sellers that are flagged by one or more moderation rules.",
            pt: "Funcionalidade para análise e moderação de anúncios de veículos de anunciantes particulares que se enquadram em uma ou mais regras de moderação.",
          },
        },
        {
          id: "socarrao-internal-coupons",
          images: [
            {
              alt: {
                en: "Coupon management table with discounts, validity and usage",
                pt: "Tabela de cupons com descontos, validade e utilização",
              },
              description: {
                en: "The coupon list shows discount type and value, status, validity period, available quantity and usage count.",
                pt: "A lista de cupons apresenta tipo e valor do desconto, status, período de validade, quantidade disponível e número de utilizações.",
              },
            },
            {
              alt: {
                en: "New coupon form with quantity, discount and validity dates",
                pt: "Formulário de novo cupom com quantidade, desconto e validade",
              },
              description: {
                en: "Coupon creation defines a name, quantity, discount type and amount, plus start and end dates and times.",
                pt: "O cadastro do cupom define nome, quantidade, tipo e valor do desconto, além de datas e horários de início e término.",
              },
            },
          ],
          name: { en: "Coupons", pt: "Cupom" },
          description: {
            en: "Administrative page for managing coupons associated with the private seller area.",
            pt: "Página administrativa para gerenciamento de cupons vinculados à área de anunciantes particulares.",
          },
        },
      ],
    },
    {
      id: "socarrao-website",
      images: [
        {
          alt: {
            en: "SóCarrão home with vehicle search, services and recommended stores",
            pt: "Página inicial do SóCarrão com busca, serviços e lojas recomendadas",
          },
          description: {
            en: "The home page brings together vehicle search, quick search categories, a vehicle debt banner, recommended dealerships and platform services.",
            pt: "A página inicial reúne busca de veículos, categorias de busca rápida, banner de débitos veiculares, revendas recomendadas e serviços da plataforma.",
          },
        },
      ],
      name: {
        en: "SóCarrão Website",
        pt: "Site SóCarrão",
      },
      description: {
        en: "Front-end development and maintenance of the SóCarrão vehicle listing website, connecting buyers, private sellers and dealerships. The project brings together the platform's vehicle listing experience, private seller flows and authenticated tools for partner dealerships.",
        pt: "Desenvolvimento e manutenção do front-end do site de anúncios de veículos da SóCarrão, conectando compradores, anunciantes particulares e revendas. O projeto reúne a experiência de anúncios de veículos da plataforma, os fluxos para anunciantes particulares e as ferramentas da área logada para revendas parceiras.",
      },
      subprojects: [
        {
          id: "socarrao-private-seller-listings",
          images: [
            {
              alt: {
                en: "Private seller landing page with benefits and listing call to action",
                pt: "Página de anunciante particular com benefícios e chamada para anunciar",
              },
              description: {
                en: "The landing page introduces private vehicle sales, highlights platform benefits and directs visitors to start a listing or sign in.",
                pt: "A página apresenta a venda de veículos por particulares, destaca benefícios da plataforma e direciona para iniciar um anúncio ou fazer login.",
              },
            },
            {
              alt: {
                en: "Listing entry screen with license plate input and unfinished vehicles",
                pt: "Início do anúncio com campo de placa e veículos não concluídos",
              },
              description: {
                en: "The seller can begin with a license plate and verification or resume a previously started vehicle listing.",
                pt: "O anunciante pode começar pela placa e pela verificação ou continuar um anúncio de veículo iniciado anteriormente.",
              },
            },
            {
              alt: {
                en: "Vehicle details and choice of listing duration",
                pt: "Dados do veículo e escolha da duração do anúncio",
              },
              description: {
                en: "The listing setup combines price benchmarks, required vehicle information and a choice between a 30-day plan and advertising until sold.",
                pt: "A configuração reúne referências de preço, informações obrigatórias do veículo e a escolha entre anúncio de 30 dias ou até vender.",
              },
            },
            {
              alt: {
                en: "Payment drawer with selected plan and coupon field",
                pt: "Painel de pagamento com plano selecionado e campo de cupom",
              },
              description: {
                en: "The payment summary shows the selected listing plan, a coupon field and the total before continuing to payment methods.",
                pt: "O resumo do pagamento apresenta o plano escolhido, campo de cupom e valor total antes de continuar para as formas de pagamento.",
              },
            },
            {
              alt: {
                en: "Listing payment options for card, Pix and boleto",
                pt: "Opções de pagamento do anúncio por cartão, Pix e boleto",
              },
              description: {
                en: "The payment step offers card, Pix and boleto options, a price summary and an explanation of the listing review after payment.",
                pt: "A etapa de pagamento oferece cartão, Pix e boleto, resumo de valores e explicação sobre a análise do anúncio após o pagamento.",
              },
            },
            {
              alt: {
                en: "Pix payment code and copy action in the payment drawer",
                pt: "Código Pix e ação de copiar no painel de pagamento",
              },
              description: {
                en: "The selected Pix option displays the generated payment code, a copy action and the final payment summary.",
                pt: "A opção Pix selecionada exibe o código de pagamento gerado, a ação de copiar e o resumo final dos valores.",
              },
            },
            {
              alt: {
                en: "Seller garage with an unpublished vehicle awaiting payment",
                pt: "Garagem do anunciante com veículo não publicado aguardando pagamento",
              },
              description: {
                en: "The garage shows listing completeness, pending payment for the 30-day plan and shortcuts to vehicle details, price, photos and description.",
                pt: "A garagem apresenta completude do anúncio, pagamento pendente do plano de 30 dias e atalhos para dados do veículo, preço, fotos e descrição.",
              },
            },
            {
              alt: {
                en: "Seller garage with a motorcycle listing under review",
                pt: "Garagem do anunciante com anúncio de moto em análise",
              },
              description: {
                en: "A contracted plan is shown alongside the vehicle review status, completeness indicator and listing editing shortcuts.",
                pt: "O plano contratado aparece ao lado do status de análise do veículo, indicador de completude e atalhos de edição do anúncio.",
              },
            },
            {
              alt: {
                en: "Seller garage with an active until-sold motorcycle listing",
                pt: "Garagem com anúncio de moto ativo até vender",
              },
              description: {
                en: "The active until-sold listing provides a public listing link, sharing control, contracted plan and vehicle content shortcuts.",
                pt: "O anúncio ativo até vender oferece link para visualização pública, compartilhamento, plano contratado e atalhos do conteúdo do veículo.",
              },
            },
            {
              alt: {
                en: "Seller garage with a complete listing and pending plan upgrade",
                pt: "Garagem com anúncio completo e upgrade de plano pendente",
              },
              description: {
                en: "An active 30-day listing shows its expiry date, completion badge and a pending payment to upgrade to the until-sold plan.",
                pt: "Um anúncio ativo por 30 dias exibe vencimento, selo de completude e pagamento pendente para mudar ao plano até vender.",
              },
            },
            {
              alt: {
                en: "Listing issues drawer showing missing documents and content",
                pt: "Painel de pendências do anúncio com documentos e conteúdo faltante",
              },
              description: {
                en: "The issues panel highlights missing registration documents, too few photos, a price outside the ideal range and missing accessories.",
                pt: "O painel destaca ausência de documento do veículo, poucas fotos, preço fora do ideal e acessórios não informados.",
              },
            },
            {
              alt: {
                en: "Vehicle information drawer with editable specifications and accessories",
                pt: "Painel de informações do veículo com especificações editáveis e acessórios",
              },
              description: {
                en: "The vehicle panel groups mileage, year, fuel, transmission, body type, color, city and optional accessories for editing.",
                pt: "O painel reúne quilometragem, ano, combustível, câmbio, carroceria, cor, cidade e acessórios opcionais para edição.",
              },
            },
            {
              alt: {
                en: "Price editing drawer with FIPE and SóCarrão benchmarks",
                pt: "Painel de edição do preço com referências FIPE e SóCarrão",
              },
              description: {
                en: "The seller can edit the asking price while comparing it with FIPE and SóCarrão market reference values.",
                pt: "O anunciante pode editar o preço de venda e compará-lo com os valores de referência da FIPE e da SóCarrão.",
              },
            },
            {
              alt: {
                en: "Listing photo management drawer with cover and ordering controls",
                pt: "Painel de fotos do anúncio com capa e controles de ordenação",
              },
              description: {
                en: "Photo management supports uploading images, selecting the cover, removing photos and reordering them by dragging.",
                pt: "A gestão de fotos permite enviar imagens, definir a capa, remover fotos e alterar a ordem por arraste.",
              },
            },
            {
              alt: {
                en: "Listing description editor with AI text generation",
                pt: "Editor da descrição do anúncio com geração de texto por IA",
              },
              description: {
                en: "The description panel lets the seller write or edit the text and request an AI-generated description before confirming.",
                pt: "O painel permite escrever ou editar o texto e solicitar uma descrição gerada por IA antes de confirmar.",
              },
            },
            {
              alt: {
                en: "Confirmation drawer for deleting a vehicle from the garage",
                pt: "Painel de confirmação para excluir um veículo da garagem",
              },
              description: {
                en: "The deletion step asks the seller to confirm removal or keep the vehicle in the garage.",
                pt: "A etapa de exclusão solicita a confirmação da remoção ou permite manter o veículo na garagem.",
              },
            },
          ],
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
          id: "socarrao-dealership-portal",
          images: [
            {
              alt: {
                en: "Dealership statistics dashboard with date filters and charts",
                pt: "Dashboard de estatísticas da revenda com filtros de data e gráficos",
              },
              description: {
                en: "The dashboard summarizes published listings, search visibility, vehicle clicks and leads for the selected period and dealership.",
                pt: "O dashboard resume anúncios publicados, exibições nas buscas, cliques em veículos e leads no período e na revenda selecionados.",
              },
            },
            {
              alt: {
                en: "Dealership stock list and featured listing usage",
                pt: "Lista de estoque da revenda e utilização dos destaques",
              },
              description: {
                en: "Stock management includes vehicle search, highlight filters, creation and update dates, and per-vehicle management actions.",
                pt: "A gestão do estoque inclui busca de veículos, filtros de destaques, datas de criação e atualização e ações de gerenciamento por veículo.",
              },
            },
            {
              alt: {
                en: "Private seller purchase opportunities in the dealership portal",
                pt: "Oportunidades de compra de particulares no portal da revenda",
              },
              description: {
                en: "The purchases screen lists vehicle opportunities with seller details, date filters and a WhatsApp contact action.",
                pt: "A tela de compras lista oportunidades de veículos com dados do vendedor, filtros de data e ação de contato por WhatsApp.",
              },
            },
            {
              alt: {
                en: "Dealership lead list with contact and financing messages",
                pt: "Lista de leads da revenda com contatos e mensagens de financiamento",
              },
              description: {
                en: "Lead management associates each inquiry with a vehicle, contact, date, channel and message, including financing requests.",
                pt: "A gestão de leads associa cada contato a um veículo, interessado, data, canal e mensagem, incluindo solicitações de financiamento.",
              },
            },
          ],
          name: {
            en: "Partner Dealership Portal",
            pt: "Área Logada SóCarrão",
          },
          description: {
            en: "Development of the authenticated area for SóCarrão's partner dealerships. Features include a dashboard with performance charts and statistics, vehicle creation and management, featured listing management, financial information and boleto payments. The portal also provides access to vehicles advertised by private users and tools for managing leads.",
            pt: "Desenvolvimento da área logada destinada às revendas parceiras da SóCarrão. As funcionalidades incluem dashboard com gráficos e estatísticas de desempenho, cadastro e gestão de veículos e seus respectivos destaques, consulta de informações financeiras e pagamento de boletos. O portal também permite visualizar veículos anunciados por usuários e gerenciar leads.",
          },
        },
        {
          id: "socarrao-website-search",
          images: [
            {
              alt: {
                en: "Vehicle search results in a card grid with a filter sidebar",
                pt: "Resultados da busca de veículos em cards com filtros laterais",
              },
              description: {
                en: "The redesigned search shows vehicle cards, prices, highlight badges and sorting beside location, brand and price filters.",
                pt: "A busca reformulada exibe cards de veículos, preços, selos de destaque e ordenação ao lado dos filtros de localização, marca e preço.",
              },
            },
            {
              alt: {
                en: "Honda Civic search results with contextual SEO content",
                pt: "Resultados da busca por Honda Civic com conteúdo SEO contextual",
              },
              description: {
                en: "Selecting city, brand and model updates the search context, active filters, result count and model-specific SEO text.",
                pt: "A seleção de cidade, marca e modelo atualiza o contexto da busca, os filtros ativos, a contagem de resultados e o texto SEO específico do modelo.",
              },
            },
            {
              alt: {
                en: "Vehicle search in list view with active Honda Civic filters",
                pt: "Busca de veículos em lista com filtros ativos de Honda Civic",
              },
              description: {
                en: "The alternate list layout presents larger vehicle rows while preserving filters, SEO content, prices and contact actions.",
                pt: "O layout alternativo em lista apresenta veículos em linhas maiores, preservando filtros, conteúdo SEO, preços e ações de contato.",
              },
            },
            {
              alt: {
                en: "Search filter panel with active criteria and result preview count",
                pt: "Painel de filtros com critérios ativos e prévia da quantidade de resultados",
              },
              description: {
                en: "Location, distance, brand, model and price controls are grouped with active filter chips and a button showing the result count before applying.",
                pt: "Os controles de localização, distância, marca, modelo e preço aparecem com os filtros ativos e um botão que informa a quantidade de resultados antes de aplicar.",
              },
            },
          ],
          name: {
            en: "Vehicle Search",
            pt: "Busca de Veículos",
          },
          description: {
            en: "Complete rebuild of the vehicle search experience, with an entirely redesigned layout developed using AI assistance. The new search introduced exclusionary filters that show how many vehicles match the selected criteria before the filters are applied. Search URLs also became dynamic, changing according to the selected state, city, brand and model.",
            pt: "Reformulação completa da busca de veículos, com o layout inteiramente refeito com auxílio de IA. A nova busca passou a contar com filtros excludentes que mostram quantos veículos correspondem aos critérios selecionados antes de aplicar os filtros. As URLs de busca também se tornaram dinâmicas, mudando conforme o estado, a cidade, a marca e o modelo selecionados.",
          },
        },
        {
          id: "socarrao-growthbook-ab-testing",
          images: [
            {
              alt: {
                en: "A/B test variant A promoting free vehicle debt checks",
                pt: "Variante A do teste A/B destacando a consulta gratuita de débitos",
              },
              description: {
                en: "Variant A asks whether the vehicle is up to date, highlights free IPVA, fine and licensing checks, and offers a consultation button.",
                pt: "A variante A pergunta se o veículo está em dia, destaca a consulta gratuita de IPVA, multas e licenciamento e oferece um botão de consulta.",
              },
            },
            {
              alt: {
                en: "A/B test variant B promoting debt installments through WhatsApp",
                pt: "Variante B do teste A/B destacando parcelamento de débitos pelo WhatsApp",
              },
              description: {
                en: "Variant B emphasizes paying vehicle debts in up to 12 installments, with WhatsApp messaging and a revised consultation call to action.",
                pt: "A variante B enfatiza o parcelamento de débitos veiculares em até 12 vezes, com atendimento pelo WhatsApp e uma nova chamada para consulta.",
              },
            },
          ],
          name: {
            en: "A/B Testing with GrowthBook",
            pt: "Teste A/B com GrowthBook",
          },
          description: {
            en: "Implementation of an A/B test on the SóCarrão platform using GrowthBook to compare different variants of an experience. A cookie stored the identifier used by GrowthBook, and the selected variant was rendered on the server side. Delivering the variant in the initial HTML avoided layout shifts caused by switching variants after the page loaded, preventing related CLS issues.",
            pt: "Implementação de um teste A/B na plataforma SóCarrão utilizando o GrowthBook para comparar diferentes variantes de uma experiência. Um cookie armazenava o identificador utilizado pelo GrowthBook, e a variante selecionada era renderizada no lado do servidor. A entrega da variante no HTML inicial evitava deslocamentos de layout causados pela troca de variantes após o carregamento da página, prevenindo problemas de CLS relacionados a essa troca.",
          },
        },
      ],
    },
  ],
};

export default company;
