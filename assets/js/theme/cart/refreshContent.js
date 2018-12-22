import utils from '@bigcommerce/stencil-utils';
import { lazyLoad } from '../utils/lazyLoad';

export default function(didUpdate, remove) {
  const $cartTotals = $('[data-cart-totals]');
  const $cartContent = $('[data-cart-content]');
  const $cartItem = $('[data-cart-item]', $cartContent);
  const $cartPromos = $('[data-alerts]');
  const options = {
    template: {
      content: 'cart/content',
      totals: 'cart/totals',
      promos: 'header/alert-messages',
    },
  };

  // Remove last item from cart? Reload
  if (remove && $cartItem.length === 1) {
    return window.location.reload();
  }

  utils.api.cart.getContent(options, (err, response) => {
    // TODO: Scope the call to this function by area that needs updating
    $cartContent.html(response.content);
    $cartTotals.html(response.totals);
    $cartPromos.replaceWith(response.promos);
    $cartContent.trigger('cart-initialize-modules');
    lazyLoad.revalidate();

    // TODO: If the loading overlay is scoped to an area that is replaced
    // it does not fade out, but is removed abrubtly (due to being a
    // part of that area's content).
    didUpdate();
  });
}
