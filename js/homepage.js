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
    function clickGotoSection() {
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
            }
            else {
                if ( (windowPosition - sectionPosition)  >= 100) {
                    $("html,body").animate({
                        scrollTop: nextPositoin
                    }, 650);
                }
                else if ( (windowPosition - sectionPosition) <= -100) {
                    $("html,body").animate({
                        scrollTop: prevPosition
                    }, 650);
                }
                else {
                    $("html,body").animate({
                        scrollTop: sectionPosition
                    }, 650);
                }
            }           

        });
    }
    function runOwlCarousel() {
        var windowWidth = $(window).width();
        var itemMargin = 0;
        itemMargin = (windowWidth <= 480) ? 10 : 20;
        $('.offer-slider').owlCarousel({
            center: true,
            items: 1.3,
            loop: true,
            margin: itemMargin
        });
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
        });
        $('.tutor-carousel').owlCarousel({
            loop:false,
            margin:0,
            nav:false,
            dots: false,
            responsive:{
                0:{
                    items:2
                },
                600:{
                    items:2
                },
                1000:{
                    items:2
                }
            }
        });
        $('.offer-carousel').owlCarousel({
            loop:false,
            margin:10,
            nav:true,
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
            }
        });
    }
    function fullPage() {
        $('#fullpage').fullpage({
            // scrollOverflow: true,
            scrollBar:true,
            touchSensitivity: 15,
            verticalCentered: false,
            fitToSectionDelay: 300,
            anchors: ['home-cover','our-services', 'core-value', 'our-teams', 'service-process', 'our-archive', 'success-cases','examples','contact'],
            navigation: false 
        });        
    }
    function getJsonTutorData() {
        var items = [];
        var elementBeginLoop = 0;
        var elementEndLoop = 9;
        $.getJSON("ajax/tutor.js", function(result){
            var arrLength = result.tutors.length
            elementEndLoop = (elementEndLoop <= arrLength) ? elementEndLoop : arrLength-1;
            for (var i = elementBeginLoop; i <= elementEndLoop ; i++) {
                items.push("<div class='tt-item'>"+
                    "<a class='tt-avatar' href=''><img src='"+result.tutors[i].avatar+"' alt=''></a>"+
                    "<div class='tt-head-info'><h3 class='name'>"+result.tutors[i].name+
                    "</h3><div class='level'>"+result.tutors[i].level+"</div></div>"+
                    "<div class='tt-main-info'>"+
                    result.tutors[i].info+
                    "</div></div>");
            }
            $(".tt-details-wrap").html($(items.join("")));
        });
        $(".quantum li").click(function(){
            var items = [];
            var elementIndex = $(this).index();
            var elementBeginLoop = $(this).index()*10;
            var elementEndLoop = elementIndex*10+9;
            $(this).addClass('active').siblings().removeClass('active');
            $.getJSON("ajax/tutor.js", function(result){
                var arrLength = result.tutors.length
                elementEndLoop = (elementEndLoop <= arrLength) ? elementEndLoop : arrLength-1;
                for (var i = elementBeginLoop; i <= elementEndLoop ; i++) {
                    items.push("<div class='tt-item'>"+
                        "<a class='tt-avatar' href=''><img src='"+result.tutors[i].avatar+"' alt=''></a>"+
                        "<div class='tt-head-info'><h3 class='name'>"+result.tutors[i].name+
                        "</h3><div class='level'>"+result.tutors[i].level+"</div></div>"+
                        "<div class='tt-main-info'>"+
                        result.tutors[i].info+
                        "</div></div>");
                }
                // $(items.join("")).appendTo($(".tt-details-wrap"));
                $(".tt-details-wrap").html($(items.join("")));
                
            });
        });
    }
    function swipeToChangeUrl() {
        $("#std-success1").swipe( {
            //Generic swipe handler for all directions
            swipeRight:function(event, distance, duration, fingerCount, fingerData, currentDirection) {
                window.location.href = 'success-dt1.html';
            },
        });
        $("#std-success2").swipe( {
            //Generic swipe handler for all directions
            swipeRight:function(event, distance, duration, fingerCount, fingerData, currentDirection) {
                window.location.href = 'success-dt2.html';
            },
        });
        $('.back-home').click(function(event) {
            event.preventDefault();
            window.history.back();
        });
    }
    /* ----------------------------------------------- */
    /* ------------- FrontEnd Functions -------------- */
    /* ----------------------------------------------- */

    /* OnLoad Page */
    $(document).ready(function($) {
        // runslideHomeCover();
        // clickGotoSection();
        runOwlCarousel();
        fullPage();
        getJsonTutorData();
        swipeToChangeUrl();
    });
})(jQuery);