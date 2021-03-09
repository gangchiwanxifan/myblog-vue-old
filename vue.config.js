module.exports = {
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          // antd主题色配置
          "primary-color": "#FA541C"
        },
        javascriptEnabled: true
      }
    }
  },
  devServer: {
    proxy: "http://127.0.0.1:9100"
    // proxy: {
    //   "/api": {
    //     target: "http://127.0.0.1:9100",
    //     pathRewrite: {
    //       "^/api": "/"
    //     },
    //     // changeOrigin: true
    //   }
    //   // '/foo': {
    //   //   target: '<other_url>'
    //   // }
    // }
  }
};
