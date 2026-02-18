import { ensureElement } from "../../utils/utils.ts";
import { Component } from "../base/Component.ts";
import { IEvents } from "../base/Events.ts";
import { EventState, priceLabelsForCards } from "../../utils/constants.ts";

export interface ICartData {
  listOfPosition: HTMLElement[],
  summ: number,
  statusButton: boolean
};

export class CartUI extends Component<ICartData> {
  protected _cartList: HTMLUListElement;
  protected _cartPlaceOrderButton: HTMLButtonElement;
  protected _orderSumm: HTMLSpanElement;

  constructor(protected event: IEvents, container: HTMLElement) {
    super(container);

    this._cartList = ensureElement<HTMLUListElement>('.basket__list', this.container);
    this._cartPlaceOrderButton = ensureElement<HTMLButtonElement>('.basket__button', this.container);
    this._orderSumm = ensureElement<HTMLSpanElement>('.basket__price', this.container);

    this._cartPlaceOrderButton.addEventListener('click', () => {
      this.event.emit(EventState.ORDER_START);
    });
  };

  set summ(value: number) {
    const stringValue = value < 10000
    ? `${String(value)} ${priceLabelsForCards.label}`
    : `${value.toLocaleString('ru-RU')} ${priceLabelsForCards.label}`;

    this._orderSumm.textContent = stringValue;
  };

  set listOfPosition(items: HTMLElement[]) {
    this._cartList.replaceChildren(...items);
  };

  set statusButton(value: boolean) {
    this._cartPlaceOrderButton.disabled = value;
  };
};