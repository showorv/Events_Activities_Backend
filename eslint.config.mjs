// @ts-check

import eslint from '@eslint/js';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';

export default defineConfig(
  eslint.configs.recommended,
//   tseslint.configs.recommended,
  tseslint.configs.strict,
  tseslint.configs.stylistic,
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-expressions": "off",
     "@typescript-eslint/no-dynamic-delete": "off",
     "@typescript-eslint/no-unused-vars":"warn",
     "@typescript-eslint/no-non-null-assertion":"warn"
    }
  }
);