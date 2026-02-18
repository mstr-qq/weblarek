import { IBuyer, TPayment, TErrors } from '../../types/index.ts';
import { EventState } from '../../utils/constants.ts';
import { IEvents } from '../base/Events.ts';

export class Buyer {
    protected _payment: TPayment = '';
    protected _email: string = '';
    protected _phone: string = '';
    protected _address: string = '';

    constructor(protected event: IEvents) {};

    setOrderInformation(orderInfo: Partial<IBuyer>): void {
        if (orderInfo.payment !== undefined) {
            this._payment = orderInfo.payment;
            this.event.emit(EventState.BUYER_CAHAGED, this.getOrderInformation());
        };
        if (orderInfo.address !== undefined) {
            this._address = orderInfo.address;
            this.event.emit(EventState.BUYER_CAHAGED, this.getOrderInformation());
        };
        if (orderInfo.email !== undefined) {
            this._email = orderInfo.email;
            this.event.emit(EventState.CONTACT_CHANGED, this.getOrderInformation());
        };
        if (orderInfo.phone !== undefined) {
            this._phone = orderInfo.phone;
            this.event.emit(EventState.CONTACT_CHANGED, this.getOrderInformation());
        };
    };

    getOrderInformation(): IBuyer {
        return {
            payment: this._payment,
            email: this._email,
            phone: this._phone,
            address: this._address
        };
    };

    clearOrderInformation(): void {
        this._payment = '';
        this._email = '';
        this._phone = '';
        this._address = '';
        this.event.emit(EventState.BUYER_CAHAGED, this.getOrderInformation());
        this.event.emit(EventState.CONTACT_CHANGED, this.getOrderInformation());
    };


    validationOrderInformation(): TErrors {
        const errors: TErrors = {
            payment: null,
            email: null,
            phone: null,
            address: null
        };
        if (!this._payment) {errors.payment = 'Не выбран способ оплаты'};
        if (!this._address) {errors.address = 'Не указан адрес доставки'};
        if (!this._email) {errors.email = 'Не указан корректный email'};
        if (!this._phone) {errors.phone = 'Не указан номер телефона'};
        return errors;
    };
};