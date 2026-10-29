import dotenv from "dotenv";
import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const envResult = dotenv.config({
  path: path.resolve(process.cwd(), ".env"),
});

if (envResult.error) {
  console.error("Failed to load .env:", envResult.error.message);
} else {
  console.log(".env loaded successfully");
  console.log("TELEGRAM_TOKEN exists:", Boolean(process.env.TELEGRAM_TOKEN));
  console.log(
    "TELEGRAM_CHAT_ID exists:",
    Boolean(process.env.TELEGRAM_CHAT_ID),
  );
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Dynamic robots.txt with runtime APP_URL support
  app.get("/robots.txt", (_req, res) => {
    const baseUrl = (
      process.env.APP_URL ||
      "https://dnyanai.netlify.app" ||
      "http://localhost:3000/"
    ).replace(/\/$/, "");
    res
      .type("text/plain")
      .send(`User-agent: *\nAllow: /\n\nSitemap: ${baseUrl}/sitemap.xml\n`);
  });

  // Dynamic sitemap.xml with runtime APP_URL support
  app.get("/sitemap.xml", (_req, res) => {
    const baseUrl = (
      process.env.APP_URL ||
      "https://dnyanai.netlify.app" ||
      "http://localhost:3000/"
    ).replace(/\/$/, "");
    const today = new Date().toISOString().split("T")[0];
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>${baseUrl}/</loc>
      <lastmod>${today}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>1.0</priority>
    </url>
    <url>
      <loc>${baseUrl}/#recognitions</loc>
      <lastmod>${today}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.8</priority>
    </url>
    <url>
      <loc>${baseUrl}/#courses</loc>
      <lastmod>${today}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.9</priority>
    </url>
    <url>
      <loc>${baseUrl}/#contact</loc>
      <lastmod>${today}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.8</priority>
    </url>
  </urlset>`;
    res.type("application/xml").send(xml);
  });

  // Admission Enquiry & Callback -> Telegram Bot Notification Endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const {
        course,
        name,
        contact,
        age,
        gender,
        qualification,
        city,
        source,
      } = req.body ?? {};

      const token = process.env.TELEGRAM_TOKEN;
      const chatId = process.env.TELEGRAM_CHAT_ID;

      if (!token || !chatId) {
        console.warn(
          "TELEGRAM_TOKEN or TELEGRAM_CHAT_ID missing in environment.",
        );
        return res.json({
          success: true,
          warning: "Form received, notifications unconfigured",
        });
      }

      const text =
        source === "Footer Callback"
          ? `🔔 Callback Request — Dnyanai Computer Education\n\n📞 Contact: ${contact || "N/A"}\n📍 Source: Website Footer`
          : `🔔 New Course Admission Enquiry\nDnyanai Computer Education\n\nCourse: ${course || "N/A"}\nName:\t${name || "N/A"}\nContact:\t${contact || "N/A"}\nAge:\t${age || "N/A"}\nGender:\t${gender || "N/A"}\nQualification:\t${qualification || "N/A"}\nCity:\t${city || "N/A"}\n\nCall them asap. Thanks.`;

      const telegramRes = await fetch(
        `https://api.telegram.org/bot${token}/sendMessage`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chat_id: chatId,
            text,
          }),
        },
      );

      const result = (await telegramRes.json()) as {
        ok?: boolean;
        description?: string;
      };

      if (!result.ok) {
        return res.status(500).json(result);
      }

      return res.json({ success: true });
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Internal Server Error";
      return res.status(500).json({ error: errorMessage });
    }
  });

  const distPath = path.join(__dirname, "dist");
  const isDev =
    process.env.NODE_ENV === "development" ||
    !fs.existsSync(path.join(distPath, "index.html"));

  if (isDev) {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "localhost", () => {
    console.log(`Dnyanai server running on http://localhost:${PORT}`);
  });
}

startServer();
