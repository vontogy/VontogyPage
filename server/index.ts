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

// Security Headers - Critical for Google Ads compliance
app.use((req, res, next) => {
  // Content Security Policy
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'; " +
    "style-src 'self' 'unsafe-inline'; " +
    "img-src 'self' data: https:; " +
    "font-src 'self' data:; " +
    "connect-src 'self' https://www.digistore24.com https://www.checkout-ds24.com https://myfemipro24.com; " +
    "frame-src 'none'; " +
    "object-src 'none'; " +
    "base-uri 'self'; " +
    "form-action 'self' https://www.checkout-ds24.com; " +
    "upgrade-insecure-requests;"
  );
  
  // X-Frame-Options - Prevent clickjacking
  res.setHeader("X-Frame-Options", "DENY");
  
  // X-Content-Type-Options - Prevent MIME type sniffing
  res.setHeader("X-Content-Type-Options", "nosniff");
  
  // Strict-Transport-Security - Force HTTPS (only on HTTPS connections)
  if (req.secure || req.headers['x-forwarded-proto'] === 'https') {
    res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");
  }
  
  // Referrer-Policy - Control referrer information
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  
  // Permissions-Policy - Restrict browser features
  res.setHeader("Permissions-Policy", "geolocation=(), microphone=(), camera=()");
  
  next();
});

// CORS configuration - Restrictive (fixed security vulnerability)
const allowedOrigins = [
  process.env.ALLOWED_ORIGIN,
  // Add trusted domains here
].filter(Boolean) as string[];

app.use((req, res, next) => {
  const origin = req.headers.origin;
  
  // Allow only whitelisted origins
  if (origin && allowedOrigins.length > 0 && allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Credentials", "true");
  } else if (process.env.NODE_ENV === "development") {
    // In development, allow localhost
    if (origin && (origin.includes("localhost") || origin.includes("127.0.0.1"))) {
      res.setHeader("Access-Control-Allow-Origin", origin);
      res.setHeader("Access-Control-Allow-Credentials", "true");
    }
  } else {
    // In production, deny unauthorized origins
    res.setHeader("Access-Control-Allow-Origin", "null");
    res.setHeader("Access-Control-Allow-Credentials", "false");
  }
  
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




