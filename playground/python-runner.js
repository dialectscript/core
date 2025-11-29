// python-runner.js (Web Worker Script - FINAL VERSION)

importScripts('https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js');

let pyodide;
const pyodideReadyPromise = loadPyodideAndPackages();

async function loadPyodideAndPackages() {
    pyodide = await loadPyodide();
    console.log("Pyodide fully initialized in worker thread.");
}

self.onmessage = async (event) => {
    await pyodideReadyPromise;

    const { pythonCode, checkerFunction } = event.data;
    let result = { passed: false, stdout: "", stderr: "", error: null, validation: { passed: false, message_key: "" } };
    
    // 1. Setup Python Environment and Checker Logic
    // This string defines the helper functions Python will use to validate the code.
   const validationHelpers = `
import sys
import io
import re
import json

sys.stdout = io.StringIO()
sys.stderr = io.StringIO()

def checkTask1_py(code):
    return {"passed": len(code.strip()) > 10, "message_key": "CHECKER_SUCCESS" if len(code.strip()) > 10 else "Write more code!"}

def checkTask2_py(code):
    # Remove comments and normalize whitespace for reliable matching
    lines = [line.split('#', 1)[0].rstrip() for line in code.splitlines() if line.strip()]
    full_code = ' '.join(lines)
    
    # Better regex: allows any whitespace, indentation, and captures variable name safely
    has_for_loop = bool(re.search(r'for\\s+\\w+\\s+in\\s+\\w+\\s*:', code, re.IGNORECASE))
    
    # More flexible: matches total_price += anything (even with spaces)
    has_update = bool(re.search(r'total_price\\s*\\+=', code))
    
    if not has_for_loop:
        return {"passed": False, "message_key": "CHECKER_ERROR_NO_FOR_LOOP"}
    if not has_update:
        return {"passed": False, "message_key": "CHECKER_ERROR_NO_UPDATE"}
    
    return {"passed": True, "message_key": "CHECKER_SUCCESS"}

CHECKER_MAP = {
    "checkTask1": checkTask1_py,
    "checkTask2": checkTask2_py
}
`;

    // 2. Prepare the Code for Execution
    const fullScript = validationHelpers + `\n\n# --- USER CODE EXECUTION ---\n` + pythonCode;
    
    try {
        // Execute the full script (defines checkers + runs user code)
        pyodide.runPython(fullScript);
        
        // 3. Run the Specific Checker Function
        // We look up the function based on the name passed from the main thread
        const checkerFunc = pyodide.globals.get("CHECKER_MAP").get(checkerFunction);

        if (checkerFunc) {
            // Call the Python checker function and get the validation result
            let validationResult = pyodide.runPython(`json.dumps(CHECKER_MAP['${checkerFunction}']("""${pythonCode.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"""))`);
            result.validation = JSON.parse(validationResult);
        }

        // 4. Capture STDOUT/STDERR after execution
        result.stdout = pyodide.globals.get('sys').stdout.getvalue() || "";
        result.stderr = pyodide.globals.get('sys').stderr.getvalue() || "";
        result.passed = true; // Execution successful (not validation, just that Python didn't crash)

    } catch (e) {
        // 5. Handle Execution Failure (Python syntax error, etc.)
        result.passed = false;
        result.stderr = `${result.stderr}\n${e.message || String(e)}`;
        result.error = true;
    }

    // 6. Send results (Output and Validation Status) back to the main thread
    self.postMessage(result);
};

// python-runner.js (Add this to the end of the file)

// Handles fatal errors within the Worker thread itself
self.onerror = (e) => {
    // Send a message back to the main thread with the error details
    self.postMessage({ 
        stdout: "", 
        stderr: `FATAL WORKER ERROR: ${e.message}. Check browser console for network issues.`, 
        error: true, 
        validation: { passed: false, message_key: "WORKER_FATAL_ERROR" }
    });
    console.error("Pyodide Worker Error:", e);
};

/*
// python-runner.js (Web Worker Script)

// 1. Initialize Pyodide
importScripts('https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js');

let pyodide;

async function loadPyodideAndPackages() {
    pyodide = await loadPyodide();
    // Pre-load any necessary Python packages here if needed, e.g. await pyodide.loadPackage("pandas");
    console.log("Pyodide loaded in worker thread.");
}

// 2. Wait for initialization before accepting commands
const pyodideReadyPromise = loadPyodideAndPackages();

// 3. Listener for commands from the main thread
self.onmessage = async (event) => {
    await pyodideReadyPromise; // Ensure Pyodide is loaded before running code

    const { pythonCode, checkerFunction } = event.data;
    let result = { passed: false, stdout: "", stderr: "", error: null };
    
    // --- Prepend Code for Checker Context ---
    // We inject the checker logic and the user's code into one script.
    // The Python checker function MUST exist in the global scope for the user's code to run against it.
    const fullScript = `
import sys
import io

# Setup stdout capture
sys.stdout = io.StringIO()
sys.stderr = io.StringIO()

# --- THE USER'S CODE ---
${pythonCode}

# --- THE CHECKER LOGIC ---
# In this advanced step, the checker function name from the JSON (e.g., 'checkTask2')
# is now used as the name of the Python function to call.
# This is where we run tests against the user's environment.
# Since we are focusing on execution first, we'll simply execute and capture output.

# We will rely on the main thread to still evaluate the task using the regex for now,
# but now we have real output!

# Capture STDOUT/STDERR after execution
stdout_output = sys.stdout.getvalue()
stderr_output = sys.stderr.getvalue()
`;
    
    // --- Execution ---
    try {
        pyodide.runPython(fullScript);
        result.stdout = pyodide.globals.get('stdout_output') || "";
        result.stderr = pyodide.globals.get('stderr_output') || "";
        
        // Success: The Python code ran without throwing a syntax error
        result.passed = true;

    } catch (e) {
        // Failure: Python execution error
        result.passed = false;
        result.stderr = `${result.stderr}\n${e.message || String(e)}`;
        result.error = true;
    }

    // 4. Send result back to the main thread
    self.postMessage(result);
};

// Log:
*/