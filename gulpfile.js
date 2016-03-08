"use strict";

var gulp = require("gulp");
var ejs = require("gulp-ejs");
var rename = require("gulp-rename");

gulp.task("build", ["build:html", "build:js"]);
gulp.task("dev:build", ["dev:build:html", "dev:build:js"]);

gulp.task("build:html", function(){
  return gulp.src("index.html.ejs")
    .pipe(ejs({
      scripts: [
        "/node_modules/angular/angular.js",
        "/node_modules/angular-cookies/angular-cookies.js",
        "/node_modules/angular-route/angular-route.js",
        "/src/login-page/login-page.js",
        "/src/login-page/login-page_mock.js",
        "/src/login-page/login-service.js",
        "/src/dashboard-page/dashboard-page.js",
        "/src/deps.js",
        "/src/init.js"
      ]
    }))
    .pipe(rename("index.html"))
    .pipe(gulp.dest("./"));
});
gulp.task("dev:build:html", function(){
  return gulp.src("index.html.ejs")
    .pipe(ejs({
      scripts: [
        "/node_modules/angular/angular.js",
        "/node_modules/angular-mocks/angular-mocks.js",
        "/node_modules/angular-cookies/angular-cookies.js",
        "/node_modules/angular-route/angular-route.js",
        "/src/login-page/login-page.js",
        "/src/login-page/login-page_mock.js",
        "/src/login-page/login-service.js",
        "/src/dashboard-page/dashboard-page.js",
        "/src/dev-deps.js",
        "/src/init.js"
      ]
    }))
    .pipe(rename("dev.html"))
    .pipe(gulp.dest("./"));
});

gulp.task("build:js", function(){
  return gulp.src("src/deps.js.ejs")
    .pipe(ejs({
      modules: [
        "ngRoute",
        "example-app.login-page",
        "example-app.dashboard-page"
      ]
    }))
    .pipe(rename("deps.js"))
    .pipe(gulp.dest("src/"));
});
gulp.task("dev:build:js", function(){
  return gulp.src("src/deps.js.ejs")
    .pipe(ejs({
      modules: [
        "ngRoute",
        "example-app.login-page",
        "example-app.login-page_mock",
        "example-app.dashboard-page"
      ]
    }))
    .pipe(rename("dev-deps.js"))
    .pipe(gulp.dest("src/"));
});
