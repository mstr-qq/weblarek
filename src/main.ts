import './scss/styles.scss';

import { cloneTemplate } from './utils/utils.ts';

import { ProductCatalog } from './components/models/ProductModel.ts';
import { Cart } from './components/models/CartModel.ts';
import { Buyer } from './components/models/BuyerModel.ts';
import { Api } from './components/base/Api.ts';
import { API_URL, EventState, btnTextForModalCard } from './utils/constants.ts';
import { Communication } from './components/api/ShopApi.ts';

import { EventEmitter } from './components/base/Events.ts';
import { DOM_ELEMENTS } from './utils/dom-refs.ts';
import { HeaderUI } from './components/view/HeaderUI.ts';
import { MainGalleryUI } from './components/view/MainGalleryUI.ts';
import { ModalUI } from './components/view/ModalUI.ts';

import { CardGalleryUI } from './components/view/CardGalleryUI.ts';
import { IBuyer, IProduct, TProductList, TResponseFromSerever } from './types/index.ts';
import { CardPreviewUI } from './components/view/CardPreviewUI.ts';
import { CartUI } from './components/view/CartUI.ts';
import { ProductInCartUI } from './components/view/ProductInCartUI.ts';
import { FormOrderUI } from './components/view/FormOrderUI.ts';
import { FormContactsUI } from './components/view/FormContactsUI.ts';
import { SuccessfulUI } from './components/view/SuccessfulUI.ts';

/* Экземпляры клсссов */
const events = new EventEmitter();
const api = new Api(API_URL);
const communicationApi = new Communication(api);
const productsCatalog = new ProductCatalog(events);
const buyerModel = new Buyer(events);
const cartModel = new Cart(events);

const header = new HeaderUI(events, DOM_ELEMENTS.header);
const main = new MainGalleryUI(DOM_ELEMENTS.page);
const modal = new ModalUI(events, DOM_ELEMENTS.modal);
const cart = new CartUI(events, cloneTemplate(DOM_ELEMENTS.cart));

const cardPreview = new CardPreviewUI(cloneTemplate(DOM_ELEMENTS.cardPreviewTemplate), {
  onClick: () => events.emit(EventState.BUY_CLICK, productsCatalog.getSelectedProduct())
});

const formOrder = new FormOrderUI(events, cloneTemplate(DOM_ELEMENTS.formOrder));
const formContacts = new FormContactsUI(events, cloneTemplate(DOM_ELEMENTS.formContacts));
const success = new SuccessfulUI(events, cloneTemplate(DOM_ELEMENTS.successful));


/* Обработчики событий */
events.on(EventState.CATALOG_CHANGED, () => {
  const cardsArr = productsCatalog.getProductList().map((product) => {
    const card = new CardGalleryUI(cloneTemplate(DOM_ELEMENTS.cardGalleryTemplate), {
      onClick: () => events.emit(EventState.CARD_SELECTED, product)
    });
    return card.render(product);
  });

  main.render({ catalog: cardsArr });
});

events.on(EventState.CARD_SELECTED, (product: IProduct) => {
  productsCatalog.setSelectedProduct(product);
});

events.on(EventState.SELECTED_CARD_SAVE, () => {
  const selectedProductCard = productsCatalog.getSelectedProduct();
  const cardModalRenderObject = {
    ...selectedProductCard,
    textButton: selectedProductCard.price === null
                ? btnTextForModalCard.disabled
                : cartModel.checkProductInCartById(selectedProductCard.id)
                ? btnTextForModalCard.delete
                : btnTextForModalCard.buy,
    statusButton: !Boolean(selectedProductCard.price),
  };
  const contentModalElement = cardPreview.render(cardModalRenderObject);

  modal.render({ content: contentModalElement });
  modal.open();
});

events.on(EventState.BUY_CLICK, (product: IProduct) => {
  cartModel.checkProductInCartById(product.id) === false
            ? cartModel.addToCart(product)
            : cartModel.removeFromCart(product);
  modal.close();
});

events.on(EventState.CART_CHANGED, () => {
  const selectedProductCard = productsCatalog.getSelectedProduct();
  const counter = cartModel.getTotalCartCount();
  const updTextButton = {
    ...selectedProductCard,
    textButton: btnTextForModalCard.delete,
  };

  const productListInCart = cartModel.getListFromCart();
  const productListInCartArr = productListInCart.map((product: IProduct, index) => {
    const productInCart = new ProductInCartUI(cloneTemplate(DOM_ELEMENTS.productInCartTemplate), {
      onClick: () => events.emit(EventState.PRODUCT_REMOVE, product)
    });
    const productCard = {
      ...product,
      index: index + 1,
    };
    return productInCart.render(productCard);
  });

  const cartRenderObject = {
    listOfPosition: productListInCartArr,
    summ: cartModel.getTotalCartCost(),
    statusButton: !Boolean(cartModel.getTotalCartCost()),
  };
  const cartRender = cart.render(cartRenderObject);

  modal.render({ content: cartRender });
  cardPreview.render(updTextButton);
  header.render( { counter } );
});

events.on(EventState.CART_OPEN, () => {
  modal.render({ content: cart.render() });
  modal.open();
});

events.on(EventState.PRODUCT_REMOVE, (product: IProduct) => {
  cartModel.removeFromCart(product);
});

events.on(EventState.ORDER_START, () => {
  modal.render({ content: formOrder.render() });
});

events.on(EventState.FORM_EDIT, (formInformation: Partial<IBuyer>) => {
  buyerModel.setOrderInformation(formInformation);
});

events.on(EventState.BUYER_CAHAGED, (buyer) => {
  const errors = buyerModel.validationOrderInformation();
  const { payment, address } = errors;
  const errorsFromOrderForm = { payment, address };
  const statusButton = !Object.values(errorsFromOrderForm).every((elem) => elem === null);
  const formRenderObject = {
    ...buyer,
    errors: errorsFromOrderForm,
    statusButton
  };

  formOrder.render(formRenderObject);
});

events.on(EventState.ORDER_SUBMIT, () => {
  const errors = buyerModel.validationOrderInformation();
  if (!Object.values(errors).every((elem) => elem === null)) {
    modal.render({ content: formContacts.render() });
  } else {
    const items = cartModel.getListFromCart().map((product: IProduct) => product.id);
    const orderInfoOnServerObj = {
      ...buyerModel.getOrderInformation(),
      total: cartModel.getTotalCartCost(),
      items
    };
    (async () => {
      try {
        const responseFromServer: TResponseFromSerever = await communicationApi.postOrderOnServer(orderInfoOnServerObj);
          cartModel.clearCart();
          buyerModel.clearOrderInformation();
          modal.render({ content: success.render({summ: responseFromServer.total}) });
      } catch (error) {
        console.error(error);
      }
    })();
  };
});

events.on(EventState.CONTACT_CHANGED, (info) => {
  const errors = buyerModel.validationOrderInformation();
  const { email, phone } = errors;
  const errorsFromContactsForm = { email, phone };
  const statusButton = !Object.values(errorsFromContactsForm).every((elem) => elem === null);
  const formRenderObject = {
    ...info,
    errors: errorsFromContactsForm,
    statusButton
  };

  formContacts.render(formRenderObject);
});

events.on(EventState.MODAL_CLOSE, () => {;
  modal.close();
});

/* Запрос данных с сервера */
try {
  const catalogOfProductsFromServer: TProductList = await communicationApi.getProductsFromServer();
  productsCatalog.setProductList(catalogOfProductsFromServer.items);
} catch (error) {
  console.error(error);
};