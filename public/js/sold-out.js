(function () {
  const STAMP_SRC = '/images/sold-out.svg';
  const SELECTORS = [
    '.product-card',
    '.product-image',
    '.banner',
    '[data-sold-out="true"]'
  ];

  function ensureStampOn(el, options = {}) {
    if (!el) return;
    if (el.querySelector(':scope > .sold-out-stamp')) return;

    el.classList.add('sold-out-container');

    const stamp = document.createElement('div');
    stamp.className = 'sold-out-stamp' + (options.opaque ? ' opaque' : '') + (options.blur ? ' blur' : '');
    const img = document.createElement('img');
    img.alt = 'Sold out';
    img.src = options.src || STAMP_SRC;
    stamp.appendChild(img);

    const computed = getComputedStyle(el).position;
    if (computed === 'static') el.style.position = 'relative';

    el.appendChild(stamp);
  }

  function autoApply() {
    const nodes = document.querySelectorAll(SELECTORS.join(','));
    nodes.forEach(node => {
      const style = node.getAttribute('data-stamp-style');
      ensureStampOn(node, {
        opaque: style === 'opaque',
        blur: style === 'blur'
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', autoApply);
  } else {
    autoApply();
  }

  window.SoldOutStamp = { ensureStampOn };
})();
