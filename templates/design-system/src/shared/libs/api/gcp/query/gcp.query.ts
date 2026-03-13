import { type UseMutationOptions, useMutation } from "@tanstack/react-query";
import { postGcpUploadApi } from "src/shared/libs/api/gcp/api/gcp.api";
import { Keys } from "src/shared/libs/api/gcp/query/keys";
import type { Gcp } from "src/shared/libs/api/gcp/type/gcp.type";

export const useGcpUploadMutation = (options?: UseMutationOptions<Gcp, Error, File>) =>
	useMutation({
		mutationKey: [Keys.gcp.upload],
		mutationFn: (file) => postGcpUploadApi(file),
		...options,
	});
