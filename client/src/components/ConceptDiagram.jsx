import React from 'react';
import { Network, ArrowRight } from 'lucide-react';

export const ConceptDiagram = ({ diagram }) => {
  if (!diagram) return null;

  return (
    <div
      style={{
        background: '#090e1a',
        border: '1px solid rgba(59, 130, 246, 0.25)',
        borderRadius: '12px',
        padding: '24px',
        margin: '24px 0'
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontWeight: 700,
          color: '#38bdf8',
          marginBottom: '16px',
          fontSize: '0.95rem'
        }}
      >
        <Network size={18} />
        <span>{diagram.title}</span>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '20px',
          flexWrap: 'wrap',
          background: 'rgba(255, 255, 255, 0.02)',
          padding: '20px',
          borderRadius: '8px'
        }}
      >
        <div
          style={{
            background: '#1e293b',
            border: '1px solid #3b82f6',
            borderRadius: '8px',
            padding: '12px 18px',
            color: '#fff',
            fontFamily: 'monospace',
            textAlign: 'center'
          }}
        >
          <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Variable Reference</div>
          <div style={{ fontSize: '1rem', fontWeight: 700, color: '#60a5fa' }}>x = 100</div>
        </div>

        <ArrowRight size={20} color="#3b82f6" />

        <div
          style={{
            background: '#0f172a',
            border: '1px solid #8b5cf6',
            borderRadius: '8px',
            padding: '12px 18px',
            color: '#38bdf8',
            fontFamily: 'monospace',
            textAlign: 'center'
          }}
        >
          <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Memory Address</div>
          <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>ID: 0x7f98a3b2</div>
        </div>

        <ArrowRight size={20} color="#8b5cf6" />

        <div
          style={{
            background: '#0284c7',
            border: '1px solid #38bdf8',
            borderRadius: '8px',
            padding: '12px 18px',
            color: '#fff',
            fontFamily: 'monospace',
            textAlign: 'center'
          }}
        >
          <div style={{ fontSize: '0.75rem', color: '#e0f2fe' }}>Object Value</div>
          <div style={{ fontSize: '1.1rem', fontWeight: 800 }}>100</div>
          <div style={{ fontSize: '0.7rem', opacity: 0.9 }}>Type: int</div>
        </div>
      </div>
    </div>
  );
};
