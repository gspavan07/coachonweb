import express from "express";
import authRouter from "./routes/auth.js";
import profileRouter from "./routes/profile.js";
import connectMongoDB from "./lib/mongoDB.js";

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const port = process.env.PORT || 3000;
const app = express();

// // Serve sclient
app.use(express.static(path.join(__dirname, "client", "build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

connectMongoDB();
app.use(express.json());

app.use("/api", authRouter);
app.use("/api", profileRouter);
app.listen(port, () => {
  console.log(`Server listening on port http://localhost:${port}`);
});
