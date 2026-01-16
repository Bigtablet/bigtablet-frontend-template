import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    sassOptions: {
        includePaths: ["./src/shared/styles"],
    },

    async redirects() {
        return [
            { source: '/', destination: '/signin', permanent: true },
        ];
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
