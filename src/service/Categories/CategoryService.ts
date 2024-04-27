import {api} from "../../utils/AxiosUtil";

export class CategoryService {
    private static port = '8001';
    private static category = `api/v1/categories?all=1`;

    static getCategories() {
        return api(this.port).get(this.category);
    }

}