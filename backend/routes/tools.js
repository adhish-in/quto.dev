const express = require("express");
const router = express.Router();

router.post("/url-encode", (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: "Text is required" });
  res.json({ result: encodeURIComponent(text) });
});

router.post("/url-decode", (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: "Text is required" });
  res.json({ result: decodeURIComponent(text) });
});

module.exports = router;
