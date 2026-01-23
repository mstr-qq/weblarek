import { IApi, IProduct, IProductsResponse, IOrderData, IOrderResponse } from '../../types';

export class ShopApi {
    private api: IApi;
    
    constructor(api: IApi) {
        this.api = api;
    }
    
    async getProducts(): Promise<IProduct[]> {
        const response = await this.api.get<IProductsResponse>('/product/');
        return response.items;
    }
    
    async createOrder(orderData: IOrderData): Promise<IOrderResponse> {
        return await this.api.post<IOrderResponse>('/order/', orderData);
    }
}