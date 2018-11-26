<!--停车场气泡-->
<template>
  <div class="common-popover">
    <div class="common-popover-head">
      停车场信息
      <span class="close-icon iconfont icon-guanbi" @click="close"></span>
    </div>
    <div class="common-popover-content">
      <div class="tab-content">
        <div class="tab-content-odd">
          <span>停车场名称：</span>
          <span :title="properties.name">{{properties.name}}</span>
        </div>
        <div class="tab-content-even">
          <span>停车场经度：</span>
          <span :title="properties.lng">{{properties.lng}}</span>
        </div>
        <div class="tab-content-odd">
          <span>停车场编号：</span>
          <span :title="properties.id">{{properties.id}}</span>
        </div>
        <div class="tab-content-even">
          <span>停车场纬度：</span>
          <span :title="properties.lat">{{properties.lat}}</span>
        </div>
        <div class="tab-content-odd">
          <span>所属运营方编号：</span>
          <span :title="properties.parkOperatorId">{{properties.parkOperatorId}}</span>
        </div>
        <div class="tab-content-even">
          <span>清分结算机构编码：</span>
          <span :title="properties.clearingId">{{properties.clearingId}}</span>
        </div>
        <div class="tab-content-odd">
          <span>停车场地址：</span>
          <span :title="properties.address">{{properties.address}}</span>
        </div>
        <div class="tab-content-even">
          <span>起始日期：</span>
          <span :title="properties.startTime">{{properties.startTime}}</span>
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
