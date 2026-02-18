import { Card } from "../abstract/Card.ts";
import { ensureElement } from "../../utils/utils.ts";
import { IProduct } from "../../types/index.ts";
import { categoryMap } from "../../utils/constants.ts";
import { CDN_URL } from "../../utils/constants.ts";

type TCardGalleryProps = Pick<IProduct, 'image' | 'category'>;

export class CardImage extends Card<TCardGalleryProps> {
  protected _categoryElement: HTMLElement;
  protected _imageElement: HTMLImageElement;

  constructor(container: HTMLElement) {
    super(container);

    this._categoryElement = ensureElement<HTMLElement>('.card__category', this.container);
    this._imageElement = ensureElement<HTMLImageElement>('.card__image', this.container);
  };

  set category(value: string) {
    this._categoryElement.textContent = value;

    for (const key in categoryMap) {
      this._categoryElement.classList.toggle(categoryMap[key as keyof typeof categoryMap], key === value);
    };
  };

  set image(value: string) {
    this.setImage(this._imageElement, `${CDN_URL}${value.replace('.svg', '.png')}`, this._titleElement.textContent as string);
  };
};