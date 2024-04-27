import {AuthorizationDtoRequest} from "../../interface/request/Authorization/AuthorizationDtoRequest";
import {api} from "../../utils/AxiosUtil";
import {CodeVerification} from "../../interface/request/Authorization/CodeVerification";
import {PhoneVerification} from "../../interface/request/Authorization/PhoneVerification";
import {RegistrationDtoRequest} from "../../interface/request/Authorization/RegistrationDtoRequest";
import {UpdatePasswordRequest} from "../../interface/request/Authorization/UpdatePasswordRequest";


export class AuthorizationService {
    private static port = '8001';
    private static path = '/api/v1'

    private static login = `${this.path}/login`;
    private static codeVerification = `${this.path}/otp/send`;
    private static phoneVerification = `${this.path}/otp/verify`;
    private static register = `${this.path}/register`;
    private static resetPassword = `${this.path}/reset/password`;

    private static test_path = `${this.path}/test-login`;
    private static refresh_token = `api/v1/refresh`
    private static sign_up = `api/v1/create/user`;

    static authorization(request: AuthorizationDtoRequest) {
        return api(this.port).post<any>(this.login, request);
    }
    static signUp(request: any) {
        return api(this.port).post<any>(this.sign_up, request);
    }

    static test() {
        return api(this.port).post<any>(this.test_path);
    }

    static refresh(request: any) {
        return api(this.port).post(this.refresh_token, request)
    }

    static registration(request: RegistrationDtoRequest) {
        return api(this.port).post(this.register, request);
    }

    static send(request: CodeVerification) {
        return api(this.port).post(this.codeVerification, request);
    }

    static verify(request: PhoneVerification) {
        return api(this.port).post(this.phoneVerification, request);
    }

    static reset(request: UpdatePasswordRequest) {
        return api(this.port).post(this.resetPassword, request);
    }

}


