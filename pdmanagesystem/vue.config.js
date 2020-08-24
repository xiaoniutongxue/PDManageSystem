const path=require('path')

module.exports={

}

function resolve(dir){
  return path.join(__dirname,dir)//path.join(__dirname)设置绝对路径
}

module.exports = {
  // 公共路径(必须有的)
  publicPath: "./",
  // 输出文件目录
  outputDir: "dist",
  // 静态资源存放的文件夹(相对于ouputDir)
  assetsDir: "assets",
  // eslint-loader 是否在保存的时候检查(果断不用，这玩意儿我都没装)
  lintOnSave:false,
  // 我用的only，打包后小些
  runtimeCompiler: false,
  productionSourceMap: true, // 不需要生产环境的设置false可以减小dist文件大小，加速构建
  // webpack-dev-server 相关配置
  devServer: {
    open: false,  // npm run serve后自动打开页面
    host: '0.0.0.0',  // 匹配本机IP地址(默认是0.0.0.0)
    port: 8080, // 开发服务器运行端口号
    proxy: null,
  },

  /*配置文件别名*/
  chainWebpack:(config)=>{
    config.resolve.alias
      //set第一个参数：设置的别名，第二个参数：设置的路径
      .set('@',resolve('./src'))
      .set('components',resolve('./src/components'))
      .set('assets',resolve('./src/assets'))
      .set('network',resolve('./src/network'))
    config.resolve.symlinks(true);
  },

  /*配置全局less文件*/
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [path.resolve(__dirname, "src/assets/less/variable.less")] // 引入全局样式变量
    }
  }
}
