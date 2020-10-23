/*
👋 Hi! This file was autogenerated by tslint-to-eslint-config.
https://github.com/typescript-eslint/tslint-to-eslint-config

It represents the closest reasonable ESLint configuration to this
project's original TSLint configuration.

We recommend eventually switching this configuration to extend from
the recommended rulesets in typescript-eslint.
https://github.com/typescript-eslint/tslint-to-eslint-config/blob/master/docs/FAQs.md

Happy linting! 💖
*/
module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: ["prettier", "prettier/@typescript-eslint"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.json",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "@typescript-eslint/tslint"],
  rules: {
    "@typescript-eslint/ban-types": "warn",
    "@typescript-eslint/no-inferrable-types": "error",
    "@typescript-eslint/no-misused-new": "error",
    "@typescript-eslint/no-unused-expressions": "error",
    "@typescript-eslint/type-annotation-spacing": "error",
    "@typescript-eslint/explicit-member-accessibility": [
      "error",
      {
        accessibility: "explicit",
      },
    ],
    "@typescript-eslint/member-ordering": "off",
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/no-empty-interface": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/prefer-function-type": "off",
    "@typescript-eslint/dot-notation": "off",
    "@typescript-eslint/unified-signatures": "off",
    "@typescript-eslint/indent": "off",
    "arrow-body-style": "error",
    "constructor-super": "error",
    "comma-dangle": [
      "warn",
      {
        arrays: "always-multiline",
        objects: "always-multiline",
        functions: "never",
        imports: "never",
        exports: "never",
      },
    ],
    curly: ["warn", "multi-line"],
    "eol-last": "warn",
    eqeqeq: ["error", "smart"],

    "no-bitwise": "error",
    "no-caller": "error",
    "no-eval": "error",
    "no-fallthrough": "error",
    "no-new-wrappers": "error",
    "no-shadow": [
      "error",
      {
        hoist: "all",
      },
    ],
    "no-throw-literal": "error",
    "no-trailing-spaces": "warn",
    "no-undef-init": "error",
    "no-unused-labels": "error",
    "no-var": "error",
    "prefer-const": "error",
    radix: "error",
    "spaced-comment": [
      "warn",
      "always",
      {
        markers: ["/"],
      },
    ],
    // For some reason, errors with `Definition for rule
    // '@typescript-eslint/class-name-casing' was not found`.
    // "@typescript-eslint/class-name-casing": "error",
  },
}
