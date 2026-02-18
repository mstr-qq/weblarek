import { CardImage } from "../abstract/CardImage.ts";
import { ICardActions } from "../../types/index.ts";

export class CardGalleryUI extends CardImage {

  constructor(container: HTMLElement, actions?: ICardActions) {
    super(container);

    if (actions?.onClick) {
      this.container.addEventListener('click', actions.onClick);
    };
  };
};