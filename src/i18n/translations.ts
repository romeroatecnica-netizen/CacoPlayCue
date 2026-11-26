import type {LangCode, SeoBundle} from '../config/seo';

export interface AffiliateCardCopy {
  title: string;
  category: string;
  description: string;
  cta: string;
  href: string;
}

export interface EditorialBlock {
  heading: string;
  body: string;
}

export interface UiDictionary {
  navPlay: string;
  navCaseBoard: string;
  navGuide: string;
  navFaq: string;
  ctaNewCase: string;

  heroTitle: string;
  heroSubtitle: string;

  challengeReceivedTitle: string;
  challengeBeatLabel: string;
  challengeDismiss: string;

  languageLabel: string;
  playersLabel: string;
  timerLabel: string;
  soundOn: string;
  soundOff: string;
  shuffleRoles: string;
  caseSelectLabel: string;
  caseNumberPrefix: string;

  streakCurrent: string;
  streakBest: string;
  casesSolvedLabel: string;
  totalPointsLabel: string;
  activeCaseLabel: string;

  caseBriefingTitle: string;
  incidentTimeLabel: string;
  locationLabel: string;
  stolenItemLabel: string;
  difficultyLabel: string;
  difficultyStandard: string;
  difficultyTricky: string;
  difficultyMaster: string;
  publicCluesTitle: string;

  svgMapTitle: string;
  svgMapHint: string;
  svgLegendZone: string;
  svgLegendClue: string;
  svgLegendBlindspot: string;
  svgLegendAlibi: string;
  svgSelectedZoneLabel: string;

  rolesTitle: string;
  rolesSubtitle: string;
  hideAllRoles: string;
  revealPrivateRole: string;
  hidePrivateRole: string;
  roleThief: string;
  rolePolice: string;
  roleCitizen: string;
  roleSecretHint: string;
  editPlayerPlaceholder: string;
  accuseButton: string;
  accusePromptTitle: string;
  accuseConfirm: string;
  accuseCancel: string;

  roundClockTitle: string;
  startTimer: string;
  pauseTimer: string;
  resetTimer: string;
  timeUpAlert: string;
  turnTrackerLabel: string;
  nextTurnButton: string;
  promptModeQuestion: string;
  promptModeStatement: string;
  suggestedPromptsTitle: string;
  notesTitle: string;
  notesPlaceholder: string;

  verdictCaughtTitle: string;
  verdictEscapedTitle: string;
  thiefWasLabel: string;
  policeWasLabel: string;
  alibiContradictionLabel: string;
  pointsEarnedLabel: string;
  nextCaseButton: string;
  replayCaseButton: string;

  shareWhatsApp: string;
  copyCaseLink: string;
  linkCopied: string;
  exportJson: string;
  importJson: string;
  importSuccess: string;
  importError: string;
  printCase: string;
  resetStats: string;
  whatsappChallengeTemplate: string;

  printSheetTitle: string;
  printMatchLedger: string;
  printNotesBox: string;

  adLabel: string;
  affiliateTitle: string;
  affiliateSubtitle: string;
  affiliateItems: AffiliateCardCopy[];

  editorialTitle: string;
  editorialSections: EditorialBlock[];
  faqTitle: string;
  transparentNotice: string;

  footerCopy: string;
  footerPrivacy: string;

  seo: SeoBundle;
}

const AFFILIATE_EN: AffiliateCardCopy[] = [
  {
    title: 'Hidden-Role & Social Deduction Tabletop Box',
    category: 'Party Board Games',
    description: 'Compact 4–10 player bluffing and secret-role card sets built for quick game nights.',
    cta: 'View Edition',
    href: 'https://www.amazon.com/s?k=social+deduction+board+game+hidden+roles',
  },
  {
    title: 'Tactile Sand & Digital Desk Round Timer',
    category: 'Game Night Timers',
    description: 'High-contrast 60s/90s/120s tabletop countdown clocks for timed interrogation rounds.',
    cta: 'Compare Timers',
    href: 'https://www.amazon.com/s?k=board+game+digital+countdown+timer',
  },
  {
    title: 'Detective Evidence & Alibi Pocket Notepads',
    category: 'Investigation Supplies',
    description: 'Grid-ruled clue sheets and fine-tip pens for tracking suspect timelines offline.',
    cta: 'Browse Pads',
    href: 'https://www.amazon.com/s?k=detective+mystery+case+notepad',
  },
];

export const TRANSLATIONS: Record<LangCode, UiDictionary> = {
  en: {
    navPlay: 'Play',
    navCaseBoard: 'Case File',
    navGuide: 'How to Play',
    navFaq: 'FAQ',
    ctaNewCase: 'New Case',

    heroTitle: 'CacoPlayCue — Thief, Police & Alibis',
    heroSubtitle:
      'Pass-and-play social deduction for 3–6 players. Reveal your secret role privately, cross-check the SVG crime scene against ambiguous alibis before the clock hits zero, and share the exact case seed on WhatsApp.',

    challengeReceivedTitle: 'Incoming Case Challenge',
    challengeBeatLabel: 'Sent by {name} · Streak {streak} · {points} pts',
    challengeDismiss: 'Dismiss',

    languageLabel: 'Language',
    playersLabel: 'Players',
    timerLabel: 'Round Clock',
    soundOn: 'Sound On',
    soundOff: 'Muted',
    shuffleRoles: 'Shuffle Roles',
    caseSelectLabel: 'Case File',
    caseNumberPrefix: 'Case',

    streakCurrent: 'Current Streak',
    streakBest: 'Best Streak',
    casesSolvedLabel: 'Cases Solved',
    totalPointsLabel: 'Score',
    activeCaseLabel: 'Active Case',

    caseBriefingTitle: 'Public Case Briefing & Shared Clues',
    incidentTimeLabel: 'Incident Window',
    locationLabel: 'Scene',
    stolenItemLabel: 'Missing Item',
    difficultyLabel: 'Complexity',
    difficultyStandard: 'Standard',
    difficultyTricky: 'Tricky',
    difficultyMaster: 'Master',
    publicCluesTitle: 'Confirmed Evidence',

    svgMapTitle: 'Scene Schematic & Alibi Links',
    svgMapHint: 'Click any zone to inspect camera coverage, entry points, and alibi paths.',
    svgLegendZone: 'Room / Zone',
    svgLegendClue: 'Evidence Pin',
    svgLegendBlindspot: 'Blind Spot',
    svgLegendAlibi: 'Alibi Route',
    svgSelectedZoneLabel: 'Zone Inspection',

    rolesTitle: 'Secret Role Cards (Private Reveal)',
    rolesSubtitle:
      'Pass the device to each player. Opening one card automatically hides the others.',
    hideAllRoles: 'Hide All Cards',
    revealPrivateRole: 'Reveal Role & Clue',
    hidePrivateRole: 'Hide Card',
    roleThief: 'Thief (Caco)',
    rolePolice: 'Police',
    roleCitizen: 'Citizen',
    roleSecretHint: 'Private Briefing',
    editPlayerPlaceholder: 'Player name',
    accuseButton: 'Accuse Suspect',
    accusePromptTitle: 'Confirm Final Accusation',
    accuseConfirm: 'Confirm Accusation',
    accuseCancel: 'Keep Questioning',

    roundClockTitle: 'Interrogation Clock & Turn Prompts',
    startTimer: 'Start Clock',
    pauseTimer: 'Pause',
    resetTimer: 'Reset',
    timeUpAlert: 'Time expired — make your final accusation!',
    turnTrackerLabel: 'Active Turn',
    nextTurnButton: 'Next Turn',
    promptModeQuestion: 'Ask a Question',
    promptModeStatement: 'Make a Claim',
    suggestedPromptsTitle: 'Tactical Prompts for This Case',
    notesTitle: 'Investigator Scratchpad',
    notesPlaceholder: 'Log claimed locations, time gaps, or suspicious reactions...',

    verdictCaughtTitle: 'Thief Caught — Case Solved!',
    verdictEscapedTitle: 'Wrong Accusation — The Thief Escaped!',
    thiefWasLabel: 'The Thief was',
    policeWasLabel: 'Lead Police',
    alibiContradictionLabel: 'Alibi Contradiction',
    pointsEarnedLabel: 'Points Earned',
    nextCaseButton: 'Next Case',
    replayCaseButton: 'Reshuffle Same Case',

    shareWhatsApp: 'Send Case on WhatsApp',
    copyCaseLink: 'Copy Case Link',
    linkCopied: 'Link Copied',
    exportJson: 'Export JSON',
    importJson: 'Import JSON',
    importSuccess: 'Save imported successfully.',
    importError: 'Invalid JSON save file.',
    printCase: 'Print Case Sheet',
    resetStats: 'Reset Stats',
    whatsappChallengeTemplate:
      'CacoPlayCue Challenge ({code}): Can your group catch the Thief before the {duration}s clock runs out? My streak: {streak} ({points} pts). Open the exact case here: {url}',

    printSheetTitle: 'CacoPlayCue Printable Case Dossier',
    printMatchLedger: 'Suspect Roster & Accusation Tally',
    printNotesBox: 'Investigator Timeline Notes',

    adLabel: 'Sponsored Partner Placement',
    affiliateTitle: 'Tabletop Gear for Mystery & Social Deduction Nights',
    affiliateSubtitle:
      'Practical accessories to run offline party rounds with friends and family.',
    affiliateItems: AFFILIATE_EN,

    editorialTitle: 'How to Master Thief, Police & Alibi Deduction Games',
    editorialSections: [
      {
        heading: '1. Balancing Secret Roles Without Burning Clues Early',
        body: 'In three- to six-player social deduction rounds, the Thief wins when Citizens accuse each other while the Police investigator waits too long to share verified facts. Citizens should state concrete room and minute anchors without immediately exposing every witness detail, forcing the Thief to commit to a flawed timeline on the schematic.',
      },
      {
        heading: '2. Spotting Alibi Contradictions Under a 60–120 Second Clock',
        body: 'Every CacoPlayCue scenario pairs an SVG floorplan with blind spots, locked doors, and sensor timestamps. Compare claimed walking routes against the confirmed evidence pins: if a suspect places themselves in a wing whose motion sensor never fired, press them on who they passed in the connecting corridor.',
      },
      {
        heading: '3. Challenging Friends via Deterministic WhatsApp Case Links',
        body: 'Because the case ID, shuffle seed, round timer, and benchmark streak are encoded directly into the URL, sending a case via WhatsApp lets another group play the exact same mystery offline on their own device with zero server accounts or AI wait times.',
      },
      {
        heading: '4. Party & Family Group Setup Tips',
        body: 'Use 60-second rounds for fast icebreakers with 3–4 players, or 120-second rounds with 5–6 players when multiple Citizens hold overlapping witness corridors. Print the case sheet for screen-free living room play and export your JSON save to keep your deduction streak across devices.',
      },
    ],
    faqTitle: 'Frequently Asked Questions',
    transparentNotice:
      '100% client-side social deduction game with secret roles, alibi clues, and shareable case links. Case links are encoded in the URL without a backend, and all streaks and notes run locally in your browser without AI API calls.',

    footerCopy: 'CacoPlayCue · Deterministic Social Deduction Party Game',
    footerPrivacy: 'All scores, player names, and notes stay locally in your browser.',

    seo: {
      title: 'CacoPlayCue — Social Deduction Game: Thief, Police & Alibis',
      description:
        'Play CacoPlayCue, a fast 3–6 player social deduction game with secret Thief, Police & Citizen roles, SVG floorplan clues, timed alibis, streaks, and WhatsApp case challenges.',
      howToName: 'How to play CacoPlayCue social deduction game',
      howToSteps: [
        {
          name: 'Configure players and round clock',
          text: 'Select 3 to 6 players, customize names, pick a 60s, 90s, or 120s round timer, and choose or randomize a mystery case.',
        },
        {
          name: 'Reveal secret roles privately',
          text: 'Pass the device so each player taps their card to privately read their Thief, Police, or Citizen role and alibi clue.',
        },
        {
          name: 'Interrogate alibis against the SVG scene map',
          text: 'Start the countdown clock and take turns asking questions or making claims while checking rooms, blind spots, and timestamps on the CacoPoliceSvg diagram.',
        },
        {
          name: 'Accuse the Thief and share the challenge',
          text: 'Vote on the suspect to update your deduction streak and points, then send the exact URL-encoded case challenge on WhatsApp.',
        },
      ],
      faqs: [
        {
          q: 'How many players can play CacoPlayCue?',
          a: 'CacoPlayCue is designed for 3 to 6 players on a single shared screen (pass-and-play) or via shared challenge links across groups.',
        },
        {
          q: 'Do I need an account, server, or AI API key to play?',
          a: 'No. Everything runs 100% locally and deterministically in your browser with zero backend, zero login, and zero AI API calls.',
        },
        {
          q: 'How do WhatsApp case challenge links work without a backend?',
          a: 'The case ID, random seed, player count, timer duration, and challenger streak are encoded directly into the shareable URL parameter.',
        },
        {
          q: 'Can I save my deduction streak or print a case for tabletop play?',
          a: 'Yes. Streaks, points, player names, and notes save automatically in localStorage, can be exported or imported as JSON, and print cleanly via the Print Case Sheet button.',
        },
      ],
    },
  },

  es: {
    navPlay: 'Jugar',
    navCaseBoard: 'Expediente',
    navGuide: 'Cómo jugar',
    navFaq: 'Preguntas',
    ctaNewCase: 'Nuevo caso',

    heroTitle: 'CacoPlayCue — Caco, Policía y Coartadas',
    heroSubtitle:
      'Juego multijugador de deducción social para 3–6 jugadores. Oculta y revela tu rol secreto en privado, contrasta el croquis SVG de la escena con coartadas ambiguas bajo reloj y envía el reto por WhatsApp.',

    challengeReceivedTitle: 'Reto de caso recibido',
    challengeBeatLabel: 'Enviado por {name} · Racha {streak} · {points} pts',
    challengeDismiss: 'Cerrar',

    languageLabel: 'Idioma',
    playersLabel: 'Jugadores',
    timerLabel: 'Reloj de ronda',
    soundOn: 'Sonido activo',
    soundOff: 'Silencio',
    shuffleRoles: 'Sortear roles',
    caseSelectLabel: 'Expediente',
    caseNumberPrefix: 'Caso',

    streakCurrent: 'Racha actual',
    streakBest: 'Mejor racha',
    casesSolvedLabel: 'Casos resueltos',
    totalPointsLabel: 'Puntos',
    activeCaseLabel: 'Caso activo',

    caseBriefingTitle: 'Resumen del caso y pistas públicas',
    incidentTimeLabel: 'Franja del robo',
    locationLabel: 'Escenario',
    stolenItemLabel: 'Objeto sustraído',
    difficultyLabel: 'Dificultad',
    difficultyStandard: 'Estándar',
    difficultyTricky: 'Astuto',
    difficultyMaster: 'Maestro',
    publicCluesTitle: 'Pistas confirmadas',

    svgMapTitle: 'Esquema de escena y vínculos de coartada',
    svgMapHint: 'Pulsa cualquier zona para inspeccionar cámaras, accesos y rutas de coartada.',
    svgLegendZone: 'Zona / Sala',
    svgLegendClue: 'Indicio',
    svgLegendBlindspot: 'Punto ciego',
    svgLegendAlibi: 'Ruta de coartada',
    svgSelectedZoneLabel: 'Inspección de zona',

    rolesTitle: 'Cartas de rol secreto (ocultación privada)',
    rolesSubtitle:
      'Pasa el dispositivo a cada jugador. Al abrir una carta se ocultan automáticamente las demás.',
    hideAllRoles: 'Ocultar todas',
    revealPrivateRole: 'Ver rol y pista',
    hidePrivateRole: 'Ocultar carta',
    roleThief: 'Caco (Ladrón)',
    rolePolice: 'Policía',
    roleCitizen: 'Ciudadano',
    roleSecretHint: 'Informe privado',
    editPlayerPlaceholder: 'Nombre del jugador',
    accuseButton: 'Acusar sospechoso',
    accusePromptTitle: 'Confirmar acusación final',
    accuseConfirm: 'Confirmar acusación',
    accuseCancel: 'Seguir interrogando',

    roundClockTitle: 'Cronómetro y turnos de preguntas',
    startTimer: 'Iniciar reloj',
    pauseTimer: 'Pausar',
    resetTimer: 'Reiniciar',
    timeUpAlert: '¡Tiempo agotado! Emitid la acusación final.',
    turnTrackerLabel: 'Turno activo',
    nextTurnButton: 'Siguiente turno',
    promptModeQuestion: 'Hacer pregunta',
    promptModeStatement: 'Lanzar afirmación',
    suggestedPromptsTitle: 'Preguntas y afirmaciones sugeridas',
    notesTitle: 'Bloc de investigación',
    notesPlaceholder: 'Anota horarios declarados, huecos en coartadas o contradicciones...',

    verdictCaughtTitle: '¡Caco atrapado — Caso resuelto!',
    verdictEscapedTitle: 'Acusación fallida — ¡El Caco escapó!',
    thiefWasLabel: 'El Caco era',
    policeWasLabel: 'Policía jefe',
    alibiContradictionLabel: 'Contradicción de coartada',
    pointsEarnedLabel: 'Puntos obtenidos',
    nextCaseButton: 'Siguiente caso',
    replayCaseButton: 'Rejugar mismo caso',

    shareWhatsApp: 'Enviar reto por WhatsApp',
    copyCaseLink: 'Copiar enlace del caso',
    linkCopied: 'Enlace copiado',
    exportJson: 'Exportar JSON',
    importJson: 'Importar JSON',
    importSuccess: 'Progreso importado correctamente.',
    importError: 'Archivo JSON no válido.',
    printCase: 'Imprimir acta',
    resetStats: 'Reiniciar racha',
    whatsappChallengeTemplate:
      'Reto CacoPlayCue ({code}): ¿Podéis descubrir al Caco antes de que acabe el reloj de {duration}s? Mi racha: {streak} ({points} pts). Abre el caso exacto aquí: {url}',

    printSheetTitle: 'CacoPlayCue — Expediente imprimible del caso',
    printMatchLedger: 'Registro de sospechosos y votos',
    printNotesBox: 'Notas cronológicas de coartadas',

    adLabel: 'Espacio publicitario contextual',
    affiliateTitle: 'Juegos y accesorios para noches de misterio y deducción',
    affiliateSubtitle:
      'Material recomendado para partidas presenciales con amigos y familia.',
    affiliateItems: [
      {
        title: 'Juegos de mesa de roles ocultos y deducción social',
        category: 'Juegos de mesa',
        description: 'Partidas rápidas de 4 a 10 personas con faroles, identidades secretas y misterio.',
        cta: 'Ver opciones',
        href: 'https://www.amazon.es/s?k=juego+de+mesa+roles+ocultos+deduccion+social',
      },
      {
        title: 'Cronómetro digital y relojes de arena para partidas',
        category: 'Temporizadores',
        description: 'Relojes de mesa de alta visibilidad para rondas de 60, 90 y 120 segundos.',
        cta: 'Ver relojes',
        href: 'https://www.amazon.es/s?k=temporizador+digital+juegos+de+mesa',
      },
      {
        title: 'Blocs de notas de detective e investigación',
        category: 'Papelería lúdica',
        description: 'Cuadernos de pistas y coartadas para anotar sospechosos sin pantallas.',
        cta: 'Explorar blocs',
        href: 'https://www.amazon.es/s?k=libreta+pistas+detective+juego',
      },
    ],

    editorialTitle: 'Guía práctica: cómo ganar partidas de Caco, Policía y coartadas',
    editorialSections: [
      {
        heading: '1. Revela roles sin quemar tus pistas demasiado pronto',
        body: 'En partidas de 3 a 6 jugadores, el error más común es soltar toda la pista privada en el primer turno. Si eres Ciudadano o Policía, confirma primero una zona y una hora concretas del croquis SVG para obligar al Caco a inventar una coartada verificable.',
      },
      {
        heading: '2. Detecta contradicciones en coartadas y horarios bajo reloj',
        body: 'Cada caso combina sensores horarios, puntos ciegos de cámara y accesos cerrados en el plano CacoPoliceSvg. Cuando alguien afirme haber cruzado un pasillo sin activar el sensor correspondiente, contrasta su ruta con los testigos cercanos antes de que expire el cronómetro.',
      },
      {
        heading: '3. Envía casos y retos por enlace de WhatsApp sin servidor',
        body: 'El número de caso, la semilla de reparto de roles, la duración de ronda y tu racha quedan codificados directamente en la URL. Al compartir por WhatsApp, otro grupo abrirá exactamente el mismo misterio y podrá intentar superar tu puntuación.',
      },
      {
        heading: '4. Consejos para grupos de amigos o familia',
        body: 'Usa rondas de 60 segundos para partidas ágiles de 3–4 personas, o de 120 segundos con 5–6 jugadores cuando haya más coartadas cruzadas. Imprime el expediente en papel o exporta tu racha en JSON para no perder tu historial.',
      },
    ],
    faqTitle: 'Preguntas frecuentes',
    transparentNotice:
      '100% client-side social deduction game with secret roles, alibi clues, and shareable case links. Case links are encoded in the URL without a backend, and all streaks and notes run locally in your browser without AI API calls.',

    footerCopy: 'CacoPlayCue · Juego determinista de deducción social',
    footerPrivacy: 'Rachas, nombres y notas se guardan localmente en tu navegador.',

    seo: {
      title: 'CacoPlayCue — Juego de Deducción Social: Caco, Policía y Coartadas',
      description:
        'Juega gratis a CacoPlayCue: deducción social para 3–6 jugadores con roles secretos de Caco, Policía y Ciudadano, croquis SVG, reloj, racha y reto por WhatsApp.',
      howToName: 'Cómo jugar a CacoPlayCue (Caco y Policía)',
      howToSteps: [
        {
          name: 'Configura jugadores y reloj',
          text: 'Elige entre 3 y 6 jugadores, edita sus nombres, selecciona rondas de 60s, 90s o 120s y escoge un caso.',
        },
        {
          name: 'Consulta tu rol secreto en privado',
          text: 'Pasa el móvil para que cada persona abra y vuelva a ocultar su carta de Caco, Policía o Ciudadano con su pista.',
        },
        {
          name: 'Interroga coartadas sobre el esquema SVG',
          text: 'Activa el cronómetro y turnaos con preguntas o afirmaciones contrastando zonas, puntos ciegos y horarios.',
        },
        {
          name: 'Acusa al Caco y comparte el reto',
          text: 'Resuelve la acusación para sumar puntos y racha deductiva, y envía el enlace del caso por WhatsApp.',
        },
      ],
      faqs: [
        {
          q: '¿Cuántos jugadores pueden participar en CacoPlayCue?',
          a: 'Está optimizado para grupos de 3 a 6 jugadores pasando un mismo dispositivo o comparando rachas con enlaces de reto.',
        },
        {
          q: '¿Necesita registro, servidor o API de IA?',
          a: 'No. Toda la lógica y los casos funcionan 100 % en local y de forma determinista en tu navegador, sin backend ni APIs externas.',
        },
        {
          q: '¿Cómo funciona el reto por WhatsApp sin base de datos?',
          a: 'El identificador del caso, la semilla aleatoria y tu racha se codifican en la propia URL para abrir exactamente la misma partida.',
        },
        {
          q: '¿Se pueden guardar o imprimir las partidas?',
          a: 'Sí. El progreso se guarda en localStorage, admite exportar e importar en JSON y cuenta con diseño limpio para imprimir en papel.',
        },
      ],
    },
  },

  fr: {
    navPlay: 'Jouer',
    navCaseBoard: 'Dossier',
    navGuide: 'Règles',
    navFaq: 'FAQ',
    ctaNewCase: 'Nouveau cas',

    heroTitle: 'CacoPlayCue — Voleur, Police & Alibis',
    heroSubtitle:
      'Jeu de déduction sociale pour 3 à 6 joueurs. Révélez votre rôle secret en privé, confrontez les alibis ambigus au plan SVG avant la fin du chrono et partagez le défi sur WhatsApp.',

    challengeReceivedTitle: 'Défi reçu',
    challengeBeatLabel: 'Envoyé par {name} · Série {streak} · {points} pts',
    challengeDismiss: 'Fermer',

    languageLabel: 'Langue',
    playersLabel: 'Joueurs',
    timerLabel: 'Chrono',
    soundOn: 'Son activé',
    soundOff: 'Muet',
    shuffleRoles: 'Mélanger les rôles',
    caseSelectLabel: 'Dossier',
    caseNumberPrefix: 'Cas',

    streakCurrent: 'Série actuelle',
    streakBest: 'Meilleure série',
    casesSolvedLabel: 'Cas résolus',
    totalPointsLabel: 'Score',
    activeCaseLabel: 'Cas actif',

    caseBriefingTitle: 'Briefing public et indices confirmés',
    incidentTimeLabel: 'Créneau du vol',
    locationLabel: 'Lieu',
    stolenItemLabel: 'Objet volé',
    difficultyLabel: 'Complexité',
    difficultyStandard: 'Standard',
    difficultyTricky: 'Subtil',
    difficultyMaster: 'Expert',
    publicCluesTitle: 'Preuves confirmées',

    svgMapTitle: 'Plan de la scène et liens d’alibi',
    svgMapHint: 'Cliquez sur une zone pour inspecter les caméras, accès et trajets.',
    svgLegendZone: 'Salle / Zone',
    svgLegendClue: 'Indice',
    svgLegendBlindspot: 'Angle mort',
    svgLegendAlibi: 'Trajet alibi',
    svgSelectedZoneLabel: 'Inspection de zone',

    rolesTitle: 'Cartes de rôle secret (révélation privée)',
    rolesSubtitle:
      'Passez l’appareil à chaque joueur. Ouvrir une carte masque automatiquement les autres.',
    hideAllRoles: 'Tout masquer',
    revealPrivateRole: 'Voir rôle et indice',
    hidePrivateRole: 'Masquer la carte',
    roleThief: 'Voleur (Caco)',
    rolePolice: 'Police',
    roleCitizen: 'Citoyen',
    roleSecretHint: 'Note secrète',
    editPlayerPlaceholder: 'Nom du joueur',
    accuseButton: 'Accuser ce suspect',
    accusePromptTitle: 'Confirmer l’accusation finale',
    accuseConfirm: 'Confirmer',
    accuseCancel: 'Continuer l’enquête',

    roundClockTitle: 'Chronomètre et tours d’interrogatoire',
    startTimer: 'Démarrer',
    pauseTimer: 'Pause',
    resetTimer: 'Réinitialiser',
    timeUpAlert: 'Temps écoulé — désignez le suspect !',
    turnTrackerLabel: 'Tour actif',
    nextTurnButton: 'Tour suivant',
    promptModeQuestion: 'Poser une question',
    promptModeStatement: 'Faire une déclaration',
    suggestedPromptsTitle: 'Questions et déclarations suggérées',
    notesTitle: 'Carnet de l’enquêteur',
    notesPlaceholder: 'Notez les horaires déclarés et contradictions...',

    verdictCaughtTitle: 'Voleur arrêté — Affaire résolue !',
    verdictEscapedTitle: 'Erreur — Le Voleur s’est échappé !',
    thiefWasLabel: 'Le Voleur était',
    policeWasLabel: 'Officier de Police',
    alibiContradictionLabel: 'Contradiction d’alibi',
    pointsEarnedLabel: 'Points gagnés',
    nextCaseButton: 'Cas suivant',
    replayCaseButton: 'Rejouer ce cas',

    shareWhatsApp: 'Envoyer sur WhatsApp',
    copyCaseLink: 'Copier le lien',
    linkCopied: 'Lien copié',
    exportJson: 'Exporter JSON',
    importJson: 'Importer JSON',
    importSuccess: 'Sauvegarde importée.',
    importError: 'Fichier JSON invalide.',
    printCase: 'Imprimer la fiche',
    resetStats: 'Réinitialiser',
    whatsappChallengeTemplate:
      'Défi CacoPlayCue ({code}) : Saurez-vous démasquer le Voleur en {duration}s ? Ma série : {streak} ({points} pts). Lien du cas : {url}',

    printSheetTitle: 'CacoPlayCue — Dossier d’enquête imprimable',
    printMatchLedger: 'Liste des suspects et votes',
    printNotesBox: 'Notes chronologiques',

    adLabel: 'Espace partenaire',
    affiliateTitle: 'Accessoires de soirée jeux d’enquête et déduction',
    affiliateSubtitle: 'Matériel pratique pour animer vos parties en groupe.',
    affiliateItems: AFFILIATE_EN,

    editorialTitle: 'Comment maîtriser les jeux de déduction et d’alibis',
    editorialSections: [
      {
        heading: '1. Protéger ses indices sans se trahir',
        body: 'Entre 3 et 6 joueurs, révéler toute sa piste dès la première seconde aide surtout le Voleur à ajuster son mensonge. Partagez un lieu et un horaire précis pour forcer chaque suspect à se positionner sur le plan SVG.',
      },
      {
        heading: '2. Repérer les incohérences horaires sous pression',
        body: 'Le schéma CacoPoliceSvg met en évidence les angles morts et capteurs. Confrontez chaque trajet annoncé aux preuves publiques avant la fin du minuteur.',
      },
      {
        heading: '3. Défis déterministes sur WhatsApp sans serveur',
        body: 'Chaque lien encodé contient l’affaire, la graine aléatoire et la série à battre, permettant de rejouer le même cas hors serveur.',
      },
    ],
    faqTitle: 'Questions fréquentes',
    transparentNotice:
      '100% client-side social deduction game with secret roles, alibi clues, and shareable case links. Case links are encoded in the URL without a backend, and all streaks and notes run locally in your browser without AI API calls.',

    footerCopy: 'CacoPlayCue · Jeu de déduction sociale déterministe',
    footerPrivacy: 'Scores et notes conservés localement dans votre navigateur.',

    seo: {
      title: 'CacoPlayCue — Jeu de Déduction Sociale : Voleur, Police & Alibis',
      description:
        'Jeu multijoueur de déduction sociale (3–6 joueurs) avec rôles secrets, plan SVG, alibis ambigus, chrono, série de victoires et défis WhatsApp.',
      howToName: 'Comment jouer à CacoPlayCue',
      howToSteps: [
        {name: 'Configurer la partie', text: 'Choisissez 3 à 6 joueurs et un chrono de 60s, 90s ou 120s.'},
        {name: 'Consulter les rôles en privé', text: 'Chaque joueur révèle puis masque sa carte secrète.'},
        {name: 'Interroger les alibis', text: 'Comparez les trajets avec le plan SVG avant la fin du chrono.'},
        {name: 'Accuser et partager', text: 'Désignez le Voleur et envoyez le défi par lien WhatsApp.'},
      ],
      faqs: [
        {q: 'Combien de joueurs peuvent jouer ?', a: 'De 3 à 6 joueurs sur un appareil partagé ou via lien de défi.'},
        {q: 'Faut-il un compte ou une API IA ?', a: 'Non, tout fonctionne 100 % localement dans votre navigateur.'},
      ],
    },
  },

  de: {
    navPlay: 'Spielen',
    navCaseBoard: 'Fallakte',
    navGuide: 'Anleitung',
    navFaq: 'FAQ',
    ctaNewCase: 'Neuer Fall',

    heroTitle: 'CacoPlayCue — Dieb, Polizei & Alibis',
    heroSubtitle:
      'Soziales Deduktionsspiel für 3–6 Spieler. Geheime Rollen privat prüfen, mehrdeutige Alibis am SVG-Tatortplan unter Zeitdruck entlarven und Fälle per WhatsApp teilen.',

    challengeReceivedTitle: 'Eingehende Fall-Herausforderung',
    challengeBeatLabel: 'Von {name} · Serie {streak} · {points} Pkt.',
    challengeDismiss: 'Schließen',

    languageLabel: 'Sprache',
    playersLabel: 'Spieler',
    timerLabel: 'Rundenzeit',
    soundOn: 'Ton an',
    soundOff: 'Stumm',
    shuffleRoles: 'Rollen mischen',
    caseSelectLabel: 'Fallakte',
    caseNumberPrefix: 'Fall',

    streakCurrent: 'Aktuelle Serie',
    streakBest: 'Beste Serie',
    casesSolvedLabel: 'Gelöste Fälle',
    totalPointsLabel: 'Punkte',
    activeCaseLabel: 'Aktiver Fall',

    caseBriefingTitle: 'Öffentliches Briefing & bestätigte Indizien',
    incidentTimeLabel: 'Tatzeitfenster',
    locationLabel: 'Tatort',
    stolenItemLabel: 'Diebesgut',
    difficultyLabel: 'Schwierigkeit',
    difficultyStandard: 'Standard',
    difficultyTricky: 'Knifflig',
    difficultyMaster: 'Meister',
    publicCluesTitle: 'Gesicherte Hinweise',

    svgMapTitle: 'Tatort-Schema & Alibi-Verbindungen',
    svgMapHint: 'Klicke auf einen Raum, um Kameras, Zugänge und Wege zu prüfen.',
    svgLegendZone: 'Bereich / Raum',
    svgLegendClue: 'Beweispunkt',
    svgLegendBlindspot: 'Toter Winkel',
    svgLegendAlibi: 'Alibi-Route',
    svgSelectedZoneLabel: 'Zonenprüfung',

    rolesTitle: 'Geheime Rollenkarten (Privatansicht)',
    rolesSubtitle:
      'Gerät reihum geben. Beim Öffnen einer Karte werden alle anderen automatisch verdeckt.',
    hideAllRoles: 'Alle verdecken',
    revealPrivateRole: 'Rolle & Hinweis zeigen',
    hidePrivateRole: 'Karte verdecken',
    roleThief: 'Dieb (Caco)',
    rolePolice: 'Polizei',
    roleCitizen: 'Bürger',
    roleSecretHint: 'Geheimer Hinweis',
    editPlayerPlaceholder: 'Spielername',
    accuseButton: 'Verdächtigen',
    accusePromptTitle: 'Anklage bestätigen',
    accuseConfirm: 'Anklage erheben',
    accuseCancel: 'Weiter befragen',

    roundClockTitle: 'Rundenuhr & Zug-Impulse',
    startTimer: 'Start',
    pauseTimer: 'Pause',
    resetTimer: 'Reset',
    timeUpAlert: 'Zeit abgelaufen — jetzt anklagen!',
    turnTrackerLabel: 'Aktiver Zug',
    nextTurnButton: 'Nächster Zug',
    promptModeQuestion: 'Frage stellen',
    promptModeStatement: 'Aussage machen',
    suggestedPromptsTitle: 'Taktische Impulse für diesen Fall',
    notesTitle: 'Ermittlungsnotizen',
    notesPlaceholder: 'Genannte Zeiten, Räume und Widersprüche notieren...',

    verdictCaughtTitle: 'Dieb gefasst — Fall gelöst!',
    verdictEscapedTitle: 'Falsche Anklage — Der Dieb entkommt!',
    thiefWasLabel: 'Der Dieb war',
    policeWasLabel: 'Leitende Polizei',
    alibiContradictionLabel: 'Alibi-Widerspruch',
    pointsEarnedLabel: 'Erhaltene Punkte',
    nextCaseButton: 'Nächster Fall',
    replayCaseButton: 'Gleichen Fall neu mischen',

    shareWhatsApp: 'Per WhatsApp teilen',
    copyCaseLink: 'Fall-Link kopieren',
    linkCopied: 'Link kopiert',
    exportJson: 'JSON exportieren',
    importJson: 'JSON importieren',
    importSuccess: 'Spielstand importiert.',
    importError: 'Ungültige JSON-Datei.',
    printCase: 'Fallakte drucken',
    resetStats: 'Statistik löschen',
    whatsappChallengeTemplate:
      'CacoPlayCue-Challenge ({code}): Findet ihr den Dieb in {duration}s? Meine Serie: {streak} ({points} Pkt.). Direkt zum Fall: {url}',

    printSheetTitle: 'CacoPlayCue — Druckbare Fallakte',
    printMatchLedger: 'Verdächtigenliste & Abstimmung',
    printNotesBox: 'Zeitlinien-Notizen',

    adLabel: 'Anzeige',
    affiliateTitle: 'Zubehör für Krimi- & Deduktionsspiele',
    affiliateSubtitle: 'Nützliche Helfer für gemeinsame Spielrunden.',
    affiliateItems: AFFILIATE_EN,

    editorialTitle: 'Tipps für schnelle Deduktionsrunden mit Alibis',
    editorialSections: [
      {
        heading: '1. Hinweise dosiert einsetzen',
        body: 'Verrate als Bürger oder Polizei zuerst nur einen Zeit- oder Raumanker. So muss der Dieb sein Alibi festlegen, bevor er alle Gegenaussagen kennt.',
      },
      {
        heading: '2. Widersprüche auf dem SVG-Plan prüfen',
        body: 'Vergleiche Laufwege zwischen den Räumen mit toten Winkeln und Sensoren, solange die Rundenuhr läuft.',
      },
      {
        heading: '3. Herausforderungen ohne Server per WhatsApp senden',
        body: 'Fallnummer, Seed und Bestmarke stecken direkt im URL-Link und funktionieren überall im Browser.',
      },
    ],
    faqTitle: 'Häufige Fragen',
    transparentNotice:
      '100% client-side social deduction game with secret roles, alibi clues, and shareable case links. Case links are encoded in the URL without a backend, and all streaks and notes run locally in your browser without AI API calls.',

    footerCopy: 'CacoPlayCue · Deterministisches Deduktionsspiel',
    footerPrivacy: 'Alle Punkte und Notizen bleiben lokal in deinem Browser.',

    seo: {
      title: 'CacoPlayCue — Soziales Deduktionsspiel: Dieb, Polizei & Alibis',
      description:
        'Spiele CacoPlayCue mit 3–6 Spielern: geheime Rollen, SVG-Tatortplan, Timer, Trefferserie und WhatsApp-Falllinks komplett im Browser.',
      howToName: 'So wird CacoPlayCue gespielt',
      howToSteps: [
        {name: 'Runde einrichten', text: '3–6 Spieler und 60s, 90s oder 120s Timer wählen.'},
        {name: 'Rollen geheim ansehen', text: 'Gerät weitergeben und Karte privat öffnen.'},
        {name: 'Alibis abgleichen', text: 'Hinweise am SVG-Plan hinterfragen.'},
        {name: 'Anklagen & teilen', text: 'Dieb überführen und Link per WhatsApp senden.'},
      ],
      faqs: [
        {q: 'Wie viele Spieler können mitmachen?', a: '3 bis 6 Spieler auf einem Gerät oder per Challenge-Link.'},
        {q: 'Gibt es ein Backend oder KI-Kosten?', a: 'Nein, alles läuft deterministisch im Browser.'},
      ],
    },
  },

  pt: {
    navPlay: 'Jogar',
    navCaseBoard: 'Dossiê',
    navGuide: 'Como jogar',
    navFaq: 'FAQ',
    ctaNewCase: 'Novo caso',

    heroTitle: 'CacoPlayCue — Ladrão, Polícia e Álibis',
    heroSubtitle:
      'Jogo de dedução social para 3–6 jogadores. Revele papéis secretos em privado, compare álibis ambíguos no mapa SVG antes do fim do tempo e envie o desafio no WhatsApp.',

    challengeReceivedTitle: 'Desafio recebido',
    challengeBeatLabel: 'Enviado por {name} · Sequência {streak} · {points} pts',
    challengeDismiss: 'Fechar',

    languageLabel: 'Idioma',
    playersLabel: 'Jogadores',
    timerLabel: 'Cronômetro',
    soundOn: 'Som ativo',
    soundOff: 'Mudo',
    shuffleRoles: 'Sortear papéis',
    caseSelectLabel: 'Dossiê',
    caseNumberPrefix: 'Caso',

    streakCurrent: 'Sequência atual',
    streakBest: 'Melhor sequência',
    casesSolvedLabel: 'Casos resolvidos',
    totalPointsLabel: 'Pontos',
    activeCaseLabel: 'Caso ativo',

    caseBriefingTitle: 'Resumo público e pistas confirmadas',
    incidentTimeLabel: 'Horário do incidente',
    locationLabel: 'Local',
    stolenItemLabel: 'Item roubado',
    difficultyLabel: 'Complexidade',
    difficultyStandard: 'Padrão',
    difficultyTricky: 'Astuto',
    difficultyMaster: 'Mestre',
    publicCluesTitle: 'Evidências confirmadas',

    svgMapTitle: 'Planta da cena e conexões de álibi',
    svgMapHint: 'Clique em uma zona para ver câmeras, acessos e rotas.',
    svgLegendZone: 'Sala / Zona',
    svgLegendClue: 'Pista',
    svgLegendBlindspot: 'Ponto cego',
    svgLegendAlibi: 'Rota de álibi',
    svgSelectedZoneLabel: 'Inspeção da zona',

    rolesTitle: 'Cartas secretas (revelação privada)',
    rolesSubtitle:
      'Passe o aparelho para cada jogador. Abrir uma carta oculta as outras automaticamente.',
    hideAllRoles: 'Ocultar todas',
    revealPrivateRole: 'Ver papel e pista',
    hidePrivateRole: 'Ocultar carta',
    roleThief: 'Ladrão (Caco)',
    rolePolice: 'Polícia',
    roleCitizen: 'Cidadão',
    roleSecretHint: 'Nota privada',
    editPlayerPlaceholder: 'Nome do jogador',
    accuseButton: 'Acusar suspeito',
    accusePromptTitle: 'Confirmar acusação final',
    accuseConfirm: 'Confirmar acusação',
    accuseCancel: 'Continuar perguntas',

    roundClockTitle: 'Relógio da rodada e turnos',
    startTimer: 'Iniciar',
    pauseTimer: 'Pausar',
    resetTimer: 'Reiniciar',
    timeUpAlert: 'Tempo esgotado — faça a acusação final!',
    turnTrackerLabel: 'Turno ativo',
    nextTurnButton: 'Próximo turno',
    promptModeQuestion: 'Fazer pergunta',
    promptModeStatement: 'Fazer afirmação',
    suggestedPromptsTitle: 'Sugestões táticas para este caso',
    notesTitle: 'Bloco do investigador',
    notesPlaceholder: 'Anote horários, salas e contradições...',

    verdictCaughtTitle: 'Ladrão capturado — Caso resolvido!',
    verdictEscapedTitle: 'Acusação errada — O Ladrão escapou!',
    thiefWasLabel: 'O Ladrão era',
    policeWasLabel: 'Polícia chefe',
    alibiContradictionLabel: 'Contradição no álibi',
    pointsEarnedLabel: 'Pontos ganhos',
    nextCaseButton: 'Próximo caso',
    replayCaseButton: 'Rejogar este caso',

    shareWhatsApp: 'Enviar no WhatsApp',
    copyCaseLink: 'Copiar link do caso',
    linkCopied: 'Link copiado',
    exportJson: 'Exportar JSON',
    importJson: 'Importar JSON',
    importSuccess: 'Dados importados com sucesso.',
    importError: 'Arquivo JSON inválido.',
    printCase: 'Imprimir ficha',
    resetStats: 'Zerar placar',
    whatsappChallengeTemplate:
      'Desafio CacoPlayCue ({code}): Seu grupo consegue achar o Ladrão em {duration}s? Minha sequência: {streak} ({points} pts). Abra o caso exato: {url}',

    printSheetTitle: 'CacoPlayCue — Ficha imprimível do caso',
    printMatchLedger: 'Lista de suspeitos e votos',
    printNotesBox: 'Notas da linha do tempo',

    adLabel: 'Espaço publicitário',
    affiliateTitle: 'Acessórios para noites de mistério e dedução',
    affiliateSubtitle: 'Itens úteis para jogar em grupo com amigos e família.',
    affiliateItems: AFFILIATE_EN,

    editorialTitle: 'Como jogar melhor partidas de Ladrão, Polícia e Álibis',
    editorialSections: [
      {
        heading: '1. Não entregue todas as pistas no primeiro minuto',
        body: 'Compartilhe primeiro um local ou horário parcial para obrigar o Ladrão a inventar um trajeto incompatível com o mapa SVG.',
      },
      {
        heading: '2. Cruze horários e pontos cegos contra o relógio',
        body: 'Verifique sensores e portas trancadas no esquema CacoPoliceSvg para identificar álibis impossíveis.',
      },
      {
        heading: '3. Desafios diretos pelo WhatsApp sem servidor',
        body: 'O link codifica caso, semente e sequência diretamente na URL para jogar em qualquer navegador.',
      },
    ],
    faqTitle: 'Perguntas frequentes',
    transparentNotice:
      '100% client-side social deduction game with secret roles, alibi clues, and shareable case links. Case links are encoded in the URL without a backend, and all streaks and notes run locally in your browser without AI API calls.',

    footerCopy: 'CacoPlayCue · Jogo determinístico de dedução social',
    footerPrivacy: 'Pontuações e notas ficam salvas localmente no navegador.',

    seo: {
      title: 'CacoPlayCue — Jogo de Dedução Social: Ladrão, Polícia e Álibis',
      description:
        'Jogue CacoPlayCue com 3–6 jogadores: papéis secretos, mapa SVG, cronômetro, sequência de acertos e desafios por WhatsApp.',
      howToName: 'Como jogar CacoPlayCue',
      howToSteps: [
        {name: 'Configurar jogadores', text: 'Escolha 3 a 6 jogadores e duração de 60s, 90s ou 120s.'},
        {name: 'Ver papéis em segredo', text: 'Passe o celular para cada pessoa ver sua carta.'},
        {name: 'Questionar álibis', text: 'Compare respostas com o mapa SVG.'},
        {name: 'Acusar e desafiar', text: 'Aponte o Ladrão e envie o link pelo WhatsApp.'},
      ],
      faqs: [
        {q: 'Quantos jogadores podem jogar?', a: 'De 3 a 6 jogadores no mesmo aparelho ou por link.'},
        {q: 'Precisa de cadastro ou API de IA?', a: 'Não, funciona 100% no navegador sem backend.'},
      ],
    },
  },

  ar: {
    navPlay: 'العب',
    navCaseBoard: 'ملف القضية',
    navGuide: 'طريقة اللعب',
    navFaq: 'الأسئلة',
    ctaNewCase: 'قضية جديدة',

    heroTitle: 'CacoPlayCue — اللص والشرطة والأعذار',
    heroSubtitle:
      'لعبة استنتاج اجتماعي لـ 3 إلى 6 لاعبين. اكشف دورك السري بشكل خاص، قارن الأعذار الغامضة بمخطط مسرح الجريمة قبل انتهاء المؤقت، وشارك التحدي عبر واتساب.',

    challengeReceivedTitle: 'تحدي قضية وارد',
    challengeBeatLabel: 'من {name} · سلسلة {streak} · {points} نقطة',
    challengeDismiss: 'إغلاق',

    languageLabel: 'اللغة',
    playersLabel: 'اللاعبون',
    timerLabel: 'المؤقت',
    soundOn: 'الصوت مفعل',
    soundOff: 'صامت',
    shuffleRoles: 'توزيع الأدوار',
    caseSelectLabel: 'القضية',
    caseNumberPrefix: 'قضية',

    streakCurrent: 'السلسلة الحالية',
    streakBest: 'أفضل سلسلة',
    casesSolvedLabel: 'قضايا محلولة',
    totalPointsLabel: 'النقاط',
    activeCaseLabel: 'القضية النشطة',

    caseBriefingTitle: 'ملخص القضية والأدلة المؤكدة',
    incidentTimeLabel: 'وقت الحادثة',
    locationLabel: 'الموقع',
    stolenItemLabel: 'الغرض المسروق',
    difficultyLabel: 'الصعوبة',
    difficultyStandard: 'قياسي',
    difficultyTricky: 'مخادع',
    difficultyMaster: 'محترف',
    publicCluesTitle: 'أدلة مؤكدة',

    svgMapTitle: 'مخطط مسرح الجريمة ومسارات الأعذار',
    svgMapHint: 'انقر على أي منطقة لفحص الكاميرات والمداخل والمسارات.',
    svgLegendZone: 'غرفة / منطقة',
    svgLegendClue: 'دليل',
    svgLegendBlindspot: 'نقطة عمياء',
    svgLegendAlibi: 'مسار عذر',
    svgSelectedZoneLabel: 'فحص المنطقة',

    rolesTitle: 'بطاقات الأدوار السرية (كشف خاص)',
    rolesSubtitle: 'مرر الجهاز لكل لاعب. فتح بطاقة يخفي البطاقات الأخرى تلقائياً.',
    hideAllRoles: 'إخفاء الكل',
    revealPrivateRole: 'كشف الدور والدليل',
    hidePrivateRole: 'إخفاء البطاقة',
    roleThief: 'اللص',
    rolePolice: 'الشرطة',
    roleCitizen: 'المواطن',
    roleSecretHint: 'معلومة سرية',
    editPlayerPlaceholder: 'اسم اللاعب',
    accuseButton: 'اتهام المشتبه به',
    accusePromptTitle: 'تأكيد الاتهام النهائي',
    accuseConfirm: 'تأكيد الاتهام',
    accuseCancel: 'مواصلة الاستجواب',

    roundClockTitle: 'ساعة الجولة وأدوار الأسئلة',
    startTimer: 'بدء الوقت',
    pauseTimer: 'إيقاف مؤقت',
    resetTimer: 'إعادة ضبط',
    timeUpAlert: 'انتهى الوقت — قدّم الاتهام النهائي!',
    turnTrackerLabel: 'الدور الحالي',
    nextTurnButton: 'الدور التالي',
    promptModeQuestion: 'طرح سؤال',
    promptModeStatement: 'تقديم ادعاء',
    suggestedPromptsTitle: 'أسئلة وادعاءات مقترحة',
    notesTitle: 'دفتر المحقق',
    notesPlaceholder: 'سجل الأوقات المذكورة والتناقضات...',

    verdictCaughtTitle: 'تم القبض على اللص — حُلّت القضية!',
    verdictEscapedTitle: 'اتهام خاطئ — هرب اللص!',
    thiefWasLabel: 'كان اللص هو',
    policeWasLabel: 'ضابط الشرطة',
    alibiContradictionLabel: 'تناقض العذر',
    pointsEarnedLabel: 'النقاط المكتسبة',
    nextCaseButton: 'القضية التالية',
    replayCaseButton: 'إعادة توزيع نفس القضية',

    shareWhatsApp: 'إرسال عبر واتساب',
    copyCaseLink: 'نسخ رابط القضية',
    linkCopied: 'تم النسخ',
    exportJson: 'تصدير JSON',
    importJson: 'استيراد JSON',
    importSuccess: 'تم استيراد التقدم بنجاح.',
    importError: 'ملف JSON غير صالح.',
    printCase: 'طباعة الملف',
    resetStats: 'تصفير السلسلة',
    whatsappChallengeTemplate:
      'تحدي CacoPlayCue ({code}): هل يمكنكم كشف اللص خلال {duration} ثانية؟ سلسلتي: {streak} ({points} نقطة). افتح القضية: {url}',

    printSheetTitle: 'CacoPlayCue — ملف قضية قابل للطباعة',
    printMatchLedger: 'قائمة المشتبه بهم',
    printNotesBox: 'ملاحظات الجدول الزمني',

    adLabel: 'إعلان شريك',
    affiliateTitle: 'أدوات ألعاب الغموض والاستنتاج الجماعية',
    affiliateSubtitle: 'مستلزمات عملية لجلسات اللعب مع الأصدقاء والعائلة.',
    affiliateItems: AFFILIATE_EN,

    editorialTitle: 'كيف تتقن ألعاب الاستنتاج والأعذار',
    editorialSections: [
      {
        heading: '1. لا تكشف كل أدلتك مبكراً',
        body: 'شارك وقتاً أو موقعاً جزئياً أولاً لإجبار اللص على الالتزام بعذر يمكن فحصه على المخطط.',
      },
      {
        heading: '2. اكتشف التناقضات الزمنية تحت ضغط المؤقت',
        body: 'قارن المسارات المعلنة بالنقاط العمياء والحساسات في مخطط CacoPoliceSvg.',
      },
      {
        heading: '3. تحديات واتساب مشفرة في الرابط دون خادم',
        body: 'يحتوي الرابط على رقم القضية وبذرة التوزيع والنتيجة القياسية دون أي قاعدة بيانات.',
      },
    ],
    faqTitle: 'الأسئلة الشائعة',
    transparentNotice:
      '100% client-side social deduction game with secret roles, alibi clues, and shareable case links. Case links are encoded in the URL without a backend, and all streaks and notes run locally in your browser without AI API calls.',

    footerCopy: 'CacoPlayCue · لعبة استنتاج اجتماعي حتمية',
    footerPrivacy: 'تُحفظ النتائج والملاحظات محلياً في متصفحك فقط.',

    seo: {
      title: 'CacoPlayCue — لعبة استنتاج اجتماعي: اللص والشرطة والأعذار',
      description:
        'العب CacoPlayCue لـ 3–6 لاعبين بأدوار سرية، مخطط جريمة SVG، مؤقت، سلسلة انتصارات وتحديات واتساب بدون خادم.',
      howToName: 'كيفية لعب CacoPlayCue',
      howToSteps: [
        {name: 'إعداد اللاعبين', text: 'اختر 3 إلى 6 لاعبين ومدة الجولة.'},
        {name: 'كشف الأدوار سراً', text: 'مرر الجهاز ليرى كل لاعب بطاقته.'},
        {name: 'فحص الأعذار', text: 'قارن الإجابات مع مخطط مسرح الجريمة.'},
        {name: 'الاتهام والمشاركة', text: 'حدد اللص وشارك الرابط عبر واتساب.'},
      ],
      faqs: [
        {q: 'كم عدد اللاعبين؟', a: 'من 3 إلى 6 لاعبين على جهاز واحد أو عبر رابط تحدٍ.'},
        {q: 'هل تتطلب خادماً أو مفتاح ذكاء اصطناعي؟', a: 'لا، تعمل بالكامل في المتصفح مجاناً.'},
      ],
    },
  },

  hi: {
    navPlay: 'खेलें',
    navCaseBoard: 'केस फ़ाइल',
    navGuide: 'नियम',
    navFaq: 'FAQ',
    ctaNewCase: 'नया केस',

    heroTitle: 'CacoPlayCue — चोर, पुलिस और बहाने',
    heroSubtitle:
      '3–6 खिलाड़ियों के लिए सोशल डिडक्शन गेम। अपनी गुप्त भूमिका निजी रूप से देखें, टाइमर खत्म होने से पहले SVG नक्शे से बहानों की जांच करें और WhatsApp पर केस शेयर करें।',

    challengeReceivedTitle: 'नया केस चैलेंज',
    challengeBeatLabel: 'भेजने वाला: {name} · स्ट्रीक {streak} · {points} अंक',
    challengeDismiss: 'बंद करें',

    languageLabel: 'भाषा',
    playersLabel: 'खिलाड़ी',
    timerLabel: 'राउंड टाइमर',
    soundOn: 'ध्वनि चालू',
    soundOff: 'म्यूट',
    shuffleRoles: 'रोल बदलें',
    caseSelectLabel: 'केस चुनें',
    caseNumberPrefix: 'केस',

    streakCurrent: 'वर्तमान स्ट्रीक',
    streakBest: 'सर्वश्रेष्ठ स्ट्रीक',
    casesSolvedLabel: 'सुलझे केस',
    totalPointsLabel: 'अंक',
    activeCaseLabel: 'सक्रिय केस',

    caseBriefingTitle: 'सार्वजनिक केस विवरण और पक्के सुराग',
    incidentTimeLabel: 'घटना समय',
    locationLabel: 'स्थान',
    stolenItemLabel: 'चोरी हुई वस्तु',
    difficultyLabel: 'कठिनाई',
    difficultyStandard: 'सामान्य',
    difficultyTricky: 'पेंचीदा',
    difficultyMaster: 'मास्टर',
    publicCluesTitle: 'पुष्ट सुराग',

    svgMapTitle: 'क्राइम सीन नक्शा और बहाने के लिंक',
    svgMapHint: 'कैमरा और रास्ते देखने के लिए किसी भी ज़ोन पर क्लिक करें।',
    svgLegendZone: 'कक्ष / ज़ोन',
    svgLegendClue: 'सुराग बिंदु',
    svgLegendBlindspot: 'ब्लाइंड स्पॉट',
    svgLegendAlibi: 'बहाना मार्ग',
    svgSelectedZoneLabel: 'ज़ोन जांच',

    rolesTitle: 'गुप्त रोल कार्ड (निजी)',
    rolesSubtitle: 'डिवाइस हर खिलाड़ी को दें। एक कार्ड खोलने पर बाकी अपने आप छिप जाते हैं।',
    hideAllRoles: 'सभी छिपाएं',
    revealPrivateRole: 'रोल और सुराग देखें',
    hidePrivateRole: 'कार्ड छिपाएं',
    roleThief: 'चोर (Caco)',
    rolePolice: 'पुलिस',
    roleCitizen: 'नागरिक',
    roleSecretHint: 'निजी संकेत',
    editPlayerPlaceholder: 'खिलाड़ी का नाम',
    accuseButton: 'आरोप लगाएं',
    accusePromptTitle: 'अंतिम आरोप की पुष्टि करें',
    accuseConfirm: 'आरोप पक्का करें',
    accuseCancel: 'पूछताछ जारी रखें',

    roundClockTitle: 'टाइमर और पूछताछ की बारी',
    startTimer: 'शुरू करें',
    pauseTimer: 'रोकें',
    resetTimer: 'रीसेट',
    timeUpAlert: 'समय समाप्त — अंतिम आरोप लगाएं!',
    turnTrackerLabel: 'सक्रिय बारी',
    nextTurnButton: 'अगली बारी',
    promptModeQuestion: 'सवाल पूछें',
    promptModeStatement: 'दावा करें',
    suggestedPromptsTitle: 'इस केस के लिए सुझाव',
    notesTitle: 'जांच नोट्स',
    notesPlaceholder: 'समय और संदिग्ध बहानों को नोट करें...',

    verdictCaughtTitle: 'चोर पकड़ा गया — केस सुलझा!',
    verdictEscapedTitle: 'गलत आरोप — चोर भाग निकला!',
    thiefWasLabel: 'चोर था',
    policeWasLabel: 'मुख्य पुलिस',
    alibiContradictionLabel: 'बहाने में विरोधाभास',
    pointsEarnedLabel: 'मिले अंक',
    nextCaseButton: 'अगला केस',
    replayCaseButton: 'वही केस फिर खेलें',

    shareWhatsApp: 'WhatsApp पर भेजें',
    copyCaseLink: 'केस लिंक कॉपी करें',
    linkCopied: 'कॉपी हो गया',
    exportJson: 'JSON एक्सपोर्ट',
    importJson: 'JSON इम्पोर्ट',
    importSuccess: 'डेटा सफलतापूर्वक लोड हुआ।',
    importError: 'अमान्य JSON फ़ाइल।',
    printCase: 'केस प्रिंट करें',
    resetStats: 'स्ट्रीक रीसेट',
    whatsappChallengeTemplate:
      'CacoPlayCue चैलेंज ({code}): क्या आप {duration}s में चोर पकड़ सकते हैं? मेरी स्ट्रीक: {streak} ({points} अंक)। लिंक: {url}',

    printSheetTitle: 'CacoPlayCue — प्रिंट करने योग्य केस शीट',
    printMatchLedger: 'संदिग्ध सूची',
    printNotesBox: 'समयरेखा नोट्स',

    adLabel: 'प्रायोजित स्थान',
    affiliateTitle: 'पार्टी और जासूसी गेम्स के लिए उपयोगी सामान',
    affiliateSubtitle: 'दोस्तों और परिवार के साथ ऑफलाइन खेलने के लिए सुझाव।',
    affiliateItems: AFFILIATE_EN,

    editorialTitle: 'चोर, पुलिस और बहाने वाले गेम्स जीतने के टिप्स',
    editorialSections: [
      {
        heading: '1. शुरुआती दौर में सारे सुराग उजागर न करें',
        body: 'नागरिक और पुलिस पहले सीमित समय या कमरे की जानकारी दें ताकि चोर गलत समयरेखा में फंस जाए।',
      },
      {
        heading: '2. SVG नक्शे से समय का विरोधाभास पकड़ें',
        body: 'मोशन सेंसर और ब्लाइंड स्पॉट के साथ हर संदिग्ध के रास्ते का मिलान करें।',
      },
      {
        heading: '3. बिना सर्वर के WhatsApp पर सटीक केस भेजें',
        body: 'URL में केस ID और सीड सुरक्षित रहता है, जिससे कोई भी वही पहेली खेल सकता है।',
      },
    ],
    faqTitle: 'अक्सर पूछे जाने वाले सवाल',
    transparentNotice:
      '100% client-side social deduction game with secret roles, alibi clues, and shareable case links. Case links are encoded in the URL without a backend, and all streaks and notes run locally in your browser without AI API calls.',

    footerCopy: 'CacoPlayCue · ब्राउज़र आधारित सोशल डिडक्शन गेम',
    footerPrivacy: 'सभी स्कोर और नोट्स आपके ब्राउज़र में सुरक्षित रहते हैं।',

    seo: {
      title: 'CacoPlayCue — सोशल डिडक्शन गेम: चोर, पुलिस और बहाने',
      description:
        '3–6 खिलाड़ियों के लिए गुप्त भूमिका, SVG नक्शा, टाइमर, स्ट्रीक और WhatsApp चैलेंज वाला सोशल डिडक्शन गेम।',
      howToName: 'CacoPlayCue कैसे खेलें',
      howToSteps: [
        {name: 'खिलाड़ी और समय चुनें', text: '3–6 खिलाड़ी और 60s/90s/120s टाइमर सेट करें।'},
        {name: 'गुप्त कार्ड देखें', text: 'हर खिलाड़ी अपना रोल निजी रूप से देखे।'},
        {name: 'बहानों की जांच करें', text: 'SVG नक्शे पर समय और रास्ते मिलाएं।'},
        {name: 'आरोप लगाएं', text: 'चोर पकड़ें और WhatsApp लिंक शेयर करें।'},
      ],
      faqs: [
        {q: 'कितने खिलाड़ी खेल सकते हैं?', a: '3 से 6 खिलाड़ी।'},
        {q: 'क्या इसमें कोई API या बैकएंड लगता है?', a: 'नहीं, यह 100% ब्राउज़र में चलता है।'},
      ],
    },
  },

  ru: {
    navPlay: 'Играть',
    navCaseBoard: 'Дело',
    navGuide: 'Правила',
    navFaq: 'FAQ',
    ctaNewCase: 'Новое дело',

    heroTitle: 'CacoPlayCue — Вор, Полиция и Алиби',
    heroSubtitle:
      'Социальная дедукция для 3–6 игроков. Тайно проверяйте роли, сверяйте спорные алиби со схемой SVG до окончания таймера и делитесь делом в WhatsApp.',

    challengeReceivedTitle: 'Входящий вызов по делу',
    challengeBeatLabel: 'От: {name} · Серия {streak} · {points} очк.',
    challengeDismiss: 'Скрыть',

    languageLabel: 'Язык',
    playersLabel: 'Игроки',
    timerLabel: 'Таймер',
    soundOn: 'Звук вкл.',
    soundOff: 'Без звука',
    shuffleRoles: 'Перемешать роли',
    caseSelectLabel: 'Дело',
    caseNumberPrefix: 'Дело',

    streakCurrent: 'Текущая серия',
    streakBest: 'Лучшая серия',
    casesSolvedLabel: 'Раскрыто дел',
    totalPointsLabel: 'Очки',
    activeCaseLabel: 'Текущее дело',

    caseBriefingTitle: 'Сводка дела и подтверждённые улики',
    incidentTimeLabel: 'Время инцидента',
    locationLabel: 'Место',
    stolenItemLabel: 'Пропавший предмет',
    difficultyLabel: 'Сложность',
    difficultyStandard: 'Базовая',
    difficultyTricky: 'Сложная',
    difficultyMaster: 'Мастер',
    publicCluesTitle: 'Подтверждённые факты',

    svgMapTitle: 'Схема места и маршруты алиби',
    svgMapHint: 'Нажмите на любую зону, чтобы проверить камеры, входы и маршруты.',
    svgLegendZone: 'Зона',
    svgLegendClue: 'Улика',
    svgLegendBlindspot: 'Слепая зона',
    svgLegendAlibi: 'Маршрут алиби',
    svgSelectedZoneLabel: 'Проверка зоны',

    rolesTitle: 'Секретные карты ролей (приватно)',
    rolesSubtitle:
      'Передайте устройство игроку. Открытие одной карты автоматически скрывает остальные.',
    hideAllRoles: 'Скрыть все',
    revealPrivateRole: 'Показать роль и улику',
    hidePrivateRole: 'Скрыть карту',
    roleThief: 'Вор (Caco)',
    rolePolice: 'Полиция',
    roleCitizen: 'Горожанин',
    roleSecretHint: 'Секретная сводка',
    editPlayerPlaceholder: 'Имя игрока',
    accuseButton: 'Обвинить',
    accusePromptTitle: 'Подтвердить обвинение',
    accuseConfirm: 'Обвинить игрока',
    accuseCancel: 'Продолжить опрос',

    roundClockTitle: 'Таймер раунда и ходы допроса',
    startTimer: 'Старт',
    pauseTimer: 'Пауза',
    resetTimer: 'Сброс',
    timeUpAlert: 'Время вышло — вынесите обвинение!',
    turnTrackerLabel: 'Активный ход',
    nextTurnButton: 'Следующий ход',
    promptModeQuestion: 'Задать вопрос',
    promptModeStatement: 'Сделать заявление',
    suggestedPromptsTitle: 'Тактические подсказки для дела',
    notesTitle: 'Заметки следователя',
    notesPlaceholder: 'Записывайте названное время и несостыковки...',

    verdictCaughtTitle: 'Вор пойман — дело раскрыто!',
    verdictEscapedTitle: 'Ошибка — Вор скрылся!',
    thiefWasLabel: 'Вором был',
    policeWasLabel: 'Следователь полиции',
    alibiContradictionLabel: 'Противоречие в алиби',
    pointsEarnedLabel: 'Получено очков',
    nextCaseButton: 'Следующее дело',
    replayCaseButton: 'Переиграть это дело',

    shareWhatsApp: 'Отправить в WhatsApp',
    copyCaseLink: 'Копировать ссылку',
    linkCopied: 'Скопировано',
    exportJson: 'Экспорт JSON',
    importJson: 'Импорт JSON',
    importSuccess: 'Сохранение загружено.',
    importError: 'Неверный файл JSON.',
    printCase: 'Печать дела',
    resetStats: 'Сбросить серию',
    whatsappChallengeTemplate:
      'Вызов CacoPlayCue ({code}): Сможете поймать Вора за {duration}с? Моя серия: {streak} ({points} очк.). Открыть дело: {url}',

    printSheetTitle: 'CacoPlayCue — Печатное досье дела',
    printMatchLedger: 'Список подозреваемых',
    printNotesBox: 'Хронология заметок',

    adLabel: 'Рекламный блок',
    affiliateTitle: 'Настольные аксессуары для вечеров дедукции',
    affiliateSubtitle: 'Полезные вещи для офлайн-игр в компании друзей.',
    affiliateItems: AFFILIATE_EN,

    editorialTitle: 'Как побеждать в играх на дедукцию и проверку алиби',
    editorialSections: [
      {
        heading: '1. Не раскрывайте все улики в первом ходе',
        body: 'Назовите сначала только одну комнату или минуту, чтобы Вор был вынужден зафиксировать противоречивое алиби.',
      },
      {
        heading: '2. Сверяйте маршруты на схеме SVG под таймер',
        body: 'Сравнивайте время срабатывания датчиков и слепые зоны на плане CacoPoliceSvg.',
      },
      {
        heading: '3. Ссылки-вызовы в WhatsApp без сервера',
        body: 'Номер дела, seed расклада и ваш рекорд закодированы прямо в URL.',
      },
    ],
    faqTitle: 'Частые вопросы',
    transparentNotice:
      '100% client-side social deduction game with secret roles, alibi clues, and shareable case links. Case links are encoded in the URL without a backend, and all streaks and notes run locally in your browser without AI API calls.',

    footerCopy: 'CacoPlayCue · Детерминированная игра социальной дедукции',
    footerPrivacy: 'Очки и заметки хранятся локально в вашем браузере.',

    seo: {
      title: 'CacoPlayCue — Игра социальной дедукции: Вор, Полиция и Алиби',
      description:
        'Играйте в CacoPlayCue на 3–6 человек: тайные роли, схема SVG, таймер, серия побед и вызовы по ссылке WhatsApp.',
      howToName: 'Как играть в CacoPlayCue',
      howToSteps: [
        {name: 'Настройте партию', text: 'Выберите 3–6 игроков и таймер 60, 90 или 120 секунд.'},
        {name: 'Откройте роли тайно', text: 'Передайте экран каждому игроку.'},
        {name: 'Проверьте алиби', text: 'Сопоставьте ответы со схемой SVG.'},
        {name: 'Вынесите вердикт', text: 'Обвините Вора и отправьте ссылку в WhatsApp.'},
      ],
      faqs: [
        {q: 'Сколько человек может играть?', a: 'От 3 до 6 игроков.'},
        {q: 'Нужен ли сервер или ключ ИИ?', a: 'Нет, всё работает локально в браузере.'},
      ],
    },
  },

  zh: {
    navPlay: '开始游戏',
    navCaseBoard: '案件档案',
    navGuide: '玩法指南',
    navFaq: '常见问题',
    ctaNewCase: '新案件',

    heroTitle: 'CacoPlayCue — 盗贼、警察与不在场证明',
    heroSubtitle:
      '适合 3–6 人的聚会社交推理游戏。私密查看隐藏身份，在倒计时结束前对照 SVG 现场平面图核验矛盾证词，并通过 WhatsApp 分享同款挑战链接。',

    challengeReceivedTitle: '收到案件挑战',
    challengeBeatLabel: '来自 {name} · 连胜 {streak} · {points} 分',
    challengeDismiss: '关闭',

    languageLabel: '语言',
    playersLabel: '玩家人数',
    timerLabel: '回合计时',
    soundOn: '音效开启',
    soundOff: '静音',
    shuffleRoles: '重洗身份',
    caseSelectLabel: '选择案件',
    caseNumberPrefix: '案件',

    streakCurrent: '当前连胜',
    streakBest: '最高连胜',
    casesSolvedLabel: '已破案件',
    totalPointsLabel: '总积分',
    activeCaseLabel: '当前案件',

    caseBriefingTitle: '公开案情简报与确认线索',
    incidentTimeLabel: '案发时段',
    locationLabel: '案发地点',
    stolenItemLabel: '失窃物品',
    difficultyLabel: '难度',
    difficultyStandard: '标准',
    difficultyTricky: '烧脑',
    difficultyMaster: '大师',
    publicCluesTitle: '已确认证据',

    svgMapTitle: '现场 SVG 平面图与不在场证明连线',
    svgMapHint: '点击任意区域查看监控盲区、出入口与移动路线。',
    svgLegendZone: '房间 / 区域',
    svgLegendClue: '证据点',
    svgLegendBlindspot: '监控盲区',
    svgLegendAlibi: '证词路线',
    svgSelectedZoneLabel: '区域详情',

    rolesTitle: '秘密身份卡（私密翻看）',
    rolesSubtitle: '依次传递设备。打开一张身份卡时会自动隐藏其余卡牌。',
    hideAllRoles: '全部隐藏',
    revealPrivateRole: '查看身份与线索',
    hidePrivateRole: '隐藏卡牌',
    roleThief: '盗贼 (Caco)',
    rolePolice: '警察',
    roleCitizen: '市民',
    roleSecretHint: '私密情报',
    editPlayerPlaceholder: '玩家姓名',
    accuseButton: '指认嫌疑人',
    accusePromptTitle: '确认最终指认',
    accuseConfirm: '确认指认',
    accuseCancel: '继续质询',

    roundClockTitle: '回合倒计时与轮流质询',
    startTimer: '开始计时',
    pauseTimer: '暂停',
    resetTimer: '重置',
    timeUpAlert: '时间到 — 请立即做出最终指认！',
    turnTrackerLabel: '当前发言',
    nextTurnButton: '下一位',
    promptModeQuestion: '发起提问',
    promptModeStatement: '发表陈述',
    suggestedPromptsTitle: '本案推荐话术',
    notesTitle: '侦探笔记',
    notesPlaceholder: '记录各位玩家声称的时间、地点与矛盾之处...',

    verdictCaughtTitle: '成功抓获盗贼 — 案件告破！',
    verdictEscapedTitle: '指认失误 — 盗贼逃脱！',
    thiefWasLabel: '真正的盗贼是',
    policeWasLabel: '主查警察',
    alibiContradictionLabel: '不在场证明破绽',
    pointsEarnedLabel: '本局得分',
    nextCaseButton: '下一案件',
    replayCaseButton: '重玩本案',

    shareWhatsApp: '发送到 WhatsApp',
    copyCaseLink: '复制案件链接',
    linkCopied: '链接已复制',
    exportJson: '导出 JSON',
    importJson: '导入 JSON',
    importSuccess: '存档导入成功。',
    importError: 'JSON 文件格式无效。',
    printCase: '打印案件纸',
    resetStats: '重置战绩',
    whatsappChallengeTemplate:
      'CacoPlayCue 推理挑战 ({code})：你们能在 {duration} 秒内抓出盗贼吗？我的连胜：{streak}（{points} 分）。点击挑战同一案件：{url}',

    printSheetTitle: 'CacoPlayCue 可打印案件卷宗',
    printMatchLedger: '嫌疑人名单与投票记录',
    printNotesBox: '时间线推理笔记',

    adLabel: '合作推荐位',
    affiliateTitle: '聚会推理桌游与计时配件推荐',
    affiliateSubtitle: '提升线下好友与家庭聚会体验的实用工具。',
    affiliateItems: AFFILIATE_EN,

    editorialTitle: '如何玩转盗贼、警察与不在场证明推理游戏',
    editorialSections: [
      {
        heading: '1. 不要在首轮暴露全部私人线索',
        body: '先抛出一个房间或分钟节点，迫使盗贼在地图上编造无法自圆其说的动线。',
      },
      {
        heading: '2. 结合 SVG 现场图抓住时间矛盾',
        body: '利用传感器触发时间与监控盲区，在倒计时内锁定说谎者。',
      },
      {
        heading: '3. 无需后端的 WhatsApp 链接挑战',
        body: '案件编号、随机种子和连胜纪录全部编码在 URL 中，零服务器即可同步复现。',
      },
    ],
    faqTitle: '常见问题',
    transparentNotice:
      '100% client-side social deduction game with secret roles, alibi clues, and shareable case links. Case links are encoded in the URL without a backend, and all streaks and notes run locally in your browser without AI API calls.',

    footerCopy: 'CacoPlayCue · 本地确定性社交推理游戏',
    footerPrivacy: '所有连胜、名单与笔记仅保存在您的浏览器本地。',

    seo: {
      title: 'CacoPlayCue — 社交推理游戏：盗贼、警察与不在场证明',
      description:
        '3–6人本地与链接挑战社交推理游戏：秘密身份、SVG现场平面图、倒计时、推理连胜与 WhatsApp 分享。',
      howToName: '如何游玩 CacoPlayCue',
      howToSteps: [
        {name: '设置人数与计时', text: '选择 3–6 名玩家和 60/90/120 秒回合计时。'},
        {name: '私密查看身份', text: '传递设备查看各自的盗贼、警察或市民线索。'},
        {name: '核对 SVG 平面图', text: '在计时内轮流提问或陈述，寻找不在场证明破绽。'},
        {name: '指认并分享挑战', text: '指认盗贼累计连胜，通过 WhatsApp 发送同款挑战链接。'},
      ],
      faqs: [
        {q: '支持几人游玩？', a: '支持 3 至 6 人同屏轮流游玩或通过挑战链接比拼连胜。'},
        {q: '需要服务器或 AI 密钥吗？', a: '不需要，100% 在本地浏览器确定性运行。'},
      ],
    },
  },

  ja: {
    navPlay: 'プレイ',
    navCaseBoard: '事件ファイル',
    navGuide: '遊び方',
    navFaq: 'FAQ',
    ctaNewCase: '新しい事件',

    heroTitle: 'CacoPlayCue — 泥棒・警察・アリバイ推理',
    heroSubtitle:
      '3〜6人向けの正体隠匿・社会推理ゲーム。秘密の役職を個別確認し、制限時間内にSVG見取り図と曖昧なアリバイを照合して、WhatsAppで同じ事件リンクを共有できます。',

    challengeReceivedTitle: '事件チャレンジを受信',
    challengeBeatLabel: '送信者: {name} · 連勝 {streak} · {points} pts',
    challengeDismiss: '閉じる',

    languageLabel: '言語',
    playersLabel: '人数',
    timerLabel: '制限時間',
    soundOn: '効果音オン',
    soundOff: 'ミュート',
    shuffleRoles: '役職をシャッフル',
    caseSelectLabel: '事件選択',
    caseNumberPrefix: '事件',

    streakCurrent: '現在の連勝',
    streakBest: '最高連勝',
    casesSolvedLabel: '解決数',
    totalPointsLabel: 'スコア',
    activeCaseLabel: '進行中の事件',

    caseBriefingTitle: '公開ブリーフィングと確定証拠',
    incidentTimeLabel: '発生時間帯',
    locationLabel: '現場',
    stolenItemLabel: '盗難品',
    difficultyLabel: '難易度',
    difficultyStandard: '標準',
    difficultyTricky: '難問',
    difficultyMaster: '達人',
    publicCluesTitle: '確定している証拠',

    svgMapTitle: '現場SVG見取り図とアリバイルート',
    svgMapHint: '各エリアをクリックしてカメラ死角や移動経路を確認できます。',
    svgLegendZone: '部屋 / エリア',
    svgLegendClue: '証拠ピン',
    svgLegendBlindspot: '死角',
    svgLegendAlibi: '移動ルート',
    svgSelectedZoneLabel: 'エリア詳細',

    rolesTitle: '秘密の役職カード（個別表示）',
    rolesSubtitle: '端末を順番に回してください。1枚開くと他のカードは自動で伏せられます。',
    hideAllRoles: 'すべて伏せる',
    revealPrivateRole: '役職と手がかりを見る',
    hidePrivateRole: 'カードを伏せる',
    roleThief: '泥棒 (Caco)',
    rolePolice: '警察',
    roleCitizen: '市民',
    roleSecretHint: '秘密メモ',
    editPlayerPlaceholder: 'プレイヤー名',
    accuseButton: '容疑者を告発',
    accusePromptTitle: '最終告発の確認',
    accuseConfirm: '告発を確定',
    accuseCancel: '尋問を続ける',

    roundClockTitle: 'ラウンドタイマーと尋問ターン',
    startTimer: 'スタート',
    pauseTimer: '一時停止',
    resetTimer: 'リセット',
    timeUpAlert: '時間切れ — 最終告発を行ってください！',
    turnTrackerLabel: '現在の手番',
    nextTurnButton: '次の手番',
    promptModeQuestion: '質問する',
    promptModeStatement: '主張する',
    suggestedPromptsTitle: 'この事件の質問・主張ヒント',
    notesTitle: '捜査メモ',
    notesPlaceholder: '証言された時刻や場所の矛盾をメモ...',

    verdictCaughtTitle: '泥棒を逮捕 — 事件解決！',
    verdictEscapedTitle: '誤認逮捕 — 泥棒に逃げられた！',
    thiefWasLabel: '泥棒の正体',
    policeWasLabel: '担当警察',
    alibiContradictionLabel: 'アリバイの矛盾点',
    pointsEarnedLabel: '獲得ポイント',
    nextCaseButton: '次の事件へ',
    replayCaseButton: '同じ事件を再挑戦',

    shareWhatsApp: 'WhatsAppで送る',
    copyCaseLink: '事件リンクをコピー',
    linkCopied: 'コピー完了',
    exportJson: 'JSON書き出し',
    importJson: 'JSON読み込み',
    importSuccess: '保存データを読み込みました。',
    importError: '無効なJSONファイルです。',
    printCase: '事件シートを印刷',
    resetStats: '連勝リセット',
    whatsappChallengeTemplate:
      'CacoPlayCue 挑戦状 ({code}): {duration}秒以内に泥棒を見破れるか？現在の連勝: {streak} ({points} pts)。同じ事件を開く: {url}',

    printSheetTitle: 'CacoPlayCue 印刷用事件ファイル',
    printMatchLedger: '容疑者リストと投票欄',
    printNotesBox: '時系列メモ欄',

    adLabel: 'スポンサー枠',
    affiliateTitle: '推理ボードゲーム・パーティ用グッズ',
    affiliateSubtitle: '友人や家族とオフラインで遊ぶための便利なアイテム。',
    affiliateItems: AFFILIATE_EN,

    editorialTitle: '泥棒・警察・アリバイ推理ゲームの攻略ガイド',
    editorialSections: [
      {
        heading: '1. 序盤で手がかりを出し切らない',
        body: 'まずは場所と時刻の一部だけを共有し、泥棒に矛盾した経路を宣言させるのが定石です。',
      },
      {
        heading: '2. SVG見取り図で時間の矛盾を突く',
        body: 'センサー作動時刻と死角を照合し、制限時間内に嘘の証言を見抜きましょう。',
      },
      {
        heading: '3. サーバー不要のWhatsApp URLチャレンジ',
        body: '事件番号・シード値・連勝記録はURLに直接エンコードされるため、そのまま他グループへ挑戦状を送れます。',
      },
    ],
    faqTitle: 'よくある質問',
    transparentNotice:
      '100% client-side social deduction game with secret roles, alibi clues, and shareable case links. Case links are encoded in the URL without a backend, and all streaks and notes run locally in your browser without AI API calls.',

    footerCopy: 'CacoPlayCue · ブラウザ完結型・正体隠匿推理ゲーム',
    footerPrivacy: '連勝記録やメモはお使いのブラウザ内にのみ保存されます。',

    seo: {
      title: 'CacoPlayCue — 正体隠匿推理ゲーム：泥棒・警察・アリバイ',
      description:
        '3〜6人用のブラウザ完結型推理ゲーム。秘密の役職、SVG現場マップ、タイマー、連勝記録、WhatsApp共有リンクに対応。',
      howToName: 'CacoPlayCueの遊び方',
      howToSteps: [
        {name: '人数とタイマー設定', text: '3〜6人と60秒/90秒/120秒のタイマーを選びます。'},
        {name: '役職を個別確認', text: '順番にカードを開いて秘密の役職とヒントを確認します。'},
        {name: 'アリバイを検証', text: 'SVG現場図を見ながら質問と主張で矛盾を探ります。'},
        {name: '告発と共有', text: '泥棒を当てて連勝を伸ばし、WhatsAppで共有します。'},
      ],
      faqs: [
        {q: '何人で遊べますか？', a: '3人から6人まで遊べます。'},
        {q: 'サーバーやAI APIキーは必要ですか？', a: '不要です。ブラウザ上で100%ローカル動作します。'},
      ],
    },
  },
};
