import express from "express";

const router = express.Router();
router.get("/getdata", (req, res) => {
  try {
    res.json({ data: global.instituteData });
  } catch (e) {
    res.send("servve error: " + e.message);
  }
});

export default router;
