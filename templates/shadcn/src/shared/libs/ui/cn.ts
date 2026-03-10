import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * @description
 * Tailwind CSS 클래스를 조건부로 결합하는 유틸리티 함수입니다.
 *
 * 동작 방식:
 * 1. clsx로 조건부 클래스 처리 (falsy 값 제거)
 * 2. tailwind-merge로 충돌하는 Tailwind 클래스 병합 (마지막 값 우선)
 *
 * @param classValues - 결합할 클래스 값들 (문자열, 배열, 객체 모두 가능)
 * @returns 최종 병합된 클래스 문자열
 *
 * @example
 * cn("px-4 py-2", isActive && "bg-blue-500", "px-2")
 * // → "py-2 bg-blue-500 px-2" (px-4가 px-2로 덮어씌워짐)
 */
export const cn = (...classValues: ClassValue[]): string => twMerge(clsx(classValues));
