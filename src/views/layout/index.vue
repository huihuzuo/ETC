<template>
  <div class="layout-wrap">
    <div class="layout-wrap-left">
      <div class="layout-wrap-left-title img-title" v-if="isCollapse">
        <span>
           <img src="../../../static/images/logo.png"/>
        </span>
      </div>
      <div class="layout-wrap-left-title text-title" v-if="!isCollapse">ETC可视化系统</div>
      <div class="layout-wrap-left-content">
        <navTemp @handleFold="handleFold"></navTemp>
      </div>
    </div>
    <div class="layout-wrap-right">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
  import navTemp from './../nav/nav'
  export default{
    props: {},
    data () {
      return {
        navStatusTitle: '订单管理',
        currNav: 'order',
        isCollapse: false
      }
    },
    mounted () {
      // 获取登陆用户信息
      this.getUserInfo()
    },
    watch: {},
    methods: {
      /**
       * 导航下方按钮展开收起操作
       * @param isCollapse
       */
      handleFold (isCollapse) {
        this.isCollapse = isCollapse
        if (isCollapse) {
          $('.layout-wrap-left').width(64)
          $('.layout-wrap-right').width(document.body.clientWidth - 64)
        } else {
          $('.layout-wrap-left').width(208)
          $('.layout-wrap-right').width(document.body.clientWidth - 208)
        }
      },
      /**
       * 获取登陆用户信息， 单点登陆集成后再做相应迁移
       */
      getUserInfo () {
        let _params = {
          username: '',
          password: ''
        }
        this.$api.getUserInfo(_params).then(res => {
          if (res.status === 200) {
            this.username = res.data.data.username
          }
        }).catch(e => {
        }).finally(() => {
        })
      },
      /**
       * 下拉菜单下的如退出按钮点击事件
       * @param command
       */
      handleCommand (command) {
        switch (command) {
          case '退出':
            this.$message('这是 ' + command + ' 按钮')
            break
        }
      }
    },
    components: {
      navTemp
    }
  }
</script>
<style lang="scss">
  .layout-wrap{
    width: 100%;
    height: 100%;
    .layout-wrap-left{
      width: 208px;
      height: 100%;
      float: left;
      .layout-wrap-left-title{
        height: 56px;
        width: 100%;
        background-color: #1c8ffa;
        text-align: center;
        font-family: MicrosoftYaHei-Bold;
        font-size: 18px;
        color: #ffffff;
        font-weight: bold;
      }
      .text-title {
        line-height: 56px;
      }
      .img-title {
        display: table;
        span {
          display: table-cell;
          vertical-align: middle;
          img {
            display: inline-block;
          }
        }
      }

      .layout-wrap-left-content{
        width: 100%;
        height: calc(100% - 56px);
        background: #1a202a;
      }
    }
    .layout-wrap-right{
      width: calc(100% - 208px);
      height: 100%;
      float: left;
      position: relative;
      .layout-wrap-right-title{
        height: 56px;
        width: 100%;
        text-align: right;
        line-height: 56px;
        box-shadow: 0 4px 10px 0 rgba(107, 108, 124, 0.08);
        &-right {
          width: auto;
          position: absolute;
          right: 15px;
        }
        .title-date, .title-week, .title-user-head-image, .title-user-info {
          float: left;
          font-family: MicrosoftYaHei;
          font-size: 14px;
          color: #4d4d4d;
        }
        .title-date {
          margin-right: 7px;
        }
        .title-week {
          margin-right: 20px;
        }
        .title-user-head-image {
          margin-top: 12px;
          margin-right: 15px;
        }
        .title-user-info {
          cursor: pointer;
          &:hover {
            color: #1c8ffa;
          }
        }
      }
      .layout-wrap-right-content{
        width: 100%;
        height: calc(100% - 56px);
        position: relative;
      }
    }
  }
</style>
