"use client";

import { useToast } from "@bigtablet/design-system";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "src/entities/signin/constants/signin.constants";
import type { SigninSchema } from "src/entities/signin/schema/signin.schema";
import { useSigninMutation } from "src/features/signin/mutation/signin.mutation";
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

	const submitSigninData = useCallback(() => {
		const v = validate(signinData);
		if (v.email || v.password) {
			setErrors(v);
			const firstMsg = v.email || v.password;
			if (firstMsg) toast.info(firstMsg);
			return;
		}

		signinMutation.mutate(signinData, {
			onSuccess: (res) => {
				const payload = res as TokenPayload;
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
				router.replace(redirect || "/main");
			},
			onError: () => {
				setErrors({
					email: "",
					password: "Invalid email or password. Please try again.",
				});
				toast.error("Invalid email or password. Please try again.");
			},
		});
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
