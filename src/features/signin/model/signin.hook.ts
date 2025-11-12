"use client";

import { useCallback, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SigninSchema } from "src/entities/signin/schema/signin.schema";
import { useSigninMutation } from "src/features/signin/model/query/signin.query";
import { useToast } from "src/shared/ui/feedback/toast/useToast";
import Token from "src/shared/libs/api/cookie";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "src/entities/signin/constants/signin.constants";

type FieldErrors = Partial<Record<keyof SigninSchema, string>>;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const useSignin = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const toast = useToast();

    const signinMutation = useSigninMutation();
    const [signinData, setSigninData] = useState<SigninSchema>({ email: "", password: "" });
    const [errors, setErrors] = useState<FieldErrors>({});

    const handleSigninData = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSigninData(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: "" }));
    }, []);

    const validate = useCallback((data: SigninSchema): FieldErrors => {
        const nextErrors: FieldErrors = {};
        if (!data.email?.trim()) nextErrors.email = "Please enter your email.";
        else if (!EMAIL_RE.test(data.email)) nextErrors.email = "Please enter a valid email.";
        if (!data.password?.trim()) nextErrors.password = "Please enter your password.";
        return nextErrors;
    }, []);

    const extractTokens = (res: any) => {
        const a = res?.accessToken ?? res?.data?.accessToken;
        const r = res?.refreshToken ?? res?.data?.refreshToken;
        return { accessToken: a, refreshToken: r };
    };

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
                const { accessToken, refreshToken } = extractTokens(res);

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

    const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            submitSigninData();
        }
    }, [submitSigninData]);

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