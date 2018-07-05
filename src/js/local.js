$(document).ready(function () {
    var body = $('body');

    body.on('click', '.accordion-head__item', function (event) {
        event.preventDefault();
        var id = $(this).attr('href');
        topr = $(id).offset().top - 40;
        $('body,html').animate({scrollTop: topr}, 1500);

    });

    body.on('click', '.js-table', function(){
        event.preventDefault();
        body.append($('.ranking-table'));
        $('.ranking-table').addClass('show');
        body.scrollTop(0);
        $('.page__wrap').hide();

        return false

    });

    body.on('click', '.mobile-only-close', function () {
        $('.ranking-table').removeClass('show');
        $('.js-before_table').after($('.ranking-table'));
        $('.page__wrap').show();
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

    body.on('click', '.map__btn', function (event) {
        event.preventDefault();
        if ($(this).siblings('.map__btn-container').hasClass('visible')) {
            $(this).siblings('.map__btn-container').removeClass('visible');
        }
        else {
            $('.map__btn-container').removeClass('visible');
            $(this).siblings('.map__btn-container').addClass('visible');
        }
    });

    body.mouseup(function(event) {
        if ($('.map__btn-wrapper').has(event.target).length === 0) {
            $('.map__btn-container').removeClass('visible');
        }
    });

    body.on('focus', '#copyTarget', function(event){
        $(this).select();
    });

    function copyToClipboard(element) {
        var $temp = $("<input>");
        $("body").append($temp);
        $temp.val($(element).text()).select();
        document.execCommand("copy");
        $temp.remove();
    };

    body.on('click', '#copyButton', function() {
        copyToClipboard($('#copyTarget'));
    });
    body.on('click', '.btn-go-back', function() {
        $('.ranking-table__container').css('height', 'auto');
        $('.btn-container--show-full').hide();
    });

    body.on('click', '.ranking-table__hint', function () {
        $(this).css('display', 'none');
    });

    body.on('click', '.table-sort', function () {
        var $rows = $('.ranking-table--data tr').splice(1);
        var $index = $(this).data('index');

        var descend = true;

        if ($(this).hasClass('table-sort--down')) {
            $('.table-sort').removeClass('table-sort--down table-sort--top');
            descend = false;
            $(this).addClass('table-sort--top')
        } else {
            $('.table-sort').removeClass('table-sort--down table-sort--top');
            $(this).addClass('table-sort--down');
        }

        var parseFloatText = function (item) {
            return parseFloat(item);
        };

        var sortFunc = function (a, b) {
            var left = $(a).find('td')[$index];
            left = $(left).text();
            if (parseFloatText(left)) {
                left = parseFloatText(left);
            } else if (left.includes('$')) {
                left = left.split('$')[1];
                if (left.includes(',')) {
                    left = left.replace(/,/g, '');
                }
                left = parseFloatText(left);
            } else if (left.includes('%')) {
                left = left.split('$')[0];
                left = parseFloatText(left);
            }
            var right = $(b).find('td')[$index];
            right = $(right).text();
            if (parseFloatText(right)) {
                right = parseFloatText(right);
            } else if (right.includes('$')) {
                right = right.split('$')[1];
                if (right.includes(',')) {
                    right = right.replace(/,/g, '');
                }
                right = parseFloatText(right);
            } else if (right.includes('%')) {
                right = right.split('$')[0];
                right = parseFloatText(right);
            }
            if (descend) {
                if (left > right) {
                    return 1
                } else {
                    return -1;
                }

            } else {
                if (left < right) {
                    return 1
                } else {
                    return -1;
                }
            }
        }

        $rows.sort(sortFunc);

        var $mobileRows = $('.ranking-table--fixed tr').splice(1);
        for (var i = 0; i < $mobileRows.length; i++) {
            $($mobileRows[i]).find('td').first().text($($rows[i]).find('td').first().text());
        }
        $('.ranking-table--data tbody').html($rows);
    });

    body.on('click', '.table_sort', function () {
        var $rows = $('.table-overall tbody tr').splice(0);
        var $index = $(this).data('index');

        var descend = true;

        if ($(this).hasClass('table_sort--down')) {
            $('.table_sort').removeClass('table_sort--down table_sort--top');
            descend = false;
            $(this).addClass('table_sort--top')
        } else {
            $('.table_sort').removeClass('table_sort--down table_sort--top');
            $(this).addClass('table_sort--down');
        }

        var parseFloatText = function (item) {
            return parseFloat(item);
        };

        var sortFunc = function (a, b) {
            var left = $(a).find('td')[$index];
            left = $(left).text();
            left = parseFloatText(left);
            if (parseFloatText(left)) {
                left = parseFloatText(left);
            } else if (left.includes('$')) {
                left = left.split('$')[1];
                if (left.includes(',')) {
                    left = left.replace(/,/g, '');
                }
                left = parseFloatText(left);
            }
            var right = $(b).find('td')[$index];
            right = $(right).text();
            right = parseFloatText(right);
            if (parseFloatText(right)) {
                right = parseFloatText(right);
            } else if (right.includes('$')) {
                right = right.split('$')[1];
                if (right.includes(',')) {
                    right = right.replace(/,/g, '');
                }
                right = parseFloatText(right);
            }
            if (descend) {
                if (left > right) {
                    return 1
                } else {
                    return -1;
                }

            } else {
                if (left < right) {
                    return 1
                } else {
                    return -1;
                }
            }
        }

        $rows.sort(sortFunc);

        $('.table-overall tbody').html($rows);
    });

});