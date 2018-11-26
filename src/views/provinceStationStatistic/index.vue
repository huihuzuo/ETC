<template>
  <div class="province-sation-statistic-wrap">
    <!--<mapTemp></mapTemp>-->
    <div class="province-sation-statistic-wrap-header">
      <span>
        <el-select v-model="xzqh" filterable placeholder="请选择行政区划">
          <el-option value="全国" value-key="000000">全国
          </el-option>
          <el-option
            v-for="item in xzqhList"
            :key="item.code"
            :label="item.name"
            :value="item.code">
          </el-option>
        </el-select>
      </span>
      <label @click="test()">省界收费站监控</label>
    </div>
    <div class="province-sation-statistic-wrap-content-left">
      <div class="province-sation-statistic-wrap-content-left-one">
        <ul>
          <li>
            <div class="left-one-left iconfont icon-shoufeizhan"></div>
            <div class="left-one-right">
              <span>{{tollstat.totalCount}}</span>
              <span>省界收费站总数</span>
            </div>
          </li>
          <li>
            <div class="left-one-left iconfont icon-star_full"></div>
            <div class="left-one-right">
              <span>{{tollstat.plazacount}}</span>
              <span>收费站广场总数</span>
            </div>
          </li>
          <li>
            <div class="left-one-left iconfont icon-xunizhandian"></div>
            <div class="left-one-right">
              <span>{{tollstat.virtualCount}}</span>
              <span>虚拟站点总数</span>
            </div>
          </li>
          <li>
            <div class="left-one-left iconfont icon-shoufeichedao"></div>
            <div class="left-one-right">
              <span>{{tollstat.lanecount}}</span>
              <span>收费站车道总数</span>
            </div>
          </li>
        </ul>
      </div>
      <div class="province-sation-statistic-wrap-content-left-two">
        <div class="pieEcharts" id="pieEcharts"></div>
      </div>
      <div class="province-sation-statistic-wrap-content-left-three">
        <div class="barEcharts1" id="barEcharts1"></div>
      </div>
    </div>
    <div class="province-sation-statistic-wrap-content-right" v-show="isShowXzqhList">
      <div class="table-fields">
        <span style="width: 50px;">序号</span>
        <span style="width: 100px;">区域</span>
        <span style="width: 100px;">总数/共建/分建</span>
        <span style="width: 60px;">占比</span>
      </div>
      <ul>
        <li v-for="(item, index) in xzqhList">
          <span style="width: 35px;">{{index + 1}}</span>
          <span style="width: 115px;" :title="item.name">{{item.name}}</span>
          <span style="width: 100px;">{{item.total}} / {{item.jointCount}} / {{item.sepCount}}</span>
          <span style="width: 60px;">{{item.percent}}</span>
        </li>
        <li>
          <span style="width: 50px;">29</span>
          <span style="width: 100px;">测试</span>
          <span style="width: 100px;">3 / 1 / 2</span>
          <span style="width: 60px;">0.2%</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/babel">
  import {mapState} from 'vuex'
  import mapOperationManager from './../../components/map/mixin/mapOperationManager'
  import mapTemp from './../../components/map/index'
  export default {
    name: 'index',
    data () {
      return {
        preZoom: 0,
        xzqh: '',
        popup: '',
        pieEchartsOption: {
          legend: {
            orient: 'vertical',
            left: 'left',
            data: []
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          color: ['#1c8ffa', '#f19d18'],
          series: [
            {
              name: '建站类型',
              type: 'pie',
              radius: '55%',
              center: ['50%', '60%'],
              data: [],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        },
        barEcharts1Option: {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          grid: {
            top: 0,
            left: 120,
            right: 30,
            bottom: 0
          },
          color: ['#1c8ffa'],
          xAxis: {
            type: 'value',
            name: '',
            axisLabel: {
              formatter: '{value}'
            }
          },
          yAxis: {
            type: 'category',
            inverse: true,
            data: ['ETC车道', 'MTC车道', '混合车道'],
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            }
          },
          series: [
            {
              name: '总数',
              type: 'bar',
              barWidth: 20,
              label: {
                normal: {
                  show: true,
                  // textBorderColor: '#333',
                  // textBorderWidth: 2,
                  position: 'right',
                  color: '#2a2a2a',
                  fontSize: '14'
                }
              },
              data: [220, 82, 63]
            }
          ]
        },
        points: [],
        tollStationStatic: [],
        prePoint: '',
        currPopoverId: '',
        tollStationPoints: [],
        tollstat: {},
        xzqhList: [],
        isShowXzqhList: true
      }
    },
    watch: {
      loadMapSuccess (v) {
        if (v.id) {
          this.addPoints()
          this.$Maps.on('feature:onselect', event => {
            let property = event.value.getProperties()
            let coordinate = event.value.getGeometry().getCoordinates()
            switch (property['params']['layerName']) {
              case 'points':
                this.$Maps.removeFeatureByLayerName('points')
                this.$Maps.removeFeatureByLayerName('line')
                this.loadXzqhGeom(property['code'])
                if (this.tollStationPoints.length > 0) {
                  this.addPointsTollStation('tollStationStatic', this.tollStationPoints, false)
                } else {
                  this.loadTollStationGeom()
                }
                break
              case 'tollStationStatic':
                if (this.currPopoverId !== '') {
                  this.$Maps.removeOverlayById(this.currPopoverId + '-popover')
                }
                if (this.prePoint['attributes'] && this.prePoint['attributes']['id'] !== property['id']) {
                  this.$Maps.removeFeatureByLayerName('tollStationSquare')
                  this.addPointsTollStation('tollStationStatic', [this.prePoint], false)
                }
                this.$Maps.removeFeatureById(property['id'], 'tollStationStatic')
                this.addPointsByType('tollStationSquare', this.prePoint, false)
                this.prePoint = {
                  attributes: property,
                  geometry: coordinate,
                  geometryType: 'Point'
                }
                this.loadTollStationSquareGeom(property['id'])
                break
              case 'tollStationSquare':
                this.currPopoverId = property['id']
                this.$ShowPopover('tollStationSquare', this.$Maps.getMap(), {
                  id: property['id'],
                  layerName: 'tollStationSquare',
                  coordinates: event.value.getGeometry().getCoordinates(),
                  properties: property,
                  zoomToExtent: true
                })
                break
            }
          })
          // 鼠标滑过事件
          this.$Maps.on('feature:onmouseover', event => {
            let property = event.value.getProperties()
            // let coordinate = event.value.getGeometry().getCoordinates()
            switch (property['params']['layerName']) {
              case 'tollStationStatic':
                this.$ShowPopover('tollStation', this.$Maps.getMap(), {
                  id: property['id'],
                  layerName: 'tollStation',
                  coordinates: event.value.getGeometry().getCoordinates(),
                  properties: property,
                  zoomToExtent: false
                })
                break
            }
          })
          // 鼠标划出事件
          this.$Maps.on('feature:onmouseout', event => {
            let property = event.value.getProperties()
            switch (property['params']['layerName']) {
              case 'tollStationStatic':
                // this.popup.hide()
                if (!this.$Maps) return
                this.$ClearAllPopover()
                break
            }
          })
          this.$Maps.getMap().getView().on('change:resolution', this.zoomChange.bind(this), this)
        }
      },
      tollstat (val) {
        if (val) {
          let statlanetype = val.statlanetype
          let yAxisLabel = []
          let seriesData = []
          statlanetype.forEach(item => {
            yAxisLabel.push(item.name)
            seriesData.push(item.val)
          })
          this.barEcharts1Option['yAxis']['data'] = yAxisLabel
          this.barEcharts1Option['series'][0]['data'] = seriesData
          this.initPieEcharts('barEcharts1', this.barEcharts1Option)

          let legendData = []
          let tollstat = val.tollstat
          tollstat.forEach(item => {
            legendData.push(item['name'])
            item['value'] = item['val']
          })
          this.pieEchartsOption['legend']['data'] = legendData
          this.pieEchartsOption['series'][0]['data'] = tollstat
          this.initPieEcharts('pieEcharts', this.pieEchartsOption)
        }
      },
      xzqh (val) {
        this.$Maps.removeFeatureByLayerName('points')
        this.$Maps.removeFeatureByLayerName('tollStationStatic')
        this.$Maps.removeFeatureByLayerName('tollStationSquare')
        this.$Maps.removeFeatureByLayerName('line')
        if (val === '全国') {
          this.isShowXzqhList = true
          this.xzqh = ''
          this.addPoints()
        } else {
          if (val !== '') {
            this.isShowXzqhList = false
            this.loadXzqhGeom(this.xzqh)
            this.loadTollStationGeom()
          }
        }
        this.loadStatTollByType()
      }
    },
    computed: {
      ...mapState({
        loadMapSuccess: state => state.map.loadMapSuccess // 地图是否加载完成
      })
    },
    mixins: [mapOperationManager],
    mounted () {
      if (this.loadMapSuccess) {
        this.addPoints()
      }
      this.loadStatTollByType()
    },
    methods: {
      test () {
        this.addPoints()
      },
      // 查询左侧统计数据
      loadStatTollByType () {
        let params = {
          xzqh: this.xzqh,
          types: '1,2'
        }
        this.$api.statTollStation(params).then(res => {
          if (res.data.code) {
            this.tollstat = res.data.data
          } else {
            this.$message.error('收费站统计查询失败')
          }
        }).catch(e => {
          this.$message.error('收费站统计查询失败')
        })
      },
      loadXzqhGeom (code) {
        this.$api.loadXzqhByCode({
          where: "id='" + code + "'"
        }).then(res => {
          if (res.data.features) {
            let xzqhGeom = res.data.features[0]
            let geom = new ol.geom.MultiLineString(xzqhGeom['geometry']['rings'])
            let line = {
              attributes: xzqhGeom['attributes'],
              geometry: geom,
              geometryType: 'MLineString'
            }
            this.addLine(line, 'line', '#1b9de8', '#D81E06')
          } else {
            this.$message.error('行政区划查询失败')
          }
        }).catch(e => {
          this.$message.error('行政区划查询失败')
        })
      },
      zoomChange (event) {
        if (this.xzqh !== '') {
          return false
        }
        let zoom = event.target.getZoom()
        if (this.preZoom > zoom) {
          if (zoom < 8 && typeof zoom === 'number' && zoom % 1 === 0) {
            this.addPoints()
            this.$Maps.removeFeatureByLayerName('tollStationStatic')
            this.$Maps.removeFeatureByLayerName('tollStationSquare')
          } else if (zoom > 7 && typeof zoom === 'number' && zoom % 1 === 0 && zoom < 11) {
            this.addPointsByType('tollStationStatic', this.tollStationPoints, true)
            this.$Maps.removeFeatureByLayerName('tollStationSquare')
          }
        }
        this.preZoom = zoom
      },
      loadTollStationGeom () {
        let params = {
          xzqh: this.xzqh,
          types: '1, 2',
          operations: '1, 2'
        }
        this.$api.getAllTollStation(params).then(res => {
          if (res.data.code) {
            this.tollStationPoints = res.data.data
            this.tollStationPoints = this.formatData(this.tollStationPoints)
            this.tollStationPoints = this.formatTollStationSource(this.tollStationPoints)
            this.addPointsByType('tollStationStatic', this.tollStationPoints, false)
          } else {
            this.$message.error('收费站查询失败')
          }
        }).catch(e => {
          this.$message.error('收费站查询失败')
        })
      },
      loadTollStationSquareGeom (id) {
        this.$api.loadTollStationSquareByTollStationId(id).then(res => {
          if (res.data.code === 200) {
            let points = res.data.data
            points = this.formatData(points)
            this.addPointsByType('tollStationSquare', points, false)
          } else {
            this.$message.error('收费站广场查询失败')
          }
        }).catch(e => {
          this.$message.error('收费站广场查询失败')
        })
      },
      loadTollStationStatic () {
        this.$api.statTollStationBycity().then(res => {
          if (res.data.code === 200) {
            this.xzqhList = Array.from(res.data.data)
            this.xzqhList.forEach(item => {
              item['total'] = item.jointCount + item.sepCount
              item.percent = (item.percent * 100).toFixed(2) + '%'
            })
            let list = res.data.data
            if (list) {
              let obj = {}
              list.forEach(item => {
                obj = {}
                let coordinate = 'POINT (' + item.ptx + ' ' + item.pty + ')'
                obj = {
                  attributes: {
                    ID: Math.random().toString(16),
                    value: item.val,
                    code: item.code,
                    name: item.name
                  },
                  geometry: coordinate,
                  geometryType: 'Point'
                }
                this.tollStationStatic.push(obj)
              })
              this.tollStationStatic = this.addOperationPoints(this.tollStationStatic)
              config.Maps.addPoints(this.tollStationStatic, {
                layerName: 'points',
                zoomToExtent: true,
                selectable: true
              })
            }
          } else {
            this.$message.error('收费站统计数据加载失败')
          }
        }).catch(e => {
          this.$message.error('收费站统计数据加载失败')
        })
      },
      addPoints () {
        if (this.tollStationStatic.length > 0) {
          config.Maps.addPoints(this.tollStationStatic, {
            layerName: 'points',
            zoomToExtent: true,
            selectable: true
          })
        } else {
          this.loadTollStationStatic()
        }
      },
      addPointsTollStation (name, points, zoomToExtent) {
        this.$Maps.addPoints(points, {
          layerName: name,
          zoomToExtent: zoomToExtent | false,
          selectable: true
        })
      },
      addPointsByType (name, points, zoomToExtent) {
        this.$Maps.addPoints(points, {
          layerName: name,
          zoomToExtent: zoomToExtent | false,
          selectable: true,
          style: {
            image: {
              type: 'icon',
              image: {
                imageSrc: './static/images/icon/icon_map_' + name + '.png',
                imageAnchor: [0.5, 1]
              }
            }
          },
          selectStyle: {
            image: {
              type: 'icon',
              image: {
                imageSrc: './static/images/icon/icon_map_' + name + '_hover.png',
                imageAnchor: [0.5, 1]
              }
            }
          }
        })
      },
      loadData (alias) {
        this.$api.loadLyaerGeom(alias).then(res => {
          if (res.data.success) {
            return res.data.data['features']
          } else {
            this.$message.error('收费站空间数据查询失败')
          }
        }).catch(e => {
          this.$message.error('收费站空间数据查询失败')
        })
      },
      initPieEcharts (id, option) {
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById(id))
        // 绘制图表
        myChart.setOption(option)
      }
    },
    destroyed () {
      this.xzqh = '全国'
      if (!this.$Maps) return
      this.$Maps.removeFeatureByLayerName('points')
      this.$Maps.removeFeatureByLayerName('line')
      this.$Maps.removeFeatureByLayerName('tollStationStatic')
      this.$Maps.removeFeatureByLayerName('tollStationSquare')
      this.$ClearAllPopover()
    },
    components: {
      mapTemp
    }
  }
</script>

<style lang="scss">
  .province-sation-statistic-wrap{
    width: 100%;
    height: 100%;
    .pointPolymerization{
      width: 30px;
      height: 30px;
      text-align: center;
      line-height: 30px;
      color: #FFF;
    }
    &-header{
      width: 100%;
      height: 50px;
      line-height: 50px;
      position: absolute;
      text-align: center;
      top: 0;
      background-color: rgba(255,255,255,0.8);
      box-shadow: 0px 2px 4px 0px
      rgba(20, 106, 251, 0.2);
      border: solid 1px #1c8ffa;
      span{
        position: absolute;
        left: 10px;
      }
    }
    &-content-left{
      width: 448px;
      height: calc(100% - 98px * 2);
      position: absolute;
      top: 98px;
      left: 30px;
      &-one{
        width: 446px;
        height: 224px;
        background-color: rgba(255,255,255,0.8);
        box-shadow: 0px 4px 10px 0px
        rgba(107, 108, 124, 0.2);
        border: solid 1px #1c8ffa;
        padding: 30px;
        // border-image:url(../../../static/images/border-line.png) 15 0 repeat;
        // border-left-image: url(../../../static/images/border-line.png) 30 30 repeat;
        ul {
          li{
            width: 50%;
            float: left;
            .left-one-left{
              width: 50px;
              height: 50px;
              float: left;
              background-color: #1c8ffa;
              border-radius: 25px;
              color: #FFF;
              text-align: center;
              line-height: 50px;
              font-size: 30px;
            }
            .left-one-right{
              width: calc(100% - 80px);
              height: 50px;
              margin-left: 5px;
              float: left;
              span{
                display: block;
                text-align: center;
              }
              span:nth-child(1){
                height: 23px;
                font-family: ArialMT;
                font-size: 30px;
                font-weight: normal;
                font-stretch: normal;
                line-height: 19px;
                letter-spacing: 0px;
                color: #1a82ee;
              }
              span:nth-child(2){
                height: 15px;
                font-family: MicrosoftYaHei;
                font-size: 14px;
                font-weight: normal;
                font-stretch: normal;
                line-height: 19px;
                letter-spacing: 0px;
                color: #4e5258;
                margin-top: 13px;
              }
            }
          }
          li:nth-child(3){
            margin-top: 41px;
          }
          li:nth-child(4){
            margin-top: 41px;
          }
        }
      }
      &-two{
        width: 446px;
        height: 256px;
        background-color: rgba(255,255,255,0.8);
        box-shadow: 0px 4px 10px 0px
        rgba(107, 108, 124, 0.2);
        border: solid 1px #1c8ffa;
        margin-top: 30px;
        padding: 30px;
        .pieEcharts{
          width: 100%;
          height: 100%;
        }
      }
      &-three{
        width: 446px;
        height: 196px;
        background-color: rgba(255,255,255,0.8);
        box-shadow: 0px 4px 10px 0px
        rgba(107, 108, 124, 0.2);
        border: solid 1px #1c8ffa;
        margin-top: 30px;
        padding: 30px;
        .barEcharts1{
          width: 100%;
          height: 100%;
        }
      }
    }
    &-content-right{
      width: 325px;
      height: calc(100% - 262px * 2);
      position: absolute;
      top: 98px;
      right: 30px;
      background-color: rgba(255,255,255,0.8);
      box-shadow: 0px 4px 10px 0px
      rgba(107, 108, 124, 0.2);
      border: solid 1px #1c8ffa;
      overflow: hidden;
      .table-fields{
        font-family: MicrosoftYaHei;
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 40px;
        letter-spacing: 0px;
        color: #4e5258;
        span{
          display: inline-block;
          text-align: center;
          height: 40px;
          line-height: 40px;
        }
        letter-spacing: 0px;
      }
      ul {
        width: 107%;
        height: 100%;
        overflow-y: scroll;
        li{
          font-family: MicrosoftYaHei;
          font-size: 14px;
          font-weight: normal;
          font-stretch: normal;
          line-height: 40px;
          letter-spacing: 0px;
          color: #4e5258;
          span{
            display: inline-block;
            text-align: center;
            height: 40px;
            line-height: 40px;
          }
          span:nth-last-child(1){
            color: #1c8ffa;
          }
        }
      }
    }
  }
</style>
