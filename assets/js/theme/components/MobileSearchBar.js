export default class MobileSearchBar {
  constructor() {
    this.$body = $(document.body);
    this.$mobileSearch = $('[data-mobile-search]');
    this.$searchForm = $('[data-search-form]', this.$mobileSearch);
    this.$searchButton = $('[data-search-submit]', this.$mobileSearch);
    this.$searchInput = $('[data-search-input]', this.$mobileSearch);
    this.$mobileSearchClose = $('.modal-close', this.$mobileSearch);
    this.$mobileSearchOpen = $('[data-mobile-search-toggle]');
    this.$mobileQuickSearch = $('[data-quick-search]', this.$mobileSearch);

    this._bindEvents();
  }

  _bindEvents() {
    this.$mobileSearchOpen.on('click', (event) => {
      this._showSearchForm();
    });

    this.$mobileSearchClose.on('click', (event) => {
      this._hideSearchForm();
    });
  }

  _showSearchForm() {
    this.$mobileSearch.revealer('show').one('revealer-show', () => {
      this.$mobileSearch.find(this.$searchInput).focus();
    });
    // TODO: focus is not working yet and consider an on blur close
    this.$body.addClass('scroll-locked');
    this._placeQuickSearch();
  }

  _placeQuickSearch() {
    // Header height will change depending on the size of the logo
    const headerHeight = $('.site-header').height();

    this.$mobileQuickSearch.css('top', `${headerHeight}px`);
  }

  _hideSearchForm() {
    this.$mobileSearch.revealer('hide');
    this.$body.removeClass('scroll-locked');
  }
}
