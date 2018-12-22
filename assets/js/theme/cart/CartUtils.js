import Modal from 'bc-modal';
import utils from '@bigcommerce/stencil-utils';
import Alert from '../components/Alert';
import QuantityWidget from '../components/QuantityWidget';
import refreshContent from './refreshContent';
import ProgressButton from '../utils/ProgressButton';
import swatchSelect from '../product/swatchSelect';

export default class CartUtils {
  constructor(modules, options) {
    this.modules = modules;
    this.$cartContent = $('[data-cart-content]');
    this.quantityInput = '[data-quantity-control-input]';
    this.cartItem = '[data-cart-item]';
    this.cartAlerts = new Alert($('[data-alerts]'));
    this.productData = {};

    this.callbacks = $.extend({
      willUpdate: () => console.log('Update requested.'),
      didUpdate: () => console.log('Update executed.'),
    }, options.callbacks);

    this.editOptionsModal = new Modal({
      modalClass: 'modal-edit-options',
      afterShow: ($modal) => {
        this._editCartItem($modal, this.id);
      }
    });

    new QuantityWidget({scope: '[data-cart-content]'});
  }

  init() {
    this._cacheInitialQuantities();
    this._bindEvents();
  }

  _bindEvents() {
    this.$cartContent.on('change', this.quantityInput, (event) => {
      const target = event.target;
      this._updateQuantity(target);
    });

    this.$cartContent.on('change', this.quantityInput, _.bind(_.debounce(this._updateCartItem, 750), this));

    this.$cartContent.on('click', '[data-cart-item-remove]', (event) => {
      event.preventDefault();
      this._removeCartItem(event);
    });

    this.$cartContent.on('cart-initialize-modules', () => {
      this.modules.CouponCodes.init();
    });

    $('body').on('click', '.mini-cart [data-cart-item-remove]', () => {
      this.callbacks.willUpdate();
    });

    utils.hooks.on('cart-item-remove-remote', () => {
      refreshContent(this.callbacks.didUpdate, true);
    });

    $('body').on('click', '[data-item-edit]', (event) => {
      event.preventDefault();

      this.id = $(event.currentTarget).attr('data-item-edit');

      if (!this.id) { return; }

      this.editOptionsModal.open();

      $('.modal-content').prepend('<svg class="icon icon-spinner"><use xlink:href="#icon-spinner" /></svg>');
    });
  }

  _cacheInitialQuantities() {
    $(this.cartItem).each((index, element) => {
      const $cartItem = $(element);
      const itemId = $cartItem.data('item-id');

      this.productData[itemId] = {
        oldQuantity: parseInt($cartItem.find(this.quantityInput).attr('value'), 10),
        quantityAltered: false,
      };
    });
  }

  _updateQuantity(target) {
    const $target = $(target);
    const itemId = $target.closest('[data-quantity-control]').data('quantity-control');

    const newQuantity = parseInt($target.val(), 10);

    if (this.productData[itemId].oldQuantity !== newQuantity) {
      this.productData[itemId].quantityAltered = true;
      this.productData[itemId].newQuantity = newQuantity;
    } else {
      delete this.productData[itemId].newQuantity;
      this.productData[itemId].quantityAltered = false;
    }
  }

  _updateCartItem(event) {
    const $target = $(event.currentTarget);
    const $cartItem = $target.closest(this.cartItem);
    const itemId = $cartItem.data('item-id');

    this.callbacks.willUpdate();

    if (this.productData[itemId].quantityAltered) {
      const $quantityInput = $cartItem.find(this.quantityInput);
      const newQuantity = this.productData[itemId].newQuantity;

      utils.api.cart.itemUpdate(itemId, newQuantity, (err, response) => {
        if (response.data.status === 'succeed') {
          const remove = (newQuantity === 0);
          this.productData[itemId].oldQuantity = newQuantity;
          refreshContent(this.callbacks.didUpdate, remove);
        } else {
          $quantityInput.val(parseInt(this.productData[itemId].oldQuantity), 10);
          this.cartAlerts.error(response.data.errors.join('\n'), true);
          this.callbacks.didUpdate();
        }
      });
    }
  }

  _removeCartItem(event) {
    const itemId = $(event.currentTarget).closest(this.cartItem).data('item-id');

    this.callbacks.willUpdate();

    utils.api.cart.itemRemove(itemId, (err, response) => {
      if (response.data.status === 'succeed') {
        refreshContent(this.callbacks.didUpdate, true);
      } else {
        this.cartAlerts.error(response.data.errors.join('\n'), true);

        this.callbacks.didUpdate();
      }
    });
  }

  _editCartItem($modal, itemId) {
    const options = {
        template: 'cart/configure-product',
    };

    utils.api.productAttributes.configureInCart(itemId, options, (err, response) => {
      $modal.find('.modal-content').html(response.content);

      this.editOptionsModal.position();

      this.cartOptionAlerts = new Alert($('[data-cart-option-alerts]'));
      this.progressButton = new ProgressButton();
      swatchSelect();

      $('.cart-option-form').on('submit', (event) => {
        event.preventDefault();

        const url = $(event.currentTarget).attr('action');
        const $button = $(event.currentTarget).find('.button-save-options');

        this.progressButton.progress($button);

        $.ajax({
          type: "POST",
          url: url,
          data: $(event.currentTarget).serialize(),
          success: (data) => {
            refreshContent(() => {
              this.progressButton.complete($button);
              this.editOptionsModal.close();
            }, true);
          },
          error: () => {
            this.progressButton.complete($button);
          },
        });
      });
    });

    utils.hooks.on('product-option-change', (event, option) => {
      const $changedOption = $(option);
      const $form = $changedOption.parents('form');
      const $submit = $('.button-save-options', $form);
      const item = $('[name="item_id"]', $form).attr('value');

      utils.api.productAttributes.optionChange(item, $form.serialize(), (err, result) => {
        const data = result.data || {};

        if (err) {
          alert(err);
          return false;
        }

        if (data.purchasing_message) {
          this.cartOptionAlerts.error(data.purchasing_message, true);
          $submit.prop('disabled', true);
        } else {
          $submit.prop('disabled', false);
          this.cartOptionAlerts.clear();
        }

        if (!data.purchasable || !data.instock) {
          $submit.prop('disabled', true);
        } else {
          $submit.prop('disabled', false);
        }
      });
    });
  }
}
