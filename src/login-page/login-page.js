"use strict";

function LoginController ($scope, $location, LoginService) {

  $scope.creds = {};

  $scope.login = function () {
    LoginService.login($scope.creds).then(function () {
      $location.url("/dash");
    }, function (response) {
      $scope.error = { message: response.statusText };
    });
  };
}

function LoginService ($cookies, $http) {
  return {
    loggedIn: function () {
      return $cookies.get("example-app.logged-in");
    },
    login: function (creds) {
      return $http.post("/api/v1/auth", creds).then(function (result) {
        $cookies.put("example-app.logged-in", creds);
        return result;
      });
    }
  };
}

angular.module("example-app.login-page", ["ngCookies"])
  .controller("LoginController", LoginController)
  .factory("LoginService", LoginService);
