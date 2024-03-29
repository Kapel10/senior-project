export interface AuthorizationDtoResponse {
  data: {
    tokens: {
      access_token: string;
      refresh_token: string;
    };
    user_id: number;
  };
}
