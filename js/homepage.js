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
        itemMargin = (windowWidth <= 480) ? 20 : 40;
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
            anchors: ['our-services', 'core-value', 'our-teams', 'service-process', 'our-archive', 'success-cases','examples','contact'],
            navigation: false,
            afterLoad: function(anchorLink, index){
            },            
            onLeave: function(index,nextIndex, direction){
            },  
            afterRender: function(){ 
            }  
        });
    }
    //adding the action to the button on the home page
    function moveToNextSlide() {
        $(document).on('click', '#moveTo', function(){
          $.fn.fullpage.moveTo('our-services', 1);
        });
    }
    function getJsonTutorData() {
        $(".quantum li").click(function(){
            var items = [];
            var elementIndex = $(this).index();
            var elementBeginLoop = $(this).index()*10;
            console.log(elementIndex);
            var elementEndLoop = elementIndex*10+9;
            console.log(elementEndLoop);
            $.getJSON("ajax/tutor.js", function(result){
                var arrLength = result.tutors.length
                console.log(arrLength) 
                elementEndLoop = (elementEndLoop <= arrLength) ? elementEndLoop : arrLength-1;
                console.log(elementEndLoop) 
                for (var i = elementBeginLoop; i <= elementEndLoop ; i++) {
                    console.log(result.tutors[i]);
                    console.log(result.tutors[i].name);
                    items.push("<div class='tt-item'><a class='tt-avatar' href=''><img src='images/mem-image34.png' alt=''></a><div class='tt-head-info'><h3 class='name'>"+result.tutors[i].name+"</h3><div class='level'>普林斯顿大学，芝加哥大学</div></div><div class='tt-main-info'><p>Colin导师非常热衷于帮助别人发掘他们的真正潜力，不管是大学申请还是其他方面。在普林斯顿大学修读人类学专业后，他在先后在纽约和中国工作和生活。Colin导师在一来到中国时是为一家非营利性组织工作，在中国云南一处偏远的地区支教。在这之后，他来到了北京并担任国内某大型留学机构的美国高端留学部外方总经理，帮助中国学生实现美国留学的梦想。在2016年，Colin回到美国赴芝加哥大学攻读MBA学位。在这期间，Colin同时为日本的乐天公司工作，在新产品发展部门负责新产品的市场进入策略工作，负责两个新产品线的全球扩展策略的计划和实施。在纽约，他的工作是管理咨询为世界500强的制药公司提供策略过程，系统和决策方面的咨询服务。</p><p>申请指导也和工作有异曲同工之处，Colin导师能申请者真诚讲述他们的亲身经历时发现他们的优势。多年的工作经验中，他得出的经验是无论背景如何，申请者只有专注于他们自己的故事，价值和经历，而非发空心思猜测招生委员会的喜好，才能成功。</p><p>闲暇时，Colin导师则喜欢健身，撸猫和开发新菜式，甜点等。</p></div></div>");

                    $.each(result.tutors[i], function(i, field){
                        // items.push("<div class='tt-item'><a class='tt-avatar' href=''><img src='images/mem-image34.png' alt=''></a><div class='tt-head-info'><h3 class='name'>"++"</h3><div class='level'>普林斯顿大学，芝加哥大学</div></div><div class='tt-main-info'><p>Colin导师非常热衷于帮助别人发掘他们的真正潜力，不管是大学申请还是其他方面。在普林斯顿大学修读人类学专业后，他在先后在纽约和中国工作和生活。Colin导师在一来到中国时是为一家非营利性组织工作，在中国云南一处偏远的地区支教。在这之后，他来到了北京并担任国内某大型留学机构的美国高端留学部外方总经理，帮助中国学生实现美国留学的梦想。在2016年，Colin回到美国赴芝加哥大学攻读MBA学位。在这期间，Colin同时为日本的乐天公司工作，在新产品发展部门负责新产品的市场进入策略工作，负责两个新产品线的全球扩展策略的计划和实施。在纽约，他的工作是管理咨询为世界500强的制药公司提供策略过程，系统和决策方面的咨询服务。</p><p>申请指导也和工作有异曲同工之处，Colin导师能申请者真诚讲述他们的亲身经历时发现他们的优势。多年的工作经验中，他得出的经验是无论背景如何，申请者只有专注于他们自己的故事，价值和经历，而非发空心思猜测招生委员会的喜好，才能成功。</p><p>闲暇时，Colin导师则喜欢健身，撸猫和开发新菜式，甜点等。</p></div></div>");
                        // console.log(i + "vs" + field[0])
                        // $(".tt-details-wrap").append(field + " ");
                    });
                }
                $(items.join("")).appendTo($(".tt-details-wrap"));
                
            });
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
        moveToNextSlide();
        getJsonTutorData();
    });
})(jQuery);