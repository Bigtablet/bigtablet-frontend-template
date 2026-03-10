"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type ReactNode, useState } from "react";
import { Toaster } from "sonner";

import { createMutationCache } from "src/shared/libs/api/query/mutation-cache";
import { ModalRenderer } from "src/shared/libs/modal";

type ProviderProps = { children: ReactNode };

/**
 * @description
 * 앱 전체에 걸쳐 사용되는 전역 Provider들을 합성하는 컴포넌트입니다. (shadcn/ui 버전)
 *
 * Provider 체인 순서:
 * 1. QueryClientProvider - 서버 상태 관리 (React Query)
 * 2. Toaster - sonner 토스트 알림 렌더링
 * 3. ModalRenderer - 전역 모달 스택 렌더링
 *
 * @remarks
 * toast 호출은 sonner의 toast() 함수를 직접 사용합니다.
 * import { toast } from "sonner";
 */
const Providers = ({ children }: ProviderProps) => {
	const [queryClient] = useState(
		() =>
			new QueryClient({
				mutationCache: createMutationCache(),
				defaultOptions: {
					queries: {
						staleTime: 1000 * 30,
						gcTime: 1000 * 60 * 5,
						refetchOnWindowFocus: true,
						refetchOnReconnect: true,
						refetchOnMount: "always",
						retry: 1,
					},
					mutations: {
						retry: 0,
					},
				},
			}),
	);

	return (
		<QueryClientProvider client={queryClient}>
			<Toaster richColors position="top-right" />
			<ModalRenderer />
			{children}
		</QueryClientProvider>
	);
};

export default Providers;
