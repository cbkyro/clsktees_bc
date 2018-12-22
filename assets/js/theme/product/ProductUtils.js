import utils from '@bigcommerce/stencil-utils';
import Modal from 'bc-modal';
import Alert from '../components/Alert';
import ProgressButton from '../utils/ProgressButton';
import ProductAddToCart from '../utils/ProductAddToCart';
import QuantityWidget from '../components/QuantityWidget';
import WishList from './WishList';
import _ from 'lodash';

export default class ProductUtils {
  constructor(el, options) {
    this.$el = $(el);
    this.$body = $(document.body);
    this.options = options;
    this.productId = this.$el.find('[data-product-id]').val();
    this.pageAlerts = new Alert($('[data-alerts]'));
    this.productAlerts = new Alert($('[data-product-message]'));
    this.productTitle = $(el).data('product-title');
    this.productAttributesData = window.BCData.product_attributes;
    this.$form = this.$el.find('form[data-cart-item-add]');

    this.progressButton = new ProgressButton();
    new QuantityWidget({scope: '[data-product-id]'});

    this.callbacks = $.extend({
      willUpdate: () => console.log('Update requested.'),
      didUpdate: () => console.log('Update executed.'),
      didSuccess: () => {},
      switchImage: (url) => console.log(`Image switch attempted for ${url}`),
    }, options.callbacks);

    // Set up the modal options
    if (this.$body.hasClass('success-type-popup')) {
      this.modalAlerts = new Alert($('[data-modal-alerts]'));
      this.successModal = new Modal({
        el: $('#success-modal'),
        modalClass: 'modal-success'
      });
    }
  }

  init(context) {
    this.context = context;
    const $productOptionsElement = $('[data-product-option-change]', this.$form);
    const hasOptions = $productOptionsElement.length > 0 ? true : false;
    const hasDefaultOptions = $productOptionsElement.find('[data-default]').length;

    if (hasDefaultOptions || (_.isEmpty(this.productAttributesData) && hasOptions)) {
      const $productId = $('[name="product_id"]', this.$form).val();
      utils.api.productAttributes.optionChange($productId, this.$form.serialize(), (err, response) => {
        const attributesData = response.data || {};
        const attributesContent = response.content || {};
        this._updateAttributes(attributesData);
      });
    } else {
      this._updateAttributes(this.productAttributesData);
    }

    this._bindProductOptionChange();

    this._boundCartCallback = this._addProductToCart.bind(this);
    utils.hooks.on('cart-item-add', this._boundCartCallback);

    this.productAddTocart = new ProductAddToCart(context)

    new WishList(this.$el, context, this.options.quickshop);
  }

  /**
   *
   * Cleanup - useful for closing quickshop modals
   *
   */
  destroy() {
    utils.hooks.off('cart-item-add', this._boundCartCallback);
  }

  /**
   * Cache an object of jQuery elements for DOM updating
   * @param  jQuery $el - a wrapping element of the scoped product
   * @return {object} - buncha jQuery elements which may or may not exist on the page
   */
  _getViewModel($el) {
    return {
      $price: $('[data-product-price-wrapper="without-tax"]', $el),
      $priceWithTax: $('[data-product-price-wrapper="with-tax"]', $el),
      $saved: $('[data-product-price-saved]', $el),
      $sku: $('[data-product-sku]', $el),
      $weight: $('[data-product-weight]', $el),
      $addToCart: $('[data-button-purchase]', $el),
      $imagePreview: $('[data-variation-preview]', $el),
      stock: {
        $selector: $('[data-product-stock]', $el),
        $level: $('[data-product-stock-level]', $el),
      },
    };
  }

  /**
   * Bind product options changes.
   */
  _bindProductOptionChange() {
    utils.hooks.on('product-option-change', (event, changedOption) => {
      const isBlankEmit = (!event && !changedOption);
      const $changedOption = $(changedOption);
      const $form = this.$el.find('[data-cart-item-add]');

      // Skip options that don't belong to our product, ignore if is programmatic emit
      if (!$.contains($form.get(0), changedOption) && !isBlankEmit) {
        return;
      }

      // Do not trigger an ajax request if it's a file or if the browser doesn't support FormData
      if ($changedOption.attr('type') === 'file' || window.FormData === undefined) {
        return;
      }

      // If our form data doesn't include the product-options-count with a positive value, return
      if ($form.data('product-options-count') < 1) {
        return;
      }

      this.pageAlerts.clear();

      utils.api.productAttributes.optionChange(this.productId, $form.serialize(), (err, response) => {
        const productAttributesData = response.data || {};
        const productAttributesContent = response.content || {};

        this._updateAttributes(productAttributesData);
        this._updateView(productAttributesData, $changedOption);
      });
    });
  }

  _updateView(data, changedOption) {
    const viewModel = this._getViewModel(this.$el);

    // updating price
    if (data.price && viewModel.$price.length) {
      const priceStrings = {
        price: data.price,
        excludingTax: this.context.productExcludingTax,
        salePriceLabel: this.context.salePriceLabel,
        nonSalePriceLabel: this.context.nonSalePriceLabel,
        retailPriceLabel: this.context.retailPriceLabel,
        priceLabel: this.context.priceLabel,
      };
      viewModel.$price.html(this.options.priceWithoutTaxTemplate(priceStrings));
    }

    if (data.price && viewModel.$priceWithTax.length) {
      const priceStrings = {
        price: data.price,
        includingTax: this.context.productIncludingTax,
        salePriceLabel: this.context.salePriceLabel,
        nonSalePriceLabel: this.context.nonSalePriceLabel,
        retailPriceLabel: this.context.retailPriceLabel,
        priceLabel: this.context.priceLabel,
      };
      viewModel.$priceWithTax.html(this.options.priceWithTaxTemplate(priceStrings));
    }

    if (data.price && viewModel.$saved.length) {
      const priceStrings = {
        price: data.price,
        savedString: this.context.productYouSave,
      };
      viewModel.$saved.html(this.options.priceSavedTemplate(priceStrings));
    }

    // stock
    if (data.stock) {
      viewModel.stock.$selector.removeClass('product-details-hidden');
      viewModel.stock.$level.text(data.stock);
    } else {
      viewModel.stock.$level.text('0');
    }

    // update sku if exists
    if (data.sku && viewModel.$sku.length) {
      viewModel.$sku.html(data.sku);
    }

    // update weight if exists
    if (data.weight && viewModel.$weight.length) {
      viewModel.$weight.html(data.weight.formatted);
    }

    // handle product variant image if exists
    if (data.image) {
      const productImageUrl = utils.tools.image.getSrc(
        data.image.data,
        this.context.themeImageSizes.zoom
      );
      const zoomImageUrl = utils.tools.image.getSrc(
        data.image.data,
        this.context.themeImageSizes.product
      );
      const inputId = changedOption.attr('name') + changedOption.val();

      this.callbacks.switchImage(productImageUrl, zoomImageUrl, data.image.alt, inputId);
    }

    // update submit button state
    if (!data.purchasable || !data.instock) {
      setTimeout(() => {
        this.pageAlerts.error(data.purchasing_message || this.context.productOptionUnavailable, true);
      }, 50);
      viewModel.$addToCart
        .addClass(this.buttonDisabledClass)
        .prop('disabled', true);
    } else {
      viewModel.$addToCart
        .removeClass(this.buttonDisabledClass)
        .prop('disabled', false);
    }
  }

  _updateAttributes(data) {
    if (data === undefined) { return; }

    const behavior = data.out_of_stock_behavior;
    const inStockIds = data.in_stock_attributes;
    const outOfStockMessage = ` (${data.out_of_stock_message})`;

    if (behavior !== 'hide_option' && behavior !== 'label_option') {
      return;
    }

    $('[data-product-attribute-value]', this.$el).each((i, attribute) => {
      const $attribute = $(attribute);
      const attrId = parseInt($attribute.data('product-attribute-value'), 10);

      if (inStockIds.indexOf(attrId) !== -1) {
        this._enableAttribute($attribute, behavior, outOfStockMessage);
      } else {
        this._disableAttribute($attribute, behavior, outOfStockMessage);
      }
    });
  }

  _disableAttribute($attribute, behavior, outOfStockMessage) {
    if (this._getAttributeType($attribute) === 'set-select') {
      return this.disableSelectOptionAttribute($attribute, behavior, outOfStockMessage);
    }

    if (behavior === 'hide_option') {
      $attribute.hide();
    } else {
      $attribute.addClass('option-unavailable');
    }
  }

  disableSelectOptionAttribute($attribute, behavior, outOfStockMessage) {
    if (behavior === 'hide_option') {
      $attribute.toggleOption(false);
    } else {
      $attribute.attr('disabled', 'disabled');
      $attribute.html($attribute.html().replace(outOfStockMessage, '') + outOfStockMessage);
    }
  }

  _enableAttribute($attribute, behavior, outOfStockMessage) {
    if (this._getAttributeType($attribute) === 'set-select') {
      return this.enableSelectOptionAttribute($attribute, behavior, outOfStockMessage);
    }
    if (behavior === 'hide_option') {
      $attribute.show();
    } else {
      $attribute.removeClass('option-unavailable');
    }
  }

  enableSelectOptionAttribute($attribute, behavior, outOfStockMessage) {
    if (behavior === 'hide_option') {
      $attribute.toggleOption(true);
    } else {
      $attribute.removeAttr('disabled');
      $attribute.html($attribute.html().replace(outOfStockMessage, ''));
    }
  }

  _getAttributeType($attribute) {
    const $parent = $attribute.closest('[data-product-attribute]');
    return $parent ? $parent.data('product-attribute') : null;
  }

  /**
   * Add to cart
   */
  _addProductToCart(event, form) {
    event.preventDefault();

    // Bail out if browser doesn't support FormData
    if (window.FormData === undefined) {
      return;
    }

    const $button = $(event.currentTarget).closest('.product-block').find('.add-to-cart');
    const quantity = this.$el.find('input.product-quantity').val();
    const formData = new FormData(form);
    const title = $button.attr('data-product-title');

    // Update the button state
    this.progressButton.progress($button);

    // Remove old alerts
    this.pageAlerts.clear();

    // Ajax add item to cart
    utils.api.cart.itemAdd(formData, (err, response) => {

      if (err || response.data.error) {

        // Parse the ajax response so we can pass it to the message.
        response = this.productAddTocart.parseResponse(true, response, title, false);
        this.progressButton.complete($button);
      } else {
        if (this.context.disableProductAjax) {
          return window.location = this.context.urlsCart;
        } else  {

          // Reset the button state
          this.progressButton.progressComplete($button);

          setTimeout(() => {
            this.progressButton.complete($button);
          }, 5000);

          // Parse the ajax response so we can pass it to the message.
          response = this.productAddTocart.parseResponse(err, response, title, true);
        }
      }

      if (this.$body.hasClass('success-type-banner')) {
        this.pageAlerts.message(response.message, response.status, true);
      } else {
        this.modalAlerts.message(response.message, response.status, false);
        this.productAddTocart.updateSuccessModal($(this.successModal), response.hash);

        if (!this.$el.hasClass('product-single')) {
          this.callbacks.didSuccess();
        }

        this.successModal.open();

        $('.success-content').prepend('<svg class="icon icon-spinner"><use xlink:href="#icon-spinner" /></svg>');
      }

      // Scroll to top on mobile
      if ($(window).width() < 1024) {
        $('html, body').animate({
          scrollTop: 0
        });
      }

      // Update the mini cart & clear inputs if success
      if (response.status === 'success') {
        this._clearInputs();

        $.event.trigger('cart-item-add-success');
      }
    });
  }

  /**
   * Hide alert message
   *
   */
  _clearMessage($el) {
    $el
      .revealer('hide')
      .addClass('dismissed')
      .removeClass('error success');
  }

  /**
   * On successful ajax cart add we want to clear all option inputs.
   *
   */
  _clearInputs() {
    const $inputs = this.$el.find('[name^="attribute"]');

    $inputs.each((index, input) => {
      const $input = $(input);

      switch (input.type) {
        case 'checkbox':
          $input.prop('checked', false);
          break;
        case 'radio':
          $input.prop('checked', false);
          if ($input.hasClass('swatch-radio')) {
            $input.parent('.swatch-wrap').removeClass('checked');
            $input.closest('.form-field').find('.swatch-value').empty();
          }
          break;
        case 'select-one':
          $input.val($input.find('[value]:first').val()); // reset selects to first selectable value
          break;
        default:
          $input.val("");
      }
    });
  }
}
