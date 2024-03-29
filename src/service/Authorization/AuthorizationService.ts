import { AuthorizationDtoRequest } from "../../interface/request/Authorization/AuthorizationDtoRequest";
import { api } from "../../utils/AxiosUtil";
import { AuthorizationDtoResponse} from "../../interface/response/Authorization/AuthorizationDtoResponse";
import {CodeVerification} from "../../interface/request/Authorization/CodeVerification";
import {PhoneVerification} from "../../interface/request/Authorization/PhoneVerification";
import {RegistrationDtoRequest} from "../../interface/request/Authorization/RegistrationDtoRequest";
import {UpdatePasswordRequest} from "../../interface/request/Authorization/UpdatePasswordRequest";


export class AuthorizationService {

  private static path = '8000/api/v1'
  private static login = `${this.path}/login`;
  private static codeVerification = `${this.path}/otp/send`;
  private static phoneVerification = `${this.path}/otp/verify`;
  private static register = `${this.path}/register`;
  private static resetPassword = `${this.path}/reset/password`;

  static authorization(request: AuthorizationDtoRequest) {
    return api.post<AuthorizationDtoResponse>(this.login, request);
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

  static reset(request: UpdatePasswordRequest){
    return api.post(this.resetPassword, request);
  }


}


