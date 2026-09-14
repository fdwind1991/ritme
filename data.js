/* Ritme · bundled word lists, build salt, translations and licence text.
 * GPL-3.0; see LICENSE and THIRD_PARTY_NOTICES.md.
 * Load before app.js. No runtime fetch or external dependency is required.
 * The entropy array is an existing PUBLIC build salt, not a secret or API key.
 * Keep Standard v1 word lists intact: their fingerprints live in app.js.
 */
'use strict';
const RITME_DATA = {
  "lexicons": {
    "nl": {
      "name": "Nederlands",
      "source": "https://raw.githubusercontent.com/monkeytypegame/monkeytype/master/frontend/static/languages/dutch.json",
      "words": [
        "als",
        "zijn",
        "dat",
        "hij",
        "was",
        "voor",
        "op",
        "met",
        "ze",
        "bij",
        "hebben",
        "deze",
        "door",
        "heet",
        "woord",
        "maar",
        "wat",
        "sommige",
        "is",
        "het",
        "u",
        "of",
        "had",
        "de",
        "van",
        "aan",
        "en",
        "in",
        "we",
        "kan",
        "uit",
        "andere",
        "waren",
        "die",
        "doen",
        "hun",
        "tijd",
        "indien",
        "zal",
        "hoe",
        "zei",
        "een",
        "elk",
        "vertellen",
        "doet",
        "drie",
        "willen",
        "lucht",
        "goed",
        "ook",
        "spelen",
        "klein",
        "zetten",
        "thuis",
        "lezen",
        "hand",
        "poort",
        "toevoegen",
        "zelfs",
        "land",
        "hier",
        "moet",
        "grote",
        "hoog",
        "dergelijke",
        "volgen",
        "waarom",
        "vragen",
        "mannen",
        "verandering",
        "ging",
        "licht",
        "soort",
        "uitgeschakeld",
        "nodig",
        "huis",
        "afbeelding",
        "proberen",
        "ons",
        "weer",
        "dier",
        "punt",
        "moeder",
        "wereld",
        "dichtbij",
        "bouwen",
        "zelf",
        "aarde",
        "vader",
        "nieuwe",
        "werk",
        "nemen",
        "krijgen",
        "plaats",
        "gemaakt",
        "wonen",
        "waar",
        "na",
        "terug",
        "weinig",
        "alleen",
        "ronde",
        "man",
        "jaar",
        "kwam",
        "elke",
        "mij",
        "geven",
        "onze",
        "onder",
        "naam",
        "zeer",
        "gewoon",
        "vorm",
        "zin",
        "denken",
        "zeggen",
        "helpen",
        "laag",
        "lijn",
        "verschillen",
        "beurt",
        "oorzaak",
        "veel",
        "betekenen",
        "verhuizing",
        "rechts",
        "jongen",
        "oude",
        "hetzelfde",
        "alle",
        "er",
        "wanneer",
        "omhoog",
        "gebruiken",
        "uw",
        "manier",
        "over",
        "dan",
        "hen",
        "schrijven",
        "zou",
        "zoals",
        "dus",
        "haar",
        "lang",
        "maken",
        "ding",
        "zien",
        "hem",
        "twee",
        "heeft",
        "kijken",
        "meer",
        "dag",
        "kon",
        "gaan",
        "komen",
        "deed",
        "aantal",
        "klinken",
        "geen",
        "meest",
        "mensen",
        "mijn",
        "weten",
        "water",
        "naar",
        "roep",
        "eerste",
        "beneden",
        "kant",
        "geweest",
        "nu",
        "vinden",
        "kunnen",
        "bos",
        "daar",
        "duur",
        "foto",
        "kleur",
        "week",
        "deel",
        "meter",
        "ruimte",
        "kamer",
        "buiten",
        "binnen",
        "staan",
        "verbinding",
        "kans",
        "verwijderen",
        "achter",
        "maand",
        "dijk",
        "druk",
        "gezondheid",
        "kat",
        "hond"
      ]
    },
    "en": {
      "name": "English",
      "source": "https://raw.githubusercontent.com/monkeytypegame/monkeytype/master/frontend/static/languages/english.json",
      "words": [
        "the",
        "be",
        "of",
        "and",
        "a",
        "to",
        "in",
        "he",
        "have",
        "it",
        "that",
        "for",
        "they",
        "I",
        "with",
        "as",
        "not",
        "on",
        "she",
        "at",
        "by",
        "this",
        "we",
        "you",
        "do",
        "but",
        "from",
        "or",
        "which",
        "one",
        "would",
        "all",
        "will",
        "there",
        "say",
        "who",
        "make",
        "when",
        "can",
        "more",
        "if",
        "no",
        "man",
        "out",
        "other",
        "so",
        "what",
        "time",
        "up",
        "go",
        "about",
        "than",
        "into",
        "could",
        "state",
        "only",
        "new",
        "year",
        "some",
        "take",
        "come",
        "these",
        "know",
        "see",
        "use",
        "get",
        "like",
        "then",
        "first",
        "any",
        "work",
        "now",
        "may",
        "such",
        "give",
        "over",
        "think",
        "most",
        "even",
        "find",
        "day",
        "also",
        "after",
        "way",
        "many",
        "must",
        "look",
        "before",
        "great",
        "back",
        "through",
        "long",
        "where",
        "much",
        "should",
        "well",
        "people",
        "down",
        "own",
        "just",
        "because",
        "good",
        "each",
        "those",
        "feel",
        "seem",
        "how",
        "high",
        "too",
        "place",
        "little",
        "world",
        "very",
        "still",
        "nation",
        "hand",
        "old",
        "life",
        "tell",
        "write",
        "become",
        "here",
        "show",
        "house",
        "both",
        "between",
        "need",
        "mean",
        "call",
        "develop",
        "under",
        "last",
        "right",
        "move",
        "thing",
        "general",
        "school",
        "never",
        "same",
        "another",
        "begin",
        "while",
        "number",
        "part",
        "turn",
        "real",
        "leave",
        "might",
        "want",
        "point",
        "form",
        "off",
        "child",
        "few",
        "small",
        "since",
        "against",
        "ask",
        "late",
        "home",
        "interest",
        "large",
        "person",
        "end",
        "open",
        "public",
        "follow",
        "during",
        "present",
        "without",
        "again",
        "hold",
        "govern",
        "around",
        "possible",
        "head",
        "consider",
        "word",
        "program",
        "problem",
        "however",
        "lead",
        "system",
        "set",
        "order",
        "eye",
        "plan",
        "run",
        "keep",
        "face",
        "fact",
        "group",
        "play",
        "stand",
        "increase",
        "early",
        "course",
        "change",
        "help",
        "line"
      ]
    },
    "de": {
      "name": "Deutsch",
      "source": "https://raw.githubusercontent.com/monkeytypegame/monkeytype/master/frontend/static/languages/german.json",
      "words": [
        "der",
        "die",
        "und",
        "in",
        "den",
        "von",
        "zu",
        "das",
        "mit",
        "sich",
        "des",
        "auf",
        "für",
        "ist",
        "im",
        "dem",
        "nicht",
        "ein",
        "eine",
        "als",
        "auch",
        "es",
        "an",
        "werden",
        "aus",
        "er",
        "hat",
        "dass",
        "sie",
        "nach",
        "wird",
        "bei",
        "einer",
        "um",
        "am",
        "sind",
        "noch",
        "wie",
        "einem",
        "über",
        "einen",
        "so",
        "Sie",
        "zum",
        "war",
        "haben",
        "nur",
        "oder",
        "aber",
        "vor",
        "zur",
        "bis",
        "mehr",
        "durch",
        "man",
        "sein",
        "wurde",
        "sei",
        "Prozent",
        "hatte",
        "kann",
        "gegen",
        "vom",
        "können",
        "schon",
        "wenn",
        "habe",
        "seine",
        "Euro",
        "ihre",
        "dann",
        "unter",
        "wir",
        "soll",
        "ich",
        "eines",
        "Jahr",
        "zwei",
        "Jahren",
        "diese",
        "dieser",
        "wieder",
        "keine",
        "Uhr",
        "seiner",
        "worden",
        "will",
        "zwischen",
        "immer",
        "Millionen",
        "was",
        "sagte",
        "gibt",
        "alle",
        "diesem",
        "seit",
        "muss",
        "wurden",
        "beim",
        "doch",
        "jetzt",
        "waren",
        "drei",
        "Jahre",
        "neue",
        "neuen",
        "damit",
        "bereits",
        "da",
        "ihr",
        "seinen",
        "müssen",
        "ab",
        "ihrer",
        "ohne",
        "sondern",
        "selbst",
        "ersten",
        "nun",
        "etwa",
        "heute",
        "ihren",
        "weil",
        "ihm",
        "seien",
        "Menschen",
        "Deutschland",
        "anderen",
        "werde",
        "sagt",
        "rund",
        "ihn",
        "Ende",
        "jedoch",
        "Zeit",
        "sollen",
        "ins",
        "seinem",
        "uns",
        "Stadt",
        "geht",
        "sehr",
        "hier",
        "ganz",
        "erst",
        "wollen",
        "Berlin",
        "vor allem",
        "sowie",
        "hatten",
        "deutschen",
        "machen",
        "lassen",
        "Unternehmen",
        "andere",
        "ob",
        "dieses",
        "steht",
        "dabei",
        "wegen",
        "weiter",
        "denn",
        "beiden",
        "einmal",
        "etwas",
        "nichts",
        "allerdings",
        "vier",
        "gut",
        "viele",
        "wo",
        "viel",
        "dort",
        "alles",
        "wäre",
        "kommt",
        "denen",
        "vergangenen",
        "fast",
        "fünf",
        "könnte",
        "nicht nur",
        "hätten",
        "Frau",
        "dafür",
        "kommen",
        "diesen",
        "letzten",
        "zwar",
        "großen",
        "dazu",
        "Mann",
        "sollte",
        "würde",
        "also",
        "bisher",
        "Leben",
        "Welt",
        "konnte",
        "ihrem"
      ]
    },
    "fr": {
      "name": "Français",
      "source": "https://raw.githubusercontent.com/monkeytypegame/monkeytype/master/frontend/static/languages/french.json",
      "words": [
        "a",
        "à",
        "acte",
        "aider",
        "air",
        "ajouter",
        "aller",
        "animal",
        "année",
        "appel",
        "après",
        "arrière",
        "aucun",
        "aussi",
        "autre",
        "avant",
        "avec",
        "avoir",
        "bas",
        "beaucoup",
        "besoin",
        "bien",
        "boîte",
        "bon",
        "cause",
        "ce",
        "certains",
        "ces",
        "changement",
        "chaque",
        "chaud",
        "chose",
        "comme",
        "comment",
        "construire",
        "côté",
        "dans",
        "de",
        "dehors",
        "déménagement",
        "deux",
        "différer",
        "dire",
        "dit",
        "donner",
        "droit",
        "eau",
        "écrire",
        "elle",
        "encore",
        "ensemble",
        "épeler",
        "essayer",
        "est allé",
        "est venu",
        "est",
        "et",
        "étaient",
        "était",
        "été",
        "être",
        "eu",
        "fabriqué",
        "faible",
        "faire",
        "fait",
        "faut",
        "fin",
        "forme",
        "garçon",
        "genre",
        "grand",
        "haut",
        "homme",
        "hommes",
        "ici",
        "il",
        "ils",
        "image",
        "interroger",
        "je",
        "jouer",
        "jour",
        "juste",
        "la",
        "là",
        "le",
        "les",
        "leur",
        "lieu",
        "ligne",
        "lire",
        "long",
        "lui",
        "lumière",
        "ma",
        "main",
        "maintenant",
        "mais",
        "maison",
        "manière",
        "même",
        "mère",
        "mettre",
        "moi",
        "monde",
        "montrer",
        "mot",
        "ne",
        "nom",
        "nombre",
        "notre",
        "nous",
        "nouveau",
        "obtenir",
        "ou",
        "où",
        "par",
        "partie",
        "partir",
        "penser",
        "père",
        "personnes",
        "petit",
        "peu",
        "peut",
        "phrase",
        "plus",
        "point",
        "port",
        "pour",
        "pourquoi",
        "pourrait",
        "première",
        "prendre",
        "près",
        "puis",
        "quand",
        "que",
        "qui",
        "regarder",
        "savoir",
        "seulement",
        "si",
        "signifier",
        "soi",
        "son",
        "sont",
        "sous",
        "suivre",
        "sur",
        "tel",
        "temps",
        "terre",
        "tour",
        "tous",
        "tout",
        "travail",
        "très",
        "trois",
        "trop",
        "trouver",
        "un",
        "utiliser",
        "venir",
        "vers",
        "vieux",
        "vivre",
        "voir",
        "volonté",
        "votre",
        "voudrais",
        "vouloir",
        "vous"
      ]
    },
    "es": {
      "name": "Español",
      "source": "https://raw.githubusercontent.com/monkeytypegame/monkeytype/master/frontend/static/languages/spanish.json",
      "words": [
        "como",
        "su",
        "que",
        "él",
        "era",
        "para",
        "en",
        "son",
        "con",
        "ellos",
        "ser",
        "uno",
        "tener",
        "este",
        "desde",
        "por",
        "caliente",
        "palabra",
        "pero",
        "qué",
        "algunos",
        "es",
        "lo",
        "usted",
        "o",
        "tenido",
        "la",
        "de",
        "a",
        "y",
        "un",
        "nos",
        "lata",
        "otros",
        "eran",
        "hacer",
        "tiempo",
        "si",
        "cómo",
        "dicho",
        "cada",
        "decir",
        "hace",
        "conjunto",
        "tres",
        "querer",
        "aire",
        "así",
        "también",
        "jugar",
        "pequeño",
        "fin",
        "poner",
        "leer",
        "mano",
        "puerto",
        "grande",
        "deletrear",
        "añadir",
        "incluso",
        "tierra",
        "aquí",
        "debe",
        "alto",
        "tal",
        "siga",
        "acto",
        "hierro",
        "preguntar",
        "hombres",
        "cambio",
        "porque",
        "luz",
        "tipo",
        "fuego",
        "imagen",
        "tratar",
        "nosotros",
        "animal",
        "punto",
        "madre",
        "mundo",
        "cerca",
        "construir",
        "auto",
        "padre",
        "cualquier",
        "nuevo",
        "trabajo",
        "parte",
        "tomar",
        "conseguir",
        "lugar",
        "hecho",
        "vivir",
        "donde",
        "después",
        "atrás",
        "poco",
        "ronda",
        "hombre",
        "años",
        "vino",
        "buena",
        "me",
        "dar",
        "nuestro",
        "bajo",
        "nombre",
        "muy",
        "forma",
        "frase",
        "gran",
        "pensar",
        "ayudar",
        "línea",
        "caja",
        "causa",
        "mucho",
        "ciudad",
        "antes",
        "movimiento",
        "derecho",
        "niño",
        "viejo",
        "demasiado",
        "misma",
        "ella",
        "todo",
        "hay",
        "cuando",
        "hasta",
        "uso",
        "camino",
        "acerca",
        "muchos",
        "entonces",
        "escribir",
        "haría",
        "éstos",
        "largo",
        "cosa",
        "ver",
        "dos",
        "tiene",
        "buscar",
        "más",
        "día",
        "podía",
        "ir",
        "venir",
        "hizo",
        "número",
        "sonar",
        "no",
        "personas",
        "mi",
        "sobre",
        "saber",
        "agua",
        "llamada",
        "primero",
        "puede",
        "abajo",
        "lado",
        "estado",
        "ahora",
        "encontrar",
        "bien",
        "siempre",
        "mayor",
        "menor",
        "mientras",
        "quien",
        "ayer",
        "pasado",
        "medio",
        "nunca",
        "poder",
        "veces",
        "fiesta",
        "grupo",
        "cuenta",
        "noche",
        "gente",
        "cuerpo",
        "semana",
        "segundo",
        "varios",
        "libro",
        "persona",
        "fuera",
        "casa",
        "solo",
        "mujer",
        "sistema",
        "vida"
      ]
    },
    "it": {
      "name": "Italiano",
      "source": "https://raw.githubusercontent.com/monkeytypegame/monkeytype/master/frontend/static/languages/italian.json",
      "words": [
        "come",
        "io",
        "nostro",
        "sono",
        "con",
        "uno",
        "è",
        "avevamo",
        "questo",
        "quello",
        "da",
        "caldo",
        "parola",
        "però",
        "cosa",
        "alcuni",
        "vostro",
        "posto",
        "altro",
        "era",
        "no",
        "fare",
        "sì",
        "preso",
        "chiesto",
        "fatto",
        "tempo",
        "ogni",
        "dire",
        "tre",
        "quattro",
        "chiedere",
        "bene",
        "anche",
        "giocare",
        "piccolo",
        "male",
        "morto",
        "mettere",
        "finire",
        "leggere",
        "mano",
        "casa",
        "grande",
        "più",
        "terra",
        "giovane",
        "vecchio",
        "tipo",
        "bisogno",
        "provare",
        "mamma",
        "papà",
        "vicino",
        "nuovo",
        "indietro",
        "anno",
        "treno",
        "pensiero",
        "turno",
        "molte",
        "troppo",
        "italiano",
        "quando",
        "sarebbe",
        "lungo",
        "guardare",
        "andare",
        "potuto",
        "numero",
        "giorno",
        "mio",
        "sapere",
        "acqua",
        "trovare",
        "fondare",
        "risposta",
        "scuola",
        "ancora",
        "qualche",
        "chiamare",
        "chiudere",
        "portare",
        "idea",
        "colore",
        "legno",
        "bianco",
        "nero",
        "camminare",
        "alleviare",
        "secondo",
        "abbastanza",
        "primo",
        "misurare",
        "metà",
        "capire",
        "comprendere",
        "prendere",
        "studiare",
        "mancare",
        "lontano",
        "sicuramente",
        "veloce",
        "velocemente",
        "giustamente",
        "intelligente",
        "oceano",
        "matematica",
        "mente",
        "ricordo",
        "interessante",
        "parole",
        "nuvole",
        "cielo",
        "pace",
        "amore",
        "fratello",
        "sorella",
        "famiglia",
        "massa",
        "palla",
        "cuore",
        "venire",
        "inverno",
        "strano",
        "viaggio",
        "musica",
        "melodia",
        "pausa",
        "salire",
        "giardino",
        "giusto",
        "bambino",
        "latte",
        "ordinare",
        "povero",
        "metallo",
        "legge",
        "per",
        "a",
        "anello",
        "raggio",
        "atomo",
        "umano",
        "pasta",
        "pizza",
        "pianoforte",
        "maggiore",
        "minore",
        "scale",
        "corrente",
        "pranzo",
        "mangiare",
        "uscire",
        "cane",
        "gatto",
        "elefante",
        "mucca",
        "albero",
        "fiore",
        "vincere",
        "perdere",
        "baciare",
        "vediamo",
        "chiacchierare",
        "video",
        "canzone",
        "vento",
        "contro",
        "serpente",
        "presto",
        "mentre",
        "durante",
        "dentro",
        "completamente",
        "chimica",
        "fisica",
        "latino",
        "viaggiare",
        "loro",
        "bicicletta",
        "automobile",
        "pensare",
        "curare",
        "lago",
        "aperto",
        "sentire",
        "cavallo",
        "notte",
        "bello",
        "brutto",
        "oggi",
        "domani",
        "ieri",
        "dormire",
        "sognare",
        "divano",
        "arrogante",
        "ballare"
      ]
    }
  },
  "entropy": [
    1580782557,
    831806214,
    3529122851,
    1221243559,
    1865729812,
    1317537469,
    217527959,
    1279752360
  ],
  "messages": {
    "Typen": {
      "nl": "Typen",
      "en": "Typing",
      "de": "Tippen"
    },
    "Voortgang": {
      "nl": "Voortgang",
      "en": "Progress",
      "de": "Fortschritt"
    },
    "Minder haast. Meer ritme.": {
      "nl": "Minder haast. Meer ritme.",
      "en": "Less rush. More rhythm.",
      "de": "Weniger Hast. Mehr Rhythmus."
    },
    "Vind je ritme.": {
      "nl": "Vind je ritme.",
      "en": "Find your rhythm.",
      "de": "Finde deinen Rhythmus."
    },
    "Woorden, cijfers of je eigen tekst. Begin gewoon met typen.": {
      "nl": "Woorden, cijfers of je eigen tekst. Begin gewoon met typen.",
      "en": "Words, numbers or your own text. Just start typing.",
      "de": "Wörter, Zahlen oder eigener Text. Tippe einfach los."
    },
    "Persoonlijk record": {
      "nl": "Persoonlijk record",
      "en": "Personal best",
      "de": "Bestleistung"
    },
    "Woorden": {
      "nl": "Woorden",
      "en": "Words",
      "de": "Wörter"
    },
    "Getallen": {
      "nl": "Getallen",
      "en": "Numbers",
      "de": "Zahlen"
    },
    "Eigen tekst": {
      "nl": "Eigen tekst",
      "en": "Custom text",
      "de": "Eigener Text"
    },
    "Taal van de woorden": {
      "nl": "Taal van de woorden",
      "en": "Word language",
      "de": "Sprache der Wörter"
    },
    "Alleen cijfers": {
      "nl": "Alleen cijfers",
      "en": "Digits only",
      "de": "Nur Ziffern"
    },
    "Lengte van getallen": {
      "nl": "Lengte van getallen",
      "en": "Number length",
      "de": "Zahlenlänge"
    },
    "2–4 cijfers": {
      "nl": "2–4 cijfers",
      "en": "2–4 digits",
      "de": "2–4 Ziffern"
    },
    "2 cijfers": {
      "nl": "2 cijfers",
      "en": "2 digits",
      "de": "2 Ziffern"
    },
    "3 cijfers": {
      "nl": "3 cijfers",
      "en": "3 digits",
      "de": "3 Ziffern"
    },
    "4 cijfers": {
      "nl": "4 cijfers",
      "en": "4 digits",
      "de": "4 Ziffern"
    },
    "6 cijfers": {
      "nl": "6 cijfers",
      "en": "6 digits",
      "de": "6 Ziffern"
    },
    "leestekens": {
      "nl": "leestekens",
      "en": "punctuation",
      "de": "Satzzeichen"
    },
    "stop": {
      "nl": "stop",
      "en": "stop",
      "de": "Stopp"
    },
    "caps lock": {
      "nl": "caps lock",
      "en": "caps lock",
      "de": "Feststelltaste"
    },
    "Klik om verder te typen": {
      "nl": "Klik om verder te typen",
      "en": "Click to keep typing",
      "de": "Klicken, um weiterzutippen"
    },
    "De timer loopt door.": {
      "nl": "De timer loopt door.",
      "en": "The timer keeps running.",
      "de": "Die Zeit läuft weiter."
    },
    "Begin met typen": {
      "nl": "Begin met typen",
      "en": "Start typing",
      "de": "Loslegen"
    },
    "opnieuw": {
      "nl": "opnieuw",
      "en": "restart",
      "de": "neu starten"
    },
    "corrigeren": {
      "nl": "corrigeren",
      "en": "correct",
      "de": "korrigieren"
    },
    "← Voortgang": {
      "nl": "← Voortgang",
      "en": "← Progress",
      "de": "← Fortschritt"
    },
    "Test voltooid": {
      "nl": "Test voltooid",
      "en": "Test complete",
      "de": "Test abgeschlossen"
    },
    "Je ritme, in beeld.": {
      "nl": "Je ritme, in beeld.",
      "en": "Your rhythm, at a glance.",
      "de": "Dein Rhythmus auf einen Blick."
    },
    "Eindnauwkeurigheid": {
      "nl": "Eindnauwkeurigheid",
      "en": "Final accuracy",
      "de": "Textgenauigkeit"
    },
    "Bruto WPM": {
      "nl": "Bruto WPM",
      "en": "Raw WPM",
      "de": "Brutto-WPM"
    },
    "Ritme": {
      "nl": "Ritme",
      "en": "Consistency",
      "de": "Gleichmaß"
    },
    "Typefouten": {
      "nl": "Typefouten",
      "en": "Typos",
      "de": "Tippfehler"
    },
    "Ongecorrigeerd": {
      "nl": "Ongecorrigeerd",
      "en": "Uncorrected",
      "de": "Unkorrigiert"
    },
    "Aanslagnauwkeurigheid": {
      "nl": "Aanslagnauwkeurigheid",
      "en": "Keystroke accuracy",
      "de": "Anschlaggenauigkeit"
    },
    "Dit resultaat is uit CSV geïmporteerd. De scores zijn bewaard; een grafiek per seconde zat niet in die export.": {
      "nl": "Dit resultaat is uit CSV geïmporteerd. De scores zijn bewaard; een grafiek per seconde zat niet in die export.",
      "en": "This result was imported from CSV. Its scores are available, but the export did not include second-by-second chart data.",
      "de": "Dieses Ergebnis wurde aus einer CSV-Datei importiert. Die Werte sind vorhanden, aber der Export enthielt keine sekündlichen Diagrammdaten."
    },
    "Burst": {
      "nl": "Burst",
      "en": "Burst",
      "de": "Spitzentempo"
    },
    "Bruto": {
      "nl": "Bruto",
      "en": "Raw",
      "de": "Brutto"
    },
    "Netto": {
      "nl": "Netto",
      "en": "Net",
      "de": "Netto"
    },
    "Hersteld": {
      "nl": "Hersteld",
      "en": "Corrected",
      "de": "Korrigiert"
    },
    "Nog een test": {
      "nl": "Nog een test",
      "en": "Another test",
      "de": "Noch ein Test"
    },
    "Bekijk voortgang →": {
      "nl": "Bekijk voortgang →",
      "en": "View progress →",
      "de": "Fortschritt ansehen →"
    },
    "Waar zit je winst?": {
      "nl": "Waar zit je winst?",
      "en": "Where can you improve?",
      "de": "Wo kannst du dich verbessern?"
    },
    "Toetsen": {
      "nl": "Toetsen",
      "en": "Keys",
      "de": "Tasten"
    },
    "Vingers · QWERTY": {
      "nl": "Vingers · QWERTY",
      "en": "Fingers · QWERTY",
      "de": "Finger · QWERTY"
    },
    "Geen typefouten. Een foutloze test.": {
      "nl": "Geen typefouten. Een foutloze test.",
      "en": "No typos. A flawless test.",
      "de": "Keine Tippfehler. Ein fehlerfreier Test."
    },
    "Balken: foutaantallen, niet de foutkans per toets. Beweeg over een balk voor fouten / pogingen.": {
      "nl": "Balken: foutaantallen, niet de foutkans per toets. Beweeg over een balk voor fouten / pogingen.",
      "en": "Bars show error counts, not error rates per key. Hover over a bar for errors / attempts.",
      "de": "Balken zeigen Fehlerzahlen, nicht Fehlerquoten pro Taste. Bewege den Zeiger über einen Balken für Fehler / Versuche."
    },
    "Finger map: US QWERTY — theoretische toewijzing, niet je werkelijk gebruikte vingers.": {
      "nl": "Finger map: US QWERTY — theoretische toewijzing, niet je werkelijk gebruikte vingers.",
      "en": "Finger map: US QWERTY — a theoretical assignment, not the fingers you actually used.",
      "de": "Fingerzuordnung: US QWERTY — theoretische Zuordnung, nicht deine tatsächlich verwendeten Finger."
    },
    "Oefen deze toetsen →": {
      "nl": "Oefen deze toetsen →",
      "en": "Practise these keys →",
      "de": "Diese Tasten üben →"
    },
    "Jouw tests. Jouw ontwikkeling.": {
      "nl": "Jouw tests. Jouw ontwikkeling.",
      "en": "Your tests. Your progress.",
      "de": "Deine Tests. Deine Entwicklung."
    },
    "Je voortgang.": {
      "nl": "Je voortgang.",
      "en": "Your progress.",
      "de": "Dein Fortschritt."
    },
    "Een klein moment, steeds een beetje vloeiender.": {
      "nl": "Een klein moment, steeds een beetje vloeiender.",
      "en": "A little practice, a little more flow.",
      "de": "Ein kleiner Moment, jedes Mal etwas flüssiger."
    },
    "Beheer": {
      "nl": "Beheer",
      "en": "Manage",
      "de": "Verwalten"
    },
    "Back-up downloaden · JSON": {
      "nl": "Back-up downloaden · JSON",
      "en": "Download backup · JSON",
      "de": "Backup herunterladen · JSON"
    },
    "Exporteer selectie · CSV": {
      "nl": "Exporteer selectie · CSV",
      "en": "Export selection · CSV",
      "de": "Auswahl exportieren · CSV"
    },
    "Importeer JSON of CSV": {
      "nl": "Importeer JSON of CSV",
      "en": "Import JSON or CSV",
      "de": "JSON oder CSV importieren"
    },
    "Wis geschiedenis": {
      "nl": "Wis geschiedenis",
      "en": "Clear history",
      "de": "Verlauf löschen"
    },
    "Alleen in deze browser. Een back-up verhuist mee naar een ander bestand of apparaat.": {
      "nl": "Alleen in deze browser. Een back-up verhuist mee naar een ander bestand of apparaat.",
      "en": "Only in this browser. A backup lets you move your history to another file or device.",
      "de": "Nur in diesem Browser. Ein Backup nimmt deinen Verlauf in eine andere Datei oder auf ein anderes Gerät mit."
    },
    "Nieuwe test": {
      "nl": "Nieuwe test",
      "en": "New test",
      "de": "Neuer Test"
    },
    "Vergelijk": {
      "nl": "Vergelijk",
      "en": "Compare",
      "de": "Vergleichen"
    },
    "Alle tests": {
      "nl": "Alle tests",
      "en": "All tests",
      "de": "Alle Tests"
    },
    "Periode": {
      "nl": "Periode",
      "en": "Period",
      "de": "Zeitraum"
    },
    "Alle tijd": {
      "nl": "Alle tijd",
      "en": "All time",
      "de": "Gesamt"
    },
    "30 dagen": {
      "nl": "30 dagen",
      "en": "30 days",
      "de": "30 Tage"
    },
    "7 dagen": {
      "nl": "7 dagen",
      "en": "7 days",
      "de": "7 Tage"
    },
    "Laatste": {
      "nl": "Laatste",
      "en": "Latest",
      "de": "Zuletzt"
    },
    "Gemiddeld": {
      "nl": "Gemiddeld",
      "en": "Average",
      "de": "Durchschnitt"
    },
    "Binnen deze selectie": {
      "nl": "Binnen deze selectie",
      "en": "Within this selection",
      "de": "In dieser Auswahl"
    },
    "Voltooide tests": {
      "nl": "Voltooide tests",
      "en": "Completed tests",
      "de": "Abgeschlossene Tests"
    },
    "tests": {
      "nl": "tests",
      "en": "tests",
      "de": "Tests"
    },
    "test": {
      "nl": "test",
      "en": "test",
      "de": "Test"
    },
    "Je snelheid in beeld": {
      "nl": "Je snelheid in beeld",
      "en": "Your speed over time",
      "de": "Dein Tempo im Verlauf"
    },
    "Elke stip is één test.": {
      "nl": "Elke stip is één test.",
      "en": "Each point is one test.",
      "de": "Jeder Punkt ist ein Test."
    },
    "Snelheid": {
      "nl": "Snelheid",
      "en": "Speed",
      "de": "Tempo"
    },
    "Nauwkeurigheid": {
      "nl": "Nauwkeurigheid",
      "en": "Accuracy",
      "de": "Genauigkeit"
    },
    "Je eerste lijn begint met één test.": {
      "nl": "Je eerste lijn begint met één test.",
      "en": "Your first line starts with one test.",
      "de": "Deine erste Linie beginnt mit einem Test."
    },
    "Rond een test af. Je resultaat verschijnt hier automatisch, zonder account.": {
      "nl": "Rond een test af. Je resultaat verschijnt hier automatisch, zonder account.",
      "en": "Complete a test. Your result appears here automatically, no account needed.",
      "de": "Schließe einen Test ab. Dein Ergebnis erscheint hier automatisch, ohne Konto."
    },
    "Per test": {
      "nl": "Per test",
      "en": "Per test",
      "de": "Pro Test"
    },
    "Gemiddelde · laatste 5": {
      "nl": "Gemiddelde · laatste 5",
      "en": "Average · last 5",
      "de": "Durchschnitt · letzte 5"
    },
    "Onderzoek · ≈52 WPM / 260 CPM": {
      "nl": "Onderzoek · ≈52 WPM / 260 CPM",
      "en": "Study · ≈52 WPM / 260 CPM",
      "de": "Studie · ≈52 WPM / 260 CPM"
    },
    "Recente tests": {
      "nl": "Recente tests",
      "en": "Recent tests",
      "de": "Letzte Tests"
    },
    "Datum": {
      "nl": "Datum",
      "en": "Date",
      "de": "Datum"
    },
    "Test": {
      "nl": "Test",
      "en": "Test",
      "de": "Test"
    },
    "Eindtekst": {
      "nl": "Eindtekst",
      "en": "Final text",
      "de": "Endtext"
    },
    "Aanslagen": {
      "nl": "Aanslagen",
      "en": "Keystrokes",
      "de": "Anschläge"
    },
    "Open resultaat": {
      "nl": "Open resultaat",
      "en": "Open result",
      "de": "Ergebnis öffnen"
    },
    "Je afgeronde tests verschijnen hier vanzelf.": {
      "nl": "Je afgeronde tests verschijnen hier vanzelf.",
      "en": "Your completed tests will appear here automatically.",
      "de": "Deine abgeschlossenen Tests erscheinen hier automatisch."
    },
    "Je bestaande tests blijven behouden. Maximaal 100 tests worden lokaal bewaard. Via Beheer kun je een back-up maken of een export uit de vorige versie importeren.": {
      "nl": "Je bestaande tests blijven behouden. Maximaal 100 tests worden lokaal bewaard. Via Beheer kun je een back-up maken of een export uit de vorige versie importeren.",
      "en": "Your existing tests are kept. Up to 100 tests are stored locally. Use Manage to create a backup or import an export from the previous version.",
      "de": "Deine bisherigen Tests bleiben erhalten. Bis zu 100 Tests werden lokal gespeichert. Unter Verwalten kannst du ein Backup erstellen oder einen Export aus der vorherigen Version importieren."
    },
    "Browseropslag is niet beschikbaar. Deze sessie blijft alleen in het geheugen: download een back-up vóór je het bestand sluit.": {
      "nl": "Browseropslag is niet beschikbaar. Deze sessie blijft alleen in het geheugen: download een back-up vóór je het bestand sluit.",
      "en": "Browser storage is unavailable. This session is held in memory only: download a backup before closing the file.",
      "de": "Der Browserspeicher ist nicht verfügbar. Diese Sitzung bleibt nur im Arbeitsspeicher: Lade vor dem Schließen der Datei ein Backup herunter."
    },
    "Volledig lokaal. Helemaal van jou.": {
      "nl": "Volledig lokaal. Helemaal van jou.",
      "en": "Fully local. Entirely yours.",
      "de": "Vollständig lokal. Ganz dein."
    },
    "Nauwkeurigheid eerst. Snelheid volgt.": {
      "nl": "Nauwkeurigheid eerst. Snelheid volgt.",
      "en": "Accuracy first. Speed follows.",
      "de": "Erst Genauigkeit. Dann Tempo."
    },
    "Bronnen & rekenregels": {
      "nl": "Bronnen & rekenregels",
      "en": "Sources & scoring",
      "de": "Quellen & Berechnung"
    },
    "Privacy": {
      "nl": "Privacy",
      "en": "Privacy",
      "de": "Datenschutz"
    },
    "Zo werkt Ritme": {
      "nl": "Zo werkt Ritme",
      "en": "How Ritme works",
      "de": "So funktioniert Ritme"
    },
    "Rekenregels": {
      "nl": "Rekenregels",
      "en": "Scoring",
      "de": "Berechnung"
    },
    "Bronnen & privacy": {
      "nl": "Bronnen & privacy",
      "en": "Sources & privacy",
      "de": "Quellen & Datenschutz"
    },
    "Eerst nauwkeurig. Dan sneller.": {
      "nl": "Eerst nauwkeurig. Dan sneller.",
      "en": "Accuracy first. Then speed.",
      "de": "Erst genau. Dann schneller."
    },
    "Woorden, getallen of je eigen tekst": {
      "nl": "Woorden, getallen of je eigen tekst",
      "en": "Words, numbers or your own text",
      "de": "Wörter, Zahlen oder eigener Text"
    },
    "Bediening": {
      "nl": "Bediening",
      "en": "Controls",
      "de": "Bedienung"
    },
    "Eerlijk vergelijken": {
      "nl": "Eerlijk vergelijken",
      "en": "Compare fairly",
      "de": "Fair vergleichen"
    },
    "WPM, Raw WPM en CPM": {
      "nl": "WPM, Raw WPM en CPM",
      "en": "WPM, Raw WPM and CPM",
      "de": "WPM, Brutto-WPM und CPM"
    },
    "Snelheidsbenchmark · WPM en CPM": {
      "nl": "Snelheidsbenchmark · WPM en CPM",
      "en": "Speed benchmark · WPM and CPM",
      "de": "Tempovergleich · WPM und CPM"
    },
    "Tempo": {
      "nl": "Tempo",
      "en": "Pace",
      "de": "Tempo"
    },
    "Waar komt de referentielijn vandaan?": {
      "nl": "Waar komt de referentielijn vandaan?",
      "en": "Where does the reference line come from?",
      "de": "Woher kommt die Referenzlinie?"
    },
    "Getallen en gerichte oefeningen": {
      "nl": "Getallen en gerichte oefeningen",
      "en": "Numbers and targeted practice",
      "de": "Zahlen und gezielte Übungen"
    },
    "Twee verschillende soorten nauwkeurigheid": {
      "nl": "Twee verschillende soorten nauwkeurigheid",
      "en": "Two different kinds of accuracy",
      "de": "Zwei Arten von Genauigkeit"
    },
    "Typos en Uncorrected": {
      "nl": "Typos en Uncorrected",
      "en": "Typos and Uncorrected",
      "de": "Tippfehler und Unkorrigiert"
    },
    "Grafiek en consistency": {
      "nl": "Grafiek en consistency",
      "en": "Chart and consistency",
      "de": "Diagramm und Gleichmaß"
    },
    "Zwakke toetsen en vingers": {
      "nl": "Zwakke toetsen en vingers",
      "en": "Weak keys and fingers",
      "de": "Schwache Tasten und Finger"
    },
    "Herkomst": {
      "nl": "Herkomst",
      "en": "Origins",
      "de": "Herkunft"
    },
    "Willekeur": {
      "nl": "Willekeur",
      "en": "Randomness",
      "de": "Zufall"
    },
    "Privacy en opslag": {
      "nl": "Privacy en opslag",
      "en": "Privacy and storage",
      "de": "Datenschutz und Speicherung"
    },
    "Licentie en broncode": {
      "nl": "Licentie en broncode",
      "en": "Licence and source code",
      "de": "Lizenz und Quellcode"
    },
    "Toon volledige GNU GPL v3-licentie": {
      "nl": "Toon volledige GNU GPL v3-licentie",
      "en": "Show the full GNU GPL v3 licence",
      "de": "Vollständige GNU-GPL-v3-Lizenz anzeigen"
    },
    "Oefenen met je eigen tekst": {
      "nl": "Oefenen met je eigen tekst",
      "en": "Practise with your own text",
      "de": "Mit eigenem Text üben"
    },
    "Taal van de tekst": {
      "nl": "Taal van de tekst",
      "en": "Text language",
      "de": "Sprache des Textes"
    },
    "Plak een passage in de taal die je wilt oefenen.": {
      "nl": "Plak een passage in de taal die je wilt oefenen.",
      "en": "Paste a passage in the language you want to practise.",
      "de": "Füge einen Abschnitt in der Sprache ein, die du üben möchtest."
    },
    "Hoofdletters en accenten blijven behouden.": {
      "nl": "Hoofdletters en accenten blijven behouden.",
      "en": "Capital letters and accents are preserved.",
      "de": "Großbuchstaben und Akzente bleiben erhalten."
    },
    "De test eindigt als je de tekst af hebt of als de gekozen tijd voorbij is. De tekst wordt niet opgeslagen. Dit is een aparte modus: getallen en leestekens worden precies uit jouw tekst overgenomen.": {
      "nl": "De test eindigt als je de tekst af hebt of als de gekozen tijd voorbij is. De tekst wordt niet opgeslagen. Dit is een aparte modus: getallen en leestekens worden precies uit jouw tekst overgenomen.",
      "en": "The test ends when you finish the text or the time runs out. The text is not stored. This is a separate mode: numbers and punctuation are used exactly as they appear in your text.",
      "de": "Der Test endet, wenn du den Text fertig getippt hast oder die Zeit abläuft. Der Text wird nicht gespeichert. Dies ist ein eigener Modus: Zahlen und Satzzeichen werden genau aus deinem Text übernommen."
    },
    "Annuleren": {
      "nl": "Annuleren",
      "en": "Cancel",
      "de": "Abbrechen"
    },
    "Gebruik deze tekst": {
      "nl": "Gebruik deze tekst",
      "en": "Use this text",
      "de": "Diesen Text verwenden"
    },
    "Nieuwe test starten?": {
      "nl": "Nieuwe test starten?",
      "en": "Start a new test?",
      "de": "Neuen Test starten?"
    },
    "Opnieuw beginnen": {
      "nl": "Opnieuw beginnen",
      "en": "Start again",
      "de": "Neu beginnen"
    },
    "Ritme — nieuwe typetest": {
      "nl": "Ritme — nieuwe typetest",
      "en": "Ritme — new typing test",
      "de": "Ritme — neuer Tipptest"
    },
    "Hoofdnavigatie": {
      "nl": "Hoofdnavigatie",
      "en": "Main navigation",
      "de": "Hauptnavigation"
    },
    "Uitleg en rekenregels": {
      "nl": "Uitleg en rekenregels",
      "en": "Help and scoring",
      "de": "Hilfe und Berechnung"
    },
    "Uitleg": {
      "nl": "Uitleg",
      "en": "Help",
      "de": "Hilfe"
    },
    "Tekstgrootte wijzigen": {
      "nl": "Tekstgrootte wijzigen",
      "en": "Change text size",
      "de": "Textgröße ändern"
    },
    "Tekstgrootte": {
      "nl": "Tekstgrootte",
      "en": "Text size",
      "de": "Textgröße"
    },
    "Donkere weergave": {
      "nl": "Donkere weergave",
      "en": "Dark mode",
      "de": "Dunkle Ansicht"
    },
    "Lichte weergave": {
      "nl": "Lichte weergave",
      "en": "Light mode",
      "de": "Helle Ansicht"
    },
    "Licht / donker": {
      "nl": "Licht / donker",
      "en": "Light / dark",
      "de": "Hell / dunkel"
    },
    "Typetest": {
      "nl": "Typetest",
      "en": "Typing test",
      "de": "Tipptest"
    },
    "Testinstellingen": {
      "nl": "Testinstellingen",
      "en": "Test settings",
      "de": "Testeinstellungen"
    },
    "Testduur": {
      "nl": "Testduur",
      "en": "Test duration",
      "de": "Testdauer"
    },
    "Oefenmodus": {
      "nl": "Oefenmodus",
      "en": "Practice mode",
      "de": "Übungsmodus"
    },
    "Alleen getallen, zonder woorden of leestekens": {
      "nl": "Alleen getallen, zonder woorden of leestekens",
      "en": "Numbers only, without words or punctuation",
      "de": "Nur Zahlen, ohne Wörter oder Satzzeichen"
    },
    "Typ een eigen passage over": {
      "nl": "Typ een eigen passage over",
      "en": "Type a passage of your own",
      "de": "Einen eigenen Abschnitt abtippen"
    },
    "Meng getallen door de woorden": {
      "nl": "Meng getallen door de woorden",
      "en": "Mix numbers into the words",
      "de": "Zahlen unter die Wörter mischen"
    },
    "Punten, komma’s, dubbele punten en puntkomma’s": {
      "nl": "Punten, komma’s, dubbele punten en puntkomma’s",
      "en": "Full stops, commas, colons and semicolons",
      "de": "Punkte, Kommas, Doppelpunkte und Semikolons"
    },
    "Nieuwe test (Esc)": {
      "nl": "Nieuwe test (Esc)",
      "en": "New test (Esc)",
      "de": "Neuer Test (Esc)"
    },
    "Afronden met de verstreken tijd": {
      "nl": "Afronden met de verstreken tijd",
      "en": "Finish using the elapsed time",
      "de": "Mit der verstrichenen Zeit abschließen"
    },
    "Typ de getoonde tekst. De test begint bij je eerste aanslag.": {
      "nl": "Typ de getoonde tekst. De test begint bij je eerste aanslag.",
      "en": "Type the text shown. The test starts on your first keystroke.",
      "de": "Tippe den angezeigten Text. Der Test beginnt mit deinem ersten Anschlag."
    },
    "Testresultaat": {
      "nl": "Testresultaat",
      "en": "Test result",
      "de": "Testergebnis"
    },
    "Testgeschiedenis": {
      "nl": "Testgeschiedenis",
      "en": "Test history",
      "de": "Testverlauf"
    },
    "Geschiedenis": {
      "nl": "Geschiedenis",
      "en": "History",
      "de": "Verlauf"
    },
    "Kopieer resultaat": {
      "nl": "Kopieer resultaat",
      "en": "Copy result",
      "de": "Ergebnis kopieren"
    },
    "Nauwkeurigheid van de overgebleven tekst, na correcties": {
      "nl": "Nauwkeurigheid van de overgebleven tekst, na correcties",
      "en": "Accuracy of the remaining text, after corrections",
      "de": "Genauigkeit des verbleibenden Textes nach Korrekturen"
    },
    "Typesnelheid per seconde": {
      "nl": "Typesnelheid per seconde",
      "en": "Typing speed per second",
      "de": "Tippgeschwindigkeit pro Sekunde"
    },
    "Snelheidsgrafiek": {
      "nl": "Snelheidsgrafiek",
      "en": "Speed chart",
      "de": "Tempodiagramm"
    },
    "Gemiddelde snelheid ten opzichte van de benchmark": {
      "nl": "Gemiddelde snelheid ten opzichte van de benchmark",
      "en": "Average speed against the benchmark",
      "de": "Durchschnittstempo im Benchmarkvergleich"
    },
    "Je snelheid ten opzichte van de benchmark": {
      "nl": "Je snelheid ten opzichte van de benchmark",
      "en": "Your speed against the benchmark",
      "de": "Dein Tempo im Benchmarkvergleich"
    },
    "Vergelijkbare testinstellingen": {
      "nl": "Vergelijkbare testinstellingen",
      "en": "Comparable test settings",
      "de": "Vergleichbare Testeinstellungen"
    },
    "Grafiekmeting": {
      "nl": "Grafiekmeting",
      "en": "Chart metric",
      "de": "Diagrammkennzahl"
    },
    "Ontwikkeling van je typescores": {
      "nl": "Ontwikkeling van je typescores",
      "en": "Your typing scores over time",
      "de": "Entwicklung deiner Tippwerte"
    },
    "Sluiten": {
      "nl": "Sluiten",
      "en": "Close",
      "de": "Schließen"
    },
    "Taal van je eigen tekst": {
      "nl": "Taal van je eigen tekst",
      "en": "Language of your own text",
      "de": "Sprache deines eigenen Textes"
    },
    "Je eigen tekst, met echte zinnen en leestekens…": {
      "nl": "Je eigen tekst, met echte zinnen en leestekens…",
      "en": "Your own text, with real sentences and punctuation…",
      "de": "Dein eigener Text, mit echten Sätzen und Satzzeichen…"
    },
    "Interfacetaal": {
      "nl": "Interfacetaal",
      "en": "Interface language",
      "de": "Oberflächensprache"
    },
    "Interfacetaal — de taal van je typetest blijft gelijk": {
      "nl": "Interfacetaal — de taal van je typetest blijft gelijk",
      "en": "Interface language — your test language stays the same",
      "de": "Oberflächensprache — die Testsprache bleibt unverändert"
    },
    "Space": {
      "nl": "Spatie",
      "en": "Space",
      "de": "Leertaste"
    },
    "Ongeldig trekkingsbereik": {
      "nl": "Ongeldig trekkingsbereik",
      "en": "Invalid selection range",
      "de": "Ungültiger Auswahlbereich"
    },
    "Deze browser heeft geen Web Crypto. Open het bestand in een recente browser.": {
      "nl": "Deze browser heeft geen Web Crypto. Open het bestand in een recente browser.",
      "en": "This browser has no Web Crypto support. Open the file in a recent browser.",
      "de": "Dieser Browser unterstützt Web Crypto nicht. Öffne die Datei in einem aktuellen Browser."
    },
    "eigen tekst": {
      "nl": "eigen tekst",
      "en": "custom text",
      "de": "eigener Text"
    },
    "oefenen: ": {
      "nl": "oefenen: ",
      "en": "practice: ",
      "de": "üben: "
    },
    "Alleen cijfers · spatie tussen getallen": {
      "nl": "Alleen cijfers · spatie tussen getallen",
      "en": "Digits only · space between numbers",
      "de": "Nur Ziffern · Leerzeichen zwischen Zahlen"
    },
    "Eigen tekst · ": {
      "nl": "Eigen tekst · ",
      "en": "Custom text · ",
      "de": "Eigener Text · "
    },
    "gerichte oefening": {
      "nl": "gerichte oefening",
      "en": "targeted practice",
      "de": "gezielte Übung"
    },
    "losse woorden": {
      "nl": "losse woorden",
      "en": "individual words",
      "de": "einzelne Wörter"
    },
    "Typ de getallen over": {
      "nl": "Typ de getallen over",
      "en": "Type the numbers",
      "de": "Tippe die Zahlen ab"
    },
    "Typ je eigen tekst over": {
      "nl": "Typ je eigen tekst over",
      "en": "Type your own text",
      "de": "Tippe deinen eigenen Text ab"
    },
    "Over te typen: ": {
      "nl": "Over te typen: ",
      "en": "Text to type: ",
      "de": "Abzutippen: "
    },
    "Je huidige test wordt afgebroken en niet opgeslagen. De timer loopt door totdat je een keuze maakt.": {
      "nl": "Je huidige test wordt afgebroken en niet opgeslagen. De timer loopt door totdat je een keuze maakt.",
      "en": "Your current test will be discarded. The timer keeps running until you make a choice.",
      "de": "Dein laufender Test wird abgebrochen und nicht gespeichert. Die Zeit läuft weiter, bis du dich entscheidest."
    },
    "Opslag niet beschikbaar. Download een back-up via Voortgang → Beheer.": {
      "nl": "Opslag niet beschikbaar. Download een back-up via Voortgang → Beheer.",
      "en": "Storage unavailable. Download a backup via Progress → Manage.",
      "de": "Speicher nicht verfügbar. Lade unter Fortschritt → Verwalten ein Backup herunter."
    },
    "alleen cijfers": {
      "nl": "alleen cijfers",
      "en": "digits only",
      "de": "nur Ziffern"
    },
    "woorden": {
      "nl": "woorden",
      "en": "words",
      "de": "Wörter"
    },
    " cijfers": {
      "nl": " cijfers",
      "en": " digits",
      "de": " Ziffern"
    },
    "verkort": {
      "nl": "verkort",
      "en": "shortened",
      "de": "verkürzt"
    },
    "onderbroken": {
      "nl": "onderbroken",
      "en": "interrupted",
      "de": "unterbrochen"
    },
    "Rustig": {
      "nl": "Rustig",
      "en": "Steady",
      "de": "Ruhig"
    },
    "Gangbaar": {
      "nl": "Gangbaar",
      "en": "Typical",
      "de": "Üblich"
    },
    "Vlot": {
      "nl": "Vlot",
      "en": "Fluent",
      "de": "Flott"
    },
    "Snel": {
      "nl": "Snel",
      "en": "Fast",
      "de": "Schnell"
    },
    "Zeer snel": {
      "nl": "Zeer snel",
      "en": "Very fast",
      "de": "Sehr schnell"
    },
    "Uitzonderlijk snel": {
      "nl": "Uitzonderlijk snel",
      "en": "Exceptionally fast",
      "de": "Außergewöhnlich schnell"
    },
    "Tempo in perspectief": {
      "nl": "Tempo in perspectief",
      "en": "Your pace in context",
      "de": "Dein Tempo im Vergleich"
    },
    "Geen benchmark": {
      "nl": "Geen benchmark",
      "en": "No benchmark",
      "de": "Kein Vergleich"
    },
    "Geen bruikbare snelheid beschikbaar.": {
      "nl": "Geen bruikbare snelheid beschikbaar.",
      "en": "No usable speed measurement available.",
      "de": "Keine verwendbare Tempomessung verfügbar."
    },
    "Test onderbroken": {
      "nl": "Test onderbroken",
      "en": "Test interrupted",
      "de": "Test unterbrochen"
    },
    "Verkorte test": {
      "nl": "Verkorte test",
      "en": "Shortened test",
      "de": "Verkürzter Test"
    },
    "Geen tempobeoordeling: rond een volledige test af zonder onderbreking.": {
      "nl": "Geen tempobeoordeling: rond een volledige test af zonder onderbreking.",
      "en": "No pace rating: complete a full test without interruption.",
      "de": "Keine Tempobewertung: Schließe einen vollständigen Test ohne Unterbrechung ab."
    },
    "Te korte meting": {
      "nl": "Te korte meting",
      "en": "Measurement too short",
      "de": "Messung zu kurz"
    },
    "Minder dan 15 seconden: onvoldoende voor deze tempo-indicatie.": {
      "nl": "Minder dan 15 seconden: onvoldoende voor deze tempo-indicatie.",
      "en": "Less than 15 seconds: too short for this pace indication.",
      "de": "Weniger als 15 Sekunden: zu kurz für diese Tempoeinschätzung."
    },
    "Teksten verschillen in moeilijkheid. Je snelheid blijft zichtbaar, maar krijgt geen algemeen tempolabel.": {
      "nl": "Teksten verschillen in moeilijkheid. Je snelheid blijft zichtbaar, maar krijgt geen algemeen tempolabel.",
      "en": "Texts vary in difficulty. Your speed is shown, but without a general pace rating.",
      "de": "Texte unterscheiden sich im Schwierigkeitsgrad. Dein Tempo bleibt sichtbar, erhält aber keine allgemeine Tempobewertung."
    },
    "cijferreeksen": {
      "nl": "cijferreeksen",
      "en": "number sequences",
      "de": "Zahlenfolgen"
    },
    "gerichte oefeningen": {
      "nl": "gerichte oefeningen",
      "en": "targeted exercises",
      "de": "gezielte Übungen"
    },
    "Persoonlijke benchmark": {
      "nl": "Persoonlijke benchmark",
      "en": "Personal benchmark",
      "de": "Persönlicher Vergleich"
    },
    "Bouw je referentie op": {
      "nl": "Bouw je referentie op",
      "en": "Build your reference",
      "de": "Baue deine Referenz auf"
    },
    "Je eigen referentie": {
      "nl": "Je eigen referentie",
      "en": "Your own reference",
      "de": "Deine eigene Referenz"
    },
    "Boven je eerdere bereik": {
      "nl": "Boven je eerdere bereik",
      "en": "Above your previous range",
      "de": "Über deinem bisherigen Bereich"
    },
    "Onder je eerdere bereik": {
      "nl": "Onder je eerdere bereik",
      "en": "Below your previous range",
      "de": "Unter deinem bisherigen Bereich"
    },
    "Binnen je eerdere bereik": {
      "nl": "Binnen je eerdere bereik",
      "en": "Within your previous range",
      "de": "In deinem bisherigen Bereich"
    },
    "Indicatieve eigen indeling; onderzoek met Engelse zinnen, niet deze test.": {
      "nl": "Indicatieve eigen indeling; onderzoek met Engelse zinnen, niet deze test.",
      "en": "Indicative in-app categories; the study used English sentences, not this test.",
      "de": "Unverbindliche eigene Einteilung; die Studie verwendete englische Sätze, nicht diesen Test."
    },
    " Geen taalspecifieke norm.": {
      "nl": " Geen taalspecifieke norm.",
      "en": " Not a language-specific norm.",
      "de": " Keine sprachspezifische Norm."
    },
    " Woorden met cijfers zijn niet apart genormeerd.": {
      "nl": " Woorden met cijfers zijn niet apart genormeerd.",
      "en": " Words mixed with numbers have no separate norm.",
      "de": " Für Wörter mit Zahlen gibt es keine eigene Norm."
    },
    " Korte test: momentopname.": {
      "nl": " Korte test: momentopname.",
      "en": " Short test: a snapshot.",
      "de": " Kurzer Test: eine Momentaufnahme."
    },
    " De schaal eindigt bij 140+ WPM / 700+ CPM.": {
      "nl": " De schaal eindigt bij 140+ WPM / 700+ CPM.",
      "en": " The scale ends at 140+ WPM / 700+ CPM.",
      "de": " Die Skala endet bei 140+ WPM / 700+ CPM."
    },
    "Eigen gemiddelde": {
      "nl": "Eigen gemiddelde",
      "en": "Your average",
      "de": "Dein Durchschnitt"
    },
    "Onderzoek · ≈": {
      "nl": "Onderzoek · ≈",
      "en": "Study · ≈",
      "de": "Studie · ≈"
    },
    "Zes indicatieve tempobanden. Een stippellijn markeert het onderzoeksreferentiepunt.": {
      "nl": "Zes indicatieve tempobanden. Een stippellijn markeert het onderzoeksreferentiepunt.",
      "en": "Six indicative pace bands. A dotted line marks the study reference.",
      "de": "Sechs unverbindliche Tempobereiche. Eine gepunktete Linie markiert den Studienreferenzwert."
    },
    "Een lijn markeert het minimum en maximum van je eerdere vergelijkbare tests; de stippellijn is hun gemiddelde.": {
      "nl": "Een lijn markeert het minimum en maximum van je eerdere vergelijkbare tests; de stippellijn is hun gemiddelde.",
      "en": "A line marks the minimum and maximum of your earlier comparable tests; the dotted line is their average.",
      "de": "Eine Linie markiert Minimum und Maximum deiner früheren vergleichbaren Tests; die gepunktete Linie ist ihr Durchschnitt."
    },
    "Afgerond onderzoeksgemiddelde": {
      "nl": "Afgerond onderzoeksgemiddelde",
      "en": "Rounded study average",
      "de": "Gerundeter Studiendurchschnitt"
    },
    "Deze test": {
      "nl": "Deze test",
      "en": "This test",
      "de": "Dieser Test"
    },
    "Gemiddeld tempo · deze selectie": {
      "nl": "Gemiddeld tempo · deze selectie",
      "en": "Average pace · this selection",
      "de": "Durchschnittstempo · diese Auswahl"
    },
    "woordtest": {
      "nl": "woordtest",
      "en": "word test",
      "de": "Worttest"
    },
    "woordtests": {
      "nl": "woordtests",
      "en": "word tests",
      "de": "Worttests"
    },
    "Linker pink": {
      "nl": "Linker pink",
      "en": "Left little finger",
      "de": "Linker kleiner Finger"
    },
    "Linker ringvinger": {
      "nl": "Linker ringvinger",
      "en": "Left ring finger",
      "de": "Linker Ringfinger"
    },
    "Linker middelv.": {
      "nl": "Linker middelv.",
      "en": "Left middle finger",
      "de": "Linker Mittelfinger"
    },
    "Linker wijsvinger": {
      "nl": "Linker wijsvinger",
      "en": "Left index finger",
      "de": "Linker Zeigefinger"
    },
    "Rechter wijsvinger": {
      "nl": "Rechter wijsvinger",
      "en": "Right index finger",
      "de": "Rechter Zeigefinger"
    },
    "Rechter middelv.": {
      "nl": "Rechter middelv.",
      "en": "Right middle finger",
      "de": "Rechter Mittelfinger"
    },
    "Rechter ringvinger": {
      "nl": "Rechter ringvinger",
      "en": "Right ring finger",
      "de": "Rechter Ringfinger"
    },
    "Rechter pink": {
      "nl": "Rechter pink",
      "en": "Right little finger",
      "de": "Rechter kleiner Finger"
    },
    "Duimen": {
      "nl": "Duimen",
      "en": "Thumbs",
      "de": "Daumen"
    },
    "Overig / accent": {
      "nl": "Overig / accent",
      "en": "Other / accent",
      "de": "Sonstige / Akzent"
    },
    "Gericht oefenen met woorden met ": {
      "nl": "Gericht oefenen met woorden met ",
      "en": "Targeted practice with words containing ",
      "de": "Gezielt Wörter üben mit "
    },
    "Resultaat gekopieerd.": {
      "nl": "Resultaat gekopieerd.",
      "en": "Result copied.",
      "de": "Ergebnis kopiert."
    },
    "Klembord niet beschikbaar; resultaat opgeslagen als tekstbestand.": {
      "nl": "Klembord niet beschikbaar; resultaat opgeslagen als tekstbestand.",
      "en": "Clipboard unavailable; result saved as a text file.",
      "de": "Zwischenablage nicht verfügbar; Ergebnis als Textdatei gespeichert."
    },
    "Onbekende taal": {
      "nl": "Onbekende taal",
      "en": "Unknown language",
      "de": "Unbekannte Sprache"
    },
    " · leestekens": {
      "nl": " · leestekens",
      "en": " · punctuation",
      "de": " · Satzzeichen"
    },
    " · zonder leestekens": {
      "nl": " · zonder leestekens",
      "en": " · no punctuation",
      "de": " · ohne Satzzeichen"
    },
    " · verschillende instellingen": {
      "nl": " · verschillende instellingen",
      "en": " · mixed settings",
      "de": " · verschiedene Einstellungen"
    },
    "Correcte tekens, omgerekend naar woorden per minuut.": {
      "nl": "Correcte tekens, omgerekend naar woorden per minuut.",
      "en": "Correct characters, converted to words per minute.",
      "de": "Korrekte Zeichen, umgerechnet in Wörter pro Minute."
    },
    "Minder corrigeren, meer flow": {
      "nl": "Minder corrigeren, meer flow",
      "en": "Fewer corrections, more flow",
      "de": "Weniger Korrekturen, mehr Fluss"
    },
    "Aanslagnauwkeurigheid, dus inclusief herstelde fouten.": {
      "nl": "Aanslagnauwkeurigheid, dus inclusief herstelde fouten.",
      "en": "Keystroke accuracy, including corrected errors.",
      "de": "Anschlaggenauigkeit, einschließlich korrigierter Fehler."
    },
    "Je ritme in beeld": {
      "nl": "Je ritme in beeld",
      "en": "Your consistency over time",
      "de": "Dein Gleichmaß im Verlauf"
    },
    "Hoe gelijkmatig je typt tijdens een test.": {
      "nl": "Hoe gelijkmatig je typt tijdens een test.",
      "en": "How evenly you type during a test.",
      "de": "Wie gleichmäßig du während eines Tests tippst."
    },
    "Nog geen meetpunten": {
      "nl": "Nog geen meetpunten",
      "en": "No data points yet",
      "de": "Noch keine Messpunkte"
    },
    "Grafiek en kerncijfers: volledige tests zonder onderbreking. Onder de grafiek staan ook verkorte of onderbroken tests.": {
      "nl": "Grafiek en kerncijfers: volledige tests zonder onderbreking. Onder de grafiek staan ook verkorte of onderbroken tests.",
      "en": "The chart and key figures use complete, uninterrupted tests. Shortened or interrupted tests are also listed below the chart.",
      "de": "Diagramm und Kennzahlen verwenden vollständige Tests ohne Unterbrechung. Unter dem Diagramm stehen auch verkürzte oder unterbrochene Tests."
    },
    " Verschillende instellingen of eigen teksten: geen gezamenlijke trendlijn.": {
      "nl": " Verschillende instellingen of eigen teksten: geen gezamenlijke trendlijn.",
      "en": " Different settings or custom texts: no shared trend line.",
      "de": " Verschiedene Einstellungen oder eigene Texte: keine gemeinsame Trendlinie."
    },
    " Vanaf vijf vergelijkbare tests verschijnt je voortschrijdend gemiddelde.": {
      "nl": " Vanaf vijf vergelijkbare tests verschijnt je voortschrijdend gemiddelde.",
      "en": " Your rolling average appears after five comparable tests.",
      "de": " Ab fünf vergleichbaren Tests erscheint dein gleitender Durchschnitt."
    },
    " Bij getallen blijft 1 WPM gelijk aan 5 tekens, inclusief spaties.": {
      "nl": " Bij getallen blijft 1 WPM gelijk aan 5 tekens, inclusief spaties.",
      "en": " For numbers, 1 WPM still equals 5 characters, including spaces.",
      "de": " Auch bei Zahlen entspricht 1 WPM fünf Zeichen, einschließlich Leerzeichen."
    },
    "Geen tests voor deze selectie. Pas de instellingen of periode aan.": {
      "nl": "Geen tests voor deze selectie. Pas de instellingen of periode aan.",
      "en": "No tests in this selection. Change the settings or period.",
      "de": "Keine Tests in dieser Auswahl. Ändere die Einstellungen oder den Zeitraum."
    },
    " · woorden": {
      "nl": " · woorden",
      "en": " · words",
      "de": " · Wörter"
    },
    " · verkort": {
      "nl": " · verkort",
      "en": " · shortened",
      "de": " · verkürzt"
    },
    " · onderbroken": {
      "nl": " · onderbroken",
      "en": " · interrupted",
      "de": " · unterbrochen"
    },
    " · geïmporteerd": {
      "nl": " · geïmporteerd",
      "en": " · imported",
      "de": " · importiert"
    },
    " · tekst": {
      "nl": " · tekst",
      "en": " · text",
      "de": " · Text"
    },
    " · oefening": {
      "nl": " · oefening",
      "en": " · practice",
      "de": " · Übung"
    },
    "Bekijk ↗": {
      "nl": "Bekijk ↗",
      "en": "View ↗",
      "de": "Ansehen ↗"
    },
    "Huidige test afbreken?": {
      "nl": "Huidige test afbreken?",
      "en": "Discard the current test?",
      "de": "Laufenden Test abbrechen?"
    },
    "Je lopende test wordt niet opgeslagen als je een eerder resultaat opent.": {
      "nl": "Je lopende test wordt niet opgeslagen als je een eerder resultaat opent.",
      "en": "Your current test will not be saved if you open a previous result.",
      "de": "Dein laufender Test wird nicht gespeichert, wenn du ein früheres Ergebnis öffnest."
    },
    "Naar je voortgang?": {
      "nl": "Naar je voortgang?",
      "en": "Go to your progress?",
      "de": "Zum Fortschritt wechseln?"
    },
    "Je huidige test wordt afgebroken en niet opgeslagen.": {
      "nl": "Je huidige test wordt afgebroken en niet opgeslagen.",
      "en": "Your current test will be discarded and not saved.",
      "de": "Dein laufender Test wird abgebrochen und nicht gespeichert."
    },
    "Open voortgang": {
      "nl": "Open voortgang",
      "en": "Open progress",
      "de": "Fortschritt öffnen"
    },
    "Nog geen meetpunten in deze selectie.": {
      "nl": "Nog geen meetpunten in deze selectie.",
      "en": "No data points in this selection yet.",
      "de": "Noch keine Messpunkte in dieser Auswahl."
    },
    "Kies een andere periode of rond een volledige test af zonder onderbreking.": {
      "nl": "Kies een andere periode of rond een volledige test af zonder onderbreking.",
      "en": "Choose another period or complete a full test without interruption.",
      "de": "Wähle einen anderen Zeitraum oder schließe einen vollständigen Test ohne Unterbrechung ab."
    },
    "Een tweede lijn toont het gemiddelde van de laatste vijf tests.": {
      "nl": "Een tweede lijn toont het gemiddelde van de laatste vijf tests.",
      "en": "A second line shows the average of the last five tests.",
      "de": "Eine zweite Linie zeigt den Durchschnitt der letzten fünf Tests."
    },
    "procent": {
      "nl": "procent",
      "en": "percent",
      "de": "Prozent"
    },
    "procentpunt": {
      "nl": "procentpunt",
      "en": "percentage points",
      "de": "Prozentpunkte"
    },
    "Oud → nieuw · per test": {
      "nl": "Oud → nieuw · per test",
      "en": "Old → new · per test",
      "de": "Alt → neu · pro Test"
    },
    "Persoonlijk record · +": {
      "nl": "Persoonlijk record · +",
      "en": "Personal best · +",
      "de": "Bestleistung · +"
    },
    " WPM t.o.v. vorige 5": {
      "nl": " WPM t.o.v. vorige 5",
      "en": " WPM vs. previous 5",
      "de": " WPM gegenüber den vorherigen 5"
    },
    "Ongeldig CSV-bestand: niet-afgesloten aanhalingstekens.": {
      "nl": "Ongeldig CSV-bestand: niet-afgesloten aanhalingstekens.",
      "en": "Invalid CSV file: unclosed quotation marks.",
      "de": "Ungültige CSV-Datei: nicht geschlossene Anführungszeichen."
    },
    "Dit CSV-bestand is leeg.": {
      "nl": "Dit CSV-bestand is leeg.",
      "en": "This CSV file is empty.",
      "de": "Diese CSV-Datei ist leer."
    },
    "Gebruik een CSV-export uit deze typetest of de vorige versie.": {
      "nl": "Gebruik een CSV-export uit deze typetest of de vorige versie.",
      "en": "Use a CSV export from this typing test or the previous version.",
      "de": "Verwende einen CSV-Export aus diesem Tipptest oder der vorherigen Version."
    },
    "Dit bestand is te groot. Kies een back-up van maximaal 8 MB.": {
      "nl": "Dit bestand is te groot. Kies een back-up van maximaal 8 MB.",
      "en": "This file is too large. Choose a backup of up to 8 MB.",
      "de": "Diese Datei ist zu groß. Wähle ein Backup mit höchstens 8 MB."
    },
    "Geen geldige typetestgeschiedenis gevonden.": {
      "nl": "Geen geldige typetestgeschiedenis gevonden.",
      "en": "No valid typing test history found.",
      "de": "Kein gültiger Tipptestverlauf gefunden."
    },
    "Dit bestand bevat geen geldige testresultaten.": {
      "nl": "Dit bestand bevat geen geldige testresultaten.",
      "en": "This file contains no valid test results.",
      "de": "Diese Datei enthält keine gültigen Testergebnisse."
    },
    "Bestaande resultaten samengevoegd; de nieuwste 100 blijven bewaard.": {
      "nl": "Bestaande resultaten samengevoegd; de nieuwste 100 blijven bewaard.",
      "en": "Existing results merged; the latest 100 are kept.",
      "de": "Vorhandene Ergebnisse zusammengeführt; die neuesten 100 bleiben erhalten."
    },
    "Opslag niet beschikbaar: download een back-up vóór je sluit.": {
      "nl": "Opslag niet beschikbaar: download een back-up vóór je sluit.",
      "en": "Storage unavailable: download a backup before closing.",
      "de": "Speicher nicht verfügbar: Lade vor dem Schließen ein Backup herunter."
    },
    "Dit is geen geldig JSON-bestand. Kies een JSON-back-up of CSV-export.": {
      "nl": "Dit is geen geldig JSON-bestand. Kies een JSON-back-up of CSV-export.",
      "en": "This is not a valid JSON file. Choose a JSON backup or CSV export.",
      "de": "Dies ist keine gültige JSON-Datei. Wähle ein JSON-Backup oder einen CSV-Export."
    },
    "Willekeurige taal": {
      "nl": "Willekeurige taal",
      "en": "Random language",
      "de": "Zufällige Sprache"
    },
    "Geschiedenis wissen?": {
      "nl": "Geschiedenis wissen?",
      "en": "Clear history?",
      "de": "Verlauf löschen?"
    },
    "Alle opgeslagen tests worden verwijderd. Je instellingen blijven behouden. Download eerst een JSON-back-up als je de resultaten wilt bewaren.": {
      "nl": "Alle opgeslagen tests worden verwijderd. Je instellingen blijven behouden. Download eerst een JSON-back-up als je de resultaten wilt bewaren.",
      "en": "All saved tests will be deleted. Your settings are kept. Download a JSON backup first to keep your results.",
      "de": "Alle gespeicherten Tests werden gelöscht. Deine Einstellungen bleiben erhalten. Lade zuerst ein JSON-Backup herunter, um die Ergebnisse zu behalten."
    },
    "Wis alle tests": {
      "nl": "Wis alle tests",
      "en": "Delete all tests",
      "de": "Alle Tests löschen"
    },
    "Geschiedenis gewist.": {
      "nl": "Geschiedenis gewist.",
      "en": "History cleared.",
      "de": "Verlauf gelöscht."
    },
    "Voer minimaal 10 tekens in.": {
      "nl": "Voer minimaal 10 tekens in.",
      "en": "Enter at least 10 characters.",
      "de": "Gib mindestens 10 Zeichen ein."
    },
    "Een item is langer dan 30 tekens. Voeg daar een spatie toe voor goede weergave op kleine schermen.": {
      "nl": "Een item is langer dan 30 tekens. Voeg daar een spatie toe voor goede weergave op kleine schermen.",
      "en": "An item is longer than 30 characters. Add a space so it displays correctly on small screens.",
      "de": "Ein Eintrag ist länger als 30 Zeichen. Füge ein Leerzeichen ein, damit er auf kleinen Bildschirmen richtig angezeigt wird."
    },
    "Typ de tekst zelf; plakken en automatische vervanging zijn uitgeschakeld.": {
      "nl": "Typ de tekst zelf; plakken en automatische vervanging zijn uitgeschakeld.",
      "en": "Type the text yourself; pasting and automatic replacement are disabled.",
      "de": "Tippe den Text selbst; Einfügen und automatische Ersetzung sind deaktiviert."
    },
    "Plakken is uitgeschakeld tijdens de typetest.": {
      "nl": "Plakken is uitgeschakeld tijdens de typetest.",
      "en": "Pasting is disabled during the typing test.",
      "de": "Einfügen ist während des Tipptests deaktiviert."
    },
    "language.nl": {
      "nl": "Nederlands",
      "en": "Dutch",
      "de": "Niederländisch"
    },
    "language.en": {
      "nl": "Engels",
      "en": "English",
      "de": "Englisch"
    },
    "language.de": {
      "nl": "Duits",
      "en": "German",
      "de": "Deutsch"
    },
    "language.fr": {
      "nl": "Frans",
      "en": "French",
      "de": "Französisch"
    },
    "language.es": {
      "nl": "Spaans",
      "en": "Spanish",
      "de": "Spanisch"
    },
    "language.it": {
      "nl": "Italiaans",
      "en": "Italian",
      "de": "Italienisch"
    },
    "page.title": {
      "nl": "Ritme · vind je ritme",
      "en": "Ritme · find your rhythm",
      "de": "Ritme · finde deinen Rhythmus"
    },
    "page.description": {
      "nl": "Ritme: een rustige typetest met zes testtalen, een getallenmodus en persoonlijke voortgang. Zonder account; ook lokaal te gebruiken.",
      "en": "Ritme: a calm typing test with six test languages, a numbers mode and personal progress. No account; also works locally.",
      "de": "Ritme: ein ruhiger Tipptest mit sechs Testsprachen, Zahlenmodus und persönlichem Fortschritt. Ohne Konto; auch lokal nutzbar."
    },
    "characters": {
      "nl": "{count} tekens",
      "en": "{count} characters",
      "de": "{count} Zeichen"
    },
    "result.announce": {
      "nl": "Test afgerond. {wpm} woorden per minuut. {accuracy} procent eindnauwkeurigheid.",
      "en": "Test complete. {wpm} words per minute. {accuracy} percent final accuracy.",
      "de": "Test abgeschlossen. {wpm} Wörter pro Minute. {accuracy} Prozent Textgenauigkeit."
    },
    "result.corrections": {
      "nl": "{corrected} van {typos} typefouten verwijderd",
      "en": "{corrected} of {typos} typos removed",
      "de": "{corrected} von {typos} Tippfehlern entfernt"
    },
    "benchmark.build": {
      "nl": "{count}/{needed} eerdere vergelijkbare tests. Geen externe woordbenchmark voor {noun}; vanaf drie eerdere tests zie je je eigen bereik in WPM en CPM.",
      "en": "{count}/{needed} earlier comparable tests. No external word benchmark for {noun}; after three earlier tests, your own range is shown in WPM and CPM.",
      "de": "{count}/{needed} frühere vergleichbare Tests. Kein externer Wortbenchmark für {noun}; ab drei früheren Tests siehst du deinen eigenen Bereich in WPM und CPM."
    },
    "benchmark.range": {
      "nl": "Bereik: {min}–{max} WPM · {minCpm}–{maxCpm} CPM. Gebaseerd op {count} eerdere tests met dezelfde instellingen; deze test is niet meegeteld. Geen bevolkingsnorm.",
      "en": "Range: {min}–{max} WPM · {minCpm}–{maxCpm} CPM. Based on {count} earlier tests with the same settings; this test is excluded. Not a population norm.",
      "de": "Bereich: {min}–{max} WPM · {minCpm}–{maxCpm} CPM. Basierend auf {count} früheren Tests mit denselben Einstellungen; dieser Test zählt nicht mit. Keine Bevölkerungsnorm."
    },
    "benchmark.next": {
      "nl": "Volgende band: {speed}",
      "en": "Next band: {speed}",
      "de": "Nächster Bereich: {speed}"
    },
    "benchmark.top": {
      "nl": "Hoogste indicatieve band",
      "en": "Highest indicative band",
      "de": "Höchster unverbindlicher Bereich"
    },
    "benchmark.help": {
      "nl": "Bandbreedtes & bron",
      "en": "Bands & source",
      "de": "Bereiche & Quelle"
    },
    "benchmark.helpAria": {
      "nl": "Bekijk alle bandbreedtes en de onderbouwing",
      "en": "View all bands and their basis",
      "de": "Alle Bereiche und ihre Grundlage ansehen"
    },
    "benchmark.scaleAria": {
      "nl": "Je snelheid op één schaal met WPM en CPM",
      "en": "Your speed on one scale with WPM and CPM",
      "de": "Dein Tempo auf einer Skala mit WPM und CPM"
    },
    "benchmark.units": {
      "nl": "WPM en CPM zijn twee eenheden voor dezelfde snelheid.",
      "en": "WPM and CPM are two units for the same speed.",
      "de": "WPM und CPM sind zwei Einheiten für dieselbe Geschwindigkeit."
    },
    "benchmark.previousRange": {
      "nl": "Bereik van je eerdere tests",
      "en": "Range of your earlier tests",
      "de": "Bereich deiner früheren Tests"
    },
    "benchmark.comparable.one": {
      "nl": "{count} vergelijkbare woordtest. ",
      "en": "{count} comparable word test. ",
      "de": "{count} vergleichbarer Worttest. "
    },
    "benchmark.comparable.other": {
      "nl": "{count} vergelijkbare woordtests. ",
      "en": "{count} comparable word tests. ",
      "de": "{count} vergleichbare Worttests. "
    },
    "chart.title": {
      "nl": "Typesnelheid gedurende {seconds} seconden",
      "en": "Typing speed over {seconds} seconds",
      "de": "Tippgeschwindigkeit über {seconds} Sekunden"
    },
    "chart.desc": {
      "nl": "Burst: aanslagen per seconde. Bruto en netto: voortschrijdende snelheid over vijf seconden. Kruisen tonen typefouten.",
      "en": "Burst: keystrokes per second. Raw and net: rolling speed over five seconds. Crosses show typos.",
      "de": "Spitzentempo: Anschläge pro Sekunde. Brutto und netto: gleitendes Tempo über fünf Sekunden. Kreuze zeigen Tippfehler."
    },
    "weak.tooltip": {
      "nl": "{label}: {errors} fouten / {attempts} invoerpogingen ({errorRate}% fout). {percent}% van alle typefouten.",
      "en": "{label}: {errors} errors / {attempts} attempts ({errorRate}% errors). {percent}% of all typos.",
      "de": "{label}: {errors} Fehler / {attempts} Eingabeversuche ({errorRate}% Fehler). {percent}% aller Tippfehler."
    },
    "result.copy": {
      "nl": "Ritme · {language} · {duration}s · {mode}\n{wpm} WPM · {accuracy} eindnauwkeurigheid\n{keystrokeAccuracy} aanslagnauwkeurigheid · {typos} typefouten · {uncorrected} ongecorrigeerd\n{raw} bruto WPM · {cpm} CPM · {consistency} ritme",
      "en": "Ritme · {language} · {duration}s · {mode}\n{wpm} WPM · {accuracy} final accuracy\n{keystrokeAccuracy} keystroke accuracy · {typos} typos · {uncorrected} uncorrected\n{raw} raw WPM · {cpm} CPM · {consistency} consistency",
      "de": "Ritme · {language} · {duration}s · {mode}\n{wpm} WPM · {accuracy} Textgenauigkeit\n{keystrokeAccuracy} Anschlaggenauigkeit · {typos} Tippfehler · {uncorrected} unkorrigiert\n{raw} Brutto-WPM · {cpm} CPM · {consistency} Gleichmaß"
    },
    "profile.numbers": {
      "nl": "Getallen · {digits} cijfers",
      "en": "Numbers · {digits} digits",
      "de": "Zahlen · {digits} Ziffern"
    },
    "pb.numbers": {
      "nl": "{duration}s · alleen cijfers",
      "en": "{duration}s · digits only",
      "de": "{duration}s · nur Ziffern"
    },
    "practice.minutes.one": {
      "nl": "{count} minuut geoefend",
      "en": "{count} minute practised",
      "de": "{count} Minute geübt"
    },
    "practice.minutes.other": {
      "nl": "{count} minuten geoefend",
      "en": "{count} minutes practised",
      "de": "{count} Minuten geübt"
    },
    "progress.excluded.one": {
      "nl": " {count} test telt daardoor niet mee in de grafiek.",
      "en": " {count} test is therefore excluded from the chart.",
      "de": " {count} Test wird daher im Diagramm nicht berücksichtigt."
    },
    "progress.excluded.other": {
      "nl": " {count} tests tellen daardoor niet mee in de grafiek.",
      "en": " {count} tests are therefore excluded from the chart.",
      "de": " {count} Tests werden daher im Diagramm nicht berücksichtigt."
    },
    "history.viewAria": {
      "nl": "Bekijk test van {date} om {time}",
      "en": "View test from {date} at {time}",
      "de": "Test vom {date} um {time} ansehen"
    },
    "progress.desc": {
      "nl": "{count} tests, chronologisch van oud naar nieuw. {trend} Selecteer een meetpunt voor het volledige resultaat.",
      "en": "{count} tests, from oldest to newest. {trend} Select a point for the full result.",
      "de": "{count} Tests, chronologisch von alt nach neu. {trend} Wähle einen Messpunkt für das vollständige Ergebnis."
    },
    "progress.pointAria": {
      "nl": "{date}: {value} {unit}. Open resultaat.",
      "en": "{date}: {value} {unit}. Open result.",
      "de": "{date}: {value} {unit}. Ergebnis öffnen."
    },
    "progress.change": {
      "nl": "{change} {unit} · laatste 5 vs. vorige 5",
      "en": "{change} {unit} · last 5 vs. previous 5",
      "de": "{change} {unit} · letzte 5 vs. vorherige 5"
    },
    "progress.click": {
      "nl": "Klik voor het resultaat",
      "en": "Click for the result",
      "de": "Klicken für das Ergebnis"
    },
    "import.count.one": {
      "nl": "{count} test geïmporteerd. ",
      "en": "{count} test imported. ",
      "de": "{count} Test importiert. "
    },
    "import.count.other": {
      "nl": "{count} tests geïmporteerd. ",
      "en": "{count} tests imported. ",
      "de": "{count} Tests importiert. "
    },
    "import.skipped": {
      "nl": "{count} ongeldige resultaten overgeslagen. ",
      "en": "{count} invalid results skipped. ",
      "de": "{count} ungültige Ergebnisse übersprungen. "
    },
    "source.items": {
      "nl": "{language} · {count} items",
      "en": "{language} · {count} entries",
      "de": "{language} · {count} Einträge"
    },
    "Grafieklagen aan- of uitzetten": {
      "nl": "Grafieklagen aan- of uitzetten",
      "en": "Toggle chart layers",
      "de": "Diagrammebenen ein- oder ausblenden"
    },
    "Snelheidsbenchmark": {
      "nl": "Snelheidsbenchmark",
      "en": "Speed benchmark",
      "de": "Tempovergleich"
    },
    "Typesnelheid en fouten gedurende de test": {
      "nl": "Typesnelheid en fouten gedurende de test",
      "en": "Typing speed and errors throughout the test",
      "de": "Tippgeschwindigkeit und Fehler während des Tests"
    },
    "help.paragraph.0": {
      "nl": "Kies een taal en testduur. De klok start bij de eerste letter, niet bij het openen van de pagina. De test stopt automatisch op tijd. Tijdens de test kun je met <kbd>backspace</kbd> corrigeren, ook in een vorig woord.",
      "en": "Choose a test language and duration. The clock starts with your first character, not when you open the page. The test stops automatically when time is up. Use <kbd>backspace</kbd> to correct mistakes, including in a previous word.",
      "de": "Wähle eine Testsprache und Testdauer. Die Uhr beginnt mit dem ersten Zeichen, nicht beim Öffnen der Seite. Der Test endet automatisch, wenn die Zeit abgelaufen ist. Mit <kbd>backspace</kbd> kannst du Fehler korrigieren, auch in einem vorherigen Wort."
    },
    "help.paragraph.1": {
      "nl": "De woordmodus trekt onafhankelijke items uit een vaste woordenlijst. Dit zijn losse woorden, geen grammaticale zinnen. Met <strong>eigen tekst</strong> kun je een Nederlandse of Engelse passage plakken. Regeleinden en dubbele spaties worden dan vervangen door één spatie. Hoofdletters en accenten blijven behouden.",
      "en": "Word mode draws independent entries from a fixed word list. These are individual words, not grammatical sentences. With <strong>Custom text</strong>, paste a passage in the language you want to practise. Line breaks and repeated spaces become a single space. Capital letters and accents are preserved.",
      "de": "Der Wortmodus zieht unabhängige Einträge aus einer festen Wortliste. Das sind einzelne Wörter, keine grammatischen Sätze. Unter <strong>Eigener Text</strong> kannst du einen Abschnitt in der gewünschten Sprache einfügen. Zeilenumbrüche und mehrfache Leerzeichen werden durch ein einzelnes Leerzeichen ersetzt. Großbuchstaben und Akzente bleiben erhalten."
    },
    "help.paragraph.2": {
      "nl": "<strong>Getallen</strong> is een zelfstandige modus: alleen cijfers, gescheiden door spaties. Kies vaste lengtes van 2, 3, 4 of 6 cijfers, of een gelijke verdeling over lengtes van 2–4 cijfers. De eerste positie is nooit een nul. De taalkeuze en leestekens zijn in deze modus niet van toepassing. WPM blijft ook hier gebaseerd op vijf tekens, inclusief spaties; CPM geeft de correcte tekens per minuut.",
      "en": "<strong>Numbers</strong> is a separate mode: digits only, separated by spaces. Choose a fixed length of 2, 3, 4 or 6 digits, or an equal distribution of lengths from 2 to 4 digits. The first digit is never zero. Language and punctuation settings do not apply in this mode. WPM still uses five characters, including spaces; CPM gives correct characters per minute.",
      "de": "<strong>Zahlen</strong> ist ein eigener Modus: nur Ziffern, durch Leerzeichen getrennt. Wähle eine feste Länge von 2, 3, 4 oder 6 Ziffern oder gleichverteilte Längen von 2 bis 4 Ziffern. Die erste Ziffer ist nie null. Sprache und Satzzeichen sind in diesem Modus nicht relevant. WPM basiert auch hier auf fünf Zeichen einschließlich Leerzeichen; CPM gibt korrekte Zeichen pro Minute an."
    },
    "help.paragraph.3": {
      "nl": "In <strong>Woorden</strong> mengt <strong>+ 123</strong> gemiddeld door 1 op 10 items een getal van 1 t/m 999. <strong>Leestekens</strong> voegt gemiddeld aan 1 op 5 items een punt, komma, dubbele punt of puntkomma toe. Zonder hoofdlettermodus worden woorden in kleine letters aangeboden; accenten blijven staan.",
      "en": "In <strong>Words</strong>, <strong>+ 123</strong> replaces an average of 1 in 10 entries with a number from 1 to 999. <strong>Punctuation</strong> adds a full stop, comma, colon or semicolon to an average of 1 in 5 entries. With capitals disabled, words are displayed in lower case; accents are preserved.",
      "de": "Im Modus <strong>Wörter</strong> ersetzt <strong>+ 123</strong> durchschnittlich jeden zehnten Eintrag durch eine Zahl von 1 bis 999. <strong>Satzzeichen</strong> fügt durchschnittlich jedem fünften Eintrag einen Punkt, ein Komma, einen Doppelpunkt oder ein Semikolon hinzu. Ohne aktivierte Großbuchstaben erscheinen Wörter in Kleinbuchstaben; Akzente bleiben erhalten."
    },
    "help.paragraph.4": {
      "nl": "<kbd>esc</kbd> Nieuwe test. Tijdens een test met tijdslimiet wordt eerst om bevestiging gevraagd; vrij oefenen wordt direct opnieuw gestart.<br/><kbd>ctrl</kbd> / <kbd>⌥</kbd> + <kbd>backspace</kbd> Verwijder het huidige woord.<br/><kbd>tab</kbd> Navigeer door de bediening. Klik op de tekst om weer te typen.",
      "en": "<kbd>esc</kbd> New test. Timed tests ask for confirmation first; free practice restarts immediately.<br/><kbd>ctrl</kbd> / <kbd>⌥</kbd> + <kbd>backspace</kbd> Delete the current word.<br/><kbd>tab</kbd> Move through the controls. Click the text to resume typing.",
      "de": "<kbd>esc</kbd> Neuer Test. Bei Tests mit Zeitlimit wird zuerst nachgefragt; freies Üben startet sofort neu.<br/><kbd>ctrl</kbd> / <kbd>⌥</kbd> + <kbd>backspace</kbd> Aktuelles Wort löschen.<br/><kbd>tab</kbd> Durch die Bedienelemente navigieren. Klicke auf den Text, um weiterzutippen."
    },
    "help.paragraph.5": {
      "nl": "Een te vroege spatie sluit het woord af: ontbrekende letters tellen als ongecorrigeerd. Dubbele spaties aan het begin van een woord worden genegeerd. Plakken, slepen en automatische tekstvervanging zijn in het testveld uitgeschakeld. Accenten via dode toetsen en tekstcompositie worden ondersteund.",
      "en": "An early space finishes the word: missing letters count as uncorrected. Repeated spaces at the start of a word are ignored. Pasting, dropping text and automatic text replacement are disabled in the test field. Accents entered with dead keys and text composition are supported.",
      "de": "Ein vorzeitiges Leerzeichen beendet das Wort: Fehlende Buchstaben zählen als unkorrigiert. Mehrfache Leerzeichen am Wortanfang werden ignoriert. Einfügen, Ziehen von Text und automatische Textersetzung sind im Testfeld deaktiviert. Akzente über Akzenttasten und Textkomposition werden unterstützt."
    },
    "help.paragraph.6": {
      "nl": "Vergelijk dezelfde taal, duur en instellingen. Woordlengte, leestekens, hoofdletters en de moeilijkheid van een eigen tekst veranderen de taak. Een hogere score op een andere tekst is niet automatisch een betere typevaardigheid.",
      "en": "Compare the same language, duration and settings. Word length, punctuation, capitals and the difficulty of a custom text change the task. A higher score on a different text does not automatically mean better typing skills.",
      "de": "Vergleiche dieselbe Sprache, Dauer und Einstellungen. Wortlänge, Satzzeichen, Großbuchstaben und die Schwierigkeit eines eigenen Textes verändern die Aufgabe. Ein höherer Wert bei einem anderen Text bedeutet nicht automatisch eine bessere Tippfähigkeit."
    },
    "help.paragraph.7": {
      "nl": "De timer loopt door als het venster of tabblad niet actief is. Zulke tests krijgen het label <strong>onderbroken</strong>. Met <strong>stop</strong> kun je eerder afronden; de score gebruikt dan de werkelijk verstreken tijd en krijgt het label <strong>verkort</strong>.",
      "en": "The timer keeps running when the window or tab is inactive. These tests are labelled <strong>interrupted</strong>. Use <strong>stop</strong> to finish early; the score uses the actual elapsed time and is labelled <strong>shortened</strong>.",
      "de": "Die Zeit läuft weiter, wenn das Fenster oder der Tab inaktiv ist. Solche Tests werden als <strong>unterbrochen</strong> markiert. Mit <strong>Stopp</strong> kannst du vorzeitig abschließen; die Berechnung verwendet dann die tatsächlich verstrichene Zeit und erhält die Markierung <strong>verkürzt</strong>."
    },
    "help.paragraph.8": {
      "nl": "Een standaardwoord is hier altijd vijf tekens, inclusief spaties. Er worden dus geen letterlijke woorden geteld.",
      "en": "A standard word always means five characters here, including spaces. Actual words are not counted.",
      "de": "Ein Standardwort bedeutet hier immer fünf Zeichen, einschließlich Leerzeichen. Tatsächliche Wörter werden nicht gezählt."
    },
    "help.paragraph.9": {
      "nl": "WPM = correcte, overgebleven tekens ÷ 5 ÷ minuten<br/>Raw WPM = alle overgebleven getypte tekens ÷ 5 ÷ minuten<br/>CPM = correcte, overgebleven tekens ÷ minuten",
      "en": "WPM = correct retained characters ÷ 5 ÷ minutes<br>Raw WPM = all retained typed characters ÷ 5 ÷ minutes<br>CPM = correct retained characters ÷ minutes",
      "de": "WPM = korrekte verbleibende Zeichen ÷ 5 ÷ Minuten<br>Brutto-WPM = alle verbleibenden getippten Zeichen ÷ 5 ÷ Minuten<br>CPM = korrekte verbleibende Zeichen ÷ Minuten"
    },
    "help.paragraph.10": {
      "nl": "Verwijderde tekens tellen niet mee in deze drie scores. De tijd voor correcties telt wél mee. Bij een foutloze eindtekst kunnen WPM en Raw WPM daarom gelijk zijn, óók als je onderweg veel hebt gecorrigeerd.",
      "en": "Deleted characters do not count towards these three scores. Time spent correcting does count. WPM and Raw WPM can therefore be equal when the final text is error-free, even after many corrections.",
      "de": "Gelöschte Zeichen zählen nicht zu diesen drei Werten. Die Zeit für Korrekturen zählt jedoch mit. Bei einem fehlerfreien Endtext können WPM und Brutto-WPM daher gleich sein, auch nach vielen Korrekturen."
    },
    "help.paragraph.11": {
      "nl": "De schaal geeft een <strong>indicatieve tempo-indeling</strong>, geen officiële vaardigheidsnorm of ranglijst. De namen en grenzen zijn een eigen indeling van Ritme; ze komen niet als zes categorieën uit het onderzoek. Eén test beoordeelt niet je totale typevaardigheid.",
      "en": "The scale is an <strong>indicative pace classification</strong>, not an official skill standard or ranking. The category names and boundaries are Ritme’s own; the study did not define these six categories. One test does not measure your overall typing ability.",
      "de": "Die Skala zeigt eine <strong>unverbindliche Tempoeinteilung</strong>, keine offizielle Fähigkeitsnorm oder Rangliste. Namen und Grenzen sind eine eigene Einteilung von Ritme; diese sechs Kategorien stammen nicht aus der Studie. Ein einzelner Test bewertet nicht deine gesamte Tippfähigkeit."
    },
    "help.paragraph.12": {
      "nl": "Bovengrenzen zijn exclusief: precies 60 WPM valt dus in Vlot. De onafgeronde score bepaalt de band. CPM = WPM × 5; het zijn twee eenheden voor dezelfde snelheid, geen twee aparte benchmarks. Dit is correcte tekstuitvoer, niet het aantal fysieke toetsindrukken.",
      "en": "Upper limits are exclusive: exactly 60 WPM falls in Fluent. Your unrounded score determines the band. CPM = WPM × 5: two units for the same speed, not two separate benchmarks. This measures correct text output, not physical key presses.",
      "de": "Obergrenzen sind ausgeschlossen: Genau 60 WPM fällt in Flott. Der ungerundete Wert bestimmt den Bereich. CPM = WPM × 5: zwei Einheiten für dasselbe Tempo, keine zwei getrennten Benchmarks. Gemessen wird korrekte Textausgabe, nicht die Zahl physischer Tastendrücke."
    },
    "help.paragraph.13": {
      "nl": "<a href=\"https://www.aalto.fi/en/news/the-traits-of-fast-typists-discovered-by-analysing-136-million-keystrokes\" rel=\"noopener noreferrer\" target=\"_blank\">Aalto University (2018)</a> rapporteert circa 52 WPM gemiddeld en ongeveer 30–60 WPM als gangbare band in een groot onderzoek. De lijn gebruikt het afgeronde gemiddelde: 52 WPM, omgerekend 260 CPM.",
      "en": "<a href=\"https://www.aalto.fi/en/news/the-traits-of-fast-typists-discovered-by-analysing-136-million-keystrokes\" target=\"_blank\" rel=\"noopener noreferrer\">Aalto University (2018)</a> reports an average of about 52 WPM and a typical range of about 30–60 WPM in a large study. The line uses the rounded average: 52 WPM, equivalent to 260 CPM.",
      "de": "<a href=\"https://www.aalto.fi/en/news/the-traits-of-fast-typists-discovered-by-analysing-136-million-keystrokes\" target=\"_blank\" rel=\"noopener noreferrer\">Aalto University (2018)</a> berichtet in einer großen Studie von durchschnittlich etwa 52 WPM und einem üblichen Bereich von ungefähr 30–60 WPM. Die Linie verwendet den gerundeten Durchschnitt: 52 WPM, entsprechend 260 CPM."
    },
    "help.paragraph.14": {
      "nl": "<a href=\"https://userinterfaces.aalto.fi/136Mkeystrokes/\" rel=\"noopener noreferrer\" target=\"_blank\">Dhakal, Feit, Kristensson &amp; Oulasvirta, CHI 2018</a>: ruim 168.000 zelfgeselecteerde vrijwilligers typten Engelse zinnen, hoofdzakelijk op een fysiek toetsenbord. Dit is geen representatieve norm voor Nederlanders of alle computergebruikers. <a href=\"https://acris.aalto.fi/ws/portalfiles/portal/21495207/ELEC_Dhakal_et_al_Observations_CHI2018.pdf\" rel=\"noopener noreferrer\" target=\"_blank\">Onderzoek en meetmethode (PDF)</a>.",
      "en": "<a href=\"https://userinterfaces.aalto.fi/136Mkeystrokes/\" target=\"_blank\" rel=\"noopener noreferrer\">Dhakal, Feit, Kristensson &amp; Oulasvirta, CHI 2018</a>: over 168,000 self-selected volunteers typed English sentences, mainly on physical keyboards. This is not a representative norm for Dutch people or all computer users. <a href=\"https://acris.aalto.fi/ws/portalfiles/portal/21495207/ELEC_Dhakal_et_al_Observations_CHI2018.pdf\" target=\"_blank\" rel=\"noopener noreferrer\">Study and measurement method (PDF)</a>.",
      "de": "<a href=\"https://userinterfaces.aalto.fi/136Mkeystrokes/\" target=\"_blank\" rel=\"noopener noreferrer\">Dhakal, Feit, Kristensson &amp; Oulasvirta, CHI 2018</a>: Über 168.000 freiwillige, selbst ausgewählte Teilnehmende tippten englische Sätze, überwiegend auf physischen Tastaturen. Dies ist keine repräsentative Norm für Niederländer oder alle Computernutzer. <a href=\"https://acris.aalto.fi/ws/portalfiles/portal/21495207/ELEC_Dhakal_et_al_Observations_CHI2018.pdf\" target=\"_blank\" rel=\"noopener noreferrer\">Studie und Messmethode (PDF)</a>."
    },
    "help.paragraph.15": {
      "nl": "Het onderzoek telt de lengte van de overgetypte tekst; Ritme telt alleen correcte eindtekens. Ook de taak en timing verschillen. Daarom is de vergelijking globaal, zonder persoonlijke percentielclaim. Taal, tekst, leestekens, apparaat en testduur blijven relevant. Bij een test korter dan 60 seconden staat een momentopname-waarschuwing.",
      "en": "The study counts the length of the transcribed text; Ritme counts only correct final characters. The task and timing differ too. The comparison is therefore approximate, with no personal percentile claim. Language, text, punctuation, device and test duration remain relevant. Tests under 60 seconds show a snapshot warning.",
      "de": "Die Studie zählt die Länge des abgeschriebenen Textes; Ritme zählt nur korrekte Endzeichen. Auch Aufgabe und Zeitmessung unterscheiden sich. Der Vergleich ist deshalb grob und behauptet keinen persönlichen Perzentilrang. Sprache, Text, Satzzeichen, Gerät und Testdauer bleiben relevant. Tests unter 60 Sekunden zeigen einen Hinweis auf die Momentaufnahme."
    },
    "help.paragraph.16": {
      "nl": "Geen woordbenchmark voor cijferreeksen. Vanaf drie eerdere volledige, niet-onderbroken tests met dezelfde instellingen toont Ritme het <strong>minimum–maximum van je eigen voorgaande tests</strong>, met hun gemiddelde als referentielijn. De huidige test telt niet mee in zijn eigen referentie. Alleen eerder gedateerde, nog lokaal bewaarde tests tellen mee. Dit bereik is geen betrouwbaarheidsinterval en geen vergelijking met andere mensen. Tot die tijd staat er hoeveel referentietests ontbreken.",
      "en": "There is no word benchmark for number sequences. After three earlier complete, uninterrupted tests with the same settings, Ritme shows the <strong>minimum–maximum of your own previous tests</strong>, with their average as a reference line. The current test does not contribute to its own reference. Only earlier-dated tests still stored locally count. This range is not a confidence interval or a comparison with other people. Until then, you can see how many reference tests are still needed.",
      "de": "Für Zahlenfolgen gibt es keinen Wortbenchmark. Ab drei früheren vollständigen, nicht unterbrochenen Tests mit denselben Einstellungen zeigt Ritme das <strong>Minimum–Maximum deiner eigenen vorherigen Tests</strong>, mit deren Durchschnitt als Referenzlinie. Der aktuelle Test zählt nicht zu seiner eigenen Referenz. Es zählen nur früher datierte, noch lokal gespeicherte Tests. Dieser Bereich ist kein Konfidenzintervall und kein Vergleich mit anderen Menschen. Bis dahin siehst du, wie viele Referenztests noch fehlen."
    },
    "help.paragraph.17": {
      "nl": "Eigen teksten, afgebroken tests en onderbroken tests krijgen geen extern tempolabel. In Voortgang wordt de externe schaal alleen getoond voor een selectie van vergelijkbare woordtests, bij de meting Snelheid. De lijn in de voortgangsgrafiek is hetzelfde onderzoeksreferentiepunt; hij blijft weg bij getallen, gemengde instellingen en nauwkeurigheids- of ritmemetingen.",
      "en": "Custom texts, shortened tests and interrupted tests do not receive an external pace label. In Progress, the external scale appears only for a selection of comparable word tests with the Speed metric. The line in the progress chart uses the same study reference; it is not shown for numbers, mixed settings, accuracy or consistency.",
      "de": "Eigene Texte, verkürzte und unterbrochene Tests erhalten keine externe Tempobewertung. Unter Fortschritt erscheint die externe Skala nur bei einer Auswahl vergleichbarer Worttests mit der Kennzahl Tempo. Die Linie im Fortschrittsdiagramm verwendet denselben Studienreferenzwert; bei Zahlen, gemischten Einstellungen, Genauigkeit oder Gleichmaß wird sie nicht angezeigt."
    },
    "help.paragraph.18": {
      "nl": "Accuracy = correcte eindtekens ÷ (overgebleven getypte tekens + overgeslagen tekens) × 100%<br/>Aanslagnauwkeurigheid = juiste invoerpogingen ÷ alle invoerpogingen × 100%",
      "en": "Final accuracy = correct final characters ÷ (retained typed characters + skipped characters) × 100%<br>Keystroke accuracy = correct input attempts ÷ all input attempts × 100%",
      "de": "Textgenauigkeit = korrekte Endzeichen ÷ (verbleibende getippte Zeichen + übersprungene Zeichen) × 100%<br>Anschlaggenauigkeit = richtige Eingabeversuche ÷ alle Eingabeversuche × 100%"
    },
    "help.paragraph.19": {
      "nl": "De grote <strong>Accuracy</strong>-score beschrijft het resultaat na corrigeren. Aanslagnauwkeurigheid telt ook gecorrigeerde typefouten mee. Backspace, Shift en andere bedieningstoetsen zijn geen tekeninvoerpogingen. Een voortijdige spatie is een foute invoerpoging. Het niet bereikte tekstdeel telt niet als fout.",
      "en": "The large <strong>Final accuracy</strong> score describes the text after corrections. Keystroke accuracy also counts corrected typos. Backspace, Shift and other control keys are not character input attempts. An early space is an incorrect attempt. Text you did not reach is not counted as an error.",
      "de": "Der große Wert <strong>Textgenauigkeit</strong> beschreibt den Text nach den Korrekturen. Die Anschlaggenauigkeit berücksichtigt auch korrigierte Tippfehler. Backspace, Umschalt und andere Steuertasten sind keine Zeicheneingabeversuche. Ein vorzeitiges Leerzeichen ist ein fehlerhafter Versuch. Nicht erreichter Text zählt nicht als Fehler."
    },
    "help.paragraph.20": {
      "nl": "<strong>Typos</strong> telt foute invoerpogingen tijdens de hele test. <strong>Uncorrected</strong> telt verkeerde, extra en overgeslagen tekens die nog in de eindtekst zitten. Eén vroege spatie kan meerdere letters overslaan. Daarom hoeven deze aantallen niet gelijk te lopen.",
      "en": "<strong>Typos</strong> counts incorrect input attempts throughout the test. <strong>Uncorrected</strong> counts wrong, extra and skipped characters remaining in the final text. One early space can skip several letters, so these counts do not necessarily match.",
      "de": "<strong>Tippfehler</strong> zählt falsche Eingabeversuche während des gesamten Tests. <strong>Unkorrigiert</strong> zählt falsche, zusätzliche und übersprungene Zeichen, die im Endtext verbleiben. Ein vorzeitiges Leerzeichen kann mehrere Buchstaben überspringen. Die Zahlen müssen daher nicht übereinstimmen."
    },
    "help.paragraph.21": {
      "nl": "<strong>Burst</strong> is het aantal tekeninvoerpogingen per seconde, omgerekend naar WPM. <strong>Raw</strong> en <strong>Net WPM</strong> zijn voortschrijdende snelheden over de afgelopen vijf seconden. De kruisen markeren het moment waarop een fout is gemaakt; de kleur geeft aan of die fout later is verwijderd.",
      "en": "<strong>Burst</strong> is the number of character input attempts per second, converted to WPM. <strong>Raw</strong> and <strong>Net</strong> are rolling speeds over the last five seconds. Crosses mark when an error was made; their colour indicates whether it was later removed.",
      "de": "<strong>Spitzentempo</strong> ist die Zahl der Zeicheneingabeversuche pro Sekunde, umgerechnet in WPM. <strong>Brutto</strong> und <strong>Netto</strong> sind gleitende Geschwindigkeiten über die letzten fünf Sekunden. Kreuze markieren den Zeitpunkt eines Fehlers; die Farbe zeigt, ob er später entfernt wurde."
    },
    "help.paragraph.22": {
      "nl": "Consistency = 100 ÷ (1 + standaardafwijking ÷ gemiddelde)",
      "en": "Consistency = 100 ÷ (1 + standard deviation ÷ mean)",
      "de": "Gleichmaß = 100 ÷ (1 + Standardabweichung ÷ Mittelwert)"
    },
    "help.paragraph.23": {
      "nl": "De formule gebruikt de aantallen invoerpogingen in volledige vensters van één seconde. Hoger betekent gelijkmatiger. Bij minder dan vijf volledige seconden wordt geen consistency-score getoond. Dit is een expliciete eigen meetmethode: niet noodzakelijk dezelfde als op de oorspronkelijke website.",
      "en": "The formula uses input attempt counts in complete one-second windows. Higher means more consistent. No consistency score is shown for fewer than five complete seconds. This is an explicit in-app measurement method, not necessarily the method used by the original website.",
      "de": "Die Formel verwendet die Zahl der Eingabeversuche in vollständigen Ein-Sekunden-Fenstern. Höher bedeutet gleichmäßiger. Bei weniger als fünf vollständigen Sekunden wird kein Gleichmaßwert angezeigt. Dies ist eine ausdrücklich eigene Messmethode, nicht zwingend dieselbe wie auf der ursprünglichen Website."
    },
    "help.paragraph.24": {
      "nl": "Bij een verkeerde letter wordt de <em>verwachte</em> toets geteld; bij een extra letter de ingevoerde toets. De percentages naast balken zijn aandelen van alle typefouten. De tooltip vermeldt fouten / invoerpogingen. Veelgebruikte toetsen kunnen meer fouten hebben zonder relatief moeilijker te zijn. De vingertoewijzing volgt standaard US QWERTY, niet een meting van je echte handgebruik. Bij de numpadkeuze volgt het advies de numpadindeling; Enter- en spatiefouten staan samen apart.",
      "en": "For an incorrect letter, the <em>expected</em> key is counted; for an extra letter, the entered key is counted. Percentages beside bars are shares of all typos. Tooltips show errors / attempts. Frequently used keys can have more errors without being relatively harder. Finger assignment follows standard US QWERTY, not a measurement of your actual hand use. With the numpad option, guidance uses numpad assignments; Enter and Space errors are grouped separately.",
      "de": "Bei einem falschen Buchstaben wird die <em>erwartete</em> Taste gezählt, bei einem zusätzlichen Buchstaben die eingegebene Taste. Die Prozentwerte neben den Balken sind Anteile aller Tippfehler. Tooltips zeigen Fehler / Versuche. Häufig genutzte Tasten können mehr Fehler haben, ohne relativ schwieriger zu sein. Die Fingerzuordnung folgt Standard-US-QWERTY und misst nicht deine tatsächliche Handnutzung. Bei der Ziffernblockoption folgt die Empfehlung der Ziffernblockzuordnung; Fehler bei Enter und Leertaste stehen gemeinsam separat."
    },
    "help.paragraph.25": {
      "nl": "<strong>Concept en visuele basis: <a href=\"https://www.typespeedtest.com/\" target=\"_blank\" rel=\"noopener noreferrer\">TypeSpeedTest.com</a>.</strong> De oorspronkelijke typetest en de aangeleverde screenshots vormden het vertrekpunt voor de eenvoudige interface van Ritme. Dank aan de makers van TypeSpeedTest.com voor dit uitgangspunt.",
      "en": "<strong>Concept and visual basis: <a href=\"https://www.typespeedtest.com/\" target=\"_blank\" rel=\"noopener noreferrer\">TypeSpeedTest.com</a>.</strong> The original typing test and the supplied screenshots were the starting point for Ritme’s simple interface. Credit to the creators of TypeSpeedTest.com for this foundation.",
      "de": "<strong>Konzept und visuelle Grundlage: <a href=\"https://www.typespeedtest.com/\" target=\"_blank\" rel=\"noopener noreferrer\">TypeSpeedTest.com</a>.</strong> Der ursprüngliche Tipptest und die bereitgestellten Screenshots bildeten den Ausgangspunkt für die einfache Oberfläche von Ritme. Vielen Dank an die Entwickler von TypeSpeedTest.com für diese Grundlage."
    },
    "help.paragraph.26": {
      "nl": "De ingebouwde basiswoordenlijsten zijn afkomstig van <a href=\"https://github.com/monkeytypegame/monkeytype\" rel=\"noopener noreferrer\" target=\"_blank\">Monkeytype</a> en staan onder GPL-3.0. Items zijn overgenomen uit de gepubliceerde taalbestanden; tijdens genereren worden hoofdletters naar kleine letters omgezet en meerwoord-items opgesplitst bij weergave. Dit is geen landelijk representatief of gecontroleerd taalcorpus.",
      "en": "The built-in basic word lists come from <a href=\"https://github.com/monkeytypegame/monkeytype\" target=\"_blank\" rel=\"noopener noreferrer\">Monkeytype</a> and are licensed under GPL-3.0. Entries are taken from the published language files; generation converts capitals to lower case and display splits multi-word entries. This is not a nationally representative or controlled language corpus.",
      "de": "Die eingebauten Basiswortlisten stammen von <a href=\"https://github.com/monkeytypegame/monkeytype\" target=\"_blank\" rel=\"noopener noreferrer\">Monkeytype</a> und stehen unter GPL-3.0. Die Einträge wurden aus den veröffentlichten Sprachdateien übernommen; bei der Erzeugung werden Großbuchstaben kleingeschrieben und mehrteilige Einträge bei der Anzeige getrennt. Dies ist kein landesweit repräsentatives oder kontrolliertes Sprachkorpus."
    },
    "help.paragraph.27": {
      "nl": "Elke trekking gebruikt nieuwe entropie uit <code>crypto.getRandomValues()</code>, gecombineerd met bij de bouw door Python <code>secrets</code> gemaakte basis-entropie. Onbevooroordeelde rejection sampling zet deze om naar een dataset-index. Er is geen <code>Math.random()</code>, herhalende testbank of op context gebaseerde woordkeuze. Woorden en talen mogen door onafhankelijke trekking opnieuw voorkomen. De gerichte oefenmodus filtert vooraf de bestaande dataset op je zwakke toetsen en wordt apart gelabeld. Dit beschrijft de woord- en getallengenerator. De vaste aanslagoefeningen (rijen, letters en Shift) gebruiken juist herhaalbare toetsenbordreeksen, zonder willekeur. Ook de kans op een hoofdletter zonder leestekens (1 op 4) en de letterpositie gebruiken onafhankelijke cryptografische trekkingen.",
      "en": "Each draw uses fresh entropy from <code>crypto.getRandomValues()</code>, combined with base entropy created at build time by Python <code>secrets</code>. Unbiased rejection sampling maps it to a dataset index. There is no <code>Math.random()</code>, repeating test bank or context-based word choice. Independent draws may repeat words or languages. Targeted practice first filters the existing dataset for your weak keys and is labelled separately. This describes the word and number generator. Fixed keystroke exercises (rows, letters and Shift) deliberately use repeatable keyboard patterns without randomness. The chance of a capital without punctuation (1 in 4) and the letter position also use independent cryptographic draws.",
      "de": "Jede Ziehung verwendet neue Entropie aus <code>crypto.getRandomValues()</code>, kombiniert mit beim Erstellen durch Python <code>secrets</code> erzeugter Basisentropie. Unverzerrtes Rejection Sampling bildet sie auf einen Datenindex ab. Es gibt kein <code>Math.random()</code>, keine wiederholte Testbank und keine kontextabhängige Wortwahl. Unabhängige Ziehungen dürfen Wörter oder Sprachen wiederholen. Gezielte Übungen filtern zuvor den vorhandenen Datensatz nach deinen schwachen Tasten und werden gesondert gekennzeichnet. Dies beschreibt den Wort- und Zahlengenerator. Feste Anschlagübungen (Reihen, Buchstaben und Shift) verwenden bewusst wiederholbare Tastaturfolgen ohne Zufall. Auch die Chance auf einen Großbuchstaben ohne Satzzeichen (1 zu 4) und die Buchstabenposition verwenden unabhängige kryptografische Ziehungen."
    },
    "help.paragraph.28": {
      "nl": "De aparte Voortgang-view leest dezelfde lokale geschiedenis als de vorige versie. De keuzelijst groepeert vergelijkbare taal-, duur- en modusinstellingen. In de grafiek is elke stip één volledige, niet-onderbroken test, chronologisch van links naar rechts; de afstand tussen stippen is geen verstreken kalenderduur. Vanaf vijf vergelijkbare tests verschijnt het gemiddelde van de laatste vijf. Vanaf tien tests toont de verandering het gemiddelde van de laatste vijf tegenover de vijf daarvoor. Eigen teksten en verschillende instellingen krijgen geen gezamenlijke trendlijn. Verkorte en onderbroken tests blijven zichtbaar in de lijst, maar tellen niet mee in de kerncijfers of grafiek. Bij Nauwkeurigheid wordt aanslagnauwkeurigheid getoond, niet de eindtekst na correcties.",
      "en": "The separate Progress view reads the same local history as the previous version. The dropdown groups comparable language, duration and mode settings. Each chart point is one complete, uninterrupted test, from oldest to newest; the distance between points is not elapsed calendar time. A last-five average appears after five comparable tests. After ten, the change compares the last five with the previous five. Custom texts and mixed settings do not share a trend line. Shortened and interrupted tests remain in the list but are excluded from key figures and charts. Accuracy shows keystroke accuracy, not final text after corrections.",
      "de": "Die separate Fortschrittsansicht liest denselben lokalen Verlauf wie die vorherige Version. Die Auswahlliste gruppiert vergleichbare Sprach-, Dauer- und Moduseinstellungen. Jeder Diagrammpunkt ist ein vollständiger, nicht unterbrochener Test, von alt nach neu; der Punktabstand stellt keine verstrichene Kalenderzeit dar. Ab fünf vergleichbaren Tests erscheint der Durchschnitt der letzten fünf. Ab zehn vergleicht die Veränderung die letzten fünf mit den fünf davor. Eigene Texte und verschiedene Einstellungen erhalten keine gemeinsame Trendlinie. Verkürzte und unterbrochene Tests bleiben in der Liste, zählen aber nicht zu Kennzahlen oder Diagramm. Genauigkeit zeigt die Anschlaggenauigkeit, nicht den Endtext nach Korrekturen."
    },
    "help.paragraph.29": {
      "nl": "Ritme laadt alleen de bijbehorende CSS- en JavaScript-bestanden; er zijn geen trackers, externe fonts of API-aanroepen. Bij online hosting ontvangt de host de gewone paginaverzoeken en kan die toegangsgegevens loggen. Instellingen en maximaal 100 afgeronde tests worden uitsluitend in <code>localStorage</code> van deze browser bewaard; Ritme verstuurt deze niet naar een server. De ingevoerde of geplakte volledige tekst wordt niet opgeslagen. Resultaten bevatten wél scores, grafiekpunten en geaggregeerde toetsfouten.",
      "en": "Ritme loads only its bundled CSS and JavaScript files; there are no trackers, external fonts or API calls. When hosted online, the host receives ordinary page requests and may log access data. Settings and up to 100 completed tests are saved only in this browser’s <code>localStorage</code>; Ritme does not send them to a server. The complete typed or pasted text is not saved. Results do include scores, chart points and aggregated key errors.",
      "de": "Ritme lädt nur die zugehörigen CSS- und JavaScript-Dateien; es gibt keine Tracker, externen Schriftarten oder API-Aufrufe. Bei Online-Hosting erhält der Host die üblichen Seitenanfragen und kann Zugriffsdaten protokollieren. Einstellungen und bis zu 100 abgeschlossene Tests werden ausschließlich im <code>localStorage</code> dieses Browsers gespeichert; Ritme sendet sie nicht an einen Server. Der vollständige getippte oder eingefügte Text wird nicht gespeichert. Ergebnisse enthalten jedoch Werte, Diagrammpunkte und zusammengefasste Tastenfehler."
    },
    "help.paragraph.30": {
      "nl": "Via <strong>Voortgang → Beheer</strong> kun je de huidige selectie naar CSV exporteren, alle tests als JSON-back-up downloaden, JSON of een CSV uit de vorige versie importeren, of je geschiedenis wissen. Een JSON-back-up bewaart ook de grafiekpunten en toetsstatistieken; een CSV bevat alleen samenvattende scores. Bij import worden dubbele resultaten samengevoegd en blijven de nieuwste 100 tests behouden. Browseropslag kan gewist of geblokkeerd worden, vooral in privémodus. De opslag van lokaal geopende HTML-bestanden is browserafhankelijk; hernoemen of verplaatsen kan een andere opslagruimte opleveren. Bewaar bij het vervangen dezelfde bestandsnaam en locatie. Als je browser toch een andere opslagruimte gebruikt, importeer dan je back-up. Een lokale pagina kan niet automatisch de opslag van een andere tijdelijke bestandlocatie uitlezen.",
      "en": "Use <strong>Progress → Manage</strong> to export the selection to CSV, download all tests as a JSON backup, import JSON or CSV from the previous version, or clear history. JSON also preserves chart points and key statistics; CSV holds summary scores only. Imports merge duplicates and keep the newest 100 tests. Browser storage can be cleared or blocked, especially in private mode. Storage for local HTML files is browser-dependent: renaming or moving a file may create a different storage area. Keep the same filename and location when replacing it. If the browser uses another storage area, import your backup. A local page cannot automatically read storage belonging to another temporary file location. CSV column names stay unchanged across interface languages so older exports remain compatible.",
      "de": "Unter <strong>Fortschritt → Verwalten</strong> kannst du die Auswahl als CSV exportieren, alle Tests als JSON-Backup herunterladen, JSON oder CSV aus der vorherigen Version importieren oder den Verlauf löschen. JSON bewahrt auch Diagrammpunkte und Tastenstatistiken; CSV enthält nur zusammengefasste Werte. Beim Import werden Duplikate zusammengeführt und die neuesten 100 Tests behalten. Browserspeicher kann gelöscht oder blockiert werden, besonders im Privatmodus. Die Speicherung lokal geöffneter HTML-Dateien hängt vom Browser ab: Umbenennen oder Verschieben kann einen anderen Speicherbereich erzeugen. Behalte beim Ersetzen denselben Dateinamen und Speicherort. Verwendet der Browser einen anderen Speicherbereich, importiere dein Backup. Eine lokale Seite kann den Speicher einer anderen temporären Datei nicht automatisch lesen. CSV-Spaltennamen bleiben in allen Oberflächensprachen unverändert, damit ältere Exporte kompatibel bleiben."
    },
    "help.paragraph.31": {
      "nl": "Woordenlijsten: © Monkeytype contributors. Zelfstandige applicatie en Ritme-aanpassingen: 14 september 2026. De HTML-, CSS- en JavaScript-bestanden vormen samen de leesbare broncode en worden verspreid onder GPL-3.0, zonder garantie. Er zijn geen afhankelijkheden van externe bibliotheken. Zie ook LICENSE en THIRD_PARTY_NOTICES.md in de repository.",
      "en": "Word lists: © Monkeytype contributors. Standalone application and Ritme adaptations: 14 September 2026. The HTML, CSS and JavaScript files together form the readable source code and are distributed under GPL-3.0, without warranty. There are no third-party library dependencies. Also see LICENSE and THIRD_PARTY_NOTICES.md in the repository. The full licence below remains in its original English.",
      "de": "Wortlisten: © Monkeytype contributors. Eigenständige Anwendung und Ritme-Anpassungen: 14. September 2026. Die HTML-, CSS- und JavaScript-Dateien bilden zusammen den lesbaren Quellcode und werden unter GPL-3.0 ohne Garantie verbreitet. Es gibt keine Abhängigkeiten von externen Bibliotheken. Siehe auch LICENSE und THIRD_PARTY_NOTICES.md im Repository. Der vollständige Lizenztext unten bleibt im englischen Original."
    },
    "help.interface.heading": {
      "nl": "Interface en testtaal",
      "en": "Interface and test language",
      "de": "Oberfläche und Testsprache"
    },
    "help.interface.copy": {
      "nl": "Met NL / ENG / DE rechtsboven wijzig je alleen de interface. Je testtaal, woorden, cijfers en resultaten blijven gelijk. De voorkeur wordt lokaal onthouden. De CSV-kolomnamen blijven voor uitwisselbaarheid hetzelfde in alle interfacetalen.",
      "en": "NL / ENG / DE at the top right changes only the interface. Your test language, words, numbers and results stay the same. The preference is saved locally. CSV column names remain the same in every interface language for compatibility.",
      "de": "NL / ENG / DE oben rechts ändert nur die Oberfläche. Testsprache, Wörter, Zahlen und Ergebnisse bleiben gleich. Die Auswahl wird lokal gespeichert. CSV-Spaltennamen bleiben aus Kompatibilitätsgründen in jeder Oberflächensprache gleich."
    },
    "progress.studyReference": {
      "nl": "Onderzoek: circa 52 WPM / 260 CPM. Alleen een globale referentie.",
      "en": "Study: about 52 WPM / 260 CPM. A broad reference only.",
      "de": "Studie: etwa 52 WPM / 260 CPM. Nur ein grober Referenzwert."
    },
    "practice.mode": {
      "nl": "Oefenen",
      "en": "Practice",
      "de": "Üben"
    },
    "practice.mode.title": {
      "nl": "Oefen je aanslag met vingerkleuren en een toetsenbordgids",
      "en": "Practise your keystrokes with finger colours and a keyboard guide",
      "de": "Übe deine Anschläge mit Fingerfarben und Tastaturhilfe"
    },
    "practice.settings": {
      "nl": "Oefeninstellingen",
      "en": "Practice settings",
      "de": "Übungseinstellungen"
    },
    "practice.lesson": {
      "nl": "Oefening",
      "en": "Exercise",
      "de": "Übung"
    },
    "practice.lesson.words": {
      "nl": "Woorden",
      "en": "Words",
      "de": "Wörter"
    },
    "practice.lesson.home": {
      "nl": "Basisrij",
      "en": "Home row",
      "de": "Grundreihe"
    },
    "practice.lesson.top": {
      "nl": "Bovenrij",
      "en": "Top letter row",
      "de": "Obere Buchstabenreihe"
    },
    "practice.lesson.bottom": {
      "nl": "Onderrij",
      "en": "Bottom letter row",
      "de": "Untere Buchstabenreihe"
    },
    "practice.lesson.letters": {
      "nl": "Alle letters",
      "en": "All letters",
      "de": "Alle Buchstaben"
    },
    "practice.lesson.shift": {
      "nl": "Shift · hoofdletters & tekens",
      "en": "Shift · capitals & symbols",
      "de": "Shift · Großbuchstaben & Zeichen"
    },
    "practice.lesson.digits": {
      "nl": "Cijferrij · 123",
      "en": "Number row · 123",
      "de": "Ziffernreihe · 123"
    },
    "practice.lesson.weak": {
      "nl": "Zwakke toetsen",
      "en": "Weak keys",
      "de": "Schwache Tasten"
    },
    "practice.keyboard": {
      "nl": "toetsenbord",
      "en": "keyboard",
      "de": "Tastatur"
    },
    "practice.colors": {
      "nl": "vingerkleuren",
      "en": "finger colours",
      "de": "Fingerfarben"
    },
    "practice.guide": {
      "nl": "Aanslaghulp · US QWERTY",
      "en": "Keystroke guide · US QWERTY",
      "de": "Anschlaghilfe · US QWERTY"
    },
    "practice.next": {
      "nl": "Volgende toets:",
      "en": "Next key:",
      "de": "Nächste Taste:"
    },
    "practice.accent": {
      "nl": "Samengestelde aanslag · gebruik je eigen accentcombinatie",
      "en": "Composed character · use your keyboard’s accent combination",
      "de": "Zusammengesetztes Zeichen · verwende deine Akzentkombination"
    },
    "practice.shift.left": {
      "nl": "+ linker Shift · L5",
      "en": "+ left Shift · L5",
      "de": "+ linke Shift-Taste · L5"
    },
    "practice.shift.right": {
      "nl": "+ rechter Shift · R5",
      "en": "+ right Shift · R5",
      "de": "+ rechte Shift-Taste · R5"
    },
    "practice.repair": {
      "nl": "Fout? Herstel met Backspace.",
      "en": "Mistake? Correct with Backspace.",
      "de": "Fehler? Mit Backspace korrigieren."
    },
    "practice.homehint": {
      "nl": "F + J · voel de rustpunten",
      "en": "F + J · feel the home markers",
      "de": "F + J · ertaste die Orientierungspunkte"
    },
    "practice.layout": {
      "nl": "US QWERTY · geen numpad",
      "en": "US QWERTY · no numpad",
      "de": "US QWERTY · ohne Ziffernblock"
    },
    "practice.layout.warning": {
      "nl": "Je aanslag wijkt af van de gekozen indeling. Controleer ⓘ → Toetsenbordindeling. De gids verandert je systeeminstellingen niet.",
      "en": "Your key differs from the selected layout. Check ⓘ → Keyboard layout. The guide does not change system settings.",
      "de": "Dein Anschlag weicht von der gewählten Belegung ab. Prüfe ⓘ → Tastaturbelegung. Die Hilfe ändert keine Systemeinstellungen."
    },
    "practice.legend": {
      "nl": "Kleurkaart & vingerindeling",
      "en": "Colour card & finger map",
      "de": "Farbkarte & Fingerzuordnung"
    },
    "practice.card": {
      "nl": "Vingerkleurkaart",
      "en": "Finger colour card",
      "de": "Fingerfarbkarte"
    },
    "practice.legend.note": {
      "nl": "Vaste kleuren voor scherm en stickertjes. L/R = links/rechts; 2 = wijsvinger, 3 = middelvinger, 4 = ringvinger, 5 = pink. T = beide duimen op de spatiebalk.",
      "en": "Fixed colours for the screen and stickers. L/R = left/right; 2 = index, 3 = middle, 4 = ring, 5 = little finger. T = either thumb on the space bar.",
      "de": "Feste Farben für Bildschirm und Aufkleber. L/R = links/rechts; 2 = Zeige-, 3 = Mittel-, 4 = Ring-, 5 = kleiner Finger. T = beide Daumen auf der Leertaste."
    },
    "practice.limit": {
      "nl": "De vingerindeling is advies; Ritme kan niet meten met welke vinger je typt. Accentcombinaties en andere toetsenbordindelingen verschillen.",
      "en": "Finger assignments are guidance; Ritme cannot measure which finger you use. Accent combinations and other keyboard layouts differ.",
      "de": "Die Fingerzuordnung ist eine Empfehlung; Ritme kann nicht messen, welchen Finger du benutzt. Akzentkombinationen und andere Tastaturbelegungen unterscheiden sich."
    },
    "practice.print": {
      "nl": "Kleurkaart afdrukken",
      "en": "Print colour card",
      "de": "Farbkarte drucken"
    },
    "practice.print.intro": {
      "nl": "{layout} · vaste kleuren per vinger. Gebruik de kaart als referentie of knip de gekleurde toetslabeltjes uit.",
      "en": "{layout} · fixed finger colours. Use this reference card or cut out the coloured key labels.",
      "de": "{layout} · feste Fingerfarben. Nutze die Karte als Referenz oder schneide die farbigen Tastenetiketten aus."
    },
    "practice.print.note": {
      "nl": "Labeltjes: 8 × 8 mm bij 100% afdrukschaal. Zet achtergrondkleuren aan in de afdrukopties. Shift: gebruik de pink van de andere hand. De T-kleur geldt voor beide duimen; cijfers horen bij de bovenste rij, niet bij het numpad.",
      "en": "Labels: 8 × 8 mm at 100% print scale. Enable background colours in the print options. Shift: use the little finger of the opposite hand. T is shared by both thumbs; numbers refer to the top row, not the numpad.",
      "de": "Etiketten: 8 × 8 mm bei 100 % Druckskalierung. Aktiviere Hintergrundfarben in den Druckoptionen. Shift: kleiner Finger der anderen Hand. T gilt für beide Daumen; Ziffern beziehen sich auf die obere Reihe, nicht auf den Ziffernblock."
    },
    "practice.drill.note": {
      "nl": "Vaste toetsreeksen · rustig en nauwkeurig",
      "en": "Fixed key patterns · steady and accurate",
      "de": "Feste Tastenfolgen · ruhig und genau"
    },
    "practice.hint": {
      "nl": "Rustig typen · nauwkeurigheid eerst",
      "en": "Type steadily · accuracy first",
      "de": "Ruhig tippen · Genauigkeit zuerst"
    },
    "practice.live": {
      "nl": "{accuracy} raak",
      "en": "{accuracy} accurate",
      "de": "{accuracy} genau"
    },
    "practice.result.note": {
      "nl": "{lesson} · {guidance}. Vergelijk alleen dezelfde oefening en hulpinstelling; toetsreeksen zijn geen gewone tekst.",
      "en": "{lesson} · {guidance}. Compare only the same exercise and guidance setting; key patterns are not ordinary text.",
      "de": "{lesson} · {guidance}. Vergleiche nur dieselbe Übung mit derselben Hilfeeinstellung; Tastenfolgen sind kein normaler Text."
    },
    "practice.result.aided": {
      "nl": "met aanslaghulp",
      "en": "with guidance",
      "de": "mit Anschlaghilfe"
    },
    "practice.result.unaided": {
      "nl": "zonder aanslaghulp",
      "en": "without guidance",
      "de": "ohne Anschlaghilfe"
    },
    "practice.help.title": {
      "nl": "Aanslag oefenen",
      "en": "Practise your keystrokes",
      "de": "Anschläge üben"
    },
    "practice.help.body": {
      "nl": "Kies Woorden → oefenen voor het toetsenbord en de vingerkleuren. Bij Woorden gebruik je de bestaande woordenlijsten; de rij-oefeningen gebruiken vaste, herhaalbare toetsreeksen. Zo kun je de beweging oefenen zonder eerst woorden te hoeven lezen. De volgende toets en, waar nodig, de Shift van de andere hand lichten op. Fouten herstel je zelf met Backspace; de oefening blokkeert niet.",
      "en": "Choose Words → practice for the keyboard and finger colours. Words uses the existing word lists; row exercises use fixed, repeatable key patterns. This lets you practise the movement without first reading words. The next key and, when needed, Shift on the opposite hand are highlighted. Correct mistakes yourself with Backspace; the exercise does not block.",
      "de": "Wähle Wörter → üben für die Tastatur und Fingerfarben. Wörter verwendet die vorhandenen Wortlisten; Reihenübungen nutzen feste, wiederholbare Tastenfolgen. So kannst du die Bewegung üben, ohne zuerst Wörter lesen zu müssen. Die nächste Taste und bei Bedarf Shift auf der anderen Hand werden hervorgehoben. Fehler korrigierst du mit Backspace; die Übung blockiert nicht."
    },
    "practice.help.scores": {
      "nl": "Oefeningen krijgen hun eigen voortgangsprofiel, gescheiden van gewone typetests en de algemene benchmark. Het profiel onderscheidt oefening, indeling en of aanslaghulp aanstond. Kleurkaart afdrukken kan vóór of na een test. Kies je toetsindeling via ⓘ, onafhankelijk van de interface- of woordtaal.",
      "en": "Exercises have their own progress profile, separate from ordinary tests and general benchmarks. Profiles distinguish the exercise, layout and whether guidance was enabled. Print the colour card before or after a test. Select the layout through ⓘ, independently of interface and word language.",
      "de": "Übungen erhalten eigene Fortschrittsprofile, getrennt von normalen Tests und allgemeinen Vergleichswerten. Das Profil unterscheidet Übung, Belegung und aktive Tastenhilfe. Die Farbkarte kann vor oder nach einem Test gedruckt werden. Wähle die Belegung unter ⓘ, unabhängig von Oberflächen- oder Wortsprache."
    },
    "practice.source": {
      "nl": "Toetsposities en keycodes:",
      "en": "Key positions and key codes:",
      "de": "Tastenpositionen und Tastencodes:"
    },
    "practice.finger.lp": {
      "nl": "Linker pink",
      "en": "Left little finger",
      "de": "Linker kleiner Finger"
    },
    "practice.finger.lr": {
      "nl": "Linker ringvinger",
      "en": "Left ring finger",
      "de": "Linker Ringfinger"
    },
    "practice.finger.lm": {
      "nl": "Linker middelvinger",
      "en": "Left middle finger",
      "de": "Linker Mittelfinger"
    },
    "practice.finger.li": {
      "nl": "Linker wijsvinger",
      "en": "Left index finger",
      "de": "Linker Zeigefinger"
    },
    "practice.finger.ri": {
      "nl": "Rechter wijsvinger",
      "en": "Right index finger",
      "de": "Rechter Zeigefinger"
    },
    "practice.finger.rm": {
      "nl": "Rechter middelvinger",
      "en": "Right middle finger",
      "de": "Rechter Mittelfinger"
    },
    "practice.finger.rr": {
      "nl": "Rechter ringvinger",
      "en": "Right ring finger",
      "de": "Rechter Ringfinger"
    },
    "practice.finger.rp": {
      "nl": "Rechter pink",
      "en": "Right little finger",
      "de": "Rechter kleiner Finger"
    },
    "practice.finger.th": {
      "nl": "Duimen",
      "en": "Thumbs",
      "de": "Daumen"
    },
    "practice.color.coral": {
      "nl": "Koraal",
      "en": "Coral",
      "de": "Korallrot"
    },
    "practice.color.ochre": {
      "nl": "Oker",
      "en": "Ochre",
      "de": "Ocker"
    },
    "practice.color.olive": {
      "nl": "Olijfgroen",
      "en": "Olive green",
      "de": "Olivgrün"
    },
    "practice.color.teal": {
      "nl": "Zeegroen",
      "en": "Teal",
      "de": "Petrolgrün"
    },
    "practice.color.blue": {
      "nl": "Kobaltblauw",
      "en": "Cobalt blue",
      "de": "Kobaltblau"
    },
    "practice.color.violet": {
      "nl": "Violet",
      "en": "Violet",
      "de": "Violett"
    },
    "practice.color.magenta": {
      "nl": "Magenta",
      "en": "Magenta",
      "de": "Magenta"
    },
    "practice.color.raspberry": {
      "nl": "Framboos",
      "en": "Raspberry",
      "de": "Himbeerrot"
    },
    "practice.color.slate": {
      "nl": "Leigrijs",
      "en": "Slate grey",
      "de": "Schiefergrau"
    },
    "practice.print.unavailable": {
      "nl": "Afdrukken is hier niet beschikbaar. Open het HTML-bestand in een gewone browser.",
      "en": "Printing is not available here. Open the HTML file in a regular browser.",
      "de": "Drucken ist hier nicht verfügbar. Öffne die HTML-Datei in einem normalen Browser."
    },
    "capitals.label": {
      "nl": "hoofdletters",
      "en": "capitals",
      "de": "Großbuchstaben"
    },
    "capitals.title": {
      "nl": "Hoofdletters oefenen: altijd aan het begin van een woord.",
      "en": "Practise capitals: always at the beginning of a word.",
      "de": "Großbuchstaben üben: immer am Wortanfang."
    },
    "capitals.hint.punctuation": {
      "nl": "Eerste woord + na . , : ; → beginhoofdletter",
      "en": "First word + after . , : ; → initial capital",
      "de": "Erstes Wort + nach . , : ; → großer Anfangsbuchstabe"
    },
    "capitals.hint.random": {
      "nl": "Gemiddeld 1 op 4 woorden · hoofdletter alleen aan het woordbegin",
      "en": "On average 1 in 4 words · capitals only at the start",
      "de": "Im Mittel 1 von 4 Wörtern · Großbuchstabe nur am Wortanfang"
    },
    "capitals.help.title": {
      "nl": "Hoofdletters oefenen",
      "en": "Practising capitals",
      "de": "Großbuchstaben üben"
    },
    "capitals.help.punctuation": {
      "nl": "Schakel hoofdletters in bij Woorden of de woordoefeningen. Met leestekens krijgt het eerste woord en het woord na een punt, komma, dubbele punt of puntkomma een beginhoofdletter. Ook na komma’s en puntkomma’s: dit is een Shift-oefening, geen grammaticale regel. Getallen blijven gelijk; de beginhoofdletter schuift zo nodig door naar het volgende woord.",
      "en": "Enable capitals in Words or the word practice lessons. With punctuation, the first word and the word after a full stop, comma, colon or semicolon start with a capital. This includes commas and semicolons: it is a Shift exercise, not a grammar rule. Numbers stay unchanged; a pending initial capital carries over to the next word.",
      "de": "Aktiviere Großbuchstaben bei Wörter oder den Wortübungen. Mit Satzzeichen beginnen das erste Wort und das Wort nach einem Punkt, Komma, Doppelpunkt oder Semikolon mit einem Großbuchstaben. Das gilt auch nach Kommas und Semikolons: Dies ist eine Shift-Übung, keine Grammatikregel. Zahlen bleiben unverändert; der große Anfangsbuchstabe wird bei Bedarf auf das nächste Wort übertragen."
    },
    "capitals.help.random": {
      "nl": "Zonder leestekens heeft elk woord onafhankelijk 25% kans op een beginhoofdletter. Er komen nooit hoofdletters midden in een woord door deze instelling. Er is geen vast patroon van ieder vierde woord. Accenten blijven behouden. Eigen tekst en vaste rij- en Shift-oefeningen worden niet aangepast. Oude tests met hoofdletters op gemengde posities blijven bewaard en worden apart vergeleken.",
      "en": "Without punctuation, each word independently has a 25% chance of an initial capital. This setting never puts a capital in the middle of a word. There is no fixed every-fourth-word pattern. Accents are preserved. Custom text and fixed row and Shift exercises are unchanged. Older tests with capitals at mixed positions are retained and compared separately.",
      "de": "Ohne Satzzeichen hat jedes Wort unabhängig eine Chance von 25 % auf einen großen Anfangsbuchstaben. Diese Einstellung setzt niemals einen Großbuchstaben mitten ins Wort. Es gibt kein festes Jedes-vierte-Wort-Muster. Akzente bleiben erhalten. Eigener Text sowie feste Reihen- und Shift-Übungen bleiben unverändert. Ältere Tests mit Großbuchstaben an gemischten Positionen bleiben gespeichert und werden getrennt verglichen."
    },
    "capitals.benchmark": {
      "nl": "Voor deze hoofdletteroefening is geen aparte onderzoeksnorm opgenomen.",
      "en": "No separate research norm is included for this capitals exercise.",
      "de": "Für diese Großbuchstabenübung ist keine eigene Forschungsnorm hinterlegt."
    },
    "practice.infinite.title": {
      "nl": "Vrij oefenen · geen tijdslimiet, geen opgeslagen score",
      "en": "Free practice · no time limit, no saved score",
      "de": "Freies Üben · ohne Zeitlimit und gespeichertes Ergebnis"
    },
    "practice.infinite.note": {
      "nl": "Vrij oefenen · geen tijdslimiet · niets opgeslagen",
      "en": "Free practice · no time limit · nothing saved",
      "de": "Freies Üben · ohne Zeitlimit · nichts gespeichert"
    },
    "practice.infinite.heading": {
      "nl": "Vrij oefenen zonder eindtijd",
      "en": "Free practice without a time limit",
      "de": "Freies Üben ohne Zeitlimit"
    },
    "practice.infinite.hint": {
      "nl": "Oefen in je eigen tempo · stop wanneer je wilt",
      "en": "Practise at your own pace · stop whenever you like",
      "de": "Übe in deinem Tempo · höre jederzeit auf"
    },
    "practice.infinite.focus": {
      "nl": "Neem je tijd. Er loopt geen timer.",
      "en": "Take your time. There is no countdown.",
      "de": "Lass dir Zeit. Es läuft kein Countdown."
    },
    "practice.infinite.stop": {
      "nl": "Oefening stoppen zonder resultaat op te slaan",
      "en": "Stop practising without saving a result",
      "de": "Übung beenden, ohne ein Ergebnis zu speichern"
    },
    "practice.infinite.stopped": {
      "nl": "Oefening gestopt. Er is niets opgeslagen.",
      "en": "Practice stopped. Nothing was saved.",
      "de": "Übung beendet. Es wurde nichts gespeichert."
    },
    "practice.infinite.help": {
      "nl": "Kies Woorden → oefenen en daarna ∞ bij de tijdskeuze. De tekst wordt doorlopend aangevuld, bij elke oefening. Je krijgt nog wel vingerhulp en live aanslagnauwkeurigheid, maar geen aftelklok of eindscore. Stop, Esc en het openen van Voortgang beëindigen de oefening zonder iets in je geschiedenis, grafieken of back-ups op te slaan. Met een tijdsduur kies je weer een normale test. Die tijdsduur blijft ook voor Woorden en Getallen gelden. Bij lang oefenen blijven recente woorden beschikbaar voor Backspace.",
      "en": "Choose Words → practice and then ∞ in the duration controls. Text keeps replenishing in every exercise. Finger guidance and live keystroke accuracy stay available, but there is no countdown or final score. Stop, Esc and opening Progress end the exercise without saving anything to your history, charts or backups. Choose a duration to return to a timed test. That duration also remains in use for Words and Numbers. During long sessions, recent words remain available for Backspace.",
      "de": "Wähle Wörter → üben und dann ∞ bei der Testdauer. Der Text wird in jeder Übung laufend ergänzt. Fingerhilfe und die aktuelle Anschlaggenauigkeit bleiben verfügbar, aber es gibt weder Countdown noch Endergebnis. Stopp, Esc und das Öffnen des Fortschritts beenden die Übung, ohne etwas im Verlauf, in Diagrammen oder in Backups zu speichern. Wähle eine Zeitdauer, um wieder einen normalen Test zu machen. Diese Dauer gilt auch weiterhin für Wörter und Zahlen. Bei langen Übungen bleiben die letzten Wörter für Backspace verfügbar."
    },
    "history.actions": {
      "nl": "Acties",
      "en": "Actions",
      "de": "Aktionen"
    },
    "history.open": {
      "nl": "Bekijk",
      "en": "View",
      "de": "Ansehen"
    },
    "history.delete": {
      "nl": "Test verwijderen",
      "en": "Delete test",
      "de": "Test löschen"
    },
    "history.delete.aria": {
      "nl": "Verwijder test van {date} om {time}",
      "en": "Delete test from {date} at {time}",
      "de": "Test vom {date} um {time} löschen"
    },
    "history.delete.title": {
      "nl": "Deze test verwijderen?",
      "en": "Delete this test?",
      "de": "Diesen Test löschen?"
    },
    "history.delete.message": {
      "nl": "{date} · {time} · {wpm} WPM\n{profile}\n\nAlleen deze test wordt verwijderd. Je grafieken, gemiddelden en records worden opnieuw berekend. Dit kun je niet ongedaan maken.",
      "en": "{date} · {time} · {wpm} WPM\n{profile}\n\nOnly this test will be deleted. Your charts, averages and personal bests will be recalculated. This cannot be undone.",
      "de": "{date} · {time} · {wpm} WPM\n{profile}\n\nNur dieser Test wird gelöscht. Diagramme, Durchschnittswerte und Bestleistungen werden neu berechnet. Dies kann nicht rückgängig gemacht werden."
    },
    "history.delete.confirm": {
      "nl": "Verwijder test",
      "en": "Delete test",
      "de": "Test löschen"
    },
    "history.delete.done": {
      "nl": "Test verwijderd. Je voortgang is bijgewerkt.",
      "en": "Test deleted. Your progress has been updated.",
      "de": "Test gelöscht. Dein Fortschritt wurde aktualisiert."
    },
    "history.delete.missing": {
      "nl": "Deze test is al verwijderd.",
      "en": "This test has already been deleted.",
      "de": "Dieser Test wurde bereits gelöscht."
    },
    "history.delete.failed": {
      "nl": "Verwijderen kon niet worden opgeslagen. De test is behouden.",
      "en": "The deletion could not be saved. The test was kept.",
      "de": "Die Löschung konnte nicht gespeichert werden. Der Test wurde beibehalten."
    },
    "history.delete.allFailed": {
      "nl": "Wissen kon niet worden opgeslagen. Je geschiedenis is behouden.",
      "en": "The deletion could not be saved. Your history was kept.",
      "de": "Die Löschung konnte nicht gespeichert werden. Dein Verlauf wurde beibehalten."
    },
    "history.delete.heading": {
      "nl": "Eén test verwijderen",
      "en": "Deleting a single test",
      "de": "Einen einzelnen Test löschen"
    },
    "history.delete.help": {
      "nl": "Gebruik het prullenbakje naast een test in Voortgang of op het resultatenscherm. Na bevestiging wordt alleen die test verwijderd. Gemiddelden, grafieken, benchmarks en persoonlijke records worden direct opnieuw berekend. Andere tests en instellingen blijven behouden. Verwijderen wijzigt geen eerder gedownloade back-ups; bij opnieuw importeren kan een verwijderde test terugkomen.",
      "en": "Use the bin icon next to a test in Progress or on its results screen. After confirmation, only that test is deleted. Averages, charts, benchmarks and personal bests are recalculated immediately. Other tests and settings stay unchanged. Deleting a test does not change previously downloaded backups; importing one again may restore the deleted test.",
      "de": "Nutze das Papierkorbsymbol neben einem Test im Fortschritt oder auf der Ergebnisseite. Nach der Bestätigung wird nur dieser Test gelöscht. Durchschnittswerte, Diagramme, Benchmarks und Bestleistungen werden sofort neu berechnet. Andere Tests und Einstellungen bleiben erhalten. Bereits heruntergeladene Backups bleiben unverändert; beim erneuten Import kann ein gelöschter Test wieder erscheinen."
    },
    "capitals.legacy": {
      "nl": "hoofdletters · gemengde posities (oud)",
      "en": "capitals · mixed positions (legacy)",
      "de": "Großbuchstaben · gemischte Positionen (alt)"
    },
    "numpad.choice": {
      "nl": "Cijfertoetsenbord",
      "en": "Number keyboard",
      "de": "Zahlentastatur"
    },
    "numpad.row": {
      "nl": "Cijferrij",
      "en": "Number row",
      "de": "Ziffernreihe"
    },
    "numpad.label": {
      "nl": "Numpad",
      "en": "Numpad",
      "de": "Ziffernblock"
    },
    "numpad.guide": {
      "nl": "Aanslaghulp · numpad",
      "en": "Keystroke guide · numpad",
      "de": "Anschlaghilfe · Ziffernblock"
    },
    "numpad.layout": {
      "nl": "Numpad · rechterhand",
      "en": "Numpad · right hand",
      "de": "Ziffernblock · rechte Hand"
    },
    "numpad.homehint": {
      "nl": "5 = rustpunt · Enter of spatie = volgend getal",
      "en": "5 = home key · Enter or Space = next number",
      "de": "5 = Orientierung · Enter oder Leertaste = nächste Zahl"
    },
    "numpad.stage": {
      "nl": "Alleen cijfers · numpad · Enter / spatie",
      "en": "Digits only · numpad · Enter / Space",
      "de": "Nur Ziffern · Ziffernblock · Enter / Leertaste"
    },
    "numpad.next": {
      "nl": "Enter / spatie",
      "en": "Enter / Space",
      "de": "Enter / Leertaste"
    },
    "numpad.thumb": {
      "nl": "Rechter duim",
      "en": "Right thumb",
      "de": "Rechter Daumen"
    },
    "numpad.legend.note": {
      "nl": "Advies voor de rechterhand: R2 = wijsvinger (1/4/7), R3 = middelvinger (2/5/8), R4 = ringvinger (3/6/9), R5 = pink (Enter), T = duim (0). Spatie mag ook: gebruik dan een duim. De kleuren blijven gelijk aan de letteroefeningen.",
      "en": "Suggested right-hand technique: R2 = index (1/4/7), R3 = middle (2/5/8), R4 = ring (3/6/9), R5 = little finger (Enter), T = thumb (0). Space also works: use a thumb for it. Colours match the letter exercises.",
      "de": "Empfehlung für die rechte Hand: R2 = Zeigefinger (1/4/7), R3 = Mittelfinger (2/5/8), R4 = Ringfinger (3/6/9), R5 = kleiner Finger (Enter), T = Daumen (0). Auch die Leertaste funktioniert: nutze dafür einen Daumen. Die Farben entsprechen den Buchstabenübungen."
    },
    "numpad.numlock": {
      "nl": "Deze toets geeft nu navigatie in plaats van een cijfer. Zet Num Lock aan.",
      "en": "This key is producing navigation instead of a digit. Turn Num Lock on.",
      "de": "Diese Taste erzeugt eine Navigation statt einer Ziffer. Aktiviere Num Lock."
    },
    "numpad.rowwarning": {
      "nl": "Cijferrij herkend. Voor numpadtraining gebruik je het numerieke blok; deze invoer telt wel mee.",
      "en": "Number row detected. Use the numeric keypad for numpad practice; this input still counts.",
      "de": "Ziffernreihe erkannt. Nutze für diese Übung den Ziffernblock; die Eingabe zählt trotzdem."
    },
    "numpad.print.intro": {
      "nl": "Numpad · vaste kleuren voor je rechterhand. Gebruik deze kaart als referentie of knip de gekleurde toetslabeltjes uit.",
      "en": "Numpad · fixed right-hand finger colours. Use this card as a reference or cut out the coloured key labels.",
      "de": "Ziffernblock · feste Farben für die rechte Hand. Nutze diese Karte als Referenz oder schneide die farbigen Tastenetiketten aus."
    },
    "numpad.print.note": {
      "nl": "Labeltjes: 8 × 8 mm bij 100% afdrukschaal. Zet achtergrondkleuren aan. Voel het rustpunt op 5. Enter gaat naar het volgende getal; spatie met een duim mag ook. Alleen de cijfers en Enter worden in deze oefening gebruikt.",
      "en": "Labels: 8 × 8 mm at 100% print scale. Enable background colours. Feel the home marker on 5. Enter advances to the next number; Space with a thumb also works. Only digits and Enter are used in this exercise.",
      "de": "Etiketten: 8 × 8 mm bei 100 % Druckskalierung. Aktiviere Hintergrundfarben. Ertaste die Markierung auf 5. Enter führt zur nächsten Zahl; die Leertaste mit einem Daumen funktioniert ebenfalls. Diese Übung verwendet nur Ziffern und Enter."
    },
    "numpad.fingerheading": {
      "nl": "Vingers · numpad",
      "en": "Fingers · numpad",
      "de": "Finger · Ziffernblock"
    },
    "numpad.fingermap": {
      "nl": "Adviesindeling voor het numpad, geen gemeten vingergebruik. Enter en spatie tellen als scheiding; deze fouten staan apart. De fysieke cijferrij wordt niet geblokkeerd.",
      "en": "Suggested numpad finger assignments, not measured finger use. Enter and Space act as separators; their errors are listed separately. The physical number row is not blocked.",
      "de": "Empfohlene Fingerzuordnung für den Ziffernblock, keine Messung der benutzten Finger. Enter und Leertaste trennen Zahlen; diese Fehler stehen separat. Die physische Ziffernreihe ist nicht gesperrt."
    },
    "numpad.separator": {
      "nl": "Enter / spatie",
      "en": "Enter / Space",
      "de": "Enter / Leertaste"
    },
    "numpad.help.title": {
      "nl": "Cijfers oefenen met het numpad",
      "en": "Practising numbers on the numpad",
      "de": "Zahlen auf dem Ziffernblock üben"
    },
    "numpad.help": {
      "nl": "Kies Getallen → Numpad. De tekst bevat nog steeds uitsluitend cijfers. Onder de tekst verschijnt het numerieke toetsenblok met vaste vingerkleuren en de volgende toets. Toetsenbord en kleuren zijn afzonderlijk uit te zetten. Gebruik Enter of spatie tussen getallen; Backspace corrigeert. Zet Num Lock aan wanneer je toetsenbord dat nodig heeft. De cijferrij blijft invoer accepteren: dit is een gekozen oefenprofiel, geen certificering van je fysieke toetsenbord of vingers. Cijferrij en numpad worden apart vergeleken in Voortgang, evenals numpadtests met en zonder aanslaghulp.",
      "en": "Choose Numbers → Numpad. Prompts still contain only digits. A numeric keypad appears below the text with fixed finger colours and the next key. Keyboard and colours can be switched off separately. Use Enter or Space between numbers; Backspace corrects. Turn Num Lock on if your keyboard requires it. The number row still accepts input: this is a selected practice profile, not certification of your physical keyboard or fingers. Progress compares number-row and numpad tests separately, as well as numpad tests with and without guidance.",
      "de": "Wähle Zahlen → Ziffernblock. Die Vorgaben enthalten weiterhin ausschließlich Ziffern. Unter dem Text erscheint ein Ziffernblock mit festen Fingerfarben und der nächsten Taste. Tastatur und Farben lassen sich einzeln ausschalten. Enter oder Leertaste trennen Zahlen; Backspace korrigiert. Aktiviere Num Lock, falls deine Tastatur dies erfordert. Die Ziffernreihe nimmt weiterhin Eingaben an: Dies ist ein gewähltes Übungsprofil, keine Zertifizierung deiner physischen Tastatur oder Finger. Im Fortschritt werden Ziffernreihe und Ziffernblock getrennt verglichen, ebenso Ziffernblocktests mit und ohne Anschlaghilfe."
    },
    "credits.footer": {
      "nl": "Concept &amp; visuele basis: <a href=\"https://www.typespeedtest.com/\" target=\"_blank\" rel=\"noopener noreferrer\">TypeSpeedTest.com</a> · onafhankelijke uitwerking",
      "en": "Concept &amp; visual basis: <a href=\"https://www.typespeedtest.com/\" target=\"_blank\" rel=\"noopener noreferrer\">TypeSpeedTest.com</a> · independent implementation",
      "de": "Konzept &amp; visuelle Grundlage: <a href=\"https://www.typespeedtest.com/\" target=\"_blank\" rel=\"noopener noreferrer\">TypeSpeedTest.com</a> · eigenständige Umsetzung"
    },
    "credits.link": {
      "nl": "Credits & disclaimer",
      "en": "Credits & disclaimer",
      "de": "Credits & Hinweise"
    },
    "credits.title": {
      "nl": "Credits & disclaimer",
      "en": "Credits & disclaimer",
      "de": "Credits & Hinweise"
    },
    "credits.purpose": {
      "nl": "Ritme is zelfstandig uitgewerkt vanuit de behoefte aan <strong>bredere functionaliteit</strong>: meerdere interface- en testtalen, aanslagtraining, vingerkleuren, numpadoefeningen, vrij oefenen en persoonlijke voortgang. De uitbreiding bouwt voort op het concept en de visuele inspiratie; het is geen officiële uitbreiding van de oorspronkelijke website.",
      "en": "Ritme was independently developed to meet a need for <strong>broader functionality</strong>: multiple interface and test languages, touch-typing practice, finger colours, numpad exercises, free practice and personal progress. These additions build on the concept and visual inspiration; they are not an official extension of the original website.",
      "de": "Ritme wurde eigenständig aus dem Bedarf an <strong>mehr Funktionalität</strong> entwickelt: mehrere Oberflächen- und Testsprachen, Anschlagtraining, Fingerfarben, Ziffernblockübungen, freies Üben und persönlicher Fortschritt. Die Ergänzungen knüpfen an das Konzept und die visuelle Inspiration an; sie sind keine offizielle Erweiterung der ursprünglichen Website."
    },
    "credits.independence.title": {
      "nl": "Onafhankelijke uitwerking",
      "en": "Independent implementation",
      "de": "Eigenständige Umsetzung"
    },
    "credits.independence": {
      "nl": "<strong>Ritme is niet verbonden aan TypeSpeedTest.com en wordt niet door die website gemaakt, beheerd, gesponsord of goedgekeurd.</strong> De naamsvermelding is een bronvermelding, geen samenwerking of aanbeveling. De makers van de oorspronkelijke website zijn niet verantwoordelijk voor de functies, wijzigingen, scores of opslag van Ritme.",
      "en": "<strong>Ritme is not affiliated with TypeSpeedTest.com and is not produced, operated, sponsored or endorsed by that website.</strong> This credit acknowledges the source; it does not imply a partnership or recommendation. The creators of the original website are not responsible for Ritme’s features, changes, scores or storage.",
      "de": "<strong>Ritme ist nicht mit TypeSpeedTest.com verbunden und wird von dieser Website weder erstellt, betrieben, gesponsert noch unterstützt.</strong> Die Nennung dient der Quellenangabe und bedeutet keine Zusammenarbeit oder Empfehlung. Die Entwickler der ursprünglichen Website sind nicht für Funktionen, Änderungen, Ergebnisse oder Speicherung in Ritme verantwortlich."
    },
    "credits.rights": {
      "nl": "Namen, merken en oorspronkelijke materialen blijven bij hun respectieve rechthebbenden. Deze bronvermelding en de GPL-licentie van deze applicatie geven geen rechten op de oorspronkelijke website of haar materialen. De woordenlijsten en hun eigen bron- en licentievermelding staan hieronder.",
      "en": "Names, trademarks and original materials remain with their respective rights holders. This attribution and the GPL licence of this application do not grant rights to the original website or its materials. The word lists and their own sources and licence information are listed below.",
      "de": "Namen, Marken und ursprüngliche Materialien verbleiben bei den jeweiligen Rechteinhabern. Diese Quellenangabe und die GPL-Lizenz dieser Anwendung gewähren keine Rechte an der ursprünglichen Website oder deren Materialien. Die Wortlisten mit ihren eigenen Quellen- und Lizenzangaben stehen unten."
    },
    "credits.use.title": {
      "nl": "Gebruik & resultaten",
      "en": "Use & results",
      "de": "Nutzung & Ergebnisse"
    },
    "credits.use": {
      "nl": "Ritme is een oefenhulpmiddel, geen gecertificeerde vaardigheidstest. Scores en bandbreedtes zijn indicatief; meetmethoden kunnen afwijken van TypeSpeedTest.com en andere tests. Vingerkleuren tonen een adviesindeling en meten niet welke vingers je werkelijk gebruikt. De applicatie wordt zonder garantie op foutloze werking aangeboden. Resultaten staan lokaal in je browser; maak zelf back-ups. Een externe bronlink openen brengt je naar een andere website, waarop haar eigen voorwaarden en privacybeleid gelden.",
      "en": "Ritme is a practice tool, not a certified skills assessment. Scores and bands are indicative; measurement methods may differ from TypeSpeedTest.com and other tests. Finger colours show suggested assignments and do not measure which fingers you actually use. The application is provided without a guarantee of error-free operation. Results are stored locally in your browser; keep your own backups. Opening an external source link takes you to another website, whose own terms and privacy policy apply.",
      "de": "Ritme ist ein Übungswerkzeug, kein zertifizierter Fähigkeitstest. Werte und Bandbreiten dienen der Orientierung; Messmethoden können von TypeSpeedTest.com und anderen Tests abweichen. Fingerfarben zeigen eine empfohlene Zuordnung und messen nicht die tatsächlich benutzten Finger. Die Anwendung wird ohne Garantie auf fehlerfreien Betrieb bereitgestellt. Ergebnisse werden lokal im Browser gespeichert; erstelle eigene Backups. Externe Quellenlinks führen zu einer anderen Website, für die deren eigene Bedingungen und Datenschutzhinweise gelten."
    },
    "credits.datasets": {
      "nl": "Woordenlijsten & bronnen",
      "en": "Word lists & sources",
      "de": "Wortlisten & Quellen"
    },
    "test.type": {
      "nl": "Testtype",
      "en": "Test type",
      "de": "Testart"
    },
    "practice.nested.title": {
      "nl": "Aanslag oefenen binnen Woorden",
      "en": "Practise keystrokes within Words",
      "de": "Tastenanschläge unter Wörter üben"
    },
    "test.info.title": {
      "nl": "Uitleg bij deze test",
      "en": "About this test",
      "de": "Hinweise zu diesem Test"
    },
    "test.info.close": {
      "nl": "Uitleg sluiten",
      "en": "Close test information",
      "de": "Hinweise schließen"
    },
    "test.info.words": {
      "nl": "Typ de getoonde woorden over. Met oefenen schakel je de toetsenbordhulp en aanslagoefeningen in.",
      "en": "Copy the words shown. Enable practice for keyboard guidance and keystroke exercises.",
      "de": "Tippe die angezeigten Wörter ab. Aktiviere Üben für Tastaturhilfe und Anschlagübungen."
    },
    "test.info.practice": {
      "nl": "Oefenen staat aan binnen Woorden. Kies een oefening en schakel toetsenbord en vingerkleuren afzonderlijk in of uit.",
      "en": "Practice is enabled within Words. Choose an exercise and switch keyboard guidance and finger colours on or off independently.",
      "de": "Üben ist unter Wörter aktiviert. Wähle eine Übung; Tastaturhilfe und Fingerfarben lassen sich einzeln ein- und ausschalten."
    },
    "test.info.numbers": {
      "nl": "Typ uitsluitend de getallen over. Spatie of Enter gaat naar het volgende getal. Kies Numpad voor hulp bij het numerieke blok.",
      "en": "Copy only the numbers. Space or Enter advances to the next number. Choose Numpad for numeric keypad guidance.",
      "de": "Tippe nur die Zahlen ab. Leertaste oder Enter führt zur nächsten Zahl. Wähle Nummernblock für die passende Tastaturhilfe."
    },
    "test.info.numpad": {
      "nl": "Typ de getallen op je numpad. Enter of spatie gaat naar het volgende getal. Toetsenbordhulp en vingerkleuren zijn afzonderlijk schakelbaar.",
      "en": "Type the numbers on your numpad. Enter or Space advances to the next number. Keyboard guidance and finger colours can be toggled independently.",
      "de": "Tippe die Zahlen auf dem Nummernblock. Enter oder Leertaste führt zur nächsten Zahl. Tastaturhilfe und Fingerfarben lassen sich einzeln umschalten."
    },
    "test.info.custom": {
      "nl": "Typ je eigen tekst exact over, inclusief hoofdletters en leestekens. De app past deze tekst niet aan.",
      "en": "Copy your own text exactly, including capitals and punctuation. The app does not modify this text.",
      "de": "Tippe deinen eigenen Text genau ab, einschließlich Großbuchstaben und Satzzeichen. Die App verändert diesen Text nicht."
    },
    "test.info.guidance": {
      "nl": "Aanslaghulp",
      "en": "Keystroke guidance",
      "de": "Anschlaghilfe"
    },
    "test.info.guidance.copy": {
      "nl": "De volgende toets en bijbehorende vinger worden aangegeven. De indeling is een advies; je werkelijke vingergebruik wordt niet gemeten.",
      "en": "The next key and suggested finger are indicated. This is guidance; actual finger use is not measured.",
      "de": "Die nächste Taste und der empfohlene Finger werden angezeigt. Das ist eine Hilfestellung; deine tatsächliche Fingerbenutzung wird nicht gemessen."
    },
    "test.info.time": {
      "nl": "Tijd & opslag",
      "en": "Time & storage",
      "de": "Zeit & Speicherung"
    },
    "test.info.timed": {
      "nl": "De timer start bij je eerste aanslag. Tests met een tijdsduur worden lokaal opgeslagen.",
      "en": "The timer starts on your first keystroke. Timed tests are saved locally.",
      "de": "Die Zeit läuft ab deinem ersten Anschlag. Zeitbegrenzte Tests werden lokal gespeichert."
    },
    "activity.label": {
      "nl": "Woordactiviteit",
      "en": "Word activity",
      "de": "Wortaktivität"
    },
    "activity.free": {
      "nl": "Vrij typen",
      "en": "Free typing",
      "de": "Freies Tippen"
    },
    "activity.standard": {
      "nl": "Standaard · 60s",
      "en": "Standard · 60s",
      "de": "Standard · 60s"
    },
    "standard.heading": {
      "nl": "Standaard · v1",
      "en": "Standard · v1",
      "de": "Standard · v1"
    },
    "standard.info": {
      "nl": "60 seconden, vaste woordenlijst per taal, kleine letters, geen cijfers, leestekens of aanslaghulp. De instellingen zijn vergrendeld; kies Vrij typen om ze te wijzigen.",
      "en": "60 seconds, a fixed word pool per language, lowercase, no numbers, punctuation or finger guidance. Settings are locked; choose Free typing to change them.",
      "de": "60 Sekunden, feste Wortliste pro Sprache, Kleinbuchstaben, keine Zahlen, Satzzeichen oder Anschlaghilfe. Einstellungen sind gesperrt; zum Ändern Freies Tippen wählen."
    },
    "standard.corpus": {
      "nl": "Woordenlijst {language} · {count} items · {hash}",
      "en": "Word pool {language} · {count} items · {hash}",
      "de": "Wortliste {language} · {count} Einträge · {hash}"
    },
    "standard.help": {
      "nl": "Standaard v1 is een vast persoonlijk meetprotocol: 60 seconden, één gekozen taal, de meegeleverde woordenlijst, kleine letters en geen extra’s of aanslaghulp. De volgorde wordt iedere keer opnieuw getrokken. Taal, toetsindeling, corpuscontrolecode en protocolversie worden opgeslagen en apart vergeleken. De timer loopt door bij tabwissels; onderbroken en verkorte tests tellen niet mee voor records. Dit is geen gecertificeerde vaardigheidstest: dezelfde omstandigheden verbeteren de vergelijkbaarheid, maar tekstvariatie en dagvorm blijven bestaan. Gewone 60-secondentests worden niet achteraf tot standaardtest verklaard.",
      "en": "Standard v1 is a fixed personal measurement protocol: 60 seconds, one selected language, the bundled word pool, lowercase, no extras or finger guidance. Each test gets a fresh order. Language, keyboard layout, corpus fingerprint and protocol version are stored and compared separately. The timer continues in other tabs; interrupted or shortened tests do not count towards records. This is not a certified skill test: matching conditions improve comparability, but word order and day-to-day variation remain. Ordinary 60-second tests are not retrospectively labelled standard tests.",
      "de": "Standard v1 ist ein festes persönliches Messprotokoll: 60 Sekunden, eine gewählte Sprache, die mitgelieferte Wortliste, Kleinbuchstaben, keine Extras oder Anschlaghilfe. Die Reihenfolge wird jedes Mal neu gezogen. Sprache, Tastaturbelegung, Prüfsumme und Protokollversion werden gespeichert und getrennt verglichen. Der Timer läuft bei Tabwechsel weiter; unterbrochene und verkürzte Tests zählen nicht für Rekorde. Dies ist kein zertifizierter Fähigkeitstest: gleiche Bedingungen verbessern die Vergleichbarkeit, Wortreihenfolge und Tagesform variieren dennoch. Normale 60-Sekunden-Tests werden nicht nachträglich als Standardtests gewertet."
    },
    "practice.lesson.adaptive": {
      "nl": "Adaptief",
      "en": "Adaptive",
      "de": "Adaptiv"
    },
    "adaptive.heading": {
      "nl": "Adaptief oefenen",
      "en": "Adaptive practice",
      "de": "Adaptiv üben"
    },
    "adaptive.focus": {
      "nl": "Focus: {keys}",
      "en": "Focus: {keys}",
      "de": "Fokus: {keys}"
    },
    "adaptive.cold": {
      "nl": "Nog geen duidelijke zwakke patronen. Begin met gewone woorden; de oefening leert mee.",
      "en": "No clear weak patterns yet. Start with ordinary words; the exercise adapts as you type.",
      "de": "Noch keine klaren Schwachstellen. Beginne mit normalen Wörtern; die Übung passt sich beim Tippen an."
    },
    "adaptive.detail": {
      "nl": "Gebaseerd op {count} recente tests in dezelfde taal en toetsindeling, plus deze oefening. Nieuwe tekst wordt bijgesteld; zichtbare woorden veranderen niet. Vrij oefenen blijft volledig onopgeslagen.",
      "en": "Based on {count} recent tests in this language and layout, plus this exercise. Newly added text adapts; visible words never change. Unlimited practice remains entirely unsaved.",
      "de": "Auf Basis von {count} aktuellen Tests in derselben Sprache und Belegung sowie dieser Übung. Neu hinzugefügter Text passt sich an; sichtbare Wörter bleiben unverändert. Unbegrenztes Üben wird weiterhin nicht gespeichert."
    },
    "adaptive.help": {
      "nl": "Kies Woorden → Oefenen → Adaptief. Ritme kijkt naar fouten ten opzichte van het aantal pogingen, niet alleen naar foutaantallen. De oefening legt extra nadruk op maximaal drie zwakke letters of letterparen uit je recente tests en lopende oefening. Woorden komen altijd uit de bestaande woordenlijst; ook algemene woorden blijven terugkomen. Bij te weinig bewijs begint de oefening zonder voorkeur. Nieuwe letterparen worden vanaf deze versie bijgehouden; oudere tests dragen alleen hun beschikbare toetsdata bij. In ∞ wordt niets opgeslagen, ook geen apart leerprofiel. De voortgang toont oefenpunten, geen WPM-record of vaste snelheidsnorm: de taak wordt immers aangepast. Gebruik Standaard voor een vaste meting.",
      "en": "Choose Words → Practice → Adaptive. Ritme uses errors relative to attempts, not just error counts. It gives extra exposure to up to three weak letters or letter pairs from recent tests and the current exercise. Words always come from the existing corpus, and general words remain in the mix. With insufficient evidence, practice starts without a preference. Letter-pair statistics are collected from this version onwards; older tests contribute the key data they contain. Unlimited mode saves nothing, not even a separate learning profile. Progress shows practice points, not WPM records or a fixed speed norm, because the task adapts. Use Standard for a fixed measurement.",
      "de": "Wähle Wörter → Üben → Adaptiv. Ritme bewertet Fehler im Verhältnis zu den Versuchen, nicht nur Fehlerzahlen. Bis zu drei schwache Buchstaben oder Buchstabenpaare aus aktuellen Tests und der laufenden Übung werden stärker gewichtet. Wörter stammen immer aus der vorhandenen Wortliste; allgemeine Wörter bleiben Teil der Übung. Bei zu wenig Daten gibt es zunächst keine Gewichtung. Buchstabenpaare werden ab dieser Version erfasst; ältere Tests liefern nur vorhandene Tastendaten. Unbegrenztes Üben speichert nichts, auch kein separates Lernprofil. Der Fortschritt zeigt Übungspunkte, keine WPM-Rekorde oder feste Temponorm, da sich die Aufgabe ändert. Verwende Standard für eine feste Messung."
    },
    "adaptive.method.heading": {
      "nl": "Adaptieve selectie · v1",
      "en": "Adaptive selection · v1",
      "de": "Adaptive Auswahl · v1"
    },
    "adaptive.method": {
      "nl": "Lokale heuristiek, geen gevalideerd leermodel. Maximaal 20 volledige, niet-onderbroken woordtests met dezelfde taal en toetsindeling; per oudere test telt de data 15% minder zwaar. De lopende oefening telt dubbel. Een letter vereist 20 gewogen pogingen, een letterpaar 8; minstens 2 gewogen fouten. De gespreide foutschatting is (fouten + 0,5) / (pogingen + 10). Patronen onder 2,5% vallen af; beperkte steekproeven krijgen minder gewicht. Maximaal drie niet-overlappende patronen worden geselecteerd. Per woord is er onafhankelijk 2/3 kans op een focuswoord (gewogen naar zwakte) en 1/3 op een gewoon datasetwoord. Na verbeteren daalt het gewicht bij nieuwe tekst. Geen vaste woordvolgorde, geen gegarandeerde leersnelheid.",
      "en": "A local heuristic, not a validated learning model. Up to 20 complete, uninterrupted word tests in the same language and layout; each older test has 15% less weight. The current exercise counts twice. A letter needs 20 weighted attempts and a pair 8, with at least 2 weighted errors. The smoothed error estimate is (errors + 0.5) / (attempts + 10). Patterns below 2.5% are excluded; small samples carry less weight. Up to three non-overlapping patterns are selected. Each word independently has a 2/3 chance of targeting a weak pattern (weighted by weakness) and a 1/3 chance of being a general corpus word. Improvement reduces the weighting in newly added text. No fixed word sequence and no guaranteed learning rate.",
      "de": "Eine lokale Heuristik, kein validiertes Lernmodell. Bis zu 20 vollständige, ununterbrochene Worttests mit gleicher Sprache und Belegung; je älterem Test sinkt das Gewicht um 15%. Die laufende Übung zählt doppelt. Ein Buchstabe braucht 20 gewichtete Versuche, ein Paar 8 und mindestens 2 gewichtete Fehler. Die geglättete Fehlerquote ist (Fehler + 0,5) / (Versuche + 10). Muster unter 2,5% entfallen; kleine Stichproben zählen weniger. Bis zu drei nicht überlappende Muster werden gewählt. Jedes Wort hat unabhängig eine Chance von 2/3 auf ein Fokuswort (nach Schwäche gewichtet) und 1/3 auf ein allgemeines Wort. Verbesserungen senken das Gewicht in neuem Text. Keine feste Wortfolge und kein garantierter Lernerfolg."
    },
    "adaptive.noBenchmark": {
      "nl": "Adaptieve oefening",
      "en": "Adaptive exercise",
      "de": "Adaptive Übung"
    },
    "adaptive.progress.note": {
      "nl": "Adaptieve oefeningen veranderen in moeilijkheid. Meetpunten blijven zichtbaar; geen gezamenlijke WPM-trend of snelheidsrecord.",
      "en": "Adaptive exercises change in difficulty. Points remain visible; there is no combined WPM trend or speed record.",
      "de": "Adaptive Übungen verändern ihren Schwierigkeitsgrad. Messpunkte bleiben sichtbar; kein gemeinsamer WPM-Trend oder Temporekord."
    },
    "adaptive.noBenchmark.note": {
      "nl": "De inhoud past zich aan je fouten aan. Vergelijk je snelheid met een Standaard-test; beoordeel deze oefening op nauwkeurigheid.",
      "en": "Content adapts to your errors. Use a Standard test to compare speed; judge this exercise by accuracy.",
      "de": "Der Inhalt passt sich deinen Fehlern an. Vergleiche dein Tempo mit einem Standardtest und bewerte diese Übung anhand der Genauigkeit."
    },
    "layout.heading": {
      "nl": "Toetsenbordindeling",
      "en": "Keyboard layout",
      "de": "Tastaturbelegung"
    },
    "layout.note": {
      "nl": "Voor gids en vingeranalyse; onafhankelijk van interface en woordtaal. FR = klassiek Frans AZERTY, geen Belgisch of AFNOR.",
      "en": "For guidance and finger analysis; independent of interface and word language. FR = legacy French AZERTY, not Belgian or AFNOR.",
      "de": "Für Tastenhilfe und Fingeranalyse; unabhängig von Oberfläche und Wortsprache. FR = klassisches französisches AZERTY, nicht belgisch oder AFNOR."
    },
    "layout.help": {
      "nl": "Kies je fysieke toetsindeling via ⓘ: QWERTY (US), QWERTZ (DE) of klassiek Frans AZERTY (FR). De keuze wordt onthouden en bepaalt de gids, rij-oefeningen, Shift-/AltGr-aanwijzingen, vingerkleuren, afdrukkaart en vingeranalyse. De app verandert je systeemtoetsenbord niet. Layouts worden apart vergeleken. Accenten via dode toetsen of compositie blijven invoer accepteren; wanneer geen directe aanslag bekend is, wordt geen verkeerde toets aangewezen. Mac-, Belgische en nieuwe AFNOR-varianten kunnen afwijken. Oudere tests zonder layoutveld behouden hun oorspronkelijke US-aanname.",
      "en": "Choose your physical layout through ⓘ: QWERTY (US), QWERTZ (DE) or legacy French AZERTY (FR). The saved choice controls the guide, row exercises, Shift/AltGr hints, finger colours, printed card and finger analysis. It does not change your system keyboard. Layouts are compared separately. Dead-key accents and composition remain accepted; unsupported combinations do not receive a misleading key hint. Mac, Belgian and new AFNOR variants may differ. Older tests without a layout field retain their original US assumption.",
      "de": "Wähle deine physische Belegung unter ⓘ: QWERTY (US), QWERTZ (DE) oder klassisches französisches AZERTY (FR). Die gespeicherte Wahl steuert Tastaturhilfe, Reihenübungen, Umschalt-/AltGr-Hinweise, Fingerfarben, Druckkarte und Fingeranalyse. Die Systemtastatur wird nicht geändert. Belegungen werden getrennt verglichen. Akzente über Tottasten oder Komposition werden akzeptiert; unbekannte Kombinationen erhalten keinen falschen Tastenhinweis. Mac-, belgische und neue AFNOR-Varianten können abweichen. Ältere Tests ohne Belegungsfeld behalten die ursprüngliche US-Annahme."
    },
    "layout.sources": {
      "nl": "Bronnen voor toetsindelingen",
      "en": "Keyboard layout references",
      "de": "Quellen zu Tastaturbelegungen"
    },
    "layout.guide": {
      "nl": "Aanslaghulp · {layout}",
      "en": "Typing guide · {layout}",
      "de": "Tastenhilfe · {layout}"
    },
    "layout.fingers": {
      "nl": "Vingers · {layout}",
      "en": "Fingers · {layout}",
      "de": "Finger · {layout}"
    },
    "layout.fingermap": {
      "nl": "{layout} · theoretische toewijzing, niet je werkelijk gebruikte vingers.",
      "en": "{layout} · theoretical assignment, not the fingers you actually used.",
      "de": "{layout} · theoretische Zuordnung, nicht die tatsächlich verwendeten Finger."
    },
    "layout.altgr": {
      "nl": "AltGr · rechterduim",
      "en": "AltGr · right thumb",
      "de": "AltGr · rechter Daumen"
    },
    "speed.unit": {
      "nl": "Snelheidseenheid",
      "en": "Speed unit",
      "de": "Tempoeinheit"
    },
    "kph.note": {
      "nl": "KPH = correcte tekens per uur, inclusief spaties. Omgerekend uit CPM × 60, niet een telling van fysieke toetsindrukken: Shift en Backspace horen daar niet bij. KPH wordt als heel getal weergegeven.",
      "en": "KPH = correct characters per hour, including spaces. Converted from CPM × 60, not a count of physical key presses: Shift and Backspace are not included. KPH is displayed as a whole number.",
      "de": "KPH = korrekte Zeichen pro Stunde, einschließlich Leerzeichen. Umrechnung aus CPM × 60, keine Zählung physischer Tastendrücke: Umschalt- und Rücktaste zählen nicht dazu. KPH wird als ganze Zahl angezeigt."
    },
    "speed.reference": {
      "nl": "Onderzoek · ≈{value} {unit}",
      "en": "Study · ≈{value} {unit}",
      "de": "Studie · ≈{value} {unit}"
    },
    "footer.origin": {
      "nl": "Concept &amp; visuele basis: <a href=\"https://www.typespeedtest.com/\" rel=\"noopener noreferrer\" target=\"_blank\">TypeSpeedTest.com</a>",
      "en": "Concept &amp; visual basis: <a href=\"https://www.typespeedtest.com/\" rel=\"noopener noreferrer\" target=\"_blank\">TypeSpeedTest.com</a>",
      "de": "Konzept &amp; visuelle Basis: <a href=\"https://www.typespeedtest.com/\" rel=\"noopener noreferrer\" target=\"_blank\">TypeSpeedTest.com</a>"
    },
    "footer.credits": {
      "nl": "Credits",
      "en": "Credits",
      "de": "Credits"
    },
    "footer.sources": {
      "nl": "Bronnen",
      "en": "Sources",
      "de": "Quellen"
    },
    "footer.rules": {
      "nl": "Rekenregels",
      "en": "Scoring rules",
      "de": "Berechnungsregeln"
    },
    "footer.privacy": {
      "nl": "Privacy",
      "en": "Privacy",
      "de": "Datenschutz"
    }
  },
  "license": "                    GNU GENERAL PUBLIC LICENSE\n                       Version 3, 29 June 2007\n\n Copyright (C) 2007 Free Software Foundation, Inc. <https://fsf.org/>\n Everyone is permitted to copy and distribute verbatim copies\n of this license document, but changing it is not allowed.\n\n                            Preamble\n\n  The GNU General Public License is a free, copyleft license for\nsoftware and other kinds of works.\n\n  The licenses for most software and other practical works are designed\nto take away your freedom to share and change the works.  By contrast,\nthe GNU General Public License is intended to guarantee your freedom to\nshare and change all versions of a program--to make sure it remains free\nsoftware for all its users.  We, the Free Software Foundation, use the\nGNU General Public License for most of our software; it applies also to\nany other work released this way by its authors.  You can apply it to\nyour programs, too.\n\n  When we speak of free software, we are referring to freedom, not\nprice.  Our General Public Licenses are designed to make sure that you\nhave the freedom to distribute copies of free software (and charge for\nthem if you wish), that you receive source code or can get it if you\nwant it, that you can change the software or use pieces of it in new\nfree programs, and that you know you can do these things.\n\n  To protect your rights, we need to prevent others from denying you\nthese rights or asking you to surrender the rights.  Therefore, you have\ncertain responsibilities if you distribute copies of the software, or if\nyou modify it: responsibilities to respect the freedom of others.\n\n  For example, if you distribute copies of such a program, whether\ngratis or for a fee, you must pass on to the recipients the same\nfreedoms that you received.  You must make sure that they, too, receive\nor can get the source code.  And you must show them these terms so they\nknow their rights.\n\n  Developers that use the GNU GPL protect your rights with two steps:\n(1) assert copyright on the software, and (2) offer you this License\ngiving you legal permission to copy, distribute and/or modify it.\n\n  For the developers' and authors' protection, the GPL clearly explains\nthat there is no warranty for this free software.  For both users' and\nauthors' sake, the GPL requires that modified versions be marked as\nchanged, so that their problems will not be attributed erroneously to\nauthors of previous versions.\n\n  Some devices are designed to deny users access to install or run\nmodified versions of the software inside them, although the manufacturer\ncan do so.  This is fundamentally incompatible with the aim of\nprotecting users' freedom to change the software.  The systematic\npattern of such abuse occurs in the area of products for individuals to\nuse, which is precisely where it is most unacceptable.  Therefore, we\nhave designed this version of the GPL to prohibit the practice for those\nproducts.  If such problems arise substantially in other domains, we\nstand ready to extend this provision to those domains in future versions\nof the GPL, as needed to protect the freedom of users.\n\n  Finally, every program is threatened constantly by software patents.\nStates should not allow patents to restrict development and use of\nsoftware on general-purpose computers, but in those that do, we wish to\navoid the special danger that patents applied to a free program could\nmake it effectively proprietary.  To prevent this, the GPL assures that\npatents cannot be used to render the program non-free.\n\n  The precise terms and conditions for copying, distribution and\nmodification follow.\n\n                       TERMS AND CONDITIONS\n\n  0. Definitions.\n\n  \"This License\" refers to version 3 of the GNU General Public License.\n\n  \"Copyright\" also means copyright-like laws that apply to other kinds of\nworks, such as semiconductor masks.\n\n  \"The Program\" refers to any copyrightable work licensed under this\nLicense.  Each licensee is addressed as \"you\".  \"Licensees\" and\n\"recipients\" may be individuals or organizations.\n\n  To \"modify\" a work means to copy from or adapt all or part of the work\nin a fashion requiring copyright permission, other than the making of an\nexact copy.  The resulting work is called a \"modified version\" of the\nearlier work or a work \"based on\" the earlier work.\n\n  A \"covered work\" means either the unmodified Program or a work based\non the Program.\n\n  To \"propagate\" a work means to do anything with it that, without\npermission, would make you directly or secondarily liable for\ninfringement under applicable copyright law, except executing it on a\ncomputer or modifying a private copy.  Propagation includes copying,\ndistribution (with or without modification), making available to the\npublic, and in some countries other activities as well.\n\n  To \"convey\" a work means any kind of propagation that enables other\nparties to make or receive copies.  Mere interaction with a user through\na computer network, with no transfer of a copy, is not conveying.\n\n  An interactive user interface displays \"Appropriate Legal Notices\"\nto the extent that it includes a convenient and prominently visible\nfeature that (1) displays an appropriate copyright notice, and (2)\ntells the user that there is no warranty for the work (except to the\nextent that warranties are provided), that licensees may convey the\nwork under this License, and how to view a copy of this License.  If\nthe interface presents a list of user commands or options, such as a\nmenu, a prominent item in the list meets this criterion.\n\n  1. Source Code.\n\n  The \"source code\" for a work means the preferred form of the work\nfor making modifications to it.  \"Object code\" means any non-source\nform of a work.\n\n  A \"Standard Interface\" means an interface that either is an official\nstandard defined by a recognized standards body, or, in the case of\ninterfaces specified for a particular programming language, one that\nis widely used among developers working in that language.\n\n  The \"System Libraries\" of an executable work include anything, other\nthan the work as a whole, that (a) is included in the normal form of\npackaging a Major Component, but which is not part of that Major\nComponent, and (b) serves only to enable use of the work with that\nMajor Component, or to implement a Standard Interface for which an\nimplementation is available to the public in source code form.  A\n\"Major Component\", in this context, means a major essential component\n(kernel, window system, and so on) of the specific operating system\n(if any) on which the executable work runs, or a compiler used to\nproduce the work, or an object code interpreter used to run it.\n\n  The \"Corresponding Source\" for a work in object code form means all\nthe source code needed to generate, install, and (for an executable\nwork) run the object code and to modify the work, including scripts to\ncontrol those activities.  However, it does not include the work's\nSystem Libraries, or general-purpose tools or generally available free\nprograms which are used unmodified in performing those activities but\nwhich are not part of the work.  For example, Corresponding Source\nincludes interface definition files associated with source files for\nthe work, and the source code for shared libraries and dynamically\nlinked subprograms that the work is specifically designed to require,\nsuch as by intimate data communication or control flow between those\nsubprograms and other parts of the work.\n\n  The Corresponding Source need not include anything that users\ncan regenerate automatically from other parts of the Corresponding\nSource.\n\n  The Corresponding Source for a work in source code form is that\nsame work.\n\n  2. Basic Permissions.\n\n  All rights granted under this License are granted for the term of\ncopyright on the Program, and are irrevocable provided the stated\nconditions are met.  This License explicitly affirms your unlimited\npermission to run the unmodified Program.  The output from running a\ncovered work is covered by this License only if the output, given its\ncontent, constitutes a covered work.  This License acknowledges your\nrights of fair use or other equivalent, as provided by copyright law.\n\n  You may make, run and propagate covered works that you do not\nconvey, without conditions so long as your license otherwise remains\nin force.  You may convey covered works to others for the sole purpose\nof having them make modifications exclusively for you, or provide you\nwith facilities for running those works, provided that you comply with\nthe terms of this License in conveying all material for which you do\nnot control copyright.  Those thus making or running the covered works\nfor you must do so exclusively on your behalf, under your direction\nand control, on terms that prohibit them from making any copies of\nyour copyrighted material outside their relationship with you.\n\n  Conveying under any other circumstances is permitted solely under\nthe conditions stated below.  Sublicensing is not allowed; section 10\nmakes it unnecessary.\n\n  3. Protecting Users' Legal Rights From Anti-Circumvention Law.\n\n  No covered work shall be deemed part of an effective technological\nmeasure under any applicable law fulfilling obligations under article\n11 of the WIPO copyright treaty adopted on 20 December 1996, or\nsimilar laws prohibiting or restricting circumvention of such\nmeasures.\n\n  When you convey a covered work, you waive any legal power to forbid\ncircumvention of technological measures to the extent such circumvention\nis effected by exercising rights under this License with respect to\nthe covered work, and you disclaim any intention to limit operation or\nmodification of the work as a means of enforcing, against the work's\nusers, your or third parties' legal rights to forbid circumvention of\ntechnological measures.\n\n  4. Conveying Verbatim Copies.\n\n  You may convey verbatim copies of the Program's source code as you\nreceive it, in any medium, provided that you conspicuously and\nappropriately publish on each copy an appropriate copyright notice;\nkeep intact all notices stating that this License and any\nnon-permissive terms added in accord with section 7 apply to the code;\nkeep intact all notices of the absence of any warranty; and give all\nrecipients a copy of this License along with the Program.\n\n  You may charge any price or no price for each copy that you convey,\nand you may offer support or warranty protection for a fee.\n\n  5. Conveying Modified Source Versions.\n\n  You may convey a work based on the Program, or the modifications to\nproduce it from the Program, in the form of source code under the\nterms of section 4, provided that you also meet all of these conditions:\n\n    a) The work must carry prominent notices stating that you modified\n    it, and giving a relevant date.\n\n    b) The work must carry prominent notices stating that it is\n    released under this License and any conditions added under section\n    7.  This requirement modifies the requirement in section 4 to\n    \"keep intact all notices\".\n\n    c) You must license the entire work, as a whole, under this\n    License to anyone who comes into possession of a copy.  This\n    License will therefore apply, along with any applicable section 7\n    additional terms, to the whole of the work, and all its parts,\n    regardless of how they are packaged.  This License gives no\n    permission to license the work in any other way, but it does not\n    invalidate such permission if you have separately received it.\n\n    d) If the work has interactive user interfaces, each must display\n    Appropriate Legal Notices; however, if the Program has interactive\n    interfaces that do not display Appropriate Legal Notices, your\n    work need not make them do so.\n\n  A compilation of a covered work with other separate and independent\nworks, which are not by their nature extensions of the covered work,\nand which are not combined with it such as to form a larger program,\nin or on a volume of a storage or distribution medium, is called an\n\"aggregate\" if the compilation and its resulting copyright are not\nused to limit the access or legal rights of the compilation's users\nbeyond what the individual works permit.  Inclusion of a covered work\nin an aggregate does not cause this License to apply to the other\nparts of the aggregate.\n\n  6. Conveying Non-Source Forms.\n\n  You may convey a covered work in object code form under the terms\nof sections 4 and 5, provided that you also convey the\nmachine-readable Corresponding Source under the terms of this License,\nin one of these ways:\n\n    a) Convey the object code in, or embodied in, a physical product\n    (including a physical distribution medium), accompanied by the\n    Corresponding Source fixed on a durable physical medium\n    customarily used for software interchange.\n\n    b) Convey the object code in, or embodied in, a physical product\n    (including a physical distribution medium), accompanied by a\n    written offer, valid for at least three years and valid for as\n    long as you offer spare parts or customer support for that product\n    model, to give anyone who possesses the object code either (1) a\n    copy of the Corresponding Source for all the software in the\n    product that is covered by this License, on a durable physical\n    medium customarily used for software interchange, for a price no\n    more than your reasonable cost of physically performing this\n    conveying of source, or (2) access to copy the\n    Corresponding Source from a network server at no charge.\n\n    c) Convey individual copies of the object code with a copy of the\n    written offer to provide the Corresponding Source.  This\n    alternative is allowed only occasionally and noncommercially, and\n    only if you received the object code with such an offer, in accord\n    with subsection 6b.\n\n    d) Convey the object code by offering access from a designated\n    place (gratis or for a charge), and offer equivalent access to the\n    Corresponding Source in the same way through the same place at no\n    further charge.  You need not require recipients to copy the\n    Corresponding Source along with the object code.  If the place to\n    copy the object code is a network server, the Corresponding Source\n    may be on a different server (operated by you or a third party)\n    that supports equivalent copying facilities, provided you maintain\n    clear directions next to the object code saying where to find the\n    Corresponding Source.  Regardless of what server hosts the\n    Corresponding Source, you remain obligated to ensure that it is\n    available for as long as needed to satisfy these requirements.\n\n    e) Convey the object code using peer-to-peer transmission, provided\n    you inform other peers where the object code and Corresponding\n    Source of the work are being offered to the general public at no\n    charge under subsection 6d.\n\n  A separable portion of the object code, whose source code is excluded\nfrom the Corresponding Source as a System Library, need not be\nincluded in conveying the object code work.\n\n  A \"User Product\" is either (1) a \"consumer product\", which means any\ntangible personal property which is normally used for personal, family,\nor household purposes, or (2) anything designed or sold for incorporation\ninto a dwelling.  In determining whether a product is a consumer product,\ndoubtful cases shall be resolved in favor of coverage.  For a particular\nproduct received by a particular user, \"normally used\" refers to a\ntypical or common use of that class of product, regardless of the status\nof the particular user or of the way in which the particular user\nactually uses, or expects or is expected to use, the product.  A product\nis a consumer product regardless of whether the product has substantial\ncommercial, industrial or non-consumer uses, unless such uses represent\nthe only significant mode of use of the product.\n\n  \"Installation Information\" for a User Product means any methods,\nprocedures, authorization keys, or other information required to install\nand execute modified versions of a covered work in that User Product from\na modified version of its Corresponding Source.  The information must\nsuffice to ensure that the continued functioning of the modified object\ncode is in no case prevented or interfered with solely because\nmodification has been made.\n\n  If you convey an object code work under this section in, or with, or\nspecifically for use in, a User Product, and the conveying occurs as\npart of a transaction in which the right of possession and use of the\nUser Product is transferred to the recipient in perpetuity or for a\nfixed term (regardless of how the transaction is characterized), the\nCorresponding Source conveyed under this section must be accompanied\nby the Installation Information.  But this requirement does not apply\nif neither you nor any third party retains the ability to install\nmodified object code on the User Product (for example, the work has\nbeen installed in ROM).\n\n  The requirement to provide Installation Information does not include a\nrequirement to continue to provide support service, warranty, or updates\nfor a work that has been modified or installed by the recipient, or for\nthe User Product in which it has been modified or installed.  Access to a\nnetwork may be denied when the modification itself materially and\nadversely affects the operation of the network or violates the rules and\nprotocols for communication across the network.\n\n  Corresponding Source conveyed, and Installation Information provided,\nin accord with this section must be in a format that is publicly\ndocumented (and with an implementation available to the public in\nsource code form), and must require no special password or key for\nunpacking, reading or copying.\n\n  7. Additional Terms.\n\n  \"Additional permissions\" are terms that supplement the terms of this\nLicense by making exceptions from one or more of its conditions.\nAdditional permissions that are applicable to the entire Program shall\nbe treated as though they were included in this License, to the extent\nthat they are valid under applicable law.  If additional permissions\napply only to part of the Program, that part may be used separately\nunder those permissions, but the entire Program remains governed by\nthis License without regard to the additional permissions.\n\n  When you convey a copy of a covered work, you may at your option\nremove any additional permissions from that copy, or from any part of\nit.  (Additional permissions may be written to require their own\nremoval in certain cases when you modify the work.)  You may place\nadditional permissions on material, added by you to a covered work,\nfor which you have or can give appropriate copyright permission.\n\n  Notwithstanding any other provision of this License, for material you\nadd to a covered work, you may (if authorized by the copyright holders of\nthat material) supplement the terms of this License with terms:\n\n    a) Disclaiming warranty or limiting liability differently from the\n    terms of sections 15 and 16 of this License; or\n\n    b) Requiring preservation of specified reasonable legal notices or\n    author attributions in that material or in the Appropriate Legal\n    Notices displayed by works containing it; or\n\n    c) Prohibiting misrepresentation of the origin of that material, or\n    requiring that modified versions of such material be marked in\n    reasonable ways as different from the original version; or\n\n    d) Limiting the use for publicity purposes of names of licensors or\n    authors of the material; or\n\n    e) Declining to grant rights under trademark law for use of some\n    trade names, trademarks, or service marks; or\n\n    f) Requiring indemnification of licensors and authors of that\n    material by anyone who conveys the material (or modified versions of\n    it) with contractual assumptions of liability to the recipient, for\n    any liability that these contractual assumptions directly impose on\n    those licensors and authors.\n\n  All other non-permissive additional terms are considered \"further\nrestrictions\" within the meaning of section 10.  If the Program as you\nreceived it, or any part of it, contains a notice stating that it is\ngoverned by this License along with a term that is a further\nrestriction, you may remove that term.  If a license document contains\na further restriction but permits relicensing or conveying under this\nLicense, you may add to a covered work material governed by the terms\nof that license document, provided that the further restriction does\nnot survive such relicensing or conveying.\n\n  If you add terms to a covered work in accord with this section, you\nmust place, in the relevant source files, a statement of the\nadditional terms that apply to those files, or a notice indicating\nwhere to find the applicable terms.\n\n  Additional terms, permissive or non-permissive, may be stated in the\nform of a separately written license, or stated as exceptions;\nthe above requirements apply either way.\n\n  8. Termination.\n\n  You may not propagate or modify a covered work except as expressly\nprovided under this License.  Any attempt otherwise to propagate or\nmodify it is void, and will automatically terminate your rights under\nthis License (including any patent licenses granted under the third\nparagraph of section 11).\n\n  However, if you cease all violation of this License, then your\nlicense from a particular copyright holder is reinstated (a)\nprovisionally, unless and until the copyright holder explicitly and\nfinally terminates your license, and (b) permanently, if the copyright\nholder fails to notify you of the violation by some reasonable means\nprior to 60 days after the cessation.\n\n  Moreover, your license from a particular copyright holder is\nreinstated permanently if the copyright holder notifies you of the\nviolation by some reasonable means, this is the first time you have\nreceived notice of violation of this License (for any work) from that\ncopyright holder, and you cure the violation prior to 30 days after\nyour receipt of the notice.\n\n  Termination of your rights under this section does not terminate the\nlicenses of parties who have received copies or rights from you under\nthis License.  If your rights have been terminated and not permanently\nreinstated, you do not qualify to receive new licenses for the same\nmaterial under section 10.\n\n  9. Acceptance Not Required for Having Copies.\n\n  You are not required to accept this License in order to receive or\nrun a copy of the Program.  Ancillary propagation of a covered work\noccurring solely as a consequence of using peer-to-peer transmission\nto receive a copy likewise does not require acceptance.  However,\nnothing other than this License grants you permission to propagate or\nmodify any covered work.  These actions infringe copyright if you do\nnot accept this License.  Therefore, by modifying or propagating a\ncovered work, you indicate your acceptance of this License to do so.\n\n  10. Automatic Licensing of Downstream Recipients.\n\n  Each time you convey a covered work, the recipient automatically\nreceives a license from the original licensors, to run, modify and\npropagate that work, subject to this License.  You are not responsible\nfor enforcing compliance by third parties with this License.\n\n  An \"entity transaction\" is a transaction transferring control of an\norganization, or substantially all assets of one, or subdividing an\norganization, or merging organizations.  If propagation of a covered\nwork results from an entity transaction, each party to that\ntransaction who receives a copy of the work also receives whatever\nlicenses to the work the party's predecessor in interest had or could\ngive under the previous paragraph, plus a right to possession of the\nCorresponding Source of the work from the predecessor in interest, if\nthe predecessor has it or can get it with reasonable efforts.\n\n  You may not impose any further restrictions on the exercise of the\nrights granted or affirmed under this License.  For example, you may\nnot impose a license fee, royalty, or other charge for exercise of\nrights granted under this License, and you may not initiate litigation\n(including a cross-claim or counterclaim in a lawsuit) alleging that\nany patent claim is infringed by making, using, selling, offering for\nsale, or importing the Program or any portion of it.\n\n  11. Patents.\n\n  A \"contributor\" is a copyright holder who authorizes use under this\nLicense of the Program or a work on which the Program is based.  The\nwork thus licensed is called the contributor's \"contributor version\".\n\n  A contributor's \"essential patent claims\" are all patent claims\nowned or controlled by the contributor, whether already acquired or\nhereafter acquired, that would be infringed by some manner, permitted\nby this License, of making, using, or selling its contributor version,\nbut do not include claims that would be infringed only as a\nconsequence of further modification of the contributor version.  For\npurposes of this definition, \"control\" includes the right to grant\npatent sublicenses in a manner consistent with the requirements of\nthis License.\n\n  Each contributor grants you a non-exclusive, worldwide, royalty-free\npatent license under the contributor's essential patent claims, to\nmake, use, sell, offer for sale, import and otherwise run, modify and\npropagate the contents of its contributor version.\n\n  In the following three paragraphs, a \"patent license\" is any express\nagreement or commitment, however denominated, not to enforce a patent\n(such as an express permission to practice a patent or covenant not to\nsue for patent infringement).  To \"grant\" such a patent license to a\nparty means to make such an agreement or commitment not to enforce a\npatent against the party.\n\n  If you convey a covered work, knowingly relying on a patent license,\nand the Corresponding Source of the work is not available for anyone\nto copy, free of charge and under the terms of this License, through a\npublicly available network server or other readily accessible means,\nthen you must either (1) cause the Corresponding Source to be so\navailable, or (2) arrange to deprive yourself of the benefit of the\npatent license for this particular work, or (3) arrange, in a manner\nconsistent with the requirements of this License, to extend the patent\nlicense to downstream recipients.  \"Knowingly relying\" means you have\nactual knowledge that, but for the patent license, your conveying the\ncovered work in a country, or your recipient's use of the covered work\nin a country, would infringe one or more identifiable patents in that\ncountry that you have reason to believe are valid.\n\n  If, pursuant to or in connection with a single transaction or\narrangement, you convey, or propagate by procuring conveyance of, a\ncovered work, and grant a patent license to some of the parties\nreceiving the covered work authorizing them to use, propagate, modify\nor convey a specific copy of the covered work, then the patent license\nyou grant is automatically extended to all recipients of the covered\nwork and works based on it.\n\n  A patent license is \"discriminatory\" if it does not include within\nthe scope of its coverage, prohibits the exercise of, or is\nconditioned on the non-exercise of one or more of the rights that are\nspecifically granted under this License.  You may not convey a covered\nwork if you are a party to an arrangement with a third party that is\nin the business of distributing software, under which you make payment\nto the third party based on the extent of your activity of conveying\nthe work, and under which the third party grants, to any of the\nparties who would receive the covered work from you, a discriminatory\npatent license (a) in connection with copies of the covered work\nconveyed by you (or copies made from those copies), or (b) primarily\nfor and in connection with specific products or compilations that\ncontain the covered work, unless you entered into that arrangement,\nor that patent license was granted, prior to 28 March 2007.\n\n  Nothing in this License shall be construed as excluding or limiting\nany implied license or other defenses to infringement that may\notherwise be available to you under applicable patent law.\n\n  12. No Surrender of Others' Freedom.\n\n  If conditions are imposed on you (whether by court order, agreement or\notherwise) that contradict the conditions of this License, they do not\nexcuse you from the conditions of this License.  If you cannot convey a\ncovered work so as to satisfy simultaneously your obligations under this\nLicense and any other pertinent obligations, then as a consequence you may\nnot convey it at all.  For example, if you agree to terms that obligate you\nto collect a royalty for further conveying from those to whom you convey\nthe Program, the only way you could satisfy both those terms and this\nLicense would be to refrain entirely from conveying the Program.\n\n  13. Use with the GNU Affero General Public License.\n\n  Notwithstanding any other provision of this License, you have\npermission to link or combine any covered work with a work licensed\nunder version 3 of the GNU Affero General Public License into a single\ncombined work, and to convey the resulting work.  The terms of this\nLicense will continue to apply to the part which is the covered work,\nbut the special requirements of the GNU Affero General Public License,\nsection 13, concerning interaction through a network will apply to the\ncombination as such.\n\n  14. Revised Versions of this License.\n\n  The Free Software Foundation may publish revised and/or new versions of\nthe GNU General Public License from time to time.  Such new versions will\nbe similar in spirit to the present version, but may differ in detail to\naddress new problems or concerns.\n\n  Each version is given a distinguishing version number.  If the\nProgram specifies that a certain numbered version of the GNU General\nPublic License \"or any later version\" applies to it, you have the\noption of following the terms and conditions either of that numbered\nversion or of any later version published by the Free Software\nFoundation.  If the Program does not specify a version number of the\nGNU General Public License, you may choose any version ever published\nby the Free Software Foundation.\n\n  If the Program specifies that a proxy can decide which future\nversions of the GNU General Public License can be used, that proxy's\npublic statement of acceptance of a version permanently authorizes you\nto choose that version for the Program.\n\n  Later license versions may give you additional or different\npermissions.  However, no additional obligations are imposed on any\nauthor or copyright holder as a result of your choosing to follow a\nlater version.\n\n  15. Disclaimer of Warranty.\n\n  THERE IS NO WARRANTY FOR THE PROGRAM, TO THE EXTENT PERMITTED BY\nAPPLICABLE LAW.  EXCEPT WHEN OTHERWISE STATED IN WRITING THE COPYRIGHT\nHOLDERS AND/OR OTHER PARTIES PROVIDE THE PROGRAM \"AS IS\" WITHOUT WARRANTY\nOF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING, BUT NOT LIMITED TO,\nTHE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR\nPURPOSE.  THE ENTIRE RISK AS TO THE QUALITY AND PERFORMANCE OF THE PROGRAM\nIS WITH YOU.  SHOULD THE PROGRAM PROVE DEFECTIVE, YOU ASSUME THE COST OF\nALL NECESSARY SERVICING, REPAIR OR CORRECTION.\n\n  16. Limitation of Liability.\n\n  IN NO EVENT UNLESS REQUIRED BY APPLICABLE LAW OR AGREED TO IN WRITING\nWILL ANY COPYRIGHT HOLDER, OR ANY OTHER PARTY WHO MODIFIES AND/OR CONVEYS\nTHE PROGRAM AS PERMITTED ABOVE, BE LIABLE TO YOU FOR DAMAGES, INCLUDING ANY\nGENERAL, SPECIAL, INCIDENTAL OR CONSEQUENTIAL DAMAGES ARISING OUT OF THE\nUSE OR INABILITY TO USE THE PROGRAM (INCLUDING BUT NOT LIMITED TO LOSS OF\nDATA OR DATA BEING RENDERED INACCURATE OR LOSSES SUSTAINED BY YOU OR THIRD\nPARTIES OR A FAILURE OF THE PROGRAM TO OPERATE WITH ANY OTHER PROGRAMS),\nEVEN IF SUCH HOLDER OR OTHER PARTY HAS BEEN ADVISED OF THE POSSIBILITY OF\nSUCH DAMAGES.\n\n  17. Interpretation of Sections 15 and 16.\n\n  If the disclaimer of warranty and limitation of liability provided\nabove cannot be given local legal effect according to their terms,\nreviewing courts shall apply local law that most closely approximates\nan absolute waiver of all civil liability in connection with the\nProgram, unless a warranty or assumption of liability accompanies a\ncopy of the Program in return for a fee.\n\n                     END OF TERMS AND CONDITIONS\n\n            How to Apply These Terms to Your New Programs\n\n  If you develop a new program, and you want it to be of the greatest\npossible use to the public, the best way to achieve this is to make it\nfree software which everyone can redistribute and change under these terms.\n\n  To do so, attach the following notices to the program.  It is safest\nto attach them to the start of each source file to most effectively\nstate the exclusion of warranty; and each file should have at least\nthe \"copyright\" line and a pointer to where the full notice is found.\n\n    <one line to give the program's name and a brief idea of what it does.>\n    Copyright (C) <year>  <name of author>\n\n    This program is free software: you can redistribute it and/or modify\n    it under the terms of the GNU General Public License as published by\n    the Free Software Foundation, either version 3 of the License, or\n    (at your option) any later version.\n\n    This program is distributed in the hope that it will be useful,\n    but WITHOUT ANY WARRANTY; without even the implied warranty of\n    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the\n    GNU General Public License for more details.\n\n    You should have received a copy of the GNU General Public License\n    along with this program.  If not, see <https://www.gnu.org/licenses/>.\n\nAlso add information on how to contact you by electronic and paper mail.\n\n  If the program does terminal interaction, make it output a short\nnotice like this when it starts in an interactive mode:\n\n    <program>  Copyright (C) <year>  <name of author>\n    This program comes with ABSOLUTELY NO WARRANTY; for details type `show w'.\n    This is free software, and you are welcome to redistribute it\n    under certain conditions; type `show c' for details.\n\nThe hypothetical commands `show w' and `show c' should show the appropriate\nparts of the General Public License.  Of course, your program's commands\nmight be different; for a GUI interface, you would use an \"about box\".\n\n  You should also get your employer (if you work as a programmer) or school,\nif any, to sign a \"copyright disclaimer\" for the program, if necessary.\nFor more information on this, and how to apply and follow the GNU GPL, see\n<https://www.gnu.org/licenses/>.\n\n  The GNU General Public License does not permit incorporating your program\ninto proprietary programs.  If your program is a subroutine library, you\nmay consider it more useful to permit linking proprietary applications with\nthe library.  If this is what you want to do, use the GNU Lesser General\nPublic License instead of this License.  But first, please read\n<https://www.gnu.org/licenses/why-not-lgpl.html>.\n"
};
