// 默默评价助手 · 默默传媒 — 门店评价内容与口碑运营工具
const store = require('./utils/store');

App({
  globalData: {
    // 当前已登录门店，结构见 utils/store.js 的 STORES
    store: null
  },
  onLaunch() {
    // 访问码验证暂时下线（2026-09）：不再自动恢复登录门店，统一免密进入默认演示门店；
    // 正式上线恢复一店一码时改回 this.globalData.store = store.loadSession()
  }
});
