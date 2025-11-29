// src/mappings/igbo.js
// Igbo mappings – waiting for native speakers!
// Help us: https://github.com/dialectscript/core/issues
export const igbo = {
  keywordMappings: {
    // Core — waiting for community
    "ọbụrụna": "if",
    "maọbụghị": "else",
    "ọrụ": "function",
    "weghachi": "return",
    "nwalee": "try",
    "jide": "catch",
    "n’ikpeazụ": "finally",
    "tụfuo": "throw",
    "pụọ": "break",
    "gaaN’ihu": "continue",

    // Variables
    "ka": "let",
    "mgbeNiile": "const",
    "mgbanwe": "var",

    // Output
    "zipụta": "console.log",
    "kwuo": "console.log",
    "dọ̀tà": "alert",
    "jụọ": "prompt",
    "kwado": "confirm",
    "ọhụrụ": "new",
    "nkea": "this",

    // Loops
    "maka": "for",
    "mgbe": "while",
    "mee": "do",

    // DOM (keep English for now)
    "getElementById": "document.getElementById",
    "querySelector": "document.querySelector",
    "addEventListener": "addEventListener",

    // Keep modern concepts English
    "async": "async",
    "await": "await",
    "true": "true",
    "false": "false",
    "null": "null",

    // === NO-TONE / NO-DOT ALIASES (for phone typing) ===
    // These make the language actually usable on real devices
    "oburuna": "if",
    "maobughi": "else",
    "oru": "function",
    "ziputa": "console.log",        // ← works!
    "dota": "alert",
    "juo": "prompt",
    "ohuru": "new",
    "nkea": "this",                 // same
    "puo": "break",
    "gaaNihu": "continue",

    // Async & modern (keep English – everyone uses these words)
    "async": "async",
    "await": "await",
    "class": "class",
    "Promise": "Promise",

    // Canvas basics (future-ready)
    "bidoUzo": "beginPath",
    "gaa": "moveTo",
    "gaaLaini": "lineTo",
    "juputa": "fill",
    "see": "stroke",
    "rioAnimation": "requestAnimationFrame"
  },

  stringMappings: {
    "2d": "2d",
    "red": "ọbara",
    "blue": "anụnụ anụnụ",
    "green": "akwụkwọ ndụ",
    "black": "ojii",
    "white": "ọcha"
  }
};