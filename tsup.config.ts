import { defineConfig } from "tsup";

/**
 * @description
 * tsup 빌드 설정입니다.
 *
 * - entry: src/index.ts → bin/create-bigtablet-frontend.js 로 컴파일
 * - format: ESM (package.json의 "type": "module"과 일치)
 * - target: Node.js 24 이상
 * - clean: 빌드 전 bin/ 디렉토리 초기화
 * - banner: 출력 파일 최상단에 Node.js 실행 shebang 자동 삽입
 */
export default defineConfig({
	entry: {
		"create-bigtablet-frontend": "src/index.ts",
	},
	outDir: "bin",
	format: ["esm"],
	target: "node24",
	clean: true,
	banner: {
		js: "#!/usr/bin/env node",
	},
});
