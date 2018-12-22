import Modal from 'bc-modal';
import { lazyLoad } from '../utils/lazyLoad';

export default class MobileFilters {
  constructor() {
    this.$body = $(document.body);
    this.$filter = $('[data-mobile-filter]');
    this.$filterToggle = $('[data-mobile-filter-toggle]', this.$filter);
    this.$sortByForm = $('[data-mobile-sort-by]');
    this.$modal = null;

    this.filterType = null;

    this.bindEvents();
  }

  bindEvents() {
    this.$body.on('click', '[data-mobile-filter-toggle]', (event) => {
      
      this.filterType = $(event.target).data('mobile-filter-toggle-type');

      this.filtersModal.open();
    });

    this.filtersModal = new Modal({
      el: $('<div id="mobile-filters-modal">'),
      modalClass: 'mobile-filters-modal',
      afterShow: ($modal) => {
        this.$modal = $modal;
        this.loadData();
      },
      afterHide: () => {
        lazyLoad.revalidate();
      },
    });

    this.$body.on('click', '[data-mobile-sort-by] input[name="sort"]', (event) => {
      const $filter = $(event.currentTarget);

      $filter.closest('[data-mobile-sort-by]').submit();
    });

    this.$body.on('click', '.mobile-filters-modal .facet-item', (event) => {
      $(event.currentTarget).toggleClass('selected-facet');
    });

    this.$body.on('click', '[data-facet-modal-close]', (event) => {
      this.filtersModal.close();
    });
  }

  loadData() {
    const modalContent = $(`[data-mobile-filter-content-type="${this.filterType}"]`).html();
    this.$modal.find('.modal-content').html(modalContent);
    $('[data-button]', this.$modal).addClass('button-small');
    this.filtersModal.position();
    this.$modal.addClass('loaded');
  }
}
