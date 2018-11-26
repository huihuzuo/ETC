<!--无数据统一效果样式-->
<template>
  <div class="no-data">
    <span>
        <img src="../../../static/images/img_no_data.png"/>
        <div class="no_data_text">{{hintText}}</div>
    </span>
  </div>
</template>
<style lang="scss">
  .no-data {
    width: 100%;
    height: 100%;
    text-align: center;
    display: table;
    span {
      display: table-cell;
      vertical-align: middle;
      img {
        display: inline-block;
      }
      .no_data_text {
        height: 40px;
        line-height: 40px;
        font-family: SimSun;
        font-size: 14px;
        color: #409EFF;
      }
    }
  }
</style>
<script>
  export default {
    props: {
      // 显示的提示文本
      hintText: {
        type: String,
        default: function () {
          return '暂无数据'
        }
      }
    },
    data () {
      return {}
    },
    mounted () {
    },
    watch: {},
    methods: {},
    components: {}
  }
</script>
