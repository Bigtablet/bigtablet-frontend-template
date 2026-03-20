import BigtabletAxios from "src/shared/libs/api/axios";
import type { Gcp } from "src/shared/libs/api/gcp/type/gcp.type";

/**
 * @description
 * 파일을 GCP 스토리지에 업로드하는 API 함수입니다.
 *
 * @param file - 업로드할 파일
 * @param signal - AbortController 시그널 (요청 취소용)
 * @returns GCP 업로드 응답 (URL 데이터 포함)
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
		throw new Error("Invalid GCP upload response: URL is not a string.");
	}

	return { data: uploadedUrl };
};
