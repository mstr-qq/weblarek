import { Form } from "../abstract/Form.ts";
import { ensureAllElements, ensureElement } from "../../utils/utils.ts";
import { IEvents } from "../base/Events.ts";
import { EventState } from "../../utils/constants.ts";

export class FormOrderUI extends Form {
  protected _btnContainer: HTMLButtonElement[];
  protected _adressInputElement: HTMLInputElement;

  constructor(protected event: IEvents, container: HTMLElement) {
    super(event, container);

    this._btnContainer = ensureAllElements<HTMLButtonElement>('[type="button"]', this.container);
    this._adressInputElement = ensureElement<HTMLInputElement>('[name="address"]', this.container);

    this._btnContainer.forEach((btn) => {
      btn.addEventListener('click', () => {
        if (btn.classList.contains('button_alt-active')) {
          this.event.emit(EventState.FORM_EDIT, { payment: '' })
        } else {
          this.event.emit(EventState.FORM_EDIT, { payment: btn.name });
        };
      });
    });

    this._adressInputElement.addEventListener('input', () => {
      this.event.emit(EventState.FORM_EDIT, { address: this._adressInputElement.value });
    });

  };

  set payment(value: string) {
    this._btnContainer.forEach((btn) => {
      btn.getAttribute('name') === value
                                  ? btn.classList.add('button_alt-active')
                                  : btn.classList.remove('button_alt-active');
    });
  };

  set address(value: string) {
    this._adressInputElement.value = value;
  };
};