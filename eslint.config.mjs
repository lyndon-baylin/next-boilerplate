import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import nextPlugin from '@next/eslint-plugin-next';
import typescriptEslintEslintPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import prettier from 'eslint-plugin-prettier';
import tailwind from 'eslint-plugin-tailwindcss';
import unusedImports from 'eslint-plugin-unused-imports';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

const eslintConfig = [
  {
    ignores: [
      'node_modules',
      'next-env.d.ts',
      '.husky',
      '.next',
      '.vscode',
      '.next/**/*',
      'public',
      'public/**/*',
      '.git',
      'dist',
      'coverage',
    ],
  },
  ...compat.extends('next', 'next/core-web-vitals', 'prettier'),
  {
    plugins: {
      'unused-imports': unusedImports,
      prettier,
    },
    rules: {
      'prettier/prettier': 'error',
      camelcase: 'off',
      'import/prefer-default-export': 'off',
      'react/jsx-filename-extension': 'off',
      'react/jsx-props-no-spreading': 'off',
      'react/no-unused-prop-types': 'off',
      'react/require-default-props': 'off',
      'react/no-unescaped-entities': 'off',
      'import/extensions': [
        'error',
        'ignorePackages',
        {
          ts: 'never',
          tsx: 'never',
          js: 'never',
          jsx: 'never',
        },
      ],
      'no-unused-vars': 'off', // or "@typescript-eslint/no-unused-vars": "off",
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
    },
  },
  ...compat.extends('plugin:@typescript-eslint/recommended', 'prettier').map(config => ({
    ...config,
    files: ['**/*.+(ts|tsx)'],
  })),
  {
    files: ['**/*.+(ts|tsx)'],
    plugins: {
      '@typescript-eslint': typescriptEslintEslintPlugin,
    },
    languageOptions: {
      parser: tsParser,
    },
    rules: {
      'no-unused-vars': 'off', // or "@typescript-eslint/no-unused-vars": "off",
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      'no-use-before-define': [0],
      '@typescript-eslint/no-use-before-define': [1],
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/consistent-type-definitions': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          ignoreRestSiblings: true,
          varsIgnorePattern: '^_',
          argsIgnorePattern: '^_',
        },
      ],
    },
  },
  {
    files: ['**/*.{js,mjs,cjs,jsx,ts,tsx}'],
    plugins: {
      'jsx-a11y': jsxA11y,
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
    },
  },
  ...tailwind.configs['flat/recommended'],
];

export default eslintConfig;
