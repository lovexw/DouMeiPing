// 【暂时停用 2026-09】门店访问码验证（一店一码）：当前商家从首页免密直达工具页。
// 正式上线恢复访问码时，把 entry.js enterTool 与 home.js onLoad 的入口改回跳转本页即可
const store = require('../../utils/store');

Page({
  data: {
    code: '',
    focused: false
  },
  onInput(e) {
    this.setData({ code: e.detail.value });
  },
  onFocus() {
    this.setData({ focused: true });
  },
  onBlur() {
    this.setData({ focused: false });
  },
  onSubmit() {
    const code = (this.data.code || '').trim();
    if (!code) {
      wx.showToast({ title: '请输入访问码', icon: 'none' });
      return;
    }
    const s = store.findStoreByCode(code);
    if (!s) {
      wx.showToast({ title: '访问码错误，请重试', icon: 'none' });
      this.setData({ code: '' });
      return;
    }
    store.saveSession(s);
    getApp().globalData.store = s;
    wx.showToast({ title: '登录成功', icon: 'success' });
    setTimeout(() => {
      wx.navigateTo({ url: '/pages/home/home' });
    }, 500);
  }
});
