import type { StorybookConfig } from '@storybook/nextjs-vite'

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx|js|jsx|mdx)'],
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-a11y',
    '@storybook/addon-onboarding',
    '@storybook/addon-vitest',
    'storybook-addon-pseudo-states',
  ],
  framework: '@storybook/nextjs-vite',
  staticDirs: ['../public'],

  async viteFinal(config) {
    return {
      ...config,
      css: {
        modules: {
          localsConvention: 'camelCaseOnly',
        },
      },
    }
  },
}

export default config
