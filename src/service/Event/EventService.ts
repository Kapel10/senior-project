import {api} from "../../utils/AxiosUtil";

export class EventService{
    private static port = '8001';
    private static create_event = 'api/v1/event/create';
    private static get_event = 'api/v1/event/show/';
    private static fetch_comments = 'api/v1/event/comment/fetch';
    private static post_comment = 'api/v1/event/comment/add';
    private static follow_event = 'api/v1/event/fellowship/follow/';
    private static check_if_followed = 'api/v1/event/fellowship/exist/';
    private static unfollow_event = 'api/v1/event/fellowship/unfollow/';
    private static get_folowers = 'api/v1/event/fellowship/list/';
    private static get_all_events = 'api/v1/event/show/all';
    private static search_event = 'api/v1/event/search';
    private static get_messages = 'api/v1/event/chat/messages/';

    private static get_chat = 'api/v1/event/chat/preview/';
    private static get_ticket = 'api/v1/event/ticket/get/';

    private static get_self_info = 'api/v1/users/profile';


    static createEvent(request:any) {
        return api(this.port).post(this.create_event, request);
    }

    static getEvent(id:number) {
        return api(this.port).get(this.get_event + `${id}`);
    }

    static fetchComments(request:any){
        return api(this.port).post(this.fetch_comments, request);
    }

    static postComment(request:any){
        return api(this.port).post(this.post_comment, request);
    }

    static followEvent(id: number) {
        return api(this.port).post(this.follow_event + `${id}`);
    }

    static unFollowEvent(id: number) {
        return api(this.port).post(this.unfollow_event + `${id}`);
    }

    static checkIfFollowed(id: number) {
        return api(this.port).post(this.check_if_followed + `${id}`);
    }

    static getFollowersList(id: number) {
        return api(this.port).post(this.get_folowers + `${id}`);
    }

    static getAllEvents() {
        return api(this.port).get(this.get_all_events);
    }

    static searchEvent(request: any) {
        return api(this.port).post(this.search_event, request);
    }


    static getMessages(id: string) {
        return api(this.port).get(this.get_messages + `${id}`);
    }

    static getChats() {
        return api(this.port).get(this.get_chat);
    }

    static getTicket(id: string) {
        return api(this.port).post(this.get_ticket + `${id}`)
    }

    static getMyself(){
        return api(this.port).get(this.get_self_info);
    }
}