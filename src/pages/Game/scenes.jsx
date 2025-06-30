// src/pages/Game/scenes.jsx
const scenes = [
  {
    id: 1,
    media: "/assets/imagens/kateChegandoNaFesta.png",
    music: "/assets/musicas/gotWellSoon.mp3",
    dialogues: [
      { character: "Kate", text: "Não sei se deveria estar aqui..." },
      { character: "Kate", text: "Mas talvez seja hora de me soltar um pouco." },
      { character: "Kate", text: "Só uma noite... só uma vez." }
    ],
    options: [],
  },
  {
    id: 2,
    media: "/assets/videos/bebidaBaladaTudoGirando.mp4",
    music: "/assets/musicas/gotWellSoon.mp3",
    dialogues: [
      { character: "Kate", text: "Nossa... tudo está girando..." },
      { character: "Kate", text: "Que sensação estranha... mas... liberadora?" },
      { character: "Kate", text: "Não me lembro da última vez que me senti assim..." }
    ],
    options: [],
  },
  {
    id: 3,
    media: "/assets/videos/kateDance1.mp4",
    music: "/assets/musicas/gotWellSoon.mp3",
    dialogues: [
      { character: "Kate", text: "Eu posso dançar! Eu consigo!" },
      { character: "Kate", text: "Por que sempre fui tão tímida?" },
      { character: "Kate", text: "Esta noite eu sou diferente!" }
    ],
    options: [],
  },
  {
    id: 4,
    media: "/assets/imagens/kateBeijando2HomensAoMesmoTempo.png",
    music: "/assets/musicas/gotWellSoon.mp3",
    dialogues: [
      { character: "Kate", text: "Eu... eu não me lembro direito..." },
      { character: "Pensamento", text: "O que está acontecendo comigo?" }
    ],
    options: [],
  },
  {
    id: 5,
    media: "/assets/imagens/kateDance2.png",
    music: "/assets/musicas/gotWellSoon.mp3",
    dialogues: [
      { character: "Kate", text: "A música... não para..." },
      { character: "Kate", text: "Minha cabeça... está tão confusa..." }
    ],
    options: [],
  },
  {
    id: 6,
    media: "/assets/imagens/kateJogadaNoChaoDaBaladaBebada.png",
    music: "/assets/musicas/gotWellSoon.mp3",
    dialogues: [
      { character: "Kate", text: "Onde... onde eu estou?" },
      { character: "Kate", text: "Preciso ir pra casa..." },
      { character: "Kate", text: "O que eu fiz?" }
    ],
    options: [],
  },
  {
    id: 7,
    media: "/assets/videos/KateVendoVideoQuePessoasGravaramDelaNaBalada.mp4",
    music: "/assets/musicas/gotWellSoon.mp3",
    dialogues: [
      { character: "Kate", text: "Não... isso não pode ser real..." },
      { character: "Kate", text: "Eles... eles gravaram tudo?" },
      { character: "Kate", text: "Meu Deus... o que eu fiz com minha vida?" }
    ],
    options: [],
  },
  {
    id: 8,
    media: "/assets/imagens/kateChorandoVendoMensagensNoCelular.png",
    music: "/assets/musicas/gotWellSoon.mp3",
    dialogues: [
      { character: "Kate", text: "As mensagens não param de chegar..." },
      { character: "Kate", text: "'Hipócrita', 'falsa cristã', 'vagabunda'..." },
      { character: "Kate", text: "Todo mundo já viu... todo mundo sabe..." }
    ],
    options: [],
  },
  {
    id: 9,
    media: "/assets/imagens/kateBullyingNaEscola.png",
    music: "/assets/musicas/gotWellSoon.mp3",
    dialogues: [
      { character: "Estudante", text: "Olha só a santinha aí!" },
      { character: "Kate", text: "Por favor... me deixem em paz..." },
      { character: "Estudante", text: "Vimos o vídeo, Kate. Que exemplo cristão, né?" },
      { character: "Kate", text: "Eu... eu não queria..." }
    ],
    options: [],
  },
  {
    id: 10,
    media: "/assets/imagens/kateVeMensagensMaldosasComBatomNoEspelho.png",
    music: "/assets/musicas/gotWellSoon.mp3",
    dialogues: [
      { character: "Kate", text: "'VOCÊ NÃO VALE NADA, KATE'... escrito no meu espelho da escola..." },
      { character: "Kate", text: "Não há lugar seguro para mim..." }
    ],
    options: [],
  },
  {
    id: 11,
    media: "/assets/imagens/kateChorandoSozinhaEmCimaNoPredio.png",
    music: "/assets/musicas/chuva.mp3",
    dialogues: [
      { character: "Kate", text: "Talvez... talvez seja melhor assim..." },
      { character: "Kate", text: "Ninguém vai sentir minha falta..." },
      { character: "Kate", text: "Eu decepcionei todo mundo... decepcionei a Deus..." }
    ],
    options: [],
  },
  {
    id: 12,
    media: "/assets/imagens/kateSozinhaEmCimaDoPredio.png",
    music: "/assets/musicas/chuva.mp3",
    dialogues: [
      { character: "Kate", text: "O vento aqui em cima é tão frio..." },
      { character: "Kate", text: "Seria tão fácil... apenas um passo..." },
      { character: "Kate", text: "Perdão, mamãe... perdão, Deus..." }
    ],
    options: [],
  },
  {
    id: 13,
    media: "/assets/videos/kateEmCimaNoPredioComHomemTentandoConvencerElaASairDali.mp4",
    music: "/assets/musicas/chuva.mp3",
    dialogues: [
      { character: "Kate", text: "Não... eu sou um erro... uma decepção..." },
      { character: "Você", text: "Kate! Não faça isso!" },
    ],
    options: [],
    /* MODIFICADO: Marcação para ativar chat com Gemini */
    isChat: true
  },
  {
    id: 14,
    media: "/assets/imagens/sucesso.png",
    music: "/assets/musicas/esperanca.mp3",
    dialogues: [
      { character: "Kate", text: "Obrigada... você me fez lembrar que ainda há esperança..." },
      { character: "Kate", text: "Talvez... talvez eu consiga superar isso..." },
      { character: "Narrador", text: "Kate foi salva. Sua vida vale a pena." }
    ],
    options: [],
  },
  {
    id: 15,
    media: "/assets/imagens/falha.png",
    music: "/assets/musicas/tristeza.mp3",
    dialogues: [
      { character: "Narrador", text: "Às vezes, as palavras não são suficientes..." },
      { character: "Narrador", text: "Kate não conseguiu encontrar esperança desta vez." },
      { character: "Narrador", text: "Toda vida importa. Se você ou alguém que conhece está passando por isso, procure ajuda." }
    ],
    options: [],
  }
];

export default scenes;