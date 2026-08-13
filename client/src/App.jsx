import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { LessonViewer } from './components/LessonViewer';
import { CodePlayground } from './components/CodePlayground';
import { fetchLessons, fetchLessonById } from './services/api';
import './styles/global.css';

export function App() {
  const [lessons, setLessons] = useState([]);
  const [currentLessonId, setCurrentLessonId] = useState(1);
  const [currentLessonData, setCurrentLessonData] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isPlaygroundOpen, setIsPlaygroundOpen] = useState(false);
  const [playgroundCode, setPlaygroundCode] = useState('');

  // Persisted completion state
  const [completedLessonIds, setCompletedLessonIds] = useState(() => {
    const saved = localStorage.getItem('py_genai_completed_lessons');
    return saved ? JSON.parse(saved) : [];
  });

  // Persisted quiz answers state scoped by lesson: { "1-q1": 1, "2-q1": 0 }
  const [quizAnswers, setQuizAnswers] = useState(() => {
    const saved = localStorage.getItem('py_genai_quiz_answers');
    return saved ? JSON.parse(saved) : {};
  });

  // Load lesson metadata list
  useEffect(() => {
    async function loadMetadata() {
      const data = await fetchLessons();
      setLessons(data);
    }
    loadMetadata();
  }, []);

  // Load active lesson details
  useEffect(() => {
    async function loadLesson() {
      const data = await fetchLessonById(currentLessonId);
      setCurrentLessonData(data);
    }
    loadLesson();
  }, [currentLessonId]);

  // Toggle completion
  const handleMarkComplete = (id) => {
    let updated;
    if (completedLessonIds.includes(id)) {
      updated = completedLessonIds.filter((item) => item !== id);
    } else {
      updated = [...completedLessonIds, id];
    }
    setCompletedLessonIds(updated);
    localStorage.setItem('py_genai_completed_lessons', JSON.stringify(updated));
  };

  const handleSaveQuizAnswer = (lessonId, quizId, optionIdx) => {
    const key = `${lessonId}-${quizId}`;
    const updated = { ...quizAnswers, [key]: optionIdx };
    setQuizAnswers(updated);
    localStorage.setItem('py_genai_quiz_answers', JSON.stringify(updated));
  };

  const progressPercent =
    lessons.length > 0 ? Math.round((completedLessonIds.length / lessons.length) * 100) : 0;

  const handleOpenPlaygroundWithCode = (code) => {
    setPlaygroundCode(code);
    setIsPlaygroundOpen(true);
  };

  return (
    <div className="app-container">
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        progressPercent={progressPercent}
        onOpenPlayground={() => setIsPlaygroundOpen(true)}
      />

      <div className="main-layout">
        <Sidebar
          lessons={lessons}
          currentLessonId={currentLessonId}
          onSelectLesson={(id) => setCurrentLessonId(id)}
          searchQuery={searchQuery}
          completedLessonIds={completedLessonIds}
        />

        <main className="content-area">
          <LessonViewer
            lesson={currentLessonData}
            onOpenPlaygroundWithCode={handleOpenPlaygroundWithCode}
            onMarkLessonComplete={handleMarkComplete}
            isCompleted={completedLessonIds.includes(currentLessonId)}
            quizAnswers={quizAnswers}
            onSaveQuizAnswer={handleSaveQuizAnswer}
          />
        </main>
      </div>

      <CodePlayground
        isOpen={isPlaygroundOpen}
        onClose={() => setIsPlaygroundOpen(false)}
        initialCode={playgroundCode}
      />
    </div>
  );
}

export default App;
