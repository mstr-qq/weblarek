import { ensureElement } from "../../utils/utils.ts";
import { Component } from "../base/Component.ts";
import { IEvents } from "../base/Events.ts";

interface IModalData {
  content: HTMLElement;
};

export class ModalUI extends Component<IModalData> {
  protected _closeButton: HTMLButtonElement
  protected _modalContent: HTMLElement;

  constructor(protected event: IEvents, container: HTMLElement) {
    super(container);

    this._closeButton = ensureElement<HTMLButtonElement>('.modal__close', this.container);
    this._modalContent = ensureElement<HTMLElement>('.modal__content', this.container);

    this.container.addEventListener('click', (event) => {
      if (event.target === this.container) this.close();
    });

    this._closeButton.addEventListener('click', () => {
      this.close();
    });
  };

  set content(item: HTMLElement) {
    this._modalContent.replaceChildren(item);
  };

  open(): void {
    this.container.classList.add('modal_active');
  };

  close(): void {
    this.container.classList.remove('modal_active');
  };
};