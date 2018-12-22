import Modal from 'bc-modal';
import Alert from '../components/Alert';
import FormValidator from '../utils/FormValidator';
import ProgressButton from '../utils/ProgressButton';
import Url from 'url';

export default class WishList {
  constructor($el, context, isQuickshop) {
    this.$el = $el;
    this.context = context;
    this.isQuickshop = isQuickshop;

    this.Validator = new FormValidator(this.context);

    this.isQuickshop = this.$el.closest('.modal-quick-shop').length > 0;
    this.title = this.$el.attr('data-product-title');
    this.url = Url.parse(location.href, true);
    this.wishlistName = this.url.query['wishlistName'] ? this.url.query['wishlistName'] : '';

    this.wishlistAlert = new Alert($('[data-wishlist-message]'));
    this.$wishlistForm = $('[data-wishlist-form]');
    this.$productWishlist = $('[data-product-wishlist]');

    this.progressButton = new ProgressButton();

    this.wishlistModal = new Modal({
      el: $('#create-wishlist'),
      modalClass: 'modal-narrow create-wishlist-modal'
    })

    if (this.wishlistName) {
      this.wishlistAlert.success(this.context.messagesWishlistAddSuccess.replace('*product*', this.title).replace('*name*', this.wishlistName), true);
    }

    this._bindEvents();
  }

  _bindEvents() {
    $(document.body).one('submit', '[data-add-wishlist-form]', (event) => {
      event.preventDefault();

      this._submitCreateWishlist(event);
    });

    // Show Wishlist create modal
    $('[data-create-wishlist]').one('click', (event) => {
      this.wishlistModal.open();
    });

    if (this.$productWishlist.hasClass('dropdown')) {
      this._bindAddWishlist();
    }
  }

  /**
   * Ajax add to wishlist
   *
   */
  _bindAddWishlist() {
    $(document.body).on('click', '[data-wishlist]', (event) => {
      const $button = $(event.currentTarget);
      const addUrl = $button.attr('href');
      const $name = $button.attr('data-name');
      const $dropdownButton = $($button.closest('[data-dropdown-panel]').siblings('[data-dropdown-toggle]'));

      if ($('[data-is-customer]').length) {
        event.preventDefault();
        this.progressButton.progress($dropdownButton);

        this.$productWishlist.find('[data-dropdown-close]').trigger('click');

        $.ajax({
          type: 'POST',
          url: addUrl,
          success: () => {
            this.wishlistAlert.success(this.context.messagesWishlistAddSuccess.replace('*product*', this.title).replace('*name*', $name), false);
          },
          error: () => {
            this.wishlistAlert.error(this.context.messagesWishlistAddError.replace('*product*', this.title), false);
          },
          complete: () => {
            this.progressButton.progressComplete($dropdownButton);
            setTimeout(() => {
              this.wishlistAlert.clear();
              this.progressButton.complete($dropdownButton);
            }, 3000);
          },
        });
      }
    });
  }

  _submitCreateWishlist(event) {
    const $wishlistForm = $(event.currentTarget);
    const url = $wishlistForm[0].action;
    const data = $wishlistForm.serialize();
    const name = $('input[name="wishlistname"]', $wishlistForm).val();
    const currentUrl = Url.parse(location.href);
    const $button = $('.account-button-primary', $wishlistForm);

    this.progressButton.progress($button);

    $.ajax({
      type: 'POST',
      url: url,
      data: data,
      success: (res) => {
        const queryParams = `wishlistName=${name}`;

        this.wishlistAlert.success(this.context.messagesWishlistAddSuccess.replace('*product*', this.title).replace('*name*', name), false);

        this.progressButton.progressComplete($button);
        setTimeout(() => {
          this.wishlistAlert.clear();
          this.progressButton.complete($button);
          this.wishlistModal.close();

          $('body').trigger('pxuWishlistClosed');
        }, 3000);

        // if it's quick shop no need for page refresh
        if (this.isQuickshop) { return;}

        this._goToUrl(
          Url.format(
            { pathname: currentUrl.pathname, search: '?' + queryParams }
          )
        );
        location.reload();
      }, error: (error) => {
        this.wishlistAlert.error(this.context.messagesWishlistAddError.replace('*product*', this.title), false);

        this.progressButton.complete($button);
      },
    });
  }

  _goToUrl(url) {
    History.pushState({}, document.title, url);
  }
}
