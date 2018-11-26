<template>
  <div class="left-panel-wrap">
    <!--<mapTemp></mapTemp>-->
    <div class="map-content-wrap">
      <div class="map-content" v-show="isOpen">
        <router-view></router-view>
      </div>
      <div class="icon-takeUp-open" v-show="isShowTakeUp">
         <span class="icon-takeUp-open-span" @click="handleOpen">
           <img class="icon-takeUp-open-img" :src="isOpen ? require('../../../static/images/icon_takeUp.png') : require('../../../static/images/icon_open.png')"/>
         </span>
      </div>
    </div>
  </div>
</template>

<script type="text/babel">
  // import Vue from 'vue'
  import mapTemp from './../../components/map/index'
  import MapEvent from './../../mixin/MapEvent'
  export default {
    mixins: [MapEvent],
    name: 'index',
    data () {
      return {
        Maps: null,
        roadnet: false,
        label: false,
        isOpen: true, // 地图上左侧面板按钮是否展开 默认展开
        isShowTakeUp: true // 地图上是否显示收起、展开按钮
      }
    },
    watch: {
      // 监听路由 判断是否是查询模块 查询模块显示地图上左侧面板有收起按钮
      '$route': function (router) {
        this.handleTakeUpShow(router['fullPath'])
      }
    },
    mounted () {
      this.handleTakeUpShow(this.$route['fullPath'])
    },
    methods: {
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
      }
    },
    components: {
      mapTemp
    }
  }
</script>

<style lang="scss">
  .left-panel-wrap{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    pointer-events: none;
    .map-content-wrap {
      width: 344px;
      height: calc(100% - 20px);
      background: transparent;
      position: absolute;
      left: 0;
      top: 10px;
      bottom: 10px;
      pointer-events: auto;
    }
    .icon-takeUp-open {
      pointer-events: auto;
      width: 14px;
      height: 100%;
      float: left;
      text-align: center;
      display: table;
      margin-left: -1px;
      &-span {
        display: table-cell;
        vertical-align: middle;
        cursor: pointer;
      }
      &-img {
        display: inline-block;
      }
    }
    .map-content{
      float: left;
      width: 320px;
      height: 100%;
      box-shadow: 0 2px 10px 4px rgba(107, 108, 124, 0.2);
      border-radius: 0 6px 6px 0;
      background: #ffffff;
    }
  }
</style>
