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
import fs2 from "fs";
import path2 from "path";

// src/registry.ts
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
var TEMPLATES = [
  {
    name: "design-system",
    label: "@bigtablet/design-system",
    hint: "Bigtablet \uC0AC\uB0B4 \uCEF4\uD3EC\uB10C\uD2B8 (SCSS)"
  },
  {
    name: "shadcn",
    label: "shadcn/ui",
    hint: "Tailwind CSS v4 + Radix UI"
  }
];
var cachedTemplates = null;
function getTemplates() {
  if (cachedTemplates !== null) return cachedTemplates;
  cachedTemplates = TEMPLATES.filter((t) => {
    if (typeof t.isEnabled === "function") return t.isEnabled();
    return true;
  });
  return cachedTemplates;
}
function findTemplate(name) {
  return getTemplates().find((t) => t.name === name);
}
function getTemplateDir(templateName) {
  const currentFilename = fileURLToPath(import.meta.url);
  const cliRoot = path.resolve(path.dirname(currentFilename), "..");
  return path.resolve(cliRoot, "templates", templateName);
}
function templateExists(templateName) {
  return fs.existsSync(getTemplateDir(templateName));
}

// src/steps/prompt.ts
var runPrompts = async (initialProjectName) => {
  intro("@bigtablet/create-frontend");
  const projectName = await text({
    message: "\uD504\uB85C\uC81D\uD2B8 \uC774\uB984\uC744 \uC785\uB825\uD558\uC138\uC694:",
    placeholder: "my-app",
    initialValue: initialProjectName,
    validate: (value = "") => {
      if (!value.trim()) return "\uD504\uB85C\uC81D\uD2B8 \uC774\uB984\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.";
      if (fs2.existsSync(path2.resolve(process.cwd(), value))) {
        return `"${value}" \uB514\uB809\uD1A0\uB9AC\uAC00 \uC774\uBBF8 \uC874\uC7AC\uD569\uB2C8\uB2E4.`;
      }
    }
  });
  if (isCancel(projectName)) {
    cancel("\uC791\uC5C5\uC774 \uCDE8\uC18C\uB410\uC2B5\uB2C8\uB2E4.");
    process.exit(0);
  }
  const templates = getTemplates();
  const templateName = await select({
    message: "\uD15C\uD50C\uB9BF\uC744 \uC120\uD0DD\uD558\uC138\uC694:",
    options: templates.map((t) => ({
      value: t.name,
      label: t.label,
      hint: t.hint
    }))
  });
  if (isCancel(templateName)) {
    cancel("\uC791\uC5C5\uC774 \uCDE8\uC18C\uB410\uC2B5\uB2C8\uB2E4.");
    process.exit(0);
  }
  return {
    projectName,
    templateName
  };
};

// src/steps/scaffold.ts
import fs3 from "fs";
import path3 from "path";
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
var scaffoldProject = async (projectName, templateName, packageManagerInfo) => {
  if (!templateExists(templateName)) {
    throw new Error(`\uD15C\uD50C\uB9BF "${templateName}"\uC744(\uB97C) \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.`);
  }
  const targetDirectory = path3.resolve(process.cwd(), projectName);
  try {
    const templateDirectory = getTemplateDir(templateName);
    fs3.cpSync(templateDirectory, targetDirectory, { recursive: true });
    fs3.writeFileSync(path3.join(targetDirectory, ".gitignore"), GITIGNORE_CONTENT);
    fs3.writeFileSync(path3.join(targetDirectory, ".env.example"), "NEXT_PUBLIC_SERVER_URL=\n");
    const packageJsonPath = path3.join(targetDirectory, "package.json");
    const packageJsonContent = fs3.readFileSync(packageJsonPath, "utf8");
    fs3.writeFileSync(packageJsonPath, packageJsonContent.replace("__PROJECT_NAME__", projectName));
    if (packageManagerInfo.version) {
      const packageJson = JSON.parse(fs3.readFileSync(packageJsonPath, "utf8"));
      packageJson.packageManager = `${packageManagerInfo.name}@${packageManagerInfo.version}`;
      fs3.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, "	") + "\n");
    }
    const template = findTemplate(templateName);
    if (template?.afterScaffold) {
      await template.afterScaffold(targetDirectory);
    }
    return targetDirectory;
  } catch (error) {
    fs3.rmSync(targetDirectory, { recursive: true, force: true });
    throw error;
  }
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
  const targetDirectory = await scaffoldProject(
    projectConfig.projectName,
    projectConfig.templateName,
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
