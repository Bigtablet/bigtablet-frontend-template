import BigtabletAxios from "src/shared/libs/api/axios";
import type { Gcp } from "src/shared/libs/api/gcp/type/gcp.type";

/**
 * @description GCP 파일 업로드 API를 호출합니다.
 * - FormData로 파일을 multipartFile 키에 담아 전송
 * - 업로드 완료 후 파일 URL을 반환
 * @param file - 업로드할 파일
 * @param signal - AbortSignal (옵션)
 * @returns 업로드된 파일 URL을 포함한 응답
 */
export const postGcpUploadApi = async (file: File, signal?: AbortSignal): Promise<Gcp> => {
	const formData = new FormData();
	formData.append("multipartFile", file);

	const response = await BigtabletAxios.post("/gcp", formData, {
		signal,
		withCredentials: false,
	});

	const uploadedUrl = response.data?.data;
	if (typeof uploadedUrl !== "string") {
		throw new Error("Invalid upload response: expected string URL");
	}

	return { data: uploadedUrl };
};
