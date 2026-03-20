import { cancel, intro, isCancel, select, text } from "@clack/prompts";
import fs from "node:fs";
import path from "node:path";

/**
 * @description
 * 사용자가 선택 가능한 디자인 시스템 종류입니다.
 *
 * - design-system: @bigtablet/design-system (SCSS 기반 사내 컴포넌트)
 * - shadcn: shadcn/ui (Tailwind CSS + Radix UI)
 */
export type DesignSystemChoice = "design-system" | "shadcn";

/**
 * @description
 * CLI 프롬프트에서 수집한 프로젝트 설정을 담는 타입입니다.
 *
 * @property projectName - 생성할 프로젝트 디렉토리 이름
 * @property designSystem - 선택된 디자인 시스템
 */
export type ProjectConfig = {
	projectName: string;
	designSystem: DesignSystemChoice;
};

/**
 * @description
 * CLI 인터랙티브 프롬프트를 실행하고 사용자 입력을 수집합니다.
 *
 * 수집 항목:
 * 1. 프로젝트 이름 (process.argv[2]로 사전 입력 가능)
 * 2. 디자인 시스템 선택
 *
 * Ctrl+C 또는 취소 선택 시 프로세스를 종료합니다.
 *
 * @param initialProjectName - CLI 인자로 받은 초기 프로젝트 이름 (선택)
 * @returns 사용자가 입력한 프로젝트 설정 객체
 */
export const runPrompts = async (initialProjectName?: string): Promise<ProjectConfig> => {
	intro("@bigtablet/create-frontend");

	const projectName = await text({
		message: "프로젝트 이름을 입력하세요:",
		placeholder: "my-app",
		initialValue: initialProjectName,
		validate: (value = "") => {
			if (!value.trim()) return "프로젝트 이름이 필요합니다.";
			if (fs.existsSync(path.resolve(process.cwd(), value))) {
				return `"${value}" 디렉토리가 이미 존재합니다.`;
			}
		},
	});

	if (isCancel(projectName)) {
		cancel("작업이 취소됐습니다.");
		process.exit(0);
	}

	const designSystem = await select({
		message: "디자인 시스템을 선택하세요:",
		options: [
			{
				value: "design-system",
				label: "@bigtablet/design-system",
				hint: "Bigtablet 사내 컴포넌트 (SCSS)",
			},
			{
				value: "shadcn",
				label: "shadcn/ui",
				hint: "Tailwind CSS v4 + Radix UI",
			},
		],
	});

	if (isCancel(designSystem)) {
		cancel("작업이 취소됐습니다.");
		process.exit(0);
	}

	return {
		projectName: projectName as string,
		designSystem: designSystem as DesignSystemChoice,
	};
};
