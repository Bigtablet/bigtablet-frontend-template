/**
 * @description
 * GCP 업로드 응답 데이터 타입입니다.
 * 업로드 완료 후 반환되는 파일 URL을 포함합니다.
 *
 * @property data - 업로드된 파일의 URL 주소
 */
export interface Gcp {
	data: string;
}
