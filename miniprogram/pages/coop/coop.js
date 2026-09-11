// 合作咨询：定价 / 合作流程 / 联系方式
const store = require('../../utils/store');

Page({
  data: {
    plans: store.PRICING,
    contacts: store.CONTACTS,
    process: [
      { title: '联系咨询', desc: '添加商务微信，备注「抖美评合作」' },
      { title: '选定套餐', desc: '按门店数量与使用周期，选择月度版或年度版' },
      { title: '开通账号', desc: '获取门店专属访问码与图文操作指引' },
      { title: '上手使用', desc: '进入小程序，生成、复制、跳转三步完成评价' }
    ]
  },
  onConsult() {
    const wechat = store.CONTACTS[0].value;
    wx.setClipboardData({
      data: wechat,
      success: () => {
        wx.showToast({ title: '微信号已复制，去微信添加咨询', icon: 'none' });
      }
    });
  },
  onCopyContact(e) {
    const index = e.currentTarget.dataset.index;
    const c = this.data.contacts[index];
    wx.setClipboardData({
      data: c.value,
      success: () => {
        wx.showToast({ title: c.label + '已复制', icon: 'none' });
      }
    });
  }
});
