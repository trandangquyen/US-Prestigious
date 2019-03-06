(function($) {
    $( document ).on( "mobileinit", function() {
        $.mobile.loading().hide();
        $.mobile.ajaxEnabled = false;
        $.mobile.hideUrlBar = false;
        $.mobile.page.prototype.options.keepNative = "select, textarea";
        // $.mobile.autoInitializePage = false;
    });
    function runslideHomeCover() {
        $('.cover-carousel').owlCarousel({
            loop:false,
            margin:10,
            nav:false,
            dots: false,
            responsive:{
                0:{
                    items:1
                },
                600:{
                    items:1
                },
                1000:{
                    items:1
                }
            },
            onDragged: callback
        })
        $('.next-cont').click(function() {
            $('.owl-carousel').trigger('next.owl.carousel');
        })
        $('.cv-content').owlCarousel({
            loop:false,
            margin:10,
            nav:false,
            responsive:{
                0:{
                    items:1
                },
                600:{
                    items:1
                },
                1000:{
                    items:1
                }
            }
        })
    }
    function callback(event) {
        if ($('.cover-carousel .owl-item:first-child').hasClass('active')) {
            $('body').addClass('no-scroll');
        }
        else {
            $('body').removeClass('no-scroll');
        }
    }
    function clickGotoSection() {
        /* ------- Smooth scroll ------- */
        // $("a.next").on("click", function (event) {
        //     // console.log($(this.hash).offset().top);
        //     event.preventDefault();
        //     $("html,body").animate({
        //         scrollTop: $(this.hash).offset().top
        //     }, 800);
        // });
        // $(window).scroll(function() {
        //     clearTimeout($.data(this, 'scrollTimer'));
        //     $.data(this, 'scrollTimer', setTimeout(function() {
        //         // do something
        //         console.log("Haven't scrolled in 250ms!");
        //     }, 250));
        // });
        $('section').on('touchend', function(event) {
            // event.stopImmediatePropagation();
            console.log('section position: '+$(this).offset().top);
            console.log('window position: '+$(window).scrollTop());
            console.log('window height: '+$(window).outerHeight( true ));
            var sectionPosition = $(this).offset().top;
            var prevElm = $(this).find('a.next').data('prev');
            if (prevElm) {
                var prevPosition = $(prevElm).offset().top || 0;
            }
            var nexElm = $(this).find('a.next').attr('href');
            console.log(nexElm);
            if (nexElm) {
                var nextPositoin = $(nexElm).offset().top || 0;
            }
            console.log('next position: '+nextPositoin);       
            var windowPosition = $(window).scrollTop();
            var windowHeight = $(window).outerHeight( true );
            var id = event.target;
            console.log(id);
            console.log(id.offsetParent.id);
            if ($(id).is('.chevron') || $(id).parent().is('.next') ) {
                console.log('21890');
                event.preventDefault();
                $("html,body").animate({
                    scrollTop: nextPositoin
                }, 800);
            }
            else {
                if ( (windowPosition - sectionPosition)  >= windowHeight/5) {
                    $("html,body").animate({
                        scrollTop: nextPositoin
                    }, 800);
                }
                else if ( (windowPosition - sectionPosition) <= -windowHeight/5) {
                    $("html,body").animate({
                        scrollTop: prevPosition
                    }, 800);
                }
                else {
                    $("html,body").animate({
                        scrollTop: sectionPosition
                    }, 800);
                }
            }           

        });
    }
    // $(document).scroll(function(){
    //     console.log($(window).scrollTop());

    // });
    /* ----------------------------------------------- */
    /* ------------- FrontEnd Functions -------------- */
    /* ----------------------------------------------- */

    /* OnLoad Page */
    $(document).ready(function($) {
        runslideHomeCover();
        clickGotoSection();
    });
})(jQuery);