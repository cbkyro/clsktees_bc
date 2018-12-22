import { hooks, api } from '@bigcommerce/stencil-utils';
import Url from 'url';
import Loading from 'bc-loading';
import svgIcon from '../global/svgIcon';
import toggleFacet from '../global/toggleFacet';
import { lazyLoad } from '../utils/lazyLoad';
import MobileFilters from './MobileFilters';
import 'history.js/scripts/bundled-uncompressed/html4+html5/jquery.history';


export default class FacetedSearch {
  constructor(options) {
    this.$body = $(document.body);
    this.facetedSearchFlag = false;
    this.$facetContainer = $('[data-faceted-dearch]');
    this.mobileWidth = 768;
    this.loadingOptions = {
      loadingMarkup: '<div class="loading-overlay"></div>',
      visibleClass: 'visible',
      scrollLockClass: 'scroll-locked',
    };

    this.loading = new Loading(this.loadingOptions, false, '.product-listing');
    this.facetedSearchOverlay = new Loading(this.loadingOptions, true, '[data-faceted-search]');
    this.mobileFilters = new MobileFilters();

    this.options = $.extend(true, {
      config: {
        category: {
          shop_by_price: true
        }
      },
      template: 'product-catalog/catalog-index',
      facetToggle: '[data-facet-toggle]',
      scope: '[data-facet-content]',
      moreToggle: '[data-facet-more]',
      toggleFacet: (event) => toggleFacet(event),
    }, options);

    this._bindEvents();
  }

  _bindEvents() {
    this.$body.on('click', this.options.facetToggle, (event) => {
      this._toggleFacet(event);
    });

    this.$body.on('click', this.options.moreToggle, (event) => {
      event.preventDefault();
      this._showAdditionalFilters(event);
    });

    $(window).on('statechange', this._onStateChange.bind(this));
    hooks.on('facetedSearch-facet-clicked', this._onFacetClick.bind(this));
    hooks.on('facetedSearch-range-submitted', this._onRangeSubmit.bind(this));
    hooks.on('sortBy-submitted', this._onSortBySubmit.bind(this));
  }

  _showAdditionalFilters(event) {
    // Show/hide full facet list based on setting  for product filtering
    this.facetedSearchOverlay.show();

    const $showMoreLink = $(event.currentTarget);
    const $originalList = $showMoreLink.siblings('.facet-default');
    const facet = $showMoreLink.attr('data-facet-more');
    const facetUrl = History.getState().url;

    // Show/Hide extra facets based on settings for product filtering
    if (!$showMoreLink.siblings('.faceted-search-option-columns').length) {
      if (this.options.showMore) {
        api.getPage(facetUrl, {
          template: this.options.showMore,
          params: {
            list_all: facet,
          },
        }, (err, response) => {
          if (err) {
            throw new Error(err);
          }
          $(response).insertAfter($originalList);
          $('.faceted-search-option-columns').addClass('visible');
          this.facetedSearchOverlay.hide();
          lazyLoad.revalidate();
        });
      }
    } else {
      $('.faceted-search-option-columns').toggle();
      this.facetedSearchOverlay.hide();
      lazyLoad.revalidate();
    }

    // show/hide original facet list
    $originalList.toggle();

    // Toggle show more/less link
    $showMoreLink.children().toggleClass('is-open');

    return false;
  }

  _toggleFacet(event) {
    this.options.toggleFacet(event);
  }

  _onFacetClick(event) {
    event.preventDefault();

    const $target = $(event.currentTarget);
    const url = $target.attr('href');
    this.facetedSearchFlag = true;

    this._goToUrl(url);
  }

  _onRangeSubmit(event) {
    event.preventDefault();

    const url = Url.parse(location.href);
    let queryParams = $(event.currentTarget).serialize();

    if (this.$body.hasClass('template-search')) {
      const currentSearch = `search_query=${$('[data-faceted-search]').data('search-query')}` || '';
      queryParams = `${queryParams}&${currentSearch}`;
    }

    this.facetedSearchFlag = true;

    this._goToUrl(Url.format({ pathname: url.pathname, search: '?' + queryParams }));
  }

  _onSortBySubmit(event) {
    event.preventDefault();

    const url = Url.parse(location.href, true);
    const queryParams = $(event.currentTarget).serialize().split('=');

    url.query[queryParams[0]] = queryParams[1];
    delete url.query['page'];

    this.facetedSearchFlag = true;

    this._goToUrl(Url.format({ pathname: url.pathname, query: url.query }));
  }

  _onStateChange(event) {
    if (!this.facetedSearchFlag) return;
    this.loading.show();

    api.getPage(History.getState().url, this.options, (err, content) => {

      this.facetedSearchFlag = false;
      if (err) {
        throw new Error(err);
        this.loading.hide();
        return;
      }

      if (content) {
        $(this.options.scope).html(content);
        this.loading.hide();
        lazyLoad.revalidate();

        if ($(window).width() < this.mobileWidth) {
          this.mobileFilters.loadData();
        }

        if ($('[data-faceted-search]').hasClass('active-filters')) {
          $('[data-facet-remove-all]').addClass('visible');
        } else {
          $('[data-facet-remove-all]').removeClass('visible');
        }
      }
    });
  }

  _goToUrl(url) {
    History.pushState({}, document.title, url);
  }
}
