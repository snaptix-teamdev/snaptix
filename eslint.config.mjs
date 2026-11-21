// eslint.config.mjs
import path from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'
import storybook from 'eslint-plugin-storybook'

// Импортируем парсер и плагин TypeScript
import tsParser from '@typescript-eslint/parser'
import tsPlugin from '@typescript-eslint/eslint-plugin'

// Импортируем плагин React Hooks
import reactHooks from 'eslint-plugin-react-hooks'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

export default [
  // 1. Явная конфигурация для TypeScript/TSX файлов
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      'react-hooks': reactHooks,
    },
    rules: {
      // Базовые правила TypeScript
      ...tsPlugin.configs.recommended.rules,

      // Правила React Hooks
      ...reactHooks.configs.recommended.rules,

      // Отключаем несуществующие правила, которые вызывают ошибки
      'react-hooks/set-state-in-effect': 'off',
      'react-hooks/incompatible-library': 'off',
    },
  },

  // 2. Загружаем Next.js конфиги через compat (для остальных правил)
  ...compat.extends('next/core-web-vitals'),

  // 3. Storybook
  ...storybook.configs['flat/recommended'],

  // 4. Prettier (должен быть последним, чтобы отключать правила форматирования)
  ...compat.extends('prettier'),

  // 5. Глобальные игнорируемые паттерны
  {
    ignores: [
      '.next/**',
      'out/**',
      'build/**',
      'node_modules/**',
      'next-env.d.ts',
      '*.config.js',
      '*.config.mjs',
      'dist/**',
      'coverage/**',
    ],
  },
]
