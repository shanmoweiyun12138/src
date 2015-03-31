var is_ipad = navigator.userAgent.toLowerCase().indexOf('ipad') > -1;
var is_iphone = navigator.userAgent.toLowerCase().indexOf('iphone') > -1;
var is_ipod = navigator.userAgent.toLowerCase().indexOf('ipod') > -1;
var is_ios = is_ipad || is_iphone || is_ipod;
var is_tablet = ($(window).width() < 1024 && $(window).width() > 480) ? true : false;
var is_mobile = ($(window).width() < 480) ? true : false;
var resizeToggle;
var count = 0;
var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var pnlLength = $('.panel').length;
var $parentSlider;
var val0;
$(document).ready(function (e) {
    var $this;
    $('.video-link').click(function (e) {
        $this = $(this);
        e.preventDefault();
    });
    var modalVideoPlayer = new Object();

    modalVideoPlayer.barHeight = 60;
    modalVideoPlayer.aspectRatio = 1.833;//2.39;
    modalVideoPlayer.width = $(window).width() * 0.75;
    modalVideoPlayer.videoHeight =
        modalVideoPlayer.width /
        modalVideoPlayer.aspectRatio + 
        20;
    modalVideoPlayer.height =
        modalVideoPlayer.barHeight +
        //modalVideoPlayer.barHeight +
        modalVideoPlayer.videoHeight;
        
    //modalVideoPlayer.letterBoxHeight = (modalVideoPlayer.width / 1.833 - modalVideoPlayer.width / 2.39) / 2;



    $('.video-link').fancybox({
        'padding': 0,
        'margin': 0,
        'width': modalVideoPlayer.width,
        'height': modalVideoPlayer.height,
        'autoScale': true,
        'autoDimensions': false,
        'scrolling': 'no',
        'centerOnScroll': true,
        'overlayOpacity': 0.8,
        'overlayColor': "#000",
        'onComplete': function () {

            var containerElementId = $this.prop('hash').substr(1);
            var videoContainerElementId = containerElementId + "_player_container";
            var videoElementId = containerElementId + "_player";

            var videoUrl = $this.data('video');

            $("#" + videoContainerElementId)
                .width(modalVideoPlayer.width)
                .height(modalVideoPlayer.videoHeight)
                .css("padding-top", modalVideoPlayer.barHeight + "px");
                //.css("padding-bottom", modalVideoPlayer.barHeight + "px");

            var playerInstance = jwplayer(videoElementId).setup({
                file: videoUrl,
                skin: "/js/jwplayer/custom.xml",
                width: modalVideoPlayer.width,
                height: modalVideoPlayer.videoHeight,
                aspectratio: "2.39:1",
                autostart: true
            });
        }
    });

    if ($('#testimonial').length) {
        var top = $('#testimonial').offset().top - parseFloat($('#testimonial').css('marginTop').replace(/auto/, 0));
        $(window).scroll(function (event) {
            // what the y position of the scroll is
            var y = $(this).scrollTop();

            // whether that's below the form
            if (y >= top) {
                // if so, ad the fixed class
                $('#testimonial').addClass('fixed');
            } else {
                // otherwise remove it
                $('#testimonial').removeClass('fixed');
            }

            var cutOff = $(document).height() - 1115; //1200;

            if (y >= cutOff) {
                //$('#comment').css('margin-top','-160px');
                $('#testimonial').removeClass('fixed');
                //$('#comment').css('margin-top', '871px');
                $('#testimonial').css('margin-top', ($("#enquiry-form").height() - $('#testimonial').height()) + 'px');

            } else {
                $('#testimonial').css('margin-top', '0');
            }
        });
    }



    $('.feature-wrap .tabs li a, .panel-experts.alt .tabs li a').click(function (e) {
        var elem = $(this).prop('hash');
        $('.feature-wrap .tabs .active, .panel-experts.alt .tabs .active').removeClass('active');
        $(this).parent('li').addClass('active');
        $('.carousel.open').removeClass('open');
        $(elem).addClass('open');

        e.preventDefault();
    })



    //owl-carousel 
    // if($("#compare-ribbon .carousel").length > 0 || $('#islandsoffers .carousel').length > 0 || $('.panel-experts .carousel').length > 0 || $('.offers-slider .owl-carousel').length > 0){
    //       $("#compare-ribbon .carousel, #islandsoffers .carousel, .panel-experts .carousel, .offers-slider .owl-carousel").owlCarousel({
    //     navigation : true,
    //   pagination : false,
    // items : x,
    // itemsDesktop : [1199,3],
    //itemsDesktopSmall : [979,3]
    //});
    //}


    //owl-carousel 
    //check if carousel is present with IF statement
    if ($('#islandsoffers .owl-carousel').length > 0) {
        firecarousel('#islandsoffers .owl-carousel', 3)
    }
    if ($('.panel-experts .owl-carousel').length > 0) {
        firecarousel('.panel-experts .owl-carousel', 3)
    }
    if ($('.offers-slider .owl-carousel').length > 0) {
        firecarousel('.offers-slider .owl-carousel', 3)
    }

    function firecarousel(carouselname, numitems) {

        $(carouselname).owlCarousel({
            navigation: true,
            pagination: false,
            items: numitems,
            itemsDesktop: [1199, 3],
            itemsDesktopSmall: [979, 3]
        });

        var featured1Items = $('.offers-slider #featured-1 .item, .panel-experts.alt #featured-1 .item').length;
        if (featured1Items <= 3) {
            $('#featured-1 .owl-prev').hide();
            $('#featured-1 .owl-next').hide();
        }

        var featured3Items = $('.offers-slider #featured-3 .item, .panel-experts.alt #featured-3 .item').length;
        if (featured3Items <= 3) {
            $('#featured-3 .owl-next').hide();
            $('#featured-3 .owl-prev').hide();
        }

    }

    /*if($("img[data-original]").length > 0){
    $("img[data-original]").lazyload();
    }
    $("a.modal").fancybox({
    'type': 'iframe',
    'width': 450,
    'height': 500
    });
    
    $('#sortable').sortable({
    placeholder: "ui-state-highlight"
    });
    $('#sortable').disableSelection();*/

    $('.controls a').click(function () {
        var $root = $(this).parents('.item');
        if ($(this).parent('li').hasClass('control-up')) {
            var $elem = $root.prev('.item');
            $root.insertBefore($elem);
        } else {
            var $elem = $root.next('.item');
            $root.insertAfter($elem);
        }
        $('#sortable').sortable('refreshPositions');
        var sortableSerialize = $('#sortable').sortable("toArray"); //Not sure if you need this. It creates an array of the ids of each items in order.
        return false;
    });

    if ($('.num-box').length > 0) {
        $('.num-box').each(function () {
            var $input = $(this).find('input[type=text]')
            var inputVal = $input.val();
            $('.num-inc', $(this)).show();
            if (inputVal <= 1) {
                //$input.siblings('label').text('Night');
                $('.inc-minus', $(this)).addClass('disabled');
            } else {
                //$input.siblings('label').text('Nights');
                $('.inc-minus', $(this)).removeClass('disabled');
            }
        });
    }

    $('.num-inc a').click(function () {
        if (!$(this).hasClass('disabled')) {
            var $root = $(this).parents('.num-box');
            var $input = $root.find('input[type=text]');
            var inputVal = $input.val();

            if ($(this).hasClass('inc-minus') && inputVal > 0) {
                inputVal--
            } else {
                inputVal++
            }
            if (inputVal <= 1) {
                //$input.siblings('label').text('Night');
                $('.inc-minus', $root).addClass('disabled');
            } else {
                //$input.siblings('label').text('Nights');
                $('.inc-minus', $root).removeClass('disabled');
            }
            if (inputVal < 10) {
                inputVal = '0' + inputVal;
            }
            $input.val(inputVal);
        }
        return false;
    });

    $('.cust-dropdown .drop').live('click', function () {
        $(this).toggleClass('active').parents('.cust-dropdown').find('ul').slideToggle(200);
        return false;
    });
    fullScreenPanel();
    // vertCenterText();

    $(window).resize(function () {
        //vertCenterText();
        fullScreenPanel();
        setImgWrap();
    });

    /*if($("#compare-ribbon .carousel").length > 0 || $('#islandsoffers .carousel').length > 0 || $('.panel-experts .carousel').length > 0 || $('.offers-slider .carousel').length > 0){
    $("#compare-ribbon .carousel, #islandsoffers .carousel, .panel-experts .carousel, .offers-slider .carousel").carousel();
    }*/

    $(document).keydown(function (event) {
        var direction = null;
        if (event.keyCode == 38) {
            $('.scroll-prev').click();
            event.preventDefault();
        } else if (event.keyCode == 40) {
            $('.scroll-next').click();
            event.preventDefault();
        } else if (event.keyCode == 37 && $('.panel-gallery').hasClass('panel-active')) {
            $('.panel-gallery.panel-active .prev').click();
            event.preventDefault();
        } else if (event.keyCode == 39 && $('.panel-gallery').hasClass('panel-active')) {
            $('.panel-gallery.panel-active .next').click();
            event.preventDefault();
        }
    });
    // Adds the fixed position to the in-page navigation when it scrolls past the top of the page. iOS struggles with position fixed so it's removed from those devices
    if (!is_tablet || !is_mobile) {
        if ($('#cookie-notice').length == 0 || !$('#cookie-notice').is(':visible')) {
            $('.fixed-wrapper header').addClass('fixed');
        } else {
            var headerTop = $('.fixed-wrapper header').offset().top - parseFloat($('.fixed-wrapper header').css('marginTop').replace(/auto/, 0));
            $(window).scroll(function (event) {
                var y = $(this).scrollTop();
                if (y >= headerTop) {
                    $('#cookie-notice .close').click();
                    $('.fixed-wrapper header').addClass('fixed');
                    headerTop = 0;
                    //console.log('add');
                } else {
                    $('.fixed-wrapper header').removeClass('fixed');
                    //console.log('remove');
                }
            });
        }
    }
    if (!is_tablet && $('#banner-fixed').length > 0 || !is_mobile && $('#banner-fixed').length > 0) {
        var $fixedElem = $('#banner-fixed');
        var fixedHeader = '.fixed-wrapper header';
        var top = $fixedElem.offset().top - parseFloat($fixedElem.css('marginTop').replace(/auto/, 0)) - 68;
        var wrapperTop = $(fixedHeader).offset().top - parseFloat($(fixedHeader).css('marginTop').replace(/auto/, 0)) - 68;

        $(window).scroll(function (event) {
            var y = $(this).scrollTop();
            if (y >= top) {
                $('.fixed').removeClass('fixed');
                $fixedElem.addClass('fixed');
            } else {
                $('header').addClass('fixed');
                $fixedElem.removeClass('fixed');
            }
            if ($('#cookie-notice').length > 0 && $('#cookie-notice').is(':visible')) {
                $('#cookie-notice .close').click();
            }
        });
    }

    $('.item-pager li a').click(function () {
        var path = $(this).attr('href');
        if (!$(this).parent('li').hasClass('active')) {
            $('.cutout-item').hide().removeClass('active').siblings(path).show().addClass('active');

            $('.item-pager li').removeClass('active');
            $(this).parent('li').addClass('active');

            $('.item-count span').text($(this).text());
        }

        return false;
    });

    // Handles the toolbox navigation to scroll up and down the page
    var direction;
    var endPanel;

    if ($('.panel-active').length == 0) {
        $('.panel:first').addClass('panel-active');
    } else {
        count = $('.panel-active').index('.panel');
    }
    checkPnlActive();

    $('.scroll-next, .scroll-prev').click(function () {
        // Which button has been clicked
        if ($(this).hasClass('scroll-prev')) {
            direction = 'prevAll';
        } else {
            direction = 'nextAll';
        }

        // Run the smooth scroll
        if (direction == 'prevAll' && count > 0 || direction == 'nextAll' && count < (pnlLength - 1)) {

            if (direction == 'prevAll') {
                count--
            } else {
                count++
            }

            var $elem = $('.panel').eq(count);
            if (count == 0 && direction == 'prevAll') {
                $elem = $('#wrapper');
            }
            var scrollAmount = $elem.offset().top;

            //if (!$elem.hasClass('full-screen') && $('#banner-fixed').length > 0) {
            //    scrollAmount -= $('#banner-fixed').height();
            //} else if ($('.fixed-wrapper').length > 0) {
            //    scrollAmount -= $('.fixed-wrapper').height();
            //}

            if (direction == 'prevAll') {
                var $speedElem = $elem;
                if (count == 0 && direction == 'prevAll') {
                    $speedElem = $('.panel').eq(count);
                }
            } else {
                var $speedElem = $('.panel-active');
            }
            var minSpeed = 1000;
            var speedCalc = $speedElem.height() * 1.5;
            var speed = (speedCalc < minSpeed) ? minSpeed : speedCalc;

            $('html, body').stop().animate({
                scrollTop: scrollAmount
            }, speed, function () {
                checkPnlActive();
            });
        }
        return false;
    });
    if (!is_ios) {
        $('.inspirations-grid li:not(".active")').mouseover(function () {
            $('.tooltip', this).stop(true, true).fadeIn(300);
        });
        $('.inspirations-grid li:not(".active")').mouseout(function () {
            $('.tooltip', this).stop(true, true).fadeOut(300);
        });
    }

    $('.inspirations-grid li').click(function () {
        if (!$(this).hasClass("active")) {
            if (!$(this).parent().hasClass("select-multiple")) {
                $(this).siblings('li').each(function () {
                    $('.overlay', this).hide().removeClass('overlay').addClass('tooltip');
                    $('.add-remove', this).hide();
                    $(this).removeClass('active');
                });
            }
            $(this).addClass('active');
            $('.tooltip', this).hide().removeClass('tooltip').addClass('overlay').css({
                display: 'table-cell'
            });
            $('.add-remove', this).fadeIn(400);
        }
        else {
            $('.overlay', this).hide().removeClass('overlay').addClass('tooltip').fadeIn(300);
            $('.add-remove', this).fadeOut(400);
            $(this).removeClass('active');
        }
        inspirationsRunningTotalFunc();
    });

    if ($('#slider-from, #slider-to').length > 0) {
        $('#slider-from, #slider-to').slider({
            min: 0,
            max: 11,
            animate: true,
            create: function (event, ui) {
                $parentSlider = $(this).parents('.inspirations-slider');
                val0 = $(this).slider('value');
                $('.months li:eq(' + val0 + ')', $parentSlider).addClass('selected');
                setSliderTips(val0, 'css');
            },
            slide: function (event, ui) {
                $parentSlider = $(this).parents('.inspirations-slider');
                val0 = ui.value;
                $('.months li', $parentSlider).removeClass('selected first last');
                $('.months li:eq(' + val0 + ')', $parentSlider).addClass('selected');
                setSliderTips(ui.value, 'animate');

                if ($(this).attr('id') == 'slider-from') {
                    inspirationDateSliderLow = ui.value;
                } else {
                    inspirationDateSliderHigh = ui.value;
                }
                inspirationsRunningTotalFunc();
            },
            change: function (event, ui) {
            }
        });

        $('#sel-date-from').change(function (e) {
            $('#slider-from').slider('value', $(this).val());
        });
        $('#sel-date-to').change(function (e) {
            $('#slider-to').slider('value', $(this).val());
        });
    }
    function setSliderTips(val0, transition) {
        if ($('#slider-from').next('.tooltip').length < 1) {
            $('#slider-from').closest('.slider-wrap').append('<span class="tooltip tip-from">From</span>');
        }
        if ($('#slider-to').next('.tooltip').length < 1) {
            $('#slider-to').closest('.slider-wrap').append('<span class="tooltip tip-to">To</span>');
        }

        var $months = $('.months li', $parentSlider);
        liWidth = $months.width();
        liWidthHalf = liWidth / 2;

        $('.tip-to, .tip-from', $parentSlider).stop(true, true)[transition]({
            left: $('.months li:eq(' + val0 + ')', $parentSlider).position().left
        });
    }
});

$(window).load(function () {
    if ($('.panel-moodboard').length > 0) {
        setMoodboardHeight();
        $(window).resize(function () {
            setMoodboardHeight();
        });
        if ($(window).width() < 768) {
            moodboardLayout();
            $(window).resize(function () {
                moodboardLayout();
            });
        }
    }

    if ($('#scroller').length > 0) {
        var scrollerOffset = $('#scroller').position().top;
        var scrollerHeight = $('#scroller').parents('.panel').height() - scrollerOffset;
        $('#scroller, #scroller .column').each(function () {
            var padding = parseInt($(this).css('padding-top')) + parseInt($(this).css('padding-bottom'));
            $(this).height(scrollerHeight - padding);
        });
        $("#scroller .column").overscroll({
            direction: 'vertical'
        });
    }
    if ($(".panel-gallery").length > 0) {
        $(".panel-gallery").gallery({
            showCaption: true
        });
    }


    $('.item img').css({
        "display": "block"
    });

    // Fade in images so there isn't a color "pop" document load and then on window load
    $(".my-carrier .item.empty img").animate({ opacity: 1 }, 500);

    // clone image
    $('.my-carrier .item.empty  img').each(function () {
        var el = $(this);
        el.css({ "position": "absolute" }).wrap("<div class='img_wrapper' style='position:relative;'>").clone().addClass('img_grayscale').css({ "position": "absolute", "z-index": "5", "opacity": "0" }).insertBefore(el).queue(function () {
            var el = $(this);
            el.parent().css({ "height": $(this).height() });
            el.dequeue();
        });
        this.src = grayscale(this.src);
    });
    $(window).resize(function () {
        $('.my-carrier .item.empty  img').each(function () {
            var el = $(this);
            $(this).parent('.img_wrapper').css({
                height: el.height()
            });
        });
    });
    // Fade image 
    $('.my-carrier .item.empty').mouseover(function () {
        $(this).find('img:first').stop().animate({ opacity: 1 }, 300);
    })
    $('.my-carrier .item.empty').mouseout(function () {
        $(this).find('.img_grayscale').stop().animate({ opacity: 0 }, 500);
    });

    setImgWrap();

    //        Causes double click on nav when on desktop
    //        $('.carousel').wipetouch({
    //                        allowDiagonal: false,
    //                        wipeLeft: function(result){
    //                                        //$(result.source).parents('.carousel').find('.pag-next').click();
    //                        },
    //                        wipeRight: function(result){
    //                                        //$(result.source).parents('.carousel').find('.pag-prev').click();
    //                        }
    //        });


    //        $('#collections-col-1-inner').tabs({
    //                        fxSlide: false, 
    //                        fxFade: false, 
    //                        fxSpeed: 'normal'
    //        });

    if ($('.holiday-search').length > 0) {
        $.ajax({
            url: "/RegionAreaSubAreaAutoComplete.asmx/GetCollectionsHolSearch",
            type: "post",
            data: "{'category':'collections'}",
            dataType: "json",
            async: false,
            contentType: "application/json;charset=utf-8",
            success: function (data) {
                var collections = data.d;

                var splitCollections = collections.split(",");

                for (i = 0; i < splitCollections.length; i++) {

                    var option = $('<option></option>').attr("value", splitCollections[i]).text(splitCollections[i]);
                    $("#searchByCollection").append(option);
                }
            },
            error: function (request, status, err) {
                //alert("RemoveFromSession: " + err);
            }
        });
        $.ajax({
            url: "/RegionAreaSubAreaAutoComplete.asmx/GetAreasHolSearch",
            type: "post",
            data: "{'area':'area'}",
            dataType: "json",
            async: false,
            contentType: "application/json;charset=utf-8",
            success: function (data) {

                $("#searchByDestination").empty();
                $("#searchByDestination").append($('<option></option>').attr("value", "").text("Select destination"));

                $("#searchByLocale").empty();
                $("#searchByLocale").append($('<option></option>').attr("value", "").text("Select hotel/itinerary"));
                var areas = data.d;

                var splitAreas = areas.split("|");

                for (i = 0; i < splitAreas.length; i++) {
                    var areaDetails = splitAreas[i].split(":");
                    var option = $('<option></option>').attr("value", areaDetails[0]).text(areaDetails[1]);
                    $("#searchByArea").append(option);
                }
            },
            error: function (request, status, err) {
                //alert("RemoveFromSession: " + err);
            }
        });
    }

    if ($('.enquiry-holiday-search').length > 0) {
            $.ajax({
                url: "/RegionAreaSubAreaAutoComplete.asmx/GetAreasHolSearch",
                type: "post",
                data: "{'area':'area'}",
                dataType: "json",
                async: false,
                contentType: "application/json;charset=utf-8",
                success: function (data) {

                    $("#searchByDestinationEnquiry").empty();
                    $("#searchByDestinationEnquiry").append($('<option></option>').attr("value", "").text("Select destination"));

                    $("#searchByHotelEnquiry").empty();
                    $("#searchByHotelEnquiry").append($('<option></option>').attr("value", "").text("Select hotel/itinerary"));
                    var areas = data.d;

                    var splitAreas = areas.split("|");

                    for (i = 0; i < splitAreas.length; i++) {
                        var areaDetails = splitAreas[i].split(":");
                        var option = $('<option></option>').attr("value", areaDetails[0]).text(areaDetails[1]);
                        $("#searchByBrochureEnquiry").append(option);
                    }
                },
                error: function (request, status, err) {
                    alert("RemoveFromSession: " + err);
                }
            });
        }


    $('#searchByBrochureEnquiry').change(function () {
        if ($('#searchByBrochureEnquiry').val() == 0) {
            $('#searchByDestinationEnquiry').prop('disabled', true);
            $('#searchByHotelEnquiry').prop('disabled', true);
        }
        else {
            $('#searchByDestinationEnquiry').prop('disabled', false);
        }

        $('#searchByDestinationEnquiry').prop('selectedIndex', 0);
        $('#searchByHotelEnquiry').prop('selectedIndex', 0);
        $('#searchByHotelEnquiry').prop('disabled', true);

        var areaId = $(this).val();
        $.ajax({
            url: "/RegionAreaSubAreaAutoComplete.asmx/GetDestinationsHolSearch",
            type: "post",
            data: "{'areaId':'" + areaId + "'}",
            dataType: "json",
            async: false,
            contentType: "application/json;charset=utf-8",
            success: function (data) {

                $("#searchByDestinationEnquiry").empty();
                $("#searchByDestinationEnquiry").append($('<option></option>').attr("value", "").text("Select destination"));
                var destinations = data.d;
                var splitDestinations = destinations.split("|");

                for (i = 0; i < splitDestinations.length; i++) {
                    var destinationDetails = splitDestinations[i].split(":");
                    var option = $('<option></option>').attr("value", destinationDetails[0]).text(destinationDetails[1]);
                    $("#searchByDestinationEnquiry").append(option);
                }
            },
            error: function (request, status, err) {
                //alert("RemoveFromSession: " + err);
            }
        });
    });


    $('#searchByDestinationEnquiry').change(function () {

        // Disable search by locale if destination not been selected.
        if ($('#searchByDestinationEnquiry').val() == 0) {
            $('#searchByHotelEnquiry').prop('disabled', true);
        }
        else {
            $('#searchByHotelEnquiry').prop('disabled', false);
        }

        var destinationId = $(this).val();
        $.ajax({
            url: "/RegionAreaSubAreaAutoComplete.asmx/GetAccommItinSearch",
            type: "post",
            data: "{'destinationId':'" + destinationId + "'}",
            dataType: "json",
            async: false,
            contentType: "application/json;charset=utf-8",
            success: function (data) {

                $("#searchByHotelEnquiry").empty();
                $("#searchByHotelEnquiry").append($('<option></option>').attr("value", "").text("Select hotel/itinerary"));
                $("#searchByHotelEnquiry").append($('<option></option>').attr("value", "1").text("I don't mind"));
                var locales = data.d;
                var splitLocales = locales.split("|");

                for (i = 0; i < splitLocales.length; i++) {
                    var localeDetails = splitLocales[i].split(":");
                    var option = $('<option></option>').attr("value", localeDetails[0]).text(localeDetails[1]);
                    $("#searchByHotelEnquiry").append(option);
                }
            },
            error: function (request, status, err) {
                //alert("RemoveFromSession: " + err);
            }
        });
    });

    $('#searchByArea').change(function () {
        if ($('#searchByArea').val() == 0) {
            $('#searchByDestination').prop('disabled', true);
            $('#searchByLocale').prop('disabled', true);
        }
        else {
            $('#searchByDestination').prop('disabled', false);
        }

        $('#searchByDestination').prop('selectedIndex', 0);
        $('#searchByLocale').prop('selectedIndex', 0);
        $('#searchByLocale').prop('disabled', true);

        var areaId = $(this).val();
        $.ajax({
            url: "/RegionAreaSubAreaAutoComplete.asmx/GetDestinationsHolSearch",
            type: "post",
            data: "{'areaId':'" + areaId + "'}",
            dataType: "json",
            async: false,
            contentType: "application/json;charset=utf-8",
            success: function (data) {

                $("#searchByDestination").empty();
                $("#searchByDestination").append($('<option></option>').attr("value", "").text("Select destination"));
                var destinations = data.d;
                var splitDestinations = destinations.split("|");

                for (i = 0; i < splitDestinations.length; i++) {
                    var destinationDetails = splitDestinations[i].split(":");
                    var option = $('<option></option>').attr("value", destinationDetails[0]).text(destinationDetails[1]);
                    $("#searchByDestination").append(option);
                }
            },
            error: function (request, status, err) {
                //alert("RemoveFromSession: " + err);
            }
        });
    });

    $('#searchByDestination').change(function () {

        // Disable search by locale if destination not been selected.
        if ($('#searchByDestination').val() == 0) {
            $('#searchByLocale').prop('disabled', true);
        }
        else {
            $('#searchByLocale').prop('disabled', false);
        }

        var destinationId = $(this).val();
        $.ajax({
            url: "/RegionAreaSubAreaAutoComplete.asmx/GetAccommItinSearch",
            type: "post",
            data: "{'destinationId':'" + destinationId + "'}",
            dataType: "json",
            async: false,
            contentType: "application/json;charset=utf-8",
            success: function (data) {

                $("#searchByLocale").empty();
                $("#searchByLocale").append($('<option></option>').attr("value", "").text("Select hotel/itinerary"));
                var locales = data.d;
                var splitLocales = locales.split("|");

                for (i = 0; i < splitLocales.length; i++) {
                    var localeDetails = splitLocales[i].split(":");
                    var option = $('<option></option>').attr("value", localeDetails[0]).text(localeDetails[1]);
                    $("#searchByLocale").append(option);
                }
            },
            error: function (request, status, err) {
                //alert("RemoveFromSession: " + err);
            }
        });
    });

    $('.filter input[type=text]').keypress(function (event) {
        var key;
        if (window.event) {
            key = window.event.keyCode;
        }
        else {
            key = event.which;
        }
        if (key == '13') {
            event.preventDefault();
            $(this).parents('.filter').find('input[type=submit]').click();
        }
    });

    $('.carrierform input[type=email]').keypress(function (event) {
        var key;
        if (window.event) {
            key = window.event.keyCode;
        }
        else {
            key = event.which;
        }
        if (key == '13') {
            event.preventDefault();
            $(this).parents('.carrierform').find('input[type=submit]').click();
        }
    });

    $.urlParam = function (name) {
        var vars = [], hash;
        var q = document.URL.split('?')[1];
        if (q != undefined) {
            q = q.split('&');
            for (var i = 0; i < q.length; i++) {
                hash = q[i].split('=');
                vars.push(hash[1]);
                vars[hash[0]] = hash[1];
            }
        }
        return vars[name]
    }
    if ($.urlParam('showAll') != 'true') {
        var $offerList = $('.panel-offers .pnl-3-col .item ul');

        $offerList.each(function () {
            var sum = 0;
            if ($('li', this).length > 3) {
                $('li:lt(3)', this).each(function () {
                    sum += $(this).outerHeight(true);
                });
                $(this).height(sum).after('<a href="#" class="btn btn-sec-alt slide-offers">See all offers</a>');
            }

        });

        $('.slide-offers').toggle(function () {
            var $toggleList = $(this).prev('ul');
            var sum = 0;
            $('li', $toggleList).each(function () {
                sum += $(this).outerHeight(true);
            });
            $toggleList.animate({
                height: sum
            });
            $(this).text('Hide offers');
            return false;
        }, function () {
            var $toggleList = $(this).prev('ul');
            var sum = 0;
            $('li:lt(3)', $toggleList).each(function () {
                sum += $(this).outerHeight(true);
            });
            $toggleList.animate({
                height: sum
            });
            $(this).text('See all offers');
            return false;
        });
    }

    $('.find-expert-4-col section a').hover(function () {
        $('img:not(.img-team)', this).stop(true, true).animate({
            top: '100%'
        });
    }, function () {
        $('img:not(.img-team)', this).stop(true, true).animate({
            top: 0
        });
    });

    if ($('.datepicker, .datepickerfrom, .datepickerto').length > 0) {
        $('.datepicker, .datepickerfrom, .datepickerto').datepicker({
            showOn: 'both',
            buttonImage: '/images/forms/date-picker-icon.gif',
            dateFormat: 'dd/mm/yy',
            buttonImageOnly: true,
            minDate: 0,
            onClose: function (dateText, inst) {
                $(this).attr("disabled", false);
            },
            beforeShow: function (input, inst) {
                $(this).attr("disabled", true);
                $(this).blur();
            }
        });
        $(".datepickerfrom+img").addClass("from-date");
        $(".datepickerto+img").addClass("to-date");
    }
    $('.panel-sliding .btn.expand, .panel-sliding .btn-txt.expand').click(function () {
        $(this).parents('.panel-sliding').find('.slide-panel').slideToggle();
        $(this).toggleClass('active');

        smoothScroll($(this));
        return false;
    });

    if ($('.brochure-checkboxes input').length > 0) {
        $('.brochure-checkboxes input:checked').each(function () {
            var checkID = $(this).attr('id');
            if ($(this).is(':checked')) {
                $('.brochure-checkboxes label[for=' + checkID + ']').addClass('brochure-box-active');
            } else {
                $('.brochure-checkboxes label[for=' + checkID + ']').removeClass('brochure-box-active');
            }
        });
    }

    $('.brochure-checkboxes input').change(function () {
        var checkID = $(this).attr('id');
        if ($(this).is(':checked')) {
            $('.brochure-checkboxes label[for=' + checkID + ']').addClass('brochure-box-active');
        } else {
            $('.brochure-checkboxes label[for=' + checkID + ']').removeClass('brochure-box-active');
        }
    });
    $('.trigger').click(function () {
        var elem = $(this).attr('href');
        if (!$(elem).is(':visible')) {
            $(elem).slideDown();
            $(this).text('Hide rooms');
            $('html, body').stop().animate({
                scrollTop: $(elem).offset().top - 50
            }, 1000);
        } else {
            $(elem).slideUp();
            $(this).text('See all rooms');
        }
        return false;
    });

    if ($('.temperature-info').length > 0) {
        $('.temperature-info .bars li').each(function () {
            $(this).animate({
                height: $(this).text() * 1.6
            });
        });
        $('.temperature-info .bars li').hover(function () {
            var index = $(this).index();
            var temp = $(this).text();
            $('.temperature-info .info-snippet').html(months[index] + '<span>' + temp + '&deg;C</span>');
        });
    }
    //    if ($('.panel-map').length > 0) {
    //        initialize();
    //    }

    $('.nav-trigger').live('click', function () {
        $(this).siblings('.nav-wrap').slideToggle();
        return false;
    });

    // Handle the hover for the Hidden Treasures
    var treasure = '.treasures li';
    var treasureWidth = $('.treasures').width();

    $('.treasures').height();

    $(treasure).hover(function () {
        var treasurePos = $(this).position();

        $(this).addClass('active');

        if ($('div', this).length != 0) {
            $(this).css({
                'width': $('img', this).width(),
                'min-height': $('img', this).height()
            });
            if (treasurePos.left <= treasureWidth / 2) {
                $('div', this).stop(true, true).show('slide', { 'direction': 'left' }, 500);
                $(this).addClass('slideLeft').css({
                    'padding-left': $('img', this).width() + 35
                });
            } else {
                $(this).addClass('slideRight').css({
                    'padding-right': $('img', this).width() + 35
                });
                $('div', this).stop(true, true).show('slide', { 'direction': 'right' }, 500);
                //console.log('right');
            }
        }

        $(treasure).not(this).delay(500).stop(true).fadeTo(500, 0.3).css({
            'z-index': 1
        });
    }, function () {
        var treasurePos = $(this).position();

        if (treasurePos.left <= treasureWidth / 2) {
            $('div', this).stop(true, true).hide('slide', { direction: 'left' }, 500);
        } else if ($(this).css('right') != 'auto') {
            $('div', this).stop(true, true).hide('slide', { direction: 'right' }, 500);
        }
        $(this).css({
            'padding-left': '',
            'padding-right': ''
        });
        $(treasure + '.active').removeClass('active');
        $(treasure).not(this).delay(500).stop(true).fadeTo(500, 1).css('z-index', '');
    });

    //$(".panel").preloader();

    $('.slide-panel').hide().removeClass('hidden'); // Need to think of a way to improve this. Hiding with CSS causes the page to hang when trying to count the number of items and hiding it with JS causes a flash of content.
    $('#compare-ribbon').css({
        'position': 'relative',
        'left': 0
    });

    var scrollEnded = $.debounce(250, false, function () {
        var windowY = $(window).scrollTop() + ($(window).height() * 0.3);
        $('.panel').filter(function () {
            if (windowY >= this.offsetTop) {
                $('.panel-active').removeClass('panel-active');
                $(this).addClass('panel-active');
                count = $('.panel-active').index('.panel');
            }
        });
        checkPnlActive();
    });


    // Detect which panel is in view - CAUSES ISSUES ON iPAD - ANIMATIONS ARE REALLY JERKY. DITCH ARROWS ON IPAD?
    $(window).bind("scroll resize load", function () {
        if ($(window).width() > 768) {
            scrollEnded();
        }
    });

    // In-page navigation smooth scrolling
    $('.nav-inpage a').click(function () {
        var elem = $(this).attr('href');
        smoothScroll($(elem), 1000, -20);
        $('.nav-inpage .active').removeClass('active');
        $(this).parent('li').addClass('active');

        return false;
    });

    // Resize panels and re-center text on resize / orientation change
    $(window).resize(function () {
        setImgWrap();
    });

    // Replace the <img> with a background image so that we can use 'background-size:cover;' so the panel is always covered by an image
    $('.panel-cutout .img-wrap, .content-hero-image, .item-hero, .panel-banner .inner').each(function () {
        if ($('img', this).length > 0) {
            $(this).css({
                'background-image': 'url(' + $(this).find('.hero').attr('src') + ')'
            });
            $('.hero', this).hide();
        }
    });

    // Expand the slide panels on the Destinations page
    $('.panel-destination .btn.expand').click(function () {
        $(this).siblings('.slide-panel').slideDown();

        var scrollElem = $(this).parent('.panel');

        if (scrollElem.is(':first')) {
            scrollElem = $('#wrapper');
        }

        smoothScroll(scrollElem, 1000, -$('.fixed-wrapper').height());

        return false;
    });

    // Close the slide panel on the Destinations page
    $('.close:not(#compare-ribbon .close)').click(function () {
        $(this).parents('.slide-panel').slideUp();
        return false;
    });

    $('#compare-ribbon .close').click(function () {
        var href = $(this).attr('href');
        $('.slide-toggle[href=' + href + ']').click();
        return false;
    });


    // Expand the slide panels on the Meet the team page
    $('.individual-profile .btn.expand-alt').click(function () {
        $(this).siblings('.slide-panel').slideDown();

        var scrollElem = $(this).parent('.panel');

        if (scrollElem.prev('header').length > 0) {
            scrollElem = $('header');
        }

        smoothScroll(scrollElem);

        return false;
    });

    // Handles the 'top' link in the toolbox
    $('#toolbox .top a').click(function () {
        smoothScroll($('#wrapper'));
        return false;
    });

    // The flyout boxes on the toolbox
    $('#toolbox .has-flyout > a').toggle(function () {
        if ($(this).parent('li').siblings().hasClass('active')) {
            $(this).parents('#toolbox').find('.active > a').click();
        }

        $(this).parent().addClass('active');
        $(this).siblings('.flyout').show('slide', { direction: 'right' }, 700);

        return false;
    }, function () {
        $(this).parent().removeClass('active');
        $(this).siblings('.flyout').hide('slide', { direction: 'right' }, 300);

        return false;
    });
    $('#toolbox .close').click(function () {
        $(this).parents('.flyout').hide('slide', { direction: 'right' }, 300);
        $(this).parents('.active').removeClass('active');
        return false;
    });

    // Handles the display of the primary navigation on mobile/tablet
    if ($("a.show-mobile-nav").length > 0) {
        $("a.show-mobile-nav").css({
            'visibility': 'visible'
        }).pageslide({ modal: true });

        $("a.show-mobile-nav").click(function () {
            $('body').toggleClass('mob-nav-active');
            $('#mobile-slide-nav').height($(window).height());
        });
    }


    // Show the in-page nav on mobile/tablet
    //        $('a.show-mobile-sections').click(function(){
    //                        if($(this).parents('ul').find('.active') > 0){
    //                                        console.log('click');
    //                                        $('.nav-complimentary .active a').click();
    //                        }
    //                        $(this).parent().toggleClass('active');
    //                        $('.nav-inpage').slideToggle(750);
    //                        if(is_iphone || is_ipod){
    //                                        smoothScroll($('.nav-complimentary'));
    //                        }
    //                        return false;
    //        });

    // Handles the slide panels
    var tabClass = '.slide-toggle';
    var $tabs = $(tabClass),
        $slidePanels = $('.slide-panel');
    $tabs.click(function () {
        var target = $(this).attr('href');

        if ($(this).parent().hasClass('active')) {
            $slidePanels.removeClass('toggle-on').slideUp();
            $(this).parent().removeClass('active');
        } else {
            $slidePanels.removeClass('toggle-on').slideUp();
            $tabs.parent().removeClass('active');
            $slidePanels.filter(target).addClass('toggle-on').slideDown();
            $(this).parent().addClass('active');
        }
        if ($(this).parent().hasClass('active') && $(this).parent().hasClass('compare')) {
        }
        return false;
    });

    $('.nav-complimentary .slide-toggle[href=#nav-inpage]').click(function () {
        var href = $(this).attr('href');
        $(href).slideToggle();
        return false;
    });

    $('#cookie-notice .close').click(function () {
        $('#cookie-notice').slideUp('fast', function () {
            $(this).remove();
        });
    });


    // Toggles the resizing of the map on desktop
    $('.map-resize').toggle(function () {
        // Lets the function changing the map api know which way it's going
        resizeToggle = true;

        $(this).text('Minimise');

        // Animate the resize
        $('#map-wrapper').animate({
            width: '100%'
        }).addClass('map-large');
        $('#map-canvas').animate({
            height: $(window).height() * 0.85
        }, function () {
            // Fire resize to update the map
            $(window).resize();
        });

        // Change the button text
        $('span', this).text('Close');

        // Scroll the window to the top of the map
        smoothScroll($('#map-wrapper'), 1000, -80);

        // Change the content flow around the map
        $('.panel-map .secondary').removeClass('secondary').addClass('clear').children('div').addClass('columns');

        return false
    }, function () {
        // Lets the function changing the map api know which way it's going
        resizeToggle = false;
        $(this).text('Enlarge');

        // Animate the resize
        $('#map-wrapper').animate({
            width: '65%'
        }).removeClass('map-large');
        $('#map-canvas').animate({
            height: '465px'
        }, function () {
            $(window).resize();
        });

        // Change the button text
        $('span', this).text('Enlarge');

        // Scroll the window to the top of the map
        smoothScroll($('#map-wrapper').parents('.row'), 1000);

        // Change the content flow around the map
        $('.panel-map .columns').removeClass('columns').parents('div:eq(0)').removeClass('clear').addClass('secondary');

        return false
    });

});


function contentLoader(loadUrl) {
    $('.paging').fadeOut('fast');
    $("#ajax-container").animate({
        left: '200px',
        opacity: 0
    }, 500, function () {
        $("#ajax-container").css({
            left: '-200px'
        });
        $(this).load(loadUrl + " #ajax-inner", function () {
            $('#ajax-container').animate({
                left: 0,
                opacity: 1
            }, 500);
            $('.paging').fadeIn('fast');
        });
    });
}

// Scrolls up and down the page. Needs to be passed the object (eg. $('header') )
function smoothScroll(elem, speed, offset) {
    // If the speed isn't passed, default to 1second
    if (!speed) {
        speed = 1000;
    }
    // An optional offset to add or remove from the elements offset
    if (!offset) {
        offset = 0;
    }
    // Run the scroll
    $('html, body').stop().animate({
        scrollTop: elem.offset().top + offset
    }, speed);
}
var inspirationsPageNumber = 1;

var inspirationDateSliderLow = 1;
var inspirationDateSliderHigh = 5;

function inspirationsPagerAppend(page) {
    if (page == 0) {
        $('#inspirationsPager').hide();
    } else {
        //append paging inside the top section of the slide
        $('#inspirationsPager').appendTo("#inspirationsQ" + page);
        $('#inspirationsPager').show();
    }
}

function inspirationsPagerOnClick(page, linkThis, dir) {
    if (page < 0) {
        page = 0;
    }
    if (page > 5) {
        page = 5;
    }

    if (page == 1) {
        $("#inspirationsPager .prev").css({
            visibility: 'hidden'
        });
        $(".inspirations-intro").show();
        // Show the message
    } else {
        $("#inspirationsPager .prev").css({
            visibility: 'visible'
        });
        $(".inspirations-intro").hide();
        // Hide the message
    }
    if (page == 5) {
        $("#inspirationsPager .next").html('<a href="#" onclick="javascript:inspirationsLinkOnClick()" title="Get your results" class="btn">Next</a>');
    } else {
        $("#inspirationsPager .next").html('<a href="#" onclick="javascript:inspirationsPagerOnClick(inspirationsPageNumber+1)" class="btn">Next</a>');
    }

    inspirationsPagerAppend(page);

    // Hide them all and show the one we want

    $("#inspirationsQ0").hide();
    $("#inspirationsQ1").hide();
    $("#inspirationsQ2").hide();
    $("#inspirationsQ3").hide();
    $("#inspirationsQ4").hide();
    $("#inspirationsQ5").hide();

    $("#inspirationsQ" + page).fadeIn(500);

    $("#inspirationsPager li").removeClass("active");

    if (!linkThis) {
        $("#inspirationsPager li").eq(page).addClass("active");
    }
    else {
        $(linkThis).parent().addClass("active");
    }
    $(linkThis).parent().addClass("active");

    inspirationsPageNumber = page;

    inspirationsRunningTotalFunc();

    return false;
}

function inspirationsRunningTotalFunc() {
    /* Web service stuff for running total */
    var howParam = inspirationPickerValues("inspirationsQ1");
    var whenParam = inspirationGetDates();
    var typeParam = inspirationPickerValues("inspirationsQ3");
    var ambienceParam = inspirationPickerValues("inspirationsQ4");
    var accommParam = inspirationPickerValues("inspirationsQ5");

    var urlMe = "/InspirationQuestionsRunningTotal.ashx";

    urlMe += "?howParam=" + encodeURIComponent(howParam);
    urlMe += "&whenParam=" + encodeURIComponent(whenParam);
    urlMe += "&typeParam=" + encodeURIComponent(typeParam);
    urlMe += "&ambienceParam=" + encodeURIComponent(ambienceParam);
    urlMe += "&accommParam=" + encodeURIComponent(accommParam);


    $("#InspirationsRunningTotal").parent().addClass('thinking');

    $.ajax({
        type: 'Get',
        url: urlMe,
        success: function (data) {
            $("#InspirationsRunningTotal").text(data).parent().removeClass('thinking');
        },
        error: function (e) {

        }
    });
}


function inspirationsLinkOnClick(surprise) {

    var howParam = inspirationPickerValues("inspirationsQ1");
    var whenParam = inspirationGetDates();
    var typeParam = inspirationPickerValues("inspirationsQ3");
    var ambienceParam = inspirationPickerValues("inspirationsQ4");
    var accommParam = inspirationPickerValues("inspirationsQ5");

    var url = "/inspirationresults";

    url += "?howParam=" + encodeURIComponent(howParam);
    url += "&whenParam=" + encodeURIComponent(whenParam);
    url += "&typeParam=" + encodeURIComponent(typeParam);
    url += "&ambienceParam=" + encodeURIComponent(ambienceParam);
    url += "&accommParam=" + encodeURIComponent(accommParam);

    if (surprise != null) {
        url += "&surprise=Carrier";
    }
    else {
        url += "&surprise=";
    }
    
    $('.twirly-full').show();

    window.location = url;
}

function inspirationGetDates() {
    var retValue = inspirationDateSliderLow + "," + inspirationDateSliderHigh;
    return retValue;
}

function inspirationPickerValues(question, multiple) {
    var selectedVals = "";

    if ($('#' + question + ' .grid').hasClass("select-multiple")) {
        $("#" + question + " .grid li.active").each(function (index) {
            var hiddenField = $(this).children("input[type='hidden']");
            selectedVals += $(hiddenField).val() + ",";
        });

        if (selectedVals.length > 0) {
            selectedVals = selectedVals.slice(0, selectedVals.length - 1);
        }
    } else {
        var hiddenField = $("#" + question + " li.active").children("input[type='hidden']");
        selectedVals += $(hiddenField).val();
    }

    if (selectedVals === 'undefined') {
        selectedVals = "";
    }

    if (selectedVals === 'undefined') {
        selectedVals = "";
    }

    return selectedVals;
}


function bookingEnquiryChildAges() {

}

function checkPnlActive() {
    if ($('.panel:last').hasClass('panel-active')) {
        $('#toolbox .scroll-next').css({
            opacity: 0.5
        });
        // console.log('count - ' + count + ' pnlLength - ' + pnlLength);
    } else if ($('.panel:first').hasClass('panel-active')) {
        $('#toolbox .scroll-prev').css({
            opacity: 0.5
        });
    } else {
        $('#toolbox .scroll-next, #toolbox .scroll-prev').css({
            opacity: 1
        });
    }
    var activeId = $('.panel-active').attr('id');
    $('#nav-inpage li').removeClass('active');
    $('#nav-inpage a[href=#'+activeId+']').parent('li').addClass('active');
}


function setImgWrap() {
    if ($('.find-expert-4-col .img-wrap').length > 0) {
        $('.find-expert-4-col .img-wrap').each(function () {
            if ($('img', this).length == 2) {
                $(this).css({
                    width: $(this).closest('section').width(),
                    height: $('img', this).height()
                });
            }
        });
    }
}

// Setup the google map and handle any resizing, etc
//function initialize() {
//
//    var myLatlng = new google.maps.LatLng(13.173311, -59.63704);
//
//    var noPoi = [{
//
//        featureType: "poi.business",
//        stylers: [
//                                  { visibility: "simplified" }
//                                ]
//    }];
//
//    var myOptions = {
//        center: myLatlng,
//        zoom: 14,
//        scrollwheel: false,
//        panControl: false,
//        mapTypeControl: false,
//        scaleControl: false,
//        streetViewControl: true,
//        overviewMapControl: false,
//        zoomControl: true,
//        styles: noPoi,
//        zoomControlOptions: {
//            style: google.maps.ZoomControlStyle.SMALL,
//            position: google.maps.ZoomControlStyle.LEFT_TOP
//        },
//        mapTypeId: google.maps.MapTypeId.ROADMAP
//    };
//    var map = new google.maps.Map(document.getElementById("map-canvas"), myOptions);
//
//    var marker = new google.maps.Marker({
//        position: myLatlng,
//        map: map,
//        icon: 'images/pin.png',
//        title: "Sandy Lane"
//    });
//
//    $(window).resize(function () {
//        var currCenter = map.getCenter();
//        google.maps.event.trigger(map, 'resize');
//        map.panTo(currCenter);
//
//        if (resizeToggle == true) {
//            var toggleOptions = {
//                scrollwheel: true
//            };
//            map.setOptions(toggleOptions);
//            map.setZoom(15);
//        } else {
//            var toggleOptions = {
//                scrollwheel: false
//            };
//            map.setOptions(toggleOptions);
//            map.setZoom(14);
//        }
//        //map.setCenter(currCenter);
//    });
//
//    // replace the enlarge button with a button to view in the maps app or on the web. NEED TO UPDATE TO CHECK FOR ANY MOBILE OR TABLET
//    if (is_ios) {
//        $('#map-wrapper').find('.map-resize').remove();
//        $('#map-wrapper').append('<a href="http://maps.google.com/maps?q=Sandy Lane Hotel&near=Barbados&z=18" class="btn btn-plus map-resize">View in Maps</a>');
//    }
//}


if($('.info[title]').length > 0){
    $('.info[title]').tooltip({
        position: 'center right',
        effect: 'fade',
        offset: [0, 8]
    });
}

//if($('.datepicker').length > 0){
//  $('.datepicker').datepicker({
//      showOn: 'both',
//      buttonImage: 'images/forms/date-picker-icon.gif',
//      dateFormat: 'dd/mm/yy',
//      buttonImageOnly: true
//  });
//}
if($('#infinite').length > 0){
    $('#infinite').infinitescroll({
        loading: {
            finishedMsg: 'All offers loaded.',
            msgText: '',
            speed: 'slow',
            img: '/images/twirly.gif'
        },
        navSelector: '#pagin',
        nextSelector: '#pagin li:last-child a',
        itemSelector: '.offset',
        bufferPx: 50,
        debug: false
    });
}



$(window).load(function() {

    if($('.inspiration-tag-wrap').length > 0){

        var $container = $('.inspiration-tag-wrap');

        $container.isotope({
            layoutMode: "fitRows",
            itemSelector : '.inspiration-tag-item'
        });

        $container.isotope( 'shuffle', function() {}); 
          
        $container.infinitescroll({
            navSelector  : '.inspiration-tag-nav',    // selector for the paged navigation 
            nextSelector: '.inspiration-tag-nav a',  // selector for the NEXT link (to page 2)
            itemSelector : '.inspiration-tag-item',     // selector for all items you'll retrieve
            loading: {
                finishedMsg: 'All items loaded.',
                msgText: '',
                speed: 'slow',
                img: 'images/twirly.gif'
            },
        },
            // call Isotope as a callback
            function( newElements ) {
              $container.isotope( 'appended', $( newElements ) ); 
            }
        );


        // filter items when filter link is clicked
        $('.inspiration-tag-filter a').click(function(){
          var selector = $(this).attr('data-filter');
          $container.isotope({ filter: selector });
          return false;
        });     


        $('.inspiration-tag-filter a').click(function() {

            $('.inspiration-tag-filter a.active').removeClass('active');
            $(this).addClass('active');
       
        });                              

    };




    if ($(window).width() < 960) {

        $('.inspiration-tag-filter-btn').click(function() {
            
            if(!$(this).hasClass('active')) {

                $(this).addClass('active');
                $('.inspiration-tag-filter').slideDown('fast');

            }
            else {
                $(this).removeClass('active');
                $('.inspiration-tag-filter').slideUp('fast');            
            }

        }); 


        $('.inspiration-tag-filter a').click(function() {

            $('.inspiration-tag-filter-btn.active').removeClass('active');
            $('.inspiration-tag-filter').slideUp('fast');            
            
        }); 


    }
       


});
// end of window.load





$('.children-number').change(function () {

    var childCount = $('.children-number').val();

    if (isNaN(childCount) == false && childCount > 0) {

        var childrenAges = '';

        for (i = 1; i <= childCount; i++) {

            childrenAges += '<div class="form-col"><label for="child-' + i + '-age">Child ' + i + '</label><input type="number" id="child-' + i + '-age" min="0" max="16" class="input-small child-age" onchange="updateChildAges()" ></div>';
        }

        $('#children-ages').html('<div class="form-row children-ages cf"><p>Age of children:</p>' + childrenAges + '</div>');
    }
    else {

        $('#children-ages').html('');
    }


});

function updateChildAges() {

    var ages = '';

    $('.child-age').each(function (index) {

        ages += $(this).val() + ',';

    });

    $('.all-children-ages').val(ages);
}



function addDestination() {

    var ddlDestination = '#searchByDestinationEnquiry';
    var ddlHotelItin = '#searchByHotelEnquiry';

    // First, see if we are trying to add a hotel/itinerary

    var destinationVal = $(ddlHotelItin).val();
    var controlId = ddlHotelItin;

    if (destinationVal == "" || destinationVal == "1") {
        // User hasn't chosen a value so see if they are adding a destination
        destinationVal = $(ddlDestination).val();
        controlId = ddlDestination;
    }

    if (destinationVal != "") {
        var destination = $(controlId + " option:selected").text();

        if (destination != '') {
            if ($('#destination-list').is(':hidden')) {
                $('#destination-list').show();
            }

            var destinationId = destination.replace(/[^\w\s]|_/g, '').replace(/\s+/g, '');

            // Ensure that we haven't have duplicates
            var exists = false;

            $('.destination-item').each(function () {
                if ($(this).text() == destination) {
                    exists = true;
                    return false;
                }
            });

            if (!exists) {
                if (controlId == ddlDestination) {
                    $('#selected-destinations').append('<li id="' + destinationId + '" onclick="removeDestination(this)" class="destination-item" data-type="destination">' + destination + '</li>');
                }
                else {
                    // When adding a hotel, we append an attribute to the list item so that we know it's a hotel
                    // this is used so we can correctly up the destination and hotel list for submission
                    $('#selected-destinations').append('<li id="' + destinationId + '" onclick="removeDestination(this)" class="destination-item" data-type="hotel">' + destination + '</li>');
                }

                $('.destination-value').val('');
                updateDestinationsList();
            }

            // Reset selected destination / hotel and clear the hotel list.
            $(controlId).val('0');

            if (controlId == ddlDestination) {
                $("#searchByHotelEnquiry").empty();
                $("#searchByHotelEnquiry").append($('<option></option>').attr("value", "").text("Select hotel/itinerary"));
            }
        }
    }
}


function removeDestination(destinationId) {

    $('#' + destinationId.id).remove();
    updateDestinationsList();
}

function updateDestinationsList() {

    var destinations = '';
    var hotels='';

    $('.destination-item').each(function (index) {
        if ($(this).data("type") == "destination") {
            destinations += $(this).text() + ',';
        }
        else {
            hotels += $(this).text() + ',';
        }
    });
    $('.destinations-list').val(destinations);
    $('.hotels-list').val(hotels);


    if ($('.destination-item').length == 0) {
        $('#destination-list').hide();
    }
}


function travelPlanner_addItem(objectId, objectType) {

    var url = "/Ajax/TravelPlanner.ashx?cmd=add-item&objectId=" + objectId + "&objectType=" + objectType;

    $.getJSON(url, function (result) {

        travelPlanner_updateItemCount(result.count);

        // Change message and link so the user knows it's already compared.
        var itemId = '#travelplanner-' + objectId;

        var oldUrl = $(itemId).attr('href');

        $(itemId).text('Added to Travel Planner');
        $(itemId).attr('href', '/mycarrier');

        $(itemId).removeClass('btn-plus');
        $(itemId).addClass('btn-tick');
    });
}


function travelPlanner_removeItem(itemId) {

    var url = "/Ajax/TravelPlanner.ashx?cmd=remove-item&itemId=" + itemId;

    $.getJSON(url, function (result) {

        travelPlanner_updateItemCount(result.count);
        window.location = "/mycarrier";
    });
}

function travelPlanner_updateItemCount(count) {

    var html = count > 0 ? "(" + count + ")" : "";

    $("#myCarrier-travelPlannerItemCount").html(html);
}

function comparison_addItemToCurrentComparison(itemId) {

    var url = "/Ajax/Comparison.ashx?cmd=add-item-to-current-comparison&itemId=" + itemId;

    $.getJSON(url, function (result) {

        compareRibbon_populate(result.comparison);
        comparison_updateCompareCount(result.comparison);
        compare_updateAddToCompareLink(itemId, true);
    });
}

function comparison_removeItemFromCurrentComparison(itemId) {

    var url = "/Ajax/Comparison.ashx?cmd=remove-item-from-current-comparison&itemId=" + itemId;

    $.getJSON(url, function (result) {

        comparison_updateCompareCount(result.comparison);
        compare_updateAddToCompareLink(itemId, false);
    });

    compareRibbon_removeItem(itemId);
}

function comparison_addCurrentComparisonToTravelPlanner(itemId) {

    var url = "/Ajax/Comparison.ashx?cmd=add-current-comparison-to-travel-planner";

    $.getJSON(url);
}

function comparison_updateCompareCount(comparison) {

    $("#bc-compare").html("Compare + " + comparison.items.length);
}

function compare_updateAddToCompareLink(itemId, added) {

    var element = $(".add-to-compare-link-" + itemId);
    element.removeClass("btn-plus");
    element.removeClass("btn-tick");

    if (added) {
        element.addClass("btn-tick");
        element.html("Added to compare");
        element.attr("href", "javascript:comparison_removeItemFromCurrentComparison(" + itemId + ")");
    } else {
        element.addClass("btn-plus");
        element.html("Add to compare");
        element.attr("href", "javascript:comparison_addItemToCurrentComparison(" + itemId + ")");
    }
}

function compareRibbon_populate(comparison) {

    if (!compareRibbonn_isPresent())
        return;

    var itemTemplateHtml = $("#compareRibbonItemTemplate").html();

    var carouselItemsHtml = "";

    for (var i = 0; i < comparison.items.length; i++) {

        var item = comparison.items[i];

        var itemHtml = itemTemplateHtml
            .replace(/{id}/g, item.id)
            .replace(/{name}/g, item.name)
            .replace(/{areaName}/g, item.areaName)
            .replace(/{imageUrl}/g, item.imageUrl)
            .replace(/{text}/g, item.text);

        carouselItemsHtml += itemHtml;
    }

    $("#compare-ribbon .carousel .item-wrapper").html(carouselItemsHtml);
    compareRibbon_showHideNoItemsMessage();
}

function compareRibbon_removeItem(itemId) {

    if (!compareRibbonn_isPresent())
        return;

    var itemElement = $("#compare-ribbon .carousel .compare-item-" + itemId);

    itemElement.fadeOut(500, function () {
        itemElement.animate({
            width: 0
        }, 300, function () {
            itemElement.remove();
            compareRibbon_showHideNoItemsMessage();
        });
    });
}

function compareRibbon_showHideNoItemsMessage() {

    var itemCount = $("#compare-ribbon .carousel .item").size();

    if (itemCount == 0) {

        $("#compare-ribbon .carousel .item-wrapper").html("<h2 class=\"no-compare\">There are no items to compare</h2>");
    }

    $("#compare-btn").toggle(itemCount > 0);
}

function compareRibbonn_isPresent() {

    return $("#compare-ribbon").size() == 1;
}

/*function travelPlanner_showSessionCount() {
    var url = "/Ajax/TravelPlanner.ashx";

    var reqUrl = "/Ajax/TravelPlanner.ashx?" + "cmd=get-count";

    $.ajax({
        type: 'Get',
        url: reqUrl,
        success: function (data) {
            if (data != "0") {
                $('#myCarrier-count').text("(" + data + ")");
            }
            else {
                $('#myCarrier-count').text("");
            }
        },
        error: function (e) {
        }
    });

}*/



function myCarrierCheckbox() {

    // Awful ugly code

    var url = "/mycarrier";

    var cbHotels = document.getElementById('tp-hotels');
    var cbDestinations = document.getElementById('tp-destinations');
    var cbInspirations = document.getElementById('tp-inspirations');
    var cbItineraries = document.getElementById('tp-itineraries');
    var cbCompare = document.getElementById('tp-compare');
    var cbOffers = document.getElementById('tp-offers');

    filterList = "";

    if (!cbHotels.checked) {
        filterList += "2,";
    }

    if (!cbDestinations.checked) {
        filterList += "1,";
    }

    if (!cbInspirations.checked) {
        filterList += "4,";
    }

    if (!cbItineraries.checked) {
        filterList += "3,";
    }

    if (!cbCompare.checked) {
        filterList += "7,";
    }

    if (!cbOffers.checked) {
        filterList += "5,";
    }

    if (filterList != "") {
        filterList = filterList.slice(0, filterList.length - 1);
        window.location = "/mycarrier?filterList=" + filterList;
    }
    else {
        window.location = "/mycarrier";
    }
}
// Sets the panel to fill the entire screen
function fullScreenPanel() {
    $('.full-screen').each(function () {
        var $elem = $(this),
        winH = $(window).height(),
        spacer = $(".fixed-wrapper, #banner-wrapper").height();

    if ($("> a.block", this).length) {
        $elem = $("> a.block", this)
    }
    if ($(".fixed-wrapper").length > 0 || $("#banner-wrapper").length > 0) {
        $elem.css({
        height: winH - spacer
    })
    } else {
        $elem.css({
        height: winH
    })
    }
 });
}
// Grayscale w canvas method
function grayscale(src){
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    var imgObj = new Image();
    imgObj.src = src;
    canvas.width = imgObj.width;
    canvas.height = imgObj.height; 
    ctx.drawImage(imgObj, 0, 0); 
    var imgPixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
    for(var y = 0; y < imgPixels.height; y++){
        for(var x = 0; x < imgPixels.width; x++){
            var i = (y * 4) * imgPixels.width + x * 4;
            var avg = (imgPixels.data[i] + imgPixels.data[i + 1] + imgPixels.data[i + 2]) / 3;
            imgPixels.data[i] = avg; 
            imgPixels.data[i + 1] = avg; 
            imgPixels.data[i + 2] = avg;
        }
    }
    ctx.putImageData(imgPixels, 0, 0, 0, 0, imgPixels.width, imgPixels.height);
    return canvas.toDataURL();
}
function moodboardLayout(){
    $('.panel-moodboard li').each(function(){
        $('div', this).width($('img', this).width());
    });
}
function setMoodboardHeight(){
    $('.panel-moodboard li').each(function(){
        if($('html').hasClass('ie7')){
            $('span',this).addClass('centered').css({
                height:$('img',this).height() - 52
            });
        }else{
            $('span',this).addClass('centered').css({
                height:$('img',this).height() - 12
            });
        }
    });
}




// jump to link

$(window).load(function() {

    $('.jump-link').click(function() {
        $(this).parents('.jump-to').find('.drop').removeClass('active');
        $(this).parents('.jump-to').find('ul').slideUp(200);
    });



    // A function for detecting the viewport minimum width.
    // You could use a similar function for minimum height if you wish.
    var min_width;
    if (Modernizr.mq('(min-width: 0px)')) {
        // Browsers that support media queries
        min_width = function (width) {
            return Modernizr.mq('(min-width: ' + width + ')');
        };
    }
    else {
        // Fallback for browsers that does not support media queries
        min_width = function (width) {
            return $(window).width() >= width;
        };
    }



    if (min_width('1025px')) {


        $('.jump-link').on('click', function (e) {

            var clicked = e.target.id;
            var elemId = clicked.replace("local-", "#l");

            //switch (e.target.id) {
            //case "local-1":
            //    elemId = "#l1";
            //    break;
            //case "local-2":
            //    elemId = "#l2";
            //    break;
            //case "local-3":
            //    elemId = "#l3";
            //    break;
            //case "local-4":
            //    elemId = "#l4";
            //    break;
            //}

            $('.panel-local-content').animate({
                scrollTop: $(elemId).parent().scrollTop() + $(elemId).offset().top - $(elemId).parent().offset().top
            }, {
                duration: 1000,
                specialEasing: {
                    width: 'linear',
                    height: 'easeOutBounce'
                },
                complete: function (e) {
                    //console.log("animation completed");
                }
            });
            e.preventDefault();
        });

    }

    else {

        $('.jump-link').click(function () {
            var elem = $(this).attr('href');
            $('.jump-link.active').removeClass('active');
            $(this).addClass('active');
            $('.panel-local-section.active').removeClass('active');
            $(elem).addClass('active');

            $('html,body').animate({
                scrollTop: $(elem).offset().top - 100
            });

            return false;
        });

    }

}); 




