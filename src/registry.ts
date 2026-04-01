import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

/**
 * @description
 * 템플릿 플러그인 정의입니다.
 *
 * 새 템플릿을 추가하려면:
 * 1. `templates/{name}/` 폴더에 Next.js 프로젝트를 넣는다
 * 2. 이 파일의 `TEMPLATES` 배열에 항목을 추가한다
 * 3. 끝 (prompt.ts, scaffold.ts 수정 불필요)
 */
export type TemplateDefinition = {
	/** 내부 식별자. templates/ 하위 폴더명과 일치해야 합니다. */
	name: string;
	/** CLI 선택 목록에 표시되는 이름 */
	label: string;
	/** CLI 선택 목록에 표시되는 힌트 */
	hint: string;
	/**
	 * 조건부 활성화 함수. 반환값이 false면 CLI 선택지에 표시되지 않습니다.
	 * 미설정 시 항상 표시됩니다.
	 *
	 * @example
	 * // 환경변수가 설정된 경우에만 노출 (실험적 템플릿 등)
	 * isEnabled: () => process.env.BIGTABLET_EXPERIMENTAL === "true"
	 */
	isEnabled?: () => boolean;
	/**
	 * 스캐폴딩 완료 후 실행되는 후처리 함수.
	 * 템플릿별 커스텀 파일 생성, 설정 패치 등에 사용합니다.
	 *
	 * @param targetDir - 생성된 프로젝트의 절대 경로
	 */
	afterScaffold?: (targetDir: string) => Promise<void> | void;
};

// ─── 템플릿 목록 ────────────────────────────────────────────────────────────────
// 새 템플릿 추가: 아래 배열에 항목만 추가하면 됩니다.

const TEMPLATES: TemplateDefinition[] = [
	{
		name: "design-system",
		label: "@bigtablet/design-system",
		hint: "Bigtablet 사내 컴포넌트 (SCSS)",
	},
	{
		name: "shadcn",
		label: "shadcn/ui",
		hint: "Tailwind CSS v4 + Radix UI",
	},
];

// ─── 레지스트리 API ──────────────────────────────────────────────────────────────

let cachedTemplates: TemplateDefinition[] | null = null;

/**
 * 활성화된 템플릿 목록을 반환합니다.
 * `isEnabled()`가 false를 반환하는 템플릿은 제외됩니다.
 * 결과는 프로세스 내에서 메모이즈됩니다.
 */
export function getTemplates(): TemplateDefinition[] {
	if (cachedTemplates !== null) return cachedTemplates;

	cachedTemplates = TEMPLATES.filter((t) => {
		if (typeof t.isEnabled === "function") return t.isEnabled();
		return true;
	});

	return cachedTemplates;
}

/**
 * 이름으로 템플릿을 찾습니다.
 */
export function findTemplate(name: string): TemplateDefinition | undefined {
	return getTemplates().find((t) => t.name === name);
}

/**
 * 템플릿 파일이 위치한 절대 경로를 반환합니다.
 */
export function getTemplateDir(templateName: string): string {
	const currentFilename = fileURLToPath(import.meta.url);
	const cliRoot = path.resolve(path.dirname(currentFilename), "..");
	return path.resolve(cliRoot, "templates", templateName);
}

/**
 * 템플릿이 실제로 디스크에 존재하는지 확인합니다.
 */
export function templateExists(templateName: string): boolean {
	return fs.existsSync(getTemplateDir(templateName));
}

/** 테스트용: 캐시를 초기화합니다. */
export function _resetTemplateCache(): void {
	cachedTemplates = null;
}
