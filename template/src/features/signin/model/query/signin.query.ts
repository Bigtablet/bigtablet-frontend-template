import {useMutation} from "@tanstack/react-query";
import {signinApi} from "src/entities/signin/api/signin.api";
import type {SigninSchema} from "src/entities/signin/schema/signin.schema";
import {AuthQueryKeys} from "src/features/signin/model/query/keys";

/**
 * 로그인 요청 useMutation
 */
export const useSigninMutation = () => {
    return useMutation({
        mutationKey: AuthQueryKeys.signin,
        mutationFn: async (body: SigninSchema) => {
            return await signinApi(body);
        },
    });
};