import type { NextConfig } from "next";

/**
 * @description
 * Next.js 설정 파일입니다. (shadcn/ui 버전)
 *
 * - output: "standalone" - Docker 컨테이너 배포를 위한 독립 실행형 빌드 출력
 * - redirects: 루트 경로를 로그인 페이지로 영구 리다이렉트
 * - images: GCS(Google Cloud Storage) 원격 이미지 도메인 허용
 *
 * @remarks
 * sassOptions를 제거했습니다. shadcn/ui는 Tailwind CSS를 사용합니다.
 */
const nextConfig: NextConfig = {
	output: "standalone",

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
