<!--收费广场气泡-->
<template>
  <div class="common-popover tollStationSquare-popover">
    <div class="tollStationSquare-popover-head" v-if="isShowLaneInfo === false">
      <div class="tollStationSquare-popover-head-left">
        <div class="tab" v-for="tab in tabs" :key="tab.value" :class="activeValue === tab.value ? 'tab-active' : ''" @click="handleTabClick(tab)">
          <span>{{tab.label}}</span>
        </div>
        <span class="iconfont"></span>
      </div>
      <span class="close-icon iconfont icon-guanbi" @click="close"></span>
    </div>
    <div class="tollStationSquare-popover-head lane-info-head" v-if="isShowLaneInfo === true">
      <span class="return-icon iconfont icon-fanhui" @click="onReturn"></span>
      车道信息
      <span class="close-icon iconfont icon-guanbi" @click="close"></span>
    </div>
    <div class="common-popover-content tollStationSquare-popover-content">
      <div class="tab-content" v-if="activeValue === '基本信息'">
        <div class="tab-content-odd">
          <span>收费站广场编号：</span>
          <span :title="properties.id">{{properties.id}}</span>
        </div>
        <div class="tab-content-even">
          <span>收费站编号：</span>
          <span :title="properties.id.toString().substring(0, 14)">{{properties.id.toString().substring(0, 14)}}</span>
        </div>
        <div class="tab-content-odd">
          <span>收费站广场名称：</span>
          <span :title="properties.name">{{properties.name}}</span>
        </div>
        <div class="tab-content-even">
          <span>收费广场类型：</span>
          <span :title="properties.id.toString().substring(14, 15) | rangeConversion(tollStationPassageway)">{{properties.id.toString().substring(14, 15) | rangeConversion(tollStationPassageway)}}</span>
        </div>
        <div class="tab-content-odd">
          <span>广场类型：</span>
          <span :title="properties.plazaType | rangeConversion(plazaType)">{{properties.plazaType | rangeConversion(plazaType)}}</span>
        </div>
        <div class="tab-content-even">
          <span>ETC车道：</span>
          <span :title="properties.etclaneCount">{{properties.etclaneCount}}</span>
        </div>
        <div class="tab-content-odd">
          <span>桩号：</span>
          <span :title="properties.stakeNum">{{properties.stakeNum}}</span>
        </div>
        <div class="tab-content-even">
          <span>MTC车道：</span>
          <span :title="properties.mtclaneCount">{{properties.mtclaneCount}}</span>
        </div>
        <div class="tab-content-odd">
          <span>收费站名称：</span>
          <span :title="properties.name">{{properties.name}}</span>
        </div>
        <div class="tab-content-even">
          <span>混合车道：</span>
          <span :title="properties.mixLaneCount">{{properties.mixLaneCount}}</span>
        </div>
      </div>
      <div class="tab-content" v-if="activeValue === '车道示意图'">
        <toll-station-lane-sketch-map :data="tollLaneData"  @handleLaneClick="handleLaneClick"></toll-station-lane-sketch-map>
      </div>
      <div class="tab-content"  v-if="activeValue === '车道信息'">
        <div class="tab-content-odd">
          <span>收费车道编号：</span>
          <span :title="laneInfo.num">{{laneInfo.num}}</span>
        </div>
        <div class="tab-content-even">
          <span>终止日期：</span>
          <span :title="laneInfo.endTime">{{laneInfo.endTime}}</span>
        </div>
        <div class="tab-content-odd">
          <span>车道类型：</span>
          <span :style="{backgroundColor: color}" class="lane-type" :title="laneInfo.type | rangeConversion(tollLaneType)">{{laneInfo.type | rangeConversion(tollLaneType)}}</span>
        </div>
        <div class="tab-content-even">
          <span>使用状态：</span>
          <span :style="{color: laneInfo.status === 2 ? '#3bc568' : '#f25555'}" :title="laneInfo.status | rangeConversion(tollLaneStatus)">{{laneInfo.status | rangeConversion(tollLaneStatus)}}</span>
        </div>
        <div class="tab-content-odd">
          <span>是否绿通：</span>
          <span :style="{color: laneInfo.greenTraffic === 1 ? '#3bc568' : '#f25555'}" :title="laneInfo.greenTraffic | rangeConversion(greenTraffic)">{{laneInfo.greenTraffic | rangeConversion(greenTraffic)}}</span>
        </div>
        <div class="tab-content-odd">
          <span>潮汐车道反向时间：</span>
          <span :title="laneInfo.tidalTime | formatTidalTime">{{laneInfo.tidalTime | formatTidalTime}}</span>
        </div>
        <div class="tab-content-odd">
          <span>起始日期：</span>
          <span :title="laneInfo.startTime">{{laneInfo.startTime}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
  .tollStationSquare-popover {
    height: 224px;
    background-color: #ffffff;
    .lane-info-head {
      text-align: center;
      font-family: MicrosoftYaHei;
      font-size: 14px;
      color: #4e5258;
      padding: 0 0 0 20px;
      .return-icon {
        float: left;
        cursor: pointer;
        font-size: 14px;
        &:hover {
          color: #1880ee;
        }
      }
    }
    &-head {
      height: 34px;
      line-height: 34px;
      border: 1px solid #f2f2f3;
      &-left {
        width: calc(100% - 40px);
        float: left;
        .tab {
          float: left;
          margin: 0 18px;
          font-family: MicrosoftYaHei;
          font-size: 14px;
          color: #4e5258;
          cursor: pointer;
          &:hover {
            color: #1c8ffa;
            border-bottom: 2px solid #1c8ffa;
          }
        }
        .tab-active {
          color: #1c8ffa;
          border-bottom: 2px solid #1c8ffa;
        }
      }
      .close-icon {
        float: right;
        cursor: pointer;
        font-size: 14px;
        margin-right: 20px;
        &:hover {
          color: #1880ee;
        }
      }
    }
    &-content {
      .tab-content {
        .lane-type {
          width: 36px;
          height: 16px;
          line-height: 16px;
          text-align: center;
          display: inline-block;
          background-color: #3bc568;
          margin-top: 10px;
          color: #ffffff !important;
        }
      }
    }
  }
</style>
<script>
  import PopoverAction from '../../popover/PopoverAction'
  import tollStationLaneSketchMap from '../../../components/common/tollStationLaneSketchMap'
  import filters from '../../../filters/filters'
  export default {
    mixins: [PopoverAction],
    props: {},
    data () {
      return {
        tollStationPassageway: config.range.tollStationPassageway, // 收费站出入口属性（收费站广场类型）select
        plazaType: config.range.plazaType, // 广场类型select
        greenTraffic: config.range.isGreen, // 是否绿通select
        tollLaneType: config.range.tollLaneType, // 车道类型select
        tollLaneStatus: config.range.tollLaneStatus, // 收费站车道状态select
        activeValue: null, // 当前tab值
        tabs: [
          {
            label: '基本信息',
            value: '基本信息'
          },
          {
            label: '车道示意图',
            value: '车道示意图'
          }
        ], // tabs数值
        properties: {}, // 气泡里的属性值
        tollLaneData: [], // 车道数据
        isShowLaneInfo: false, // 是否显示车道信息还是基本信息
        laneInfo: {}, // 车道信息
        color: '' // 车道类型对应的color值
      }
    },
    mounted () {
      // 默认点击第一个tab值
      this.handleTabClick(this.tabs[0])
      // 监听到气泡属性数据后开始查询对应的收费站车道数据列表
      if (this.properties && this.properties['id']) {
        this.queryTollStationLaneResultList()
      }
    },
    watch: {
      /**
       * 监听到气泡属性数据后开始查询对应的收费站车道数据列表
       * @param v
       * @param ov
       */
      properties (v, ov) {
        if (this.properties && this.properties['id']) {
          this.queryTollStationLaneResultList()
        }
      },
      /**
       * 监听车道信息值 监听到后处理对应的车道类型color
       * @param v
       * @param ov
       */
      laneInfo (v, ov) {
        this.color = filters.formatTollLaneTypeColor(this.laneInfo['type'], this.tollLaneType)
      }
    },
    methods: {
      /**
       * tab 选项点击事件
       * @param tab
       */
      handleTabClick (tab) {
        this.activeValue = tab.value
      },
      /**
       * 收费站车道中的每一个item点击事件
       * @param item
       */
      handleLaneClick (item) {
        this.laneInfo = item
        this.isShowLaneInfo = true
        this.activeValue = '车道信息'
      },
      /**
       * 在车道信息上的返回信息
       */
      onReturn () {
        this.isShowLaneInfo = false
        this.activeValue = '车道示意图'
      },
      /**
       * 查询收费站车道结果列表
       */
      queryTollStationLaneResultList () {
        this.$api.queryTollStationLaneListByPlazaid(this.properties.id, '1,2').then(res => {
          if (res.status === 200) {
            this.tollLaneData = res.data.data
          } else {
            this.$message({
              message: '查询失败',
              type: 'error'
            })
          }
        }).catch(e => {
          this.$message({
            message: '查询失败',
            type: 'error'
          })
        }).finally(() => {
        })
      }
    },
    components: {
      tollStationLaneSketchMap
    }
  }
</script>
