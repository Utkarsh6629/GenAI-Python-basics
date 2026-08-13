import React from 'react';
import { BookOpen, CheckCircle, Clock, Lock, Sparkles } from 'lucide-react';

export const Sidebar = ({ lessons, currentLessonId, onSelectLesson, searchQuery, completedLessonIds }) => {
  // Filter lessons if user is searching
  const filteredLessons = lessons.filter(
    (l) =>
      l.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Group lessons by category
  const categories = Array.from(new Set(lessons.map((l) => l.category)));

  return (
    <aside className="sidebar">
      <div className="sidebar-header">Curriculum Tracks</div>

      {categories.map((cat) => {
        const categoryLessons = filteredLessons.filter((l) => l.category === cat);
        if (categoryLessons.length === 0) return null;

        return (
          <div key={cat} style={{ marginBottom: '18px' }}>
            <div
              style={{
                fontSize: '0.72rem',
                fontWeight: 700,
                color: '#38bdf8',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                marginBottom: '8px',
                paddingLeft: '8px'
              }}
            >
              {cat}
            </div>

            {categoryLessons.map((lesson) => {
              const isActive = lesson.id === currentLessonId;
              const isCompleted = completedLessonIds.includes(lesson.id);

              return (
                <div
                  key={lesson.id}
                  className={`sidebar-item ${isActive ? 'active' : ''}`}
                  onClick={() => onSelectLesson(lesson.id)}
                >
                  <span className="sidebar-number">{lesson.number}</span>

                  <span
                    style={{
                      flex: 1,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      fontSize: '0.88rem'
                    }}
                  >
                    {lesson.title}
                  </span>

                  {isCompleted ? (
                    <CheckCircle size={14} color="#10b981" />
                  ) : lesson.status === 'available' ? (
                    <span className="sidebar-status-badge badge-available">Ready</span>
                  ) : (
                    <span className="sidebar-status-badge badge-planned">Planned</span>
                  )}
                </div>
              );
            })}
          </div>
        );
      })}
    </aside>
  );
};
