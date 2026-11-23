import type { ProjectData } from "../models/Project";

const projects: ProjectData[] = [
  {
    name: { en: "Lunera", pt: "Lunera" },
    description: {
      en: "Desktop app built with Vue 3, TypeScript and Electron, with AI-assisted development. Finds duplicate or visually similar photos and videos, organizes files into year and month folders, and edits media metadata in batches. All processing runs locally, without uploading files to external services.",
      pt: "Aplicativo desktop desenvolvido com Vue 3, TypeScript e Electron, com auxílio de IA. Encontra fotos e vídeos duplicados ou visualmente semelhantes, organiza arquivos em pastas por ano e mês e edita metadados de mídia em lote. Todo o processamento é local, sem enviar arquivos a serviços externos.",
    },

    link: "https://lunera-app.netlify.app",
    github: "https://github.com/eroschagas/file-manager",
    images: [
      {
        src: "/ai-assisted/Lunera/home.webp",
        alt: {
          en: "Lunera home screen with tools to find duplicates, organize files and edit metadata",
          pt: "Tela inicial do Lunera com ferramentas para encontrar duplicados, organizar arquivos e editar metadados",
        },
        description: {
          en: "The home screen introduces Lunera and provides access to duplicate photo and video detection, file organization by year and month, and batch metadata editing. It highlights local processing, with files staying on the user's computer.",
          pt: "A tela inicial apresenta o Lunera e oferece acesso à detecção de fotos e vídeos duplicados, à organização de arquivos por ano e mês e à edição de metadados em lote. Destaca o processamento local, com os arquivos permanecendo no computador do usuário.",
        },
      },
      {
        src: "/ai-assisted/Lunera/duplicates.webp",
        alt: {
          en: "Lunera duplicate detection screen with folder selection and similarity settings",
          pt: "Tela de detecção de duplicados do Lunera com seleção de pastas e ajuste de similaridade",
        },
        description: {
          en: "The duplicate detection screen lets users select one or more folders and set the similarity level for comparing photos and videos. Subfolders are included automatically, and files are reviewed before moving selected copies to the Recycle Bin.",
          pt: "A tela de detecção de duplicados permite selecionar uma ou mais pastas e definir o nível de similaridade para comparar fotos e vídeos. As subpastas são incluídas automaticamente, e os arquivos são revisados antes de mover as cópias selecionadas para a Lixeira.",
        },
      },
      {
        src: "/ai-assisted/Lunera/organizer.webp",
        alt: {
          en: "Lunera file organizer with folder selection, a year and month path example, and an organization preview button",
          pt: "Organizador de arquivos do Lunera com seleção de pasta, exemplo de caminho por ano e mês e botão de prévia da organização",
        },
        description: {
          en: "The file organizer groups photos and videos into year and month folders using capture dates from metadata, falling back to file modification dates. Users can preview the organization and optionally delete empty folders afterward.",
          pt: "O organizador agrupa fotos e vídeos em pastas por ano e mês usando a data de captura dos metadados ou, na ausência dela, a data de modificação do arquivo. Permite visualizar a organização antes de aplicá-la e excluir pastas vazias ao final, se desejado.",
        },
      },
      {
        src: "/ai-assisted/Lunera/metadata.webp",
        alt: {
          en: "Lunera batch metadata editor with a media folder field and buttons to choose a folder and read metadata",
          pt: "Editor de metadados em lote do Lunera com campo de pasta de mídia e botões para escolher a pasta e ler metadados",
        },
        description: {
          en: "The batch metadata editor starts with selecting a folder containing photos and videos, including subfolders. The Read metadata button loads the files' existing metadata for editing.",
          pt: "O editor de metadados em lote começa pela seleção de uma pasta com fotos e vídeos, incluindo subpastas. O botão de leitura carrega os metadados existentes dos arquivos para edição.",
        },
      },
    ],
  },
  {
    name: { en: "Price Check", pt: "Consulta de Preços" },
    description: {
      en: "Desktop app built with Vue 3, TypeScript and Electron, with AI-assisted development. Imports spreadsheets and looks up minimum and maximum prices by barcode, search term, category or fuel type, within a selected region and radius. Writes results to chosen columns and exports a copy in XLSX, XLSM or CSV, with cancellation, partial results and retries for failed queries.",
      pt: "Aplicativo desktop desenvolvido com Vue 3, TypeScript e Electron, com auxílio de IA. Importa planilhas e consulta preços mínimos e máximos por código de barras, termo, categoria ou tipo de combustível, na região e no raio selecionados. Grava os resultados nas colunas escolhidas e exporta uma cópia em XLSX, XLSM ou CSV, com cancelamento, resultados parciais e novas tentativas para consultas com falha.",
    },
    link: "https://drive.google.com/file/d/1zeeUIPLaBb8qCiH5OeZKHonmuhGMMRjo/view?usp=drive_link",
  },
];

export default projects;
