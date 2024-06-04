module.exports = {
  "extends": [
    "stylelint-config-standard-scss",
    "stylelint-config-recommended-vue",
    "stylelint-config-recess-order"
  ],
  "plugins": ["stylelint-declaration-strict-value"],
  "rules": {
    "at-rule-no-unknown": null,
    "scss/at-rule-no-unknown": true,
    "scss/at-import-no-partial-leading-underscore": null,
    'no-descending-specificity': null
  }
}
