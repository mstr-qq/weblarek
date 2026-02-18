import { IProduct } from '../../types/index.ts';
import { EventState } from '../../utils/constants.ts';
import { IEvents } from '../base/Events.ts';

export class Cart {
	protected _purchaseProductList: IProduct[] = [];

	constructor(protected event: IEvents) {};

	getListFromCart(): IProduct[] {
		return this._purchaseProductList;
	};

	addToCart(product: IProduct): void {
		this._purchaseProductList.push(product);
		this.event.emit(EventState.CART_CHANGED);
	};

	removeFromCart(product: IProduct): void {
		this._purchaseProductList = this._purchaseProductList.filter((item: IProduct) => item.id !== product.id);
		this.event.emit(EventState.CART_CHANGED);
	};

	clearCart(): void {
		this._purchaseProductList.length = 0;
		this.event.emit(EventState.CART_CHANGED);
	};

	getTotalCartCost(): number {
		return this._purchaseProductList.reduce((acc: number, item: IProduct) => acc + (item.price ?? 0), 0);
	};

	getTotalCartCount(): number {
		return this._purchaseProductList.length;
	};

	checkProductInCartById(id: string): boolean {
		return this._purchaseProductList.some((item: IProduct) => item.id === id);
	};
};