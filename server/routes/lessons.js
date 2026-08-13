import express from "express";
import { lessonsMetadata, getLessonById } from "../data/lessons/index.js";

const router = express.Router();

// GET /api/lessons - List all lessons
router.get("/", (req, res) => {
  res.json({
    success: true,
    count: lessonsMetadata.length,
    data: lessonsMetadata
  });
});

// GET /api/lessons/:id - Get specific lesson by ID
router.get("/:id", (req, res) => {
  const lessonId = req.params.id;
  const lesson = getLessonById(lessonId);

  if (!lesson) {
    // If detailed lesson data is not yet added in phase 1, return fallback metadata
    const meta = lessonsMetadata.find((l) => l.id === Number(lessonId));
    if (meta) {
      return res.json({
        success: true,
        data: {
          ...meta,
          sections: [
            {
              id: "coming-soon",
              title: `${meta.title} Content Expansion`,
              content: `Lesson **${meta.title}** is part of Phase 2+ rollout. You can preview the structure and track your progress. Check back as additional lesson phases are published!`,
              codeSnippets: [
                {
                  title: "Sample Python Preview",
                  language: "python",
                  code: `# Preview for ${meta.title}\nprint("Lesson ${meta.number}: ${meta.title} coming in next phase!")`
                }
              ]
            }
          ],
          quizzes: []
        }
      });
    }

    return res.status(404).json({
      success: false,
      message: `Lesson with ID ${lessonId} not found.`
    });
  }

  res.json({
    success: true,
    data: lesson
  });
});

export default router;
