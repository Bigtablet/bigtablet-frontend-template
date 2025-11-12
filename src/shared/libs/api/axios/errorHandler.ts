import { AxiosError } from 'axios';
import {useToast} from "src/shared/ui/feedback/toast/useToast";

const errorHandler = (error: AxiosError): void => {
    const toast = useToast();
    if (error.response) {
        const { status, data } = error.response;
        const message = (data as any)?.message || '알 수 없는 오류 발생';

        switch (status) {
            case 400:
                toast.error(`요청 오류: ${message}`);
                break;
            case 403:
                toast.error('권한 오류: 접근 권한이 없습니다.');
                break;
            case 404:
                toast.error('리소스를 찾을 수 없습니다.');
                break;
            case 500:
                toast.error('서버에서 문제가 발생했습니다.');
                break;
            default:
                toast.error(`오류 발생: ${message}`);
        }
    } else if (error.request) {
        toast.error('네트워크 오류: 서버와 연결할 수 없습니다.');
    } else {
        toast.error(`오류: ${error.message || '알 수 없는 오류 발생'}`);
    }
};

export default errorHandler;