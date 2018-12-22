import bonsai from 'jquery-bonsai';

export default class AdvancedSearch {
  constructor() {
    const $advancedSearchForm = $('[data-advanced-search-form]');
    const selectedCategories = [];

    $advancedSearchForm.submit((event) => {
      const $selectedCategoryIds = $('[data-advanced-search-form] input[type="checkbox"]:checked');

      $selectedCategoryIds.each((index, element)=> {
        selectedCategories.push($(element).val());
      });

      for (const categoryId of selectedCategories) {
        const input = $('<input>', {
          type: 'hidden',
          name: 'category[]',
          value: categoryId,
        });

        $advancedSearchForm.find('input[name="categories"]').val(categoryId).remove();
        $advancedSearchForm.append(input);
      }
    });

    // The first checkbox gets autofocused and therefore checked
    // when clicking anywhere on the form.
    // This is making sure the input or label is clicked before clicking a
    // checkbox
    $('[data-search-category-tree]').on('click', (event) => {
      if (!$(event.target).is('input, label')) {
        event.preventDefault();
      }
    })

    this._advancedSearchCategories();
  }

  _advancedSearchCategories() {
    const categories = $('[data-advanced-search-form]').find('li');
    const selectedCategoriesJson = $('[data-search-selected]').text().replace(/,\s*\]/,']');
    let selected = [];
    try {
      selected = JSON.parse(selectedCategoriesJson);
    } catch(error) {
      console.log(error);
    }

    $(categories).each((index, element) => {
      const $category = $(element);
      const id = $category.data('value');

      if (selected.indexOf(id) !== -1) {
        $category.attr('data-checked', true);
      }
    });

    $('#advanced-search-checkboxes').bonsai({
      expanAll: true,
      checkboxes: true,
      createInputs: 'checkbox'
    });
  }
}
