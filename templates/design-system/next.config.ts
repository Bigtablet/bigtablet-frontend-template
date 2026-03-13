import type { NextConfig } from "next";

/**
 * @description
 * Next.js 설정 파일입니다.
 *
 * - output: "standalone" - Docker 컨테이너 배포를 위한 독립 실행형 빌드 출력
 * - sassOptions: SCSS 공통 스타일 경로 설정
 * - redirects: 루트 경로를 로그인 페이지로 영구 리다이렉트
 * - images: GCS(Google Cloud Storage) 원격 이미지 도메인 허용
 */
const nextConfig: NextConfig = {
	output: "standalone",
	sassOptions: {
		includePaths: ["./src/shared/styles"],
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
