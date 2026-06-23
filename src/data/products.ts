export interface ProductSpec {
  colors: string[]
  sizes: string[]
}

export interface ProductReview {
  id: number
  username: string
  avatar: string
  rating: number
  content: string
  time: string
}

export interface Product {
  id: number
  name: string
  price: number
  originalPrice: number
  image: string
  images: string[]
  description: string
  category: string
  sales: number
  specs: ProductSpec
  reviews: ProductReview[]
  tags: string[]
}

export interface Banner {
  id: number
  image: string
  title: string
  link: string
}

export const banners: Banner[] = [
  {
    id: 1,
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=shopping%20sale%20banner%20orange%20modern%20design%20discount&image_size=landscape_16_9',
    title: '新品首发 限时特惠',
    link: '/product/3'
  },
  {
    id: 2,
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=summer%20fashion%20collection%20banner%20vibrant&image_size=landscape_16_9',
    title: '夏日穿搭 低至3折',
    link: '/product/1'
  },
  {
    id: 3,
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=digital%20electronics%20sale%20banner%20tech%20blue&image_size=landscape_16_9',
    title: '数码好物 爆款直降',
    link: '/product/4'
  }
]

export const products: Product[] = [  {
    id: 1,
    name: '经典白色T恤',
    price: 59.9,
    originalPrice: 129.9,
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=white%20tshirt%20on%20clean%20background%20product%20photo&image_size=square',
    images: [
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=white%20tshirt%20on%20clean%20background%20product%20photo&image_size=square',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=white%20tshirt%20folded%20product%20photo&image_size=square',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=white%20tshirt%20detail%20fabric%20product&image_size=square'
    ],
    description: '100%纯棉面料，舒适透气，经典圆领设计，百搭日常穿搭必备单品。采用精梳棉工艺，不起球不变形，经久耐穿。',
    category: '服装',
    sales: 2341,
    specs: { colors: ['白色', '黑色', '灰色'], sizes: ['S', 'M', 'L', 'XL'] },
    tags: ['新品', '热卖'],
    reviews: [
      { id: 1, username: '小明', avatar: '', rating: 5, content: '面料很舒服，穿着很透气，已经回购第二件了！', time: '2026-06-15' },
      { id: 2, username: '阿花', avatar: '', rating: 4, content: '质量不错，就是稍微有点大，建议买小一码。', time: '2026-06-10' },
      { id: 3, username: '大壮', avatar: '', rating: 5, content: '纯棉的，很柔软，性价比超高！', time: '2026-06-08' }
    ]
  },
  {
    id: 2,
    name: '复古牛仔外套',
    price: 199.0,
    originalPrice: 399.0,
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=denim%20jacket%20product%20photo%20clean%20background&image_size=square',
    images: [
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=denim%20jacket%20product%20photo%20clean%20background&image_size=square',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=denim%20jacket%20detail%20buttons%20product&image_size=square'
    ],
    description: '经典复古水洗牛仔面料，做旧工艺处理，宽松版型，春秋必备外套。铜扣设计，复古有型。',
    category: '服装',
    sales: 892,
    specs: { colors: ['浅蓝', '深蓝', '黑色'], sizes: ['M', 'L', 'XL'] },
    tags: ['限时折扣'],
    reviews: [
      { id: 1, username: '时尚达人', avatar: '', rating: 5, content: '版型超赞，做旧效果很自然，搭配什么都好看！', time: '2026-06-12' },
      { id: 2, username: '牛仔控', avatar: '', rating: 4, content: '面料偏硬，洗几次就好了，颜色很正。', time: '2026-06-05' }
    ]
  },  {
    id: 3,
    name: '无线蓝牙耳机',
    price: 149.0,
    originalPrice: 299.0,
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=wireless%20bluetooth%20earbuds%20white%20product%20photo&image_size=square',
    images: [
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=wireless%20bluetooth%20earbuds%20white%20product%20photo&image_size=square',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=earbuds%20charging%20case%20product%20photo&image_size=square',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=earbuds%20in%20ear%20lifestyle%20photo&image_size=square'
    ],
    description: '真无线蓝牙5.3，主动降噪，续航30小时，IPX5防水，触控操作。Hi-Fi音质，低延迟游戏模式。',
    category: '数码',
    sales: 5621,
    specs: { colors: ['白色', '黑色'], sizes: ['标准版'] },
    tags: ['爆款', '新品'],
    reviews: [
      { id: 1, username: '音乐迷', avatar: '', rating: 5, content: '降噪效果惊艳，音质清晰，续航也很给力！', time: '2026-06-18' },
      { id: 2, username: '通勤族', avatar: '', rating: 5, content: '地铁上用降噪太爽了，完全听不到外界声音。', time: '2026-06-14' },
      { id: 3, username: '跑步者', avatar: '', rating: 4, content: '戴着跑步很稳，防水也OK，就是有点大。', time: '2026-06-09' }
    ]
  },
  {
    id: 4,
    name: '智能运动手表',
    price: 299.0,
    originalPrice: 599.0,
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=smart%20watch%20fitness%20tracker%20product%20photo&image_size=square',
    images: [
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=smart%20watch%20fitness%20tracker%20product%20photo&image_size=square',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=smart%20watch%20screen%20display%20product&image_size=square'
    ],
    description: '1.4英寸AMOLED屏幕，心率血氧监测，100+运动模式，7天超长续航。支持消息推送和NFC支付。',
    category: '数码',
    sales: 3210,
    specs: { colors: ['黑色', '银色', '玫瑰金'], sizes: ['标准版'] },
    tags: ['热卖'],
    reviews: [
      { id: 1, username: '运动达人', avatar: '', rating: 5, content: '运动模式超多，数据很准确，颜值也高！', time: '2026-06-16' },
      { id: 2, username: '上班族', avatar: '', rating: 4, content: '消息推送很方便，续航7天没问题。', time: '2026-06-11' }
    ]
  },  {
    id: 5,
    name: '真皮商务手提包',
    price: 359.0,
    originalPrice: 699.0,
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=leather%20business%20handbag%20product%20photo&image_size=square',
    images: [
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=leather%20business%20handbag%20product%20photo&image_size=square',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=leather%20bag%20interior%20detail%20product&image_size=square'
    ],
    description: '头层牛皮制作，大容量设计，多隔层收纳，商务出行首选。手工缝线，五金件防氧化处理。',
    category: '箱包',
    sales: 756,
    specs: { colors: ['棕色', '黑色'], sizes: ['大号', '中号'] },
    tags: ['品质之选'],
    reviews: [
      { id: 1, username: '商务精英', avatar: '', rating: 5, content: '皮质手感一流，容量很大，出差必备！', time: '2026-06-13' }
    ]
  },
  {
    id: 6,
    name: '休闲双肩背包',
    price: 129.0,
    originalPrice: 259.0,
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=casual%20backpack%20product%20photo%20clean%20background&image_size=square',
    images: [
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=casual%20backpack%20product%20photo%20clean%20background&image_size=square',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=backpack%20usb%20port%20detail%20product&image_size=square'
    ],
    description: '防泼水面料，USB充电接口，减负透气背板，大容量多口袋设计。适合通勤和短途旅行。',
    category: '箱包',
    sales: 1890,
    specs: { colors: ['深灰', '藏蓝', '军绿'], sizes: ['标准版'] },
    tags: ['热卖'],
    reviews: [
      { id: 1, username: '学生党', avatar: '', rating: 5, content: '容量超大，USB接口超方便，背起来也不累！', time: '2026-06-17' },
      { id: 2, username: '旅行者', avatar: '', rating: 4, content: '防水效果不错，周末短途出行刚好。', time: '2026-06-06' }
    ]
  },  {
    id: 7,
    name: '保湿修护面霜',
    price: 89.0,
    originalPrice: 168.0,
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=face%20cream%20skincare%20product%20photo&image_size=square',
    images: [
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=face%20cream%20skincare%20product%20photo&image_size=square',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=face%20cream%20texture%20skincare%20product&image_size=square'
    ],
    description: '玻尿酸+神经酰胺双重修护，深层保湿锁水，敏感肌可用。无添加酒精香精，温和不刺激。',
    category: '美妆',
    sales: 4230,
    specs: { colors: ['默认'], sizes: ['50ml', '100ml'] },
    tags: ['爆款', '敏感肌适用'],
    reviews: [
      { id: 1, username: '护肤控', avatar: '', rating: 5, content: '敏感肌福音！用了一周皮肤稳定多了，保湿效果很好。', time: '2026-06-19' },
      { id: 2, username: '干皮星人', avatar: '', rating: 5, content: '冬天用也够滋润，不油腻，吸收很快。', time: '2026-06-15' },
      { id: 3, username: '成分党', avatar: '', rating: 4, content: '成分表很干净，性价比高，会回购。', time: '2026-06-07' }
    ]
  },
  {
    id: 8,
    name: '丝绒哑光口红',
    price: 69.0,
    originalPrice: 139.0,
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=matte%20lipstick%20cosmetics%20product%20photo&image_size=square',
    images: [
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=matte%20lipstick%20cosmetics%20product%20photo&image_size=square',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=lipstick%20swatches%20colors%20cosmetics&image_size=square'
    ],
    description: '丝绒质感，持久不脱色，滋润不拔干，多色可选。含角鲨烷成分，唇部滋润一整天。',
    category: '美妆',
    sales: 6780,
    specs: { colors: ['正红色', '豆沙色', '枫叶红', '姨妈红'], sizes: ['3.5g'] },
    tags: ['爆款', '新品'],
    reviews: [
      { id: 1, username: '口红控', avatar: '', rating: 5, content: '豆沙色绝了！素颜涂也好看，持久度很棒。', time: '2026-06-20' },
      { id: 2, username: '化妆新手', avatar: '', rating: 5, content: '正红色超显白！质地很顺滑，不卡纹。', time: '2026-06-16' }
    ]
  },  {
    id: 9,
    name: '北欧风陶瓷花瓶',
    price: 49.0,
    originalPrice: 99.0,
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=nordic%20ceramic%20vase%20home%20decor%20product&image_size=square',
    images: [
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=nordic%20ceramic%20vase%20home%20decor%20product&image_size=square',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=vase%20with%20flowers%20home%20decor&image_size=square'
    ],
    description: '手工陶瓷制作，简约北欧设计，适合干花鲜花，提升家居品味。哑光釉面，触感细腻。',
    category: '家居',
    sales: 1560,
    specs: { colors: ['白色', '灰色', '墨绿'], sizes: ['小号', '大号'] },
    tags: ['文艺范'],
    reviews: [
      { id: 1, username: '家居控', avatar: '', rating: 5, content: '质感超好，放客厅特别有格调，朋友都问链接！', time: '2026-06-14' }
    ]
  },
  {
    id: 10,
    name: '记忆棉护颈枕',
    price: 79.0,
    originalPrice: 159.0,
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=memory%20foam%20pillow%20product%20photo&image_size=square',
    images: [
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=memory%20foam%20pillow%20product%20photo&image_size=square',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=pillow%20on%20bed%20bedroom%20lifestyle&image_size=square'
    ],
    description: '慢回弹记忆棉，人体工学曲线，透气亲肤面料，改善颈椎不适。可拆洗枕套，清洁方便。',
    category: '家居',
    sales: 2890,
    specs: { colors: ['白色'], sizes: ['标准版', '加高版'] },
    tags: ['热卖'],
    reviews: [
      { id: 1, username: '颈椎不好', avatar: '', rating: 5, content: '用了半个月颈椎舒服多了，睡眠质量也提升了！', time: '2026-06-18' },
      { id: 2, username: '居家达人', avatar: '', rating: 4, content: '枕头很舒服，就是刚打开有点味道，散散就好了。', time: '2026-06-10' }
    ]
  },  {
    id: 11,
    name: '运动跑步鞋',
    price: 259.0,
    originalPrice: 499.0,
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=running%20shoes%20sneakers%20product%20photo&image_size=square',
    images: [
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=running%20shoes%20sneakers%20product%20photo&image_size=square',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=running%20shoes%20sole%20detail%20product&image_size=square',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=running%20shoes%20on%20track%20lifestyle&image_size=square'
    ],
    description: '轻量飞织鞋面，缓震回弹中底，防滑耐磨大底，透气舒适。适合日常跑步和健身训练。',
    category: '运动',
    sales: 3450,
    specs: { colors: ['黑红', '灰蓝', '全白'], sizes: ['39', '40', '41', '42', '43'] },
    tags: ['爆款', '限时折扣'],
    reviews: [
      { id: 1, username: '跑者', avatar: '', rating: 5, content: '缓震效果很好，跑了50公里还很舒适，推荐！', time: '2026-06-19' },
      { id: 2, username: '健身党', avatar: '', rating: 4, content: '鞋子很轻，透气性不错，就是偏小半码。', time: '2026-06-12' }
    ]
  },
  {
    id: 12,
    name: '瑜伽健身垫',
    price: 69.0,
    originalPrice: 139.0,
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=yoga%20mat%20fitness%20product%20photo&image_size=square',
    images: [
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=yoga%20mat%20fitness%20product%20photo&image_size=square',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=yoga%20mat%20rolled%20product%20photo&image_size=square'
    ],
    description: 'TPE环保材质，双面防滑，6mm加厚缓冲，附赠收纳袋。回弹性好，保护关节。',
    category: '运动',
    sales: 2100,
    specs: { colors: ['紫色', '粉色', '蓝色'], sizes: ['标准版'] },
    tags: ['新品'],
    reviews: [
      { id: 1, username: '瑜伽爱好者', avatar: '', rating: 5, content: '防滑效果很好，厚度也够，做瑜伽很舒服！', time: '2026-06-17' }
    ]
  },
  {
    id: 13,
    name: '条纹POLO衫',
    price: 89.0,
    originalPrice: 179.0,
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=striped%20polo%20shirt%20product%20photo%20clean%20background&image_size=square',
    images: [
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=striped%20polo%20shirt%20product%20photo%20clean%20background&image_size=square',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=striped%20polo%20shirt%20collar%20detail%20product&image_size=square',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=polo%20shirt%20fabric%20texture%20close%20up&image_size=square'
    ],
    description: '经典条纹设计，珠地网眼面料，透气吸汗，商务休闲两不误。精致翻领，版型挺括有型。',
    category: '服装',
    sales: 1560,
    specs: { colors: ['藏蓝', '白色', '红色'], sizes: ['M', 'L', 'XL', 'XXL'] },
    tags: ['新品'],
    reviews: [
      { id: 1, username: '职场新人', avatar: '', rating: 5, content: '面料透气不闷，上班穿很得体，颜色也好看！', time: '2026-06-20' },
      { id: 2, username: '老王', avatar: '', rating: 4, content: '版型不错，就是藏蓝色比图片深一点，不过也挺好。', time: '2026-06-15' }
    ]
  },
  {
    id: 14,
    name: '修身牛仔裤',
    price: 159.0,
    originalPrice: 329.0,
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=slim%20fit%20jeans%20product%20photo%20clean%20background&image_size=square',
    images: [
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=slim%20fit%20jeans%20product%20photo%20clean%20background&image_size=square',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=slim%20jeans%20pocket%20detail%20product&image_size=square'
    ],
    description: '弹力修身版型，贴合不紧绷，经典五袋设计，四季百搭。含棉弹力面料，活动自如不束缚。',
    category: '服装',
    sales: 2890,
    specs: { colors: ['深蓝', '浅蓝', '黑色'], sizes: ['28', '30', '32', '34'] },
    tags: ['热卖', '限时折扣'],
    reviews: [
      { id: 1, username: '穿搭博主', avatar: '', rating: 5, content: '弹力很好，蹲下也不紧，版型超显瘦！', time: '2026-06-18' },
      { id: 2, username: '牛仔裤控', avatar: '', rating: 5, content: '面料柔软，洗了不掉色，已经第三条了。', time: '2026-06-12' },
      { id: 3, username: '小个子', avatar: '', rating: 4, content: '裤型好看，就是稍微长了点，需要改一下。', time: '2026-06-08' }
    ]
  },
  {
    id: 15,
    name: '便携蓝牙音箱',
    price: 119.0,
    originalPrice: 239.0,
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=portable%20bluetooth%20speaker%20product%20photo&image_size=square',
    images: [
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=portable%20bluetooth%20speaker%20product%20photo&image_size=square',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=bluetooth%20speaker%20outdoor%20lifestyle&image_size=square',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=bluetooth%20speaker%20buttons%20detail%20product&image_size=square'
    ],
    description: '360°环绕立体声，IPX7级防水，12小时超长续航，小巧便携。支持TWS双联，低音澎湃震撼。',
    category: '数码',
    sales: 3450,
    specs: { colors: ['黑色', '红色', '军绿'], sizes: ['标准版'] },
    tags: ['新品'],
    reviews: [
      { id: 1, username: '音乐发烧友', avatar: '', rating: 5, content: '小身材大音量！低音效果超出预期，防水也靠谱。', time: '2026-06-19' },
      { id: 2, username: '露营爱好者', avatar: '', rating: 5, content: '户外用太方便了，续航一整天没问题，音质很棒。', time: '2026-06-14' }
    ]
  },
  {
    id: 16,
    name: '机械键盘',
    price: 259.0,
    originalPrice: 499.0,
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=mechanical%20keyboard%20rgb%20product%20photo&image_size=square',
    images: [
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=mechanical%20keyboard%20rgb%20product%20photo&image_size=square',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=mechanical%20keyboard%20keycap%20detail%20product&image_size=square'
    ],
    description: '热插拔轴体，RGB幻彩背光，PBT双色键帽，全键无冲。兼容Mac/Win双系统，打字游戏两相宜。',
    category: '数码',
    sales: 4120,
    specs: { colors: ['黑色', '白色'], sizes: ['87键', '104键'] },
    tags: ['爆款'],
    reviews: [
      { id: 1, username: '程序员', avatar: '', rating: 5, content: '手感一流，热插拔换轴方便，RGB灯效超酷！', time: '2026-06-20' },
      { id: 2, username: '游戏玩家', avatar: '', rating: 5, content: '全键无冲，打游戏响应很快，键帽手感很好。', time: '2026-06-16' },
      { id: 3, username: '设计狮', avatar: '', rating: 4, content: '白色款颜值超高，就是容易沾灰，其他都好。', time: '2026-06-09' }
    ]
  },
  {
    id: 17,
    name: '拉杆行李箱',
    price: 299.0,
    originalPrice: 599.0,
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=rolling%20suitcase%20luggage%20product%20photo&image_size=square',
    images: [
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=rolling%20suitcase%20luggage%20product%20photo&image_size=square',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=suitcase%20interior%20detail%20product&image_size=square',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=suitcase%20wheels%20handle%20detail%20product&image_size=square'
    ],
    description: 'PC+ABS材质，万向静音轮，铝合金拉杆，TSA海关锁，大容量分区收纳。轻便坚固，出行无忧。',
    category: '箱包',
    sales: 1670,
    specs: { colors: ['黑色', '银色', '粉色'], sizes: ['20寸', '24寸', '28寸'] },
    tags: ['热卖'],
    reviews: [
      { id: 1, username: '出差达人', avatar: '', rating: 5, content: '轮子超顺滑，拉杆很稳，容量也大，出差首选！', time: '2026-06-18' },
      { id: 2, username: '旅行家', avatar: '', rating: 4, content: '粉色款颜值很高，就是20寸偏小，建议买24寸。', time: '2026-06-11' }
    ]
  },
  {
    id: 18,
    name: '斜挎胸包',
    price: 89.0,
    originalPrice: 179.0,
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=crossbody%20chest%20bag%20product%20photo&image_size=square',
    images: [
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=crossbody%20chest%20bag%20product%20photo&image_size=square',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chest%20bag%20zipper%20detail%20product&image_size=square'
    ],
    description: '防泼水尼龙面料，多口袋分类收纳，可调节肩带，轻便出行。耳机孔设计，通勤运动都适用。',
    category: '箱包',
    sales: 2340,
    specs: { colors: ['黑色', '灰色', '卡其'], sizes: ['标准版'] },
    tags: ['新品'],
    reviews: [
      { id: 1, username: '骑行侠', avatar: '', rating: 5, content: '骑车背很方便，防水面料下雨也不怕，容量够用。', time: '2026-06-17' },
      { id: 2, username: '简约派', avatar: '', rating: 4, content: '黑色款很百搭，就是拉链有点紧，用用就好了。', time: '2026-06-10' }
    ]
  },
  {
    id: 19,
    name: '热门眼影盘',
    price: 99.0,
    originalPrice: 199.0,
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=eyeshadow%20palette%20makeup%20product%20photo&image_size=square',
    images: [
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=eyeshadow%20palette%20makeup%20product%20photo&image_size=square',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=eyeshadow%20swatches%20colors%20makeup&image_size=square',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=eyeshadow%20palette%20mirror%20detail%20product&image_size=square'
    ],
    description: '12色百搭配色，粉质细腻不飞粉，珠光哑光搭配，日常通勤到派对全搞定。自带镜子和双头刷。',
    category: '美妆',
    sales: 5120,
    specs: { colors: ['大地色系', '玫瑰色系', '星空色系'], sizes: ['12色'] },
    tags: ['爆款', '新品'],
    reviews: [
      { id: 1, username: '美妆博主', avatar: '', rating: 5, content: '粉质超好不飞粉！大地色系日常用绝了，显色度很棒。', time: '2026-06-20' },
      { id: 2, username: '化妆小白', avatar: '', rating: 5, content: '新手友好！怎么画都不会出错，自带刷子很方便。', time: '2026-06-16' },
      { id: 3, username: '眼影收藏家', avatar: '', rating: 4, content: '星空色系绝美，就是珠光稍微有点碎，整体很满意。', time: '2026-06-08' }
    ]
  },
  {
    id: 20,
    name: '热门面膜礼盒',
    price: 79.0,
    originalPrice: 158.0,
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=face%20mask%20gift%20box%20skincare%20product&image_size=square',
    images: [
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=face%20mask%20gift%20box%20skincare%20product&image_size=square',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=face%20mask%20sheet%20detail%20skincare&image_size=square'
    ],
    description: '玻尿酸+烟酰胺双重精华，深层补水修护，蚕丝膜布服帖透气。精美礼盒包装，送礼自用皆宜。',
    category: '美妆',
    sales: 8900,
    specs: { colors: ['默认'], sizes: ['10片装', '20片装'] },
    tags: ['热卖'],
    reviews: [
      { id: 1, username: '面膜达人', avatar: '', rating: 5, content: '精华超多，膜布很服帖，敷完皮肤水润润的！', time: '2026-06-19' },
      { id: 2, username: '送礼首选', avatar: '', rating: 5, content: '包装很精美，送闺蜜她超喜欢，性价比很高。', time: '2026-06-13' }
    ]
  },
  {
    id: 21,
    name: '香薰蜡烛套装',
    price: 59.0,
    originalPrice: 119.0,
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=scented%20candle%20set%20home%20decor%20product&image_size=square',
    images: [
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=scented%20candle%20set%20home%20decor%20product&image_size=square',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=scented%20candle%20lit%20warm%20atmosphere&image_size=square'
    ],
    description: '天然大豆蜡，植物精油调香，无烟无毒，3种香型组合。营造温馨氛围，放松身心好帮手。',
    category: '家居',
    sales: 1230,
    specs: { colors: ['白色', '粉色', '绿色'], sizes: ['3只装'] },
    tags: ['文艺范', '新品'],
    reviews: [
      { id: 1, username: '生活家', avatar: '', rating: 5, content: '香味很治愈，晚上点着看书超有氛围，无烟很安心。', time: '2026-06-18' },
      { id: 2, username: '小资女', avatar: '', rating: 4, content: '颜值很高，香味淡雅不刺鼻，就是燃烧时间偏短。', time: '2026-06-11' }
    ]
  },
  {
    id: 22,
    name: '全棉四件套',
    price: 199.0,
    originalPrice: 399.0,
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cotton%20bedding%20set%20product%20photo&image_size=square',
    images: [
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cotton%20bedding%20set%20product%20photo&image_size=square',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cotton%20bedding%20fabric%20detail%20product&image_size=square',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=bedding%20on%20bed%20bedroom%20lifestyle&image_size=square'
    ],
    description: '100%新疆长绒棉，贡缎工艺，亲肤柔软，四季通用。活性印染，不褪色不起球，隐藏式拉链设计。',
    category: '家居',
    sales: 3450,
    specs: { colors: ['白色', '灰色', '米色'], sizes: ['1.5m床', '1.8m床'] },
    tags: ['品质之选'],
    reviews: [
      { id: 1, username: '睡眠控', avatar: '', rating: 5, content: '纯棉的就是舒服，摸起来滑滑的，睡觉超安心！', time: '2026-06-20' },
      { id: 2, username: '家庭主妇', avatar: '', rating: 5, content: '洗了不掉色不起球，质量真的很好，性价比高。', time: '2026-06-15' }
    ]
  },
  {
    id: 23,
    name: '运动短裤',
    price: 79.0,
    originalPrice: 159.0,
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=sports%20shorts%20athletic%20product%20photo&image_size=square',
    images: [
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=sports%20shorts%20athletic%20product%20photo&image_size=square',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=sports%20shorts%20fabric%20detail%20product&image_size=square'
    ],
    description: '速干透气面料，内衬安全裤设计，弹力腰带，运动无束缚。适合跑步、健身、篮球等运动场景。',
    category: '运动',
    sales: 2780,
    specs: { colors: ['黑色', '灰色', '蓝色'], sizes: ['M', 'L', 'XL'] },
    tags: ['热卖'],
    reviews: [
      { id: 1, username: '健身达人', avatar: '', rating: 5, content: '速干效果很好，出汗不黏身，内衬设计很贴心！', time: '2026-06-19' },
      { id: 2, username: '篮球少年', avatar: '', rating: 4, content: '穿着打球很舒服，弹力够大，就是口袋有点浅。', time: '2026-06-12' }
    ]
  },
  {
    id: 24,
    name: '哑铃套装',
    price: 149.0,
    originalPrice: 299.0,
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=dumbbell%20set%20fitness%20product%20photo&image_size=square',
    images: [
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=dumbbell%20set%20fitness%20product%20photo&image_size=square',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=dumbbell%20grip%20detail%20product&image_size=square'
    ],
    description: '环保包胶材质，防滑握把，不伤地板，多规格可选。家庭健身必备，增肌塑形好帮手。',
    category: '运动',
    sales: 1560,
    specs: { colors: ['黑色'], sizes: ['10kg', '20kg', '30kg'] },
    tags: ['品质之选'],
    reviews: [
      { id: 1, username: '居家健身', avatar: '', rating: 5, content: '包胶材质不伤地板，握把防滑，在家练很方便！', time: '2026-06-17' },
      { id: 2, username: '力量训练', avatar: '', rating: 4, content: '质量不错，就是20kg的稍微有点味道，散散就好了。', time: '2026-06-10' }
    ]
  },
  {
    id: 25,
    name: '坚果零食大礼包',
    price: 49.0,
    originalPrice: 99.0,
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=nuts%20snack%20gift%20box%20product%20photo&image_size=square',
    images: [
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=nuts%20snack%20gift%20box%20product%20photo&image_size=square',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=mixed%20nuts%20variety%20snack%20product&image_size=square',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=nuts%20close%20up%20food%20photography&image_size=square'
    ],
    description: '6种坚果组合，每日坚果配比，低温烘焙锁鲜，独立小包装。营养丰富，办公室零食首选。',
    category: '食品',
    sales: 12000,
    specs: { colors: ['默认'], sizes: ['500g', '1000g'] },
    tags: ['爆款'],
    reviews: [
      { id: 1, username: '零食控', avatar: '', rating: 5, content: '坚果很新鲜，每包分量刚好，下午茶必备！', time: '2026-06-20' },
      { id: 2, username: '宝妈', avatar: '', rating: 5, content: '孩子很爱吃，独立包装方便携带，营养又健康。', time: '2026-06-16' },
      { id: 3, username: '办公室达人', avatar: '', rating: 4, content: '种类丰富，口感酥脆，就是1000g的有点多吃不完。', time: '2026-06-09' }
    ]
  },
  {
    id: 26,
    name: '精品咖啡豆',
    price: 69.0,
    originalPrice: 139.0,
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=coffee%20beans%20premium%20product%20photo&image_size=square',
    images: [
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=coffee%20beans%20premium%20product%20photo&image_size=square',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=coffee%20beans%20roasted%20close%20up&image_size=square'
    ],
    description: '精选阿拉比卡豆，新鲜烘焙，浓郁醇香，适合手冲和意式。产地直采，品质可溯源。',
    category: '食品',
    sales: 5600,
    specs: { colors: ['中烘', '深烘'], sizes: ['250g', '500g'] },
    tags: ['品质之选', '新品'],
    reviews: [
      { id: 1, username: '咖啡控', avatar: '', rating: 5, content: '中烘果香明显，手冲超好喝，新鲜度满分！', time: '2026-06-19' },
      { id: 2, username: '早C人', avatar: '', rating: 5, content: '深烘做拿铁很香醇，每天早上一杯太幸福了。', time: '2026-06-14' }
    ]
  },
  {
    id: 27,
    name: '连帽卫衣',
    price: 129.0,
    originalPrice: 259.0,
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=hoodie%20sweatshirt%20product%20photo%20clean%20background&image_size=square',
    images: [
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=hoodie%20sweatshirt%20product%20photo%20clean%20background&image_size=square',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=hoodie%20drawstring%20detail%20product&image_size=square'
    ],
    description: '加厚磨毛面料，宽松版型，连帽抽绳设计，内里加绒保暖。潮流印花，街头百搭。',
    category: '服装',
    sales: 3210,
    specs: { colors: ['黑色', '灰色', '米白'], sizes: ['M', 'L', 'XL', 'XXL'] },
    tags: ['热卖', '新品'],
    reviews: [
      { id: 1, username: '街头潮人', avatar: '', rating: 5, content: '加绒的很暖和，印花也好看，冬天穿刚好！', time: '2026-06-20' },
      { id: 2, username: '学生党', avatar: '', rating: 4, content: '宽松版型很舒服，就是稍微有点长，其他都好。', time: '2026-06-15' }
    ]
  },
  {
    id: 28,
    name: '平板电脑支架',
    price: 49.0,
    originalPrice: 99.0,
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=tablet%20stand%20holder%20product%20photo&image_size=square',
    images: [
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=tablet%20stand%20holder%20product%20photo&image_size=square',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=tablet%20stand%20foldable%20detail%20product&image_size=square'
    ],
    description: '铝合金材质，多角度调节，折叠便携，兼容各尺寸平板和手机。防滑硅胶垫，稳固不晃。',
    category: '数码',
    sales: 6780,
    specs: { colors: ['银色', '黑色'], sizes: ['标准版'] },
    tags: ['热卖'],
    reviews: [
      { id: 1, username: '追剧达人', avatar: '', rating: 5, content: '支架很稳，角度调节方便，追剧解放双手！', time: '2026-06-18' },
      { id: 2, username: '办公族', avatar: '', rating: 4, content: '折叠后很小巧，带去公司用很方便，做工不错。', time: '2026-06-12' }
    ]
  },
  {
    id: 29,
    name: '商务公文包',
    price: 239.0,
    originalPrice: 479.0,
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=leather%20briefcase%20business%20product%20photo&image_size=square',
    images: [
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=leather%20briefcase%20business%20product%20photo&image_size=square',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=briefcase%20interior%20compartment%20detail&image_size=square'
    ],
    description: '头层牛皮，简约商务设计，多隔层收纳，14寸电脑隔层。YKK拉链，耐用可靠。',
    category: '箱包',
    sales: 890,
    specs: { colors: ['棕色', '黑色'], sizes: ['标准版'] },
    tags: ['品质之选'],
    reviews: [
      { id: 1, username: '商务人士', avatar: '', rating: 5, content: '皮质很好，隔层多，14寸电脑放进去刚刚好，很有档次！', time: '2026-06-17' }
    ]
  },
  {
    id: 30,
    name: '卸妆水',
    price: 39.0,
    originalPrice: 79.0,
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=makeup%20remover%20cleansing%20water%20product%20photo&image_size=square',
    images: [
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=makeup%20remover%20cleansing%20water%20product%20photo&image_size=square',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cleansing%20water%20cotton%20pad%20skincare&image_size=square'
    ],
    description: '温和不刺激，一擦即净，无需二次清洁。植物萃取配方，敏感肌可用。',
    category: '美妆',
    sales: 11200,
    specs: { colors: ['默认'], sizes: ['200ml', '400ml'] },
    tags: ['爆款'],
    reviews: [
      { id: 1, username: '敏感肌', avatar: '', rating: 5, content: '用着完全不刺激，卸得很干净，不用二次清洁太省事了！', time: '2026-06-20' },
      { id: 2, username: '懒人护肤', avatar: '', rating: 5, content: '一擦就干净，省时省力，性价比超高！', time: '2026-06-16' },
      { id: 3, username: '成分党', avatar: '', rating: 4, content: '植物配方很温和，就是大瓶的有点重，其他都好。', time: '2026-06-09' }
    ]
  },
  {
    id: 31,
    name: '智能台灯',
    price: 89.0,
    originalPrice: 179.0,
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=smart%20desk%20lamp%20LED%20product%20photo&image_size=square',
    images: [
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=smart%20desk%20lamp%20LED%20product%20photo&image_size=square',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=desk%20lamp%20touch%20control%20detail%20product&image_size=square'
    ],
    description: '三色温调节，无频闪护眼，触控开关，USB充电。简约设计，适合书桌床头。',
    category: '家居',
    sales: 4560,
    specs: { colors: ['白色', '黑色'], sizes: ['标准版'] },
    tags: ['新品', '热卖'],
    reviews: [
      { id: 1, username: '学生党', avatar: '', rating: 5, content: '护眼效果很好，三色温切换方便，写作业不累眼！', time: '2026-06-19' },
      { id: 2, username: '读书人', avatar: '', rating: 4, content: '触控很灵敏，USB充电方便，就是亮度最低档还是有点亮。', time: '2026-06-13' }
    ]
  },
  {
    id: 32,
    name: '跳绳计数器',
    price: 29.0,
    originalPrice: 59.0,
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=jump%20rope%20counter%20fitness%20product%20photo&image_size=square',
    images: [
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=jump%20rope%20counter%20fitness%20product%20photo&image_size=square',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=jump%20rope%20handle%20LCD%20counter%20detail&image_size=square'
    ],
    description: '钢丝绳芯，LCD智能计数，防滑手柄，轴承顺滑不缠绕。适合健身减脂。',
    category: '运动',
    sales: 15600,
    specs: { colors: ['黑色', '蓝色', '红色'], sizes: ['标准版'] },
    tags: ['爆款'],
    reviews: [
      { id: 1, username: '减脂达人', avatar: '', rating: 5, content: '计数很准，钢丝绳不缠绕，每天跳1000个超爽！', time: '2026-06-20' },
      { id: 2, username: '健身小白', avatar: '', rating: 5, content: '手柄防滑很舒服，性价比超高，减脂神器！', time: '2026-06-14' }
    ]
  },
  {
    id: 33,
    name: '有机燕麦片',
    price: 39.0,
    originalPrice: 79.0,
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=organic%20oatmeal%20breakfast%20product%20photo&image_size=square',
    images: [
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=organic%20oatmeal%20breakfast%20product%20photo&image_size=square',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=oatmeal%20bowl%20with%20milk%20food%20photography&image_size=square'
    ],
    description: '澳洲进口有机燕麦，高纤维低糖，饱腹感强。即食方便，可搭配牛奶酸奶。',
    category: '食品',
    sales: 8900,
    specs: { colors: ['默认'], sizes: ['500g', '1000g'] },
    tags: ['健康', '热卖'],
    reviews: [
      { id: 1, username: '早餐控', avatar: '', rating: 5, content: '即食很方便，配牛奶超好吃，饱腹感很强，减脂期必备！', time: '2026-06-18' },
      { id: 2, username: '健身党', avatar: '', rating: 4, content: '高纤维低糖很健康，就是口感偏淡，加点蜂蜜更好。', time: '2026-06-11' }
    ]
  },
  {
    id: 34,
    name: '手工牛轧糖',
    price: 29.0,
    originalPrice: 58.0,
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=handmade%20nougat%20candy%20product%20photo&image_size=square',
    images: [
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=handmade%20nougat%20candy%20product%20photo&image_size=square',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=nougat%20candy%20close%20up%20food%20photography&image_size=square'
    ],
    description: '手工制作，奶香浓郁，花生杏仁双拼，不粘牙不甜腻。独立包装，方便携带。',
    category: '食品',
    sales: 7800,
    specs: { colors: ['默认'], sizes: ['200g', '400g'] },
    tags: ['新品', '美味'],
    reviews: [
      { id: 1, username: '甜食控', avatar: '', rating: 5, content: '奶香超浓，不粘牙不甜腻，花生杏仁都好吃，停不下来！', time: '2026-06-19' },
      { id: 2, username: '办公室达人', avatar: '', rating: 5, content: '独立包装很方便，下午茶来一颗超满足，同事都抢着吃。', time: '2026-06-13' }
    ]
  }
]

export const categories = ['全部', '服装', '数码', '箱包', '美妆', '家居', '运动', '食品']

export const categoryIcons: Record<string, string> = {
  '全部': '🏠',
  '服装': '👕',
  '数码': '📱',
  '箱包': '👜',
  '美妆': '💄',
  '家居': '🏡',
  '运动': '🏃',
  '食品': '🍜'
}