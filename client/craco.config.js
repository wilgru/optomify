const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { 
                '@layout-header-background': '#FAFCFC',
                '@primary-color': '#00ACB1',
                '@text-color': '#015D67',
                // '@menu-item-height': 'fit-content',
                // '@menu-item-padding': 'none'
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};