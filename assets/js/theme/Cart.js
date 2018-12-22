import Loading from 'bc-loading';
import Modal from 'bc-modal';
import PageManager from '../PageManager';
import utils from '@bigcommerce/stencil-utils';
import CartUtils from './cart/CartUtils';
import ShippingCalculator from './cart/ShippingCalculator';
import CouponCodes from './cart/CouponCodes';
import GiftCertificates from './cart/GiftCertificates';
import GiftWrapping from './cart/GiftWrapping';
import ProgressButton from './utils/ProgressButton';
import svgIcon from './global/svgIcon';

export default class Cart extends PageManager {
  constructor() {
    super();

    this.$cartContent = $('[data-cart-content]');
    this.progressButton = new ProgressButton();
    this.$giftCertForm = $('[data-gift-certificate-form]');

    this.certificateModal = new Modal({
      el: $('#certificate-modal'),
      modalClass: 'modal-narrow',
    });
    this._bindEvents();

    if (window.ApplePaySession && $('.dev-environment').length) {
      $(document.body).addClass('apple-pay-supported');
    }
  }

  loaded(next) {
    const context = this.context;

    const loadingOptions = {
      loadingMarkup: `<div class="loading-overlay">${svgIcon('spinner')}</div>`,
      scrollLockClass: 'scroll-locked-loading'
    };
    const cartContentOverlay = new Loading(loadingOptions, true, '.product-listing');
    const cartTotalsOverlay = new Loading(loadingOptions, true, '[data-cart-totals]');
    const $certificateButton = $('.form-gift-certificate .button');
    const $shippingButton = $('.button-apply-shipping');

    new ShippingCalculator({
      context,
    });

    this.GiftWrapping = new GiftWrapping({
      scope: '[data-cart-content]',
      context,
    });

    this.CouponCodes = new CouponCodes('[data-coupon-codes]', {
      context,
      visibleClass: 'visible',
      callbacks: {
        willUpdate: () => cartTotalsOverlay.show(),
        didUpdate: () => cartTotalsOverlay.hide(),
      },
    });

    this.GiftCertificates = new GiftCertificates('[data-gift-certificates]', {
      context,
      visibleClass: 'visible',
      callbacks: {
        willUpdate: () => this.progressButton.progress($certificateButton),
        didUpdate: () => {
          this.progressButton.complete($certificateButton);
          this.certificateModal.close();
          this.$giftCertForm.trigger("reset");
        }
      },
    });

    this.CartUtils = new CartUtils({
      CouponCodes: this.CouponCodes,
      GiftCertificates: this.GiftCertificates,
    }, {
      callbacks: {
        willUpdate: () => cartContentOverlay.show(),
        didUpdate: () => cartContentOverlay.hide(),
      },
    }).init();

    next();
  }

  _bindEvents() {
    $(document).on('click', '[data-gift-certificate-toggle]', (event) => {
      event.preventDefault();
      this.certificateModal.open();
    });
  }
}
