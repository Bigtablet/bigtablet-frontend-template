import { cancel, intro, isCancel, select, text } from "@clack/prompts";
import fs from "node:fs";
import path from "node:path";
import { getTemplates } from "src/registry";

/**
 * @description
 * CLI 프롬프트에서 수집한 프로젝트 설정을 담는 타입입니다.
 *
 * @property projectName - 생성할 프로젝트 디렉토리 이름
 * @property templateName - 선택된 템플릿 이름 (registry의 TemplateDefinition.name)
 */
export type ProjectConfig = {
	projectName: string;
	templateName: string;
};

/**
 * @description
 * CLI 인터랙티브 프롬프트를 실행하고 사용자 입력을 수집합니다.
 *
 * 수집 항목:
 * 1. 프로젝트 이름 (process.argv[2]로 사전 입력 가능)
 * 2. 템플릿 선택 (registry에 등록된 항목을 동적으로 표시)
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

	const templates = getTemplates();
	const templateName = await select({
		message: "템플릿을 선택하세요:",
		options: templates.map((t) => ({
			value: t.name,
			label: t.label,
			hint: t.hint,
		})),
	});

	if (isCancel(templateName)) {
		cancel("작업이 취소됐습니다.");
		process.exit(0);
	}

	return {
		projectName: projectName as string,
		templateName: templateName as string,
	};
};
