"use client";

import { AlertProvider, ToastProvider } from "@bigtablet/design-system";
import { QueryClientProvider } from "@tanstack/react-query";
import { type ReactNode, useState } from "react";

import { createDefaultQueryClient } from "src/shared/libs/api/query/create-query-client";
import useBfcacheRefresh from "src/shared/libs/api/query/use-bfcache-refresh";
import ToastBridgeProvider from "src/shared/libs/api/toast/toast-bridge-provider";
import { ModalRenderer } from "src/shared/libs/modal";

type ProviderProps = { children: ReactNode };

/**
 * @description
 * 앱 전체에 걸쳐 사용되는 전역 Provider들을 합성하는 컴포넌트입니다.
 *
 * Provider 체인 순서:
 * 1. QueryClientProvider - 서버 상태 관리 (React Query). 기본 설정은 `createDefaultQueryClient` 단일 소스.
 * 2. AlertProvider - 디자인 시스템 Alert
 * 3. ToastProvider - 디자인 시스템 Toast UI 렌더링
 * 4. ToastBridgeProvider - React 트리 외부(MutationCache)에서 Toast 사용 가능하게 연결
 * 5. ModalRenderer - 전역 모달 스택 렌더링
 *
 * `useBfcacheRefresh` 로 bfcache 복원 시 쿼리를 invalidate 한다 (OAuth 후 뒤로 가기 skeleton stuck 방지).
 */
const Providers = ({ children }: ProviderProps) => {
	const [queryClient] = useState(() => createDefaultQueryClient());

	useBfcacheRefresh(queryClient);

	return (
		<QueryClientProvider client={queryClient}>
			<AlertProvider>
				<ToastProvider>
					<ToastBridgeProvider />
					<ModalRenderer />
					{children}
				</ToastProvider>
			</AlertProvider>
		</QueryClientProvider>
	);
};

export default Providers;
