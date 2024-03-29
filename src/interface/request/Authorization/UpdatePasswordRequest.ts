export interface UpdatePasswordRequest{
    token: string,
    new_password: string,
    confirm_password: string,
    phone: string
}