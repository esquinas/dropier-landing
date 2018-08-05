! function ($) {
  function mk_text_typer() {
    "use strict";
    $("[data-typer-targets]").each(function () {
      var that = this;
      MK.core.loadDependencies([MK.core.path.plugins + "jquery.typed.js"], function () {
        var $this = $(that),
          $first_string = [$this.text()],
          $rest_strings = $this.attr("data-typer-targets").split(","),
          $strings = $first_string.concat($rest_strings);
        $this.text(""), $this.typed({
          strings: $strings,
          typeSpeed: 30,
          backDelay: 1200,
          loop: !0,
          loopCount: !1
        })
      })
    })
  }

  function mk_tab_slider_func() {
    "use strict";
    $(".mk-tab-slider").each(function () {
      var that = this;
      MK.core.loadDependencies([MK.core.path.plugins + "jquery.swiper.js"], function () {
        function repaintFirefox() {
          $content.css("display", "block"), setTimeout(function () {
            mk_tab_slider.reInit(), $content.css("display", "table")
          }, 100)
        }
        var $this = $(that),
          id = $this.data("id"),
          $autoplayTime = $this.data("autoplay"),
          $content = $(".mk-slider-content"),
          mk_tab_slider = $this.swiper({
            wrapperClass: "mk-tab-slider-wrapper",
            slideClass: "mk-tab-slider-item",
            calculateHeight: !0,
            speed: 500,
            autoplay: !isTest && $autoplayTime,
            onSlideChangeStart: function () {
              $('.mk-tab-slider-nav[data-id="' + id + '"]').find(".active").removeClass("active"), $('.mk-tab-slider-nav[data-id="' + id + '"]').find("a").eq(mk_tab_slider.activeIndex).addClass("active")
            }
          });
        $('.mk-tab-slider-nav[data-id="' + id + '"]').find("a").first().addClass("active"), $('.mk-tab-slider-nav[data-id="' + id + '"]').find("a").on("touchstart mousedown", function (e) {
          e.preventDefault(), $('.mk-tab-slider-nav[data-id="' + id + '"]').find(".active").removeClass("active"), $(this).addClass("active"), mk_tab_slider.swipeTo($(this).index())
        }), $('.mk-tab-slider-nav[data-id="' + id + '"]').find("a").click(function (e) {
          e.preventDefault()
        }), repaintFirefox(), $(window).on("resize", repaintFirefox)
      })
    })
  }

  function mk_one_page_scroller() {
    "use strict";
    $(".mk-edge-one-pager").each(function () {
      var self = this;
      MK.core.loadDependencies([MK.core.path.plugins + "jquery.fullpage.js"], function () {
        function swipeTo(href, e) {
          if (href = "_" + href, ~href.indexOf("#")) {
            var section = href.split("#")[1];
            ~anchorArr.indexOf(section) && (void 0 !== e && e.preventDefault(), scrollable ? $.fn.fullpage.moveTo(section) : MK.utils.scrollToAnchor('[data-title="' + section + '"]'))
          }
        }
        var $this = $(self),
          anchorArr = [];
        $this.find(".section").each(function () {
          anchorArr.push($(this).attr("data-title"))
        });
        var scrollable = !0;
        $this.find(".section").each(function () {
          var $section = $(this),
            $content = $section.find(".edge-slide-content");
          $section.height();
          $content.innerHeight() + 30 > $(window).height() && (scrollable = !1)
        }), scrollable || $this.find(".section").each(function () {
          $(this).addClass("active").css({
            "padding-bottom": "50px"
          })
        }), scrollable && $this.fullpage({
          verticalCentered: !1,
          resize: !0,
          slidesColor: ["#ccc", "#fff"],
          anchors: anchorArr,
          scrollingSpeed: 600,
          easing: "easeInQuart",
          menu: !1,
          navigation: !0,
          navigationPosition: "right",
          navigationTooltips: !1,
          slidesNavigation: !0,
          slidesNavPosition: "bottom",
          loopBottom: !1,
          loopTop: !1,
          loopHorizontal: !0,
          autoScrolling: !0,
          scrollOverflow: !1,
          css3: !0,
          paddingTop: 0,
          paddingBottom: 0,
          normalScrollElements: ".mk-header, .mk-responsive-wrap",
          normalScrollElementTouchThreshold: 5,
          keyboardScrolling: !0,
          touchSensitivity: 15,
          continuousVertical: !1,
          animateAnchor: !0,
          onLeave: function (index, nextIndex, direction) {
            var currentSkin = $this.find(".one-pager-slide").eq(nextIndex - 1).attr("data-header-skin");
            MK.utils.eventManager.publish("firstElSkinChange", currentSkin), $("#fullPage-nav").removeClass("light-skin dark-skin").addClass(currentSkin + "-skin")
          },
          afterRender: function () {
            var $nav = $("#fullPage-nav");
            setTimeout(function () {
              var currentSkin = $this.find(".one-pager-slide").eq(0).attr("data-header-skin");
              MK.utils.eventManager.publish("firstElSkinChange", currentSkin), $nav.length && $nav.removeClass("light-skin dark-skin").addClass(currentSkin + "-skin")
            }, 300);
            var $slide = $this.find(".section"),
              headerHeight = MK.val.offsetHeaderHeight(0),
              windowHeight = $(window).height();
            if ($slide.height(windowHeight - headerHeight), $nav.length) {
              $nav.css({
                top: "calc(50% + " + headerHeight / 2 + "px)",
                marginTop: 0
              });
              var style = $this.attr("data-pagination");
              $nav.addClass("pagination-" + style)
            }
            setTimeout(mk_one_pager_resposnive, 1e3)
          },
          afterResize: function () {
            var $slide = $this.find(".section"),
              headerHeight = MK.val.offsetHeaderHeight(0),
              windowHeight = $(window).height();
            $slide.height(windowHeight - headerHeight), $("#fullPage-nav").css({
              top: "calc(50% + " + headerHeight / 2 + "px)",
              marginTop: 0
            }), setTimeout(mk_one_pager_resposnive, 1e3), console.log("Reposition pager content.")
          }
        });
        var loc = window.location;
        loc.hash && swipeTo(loc.hash), $(document).on("click", "a", function (e) {
          swipeTo($(e.currentTarget).attr("href"), e)
        })
      })
    })
  }

  function mk_one_pager_resposnive() {
    "use strict";
    $(".mk-edge-one-pager").each(function () {
      var $pager = $(this),
        headerHeight = MK.val.offsetHeaderHeight(0),
        windowHeight = $(window).height() - headerHeight;
      $pager.find(".one-pager-slide").each(function () {
        var $slide = $(this),
          $content = $slide.find(".edge-slide-content");
        if ($slide.hasClass("left_center") || $slide.hasClass("center_center") || $slide.hasClass("right_center")) {
          var contentHeight = $content.height(),
            distanceFromTop = (windowHeight - contentHeight) / 2;
          distanceFromTop = distanceFromTop < 50 ? 50 + headerHeight : distanceFromTop, $content.css("marginTop", distanceFromTop)
        }
        if ($slide.hasClass("left_bottom") || $slide.hasClass("center_bottom") || $slide.hasClass("right_bottom")) {
          var distanceFromTop = windowHeight - $content.height() - 90;
          $content.css("marginTop", distanceFromTop)
        }
      });
      var $row = $pager.parents(".vc_row.vc_row-fluid.mk-fullwidth-true");
      if ($row.length > 0) {
        var $wrapper = $(".mk-main-wrapper-holder"),
          $grid = $row.children(".mk-grid"),
          rowWidth = $row.width(),
          wrapperWidth = $wrapper.width();
        if (rowWidth >= wrapperWidth || $grid.length > 0) return;
        var $content = $wrapper.find(".theme-content"),
          oriPos = $content.position(),
          oriPadLeft = $content.css("padding-left"),
          oriLeft = parseInt(oriPos.left) + parseInt(oriPadLeft);
        if (wrapperWidth <= 0 || oriLeft <= 0) return;
        $row.css({
          width: wrapperWidth,
          left: -1 * oriLeft
        })
      }
    })
  }

  function mk_gallery() {
    "use strict";
    $(".mk-gallery .mk-gallery-item.hover-overlay_layer .item-holder").each(function () {
      function updatePosition() {
        var parentHeight = itemHolder.outerHeight(),
          contentHeight = galleryDesc.innerHeight(),
          paddingVal = (parentHeight - contentHeight) / 2;
        galleryDesc.css({
          top: paddingVal
        })
      }
      var itemHolder = $(this),
        galleryDesc = itemHolder.find(".gallery-desc");
      updatePosition(), $(window).on("resize", function () {
        setTimeout(function () {
          updatePosition()
        }, 1e3)
      })
    }), $(window).width() <= 1024 && $(".mk-gallery .mk-gallery-item").on("click", function (e) {
      var clicks = $(this).data("clicks");
      $(this).toggleClass("hover-state"), $(this).data("clicks", !clicks)
    })
  }

  function mk_theatre_responsive_calculator() {
    var $laptopContainer = $(".laptop-theatre-slider"),
      $computerContainer = $(".desktop-theatre-slider");
    $laptopContainer.each(function () {
      var $this = $(this),
        $window = $(window),
        $windowWidth = $window.outerWidth(),
        $width = ($window.outerHeight(), $this.outerWidth()),
        $height = $this.outerHeight(),
        $player = $this.find(".player-container");
      $windowWidth > $width && $player.css({
        "padding-left": parseInt(143 * $width / 1200),
        "padding-right": parseInt(143 * $width / 1200),
        "padding-top": parseInt(38 * $height / 690),
        "padding-bottom": parseInt(78 * $height / 690)
      })
    }), $computerContainer.each(function () {
      var $this = $(this),
        $window = $(window),
        $windowWidth = $window.outerWidth(),
        $width = ($window.outerHeight(), $this.outerWidth()),
        $height = $this.outerHeight(),
        $player = $this.find(".player-container");
      $windowWidth > $width && $player.css({
        "padding-left": parseInt(49 * $width / 1200),
        "padding-right": parseInt(52 * $width / 1200),
        "padding-top": parseInt(60 * $height / 969),
        "padding-bottom": parseInt(290 * $height / 969)
      })
    })
  }

  function mk_mobile_tablet_responsive_calculator() {
    var $laptopSlideshow = $(".mk-laptop-slideshow-shortcode"),
      $lcdSlideshow = $(".mk-lcd-slideshow");
    $.exists(".mk-laptop-slideshow-shortcode") && $laptopSlideshow.each(function () {
      var $this = $(this),
        $window = $(window),
        $width = ($window.outerWidth(), $window.outerHeight(), $this.outerWidth()),
        $height = $this.outerHeight();
      $this.find(".slideshow-container").css({
        "padding-left": parseInt(102 * $width / 836),
        "padding-right": parseInt(102 * $width / 836),
        "padding-top": parseInt(28 * $height / 481),
        "padding-bottom": parseInt(52 * $height / 481)
      })
    }), $.exists(".mk-lcd-slideshow") && $lcdSlideshow.each(function () {
      var $this = $(this),
        $window = $(window),
        $width = ($window.outerWidth(), $window.outerHeight(), $this.outerWidth()),
        $height = $this.outerHeight();
      $this.find(".slideshow-container").css({
        "padding-left": parseInt(36 * $width / 886),
        "padding-right": parseInt(39 * $width / 886),
        "padding-top": parseInt(35 * $height / 713),
        "padding-bottom": parseInt(213 * $height / 713)
      })
    })
  }

  function mk_start_tour_resize() {
    $(".mk-header-start-tour").each(function () {
      function updateStartTour() {
        $windowWidth < mk_responsive_nav_width ? ($this.removeClass("hidden"), $this.addClass("show")) : $padding < $linkWidth ? ($this.removeClass("show"), $this.addClass("hidden")) : ($this.removeClass("hidden"), $this.addClass("show"))
      }
      var $windowWidth = $(document).width(),
        $this = $(this),
        $linkWidth = $this.width() + 15,
        $padding = ($windowWidth - mk_responsive_nav_width) / 2;
      setTimeout(function () {
        updateStartTour()
      }, 300)
    })
  }

  function mk_header_social_resize() {
    $(".mk-header-social.header-section").each(function () {
      function updateStartTour() {
        $windowWidth < mk_responsive_nav_width ? ($this.removeClass("hidden"), $this.addClass("show")) : $padding < $linkWidth ? ($this.removeClass("show"), $this.addClass("hidden")) : ($this.removeClass("hidden"), $this.addClass("show"))
      }
      var $windowWidth = $(document).width(),
        $this = $(this),
        $linkWidth = $this.width() + 15,
        $padding = ($windowWidth - mk_responsive_nav_width) / 2;
      setTimeout(function () {
        updateStartTour()
      }, 300)
    })
  }

  function mk_page_section_social_video_bg() {
    $(".mk-page-section.social-hosted").each(function () {
      var player, $container = $(this),
        $sound = $container.data("sound"),
        $source = $container.data("source"),
        timer = 1e3;
      if ($("body").hasClass(".compose-mode") && (timer = 2e3), "youtube" == $source) {
        var youtube = $container.find("iframe")[0];
        try {
          player = new YT.Player(youtube, {
            events: {
              onReady: function () {
                player.playVideo(), 0 == $sound && player.mute()
              }
            }
          })
        } catch (e) {
          console.log(e)
        }
      }
      if ("vimeo" == $source) {
        var vimeo = $container.find("iframe")[0];
        player = $f(vimeo), setTimeout(function () {
          player.api("play"), !1 === $sound && player.api("setVolume", 0)
        }, timer)
      }
    })
  }

  function videoLoadState() {
    $(".mk-section-video video").each(function () {
      var mkVideo = this;
      mkVideo.play(), this.onload = function () {
        setTimeout(function () {
          $(mkVideo).animate({
            opacity: 1
          }, 300)
        }, 1e3)
      }()
    })
  }

  function mkPositionSidebar() {
    var top, themeContent = $(".theme-content"),
      lastFullWidthChild = themeContent.find(".vc_row-full-width").last(),
      sidebar = $("#theme-page > .mk-main-wrapper-holder > .theme-page-wrapper > #mk-sidebar");
    if (!lastFullWidthChild.length) return void sidebar.removeAttr("style");
    top = lastFullWidthChild.offset().top - themeContent.offset().top, sidebar.css("padding-top", top)
  }

  function mk_accordion_toggles_tooltip() {
    "use strict";
    $(".box-close-btn").on("click", function () {
      return $(this).parent().fadeOut(300), !1
    })
  }

  function mk_portfolio_ajax() {
    "use strict";

    function init() {
      var $portfolio = $(".portfolio-grid.portfolio-ajax-enabled");
      $portfolio.length && MK.core.loadDependencies([MK.core.path.plugins + "jquery.ajax.portfolio.js"], function () {
        setTimeout(function () {
          $portfolio.each(function () {
            $(this).ajaxPortfolio({
              extraOffset: headerHeight
            })
          })
        }, 100)
      })
    }
    var headerHeight = 0;
    $.exists("#wpadminbar") && (headerHeight += $("#wpadminbar").height()), $.exists(".mk-vm-menuwrapper") || (headerHeight += parseInt($(".mk-header").attr("data-sticky-height"))), init(), MK.utils.eventManager.subscribe("ajaxLoaded", init)
  }

  function mk_ajax_search() {
    "use strict";

    function onSearchBoxInput(e) {
      var target = e.target || e.srcElement,
        newValue = target.value;
      searchTerm !== newValue && (searchTerm = newValue, ul.innerHTML = "", searchTerm.length >= minimumLengthToSearch && ($mkAjaxSearchInput.addClass("ajax-searching"), requestCounter++, $.getJSON(ajaxurl + querySpliter + "callback=?&action=mk_ajax_search&security=" + security + "&_wp_http_referer=" + wpHttpReferer + "&term=" + searchTerm).done(showSearchResult).fail(showErrorMessage)))
    }

    function showSearchResult(data) {
      if (responseCounter++, isCorrectResponse()) {
        if (data.length > 0)
          for (var i = 0; i < data.length; i++) {
            var item = data[i];
            $("<li>").append('<a href="' + item.link + '">' + item.image + '<span class="search-title">' + item.label + '</span><span class="search-date">' + item.date + "</span></a>").appendTo(ul)
          } else ul.innerHTML = '<li class="mk-nav-search-result-zero">No Result.</li>';
        $mkAjaxSearchInput.parent("form").removeClass("ajax-searching").addClass("ajax-search-complete")
      }
    }

    function showErrorMessage() {
      responseCounter++, isCorrectResponse() && (ul.innerHTML = '<li class="mk-nav-search-error-message">Can not search! Please try again.</li>')
    }

    function isCorrectResponse() {
      return requestCounter === responseCounter
    }
    if ("beside_nav" === mk_ajax_search_option) {
      var searchTerm, minimumLengthToSearch = 3,
        $mkAjaxSearchInput = $("#mk-ajax-search-input"),
        security = $mkAjaxSearchInput.siblings('input[name="security"]').val(),
        wpHttpReferer = $mkAjaxSearchInput.siblings('input[name="_wp_http_referer"]').val(),
        querySpliter = ajaxurl.indexOf("?") > -1 ? "&" : "?",
        ul = document.getElementById("mk-nav-search-result"),
        requestCounter = 0,
        responseCounter = 0;
      $mkAjaxSearchInput.on("paste input propertychange", onSearchBoxInput)
    }
  }

  function mk_backgrounds_parallax() {
    "use strict";
    1 == mk_header_parallax && $(".mk-header-bg").addClass("mk-parallax-enabled"), 1 == mk_body_parallax && $("body").addClass("mk-parallax-enabled"), 1 == mk_banner_parallax && $(".mk-header").addClass("mk-parallax-enabled"), 1 == mk_footer_parallax && $("#mk-footer").addClass("mk-parallax-enabled"), $(".mk-parallax-enabled").each(function () {
      var $this = $(this);
      MK.utils.isMobile() || MK.core.loadDependencies([MK.core.path.plugins + "jquery.parallax.js"], function () {
        $this.parallax("49%", .3)
      })
    }), $(".mk-fullwidth-slideshow.parallax-slideshow").each(function () {
      var $this = $(this);
      MK.utils.isMobile() || MK.core.loadDependencies([MK.core.path.plugins + "jquery.parallax.js"], function () {
        var speed_factor = $this.attr("data-speedFactor");
        $this.parallax("49%", speed_factor)
      })
    })
  }

  function loop_audio_init() {
    $.exists(".jp-jplayer") && $(".jp-jplayer.mk-blog-audio").each(function () {
      var $this = $(this);
      MK.core.loadDependencies([MK.core.path.plugins + "jquery.jplayer.js"], function () {
        var ogg_file, mp3_file, css_selector_ancestor = "#" + $this.siblings(".jp-audio").attr("id");
        ogg_file = $this.attr("data-ogg"), mp3_file = $this.attr("data-mp3"), $this.jPlayer({
          ready: function () {
            $this.jPlayer("setMedia", {
              mp3: mp3_file,
              ogg: ogg_file
            })
          },
          play: function () {
            $this.jPlayer("pauseOthers")
          },
          swfPath: void 0,
          supplied: "mp3, ogg",
          cssSelectorAncestor: css_selector_ancestor,
          wmode: "window"
        })
      })
    })
  }

  function mk_blog_carousel() {
    "use strict";
    $.exists(".mk-blog-showcase") && $(".mk-blog-showcase ul li").each(function () {
      $(this).on("hover", function () {
        $(this).siblings("li").removeClass("mk-blog-first-el").end().addClass("mk-blog-first-el")
      })
    })
  }

  function mk_contact_form() {
    "use strict";

    function validateForm(e, invalidClassName) {
      e.preventDefault();
      for (var form = e.target || e.srcElement, inputs = getFormInputs(form), isValidForm = !0, hasCaptchaField = !1, i = 0; i < inputs.length; i++) {
        var input = inputs[i];
        switch (input.value = String(input.value).trim(), input.type) {
          case "hidden":
            break;
          case "checkbox":
            isValidForm = validateCheckBox(input, invalidClassName) && isValidForm;
            break;
          case "email":
            isValidForm = validateEmail(input, invalidClassName) && isValidForm;
            break;
          case "textarea":
            isValidForm = validateText(input, invalidClassName) && isValidForm;
            break;
          case "text":
            "captcha" === input.dataset.type ? (isValidForm = validateText(input, invalidClassName) && isValidForm, hasCaptchaField = !0) : isValidForm = "email" === input.dataset.type ? validateEmail(input, invalidClassName) && isValidForm : validateText(input, invalidClassName) && isValidForm;
            break;
          default:
            console.warn("Implement validation for " + input.name + ":" + input.type)
        }
      }
      isValidForm && (hasCaptchaField ? validateCaptcha(form, invalidClassName, sendForm) : sendForm(form))
    }

    function validateCaptcha(form, invalidClassName, captchaIsValidCallback) {
      var input = form.querySelectorAll('[data-type="captcha"]')[0];
      if (0 === input.value.length) return addClass(input, invalidClassName), !1;
      window.get.captcha(input.value).done(function (data) {
        loadCaptcha(), input.value = "", "ok" !== data ? (addClass(input, invalidClassName), addClass(input, "contact-captcha-invalid"), removeClass(input, "contact-captcha-valid"), input.placeholder = mk_captcha_invalid_txt) : (removeClass(input, invalidClassName), removeClass(input, "contact-captcha-invalid"), addClass(input, "contact-captcha-valid"), input.placeholder = mk_captcha_correct_txt, captchaIsValidCallback(form))
      })
    }

    function sendForm(form) {
      var $form = $(form),
        data = getFormData(form);
      progressButton.loader($form), $.post(ajaxurl, data, function (response) {
        var res = JSON.parse(response);
        res.action_Status ? (progressButton.success($form), $form.find(".text-input").val(""), $form.find("textarea").val(""), $form.find("input[type=checkbox]").attr("checked", !1), $form.find(".contact-form-message").slideDown().addClass("state-success").html(res.message), setTimeout(function () {
          $form.find(".contact-form-message").slideUp()
        }, 5e3)) : (progressButton.error($form), $form.find(".contact-form-message").removeClass("state-success").html(res.message))
      })
    }

    function initializeCaptchas() {
      for (var captchaChangeImageButtons = document.getElementsByClassName("captcha-change-image"), i = 0; i < captchaChangeImageButtons.length; i++) captchaChangeImageButtons[i].addEventListener("click", loadCaptcha)
    }

    function loadCaptcha(e) {
      function appendImage(captchaImageURL) {
        0 === captchaImageHolder.find(".captcha-image").length ? captchaImageHolder.html('<img src="' + captchaImageURL + '" class="captcha-image" alt="captcha txt">') : captchaImageHolder.find(".captcha-image").attr("src", captchaImageURL + "?" + (new Date).getTime())
      }
      e && e.preventDefault(), $.post(ajaxurl, {
        action: "mk_create_captcha_image"
      }, appendImage)
    }

    function getFormInputs(form) {
      return form.querySelectorAll("input,textarea")
    }

    function getFormData(form) {
      for (var data = {
          action: "mk_contact_form"
        }, inputs = getFormInputs(form), i = 0; i < inputs.length; i++) data[inputs[i].name] = inputs[i].value;
      return data
    }
    var mkContactForms = document.getElementsByClassName("mk-contact-form");
    if (0 !== mkContactForms.length) {
      for (var captchaImageHolder = $(".captcha-image-holder"), i = 0; i < mkContactForms.length; i++) ! function (form, activeClassName, invalidClassName) {
        function setActiveClass() {
          addClass(this.parentNode, activeClassName)
        }

        function unsetActiveClass() {
          "" === this.value && removeClass(this.parentNode, activeClassName)
        }
        for (var inputs = getFormInputs(form), i = 0; i < inputs.length; i++) ! function (input) {
          input.addEventListener("focus", setActiveClass), input.addEventListener("blur", unsetActiveClass)
        }(inputs[i]);
        form.addEventListener("submit", function (e) {
          validateForm(e, invalidClassName)
        })
      }(mkContactForms[i], "is-active", "mk-invalid");
      captchaImageHolder.length > 0 && $(window).on("load", initializeCaptchas)
    }
  }

  function mk_login_form() {
    $("form.mk-login-form").each(function () {
      var $this = $(this);
      $this.on("submit", function (e) {
        $("p.mk-login-status", $this).show().text(ajax_login_object.loadingmessage), $.ajax({
          type: "POST",
          dataType: "json",
          url: ajax_login_object.ajaxurl,
          data: {
            action: "ajaxlogin",
            username: $("#username", $this).val(),
            password: $("#password", $this).val(),
            security: $("#security", $this).val()
          },
          success: function (data) {
            $("p.mk-login-status", $this).text(data.message), !0 === data.loggedin && (document.location.href = ajax_login_object.redirecturl)
          }
        }), e.preventDefault()
      })
    })
  }

  function mk_click_events() {
    "use strict";
    $(".mk-header-login, .mk-header-signup, .mk-side-dashboard, .mk-quick-contact-wrapper, .mk-dashboard-trigger, .blog-share-container, .news-share-buttons, .main-nav-side-search, #mk-fullscreen-search-wrapper, #fullscreen-navigation").on("click", function (event) {
      event.stopPropagation ? event.stopPropagation() : window.event && (window.event.cancelBubble = !0)
    }), $("html").on("click", function () {
      $(".mk-login-register, .mk-header-subscribe, #mk-quick-contact, .single-share-buttons, .single-share-box, .blog-social-share, .news-share-buttons, #mk-nav-search-wrapper").fadeOut(300), $(".mk-quick-contact-link").removeClass("quick-contact-active")
    }), $(".mk-fullscreen-search-overlay").on("click", function () {
      $(this).removeClass("mk-fullscreen-search-overlay-show")
    }), $(".mk-forget-password").on("click", function () {
      $(".mk-forget-panel").siblings().hide().end().show()
    }), $(".mk-create-account").on("click", function () {
      $("#mk-register-panel").siblings().hide().end().show()
    }), $(".mk-return-login").on("click", function () {
      $("#mk-login-panel").siblings().hide().end().show()
    }), $(".mk-quick-contact-link").on("click", function () {
      var $this = $(this),
        $quickContact = $("#mk-quick-contact");
      return $this.hasClass("quick-contact-active") ? ($quickContact.removeClass("quick-contact-anim").fadeOut(100), $this.removeClass("quick-contact-active")) : ($quickContact.addClass("quick-contact-anim").fadeIn(250), $this.addClass("quick-contact-active")), !1
    })
  }

  function mk_social_share_global() {
    "use strict";
    $(".twitter-share").on("click", function () {
      var $this = $(this),
        $url = $this.attr("data-url"),
        $title = $this.attr("data-title");
      return window.open("http://twitter.com/intent/tweet?text=" + $title + " " + $url, "twitterWindow", "height=380,width=660,resizable=0,toolbar=0,menubar=0,status=0,location=0,scrollbars=0"), !1
    }), $(".pinterest-share").on("click", function () {
      var $this = $(this),
        $url = $this.attr("data-url"),
        $title = $this.attr("data-title"),
        $image = $this.attr("data-image");
      return window.open("http://pinterest.com/pin/create/button/?url=" + $url + "&media=" + $image + "&description=" + $title, "twitterWindow", "height=320,width=660,resizable=0,toolbar=0,menubar=0,status=0,location=0,scrollbars=0"), !1
    }), $(".facebook-share").on("click", function () {
      var $url = $(this).attr("data-url");
      return window.open("https://www.facebook.com/sharer/sharer.php?u=" + $url, "facebookWindow", "height=380,width=660,resizable=0,toolbar=0,menubar=0,status=0,location=0,scrollbars=0"), !1
    }), $(".googleplus-share").on("click", function () {
      var $url = $(this).attr("data-url");
      return window.open("https://plus.google.com/share?url=" + $url, "googlePlusWindow", "height=380,width=660,resizable=0,toolbar=0,menubar=0,status=0,location=0,scrollbars=0"), !1
    }), $(".linkedin-share").on("click", function () {
      var $this = $(this),
        $url = $this.attr("data-url"),
        $title = $this.attr("data-title"),
        $desc = $this.attr("data-desc");
      return window.open("http://www.linkedin.com/shareArticle?mini=true&url=" + $url + "&title=" + $title + "&summary=" + $desc, "linkedInWindow", "height=380,width=660,resizable=0,toolbar=0,menubar=0,status=0,location=0,scrollbars=0"), !1
    })
  }

  function mk_event_countdown() {
    $.exists(".mk-event-countdown") && MK.core.loadDependencies([MK.core.path.plugins + "jquery.countdown.js"], function () {
      $(".mk-event-countdown").each(function () {
        if (!isTest) {
          var $this = $(this),
            $date = $this.attr("data-date"),
            $offset = $this.attr("data-offset");
          $this.downCount({
            date: $date,
            offset: $offset
          })
        }
      })
    })
  }

  function mk_flexslider_init() {
    var $lcd = $(".mk-lcd-slideshow"),
      $laptop = $(".mk-laptop-slideshow-shortcode");
    $lcd.length && $lcd.find(".mk-lcd-image").fadeIn(), $laptop.length && $laptop.find(".mk-laptop-image").fadeIn(), $(".js-flexslider").each(function () {
      ($(this).parents(".mk-tabs").length || $(this).parents(".mk-accordion").length) && $(this).removeData("flexslider");
      var $this = $(this),
        $selector = $this.attr("data-selector"),
        $animation = $this.attr("data-animation"),
        $easing = $this.attr("data-easing"),
        $direction = $this.attr("data-direction"),
        $smoothHeight = "true" == $this.attr("data-smoothHeight"),
        $slideshowSpeed = $this.attr("data-slideshowSpeed"),
        $animationSpeed = $this.attr("data-animationSpeed"),
        $controlNav = "true" == $this.attr("data-controlNav"),
        $directionNav = "true" == $this.attr("data-directionNav"),
        $pauseOnHover = "true" == $this.attr("data-pauseOnHover"),
        $isCarousel = "true" == $this.attr("data-isCarousel");
      if (void 0 !== $selector) var $selector_class = $selector;
      else var $selector_class = ".mk-flex-slides > li";
      if (!0 === $isCarousel) var $itemWidth = parseInt($this.attr("data-itemWidth")),
        $itemMargin = parseInt($this.attr("data-itemMargin")),
        $minItems = parseInt($this.attr("data-minItems")),
        $maxItems = parseInt($this.attr("data-maxItems")),
        $move = parseInt($this.attr("data-move"));
      else var $itemWidth = $itemMargin = $minItems = $maxItems = $move = 0;
      MK.core.loadDependencies([MK.core.path.plugins + "jquery.flexslider.js"], function () {
        $this.flexslider({
          selector: $selector_class,
          animation: $animation,
          easing: $easing,
          direction: $direction,
          smoothHeight: $smoothHeight,
          slideshow: !isTest,
          slideshowSpeed: $slideshowSpeed,
          animationSpeed: $animationSpeed,
          controlNav: $controlNav,
          directionNav: $directionNav,
          pauseOnHover: $pauseOnHover,
          prevText: "",
          nextText: "",
          itemWidth: $itemWidth,
          itemMargin: $itemMargin,
          minItems: $minItems,
          maxItems: $maxItems,
          move: $move
        })
      })
    })
  }

  function mk_header_searchform() {
    $(".mk-search-trigger").click(function () {
      setTimeout(function () {
        $("#mk-ajax-search-input").focus()
      }, 500)
    }), $(".mk-header-toolbar .mk-header-searchform .text-input").on("focus", function () {
      if ($(".mk-header-toolbar .mk-header-searchform .text-input").hasClass("on-close-state")) return $(".mk-header-toolbar .mk-header-searchform .text-input").removeClass("on-close-state").animate({
        width: "200px"
      }, 200), !1
    }), $(".mk-header-toolbar .mk-header-searchform").click(function (event) {
      event.stopPropagation ? event.stopPropagation() : window.event && (window.event.cancelBubble = !0)
    }), $("html").click(function () {
      $(this).find(".mk-header-toolbar .mk-header-searchform .text-input").addClass("on-close-state").animate({
        width: 90
      }, 300)
    }), "Edge" === MK.utils.browser.name && $("#mk-fullscreen-search-input").on("keydown", function (e) {
      13 == e.which && (e.preventDefault(), $("#mk-fullscreen-searchform").submit())
    })
  }

  function mk_hover_events() {
    "use strict";
    $(".shopping-cart-header").hover(function () {
      $(this).find(".mk-shopping-cart-box").stop(!0, !0).fadeIn(250)
    }, function () {
      $(this).find(".mk-shopping-cart-box").stop(!0, !0).fadeOut(250)
    }), $(".widget-sub-navigation > ul > li, .widget_nav_menu ul.menu > li, .widget_product_categories ul > .cat-item").each(function () {
      var $this = $(this),
        $subLevel = $this.find("ul").first();
      ($this.hasClass("page_item_has_children") || $this.hasClass("menu-item-has-children") || $this.hasClass("cat-parent")) && ($this.on("click", function () {
        $this.hasClass("toggle-active") ? ($subLevel.stop(!0, !0).slideUp(700), $this.removeClass("toggle-active")) : ($subLevel.stop(!0, !0).slideDown(700), $this.addClass("toggle-active"))
      }), $subLevel.on("click", function (e) {
        e.stopPropagation()
      }))
    });
    $(".mk-fullscreen-trigger").on("click", function (e) {
      $(".mk-fullscreen-search-overlay").addClass("mk-fullscreen-search-overlay-show"), setTimeout(function () {
        $("#mk-fullscreen-search-input").focus()
      }, 300), e.preventDefault()
    }), $(".mk-fullscreen-close").on("click", function (e) {
      $(".mk-fullscreen-search-overlay").removeClass("mk-fullscreen-search-overlay-show"), e.preventDefault()
    })
  }

  function mk_unfold_footer() {
    var $this = $("#mk-footer"),
      $spacer = $("#mk-footer-unfold-spacer"),
      $footerHeight = $this.outerHeight();
    window.matchMedia("(max-width: 767px)").matches ? $spacer.css("height", 0) : $this.hasClass("mk-footer-unfold") && $spacer.css("height", $footerHeight)
  }

  function mk_lightbox_init() {
    $(".mk-lightbox").fancybox({
      padding: 15,
      margin: 15,
      width: 800,
      height: 600,
      minWidth: 100,
      minHeight: 100,
      maxWidth: 9999,
      maxHeight: 9999,
      pixelRatio: 1,
      autoSize: !0,
      autoHeight: !1,
      autoWidth: !1,
      autoResize: !0,
      fitToView: !0,
      aspectRatio: !1,
      topRatio: .5,
      leftRatio: .5,
      scrolling: "auto",
      wrapCSS: "",
      arrows: !0,
      closeBtn: !0,
      closeClick: !1,
      nextClick: !1,
      mouseWheel: !0,
      autoPlay: !1,
      playSpeed: 3e3,
      preload: 3,
      modal: !1,
      loop: !0,
      openEffect: "fade",
      openSpeed: 200,
      openEasing: "swing",
      openOpacity: !0,
      openMethod: "zoomIn",
      closeEffect: "fade",
      closeSpeed: 200,
      closeEasing: "swing",
      closeOpacity: !0,
      closeMethod: "zoomOut",
      nextEffect: "none",
      nextSpeed: 350,
      nextEasing: "swing",
      nextMethod: "changeIn",
      prevEffect: "none",
      prevSpeed: 350,
      prevEasing: "swing",
      prevMethod: "changeOut",
      helpers: {
        media: {},
        overlay: {
          locked: !0
        }
      },
      tpl: {
        wrap: '<div class="fancybox-wrap" tabIndex="-1"><div class="fancybox-skin"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div></div>',
        image: '<img class="fancybox-image" src="{href}" alt="" />',
        error: '<p class="fancybox-error">The requested content cannot be loaded.<br/>Please try again later.</p>',
        closeBtn: '<a title="Close" class="fancybox-item fancybox-close" href="javascript:;"><i><svg class="mk-svg-icon" svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M390.628 345.372l-45.256 45.256-89.372-89.373-89.373 89.372-45.255-45.255 89.373-89.372-89.372-89.373 45.254-45.254 89.373 89.372 89.372-89.373 45.256 45.255-89.373 89.373 89.373 89.372z"/></svg></i></a>',
        next: '<a title="Next" class="fancybox-nav fancybox-next" href="javascript:;"><span><i><svg class="mk-svg-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M144 505.6c8 0 16-3.2 22.4-8l240-225.6c6.4-6.4 9.6-14.4 9.6-22.4s-3.2-16-9.6-22.4l-240-224c-12.8-12.8-32-12.8-44.8 0s-11.2 32 1.6 44.8l214.4 201.6-216 203.2c-12.8 11.2-12.8 32 0 44.8 6.4 4.8 14.4 8 22.4 8z"/></svg></i></span></a>',
        prev: '<a title="Previous" class="fancybox-nav fancybox-prev" href="javascript:;"><span><i><svg class="mk-svg-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M368 505.6c-8 0-16-3.2-22.4-8l-240-225.6c-6.4-6.4-9.6-14.4-9.6-24 0-8 3.2-16 9.6-22.4l240-224c12.8-11.2 33.6-11.2 44.8 1.6 12.8 12.8 11.2 32-1.6 44.8l-214.4 201.6 216 203.2c12.8 11.2 12.8 32 0 44.8-4.8 4.8-14.4 8-22.4 8z"/></svg></i></span></a>',
        loading: '<div id="fancybox-loading"><div></div></div>'
      },
      afterLoad: function () {
        $("html").addClass("fancybox-lock"), $(".fancybox-wrap").appendTo(".fancybox-overlay")
      },
      beforeShow: function () {
        this.locked = !0
      },
      afterClose: function () {
        var galleryParent = this.element.parents(".mk-gallery-item");
        galleryParent && galleryParent.removeClass("hover-state")
      }
    })
  }

  function mk_milestone() {
    "use strict";
    !isTest && $.exists(".mk-milestone") && $(".mk-milestone").each(function () {
      var $this = $(this),
        stop_number = $this.find(".milestone-number").attr("data-stop"),
        animation_speed = parseInt($this.find(".milestone-number").attr("data-speed")),
        build = function () {
          $this.hasClass("scroll-animated") || ($this.addClass("scroll-animated"), $({
            countNum: $this.find(".milestone-number").text()
          }).animate({
            countNum: stop_number
          }, {
            duration: animation_speed,
            easing: "linear",
            step: function () {
              $this.find(".milestone-number").text(Math.floor(this.countNum))
            },
            complete: function () {
              $this.find(".milestone-number").text(this.countNum)
            }
          }))
        };
      MK.utils.isMobile() ? build() : MK.utils.scrollSpy(this, {
        position: "bottom",
        after: build
      })
    })
  }

  function mk_portfolio_widget() {
    "use strict";
    $(".widget_recent_portfolio li").each(function () {
      $(this).find(".portfolio-widget-thumb").hover(function () {
        $(this).siblings(".portfolio-widget-info").animate({
          opacity: 1
        }, 200)
      }, function () {
        $(this).siblings(".portfolio-widget-info").animate({
          opacity: 0
        }, 200)
      })
    })
  }

  function mk_skill_meter() {
    "use strict";
    $.exists(".mk-skill-meter") && (MK.utils.isMobile() ? $(".mk-skill-meter .progress-outer").each(function () {
      var $this = $(this);
      $this.hasClass("scroll-animated") || ($this.addClass("scroll-animated"), $this.css({
        width: $(this).attr("data-width") + "%"
      }))
    }) : $(".mk-skill-meter .progress-outer").each(function () {
      var $this = $(this),
        build = function () {
          $this.hasClass("scroll-animated") || ($this.addClass("scroll-animated"), $this.animate({
            width: $this.attr("data-width") + "%"
          }, 2e3))
        };
      MK.utils.scrollSpy(this, {
        position: "bottom",
        after: build
      })
    }))
  }

  function addClass(tag, className) {
    tag.className += " " + className
  }

  function removeClass(tag, className) {
    tag.className = tag.className.replace(new RegExp(className, "g"), "")
  }

  function validateEmail(input, invalidClassName) {
    var value = input.value.trim();
    return (input.required || value.length > 0) && !/^([a-z0-9_\.\-\+]+)@([\da-z\.\-]+)\.([a-z\.]{2,63})$/i.test(value) ? (invalidClassName && addClass(input, invalidClassName), !1) : (invalidClassName && removeClass(input, invalidClassName), !0)
  }

  function validateText(input, invalidClassName) {
    var value = input.value.trim();
    return input.required && 0 === value.length ? (invalidClassName && addClass(input, invalidClassName), !1) : (invalidClassName && removeClass(input, invalidClassName), !0)
  }

  function validateCheckBox(input, invalidClassName) {
    return input.required && 0 == input.checked ? (invalidClassName && addClass(input, invalidClassName), !1) : (invalidClassName && removeClass(input, invalidClassName), !0)
  }

  function product_loop_add_cart() {
    var $body = $("body");
    $body.on("click", ".add_to_cart_button", function () {
      var $holder = $(this).parents(".product:eq(0)"),
        $i = $holder.find(".product-loading-icon");
      $holder.addClass("adding-to-cart").removeClass("added-to-cart"), $i.html('<svg class="mk-svg-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M437.011 74.99c-46.326-46.328-110.318-74.99-181.011-74.99-109.744 0-203.345 69.064-239.749 166.094l59.938 22.477c27.302-72.773 97.503-124.571 179.811-124.571 53.02 0 101.01 21.5 135.753 56.247l-71.753 71.753h192v-192l-74.989 74.99zm-181.011 373.01c-53.02 0-101.013-21.496-135.756-56.244l71.756-71.756h-192v192l74.997-74.997c46.323 46.331 110.309 74.997 181.003 74.997 109.745 0 203.346-69.064 239.75-166.094l-59.938-22.477c-27.302 72.773-97.503 124.571-179.812 124.571z"/></svg>')
    }), $body.bind("added_to_cart", function () {
      var $holder = $(".adding-to-cart"),
        $i = $holder.find(".product-loading-icon");
      $holder.removeClass("adding-to-cart").addClass("added-to-cart"), $i.html('<svg class="mk-svg-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M432 64l-240 240-112-112-80 80 192 192 320-320z"/></svg>')
    })
  }
  var MK = {
    api: {},
    ui: {},
    component: {}
  };
  window.MK = MK,
    function (window, document) {
      function addStyleSheet(ownerDocument, cssText) {
        var p = ownerDocument.createElement("p"),
          parent = ownerDocument.getElementsByTagName("head")[0] || ownerDocument.documentElement;
        return p.innerHTML = "x<style>" + cssText + "</style>", parent.insertBefore(p.lastChild, parent.firstChild)
      }

      function getElements() {
        var elements = html5.elements;
        return "string" == typeof elements ? elements.split(" ") : elements
      }

      function addElements(newElements, ownerDocument) {
        var elements = html5.elements;
        "string" != typeof elements && (elements = elements.join(" ")), "string" != typeof newElements && (newElements = newElements.join(" ")), html5.elements = elements + " " + newElements, shivDocument(ownerDocument)
      }

      function getExpandoData(ownerDocument) {
        var data = expandoData[ownerDocument[expando]];
        return data || (data = {}, expanID++, ownerDocument[expando] = expanID, expandoData[expanID] = data), data
      }

      function createElement(nodeName, ownerDocument, data) {
        if (ownerDocument || (ownerDocument = document), supportsUnknownElements) return ownerDocument.createElement(nodeName);
        data || (data = getExpandoData(ownerDocument));
        var node;
        return node = data.cache[nodeName] ? data.cache[nodeName].cloneNode() : saveClones.test(nodeName) ? (data.cache[nodeName] = data.createElem(nodeName)).cloneNode() : data.createElem(nodeName), !node.canHaveChildren || reSkip.test(nodeName) || node.tagUrn ? node : data.frag.appendChild(node)
      }

      function createDocumentFragment(ownerDocument, data) {
        if (ownerDocument || (ownerDocument = document), supportsUnknownElements) return ownerDocument.createDocumentFragment();
        data = data || getExpandoData(ownerDocument);
        for (var clone = data.frag.cloneNode(), i = 0, elems = getElements(), l = elems.length; i < l; i++) clone.createElement(elems[i]);
        return clone
      }

      function shivMethods(ownerDocument, data) {
        data.cache || (data.cache = {}, data.createElem = ownerDocument.createElement, data.createFrag = ownerDocument.createDocumentFragment, data.frag = data.createFrag()), ownerDocument.createElement = function (nodeName) {
          return html5.shivMethods ? createElement(nodeName, ownerDocument, data) : data.createElem(nodeName)
        }, ownerDocument.createDocumentFragment = Function("h,f", "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + getElements().join().replace(/[\w\-:]+/g, function (nodeName) {
          return data.createElem(nodeName), data.frag.createElement(nodeName), 'c("' + nodeName + '")'
        }) + ");return n}")(html5, data.frag)
      }

      function shivDocument(ownerDocument) {
        ownerDocument || (ownerDocument = document);
        var data = getExpandoData(ownerDocument);
        return !html5.shivCSS || supportsHtml5Styles || data.hasCSS || (data.hasCSS = !!addStyleSheet(ownerDocument, "article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")), supportsUnknownElements || shivMethods(ownerDocument, data), ownerDocument
      }
      var supportsHtml5Styles, supportsUnknownElements, options = window.html5 || {},
        reSkip = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,
        saveClones = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,
        expando = "_html5shiv",
        expanID = 0,
        expandoData = {};
      ! function () {
        try {
          var a = document.createElement("a");
          a.innerHTML = "<xyz></xyz>", supportsHtml5Styles = "hidden" in a, supportsUnknownElements = 1 == a.childNodes.length || function () {
            document.createElement("a");
            var frag = document.createDocumentFragment();
            return void 0 === frag.cloneNode || void 0 === frag.createDocumentFragment || void 0 === frag.createElement
          }()
        } catch (e) {
          supportsHtml5Styles = !0, supportsUnknownElements = !0
        }
      }();
      var html5 = {
        elements: options.elements || "abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output picture progress section summary template time video",
        version: "3.7.3",
        shivCSS: !1 !== options.shivCSS,
        supportsUnknownElements: supportsUnknownElements,
        shivMethods: !1 !== options.shivMethods,
        type: "default",
        shivDocument: shivDocument,
        createElement: createElement,
        createDocumentFragment: createDocumentFragment,
        addElements: addElements
      };
      window.html5 = html5, shivDocument(document), "object" == typeof module && module.exports && (module.exports = html5)
    }("undefined" != typeof window ? window : this, document), window.matchMedia || (window.matchMedia = function () {
      "use strict";
      var styleMedia = window.styleMedia || window.media;
      if (!styleMedia) {
        var style = document.createElement("style"),
          script = document.getElementsByTagName("script")[0],
          info = null;
        style.type = "text/css", style.id = "matchmediajs-test", script.parentNode.insertBefore(style, script), info = "getComputedStyle" in window && window.getComputedStyle(style, null) || style.currentStyle, styleMedia = {
          matchMedium: function (media) {
            var text = "@media " + media + "{ #matchmediajs-test { width: 1px; } }";
            return style.styleSheet ? style.styleSheet.cssText = text : style.textContent = text, "1px" === info.width
          }
        }
      }
      return function (media) {
        return {
          matches: styleMedia.matchMedium(media || "all"),
          media: media || "all"
        }
      }
    }()),
    function (global) {
      "use strict";

      function noop() {}

      function safeActiveElement() {
        try {
          return document.activeElement
        } catch (err) {}
      }

      function inArray(arr, item) {
        for (var i = 0, len = arr.length; i < len; i++)
          if (arr[i] === item) return !0;
        return !1
      }

      function addEventListener(elem, event, fn) {
        return elem.addEventListener ? elem.addEventListener(event, fn, !1) : elem.attachEvent ? elem.attachEvent("on" + event, fn) : void 0
      }

      function moveCaret(elem, index) {
        var range;
        elem.createTextRange ? (range = elem.createTextRange(), range.move("character", index), range.select()) : elem.selectionStart && (elem.focus(), elem.setSelectionRange(index, index))
      }

      function changeType(elem, type) {
        try {
          return elem.type = type, !0
        } catch (e) {
          return !1
        }
      }

      function handleElem(node, callback) {
        if (node && node.getAttribute(ATTR_CURRENT_VAL)) callback(node);
        else
          for (var elem, handleInputs = node ? node.getElementsByTagName("input") : inputs, handleTextareas = node ? node.getElementsByTagName("textarea") : textareas, handleInputsLength = handleInputs ? handleInputs.length : 0, handleTextareasLength = handleTextareas ? handleTextareas.length : 0, len = handleInputsLength + handleTextareasLength, i = 0; i < len; i++) elem = i < handleInputsLength ? handleInputs[i] : handleTextareas[i - handleInputsLength], callback(elem)
      }

      function disablePlaceholders(node) {
        handleElem(node, hidePlaceholder)
      }

      function enablePlaceholders(node) {
        handleElem(node, showPlaceholder)
      }

      function hidePlaceholder(elem, keydownValue) {
        var valueChanged = !!keydownValue && elem.value !== keydownValue,
          isPlaceholderValue = elem.value === elem.getAttribute(ATTR_CURRENT_VAL);
        if ((valueChanged || isPlaceholderValue) && "true" === elem.getAttribute(ATTR_ACTIVE)) {
          elem.removeAttribute(ATTR_ACTIVE), elem.value = elem.value.replace(elem.getAttribute(ATTR_CURRENT_VAL), ""), elem.className = elem.className.replace(classNameRegExp, "");
          var maxLength = elem.getAttribute(ATTR_MAXLENGTH);
          parseInt(maxLength, 10) >= 0 && (elem.setAttribute("maxLength", maxLength), elem.removeAttribute(ATTR_MAXLENGTH));
          var type = elem.getAttribute(ATTR_INPUT_TYPE);
          return type && (elem.type = type), !0
        }
        return !1
      }

      function showPlaceholder(elem) {
        var val = elem.getAttribute(ATTR_CURRENT_VAL);
        if ("" === elem.value && val) {
          elem.setAttribute(ATTR_ACTIVE, "true"), elem.value = val, elem.className += " " + placeholderClassName;
          elem.getAttribute(ATTR_MAXLENGTH) || (elem.setAttribute(ATTR_MAXLENGTH, elem.maxLength), elem.removeAttribute("maxLength"));
          return elem.getAttribute(ATTR_INPUT_TYPE) ? elem.type = "text" : "password" === elem.type && changeType(elem, "text") && elem.setAttribute(ATTR_INPUT_TYPE, "password"), !0
        }
        return !1
      }

      function makeFocusHandler(elem) {
        return function () {
          hideOnInput && elem.value === elem.getAttribute(ATTR_CURRENT_VAL) && "true" === elem.getAttribute(ATTR_ACTIVE) ? moveCaret(elem, 0) : hidePlaceholder(elem)
        }
      }

      function makeBlurHandler(elem) {
        return function () {
          showPlaceholder(elem)
        }
      }

      function makeSubmitHandler(form) {
        return function () {
          disablePlaceholders(form)
        }
      }

      function makeKeydownHandler(elem) {
        return function (e) {
          if (keydownVal = elem.value, "true" === elem.getAttribute(ATTR_ACTIVE) && keydownVal === elem.getAttribute(ATTR_CURRENT_VAL) && inArray(badKeys, e.keyCode)) return e.preventDefault && e.preventDefault(), !1
        }
      }

      function makeKeyupHandler(elem) {
        return function () {
          hidePlaceholder(elem, keydownVal), "" === elem.value && (elem.blur(), moveCaret(elem, 0))
        }
      }

      function makeClickHandler(elem) {
        return function () {
          elem === safeActiveElement() && elem.value === elem.getAttribute(ATTR_CURRENT_VAL) && "true" === elem.getAttribute(ATTR_ACTIVE) && moveCaret(elem, 0)
        }
      }

      function newElement(elem) {
        var form = elem.form;
        form && "string" == typeof form && (form = document.getElementById(form), form.getAttribute(ATTR_FORM_HANDLED) || (addEventListener(form, "submit", makeSubmitHandler(form)), form.setAttribute(ATTR_FORM_HANDLED, "true"))), addEventListener(elem, "focus", makeFocusHandler(elem)), addEventListener(elem, "blur", makeBlurHandler(elem)), hideOnInput && (addEventListener(elem, "keydown", makeKeydownHandler(elem)), addEventListener(elem, "keyup", makeKeyupHandler(elem)), addEventListener(elem, "click", makeClickHandler(elem))), elem.setAttribute(ATTR_EVENTS_BOUND, "true"), elem.setAttribute(ATTR_CURRENT_VAL, placeholder), (hideOnInput || elem !== safeActiveElement()) && showPlaceholder(elem)
      }
      var test = document.createElement("input"),
        nativeSupport = void 0 !== test.placeholder;
      if (global.Placeholders = {
          nativeSupport: nativeSupport,
          disable: nativeSupport ? noop : disablePlaceholders,
          enable: nativeSupport ? noop : enablePlaceholders
        }, !nativeSupport) {
        var keydownVal, validTypes = ["text", "search", "url", "tel", "email", "password", "number", "textarea"],
          badKeys = [27, 33, 34, 35, 36, 37, 38, 39, 40, 8, 46],
          placeholderClassName = "placeholdersjs",
          classNameRegExp = new RegExp("(?:^|\\s)" + placeholderClassName + "(?!\\S)"),
          ATTR_CURRENT_VAL = "data-placeholder-value",
          ATTR_ACTIVE = "data-placeholder-active",
          ATTR_INPUT_TYPE = "data-placeholder-type",
          ATTR_FORM_HANDLED = "data-placeholder-submit",
          ATTR_EVENTS_BOUND = "data-placeholder-bound",
          ATTR_MAXLENGTH = "data-placeholder-maxlength",
          head = document.getElementsByTagName("head")[0],
          root = document.documentElement,
          Placeholders = global.Placeholders,
          inputs = document.getElementsByTagName("input"),
          textareas = document.getElementsByTagName("textarea"),
          hideOnInput = "false" === root.getAttribute("data-placeholder-focus"),
          liveUpdates = "false" !== root.getAttribute("data-placeholder-live"),
          styleElem = document.createElement("style");
        styleElem.type = "text/css";
        var styleRules = document.createTextNode("." + placeholderClassName + " {color:#ccc;}");
        styleElem.styleSheet ? styleElem.styleSheet.cssText = styleRules.nodeValue : styleElem.appendChild(styleRules), head.insertBefore(styleElem, head.firstChild);
        for (var placeholder, elem, i = 0, len = inputs.length + textareas.length; i < len; i++) elem = i < inputs.length ? inputs[i] : textareas[i - inputs.length], (placeholder = elem.attributes.placeholder) && (placeholder = placeholder.nodeValue) && inArray(validTypes, elem.type) && newElement(elem);
        var timer = setInterval(function () {
          for (var i = 0, len = inputs.length + textareas.length; i < len; i++) elem = i < inputs.length ? inputs[i] : textareas[i - inputs.length], placeholder = elem.attributes.placeholder, placeholder ? (placeholder = placeholder.nodeValue) && inArray(validTypes, elem.type) && (elem.getAttribute(ATTR_EVENTS_BOUND) || newElement(elem), (placeholder !== elem.getAttribute(ATTR_CURRENT_VAL) || "password" === elem.type && !elem.getAttribute(ATTR_INPUT_TYPE)) && ("password" === elem.type && !elem.getAttribute(ATTR_INPUT_TYPE) && changeType(elem, "text") && elem.setAttribute(ATTR_INPUT_TYPE, "password"), elem.value === elem.getAttribute(ATTR_CURRENT_VAL) && (elem.value = placeholder), elem.setAttribute(ATTR_CURRENT_VAL, placeholder))) : elem.getAttribute(ATTR_ACTIVE) && (hidePlaceholder(elem), elem.removeAttribute(ATTR_CURRENT_VAL));
          liveUpdates || clearInterval(timer)
        }, 100);
        addEventListener(global, "beforeunload", function () {
          Placeholders.disable()
        })
      }
    }(this),
    function () {
      var lastTime, vendors, x;
      for (lastTime = 0, vendors = ["webkit", "moz"], x = 0; x < vendors.length && !window.requestAnimationFrame;) window.requestAnimationFrame = window[vendors[x] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[vendors[x] + "CancelAnimationFrame"] || window[vendors[x] + "CancelRequestAnimationFrame"], ++x;
      window.requestAnimationFrame || (window.requestAnimationFrame = function (callback, element) {
        var currTime, id, timeToCall;
        return currTime = (new Date).getTime(), timeToCall = Math.max(0, 16 - (currTime - lastTime)), id = window.setTimeout(function () {
          callback(currTime + timeToCall)
        }, timeToCall), lastTime = currTime + timeToCall, id
      }), window.cancelAnimationFrame || (window.cancelAnimationFrame = function (id) {
        clearTimeout(id)
      })
    }(), console.log(23423),
    function (root, factory) {
      "function" == typeof define && define.amd ? define(factory) : "object" == typeof exports ? module.exports = factory() : root.ResizeSensor = factory()
    }("undefined" != typeof window ? window : this, function () {
      function forEachElement(elements, callback) {
        var elementsType = Object.prototype.toString.call(elements),
          isCollectionTyped = "[object Array]" === elementsType || "[object NodeList]" === elementsType || "[object HTMLCollection]" === elementsType || "[object Object]" === elementsType || "undefined" != typeof jQuery && elements instanceof jQuery || "undefined" != typeof Elements && elements instanceof Elements,
          i = 0,
          j = elements.length;
        if (isCollectionTyped)
          for (; i < j; i++) callback(elements[i]);
        else callback(elements)
      }

      function getElementSize(element) {
        if (!element.getBoundingClientRect) return {
          width: element.offsetWidth,
          height: element.offsetHeight
        };
        var rect = element.getBoundingClientRect();
        return {
          width: Math.round(rect.width),
          height: Math.round(rect.height)
        }
      }
      if ("undefined" == typeof window) return null;
      var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || function (fn) {
          return window.setTimeout(fn, 20)
        },
        ResizeSensor = function (element, callback) {
          function EventQueue() {
            var q = [];
            this.add = function (ev) {
              q.push(ev)
            };
            var i, j;
            this.call = function () {
              for (i = 0, j = q.length; i < j; i++) q[i].call()
            }, this.remove = function (ev) {
              var newQueue = [];
              for (i = 0, j = q.length; i < j; i++) q[i] !== ev && newQueue.push(q[i]);
              q = newQueue
            }, this.length = function () {
              return q.length
            }
          }

          function attachResizeEvent(element, resized) {
            if (element) {
              if (element.resizedAttached) return void element.resizedAttached.add(resized);
              element.resizedAttached = new EventQueue, element.resizedAttached.add(resized), element.resizeSensor = document.createElement("div"), element.resizeSensor.dir = "ltr", element.resizeSensor.className = "resize-sensor";
              var style = "position: absolute; left: -10px; top: -10px; right: 0; bottom: 0; overflow: hidden; z-index: -1; visibility: hidden;",
                styleChild = "position: absolute; left: 0; top: 0; transition: 0s;";
              element.resizeSensor.style.cssText = style, element.resizeSensor.innerHTML = '<div class="resize-sensor-expand" style="' + style + '"><div style="' + styleChild + '"></div></div><div class="resize-sensor-shrink" style="' + style + '"><div style="' + styleChild + ' width: 200%; height: 200%"></div></div>', element.appendChild(element.resizeSensor);
              var position = window.getComputedStyle(element).getPropertyPriority("position");
              "absolute" !== position && "relative" !== position && "fixed" !== position && (element.style.position = "relative");
              var dirty, rafId, expand = element.resizeSensor.childNodes[0],
                expandChild = expand.childNodes[0],
                shrink = element.resizeSensor.childNodes[1],
                size = getElementSize(element),
                lastWidth = size.width,
                lastHeight = size.height,
                reset = function () {
                  var invisible = 0 === element.offsetWidth && 0 === element.offsetHeight;
                  if (invisible) {
                    var saveDisplay = element.style.display;
                    element.style.display = "block"
                  }
                  expandChild.style.width = "100000px", expandChild.style.height = "100000px", expand.scrollLeft = 1e5, expand.scrollTop = 1e5, shrink.scrollLeft = 1e5, shrink.scrollTop = 1e5, invisible && (element.style.display = saveDisplay)
                };
              element.resizeSensor.resetSensor = reset;
              var onResized = function () {
                  rafId = 0, dirty && (lastWidth = void 0, lastHeight = void 0, element.resizedAttached && element.resizedAttached.call())
                },
                onScroll = function () {
                  var size = getElementSize(element),
                    newWidth = size.width,
                    newHeight = size.height;
                  dirty = newWidth != lastWidth || newHeight != lastHeight, dirty && !rafId && (rafId = requestAnimationFrame(onResized)), reset()
                },
                addEvent = function (el, name, cb) {
                  el.attachEvent ? el.attachEvent("on" + name, cb) : el.addEventListener(name, cb)
                };
              addEvent(expand, "scroll", onScroll), addEvent(shrink, "scroll", onScroll), requestAnimationFrame(reset)
            }
          }
          forEachElement(element, function (elem) {
            attachResizeEvent(elem, callback)
          }), this.detach = function (ev) {
            ResizeSensor.detach(element, ev)
          }, this.reset = function () {
            element.resizeSensor.resetSensor()
          }
        };
      return ResizeSensor.reset = function (element, ev) {
        forEachElement(element, function (elem) {
          elem.resizeSensor.resetSensor()
        })
      }, ResizeSensor.detach = function (element, ev) {
        forEachElement(element, function (elem) {
          elem && (elem.resizedAttached && "function" == typeof ev && (elem.resizedAttached.remove(ev), elem.resizedAttached.length()) || elem.resizeSensor && (elem.contains(elem.resizeSensor) && elem.removeChild(elem.resizeSensor), delete elem.resizeSensor, delete elem.resizedAttached))
        })
      }, ResizeSensor
    }),
    function (root, factory) {
      "function" == typeof define && define.amd ? define(["./ResizeSensor.js"], factory) : "object" == typeof exports ? module.exports = factory(require("./ResizeSensor.js")) : (root.ElementQueries = factory(root.ResizeSensor), root.ElementQueries.listen())
    }("undefined" != typeof window ? window : this, function (ResizeSensor) {
      var ElementQueries = function () {
        function getEmSize(element) {
          element || (element = document.documentElement);
          var fontSize = window.getComputedStyle(element, null).fontSize;
          return parseFloat(fontSize) || 16
        }

        function getElementSize(element) {
          if (!element.getBoundingClientRect) return {
            width: element.offsetWidth,
            height: element.offsetHeight
          };
          var rect = element.getBoundingClientRect();
          return {
            width: Math.round(rect.width),
            height: Math.round(rect.height)
          }
        }

        function convertToPx(element, value) {
          var numbers = value.split(/\d/),
            units = numbers[numbers.length - 1];
          switch (value = parseFloat(value), units) {
            case "px":
              return value;
            case "em":
              return value * getEmSize(element);
            case "rem":
              return value * getEmSize();
            case "vw":
              return value * document.documentElement.clientWidth / 100;
            case "vh":
              return value * document.documentElement.clientHeight / 100;
            case "vmin":
            case "vmax":
              var vw = document.documentElement.clientWidth / 100,
                vh = document.documentElement.clientHeight / 100;
              return value * (0, Math["vmin" === units ? "min" : "max"])(vw, vh);
            default:
              return value
          }
        }

        function SetupInformation(element, id) {
          this.element = element;
          var key, option, elementSize, value, actualValue, attrValues, attrValue, attrName, attributes = ["min-width", "min-height", "max-width", "max-height"];
          this.call = function () {
            elementSize = getElementSize(this.element), attrValues = {};
            for (key in allQueries[id]) allQueries[id].hasOwnProperty(key) && (option = allQueries[id][key], value = convertToPx(this.element, option.value), actualValue = "width" === option.property ? elementSize.width : elementSize.height, attrName = option.mode + "-" + option.property, attrValue = "", "min" === option.mode && actualValue >= value && (attrValue += option.value), "max" === option.mode && actualValue <= value && (attrValue += option.value), attrValues[attrName] || (attrValues[attrName] = ""), attrValue && -1 === (" " + attrValues[attrName] + " ").indexOf(" " + attrValue + " ") && (attrValues[attrName] += " " + attrValue));
            for (var k in attributes) attributes.hasOwnProperty(k) && (attrValues[attributes[k]] ? this.element.setAttribute(attributes[k], attrValues[attributes[k]].substr(1)) : this.element.removeAttribute(attributes[k]))
          }
        }

        function setupElement(element, id) {
          element.elementQueriesSetupInformation || (element.elementQueriesSetupInformation = new SetupInformation(element, id)), element.elementQueriesSensor || (element.elementQueriesSensor = new ResizeSensor(element, function () {
            element.elementQueriesSetupInformation.call()
          })), element.elementQueriesSetupInformation.call()
        }

        function queueQuery(selector, mode, property, value) {
          if (void 0 === allQueries[selector]) {
            allQueries[selector] = [];
            var id = idToSelectorMapping.length;
            cssStyleElement.innerHTML += "\n" + selector + " {animation: 0.1s element-queries;}", cssStyleElement.innerHTML += "\n" + selector + " > .resize-sensor {min-width: " + id + "px;}", idToSelectorMapping.push(selector)
          }
          allQueries[selector].push({
            mode: mode,
            property: property,
            value: value
          })
        }

        function getQuery(container) {
          var query;
          if (document.querySelectorAll && (query = container ? container.querySelectorAll.bind(container) : document.querySelectorAll.bind(document)), query || "undefined" == typeof $$ || (query = $$), query || "undefined" == typeof jQuery || (query = jQuery), !query) throw "No document.querySelectorAll, jQuery or Mootools's $$ found.";
          return query
        }

        function findElementQueriesElements(container) {
          var query = getQuery(container);
          for (var selector in allQueries)
            if (allQueries.hasOwnProperty(mode))
              for (var elements = query(selector, container), i = 0, j = elements.length; i < j; i++) setupElement(elements[i], selector)
        }

        function attachResponsiveImage(element) {
          function check() {
            var i, imageToDisplay = !1;
            for (i in children) children.hasOwnProperty(i) && rules[i].minWidth && element.offsetWidth > rules[i].minWidth && (imageToDisplay = i);
            if (imageToDisplay || (imageToDisplay = defaultImageId), lastActiveImage !== imageToDisplay)
              if (loadedImages[imageToDisplay]) children[lastActiveImage].style.display = "none", children[imageToDisplay].style.display = "block", lastActiveImage = imageToDisplay;
              else {
                var image = new Image;
                image.onload = function () {
                  children[imageToDisplay].src = sources[imageToDisplay], children[lastActiveImage].style.display = "none", children[imageToDisplay].style.display = "block", loadedImages[imageToDisplay] = !0, lastActiveImage = imageToDisplay
                }, image.src = sources[imageToDisplay]
              }
            else children[imageToDisplay].src = sources[imageToDisplay]
          }
          var children = [],
            rules = [],
            sources = [],
            defaultImageId = 0,
            lastActiveImage = -1,
            loadedImages = [];
          for (var i in element.children)
            if (element.children.hasOwnProperty(i) && element.children[i].tagName && "img" === element.children[i].tagName.toLowerCase()) {
              children.push(element.children[i]);
              var minWidth = element.children[i].getAttribute("min-width") || element.children[i].getAttribute("data-min-width"),
                src = element.children[i].getAttribute("data-src") || element.children[i].getAttribute("url");
              sources.push(src);
              var rule = {
                minWidth: minWidth
              };
              rules.push(rule), minWidth ? element.children[i].style.display = "none" : (defaultImageId = children.length - 1, element.children[i].style.display = "block")
            }
          lastActiveImage = defaultImageId, element.resizeSensor = new ResizeSensor(element, check), check()
        }

        function findResponsiveImages() {
          for (var query = getQuery(), elements = query("[data-responsive-image],[responsive-image]"), i = 0, j = elements.length; i < j; i++) attachResponsiveImage(elements[i])
        }

        function extractQuery(css) {
          var match, smatch, attrs, attrMatch;
          for (css = css.replace(/'/g, '"'); null !== (match = regex.exec(css));)
            for (smatch = match[1] + match[3], attrs = match[2]; null !== (attrMatch = attrRegex.exec(attrs));) queueQuery(smatch, attrMatch[1], attrMatch[2], attrMatch[3])
        }

        function readRules(rules) {
          var selector = "";
          if (rules)
            if ("string" == typeof rules) rules = rules.toLowerCase(), -1 === rules.indexOf("min-width") && -1 === rules.indexOf("max-width") || extractQuery(rules);
            else
              for (var i = 0, j = rules.length; i < j; i++) 1 === rules[i].type ? (selector = rules[i].selectorText || rules[i].cssText, -1 !== selector.indexOf("min-height") || -1 !== selector.indexOf("max-height") ? extractQuery(selector) : -1 === selector.indexOf("min-width") && -1 === selector.indexOf("max-width") || extractQuery(selector)) : 4 === rules[i].type ? readRules(rules[i].cssRules || rules[i].rules) : 3 === rules[i].type && readRules(rules[i].styleSheet.cssRules)
        }
        var cssStyleElement, allQueries = {},
          idToSelectorMapping = [],
          regex = /,?[\s\t]*([^,\n]*?)((?:\[[\s\t]*?(?:min|max)-(?:width|height)[\s\t]*?[~$\^]?=[\s\t]*?"[^"]*?"[\s\t]*?])+)([^,\n\s\{]*)/gim,
          attrRegex = /\[[\s\t]*?(min|max)-(width|height)[\s\t]*?[~$\^]?=[\s\t]*?"([^"]*?)"[\s\t]*?]/gim,
          defaultCssInjected = !1;
        this.init = function () {
          var animationStart = "animationstart";
          void 0 !== document.documentElement.style.webkitAnimationName ? animationStart = "webkitAnimationStart" : void 0 !== document.documentElement.style.MozAnimationName ? animationStart = "mozanimationstart" : void 0 !== document.documentElement.style.OAnimationName && (animationStart = "oanimationstart"), document.body.addEventListener(animationStart, function (e) {
            var element = e.target;
            if (-1 !== window.getComputedStyle(element, null).getPropertyValue("animation-name").indexOf("element-queries")) {
              element.elementQueriesSensor = new ResizeSensor(element, function () {
                element.elementQueriesSetupInformation && element.elementQueriesSetupInformation.call()
              });
              var sensorStyles = window.getComputedStyle(element.resizeSensor, null),
                id = sensorStyles.getPropertyValue("min-width");
              id = parseInt(id.replace("px", "")), setupElement(e.target, idToSelectorMapping[id])
            }
          }), defaultCssInjected || (cssStyleElement = document.createElement("style"), cssStyleElement.type = "text/css", cssStyleElement.innerHTML = "[responsive-image] > img, [data-responsive-image] {overflow: hidden; padding: 0; } [responsive-image] > img, [data-responsive-image] > img {width: 100%;}", cssStyleElement.innerHTML += "\n@keyframes element-queries { 0% { visibility: inherit; } }", document.getElementsByTagName("head")[0].appendChild(cssStyleElement), defaultCssInjected = !0);
          for (var i = 0, j = document.styleSheets.length; i < j; i++) try {
            document.styleSheets[i].href && 0 === document.styleSheets[i].href.indexOf("file://") && console.log("CssElementQueries: unable to parse local css files, " + document.styleSheets[i].href), readRules(document.styleSheets[i].cssRules || document.styleSheets[i].rules || document.styleSheets[i].cssText)
          } catch (e) {}
          findResponsiveImages()
        }, this.findElementQueriesElements = function (container) {
          findElementQueriesElements(container)
        }, this.update = function () {
          this.init()
        }
      };
      ElementQueries.update = function () {
        ElementQueries.instance.update()
      }, ElementQueries.detach = function (element) {
        element.elementQueriesSetupInformation ? (element.elementQueriesSensor.detach(), delete element.elementQueriesSetupInformation, delete element.elementQueriesSensor) : element.resizeSensor && (element.resizeSensor.detach(), delete element.resizeSensor)
      }, ElementQueries.init = function () {
        ElementQueries.instance || (ElementQueries.instance = new ElementQueries), ElementQueries.instance.init()
      };
      var domLoaded = function (callback) {
        if (document.addEventListener) document.addEventListener("DOMContentLoaded", callback, !1);
        else if (/KHTML|WebKit|iCab/i.test(navigator.userAgent)) var DOMLoadTimer = setInterval(function () {
          /loaded|complete/i.test(document.readyState) && (callback(), clearInterval(DOMLoadTimer))
        }, 10);
        else window.onload = callback
      };
      return ElementQueries.findElementQueriesElements = function (container) {
        ElementQueries.instance.findElementQueriesElements(container)
      }, ElementQueries.listen = function () {
        domLoaded(ElementQueries.init)
      }, ElementQueries
    }),
    function ($) {
      "use strict";
      $.exists = function (selector) {
        return $(selector).length > 0
      }, $.getCachedScript = function (url) {
        var options = {
          dataType: "script",
          cache: !0,
          url: url
        };
        return $.ajax(options)
      }, $.fn.mk_imagesLoaded = function () {
        var $imgs = this.find('img[src!=""]');
        if (!$imgs.length) return $.Deferred().resolve().promise();
        var dfds = [];
        return $imgs.each(function () {
          var dfd = $.Deferred();
          dfds.push(dfd);
          var img = new Image;
          img.onload = function () {
            dfd.resolve()
          }, img.onerror = function () {
            dfd.resolve()
          }, img.src = this.src
        }), $.when.apply($, dfds)
      }
    }(jQuery),
    function () {
      function resetTriggers(element) {
        var triggers = element.__resizeTriggers__,
          expand = triggers.firstElementChild,
          contract = triggers.lastElementChild,
          expandChild = expand.firstElementChild;
        contract.scrollLeft = contract.scrollWidth, contract.scrollTop = contract.scrollHeight, expandChild.style.width = expand.offsetWidth + 1 + "px", expandChild.style.height = expand.offsetHeight + 1 + "px", expand.scrollLeft = expand.scrollWidth, expand.scrollTop = expand.scrollHeight
      }

      function checkTriggers(element) {
        return element.offsetWidth != element.__resizeLast__.width || element.offsetHeight != element.__resizeLast__.height
      }

      function scrollListener(e) {
        var element = this;
        resetTriggers(this), this.__resizeRAF__ && cancelFrame(this.__resizeRAF__), this.__resizeRAF__ = requestFrame(function () {
          checkTriggers(element) && (element.__resizeLast__.width = element.offsetWidth, element.__resizeLast__.height = element.offsetHeight, element.__resizeListeners__.forEach(function (fn) {
            fn.call(element, e)
          }))
        })
      }

      function createStyles() {
        if (!stylesCreated) {
          var css = (animationKeyframes || "") + ".resize-triggers { " + (animationStyle || "") + 'visibility: hidden; opacity: 0; } .resize-triggers, .resize-triggers > div, .contract-trigger:before { content: " "; display: block; position: absolute; top: 0; left: 0; height: 100%; width: 100%; overflow: hidden; } .resize-triggers > div { background: #eee; overflow: auto; } .contract-trigger:before { width: 200%; height: 200%; }',
            head = document.head || document.getElementsByTagName("head")[0],
            style = document.createElement("style");
          style.type = "text/css", style.styleSheet ? style.styleSheet.cssText = css : style.appendChild(document.createTextNode(css)), head.appendChild(style), stylesCreated = !0
        }
      }
      var attachEvent = document.attachEvent,
        stylesCreated = !1;
      if (!attachEvent) {
        var requestFrame = function () {
            var raf = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || function (fn) {
              return window.setTimeout(fn, 20)
            };
            return function (fn) {
              return raf(fn)
            }
          }(),
          cancelFrame = function () {
            var cancel = window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame || window.clearTimeout;
            return function (id) {
              return cancel(id)
            }
          }(),
          animation = !1,
          keyframeprefix = "",
          animationstartevent = "animationstart",
          domPrefixes = "Webkit Moz O ms".split(" "),
          startEvents = "webkitAnimationStart animationstart oAnimationStart MSAnimationStart".split(" "),
          pfx = "",
          elm = document.createElement("fakeelement");
        if (void 0 !== elm.style.animationName && (animation = !0), !1 === animation)
          for (var i = 0; i < domPrefixes.length; i++)
            if (void 0 !== elm.style[domPrefixes[i] + "AnimationName"]) {
              pfx = domPrefixes[i], pfx + "Animation", keyframeprefix = "-" + pfx.toLowerCase() + "-", animationstartevent = startEvents[i], animation = !0;
              break
            }
        var animationName = "resizeanim",
          animationKeyframes = "@" + keyframeprefix + "keyframes " + animationName + " { from { opacity: 0; } to { opacity: 0; } } ",
          animationStyle = keyframeprefix + "animation: 1ms " + animationName + "; "
      }
      window.addResizeListener = function (element, fn) {
        attachEvent ? element.attachEvent("onresize", fn) : (element.__resizeTriggers__ || ("static" == getComputedStyle(element).position && (element.style.position = "relative"), createStyles(), element.__resizeLast__ = {}, element.__resizeListeners__ = [], (element.__resizeTriggers__ = document.createElement("div")).className = "resize-triggers", element.__resizeTriggers__.innerHTML = '<div class="expand-trigger"><div></div></div><div class="contract-trigger"></div>', element.appendChild(element.__resizeTriggers__), resetTriggers(element), element.addEventListener("scroll", scrollListener, !0), animationstartevent && element.__resizeTriggers__.addEventListener(animationstartevent, function (e) {
          e.animationName == animationName && resetTriggers(element)
        })), element.__resizeListeners__.push(fn))
      }, window.removeResizeListener = function (element, fn) {
        attachEvent ? element.detachEvent("onresize", fn) : (element.__resizeListeners__.splice(element.__resizeListeners__.indexOf(fn), 1), element.__resizeListeners__.length || (element.removeEventListener("scroll", scrollListener), element.__resizeTriggers__ = !element.removeChild(element.__resizeTriggers__)))
      }
    }(),
    function ($) {
      "use strict";
      var MK = window.MK || {};
      MK.core = {};
      var _loadedDependencies = [],
        _inQueue = {};
      MK.core.initAll = function (scope) {
        var $el = $(scope).find(".js-el"),
          $components = $el.filter("[data-mk-component]"),
          component = null,
          init = function (name, el) {
            var $el = $(el);
            $el.data("init-" + name) || ("function" != typeof MK.component[name] ? console.log("Component init error: ", name) : (component = new MK.component[name](el), component.init(), $el.data("init-" + name, !0), MK.utils.eventManager.publish("component-inited")))
          };
        $components.each(function () {
          var self = this,
            $this = $(this),
            names = $this.data("mk-component");
          if ("string" == typeof names) {
            init(names, self)
          } else names.forEach(function (name) {
            init(name, self)
          })
        })
      }, MK.core.loadDependencies = function (dependencies, callback) {
        var _callback = callback || function () {};
        if (!dependencies) return void _callback();
        var newDeps = dependencies.map(function (dep) {
          return -1 === _loadedDependencies.indexOf(dep) && (void 0 === _inQueue[dep] ? dep : (_inQueue[dep].push(_callback), !0))
        });
        if (!0 !== newDeps[0]) {
          if (!1 === newDeps[0]) return void _callback();
          var queue = newDeps.map(function (script) {
              return _inQueue[script] = [_callback], $.getCachedScript(script)
            }),
            onLoad = function () {
              newDeps.map(function (loaded) {
                _inQueue[loaded].forEach(function (callback) {
                  callback()
                }), delete _inQueue[loaded], _loadedDependencies.push(loaded)
              })
            };
          $.when.apply(null, queue).done(onLoad)
        }
      }, MK.core.path = {
        theme: mk_theme_dir,
        plugins: mk_theme_js_path + "/plugins/async/min/",
        ajaxUrl: window.PHP.ajax
      }
    }(jQuery),
    function ($) {
      "use strict";
      var MK = window.MK || {};
      MK.utils = window.MK.utils || {}, MK.utils.actions = {}, MK.utils.actions.activate = function (el) {
        $(el).addClass("is-active")
      }, MK.utils.actions.deactivate = function (el) {
        $(el).removeClass("is-active")
      }
    }(jQuery),
    function ($) {
      "use strict";
      var MK = window.MK || {};
      MK.utils = window.MK.utils || {}, MK.utils.browser = function () {
        var dataBrowser = [{
            string: navigator.userAgent,
            subString: "Edge",
            identity: "Edge"
          }, {
            string: navigator.userAgent,
            subString: "Chrome",
            identity: "Chrome"
          }, {
            string: navigator.userAgent,
            subString: "MSIE",
            identity: "IE"
          }, {
            string: navigator.userAgent,
            subString: "Trident",
            identity: "IE"
          }, {
            string: navigator.userAgent,
            subString: "Firefox",
            identity: "Firefox"
          }, {
            string: navigator.userAgent,
            subString: "Safari",
            identity: "Safari"
          }, {
            string: navigator.userAgent,
            subString: "Opera",
            identity: "Opera"
          }],
          versionSearchString = null,
          searchVersion = function (dataString) {
            var index = dataString.indexOf(versionSearchString);
            if (-1 !== index) {
              var rv = dataString.indexOf("rv:");
              return "Trident" === versionSearchString && -1 !== rv ? parseFloat(dataString.substring(rv + 3)) : parseFloat(dataString.substring(index + versionSearchString.length + 1))
            }
          },
          name = function (data) {
            for (var i = 0; i < data.length; i++) {
              var dataString = data[i].string;
              if (versionSearchString = data[i].subString, -1 !== dataString.indexOf(data[i].subString)) return data[i].identity
            }
          }(dataBrowser) || "Other",
          version = searchVersion(navigator.userAgent) || searchVersion(navigator.appVersion) || "Unknown";
        return $("html").addClass(name).addClass(name + version), {
          name: name,
          version: version
        }
      }(), MK.utils.OS = function () {
        return -1 != navigator.appVersion.indexOf("Win") ? "Windows" : -1 != navigator.appVersion.indexOf("Mac") ? "OSX" : -1 != navigator.appVersion.indexOf("X11") ? "UNIX" : -1 != navigator.appVersion.indexOf("Linux") ? "Linux" : void 0
      }(), MK.utils.isMobile = function () {
        return function () {
          return navigator.userAgent.match(/Android/i)
        }() || function () {
          return navigator.userAgent.match(/BlackBerry/i)
        }() || function () {
          return navigator.userAgent.match(/iPhone|iPad|iPod/i)
        }() || function () {
          return navigator.userAgent.match(/Opera Mini/i)
        }() || function () {
          return navigator.userAgent.match(/IEMobile/i)
        }() || matchMedia("(max-width: 1024px)").matches
      }, MK.utils.isResponsiveMenuState = function () {
        return window.matchMedia("(max-width: " + mk_responsive_nav_width + "px)").matches
      }, MK.utils.getUrlParameter = function (sParam) {
        var sParameterName, i, sPageURL = decodeURIComponent(window.location.search.substring(1)),
          sURLVariables = sPageURL.split("&");
        for (i = 0; i < sURLVariables.length; i++)
          if (sParameterName = sURLVariables[i].split("="), sParameterName[0] === sParam) return void 0 === sParameterName[1] || sParameterName[1]
      }, MK.utils.isSmoothScroll = function () {
        return "true" === mk_smooth_scroll
      }()
    }(jQuery),
    function ($) {
      "use strict";
      var MK = window.MK || {};
      MK.utils = window.MK.utils || {}, MK.utils.eventManager = {}, MK.utils.eventManager.subscribe = function (evt, func) {
        $(this).on(evt, func)
      }, MK.utils.eventManager.unsubscribe = function (evt, func) {
        $(this).off(evt, func)
      }, MK.utils.eventManager.publish = function (evt, params) {
        $(this).trigger(evt, [params])
      }
    }(jQuery),
    function ($) {
      "use strict";
      var MK = window.MK || {};
      MK.utils = window.MK.utils || {}, MK.utils.fullscreen = {}, MK.utils.launchIntoFullscreen = function (element) {
        element.requestFullscreen ? element.requestFullscreen() : element.mozRequestFullScreen ? element.mozRequestFullScreen() : element.webkitRequestFullscreen ? element.webkitRequestFullscreen() : element.msRequestFullscreen && element.msRequestFullscreen()
      }, MK.utils.exitFullscreen = function () {
        document.exitFullscreen ? document.exitFullscreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.webkitExitFullscreen && document.webkitExitFullscreen()
      }
    }(jQuery),
    function ($) {
      "use strict";
      var MK = window.MK || {};
      MK.utils = window.MK.utils || {}, MK.utils.misc = {}, MK.utils.offsets = function ($els) {
        return $.map($els, function (el) {
          return $(el).offset().top
        })
      }, MK.utils.nextHigherVal = function (val, arr) {
        var i = 0,
          higher = null,
          check = function () {
            val > arr[i] ? (i += 1, check()) : higher = arr[i]
          };
        return check(), higher
      }, MK.utils.throttle = function (delay, fn) {
        var last, deferTimer;
        return function () {
          var context = this,
            args = arguments,
            now = +new Date;
          last && now < last + delay ? (clearTimeout(deferTimer), deferTimer = setTimeout(function () {
            last = now, fn.apply(context, args)
          }, delay)) : (last = now, fn.apply(context, args))
        }
      }, MK.utils.isElementInViewport = function (el) {
        return el.getBoundingClientRect().top < window.innerHeight
      }
    }(jQuery),
    function ($) {
      "use strict";
      var MK = window.MK || {};
      MK.utils = window.MK.utils || {}, MK.utils.scrollTo = function (offset) {
        $("html, body").stop().animate({
          scrollTop: offset
        }, {
          duration: 1200,
          easing: "easeInOutExpo"
        })
      }, MK.utils.scrollToAnchor = function (hash) {
        hash = hash.substring(1).replace(/[!"#$%&'()*+,.\/:;<=>?@[\]^`{|}~]/g, "\\$&"), hash = "#" + hash;
        var $target = $(hash);
        if ($target.length) {
          var offset = $target.offset().top;
          offset -= MK.val.offsetHeaderHeight(offset), "#top-of-page" === hash ? window.history.replaceState(void 0, void 0, " ") : window.history.replaceState(void 0, void 0, hash), MK.utils.scrollTo(offset)
        }
      }, MK.utils.scroll = function () {
        function preventDefault(e) {
          e = e || window.event, e.preventDefault(), e.returnValue = !1
        }

        function wheel(e) {
          preventDefault(e)
        }

        function keydown(e) {
          for (var i = keys.length; i--;)
            if (e.keyCode === keys[i]) return void preventDefault(e)
        }

        function disableScroll() {
          window.addEventListener && window.addEventListener("DOMMouseScroll", wheel, !1), window.onmousewheel = document.onmousewheel = wheel, document.onkeydown = keydown
        }

        function enableScroll() {
          window.removeEventListener && window.removeEventListener("DOMMouseScroll", wheel, !1), window.onmousewheel = document.onmousewheel = document.onkeydown = null
        }
        var keys = [38, 40];
        return {
          disable: disableScroll,
          enable: enableScroll
        }
      }(), MK.utils.detectAnchor = function (el) {
        var $this = $(el),
          loc = window.location,
          href = (loc.origin, loc.pathname, $this.attr("href")),
          linkSplit = href ? href.split("#") : "",
          hrefHash = (linkSplit[0] && linkSplit[0], linkSplit[1] ? linkSplit[1] : "");
        return void 0 !== hrefHash && "" !== hrefHash && "#" + hrefHash
      }, MK.utils.scrollToURLHash = function () {
        var loc = window.location,
          hash = loc.hash;
        hash.length && hash.substring(1).length && (hash = hash.replace("!loading", ""), setTimeout(function () {
          MK.utils.scrollToAnchor(hash)
        }, 1e3), setTimeout(function () {
          window.history.replaceState(void 0, void 0, hash)
        }, 1001))
      }, MK.utils.scrollSpy = function (toSpy, config) {
        var $window = $(window),
          container = document.getElementById("mk-theme-container"),
          isObj = "object" == typeof toSpy,
          offset = isObj ? MK.val.dynamicOffset(toSpy, config.position, config.threshold) : function () {
            return toSpy
          },
          height = isObj ? MK.val.dynamicHeight(toSpy) : function () {
            return 0
          },
          cacheVals = {},
          _p = "before",
          checkPosition = function () {
            var s = MK.val.scroll(),
              o = offset(),
              h = height();
            s < o && "before" !== _p ? (config.before && config.before(), _p = "before") : s >= o && s <= o + h && "active" !== _p ? (config.active && config.active(o), _p = "active") : s > o + h && "after" !== _p && (config.after && config.after(o + h), _p = "after")
          },
          rAF = function () {
            window.requestAnimationFrame(checkPosition)
          },
          exportVals = function () {
            return cacheVals
          },
          updateCache = function () {
            var o = offset(),
              h = height();
            cacheVals = {
              before: o - $window.height(),
              active: o,
              after: o + h
            }
          };
        config.cache && config.cache(exportVals), checkPosition(), $window.on("load", checkPosition), $window.on("resize", checkPosition), $window.on("mouseup", checkPosition), window.addResizeListener(container, checkPosition), $window.on("scroll", rAF), updateCache(), $window.on("load", updateCache), $window.on("resize", updateCache), window.addResizeListener(container, updateCache)
      }
    }(jQuery),
    function ($) {
      "use strict";
      $("body").on("click touchend", ".js-taphover", function (e) {
        var $link = $(e.currentTarget),
          $target = $(e.target);
        if ($link.hasClass("hover")) return !0;
        MK.utils.isMobile() && (!$target.hasClass("hover-icon") && !$target.closest(".hover-icon").length || $target.closest(".js-taphover").hasClass("hover") || e.preventDefault(), $link.addClass("hover"), $(".js-taphover").not(e.currentTarget).removeClass("hover"), e.stopPropagation())
      }), $(document).on("click", function (e) {
        $(".js-taphover").removeClass("hover")
      })
    }(jQuery),
    function ($) {
      "use strict";

      function calc() {
        wrapperHeight = $wrapper.height(), wrapperWidth = $wrapper.width(), wrapperAspectRatio = wrapperHeight / wrapperWidth * 100
      }

      function apply() {
        var width = wrapperAspectRatio / baseAspectRatio * 100,
          widthOverflow = width - 100;
        $videoHolder.css({
          "padding-top": wrapperAspectRatio + "%",
          width: width + "%",
          left: -widthOverflow / 2 + "%"
        })
      }

      function reset() {
        $videoHolder.css({
          "padding-top": baseAspectRatio + "%",
          width: "100%",
          left: 0
        })
      }

      function setCover() {
        reset(), calc(), wrapperAspectRatio > baseAspectRatio && apply()
      }
      var wrapperHeight, wrapperWidth, wrapperAspectRatio, $videoHolder = $(".mk-center-video"),
        $wrapper = $videoHolder.parent(),
        baseAspectRatio = 56.25;
      $(window).on("load", setCover), $(window).on("resize", setCover)
    }(jQuery),
    function ($) {
      "use strict";
      var MK = window.MK || {};
      MK.val = {}, MK.val.scroll = function () {
        var offset = 0,
          $window = $(window),
          hasPageYOffset = void 0 !== window.pageYOffset,
          body = document.documentElement || document.body.parentNode || document.body,
          update = function () {
            offset = hasPageYOffset ? window.pageYOffset : body.scrollTop
          },
          rAF = function () {
            window.requestAnimationFrame(update)
          };
        return update(), $window.on("load", update), $window.on("resize", update), $window.on("scroll", rAF),
          function () {
            return offset
          }
      }(), MK.val.viewportPercentHeight = function (percent) {
        return $(window).height() * (percent / 100)
      }, MK.val.adminbarHeight = function () {
        return php.hasAdminbar ? window.matchMedia("( max-width: 782px )").matches ? 46 : 32 : 0
      }, MK.val.stickyOffset = function () {
        var $header = $(".mk-header").not(".js-header-shortcode").first();
        if (!$header.length) return function () {
          return 0
        };
        var $toolbar = $header.find(".mk-header-toolbar"),
          config = $header.data(),
          hasToolbar = $toolbar.length,
          toolbarHeight = hasToolbar ? $toolbar.height() : 0,
          isVertical = 4 === config.headerStyle,
          headerHeight = isVertical ? 0 : config.height,
          type = "number" == typeof config.stickyOffset && "number" || "header" === config.stickyOffset && "header" || "percent",
          stickyOffset = 0,
          setOffset = function () {
            toolbarHeight = hasToolbar ? $toolbar.height() : 0, MK.utils.isResponsiveMenuState() && (headerHeight = config.responsiveHeight, hasToolbar && $toolbar.is(":hidden") && (toolbarHeight = 0)), "number" === type ? stickyOffset = config.stickyOffset : "header" === type ? stickyOffset = headerHeight + toolbarHeight + MK.val.adminbarHeight() : "percent" === type && (stickyOffset = MK.val.viewportPercentHeight(parseInt(config.stickyOffset)))
          };
        return setOffset(), $(window).on("resize", setOffset),
          function () {
            return stickyOffset
          }
      }(), MK.val.offsetHeaderHeight = function () {
        var $header = $(".mk-header").not(".js-header-shortcode").first();
        if (!$header.length) return function () {
          return 0
        };
        var $toolbar = $header.find(".mk-header-toolbar"),
          config = $header.data(),
          stickyHeight = config.stickyHeight,
          desktopHeight = config.height,
          mobileHeight = config.responsiveHeight,
          isTransparent = $header.hasClass("transparent-header"),
          isSticky = config.stickyStyle.length,
          isStickyLazy = "lazy" === config.stickyStyle,
          isVertical = 4 === config.headerStyle,
          hasToolbar = $toolbar.length,
          toolbarHeight = hasToolbar ? $toolbar.height() : 0;
        2 === config.headerStyle && (stickyHeight = $header.find(".mk-header-nav-container").outerHeight());
        var $innerHeader = $header.find(".mk-header-inner"),
          headerHeight = ($innerHeader.length, function (offset) {
            toolbarHeight = hasToolbar ? $toolbar.height() : 0;
            var stickyOffset = MK.val.stickyOffset();
            if (MK.utils.isResponsiveMenuState()) {
              hasToolbar && $toolbar.is(":hidden") && (toolbarHeight = 0);
              var headerBorder = 0;
              headerBorder = parseInt($innerHeader.css("border-bottom-width"));
              var totalHeight = mobileHeight + MK.val.adminbarHeight() + toolbarHeight + headerBorder;
              return offset <= totalHeight ? totalHeight : MK.val.adminbarHeight()
            }
            if (offset <= stickyOffset) return isVertical ? hasToolbar ? toolbarHeight + MK.val.adminbarHeight() : MK.val.adminbarHeight() : isTransparent ? MK.val.adminbarHeight() : desktopHeight + toolbarHeight + MK.val.adminbarHeight();
            if (offset > stickyOffset) {
              if (isVertical) return MK.val.adminbarHeight();
              if (!isSticky) return MK.val.adminbarHeight();
              if (isStickyLazy) return MK.val.adminbarHeight();
              if (isSticky) return stickyHeight + MK.val.adminbarHeight()
            }
            return 0
          });
        return function (offset) {
          return headerHeight(offset - MK.val.adminbarHeight())
        }
      }(), MK.val.dynamicOffset = function (el, position, threshold) {
        var $window = $(window),
          $el = $(el),
          pos = position || "top",
          thr = threshold || 0,
          container = document.getElementById("mk-theme-container"),
          currentPos = 0,
          offset = 0,
          winH = 0,
          rect = 0,
          x = 0,
          update = function () {
            winH = $window.height(), rect = $el[0].getBoundingClientRect(), offset = rect.top + MK.val.scroll(), x = "top" === pos ? MK.val.offsetHeaderHeight(offset) : winH + (rect.height - thr), currentPos = offset - x - 1
          };
        return update(), $window.on("load", update), $window.on("resize", update), window.addResizeListener(container, update),
          function () {
            return currentPos
          }
      }, MK.val.dynamicHeight = function (el) {
        var $window = $(window),
          $el = $(el),
          container = document.getElementById("mk-theme-container"),
          currentHeight = 0,
          update = function () {
            currentHeight = $el.outerHeight()
          };
        return update(), $window.on("load", update), $window.on("resize", update), window.addResizeListener(container, update),
          function () {
            return currentHeight
          }
      }
    }(jQuery), jQuery.easing.jswing = jQuery.easing.swing, jQuery.extend(jQuery.easing, {
      def: "easeOutQuad",
      swing: function (a, b, c, d, e) {
        return jQuery.easing[jQuery.easing.def](a, b, c, d, e)
      },
      easeInQuad: function (a, b, c, d, e) {
        return d * (b /= e) * b + c
      },
      easeOutQuad: function (a, b, c, d, e) {
        return -d * (b /= e) * (b - 2) + c
      },
      easeInOutQuad: function (a, b, c, d, e) {
        return (b /= e / 2) < 1 ? d / 2 * b * b + c : -d / 2 * (--b * (b - 2) - 1) + c
      },
      easeInCubic: function (a, b, c, d, e) {
        return d * (b /= e) * b * b + c
      },
      easeOutCubic: function (a, b, c, d, e) {
        return d * ((b = b / e - 1) * b * b + 1) + c
      },
      easeInOutCubic: function (a, b, c, d, e) {
        return (b /= e / 2) < 1 ? d / 2 * b * b * b + c : d / 2 * ((b -= 2) * b * b + 2) + c
      },
      easeInQuart: function (a, b, c, d, e) {
        return d * (b /= e) * b * b * b + c
      },
      easeOutQuart: function (a, b, c, d, e) {
        return -d * ((b = b / e - 1) * b * b * b - 1) + c
      },
      easeInOutQuart: function (a, b, c, d, e) {
        return (b /= e / 2) < 1 ? d / 2 * b * b * b * b + c : -d / 2 * ((b -= 2) * b * b * b - 2) + c
      },
      easeInQuint: function (a, b, c, d, e) {
        return d * (b /= e) * b * b * b * b + c
      },
      easeOutQuint: function (a, b, c, d, e) {
        return d * ((b = b / e - 1) * b * b * b * b + 1) + c
      },
      easeInOutQuint: function (a, b, c, d, e) {
        return (b /= e / 2) < 1 ? d / 2 * b * b * b * b * b + c : d / 2 * ((b -= 2) * b * b * b * b + 2) + c
      },
      easeInSine: function (a, b, c, d, e) {
        return -d * Math.cos(b / e * (Math.PI / 2)) + d + c
      },
      easeOutSine: function (a, b, c, d, e) {
        return d * Math.sin(b / e * (Math.PI / 2)) + c
      },
      easeInOutSine: function (a, b, c, d, e) {
        return -d / 2 * (Math.cos(Math.PI * b / e) - 1) + c
      },
      easeInExpo: function (a, b, c, d, e) {
        return 0 == b ? c : d * Math.pow(2, 10 * (b / e - 1)) + c
      },
      easeOutExpo: function (a, b, c, d, e) {
        return b == e ? c + d : d * (1 - Math.pow(2, -10 * b / e)) + c
      },
      easeInOutExpo: function (a, b, c, d, e) {
        return 0 == b ? c : b == e ? c + d : (b /= e / 2) < 1 ? d / 2 * Math.pow(2, 10 * (b - 1)) + c : d / 2 * (2 - Math.pow(2, -10 * --b)) + c
      },
      easeInCirc: function (a, b, c, d, e) {
        return -d * (Math.sqrt(1 - (b /= e) * b) - 1) + c
      },
      easeOutCirc: function (a, b, c, d, e) {
        return d * Math.sqrt(1 - (b = b / e - 1) * b) + c
      },
      easeInOutCirc: function (a, b, c, d, e) {
        return (b /= e / 2) < 1 ? -d / 2 * (Math.sqrt(1 - b * b) - 1) + c : d / 2 * (Math.sqrt(1 - (b -= 2) * b) + 1) + c
      },
      easeInElastic: function (a, b, c, d, e) {
        var f = 1.70158,
          g = 0,
          h = d;
        if (0 == b) return c;
        if (1 == (b /= e)) return c + d;
        if (g || (g = .3 * e), h < Math.abs(d)) {
          h = d;
          var f = g / 4
        } else var f = g / (2 * Math.PI) * Math.asin(d / h);
        return -h * Math.pow(2, 10 * (b -= 1)) * Math.sin(2 * (b * e - f) * Math.PI / g) + c
      },
      easeOutElastic: function (a, b, c, d, e) {
        var f = 1.70158,
          g = 0,
          h = d;
        if (0 == b) return c;
        if (1 == (b /= e)) return c + d;
        if (g || (g = .3 * e), h < Math.abs(d)) {
          h = d;
          var f = g / 4
        } else var f = g / (2 * Math.PI) * Math.asin(d / h);
        return h * Math.pow(2, -10 * b) * Math.sin(2 * (b * e - f) * Math.PI / g) + d + c
      },
      easeInOutElastic: function (a, b, c, d, e) {
        var f = 1.70158,
          g = 0,
          h = d;
        if (0 == b) return c;
        if (2 == (b /= e / 2)) return c + d;
        if (g || (g = .3 * e * 1.5), h < Math.abs(d)) {
          h = d;
          var f = g / 4
        } else var f = g / (2 * Math.PI) * Math.asin(d / h);
        return b < 1 ? -.5 * h * Math.pow(2, 10 * (b -= 1)) * Math.sin(2 * (b * e - f) * Math.PI / g) + c : h * Math.pow(2, -10 * (b -= 1)) * Math.sin(2 * (b * e - f) * Math.PI / g) * .5 + d + c
      },
      easeInBack: function (a, b, c, d, e, f) {
        return void 0 == f && (f = 1.70158), d * (b /= e) * b * ((f + 1) * b - f) + c
      },
      easeOutBack: function (a, b, c, d, e, f) {
        return void 0 == f && (f = 1.70158), d * ((b = b / e - 1) * b * ((f + 1) * b + f) + 1) + c
      },
      easeInOutBack: function (a, b, c, d, e, f) {
        return void 0 == f && (f = 1.70158), (b /= e / 2) < 1 ? d / 2 * b * b * ((1 + (f *= 1.525)) * b - f) + c : d / 2 * ((b -= 2) * b * ((1 + (f *= 1.525)) * b + f) + 2) + c
      },
      easeInBounce: function (a, b, c, d, e) {
        return d - jQuery.easing.easeOutBounce(a, e - b, 0, d, e) + c
      },
      easeOutBounce: function (a, b, c, d, e) {
        return (b /= e) < 1 / 2.75 ? 7.5625 * d * b * b + c : b < 2 / 2.75 ? d * (7.5625 * (b -= 1.5 / 2.75) * b + .75) + c : b < 2.5 / 2.75 ? d * (7.5625 * (b -= 2.25 / 2.75) * b + .9375) + c : d * (7.5625 * (b -= 2.625 / 2.75) * b + .984375) + c
      },
      easeInOutBounce: function (a, b, c, d, e) {
        return b < e / 2 ? .5 * jQuery.easing.easeInBounce(a, 2 * b, 0, d, e) + c : .5 * jQuery.easing.easeOutBounce(a, 2 * b - e, 0, d, e) + .5 * d + c
      }
    }),
    function (s, H, f, w) {
      var K = f("html"),
        q = f(s),
        p = f(H),
        b = f.fancybox = function () {
          b.open.apply(this, arguments)
        },
        J = navigator.userAgent.match(/msie/i),
        C = null,
        t = H.createTouch !== w,
        u = function (a) {
          return a && a.hasOwnProperty && a instanceof f
        },
        r = function (a) {
          return a && "string" === f.type(a)
        },
        F = function (a) {
          return r(a) && 0 < a.indexOf("%")
        },
        m = function (a, d) {
          var e = parseInt(a, 10) || 0;
          return d && F(a) && (e *= b.getViewport()[d] / 100), Math.ceil(e)
        },
        x = function (a, b) {
          return m(a, b) + "px"
        };
      f.extend(b, {
        version: "2.1.5",
        defaults: {
          padding: 15,
          margin: 20,
          width: 800,
          height: 600,
          minWidth: 100,
          minHeight: 100,
          maxWidth: 9999,
          maxHeight: 9999,
          pixelRatio: 1,
          autoSize: !0,
          autoHeight: !1,
          autoWidth: !1,
          autoResize: !0,
          autoCenter: !t,
          fitToView: !0,
          aspectRatio: !1,
          topRatio: .5,
          leftRatio: .5,
          scrolling: "auto",
          wrapCSS: "",
          arrows: !0,
          closeBtn: !0,
          closeClick: !1,
          nextClick: !1,
          mouseWheel: !0,
          autoPlay: !1,
          playSpeed: 3e3,
          preload: 3,
          modal: !1,
          loop: !0,
          ajax: {
            dataType: "html",
            headers: {
              "X-fancyBox": !0
            }
          },
          iframe: {
            scrolling: "auto",
            preload: !0
          },
          swf: {
            wmode: "transparent",
            allowfullscreen: "true",
            allowscriptaccess: "always"
          },
          keys: {
            next: {
              13: "left",
              34: "up",
              39: "left",
              40: "up"
            },
            prev: {
              8: "right",
              33: "down",
              37: "right",
              38: "down"
            },
            close: [27],
            play: [32],
            toggle: [70]
          },
          direction: {
            next: "left",
            prev: "right"
          },
          scrollOutside: !0,
          index: 0,
          type: null,
          href: null,
          content: null,
          title: null,
          tpl: {
            wrap: '<div class="fancybox-wrap" tabIndex="-1"><div class="fancybox-skin"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div></div>',
            image: '<img class="fancybox-image" src="{href}" alt="" />',
            iframe: '<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" frameborder="0" vspace="0" hspace="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen' + (J ? ' allowtransparency="true"' : "") + "></iframe>",
            error: '<p class="fancybox-error">The requested content cannot be loaded.<br/>Please try again later.</p>',
            closeBtn: '<a title="Close" class="fancybox-item fancybox-close" href="javascript:;"></a>',
            next: '<a title="Next" class="fancybox-nav fancybox-next" href="javascript:;"><span></span></a>',
            prev: '<a title="Previous" class="fancybox-nav fancybox-prev" href="javascript:;"><span></span></a>'
          },
          openEffect: "fade",
          openSpeed: 250,
          openEasing: "swing",
          openOpacity: !0,
          openMethod: "zoomIn",
          closeEffect: "fade",
          closeSpeed: 250,
          closeEasing: "swing",
          closeOpacity: !0,
          closeMethod: "zoomOut",
          nextEffect: "elastic",
          nextSpeed: 250,
          nextEasing: "swing",
          nextMethod: "changeIn",
          prevEffect: "elastic",
          prevSpeed: 250,
          prevEasing: "swing",
          prevMethod: "changeOut",
          helpers: {
            overlay: !0,
            title: !0
          },
          onCancel: f.noop,
          beforeLoad: f.noop,
          afterLoad: f.noop,
          beforeShow: f.noop,
          afterShow: f.noop,
          beforeChange: f.noop,
          beforeClose: f.noop,
          afterClose: f.noop
        },
        group: {},
        opts: {},
        previous: null,
        coming: null,
        current: null,
        isActive: !1,
        isOpen: !1,
        isOpened: !1,
        wrap: null,
        skin: null,
        outer: null,
        inner: null,
        player: {
          timer: null,
          isActive: !1
        },
        ajaxLoad: null,
        imgPreload: null,
        transitions: {},
        helpers: {},
        open: function (a, d) {
          if (a && (f.isPlainObject(d) || (d = {}), !1 !== b.close(!0))) return f.isArray(a) || (a = u(a) ? f(a).get() : [a]), f.each(a, function (e, c) {
            var g, h, k, n, m, l = {};
            "object" === f.type(c) && (c.nodeType && (c = f(c)), u(c) ? (l = {
              href: c.data("fancybox-href") || c.attr("href"),
              title: f("<div/>").text(c.data("fancybox-title") || c.attr("title")).html(),
              isDom: !0,
              element: c
            }, f.metadata && f.extend(!0, l, c.metadata())) : l = c), g = d.href || l.href || (r(c) ? c : null), h = d.title !== w ? d.title : l.title || "", n = (k = d.content || l.content) ? "html" : d.type || l.type, !n && l.isDom && ((n = c.data("fancybox-type")) || (n = (n = c.prop("class").match(/fancybox\.(\w+)/)) ? n[1] : null)), r(g) && (n || (b.isImage(g) ? n = "image" : b.isSWF(g) ? n = "swf" : "#" === g.charAt(0) ? n = "inline" : r(c) && (n = "html", k = c)), "ajax" === n && (m = g.split(/\s+/, 2), g = m.shift(), m = m.shift())), k || ("inline" === n ? g ? k = f(r(g) ? g.replace(/.*(?=#[^\s]+$)/, "") : g) : l.isDom && (k = c) : "html" === n ? k = g : n || g || !l.isDom || (n = "inline", k = c)), f.extend(l, {
              href: g,
              type: n,
              content: k,
              title: h,
              selector: m
            }), a[e] = l
          }), b.opts = f.extend(!0, {}, b.defaults, d), d.keys !== w && (b.opts.keys = !!d.keys && f.extend({}, b.defaults.keys, d.keys)), b.group = a, b._start(b.opts.index)
        },
        cancel: function () {
          var a = b.coming;
          a && !1 === b.trigger("onCancel") || (b.hideLoading(), a && (b.ajaxLoad && b.ajaxLoad.abort(), b.ajaxLoad = null, b.imgPreload && (b.imgPreload.onload = b.imgPreload.onerror = null), a.wrap && a.wrap.stop(!0, !0).trigger("onReset").remove(), b.coming = null, b.current || b._afterZoomOut(a)))
        },
        close: function (a) {
          b.cancel(), !1 !== b.trigger("beforeClose") && (b.unbindEvents(), b.isActive && (b.isOpen && !0 !== a ? (b.isOpen = b.isOpened = !1, b.isClosing = !0, f(".fancybox-item, .fancybox-nav").remove(), b.wrap.stop(!0, !0).removeClass("fancybox-opened"), b.transitions[b.current.closeMethod]()) : (f(".fancybox-wrap").stop(!0).trigger("onReset").remove(), b._afterZoomOut())))
        },
        play: function (a) {
          var d = function () {
              clearTimeout(b.player.timer)
            },
            e = function () {
              d(), b.current && b.player.isActive && (b.player.timer = setTimeout(b.next, b.current.playSpeed))
            },
            c = function () {
              d(), p.unbind(".player"), b.player.isActive = !1, b.trigger("onPlayEnd")
            };
          !0 === a || !b.player.isActive && !1 !== a ? b.current && (b.current.loop || b.current.index < b.group.length - 1) && (b.player.isActive = !0, p.bind({
            "onCancel.player beforeClose.player": c,
            "onUpdate.player": e,
            "beforeLoad.player": d
          }), e(), b.trigger("onPlayStart")) : c()
        },
        next: function (a) {
          var d = b.current;
          d && (r(a) || (a = d.direction.next), b.jumpto(d.index + 1, a, "next"))
        },
        prev: function (a) {
          var d = b.current;
          d && (r(a) || (a = d.direction.prev), b.jumpto(d.index - 1, a, "prev"))
        },
        jumpto: function (a, d, e) {
          var c = b.current;
          c && (a = m(a), b.direction = d || c.direction[a >= c.index ? "next" : "prev"], b.router = e || "jumpto", c.loop && (0 > a && (a = c.group.length + a % c.group.length), a %= c.group.length), c.group[a] !== w && (b.cancel(), b._start(a)))
        },
        reposition: function (a, d) {
          var l, e = b.current,
            c = e ? e.wrap : null;
          c && (l = b._getPosition(d), a && "scroll" === a.type ? (delete l.position, c.stop(!0, !0).animate(l, 200)) : (c.css(l), e.pos = f.extend({}, e.dim, l)))
        },
        update: function (a) {
          var d = a && a.originalEvent && a.originalEvent.type,
            e = !d || "orientationchange" === d;
          e && (clearTimeout(C), C = null), b.isOpen && !C && (C = setTimeout(function () {
            var c = b.current;
            c && !b.isClosing && (b.wrap.removeClass("fancybox-tmp"), (e || "load" === d || "resize" === d && c.autoResize) && b._setDimension(), "scroll" === d && c.canShrink || b.reposition(a), b.trigger("onUpdate"), C = null)
          }, e && !t ? 0 : 300))
        },
        toggle: function (a) {
          b.isOpen && (b.current.fitToView = "boolean" === f.type(a) ? a : !b.current.fitToView, t && (b.wrap.removeAttr("style").addClass("fancybox-tmp"), b.trigger("onUpdate")), b.update())
        },
        hideLoading: function () {
          p.unbind(".loading"), f("#fancybox-loading").remove()
        },
        showLoading: function () {
          var a, d;
          b.hideLoading(), a = f('<div id="fancybox-loading"><div></div></div>').click(b.cancel).appendTo("body"), p.bind("keydown.loading", function (a) {
            27 === (a.which || a.keyCode) && (a.preventDefault(), b.cancel())
          }), b.defaults.fixed || (d = b.getViewport(), a.css({
            position: "absolute",
            top: .5 * d.h + d.y,
            left: .5 * d.w + d.x
          })), b.trigger("onLoading")
        },
        getViewport: function () {
          var a = b.current && b.current.locked || !1,
            d = {
              x: q.scrollLeft(),
              y: q.scrollTop()
            };
          return a && a.length ? (d.w = a[0].clientWidth, d.h = a[0].clientHeight) : (d.w = t && s.innerWidth ? s.innerWidth : q.width(), d.h = t && s.innerHeight ? s.innerHeight : q.height()), d
        },
        unbindEvents: function () {
          b.wrap && u(b.wrap) && b.wrap.unbind(".fb"), p.unbind(".fb"), q.unbind(".fb")
        },
        bindEvents: function () {
          var d, a = b.current;
          a && (q.bind("orientationchange.fb" + (t ? "" : " resize.fb") + (a.autoCenter && !a.locked ? " scroll.fb" : ""), b.update), (d = a.keys) && p.bind("keydown.fb", function (e) {
            var c = e.which || e.keyCode,
              l = e.target || e.srcElement;
            if (27 === c && b.coming) return !1;
            e.ctrlKey || e.altKey || e.shiftKey || e.metaKey || l && (l.type || f(l).is("[contenteditable]")) || f.each(d, function (d, l) {
              return 1 < a.group.length && l[c] !== w ? (b[d](l[c]), e.preventDefault(), !1) : -1 < f.inArray(c, l) ? (b[d](), e.preventDefault(), !1) : void 0
            })
          }), f.fn.mousewheel && a.mouseWheel && b.wrap.bind("mousewheel.fb", function (d, c, l, g) {
            for (var h = f(d.target || null), k = !1; h.length && !(k || h.is(".fancybox-skin") || h.is(".fancybox-wrap"));) k = h[0] && !(h[0].style.overflow && "hidden" === h[0].style.overflow) && (h[0].clientWidth && h[0].scrollWidth > h[0].clientWidth || h[0].clientHeight && h[0].scrollHeight > h[0].clientHeight), h = f(h).parent();
            0 !== c && !k && 1 < b.group.length && !a.canShrink && (0 < g || 0 < l ? b.prev(0 < g ? "down" : "left") : (0 > g || 0 > l) && b.next(0 > g ? "up" : "right"), d.preventDefault())
          }))
        },
        trigger: function (a, d) {
          var e, c = d || b.coming || b.current;
          if (c) {
            if (f.isFunction(c[a]) && (e = c[a].apply(c, Array.prototype.slice.call(arguments, 1))), !1 === e) return !1;
            c.helpers && f.each(c.helpers, function (d, e) {
              e && b.helpers[d] && f.isFunction(b.helpers[d][a]) && b.helpers[d][a](f.extend(!0, {}, b.helpers[d].defaults, e), c)
            })
          }
          p.trigger(a)
        },
        isImage: function (a) {
          return r(a) && a.match(/(^data:image\/.*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg)((\?|#).*)?$)/i)
        },
        isSWF: function (a) {
          return r(a) && a.match(/\.(swf)((\?|#).*)?$/i)
        },
        _start: function (a) {
          var e, c, d = {};
          if (a = m(a), !(e = b.group[a] || null)) return !1;
          if (d = f.extend(!0, {}, b.opts, e), e = d.margin, c = d.padding, "number" === f.type(e) && (d.margin = [e, e, e, e]), "number" === f.type(c) && (d.padding = [c, c, c, c]), d.modal && f.extend(!0, d, {
              closeBtn: !1,
              closeClick: !1,
              nextClick: !1,
              arrows: !1,
              mouseWheel: !1,
              keys: null,
              helpers: {
                overlay: {
                  closeClick: !1
                }
              }
            }), d.autoSize && (d.autoWidth = d.autoHeight = !0), "auto" === d.width && (d.autoWidth = !0), "auto" === d.height && (d.autoHeight = !0), d.group = b.group, d.index = a, b.coming = d, !1 === b.trigger("beforeLoad")) b.coming = null;
          else {
            if (c = d.type, e = d.href, !c) return b.coming = null, !(!b.current || !b.router || "jumpto" === b.router) && (b.current.index = a, b[b.router](b.direction));
            if (b.isActive = !0, "image" !== c && "swf" !== c || (d.autoHeight = d.autoWidth = !1, d.scrolling = "visible"), "image" === c && (d.aspectRatio = !0), "iframe" === c && t && (d.scrolling = "scroll"), d.wrap = f(d.tpl.wrap).addClass("fancybox-" + (t ? "mobile" : "desktop") + " fancybox-type-" + c + " fancybox-tmp " + d.wrapCSS).appendTo(d.parent || "body"), f.extend(d, {
                skin: f(".fancybox-skin", d.wrap),
                outer: f(".fancybox-outer", d.wrap),
                inner: f(".fancybox-inner", d.wrap)
              }), f.each(["Top", "Right", "Bottom", "Left"], function (a, b) {
                d.skin.css("padding" + b, x(d.padding[a]))
              }), b.trigger("onReady"), "inline" === c || "html" === c) {
              if (!d.content || !d.content.length) return b._error("content")
            } else if (!e) return b._error("href");
            "image" === c ? b._loadImage() : "ajax" === c ? b._loadAjax() : "iframe" === c ? b._loadIframe() : b._afterLoad()
          }
        },
        _error: function (a) {
          f.extend(b.coming, {
            type: "html",
            autoWidth: !0,
            autoHeight: !0,
            minWidth: 0,
            minHeight: 0,
            scrolling: "no",
            hasError: a,
            content: b.coming.tpl.error
          }), b._afterLoad()
        },
        _loadImage: function () {
          var a = b.imgPreload = new Image;
          a.onload = function () {
            this.onload = this.onerror = null, b.coming.width = this.width / b.opts.pixelRatio, b.coming.height = this.height / b.opts.pixelRatio, b._afterLoad()
          }, a.onerror = function () {
            this.onload = this.onerror = null, b._error("image")
          }, a.src = b.coming.href, !0 !== a.complete && b.showLoading()
        },
        _loadAjax: function () {
          var a = b.coming;
          b.showLoading(), b.ajaxLoad = f.ajax(f.extend({}, a.ajax, {
            url: a.href,
            error: function (a, e) {
              b.coming && "abort" !== e ? b._error("ajax", a) : b.hideLoading()
            },
            success: function (d, e) {
              "success" === e && (a.content = d, b._afterLoad())
            }
          }))
        },
        _loadIframe: function () {
          var a = b.coming,
            d = f(a.tpl.iframe.replace(/\{rnd\}/g, (new Date).getTime())).attr("scrolling", t ? "auto" : a.iframe.scrolling).attr("src", a.href);
          f(a.wrap).bind("onReset", function () {
            try {
              f(this).find("iframe").hide().attr("src", "//about:blank").end().empty()
            } catch (a) {}
          }), a.iframe.preload && (b.showLoading(), d.one("load", function () {
            f(this).data("ready", 1), t || f(this).bind("load.fb", b.update), f(this).parents(".fancybox-wrap").width("100%").removeClass("fancybox-tmp").show(), b._afterLoad()
          })), a.content = d.appendTo(a.inner), a.iframe.preload || b._afterLoad()
        },
        _preloadImages: function () {
          var f, g, a = b.group,
            d = b.current,
            e = a.length,
            c = d.preload ? Math.min(d.preload, e - 1) : 0;
          for (g = 1; g <= c; g += 1) f = a[(d.index + g) % e], "image" === f.type && f.href && ((new Image).src = f.href)
        },
        _afterLoad: function () {
          var e, c, l, g, h, a = b.coming,
            d = b.current;
          if (b.hideLoading(), a && !1 !== b.isActive)
            if (!1 === b.trigger("afterLoad", a, d)) a.wrap.stop(!0).trigger("onReset").remove(), b.coming = null;
            else {
              switch (d && (b.trigger("beforeChange", d), d.wrap.stop(!0).removeClass("fancybox-opened").find(".fancybox-item, .fancybox-nav").remove()), b.unbindEvents(), e = a.content, c = a.type, l = a.scrolling, f.extend(b, {
                wrap: a.wrap,
                skin: a.skin,
                outer: a.outer,
                inner: a.inner,
                current: a,
                previous: d
              }), g = a.href, c) {
                case "inline":
                case "ajax":
                case "html":
                  a.selector ? e = f("<div>").html(e).find(a.selector) : u(e) && (e.data("fancybox-placeholder") || e.data("fancybox-placeholder", f('<div class="fancybox-placeholder"></div>').insertAfter(e).hide()), e = e.show().detach(), a.wrap.bind("onReset", function () {
                    f(this).find(e).length && e.hide().replaceAll(e.data("fancybox-placeholder")).data("fancybox-placeholder", !1)
                  }));
                  break;
                case "image":
                  e = a.tpl.image.replace(/\{href\}/g, g);
                  break;
                case "swf":
                  e = '<object id="fancybox-swf" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="100%" height="100%"><param name="movie" value="' + g + '"></param>', h = "", f.each(a.swf, function (a, b) {
                    e += '<param name="' + a + '" value="' + b + '"></param>', h += " " + a + '="' + b + '"'
                  }), e += '<embed src="' + g + '" type="application/x-shockwave-flash" width="100%" height="100%"' + h + "></embed></object>"
              }
              u(e) && e.parent().is(a.inner) || a.inner.append(e), b.trigger("beforeShow"), a.inner.css("overflow", "yes" === l ? "scroll" : "no" === l ? "hidden" : l), b._setDimension(), b.reposition(), b.isOpen = !1, b.coming = null, b.bindEvents(), b.isOpened ? d.prevMethod && b.transitions[d.prevMethod]() : f(".fancybox-wrap").not(a.wrap).stop(!0).trigger("onReset").remove(), b.transitions[b.isOpened ? a.nextMethod : a.openMethod](), b._preloadImages()
            }
        },
        _setDimension: function () {
          var w, A, u, D, B, G, C, E, I, a = b.getViewport(),
            d = 0,
            e = !1,
            c = !1,
            e = b.wrap,
            l = b.skin,
            g = b.inner,
            h = b.current,
            c = h.width,
            k = h.height,
            n = h.minWidth,
            v = h.minHeight,
            p = h.maxWidth,
            q = h.maxHeight,
            t = h.scrolling,
            r = h.scrollOutside ? h.scrollbarWidth : 0,
            y = h.margin,
            z = m(y[1] + y[3]),
            s = m(y[0] + y[2]);
          if (e.add(l).add(g).width("auto").height("auto").removeClass("fancybox-tmp"), y = m(l.outerWidth(!0) - l.width()), w = m(l.outerHeight(!0) - l.height()), A = z + y, u = s + w, D = F(c) ? (a.w - A) * m(c) / 100 : c, B = F(k) ? (a.h - u) * m(k) / 100 : k, "iframe" === h.type) {
            if (I = h.content, h.autoHeight && 1 === I.data("ready")) try {
              I[0].contentWindow.document.location && (g.width(D).height(9999), G = I.contents().find("body"), r && G.css("overflow-x", "hidden"), B = G.outerHeight(!0))
            } catch (H) {}
          } else(h.autoWidth || h.autoHeight) && (g.addClass("fancybox-tmp"), h.autoWidth || g.width(D), h.autoHeight || g.height(B), h.autoWidth && (D = g.width()), h.autoHeight && (B = g.height()), g.removeClass("fancybox-tmp"));
          if (c = m(D), k = m(B), E = D / B, n = m(F(n) ? m(n, "w") - A : n), p = m(F(p) ? m(p, "w") - A : p), v = m(F(v) ? m(v, "h") - u : v), q = m(F(q) ? m(q, "h") - u : q), G = p, C = q, h.fitToView && (p = Math.min(a.w - A, p), q = Math.min(a.h - u, q)), A = a.w - z, s = a.h - s, h.aspectRatio ? (c > p && (c = p, k = m(c / E)), k > q && (k = q, c = m(k * E)), c < n && (c = n, k = m(c / E)), k < v && (k = v, c = m(k * E))) : (c = Math.max(n, Math.min(c, p)), h.autoHeight && "iframe" !== h.type && (g.width(c), k = g.height()), k = Math.max(v, Math.min(k, q))), h.fitToView)
            if (g.width(c).height(k), e.width(c + y), a = e.width(), z = e.height(),
              h.aspectRatio)
              for (;
                (a > A || z > s) && c > n && k > v && !(19 < d++);) k = Math.max(v, Math.min(q, k - 10)), c = m(k * E), c < n && (c = n, k = m(c / E)), c > p && (c = p, k = m(c / E)), g.width(c).height(k), e.width(c + y), a = e.width(), z = e.height();
            else c = Math.max(n, Math.min(c, c - (a - A))), k = Math.max(v, Math.min(k, k - (z - s)));
          r && "auto" === t && k < B && c + y + r < A && (c += r), g.width(c).height(k), e.width(c + y), a = e.width(), z = e.height(), e = (a > A || z > s) && c > n && k > v, c = h.aspectRatio ? c < G && k < C && c < D && k < B : (c < G || k < C) && (c < D || k < B), f.extend(h, {
            dim: {
              width: x(a),
              height: x(z)
            },
            origWidth: D,
            origHeight: B,
            canShrink: e,
            canExpand: c,
            wPadding: y,
            hPadding: w,
            wrapSpace: z - l.outerHeight(!0),
            skinSpace: l.height() - k
          }), !I && h.autoHeight && k > v && k < q && !c && g.height("auto")
        },
        _getPosition: function (a) {
          var d = b.current,
            e = b.getViewport(),
            c = d.margin,
            f = b.wrap.width() + c[1] + c[3],
            g = b.wrap.height() + c[0] + c[2],
            c = {
              position: "absolute",
              top: c[0],
              left: c[3]
            };
          return d.autoCenter && d.fixed && !a && g <= e.h && f <= e.w ? c.position = "fixed" : d.locked || (c.top += e.y, c.left += e.x), c.top = x(Math.max(c.top, c.top + (e.h - g) * d.topRatio)), c.left = x(Math.max(c.left, c.left + (e.w - f) * d.leftRatio)), c
        },
        _afterZoomIn: function () {
          var a = b.current;
          a && (b.isOpen = b.isOpened = !0, b.wrap.css("overflow", "visible").addClass("fancybox-opened"), b.update(), (a.closeClick || a.nextClick && 1 < b.group.length) && b.inner.css("cursor", "pointer").bind("click.fb", function (d) {
            f(d.target).is("a") || f(d.target).parent().is("a") || (d.preventDefault(), b[a.closeClick ? "close" : "next"]())
          }), a.closeBtn && f(a.tpl.closeBtn).appendTo(b.skin).bind("click.fb", function (a) {
            a.preventDefault(), b.close()
          }), a.arrows && 1 < b.group.length && ((a.loop || 0 < a.index) && f(a.tpl.prev).appendTo(b.outer).bind("click.fb", b.prev), (a.loop || a.index < b.group.length - 1) && f(a.tpl.next).appendTo(b.outer).bind("click.fb", b.next)), b.trigger("afterShow"), a.loop || a.index !== a.group.length - 1 ? b.opts.autoPlay && !b.player.isActive && (b.opts.autoPlay = !1, b.play(!0)) : b.play(!1))
        },
        _afterZoomOut: function (a) {
          a = a || b.current, f(".fancybox-wrap").trigger("onReset").remove(), f.extend(b, {
            group: {},
            opts: {},
            router: !1,
            current: null,
            isActive: !1,
            isOpened: !1,
            isOpen: !1,
            isClosing: !1,
            wrap: null,
            skin: null,
            outer: null,
            inner: null
          }), b.trigger("afterClose", a)
        }
      }), b.transitions = {
        getOrigPosition: function () {
          var a = b.current,
            d = a.element,
            e = a.orig,
            c = {},
            f = 50,
            g = 50,
            h = a.hPadding,
            k = a.wPadding,
            n = b.getViewport();
          return !e && a.isDom && d.is(":visible") && (e = d.find("img:first"), e.length || (e = d)), u(e) ? (c = e.offset(), e.is("img") && (f = e.outerWidth(), g = e.outerHeight())) : (c.top = n.y + (n.h - g) * a.topRatio, c.left = n.x + (n.w - f) * a.leftRatio), ("fixed" === b.wrap.css("position") || a.locked) && (c.top -= n.y, c.left -= n.x), c = {
            top: x(c.top - h * a.topRatio),
            left: x(c.left - k * a.leftRatio),
            width: x(f + k),
            height: x(g + h)
          }
        },
        step: function (a, d) {
          var e, c, f = d.prop;
          c = b.current;
          var g = c.wrapSpace,
            h = c.skinSpace;
          "width" !== f && "height" !== f || (e = d.end === d.start ? 1 : (a - d.start) / (d.end - d.start), b.isClosing && (e = 1 - e), c = "width" === f ? c.wPadding : c.hPadding, c = a - c, b.skin[f](m("width" === f ? c : c - g * e)), b.inner[f](m("width" === f ? c : c - g * e - h * e)))
        },
        zoomIn: function () {
          var a = b.current,
            d = a.pos,
            e = a.openEffect,
            c = "elastic" === e,
            l = f.extend({
              opacity: 1
            }, d);
          delete l.position, c ? (d = this.getOrigPosition(), a.openOpacity && (d.opacity = .1)) : "fade" === e && (d.opacity = .1), b.wrap.css(d).animate(l, {
            duration: "none" === e ? 0 : a.openSpeed,
            easing: a.openEasing,
            step: c ? this.step : null,
            complete: b._afterZoomIn
          })
        },
        zoomOut: function () {
          var a = b.current,
            d = a.closeEffect,
            e = "elastic" === d,
            c = {
              opacity: .1
            };
          e && (c = this.getOrigPosition(), a.closeOpacity && (c.opacity = .1)), b.wrap.animate(c, {
            duration: "none" === d ? 0 : a.closeSpeed,
            easing: a.closeEasing,
            step: e ? this.step : null,
            complete: b._afterZoomOut
          })
        },
        changeIn: function () {
          var g, a = b.current,
            d = a.nextEffect,
            e = a.pos,
            c = {
              opacity: 1
            },
            f = b.direction;
          e.opacity = .1, "elastic" === d && (g = "down" === f || "up" === f ? "top" : "left", "down" === f || "right" === f ? (e[g] = x(m(e[g]) - 200), c[g] = "+=200px") : (e[g] = x(m(e[g]) + 200), c[g] = "-=200px")), "none" === d ? b._afterZoomIn() : b.wrap.css(e).animate(c, {
            duration: a.nextSpeed,
            easing: a.nextEasing,
            complete: b._afterZoomIn
          })
        },
        changeOut: function () {
          var a = b.previous,
            d = a.prevEffect,
            e = {
              opacity: .1
            },
            c = b.direction;
          "elastic" === d && (e["down" === c || "up" === c ? "top" : "left"] = ("up" === c || "left" === c ? "-" : "+") + "=200px"), a.wrap.animate(e, {
            duration: "none" === d ? 0 : a.prevSpeed,
            easing: a.prevEasing,
            complete: function () {
              f(this).trigger("onReset").remove()
            }
          })
        }
      }, b.helpers.overlay = {
        defaults: {
          closeClick: !0,
          speedOut: 200,
          showEarly: !0,
          css: {},
          locked: !t,
          fixed: !0
        },
        overlay: null,
        fixed: !1,
        el: f("html"),
        create: function (a) {
          var d;
          a = f.extend({}, this.defaults, a), this.overlay && this.close(), d = b.coming ? b.coming.parent : a.parent, this.overlay = f('<div class="fancybox-overlay"></div>').appendTo(d && d.lenth ? d : "body"), this.fixed = !1, a.fixed && b.defaults.fixed && (this.overlay.addClass("fancybox-overlay-fixed"), this.fixed = !0)
        },
        open: function (a) {
          var d = this;
          a = f.extend({}, this.defaults, a), this.overlay ? this.overlay.unbind(".overlay").width("auto").height("auto") : this.create(a), this.fixed || (q.bind("resize.overlay", f.proxy(this.update, this)), this.update()), a.closeClick && this.overlay.bind("click.overlay", function (a) {
            if (f(a.target).hasClass("fancybox-overlay")) return b.isActive ? b.close() : d.close(), !1
          }), this.overlay.css(a.css).show()
        },
        close: function () {
          q.unbind("resize.overlay"), this.el.hasClass("fancybox-lock") && (f(".fancybox-margin").removeClass("fancybox-margin"), this.el.removeClass("fancybox-lock"), q.scrollTop(this.scrollV).scrollLeft(this.scrollH)), f(".fancybox-overlay").remove().hide(), f.extend(this, {
            overlay: null,
            fixed: !1
          })
        },
        update: function () {
          var b, a = "100%";
          this.overlay.width(a).height("100%"), J ? (b = Math.max(H.documentElement.offsetWidth, H.body.offsetWidth), p.width() > b && (a = p.width())) : p.width() > q.width() && (a = p.width()), this.overlay.width(a).height(p.height())
        },
        onReady: function (a, b) {
          var e = this.overlay;
          f(".fancybox-overlay").stop(!0, !0), e || this.create(a), a.locked && this.fixed && b.fixed && (b.locked = this.overlay.append(b.wrap), b.fixed = !1), !0 === a.showEarly && this.beforeShow.apply(this, arguments)
        },
        beforeShow: function (a, b) {
          b.locked && !this.el.hasClass("fancybox-lock") && (!1 !== this.fixPosition && f("*").filter(function () {
            return "fixed" === f(this).css("position") && !f(this).hasClass("fancybox-overlay") && !f(this).hasClass("fancybox-wrap")
          }).addClass("fancybox-margin"), this.el.addClass("fancybox-margin"), this.scrollV = q.scrollTop(), this.scrollH = q.scrollLeft(), this.el.addClass("fancybox-lock"), q.scrollTop(this.scrollV).scrollLeft(this.scrollH)), this.open(a)
        },
        onUpdate: function () {
          this.fixed || this.update()
        },
        afterClose: function (a) {
          this.overlay && !b.coming && this.overlay.fadeOut(a.speedOut, f.proxy(this.close, this))
        }
      }, b.helpers.title = {
        defaults: {
          type: "float",
          position: "bottom"
        },
        beforeShow: function (a) {
          var d = b.current,
            e = d.title,
            c = a.type;
          if (f.isFunction(e) && (e = e.call(d.element, d)), r(e) && "" !== f.trim(e)) {
            switch (d = f('<div class="fancybox-title fancybox-title-' + c + '-wrap">' + e + "</div>"), c) {
              case "inside":
                c = b.skin;
                break;
              case "outside":
                c = b.wrap;
                break;
              case "over":
                c = b.inner;
                break;
              default:
                c = b.skin, d.appendTo("body"), J && d.width(d.width()), d.wrapInner('<span class="child"></span>'), b.current.margin[2] += Math.abs(m(d.css("margin-bottom")))
            }
            d["top" === a.position ? "prependTo" : "appendTo"](c)
          }
        }
      }, f.fn.fancybox = function (a) {
        var d, e = f(this),
          c = this.selector || "",
          l = function (g) {
            var l, m, h = f(this).blur(),
              k = d;
            g.ctrlKey || g.altKey || g.shiftKey || g.metaKey || h.is(".fancybox-wrap") || (l = a.groupAttr || "data-fancybox-group", m = h.attr(l), m || (l = "rel", m = h.get(0)[l]), m && "" !== m && "nofollow" !== m && (h = c.length ? f(c) : e, h = h.filter("[" + l + '="' + m + '"]'), k = h.index(this)), a.index = k, !1 !== b.open(h, a) && g.preventDefault())
          };
        return a = a || {}, d = a.index || 0, c && !1 !== a.live ? p.undelegate(c, "click.fb-start").delegate(c + ":not('.fancybox-item, .fancybox-nav')", "click.fb-start", l) : e.unbind("click.fb-start").bind("click.fb-start", l), this.filter("[data-fancybox-start=1]").trigger("click"), this
      }, p.ready(function () {
        var a, d;
        f.scrollbarWidth === w && (f.scrollbarWidth = function () {
          var a = f('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo("body"),
            b = a.children(),
            b = b.innerWidth() - b.height(99).innerWidth();
          return a.remove(), b
        }), f.support.fixedPosition === w && (f.support.fixedPosition = function () {
          var a = f('<div style="position:fixed;top:20px;"></div>').appendTo("body"),
            b = 20 === a[0].offsetTop || 15 === a[0].offsetTop;
          return a.remove(), b
        }()), f.extend(b.defaults, {
          scrollbarWidth: f.scrollbarWidth(),
          fixed: f.support.fixedPosition,
          parent: f("body")
        }), a = f(s).width(), K.addClass("fancybox-lock-test"), d = f(s).width(), K.removeClass("fancybox-lock-test"), f("<style type='text/css'>.fancybox-margin{margin-right:" + (d - a) + "px;}</style>").appendTo("head")
      })
    }(window, document, jQuery),
    function ($) {
      "use strict";
      var format = function (url, rez, params) {
        return params = params || "", "object" === $.type(params) && (params = $.param(params, !0)), $.each(rez, function (key, value) {
          url = url.replace("$" + key, value || "")
        }), params.length && (url += (url.indexOf("?") > 0 ? "&" : "?") + params), url
      };
      $.fancybox.helpers.media = {
        defaults: {
          youtube: {
            matcher: /(youtube\.com|youtu\.be|youtube-nocookie\.com)\/(watch\?v=|v\/|u\/|embed\/?)?(videoseries\?list=(.*)|[\w-]{11}|\?listType=(.*)&list=(.*)).*/i,
            params: {
              autoplay: 1,
              autohide: 1,
              fs: 1,
              rel: 0,
              hd: 1,
              wmode: "opaque",
              enablejsapi: 1
            },
            type: "iframe",
            url: "//www.youtube.com/embed/$3"
          },
          vimeo: {
            matcher: /(?:vimeo(?:pro)?.com)\/(?:[^\d]+)?(\d+)(?:.*)/,
            params: {
              autoplay: 1,
              hd: 1,
              show_title: 1,
              show_byline: 1,
              show_portrait: 0,
              fullscreen: 1
            },
            type: "iframe",
            url: "//player.vimeo.com/video/$1"
          },
          metacafe: {
            matcher: /metacafe.com\/(?:watch|fplayer)\/([\w\-]{1,10})/,
            params: {
              autoPlay: "yes"
            },
            type: "swf",
            url: function (rez, params, obj) {
              return obj.swf.flashVars = "playerVars=" + $.param(params, !0), "//www.metacafe.com/fplayer/" + rez[1] + "/.swf"
            }
          },
          dailymotion: {
            matcher: /dailymotion.com\/video\/(.*)\/?(.*)/,
            params: {
              additionalInfos: 0,
              autoStart: 1
            },
            type: "swf",
            url: "//www.dailymotion.com/swf/video/$1"
          },
          twitvid: {
            matcher: /twitvid\.com\/([a-zA-Z0-9_\-\?\=]+)/i,
            params: {
              autoplay: 0
            },
            type: "iframe",
            url: "//www.twitvid.com/embed.php?guid=$1"
          },
          twitpic: {
            matcher: /twitpic\.com\/(?!(?:place|photos|events)\/)([a-zA-Z0-9\?\=\-]+)/i,
            type: "image",
            url: "//twitpic.com/show/full/$1/"
          },
          instagram: {
            matcher: /(instagr\.am|instagram\.com)\/p\/([a-zA-Z0-9_\-]+)\/?/i,
            type: "image",
            url: "//$1/p/$2/media/?size=l"
          },
          google_maps: {
            matcher: /maps\.google\.([a-z]{2,3}(\.[a-z]{2})?)\/(\?ll=|maps\?)(.*)/i,
            type: "iframe",
            url: function (rez) {
              return "//maps.google." + rez[1] + "/" + rez[3] + rez[4] + "&output=" + (rez[4].indexOf("layer=c") > 0 ? "svembed" : "embed")
            }
          }
        },
        beforeLoad: function (opts, obj) {
          var what, item, rez, params, url = obj.href || "",
            type = !1;
          for (what in opts)
            if (opts.hasOwnProperty(what) && (item = opts[what], rez = url.match(item.matcher))) {
              type = item.type, params = $.extend(!0, {}, item.params, obj[what] || ($.isPlainObject(opts[what]) ? opts[what].params : null)), url = "function" === $.type(item.url) ? item.url.call(this, rez, params, obj) : format(item.url, rez, params);
              break
            }
          type && (obj.href = url, obj.type = type, obj.autoHeight = !1)
        }
      }
    }(jQuery),
    function ($, window, document, undefined) {
      function CustomMenu(element, options) {
        this.element = element, this.options = $.extend({}, defaults, options), this._defaults = defaults, this._name = pluginName, this.init()
      }
      var pluginName = "MegaMenu",
        defaults = {
          propertyName: "value"
        },
        menus = [];
      CustomMenu.prototype = {
        isOpen: !1,
        timeout: null,
        init: function () {
          var that = this;
          $(this).each(function (index, menu) {
            that.node = menu.element, that.addListeners(menu.element);
            var $menu = $(menu.element);
            $menu.addClass("dropdownJavascript"), menus.push(menu.element), $menu.find("ul > li").each(function (index, submenu) {
              $(submenu).find("ul").length > 0 && $(submenu).addClass("with-menu")
            })
          })
        },
        addListeners: function (menu) {
          var that = this;
          $(menu).mouseover(function (e) {
            that.handleMouseOver.call(that, e)
          }).mouseout(function (e) {
            that.handleMouseOut.call(that, e)
          })
        },
        handleMouseOver: function (e) {
          var that = this;
          this.clearTimeout();
          for (var item = e.target || e.srcElement;
            "LI" != item.nodeName && item != this.node;) item = item.parentNode;
          "LI" == item.nodeName && (this.toOpen = item, this.timeout = setTimeout(function () {
            that.open.call(that)
          }, this.options.delay))
        },
        handleMouseOut: function () {
          var that = this;
          this.clearTimeout();
          var _delayOut = this.options.delay;
          _delayOut = 400, this.timeout = setTimeout(function () {
            that.close.call(that)
          }, _delayOut)
        },
        clearTimeout: function () {
          this.timeout && (clearTimeout(this.timeout), this.timeout = null)
        },
        open: function () {
          var that = this;
          this.isOpen = !0;
          var items = $(this.toOpen).parent().children("li");
          $(items).each(function (index, item) {
            $(item).find("ul").each(function (index, submenu) {
              if (item != that.toOpen) $(item).removeClass("dropdownOpen"), that.close(item);
              else if (!$(item).hasClass("dropdownOpen")) {
                $(item).addClass("dropdownOpen");
                for (var left = 0, node = submenu; node;) left += Math.abs(node.offsetLeft), node = node.offsetParent;
                var right = left + submenu.offsetWidth;
                $(submenu).outerHeight(), $(submenu).offset().top, $(window).scrollTop(), window.innerHeight;
                $(item).removeClass("dropdownRightToLeft"), left < 0 && $(item).addClass("dropdownLeftToRight"), right > document.body.clientWidth && $(item).addClass("dropdownRightToLeft")
              }
            })
          })
        },
        close: function (node) {
          node || (this.isOpen = !1, node = this.node), $(node).find("li").each(function (index, item) {
            $(item).removeClass("dropdownOpen")
          })
        }
      }, $.fn[pluginName] = function (options) {
        return this.each(function () {
          $.data(this, "plugin_" + pluginName) || $.data(this, "plugin_" + pluginName, new CustomMenu(this, options))
        })
      }
    }(jQuery, window, document),
    function (window, document, undefined) {
      function is(obj, type) {
        return typeof obj === type
      }

      function cssToDOM(name) {
        return name.replace(/([a-z])-([a-z])/g, function (str, m1, m2) {
          return m1 + m2.toUpperCase()
        }).replace(/^-/, "")
      }

      function contains(str, substr) {
        return !!~("" + str).indexOf(substr)
      }

      function createElement() {
        return "function" != typeof document.createElement ? document.createElement(arguments[0]) : isSVG ? document.createElementNS.call(document, "http://www.w3.org/2000/svg", arguments[0]) : document.createElement.apply(document, arguments)
      }

      function getBody() {
        var body = document.body;
        return body || (body = createElement(isSVG ? "svg" : "body"), body.fake = !0), body
      }

      function injectElementWithStyles(rule, callback, nodes, testnames) {
        var style, ret, node, docOverflow, mod = "modernizr",
          div = createElement("div"),
          body = getBody();
        if (parseInt(nodes, 10))
          for (; nodes--;) node = createElement("div"), node.id = testnames ? testnames[nodes] : mod + (nodes + 1), div.appendChild(node);
        return style = createElement("style"), style.type = "text/css", style.id = "s" + mod, (body.fake ? body : div).appendChild(style), body.appendChild(div), style.styleSheet ? style.styleSheet.cssText = rule : style.appendChild(document.createTextNode(rule)), div.id = mod, body.fake && (body.style.background = "", body.style.overflow = "hidden", docOverflow = docElement.style.overflow, docElement.style.overflow = "hidden", docElement.appendChild(body)), ret = callback(div, rule), body.fake ? (body.parentNode.removeChild(body), docElement.style.overflow = docOverflow, docElement.offsetHeight) : div.parentNode.removeChild(div), !!ret
      }

      function fnBind(fn, that) {
        return function () {
          return fn.apply(that, arguments)
        }
      }

      function testDOMProps(props, obj, elem) {
        var item;
        for (var i in props)
          if (props[i] in obj) return !1 === elem ? props[i] : (item = obj[props[i]], is(item, "function") ? fnBind(item, elem || obj) : item);
        return !1
      }

      function domToCSS(name) {
        return name.replace(/([A-Z])/g, function (str, m1) {
          return "-" + m1.toLowerCase()
        }).replace(/^ms-/, "-ms-")
      }

      function nativeTestProps(props, value) {
        var i = props.length;
        if ("CSS" in window && "supports" in window.CSS) {
          for (; i--;)
            if (window.CSS.supports(domToCSS(props[i]), value)) return !0;
          return !1
        }
        if ("CSSSupportsRule" in window) {
          for (var conditionText = []; i--;) conditionText.push("(" + domToCSS(props[i]) + ":" + value + ")");
          return conditionText = conditionText.join(" or "), injectElementWithStyles("@supports (" + conditionText + ") { #modernizr { position: absolute; } }", function (node) {
            return "absolute" == getComputedStyle(node, null).position
          })
        }
        return undefined
      }

      function testProps(props, prefixed, value, skipValueTest) {
        function cleanElems() {
          afterInit && (delete mStyle.style, delete mStyle.modElem)
        }
        if (skipValueTest = !is(skipValueTest, "undefined") && skipValueTest, !is(value, "undefined")) {
          var result = nativeTestProps(props, value);
          if (!is(result, "undefined")) return result
        }
        for (var afterInit, i, propsLength, prop, before, elems = ["modernizr", "tspan", "samp"]; !mStyle.style && elems.length;) afterInit = !0, mStyle.modElem = createElement(elems.shift()), mStyle.style = mStyle.modElem.style;
        for (propsLength = props.length, i = 0; i < propsLength; i++)
          if (prop = props[i], before = mStyle.style[prop], contains(prop, "-") && (prop = cssToDOM(prop)), mStyle.style[prop] !== undefined) {
            if (skipValueTest || is(value, "undefined")) return cleanElems(), "pfx" != prefixed || prop;
            try {
              mStyle.style[prop] = value
            } catch (e) {}
            if (mStyle.style[prop] != before) return cleanElems(), "pfx" != prefixed || prop
          }
        return cleanElems(), !1
      }

      function testPropsAll(prop, prefixed, elem, value, skipValueTest) {
        var ucProp = prop.charAt(0).toUpperCase() + prop.slice(1),
          props = (prop + " " + cssomPrefixes.join(ucProp + " ") + ucProp).split(" ");
        return is(prefixed, "string") || is(prefixed, "undefined") ? testProps(props, prefixed, value, skipValueTest) : (props = (prop + " " + domPrefixes.join(ucProp + " ") + ucProp).split(" "), testDOMProps(props, prefixed, elem))
      }

      function testAllProps(prop, value, skipValueTest) {
        return testPropsAll(prop, undefined, undefined, value, skipValueTest)
      }
      var classes = [],
        tests = [],
        ModernizrProto = {
          _version: "3.3.1",
          _config: {
            classPrefix: "",
            enableClasses: !0,
            enableJSClass: !0,
            usePrefixes: !0
          },
          _q: [],
          on: function (test, cb) {
            var self = this;
            setTimeout(function () {
              cb(self[test])
            }, 0)
          },
          addTest: function (name, fn, options) {
            tests.push({
              name: name,
              fn: fn,
              options: options
            })
          },
          addAsyncTest: function (fn) {
            tests.push({
              name: null,
              fn: fn
            })
          }
        },
        Modernizr = function () {};
      Modernizr.prototype = ModernizrProto, Modernizr = new Modernizr;
      var prefixes = ModernizrProto._config.usePrefixes ? " -webkit- -moz- -o- -ms- ".split(" ") : ["", ""];
      ModernizrProto._prefixes = prefixes;
      var docElement = document.documentElement,
        isSVG = "svg" === docElement.nodeName.toLowerCase();
      isSVG || function (window, document) {
        function addStyleSheet(ownerDocument, cssText) {
          var p = ownerDocument.createElement("p"),
            parent = ownerDocument.getElementsByTagName("head")[0] || ownerDocument.documentElement;
          return p.innerHTML = "x<style>" + cssText + "</style>", parent.insertBefore(p.lastChild, parent.firstChild)
        }

        function getElements() {
          var elements = html5.elements;
          return "string" == typeof elements ? elements.split(" ") : elements
        }

        function addElements(newElements, ownerDocument) {
          var elements = html5.elements;
          "string" != typeof elements && (elements = elements.join(" ")), "string" != typeof newElements && (newElements = newElements.join(" ")), html5.elements = elements + " " + newElements, shivDocument(ownerDocument)
        }

        function getExpandoData(ownerDocument) {
          var data = expandoData[ownerDocument[expando]];
          return data || (data = {}, expanID++, ownerDocument[expando] = expanID, expandoData[expanID] = data), data
        }

        function createElement(nodeName, ownerDocument, data) {
          if (ownerDocument || (ownerDocument = document), supportsUnknownElements) return ownerDocument.createElement(nodeName);
          data || (data = getExpandoData(ownerDocument));
          var node;
          return node = data.cache[nodeName] ? data.cache[nodeName].cloneNode() : saveClones.test(nodeName) ? (data.cache[nodeName] = data.createElem(nodeName)).cloneNode() : data.createElem(nodeName), !node.canHaveChildren || reSkip.test(nodeName) || node.tagUrn ? node : data.frag.appendChild(node)
        }

        function createDocumentFragment(ownerDocument, data) {
          if (ownerDocument || (ownerDocument = document), supportsUnknownElements) return ownerDocument.createDocumentFragment();
          data = data || getExpandoData(ownerDocument);
          for (var clone = data.frag.cloneNode(), i = 0, elems = getElements(), l = elems.length; i < l; i++) clone.createElement(elems[i]);
          return clone
        }

        function shivMethods(ownerDocument, data) {
          data.cache || (data.cache = {}, data.createElem = ownerDocument.createElement, data.createFrag = ownerDocument.createDocumentFragment, data.frag = data.createFrag()), ownerDocument.createElement = function (nodeName) {
            return html5.shivMethods ? createElement(nodeName, ownerDocument, data) : data.createElem(nodeName)
          }, ownerDocument.createDocumentFragment = Function("h,f", "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + getElements().join().replace(/[\w\-:]+/g, function (nodeName) {
            return data.createElem(nodeName), data.frag.createElement(nodeName), 'c("' + nodeName + '")'
          }) + ");return n}")(html5, data.frag)
        }

        function shivDocument(ownerDocument) {
          ownerDocument || (ownerDocument = document);
          var data = getExpandoData(ownerDocument);
          return !html5.shivCSS || supportsHtml5Styles || data.hasCSS || (data.hasCSS = !!addStyleSheet(ownerDocument, "article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")), supportsUnknownElements || shivMethods(ownerDocument, data), ownerDocument
        }
        var supportsHtml5Styles, supportsUnknownElements, options = window.html5 || {},
          reSkip = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,
          saveClones = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,
          expando = "_html5shiv",
          expanID = 0,
          expandoData = {};
        ! function () {
          try {
            var a = document.createElement("a");
            a.innerHTML = "<xyz></xyz>", supportsHtml5Styles = "hidden" in a, supportsUnknownElements = 1 == a.childNodes.length || function () {
              document.createElement("a");
              var frag = document.createDocumentFragment();
              return void 0 === frag.cloneNode || void 0 === frag.createDocumentFragment || void 0 === frag.createElement
            }()
          } catch (e) {
            supportsHtml5Styles = !0, supportsUnknownElements = !0
          }
        }();
        var html5 = {
          elements: options.elements || "abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output picture progress section summary template time video",
          version: "3.7.3",
          shivCSS: !1 !== options.shivCSS,
          supportsUnknownElements: supportsUnknownElements,
          shivMethods: !1 !== options.shivMethods,
          type: "default",
          shivDocument: shivDocument,
          createElement: createElement,
          createDocumentFragment: createDocumentFragment,
          addElements: addElements
        };
        window.html5 = html5, shivDocument(document), "object" == typeof module && module.exports && (module.exports = html5)
      }(void 0 !== window ? window : this, document);
      var omPrefixes = "Moz O ms Webkit",
        domPrefixes = ModernizrProto._config.usePrefixes ? omPrefixes.toLowerCase().split(" ") : [];
      ModernizrProto._domPrefixes = domPrefixes;
      var cssomPrefixes = ModernizrProto._config.usePrefixes ? omPrefixes.split(" ") : [];
      ModernizrProto._cssomPrefixes = cssomPrefixes;
      var atRule = function (prop) {
        var rule, length = prefixes.length,
          cssrule = window.CSSRule;
        if (void 0 === cssrule) return undefined;
        if (!prop) return !1;
        if (prop = prop.replace(/^@/, ""), (rule = prop.replace(/-/g, "_").toUpperCase() + "_RULE") in cssrule) return "@" + prop;
        for (var i = 0; i < length; i++) {
          var prefix = prefixes[i];
          if (prefix.toUpperCase() + "_" + rule in cssrule) return "@-" + prefix.toLowerCase() + "-" + prop
        }
        return !1
      };
      ModernizrProto.atRule = atRule;
      var testStyles = ModernizrProto.testStyles = injectElementWithStyles,
        modElem = {
          elem: createElement("modernizr")
        };
      Modernizr._q.push(function () {
        delete modElem.elem
      });
      var mStyle = {
        style: modElem.elem.style
      };
      Modernizr._q.unshift(function () {
        delete mStyle.style
      });
      ModernizrProto.testProp = function (prop, value, useValue) {
        return testProps([prop], undefined, value, useValue)
      };
      ModernizrProto.testAllProps = testPropsAll;
      ModernizrProto.prefixed = function (prop, obj, elem) {
        return 0 === prop.indexOf("@") ? atRule(prop) : (-1 != prop.indexOf("-") && (prop = cssToDOM(prop)), obj ? testPropsAll(prop, obj, elem) : testPropsAll(prop, "pfx"))
      };
      ModernizrProto.testAllProps = testAllProps, Modernizr.addTest("cssanimations", testAllProps("animationName", "a", !0)), Modernizr.addTest("csstransitions", testAllProps("transition", "all", !0)), Modernizr.addTest("touchevents", function () {
          var bool;
          if ("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch) bool = !0;
          else {
            var query = ["@media (", prefixes.join("touch-enabled),("), "heartz", ")", "{#modernizr{top:9px;position:absolute}}"].join("");
            testStyles(query, function (node) {
              bool = 9 === node.offsetTop
            })
          }
          return bool
        }),
        function () {
          var featureNames, feature, aliasIdx, result, nameIdx, featureName, featureNameSplit;
          for (var featureIdx in tests)
            if (tests.hasOwnProperty(featureIdx)) {
              if (featureNames = [], feature = tests[featureIdx], feature.name && (featureNames.push(feature.name.toLowerCase()), feature.options && feature.options.aliases && feature.options.aliases.length))
                for (aliasIdx = 0; aliasIdx < feature.options.aliases.length; aliasIdx++) featureNames.push(feature.options.aliases[aliasIdx].toLowerCase());
              for (result = is(feature.fn, "function") ? feature.fn() : feature.fn, nameIdx = 0; nameIdx < featureNames.length; nameIdx++) featureName = featureNames[nameIdx], featureNameSplit = featureName.split("."), 1 === featureNameSplit.length ? Modernizr[featureNameSplit[0]] = result : (!Modernizr[featureNameSplit[0]] || Modernizr[featureNameSplit[0]] instanceof Boolean || (Modernizr[featureNameSplit[0]] = new Boolean(Modernizr[featureNameSplit[0]])), Modernizr[featureNameSplit[0]][featureNameSplit[1]] = result), classes.push((result ? "" : "no-") + featureNameSplit.join("-"))
            }
        }(),
        function (classes) {
          var className = docElement.className,
            classPrefix = Modernizr._config.classPrefix || "";
          if (isSVG && (className = className.baseVal), Modernizr._config.enableJSClass) {
            var reJS = new RegExp("(^|\\s)" + classPrefix + "no-js(\\s|$)");
            className = className.replace(reJS, "$1" + classPrefix + "js$2")
          }
          Modernizr._config.enableClasses && (className += " " + classPrefix + classes.join(" " + classPrefix), isSVG ? docElement.className.baseVal = className : docElement.className = className)
        }(classes), delete ModernizrProto.addTest, delete ModernizrProto.addAsyncTest;
      for (var i = 0; i < Modernizr._q.length; i++) Modernizr._q[i]();
      window.Modernizr = Modernizr
    }(window, document), $(function () {
      ParallaxScroll.init()
    });
  var ParallaxScroll = {
    showLogs: !1,
    round: 1e3,
    init: function () {
      if (this._log("init"), this._inited) return this._log("Already Inited"), void(this._inited = !0);
      this._requestAnimationFrame = function () {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback, element) {
          window.setTimeout(callback, 1e3 / 60)
        }
      }(), this._onScroll(!0)
    },
    _inited: !1,
    _properties: ["x", "y", "z", "rotateX", "rotateY", "rotateZ", "scaleX", "scaleY", "scaleZ", "scale"],
    _requestAnimationFrame: null,
    _log: function (message) {
      this.showLogs && console.log("Parallax Scroll / " + message)
    },
    _onScroll: function (noSmooth) {
      var scroll = $(document).scrollTop(),
        windowHeight = $(window).height();
      this._log("onScroll " + scroll), $("[data-parallax]").each($.proxy(function (index, el) {
        var $el = $(el),
          properties = [],
          applyProperties = !1,
          style = $el.data("style");
        void 0 == style && (style = $el.attr("style") || "", $el.data("style", style));
        var iData, datas = [$el.data("parallax")];
        for (iData = 2; $el.data("parallax" + iData); iData++) datas.push($el.data("parallax-" + iData));
        var datasLength = datas.length;
        for (iData = 0; iData < datasLength; iData++) {
          var data = datas[iData],
            scrollFrom = data["from-scroll"];
          void 0 == scrollFrom && (scrollFrom = Math.max(0, $(el).offset().top - windowHeight)), scrollFrom |= 0;
          var scrollDistance = data.distance,
            scrollTo = data["to-scroll"];
          void 0 == scrollDistance && void 0 == scrollTo && (scrollDistance = windowHeight), scrollDistance = Math.max(0 | scrollDistance, 1);
          var easing = data.easing,
            easingReturn = data["easing-return"];
          if (void 0 != easing && $.easing && $.easing[easing] || (easing = null), void 0 != easingReturn && $.easing && $.easing[easingReturn] || (easingReturn = easing), easing) {
            var totalTime = data.duration;
            void 0 == totalTime && (totalTime = scrollDistance), totalTime = Math.max(0 | totalTime, 1);
            var totalTimeReturn = data["duration-return"];
            void 0 == totalTimeReturn && (totalTimeReturn = totalTime), scrollDistance = 1;
            var currentTime = $el.data("current-time");
            void 0 == currentTime && (currentTime = 0)
          }
          void 0 == scrollTo && (scrollTo = scrollFrom + scrollDistance), scrollTo |= 0;
          var smoothness = data.smoothness;
          void 0 == smoothness && (smoothness = 30), smoothness |= 0, (noSmooth || 0 == smoothness) && (smoothness = 1), smoothness |= 0;
          var scrollCurrent = scroll;
          scrollCurrent = Math.max(scrollCurrent, scrollFrom), scrollCurrent = Math.min(scrollCurrent, scrollTo), easing && (void 0 == $el.data("sens") && $el.data("sens", "back"), scrollCurrent > scrollFrom && ("back" == $el.data("sens") ? (currentTime = 1, $el.data("sens", "go")) : currentTime++), scrollCurrent < scrollTo && ("go" == $el.data("sens") ? (currentTime = 1, $el.data("sens", "back")) : currentTime++), noSmooth && (currentTime = totalTime), $el.data("current-time", currentTime)), this._properties.map($.proxy(function (prop) {
            var defaultProp = 0,
              to = data[prop];
            if (void 0 != to) {
              "scale" == prop || "scaleX" == prop || "scaleY" == prop || "scaleZ" == prop ? defaultProp = 1 : to |= 0;
              var prev = $el.data("_" + prop);
              void 0 == prev && (prev = defaultProp);
              var next = (scrollCurrent - scrollFrom) / (scrollTo - scrollFrom) * (to - defaultProp) + defaultProp,
                val = prev + (next - prev) / smoothness;
              if (easing && currentTime > 0 && currentTime <= totalTime) {
                var from = defaultProp;
                "back" == $el.data("sens") && (from = to, to = -to, easing = easingReturn, totalTime = totalTimeReturn), val = $.easing[easing](null, currentTime, from, to, totalTime)
              }
              val = Math.ceil(val * this.round) / this.round, val == prev && next == to && (val = to), properties[prop] || (properties[prop] = 0), properties[prop] += val, prev != properties[prop] && ($el.data("_" + prop, properties[prop]), applyProperties = !0)
            }
          }, this))
        }
        if (applyProperties) {
          if (void 0 != properties.z) {
            var perspective = data.perspective;
            void 0 == perspective && (perspective = 800);
            var $parent = $el.parent();
            $parent.data("style") || $parent.data("style", $parent.attr("style") || ""), $parent.attr("style", "perspective:" + perspective + "px; -webkit-perspective:" + perspective + "px; " + $parent.data("style"))
          }
          void 0 == properties.scaleX && (properties.scaleX = 1), void 0 == properties.scaleY && (properties.scaleY = 1), void 0 == properties.scaleZ && (properties.scaleZ = 1), void 0 != properties.scale && (properties.scaleX *= properties.scale, properties.scaleY *= properties.scale, properties.scaleZ *= properties.scale);
          var translate3d = "translate3d(" + (properties.x ? properties.x : 0) + "px, " + (properties.y ? properties.y : 0) + "px, " + (properties.z ? properties.z : 0) + "px)",
            rotate3d = "rotateX(" + (properties.rotateX ? properties.rotateX : 0) + "deg) rotateY(" + (properties.rotateY ? properties.rotateY : 0) + "deg) rotateZ(" + (properties.rotateZ ? properties.rotateZ : 0) + "deg)",
            scale3d = "scaleX(" + properties.scaleX + ") scaleY(" + properties.scaleY + ") scaleZ(" + properties.scaleZ + ")",
            cssTransform = translate3d + " " + rotate3d + " " + scale3d + ";";
          this._log(cssTransform), $el.attr("style", "transform:" + cssTransform + " -webkit-transform:" + cssTransform + " " + style)
        }
      }, this)), window.requestAnimationFrame ? window.requestAnimationFrame($.proxy(this._onScroll, this, !1)) : this._requestAnimationFrame($.proxy(this._onScroll, this, !1))
    }
  };
  ! function ($, window, undefined) {
    "use strict";
    var Modernizr = window.Modernizr,
      $body = $("body");
    $.DLMenu = function (options, element) {
      this.$el = $(element), this._init(options)
    }, $.DLMenu.defaults = {
      animationClasses: {
        classin: "mk-vm-animate-in-" + mk_vertical_header_anim,
        classout: "mk-vm-animate-out-" + mk_vertical_header_anim
      },
      onLevelClick: function (el, name) {
        return !1
      },
      onLinkClick: function (el, ev) {
        return !1
      }
    }, $.DLMenu.prototype = {
      _init: function (options) {
        this.options = $.extend(!0, {}, $.DLMenu.defaults, options), this._config();
        var animEndEventNames = {
            WebkitAnimation: "webkitAnimationEnd",
            OAnimation: "oAnimationEnd",
            msAnimation: "MSAnimationEnd",
            animation: "animationend"
          },
          transEndEventNames = {
            WebkitTransition: "webkitTransitionEnd",
            MozTransition: "transitionend",
            OTransition: "oTransitionEnd",
            msTransition: "MSTransitionEnd",
            transition: "transitionend"
          };
        this.animEndEventName = animEndEventNames[Modernizr.prefixed("animation")] + ".dlmenu", this.transEndEventName = transEndEventNames[Modernizr.prefixed("transition")] + ".dlmenu", this.animEndEventNameUnsufixed = animEndEventNames[Modernizr.prefixed("animation")], this.transEndEventNameUnsufixed = transEndEventNames[Modernizr.prefixed("transition")], this.supportAnimations = Modernizr.cssanimations, this.supportTransitions = Modernizr.csstransitions, this._initEvents()
      },
      _config: function () {
        this.open = !1, this.$trigger = this.$el.children(".mk-vm-trigger"), this.$menu = this.$el.children("ul.mk-vm-menu"), this.$menuitems = this.$menu.find("li:not(.mk-vm-back)"), this.$back = this.$menu.find("li.mk-vm-back")
      },
      _initEvents: function () {
        var self = this;
        $(".mk-vm-menuwrapper a").on("transitionend", function (event) {
          event.stopPropagation()
        }), this.$menuitems.on("click.dlmenu", "a", function (event) {
          var $item = $(event.delegateTarget),
            $submenu = $(event.currentTarget).siblings("ul.sub-menu");
          if ($submenu.length > 0) {
            var $flyin = $submenu.clone().css("opacity", 0).insertAfter(self.$menu),
              onAnimationEndFn = function () {
                var $parent = $item.parents(".mk-vm-subviewopen:first");
                self.$menu.off(self.animEndEventName).removeClass(self.options.animationClasses.classout).addClass("mk-vm-subview"), $item.addClass("mk-vm-subviewopen"),
                  $parent.removeClass("mk-vm-subviewopen").addClass("mk-vm-subview"), $flyin.remove();
                var $txt = $item.find(".meni-item-text");
                $txt.css("opacity", .99), setTimeout(function () {
                  $txt.css("opacity", 1)
                }, 0)
              };
            return setTimeout(function () {
              $flyin.addClass(self.options.animationClasses.classin), self.$menu.addClass(self.options.animationClasses.classout), self.supportAnimations ? self.$menu.on(self.animEndEventName, onAnimationEndFn) : onAnimationEndFn.call(), self.options.onLevelClick($item, $item.children("a:first").text())
            }), !1
          }
          self.options.onLinkClick($item, event)
        }), this.$back.on("click.dlmenu", function (event) {
          var $this = $(this),
            $submenu = $this.parents("ul.sub-menu:first"),
            $item = $submenu.parent(),
            $flyin = $submenu.clone().insertAfter(self.$menu),
            onAnimationEndFn = function () {
              self.$menu.off(self.animEndEventName).removeClass(self.options.animationClasses.classin), $flyin.remove()
            };
          return setTimeout(function () {
            $flyin.addClass(self.options.animationClasses.classout), self.$menu.addClass(self.options.animationClasses.classin), self.supportAnimations ? self.$menu.on(self.animEndEventName, onAnimationEndFn) : onAnimationEndFn.call(), $item.removeClass("mk-vm-subviewopen");
            var $subview = $this.parents(".mk-vm-subview:first");
            $subview.is("li") && $subview.addClass("mk-vm-subviewopen"), $subview.removeClass("mk-vm-subview")
          }), !1
        })
      },
      closeMenu: function () {
        this.open && this._closeMenu()
      },
      _closeMenu: function () {
        var self = this,
          onTransitionEndFn = function () {
            self.$menu.off(self.transEndEventName), self._resetMenu()
          };
        this.$menu.removeClass("mk-vm-menuopen"), this.$menu.addClass("mk-vm-menu-toggle"), this.$trigger.removeClass("mk-vm-active"), this.supportTransitions ? this.$menu.on(this.transEndEventName, onTransitionEndFn) : onTransitionEndFn.call(), this.open = !1
      },
      openMenu: function () {
        this.open || this._openMenu()
      },
      _openMenu: function () {
        var self = this;
        $body.off("click").on("click.dlmenu", function () {
          self._closeMenu()
        }), this.$menu.addClass("mk-vm-menuopen mk-vm-menu-toggle").on(this.transEndEventName, function () {
          $(this).removeClass("mk-vm-menu-toggle")
        }), this.$trigger.addClass("mk-vm-active"), this.open = !0
      },
      _resetMenu: function () {
        this.$menu.removeClass("mk-vm-subview"), this.$menuitems.removeClass("mk-vm-subview mk-vm-subviewopen")
      }
    };
    var logError = function (message) {
      window.console && window.console.error(message)
    };
    $.fn.dlmenu = function (options) {
      if ("string" == typeof options) {
        var args = Array.prototype.slice.call(arguments, 1);
        this.each(function () {
          var instance = $.data(this, "dlmenu");
          return instance ? $.isFunction(instance[options]) && "_" !== options.charAt(0) ? void instance[options].apply(instance, args) : void logError("no such method '" + options + "' for dlmenu instance") : void logError("cannot call methods on dlmenu prior to initialization; attempted to call method '" + options + "'")
        })
      } else this.each(function () {
        var instance = $.data(this, "dlmenu");
        instance ? instance._init() : instance = $.data(this, "dlmenu", new $.DLMenu(options, this))
      });
      return this
    }
  }(jQuery, window),
  function ($) {
    "use strict";
    $(".mk-main-navigation .menu-item-has-children").children("a").attr("aria-haspopup", "true"), $(".animated-column-item").attr("aria-haspopup", "true")
  }(jQuery),
  function ($) {
    "use strict";

    function init() {
      $(".mk-accordion").each(function () {
        new Accordion(this)
      })
    }
    var Accordion = function (el) {
      var timeout, that = this,
        $el = $(el),
        initial = $el.data("initialindex");
      this.$el = $el, this.$single = $("." + this.dom.single, $el), this.isExpendable = "toggle-action" === $el.data("style"), this.bindClicks(), $(window).on("load", function () {
        -1 !== initial && that.show(that.$single.eq(initial))
      }), $(window).on("resize", function () {
        clearTimeout(timeout), timeout = setTimeout(that.bindClicks.bind(that), 500)
      })
    };
    Accordion.prototype.dom = {
      single: "mk-accordion-single",
      tab: "mk-accordion-tab",
      pane: "mk-accordion-pane",
      current: "current",
      mobileToggle: "mobile-false",
      mobileBreakPoint: 767
    }, Accordion.prototype.bindClicks = function () {
      if (this.$single.off("click", "." + this.dom.tab), !window.matchMedia("(max-width: " + this.dom.mobileBreakPoint + "px)").matches || !this.$el.hasClass(this.dom.mobileToggle)) {
        this.$single.on("click", "." + this.dom.tab, this.handleEvent.bind(this));
        var $current = $("." + this.dom.current, this.$el);
        "none" === $("." + this.dom.pane, $current).css("display") && this.show($current)
      }
    }, Accordion.prototype.handleEvent = function (e) {
      e.preventDefault(), e.stopPropagation();
      var $single = $(e.delegateTarget);
      $single.hasClass(this.dom.current) ? this.isExpendable && this.hide($single) : this.show($single)
    }, Accordion.prototype.hide = function ($single) {
      $single.removeClass(this.dom.current), $("." + this.dom.pane, $single).slideUp()
    }, Accordion.prototype.show = function ($single) {
      if (!this.isExpendable) {
        var that = this;
        this.hide($("." + this.dom.current, that.$el))
      }
      $single.addClass(this.dom.current), $("." + this.dom.pane, $single).slideDown()
    }, init(), $(window).on("vc_reload", init)
  }(jQuery),
  function ($) {
    "use strict";
    var SkillDiagram = function (el) {
      this.el = el
    };
    SkillDiagram.prototype = {
      init: function () {
        this.cacheElements(), this.createDiagram(), this.$skills.each(this.createSkill.bind(this))
      },
      cacheElements: function () {
        this.$el = $(this.el), this.$skills = this.$el.find(".mk-meter-arch"), this.config = this.$el.data(), this.config.radius = this.config.dimension / 2
      },
      random: function (l, u) {
        return Math.floor(Math.random() * (u - l + 1) + l)
      },
      createDiagram: function () {
        var self = this;
        $(this.el).find("svg").remove(), this.diagram = Raphael(this.el, this.config.dimension, this.config.dimension), this.diagram.setViewBox(0, 0, this.config.dimension, this.config.dimension, !0), this.diagram.setSize("90%", "90%"), this.diagram.circle(this.config.radius, this.config.radius, 80).attr({
          stroke: "none",
          fill: this.config.circleColor
        }), this.title = this.diagram.text(this.config.radius, this.config.radius, this.config.defaultText).attr({
          font: "22px helvetica",
          fill: this.config.defaultTextColor
        }).toFront(), this.diagram.customAttributes.arc = function (value, color, rad) {
          var v = 3.6 * value,
            alpha = 360 == v ? 359.99 : v,
            r = self.random(91, 240),
            a = (r - alpha) * Math.PI / 180,
            b = r * Math.PI / 180;
          return {
            path: [["M", self.config.radius + rad * Math.cos(b), self.config.radius - rad * Math.sin(b)], ["A", rad, rad, 0, +(alpha > 180), 1, self.config.radius + rad * Math.cos(a), self.config.radius - rad * Math.sin(a)]],
            stroke: color
          }
        }
      },
      createSkill: function (id, el) {
        var self = this,
          $this = $(el),
          config = $this.data(),
          newRad = 72 + 27 * (id + 1);
        this.diagram.path().attr({
          "stroke-width": 28,
          arc: [config.percent, config.color, newRad]
        }).mouseover(function () {
          self.showSkill(this, config.name, config.percent)
        }).mouseout(function () {
          self.hideSkill(this)
        })
      },
      showSkill: function (self, name, percent) {
        var $this = self;
        "VML" != Raphael.type && $this.toFront(), $this.animate({
          "stroke-width": 50,
          opacity: .9
        }, 800, "elastic"), this.title.stop().animate({
          opacity: 0
        }, 250, ">", function () {
          this.attr({
            text: name + "\n" + percent + "%"
          }).animate({
            opacity: 1
          }, 250, "<")
        }).toFront()
      },
      hideSkill: function (self) {
        var $this = self,
          self = this;
        $this.stop().animate({
          "stroke-width": 28,
          opacity: 1
        }, 1e3, "elastic"), self.title.stop().animate({
          opacity: 0
        }, 250, ">", function () {
          self.title.attr({
            text: self.config.defaultText
          }).animate({
            opacity: 1
          }, 250, "<")
        })
      }
    };
    var init = function () {
      "undefined" != typeof Raphael && $(".mk-skill-diagram").each(function () {
        new SkillDiagram(this).init()
      })
    };
    init(), $(window).on("vc_reload", init)
  }(jQuery),
  function ($) {
    "use strict";

    function tabDelegation() {
      var $this = $(this);
      $this.data().tab && $this.on("click", "a", openInTab)
    }

    function openInTab(e) {
      e.preventDefault();
      var $this = $(this),
        url = $this.attr("href");
      window.open(url, "_blank")
    }
    $('[data-js="tab-delegation"]').each(tabDelegation)
  }(jQuery),
  function ($) {
    "use strict";
    var init = function () {
      var Toggle = function (el) {
        var that = this,
          $el = $(el);
        this.$el = $el, $el.toggle(that.open.bind(that), that.close.bind(that))
      };
      Toggle.prototype.dom = {
        pane: "mk-toggle-pane",
        active: "active-toggle"
      }, Toggle.prototype.open = function () {
        var $this = this.$el;
        $this.addClass(this.dom.active), $this.siblings("." + this.dom.pane).slideDown(200)
      }, Toggle.prototype.close = function () {
        var $this = this.$el;
        $this.removeClass(this.dom.active), $this.siblings("." + this.dom.pane).slideUp(200)
      };
      var $toggle = $(".mk-toggle-title");
      $toggle.length && $toggle.each(function () {
        new Toggle(this)
      })
    };
    $(window).on("load vc_reload", init)
  }(jQuery), window.ajaxInit = function () {
      mk_lightbox_init(), mk_click_events(), mk_social_share_global(), mk_gallery(), loop_audio_init()
    }, window.ajaxDelayedInit = function () {
      mk_flexslider_init()
    }, $(document).ready(function () {
      mk_lightbox_init(), mk_login_form(), mk_backgrounds_parallax(), mk_flexslider_init(), mk_event_countdown(), mk_skill_meter(), mk_milestone(), mk_ajax_search(), mk_hover_events(), mk_portfolio_ajax(), product_loop_add_cart(), mk_portfolio_widget(), mk_contact_form(), mk_blog_carousel(), mk_header_searchform(), mk_click_events(), mk_text_typer(), mk_tab_slider_func(), $(window).on("load", function () {
        mk_unfold_footer(), mk_accordion_toggles_tooltip(), mk_gallery(), mk_theatre_responsive_calculator(), mk_start_tour_resize(), mk_header_social_resize(), mk_page_section_social_video_bg(), loop_audio_init(), mk_one_page_scroller(), mkPositionSidebar(), setTimeout(function () {
          mk_mobile_tablet_responsive_calculator()
        }, 300), console.log("ready for rock")
      });
      var onDebouncedResize = function () {
          mk_theatre_responsive_calculator(), mk_mobile_tablet_responsive_calculator(), mk_accordion_toggles_tooltip(), mk_start_tour_resize(), mk_header_social_resize(), setTimeout(function () {
            mk_unfold_footer()
          }, 300)
        },
        debounceResize = null;
      $(window).on("resize", function () {
        null !== debounceResize && clearTimeout(debounceResize), debounceResize = setTimeout(onDebouncedResize, 300)
      });
      var onDebouncedScroll = function () {
          mk_skill_meter(), mk_milestone()
        },
        debounceScroll = null;
      $(window).on("scroll", function () {
        null !== debounceScroll && clearTimeout(debounceScroll), debounceScroll = setTimeout(onDebouncedScroll, 100)
      }), MK.utils.isMobile() && $("body").addClass("no-transform")
    }), $(window).on("vc_reload", function () {
      mk_flexslider_init(), loop_audio_init(), mk_tab_slider_func(), mk_event_countdown(), videoLoadState(), mk_page_section_social_video_bg(), mk_hover_events(), setTimeout(function () {
        mkPositionSidebar()
      }, 200)
    }), $(document).on("click", ".vc_control-btn-delete", function () {
      $(window).trigger("vc_reload")
    }), $(document).on("sortupdate", ".ui-sortable", function () {
      $(window).trigger("vc_reload")
    }), videoLoadState(),
    function ($) {
      function initialize() {
        var $gmap = $(".gmap_widget");
        $gmap.length && "undefined" != typeof google && $gmap.each(run)
      }

      function run() {
        var $mapHolder = $(this),
          myLatlng = new google.maps.LatLng($mapHolder.data("latitude"), $mapHolder.data("longitude")),
          mapOptions = $mapHolder.data("options");
        mapOptions.mapTypeId = google.maps.MapTypeId.ROADMAP, mapOptions.center = myLatlng;
        var map = new google.maps.Map(this, mapOptions);
        new google.maps.Marker({
          position: myLatlng,
          map: map
        })
      }
      $(window).on("load vc_reload", initialize)
    }(jQuery),
    function ($) {
      function run() {
        var options = $(this).data("options");
        options.template = '<a class="featured-image ' + options.tmp_col + '-columns" href="{{link}}" target="_' + options.tmp_target + '"><div class="item-holder"><img src="{{image}}" /><div class="image-hover-overlay"></div></div></a>', new Instafeed(options).run()
      }
      $(window).on("load", function () {
        var $feeds = $(".mk-instagram-feeds");
        $feeds.length && $feeds.each(run)
      })
    }(jQuery),
    function ($) {
      $(window).on("load", function () {
        setTimeout(function () {
          $(".chrome-flipbox-backface-fix").removeClass("chrome-flipbox-backface-fix")
        }, 300)
      })
    }(jQuery),
    function ($) {
      $(window).on("load", function () {
        $(".vc_tta-tab a").on("click", function () {
          setTimeout(function () {
            $(window).trigger("resize")
          }, 100)
        })
      })
    }(jQuery),
    function ($) {
      $(window).on("load", function () {
        $("#mk-vm-menu .menu-item-has-children, #mk-vm-menu .mk-vm-back").on("mouseenter", function () {
          var $header_inner = $(this).closest(".mk-header-inner"),
            $header_inner_height = $header_inner.outerHeight(),
            $header_bg = $header_inner.find(".mk-header-bg"),
            total_height = 0;
          $header_bg.css("height", "100%"), setTimeout(function () {
            $header_inner.children(":visible").each(function () {
              total_height += $(this).outerHeight(!0)
            }), total_height -= $header_bg.height(), total_height < $header_inner_height ? $header_bg.css("height", "100%") : $header_bg.css("height", total_height + "px")
          }, 600)
        })
      })
    }(jQuery),
    function ($) {
      function set_lightbox_href() {
        var $product_img = $(this).find("img"),
          $lightbox = $(this).find(".mk-lightbox");
        setTimeout(function () {
          var image_url = $product_img.attr("src"),
            image_suffix = image_url.substr(image_url.lastIndexOf(".") - image_url.length),
            image_url = image_url.slice(0, image_url.lastIndexOf("-"));
          $lightbox.attr("href", image_url + image_suffix)
        }, 300)
      }
      $(window).on("load", function () {
        var $variations_form = $(".variations_form");
        if ($variations_form.length) {
          var $varitions_selects = $variations_form.find(".variations").find(".value").find("select");
          $varitions_selects.on("change", function () {
            var $all_img_container = $(".mk-product-image .mk-woocommerce-main-image");
            $all_img_container.length && $($all_img_container).each(set_lightbox_href)
          }), $varitions_selects.trigger("change")
        }
      })
    }(jQuery),
    function ($) {
      MK.utils.isMobile() && $(".mk-section-video video").remove()
    }(jQuery),
    function ($) {
      $(window).on("load", function () {
        $(document).on("yith-wcan-ajax-filtered yith_infs_added_elem yith-wcan-ajax-reset-filtered", function () {
          setTimeout(function () {
            MK.utils.eventManager.publish("ajaxLoaded"), MK.core.initAll(document)
          }, 1e3)
        }), $(document).on("yith-wcan-ajax-filtered yith-wcan-ajax-reset-filtered", function () {
          setTimeout(function () {
            $(".woocommerce-ordering").on("change", "select.orderby", function () {
              $(this).closest("form").submit()
            })
          }, 1e3)
        })
      })
    }(jQuery),
    function (e) {
      var a = window.location,
        n = a.hash;
      if (n.length && n.substring(1).length) {
        var hSuf = n.substring(1).replace(/[!"#$%&'()*+,.\/:;<=>?@[\]^`{|}~]/g, "\\$&");
        if (!e(".vc_row, .mk-main-wrapper-holder, .mk-page-section, #comments").filter("#" + hSuf).length) return;
        n = n.replace("!loading", "");
        var i = n + "!loading";
        a.hash = i
      }
    }(jQuery);
  var progressButton = {
    loader: function (form) {
      MK.core.loadDependencies([MK.core.path.plugins + "tweenmax.js"], function () {
        var $form = form,
          progressBar = $form.find(".mk-progress-button .mk-progress-inner"),
          buttonText = $form.find(".mk-progress-button .mk-progress-button-content");
        (new TimelineLite).to(progressBar, 0, {
          width: "100%",
          scaleX: 0,
          scaleY: 1
        }).to(buttonText, .3, {
          y: -5
        }).to(progressBar, 1.5, {
          scaleX: 1,
          ease: Power2.easeInOut
        }, "-=.1").to(buttonText, .3, {
          y: 0
        }).to(progressBar, .3, {
          scaleY: 0
        })
      })
    },
    success: function (form) {
      MK.core.loadDependencies([MK.core.path.plugins + "tweenmax.js"], function () {
        function hideSuccessMessage() {
          progressButtonSuccess.reverse()
        }
        var $form = form,
          buttonText = $form.find(".mk-button .mk-progress-button-content, .mk-contact-button .mk-progress-button-content"),
          successIcon = $form.find(".mk-progress-button .state-success"),
          progressButtonSuccess = new TimelineLite({
            onComplete: hideSuccessMessage
          });
        progressButtonSuccess.to(buttonText, .3, {
          paddingRight: 20,
          ease: Power2.easeInOut
        }, "+=1").to(successIcon, .3, {
          opacity: 1
        }).to(successIcon, 2, {
          opacity: 1
        })
      })
    },
    error: function (form) {
      MK.core.loadDependencies([MK.core.path.plugins + "tweenmax.js"], function () {
        function hideErrorMessage() {
          progressButtonError.reverse()
        }
        var $form = form,
          buttonText = $form.find(".mk-button .mk-progress-button-content, .mk-contact-button .mk-progress-button-content"),
          errorIcon = $form.find(".mk-progress-button .state-error"),
          progressButtonError = new TimelineLite({
            onComplete: hideErrorMessage
          });
        progressButtonError.to(buttonText, .3, {
          paddingRight: 20
        }, "+=1").to(errorIcon, .3, {
          opacity: 1
        }).to(errorIcon, 2, {
          opacity: 1
        })
      })
    }
  };
  $("#mc-embedded-subscribe-form").submit(function (e) {
      var $this = $(this);
      e.preventDefault(), $.ajax({
        url: MK.core.path.ajaxUrl,
        type: "POST",
        data: {
          action: "mk_ajax_subscribe",
          email: $this.find(".mk-subscribe--email").val(),
          list_id: $this.find(".mk-subscribe--list-id").val(),
          optin: $this.find(".mk-subscribe--optin").val()
        },
        success: function (res) {
          $this.parent().find(".mk-subscribe--message").html($.parseJSON(res).message)
        }
      })
    }), "undefined" != typeof exports && (exports.addClass = addClass, exports.removeClass = removeClass),
    function (root, factory) {
      "function" == typeof define && define.amd ? define([], factory) : "object" == typeof exports ? module.exports = factory() : root.debounce = factory()
    }(this, function () {
      "use strict";
      return function (callback, delay) {
        var timeout;
        return function () {
          var context = this,
            args = arguments;
          clearTimeout(timeout), timeout = setTimeout(function () {
            callback.apply(context, args)
          }, delay)
        }
      }
    }), "undefined" != typeof exports && (exports.validateEmail = validateEmail, exports.validateText = validateText),
    function ($) {
      "use strict";

      function deactivate() {
        $contactBtn.removeClass("is-active"), $backBtn.removeClass("is-active")
      }

      function activate() {
        $contactBtn.addClass("is-active"), $backBtn.addClass("is-active")
      }
      var $wrapper = $(".js-bottom-corner-btns"),
        $contactBtn = $wrapper.find(".js-bottom-corner-btn--contact"),
        $backBtn = $wrapper.find(".js-bottom-corner-btn--back");
      $contactBtn.length;
      $backBtn.length && MK.utils.scrollSpy(400, {
        before: deactivate,
        after: activate
      })
    }(jQuery),
    function ($) {
      "use strict";
      $(".mk-fullscreen-nav-close, .mk-fullscreen-nav-wrapper, #fullscreen-navigation a").on("click", function (e) {
        $(".mk-fullscreen-nav").removeClass("opened"), $(".mk-dashboard-trigger").removeClass("fullscreen-active"), $("body").removeClass("fullscreen-nav-opened");
        var anchor = MK.utils.detectAnchor(this),
          $this = $(this);
        if (anchor.length) {
          var href = $this.attr("href").split("#")[0]; - 1 !== window.location.href.indexOf(href) && e.preventDefault(), MK.utils.scrollToAnchor(anchor)
        } else "#" === $this.attr("href") && e.preventDefault()
      }), $(".fullscreen-navigation-ul .menu-sub-level-arrow").on("click", function () {
        $(this).siblings(".sub-menu").slideToggle()
      })
    }(jQuery),
    function ($) {
      "use strict";
      var $navList = $(".main-navigation-ul"),
        megaMenu = function () {
          $navList.MegaMenu({
            type: "vertical",
            delay: 200
          })
        };
      $(window).on("load", megaMenu)
    }(jQuery),
    function ($) {
      "use strict";
      var onePageNavItem = function () {
          var $this = $(this),
            link = $this.find("a"),
            anchor = MK.utils.detectAnchor(link);
          if (anchor.length) {
            $this.removeClass("current-menu-item current-menu-ancestor current-menu-parent");
            var activeNav = function (state) {
              return function () {
                $this[state ? "addClass" : "removeClass"]("current-menu-item"), window.history.replaceState(void 0, void 0, [state ? anchor : " "])
              }
            };
            MK.utils.scrollSpy($(anchor)[0], {
              before: activeNav(!1),
              active: activeNav(!0),
              after: activeNav(!1)
            })
          }
        },
        $navItems = $(".js-main-nav").find("li");
      $(window).on("load", function () {
        setTimeout(function () {
          $navItems.each(onePageNavItem)
        }, 1e3)
      })
    }(jQuery),
    function ($) {
      "use strict";

      function toggleResMenu(e) {
        e.preventDefault();
        var $this = $(this),
          $headerInner = $this.parents("header"),
          $resMenu = $headerInner.find(".mk-responsive-wrap"),
          searchBox = $(".responsive-searchform .text-input");
        $("#wpadminbar").height();
        $body.hasClass("mk-opened-nav") ? ($this.removeClass("is-active"), $body.removeClass("mk-opened-nav").addClass("mk-closed-nav").trigger("mk-closed-nav"), $resMenu.hide(), $post_nav.removeClass("post-nav-backward")) : ($this.addClass("is-active"), $body.removeClass("mk-closed-nav").addClass("mk-opened-nav").trigger("mk-opened-nav"), $resMenu.show(), $post_nav.addClass("post-nav-backward")), searchBox.hasClass("input-focused") && searchBox.removeClass("input-focused")
      }
      var $window = $(window),
        $body = $("body"),
        $resMenuWrap = $(".mk-responsive-wrap"),
        $post_nav = $(".mk-post-nav"),
        $toolbar = $(".mk-header-toolbar"),
        $resMenuLink = $(".mk-nav-responsive-link"),
        hasResMenu = $resMenuWrap.length > 0,
        windowHeight = $window.height(),
        screenHeight = screen.height;
      if ($(".mk-toolbar-resposnive-icon").on("click", function (e) {
          e.preventDefault(), console.log("clicked"), $body.hasClass("toolbar-opened") ? ($body.removeClass("toolbar-opened").addClass("toolbar-closed"), $toolbar.hide()) : ($body.removeClass("toolbar-closed").addClass("toolbar-opened"), $toolbar.show())
        }), hasResMenu || $(".vc_mk_header")) {
        $resMenuLink.each(function () {
          $(this).on("click", toggleResMenu)
        }), $(window).on("vc_reload", function () {
          $(".vc_mk_header .mk-nav-responsive-link").each(function () {
            $(this).on("click", toggleResMenu)
          })
        });
        var isVirtualKeyboard = function () {
            var currentWindowHeight = $window.height(),
              currentScreenHeight = screen.height,
              searchBox = $(".responsive-searchform .text-input"),
              searchBoxIsFocused = !1;
            return searchBox.on("touchstart touchend", function (e) {
              searchBox.addClass("input-focused")
            }), searchBoxIsFocused = searchBox.is(":focus") || searchBox.hasClass("input-focused"), !(!$body.hasClass("mk-opened-nav") || !searchBoxIsFocused || currentScreenHeight != screenHeight || currentWindowHeight == windowHeight)
          },
          hideResMenu = function () {
            MK.utils.isResponsiveMenuState() && (isVirtualKeyboard() || ($body.hasClass("mk-opened-nav") && $resMenuLink.filter(".is-active").trigger("click"), $resMenuWrap.hide()))
          };
        $resMenuWrap.on("click", "a", hideResMenu)
      }
    }(jQuery),
    function ($) {
      "use strict";

      function toggleSubMenu(e) {
        e.preventDefault();
        var $this = $(this);
        $this.hasClass("mk-nav-sub-closed") ? $this.siblings("ul").slideDown(450).end().removeClass("mk-nav-sub-closed").addClass("mk-nav-sub-opened") : $this.siblings("ul").slideUp(450).end().removeClass("mk-nav-sub-opened").addClass("mk-nav-sub-closed")
      }

      function toggleFullMenu(e) {
        e.preventDefault();
        var $this = $(this),
          $body = $("body"),
          $fullscreen_box = $(".mk-fullscreen-nav");
        $this.hasClass("dashboard-style") ? $this.hasClass("dashboard-active") ? ($this.removeClass("dashboard-active"), $body.removeClass("dashboard-opened")) : ($this.addClass("dashboard-active"), $body.addClass("dashboard-opened")) : $this.hasClass("fullscreen-style") && ($this.hasClass("fullscreen-active") ? ($this.removeClass("fullscreen-active"), $body.removeClass("fullscreen-nav-opened"), $fullscreen_box.removeClass("opened")) : ($this.addClass("fullscreen-active"), $body.addClass("fullscreen-nav-opened"), $fullscreen_box.addClass("opened")))
      }
      var $header = $(".mk-header");
      ($header.length > 0 || $(".vc_mk_header")) && ($header.attr("data-header-style"), $(".sidedash-navigation-ul > li").each(function () {
        $(this).children("ul").siblings("a").after('<span class="mk-nav-arrow mk-nav-sub-closed"><svg class="mk-svg-icon" data-name="mk-moon-arrow-down" data-cacheid="2" style=" height:14px; width: 14px; " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M512 192l-96-96-160 160-160-160-96 96 256 255.999z"></path></svg></span>')
      }), $(".mk-nav-arrow").each(function () {
        $(this).stop(!0).on("click", toggleSubMenu)
      }), $(".mk-dashboard-trigger").each(function () {
        $(this).on("click", toggleFullMenu)
      }), $(window).on("vc_reload", function () {
        $(".vc_mk_header .mk-dashboard-trigger").each(function () {
          $(this).on("click", toggleFullMenu)
        }), $(".vc_mk_header .mk-nav-arrow").each(function () {
          $(this).stop(!0).on("click", toggleSubMenu)
        })
      }), $("html").on("click", function () {
        $("body").removeClass("dashboard-opened"), $(".mk-dashboard-trigger").removeClass("dashboard-active")
      }))
    }(jQuery),
    function ($) {
      "use strict";
      var $verticalMenu = $("#mk-vm-menu"),
        verticalMenu = function () {
          $verticalMenu.data("vertical-menu") || MK.utils.isResponsiveMenuState() || ($verticalMenu.dlmenu(), $verticalMenu.data("vertical-menu", !0))
        };
      verticalMenu(), $(window).on("resize", verticalMenu)
    }(jQuery),
    function ($) {
      "use strict";
      $(".mk-main-navigation > .main-navigation-ul > .menu-item-language").addClass("no-mega-menu").css("visibility", "visible"), $(".mk-main-navigation .menu-item-language > a").addClass("menu-item-link")
    }(jQuery),
    function ($) {
      "use strict";

      function changeSkin(e, skin) {
        $header.attr("data-transparent-skin", skin);
        var contrast = "light" === skin ? "dark" : "light";
        $header.addClass(skin + "-skin"), $header.removeClass(contrast + "-skin")
      }
      var $header = $(".mk-header").first();
      if ($header.length > 0) {
        var $window = $(window),
          $document = $(document),
          $headerHolder = $header.find(".mk-header-holder"),
          $paddingWrapper = $header.find(".mk-header-padding-wrapper"),
          config = $header.data(),
          isStickyLazy = "lazy" === config.stickyStyle,
          isStickyFixed = "fixed" === config.stickyStyle,
          isStickySlide = "slide" === config.stickyStyle;
        (function () {
          return 4 !== config.headerStyle
        })() && MK.utils.eventManager.subscribe("firstElSkinChange", changeSkin), isStickyLazy ? 2 !== config.headerStyle && function () {
          var wScrollCurrent = 0,
            wScrollBefore = 0,
            wScrollDiff = 0,
            wHeight = 0,
            dHeight = 0,
            setSizes = function () {
              dHeight = $document.height(), wHeight = $window.height()
            },
            onScroll = function () {
              wScrollCurrent = MK.val.scroll(), wScrollDiff = wScrollBefore - wScrollCurrent, wScrollCurrent <= 0 ? ($headerHolder.removeClass("header--hidden"), $header.removeClass("a-sticky"), $("body").trigger("mk:header-unsticky")) : wScrollDiff > 0 && $headerHolder.hasClass("header--hidden") ? ($headerHolder.removeClass("header--hidden"), $header.addClass("a-sticky"), $("body").trigger("mk:header-sticky")) : wScrollDiff < 0 && (wScrollCurrent + wHeight >= dHeight && $headerHolder.hasClass("header--hidden") ? ($headerHolder.removeClass("header--hidden"), $header.addClass("a-sticky"), $("body").trigger("mk:header-sticky")) : ($headerHolder.addClass("header--hidden"), $header.removeClass("a-sticky"), $("body").trigger("mk:header-unsticky"))), wScrollBefore = wScrollCurrent
            };
          setSizes(), onScroll(), $window.on("resize", MK.utils.throttle(100, setSizes)), $window.on("scroll", MK.utils.throttle(500, onScroll))
        }() : isStickyFixed ? function () {
          var scrollPos, sticked = !1,
            toggleState = function () {
              if ((scrollPos = MK.val.scroll() + MK.val.adminbarHeight()) > MK.val.stickyOffset() && !MK.utils.isResponsiveMenuState()) {
                if (sticked) return;
                $header.addClass("a-sticky"), sticked = !0, $("body").trigger("mk:header-sticky")
              } else {
                if (!sticked) return;
                $header.removeClass("a-sticky"), sticked = !1, $("body").trigger("mk:header-unsticky")
              }
            };
          toggleState(), $window.on("scroll", MK.utils.throttle(100, toggleState)), $window.on("resize", MK.utils.throttle(100, toggleState))
        }() : isStickySlide && function () {
          var sticked = !1,
            onScroll = function () {
              if (MK.val.scroll() > MK.val.stickyOffset()) {
                if (sticked) return;
                $header.addClass("pre-sticky"), $paddingWrapper.addClass("enable-padding"), setTimeout(function () {
                  $header.addClass("a-sticky"), $("body").trigger("mk:header-sticky")
                }, 1), sticked = !0
              } else {
                if (!sticked) return;
                $header.removeClass("a-sticky"), $header.removeClass("pre-sticky"), $paddingWrapper.removeClass("enable-padding"), sticked = !1, $("body").trigger("mk:header-unsticky")
              }
            };
          onScroll(), $window.on("scroll", MK.utils.throttle(100, onScroll))
        }()
      }
    }(jQuery),
    function ($) {
      "use strict";

      function normalizeClick() {
        $(this).on("click", handleClick)
      }

      function handleClick(e) {
        "none" !== $(e.currentTarget).find("> ul").css("display") || (e.preventDefault(), e.stopPropagation())
      }
      "ontouchstart" in document.documentElement && $(".mk-main-navigation .menu-item-has-children").each(normalizeClick)
    }(jQuery),
    function ($) {
      "use strict";
      MK.ui.preloader = {
        dom: {
          overlay: ".mk-body-loader-overlay"
        },
        hide: function () {
          $(this.dom.overlay).fadeOut(600, "easeInOutExpo", function () {
            $("body").removeClass("loading")
          })
        }
      }
    }(jQuery),
    function ($) {
      "use strict";
      var _ajaxUrl = MK.core.path.ajaxUrl,
        _instances = {};
      MK.utils.ajaxLoader = function (el) {
        var id = "#" + $(el).attr("id");
        if (void 0 !== _instances[id]) return _instances[id];
        this.id = id, this.el = el, this.isLoading = !1, this.xhrCounter = 0
      }, MK.utils.ajaxLoader.prototype = {
        init: function () {
          this.initialized && void 0 === window.vc_iframe || (this.createInstance(), this.cacheElements(), this.initialized = !0)
        },
        cacheElements: function () {
          this.$container = $(this.el), this.id = "#" + this.$container.attr("id"), this.categories = this.$container.data("loop-categories"), this.data = {}, this.data.action = "mk_load_more", this.data.query = this.$container.data("query"), this.data.atts = this.$container.data("loop-atts"), this.data.loop_iterator = this.$container.data("loop-iterator"), this.data.author = this.$container.data("loop-author"), this.data.posts = this.$container.data("loop-posts"), this.data.safe_load_more = this.$container.siblings("#safe_load_more").val(), this.data._wp_http_referer = this.$container.siblings('input[name="_wp_http_referer"]').val(), this.data.paged = 1, this.data.maxPages = this.$container.data("max-pages"), this.data.term = this.categories
        },
        createInstance: function () {
          _instances[this.id] = this
        },
        load: function (unique) {
          var self = this,
            seq = ++this.xhrCounter;
          if (this.isLoading = !0, this.$container.siblings(".mk-ajax-loaded-posts").length) {
            var loaded_posts = this.$container.siblings(".mk-ajax-loaded-posts").attr("data-loop-loaded-posts");
            1 != this.$container.attr("data-pagination-style") && (self.data.loaded_posts = loaded_posts.split(","))
          }
          return $.when($.ajax({
            url: _ajaxUrl,
            type: "POST",
            data: self.data
          })).done(function (response) {
            self.onDone(response, unique, seq)
          })
        },
        onDone: function (response, unique, seq) {
          if (seq === this.xhrCounter) {
            var self = this;
            response = $.parseJSON(response), response.unique = unique, response.id = this.id, this.$container.siblings(".mk-ajax-loaded-posts").length && this.$container.siblings(".mk-ajax-loaded-posts").attr("data-loop-loaded-posts", response.loaded_posts), this.setData({
              maxPages: response.maxPages,
              found_posts: response.found_posts,
              loop_iterator: response.i
            }), $(response.content).mk_imagesLoaded().then(function () {
              MK.utils.eventManager.publish("ajaxLoaded", response), self.isLoading = !1, self.initNewComponents()
            })
          } else console.log("XHR request nr " + seq + " aborted")
        },
        setData: function (atts) {
          for (var att in atts) "term" === att && "*" === atts[att] ? this.data.term = "" : this.data[att] = atts[att]
        },
        getData: function (att) {
          return this.data[att]
        },
        initNewComponents: function () {
          window.ajaxInit(), setTimeout(window.ajaxDelayedInit, 1e3), MK.core.initAll(this.el)
        }
      }
    }(jQuery), MK.component.BackgroundImageSetter = function ($) {
      "use strict";

      function run($layers) {
        $layers.filter(function () {
          return !this.hasAttribute("mk-img-loaded")
        }).each(applyBg)
      }

      function applyBg() {
        var $this = $(this),
          imgs = $this.data("mk-img-set");
        $this.css("background-image", "url(" + module.getImage(imgs) + ")"), $this.find(".mk-adaptive-image").attr("src", module.getImage(imgs))
      }

      function handleResize($layers) {
        updateScreenSize(), hasSwitched() && (updateDevice(), run($layers))
      }

      function getScreenSize() {
        return {
          w: $win.width(),
          h: $win.height()
        }
      }

      function getDevice() {
        return screen.w > 1024 ? {
          class: "desktop",
          id: 2
        } : screen.w > 736 ? {
          class: "tablet",
          id: 1
        } : {
          class: "mobile",
          id: 0
        }
      }

      function getOrientation() {
        return screen.w > screen.h ? "landscape" : "portrait"
      }

      function updateScreenSize() {
        screen = getScreenSize()
      }

      function updateDevice() {
        lastOrientation !== orientation && (orientation = lastOrientation), lastDevice.id > device.id && (device = lastDevice)
      }

      function hasSwitched() {
        return lastOrientation = getOrientation(), lastDevice = getDevice(), lastOrientation !== orientation || lastDevice.class !== device.class
      }
      var module = {},
        $win = $(window),
        screen = getScreenSize(),
        orientation = getOrientation(),
        device = getDevice(),
        lastOrientation = orientation,
        lastDevice = device;
      return module.getImage = function (imgs) {
        if ("false" === imgs.responsive) return imgs.landscape.desktop ? imgs.landscape.desktop : imgs.landscape.external ? imgs.landscape.external : "";
        var hasOrientation = !!imgs[orientation],
          imgOriented = imgs[hasOrientation ? orientation : Object.keys(imgs)[0]];
        return imgOriented[device.class] ? imgOriented[device.class] : imgOriented.external ? imgOriented.external : ""
      }, module.init = function ($layers) {
        run($layers), $layers.attr("mk-img-loaded", "")
      }, module.onResize = function ($layers) {
        $win.on("resize", MK.utils.throttle(500, function () {
          handleResize($layers)
        }))
      }, module
    }(jQuery), jQuery(function ($) {
      var init = function () {
        $allLayers = $("[data-mk-img-set]").filter(function (index) {
          return !$(this).hasClass("mk-section-image") && !$(this).hasClass("background-layer") && !$(this).hasClass("mk-video-section-touch")
        }), MK.component.BackgroundImageSetter.onResize($allLayers), MK.component.BackgroundImageSetter.init($allLayers)
      };
      init(), $(window).on("vc_reload", init)
    }),
    function ($) {
      "use strict";
      var val = MK.val;
      MK.component.FullHeight = function (el) {
        var $window = $(window),
          $this = $(el),
          config = $this.data("fullheight-config"),
          container = document.getElementById("mk-theme-container"),
          minH = config && config.min ? config.min : 0,
          winH = null,
          height = null,
          update_count = 0,
          testing = MK.utils.getUrlParameter("testing"),
          offset = null;
        "IE" === MK.utils.browser.name && $this.css("height", "1px");
        var update = function () {
          0 === update_count && (winH = $window.height(), offset = $this.offset().top - 1, height = Math.max(minH, winH - val.offsetHeaderHeight(offset)), $this.css("min-height", height), void 0 !== testing && update_count++)
        };
        return {
          init: function () {
            update(), $window.on("resize", update), $window.on("scroll", update), window.addResizeListener(container, update)
          }
        }
      }
    }(jQuery),
    function ($) {
      "use strict";
      var utils = (MK.core, MK.utils);
      MK.core.path;
      MK.ui.FullScreenGallery = function (element, settings) {
        this.element = element, this.config = settings, this.isFullScreen = !1
      }, MK.ui.FullScreenGallery.prototype = {
        dom: {
          fullScrBtn: ".slick-full-screen",
          exitFullScrBtn: ".slick-minimize",
          playBtn: ".slick-play",
          pauseBtn: ".slick-pause",
          shareBtn: ".slick-share",
          socialShare: ".slick-social-share",
          wrapper: ".slick-slider-wrapper",
          slider: ".slick-slides",
          slides: ".slick-slide",
          dots: ".slick-dot",
          active: ".slick-active",
          hiddenClass: "is-hidden",
          dataId: "slick-index"
        },
        tpl: {
          dot: '<div class="slick-dot"></div>',
          next: '<a href="javascript:;" class="slick-next"> <svg width="33px" height="65px"> <polyline fill="none" stroke="#FFFFFF" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points=" 0.5,0.5 32.5,32.5 0.5,64.5"/> </svg> </a>',
          prev: '<a href="javascript:;" class="slick-prev"> <svg  width="33px" height="65px"> <polyline fill="none" stroke="#FFFFFF" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points=" 32.5,64.5 0.5,32.5 32.5,0.5"/> </svg> </a>'
        },
        init: function () {
          var self = this;
          self.cacheElements(), self.getViewportSizes(), self.updateSizes("window"), self.create(), self.updateCacheElements(), self.createPagination(), self.bindEvents()
        },
        create: function () {
          var self = this;
          this.slick = this.$gallery.slick({
            dots: !0,
            arrows: !0,
            infinite: !0,
            speed: 300,
            slidesToShow: 1,
            centerMode: !0,
            centerPadding: "0px",
            variableWidth: !0,
            autoplay: !1,
            autoplaySpeed: 3e3,
            useTransform: !0,
            prevArrow: self.tpl.prev,
            nextArrow: self.tpl.next,
            customPaging: function (slider, i) {
              return self.tpl.dot
            }
          })
        },
        cacheElements: function () {
          this.$window = $(window), this.$gallery = $(this.element), this.$fullScrBtn = $(this.dom.fullScrBtn), this.$exitFullScrBtn = $(this.dom.exitFullScrBtn), this.$playBtn = $(this.dom.playBtn), this.$pauseBtn = $(this.dom.pauseBtn), this.$shareBtn = $(this.dom.shareBtn), this.$socialShare = $(this.dom.socialShare), this.$wrapper = $(this.dom.wrapper), this.$slider = $(this.dom.slider), this.$slides = $(this.dom.slides), this.$imgs = this.$slides.find("img"), this.$originalImgs = this.$imgs
        },
        updateCacheElements: function () {
          this.$slides = $(this.dom.slides), this.$imgs = this.$slides.find("img"), this.$dots = $(this.dom.dots)
        },
        bindEvents: function () {
          var self = this;
          this.$fullScrBtn.on("click", this.toFullScreen.bind(this)), this.$exitFullScrBtn.on("click", this.exitFullScreen.bind(this)), this.$playBtn.on("click", this.play.bind(this)), this.$pauseBtn.on("click", this.pause.bind(this)), this.$shareBtn.on("click", this.toggleShare.bind(this)), this.$socialShare.on("click", "a", this.socialShare.bind(this)), this.$window.on("resize", this.onResize.bind(this)), this.$window.on("keydown", function (e) {
            39 === e.keyCode && self.$gallery.slick("slickNext"), 37 === e.keyCode && self.$gallery.slick("slickPrev")
          }), $(document).on("fullscreenchange mozfullscreenchange webkitfullscreenchange msfullcreenchange", this.exitFullScreen.bind(this))
        },
        getViewportSizes: function () {
          this.screen = {
            w: screen.width,
            h: screen.height
          }, this.window = {
            w: this.$window.width(),
            h: this.$window.height()
          }
        },
        updateSizes: function (viewport) {
          this.$wrapper.width(this[viewport].w), this.$wrapper.height("100%"), this.$imgs.height("100%")
        },
        createPagination: function () {
          var self = this;
          this.$dots.each(function (i) {
            var img = self.$originalImgs.eq(i).attr("src");
            $(this).css({
              "background-image": "url(" + img + ")"
            })
          })
        },
        play: function (e) {
          e.preventDefault(), this.$playBtn.addClass(this.dom.hiddenClass), this.$pauseBtn.removeClass(this.dom.hiddenClass), $(this.element).slick("slickPlay")
        },
        pause: function (e) {
          e.preventDefault(), this.$pauseBtn.addClass(this.dom.hiddenClass), this.$playBtn.removeClass(this.dom.hiddenClass), $(this.element).slick("slickPause")
        },
        toggleShare: function (e) {
          e.preventDefault(), this.$socialShare.toggleClass(this.dom.hiddenClass)
        },
        getCurentId: function () {
          return this.$slides.filter(this.dom.active).data(this.dom.dataId)
        },
        toFullScreen: function () {
          var self = this;
          this.$fullScrBtn.addClass(this.dom.hiddenClass), this.$exitFullScrBtn.removeClass(this.dom.hiddenClass), this.$slider.hide().fadeIn(500), utils.launchIntoFullscreen(document.documentElement), this.updateSizes("screen"), $(this.element).slick("slickGoTo", this.getCurentId(), !0), setTimeout(function () {
            self.isFullScreen = !0
          }, 1e3)
        },
        exitFullScreen: function () {
          this.isFullScreen && (this.$exitFullScrBtn.addClass(this.dom.hiddenClass), this.$fullScrBtn.removeClass(this.dom.hiddenClass), utils.exitFullscreen(), this.updateSizes("window"), $(this.element).slick("slickGoTo", this.getCurentId(), !0), this.isFullScreen = !1)
        },
        onResize: function () {
          this.getViewportSizes(), this.updateSizes(this.isFullScreen ? "screen" : "window"), $(this.element).slick("refresh"), $(this.element).slick("slickGoTo", this.getCurentId(), !0), this.updateCacheElements(), this.createPagination()
        },
        socialShare: function (e) {
          e.preventDefault();
          var name, $this = $(e.currentTarget),
            network = $this.data("network"),
            id = this.config.id,
            url = this.config.url,
            title = this.$wrapper.find(".slick-title").text(),
            picture = this.$slides.filter(this.dom.active).children().first().attr("src");
          switch (network) {
            case "facebook":
              url = "https://www.facebook.com/sharer/sharer.php?picture=" + picture + "&u=" + url + "#id=" + id, name = "Facebook Share";
              break;
            case "twitter":
              url = "http://twitter.com/intent/tweet?text=" + url + "#id=" + id, name = "Twitter Share";
              break;
            case "pinterest":
              url = "http://pinterest.com/pin/create/bookmarklet/?media=" + picture + "&url=" + url + "&is_video=false&description=" + title, name = "Pinterest Share"
          }
          window.open(url, name, "height=380 ,width=660, resizable=0, toolbar=0, menubar=0, status=0, location=0, scrollbars=0")
        }
      }
    }(jQuery),
    function ($) {
      "use strict";

      function MkfullWidthRow() {
        var $windowWidth = $(document).width(),
          $elements = $('[data-mk-full-width="true"]'),
          direction = $("body.rtl").length ? "right" : "left",
          verticalHeader = !!$("body.vertical-header-enabled").length,
          verticalHeaderWidth = $(".header-style-4 .mk-header-inner").outerWidth() > 270 ? 0 : 270,
          verticalHeaderRtl = $("body.rtl").length ? -1 : 1,
          verticalHeaderRtlWidth = $("body.rtl.vertical-header-enabled").length ? verticalHeaderWidth : 0,
          verticalHeaderRight = $("body.vertical-header-right").length ? -1 : 1,
          verticalHeaderWidthBoxed = 0,
          boxed = $("body.mk-boxed-enabled").length,
          boxedOffset = boxed ? ($(window).width() - $("#theme-page").outerWidth()) / 2 : 0,
          boxedMaxWidth = boxed ? $("#theme-page").outerWidth() : "auto";
        verticalHeader && boxed && (verticalHeaderWidthBoxed = $(".header-style-4 .mk-header-inner").outerWidth() > 270 ? 0 : verticalHeaderRtl * verticalHeaderRight * 135);
        var transparentHeader = $(".transparent-header").length;
        transparentHeader > 0 && (verticalHeaderWidthBoxed = 0), $.each($elements, function (key, item) {
          var css, $el = $(this);
          $el.addClass("vc_hidden");
          var $el_full = $el.next(".vc_row-full-width");
          if ($el_full.length || ($el_full = $el.parent().next(".vc_row-full-width")), $el_full.length) {
            var el_margin_left = parseInt($el.css("margin-left"), 10),
              el_margin_right = parseInt($el.css("margin-right"), 10),
              offset = 0 - $el_full.offset().left - el_margin_left,
              width = $(window).width();
            if (css = {
                position: "relative",
                "box-sizing": "border-box",
                width: $(window).width(),
                maxWidth: boxedMaxWidth
              }, css[direction] = offset + boxedOffset + verticalHeaderWidthBoxed + verticalHeaderRight * verticalHeaderRtlWidth, $el.css(css), !$el.data("mkStretchContent")) {
              var padding = -1 * offset;
              0 > padding && (padding = 0);
              var paddingRight = width - padding - $el_full.width() + el_margin_left + el_margin_right;
              padding -= paddingRight, 0 > paddingRight && (paddingRight = 0) && (css = {}, "right" === direction ? (css["padding-left"] = padding + "px", css["padding-right"] = 0) : (css["padding-right"] = padding + "px", css["padding-left"] = 0), $el.css(css))
            }
            if (verticalHeader && !boxed && !transparentHeader && !css.hasOwnProperty("padding-left") && !css.hasOwnProperty("padding-right")) {
              var side = "left"; - 1 === verticalHeaderRight && (side = "right");
              var el_padding_dir = parseInt($el.css("padding-" + side), 10),
                header_padding_dir = $(".header-style-4 .mk-header-inner").outerWidth();
              if (el_padding_dir != header_padding_dir) {
                $windowWidth > mk_responsive_nav_width ? $el[0].style.setProperty("padding-" + side, header_padding_dir + "px", "important") : $el[0].style.removeProperty("padding-" + side);
                var $el_page_section = $el.find(".mk-page-section.full_layout");
                $el_page_section.length > 0 && $el_page_section[0].style.setProperty("padding-" + side, "unset", "important")
              }
            }
            $el.attr("data-mk-full-width-init", "true"), $el.removeClass("vc_hidden"), $(document).trigger("vc-full-width-row-single", {
              el: $el,
              offset: offset,
              marginLeft: el_margin_left,
              marginRight: el_margin_right,
              elFull: $el_full,
              width: width
            })
          }
        }), $(document).trigger("mk-full-width-row", $elements)
      }
      MkfullWidthRow();
      var debounceResize = null;
      $(window).on("resize", function () {
        null !== debounceResize && clearTimeout(debounceResize), debounceResize = setTimeout(MkfullWidthRow, 100)
      })
    }(jQuery),
    function ($) {
      "use strict";
      MK.component.Grid = function (el) {
        var $container = $(el),
          config = $container.data("grid-config"),
          isSlideshow = $container.closest('[data-mk-component="SwipeSlideshow"]').length,
          miniGridConfig = {
            container: el,
            item: config.item + ":not(.is-hidden)",
            gutter: 0
          },
          prepareForGrid = function () {
            var $item = $(this);
            "none" === $item.css("display") ? $item.addClass("is-hidden") : $item.removeClass("is-hidden")
          },
          create = function () {
            function draw() {
              $container.find(config.item).each(prepareForGrid), minigrid(miniGridConfig)
            }

            function redraw() {
              timer && clearTimeout(timer), timer = setTimeout(draw, 100)
            }
            var timer = null;
            draw(), $(window).off("resize", redraw), $(window).on("resize", redraw), MK.utils.eventManager.subscribe("item-expanded", redraw), MK.utils.eventManager.subscribe("ajaxLoaded", redraw), MK.utils.eventManager.subscribe("staticFilter", redraw)
          };
        return {
          init: function () {
            isSlideshow || MK.core.loadDependencies([MK.core.path.plugins + "minigrid.js"], create)
          }
        }
      }
    }(jQuery),
    function ($) {
      "use strict";

      function createAll(scope) {
        for (var i = 0, l = families.length; i < l; i++) {
          var family = families[i][0],
            prefix = families[i][1],
            $icons = getIcons(family, prefix, scope);
          $icons.length && (_roundCount++, setTimeout(createIcons, 0, $icons, family, prefix))
        }
      }

      function getIcons(family, prefix, scope) {
        var $scope = $(scope),
          $icons = $scope.find("[class*=" + prefix + "]"),
          extraClassNames = extend[family];
        return extraClassNames ? (extraClassNames.forEach(function (className) {
          var $icon = $scope.find(className);
          $icons = $icons.add($icon)
        }), $icons) : $icons
      }

      function createIcons($icons, family, prefix, i, unicode) {
        var id = i || 0,
          icon = $icons[id];
        if (!icon) return _roundCount--, void getIconsSprite(insertIcons, $icons, _roundCount, _config);
        var css = getComputedStyle(icon, ":before"),
          classAttr = icon.getAttribute("class"),
          name = !!classAttr && matchClass(classAttr.split(" "), prefix),
          h = getComputedStyle(icon).fontSize,
          config = createConfig(css, name, family, unicode, h),
          cache = JSON.stringify(config);
        config && (_cache[cache] ? void 0 === _iconMap[cache] ? _iconMap[cache] = [$icons.eq(id)] : _iconMap[cache].push($icons.eq(id)) : (void 0 === _iconMap[cache] ? _iconMap[cache] = [$icons.eq(id)] : _iconMap[cache].push($icons.eq(id)), _cache[cache] = _cacheId.toString(), config.id = _cacheId, _config.push(config), _cacheId++)), createIcons($icons, family, prefix, ++id)
      }

      function insertIcons(sprite, $icons) {
        var $sprite = $(sprite),
          idMap = ($sprite.find("svg"), invert(_cache));
        $sprite.each(function () {
          var $svg = $(this),
            id = $svg.attr("data-cacheid"),
            configKey = idMap[id];
          _cache[configKey] = this
        }), Object.keys(_iconMap).forEach(function (cacheKey) {
          _iconMap[cacheKey].forEach(function ($icons) {
            $icons.each(function () {
              var $svg = $(_cache[cacheKey]).clone(),
                $icon = $(this);
              $svg.length && function () {
                $icon.parents(".pricing-features") || $icon.not(".mk-jupiter-icon-xing").not(".mk-jupiter-icon-square-xing").not(".mk-jupiter-icon-simple-xing").find(".mk-svg-icon").not('[data-name="mk-moon-zoom-in"]').remove()
              }(), $icon.find("svg").length || ($icon.parents(".widget ul").length ? $icon.prepend($svg) : $icon.append($svg))
            })
          })
        }), MK.utils.eventManager.publish("iconsInsert")
      }

      function createConfig(css, name, family, unicode, height) {
        var hasGradient = checkGradient(css),
          hasDirection = extractGradient("direction", css.background),
          config = {
            family: family,
            unicode: unicode || decodeUnicode(css.content),
            name: name,
            gradient_type: !!hasGradient && extractGradient("type", css.background),
            gradient_start: !!hasGradient && extractGradient("start", css.background),
            gradient_stop: !!hasGradient && extractGradient("stop", css.background),
            gradient_direction: !!hasDirection && extractGradient("direction", css.background).replace(" ", "-"),
            height: height
          };
        return !(!config.name && !config.unicode) && config
      }

      function matchClass(classes, prefix) {
        for (var i = 0, l = classes.length; i < l; i++)
          if (-1 !== classes[i].indexOf(prefix)) return classes[i]
      }

      function checkGradient(css) {
        var bg = css.background;
        return (-1 !== bg.indexOf("radial") || -1 !== bg.indexOf("linear")) && bg
      }

      function extractGradient(attr, grad) {
        if (!grad) return !1;
        var f, t, isRadial = -1 !== grad.indexOf("radial"),
          isLinear = -1 !== grad.indexOf("linear"),
          hasDirection = -1 !== grad.indexOf("(to");
        if ("type" === attr) {
          if (isRadial) return "radial";
          if (isLinear) return "linear"
        } else if ("start" === attr) f = getStrPosition(grad, "rgb(", 1), t = getStrPosition(grad, "0%", 1);
        else if ("stop" === attr) f = getStrPosition(grad, "rgb(", 2), t = getStrPosition(grad, "100%", 1);
        else {
          if ("direction" !== attr) return !1;
          if (!hasDirection) return !1;
          f = getStrPosition(grad, "(to", 1) + 4, t = getStrPosition(grad, ", rgb(", 1)
        }
        return grad.slice(f, t)
      }

      function getStrPosition(str, m, i) {
        return str.split(m, i).join(m).length
      }

      function decodeUnicode(content) {
        return !(!content || "none" === content) && escape(content).replace(/%22/g, "").replace("%u", "").toLowerCase()
      }

      function invert(obj) {
        var new_obj = {};
        for (var prop in obj) obj.hasOwnProperty(prop) && (new_obj[obj[prop]] = prop);
        return new_obj
      }
      var families = [["awesome-icons", "mk-icon-"], ["icomoon", "mk-moon-"], ["pe-line-icons", "mk-li-"], ["theme-icons", "mk-jupiter-icon-"]],
        extend = {
          "awesome-icons": [],
          icomoon: [],
          "pe-line-icons": [],
          "theme-icons": []
        },
        _cache = {},
        _cacheId = 0,
        _config = [],
        _roundCount = 0,
        _iconMap = {},
        getIconsSprite = function () {
          function run(callback) {
            var config = encodeURIComponent(JSON.stringify(_config));
            $.ajax({
              url: MK.core.path.ajaxUrl,
              method: "POST",
              data: {
                action: "mk_get_icon",
                iterator: iterator++,
                config: config
              },
              success: function (sprite) {
                callback(sprite, $icons), _config = [], _iconMap = {}, $icons = null
              },
              error: function (err) {
                console.log("Icon load problem")
              }
            })
          }
          var $icons = null,
            iterator = 0;
          return function (callback, $els, count) {
            $icons ? $icons.add($els) : $icons = $els, count || run(callback)
          }
        }();
      $(window).on("load", function () {
        setTimeout(function () {
          createAll(document), $(".mk-header").length && createAll(".mk-header"), $(".js-flexslider, .mk-flexslider").length && createAll(".js-flexslider, .mk-flexslider"), $(".mk-accordion").length && createAll(".mk-accordion")
        }, 1e3)
      }), MK.utils.eventManager.subscribe("ajaxLoaded", function () {
        setTimeout(createAll, 100, ".js-loop")
      }), MK.utils.eventManager.subscribe("ajax-preview", function () {
        setTimeout(createAll, 100, ".ajax-container")
      }), MK.utils.eventManager.subscribe("photoAlbum-open", function () {
        setTimeout(createAll, 100, ".gallery-share")
      }), MK.utils.eventManager.subscribe("quickViewOpen", function () {
        setTimeout(createAll, 300, ".mk-modal-content")
      })
    }(jQuery),
    function (t, e) {
      "function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", e) : "object" == typeof module && module.exports ? module.exports = e() : t.EvEmitter = e()
    }("undefined" != typeof window ? window : this, function () {
      function t() {}
      var e = t.prototype;
      return e.on = function (t, e) {
        if (t && e) {
          var i = this._events = this._events || {},
            n = i[t] = i[t] || [];
          return -1 == n.indexOf(e) && n.push(e), this
        }
      }, e.once = function (t, e) {
        if (t && e) {
          this.on(t, e);
          var i = this._onceEvents = this._onceEvents || {};
          return (i[t] = i[t] || {})[e] = !0, this
        }
      }, e.off = function (t, e) {
        var i = this._events && this._events[t];
        if (i && i.length) {
          var n = i.indexOf(e);
          return -1 != n && i.splice(n, 1), this
        }
      }, e.emitEvent = function (t, e) {
        var i = this._events && this._events[t];
        if (i && i.length) {
          var n = 0,
            o = i[n];
          e = e || [];
          for (var r = this._onceEvents && this._onceEvents[t]; o;) {
            var s = r && r[o];
            s && (this.off(t, o), delete r[o]), o.apply(this, e), n += s ? 0 : 1, o = i[n]
          }
          return this
        }
      }, t
    }),
    function (t, e) {
      "use strict";
      "function" == typeof define && define.amd ? define(["ev-emitter/ev-emitter"], function (i) {
        return e(t, i)
      }) : "object" == typeof module && module.exports ? module.exports = e(t, require("ev-emitter")) : t.imagesLoaded = e(t, t.EvEmitter)
    }(window, function (t, e) {
      function i(t, e) {
        for (var i in e) t[i] = e[i];
        return t
      }

      function n(t) {
        var e = [];
        if (Array.isArray(t)) e = t;
        else if ("number" == typeof t.length)
          for (var i = 0; i < t.length; i++) e.push(t[i]);
        else e.push(t);
        return e
      }

      function o(t, e, r) {
        return this instanceof o ? ("string" == typeof t && (t = document.querySelectorAll(t)), this.elements = n(t), this.options = i({}, this.options), "function" == typeof e ? r = e : i(this.options, e), r && this.on("always", r), this.getImages(), h && (this.jqDeferred = new h.Deferred), void setTimeout(function () {
          this.check()
        }.bind(this))) : new o(t, e, r)
      }

      function r(t) {
        this.img = t
      }

      function s(t, e) {
        this.url = t, this.element = e, this.img = new Image
      }
      var h = t.jQuery,
        a = t.console;
      o.prototype = Object.create(e.prototype), o.prototype.options = {}, o.prototype.getImages = function () {
        this.images = [], this.elements.forEach(this.addElementImages, this)
      }, o.prototype.addElementImages = function (t) {
        "IMG" == t.nodeName && this.addImage(t), !0 === this.options.background && this.addElementBackgroundImages(t);
        var e = t.nodeType;
        if (e && d[e]) {
          for (var i = t.querySelectorAll("img"), n = 0; n < i.length; n++) {
            var o = i[n];
            this.addImage(o)
          }
          if ("string" == typeof this.options.background) {
            var r = t.querySelectorAll(this.options.background);
            for (n = 0; n < r.length; n++) {
              var s = r[n];
              this.addElementBackgroundImages(s)
            }
          }
        }
      };
      var d = {
        1: !0,
        9: !0,
        11: !0
      };
      return o.prototype.addElementBackgroundImages = function (t) {
        var e = getComputedStyle(t);
        if (e)
          for (var i = /url\((['"])?(.*?)\1\)/gi, n = i.exec(e.backgroundImage); null !== n;) {
            var o = n && n[2];
            o && this.addBackground(o, t), n = i.exec(e.backgroundImage)
          }
      }, o.prototype.addImage = function (t) {
        var e = new r(t);
        this.images.push(e)
      }, o.prototype.addBackground = function (t, e) {
        var i = new s(t, e);
        this.images.push(i)
      }, o.prototype.check = function () {
        function t(t, i, n) {
          setTimeout(function () {
            e.progress(t, i, n)
          })
        }
        var e = this;
        return this.progressedCount = 0, this.hasAnyBroken = !1, this.images.length ? void this.images.forEach(function (e) {
          e.once("progress", t), e.check()
        }) : void this.complete()
      }, o.prototype.progress = function (t, e, i) {
        this.progressedCount++, this.hasAnyBroken = this.hasAnyBroken || !t.isLoaded, this.emitEvent("progress", [this, t, e]), this.jqDeferred && this.jqDeferred.notify && this.jqDeferred.notify(this, t), this.progressedCount == this.images.length && this.complete(), this.options.debug && a && a.log("progress: " + i, t, e)
      }, o.prototype.complete = function () {
        var t = this.hasAnyBroken ? "fail" : "done";
        if (this.isComplete = !0, this.emitEvent(t, [this]), this.emitEvent("always", [this]), this.jqDeferred) {
          var e = this.hasAnyBroken ? "reject" : "resolve";
          this.jqDeferred[e](this)
        }
      }, r.prototype = Object.create(e.prototype), r.prototype.check = function () {
        return this.getIsImageComplete() ? void this.confirm(0 !== this.img.naturalWidth, "naturalWidth") : (this.proxyImage = new Image, this.proxyImage.addEventListener("load", this), this.proxyImage.addEventListener("error", this), this.img.addEventListener("load", this), this.img.addEventListener("error", this), void(this.proxyImage.src = this.img.src))
      }, r.prototype.getIsImageComplete = function () {
        return this.img.complete && void 0 !== this.img.naturalWidth
      }, r.prototype.confirm = function (t, e) {
        this.isLoaded = t, this.emitEvent("progress", [this, this.img, e])
      }, r.prototype.handleEvent = function (t) {
        var e = "on" + t.type;
        this[e] && this[e](t)
      }, r.prototype.onload = function () {
        this.confirm(!0, "onload"), this.unbindEvents()
      }, r.prototype.onerror = function () {
        this.confirm(!1, "onerror"), this.unbindEvents()
      }, r.prototype.unbindEvents = function () {
        this.proxyImage.removeEventListener("load", this), this.proxyImage.removeEventListener("error", this), this.img.removeEventListener("load", this), this.img.removeEventListener("error", this)
      }, s.prototype = Object.create(r.prototype), s.prototype.check = function () {
        this.img.addEventListener("load", this), this.img.addEventListener("error", this), this.img.src = this.url, this.getIsImageComplete() && (this.confirm(0 !== this.img.naturalWidth, "naturalWidth"), this.unbindEvents())
      }, s.prototype.unbindEvents = function () {
        this.img.removeEventListener("load", this), this.img.removeEventListener("error", this)
      }, s.prototype.confirm = function (t, e) {
        this.isLoaded = t, this.emitEvent("progress", [this, this.element, e])
      }, o.makeJQueryPlugin = function (e) {
        (e = e || t.jQuery) && (h = e, h.fn.imagesLoaded = function (t, e) {
          return new o(this, t, e).jqDeferred.promise(h(this))
        })
      }, o.makeJQueryPlugin(), o
    }),
    function ($, window) {
      "use strict";

      function pagination() {
        function bindHandlers() {
          isLoadBtn && $loadBtn.on("click", handleClick), isInfiniteScroll && $window.on("scroll", handleScroll), isHandlerBinded = !0
        }

        function unbindHandlers() {
          isLoadBtn && $loadBtn.off("click", handleClick), isInfiniteScroll && $window.off("scroll", handleScroll), isHandlerBinded = !1
        }

        function handleClick(e) {
          e.preventDefault(), ajaxLoader.isLoading || loadMore()
        }

        function handleScroll() {
          scrollY() > scrollCheckPoint() && !ajaxLoader.isLoading && loadMore()
        }

        function loadMore() {
          loadingIndicatorStart();
          var page = ajaxLoader.getData("paged");
          ajaxLoader.setData({
            paged: ++page
          }), ajaxLoader.load(unique)
        }

        function onLoad(e, response) {
          void 0 !== response && response.id === id && (ajaxLoader.getData("found_posts") <= 0 && ajaxLoader.getData("paged") >= ajaxLoader.getData("maxPages") ? loadingIndicatorHide() : loadingIndicatorShow(), response.unique === unique && $container.append(response.content), loadingIndicatorStop())
        }

        function loadingIndicatorStart() {
          isLoadBtn ? $loadBtn.addClass("is-active") : isInfiniteScroll && MK.ui.loader.add(".js-load-more-scroll")
        }

        function loadingIndicatorStop() {
          isLoadBtn ? $loadBtn.removeClass("is-active") : isInfiniteScroll && MK.ui.loader.remove(".js-load-more-scroll")
        }

        function loadingIndicatorShow() {
          isHandlerBinded || (isLoadBtn ? $loadBtn.show() : isInfiniteScroll && $loadScroll.show(), bindHandlers())
        }

        function loadingIndicatorHide() {
          isHandlerBinded && (isLoadBtn ? $loadBtn.hide() : isInfiniteScroll && $loadScroll.hide(), unbindHandlers())
        }

        function spyScrollCheckPoint() {
          var containerO = 0,
            containerH = dynamicHeight($superContainer),
            winH = dynamicHeight(window),
            setVals = function () {
              containerO = $superContainer.offset().top
            };
          return setVals(), $window.on("resize", function () {
              requestAnimationFrame(setVals)
            }),
            function () {
              return containerH() + containerO - 2 * winH()
            }
        }
        var unique = Date.now(),
          $container = $(this),
          $superContainer = $container.parent(),
          $loadBtn = $container.siblings(".js-loadmore-holder").find(".js-loadmore-button"),
          $loadScroll = $(".js-load-more-scroll"),
          style = $container.data("pagination-style"),
          id = ($container.data("max-pages"), "#" + $container.attr("id")),
          ajaxLoader = new MK.utils.ajaxLoader(id),
          isLoadBtn = 2 === style,
          isInfiniteScroll = 3 === style,
          scrollCheckPoint = null,
          isHandlerBinded = !1;
        ajaxLoader.init(),
          function () {
            MK.utils.eventManager.subscribe("ajaxLoaded", onLoad), bindHandlers(), isInfiniteScroll && (scrollCheckPoint = spyScrollCheckPoint()), $window.on("vc_reload", function () {
              $window.off("scroll", handleScroll)
            })
          }()
      }
      var scrollY = MK.val.scroll,
        dynamicHeight = MK.val.dynamicHeight,
        $window = $(window);
      $(".js-loop").each(pagination), $window.on("vc_reload", function () {
        $(".js-loop").each(pagination)
      })
    }(jQuery, window),
    function ($) {
      "use strict";

      function isHidden(el) {
        return null === el.offsetParent
      }
      MK.component.Masonry = function (el) {
        var $window = $(window),
          $container = $(el),
          config = $container.data("masonry-config"),
          $masonryItems = $container.find(config.item),
          cols = config.cols || 8,
          wall = null,
          init = function () {
            MK.core.loadDependencies([MK.core.path.plugins + "freewall.js"], onDepLoad)
          },
          onDepLoad = function () {
            masonry(), $window.on("resize", onResize), MK.utils.eventManager.subscribe("ajaxLoaded", onPostAddition), MK.utils.eventManager.subscribe("staticFilter", resize)
          },
          masonry = function () {
            if (!isHidden(el)) {
              var newCols;
              newCols = window.matchMedia("(max-width:600px)").matches ? 2 : window.matchMedia("(max-width:850px)").matches ? 4 : cols;
              var colW = $container.width() / newCols;
              wall = new Freewall(config.container), wall.reset({
                selector: config.item + ":not(.is-hidden)",
                gutterX: 0,
                gutterY: 0,
                cellW: colW,
                cellH: colW
              }), wall.fillHoles(), wall.fitWidth(), $masonryItems.each(function () {
                $(this).data("loaded", !0)
              })
            }
          },
          destroyContainer = function () {
            $container.removeAttr("style").removeData("wall-height").removeData("wall-width").removeData("min-width").removeData("total-col").removeData("total-row").removeAttr("data-wall-height").removeAttr("data-wall-width").removeAttr("data-min-width").removeAttr("data-total-col").removeAttr("data-total-row")
          },
          destroyItem = function () {
            $(this).removeAttr("style").removeData("delay").removeData("height").removeData("width").removeData("state").removeAttr("data-delay").removeAttr("data-height").removeAttr("data-width").removeAttr("data-state")
          },
          destroyAll = function () {
            wall && (wall.destroy(), destroyContainer(), $masonryItems.each(destroyItem))
          },
          onResize = function () {
            requestAnimationFrame(resize)
          },
          resize = function () {
            destroyAll(), masonry()
          },
          onPostAddition = function () {
            $masonryItems = $container.find(config.item), $masonryItems.each(function () {
              var $item = $(this);
              $item.data("loaded") || $item.css("visibility", "hidden")
            }), $container.mk_imagesLoaded().then(function () {
              destroyAll(), masonry()
            })
          };
        return {
          init: init
        }
      }
    }(jQuery),
    function ($) {
      "use strict";
      MK.component.Pagination = function (el) {
        this.el = el
      }, MK.component.Pagination.prototype = {
        init: function () {
          this.cacheElements(), this.bindEvents(), this.onInitLoad()
        },
        cacheElements: function () {
          this.lastId = 1, this.unique = Date.now(), this.$pagination = $(this.el), this.$container = this.$pagination.prev(".js-loop"), this.$pageLinks = this.$pagination.find(".js-pagination-page"), this.$nextLink = this.$pagination.find(".js-pagination-next"), this.$prevLink = this.$pagination.find(".js-pagination-prev"), this.$current = this.$pagination.find(".js-current-page"), this.$maxPages = this.$pagination.find(".pagination-max-pages"), this.containerId = "#" + this.$container.attr("id"), this.pagePathname = window.location.pathname, this.pageSearch = window.location.search, this.popState = !1, this.ajaxLoader = new MK.utils.ajaxLoader("#" + this.$container.attr("id")), this.ajaxLoader.init()
        },
        bindEvents: function () {
          this.$pageLinks.on("click", this.pageClick.bind(this)), this.$nextLink.on("click", this.nextClick.bind(this)), this.$prevLink.on("click", this.prevClick.bind(this)), MK.utils.eventManager.subscribe("ajaxLoaded", this.onLoad.bind(this))
        },
        pageClick: function (e) {
          e.preventDefault();
          var $this = $(e.currentTarget),
            id = parseFloat($this.attr("data-page-id"));
          id > this.ajaxLoader.getData("maxPages") || id < 1 || (this.load(id, $this), this.updatePagedNumUrl(id))
        },
        nextClick: function (e) {
          e.preventDefault(), this.ajaxLoader.getData("paged") !== this.ajaxLoader.getData("maxPages") && (this.load(++this.lastId, $(e.currentTarget)), this.updatePagedNumUrl(this.lastId))
        },
        prevClick: function (e) {
          e.preventDefault(), 1 !== this.ajaxLoader.getData("paged") && (this.load(--this.lastId, $(e.currentTarget)), this.updatePagedNumUrl(this.lastId))
        },
        load: function (id, $el) {
          this.lastId = id, this.ajaxLoader.setData({
            paged: id
          }), this.ajaxLoader.load(this.unique), this.removeIndicator(), MK.ui.loader.add($el)
        },
        onLoad: function (e, response) {
          void 0 !== response && response.id === this.containerId && (this.updatePagination(), this.lastId = this.ajaxLoader.getData("paged"), response.unique === this.unique && (this.removeIndicator(), this.scrollPage(), this.$container.html(response.content)))
        },
        updatePagination: function () {
          var self = this,
            isFirst = 1 === this.ajaxLoader.getData("paged"),
            isLast = this.ajaxLoader.getData("paged") === this.ajaxLoader.getData("maxPages");
          isFirst ? this.$prevLink.addClass("is-vis-hidden") : this.$prevLink.removeClass("is-vis-hidden"), isLast ? this.$nextLink.addClass("is-vis-hidden") : this.$nextLink.removeClass("is-vis-hidden"), this.$current.html(this.ajaxLoader.getData("paged")), this.$maxPages.html(this.ajaxLoader.getData("maxPages"));
          this.ajaxLoader.getData("maxPages") > 10 ? this.$pageLinks.each(function (i) {
            var id = self.lastId - 5;
            id = Math.max(id, 1), id = Math.min(id, self.ajaxLoader.getData("maxPages") - 10 + 1), id += i, $(this).html(id).attr("data-page-id", id).show(), 0 === i && id > 1 && $(this).html("..."), 9 === i && id < self.ajaxLoader.getData("maxPages") && $(this).html("...")
          }) : this.$pageLinks.each(function (i) {
            var $link = $(this),
              id = i + 1;
            $link.html(id).attr("data-page-id", id), 1 === self.ajaxLoader.getData("maxPages") ? self.$pageLinks.hide() : i > self.ajaxLoader.getData("maxPages") - 1 ? $link.hide() : $link.show()
          }), this.$pageLinks.filter('[data-page-id="' + this.ajaxLoader.getData("paged") + '"]').addClass("current-page").siblings().removeClass("current-page")
        },
        scrollPage: function () {
          var containerOffset = this.$container.offset().top,
            offset = containerOffset - MK.val.offsetHeaderHeight(containerOffset) - 20;
          MK.utils.scrollTo(offset)
        },
        removeIndicator: function () {
          MK.ui.loader.remove(".js-pagination-page, .js-pagination-next, .js-pagination-prev")
        },
        onInitLoad: function () {
          var initPagedID = this.$pagination.data("init-pagination");
          if (initPagedID && initPagedID > 1 && (this.$current.html(initPagedID), this.$pageLinks.filter('[data-page-id="' + initPagedID + '"]').addClass("current-page").siblings().removeClass("current-page")), "onpopstate" in window) {
            var thisPop = this;
            window.onpopstate = function (event) {
              var id = 1;
              if ("object" == typeof event.state && event.state) {
                var state = event.state;
                if (state.hasOwnProperty("MkPagination")) {
                  var currentState = state.MkPagination;
                  currentState.hasOwnProperty("paged") && (id = parseFloat(currentState.paged))
                }
              } else id = parseFloat(thisPop.getURLPagedID());
              thisPop.popState = !0, thisPop.$pageLinks.filter('[data-page-id="' + id + '"]').trigger("click")
            }
          }
        },
        updatePagedNumUrl: function (id) {
          if ("history" in window && "pushState" in history && id && !this.popState) {
            var fullPage = this.pagePathname + this.pageSearch,
              isQueryPage = !1,
              newPage = "page/" + id + "/",
              expPage = /page\/\d+\/?/;
            !!!this.pagePathname.match(/\/page\/\d+/) && this.pageSearch && (isQueryPage = this.pageSearch.match(/page\=\d+/)) && (newPage = "page=" + id, expPage = /page\=\d+/), 1 === id && (newPage = "", isQueryPage && (expPage = this.pageSearch.match(/\&+/) ? /page\=\d+\&?/ : /\?page\=\d+\&?/));
            var newURL = this.pagePathname + newPage + this.pageSearch;
            fullPage.match(expPage) && (newURL = fullPage.replace(expPage, newPage));
            var historyState = {
              MkPagination: {
                url: newURL,
                paged: id
              }
            };
            this.popState = !1, window.history.pushState(historyState, null, newURL)
          }
          this.popState = !1
        },
        getURLPagedID: function () {
          var pathname = window.location.pathname,
            search = window.location.search,
            pagedId = 1,
            result = "",
            isPagedExist = !1;
          return result = pathname.match(/\/page\/(\d+)/), result && (isPagedExist = !0, pagedId = result.hasOwnProperty(1) ? result[1] : 1), !isPagedExist && search && (result = search.match(/page\=(\d+)/)) && (isPagedExist = !0, pagedId = result.hasOwnProperty(1) ? result[1] : 1), pagedId
        }
      }
    }(jQuery),
    function ($) {
      "use strict";
      var val = MK.val;
      MK.utils;
      MK.component.Parallax = function (el) {
        var $this = $(el),
          obj = $this[0],
          $window = $(window),
          container = document.getElementById("mk-theme-container"),
          config = $this.data("parallax-config"),
          headerHeight = ($(config.holder), null),
          offset = null,
          elHeight = null,
          ticking = !1,
          isMobile = null,
          clientRect = null,
          update = function () {
            if (obj.style.transform = null, obj.style.top = null, obj.style.bottom = null, isMobile = MK.utils.isMobile()) return void $this.css("height", "");
            clientRect = $this[0].getBoundingClientRect(), offset = clientRect.top, elHeight = clientRect.height, headerHeight = val.offsetHeaderHeight(offset), offset = offset - headerHeight + val.scroll(), setPosition(), setSize()
          },
          h = 0,
          winH = 0,
          proportion = 0,
          height = 0,
          setSize = function () {
            if ($this.css("height", ""), winH = $window.height() - headerHeight, h = obj.getBoundingClientRect().height, config.speed <= 1 && config.speed > 0) 0 === offset ? $this.css({
              backgroundAttachment: "scroll",
              "will-change": "transform"
            }) : $this.css({
              height: h + (winH - h) * config.speed,
              backgroundAttachment: "scroll",
              "will-change": "transform"
            });
            else if (config.speed > 1 && h <= winH) $this.css({
              height: winH + 2 * (winH * config.speed - winH),
              top: -(winH * config.speed - winH),
              backgroundAttachment: "scroll",
              "will-change": "transform"
            });
            else if (config.speed > 1 && h > winH) proportion = h / winH, height = winH + (winH * config.speed - winH) * (1 + proportion), $this.css({
              height: height,
              top: -(height - winH * config.speed),
              backgroundAttachment: "scroll",
              "will-change": "transform"
            });
            else if (config.speed < 0 && h >= winH) height = h * (1 - config.speed), $this.css({
              height: height + (height - h),
              top: h - height,
              backgroundAttachment: "scroll",
              "will-change": "transform"
            });
            else if (config.speed < 0 && h < winH) {
              var display = (winH + h) / winH;
              height = h * -config.speed * display, $this.css({
                height: h + 2 * height,
                top: -height,
                backgroundAttachment: "scroll",
                "will-change": "transform"
              })
            }
          },
          currentPoint = null,
          startPoint = null,
          endPoint = null,
          scrollY = (config.opacity && $this.find(config.opacity), null),
          setPosition = function () {
            if (startPoint = offset - winH, endPoint = offset + elHeight + winH - headerHeight, (scrollY = val.scroll()) < startPoint || scrollY > endPoint) return void(ticking = !1);
            currentPoint = (-offset + scrollY) * config.speed, $this.css({
              "-webkit-transform": "translateY(" + currentPoint + "px) translateZ(0)",
              "-moz-transform": "translateY(" + currentPoint + "px) translateZ(0)",
              "-ms-transform": "translateY(" + currentPoint + "px) translateZ(0)",
              "-o-transform": "translateY(" + currentPoint + "px) translateZ(0)",
              transform: "translateY(" + currentPoint + "px) translateZ(0)"
            }), ticking = !1
          },
          requestTick = function () {
            ticking || isMobile || (ticking = !0, window.requestAnimationFrame(setPosition))
          };
        return {
          init: function () {
            MK.utils.isSmoothScroll && (update(), setTimeout(update, 100), $window.on("load", update), $window.on("resize", update), window.addResizeListener(container, update), $window.on("scroll", requestTick))
          }
        }
      }
    }(jQuery),
    function ($) {
      "use strict";
      MK.component.Preloader = function (el) {
        this.el = el
      }, MK.component.Preloader.prototype = {
        init: function () {
          this.cacheElements(), this.bindEvents()
        },
        cacheElements: function () {
          this.$preloader = $(this.el)
        },
        bindEvents: function () {
          this.onLoad()
        },
        onLoad: function () {
          setTimeout(this.hidePreloader.bind(this), 300)
        },
        hidePreloader: function () {
          this.$preloader.hide()
        }
      }
    }(jQuery),
    function ($) {
      "use strict";
      MK.ui.loader = {
        tpl: function () {
          return '<div class="mk-loading-indicator"><div class="mk-loading-indicator__inner"><div class="mk-loading-indicator__icon"></div><img style="height:100%; width:auto;" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"></div></div>'
        },
        add: function (item) {
          $(item).append(this.tpl)
        },
        remove: function (item) {
          item ? $(item).find(".mk-loading-indicator").remove() : $(".mk-loading-indicator").remove()
        }
      }
    }(jQuery),
    function ($) {
      if ("Edge" === MK.utils.browser.name || "IE" === MK.utils.browser.name) {
        var val = 1,
          $edgeClipper = $(".mk-slider-slide"),
          $sectionClipper = $(".clipper-true"),
          $bgLayer = $(".background-layer"),
          onScroll = function () {
            val *= -1, $edgeClipper.length && $edgeClipper.each(redraw), $sectionClipper.length && $sectionClipper.each(redraw), $bgLayer.length && $bgLayer.each(redraw)
          },
          redraw = function () {
            $(this).css("margin-top", val / 100)
          };
        $(window).on("scroll", function () {
          window.requestAnimationFrame(onScroll)
        })
      }
    }(jQuery), MK.component.ResponsiveImageSetter = function ($) {
      "use strict";

      function run($imgs) {
        $imgs.filter(function () {
          return !this.hasAttribute("mk-img-src-setted")
        }).each(setSrcAttr)
      }

      function setSrcAttr() {
        var $img = $(this),
          set = $img.data("mk-image-src-set");
        "false" === set.responsive && isRetina && set["2x"] ? $img.attr("src", set["2x"]) : "false" === set.responsive ? $img.attr("src", set.default) : 1 === viewportClass && isRetina && set["2x"] ? $img.attr("src", set["2x"]) : 0 === viewportClass && set.mobile ? $img.attr("src", set.mobile) : $img.attr("src", set.default)
      }

      function getViewportClass() {
        return window.matchMedia("(max-width: 736px)").matches ? 0 : 1
      }

      function handleResize($imgs) {
        if ($imgs.length) {
          var currentViewportClass = getViewportClass();
          currentViewportClass > viewportClass && (viewportClass = currentViewportClass, run($imgs))
        }
      }
      var module = {},
        viewportClass = getViewportClass(),
        isRetina = window.devicePixelRatio >= 2;
      return module.init = function ($imgs) {
        $imgs.length && (run($imgs), $imgs.attr("mk-img-src-setted", ""))
      }, module.onResize = function ($imgs) {
        $(window).on("resize", MK.utils.throttle(500, function () {
          handleResize($imgs)
        }))
      }, module.handleAjax = function () {
        setTimeout(function () {
          var $newImgs = $("img[data-mk-image-src-set]").filter(function () {
            return !this.hasAttribute("mk-lazyload")
          });
          $newImgs.length && run($newImgs)
        }, 100)
      }, module
    }(jQuery), jQuery(function ($) {
      var init = function () {
        $allImages = $("img[data-mk-image-src-set]").filter(function (index) {
          var isNotPortfolioImage = !$(this).hasClass("portfolio-image"),
            isNotBlogImage = 0 == $(this).closest(".mk-blog-container").length,
            isNotSwiperImage = !$(this).hasClass("swiper-slide-image"),
            isNotGalleryImage = !$(this).hasClass("mk-gallery-image");
          return isNotPortfolioImage && isNotBlogImage && isNotSwiperImage && isNotGalleryImage
        }), MK.component.ResponsiveImageSetter.onResize($allImages), MK.component.ResponsiveImageSetter.init($allImages), MK.utils.eventManager.subscribe("ajaxLoaded", MK.component.ResponsiveImageSetter.handleAjax), MK.utils.eventManager.subscribe("ajax-preview", MK.component.ResponsiveImageSetter.handleAjax), MK.utils.eventManager.subscribe("quickViewOpen", MK.component.ResponsiveImageSetter.handleAjax)
      };
      init(), $(window).on("vc_reload", init)
    }),
    function ($) {
      "use strict";
      var utils = MK.utils,
        val = MK.val,
        $topLevelSections = $("#theme-page > .vc_row, #theme-page > .mk-main-wrapper-holder, #theme-page > .mk-page-section");
      $(document).on("click", ".mk-skip-to-next", function () {
        var $this = $(this),
          btnHeight = $this.hasClass("edge-skip-slider") ? 150 : 76,
          offset = $this.offset().top + btnHeight,
          nextOffset = utils.nextHigherVal(utils.offsets($topLevelSections), [offset]);
        utils.scrollTo(nextOffset - val.offsetHeaderHeight(nextOffset))
      })
    }(jQuery),
    function ($) {
      "use strict";
      MK.ui.Slider = function (container, config) {
        var defaults = {
          slide: ".mk-slider-slide",
          nav: ".mk-slider-nav",
          effect: "roulete",
          ease: "easeOutQuart",
          slidesPerView: 1,
          slidesToView: 1,
          transitionTime: 700,
          displayTime: 3e3,
          autoplay: !0,
          hasNav: !0,
          hasPagination: !0,
          paginationTpl: "<span></span>",
          paginationEl: "#pagination",
          draggable: !0,
          fluidHeight: !1,
          pauseOnHover: !1,
          lazyload: !1,
          activeClass: "is-active",
          edgeSlider: !1,
          spinnerTpl: '<div class="mk-slider-spinner-wrap"><div class="mk-slider-spinner-fallback"></div><svg class="mk-slider-spinner" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg"><circle class="mk-slider-spinner-path" fill="none" stroke-width="4" stroke-linecap="round" cx="33" cy="33" r="30"></circle></svg></div>',
          onInitialize: function () {},
          onAfterSlide: function (id) {},
          onBeforeSlide: function (id) {}
        };
        this.state = {
          id: 0,
          moveForward: !0,
          running: !1,
          zIFlow: null,
          stop: !1
        }, this.config = $.extend(defaults, config), this.container = container, this.initPerView = this.config.slidesPerView, this.activeTimer = null, this.autoplay = null, this.timer = null, this.timerRemaining = parseInt(this.config.displayTime), this.config.lazyload = JSON.parse(this.config.lazyload), this.config.edgeSlider = JSON.parse(this.config.edgeSlider), this.imageLoader = null, imagesLoaded.prototype.abort = function () {
          this.progress = this.complete = function () {}
        }
      }, MK.ui.Slider.prototype = {
        init: function () {
          if (this.setPerViewItems(), this.cacheElements(), this.getSlideSize(), this.bindEvents(), this.setSize(), this.setPos(), this.updateId(-1), this.updateId(1), this.val = this.dynamicVal(), this.timeline = this.prepareTimeline(this.config.transitionTime), this.timeline.build(), this.config.hasPagination && this.buildPagination(), this.config.autoplay && document.hasFocus() && this.setTimer(), "function" == typeof this.config.onInitialize && this.config.onInitialize(this.slides), !0 === this.config.fluidHeight && ($(this.slides).height("auto"), $(this.container).css("transition", "height 200ms ease-out"), this.setHeight(0)), "toHighest" === this.config.fluidHeight && this.setHeightToHighest(), $(this.slides).each(this.createTimer), this.config.lazyload && this.config.edgeSlider) {
            if (0 === $(this.slides[this.state.id]).find("video").length) {
              var $slideImg = $(this.slides[this.state.id]).children("[data-mk-img-set]");
              MK.component.BackgroundImageSetter.init($slideImg)
            }
            $(this.config.spinnerTpl).prependTo(this.$slides)
          } else MK.component.BackgroundImageSetter.init($(this.slides).children("[data-mk-img-set]"))
        },
        cacheElements: function () {
          this.container = this.isNode(this.container) ? this.container : document.querySelectorAll(this.container)[0], this.slides = this.container.querySelectorAll(this.config.slide), this.$slides = $(this.slides), this.config.hasNav && (this.$nav = $(this.config.nav)), this.config.hasPagination && (this.$pagination = $(this.config.paginationEl))
        },
        bindEvents: function () {
          var $window = $(window);
          this.config.slidesPerView > 1 && $window.on("resize", this.setPerViewItems.bind(this)), this.config.hasNav && this.eventsNav(), this.config.hasPagination && this.eventsPag(), this.config.draggable && this.dragHandler(), this.config.autoplay && ($window.on("focus", this.windowActive.bind(this)), $window.on("blur", this.windowInactive.bind(this))), this.config.pauseOnHover && ($(this.container).on("mouseleave", this.setTimer.bind(this)), $(this.container).on("mouseenter", this.unsetTimer.bind(this))), "toHighest" === this.config.fluidHeight && $window.on("resize", this.setHeightToHighest.bind(this))
        },
        setPerViewItems: function () {
          window.matchMedia("(max-width: 500px)").matches ? this.config.slidesPerView = 1 : window.matchMedia("(max-width: 767px)").matches && this.initPerView >= 2 ? this.config.slidesPerView = 2 : window.matchMedia("(max-width: 1024px)").matches && this.initPerView >= 3 ? this.config.slidesPerView = 3 : this.config.slidesPerView = this.initPerView, void 0 !== this.slides && (this.getSlideSize(), this.setSize(), this.setPos(), this.timeline = this.prepareTimeline(this.config.transitionTime), this.timeline.build())
        },
        eventsNav: function () {
          this.$nav.on("click", "a", this.handleNav.bind(this))
        },
        eventsPag: function () {
          this.$pagination.on("click", "a", this.handlePagination.bind(this))
        },
        handleNav: function (e) {
          if (e.preventDefault(), !this.state.running) {
            this.state.running = !0;
            var $this = $(e.currentTarget),
              moveForward = "next" === $this.data("direction");
            this.config.autoplay && (this.unsetTimer(), setTimeout(this.setTimer.bind(this), this.config.transitionTime)), this.state.moveForward = moveForward, this.timeline.build(), this.timeline.play(), this.setActive(this.nextId(moveForward ? 1 : -1)), this.config.fluidHeight && this.setHeight(this.nextId(moveForward ? 1 : -1))
          }
        },
        handlePagination: function (e) {
          e.preventDefault();
          var $this = $(e.currentTarget),
            id = $this.index();
          this.goTo(id)
        },
        reset: function () {
          this.state.stop = !0, this.state.id = 0, this.setPos(), this.unsetTimer(), this.setTimer()
        },
        goTo: function (id) {
          if (!this.state.running) {
            this.state.running = !0;
            var lastId = this.state.id;
            lastId !== id && (this.state.moveForward = lastId < id, this.config.autoplay && (this.unsetTimer(), setTimeout(this.setTimer.bind(this), this.config.transitionTime)), this.timeline.build(Math.abs(lastId - id)), this.timeline.play(), this.setActive(id), this.config.fluidHeight && this.setHeight(id))
          }
        },
        windowActive: function () {
          this.setTimer(!1, !0), $(this.container).removeClass("is-paused")
        },
        windowInactive: function () {
          this.unsetTimer(), $(this.container).addClass("is-paused")
        },
        updateId: function (val) {
          this.state.id = this.nextId(val)
        },
        nextId: function (val) {
          var len = this.slides.length,
            insertVal = this.state.id + val;
          return insertVal = insertVal >= 0 ? insertVal : len + val, insertVal = insertVal >= len ? 0 : insertVal
        },
        setStyle: function (obj, style) {
          var hasT = style.transform,
            t = {
              x: hasT ? style.transform.translateX : null,
              y: hasT ? style.transform.translateY : null,
              scale: hasT ? style.transform.scale : null,
              rotate: hasT ? style.transform.rotate : null,
              rotateX: hasT ? style.transform.rotateX : null,
              rotateY: hasT ? style.transform.rotateY : null
            },
            x = t.x ? "translateX(" + t.x + "%)" : "translateX(0)",
            y = t.y ? "translateY(" + t.y + "%)" : "translateY(0)",
            s = t.scale ? "scale(" + t.scale + ")" : "scale(1)",
            r = t.rotate ? "rotate(" + t.rotate + "deg)" : "rotate(0)",
            rX = t.rotateX ? "rotateX(" + t.rotateX + "deg)" : "",
            rY = t.rotateY ? "rotateY(" + t.rotateY + "deg)" : "",
            o = style.opacity,
            h = style.height,
            w = style.width,
            c = "translateZ(0)" + x + y + s + r + rX + rY;
          c.length && (obj.style.webkitTransform = c, obj.style.msTransform = c, obj.style.transform = c), "number" == typeof o && (obj.style.opacity = o), h && (obj.style.height = h + "%"), w && (obj.style.width = w + "%")
        },
        setPos: function () {
          if (void 0 !== this.slides) {
            var id = this.state.id,
              i = 0,
              len = this.slides.length,
              animation = this.animation[this.config.effect],
              axis = animation.axis,
              animNext = animation.next,
              animActi = animation.active,
              animPrev = animation.prev,
              perView = this.config.slidesPerView,
              slideId = null,
              style = {};
            for (style.transform = {}; i < len; i += 1) i < perView ? (style = animActi, style.transform["translate" + axis] = 100 * i) : (style = this.state.moveForward ? animNext : animPrev, style.transform["translate" + axis] = this.state.moveForward ? 100 * perView : -100), this.slides[i].style.zIndex = 0, slideId = (i + id) % len, this.setStyle(this.slides[slideId], style)
          }
        },
        setSize: function () {
          if (void 0 !== this.slides) {
            var i = 0,
              len = this.slides.length,
              axis = this.animation[this.config.effect].axis,
              slideSize = this.slideSize,
              style = {};
            for ("Y" === axis ? style.height = slideSize[axis] : style.width = slideSize[axis]; i < len; i += 1) this.setStyle(this.slides[i], style)
          }
        },
        setHeight: function (id) {
          var $slides = $(this.slides),
            $activeSlide = $slides.eq(id),
            currentHeight = $activeSlide.height();
          $(this.container).height(currentHeight)
        },
        setHeightToHighest: function () {
          var $slides = $(this.slides),
            height = 0;
          $slides.each(function () {
            height = Math.max(height, $(this).find("> div").outerHeight())
          }), $(this.container).height(height)
        },
        prepareTimeline: function (time) {
          var timeProg, build, move, add, play, reverse, progress, kill, self = this,
            iteration = 0,
            totalIter = time / (1e3 / 60),
            animLoop = [],
            aL = 0,
            loops = 1,
            ease = this.config.ease,
            len = this.slides.length,
            perView = this.config.slidesPerView,
            animation = this.animation[this.config.effect],
            animAxis = animation.axis,
            animNext = animation.next,
            animActi = animation.active,
            animPrev = animation.prev,
            style = {},
            slideId = null,
            zIFlow = null;
          return style.transform = {}, build = function (repeats) {
            var currentEase = ease;
            if (loops = repeats || loops) {
              loops > 1 && (currentEase = "linearEase"), kill(), self.setPos();
              for (var id = self.state.id, moveForward = self.state.moveForward, i = 0, axisMove = moveForward ? -100 : 100; i <= perView; i += 1) slideId = (moveForward ? i + id : i + id - 1) % len, slideId = slideId < 0 ? len + slideId : slideId, style = 0 === i ? moveForward ? animPrev : animActi : i === perView ? moveForward ? animActi : animNext : animActi, zIFlow = self.state.moveForward ? animNext.zIndex : animPrev.zIndex, zIFlow && (self.slides[slideId].style.zIndex = "+" === zIFlow ? i + 1 : len - i), style.transform["translate" + animAxis] = axisMove, add(self.slides[slideId], style, currentEase)
            }
          }, add = function (slide, toStyles, ease) {
            if (void 0 === slide) throw "Add at least one slide";
            var fromStyles = slide.style,
              style = self.refStyle(toStyles, fromStyles);
            animLoop.push([slide, style, ease]), aL += 1
          }, move = function (startProg, mode) {
            if (!isTest) {
              var currentTotalIter = totalIter;
              if (loops > 1 && (currentTotalIter = totalIter / 5), self.state.running || (self.state.running = !0), startProg && (iteration = Math.ceil(startProg * currentTotalIter)), timeProg = iteration / currentTotalIter, progress(timeProg), iteration >= currentTotalIter && "play" === mode || iteration <= 0 && "reverse" === mode) return self.state.running = !1, iteration = 0, kill(), self.updateId(self.state.moveForward ? 1 : -1), loops -= 1, loops > 0 && (build(), play()), void(loops || (loops = 1, self.timerRemaining = parseInt(self.config.displayTime), self.config.onAfterSlide(self.state.id)));
              "play" === mode ? iteration += 1 : iteration -= 1, requestAnimationFrame(function () {
                self.state.stop || move(0, mode)
              })
            }
          }, play = function (startProg) {
            var $nextSlide = $(self.slides[self.nextId(self.state.moveForward ? 1 : -1)]);
            if (self.config.lazyload && self.config.edgeSlider) {
              var $slideImg = $nextSlide.find("[data-mk-img-set]");
              $slideImg.length && MK.component.BackgroundImageSetter.init($slideImg)
            }
            self.config.onBeforeSlide(self.nextId(self.state.moveForward ? 1 : -1));
            var start = startProg || 0;
            iteration = 0, self.state.stop = !1, move(start, "play")
          }, reverse = function (startProg) {
            move(startProg || 1, "reverse")
          }, progress = function (progVal) {
            var currentStyle, aI = 0;
            for (aI; aI < aL; aI++) 1 !== progVal && 0 !== progVal ? currentStyle = self.currentStyle(progVal, animLoop[aI][1], animLoop[aI][2]) : 1 === progVal ? currentStyle = self.currentStyle(progVal, animLoop[aI][1], "linearEase") : 0 === progVal && (currentStyle = self.currentStyle(progVal, animLoop[aI][1], "linearEase")), self.setStyle(animLoop[aI][0], currentStyle)
          }, kill = function () {
            animLoop = [], aL = 0
          }, {
            build: build,
            add: add,
            play: play,
            reverse: reverse,
            progress: progress
          }
        },
        refStyle: function (toStyles, fromStyles) {
          var initVal, changeVal, endVal, dynamicEnd, styleProp, transProp, transform, axis = this.animation[this.config.effect].axis,
            style = {};
          for (styleProp in toStyles)
            if ("transform" === styleProp) {
              transform = this.getTransforms(fromStyles), style.transform = {};
              for (transProp in toStyles.transform) "translateZ" !== transProp && (initVal = transform[transProp] || 0, dynamicEnd = transProp === "translate" + axis ? initVal : 0, endVal = toStyles.transform[transProp] + dynamicEnd, changeVal = endVal - initVal, style.transform[transProp] = [initVal, changeVal])
            } else {
              if ("zIndex" === styleProp) continue;
              initVal = parseFloat(fromStyles[styleProp]) || 0, endVal = toStyles[styleProp], changeVal = endVal - initVal, style[styleProp] = [initVal, changeVal]
            }
          return style
        },
        currentStyle: function (progress, style, ease) {
          var currentVals, styleProp, transProp, self = this,
            currentStyle = {};
          for (styleProp in style)
            if ("transform" === styleProp) {
              currentStyle.transform = {};
              for (transProp in style.transform) "translateZ" !== transProp && (currentVals = style.transform[transProp], currentStyle.transform[transProp] = self.ease[ease](progress, currentVals[0], currentVals[1], 1))
            } else currentVals = style[styleProp], currentStyle[styleProp] = self.ease[ease](progress, currentVals[0], currentVals[1], 1);
          return currentStyle
        },
        setActive: function (id) {
          var $slides = $(this.slides),
            className = this.config.activeClass;
          if ($slides.removeClass(className), this.config.hasPagination) {
            var $pagination = this.$pagination.find("a");
            $pagination.removeClass(className), $pagination.eq(id).addClass(className)
          }
          this.activeTimer && (clearTimeout(this.activeTimer), this.imageLoader && this.imageLoader.abort());
          var self = this;
          this.activeTimer = setTimeout(function () {
            var $currentSlide = $slides.eq(id);
            if (self.config.lazyload && self.config.edgeSlider)
              if ($currentSlide.find(".mk-section-video").length && $currentSlide.children(".mk-video-section-touch").length) {
                var imgSet = $currentSlide.children(".mk-video-section-touch").data("mk-img-set"),
                  exactImg = MK.component.BackgroundImageSetter.getImage(imgSet),
                  $bgImage = $("<img>").attr("src", exactImg);
                self.imageLoader = imagesLoaded($bgImage[0], function (instance) {
                  $currentSlide.children(".mk-slider-spinner-wrap").addClass("mk-slider-spinner-wrap-hidden"), setTimeout(function () {
                    $currentSlide.children(".mk-slider-spinner-wrap").hide()
                  }, 200), $currentSlide.addClass(className)
                })
              } else if ($currentSlide.find(".mk-section-video").length && 0 === $currentSlide.children(".mk-video-section-touch").length) $currentSlide.children(".mk-slider-spinner-wrap").addClass("mk-slider-spinner-wrap-hidden"), setTimeout(function () {
              $currentSlide.children(".mk-slider-spinner-wrap").hide()
            }, 200), $currentSlide.addClass(className);
            else if ($currentSlide.children("[data-mk-img-set]").length) {
              var imgSet = $currentSlide.children("[data-mk-img-set]").data("mk-img-set"),
                exactImg = MK.component.BackgroundImageSetter.getImage(imgSet),
                $bgImage = $("<img>").attr("src", exactImg);
              self.unsetTimer(), self.imageLoader = imagesLoaded($bgImage[0], function (instance) {
                $currentSlide.children(".mk-slider-spinner-wrap").addClass("mk-slider-spinner-wrap-hidden"), setTimeout(function () {
                  $currentSlide.children(".mk-slider-spinner-wrap").hide()
                }, 200), self.setTimer(!1, !1, $currentSlide.data("timer") || Number(self.config.displayTime)), $currentSlide.addClass(className)
              })
            } else $currentSlide.children(".mk-slider-spinner-wrap").addClass("mk-slider-spinner-wrap-hidden"), setTimeout(function () {
              $currentSlide.children(".mk-slider-spinner-wrap").hide()
            }, 200), self.setTimer(!1, !1, $currentSlide.data("timer") || Number(self.config.displayTime)), $currentSlide.addClass(className);
            else $currentSlide.addClass(className)
          }, this.config.transitionTime)
        },
        createTimer: function () {
          var $slide = $(this),
            video = $slide.find("video").get(0);
          if (video) var interval = setInterval(function () {
            video.readyState > 0 && ($slide.data("timer", 1e3 * video.duration), $slide.attr("data-timer", 1e3 * video.duration), clearInterval(interval))
          }, 100)
        },
        setTimer: function (isFirst, isPaused, fixed_time) {
          var create, run, customTimer = this.$slides.eq(this.nextId(this.state.moveForward ? 1 : -1)).data("timer"),
            trans = parseInt(this.config.transitionTime),
            interval = customTimer || parseInt(this.config.displayTime),
            timer = interval + trans,
            self = this,
            first = isFirst || !0,
            fixed_time = fixed_time || 0;
          this.timer = !0, this.lastSetTimer = Date.now(), create = function () {
            self.autoplay && clearTimeout(self.autoplay), self.timer && (self.state.moveForward = !0, self.timeline.build(), self.timeline.play(), self.setActive(self.nextId(1)), self.config.fluidHeight && self.setHeight(self.nextId(1)), first = !1, self.lastSetTimer = Date.now(), run())
          }, run = function (newInterval) {
            customTimer = self.$slides.eq(self.nextId(self.state.moveForward ? 1 : -1)).data("timer"), interval = customTimer || parseInt(self.config.displayTime), timer = interval + trans;
            var time = newInterval || timer;
            self.autoplay = setTimeout(create, time)
          }, fixed_time ? run(fixed_time) : isPaused ? run(this.timerRemaining) : run()
        },
        unsetTimer: function () {
          this.timer = !1, this.lastUnsetTimer = Date.now(), this.timerRemaining -= this.lastUnsetTimer - this.lastSetTimer, this.autoplay && clearTimeout(this.autoplay)
        },
        buildPagination: function () {
          for (var i = 0, len = this.slides.length, tpl = ""; i < len; i += 1) tpl += '<a href="javascript:;">' + this.config.paginationTpl + "</a>";
          this.$pagination.html(tpl), this.setActive(0)
        },
        getSlideSize: function () {
          this.slideSize = {
            X: 100 / this.config.slidesPerView,
            Y: 100 / this.config.slidesPerView
          }
        },
        getTransforms: function (style) {
          var match, transform = style.transform || style.webkitTransform || style.mozTransform,
            regex = /(\w+)\(([^)]*)\)/g,
            T = {};
          if ("string" != typeof transform) throw "Transform prop is not a string.";
          if (transform) {
            for (; match = regex.exec(transform);) T[match[1]] = parseFloat(match[2]);
            return T
          }
        },
        isNode: function (o) {
          return "object" == typeof Node ? o instanceof Node : o && "object" == typeof o && "number" == typeof o.nodeType && "string" == typeof o.nodeName
        },
        dragHandler: function () {
          var dragStart, dragMove, dragEnd, progress, self = this,
            $container = $(this.container),
            prevBuild = !1,
            nextBuild = !1,
            dragging = !1;
          progress = function (moveX) {
            return moveX / self.val.viewportW()
          }, dragStart = function (moveX, startX) {}, dragMove = function (moveX) {
            self.state.running || (moveX < -5 ? (nextBuild ? self.timeline.progress(-progress(moveX)) : (self.state.moveForward = !0, self.timeline.build(), nextBuild = !0, prevBuild = !1, self.unsetTimer()), dragging = !0) : moveX > 5 && (prevBuild ? self.timeline.progress(progress(moveX)) : (self.state.moveForward = !1, self.timeline.build(), prevBuild = !0, nextBuild = !1, self.unsetTimer()), dragging = !0))
          }, dragEnd = function (moveX) {
            if (dragging) {
              var prog = progress(moveX),
                absProg = prog < 0 ? -prog : prog;
              absProg > .1 ? (self.timeline.play(absProg), self.setActive(self.nextId(prog < 0 ? 1 : -1)), self.config.fluidHeight && self.setHeight(self.nextId(prog < 0 ? 1 : -1))) : (self.timeline.reverse(absProg), prog < 0 ? self.updateId(-1) : self.updateId(1)), prevBuild = !1, nextBuild = !1, dragging = !1, self.config.autoplay && self.setTimer(!1)
            }
          }, this.drag($container, dragStart, dragMove, dragEnd)
        },
        drag: function ($el, startFn, moveFn, stopFn) {
          var touchX, movX, evt, prevent, start, move, stop;
          prevent = function (e) {
            e.preventDefault()
          }, start = function (e) {
            $el.on("mousemove", prevent), $el.on("touchmove", move), $el.on("mousemove", move), evt = "touchstart" === e.type ? e.originalEvent.touches[0] : e, touchX = evt.pageX, "function" == typeof startFn && startFn(movX, touchX)
          }, move = function (e) {
            evt = "touchmove" === e.type ? e.originalEvent.touches[0] : e, movX = evt.pageX - touchX, "function" == typeof moveFn && moveFn(movX)
          }, stop = function (e) {
            $el.off("mousemove", prevent), $el.off("touchmove", move), $el.off("mousemove", move), "function" == typeof stopFn && stopFn(movX)
          }, $el.on("touchstart", start), $el.on("mousedown", start), $el.on("touchend", stop), $el.on("touchleave", stop), $el.on("touchcancel", stop), $el.on("mouseup", stop), $el.on("mouseleave", stop)
        },
        dynamicVal: function () {
          var update, getViewportW, viewportW, $window = $(window);
          return update = function () {
            viewportW = $window.width()
          }, getViewportW = function () {
            return viewportW
          }, update(), $window.on("load", update), $window.on("resize", update), {
            viewportW: getViewportW
          }
        }
      }, MK.ui.Slider.prototype.animation = {
        slide: {
          axis: "X",
          next: {
            transform: {}
          },
          active: {
            transform: {}
          },
          prev: {
            transform: {}
          }
        },
        vertical_slide: {
          axis: "Y",
          next: {
            transform: {}
          },
          active: {
            transform: {}
          },
          prev: {
            transform: {}
          }
        },
        perspective_flip: {
          axis: "Y",
          next: {
            transform: {
              rotateX: 80
            }
          },
          active: {
            transform: {
              rotateX: 0
            }
          },
          prev: {
            transform: {
              rotateX: 0
            }
          }
        },
        zoom: {
          axis: "Z",
          next: {
            opacity: 0,
            transform: {
              scale: .9
            }
          },
          active: {
            opacity: 1,
            transform: {
              scale: 1
            }
          },
          prev: {
            opacity: 0,
            transform: {
              scale: 1.1
            }
          }
        },
        fade: {
          axis: "Z",
          next: {
            opacity: 0,
            transform: {}
          },
          active: {
            opacity: 1,
            transform: {}
          },
          prev: {
            opacity: 0,
            transform: {}
          }
        },
        kenburned: {
          axis: "Z",
          next: {
            opacity: 0,
            transform: {}
          },
          active: {
            opacity: 1,
            transform: {}
          },
          prev: {
            opacity: 0,
            transform: {}
          }
        },
        zoom_out: {
          axis: "Z",
          next: {
            zIndex: "+",
            opacity: 1,
            transform: {
              translateY: 100,
              scale: 1
            }
          },
          active: {
            opacity: 1,
            transform: {
              translateY: 0,
              scale: 1
            }
          },
          prev: {
            zIndex: "+",
            opacity: 0,
            transform: {
              translateY: 0,
              scale: .5
            }
          }
        },
        horizontal_curtain: {
          axis: "Z",
          next: {
            zIndex: "+",
            transform: {
              translateX: 100
            }
          },
          active: {
            transform: {
              translateX: 0
            }
          },
          prev: {
            zIndex: "+",
            transform: {
              translateX: -70
            }
          }
        },
        roulete: {
          axis: "X",
          next: {
            opacity: .5,
            transform: {
              scale: .5,
              rotate: 10,
              translateY: 20
            }
          },
          active: {
            opacity: 1,
            transform: {
              scale: 1,
              rotate: 0,
              translateY: 0
            }
          },
          prev: {
            opacity: .3,
            transform: {
              scale: .5,
              rotate: -10,
              translateY: 20
            }
          }
        }
      }, MK.ui.Slider.prototype.ease = {
        linearEase: function (currentIteration, startValue, changeInValue, totalIterations) {
          return changeInValue * currentIteration / totalIterations + startValue
        },
        easeInQuad: function (currentIteration, startValue, changeInValue, totalIterations) {
          return changeInValue * (currentIteration /= totalIterations) * currentIteration + startValue
        },
        easeOutQuad: function (currentIteration, startValue, changeInValue, totalIterations) {
          return -changeInValue * (currentIteration /= totalIterations) * (currentIteration - 2) + startValue
        },
        easeInOutQuad: function (currentIteration, startValue, changeInValue, totalIterations) {
          return (currentIteration /= totalIterations / 2) < 1 ? changeInValue / 2 * currentIteration * currentIteration + startValue : -changeInValue / 2 * (--currentIteration * (currentIteration - 2) - 1) + startValue
        },
        easeInCubic: function (currentIteration, startValue, changeInValue, totalIterations) {
          return changeInValue * Math.pow(currentIteration / totalIterations, 3) + startValue
        },
        easeOutCubic: function (currentIteration, startValue, changeInValue, totalIterations) {
          return changeInValue * (Math.pow(currentIteration / totalIterations - 1, 3) + 1) + startValue
        },
        easeInOutCubic: function (currentIteration, startValue, changeInValue, totalIterations) {
          return (currentIteration /= totalIterations / 2) < 1 ? changeInValue / 2 * Math.pow(currentIteration, 3) + startValue : changeInValue / 2 * (Math.pow(currentIteration - 2, 3) + 2) + startValue
        },
        easeInQuart: function (currentIteration, startValue, changeInValue, totalIterations) {
          return changeInValue * Math.pow(currentIteration / totalIterations, 4) + startValue
        },
        easeOutQuart: function (currentIteration, startValue, changeInValue, totalIterations) {
          return -changeInValue * (Math.pow(currentIteration / totalIterations - 1, 4) - 1) + startValue
        },
        easeInOutQuart: function (currentIteration, startValue, changeInValue, totalIterations) {
          return (currentIteration /= totalIterations / 2) < 1 ? changeInValue / 2 * Math.pow(currentIteration, 4) + startValue : -changeInValue / 2 * (Math.pow(currentIteration - 2, 4) - 2) + startValue
        },
        easeInQuint: function (currentIteration, startValue, changeInValue, totalIterations) {
          return changeInValue * Math.pow(currentIteration / totalIterations, 5) + startValue
        },
        easeOutQuint: function (currentIteration, startValue, changeInValue, totalIterations) {
          return changeInValue * (Math.pow(currentIteration / totalIterations - 1, 5) + 1) + startValue
        },
        easeInOutQuint: function (currentIteration, startValue, changeInValue, totalIterations) {
          return (currentIteration /= totalIterations / 2) < 1 ? changeInValue / 2 * Math.pow(currentIteration, 5) + startValue : changeInValue / 2 * (Math.pow(currentIteration - 2, 5) + 2) + startValue
        },
        easeInSine: function (currentIteration, startValue, changeInValue, totalIterations) {
          return changeInValue * (1 - Math.cos(currentIteration / totalIterations * (Math.PI / 2))) + startValue
        },
        easeOutSine: function (currentIteration, startValue, changeInValue, totalIterations) {
          return changeInValue * Math.sin(currentIteration / totalIterations * (Math.PI / 2)) + startValue
        },
        easeInOutSine: function (currentIteration, startValue, changeInValue, totalIterations) {
          return changeInValue / 2 * (1 - Math.cos(Math.PI * currentIteration / totalIterations)) + startValue
        },
        easeInExpo: function (currentIteration, startValue, changeInValue, totalIterations) {
          return changeInValue * Math.pow(2, 10 * (currentIteration / totalIterations - 1)) + startValue
        },
        easeOutExpo: function (currentIteration, startValue, changeInValue, totalIterations) {
          return changeInValue * (1 - Math.pow(2, -10 * currentIteration / totalIterations)) + startValue
        },
        easeInOutExpo: function (currentIteration, startValue, changeInValue, totalIterations) {
          return (currentIteration /= totalIterations / 2) < 1 ? changeInValue / 2 * Math.pow(2, 10 * (currentIteration - 1)) + startValue : changeInValue / 2 * (2 - Math.pow(2, -10 * --currentIteration)) + startValue
        },
        easeInCirc: function (currentIteration, startValue, changeInValue, totalIterations) {
          return changeInValue * (1 - Math.sqrt(1 - (currentIteration /= totalIterations) * currentIteration)) + startValue
        },
        easeOutCirc: function (currentIteration, startValue, changeInValue, totalIterations) {
          return changeInValue * Math.sqrt(1 - (currentIteration = currentIteration / totalIterations - 1) * currentIteration) + startValue
        },
        easeInOutCirc: function (currentIteration, startValue, changeInValue, totalIterations) {
          return (currentIteration /= totalIterations / 2) < 1 ? changeInValue / 2 * (1 - Math.sqrt(1 - currentIteration * currentIteration)) + startValue : changeInValue / 2 * (Math.sqrt(1 - (currentIteration -= 2) * currentIteration) + 1) + startValue
        }
      }
    }(jQuery),
    function ($) {
      "use strict";
      MK.component.SocialShare = function (el) {
        var networks = {
          twitter: "http://twitter.com/intent/tweet?text={title} {url}",
          pinterest: "http://pinterest.com/pin/create/button/?url={url}&media={image}&description={title}",
          facebook: "https://www.facebook.com/sharer/sharer.php?u={url}",
          googleplus: "https://plus.google.com/share?url={url}",
          linkedin: "http://www.linkedin.com/shareArticle?mini=true&url={url}&title={title}&summary={desc}",
          digg: "http://digg.com/submit?url={url}&title={title}",
          reddit: "http://reddit.com/submit?url={url}&title={title}"
        };
        this.networks = networks, this.el = el
      }, MK.component.SocialShare.prototype = {
        init: function () {
          this.cacheElements(), this.bindEvents()
        },
        cacheElements: function () {
          this.$this = $(this.el)
        },
        bindEvents: function () {
          var thisObject = this;
          $.each(this.networks, function (key, value) {
            thisObject.$tempClass = $("." + key + "-share"), thisObject.$tempClass.click(thisObject.openSharingDialog.bind(self, this, key))
          })
        },
        openSharingDialog: function (url, site, args) {
          for (var urlWrapper = url, rx = new RegExp("{[a-z]*}", "g"), match = rx.exec(url); null != match;) {
            var pureAttr = match[0].replace("{", "").replace("}", ""),
              attValue = $(args.currentTarget).attr("data-" + pureAttr);
            void 0 !== attValue && null !== attValue || (attValue = ""), attValue = attValue.replace("#", "%23"), urlWrapper = urlWrapper.replace(match, attValue), match = rx.exec(url)
          }
          window.open(urlWrapper, site + "Window", "height=320,width=660,resizable=0,toolbar=0,menubar=0,status=0,location=0,scrollbars=0")
        }
      };
      var $body = $("body");
      $body.length && $body.each(function () {
        new MK.component.SocialShare(this).init()
      })
    }(jQuery),
    function ($) {
      "use strict";
      MK.component.Sortable = function (el) {
        this.el = el
      }, MK.component.Sortable.prototype = {
        init: function () {
          this.cacheElements(), this.bindEvents()
        },
        cacheElements: function () {
          this.unique = Date.now(), this.$filter = $(this.el), this.config = this.$filter.data("sortable-config"), this.ajaxLoader = new MK.utils.ajaxLoader(this.config.container), this.ajaxLoader.init(), this.$container = $(this.config.container), this.$navItems = this.$filter.find("a"), this.$filterItems = this.$container.find(this.config.item)
        },
        bindEvents: function () {
          this.$navItems.on("click", this.handleClick.bind(this)), MK.utils.eventManager.subscribe("ajaxLoaded", this.onLoad.bind(this))
        },
        handleClick: function (e) {
          e.preventDefault();
          var $item = $(e.currentTarget),
            term = $item.data("filter");
          this.$navItems.removeClass("current"), $item.addClass("current"), "ajax" === this.config.mode ? this.inDB(term, $item) : this.inPage(term)
        },
        inDB: function (term, $item) {
          MK.ui.loader.remove(this.$filter), MK.ui.loader.add($item), this.$container.siblings(".mk-ajax-loaded-posts").length && this.$container.siblings(".mk-ajax-loaded-posts").attr("data-loop-loaded-posts", ""), this.ajaxLoader.setData({
            paged: 1,
            term: term
          }), this.ajaxLoader.load(this.unique)
        },
        inPage: function (term) {
          var $filterItems = this.$container.find(this.config.item);
          $filterItems.removeClass("is-hidden");
          var className = term.replace(/, /g, ", .");
          "*" !== term && $filterItems.not("." + className).addClass("is-hidden"), MK.utils.eventManager.publish("staticFilter")
        },
        onLoad: function (e, response) {
          "static" === this.config.mode && this.$navItems.removeClass("current").first().addClass("current"), void 0 !== response && response.id === this.config.container && (MK.ui.loader.remove(this.$filter), response.unique === this.unique && (this.$container.html(response.content), this.ajaxLoader.setData({
            paged: 1
          })))
        }
      }
    }(jQuery),
    function ($) {
      "use strict";
      MK.component.Tabs = function (el) {
        var defaults = {
          activeClass: "is-active"
        };
        this.config = defaults, this.el = el
      }, MK.component.Tabs.prototype = {
        init: function () {
          this.cacheElements(), this.bindEvents()
        },
        cacheElements: function () {
          this.$this = $(this.el), this.$tabs = this.$this.find(".mk-tabs-tab"), this.$panes = this.$this.find(".mk-tabs-pane"), this.currentId = 0
        },
        bindEvents: function () {
          this.$tabs.on("click", this.switchPane.bind(this))
        },
        switchPane: function (evt) {
          evt.preventDefault();
          var clickedId = $(evt.currentTarget).index();
          this.hide(this.currentId), this.show(clickedId), this.currentId = clickedId, MK.utils.eventManager.publish("item-expanded")
        },
        show: function (id) {
          this.$tabs.eq(id).addClass(this.config.activeClass), this.$panes.eq(id).addClass(this.config.activeClass)
        },
        hide: function (id) {
          this.$tabs.eq(id).removeClass(this.config.activeClass), this.$panes.eq(id).removeClass(this.config.activeClass)
        }
      }
    }(jQuery),
    function ($) {
      "use strict";

      function toggle(e) {
        e.preventDefault(), e.stopPropagation();
        var $this = $(e.currentTarget);
        $this.hasClass("mk-toggle-active") ? ($(".mk-box-to-trigger").fadeOut(200), $this.removeClass("mk-toggle-active")) : ($(".mk-box-to-trigger").fadeOut(200), $this.parent().find(".mk-box-to-trigger").fadeIn(250), $(".mk-toggle-trigger").removeClass("mk-toggle-active"), $this.addClass("mk-toggle-active"))
      }

      function assignToggle() {
        setTimeout(function () {
          $(".mk-toggle-trigger").off("click", toggle), $(".mk-toggle-trigger").on("click", toggle)
        }, 100)
      }
      $(document).on("click", function (e) {
        $(".mk-toggle-trigger").removeClass("mk-toggle-active")
      }), assignToggle(), MK.utils.eventManager.subscribe("ajaxLoaded", assignToggle), MK.utils.eventManager.subscribe("ajax-preview", assignToggle), $(window).on("vc_reload", function () {
        assignToggle(), MK.utils.eventManager.subscribe("ajaxLoaded", assignToggle), MK.utils.eventManager.subscribe("ajax-preview", assignToggle)
      })
    }(jQuery),
    function ($) {
      "use strict";
      $("iframe").each(function () {
        var $iframe = $(this);
        "P" === $iframe.parent().get(0).tagName && $iframe.wrap('<div class="mk-video-container"></div>')
      })
    }(jQuery),
    function ($) {
      "use strict";
      if (MK.utils.isMobile()) return void $(".mk-animate-element").removeClass("mk-animate-element");
      var init = function () {
          var $rootLevelEls = $(".js-master-row, .widget");
          $rootLevelEls.each(spyViewport), $rootLevelEls.each(function () {
            ($(this).find(".mk-animate-element").each(spyViewport), "Firefox" === MK.utils.browser.name) && ($(this).find(".right-to-left").length > 0 && $("#theme-page").css("overflow-x", "hidden"))
          })
        },
        spyViewport = function (i) {
          var self = this;
          MK.utils.scrollSpy(this, {
            position: "bottom",
            threshold: 200,
            after: function () {
              animate.call(self, i)
            }
          })
        },
        animate = function (i) {
          var $this = $(this);
          setTimeout(function () {
            $this.addClass("mk-in-viewport")
          }, 100 * i)
        };
      $(window).on("load vc_reload", init)
    }(jQuery),
    function ($) {
      "use strict";

      function smoothScrollToAnchor(evt) {
        var anchor = MK.utils.detectAnchor(this),
          $this = $(evt.currentTarget),
          loc = window.location,
          currentPage = loc.origin + loc.pathname,
          href = $this.attr("href"),
          linkSplit = href ? href.split("#") : "",
          hrefPage = linkSplit[0] ? linkSplit[0] : "";
        linkSplit[1] && linkSplit[1];
        anchor.length ? (hrefPage !== currentPage && "" !== hrefPage || evt.preventDefault(), MK.utils.scrollToAnchor(anchor)) : "#" === $this.attr("href") && evt.preventDefault()
      }
      $(window).on("load", function () {
        MK.core.initAll(document), MK.utils.scrollToURLHash(), setTimeout(function () {
          MK.ui.preloader.hide(), $(".mk-preloader").hide(), $("body").removeClass("loading")
        }, 150)
      }), $(window).on("vc_reload", function () {
        setTimeout(function () {
          MK.core.initAll(document)
        }, 100)
      }), $(document).on("click", ".js-smooth-scroll, .js-main-nav a", smoothScrollToAnchor), $(".side_dashboard_menu a").on("click", smoothScrollToAnchor)
    }(jQuery)
}(jQuery),
function ($) {
  "use strict";

  function mk_animated_cols() {
    function equalheight(container) {
      var $el, currentTallest = 0,
        currentRowStart = 0,
        rowDivs = new Array,
        topPosition = 0;
      return $(container).each(function () {
        if ($el = $(this), $($el).height("auto"), topPosition = $el.position().top, currentRowStart != topPosition) {
          for (var currentDiv = 0; currentDiv < rowDivs.length; currentDiv++) rowDivs[currentDiv].height(currentTallest);
          rowDivs.length = 0, currentRowStart = topPosition, currentTallest = $el.height(), rowDivs.push($el)
        } else rowDivs.push($el), currentTallest = currentTallest < $el.height() ? $el.height() : currentTallest;
        for (currentDiv = 0; currentDiv < rowDivs.length; currentDiv++) rowDivs[currentDiv].height(currentTallest)
      }), currentTallest
    }

    function prepareCols(el) {
      var $this = el.parent().parent().find(".mk-animated-columns"),
        iconHeight = equalheight(".vc_row .animated-column-icon, .animated-column-holder .mk-svg-icon"),
        titleHeight = equalheight(".vc_row .animated-column-title"),
        descHeight = equalheight(".vc_row .animated-column-desc");
      $this.find(".animated-column-btn").innerHeight();
      $this.hasClass("full-style") ? $this.find(".animated-column-item").each(function () {
        var $this = $(this),
          contentHeight = iconHeight + 30 + (titleHeight + 10) + (descHeight + 70) + 34,
          $columnHeight = 1.5 * contentHeight + 50,
          $minHeight = parseInt($this.css("min-height"), 10);
        isNaN($minHeight) || $minHeight < $columnHeight && ($columnHeight = $minHeight), $this.height($columnHeight);
        var $box_height = $this.outerHeight(!0),
          $icon_height = $this.find(".animated-column-icon, .animated-column-holder .mk-svg-icon").height();
        $this.find(".animated-column-holder").css({
          paddingTop: $box_height / 2 - $icon_height
        }), $this.animate({
          opacity: 1
        }, 300)
      }) : $this.find(".animated-column-item").each(function () {
        var $this = $(this),
          halfHeight = $this.height() / 2,
          halfIconHeight = $this.find(".animated-column-icon, .animated-column-holder .mk-svg-icon").height() / 2,
          halfTitleHeight = $this.find(".animated-column-simple-title").height() / 2;
        $this.find(".animated-column-holder").css({
          paddingTop: halfHeight - halfIconHeight
        }), $this.find(".animated-column-title").css({
          paddingTop: halfHeight - halfTitleHeight
        }), $this.animate({
          opacity: 1
        }, 300)
      })
    }
    $(".mk-animated-columns").each(function () {
      var that = this;
      MK.core.loadDependencies([MK.core.path.plugins + "tweenmax.js"], function () {
        var $this = $(that),
          $parent = $this.parent().parent(),
          $columns = $parent.find(".column_container"),
          index = $columns.index($this.parent());
        $this.hasClass("full-style") && $this.find(".animated-column-item").hover(function () {
          TweenLite.to($(this).find(".animated-column-holder"), .5, {
            top: "-15%",
            ease: Back.easeOut
          }), TweenLite.to($(this).find(".animated-column-desc"), .5, {
            top: "50%",
            ease: Expo.easeOut
          }, .4), TweenLite.to($(this).find(".animated-column-btn"), .3, {
            top: "50%",
            ease: Expo.easeOut
          }, .6)
        }, function () {
          TweenLite.to($(this).find(".animated-column-holder"), .5, {
            top: "0%",
            ease: Back.easeOut,
            easeParams: [3]
          }), TweenLite.to($(this).find(".animated-column-desc"), .5, {
            top: "100%",
            ease: Back.easeOut
          }, .4), TweenLite.to($(this).find(".animated-column-btn"), .5, {
            top: "100%",
            ease: Back.easeOut
          }, .2)
        }), $this.hasClass("simple-style") && $this.find(".animated-column-item").hover(function () {
          TweenLite.to($(this).find(".animated-column-holder"), .7, {
            top: "100%",
            ease: Expo.easeOut
          }), TweenLite.to($(this).find(".animated-column-title"), .7, {
            top: "0%",
            ease: Back.easeOut
          }, .2)
        }, function () {
          TweenLite.to($(this).find(".animated-column-holder"), .7, {
            top: "0%",
            ease: Expo.easeOut
          }), TweenLite.to($(this).find(".animated-column-title"), .7, {
            top: "-100%",
            ease: Back.easeOut
          }, .2)
        }), $columns.length === index + 1 && (prepareCols($this), $(window).on("resize", function () {
          setTimeout(prepareCols($this), 1e3)
        })), MK.utils.eventManager.subscribe("iconsInsert", function () {
          prepareCols($this)
        })
      })
    })
  }
  $(window).on("load vc_reload", mk_animated_cols)
}(jQuery),
function ($) {
  "use strict";
  var _toBuild = [];
  MK.component.AdvancedGMaps = function (el) {
    var $this = $(el),
      container = document.getElementById("mk-theme-container"),
      data = $this.data("advancedgmaps-config"),
      apikey = !!data.options.apikey && "key=" + data.options.apikey + "&",
      map = null,
      bounds = null,
      infoWindow = null,
      position = null,
      build = function () {
        data.options.scrollwheel = !1, data.options.mapTypeId = google.maps.MapTypeId[data.options.mapTypeId], data.options.styles = data.style, bounds = new google.maps.LatLngBounds, map = new google.maps.Map(el, data.options), infoWindow = new google.maps.InfoWindow, map.setOptions({
          panControl: data.options.panControl,
          draggable: data.options.draggable,
          zoomControl: data.options.zoomControl,
          mapTypeControl: data.options.scaleControl,
          scaleControl: data.options.mapTypeControl
        });
        var marker, i;
        for (map.setTilt(45), i = 0; i < data.places.length; i++)
          if (data.places[i].latitude && data.places[i].longitude)
            if (position = new google.maps.LatLng(data.places[i].latitude, data.places[i].longitude), bounds.extend(position), marker = new google.maps.Marker({
                position: position,
                map: map,
                title: data.places[i].address,
                icon: data.places[i].marker ? data.places[i].marker : data.icon
              }), google.maps.event.addListener(marker, "click", function (marker, i) {
                return function () {
                  data.places[i].address && data.places[i].address.length > 1 ? (infoWindow.setContent('<div class="info_content"><p>' + data.places[i].address + "</p></div>"), infoWindow.open(map, marker)) : (infoWindow.setContent(""), infoWindow.close())
                }
              }(marker, i)), i > 0) map.fitBounds(bounds);
            else {
              var latLang = {
                lat: parseFloat(data.places[i].latitude),
                lng: parseFloat(data.places[i].longitude)
              };
              map.setCenter(latLang), map.setZoom(data.options.zoom)
            }
        var boundsListener = google.maps.event.addListener(map, "bounds_changed", function (event) {
            this.setZoom(data.options.zoom), google.maps.event.removeListener(boundsListener)
          }),
          update = function () {
            google.maps.event.trigger(map, "resize"), map.setCenter(position)
          };
        update();
        ! function () {
          $(window).on("resize", update), window.addResizeListener(container, update)
        }()
      },
      initAll = function () {
        for (var i = 0, l = _toBuild.length; i < l; i++) _toBuild[i]()
      };
    return MK.api.advancedgmaps = MK.api.advancedgmaps || function () {
      initAll()
    }, {
      init: function () {
        _toBuild.push(build), MK.core.loadDependencies(["https://maps.googleapis.com/maps/api/js?" + apikey + "callback=MK.api.advancedgmaps"])
      }
    }
  }
}(jQuery),
function ($) {
  "use strict";
  MK.core, MK.core.path;
  MK.component.BannerBuilder = function (el) {
    return {
      init: function () {
        var $this = $(el),
          data = $this.data("bannerbuilder-config");
        MK.core.loadDependencies([MK.core.path.plugins + "jquery.flexslider.js"], function () {
          $this.flexslider({
            selector: ".mk-banner-slides > .mk-banner-slide",
            animation: data.animation,
            smoothHeight: !1,
            direction: "horizontal",
            slideshow: !0,
            slideshowSpeed: data.slideshowSpeed,
            animationSpeed: data.animationSpeed,
            pauseOnHover: !0,
            directionNav: data.directionNav,
            controlNav: !1,
            initDelay: 2e3,
            prevText: "",
            nextText: "",
            pauseText: "",
            playText: ""
          })
        })
      }
    }
  }
}(jQuery),
function ($) {
  "use strict";
  var zIndex = 0;
  $(".mk-newspaper-wrapper").on("click", ".blog-loop-comments", function (event) {
    event.preventDefault();
    var $this = $(event.currentTarget);
    $this.parents(".mk-blog-newspaper-item").css("z-index", ++zIndex), $this.parents(".newspaper-item-footer").find(".newspaper-social-share").slideUp(200).end().find(".newspaper-comments-list").slideDown(200), setTimeout(function () {
      MK.utils.eventManager.publish("item-expanded")
    }, 300)
  }), $(".mk-newspaper-wrapper").on("click", ".newspaper-item-share", function (event) {
    event.preventDefault();
    var $this = $(event.currentTarget);
    $this.parents(".mk-blog-newspaper-item").css("z-index", ++zIndex), $this.parents(".newspaper-item-footer").find(".newspaper-comments-list").slideUp(200).end().find(".newspaper-social-share").slideDown(200), setTimeout(function () {
      MK.utils.eventManager.publish("item-expanded")
    }, 300)
  });
  var init = function () {
    setTimeout(function () {
      var $blog = $(".mk-blog-container"),
        $imgs = $blog.find("img[data-mk-image-src-set]");
      $blog.hasClass("mk-blog-container-lazyload") && $imgs.length ? ($(window).on("scroll.mk_blog_lazyload", MK.utils.throttle(500, function () {
        $imgs.each(function (index, elem) {
          MK.utils.isElementInViewport(elem) && (MK.component.ResponsiveImageSetter.init($(elem)), $imgs = $imgs.not($(elem)))
        })
      })), $(window).trigger("scroll.mk_blog_lazyload"), MK.component.ResponsiveImageSetter.onResize($imgs)) : (MK.component.ResponsiveImageSetter.init($imgs), MK.component.ResponsiveImageSetter.onResize($imgs))
    }, 50), $("body").hasClass("vc_editor") && setTimeout(function () {
      $(window).trigger("resize")
    }, 2e3)
  };
  init(), $(window).on("vc_reload", init)
}(jQuery),
function ($) {
  "use strict";
  var core = MK.core,
    path = MK.core.path;
  MK.component.Category = function (el) {
    var blurImage = function ($item) {
        return $item.each(function () {
          var $_this = $(this),
            img = $_this.find(".item-thumbnail");
          img.clone().addClass("blur-effect item-blur-thumbnail").removeClass("item-thumbnail").prependTo(this);
          var blur_this = $(".blur-effect", this);
          blur_this.each(function (index, element) {
            !0 === img[index].complete ? Pixastic.process(blur_this[index], "blurfast", {
              amount: .5
            }) : blur_this.load(function () {
              Pixastic.process(blur_this[index], "blurfast", {
                amount: .5
              })
            })
          })
        })
      },
      masonry = function () {
        function grid() {
          minigrid({
            container: ".js-masonry",
            item: ".js-masonry-item",
            gutter: 0
          })
        }
        $(".js-masonry").length && (grid(), $(window).on("resize", grid))
      };
    return {
      init: function () {
        core.loadDependencies([path.plugins + "pixastic.js"], function () {
          blurImage($(".blur-image-effect .mk-loop-item .item-holder "))
        }), core.loadDependencies([path.plugins + "minigrid.js"], masonry)
      }
    }
  }
}(jQuery),
function ($) {
  "use strict";
  var core = MK.core;
  core.path;
  MK.component.Chart = function (el) {
    return {
      init: function () {
        MK.core.loadDependencies([MK.core.path.plugins + "jquery.easyPieChart.js"], function () {
          $(".mk-chart__chart").each(function () {
            var $this = $(this),
              $parent_width = $(this).parent().width(),
              $chart_size = parseInt($this.attr("data-barSize"));
            $parent_width < $chart_size && ($chart_size = $parent_width, $this.css("line-height", $chart_size), $this.find("i").css({
              "line-height": $chart_size + "px"
            }), $this.css({
              "line-height": $chart_size + "px"
            }));
            var build = function () {
              $this.easyPieChart({
                animate: 1300,
                lineCap: "butt",
                lineWidth: $this.attr("data-lineWidth"),
                size: $chart_size,
                barColor: $this.attr("data-barColor"),
                trackColor: $this.attr("data-trackColor"),
                scaleColor: "transparent",
                onStep: function (value) {
                  this.$el.find(".chart-percent span").text(Math.ceil(value))
                }
              })
            };
            MK.utils.scrollSpy(this, {
              position: "bottom",
              after: build
            })
          })
        })
      }
    }
  }
}(jQuery),
function ($) {
  "use strict";
  $(".mk-clients.column-style").each(function () {
    function recreateGrid() {
      var i;
      if ($listItems.unwrap(), window.matchMedia("(max-width: 550px)").matches && fullRowColumnsCount >= 1)
        for (i = 0; i < listItemsCount; i += 1) $listItems.slice(i, i + 1).wrapAll('<ul class="mk-clients-fixed-list" style="' + listStyle + '"></ul>');
      else if (window.matchMedia("(max-width: 767px)").matches && fullRowColumnsCount >= 2)
        for (i = 0; i < listItemsCount; i += 2) $listItems.slice(i, i + 2).wrapAll('<ul class="mk-clients-fixed-list" style="' + listStyle + '"></ul>');
      else if (window.matchMedia("(max-width: 960px)").matches && fullRowColumnsCount >= 3)
        for (i = 0; i < listItemsCount; i += 3) $listItems.slice(i, i + 3).wrapAll('<ul class="mk-clients-fixed-list" style="' + listStyle + '"></ul>');
      else
        for (i = 0; i < listItemsCount; i += fullRowColumnsCount) $listItems.slice(i, i + fullRowColumnsCount).wrapAll('<ul style="' + listStyle + '"></ul>')
    }
    var $group = $(this),
      $listItems = $group.find("li"),
      listItemsCount = $listItems.length,
      listStyle = $group.find("ul").attr("style") || "",
      fullRowColumnsCount = $group.find("ul:first-of-type li").length;
    recreateGrid(), $(window).on("resize", recreateGrid)
  })
}(jQuery),
function ($) {
  "use strict";
  $(window).on("vc_reload", function () {
    $(".mk-event-countdown-ul").each(function () {
      $(this).width() < 750 ? $(this).addClass("mk-event-countdown-ul-block") : $(this).removeClass("mk-event-countdown-ul-block")
    })
  })
}(jQuery),
function ($) {
  "use strict";
  $(".mk-edge-slider").find("video").each(function () {
    this.pause(), this.currentTime = 0
  }), MK.component.EdgeSlider = function (el) {
    var self = this,
      $this = $(el),
      $window = $(window),
      $wrapper = $this.parent(),
      config = $this.data("edgeslider-config"),
      $nav = $(config.nav),
      $prev = $nav.find(".mk-edge-prev"),
      $prevTitle = $prev.find(".nav-item-caption"),
      $prevBg = $prev.find(".edge-nav-bg"),
      $next = $nav.find(".mk-edge-next"),
      $nextTitle = $next.find(".nav-item-caption"),
      $nextBg = $next.find(".edge-nav-bg"),
      $navBtns = $nav.find("a"),
      $pagination = $(".swiper-pagination"),
      $skipBtn = $(".edge-skip-slider"),
      $opacityLayer = $this.find(".edge-slide-content"),
      $videos = $this.find("video"),
      currentSkin = null,
      currentPoint = null,
      winH = null,
      opacity = null,
      offset = null,
      callbacks = {
        onInitialize: function (slides) {
          self.$slides = $(slides), self.slideContents = $.map(self.$slides, function (slide) {
            var $slide = $(slide),
              title = $slide.find(".edge-slide-content .edge-title").first().text();
            return {
              skin: $slide.attr("data-header-skin"),
              title: title,
              image: $slide.find(".mk-section-image").attr("data-thumb") || $slide.find(".mk-video-section-touch").attr("data-thumb"),
              bgColor: $slide.find(".mk-section-image").css("background-color")
            }
          }), MK.utils.isSmoothScroll && $this.css("position", "fixed"), setNavigationContent(1, self.$slides.length - 1), setSkin(0), playVideo(0), setTimeout(function () {
            $(".edge-slider-loading").fadeOut("100")
          }, 1e3)
        },
        onBeforeSlide: function (id) {},
        onAfterSlide: function (id) {
          setNavigationContent(nextFrom(id), prevFrom(id)), setSkin(id), stopVideos(), playVideo(id)
        }
      },
      nextFrom = function (id) {
        return id + 1 === self.$slides.length ? 0 : id + 1
      },
      prevFrom = function (id) {
        return id - 1 == -1 ? self.$slides.length - 1 : id - 1
      },
      setNavigationContent = function (nextId, prevId) {
        self.slideContents[prevId] && ($prevTitle.text(self.slideContents[prevId].title), $prevBg.css("background", "none" !== self.slideContents[prevId].image ? "url(" + self.slideContents[prevId].image + ")" : self.slideContents[prevId].bgColor)), self.slideContents[nextId] && ($nextTitle.text(self.slideContents[nextId].title), $nextBg.css("background", "none" !== self.slideContents[nextId].image ? "url(" + self.slideContents[nextId].image + ")" : self.slideContents[nextId].bgColor))
      },
      setSkin = function (id) {
        currentSkin = self.slideContents[id].skin, $navBtns.attr("data-skin", currentSkin), $pagination.attr("data-skin", currentSkin), $skipBtn.attr("data-skin", currentSkin), self.config.firstEl && MK.utils.eventManager.publish("firstElSkinChange", currentSkin)
      },
      stopVideos = function () {
        $videos.each(function () {
          this.pause(), this.currentTime = 0
        })
      },
      playVideo = function (id) {
        var video = self.$slides.eq(id).find("video").get(0);
        video && (video.play(), console.log("play video in slide nr " + id))
      },
      onResize = function () {
        var height = $wrapper.height();
        $this.height(height);
        var width = $wrapper.width();
        $this.width(width), winH = $window.height(), offset = $this.offset().top, MK.utils.isSmoothScroll && (MK.utils.isResponsiveMenuState() ? ($this.css({
          "-webkit-transform": "translateZ(0)",
          "-moz-transform": "translateZ(0)",
          "-ms-transform": "translateZ(0)",
          "-o-transform": "translateZ(0)",
          transform: "translateZ(0)",
          position: "absolute"
        }), $opacityLayer.css({
          opacity: 1
        })) : onScroll())
      },
      onScroll = function () {
        currentPoint = -MK.val.scroll(), offset + currentPoint <= 0 && (opacity = 1 + (offset + currentPoint) / winH * 2, opacity = Math.min(opacity, 1), opacity = Math.max(opacity, 0), $opacityLayer.css({
          opacity: opacity
        })), $this.css({
          "-webkit-transform": "translateY(" + currentPoint + "px) translateZ(0)",
          "-moz-transform": "translateY(" + currentPoint + "px) translateZ(0)",
          "-ms-transform": "translateY(" + currentPoint + "px) translateZ(0)",
          "-o-transform": "translateY(" + currentPoint + "px) translateZ(0)",
          transform: "translateY(" + currentPoint + "px) translateZ(0)",
          position: "fixed"
        })
      };
    onResize(), $window.on("load", onResize), $window.on("resize", onResize), window.addResizeListener($wrapper.get(0), onResize), MK.utils.isSmoothScroll && (onScroll(), $window.on("scroll", function () {
      MK.utils.isResponsiveMenuState() || window.requestAnimationFrame(onScroll)
    })), this.el = el, this.config = $.extend(config, callbacks), this.slideContents = null, this.config.edgeSlider = !0
  }, MK.component.EdgeSlider.prototype = {
    init: function () {
      new MK.ui.Slider(this.el, this.config).init()
    }
  }
}(jQuery),
function ($) {
  "use strict";
  var init = function () {
    $(".mk-faq-wrapper").each(function () {
      function filterItems(cat) {
        if ("" === cat) return void $faq.slideDown(200).removeClass("hidden");
        $faq.not("." + cat).slideUp(200).addClass("hidden"), $faq.filter("." + cat).slideDown(200).removeClass("hidden")
      }
      var $this = $(this),
        $filter = $this.find(".filter-faq"),
        $filterItem = $filter.find("a"),
        $faq = $this.find(".mk-faq-container > div"),
        currentFilter = "";
      $filterItem.on("click", function (e) {
        var $this = $(this);
        currentFilter = $this.data("filter"), $filterItem.removeClass("current"), $this.addClass("current"), filterItems(currentFilter), e.preventDefault()
      })
    })
  };
  init(), $(window).on("vc_reload", init)
}(jQuery),
function ($) {
  "use strict";

  function mk_flickr_feeds() {
    $(".mk-flickr-feeds").each(function () {
      var $this = $(this),
        apiKey = $this.attr("data-key"),
        userId = $this.attr("data-userid"),
        perPage = $this.attr("data-count");
      $this.attr("data-column");
      $(".mk-flickr-feeds").is(":empty") && jQuery.getJSON("https://api.flickr.com/services/rest/?format=json&method=flickr.photos.search&api_key=" + apiKey + "&user_id=" + userId + "&&per_page=" + perPage + "&jsoncallback=?", function (data) {
        jQuery.each(data.photos.photo, function (i, rPhoto) {
          var basePhotoURL = "http://farm" + rPhoto.farm + ".static.flickr.com/" + rPhoto.server + "/" + rPhoto.id + "_" + rPhoto.secret,
            thumbPhotoURL = basePhotoURL + "_q.jpg",
            mediumPhotoURL = basePhotoURL + ".jpg",
            photoStringEnd = 'title="' + rPhoto.title + '" rel="flickr-feeds" class="mk-lightbox flickr-item a_colitem" href="' + mediumPhotoURL + '"><img src="' + thumbPhotoURL + '" alt="' + rPhoto.title + '"/></a>;',
            photoString = "<a " + photoStringEnd;
          jQuery(photoString).appendTo($this)
        })
      })
    })
  }
  mk_flickr_feeds(), $(window).on("vc_reload", mk_flickr_feeds)
}(jQuery), jQuery(function ($) {
    "use strict";
    var init = function () {
      var $gallery = $(".mk-gallery"),
        $imgs = $gallery.find("img[data-mk-image-src-set]");
      $gallery.hasClass("mk-gallery-lazyload") && $imgs.length ? ($(window).on("scroll.mk_gallery_lazyload", MK.utils.throttle(500, function () {
        $imgs.each(function (index, elem) {
          MK.utils.isElementInViewport(elem) && (MK.component.ResponsiveImageSetter.init($(elem)), $imgs = $imgs.not($(elem)))
        })
      })), $(window).trigger("scroll.mk_gallery_lazyload"), MK.component.ResponsiveImageSetter.onResize($imgs)) : (MK.component.ResponsiveImageSetter.init($imgs), MK.component.ResponsiveImageSetter.onResize($imgs))
    };
    init(), $(window).on("vc_reload", init)
  }),
  function ($) {
    "use strict";
    $(".js-header-shortcode").each(function () {
      var $this = $(this),
        $parent_page_section = $this.parents(".mk-page-section"),
        $parent_row = $this.parents(".js-master-row");
      $parent_page_section.attr("id") && $this.detach().appendTo($parent_page_section), $parent_page_section.css({
        overflow: "visible"
      }), $parent_row.css({
        overflow: "visible"
      }), $this.parent().css("z-index", 99999)
    })
  }(jQuery),
  function ($) {
    "use strict";

    function mk_section_intro_effects() {
      if (MK.utils.isMobile()) $(".mk-page-section.intro-true").each(function () {
        $(this).attr("data-intro-effect", "")
      });
      else {
        if (!$.exists(".mk-page-section.intro-true")) return;
        $(".mk-page-section.intro-true").each(function () {
          var that = this;
          MK.core.loadDependencies([MK.core.path.plugins + "jquery.sectiontrans.js", MK.core.path.plugins + "tweenmax.js"], function () {
            var $this = $(that),
              $pageCnt = $this.parent().nextAll("div"),
              windowHeight = $(window).height(),
              effectName = $this.attr("data-intro-effect"),
              $header = $(".mk-header"),
              effect = {
                fade: new TimelineLite({
                  paused: !0
                }).set($pageCnt, {
                  opacity: 0,
                  y: .3 * windowHeight
                }).to($this, 1, {
                  opacity: 0,
                  ease: Power2.easeInOut
                }).to($pageCnt, 1, {
                  opacity: 1,
                  y: 0,
                  ease: Power2.easeInOut
                }, "-=.7").set($this, {
                  zIndex: "-1"
                }),
                zoom_out: new TimelineLite({
                  paused: !0
                }).set($pageCnt, {
                  opacity: 0,
                  y: .3 * windowHeight
                }).to($this, 1.5, {
                  opacity: .8,
                  scale: .8,
                  y: -windowHeight - 100,
                  ease: Strong.easeInOut
                }).to($pageCnt, 1.5, {
                  opacity: 1,
                  y: 0,
                  ease: Strong.easeInOut
                }, "-=1.3"),
                shuffle: new TimelineLite({
                  paused: !0
                }).to($this, 1.5, {
                  y: -windowHeight / 2,
                  ease: Strong.easeInOut
                }).to($pageCnt.first(), 1.5, {
                  paddingTop: windowHeight / 2,
                  ease: Strong.easeInOut
                }, "-=1.3")
              };
            console.log($pageCnt), $this.sectiontrans({
              effect: effectName
            }), $this.hasClass("shuffled") && (TweenLite.set($this, {
              y: -windowHeight / 2
            }), TweenLite.set($this.nextAll("div").first(), {
              paddingTop: windowHeight / 2
            })), $("body").on("page_intro", function () {
              MK.utils.scroll.disable(), $(this).data("intro", !0), effect[effectName].play(), setTimeout(function () {
                $header.addClass("pre-sticky"), $header.addClass("a-sticky"), $(".mk-header-padding-wrapper").addClass("enable-padding"), $("body").data("intro", !1), "shuffle" === effectName && $this.addClass("shuffled")
              }, 1e3), setTimeout(MK.utils.scroll.enable, 1500)
            }), $("body").on("page_outro", function () {
              MK.utils.scroll.disable(), $(this).data("intro", !0), effect[effectName].reverse(), setTimeout(function () {
                $header.removeClass("pre-sticky"), $header.removeClass("a-sticky"), $(".mk-header-padding-wrapper").removeClass("enable-padding"), $("body").data("intro", !1), $this.hasClass("shuffled") && $this.removeClass("shuffled")
              }, 1e3), setTimeout(MK.utils.scroll.enable, 1500)
            })
          })
        })
      }
    }

    function mk_section_adaptive_height() {
      $(".mk-page-section.mk-adaptive-height").each(function () {
        var imageHeight = $(this).find(".mk-adaptive-image").height();
        $(this).css("height", imageHeight)
      })
    }

    function mk_section_half_layout() {
      $(".mk-page-section.half_boxed").each(function () {
        var $section = $(this);
        if ($(window).width() > mk_grid_width) {
          var margin = ($(window).width() - mk_grid_width) / 2,
            $section_inner = $section.find(".mk-half-layout-inner");
          $section.hasClass("half_left_layout") && $section_inner.css({
            marginRight: margin + "px"
          }), $section.hasClass("half_right_layout") && $section_inner.css({
            marginLeft: margin + "px"
          })
        }
      })
    }

    function mk_reset_section_fluid_width_equal_height_columns() {
      var $colWrappers = "";
      $colWrappers = $(".page-section-content.fluid-width-equal-height-columns"), $colWrappers.each(function () {
        var $colWrapper = "";
        $colWrapper = $(this), $colWrapper.find(".wpb_column.column_container").each(function () {
          var $col = $(this);
          $(this).children("div").length > 0 && ($col.removeAttr("style"), $col.children("div").each(function () {
            var $this = $(this);
            $this.hasClass("mk-advanced-gmaps") || $this.removeAttr("style")
          }))
        })
      })
    }

    function mk_section_fluid_width_equal_height_columns() {
      mk_reset_section_fluid_width_equal_height_columns();
      var $colWrappers = "",
        $pageSection = $(".page-section-content");
      $pageSection.hasClass(".fluid-width-equal-height-columns") || ($pageSection.find(".wpb_column.column_container").removeAttr("style"), $pageSection.find(".wpb_column.column_container .vc_element").removeAttr("style")), $colWrappers = $(".page-section-content.fluid-width-equal-height-columns"), $colWrappers.each(function () {
        var $colWrapper = "",
          colHeight = 0;
        $colWrapper = $(this), $colWrapper.length > 0 && (colHeight = $colWrappers.outerHeight(!0), $colWrapper.find(".wpb_column.column_container").each(function () {
          var $col = $(this);
          $col.length > 0 && (colHeight = $col.outerHeight(!0) > colHeight ? $col.outerHeight(!0) : colHeight)
        })), colHeight > 0 && $colWrapper.find(".wpb_column.column_container").each(function () {
          var $col = $(this),
            size = $(this).children("div").length;
          size > 0 && (colHeight = $(window).width() < 850 ? "initial" : colHeight, $col.css("height", colHeight), $colWrapper.hasClass("vertical-align-center") && $col.children("div").each(function () {
            var elHeight = $(window).width() < 850 ? "initial" : colHeight / size;
            $(this).hasClass("mk-advanced-gmaps") || $(this).css("height", elHeight)
          }))
        })
      })
    }
    mk_section_intro_effects();
    var debounceResize = null;
    $(window).on("resize", function () {
      null !== debounceResize && clearTimeout(debounceResize), debounceResize = setTimeout(mk_section_intro_effects, 300)
    }), $(window).on("load resize", mk_section_adaptive_height);
    var init = function () {
      var $allLayers = $(".mk-page-section .background-layer").filter(function (index) {
        var isLazyLoad = "true" === $(this).attr("data-mk-lazyload");
        return isLazyLoad || MK.component.BackgroundImageSetter.init($(this)), isLazyLoad
      });
      $allLayers.length && ($(window).on("scroll.mk_page_section_lazyload", MK.utils.throttle(500, function () {
        $allLayers.each(function (index, elem) {
          MK.utils.isElementInViewport(elem) && (MK.component.BackgroundImageSetter.init($(elem)), $allLayers = $allLayers.not($(elem)))
        })
      })), $(window).trigger("scroll.mk_page_section_lazyload"), MK.component.BackgroundImageSetter.onResize($allLayers))
    };
    init(), $(window).on("vc_reload", init), $(window).on("load resize", mk_section_half_layout), $(window).on("load vc_reload", function () {
      setTimeout(function () {
        mk_section_fluid_width_equal_height_columns()
      }, 500)
    });
    var debounceResize = null;
    $(window).on("resize", function () {
      null !== debounceResize && clearTimeout(debounceResize), debounceResize = setTimeout(mk_section_fluid_width_equal_height_columns(), 500)
    })
  }(jQuery),
  function ($) {
    "use strict";

    function mk_page_title_parallax() {
      MK.utils.isMobile() || "false" === mk_smooth_scroll || $(".mk-effect-wrapper").each(function () {
        var progressVal, currentPoint, $this = $(this),
          ticking = !1,
          scrollY = MK.val.scroll(),
          $window = $(window),
          parentHeight = ($(window).height(), $this.outerHeight()),
          endPoint = $this.offset().top + parentHeight,
          effectLayer = $this.find(".mk-effect-bg-layer"),
          gradientLayer = effectLayer.find(".mk-effect-gradient-layer"),
          cntLayer = $this.find(".mk-page-title-box-content"),
          animation = effectLayer.attr("data-effect"),
          top = $this.offset().top,
          height = $this.outerHeight();
        "parallax" == animation && function () {
          var gap = .7 * top;
          effectLayer.css({
            height: height + gap + "px",
            top: -gap + "px"
          })
        }();
        var animationSet = function () {
          if (scrollY = MK.val.scroll(), "parallax" == animation && (currentPoint = .7 * (0 + scrollY), effectLayer.get(0).style.transform = "translateY(" + currentPoint + "px)"), "parallaxZoomOut" == animation) {
            console.log(effectLayer), currentPoint = .7 * (0 + scrollY), progressVal = 1 / (endPoint - 0) * (scrollY - 0);
            var zoomCalc = 1.3 - (1.3 - 1) * progressVal;
            effectLayer.get(0).style.transform = "translateY(" + currentPoint + "px) scale(" + zoomCalc + ")"
          }
          "gradient" == animation && (progressVal = 1 / (endPoint - 0) * (scrollY - 0), gradientLayer.css({
            opacity: 2 * progressVal
          })), "gradient" != animation && (progressVal = 1 / (endPoint - 0) * (scrollY - 0), cntLayer.css({
            opacity: 1 - 4 * progressVal
          })), ticking = !1
        };
        animationSet();
        var requestTick = function () {
          ticking || (window.requestAnimationFrame(animationSet), ticking = !0)
        };
        $window.off("scroll", requestTick), $window.on("scroll", requestTick)
      })
    }
    var $window = $(window),
      debounceResize = null;
    $window.on("load", mk_page_title_parallax), $window.on("resize", function () {
      null !== debounceResize && clearTimeout(debounceResize), debounceResize = setTimeout(mk_page_title_parallax, 300)
    })
  }(jQuery),
  function ($) {
    "use strict";
    var utils = MK.utils,
      core = MK.core,
      path = MK.core.path;
    MK.component.PhotoAlbum = function (el) {
      this.album = el, this.initialOpen = !1
    }, MK.component.PhotoAlbum.prototype = {
      dom: {
        gallery: ".slick-slider-wrapper",
        title: ".slick-title",
        galleryContainer: ".slick-slides",
        closeBtn: ".slick-close-icon",
        thumbList: ".slick-dots",
        thumbs: ".slick-dots li",
        imagesData: "photoalbum-images",
        titleData: "photoalbum-title",
        idData: "photoalbum-id",
        urlData: "photoalbum-url",
        activeClass: "is-active"
      },
      tpl: {
        gallery: "#tpl-photo-album",
        slide: '<div class="slick-slide"></div>'
      },
      init: function () {
        this.cacheElements(), this.bindEvents(), this.openByLink()
      },
      cacheElements: function () {
        this.$album = $(this.album), this.imagesSrc = this.$album.data(this.dom.imagesData), this.albumLength = this.imagesSrc.length, this.title = this.$album.data(this.dom.titleData), this.id = this.$album.data(this.dom.idData), this.url = this.$album.data(this.dom.urlData), this.images = []
      },
      bindEvents: function () {
        this.$album.not('[data-photoalbum-images="[null]"]').on("click", this.albumClick.bind(this)), $(document).on("click", this.dom.closeBtn, this.closeClick.bind(this)), $(window).on("resize", this.thumbsVisibility.bind(this)), $(window).on("resize", this.makeArrows.bind(this))
      },
      albumClick: function (e) {
        e.preventDefault(), this.open(), MK.ui.loader.add(this.album)
      },
      closeClick: function (e) {
        e.preventDefault(), this.slider && (this.removeGallery(), this.slider.exitFullScreen())
      },
      thumbsVisibility: function () {
        this.thumbsWidth && (window.matchMedia("(max-width:" + (this.thumbsWidth + 260) + "px)").matches ? this.hideThumbs() : this.showThumbs())
      },
      hideThumbs: function () {
        this.$thumbList && this.$thumbList.hide()
      },
      showThumbs: function () {
        this.$thumbList && this.$thumbList.show()
      },
      open: function () {
        var self = this;
        core.loadDependencies([path.plugins + "slick.js"], function () {
          self.createGallery(), self.loadImages()
        })
      },
      createGallery: function () {
        if (!$(this.dom.gallery).length) {
          var tpl = $(this.tpl.gallery).eq(0).html();
          $("body").append(tpl)
        }
        this.$gallery = $(this.dom.gallery), this.$closeBtn = $(this.dom.closeBtn)
      },
      createSlideshow: function () {
        var self = this;
        this.slider = new MK.ui.FullScreenGallery(this.dom.galleryContainer, {
          id: this.id,
          url: this.url
        }), this.slider.init(), $(window).trigger("resize"), this.makeArrows(), this.$thumbList = $(this.dom.thumbList), this.$thumbs = $(this.dom.thumbs), this.thumbsWidth = 95 * this.$thumbs.length, this.thumbsVisibility(), setTimeout(function () {
          MK.ui.loader.remove(self.album)
        }, 100), MK.utils.eventManager.publish("photoAlbum-open")
      },
      makeArrows: function () {
        this.arrowsTimeout && clearTimeout(this.arrowsTimeout), this.arrowsTimeout = setTimeout(function () {
          var $prev = $(".slick-prev").find("svg"),
            $next = $(".slick-next").find("svg");
          $prev.wrap('<div class="slick-nav-holder"></div>'), $next.wrap('<div class="slick-nav-holder"></div>'), matchMedia("(max-width: 1024px)").matches ? ($prev.attr({
            width: 12,
            height: 22
          }).find("polyline").attr("points", "12,0 0,11 12,22"), $next.attr({
            width: 12,
            height: 22
          }).find("polyline").attr("points", "0,0 12,11 0,22")) : ($prev.attr({
            width: 33,
            height: 65
          }).find("polyline").attr("points", "0.5,0.5 32.5,32.5 0.5,64.5"), $next.attr({
            width: 33,
            height: 65
          }).find("polyline").attr("points", "0.5,0.5 32.5,32.5 0.5,64.5"))
        }, 0)
      },
      loadImages: function () {
        var self = this,
          n = 0;
        this.images.length ? this.onLoad(this.albumLength) : this.imagesSrc.forEach(function (src) {
          if (null !== src) {
            var img = new Image;
            img.onload = function () {
              self.onLoad(n += 1)
            }, img.src = src, self.images.push(img)
          }
        })
      },
      onLoad: function (n) {
        n === this.albumLength && (this.insertImages(), this.showGallery(), this.createSlideshow())
      },
      insertImages: function () {
        var $galleryContainer = this.$gallery.find(this.dom.galleryContainer),
          $title = $(this.dom.title),
          slide = this.tpl.slide;
        $galleryContainer.html(""), $title.html(this.title), this.images.forEach(function (img) {
          var $slide = $(slide);
          $slide.html(img), $galleryContainer.prepend($slide)
        })
      },
      showGallery: function () {
        this.$gallery.addClass(this.dom.activeClass), utils.scroll.disable()
      },
      removeGallery: function () {
        var self = this;
        this.$gallery.removeClass(this.dom.activeClass), setTimeout(function () {
          self.$gallery.remove()
        }, 300), utils.scroll.enable()
      },
      openByLink: function () {
        var id, loc = window.location,
          hash = loc.hash;
        hash.length && hash.substring(1).length && (id = hash.substring(1), (id = id.replace("!loading", "")) != this.id || this.initialOpen || (this.initialOpen = !0, this.open()))
      }
    }, MK.component.PhotoAlbumBlur = function (el) {
      var blurImage = function ($item) {
        return $item.each(function () {
          var $_this = $(this),
            img = $_this.find(".album-cover-image");
          img.clone().addClass("blur-effect item-blur-thumbnail").removeClass("album-cover-image").prependTo(this);
          var blur_this = $(".blur-effect", this);
          blur_this.each(function (index, element) {
            !0 === img[index].complete ? Pixastic.process(blur_this[index], "blurfast", {
              amount: .5
            }) : blur_this.load(function () {
              Pixastic.process(blur_this[index], "blurfast", {
                amount: .5
              })
            })
          })
        })
      };
      return {
        init: function () {
          core.loadDependencies([path.plugins + "pixastic.js"], function () {
            blurImage($(".mk-album-item figure"))
          })
        }
      }
    }
  }(jQuery), jQuery(document).ready(function ($) {
    function mkRedraw() {
      $(".mk-photo-roller").hide().show(0)
    }
    void 0 !== window.safari && (mkRedraw(), $(window).resize(function () {
      mkRedraw()
    }))
  }), jQuery(function ($) {
    "use strict";
    var init = function () {
      var $portfolio = $(".portfolio-grid"),
        $imgs = $portfolio.find("img[data-mk-image-src-set]");
      $portfolio.hasClass("portfolio-grid-lazyload") && $imgs.length ? ($(window).on("scroll.mk_portfolio_lazyload", MK.utils.throttle(500, function () {
        $imgs.each(function (index, elem) {
          MK.utils.isElementInViewport(elem) && (MK.component.ResponsiveImageSetter.init($(elem)), $imgs = $imgs.not($(elem)))
        })
      })), $(window).trigger("scroll.mk_portfolio_lazyload"), MK.component.ResponsiveImageSetter.onResize($imgs)) : (MK.component.ResponsiveImageSetter.init($imgs), MK.component.ResponsiveImageSetter.onResize($imgs))
    };
    init(), $(window).on("vc_reload", function () {
      init(), $(".mk-portfolio-container").each(function () {
        var id = $(this).attr("id"),
          el = "#" + id + ".mk-portfolio-container.js-el";
        if ("Grid" == $(this).data("mk-component")) {
          $(el).data("init-Grid", !0);
          new MK.component.Grid(el).init()
        }
      })
    })
  }), jQuery(document).ready(function ($) {
    "use strict";

    function get_item_width(style, showItems, id) {
      var item_width;
      if ("classic" == style) item_width = 275, items_to_show = 4;
      else {
        var screen_width = $("#portfolio-carousel-" + id).width(),
          items_to_show = showItems;
        item_width = screen_width >= 1100 ? screen_width / items_to_show : screen_width <= 1200 && screen_width >= 800 ? screen_width / 3 : screen_width <= 800 && screen_width >= 540 ? screen_width / 2 : screen_width
      }
      return item_width
    }
    jQuery(window).on("load vc_reload", function () {
      MK.core.loadDependencies([MK.core.path.plugins + "jquery.flexslider.js"], function () {
        $(".portfolio-carousel .mk-flexslider").each(function () {
          var $this = $(this),
            $pauseOnHover = "true" == $this.attr("data-pauseOnHover");
          $this.flexslider({
            selector: ".mk-flex-slides > li",
            slideshow: !isTest,
            animation: "slide",
            slideshowSpeed: parseInt($this.attr("data-slideshowSpeed")),
            animationSpeed: parseInt($this.attr("data-animationSpeed")),
            pauseOnHover: $pauseOnHover,
            controlNav: !1,
            smoothHeight: !1,
            useCSS: !1,
            directionNav: $this.data("directionNav"),
            prevText: "",
            nextText: "",
            itemWidth: get_item_width($this.data("style"), $this.data("showItems"), $this.data("id")),
            itemMargin: 0,
            maxItems: "modern" === $this.data("style") ? $this.data("showItems") : 4,
            minItems: 1,
            move: 1
          })
        })
      })
    })
  }),
  function ($) {
    "use strict";
    var AjaxModal = function (el) {
      this.el = el;
      var $this = $(el),
        action = $this.data("action"),
        id = $this.data("id");
      this.load(action, id)
    };
    AjaxModal.prototype = {
      init: function (html) {
        var self = this;
        $("body").append(html), this.cacheElements(), this.bindEvents(), this.$modal.addClass("is-active"), MK.core.initAll(self.$modal.get(0)), $(".variations_form").each(function () {
          $(this).wc_variation_form().find(".variations select:eq(0)").change()
        }), MK.utils.scroll.disable(), MK.ui.loader.remove(), MK.utils.eventManager.publish("quickViewOpen")
      },
      cacheElements: function () {
        this.$modal = $(".mk-modal"), this.$slider = this.$modal.find(".mk-slider-holder"), this.$container = this.$modal.find(".mk-modal-container"), this.$closeBtn = this.$modal.find(".js-modal-close")
      },
      bindEvents: function () {
        this.$container.on("click", function (e) {
          e.stopPropagation()
        }), this.$closeBtn.on("click", this.handleClose.bind(this)), this.$modal.on("click", this.handleClose.bind(this))
      },
      handleClose: function (e) {
        e.preventDefault(), MK.utils.scroll.enable(), this.close()
      },
      close: function () {
        this.$modal.remove()
      },
      load: function (action, id) {
        $.ajax({
          url: MK.core.path.ajaxUrl,
          data: {
            action: action,
            id: id
          },
          success: this.init.bind(this),
          error: this.error.bind(this)
        })
      },
      error: function (response) {
        console.log(response)
      }
    };
    var createModal = function (e) {
      e.preventDefault();
      var el = e.currentTarget;
      MK.ui.loader.add($(el).parents(".product-loop-thumb")), new AjaxModal(el)
    };
    $(document).on("click", ".js-ajax-modal", createModal), $(window).on("vc_reload", function () {
      $(".mk-product-loop").each(function () {
        var id = $(this).attr("id"),
          el = "#" + id + " > .products.js-el";
        $(el).data("init-Grid", !0), new MK.component.Grid(el).init()
      })
    })
  }(jQuery),
  function ($) {
    function handleLoad() {
      $(".mk-slideshow-box").each(run)
    }

    function run() {
      function autoScroll() {
        if (!isTest) {
          var $i = $slider.find(".active").index();
          $slides.eq($i).removeClass("active").fadeOut($transition_time), $slides.length == $i + 1 && ($i = -1), $slides.eq($i + 1).addClass("active").fadeIn($transition_time, function () {
            setTimeout(autoScroll, $time_between_slides)
          })
        }
      }
      var $slider = $(this),
        $slides = $slider.find(".mk-slideshow-box-item"),
        $transition_time = $slider.data("transitionspeed"),
        $time_between_slides = $slider.data("slideshowspeed");
      $slider.find(".mk-slideshow-box-content").children("p").filter(function () {
        if ("" == $.trim($(this).text())) return !0
      }).remove(), $slides.first().addClass("active").fadeIn($transition_time, function () {
        setTimeout(autoScroll, $time_between_slides)
      });
      var browserName = MK.utils.browser.name;
      if ("Firefox" === browserName || "Safari" === browserName) {
        if (parseInt($(window).width()) >= 850) {
          var height = $slider.css("min-height");
          void 0 !== height && $slider.find(".mk-slideshow-box-items").height(parseInt(height))
        } else $slider.find(".mk-slideshow-box-items").removeAttr("style")
      }
    }
    window.addEventListener ? window.addEventListener("load", handleLoad, !1) : window.attachEvent && window.attachEvent("onload", handleLoad), $(window).on("vc_reload", function () {
      handleLoad()
    }), window.addEventListener("resize", function () {
      var browserName = MK.utils.browser.name;
      "Firefox" !== browserName && "Safari" !== browserName || handleLoad()
    }, !0)
  }(jQuery),
  function ($) {
    "use strict";
    $(".mk-subscribe").each(function () {
      var $this = $(this);
      $this.find(".mk-subscribe--form").submit(function (e) {
        $this.addClass("form-in-progress"), e.preventDefault(), $.ajax({
          url: MK.core.path.ajaxUrl,
          type: "POST",
          data: {
            action: "mk_ajax_subscribe",
            email: $this.find(".mk-subscribe--email").val(),
            list_id: $this.find(".mk-subscribe--list-id").val(),
            optin: $this.find(".mk-subscribe--optin").val()
          },
          success: function (response) {
            $this.removeClass("form-in-progress");
            var data = $.parseJSON(response),
              $messaage_box = $this.find(".mk-subscribe--message");
            $messaage_box.html(data.message), 1 == data.action_status ? $messaage_box.addClass("success") : $messaage_box.addClass("error"), $this.find(".mk-subscribe--email").val("")
          }
        })
      })
    })
  }(jQuery),
  function ($) {
    "use strict";

    function init() {
      var $swiper = $(".mk-swipe-slideshow"),
        $imgs = $swiper.find("img[data-mk-image-src-set]");
      $swiper.hasClass("mk-swipe-slideshow-lazyload") && $imgs.length ? ($(window).on("scroll.mk_swipe_slideshow_lazyload", MK.utils.throttle(500, function () {
        $imgs.each(function (index, elem) {
          MK.utils.isElementInViewport(elem) && (MK.component.ResponsiveImageSetter.init($(elem)), $imgs = $imgs.not($(elem)))
        })
      })), $(window).trigger("scroll.mk_swipe_slideshow_lazyload"), MK.component.ResponsiveImageSetter.onResize($imgs)) : (MK.component.ResponsiveImageSetter.init($imgs), MK.component.ResponsiveImageSetter.onResize($imgs))
    }
    var _instancesCollection = {};
    MK.component.SwipeSlideshow = function (el) {
      var $this = $(el),
        id = $this.parent().attr("id");
      this.el = el, this.id = id, this.config = $this.data("swipeslideshow-config"), this.config && (this.config.hasPagination = !1)
    }, MK.component.SwipeSlideshow.prototype = {
      init: function () {
        var slider = new MK.ui.Slider(this.el, this.config);
        slider.init(), _instancesCollection[this.id] = slider
      }
    }, MK.component.SwipeSlideshowExtraNav = function (el) {
      this.el = el
    }, MK.component.SwipeSlideshowExtraNav.prototype = {
      init: function () {
        this.cacheElements(), this.bindEvents()
      },
      cacheElements: function () {
        var $this = $(this.el);
        this.sliderId = $this.data("gallery"), this.slider = _instancesCollection[this.sliderId], this.$thumbs = $("#" + this.sliderId).find(".thumbnails a")
      },
      bindEvents: function () {
        this.$thumbs.on("click", this.clickThumb.bind(this))
      },
      clickThumb: function (e) {
        e.preventDefault();
        var $this = $(e.currentTarget),
          id = $this.index();
        this.slider.goTo(id)
      }
    }, MK.utils.eventManager.subscribe("gallery-update", function (e, config) {
      void 0 !== _instancesCollection[config.id] && _instancesCollection[config.id].reset()
    }), init(), $(window).on("vc_reload", init)
  }(jQuery),
  function ($) {
    "use strict";
    var core = MK.core;
    core.path;
    MK.component.Tooltip = function (el) {
      return {
        init: function () {
          $(".mk-tooltip").each(function () {
            $(this).find(".mk-tooltip--link").hover(function () {
              $(this).siblings(".mk-tooltip--text").stop(!0).animate({
                opacity: 1
              }, 400)
            }, function () {
              $(this).siblings(".mk-tooltip--text").stop(!0).animate({
                opacity: 0
              }, 400)
            })
          })
        }
      }
    }
  }(jQuery),
  function ($) {
    "use strict";
    ! function () {
      $(".mk-woocommerce-carousel.classic-style").each(function () {
        var maxHeight = 0;
        $(this).height(), $(this).find(".item").each(function () {
          $(this).height() > maxHeight && (maxHeight = $(this).height())
        }), $(this).find(".mk-swiper-container")[0].style.setProperty("min-height", maxHeight + "px", "important")
      })
    }()
  }(jQuery),
  function ($) {
    "use strict";

    function dynamicHeight() {
      var $this = $(this);
      $this.height("auto"), window.matchMedia("(max-width: 768px)").matches || $this.height($this.height())
    }

    function equalColumns() {
      $(".equal-columns").each(function () {
        dynamicHeight.bind(this), $window.on("load", dynamicHeight.bind(this)), $window.on("resize", dynamicHeight.bind(this)), window.addResizeListener(container, dynamicHeight.bind(this))
      })
    }
    var $window = $(window),
      container = document.getElementById("mk-theme-container");
    equalColumns(), $window.on("vc_reload", function () {
      equalColumns()
    })
  }(jQuery),
  function ($) {
    "use strict";

    function mk_video_play() {
      function playSelfHosted($video, isLightbox) {
        if (void 0 !== isLightbox && void 0 !== isLightbox || (isLightbox = !1), isLightbox) {
          var content = $video.parent().html();
          playLightbox({
            content: '<div class="fancybox-video">' + $(content).attr("autoplay", "autoplay").wrap("<div></div>").parent().html() + "</div>"
          })
        } else playTagVideo($video)
      }

      function playSocialHosted($iframe, isLightbox) {
        if (void 0 !== isLightbox && void 0 !== isLightbox || (isLightbox = !1), isLightbox) playLightbox({
          type: "iframe",
          href: $iframe.attr("src"),
          helpers: {
            media: !0
          }
        });
        else {
          var videoData = getSocialVideoData($iframe.attr("src"));
          switch (videoData.source) {
            case "youtube":
              playTagIframeYoutube(videoData.videoId, $iframe);
              break;
            case "vimeo":
              playTagIframeVimeo(videoData.videoId, $iframe);
              break;
            default:
              playTagIframe($iframe)
          }
        }
      }

      function playLightbox(args) {
        var options = {
          padding: 0,
          margin: lightboxMargin,
          showCloseButton: 1,
          autoSize: 0,
          width: getVideoboxWidth(),
          height: getVideoHeight(),
          tpl: {
            closeBtn: '<a title="Close" class="fancybox-item fancybox-close fancybox-video-close" href="javascript:;"></a>'
          }
        };
        $.extend(options, args), $.fancybox.open(options)
      }

      function playTagVideo($video) {
        $video.get(0).play(), $video.closest(".video-container").find(".video-thumbnail").fadeOut("slow")
      }

      function playTagIframe($iframe, videoId) {
        var video_loop = "";
        void 0 !== videoId && void 0 !== videoId && (video_loop = "&playlist=" + videoId);
        var src = $iframe.attr("src"),
          separator = -1 === src.indexOf("?") ? "?" : "&";
        src += separator + "autoplay=1", separator = -1 === src.indexOf("?") ? "?" : "&", video_loop = separator + "loop=1" + video_loop, video_loop = "1" == $iframe.closest(".video-container").data("loop") ? video_loop : "", src += video_loop, $iframe.attr("src", src).closest(".video-container").find(".video-thumbnail").fadeOut(3e3)
      }

      function playTagIframeYoutube(videoId, $iframe) {
        function runPlayer() {
          var isPlayed = !1;
          new YT.Player("video-player-" + $iframe.data("id"), {
            videoId: videoId,
            rel: !1,
            events: {
              onReady: function (e) {
                e.target.playVideo()
              },
              onStateChange: function (e) {
                1 !== e.data || isPlayed || ($(e.target.a).closest(".video-container").find(".video-thumbnail").fadeOut("slow"), isPlayed = !0), $(e.target.a).closest(".video-container").data("loop") && e.data === YT.PlayerState.ENDED && e.target.playVideo()
              },
              onError: function (e) {
                playTagIframe($iframe, videoId)
              }
            }
          })
        }
        if (null === document.getElementById("mk_iframe_api")) {
          var tag = document.createElement("script");
          tag.src = "https://www.youtube.com/iframe_api", tag.id = "mk_iframe_api";
          var firstScriptTag = document.getElementsByTagName("script")[0];
          firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
        } else runPlayer();
        window.onYouTubeIframeAPIReady = function () {
          runPlayer()
        }
      }

      function playTagIframeVimeo(videoId, $iframe) {
        $.getScript("//player.vimeo.com/api/player.js", function (data, textStatus, jqxhr) {
          if (200 === jqxhr.status) {
            var player, isPlayed = !1;
            player = new Vimeo.Player("video-player-" + $iframe.data("id"), {
              id: videoId
            }), player.play().then(function () {
              isPlayed || ($iframe.closest(".video-container").find(".video-thumbnail").fadeOut("slow"), isPlayed = !0)
            }).catch(function (error) {
              playTagIframe($iframe)
            }), $iframe.closest(".video-container").data("loop") && player.setLoop(!0).then(function (loop) {}).catch(function (error) {
              playTagIframe($iframe)
            })
          } else playTagIframe($iframe)
        })
      }

      function getSocialVideoData(url) {
        var youtubeRegex = /(youtube\.com|youtu\.be|youtube-nocookie\.com)\/(watch\?v=|v\/|u\/|embed\/?)?(videoseries\?list=(.*)|[\w-]{11}|\?listType=(.*)&list=(.*)).*/i,
          youtubeMatch = url.match(youtubeRegex);
        if (youtubeMatch && null != youtubeMatch) return {
          source: "youtube",
          videoId: youtubeMatch[3]
        };
        var vimeoRegex = /(?:vimeo(?:pro)?.com)\/(?:[^\d]+)?(\d+)(?:.*)/i,
          vimeoMatch = url.match(vimeoRegex);
        return vimeoMatch && null != vimeoMatch ? {
          source: "vimeo",
          videoId: vimeoMatch[1]
        } : {
          source: !1,
          videoId: !1
        }
      }

      function getVideoboxWidth() {
        var $width, wWidth = $(window).width(),
          wHeight = $(window).height();
        if (wHeight >= wWidth) $width = wWidth - 2 * lightboxMargin;
        else {
          var wHeightMax = 90 * wHeight / 100;
          if (wWidth > 1280) var $width = wHeightMax / 5768 * 1e4;
          else var $width = wHeightMax / 6120 * 1e4
        }
        return Math.round($width) + "px"
      }

      function getVideoHeight() {
        var $height, wWidth = $(window).width(),
          wHeight = $(window).height();
        return $height = wHeight >= wWidth ? 5670 * (wWidth - 2 * lightboxMargin) / 1e4 : 90 * wHeight / 100 + 2 * lightboxMargin, Math.round($height) + "px"
      }
      var lightboxMargin = 60;
      $(".video-container").each(function () {
        var $videoContainer = $(this),
          playSource = $videoContainer.data("source"),
          playTarget = $videoContainer.data("target"),
          $iframe = $videoContainer.find("iframe"),
          $video = $videoContainer.find("video");
        if ($videoContainer.data("autoplay")) switch (playSource) {
          case "social_hosted":
            playSocialHosted($iframe);
            break;
          case "self_hosted":
            playSelfHosted($video)
        } else {
          var $playIcon = $videoContainer.find(".mk-svg-icon");
          $playIcon.bind("click", function (e) {
            e.preventDefault();
            var isLightbox = "lightbox" == playTarget;
            switch (isLightbox || $playIcon.hide().next(".preloader-preview-area").show(), playSource) {
              case "social_hosted":
                playSocialHosted($iframe, isLightbox);
                break;
              case "self_hosted":
                playSelfHosted($video, isLightbox)
            }
          })
        }
      })
    }

    function mk_video_resize_play_icon() {
      $(".video-thumbnail-overlay").each(function () {
        var $thumbnailOverlay = $(this),
          thumbnailWidth = $thumbnailOverlay.width(),
          $svg = $thumbnailOverlay.find("svg");
        void 0 === $svg.data("width") && $svg.attr("data-width", $svg.width()), void 0 === $svg.data("height") && $svg.attr("data-height", $svg.height()), 4 * $svg.data("width") > thumbnailWidth ? $svg.css({
          width: Math.round(parseInt(thumbnailWidth) / 4) + "px",
          height: Math.round(parseInt(thumbnailWidth) / 4 * $svg.data("height") / $svg.data("width")) + "px"
        }) : $svg.css({
          width: $svg.data("width") + "px",
          height: $svg.data("height") + "px"
        })
      })
    }
    $(window).on("load vc_reload", mk_video_play), $(window).on("load resize orientationChange vc_reload", mk_video_resize_play_icon)
  }(jQuery),
  function () {
    function initTest() {
      options.keyboardSupport && addEvent("keydown", keydown)
    }

    function init() {
      if (!initDone && document.body) {
        initDone = !0;
        var body = document.body,
          html = document.documentElement,
          windowHeight = window.innerHeight,
          scrollHeight = body.scrollHeight,
          rootScrollHeight = function () {
            var adminbar = document.querySelector("#wpadminbar");
            return adminbar ? root.scrollHeight - adminbar.offsetHeight : root.scrollHeight
          };
        if (root = document.compatMode.indexOf("CSS") >= 0 ? html : body, activeElement = body, initTest(), top != self) isFrame = !0;
        else if (scrollHeight > windowHeight && (body.offsetHeight <= windowHeight || html.offsetHeight <= windowHeight)) {
          var fullPageElem = document.createElement("div");
          fullPageElem.style.cssText = "position:absolute; z-index:-10000; top:0; left:0; right:0; height:" + rootScrollHeight() + "px", document.body.appendChild(fullPageElem);
          var pendingRefresh;
          refreshSize = function () {
            pendingRefresh || (pendingRefresh = setTimeout(function () {
              isExcluded || (fullPageElem.style.height = "0", fullPageElem.style.height = rootScrollHeight() + "px", pendingRefresh = null)
            }, 500))
          }, setTimeout(refreshSize, 10), addEvent("resize", refreshSize), window.addResizeListener(document.getElementById("mk-theme-container"), refreshSize);
          var config = {
            attributes: !0,
            childList: !0,
            characterData: !1
          };
          if (observer = new MutationObserver(refreshSize), observer.observe(body, config), root.offsetHeight <= windowHeight) {
            var clearfix = document.createElement("div");
            clearfix.style.clear = "both", body.appendChild(clearfix)
          }
        }
        options.fixedBackground || isExcluded || (body.style.backgroundAttachment = "scroll", html.style.backgroundAttachment = "scroll")
      }
    }

    function cleanup() {
      observer && observer.disconnect(), removeEvent(wheelEvent, wheel), removeEvent("mousedown", mousedown), removeEvent("keydown", keydown), removeEvent("resize", refreshSize), removeEvent("load", init)
    }

    function scrollArray(elem, left, top) {
      if (directionCheck(left, top), 1 != options.accelerationMax) {
        var now = Date.now(),
          elapsed = now - lastScroll;
        if (elapsed < options.accelerationDelta) {
          var factor = (1 + 50 / elapsed) / 2;
          factor > 1 && (factor = Math.min(factor, options.accelerationMax), left *= factor, top *= factor)
        }
        lastScroll = Date.now()
      }
      if (que.push({
          x: left,
          y: top,
          lastX: left < 0 ? .99 : -.99,
          lastY: top < 0 ? .99 : -.99,
          start: Date.now()
        }), !pending) {
        var scrollWindow = elem === document.body,
          step = function (time) {
            for (var now = Date.now(), scrollX = 0, scrollY = 0, i = 0; i < que.length; i++) {
              var item = que[i],
                elapsed = now - item.start,
                finished = elapsed >= options.animationTime,
                position = finished ? 1 : elapsed / options.animationTime;
              options.pulseAlgorithm && (position = pulse(position));
              var x = item.x * position - item.lastX >> 0,
                y = item.y * position - item.lastY >> 0;
              scrollX += x, scrollY += y, item.lastX += x, item.lastY += y, finished && (que.splice(i, 1), i--)
            }
            scrollWindow ? window.scrollBy(scrollX, scrollY) : (scrollX && (elem.scrollLeft += scrollX), scrollY && (elem.scrollTop += scrollY)), left || top || (que = []), que.length ? requestFrame(step, elem, 1e3 / options.frameRate + 1) : pending = !1
          };
        requestFrame(step, elem, 0), pending = !0
      }
    }

    function wheel(event) {
      initDone || init();
      var target = event.target,
        overflowing = overflowingAncestor(target);
      if (!overflowing || event.defaultPrevented || event.ctrlKey) return !0;
      if (isNodeName(activeElement, "embed") || isNodeName(target, "embed") && /\.pdf/i.test(target.src) || isNodeName(activeElement, "object")) return !0;
      var deltaX = -event.wheelDeltaX || event.deltaX || 0,
        deltaY = -event.wheelDeltaY || event.deltaY || 0;
      if (isMac && (options.touchpadSupport = !1, event.wheelDeltaX && isDivisible(event.wheelDeltaX, 120) && (deltaX = event.wheelDeltaX / Math.abs(event.wheelDeltaX) * -120), event.wheelDeltaY && isDivisible(event.wheelDeltaY, 120) && (deltaY = event.wheelDeltaY / Math.abs(event.wheelDeltaY) * -120)), deltaX || deltaY || (deltaY = -event.wheelDelta || 0), 1 === event.deltaMode && (deltaX *= 40, deltaY *= 40), !options.touchpadSupport && isTouchpad(deltaY)) return !0;
      Math.abs(deltaX) > 1.2 && (deltaX *= options.stepSize / 120), Math.abs(deltaY) > 1.2 && (deltaY *= options.stepSize / 120), scrollArray(overflowing, deltaX, deltaY), event.preventDefault(), scheduleClearCache()
    }

    function keydown(event) {
      var target = event.target,
        modifier = event.ctrlKey || event.altKey || event.metaKey || event.shiftKey && event.keyCode !== key.spacebar;
      document.body.contains(activeElement) || (activeElement = document.activeElement);
      var inputNodeNames = /^(textarea|select|embed|object)$/i,
        buttonTypes = /^(button|submit|radio|checkbox|file|color|image)$/i;
      if (inputNodeNames.test(target.nodeName) || isNodeName(target, "input") && !buttonTypes.test(target.type) || isNodeName(activeElement, "video") || isInsideYoutubeVideo(event) || target.isContentEditable || event.defaultPrevented || modifier) return !0;
      if ((isNodeName(target, "button") || isNodeName(target, "input") && buttonTypes.test(target.type)) && event.keyCode === key.spacebar) return !0;
      var shift, x = 0,
        y = 0,
        elem = overflowingAncestor(activeElement),
        clientHeight = elem.clientHeight;
      switch (elem == document.body && (clientHeight = window.innerHeight), event.keyCode) {
        case key.up:
          y = -options.arrowScroll;
          break;
        case key.down:
          y = options.arrowScroll;
          break;
        case key.spacebar:
          shift = event.shiftKey ? 1 : -1, y = -shift * clientHeight * .9;
          break;
        case key.pageup:
          y = .9 * -clientHeight;
          break;
        case key.pagedown:
          y = .9 * clientHeight;
          break;
        case key.home:
          y = -elem.scrollTop;
          break;
        case key.end:
          var damt = elem.scrollHeight - elem.scrollTop - clientHeight;
          y = damt > 0 ? damt + 10 : 0;
          break;
        case key.left:
          x = -options.arrowScroll;
          break;
        case key.right:
          x = options.arrowScroll;
          break;
        default:
          return !0
      }
      scrollArray(elem, x, y), event.preventDefault(), scheduleClearCache()
    }

    function mousedown(event) {
      activeElement = event.target
    }

    function scheduleClearCache() {
      clearTimeout(clearCacheTimer), clearCacheTimer = setInterval(function () {
        cache = {}
      }, 1e3)
    }

    function setCache(elems, overflowing) {
      for (var i = elems.length; i--;) cache[uniqueID(elems[i])] = overflowing;
      return overflowing
    }

    function overflowingAncestor(el) {
      var elems = [],
        body = document.body,
        rootScrollHeight = root.scrollHeight;
      do {
        var cached = cache[uniqueID(el)];
        if (cached) return setCache(elems, cached);
        if (elems.push(el), rootScrollHeight === el.scrollHeight) {
          var topOverflowsNotHidden = overflowNotHidden(root) && overflowNotHidden(body),
            isOverflowCSS = topOverflowsNotHidden || overflowAutoOrScroll(root);
          if (isFrame && isContentOverflowing(root) || !isFrame && isOverflowCSS) return setCache(elems, getScrollRoot())
        } else if (isContentOverflowing(el) && overflowAutoOrScroll(el)) return setCache(elems, el)
      } while (el = el.parentElement)
    }

    function isContentOverflowing(el) {
      return el.clientHeight + 10 < el.scrollHeight
    }

    function overflowNotHidden(el) {
      return "hidden" !== getComputedStyle(el, "").getPropertyValue("overflow-y")
    }

    function overflowAutoOrScroll(el) {
      var overflow = getComputedStyle(el, "").getPropertyValue("overflow-y");
      return "scroll" === overflow || "auto" === overflow
    }

    function addEvent(type, fn) {
      window.addEventListener(type, fn, !1)
    }

    function removeEvent(type, fn) {
      window.removeEventListener(type, fn, !1)
    }

    function isNodeName(el, tag) {
      return (el.nodeName || "").toLowerCase() === tag.toLowerCase()
    }

    function directionCheck(x, y) {
      x = x > 0 ? 1 : -1, y = y > 0 ? 1 : -1, direction.x === x && direction.y === y || (direction.x = x, direction.y = y, que = [], lastScroll = 0)
    }

    function isTouchpad(deltaY) {
      if (deltaY) return deltaBuffer.length || (deltaBuffer = [deltaY, deltaY, deltaY]), deltaY = Math.abs(deltaY), deltaBuffer.push(deltaY), deltaBuffer.shift(), clearTimeout(deltaBufferTimer), deltaBufferTimer = setTimeout(function () {
        window.localStorage && (localStorage.SS_deltaBuffer = deltaBuffer.join(","))
      }, 1e3), !allDeltasDivisableBy(120) && !allDeltasDivisableBy(100)
    }

    function isDivisible(n, divisor) {
      return Math.floor(n / divisor) == n / divisor
    }

    function allDeltasDivisableBy(divisor) {
      return isDivisible(deltaBuffer[0], divisor) && isDivisible(deltaBuffer[1], divisor) && isDivisible(deltaBuffer[2], divisor)
    }

    function isInsideYoutubeVideo(event) {
      var elem = event.target,
        isControl = !1;
      if (-1 != document.URL.indexOf("www.youtube.com/watch"))
        do {
          if (isControl = elem.classList && elem.classList.contains("html5-video-controls")) break
        } while (elem = elem.parentNode);
      return isControl
    }

    function pulse_(x) {
      var val, start, expx;
      return x *= options.pulseScale, x < 1 ? val = x - (1 - Math.exp(-x)) : (start = Math.exp(-1), x -= 1, expx = 1 - Math.exp(-x), val = start + expx * (1 - start)), val * options.pulseNormalize
    }

    function pulse(x) {
      return x >= 1 ? 1 : x <= 0 ? 0 : (1 == options.pulseNormalize && (options.pulseNormalize /= pulse_(1)), pulse_(x))
    }

    function SmoothScroll(optionsToSet) {
      for (var key in optionsToSet) defaultOptions.hasOwnProperty(key) && (options[key] = optionsToSet[key])
    }
    var activeElement, observer, refreshSize, clearCacheTimer, deltaBufferTimer, defaultOptions = {
        frameRate: 150,
        animationTime: 400,
        stepSize: 100,
        pulseAlgorithm: !0,
        pulseScale: 4,
        pulseNormalize: 1,
        accelerationDelta: 50,
        accelerationMax: 3,
        keyboardSupport: !0,
        arrowScroll: 50,
        touchpadSupport: !0,
        fixedBackground: !0,
        excluded: ""
      },
      options = defaultOptions,
      isExcluded = !1,
      isFrame = !1,
      direction = {
        x: 0,
        y: 0
      },
      initDone = !1,
      root = document.documentElement,
      deltaBuffer = [],
      isMac = /^Mac/.test(navigator.platform),
      key = {
        left: 37,
        up: 38,
        right: 39,
        down: 40,
        spacebar: 32,
        pageup: 33,
        pagedown: 34,
        end: 35,
        home: 36
      },
      que = [],
      pending = !1,
      lastScroll = Date.now(),
      uniqueID = function () {
        var i = 0;
        return function (el) {
          return el.uniqueID || (el.uniqueID = i++)
        }
      }(),
      cache = {};
    window.localStorage && localStorage.SS_deltaBuffer && (deltaBuffer = localStorage.SS_deltaBuffer.split(","));
    var wheelEvent, requestFrame = function () {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback, element, delay) {
          window.setTimeout(callback, delay || 1e3 / 60)
        }
      }(),
      MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver,
      getScrollRoot = function () {
        var SCROLL_ROOT;
        return function () {
          if (!SCROLL_ROOT) {
            var dummy = document.createElement("div");
            dummy.style.cssText = "height:10000px;width:1px;", document.body.appendChild(dummy);
            var bodyScrollTop = document.body.scrollTop;
            document.documentElement.scrollTop;
            window.scrollBy(0, 3), SCROLL_ROOT = document.body.scrollTop != bodyScrollTop ? document.body : document.documentElement, window.scrollBy(0, -3), document.body.removeChild(dummy)
          }
          return SCROLL_ROOT
        }
      }(),
      userAgent = window.navigator.userAgent,
      isIE = /Trident/.test(userAgent),
      isEdge = /Edge/.test(userAgent),
      isChrome = /chrome/i.test(userAgent) && !isEdge,
      isMobile = (/safari/i.test(userAgent), /mobile/i.test(userAgent)),
      isIEWin7 = /Windows NT 6.1/i.test(userAgent) && /rv:11/i.test(userAgent),
      isEnabledForBrowser = (isChrome || isIEWin7 || isIE || isEdge) && !isMobile;
    "onwheel" in document.createElement("div") ? wheelEvent = "wheel" : "onmousewheel" in document.createElement("div") && (wheelEvent = "mousewheel"), wheelEvent && isEnabledForBrowser && (addEvent(wheelEvent, wheel), addEvent("mousedown", mousedown), addEvent("load", init)), SmoothScroll.destroy = cleanup, window.SmoothScrollOptions && SmoothScroll(window.SmoothScrollOptions), "function" == typeof define && define.amd ? define(function () {
      return SmoothScroll
    }) : "object" == typeof exports ? module.exports = SmoothScroll : window.SmoothScroll = SmoothScroll
  }();
