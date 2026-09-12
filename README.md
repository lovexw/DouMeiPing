# 默默评价管理助手（DouMeiPing）

「默默评价管理助手 · 默默传媒」— 本地商家好评运营工具的 **网页版**。
基于分行业写实词库与智能组合算法，生成符合美团、抖音平台偏好的优质评价，一键复制后前往平台粘贴发布。

纯静态实现，无任何构建依赖，可直接部署到 GitHub Pages / Vercel / 任意静态托管。
设计规范：主色 `#0052ff`、渐变按钮（`135deg, #0052ff → #2b7dff`）、圆角卡片、PingFang SC 字体栈、移动端优先。

## 在线演示

| 演示页 | 门店 | 行业词库 | 访问码 |
| --- | --- | --- | --- |
| [demo/luckin.html](demo/luckin.html) | 瑞幸咖啡 · 演示门店 | 咖啡饮品 | 123 |
| [demo/chaocai.html](demo/chaocai.html) | 老灶台炒菜馆 · 演示门店 | 炒菜馆 | 234 |
| [demo/zuliao.html](demo/zuliao.html) | 云舒足道 · 演示门店 | 足疗按摩 | 345 |
| [demo/ronghe.html](demo/ronghe.html) | 拾光融合餐厅 · 演示门店 | 融合菜 | 456 |
| [demo/kaoya.html](demo/kaoya.html) | 京香阁烤鸭店 · 演示门店 | 烤鸭店 | 567 |
| [demo/hotpot.html](demo/hotpot.html) | 蜀香火锅 · 演示门店 | 火锅店 | 666 |
| [demo/bbq.html](demo/bbq.html) | 老地方烧烤 · 演示门店 | 烧烤店 | 888 |

每个演示门店拥有 **独立二维码**：落地页「演示门店」区块直接展示各演示页的二维码，
每个演示页内也有「门店专属二维码」卡片，二维码内容为页面当前访问地址（客户端实时生成），
部署到任何域名下扫码都能正确直达，无需手动替换。

## 目录结构

```
DouMeiPing/
├── index.html                  # 官网落地页（品牌 / 功能 / 演示门店二维码 / 定价 / 合作咨询）
├── assets/
│   ├── logo.png                # 品牌 logo（512×512）
│   ├── logo-256.png            # logo 中尺寸备用
│   ├── favicon.ico             # 网站图标（内嵌 16/32/48）
│   ├── favicon-32.png          # 现代浏览器 PNG 图标
│   ├── apple-touch-icon.png    # iOS 添加到主屏图标
│   ├── qrcode.js               # 二维码生成库（qrcode-generator, MIT）
│   ├── demo.css                # 演示页公共样式
│   └── demo.js                 # 门店配置、分行业词库、演示页全部逻辑
├── demo/                       # 7 个演示门店页（薄壳，信息由 demo.js 填充）
│   ├── luckin.html  hotpot.html  chaocai.html  bbq.html
│   └── zuliao.html  ronghe.html  kaoya.html
├── docs/ROADMAP.md             # 发展规划与架构决策（项目外置记忆）
└── miniprogram/                # 微信小程序实现（同名产品的小程序版，详见其 README）
```

## 本地运行

直接双击打开 `index.html` 即可，无需服务器；二维码在本地为 `file://` 地址，
手机扫码不可达，部署到线上后自动变为线上地址。

## 演示页功能

- **访问码登录**：一店一码，登录态保存在 localStorage，刷新免登录，可「切换门店」退出。
- **双风格生成**：真实评价风 / 小红书探店风一键切换，开头 / 核心体验 / 消费体验 / 收尾四段随机拼接，自动避开上一条结果。
- **一键复制**：优先 Clipboard API，`file://` 等非安全环境自动降级 `execCommand`。
- **WiFi 工具**：门店 WiFi 名称密码一键复制。
- **门店专属二维码**：与当前访问地址实时对应，桌贴、海报、台卡通用。

## 定制指南

| 想改什么 | 位置 |
| --- | --- |
| 新增演示门店 / 修改访问码 / WiFi / 评价页链接 | `assets/demo.js` 的 `STORES` + 复制 `demo/` 下任一薄壳页改 `data-store` 与标题 |
| 扩充好评词库 / 新增行业 | `assets/demo.js` 的 `LIBS` 与 `INDUSTRY_LABELS` |
| 定价方案 | `index.html` 定价区块、`miniprogram/utils/store.js` 的 `PRICING` |
| 商务联系方式（当前为占位信息） | `index.html` 合作咨询区块、`miniprogram/utils/store.js` 的 `CONTACTS` |
| 品牌 logo / favicon | `assets/` 下同名文件 |
| 品牌主色 / 设计规范 | 各文件中的 `#0052ff` 与渐变 `#2b7dff` |

## 部署（GitHub Pages + 自定义域名）

- **正式访问地址**：[https://mm.xiaowuleyi.com](https://mm.xiaowuleyi.com)（经 Cloudflare 接入，`/demo/xxx.html` 会 307 到无后缀的 `/demo/xxx`，内容一致）
- GitHub Pages 原生地址：[https://lovexw.github.io/DouMeiPing/](https://lovexw.github.io/DouMeiPing/)（仓库设置 → Pages → `main` 分支 `/ (root)`）
- 所有页面为相对路径引用，部署在任意子路径都能正常工作；演示页二维码在浏览器端按当前访问地址实时生成，换域名无需改动任何代码。

## 合规说明

本工具定位为「评价内容辅助工具」：生成的评价文案是基于行业真实卖点的参考模板，
发布前请顾客基于真实消费体验确认。对外宣传不使用「刷好评」「保证排名」等字眼（广告法 + 平台风控）。

## 版权

© 2026 默默传媒 · 默默评价管理助手
