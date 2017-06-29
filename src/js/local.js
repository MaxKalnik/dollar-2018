/**
 * Created by sergeybytchok on 2/24/17.
 */
$(document).ready(function () {
    var body = $('body');

    body.on('click', '.accordion-head__item', function (event) {
        event.preventDefault();
        var id = $(this).attr('href');
        topr = $(id).offset().top - 40;
        $('body,html').animate({scrollTop: topr}, 1500);

    });

    body.on('click', '.js-table', function () {
        body.append($('.table-overall__wrap'));
        body.scrollTop(0);
        $('.page__wrap').hide();
        $('.table-overall__wrap').addClass('show');

        return false
    });

    body.on('click', '.mobile-only-close', function () {
        $('.article-table').removeClass('show');
        $('.js-before_table').after($('.article-table'));
        $('.page__wrap').show();
        var top = $('.table-short').position().top;
        body.scrollTop(top);
        return false

    });

    body.on('click', '.js-more_article', function(){

        $(this).hide().siblings('.author-article').toggleClass('close')
    });

    body.on('click', '.icon-hint', function(event) {
       $(this).next('.table-hint').toggleClass('table-hint--closed')

    });

    body.on('click', '.table-hint', function() {
        $('.table-hint').addClass('table-hint--closed')

    });

    body.on('click', '.info-hint', function () {
        $(this).hide();
        return false
    }) ;

    body.on('click', '.overall__hint', function () {
        $(this).hide();
        return false
    }) ;
    body.on('click', '.table_show__link', function () {
        $(".article-table").removeClass('table-short');
        return false
    })

    function topMenu() {
        if ($(window).width() < 959) {

            body.on('click', '.top-menu__link.active', function () {
                $(this).parents('.top-menu__wrap').toggleClass('open');
                return false
            });

            /*$('.top-menu__wrap.open').on('click', function(){
             $('.top-menu__wrap').removeClass('open');
             return false
             })*/
        }

    }

    topMenu();
    $(window).on('resize', function () {
        topMenu();
    });


    body.on('click', '.table_sort', function () {
        var that = $(this);
        var index = that.data('index');
        var $items = $('.table-overall tr').splice(1);
        var revers = false;

        if (that.hasClass('down')) {
            $('.table_sort').removeClass('down top');
            revers = true;
            that.addClass('top');
        } else {
            $('.table_sort').removeClass('down top');
            that.addClass('down');
        }

        $items.sort(function (a, b) {

            var a_tst = $(a).find('td')[index];
            a_tst = parseFloat($(a_tst).text());
            var b_tst = $(b).find('td')[index];
            b_tst = parseFloat($(b_tst).text());

            if (revers) {
                if (a_tst < b_tst) {
                    return 1;
                }
                if (a_tst > b_tst) {
                    return -1;
                }
            } else {
                if (a_tst > b_tst) {
                    return 1;
                }
                if (a_tst < b_tst) {
                    return -1;
                }
            }
            return 0;

        });
        for(i = 0; i<$items.length; i++){
            $($items[i]).find('td').first().text(i+1);
        }
        $(".table-overall tbody").html($items);

    });

});