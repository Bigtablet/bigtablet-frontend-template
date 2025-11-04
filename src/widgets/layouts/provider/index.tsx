"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type ReactNode, useState } from "react";
import { ToastContainer } from "react-toastify"

type Props = { children: ReactNode };

const Providers = ({children}: Props) => {
    const [client] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {retry: 1},
                },
            })
    );

    return (
        <QueryClientProvider client={client}>
            <ToastContainer/>
            {children}
        </QueryClientProvider>
    );
}

export default Providers;