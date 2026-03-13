"use client";

import { useToast } from "@bigtablet/design-system";
import { useEffect } from "react";

import { setToastRef } from "./toast-bridge";

/**
 * @description
 * React 트리 외부(MutationCache 등)에서 Toast를 호출할 수 있도록
 * useToast 훅의 반환값을 전역 브릿지에 등록하는 컴포넌트입니다.
 *
 * 렌더링 조건:
 * - ToastProvider 하위에 위치해야 useToast를 정상적으로 사용할 수 있습니다.
 * - Providers 컴포넌트 내부에 포함되어야 합니다.
 *
 * @example
 * // widgets/layouts/provider/index.tsx 에서 사용
 * <ToastProvider />
 * <ToastBridgeProvider />
 */
const ToastBridgeProvider = () => {
	const toastControls = useToast();

	useEffect(() => {
		setToastRef(toastControls);
	}, [toastControls]);

	return null;
};

export default ToastBridgeProvider;
