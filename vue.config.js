const path = require('path');
function resolve (dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    /* 设置路径别名 */
    chainWebpack:(config)=>{
        config.resolve.alias
        .set('@$',resolve('src'))
        .set('@components',resolve('src/components'))
        .set('@images',resolve('src/assets/images'))
    },
    /* 解决跨域 */
    devServer: {
        open: true,
        host: 'localhost',
        port: 8080,//启动使用的端口号
        https: false,
        hotOnly: false,
        proxy: { // 配置跨域
            '/api': {
                target: 'http://localhost:8081/',
                ws: true,
                changOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        },
        before: app => { }
    }
}