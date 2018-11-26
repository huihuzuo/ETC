import { Wgs84ToMercator02 } from '@/service/https.js'
export default {
  data () {
    return {
    }
  },
  methods: {
    addOperationPoints (points) {
      let coordinate = null
      let imgSrc = null
      let selectImgSrc = null
      points.forEach(item => {
        if (item['attributes']['value'] < 10) {
          imgSrc = './static/images/icon/mini.png'
          selectImgSrc = './static/images/icon/mini-hover.png'
        }
        if (item['attributes']['value'] < 100 && item['attributes']['value'] > 9) {
          imgSrc = './static/images/icon/small.png'
          selectImgSrc = './static/images/icon/small-hover.png'
        }
        if (item['attributes']['value'] > 99) {
          imgSrc = './static/images/icon/big.png'
          selectImgSrc = './static/images/icon/big-hover.png'
        }
        item['attributes']['style'] = new ol.style.Style({
          image: new ol.style.Icon({
            src: imgSrc
          }),
          text: new ol.style.Text({
            text: '' + item['attributes']['value'],
            fill: new ol.style.Fill({
              color: '#fff'
            }),
            textAlign: 'center'
          })
        })
        item['attributes']['selectStyle'] = new ol.style.Style({
          image: new ol.style.Icon({
            src: selectImgSrc
          }),
          text: new ol.style.Text({
            text: '' + item['attributes']['value'],
            fill: new ol.style.Fill({
              color: '#fff'
            }),
            textAlign: 'center'
          })
        })
        if (!(item['geometry'] instanceof Array)) {
          coordinate = (new ol.format.WKT()).readGeometry(item['geometry']).getCoordinates()
          item['geometry'] = Wgs84ToMercator02(coordinate[0], coordinate[1])
        }
      })
      return points
    },
    formatData (list) {
      if (list && list instanceof Array) {
        let obj = {}
        let result = []
        list.forEach(item => {
          if (item.lng === 0 || item.lat === 0) {
            return false
          }
          obj = {}
          let coordinate = 'POINT (' + item.lng + ' ' + item.lat + ')'
          obj = {
            attributes: item,
            geometry: coordinate,
            geometryType: 'Point'
          }
          if (!(coordinate instanceof Array)) {
            coordinate = (new ol.format.WKT()).readGeometry(coordinate).getCoordinates()
            obj['geometry'] = Wgs84ToMercator02(coordinate[0], coordinate[1])
          }
          result.push(obj)
        })
        return result
      }
    },
    formatTollStationSource (points) {
      let [imgSrc, selectImgSrc] = []
      points.forEach(item => {
        switch (item['attributes']['type']) {
          case 1:  // 共建站
            imgSrc = './static/images/icon/icon_map_tollStation_join.png'
            selectImgSrc = './static/images/icon/icon_map_tollStation_join_hover.png'
            break
          case 2:   // 分建站
            imgSrc = './static/images/icon/icon_map_tollStation_branch.png'
            selectImgSrc = './static/images/icon/icon_map_tollStation_branch_hover.png'
            break
        }
        item['attributes']['style'] = new ol.style.Style({
          image: new ol.style.Icon({
            src: imgSrc
          })
        })
        item['attributes']['selectStyle'] = new ol.style.Style({
          image: new ol.style.Icon({
            src: selectImgSrc
          })
        })
      })
      return points
    },
    addPointsNormal (points, layerName, image, selectImg) {
      this.$Maps.addPoints(points, {
        layerName: layerName,
        zoomToExtent: false,
        style: {
          image: {
            type: 'icon',
            image: {
              imageSrc: image,
              imageAnchor: [0.5, 1]
            }
          }
        },
        selectStyle: {
          image: {
            type: 'icon',
            image: {
              imageSrc: selectImg,
              imageAnchor: [0.5, 1]
            }
          }
        }
      })
    },
    addLine (line, layerName, strokeColor, selectStrokeColor) {
      this.$Maps.addPolyline(line, {
        layerName: layerName,
        zoomToExtent: true,
        style: {
          stroke: {
            strokeColor: strokeColor,
            strokeWidth: 3
          }
        },
        selectStyle: {
          stroke: {
            strokeColor: selectStrokeColor,
            strokeWidth: 3
          }
        }
      })
    }
  }
}
