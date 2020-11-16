const automator = require('miniprogram-automator');
const path = require('path');
const defaultOptions = {
  cliPath: '', // 工具 cli 位置，如果你没有更改过默认安装位置，可以忽略此项
  projectPath: '' // 项目文件地址
};

module.exports = class UniMpLaunchPlugin {
    constructor (options = {}) {
        this.options = Object.assign({}, defaultOptions, options);
        this.launch = false
    }
    apply (compiler) {
        let self = this;
        if (process.env.UNI_PLATFORM !== 'mp-weixin' || process.env.OPEN === 'false') {
          return;
        }
        if (process.env.NODE_ENV === 'production' && process.env.OPEN !== 'true') {
          return;
        }
        compiler.hooks.done.tapPromise("uni-mp-launch-plugin", function () {
          if (self.launch) {
            return Promise.resolve();
          }
          self.launch = true;
          const projectPath = self.options.projectPath || process.env.UNI_OUTPUT_DIR;
          console.log('uni-mp-launch-plugin: 正在打开微信开发者工具, 路径' + projectPath);
          return automator.launch({
            cliPath: self.options.cliPath || undefined,
            projectPath,
          }).then(function(miniProgram) {
            return miniProgram.disconnect();
          }).catch(function (e) {
            console.group && console.group('uni-mp-launch-plugin');
            console.error(e);
            console.error('工具的服务端口已关闭。要使用命令行调用工具，请打开工具 -> 设置 -> 安全设置，将服务端口开启。');
            console.error('详细信息: https://developers.weixin.qq.com/miniprogram/dev/devtools/cli.html');
            console.groupEnd && console.groupEnd();
          });
        });
    }
}