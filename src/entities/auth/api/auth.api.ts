import axios from "axios";
import type {
    SigninSchema,
    SignupSchema,
    AuthResponseSchema,
    RefreshRequestSchema,
    RefreshResponseSchema,
} from "src/entities/auth/schema/auth.schema";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export const signinApi = async (signin: SigninSchema): Promise<AuthResponseSchema> => {
    const {data} = await axios.post<AuthResponseSchema>(`${SERVER_URL}/auth/sign-in`, signin);
    return data;
};

export const signupApi = async (signup: SignupSchema): Promise<AuthResponseSchema> => {
    const {data} = await axios.post<AuthResponseSchema>(`${SERVER_URL}/auth/sign-up`, signup);
    return data;
}

export const refreshApi = async (refresh: RefreshRequestSchema): Promise<RefreshResponseSchema> => {
    const {data} = await axios.post<RefreshResponseSchema>(`${SERVER_URL}/auth/refresh`, refresh);
    return data;
}