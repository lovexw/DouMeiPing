/* ============================================================
 * 默默好赞评价管理助手 · 演示页公共逻辑与分行业词库
 * 设计规范：主色 #0052ff、渐变按钮、圆角卡片、PingFang SC 字体栈
 * 依赖：assets/qrcode.js（Kazuhiko Arase, MIT）
 *
 * 每个演示页在 <body data-store="storeId"> 上声明门店，
 * 引入本文件后自动完成门店信息填充、生成、复制与二维码渲染。
 * 新增演示门店：在 STORES 加一条配置 + 在 LIBS 补词库 + 复制一个薄壳 HTML。
 * ============================================================ */

(function () {
  'use strict';

  /* ---------- 门店配置（一店一码） ---------- */
  var STORES = {
    luckin: {
      id: 'luckin', code: '123', icon: '☕',
      brand: 'LUCKIN COFFEE',
      name: '瑞幸咖啡 · 演示门店',
      desc: '瑞幸咖啡 · 门店运营工具',
      industry: 'coffee',
      wifi: { ssid: '瑞幸咖啡', password: '12345678' },
    },
    hotpot: {
      id: 'hotpot', code: '666', icon: '🍲',
      brand: '蜀香火锅',
      name: '蜀香火锅 · 演示门店',
      desc: '蜀香火锅 · 门店运营工具',
      industry: 'hotpot',
      wifi: { ssid: '蜀香火锅', password: 'hotpot666' },
    },
    chaocai: {
      id: 'chaocai', code: '234', icon: '🍳',
      brand: '老灶台炒菜馆',
      name: '老灶台炒菜馆 · 演示门店',
      desc: '老灶台炒菜馆 · 门店运营工具',
      industry: 'chaocai',
      wifi: { ssid: '老灶台炒菜馆', password: 'zaoTai234' },
    },
    bbq: {
      id: 'bbq', code: '888', icon: '🍢',
      brand: '老地方烧烤',
      name: '老地方烧烤 · 演示门店',
      desc: '老地方烧烤 · 门店运营工具',
      industry: 'bbq',
      wifi: { ssid: '老地方烧烤', password: 'bbq888888' },
    },
    zuliao: {
      id: 'zuliao', code: '345', icon: '💆',
      brand: '云舒足道',
      name: '云舒足道 · 演示门店',
      desc: '云舒足道 · 门店运营工具',
      industry: 'massage',
      wifi: { ssid: '云舒足道', password: 'yunShu345' },
    },
    ronghe: {
      id: 'ronghe', code: '456', icon: '🍽️',
      brand: '拾光融合餐厅',
      name: '拾光融合餐厅 · 演示门店',
      desc: '拾光融合餐厅 · 门店运营工具',
      industry: 'fusion',
      wifi: { ssid: '拾光融合餐厅', password: 'shiGuang456' },
    },
    kaoya: {
      id: 'kaoya', code: '567', icon: '🦆',
      brand: '京香阁烤鸭店',
      name: '京香阁烤鸭店 · 演示门店',
      desc: '京香阁烤鸭店 · 门店运营工具',
      industry: 'roastduck',
      wifi: { ssid: '京香阁烤鸭店', password: 'jingXiang567' },
    }
  };

  var INDUSTRY_LABELS = {
    coffee: '咖啡饮品', hotpot: '火锅店', chaocai: '炒菜馆', bbq: '烧烤店',
    massage: '足疗按摩', fusion: '融合菜', roastduck: '烤鸭店', generic: '通用行业'
  };

  /* ---------- 分行业词库 ----------
   * 每个行业两套风格：normal 真实评价风 / xhs 小红书探店风
   * 每套风格四组：openers 开头 / cores 核心体验 / experiences 消费体验 / closers 收尾
   * 文案均为「基于真实体验的参考模板」，发布前请顾客确认，符合合规红线。 */

  var LIBS = {

    coffee: {
      normal: {
        openers: [
          '瑞幸新出的奶酪系列真的可以，亲测不踩雷',
          '上班日常续命咖啡，瑞幸性价比一直在线',
          '抹茶奶酪拿铁种草好久了，今天终于喝到',
          '早八人必备，出杯速度真的稳',
          '这波奶酪新品诚意够，口感比想象中好',
          '每天一杯的节奏，打工人早餐标配'
        ],
        cores: [
          '抹茶奶酪拿铁茶香混着奶香，入口丝滑，不会太甜腻',
          '生椰拿铁椰香很浓，咖啡味平衡得刚好，喝着清爽',
          '小奶酪拿铁奶味醇厚，咸香的口感很有层次',
          '用的新西兰进口奶酪，口感轻盈，不会觉得厚重',
          '抹茶味很正，和奶酪融合得不错，没有苦涩感',
          '冰的生椰拿铁更好喝，椰香和咖啡融合得很到位'
        ],
        experiences: [
          '活动价很划算，每天一杯也没什么压力',
          '小程序提前点单，到店拿了就走，不用等',
          '出杯速度挺快的，高峰期也没等太久',
          '性价比很高，比同价位其他家好喝不少',
          '包装挺严实，冰饮到手冰还没化',
          '店员态度不错，做餐仔细，标记得很清楚'
        ],
        closers: [
          '会一直回购，打工人刚需没错了',
          '推荐试试奶酪系列，真心值得点',
          '整体挺满意的，日常咖啡就选这家',
          '五星好评，以后还会继续点',
          '口感在线，性价比直接拉满',
          '味道很稳定，闭眼点基本不踩雷'
        ]
      },
      xhs: {
        openers: [
          '家人们谁懂啊！瑞幸这杯奶酪拿铁真的绝了🥹',
          '救命🆘瑞幸新品奶酪系列我能喝一整个夏天',
          '抹茶脑袋速冲！这杯真的一口就沦陷✨',
          '打工人早八救星！每天一杯快乐起飞☕️',
          '我宣布这是近期喝过最惊喜的拿铁！',
          '信我！瑞幸这杯奶酪系列真的可以冲👍'
        ],
        cores: [
          '抹茶奶酪拿铁茶香混着奶香，入口丝滑到跺脚！少糖刚好不腻🍵',
          '生椰拿铁椰香超浓郁，咖啡味不苦，冰的巨清爽巨好喝🥥',
          '小奶酪拿铁咸香奶香交织，口感层次真的很丰富',
          '新西兰进口奶酪酱真的不一样，轻盈不腻口，越喝越上头🧀',
          '抹茶味超正，和奶酪融合得恰到好处，完全不涩口',
          '每一口都奶fufu的，奶酪香和咖啡香在嘴里散开'
        ],
        experiences: [
          '9.9的快乐谁懂啊！每天一杯也完全不心疼💸',
          '小程序提前点单，到店直接取，早八人狂喜',
          '出杯速度超快，高峰期也不用排长队等',
          '性价比直接拉满，比很多咖啡店都好喝',
          '包装很稳，冰饮到手还是冰冰凉凉的',
          '店员超好，备注的要求都满足了💖'
        ],
        closers: [
          '已经连续喝三天了，真的会上头！',
          '姐妹们冲！不好喝你来打我（bushi',
          '真心推荐，咖啡星人快去试试',
          '锁死这杯！以后就是我的常驻款了',
          '五星安利！真的越喝越喜欢',
          '瑞幸你是我的神！请保持这个水准🙏'
        ]
      }
    },

    hotpot: {
      normal: {
        openers: [
          '周末和家人来这家火锅店聚餐，体验整体很满意',
          '朋友推荐来的火锅店，吃过之后确实没让人失望',
          '冬天就该吃火锅，这家锅底香味很正',
          '公司团建选的这家，十个人吃得都很尽兴',
          '路过闻着香味进来的，没想到成了我的固定据点',
          '这家火锅开了挺久，味道一直很稳定'
        ],
        cores: [
          '牛油锅底红亮醇厚，辣度刚好，越煮越香不发苦',
          '毛肚新鲜脆嫩，七上八下涮出来口感刚刚好',
          '虾滑是手打的，能吃到整块的虾肉，Q弹鲜甜',
          '肥牛卷肉质不错，油脂均匀，涮完不柴不腻',
          '麻辣牛肉腌制入味，裹着干碟特别香',
          '鸭血嫩滑入味，久煮不老，配油碟一绝'
        ],
        experiences: [
          '服务员很勤快，加汤换碟都很及时，不用喊',
          '排队有叫号提醒，等位时还送了小吃和茶水',
          '包间隔音不错，聚餐聊天很自在',
          '菜品摆盘干净利落，分量实在，性价比在线',
          '墙上贴着涮菜时间表，细节做得很用心',
          '结账时主动核对了优惠，明码标价很放心'
        ],
        closers: [
          '附近吃火锅首选这家，已经来回购好几次了',
          '推荐牛油锅底配虾滑，这个组合真的不踩雷',
          '聚餐请客都合适，环境味道都在线',
          '五星好评，下次带爸妈再来',
          '味道稳定服务好，值得反复来',
          '吃完浑身舒坦，冬天就认这家火锅'
        ]
      },
      xhs: {
        openers: [
          '家人们！这家火锅我真的要吹爆🔥',
          '谁懂啊！周五晚上的火锅局太幸福了😭',
          '毛肚控集合！这家店我要锁死❗',
          '被闺蜜拉来的火锅店，现在我俩每周都来',
          '冬天的快乐是火锅给的，这家真的绝🥘',
          '排队一小时也值！这家火锅杀疯了'
        ],
        cores: [
          '牛油锅底一开盖就香迷糊了，辣而不燥，越煮越上头🌶️',
          '毛肚脆到耳朵都能听见声，七上八下涮出来太完美了',
          '手打虾滑yyds！大颗虾肉Q弹到弹牙🦐',
          '麻辣牛肉裹干碟，一口下去直接封神',
          '鸭血嫩得像布丁，吸满汤汁绝了',
          '每盘肉都新鲜到发光，肥牛卷纹路超漂亮🥩'
        ],
        experiences: [
          '服务员眼里有活，水杯没空过，加汤不用喊',
          '等位送小零食，还有免费的酸梅汤续杯🍋',
          '拍照也好看！灯光打在锅里氛围感拉满📸',
          '人均不到一百吃到扶墙出，性价比哭死',
          '蘸料台十几种随便调，干碟油碟都是我的爱',
          '包间聚会有排面，朋友生日还送了长寿面🎂'
        ],
        closers: [
          '这家火锅我先冲为敬！不好吃你来找我',
          '已经安利给全公司了，都说不踩雷',
          '冬天必冲！记得提前取号哦',
          '五星！锅底和虾滑按头安利',
          '每周一次的火锅局就定这家了',
          '姐妹们冲！吃完回来谢我🔥'
        ]
      }
    },

    chaocai: {
      normal: {
        openers: [
          '下班不想做饭，来这家炒菜馆解决晚饭好几次了',
          '朋友推荐的家常炒菜馆，吃过一次就记住了',
          '这家炒菜馆开了十多年，是附近老街坊的食堂',
          '公司楼下的炒菜馆，中午饭点天天满座',
          '跟着导航找到这家小馆子，没想到这么惊艳',
          '家庭聚餐选的这家，点了一桌都很满意'
        ],
        cores: [
          '小炒黄牛肉火候到位，牛肉嫩滑，小米辣的香气全炒出来了',
          '农家小炒肉肥瘦相间，煸出油之后香而不腻，下饭一绝',
          '番茄炒蛋是小时候的味道，蛋炒得蓬松，汁水拌饭特别香',
          '干煸四季豆煸得透，表皮起皱，咸香带一点焦香',
          '酸菜鱼鱼片嫩得筷子一夹就颤，汤底酸辣开胃',
          '红烧肉炖得软糯，肥而不腻，酱汁浓稠挂着每一块'
        ],
        experiences: [
          '现点现炒，锅气十足，上桌还滋滋作响',
          '分量实在，三个人点四个菜完全够吃',
          '老板娘热情周到，看我们带小孩还送了小米粥',
          '明厨亮灶，后厨操作看得见，吃着放心',
          '米饭管够，是那种颗粒分明的东北大米',
          '上菜速度快，点完菜十分钟就齐了'
        ],
        closers: [
          '附近吃家常菜的首选，闭眼点不踩雷',
          '推荐小炒黄牛肉配米饭，吃完还想打包',
          '人均三四十吃到扶墙，性价比没话说',
          '五星好评，已经列入每周聚餐名单',
          '这种有锅气的炒菜馆值得被更多人知道',
          '吃完浑身舒坦，下次带爸妈来尝尝'
        ]
      },
      xhs: {
        openers: [
          '家人们！这家小馆子的锅气真的绝了🔥',
          '谁懂啊！这家炒菜馆我要吹爆😭',
          '干饭人集合！这家小炒肉也太下饭了🍚',
          '被本地人拽来的炒菜馆，一口沦陷✨',
          '救命！这家店的锅气香到我走不动道',
          '藏在巷子里的宝藏炒菜馆，冲就完了‼️'
        ],
        cores: [
          '小炒黄牛肉嫩到犯规！小米辣香得直冲天灵盖🌶️',
          '农家小炒肉煸得焦香，油润润的一口封神',
          '番茄炒蛋是小时候的味道！汤汁拌饭我能炫三碗',
          '酸菜鱼鱼片嫩到duangduang的，汤底酸辣开胃🐟',
          '红烧肉颤巍巍的入口即化，肥而不腻太狠了',
          '干煸四季豆表皮皱皱的，焦香感绝了'
        ],
        experiences: [
          '现点现炒锅气拉满，上桌还在滋滋响🍳',
          '分量多到离谱，三个人四个菜撑到扶墙',
          '老板娘超热情，还送了小孩一份小米粥🥰',
          '明厨亮灶看得见，吃着放心多了',
          '米饭是东北大米，粒粒分明管够续',
          '上菜速度超快，十分钟一桌菜齐活'
        ],
        closers: [
          '这家炒菜馆我先冲为敬！不好吃来找我',
          '已经安利给全公司了，都说下饭神器',
          '干饭人必冲！记得多添一碗米饭',
          '五星！小炒黄牛肉按头安利',
          '这种宝藏小馆子值得被看见✨',
          '冲就完事了！吃完回来谢我🔥'
        ]
      }
    },

    bbq: {
      normal: {
        openers: [
          '晚上和朋友撸串找到这家店，氛围和味道都在线',
          '这家烧烤是本地朋友带来的，果然地道',
          '夜宵续命的烧烤店，吃完心满意足',
          '夏天配冰啤冬天配热茶，这家烧烤四季都合适',
          '公司楼下新开的烧烤店，试了一次就常来了',
          '老顾客了，隔段时间不吃就想'
        ],
        cores: [
          '羊肉串肥瘦相间，炭火烤得外焦里嫩，没有膻味',
          '烤鸡翅腌得入味，外皮焦脆，咬开还带汁',
          '锡纸烤脑花口感绵密，香辣够味',
          '烤茄子蒜蓉给得足，一口下去满是蒜香',
          '掌中宝脆骨口感一绝，越嚼越香',
          '烤韭菜和烤香菇火候正好，素菜也能出彩'
        ],
        experiences: [
          '上菜速度快，师傅现烤现上，串串都是热的',
          '露天座位吹着晚风撸串，氛围感很好',
          '老板热情实在，主动推荐不宰客',
          '辣度可以自选，不能吃辣的朋友也能吃得开心',
          '啤酒饮料种类全，配烧烤刚好',
          '收台很勤快，桌面始终干干净净'
        ],
        closers: [
          '夜宵就认这家，闭眼点不踩雷',
          '推荐羊肉串配冰啤，神仙组合',
          '朋友聚会首选，气氛味道都在线',
          '五星好评，还会常来',
          '价格实惠分量足，性价比很高',
          '吃完还想打包，明天再来的那种好'
        ]
      },
      xhs: {
        openers: [
          '家人们！这家烧烤我要吹爆🍢',
          '深夜放毒！这家烧烤香到我犯规😭',
          '撸串星人集合！这家店真的绝',
          '被我找到宝了！这家的烤翅封神🔥',
          '夜宵天花板！不好吃你来打我',
          '周五晚上的快乐是烧烤给的✨'
        ],
        cores: [
          '羊肉串油脂在炭火上滋滋作响，外焦里嫩绝了🍖',
          '烤鸡翅皮脆到咔嚓响，里面的肉还在爆汁',
          '蒜蓉烤茄子太犯规了！蒜香浓郁到舔盘🍆',
          '掌中宝脆到耳朵都听得见，越嚼越上头',
          '锡纸脑花绵密入味，一口沦陷',
          '烤韭菜火候绝了，焦香里带着甜'
        ],
        experiences: [
          '现烤现上，串串上桌还滋滋冒油，太治愈了',
          '户外座位配晚风，氛围感直接拉满🌙',
          '辣度随便选，微辣也香，本人亲测',
          '人均五六十吃到撑，性价比哭死',
          '老板超nice，还送了烤馒头片🥰',
          '冰啤配串，这就是夏天的意义啊🍺'
        ],
        closers: [
          '夜宵党冲！记得带上朋友一起',
          '已经三连吃了，真心安利',
          '这价格这味道，不火没天理',
          '五星！烤翅和羊肉串按头安利',
          '夏天的晚上就该留给这家烧烤',
          '冲就完事了！吃完回来谢我'
        ]
      }
    },

    massage: {
      normal: {
        openers: [
          '工作一周腰酸背痛，来这家足疗店放松一下',
          '朋友推荐的按摩店，手法确实专业',
          '加班后来做个足疗，整个人都缓过来了',
          '这家店开了好几年，手法一直很稳定',
          '第一次来体验，从进门开始就很舒服',
          '带爸妈来放松，两位师傅都很耐心'
        ],
        cores: [
          '技师手法专业，穴位找得准，力度刚刚好',
          '足疗前先泡脚，艾草包的味道很舒缓',
          '肩颈按摩到位，僵住的肌肉明显松开了',
          '按压力度可以随时调节，师傅会主动确认',
          '精油开背很舒服，香味清淡不刺鼻',
          '做完之后走路都轻快了，效果立竿见影'
        ],
        experiences: [
          '环境安静整洁，包间有独立空调和毛毯',
          '技师全程不推销，体验很放松',
          '茶水小吃免费续，躺着看剧很惬意',
          '预约制不排队，到店直接开始',
          '更衣室和洗手间都很干净，细节到位',
          '技师会讲解日常护养建议，很受用'
        ],
        closers: [
          '每周雷打不动来一次，解压神器',
          '推荐肩颈套餐，久坐党必备',
          '环境好手法专业，值得回访',
          '五星好评，已经办卡了',
          '带家人来也很合适，服务贴心',
          '做完一身轻松，睡眠都变好了'
        ]
      },
      xhs: {
        openers: [
          '打工人的续命神器！这家足疗店绝了😭',
          '谁懂啊！按摩完感觉灵魂都轻了✨',
          '肩颈救星！这家店我要按头安利',
          '被闺蜜拽来按摩，现在我俩每周必约💆',
          '加班人的天选放松地，真的太舒服了',
          '这家足疗店是我最后的倔强🦶'
        ],
        cores: [
          '技师手法绝了！穴位找得又准又稳，力度完美',
          '艾草泡脚一进去就relax了，暖到心坎里🌿',
          '肩颈按完当场复活！僵硬肌肉直接松绑',
          '精油开背香到犯规，差点睡着😴',
          '力度全程可调，怕疼星人友好度满分',
          '按完走路带风，腿轻了二斤的感觉'
        ],
        experiences: [
          '全程零推销！纯纯享受，太治愈了',
          '包间安静私密，毛毯一盖幸福感爆棚',
          '免费茶水小食续到饱，躺平看剧美滋滋🍵',
          '预约制不用等，社恐友好',
          '环境干净到发光，细节控狂喜',
          '师傅还教了日常拉伸动作，太贴心了🥰'
        ],
        closers: [
          '每周一次的快乐源泉，锁死这家',
          '久坐党冲！肩颈套餐yyds',
          '五星！技师手法太好了',
          '已经安利给全组同事了',
          '解压天花板，不好来找我',
          '办卡了！这就是打工人的充电站💆‍♀️'
        ]
      }
    },

    fusion: {
      normal: {
        openers: [
          '朋友生日选了这家融合餐厅，整体体验超出预期',
          '第一次尝试融合菜，这家给了很好的入门体验',
          '约会选的这家，环境和菜式都很有新意',
          '这家融合餐厅开了有一阵子，终于抽空来打卡',
          '同事推荐说这里菜式有创意，来验证了一下',
          '逛完商场顺路来的，没想到成了近期最惊喜的一餐'
        ],
        cores: [
          '黑松露牛肉粒外脆里嫩，松露香气很足，中西结合恰到好处',
          '芝士焗大虾奶香浓郁，虾肉弹嫩，趁热吃还能拉丝',
          '柠檬烤鲈鱼酸香解腻，鱼肉外焦里嫩，很有记忆点',
          '芒果鹅肝寿司层次丰富，鹅肝入口即化不腥不腻',
          '冬阴功汤底酸辣平衡，椰香回甘，喝一口很醒神',
          '低温慢煮牛小排火候精准，一咬就脱骨，酱汁收得浓'
        ],
        experiences: [
          '菜品摆盘精致，随手一拍都好看',
          '服务员会介绍每道菜的创意点，听得出很专业',
          '餐前面包配黄油，细节感直接拉满',
          '环境安静有格调，适合约会和纪念日',
          '分量适中，可以多点几样换着尝鲜',
          '甜品收尾很加分，焦糖布丁是现做的'
        ],
        closers: [
          '想吃点不一样的首选这家，值得回访',
          '推荐黑松露牛肉粒，记得趁热吃',
          '约会聚餐都合适，格调味道都在线',
          '五星好评，下次来试试新菜单',
          '创意菜做到这个稳定度很难得',
          '一顿饭吃出新鲜感，已经想好下次点什么了'
        ]
      },
      xhs: {
        openers: [
          '家人们！这家融合餐厅氛围感绝了✨',
          '谁懂啊！这顿融合菜直接惊艳到我😭',
          '约会天花板！这家餐厅氛围感直接拉满🕯️',
          '被闺蜜种草的融合菜，每一道都在线',
          '挖到宝了！这家创意菜我要吹爆',
          '想吃点不一样的姐妹，冲这家就对了‼️'
        ],
        cores: [
          '黑松露牛肉粒外脆里嫩，松露香一口上头🍄',
          '芝士焗大虾拉丝绝了！虾肉Q弹奶香浓🦐',
          '柠檬烤鲈鱼酸香解腻，外焦里嫩太犯规🍋',
          '芒果鹅肝寿司入口即化，层次感直接封神',
          '冬阴功汤底酸辣带椰香，一口醒神🥥',
          '低温慢煮牛小排一咬脱骨，酱香浓郁到舔盘'
        ],
        experiences: [
          '摆盘精致到犯规！随手拍都是大片📸',
          '服务员讲解每道菜的创意，细节满分',
          '餐前面包配黄油，仪式感直接拉满🥖',
          '环境安静有格调，约会纪念日首选',
          '分量刚刚好，可以多尝几道不浪费',
          '现做焦糖布丁收尾，甜品控狂喜🍮'
        ],
        closers: [
          '这家融合餐厅我先冲为敬！不好吃来找我',
          '已经安利给全朋友圈了，都说想打卡',
          '约会聚餐冲这家，氛围味道双在线',
          '五星！黑松露牛肉粒按头安利',
          '创意菜这么稳定真的难得，锁死这家',
          '姐妹们冲！吃完记得回来谢我✨'
        ]
      }
    },

    roastduck: {
      normal: {
        openers: [
          '周末带家人来吃烤鸭，整体体验很满意',
          '朋友推荐这家烤鸭店，果然名不虚传',
          '想吃正经果木烤鸭，选这家没选错',
          '老顾客了，隔段时间不来就馋',
          '第一次来，从片鸭开始仪式感就很足',
          '请外地朋友选的这家，特别有面子'
        ],
        cores: [
          '烤鸭皮酥脆油亮，枣红色的卖相一眼就有食欲',
          '鸭皮蘸白糖入口即化，完全没有腥腻味',
          '鸭肉切得厚薄均匀，肉质紧实多汁',
          '荷叶饼薄韧不破，卷起来不容易散',
          '甜面酱香气浓，配葱丝黄瓜条解腻刚好',
          '鸭架汤奶白浓鲜，胡椒一撒，喝完浑身暖'
        ],
        experiences: [
          '师傅推车现场片鸭，刀工利落，片片整齐码盘',
          '鸭饼是现蒸的，上桌还冒着热气',
          '服务员帮忙示范卷鸭，动作麻利又耐心',
          '配菜新鲜，蒜泥、白糖、黄瓜条一样不少',
          '包间隔音好，家庭聚餐聊天很自在',
          '上菜节奏把控得好，先汤后鸭不慌不忙'
        ],
        closers: [
          '附近吃烤鸭首选这家，值得反复来',
          '推荐整只鸭三吃，鸭架汤千万别错过',
          '家庭聚餐请客都合适，环境味道都在线',
          '五星好评，下次还带爸妈来',
          '果木香很正，是记忆里的老味道',
          '仪式感和味道双在线，值得推荐'
        ]
      },
      xhs: {
        openers: [
          '家人们！这家烤鸭店的鸭皮我愿称之为神🔥',
          '谁懂啊！现片烤鸭的仪式感太幸福了😭',
          '烤鸭脑袋集合！这家店我要锁死❗',
          '被本地朋友拉来的烤鸭店，直接封神',
          '不用排队去网红店！这家果木烤鸭绝了',
          '周末的快乐是烤鸭给的🦆✨'
        ],
        cores: [
          '鸭皮蘸白糖入口即化，一点不腻，太上头了',
          '枣红色的鸭皮酥到轻轻一碰就裂，香气爆炸',
          '鸭肉嫩到爆汁，肥瘦刚刚好',
          '荷叶饼薄得透光，卷什么都完美',
          '甜面酱浓郁回甘，葱丝黄瓜条解腻一绝',
          '鸭架汤奶白浓鲜，撒点胡椒直接鲜掉眉毛'
        ],
        experiences: [
          '师傅现场片鸭刀工利落，看呆了🤯',
          '鸭饼现蒸上桌还冒热气，细节满分',
          '服务员手把手教卷鸭，超有仪式感',
          '包间聚会有排面，长辈们都说好',
          '上菜节奏舒服，先喝汤再吃鸭不着急',
          '灯光氛围感拉满，随手拍都出片📸'
        ],
        closers: [
          '这家烤鸭我先冲为敬！不好吃来找我',
          '已经安利给全办公室了，周末就冲',
          '一鸭三吃太满足，鸭架汤别错过',
          '五星！鸭皮蘸糖按头安利',
          '这才是记忆里的老味道，锁死这家',
          '姐妹们冲！吃完回来谢我🦆'
        ]
      }
    }
  };

  /* ---------- 落地页效果对比（普通 AI vs 默默好赞） ----------
   * 「默默好赞」一侧的文案按 combo 下标取自上方分行业词库的真实句子，
   * 主页展示与演示门店的实际输出保持一致，顾客可进入演示反复验证。 */
  var COMPARE = {
    hotpot: {
      label: '火锅店', icon: '🍲',
      generic: '这家火锅店真的太好吃了！锅底很香，菜品都很新鲜，服务态度也特别好，环境干净又整洁，性价比超高！强烈推荐大家来打卡，下次还会再来的！',
      genericTags: ['通篇没提一道具体菜品', '放到全国哪家火锅店都成立', '高频套话堆砌，一眼模板'],
      oursTags: ['毛肚、七上八下，细节具体可感', '锅底、虾滑自带行业搜索词', '等位送小吃的体验真实可信'],
      combo: [1, 1, 1, 1]
    },
    bbq: {
      label: '烧烤店', icon: '🍢',
      generic: '这家烧烤店真的绝了！烤串味道很棒，肉质新鲜，老板人也特别热情，价格还很实惠！爱吃烧烤的朋友一定要来试试，绝对不会失望的！',
      genericTags: ['只说「好吃」，说不出哪里好吃', '没有一个具体烤品，空洞无物', '语气浮夸，反而像广告'],
      oursTags: ['肥瘦、火候，内行才懂的细节', '羊肉串配冰啤，画面感拉满', '现烤现上的体验链路完整'],
      combo: [0, 0, 0, 1]
    },
    chaocai: {
      label: '炒菜馆', icon: '🍳',
      generic: '这家店菜品味道不错，分量也很足，服务员态度热情，上菜速度很快，环境干净整洁，整体体验很好，推荐大家来尝尝！',
      genericTags: ['「味道不错」是最无效的形容', '看不出这家店的招牌是什么', '千人一面，毫无记忆点'],
      oursTags: ['直接点名招牌小炒黄牛肉', '锅气、火候，行家才有的表达', '下班吃饭的场景，真实自然'],
      combo: [0, 0, 0, 0]
    },
    roastduck: {
      label: '烤鸭店', icon: '🦆',
      generic: '烤鸭味道很正宗，皮脆肉嫩，蘸料也很香，服务很周到，环境有档次，是聚餐的好选择，值得推荐，下次还会再来！',
      genericTags: ['「皮脆肉嫩」四个字打发顾客', '没有任何记忆点，看完就忘', '和千篇一律的好评无差别'],
      oursTags: ['片鸭刀工、码盘，细节层层递进', '枣红色卖相，画面感强', '现场片鸭的仪式感，可信度高'],
      combo: [0, 0, 0, 0]
    }
  };

  /* ---------- 生成算法（与小程序版一致，避免连续雷同） ---------- */
  var lastText = {};

  function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

  function generateReview(industry, style) {
    var lib = (LIBS[industry] || LIBS.coffee)[style === 'xhs' ? 'xhs' : 'normal'];
    var key = industry + ':' + style;
    var text = '';
    for (var i = 0; i < 8; i++) {
      text = [pick(lib.openers), pick(lib.cores), pick(lib.experiences), pick(lib.closers)].join('。');
      if (text !== lastText[key]) break;
    }
    lastText[key] = text;
    return text;
  }

  /* ---------- 剪贴板（https 用 Clipboard API，file:// 降级 execCommand） ---------- */
  function copyText(text, okMsg, failMsg) {
    function fallback() {
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      var ok = false;
      try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
      document.body.removeChild(ta);
      showToast(ok ? okMsg : (failMsg || '复制失败，请手动复制'));
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () { showToast(okMsg); }, fallback);
    } else {
      fallback();
    }
  }

  /* ---------- Toast ---------- */
  var toastTimer = null;
  function showToast(msg) {
    var t = document.getElementById('toast');
    if (!t) return;
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.classList.remove('show'); }, 1800);
  }

  /* ---------- 二维码渲染（SVG，随访问地址自动更新） ---------- */
  function renderQR(container, text, cellSize) {
    if (!container) return;
    try {
      var qr = qrcode(0, 'M');
      qr.addData(text);
      qr.make();
      container.innerHTML = qr.createSvgTag({ cellSize: cellSize || 4, margin: 0, scalable: true });
    } catch (e) {
      container.innerHTML = '<div class="qr-error">二维码生成失败</div>';
    }
  }

  function pageUrl() {
    return location.href.split('#')[0];
  }

  /* ---------- 演示页初始化 ---------- */
  function bootDemo() {
    var store = STORES[document.body.getAttribute('data-store')];
    if (!store) { console.error('demo.js: 未找到门店配置'); return; }

    /* 填充门店信息 */
    document.title = store.brand + ' · 门店工具演示 | 默默好赞评价管理助手';
    var els = {
      brandIcon: document.getElementById('brandIcon'),
      brandName: document.getElementById('brandName'),
      brandDesc: document.getElementById('brandDesc'),
      wifiName: document.getElementById('wifiName'),
      wifiSsid: document.getElementById('wifiSsid'),
      wifiPassword: document.getElementById('wifiPassword')
    };
    if (els.brandIcon) els.brandIcon.textContent = store.icon;
    if (els.brandName) els.brandName.textContent = store.brand;
    if (els.brandDesc) els.brandDesc.textContent = store.desc;
    if (els.wifiName) els.wifiName.textContent = store.name;
    if (els.wifiSsid) els.wifiSsid.textContent = store.wifi.ssid;
    if (els.wifiPassword) els.wifiPassword.textContent = store.wifi.password;

    var industryLabel = INDUSTRY_LABELS[store.industry] || INDUSTRY_LABELS.generic;

    /* 访问码验证暂时下线（2026-09）：演示页打开即用，正式上线恢复一店一码时，
     * 还原登录页 HTML 与 tryLogin 校验逻辑（见 git 历史） */
    renderQR(document.getElementById('qrBox'), pageUrl(), 4);
    var urlEl = document.getElementById('qrUrl');
    if (urlEl) urlEl.textContent = pageUrl();

    /* 风格切换与生成 */
    var currentStyle = 'normal';
    var hasReview = false;
    var currentReview = '';
    var reviewText = document.getElementById('reviewText');
    var reviewMeta = document.getElementById('reviewMeta');
    var styleLabelMap = { normal: '真实评价风', xhs: '小红书探店风' };

    function doGenerate() {
      currentReview = generateReview(store.industry, currentStyle);
      hasReview = true;
      reviewText.textContent = currentReview;
      reviewText.classList.remove('placeholder');
      reviewMeta.hidden = false;
      reviewMeta.textContent = industryLabel + ' · ' + styleLabelMap[currentStyle] + ' · 共 ' + currentReview.length + ' 字';
    }

    document.querySelectorAll('#styleTabs .style-tab').forEach(function (tab) {
      tab.addEventListener('click', function () {
        var s = tab.getAttribute('data-style');
        if (s === currentStyle) return;
        currentStyle = s;
        document.querySelectorAll('#styleTabs .style-tab').forEach(function (t) {
          t.classList.toggle('active', t === tab);
        });
        if (hasReview) doGenerate();
      });
    });
    document.getElementById('btnGenerate').addEventListener('click', doGenerate);

    /* 复制好评 */
    document.getElementById('btnCopy').addEventListener('click', function () {
      if (!hasReview) doGenerate();
      copyText(currentReview, '复制成功');
    });

    /* WiFi 复制 */
    document.querySelectorAll('.wifi-copy').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var field = btn.getAttribute('data-field');
        copyText(store.wifi[field] || '', field === 'password' ? 'WiFi密码已复制' : 'WiFi名称已复制');
      });
    });

    /* 刷新二维码（地址变化时） */
    var qrRefresh = document.getElementById('qrRefresh');
    if (qrRefresh) {
      qrRefresh.addEventListener('click', function () {
        renderQR(document.getElementById('qrBox'), pageUrl(), 4);
        var urlEl = document.getElementById('qrUrl');
        if (urlEl) urlEl.textContent = pageUrl();
        showToast('二维码已刷新');
      });
    }

  }

  /* ---------- 落地页初始化：演示门店卡片二维码 ---------- */
  function bootLanding() {
    var grid = document.getElementById('demoGrid');
    if (!grid) return;
    Object.keys(STORES).forEach(function (key) {
      var s = STORES[key];
      var url = new URL('demo/' + s.id + '.html', location.href).href;
      var card = document.createElement('div');
      card.className = 'demo-store-card';
      card.innerHTML =
        '<div class="dsc-head">' +
          '<span class="dsc-icon">' + s.icon + '</span>' +
          '<div class="dsc-titles">' +
            '<div class="dsc-name">' + s.brand + '</div>' +
            '<div class="dsc-industry">' + (INDUSTRY_LABELS[s.industry] || '') + '</div>' +
          '</div>' +
        '</div>' +
        '<div class="dsc-qr"></div>' +
        '<div class="dsc-qr-tip">扫码直达该演示</div>' +
        '<a class="dsc-btn" href="demo/' + s.id + '.html">进入演示 →</a>';
      grid.appendChild(card);
      renderQR(card.querySelector('.dsc-qr'), url, 3);
    });
  }

  /* ---------- 落地页效果对比渲染 ---------- */
  function bootCompare() {
    var tabsEl = document.getElementById('compareTabs');
    var panelEl = document.getElementById('comparePanel');
    if (!tabsEl || !panelEl) return;
    var keys = Object.keys(COMPARE);
    var active = keys[0];

    function oursText(key) {
      var lib = LIBS[key].normal, c = COMPARE[key].combo;
      return [lib.openers[c[0]], lib.cores[c[1]], lib.experiences[c[2]], lib.closers[c[3]]].join('。');
    }

    function tagsHtml(arr, ic) {
      return arr.map(function (t) {
        return '<li><span class="ic">' + ic + '</span>' + t + '</li>';
      }).join('');
    }

    function renderPanel() {
      var c = COMPARE[active];
      var ours = oursText(active);
      panelEl.innerHTML =
        '<div class="vs-badge">VS</div>' +
        '<div class="compare-card bad">' +
          '<div class="cc-head">' +
            '<div class="cc-badge">🤖</div>' +
            '<div>' +
              '<div class="cc-title">普通 AI 生成</div>' +
              '<div class="cc-sub">无行业词库，只有泛泛而谈</div>' +
            '</div>' +
          '</div>' +
          '<div class="cc-text">' + c.generic + '</div>' +
          '<div class="cc-meta"><span>共 ' + c.generic.length + ' 字</span></div>' +
          '<ul class="cc-list">' + tagsHtml(c.genericTags, '✕') + '</ul>' +
        '</div>' +
        '<div class="compare-card good">' +
          '<div class="cc-head">' +
            '<div class="cc-badge">✓</div>' +
            '<div>' +
              '<div class="cc-title">默默好赞生成</div>' +
              '<div class="cc-sub">' + c.label + '专属词库 · 真实输出</div>' +
            '</div>' +
          '</div>' +
          '<div class="cc-text">' + ours + '</div>' +
          '<div class="cc-meta"><span>共 ' + ours.length + ' 字</span><span class="cc-copy" id="cmpCopy">复制这条</span></div>' +
          '<ul class="cc-list">' + tagsHtml(c.oursTags, '✓') + '</ul>' +
        '</div>';
      var copyBtn = document.getElementById('cmpCopy');
      if (copyBtn) {
        copyBtn.addEventListener('click', function () { copyText(ours, '示例已复制'); });
      }
    }

    function renderTabs() {
      tabsEl.innerHTML = keys.map(function (k) {
        return '<span class="compare-tab' + (k === active ? ' active' : '') + '" data-key="' + k + '">' +
          COMPARE[k].icon + ' ' + COMPARE[k].label + '</span>';
      }).join('');
      Array.prototype.forEach.call(tabsEl.children, function (tab) {
        tab.addEventListener('click', function () {
          var key = tab.getAttribute('data-key');
          if (key === active) return;
          active = key;
          renderTabs();
          renderPanel();
        });
      });
    }

    renderTabs();
    renderPanel();
  }

  /* ---------- 启动 ---------- */
  document.addEventListener('DOMContentLoaded', function () {
    if (document.body.hasAttribute('data-store')) bootDemo();
    else { bootLanding(); bootCompare(); }
  });

  /* 落地页合作咨询复制 */
  window.dmpCopyContact = function (el) {
    copyText(el.getAttribute('data-value'), el.getAttribute('data-label') + '已复制');
  };

  /* 暴露给落地页与调试 */
  window.DMP = { STORES: STORES, INDUSTRY_LABELS: INDUSTRY_LABELS, LIBS: LIBS, COMPARE: COMPARE, generateReview: generateReview };
})();
