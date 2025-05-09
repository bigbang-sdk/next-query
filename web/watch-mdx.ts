#!/usr/bin/env node
import chokidar from "chokidar";
import fs from "fs";
import path from "path";

const configPath = path.resolve(__dirname, "src/app/layout.tsx");

chokidar.watch("src/main/docs/").on("change", (filePath: string) => {
  console.log("📦 MDX file changed:", filePath);
  if (fs.existsSync(configPath)) {
    fs.utimesSync(configPath, new Date(), new Date());
  } else {
    console.error("❌ next.config.js not found at", configPath);
  }
});

chokidar.watch("public/").on("change", (filePath: string) => {
  console.log("📦 Files changed:", filePath);
  if (fs.existsSync(configPath)) {
    fs.utimesSync(configPath, new Date(), new Date());
  } else {
    console.error("❌ next.config.js not found at", configPath);
  }
});
