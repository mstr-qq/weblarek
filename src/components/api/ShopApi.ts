import { IApi, IProduct, IProductsResponse } from '../../types';

export class ShopApi {
    private api: IApi;
    
    constructor(api: IApi) {
        this.api = api;
    }
    
    async getProducts(): Promise<IProduct[]> {
        const response = await this.api.get<IProductsResponse>('/product/');
        return response.items;
    }
    
    async createOrder(orderData: object): Promise<object> {
        return await this.api.post('/order/', orderData);
    }
}