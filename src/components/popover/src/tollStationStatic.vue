<!--收费站气泡-->
<template>
  <div class="toll-station-static-popover">
      {{properties.name}}
  </div>
</template>
<style lang="scss">
  .hmap-js-popup{
    width: 180px;
    text-align: center;
  }
  .toll-station-static-popover {
    padding: 5px 10px;
    width: 180px !important;
    font-size:16px;
    text-align: center;
    background-color: #ffffff;
  }
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
