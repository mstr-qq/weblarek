/**
 *  Источник DOM-элементов для создания экземпляров класса
 */
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