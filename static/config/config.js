/* eslint-disable */

var config = {
  token: 'a23HOp-QzqHDOU9A0HwdXTClKeGhK4o_6siHWsc7srkCtFIoMtoNtC6553cLp8RH',
  Maps: null,
  userId: '63e31e28a39f4da5a70a1fb26514cb0f', // 单点登录后 用户反馈的id 通过此值查询到用户拥有的模块权限
  // userId: 'admin',
  // userId: '77c926ba59df479db8417bc1620be5db', //
  service: {
    baseUrl: 'http://192.168.0.205:7060/',
    xzqhUrl: 'http://192.168.0.188:6080/arcgis/rest/services/lwzx/province/MapServer/0/query'
  },
  mapConfig: {
    controls: {
      geolocation: false,
      fullScreen: false,
      mousePosition: false,
      zoomSlider: false,
      zoomToExtent: false,
      rotate: false,
      zoom: true,
      scaleLine: true,
      loading: true
    },
    view: {
      zoom: 5,
      center: [11869928.952736914, 3816732.9459398296],
      resolution: 0.05406145033589252,
      projection: 'EPSG:102100'
    },
    baseLayers: [
      {
        layerName: 'vector',
        isDefault: true,
        visible: true,
        layerType: 'TileXYZ',
        layerUrl: 'http://42.236.7.25:6080/arcgis/rest/services/BaseMaps/World2ChinaMapBG/MapServer/tile/{z}/{y}/{x}'
      },
      {
        layerName: 'image',
        isDefault: false,
        layerType: 'Google',
        visible: false,
        create: true,
        layerUrl: 'http://www.google.cn/maps/vt?lyrs=s@802&gl=cn&x={x}&y={y}&z={z}'
      }
    ]
  },
  layerConfig: [
    {
      layerType: 'TileXYZ',
      visible: true,
      create: true,
      layerName: 'roadnet',
      tileGrid: {
        tileSize: 256,
        extent: [-2.0037507067161843E7, -3.0240971958386254E7, 2.0037507067161843E7, 3.0240971958386205E7],
        origin: [-2.0037508342787E7, 2.0037508342787E7],
        resolutions: [
          156543.03392800014,
          78271.51696399994,
          39135.75848200009,
          19567.87924099992,
          9783.93962049996,
          4891.96981024998,
          2445.98490512499,
          1222.992452562495,
          611.4962262813797,
          305.74811314055756,
          152.87405657041106,
          76.43702828507324,
          38.21851414253662,
          19.10925707126831,
          9.554628535634155,
          4.77731426794937,
          2.388657133974685
        ]
      },
      layerUrl: 'http://42.236.7.25:6080/arcgis/rest/services/BaseMaps/ChinaRoads/MapServer/tile/{z}/{y}/{x}'
    },
    {
      layerName: 'vectorLabel',
      layerType: 'TileXYZ',
      visible: true,
      create: true,
      tileGrid: {
        tileSize: 256,
        extent: [
          -2.201658329839976E7,
          -5775831.267496098,
          2.201658329839976E7,
          1.8011738621634174E7
        ],
        origin: [-2.0037508342787E7, 2.0037508342787E7],
        resolutions: [
          156543.03392800014,
          78271.51696399994,
          39135.75848200009,
          19567.87924099992,
          9783.93962049996,
          4891.96981024998,
          2445.98490512499,
          1222.992452562495,
          611.4962262813797,
          305.74811314055756,
          152.87405657041106,
          76.43702828507324,
          38.21851414253662,
          19.10925707126831,
          9.554628535634155,
          4.77731426794937,
          2.388657133974685
        ]
      },
      layerUrl: 'http://42.236.7.25:6080/arcgis/rest/services/BaseMaps/World2ChinaMapLabel/MapServer/tile/{z}/{y}/{x}'
    }
  ],
  layers: [
    {
      layerName: 'tollStationSquare',
      tableName: 'tollStationSquare',
      name: '收费站广场'
    }
  ],
  /**
   * 根据layerName或tableName获取配置信息
   * @param layerName
   * @param type
   * @returns {*}
   */
  getLayerConfigByLayerName: function (layerName, type) {
    var layerConfig = null
    type = type || 'layers'
    this[type].every(function (layer) {
      if (layerName === layer['layerName'] || layerName === layer['tableName']) {
        layerConfig = layer
        return false
      } else {
        return true
      }
    })
    return layerConfig
  },
  range: {
    // 龙门架数量
    grantry: [
      {
        value: 1,
        label: '1'
      },
      {
        value: 2,
        label: '2'
      },
      {
        value: 3,
        label: '3'
      }
    ],
    // 操作状态
    operation: [
      {
        label: '新增',
        value: 1
      },
      {
        label: '变更',
        value: 2
      },
      {
        label: '删除',
        value: 3
      }
    ],
    // 收费站类型
    tollStationType: [
      {
        label: '共建省界站',
        value: 1
      },
      {
        label: '分建省界站',
        value: 2
      },
      {
        label: '非省界站',
        value: 3
      }
    ],
    // 使用状态 userStatus 收费车道状态
    tollLaneStatus: [
      {
        label: '停用',
        value: 1
      },
      {
        label: '在用',
        value: 2
      }
    ],
    // 是否绿通
    isGreen: [
      {
        label: '是',
        value: 1
      },
      {
        label: '否',
        value: 2
      }
    ],
    // 广场类型
    plazaType: [
      {
        label: '主线收费广场',
        value: 1
      },
      {
        label: '匝道收费广场',
        value: 2
      }
    ],
    // 服务项目
    serviceProject: [
      {
        label: '开户',
        value: '01'
      },
      {
        label: '车辆信息录入',
        value: '02'
      },
      {
        label: '开卡',
        value: '03'
      },
      {
        label: '注册电子标签',
        value: '04'
      },
      {
        label: '安装激活电子标签',
        value: '05'
      },
      {
        label: '卡挂失',
        value: '06'
      },
      {
        label: '卡解挂',
        value: '07'
      },
      {
        label: '补卡',
        value: '08'
      },
      {
        label: '换卡',
        value: '09'
      },
      {
        label: '卡续期',
        value: '10'
      },
      {
        label: '卡挂起',
        value: '11'
      },
      {
        label: '卡解除挂起',
        value: '12'
      },
      {
        label: '卡注销',
        value: '13'
      },
      {
        label: '重新安装电子标签',
        value: '14'
      },
      {
        label: '标签挂失',
        value: '15'
      },
      {
        label: '标签解挂',
        value: '16'
      },
      {
        label: '标签补卡',
        value: '17'
      },
      {
        label: '标签更换',
        value: '18'
      },
      {
        label: '标签维修',
        value: '19'
      },
      {
        label: '标签续期',
        value: '20'
      },
      {
        label: '标签挂起',
        value: '21'
      },
      {
        label: '标签接触挂起',
        value: '22'
      },
      {
        label: '标签过户',
        value: '23'
      },
      {
        label: '标签注销',
        value: '24'
      },
      {
        label: '充值',
        value: '25'
      },
      {
        label: '圈存',
        value: '26'
      },
      {
        label: '退费',
        value: '27'
      },
      {
        label: '补卡额',
        value: '28'
      },
      {
        label: '补交',
        value: '29'
      },
      {
        label: '清账',
        value: '30'
      },
      {
        label: '清户',
        value: '31'
      },
      {
        label: '退款',
        value: '32'
      },
      {
        label: '查询',
        value: '33'
      },
      {
        label: '咨询',
        value: '34'
      },
      {
        label: '投诉处理',
        value: '35'
      },
      {
        label: '信息变更',
        value: '36'
      },
      {
        label: '销户',
        value: '37'
      }
    ],
    // 上下行方向
    sxxfxOption: [
      {
        label: '上行',
        value: 1
      },
      {
        label: '下行',
        value: 2
      }
    ],
    // 车道类型
    tollLaneType: [
      {
        label: 'ETC',
        value: 1,
        color: '#3bc568'
      },
      {
        label: 'MTC',
        value: 2,
        color: '#f19d18'
      },
      {
        label: '混合',
        value: 3,
        color: '#1c8ffa'
      }
    ],
    // 是否支持计重收费
    isWeightCharge: [
      {
        label: '是',
        value: 1
      },
      {
        label: '否',
        value: 2
      }
    ],
    // 行政区划
    division: [
      {
        label: '香港特别行政区',
        value: '810000'
      },
      {
        label: '内蒙古自治区',
        value: '150000'
      },
      {
        label: '山西省',
        value: '140000'
      },
      {
        label: '河北省',
        value: '130000'
      },
      {
        label: '天津市',
        value: '120000'
      },
      {
        label: '北京市',
        value: '110000'
      },
      {
        label: '吉林省',
        value: '220000'
      },
      {
        label: '辽宁省',
        value: '210000'
      },
      {
        label: '浙江省',
        value: '330000'
      },
      {
        label: '江苏省',
        value: '320000'
      },
      {
        label: '上海市',
        value: '310000'
      },
      {
        label: '福建省',
        value: '350000'
      },
      {
        label: '安徽省',
        value: '340000'
      },
      {
        label: '山东省',
        value: '370000'
      },
      {
        label: '江西省',
        value: '360000'
      },
      {
        label: '河南省',
        value: '410000'
      },
      {
        label: '海南省',
        value: '460000'
      },
      {
        label: '湖南省',
        value: '430000'
      },
      {
        label: '广东省',
        value: '440000'
      },
      {
        label: '湖北省',
        value: '420000'
      },
      {
        label: '广西壮族自治区',
        value: '450000'
      },
      {
        label: '重庆市',
        value: '500000'
      },
      {
        label: '西藏自治区',
        value: '540000'
      },
      {
        label: '云南省',
        value: '530000'
      },
      {
        label: '贵州省',
        value: '520000'
      },
      {
        label: '四川省',
        value: '510000'
      },
      {
        label: '新疆维吾尔自治区',
        value: '650000'
      },
      {
        label: '陕西省',
        value: '610000'
      },
      {
        label: '甘肃省',
        value: '620000'
      },
      {
        label: '青海省',
        value: '630000'
      },
      {
        label: '宁夏回族自治区',
        value: '640000'
      },
      {
        label: '台湾',
        value: '710000'
      },
      {
        label: '黑龙江',
        value: '230000'
      },
      {
        label: '澳门特别行政区',
        value: '820000'
      }
    ],
    // 收费站出入口属性（收费站广场类型）
    tollStationPassageway: [
      {
        label: '封闭式入口',
        value: 1
      },
      {
        label: '封闭式出口',
        value: 2
      },
      {
        label: '开放式',
        value: 3
      },
      {
        label: '封闭式出+封闭式入',
        value: 4
      },
      {
        label: '开放式+封闭式入',
        value: 5
      },
      {
        label: '封闭式出+开放式',
        value: 6
      },
      {
        label: '一均一制',
        value: 7
      }
    ],
    // 是否 例如判断收费广场车道数与收费车道数据是否相符等
    yesOrNo: [
      {
        label: '是',
        value: 1
      },
      {
        label: '否',
        value: 2
      }
    ],
    // 合作机构类别
    orgType: [
      {
        label: '道路业主',
        value: '01'
      },
      {
        label: '银行',
        value: '02'
      },
      {
        label: '石油石化',
        value: '03'
      },
      {
        label: '汽车服务',
        value: '04'
      },
      {
        label: '电信',
        value: '05'
      },
      {
        label: '生活服务',
        value: '06'
      },
      {
        label: '停车场',
        value: '07'
      },
      {
        label: '其它',
        value: '88'
      }
    ],
    // 石化企业
    petrifactionCompany: [
      {
        label: '中国石油天然气公司（中国石油）',
        value: '001'
      },
      {
        label: '中国石油化工集团公司（中国石化）',
        value: '002'
      },
      {
        label: '中国海洋石油总公司（中国海油）',
        value: '003'
      },
      {
        label: '中国中化集团公司（中化）',
        value: '004'
      },
      {
        label: '陕西延长石油（集团）有限责任公司（延长石油）',
        value: '005'
      }
    ],
    identificPointType: [
      {
        label: '普通标识点',
        value: 0
      },
      {
        label: '省界标识点',
        value: 1
      }
    ]
  }
}
