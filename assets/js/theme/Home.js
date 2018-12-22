import Tabs from 'bc-tabs';
import slick from 'slick-carousel';
import Flickity from 'flickity-imagesloaded';
import PageManager from '../PageManager';
import svgIcon from './global/svgIcon';
import imagesLoaded from 'imagesloaded';

export default class Home extends PageManager {
  constructor() {
    super();
    this.$carousel = $('[data-home-carousel]');

    this.defaults = {
      pageDots: false,
      wrapAround: true,
      imagesLoaded: true,
      cellAlign: 'left',
      prevNextButtons: false,
      watchCSS: true,
    };

    this._bindEvents();
    this._initSlick();

    this._initProductSlider();

    if ($('[data-home-blog]').length) {
      this._initBlogSlider();
    }
  }

  _bindEvents() {
    $('.carousel-navigation-item.next').on('click', () => {
      $('.carousel').slick('slickNext');
    });

    $('.carousel-navigation-item.previous').on('click', () => {
      $('.carousel').slick('slickPrev');
    });
  }

  _initSlick() {
    // Hero carousel
    const $carousel = $('.carousel');
    const speed = $carousel.data('swap-frequency');

    $carousel
      .on('init', (event, slick) => {
        $('.slick-active .carousel-item-info').addClass('show');
        $('.carousel-item-info:not(:has(.caption-content))').addClass('no-content');
        // Fix misalignment because no scrollbar on load
        $(window).trigger('resize');


        $('.carousel-item').each((index, el) => {
          const $carouselImage = $(el).find('img');
          const slideNumber = index < 10 ? `0${index + 1}` : index + 1;

          $(el).find('.carousel-item-title').attr('data-slide-number', slideNumber);

          imagesLoaded($carouselImage, () => {
            const $carouselInfo = $(el).find('.carousel-item-info');
            const $carouselImageHeight = $carouselImage.outerHeight();
            const $carouselInfoHeight = $carouselInfo.outerHeight();

            if ($carouselInfoHeight > $carouselImageHeight) {
              $carouselInfo.addClass('carousel-short-image');
            }
          });
        });
      })
      .slick({
        lazyLoad: 'progressive',
        arrows: false,
        fade: true,
        autoplay: true,
        autoplaySpeed: speed,
        adaptiveHeight: true,
      })
      .on('beforeChange', (event, slick, currentSlide, nextSlide) => {
        $('.slick-active .carousel-item-info').removeClass('show');
      }).on('afterChange', (event, slick, currentSlide) => {
        $('.slick-active .carousel-item-info').addClass('show');
      });
  }

  _initProductSlider() {
    $('.products-home .container').each((index, element) => {
      new Flickity(element, {
        ...this.defaults
      });
    });
  }

  _initBlogSlider() {
    new Flickity($('[data-latest-posts-slider]')[0], {
      ...this.defaults
    });
  }
}
