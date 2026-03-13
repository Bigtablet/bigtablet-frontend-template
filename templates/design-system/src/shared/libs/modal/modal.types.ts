import type { ComponentType } from "react";

/**
 * @description
 * 모달 아이템의 고유 식별자 타입입니다.
 * crypto.randomUUID()로 생성됩니다.
 */
export type ModalIdentifier = string;

/**
 * @description
 * 모달 스택에 쌓이는 단일 모달 아이템 구조입니다.
 *
 * @property identifier - 모달을 고유하게 식별하는 UUID
 * @property component - 렌더링할 React 컴포넌트
 * @property props - 컴포넌트에 전달할 props (선택)
 */
export type ModalItem = {
	identifier: ModalIdentifier;
	component: ComponentType<Record<string, unknown>>;
	props?: Record<string, unknown>;
};

/**
 * @description
 * Zustand 모달 스토어의 상태 및 액션 타입입니다.
 *
 * @property modalStack - 현재 열려 있는 모달 목록 (LIFO 스택 구조)
 * @property openModal - 새 모달을 스택 최상단에 추가합니다
 * @property replaceModal - 스택 최상단 모달을 새 모달로 교체합니다
 * @property closeModal - 스택 최상단 모달을 닫습니다
 * @property closeAllModals - 스택의 모든 모달을 닫습니다
 */
export type ModalStore = {
	modalStack: ModalItem[];
	openModal: (
		component: ComponentType<Record<string, unknown>>,
		props?: Record<string, unknown>,
	) => void;
	replaceModal: (
		component: ComponentType<Record<string, unknown>>,
		props?: Record<string, unknown>,
	) => void;
	closeModal: () => void;
	closeAllModals: () => void;
};
