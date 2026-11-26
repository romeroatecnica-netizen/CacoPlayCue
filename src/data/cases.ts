import type {LangCode} from '../config/seo';

export interface SvgZoneGeometry {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  blindSpot?: boolean;
  cameraLabel?: string;
}

export interface SvgCorridor {
  from: string;
  to: string;
  locked?: boolean;
  sensorTime?: string;
}

export interface SvgCluePin {
  id: string;
  zoneId: string;
  cx: number;
  cy: number;
  code: string;
}

export interface SvgAlibiArc {
  id: string;
  from: string;
  to: string;
  suspicious?: boolean;
}

export interface LocalizedZoneCopy {
  name: string;
  detail: string;
}

export interface LocalizedCaseCopy {
  title: string;
  location: string;
  stolenItem: string;
  zones: Record<string, LocalizedZoneCopy>;
  publicClues: [string, string, string];
  thiefBriefing: string;
  policeBriefing: string;
  citizenBriefings: [string, string, string, string];
  questions: [string, string, string];
  statements: [string, string, string];
  contradictionSummary: string;
}

export interface CaseBlueprint {
  id: string;
  code: string;
  difficulty: 'standard' | 'tricky' | 'master';
  incidentTime: string;
  zones: SvgZoneGeometry[];
  corridors: SvgCorridor[];
  cluePins: SvgCluePin[];
  alibiArcs: SvgAlibiArc[];
  copy: Record<LangCode, LocalizedCaseCopy>;
}

export const MYSTERY_CASES: CaseBlueprint[] = [
  {
    id: 'midnight-gallery',
    code: 'CPC-01',
    difficulty: 'standard',
    incidentTime: '22:10 – 22:18',
    zones: [
      {id: 'foyer', x: 24, y: 24, w: 150, h: 108, cameraLabel: 'CAM-A'},
      {id: 'gallery', x: 204, y: 24, w: 192, h: 108, cameraLabel: 'CAM-B'},
      {id: 'corridor', x: 24, y: 164, w: 150, h: 96, blindSpot: true},
      {id: 'vault', x: 204, y: 164, w: 192, h: 96, cameraLabel: 'SENSOR-V'},
      {id: 'courtyard', x: 426, y: 24, w: 130, h: 236, blindSpot: true},
    ],
    corridors: [
      {from: 'foyer', to: 'gallery', sensorTime: '22:11'},
      {from: 'foyer', to: 'corridor'},
      {from: 'corridor', to: 'vault', sensorTime: '22:15'},
      {from: 'gallery', to: 'courtyard', locked: true},
      {from: 'vault', to: 'courtyard'},
    ],
    cluePins: [
      {id: 'p1', zoneId: 'gallery', cx: 300, cy: 74, code: 'E1'},
      {id: 'p2', zoneId: 'corridor', cx: 98, cy: 212, code: 'E2'},
      {id: 'p3', zoneId: 'courtyard', cx: 492, cy: 175, code: 'E3'},
    ],
    alibiArcs: [
      {id: 'a1', from: 'foyer', to: 'gallery'},
      {id: 'a2', from: 'corridor', to: 'vault', suspicious: true},
    ],
    copy: {
      en: {
        title: 'The Midnight Gallery Heist',
        location: 'North Wing Art Museum',
        stolenItem: 'Sapphire Brooch',
        zones: {
          foyer: {name: 'Main Foyer', detail: 'CAM-A shows visitors leaving at 22:09.'},
          gallery: {name: 'East Gallery', detail: 'CAM-B froze for 4 minutes at 22:12.'},
          corridor: {name: 'Service Corridor', detail: 'Blind spot linking Foyer to Vault.'},
          vault: {name: 'Display Vault', detail: 'Door sensor tripped once at 22:15.'},
          courtyard: {name: 'Courtyard Gate', detail: 'Wet footprints found beside hedge.'},
        },
        publicClues: [
          'Vault door sensor tripped exactly once at 22:15.',
          'Gallery-to-Courtyard glass doors were deadbolted from inside.',
          'Muddy shoe prints lead from the Vault exit to the Courtyard.',
        ],
        thiefBriefing:
          'You are the Thief. Claim you stayed in the East Gallery admiring statues until 22:17, then walked straight out to the Courtyard.',
        policeBriefing:
          'You are Police. Verified log: the East Gallery-to-Courtyard door was deadbolted all night—anyone reaching the Courtyard after 22:15 had to cross the Vault.',
        citizenBriefings: [
          'Citizen: You left Main Foyer at 22:11 and saw someone slip into the Service Corridor.',
          'Citizen: You heard the Vault chime at 22:15 while checking coats near Main Foyer.',
          'Citizen: You waited by the Courtyard Gate at 22:16 and noticed mud near the Vault door.',
          'Citizen: You noticed CAM-B blinking offline inside East Gallery around 22:12.',
        ],
        questions: [
          'Which corridor did you use to reach the Courtyard?',
          'Where were you when the 22:15 Vault sensor sounded?',
          'Did you pass CAM-A in the Main Foyer after 22:10?',
        ],
        statements: [
          'The Gallery door to the Courtyard was deadbolted, so that route is impossible.',
          'Someone used the blind Service Corridor before 22:15.',
          'Mud prints start at the Vault, not the East Gallery.',
        ],
        contradictionSummary:
          'Claiming a direct walk from East Gallery to the Courtyard fails because that door was deadbolted—only the Vault route leads there.',
      },
      es: {
        title: 'El Robo de la Galería Nocturna',
        location: 'Museo del Ala Norte',
        stolenItem: 'Broche de Zafiro',
        zones: {
          foyer: {name: 'Vestíbulo', detail: 'CAM-A registra salidas a las 22:09.'},
          gallery: {name: 'Galería Este', detail: 'CAM-B se congeló 4 minutos a las 22:12.'},
          corridor: {name: 'Pasillo de Servicio', detail: 'Punto ciego entre Vestíbulo y Cámara.'},
          vault: {name: 'Cámara Vitrina', detail: 'El sensor de puerta saltó una vez a las 22:15.'},
          courtyard: {name: 'Patio Exterior', detail: 'Huellas húmedas junto al seto.'},
        },
        publicClues: [
          'El sensor de la Cámara Vitrina saltó una sola vez a las 22:15.',
          'La puerta entre Galería Este y Patio estuvo cerrada con cerrojo interior.',
          'Hay huellas de barro desde la salida de la Cámara hasta el Patio.',
        ],
        thiefBriefing:
          'Eres el Caco. Di que estuviste en la Galería Este hasta las 22:17 y saliste directo al Patio desde allí.',
        policeBriefing:
          'Eres Policía. Dato verificado: el acceso Galería Este–Patio estaba bloqueado por dentro; quien llegó al Patio tras las 22:15 cruzó la Cámara.',
        citizenBriefings: [
          'Ciudadano: Saliste del Vestíbulo a las 22:11 y viste a alguien entrar al Pasillo de Servicio.',
          'Ciudadano: Oíste el timbre de la Cámara a las 22:15 cerca del Vestíbulo.',
          'Ciudadano: Esperabas en el Patio a las 22:16 y viste barro junto a la puerta de la Cámara.',
          'Ciudadano: Viste parpadear CAM-B en la Galería Este hacia las 22:12.',
        ],
        questions: [
          '¿Qué pasillo usaste exactamente para salir al Patio?',
          '¿Dónde estabas cuando sonó el sensor de las 22:15?',
          '¿Pasaste frente a CAM-A en el Vestíbulo después de las 22:10?',
        ],
        statements: [
          'La puerta de la Galería al Patio tenía cerrojo: esa ruta es imposible.',
          'Alguien cruzó el Pasillo de Servicio sin cámaras antes de las 22:15.',
          'Las huellas de barro salen de la Cámara Vitrina, no de la Galería.',
        ],
        contradictionSummary:
          'Afirmar haber salido directo de la Galería Este al Patio es falso porque esa puerta estaba cerrada con cerrojo interior.',
      },
      fr: {
        title: 'Le Casse de la Galerie de Minuit',
        location: 'Musée Aile Nord',
        stolenItem: 'Broche Saphir',
        zones: {
          foyer: {name: 'Hall Principal', detail: 'CAM-A filme les sorties à 22:09.'},
          gallery: {name: 'Galerie Est', detail: 'CAM-B figée 4 min à 22:12.'},
          corridor: {name: 'Couloir de Service', detail: 'Angle mort vers la Chambre.'},
          vault: {name: 'Chambre Forte', detail: 'Capteur déclenché à 22:15.'},
          courtyard: {name: 'Cour Intérieure', detail: 'Traces de boue près de la haie.'},
        },
        publicClues: [
          'Le capteur de la Chambre Forte a sonné une fois à 22:15.',
          'La porte Galerie Est–Cour était verrouillée de l’intérieur.',
          'Des traces de boue relient la Chambre Forte à la Cour.',
        ],
        thiefBriefing:
          'Vous êtes le Voleur. Affirmez être resté en Galerie Est jusqu’à 22:17 avant de sortir directement dans la Cour.',
        policeBriefing:
          'Vous êtes la Police. Fait vérifié : la porte Galerie Est–Cour était condamnée. Passer dans la Cour après 22:15 obligeait à traverser la Chambre.',
        citizenBriefings: [
          'Citoyen : À 22:11 dans le Hall, vous avez vu quelqu’un filer dans le Couloir de Service.',
          'Citoyen : Vous avez entendu l’alarme de 22:15 depuis le Hall.',
          'Citoyen : Dans la Cour à 22:16, la boue venait de la sortie Chambre Forte.',
          'Citoyen : Vous avez vu CAM-B clignoter en Galerie Est vers 22:12.',
        ],
        questions: [
          'Par quelle porte êtes-vous entré dans la Cour ?',
          'Où étiez-vous au signal de 22:15 ?',
          'Avez-vous croisé CAM-A après 22:10 ?',
        ],
        statements: [
          'La porte Galerie–Cour était verrouillée : trajet impossible.',
          'Le Couloir de Service est un angle mort menant à la Chambre.',
          'Les traces de boue partent de la Chambre Forte.',
        ],
        contradictionSummary:
          'Dire être passé directement de la Galerie Est à la Cour contredit la porte condamnée.',
      },
      de: {
        title: 'Raub in der Mitternachtsgalerie',
        location: 'Nordflügel-Kunstmuseum',
        stolenItem: 'Saphirbrosche',
        zones: {
          foyer: {name: 'Foyer', detail: 'CAM-A zeigt Besucher um 22:09.'},
          gallery: {name: 'Ostgalerie', detail: 'CAM-B fiel um 22:12 für 4 Min. aus.'},
          corridor: {name: 'Dienstgang', detail: 'Toter Winkel zum Tresor.'},
          vault: {name: 'Tresorraum', detail: 'Türsensor meldete 22:15.'},
          courtyard: {name: 'Innenhof', detail: 'Schlammspuren an der Hecke.'},
        },
        publicClues: [
          'Der Tresorsensor löste genau einmal um 22:15 aus.',
          'Die Tür zwischen Ostgalerie und Innenhof war von innen verriegelt.',
          'Schlammspuren führen vom Tresorausgang in den Innenhof.',
        ],
        thiefBriefing:
          'Du bist der Dieb. Behaupte, du warst bis 22:17 in der Ostgalerie und bist direkt in den Innenhof gegangen.',
        policeBriefing:
          'Du bist Polizei. Fakt: Ostgalerie–Innenhof war verriegelt. Wer um 22:15 in den Hof kam, musste durch den Tresor.',
        citizenBriefings: [
          'Bürger: Um 22:11 sahst du im Foyer jemanden in den Dienstgang huschen.',
          'Bürger: Du hörtest das Tresorsignal um 22:15 nahe dem Foyer.',
          'Bürger: Um 22:16 am Hoftor sahst du Schlamm vor dem Tresorausgang.',
          'Bürger: Du sahst CAM-B in der Ostgalerie um 22:12 blinken.',
        ],
        questions: [
          'Durch welche Tür bist du in den Innenhof gelangt?',
          'Wo warst du beim Sensor-Alarm um 22:15?',
          'Bist du nach 22:10 an CAM-A vorbeigekommen?',
        ],
        statements: [
          'Die Tür Ostgalerie–Innenhof war verriegelt.',
          'Jemand nutzte den toten Winkel im Dienstgang.',
          'Die Schlammspuren beginnen eindeutig am Tresor.',
        ],
        contradictionSummary:
          'Ein direkter Weg von der Ostgalerie in den Innenhof war durch die verriegelte Tür unmöglich.',
      },
      pt: {
        title: 'O Assalto à Galeria da Meia-Noite',
        location: 'Museu Ala Norte',
        stolenItem: 'Broche de Safira',
        zones: {
          foyer: {name: 'Saguão', detail: 'CAM-A mostra saídas às 22:09.'},
          gallery: {name: 'Galeria Leste', detail: 'CAM-B travou por 4 min às 22:12.'},
          corridor: {name: 'Corredor de Serviço', detail: 'Ponto cego até o Cofre.'},
          vault: {name: 'Sala do Cofre', detail: 'Sensor disparou às 22:15.'},
          courtyard: {name: 'Pátio', detail: 'Pegadas úmidas perto da cerca.'},
        },
        publicClues: [
          'O sensor do Cofre disparou uma única vez às 22:15.',
          'A porta entre Galeria Leste e Pátio estava trancada por dentro.',
          'Pegadas de lama vão da saída do Cofre até o Pátio.',
        ],
        thiefBriefing:
          'Você é o Ladrão. Diga que ficou na Galeria Leste até 22:17 e saiu direto para o Pátio.',
        policeBriefing:
          'Você é Polícia. A porta Galeria–Pátio estava trancada: chegar ao Pátio após 22:15 exigia passar pelo Cofre.',
        citizenBriefings: [
          'Cidadão: Às 22:11 no Saguão, você viu alguém entrar no Corredor de Serviço.',
          'Cidadão: Você ouviu o sinal do Cofre às 22:15 perto do Saguão.',
          'Cidadão: No Pátio às 22:16, havia lama saindo da porta do Cofre.',
          'Cidadão: Você notou a CAM-B piscar na Galeria Leste por volta de 22:12.',
        ],
        questions: [
          'Por qual porta você saiu para o Pátio?',
          'Onde estava quando o sensor tocou às 22:15?',
          'Você passou pela CAM-A após as 22:10?',
        ],
        statements: [
          'A porta Galeria–Pátio estava trancada por dentro.',
          'Alguém usou o ponto cego do Corredor de Serviço.',
          'As pegadas de lama começam no Cofre.',
        ],
        contradictionSummary:
          'Afirmar saída direta da Galeria Leste ao Pátio contradiz a porta trancada por dentro.',
      },
      ar: {
        title: 'سرقة معرض منتصف الليل',
        location: 'متحف الجناح الشمالي',
        stolenItem: 'بروش الياقوت',
        zones: {
          foyer: {name: 'البهو الرئيسي', detail: 'كاميرا A سجلت الخروج 22:09.'},
          gallery: {name: 'المعرض الشرقي', detail: 'توقفت كاميرا B عند 22:12.'},
          corridor: {name: 'ممر الخدمة', detail: 'نقطة عمياء تؤدي إلى الخزنة.'},
          vault: {name: 'غرفة الخزنة', detail: 'انطلق حساس الباب عند 22:15.'},
          courtyard: {name: 'الفناء الخارجي', detail: 'آثار أقدام مبللة قرب السياج.'},
        },
        publicClues: [
          'انطلق حساس باب الخزنة مرة واحدة عند 22:15.',
          'باب المعرض الشرقي المؤدي للفناء كان مغلقاً من الداخل.',
          'آثار طين تمتد من مخرج الخزنة إلى الفناء.',
        ],
        thiefBriefing:
          'أنت اللص. ادّعِ أنك بقيت في المعرض الشرقي حتى 22:17 ثم خرجت مباشرة إلى الفناء.',
        policeBriefing:
          'أنت الشرطة. باب المعرض–الفناء كان مقفلاً طوال الليل؛ الوصول للفناء بعد 22:15 يتطلب عبور الخزنة.',
        citizenBriefings: [
          'مواطن: رأيت شخصاً يتسلل لممر الخدمة عند 22:11.',
          'مواطن: سمعت رنين الخزنة عند 22:15 قرب البهو.',
          'مواطن: رأيت طيناً عند مخرج الخزنة في الفناء عند 22:16.',
          'مواطن: لاحظت وميض كاميرا B في المعرض الشرقي عند 22:12.',
        ],
        questions: [
          'من أي باب دخلت إلى الفناء؟',
          'أين كنت عند رنين حساس 22:15؟',
          'هل مررت أمام كاميرا A بعد 22:10؟',
        ],
        statements: [
          'باب المعرض إلى الفناء كان مغلقاً؛ هذا المسار مستحيل.',
          'أحدهم عبر ممر الخدمة الأعمى قبل 22:15.',
          'آثار الطين تبدأ من الخزنة لا من المعرض.',
        ],
        contradictionSummary:
          'ادعاء الخروج المباشر من المعرض الشرقي إلى الفناء مستحيل لأن الباب كان مقفلاً.',
      },
      hi: {
        title: 'मिडनाइट गैलरी चोरी',
        location: 'नॉर्थ विंग आर्ट म्यूज़ियम',
        stolenItem: 'नीलम ब्रोच',
        zones: {
          foyer: {name: 'मुख्य फ़ोयर', detail: 'CAM-A ने 22:09 पर लोग दिखाए।'},
          gallery: {name: 'ईस्ट गैलरी', detail: 'CAM-B 22:12 पर 4 मिनट रुकी।'},
          corridor: {name: 'सर्विस कॉरिडोर', detail: 'वॉल्ट तक ब्लाइंड स्पॉट।'},
          vault: {name: 'डिस्प्ले वॉल्ट', detail: '22:15 पर डोर सेंसर बजा।'},
          courtyard: {name: 'कोर्टयार्ड गेट', detail: 'झाड़ी के पास गीले पदचिह्न।'},
        },
        publicClues: [
          'वॉल्ट दरवाजे का सेंसर 22:15 पर ठीक एक बार बजा।',
          'ईस्ट गैलरी से कोर्टयार्ड का दरवाजा अंदर से बंद था।',
          'कीचड़ के निशान वॉल्ट से कोर्टयार्ड तक जाते हैं।',
        ],
        thiefBriefing:
          'आप चोर हैं। दावा करें कि आप 22:17 तक ईस्ट गैलरी में थे और सीधे कोर्टयार्ड निकल गए।',
        policeBriefing:
          'आप पुलिस हैं। गैलरी–कोर्टयार्ड दरवाजा बंद था—22:15 के बाद कोर्टयार्ड जाने का रास्ता वॉल्ट से था।',
        citizenBriefings: [
          'नागरिक: 22:11 पर फ़ोयर में किसी को सर्विस कॉरिडोर में जाते देखा।',
          'नागरिक: 22:15 पर फ़ोयर के पास वॉल्ट की घंटी सुनी।',
          'नागरिक: 22:16 पर कोर्टयार्ड में वॉल्ट के पास कीचड़ देखा।',
          'नागरिक: 22:12 पर ईस्ट गैलरी में CAM-B बंद होती देखी।',
        ],
        questions: [
          'आप कोर्टयार्ड किस रास्ते से पहुंचे?',
          '22:15 का सेंसर बजने पर आप कहां थे?',
          'क्या आप 22:10 के बाद CAM-A के सामने से गुजरे?',
        ],
        statements: [
          'गैलरी से कोर्टयार्ड का दरवाजा अंदर से बंद था।',
          'किसी ने 22:15 से पहले ब्लाइंड सर्विस कॉरिडोर इस्तेमाल किया।',
          'कीचड़ के निशान वॉल्ट से शुरू होते हैं।',
        ],
        contradictionSummary:
          'ईस्ट गैलरी से सीधे कोर्टयार्ड जाने का दावा गलत है क्योंकि वह दरवाजा बंद था।',
      },
      ru: {
        title: 'Ограбление полуночной галереи',
        location: 'Северное крыло музея',
        stolenItem: 'Сапфировая брошь',
        zones: {
          foyer: {name: 'Фойе', detail: 'CAM-A фиксирует выход в 22:09.'},
          gallery: {name: 'Восточная галерея', detail: 'CAM-B зависла в 22:12.'},
          corridor: {name: 'Служебный коридор', detail: 'Слепая зона к хранилищу.'},
          vault: {name: 'Хранилище', detail: 'Датчик двери сработал в 22:15.'},
          courtyard: {name: 'Внутренний двор', detail: 'Мокрые следы у живой изгороди.'},
        },
        publicClues: [
          'Датчик двери хранилища сработал ровно один раз в 22:15.',
          'Дверь из Восточной галереи во двор была заперта изнутри.',
          'Грязные следы ведут от выхода хранилища во двор.',
        ],
        thiefBriefing:
          'Вы Вор. Утверждайте, что до 22:17 были в Восточной галерее и вышли прямо во двор.',
        policeBriefing:
          'Вы Полиция. Дверь Галерея–Двор была заперта. Попасть во двор после 22:15 можно было только через Хранилище.',
        citizenBriefings: [
          'Горожанин: В 22:11 в фойе вы видели, как кто-то прошмыгнул в служебный коридор.',
          'Горожанин: Вы слышали сигнал хранилища в 22:15 у фойе.',
          'Горожанин: В 22:16 во дворе вы заметили грязь у выхода хранилища.',
          'Горожанин: Вы видели мигание CAM-B в галерее около 22:12.',
        ],
        questions: [
          'Через какую дверь вы вышли во двор?',
          'Где вы были, когда в 22:15 сработал датчик?',
          'Вы проходили мимо CAM-A после 22:10?',
        ],
        statements: [
          'Дверь из галереи во двор была заперта на засов.',
          'Кто-то прошёл через слепой служебный коридор до 22:15.',
          'Следы грязи начинаются у хранилища.',
        ],
        contradictionSummary:
          'Прямой выход из Восточной галереи во двор невозможен — дверь была заперта изнутри.',
      },
      zh: {
        title: '午夜画廊失窃案',
        location: '北区艺术博物馆',
        stolenItem: '蓝宝石胸针',
        zones: {
          foyer: {name: '主大厅', detail: 'CAM-A 显示 22:09 访客离开。'},
          gallery: {name: '东画廊', detail: 'CAM-B 在 22:12 卡顿 4 分钟。'},
          corridor: {name: '内部通道', detail: '通往展柜室的监控盲区。'},
          vault: {name: '展柜室', detail: '门禁传感器在 22:15 触发一次。'},
          courtyard: {name: '庭院门', detail: '树篱旁有湿泥脚印。'},
        },
        publicClues: [
          '展柜室门禁在 22:15 仅触发过一次。',
          '东画廊通往庭院的玻璃门整晚从内部反锁。',
          '泥脚印从展柜室出口一直延伸到庭院。',
        ],
        thiefBriefing:
          '你是盗贼。声称自己一直在东画廊欣赏雕塑直到 22:17，然后直接走出庭院。',
        policeBriefing:
          '你是警察。核实记录：东画廊到庭院的门已反锁，22:15 后进入庭院必须经过展柜室。',
        citizenBriefings: [
          '市民：22:11 在主大厅看到有人溜进内部通道。',
          '市民：22:15 在大厅附近听到展柜室门禁响声。',
          '市民：22:16 在庭院发现展柜室门口有泥印。',
          '市民：22:12 注意到东画廊 CAM-B 闪烁离线。',
        ],
        questions: [
          '你是从哪条通道走到庭院的？',
          '22:15 展柜室警报响起时你在哪里？',
          '22:10 之后你是否经过主大厅 CAM-A？',
        ],
        statements: [
          '东画廊通往庭院的门是反锁的，那条路线行不通。',
          '有人在 22:15 前走了没有监控的内部通道。',
          '泥脚印是从展柜室而不是东画廊开始的。',
        ],
        contradictionSummary:
          '声称从东画廊直接去庭院与反锁门记录矛盾，只有展柜室能通往庭院。',
      },
      ja: {
        title: '深夜ギャラリー宝石盗難事件',
        location: '北棟美術館',
        stolenItem: 'サファイアのブローチ',
        zones: {
          foyer: {name: 'メインロビー', detail: 'CAM-A が 22:09 の退出を記録。'},
          gallery: {name: '東ギャラリー', detail: 'CAM-B が 22:12 に 4 分間停止。'},
          corridor: {name: '業務用通路', detail: '展示室へ続くカメラの死角。'},
          vault: {name: '特別展示室', detail: '22:15 に扉センサーが 1 回反応。'},
          courtyard: {name: '中庭ゲート', detail: '生け垣の横に濡れた足跡。'},
        },
        publicClues: [
          '特別展示室のセンサーは 22:15 に一度だけ作動した。',
          '東ギャラリーから中庭への扉は内側から施錠されていた。',
          '泥の足跡は特別展示室の出口から中庭へ続いている。',
        ],
        thiefBriefing:
          'あなたは泥棒です。22:17 まで東ギャラリーにいて、そのまま中庭へ出たと主張してください。',
        policeBriefing:
          'あなたは警察です。確認済み記録：東ギャラリー〜中庭の扉は施錠されており、22:15 以降に中庭へ出るには展示室を通るしかありません。',
        citizenBriefings: [
          '市民：22:11 にロビーから業務用通路へ入る人影を見た。',
          '市民：22:15 にロビー付近で展示室のセンサー音を聞いた。',
          '市民：22:16 に中庭で展示室出口側の泥跡を見つけた。',
          '市民：22:12 ごろ東ギャラリーの CAM-B が点滅していた。',
        ],
        questions: [
          '中庭へはどの通路を通って移動しましたか？',
          '22:15 のセンサー作動時はどこにいましたか？',
          '22:10 以降にロビーの CAM-A の前を通りましたか？',
        ],
        statements: [
          '東ギャラリーから中庭への扉は施錠されており通行不可能です。',
          '22:15 前に死角の業務用通路を使った人物がいます。',
          '泥の足跡は東ギャラリーではなく展示室から始まっています。',
        ],
        contradictionSummary:
          '東ギャラリーから直接中庭へ出たという主張は、施錠された扉と矛盾しています。',
      },
    },
  },
  {
    id: 'vault-4b-station',
    code: 'CPC-02',
    difficulty: 'standard',
    incidentTime: '19:40 – 19:50',
    zones: [
      {id: 'platform', x: 24, y: 24, w: 165, h: 108, cameraLabel: 'GATE-1'},
      {id: 'lockers', x: 218, y: 24, w: 165, h: 108, blindSpot: true},
      {id: 'office', x: 412, y: 24, w: 144, h: 108, cameraLabel: 'DESK-CAM'},
      {id: 'tunnel', x: 24, y: 164, w: 256, h: 96, blindSpot: true},
      {id: 'loading', x: 310, y: 164, w: 246, h: 96, cameraLabel: 'DOCK-4'},
    ],
    corridors: [
      {from: 'platform', to: 'lockers', sensorTime: '19:42'},
      {from: 'lockers', to: 'office'},
      {from: 'platform', to: 'tunnel', locked: true},
      {from: 'lockers', to: 'tunnel', sensorTime: '19:46'},
      {from: 'tunnel', to: 'loading'},
    ],
    cluePins: [
      {id: 'p1', zoneId: 'lockers', cx: 300, cy: 76, code: 'E1'},
      {id: 'p2', zoneId: 'tunnel', cx: 152, cy: 212, code: 'E2'},
      {id: 'p3', zoneId: 'loading', cx: 432, cy: 212, code: 'E3'},
    ],
    alibiArcs: [
      {id: 'a1', from: 'platform', to: 'tunnel', suspicious: true},
      {id: 'a2', from: 'lockers', to: 'office'},
    ],
    copy: {
      en: {
        title: 'Locker 4B at Central Station',
        location: 'Central Rail Terminal',
        stolenItem: 'Diplomatic Courier Satchel',
        zones: {
          platform: {name: 'Platform 2', detail: 'Express train arrived at 19:41.'},
          lockers: {name: 'Locker Bank 4B', detail: 'Blind alcove; latch forced at 19:45.'},
          office: {name: 'Station Office', detail: 'Clerk signed parcels at 19:44.'},
          tunnel: {name: 'Freight Tunnel', detail: 'Motion light triggered at 19:46.'},
          loading: {name: 'Loading Dock', detail: 'DOCK-4 saw a dark coat exit at 19:48.'},
        },
        publicClues: [
          'The Platform-to-Tunnel service shutter was padlocked during rush hour.',
          'Locker 4B was pried open at 19:45; Freight Tunnel light triggered at 19:46.',
          'Loading Dock camera captured someone exiting at 19:48.',
        ],
        thiefBriefing:
          'You are the Thief. Claim you stepped straight from Platform 2 into the Freight Tunnel at 19:43 to catch a taxi at the Loading Dock.',
        policeBriefing:
          'You are Police. Verified log: Platform 2 to Freight Tunnel shutter was padlocked—the only open entry into the Tunnel was via Locker Bank 4B.',
        citizenBriefings: [
          'Citizen: You bought coffee near Station Office at 19:44.',
          'Citizen: You heard metal scraping in Locker Bank 4B at 19:45.',
          'Citizen: You saw the Freight Tunnel light snap on at 19:46.',
          'Citizen: You spotted the padlocked Platform shutter at 19:42.',
        ],
        questions: [
          'How did you enter the Freight Tunnel if the Platform shutter was locked?',
          'Did you pass Locker Bank 4B around 19:45?',
          'Why did DOCK-4 record an exit at 19:48?',
        ],
        statements: [
          'Platform 2 had no open path to the Freight Tunnel.',
          'Only Locker 4B connects directly to the open Tunnel door.',
          'The 19:46 Tunnel light matches the 19:45 Locker break-in.',
        ],
        contradictionSummary:
          'Claiming to walk directly from Platform 2 into the Freight Tunnel fails because that shutter was padlocked.',
      },
      es: {
        title: 'Taquilla 4B en Estación Central',
        location: 'Terminal Ferroviaria Central',
        stolenItem: 'Maletín Diplomático',
        zones: {
          platform: {name: 'Andén 2', detail: 'Tren expreso llegó a las 19:41.'},
          lockers: {name: 'Taquillas 4B', detail: 'Zona ciega; cerradura forzada a las 19:45.'},
          office: {name: 'Oficina de Estación', detail: 'El encargado selló paquetes a las 19:44.'},
          tunnel: {name: 'Túnel de Carga', detail: 'Luz de movimiento encendida a las 19:46.'},
          loading: {name: 'Muelle de Carga', detail: 'DOCK-4 grabó una salida a las 19:48.'},
        },
        publicClues: [
          'La persiana metálica entre Andén 2 y Túnel estuvo cerrada con candado.',
          'La taquilla 4B fue forzada a las 19:45; la luz del Túnel saltó a las 19:46.',
          'La cámara del Muelle registró a alguien saliendo a las 19:48.',
        ],
        thiefBriefing:
          'Eres el Caco. Di que bajaste del Andén 2 directo al Túnel de Carga a las 19:43 para salir por el Muelle.',
        policeBriefing:
          'Eres Policía. Dato verificado: el paso Andén 2–Túnel tenía candado; solo se podía entrar al Túnel pasando por Taquillas 4B.',
        citizenBriefings: [
          'Ciudadano: Comprabas café junto a la Oficina a las 19:44.',
          'Ciudadano: Oíste un chasquido metálico en Taquillas 4B a las 19:45.',
          'Ciudadano: Viste encenderse la luz del Túnel a las 19:46.',
          'Ciudadano: Comprobaste el candado de la persiana del Andén a las 19:42.',
        ],
        questions: [
          '¿Cómo entraste al Túnel si la persiana del Andén tenía candado?',
          '¿Estuviste cerca de Taquillas 4B sobre las 19:45?',
          '¿Quién salió por DOCK-4 a las 19:48?',
        ],
        statements: [
          'No había paso directo desde el Andén 2 hacia el Túnel.',
          'Solo Taquillas 4B conectaba con la entrada abierta al Túnel.',
          'El horario 19:45–19:46 une Taquillas con el Túnel.',
        ],
        contradictionSummary:
          'Entrar al Túnel directo desde el Andén 2 es imposible porque esa persiana tenía candado.',
      },
      fr: {
        title: 'Casier 4B à la Gare Centrale',
        location: 'Gare Centrale',
        stolenItem: 'Sacoche Diplomatique',
        zones: {
          platform: {name: 'Quai 2', detail: 'Train arrivé à 19:41.'},
          lockers: {name: 'Consignes 4B', detail: 'Angle mort; forcé à 19:45.'},
          office: {name: 'Bureau Gare', detail: 'Colis signés à 19:44.'},
          tunnel: {name: 'Tunnel Fret', detail: 'Lumière détectée à 19:46.'},
          loading: {name: 'Quai de Livraison', detail: 'DOCK-4 filme une sortie à 19:48.'},
        },
        publicClues: [
          'Le rideau Quai 2–Tunnel était cadenassé.',
          'Le casier 4B a été forcé à 19:45 ; lumière du Tunnel à 19:46.',
          'DOCK-4 a filmé une sortie à 19:48.',
        ],
        thiefBriefing:
          'Vous êtes le Voleur. Dites être passé du Quai 2 au Tunnel Fret à 19:43.',
        policeBriefing:
          'Police : le rideau Quai 2–Tunnel était cadenassé. L’accès passait par les Consignes 4B.',
        citizenBriefings: [
          'Citoyen : Vous étiez au Bureau à 19:44.',
          'Citoyen : Bruit métallique aux Consignes 4B à 19:45.',
          'Citoyen : Lumière du Tunnel allumée à 19:46.',
          'Citoyen : Vous avez vu le cadenas sur le rideau du Quai 2.',
        ],
        questions: [
          'Comment avez-vous rejoint le Tunnel Fret ?',
          'Étiez-vous près des Consignes à 19:45 ?',
          'Où étiez-vous à 19:48 ?',
        ],
        statements: [
          'Le passage direct Quai 2–Tunnel était cadenassé.',
          'Seul le secteur Consignes 4B menait au Tunnel.',
          '19:45 puis 19:46 prouvent le trajet Consignes–Tunnel.',
        ],
        contradictionSummary:
          'Passer directement du Quai 2 au Tunnel est impossible à cause du cadenas.',
      },
      de: {
        title: 'Schließfach 4B am Hauptbahnhof',
        location: 'Hauptbahnhof',
        stolenItem: 'Kurier-Aktentasche',
        zones: {
          platform: {name: 'Gleis 2', detail: 'Expresszug um 19:41.'},
          lockers: {name: 'Schließfächer 4B', detail: 'Aufgebrochen um 19:45.'},
          office: {name: 'Stationsbüro', detail: 'Pakete um 19:44 quittiert.'},
          tunnel: {name: 'Frachttunnel', detail: 'Bewegungslicht um 19:46.'},
          loading: {name: 'Laderampe', detail: 'DOCK-4 filmte Ausgang um 19:48.'},
        },
        publicClues: [
          'Das Rolltor zwischen Gleis 2 und Frachttunnel war mit Vorhängeschloss gesichert.',
          'Fach 4B wurde um 19:45 aufgebrochen; Tunnellicht ging um 19:46 an.',
          'DOCK-4 zeigte um 19:48 eine Person.',
        ],
        thiefBriefing:
          'Du bist der Dieb. Behaupte, du gingst um 19:43 direkt von Gleis 2 in den Frachttunnel.',
        policeBriefing:
          'Polizei: Gleis 2–Tunnel war verschlossen; Zugang war nur über Schließfächer 4B möglich.',
        citizenBriefings: [
          'Bürger: Um 19:44 warst du am Stationsbüro.',
          'Bürger: Um 19:45 hörtest du Metallgeräusche bei Fach 4B.',
          'Bürger: Um 19:46 sprang das Licht im Frachttunnel an.',
          'Bürger: Um 19:42 sahst du das Vorhängeschloss am Gleis-Rolltor.',
        ],
        questions: [
          'Wie bist du in den Frachttunnel gekommen?',
          'Warst du um 19:45 bei Schließfach 4B?',
          'Wer verließ um 19:48 DOCK-4?',
        ],
        statements: [
          'Das Rolltor an Gleis 2 war verschlossen.',
          'Der Weg führte zwingend über Schließfach 4B.',
          '19:45 und 19:46 passen exakt zusammen.',
        ],
        contradictionSummary:
          'Der direkte Weg von Gleis 2 in den Frachttunnel war durch das Vorhängeschloss versperrt.',
      },
      pt: {
        title: 'Armário 4B na Estação Central',
        location: 'Terminal Ferroviário Central',
        stolenItem: 'Pasta Diplomática',
        zones: {
          platform: {name: 'Plataforma 2', detail: 'Trem chegou às 19:41.'},
          lockers: {name: 'Armários 4B', detail: 'Arrombado às 19:45.'},
          office: {name: 'Escritório', detail: 'Recibos assinados às 19:44.'},
          tunnel: {name: 'Túnel de Carga', detail: 'Luz acionada às 19:46.'},
          loading: {name: 'Doca de Carga', detail: 'DOCK-4 registrou saída às 19:48.'},
        },
        publicClues: [
          'A grade entre Plataforma 2 e Túnel estava trancada com cadeado.',
          'O Armário 4B foi forçado às 19:45; luz do Túnel acendeu às 19:46.',
          'DOCK-4 filmou alguém saindo às 19:48.',
        ],
        thiefBriefing:
          'Você é o Ladrão. Diga que foi direto da Plataforma 2 para o Túnel às 19:43.',
        policeBriefing:
          'Polícia: a grade Plataforma–Túnel tinha cadeado; só os Armários 4B davam acesso ao Túnel.',
        citizenBriefings: [
          'Cidadão: Você estava perto do Escritório às 19:44.',
          'Cidadão: Ouviu barulho metálico nos Armários 4B às 19:45.',
          'Cidadão: Viu a luz do Túnel acender às 19:46.',
          'Cidadão: Viu o cadeado na grade da Plataforma às 19:42.',
        ],
        questions: [
          'Como entrou no Túnel se a grade tinha cadeado?',
          'Passou pelos Armários 4B às 19:45?',
          'Quem saiu pela Doca às 19:48?',
        ],
        statements: [
          'Não havia passagem direta da Plataforma 2 ao Túnel.',
          'O único acesso aberto ao Túnel vinha dos Armários 4B.',
          '19:45 e 19:46 ligam os Armários ao Túnel.',
        ],
        contradictionSummary:
          'Passar direto da Plataforma 2 ao Túnel é falso devido ao cadeado na grade.',
      },
      ar: {
        title: 'الخزانة 4B في المحطة المركزية',
        location: 'محطة القطار المركزية',
        stolenItem: 'الحقيبة الدبلوماسية',
        zones: {
          platform: {name: 'الرصيف 2', detail: 'وصل القطار السريع 19:41.'},
          lockers: {name: 'خزائن 4B', detail: 'كُسر القفل عند 19:45.'},
          office: {name: 'مكتب المحطة', detail: 'توقيع طرود عند 19:44.'},
          tunnel: {name: 'نفق الشحن', detail: 'أضاء الحساس عند 19:46.'},
          loading: {name: 'رصيف التحميل', detail: 'سجلت الكاميرا خروجاً 19:48.'},
        },
        publicClues: [
          'بوابة الرصيف 2 المؤدية للنفق كانت مقفلة بقفل حديدي.',
          'فُتحت الخزانة 4B عنوة عند 19:45 وأضاء النفق 19:46.',
          'رصدت كاميرا التحميل خروج شخص عند 19:48.',
        ],
        thiefBriefing:
          'أنت اللص. ادّعِ أنك عبرت مباشرة من الرصيف 2 إلى نفق الشحن عند 19:43.',
        policeBriefing:
          'أنت الشرطة. بوابة الرصيف 2 مقفلة؛ الدخول للنفق كان فقط عبر خزائن 4B.',
        citizenBriefings: [
          'مواطن: كنت قرب مكتب المحطة عند 19:44.',
          'مواطن: سمعت صوت كسر معدن في خزائن 4B عند 19:45.',
          'مواطن: رأيت ضوء نفق الشحن يشتعل عند 19:46.',
          'مواطن: لاحظت القفل على بوابة الرصيف عند 19:42.',
        ],
        questions: [
          'كيف دخلت النفق وبوابة الرصيف مقفلة؟',
          'هل مررت بخزائن 4B عند 19:45؟',
          'من خرج من رصيف التحميل 19:48؟',
        ],
        statements: [
          'الطريق المباشر من الرصيف 2 للنفق كان مقفلاً.',
          'خزائن 4B هي المدخل المفتوح الوحيد للنفق.',
          'توقيت 19:45 و19:46 يربط الخزانة بالنفق.',
        ],
        contradictionSummary:
          'العبور المباشر من الرصيف 2 إلى النفق مستحيل بسبب القفل الحديدي.',
      },
      hi: {
        title: 'सेंट्रल स्टेशन लॉकर 4B',
        location: 'सेंट्रल रेल टर्मिनल',
        stolenItem: 'राजनयिक बैग',
        zones: {
          platform: {name: 'प्लेटफ़ॉर्म 2', detail: 'एक्सप्रेस ट्रेन 19:41 पर आई।'},
          lockers: {name: 'लॉकर 4B', detail: '19:45 पर ताला तोड़ा गया।'},
          office: {name: 'स्टेशन ऑफ़िस', detail: '19:44 पर पार्सल साइन हुए।'},
          tunnel: {name: 'फ़्रेट टनल', detail: '19:46 पर मोशन लाइट जली।'},
          loading: {name: 'लोडिंग डॉक', detail: '19:48 पर DOCK-4 में निकास दिखा।'},
        },
        publicClues: [
          'प्लेटफ़ॉर्म 2 से टनल का शटर ताले से बंद था।',
          'लॉकर 4B 19:45 पर टूटा; टनल की लाइट 19:46 पर जली।',
          '19:48 पर लोडिंग डॉक कैमरे में एक व्यक्ति दिखा।',
        ],
        thiefBriefing:
          'आप चोर हैं। कहें कि आप 19:43 पर सीधे प्लेटफ़ॉर्म 2 से फ़्रेट टनल में गए थे।',
        policeBriefing:
          'आप पुलिस हैं। प्लेटफ़ॉर्म–टनल शटर बंद था—टनल में जाने का रास्ता केवल लॉकर 4B से था।',
        citizenBriefings: [
          'नागरिक: 19:44 पर आप स्टेशन ऑफ़िस के पास थे।',
          'नागरिक: 19:45 पर लॉकर 4B में खटखट की आवाज़ सुनी।',
          'नागरिक: 19:46 पर फ़्रेट टनल की लाइट जलती देखी।',
          'नागरिक: 19:42 पर प्लेटफ़ॉर्म शटर पर ताला लगा देखा।',
        ],
        questions: [
          'जब प्लेटफ़ॉर्म शटर बंद था तो आप टनल में कैसे गए?',
          'क्या आप 19:45 पर लॉकर 4B के पास थे?',
          '19:48 पर लोडिंग डॉक से कौन निकला?',
        ],
        statements: [
          'प्लेटफ़ॉर्म 2 से टनल जाने का सीधा रास्ता बंद था।',
          'केवल लॉकर 4B से ही टनल का रास्ता खुला था।',
          '19:45 और 19:46 का समय आपस में जुड़ता है।',
        ],
        contradictionSummary:
          'प्लेटफ़ॉर्म 2 से सीधे टनल जाने का दावा ताले लगे शटर के कारण गलत है।',
      },
      ru: {
        title: 'Ячейка 4B на Центральном вокзале',
        location: 'Центральный вокзал',
        stolenItem: 'Дипломатический саквояж',
        zones: {
          platform: {name: 'Платформа 2', detail: 'Экспресс прибыл в 19:41.'},
          lockers: {name: 'Камеры 4B', detail: 'Взломана в 19:45.'},
          office: {name: 'Офис станции', detail: 'Оформление груза в 19:44.'},
          tunnel: {name: 'Грузовой тоннель', detail: 'Свет сработал в 19:46.'},
          loading: {name: 'Погрузочная рампа', detail: 'DOCK-4 сняла выход в 19:48.'},
        },
        publicClues: [
          'Решётка между Платформой 2 и тоннелем была закрыта на замок.',
          'Ячейку 4B взломали в 19:45; свет в тоннеле загорелся в 19:46.',
          'Камера DOCK-4 зафиксировала выход в 19:48.',
        ],
        thiefBriefing:
          'Вы Вор. Скажите, что в 19:43 прошли напрямую с Платформы 2 в грузовой тоннель.',
        policeBriefing:
          'Полиция: проход с Платформы 2 был заперт; попасть в тоннель можно было только через камеры 4B.',
        citizenBriefings: [
          'Горожанин: В 19:44 вы были у офиса станции.',
          'Горожанин: В 19:45 слышали скрежет металла у ячеек 4B.',
          'Горожанин: В 19:46 видели свет в грузовом тоннеле.',
          'Горожанин: В 19:42 заметили замок на решётке платформы.',
        ],
        questions: [
          'Как вы попали в тоннель при запертой решётке?',
          'Были ли вы у камер 4B около 19:45?',
          'Кто вышел через рампу в 19:48?',
        ],
        statements: [
          'Прямого прохода с Платформы 2 не было.',
          'Открытый вход в тоннель вёл только от камер 4B.',
          'Время 19:45 и 19:46 совпадает с маршрутом.',
        ],
        contradictionSummary:
          'Прямой переход с Платформы 2 в тоннель невозможен из-за замка на решётке.',
      },
      zh: {
        title: '中央车站 4B 寄存柜案',
        location: '中央铁路枢纽',
        stolenItem: '外交邮差包',
        zones: {
          platform: {name: '2 号站台', detail: '特快列车 19:41 进站。'},
          lockers: {name: '4B 寄存柜区', detail: '盲区，19:45 被撬。'},
          office: {name: '车站办公室', detail: '19:44 有人签收包裹。'},
          tunnel: {name: '货运通道', detail: '19:46 感应灯亮起。'},
          loading: {name: '装卸码头', detail: 'DOCK-4 在 19:48 拍到有人离开。'},
        },
        publicClues: [
          '2 号站台通往货运通道的卷帘门在高峰期上了挂锁。',
          '4B 寄存柜 19:45 被撬，货运通道灯 19:46 亮起。',
          'DOCK-4 监控拍到 19:48 有人走出码头。',
        ],
        thiefBriefing:
          '你是盗贼。声称自己 19:43 从 2 号站台直接走进了货运通道去码头打车。',
        policeBriefing:
          '你是警察。2 号站台通往货运通道的门已上锁，只有经过 4B 寄存柜区才能进入通道。',
        citizenBriefings: [
          '市民：19:44 你在车站办公室旁买咖啡。',
          '市民：19:45 听到 4B 寄存柜方向传来撬锁声。',
          '市民：19:46 看到货运通道感应灯突然亮起。',
          '市民：19:42 曾看到站台卷帘门挂着大锁。',
        ],
        questions: [
          '站台卷帘门上锁了，你是怎么进货运通道的？',
          '19:45 左右你经过 4B 寄存柜区了吗？',
          '19:48 离开码头的人是谁？',
        ],
        statements: [
          '2 号站台没有通往货运通道的开放路径。',
          '只有 4B 寄存柜区连着通道入口。',
          '19:45 到 19:46 的时间线完全吻合。',
        ],
        contradictionSummary:
          '声称从 2 号站台直接进入货运通道与卷帘门上锁的事实矛盾。',
      },
      ja: {
        title: '中央駅ロッカー4B事件',
        location: '中央鉄道ターミナル',
        stolenItem: '外交官の鞄',
        zones: {
          platform: {name: '2番ホーム', detail: '特急が 19:41 に到着。'},
          lockers: {name: 'ロッカー4B', detail: '死角。19:45 にこじ開けられた。'},
          office: {name: '駅事務室', detail: '19:44 に荷物受取記録。'},
          tunnel: {name: '貨物トンネル', detail: '19:46 に人感ライト点灯。'},
          loading: {name: '搬出口', detail: 'DOCK-4 が 19:48 の退出を記録。'},
        },
        publicClues: [
          '2番ホームから貨物トンネルへのシャッターは南京錠で施錠されていた。',
          'ロッカー4Bは 19:45 に破られ、トンネルの照明は 19:46 に点灯した。',
          'DOCK-4 が 19:48 に人物の退出を録画した。',
        ],
        thiefBriefing:
          'あなたは泥棒です。19:43 に2番ホームから直接貨物トンネルを通って搬出口へ向かったと言ってください。',
        policeBriefing:
          'あなたは警察です。2番ホーム側のシャッターは施錠されており、トンネルに入れるのはロッカー4B経由のみです。',
        citizenBriefings: [
          '市民：19:44 ごろ駅事務室の近くにいた。',
          '市民：19:45 にロッカー4B付近で金属音を聞いた。',
          '市民：19:46 に貨物トンネルの明かりが点くのを見た。',
          '市民：19:42 に2番ホームのシャッターの南京錠を確認した。',
        ],
        questions: [
          'シャッターが施錠されていたのにどうやってトンネルに入りましたか？',
          '19:45 ごろロッカー4Bの近くにいましたか？',
          '19:48 に搬出口を出たのは誰ですか？',
        ],
        statements: [
          '2番ホームからトンネルへの直通路は閉鎖されていました。',
          '開いていた通路はロッカー4B側だけです。',
          '19:45 と 19:46 の時刻がルートを裏付けています。',
        ],
        contradictionSummary:
          '2番ホームから直接トンネルに入ったというアリバイは、南京錠の記録と矛盾します。',
      },
    },
  },
  {
    id: 'conservatory-ruby',
    code: 'CPC-03',
    difficulty: 'tricky',
    incidentTime: '17:20 – 17:30',
    zones: [
      {id: 'atrium', x: 24, y: 24, w: 165, h: 108, cameraLabel: 'BOT-1'},
      {id: 'orchid', x: 218, y: 24, w: 165, h: 108, blindSpot: true},
      {id: 'shed', x: 412, y: 24, w: 144, h: 108, cameraLabel: 'SHED-KEY'},
      {id: 'pond', x: 24, y: 164, w: 256, h: 96, cameraLabel: 'BOT-2'},
      {id: 'terrace', x: 310, y: 164, w: 246, h: 96, blindSpot: true},
    ],
    corridors: [
      {from: 'atrium', to: 'orchid', sensorTime: '17:22'},
      {from: 'orchid', to: 'shed'},
      {from: 'atrium', to: 'pond'},
      {from: 'pond', to: 'terrace', sensorTime: '17:28'},
      {from: 'shed', to: 'terrace', locked: true},
    ],
    cluePins: [
      {id: 'p1', zoneId: 'orchid', cx: 300, cy: 74, code: 'E1'},
      {id: 'p2', zoneId: 'pond', cx: 148, cy: 212, code: 'E2'},
      {id: 'p3', zoneId: 'terrace', cx: 432, cy: 212, code: 'E3'},
    ],
    alibiArcs: [
      {id: 'a1', from: 'shed', to: 'terrace', suspicious: true},
      {id: 'a2', from: 'atrium', to: 'pond'},
    ],
    copy: {
      en: {
        title: 'The Botanical Conservatory Ruby',
        location: 'Glasshouse Gardens',
        stolenItem: 'Crimson Orchid Ruby',
        zones: {
          atrium: {name: 'Palm Atrium', detail: 'BOT-1 clear through 17:25.'},
          orchid: {name: 'Orchid Dome', detail: 'Display case opened at 17:24.'},
          shed: {name: 'Tool Shed', detail: 'Keycard log blank after 17:15.'},
          pond: {name: 'Koi Pond Walk', detail: 'BOT-2 misted lens; wet gravel at 17:27.'},
          terrace: {name: 'South Terrace', detail: 'Exit gate opened at 17:29.'},
        },
        publicClues: [
          'The Tool Shed back gate to South Terrace was rusted shut.',
          'Orchid Dome case alarm tripped silently at 17:24.',
          'South Terrace gate opened at 17:29 from the Koi Pond side.',
        ],
        thiefBriefing:
          'You are the Thief. Claim you checked gardening tools in the Tool Shed at 17:25 and walked through its back gate to the South Terrace.',
        policeBriefing:
          'You are Police. The Tool Shed back gate is rusted shut; reaching South Terrace requires passing Koi Pond Walk and Palm Atrium.',
        citizenBriefings: [
          'Citizen: You stood in Palm Atrium at 17:23 and saw wet shoes heading toward Koi Pond.',
          'Citizen: You noticed the rusted lock on the Tool Shed back gate earlier.',
          'Citizen: You heard the South Terrace gate click at 17:29.',
          'Citizen: You smelled crushed orchid petals near Koi Pond at 17:27.',
        ],
        questions: [
          'Did you pass Koi Pond Walk to reach South Terrace?',
          'How did you open the rusted Tool Shed back gate?',
          'Where were you at 17:24 when the Orchid case opened?',
        ],
        statements: [
          'The Tool Shed back gate cannot be opened.',
          'Crushed petals near Koi Pond match the Orchid Dome theft.',
          'Every Terrace arrival at 17:29 crossed Koi Pond Walk.',
        ],
        contradictionSummary:
          'Claiming to exit through the Tool Shed back gate contradicts the fact that it was rusted shut.',
      },
      es: {
        title: 'El Rubí del Invernadero Botánico',
        location: 'Jardines del Invernadero',
        stolenItem: 'Rubí Orquídea Carmesí',
        zones: {
          atrium: {name: 'Atrio de Palmeras', detail: 'BOT-1 despejado hasta las 17:25.'},
          orchid: {name: 'Cúpula Orquídea', detail: 'Vitrina abierta a las 17:24.'},
          shed: {name: 'Caseta de Útiles', detail: 'Sin registros desde las 17:15.'},
          pond: {name: 'Paseo del Estanque', detail: 'Grava húmeda a las 17:27.'},
          terrace: {name: 'Terraza Sur', detail: 'Portón abierto a las 17:29.'},
        },
        publicClues: [
          'La puerta trasera de la Caseta hacia la Terraza Sur estaba oxidada y sellada.',
          'La vitrina de la Cúpula Orquídea se abrió a las 17:24.',
          'El portón de la Terraza Sur se abrió a las 17:29 desde el Estanque.',
        ],
        thiefBriefing:
          'Eres el Caco. Di que entraste a la Caseta a las 17:25 y saliste por su puerta trasera hacia la Terraza Sur.',
        policeBriefing:
          'Eres Policía. La puerta trasera de la Caseta está soldada por óxido; solo se llega a la Terraza cruzando el Estanque.',
        citizenBriefings: [
          'Ciudadano: A las 17:23 viste pisadas húmedas rumbo al Estanque.',
          'Ciudadano: Comprobaste antes que la puerta trasera de la Caseta está oxidada.',
          'Ciudadano: Oíste abrirse el portón de la Terraza Sur a las 17:29.',
          'Ciudadano: Oliste pétalos aplastados junto al Estanque a las 17:27.',
        ],
        questions: [
          '¿Cómo abriste la puerta trasera oxidada de la Caseta?',
          '¿Pasaste por el Paseo del Estanque antes de las 17:29?',
          '¿Dónde estabas a las 17:24?',
        ],
        statements: [
          'La puerta trasera de la Caseta está bloqueada por óxido.',
          'Hay pétalos de orquídea junto al Estanque.',
          'Para salir por Terraza Sur había que cruzar el Estanque.',
        ],
        contradictionSummary:
          'Decir que saliste por la puerta trasera de la Caseta es falso porque está sellada por óxido.',
      },
      fr: {
        title: 'Le Rubis de la Serre Botanique',
        location: 'Jardins de la Serre',
        stolenItem: 'Rubis Orchidée',
        zones: {
          atrium: {name: 'Atrium Palmiers', detail: 'BOT-1 calme jusqu’à 17:25.'},
          orchid: {name: 'Dôme Orchidées', detail: 'Vitrine ouverte à 17:24.'},
          shed: {name: 'Remise Outils', detail: 'Aucun badge après 17:15.'},
          pond: {name: 'Allée du Bassin', detail: 'Gravier mouillé à 17:27.'},
          terrace: {name: 'Terrasse Sud', detail: 'Portail ouvert à 17:29.'},
        },
        publicClues: [
          'La porte arrière de la Remise vers la Terrasse était rouillée et bloquée.',
          'Vitrine ouverte à 17:24.',
          'Portail Terrasse ouvert à 17:29 depuis le Bassin.',
        ],
        thiefBriefing:
          'Voleur : dites être passé par la porte arrière de la Remise vers la Terrasse à 17:25.',
        policeBriefing:
          'Police : cette porte de la Remise est bloquée par la rouille.',
        citizenBriefings: [
          'Citoyen : Pas humides vers le Bassin à 17:23.',
          'Citoyen : Porte de la Remise condamnée par la rouille.',
          'Citoyen : Portail Terrasse ouvert à 17:29.',
          'Citoyen : Pétales écrasés près du Bassin à 17:27.',
        ],
        questions: [
          'Comment avez-vous ouvert la porte rouillée de la Remise ?',
          'Avez-vous longé le Bassin avant 17:29 ?',
          'Où étiez-vous à 17:24 ?',
        ],
        statements: [
          'La porte arrière de la Remise est condamnée.',
          'Des pétales mènent vers l’Allée du Bassin.',
          'L’accès à la Terrasse passe par le Bassin.',
        ],
        contradictionSummary:
          'Sortir par la porte arrière de la Remise était impossible car elle est bloquée par la rouille.',
      },
      de: {
        title: 'Der Rubin im Gewächshaus',
        location: 'Botanischer Wintergarten',
        stolenItem: 'Orchideen-Rubin',
        zones: {
          atrium: {name: 'Palmenatrium', detail: 'BOT-1 frei bis 17:25.'},
          orchid: {name: 'Orchideenkuppel', detail: 'Vitrine um 17:24 geöffnet.'},
          shed: {name: 'Geräteschuppen', detail: 'Keine Karte nach 17:15.'},
          pond: {name: 'Teichweg', detail: 'Nasser Kies um 17:27.'},
          terrace: {name: 'Südterrasse', detail: 'Tor um 17:29 geöffnet.'},
        },
        publicClues: [
          'Die Hintertür des Geräteschuppens zur Südterrasse war festgerostet.',
          'Die Vitrine öffnete sich um 17:24.',
          'Das Terrassentor öffnete sich um 17:29 vom Teichweg aus.',
        ],
        thiefBriefing:
          'Dieb: Behaupte, du bist um 17:25 durch die Hintertür des Schuppens zur Südterrasse gegangen.',
        policeBriefing:
          'Polizei: Die Schuppen-Hintertür ist festgerostet; der einzige Weg führt über den Teichweg.',
        citizenBriefings: [
          'Bürger: Nasse Schritte Richtung Teichweg um 17:23.',
          'Bürger: Die Schuppen-Hintertür ließ sich wegen Rost nicht öffnen.',
          'Bürger: Tor zur Südterrasse klickte um 17:29.',
          'Bürger: Zerdrückte Blüten am Teichweg um 17:27.',
        ],
        questions: [
          'Wie hast du die festgerostete Schuppentür geöffnet?',
          'Bist du über den Teichweg gegangen?',
          'Wo warst du um 17:24?',
        ],
        statements: [
          'Die Schuppen-Hintertür ist komplett blockiert.',
          'Blütenblätter liegen entlang des Teichwegs.',
          'Zur Südterrasse gelangt man nur über den Teichweg.',
        ],
        contradictionSummary:
          'Der Ausgang über die Hintertür des Geräteschuppens widerspricht dem festgerosteten Schloss.',
      },
      pt: {
        title: 'O Rubi do Conservatório Botânico',
        location: 'Jardins de Vidro',
        stolenItem: 'Rubi Orquídea',
        zones: {
          atrium: {name: 'Átrio das Palmeiras', detail: 'BOT-1 livre até 17:25.'},
          orchid: {name: 'Domo das Orquídeas', detail: 'Vitrine aberta às 17:24.'},
          shed: {name: 'Galpão de Ferramentas', detail: 'Sem registro após 17:15.'},
          pond: {name: 'Trilha do Lago', detail: 'Cascalho molhado às 17:27.'},
          terrace: {name: 'Terraço Sul', detail: 'Portão aberto às 17:29.'},
        },
        publicClues: [
          'A porta dos fundos do Galpão estava enferrujada e travada.',
          'A vitrine do Domo abriu às 17:24.',
          'O portão do Terraço Sul abriu às 17:29 vindo do Lago.',
        ],
        thiefBriefing:
          'Ladrão: diga que passou pela porta dos fundos do Galpão às 17:25 rumo ao Terraço Sul.',
        policeBriefing:
          'Polícia: a porta dos fundos do Galpão está travada por ferrugem; o caminho exigia passar pelo Lago.',
        citizenBriefings: [
          'Cidadão: Passos molhados rumo ao Lago às 17:23.',
          'Cidadão: A porta dos fundos do Galpão estava travada.',
          'Cidadão: O portão do Terraço clicou às 17:29.',
          'Cidadão: Pétalas esmagadas perto do Lago às 17:27.',
        ],
        questions: [
          'Como abriu a porta enferrujada do Galpão?',
          'Você passou pela Trilha do Lago?',
          'Onde estava às 17:24?',
        ],
        statements: [
          'A porta dos fundos do Galpão não abre.',
          'Há pétalas junto à Trilha do Lago.',
          'O acesso ao Terraço Sul vem do Lago.',
        ],
        contradictionSummary:
          'Sair pelos fundos do Galpão é impossível porque a porta estava enferrujada e travada.',
      },
      ar: {
        title: 'ياقوتة البيت الزجاجي',
        location: 'الحديقة النباتية',
        stolenItem: 'ياقوتة الأوركيد',
        zones: {
          atrium: {name: 'بهو النخيل', detail: 'كاميرا 1 واضحة حتى 17:25.'},
          orchid: {name: 'قبة الأوركيد', detail: 'فُتحت الواجهة 17:24.'},
          shed: {name: 'سقيفة الأدوات', detail: 'لا دخول بعد 17:15.'},
          pond: {name: 'ممر البركة', detail: 'حصى مبلل عند 17:27.'},
          terrace: {name: 'الشرفة الجنوبية', detail: 'فُتحت البوابة 17:29.'},
        },
        publicClues: [
          'الباب الخلفي لسقيفة الأدوات صدئ ومغلق تماماً.',
          'فُتحت واجهة قبة الأوركيد عند 17:24.',
          'بوابة الشرفة الجنوبية فُتحت 17:29 من جهة البركة.',
        ],
        thiefBriefing:
          'أنت اللص. ادّعِ أنك خرجت من الباب الخلفي للسقيفة نحو الشرفة الجنوبية عند 17:25.',
        policeBriefing:
          'الشرطة: الباب الخلفي للسقيفة صدئ ومغلق؛ الطريق الوحيد للشرفة يمر بممر البركة.',
        citizenBriefings: [
          'مواطن: آثار أقدام مبللة نحو البركة عند 17:23.',
          'مواطن: لاحظت صدأ الباب الخلفي للسقيفة.',
          'مواطن: سمعت بوابة الشرفة تُفتح عند 17:29.',
          'مواطن: بتلات مسحوقة قرب البركة عند 17:27.',
        ],
        questions: [
          'كيف فتحت باب السقيفة الصدئ؟',
          'هل مررت بممر البركة قبل 17:29؟',
          'أين كنت عند 17:24؟',
        ],
        statements: [
          'الباب الخلفي للسقيفة مقفل بالصدأ.',
          'بتلات الأوركيد موجودة قرب البركة.',
          'الوصول للشرفة يتطلب عبور ممر البركة.',
        ],
        contradictionSummary:
          'ادعاء المرور من الباب الخلفي للسقيفة يناقض كونه مغلقاً بالصدأ.',
      },
      hi: {
        title: 'बोटैनिकल कंजर्वेटरी रूबी',
        location: 'ग्लासहाउस गार्डन',
        stolenItem: 'क्रिमसन ऑर्किड रूबी',
        zones: {
          atrium: {name: 'पाम एट्रियम', detail: '17:25 तक BOT-1 साफ़ था।'},
          orchid: {name: 'ऑर्किड डोम', detail: '17:24 पर शोकेस खुला।'},
          shed: {name: 'टूल शेड', detail: '17:15 के बाद कोई कार्ड एंट्री नहीं।'},
          pond: {name: 'तालाब मार्ग', detail: '17:27 पर गीली बजरी दिखी।'},
          terrace: {name: 'साउथ टेरेस', detail: '17:29 पर गेट खुला।'},
        },
        publicClues: [
          'टूल शेड का पिछला गेट जंग लगने से बंद था।',
          '17:24 पर ऑर्किड डोम का केस खुला।',
          'साउथ टेरेस गेट 17:29 पर तालाब मार्ग की तरफ से खुला।',
        ],
        thiefBriefing:
          'आप चोर हैं। कहें कि 17:25 पर टूल शेड के पिछले गेट से सीधे साउथ टेरेस गए।',
        policeBriefing:
          'पुलिस: टूल शेड का पिछला गेट जंग से बंद है—टेरेस तक जाने का रास्ता तालाब मार्ग से है।',
        citizenBriefings: [
          'नागरिक: 17:23 पर तालाब की ओर गीले कदम जाते देखे।',
          'नागरिक: टूल शेड का पिछला गेट जंग से जाम था।',
          'नागरिक: 17:29 पर साउथ टेरेस गेट खुलने की आवाज़ आई।',
          'नागरिक: 17:27 पर तालाब के पास कुचले फूल दिखे।',
        ],
        questions: [
          'आपने टूल शेड का जाम गेट कैसे खोला?',
          'क्या आप तालाब मार्ग से गुजरे थे?',
          '17:24 पर आप कहां थे?',
        ],
        statements: [
          'टूल शेड का पिछला गेट खुल ही नहीं सकता।',
          'तालाब मार्ग पर ऑर्किड की पंखुड़ियां मिली हैं।',
          'टेरेस तक रास्ता तालाब मार्ग से होकर जाता है।',
        ],
        contradictionSummary:
          'टूल शेड के पिछले गेट से जाने का दावा उसके जंग लगे होने से झूठा साबित होता है।',
      },
      ru: {
        title: 'Рубин ботанической оранжереи',
        location: 'Стеклянный сад',
        stolenItem: 'Рубин «Алая орхидея»',
        zones: {
          atrium: {name: 'Пальмовый атриум', detail: 'BOT-1 чиста до 17:25.'},
          orchid: {name: 'Купол орхидей', detail: 'Витрина открыта в 17:24.'},
          shed: {name: 'Хозблок', detail: 'Нет проходов после 17:15.'},
          pond: {name: 'Тропа у пруда', detail: 'Мокрый гравий в 17:27.'},
          terrace: {name: 'Южная терраса', detail: 'Калитка открыта в 17:29.'},
        },
        publicClues: [
          'Задняя дверь хозблока на террасу заржавела и не открывается.',
          'Витрина орхидей вскрыта в 17:24.',
          'Калитка Южной террасы открылась в 17:29 со стороны пруда.',
        ],
        thiefBriefing:
          'Вы Вор. Утверждайте, что вышли в 17:25 через заднюю дверь хозблока на Южную террасу.',
        policeBriefing:
          'Полиция: задняя дверь хозблока намертво заржавела; путь на террасу лежит через пруд.',
        citizenBriefings: [
          'Горожанин: В 17:23 видели мокрые следы к пруду.',
          'Горожанин: Вы знали, что дверь хозблока заклинила от ржавчины.',
          'Горожанин: В 17:29 щёлкнула калитка Южной террасы.',
          'Горожанин: В 17:27 у пруда нашли лепестки орхидеи.',
        ],
        questions: [
          'Как вы открыли заржавевшую дверь хозблока?',
          'Вы проходили мимо пруда до 17:29?',
          'Где вы находились в 17:24?',
        ],
        statements: [
          'Задняя дверь хозблока не открывается.',
          'Лепестки орхидеи ведут к тропе у пруда.',
          'На террасу можно попасть только мимо пруда.',
        ],
        contradictionSummary:
          'Выход через заднюю дверь хозблока невозможен — она намертво заржавела.',
      },
      zh: {
        title: '植物温室红宝石失窃案',
        location: '玻璃温室花园',
        stolenItem: '绯红兰花红宝石',
        zones: {
          atrium: {name: '棕榈中庭', detail: 'BOT-1 在 17:25 前无异常。'},
          orchid: {name: '兰花穹顶', detail: '17:24 展柜被打开。'},
          shed: {name: '工具棚', detail: '17:15 后无刷卡记录。'},
          pond: {name: '锦鲤池步道', detail: '17:27 有湿碎石脚印。'},
          terrace: {name: '南露台', detail: '17:29 出口门被打开。'},
        },
        publicClues: [
          '工具棚通往南露台的后门早已生锈封死。',
          '兰花穹顶展柜在 17:24 被悄悄打开。',
          '南露台大门于 17:29 从锦鲤池一侧被打开。',
        ],
        thiefBriefing:
          '你是盗贼。声称 17:25 去工具棚拿园艺工具，并直接从后门走到南露台。',
        policeBriefing:
          '你是警察。工具棚后门已锈死，去南露台只能绕行锦鲤池步道。',
        citizenBriefings: [
          '市民：17:23 在棕榈中庭看到有人踩着湿鞋走向锦鲤池。',
          '市民：之前就发现工具棚后门锈得打不开。',
          '市民：17:29 听到南露台门锁咔哒响了一声。',
          '市民：17:27 在锦鲤池旁闻到被踩碎的兰花瓣味。',
        ],
        questions: [
          '生锈封死的工具棚后门你是怎么打开的？',
          '17:29 前你走过锦鲤池步道吗？',
          '17:24 展柜被打开时你在哪里？',
        ],
        statements: [
          '工具棚后门根本无法通行。',
          '锦鲤池旁发现了兰花花瓣。',
          '去南露台必须经过锦鲤池步道。',
        ],
        contradictionSummary:
          '声称从工具棚后门前往南露台与该门已生锈封死的事实矛盾。',
      },
      ja: {
        title: '植物温室ルビー盗難事件',
        location: 'ガラス温室庭園',
        stolenItem: '紅蘭のルビー',
        zones: {
          atrium: {name: 'パームアトリウム', detail: '17:25 まで BOT-1 に異常なし。'},
          orchid: {name: 'ランのドーム', detail: '17:24 に展示ケース開放。'},
          shed: {name: '道具小屋', detail: '17:15 以降の入室記録なし。'},
          pond: {name: '錦鯉の池小道', detail: '17:27 に濡れた砂利跡。'},
          terrace: {name: '南テラス', detail: '17:29 に出口ゲート開放。'},
        },
        publicClues: [
          '道具小屋から南テラスへの裏口は錆びて開かない。',
          '17:24 にランのドームの展示ケースが開けられた。',
          '南テラスのゲートは 17:29 に池小道側から開かれた。',
        ],
        thiefBriefing:
          'あなたは泥棒です。17:25 に道具小屋の裏口から南テラスへ抜けたと証言してください。',
        policeBriefing:
          'あなたは警察です。道具小屋の裏口は錆びて固着しており、南テラスへは池小道を通る必要があります。',
        citizenBriefings: [
          '市民：17:23 に池小道へ向かう濡れた足跡を見た。',
          '市民：道具小屋の裏口が錆びて開かないのを事前に確認していた。',
          '市民：17:29 に南テラスのゲートが開く音を聞いた。',
          '市民：17:27 に池の近くで潰れたランの花びらを見た。',
        ],
        questions: [
          '錆びて開かない道具小屋の裏口をどうやって通りましたか？',
          '17:29 より前に錦鯉の池小道を通りましたか？',
          '17:24 ごろはどこにいましたか？',
        ],
        statements: [
          '道具小屋の裏口は完全に封鎖されています。',
          '池の近くにランの花びらが落ちていました。',
          '南テラスへ行くには池小道を通るしかありません。',
        ],
        contradictionSummary:
          '道具小屋の裏口から出たという主張は、扉が錆びて開かない事実と矛盾します。',
      },
    },
  },
  {
    id: 'harbor-pier-19',
    code: 'CPC-04',
    difficulty: 'tricky',
    incidentTime: '05:05 – 05:15',
    zones: [
      {id: 'gatehouse', x: 24, y: 24, w: 150, h: 108, cameraLabel: 'PIER-CAM'},
      {id: 'warehouse', x: 204, y: 24, w: 192, h: 108, blindSpot: true},
      {id: 'coldroom', x: 426, y: 24, w: 130, h: 108, cameraLabel: 'TEMP-LOG'},
      {id: 'jetty', x: 24, y: 164, w: 256, h: 96, blindSpot: true},
      {id: 'crane', x: 310, y: 164, w: 246, h: 96, cameraLabel: 'CRANE-3'},
    ],
    corridors: [
      {from: 'gatehouse', to: 'warehouse', sensorTime: '05:06'},
      {from: 'warehouse', to: 'coldroom', locked: true},
      {from: 'warehouse', to: 'jetty', sensorTime: '05:11'},
      {from: 'jetty', to: 'crane'},
      {from: 'coldroom', to: 'crane'},
    ],
    cluePins: [
      {id: 'p1', zoneId: 'warehouse', cx: 300, cy: 74, code: 'E1'},
      {id: 'p2', zoneId: 'jetty', cx: 152, cy: 212, code: 'E2'},
      {id: 'p3', zoneId: 'crane', cx: 432, cy: 212, code: 'E3'},
    ],
    alibiArcs: [
      {id: 'a1', from: 'warehouse', to: 'coldroom', suspicious: true},
      {id: 'a2', from: 'jetty', to: 'crane'},
    ],
    copy: {
      en: {
        title: 'Harbor Pier 19 Cargo Switch',
        location: 'Pier 19 Freight Terminal',
        stolenItem: 'Sealed Amber Crate',
        zones: {
          gatehouse: {name: 'Gatehouse', detail: 'PIER-CAM logged crew check-in at 05:04.'},
          warehouse: {name: 'Warehouse B', detail: 'Crate seal cut around 05:09.'},
          coldroom: {name: 'Cold Storage', detail: 'Magnetic seal stayed shut until 05:30.'},
          jetty: {name: 'West Jetty', detail: 'Rope cleat wet at 05:11.'},
          crane: {name: 'Crane Bay 3', detail: 'CRANE-3 spotted a trolley at 05:14.'},
        },
        publicClues: [
          'Cold Storage magnetic seal remained uninterrupted from 04:50 to 05:30.',
          'Crate seal inside Warehouse B was cut around 05:09.',
          'A trolley reached Crane Bay 3 via West Jetty at 05:14.',
        ],
        thiefBriefing:
          'You are the Thief. Claim you pushed an empty cart from Warehouse B straight through Cold Storage to Crane Bay 3 at 05:10.',
        policeBriefing:
          'You are Police. Verified TEMP-LOG: Cold Storage stayed sealed continuously; any route from Warehouse B to Crane Bay 3 went via West Jetty.',
        citizenBriefings: [
          'Citizen: You logged fish boxes near Crane Bay 3 at 05:13.',
          'Citizen: You heard trolley wheels splashing along West Jetty at 05:11.',
          'Citizen: You checked the green Cold Storage lock light at 05:08.',
          'Citizen: You saw Warehouse B side door swing open at 05:09.',
        ],
        questions: [
          'Why did TEMP-LOG show zero door openings in Cold Storage?',
          'Did you hear waves or pass West Jetty at 05:11?',
          'How did the trolley reach Crane Bay 3?',
        ],
        statements: [
          'Cold Storage was sealed the entire morning.',
          'Trolley tracks run along West Jetty, not Cold Storage.',
          'Someone cut the seal in Warehouse B at 05:09.',
        ],
        contradictionSummary:
          'Claiming to cross Cold Storage fails because its magnetic seal never opened between 04:50 and 05:30.',
      },
      es: {
        title: 'El Cambio de Carga del Muelle 19',
        location: 'Terminal Portuaria Muelle 19',
        stolenItem: 'Caja Sellada de Ámbar',
        zones: {
          gatehouse: {name: 'Garita', detail: 'PIER-CAM registró turnos a las 05:04.'},
          warehouse: {name: 'Almacén B', detail: 'Precinto cortado a las 05:09.'},
          coldroom: {name: 'Cámara Fría', detail: 'Sello magnético cerrado hasta 05:30.'},
          jetty: {name: 'Espigón Oeste', detail: 'Amarre mojado a las 05:11.'},
          crane: {name: 'Grúa 3', detail: 'CRANE-3 vio un carro a las 05:14.'},
        },
        publicClues: [
          'El sello magnético de Cámara Fría no se abrió entre 04:50 y 05:30.',
          'El precinto en Almacén B se cortó a las 05:09.',
          'Un carro llegó a Grúa 3 por el Espigón Oeste a las 05:14.',
        ],
        thiefBriefing:
          'Eres el Caco. Di que cruzaste con un carro del Almacén B por dentro de Cámara Fría hacia Grúa 3 a las 05:10.',
        policeBriefing:
          'Eres Policía. TEMP-LOG confirma que Cámara Fría jamás se abrió: la ruta iba por el Espigón Oeste.',
        citizenBriefings: [
          'Ciudadano: Anotabas cajas junto a Grúa 3 a las 05:13.',
          'Ciudadano: Oíste ruedas de carro en el Espigón Oeste a las 05:11.',
          'Ciudadano: Viste la luz verde de cierre en Cámara Fría a las 05:08.',
          'Ciudadano: Viste abrirse la puerta lateral del Almacén B a las 05:09.',
        ],
        questions: [
          '¿Cómo cruzaste Cámara Fría si su sello magnético no se abrió?',
          '¿Pasaste por el Espigón Oeste a las 05:11?',
          '¿Qué llevabas hacia Grúa 3?',
        ],
        statements: [
          'Cámara Fría estuvo herméticamente cerrada toda la mañana.',
          'Las marcas de carro pasan por el Espigón Oeste.',
          'El robo empezó en Almacén B a las 05:09.',
        ],
        contradictionSummary:
          'Cruzar por Cámara Fría es imposible porque su sello magnético permaneció cerrado hasta las 05:30.',
      },
      fr: {
        title: 'Trafic au Quai 19',
        location: 'Terminal Portuaire 19',
        stolenItem: 'Caisse d’Ambre Scellée',
        zones: {
          gatehouse: {name: 'Poste Entrée', detail: 'PIER-CAM à 05:04.'},
          warehouse: {name: 'Entrepôt B', detail: 'Scellé coupé à 05:09.'},
          coldroom: {name: 'Chambre Froide', detail: 'Fermée jusqu’à 05:30.'},
          jetty: {name: 'Jetée Ouest', detail: 'Chariot entendu à 05:11.'},
          crane: {name: 'Grue 3', detail: 'CRANE-3 filme un chariot à 05:14.'},
        },
        publicClues: [
          'La Chambre Froide est restée scellée de 04:50 à 05:30.',
          'Scellé coupé dans l’Entrepôt B à 05:09.',
          'Un chariot a rejoint Grue 3 par la Jetée Ouest à 05:14.',
        ],
        thiefBriefing:
          'Voleur : dites avoir traversé la Chambre Froide vers Grue 3 à 05:10.',
        policeBriefing:
          'Police : la Chambre Froide ne s’est pas ouverte ; le trajet passait par la Jetée Ouest.',
        citizenBriefings: [
          'Citoyen : Vous étiez près de Grue 3 à 05:13.',
          'Citoyen : Roues entendues sur la Jetée Ouest à 05:11.',
          'Citoyen : Voyant vert de Chambre Froide vérifié à 05:08.',
          'Citoyen : Porte latérale de l’Entrepôt B ouverte à 05:09.',
        ],
        questions: [
          'Comment traverser une Chambre Froide scellée ?',
          'Étiez-vous sur la Jetée Ouest à 05:11 ?',
          'Où alliez-vous à 05:14 ?',
        ],
        statements: [
          'La Chambre Froide était verrouillée sans interruption.',
          'Le chariot a roulé sur la Jetée Ouest.',
          'Le vol a commencé à 05:09 en Entrepôt B.',
        ],
        contradictionSummary:
          'Traverser la Chambre Froide contredit le relevé magnétique continu.',
      },
      de: {
        title: 'Fracht-Tausch an Pier 19',
        location: 'Hafenterminal Pier 19',
        stolenItem: 'Versiegelte Bernsteinkiste',
        zones: {
          gatehouse: {name: 'Pförtnerhaus', detail: 'PIER-CAM um 05:04.'},
          warehouse: {name: 'Lagerhalle B', detail: 'Siegel um 05:09 gekappt.'},
          coldroom: {name: 'Kühlraum', detail: 'Magnetschloss bis 05:30 zu.'},
          jetty: {name: 'Westmole', detail: 'Wagen um 05:11 gehört.'},
          crane: {name: 'Kranbucht 3', detail: 'CRANE-3 sah Wagen um 05:14.'},
        },
        publicClues: [
          'Der Kühlraum blieb von 04:50 bis 05:30 durchgehend versiegelt.',
          'Das Siegel in Lagerhalle B wurde um 05:09 durchtrennt.',
          'Ein Transportwagen erreichte Kranbucht 3 um 05:14 über die Westmole.',
        ],
        thiefBriefing:
          'Dieb: Behaupte, du bist mit dem Wagen um 05:10 durch den Kühlraum zu Kranbucht 3 gefahren.',
        policeBriefing:
          'Polizei: Der Kühlraum war durchgehend zu; der Weg führte über die Westmole.',
        citizenBriefings: [
          'Bürger: Du warst um 05:13 bei Kranbucht 3.',
          'Bürger: Du hörtest Rollen auf der Westmole um 05:11.',
          'Bürger: Du sahst das grüne Schlosslicht am Kühlraum um 05:08.',
          'Bürger: Seitentür von Halle B schwang um 05:09 auf.',
        ],
        questions: [
          'Wie bist du durch den versiegelten Kühlraum gekommen?',
          'Warst du um 05:11 auf der Westmole?',
          'Was hast du zu Kranbucht 3 gebracht?',
        ],
        statements: [
          'Der Kühlraum wurde bis 05:30 nicht geöffnet.',
          'Der Transportwagen fuhr über die Westmole.',
          'Der Diebstahl geschah um 05:09 in Halle B.',
        ],
        contradictionSummary:
          'Eine Durchfahrt durch den Kühlraum widerspricht dem ununterbrochenen Magnetsiegel.',
      },
      pt: {
        title: 'Troca de Carga no Cais 19',
        location: 'Terminal Portuário 19',
        stolenItem: 'Caixa Selada de Âmbar',
        zones: {
          gatehouse: {name: 'Guarita', detail: 'PIER-CAM às 05:04.'},
          warehouse: {name: 'Armazém B', detail: 'Lacre cortado às 05:09.'},
          coldroom: {name: 'Câmara Fria', detail: 'Lacrada até 05:30.'},
          jetty: {name: 'Píer Oeste', detail: 'Rodas ouvidas às 05:11.'},
          crane: {name: 'Guindaste 3', detail: 'CRANE-3 filmou carrinho às 05:14.'},
        },
        publicClues: [
          'A Câmara Fria permaneceu lacrada das 04:50 às 05:30.',
          'Lacre do Armazém B cortado às 05:09.',
          'Carrinho chegou ao Guindaste 3 pelo Píer Oeste às 05:14.',
        ],
        thiefBriefing:
          'Ladrão: diga que atravessou a Câmara Fria às 05:10 rumo ao Guindaste 3.',
        policeBriefing:
          'Polícia: a Câmara Fria não abriu; a rota real foi pelo Píer Oeste.',
        citizenBriefings: [
          'Cidadão: Você estava perto do Guindaste 3 às 05:13.',
          'Cidadão: Ouviu um carrinho no Píer Oeste às 05:11.',
          'Cidadão: Viu a luz verde de trava da Câmara Fria às 05:08.',
          'Cidadão: Viu a porta lateral do Armazém B abrir às 05:09.',
        ],
        questions: [
          'Como cruzou a Câmara Fria se ela estava lacrada?',
          'Passou pelo Píer Oeste às 05:11?',
          'Onde estava às 05:09?',
        ],
        statements: [
          'A Câmara Fria ficou fechada até 05:30.',
          'O carrinho seguiu pelo Píer Oeste.',
          'O lacre foi rompido às 05:09 no Armazém B.',
        ],
        contradictionSummary:
          'Atravessar a Câmara Fria contradiz o lacre magnético contínuo.',
      },
      ar: {
        title: 'تبديل الشحنة في الرصيف 19',
        location: 'محطة الشحن البحري 19',
        stolenItem: 'صندوق العنبر المختوم',
        zones: {
          gatehouse: {name: 'بوابة الحرس', detail: 'كاميرا 05:04.'},
          warehouse: {name: 'المستودع B', detail: 'قُطع الختم 05:09.'},
          coldroom: {name: 'غرفة التبريد', detail: 'مغلقة مغناطيسياً حتى 05:30.'},
          jetty: {name: 'اللسان الغربي', detail: 'صوت عربة عند 05:11.'},
          crane: {name: 'الرافعة 3', detail: 'رصدت عربة عند 05:14.'},
        },
        publicClues: [
          'بقيت غرفة التبريد مغلقة دون انقطاع من 04:50 إلى 05:30.',
          'قُطع ختم الصندوق في المستودع B عند 05:09.',
          'وصلت عربة إلى الرافعة 3 عبر اللسان الغربي عند 05:14.',
        ],
        thiefBriefing:
          'أنت اللص. ادّعِ أنك عبرت بعربة من المستودع B داخل غرفة التبريد نحو الرافعة 3 عند 05:10.',
        policeBriefing:
          'الشرطة: غرفة التبريد لم تُفتح مطلقاً؛ المسار الفعلي مر باللسان الغربي.',
        citizenBriefings: [
          'مواطن: كنت قرب الرافعة 3 عند 05:13.',
          'مواطن: سمعت عجلات عربة على اللسان الغربي عند 05:11.',
          'مواطن: رأيت ضوء قفل غرفة التبريد الأخضر عند 05:08.',
          'مواطن: رأيت باب المستودع B يفتح عند 05:09.',
        ],
        questions: [
          'كيف عبرت غرفة التبريد وهي مغلقة؟',
          'هل مررت باللسان الغربي عند 05:11؟',
          'أين كنت عند 05:09؟',
        ],
        statements: [
          'غرفة التبريد ظلت مغلقة حتى 05:30.',
          'مسار العربة كان عبر اللسان الغربي.',
          'الختم قُطع في المستودع B عند 05:09.',
        ],
        contradictionSummary:
          'ادعاء العبور من غرفة التبريد مستحيل لأن قفلها المغناطيسي لم يُفتح.',
      },
      hi: {
        title: 'हार्बर पियर 19 कार्गो हेरफेर',
        location: 'पियर 19 फ़्रेट टर्मिनल',
        stolenItem: 'सीलबंद एम्बर क्रेट',
        zones: {
          gatehouse: {name: 'गेटहाउस', detail: '05:04 पर PIER-CAM लॉग।'},
          warehouse: {name: 'वेयरहाउस B', detail: '05:09 पर सील काटी गई।'},
          coldroom: {name: 'कोल्ड स्टोरेज', detail: '05:30 तक चुंबकीय सील बंद रही।'},
          jetty: {name: 'वेस्ट जेटी', detail: '05:11 पर ट्रॉली की आवाज़ आई।'},
          crane: {name: 'क्रेन बे 3', detail: '05:14 पर CRANE-3 में ट्रॉली दिखी।'},
        },
        publicClues: [
          'कोल्ड स्टोरेज की चुंबकीय सील 04:50 से 05:30 तक लगातार बंद रही।',
          'वेयरहाउस B में 05:09 पर सील काटी गई।',
          '05:14 पर वेस्ट जेटी से ट्रॉली क्रेन बे 3 पहुंची।',
        ],
        thiefBriefing:
          'आप चोर हैं। कहें कि आप 05:10 पर वेयरहाउस B से कोल्ड स्टोरेज होकर क्रेन बे 3 गए।',
        policeBriefing:
          'पुलिस: कोल्ड स्टोरेज कभी नहीं खुला; रास्ता वेस्ट जेटी से होकर गया था।',
        citizenBriefings: [
          'नागरिक: 05:13 पर आप क्रेन बे 3 के पास थे।',
          'नागरिक: 05:11 पर वेस्ट जेटी पर ट्रॉली के पहियों की आवाज़ सुनी।',
          'नागरिक: 05:08 पर कोल्ड स्टोरेज का बंद इंडिकेटर देखा।',
          'नागरिक: 05:09 पर वेयरहाउस B का साइड दरवाजा खुलते देखा।',
        ],
        questions: [
          'बंद कोल्ड स्टोरेज से आप कैसे निकले?',
          'क्या आप 05:11 पर वेस्ट जेटी पर थे?',
          '05:09 पर आप कहां थे?',
        ],
        statements: [
          'कोल्ड स्टोरेज 05:30 तक सील था।',
          'ट्रॉली वेस्ट जेटी से होकर गई थी।',
          'चोरी 05:09 पर वेयरहाउस B में हुई।',
        ],
        contradictionSummary:
          'कोल्ड स्टोरेज से गुजरने का दावा उसके लगातार बंद रहने से झूठा साबित होता है।',
      },
      ru: {
        title: 'Подмена груза на причале 19',
        location: 'Грузовой терминал 19',
        stolenItem: 'Опечатанный ящик с янтарём',
        zones: {
          gatehouse: {name: 'Проходная', detail: 'PIER-CAM в 05:04.'},
          warehouse: {name: 'Склад B', detail: 'Пломба срезана в 05:09.'},
          coldroom: {name: 'Холодильная камера', detail: 'Заперта до 05:30.'},
          jetty: {name: 'Западный пирс', detail: 'Тележка в 05:11.'},
          crane: {name: 'Кран 3', detail: 'CRANE-3 сняла тележку в 05:14.'},
        },
        publicClues: [
          'Магнитный замок холодильной камеры не открывался с 04:50 до 05:30.',
          'Пломба на Складе B вскрыта в 05:09.',
          'Тележка прибыла к Крану 3 по Западному пирсу в 05:14.',
        ],
        thiefBriefing:
          'Вы Вор. Скажите, что в 05:10 провезли тележку из Склада B через холодильную камеру к Крану 3.',
        policeBriefing:
          'Полиция: холодильная камера не открывалась; путь шёл через Западный пирс.',
        citizenBriefings: [
          'Горожанин: В 05:13 вы были у Крана 3.',
          'Горожанин: В 05:11 слышали колёса на Западном пирсе.',
          'Горожанин: В 05:08 видели закрытый индикатор холодильной камеры.',
          'Горожанин: В 05:09 открылась боковая дверь Склада B.',
        ],
        questions: [
          'Как вы прошли через закрытую холодильную камеру?',
          'Были ли вы на Западном пирсе в 05:11?',
          'Где вы были в 05:09?',
        ],
        statements: [
          'Холодильная камера не открывалась до 05:30.',
          'Тележка ехала по Западному пирсу.',
          'Пломбу срезали на Складе B в 05:09.',
        ],
        contradictionSummary:
          'Маршрут через холодильную камеру невозможен — магнитный замок оставался закрытым.',
      },
      zh: {
        title: '19 号码头货箱调包案',
        location: '19 号货运码头',
        stolenItem: '密封琥珀货箱',
        zones: {
          gatehouse: {name: '门岗', detail: 'PIER-CAM 05:04 记录班组入场。'},
          warehouse: {name: 'B 号仓库', detail: '05:09 封条被剪断。'},
          coldroom: {name: '冷库', detail: '磁力锁 04:50–05:30 未开启。'},
          jetty: {name: '西栈桥', detail: '05:11 听到手推车经过。'},
          crane: {name: '3 号吊机区', detail: 'CRANE-3 在 05:14 拍到手推车。'},
        },
        publicClues: [
          '冷库磁力锁在 04:50 至 05:30 期间从未打开。',
          'B 号仓库货箱封条于 05:09 被剪断。',
          '手推车于 05:14 经西栈桥到达 3 号吊机区。',
        ],
        thiefBriefing:
          '你是盗贼。声称自己 05:10 推车从 B 仓库穿过冷库前往 3 号吊机区。',
        policeBriefing:
          '你是警察。冷库门锁全程闭合，去 3 号吊机区必须走西栈桥。',
        citizenBriefings: [
          '市民：05:13 你在 3 号吊机区清点货箱。',
          '市民：05:11 听到西栈桥上有推车轮声。',
          '市民：05:08 确认冷库绿灯处于锁定状态。',
          '市民：05:09 看到 B 仓库侧门打开。',
        ],
        questions: [
          '冷库门全程未开，你是怎么穿过去的？',
          '05:11 你在西栈桥上吗？',
          '05:09 时你在哪里？',
        ],
        statements: [
          '冷库在 05:30 前一直处于锁闭状态。',
          '手推车是从西栈桥推过去的。',
          '05:09 有人在 B 仓库剪断了封条。',
        ],
        contradictionSummary:
          '声称穿过冷库与磁力锁全程闭合的记录完全矛盾。',
      },
      ja: {
        title: '第19埠頭 貨物すり替え事件',
        location: '第19埠頭ターミナル',
        stolenItem: '封印された琥珀クレート',
        zones: {
          gatehouse: {name: 'ゲート守衛所', detail: '05:04 の入構記録あり。'},
          warehouse: {name: 'B倉庫', detail: '05:09 に封印が切断された。'},
          coldroom: {name: '冷凍室', detail: '05:30 まで磁気ロック継続。'},
          jetty: {name: '西桟橋', detail: '05:11 に台車の音。'},
          crane: {name: '3番クレーン区画', detail: 'CRANE-3 が 05:14 に台車を記録。'},
        },
        publicClues: [
          '冷凍室の磁気ロックは 04:50 から 05:30 まで一度も解除されていない。',
          'B倉庫で 05:09 に木箱の封印が切られた。',
          '05:14 に西桟橋経由で台車が3番クレーンに到達した。',
        ],
        thiefBriefing:
          'あなたは泥棒です。05:10 にB倉庫から冷凍室を通り抜けて3番クレーンへ向かったと言ってください。',
        policeBriefing:
          'あなたは警察です。冷凍室は一度も開いておらず、西桟橋を通るルートしかありません。',
        citizenBriefings: [
          '市民：05:13 に3番クレーン付近にいた。',
          '市民：05:11 に西桟橋で台車の車輪音を聞いた。',
          '市民：05:08 に冷凍室のロックランプを確認した。',
          '市民：05:09 にB倉庫の通用口が開くのを見た。',
        ],
        questions: [
          'ロックされた冷凍室をどうやって通り抜けましたか？',
          '05:11 に西桟橋を通りましたか？',
          '05:09 ごろどこにいましたか？',
        ],
        statements: [
          '冷凍室は 05:30 まで完全に施錠されていました。',
          '台車は西桟橋を通って運ばれました。',
          '05:09 にB倉庫で封印が破られています。',
        ],
        contradictionSummary:
          '冷凍室を通り抜けたという証言は、磁気ロック記録と矛盾します。',
      },
    },
  },
  {
    id: 'clocktower-manuscript',
    code: 'CPC-05',
    difficulty: 'master',
    incidentTime: '14:00 – 14:12',
    zones: [
      {id: 'reading', x: 24, y: 24, w: 165, h: 108, cameraLabel: 'LIB-1'},
      {id: 'archive', x: 218, y: 24, w: 165, h: 108, blindSpot: true},
      {id: 'stair', x: 412, y: 24, w: 144, h: 108, cameraLabel: 'BELFRY'},
      {id: 'reading2', x: 24, y: 164, w: 256, h: 96, cameraLabel: 'CHIME-LOG'},
      {id: 'roof', x: 310, y: 164, w: 246, h: 96, blindSpot: true},
    ],
    corridors: [
      {from: 'reading', to: 'archive', sensorTime: '14:03'},
      {from: 'archive', to: 'stair', sensorTime: '14:07'},
      {from: 'stair', to: 'roof'},
      {from: 'reading', to: 'reading2'},
      {from: 'reading2', to: 'roof', locked: true},
    ],
    cluePins: [
      {id: 'p1', zoneId: 'archive', cx: 300, cy: 74, code: 'E1'},
      {id: 'p2', zoneId: 'stair', cx: 484, cy: 76, code: 'E2'},
      {id: 'p3', zoneId: 'roof', cx: 432, cy: 212, code: 'E3'},
    ],
    alibiArcs: [
      {id: 'a1', from: 'reading2', to: 'roof', suspicious: true},
      {id: 'a2', from: 'archive', to: 'stair'},
    ],
    copy: {
      en: {
        title: 'The Clocktower Manuscript',
        location: 'Old Town Belfry Library',
        stolenItem: '16th-Century Folio',
        zones: {
          reading: {name: 'Reading Hall', detail: 'LIB-1 active; quiet at 14:02.'},
          archive: {name: 'Rare Archive', detail: 'Folio missing at 14:05.'},
          stair: {name: 'Spiral Stair', detail: 'Creak sensor logged steps at 14:07.'},
          reading2: {name: 'Clock Mechanism', detail: 'Bell-hatch bolted shut for repair.'},
          roof: {name: 'Belfry Balcony', detail: 'Parchment ribbon snagged at 14:10.'},
        },
        publicClues: [
          'The Clock Mechanism bell-hatch to the Belfry Balcony was bolted for repairs.',
          'Spiral Stair creak sensor registered hurried steps at 14:07.',
          'A silk ribbon from the folio was found on the Belfry Balcony at 14:10.',
        ],
        thiefBriefing:
          'You are the Thief. Claim you inspected the Clock Mechanism at 14:06 and climbed its bell-hatch directly onto the Belfry Balcony.',
        policeBriefing:
          'You are Police. The Clock Mechanism bell-hatch was bolted shut—the only way up to the Belfry Balcony was via the Spiral Stair.',
        citizenBriefings: [
          'Citizen: You read quietly in Reading Hall until 14:09.',
          'Citizen: You heard the Spiral Stair steps at 14:07.',
          'Citizen: You saw maintenance bolts sealing the Clock Mechanism hatch.',
          'Citizen: You spotted the ribbon fluttering on Belfry Balcony at 14:10.',
        ],
        questions: [
          'How did you climb from the Clock Mechanism when the hatch was bolted?',
          'Did you hear or step on the Spiral Stair at 14:07?',
          'Who entered Rare Archive before 14:05?',
        ],
        statements: [
          'The bell-hatch was bolted shut for repairs.',
          'Only the Spiral Stair connects up to the Belfry Balcony.',
          'The 14:07 stair steps link Archive to Balcony.',
        ],
        contradictionSummary:
          'Climbing through the Clock Mechanism bell-hatch was impossible because it was bolted shut.',
      },
      es: {
        title: 'El Manuscrito de la Torre del Reloj',
        location: 'Biblioteca del Campanario',
        stolenItem: 'Folio del Siglo XVI',
        zones: {
          reading: {name: 'Sala de Lectura', detail: 'LIB-1 sin incidencias a las 14:02.'},
          archive: {name: 'Archivo Raro', detail: 'Folio desaparecido a las 14:05.'},
          stair: {name: 'Escalera de Caracol', detail: 'Sensor de peldaños a las 14:07.'},
          reading2: {name: 'Maquinaria del Reloj', detail: 'Trampilla atornillada por obras.'},
          roof: {name: 'Balcón del Campanario', detail: 'Cinta del folio a las 14:10.'},
        },
        publicClues: [
          'La trampilla de la Maquinaria al Balcón estuvo atornillada por reparaciones.',
          'El sensor de la Escalera de Caracol detectó pasos rápidos a las 14:07.',
          'Se halló una cinta del manuscrito en el Balcón a las 14:10.',
        ],
        thiefBriefing:
          'Eres el Caco. Di que revisaste la Maquinaria del Reloj a las 14:06 y subiste por su trampilla directa al Balcón.',
        policeBriefing:
          'Eres Policía. La trampilla estaba atornillada; solo se sube al Balcón por la Escalera de Caracol.',
        citizenBriefings: [
          'Ciudadano: Estuviste leyendo en Sala de Lectura hasta las 14:09.',
          'Ciudadano: Oíste pisadas rápidas en la Escalera a las 14:07.',
          'Ciudadano: Viste los tornillos sellando la trampilla de la Maquinaria.',
          'Ciudadano: Divisaste la cinta en el Balcón a las 14:10.',
        ],
        questions: [
          '¿Cómo pasaste por una trampilla atornillada por obras?',
          '¿Subiste por la Escalera de Caracol a las 14:07?',
          '¿Dónde estabas cuando faltó el folio a las 14:05?',
        ],
        statements: [
          'La trampilla de la Maquinaria no podía abrirse.',
          'El único ascenso al Balcón es la Escalera de Caracol.',
          'Las pisadas de las 14:07 conectan Archivo y Balcón.',
        ],
        contradictionSummary:
          'Subir por la trampilla de la Maquinaria es falso porque estaba atornillada por reparaciones.',
      },
      fr: {
        title: 'Le Manuscrit du Beffroi',
        location: 'Bibliothèque du Beffroi',
        stolenItem: 'In-folio du XVIe siècle',
        zones: {
          reading: {name: 'Salle de Lecture', detail: 'LIB-1 calme à 14:02.'},
          archive: {name: 'Archives Rares', detail: 'Manquant à 14:05.'},
          stair: {name: 'Escalier en Colimaçon', detail: 'Pas enregistrés à 14:07.'},
          reading2: {name: 'Mécanisme Horloge', detail: 'Trappe vissée pour travaux.'},
          roof: {name: 'Balcon du Beffroi', detail: 'Ruban retrouvé à 14:10.'},
        },
        publicClues: [
          'La trappe du Mécanisme vers le Balcon était vissée.',
          'Capteur de l’Escalier déclenché à 14:07.',
          'Ruban retrouvé sur le Balcon à 14:10.',
        ],
        thiefBriefing:
          'Voleur : dites être monté au Balcon par la trappe du Mécanisme à 14:06.',
        policeBriefing:
          'Police : la trappe était vissée ; seul l’Escalier mène au Balcon.',
        citizenBriefings: [
          'Citoyen : Lecture calme en Salle jusqu’à 14:09.',
          'Citoyen : Pas rapides sur l’Escalier à 14:07.',
          'Citoyen : Vous avez vu les vis bloquant la trappe.',
          'Citoyen : Ruban repéré sur le Balcon à 14:10.',
        ],
        questions: [
          'Comment ouvrir une trappe vissée ?',
          'Avez-vous monté l’Escalier à 14:07 ?',
          'Où étiez-vous à 14:05 ?',
        ],
        statements: [
          'La trappe du Mécanisme était condamnée.',
          'Seul l’Escalier en Colimaçon monte au Balcon.',
          'Les pas de 14:07 accusent le trajet Archives–Balcon.',
        ],
        contradictionSummary:
          'Passer par la trappe du Mécanisme est impossible car elle était vissée.',
      },
      de: {
        title: 'Das Manuskript vom Uhrturm',
        location: 'Glockenturm-Bibliothek',
        stolenItem: 'Foliant aus dem 16. Jh.',
        zones: {
          reading: {name: 'Lesesaal', detail: 'LIB-1 ruhig um 14:02.'},
          archive: {name: 'Rara-Archiv', detail: 'Foliant weg um 14:05.'},
          stair: {name: 'Wendeltreppe', detail: 'Stufensensor um 14:07.'},
          reading2: {name: 'Uhrwerk', detail: 'Luke wegen Reparatur verschraubt.'},
          roof: {name: 'Turmbalkon', detail: 'Band entdeckt um 14:10.'},
        },
        publicClues: [
          'Die Luke vom Uhrwerk zum Turmbalkon war fest verschraubt.',
          'Stufensensor der Wendeltreppe meldete Schritte um 14:07.',
          'Ein Seidenband lag um 14:10 auf dem Turmbalkon.',
        ],
        thiefBriefing:
          'Dieb: Behaupte, du bist um 14:06 durch die Uhrwerk-Luke auf den Turmbalkon geklettert.',
        policeBriefing:
          'Polizei: Die Luke war verschraubt; nur die Wendeltreppe führt hoch.',
        citizenBriefings: [
          'Bürger: Bis 14:09 im Lesesaal gelesen.',
          'Bürger: Schnelle Schritte auf der Wendeltreppe um 14:07 gehört.',
          'Bürger: Verschraubte Luke im Uhrwerk gesehen.',
          'Bürger: Band auf dem Balkon um 14:10 entdeckt.',
        ],
        questions: [
          'Wie bist du durch die verschraubte Luke geklettert?',
          'Warst du um 14:07 auf der Wendeltreppe?',
          'Wo warst du um 14:05?',
        ],
        statements: [
          'Die Uhrwerk-Luke war fest verschraubt.',
          'Nur die Wendeltreppe führt zum Balkon.',
          '14:07 verbindet Archiv und Balkon.',
        ],
        contradictionSummary:
          'Die Uhrwerk-Luke war verschraubt—dieser Aufstieg ist ausgeschlossen.',
      },
      pt: {
        title: 'O Manuscrito da Torre do Relógio',
        location: 'Biblioteca do Campanário',
        stolenItem: 'Fólio do Século XVI',
        zones: {
          reading: {name: 'Salão de Leitura', detail: 'LIB-1 calmo às 14:02.'},
          archive: {name: 'Arquivo Raro', detail: 'Fólio sumiu às 14:05.'},
          stair: {name: 'Escada Caracol', detail: 'Sensor de passos às 14:07.'},
          reading2: {name: 'Mecanismo do Relógio', detail: 'Alçapão aparafusado.'},
          roof: {name: 'Varanda do Sino', detail: 'Fita achada às 14:10.'},
        },
        publicClues: [
          'O alçapão do Mecanismo para a Varanda estava aparafusado para reparos.',
          'A Escada Caracol registrou passos rápidos às 14:07.',
          'Uma fita do livro apareceu na Varanda às 14:10.',
        ],
        thiefBriefing:
          'Ladrão: diga que subiu à Varanda pelo alçapão do Mecanismo às 14:06.',
        policeBriefing:
          'Polícia: o alçapão estava aparafusado; só a Escada Caracol leva à Varanda.',
        citizenBriefings: [
          'Cidadão: Você leu no Salão até 14:09.',
          'Cidadão: Ouviu passos na Escada Caracol às 14:07.',
          'Cidadão: Viu os parafusos fechando o alçapão.',
          'Cidadão: Viu a fita na Varanda às 14:10.',
        ],
        questions: [
          'Como passou por um alçapão aparafusado?',
          'Subiu a Escada Caracol às 14:07?',
          'Onde estava às 14:05?',
        ],
        statements: [
          'O alçapão estava fechado com parafusos.',
          'Só a Escada Caracol sobe à Varanda.',
          'Os passos das 14:07 ligam Arquivo e Varanda.',
        ],
        contradictionSummary:
          'Subir pelo alçapão do Mecanismo é impossível porque estava aparafusado.',
      },
      ar: {
        title: 'مخطوطة برج الساعة',
        location: 'مكتبة البرج القديمة',
        stolenItem: 'مخطوطة القرن السادس عشر',
        zones: {
          reading: {name: 'قاعة القراءة', detail: 'هدوء حتى 14:02.'},
          archive: {name: 'الأرشيف النادر', detail: 'فقدت المخطوطة 14:05.'},
          stair: {name: 'الدرج الحلزوني', detail: 'سجل الحساس خطوات 14:07.'},
          reading2: {name: 'آلية الساعة', detail: 'الفتحة مثبتة بمسامير للصيانة.'},
          roof: {name: 'شرفة الجرس', detail: 'شريط حريري عُثر عليه 14:10.'},
        },
        publicClues: [
          'فتحة الصعود من آلية الساعة للشرفة كانت مغلقة بمسامير الصيانة.',
          'سجل الدرج الحلزوني خطوات مسرعة عند 14:07.',
          'وُجد شريط المخطوطة في شرفة الجرس عند 14:10.',
        ],
        thiefBriefing:
          'أنت اللص. ادّعِ أنك صعدت من آلية الساعة عبر الفتحة مباشرة للشرفة عند 14:06.',
        policeBriefing:
          'الشرطة: فتحة آلية الساعة مغلقة بمسامير؛ الصعود للشرفة يتم فقط عبر الدرج الحلزوني.',
        citizenBriefings: [
          'مواطن: كنت تقرأ في القاعة حتى 14:09.',
          'مواطن: سمعت خطوات سريعة على الدرج الحلزوني 14:07.',
          'مواطن: رأيت مسامير الصيانة تغلق فتحة السقف.',
          'مواطن: رأيت الشريط على الشرفة عند 14:10.',
        ],
        questions: [
          'كيف صعدت من فتحة مغلقة بمسامير؟',
          'هل صعدت الدرج الحلزوني عند 14:07؟',
          'أين كنت عند 14:05؟',
        ],
        statements: [
          'فتحة آلية الساعة مقفلة للصيانة.',
          'الدرج الحلزوني هو الطريق الوحيد للشرفة.',
          'خطوات 14:07 تربط الأرشيف بالشرفة.',
        ],
        contradictionSummary:
          'ادعاء الصعود من فتحة آلية الساعة مستحيل لأنها كانت مثبتة بالمسامير.',
      },
      hi: {
        title: 'क्लॉकटावर पांडुलिपि चोरी',
        location: 'ओल्ड टाउन बेलफ़्री लाइब्रेरी',
        stolenItem: '16वीं सदी की पांडुलिपि',
        zones: {
          reading: {name: 'रीडिंग हॉल', detail: '14:02 पर सब शांत था।'},
          archive: {name: 'दुर्लभ आर्काइव', detail: '14:05 पर ग्रंथ गायब।'},
          stair: {name: 'घुमावदार सीढ़ी', detail: '14:07 पर कदमों का सेंसर बजा।'},
          reading2: {name: 'घड़ी तंत्र', detail: 'मरम्मत के लिए हैच बोल्ट से बंद था।'},
          roof: {name: 'बेलफ़्री बालकनी', detail: '14:10 पर रेशमी रिबन मिला।'},
        },
        publicClues: [
          'घड़ी तंत्र से बालकनी का हैच मरम्मत के कारण बोल्ट से बंद था।',
          'घुमावदार सीढ़ी पर 14:07 पर तेज कदम रिकॉर्ड हुए।',
          '14:10 पर बेलफ़्री बालकनी में पांडुलिपि का रिबन मिला।',
        ],
        thiefBriefing:
          'आप चोर हैं। कहें कि आप 14:06 पर घड़ी तंत्र के हैच से सीधे बालकनी पर चढ़े।',
        policeBriefing:
          'पुलिस: घड़ी तंत्र का हैच बंद था—बालकनी जाने का रास्ता केवल घुमावदार सीढ़ी है।',
        citizenBriefings: [
          'नागरिक: 14:09 तक रीडिंग हॉल में थे।',
          'नागरिक: 14:07 पर घुमावदार सीढ़ी पर कदमों की आवाज़ सुनी।',
          'नागरिक: घड़ी तंत्र के हैच पर लगे बोल्ट देखे थे।',
          'नागरिक: 14:10 पर बालकनी में रिबन देखा।',
        ],
        questions: [
          'बोल्ट से बंद हैच से आप ऊपर कैसे गए?',
          'क्या आप 14:07 पर घुमावदार सीढ़ी पर थे?',
          '14:05 पर आप कहां थे?',
        ],
        statements: [
          'घड़ी तंत्र का हैच मरम्मत के लिए बंद था।',
          'केवल घुमावदार सीढ़ी ही बालकनी तक जाती है।',
          '14:07 के कदम आर्काइव और बालकनी को जोड़ते हैं।',
        ],
        contradictionSummary:
          'घड़ी तंत्र के हैच से चढ़ने का दावा बोल्ट लगे होने के कारण झूठा है।',
      },
      ru: {
        title: 'Рукопись часовой башни',
        location: 'Библиотека колокольни',
        stolenItem: 'Фолиант XVI века',
        zones: {
          reading: {name: 'Читальный зал', detail: 'LIB-1 спокойна в 14:02.'},
          archive: {name: 'Редкий архив', detail: 'Пропажа в 14:05.'},
          stair: {name: 'Винтовая лестница', detail: 'Датчик шагов в 14:07.'},
          reading2: {name: 'Часовой механизм', detail: 'Люк завинчен на ремонт.'},
          roof: {name: 'Балкон колокольни', detail: 'Лента найдена в 14:10.'},
        },
        publicClues: [
          'Люк от часового механизма на балкон был завинчен болтами на время ремонта.',
          'Датчик винтовой лестницы сработал в 14:07.',
          'Лента от рукописи найдена на балконе в 14:10.',
        ],
        thiefBriefing:
          'Вы Вор. Скажите, что в 14:06 поднялись на балкон прямо через люк часового механизма.',
        policeBriefing:
          'Полиция: люк механизма был завинчен; наверх вела только винтовая лестница.',
        citizenBriefings: [
          'Горожанин: Вы читали в зале до 14:09.',
          'Горожанин: Слышали быстрые шаги по винтовой лестнице в 14:07.',
          'Горожанин: Видели болты на люке механизма.',
          'Горожанин: Заметили ленту на балконе в 14:10.',
        ],
        questions: [
          'Как вы открыли завинченный люк механизма?',
          'Поднимались ли вы по винтовой лестнице в 14:07?',
          'Где вы были в 14:05?',
        ],
        statements: [
          'Люк часового механизма был наглухо завинчен.',
          'На балкон вела только винтовая лестница.',
          'Шаги в 14:07 связывают архив и балкон.',
        ],
        contradictionSummary:
          'Подъём через люк часового механизма невозможен — он был завинчен на ремонт.',
      },
      zh: {
        title: '钟楼古籍手稿失窃案',
        location: '老城钟楼图书馆',
        stolenItem: '十六世纪古抄本',
        zones: {
          reading: {name: '阅览室', detail: 'LIB-1 在 14:02 一切正常。'},
          archive: {name: '珍本档案馆', detail: '14:05 手稿失踪。'},
          stair: {name: '螺旋楼梯', detail: '14:07 踏步传感器响动。'},
          reading2: {name: '钟表机芯室', detail: '通往露台的检修舱口已栓死。'},
          roof: {name: '钟楼阳台', detail: '14:10 发现书签丝带。'},
        },
        publicClues: [
          '钟表机芯室通往阳台的检修舱口因维修用螺栓锁死。',
          '螺旋楼梯在 14:07 记录到急促脚步声。',
          '14:10 在钟楼阳台栏杆上发现手稿丝带。',
        ],
        thiefBriefing:
          '你是盗贼。声称 14:06 在机芯室检查齿轮，并从检修舱口直接爬上了阳台。',
        policeBriefing:
          '你是警察。检修舱口已被螺栓锁死，去阳台只能走螺旋楼梯。',
        citizenBriefings: [
          '市民：直到 14:09 你都在阅览室看书。',
          '市民：14:07 听到螺旋楼梯传来急促脚步声。',
          '市民：亲眼看到机芯室舱口被维修螺栓封死。',
          '市民：14:10 看到阳台上飘着丝带。',
        ],
        questions: [
          '螺栓锁死的检修舱口你是怎么爬上去的？',
          '14:07 你走过螺旋楼梯吗？',
          '14:05 珍本丢失时你在哪里？',
        ],
        statements: [
          '钟表机芯室舱口维修栓死，无法通过。',
          '通往钟楼阳台只有螺旋楼梯一条路。',
          '14:07 的脚步声连接了档案馆和阳台。',
        ],
        contradictionSummary:
          '声称从钟表机芯室舱口爬上阳台与螺栓封死的事实矛盾。',
      },
      ja: {
        title: '時計塔の古文書盗難事件',
        location: '旧市街・鐘楼図書館',
        stolenItem: '16世紀の写本',
        zones: {
          reading: {name: '閲覧室', detail: '14:02 まで LIB-1 異常なし。'},
          archive: {name: '貴重書庫', detail: '14:05 に写本が消失。'},
          stair: {name: '螺旋階段', detail: '14:07 に足音センサー作動。'},
          reading2: {name: '時計機構室', detail: '点検のため天井ハッチをボルト固定。'},
          roof: {name: '鐘楼バルコニー', detail: '14:10 に栞のリボンを発見。'},
        },
        publicClues: [
          '時計機構室からバルコニーへの天井ハッチは修理のためボルト固定されていた。',
          '14:07 に螺旋階段のセンサーが急ぎ足を検知した。',
          '14:10 にバルコニーで写本のリボンが見つかった。',
        ],
        thiefBriefing:
          'あなたは泥棒です。14:06 に時計機構室のハッチから直接バルコニーへ上がったと主張してください。',
        policeBriefing:
          'あなたは警察です。機構室のハッチはボルト固定されており、螺旋階段しかバルコニーへ通じていません。',
        citizenBriefings: [
          '市民：14:09 まで閲覧室で静かに読書していた。',
          '市民：14:07 に螺旋階段を駆け上がる音を聞いた。',
          '市民：機構室のハッチがボルトで封鎖されているのを見た。',
          '市民：14:10 にバルコニーでリボンを見つけた。',
        ],
        questions: [
          'ボルト固定されたハッチをどうやって登りましたか？',
          '14:07 に螺旋階段を通りましたか？',
          '14:05 ごろどこにいましたか？',
        ],
        statements: [
          '時計機構室のハッチは修理中で通行不能でした。',
          'バルコニーへ行けるのは螺旋階段だけです。',
          '14:07 の足音が書庫とバルコニーを結びつけます。',
        ],
        contradictionSummary:
          '時計機構室のハッチを通ったという証言は、ボルト固定の事実と矛盾します。',
      },
    },
  },
  {
    id: 'grand-hotel-308',
    code: 'CPC-06',
    difficulty: 'master',
    incidentTime: '23:25 – 23:35',
    zones: [
      {id: 'lobby', x: 24, y: 24, w: 150, h: 108, cameraLabel: 'LIFT-CAM'},
      {id: 'suite', x: 204, y: 24, w: 192, h: 108, blindSpot: true},
      {id: 'laundry', x: 426, y: 24, w: 130, h: 108, cameraLabel: 'CHUTE-3'},
      {id: 'balcony', x: 24, y: 164, w: 256, h: 96, blindSpot: true},
      {id: 'lounge', x: 310, y: 164, w: 246, h: 96, cameraLabel: 'BAR-CAM'},
    ],
    corridors: [
      {from: 'lobby', to: 'suite', sensorTime: '23:26'},
      {from: 'suite', to: 'laundry', sensorTime: '23:31'},
      {from: 'suite', to: 'balcony'},
      {from: 'balcony', to: 'lounge', locked: true},
      {from: 'laundry', to: 'lounge'},
    ],
    cluePins: [
      {id: 'p1', zoneId: 'suite', cx: 300, cy: 74, code: 'E1'},
      {id: 'p2', zoneId: 'laundry', cx: 492, cy: 74, code: 'E2'},
      {id: 'p3', zoneId: 'lounge', cx: 432, cy: 212, code: 'E3'},
    ],
    alibiArcs: [
      {id: 'a1', from: 'balcony', to: 'lounge', suspicious: true},
      {id: 'a2', from: 'suite', to: 'laundry'},
    ],
    copy: {
      en: {
        title: 'Grand Hotel Suite 308',
        location: '3rd Floor, Grand Hotel',
        stolenItem: 'Pearl Cufflink Box',
        zones: {
          lobby: {name: '3rd Lift Lobby', detail: 'LIFT-CAM logged arrival at 23:25.'},
          suite: {name: 'Suite 308', detail: 'Safe left ajar at 23:29.'},
          laundry: {name: 'Laundry Chute', detail: 'Chute hatch opened at 23:31.'},
          balcony: {name: 'Corner Balcony', detail: 'Partition gate locked to Rooftop Lounge.'},
          lounge: {name: 'Rooftop Lounge', detail: 'BAR-CAM saw guest enter at 23:33.'},
        },
        publicClues: [
          'The balcony partition gate to the Rooftop Lounge was chain-locked.',
          'Laundry Chute hatch sensor triggered at 23:31.',
          'BAR-CAM logged an arrival in Rooftop Lounge at 23:33.',
        ],
        thiefBriefing:
          'You are the Thief. Claim you stepped onto the Corner Balcony at 23:30 and walked straight through the balcony gate into Rooftop Lounge.',
        policeBriefing:
          'You are Police. The balcony partition gate was chain-locked—anyone reaching Rooftop Lounge from Suite 308 walked past the Laundry Chute.',
        citizenBriefings: [
          'Citizen: You waited at 3rd Lift Lobby until 23:27.',
          'Citizen: You heard the Laundry Chute clang shut at 23:31.',
          'Citizen: You noticed the heavy chain on the Balcony gate earlier.',
          'Citizen: You ordered tea in Rooftop Lounge at 23:33.',
        ],
        questions: [
          'How did you unlock the chained Balcony partition gate?',
          'Did you pass the Laundry Chute around 23:31?',
          'When did you enter Rooftop Lounge?',
        ],
        statements: [
          'The Balcony gate to the Lounge was chain-locked.',
          'The Laundry Chute corridor is the only path to the Lounge.',
          '23:31 at the Chute matches 23:33 on BAR-CAM.',
        ],
        contradictionSummary:
          'Walking directly from the Balcony to Rooftop Lounge fails because the partition gate was chain-locked.',
      },
      es: {
        title: 'Suite 308 del Gran Hotel',
        location: 'Tercera Planta, Gran Hotel',
        stolenItem: 'Estuche de Gemelos de Perla',
        zones: {
          lobby: {name: 'Vestíbulo Ascensor', detail: 'LIFT-CAM grabó llegada a las 23:25.'},
          suite: {name: 'Suite 308', detail: 'Caja fuerte entreabierta a las 23:29.'},
          laundry: {name: 'Conducto Ropa', detail: 'Compuerta abierta a las 23:31.'},
          balcony: {name: 'Balcón Esquinero', detail: 'Verja al Lounge cerrada con cadena.'},
          lounge: {name: 'Lounge Azotea', detail: 'BAR-CAM registró entrada a las 23:33.'},
        },
        publicClues: [
          'La verja entre el Balcón Esquinero y el Lounge tenía cadena y candado.',
          'El sensor del Conducto de Ropa saltó a las 23:31.',
          'BAR-CAM captó una entrada al Lounge a las 23:33.',
        ],
        thiefBriefing:
          'Eres el Caco. Di que saliste al Balcón Esquinero a las 23:30 y cruzaste directo por su verja al Lounge.',
        policeBriefing:
          'Eres Policía. La verja del Balcón estaba encadenada; desde la Suite 308 solo se llega al Lounge pasando por el Conducto de Ropa.',
        citizenBriefings: [
          'Ciudadano: Esperaste junto al ascensor hasta las 23:27.',
          'Ciudadano: Oíste cerrarse la compuerta del Conducto de Ropa a las 23:31.',
          'Ciudadano: Viste la cadena gruesa en la verja del Balcón.',
          'Ciudadano: Pediste un té en el Lounge a las 23:33.',
        ],
        questions: [
          '¿Cómo cruzaste la verja encadenada del Balcón?',
          '¿Pasaste frente al Conducto de Ropa a las 23:31?',
          '¿A qué hora llegaste al Lounge?',
        ],
        statements: [
          'La verja del Balcón estaba cerrada con cadena.',
          'El paso hacia el Lounge obligaba a cruzar por el Conducto de Ropa.',
          'El ruido de las 23:31 coincide con BAR-CAM a las 23:33.',
        ],
        contradictionSummary:
          'Pasar directo del Balcón al Lounge es falso porque la verja divisoria estaba encadenada.',
      },
      fr: {
        title: 'Suite 308 du Grand Hôtel',
        location: '3e étage, Grand Hôtel',
        stolenItem: 'Coffret de Boutons de Manchette',
        zones: {
          lobby: {name: 'Palier Ascenseur', detail: 'LIFT-CAM à 23:25.'},
          suite: {name: 'Suite 308', detail: 'Coffre entrouvert à 23:29.'},
          laundry: {name: 'Vide-Linge', detail: 'Trappe ouverte à 23:31.'},
          balcony: {name: 'Balcon d’Angle', detail: 'Grille cadenassée vers Lounge.'},
          lounge: {name: 'Salon Toit', detail: 'BAR-CAM à 23:33.'},
        },
        publicClues: [
          'La grille du Balcon vers le Salon était fermée par une chaîne.',
          'Le Vide-Linge s’est ouvert à 23:31.',
          'BAR-CAM filme une entrée au Salon à 23:33.',
        ],
        thiefBriefing:
          'Voleur : dites être passé directement du Balcon au Salon à 23:30.',
        policeBriefing:
          'Police : la grille du Balcon était enchaînée ; seul le couloir du Vide-Linge mène au Salon.',
        citizenBriefings: [
          'Citoyen : Vous étiez au Palier jusqu’à 23:27.',
          'Citoyen : Claquement du Vide-Linge entendu à 23:31.',
          'Citoyen : Chaîne vue sur la grille du Balcon.',
          'Citoyen : Vous étiez au Salon à 23:33.',
        ],
        questions: [
          'Comment ouvrir la grille enchaînée du Balcon ?',
          'Étiez-vous près du Vide-Linge à 23:31 ?',
          'À quelle heure êtes-vous entré au Salon ?',
        ],
        statements: [
          'La grille du Balcon était enchaînée.',
          'Il fallait passer devant le Vide-Linge.',
          '23:31 puis 23:33 tracent le vrai chemin.',
        ],
        contradictionSummary:
          'Passer par le Balcon vers le Salon est impossible à cause de la chaîne.',
      },
      de: {
        title: 'Grand Hotel Suite 308',
        location: '3. Stock, Grand Hotel',
        stolenItem: 'Perlen-Manschettenknöpfe',
        zones: {
          lobby: {name: 'Aufzugshalle', detail: 'LIFT-CAM um 23:25.'},
          suite: {name: 'Suite 308', detail: 'Safe um 23:29 offen.'},
          laundry: {name: 'Wäscheschacht', detail: 'Klappe um 23:31 geöffnet.'},
          balcony: {name: 'Eckbalkon', detail: 'Gitter zur Lounge angekettet.'},
          lounge: {name: 'Dach-Lounge', detail: 'BAR-CAM um 23:33.'},
        },
        publicClues: [
          'Das Trenngitter vom Eckbalkon zur Dach-Lounge war mit einer Kette verschlossen.',
          'Der Wäscheschacht meldete um 23:31 eine Öffnung.',
          'BAR-CAM filmte um 23:33 einen Eintritt.',
        ],
        thiefBriefing:
          'Dieb: Behaupte, du bist um 23:30 über den Eckbalkon direkt in die Dach-Lounge gegangen.',
        policeBriefing:
          'Polizei: Das Balkongitter war angekettet; der Weg führte am Wäscheschacht vorbei.',
        citizenBriefings: [
          'Bürger: Bis 23:27 in der Aufzugshalle.',
          'Bürger: Wäscheschacht um 23:31 gehört.',
          'Bürger: Schwere Kette am Balkongitter gesehen.',
          'Bürger: Um 23:33 Tee in der Lounge bestellt.',
        ],
        questions: [
          'Wie kamst du durch das angekettete Balkongitter?',
          'Warst du um 23:31 am Wäscheschacht?',
          'Wann betratst du die Lounge?',
        ],
        statements: [
          'Das Balkongitter war angekettet.',
          'Nur der Weg am Wäscheschacht führt zur Lounge.',
          '23:31 und 23:33 passen zusammen.',
        ],
        contradictionSummary:
          'Ein direkter Wechsel vom Eckbalkon zur Dach-Lounge war durch die Kette unmöglich.',
      },
      pt: {
        title: 'Suíte 308 do Grand Hotel',
        location: '3º Andar, Grand Hotel',
        stolenItem: 'Caixa de Abotoaduras',
        zones: {
          lobby: {name: 'Hall do Elevador', detail: 'LIFT-CAM às 23:25.'},
          suite: {name: 'Suíte 308', detail: 'Cofre entreaberto às 23:29.'},
          laundry: {name: 'Duto de Roupa', detail: 'Aberto às 23:31.'},
          balcony: {name: 'Sacada de Canto', detail: 'Grade acorrentada ao Lounge.'},
          lounge: {name: 'Lounge Cobertura', detail: 'BAR-CAM às 23:33.'},
        },
        publicClues: [
          'A grade da Sacada para o Lounge estava fechada com corrente.',
          'O Duto de Roupa abriu às 23:31.',
          'BAR-CAM registrou entrada às 23:33.',
        ],
        thiefBriefing:
          'Ladrão: diga que foi direto da Sacada para o Lounge às 23:30.',
        policeBriefing:
          'Polícia: a grade da Sacada estava acorrentada; o único caminho passava pelo Duto de Roupa.',
        citizenBriefings: [
          'Cidadão: Esperou no Hall até 23:27.',
          'Cidadão: Ouviu o Duto de Roupa bater às 23:31.',
          'Cidadão: Viu a corrente na grade da Sacada.',
          'Cidadão: Pediu chá no Lounge às 23:33.',
        ],
        questions: [
          'Como passou pela grade acorrentada da Sacada?',
          'Passou pelo Duto de Roupa às 23:31?',
          'Quando chegou ao Lounge?',
        ],
        statements: [
          'A grade da Sacada tinha corrente.',
          'Só o corredor do Duto leva ao Lounge.',
          '23:31 e 23:33 ligam o Duto ao Lounge.',
        ],
        contradictionSummary:
          'Sair da Sacada direto ao Lounge é impossível pela grade acorrentada.',
      },
      ar: {
        title: 'الجناح 308 في الفندق الكبير',
        location: 'الطابق الثالث، الفندق الكبير',
        stolenItem: 'علبة أزرار اللؤلؤ',
        zones: {
          lobby: {name: 'ردهه المصعد', detail: 'كاميرا 23:25.'},
          suite: {name: 'الجناح 308', detail: 'الخزنة مفتوحة جزئياً 23:29.'},
          laundry: {name: 'مجرى الغسيل', detail: 'فُتح عند 23:31.'},
          balcony: {name: 'الشرفة الجانبية', detail: 'البوابة مقفلة بسلسلة.'},
          lounge: {name: 'صالة السطح', detail: 'كاميرا البار 23:33.'},
        },
        publicClues: [
          'بوابة الشرفة المؤدية لصالة السطح كانت مقفلة بسلسلة.',
          'انطلق حساس مجرى الغسيل عند 23:31.',
          'سجلت كاميرا الصالة دخول شخص عند 23:33.',
        ],
        thiefBriefing:
          'أنت اللص. ادّعِ أنك خرجت للشرفة الجانبية عند 23:30 وعبرت بوابتها مباشرة للصالة.',
        policeBriefing:
          'الشرطة: بوابة الشرفة مقفلة بسلسلة؛ الوصول للصالة يتطلب المرور بمجرى الغسيل.',
        citizenBriefings: [
          'مواطن: كنت في ردهة المصعد حتى 23:27.',
          'مواطن: سمعت صوت مجرى الغسيل عند 23:31.',
          'مواطن: رأيت السلسلة على بوابة الشرفة.',
          'مواطن: كنت في صالة السطح عند 23:33.',
        ],
        questions: [
          'كيف فتحت بوابة الشرفة المقيدة بسلسلة؟',
          'هل مررت بمجرى الغسيل عند 23:31؟',
          'متى دخلت صالة السطح؟',
        ],
        statements: [
          'بوابة الشرفة مقيدة بسلسلة.',
          'ممر مجرى الغسيل هو الطريق الوحيد للصالة.',
          '23:31 و23:33 يطابقان المسار.',
        ],
        contradictionSummary:
          'العبور المباشر من الشرفة للصالة مستحيل بسبب السلسلة الحديدية.',
      },
      hi: {
        title: 'ग्रैंड होटल सुइट 308',
        location: 'तीसरी मंजिल, ग्रैंड होटल',
        stolenItem: 'मोती कफ़लिंक बॉक्स',
        zones: {
          lobby: {name: 'लिफ़्ट लॉबी', detail: '23:25 पर LIFT-CAM रिकॉर्ड।'},
          suite: {name: 'सुइट 308', detail: '23:29 पर तिजोरी खुली मिली।'},
          laundry: {name: 'लॉन्ड्री शूट', detail: '23:31 पर हैच खुला।'},
          balcony: {name: 'कॉर्नर बालकनी', detail: 'लाउंज का गेट जंजीर से बंद।'},
          lounge: {name: 'रूफ़टॉप लाउंज', detail: '23:33 पर BAR-CAM में प्रवेश दिखा।'},
        },
        publicClues: [
          'कॉर्नर बालकनी से रूफ़टॉप लाउंज का गेट जंजीर से बंद था।',
          'लॉन्ड्री शूट सेंसर 23:31 पर सक्रिय हुआ।',
          'BAR-CAM ने 23:33 पर लाउंज में प्रवेश दिखाया।',
        ],
        thiefBriefing:
          'आप चोर हैं। कहें कि 23:30 पर आप कॉर्नर बालकनी के गेट से सीधे रूफ़टॉप लाउंज गए।',
        policeBriefing:
          'पुलिस: बालकनी गेट जंजीर से बंद था—लाउंज जाने के लिए लॉन्ड्री शूट से गुजरना जरूरी था।',
        citizenBriefings: [
          'नागरिक: 23:27 तक आप लिफ़्ट लॉबी में थे।',
          'नागरिक: 23:31 पर लॉन्ड्री शूट बंद होने की आवाज़ सुनी।',
          'नागरिक: बालकनी गेट पर भारी जंजीर लगी देखी।',
          'नागरिक: 23:33 पर लाउंज में चाय ऑर्डर की।',
        ],
        questions: [
          'जंजीर लगे बालकनी गेट से आप कैसे निकले?',
          'क्या आप 23:31 पर लॉन्ड्री शूट के पास थे?',
          'आप लाउंज में कब पहुंचे?',
        ],
        statements: [
          'बालकनी गेट पर जंजीर लगी थी।',
          'लॉन्ड्री शूट गलियारा ही लाउंज का रास्ता है।',
          '23:31 और 23:33 का समय मेल खाता है।',
        ],
        contradictionSummary:
          'बालकनी से सीधे लाउंज जाने का दावा जंजीर से बंद गेट के कारण झूठा है।',
      },
      ru: {
        title: 'Гранд-Отель, люкс 308',
        location: '3-й этаж, Гранд-Отель',
        stolenItem: 'Шкатулка с жемчужными запонками',
        zones: {
          lobby: {name: 'Холл лифта', detail: 'LIFT-CAM в 23:25.'},
          suite: {name: 'Люкс 308', detail: 'Сейф приоткрыт в 23:29.'},
          laundry: {name: 'Бельепровод', detail: 'Люк открыт в 23:31.'},
          balcony: {name: 'Угловой балкон', detail: 'Калитка на цепи к лаунжу.'},
          lounge: {name: 'Лаунж на крыше', detail: 'BAR-CAM в 23:33.'},
        },
        publicClues: [
          'Калитка с балкона в лаунж была заперта на цепь.',
          'Датчик бельепровода сработал в 23:31.',
          'BAR-CAM сняла вход в лаунж в 23:33.',
        ],
        thiefBriefing:
          'Вы Вор. Скажите, что в 23:30 вышли на балкон и через его калитку прошли прямо в лаунж.',
        policeBriefing:
          'Полиция: балконная калитка была на цепи; путь в лаунж шёл мимо бельепровода.',
        citizenBriefings: [
          'Горожанин: Вы ждали у лифта до 23:27.',
          'Горожанин: Слышали стук бельепровода в 23:31.',
          'Горожанин: Видели цепь на балконной калитке.',
          'Горожанин: Заказывали чай в лаунже в 23:33.',
        ],
        questions: [
          'Как вы прошли через калитку с цепью?',
          'Проходили ли вы мимо бельепровода в 23:31?',
          'Во сколько вы вошли в лаунж?',
        ],
        statements: [
          'Балконная калитка была заперта на цепь.',
          'Коридор бельепровода — единственный путь в лаунж.',
          '23:31 и 23:33 точно совпадают.',
        ],
        contradictionSummary:
          'Прямой проход с балкона в лаунж невозможен — калитка была на цепи.',
      },
      zh: {
        title: '大酒店 308 套房失窃案',
        location: '大酒店三楼',
        stolenItem: '珍珠袖扣盒',
        zones: {
          lobby: {name: '电梯厅', detail: 'LIFT-CAM 在 23:25 拍到人影。'},
          suite: {name: '308 套房', detail: '23:29 保险箱半开。'},
          laundry: {name: '布草通道', detail: '23:31 投放口被打开。'},
          balcony: {name: '转角阳台', detail: '通往酒廊的栅栏门锁着铁链。'},
          lounge: {name: '屋顶酒廊', detail: 'BAR-CAM 在 23:33 拍到客人进入。'},
        },
        publicClues: [
          '转角阳台通往屋顶酒廊的隔断门锁着粗铁链。',
          '布草通道口传感器在 23:31 触发。',
          'BAR-CAM 在 23:33 拍到有人进入屋顶酒廊。',
        ],
        thiefBriefing:
          '你是盗贼。声称 23:30 走到转角阳台，直接推开阳台隔断门走进了屋顶酒廊。',
        policeBriefing:
          '你是警察。阳台隔断门锁着铁链，从 308 去屋顶酒廊必须经过布草通道。',
        citizenBriefings: [
          '市民：23:27 前你一直在电梯厅等候。',
          '市民：23:31 听到布草通道盖板哐当合上。',
          '市民：早些时候看到阳台门挂着粗铁链。',
          '市民：23:33 在屋顶酒廊点茶。',
        ],
        questions: [
          '锁着铁链的阳台门你是怎么走过去的？',
          '23:31 你经过布草通道了吗？',
          '你几点进入屋顶酒廊的？',
        ],
        statements: [
          '阳台隔断门锁着铁链，无法直接进入酒廊。',
          '布草通道走廊才是去酒廊的通路。',
          '23:31 和 23:33 的时间点恰好连成一线。',
        ],
        contradictionSummary:
          '声称从阳台直接进入酒廊与门上锁着铁链的事实矛盾。',
      },
      ja: {
        title: 'グランドホテル308号室事件',
        location: 'グランドホテル3階',
        stolenItem: '真珠のカフス箱',
        zones: {
          lobby: {name: 'エレベーターホール', detail: '23:25 に LIFT-CAM 記録。'},
          suite: {name: 'スイート308', detail: '23:29 に金庫が半開き。'},
          laundry: {name: 'リネンシュート', detail: '23:31 に投入口が開いた。'},
          balcony: {name: 'コーナーバルコニー', detail: 'ラウンジ側の柵は鎖で施錠。'},
          lounge: {name: '屋上ラウンジ', detail: '23:33 に BAR-CAM が入室を記録。'},
        },
        publicClues: [
          'バルコニーから屋上ラウンジへの仕切り扉は鎖で施錠されていた。',
          '23:31 にリネンシュートのセンサーが反応した。',
          '23:33 に BAR-CAM がラウンジへの入室を記録した。',
        ],
        thiefBriefing:
          'あなたは泥棒です。23:30 にバルコニーの仕切り扉から直接屋上ラウンジへ入ったと主張してください。',
        policeBriefing:
          'あなたは警察です。バルコニーの扉は鎖で施錠されており、ラウンジへはリネンシュート側を通る必要があります。',
        citizenBriefings: [
          '市民：23:27 までエレベーターホールで待っていた。',
          '市民：23:31 にリネンシュートが閉まる金属音を聞いた。',
          '市民：バルコニーの仕切り扉に太い鎖がかかっていたのを見た。',
          '市民：23:33 に屋上ラウンジでお茶を注文していた。',
        ],
        questions: [
          '鎖で施錠されたバルコニー扉をどうやって通りましたか？',
          '23:31 にリネンシュートの前を通りましたか？',
          '何時に屋上ラウンジへ入りましたか？',
        ],
        statements: [
          'バルコニー側の扉は鎖で完全に閉じられていました。',
          'ラウンジへ抜けるにはリネンシュート前を通るしかありません。',
          '23:31 と 23:33 の記録が一致しています。',
        ],
        contradictionSummary:
          'バルコニーから直接ラウンジへ出たというアリバイは、鎖で施錠された扉と矛盾します。',
      },
    },
  },
];

export function getCaseById(id: string): CaseBlueprint {
  return MYSTERY_CASES.find((c) => c.id === id) ?? MYSTERY_CASES[0];
}
