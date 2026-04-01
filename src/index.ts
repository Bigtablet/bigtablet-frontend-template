import { log, outro } from "@clack/prompts";

import { installDependencies } from "src/steps/install";
import { runPrompts } from "src/steps/prompt";
import { scaffoldProject } from "src/steps/scaffold";
import { detectPackageManager, getDevCommand } from "src/utils/package-manager";

/**
 * @description
 * CLI의 진입점입니다.
 *
 * 실행 순서:
 * 1. Node.js 버전 검증 (>= 24)
 * 2. 인터랙티브 프롬프트 실행 (프로젝트명, 디자인 시스템 선택)
 * 3. 패키지 매니저 자동 감지
 * 4. 프로젝트 스캐폴딩 (template 복사, 파일 생성, 의존성 패치)
 * 5. 의존성 설치
 * 6. 완료 메시지 출력
 *
 * @example
 * pnpm create @bigtablet/create-frontend
 * pnpm create @bigtablet/create-frontend my-app
 */
const main = async (): Promise<void> => {
	const [nodeMajorVersion] = process.versions.node.split(".").map(Number);

	if (nodeMajorVersion < 24) {
		console.error("Node.js 24 이상이 필요합니다.");
		process.exit(1);
	}

	const initialProjectName = process.argv[2];

	const projectConfig = await runPrompts(initialProjectName);

	const packageManagerInfo = detectPackageManager();

	const targetDirectory = await scaffoldProject(
		projectConfig.projectName,
		projectConfig.templateName,
		packageManagerInfo,
	);

	installDependencies(targetDirectory, packageManagerInfo);

	log.success("프로젝트가 생성됐습니다.");

	outro(
		`다음 단계:\n  cd ${projectConfig.projectName}\n  ${getDevCommand(packageManagerInfo.name)}`,
	);
};

main().catch((error: unknown) => {
	console.error("오류가 발생했습니다:", error);
	process.exit(1);
});
