import express from "express";
import authRouter from "./routes/auth.js";
import getRouter from "./routes/display.js";
import connectMongoDB from "./lib/mongoDB.js";
import cors from "cors";
import path from "path";
const port = process.env.PORT || 3000;
const app = express();

// Serve static files from the uploads directory
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

connectMongoDB();
app.get("/", (req, res) => {
  res.send("Hello, world!");
});
app.use(express.json());
app.use(cors());
app.use("/api", authRouter);
app.use("/api", getRouter);
app.listen(port, () => {
  console.log(`Server listening on port http://localhost:${port}`);
});
