var main = function () {
  'use strict';

  // Knockout's view model for dashboard
  function DashboardViewModel() {
    var self = this;

    self.dares = ko.observableArray();
    self.modalTitle = ko.observable();
    self.modalDescription = ko.observable();
    self.modalCreator = ko.observable();
    self.modalHashtag = ko.observable();
    self.tweets = ko.observableArray();

    self.showModal = function(dare) {
      self.modalTitle(dare.title);
      self.modalDescription(dare.description);
      self.modalCreator(dare.creator);
      self.modalHashtag(dare.hashtag);

      // get list of tweets containing our dare's hashtag, show modal
      $.ajax({
        method: 'GET',
        url: '/dashboard/tweets?hashtag=%23' + dare.hashtag,
        contentType: 'application/json',
        dataType: 'json',
        success: function(tweets) {
          self.tweets(tweets.statuses);

          $('#myModal').modal('show');
        }
      });
    }

    $.getJSON('/dares', function(dares) {
      var mappedDares = $.map(dares, function(dare) { return dare });
      self.dares(mappedDares);
    });
  }
  ko.applyBindings(new DashboardViewModel());

  function getTweets(tag, callback) {

  }
}

$(document).ready(main);
