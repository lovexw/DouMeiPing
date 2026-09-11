# 抖美评系统 · 默默传媒

> 本地商家好评运营工具 — 基于分行业写实词库与智能组合算法，一键生成符合平台偏好的优质评价，复制直达美团 / 抖音评价页，帮助门店拿到更多算法推荐流量。

本仓库包含「抖美评系统」的三部分实现，共用同一套设计规范：主色 `#0052ff`、渐变按钮（`135deg, #0052ff → #2b7dff`）、圆角卡片、PingFang SC 字体栈、移动端优先。

| 组成部分 | 位置 | 说明 |
| --- | --- | --- |
| 官网落地页 | [index.html](index.html) | 产品介绍、核心功能、核心优势、适用行业、透明定价，纯静态单文件 |
| H5 演示 | [demo/luckin.html](demo/luckin.html) | 瑞幸咖啡门店工具演示（访问码 `123`），完整体验生成 → 复制 → 跳转链路 |
| 微信小程序 | [miniprogram/](miniprogram/) | 完整小程序实现：5 个页面 + 分行业词库引擎 + 多门店访问码体系 |

## 目录结构

```
DouMeiPing/
├── index.html                  # 官网落地页
├── demo/
│   └── luckin.html             # H5 演示（瑞幸咖啡门店工具）
└── miniprogram/                # 微信小程序（详见 miniprogram/README.md）
    ├── app.js / app.json / app.wxss
    ├── project.config.json
    ├── sitemap.json
    ├── utils/
    │   ├── store.js            # 门店配置、定价、联系方式、会话管理
    │   └── review.js           # 分行业词库与好评生成算法
    └── pages/
        ├── entry/              # 首页（产品落地页）
        ├── access/             # 门店访问（访问码验证）
        ├── home/               # 门店工具（生成 / 复制 / 跳转 / WiFi）
        ├── guide/              # 使用指南
        └── coop/               # 合作咨询
```

## 快速开始

### 落地页与 H5 演示

无任何构建依赖，直接用浏览器打开 `index.html` 即可；也可以一键部署到 GitHub Pages / Vercel / 任意静态托管。

### 微信小程序

1. 下载安装[微信开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)。
2. 「导入项目」选择本仓库的 `miniprogram/` 目录，AppID 先用测试号 / 游客模式即可。
3. 编译后：首页 → 「进入门店工具」→ 输入访问码 `123` → 体验全流程。

### 演示访问码（小程序）

| 访问码 | 门店 | 行业词库 |
| --- | --- | --- |
| 123 | 瑞幸咖啡 · 演示门店 | 咖啡饮品 |
| 666 | 蜀香火锅 · 演示门店 | 火锅店 |
| 888 | 老地方烧烤 · 演示门店 | 烧烤店 |

## 核心机制

- **分行业词库**：内置咖啡饮品 / 火锅店 / 烧烤店 / 足疗按摩 / 美容美发 / 通用兜底六套词库，每套含「真实评价风」与「小红书探店风」两种风格。
- **组合生成算法**：每条好评由开头、核心体验、消费体验、收尾四段随机拼接，百条横向不重复，且自动避开上一条结果，避免被平台判定同质化。
- **一店一码**：访问码即门店账号，门店间数据完全隔离，适合连锁多门店运营。
- **平台跳转**：小程序无法直接拉起美团 / 抖音 APP，采用「好评复制到剪贴板 + 弹窗引导粘贴」的通用做法；门店可配置评价页直链供二次复制。

## 定制指南

| 想改什么 | 位置 |
| --- | --- |
| 接入真实门店 / 修改访问码 / WiFi / 评价页链接 | `miniprogram/utils/store.js` 的 `STORES` |
| 扩充好评词库 / 新增行业 | `miniprogram/utils/review.js` 的 `INDUSTRIES` 与 `LIBS` |
| 定价方案（落地页与小程序共用逻辑各自维护） | `index.html` 定价区块、`miniprogram/utils/store.js` 的 `PRICING` |
| 商务联系方式（当前为占位信息） | `miniprogram/utils/store.js` 的 `CONTACTS` |
| 小程序 AppID（当前为游客模式） | `miniprogram/project.config.json` |
| 品牌主色 / 设计规范 | 各文件中的 `#0052ff` 与渐变 `#2b7dff` |

详细说明见 [miniprogram/README.md](miniprogram/README.md)。

## 版权

© 2026 默默传媒 · 抖美评系统
