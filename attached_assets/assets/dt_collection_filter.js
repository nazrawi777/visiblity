const debounce = (func, delay) => {
  let debounceTimer;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func.apply(context, args), delay);
  };
};

class CollectionFiltersForm extends HTMLElement {
  constructor() {
    super();
    this.filterData = [];
    this.onActiveFilterClick = this.onActiveFilterClick.bind(this);

    this.debouncedOnSubmit = debounce((event) => {
      event.preventDefault();
      this.onSubmitHandler(event);
    }, 300);

    const form = document.querySelector('#CollectionFiltersForm');
    if (form) {
      form.addEventListener('input', (event) => {
        if (
          event.target.classList.contains('input_price') ||
          event.target.classList.contains('input_price_range')
        ) {
          this.debouncedOnSubmit(event);
        } else {
          this.onSubmitHandler(event);
        }
      });
    }

    window.addEventListener('popstate', this.onHistoryChange.bind(this));
    this.bindActiveFacetButtonEvents();
    this.initPriceRange();
    this.updateClearFilterVisibility();
  }

  onSubmitHandler(event) {
    event.preventDefault();
    const form = event.target.closest('form');
    if (!form) return;
    const formAction = window.location.pathname;
    const formData = new FormData(form);
    const searchParams = new URLSearchParams(formData).toString();
    this.renderPage(formAction, searchParams, event);
  }

  onActiveFilterClick(event) {
    event.preventDefault();
    const link = event.currentTarget;
    const targetURL = link.href;
    const parsed = new URL(targetURL);
    this.renderPage(parsed.pathname, parsed.searchParams.toString(), null, true);
  }

  onHistoryChange(event) {
    const searchParams = event.state?.searchParams || '';
    this.renderPage(window.location.pathname, searchParams, null, false);
  }

  bindActiveFacetButtonEvents() {
    document.querySelectorAll('.js-facet-remove').forEach((element) => {
      element.removeEventListener('click', this.onActiveFilterClick);
      element.addEventListener('click', this.onActiveFilterClick);
    });
  }

  renderPage(targetURL, searchParams, event, updateURLHash = true) {
    if (!targetURL) return;
    const url = `${targetURL}${searchParams ? '?' + searchParams : ''}`;
    const filterDataUrl = (element) => element.url === url;

    if (this.filterData.some(filterDataUrl)) {
      this.renderSectionFromCache(filterDataUrl, event);
    } else {
      this.renderSectionFromFetch(url, event);
    }

    if (updateURLHash) this.updateURLHash(searchParams);
  }

  renderSectionFromFetch(url, event) {
    fetch(url)
      .then((response) => response.text())
      .then((responseText) => {
        this.filterData = [...this.filterData, { html: responseText, url }];
        this.renderFilters(responseText, event);
        this.renderProductGrid(responseText);
      })
      .catch((err) => console.error('Filter fetch error:', err));
  }

  renderSectionFromCache(filterDataUrl, event) {
    const html = this.filterData.find(filterDataUrl).html;
    this.renderFilters(html, event);
    this.renderProductGrid(html);
  }

  renderProductGrid(html) {
    const gridEl = document.getElementById('dT_collectionGrid');
    if (!gridEl) return;

    const existingList = gridEl.querySelector('ul:first-child');
    const existingClass = existingList ? existingList.getAttribute('class') : '';

    const parsed = new DOMParser().parseFromString(html, 'text/html');
    const newGrid = parsed.getElementById('dT_collectionGrid');
    if (!newGrid) return;

    gridEl.innerHTML = newGrid.innerHTML;

    const newList = gridEl.querySelector('ul:first-child');
    if (newList && existingClass) newList.setAttribute('class', existingClass);

    this.postInit();
  }

  renderFilters(html, event) {
    const filterEl = document.getElementById('dt-collection-filter');
    if (!filterEl) return;

    const parsed = new DOMParser().parseFromString(html, 'text/html');
    const newFilter = parsed.getElementById('dt-collection-filter');
    if (!newFilter) return;

    filterEl.innerHTML = newFilter.innerHTML;

    this.bindActiveFacetButtonEvents();
    this.initPriceRange();
    this.updateClearFilterVisibility();

    if (typeof filterBubble === 'function') filterBubble();
  }

  updateURLHash(searchParams) {
    history.pushState(
      { searchParams },
      '',
      `${window.location.pathname}${searchParams ? '?' + searchParams : ''}`
    );
  }

  initPriceRange() {
    const rangeStart = document.querySelector('.price_range_start');
    const rangeEnd = document.querySelector('.price_range_end');
    const inputStart = document.querySelector('.price_input_start');
    const inputEnd = document.querySelector('.price_input_end');

    if (!rangeStart || !rangeEnd) return;

    const rangeMax = parseFloat(rangeStart.max) || 0;

    if (inputStart && inputStart.value) {
      rangeStart.value = parseFloat(inputStart.value) || 0;
    }
    if (inputEnd && inputEnd.value) {
      rangeEnd.value = parseFloat(inputEnd.value) || rangeMax;
    }

    this.updatePriceTrack(rangeStart, rangeEnd);

    rangeStart.addEventListener('input', () => {
      let val = parseFloat(rangeStart.value);
      const endVal = parseFloat(rangeEnd.value);
      if (val >= endVal) val = endVal - 1;
      if (val < 0) val = 0;
      rangeStart.value = val;
      if (inputStart) inputStart.value = val;
      this.updatePriceTrack(rangeStart, rangeEnd);
    });

    rangeEnd.addEventListener('input', () => {
      let val = parseFloat(rangeEnd.value);
      const startVal = parseFloat(rangeStart.value);
      if (val <= startVal) val = startVal + 1;
      if (val > rangeMax) val = rangeMax;
      rangeEnd.value = val;
      if (inputEnd) inputEnd.value = val;
      this.updatePriceTrack(rangeStart, rangeEnd);
    });

    if (inputStart) {
      inputStart.addEventListener('input', () => {
        let val = parseFloat(inputStart.value) || 0;
        const endVal = parseFloat(rangeEnd.value);
        if (val >= endVal) val = endVal - 1;
        if (val < 0) val = 0;
        rangeStart.value = val;
        this.updatePriceTrack(rangeStart, rangeEnd);
      });
    }

    if (inputEnd) {
      inputEnd.addEventListener('input', () => {
        let val = parseFloat(inputEnd.value) || rangeMax;
        const startVal = parseFloat(rangeStart.value);
        if (val <= startVal) val = startVal + 1;
        if (val > rangeMax) val = rangeMax;
        rangeEnd.value = val;
        this.updatePriceTrack(rangeStart, rangeEnd);
      });
    }
  }

  updatePriceTrack(rangeStart, rangeEnd) {
    const min = parseFloat(rangeStart.min) || 0;
    const max = parseFloat(rangeStart.max) || 1;
    const valStart = parseFloat(rangeStart.value) || 0;
    const valEnd = parseFloat(rangeEnd.value) || max;
    const percentStart = ((valStart - min) / (max - min)) * 100;
    const percentEnd = ((valEnd - min) / (max - min)) * 100;
    const track = rangeStart.closest('price-range');
    if (track) {
      track.style.setProperty('--range-start', percentStart + '%');
      track.style.setProperty('--range-end', percentEnd + '%');
    }
  }

  updateClearFilterVisibility() {
    const clearSection = document.querySelector('.clear-filter');
    const form = document.getElementById('CollectionFiltersForm');
    if (!clearSection || !form) return;

    const activeItems = clearSection.querySelectorAll('li');
    const hasActiveFilters = activeItems.length > 1;

    const priceMin = document.querySelector('.price_input_start');
    const priceMax = document.querySelector('.price_input_end');
    const rangeMax = document.querySelector('.price_range_end');
    const priceMinVal = priceMin ? parseFloat(priceMin.value) : 0;
    const priceMaxVal = priceMax ? parseFloat(priceMax.value) : 0;
    const rangeMaxVal = rangeMax ? parseFloat(rangeMax.max) : 0;
    const hasPriceFilter = priceMinVal > 0 || (rangeMaxVal > 0 && priceMaxVal < rangeMaxVal);

    if (hasActiveFilters || hasPriceFilter) {
      clearSection.style.display = 'block';
      form.classList.add('clear-show');
      form.classList.remove('clear-removed');
    } else {
      clearSection.style.display = 'none';
      form.classList.remove('clear-show');
      form.classList.add('clear-removed');
    }
  }

  postInit() {
    const grid = document.querySelector('.collection-grid #dT_collectionGrid');
    if (grid) grid.classList.remove('loading');

    if (typeof ajaxCart !== 'undefined') {
      ajaxCart.init({
        formSelector: '[data-product-form]',
        cartContainer: '#CartContainer',
        addToCartSelector: '.dT_AddToCart',
        cartCountSelector: '.CartCount',
        cartCostSelector: '.CartCost',
        moneyFormat: DT_THEME.moneyFormat,
      });
    }

    this.bindActiveFacetButtonEvents();
    this.initPriceRange();
    this.updateClearFilterVisibility();

    if (typeof collectionFilterPostInit === 'function') collectionFilterPostInit();
    if (typeof filterBubble === 'function') filterBubble();
    if (typeof itemSwatchLabel === 'function') itemSwatchLabel();
    if (typeof thumbGallerySwiper === 'function') thumbGallerySwiper();
  }
}

customElements.define('collection-filters-form', CollectionFiltersForm);