"use strict";

/* Test Page Object Base Class
 *
 * Original Author: Patrick Canfield
 *
 * Inspired by:
 * https://www.thoughtworks.com/insights/blog/using-page-objects-overcome-protractors-shortcomings
 *
 *
 * Usage:
 *
 * ```
 * const MyPage = Page.extend(options);
 *
 * const myPage = new MyPage();
 * ```
 *
 * Options is an object that can consist of any of the following.
 *
 * Initializer
 * ===========
 *
 * A function that will be called when an instance of the page is `new`ed.
 *
 * Locators
 * ========
 *
 * One place to assign handles to parts of the page that the tests need to interact with.
 *
 * Example:
 *
 * options.locators = {
 *   userNameInput: by.model("user.username")
 * }
 *
 *
 * URL
 * ===
 *
 * The URL associated with the page.
 *
 * Example:
 *
 * ```
 * (new Page.extend({url: "/monkeys"})).get() // GET /monkeys
 * ```
 *
 * Methods
 * =======
 *
 * Any other function properties will be made methods of the page instance. A special method
 * called `element` can be used to access individual elements by locator handle. Multiple
 * elements can be accessed with `elements(handle)`
 *
 * Example:
 *
 * (new Page.extend({
 *   clickOkay: function () {
 *     this.element("okayButton").click();
 *   }
 * })).clickOkay(); // Clicks the okay button
 *
 *
 */

function Page () {
  if(typeof this.initialize === "function") {
    this.initialize();
  }
}

Page.extend = function (domainProps) {
  // Set the prototype chain to inherit from `parent`, without calling
  // `parent`'s constructor function and add the prototype properties.
  var parent = this;
  var child = function(){ return parent.apply(this, arguments); };
  var props = {};

  var readOnlyProps = domainProps.properties || {};
  var locators = domainProps.locators || {};

  var eachProp = function (obj, fn) {
    var name;
    for(name in obj) {
      if(obj.hasOwnProperty(name)) {
        fn.call(this, name, obj[name]);
      }
    }
  }.bind(this);

  domainProps = domainProps || {};
  locators.root = locators.root || by.css("[ng-app]");


  function makeGetter (value) {
    return function () {
      return value;
    };
  }

  eachProp(readOnlyProps, function (name, value) {
    props[name] = { get: makeGetter(value) };
  });

  props.url = { get: makeGetter(domainProps.url) };

  child.prototype = Object.create(parent.prototype, props);
  child.prototype.constructor = child;

  eachProp(domainProps, function (name, value) {
    if(typeof value === "function") {
      child.prototype[name] = value;
    }
  });

  child.prototype.locators = domainProps.locators;

  // Set a convenience property in case the parent's prototype is needed
  // later.
  child.__super__ = parent.prototype;


  return child;
};

Page.prototype.element = function (locatorAlias) {
  if(locatorAlias !== "root") {
    return element(this.locators.root).element(this.locators[locatorAlias]);
  } else {
    return element(this.locators.root);
  }
};

Page.prototype.elements = function (locatorAlias) {
  if(locatorAlias !== "root") {
    return element(this.locators.root).all(this.locators[locatorAlias]);
  } else {
    throw new Error("There can only be one highlander, er, root element");
  }
};

Page.prototype.get = function () {
  return browser.get("/#" + this.url);
};

module.exports = Page;
