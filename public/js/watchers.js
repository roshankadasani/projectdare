var main = function () {
  'use strict';

  window.onload = function() {
      $("#myModal").modal('hide');
  }

  $("#player").click(function() {
      $("#myModal").modal('show');
  });

  $.ajax({
    method : 'GET',
    url : '/watcher/tweets',
    contentType : 'application/json',
    dataType: 'json',
    success: function(response) {
      var tweets = response;
      console.log(tweets);

      var len = tweets.statuses.length;

      for(var i = 0; i < len; ++i) {
        //var userName = tweets.statuses[i].user.name;
        var screenName = tweets.statuses[i].user.screen_name;
        var userTweet = tweets.statuses[i].text;
        var profilePic = tweets.statuses[i].user.profile_image_url;
        var stringID = tweets.statuses[i].id_str;
        var videoUrl = !tweets.statuses[i].extended_entities ? null : tweets.statuses[i].extended_entities.media["0"].video_info.variants["1"].url;
        var videoThumbnail = !tweets.statuses[i].extended_entities ? null : tweets.statuses[i].extended_entities.media[0].media_url;
        var usersPic = $('<img src="' + profilePic + '" >');

        var insertBlock = $(
          '<div class="card card-block" style="width: 26rem;">' +
          '<video style="width: 100%" controls poster="'+videoThumbnail+'">'+
          '<source src="'+videoUrl+'" type="video/mp4">'+
          'Your browser does not support HTML5 video.'+
          '</video>'+
          '<img src="' + profilePic + '">' +
          '<h3 class="card-title">'+screenName+'</h3>' +
          '<p class="card-text">'+userTweet+'</p>' +
          '</div>'
        );

        $('#insertUserInfo').append(insertBlock);
      }



    }
  });

};
$(document).ready(main);
