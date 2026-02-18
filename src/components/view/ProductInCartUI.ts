import { Card } from "../abstract/Card.ts";
import { ensureElement } from "../../utils/utils.ts";
import { ICardActions } from "../../types/index.ts";

interface IIndex {
  index: number,
};

export class ProductInCartUI extends Card<IIndex> {
  protected _index: HTMLSpanElement;
  protected _removeButton: HTMLButtonElement;

  constructor(container: HTMLElement, actions?: ICardActions) {
    super(container);

    this._index = ensureElement<HTMLSpanElement>('.basket__item-index', this.container);
    this._removeButton = ensureElement<HTMLButtonElement>('.basket__item-delete', this.container);

    if (actions?.onClick) {
      this._removeButton.addEventListener('click', actions.onClick);
    };
  };

  set index(value: number) {
    this._index.textContent = String(value);
  };
};