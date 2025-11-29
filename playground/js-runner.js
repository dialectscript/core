// js-runner.js (Web Worker Script for JavaScript execution)

self.onmessage = (event) => {
    const { code, checkerFunction } = event.data;
    let stdout = '';
    let validationResult = { passed: false, message_key: "CHECKER_ERROR" };
    
    // --- Output Capture & Sandbox Setup ---
    
    // Temporarily override console.log to capture output
    const originalLog = console.log;
    console.log = (...args) => {
        stdout += args.map(arg => String(arg)).join(' ') + '\n';
    };

    try {
        // Run the user code safely within the worker's scope
        // Note: The checker logic is simple here, assuming we're just checking output/syntax for JS.
        // In a complex app, you'd run dedicated test functions here too.
        
        // Execute the code using a function constructor for basic scope isolation
        new Function(code)(); 

        // Task validation (We'll use a simple length check here for demonstration)
        if (code.length > 5) {
            validationResult = { passed: true, message_key: "CHECKER_SUCCESS" };
        } else {
            validationResult = { passed: false, message_key: "Write more JS code!" };
        }

    } catch (e) {
        // Handle runtime errors (e.g., calling undefined functions)
        stdout += `\nRuntime Error: ${e.message}`;
        validationResult = { passed: false, message_key: "RUNTIME_ERROR" };
    } finally {
        // Restore the original console.log (Crucial!)
        console.log = originalLog;
    }

    // Send the captured output and the validation result back to the main thread
    self.postMessage({
        stdout: stdout,
        validation: validationResult
    });
};