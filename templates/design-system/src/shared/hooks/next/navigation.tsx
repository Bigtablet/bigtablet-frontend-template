"use client";

import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

/**
 * @typedef {Object} NavigationContextValue
 * @property {boolean} isLoading - 현재 네비게이션 로딩 상태
 * @property {Function} setLoading - 로딩 상태를 변경하는 함수
 * @description 네비게이션 컨텍스트의 값 타입
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
 * @function BigtabletNavigation
 * @description 네비게이션 로딩 상태를 관리하는 컨텍스트 프로바이더 컴포넌트
 * 경로 변경 시 로딩 상태를 자동으로 초기화합니다.
 * @param {Object} props - 컴포넌트 props
 * @param {React.ReactNode} props.children - 자식 요소
 * @returns {JSX.Element} 컨텍스트 프로바이더로 감싼 자식 요소
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
 * @function useNavigationStore
 * @description 네비게이션 컨텍스트에서 로딩 상태와 상태 변경 함수를 조회합니다.
 * @returns {NavigationContextValue} 로딩 상태와 setLoading 함수를 포함하는 객체
 */
export const useNavigationStore = () => useContext(NavigationContext);
