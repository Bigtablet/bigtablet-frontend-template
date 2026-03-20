"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { toast } from "sonner";

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

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * @description
 * 로그인 페이지의 비즈니스 로직을 담당하는 커스텀 훅입니다. (shadcn/ui 버전)
 *
 * sonner의 toast()를 사용합니다. (@bigtablet/design-system의 useToast 미사용)
 *
 * @returns 폼 데이터, 에러, 핸들러, 제출 함수, 로딩 상태
 */
const useSignin = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const signinMutation = useSigninMutation();

	const [signinFormData, setSigninFormData] = useState<SigninSchema>({ email: "", password: "" });
	const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

	const handleSigninFieldChange = useCallback((field: keyof SigninSchema, value: string) => {
		setSigninFormData((previous) => ({ ...previous, [field]: value }));
		setFieldErrors((previous) => ({ ...previous, [field]: "" }));
	}, []);

	const validateSigninForm = useCallback((data: SigninSchema): FieldErrors => {
		const errors: FieldErrors = {};
		if (!data.email?.trim()) errors.email = "이메일을 입력해주세요.";
		else if (!EMAIL_REGEX.test(data.email)) errors.email = "올바른 이메일 형식이 아닙니다.";
		if (!data.password?.trim()) errors.password = "비밀번호를 입력해주세요.";
		return errors;
	}, []);

	const submitSigninForm = useCallback(() => {
		const validationResult = validateSigninForm(signinFormData);
		if (validationResult.email || validationResult.password) {
			setFieldErrors(validationResult);
			toast.info(validationResult.email ?? validationResult.password);
			return;
		}

		(async () => {
			try {
				const authResponse = await signinMutation.mutateAsync(signinFormData);
				const tokenPayload = authResponse as TokenPayload;
				const accessToken = tokenPayload.accessToken ?? tokenPayload.data?.accessToken;
				const refreshToken = tokenPayload.refreshToken ?? tokenPayload.data?.refreshToken;

				if (!accessToken || !refreshToken) {
					toast.error("토큰이 없습니다. 관리자에게 문의하세요.");
					return;
				}

				Token.setToken(ACCESS_TOKEN, accessToken);
				Token.setToken(REFRESH_TOKEN, refreshToken);
				toast.success("로그인에 성공했습니다.");

				const redirectPath = searchParams.get("redirect") ?? "/main";
				// Validate redirect URL to prevent open redirects
				if (redirectPath.startsWith("/") && !redirectPath.includes("//")) {
					router.replace(redirectPath);
				} else {
					router.replace("/main");
				}
			} catch {
				setFieldErrors({ email: "", password: "이메일 또는 비밀번호가 올바르지 않습니다." });
				toast.error("이메일 또는 비밀번호가 올바르지 않습니다.");
			}
		})();
	}, [signinFormData, signinMutation, router, searchParams, validateSigninForm]);

	const handleKeyboardEnterSubmit = useCallback(
		(event: React.KeyboardEvent<HTMLInputElement>) => {
			if (event.key === "Enter") {
				event.preventDefault();
				submitSigninForm();
			}
		},
		[submitSigninForm],
	);

	return {
		signinFormData,
		fieldErrors,
		handleSigninFieldChange,
		handleKeyboardEnterSubmit,
		submitSigninForm,
		isSubmitting: signinMutation.isPending,
	};
};

export default useSignin;
