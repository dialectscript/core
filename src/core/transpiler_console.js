// transpiler.js

/**
 * Load language mappings.
 * @param {string} language - The language to load mappings for.
 * @returns {Object|null} - The mappings object or null if failed to load.
 */
async function loadMappings(language) {
  try {
    const module = await import(`./mappings/${language}.js`);
    //debug:console.log(`Loaded mappings for language: ${language}`, module[language]);
    return module[language];
  } catch (error) {
    //debug:console.error(`Failed to load mappings for language: ${language}`, error);
    return null;
  }
}

/**
 * Transpile custom script code to JavaScript.
 * @param {string} code - The source code in the custom language.
 * @param {Object} keywordMap - The keyword mapping for the specified language.
 * @param {Object} stringMap - The string mapping for the specified language.
 * @returns {string} - The transpiled JavaScript code.
 */
function transpileCode(code, keywordMap, stringMap) {
  // Regex patterns to identify strings and comments
  const stringRegex = /(['"`])(\\?.)*?\1/gu; // Added 'u' flag for Unicode
  const commentRegex = /(\/\/.*$)|(\/\*[\s\S]*?\*\/)/gum; // Added 'u' flag

  // Store all strings and comments
  const strings = [];
  const comments = [];

  // Replace strings with placeholders
  code = code.replace(stringRegex, (match) => {
    strings.push(match);
    return `__STRING_${strings.length - 1}__`;
  });

  // Replace comments with placeholders
  code = code.replace(commentRegex, (match) => {
    comments.push(match);
    return `__COMMENT_${comments.length - 1}__`;
  });

  // First, replace member expressions
  Object.keys(keywordMap).forEach(customKeyword => {
    const jsEquivalent = keywordMap[customKeyword];
    
    // Handle member expressions with dot notation
    if (customKeyword.includes('.')) {
      const [object, property] = customKeyword.split('.');
      const [jsObject, jsProperty] = jsEquivalent.split('.');
      const memberRegex = new RegExp(`\\b${object}\\.(${property})\\b`, 'gu'); // Added 'u' flag
      code = code.replace(memberRegex, `${jsObject}.${jsProperty}`);
      //debug:console.log(`Replaced member expression: ${customKeyword} -> ${jsEquivalent}`);
    }
  });

  // Then, replace other keywords
  const nonMemberKeywords = Object.keys(keywordMap).filter(k => !k.includes('.'));
  if (nonMemberKeywords.length > 0) {
    // Sort keywords by length in descending order to prevent partial replacements
    nonMemberKeywords.sort((a, b) => b.length - a.length);
    
    // Escape special regex characters in keywords
    const escapedKeywords = nonMemberKeywords.map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));

    const pattern = new RegExp(`\\b(${escapedKeywords.join('|')})\\b`, 'gu'); // Added 'u' flag
    code = code.replace(pattern, (match) => {
      const replacement = keywordMap[match] || match;
      //debug:console.log(`Replaced keyword: ${match} -> ${replacement}`);
      return replacement;
    });
  }

  // Restore strings with string mappings
  code = code.replace(/__STRING_(\d+)__/gu, (match, index) => { // Added 'u' flag
    let str = strings[index];
    // Remove the surrounding quotes
    const quote = str[0];
    let innerStr = str.slice(1, -1);

    //debug:console.log(`Original string: ${innerStr}`);

    // Apply string mappings
    Object.keys(stringMap).forEach(key => {
      const value = stringMap[key];
      // Replace all occurrences of key with value
      const regex = new RegExp(key, 'gu'); // Added 'u' flag
      if (regex.test(innerStr)) {
        //debug:console.log(`Replacing string segment: "${key}" -> "${value}"`);
        innerStr = innerStr.replace(regex, value);
      }
    });

    console.log(`Transformed string: ${innerStr}`);

    // Re-wrap the string with the original quotes
    return `${quote}${innerStr}${quote}`;
  });

  // Restore comments
  code = code.replace(/__COMMENT_(\d+)__/gu, (match, index) => comments[index]); // Added 'u' flag

  // Now, handle the DOMContentLoaded event listeners
  // Replace: addEventListener('DOMContentLoaded', functionName);
  // With:
  // if (document.readyState === 'loading') {
  //   addEventListener('DOMContentLoaded', functionName);
  // } else {
  //   functionName();
  // }

  const domContentLoadedRegex = /addEventListener\s*\(\s*['"]DOMContentLoaded['"]\s*,\s*(\w+)\s*\)/gu; // Added 'u' flag
  code = code.replace(domContentLoadedRegex, (match, functionName) => {
    //debug:console.log(`Replaced DOMContentLoaded listener for: ${functionName}`);
    return `
if (document.readyState === 'loading') {
  addEventListener('DOMContentLoaded', ${functionName});
} else {
  ${functionName}();
}`;
  });

  return code;
}

/**
 * Process all custom scripts in the document.
 */
async function processCustomScripts(customCode) {
  //const customScripts = document.querySelectorAll('script[type="custom-js"]');

  //for (const script of customScripts) {
    const language = 'yoruba';// script.getAttribute('data-language').toLowerCase();
    const mappings = await loadMappings(language);

    if (!mappings) {
      //debug:console.error(`No mappings found for language: ${language}`);
      //continue;
    }

    const { keywordMappings, stringMappings } = mappings;

    //alert('transpillllllllll');
    
    const transpiledCode = transpileCode(customCode, keywordMappings, stringMappings);
    
    return transpiledCode;

  //}
}


/**
 * Process all custom scripts in the document.
 */
window.transpileAjami = async function (customCode) {
  //const customScripts = document.querySelectorAll('script[type="custom-js"]');

  //for (const script of customScripts) {
    const language = 'alldialects';// script.getAttribute('data-language').toLowerCase();
    const mappings = await loadMappings(language);

    if (!mappings) {
      //debug:console.error(`No mappings found for language: ${language}`);
      //continue;
      return `No mappings found for language: ${language}`;
    }

    const { keywordMappings, stringMappings } = mappings;
    
    const transpiledCode = transpileCode(customCode, keywordMappings, stringMappings);
    
    return transpiledCode;

  //}
}