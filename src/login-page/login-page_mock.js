"use strict";

angular.module("example-app.login-page_mock", ["ngMockE2E"]).run(function ($httpBackend) {

  var user = {
    email: "gb@shaw.ca",
    password: "123"
  };

  $httpBackend.whenPOST("/api/v1/auth").respond(function (method, url, data) {
    var creds = angular.fromJson(data);
    if(user.email === creds.email && user.password === creds.password) {
      return [200, {}];
    } else {
      return [401, {}, null, "email or password is incorrect"];
    }
  });

  $httpBackend.whenGET(/\.html$/).passThrough(); // Allow templates to be downloaded
});
