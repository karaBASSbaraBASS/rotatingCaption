var TEST_IE;
var TEST_MAC;
var scrollTrigger = true;
var is_mapInit = false;

$('video').bind('ended', function(e) {
    $(this).parent().find('.play_pause').removeClass('played');
    $(this).parent().find('.play_pause').addClass('paused');
});

function playPause(button) {
    var wrapper =  button.parent();
    var video = wrapper.find('video');

    if (video[0].paused){
        $('video').each(function () {
            $(this)[0].pause();
            $(this).parent().find('.play_pause').removeClass('played');
            $(this).parent().find('.play_pause').addClass('paused');
        });
        video[0].play();
        button.removeClass('paused');
        button.addClass('played');
    } else {
        video[0].pause();
        button.addClass('paused');
        button.removeClass('played');
    }
}

$(window).on('load', function () {
    if (is_mapInit){
        map.setCenter(center);
    }
    TEST_IE = detectIE();
    TEST_MAC = navigator.platform.match(/(Mac|iPhone|iPod|iPad)/i)?true:false;
    if (TEST_IE && TEST_IE <= 15) {
        $('html').addClass('microsoft_IE IE_old IE_'+TEST_IE);
    } else if (TEST_IE && TEST_IE >= 16) {
        $('html').addClass('microsoft_IE IE_new IE_'+TEST_IE);
    }
    if (TEST_MAC) {
        $('html').addClass('macintosh');
    }
});

var lastScrollTop = 0;
$(window).scroll(function () {

    var st = $(this).scrollTop();

    if (st > $('header').outerHeight(true) + 150) {
        $('header').addClass('active_scroll');
    } else {
        $('header').removeClass('active_scroll');
    }

    var bodyC = document.body,
        htmlC = document.documentElement;

    var fullHeight = Math.max( bodyC.scrollHeight, bodyC.offsetHeight,
        htmlC.clientHeight, htmlC.scrollHeight, htmlC.offsetHeight );



    // if (st > fullHeight/3 && st > lastScrollTop) {
    //     console.log('height/3 and scroll down');
    //     $('header').addClass('hide_header');
    // } else {
    //     console.log('hide-out');
    //     $('header').removeClass('hide_header');
    // }

    lastScrollTop = st;
});


$(document).ready(function () {
    if (window.innerWidth > 1024) {
        $('.btn_rounded').hover(
            function (event) {
                $(this).css('position', 'relative').prepend('<span class="cursor_point"></span>');
                var x = event.pageX - $(this).offset().left;
                var y = event.pageY - $(this).offset().top;
                $(".cursor_point").css({top: y + 'px', left: x + 'px'});
                setTimeout(function () {
                    $(".cursor_point").addClass('active');
                }, 10);
            },
            function () {
                var that = $(this);
                $(".cursor_point").removeClass('active');
                setTimeout(function () {
                    that.css('position', '').find('.cursor_point').remove();
                }, 100);
            }
        ).mousemove(function( event ) {
            var x = event.pageX - $(this).offset().left;
            var y = event.pageY - $(this).offset().top;
            $(".cursor_point").css({top: y + 'px', left: x + 'px'});
        });
    }




    TEST_IE = detectIE();
    var timeOut = 10;
    if (TEST_IE) timeOut = 500;



    setTimeout(function () {
        $('header').css('position','fixed');
        $('main').css('margin-top', $('header').outerHeight());

    },timeOut);

    $('.half_slider-inner:not(.slick-initialized)').on('init', function () {
        $(this).find('.slick-cloned a').removeAttr('data-fancybox');
        var that = $(this);


        if (window.innerWidth > 1100 && $('.restoraunt_inner').length) {
            $(this).find('img').css('height', 'calc(100vh - ' + $('header').outerHeight() + 'px)');
        }
        if (window.innerWidth > 900 && $('.category_inner').length) {
            $(this).find('img').css('height', 'calc(100vh - ' + $('header').outerHeight() + 'px)');
        }
        objectFitIE('.slick-slide img', 'cover');
        if (TEST_IE != false) {
            setTimeout(function () {
                if (window.innerWidth > 1100 && $('.restoraunt_inner').length) {
                    that.find('img').css('height', 'calc(100vh - ' + $('header').outerHeight() + 'px)');
                }
                if (window.innerWidth > 900 && $('.category_inner').length) {
                    that.find('img').css('height', 'calc(100vh - ' + $('header').outerHeight() + 'px)');
                }
            },timeOut);
        }
    }).slick({
        speed: 200,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: '<button type="button" class="slick-prev"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 23 43"><use class="round" xlink:href="#slide_arrow"></use></svg></button>',
        nextArrow: '<button type="button" class="slick-next"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 23 43"><use class="round" xlink:href="#slide_arrow"></use></svg></button>',
        dots: false,
        arrows: true,
        responsive: [
            {
                breakpoint: 900,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    }).on('setPosition', function(event, slick){

        if (window.innerWidth > 1100 && $('.restoraunt_inner').length) {
            $(this).find('img').css('height', 'calc(100vh - ' + $('header').outerHeight() + 'px)');
        }
        if (window.innerWidth > 900 && $('.category_inner').length) {
            $(this).find('img').css('height', 'calc(100vh - ' + $('header').outerHeight() + 'px)');
        }

    }).on('beforeChange', function(event, slick, currentSlide, nextSlide){
        $('.menu_items .menu_item').eq(nextSlide).addClass('active').siblings().removeClass('active');
    });





    if ($('#article.conContent').length) {
        $('.conContent>p>img').each(function () {
            if ( $(this).attr('width') && $(this).attr('height') ) {
                $(this).css('height', $(this).attr('height')).removeAttr('height');
                $(this).css('width', $(this).attr('width')).removeAttr('width');
            }
            if ($(this).attr('width')) {
                $(this).css('height', 'auto').removeAttr('height');
                $(this).css('width', $(this).attr('width')).removeAttr('width');
            }
            if ($(this).attr('height')) {
                $(this).css('width', 'auto').removeAttr('width');
                $(this).css('height', $(this).attr('height')).removeAttr('height');
            }
        });
    }
    if ($('.home_jobs').length) {
        switchMobileBg('.home_jobs', 600);
    }
    switchMobileImg('data-mobile-img', 650);

    objectFitIE('.head_img img', 'cover');
    objectFitIE('.new_preview img', 'cover');

    if (window.innerWidth <= 900) {
        $('.head_img .absolute_breadcrumbs.bottom+h1').css('bottom', $('.head_img .absolute_breadcrumbs.bottom').outerHeight(true));
    }

    $('.open_time').textSwitcher();

    $('.btn_row.filter_tags a').click(function (e) {
        e.preventDefault();
        e.stopPropagation();
        if($(this).hasClass('active')) return false;

        var current = $(this).attr('href').slice(1);
        $(this).addClass('active').siblings().removeClass('active');
        $('[data-type-menu="'+ current +'"]').addClass('active').siblings().removeClass('active');

    });


    equalRowHeight('.news_archive .new_preview img');
    equalRowHeight('.news_archive .new_preview .small_caption');
    // equalRowHeight('.scrolled_news .new_preview .small_caption');
    equalRowHeight('.news_archive .new_preview .new_description');
    equalRowHeight('.equal_row_news');

    switchImages('.menu_item');


    var CurrentScroll = 0;


    setTimeout(function () {
        $('.absolute_breadcrumbs.bottom').css('width', $('.head_img').outerHeight() - 25);
    },200);
    $('.scrolled_news')
        .css('height', 'calc(100vh - ' +$('header').outerHeight()+ 'px)')
        .scroll(function () {
            if (window.innerWidth >= 1200){
                var NextScroll = $(this).scrollTop();
                if (NextScroll > CurrentScroll){
                    if (scrollTrigger) {
                        $('html, body').animate({ scrollTop: $('.home_news').offset().top - $('header').outerHeight()}, 150);
                        scrollTrigger = false;
                    }
                } else {
                    if (!scrollTrigger) {
                        $('html, body').animate({ scrollTop: $('.home_news').offset().top - $('header').outerHeight()}, 150);
                        scrollTrigger = true;
                    }
                }

                CurrentScroll = NextScroll;  //Updates current scroll position
            }
        });

    $('.main_block').css('height', $('header').outerHeight());
    $('.not_found_page').css('height', 'calc(100vh - ' +$('header').outerHeight()+ 'px)');
    $('.home_video').css('height', 'calc(100vh - ' +$('header').outerHeight()+ 'px)');
    // $('.restoraunt_all').css('height', 'calc(100vh - ' +headerHeight+ 'px)');
    $('.restoraunt_all').animate({
        'height': 'calc(100vh - ' +$('header').outerHeight()+ 'px)'
    }, 500, function(e) {
        map.setCenter(new google.maps.LatLng(48.23800899780855, 31.220982500000036));
        is_mapInit = true;
        var wrapperHeight = $('.restoraunt_all').outerHeight();
        var captionHeight = $('.restoraunt_all>.big_caption').outerHeight();
        var chosenHeight = $('.chosen_restoraunt').outerHeight();
        var wrapperPadding = parseInt( $('.restoraunt_all').css('padding-top') );
        var captionMargin = parseInt( $('.restoraunt_all>.big_caption').css('margin-bottom'));
        if ($('.restoraunt_inner').length) {
            if (window.innerWidth >= 900) {
                $('.restoraunt_wrapper').css('height', wrapperHeight - captionHeight - wrapperPadding-captionMargin);
            } else {
                $('.restoraunt_wrapper').css('height', '');
            }
        }
        if ($('.restoraunt_main').length) {
            if (window.innerWidth >= 900) {
                $('.restoraunt_wrapper').css('height', wrapperHeight - captionHeight - chosenHeight - wrapperPadding);
            } else {
                $('.restoraunt_wrapper').css('height', '');
            }
        }
    });
    if (TEST_IE != false) {
        setTimeout(function () {
            if (window.innerWidth > 1100 && $('.restoraunt_all').length) {
                $('.restoraunt_all').css('height', 'calc(100vh - ' + $('header').outerHeight() + 'px)');
            }
        },timeOut);
    }



    $('.head_img img').css('max-height', 'calc(100vh - ' +$('header').outerHeight()+ 'px)');


    if (window.innerWidth <= 1200) {
        $('.red_background_infoblock').css('height', '');
        $('.home_video').css('height', '');
    } else {
        $('.red_background_infoblock').css('height', 'calc(100vh - ' +$('header').outerHeight()+ 'px)');
        $('.home_video').css('height', 'calc(100vh - ' +$('header').outerHeight()+ 'px)');
    }

    if (window.innerWidth <= 900) {
        if ($('.restoraunt_inner').length) {
            $('.restoraunt_all').css('height', 'calc(100vh - ' +$('header').outerHeight()+ 'px)');
        } else {
            $('.restoraunt_all').css('height', '');
        }
    } else {
        if ($('.restoraunt_inner').length) {
            $('.restoraunt_all').css('height', 'calc(100vh - ' +$('header').outerHeight()+ 'px)');
        } else {
            $('.restoraunt_all').css('height', 'calc(100vh - ' +$('header').outerHeight()+ 'px)');
        }
    }


    $('.conContent table').wrap('<div class="content_table">');

    $('.home_slider:not(.slick-initialized)').on('init', function () {
        $(this).find('img').css({
            'height': 'calc(100vh - ' + $('header').outerHeight() + 'px)'
        });
        objectFitIE('.slick-slide img', 'cover');
        setTimeout(function () {
            $('.slick-slide.slick-current').addClass('active_slide');
        }, 10);
    }).slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: '<button type="button" class="slick-prev"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 23 43"><use class="round" xlink:href="#slide_arrow"></use></svg></button>',
        nextArrow: '<button type="button" class="slick-next"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 23 43"><use class="round" xlink:href="#slide_arrow"></use></svg></button>',
        dots: true,
        arrows: true
    }).on('beforeChange', function(event, slick, currentSlide, nextSlide){

        $(slick.$slides[currentSlide]).removeClass('active_slide');
        $(slick.$slides[nextSlide]).addClass('active_slide');
    });

    if (window.innerWidth > 767 && $('.menu_slider').length) {
        var initSlide = 0;
        if (TEST_IE) initSlide = $('.menu_slider img').length;

        $('.menu_slider:not(.slick-initialized)').on('init', function () {

            $(this).find('img').css({
                'height': 'calc(100vh - ' + $('header').outerHeight() + 'px)'
            });
            if (TEST_IE) {
                $('.menu_slider').css('opacity',0);
                setTimeout(function () {
                    objectFitIE('.slick-slide img', 'contain');
                    $('.menu_slider').slick('slickGoTo', 0);
                },100);
                setTimeout(function () {
                    $('.menu_slider').css('opacity',1);
                },300);
            }
        }).slick({
            speed: 200,
            initialSlide: initSlide,
            slidesToShow: 1,
            slidesToScroll: 1,
            prevArrow: '<button type="button" class="slick-prev"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 23 43"><use class="round" xlink:href="#slide_arrow"></use></svg></button>',
            nextArrow: '<button type="button" class="slick-next"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 23 43"><use class="round" xlink:href="#slide_arrow"></use></svg></button>',
            dots: true,
            arrows: false
        }).on('setPosition', function(event, slick){
            $(this).find('img').css('height', 'calc(100vh - ' + $('header').outerHeight() + 'px)');
        });
    }
    $('.content_gallery:not(.slick-initialized)').on('init', function () {
        $(this).find('.slick-cloned a').removeAttr('data-fancybox');
        objectFitIE('.slick-slide img', 'cover');
    }).slick({
        speed: 200,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: '<button type="button" class="slick-prev"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 23 43"><use class="round" xlink:href="#slide_arrow"></use></svg></button>',
        nextArrow: '<button type="button" class="slick-next"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 23 43"><use class="round" xlink:href="#slide_arrow"></use></svg></button>',
        dots: false,
        arrows: true
    }).on('beforeChange', function(event, slick, currentSlide, nextSlide){

    });

    if (window.innerWidth <= 1000) {
        $('.news_recently').slick({
            speed: 200,
            slidesToShow: 2,
            slidesToScroll: 1,
            prevArrow: '<button type="button" class="slick-prev"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 23 43"><use class="round" xlink:href="#slide_arrow"></use></svg></button>',
            nextArrow: '<button type="button" class="slick-next"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 23 43"><use class="round" xlink:href="#slide_arrow"></use></svg></button>',
            dots: true,
            arrows: false,
            responsive: [
                {
                    breakpoint: 550,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        });
    }



    $('.header_left .btn_burger').click(function () {
        $.fancybox.open({
            src  : '.navigation',
            type : 'inline',
            touch : false,
            opts : {
                clickContent : function( current, event ) {

                },
                touch : false,
                beforeShow : function( instance, current ) {
                    $('html').addClass('nav_fancy');
                    // instance.$refs.bg.remove();
                    $('.navigation').css('padding-top', $('header').outerHeight());
                    instance.$refs.container.addClass('fancyMenu');
                    instance.$refs.caption.remove();
                    setTimeout(function () {
                        instance.$refs.container.addClass('active');
                        if (window.innerWidth > 767){
                            $('.nav_block[data-sort-menu="3"]').css('margin-top', '-' + ($('.nav_block[data-sort-menu="2"]').outerHeight() - $('.nav_block[data-sort-menu="1"]').outerHeight()) + 'px');
                        }
                    },10);
                },
                afterShow :function () {
                  $('.navigation').addClass('active_items');
                },
                afterClose :function (instance, current) {
                    $('html').removeClass('nav_fancy');
                    $('.navigation').removeClass('active_items');
                }
            }
        });
    });

    $('.open_contact').click(function () {
        $.fancybox.open({
            src  : '.contact_page .form_wrapper',
            type : 'inline',
            opts : {
                beforeShow : function( instance, current ) {
                    $('html').addClass('form_fancy');
                    // instance.$refs.bg.remove();
                    instance.$refs.caption.remove();
                    setTimeout(function () {
                        instance.$refs.container.addClass('active');
                    },100);
                },
                afterClose :function (instance, current) {
                    $('html').removeClass('form_fancy');
                    instance.$refs.container.removeClass('active');
                }
            }
        });
    });

    $('.modal_table').click(function () {
        $.fancybox.open({
            src  : '.modal_content',
            type : 'inline',
            opts : {
                beforeShow : function( instance, current ) {
                    instance.$refs.bg.addClass('dark_bg');
                    $('html').addClass('form_fancy inner_menu');
                    instance.$refs.caption.remove();
                    setTimeout(function () {
                        instance.$refs.container.addClass('active');
                        var flexTable = $('.flex-table');
                        if (flexTable[0].scrollWidth - 30 > flexTable.innerWidth()) {
                            $('.swipe_icon').addClass('active');
                        } else {
                            $('.swipe_icon').removeClass('active');
                        }
                    },100);
                },
                afterClose :function (instance, current) {
                    $('html').removeClass('form_fancy inner_menu');
                    instance.$refs.container.removeClass('active');
                }
            }
        });
    });

    $("[data-fancybox='gallery']").click(function (e) {
        // e.preventDefault();
        // e.stopPropagation();
        // e.stopImmediatePropagation();
    }).fancybox({
        loop : true,
        animationEffect : "zoom-in-out",
        thumbs : {
            autoStart : false
        },
        buttons : [
            'zoom',
            'close'
        ],
        onInit :function (instance) {
            instance.$refs.bg.css('opacity', .9);
            instance.$refs.caption.remove();
        }
    });

    $("[data-type='iframe']").fancybox({
        thumbs : {
            autoStart : false
        },
        buttons : [
            'zoom',
            'close'
        ],
        onInit :function (instance) {
            instance.$refs.bg.css('opacity', .9);
            instance.$refs.caption.remove();
        }
    });




    vacancyAccordion();
    $('.offices_accordion').accordion({
        collapsible: true,
        icons: { "header": "icon-plus", "activeHeader": "icon-minus" },
        header: "h4",
        heightStyle: "content",
        activate:function (event, ui) {
            if (ui.newHeader.length){
                $('html, body').animate({ scrollTop: ui.newHeader.offset().top - $('header').outerHeight()}, 500);
            }
        }
    });

    $('.wrap_selector').each(function () {
        var that = $(this);
        $(this).find('.custom_select').selectmenu({
            appendTo: that,
            create: function( event, ui ) {
                if ($('.restoraunt_main').length) {
                    setTimeout(function () {
                        event.target.selectedIndex = 0;
                        $('.ui-selectmenu-text').text(event.target[0].outerText);
                    },50);
                }
            },
            change: function( event, ui ) {
                $(event.currentTarget).siblings().removeClass('activeItem');
                $(event.currentTarget).addClass('activeItem');
                var selectedResultId = ui.item.value;
                var ajaxPermission = $(this).data('ajax');

                if (ajaxPermission) {
                    var ajaxUrl = $(this).data('url');

                    $.ajax({
                        type: 'GET',
                        url: ajaxUrl,
                        data: {selectedResultId:selectedResultId},
                        success: function(data) {

                            $('#ajax_render').html('');
                            $('#ajax_render').html(data.resultData);
                            if (data.accordion) {
                                vacancyAccordion();
                                $('.vacancy_wrapper .filter_tags a').eq(0).addClass('active').siblings().removeClass('active');
                                $('.empty_career').hide();
                            }
                        }
                    });
                }
            }
        })
    });

    $('input[type="tel"]').mask(
        "+38 099 999-99-99", {
            placeholder:"+38 0__ ___-__-__",
            autoclear: false
        }
    );

    var defaultPlaceholder = '';
    $('label.file_input').click(function () {
        defaultPlaceholder = $("b.file_name").text();
    });
    $(".file_input input[type=\"file\"]").change(function () {
        var filename = $(this).val().replace(/^.*[\\\/]/, '');
        $('b.file_name').text(filename);
        if ($(this).val() == "") {
            $('b.file_name').text(defaultPlaceholder);
        }
    });



    $('.mobile_filter_caption').click(function () {
        scrollToElem(this, $('header').outerHeight());
        $(this).parent().toggleClass('active_tags');
    });

    $(document).mouseup(function(e)
    {
        var container = $(".filter_tags, .mobile_filter_caption");
        if (!container.is(e.target) && container.has(e.target).length === 0) {
            container.parent().removeClass('active_tags');
        }
    });




    $(window).resize(function () {
        setTimeout(function () {
            $('.absolute_breadcrumbs.bottom').css('width', $('.head_img').outerHeight() - 25);
        },100);

        var headerHeight = $('header').outerHeight();
        var halfSlider = $('.half_slider-inner');
        $('main').css('margin-top', headerHeight);
        $('.home_slider').find('img').css('height', 'calc(100vh - ' + headerHeight + 'px)');
        $('.scrolled_news').css('height', 'calc(100vh - ' +headerHeight+ 'px)');
        $('.navigation').css('padding-top', headerHeight);
        $('.main_block').css('height', headerHeight);
        $('.head_img img').css('max-height', 'calc(100vh - ' +headerHeight+ 'px)');
        $('.not_found_page').css('height', 'calc(100vh - ' +headerHeight+ 'px)');
        equalRowHeight('.news_archive .new_preview img');
        equalRowHeight('.news_archive .new_preview .small_caption');
        equalRowHeight('.news_archive .new_preview .new_description');
        var wrapperHeight = $('.restoraunt_all').outerHeight();
        var captionHeight = $('.restoraunt_all>.big_caption').outerHeight();
        var chosenHeight = $('.chosen_restoraunt').outerHeight();
        var wrapperPadding = parseInt( $('.restoraunt_all').css('padding-top') );
        var captionMargin = parseInt( $('.restoraunt_all>.big_caption').css('margin-bottom'));
        if ($('.restoraunt_inner').length) {
            if (window.innerWidth >= 900) {
                $('.restoraunt_wrapper').css('height', wrapperHeight - captionHeight - wrapperPadding-captionMargin);
            } else {
                $('.restoraunt_wrapper').css('height', '');
            }
        }
        if ($('.restoraunt_main').length) {
            if (window.innerWidth >= 900) {
                $('.restoraunt_wrapper').css('height', wrapperHeight - captionHeight - chosenHeight - wrapperPadding);
            } else {
                $('.restoraunt_wrapper').css('height', '');
            }

        }
        if ($('.restoraunt_inner').length) {
            if (window.innerWidth >= 900) {
                $('.restoraunt_wrapper').css('height', wrapperHeight - captionHeight - wrapperPadding-captionMargin);
            } else {
                $('.restoraunt_wrapper').css('height', '');
            }
        }

        if (window.innerWidth <= 1200) {
            $('.red_background_infoblock').css('height', '');
            $('.home_video').css('height', '');
        } else {
            $('.red_background_infoblock').css('height', 'calc(100vh - ' +headerHeight+ 'px)');
            $('.home_video').css('height', 'calc(100vh - ' +headerHeight+ 'px)');
        }

        if (window.innerWidth <= 900) {
            if ($('.restoraunt_inner').length) {
                $('.restoraunt_all').css('height', 'calc(100vh - ' +headerHeight+ 'px)');
            } else {
                $('.restoraunt_all').css('height', '');
            }
        } else {
            if ($('.restoraunt_inner').length) {
                $('.restoraunt_all').css('height', 'calc(100vh - ' +headerHeight+ 'px)');
            } else {
                $('.restoraunt_all').css('height', 'calc(100vh - ' +headerHeight+ 'px)');
            }
        }

        if (window.innerWidth <= 1000) {
            if (!$('.news_recently').hasClass('slick-initialized')) {
                $('.news_recently:not(.slick-initialized)').slick({
                    speed: 200,
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    prevArrow: '<button type="button" class="slick-prev"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 23 43"><use class="round" xlink:href="#slide_arrow"></use></svg></button>',
                    nextArrow: '<button type="button" class="slick-next"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 23 43"><use class="round" xlink:href="#slide_arrow"></use></svg></button>',
                    dots: true,
                    arrows: false,
                    responsive: [
                        {
                            breakpoint: 550,
                            settings: {
                                slidesToShow: 1,
                                slidesToScroll: 1
                            }
                        }
                    ]
                });
            }
        } else {
            if ($('.news_recently').hasClass('slick-initialized')) {
                $('.news_recently').slick('unslick');
            }
        }

        if (window.innerWidth <= 900) {
            $('.head_img .absolute_breadcrumbs.bottom+h1').css('bottom', $('.head_img .absolute_breadcrumbs.bottom').outerHeight(true));
            halfSlider.find('img').css('height', '');
            if (halfSlider.hasClass('slick-initialized') && !$('.restoraunt_inner').length) {
                halfSlider.slick('unslick');
            }

        } else {
            $('.head_img .absolute_breadcrumbs.bottom+h1').css('bottom', '');
            if (!halfSlider.hasClass('slick-initialized')) {
                halfSlider.on('init', function () {
                    $(this).find('img').css('height', 'calc(100vh - ' + headerHeight + 'px)');
                }).slick({
                    speed: 200,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    prevArrow: '<button type="button" class="slick-prev"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 23 43"><use class="round" xlink:href="#slide_arrow"></use></svg></button>',
                    nextArrow: '<button type="button" class="slick-next"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 23 43"><use class="round" xlink:href="#slide_arrow"></use></svg></button>',
                    dots: false,
                    arrows: true,
                    responsive: [
                        {
                            breakpoint: 900,
                            settings: {
                                slidesToShow: 1,
                                slidesToScroll: 1
                            }
                        }
                    ]
                }).on('setPosition', function(event, slick){
                    $(this).find('img').css('height', 'calc(100vh - ' + $('header').outerHeight() + 'px)');
                });
            }
        }



        if (window.innerWidth <= 767) {
            $('.contact_page .form_wrapper').hide();
            $('.nav_block[data-sort-menu="3"]').css('margin-top','');
            if ($('.menu_slider').hasClass('slick-initialized')) {
                $('.menu_slider').slick('unslick');
            }
        } else {
            $('.contact_page .form_wrapper').show();
            $('.nav_block[data-sort-menu="3"]').css('margin-top', '-' + ($('.nav_block[data-sort-menu="2"]').outerHeight() - $('.nav_block[data-sort-menu="1"]').outerHeight()) + 'px');

            if (!$('.menu_slider').hasClass('slick-initialized')) {
                $('.menu_slider:not(.slick-initialized)').on('init', function () {
                    $(this).find('img').css('height', 'calc(100vh - ' + $('header').outerHeight() + 'px)');
                }).slick({
                    speed: 200,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    prevArrow: '<button type="button" class="slick-prev"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 23 43"><use class="round" xlink:href="#slide_arrow"></use></svg></button>',
                    nextArrow: '<button type="button" class="slick-next"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 23 43"><use class="round" xlink:href="#slide_arrow"></use></svg></button>',
                    dots: true,
                    arrows: false
                }).on('setPosition', function(event, slick){
                    $(this).find('img').css('height', 'calc(100vh - ' + $('header').outerHeight() + 'px)');
                });
            }
        }
        setTimeout(function () {
            var flexTable = $('.flex-table');
            if (flexTable.length) {
                if (flexTable[0].scrollWidth - 30 > flexTable.innerWidth()) {
                    $('.swipe_icon').addClass('active');
                } else {
                    $('.swipe_icon').removeClass('active');
                }
            }
        },100);
    });

    
    /* menu > dish > selection slide */
    $('.dish_slide').on('click', function (event) {
        event.preventDefault();

        console.log("dish cliked");

        var 
            $this = $(this),
            dishesList = $('.menu_items').find($('.dish_slide')),
            slideIndex = dishesList.index( $(this) ) ;

        $('.slick-slider').slick('slickGoTo', slideIndex );
    });
    /* menu > dish > selection slide end */



    /* menu > dish > calory caption */
    // bendText();

    // function bendText() {
        
    //     var canv = document.getElementById('canvas');
    //     var ctx = canv.getContext('2d'); 
    //     var bPlay = false;
    //     var iAngle = 0;
    //     var sText = "Харчова цінність страви";

    //     // Функции рисования
    //     function clear() { // Очистка элемента canvas
    //         ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    //     }

    //     function drawScene() { // Основная функция вывода сцены
    //         if (bPlay == 1) {
    //             clear(); // Очистка элемента canvas

    //             // Заполняем фон
    //             ctx.fillStyle = '#d7e8f1';
    //             ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    //             // Меняем угол
    //             iAngle+=0.005;

    //             // и выводим текст по кругу с радиусом 200 в центре элемента canvas
    //             draw3DTextCircle(sText, canvas.width / 2, canvas.height / 2, 200, Math.PI / 2 - iAngle);
    //         }
    //     }

    //     function draw3DTextCircle(s, x, y, radius, iSAngle){

    //         // Радиан на символ
    //         var fRadPerLetter = 2*Math.PI / s.length;

    //         // Сохраняем контекст, переводим и вращаем его
    //         ctx.save();
    //         ctx.translate(x,y);
    //         ctx.rotate(iSAngle);

    //         // Количество дополнительных нижних слоев
    //         var iDepth = 4;

    //         // Устанавливаем темно-зеленый цвет для дополнительных слоев
    //         ctx.fillStyle = '#168d1e';

    //         // Обрабоатываем каждый символ строки
    //         for (var i=0; i<s.length; i++) {
    //             ctx.save();
    //             ctx.rotate(i*fRadPerLetter);

    //             // Выводим дополнительные слои
    //             for (var n = 0; n < iDepth; n++) {
    //                 ctx.fillText(s[i], n, n - radius);
    //             }

    //             // Параметры тени
    //             ctx.fillStyle = '#00d50f';
    //             ctx.shadowColor = 'black';
    //             ctx.shadowBlur = 10;
    //             ctx.shadowOffsetX = iDepth + 2;
    //             ctx.shadowOffsetY = iDepth + 2;

    //             // выводим символы
    //             ctx.fillText(s[i], 0, -radius);
    //             ctx.restore();
    //        }
    //        ctx.restore();
    //     }

    //     // Привязываем событие onload
    //     if (window.attachEvent) {
    //         window.attachEvent('onload', main_init);
    //     } else {
    //         if(window.onload) {
    //             var curronload = window.onload;
    //             var newonload = function() {
    //                 curronload();
    //                 main_init();
    //             };
    //             window.onload = newonload;
    //         } else {
    //             window.onload = main_init;
    //         }
    //     }

    //     function main_init() {


    //         // Инициализуем строку текста
    //         ctx.font = '64px Verdana';
    //         ctx.textAlign = 'center';
    //         ctx.textBaseline = 'middle';

    //         // Заполняем фон
    //         ctx.fillStyle = '#d7e8f1';
    //         ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    //         // Выводим текст по кругу с радуисом 200 по центру элемента canvas
    //         draw3DTextCircle(sText, canvas.width / 2, canvas.height / 2, 200, Math.PI / 2 - iAngle);

    //         setInterval(drawScene, 40); // Выводим сцену
    //     }
    //     /* menu > dish > calory caption end */



    
    // }
});

/* menu > dish > calory caption */
    $.fn.circleType = function(options) {

        var settings = {
            dir: 1,
            position: 'relative'
        };
        if (typeof($.fn.lettering) !== 'function') {
            console.log('Lettering.js is required');
            return;
        }
        return this.each(function () {
        
            if (options) { 
                $.extend(settings, options);
            }
            var elem = this, 
                delta = (180 / Math.PI),
                ch = parseInt($(elem).css('line-height'), 10),
                fs = parseInt($(elem).css('font-size'), 10),
                txt = elem.innerHTML.replace(/^\s+|\s+$/g, '').replace(/\s/g, '&nbsp;'),
                letters, 
                center;
            
            elem.innerHTML = txt
            $(elem).lettering();

            elem.style.position =  settings.position;

            letters = elem.getElementsByTagName('span');
            center = Math.floor(letters.length / 2)
                    
            var layout = function () {
                var tw = 0, 
                    i,
                    offset = 0,
                    minRadius, 
                    origin, 
                    innerRadius,
                    l, style, r, transform;
                                                    
                for (i = 0; i < letters.length; i++) {
                    tw += letters[i].offsetWidth;
                }
                minRadius = (tw / Math.PI) / 2 + ch;
                
                if (settings.fluid && !settings.fitText) {
                    settings.radius = Math.max(elem.offsetWidth / 2, minRadius);
                }    
                else if (!settings.radius) {
                    settings.radius = minRadius;
                }   
                
                if (settings.dir === -1) {
                    origin = 'center ' + (-settings.radius + ch) / fs + 'em';
                } else {
                    origin = 'center ' + settings.radius / fs + 'em';
                }

                innerRadius = settings.radius - ch;
                    
                for (i = 0; i < letters.length; i++) {
                    l = letters[i];
                    offset += l.offsetWidth / 2 / innerRadius * delta;
                    l.rot = offset;                      
                    offset += l.offsetWidth / 2 / innerRadius * delta;
                }   
                for (i = 0; i < letters.length; i++) {
                    l = letters[i]
                    style = l.style
                    r = (-offset * settings.dir / 2) + l.rot * settings.dir            
                    transform = 'rotate(' + r + 'deg)';
                        
                    style.position = 'absolute';
                    style.left = '50%';
                    style.marginLeft = -(l.offsetWidth / 2) / fs + 'em';

                    style.webkitTransform = transform;
                    style.MozTransform = transform;
                    style.OTransform = transform;
                    style.msTransform = transform;
                    style.transform = transform;

                    style.webkitTransformOrigin = origin;
                    style.MozTransformOrigin = origin;
                    style.OTransformOrigin = origin;
                    style.msTransformOrigin = origin;
                    style.transformOrigin = origin;
                    if(settings.dir === -1) {
                        style.bottom = 0;
                    }
                }
                
                if (settings.fitText) {
                    if (typeof($.fn.fitText) !== 'function') {
                        console.log('FitText.js is required when using the fitText option');
                    } else {
                        $(elem).fitText();
                        $(window).resize(function () {
                            updateHeight();
                        });
                    }
                }    
                updateHeight();
            };
            
            var getBounds = function (elem) {
                var docElem = document.documentElement,
                    box = elem.getBoundingClientRect();
                return {
                    top: box.top + window.pageYOffset - docElem.clientTop,
                    left: box.left + window.pageXOffset - docElem.clientLeft,
                    height: box.height
                };
            };        
            
            var updateHeight = function () {
                var mid = getBounds(letters[center]),
                    first = getBounds(letters[0]),
                    h;
                if (mid.top < first.top) {
                    h = first.top - mid.top + first.height;
                } else {
                    h = mid.top - first.top + first.height;
                }
                elem.style.height = h + 'px';  
            }

            if (settings.fluid && !settings.fitText) {
                $(window).resize(function () {
                    layout();
                });
            }    

            if (document.readyState !== "complete") {
                elem.style.visibility = 'hidden';
                $(window).on('load', function () {
                    elem.style.visibility = 'visible';
                    layout();
                });
            } else {
                layout();
            }
        });
    };



    $('#curvedCalloryTip').circleType({
        position: 'absolute',
        dir: 1,
        radius: 55
    });

    $('#curvedCalloryTipSmall').circleType({
        position: 'absolute',
        dir: 1,
        radius: 55
    });

    


    /* menu > dish > calory caption end */

