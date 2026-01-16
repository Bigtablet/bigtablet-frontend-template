#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const projectName = process.argv[2];

if (!projectName) {
    console.error("Project name is required.");
    process.exit(1);
}

const [nodeMajor] = process.versions.node.split(".").map(Number);

if (nodeMajor < 18) {
    console.error("Node.js 18 or higher is required.");
    process.exit(1);
}

const targetDir = path.resolve(process.cwd(), projectName);

if (fs.existsSync(targetDir)) {
    console.error(`Directory "${projectName}" already exists.`);
    process.exit(1);
}

const __dirname = new URL(".", import.meta.url).pathname;

const templateDir = path.resolve(
    decodeURIComponent(__dirname),
    "../../template"
);

fs.cpSync(templateDir, targetDir, { recursive: true });

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