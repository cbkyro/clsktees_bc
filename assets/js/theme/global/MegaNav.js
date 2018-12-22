export default class MegaNav {
  constructor(el) {
    this.$container = $(el);
    this.$rootList = this.$container.find('.navigation-root-list');
    this.$childContainer = this.$container.find('.navigation-child-container');
    this.$dropdownToggle = this.$container.closest('.dropdown').find('.dropdown-toggle');
    this.$dropdownPanel = $('.mega-nav-panel');
    this.$navBreadcrumbs = $('[data-navigation-breadcrumbs]');
    this.breadcrumbTemplate = _.template(
      '<span class="meganav-breadcrumb current-breadcrumb" data-find-parent="<%= menuTarget %>"><%= menuName %></span>'
    );

    this._bindEvents();
  }

  _bindEvents() {
    this.$container.on('click', '[data-navigation-root-item]', (event) => {
      event.preventDefault();
      this._findChild(event, true);
    });

    this.$container.on('click', '[data-find-child]', (event) => {
      event.preventDefault();
      this._findChild(event);
    });

    this.$navBreadcrumbs.on('click', '[data-find-parent]', (event) => {
      this._findParent(event);
    });

    this.$dropdownToggle.on('click', (event) => {
      this._clearChildren(true);
    });

    // Show first child menu on panel reveal
    this.$dropdownPanel.on('revealer-show', (event) => {
      const $target = $(event.currentTarget);
      $target.find('[data-navigation-root-item]:first-child').trigger('click');
      this.$navBreadcrumbs.empty();
    });

    // Prevent the child menus from firing the panel's event handler
    $('.navigation-child-list-container').on('revealer-show', (event) => {
      event.stopPropagation();
    });
  }

  _findChild(event, fromRoot = false) {
    const $el = $(event.currentTarget);
    const childId = $el.attr('data-child-category-id');
    const childName = $el.data('child-category-name');
    const $childList = this.$childContainer.find(`[data-parent-category-id="${childId}"]`);

    if ($childList.length > 0) {
      this._clearChildren(fromRoot);

      $childList.revealer('show');

      if (fromRoot) {
        $el.addClass('active');
      }
    }

    // Append breadcrumbs
    this.$navBreadcrumbs
      .find('.meganav-breadcrumb')
      .removeClass('current-breadcrumb')
      .end()
      .append(this.breadcrumbTemplate({
        menuTarget: childId,
        menuName: childName,
      }));

    if ($('.meganav-breadcrumb').length > 1) {
      this.$navBreadcrumbs.addClass('active');
    }
  }

  _findParent(event) {
    const $el = $(event.currentTarget);
    const parentId = $el.data('find-parent');
    const $parentList = this.$childContainer.find(`[data-parent-category-id="${parentId}"]`).closest('.navigation-child-list-container');

    $el.nextAll().remove();

    if ($('.meganav-breadcrumb').length == 1) {
      this.$navBreadcrumbs.removeClass('active');
    }

    if ($parentList.length > 0) {
      this._clearChildren();

      $parentList.revealer('show');
    }
  }

  _clearChildren(clearActive = false) {
    if (clearActive) {
      this.$rootList.find('.active').removeClass('active');
    }

    this.$childContainer.find('.navigation-child-list-container.visible').revealer('hide');
  }

}
