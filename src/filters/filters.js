import moment from 'moment'
export default {
  formatIf (value) {
    if (value === 1) {
      return '是'
    }
    if (value === 0) {
      return '否'
    }
    return '-'
  },
  formatState (value) {
    if (value === '0') {
      return '未审核'
    }
    if (value === '1') {
      return '已审核'
    }
    return '-'
  },
  formatType (code) {
    if (code === '01') {
      return 'TEXT'
    }
    if (code === '02') {
      return 'INTEGER'
    }
    if (code === '03') {
      return 'DOUBLE'
    }
    if (code === '04') {
      return 'DATE'
    }
    if (code === '05') {
      return 'GEOMETRY'
    }
    return ''
  },
  formatRole (value) {
    if (value === 0) {
      return '管理员'
    }
    if (value === 1) {
      return '普通用户'
    }
    return '-'
  },
  formatIfzz (value) {
    if (value === 0) {
      return '未开展'
    }
    if (value === 1) {
      return '进行中'
    }
    if (value === 2) {
      return '完成'
    }
  },
  dateFormat: function (value, format) {
    if (value === undefined) return
    return moment(value).format('YYYY-MM-DD')
  },
  formatDate: function (date) {
    if (!date) {
      return ''
    }
    return moment(date).format('YYYY-MM-DD hh:mm')
  },
  formatDateSecond: function (date) {
    if (!date) {
      return ''
    }
    return moment(date).format('YYYY-MM-DD hh:mm:ss')
  },
  formatTimeMin: function (date) {
    if (!date) {
      return ''
    }
    return moment(date).format('hh:mm')
  },
  jwd: function (val) {
    let value = Math.abs(val)
    let v1 = Math.floor(value)
    let v2 = Math.floor((value - v1) * 60)
    let v3 = Math.round((value - v1) * 3600 % 60)
    return v1 + '°' + v2 + '′' + v3 + '″'
  },
  runtimeStatus: function (code) {
    if (code === 0) {
      return '暂停'
    }
    if (code === 1) {
      return '启动'
    }
    return '-'
  },
  publishStatus: function (code) {
    if (code === 0) {
      return '未发布'
    }
    if (code === 1) {
      return '已发布'
    }
    return '-'
  },
  mapserviceType: function (code) {
    if (code === '1') {
      return 'WMS'
    }
    if (code === '2') {
      return 'WFS'
    }
    if (code === '3') {
      return 'WMTS'
    }
    return '-'
  },
  serviceType: function (code) {
    if (code === '01') {
      return '地图服务'
    }
    if (code === '02') {
      return '专题服务'
    }
    return '-'
  },
  formatServerTye: function (code) {
    if (code === '01') {
      return '应用服务器'
    }
    if (code === '02') {
      return '地图服务器'
    }
    if (code === '03') {
      return '专题服务器'
    }
    if (code === '04') {
      return '数据库服务器'
    }
    return '-'
  },
  verifyStatus: function (code) {
    if (code === '1') {
      return '已审核'
    }
    if (code === '0') {
      return '未审核'
    }
    return '-'
  },
  passedStatus: function (code) {
    if (code === '1') {
      return '通过'
    }
    if (code === '0') {
      return '未通过'
    }
    return '-'
  },
  standardType: function (code) {
    if (code === '002') {
      return '数据规范'
    }
    if (code === '003') {
      return '应用规范'
    }
    if (code === '001') {
      return '服务规范'
    }
    return '-'
  },
  updateFrequency: function (code) {
    if (code === '01') {
      return '1年/次'
    }
    if (code === '02') {
      return '半年/次'
    }
    if (code === '03') {
      return '1月/次'
    }
  },
  formatError: function (code) {
    if (code === 200) {
      return '正常'
    }
    if (code === 404) {
      return '服务不存在'
    }
    if (code === 506) {
      return '服务未启动'
    }
    if (code === 509) {
      return '资源被锁定'
    }
    if (code === 510) {
      return '资源未在有效期'
    }
  },
  sysLogType: function (code) {
    if (code === 1) {
      return '提示'
    }
    if (code === 0) {
      return '警告'
    }
  },
  formatEdus (value) {  //   [{code: 1, name: '无'}, {code: 2, name: '初中'}, {code: 3, name: '高中'}, {code: 4, name: '专科'}, {code: 5, name: '本科'}, {code: 6, name: '硕士'}, {code: 7, name: '博士'}],
    if (value === '01') {
      return '无'
    }
    if (value === '02') {
      return '初中'
    }
    if (value === '03') {
      return '高中'
    }
    if (value === '04') {
      return '专科'
    }
    if (value === '05') {
      return '本科'
    }
    if (value === '06') {
      return '硕士'
    }
    if (value === '07') {
      return '博士'
    }
    return '无'
  },
  formatTeams (value) { //   teams: [{code: 1, name: '班组一'}, {code: 2, name: '班组二'}, {code: 3, name: '班组三'}, {code: 4, name: '班组四'}, {code: 5, name: '班组五'}],
    if (value === 1) {
      return '班组一'
    }
    if (value === 2) {
      return '班组二'
    }
    if (value === 3) {
      return '班组三'
    }
    if (value === 4) {
      return '班组四'
    }
    if (value === 5) {
      return '班组五'
    }
    return '-'
  },
  formatWeather (value) { //   teams: [{code: 1, name: '班组一'}, {code: 2, name: '班组二'}, {code: 3, name: '班组三'}, {code: 4, name: '班组四'}, {code: 5, name: '班组五'}],
    if (value === '01') {
      return '晴'
    }
    if (value === '02') {
      return '多云'
    }
    if (value === '03') {
      return '阴'
    }
    if (value === '04') {
      return '雾霾'
    }
    if (value === '05') {
      return '阵雨'
    }
    if (value === '06') {
      return '雷阵雨'
    }
    if (value === '07') {
      return '小雨'
    }
    if (value === '08') {
      return '中雨'
    }
    if (value === '09') {
      return '大雨'
    }
    if (value === '10') {
      return '暴雨'
    }
    if (value === '11') {
      return '大暴雨'
    }
    if (value === '12') {
      return '特大暴雨'
    }
    if (value === '13') {
      return '雨夹雪'
    }
    if (value === '14') {
      return '阵雪'
    }
    if (value === '15') {
      return '小雪'
    }
    if (value === '16') {
      return '中雪'
    }
    if (value === '17') {
      return '大雪'
    }
    if (value === '18') {
      return '暴雪'
    }
    return '-'
  },
  /**
   * 值域信息转换 (同时支持针对于数据需要值域转换有分割处理的进行转换返回)
   * @param value 实际数据
   * @param range 值域数组
   * @param symbol 分割的符号 默认为“,”
   * @returns {string}
   */
  rangeConversion (value, range, symbol) {
    let v = []
    if (!symbol) {
      symbol = ','
    }
    if (value) {
      const arr = value.toString().split(symbol)
      range.forEach((el) => {
        arr.forEach((ele) => {
          if (el['value'].toString() === ele.toString()) {
            v.push(el['label'])
          }
        })
      })
    }
    if (v.length > 0) {
      return v.join(symbol)
    } else {
      return '-'
    }
  },
  /**
   * 根据etc类型显示其对应的颜色值
   * @param value
   * @param range
   * @returns {string}
   */
  formatTollLaneTypeColor (value, range) {
    let v = '#1c8ffa' // 默认颜色设置了混合颜色
    range.forEach((el) => {
      if (el['value'] === value) {
        v = el['color']
      }
    })
    return v
  },
  /**
   * 收费车道潮汐车道反向时间处理
   * @param value
   * @returns {string}
   */
  formatTidalTime (value) {
    if (value) {
      if (value === '00000000') {
        return '非潮汐车道'
      } else {
        if (value.length === 8) {
          const startTime = value.substring(0, 2) + ':' + value.substring(2, 4)
          const endTime = value.substring(4, 6) + ':' + value.substring(6, 8)
          return '每天' + startTime + '和' + endTime
        } else {
          return '-'
        }
      }
    } else {
      return '-'
    }
  }
}
