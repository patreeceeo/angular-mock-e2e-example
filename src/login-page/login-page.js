"use strict";

function LoginController ($scope, $location, LoginService) {

  $scope.creds = {};
  $scope.error = {};

  $scope.login = function () {
    LoginService.login($scope.creds).then(function () {
      $location.url("/dash");
    }, function () {
      $scope.error.incorrectLogin = true;
    });
  };
}

angular.module("example-app.login-page", ["ngCookies"])
  .controller("LoginController", LoginController);
