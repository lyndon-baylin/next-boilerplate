/** @type {import('stylelint').Config} */
const stylelintConfig = {
  extends: ['stylelint-config-standard'],
  rules: {
    'color-no-invalid-hex': true,
    'at-rule-no-deprecated': [
      true,
      {
        ignoreAtRules: ['apply', 'variants', 'responsive', 'screen'],
      },
    ],
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['extends', 'tailwind'],
      },
    ],
  },
};

export default stylelintConfig;
