var main = function () {
  'use strict';

  function DashboardViewModel() {
    var self = this;

    self.dares = ko.observableArray();
    self.modalTitle = ko.observable();
    self.modalDescription = ko.observable();
    self.modalCreator = ko.observable();
    self.modalHashtag = ko.observable();

    self.showModal = function(dare) {
      self.modalTitle(dare.title);
      self.modalDescription(dare.description);
      self.modalCreator(dare.creator);
      self.modalHashtag(dare.hashtag);

      $('#myModal').modal('show');
    }

    $.getJSON('/dares', function(dares) {
      var mappedDares = $.map(dares, function(dare) { return dare });
      self.dares(mappedDares);
    });
  }
  ko.applyBindings(new DashboardViewModel());
}

$(document).ready(main);