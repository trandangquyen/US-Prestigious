(function($) {
    $( document ).on( "mobileinit", function() {
        $.mobile.loading().hide();
        $.mobile.ajaxEnabled = false;
        $.mobile.hideUrlBar = false;
        $.mobile.page.prototype.options.keepNative = "select, textarea";
        // $.mobile.autoInitializePage = false;
    });
    function runSlider(){
         $('.flexslider').flexslider({
            animation: "slide",
            controlNav: "thumbnails"
          });
    }
    function runCarousel() {
        var imgWidth = 0 ;
        var imgHeight = 0 ;
        var crHeight = 0 ;
        var imgMargin = 0 ;
        var windowWidth = $(window).width();
        if ( windowWidth <= 320) {
            imgWidth = 250;imgHeight = 200; crHeight = 200;imgMargin = 0.2;
        }
        else if (windowWidth <= 600) {
            imgWidth = 280;imgHeight = 230; crHeight = 280;imgMargin = 0.25;
        }
        else {
            imgWidth = 540;imgHeight = 405; crHeight = 550;imgMargin = 0.3;
        }

        $('.carousel').carousel({
            hAlign: 'left',
            hMargin: imgMargin,
            frontWidth: imgWidth,
            frontHeight: imgHeight,
            carouselWidth: 600,
            carouselHeight: crHeight,
            left: 0,
            shadow: false,
            buttonNav: 'none',
            directionNav: true,
            slidesPerScroll: 3
        });
    }
    function runOwlCarousel() {
        var windowWidth = $(window).width();
        var itemMargin = 0;
        itemMargin = (windowWidth <= 480) ? 20 : 40;
        $('.tutor-slider,.std-slider,.offer-slider').owlCarousel({
            center: true,
            items: 1.3,
            loop: true,
            margin: itemMargin,
            onDragged: callback
        });
    }
    function callback(event) {
        $('.owl-item .collapse').removeClass('collapse');
        $('.owl-item .view-more.active').removeClass('active').text('展开');
    }
    function addClassActiveTab() {
        $('.elite-tabs li').click(function(event) {
            if($(this).index() == 1) {
                $(this).siblings().addClass('no-split')
            }
            else {
                 $(this).removeClass('no-split');
                 $(this).siblings().removeClass('no-split');
            }
        });
    }
    function windowResize(){
        $(window).resize(function(){
            setTimeout(function(){ 
                location.reload();
            }, 500);            
        });
    }
    function expandTutorProfile(){
        $('.tt-item .view-more').click(function(event) {
            event.preventDefault();
            $(this).toggleClass('active');
            $(this).parent().siblings('.tt-profile').toggleClass('collapse');
        });
    }
    function hoverCircleActive(){
        $(".puls-circle .text").mouseenter(function(){
            $(this).parent().addClass('active');  
        });
        $(".puls-circle .text").mouseleave(function(){
            $(this).parent().removeClass('active');  
        });
    }
    function changeTextExpand() {
        var currentText ='展开';
        $('.tt-footer .view-more').click(function(event) {
            event.preventDefault();
            $(this).toggleClass('expand');
            if($(this).hasClass('expand')){
                $(this).text('收起');
            }
            else{
                $(this).text(currentText);
            }
        });
    }
    function randomShowText() {
        setInterval(function(){
            var random = Math.floor(Math.random()*12);
            $(".puls-circle").eq(random).addClass('active').siblings().removeClass('active'); 
        }, 2000);
    }
    /* ----------------------------------------------- */
    /* ------------- FrontEnd Functions -------------- */
    /* ----------------------------------------------- */

    /* OnLoad Page */
    $(document).ready(function($) {
        // runSlider();
        runCarousel();
        runOwlCarousel();
        addClassActiveTab();
        // windowResize();
        expandTutorProfile();
        hoverCircleActive();
        changeTextExpand();
        randomShowText();
        setTimeout(function(){ 
           $('section.part-2 .tt-item .tt-profile').css({
               'max-height': '245px'
           });
           $('section.success .std-item .std-profile').css({
               'max-height': '143px'
           });
        }, 100);

    });
})(jQuery);