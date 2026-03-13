import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import type { DesignSystemChoice } from "src/steps/prompt";
import type { PackageManagerInfo } from "src/utils/package-manager";

const GITIGNORE_CONTENT = [
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
].join("\n");

/**
 * @description
 * CLI 패키지의 루트 디렉토리 절대 경로를 반환합니다.
 * tsup 빌드 후 bin/ 에 위치한 파일 기준으로 두 단계 상위가 루트입니다.
 */
const getCliRootDirectory = (): string => {
	const currentFilename = fileURLToPath(import.meta.url);
	return path.resolve(path.dirname(currentFilename), "..");
};

/**
 * @description
 * 선택한 디자인 시스템에 해당하는 템플릿 디렉토리 경로를 반환합니다.
 *
 * templates/design-system/ 또는 templates/shadcn/ 중 하나를 반환합니다.
 *
 * @param cliRootDirectory - CLI 패키지 루트 경로
 * @param designSystemChoice - 사용자가 선택한 디자인 시스템
 * @returns 템플릿 디렉토리 절대 경로
 */
const getTemplateDirectory = (
	cliRootDirectory: string,
	designSystemChoice: DesignSystemChoice,
): string => {
	return path.resolve(
		cliRootDirectory,
		"templates",
		designSystemChoice,
	);
};

/**
 * @description
 * 프로젝트를 스캐폴딩합니다.
 *
 * 각 디자인 시스템별 독립 템플릿(templates/{choice}/)을 그대로 복사합니다.
 *
 * 실행 순서:
 * 1. 선택된 디자인 시스템의 템플릿 전체 복사
 * 2. .gitignore 생성
 * 3. .env.example 생성
 * 4. package.json 프로젝트명 치환 (__PROJECT_NAME__ → projectName)
 * 5. packageManager 필드 기록
 *
 * @param projectName - 생성할 프로젝트 이름
 * @param designSystemChoice - 선택된 디자인 시스템
 * @param packageManagerInfo - 감지된 패키지 매니저 정보
 * @returns 생성된 프로젝트 디렉토리의 절대 경로
 */
export const scaffoldProject = (
	projectName: string,
	designSystemChoice: DesignSystemChoice,
	packageManagerInfo: PackageManagerInfo,
): string => {
	const targetDirectory = path.resolve(process.cwd(), projectName);
	const cliRootDirectory = getCliRootDirectory();
	const templateDirectory = getTemplateDirectory(cliRootDirectory, designSystemChoice);

	fs.cpSync(templateDirectory, targetDirectory, { recursive: true });

	fs.writeFileSync(path.join(targetDirectory, ".gitignore"), GITIGNORE_CONTENT);
	fs.writeFileSync(path.join(targetDirectory, ".env.example"), "NEXT_PUBLIC_SERVER_URL=\n");

	const packageJsonPath = path.join(targetDirectory, "package.json");
	const packageJsonContent = fs.readFileSync(packageJsonPath, "utf8");
	fs.writeFileSync(packageJsonPath, packageJsonContent.replace("__PROJECT_NAME__", projectName));

	if (packageManagerInfo.version) {
		const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
		packageJson.packageManager = `${packageManagerInfo.name}@${packageManagerInfo.version}`;
		fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, "\t") + "\n");
	}

	return targetDirectory;
};
