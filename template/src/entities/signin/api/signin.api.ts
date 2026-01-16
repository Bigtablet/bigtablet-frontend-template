import axios from "axios";
import {
    AuthResponseSchema,
    RefreshRequestSchema,
    refreshRequestZod,
    RefreshResponseSchema,
    refreshResponseZod,
    SigninSchema,
} from "src/entities/signin/schema/signin.schema";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export const signinApi = async (signin: SigninSchema): Promise<AuthResponseSchema> => {
    const {data} = await axios.post<AuthResponseSchema>(`${SERVER_URL}/auth/sign-in`, signin);
    return data;
};

export const refreshApi = async (refresh: RefreshRequestSchema): Promise<string> => {
    refreshRequestZod.parse(refresh);

    const res = await axios.post(`${SERVER_URL}/auth/refresh`, refresh, { withCredentials: true });
    const parsed = refreshResponseZod.parse(res.data);

    const accessToken = parsed.data?.accessToken;
    if (!accessToken) throw new Error("No accessToken in refresh response");

    return accessToken;
};