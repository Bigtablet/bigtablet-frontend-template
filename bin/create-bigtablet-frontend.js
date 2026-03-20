#!/usr/bin/env node

// src/index.ts
import { log, outro } from "@clack/prompts";

// src/steps/install.ts
import { execSync } from "child_process";
import { spinner } from "@clack/prompts";
var installDependencies = (targetDirectory, packageManagerInfo) => {
  const installationSpinner = spinner();
  installationSpinner.start(`${packageManagerInfo.name}\uC73C\uB85C \uC758\uC874\uC131\uC744 \uC124\uCE58\uD558\uB294 \uC911...`);
  try {
    execSync(packageManagerInfo.installCommand, {
      cwd: targetDirectory,
      stdio: "pipe"
    });
    installationSpinner.stop("\uC758\uC874\uC131 \uC124\uCE58 \uC644\uB8CC");
  } catch (error) {
    installationSpinner.stop("\uC758\uC874\uC131 \uC124\uCE58 \uC2E4\uD328");
    throw error;
  }
};

// src/steps/prompt.ts
import { cancel, intro, isCancel, select, text } from "@clack/prompts";
import fs from "fs";
import path from "path";
var runPrompts = async (initialProjectName) => {
  intro("@bigtablet/create-frontend");
  const projectName = await text({
    message: "\uD504\uB85C\uC81D\uD2B8 \uC774\uB984\uC744 \uC785\uB825\uD558\uC138\uC694:",
    placeholder: "my-app",
    initialValue: initialProjectName,
    validate: (value) => {
      if (!value.trim()) return "\uD504\uB85C\uC81D\uD2B8 \uC774\uB984\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.";
      if (fs.existsSync(path.resolve(process.cwd(), value))) {
        return `"${value}" \uB514\uB809\uD1A0\uB9AC\uAC00 \uC774\uBBF8 \uC874\uC7AC\uD569\uB2C8\uB2E4.`;
      }
    }
  });
  if (isCancel(projectName)) {
    cancel("\uC791\uC5C5\uC774 \uCDE8\uC18C\uB410\uC2B5\uB2C8\uB2E4.");
    process.exit(0);
  }
  const designSystem = await select({
    message: "\uB514\uC790\uC778 \uC2DC\uC2A4\uD15C\uC744 \uC120\uD0DD\uD558\uC138\uC694:",
    options: [
      {
        value: "design-system",
        label: "@bigtablet/design-system",
        hint: "Bigtablet \uC0AC\uB0B4 \uCEF4\uD3EC\uB10C\uD2B8 (SCSS)"
      },
      {
        value: "shadcn",
        label: "shadcn/ui",
        hint: "Tailwind CSS v4 + Radix UI"
      }
    ]
  });
  if (isCancel(designSystem)) {
    cancel("\uC791\uC5C5\uC774 \uCDE8\uC18C\uB410\uC2B5\uB2C8\uB2E4.");
    process.exit(0);
  }
  return {
    projectName,
    designSystem
  };
};

// src/steps/scaffold.ts
import fs2 from "fs";
import path2 from "path";
import { fileURLToPath } from "url";
var GITIGNORE_CONTENT = [
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
  ""
].join("\n");
var getCliRootDirectory = () => {
  const currentFilename = fileURLToPath(import.meta.url);
  return path2.resolve(path2.dirname(currentFilename), "..");
};
var getTemplateDirectory = (cliRootDirectory, designSystemChoice) => {
  return path2.resolve(
    cliRootDirectory,
    "templates",
    designSystemChoice
  );
};
var scaffoldProject = (projectName, designSystemChoice, packageManagerInfo) => {
  const targetDirectory = path2.resolve(process.cwd(), projectName);
  const cliRootDirectory = getCliRootDirectory();
  const templateDirectory = getTemplateDirectory(cliRootDirectory, designSystemChoice);
  fs2.cpSync(templateDirectory, targetDirectory, { recursive: true });
  fs2.writeFileSync(path2.join(targetDirectory, ".gitignore"), GITIGNORE_CONTENT);
  fs2.writeFileSync(path2.join(targetDirectory, ".env.example"), "NEXT_PUBLIC_SERVER_URL=\n");
  const packageJsonPath = path2.join(targetDirectory, "package.json");
  const packageJsonContent = fs2.readFileSync(packageJsonPath, "utf8");
  fs2.writeFileSync(packageJsonPath, packageJsonContent.replace("__PROJECT_NAME__", projectName));
  if (packageManagerInfo.version) {
    const packageJson = JSON.parse(fs2.readFileSync(packageJsonPath, "utf8"));
    packageJson.packageManager = `${packageManagerInfo.name}@${packageManagerInfo.version}`;
    fs2.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, "	") + "\n");
  }
  return targetDirectory;
};

// src/utils/package-manager.ts
var detectPackageManager = () => {
  const userAgent = process.env.npm_config_user_agent ?? "";
  const name = userAgent.includes("pnpm") ? "pnpm" : userAgent.includes("yarn") ? "yarn" : "npm";
  const versionMatch = userAgent.match(new RegExp(`${name}/(\\S+)`));
  const version = versionMatch?.[1]?.split(" ")[0] ?? "";
  const installCommand = name === "yarn" ? "yarn install" : `${name} install`;
  return { name, version, installCommand };
};
var getDevCommand = (packageManagerName) => packageManagerName === "npm" ? "npm run dev" : `${packageManagerName} dev`;

// src/index.ts
var main = async () => {
  const [nodeMajorVersion] = process.versions.node.split(".").map(Number);
  if (nodeMajorVersion < 24) {
    console.error("Node.js 24 \uC774\uC0C1\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.");
    process.exit(1);
  }
  const initialProjectName = process.argv[2];
  const projectConfig = await runPrompts(initialProjectName);
  const packageManagerInfo = detectPackageManager();
  const targetDirectory = scaffoldProject(
    projectConfig.projectName,
    projectConfig.designSystem,
    packageManagerInfo
  );
  installDependencies(targetDirectory, packageManagerInfo);
  log.success("\uD504\uB85C\uC81D\uD2B8\uAC00 \uC0DD\uC131\uB410\uC2B5\uB2C8\uB2E4.");
  outro(
    `\uB2E4\uC74C \uB2E8\uACC4:
  cd ${projectConfig.projectName}
  ${getDevCommand(packageManagerInfo.name)}`
  );
};
main().catch((error) => {
  console.error("\uC624\uB958\uAC00 \uBC1C\uC0DD\uD588\uC2B5\uB2C8\uB2E4:", error);
  process.exit(1);
});
