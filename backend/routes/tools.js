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

router.post("/remove-line-breaks", (req, res) => {
  const { text, replacement = " " } = req.body;
  if (!text) return res.status(400).json({ error: "Text is required" });

  const result = text
    .replace(/\\n/g, replacement)  // replaces literal "\n"
    .replace(/\\r/g, replacement)  // replaces literal "\r"
    .replace(/[\r\n]+/g, replacement); // replaces actual newlines

  res.json({ result });
});


module.exports = router;
