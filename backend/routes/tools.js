const express = require("express");
const nodemailer = require("nodemailer");
const multer = require("multer");
const sharp = require("sharp");
const upload = multer();
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

router.post("/smtp-tester", async (req, res) => {
  const { host, port, secure, user, pass, to, subject, text } = req.body;

  if (!host || !port || !user || !pass || !to || !subject || !text) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const transporter = nodemailer.createTransport({
      host,
      port: Number(port),
      secure: secure === true || secure === "true", // true for 465, false for 587
      auth: { user, pass },
    });

    const info = await transporter.sendMail({
      from: user,
      to,
      subject,
      text,
    });

    res.json({ result: `Email sent: ${info.messageId}` });
  } catch (error) {
    res.status(500).json({ error: `Failed to send email: ${error.message}` });
  }
});

router.post("/image-resize", upload.single("image"), async (req, res) => {
  const { width, height, maintainRatio } = req.body;
  const file = req.file;

  if (!file) return res.status(400).send("No image uploaded");

  let w = parseInt(width);
  let h = parseInt(height);

  try {
    let image = sharp(file.buffer);
    const metadata = await image.metadata();

    if (maintainRatio === "true") {
      const aspect = metadata.width / metadata.height;
      if (width && !height) h = Math.round(w / aspect);
      else if (height && !width) w = Math.round(h * aspect);
    }

    const outputFormat = file.mimetype === "image/png" ? "png" : "jpeg";
    const resized = await image.resize(w, h)[outputFormat]().toBuffer();

    res.set("Content-Type", `image/${outputFormat}`);
    res.send(resized);
  } catch (err) {
    res.status(500).send("Error resizing image");
  }
});


module.exports = router;
