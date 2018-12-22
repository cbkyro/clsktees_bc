import utils from '@bigcommerce/stencil-utils';
import Alert from '../components/Alert';
import refreshContent from './refreshContent';

export default class GiftCertificates {
  constructor(el, options) {
    this.$el = $(el);
    this.certificateAlerts = new Alert($('[data-alerts]'));
    this.$form = $('[data-gift-certificate-form]', this.$el);
    this.$input = $('[data-gift-certificate-input]', this.$form);

    this.options = $.extend({
      context: {},
      visibleClass: 'visible',
    }, options);

    this.callbacks = $.extend({
      willUpdate: () => console.log('Update requested.'),
      didUpdate: () => console.log('Update executed.'),
    }, options.callbacks);

    this._bindEvents();
  }

  _bindEvents() {
    this.$form.on('submit', (event) => {
      event.preventDefault();
      this._addCode();
    });
  }

  _addCode() {
    const code = this.$input.val();

    this.callbacks.willUpdate();

    if (! this._isValidCode(code)) {
      this.certificateAlerts.error(this.options.context.giftCertificateInputEmpty, true);
      return this.callbacks.didUpdate();
    }

    utils.api.cart.applyGiftCertificate(code, (err, response) => {
      if (response.data.status === 'success') {
        refreshContent(this.callbacks.didUpdate);
      } else {
        this.certificateAlerts.error(response.data.errors.join('\n'), true);
        this.callbacks.didUpdate();
      }
    });
  }

  _isValidCode(code) {
    if (typeof code !== 'string') {
      return false;
    }

    // Add any custom gift certificate validation logic here
    return true;
  }
}
