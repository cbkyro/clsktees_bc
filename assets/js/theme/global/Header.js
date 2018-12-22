import utils from '@bigcommerce/stencil-utils';
import Modal from 'bc-modal';
import slick from 'slick-carousel';
import MobileSearchBar from '../components/MobileSearchBar';

export default class Header {
  constructor(el) {
    this.$el = $(el);
    this.$body = $(document.body);
    this.$wrapper = $('[data-site-wrapper]');
    this.$searchWrap = this.$el.find('[data-search]');
    this.$container = this.$el.find('[data-navigation-container]');
    this.$nav = this.$container.find('[data-navigation]');
    this.$mobileNav = $('[data-navigation-mobile]');
    this.scrollClass = 'sticky';
    this.overflowClass = 'navigation-overflows';
    this.$scrollArrows = $('[data-navigation-scroll]');
    this.cartOpenClass = 'mini-cart-open';
    this.searchClosedClass = 'search-compressed';
    this.navOpenClass = 'nav-mobile-open scroll-locked';

    this._bindEvents();
    this._positionNavigation();
    this._headerScroll();
    this._navigationScroll(false);

    new MobileSearchBar();
  }

  _bindEvents() {
    // Toggle search
    $('.button-search-submit', this.$searchWrap).on('click', (event) => {
      if (this.$searchWrap.hasClass(this.searchClosedClass)) {
        event.preventDefault();
        this._toggleSearch();
      }
    });

    // Close search if empty
    $(document).on('click', (event) => {
      if ($(event.target).parents('.search-wrap').length) {
        return;
      }

      // Close if search is open and input is empty.
      if (!this.$searchWrap.hasClass(this.searchClosedClass) && !this.$searchWrap.find('.search-input').val().length) {
        this._toggleSearch(true);
      }
    });

    // Toggle mobile nav
    $('.button-mobile-nav-toggle').on('click', () => {
      this._toggleMobileNav();
    });

    this._handleResize = _.debounce(this._handleResize.bind(this), 200);

    $(window).resize(this._handleResize);
  }

  // Manage functions that need to update on resize
  _handleResize() {
    if ($('.navigation-mobile').is(':hidden')) {
      this._toggleMobileNav(false);
    }

    this._positionNavigation();
    this._navigationScroll(true);
  }

  _toggleSearch(open) {
    this.$searchWrap.toggleClass(this.searchClosedClass, open);

    this.$searchWrap.find('.search-input').focus();
  }

  _toggleMobileNav(open) {
    // Change position depending on height of header becuase of user defined logo height
    const headerHeight = $('[data-header-container]').height();
    this.$mobileNav.css('top', `${headerHeight}px`);

    this.$body.toggleClass(this.navOpenClass, open);

    if (open === false) {
      $('.navigation-mobile').revealer('hide');
    } else {
      $('.navigation-mobile').revealer('toggle');
    }
  }

  _headerScroll() {
    const $win = $(window);
    let threshold = $('.top-bar').height();
    let st = $win.scrollTop();
    // Set initial header state
    let headerState = (st > threshold) ? true : false;

    // if we load the page part way down
    if ($win.scrollTop() > threshold) {
      this.$wrapper.addClass(this.scrollClass);
    }

    $win.scroll(() => {
      st = $win.scrollTop();
      const stickyHeader = (st > threshold) ? true : false;

      // position navigation correctly
      if (st) {
        this._navigationScroll(true);
        this._positionNavigation('center');
      } else {
        this._navigationScroll(false);
        this._positionNavigation();
      }

      // When state changes from original value
      if (headerState !== stickyHeader) {

        this.$wrapper.toggleClass(this.scrollClass, stickyHeader);

        // Swap value so state change is triggered next time threshold is crossed
        headerState = !headerState;
      }
    });
  }

  _positionNavigation(location = 'center') {
    $('[data-position-navigation]').each((index, el) => {
      const $el = $(el);
      const containerWidth = this.$container.width();
      const navWidth = this.$nav.width();
      let offsetX = 0;

      if (location === 'center') {
        if (containerWidth === navWidth) {
          offsetX = -this.$container.offset().left;
        } else if (containerWidth < navWidth) {
          // offset to compensate for margin on [data-navigation]
          offsetX = -30;
        } else {
          offsetX = -(this.$container.offset().left + ((containerWidth - navWidth) / 2 ));
        }
      } else if (location === 'left') {
        offsetX = -this.$container.offset().left;
      }

      $el.css({left: offsetX});
    });
  }

  _navigationScroll(withUtils) {
    const navWidth = this.$nav.width();
    const windowWidth = $(window).width();
    const customerUtilsWidth = $('.customer-utils').width();
    const width = withUtils
      ? (navWidth + customerUtilsWidth)
      : navWidth;

    if (width >= windowWidth) {
      this._initNavigationScroll();
    } else {
      this._unloadNavigationScroll();
    }
  }

  _initNavigationScroll() {
    const navWidth = this.$nav.width();
    const containerWidth = this.$container.width();
    const xPos = this._getNavXPos();

    this.$nav.css('transform', '');
    $('.right-arrow').css('display', '');
    this.$wrapper.addClass(this.overflowClass);
    this.$nav.addClass(this.overflowClass);
    this.$container.addClass('uncontained nav-overflows-right');
    this.$container.removeClass('nav-overflows-left');

    this.$scrollArrows.on('click.navscroll', (event) => {
      const navWidth = this.$nav.width();
      const containerWidth = this.$container.width();
      const xPos = this._getNavXPos();
      const direction = $(event.currentTarget).data('navigation-scroll');

      const dir = direction === 'right' ? -1 : 1;
      const distance = containerWidth / 5;
      let availableDistance;

      if (direction === 'right') {
        const max = navWidth - containerWidth;
        availableDistance = Math.min(max, (xPos - distance) * dir);
        this.$container.addClass('nav-overflows-left');
        if (max == availableDistance) {
          this.$container.removeClass('nav-overflows-right');
        }

        // offset to compensate for margin on [data-navigation] and scrolled amount
        $('[data-position-navigation]').css({left: availableDistance - 30})
      } else {
        availableDistance = Math.max(0, (xPos - distance));
        this.$container.addClass('nav-overflows-right');
        if (availableDistance == 0) {
          this.$container.removeClass('nav-overflows-left');
        }

        // reset navigation position
        this._positionNavigation();
      }

      this.$nav.css('transform', `translateX(${dir * availableDistance}px)`);
    });
  }

  _unloadNavigationScroll() {
    this.$wrapper.removeClass(this.overflowClass);
    this.$nav.removeClass(this.overflowClass);
    this.$container.removeClass('nav-overflows-left nav-overflows-right');
    this.$scrollArrows.off('.navscroll');
    $('.right-arrow').css('display', 'none');
  }

  _getNavXPos() {
    const transform = this.$nav[0].style.transform;
    const transXRegex = /\.*translateX\((.*)px\)/i;
    const xTrans = transXRegex.exec(transform);
    const xPos = (xTrans) ? xTrans[1] : 0;

    return parseInt(xPos, 10);
  }
}
