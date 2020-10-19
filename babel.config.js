module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: ['babel-plugin-styled-components'],
  plugins: [
    [
      'babel-plugin-root-import',
      {
        rootPathPrefix: '~',
        rootPathSuffix: 'src',
      },
    ],
  ],
};
