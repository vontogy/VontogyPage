import express from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS configuration
app.use((req, res, next) => {
  const origin = req.headers.origin;
  res.setHeader("Access-Control-Allow-Origin", origin || "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

// Database connection (optional - only if DATABASE_URL is provided)
let db: ReturnType<typeof drizzle> | null = null;
if (process.env.DATABASE_URL) {
  try {
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });
    db = drizzle(pool);
    console.log("✅ Database connected");
  } catch (error) {
    console.warn("⚠️  Database connection failed:", error);
  }
}

// API Routes
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Serve static files in production
if (process.env.NODE_ENV === "production") {
  const publicPath = join(__dirname, "..", "dist", "public");
  app.use(express.static(publicPath));
  
  // Serve index.html for all routes (SPA routing)
  app.get("*", (req, res) => {
    res.sendFile(join(publicPath, "index.html"));
  });
}

// Development mode - proxy to Vite dev server
if (process.env.NODE_ENV !== "production") {
  console.log("🔧 Running in development mode");
  console.log("📦 Frontend should be running on http://localhost:5000");
  console.log("💡 Run 'npm run dev:client' in another terminal to start the frontend");
}

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📝 Environment: ${process.env.NODE_ENV || "development"}`);
});

