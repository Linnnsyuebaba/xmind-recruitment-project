module.exports = {
  publicPath:
    process.env.NODE_ENV === 'production' ? '/xmind-recruitment-project' : '/',
  transpileDependencies: ['vuetify'],
  devServer: {
    proxy: {
      '/xmind': {
        target: 'http://127.0.0.1:2222',
        changeOrigin: true, //是否跨域
        ws: true, //是否启用websockets
        pathRewrite: {
          '^xmind': '/xmind',
        },
      },
    },
  },
}
