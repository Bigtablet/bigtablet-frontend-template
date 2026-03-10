/**
 * @description
 * 전역 모달 시스템의 진입점입니다.
 *
 * 제공하는 모듈:
 * - useModalStore: 모달 열기/닫기를 제어하는 Zustand 스토어 훅
 * - ModalRenderer: 모달 스택을 DOM에 렌더링하는 컴포넌트 (Providers에서 사용)
 * - 타입: ModalItem, ModalStore, ModalIdentifier
 */
export { useModalStore } from "src/shared/libs/modal/modal.store";
export { default as ModalRenderer } from "src/shared/libs/modal/modal.renderer";
export type {
	ModalItem,
	ModalStore,
	ModalIdentifier,
} from "src/shared/libs/modal/modal.types";
