/**
 * sizeGuideTable
 */
function sizeGuideTable(item, root) {
  this.item = item;
  this.root = root || $(window);
  this.copy = null;
};

sizeGuideTable.prototype = {
  setupListeners: function() {
    var deferred = $.Deferred();
    var render = this.render.bind(this);
    this.root.load(render);
    this.root.on('redraw', render);
    this.root.on('resize', render);

    deferred.resolve();
    return deferred.promise();
  },
  render: function() {
    var rootWidth = this.root.width();
    if (!!(rootWidth < 600)) {
      this.split();
    } else {
      this.unSplit();
    }
  },
  split: function() {
    if (this.copy) {
      return;
    }

    var copy;
    copy = this.item.clone();
    copy.addClass('copy').addClass('pinned');

    this.item.wrap('<div class="table-wrapper clearfix"/>');
    this.item.addClass('scrollable');
    this.item.parent().append(copy);
    this.copy = copy;
  },
  unSplit: function() {
    if (this.copy) {
      this.item.parent().find('.pinned').remove();
      this.item.unwrap();
      this.item.removeClass('scrollable');
      this.copy = null;
    }
  }
};

/*****************************************************************************/
/*
 /* NAVIGATION
 /*
 /*****************************************************************************/

$(document).ready(function() {

  $(window).load(function(){
    // makes the scrollbar's design the same in all browsers
    $(".nav-minicart ul, .order-summary-items").mCustomScrollbar({
      theme:"dark",
      scrollInertia:50
    });

    $(".store-location-wrapper > .addresses").mCustomScrollbar({
      theme:"dark-thin",
      scrollInertia:50
    });
  });

  // "Select" elements becomes customized
  //  $("select").selectBoxIt();  <- DONE NOW VIA VUE COMPONENT

  // Toggle search bar on mobile
  $('.search-toggle').click(function() {
    $('.search-box').slideToggle();
  });

  // Your bag dropdown
  $(".link-your-bag").click(function() {
    $(".nav-minicart").slideToggle();
  });

  // Location dropdown
  $(".location-dropdown-toggle").click(function() {
    $(".location-dropdown").slideToggle();
  });

  // Closing dropdown on click outside of it
  $('html').click(function() {
    $('.location-dropdown').hide();
    $('.nav-minicart').hide();
  });
  $('.list-item-location, .list-item-bag, .nav-minicart').click(function(event) {
    event.stopPropagation();
  });

});

// Toggling plus and minus icons for mobile navigation menu
$(".dropdown-toggle").click(function() {
  $(this).find(".mobile-plus-content").toggleClass("mobile-minus-content");
});

// Apply active class to last item of breadcrumb
$('.breadcrumb li').last().addClass('active');

// Stop propagation and enable direct linking of categories
$('.dropdown-toggle').click(function(event) {
  if ($(window).width() > 768) {
    event.stopPropagation();
  }
});

/*****************************************************************************/
/*
 /* POP PAGE
 /*
 /*****************************************************************************/


$(function() {
  if ($(window).width() < 768) {
    // Activate megamenu accordion on smaller screens
    $(".nav-accordion").accordion({
      heightStyle: "content",
      active: false,
      collapsible: true
    });
  }
  if ($(window).width() > 768) {
    // Checks if there's a second row in the main menu, and if yes, it shows the group button
    var element = $(".dropdown-megamenu");
    var elementHeight = element.height();

    if (elementHeight > 42) {
      element.addClass('categories-brakes');
    }
  }
});

// Disabling bootstrap menu close on 2nd+ level items
$(".dropdown-submenu").click(function(event) {
  // stop bootstrap.js to hide the parents
  event.stopPropagation();
  // hide the open children
  $(this).find(".dropdown-submenu").removeClass('open');
  // add 'open' class to all parents with class 'dropdown-submenu'
  $(this).parents(".dropdown-submenu").addClass('open');
  // this is also open (or was)
  $(this).toggleClass('open');
});

// Off-canvas menu
$(document).ready(function() {
  $('[data-toggle="offcanvas"]').click(function() {
    $('.row-offcanvas').toggleClass('active');
  });
});

// Price range slider
$(function() {
  $(".slider-range").slider({
    range: true,
    min: 0,
    max: 1000,
    values: [0, 1000],
    slide: function(event, ui) {
      // Getting handler values
      $('.s1').val('€ ' + ui.values[0]);
      $('.s2').val('€ ' + ui.values[1]);
    }
  });
});

// Adding dynamic ID to quickview modals
$(".quickview").click(function(event) {
  event.preventDefault();
  var modalId = event.target.getAttribute('data-modal')
  $("#" + modalId).modal('show');
});

// Wishlist section
$(".wishlist-btn").click(function() {
  $(".wishlist-items").toggleClass("hidden");
});

// Dark background on opened menu (mobile)
$(".navbar-toggle").click(function() {
  $(".darkbg").toggleClass("hidden");
});

/*****************************************************************************/
/*
 /* PDP PAGE
 /*
 /*****************************************************************************/

// Product gallery - BZoom
$("ul.bzoom").each(function(index, ul) {
  ul = $(ul);
  var imgCount = ul.find('li.gallery-image').length;
  ul.zoom({
    zoom_area_width: 300,
    // MORE OPTIONS HERE
    small_thumbs: imgCount,
    autoplay: false
  });
});

// Lazy loading for images
$(function() {
  $(".img-lazy").each(function() {
    var self = $(this);
    var imgSource = self.data("original");

    if (self.parent().is(":visible")) {
      if (self.is("img")) {
        var placeholder = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
        self.hide();
        self.attr("src", imgSource).one("load", function() {
          self.removeClass("img-lazy").removeAttr("data-original");
        }).on("error", function() {
          self.removeClass("img-lazy").addClass("img-lazy-error");
          return self.attr("src", placeholder);
        });
        self.fadeIn("slow");
      }
    }
  });
});


// Toggle hidden/sliced description
$(function() {
  var showChar = 300; // How many characters are shown by default
  var ellipsestext = "...";

  $('.more').each(function() {
    var description = $(this),
        moretext = description.data("text-show"),
        content = description.html();
    if (content.length > showChar) {
      var displayed = content.substr(0, showChar),
          hidden = content.substr(showChar, content.length - showChar);
      var html = displayed + '<span class="moreellipses">' + ellipsestext+ '&nbsp;</span><span class="morecontent"><span>' + hidden + '</span>&nbsp;&nbsp;<a href="#" class="morelink">' + moretext + '</a></span>';
      description.html(html);
    }
  });

  $(".morelink").click(function(){
    var morelink = $(this),
        morecontent = morelink.parent(),
        description = morecontent.parent();
    if(morelink.hasClass("less")) {
      morelink.removeClass("less");
      morelink.html(description.data("text-show"));
    } else {
      morelink.addClass("less");
      morelink.html(description.data("text-hide"));
    }
    morecontent.prev().toggle();
    morelink.prev().toggle();
    return false;
  });
});

// Full zoom gallery modal
$(function() {
  var caller = $(".animated-modal-action"),
    modal = $('#animatedModal'),
    modalContent = $('.modal-content', modal),
    bZoomContainer = $('.bzoom'),
    activeBZoomImg;

  caller.animatedModal({
    duration: 0.3,
    overflow: 'scroll',
    beforeOpen: function() {
      activeBZoomImg = $('.bzoom_thumb_active', bZoomContainer);
      var img = $('<img />');
      img.attr('src', activeBZoomImg.data('modal-content'));
      modalContent.append(img);
    },
    afterClose: function() {
      modalContent.empty();
      activeBZoomImg = null;
    }
  });
});

// Toggling plus and minus icons for product details accordion
$(function($jq) {
  var pdpAccordion = $jq(".pdp-accord-toggle"),
    contextPanelGroup = pdpAccordion.parents('.panel-group-pdp');

  pdpAccordion.click(function(e) {
    var context = $jq(this),
      contextPanel = context.parents('.panel-default'),
      contextButton = $jq('.accordion-plus', contextPanel);

    contextButton.toggleClass('accordion-minus');

    // Remove minus class on all other buttons
    contextPanelGroup.find('.accordion-plus').not(contextButton).removeClass('accordion-minus');
  });
});

// Size-guide
$(function() {
  var pdpPage = $('.pdp-page'),
    sizeGuideModal = $('#size-guide', pdpPage),
    modalContentWrapper = $('.modal-content-wrapper', sizeGuideModal);

  modalContentWrapper.each(function() {
    var context = new sizeGuideTable($(this));
    context.setupListeners().then(context.render.bind(context));
  });
});

// Slick gallery init
$(document).ready(function() {
  $('.gallery-mobile').slick({
    dots: true
  });
});

// Slick reviews init
$(document).ready(function() {
  $('.reviews-mobile').slick({
    dots: true
  });
});

$(document).ready(function() {

  var disableNonAvailableOptions = function(select, form) {
    var selected = select.find("option:selected").val(),
        selectData = select.data('cross-select');

    if (selectData && selectData[selected]) {
      $.each(selectData[selected], function (key) {
        var attribute = form.find("select[name='attribute-"+key+"']"),
            activeSelections = this,
            selectBox = attribute.data("selectBox-selectBoxIt");

        // disable all options which are not available for selected value
        attribute.find('option').each(function(key) {
          if (activeSelections.indexOf($(this).val()) >= 0) {
            selectBox.enableOption(key);
          } else {
            selectBox.disableOption(key);
          }
        });
        // refresh dropdown to avoid leaving it focused
        selectBox.refresh();
      });
    }
  };

  var enableSelectedCombination = function(select, form) {
    var identifiers = select.data('identifiers'),
        variantMap = select.data('variants'),
        reload = select.data('reload');

    if (identifiers) {
      // build a variant key from variant identifiers to get the variant information
      var variantKey = identifiers.map(function(identifier) {
        return form.find("select[name='attribute-"+identifier+"']").val();
      }).join('-');

      if (reload) {
        window.location = variantMap[variantKey].url;
      } else {
        var variantId = variantMap[variantKey].id;
        form.find("input[name='variantId']").val(variantId);
      }
    }
  }

  $("select.select-product-detail").each(function () {
    var select = $(this),
        form = select.closest('form');
    disableNonAvailableOptions(select, form);
  });

  $("select.select-product-detail").change(function () {
    var select = $(this),
        form = select.closest('form');
    disableNonAvailableOptions(select, form);
    enableSelectedCombination(select, form);
  });
});

/*****************************************************************************/
/*
 /* CART PAGE
 /*
 /*****************************************************************************/

// Quantity counter / spinner
(function() {
  window.inputNumber = function(el) {
    var min = el.attr('min') || false;
    var max = el.attr('max') || false;
    el.each(function() {
      init($(this));
    });

    function init(el) {
      el.prev().on('click', decrement);
      el.next().on('click', increment);

      function decrement() {
        var value = el[0].value;
        value--;
        if (!min || value >= min) {
          el[0].value = value;
        }
      }

      function increment() {
        var value = el[0].value;
        value++;
        if (!max || value <= max) {
          el[0].value = value++;
        }
      }
    }
  };
})();

$(function() {
  inputNumber($('.input-number'));
});

// jQuery UI - Tooltip on hover
$(".promo-info-text, .delivery-est, .security-code-info").tooltip();

/*****************************************************************************/
/*
 /* CHECKOUT-SHIPPING PAGE
 /*
 /*****************************************************************************/

// Slide toggle different shipping address on click
$(function() {
  var cacheInput = $("#different-billing-checkbox"),
    cacheAddress = $("#different-billing-address"),
    setupListener = function() {
      cacheInput.click(function() {
        cacheAddress.slideToggle("slow");
      });
    };

  if (cacheInput && cacheInput.is(':checked')) {
    cacheAddress.show();
  }

  setupListener();
});


/*****************************************************************************/
/*
 /* CHECKOUT-PAYMENT PAGE
 /*
 /*****************************************************************************/

// Show credit card input fields only on 'credit card' selected
$('#credit-card-input-field').hide();

$('.payment-text').change(function() {
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
$('.personal-details-edit-toggle').click(function() {
  $('.personal-details-landing-wrapper').hide();
  $('.personal-details-edit-wrapper').show();
})

// Initializes editable data
function openForm(formClassName) {
    $("." + formClassName + "-hide").hide();
    $("." + formClassName + "-show").fadeIn();
}

function closeForm(formClassName) {
    $("." + formClassName + "-hide").fadeIn();
    $("." + formClassName + "-show").hide();
}

function initializeEditableData(formClassName) {
   var formWrapper = $(formClassName);
   if (formWrapper.hasClass("in")) {
      openForm(formClassName);
   } else {
      closeForm(formClassName);
   }
   $("." + formClassName + "-show-btn").click(function(){ openForm(formClassName); });
   $("." + formClassName + "-hide-btn").click(function(){ closeForm(formClassName); });
}

initializeEditableData("personal-details-edit");

// Move desktop content to sidebar for mobile
$(function() {
  if($(window).width() < 767) {
    $("#my-account-desktop-content").insertAfter("#my-account-mobile-content");
  }
});
