# 注意事项
项目使用pnpm 安装依赖会导致Valor插件无法正常读取Vue/runtime中的ts类型，需要使用npm安装依赖

！！！请使用npm安装依赖，不要使用pnpm安装依赖！！！

# 项目启动
vuex库官方ts有一些问题需要修改node_modules中的定义，详见

`https://github.com/vuejs/vuex/issues/2223#issuecomment-1558601332`

## 网易云接口

项目中网易云相关 后端接口使用github上项目：

`https://github.com/Binaryify/NeteaseCloudMusicApi`

需要自行下载运行

