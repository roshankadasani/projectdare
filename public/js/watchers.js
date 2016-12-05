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
        var postedTimeSring = tweets.statuses[i].created_at;
        var profilePic = tweets.statuses[i].user.profile_image_url;
        var stringID = tweets.statuses[i].id_str;
        var videoUrl = !tweets.statuses[i].extended_entities ? null : tweets.statuses[i].extended_entities.media["0"].video_info.variants["1"].url;
        var videoThumbnail = !tweets.statuses[i].extended_entities ? null : tweets.statuses[i].extended_entities.media[0].media_url;
        var postedTime = postedTimeSring.substr(4,6);
        var usersPic = $('<img src="' + profilePic + '" >');

        console.log(videoThumbnail);

        var insertBlock = $(
          '<div class="itemnew">'+
          '<div class="card card-block" style="padding: 0;">' +
          '<video style="width: 100%" controls poster="'+videoThumbnail+'">'+
          '<source src="'+videoUrl+'" type="video/mp4">'+
          'Your browser does not support HTML5 video.'+
          '</video>'+
          '<div class="media" id="tweetCard">' +
          '<div class="media-left">' +
          '<img class="media-object" src="'+profilePic+'">' +
          '</div>' +
          '<div class="media-body">' +
          '<h5 class="media-heading"><a href="https://twitter.com/'+screenName+'" target="_blank">'+screenName+'</a></h5>'+
          '<p class="card-text"><small class="text-muted">'+postedTime+'</small></p>'+
          '</div>'+
          '<p>'+userTweet+'</p>'+
          '</div>'+
          '</div>'+
          '</div>'
          // '<div class="twitterCard">' +
          // '<div class="card card-block" style="width: 26rem;padding: 0;">' +
          // '<video style="width: 100%" controls poster="'+videoThumbnail+'">'+
          // '<source src="'+videoUrl+'" type="video/mp4">'+
          // 'Your browser does not support HTML5 video.'+
          // '</video>'+
          // '<div class="media" id="tweetCard">' +
          // '<div class="media-left">' +
          // '<img class="media-object" src="'+profilePic+'">' +
          // '</div>' +
          // '<div class="media-body">' +
          // '<h5 class="media-heading"><a href="https://twitter.com/'+screenName+'" target="_blank">'+screenName+'</a></h5>'+
          // '<p class="card-text"><small class="text-muted">'+postedTime+'</small></p>'+
          // '</div>'+
          // '<p>'+userTweet+'</p>'+
          // '</div>'+
          // '</div>'+
          // '</div>'
        );

        $('#insertUserInfo').append(insertBlock);
      }



    }
  });

};
$(document).ready(main);
