module.exports = {
  presets: [
    'module:@react-native/babel-preset',
    '@babel/preset-typescript',  // Add this for TypeScript support
  ],
  plugins: [
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: '.env',
        blacklist: null,
        whitelist: null,
        safe: false,
        allowUndefined: false,
      },
    ],
  ],
};
