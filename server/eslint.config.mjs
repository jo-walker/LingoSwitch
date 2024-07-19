import globals from 'globals';
import pluginJs from '@eslint/js';

export default [
  {
    files: ['**/*.js'],
    languageOptions: {
      sourceType: 'commonjs',
      ecmaVersion: 12,
      globals: {
        ...globals.node, // Add Node.js globals
      },
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-var-requires': 'off',
      'no-undef': 'off',
    },
  },
  pluginJs.configs.recommended,
];
