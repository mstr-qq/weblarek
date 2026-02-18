import { ensureElement } from "../../utils/utils.ts";
import { Component } from "../base/Component.ts";

interface IMainGalleryData {
  catalog: HTMLElement[];
};

export class MainGalleryUI extends Component<IMainGalleryData> {
  protected _galleryElement: HTMLElement;

  constructor(container: HTMLElement) {
    super(container);

    this._galleryElement = ensureElement<HTMLElement>('.gallery', this.container);
  };

  set catalog(items: HTMLElement[]) {
    items.forEach(item => this._galleryElement.append(item));
  };
};