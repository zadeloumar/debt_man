const { expo } = require('./app.json');

module.exports = () => {
  const apiUrl = process.env.API_URL ?? expo.extra?.apiUrl ?? 'https://api.example.com';

  return {
    ...expo,
    extra: {
      ...expo.extra,
      apiUrl,
    },
  };
};
