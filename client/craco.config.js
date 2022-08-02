// const CracoLessPlugin = require('craco-less');

// module.exports = {
//   plugins: [
//     {
//       plugin: CracoLessPlugin,
//       options: {
//         lessLoaderOptions: {
//           lessOptions: {
//             modifyVars: { 
//                 '@layout-header-background': '#FAFCFC',
//                 '@primary-color': '#00ACB1',
//                 '@success-color': '#CAF0C1',
//                 '@error-color': 'salmon',
//                 '@text-color': '#015D67',
//                 // '@menu-item-height': 'fit-content',
//                 // '@menu-item-padding': 'none'
//             },
//             javascriptEnabled: true,
//           },
//         },
//       },
//     },
//   ],
// };

const CracoAntDesignPlugin = require("craco-antd");

module.exports = {
  plugins: [
    {
      plugin: CracoAntDesignPlugin,
      options: {
        customizeTheme: {
          '@layout-header-background': '#FAFCFC',
          '@primary-color': '#00ACB1',
          '@success-color': '#CAF0C1',
          '@error-color': 'salmon',
          '@text-color': '#015D67'
        },
      },
    },
  ],
};