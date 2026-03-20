import type { Metadata } from "next";

import "src/app/globals.css";
import Providers from "src/widgets/layouts/provider";

export const metadata: Metadata = {
	title: "Bigtablet",
	description: "Bigtablet's Template",
};

export const dynamic = "force-dynamic";

/**
 * @description
 * 애플리케이션 루트 레이아웃입니다.
 *
 * - `Providers`로 전역 상태/UI 컨텍스트를 래핑
 * - `id="modal"` 포탈 엘리먼트를 body에 마운트
 * - `force-dynamic` 설정으로 SSG 비활성화
 *
 * @param children - 페이지 컴포넌트
 */
export default async function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="ko" suppressHydrationWarning>
			<head>
				<link rel="icon" href="/images/logo/favicon.png" />
			</head>
			<body>
				<div id="modal" />
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
