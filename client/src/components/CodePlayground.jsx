import React, { useState } from 'react';
import { Play, X, RotateCcw, Copy, Check, Terminal } from 'lucide-react';
import { executePythonCode } from '../services/api';

export const CodePlayground = ({ isOpen, onClose, initialCode = '# Write Python code here\nprint("Hello from Sandbox!")' }) => {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleRun = async () => {
    setIsRunning(true);
    setOutput('Executing code...');
    const result = await executePythonCode(code);
    setOutput(result);
    setIsRunning(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="playground-drawer">
      <div className="playground-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#60a5fa' }}>
          <Terminal size={18} />
          <span>Interactive Python Sandbox</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button className="btn-icon" onClick={handleCopy}>
            {copied ? <Check size={14} color="#34d399" /> : <Copy size={14} />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
          <button className="btn-icon" onClick={onClose}>
            <X size={16} />
          </button>
        </div>
      </div>

      <div className="playground-body">
        <textarea
          className="playground-editor"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="# Type Python code here..."
        />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: '0.78rem', color: '#64748b' }}>
            Engine: Pyodide WASM / Node Server API
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button className="btn-icon" onClick={() => setOutput('')}>
              <RotateCcw size={14} />
              <span>Clear</span>
            </button>
            <button className="btn-primary" onClick={handleRun} disabled={isRunning}>
              <Play size={14} />
              <span>{isRunning ? 'Running...' : 'Run Code'}</span>
            </button>
          </div>
        </div>

        <div className="playground-output">
          <div style={{ fontSize: '0.72rem', color: '#64748b', marginBottom: '4px' }}>[Output Console]</div>
          {output || 'Output will appear here after clicking Run Code...'}
        </div>
      </div>
    </div>
  );
};
