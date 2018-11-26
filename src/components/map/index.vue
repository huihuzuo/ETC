<template>
  <div class="map-wrap">
    <div id="map"></div>
    <div class="map-tool">
      <div class="default-content iconfont icon-gongju1" @click="showDialog()"></div>
    </div>
    <div class="map-switch">
      <div class="default-content iconfont icon-yingyong"></div>
      <div class="hover-content">
        <span><el-checkbox v-model="roadnet">路网</el-checkbox></span>
        <span><el-checkbox v-model="label">标注</el-checkbox></span>
      </div>
    </div>
    <div class="layer-switch">
      <div class="default-content iconfont icon-tuceng"></div>
      <div class="hover-content">
        <span><el-checkbox v-model="etc">ETC</el-checkbox></span>
        <span><el-checkbox v-model="serviceArea">服务区</el-checkbox></span>
        <span><el-checkbox v-model="gas">加油站</el-checkbox></span>
        <span><el-checkbox v-model="park">停车场</el-checkbox></span>
      </div>
    </div>
    <mapChange class="map-change" @initMap="initMap"></mapChange>
    <el-dialog
      title="经纬度定位"
      :visible.sync="dialogVisible"
      :before-close="handleClose">
      <div class="dialog-wrap">
        <div class="content">
          <label>经度:</label>
          <div class="content-input">
            <el-input v-model="longitude"/>
          </div>
        </div>
        <div class="content">
          <label>纬度：</label>
          <div class="content-input">
            <el-input v-model="latitude"/>
          </div>
        </div>
        <div class="dialog-btn">
          <span @click="handClick('reset')">重置</span>
          <span @click="handClick('sure')">确定</span>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/babel">
  import Vue from 'vue'
  import { Wgs84ToMercator02 } from '@/service/https.js'
  import mapOperationManager from './../../components/map/mixin/mapOperationManager'
  import mapChange from './../../components/map/mapChange'
  export default {
    mixins: [mapOperationManager],
    name: 'index',
    data () {
      return {
        dialogVisible: false,
        Maps: null,
        serviceArea: '',
        longitude: '',
        latitude: '',
        etc: '',
        park: '',
        gas: '',
        roadnet: false,
        label: false,
        isOpen: true, // 地图上左侧面板按钮是否展开 默认展开
        isShowTakeUp: true, // 地图上是否显示收起、展开按钮
        contextMenu: {
          itemWidth: 130,
          itemHeight: 30,
          items: [
            {
              name: '清空',
              alias: 'clear',
              iconType: 'iconfont',
              icon: 'icon-delete1',
              iconColor: '#1a82ee'
            }
          ]
        }
      }
    },
    watch: {
      roadnet (val) {
        let _config = config.getLayerConfigByLayerName('roadnet', 'layerConfig')
        if (_config['layerUrl'].indexOf('token') === -1) {
          _config['layerUrl'] = _config['layerUrl'] + '?token=' + config.token
        }
        if (val) {
          config.Maps.createXYZLayer(_config['layerName'], _config)
        } else {
          config.Maps.removeLayerByLayerName(_config['layerName'])
        }
      },
      label (val) {
        let _config = config.getLayerConfigByLayerName('vectorLabel', 'layerConfig')
        if (_config['layerUrl'].indexOf('token') === -1) {
          _config['layerUrl'] = _config['layerUrl'] + '?token=' + config.token
        }
        if (val) {
          config.Maps.createXYZLayer(_config['layerName'], _config)
        } else {
          config.Maps.removeLayerByLayerName(_config['layerName'])
        }
      },
      // 监听路由 判断是否是查询模块 查询模块显示地图上左侧面板有收起按钮
      '$route': function (router) {
        this.handleTakeUpShow(router['fullPath'])
      }
    },
    mounted () {
      // this.initMap()
      this.handleTakeUpShow(this.$route['fullPath'])
    },
    methods: {
      /***
       * 地图初始化
       */
      initMap () {
        console.log('==================initMap===============')
        if (config.mapConfig.baseLayers[0]['layerUrl'].indexOf('token') === -1) {
          config.mapConfig.baseLayers[0]['layerUrl'] = config.mapConfig.baseLayers[0]['layerUrl'] + '?token=' + config.token
        }
        const Maps = new HMap('map', config.mapConfig)
        Maps.on('loadMapSuccess', event => {
          if (event) {
            Maps.on('click', event => {
              console.log(event)
            })
            var menu = new ol.control.ContextMenu(this.contextMenu)
            Maps.addControl(menu)
            menu.on('item-click', (event, data) => {
              console.log(event, data)
              switch (data['source']['alias']) {
                case 'clear':
                  Maps.removeFeatureByLayerName('templateLayer')
                  break
              }
            })
            this.$store.dispatch('actionMapState', true)
            config.Maps = Maps
            Vue.prototype.$Maps = Maps
            var sel = new ol.interaction.PointerEvents()
            this.$Maps.addInteraction(sel)
            Maps.updateSize()
          } else {
            this.$store.dispatch('actionMapState', false)
            throw new Error('地图加载失败！')
          }
        })
      },
      /**
       * 展开收起按钮点击操作
       */
      handleOpen () {
        this.isOpen = !this.isOpen
      },
      /**
       * 判断是否应当显示展开收起按钮
       * @param fullPath
       */
      handleTakeUpShow (fullPath) {
        let flag = false
        const openRouteArr = [
          '/query',
          '/result',
          '/detail'
        ]
        openRouteArr.forEach((el) => {
          if (fullPath.indexOf(el) > 0) {
            flag = true
          }
        })
        if (flag) {
          this.isShowTakeUp = true
        } else {
          this.isShowTakeUp = false
        }
      },
      // 工具点击事件
      showDialog () {
        this.dialogVisible = true
      },
      // dialog关闭事件
      handleClose () {
        this.dialogVisible = false
      },
      // dialog 按钮事件
      handClick (alias) {
        switch (alias) {
          case 'reset':
            this.longitude = ''
            this.latitude = ''
            break
          case 'sure':
            let coordinate = Wgs84ToMercator02(parseFloat(this.longitude), parseFloat(this.latitude))
            let obj = {
              attribute: {
                id: Math.random().toString()
              },
              geometry: coordinate,
              geometryType: 'Point'
            }
            this.addPointsNormal([obj], 'templateLayer', './static/images/map_position.png', './static/images/map_position_hover.png')
            this.dialogVisible = false
            break
        }
      }
    },
    components: {
      mapChange
    }
  }
</script>

<style lang="scss">
  .map-wrap{
    width: 100%;
    height: 100%;
    position: relative;
    #map{
      width: 100%;
      height: 100%;
    }
    .layer-switch{
      pointer-events: auto;
      width: 160px;
      height: 26px;
      position: absolute;
      bottom: 174px;
      right: 26px;
      &:hover{
        color: #1c8ffa;
        .hover-content{
          display: block;
        }
      }
      .default-content{
        padding: 2px;
        display: inline-block;
        font-size: 22px;
        color: #7c8196;
        width: 26px;
        height: 26px;
        text-align: center;
        line-height: 26px;
        background-color: #fff;
        pointer-events: auto;
        box-shadow: 0 2px 2px rgba(0, 0, 0, 0.15);
        position: absolute;
        right: 0px;
        cursor: pointer;
        font-size: 14px;
        &:hover{
          color: #1c8ffa;
        }
      }
      .hover-content{
        background-color: #FFF;
        width: 100px;
        height: 130px;
        line-height: 31px;
        box-shadow: 0 2px 2px rgba(0, 0, 0, 0.15);
        position: relative;
        right: -28px;
        text-align: left;
        padding-left: 10px;
        border: solid 1px #1c8ffa;
        border-radius: 4px;
        display: none;
        bottom: 20px;
      }
    }
    .map-tool{
      padding: 2px;
      display: inline-block;
      font-size: 22px;
      color: #7c8196;
      width: 26px;
      height: 26px;
      text-align: center;
      line-height: 26px;
      background-color: #fff;
      pointer-events: auto;
      box-shadow: 0 2px 2px rgba(0, 0, 0, 0.15);
      position: absolute;
      right: 26px;
      cursor: pointer;
      bottom: 202px;
      cursor: pointer;
      font-size: 14px;
      &:hover{
        color: #1c8ffa;
      }
    }
    .map-switch{
      width: 160px;
      height: 26px;
      position: absolute;
      bottom: 147px;
      right: 26px;
      &:hover{
       color: #1c8ffa;
        .hover-content{
          display: block;
        }
      }
      .default-content{
        padding: 2px;
        display: inline-block;
        font-size: 22px;
        color: #7c8196;
        width: 26px;
        height: 26px;
        text-align: center;
        line-height: 26px;
        background-color: #fff;
        pointer-events: auto;
        box-shadow: 0 2px 2px rgba(0, 0, 0, 0.15);
        position: absolute;
        right: 0px;
        cursor: pointer;
        font-size: 14px;
        &:hover{
          color: #1c8ffa;
        }
      }
      .hover-content{
        background-color: #FFF;
        width: 134px;
        height: 33px;
        line-height: 31px;
        box-shadow: 0 2px 2px rgba(0, 0, 0, 0.15);
        position: relative;
        right: 5px;
        text-align: left;
        padding-left: 10px;
        border: solid 1px #1c8ffa;
        border-radius: 4px;
        display: none;
      }
    }
    .map-change{
      bottom: 4px !important;
    }
    .el-dialog{
      width: 300px;
      height: 222px;
      background-color: #ffffff;
      box-shadow: 0px 2px 4px 0px
      rgba(99, 168, 235, 0.2);
      border-radius: 4px;
      position: absolute;
      top: 50%;
      margin-top: -111px !important;
      left: 50%;
      margin-left: -150px;
      .el-dialog__header{
        height: 40px;
        line-height: 40px;
        padding: 0 !important;
        margin-left: 20px;
        .el-dialog__title{
          color: #1a82ee;
          font-size: 14px !important;
        }
      }
      .el-dialog__body{
        padding: 10px 20px !important;
      }
      .dialog-wrap{
        width: calc(100% - 20px);
        margin: auto;
        .content{
          width: 100%;
          height: 40px;
          label{
            width: 45px;
            height: 40px;
            line-height: 40px;
            display: inline-block;
            float: left;
          }
          .content-input{
            display: inline-block;
            height: 40px;
            line-height: 40px;
            width: calc(100% - 45px);
            float: left;
          }
        }
        .content:nth-child(2){
          margin: 10px 0;
        }
        .dialog-btn{
          width: 100%;
          height: 40px;
          margin-top: 20px;
          span{
            display: inline-block;
            width: 80px;
            height: 34px;
            line-height: 34px;
            text-align: center;
            border: 1px #dcdfe6 solid;
            color: #2a2a2a;
            border-radius: 17px;
            cursor: pointer;
            &:hover{
              border: 1px #1b9de8 solid;
              color: #1b9de8;
            }
          }
          span:nth-child(2){
            margin-left: 40px;
          }
        }
      }
    }
    .hmap-control-zoom{
      bottom: 86px !important;
    }
  }
</style>
