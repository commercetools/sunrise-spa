/**
 * sizeGuideTable
 */
function sizeGuideTable(item, root) {
  this.item = item;
  this.root = root || $(window);
  this.copy = null;
}

sizeGuideTable.prototype = {
  setupListeners() {
    const deferred = $.Deferred();
    const render = this.render.bind(this);
    this.root.load(render);
    this.root.on('redraw', render);
    this.root.on('resize', render);

    deferred.resolve();
    return deferred.promise();
  },
  render() {
    const rootWidth = this.root.width();
    if (rootWidth < 600) {
      this.split();
    } else {
      this.unSplit();
    }
  },
  split() {
    if (this.copy) {
      return;
    }

    const copy = this.item.clone();
    copy.addClass('copy').addClass('pinned');

    this.item.wrap('<div class="table-wrapper clearfix"/>');
    this.item.addClass('scrollable');
    this.item.parent().append(copy);
    this.copy = copy;
  },
  unSplit() {
    if (this.copy) {
      this.item.parent().find('.pinned').remove();
      this.item.unwrap();
      this.item.removeClass('scrollable');
      this.copy = null;
    }
  },
};

/*
 * NAVIGATION
 */


$(document).ready(() => {
  $(window).load(() => {
    // makes the scrollbar's design the same in all browsers
    // $('.order-summary-items').mCustomScrollbar({
    //   theme: 'dark',
    //   scrollInertia: 50,
    // });
    //
    // $('.store-location-wrapper > .addresses').mCustomScrollbar({
    //   theme: 'dark-thin',
    //   scrollInertia: 50,
    // });
  });

  // "Select" elements becomes customized
  //  $("select").selectBoxIt();  <- DONE NOW VIA VUE COMPONENT

  // Toggle search bar on mobile
  $('.search-toggle').click(() => {
    $('.search-box').slideToggle();
  });
});

// Toggling plus and minus icons for mobile navigation menu
$('.dropdown-toggle').click(function toggleNavMenuMobile() {
  $(this).find('.mobile-plus-content').toggleClass('mobile-minus-content');
});

// Apply active class to last item of breadcrumb
$('.breadcrumb li').last().addClass('active');

// Stop propagation and enable direct linking of categories
$('.dropdown-toggle').click((event) => {
  if ($(window).width() > 768) {
    event.stopPropagation();
  }
});

/*
 * POP PAGE
 */


$(() => {
  if ($(window).width() < 768) {
    // Activate megamenu accordion on smaller screens
    $('.nav-accordion').accordion({
      heightStyle: 'content',
      active: false,
      collapsible: true,
    });
  }
  if ($(window).width() > 768) {
    // Checks if there's a second row in the main menu, and if yes, it shows the group button
    const element = $('.dropdown-megamenu');
    const elementHeight = element.height();

    if (elementHeight > 42) {
      element.addClass('categories-brakes');
    }
  }
});

// Disabling bootstrap menu close on 2nd+ level items
$('.dropdown-submenu').click(function disableCloseSubmenu(event) {
  // stop bootstrap.js to hide the parents
  event.stopPropagation();
  // hide the open children
  $(this).find('.dropdown-submenu').removeClass('open');
  // add 'open' class to all parents with class 'dropdown-submenu'
  $(this).parents('.dropdown-submenu').addClass('open');
  // this is also open (or was)
  $(this).toggleClass('open');
});

// Off-canvas menu
$(document).ready(() => {
  $('[data-toggle="offcanvas"]').click(() => {
    $('.row-offcanvas').toggleClass('active');
  });
});

// Price range slider
$(() => {
  $('.slider-range').slider({
    range: true,
    min: 0,
    max: 1000,
    values: [0, 1000],
    slide(event, ui) {
      // Getting handler values
      $('.s1').val(`€ ${ui.values[0]}`);
      $('.s2').val(`€ ${ui.values[1]}`);
    },
  });
});

// Adding dynamic ID to quickview modals
$('.quickview').click((event) => {
  event.preventDefault();
  const modalId = event.target.getAttribute('data-modal');
  $(`#${modalId}`).modal('show');
});

// Wishlist section
$('.wishlist-btn').click(() => {
  $('.wishlist-items').toggleClass('hidden');
});

// Dark background on opened menu (mobile)
$('.navbar-toggle').click(() => {
  $('.darkbg').toggleClass('hidden');
});

/*
 * PDP PAGE
 */


// Lazy loading for images
$(() => {
  $('.img-lazy').each(function loadImageLazily() {
    const self = $(this);
    const imgSource = self.data('original');

    if (self.parent().is(':visible')) {
      if (self.is('img')) {
        const placeholder = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
        self.hide();
        self.attr('src', imgSource).one('load', () => {
          self.removeClass('img-lazy').removeAttr('data-original');
        }).on('error', () => {
          self.removeClass('img-lazy').addClass('img-lazy-error');
          return self.attr('src', placeholder);
        });
        self.fadeIn('slow');
      }
    }
  });
});


// Toggle hidden/sliced description
$(() => {
  const showChar = 300; // How many characters are shown by default
  const ellipsestext = '...';

  $('.more').each(function toggleDescription() {
    const description = $(this);
    const moretext = description.data('text-show');
    const content = description.html();
    if (content.length > showChar) {
      const displayed = content.substr(0, showChar);
      const hidden = content.substr(showChar, content.length - showChar);
      const html1 = `${displayed}<span class="moreellipses">${ellipsestext}&nbsp;</span><span class="morecontent">`;
      const html2 = `<span>${hidden}</span>&nbsp;&nbsp;<a href="#" class="morelink">${moretext}</a></span>`;
      description.html(html1 + html2);
    }
  });

  $('.morelink').click(function displayMoreLink() {
    const morelink = $(this);
    const morecontent = morelink.parent();
    const description = morecontent.parent();
    if (morelink.hasClass('less')) {
      morelink.removeClass('less');
      morelink.html(description.data('text-show'));
    } else {
      morelink.addClass('less');
      morelink.html(description.data('text-hide'));
    }
    morecontent.prev().toggle();
    morelink.prev().toggle();
    return false;
  });
});


// Size-guide
// $(() => {
//   const pdpPage = $('.pdp-page');
//   const sizeGuideModal = $('#size-guide', pdpPage);
//   const modalContentWrapper = $('.modal-content-wrapper', sizeGuideModal);

//   modalContentWrapper.each(function () {
//     const context = new sizeGuideTable($(this));
//     context.setupListeners().then(context.render.bind(context));
//   });
// });

// Slick gallery init
$(document).ready(() => {
  $('.gallery-mobile').slick({
    dots: true,
  });
});

// Slick reviews init
$(document).ready(() => {
  $('.reviews-mobile').slick({
    dots: true,
  });
});

$(document).ready(() => {
  const disableNonAvailableOptions = (select, form) => {
    const selected = select.find('option:selected').val();
    const selectData = select.data('cross-select');

    if (selectData && selectData[selected]) {
      $.each(selectData[selected], function disableUnavailableAttributes(key) {
        const attribute = form.find(`select[name='attribute-${key}']`);
        const activeSelections = this;
        const selectBox = attribute.data('selectBox-selectBoxIt');

        // disable all options which are not available for selected value
        attribute.find('option').each(function disableUnavailableOptionsForSelected(optionKey) {
          if (activeSelections.indexOf($(this).val()) >= 0) {
            selectBox.enableOption(optionKey);
          } else {
            selectBox.disableOption(optionKey);
          }
        });
        // refresh dropdown to avoid leaving it focused
        selectBox.refresh();
      });
    }
  };

  const enableSelectedCombination = (select, form) => {
    const identifiers = select.data('identifiers');
    const variantMap = select.data('variants');
    const reload = select.data('reload');

    if (identifiers) {
      // build a variant key from variant identifiers to get the variant information
      const variantKey = identifiers.map(identifier =>
        form.find(`select[name='attribute-${identifier}']`).val()).join('-');

      if (reload) {
        window.location = variantMap[variantKey].url;
      } else {
        const variantId = variantMap[variantKey].id;
        form.find("input[name='variantId']").val(variantId);
      }
    }
  };

  $('select.select-product-detail').each(function initAttributeSelector() {
    const select = $(this);
    const form = select.closest('form');
    disableNonAvailableOptions(select, form);
  });

  $('select.select-product-detail').change(function updateAttributeSelector() {
    const select = $(this);
    const form = select.closest('form');
    disableNonAvailableOptions(select, form);
    enableSelectedCombination(select, form);
  });
});

/*
 * CART PAGE
 */

// Quantity counter / spinner
(function initQuantityCounter() {
  window.inputNumber = (elements) => {
    const min = elements.attr('min') || false;
    const max = elements.attr('max') || false;

    function init(element) {
      const currentElement = element;

      function decrement() {
        let { value } = currentElement[0];
        value -= 1;
        if (!min || value >= min) {
          currentElement[0].value = value;
        }
      }

      function increment() {
        let { value } = currentElement[0];
        value += 1;
        if (!max || value <= max) {
          currentElement[0].value += 1;
        }
      }

      currentElement.prev().on('click', decrement);
      currentElement.next().on('click', increment);
    }

    elements.each(function initEachElement() {
      init($(this));
    });
  };
}());

$(() => {
  window.inputNumber($('.input-number'));
});

// jQuery UI - Tooltip on hover
$('.promo-info-text, .delivery-est, .security-code-info').tooltip();

/*
 * CHECKOUT-SHIPPING PAGE
*/

// Slide toggle different shipping address on click
$(() => {
  const cacheInput = $('#different-billing-checkbox');
  const cacheAddress = $('#different-billing-address');
  const setupListener = () => {
    cacheInput.click(() => {
      cacheAddress.slideToggle('slow');
    });
  };

  if (cacheInput && cacheInput.is(':checked')) {
    cacheAddress.show();
  }

  setupListener();
});

/*
 * CHECKOUT-PAYMENT PAGE
*/

// Show credit card input fields only on 'credit card' selected
$('#credit-card-input-field').hide();

$('.payment-text').change(() => {
  if ($('#payment-type-credit-card').is(':checked')) {
    $('#credit-card-input-field').show();
  } else {
    $('#credit-card-input-field').hide();
  }
});

/*
My Account: Personal Details page
*/

// Hide/show personal details and edit section
$('.personal-details-edit-wrapper').hide();
$('.personal-details-edit-toggle').click(() => {
  $('.personal-details-landing-wrapper').hide();
  $('.personal-details-edit-wrapper').show();
});

// Initializes editable data
function openForm(formClassName) {
  $(`.${formClassName}-hide`).hide();
  $(`.${formClassName}-show`).fadeIn();
}

function closeForm(formClassName) {
  $(`.${formClassName}-hide`).fadeIn();
  $(`.${formClassName}-show`).hide();
}

function initializeEditableData(formClassName) {
  const formWrapper = $(formClassName);
  if (formWrapper.hasClass('in')) {
    openForm(formClassName);
  } else {
    closeForm(formClassName);
  }
  $(`.${formClassName}-show-btn`).click(() => { openForm(formClassName); });
  $(`.${formClassName}-hide-btn`).click(() => { closeForm(formClassName); });
}

initializeEditableData('personal-details-edit');

// Move desktop content to sidebar for mobile
$(() => {
  if ($(window).width() < 767) {
    $('#my-account-desktop-content').insertAfter('#my-account-mobile-content');
  }
});
