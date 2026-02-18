import { IProduct } from '../../types/index.ts';
import { IEvents } from "../base/Events.ts";
import { EventState } from "../../utils/constants.ts";

export class ProductCatalog {
	protected _productList: IProduct[] = [];
	protected _selectedProduct!: IProduct;

	constructor(protected event: IEvents) {};

	setProductList(productListArr: IProduct[]): void {
		this._productList = productListArr;
		this.event.emit(EventState.CATALOG_CHANGED);
	};

	getProductList(): IProduct[] {
		return this._productList;
	};

	getProductById(id: string): IProduct | null {
		return this._productList.find((item: IProduct) => item.id === id) ?? null;
	};

	setSelectedProduct(product: IProduct): void {
		this._selectedProduct = product;
		this.event.emit(EventState.SELECTED_CARD_SAVE);
	};

	getSelectedProduct(): IProduct {
		return this._selectedProduct;
	};
};