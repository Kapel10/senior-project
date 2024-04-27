import axios, {AxiosInstance} from "axios";
import {LocalStorageUtil} from "./LocalStorageUtil";

export const api = (port: string): AxiosInstance => {
     const instance =  axios.create({
        baseURL: `http://104.248.4.202:${port}/`,
        headers: {Authorization: "Bearer " + LocalStorageUtil.getJWTToken()},
    });

    return instance;
}



/*

instance.interceptors.response.use(
        (response) => response,
        async error => {
            console.log(123);
            const originalRequest = error.config;
            if (error.response.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;
                try {
                    const {data} = await AuthorizationService.refresh(LocalStorageUtil.getRefreshToken());
                    console.log(data);
                    return axios(originalRequest);
                } catch (getTokenError) {
                    // Handle error when getting new token (e.g., log out user, redirect to login page)
                    console.error('Error getting new access token:', getTokenError);
                    // Throw error to be handled where the request was made
                    throw error;
                }

            }
            // Throw error if it's not a 401 or if getting new token fails
            throw error;
        }
    );

 */