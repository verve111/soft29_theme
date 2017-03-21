/*------------------------------------------------------------------
Project:        Paperclip
Author:         Simpleqode.com
URL:            http://simpleqode.com/
                https://twitter.com/YevSim
                https://www.facebook.com/simpleqode
Version:        1.3.3
Created:        11/03/2014
Last change:    05/02/2016
-------------------------------------------------------------------*/

/**
 * Navbar
 */

/* Navbar active links */

$(function() {

  function getPageName(url) {
    url = url.split("/");
    url = url[url.length - 1];
    url = url.split("#");
    url = url[0];
    return url;
  }

  var currentUrl = window.location.href;
  var pageName = getPageName(currentUrl);

  $(".navbar-nav li > a[href$='" + pageName + "']").parent("li").first()
    .addClass("active");

  $(".navbar-nav > li").has(".active").first()
    .addClass("active");

});

/* Navbar shadow */

$(function() {
  $(".navbar-default").wrap("<div class='navbar-container'></div>");
  $(".navbar-container").append("<div class='navbar-shadow'></div>");
});


/* Navbar search form toggle */

$(function() {
  $(document).click(function(e) {
    var target = $(e.target),
        searchToggle = target.closest(".navbar-search__toggle"),
        searchForm = target.closest(".navbar-search");

    // Click on the button to show/hide the form
    if (searchToggle.length) {
      $(".navbar-search").toggle();
    }

    // Click outside the form to hide it
    if(!searchToggle.length && !searchForm.length && $(".navbar-search").css("display") != "hidden") {
      $(".navbar-search").hide();
    }
  });
});


/* Dropdown submenu positioning (left or right) */

$(function() {
  $("ul.dropdown-menu a[data-toggle=dropdown]").hover(function() {
    var menu = $(this).parent().find("ul"),
        menupos = menu.offset();

    if ((menupos.left + menu.width()) + 30 > $(window).width()) {
      $(this).parent().addClass('pull-left');   
    }

    return false;
  });
});


/* Toggle dropdown menus on hover instead of on click */

/* $(".nav .dropdown").hover(function() {
  $(this).find(".dropdown-toggle").dropdown("toggle");
}); */

// Where 991 is the max width of small screens (tablets)

$(function(){
    $('.dropdown').hover(function() {
        if ($(window).width() > 991) $(this).addClass('open');
    },
    function() {
        if ($(window).width() > 991) $(this).removeClass('open');
    });
});


/**
 * Footer
 */

/* Sticky footer */

$(function() {
  function stickyFooter() {
    var footer = $("footer");
    var footerHeight = footer.outerHeight(true);
    $("body").css("margin-bottom", footerHeight);
  };

  setTimeout(stickyFooter,200);

  $(window).resize(function() {
    setTimeout(stickyFooter, 200);
  });
});


/* Toggle footer columns content on click (for extra small screens) */

$(function() {
  $(".footer-item__title").click(function() {
    var windowWidth = $(window).width();
    var thisContent = $(this).next();

    if (windowWidth <= 767) {
      $(".footer-item__content").not(thisContent).slideUp();
      $(".footer-item__title").not(this).removeClass("expanded");
      $(this).toggleClass("expanded").next().slideToggle();
    }
  });

  $(window).resize(function() {
    if ( $(this).width() > 767 ) {
      $(".footer-item__content").css("display", "block");
    } else {
      $(".footer-item__content").css("display", "none");
    }
  });
});


/**
 * Smooth scroll to anchor
 */

$(function() {
  $('a[href*=#]').not('[href=#], [data-toggle], [data-slide]').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) +']');

      if (target.length) {
        $('html,body').animate({
          scrollTop: (target.offset().top - 20)
        }, 1000);

        return false;
      }
    }
  });
});


/**
 * Initialize Tooltips & Popovers
 */

$(function () {
  $('[data-toggle="tooltip"]').tooltip();
  $('[data-toggle="popover"]').popover();
});


/**
 * Initialize and calculate styles & offsets for Bootstrap Affix
 */

$(function() {

  $('[data-spy="affix"]').each(function() {
    var elem = $(this);

    // Set offsets 

    elem.affix({
      offset: {
        top: function() {
          return (this.top = elem.offset().top - 40);
        },
        bottom: function() {
          return (this.bottom = ($("footer").outerHeight(true) + 120));
        }
      }
    });

    // Apply styles

    elem.on({
      "affix.bs.affix": function() {
        elem.css("width", elem.outerWidth(false));
      },
      "affixed.bs.affix": function() {
        elem.css({
          "position": "fixed",
          "top": 40
        });
      },
      "affixed-top.bs.affix": function() {
        elem.attr("style", "");
      }
    });

  });

});


/**
 * Blackout
 */

$(function() {
  $(".blackout").each(function() {
    var elem = $(this),
        blackoutMax = elem.data("blackout-max") ? elem.data("blackout-max") / 100 : 1;

    elem.prepend("<div class='blackout__layer'></div>");

    $(window).scroll(function() {
      var elemBottomOffset = elem.offset().top + elem.height() - $(window).scrollTop();

      if (elemBottomOffset > 0 && elemBottomOffset < elem.height()) {
        var coef = 1 - (elemBottomOffset / elem.height());
            coef = Math.min(coef, blackoutMax);
        
        elem.children(".blackout__layer").css("opacity", coef);
      } else if (elemBottomOffset >= elem.height()) {
        elem.children(".blackout__layer").css("opacity", 0);
      }
    });

  });
});


/**
 * Background Parallax
 */

$(function() {
  $(".bg-parallax").each(function() {

    // Create layer

    var parallaxLayer = "<div class='bg-parallax__layer'></div>";
    $(this).prepend(parallaxLayer);

    var elem = $(this);
    var layer = $(this).find(".bg-parallax__layer");

    // Set background image for the layer

    var backgroundImage = elem.css("background-image");
    layer.css("background-image", backgroundImage);
    elem.css("background-image", "none");

    function updateBackgroundPosition() {
      var scrollAdjust = elem.offset().top - $(window).scrollTop();
          scrollAdjust *= -0.3;

        layer.css({
          "transform": "translateY(" + scrollAdjust + "px)",
          "-ms-transform": "translateY(" + scrollAdjust + "px)",
          "-webkit-transform": "translateY(" + scrollAdjust + "px)"
        });
    };

    // Update elem background position on load

    updateBackgroundPosition();

    // Update elem background posistion on resize & scroll

    $(window).on({
      resize: updateBackgroundPosition,
      scroll: updateBackgroundPosition
    });

  });
});


/**
 * Comments
 */

/* New comment */

$(function() {

  // Expand textarea on focus, enable submit button on input

  $("form[name='comments__new'] textarea").on({
    focus: function() {
      if (!$(this).val()) {
        $(this).data("original-height", $(this).outerHeight());
      }
      $(this).animate({ "height": "68px" }, 300);
    },
    blur: function() {
      if (!$(this).val()) {
        $(this).animate({ "height": $(this).data("original-height") }, 300);
        $(this).parents("form").find("button[type='submit']").attr("disabled", "disabled");
      }
    },
    input: function() {
      $(this).parents("form").find("button[type='submit']").removeAttr("disabled");
    }
  });
});


/**
 * Homepage
 */

/* Home slider initialization */

$('#home-slider').carousel({
  interval: 5000
});


/**
 * Responsive showcase
 */

$(function() {

  function toggleDevice(device) {

    // Change active icon
    $(".responsive-showcase__devices > li")
      .removeClass("active")
      .filter("[data-device='" + device + "']").addClass("active");

    // Change image
    $(".responsive-showcase__images > img")
      .hide()
      .filter("#" + device).fadeIn();
  }
  
  // Load an active device image on load
  var device = $(".responsive-showcase__devices > .active").data("device");
  toggleDevice(device);

  // Toggle device image on click
  $(".responsive-showcase__devices > li").click(function() {
    var device = $(this).data("device");
    toggleDevice(device);
  });

});


/**
 * Search results
 */

$(function() {
  $(".search-results-filter__sort > li").click(function() {
    $(this).addClass("active").siblings("li").removeClass("active");
    return false;
  });
});


/**
 * Shop
 */


/* Shop filter: Price */

$(function() {

  $("input[name='shop-filter__price']").change(function() {
    if ( $(this).val() == "specify" ) {
      $(".shop-filter__price").find("input, button").attr("disabled", false);
    } else {
      $(".shop-filter__price").find("input, button").attr("disabled", true);
    }
  });

});


/* Shop filter: Colors */

$(function() {

  // Set background color of the label

  $(".shop-filter__color input[type='text']").each(function() {
    var inputColor = $(this).data("input-color");

    $(this).next("label").css("background-color", inputColor);
  });

  // Change input value on click

  $(".shop-filter__color label").click(function() {
    var input = $(this).parent(".shop-filter__color").find("input[type='text']");
    var inputColor = input.data("input-color");

    input.attr("value", inputColor);

  });

});


/* Shop sorting */

$(function() {

  $(".shop__sorting > li > a").click(function() {
    var li = $(this).parent("li");
    li.addClass("active").siblings("li").removeClass("active");
  });

});


/* Input quantity */

$(function() {

  $(".input_qty > label > span").not(".output").click(function() {
    var output = $(this).siblings(".output");
    var currentQty = output.text();
        currentQty = +currentQty;

    if( $(this).hasClass("minus") ) {
      (currentQty > 0) ? --currentQty : currentQty;
    } else {
      ++currentQty;
    }

    output.text(currentQty);
    $(this).parents(".input_qty").children("input[type='text']").attr("value", currentQty);
  });

});


/* Shop item: Image */

$(function() {

  function shopItemMainImg(src) {
    $(".shop-item-img__main > img")
      .css("opacity", "0")
      .attr("src", src)
      .animate({"opacity": "1"}, 200);
  }

  $(".shop-item-img__aside > img").mouseenter(function() {

    $(this).addClass("active").siblings("img").removeClass("active");

    var activeSrc = $(this).attr("src");
    var mainSrc = $(".shop-item-img__main > img").attr("src");

    if (activeSrc != mainSrc)
      shopItemMainImg(activeSrc);

  });

})