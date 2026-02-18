import { Component } from "../base/Component.ts";
import { ensureElement } from "../../utils/utils.ts";
import { IEvents } from "../base/Events.ts";
import { EventState, priceLabelsForCards } from "../../utils/constants.ts";
import { ICartData } from "./CartUI.ts";

type ISuccessfulData = Pick<ICartData, 'summ'>;

export class SuccessfulUI extends Component<ISuccessfulData> {
  protected _summElement: HTMLParagraphElement;
  protected _buttonElement: HTMLButtonElement;

  constructor(protected event: IEvents, container: HTMLElement) {
    super(container);

    this._summElement = ensureElement<HTMLParagraphElement>('.order-success__description', this.container);
    this._buttonElement = ensureElement<HTMLButtonElement>('.order-success__close', this.container);

    this._buttonElement.addEventListener('click', (event) => {
      event.preventDefault();
      this.event.emit(EventState.MODAL_CLOSE);
    });
  };

  set summ(value: number) {
    const stringValue = value < 10000
    ? `Списано ${String(value)} ${priceLabelsForCards.label}`
    : `Списано ${value.toLocaleString('ru-RU')} ${priceLabelsForCards.label}`;

    this._summElement.textContent = stringValue;
  };
};