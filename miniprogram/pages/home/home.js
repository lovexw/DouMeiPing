// 门店工具主页：好评生成 / 复制 / 平台跳转 / WiFi 工具
const storeUtil = require('../../utils/store');
const review = require('../../utils/review');

Page({
  data: {
    store: null,
    style: 'normal',
    styleLabel: '真实评价风',
    industryLabel: '',
    reviewText: '',
    reviewLength: 0,
    hasReview: false
  },
  onLoad() {
    const s = getApp().globalData.store || storeUtil.loadSession();
    if (!s) {
      // 未登录直接访问时回到访问码页
      wx.redirectTo({ url: '/pages/access/access' });
      return;
    }
    getApp().globalData.store = s;
    this.setData({
      store: s,
      industryLabel: review.industryLabel(s.industry)
    });
  },
  onSwitchStyle(e) {
    const style = e.currentTarget.dataset.style;
    if (style === this.data.style) return;
    this.setData({
      style: style,
      styleLabel: style === 'xhs' ? '小红书探店风' : '真实评价风'
    });
    if (this.data.hasReview) this.onGenerate();
  },
  onGenerate() {
    const st = this.data.store;
    const text = review.generateReview(st.industry, this.data.style);
    this.setData({
      reviewText: text,
      reviewLength: text.length,
      hasReview: true
    });
  },
  onCopy() {
    if (!this.data.hasReview) this.onGenerate();
    wx.setClipboardData({
      data: this.data.reviewText,
      success: () => {
        wx.showToast({ title: '复制成功', icon: 'success' });
      }
    });
  },
  onJumpPlatform(e) {
    const platform = e.currentTarget.dataset.platform;
    const st = this.data.store;
    const label = platform === 'meituan' ? '美团' : '抖音';
    if (!this.data.hasReview) this.onGenerate();
    wx.setClipboardData({
      data: this.data.reviewText,
      success: () => {
        const link = st.links && st.links[platform];
        wx.showModal({
          title: '好评已复制',
          content: '打开' + label + 'APP搜索「' + st.name + '」粘贴发布即可。',
          showCancel: !!link,
          confirmText: link ? '复制链接' : '知道了',
          success: (res) => {
            if (res.confirm && link) {
              wx.setClipboardData({
                data: link,
                success: () => wx.showToast({ title: '链接已复制', icon: 'none' })
              });
            }
          }
        });
      }
    });
  },
  onCopyWifi(e) {
    const field = e.currentTarget.dataset.field;
    const value = this.data.store.wifi[field] || '';
    wx.setClipboardData({
      data: value,
      success: () => {
        wx.showToast({ title: field === 'password' ? 'WiFi密码已复制' : 'WiFi名称已复制', icon: 'none' });
      }
    });
  },
  goGuide() {
    wx.switchTab({ url: '/pages/guide/guide' });
  },
  onLogout() {
    storeUtil.clearSession();
    getApp().globalData.store = null;
    wx.reLaunch({ url: '/pages/access/access' });
  }
});
