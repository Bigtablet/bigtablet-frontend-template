import "src/app/global.css";
import Providers from "src/widgets/layouts/provider";
import "@bigtablet/design-system/style.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Bigtablet",
	description: "Bigtablet's Template",
};

export const dynamic = "force-dynamic";

/**
 * @description
 * 전체 애플리케이션의 루트 레이아웃 컴포넌트입니다.
 * Providers로 자식 컴포넌트를 감싸고, 모달 포탈 마운트 지점을 제공하며, force-dynamic으로 설정되어 있습니다.
 */
export default async function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<link rel="icon" href="/images/logo/favicon.png" />
			</head>
			<body className="font-sans antialiased">
				<div id="modal" />
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
