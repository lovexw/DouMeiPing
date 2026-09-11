// 首页：产品介绍与合作入口
const store = require('../../utils/store');

Page({
  data: {
    hasSession: false,
    features: [
      { icon: '词', title: '分行业专属词库', desc: '覆盖餐饮、休闲、零售等多业态，每类行业独立写实词库，评价贴合真实场景，拒绝空泛模板。' },
      { icon: '智', title: '智能生成不雷同', desc: '多维组合算法随机抽取卖点拼接生成，百条评价横向不重复，避免平台判定同质化内容。' },
      { icon: '快', title: '一键复制直达平台', desc: '生成、复制、跳转评价页三步闭环完整链路，顾客无需打字即可完成评价流程。' },
      { icon: '店', title: '门店独立账号', desc: '一店一码一密码，数据门店间完全隔离，支持批量管理，适合连锁品牌多门店运营。' },
      { icon: '双', title: '双平台支持', desc: '同时支持美团、抖音两大本地生活平台，一键跳转对应评价页，覆盖主流流量入口。' },
      { icon: '移', title: '移动端原生适配', desc: '微信内点开即用，无需下载APP，界面贴合原生操作体验，店员与顾客都能快速上手。' }
    ],
    advantages: [
      { title: '匹配平台算法偏好', desc: '美团、抖音本地生活算法更青睐有具体细节的真实体验评价。词库全部基于行业真实卖点生成，无空泛套话，更容易被判定为优质内容，获得额外曝光加权。' },
      { title: '高含金量不折叠', desc: '多维随机组合机制，百条评价结构、卖点、措辞各不相同，避免同质化模板被平台识别折叠。每一条都能正常展示，实实在在影响潜在顾客决策。' },
      { title: '持续升级增值服务', desc: '后续将陆续上线行业词库定制、评价运营指导、多平台扩展、数据看板等增值功能，付费用户优先享受，产品持续迭代不加价。' }
    ],
    industries: ['烧烤店', '火锅店', '卤味熟食', '咖啡饮品', 'KTV', '电玩城', '足疗按摩', '特产零食', '美容美发', '酒店民宿'],
    plans: store.PRICING
  },
  onShow() {
    this.setData({ hasSession: !!store.loadSession() });
  },
  enterTool() {
    if (store.loadSession()) {
      wx.navigateTo({ url: '/pages/home/home' });
    } else {
      wx.navigateTo({ url: '/pages/access/access' });
    }
  },
  goCoop() {
    wx.switchTab({ url: '/pages/coop/coop' });
  },
  goGuide() {
    wx.switchTab({ url: '/pages/guide/guide' });
  }
});
