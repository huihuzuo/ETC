<template>
  <div class="layout-right-wrap">
    <div class="layout-wrap-right-title">
      <div class="layout-wrap-right-title-right">
        <span class="title-date">{{currentDate}}</span>
        <span class="title-week">星期{{currentWeek}}</span>
        <img class="title-user-head-image" src="../../../../static/images/user_head_image.png"/>
        <el-dropdown @command="handleCommand">
            <span class="title-user-info">
            {{username}}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="退出">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div class="layout-wrap-right-content">
      <map-temp v-show="isShowMap"></map-temp>
      <router-view name="content"></router-view>
    </div>
  </div>
</template>

<script>
  import mapTemp from './../../../components/map/index'
  import { currentDate, currentWeek } from '../../../service/https'
  export default {
    name: 'right',
    data () {
      return {
        currentDate: currentDate('-'), // 当前日期
        currentWeek: currentWeek(), // 当前星期
        username: null, // 用户名
        isShowMap: false
      }
    },
    mounted () {
      if (this.$route.meta && this.$route.meta.isShowMap) {
        this.isShowMap = this.$route.meta.isShowMap
      } else {
        this.isShowMap = false
      }
    },
    watch: {
      '$route' (v, ov) {
        if (this.$route.meta && this.$route.meta.isShowMap) {
          this.isShowMap = this.$route.meta.isShowMap
        } else {
          this.isShowMap = false
        }
      }
    },
    methods: {
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
      mapTemp
    }
  }
</script>

<style scoped>
  .layout-right-wrap{
    width: 100%;
    height: 100%;
  }
</style>
