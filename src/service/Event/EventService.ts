import {newApi} from "../../utils/AxiosUtil";

export class EventService{
    private static port = '8001';
    private static create_event = 'api/v1/event/create';

    static createEvent(request:any) {
        return newApi(this.port).post(this.create_event,request);
    }

}