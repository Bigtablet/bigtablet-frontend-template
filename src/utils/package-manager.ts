/**
 * @description
 * 패키지 매니저 감지 및 실행 명령어 관련 유틸리티 모듈입니다.
 * npm_config_user_agent 환경변수를 파싱하여 패키지 매니저를 자동 감지합니다.
 */

export type PackageManagerName = "pnpm" | "yarn" | "npm";

/**
 * @description
 * 패키지 매니저의 이름, 버전, 설치 명령어를 묶은 타입입니다.
 *
 * @property name - 패키지 매니저 이름
 * @property version - 감지된 버전 문자열 (감지 실패 시 빈 문자열)
 * @property installCommand - 의존성 설치 명령어
 */
export type PackageManagerInfo = {
	name: PackageManagerName;
	version: string;
	installCommand: string;
};

/**
 * @description
 * npm_config_user_agent 환경변수를 파싱하여 현재 사용 중인 패키지 매니저를 감지합니다.
 * 감지에 실패할 경우 npm을 기본값으로 반환합니다.
 *
 * @returns 패키지 매니저 이름, 버전, 설치 명령어를 포함한 객체
 */
export const detectPackageManager = (): PackageManagerInfo => {
	const userAgent = process.env.npm_config_user_agent ?? "";

	const name: PackageManagerName = userAgent.includes("pnpm")
		? "pnpm"
		: userAgent.includes("yarn")
			? "yarn"
			: "npm";

	const versionMatch = userAgent.match(new RegExp(`${name}/(\\S+)`));
	const version = versionMatch?.[1]?.split(" ")[0] ?? "";

	const installCommand = name === "yarn" ? "yarn install" : `${name} install`;

	return { name, version, installCommand };
};

/**
 * @description
 * 개발 서버 실행 명령어를 반환합니다.
 *
 * @param packageManagerName - 패키지 매니저 이름
 * @returns dev 스크립트 실행 명령어 문자열
 */
export const getDevCommand = (packageManagerName: PackageManagerName): string =>
	packageManagerName === "npm" ? "npm run dev" : `${packageManagerName} dev`;
