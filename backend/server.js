import express from "express";
import authRouter from "./routes/auth.js";
import getRouter from "./routes/display.js";
import connectMongoDB from "./lib/mongoDB.js";
import cors from "cors";

const port = process.env.PORT || 3000;
const app = express();

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
