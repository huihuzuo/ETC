<!--收费站气泡-->
<template>
  <div class="common-popover">
    <div class="common-popover-head">
      收费站信息
      <span class="close-icon iconfont icon-guanbi" @click="close"></span>
    </div>
    <div class="common-popover-content">
      <div class="tab-content">
        <div class="tab-content-odd">
          <span>收费站编号：</span>
          <span :title="properties.id">{{properties.id}}</span>
        </div>
        <div class="tab-content-odd">
          <span>收费站名称：</span>
          <span :title="properties.name">{{properties.name}}</span>
        </div>
        <div class="tab-content-odd">
          <span>收费站类型：</span>
          <span :title="properties.type | rangeConversion(tollStationType)">{{properties.type | rangeConversion(tollStationType)}}</span>
        </div>
        <div class="tab-content-odd">
          <span>收费站广场数量：</span>
          <span :title="properties.address">{{properties.tollPlazaCount}}</span>
        </div>
        <div class="tab-content-odd">
          <span>该站在邻省编号：</span>
          <span :title="properties.address">{{properties.neighborId}}</span>
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
        tollStationType: config.range.tollStationType, // 收费站类型select
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
