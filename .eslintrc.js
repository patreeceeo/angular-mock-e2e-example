/* global module */
"use strict";
module.exports = {
  "rules": {
    "no-console": 0,
    "no-debugger": 0,
    "no-trailing-spaces": [ 1 ],
    "no-unused-expressions": [
      1,
      {
        allowShortCircuit: true,
        allowTernary: true
      }
    ],
    "vars-on-top": [ 1 ],
    "strict" : [
      2,
      "global"
    ],
    "indent": [
      2,
      2
    ],
    "quotes": [
      2,
      "double"
    ],
    "linebreak-style": [
      2,
      "unix"
    ],
    "semi": [
      2,
      "always"
    ]
  },
  "env": {
    "es6": true,
    "browser": true,
    "node": true,
    "protractor": true,
    "jasmine": true,
  },
  "globals": {
    "angular": 1
  },
  "extends": "eslint:recommended"
};
