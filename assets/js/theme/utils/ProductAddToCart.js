import utils from '@bigcommerce/stencil-utils';

export default class ProductAddToCart {
  constructor(context) {
    this.$body = $(document.body);
    this.context = context;
  }

  /**
   * Build our error/success messages based on response.
   * @param {object} err - the (potential) returned error object.
   * @param {object} response - the ajax response from the add-to-cart action.
   * @param {string} title - The name of the added product.
   */
  parseResponse(err, response, title, hasHash) {
    let message = '';
    let status = '';
    let hash = '';

    if (err) {
      status = 'error';

      if (response.data.error) {
        message = response.data.error;
      } else {
        message = this.context.messagesProductGeneral;
      }

    } else {
      status = 'success';

      if (this.$body.hasClass('success-type-banner')) {
        message = this.context.messagesProductAddSuccess;
        message = message
                    .replace('*product*', `"${title}"`)
                    .replace('*cart_link*', `<a href=${this.context.urlsCart}>${this.context.cartLink}</a>`)
                    .replace('*checkout_link*', `<a href=${this.context.urlsCheckout}>${this.context.checkoutLink}</a>`);
      } else {
        message = this.context.messagesProductModalAddSuccess;
        message = message.replace('*product*', `"${title}"`);
      }

      if (hasHash) {
        hash = response.data.cart_item.hash;
      }
    }

    return {
      status: status,
      message: message,
      hash: hash
    }
  }

  updateSuccessModal($modal, cartItemHash, onComplete) {
    this.getCartContent(cartItemHash, (err, response) => {
      const $modalContents = $('.modal-success').find('.success-content');

      if (err) {
        return;
      }

      $modalContents.html(response);

      if (onComplete) {
        onComplete(response);
      }
    });
  }

  getCartContent(cartItemHash, onComplete) {
    const options = {
      template: 'products/success-modal',
      params: {
        suggest: cartItemHash,
      }
    };

    utils.api.cart.getContent(options, onComplete);
  }
}
