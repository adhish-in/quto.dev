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

router.post("/json-formatter", (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: "Text is required" });

  try {
    const parsed = JSON.parse(text);
    const formatted = JSON.stringify(parsed, null, 2);
    res.json({ result: formatted });
  } catch (err) {
    res.json({ error: "Invalid JSON: " + err.message });
  }
});

router.post("/api-tester", async (req, res) => {
  const { url, method = "GET", headers = {}, body } = req.body;

  if (!url) return res.status(400).json({ error: "URL is required" });

  try {
    const fetch = (await import("node-fetch")).default;
    const response = await fetch(url, {
      method,
      headers,
      body: ["POST", "PUT", "PATCH", "DELETE"].includes(method.toUpperCase()) ? body : undefined,
    });

    const contentType = response.headers.get("content-type") || "";
    const text = await response.text();

    res.status(200).json({
      status: `${response.status} ${response.statusText}`,
      contentType,
      body: contentType.includes("application/json") ? JSON.parse(text) : text,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
