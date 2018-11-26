<!--ETC客服网点气泡-->
<template>
  <div class="common-popover ETCServer-popover">
    <div class="common-popover-head">
      ETC客服网点信息
      <span class="close-icon iconfont icon-guanbi" @click="close"></span>
    </div>
    <div class="common-popover-content">
      <div class="tab-content">
        <div class="tab-content-odd">
          <span>ETC服务网点编号：</span>
          <span :title="properties.id">{{properties.id}}</span>
        </div>
        <div class="tab-content-even">
          <span>经度：</span>
          <span :title="properties.lng">{{properties.lng}}</span>
        </div>
        <div class="tab-content-odd">
          <span>ETC服务网点名称：</span>
          <span :title="properties.name">{{properties.name}}</span>
        </div>
        <div class="tab-content-even">
          <span>纬度：</span>
          <span :title="properties.lat">{{properties.lat}}</span>
        </div>
        <div class="tab-content-odd">
          <span>联系人姓名：</span>
          <span :title="properties.contact">{{properties.contact}}</span>
        </div>
        <div class="tab-content-even">
          <span>营业时间：</span>
          <span :title="properties.businessHours">{{properties.businessHours}}</span>
        </div>
        <div class="tab-content-odd">
          <span>联系电话：</span>
          <span :title="properties.tel">{{properties.tel}}</span>
        </div>
        <div class="tab-content-even">
          <span>起始日期：</span>
          <span :title="properties.startTime">{{properties.startTime}}</span>
        </div>
        <div class="tab-content-odd">
          <span>服务项目：</span>
          <span :title="properties.serviceItems | rangeConversion(serviceProject)">{{properties.serviceItems | rangeConversion(serviceProject)}}</span>
        </div>
        <div class="tab-content-even">
          <span>终止日期：</span>
          <span :title="properties.endTime">{{properties.endTime}}</span>
        </div>
        <div class="tab-content-odd">
          <span>地址：</span>
          <span :title="properties.address">{{properties.address}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
  .ETCServer-popover {
    height: 240px;
  }
</style>
<script>
  import PopoverAction from '../../popover/PopoverAction'
  export default {
    mixins: [PopoverAction],
    props: {},
    data () {
      return {
        serviceProject: config.range.serviceProject, // 服务项目select
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
