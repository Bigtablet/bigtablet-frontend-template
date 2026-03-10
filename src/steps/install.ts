import { execSync } from "node:child_process";
import { spinner } from "@clack/prompts";

import type { PackageManagerInfo } from "src/utils/package-manager";

/**
 * @description
 * 생성된 프로젝트 디렉토리에서 의존성을 설치합니다.
 *
 * @clack/prompts 스피너를 통해 설치 진행 상황을 표시합니다.
 * 설치 실패 시 에러를 상위로 전파하여 메인 프로세스가 핸들링합니다.
 *
 * @param targetDirectory - 의존성을 설치할 프로젝트 경로
 * @param packageManagerInfo - 사용할 패키지 매니저 정보
 */
export const installDependencies = (
	targetDirectory: string,
	packageManagerInfo: PackageManagerInfo,
): void => {
	const installationSpinner = spinner();

	installationSpinner.start(`${packageManagerInfo.name}으로 의존성을 설치하는 중...`);

	try {
		execSync(packageManagerInfo.installCommand, {
			cwd: targetDirectory,
			stdio: "pipe",
		});
		installationSpinner.stop("의존성 설치 완료");
	} catch (error) {
		installationSpinner.stop("의존성 설치 실패");
		throw error;
	}
};
