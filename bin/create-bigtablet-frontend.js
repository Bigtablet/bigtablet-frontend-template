#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { fileURLToPath } from "url";

const projectName = process.argv[2];

if (!projectName) {
    console.error("Project name is required.");
    process.exit(1);
}

const [nodeMajor] = process.versions.node.split(".").map(Number);

if (nodeMajor < 24) {
    console.error("Node.js 24 or higher is required.");
    process.exit(1);
}

const targetDir = path.resolve(process.cwd(), projectName);

if (fs.existsSync(targetDir)) {
    console.error(`Directory "${projectName}" already exists.`);
    process.exit(1);
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const templateDir = path.resolve(__dirname, "../template");

fs.cpSync(templateDir, targetDir, { recursive: true });

fs.writeFileSync(
    path.join(targetDir, ".gitignore"),
    [
        "node_modules/",
        ".next/",
        "out/",
        "dist/",
        "build/",
        "",
        ".env",
        ".env.local",
        ".env.*.local",
        "",
        "*.log",
        ".DS_Store",
        ".vercel/",
        "",
    ].join("\n")
);

fs.writeFileSync(
    path.join(targetDir, ".env.example"),
    "NEXT_PUBLIC_SERVER_URL=\n"
);

const pkgPath = path.join(targetDir, "package.json");
const pkg = fs.readFileSync(pkgPath, "utf8");

fs.writeFileSync(
    pkgPath,
    pkg.replace("__PROJECT_NAME__", projectName)
);

const userAgent = process.env.npm_config_user_agent || "";

const packageManager = userAgent.includes("pnpm")
    ? "pnpm"
    : userAgent.includes("yarn")
        ? "yarn"
        : "npm";

const pmVersion = userAgent.match(new RegExp(`${packageManager}/(\\S+)`))?.[1]?.split(" ")[0] || "";

if (pmVersion) {
    const pkgJson = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
    pkgJson.packageManager = `${packageManager}@${pmVersion}`;
    fs.writeFileSync(pkgPath, JSON.stringify(pkgJson, null, "\t") + "\n");
}

const installCommand =
    packageManager === "yarn"
        ? "yarn install"
        : `${packageManager} install`;

console.log(`Installing dependencies using ${packageManager}...`);

try {
    execSync(installCommand, {
        cwd: targetDir,
        stdio: "inherit",
    });
} catch {
    console.error("Failed to install dependencies.");
    process.exit(1);
}

console.log("");
console.log("Project created successfully.");
console.log("");
console.log("Next steps:");
console.log(`  cd ${projectName}`);
console.log(
    `  ${
        packageManager === "npm"
            ? "npm run dev"
            : `${packageManager} dev`
    }`
);