<template>
  <div class="nav-menu">
    <div class="nav-menu-scroll">
      <el-menu
        :collapse-transition="false"
        :default-active="defaultActive"
        class="el-menu-vertical-demo"
        :collapse="isCollapse"
        background-color="#1a202a">
        <el-submenu v-for="(item, index) in navTree" :key="index" :index="item.index" v-if="item.children" popper-class="popperSubMenu" :hide-timeout="0">
          <template slot="title">
            <i :class="'iconfont ' + item.icon"></i>
            <span>{{item.name}}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item v-for="(child, i) in item.children" :key="i" :index="child.index" @click="clickEvent(child)">{{child.name}}</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item v-else :index="item.index" @click="clickEvent(item)">
          <i :class="'iconfont ' + item.icon"></i>
          <span slot="title">{{item.name}}</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="nav-footer">
      <span @click="handleFold" class="iconfont" :class="isCollapse ? 'icon-zhankai' : 'icon-shouqi'"></span>
    </div>
  </div>
</template>
<style lang="scss">
  .nav-menu .el-menu .el-menu-item.is-active {
    color: #fff !important;
  }
  .nav-menu {
    width: 100%;
    height: 100%;
    overflow: hidden;
    .nav-menu-scroll {
      width: calc(100% + 40px);
      height: calc(100% - 48px);
      overflow-y: scroll;
      overflow-x: hidden;
    }
    .el-menu {
      width: calc(100% - 20px);
      height: 100%;
      .el-submenu.is-active .el-submenu__title span {
        color: #ffffff !important;
      }
      .el-submenu.is-active .el-submenu__title i {
        color: #ffffff !important;
      }
      .el-menu-item.is-active {
        background-color: #0a121a !important;
      }
      .el-menu-item.is-active span {
        color: #ffffff !important;
      }
      .el-menu-item.is-active i {
        color: #ffffff !important;
      }
      .el-menu-item, .el-submenu__title {
        i {
          margin-right: 10px;
          font-size: 18px;
        }
        span {
          font-family: MicrosoftYaHei;
          font-size: 14px;
          color: rgba(255, 255, 255, 0.65);
        }
      }
    }
    .nav-footer {
      width: 100%;
      height: 48px;
      line-height: 48px;
      background-color: #131922;
      color: #fff;
      text-align: center;
      cursor: pointer;
    }
  }
</style>
<script>
  export default {
    props: {},
    data () {
      return {
        navTree: [], // 导航数据
        isCollapse: false, // 底部导航展开收缩按钮
        defaultActive: null, // 默认选中的导航
        enableRouterKeys: [] // 有权限的路由key 即index
      }
    },
    mounted () {
      // 给定默认选中的导航
      this.defaultActive = this.$route && this.$route.meta && this.$route.meta.index ? this.$route.meta.index : null
      // 根据用户id获取有权限的模块
      this.getAuthByUserId()
    },
    watch: {
      /**
       * 监听路由 判定该路由是否有权限
       * @param v
       * @param ov
       */
      '$route' (v, ov) {
        this.setRouterMetaEnable()
      }
    },
    methods: {
      /**
       * 根据用户id获取用户权限 相应的模块
       */
      getAuthByUserId () {
        let _params = {
          userid: config.userId
        }
        this.$api.getAuthByUserId(_params).then(res => {
          if (res.data.successed) {
            if (res.data.handleData && res.data.handleData.newData && res.data.handleData.newData.per && res.data.handleData.newData.per.length > 0) {
              this.navTree = res.data.handleData.newData.per
              res.data.handleData.oldData.forEach((el) => {
                this.enableRouterKeys.push(el['code'])
              })
              if (!this.$route.name && this.navTree && this.navTree[0] && this.navTree[0]['children'] && this.navTree[0]['children'][0] && this.navTree[0]['children'][0]['alias']) {
                this.$router.push({
                  name: this.navTree[0]['children'][0]['alias']
                })
                this.defaultActive = this.$route && this.$route.meta && this.$route.meta.index ? this.$route.meta.index : null
              }
            } else {
              this.$router.push({
                name: 'notFound'
              })
            }
            this.setRouterMetaEnable()
          } else {
            this.$message({
              message: '导航树查询失败！',
              type: 'error'
            })
          }
        }).catch(e => {
          this.$message({
            message: '导航树查询失败！',
            type: 'error'
          })
        })
      },
      /**
       * 判定该用户是否有此权限
       */
      setRouterMetaEnable () {
        if (this.$route.meta && this.$route.meta.index && this.enableRouterKeys && this.enableRouterKeys.length > 0) {
          if (this.enableRouterKeys.indexOf(this.$route.meta.index) !== -1) {
            this.$route.meta.enable = 1
          } else {
            this.$router.push({
              name: 'notFound'
            })
          }
        }
      },
      /**
       * 导航点击事件
       * @param item
       */
      clickEvent (item) {
        // 点击前清除之前查询的store
        this.$store.dispatch('actionQueryParams', null)
        this.$store.dispatch('actionResultParams', null)
        this.$router.push({
          name: item.alias
        })
      },
      /**
       * 导航底部收起点击按钮事件
       */
      handleFold () {
        this.isCollapse = !this.isCollapse
        this.$emit('handleFold', this.isCollapse)
      }
    },
    components: {}
  }
</script>
