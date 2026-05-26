import React, { useState, useEffect, useMemo } from 'react';
import { 
  BookOpen, 
  Layers, 
  GitMerge, 
  Edit3, 
  Search, 
  Download, 
  Upload, 
  Plus, 
  Trash2, 
  CheckCircle, 
  HelpCircle, 
  Compass, 
  Eye, 
  Award,
  ChevronRight,
  TrendingUp,
  Info,
  X,
  RefreshCw,
  Sliders,
  Sparkles,
  Users,
  Video,
  FileText,
  ShieldCheck,
  Cpu
} from 'lucide-react';

// Dataset complet fidel curriculum-ului din PDF (36 de Scenarii mapate pe Clasele I-IX)
const INITIAL_CURRICULUM = {
  "1": {
    nivel: "Iniţiere",
    resursa: "4 Scenarii (Unități de învățare) pe an, 4 Lecţii per scenariu.",
    scenarii: [
      {
        id: "S1",
        titlu: "Creez un produs digital",
        nivel: "Iniţiere",
        cs: ["CS1", "CS3"],
        uc: ["UC1.1", "UC1.2", "UC3.1"],
        actiune: "Utilizează instrumente simple prin manipulare ghidată.",
        produs: "Desen digital",
        note: "Se pune accent pe coordonarea ochi-mână și familiarizarea cu interfața grafică elementară (Paint sau aplicații online simple).",
        thread: "creatie",
        lectii: [
          "Primii pași: Echipamentele digitale din jurul meu.",
          "Prietenul meu, mouse-ul: Mişcare și clic.",
          "Lumea culorilor în programul de desen.",
          "Prima mea operă de artă digitală."
        ]
      },
      {
        id: "S6",
        titlu: "Mă organizez digital",
        nivel: "Iniţiere",
        cs: ["CS1", "CS2"],
        uc: ["UC1.2", "UC2.1", "UC2.3"],
        actiune: "Salvează şi deschide fişiere ca rutină de bază.",
        produs: "Folder personalizat",
        note: "Elevii învaţă importanța organizării şi persistentei datelor. Se exersează deschiderea și închiderea corectă a aplicațiilor.",
        thread: "organizare",
        lectii: [
          "Unde se ascunde munca mea? Noţiunea de fişier.",
          "Dulapul cu secrete: Folderul.",
          "\"Salvarea\" - butonul magic pentru a nu pierde munca.",
          "Ordinea în folderul clasei."
        ]
      },
      {
        id: "S9",
        titlu: "Siguranţă digitală",
        nivel: "Iniţiere",
        cs: ["CS1", "CS2"],
        uc: ["UC1.3", "UC2.1", "UC2.3"],
        actiune: "Recunoaște situații sigure și aplică reguli de bază.",
        produs: "Poster cu reguli de siguranță",
        note: "Focus pe prevenţie și pe formarea unui comportament responsabil. \"Regula degetului mare\" (discută cu un adult) este centrală.",
        thread: "siguranta",
        lectii: [
          "Identitatea mea digitală: Cine sunt eu online?",
          "Prieteni reali vs. Personaje virtuale.",
          "Reguli de aur pentru timpul petrecut la ecran.",
          "Cer ajutorul când văd ceva ciudat!"
        ]
      },
      {
        id: "S4",
        titlu: "Creez un mesaj",
        nivel: "Iniţiere",
        cs: ["CS3"],
        uc: ["UC3.1", "UC3.2"],
        actiune: "Transmite un mesaj simplu prin comunicare ghidată.",
        produs: "Mesaj/Felicitare digitală",
        note: "Introducerea conceptului de comunicare mediată tehnologic. Se încurajează exprimarea emoțiilor prin emoji și instrumente grafice simple.",
        thread: "creatie",
        lectii: [
          "Ce este un mesaj digital?",
          "Căutăm literele numelui pe tastatură.",
          "Spunem \"Salut!\" prin imagini şi simboluri (Emoji).",
          "Felicitarea digitală pentru un prieten."
        ]
      }
    ]
  },
  "2": {
    nivel: "Dezvoltare (predominant) / Inițiere (pentru căutare)",
    resursa: "4 Scenarii pe an, 4 Lecţii per scenariu.",
    scenarii: [
      {
        id: "S1",
        titlu: "Creez un produs digital",
        nivel: "Dezvoltare",
        cs: ["CS1", "CS3"],
        uc: ["UC1.1", "UC3.1"],
        actiune: "Creează document simplu; combină text + imagine.",
        produs: "Document ilustrat",
        note: "Se folosesc editori de text simplificați. Accentul cade pe relația vizuală dintre mesajul scris și imaginea care îl susţine.",
        thread: "creatie",
        lectii: [
          "Documentul digital: Textul şi imaginea prieteni.",
          "Cum inserăm o imagine într-o pagină.",
          "Scriem cuvinte și le schimbăm hainele (formatare text).",
          "Povestea mea ilustrată."
        ]
      },
      {
        id: "S2",
        titlu: "Caut informaţii",
        nivel: "Iniţiere",
        cs: ["CS1"],
        uc: ["UC1.1", "UC1.2"],
        actiune: "Caută informații simple; selectare ghidată.",
        produs: "Colecţie de informaţii",
        note: "Elevii învață că nu tot ce este pe internet este util. Se exersează \"Copy-Paste\" (doar pentru imagini la acest nivel) utilizând Kiddle sau SafeSearch.",
        thread: "cautare",
        lectii: [
          "Internetul: O bibliotecă uriaşă.",
          "Cuvintele magice pentru căutare (cuvinte-cheie).",
          "Alegem pozele şi informaţiile potrivite.",
          "Colecţia clasei: \"Curiozităţi despre animale\"."
        ]
      },
      {
        id: "S4",
        titlu: "Creez un mesaj",
        nivel: "Dezvoltare",
        cs: ["CS3"],
        uc: ["UC3.1", "UC3.2"],
        actiune: "Creează poster; exprimare vizuală.",
        produs: "Poster digital",
        note: "Se pot folosi aplicații de tip tablă virtuală sau utilitare grafice simple (Canva for Education sau Paint 3D).",
        thread: "creatie",
        lectii: [
          "Ce este un poster și de ce îl folosim?",
          "Culori, forme și mesaje care atrag atenția.",
          "Aranjarea elementelor pentru un impact vizual.",
          "Posterul meu: \"Să protejăm natura!\"."
        ]
      },
      {
        id: "S9",
        titlu: "Siguranţă digitală",
        nivel: "Dezvoltare",
        cs: ["CS1"],
        uc: ["UC1.3"],
        actiune: "Aplică reguli; aplicare contextuală.",
        produs: "Ghid de siguranţă",
        note: "Se utilizează scenarii ipotetice pentru ca elevii să identifice comportamentele corect vs. incorecte.",
        thread: "siguranta",
        lectii: [
          "Parola: Cheia secretă a lumii mele digitale.",
          "Neticheta: Cum vorbim frumos cu ceilalţi online.",
          "Timpul la ecran: Când e prea mult?",
          "Ghidul de siguranţă al micului explorator digital."
        ]
      }
    ]
  },
  "3": {
    nivel: "Iniţiere / Dezvoltare (conform scenariului)",
    resursa: "4 Scenarii pe an, 4 Lecţii per scenariu.",
    scenarii: [
      {
        id: "S2",
        titlu: "Caut informaţii",
        nivel: "Dezvoltare",
        cs: ["CS1"],
        uc: ["UC1.1", "UC1.2"],
        actiune: "Formulează întrebări; căutare autonomă.",
        produs: "Mini-raport digital",
        note: "Elevii trec de la căutarea de imagini la căutarea de răspunsuri la întrebări specifice (\"De ce?\", \"Cum?\"). Navigare autonomă în browser.",
        thread: "cautare",
        lectii: [
          "Arta de a întreba: Cum formulăm întrebări de căutare.",
          "Navigarea autonomă: Utilizarea browserului.",
          "Exploratori în biblioteca digitală: Selectarea surselor sigure.",
          "Prima mea cercetare online."
        ]
      },
      {
        id: "S3",
        titlu: "Colaborez",
        nivel: "Iniţiere",
        cs: ["CS3"],
        uc: ["UC3.2"],
        actiune: "Lucrează în echipă; colaborare asistată.",
        produs: "Document/Prezentare comună",
        note: "Se introduce conceptul de \"lucru în timp real\". Învățătorul monitorizează interacțiunile pentru a asigura un climat pozitiv.",
        thread: "colaborare",
        lectii: [
          "Ce înseamnă să lucrăm împreună online?",
          "Spaţiul comun de lucru (Documente partajate).",
          "Scriem şi desenăm în echipă: Regulile grupului.",
          "Proiectul nostru colectiv: \"Enciclopedia clasei\"."
        ]
      },
      {
        id: "S5",
        titlu: "Gândesc logic și secvenţial",
        nivel: "Iniţiere",
        cs: ["CS2", "CS3"],
        uc: ["UC2.1", "UC2.2", "UC3.3"],
        actiune: "Structurare logică",
        produs: "Algoritm ilustrat / ghid procedural",
        note: "Scenariu prerechizit pentru Informatică; dezvoltă logică secvenţială fără programare explicită.",
        thread: "algoritmi",
        lectii: [
          "Ordinea acţiunilor şi instrucţiunile pas cu pas.",
          "Secvențe și algoritmi din viața cotidiană.",
          "Identificarea și corectarea erorilor într-o secvență.",
          "Crearea unei instrucţiuni / proceduri logice."
        ]
      },
      {
        id: "S8",
        titlu: "Verific informaţii",
        nivel: "Iniţiere",
        cs: ["CS1"],
        uc: ["UC1.1", "UC1.3"],
        actiune: "Compară informaţii; evaluare de bază.",
        produs: "Fişă de analiză/Checklist",
        note: "Dezvoltarea spiritului critic timpuriu. Elevii învaţă să nu accepte prima informaţie găsită fără o minimă verificare.",
        thread: "siguranta",
        lectii: [
          "Detectivul de adevăr: Este totul real pe internet?",
          "Comparaţia surselor: Două site-uri, aceeaşi poveste?",
          "Elemente de bază: Cine a scris? Când a scris?",
          "Jurnalul verificării: \"Am aflat că e adevărat pentru că...\"."
        ]
      }
    ]
  },
  "4": {
    nivel: "Consolidare / Dezvoltare / Inițiere (pentru teme noi)",
    resursa: "4 Scenarii pe an, 4 Lecţii per scenariu.",
    scenarii: [
      {
        id: "S1",
        titlu: "Creez un produs digital",
        nivel: "Consolidare",
        cs: ["CS1", "CS3"],
        uc: ["UC1.1", "UC1.2", "UC3.1"],
        actiune: "Rafinează și personalizează produse complexe.",
        produs: "Proiect multimedia interactiv",
        note: "Elevii nu mai fac doar simple slide-uri, ci creează un flux informaţional coerent, integrând sunet, video și hiperlink-uri.",
        thread: "creatie",
        lectii: [
          "Arhitectura unei prezentări multimedia.",
          "Integrarea sunetului și a elementelor video.",
          "Interactivitate: Butoane și hiperlink-uri.",
          "Design și estetică în produsul digital final."
        ]
      },
      {
        id: "S3",
        titlu: "Colaborez",
        nivel: "Dezvoltare",
        cs: ["CS3"],
        uc: ["UC3.2"],
        actiune: "Coordonează și contribuie în spații partajate.",
        produs: "Revistă digitală a clasei",
        note: "Se pune accent pe abilităţile soft: cum oferim feedback constructiv în timp real fără a jigni și cum acceptăm modificările.",
        thread: "colaborare",
        lectii: [
          "Roluri în echipa digitală (Lider, Editor, Cercetător).",
          "Partajarea și gestionarea drepturilor de acces.",
          "Comentarii şi feedback constructiv în timp real.",
          "Finalizarea şi publicarea lucrării colective."
        ]
      },
      {
        id: "S7",
        titlu: "Folosesc AI",
        nivel: "Iniţiere",
        cs: ["CS1"],
        uc: ["UC1.1", "UC1.2", "UC1.3"],
        actiune: "Utilizează critic instrumente de tip IA.",
        produs: "Galerie de imagini/poveşti generate cu IA",
        note: "Elevii învață noţiunea de \"prompt\" (comandă) și importanța verificării rezultatului produs de un algoritm.",
        thread: "algoritmi",
        lectii: [
          "Ce este și ce nu este IA? (Exemple din viaţa de zi cu zi).",
          "Interacțiunea cu asistenţii virtuali prin prompt-uri.",
          "Generarea creativă: De la idei la imagini/text.",
          "Siguranţă și etică: De ce nu trebuie să credem tot ce spune IA?"
        ]
      },
      {
        id: "S10",
        titlu: "Proiect comunitar",
        nivel: "Iniţiere",
        cs: ["CS2", "CS3"],
        uc: ["UC2.1", "UC2.2", "UC2.4", "UC3.1", "UC3.3"],
        actiune: "Planificare și aplicare",
        produs: "Soluţie / campanie digitală pentru comunitate",
        note: "Include explicit logică procedurală și planificare secvenţială ca prerechizit pentru Informatică.",
        thread: "colaborare",
        lectii: [
          "Identificarea unei probleme simple din comunitate / școală.",
          "Planificarea soluției și secvențierea paşilor de implementare.",
          "Realizarea produsului / soluției digitale.",
          "Prezentarea soluției și reflecție asupra impactului."
        ]
      }
    ]
  },
  "5": {
    nivel: "Dezvoltare / Inițiere (pentru competențe complexe)",
    resursa: "4 Scenarii pe an, 4 Lecţii per scenariu.",
    scenarii: [
      {
        id: "S2",
        titlu: "Caut informaţii",
        nivel: "Dezvoltare",
        cs: ["CS1"],
        uc: ["UC1.1", "UC1.2", "UC1.3"],
        actiune: "Analizează surse şi evaluează critic conţinutul.",
        produs: "Raport de cercetare documentat",
        note: "Se trece de la simpla căutare la cercetarea etică. Elevii învaţă să utilizeze bibliografii digitale simple și să citeze sursele.",
        thread: "cautare",
        lectii: [
          "Navigarea inteligentă: Motoare de căutare vs. Baze de date.",
          "Tehnici avansate de filtrare a informației.",
          "Drepturile de autor: Citarea surselor digitale.",
          "Evaluarea credibilităţii: Ştiri false vs. Fapte."
        ]
      },
      {
        id: "S3",
        titlu: "Colaborez",
        nivel: "Dezvoltare",
        cs: ["CS2", "CS3"],
        uc: ["UC2.1", "UC2.2", "UC2.3", "UC3.3"],
        actiune: "Creează produse comune prin coordonare digitală.",
        produs: "Prezentare colaborativă pe o temă de mediu",
        note: "Accentul cade pe managementul proiectului în grup şi pe utilizarea responsabilă a spațiului de stocare \"Cloud\".",
        thread: "colaborare",
        lectii: [
          "Ecosisteme digitale de colaborare (Cloud storage).",
          "Editarea simultană: Fluxul de lucru în echipă.",
          "Comunicarea asincronă: Comentarii şi sugestii.",
          "Securitatea conturilor partajate."
        ]
      },
      {
        id: "S5",
        titlu: "Produc conţinut video digital",
        nivel: "Dezvoltare",
        cs: ["CS2", "CS3"],
        uc: ["UC2.1", "UC2.2", "UC2.3", "UC3.1", "UC3.3"],
        actiune: "Producţie multimedia",
        produs: "Video digital scurt",
        note: "Introducere timpurie în video production; bază pentru storytelling digital ulterior în gimnaziu.",
        thread: "creatie",
        lectii: [
          "Tipuri de conţinut și structura video narativă.",
          "Planificarea storyboard-ului şi scenariului video.",
          "Captură și editare video de bază.",
          "Export, publicare şi reflecție asupra produsului."
        ]
      },
      {
        id: "S10",
        titlu: "Proiect comunitar",
        nivel: "Iniţiere",
        cs: ["CS2", "CS3"],
        uc: ["UC2.1", "UC2.2", "UC2.3", "UC3.1", "UC3.2", "UC3.3"],
        actiune: "Creează un proiect simplu cu aplicare practică.",
        produs: "Mini-proiect de impact social",
        note: "Scenariu integrator. Tehnologia este pusă în serviciul comunităţii, dezvoltând spiritul antreprenorial și civic.",
        thread: "colaborare",
        lectii: [
          "Identificarea unei nevoi în școală (ex: reciclarea).",
          "Planificarea digitală a soluţiei: Etape și resurse.",
          "Realizarea prototipului digital (site simplu, video sau aplicaţie).",
          "Prezentarea şi promovarea proiectului în comunitate."
        ]
      }
    ]
  },
  "6": {
    nivel: "Consolidare / Dezvoltare",
    resursa: "4 Scenarii pe an, 4 Lecţii per scenariu.",
    scenarii: [
      {
        id: "S2",
        titlu: "Caut informaţii",
        nivel: "Consolidare",
        cs: ["CS1"],
        uc: ["UC1.1", "UC1.2", "UC1.3"],
        actiune: "Analizează surse şi realizează evaluarea critică.",
        produs: "Raport de cercetare documentat",
        note: "Se pune accent pe transformarea informaţiei brute în cunoaştere prin sintetizare și citare etică cu evitarea plagiatului.",
        thread: "cautare",
        lectii: [
          "Strategii de căutare: Operatori logici (AND, OR, NOT).",
          "Navigarea în baze de date academice şi biblioteci digitale.",
          "Etica informaţiei: Citarea corectă și evitarea plagiatului.",
          "Sinteza informaţiilor din surse multiple."
        ]
      },
      {
        id: "S3",
        titlu: "Colaborez",
        nivel: "Consolidare",
        cs: ["CS3"],
        uc: ["UC3.2"],
        actiune: "Creează produse comune prin coordonarea echipei.",
        produs: "Prezentare colaborativă multimedia",
        note: "Elevii sunt responsabili de întregul ciclu de viață al unui proiect de grup, inclusiv istoricul versiunilor și rezolvarea conflictelor tehnice.",
        thread: "colaborare",
        lectii: [
          "Managementul proiectelor în echipă: Roluri și responsabilități.",
          "Fluxul de lucru colaborativ: Istoricul versiunilor și recuperarea datelor.",
          "Rezolvarea conflictelor tehnice şi editoriale în documente partajate.",
          "Finalizarea și prezentarea sincronă a proiectului."
        ]
      },
      {
        id: "S8",
        titlu: "Verific informaţii",
        nivel: "Consolidare",
        cs: ["CS1"],
        uc: ["UC1.1", "UC1.2", "UC1.3"],
        actiune: "Realizează analiza critică a conţinutului media.",
        produs: "Dosar de analiză media (Fact-check)",
        note: "Elevii devin \"detectivi digitali\", învăţând să identifice mecanismele de dezinformare moderne, bias-ul mediatic și manipularea prin Deepfake.",
        thread: "siguranta",
        lectii: [
          "Anatomia unei știri: Fapte vs. Opinii.",
          "Bias-ul mediatic: Cum ne influențează algoritmii opinia.",
          "Tehnici de fact-checking: Căutarea inversă de imagini şi verificarea sursei.",
          "Deepfake şi conținutul manipulat: Semne de avertizare."
        ]
      },
      {
        id: "S6",
        titlu: "Mă organizez digital",
        nivel: "Dezvoltare",
        cs: ["CS1", "CS2"],
        uc: ["UC1.2", "UC1.3", "UC2.2"],
        actiune: "Gestionează resurse pentru eficienţă digitală.",
        produs: "Sistem de organizare a portofoliului digital",
        note: "Management strategic al resurselor și al identității digitale. Regula de backup 3-2-1 și automatizarea sarcinilor simple.",
        thread: "organizare",
        lectii: [
          "Sisteme de fişiere avansate: Etichetare (tagging) și indexare.",
          "Strategii de backup: Regula 3-2-1 pentru siguranţa datelor.",
          "Gestionarea amprentei digitale: Setări de confidenţialitate.",
          "Automatizarea sarcinilor simple: Calendare și memento-uri inteligente."
        ]
      }
    ]
  },
  "7": {
    nivel: "Avansat / Dezvoltare",
    resursa: "4 Scenarii pe an, 4 Lecţii per scenariu.",
    scenarii: [
      {
        id: "S4",
        titlu: "Creez campanii media persuasive",
        nivel: "Avansat",
        cs: ["CS2", "CS3"],
        uc: ["UC2.1", "UC2.2", "UC3.1", "UC3.2", "UC3.3"],
        actiune: "Proiectare strategică de comunicare",
        produs: "Campanie media digitală",
        note: "Repoziționează scenariul spre comunicare strategică și persuasiune digitală. Elimină suprapunerea cu producția video simplă.",
        thread: "creatie",
        lectii: [
          "Principiile persuasiunii în comunicarea digitală și publicul-ţintă.",
          "Analiza campaniilor media: structură, mesaj, branding și impact vizual.",
          "Proiectarea unei campanii media digitale (vizual + text + call-to-action).",
          "Publicarea, prezentarea şi evaluarea impactului mesajului persuasiv."
        ]
      },
      {
        id: "S5",
        titlu: "Produc conţinut video digital",
        nivel: "Avansat",
        cs: ["CS2", "CS3"],
        uc: ["UC2.1", "UC2.2", "UC2.3", "UC3.1", "UC3.3"],
        actiune: "Producţie multimedia avansată",
        produs: "Material video editat complet",
        note: "Consolidarea și aprofundarea competențelor de producție video: limbaj cinematografic, compoziție vizuală, editare și post-producție.",
        thread: "creatie",
        lectii: [
          "Limbaj cinematografic și tehnici de filmare.",
          "Captură video avansată și compoziție vizuală.",
          "Editare video și post-producţie (tranzitii, efecte, audio).",
          "Publicare și analiză critică a produsului video."
        ]
      },
      {
        id: "S7",
        titlu: "Folosesc AI",
        nivel: "Dezvoltare",
        cs: ["CS1"],
        uc: ["UC1.1", "UC1.2", "UC1.3"],
        actiune: "Generează conţinut prin prompt-uri; validează output-ul.",
        produs: "Produs digital asistat de IA (validat şi corectat)",
        note: "Elevii nu preiau \"ca atare\" rezultatul IA, ci îl supun unui proces de critică, rafinare (Prompt Engineering) și ajustare manuală.",
        thread: "algoritmi",
        lectii: [
          "Ingineria prompt-urilor (Prompt Engineering): Tehnici de rafinare.",
          "Colaborarea om-IA în procesul creativ.",
          "Detectarea bias-ului și a limitelor modelelor lingvistice.",
          "Validarea rezultatelor AI: Triangularea informației."
        ]
      },
      {
        id: "S8",
        titlu: "Verific informaţii",
        nivel: "Avansat",
        cs: ["CS1"],
        uc: ["UC1.1", "UC1.2", "UC1.3"],
        actiune: "Analizează media; detectează tentative de manipulare.",
        produs: "Analiză critică de caz (Dosar Fake News)",
        note: "Elevii devin analiști media capabili să demonteze știri false complexe, analizând metadatele, amprentele digitale și conținutul synthetic Deepfake.",
        thread: "siguranta",
        lectii: [
          "Fenomenul Fake News: Manipulare psihologică și algoritmică.",
          "Verificarea avansată: Analiza metadatelor şi a amprentei digitale.",
          "Recunoaşterea conținutului sintetic (Deepfake).",
          "Raportul de integritate: Documentarea adevărului online."
        ]
      }
    ]
  },
  "8": {
    nivel: "Avansat / Consolidare / Dezvoltare",
    resursa: "4 Scenarii pe an, 4 Lecţii per scenariu.",
    scenarii: [
      {
        id: "S5",
        titlu: "Editez şi optimizez imagini digitale",
        nivel: "Consolidare",
        cs: ["CS2", "CS3"],
        uc: ["UC2.1", "UC2.2", "UC2.3", "UC3.1", "UC3.3"],
        actiune: "Prelucrare și optimizare vizuală",
        produs: "Portofoliu de imagini editate / material vizual optimizat",
        note: "Acoperă integral manipularea imaginilor pe straturi, decupaje complexe, corecție de culoare/lumină și optimizări pentru print, web și social media.",
        thread: "creatie",
        lectii: [
          "Principii de compoziție vizuală și estetică digitală.",
          "Tehnici de editare imagine: crop, resize, corecție culoare/lumină.",
          "Manipulare și compoziție avansată: straturi, decupare, integrare elemente.",
          "Optimizarea imaginilor pentru contexte diferite (print, web, social media)."
        ]
      },
      {
        id: "S7",
        titlu: "Folosesc AI",
        nivel: "Avansat",
        cs: ["CS1"],
        uc: ["UC1.1", "UC1.2", "UC1.3"],
        actiune: "Utilizează AI critic; evaluare output.",
        produs: "Produs AI complex (Prototip/Aplicație)",
        note: "Se trece la nivel de expertiză: cum învață mașinile, crearea de conținut complex multimodal (text-video-audio) și auditul etic al soluțiilor (bias, copyright).",
        thread: "algoritmi",
        lectii: [
          "Arhitecturi AI: Cum învață maşinile (prezentare generală).",
          "Crearea de conţinut complex prin integrare multimodală (text-video-audio).",
          "Auditul etic al soluțiilor AI: Bias, copyright şi responsabilitate.",
          "Evaluarea critică a output-ului: Ajustarea erorilor algoritmice."
        ]
      },
      {
        id: "S8",
        titlu: "Verific informaţii",
        nivel: "Avansat",
        cs: ["CS1"],
        uc: ["UC1.1", "UC1.2", "UC1.3"],
        actiune: "Validează informaţii; triangulare surse.",
        produs: "Raport critic de integritate informaţională",
        note: "Elevii analizează campanii de dezinformare la scară largă, înțelegând algoritmii de recomandare și bulele de filtrare prin tehnici de investigație jurnalistică.",
        thread: "siguranta",
        lectii: [
          "Triangularea surselor: Tehnici de investigaţie jurnalistică.",
          "Verificarea datelor statistice și a graficelor manipulate.",
          "Analiza algoritmilor de recomandare și a bulelor de filtrare.",
          "Raportul de integritate: Deconstrucția unei campanii de dezinformare."
        ]
      },
      {
        id: "S10",
        titlu: "Proiect comunitar",
        nivel: "Dezvoltare",
        cs: ["CS2", "CS3"],
        uc: ["UC2.1", "UC2.2", "UC2.3", "UC3.1", "UC3.2", "UC3.3"],
        actiune: "Creează proiect cu impact social.",
        produs: "Proiect digital comunitar implementat",
        note: "Proiectul trebuie să aibă o finalitate practică: o aplicație de reciclare, un site pentru un adăpost local sau o campanie de digital literacy.",
        thread: "colaborare",
        lectii: [
          "Analiza nevoilor sociale prin instrumente digitale (sondaje, data mining).",
          "Designul soluţiei: Prototiparea rapidă (UI/UX).",
          "Implementarea și testarea cu utilizatori reali.",
          "Pitch-ul proiectului: Comunicarea impactului social."
        ]
      }
    ]
  },
  "9": {
    nivel: "Expert (școlar) / Avansat",
    resursa: "4 Scenarii pe an, 4 Lecţii per scenariu.",
    scenarii: [
      {
        id: "S2",
        titlu: "Caut informații",
        nivel: "Avansat",
        cs: ["CS1"],
        uc: ["UC1.1", "UC1.2", "UC1.3"],
        actiune: "Realizează cercetare și integrare surse.",
        produs: "Lucrare digitală de cercetare",
        note: "Pregătește elevul pentru rigoarea academică: surse primare/secundare, baze de date globale, etică academică și management bibliografic (Zotero, Mendeley).",
        thread: "cautare",
        lectii: [
          "Metodologia cercetării digitale: Surse primare și secundare.",
          "Sinteza datelor complexe din baze de date globale.",
          "Etica academică și managementul bibliografiei digitale.",
          "Redactarea lucrărilor digitale de complexitate ridicată."
        ]
      },
      {
        id: "S7",
        titlu: "Utilizez AI pentru creație și cercetare",
        nivel: "Expert",
        cs: ["CS1", "CS3"],
        uc: ["UC1.1", "UC1.2", "UC1.3", "UC3.1", "UC3.3"],
        actiune: "Integrare critică AI",
        produs: "Produs complex asistat de AI digital",
        note: "Utilizare avansată și critică a IA ca partener creativ și de cercetare. Se face auditul etic și validarea critică a output-ului în procese complexe.",
        thread: "algoritmi",
        lectii: [
          "Strategii avansate de prompting pentru cercetare și creație multimodală.",
          "Utilizarea AI pentru generarea şi rafinarea conținutului academic și creativ.",
          "Validarea critică, auditul etic și verificarea output-ului AI.",
          "Integrarea responsabilă a AI în procese de lucru complexe și prezentarea rezultatelor."
        ]
      },
      {
        id: "S5",
        titlu: "Automatizez şi optimizez fluxuri digitale",
        nivel: "Avansat",
        cs: ["CS1", "CS2", "CS3"],
        uc: ["UC1.2", "UC1.3", "UC2.2", "UC2.4", "UC3.1", "UC3.3"],
        actiune: "Optimizare și automatizare",
        produs: "Flux digital automatizat/sistem de productivitate",
        note: "Orientat spre competențe reale de productivitate profesională. Automatizarea sarcinilor repetitive prin unelte digitale și agenți IA.",
        thread: "organizare",
        lectii: [
          "Identificarea sarcinilor repetitive și a fluxurilor digitale.",
          "Utilizarea instrumentelor de automatizare și AI pentru productivitate.",
          "Proiectarea unui flux digital optimizat.",
          "Evaluarea eficienţei şi impactului automatizării."
        ]
      },
      {
        id: "S10",
        titlu: "Proiect comunitar",
        nivel: "Avansat",
        cs: ["CS2", "CS3"],
        uc: ["UC2.1", "UC2.2", "UC2.3", "UC3.1", "UC3.2", "UC3.3"],
        actiune: "Dezvoltă proiect complet cu impact real.",
        produs: "Proiect final de impact comunitar (Lucrare de Absolvire)",
        note: "Lucrarea de absolvire a ciclului gimnazial. Soluție durabilă cu beneficiari reali, indicatori de performanță și plan de sustenabilitate.",
        thread: "colaborare",
        lectii: [
          "Antreprenoriat social digital: De la idee la implementare.",
          "Gestionarea resurselor și a echipei în proiecte de impact.",
          "Comunicarea strategică și promovarea proiectului în spațiul public.",
          "Sustenabilitatea proiectului digital: Cum continuă după noi?"
        ]
      }
    ]
  }
};

// Definiții fire tematice (Threads) pentru Harta Spirală
const THREADS = {
  "cautare": {
    label: "Căutare & Cercetare Informațională",
    color: "from-blue-500 to-cyan-500",
    bgClass: "bg-blue-50 text-blue-700 border-blue-200",
    icon: Search,
    desc: "Evoluția de la navigarea asistată și căutarea de imagini simple la cercetare științifică, baze de date globale și management bibliografic automat."
  },
  "creatie": {
    label: "Creare de Conținut, Design & Media",
    color: "from-purple-500 to-pink-500",
    bgClass: "bg-purple-50 text-purple-700 border-purple-200",
    icon: Video,
    desc: "Tranziția de la desene elementare în Paint la documente hibride, machete interactive, editare video cinematografică și optimizare vizuală pe straturi."
  },
  "siguranta": {
    label: "Gândire Critică, Fact-Checking & Securitate",
    color: "from-rose-500 to-orange-500",
    bgClass: "bg-rose-50 text-rose-700 border-rose-200",
    icon: ShieldCheck,
    desc: "De la igiena digitală de bază (parole, reguli de ecran) la detectarea manipulărilor algoritmice, fact-checking avansat, metadate și combaterea Deepfake."
  },
  "colaborare": {
    label: "Colaborare Online & Proiecte Comunitare",
    color: "from-emerald-500 to-teal-500",
    bgClass: "bg-emerald-50 text-emerald-700 border-emerald-200",
    icon: Users,
    desc: "Progresul de la lucrul simplu pe documente partajate la coordonarea complexă de proiecte cu roluri definite, pitch-uri sociale și soluții de impact real."
  },
  "algoritmi": {
    label: "Algoritmi, Automatizare & Inteligență Artificială",
    color: "from-amber-500 to-yellow-600",
    bgClass: "bg-amber-50 text-amber-700 border-amber-200",
    icon: Cpu,
    desc: "Parcursul de la logică algoritmică unplugged la utilizarea critică a AI, ingineria prompturilor, automatizarea fluxurilor de lucru și evaluarea etică a algoritmilor."
  }
};

export default function App() {
  const [curriculum, setCurriculum] = useState(() => {
    const saved = localStorage.getItem('smart_curriculum_data');
    return saved ? JSON.parse(saved) : INITIAL_CURRICULUM;
  });

  const [activeTab, setActiveTab] = useState('spiral'); // 'spiral' | 'explorer' | 'competencies'
  const [selectedClass, setSelectedClass] = useState('1');
  const [selectedThread, setSelectedThread] = useState('cautare');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Stări pentru editare / modal
  const [editingScenario, setEditingScenario] = useState(null); // { clasaId, index }
  const [showAddModal, setShowAddModal] = useState(false);
  const [newScenario, setNewScenario] = useState({
    id: 'S1',
    titlu: '',
    nivel: 'Dezvoltare',
    cs: ['CS1'],
    uc: [],
    actiune: '',
    produs: '',
    note: '',
    thread: 'creatie',
    lectii: ['', '', '', '']
  });

  // Salvare automată în localStorage
  useEffect(() => {
    localStorage.setItem('smart_curriculum_data', JSON.stringify(curriculum));
  }, [curriculum]);

  // Resetare la datele din fabrică
  const handleResetData = () => {
    if (window.confirm("Sigur doriți să resetați toate modificările la valorile implicite din curriculum oficial?")) {
      setCurriculum(INITIAL_CURRICULUM);
    }
  };

  // Export JSON
  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(curriculum, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "Curriculum_Educație_Digitală_Personalizat.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Import JSON
  const handleImportJSON = (e) => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        if (parsed["1"] && parsed["1"].scenarii) {
          setCurriculum(parsed);
          alert("Curriculum importat cu succes!");
        } else {
          alert("Formatul fisierului nu este valid.");
        }
      } catch (err) {
        alert("Eroare la citirea fișierului.");
      }
    };
  };

  // Actualizare Scenariu existent
  const handleUpdateScenario = (clasaId, index, updatedScenariu) => {
    setCurriculum(prev => {
      const copy = { ...prev };
      copy[clasaId].scenarii[index] = updatedScenariu;
      return copy;
    });
    setEditingScenario(null);
  };

  // Adăugare Scenariu Nou
  const handleAddScenario = (clasaId) => {
    setCurriculum(prev => {
      const copy = { ...prev };
      copy[clasaId].scenarii.push({
        ...newScenario,
        lectii: newScenario.lectii.filter(l => l.trim() !== '')
      });
      return copy;
    });
    setShowAddModal(false);
    // Reset form
    setNewScenario({
      id: 'S1',
      titlu: '',
      nivel: 'Dezvoltare',
      cs: ['CS1'],
      uc: [],
      actiune: '',
      produs: '',
      note: '',
      thread: 'creatie',
      lectii: ['', '', '', '']
    });
  };

  // Ștergere Scenariu
  const handleDeleteScenario = (clasaId, index) => {
    if (window.confirm("Sigur doriți să ștergeți acest scenariu din curriculum?")) {
      setCurriculum(prev => {
        const copy = { ...prev };
        copy[clasaId].scenarii.splice(index, 1);
        return copy;
      });
    }
  };

  // Căutare globală în curriculum (lecții, titluri, produse)
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const results = [];
    const query = searchQuery.toLowerCase();
    
    Object.entries(curriculum).forEach(([clasaId, data]) => {
      data.scenarii.forEach((sc, idx) => {
        const matchTitlu = sc.titlu.toLowerCase().includes(query);
        const matchProdus = sc.produs.toLowerCase().includes(query);
        const matchLectii = sc.lectii.some(l => l.toLowerCase().includes(query));
        const matchNotes = sc.note.toLowerCase().includes(query);
        
        if (matchTitlu || matchProdus || matchLectii || matchNotes) {
          results.push({ clasaId, scenariu: sc, index: idx });
        }
      });
    });
    return results;
  }, [curriculum, searchQuery]);

  // Mapare transversală a competențelor (care scenarii vizează CS1, CS2, CS3)
  const competenciesMapping = useMemo(() => {
    const map = {
      CS1: { title: "Explorare și Gândire Critică", desc: "Identificarea echipamentelor, căutarea, evaluarea critică a informațiilor și gestionarea resurselor digitale.", items: [] },
      CS2: { title: "Proces Tehnologic și Gândire Computațională", desc: "Planificarea salvării datelor, rezolvarea de probleme, algoritmi, programare și utilizarea responsabilă a tehnologiilor.", items: [] },
      CS3: { title: "Utilizare Creativă și Colaborare", desc: "Crearea de documente, imagini, clipuri video, campanii media, colaborarea în echipă și rezolvarea de probleme comunitare.", items: [] }
    };

    Object.entries(curriculum).forEach(([clasaId, data]) => {
      data.scenarii.forEach((sc, idx) => {
        sc.cs.forEach(csKey => {
          if (map[csKey]) {
            map[csKey].items.push({ clasaId, scenariu: sc, index: idx });
          }
        });
      });
    });
    return map;
  }, [curriculum]);

  // Generare noduri pentru Harta Spirală în funcție de firul tematic ales
  const spiralNodes = useMemo(() => {
    const nodes = [];
    // Ordonăm clasele cronologic 1 -> 9
    const sortedClasses = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
    
    sortedClasses.forEach((clasaId) => {
      const matchScenarii = curriculum[clasaId]?.scenarii.filter(sc => sc.thread === selectedThread) || [];
      matchScenarii.forEach((sc, idx) => {
        nodes.push({
          clasaId,
          scenariu: sc,
          index: curriculum[clasaId].scenarii.indexOf(sc), // indexul original din listă
          nivelClasa: curriculum[clasaId].nivel
        });
      });
    });
    return nodes;
  }, [curriculum, selectedThread]);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans antialiased">
      
      {/* Top Header */}
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur sticky top-0 z-40 px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-600 rounded-xl text-white shadow-lg shadow-indigo-500/20">
            <Compass className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight text-white">Educație Digitală Smart</h1>
              <span className="text-xs bg-indigo-500/20 text-indigo-300 font-medium px-2 py-0.5 rounded-full border border-indigo-500/30">v2.5 (1-9)</span>
            </div>
            <p className="text-xs text-slate-400">Curriculum de Educație Tehnologică și TIC • Hărți Interactive de Dezvoltare în Spirală</p>
          </div>
        </div>

        {/* Căutare Globală Rapidă */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Caută lecții, competențe, produse..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-4 py-2 text-sm text-slate-100 focus:outline-none focus:border-indigo-500 placeholder-slate-500 transition-colors"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="absolute right-3 top-3 text-slate-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Control Config & Export */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
          <button 
            onClick={handleExportJSON} 
            className="flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold rounded-lg transition-all"
            title="Exportă planul de învățământ editat"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Exportă</span>
          </button>
          
          <label className="flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold rounded-lg cursor-pointer transition-all">
            <Upload className="w-3.5 h-3.5" />
            <span>Importă</span>
            <input type="file" accept=".json" onChange={handleImportJSON} className="hidden" />
          </label>

          <button 
            onClick={handleResetData}
            className="p-2 bg-slate-800 hover:bg-red-900/30 text-slate-400 hover:text-red-400 rounded-lg transition-all"
            title="Resetează la planul oficial"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex-1 flex flex-col">
        
        {/* Navigation Tabs */}
        <div className="bg-slate-950 px-6 py-2 border-b border-slate-800/80 flex items-center justify-between gap-4 overflow-x-auto">
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => { setActiveTab('spiral'); setSearchQuery(''); }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold tracking-wide transition-all ${
                activeTab === 'spiral' 
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/10' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <GitMerge className="w-4 h-4" />
              <span>Harta Dezvoltării în Spirală</span>
            </button>
            <button
              onClick={() => { setActiveTab('explorer'); setSearchQuery(''); }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold tracking-wide transition-all ${
                activeTab === 'explorer' 
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/10' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Explorator pe Clase</span>
            </button>
            <button
              onClick={() => { setActiveTab('competencies'); setSearchQuery(''); }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold tracking-wide transition-all ${
                activeTab === 'competencies' 
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/10' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>Matrice de Competențe</span>
            </button>
          </div>

          <div className="text-xs text-slate-500 font-medium hidden lg:block">
            Sistem interactiv bazat pe Curriculum-ul de Educație Digitală aprobat
          </div>
        </div>

        {/* Main Workspace Area */}
        <div className="flex-1 p-6 lg:p-8 max-w-[1600px] mx-auto w-full">
          
          {/* CĂUTARE GLOBALĂ ÎN DERULARE */}
          {searchQuery && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Search className="w-5 h-5 text-indigo-400" />
                  <span>Rezultatele căutării pentru: "{searchQuery}"</span>
                </h2>
                <span className="text-xs bg-slate-800 text-slate-300 px-3 py-1 rounded-full">
                  {searchResults.length} potriviri găsite
                </span>
              </div>

              {searchResults.length === 0 ? (
                <div className="text-center py-12 bg-slate-950 rounded-2xl border border-slate-800">
                  <HelpCircle className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                  <p className="text-slate-400 text-lg">Nu am găsit rezultate potrivite.</p>
                  <p className="text-slate-500 text-sm mt-1">Încearcă alte cuvinte-cheie, cum ar fi: "AI", "Paint", "Zotero", "Deepfake".</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {searchResults.map(({ clasaId, scenariu, index }) => (
                    <ScenarioCard 
                      key={`${clasaId}-${scenariu.id}-${index}`}
                      clasaId={clasaId}
                      scenariu={scenariu}
                      index={index}
                      onEdit={() => setEditingScenario({ clasaId, index })}
                      onDelete={() => handleDeleteScenario(clasaId, index)}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* VIZUALIZARE TAB 1: SPIRALĂ (MINDFUL SPIRAL FLOW) */}
          {!searchQuery && activeTab === 'spiral' && (
            <div className="space-y-8">
              
              {/* Selector Fir Tematic */}
              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800/80 space-y-4">
                <div>
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-indigo-400" />
                    <span>Alege o axă conceptuală de dezvoltare în spirală</span>
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">Urmărește modul în care concepte similare cresc în profunzime și complexitate de la Clasa I la Clasa a IX-a.</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                  {Object.entries(THREADS).map(([key, value]) => {
                    const ThreadIcon = value.icon;
                    const isSelected = selectedThread === key;
                    return (
                      <button
                        key={key}
                        onClick={() => setSelectedThread(key)}
                        className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between gap-3 ${
                          isSelected 
                            ? 'bg-slate-900 border-indigo-500 shadow-lg shadow-indigo-500/5 ring-1 ring-indigo-500/30' 
                            : 'bg-slate-950 border-slate-800 hover:border-slate-700 hover:bg-slate-900/50'
                        }`}
                      >
                        <div className={`p-2 w-fit rounded-lg bg-gradient-to-br ${value.color} text-white`}>
                          <ThreadIcon className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-white tracking-wide leading-snug">{value.label}</p>
                          <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider block mt-1">
                            {key === 'cautare' ? 'S2' : key === 'creatie' ? 'S1, S4, S5' : key === 'siguranta' ? 'S8, S9' : key === 'colaborare' ? 'S3, S10' : 'S5, S7'}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 flex items-start gap-3">
                  <Info className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Fir conceptual selectat</h4>
                    <p className="text-sm text-slate-400 mt-1 leading-relaxed">{THREADS[selectedThread].desc}</p>
                  </div>
                </div>
              </div>

              {/* HARTA SPIRALĂ MARE (VIRTUAL TIMELINE GRAPH) */}
              <div className="bg-slate-950/80 rounded-2xl border border-slate-800 p-6 overflow-hidden">
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-4 mb-8">
                  <div>
                    <h3 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">
                      <Layers className="w-4.5 h-4.5 text-indigo-400" />
                      <span>Harta Spirală: {THREADS[selectedThread].label}</span>
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">Conexiunile de-a lungul claselor cu nivelul de achiziție corespunzător</p>
                  </div>

                  <div className="flex gap-4 text-xs font-semibold">
                    <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Inițiere</span>
                    <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span> Dezvoltare</span>
                    <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span> Consolidare</span>
                    <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span> Avansat / Expert</span>
                  </div>
                </div>

                {spiralNodes.length === 0 ? (
                  <div className="text-center py-16 text-slate-500">
                    <HelpCircle className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p className="text-base font-semibold">Nu sunt înregistrate scenarii pe acest fir conceptual.</p>
                    <p className="text-xs mt-1">Poți adăuga un scenariu nou din panoul Explorator și să-i asociezi acest fir tematic.</p>
                  </div>
                ) : (
                  <div className="relative min-h-[500px] flex flex-col justify-between py-4 select-none">
                    {/* Linia dinamică de conexiune (Background flow vector line) */}
                    <div className="absolute left-1/2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-indigo-500/20 via-purple-500/30 to-indigo-500/10 -translate-x-1/2 hidden md:block" />

                    <div className="space-y-12 relative z-10">
                      {spiralNodes.map((node, idx) => {
                        const isEven = idx % 2 === 0;
                        const levelColors = {
                          "Iniţiere": "bg-emerald-500 text-emerald-950 border-emerald-400/20",
                          "Dezvoltare": "bg-blue-500 text-blue-950 border-blue-400/20",
                          "Consolidare": "bg-indigo-500 text-indigo-950 border-indigo-400/20",
                          "Avansat": "bg-purple-500 text-purple-950 border-purple-400/20",
                          "Expert": "bg-pink-500 text-pink-950 border-pink-400/20",
                          "Expert (școlar)": "bg-pink-500 text-pink-950 border-pink-400/20",
                          "Expert (școlar) / Avansat": "bg-pink-500 text-pink-950 border-pink-400/20"
                        };

                        const currentLevel = node.scenariu.nivel || node.nivelClasa;
                        const levelBadgeColor = levelColors[currentLevel] || "bg-indigo-500 text-indigo-950 border-indigo-400/20";

                        return (
                          <div key={`${node.clasaId}-${node.scenariu.id}-${idx}`} className={`flex flex-col md:flex-row items-center gap-6 md:gap-0 ${isEven ? 'md:flex-row-reverse' : ''}`}>
                            
                            {/* Cardul propriu-zis (Stânga sau Dreapta) */}
                            <div className="w-full md:w-[45%] flex justify-center">
                              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-slate-700/80 transition-all duration-300 shadow-md relative w-full group hover:shadow-xl hover:shadow-indigo-500/[0.02]">
                                <div className="flex justify-between items-start gap-4">
                                  <div>
                                    <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest block mb-1">Clasa a {node.clasaId}-a ({node.scenariu.id})</span>
                                    <h4 className="text-base font-extrabold text-white group-hover:text-indigo-300 transition-colors">{node.scenariu.titlu}</h4>
                                  </div>
                                  <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border ${levelBadgeColor}`}>
                                    {currentLevel}
                                  </span>
                                </div>

                                <div className="my-4 space-y-2">
                                  <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800/80">
                                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block">Produs Final</span>
                                    <p className="text-xs font-bold text-emerald-400 mt-0.5">{node.scenariu.produs}</p>
                                  </div>
                                  <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800/80">
                                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block">Lecții de referință</span>
                                    <ul className="list-decimal list-inside text-[11px] text-slate-400 mt-1 space-y-1">
                                      {node.scenariu.lectii.slice(0, 4).map((l, lIdx) => (
                                        <li key={lIdx} className="truncate" title={l}>{l}</li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>

                                <div className="border-t border-slate-800/80 pt-3 flex items-center justify-between">
                                  <div className="flex gap-1.5">
                                    {node.scenariu.cs.map(comp => (
                                      <span key={comp} className="text-[9px] font-bold bg-slate-800 border border-slate-700 text-slate-300 px-1.5 py-0.5 rounded" title={comp}>
                                        {comp}
                                      </span>
                                    ))}
                                  </div>
                                  <button 
                                    onClick={() => setEditingScenario({ clasaId: node.clasaId, index: node.index })}
                                    className="text-xs font-semibold text-indigo-400 hover:text-white flex items-center gap-1 transition-colors"
                                  >
                                    <Edit3 className="w-3.5 h-3.5" />
                                    <span>Modifică</span>
                                  </button>
                                </div>
                              </div>
                            </div>

                            {/* Centrul Hărții (Indicatorul Clasa pe Spirală) */}
                            <div className="w-full md:w-[10%] flex justify-center relative">
                              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white font-extrabold flex items-center justify-center border-2 border-slate-950 shadow-lg scale-110 relative z-20">
                                {node.clasaId}
                              </div>
                            </div>

                            {/* Detaliu / Notă explicativă (Oglinda Cardului în format descriptiv) */}
                            <div className="w-full md:w-[45%] text-left px-6">
                              <div className="bg-slate-900/30 border border-dashed border-slate-800 rounded-2xl p-4">
                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Acțiune Dominantă & Note Metodologice</span>
                                <p className="text-xs font-medium text-slate-300 leading-relaxed italic">"{node.scenariu.actiune}"</p>
                                <p className="text-xs text-slate-500 leading-relaxed mt-2 font-medium">{node.scenariu.note}</p>
                              </div>
                            </div>

                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* VIZUALIZARE TAB 2: EXPLORATOR PE CLASE (DETAILED CLASS MATRIX) */}
          {!searchQuery && activeTab === 'explorer' && (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              
              {/* Panou Selector Clase (Sidebar-ul Exploratorului) */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800/80 h-fit lg:sticky lg:top-24 space-y-3">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest px-2">Nivel de Școlaritate</h3>
                
                <div className="space-y-1">
                  {Object.keys(curriculum).map((clasaId) => {
                    const scCount = curriculum[clasaId].scenarii.length;
                    const isSelected = selectedClass === clasaId;
                    return (
                      <button
                        key={clasaId}
                        onClick={() => setSelectedClass(clasaId)}
                        className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold transition-all ${
                          isSelected 
                            ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/10' 
                            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-white' : 'bg-slate-700'}`} />
                          <span>Clasa a {clasaId}-a</span>
                        </div>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${isSelected ? 'bg-indigo-700 text-white' : 'bg-slate-900 text-slate-400'}`}>
                          {scCount} u.î.
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="pt-3 border-t border-slate-800">
                  <button 
                    onClick={() => {
                      setNewScenario(prev => ({ ...prev, id: `S${curriculum[selectedClass].scenarii.length + 1}` }));
                      setShowAddModal(true);
                    }}
                    className="w-full py-2.5 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-400 hover:text-indigo-300 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Adaugă Unitate Nouă</span>
                  </button>
                </div>
              </div>

              {/* Panoul cu Scenarii ale Clasei Selectate */}
              <div className="lg:col-span-3 space-y-6">
                
                {/* Meta Clasă */}
                <div className="bg-gradient-to-r from-slate-950 to-slate-900 p-6 rounded-2xl border border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h2 className="text-xl font-bold text-white">Curriculum Clasa a {selectedClass}-a</h2>
                    <p className="text-xs text-slate-400 mt-1">
                      Nivel recomandat de dezvoltare curriculară: <strong className="text-indigo-400">{curriculum[selectedClass].nivel}</strong>
                    </p>
                  </div>
                  <div className="bg-slate-900 border border-slate-800 px-4 py-3 rounded-xl flex items-center gap-2">
                    <Info className="w-4 h-4 text-indigo-400 shrink-0" />
                    <span className="text-xs text-slate-300 font-medium">{curriculum[selectedClass].resursa}</span>
                  </div>
                </div>

                {/* Gridul cu Scenarii */}
                {curriculum[selectedClass].scenarii.length === 0 ? (
                  <div className="text-center py-16 bg-slate-950 rounded-2xl border border-slate-800">
                    <HelpCircle className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                    <p className="text-slate-400 text-lg">Nu sunt scenarii în această clasă.</p>
                    <p className="text-xs text-indigo-400 mt-2 cursor-pointer hover:underline" onClick={() => setShowAddModal(true)}>Apasă aici pentru a adăuga primul scenariu.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {curriculum[selectedClass].scenarii.map((scenariu, index) => (
                      <ScenarioCard 
                        key={`${selectedClass}-${scenariu.id}-${index}`}
                        clasaId={selectedClass}
                        scenariu={scenariu}
                        index={index}
                        onEdit={() => setEditingScenario({ clasaId: selectedClass, index })}
                        onDelete={() => handleDeleteScenario(selectedClass, index)}
                      />
                    ))}
                  </div>
                )}

              </div>
            </div>
          )}

          {/* VIZUALIZARE TAB 3: MATRICE DE COMPETENȚE (COMPETENCY VIEW) */}
          {!searchQuery && activeTab === 'competencies' && (
            <div className="space-y-8">
              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Award className="w-5 h-5 text-indigo-400" />
                  <span>Matricea Transversală de Competențe Specifice (CS)</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Identifică rapid cum sunt distribuite cele 3 competențe fundamentale (concomitent cu unitățile lor de competență specifice - UC) în scenariile educaționale.
                </p>
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                {Object.entries(competenciesMapping).map(([key, value]) => (
                  <div key={key} className="bg-slate-950/80 rounded-2xl border border-slate-800 p-5 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                        <div>
                          <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">{key}</span>
                          <h4 className="text-base font-extrabold text-white mt-0.5">{value.title}</h4>
                        </div>
                        <span className="text-xs bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 px-2.5 py-0.5 rounded-full font-bold">
                          {value.items.length} scenarii
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed mb-4">{value.desc}</p>

                      <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                        {value.items.map(({ clasaId, scenariu, index }) => (
                          <div 
                            key={`${clasaId}-${scenariu.id}-${index}`}
                            className="p-3 bg-slate-900 border border-slate-800/80 rounded-xl hover:border-slate-700 transition-all flex items-start justify-between gap-3"
                          >
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] font-extrabold bg-slate-800 text-indigo-300 px-1.5 py-0.5 rounded border border-slate-700">
                                  Clasa a {clasaId}-a
                                </span>
                                <span className="text-[10px] font-bold text-emerald-400">{scenariu.id}</span>
                              </div>
                              <h5 className="text-xs font-bold text-slate-200 mt-1.5">{scenariu.titlu}</h5>
                              <span className="text-[10px] text-slate-500 mt-1 block">Produs: <strong className="text-slate-400">{scenariu.produs}</strong></span>
                            </div>
                            <button 
                              onClick={() => {
                                setSelectedClass(clasaId);
                                setActiveTab('explorer');
                              }}
                              className="p-1.5 bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg transition-all"
                              title="Mergi la detaliile clasei"
                            >
                              <ChevronRight className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>

      {/* FOOTER */}
      <footer className="border-t border-slate-800 bg-slate-950/80 text-center py-6 px-6 text-xs text-slate-500 mt-auto">
        <p>© 2026 Resursă Educațională Deschisă pentru Educație Digitală, Clasele I-IX.</p>
        <p className="mt-1">Proiect realizat pe baza curriculumului oficial de Educație Tehnologică și TIC din Republica Moldova.</p>
      </footer>

      {/* MODAL EDITARE SCENARIU */}
      {editingScenario !== null && (
        <EditScenarioModal 
          clasaId={editingScenario.clasaId}
          index={editingScenario.index}
          scenariu={curriculum[editingScenario.clasaId].scenarii[editingScenario.index]}
          onClose={() => setEditingScenario(null)}
          onSave={handleUpdateScenario}
        />
      )}

      {/* MODAL ADĂUGARE SCENARIU NOU */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 text-slate-200 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Plus className="w-5 h-5 text-indigo-400" />
                <span>Adaugă Unitate de Învățare în Clasa a {selectedClass}-a</span>
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">ID Scenariu</label>
                  <input
                    type="text"
                    value={newScenario.id}
                    onChange={(e) => setNewScenario(prev => ({ ...prev, id: e.target.value }))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm focus:outline-none focus:border-indigo-500 text-slate-100"
                    placeholder="ex: S3"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Axa Conceptuală (Spirală)</label>
                  <select
                    value={newScenario.thread}
                    onChange={(e) => setNewScenario(prev => ({ ...prev, thread: e.target.value }))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm focus:outline-none focus:border-indigo-500 text-slate-100"
                  >
                    {Object.entries(THREADS).map(([key, val]) => (
                      <option key={key} value={key}>{val.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Titlul Unității</label>
                <input
                  type="text"
                  value={newScenario.titlu}
                  onChange={(e) => setNewScenario(prev => ({ ...prev, titlu: e.target.value }))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm focus:outline-none focus:border-indigo-500 text-slate-100"
                  placeholder="ex: Colaborez online"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Nivel Dezvoltare</label>
                  <select
                    value={newScenario.nivel}
                    onChange={(e) => setNewScenario(prev => ({ ...prev, nivel: e.target.value }))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm focus:outline-none focus:border-indigo-500 text-slate-100"
                  >
                    <option value="Iniţiere">Inițiere</option>
                    <option value="Dezvoltare">Dezvoltare</option>
                    <option value="Consolidare">Consolidare</option>
                    <option value="Avansat">Avansat</option>
                    <option value="Expert">Expert</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Competențe Specifice (separate prin virgulă)</label>
                  <input
                    type="text"
                    value={newScenario.cs.join(', ')}
                    onChange={(e) => setNewScenario(prev => ({ ...prev, cs: e.target.value.split(',').map(s => s.trim()) }))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm focus:outline-none focus:border-indigo-500 text-slate-100"
                    placeholder="ex: CS1, CS3"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Produs Final</label>
                  <input
                    type="text"
                    value={newScenario.produs}
                    onChange={(e) => setNewScenario(prev => ({ ...prev, produs: e.target.value }))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm focus:outline-none focus:border-indigo-500 text-slate-100"
                    placeholder="ex: Prezentare colaborativă"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Unități de Competență (UC, opțional, separate prin virgulă)</label>
                  <input
                    type="text"
                    value={newScenario.uc.join(', ')}
                    onChange={(e) => setNewScenario(prev => ({ ...prev, uc: e.target.value.split(',').map(s => s.trim()) }))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm focus:outline-none focus:border-indigo-500 text-slate-100"
                    placeholder="ex: UC1.1, UC3.1"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Acțiune Dominantă</label>
                <input
                  type="text"
                  value={newScenario.actiune}
                  onChange={(e) => setNewScenario(prev => ({ ...prev, actiune: e.target.value }))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm focus:outline-none focus:border-indigo-500 text-slate-100"
                  placeholder="ex: Utilizează instrumente de comunicare simultană."
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Lecțiile planificate (Max. 4 conform resursei temporale)</label>
                <div className="space-y-2">
                  {newScenario.lectii.map((l, lIdx) => (
                    <input
                      key={lIdx}
                      type="text"
                      value={l}
                      onChange={(e) => {
                        const updatedLectii = [...newScenario.lectii];
                        updatedLectii[lIdx] = e.target.value;
                        setNewScenario(prev => ({ ...prev, lectii: updatedLectii }));
                      }}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-sm focus:outline-none focus:border-indigo-500 text-slate-100"
                      placeholder={`Lecția ${lIdx + 1}`}
                    />
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Note Explicative / Recomandări Metodologice</label>
                <textarea
                  value={newScenario.note}
                  onChange={(e) => setNewScenario(prev => ({ ...prev, note: e.target.value }))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm focus:outline-none focus:border-indigo-500 text-slate-100 h-20"
                  placeholder="ex: Se recomandă utilizarea editorului de documente partajate Google Docs..."
                />
              </div>

            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-sm font-semibold transition-all"
              >
                Anulează
              </button>
              <button
                type="button"
                onClick={() => handleAddScenario(selectedClass)}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold transition-all shadow-lg shadow-indigo-500/10"
              >
                Salvează Scenariul
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

// COMPONENTĂ: CARD PENTRU UNITATEA DE ÎNVĂȚARE (SCENARIU)
function ScenarioCard({ clasaId, scenariu, index, onEdit, onDelete }) {
  const threadColor = THREADS[scenariu.thread]?.color || "from-indigo-500 to-indigo-600";
  const threadLabel = THREADS[scenariu.thread]?.label || "Arie generală";

  const levelColors = {
    "Iniţiere": "bg-emerald-500/15 border-emerald-500/30 text-emerald-400",
    "Dezvoltare": "bg-blue-500/15 border-blue-500/30 text-blue-400",
    "Consolidare": "bg-indigo-500/15 border-indigo-500/30 text-indigo-400",
    "Avansat": "bg-purple-500/15 border-purple-500/30 text-purple-400",
    "Expert": "bg-pink-500/15 border-pink-500/30 text-pink-400"
  };

  const levelBadge = levelColors[scenariu.nivel] || "bg-indigo-500/15 border-indigo-500/30 text-indigo-400";

  return (
    <div className="bg-slate-950 rounded-2xl border border-slate-800/80 p-5 flex flex-col justify-between hover:border-slate-700 hover:shadow-lg transition-all duration-300">
      <div>
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-extrabold bg-slate-900 border border-slate-800 text-slate-400 px-2 py-0.5 rounded uppercase">
              Clasa a {clasaId}-a
            </span>
            <span className="text-xs font-extrabold text-indigo-400 uppercase tracking-widest">
              {scenariu.id}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border ${levelBadge}`}>
              {scenariu.nivel || 'Dezvoltare'}
            </span>
            <button 
              onClick={onEdit} 
              className="p-1 bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 rounded transition-all"
              title="Editează"
            >
              <Edit3 className="w-3.5 h-3.5" />
            </button>
            <button 
              onClick={onDelete} 
              className="p-1 bg-slate-900 border border-slate-800 text-slate-400 hover:text-red-400 hover:border-red-900/40 rounded transition-all"
              title="Șterge"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Titlu și fir conceptual */}
        <h3 className="text-base font-extrabold text-white leading-snug">{scenariu.titlu}</h3>
        <span className="text-[10px] text-slate-500 font-semibold block mt-1 tracking-wide uppercase">
          {threadLabel}
        </span>

        {/* Informații cheie */}
        <div className="grid grid-cols-2 gap-3 my-4">
          <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-850">
            <span className="text-[9px] font-extrabold text-slate-500 uppercase tracking-wider block">Competențe</span>
            <div className="flex flex-wrap gap-1 mt-1">
              {scenariu.cs.map(comp => (
                <span key={comp} className="text-[10px] font-bold bg-slate-950 border border-slate-800 text-slate-300 px-1.5 py-0.5 rounded">
                  {comp}
                </span>
              ))}
            </div>
          </div>
          <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-850">
            <span className="text-[9px] font-extrabold text-slate-500 uppercase tracking-wider block">Produs Final</span>
            <span className="text-xs font-bold text-emerald-400 mt-1 block truncate" title={scenariu.produs}>
              {scenariu.produs}
            </span>
          </div>
        </div>

        {/* Unitatea de Conținut (Lecțiile) */}
        <div className="space-y-2">
          <span className="text-[9px] font-extrabold text-slate-500 uppercase tracking-wider block">Planificare Lecții</span>
          <ul className="space-y-1.5 bg-slate-900/60 p-3 rounded-xl border border-dashed border-slate-800">
            {scenariu.lectii.map((l, idx) => (
              <li key={idx} className="text-xs text-slate-300 flex items-start gap-1.5">
                <span className="text-indigo-400 font-bold shrink-0">{idx + 1}.</span>
                <span className="leading-normal">{l}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-800/80">
        <p className="text-[11px] text-slate-400 leading-normal italic">
          <strong className="not-italic text-slate-500 font-bold uppercase tracking-wider text-[10px] block mb-0.5">Note explicative:</strong>
          {scenariu.note}
        </p>
      </div>
    </div>
  );
}

// COMPONENTĂ: MODAL PENTRU EDITARE SCENARIU EXISTENT
function EditScenarioModal({ clasaId, index, scenariu, onClose, onSave }) {
  const [form, setForm] = useState({ ...scenariu });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(clasaId, index, {
      ...form,
      lectii: form.lectii.filter(l => l.trim() !== '')
    });
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 text-slate-200 space-y-4">
        <div className="flex justify-between items-center border-b border-slate-800 pb-3">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Edit3 className="w-5 h-5 text-indigo-400" />
            <span>Modifică Unitatea de Învățare ({scenariu.id})</span>
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-1">ID Scenariu</label>
              <input
                type="text"
                value={form.id}
                onChange={(e) => setForm(prev => ({ ...prev, id: e.target.value }))}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm focus:outline-none focus:border-indigo-500 text-slate-100"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Axa Conceptuală (Spirală)</label>
              <select
                value={form.thread}
                onChange={(e) => setForm(prev => ({ ...prev, thread: e.target.value }))}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm focus:outline-none focus:border-indigo-500 text-slate-100"
              >
                {Object.entries(THREADS).map(([key, val]) => (
                  <option key={key} value={key}>{val.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Titlul Unității</label>
            <input
              type="text"
              value={form.titlu}
              onChange={(e) => setForm(prev => ({ ...prev, titlu: e.target.value }))}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm focus:outline-none focus:border-indigo-500 text-slate-100"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Nivel Dezvoltare</label>
              <select
                value={form.nivel || 'Dezvoltare'}
                onChange={(e) => setForm(prev => ({ ...prev, nivel: e.target.value }))}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm focus:outline-none focus:border-indigo-500 text-slate-100"
              >
                <option value="Iniţiere">Inițiere</option>
                <option value="Dezvoltare">Dezvoltare</option>
                <option value="Consolidare">Consolidare</option>
                <option value="Avansat">Avansat</option>
                <option value="Expert">Expert</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Competențe Specifice (separate prin virgulă)</label>
              <input
                type="text"
                value={form.cs.join(', ')}
                onChange={(e) => setForm(prev => ({ ...prev, cs: e.target.value.split(',').map(s => s.trim()) }))}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm focus:outline-none focus:border-indigo-500 text-slate-100"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Produs Final</label>
              <input
                type="text"
                value={form.produs}
                onChange={(e) => setForm(prev => ({ ...prev, produs: e.target.value }))}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm focus:outline-none focus:border-indigo-500 text-slate-100"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Unități de Competență (UC, separate prin virgulă)</label>
              <input
                type="text"
                value={form.uc.join(', ')}
                onChange={(e) => setForm(prev => ({ ...prev, uc: e.target.value.split(',').map(s => s.trim()) }))}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm focus:outline-none focus:border-indigo-500 text-slate-100"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Acțiune Dominantă</label>
            <input
              type="text"
              value={form.actiune}
              onChange={(e) => setForm(prev => ({ ...prev, actiune: e.target.value }))}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm focus:outline-none focus:border-indigo-500 text-slate-100"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Lecțiile planificate (Max. 4)</label>
            <div className="space-y-2">
              {form.lectii.map((l, lIdx) => (
                <input
                  key={lIdx}
                  type="text"
                  value={l}
                  onChange={(e) => {
                    const updatedLectii = [...form.lectii];
                    updatedLectii[lIdx] = e.target.value;
                    setForm(prev => ({ ...prev, lectii: updatedLectii }));
                  }}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-sm focus:outline-none focus:border-indigo-500 text-slate-100"
                  placeholder={`Lecția ${lIdx + 1}`}
                />
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Note Explicative / Recomandări Metodologice</label>
            <textarea
              value={form.note}
              onChange={(e) => setForm(prev => ({ ...prev, note: e.target.value }))}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm focus:outline-none focus:border-indigo-500 text-slate-100 h-20"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-sm font-semibold transition-all"
            >
              Anulează
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold transition-all shadow-lg shadow-indigo-500/10"
            >
              Salvează Modificările
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
