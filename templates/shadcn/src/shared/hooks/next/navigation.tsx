"use client";

import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

/**
 * @description 네비게이션 로딩 상태 Context 타입입니다.
 */
type NavigationContextValue = {
	isLoading: boolean;
	setLoading: (value: boolean) => void;
};

const NavigationContext = createContext<NavigationContextValue>({
	isLoading: false,
	setLoading: () => {},
});

/**
 * @description 페이지 전환 로딩 상태를 관리하는 Provider 컴포넌트입니다.
 * - BigtabletRouter에서 push/replace 시 isLoading을 true로 설정
 * - pathname이 변경되면 자동으로 isLoading을 false로 초기화
 *
 * @param {Object} props - 컴포넌트 props
 * @param {React.ReactNode} props.children - 자식 컴포넌트
 * @returns {JSX.Element} 로딩 상태를 제공하는 Context Provider
 */
export const BigtabletNavigation = ({ children }: { children: React.ReactNode }) => {
	const [isLoading, setIsLoading] = useState(false);
	const pathname = usePathname();

	const setLoading = (value: boolean) => {
		setIsLoading(value);
	};

	useEffect(() => {
		if (pathname) {
			setIsLoading(false);
		}
	}, [pathname]);

	return (
		<NavigationContext.Provider value={{ isLoading, setLoading }}>
			{children}
		</NavigationContext.Provider>
	);
};

/**
 * @description 네비게이션 로딩 상태를 구독하는 훅입니다.
 * - BigtabletNavigation Provider 내부에서 사용해야 함
 *
 * @returns {NavigationContextValue} 로딩 상태와 setter 함수
 */
export const useNavigationStore = () => useContext(NavigationContext);
