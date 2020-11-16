# uni-mp-launch-plugin

# 使用之前

工具的服务端口已关闭。要使用命令行调用工具，请打开工具 -> 设置 -> 安全设置，将服务端口开启。
详细信息: https://developers.weixin.qq.com/miniprogram/dev/devtools/cli.html

```javascript
const UniMpLaunchPlugin = require('uni-mp-launch-plugin');
webConf.plugins.push(new UniMpLaunchPlugin({
    cliPath: '', // 非必填，工具 cli 位置，如果你没有更改过默认安装位置，可以忽略此项
    projectPath: '' //  非必填，项目文件地址。默认会根据环境去找
}));
```

# 不想打开devtool

非production模式下默认打开，如不想打开 设置open为false

production模式下默认不打开，如不想打开 设置open为true

```sh
cross-env OPEN=false npm run build
```

# vue-cli

```sh
vue add uni-mp-launch
```