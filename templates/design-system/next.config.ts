import type { NextConfig } from "next";

/**
 * @description
 * Next.js 설정 파일입니다.
 *
 * - output: "standalone" - Docker 컨테이너 배포를 위한 독립 실행형 빌드 출력
 * - poweredByHeader: `x-powered-by: Next.js` 헤더 제거
 * - reactCompiler: React Compiler 로 자동 메모이제이션 (useMemo/useCallback 수동 작성 불필요)
 * - sassOptions: SCSS 공통 스타일 경로 설정. charset: false 는 dart-sass 가 non-ASCII 출력에
 *   붙이는 BOM 을 끈다 - Next 16.3.2+ CSS 파서가 BOM 을 거부해 빌드가 죽는다
 * - redirects: 루트 경로를 로그인 페이지로 영구 리다이렉트
 * - images: GCS(Google Cloud Storage) 원격 이미지 도메인 허용
 */
const nextConfig: NextConfig = {
	output: "standalone",
	poweredByHeader: false,
	reactCompiler: true,
	sassOptions: {
		includePaths: ["./src/shared/styles"],
		charset: false,
	},

	async redirects() {
		return [{ source: "/", destination: "/signin", permanent: true }];
	},

	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "storage.googleapis.com",
				port: "",
				pathname: "/bigtablet-homepage/**",
			},
		],
	},
};

export default nextConfig;
