const translations = {
  pt: {
    header: {
      home: "Início",
      aiAssisted: "Com IA",
      work: "Experiência",
      legacy: "Legado",
      role: "Engenheiro Frontend",
    },
    navigation: "Navegação principal",
    language: "Selecionar idioma",
    soon: "em breve",
    footer: "Ideias bem pensadas. Interfaces bem construídas.",
    built: "Feito com Vue, Nuxt e atenção aos detalhes.",
    eyebrow: "DESENVOLVIMENTO WEB & EXPERIMENTAÇÃO",
    hello: "Olá, eu sou o",
    headline: "Código que transforma",
    accent: "ideias em experiências.",
    intro:
      "Este é meu espaço para compartilhar projetos, explorar novas tecnologias e contar a história por trás de cada construção.",
    explore: "Explore meu trabalho",
    aboutLink: "Um pouco sobre mim",
    scroll: "CONTINUE EXPLORANDO",
    aboutLabel: "01 / SOBRE MIM",
    aboutTitle: "Curiosidade como ponto de partida.",
    about:
      "Gosto de entender como as coisas funcionam e dar forma a ideias na web. Aqui, reúno minha evolução no desenvolvimento: das primeiras linhas de código aos experimentos com inteligência artificial.",
    note: "Um portfólio em construção, assim como a minha próxima ideia.",
    stackLabel: "02 / MINHA STACK",
    stackTitle: "As ferramentas por trás das ideias.",
    stackDescription:
      "Um ponto de partida para construir interfaces e explorar possibilidades.",
    projectsLabel: "03 / EXPLORE",
    projectsTitle: "Três caminhos. A mesma curiosidade.",
    view: "Explorar",
    ai: "Experimentos e projetos construídos em parceria com inteligência artificial.",
    work: "Experiências profissionais, desafios reais e o que aprendi pelo caminho.",
    legacy:
      "Onde tudo começou. Os primeiros projetos e a evolução de cada ideia.",
    back: "Voltar para home",
    collection: "COLEÇÃO",
    status: "EM CONSTRUÇÃO",
    emptyTitle: "O próximo capítulo está chegando.",
    empty:
      "Este espaço está reservado para meus projetos. Em breve, você vai encontrar detalhes, processos e aprendizados por aqui.",
    emptyWork:
      "Este espaço está reservado para minha trajetória profissional, empresas e desafios. Os conteúdos serão adicionados em breve.",
    emptyLegacy:
      "Este espaço está reservado para projetos do início da minha carreira, com contexto e aprendizados. Os conteúdos serão adicionados em breve.",
    codeComment: "// da curiosidade à criação",
    codeRole: "Desenvolvedor",
    codeLearning: "Sempre",
  },
  en: {
    header: {
      home: "Home",
      aiAssisted: "AI Assisted",
      work: "Work",
      legacy: "Legacy",
      role: "Frontend Engineer",
    },
    navigation: "Main navigation",
    language: "Select language",
    soon: "coming soon",
    footer: "Thoughtful ideas. Carefully built interfaces.",
    built: "Built with Vue, Nuxt and attention to detail.",
    eyebrow: "WEB DEVELOPMENT & EXPERIMENTATION",
    hello: "Hi, I'm",
    headline: "Code that turns",
    accent: "ideas into experiences.",
    intro:
      "My space to share projects, explore new technologies and tell the story behind everything I build.",
    explore: "Explore my work",
    aboutLink: "A little about me",
    scroll: "KEEP EXPLORING",
    aboutLabel: "01 / ABOUT ME",
    aboutTitle: "Curiosity is the starting point.",
    about:
      "I enjoy understanding how things work and bringing ideas to life on the web. This is where I share my development journey: from my first lines of code to experiments with artificial intelligence.",
    note: "A portfolio in progress, just like my next idea.",
    stackLabel: "02 / MY STACK",
    stackTitle: "The tools behind the ideas.",
    stackDescription:
      "A starting point for building interfaces and exploring possibilities.",
    projectsLabel: "03 / EXPLORE",
    projectsTitle: "Three paths. The same curiosity.",
    view: "Explore",
    ai: "Experiments and projects built in collaboration with artificial intelligence.",
    work: "Professional experiences, real challenges and what I learned along the way.",
    legacy:
      "Where it all began. Early projects and the evolution of each idea.",
    back: "Back to home",
    collection: "COLLECTION",
    status: "IN PROGRESS",
    emptyTitle: "The next chapter is on its way.",
    empty:
      "This space is reserved for my projects. Details, processes and lessons learned will be shared here soon.",
    emptyWork:
      "This space is reserved for my professional journey, companies and challenges. Content will be added soon.",
    emptyLegacy:
      "This space is reserved for projects from the beginning of my career, with context and lessons learned. Content will be added soon.",
    codeComment: "// from curiosity to creation",
    codeRole: "Developer",
    codeLearning: "Always",
  },
};
export const usePortfolio = () => {
  const language = useCookie<"pt" | "en">("portfolio-language", {
    default: () => "en",
    sameSite: "lax",
  });
  const t = computed(() => translations[language.value === "pt" ? "pt" : "en"]);
  return { language, t };
};
