import { CardImage } from "../abstract/CardImage.ts";
import { ensureElement } from "../../utils/utils.ts";
import { ICardActions } from "../../types/index.ts";

export class CardPreviewUI extends CardImage {
  protected _descriptionElement: HTMLParagraphElement;
  protected _cardButton: HTMLButtonElement;

  constructor(container: HTMLElement, actions?: ICardActions) {
    super(container);

    this._descriptionElement = ensureElement<HTMLParagraphElement>('.card__text', this.container);
    this._cardButton = ensureElement<HTMLButtonElement>('.card__button', this.container);

    if (actions?.onClick) {
      this.container.addEventListener('click', actions.onClick);
    };
  };

  set description(value: string) {
    this._descriptionElement.textContent = value;
  };

  set textButton(value: string) {
    this._cardButton.textContent = value;
  };

  set statusButton(value: boolean) {
    this._cardButton.disabled = value;
  };
};