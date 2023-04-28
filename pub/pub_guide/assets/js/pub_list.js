/* --------------------------------------------------------------- *
 * @version : 2.1
 * @date : 2022.08.12
 * @description : 다올저축은행 모바일 퍼블리스트 Script
 * --------------------------------------------------------------- */

var DAOL_MOBILE = (function (daol, $) {
    daol.guide = {
        init: function() {
            // 페이지 수 체크
            this.setProgress();
        
            // Set UI component Preview with github
            this.setPreview();
            this.work.init();
            this.modify();
        },
        
        setProgress: function() {
            var totalPage = $('.progress-count .count-total'),
                    completePage = $('.progress-count .count-complete'),
                    holdPage = $('.progress-count .count-hold'),
                    deletePage = $('.progress-count .count-delete'),
                    progressRate = $('.progress-count .progress-rate'),
                    findAll = $('.guide-box > table tbody tr').length,
                    findComplete = $('tr.complete').length,
                    findHold = $('tr.hold').length,
                    findDelete = $('tr.delete').length,
                    findProgress = findAll - findHold - findDelete;

            totalPage.text(findAll + 'p');
            completePage.text(findComplete);
            holdPage.text(findHold);
            deletePage.text(findDelete);

            progressRate.text(Math.floor((findComplete/findProgress)*100) + '%');
        },
        
        setPreview: function() {
            var $docPreview = $('.doc-preview');

            $docPreview.each(function () {
            var $this = $(this),
                    $previewArea = $this.closest('.doc-preview-area'),
                    sourceReplace = daol.guide.htmlBeautifier($this.html());
                    $previewArea.append('<div class="doc-code"><pre><code class="html"></code></pre></div>');
                    $previewArea.find('code').text(sourceReplace);
            });

            if($('.guide-list').length) return;
            hljs.initHighlightingOnLoad();
        },
        htmlBeautifier: function(html) {
            function parse(html, tab = 0) {
                var tab;
                var html = $.parseHTML(html);
                var beautifierHtml = new String();
                function setTabs() {
                    var tabs = new String();
                    for (i = 0; i < tab; i++){
                        tabs += '    ';
                    }
                    return tabs;
                }
                $.each(html, function (i, el) {
                    if (el.nodeName == '#text') {
                        if (($(el).text().trim()).length) {
                            beautifierHtml += setTabs() + $(el).text().trim() + '\n';
                        }
                    } else {
                        var innerHTML = $(el).html().trim();
                        $(el).html(innerHTML.replace('\n', '').replace(/ +(?= )/g, ''));
                        if ($(el).children().length) {
                            $(el).html('\n' + parse(innerHTML, (tab + 1)) + setTabs());
                            var outerHTML = $(el).prop('outerHTML').trim();
                            beautifierHtml += setTabs() + outerHTML + '\n';
                        } else {
                            var outerHTML = $(el).prop('outerHTML').trim();
                            beautifierHtml += setTabs() + outerHTML + '\n';
                        }
                    }
                });
                return beautifierHtml;
            }
            return parse(html.replace(/(\r\n|\n|\r)/gm, ' ').replace(/ +(?= )/g, ''));
        },

        work: {
            
            init: function(){
                this.set()
                this.evt()
            },
            evt : function(){
                $('.scroll-container li > a').on('click', function(){
                    var href = $(this).attr('href').substr(1);
                    $(this).closest('li').addClass('active').siblings().removeClass('active')
                    
                    $('.item-wrap .item > h2').each(function(){
                        var top = $(this).offset().top;
                        var id = $(this).attr('id');
                        
                        if(href == id){
                            $('html, body').animate({ scrollTop : top - 50}, 300);
                            $(this).addClass('active');
                        }else {
                            $(this).removeClass('active')
                        }
                    })
                });
                $(window).on('scroll', function(){
                    var scrollTop = $(this).scrollTop()
                    if(scrollTop >= 350) {
                        $('.quick-menu').show()
                    }else {
                        $('.quick-menu').hide()
                    }
                });

                $('.quick-menu button').on('click', function(){
                    $('html, body').stop().animate({scrollTop: 0}, 300)
                })
            },
            
            set : function(){
                $('.guide-nav').find('ul > li ').each(function(i){
                    i += 1;
                    el = `<span>${i} . </span>`
                    if(9 < i ) {
                        $(this).children().prepend(el)
                    }else {
                        $(this).children().prepend(`0${el}`)
                    }
                });

                $('.list .guide-box > table tbody tr').each(function(i){
                    var link = $(this).children(':eq(2)').children('a').attr('href')
                    var words= (link||'').split('/');  // 값이 undifind 로 반환될 때 에러가 나는 것을 방지.
                    var last = words[words.length - 1];

                    i += 1;
                    el = `<span>${i}</span>`

                    if(9 < i ) {
                        $(this).children(':first-of-type').prepend(el)
                    }else {
                        $(this).children(':first-of-type').prepend(`0${el}`)
                    }
                    
                    // console.log(last)
                    $(this).children(':eq(2)').children('a').text(last)
                });
            }
           

        },
        modify:function(){
           $(document).on( 'click', '.memo-box .title button', function(){
                if($(this).text() == '열기') {
                    $(this).text('닫기')
                    $(this).closest('.title').next().slideDown();
                }else {
                    $(this).text('열기')
                    $(this).closest('.title').next().slideUp();
                }
            });
            $('.modify dd a').each(function(){
                var link = $(this).attr('href')
                $(this).text(link);
            });
        }
    }

    daol.guide.init();
    return daol;
}(window.DAOL_MOBILE || {}, jQuery));