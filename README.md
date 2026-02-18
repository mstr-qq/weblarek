```markdown
# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Vite

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом
- src/components/abstract/ — папка с абстрактными классами
- src/components/models/ — папка с моделями данных
- src/components/view/ — папка с компонентами представления
- src/components/api/ — папка с классами для работы с API

Важные файлы:
- index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/main.ts — точка входа приложения (Presenter)
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами
- src/utils/dom-refs.ts — файл со ссылками на DOM-элементы

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run dev
```

или

```
yarn
yarn dev
```
## Сборка

```
npm run build
```

или

```
yarn build
```

# Интернет-магазин «Web-Larёk»
«Web-Larёk» — это интернет-магазин с товарами для веб-разработчиков, где пользователи могут просматривать товары, добавлять их в корзину и оформлять заказы. Сайт предоставляет удобный интерфейс с модальными окнами для просмотра деталей товаров, управления корзиной и выбора способа оплаты, обеспечивая полный цикл покупки с отправкой заказов на сервер.

## Архитектура приложения

Код приложения разделен на слои согласно парадигме MVP (Model-View-Presenter), которая обеспечивает четкое разделение ответственности между классами слоев Model и View. Каждый слой несет свой смысл и ответственность:

- **Model** - слой данных, отвечает за хранение и изменение данных. В проекте представлен классами: `ProductCatalog`, `Cart`, `Buyer`.
- **View** - слой представления, отвечает за отображение данных на странице. Включает компоненты: `HeaderUI`, `MainGalleryUI`, `ModalUI`, `CardGalleryUI`, `CardPreviewUI`, `CartUI`, `ProductInCartUI`, `FormOrderUI`, `FormContactsUI`, `SuccessfulUI`.
- **Presenter** - презентер содержится в файле `main.ts` и отвечает за связь представления и данных через брокер событий `EventEmitter`.

Взаимодействие между классами обеспечивается использованием событийно-ориентированного подхода. Модели и Представления генерируют события при изменении данных или взаимодействии пользователя с приложением, а Презентер обрабатывает эти события, используя методы как Моделей, так и Представлений.

### Базовый код

#### Класс Component
Является базовым классом для всех компонентов интерфейса.
Класс является дженериком и принимает в переменной `T` тип данных, которые могут быть переданы в метод `render` для отображения.

**Конструктор:**  
`constructor(container: HTMLElement)` - принимает ссылку на DOM элемент, за отображение которого он отвечает.

**Поля класса:**  
`container: HTMLElement` - поле для хранения корневого DOM элемента компонента.

**Методы класса:**  
- `render(data?: Partial<T>): HTMLElement` - главный метод класса. Он принимает данные, которые необходимо отобразить в интерфейсе, записывает эти данные в поля класса и возвращает ссылку на DOM-элемент. Предполагается, что в классах, которые будут наследоваться от `Component`, будут реализованы сеттеры для полей с данными, которые будут вызываться в момент вызова `render` и записывать данные в необходимые DOM элементы.  
- `setImage(element: HTMLImageElement, src: string, alt?: string): void` - утилитарный метод для модификации DOM-элементов `<img>`.

#### Класс Api
Содержит в себе базовую логику отправки запросов.

**Конструктор:**  
`constructor(baseUrl: string, options: RequestInit = {})` - в конструктор передается базовый адрес сервера и опциональный объект с заголовками запросов.

**Поля класса:**  
- `baseUrl: string` - базовый адрес сервера  
- `options: RequestInit` - объект с заголовками, которые будут использованы для запросов.

**Методы:**  
- `get<T>(uri: string): Promise<T>` - выполняет GET запрос на переданный в параметрах эндпоинт и возвращает промис с объектом, которым ответил сервер.  
- `post<T>(uri: string, data: object, method: ApiPostMethods = 'POST'): Promise<T>` - принимает объект с данными, которые будут переданы в JSON в теле запроса, и отправляет эти данные на эндпоинт, переданный как параметр при вызове метода. По умолчанию выполняется `POST` запрос, но метод запроса может быть переопределен заданием третьего параметра при вызове.  
- `handleResponse<T>(response: Response): Promise<T>` - защищенный метод, проверяющий ответ сервера на корректность и возвращающий объект с данными, полученный от сервера, или отклоненный промис в случае некорректных данных.

#### Класс EventEmitter
Брокер событий реализует паттерн "Наблюдатель", позволяющий отправлять события и подписываться на события, происходящие в системе. Класс используется для связи слоя данных и представления.

**Конструктор:** не принимает параметров.

**Поля класса:**  
- `_events: Map<string | RegExp, Set<Function>>` - хранит коллекцию подписок на события. Ключи коллекции - названия событий или регулярное выражение, значения - коллекция функций обработчиков, которые будут вызваны при срабатывании события.

**Методы класса:**  
- `on<T extends object>(event: EventName, callback: (data: T) => void): void` - подписка на событие, принимает название события и функцию-обработчик.  
- `emit<T extends object>(event: string, data?: T): void` - инициализация события. При вызове события в метод передается название события и объект с данными, который будет использован как аргумент для вызова обработчика.  
- `trigger<T extends object>(event: string, context?: Partial<T>): (data: T) => void` - возвращает функцию, при вызове которой инициализируется требуемое в параметрах событие с передачей в него данных из второго параметра.

---

## Данные и типы

В приложении используются следующие интерфейсы для описания данных (файл `src/types/index.ts`):

```typescript
/**
 * Тип для способа оплаты
 */
export type TPayment = 'card' | 'cash' | '';

/**
 * Тип для цены товара (может быть null для бесценных товаров)
 */
export type TPrice = number | null;

/**
 * Тип для ошибок валидации
 */
export type TErrors = {
    payment: string | null,
    address: string | null,
    email: string | null,
    phone: string | null
};

/**
 * Интерфейс товара
 * Описывает структуру товара в каталоге
 */
export interface IProduct {
    id: string;           // Уникальный идентификатор товара
    description: string;  // Подробное описание товара
    image: string;        // URL изображения товара
    title: string;        // Название товара
    category: string;     // Категория товара
    price: TPrice;        // Цена товара (может быть null)
}

/**
 * Интерфейс покупателя
 * Описывает данные покупателя для оформления заказа
 */
export interface IBuyer {
    payment: TPayment; // Способ оплаты
    email: string;     // Электронная почта
    phone: string;     // Телефон
    address: string;   // Адрес доставки
}

/**
 * Тип ответа сервера со списком товаров
 */
export type TProductList = {
    total: number,      // Общее количество товаров
    items: IProduct[]   // Массив товаров
};

/**
 * Данные для отправки заказа на сервер
 */
export type TRequestForServer = IBuyer & {
    total: number,      // Общая сумма заказа
    items: string[]     // Массив идентификаторов товаров
};

/**
 * Ответ сервера на создание заказа
 */
export type TResponseFromServer = {
    id: string,         // Идентификатор созданного заказа
    total: number       // Подтвержденная сумма заказа
};

/**
 * Интерфейс для действий с карточкой (клик)
 */
export interface ICardActions {
    onClick?: () => void;
}
```

---

## Абстрактные классы

### Класс Card (абстрактный)

Базовый абстрактный класс для всех карточек товара. Содержит общие элементы: заголовок и цену.

**Конструктор:**
```typescript
constructor(container: HTMLElement)
```
- `container: HTMLElement` - корневой DOM-элемент карточки

**Поля класса:**
- `_titleElement: HTMLElement` - элемент для отображения названия товара
- `_priceElement: HTMLSpanElement` - элемент для отображения цены

**Сеттеры:**
- `set title(value: string)` - устанавливает текст названия товара
- `set price(value: number)` - форматирует и устанавливает цену товара (использует константы из `priceLabelsForCards` для форматирования)

### Класс CardImage (абстрактный)

Наследуется от `Card`, добавляет отображение изображения и категории товара.

**Конструктор:**
```typescript
constructor(container: HTMLElement)
```
- `container: HTMLElement` - корневой DOM-элемент карточки

**Поля класса:**
- `_categoryElement: HTMLElement` - элемент для отображения категории
- `_imageElement: HTMLImageElement` - элемент для отображения изображения

**Сеттеры:**
- `set category(value: string)` - устанавливает категорию и применяет соответствующий CSS-класс из `categoryMap`
- `set image(value: string)` - формирует полный URL изображения с использованием `CDN_URL` и устанавливает его

### Класс Form (абстрактный)

Базовый класс для всех форм приложения. Управляет отображением ошибок и состоянием кнопки отправки.

**Конструктор:**
```typescript
constructor(protected event: IEvents, container: HTMLElement)
```
- `event: IEvents` - брокер событий
- `container: HTMLElement` - корневой DOM-элемент формы

**Поля класса:**
- `_errorElement: HTMLSpanElement` - элемент для отображения ошибок валидации
- `_buttonElement: HTMLButtonElement` - кнопка отправки формы

**Сеттеры:**
- `set errors(errorsObj: IErrors)` - форматирует и отображает ошибки валидации
- `set statusButton(value: boolean)` - управляет доступностью кнопки отправки (true - disabled)

**Обработчики:**
- При клике на кнопку отправки генерирует событие `EventState.ORDER_SUBMIT`

---

## Модели данных

### Класс ProductCatalog (Model)

Класс отвечает за хранение и управление данными о товарах в каталоге. Хранит список всех доступных товаров и информацию о выбранном для детального просмотра товаре.

**Конструктор:**
```typescript
constructor(protected event: IEvents)
```
- `event: IEvents` - брокер событий для оповещения об изменениях

**Поля класса:**
- `_productList: IProduct[]` - приватное поле, хранящее массив всех товаров каталога
- `_selectedProduct: IProduct` - приватное поле, хранящее товар, выбранный для подробного отображения

**Методы класса:**

1. `setProductList(productListArr: IProduct[]): void`
   - Сохраняет массив товаров в модель и генерирует событие `EventState.CATALOG_CHANGED`
   - Параметры: `productListArr: IProduct[]` - массив товаров для сохранения

2. `getProductList(): IProduct[]`
   - Возвращает массив всех товаров из модели
   - Возвращаемое значение: `IProduct[]` - массив товаров

3. `getProductById(id: string): IProduct | null`
   - Находит товар по его идентификатору
   - Параметры: `id: string` - идентификатор товара
   - Возвращаемое значение: `IProduct | null` - найденный товар или null

4. `setSelectedProduct(product: IProduct): void`
   - Сохраняет товар для подробного отображения и генерирует событие `EventState.SELECTED_CARD_SAVE`
   - Параметры: `product: IProduct` - товар для сохранения

5. `getSelectedProduct(): IProduct`
   - Возвращает товар, сохраненный для подробного отображения
   - Возвращаемое значение: `IProduct` - выбранный товар

### Класс Cart (Model)

Класс отвечает за хранение и управление товарами в корзине покупателя.

**Конструктор:**
```typescript
constructor(protected event: IEvents)
```
- `event: IEvents` - брокер событий для оповещения об изменениях

**Поля класса:**
- `_purchaseProductList: IProduct[]` - приватное поле, хранящее массив товаров в корзине

**Методы класса:**

1. `getListFromCart(): IProduct[]`
   - Возвращает массив товаров, которые находятся в корзине
   - Возвращаемое значение: `IProduct[]` - массив товаров в корзине

2. `addToCart(product: IProduct): void`
   - Добавляет товар в корзину и генерирует событие `EventState.CART_CHANGED`
   - Параметры: `product: IProduct` - товар для добавления

3. `removeFromCart(product: IProduct): void`
   - Удаляет товар из корзины и генерирует событие `EventState.CART_CHANGED`
   - Параметры: `product: IProduct` - товар для удаления

4. `clearCart(): void`
   - Полностью очищает корзину и генерирует событие `EventState.CART_CHANGED`

5. `getTotalCartCost(): number`
   - Вычисляет общую стоимость всех товаров в корзине (товары с ценой null считаются как 0)
   - Возвращаемое значение: `number` - суммарная стоимость товаров

6. `getTotalCartCount(): number`
   - Возвращает количество товаров в корзине
   - Возвращаемое значение: `number` - количество товаров

7. `checkProductInCartById(id: string): boolean`
   - Проверяет наличие товара в корзине по его идентификатору
   - Параметры: `id: string` - идентификатор товара
   - Возвращаемое значение: `boolean` - true если товар есть в корзине, false в противном случае

### Класс Buyer (Model)

Класс отвечает за хранение и валидацию данных покупателя.

**Конструктор:**
```typescript
constructor(protected event: IEvents)
```
- `event: IEvents` - брокер событий для оповещения об изменениях

**Поля класса:**
- `_payment: TPayment` - способ оплаты
- `_email: string` - электронная почта
- `_phone: string` - телефон
- `_address: string` - адрес доставки

**Методы класса:**

1. `setOrderInformation(orderInfo: Partial<IBuyer>): void`
   - Частично обновляет данные покупателя и генерирует соответствующие события:
     - `EventState.BUYER_CHANGED` при изменении payment или address
     - `EventState.CONTACT_CHANGED` при изменении email или phone
   - Параметры: `orderInfo: Partial<IBuyer>` - данные для сохранения

2. `getOrderInformation(): IBuyer`
   - Возвращает все сохраненные данные покупателя
   - Возвращаемое значение: `IBuyer` - полные данные покупателя

3. `clearOrderInformation(): void`
   - Очищает все данные покупателя и генерирует события `BUYER_CHANGED` и `CONTACT_CHANGED`

4. `validationOrderInformation(): TErrors`
   - Проверяет валидность всех полей покупателя
   - Возвращает объект с ошибками валидации для каждого невалидного поля
   - Возвращаемое значение: `TErrors` - объект с ошибками валидации

---

## Слой коммуникации

### Класс Communication (Api)

Класс отвечает за взаимодействие с API сервера магазина. Использует композицию, делегируя выполнение HTTP-запросов объекту, реализующему интерфейс `IApi`.

**Конструктор:**
```typescript
constructor(api: IApi)
```
- `api: IApi` - объект для выполнения HTTP-запросов

**Поля класса:**
- `api: IApi` - приватное поле, хранящее объект для выполнения HTTP-запросов

**Методы класса:**

1. `getProductsFromServer(): Promise<TProductList>`
   - Выполняет GET запрос на эндпоинт `/product/` для получения каталога товаров
   - Возвращаемое значение: `Promise<TProductList>` - промис с объектом, содержащим массив товаров и общее количество

2. `postOrderOnServer(data: TRequestForServer): Promise<TResponseFromServer>`
   - Выполняет POST запрос на эндпоинт `/order/` для создания заказа
   - Параметры: `data: TRequestForServer` - данные заказа, включающие способ оплаты, контактные данные, сумму и список идентификаторов товаров
   - Возвращаемое значение: `Promise<TResponseFromServer>` - промис с ответом сервера, содержащим идентификатор заказа и общую сумму

---

## Компоненты представления (View)

### Класс HeaderUI (View)

Отвечает за отображение шапки сайта с счетчиком товаров в корзине.

**Конструктор:**
```typescript
constructor(protected event: IEvents, container: HTMLElement)
```
- `event: IEvents` - брокер событий
- `container: HTMLElement` - корневой DOM-элемент шапки

**Поля класса:**
- `_counterElement: HTMLSpanElement` - элемент для отображения счетчика
- `_cartButton: HTMLButtonElement` - кнопка открытия корзины

**Сеттеры:**
- `set counter(value: number)` - устанавливает значение счетчика

**Обработчики:**
- При клике на кнопку корзины генерирует событие `EventState.CART_OPEN`

### Класс MainGalleryUI (View)

Отвечает за отображение галереи товаров на главной странице.

**Конструктор:**
```typescript
constructor(container: HTMLElement)
```
- `container: HTMLElement` - корневой DOM-элемент (обертка страницы)

**Поля класса:**
- `_galleryElement: HTMLElement` - элемент галереи для размещения карточек

**Сеттеры:**
- `set catalog(items: HTMLElement[])` - добавляет карточки товаров в галерею

### Класс ModalUI (View)

Управляет модальным окном, его открытием, закрытием и содержимым.

**Конструктор:**
```typescript
constructor(protected event: IEvents, container: HTMLElement)
```
- `event: IEvents` - брокер событий
- `container: HTMLElement` - корневой DOM-элемент модального окна

**Поля класса:**
- `_closeButton: HTMLButtonElement` - кнопка закрытия
- `_modalContent: HTMLElement` - контейнер для содержимого

**Сеттеры:**
- `set content(item: HTMLElement)` - устанавливает содержимое модального окна

**Методы:**
- `open(): void` - открывает модальное окно
- `close(): void` - закрывает модальное окно

**Обработчики:**
- Клик по оверлею закрывает модальное окно
- Клик по кнопке закрытия закрывает модальное окно

### Класс CardGalleryUI (View)

Представляет карточку товара в галерее на главной странице. Наследуется от `CardImage`.

**Конструктор:**
```typescript
constructor(container: HTMLElement, actions?: ICardActions)
```
- `container: HTMLElement` - корневой DOM-элемент карточки
- `actions?: ICardActions` - объект с действиями (опционально)

**Обработчики:**
- При клике на карточку вызывает `actions.onClick()` если передан

### Класс CardPreviewUI (View)

Представляет детальную карточку товара в модальном окне. Наследуется от `CardImage`.

**Конструктор:**
```typescript
constructor(container: HTMLElement, actions?: ICardActions)
```
- `container: HTMLElement` - корневой DOM-элемент карточки
- `actions?: ICardActions` - объект с действиями

**Поля класса:**
- `_descriptionElement: HTMLParagraphElement` - элемент для описания товара
- `_cardButton: HTMLButtonElement` - кнопка действия (купить/удалить)

**Сеттеры:**
- `set description(value: string)` - устанавливает описание товара
- `set textButton(value: string)` - устанавливает текст кнопки
- `set statusButton(value: boolean)` - управляет доступностью кнопки

**Обработчики:**
- При клике на кнопку вызывает `actions.onClick()` если передан

### Класс ProductInCartUI (View)

Представляет товар в списке корзины. Наследуется от `Card`.

**Конструктор:**
```typescript
constructor(container: HTMLElement, actions?: ICardActions)
```
- `container: HTMLElement` - корневой DOM-элемент элемента корзины
- `actions?: ICardActions` - объект с действиями

**Поля класса:**
- `_index: HTMLSpanElement` - элемент для отображения порядкового номера
- `_removeButton: HTMLButtonElement` - кнопка удаления товара

**Сеттеры:**
- `set index(value: number)` - устанавливает порядковый номер товара

**Обработчики:**
- При клике на кнопку удаления вызывает `actions.onClick()`

### Класс CartUI (View)

Отвечает за отображение корзины с товарами.

**Конструктор:**
```typescript
constructor(protected event: IEvents, container: HTMLElement)
```
- `event: IEvents` - брокер событий
- `container: HTMLElement` - корневой DOM-элемент корзины

**Поля класса:**
- `_cartList: HTMLUListElement` - список товаров в корзине
- `_cartPlaceOrderButton: HTMLButtonElement` - кнопка оформления заказа
- `_orderSumm: HTMLSpanElement` - элемент для отображения общей суммы

**Сеттеры:**
- `set summ(value: number)` - форматирует и устанавливает общую сумму
- `set listOfPosition(items: HTMLElement[])` - отображает список товаров
- `set statusButton(value: boolean)` - управляет доступностью кнопки оформления

**Обработчики:**
- При клике на кнопку оформления генерирует событие `EventState.ORDER_START`

### Класс FormOrderUI (View)

Форма для ввода адреса и выбора способа оплаты. Наследуется от `Form`.

**Конструктор:**
```typescript
constructor(protected event: IEvents, container: HTMLElement)
```
- `event: IEvents` - брокер событий
- `container: HTMLElement` - корневой DOM-элемент формы

**Поля класса:**
- `_btnContainer: HTMLButtonElement[]` - массив кнопок выбора оплаты
- `_adressInputElement: HTMLInputElement` - поле ввода адреса

**Сеттеры:**
- `set payment(value: string)` - активирует соответствующую кнопку оплаты
- `set address(value: string)` - устанавливает значение поля адреса

**Обработчики:**
- При клике на кнопки оплаты генерирует событие `EventState.FORM_EDIT` с выбранным способом
- При вводе адреса генерирует событие `EventState.FORM_EDIT` с новым значением

### Класс FormContactsUI (View)

Форма для ввода контактных данных (email, телефон). Наследуется от `Form`.

**Конструктор:**
```typescript
constructor(protected event: IEvents, container: HTMLElement)
```
- `event: IEvents` - брокер событий
- `container: HTMLElement` - корневой DOM-элемент формы

**Поля класса:**
- `_emailInputElement: HTMLInputElement` - поле ввода email
- `_phoneInputElement: HTMLInputElement` - поле ввода телефона

**Сеттеры:**
- `set email(value: string)` - устанавливает значение поля email
- `set phone(value: string)` - устанавливает значение поля телефона

**Обработчики:**
- При вводе email генерирует событие `EventState.FORM_EDIT` с новым значением
- При вводе телефона генерирует событие `EventState.FORM_EDIT` с новым значением

### Класс SuccessfulUI (View)

Отображает сообщение об успешном оформлении заказа.

**Конструктор:**
```typescript
constructor(protected event: IEvents, container: HTMLElement)
```
- `event: IEvents` - брокер событий
- `container: HTMLElement` - корневой DOM-элемент сообщения

**Поля класса:**
- `_summElement: HTMLParagraphElement` - элемент для отображения списанной суммы
- `_buttonElement: HTMLButtonElement` - кнопка закрытия

**Сеттеры:**
- `set summ(value: number)` - форматирует и отображает списанную сумму

**Обработчики:**
- При клике на кнопку генерирует событие `EventState.MODAL_CLOSE`

---

## Презентер (main.ts)

Файл `main.ts` содержит логику приложения, связывающую модели и представления через брокер событий.

### Инициализация

Создаются экземпляры всех необходимых классов:
- Брокер событий: `events = new EventEmitter()`
- API: `api = new Api(API_URL)`
- Коммуникация с сервером: `communicationApi = new Communication(api)`
- Модели: `productsCatalog`, `buyerModel`, `cartModel`
- Представления: `header`, `main`, `modal`, `cart`, `cardPreview`, `formOrder`, `formContacts`, `success`

### Обработчики событий

#### События каталога
- `EventState.CATALOG_CHANGED` - обновляет отображение галереи товаров
- `EventState.CARD_SELECTED` - сохраняет выбранный товар
- `EventState.SELECTED_CARD_SAVE` - открывает модальное окно с деталями товара

#### События корзины
- `EventState.BUY_CLICK` - добавляет или удаляет товар из корзины
- `EventState.CART_CHANGED` - обновляет отображение корзины и счетчик в шапке
- `EventState.CART_OPEN` - открывает модальное окно с корзиной
- `EventState.PRODUCT_REMOVE` - удаляет товар из корзины

#### События оформления заказа
- `EventState.ORDER_START` - открывает форму заказа
- `EventState.FORM_EDIT` - обновляет данные покупателя
- `EventState.BUYER_CHANGED` - валидирует и обновляет форму заказа
- `EventState.CONTACT_CHANGED` - валидирует и обновляет форму контактов
- `EventState.ORDER_SUBMIT` - обрабатывает отправку заказа на сервер

#### Прочие события
- `EventState.MODAL_CLOSE` - закрывает модальное окно

### Загрузка данных
При запуске приложения выполняется запрос к серверу для получения каталога товаров. В случае успеха данные сохраняются в модели `productsCatalog`, что вызывает событие `CATALOG_CHANGED` и отображение товаров на странице.

---

## Константы и утилиты

### Константы (constants.ts)

```typescript
// URL для API и изображений
export const API_URL = `${import.meta.env.VITE_API_ORIGIN}/api/weblarek`;
export const CDN_URL = `${import.meta.env.VITE_API_ORIGIN}/content/weblarek`;

// Соответствие категорий CSS-классам
export const categoryMap = {
  'софт-скил': 'card__category_soft',
  'хард-скил': 'card__category_hard',
  'кнопка': 'card__category_button',
  'дополнительное': 'card__category_additional',
  'другое': 'card__category_other',
};

// Форматирование цены
export const priceLabelsForCards = {
  free: 'Бесценно',
  label: ' синапсов',
};

// Текст для кнопок в модальном окне карточки
export const btnTextForModalCard = {
  buy: 'Купить',
  disabled: 'Недоступно',
  delete: 'Удалить из корзины',
};

// Перечисление событий
export enum EventState {
  CART_OPEN = 'cart:open',
  CART_CHANGED = 'cart:changed',
  CATALOG_CHANGED = 'catalog:changed',
  CARD_SELECTED = 'card:selected',
  SELECTED_CARD_SAVE = 'selected-card:save',
  BUY_CLICK = 'buy:click',
  MODAL_CLOSE = 'modal:close',
  PRODUCT_REMOVE = 'product:remove',
  ORDER_START = 'order:start',
  FORM_EDIT = 'form:edit',
  ORDER_SUBMIT = 'order:submit',
  BUYER_CHANGED = 'buyer:changed',
  CONTACT_CHANGED = 'contact:changed',
}
```

### DOM-элементы (dom-refs.ts)

```typescript
export const DOM_ELEMENTS = {
  wrapper: document.querySelector('.page__wrapper') as HTMLElement,
  header: document.querySelector('.header') as HTMLElement,
  page: document.querySelector('.page__wrapper') as HTMLElement,
  modal: document.querySelector('.modal') as HTMLDivElement,
  cardGalleryTemplate: document.querySelector('#card-catalog') as HTMLTemplateElement,
  cardPreviewTemplate: document.querySelector('#card-preview') as HTMLTemplateElement,
  cart: document.querySelector('#basket') as HTMLTemplateElement,
  productInCartTemplate: document.querySelector('#card-basket') as HTMLTemplateElement,
  formOrder: document.querySelector('#order') as HTMLTemplateElement,
  formContacts: document.querySelector('#contacts') as HTMLTemplateElement,
  successful: document.querySelector('#success') as HTMLTemplateElement,
} as const;
```

### Утилиты (utils.ts)

Основные утилитарные функции:
- `cloneTemplate<T>(query: string | HTMLTemplateElement): T` - клонирует содержимое шаблона
- `ensureElement<T>(selectorElement: SelectorElement<T>, context?: HTMLElement): T` - гарантированно получает DOM-элемент
- `ensureAllElements<T>(selectorElement: SelectorCollection<T>, context: HTMLElement): T[]` - получает все DOM-элементы по селектору
- `bem(block: string, element?: string, modifier?: string)` - формирует BEM-классы
- `setImage(element: HTMLImageElement, src: string, alt?: string)` - устанавливает изображение с обработкой ошибок

---

## Типы данных для API

В файле `types/index.ts` определены следующие типы для работы с API:

```typescript
// Типы для методов API
export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

// Интерфейс для API-клиента
export interface IApi {
    get<T extends object>(uri: string): Promise<T>;
    post<T extends object>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}

// Ответ сервера со списком товаров
export type TProductList = {
    total: number,
    items: IProduct[]
};

// Данные для отправки заказа
export type TRequestForServer = IBuyer & {
    total: number,
    items: string[]
};

// Ответ сервера на создание заказа
export type TResponseFromServer = {
    id: string,
    total: number
};
```