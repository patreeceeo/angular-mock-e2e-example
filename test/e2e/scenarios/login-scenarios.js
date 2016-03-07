"use strict";

var Page = require("../support/page");
var LoginPage = require("../support/login.page");

var user = {
  email: "gb@shaw.ca",
  password: "123"
};

describe("The app when not logged in", function () {
  var loginPage, indexPage;

  beforeEach(function () {
    indexPage = new (Page.extend({url: "/"}))();
    loginPage = new LoginPage();

    indexPage.get();
  });

  it("automatically redirects to login page", function() {
    expect(loginPage.isShowingFailureMessage()).toBe(false);
    expect(browser.getLocationAbsUrl()).toMatch(loginPage.url);
  });
});

describe("The login page", function () {
  var page;

  beforeEach(function () {
    page = new LoginPage();
    page.get();
  });

  it("does not allow a phony user to log in", function () {
    page.login({
      email: "pho@nee.com",
      password: "123"
    });
    expect(browser.getLocationAbsUrl()).toMatch(page.url);
    expect(page.isShowingFailureMessage()).toBe(true);
  });

  it("allows a user to log in", function () {
    var nextPage = page.login(user);
    expect(browser.getLocationAbsUrl()).toEqual(nextPage.url);
  });
});

