// 门店配置、定价、联系方式与访问会话管理
// 新接入真实门店时，在 STORES 中按现有结构增加「访问码 -> 门店信息」条目即可
// 访问码验证暂时下线（2026-09）：商家免密直达默认门店；正式上线恢复一店一码时，
// 重新启用 pages/access 页，并把 entry/home 的入口改回访问码校验

const STORES = {
  '123': {
    id: 'store-luckin',
    code: '123',
    brand: 'LUCKIN COFFEE',
    name: '瑞幸咖啡 · 演示门店',
    desc: '瑞幸咖啡 · 门店运营工具',
    industry: 'coffee',
    wifi: { ssid: '瑞幸咖啡', password: '12345678' },
    // 平台评价页链接，留空时首页跳转仅复制参考文案
    links: {
      meituan: 'http://dpurl.cn/o6FwsGmz',
      douyin: 'https://v.douyin.com/TSRAHv2UZWE'
    }
  },
  '666': {
    id: 'store-hotpot',
    code: '666',
    brand: '蜀香火锅',
    name: '蜀香火锅 · 演示门店',
    desc: '蜀香火锅 · 门店运营工具',
    industry: 'hotpot',
    wifi: { ssid: '蜀香火锅', password: 'hotpot666' },
    links: { meituan: '', douyin: '' }
  },
  '888': {
    id: 'store-bbq',
    code: '888',
    brand: '老地方烧烤',
    name: '老地方烧烤 · 演示门店',
    desc: '老地方烧烤 · 门店运营工具',
    industry: 'bbq',
    wifi: { ssid: '老地方烧烤', password: 'bbq888888' },
    links: { meituan: '', douyin: '' }
  }
};

// 定价方案（首页与合作页共用同一份数据）
const PRICING = [
  {
    name: '体验版',
    desc: '新店首次体验专享，仅限开通一次',
    price: '39.9',
    unit: '单门店 · 月',
    recommend: false,
    items: [
      '无限次体验表达辅助',
      '对应行业专属词库',
      '美团+抖音双平台跳转',
      '门店独立访问码',
      '词库永久免费更新'
    ]
  },
  {
    name: '年度版',
    desc: '长期使用更划算，每月比体验价省 15 元',
    price: '299',
    unit: '单门店 · 年付（折合24.9元/月）',
    recommend: true,
    items: [
      '包含体验版全部功能',
      '折合每天仅需 0.82 元',
      '全年词库免费更新迭代',
      '优先支持行业词库定制',
      '专属客服使用指导'
    ]
  }
];

// 联系方式（占位信息，上线前替换为真实商务联系方式）
const CONTACTS = [
  { label: '商务微信', value: 'momo-meiti666' },
  { label: '联系电话', value: '138-0000-0000' },
  { label: '商务邮箱', value: 'coop@momo.media' }
];

const SESSION_KEY = 'dmp_session';

// 访问码下线期间默认进入的演示门店
const DEFAULT_STORE_CODE = '123';

function getDefaultStore() {
  return STORES[DEFAULT_STORE_CODE] || null;
}

function findStoreByCode(code) {
  if (!code) return null;
  return STORES[String(code).trim()] || null;
}

function saveSession(s) {
  try {
    wx.setStorageSync(SESSION_KEY, s.id);
  } catch (e) { /* 存储失败时仅影响本次免登录 */ }
}

function loadSession() {
  try {
    const id = wx.getStorageSync(SESSION_KEY);
    if (!id) return null;
    const keys = Object.keys(STORES);
    for (let i = 0; i < keys.length; i++) {
      if (STORES[keys[i]].id === id) return STORES[keys[i]];
    }
    return null;
  } catch (e) {
    return null;
  }
}

function clearSession() {
  try {
    wx.removeStorageSync(SESSION_KEY);
  } catch (e) { /* 忽略 */ }
}

module.exports = {
  STORES,
  PRICING,
  CONTACTS,
  getDefaultStore,
  findStoreByCode,
  saveSession,
  loadSession,
  clearSession
};
