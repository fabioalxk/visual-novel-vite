const scenes = [
  {
    id: 1,
    media: "/assets/maia/kitchen1NormalExpression.png",
    dialogues: [
    ],
    options: [
      { text: "", nextScene: 2, effect: {} },
    ],
    getNextScene: (option) => option.nextScene,
  },
  {
    id: 2,
    media: "/assets/maia/kitchen1Smiling.png",
    dialogues: [
      {
        character: "Ted",
        text: "Aqui está! Preparei algo especial para você.",
      },
      {
        character: "Luna",
        text: "Obrigada, Ted! Você parece ser um ótimo anfitrião.",
      },
      { character: "Ted", text: "Faz parte! Gosto de receber bem as pessoas." },
      { character: "Luna", text: "E o que mais você preparou para hoje?" },
    ],
    options: [
      {
        text: "Sugerir ir para a sala",
        nextScene: 3,
        effect: { interest: +5 },
      },
    ],
    getNextScene: (option) => option.nextScene,
  },
  {
    id: 3,
    media: "/assets/maia/maiaSofaOpenViewNormalExpression.png",
    dialogues: [
      {
        character: "Ted",
        text: "Aqui é a sala. Podemos nos sentar no sofá e relaxar um pouco.",
      },
      {
        character: "Luna",
        text: "Parece perfeito. Esse sofá parece muito confortável.",
      },
      {
        character: "Ted",
        text: "Fique à vontade! Essa é a minha parte favorita da casa.",
      },
      { character: "Luna", text: "Então você passa muito tempo aqui?" },
    ],
    options: [
      {
        text: "Compartilhar uma história sobre a sala",
        nextScene: 4,
        effect: { interest: +10 },
      },
      {
        text: "Fazer uma brincadeira sobre o sofá",
        nextScene: 5,
        effect: { interest: +5 },
      },
    ],
    getNextScene: (option) => option.nextScene,
  },
  {
    id: 4,
    media: "/assets/maia/maiaSofaCloseLookingFront.png",
    dialogues: [
      {
        character: "Ted",
        text: "Sim, já passei noites pensando e refletindo aqui.",
      },
      {
        character: "Luna",
        text: "É incrível como certos lugares nos trazem paz, né?",
      },
      {
        character: "Ted",
        text: "Exatamente. Me ajuda a organizar as ideias e relaxar.",
      },
      {
        character: "Luna",
        text: "Talvez eu devesse encontrar um lugar assim também.",
      },
    ],
    options: [
      {
        text: "Perguntar sobre os lugares favoritos dela",
        nextScene: 6,
        effect: { interest: +10 },
      },
    ],
    getNextScene: (option) => option.nextScene,
  },
  {
    id: 5,
    media: "/assets/maia/maiaSofaCloseLookingFrontSmiling.png",
    dialogues: [
      {
        character: "Ted",
        text: "Dizem que quem se senta aqui nunca mais quer levantar.",
      },
      { character: "Luna", text: "Será? Então vou querer provar isso!" },
      { character: "Ted", text: "Sinta-se à vontade, o sofá é todo seu." },
      {
        character: "Luna",
        text: "Bom, se é assim, acho que vou me acostumar.",
      },
    ],
    options: [
      {
        text: "Oferecer mais uma bebida",
        nextScene: 6,
        effect: { interest: +5 },
      },
    ],
    getNextScene: (option) => option.nextScene,
  },
  {
    id: 6,
    media: "/assets/maia/maiaSofaOpenViewSmiling.png",
    dialogues: [
      {
        character: "Luna",
        text: "Estou adorando a conversa, Ted. Você sempre foi tão atencioso?",
      },
      { character: "Ted", text: "Apenas com pessoas especiais." },
      { character: "Luna", text: "Oh, então me sinto privilegiada." },
      {
        character: "Ted",
        text: "E você merece. É ótimo ter alguém para dividir momentos simples assim.",
      },
    ],
    options: [
      {
        text: "Sugerir uma conversa mais profunda",
        nextScene: 7,
        effect: { interest: +10 },
      },
      {
        text: "Propor assistir a um filme",
        nextScene: 8,
        effect: { interest: +5 },
      },
    ],
    getNextScene: (option) => option.nextScene,
  },
  {
    id: 7,
    media: "/assets/maia/maiaSofaCloseLookingFront.png",
    dialogues: [
      {
        character: "Ted",
        text: "Luna, você tem alguma memória especial que te inspire?",
      },
      {
        character: "Luna",
        text: "Acho que uma viagem à praia com amigos. E você?",
      },
      {
        character: "Ted",
        text: "Talvez essa noite esteja se tornando uma dessas memórias.",
      },
      { character: "Luna", text: "Nossa, que lindo isso." },
    ],
    options: [
      {
        text: "Agradecer pela companhia",
        nextScene: 9,
        effect: { interest: +10 },
      },
    ],
    getNextScene: (option) => option.nextScene,
  },
  {
    id: 8,
    media: "/assets/maia/maiaSofaOpenViewNormalExpression.png",
    dialogues: [
      {
        character: "Ted",
        text: "Que tal assistirmos um filme? Algo que nos faça rir.",
      },
      { character: "Luna", text: "Boa ideia! Tenho algumas sugestões." },
      { character: "Ted", text: "Ótimo, escolha um que goste." },
      { character: "Luna", text: "Você confia demais no meu gosto, Ted." },
    ],
    options: [
      { text: "Iniciar o filme", nextScene: 9, effect: { interest: +5 } },
    ],
    getNextScene: (option) => option.nextScene,
  },
  {
    id: 9,
    media: "/assets/maia/sofa1Smiling.png",
    dialogues: [
      {
        character: "Narrador",
        text: "Ted e Luna passaram o resto da noite juntos, rindo e planejando novos encontros.",
      },
    ],
    options: [{ text: "Fim", nextScene: 999 }],
    getNextScene: (option) => option.nextScene,
  },
  {
    id: 999,
    media: "/assets/maia/end.jpg",
    dialogues: [
      { character: "Narrador", text: "Game Over. A história chegou ao fim." },
    ],
    options: [],
    getNextScene: () => null,
  },
];

export default scenes;
