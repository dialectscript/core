function compareAST(userAst, solutionAst) {
  // Remove all comments first
  const stripComments = (node) => {
    if (node.type === "Program") {
      node.body = node.body.filter(n => n.type !== "EmptyStatement");
    }
    delete node.start; delete node.end; delete node.loc;
    if (node.leadingComments) delete node.leadingComments;
    if (node.trailingComments) delete node.trailingComments;
    return node;
  };

  // Deep compare with flexibility
  function eq(a, b) {
    if (a === b) return true;
    if (!a || !b || typeof a !== typeof b) return false;
    if (a.type !== b.type) return false;

    switch (a.type) {
      case "Program":
        return a.body.length >= b.body.length &&
          b.body.every((sb, i) => eq(a.body[i], sb));

      case "ExpressionStatement":
        return eq(a.expression, b.expression);

      case "BinaryExpression":
        return a.operator === b.operator &&
          eq(a.left, b.left) &&
          eq(a.right, b.right);

      case "AssignmentExpression":
        return a.operator === b.operator &&
          eq(a.left, b.left) &&
          eq(a.right, b.right);

      case "UpdateExpression":
        return a.operator === b.operator &&
          a.prefix === b.prefix &&
          eq(a.argument, b.argument);



      case "UnaryExpression":           // -x, +x, !x, typeof x, etc.
        return a.operator === b.operator &&
          a.prefix === b.prefix &&
          eq(a.argument, b.argument);

      case "CallExpression":
        return eq(a.callee, b.callee) &&
          a.arguments.length === b.arguments.length &&
          a.arguments.every((arg, i) => eq(arg, b.arguments[i]));

      case "MemberExpression":
        return eq(a.object, b.object) &&
          a.property.type === b.property.type &&
          a.property.name === b.property.name;

      case "Literal":
        return a.value === b.value;

      case "Identifier":
        return a.name === b.name;

      case "VariableDeclaration":
        // Allow let/const/var interchange if solution uses one
        const kinds = ['let', 'const', 'var'];
        return kinds.includes(a.kind) && kinds.includes(b.kind) &&
          a.declarations.length === b.declarations.length &&
          a.declarations.every((d, i) => eq(d, b.declarations[i]));

      case "VariableDeclarator":
        return eq(a.init, b.init) && eq(a.id, b.id);




      case "TemplateLiteral":
        return a.quasis.every((q, i) =>
          q.value.raw === b.quasis[i].value.raw &&
          q.value.cooked === b.quasis[i].value.cooked &&
          q.tail === b.quasis[i].tail) &&
          a.expressions.length === b.expressions.length &&
          a.expressions.every((e, i) => eq(e, b.expressions[i]));

      case "TemplateElement":
        // Usually not needed because we compare quasis above via .value.raw
        return a.value.raw === b.value.raw &&
          a.value.cooked === b.value.cooked &&
          a.tail === b.tail;

      case "ArrowFunctionExpression":
        return a.async === b.async &&
          a.generator === b.generator &&
          paramsEqual(a.params, b.params) &&
          eq(a.body, b.body);

      case "FunctionExpression":        // also covers regular functions
        return a.async === b.async &&
          a.generator === b.generator &&
          paramsEqual(a.params, b.params) &&
          eq(a.body, b.body);

      case "BlockStatement":
        if (!Array.isArray(a.body) || !Array.isArray(b.body)) return false;
        if (a.body.length !== b.body.length) return false;
        return a.body.every((stmt, i) => eq(stmt, b.body[i]));

      case "ReturnStatement":
        return (!a.argument && !b.argument) ||
          (a.argument && b.argument && eq(a.argument, b.argument));

      case "ArrayExpression":
        return a.elements.length === b.elements.length &&
          a.elements.every((el, i) =>
            (el === null && b.elements[i] === null) || // holes
            eq(el, b.elements[i]));

      case "ObjectExpression":
        return a.properties.length === b.properties.length &&
          a.properties.every((p, i) => eq(p, b.properties[i]));

      case "Property":
        return a.kind === b.kind &&
          a.computed === b.computed &&
          eq(a.key, b.key) &&
          eq(a.value, b.value);

      case "IfStatement":
        return eq(a.test, b.test) &&
          eq(a.consequent, b.consequent) &&
          (!a.alternate && !b.alternate || eq(a.alternate, b.alternate));





      default:
        return false;
    }
  }

  const cleanUser = JSON.parse(JSON.stringify(userAst, (k, v) => stripComments(v) || v));
  const cleanSolution = JSON.parse(JSON.stringify(solutionAst, (k, v) => stripComments(v) || v));

  const match = eq(cleanUser, cleanSolution);

  // Optional: smarter hints
  if (!match && solutionAst.body.some(n => n.type === "ExpressionStatement" &&
    n.expression.type === "CallExpression" &&
    n.expression.callee.name === "console")) {
    return { match: false, hint: "Did you use console.log() with the correct message?" };
  }

  return { match, hint: null };
}



function checkTasks_with_regex(userCode, solutionCode) {
  // 1. Ultra-smart normalization
  const normalize = (code) => {
    return code
      .replace(/\/\/.*|\/\*[\s\S]*?\*\//g, '')     // Remove all comments
      .replace(/['"`]use strict['"`];?/g, '')      // Remove "use strict"
      .replace(/\s+/g, ' ')                        // Collapse whitespace
      .replace(/ ?\([^)]*\) ?/g, '()')              // Normalize function calls
      .replace(/ ?\{ ?/g, '{').replace(/ ?\} ?/g, '}') // Clean braces
      .replace(/ ?\( ?/g, '(').replace(/ ?\) ?/g, ')') // Clean parens
      .replace(/ ?; ?/g, ';')                      // Clean semicolons
      .replace(/ ?, ?/g, ',')                      // Clean commas
      .trim();
  };

  const user = normalize(userCode);
  const solution = normalize(solutionCode);

  // 2. Early exact match (catches 80% of cases)
  if (user === solution) return { passed: true, message_key: "Perfect!" };

  // 3. Smart fallback checks (in order of frequency)

  // Case 1: console.log with same content (string concat vs template)
  if (solution.includes('console.log')) {
    const userLogs = [...user.matchAll(/console\.log\(([^)]+)\)/g)].map(m => m[1].trim());
    const solLogs = [...solution.matchAll(/console\.log\(([^)]+)\)/g)].map(m => m[1].trim());

    const normalizeLog = (s) => s
      .replace(/\s+/g, '')
      .replace(/\+/g, '')
      .replace(/["'`]/g, '')
      .replace(/\${([^}]+)}/g, '$1')
      .replace(/\((\w+)\)/g, '$1');

    const userValues = userLogs.map(normalizeLog);
    const solValues = solLogs.map(normalizeLog);

    if (userValues.length >= solValues.length &&
      solValues.every(v => userValues.some(uv => uv === v || uv.includes(v) || v.includes(uv)))) {
      return { passed: true, message_key: "Great! Output is correct." };
    }
  }

  // Case 2: Variable declarations (let/const/var interchangeable)
  if (/(let|const|var)\s/.test(solution)) {
    const userDecl = user.match(/(let|const|var)\s+(\w+)\s*=/) || [];
    const solDecl = solution.match(/(let|const|var)\s+(\w+)\s*=/) || [];

    if (userDecl[2] && solDecl[2]) {
      const userRest = user.replace(/(let|const|var)\s+\w+\s*=\s*/, 'VAR = ');
      const solRest = solution.replace(/(let|const|var)\s+\w+\s*=\s*/, 'VAR = ');
      if (normalize(userRest) === normalize(solRest)) {
        return { passed: true, message_key: "Correct! Variable kind doesn't matter." };
      }
    }
  }

  // Case 3: Loops (for/while) - structure match
  if (solution.includes('for') || solution.includes('while')) {
    const loopPattern = /(for|while)\s*\([^;]+;[^;]+;[^)]+\)\s*{[^}]*console\.log\([^i][^)]*\)[^}]*}/;
    const userHasLoop = loopPattern.test(user);
    const solHasLoop = loopPattern.test(solution);

    if (userHasLoop && solHasLoop) {
      // Very likely correct
      return { passed: true, message_key: "Loop structure looks good!" };
    }
  }

  // Case 4: Function definition (ignore name, allow arrow vs function)
  if (solution.includes('function') || solution.includes('=>')) {
    const userFunc = user.match(/(function\s+\w+|const\s+\w+\s*=|\w+\s*=)\s*\(?[^)]*\)?\s*=?>?/) || [];
    const solFunc = solution.match(/(function\s+\w+|const\s+\w+\s*=|\w+\s*=)\s*\(?[^)]*\)?\s*=?>?/) || [];

    if (userFunc[0] && solFunc[0]) {
      const userBody = user.split('{')[1]?.split('}')[0] || '';
      const solBody = solution.split('{')[1]?.split('}')[0] || '';
      if (normalize(userBody).includes(normalize(solBody)) ||
        normalize(solBody).includes(normalize(userBody))) {
        return { passed: true, message_key: "Function logic is correct!" };
      }
    }
  }

  // Final: Give helpful message
  return {
    passed: false,
    message_key: "Almost there! Check quotes, semicolons, or variable names."
  };
}

function checkTasks_with_AST_JS(code, solution_key, current_lesson_translations) {

    return checkTasks_(code, solution_key, current_lesson_translations);

  const solutionKey = solution_key;
  if (!solutionKey) return { passed: false, message_key: "No solution defined." };

  const expectedCode = current_lesson_translations[solutionKey];

  try {
    if (expectedCode === '') {
      return { passed: true, message_key: '' };
    }

    const userAst = acorn.parse(code, { ecmaVersion: 2022, sourceType: "script" });
    const solutionAst = acorn.parse(expectedCode, { ecmaVersion: 2022, sourceType: "script" });

    let result;
    try {
      result = compareAST(userAst, solutionAst);
    } catch (e) {
      console.error("compareAST threw an error:", e);
      // Safely degrade instead of crashing the whole validator
      result = { match: false, hint: "Internal validator error – using fallback check" };
    }

    // If AST comparison failed (or threw), try regex as fallback
    if (!result.match) {
      const result_regex = checkTasks_with_regex(code, expectedCode);
      if (result_regex.passed) {
        return result_regex; // regex says it's correct → trust it
      }
    }

    // Final result
    return {
      passed: result.match,
      message_key: result.match
        ? "Perfect! Excellent work!"
        : (result.hint || "Almost — check your code structure.")
    };

  } catch (e) {
    // Only reaches here on actual syntax errors (Acorn parse failures)
    console.error("Syntax error in user code:", e);
    return { passed: false, message_key: "Syntax error in your code." };
  }
}

function checkTasks_with_AST_AJAMI(code, solution_key, current_lesson_translations) {

  return checkTasks_(code, solution_key, current_lesson_translations);
  
  const solutionKey = solution_key;
  if (!solutionKey) return { passed: false, message_key: "No solution defined." };

  const expectedCode = current_lesson_translations[solutionKey];

  try {
    if (expectedCode === '') {
      return { passed: true, message_key: '' };
    }

    const userAst = acorn.parse(code, { ecmaVersion: 2022, sourceType: "script" });
    const solutionAst = acorn.parse(expectedCode, { ecmaVersion: 2022, sourceType: "script" });

    let result;
    try {
      result = compareAST(userAst, solutionAst);
    } catch (e) {
      console.error("compareAST threw an error:", e);
      // Safely degrade instead of crashing the whole validator
      result = { match: false, hint: "Internal validator error – using fallback check" };
    }

    // If AST comparison failed (or threw), try regex as fallback
    if (!result.match) {
      const result_regex = checkTasks_with_regex(code, expectedCode);
      if (result_regex.passed) {
        return result_regex; // regex says it's correct → trust it
      }
    }

    // Final result
    return {
      passed: result.match,
      message_key: result.match
        ? "Perfect! Excellent work!"
        : (result.hint || "Almost — check your code structure.")
    };

  } catch (e) {
    // Only reaches here on actual syntax errors (Acorn parse failures)
    console.error("Syntax error in user code:", e);
    return { passed: false, message_key: "Syntax error in your codex.", code: code };
  }
}


function checkTasks_ (code, solution_key, current_lesson_translations) {

  const solutionKey = solution_key;
  if (!solutionKey) return { passed: false, message_key: "No solution defined." };

  const expectedCode = current_lesson_translations[solutionKey];

  const solutionCode =expectedCode;
  const userCode = code;

  try {
    if (solutionCode === '') {
      return { passed: true, message_key: '' };
    }


   //let result = remove_line_breaks_and_normalize_whitespace(userCode, solutionCode);
   let result = remove_line_breaks(userCode, solutionCode);
   
  // Final result
    return {
      passed: result,
      message_key: result
        ? "Perfect! Excellent work!"
        : (result.hint || "Almost — check your code structure.")
    };

  } catch (e) {
    // Only reaches here on actual syntax errors (Acorn parse failures)
    console.error("Syntax error in user code:", e);
    return { passed: false, message_key: "Syntax error in your codex." };
  }
}



function remove_line_breaks_and_normalize_whitespace(userCode, solutionCode) {
  // Remove line breaks and normalize whitespace
  const normalize = str =>
    str.replace(/\s+/g, ""); // strips all whitespace, including newlines

  const user = normalize(userCode);
  const solution = normalize(solutionCode);

  return user.includes(solution);
}

function remove_line_breaks(userCode, solutionCode) {
  const stripLineBreaks = str =>
    str.replace(/(\r\n|\n|\r)/g, "");

  const user = stripLineBreaks(userCode);
  const solution = stripLineBreaks(solutionCode);

  return user.includes(solution);
}


/***checkTasks_(userJS, solutionJS, {
  removeLineBreaks: true,
  removeAllWhitespace: false,
  removeComments: true
});
 */
function remove_line_breaks_and_normalize_whitespace_ignore_comments(userCode, solutionCode, options = {}) {
  const {
    removeLineBreaks = true,
    removeAllWhitespace = false,
    removeComments = false
  } = options;

  const preprocess = (str) => {
    let out = str;

    // Remove JS comments
    if (removeComments) {
      // remove /* ... */ comments
      out = out.replace(/\/\*[\s\S]*?\*\//g, "");
      // remove // comments
      out = out.replace(/\/\/.*$/gm, "");
    }

    // Remove line breaks
    if (removeLineBreaks) {
      out = out.replace(/(\r\n|\n|\r)/g, "");
    }

    // Remove ALL whitespace
    if (removeAllWhitespace) {
      out = out.replace(/\s+/g, "");
    }

    return out;
  };

  const user = preprocess(userCode);
  const solution = preprocess(solutionCode);

  return user.includes(solution);
}








function paramsEqual(aParams, bParams) {
  if (aParams.length !== bParams.length) return false;
  return aParams.every((p, i) => eq(p, bParams[i]));
}
/*
console.log(`Sum: ${15 + 25}`);                    // TemplateLiteral
const add = (a, b) => a + b;                        // ArrowFunctionExpression
const total = () => 15 + 25;                       // Arrow + Block-less return
function sum(a, b) { return a + b; }               // FunctionExpression
console.log([15, 25, 15 + 25]);                     // ArrayExpression
console.log({ result: 15 + 25 });                  // ObjectExpression

*/