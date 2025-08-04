module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    ...(process.env.NODE_ENV === 'production' || process.argv.includes('--minify') ? {
      '@fullhuman/postcss-purgecss': {
        content: [
          './**/*.html',
          './assets/js/**/*.js',
          './locales/**/*.json'
        ],
        defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
        safelist: {
          standard: [/^show$/, /^active$/, /^complete$/, /^fade-in$/, /^typing-/, /^service-/, /^hero-/],
          deep: [/^blob/, /^mesh/, /^grain/, /^mobile-/],
          greedy: [/^pre-animation/]
        }
      },
      'cssnano': {
        preset: ['default', {
          discardComments: {
            removeAll: true,
          },
          normalizeWhitespace: true,
          minifyFontValues: true,
          minifySelectors: true,
          calc: true,
          colormin: true,
          convertValues: true,
          discardEmpty: true,
          discardOverridden: true,
          mergeLonghand: true,
          mergeRules: true,
          minifyGradients: true,
          minifyParams: true,
          minifySelectors: true,
          normalizeCharset: true,
          normalizeDisplayValues: true,
          normalizePositions: true,
          normalizeRepeatStyle: true,
          normalizeUnicode: true,
          normalizeUrl: true,
          normalizeString: true,
          normalizeTimingFunctions: true,
          reduceInitial: true,
          reduceTransforms: true,
          svgo: false
        }]
      }
    } : {})
  },
}
