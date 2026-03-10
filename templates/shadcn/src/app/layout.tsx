import type { Metadata } from "next";

import "src/app/globals.css";
import Providers from "src/widgets/layouts/provider";

export const metadata: Metadata = {
	title: "Bigtablet",
	description: "Bigtablet's Template",
};

export const dynamic = "force-dynamic";

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
