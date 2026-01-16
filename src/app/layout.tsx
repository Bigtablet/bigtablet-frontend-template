import "src/app/global.css";
import Providers from "src/widgets/layouts/provider";
import "@bigtablet/design-system/style.css";
import "src/shared/styles/token.scss";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Bigtablet",
    description: "Bigtablet's Template",
};

export const dynamic = "force-dynamic";

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