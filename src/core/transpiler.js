// transpiler.js
/**
 * Normalize Nigerian language input – removes diacritics & fixes common phone typing
 * Works for Yorùbá, Igbo, Hausa
 */
function normalizeNigerianText(text) {
  return text
    // Yorùbá
    .replace(/[ẹẸ]/gi, 'e')
    .replace(/[ọỌ]/gi, 'o')
    .replace(/[ṣṢ]/gi, 's')
    .replace(/sh/gi, 'ṣ')        // many type "sh" instead of ṣ
    .replace(/[áàā]/gi, 'a')
    .replace(/[éèē]/gi, 'e')
    .replace(/[íìī]/gi, 'i')
    .replace(/[óòō]/gi, 'o')
    .replace(/[úùū]/gi, 'u')
    .replace(/[ńǹṇ]/gi, 'n')

    // Igbo
    .replace(/[ịị]/gi, 'i')
    .replace(/[ụụ]/gi, 'u')
    .replace(/[ụ]/gi, 'u')
    .replace(/[ọỌ]/gi, 'o')
    .replace(/[ẹẸ]/gi, 'e')
    .replace(/[ṅṄṅ́ǹ]/gi, 'n')

    // Hausa (hooked letters)
    .replace(/[ɓƁ]/gi, 'b')
    .replace(/[ɗƊ]/gi, 'd')
    .replace(/[ƙƘ]/gi, 'k')
    .replace(/['’]/g, '')       // remove apostrophes in words like ƙarya → karya

    .trim();
}

/**
 * Load language mappings.
 */
async function loadMappings(language) {
  try {
    const module = await import(`../mappings/${language}.js`);
    console.log(`Loaded mappings for language: ${language}`, module[language]);
    return module[language];
  } catch (error) {
    console.error(`Failed to load mappings for language: ${language}`, error);
    return null;
  }
}

/**
 * Transpile custom script code to JavaScript.
 */
function transpileCode(code, keywordMap, stringMap, language = '') {
  // Normalize input for Nigerian languages – kids can type without tone marks!
  if (['hausa', 'yoruba', 'igbo', 'pidgin','alldialects'].includes(language.toLowerCase())) {
    code = normalizeNigerianText(code);
  }

  const stringRegex = /(['"`])(\\?.)*?\1/gu;
  const commentRegex = /(\/\/.*$)|(\/\*[\s\S]*?\*\/)/gum;

  const strings = [];
  const comments = [];

  // Replace strings
  code = code.replace(stringRegex, (match) => {
    strings.push(match);
    return `__STRING_${strings.length - 1}__`;
  });

  // Replace comments
  code = code.replace(commentRegex, (match) => {
    comments.push(match);
    return `__COMMENT_${comments.length - 1}__`;
  });

  // Member expressions (e.g., document.getElementById)
  Object.keys(keywordMap).forEach(customKeyword => {
    const jsEquivalent = keywordMap[customKeyword];
    if (customKeyword.includes('.')) {
      const [object, property] = customKeyword.split('.');
      const [jsObject, jsProperty] = jsEquivalent.split('.');
      const memberRegex = new RegExp(`\\b${object}\\.(${property})\\b`, 'gu');
      code = code.replace(memberRegex, `${jsObject}.${jsProperty}`);
    }
  });

  // Regular keywords – longest first
  const nonMemberKeywords = Object.keys(keywordMap)
    .filter(k => !k.includes('.'))
    .sort((a, b) => b.length - a.length);

  if (nonMemberKeywords.length > 0) {
    const escaped = nonMemberKeywords.map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    const pattern = new RegExp(`\\b(${escaped.join('|')})\\b`, 'gu');
    code = code.replace(pattern, (match) => keywordMap[match] || match);
  }

  // Restore strings + apply string mappings
  code = code.replace(/__STRING_(\d+)__/gu, (match, index) => {
    let str = strings[index];
    const quote = str[0];
    let inner = str.slice(1, -1);

    Object.keys(stringMap).forEach(key => {
      const value = stringMap[key];
      const regex = new RegExp(key, 'gu');
      if (regex.test(inner)) {
        inner = inner.replace(regex, value);
      }
    });

    return `${quote}${inner}${quote}`;
  });

  // Restore comments
  code = code.replace(/__COMMENT_(\d+)__/gu, (match, index) => comments[index]);

  // DOMContentLoaded fix
  const domRegex = /addEventListener\s*\(\s*['"]DOMContentLoaded['"]\s*,\s*(\w+)\s*\)/gu;
  code = code.replace(domRegex, (match, fn) => `
if (document.readyState === 'loading') {
  addEventListener('DOMContentLoaded', ${fn});
} else {
  ${fn}();
}`);

  return code;
}

function executeJS(jsCode, originalCode) {
  try {
    console.log('Transpiled Code:', jsCode);
    new Function(jsCode)();
  } catch (error) {
    console.error('Error executing transpiled JavaScript:', error);
    console.error('Original Code:', originalCode);
  }
}

async function processCustomScripts() {
  const customScripts = document.querySelectorAll('script[type="custom-js"]');

  for (const script of customScripts) {
    let language = script.getAttribute('data-language') || 'hausa';
    language = language.toLowerCase();

    const mappings = await loadMappings(language);
    if (!mappings) {
      console.error(`No mappings found for language: ${language}`);
      continue;
    }

    const { keywordMappings, stringMappings } = mappings;

    let customCode = '';
    const src = script.getAttribute('src');
    if (src) {
      try {
        const response = await fetch(src);
        if (!response.ok) throw new Error(`Failed to load: ${src}`);
        customCode = await response.text();
      } catch (e) {
        console.error(e.message);
        continue;
      }
    } else {
      customCode = script.textContent;
    }

    const transpiledCode = transpileCode(customCode, keywordMappings, stringMappings, language);
    executeJS(transpiledCode, customCode);
  }
}

// Run on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', processCustomScripts);
} else {
  processCustomScripts();
}