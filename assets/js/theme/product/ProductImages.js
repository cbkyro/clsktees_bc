import imagesLoaded from 'imagesloaded';
import slick from 'slick-carousel';
import Zoom from 'bc-zoom';
import productViewTemplates from './productViewTemplates';

export default class ProductImages {
  constructor(container, context) {
    this.context = context;
    this.$el = $(container);
    this.imageLightbox = new Zoom(`${container} [data-product-image]`, context);

    this._init();
    this._bindEvents();
  }

  _init() {
    imagesLoaded(this.$el[0], () => {
      this.$el.slick({
        infinite: false,
        arrows: false,
        lazyLoad: 'progressive',
        adaptiveHeight: JSON.parse(this.$el.attr('data-adaptive-height')),
      });
    });
  }

  _bindEvents() {
    // Paging
    $(document).on('click', '.product-images-pagination a', (event) => {
      event.preventDefault();
      $('.product-slides-wrap')
        .slick('slickGoTo', $(event.currentTarget)
        .attr('data-slide-to'));
    });

    // Lightbox
    this.$el.on('click', '[data-product-image]', (event) => {
      event.preventDefault();
      this.imageLightbox.show($(event.currentTarget).index());
    });
  }

  variationImgPreview(productImageUrl, zoomImageUrl, alt, optId) {
    // Only append if image doesn't already exist.
    // Otherwise, scroll to it.
    if (! $(`img[src="${productImageUrl}"]`).length) {
      const numSlides = $('[data-product-image]').length;

      const newImage = productViewTemplates.variationImage({
        productImageSrc: productImageUrl,
        zoomImageSrc: zoomImageUrl,
        alt: alt
      });

      // Add carousel image
      this.$el.slick('slickAdd', newImage);

      // Add carousel nav item
      $('.product-images-pagination').append(productViewTemplates.variationImageNav({
        productImageSrc: productImageUrl,
        index: numSlides,
        id: optId
      })).slideDown();

      imagesLoaded(this.$el[0], () => {
       this.$el.slick('slickGoTo', numSlides + 1);
     });
    } else {
      const $changedOption = $(`[data-option-id="${optId}"]`);
      if ($changedOption.length) {
        this.$el.slick('slickGoTo', $changedOption.index(), true);
      }
    }
  }
}
