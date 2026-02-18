import { Component } from "../base/Component.ts";
import { ensureElement } from "../../utils/utils.ts";
import { IBuyer, TErrors } from "../../types/index.ts";
import { IEvents } from "../base/Events.ts";
import { EventState } from "../../utils/constants.ts";

interface IErrors {
  errors: Partial<TErrors>;
};

export abstract class Form extends Component<IBuyer&IErrors> {
  protected _errorElement: HTMLSpanElement;
  protected _buttonElement: HTMLButtonElement;

  constructor(protected event: IEvents, container: HTMLElement) {
    super(container);

    this._errorElement = ensureElement<HTMLSpanElement>('.form__errors', this.container);
    this._buttonElement = ensureElement<HTMLButtonElement>('[type="submit"]', this.container);

    this._buttonElement.addEventListener('click', (event) => {
      event.preventDefault();
      this.event.emit(EventState.ORDER_SUBMIT);
    });
  };

  set errors(errorsObj: IErrors) {
    const errors = Object.values(errorsObj).filter((value) => value !== null).join(', ');
    this._errorElement.textContent = errors;
  };

  set statusButton(value: boolean) {
    this._buttonElement.disabled = value;
  };
};