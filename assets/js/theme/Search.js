import PageManager from '../PageManager';
import ProductCatalog from './catalog/ProductCatalog';
import Tabs from 'bc-tabs';
import { lazyLoad } from './utils/lazyLoad';
import AdvancedSearch from './core/AdvancedSearch';

export default class Brand extends PageManager {
  constructor() {
    super();

    this._initTabs();

    if ($('.advanced-search-dropdown').length) {
      new AdvancedSearch();
    }
  }

  loaded() {
    new ProductCatalog(this.context);
    lazyLoad.revalidate();
  }

  _initTabs() {
    this.tabs = new Tabs({
      titleSelector: $('.search-tab-title'),
      afterChange: () => {
        lazyLoad.revalidate();
      },
      afterSetup: (activeTab) => {
        if (!$('.product-results .product-block').length || (window.location.search.indexOf('section=content') > -1)) {
          setTimeout(() => {
            $('[href="#content-results"]').trigger('click');
          }, 10);
        }
      },
    });
  }
}
