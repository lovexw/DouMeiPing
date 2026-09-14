# 默默好赞评价管理助手 · 小程序版（已冻结）

> ⚠️ **本目录已于 2026-09-14 冻结**：小程序初稿完成即定格，默认不做任何更新；
> 仅当项目所有者明确点名小程序时，才允许改动。日常迭代全部发生在网页版与文档层。

「默默好赞评价管理助手 · 默默传媒」— 门店评价内容与口碑运营工具的微信小程序实现。
与官网落地页（DouMeiPing/index.html）和 H5 演示（demo/luckin.html）保持同一套设计规范：
主色 `#0052ff`、渐变按钮、圆角卡片、PingFang SC 字体栈、移动端优先。

## 页面结构

| 页面 | 路径 | 说明 |
| --- | --- | --- |
| 首页 | pages/entry | 产品落地页：核心功能、核心优势、适用行业、定价、演示入口 |
| 门店访问 | pages/access | 访问码验证页（暂时停用，正式上线恢复一店一码时启用） |
| 门店工具 | pages/home | 体验表达参考（双风格）、一键复制、美团/抖音跳转、WiFi 工具 |
| 使用指南 | pages/guide | 三步流程、评价小贴士、常见问题（可展开） |
| 合作咨询 | pages/coop | 定价方案、合作流程、联系方式（一键复制） |

底部 tabBar：首页 / 指南 / 合作（纯文字模式，如需图标可在 `app.json` 的 tabBar 项里补充 `iconPath` / `selectedIconPath`）。

## 演示门店与访问码

访问码验证暂时下线（2026-09）：打开小程序后免密直达默认演示门店（瑞幸咖啡 · 咖啡饮品词库）。
`utils/store.js` 的 `STORES` 中仍保留各门店访问码（123 咖啡 / 666 火锅 / 888 烧烤），
正式上线恢复一店一码时，重新启用 `pages/access` 页并把入口改回访问码校验即可。

## 目录说明

```
doumeiping/
├── app.js / app.json / app.wxss      # 全局配置与公共样式
├── project.config.json               # 项目配置（当前为游客模式 appid）
├── sitemap.json
├── utils/
│   ├── store.js                      # 门店配置 STORES、定价 PRICING、联系方式 CONTACTS、会话管理
│   └── review.js                     # 分行业词库 LIBS 与生成算法 generateReview()
└── pages/
    ├── entry/  access/  home/  guide/  coop/
```

行业词库目前内置：咖啡饮品 / 火锅店 / 烧烤店 / 足疗按摩 / 美容美发 / 通用兜底（generic）。
每套词库含「真实评价风」与「小红书探店风」两种风格，每种风格按
开头（openers）/ 核心体验（cores）/ 消费体验（experiences）/ 收尾（closers）四组随机拼接，
生成结果会自动避开上一条，避免连续雷同。

## 自定义

1. **接入真实门店**：在 `utils/store.js` 的 `STORES` 中按现有结构新增「访问码 -> 门店信息」条目（门店名、行业、WiFi、平台评价页链接）。
2. **扩充词库 / 新增行业**：在 `utils/review.js` 的 `INDUSTRIES` 加标签，并在 `LIBS` 中补充对应行业的四组文案（normal 与 xhs 两套风格各一组）。
3. **联系方式**：`CONTACTS` 中为占位信息，上线前替换为真实商务微信 / 电话 / 邮箱。
4. **AppID**：`project.config.json` 当前为游客模式（`touristappid`），正式发布前替换为自己的小程序 AppID。

## 运行

1. 下载安装[微信开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)。
2. 「导入项目」选择本目录，AppID 可先用测试号 / 游客模式。
3. 编译后：首页 → 「进入门店工具」→ 免密进入默认演示门店，体验生成、复制、跳转全流程。

## 流程说明

- 门店工具页「去美团 / 去抖音评价」：会先把参考文案复制到剪贴板，并弹窗引导打开对应 APP 粘贴发布；若门店配置了评价页链接，可再点「复制链接」获取直链。
- 「切换门店」入口随访问码验证一并下线，恢复一店一码时一并恢复（届时登录态保存在本地存储 `dmp_session`，下次打开可从首页直接续用）。
