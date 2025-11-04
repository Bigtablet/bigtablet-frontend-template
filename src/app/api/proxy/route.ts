import { cookies } from "next/headers";
import axios from "axios";

const BACKEND_URL = process.env.SERVER_URL;

export async function GET() {
    const access = (await cookies()).get("accessToken")?.value;

    const api = axios.create({
        baseURL: BACKEND_URL,
        timeout: 15000,
        headers: access ? { Authorization: `Bearer ${access}` } : {},
    });

    const { data, status } = await api.get("");
    return new Response(JSON.stringify(data), { status, headers: { "Content-Type": "application/json" } });
}