export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export interface IApi {
    get<T extends object>(uri: string): Promise<T>;
    post<T extends object>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}

export type TPayment = 'card' | 'cash' | '';
export type TPrice = number | null;

export type TErrors = {
    payment: string | null,
    address: string | null,
    email: string | null,
    phone: string | null
};

export interface IProduct {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: TPrice;
};

export interface IBuyer {
    payment: TPayment;
    email: string;
    phone: string;
    address: string;
};

export type TProductList = {
    total: number,
    items: IProduct[]
};

export type TRequestForServer = IBuyer & {
    total: number,
    items: string[]
};

export type TResponseFromSerever = {
    id: string,
    total: number
};

export interface ICardActions {
    onClick?: () => void;
}