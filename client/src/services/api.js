// API Service for Python & Gen AI Learning Platform

export const fetchLessons = async () => {
  try {
    const response = await fetch('/api/lessons');
    if (!response.ok) throw new Error('Failed to fetch lessons list');
    const data = await response.json();
    return data.data;
  } catch (err) {
    console.warn('API unavailable, returning fallback lesson metadata:', err.message);
    return [];
  }
};

export const fetchLessonById = async (id) => {
  try {
    const response = await fetch(`/api/lessons/${id}`);
    if (!response.ok) throw new Error(`Failed to fetch lesson ${id}`);
    const data = await response.json();
    return data.data;
  } catch (err) {
    console.warn(`API unavailable for lesson ${id}:`, err.message);
    return null;
  }
};

// Pyodide instance singleton reference
let pyodideInstance = null;

export const executePythonCode = async (code) => {
  // Try server execution first
  try {
    const response = await fetch('/api/execute', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code })
    });
    if (response.ok) {
      const data = await response.json();
      return data.output;
    }
  } catch (err) {
    console.log('Server execution fallback to Pyodide WASM:', err.message);
  }

  // In-browser Pyodide execution fallback
  try {
    if (!window.loadPyodide) {
      return 'Error: Pyodide WASM engine not loaded in browser.';
    }

    if (!pyodideInstance) {
      pyodideInstance = await window.loadPyodide();
    }

    // Capture standard output
    pyodideInstance.runPython(`
import sys
import io
sys.stdout = io.StringIO()
sys.stderr = io.StringIO()
`);

    await pyodideInstance.runPythonAsync(code);

    const stdout = pyodideInstance.runPython("sys.stdout.getvalue()");
    const stderr = pyodideInstance.runPython("sys.stderr.getvalue()");

    return stdout || stderr || '(Code executed cleanly with no output)';
  } catch (err) {
    return `[Execution Error]: ${err.message}`;
  }
};
