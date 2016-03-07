"use strict";

angular.module("example-app", [
  "ngRoute",
  "example-app.login-page",
  "example-app.login-page_mock",
  "example-app.dashboard-page"
])
  .config(function ($routeProvider) {
    $routeProvider
      .when("/login", {
        controller: "LoginController",
        templateUrl: "src/login-page/login-page.html"
      })
      .when("/dash", {
        controller: "DashboardController",
        templateUrl: "src/dashboard-page/dashboard-page.html"
      })
      .otherwise({
        redirectTo: "/login"
      });
  })
  .run(function($rootScope, $location, $log, LoginService) {

    $rootScope.$on("$stateChangeError", $log.error.bind($log));

    if (!LoginService.loggedIn()){
      $location.url("/login");
    }

    $rootScope.$on("$routeChangeStart", function() {
      if (!LoginService.loggedIn()){
        $location.url("/login");
      }
    });

    $rootScope.$on("accountLoggedOut", function (){
      $location.url("/login");
    });
  });



