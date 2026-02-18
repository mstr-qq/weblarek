import { Form } from "../abstract/Form.ts";
import { ensureElement } from "../../utils/utils.ts";
import { IEvents } from "../base/Events.ts";
import { EventState } from "../../utils/constants.ts";

export class FormContactsUI extends Form {
  protected _emailInputElement: HTMLInputElement;
  protected _phoneInputElement: HTMLInputElement;

  constructor(protected event: IEvents, container: HTMLElement) {
    super(event, container);

    this._emailInputElement = ensureElement<HTMLInputElement>('[name="email"]', this.container);
    this._phoneInputElement = ensureElement<HTMLInputElement>('[name="phone"]', this.container);

    this._emailInputElement.addEventListener('input', () => {
      this.event.emit(EventState.FORM_EDIT, { email: this._emailInputElement.value });
    });

    this._phoneInputElement.addEventListener('input', () => {
      this.event.emit(EventState.FORM_EDIT, { phone: this._phoneInputElement.value });
    });
  };

  set email(value: string) {
    this._emailInputElement.value = value;
  };

  set phone(value: string) {
    this._phoneInputElement.value = value;
  };
};