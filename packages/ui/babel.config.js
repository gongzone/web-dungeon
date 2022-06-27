module.exports = {
  presets: [['@babel/preset-react', { runtime: 'automatic' }]],
  env: {
    test: {
      presets: [
        '@babel/preset-env',
        {
          targets: {
            node: 'current',
          },
        },
      ],
    },
  },
}
