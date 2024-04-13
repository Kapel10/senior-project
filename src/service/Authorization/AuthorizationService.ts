import {AuthorizationDtoRequest} from "../../interface/request/Authorization/AuthorizationDtoRequest";
import {api, newApi} from "../../utils/AxiosUtil";
import {AuthorizationDtoResponse} from "../../interface/response/Authorization/AuthorizationDtoResponse";
import {CodeVerification} from "../../interface/request/Authorization/CodeVerification";
import {PhoneVerification} from "../../interface/request/Authorization/PhoneVerification";
import {RegistrationDtoRequest} from "../../interface/request/Authorization/RegistrationDtoRequest";
import {UpdatePasswordRequest} from "../../interface/request/Authorization/UpdatePasswordRequest";


export class AuthorizationService {

    private static path = '/api/v1'
    private static login = `${this.path}/login`;
    private static codeVerification = `${this.path}/otp/send`;
    private static phoneVerification = `${this.path}/otp/verify`;
    private static register = `${this.path}/register`;
    private static resetPassword = `${this.path}/reset/password`;

    private static port = '8001';
    private static test_path = `${this.path}/test-login`;
    private static refresh_token = `api/v1/refresh`;
    private static sign_up = `api/v1/create/user`;
    static authorization(request: AuthorizationDtoRequest) {
        return newApi(this.port).post<AuthorizationDtoResponse>(this.login, request);
    }
    static signUp(request: any) {
        return newApi(this.port).post<any>(this.sign_up, request);
    }

    static test() {
        return newApi(this.port).post<any>(this.test_path);
    }

    static refresh(request: string) {
        return newApi(this.port).post<any>(this.refresh_token)
    }


    static registration(request: RegistrationDtoRequest) {
        return api.post(this.register, request);
    }

    static send(request: CodeVerification) {
        return api.post(this.codeVerification, request);
    }

    static verify(request: PhoneVerification) {
        return api.post(this.phoneVerification, request);
    }

    static reset(request: UpdatePasswordRequest) {
        return api.post(this.resetPassword, request);
    }


}


