import { type UseMutationOptions, useMutation } from "@tanstack/react-query";
import { postGcpUploadApi } from "src/shared/libs/api/gcp/api/gcp.api";
import { Keys } from "src/shared/libs/api/gcp/query/keys";
import type { Gcp } from "src/shared/libs/api/gcp/type/gcp.type";

/**
 * @description GCP 파일 업로드 뮤테이션 훅입니다.
 * - File 객체를 받아 postGcpUploadApi를 호출
 * - Keys.gcp.upload로 뮤테이션을 식별
 * @param options - 뮤테이션 옵션
 * @returns React Query 뮤테이션 객체
 */
export const useGcpUploadMutation = (options?: UseMutationOptions<Gcp, Error, File>) =>
	useMutation({
		mutationKey: [Keys.gcp.upload],
		mutationFn: (file) => postGcpUploadApi(file),
		...options,
	});
