export default class Dropdown {
  constructor(el) {
    this.$el = $(el);

    this._bindEvents();
  }

  _bindEvents() {
    // Toggle Main dropdown on click
    this.$el.find('[data-dropdown-toggle]').on('click', (event) => {
      this._toggleMainDropdown(event);

      // return false so click anywhere to close will work
      return false;
    });

    // Toggle tier dropdown on click
    this.$el.find('[data-tier-toggle]').on('click', (event) => {
      this._toggleTierDropdown(event);

      // return false so click anywhere to close will work
      return false;
    });

    // Close when clicking elsewhere, except in open dropdown
    $(document).on('click', (event) => {
      if ($(event.target).closest('[data-dropdown]').hasClass('dropdown-open') || $(event.target).hasClass('override-dropdown') || $(event.target).parents().hasClass('override-dropdown')) {
        return;
      }

      if (this.$el.hasClass('dropdown-open')) {
        this._toggleMainDropdown(event, false);
      }
    });

    this.$el.find('[data-dropdown-close]').on('click', (event) => {
      event.preventDefault();
      this._toggleMainDropdown(event, false);
    });

    // prevent parent meganav link from going anywhere
    this.$el.find('[data-meganav-toggle]').on('click', (event) => {
      event.preventDefault();
    });
  }

  _toggleMainDropdown(event, open) {
    const $target = $(event.currentTarget).closest('[data-dropdown]');
    const $dropdown = $('[data-dropdown]');
    let revealerAction = 'toggle';

    if (open === true) {
      revealerAction = 'show';
    }

    if (open === false) {
      revealerAction = 'hide';
    }

    // Close any open ones first
    $dropdown
      .not($target)
      .removeClass('dropdown-open')
      .find('[data-dropdown-panel]')
      .revealer('hide');

    $dropdown
      .not($target)
      .find('[data-dropdown-toggle]')
      .removeClass('panel-opens');

    // Close any open tiers and remove tier active class when dropdown closes
    $dropdown
      .find('[data-tier-panel]')
      .revealer('hide');

    $dropdown
      .find('[data-tier]')
      .removeClass('tier-open');

    $dropdown
      .find('.icon-arrow-down')
      .removeClass('panel-opens');

    // Toggle panel
    $target
      .toggleClass('dropdown-open', open)
      .find('[data-dropdown-panel]')
      .revealer(revealerAction);

    $target
      .find('[data-dropdown-toggle]')
      .toggleClass('panel-opens', open);
  }

  _toggleTierDropdown(event, open) {
    const $tierTarget = $(event.currentTarget).closest('[data-tier]');
    const $tierToggle = $(event.currentTarget).children('.icon-arrow-down');

    // Toggle panel for direct child
    $tierTarget
      .toggleClass('tier-open', open)
      .children('[data-tier-panel]')
      .revealer('toggle');

    // Toggle arrow for active link
    $tierToggle.toggleClass('panel-opens');
  }
}
