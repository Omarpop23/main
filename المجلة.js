$(function () {
  $(".forum-block-inner").each(function() {
    var topicUrl = $(this).find('.topic-title a').attr('href'),
        topicImg = $(this).find('#topicImgBg');
    $(topicImg).load(''+topicUrl+' .content img:first'); 
  });
});