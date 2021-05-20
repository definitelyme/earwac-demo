// const includePaths = [
//   `@import "~/assets/styles/_variables.scss"`,
//   `@import "~/sample.scss"`,
// ];

module.exports = {
  css: {
    loaderOptions: {
      sass: {
        // sourceMap: true,
      },
    },
  },
  transpileDependencies: ["vuetify"],
};
