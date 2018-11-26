import Math from 'mathjs'
/**
 * 时间戳转标准格式 2016-09-05 13:46:52
 * @returns {{_year: string, _month: string, _day: string, getYear: date.getYear, getMonth: date.getMonth, getDay: date.getDay}}
 */
function timestampFormat (str, bl, flag) {
  if (bl) {
    str = parseInt(str) - 8 * 60 * 60 * 1000
  }

  var date = new Date(str)
  var yy = date.getFullYear()
  var mmmm = date.getMonth() + 1
  var dd = date.getDate()
  var h = date.getHours()
  var m = date.getMinutes()
  var s = date.getSeconds()
  if (flag) {
    return yy + '-' + (mmmm < 10 ? ('0' + mmmm) : mmmm) + '-' + (dd < 10 ? ('0' + dd) : dd)
  } else {
    return yy + '-' + (mmmm < 10 ? ('0' + mmmm) : mmmm) + '-' + (dd < 10 ? ('0' + dd) : dd) + ' ' + (h < 10 ? ('0' + h) : h) + ':' + (m < 10 ? ('0' + m) : m) + ':' + (s < 10 ? ('0' + s) : s)
  }
}

/**
 * @description 格式化 时间
 * @param date 06/24/2016 12:14:25
 * @returns 2016-06-24 12:14:25
 */
function dateFormat (date) {
  var yy = date.getFullYear()
  var mmmm = date.getMonth() + 1
  var dd = date.getDate()
  var h = date.getHours()
  var m = date.getMinutes()
  var s = date.getSeconds()
  return yy + '-' + (mmmm < 10 ? ('0' + mmmm) : mmmm) + '-' + (dd < 10 ? ('0' + dd) : dd) + ' ' + (h < 10 ? ('0' + h) : h) + ':' + (m < 10 ? ('0' + m) : m) + ':' + (s < 10 ? ('0' + s) : s)
}

function normFormatTimeStamp (date) {
  var timestamp2 = Date.parse(new Date(date))
  return timestamp2 / 1000
}

/**
 * 获取当前系统日期
 * @returns {string}  2016-12-10
 */
function currentDate (hyphen) {
  let date = new Date()
  let yy = date.getFullYear()
  let mmmm = date.getMonth() + 1
  let dd = date.getDate()
  return yy + hyphen + (mmmm < 10 ? ('0' + mmmm) : mmmm) + hyphen + (dd < 10 ? ('0' + dd) : dd)
}

/**
 * 获取当前系统大写星期
 * @returns {string}    六
 */
function currentWeek (hyphen) {
  let date = new Date()
  let weeks = {
    '0': '日',
    '1': '一',
    '2': '二',
    '3': '三',
    '4': '四',
    '5': '五',
    '6': '六'
  }
  return weeks[date.getDay()]
}

/**
 * 获取当前系统时间 （二十四小时制）
 * @returns {string}    13:58:16
 */
function currentTime (hyphen) {
  let date = new Date()
  var h = date.getHours()
  var m = date.getMinutes()
  var s = date.getSeconds()
  return (h < 10 ? ('0' + h) : h) + ':' + (m < 10 ? ('0' + m) : m) + ':' + (s < 10 ? ('0' + s) : s)
}

/**
 * 桩号格式化
 * @param 12.215  /  12.2
 * @returns {string} 12+215   /   12.200
 */
function formatStake (data) {
  let [temp, index] = ['', data.toString().indexOf('.')]
  if (index !== -1) {
    data = data.toString().replace('.', '+')
  } else {
    data += '+'
  }
  index = data.toString().indexOf('+')
  temp = data.substr(index + 1, data.length)
  return temp.length === 0 ? data + '000' : temp.length === 1 ? data + '00' : temp.length === 2 ? data + '0' : data
}

function time () {
  var date = new Date()
  let hh = date.getHours()
  let mm = date.getMinutes()
  let time = (hh < 10 ? ('0' + hh) : hh) + ':' + (mm < 10 ? ('0' + mm) : mm)
  return time
}

function arrayformatPoint (data) {
  try {
    let arrays = []
    if (data && Array.isArray(data) && data.length > 0) {
      arrays = data.map(item => {
        let _object = {
          attributes: item
        }
        if (item['ptx'] && item['pty'] && Number(item['ptx']) !== 0 && Number(item['pty']) !== 0) {
          _object['geometry'] = [item.ptx, item.pty]
        }
        return _object
      })
    }
    return arrays
  } catch (e) {
    console.log(e)
  }
}

function Mercator02ToWgs84 (coord) {
  coord = HMap.transform.MercatorTolonLat(coord[0], coord[1])
  const coordinates = HMap.transform.gcj02towgs84(coord[0], coord[1])
  return coordinates
}
function Wgs84ToMercator02 (lontitude, latitude) {
  let coordinates = HMap.transform.gcj02towgs84(lontitude, latitude)
  coordinates = HMap.transform.lonLatToMercator(coordinates[0], coordinates[1])
  return coordinates
}

/**
 *  用逗号隔开的字符串
 */
const commaSplit = (_data, _attr) => {
  let _ids = ''
  if (Array.isArray(_data)) {
    for (let i = 0; i < _data.length; i++) {
      if (_attr === null || _attr === undefined) {
        _attr = 'id'
      }
      _ids += _data[i][_attr] + ','
    }
    _ids = _ids.substr(0, _ids.length - 1)
    return _ids
  }
  if (typeof _data === 'object') {
    if (_attr === null || _attr === undefined) {
      _attr = 'id'
    }
    _ids = _data[_attr]
    return _ids
  }
}

export {
  timestampFormat,
  dateFormat,
  normFormatTimeStamp,
  formatStake,
  currentDate,
  currentWeek,
  currentTime,
  time,
  arrayformatPoint,
  Mercator02ToWgs84,
  Wgs84ToMercator02,
  commaSplit
}
