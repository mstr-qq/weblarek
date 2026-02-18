import { Component } from "../base/Component.ts";
import { ensureElement } from "../../utils/utils.ts";
import { IProduct } from "../../types/index.ts";
import { priceLabelsForCards } from "../../utils/constants.ts";

type TCardProps = Pick<IProduct, 'title' | 'price'>;

export abstract class Card<T> extends Component<T&TCardProps> {
  protected _titleElement: HTMLElement;
  protected _priceElement: HTMLSpanElement;

  constructor(container: HTMLElement) {
    super(container);

    this._titleElement = ensureElement<HTMLElement>('.card__title', this.container);
    this._priceElement = ensureElement<HTMLSpanElement>('.card__price', this.container);
  };

  set title(value: string) {
    this._titleElement.textContent = value;
  };

  set price(value: number) {
    const stringValue = value === null
    ? priceLabelsForCards.free
    : value < 10000
    ? `${String(value)} ${priceLabelsForCards.label}`
    : `${value.toLocaleString('ru-RU')} ${priceLabelsForCards.label}`;

    this._priceElement.textContent = stringValue;
  };
};