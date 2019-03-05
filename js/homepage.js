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
        $("a.next").on("click", function (event) {
            console.log($(this.hash).offset().top);
            event.preventDefault();
            $("html,body").animate({
                scrollTop: $(this.hash).offset().top
            }, 800);
        });
    }
    $("section").swipe( {
      swipeUp:function(event, direction, distance, duration) {
        console.log("You swiped " + direction);;
        var positonScrollTo = $(this).find('a.next').hash;
        console.log (positonScrollTo);
      },
      swipeDown:function(event, direction, distance, duration) {
        console.log("You swiped " + direction) 
      }
    });
    /* ----------------------------------------------- */
    /* ------------- FrontEnd Functions -------------- */
    /* ----------------------------------------------- */

    /* OnLoad Page */
    $(document).ready(function($) {
        runslideHomeCover();
        clickGotoSection();
    });
})(jQuery);