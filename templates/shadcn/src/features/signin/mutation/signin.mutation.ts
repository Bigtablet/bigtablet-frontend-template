import { useMutation } from "@tanstack/react-query";
import { signinApi } from "src/entities/signin/api/signin.api";
import type { SigninSchema } from "src/entities/signin/schema/signin.schema";
import { AuthMutationKeys } from "src/features/signin/mutation/keys";

/**
 * 로그인 요청 useMutation
 */
export const useSigninMutation = () => {
	return useMutation({
		mutationKey: AuthMutationKeys.signin,
		mutationFn: signinApi,
	});
};
