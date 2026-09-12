// 默默评价助手 · 默默传媒 — 本地商家好评运营工具
const store = require('./utils/store');

App({
  globalData: {
    // 当前已登录门店，结构见 utils/store.js 的 STORES
    store: null
  },
  onLaunch() {
    this.globalData.store = store.loadSession();
  }
});
