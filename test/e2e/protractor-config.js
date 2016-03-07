"use strict";
/* eslint-disable no-console */

var SpecReporter = require("jasmine-spec-reporter");

exports.config = {
  allScriptsTimeout: 11000,
  getPageTimeout: 1000,

  specs: [
    "scenarios/**/*.js"
  ],

  capabilities: {
    browserName: "chrome"
  },

  directConnect: true,

  baseUrl: "http://localhost:8000",

  framework: "jasmine2",

  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000,
    print: function() {}
  },

  onPrepare: function() {
    jasmine.getEnv().addReporter(new SpecReporter());
    console.log(process.env.PAUSE_ON_FAILURE);
    if(process.env.PAUSE_ON_FAILURE) {
      jasmine.getEnv().addReporter({
        specDone: (function () {
          var port = 5000;
          return function (spec) {
            if (spec.status === "failed") {
              console.dir(spec.failedExpectations.length);
              console.log(spec.failedExpectations[0].message);
              console.log(spec.failedExpectations[0].stack);
              browser.pause(port);
              port = port + 1;
            }
          };
        })()
      });
    }
  }
};
