<template>
  <div class="list-wrap">
    <div class="modal">
      <div class="list-wrap-form">
        <el-form :inline="true" :model="form" class="demo-form-inline form-inline">
          <div class="form-inline-left">
            <el-form-item label="用户名">
              <el-input v-model="form.userName" placeholder="请输入用户名" size="small" clearable></el-input>
            </el-form-item>
            <el-form-item label="登录名">
              <el-input v-model="form.loginName" placeholder="请输入登录名" size="small" clearable></el-input>
            </el-form-item>
            <el-form-item label="昵称">
              <el-input v-model="form.nickName" placeholder="请输入昵称" size="small" clearable></el-input>
            </el-form-item>
            <el-form-item label="手机">
              <el-input v-model="form.mobile" placeholder="请输入手机" size="small" clearable></el-input>
            </el-form-item>
            <el-form-item>
              <el-button class="no-icon-btn" type="primary" size="small" @click="onQuery">查 询</el-button>
            </el-form-item>
          </div>
        </el-form>
      </div>
      <div class="list-wrap-content">
        <div class="table-part">
          <el-table
            class="common-table"
            ref="singleTable"
            :data="tableData"
            highlight-current-row
            :height="height"
            style="width: 100%">
            <el-table-column
              type="index"
              label="序号"
              width="50"
              align="center">
            </el-table-column>
            <el-table-column label="操作" width="155">
              <template slot-scope="scope">
                <el-popover
                  v-model="scope.row.modulePermissionVisible"
                  placement="right"
                  width="150"
                  trigger="click">
                  <module-permissions :treeData="treeData" :checkedKeys="defaultCheckedKeys" @getCheckedNodes="getCheckedModules" @onCancel="modulePermissionsClose"></module-permissions>
                  <el-button slot="reference" type="text" @click="handleDistribution(scope.$index, scope.row)">角色分配</el-button>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column
              property="loginName"
              label="登录名"
              align="center">
            </el-table-column>
            <el-table-column
              property="userName"
              label="用户名"
              align="center">
            </el-table-column>
            <el-table-column
              property="status"
              label="状态"
              align="center">
            </el-table-column>
            <el-table-column
              property="nickName"
              label="昵称"
              align="center">
            </el-table-column>
            <el-table-column
              property="mobile"
              label="手机"
              align="center">
            </el-table-column>
            <el-table-column
              property="unitName"
              label="单位"
              align="center">
            </el-table-column>
          </el-table>
        </div>
        <div class="pager-part">
          <el-pagination
            class="common-pager"
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="pageSizes"
            :page-size="limit"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
</style>
<script>
import clonedeep from 'lodash.clonedeep'
import modulePermissions from '../../components/common/modulePermissions'
export default {
  props: {},
  data () {
    return {
      form: {
        userName: null, // 用户名
        nickName: null, // 昵称
        loginName: null, // 登录名
        mobile: null // 手机
      },
      tableData: [], // table数据
      total: 0, // 总数
      limit: 10, // 每页显示数据
      pageSizes: [], // 分页每页显示数组
      currentPage: 1, // 当前显示页
      height: 400, // table 高度
      treeData: [], // 模块权限数据
      defaultCheckedKeys: [], // 默认选中的权限
      currentIndex: null, // 当前选择模块分配的index值
      loading: false // loading
    }
  },
  mounted () {
    this.$nextTick(() => {
      $('.list-wrap-content').height($('.modal').height() - $('.list-wrap-form').height() - 50)
      // 自动设置表格高度
      this.height = document.querySelector('.table-part').offsetHeight
      this.limit = parseInt((this.height - 50) / 40)
      this.pageSizes = [clonedeep(this.limit), clonedeep(this.limit) * 2, clonedeep(this.limit) * 3, clonedeep(this.limit) * 4]
      window.onresize = () => {
        this.height = document.querySelector('.table-part').offsetHeight
        this.limit = parseInt((this.height - 50) / 40)
        this.pageSizes = [clonedeep(this.limit), clonedeep(this.limit) * 2, clonedeep(this.limit) * 3, clonedeep(this.limit) * 4]
      }
      // 获取用户列表
      this.getUserList()
    })
  },
  watch: {},
  methods: {
    /**
     * 查询按钮事件
     */
    onQuery () {
      this.currentPage = 1
      this.getUserList()
    },
    /**
     * 获取用户列表
     */
    getUserList () {
      this.loading = this.$loading({
        lock: true,
        text: '加载中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.8)'
      })
      let _params = {
        page: this.currentPage,
        limit: this.limit,
        mobile: this.form.mobile ? this.form.mobile : null,
        userName: this.form.userName ? this.form.userName : null,
        loginName: this.form.loginName ? this.form.loginName : null,
        nickName: this.form.nickName ? this.form.nickName : null
      }
      this.$api.getUserList(_params).then(res => {
        if (res.data.successed) {
          if (res.data.data.entitys) {
            this.tableData = clonedeep(res.data.data.entitys)
            this.total = res.data.data.totalCount
          } else {
            this.tableData = []
            this.total = 0
          }
        } else {
          this.tableData = []
          this.$message({
            message: '查询失败',
            type: 'error'
          })
        }
      }).catch(e => {
        this.$message({
          message: '查询失败',
          type: 'error'
        })
      }).finally(() => {
        this.loading.close()
      })
    },
    /**
     * 分页处 每页数据显示不同有所改变事件
     * @param size
     */
    handleSizeChange (size) {
      this.limit = size
      this.getUserList()
    },
    /**
     * 分页页码点击事件
     * @param current
     */
    handleCurrentChange (current) {
      this.currentPage = current
      this.getUserList()
    },
    /**
     * 角色分配按钮事件
     * @param index
     * @param row
     */
    handleDistribution (index, row) {
      this.currentIndex = index
      this.$set(this.tableData[index], 'modulePermissionVisible', true)
      this.getRoleModulePermissions(row)
    },
    /**
     * 根据用户获取角色权限
     */
    getRoleModulePermissions (row) {
      let _params = {
        userid: row.id
      }
      this.$api.getRoleModulesByUser(_params).then(res => {
        if (res.data.successed) {
          if (res.data && res.data.data && res.data.data.length > 0) {
            this.modulePermissions = res.data.data
            this.treeData = res.data.data
            this.defaultCheckedKeys = this.hasEnable(res.data.data)
          } else {
            this.treeData = []
          }
        } else {
          this.treeData = []
          this.$message({
            message: '查询失败',
            type: 'error'
          })
        }
      }).catch(e => {
        this.$message({
          message: '查询失败',
          type: 'error'
        })
      })
    },
    /**
     * 获取默认匹配数据tree里应当选中的数据
     * @param data
     * @returns {Array}
     */
    hasEnable (data) {
      let hasEnableArr = []
      data.forEach((el) => {
        if (el.enable === 1) {
          hasEnableArr.push(el['id'])
        }
      })
      return hasEnableArr
    },
    /**
     * 模块分配popover中确认按钮事件
     * @param modules
     * @param keys
     */
    getCheckedModules (modules, keys) {
      this.modulePermissionsClose()
      this.setUserModulesById(keys)
    },
    /**
     * 为用户分配角色权限
     * @param keys
     */
    setUserModulesById (keys) {
      let _params = {
        userid: this.tableData[this.currentIndex]['id'],
        roleids: keys && keys.length > 0 ? keys.join(',') : null
      }
      this.$api.setUserModulesById(_params).then(res => {
        if (res.data.successed) {
          this.$message({
            message: '为用户分配角色成功',
            type: 'success'
          })
        } else {
          this.$message({
            message: '为用户分配角色失败',
            type: 'error'
          })
        }
      }).catch(e => {
        this.$message({
          message: '为用户分配角色失败',
          type: 'error'
        })
      })
    },
    /**
     * 模块分配中popover中取消按钮事件
     */
    modulePermissionsClose () {
      this.$set(this.tableData[this.currentIndex], 'modulePermissionVisible', false)
    }
  },
  components: {
    modulePermissions
  },
  destroyed () {
    window.onresize = null
  }
}
</script>
