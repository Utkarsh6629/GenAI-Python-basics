import express from "express";
import { exec } from "child_process";
import fs from "fs";
import path from "path";
import os from "os";

const router = express.Router();

// POST /api/execute - Run Python code on server
router.post("/", (req, res) => {
  const { code } = req.body;

  if (!code || typeof code !== "string") {
    return res.status(400).json({
      success: false,
      output: "Error: No valid Python code provided."
    });
  }

  // Create temporary script file
  const tempDir = os.tmpdir();
  const scriptPath = path.join(tempDir, `exec_${Date.now()}_${Math.random().toString(36).substring(7)}.py`);

  fs.writeFile(scriptPath, code, (err) => {
    if (err) {
      return res.status(500).json({
        success: false,
        output: `Failed to write script: ${err.message}`
      });
    }

    // Execute with python or python3 with 5 second timeout
    const cmd = process.platform === "win32" ? `python "${scriptPath}"` : `python3 "${scriptPath}"`;

    exec(cmd, { timeout: 5000 }, (execErr, stdout, stderr) => {
      // Clean up temp file asynchronously
      fs.unlink(scriptPath, () => {});

      if (execErr) {
        const errorMsg = stderr || execErr.message;
        return res.json({
          success: false,
          output: stdout ? `${stdout}\n[Execution Error]: ${errorMsg}` : `[Execution Error]: ${errorMsg}`
        });
      }

      res.json({
        success: true,
        output: stdout || "(Code executed successfully with no printed output)"
      });
    });
  });
});

export default router;
