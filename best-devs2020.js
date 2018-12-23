(function() {
  window.fa_ajax_search = {
    input_fields : 'input[name="search_keywords"]', // input elements you want to enable ajax searching on
 
    delay : 100, // delay before sending search
 
    // language settings
    lang : {
      title : 'نتائج البحث',
      searching : 'جار البحث عن مواضيع عن "{KEYWORDS}"...',
      no_results : 'لم يتم العثور على نتائج عن "{KEYWORDS}"',
      view_all : 'عرض جميع النتائج',
      close : 'اغلاق'
    },
 
 
    // wait before sending the search
    queue : function (caller) {
      fa_ajax_search.clear(); // clear ongoing searches
 
      fa_ajax_search.wait = window.setTimeout(function() {
        fa_ajax_search.query(caller);
      }, fa_ajax_search.delay);
    },
 
 
    // create the search result popup
    createPopup : function (caller) {
      if (!fa_ajax_search.popup) {
        var popup = document.createElement('DIV');
 
        popup.className = 'fa_ajax_search-results';
        popup.innerHTML =
          '<a href="javascript:fa_ajax_search.clear();" class="fa_ajax_search-close" title="' + fa_ajax_search.lang.close + '">X</a>'+
          '<div class="fa_ajax_search-title">' + fa_ajax_search.lang.title + '</div>'+
          '<ul class="fa_ajax_search-topics"></ul>'+
          '<p style="text-align:center;">'+
            '<a href="#" class="button1">' + fa_ajax_search.lang.view_all + '</a>'+
          '</p>';
 
        fa_ajax_search.popup = popup;
      }
 
      fa_ajax_search.popup.getElementsByTagName('UL')[0].innerHTML = '<li>' + fa_ajax_search.lang.searching.replace('{KEYWORDS}', caller.value) + '</li>';
      fa_ajax_search.popup.lastChild.getElementsByTagName('A')[0].href = fa_ajax_search.url(caller);
      caller.parentNode.appendChild(fa_ajax_search.popup);
    },
 
 
    // submit a search
    query : function (caller) {
      fa_ajax_search.createPopup(caller);
 
      fa_ajax_search.request = $.get(fa_ajax_search.url(caller), function(d) {
        fa_ajax_search.showResults(caller, $('.topic-title', d));
      });
    },
 
 
    // create and return the search URL
    url : function (caller) {
      var form = $(caller).closest('form')[0],
          where = form ? form.search_where : null;
 
      return '/search?search_keywords=' + encodeURIComponent(caller.value) + '*' + ( where ? '&search_where=' + where.value : '' );
    },
 
 
    // show the results in the popup
    showResults : function (caller, results) {
      var i = 0,
          j = results.length,
          list = fa_ajax_search.popup.getElementsByTagName('UL')[0],
          frag = document.createDocumentFragment(),
          li;
 
      if (j) {
        for (; i < j; i++) {
          li = document.createElement('LI');
 
          results[i].href = results[i].href.replace(/%2A$/, '');
 
          li.appendChild(results[i]);
          frag.appendChild(li);
        }
 
        list.innerHTML = '';
        list.appendChild(frag);
      } else {
        list.innerHTML = '<li>' + fa_ajax_search.lang.no_results.replace('{KEYWORDS}', caller.value) + '</li>';
      }
    },
 
 
    // initialize the selected input(s)
    init : function (node) {
      $(node).keyup(function() {
        if (this.value.length >= 3) {
          fa_ajax_search.queue(this);
        } else {
          fa_ajax_search.clear();
        }
      }).attr('autocomplete', 'off');
    },
 
 
    // clear and abort ongoing searches
    clear : function () {
      if (fa_ajax_search.wait) {
        window.clearTimeout(fa_ajax_search.wait);
        delete fa_ajax_search.wait;
      }
 
      if (fa_ajax_search.request) {
        fa_ajax_search.request.abort();
        delete fa_ajax_search.request;
      }
 
      if (fa_ajax_search.popup && fa_ajax_search.popup.parentNode) {
        fa_ajax_search.popup.parentNode.removeChild(fa_ajax_search.popup);
      }
    }
  };
 
 
  // search result styles
  $('head').append(
    '<style type="text/css">'+
      '.fa_ajax_search-results {'+
        'font-family:arial, verdana, sans-serif;'+
        'font-size:12px;'+
        'text-align:left;'+
        'white-space:normal;'+
        'background:#FFF;'+
        'border:1px solid #CCC;'+
        'box-shadow:0 6px 12px rgba(0, 0, 0, 0.175);'+
        'margin-top:3px;'+
        'position:absolute;'+
        'z-index:1;'+
      '}'+
 
      '.fa_ajax_search-title {'+
        'color:#FFF;'+
        'background:#69C;'+
        'font-size:16px;'+
        'height:25px;'+
        'line-height:25px;'+
        'margin:-1px -1px 0 -1px;'+
        'padding:0 40px 0 6px;'+
      '}'+
 
      '.fa_ajax_search-results a.fa_ajax_search-close {'+
        'color:#FFF !important;'+
        'background:none;'+
        'display:block;'+
        'position:absolute;'+
        'top:-1px;'+
        'right:-1px;'+
        'text-align:center;'+
        'text-decoration:none !important;'+
        'font-size:18px;'+
        'line-height:25px;'+
        'height:25px;'+
        'width:35px;'+
        'margin:0 !important;'+
        'padding:0 !important;'+
      '}'+
 
      '.fa_ajax_search-results a.fa_ajax_search-close:hover { background:#F33 !important; }'+
 
      '.fa_ajax_search-results > p { padding:3px; }'+
 
      '.fa_ajax_search-topics {'+
        'width:100%;'+
        'max-height:300px;'+
        'overflow-y:auto;'+
        'overflow-x:hidden;'+
      '}'+
 
      '.fa_ajax_search-topics {'+
        'color:#333;'+
        'border-top:1px solid #CCC;'+
        'border-bottom:1px solid #CCC;'+
        'padding:0 !important;'+
      '}'+
 
      '.fa_ajax_search-topics li {'+
        'padding:3px;'+
        'display:block !important;'+
        'line-height:14px !important;'+
        'margin:0 !important;'+
      '}'+
 
      '.fa_ajax_search-topics li:nth-child(even) { background:rgba(0, 0, 0, 0.05); }'+
      '.fa_ajax_search-topics li:nth-child(odd) { background:rgba(0, 0, 0, 0.1); }'+
 
      '.fa_ajax_search-topics a.topictitle, #ipbwrapper .fa_ajax_search-results > p > a {'+
        'font-size:12px;'+
        'font-weight:normal !important;'+
        'padding:0 !important;'+
        'background:none !important;'+
      '}'+
    '</style>'
  );
 
 
  // wait for the document to be ready before initializing
  $(function() {
    fa_ajax_search.init(fa_ajax_search.input_fields);
  });
 
}());                   
                    
$(function() {
    if ($.sceditor) {
        $.sceditor.command.set('inline-code', {
            exec: function() {
                this.insert('[table class="inline-code"][tr][td][code]', '[/code][/td][/tr][/table]')
            },
            txtExec: function() {
                this.insert('[table class="inline-code"][tr][td][code]', '[/code][/td][/tr][/table]')
            },
            tooltip: 'ادراج مقتطف من الكود'
        });
        toolbar = toolbar.replace(/code/, 'code,inline-code')
    }
});
document.write('<style type="text/css">.inline-code,.inline-code *{display:inline-block!important; vertical-align: middle;} #mpage-body .inline-code .codebox p,.inline-code .codebox dt{display:none!important}.inline-code .codebox code{padding:0!important;margin:0;border:none;background:0 0}.sceditor-button-inline-code:after { content: "\\f0c4"; }</style>');
$(function() {
    var options = {
            animation: 'fade',
            arrow: true,
            speed: 300,
            delay: 100,
            onlyOne: true,
            theme: 'tooltipster-default'
        },
        queue = true,
        titles, parse = function() {
            titles = $('[title]');
            titles.tooltipster && titles.not('[title=""], .mentiontag, .tooltipstered').tooltipster(options)
        };
    queue ? $(parse) : parse()
});
(function() {
    var html_page = 'h7-Login',
        link_change = true,
        redirect = true;
    $(function() {
        var regex = new RegExp(html_page);
        if (link_change && !regex.test(window.location.href)) {
            $('a[href^="/login"], a[href^="http://' + window.location.host + '/login"]').attr('href', html_page)
        }
        if (!document.getElementById('fa_form_container') && regex.test(window.location.href)) {
            window.location.href = '/login#login_classic'
        }
    });
    if (/\/login\?redirect/.test(window.location.href)) {
        my_setcookie('fa_login_form_redirect', window.location.search.replace(/.*?redirect=(.*?)(?:&|$)/, '$1'))
    }
    if (redirect && /\/login/.test(window.location.href)) {
        if (/login_classic/.test(window.location.hash) || /admin=1/.test(window.location.href)) return;
        window.location.href = html_page
    }
}());
(function() {
    'DEVELOPED BY ANGE TUTEUR';
    'NO DISTRIBUTION WITHOUT CONSENT OF THE AUTHOR';
    'ORIGIN : http://fmdesign.forumotion.com/t544-image-resizer#8305';
    window.fa_img_resizer = {
        max_width: 100,
        max_height: 400,
        selector: '.tuto-content img, .post-content img, .mod_news img, .message-text img',
        options: {
            bar: true,
            toggler: true,
            full_size: true,
            download: true,
            lightbox: true
        },
        lang: {
            full_size: '<i class="fas fa-external-link-alt"></i>',
            enlarge: '<i class="fa fa-search-plus"></i>',
            reduce: '<i class="fa fa-search-minus"></i>',
            download: '<i class="fa fa-download"></i>',
            tooltip: 'اضغط لعرض الصورة بالكامل'
        },
        resize: function() {
            for (var a = $(fa_img_resizer.selector).not('.mention-ava'), i = 0, j = a.length; i < j; i++) {
                if (!a[i].alt && (a[i].naturalWidth > fa_img_resizer.max_width || a[i].naturalHeight > fa_img_resizer.max_height)) {
                    a[i].className += ' fa_img_reduced';
                    if (fa_img_resizer.options.lightbox && a[i].parentNode.tagName != 'A') {
                        a[i].style.cursor = 'pointer';
                        a[i].title = fa_img_resizer.lang.tooltip;
                        a[i].onclick = function() {
                            fa_img_resizer.lightbox(this)
                        }
                    }
                    if (fa_img_resizer.options.bar) {
                        (a[i].parentNode.tagName == 'A' ? a[i].parentNode : a[i]).insertAdjacentHTML('beforebegin', '<div class="fa_img_resizer">' + (fa_img_resizer.options.toggler ? '<a class="fa_img_enlarge" href="#" onclick="fa_img_resizer.toggle(this); return false;">' + fa_img_resizer.lang.enlarge + '</a>' : '') + (fa_img_resizer.options.full_size ? '<a class="fa_img_full" href="/viewimage.forum?u=' + a[i].src + '" target="_blank">' + fa_img_resizer.lang.full_size + '</a>' : '') + (fa_img_resizer.options.download && !/Firefox/.test(navigator.userAgent) && 'download' in document.createElement('A') ? '<a class="fa_img_download" href="' + a[i].src + '" target="_blank" download>' + fa_img_resizer.lang.download + '</a>' : '') + '</div>')
                    }
                }
            }
        },
        toggle: function(that) {
            var img = that.parentNode.nextSibling;
            if (img.tagName == 'A') {
                img = img.getElementsByTagName('IMG')[0]
            }
            if (/fa_img_reduced/.test(img.className)) {
                that.innerHTML = fa_img_resizer.lang.reduce;
                that.className = 'fa_img_reduce';
                img.className = img.className.replace(/fa_img_reduced/, 'fa_img_enlarged')
            } else {
                that.innerHTML = fa_img_resizer.lang.enlarge;
                that.className = 'fa_img_enlarge';
                img.className = img.className.replace(/fa_img_enlarged/, 'fa_img_reduced')
            }
            that.parentNode.style.width = img.width - 8 + 'px'
        },
        lightbox: function(that) {
            var frag = document.createDocumentFragment(),
                overlay = $('<div id="fa_img_lb_overlay" />')[0],
                img = $('<img id="fa_img_lb_image" src="' + that.src + '" />')[0];
            overlay.onclick = fa_img_resizer.kill_lightbox;
            img.onclick = fa_img_resizer.kill_lightbox;
            frag.appendChild(overlay);
            frag.appendChild(img);
            document.body.appendChild(frag);
            document.body.style.overflow = 'hidden';
            img.style.marginTop = '-' + (img.height / 2) + 'px';
            img.style.marginLeft = '-' + (img.width / 2) + 'px'
        },
        kill_lightbox: function() {
            var overlay = document.getElementById('fa_img_lb_overlay'),
                img = document.getElementById('fa_img_lb_image');
            overlay && document.body.removeChild(overlay);
            img && document.body.removeChild(img);
            document.body.style.overflow = ''
        }
    };
    document.write('<style type="text/css">' + fa_img_resizer.selector + ', .fa_img_reduced { max-width:' + fa_img_resizer.max_width + '%; max-height:' + fa_img_resizer.max_height + 'px; }' + '.fa_img_enlarged { max-width:100% !important; max-height:100% !important; }' + '.fa_img_resizer { width: 70px; font-size:12px; text-align:center; padding:3px; margin:3px auto; background:#FFF; border:1px solid #CCC; }' + '.fa_img_resizer a { margin:0 3px; }' + '.fa_img_resizer i { font-size:14px; vertical-align:middle; }' + '#fa_img_lb_overlay { background:rgba(0, 0, 0, 0.7); position:fixed; top:0; right:0; bottom:0; left:0; z-index:999999; cursor:pointer; }' + '#fa_img_lb_image { max-height:100%; max-width:100%; position:fixed; left:50%; top:50%; z-index:9999999; cursor:pointer; }' + '</style>' + (!$('link[href$="font-awesome.min.css"]')[0] ? '<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.1/css/font-awesome.min.css" />' : ''));
    $(window).load(fa_img_resizer.resize);
    if (window.resize_images) {
        window.resize_images = function() {
            return false
        }
    }
}());

function fa_initForumModules(column_id) {
    var column = document.getElementById(column_id),
        menu;
    if (column) {
        column.insertAdjacentHTML('afterbegin', '<div class="title module_column_title">قائمة جانبية</div>');
        menu = document.createElement('SPAN');
        menu.className = 'widget_menu column_button_' + column_id + '';
        menu.onclick = function() {
            var column = document.getElementById(/left/.test(this.className) ? 'left' : 'right');
            $([this, column])[/active/.test(this.className) ? 'removeClass' : 'addClass']('active');
            return false
        };
        document.body.appendChild(menu)
    }
};
document.write('<style type="text/css">' + '.module_column, .widget_menu { z-index:30000; }' + '.module_column.active, .widget_menu.active { z-index:99999; }' + '</style>');
$.getScript('https://cdn.jsdelivr.net/clipboard.js/1.5.16/clipboard.min.js', function() {
    window.fae_copyCode = {
        copy: 'نسخ الكود',
        copied: 'تم النسخ !'
    };
    $(function() {
        var a = $('.codebox p'),
            i = 0,
            j = a.length;
        if (a[0]) {
            $('head').append('<style type="text/css">.fae_copy-code{color:#FFF;float:left;cursor:pointer}.fae_copy-code:before{content:"\\f0ea";font-size:13px;font-family:FontAwesome;text-align:center;color:#69C;background:#FFF;border-radius:100%;display:inline-block;width:19px;height:19px;line-height:19px;margin:-1px 3px 0 3px}.codebox .fae_copy-code:hover:before{color:#EB5}.codebox .fae_copy-code.fae_copied:before{content:"\\f00c";font-weight:700;color:#8B5}</style>');
            for (; i < j; i++) {
                a[i].insertAdjacentHTML('beforeend', '<span class="fae_copy-code">' + fae_copyCode.copy + '</span>')
            }
            new Clipboard('.fae_copy-code', {
                target: function(copy) {
                    if (copy.innerHTML != fae_copyCode.copied) {
                        return $(copy).closest('.codebox').find('code')[0]
                    }
                }
            }).on('success', function(e) {
                var copy = e.trigger;
                if (copy.innerHTML != fae_copyCode.copied) {
                    copy.innerHTML = fae_copyCode.copied;
                    copy.className += ' fae_copied';
                    window.setTimeout(function() {
                        copy.innerHTML = fae_copyCode.copy;
                        copy.className = copy.className.replace('fae_copied', '')
                    }, 1000)
                }
                e.clearSelection()
            })
        }
    })
});
(function() {
    if (/msie/i.test(window.navigator.userAgent)) return;
    if (!window.fa_night_mode && typeof document.getElementsByTagName('HEAD')[0].style.pointerEvents === 'string') {
        window.fa_night_mode = {
            targets: ['night-mod', 'pun-foot', 'ipbwrapper'],
            dimLight: function() {
                var val = +fa_night_mode.dimmer.value;
                fa_night_mode.shade.style.backgroundColor = 'rgba(0, 0, 0, ' + val / 100 + ')';
                fa_night_mode.counter.innerHTML = (val / 90 * 100).toFixed() + '%';
                my_setcookie('fa_night_level', val)
            }
        };
        var dimmer = document.createElement('INPUT'),
            container = document.createElement('DIV'),
            counter = document.createElement('SPAN'),
            cookie = my_getcookie('fa_night_level');
        document.write('<style type="text/css">#fa_night_shade { font-size:0; position:fixed; top:0; left:0; right:0; bottom:0; pointer-events:none; z-index:999999999; } #fa_night_dimmer { margin:0 6px; vertical-align:middle; cursor:pointer; }</style>');
        fa_night_mode.shade = $('<div id="fa_night_shade" style="background-color:rgba(0, 0, 0, ' + (cookie ? cookie / 100 : 0) + ');"></div>')[0];
        fa_night_mode.interval = window.setInterval(function() {
            if (document.body) {
                document.body.appendChild(fa_night_mode.shade);
                window.clearInterval(fa_night_mode.interval)
            }
        }, 1);
        dimmer.id = 'fa_night_dimmer';
        dimmer.type = 'range';
        dimmer.min = 0;
        dimmer.max = 90;
        dimmer.value = cookie || 0;
        dimmer[/trident/i.test(window.navigator.userAgent) ? 'onchange' : 'oninput'] = fa_night_mode.dimLight;
        counter.id = 'fa_night_counter';
        counter.innerHTML = (cookie ? cookie / 90 * 100 : 0).toFixed() + '%';
        container.id = 'fa_night_container';
        container.innerHTML = '<h4>السطوع¹</h4>';
        $(container).append([dimmer, counter]);
        fa_night_mode.dimmer = dimmer;
        fa_night_mode.counter = counter;
        $(function() {
            for (var i = 0, j = fa_night_mode.targets.length, footer; i < j; i++) {
                footer = document.getElementById(fa_night_mode.targets[i]);
                if (footer) {
                    footer.appendChild(container);
                    break
                }
            }
            if (!footer) {
                document.body.appendChild(container)
            }
        })
    }
}());

$(function() {
    $('#memberlist').appendTo('form[action="/search?search_id=watchsearch"] .block')
});
$(function() {
    $('.cp-sidebar').insertBefore('.cp').first()
});
$(function() {
    var x = window.location.pathname.indexOf('friends');
    if (x > 0) {
        $('.box.friend-list').remove()
    }
});
$(function() {
    $('.option-btn i').click(function() {
        $('.option-box').toggleClass('option-box-show')
    })
});
$(function() {
    $.cookie('omar', '', {
        expires: -1
    });
    if ($.cookie("omarpop") != null) {
        $('html').attr('style', '--site-color: ' + $.cookie("omarpop") + '')
    }
    var color = $('#colors-menu ul li');
    color.eq(0).css("background-color", "#1da1f2");
    color.eq(1).css("background-color", "#c6c");
    color.eq(2).css("background-color", "#808080");
    color.eq(3).css("background-color", "#c66");
    color.eq(4).css("background-color", "#00b3b3");
    color.eq(5).css("background-color", "#ff99bb");
    color.eq(6).css("background-color", "#6c6");
    $('#colors-menu ul li').click(function() {
        $('html').attr('style', '--site-color: ' + $(this).attr('data-value') + '');
        $.cookie("omarpop", $(this).attr('data-value'), {
            expires: 100
        })
    })
});
$(function() {
    if ($.cookie("view-style") != null) {
        $('body').attr('class', $.cookie("view-style"))
    }
    $('.view-style i').on('click', function() {
        $('body').removeAttr('class').addClass($(this).attr('data-class'));
        $.cookie("view-style", $(this).attr('data-class'), {
            expires: 100
        })
    })
});
      
$(function() {
    if (!_userdata.user_level || !$.sceditor) return;

    presets = {
        general: {
            'تم الحل': '[table class="modAlert modAlertEdit2"][tr][td class="modAlertImage2"][/td]\n[td class="modAlertText"]تم حل المشكلة & ينقل للأرشيف.[table class="modAlertExtra"][tr][td]يرجى مراجعة : [url=http://help.ahlamontada.com/t15353-topic]قوانين موقع احلى مطور[/url][/td][/tr][/table][/td][/tr][/table]',
            'موضوع اكثر من أسبوع': '[table class="modAlert modAlertEdit"][tr][td class="modAlertImage"][/td]\n[td class="modAlertText"]مر على الموضوع اسبوع تقريباً , هذه يعني ان الموضوع تم حلة او أهملت من صاحب المشكلة رجاء في حال كانت لديك المشكلة مستمر او اي استفسار اخر قم بفتح موضوع جديد سيتم غلق الموضوع & يرسل الى الأرشيف[table class="modAlertExtra"][tr][td]يرجى مراجعة : [url=http://help.ahlamontada.com/t15353-topic]قوانين موقع احلى مطور[/url][/td][/tr][/table][/td][/tr][/table]',
            'عنوان غير صحيح': '[table class="modAlert modAlertEdit"][tr][td class="modAlertImage"][/td]\n[td class="modAlertText"]الرجاء تغيير عنوان الموضوع الخاص بك إلى عنوان ما يمت إلى سؤالك / مشكلتك ، بحيث يمكن للأعضاء الآخرين قادرة على العثور على السؤال / المشكلة باستخدام محرك البحث.[table class="modAlertExtra"][tr][td]يرجى مراجعة : [url=http://help.ahlamontada.com/t15353-topic]قوانين موقع احلى مطور[/url][/td][/tr][/table][/td][/tr][/table]',
            'تكرار مساهمات': '[table class="modAlert modAlertEdit"][tr][td class="modAlertImage"][/td]\n[td class="modAlertText"]يرجى عدم وضع مساهمتين متكررات خلال مده 24 ساعة, في حال كانت لديك اضافة استخدم زر تعديل مساهمتك شكراً لك\n[table class="modAlertExtra"][tr][td]يرجى مراجعة : [url=http://help.ahlamontada.com/t15353-topic]قوانين موقع احلى مطور[/url][/td][/tr][/table][/td][/tr][/table]',
            'لون مخالف': '[table class="modAlert modAlertEdit1"][tr][td class="modAlertImage1"][/td]\n[td class="modAlertText"]من فضلك عدم استخدام لون غامق يمكنك استخدام النص الافتراضي فقط. غيرها محجوز للمشرفين شكرا لك.[table class="modAlertExtra"][tr][td]يرجى مراجعة : [url=http://help.ahlamontada.com/t15353-topic]قوانين موقع احلى مطور[/url][/td][/tr][/table][/td][/tr][/table]',
            'عضو ينبه عضو': '[table class="modAlert modAlertEdit3"][tr][td class="modAlertImage3"][/td]\n[td class="modAlertText"]يرجى عدم تنبيه الأعضاء، هذه دور المشرفين فقط شكرا لك.[table class="modAlertExtra"][tr][td]يرجى مراجعة : [url=http://help.ahlamontada.com/t15353-topic]قوانين موقع احلى مطور[/url][/td][/tr][/table][/td][/tr][/table]',
            'قسم خطأ': '[table class="modAlert modAlertEdit1"][tr][td class="modAlertImage1"][/td]\n[td class="modAlertText"]لقد نشرت موضوعك في قسم خاطئ !، تم نقله إلى قسم الصحيح.[table class="modAlertExtra"][tr][td]يرجى مراجعة : [url=http://help.ahlamontada.com/t15353-topic]قوانين موقع احلى مطور[/url][/td][/tr][/table][/td][/tr][/table]',
            'نقل لسلة المهملات': '[table class="modAlert modAlertEdit6"][tr][td class="modAlertImage6"][/td]\n[td class="modAlertText"]الموضوع مخالف ينقل الى سلة المهملات.[table class="modAlertExtra"][tr][td]يرجى مراجعة : [url=http://help.ahlamontada.com/t15353-topic]قوانين موقع احلى مطور[/url][/td][/tr][/table][/td][/tr][/table]'
        },
        graphic: {
            'عنوان مناسب لطلبك': '[table class="modAlert modAlertEdit3"][tr][td class="modAlertImage3"][/td]\n[td class="modAlertText"]1 - وضع عنوان مناسب لطلبك مثل ( طلب رتب , أوسمة , واجهة - طلب كتابة على رتب , أوسمة,واجهة - طلب تأثير فلاشى على رتب ,أوسمة ,واجهه )[table class="modAlertExtra"][tr][td]يرجى مراجعة : [url=http://help.ahlamontada.com/t1086670-topic]قوانين قسم الابداع[/url][/td][/tr][/table][/td][/tr][/table]',
            'توضيح طلبك': '[table class="modAlert modAlertEdit3"][tr][td class="modAlertImage3"][/td]\n[td class="modAlertText"]2 - توضيح طلبك بشكل جيد و بكلام واضح , فخير الكلام ما قل و دل , مع تفادي الكتابة بالخط الصغير او الالوان الغير واضحه (كالابيض والاصفر والازرق السماوي..الخ).[table class="modAlertExtra"][tr][td]يرجى مراجعة : [url=http://help.ahlamontada.com/t1086670-topic]قوانين قسم الابداع[/url][/td][/tr][/table][/td][/tr][/table]',
            'التحل بالصبر و عدم الإلحاح': '[table class="modAlert modAlertEdit"][tr][td class="modAlertImage"][/td]\n[td class="modAlertText"]3 - التحل بالصبر و عدم الإلحاح أو ارسال المساهمات او الرسائل الخاصة المتتالية و انتضار رد المبدعون\n[table class="modAlertExtra"][tr][td]يرجى مراجعة : [url=http://help.ahlamontada.com/t1086670-topic]قوانين قسم الابداع[/url][/td][/tr][/table][/td][/tr][/table]',
            'يمنع حذف حقوق': '[table class="modAlert modAlertEdit3"][tr][td class="modAlertImage3"][/td]\n[td class="modAlertText"]4- ألا يكون طلبك هو حذف حقوق ملكية أحد الصور ووضع كتابة أخرى مكانها لأنها لن تحذف أبدا سيتم تنفيذ الطلب مع إبقاء حقوق الملكية و عدم حذفها[table class="modAlertExtra"][tr][td]يرجى مراجعة : [url=http://help.ahlamontada.com/t1086670-topic]قوانين قسم الابداع[/url][/td][/tr][/table][/td][/tr][/table]',
            'وضع كل التفاصيل للطلب': '[table class="modAlert modAlertEdit4"][tr][td class="modAlertImage4"][/td]\n[td class="modAlertText"]5- يجب من العضو وضع كل التفاصيل للطلب مثل : المواصفات - الطول والعرض - الالوان ـ رابط صحيح لصوره[table class="modAlertExtra"][tr][td]يرجى مراجعة : [url=http://help.ahlamontada.com/t1086670-topic]قوانين قسم الابداع[/url][/td][/tr][/table][/td][/tr][/table]',
            'لاداعي لتكرار موضوعك': '[table class="modAlert modAlertEdit3"][tr][td class="modAlertImage3"][/td]\n[td class="modAlertText"]   6- اذا لم ينفذ طلبك لاداعي لتكرار موضوعك انتضر حتى يصمم او راسلنا برابط الموضوع ان تؤخر عليك بالرد.[table class="modAlertExtra"][tr][td]يرجى مراجعة : [url=http://help.ahlamontada.com/t1086670-topic]قوانين قسم الابداع[/url][/td][/tr][/table][/td][/tr][/table]',
            'يتم تصميم 6 رتب': '[table class="modAlert modAlertEdit3"][tr][td class="modAlertImage3"][/td]\n[td class="modAlertText"]7- يتم تصميم 6 رتب , أوسمة .[table class="modAlertExtra"][tr][td]يرجى مراجعة : [url=http://help.ahlamontada.com/t1086670-topic]قوانين قسم الابداع[/url][/td][/tr][/table][/td][/tr][/table]',
            'تم التصميم': '[table class="modAlert modAlertEdit2"][tr][td class="modAlertImage2"][/td]\n[td class="modAlertText"]يغلق الموضوع لاتمام التصميم & ينقل للأرشيف.[table class="modAlertExtra"][tr][td]يرجى مراجعة : [url=http://help.ahlamontada.com/t1086670-topic]قوانين قسم الابداع[/url][/td][/tr][/table][/td][/tr][/table]',
            '<button type="button" class="button22" disabled>خاصة بمعرض الاعضاء</button>': '',
            'التصاميم المنقوله': '[table class="modAlert modAlertEdit3"][tr][td class="modAlertImage3"][/td]\n[td class="modAlertText"]1- يمنع وضع التصاميم المنقوله او الغير مملوكه لصاحبها.[table class="modAlertExtra"][tr][td]يرجى مراجعة : [url=http://help.ahlamontada.com/t1087643-topic]قوانين قسم معرض وابداعات الاعضاء[/url][/td][/tr][/table][/td][/tr][/table]',
            'عنوان مناسب لموضوعك': '[table class="modAlert modAlertEdit3"][tr][td class="modAlertImage3"][/td]\n[td class="modAlertText"]&#1634;- وضع عنوان مناسب دال على موضوعك .مثل (وجهة باللون الاسود) الخ...[table class="modAlertExtra"][tr][td]يرجى مراجعة : [url=http://help.ahlamontada.com/t1087643-topic]قوانين قسم معرض وابداعات الاعضاء[/url][/td][/tr][/table][/td][/tr][/table]',
            'معاينة للتصاميم': '[table class="modAlert modAlertEdit3"][tr][td class="modAlertImage3"][/td]\n[td class="modAlertText"]&#1635;- يجب وضع معاينة للتصاميم بالاضافة الى رابط التصميم[table class="modAlertExtra"][tr][td]يرجى مراجعة : [url=http://help.ahlamontada.com/t1087643-topic]قوانين قسم معرض وابداعات الاعضاء[/url][/td][/tr][/table][/td][/tr][/table]',
            'يمنع وضع حقوق المصمم': '[table class="modAlert modAlertEdit3"][tr][td class="modAlertImage3"][/td]\n[td class="modAlertText"]&#1636;- يمنع وضع حقوق المصمم على التصاميم البسيطة .مثال (البانيرات الاعلانية . الاوسمة .الرتب .الخ.. )[table class="modAlertExtra"][tr][td]يرجى مراجعة : [url=http://help.ahlamontada.com/t1087643-topic]قوانين قسم معرض وابداعات الاعضاء[/url][/td][/tr][/table][/td][/tr][/table]',
            'حقوق على هيئة رابط': '[table class="modAlert modAlertEdit3"][tr][td class="modAlertImage3"][/td]\n[td class="modAlertText"]&#1637;- يمنع وضع الحقوق التى تكون على هيئة رابط على التصاميم[table class="modAlertExtra"][tr][td]يرجى مراجعة : [url=http://help.ahlamontada.com/t1087643-topic]قوانين قسم معرض وابداعات الاعضاء[/url][/td][/tr][/table][/td][/tr][/table]',
            'تمنع الردود العشوائية': '[table class="modAlert modAlertEdit4"][tr][td class="modAlertImage4"][/td]\n[td class="modAlertText"]&#1638;- تمنع الردود العشوائية على مواضيع الاعضاء فان اردت الرد على الموضوع يكون بعيد عن التجريح وان يكون نقدك بناء يفيد المصمم[table class="modAlertExtra"][tr][td]يرجى مراجعة : [url=http://help.ahlamontada.com/t1087643-topic]قوانين قسم معرض وابداعات الاعضاء[/url][/td][/tr][/table][/td][/tr][/table]',
            'ملاحظة هامة': '[table class="modAlert modAlertEdit1"][tr][td class="modAlertImage1"][/td]\n[td class="modAlertText"]ملاحظة هامة ...يتم نقل المواضيع الموحدة لابداعات الاعضاء الى السلة فى حالة لم تحمل اى مساهمات تصميم فى الموضوع ويكون العضو غرضة فقط هو حجز مساحة فى القسم ويتم تعديل الموضوع الموحد الخاص بالعضو فى حالة انة تجاهل موضوعة الموحد الى عنوان مناسب لماهية الموضوع مثال ان كان الموضوع يحمل مساهمة او اثنين تصميم اوسمة يتم تعديل الموضوع الى اوسمة باللون الاحمر مثلا فرجاء الاهتمام بمواضيعكم الموحدة ولا يتم تجاهلها[table class="modAlertExtra"][tr][td]يرجى مراجعة : [url=http://help.ahlamontada.com/t1087643-topic]قوانين قسم معرض وابداعات الاعضاء[/url][/td][/tr][/table][/td][/tr][/table]'
        },
        tutorial: {
            'قالب جديد': function() {
                var type = prompt('أي نوع من القوالب تريد ؟ الإختيارات : اعلان, شرح, قوانين, تصميم'),
                    closing = '';
                if (type) {
                    type = type.toLowerCase();
                    if (!/اعلان|شرح|قوانين|تصميم/.test(type)) type = 'اعلان'
                } else type = 'اعلان';
                switch (type) {
                    case 'شرح':
                        closing = 'تم كتابة هذا الشرح بواسطة [url=http://www.best-devs.net/u' + _userdata.user_id + '][b]' + _userdata.username + '[/b][/url].';
                        break;
                    case 'تصميم':
                        closing = '';
                        break;
                    default:
                        closing = '[center]إعلان هــــام من إدارة  [b][color=#6699CC]احلى[/color][color=#333333] مطور[/color][/b][/center]';
                        break
                }
                return ['[table class="tuto-header ' + type + '"][tr]\n[td class="tuto-logo"][/td]\n[td class="tuto-title"]عنوان ال'+ type +'[/td]\n[td class="tuto-type"][/td]\n[/tr][/table]\n[table class="tuto-content"][tr][td]\n\n', '\n\n[/td][/tr][/table]\n[table class="tuto-footer"][tr][td class="tuto-credit"]' + closing + '[/td][td class="tuto-brand"][/td][/tr][/table]']
            },
            'ادراج زر': function() {
                var color = prompt('يرجى اختيار اللون. الألوان المتاحة هي: احمر, اخضر, اصفر. (الافتراضي هو الأزرق).)'),
                    url = prompt('بعد ذلك ، يرجى إدخال عنوان URL لهذا الزر.'),
                    text = prompt('خيرًا ، يرجى إدخال النص الذي تريد عرضه.');
                if (!/احمر|اخضر|اصفر/i.test(color)) color = '';
                else color = color.toLowerCase();
                if (!url) url = window.location.href;
                if (!text) text = 'زر';
                return ['[table class="post-button ' + color + '"][tr][td][url=' + url + ']' + text, '[/url][/td][/tr][/table]']
            },
            '<span style="color:#1675BC;font-weight:bold;border-bottom:1px solid;padding-bottom:3px;">عنوان فرعي</span>': ['[h2][img]https://i.servimg.com/u/f39/18/51/81/51/09615110.png[/img]', '[/h2]'],
            '<strong style="color:#69C">احلى<span style="color:#333">مطور </span></strong>': '[b][color=#6699CC]احلى[/color][color=#333333]مطور[/color][/b]',
            '<span style="color:#936;font-size:11px;font-weight:bold;font-family:\'Courier New\';">الكلمة</span>': ['[color=#993366][font=Courier New][b]', '[/b][/font][/color]'],
            '<img src="https://i.servimg.com/u/f39/18/51/81/51/10-10-13.png">فقعة حمراء': '[img]https://i.servimg.com/u/f39/18/51/81/51/10-10-13.png[/img]',
            '<img src="https://i.servimg.com/u/f39/18/51/81/51/09615110.png">فقعة زرقاء': '[img]https://i.servimg.com/u/f39/18/51/81/51/09615110.png[/img]',
            '<img src="https://i.servimg.com/u/f39/18/51/81/51/image110.png">شهر': '[img]https://i.servimg.com/u/f39/18/51/81/51/image110.png[/img]'
        }
    };

    $.sceditor.command.set('presets', {
        dropDown: function(editor, caller, callback) {
            var b, c = document.createElement('DIV'),
                d, i, j, k;
          c.innerHTML = '<a class="sceditor-font-option toggler" style="color:#7BB92B" title="Preset messages for moderation on any board."><i class="fa"></i> فريق الدعم</a><div class="group" style="display:none"></div><a class="sceditor-font-option toggler" style="color:#D42F58" title="Preset messages for moderation in the graphic section."><i class="fa"></i> فريق التصميم</a><div class="group" style="display:none"></div><a style="display: none;" class="sceditor-font-option toggler" style="color:#32B585" title="Preset messages for moderation in the review section."><i class="fa"></i> Reviewer presets</a><div class="group" style="display:none"></div><a class="sceditor-font-option toggler" style="color:#C39300" title="Tools for creating tutorials."><i class="fa"></i> قوالب الشرح</a><div class="group" style="display:none"></div>';
            b = c.getElementsByTagName('A'), d = c.getElementsByTagName('DIV');
            for (i = 0, j = b.length; i < j; i++) {
                b[i].onclick = function() {
                    var n = this.nextSibling,
                        state = n.style.display,
                        d = this.parentNode.getElementsByTagName('DIV');
                    for (var i = 0, j = d.length; i < j; i++) d[i].style.display = 'none';
                    n.style.display = /none/.test(state) ? 'block' : 'none';
                    return false
                }
            }
            function opts(k, i, p) {
                var a = document.createElement('A');
                a.className = 'sceditor-font-option';
                a.innerHTML = i;
                if (p.constructor != Function) {
                    a.title = (p.constructor === Array ? p.join('') : p).replace(/\[.*?\]|http:\/\/.*?\.(png|gif|jpg|bmp)/g, '').replace(/^\n+|\n+$|^\s+|\s+$/g, '');
                    a.onclick = function() {
                        callback(p);
                        editor.closeDropDown(true);
                        return false
                    }
                } else {
                    a.onclick = function() {
                        callback(p());
                        editor.closeDropDown(true);
                        return false
                    }
                }
                switch (k) {
                    case 'general':
                        d[0].appendChild(a);
                        break;
                    case 'graphic':
                        d[1].appendChild(a);
                        break;
                    case 'tutorial':
                        d[3].appendChild(a);
                        break
                }
            };
            for (k in presets)
                for (i in presets[k]) opts(k, i, presets[k][i]);
            editor.createDropDown(caller, 'presets', c)
        },
        exec: function(c) {
            insert(c, this)
        },
        txtExec: function(c) {
            insert(c, this)
        },
        tooltip: 'رسائل جاهزة (CTRL+P)',
        shortcut: 'ctrl+p'
    });
    toolbar += '|presets';
    function insert(c, e) {
        $.sceditor.command.get('presets').dropDown(e, c, function(content) {
            content.constructor === Array ? e.insertText(content[0], content[1]) : e.insertText(content)
        })
    };
    'par ange tuteur & omarpop23'
});
