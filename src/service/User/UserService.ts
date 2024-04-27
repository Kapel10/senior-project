import {api} from "../../utils/AxiosUtil";

export class UserService {
    private static path = '/api/v1';
    private static port = '8001';
    private static get_user = `${this.path}/check-username/`;
    private static follow_user = `${this.path}/users/friendship/follow/`;
    private static unFollow_user = `${this.path}/users/friendship/unfollow/`;

    private static followers_list = `${this.path}/users/friendship/follower`;
    private static followed_list = `${this.path}/users/friendship/followed`;

    private static check_followed = `${this.path}/users/friendship/check/`;
    private static get_users = `${this.path}/users/profile/search/?`;

    private static about_me = `${this.path}/users/profile`;


    static getUserProfile(username: string) {
        return api(this.port).get<any>(`${this.path}/user/${username}`);
    }

    static followUser(id: string) {
        return api(this.port).post<any>(`${this.follow_user}${id}`);
    }

    static unFollowUser(id: string) {
        return api(this.port).post<any>(`${this.unFollow_user}${id}`);
    }

    static getFollowerList() {
        return api(this.port).post<any>(this.followers_list);
    }

    static getFollowedList() {
        return api(this.port).post<any>(this.followed_list);
    }

    static checkFollowed(id: string) {
        return api(this.port).post<any>(`${this.check_followed}${id}`);
    }

    static getUsersList(username?: string) {
        if (username) {
            return api(this.port).post<any>(this.get_users + `username=${username}`);
        } else {
            return api(this.port).post<any>(this.get_users);
        }
    }

    static getAboutMe() {
        return api(this.port).get(this.about_me);
    }
}