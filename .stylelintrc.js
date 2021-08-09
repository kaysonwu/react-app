module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-rational-order',
    'stylelint-config-prettier',
  ],
  plugins: [
    'stylelint-order',
    'stylelint-scss',
  ],
  rules: {
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': true,
    'scss/selector-no-redundant-nesting-selector': true,
  },
};
