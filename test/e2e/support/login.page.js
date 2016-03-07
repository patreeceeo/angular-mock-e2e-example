"use strict";
var Page = require("./page");
var DashboardPage = require("./dashboard.page");
var ForgotPasswordPage = require("./forgot-password.page");

module.exports = Page.extend({
  url: "/login",
  locators: {
    emailInput: by.model("creds.email"),
    passwordInput: by.model("creds.password"),
    loginButton: by.css("input[type=submit]"),
    failureMessage: by.css(".alert-message.error"),
    forgotPasswordLink: by.css(".forgot-pw")
  },
  login: function (creds) {
    this.element("emailInput").clear().sendKeys(creds.email);
    this.element("passwordInput").clear().sendKeys(creds.password);
    this.element("loginButton").click();
    return new DashboardPage();
  },
  isShowingFailureMessage: function () {
    return this.element("failureMessage").isDisplayed();
  },
  clickForgotPassword: function () {
    this.element("forgotPasswordLink").click();
    return new ForgotPasswordPage();
  }
});


