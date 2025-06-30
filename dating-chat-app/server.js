import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { chatWithGemini } from "./services/gemini.js";
import { promises as fs } from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const RATINGS_FILE = path.join(__dirname, "data/ratings.json");

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const sessions = new Map();

async function ensureRatingsFile() {
  try {
    await fs.access(RATINGS_FILE);
  } catch {
    await fs.mkdir(path.join(__dirname, "data"), { recursive: true });
    await fs.writeFile(RATINGS_FILE, JSON.stringify([], null, 2));
  }
}

app.post("/api/chat", async (req, res) => {
  try {
    const { message, sessionId = "default" } = req.body;

    if (!sessions.has(sessionId)) {
      sessions.set(sessionId, []);
    }

    const history = sessions.get(sessionId);
    const result = await chatWithGemini(message, history);

    history.push(
      { role: "user", parts: [{ text: message }] },
      { role: "model", parts: [{ text: result.response }] }
    );

    if (result.rating) {
      await saveRating(sessionId, result.rating, result.feedback);
    }

    res.json({
      response: result.response,
      rating: result.rating || null,
      feedback: result.feedback || null,
    });
  } catch (error) {
    console.error("Chat error:", error);
    res.status(500).json({ error: "Erro na conversa" });
  }
});

app.get("/api/ratings/:sessionId", async (req, res) => {
  try {
    await ensureRatingsFile();
    const ratings = JSON.parse(await fs.readFile(RATINGS_FILE, "utf8"));
    const sessionRatings = ratings.filter(
      (r) => r.sessionId === req.params.sessionId
    );
    res.json(sessionRatings);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar notas" });
  }
});

async function saveRating(sessionId, rating, feedback) {
  await ensureRatingsFile();
  const ratings = JSON.parse(await fs.readFile(RATINGS_FILE, "utf8"));

  const newRating = {
    id: Date.now().toString(),
    sessionId,
    rating,
    feedback,
    timestamp: new Date().toISOString(),
  };

  ratings.push(newRating);
  await fs.writeFile(RATINGS_FILE, JSON.stringify(ratings, null, 2));
}

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
