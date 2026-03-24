import { useGcpUploadMutation } from "src/shared/libs/api/gcp/mutation/gcp.mutation";

/**
 * @description GCP 파일 업로드를 간편하게 사용하는 훅입니다.
 * - useGcpUploadMutation을 래핑하여 upload 함수를 제공
 * - upload 호출 시 파일 URL 문자열을 반환
 * @param options - 뮤테이션 옵션
 * @returns upload 함수와 뮤테이션 상태를 포함한 객체
 */
export const useGcpUpload = (options?: Parameters<typeof useGcpUploadMutation>[0]) => {
	const uploadMutation = useGcpUploadMutation(options);

	const upload = async (file: File) => {
		const uploadResponse = await uploadMutation.mutateAsync(file);
		return uploadResponse.data;
	};

	return { upload, ...uploadMutation };
};
