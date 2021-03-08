$(function(){
    var peopleList = $('.people_list'),
        people = $('.people'),
        peopleLen = people.length,
        cultureImgList = $('.culture_img_list')
        cultureImg = $('.culture_img');
        cultureImgLen = cultureImg.length,
        cultureImgPercent = 56;

    (function(){
        $('.count').each(function(){
            var result = $(this).data("rate");

            var $count = $(this);
            var resultArray = String(result).split('');
        
            $.each(resultArray, function(i, v) {
                var $ol = $('<ol/>');
                var num = Number(v);
                var arr = [];

                arr = arr.concat(Array.from(Array(num + 1).keys()));
            

            $.each(arr, function(i, v) {
                $('<li/>', {
                    text: v,
                    appendTo: $ol,
                    addClass: "value"
                });
            });

            $ol
                .appendTo($count)
            });
        });
        people.css("max-width",$(window).width());
        peopleList.css("width", people.width() * (peopleLen + 2) + 1);

        var firstChild = people[0],
            lastChild = people[peopleLen-1],
            clonedFirst = firstChild.cloneNode(true),
            clonedLast = lastChild.cloneNode(true);
        
        peopleList.append(clonedFirst);
        peopleList.prepend(clonedLast);
        
        cultureImgList.css("width", cultureImgPercent * (cultureImgLen + 3) + "%");
        cultureImg.css("width", "calc(100% /" + (cultureImgLen + 3) + ")");

        firstChild = cultureImg[0],
        lastChild = cultureImg[cultureImgLen-1],
        clonedFirst = firstChild.cloneNode(true),
        clonedLast = lastChild.cloneNode(true);

        var secondChild = cultureImg[1];

        cloneSecond = secondChild.cloneNode(true);

        cultureImgList.append(clonedFirst);
        cultureImgList.append(cloneSecond);
        cultureImgList.prepend(clonedLast);

        imgChange();
    }());
    $('.main_title a').on("click",function(e){
        e.preventDefault();
        window.scroll({
            behavior: 'smooth',
            top: $('#banksalad_growth').offset().top -100
        });
    })

    var executed = false;

    $(window).scroll(function(){
        if($(window).scrollTop() > 0){
            $('header').addClass('scroll');
            $("#logoImg").attr("src", 'images/logo_scroll.svg');
        } else{
            $('header').removeClass('scroll');
            $("#logoImg").attr("src", 'images/logo.svg');
        }

        $('.count').each(function(){
            var countThreshold = $(this).offset().top - 550;
            if($(window).scrollTop() >= countThreshold){
                $(this).children('ol').addClass('run');
            }
        })
        
        
        $('h2').each(function(){
            var h2Threshold = $(this).offset().top - 800;
            if($(window).scrollTop() >= h2Threshold){
                $(this).addClass('up');
            }
        });

        $('.banksalad_growth_title p').each(function(){
            var pThreshold = $(this).offset().top - 800;
            if($(window).scrollTop() >= pThreshold){
                $(this).addClass('up');
            }
        })

        $('.banksalad_growth_title span').each(function(){
            var spanThreshold = $(this).offset().top - 800;
            if($(window).scrollTop() >= spanThreshold){
                $(this).addClass('up');
            }
        })

        var circleThreshold = $('.dl_graph').offset().top - 800;
        
        if(!executed) {
            if($(window).scrollTop() >= circleThreshold){
                $('.circle').addClass('scale');
                setTimeout(function(){
                    $('.circle').css("transition","1s ease-in-out");
                    $('.circle').each(function(){
                        $(this).css("height",$(this).data("height"));
                    })
                }, 400);

                var progressRate = $('.progress_rate').data("rate");
                $({rate: 0}).animate({rate: progressRate},{
                    duration: 1000,
                    progress: function(){
                        var now = this.rate;
                        $('.progress_rate').text(Math.ceil(now)+'만');
                    }
                });
                executed = true;
            }
        }

        var backTextThreshold = $('.background_text').offset().top - 800;
        if($(window).scrollTop() >= backTextThreshold){
            $('.background_text p').addClass('animation');
        }

        var categoryThreshold = $('#our_culture .category').offset().top - 900;
        if($(window).scrollTop() >= categoryThreshold){
            $('#our_culture .category').addClass('up');
        }

        var cultureThreshold = $('.culture_title h3').offset().top - 900;
        if($(window).scrollTop() >= cultureThreshold){
            $('.culture_title h3').addClass('up');
            $('.culture_title .contents').addClass('up');
        }

        $('.blog').each(function(){
            if($(window).scrollTop() >= $(this).offset().top - 900){
                $(this).addClass('up');
            }
        })
    });
    
    var startNum = 1;
    var currentNum = startNum;

    function next(){
        if(currentNum <= peopleLen){
            peopleList.css("transition", "1.2s ease");
            peopleList.css("transform", "translateX(-" + people.width() * (currentNum + 1) + "px)");
        }
        if (currentNum === peopleLen){
            setTimeout(function(){
                peopleList.css("transition", "none");
                peopleList.css("transform", "translateX(-" + people.width() + "px)");
            }, 1200);
            currentNum = 0;
            }
        ++currentNum;
    }

    function prev(){
        if(currentNum >= 1){
            peopleList.css("transition", "1.2s ease");
            peopleList.css("transform", "translateX(-" + people.width() * (currentNum - 1) + "px)");
        }
        if(currentNum === 1){
            setTimeout(function(){
                peopleList.css("transition", "none");
                peopleList.css("transform", "translateX(-" + people.width() * peopleLen + "px)");
            }, 1200);
            currentNum = peopleLen+1;
        }
        --currentNum;
    }

    var peopleInterval = setInterval(function(){
        next();
    }, 4000);

    peopleList.css("transform", "translateX(-" + people.width() * (startNum) + "px)");

    peopleList.on("mouseover",function(){
        clearInterval(peopleInterval);
        peopleInterval = null;
    });

    peopleList.on("mouseout",function(){
        if(peopleInterval == null){
            peopleInterval = setInterval(function(){
                next();
            }, 4000);
        }
    })

    $('.next').on("click",function(){
        clearInterval(peopleInterval);
        next();
        if(peopleInterval == null){
            peopleInterval = setInterval(function(){
                next();
            }, 4000);
        }
    });

    $('.prev').on("click",function(){
        clearInterval(peopleInterval);
        prev();
        if(peopleInterval == null){
            peopleInterval = setInterval(function(){
                next();
            }, 4000);
        }
    })
    
    var cultureStart = 0.34*cultureImg.width() / (cultureImgPercent/100),
        cultureIndex = 0,
        cultureAuto = cultureStart + cultureImg.width() * (cultureIndex+1);

    cultureImgList.css("transform","translateX(-" + cultureStart + "px)");
    cultureIndex = 0;

    function cultureSlide(){
        cultureAuto = cultureStart + cultureImg.width() * (cultureIndex+1);
        if(cultureIndex <= cultureImgLen){
            cultureImgList.css("transition","1s ease");
            cultureImgList.css("transform","translateX(-" + cultureAuto + "px)");
        }
        if(cultureIndex === 2){
            setTimeout(() => {
                cultureImgList.css("transition","none");
                cultureImgList.css("transform","translateX(-" + cultureStart + "px)");
            }, 1000);
            cultureIndex = -1;
        }
        ++cultureIndex;
    }

    var cultureInterval = setInterval(function(){
        cultureSlide();
    }, 4000);
    
    function imgChange() {
        if($(window).width() < 754){
            $('.yo-han').css("background","url('images/m_yohan.jpg') no-repeat top/cover")
            $('.yu-jin').css("background","url('images/m_yujin.jpg') no-repeat top/cover")
            $('.in-woo').css("background","url('images/m_inwoo.jpg') no-repeat top/cover")
            $('.jae-woong').css("background","url('images/m_jaewoong.jpg') no-repeat top/cover")
            $('.kye-sung').css("background","url('images/m_kyesung.jpg') no-repeat top/cover")
        } else {
            $('.yo-han').css("background","url('images/pc_yohan.jpg') no-repeat top/cover")
            $('.yu-jin').css("background","url('images/pc_yujin.jpg') no-repeat top/cover")
            $('.in-woo').css("background","url('images/pc_inwoo.jpg') no-repeat top/cover")
            $('.jae-woong').css("background","url('images/pc_jaewoong.jpg') no-repeat top/cover")
            $('.kye-sung').css("background","url('images/pc_kyesung.jpg') no-repeat top/cover")
        }
    }

    $(window).resize(function(){
        cultureStart = 0.34*cultureImg.width() / (cultureImgPercent/100);
        cultureAuto = cultureStart + cultureImg.width() * cultureIndex;

        clearInterval(peopleInterval);
        clearInterval(cultureInterval);
        peopleList.children(":first").css("max-width",$(window).width());
        peopleList.children(":last").css("max-width",$(window).width());
        people.css("max-width",$(window).width());
        peopleList.css("width", people.width() * (peopleLen + 2) + 1);
        peopleList.css("transition", "none");
        cultureImgList.css("transition", "none");
        peopleList.css("transform", "translateX(-" + people.width() * currentNum + "px)");
        cultureImgList.css("transform", "translateX(-" + cultureAuto + "px)");
        peopleInterval = setInterval(function(){
            next();
        }, 4000);
        cultureInterval = setInterval(function(){
            cultureSlide();
        }, 4000);
        imgChange();
    });
});
