"use strict";

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

angular.module("example-app.login-page").factory("LoginService", LoginService);
