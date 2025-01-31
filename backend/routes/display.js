import express from "express";

const router = express.Router();
router.post("/getdata", (req, res) => {
  try {
    res.send({ data: global.instituteData });
  } catch (e) {
    res.send("servve error: " + e.message);
  }
});

export default router;
