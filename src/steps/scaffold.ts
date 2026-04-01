import fs from "node:fs";
import path from "node:path";
import { findTemplate, getTemplateDir, templateExists } from "src/registry";
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
 * 프로젝트를 스캐폴딩합니다.
 *
 * 실행 순서:
 * 1. 선택된 템플릿의 파일 전체 복사 (templates/{templateName}/)
 * 2. .gitignore 생성
 * 3. .env.example 생성
 * 4. package.json 프로젝트명 치환 (__PROJECT_NAME__ → projectName)
 * 5. packageManager 필드 기록
 * 6. 템플릿의 afterScaffold() 실행 (템플릿별 후처리)
 *
 * @param projectName - 생성할 프로젝트 이름
 * @param templateName - 선택된 템플릿 이름 (registry 기준)
 * @param packageManagerInfo - 감지된 패키지 매니저 정보
 * @returns 생성된 프로젝트 디렉토리의 절대 경로
 */
export const scaffoldProject = async (
	projectName: string,
	templateName: string,
	packageManagerInfo: PackageManagerInfo,
): Promise<string> => {
	if (!templateExists(templateName)) {
		throw new Error(`템플릿 "${templateName}"을(를) 찾을 수 없습니다.`);
	}

	const targetDirectory = path.resolve(process.cwd(), projectName);

	try {
		const templateDirectory = getTemplateDir(templateName);

		fs.cpSync(templateDirectory, targetDirectory, { recursive: true });

		fs.writeFileSync(path.join(targetDirectory, ".gitignore"), GITIGNORE_CONTENT);
		fs.writeFileSync(path.join(targetDirectory, ".env.example"), "NEXT_PUBLIC_SERVER_URL=\n");

		const packageJsonPath = path.join(targetDirectory, "package.json");
		let packageJsonContent = fs.readFileSync(packageJsonPath, "utf8").replace("__PROJECT_NAME__", projectName);

		if (packageManagerInfo.version) {
			const packageJson = JSON.parse(packageJsonContent);
			packageJson.packageManager = `${packageManagerInfo.name}@${packageManagerInfo.version}`;
			packageJsonContent = JSON.stringify(packageJson, null, "\t") + "\n";
		}

		fs.writeFileSync(packageJsonPath, packageJsonContent);

		// 템플릿별 후처리 실행 (각 템플릿이 직접 정의)
		const template = findTemplate(templateName);
		if (template?.afterScaffold) {
			await template.afterScaffold(targetDirectory);
		}

		return targetDirectory;
	} catch (error) {
		fs.rmSync(targetDirectory, { recursive: true, force: true });
		throw error;
	}
};
