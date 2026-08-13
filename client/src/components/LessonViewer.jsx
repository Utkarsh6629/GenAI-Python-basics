import React, { useState } from 'react';
import { Play, Copy, Check, Clock, BookOpen, Layers, Award, Sparkles, CheckCircle } from 'lucide-react';
import { marked } from 'marked';
import { QuizCard } from './QuizCard';
import { ConceptDiagram } from './ConceptDiagram';

// Configure marked parser for GitHub Flavored Markdown and line breaks
marked.setOptions({
  gfm: true,
  breaks: true
});

export const LessonViewer = ({
  lesson,
  onOpenPlaygroundWithCode,
  onMarkLessonComplete,
  isCompleted,
  quizAnswers = {},
  onSaveQuizAnswer
}) => {
  const [copiedSnippetIdx, setCopiedSnippetIdx] = useState(null);

  if (!lesson) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>
        <h2>Select a lesson from the sidebar to begin learning.</h2>
      </div>
    );
  }

  const handleCopyCode = (code, idx) => {
    navigator.clipboard.writeText(code);
    setCopiedSnippetIdx(idx);
    setTimeout(() => setCopiedSnippetIdx(null), 2000);
  };

  return (
    <div style={{ width: '100%' }}>
      {/* Lesson Banner */}
      <div className="lesson-banner">
        <div className="lesson-category">
          <Sparkles size={14} />
          <span>{lesson.category}</span>
        </div>

        <h1 className="lesson-title">{lesson.title}</h1>
        <p style={{ color: '#cbd5e1', fontSize: '1.05rem', lineHeight: '1.6' }}>
          {lesson.description}
        </p>

        <div className="lesson-meta-bar">
          <div className="meta-chip">
            <Clock size={14} color="#38bdf8" />
            <span>{lesson.duration}</span>
          </div>
          <div className="meta-chip">
            <Layers size={14} color="#8b5cf6" />
            <span>{lesson.difficulty}</span>
          </div>
          <div className="meta-chip">
            <BookOpen size={14} color="#34d399" />
            <span>{lesson.sections?.length || 0} Topics</span>
          </div>

          <button
            className={`btn-primary ${isCompleted ? 'completed' : ''}`}
            style={{
              marginLeft: 'auto',
              background: isCompleted ? 'rgba(16, 185, 129, 0.2)' : undefined,
              border: isCompleted ? '1px solid #10b981' : undefined,
              color: isCompleted ? '#34d399' : undefined
            }}
            onClick={() => onMarkLessonComplete(lesson.id)}
          >
            <CheckCircle size={16} />
            <span>{isCompleted ? 'Completed' : 'Mark as Complete'}</span>
          </button>
        </div>
      </div>

      {/* Lesson Summary Card */}
      {lesson.summary && (
        <div
          style={{
            background: 'rgba(59, 130, 246, 0.08)',
            borderLeft: '4px solid #3b82f6',
            padding: '16px 20px',
            borderRadius: '8px',
            marginBottom: '28px',
            color: '#bfdbfe',
            fontSize: '0.95rem'
          }}
        >
          <strong>Overview: </strong> {lesson.summary}
        </div>
      )}

      {/* Concept Diagrams if available */}
      {lesson.diagrams && lesson.diagrams.map((d, i) => <ConceptDiagram key={i} diagram={d} />)}

      {/* Lesson Content Sections */}
      {lesson.sections &&
        lesson.sections.map((section, sIdx) => (
          <div key={section.id || sIdx} className="section-card">
            <h2 className="section-title">{section.title}</h2>
            <div
              className="section-body"
              dangerouslySetInnerHTML={{
                __html: marked.parse(section.content || '')
              }}
            />

            {/* Code Snippets */}
            {section.codeSnippets &&
              section.codeSnippets.map((snippet, cIdx) => {
                const uniqueKey = `${sIdx}-${cIdx}`;
                const isCopied = copiedSnippetIdx === uniqueKey;

                return (
                  <div key={cIdx} className="code-box">
                    <div className="code-box-header">
                      <span>{snippet.title || 'Python Example'}</span>
                      <div className="code-box-actions">
                        <button
                          className="btn-icon"
                          onClick={() => handleCopyCode(snippet.code, uniqueKey)}
                        >
                          {isCopied ? <Check size={14} color="#34d399" /> : <Copy size={14} />}
                          <span>{isCopied ? 'Copied' : 'Copy'}</span>
                        </button>

                        <button
                          className="btn-icon"
                          onClick={() => onOpenPlaygroundWithCode(snippet.code)}
                          style={{ borderColor: 'rgba(59, 130, 246, 0.4)', color: '#60a5fa' }}
                        >
                          <Play size={14} />
                          <span>Run Code</span>
                        </button>
                      </div>
                    </div>

                    <pre className="code-content">
                      <code>{snippet.code}</code>
                    </pre>
                  </div>
                );
              })}
          </div>
        ))}

      {/* End of Lesson Quizzes */}
      {lesson.quizzes && lesson.quizzes.length > 0 && (
        <div className="quiz-container">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '20px',
              fontSize: '1.3rem',
              fontWeight: 800
            }}
          >
            <Award size={24} color="#f59e0b" />
            <span>Knowledge Check Quiz</span>
          </div>

          {lesson.quizzes.map((quiz, qIdx) => {
            const quizKey = `${lesson.id}-${quiz.id || qIdx}`;
            const selectedOpt = quizAnswers[quizKey];

            return (
              <QuizCard
                key={quizKey}
                quiz={quiz}
                index={qIdx}
                lessonId={lesson.id}
                selectedOption={selectedOpt}
                onSelectOption={(qId, optIdx) => onSaveQuizAnswer(lesson.id, qId, optIdx)}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};
