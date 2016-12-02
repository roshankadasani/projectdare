var main = function () {
  'use strict';

  function DashboardViewModel() {
    var self = this;

    self.dares = ko.observableArray();

    $.getJSON('/dares', function(dares) {
      var mappedDares = $.map(dares, function(dare) { return dare });
      self.dares(mappedDares);
    });
  }
  ko.applyBindings(new DashboardViewModel());
}

$(document).ready(main);