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

      console.log(tweets.statuses["0"].user.name);
      console.log(tweets.statuses["0"].user.screen_name);
      console.log(tweets.statuses["0"].text);
      console.log(tweets.statuses["0"].user.profile_image_url);
      console.log(tweets.statuses["0"].id_str);

      var len = tweets.statuses.length;

      for(var i = 0; i < len; ++i) {
        var userName = tweets.statuses[i].user.name;
        var screenName = tweets.statuses[i].user.screen_name;
        var userTweet = tweets.statuses[i].text;
        var profilePic = tweets.statuses[i].user.profile_image_url;
        var stringID = tweets.statuses[i].id_str;

        var usersPic = $('<img src="' + profilePic + '" >');

        /*var listItem = $('<li>').append(usersPic);
        listItem.text(userName + " " + screenName + " " + userTweet + " ");
        $('#insertUserInfo').append(listItem);*/

        var insertBlock = $(
          '<div class="card card-block" style="width: 18rem;">' +
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
