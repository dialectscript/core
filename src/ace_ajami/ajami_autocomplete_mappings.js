// mappings/yoruba.js

window.alldialects = {
  // Keyword Mappings
  keywordMappings: 
  {

// Declarations and Scoping
"sabo": "new",
"madadi": "var",
"madadinWucinGadi": "let",
"madadiTsayayye": "const",
"aiki": "function",
"aji": "class",
"bunkasaAji": "extends",
"shigoDa": "import",
"fitarDa": "export",

// Data Types
"rubutu": "string",
"lamba": "number",
"gaskiyaKoKarya": "boolean",
"abu": "object",
"null": "null",
"undefined": "undefined",
"jerin": "array",
"alama": "symbol",
"babbanLamba": "bigint",

"Lamba":"Number", 
"Rubutu":"String", 
"GaskiyaKoKarya":"Boolean", 
"Alama":"Symbol", 
"BabbanLamba":"BigInt", 

"gaskiya": "true",
"karya": "false",
"NaN": "NaN",
"baIyaka": "Infinity",

// Operators
"+": "+",                  // addition or concatenation
"-": "-",                  // subtraction
"*": "*",                 // multiplication
"/": "/",                  // division
"%": "%",                 // modulus
"daidaiDa": "==",             // equality comparison
"===": "===",  // strict equality comparison
"baDaidaiDa": "!=",             // inequality comparison
"!==": "!==",  // strict inequality comparison
"yayiKasaDa": "<",                // less than
"yafi": ">",                 // greater than
"kasaDaKoDaidaiDa": "<=",     // less than or equal to
"yafiKoDaidaiDa": ">=",      // greater than or equal to
"!": "!",            // logical NOT
"ko": "||",                   // logical OR
"daKuma": "&&",                 // logical AND


//Type Conversion Functions
"parseInt":"parseInt", 
"parseFloat":"parseFloat", 

// Control Flow
"in": "if",
"kokuma": "else",
"faraDaga": "for",
"zabi": "switch",
"mayarDa": "return",
"tsaya": "break",
"cigaba": "continue",

// Loops
"faraDaga": "for",
"yayinda": "while",
"yi": "do",
"kowane": "of",
"cikin": "in",

// Error Handling
"gwada": "try",
"kama": "catch",
"dagaKarshe": "finally",
"jefa": "throw",

// Functions and Methods
"kiraAiki": "call",
"sakaAiki": "apply",
"hada": "bind",
"gefeDaGefe": "async",
"jira": "await",

// Classes and Modules
"naAsali": "default",
"bunkasaAji": "extends",
"super": "super",
"static": "static",
"daga":"from",

// Object Properties and Methods
"Abu":"Object",
"Object.keys":"Object.keys", 
"Object.values":"Object.values", 
"Object.entries":"Object.entries", 
"Object.assign":"Object.assign",
"wannan": "this",
"tsawo": "length",
"prototype": "prototype",
"constructor": "constructor",
"samo": "get",
"saita": "set",

//Array Methods**: 
"tura":"push", 
"cire":"pop", 
"shift":"shift", 
"unshift":"unshift", 
"map":"map", 
"tace":"filter", 
"rage":"reduce", 
"aKowane":"forEach",

// Asynchronous Programming
"jira": "await",
"alkawari": "promise",
"sasanta": "resolve",
"jefar": "reject",
"sannan": "then",
"kama": "catch",
"dagaKarshe": "finally",

// Miscellaneous
"babu": "void",
"typeof": "typeof",
"instanceof": "instanceof",
"NaN": "NaN",
"Infinity": "Infinity",
"globalThis": "globalThis",
"eval": "eval",

// DOM Manipulation and Events
"samoElementTaId": "document.getElementById",
"nemoElement": "document.querySelector",
"nemoDukaElements": "document.querySelectorAll",
"HTMLDinCiki": "innerHTML",
"rubutunCiki":"innerText",
"salo": "style",
"jerinSalonElement": "element.classList",


// Event Handling
"faraSauraronAiki": "addEventListener",
"bariSauraronAiki": "removeEventListener",
"akanDannawa": "onclick",           // Triggered when an element is clicked
"akanDannaMaballi": "onkeydown",  // Triggered when a key is pressed
"akanSakinMaballi": "onkeyup",      // Triggered when a key is released
"akanMayarDaHankali": "onfocus",    // Triggered when an element receives focus
"akanBarinHankali": "onblur",       // Triggered when an element loses focus
"akanCanji": "onchange",            // Triggered when an element’s value changes
"akanShigarwa": "oninput",          // Triggered when user inputs data
"akanCikakkenShiga": "onload",      // Triggered when the page or element finishes loading
"akanGungurawa": "onscroll",          // Triggered when the page or element is scrolled

// ── Events (natural spoken style) ─────
"idanAnDanna": "onclick",
"idanAnLatsa": "onkeydown",
"idanAnSake": "onkeyup",
"idanAnShiga": "onfocus",
"idanAnFita": "onblur",
"idanAnCanja": "onchange",
"idanAnRubuta": "oninput",
"idanAnKammala": "onload",
"idanAnGungura": "onscroll",
"saurara": "addEventListener",     // element.saurara("click", aiki)
"dainaSaurara": "removeEventListener",


//Built-in JavaScript Objects and Methods
"Lissafi.random":"Math.random", 
"Lissafi.floor":"Math.floor", 
"Lissafi.pow":"Math.pow",
"KwananWata":"Date", 
"KwananWata.yanzu":"Date.now", 
"Date.toISOString":"Date.toISOString",

//JSON
"JSON.parse":"JSON.parse", 
"JSON.stringify":"JSON.stringify",

//Global Functions
"rubuta":"console.log",
"nuna":"alert",
"tambayi":"prompt",
"maidaZuwaLamba":"parseInt",
"maidaZuwaLambaMaiDigo":"parseFloat",

// Date Retrieval Functions
"samoKwananWata": "Date.getDate",
"samoRana": "Date.getDay",
"samoShekara": "Date.getFullYear",
"samoAwanni": "Date.getHours",
"samoDakikaiMasuGirma": "Date.getMilliseconds",
"samoMintina": "Date.getMinutes",
"samoWata": "Date.getMonth",
"samoDakikai": "Date.getSeconds",
"samoLokaci": "Date.getTime",
"samoKibiyarYanayi": "Date.getTimezoneOffset",
"samoHwananWataUTC": "Date.getUTCDate",
"samoRanaUTC": "Date.getUTCDay",
"samoShekaraUTC": "Date.getUTCFullYear",
"samoAwanniUTC": "Date.getUTCHours",
"samoDakikaiMasuGirmaUTC": "Date.getUTCMilliseconds",
"samoMintinaUTC": "Date.getUTCMinutes",
"samoWataUTC": "Date.getUTCMonth",
"samoDakikaiUTC": "Date.getUTCSeconds",

// Date Static Functions
"samoLokaciYanzu": "Date.now",
"dakkoLokaciYanzu": "Date.now",
"Date.parse": "Date.parse",

// Date Setting Functions
"saitaKwananWata": "Date.setDate",
"saitaShekara": "Date.setFullYear",
"saitaAwanni": "Date.setHours",
"saitaDakikaiMasuGirma": "Date.setMilliseconds",
"saitaMinti": "Date.setMinutes",
"saitaWata": "Date.setMonth",
"saitaDakikai": "Date.setSeconds",
"saitaLokaci": "Date.setTime",

// Date Formatting Functions
"juyaKwanarWataZuwaString": "Date.toDateString",
"juyaKwanarWataZuwaISOString": "Date.toISOString",
"juyaKwanarWataZuwaJSON": "Date.toJSON",
"juyaKwanarWataZuwaLocaleDateString": "Date.toLocaleDateString",
"juyaKwanarWataZuwaLocaleTimeString": "Date.toLocaleTimeString",
"juyaKwanarWataZuwaLocaleString": "Date.toLocaleString",
"juyaKwanarWataZuwaTimeString": "Date.toTimeString",
"juyaKwanarWataZuwaUTCString": "Date.toUTCString",

// Window Object Functions
"taga": "window",
"nuna": "alert",
"tabbatar": "confirm",
"tambaya": "prompt",
"saitaJinkiri": "setTimeout",
"saitaLokaciTsayawa": "setInterval",
"cireJinkiri": "clearTimeout",
"cireLokaciTsayawa": "clearInterval",
"shafi": "location",

// ── Window & Timing ───────────────────
"taga": "window",
"shafi": "location",
"jiraSekan": "setTimeout",
"jiraKowace": "setInterval",
"dakatar": "clearTimeout",
"dakko": "clearInterval",


// Graphics (Canvas and SVG)

"maiDaHankali": "focus",                 // Focuses on an element
"rashinHankali": "blur",                 // Removes focus from an element
"danna": "click",                        // Event for clicking an element

// Dimensions
"fadi": "width",                         // Width of a canvas or element
"tsawo": "height",                       // Height of a canvas or element
"samoMahalli": "getContext",            // Retrieves the canvas drawing context

// Canvas Styling
"salonCikawa": "fillStyle",              // Fill color or style
"salonShafi": "strokeStyle",             // Stroke color or style
"fadinLayi": "lineWidth",                 // Width of a line or stroke
"gabanLayi": "lineCap",                   // Line cap style
"hadinLayi": "lineJoin",                 // Line join style
"iyakarMita": "miterLimit",              // Miter limit for line joins
"salonHarafi": "font",                         // Font style
"daidaitonRubutu": "textAlign",          // Text alignment
"tushenRubutu": "textBaseline",          // Baseline for text

// Shadows and Opacity
"launinInuwa": "shadowColor",             // Color of the shadow
"fuzzarInuwa": "shadowBlur",             // Blur level of the shadow
"nadinInuwaX": "shadowOffsetX",          // Horizontal shadow offset
"nadinInuwaY": "shadowOffsetY",          // Vertical shadow offset
"globalAlpha": "globalAlpha",          // Global transparency level
"globalCompositeOperation": "globalCompositeOperation", // Composite operation for global effects

// Paths and Drawing
"faraHanya": "beginPath",                // Begins a new path
"rufeHanya": "closePath",                // Closes the path
"motsaZuwa": "moveTo",                   // Moves to a specified position
"ZanaLayiZuwa": "lineTo",                    // Draws a line to a specified point
"ZanaMadauki": "arc",                        // Draws an arc
"ZanaMadaukiZuwa": "arcTo",                    // Draws an arc to a point
"saitaIyakarMita": "miterLimit",             // Sets miter limit
"ZanaLayiZagayeZuwa": "quadraticCurveTo",       // Quadratic curve line
"ZanaLayiCurveZuwa": "bezierCurveTo",           // Bezier curve line
"ZanaKwali": "rect",                   // Draws a rectangle
"ZanaKwai": "ellipse",             // Draws an ellipse
"cikaDaKala": "fill",                        // Fills the current path
"zazzana": "stroke",                       // Strokes the current path
"gogeKwali": "clearRect",                 // Clears a specified rectangle
"cikaKwaliDaKala": "fillRect",                  // Fills a specified rectangle
"zazzanaKwali": "strokeRect",               // Strokes a specified rectangle
"cikaRubutuDaKala": "fillText",                // Draws filled text
"zazzanaRubutu": "strokeText",             // Draws stroked text

// Image Manipulation
"zanaHoto": "drawImage",                 // Draws an image onto the canvas
"aunaFadinRubutu": "measureText",             // Measures text width

// Transformations
"maAuni": "scale",                      // Scales the drawing
"juya": "rotate",                      // Rotates the drawing
"canjiMatsayi": "translate",             // Translates the drawing position
"canjiFassara": "transform",             // Applies a transformation
"saitaCanji": "setTransform",            // Sets the current transform
"mayarDaCanji": "resetTransform",        // Resets transformations

// Image Data
"kirkirarBayaninHoto": "createImageData", // Creates a blank image data object
"samoBayaninHoto": "getImageData",       // Retrieves image data from canvas
"sanyaBayaninHoto": "putImageData",       // Places image data on canvas

// Line Dash
"saitaNisanLayi": "setLineDash",          // Sets the line dash pattern
"samoNisanLayi": "getLineDash",          // Gets the line dash pattern

// SVG Manipulations
"fadi": "width",                      // Width of an SVG element
"tsawo": "height",                    // Height of an SVG element
"viewbox": "viewBox",             // SVG viewbox attribute
"ajiyayyenDaidaito": "preserveAspectRatio", // SVG aspect ratio preservation
"cikaDaKala": "fill",                     // SVG fill attribute
"zazzana": "stroke",                    // SVG stroke attribute
"fadinZazzanawa": "strokeWidth",              // Width of an SVG stroke
"bayyananne": "opacity",                 // Opacity of an element
"getBBox": "getBBox",                 // Gets the bounding box of an element
"getCTM": "getCTM",              // Gets the current transformation matrix
"getScreenCTM": "getScreenCTM",   // Gets screen transformation matrix
"kirkirarSVGPoint": "createSVGPoint",    // Creates an SVG point



//V2
// ── CANVAS 2D CONTEXT – Ajami Hausa (perfect for kids & beginners) ──
"mahalli": "getContext",                  // ctx = canvas.mahalli("2d")

// ── Basic drawing & filling
"faraZane": "beginPath",
"rufeZane": "closePath",
"motsaZuwa": "moveTo",                    // ctx.motsaZuwa(x, y)
"layiZuwa": "lineTo",                     // ctx.layiZuwa(x, y)
"cika": "fill",                           // ctx.cika() – fills with current launiNaCiki
"zane": "stroke",                         // ctx.zane() – draws outline
"goge": "clearRect",                      // ctx.goge(x, y, fadi, tsawo)
"kwali": "rect",                          // ctx.kwali(x, y, fadi, tsawo)

// ── Shapes
"da’ira": "arc",                          // ctx.da’ira(x, y, radius, 0, Lissafi.PI*2)
"kwanonDa’ira": "arcTo",
"zagaye": "quadraticCurveTo",             // ctx.zagaye(cpx, cpy, x, y)
"murza": "bezierCurveTo",                 // ctx.murza(cp1x, cp1y, cp2x, cp2y, x, y)
"ellipse": "ellipse",

// ── Colors & styles
"launiNaCiki": "fillStyle",               // ctx.launiNaCiki = "ja"
"launiNaZane": "strokeStyle",             // ctx.launiNaZane = "baki"
"kauriNaZane": "lineWidth",               // ctx.kauriNaZane = 5
"tsarinLayi": "lineCap",                  // "round" | "square" | "butt"
"hadinLayi": "lineJoin",                  // "round" | "bevel" | "miter"

// ── Text (super important for games!)
"rubutaDaLauni": "fillText",              // ctx.rubutaDaLauni("Sannu!", x, y)
"rubutaZane": "strokeText",
"haruffa": "font",                        // ctx.haruffa = "30px Arial"
"daidaitaRubutu": "textAlign",            // "center" | "left" | "right"
"tushenRubutu": "textBaseline",           // "middle" | "top" | "bottom"

// ── Images
"zanaHoto": "drawImage",                  // ctx.zanaHoto(hoto, x, y)
// with cropping: ctx.zanaHoto(hoto, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)

// ── Transformations (kids love this!)
"juya": "rotate",                         // ctx.juya(Lissafi.PI / 180 * 10)
"girma": "scale",                         // ctx.girma(1.5, 1.5)
"matsa": "translate",                     // ctx.matsa(100, 50)
"sake": "save",                           // ctx.sake()
"dawo": "restore",                        // ctx.dawo()

// ── Shadows (makes drawings look pro!)
"inuwa": "shadowColor",
"blurInuwa": "shadowBlur",
"matsaInuwaX": "shadowOffsetX",
"matsaInuwaY": "shadowOffsetY",

// ── Dashed lines (for games & maps)
"layiMaiYanki": "setLineDash",            // ctx.layiMaiYanki([10, 5])
"sauyanLayi": "lineDashOffset",

// ── Transparency
"bayyananne": "globalAlpha",              // ctx.bayyananne = 0.5

// ── Pixel-level (for advanced kids later)
"samoHotonPixel": "getImageData",
"sanyaHotonPixel": "putImageData",
"kirkiraHotonPixel": "createImageData",
"aunaRubutu": "measureText",              // ctx.aunaRubutu("Sannu!").width

// ── WEB AUDIO API – Ajami Hausa (perfect for games, Qur’an apps, talking bots) ──

"maiSauti": "AudioContext",                  // let sauti = sabo maiSauti()
"sakeSauti": "resume",                        // sauti.sakeSauti()
"dakataSauti": "suspend",                     // sauti.dakataSauti()
"rufeSauti": "close",                         // sauti.rufeSauti()

// Nodes (the building blocks)
"kaka": "createOscillator",                     // sauti.kaka()
"kakaSin": "sine",                            // type: "sine" → "kakaSin"
"kakaSquare": "square",
"kakaSaw": "sawtooth",
"kakaTriangle": "triangle",

"muryarFata": "createGain",                     // volume control
"karaMurya": "gain",                          // muryarFata.karaMurya.value = 0.5
"kara": "connect",                            // node.kara(anotherNode)
"fitar": "disconnect",

"maiKidayawa": "BiquadFilterNode",            // low-pass, high-pass, etc.
"taceBass": "lowpass",
"taceTreble": "highpass",
"taceMid": "bandpass",

"maikirkiraSauti": "AudioBufferSourceNode",   // for playing loaded sound files
"faraSauti": "start",                         // node.faraSauti()
"tsayaSauti": "stop",
"cigabaDaSauti":"resume",

"maikaraLokaci": "DelayNode",                 // echo!
"jinkiri": "delayTime",                       // node.jinkiri.value = 0.3

"maikwazo": "StereoPannerNode",               // left-right
"matsaHagu": "pan",                           // -1 = full left, +1 = full right

"maikirkiraDaHoto": "MediaElementAudioSourceNode",  // connect <audio> tag
"maikirkiraDaMic": "MediaStreamAudioSourceNode",    // use microphone

// Loading sounds (most common pattern for kids)
"samoSauti": "fetch",                         // samoSauti("buzu.mp3")
"sautiYaIso": "then",                         // .sautiYaIso(resp => resp.arrayBuffer())
"saukarDaSauti": "arrayBuffer",
"bayyanaSauti": "decodeAudioData",           // sauti.bayyanaSauti(buffer)

// Destination (speakers/headphone)
"lasifika": "destination",                    // sauti.lasifika

// AnalyserNode – for beautiful visualisers (kids go crazy for this)
"maiDubaSauti": "AnalyserNode",
"samoBayani": "getByteFrequencyData",
"samoBayaniNaLokaci": "getByteTimeDomainData",
"fftSize": "fftSize",                         // common, leave as-is or → "girmanDuba"

// ConvolverNode – reverb (masallaci effect!)
"maiSanyaSauti": "ConvolverNode",
"sautiNaMasallaci": "impulse",                // buffer with masjid reverb

//V2













// String Methods and Properties
"tsawo": "length",                    // Returns the length of a string
"mayarBabba": "toUpperCase",               // Converts all characters in the string to uppercase
"mayarKarami": "toLowerCase",              // Converts all characters in the string to lowercase
"zabiHarafinDake": "charAt",                     // Returns the character at a specified index
"zabiLambarHarafinDake": "charCodeAt",             // Returns the Unicode of the character at a specified index
"hade": "concat",                 // Joins two or more strings
"farawaDa": "startsWith",             // Checks if the string starts with specified characters
"karewaDa": "endsWith",               // Checks if the string ends with specified characters
"samoIndexNa": "indexOf",             // Returns the index of the first occurrence of a specified value
"samoIndexNaKarshe": "lastIndexOf",   // Returns the index of the last occurrence of a specified value
"canjaRubutu": "replace",       // Replaces specified value with a new value in the string
"yankoRubutu": "slice",                 // Extracts a part of a string and returns it as a new string
"rabaRubutu": "split",                      // Splits a string into an array of substrings
"cireFaragaDagaFarkonRubutu": "trim",                 // Removes whitespace from both ends of a string
"dakkoTsakaninRubutu": "substring",          // Extracts characters between two indices
"dakkoDagaTsakaninRubutu": "substr",                     // Extracts characters from a specified index for a specified length
"tambayaKoYaKunshe": "includes",      // Checks if the string contains specified characters
"samoRubutuDaidaiDa": "match",         // Finds matches based on a pattern
"nemoRubutuIrin": "search",          // Searches for a match and returns the index
"juyaZuwaRubutu": "toString",         // Converts an object to a string
"karaHarruffaAFarko": "padStart",               // Pads the start of a string with specified characters
"karaHarruffaAKarshe": "padEnd",                 // Pads the end of a string with specified characters
"samoRubutuDagaLamba": "fromCharCode", // Converts Unicode values to characters

"kima":"value",


//YORUBA
  // Control Structures
  "iṣẹ_": "function",
  "ti": "if",
  "yato": "else",
  "fun": "for",
  "nigbati": "while",
  "ṣe": "do",
  "iyipada": "switch",
  "padanu": "break",
  "tẹsiwaju": "continue",
  "daFọwọsi": "return",
  "gbiyanju": "try",
  "mu": "catch",
  "nikan": "finally",
  "tu": "throw",

  // Variable Declarations
  "aago": "const",
  "jé_": "let",
  "jẹ":"let",
  "iwon": "var",

  // Data Types & Values
  "otito": "true",
  "iro": "false",
  "aisi": "null",
  "koSi": "undefined",
  "NaN": "NaN",
  "infinie": "Infinity",

  // Functions and Methods
  "fihan": "console.log",
  "te": "console.log",
  "ko": "console.log",
  "document.getElementById": "document.getElementById",
  "document.querySelector": "document.querySelector",
  "document.querySelectorAll": "document.querySelectorAll",
  "ikilo": "alert",
  "ikede": "confirm",
  "ìbáṣepọ": "prompt",
  "fiIkọ́rọ́kọ́": "addEventListener",
  "fiIkoroko": "addEventListener",
  "yọIkọ́rọ́kọ́": "removeEventListener",

  // Class and Object
  "kíkọ́": "class",
  "akọ́kọ́": "constructor",
  "tẹ́siwaju": "extends",
  "gbà": "super",
  "ìyẹn": "this",
  "tuntun": "new",
  "ìṣee": "instanceof",

  // Import/Export
  "gẹgẹbi": "import",
  "tu": "export",
  "lati": "from",
  "gẹgẹbi": "as",

  // Graphics Mappings
  // Canvas and Context
  "canvas": "canvas",
  "contexte": "getContext",
  "contexte2D": "2d",

  // Drawing Methods
  "bẹrẹỌna": "beginPath",
  "lati": "moveTo",
  "si": "lineTo",
  "arc": "arc",
  "pẹlu": "fill",
  "tẹe": "stroke",
  "yoRect": "fillRect",
  "tẹRect": "strokeRect",
  "mimọRect": "clearRect",
  "yoImage": "drawImage",
  "yoTeksti": "fillText",
  "tẹTeksti": "strokeText",

  // Styles
  "aagoFill": "fillStyle",
  "aagoStroke": "strokeStyle",
  "iṣọkan": "lineWidth",
  "ipaLaini": "lineCap",

  // Transformations
  "yiyi": "translate",
  "yipo": "rotate",
  "wọnni": "scale",
  "fiTrans": "transform",
  "tunTrans": "resetTransform",

  // Image and Animation
  "Image": "Image",
  "beereAnimationFrame": "requestAnimationFrame",
  "fagileAnimationFrame": "cancelAnimationFrame",
  "animationFrame": "animationFrame",

  // Event Handling for Graphics
  "tẹCanvas": "click",
  "iweIṣẹlẹ": "mousemove",

  // Utilities
  "fipamọ": "save",
  "túnṣe": "restore",

  // Others
  "iru": "typeof",
  "padanuu": "instanceof",
  "pa": "delete",
  "koSi": "void",
  "yield": "yield",
  "async": "async",
  "await": "await",



   // Control Structures
  "ise": "function",
  "ti": "if",
  "yato": "else",
  "fun": "for",
  "nigbati": "while",
  "se": "do",
  "iyipada": "switch",
  "padanu": "break",
  "tesiwaju": "continue",
  "daFọwọsi": "return",
  "gbiyanju": "try",
  "mu": "catch",
  "nikan": "finally",
  "tu": "throw",

  // Variable Declarations
  "aago": "const",
  "je": "let",
  "iwon": "var",

  // Data Types & Values
  "otito": "true",
  "iro": "false",
  "aisi": "null",
  "koSi": "undefined",
  "NaN": "NaN",
  "infinie": "Infinity",

  // Functions and Methods
  "console.log": "console.log",
  "document.getElementById": "document.getElementById",
  "document.querySelector": "document.querySelector",
  "document.querySelectorAll": "document.querySelectorAll",
  "ikilo": "alert",
  "ikede": "confirm",
  "ibasepo": "prompt",
  "fiIkoroko": "addEventListener",
  "yọIkoroko": "removeEventListener",

  // Class and Object
  "kikoo": "class",
  "akokoo": "constructor",
  "tesiwaju": "extends",
  "gba": "super",
  "iyen": "this",
  "tuntun": "new",
  "isee": "instanceof",

  // Import/Export
  "gegebii": "import",
  "tu": "export",
  "lati": "from",
  "gegebi": "as",

  // Graphics Mappings
  // Canvas and Context
  "canvas": "canvas",
  "contexte": "getContext",
  "contexte2D": "2d",

  // Drawing Methods
  "bereOna": "beginPath",
  "lati": "moveTo",
  "si": "lineTo",
  "arc": "arc",
  "pẹlu": "fill",
  "peju": "fill",
  "tee": "stroke",
  "yoRect": "fillRect",
  "teRect": "strokeRect",
  "mimoRect": "clearRect",
  "yoImage": "drawImage",
  "yoTeksti": "fillText",
  "teTeksti": "strokeText",

  // Styles
  "aagoFill": "fillStyle",
  "aagoStroke": "strokeStyle",
  "isokan": "lineWidth",
  "ipaLaini": "lineCap",

  // Transformations
  "yiyi": "translate",
  "yipo": "rotate",
  "wonni": "scale",
  "fiTrans": "transform",
  "tunTrans": "resetTransform",

  // Image and Animation
  "Image": "Image",
  "beereAnimationFrame": "requestAnimationFrame",
  "fagileAnimationFrame": "cancelAnimationFrame",
  "animationFrame": "animationFrame",

  // Event Handling for Graphics
  "teCanvas": "click",
  "iweIselẹ": "mousemove",

  // Utilities
  "fipamọ": "save",
  "tunse": "restore",

  // Others
  "iru": "typeof",
  "padanuu": "instanceof",
  "pa": "delete",
  "koSi": "void",
  "yield": "yield",
  "async": "async",
  "await": "await",



       
  },




// String Mappings
stringMappings: {
"contexte2D": "2d",

//HAUSA
// Color Mappings
"shudi": "blue",         // Hausa for blue
"ja": "red",             // Hausa for red
"baki": "black",         // Hausa for black
"kore": "green",         // Hausa for green
"orange": "orange",      // Orange stays the same in both languages
"purple": "purple",      // Purple stays the same in both languages
"pinku": "pink",         // Hausa for pink (borrowed from English)
"rawaya": "yellow",      // Hausa for yellow
"fatsi fatsi": "yellow", // Yoruba for yellow (also used in Hausa)
"ruwan hoda": "cyan",    // Hausa for cyan
"hadi": "brown",         // Hausa for brown
"azurfa": "silver",      // Hausa for silver
"zinariya": "gold",      // Hausa for gold
"shudi mai haske": "light blue",  // Hausa for light blue
"ja mai haske": "light red",     // Hausa for light red
"shudi mai duhu": "dark blue",   // Hausa for dark blue
"ja mai duhu": "dark red",      // Hausa for dark red
"fari": "white",         // Hausa for white
"girma": "gray",         // Hausa for gray
"baki mai kyau": "charcoal",     // Hausa for charcoal
"marmara": "maroon",     // Hausa for maroon
"lilac": "lilac",         // Lilac stays the same in both languages


//Events
"latsa":"click",
"danni":"click",
"latsi":"click",
"dannawa":"click",
  "danna": "click",
  "dannaSauBiyu": "dblclick",
  "dannaLinzami": "mousedown",
  "sakiLinzami": "mouseup",
  "motsinLinzami": "mousemove",
  "shiganLinzami": "mouseenter",
  "fitarLinzami": "mouseleave",
  "matsaMaballi": "keydown",
  "sakiMaballi": "keyup",
  "dannaMaballi": "keypress",
  "mika": "submit",
  "canji": "change",
  "shigarwa": "input",
  "mayarDaHankali": "focus",
  "barinLura": "blur",
  "sakeSaiti": "reset",
  "dauko": "load",
  "ajiye": "unload",
  "canjaGirma": "resize",
  "gangarawa": "scroll",
  "kuskure": "error",
  "faraTabawa": "touchstart",
  "barTabawa": "touchend",
  "motsaTabawa": "touchmove",
  "fara mayar da hankali": "focusin",
  "kare mayar da hankali": "focusout",
  "janAbu": "drag",
  "sakarAbu": "drop",
  "kwaikwayi": "copy",
  "yanke": "cut",
  "lika": "paste",


//YORUBA
"contexte2D": "2d",
// Color Mappings
"bulu": "blue",
"pupa": "red",
"dudu": "black",
"alawọ ewe": "green",
"oyinbo": "orange",
"purple": "purple", // Yoruba equivalent if available
"pink": "pink",     // Yoruba equivalent if available
    }
  };
  