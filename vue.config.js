module.exports = {
    publicPath: "./",
    css: {
      loaderOptions: {
        less: {
          lessOptions: {

            modifyVars: {
              'primary-color': '#E5580B',
              'text-color': '#FFF',
              'heading-color': '#FFF'
            },
            javascriptEnabled: true,
          },
          prependData: `
                @import "@/less/_variables.less";
            `,
        },
      },
    },
  };