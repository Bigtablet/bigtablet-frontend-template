import { type UseMutationOptions, useMutation } from "@tanstack/react-query";
import { postGcpUploadApi } from "src/shared/libs/api/gcp/api/gcp.api";
import { Keys } from "src/shared/libs/api/gcp/query/keys";
import type { Gcp } from "src/shared/libs/api/gcp/type/gcp.type";

/**
 * @description
 * GCP 파일 업로드 뮤테이션을 생성합니다.
 * React Query의 useMutation을 기반으로 하며, 캐시 키 및 API 함수가 자동 설정됩니다.
 *
 * @param options - useMutation 커스텀 옵션 (onSuccess, onError 등)
 * @returns React Query 뮤테이션 객체
 */
export const useGcpUploadMutation = (options?: UseMutationOptions<Gcp, Error, File>) =>
	useMutation({
		mutationKey: [Keys.gcp.upload],
		mutationFn: (file) => postGcpUploadApi(file),
		...options,
	});
