"use client";

import { useToast } from "@bigtablet/design-system";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "src/entities/sign-in/constants/sign-in.constants";
import type { SigninSchema } from "src/entities/sign-in/schema/sign-in.schema";
import { useSigninMutation } from "src/features/sign-in/mutation/sign-in.mutation";
import Token from "src/shared/libs/api/cookie";

type FieldErrors = Partial<Record<keyof SigninSchema, string>>;
type TokenPayload = {
	accessToken?: string;
	refreshToken?: string;
	data?: {
		accessToken?: string;
		refreshToken?: string;
	};
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * @description 로그인 흐름을 관리하는 훅입니다. 로그인 요청, 토큰 저장, 라우팅을 처리합니다.
 * @returns {Object} 로그인 관련 상태와 핸들러들
 * @returns {SigninSchema} signinData - 현재 입력된 로그인 데이터
 * @returns {FieldErrors} errors - 필드별 유효성 검사 에러
 * @returns {Function} handleSigninData - 로그인 데이터를 업데이트하는 함수
 * @returns {Function} handleKeyDown - 엔터 키 입력을 처리하는 함수
 * @returns {Function} submitSigninData - 로그인 데이터를 서버에 전송하는 함수
 * @returns {boolean} isLoading - 로그인 요청 진행 중 여부
 */
const useSignin = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const toast = useToast();

	const signinMutation = useSigninMutation();
	const [signinData, setSigninData] = useState<SigninSchema>({ email: "", password: "" });
	const [errors, setErrors] = useState<FieldErrors>({});

	const handleSigninData = useCallback((field: keyof SigninSchema, value: string) => {
		setSigninData((prev) => ({ ...prev, [field]: value }));
		setErrors((prev) => ({ ...prev, [field]: "" }));
	}, []);

	const validate = useCallback((data: SigninSchema): FieldErrors => {
		const nextErrors: FieldErrors = {};
		if (!data.email?.trim()) nextErrors.email = "Please enter your email.";
		else if (!EMAIL_RE.test(data.email)) nextErrors.email = "Please enter a valid email.";
		if (!data.password?.trim()) nextErrors.password = "Please enter your password.";
		return nextErrors;
	}, []);

	const submitSigninData = useCallback(async () => {
		const validationResult = validate(signinData);
		if (validationResult.email || validationResult.password) {
			setErrors(validationResult);
			const firstMsg = validationResult.email || validationResult.password;
			if (firstMsg) toast.info(firstMsg);
			return;
		}

		try {
			const authResponse = await signinMutation.mutateAsync(signinData);
			const payload = authResponse as TokenPayload;
			const accessToken = payload.accessToken ?? payload.data?.accessToken;
			const refreshToken = payload.refreshToken ?? payload.data?.refreshToken;

			if (!accessToken || !refreshToken) {
				toast.error("Token missing in response.");
				return;
			}

			Token.setToken(ACCESS_TOKEN, accessToken);
			Token.setToken(REFRESH_TOKEN, refreshToken);

			toast.success("Signin successful.");

			const redirect = searchParams.get("redirect");

			// Validate redirect URL to prevent open redirects.
			// It must be a relative path starting with a single '/'.
			if (redirect && redirect.startsWith("/") && !redirect.startsWith("//")) {
				router.replace(redirect);
			} else {
				router.replace("/main");
			}
		} catch {
			setErrors({
				email: "",
				password: "Invalid email or password. Please try again.",
			});
			toast.error("Invalid email or password. Please try again.");
		}
	}, [signinData, signinMutation, router, toast, validate, searchParams]);

	const handleKeyDown = useCallback(
		(e: React.KeyboardEvent<HTMLInputElement>) => {
			if (e.key === "Enter") {
				e.preventDefault();
				submitSigninData();
			}
		},
		[submitSigninData],
	);

	return {
		signinData,
		errors,
		handleSigninData,
		handleKeyDown,
		submitSigninData,
		isLoading: signinMutation.isPending,
	};
};

export default useSignin;
