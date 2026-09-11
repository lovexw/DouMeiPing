# 抖美评小程序（doumeiping）

「抖美评系统 · 默默传媒」— 本地商家好评运营工具的微信小程序实现。
与官网落地页（[index.html](../index.html)）和 H5 演示（[demo/luckin.html](../demo/luckin.html)）保持同一套设计规范：
主色 `#0052ff`、渐变按钮、圆角卡片、PingFang SC 字体栈、移动端优先。

## 页面结构

| 页面 | 路径 | 说明 |
| --- | --- | --- |
| 首页 | pages/entry | 产品落地页：核心功能、核心优势、适用行业、定价、演示入口 |
| 门店访问 | pages/access | 访问码验证（一店一码），演示码 123 / 666 / 888 |
| 门店工具 | pages/home | 好评生成（双风格）、一键复制、美团/抖音跳转、WiFi 工具 |
| 使用指南 | pages/guide | 三步流程、评价小贴士、常见问题（可展开） |
| 合作咨询 | pages/coop | 定价方案、合作流程、联系方式（一键复制） |

底部 tabBar：首页 / 指南 / 合作（纯文字模式，如需图标可在 `app.json` 的 tabBar 项里补充 `iconPath` / `selectedIconPath`）。

## 演示访问码

| 访问码 | 门店 | 行业词库 |
| --- | --- | --- |
| 123 | 瑞幸咖啡 · 演示门店 | 咖啡饮品 |
| 666 | 蜀香火锅 · 演示门店 | 火锅店 |
| 888 | 老地方烧烤 · 演示门店 | 烧烤店 |

## 目录说明

```
miniprogram/
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
2. 「导入项目」选择本 `miniprogram/` 目录，AppID 可先用测试号 / 游客模式。
3. 编译后：首页 → 「进入门店工具」→ 输入访问码 `123` → 体验生成、复制、跳转全流程。

## 流程说明

- 门店工具页「去美团 / 去抖音评价」：会先把当前好评复制到剪贴板，并弹窗引导打开对应 APP 粘贴发布；若门店配置了评价页链接，可再点「复制链接」获取直链。
- 「切换门店」会清除本机登录态并回到访问码页；登录态保存在本地存储（`dmp_session`），下次打开小程序可从首页直接续用。
- 小程序无法直接拉起美团 / 抖音 APP，「复制 + 弹窗引导」是小程序生态下的通用做法。
