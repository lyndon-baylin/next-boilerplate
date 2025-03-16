/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */

const prettierConfig = {
  arrowParens: 'avoid',
  bracketSameLine: false,
  bracketSpacing: true,
  htmlWhitespaceSensitivity: 'css',
  insertPragma: false,
  printWidth: 120,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: true,
  jsxSingleQuote: false,
  trailingComma: 'all',
  proseWrap: 'always',
  quoteProps: 'as-needed',
  requirePragma: false,
  importOrder: [
    '^(next/(.*)$)|^(next$)',
    '^(react/(.*)$)|^(react$)',
    '^(lucide-react$)',
    '<TYPES>^(node:)',
    '<TYPES>',
    '<TYPES>^[.]',
    '<BUILTIN_MODULES>',
    '<THIRD_PARTY_MODULES>',
    '^@/(.*)$',
    '^[./]',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrderCaseInsensitive: true,

  plugins: ['@trivago/prettier-plugin-sort-imports', 'prettier-plugin-tailwindcss'],
  overrides: [
    {
      files: ['*.json', '*.yml'],
      options: {
        tabWidth: 4,
      },
    },
  ],
};

export default prettierConfig;
