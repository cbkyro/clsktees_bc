import utils from '@bigcommerce/stencil-utils';
import ProductUtils from '../product/ProductUtils';
import ProductImages from '../product/ProductImages';
import productViewTemplates from '../product/productViewTemplates';
import ColorSwatch from '../product/ColorSwatch';
import svgIcon from '../global/svgIcon';
import Alert from '../components/Alert';
import Dropdown from '../global/Dropdown';
import Loading from 'bc-loading';
import Modal from 'bc-modal';


export default class QuickShop {
  constructor(context) {
    this.context = context;
    this.product;
    this.id = null;
    this.modalOverlay = '.modal-overlay';
    this.pageAlerts = new Alert($('[data-alerts]'));
    this.wishlistAlert = new Alert($('[data-wishlist-message]'));

    const loadingOptions = {
      loadingMarkup: `<div class="loading-overlay">${svgIcon('spinner')}</div>`
    };

    // Set up the modal options
    this.quickShopModal = new Modal({
      modalClass: 'modal-quick-shop',
      centerVertically: false,
      afterShow: ($modal) => {
        if (this.type === 'add') {
          $('.modal-quick-shop').addClass('modal-quick-add');
        }

        this.quickViewLoading.show();
        this._fetchProduct($modal, this.id, {
          template: this.type === 'add' ? 'quick-shop/quick-add-modal' : 'quick-shop/quick-view-modal',
        });
      },
      afterHide: () => {
        this.product.destroy();
        this.pageAlerts.clear();
        this.wishlistAlert.clear();
      },
    });

    this.quickViewLoading = new Loading(loadingOptions, false, 'body');

    this._bindEvents();
  }

  /**
   * Launch quickshop modal on click and set up id variable
   */
  _bindEvents() {
    $('body').on('click', '[data-quick-shop]', (event) => {
      event.preventDefault();
      const $target = $(event.currentTarget);

      this.type = $target.attr('data-quick-shop');

      this.id = $target.attr('data-product-id');

      if (!this.id) { return; }

      this.quickShopModal.open();

      $(this.modalOverlay).css({
        opacity: 0,
      });
    });

    $('body').on('pxuWishlistClosed', () => {
      this.quickShopModal.close();
    });
  }

  /**
   * Run ajax fetch of product and add to modal. Bind product functionality and show the modal
   * @param {jQuery} $modal - the root (appended) modal element.
   * @param {integer} id - product id
   */
  _fetchProduct($modal, id, options) {
    utils.api.product.getById(id, options, (err, response) => {
      $modal.find('.modal-content').append(response);
      const $product = $modal.find('[data-product-container]');

      // set up simple image slideshow
      if ($('[data-product-images]').length) {
        this.productImages = new ProductImages('.modal-quick-shop .product-slides-wrap', this.context);
      }

      // set up product utils (adding to cart, options)
      const productOptions = {
        priceWithoutTaxTemplate: productViewTemplates.priceWithoutTax,
        priceWithTaxTemplate: productViewTemplates.priceWithTax,
        priceSavedTemplate: productViewTemplates.priceSaved,
        variationPreviewImageTemplate: productViewTemplates.variationPreviewImage,
        quickshop: true,
        callbacks: {
          didSuccess: () => this.quickShopModal.close(),
        }
      };

      if (this.type === 'view') {
        productOptions.callbacks = {
          didSuccess: () => this.quickShopModal.close(),
          switchImage: _.bind(this.productImages.variationImgPreview, this.productImages),
        }
      };

      this.product = new ProductUtils($product, productOptions);

      this.product.init(this.context);

      // Init our color swatches
      this.swatches = new ColorSwatch();

      // init dropdowns for wishlist
      new Dropdown($('.product-actions .dropdown'));

      // reposition modal with content
      this.quickShopModal.position();
      this.quickViewLoading.hide();

      $(this.modalOverlay).css({
          opacity: 0.5,
        });

      $modal.addClass('loaded');
    });
  }
}
