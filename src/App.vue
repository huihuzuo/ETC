<template>
  <div class="layout-wrap">
    <router-view></router-view>
  </div>
</template>

<script type="text/babel">
  import navTemp from './views/nav/nav'
  export default {
    name: 'app',
    data () {
      return {
      }
    },
    mounted () {
    },
    methods: {
    },
    components: {
      navTemp
    }
  }
</script>

<style lang="scss">
  html,body{
    height: 100%;
    width: 100%;
  }
  body,div,span,ul,li{
    margin: 0;
    padding: 0;
    list-style-type:none;
  }
  textarea{
    resize: none;
  }
  .list-wrap{
    width: 100%;
    height: 100%;
    .list-query-park{
      width: 100%;
      height: 120px;
      font-size: 12px;
      color: #252525;
      .list-query-item{
        width: 252px;
        margin-left: 34px;
        display: inline-block;
        margin-top: 20px;
        .el-date-editor.el-input, .el-date-editor.el-input__inner{
          width: 150px !important;
        }
        .list-query-item-operation{
          width: 150px;
          display: inline-block;
        }
        .list-query-item-operation-btn{
          width: 60px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          color: #FFF;
          background-color: #1b9de8;
          display: inline-block;
          cursor: pointer;
          border-radius: 4px;
          border: 1px #1b9de8 solid;
          &:hover{
            color: #1b9de8;
            background-color: #FFF;
            border: 1px #1b9de8 solid;
          }
        }
      }
    }
    .list-query{
      width: 100%;
      height: 120px;
      font-size: 12px;
      color: #252525;
      .list-query-item{
        width: 252px;
        margin-left: 13px;
        display: inline-block;
        margin-top: 20px;
        .el-date-editor.el-input{
          width: 150px !important;
        }
        .list-query-item-operation{
          width: 150px;
          display: inline-block;
        }
        .list-query-item-operation-btn{
          width: 60px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          color: #FFF;
          background-color: #1b9de8;
          display: inline-block;
          cursor: pointer;
          border-radius: 4px;
          border: 1px #1b9de8 solid;
          &:hover{
            color: #1b9de8;
            background-color: #FFF;
            border: 1px #1b9de8 solid;
          }
        }
      }
    }
    .list-table{
      width: 100%;
      height: calc(100% - 120px - 40px);
      .list-operation{
        padding: 0 10px;
        cursor: pointer;
        color: #1b9de8;
        display: inline-block;
      }
    }
    .list-pager{
      width: 100%;
      height: 40px;
      text-align: right;
    }
  }
</style>
