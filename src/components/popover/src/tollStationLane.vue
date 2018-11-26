<!--收费车道气泡-->
<template>
  <div class="common-popover">
    <div class="common-popover-head">
      收费车道信息
      <span class="close-icon iconfont icon-guanbi" @click="close"></span>
    </div>
    <div class="common-popover-content">
      <div class="tab-content">
        <div class="tab-content-odd">
          <span>收费车道编号：</span>
          <span :title="properties.num">{{properties.num}}</span>
        </div>
        <div class="tab-content-even">
          <span>终止日期：</span>
          <span :title="properties.endTime">{{properties.endTime}}</span>
        </div>
        <div class="tab-content-odd">
          <span>车道类型：</span>
          <span :style="{backgroundColor: color}" class="lane-type" :title="properties.type | rangeConversion(tollLaneType)">{{properties.type | rangeConversion(tollLaneType)}}</span>
        </div>
        <div class="tab-content-even">
          <span>使用状态：</span>
          <span :style="{color: properties.status === 2 ? '#3bc568' : '#f25555'}" :title="properties.status | rangeConversion(tollLaneStatus)">{{properties.status | rangeConversion(tollLaneStatus)}}</span>
        </div>
        <div class="tab-content-odd">
          <span>是否绿通：</span>
          <span :style="{color: properties.greenTraffic === 1 ? '#3bc568' : '#f25555'}" :title="properties.greenTraffic | rangeConversion(greenTraffic)">{{properties.greenTraffic | rangeConversion(greenTraffic)}}</span>
        </div>
        <div class="tab-content-odd">
          <span>潮汐车道反向时间：</span>
          <span :title="properties.tidalTime | formatTidalTime">{{properties.tidalTime | formatTidalTime}}</span>
        </div>
        <div class="tab-content-odd">
          <span>起始日期：</span>
          <span :title="properties.startTime">{{properties.startTime}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
</style>
<script>
  import filters from '../../../filters/filters'
  import PopoverAction from '../../popover/PopoverAction'
  export default {
    mixins: [PopoverAction],
    props: {},
    data () {
      return {
        greenTraffic: config.range.isGreen, // 是否绿通select
        tollLaneType: config.range.tollLaneType, // 车道类型select
        tollLaneStatus: config.range.tollLaneStatus, // 收费站车道状态select
        properties: {}, // 气泡里的属性值
        color: '' // 车道类型对应的color值
      }
    },
    mounted () {
    },
    watch: {
      /**
       * 监听车道信息值 监听到后处理对应的车道类型color
       * @param v
       * @param ov
       */
      properties (v, ov) {
        this.color = filters.formatTollLaneTypeColor(this.properties['type'], this.tollLaneType)
      }
    },
    methods: {
    },
    components: {
    }
  }
</script>
