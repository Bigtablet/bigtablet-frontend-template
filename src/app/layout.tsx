import "src/shared/styles/global.scss";
import { cookies } from "next/headers";
import Providers from "src/widgets/layouts/provider";
import "src/shared/styles/color/_sementic.scss";
import "src/shared/styles/typography/_mixin.scss";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Bigtablet",
    description: "Bigtablet's Template",
};

export const dynamic = "force-dynamic";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const store = await cookies();

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