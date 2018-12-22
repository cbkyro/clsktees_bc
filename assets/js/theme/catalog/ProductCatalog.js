import { hooks } from '@bigcommerce/stencil-utils';
import {initCompare, updateCompare} from './initCompare';
import Modal from 'bc-modal';
import Alert from '../components/Alert';
import FacetedSearch from './FacetedSearch';
import ProgressButton from '../utils/ProgressButton';
import ProductAddToCart from '../utils/ProductAddToCart';
import ToggleFacetedRatingStars from './ToggleFacetedRatingStars';

export default class ProductCatalog {
  constructor(context, listType) {
    this.$body = $(document.body);
    this.context = context;
    this.listType = listType;
    this.productLimit = this.context.listingProductCount;

    this._bindEvents();

    if ($('[data-product-compare]').length) {
      initCompare();
    }

    this._initFacetedSearch();

    if (!this.context.disableProductAjax) {
      this.constructor.bindCartAdd(context);
    }

    new ToggleFacetedRatingStars('.product-item-rating-facet');

    // Set up the modal options
    if (this.$body.hasClass('success-type-popup')) {
      this.modalAlerts = new Alert($('[data-modal-alerts]'));
      this.successModal = new Modal({
        el: $('#success-modal'),
        modalClass: 'modal-success'
      });
    }
  }

  _bindEvents() {
    this.$body.on('click', '[data-listing-view]', (event) => {
      this._toggleView(event);
    });
  }

  _toggleView(event) {
    const $target = $(event.currentTarget);

    $('.product-block').toggleClass('product-list-item product-grid-item');

    // re-init faceted search with new template option
    this._initFacetedSearch();

    // toggle button classes
    $target.addClass('active').siblings().removeClass('active');
  }

  _initFacetedSearch() {
    const options = {
      config: {
        shop_by_brand: true,
        category: {
          shop_by_price: true,
          products: {
            limit: this.productLimit,
          },
        },
        brand: {
          products: {
            limit: this.productLimit,
          },
        },
        product_results: {
          limit: this.productLimit,
        },
      },
      showMore: 'faceted-search/show-more',
    };

    new FacetedSearch(options);
  }

  static bindCartAdd(context) {
    this.progressButton = new ProgressButton();
    this.productAddTocart = new ProductAddToCart(context);
    this.pageAlerts = new Alert($('[data-alerts]'));

    $(document.body).on('click', '[data-add-to-cart]', (event) => {
      const $button = $(event.currentTarget);

      event.preventDefault();

      this.progressButton.progress($button);

      $.ajax({
        type: 'POST',
        url: $button.attr('href'),
        success: (response, status) => {
          let title = $button.attr('data-product-title');
          response = this.productAddTocart.parseResponse(false, response, title, false);

          // Modal success not avialable because there is no Hash value to pass in
          this.pageAlerts.message(response.message, response.status, true);
        },
        error: (response, status, error) => {
          this.progressButton.progressComplete($button);
          response = this.productAddTocart.parseResponse(true, response, title, false);
        },
        complete: (response, status) => {
          this.progressButton.complete($button);

          if (status === 'success') {
            hooks.emit('cart-item-add-remote');
          }
        },
      });
    });
  }
}
