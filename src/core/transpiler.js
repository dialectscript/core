// transpiler.js

/**
 * Load language mappings.
 * @param {string} language - The language to load mappings for.
 * @returns {Object|null} - The mappings object or null if failed to load.
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
      console.log(`Replaced member expression: ${customKeyword} -> ${jsEquivalent}`);
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
      console.log(`Replaced keyword: ${match} -> ${replacement}`);
      return replacement;
    });
  }

  // Restore strings with string mappings
  code = code.replace(/__STRING_(\d+)__/gu, (match, index) => { // Added 'u' flag
    let str = strings[index];
    // Remove the surrounding quotes
    const quote = str[0];
    let innerStr = str.slice(1, -1);

    console.log(`Original string: ${innerStr}`);

    // Apply string mappings
    Object.keys(stringMap).forEach(key => {
      const value = stringMap[key];
      // Replace all occurrences of key with value
      const regex = new RegExp(key, 'gu'); // Added 'u' flag
      if (regex.test(innerStr)) {
        console.log(`Replacing string segment: "${key}" -> "${value}"`);
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
    console.log(`Replaced DOMContentLoaded listener for: ${functionName}`);
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
 * Execute JavaScript code dynamically.
 * @param {string} jsCode - The JavaScript code to execute.
 * @param {string} originalCode - The original custom script code (for debugging).
 */
function executeJS(jsCode, originalCode) {
  try {
    // For debugging: log the transpiled code
    console.log('Transpiled Code:', jsCode);

    new Function(jsCode)();
  } catch (error) {
    console.error('Error executing transpiled JavaScript:', error);
    console.error('Original Code:', originalCode);
  }
}

/**
 * Process all custom scripts in the document.
 */
async function processCustomScripts_() {
  const customScripts = document.querySelectorAll('script[type="custom-js"]');

  for (const script of customScripts) {
    const language = script.getAttribute('data-language').toLowerCase();
    const mappings = await loadMappings(language);

    if (!mappings) {
      console.error(`No mappings found for language: ${language}`);
      continue;
    }

    const { keywordMappings, stringMappings } = mappings;

    const customCode = script.textContent;
    const transpiledCode = transpileCode(customCode, keywordMappings, stringMappings);
    
    // Execute the transpiled JavaScript code
    executeJS(transpiledCode, customCode);
  }
}


/**
 * Process all custom scripts in the document.
 */
async function processCustomScripts() {
  const customScripts = document.querySelectorAll('script[type="custom-js"]');

  for (const script of customScripts) {
    const language = script.getAttribute('data-language').toLowerCase();
    const mappings = await loadMappings(language);

    if (!mappings) {
      console.error(`No mappings found for language: ${language}`);
      continue;
    }

    const { keywordMappings, stringMappings } = mappings;

    // Check if the script has a 'src' attribute
    const src = script.getAttribute('src');
    
    let customCode = '';

    if (src) {
      // Fetch external file content
      console.log('External');
      try {
        const response = await fetch(src);
        if (!response.ok) throw new Error(`Failed to load script: ${src}`);
        customCode = await response.text();
      } catch (error) {
        console.error(error.message);
        continue;
      }
    } else {
      // Use inline script content
      console.log('Inline');
      customCode = script.textContent;
    }

    const transpiledCode = transpileCode(customCode, keywordMappings, stringMappings);

    // Execute the transpiled JavaScript code
    executeJS(transpiledCode, customCode);
  }
}


// Run the processing after the DOM is fully loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', processCustomScripts);
} else {
  processCustomScripts();
}
