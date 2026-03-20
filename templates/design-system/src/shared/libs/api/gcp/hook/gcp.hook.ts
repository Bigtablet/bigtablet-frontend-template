import { useGcpUploadMutation } from "src/shared/libs/api/gcp/query/gcp.query";

/**
 * @description
 * GCP 파일 업로드를 관리하는 커스텀 훅입니다.
 * useGcpUploadMutation을 래핑하여 간편한 인터페이스를 제공합니다.
 *
 * @param options - useMutation 옵션
 * @returns { upload: 파일 업로드 함수, ...mutationState: 뮤테이션 상태 }
 */
export const useGcpUpload = (options?: Parameters<typeof useGcpUploadMutation>[0]) => {
	const uploadMutation = useGcpUploadMutation(options);

	const upload = async (file: File) => {
		const uploadResponse = await uploadMutation.mutateAsync(file);
		return uploadResponse.data;
	};

	return { upload, ...uploadMutation };
};
