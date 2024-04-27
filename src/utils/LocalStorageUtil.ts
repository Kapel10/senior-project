import {AuthorizationService} from "../service/Authorization/AuthorizationService";

export class LocalStorageUtil {
  static getJWTToken(): string | null {
    const json: string | null = localStorage.getItem("jwt-token");

    if (json !== null) return json;

    return null;
  }

  static setJWTToken(jwt: string) {
    localStorage.setItem("jwt-token", jwt);
    this.refreshAccessToken();
  }

  static refreshAccessToken() {
    setTimeout(async () => {
      const request = {
        token: this.getRefreshToken()
      }
      const {data} = await AuthorizationService.refresh(request);
      this.setJWTToken(data.data.token);
    }, 5 * 60 * 1000);
  }

  static getRefreshToken(): string | null {
    const json: string | null = localStorage.getItem("refresh-token");

    if (json !== null) return json;

    return null;
  }

  static setRefreshToken(refreshToken: string) {
    localStorage.setItem("refresh-token", refreshToken);
  }

  static clearLocal() {
    localStorage.clear();
  }

}
