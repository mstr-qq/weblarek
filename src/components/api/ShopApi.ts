import { TProductList, TRequestForServer, TResponseFromSerever } from "../../types/index.ts";
import { IApi } from "../../types/index.ts";

export class Communication {
  private api: IApi;

  constructor(api: IApi) {
    this.api = api;
  };

  getProductsFromServer(): Promise<TProductList> {
    return this.api.get('/product/');
  };

  postOrderOnServer(data: TRequestForServer): Promise<TResponseFromSerever> {
    return this.api.post<TResponseFromSerever>('/order/', data);
  };
};