export class LocalStorageUtil {
  static getJWTToken(): string | null {
    const json: string | null = localStorage.getItem("jwt-token");

    if (json !== null) {
      return json;
    }

    return null;
  }

  static setJWTToken(jwt: string) {
    localStorage.setItem("jwt-token", jwt);
    setTimeout(() => {
      localStorage.setItem("jwt-token", '');
    }, 5 * 60 * 1000);
  }

  static getRefreshToken(): string | null {
    const json: string | null = localStorage.getItem("refresh-token");

    if (json !== null) {
      return json;
    }

    return null;
  }

  static setRefreshToken(refreshToken: string) {
    localStorage.setItem("refresh-token", refreshToken);
  }

  static clearLocal() {
    localStorage.clear();
  }

}
