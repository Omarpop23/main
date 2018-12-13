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