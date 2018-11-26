<!--服务区气泡-->
<template>
  <div class="common-popover">
    <div class="common-popover-head">
      服务区信息
      <span class="close-icon iconfont icon-guanbi" @click="close"></span>
    </div>
    <div class="common-popover-content">
      <div class="tab-content">
        <div class="tab-content-odd">
          <span>服务区名称：</span>
          <span :title="properties.name">{{properties.name}}</span>
        </div>
        <div class="tab-content-even">
          <span>服务区经度：</span>
          <span :title="properties.lng">{{properties.lng}}</span>
        </div>
        <div class="tab-content-odd">
          <span>服务区编号：</span>
          <span :title="properties.id">{{properties.id}}</span>
        </div>
        <div class="tab-content-even">
          <span>服务区纬度：</span>
          <span :title="properties.lat">{{properties.lat}}</span>
        </div>
        <div class="tab-content-odd">
          <span>加油站编号：</span>
          <span :title="properties.gasStationId">{{properties.gasStationId}}</span>
        </div>
        <div class="tab-content-even">
          <span>清分结算机构编码：</span>
          <span :title="properties.clearingId">{{properties.clearingId}}</span>
        </div>
        <div class="tab-content-odd">
          <span>所属业主编号：</span>
          <span :title="properties.sectionOwnerId">{{properties.sectionOwnerId}}</span>
        </div>
        <div class="tab-content-even">
          <span>起始日期：</span>
          <span :title="properties.startTime">{{properties.startTime}}</span>
        </div>
        <div class="tab-content-odd">
          <span>服务区桩号：</span>
          <span :title="properties.stakeNum">{{properties.stakeNum}}</span>
        </div>
        <div class="tab-content-even">
          <span>终止日期：</span>
          <span :title="properties.endTime">{{properties.endTime}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
</style>
<script>
  import PopoverAction from '../../popover/PopoverAction'
  export default {
    mixins: [PopoverAction],
    props: {},
    data () {
      return {
        properties: {} // 气泡里的属性值
      }
    },
    mounted () {
    },
    watch: {
    },
    methods: {
    },
    components: {
    }
  }
</script>
