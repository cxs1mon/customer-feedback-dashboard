import express from "express";
import cors from "cors";
import fs from "fs";

const app = express();
const PORT = 3000;

app.use(cors({ origin: "http://localhost:4200" }));

const feedbacks = JSON.parse(
  fs.readFileSync("./src/assets/mock/feedbacks.json", "utf8"),
);

app.get("/feedbacks", (req, res) => {
  res.json(feedbacks);
});

app.get("/feedbacks/:id", (req, res) => {
  const feedback = feedbacks.find((f) => f.id === req.params.id);
  if (feedback) res.json(feedback);
  else res.status(404).json({ error: "Feedback not found" });
});

app.listen(PORT, () => {
  console.log(`✅ Mock service running at http://localhost:${PORT}`);
});
