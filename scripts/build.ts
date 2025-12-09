import { build as esbuild } from "esbuild";
import { build as viteBuild } from "vite";
import { rm, readFile } from "fs/promises";
import path from "path";

// Server deps to bundle
const allowlist = [
  "express",
];

async function buildAll() {
  const rootDir = path.resolve(import.meta.dirname, "..");
  const frontendDir = path.join(rootDir, "frontend");
  const backendDir = path.join(rootDir, "backend");

  // Clean previous builds
  await rm(path.join(frontendDir, "dist"), { recursive: true, force: true });
  await rm(path.join(backendDir, "dist"), { recursive: true, force: true });

  console.log("🔨 Building frontend...");
  await viteBuild({
    root: frontendDir,
    configFile: path.join(frontendDir, "vite.config.ts"),
  });

  console.log("🔨 Building backend...");
  const pkg = JSON.parse(await readFile(path.join(backendDir, "package.json"), "utf-8"));
  const allDeps = [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.devDependencies || {}),
  ];
  const externals = allDeps.filter((dep) => !allowlist.includes(dep));

  await esbuild({
    entryPoints: [path.join(backendDir, "src", "index.ts")],
    platform: "node",
    bundle: true,
    format: "cjs",
    outfile: path.join(backendDir, "dist", "index.cjs"),
    define: {
      "process.env.NODE_ENV": '"production"',
    },
    minify: true,
    external: externals,
    logLevel: "info",
  });

  console.log("✅ Build complete!");
}

buildAll().catch((err) => {
  console.error("❌ Build failed:", err);
  process.exit(1);
});
