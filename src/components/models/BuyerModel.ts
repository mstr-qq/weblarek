import { IBuyer, IBuyerValidationErrors } from '../../types';

export class BuyerModel {
    private _data: Partial<IBuyer> = {};

    constructor(initialData: Partial<IBuyer> = {}) {
        this._data = initialData;
    }

    saveData(data: Partial<IBuyer>): void {
        this._data = { ...this._data, ...data };
    }

    getData(): Partial<IBuyer> {
        return this._data;
    }

    clear(): void {
        this._data = {};
    }

    validate(): IBuyerValidationErrors {
        const errors: IBuyerValidationErrors = {};
        
        if (!this._data.payment) {
            errors.payment = 'Не выбран вид оплаты';
        }
        
        if (!this._data.email) {
            errors.email = 'Укажите емэйл';
        }
        
        if (!this._data.phone) {
            errors.phone = 'Укажите телефон';
        }
        
        if (!this._data.address) {
            errors.address = 'Укажите адрес';
        }
        
        return errors;
    }

    validateField(field: keyof IBuyer, value: string): string | null {
        if (!value) {
            switch(field) {
                case 'payment': return 'Не выбран вид оплаты';
                case 'email': return 'Укажите емэйл';
                case 'phone': return 'Укажите телефон';
                case 'address': return 'Укажите адрес';
                default: return 'Поле не может быть пустым';
            }
        }
        return null;
    }
}