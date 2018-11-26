<!--收费站广场结果列表-->
<template>
  <div class="tollStationSquareResultEditList">
    <div @mouseover="mouseover(item, $index)" @mouseout="mouseout(item, $index)" class="result-list-item-div" v-for="(item, $index) in tollStationSquareData" @click="handleClick(item)" :class="currentSelect === item.id ? 'result-list-currentSelect' : ''">
      <div class="item-left">
        <span class="item-left-icon"></span>
      </div>
      <div class="item-right">
        <div class="item-right-first" :title="item.name + '(' + item.id + ')'">{{item.name}}（{{item.id}}）</div>
        <div class="item-right-second" :title="item.plazaType | rangeConversion(plazaType)">{{item.plazaType | rangeConversion(plazaType)}} <span @click="removeClick(item)" class="iconfont icon-delete"></span></div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  $layerName: 'tollStationSquare';
  .tollStationSquareResultEditList {
    width: 100%;
    height: 100%;
    .item-right{
      .item-right-second{
        span{
          width: 30px;
          height: 30px;
          float: right;
          margin-right: 30px;
          display: none;
          cursor: pointer;
          z-index: 2;
        }
      }
    }
    .result-list-item-div {
      &:hover {
        .item-left {
          &-icon {
            background: url("../../../static/images/icon/icon_map_" + $layerName + "_hover.png") no-repeat;
          }
        }
        .item-right{
          .item-right-second{
            span{
              display: inline-block;
              color: #1b9de8;
            }
          }
        }
      }
      .item-left {
        &-icon {
          background: url("../../../static/images/icon/icon_map_" + $layerName + ".png") no-repeat;
        }
      }
    }
  }
</style>
<script>
  import { Wgs84ToMercator02, Mercator02ToWgs84 } from '../../service/https'
  import {mapState} from 'vuex'
  const _layerName = 'tollStationSquare' // 收费广场图层LayerName
  export default {
    props: {
      // 收费广场数据
      tollStationSquareData: {
        type: Array,
        default: function () {
          return []
        }
      },
      removeTollStationSquareById: {
        type: Function
      }
    },
    data () {
      return {
        plazaType: config.range.plazaType, // 广场类型select
        currentSelect: null // 当前选择的item项
      }
    },
    computed: {
      ...mapState({
        loadMapSuccess: state => state.map.loadMapSuccess
      })
    },
    mounted () {
      // 收费站广场数据有值后开始添加点
      if (this.tollStationSquareData && this.tollStationSquareData.length > 0) {
        if (this.loadMapSuccess) {
          this.addPoints(this.handleData(this.tollStationSquareData))
        }
      }
    },
    watch: {
      // 收费站广场数据有值后开始添加点
      tollStationSquareData (v, ov) {
        if (this.tollStationSquareData && this.tollStationSquareData.length > 0) {
          if (this.loadMapSuccess) {
            this.addPoints(this.handleData(this.tollStationSquareData))
          }
        }
      }
    },
    methods: {
      removeClick (item) {
        this.$emit('tollStationSquareOperation', {
          alias: 'remove',
          data: item
        })
      },
      /**
       * 列表中的每一个item点击事件
       * @param item
       */
      handleClick (item) {
        this.$emit('tollStationSquareOperation', {
          alias: 'edit',
          item: item
        })
        this.currentSelect = item['id']
        /* let coordinates = []
        let popoverClassName = null
        if (item['lng'] && item['lat']) {
          coordinates = Wgs84ToMercator02(item['lng'], item['lat'])
          popoverClassName = null
        } else {
          coordinates = this.$Maps.getView().getCenter()
          popoverClassName = 'space-error-bubble'
        }
        this.$ShowPopover(_layerName, this.$Maps.getMap(), {
          id: item['id'],
          layerName: _layerName,
          coordinates: coordinates,
          properties: item,
          zoomToExtent: true,
          className: popoverClassName
        }) */
      },
      /**
       * 处理数据,将对应的数据处理成GeoJSON数据格式
       * @param data
       * @returns {Array}
       */
      handleData (data) {
        let point = {}
        let points = []
        let coordinates = []
        data.forEach((el) => {
          point = {}
          if (el['lng'] && el['lat']) {
            coordinates = Wgs84ToMercator02(el['lng'], el['lat'])
            point = {
              attributes: el,
              properties: el,
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: [coordinates[0], coordinates[1]]
              }
            }
            points.push(point)
          }
        })
        return points
      },
      /**
       * 在地图上标记数据列表对应的空间位置
       * @param _points
       */
      addPoints (_points) {
        if (!this.$Maps) return
        this.$Maps.removeLayerByLayerName(_layerName)
        if (_points && _points.length <= 0) return
        this.$Maps.addPoints(_points, {
          layerName: _layerName,
          geomType: 'GeoJSON',
          style: {
            image: {
              type: 'icon',
              image: {
                imageSrc: require('../../../static/images/icon/icon_map_' + _layerName + '.png'),
                imageAnchor: [0.5, 0.5]
              }
            }
          },
          selectStyle: {
            image: {
              type: 'icon',
              image: {
                imageSrc: require('../../../static/images/icon/icon_map_' + _layerName + '_hover.png'),
                imageAnchor: [0.5, 0.5]
              }
            }
          },
          zoomToExtent: true,
          selectable: true,
          moveable: true
        })
        this.$Maps.getMap().on('feature:onmove', (event) => {
          let property = event.value.getProperties()
          let coordinate = event.value.getGeometry().getCoordinates()
          coordinate = Mercator02ToWgs84(coordinate)
          property['lng'] = coordinate[0]
          property['lat'] = coordinate[1]
          this.$emit('tollStationSquareOperation', {
            alias: 'coordinate',
            item: property
          })
        })
      },
      /**
       * div 移出事件 移出后 更换图标
       * @param item
       * @param index
       */
      mouseout (item, index) {
        this.$Maps.unHighLightFeature(item['id'], '', true)
      },
      /**
       * div 滑过事件 滑过时 更换图标
       * @param item
       * @param index
       */
      mouseover (item, index) {
        this.$Maps.highLightFeature(item['id'], '', true)
      }
    },
    components: {},
    destroyed () {
      this.currentSelect = null
      if (!this.$Maps) return
      this.$Maps.removeLayerByLayerName(_layerName)
      this.$ClearAllPopover()
    }
  }
</script>
