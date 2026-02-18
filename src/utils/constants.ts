/* Константа для получения полного пути для сервера. Для выполнения запроса
необходимо к API_URL добавить только ендпоинт. */
export const API_URL = `${import.meta.env.VITE_API_ORIGIN}/api/weblarek`;

/* Константа для формирования полного пути к изображениям карточек.
Для получения полной ссылки на картинку необходимо к CDN_URL добавить только название файла изображения,
которое хранится в объекте товара. */
export const CDN_URL = `${import.meta.env.VITE_API_ORIGIN}/content/weblarek`;

/* Константа соответствий категорий товара модификаторам, используемым для отображения фона категории. */
export const categoryMap = {
  'софт-скил': 'card__category_soft',
  'хард-скил': 'card__category_hard',
  'кнопка': 'card__category_button',
  'дополнительное': 'card__category_additional',
  'другое': 'card__category_other',
};

export const settings = {

};

export const priceLabelsForCards = {
  free: 'Бесценно',
  label: ' синопсов',
};

export const btnTextForModalCard = {
  buy: 'Купить',
  disabled: 'Недоступно',
  delete: 'Удалить из корзины',
};

/* Перечисление состояний событий */
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
  BUYER_CAHAGED = 'buyer:changed',
  CONTACT_CHANGED = 'contact:changed',
};