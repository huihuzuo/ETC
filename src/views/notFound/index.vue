<!--无权限效果样式-->
<template>
  <div class="not-found">
    <span>
        <img src="../../../static/images/alertNotFound.png" alt="您暂无此权限！">
        <div class="not_found_text">您暂无此权限!</div>
    </span>
  </div>
</template>
<style lang="scss">

  .not-found {
    width: 100%;
    height: 100%;
    text-align: center;
    display: table;
    background-color:#000000;
    opacity: 0.65;
    span {
      display: table-cell;
      vertical-align: middle;
      img {
        display: inline-block;
      }
      .not_found_text {
        height: 18px;
        line-height: 18px;
        font-family: PingFang-SC-Regular;
        font-size: 18px;
        color: #b8b8b8;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
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
