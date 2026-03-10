import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import type { DesignSystemChoice } from "src/steps/prompt";
import type { PackageManagerInfo } from "src/utils/package-manager";

/** shadcn 선택 시 template/package.json에 추가할 의존성 */
const SHADCN_ADDITIONAL_DEPENDENCIES: Record<string, string> = {
	tailwindcss: "^4.0.0",
	"class-variance-authority": "^0.7.1",
	clsx: "^2.1.1",
	"tailwind-merge": "^3.0.0",
	"lucide-react": "^0.400.0",
	sonner: "^2.0.7",
};

/** shadcn 선택 시 template/package.json에서 제거할 의존성 */
const SHADCN_REMOVED_DEPENDENCIES: ReadonlyArray<string> = [
	"@bigtablet/design-system",
	"sass",
];

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
 * shadcn 선택 시 package.json 의존성을 수정합니다.
 * design-system 관련 패키지를 제거하고 Tailwind/shadcn 패키지를 추가합니다.
 *
 * @param packageJsonPath - 수정할 package.json 파일 경로
 * @param designSystemChoice - 사용자가 선택한 디자인 시스템
 */
const patchPackageJsonDependencies = (
	packageJsonPath: string,
	designSystemChoice: DesignSystemChoice,
): void => {
	if (designSystemChoice === "design-system") return;

	const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));

	for (const removedDependency of SHADCN_REMOVED_DEPENDENCIES) {
		delete packageJson.dependencies[removedDependency];
	}

	packageJson.dependencies = {
		...packageJson.dependencies,
		...SHADCN_ADDITIONAL_DEPENDENCIES,
	};

	fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, "\t") + "\n");
};

/**
 * @description
 * 프로젝트를 스캐폴딩합니다.
 *
 * 실행 순서:
 * 1. base template(template/) 전체 복사
 * 2. 디자인 시스템 오버레이 적용 (shadcn 선택 시 templates/shadcn/ 덮어쓰기)
 * 3. .gitignore 생성
 * 4. .env.example 생성
 * 5. package.json 프로젝트명 치환 (__PROJECT_NAME__ → projectName)
 * 6. packageManager 필드 기록
 * 7. 의존성 패치 (shadcn 선택 시)
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

	fs.cpSync(path.resolve(cliRootDirectory, "template"), targetDirectory, { recursive: true });

	if (designSystemChoice === "shadcn") {
		fs.cpSync(path.resolve(cliRootDirectory, "templates/shadcn"), targetDirectory, {
			recursive: true,
		});
	}

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

	patchPackageJsonDependencies(packageJsonPath, designSystemChoice);

	return targetDirectory;
};
