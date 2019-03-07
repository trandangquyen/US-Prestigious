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
            $('body').removeClass('no-scroll');
            callback();
        })
        $('.back-home').click(function() {
            $('body').addClass('no-scroll');
            callback();
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
            $.fn.fullpage.destroy('all');         
        }
        else {
            $('body').removeClass('no-scroll');
            if ( $( 'html' ).hasClass( 'fp-enabled' ) ) {
                return;
            }
            fullPage();
        }
    }
    function clickGotoNextSection() {
        $("a.next").on("click", function (event) {
            event.preventDefault();
            var nexElm = $(this).attr('href');
            console.log(nexElm);
            console.log($(nexElm).offset().top);
            $("html,body").animate({
                scrollTop: $(nexElm).offset().top
            }, 800);
        });
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
            $("html,body").animate().stop();
            console.log('section position: '+$(this).offset().top);
            console.log('window position: '+$(window).scrollTop());
            console.log('window height: '+$(window).outerHeight( true ));
            var sectionPosition = $(this).offset().top;
            var prevElm = $(this).find('a.next').data('prev');
            if (prevElm) {
                var prevPosition = $(prevElm).offset().top || 0;
            }
            console.log('Prev position: '+prevPosition);  
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
                event.preventDefault();
                $("html,body").animate({
                    scrollTop: nextPositoin
                }, 650);
                // $(window).unbind('scroll');
            }
            else {
                if ( (windowPosition - sectionPosition)  >= 100) {
                    $("html,body").animate({
                        scrollTop: nextPositoin
                    }, 650);
                    // $("html,body").unbind('scroll');
                }
                else if ( (windowPosition - sectionPosition) <= -100) {
                    $("html,body").animate({
                        scrollTop: prevPosition
                    }, 650);
                    // $("html,body").unbind('scroll');
                }
                else {
                    $("html,body").animate({
                        scrollTop: sectionPosition
                    }, 650);
                    // $("html,body").unbind('scroll');
                }
            }           

        });
    }
    function runOwlCarousel() {
        var windowWidth = $(window).width();
        var itemMargin = 0;
        itemMargin = (windowWidth <= 480) ? 20 : 40;
        $('.offer-slider').owlCarousel({
            center: true,
            items: 1.3,
            loop: true,
            margin: itemMargin
        });
    }
    function fullPage() {
        console.log(123);
        $('#fullpage').fullpage({
            // scrollOverflow: true,
            verticalCentered: false,
            // anchors: ['our-services', 'core-value', 'our-teams', 'service-process', 'our-archive', 'success-cases'],
            navigation: false,
            afterLoad: function(anchorLink, index){
               // $('#fp-nav ul li').eq(4).hide();
                if(index  == 1){
                    $('#fp-nav').css('opacity',0);
                }
            },            
            onLeave: function(index,nextIndex, direction){
                if(index == 1){
                    $('#fp-nav').css('opacity',1);                     
                }
                if(nextIndex  == 1){
                    $('#fp-nav').css('opacity',0);
                } 
                $('.nav .mainul a').removeClass('on')
                if(nextIndex != 7){                
                    $($('.nav .mainul a')[nextIndex-1]).addClass('on')
                }
            },  
            afterRender: function(){ 
            }
        });
    }
    /* ----------------------------------------------- */
    /* ------------- FrontEnd Functions -------------- */
    /* ----------------------------------------------- */

    /* OnLoad Page */
    $(document).ready(function($) {
        runslideHomeCover();
        // clickGotoSection();
        // clickGotoNextSection();
        runOwlCarousel();
        // fullPage();
    });
})(jQuery);