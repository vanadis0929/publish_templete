// Default Common JS
(function (exports, $) {
  var exports = exports;
  const doc = document;
  const $win = $(window);
  const IS_ACTIVE = 'is_active';

  //addEventListener는 단일 이벤트만 등록가능해서 다중으로 쓸때 사용.
  Node.prototype.addEventListeners = function (eventNames, eventFunction) {
    for (eventName of eventNames.split(' ')) this.addEventListener(eventName, eventFunction);
  };

  function debounce(func, wait, immediate) {
    var timeout;
    return function () {
      var context = this,
        args = arguments;
      var later = function () {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }

  $(document).ready(function () {
    function initUICommon() {
      homeKvSlider();
      homeRankingSlider();
      homeNewInSlider();
      homeRecommendedSlider();
      homeBrandIssueSlider();
      homeMegazineSlider();
      likeToggleButton('js-badgeLike');
      js_topBannerClose();
      mobileDockBar.dockbarInit();
      selectric();
      pdTypeSlider();
      //commonTabMenu();
      mainThumHover();
      mpAsideMenu();
      datePicker();
      fileBox();
      summaryAccordion();

      inputValueDelete();
      tabs();
    }

    //실행
    initUICommon();
  });

  // resize jQuery 사용시
  $win.on('load resize', function () {
    screenWidth = $win.outerWidth();
    modal.modalResize('.js_modal_wrap'); // Modal Resize

    if ($win.innerWidth() > 360 && $win.innerWidth() <= 1023) {
      // mo
      datePicker();
    } else {
      // pc
    }
  });

  /**▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣**/
  /**
   * @Document : mainProductThumUtils(메인 썸네일 제어)
   **/
  /**▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣**/
  const mainThumHover = function () {
    const thumHover = document.querySelectorAll('.js_thumHover');
    $win.on('load resize', function () {
      thumHover.forEach((list, idx) => {
        if (!list.closest('.uq_soldout')) {
          thumHover[idx].addEventListener('mouseenter', (event) => {
            // pc만 적용
            if ($win.innerWidth() > 1023) {
              event.currentTarget.closest('.js_thumListHover').querySelector('.js_toastThumIcon').classList.add(IS_ACTIVE);

              // 상세링크, 미리보기
              event.currentTarget
                .closest('.js_thumListHover')
                .querySelector('.js_toastThumIcon')
                .addEventListener('mouseenter', (event) => {
                  event.target.classList.add(IS_ACTIVE);
                });
            }
          });

          thumHover[idx].addEventListener('mouseleave', (event) => {
            event.currentTarget.closest('.js_thumListHover').querySelector('.js_toastThumIcon').classList.remove(IS_ACTIVE);
          });
        }
      });
    });
  };

  //탭메뉴 이동시에 함수 호출(개발에서 사용)
  const mainThumHoverTabMenu = function () {
    const thumHover = document.querySelectorAll('.js_thumHover');
    thumHover.forEach((list, idx) => {
      if (!list.closest('.uq_soldout')) {
        thumHover[idx].addEventListener('mouseenter', (event) => {
          // pc만 적용
          if ($win.innerWidth() > 1023) {
            event.currentTarget.closest('.js_thumListHover').querySelector('.js_toastThumIcon').classList.add(IS_ACTIVE);

            // 상세링크, 미리보기
            event.currentTarget
              .closest('.js_thumListHover')
              .querySelector('.js_toastThumIcon')
              .addEventListener('mouseenter', (event) => {
                event.target.classList.add(IS_ACTIVE);
              });
          }
        });

        thumHover[idx].addEventListener('mouseleave', (event) => {
          event.currentTarget.closest('.js_thumListHover').querySelector('.js_toastThumIcon').classList.remove(IS_ACTIVE);
        });
      }
    });
  };

  /**▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣**/
  /**
   * @Document : Slider공통버튼(prev/ next);
   **/
  /**▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣**/
  const sliderPrevNextBtn = {
    next: function (btnName, swiperName) {
      $(btnName).on('click', function () {
        swiperName.slideNext();
      });
    },
    prev: function (btnName, swiperName) {
      $(btnName).on('click', function () {
        swiperName.slidePrev();
      });
    },
  };

  /**▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣**/
  /**
   * @Document : like Toggle Button;
   **/
  /**▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣**/
  function likeToggleButton(likeClassName) {
    doc.addEventListener('click', function (event) {
      if (!event.target.classList.contains(likeClassName)) return;

      if (!event.target.classList.contains(IS_ACTIVE)) {
        event.target.classList.add(IS_ACTIVE);
      } else {
        event.target.classList.remove(IS_ACTIVE);
      }
    });
  }

  /**▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣**/
  /**
   * @Document : HomeKvSlider;
   **/
  /**▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣**/
  function homeKvSlider() {
    const $countCurrent = $('.bl_homeKvPag > .el_homeKvCurt');
    const $countTotal = $('.bl_homeKvPag > .el_homeKvTotal');

    const homeKv = new Swiper('.js_homeKv', {
      init: true,
      loop: true,
      slidesPerView: 'auto',
      spaceBetween: 20,
      centeredSlides: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      breakpoints: {
        360: {
          spaceBetween: 8,
        },
        1024: {
          spaceBetween: 20,
        },
      },
      nested: true,
      speed: 800,
      on: {
        init: function () {
          let current = this.realIndex + 1;
          let total = $('.js_homeKv').find('.swiper-slide:not(.swiper-slide-duplicate)').length;
          total = total < 10 ? '0' + total : total;
          current = current < 10 ? '0' + current : current;
          $countCurrent.text(current);
          $countTotal.text(total);
        },
      },
    });

    sliderPrevNextBtn.next('.js_homeKv .js_swiperNext', homeKv);
    sliderPrevNextBtn.prev('.js_homeKv .js_swiperPrev', homeKv);

    homeKv.on('slideChange', function () {
      let current = homeKv.realIndex + 1;
      let total = $('.js_homeKv').find('.swiper-slide:not(.swiper-slide-duplicate)').length;
      total = total < 10 ? '0' + total : total;
      current = current < 10 ? '0' + current : current;
      $countCurrent.text(current);
      $countTotal.text(total);
    });
  }

  /**▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣**/
  /**
   * @Document : homeRankingSlider
   **/
  /**▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣**/
  function homeRankingSlider() {
    const homeRanking = new Swiper('.js_homeRanking', {
      init: true,
      loop: false,
      slidesPerView: 'auto',
      spaceBetween: 24,
      centeredSlides: false,
      speed: 500,
      scrollbar: {
        el: '.swiper-scrollbar',
        hide: false,
      },
      breakpoints: {
        360: {
          spaceBetween: 8,
          grid: {
            rows: 2,
            fill: 'row',
          },
        },
        1024: {
          spaceBetween: 16,
          grid: {
            rows: 1,
          },
        },
      },
    });

    sliderPrevNextBtn.next('.js_homeRanking .js_swiperNext', homeRanking);
    sliderPrevNextBtn.prev('.js_homeRanking .js_swiperPrev', homeRanking);
  }

  /**▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣**/
  /**
   * @Document : homeMegazineSlider
   **/
  /**▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣**/
  function homeMegazineSlider() {
    const homeMegazine = new Swiper('.js_homeMegazine', {
      init: true,
      loop: false,
      slidesPerView: 1,
      spaceBetween: 0,
      centeredSlides: false,
      speed: 500,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    });
  }

  /**▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣**/
  /**
   * @Document : homeNewInSlider
   **/
  /**▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣**/
  function homeNewInSlider() {
    const homeNewIn = new Swiper('.js_homeNewIn', {
      init: true,
      loop: false,
      slidesPerView: 'auto',
      spaceBetween: 24,
      centeredSlides: false,
      speed: 500,
      scrollbar: {
        el: '.swiper-scrollbar',
        hide: false,
      },
      breakpoints: {
        360: {
          spaceBetween: 8,
          grid: {
            rows: 2,
            fill: 'row',
          },
        },
        1024: {
          spaceBetween: 24,
          grid: {
            rows: 1,
          },
        },
      },
    });

    sliderPrevNextBtn.next('.js_homeNewIn .js_swiperNext', homeNewIn);
    sliderPrevNextBtn.prev('.js_homeNewIn .js_swiperPrev', homeNewIn);
  }

  /**▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣**/
  /**
   * @Document : homeBrandIssueSlider
   **/
  /**▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣**/
  function homeBrandIssueSlider() {
    const homeBrandIssue = new Swiper('.js_homeBrandIssue', {
      init: true,
      loop: false,
      slidesPerView: 2,
      spaceBetween: 20,
      centeredSlides: false,
      speed: 500,
      scrollbar: {
        el: '.swiper-scrollbar',
        hide: false,
      },
      breakpoints: {
        360: {
          slidesPerView: 1,
          spaceBetween: 8,
        },
        1024: {
          spaceBetween: 20,
        },
      },
    });

    sliderPrevNextBtn.next('.js_homeBrandIssue .js_swiperNext', homeBrandIssue);
    sliderPrevNextBtn.prev('.js_homeBrandIssue .js_swiperPrev', homeBrandIssue);
  }

  /**▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣**/
  /**
   * @Document : homeRecommendedSlider
   **/
  /**▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣**/
  function homeRecommendedSlider() {
    const homeRecommended = new Swiper('.js_homeRecommended', {
      init: true,
      loop: false,
      slidesPerView: 'auto',
      spaceBetween: 24,
      centeredSlides: false,
      speed: 500,
      scrollbar: {
        el: '.swiper-scrollbar',
        hide: false,
      },
      breakpoints: {
        360: {
          spaceBetween: 8,
          grid: {
            rows: 2,
            fill: 'row',
          },
        },
        1024: {
          spaceBetween: 24,
          grid: {
            rows: 1,
          },
        },
      },
    });

    sliderPrevNextBtn.next('.js_homeRecommended .js_swiperNext', homeRecommended);
    sliderPrevNextBtn.prev('.js_homeRecommended .js_swiperPrev', homeRecommended);
  }

  /**▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣**/
  /**
   * @Document : topBannerClose
   **/
  /**▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣**/
  function js_topBannerClose() {
    const topBannerBtn = $('.js_topBannerClose');
    topBannerBtn.on('click', function () {
      $(this).parent().css({
        display: 'none',
      });
    });
  }

  /**▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣**/
  /**
   * @Document : Modal(LayerPopup)
   **/
  /**▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣**/
  const modal = {
    option: {
      speed: 0.5,
      type: 'normal',
      title: true,
      footer: true,
      modalHeight: 400, // modal높이 지정(최소 170px)
    },
    open: function ($className, $opt) {
      // option 객체 복사해서 사용
      for (var key in $opt) {
        modal.option[key] = $opt[key];
      }

      // 스크롤 방지
      $('body')
        .css({ overflow: 'hidden' })
        .bind('scroll', 'touchmove', function (e) {
          e.preventDefault();
          e.stopPropagation();
          return false;
        });

      // 모바일 사이즈
      if (screenWidth < 1024) {
        if (modal.option.type == 'normal') {
          $($className).addClass('modal_wrap--full');
        }
      }

      // 옵션
      if (modal.option.type == 'full') {
        $($className).addClass('modal_wrap--full');
      }
      if (modal.option.title == true) {
        $($className).find('.modal_header').addClass(IS_ACTIVE);
      }
      if (modal.option.footer == true) {
        $($className).find('.modal_footer').addClass(IS_ACTIVE);
      }

      // Modal
      TweenMax.set($className, {
        css: {
          display: 'block',
          opacity: '0',
        },
      });
      TweenMax.to($className, modal.option.speed, {
        css: {
          display: 'flex',
          opacity: '1',
        },
        ease: Expo.easeInOut,
      });

      const minHeight = 170;
      const footerPadding = $($className).find('.modal_footer').css('padding');
      const regex = /[^0-9]/g;
      const result = footerPadding.replace(regex, '');
      const footerPaddingNumber = parseInt(result);

      // open
      if ($win.innerWidth() > 1023) {
        // pc 고정 높이 옵션
        $($className)
          .find('.modal')
          .css({
            height: modal.option.modalHeight + footerPaddingNumber * 2 + 'px',
          });
        $($className)
          .find('.modal_content_inner')
          .css({
            height: modal.option.modalHeight - minHeight + 'px',
          });
      }

      //resize
      $win.on('resize', function () {
        if ($win.innerWidth() > 1023) {
          // pc
          $($className)
            .find('.modal')
            .css({
              height: modal.option.modalHeight + footerPaddingNumber * 2 + 'px',
            });
          $($className)
            .find('.modal_content_inner')
            .css({
              height: modal.option.modalHeight - minHeight + 'px',
            });
        } else {
          // mo
          $($className).find('.modal').css({
            height: '100%',
          });
          $($className).find('.modal_content_inner').css({
            height: 'calc(100vh - 44.4444444444vw)',
          });
        }
      });
    },
    close: function ($className, $opt) {
      // 스크롤 방지 해지
      $('body').css({ overflow: 'scroll' }).unbind('scroll', 'touchmove');

      // option 객체 복사해서 사용
      for (var key in $opt) {
        modal.option[key] = $opt[key];
      }
      TweenMax.to($className, modal.option.speed, {
        css: {
          display: 'none',
          opacity: '0',
        },
        ease: Expo.easeInOut,
      });
    },
    modalResize: function ($className) {
      if (screenWidth >= 1024) {
        if (modal.option.type == 'normal') {
          $($className).removeClass('modal_wrap--full');
        }
      } else {
        $($className).addClass('modal_wrap--full');
      }
    },
  };

  /**▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣**/
  /**
   * @Document : confirm(LayerPopup)
   **/
  /**▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣**/
  const confirm = {
    option: {
      speed: 0.5,
      title: true,
      dsc: true,
    },
    init: function () {
      confirm.open();
    },
    open: function ($className, $opt) {
      // option 객체 복사해서 사용
      for (var key in $opt) {
        confirm.option[key] = $opt[key];
      }

      // 스크롤 방지
      $('body')
        .css({ overflow: 'hidden' })
        .bind('scroll', 'touchmove', function (e) {
          e.preventDefault();
          e.stopPropagation();
          return false;
        });

      // 모바일 사이즈
      if (screenWidth < 1024) {
      }

      // 옵션
      if (confirm.option.title == true) {
        $($className).find('.confirm__body .confirm__tit').addClass(IS_ACTIVE);
      }
      if (confirm.option.dsc == true) {
        $($className).find('.confirm__body .confirm__dsc').addClass(IS_ACTIVE);
      } else {
        $($className).find('.confirm__body .confirm__tit').css({
          'margin-bottom': '40px',
        });
      }

      // confirm
      TweenMax.set($className, {
        css: {
          display: 'block',
          opacity: '0',
        },
      });
      TweenMax.to($className, confirm.option.speed, {
        css: {
          display: 'flex',
          opacity: '1',
        },
        ease: Expo.easeInOut,
      });
    },
    close: function ($className, $opt) {
      $('body').css({ overflow: 'scroll' }).unbind('scroll', 'touchmove');
      // option 객체 복사해서 사용
      for (var key in $opt) {
        confirm.option[key] = $opt[key];
      }
      TweenMax.to($className, confirm.option.speed, {
        css: {
          display: 'none',
          opacity: '0',
        },
        ease: Expo.easeInOut,
      });
    },
  };

  /**▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣**/
  /**
   * @Document :
   **/
  /**▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣**/
  const mobileDockBar = {
    el: document.querySelector('.js_mobileDockBar'),
    before: 0,
    dockbarInit: function () {
      mobileDockBar.dockbarScroll();
    },
    dockbarScroll: function () {},
    dockbarAnimate: function (num) {},
  };
  const dc = document.documentElement;
  let w = window;
  let curScroll;
  let prevScroll = w.scrollY || dc.scrollTop;
  let curDirection = 0;
  let prevDirection = 0;
  let header = document.querySelector('.js_mobileDockBar');
  let toggled;
  let threshold = 200;

  let checkScroll = function () {
    if (!$('.js_mobileDockBar').length) return;
    curScroll = w.scrollY || dc.scrollTop;
    if (curScroll > prevScroll) {
      // scrolled down
      curDirection = 2;
    } else {
      //scrolled up
      curDirection = 1;
    }

    if (curDirection !== prevDirection) {
      toggled = toggleHeader();
    }

    prevScroll = curScroll;
    if (toggled) {
      prevDirection = curDirection;
    }
  };

  const toggleHeader = function () {
    toggled = true;
    if (curDirection === 2 && curScroll > threshold) {
      header.classList.add('is_hide');
    } else if (curDirection === 1) {
      header.classList.remove('is_hide');
    } else {
      toggled = false;
    }
    return toggled;
  };

  /**▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣**/
  /**
   * @Document : selectric
   **/
  /**▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣**/

  const selectric = function () {
    if (!$('.js_selectBtn').length) return;
    $('.js_selectBtn').selectric({
      maxHeight: 200,
      arrowButtonMarkup: '<b class="button">&#x25be;</b>',
      // optionsItemBuilder: function (itemData, element, index) {
      //   console.log(itemData);
      //   console.log(element);
      //   console.log(index);
      //   return itemData;
      // },
    });
  };

  /**▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣**/
  /**
   * @Document : pdTypeSlider
   **/
  /**▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣**/

  function pdTypeSlider() {
    const pdTypeSwiper = new Swiper('.js_pdTypeSlide', {
      slidesPerView: 'auto',

      breakpoints: {
        1024: {
          spaceBetween: 56,
        },
      },
    });
  }

  window.addEventListener('scroll', checkScroll);

  /**▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣**/
  /**
   * @Document : commonTabMenu
   **/
  /**▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣**/

  function commonTabMenu() {
    $('.js_tab__list').on('click', function () {
      const num = $('.js_tab__list').index($(this));

      $('.js_tab__list').removeClass(IS_ACTIVE);
      $('.js_tab_wrap__item').removeClass(IS_ACTIVE);

      $(`.js_tab__list:eq(${num})`).addClass(IS_ACTIVE);
      $('.js_tab_wrap__item:eq(' + num + ')').addClass(IS_ACTIVE);
    });
  }

  /**▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣**/
  /**
   * @Document : mpAsideMenu(서브메뉴)
   **/
  /**▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣**/
  function mpAsideMenu() {
    var target = $('.js_asideMenu');

    target.each(function () {
      var btn = $(this).children().find('.js_btn--allView');
      var spanTxt = $(this).children().find('.js_btn--allView span');

      btn.on('click', function () {
        $(this).toggleClass(IS_ACTIVE);
        $(this).closest(target).find('.js_asideMenu__allView').slideToggle(300);

        if ($(this).hasClass(IS_ACTIVE)) {
          $(this).find(spanTxt).html('메뉴닫기');
        } else {
          $(this).find(spanTxt).html('메뉴 전체보기');
        }
      });
    });
  }

  /**▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣**/
  /**
   * @Document : summaryAccordion
   **/
  /**▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣**/

  function summaryAccordion(event) {
    document.body.addEventListeners('click', (event) => {
      const targetClassName = ['bl_accordion', 'bl_accordion__item', 'bl_accordion__title'];

      const filteredClassList = [...event.target.classList].filter((current) => targetClassName.includes(current));

      if (!filteredClassList.length) return;

      const isOpen = 'is-open';
      const target = event.target.parentElement;
      const hasClassIsOpen = target.classList.contains(isOpen);

      const core = {
        handleOpen: () => {
          target.classList.add(isOpen);
          //console.log('open');
        },

        handleClose: () => {
          target.classList.remove(isOpen);
          //console.log('close');
        },

        handleSetProperties: (event) => {
          const setPropertiesTarget = event.target.closest(`.${targetClassName[0]}`);
          const dataAttr = setPropertiesTarget.dataset;

          if (dataAttr.durationTime !== undefined) setPropertiesTarget.style.setProperty('--durationTime', dataAttr.durationTime);

          if (dataAttr.easing !== undefined) setPropertiesTarget.style.setProperty('--easing', dataAttr.easing);

          if (dataAttr.delay !== undefined) setPropertiesTarget.style.setProperty('--delay', dataAttr.delay);
        },

        handleOnlyOneOpen: (event) => {
          if (!event.target.closest(`.${targetClassName[0]}`).classList.contains('bl_accordion--onlyOneOpen')) return;

          const handleOnlyOneOpenTarget = event.target.closest(`.${targetClassName[0]}`);

          for (sibling of handleOnlyOneOpenTarget.children) {
            sibling.classList.remove(isOpen);
          }
        },
      };

      core.handleSetProperties(event);

      core.handleOnlyOneOpen(event);

      hasClassIsOpen ? core.handleClose() : core.handleOpen();
    });
  }

  /**▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣**/
  /**
   * @Document : accordion
   **/
  /**▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣**/
  const accordion = {
    option: {
      speed: 0.3,
      gap: 20,
    },
    create: function ($className, $opt) {
      const list = $($className).find('.bl_accordion__list');
      const btnEvent = list.find('.js_accorMore');

      for (var key in $opt) {
        accordion.option[key] = $opt[key];
      }

      // load resize
      $win.on('load resize', function () {});

      btnEvent.on('click', accordion.btnClick);
    },
    btnClick: function () {
      const $hasClass = !$(this).closest('.bl_accordion__list').hasClass(IS_ACTIVE);

      $hasClass ? accordion.open($(this)) : accordion.close($(this));
    },
    open: function ($className) {
      // btn
      $($className).addClass(IS_ACTIVE);
      $($className).closest('.bl_accordion__list').addClass(IS_ACTIVE);
      $($className).closest('.bl_accordion__list').find('.bl_accordion__txtBox').addClass(IS_ACTIVE);

      $($className).closest('.bl_accordion__list').find('.bl_accordion__txtBox').css('display', 'block');

      // accordion
      // TweenMax.to($($className).closest('.bl_accordion__list').find('.bl_accordion__txtBox'), accordion.option.speed, {
      //   css: {
      //     'height': h + 'px',
      //   },
      //   ease: Expo.easeInOut,
      // })
    },
    close: function ($className) {
      // btn
      $($className).removeClass(IS_ACTIVE);
      $($className).closest('.bl_accordion__list').removeClass(IS_ACTIVE);
      $($className).closest('.bl_accordion__list').find('.bl_accordion__txtBox').removeClass(IS_ACTIVE);

      $($className).closest('.bl_accordion__list').find('.bl_accordion__txtBox').css('display', 'none');

      // accordion
      // TweenMax.to($($className).closest('.bl_accordion__list'), accordion.option.speed, {
      //   css: {
      //     height: accordion.var.initVal - accordion.option.gap + 'px',
      //   },
      //   ease: Expo.easeInOut,
      // })
    },
  };

  /**▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣**/
  /**
   * @Document : datePicker
   **/
  /**▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣**/
  function datePicker() {
    if (!$('#startDate, #endDate').length) return;
    $('#startDate, #endDate').datepicker({
      format: 'yyyy. mm. dd',
      language: 'ko-KR',
      days: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
      daysShort: ['일', '월', '화', '수', '목', '금', '토'],
      daysMin: ['일', '월', '화', '수', '목', '금', '토'],
      monthsShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
      weekStart: 0,
      autoHide: true,
    });
  }

  /**▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣**/
  /**
   * @Document : tabs(탭메뉴)
   *
   **/
  /**▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣**/
  function tabs(event) {
    let target, isTabButton, tabElement, tabContentsElement;

    document.body.addEventListeners('click keyup', (event) => {
      target = event.target;
      isTabButton = target.getAttribute('role');

      //예제는 제목이 탭과 같이 포함이여서 __inner를 사용. 사용하지않는경우등에서는 수정 필요.
      tabElement = target.closest('.bl_tabs__inner');
      tabContentsElement = target?.closest('.bl_tabs')?.nextElementSibling;

      if (!isTabButton || isTabButton != 'tab') return;

      if (event.type == 'keyup') {
        switch (event.key) {
          case 'ArrowLeft':
            handleToFocus(event, 'prev');
            break;
          case 'ArrowRight':
            handleToFocus(event, 'next');
            break;
        }
      } else {
        handleToFocus(event);
      }
    });

    const handleToFocus = (event, direction) => {
      switch (direction) {
        case 'prev':
          if (event.target.previousElementSibling == null) return;
          break;
        case 'next':
          if (event.target.nextElementSibling == null) return;
          break;
      }

      const removeAttributes = () => {
        for (tabChild of tabElement.children) {
          tabChild.setAttribute('aria-selected', 'false');

          //실제 프로젝트에 맞게 변형해서 사용해주세요.
          tabChild.classList.remove('el_prCor10');
          tabChild.classList.add('el_bgGry50');
        }

        for (tabContentsChild of tabContentsElement.children) {
          tabContentsChild.classList.remove(IS_ACTIVE);
        }
      };

      const addAttributeCurrentTab = (event, direction) => {
        const target = direction == 'prev' ? event.target.previousElementSibling : direction == 'next' ? event.target.nextElementSibling : event.target;
        const tabContentsSelector = document.querySelector(`.bl_tabs ~ .bl_tabsContents [aria-labelledby=${event.target.id}]`);
        const tabContentsTarget = direction == 'prev' ? tabContentsSelector?.previousElementSibling : direction == 'next' ? tabContentsSelector?.nextElementSibling : tabContentsSelector;

        if (!tabContentsTarget) return;

        removeAttributes();

        target.setAttribute('aria-selected', 'true');
        target.removeAttribute('tabindex');

        //실제 프로젝트에 맞게 변형해서 사용해주세요.
        target.classList.add('el_prCor10');
        // return;

        if (event.type == 'keyup') target.focus();

        tabContentsTarget.classList.add(IS_ACTIVE);
      };

      addAttributeCurrentTab(event, direction);
    };
  }

  /**▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣**/
  /**
   * @Document : inputValueDelete(입력값 삭제)
   **/
  /**▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣**/
  function inputValueDelete() {
    // 인풋 입력시 전체삭제버튼 출현
    $('body').on('focusin input focusout', '.el_input', function (event) {
      const allowTypes = /text|password|search|email|number|tel/i.test(event.target.type);

      if (event.type == 'focusin' && !allowTypes) {
        return false;
      }

      return inputClearButton(event);
    });

    //전체 삭제 후 포커스 이동
    $('body').on('click', '.js_inputValueDelete', function (event) {
      $(event.target).siblings('input').val('').focus();
    });

    // input 옆 버튼 클릭시 내용 전체 삭제 하는 버튼 val값에 따라 표시 제어
    function inputClearButton(event) {
      const condition = $(event.target).val().length > 0;
      const target = $(event.target).siblings('.js_inputValueDelete');

      condition ? target.addClass(IS_ACTIVE) : target.removeClass(IS_ACTIVE);
    }
  }

  /**▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣**/
  /**
   * @Document : fileBox(파일첨부)
   **/
  /**▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣**/
  function fileBox() {
    $('body').on('change', '.js_inputFile', function (event) {
      if (!$('.js_inputFile').length) return;

      var filename = $(this)[0].files[0].name;
      $(event.target).siblings('.bl_input--fileBox__label').val(filename);
    });
  }

  function swiper() {}

  /**▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣**/
  /**
   * @Document : modal
   **/
  /**▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣**/

  const modalLayer = {
    //기본 옵션
    /*
      대상
      위치: 기본 센터/센터 (css 단위 사용가능)
      사이즈
      헤더 스크롤 여부
      타이틀: header 텍스트
      닫기버튼: 우측 X버튼 사용할지 말지
      딤 배경: 배경색지정: 기본, 없음 가능
      딤 배경 클릭 시 닫힘
      애니메이션: AOS활용하거나 animate.css
      콜백: {
        init: 팝업 실행 후 
        beforeClose: 팝업 닫히면 실행할것
        afterClose: 팝업 닫히면 실행할것
      }
      타입: modal / confirm, full, bottomsheet, toast,
    */

    /*
      
    */

    options: {
      target: '',
      //type: '', //modal / confirm, full, bottomsheet, toast,
      position: ['center', 'center'],
      // width: '',
      // height: '',
      headerTitle: '<strong>타이틀이다, 태그도 입힐 수 있다</strong>',
      // bodyMsg: '',
      // footerBtn: '',
      // closeButton: '',
      // scrolling: '',
      // dim: '',
      dimClickClose: true,
      // animation: {
      //   /* https://animate.style/ 참고 할 예정 */
      //   name: '',
      //   duration: '',
      // },
    },
    on: {
      init: function () {
        console.log('init ');
      },
      beforeClose: function () {},
      afterClose: function () {},
    },
    core: {
      firstFocus: function (target) {
        const focusElements = 'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]):not([disabled]), details:not([disabled]), summary:not(:disabled)';

        target.querySelectorAll(focusElements)[0].focus();
      },
      setHeaderTitle: function () {
        const target = document.querySelector('.bl_modal_header');
        target.innerHTML = modalLayer.options.headerTitle;
      },
      setLayerOpenAttribute: function (element, attrs) {
        for (var key in attrs) {
          element.setAttribute(key, attrs[key]);
        }
      },
      setNewOptions: function (target, options) {
        const blModalWrap = target.querySelector('.bl_modal__inner');

        const returnedTarget = Object.assign({}, modalLayer.options, options);

        blModalWrap.style.cssText = `
          width: ${returnedTarget.options.width} ? ${returnedTarget.options.width} : '';
        `;
      },
      setPreventBodyScrollOn: function () {
        $('html').css({
          height: window.innerHeight,
          overflowY: 'hidden',
          touchAction: 'none',
        });
      },
      setPreventBodyScrollOff: function () {
        $('html').css({
          height: '',
          overflowY: '',
          touchAction: '',
        });
      },
    },

    open: function (target, options) {
      // open: 기존에 마크업 된 요소를 불러옴(target id 필요)
      // pull, dialog, modal 가능

      // Object.assign(this.options);

      target = document.querySelector('#' + target);

      //기본옵션은 놔두고, 새로 입력한 옵션이 덮어써지게끔 처리(1회성)

      //this.core.setHeaderTitle();

      this.core.setLayerOpenAttribute(target, {
        'aria-modal': 'true',
        'aria-hidden': 'false',
      });

      //개선필요, 배열과 배열의 비교로 ..
      if (!target.classList.contains('bl_modal--full') && !target.classList.contains('bl_modal--bottomSheet') && !target.classList.contains('bl_modal--toast')) {
        target.querySelector('.bl_modal__inner').classList.add('bl_modal__inner--center');
      }

      //토스트 기능 개선 필요(특정시간후에 지워지게, 순차적으로 쌓인순으로 지워지게)
      // if (target.classList.contains('bl_modal--toast')) {
      //   target.querySelectorAll('.bl_modal__inner').forEach(function (element, index) {
      //     setTimeout(function () {
      //       element.remove();
      //     }, 3000);
      //   });
      // }

      //this.core.setNewOptions(target, this.options);

      const blModalWrap = target.querySelector('.bl_modal__inner');

      const returnedTarget = Object.assign({}, this.options, options);

      // function setCSSProperty(el, varName, varValue) {
      //   el.style.setProperty(varName, varValue);
      // }

      // setCSSProperty(blModalWrap, 'width', returnedTarget.width);
      // setCSSProperty(blModalWrap, 'height', returnedTarget.height);

      // blModalWrap.style.cssText = `
      //     width: ${returnedTarget.width};
      //     height: ${returnedTarget.height};
      //     top: '';
      //     left '';
      //   `;

      this.core.setPreventBodyScrollOn();

      this.core.firstFocus(target);

      console.table(returnedTarget);

      this.on.init();

      if (this.options.dimClickClose) {
        target.addEventListener('click', function (event) {
          const conditions = event.target.classList !== event.currentTarget.classList;

          conditions ? '' : console.log('딤영역클릭');
        });
      }

      if (target == null) return;
    },
    close: function () {
      //현재는 열려있는 1개만
      const target = document.querySelector('.bl_modal[aria-hidden="false"]');

      this.core.setLayerOpenAttribute(target, {
        'aria-modal': 'false',
        'aria-hidden': 'true',
      });

      this.core.setPreventBodyScrollOff();
    },
  };

  // console.log(modalLayer);

  const toast = {
    options: {
      msg: null,
      direction: 'bottom',
      textAlign: 'left',
      duration: 5000,
      //animate: {}
    },
    core: {
      setAttribute: function (element, attrs) {
        for (var key in attrs) {
          element.setAttribute(key, attrs[key]);
        }
      },
      mutationObserver: function () {
        const parentTarget = document.querySelector('.bl_toast');

        const config = {
          childList: true,
        };
        const callback = (mutationList) => {
          const target = mutationList[0].target;
          if (!target.hasChildNodes()) target.remove();
        };
        const observer = new MutationObserver(callback);

        observer.observe(parentTarget, config);
      },
      terminateMsg: function () {
        const target = document.querySelectorAll('.bl_toast__body');

        target.forEach(function (element) {
          element.addEventListener('animationend', function (event) {
            event.target.remove();
          });
        });

        toast.core.mutationObserver();
      },
    },
    create: function (options) {
      const newOptions = Object.assign({}, toast.options, options);
      const element = document.createElement('p');

      let target = null || document.querySelector('.bl_toast');

      //에러 핸들링
      if (newOptions.msg == null) {
        throw new Error('msg의 값은 필수입니다.');
        return;
      } else if (newOptions.textAlign != 'left' && newOptions.textAlign != 'center' && newOptions.textAlign != 'right') {
        throw new Error('textAlign 값은 left, center, right 만 사용 가능합니다.');
        return;
      } else if (newOptions.direction != 'top' && newOptions.direction != 'bottom') {
        throw new Error('direction값은 top, bottom만 사용 가능합니다.');
        return;
      } else if (isNaN(newOptions.duration)) {
        throw new Error('에러: duration 값은 정수를 입력하세요.');
        return;
      }

      if (document.querySelector('.bl_toast') == null) {
        const toastWrpperElement = document.createElement('div');

        this.core.setAttribute(toastWrpperElement, {
          'aria-modal': 'false',
          'aria-hidden': 'true',
        });

        toastWrpperElement.classList.add('bl_toast', `bl_toast--${newOptions.direction}`);

        target = document.body.appendChild(toastWrpperElement);
      }

      element.classList.add('animate__animated', 'animate__flipOutX', 'bl_toast__body', `bl_toast__body--${newOptions.textAlign}`);
      element.style.animationDelay = `${newOptions.duration}ms`;

      element.innerHTML = newOptions.msg;

      this.core.setAttribute(target, {
        'aria-modal': 'true',
        'aria-hidden': 'false',
      });

      target.appendChild(element);

      this.core.terminateMsg();

      return console.table(newOptions);
    },
  };

  // 외부 호출 (개발에서 호출이 필요한 경우)
  exports.homeKvSlider = homeKvSlider;
  exports.homeRankingSlider = homeRankingSlider;
  exports.homeNewInSlider = homeNewInSlider;
  exports.homeRecommendedSlider = homeRecommendedSlider;
  exports.homeBrandIssueSlider = homeBrandIssueSlider;
  exports.homeMegazineSlider = homeMegazineSlider;
  exports.likeToggleButton = likeToggleButton;
  exports.js_topBannerClose = js_topBannerClose;
  exports.homeRankingSlider = homeRankingSlider;
  exports.modal = modal;
  exports.accordion = accordion;
  exports.summaryAccordion = summaryAccordion;
  exports.mainThumHover = mainThumHover;
  exports.mainThumHoverTabMenu = mainThumHoverTabMenu;
  exports.confirm = confirm;
  exports.pdTypeSlider = pdTypeSlider;
  exports.commonTabMenu = commonTabMenu;
  exports.datePicker = datePicker;
  exports.fileBox = fileBox;
  exports.modalLayer = modalLayer;
  exports.toast = toast;
  exports.tabs = tabs;
})(this, this.jQuery);
