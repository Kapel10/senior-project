import {newApi} from "../../utils/AxiosUtil";

export class EventService{
    private static port = '8001';
    private static create_event = 'api/v1/event/create';
    private static get_event = 'api/v1/event/show/';
    private static fetch_comments = 'api/v1/event/comment/fetch';
    private static post_comment = 'api/v1/event/comment/add'

    static createEvent(request:any) {
        return newApi(this.port).post(this.create_event, request);
    }

    static getEvent(id:number) {
        return newApi(this.port).get(this.get_event + `${id}`);
    }

    static fetchComments(request:any){
        return newApi(this.port).post(this.fetch_comments, request);
    }

    static postComment(request:any){
        return newApi(this.port).post(this.post_comment, request);
    }


}