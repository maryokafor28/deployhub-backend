// eslint.config.js
import js from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  // Apply to all TypeScript files
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
  },

  // Base configs
  js.configs.recommended,
  ...tseslint.configs.recommended,

  // Custom rules and ignores
  {
    ignores: ["dist/**", "node_modules/**", "coverage/**", "*.js"],
  },
  {
    rules: {
      // Turn off base rule for TypeScript (conflicts with @typescript-eslint/no-unused-vars)
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      "no-console": "off",
      "prefer-const": "error",
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },
];
