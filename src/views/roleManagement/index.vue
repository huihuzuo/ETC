<template>
  <div class="role-management">
    <div class="modal">
      <div class="role-management-form">
        <el-form :inline="true" :model="form" class="demo-form-inline form-inline">
          <div class="form-inline-left">
            <el-form-item label="角色名称">
              <el-input v-model="form.name" placeholder="请输入角色名称" size="small" clearable></el-input>
            </el-form-item>
            <el-form-item>
              <el-button class="no-icon-btn" type="primary" size="small" @click="getRoleList">查 询</el-button>
            </el-form-item>
          </div>
          <div class="vertical-line"></div>
          <div class="form-inline-right">
            <el-form-item>
              <el-button class="yes-icon-btn" type="primary" size="small" @click="addRole"><i class="iconfont icon-add"></i>添加</el-button>
            </el-form-item>
          </div>
        </el-form>
      </div>
      <div class="role-management-content">
        <div class="table-part">
          <el-table
            :row-class-name="tableRowClassName"
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
                <el-button type="text" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button type="text" @click="handleDel(scope.$index, scope.row)">删除</el-button>
                <el-popover
                  v-model="scope.row.modulePermissionVisible"
                  placement="right"
                  width="150"
                  trigger="click">
                  <module-permissions :treeData="treeData" :checkedKeys="defaultCheckedKeys" @getCheckedNodes="getCheckedModules" @onCancel="modulePermissionsClose"></module-permissions>
                  <el-button slot="reference" type="text" @click="handleDistribution(scope.$index, scope.row)">模块分配</el-button>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column
              property="name"
              label="角色名称"
              align="center">
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              property="content"
              label="角色说明"
              align="center">
            </el-table-column>
          </el-table>
          <role-form v-if="panelState && panelState.layerName === 'role' && panelState.state"></role-form>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
  .role-management {
    padding: 15px;
    background-color: #f5f8f6;
    width: 100%;
    height: 100%;
    &-form {
      width: 100%;
      height: 70px;
      padding-top: 19px;
    }
    &-content {
      width: 100%;
      height: calc(100% - 70px);
      padding: 15px;
      .table-part {
        width: 100%;
        height: 100%;
        position: relative;
      }
    }
  }
</style>
<script>
import {mapState} from 'vuex'
import clonedeep from 'lodash.clonedeep'
import roleForm from './children/roleForm'
import modulePermissions from '../../components/common/modulePermissions'
export default {
  props: {},
  data () {
    return {
      form: {
        name: null // 角色名称
      },
      tableData: [], // table显示数据
      height: 400, // table高度 用于若有滚动条可滚动显示处理
      treeData: [], // 模块分配数据
      defaultCheckedKeys: [], // 默认选中的模块分配数据id的数组
      modulePermissions: {}, // 根据角色id获取到的模块权限
      currentIndex: null, // 当前选择模块分配的index值
      id: null, // 根据此id值高亮数据
      loading: null // loading
    }
  },
  computed: {
    ...mapState({
      panelState: state => state.panel.panelState // 监听面板状态 用于显示编辑面板或添加角色面板
    })
  },
  mounted () {
    this.$nextTick(() => {
      // 自动设置表格高度
      this.height = document.querySelector('.table-part').offsetHeight
      window.onresize = () => {
        this.height = document.querySelector('.table-part').offsetHeight
      }
      // 获取角色列表
      this.getRoleList()
    })
  },
  watch: {
    panelState (v, ov) {
      if (this.panelState && (this.panelState.operation === 'addFinish' || this.panelState.operation === 'editFinish')) {
        // 获取角色列表
        this.getRoleList()
        // 新增或编辑的角色高亮 给予明显的提示
        this.id = this.panelState._params.id
      }
    }
  },
  methods: {
    /**
     * 获取角色列表
     */
    getRoleList () {
      this.loading = this.$loading({
        lock: true,
        text: '加载中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.8)'
      })
      this.id = null
      let _params = {
        name: this.form.name
      }
      this.$api.getRoleList(_params).then(res => {
        if (res.data.successed) {
          if (res.data && res.data.data) {
            this.tableData = clonedeep(res.data.data)
          } else {
            this.tableData = []
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
     * 编辑按钮事件
     * @param index
     * @param row
     */
    handleEdit (index, row) {
      this.$store.dispatch('actionPanelState', {
        layerName: 'role',
        state: true,
        _params: clonedeep(row),
        operation: 'update'
      })
    },
    /**
     * 删除按钮事件
     * @param index
     * @param row
     */
    handleDel (index, row) {
      this.$confirm('确认删除该角色吗,删除后将无法恢复?', '提示', {
        confirmButtonText: '确 认',
        cancelButtonText: '取 消',
        type: 'warning',
        cancelButtonClass: 'no-icon-btn',
        confirmButtonClass: 'no-icon-btn',
        center: true,
        closeOnClickModal: false,
        customClass: 'message-box'
      }).then(() => {
        let _params = {
          id: row.id
        }
        this.$api.deleteRole(_params).then(res => {
          if (res.data.successed) {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.getRoleList()
          } else {
            this.$message({
              message: '删除失败',
              type: 'error'
            })
          }
        }).catch(e => {
          this.$message({
            message: '删除失败',
            type: 'error'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    /**
     * 添加按钮事件
     */
    addRole () {
      this.$store.dispatch('actionPanelState', {
        layerName: 'role',
        state: true,
        operation: 'add'
      })
    },
    /**
     * 模块分配按钮事件
     * @param index
     * @param row
     */
    handleDistribution (index, row) {
      this.currentIndex = index
      this.$set(this.tableData[index], 'modulePermissionVisible', true)
      this.getRoleModulePermissions(row)
    },
    /**
     * 根据角色id获取角色的模块权限
     * @param row
     */
    getRoleModulePermissions (row) {
      let _params = {
        roleid: row.id
      }
      this.$api.getRoleModulePermissions(_params).then(res => {
        if (res.status === 200) {
          this.modulePermissions = res.data.handleData
          if (res.data.handleData && res.data.handleData.newData && res.data.handleData.newData.per) {
            this.treeData = res.data.handleData.newData.per
            this.defaultCheckedKeys = this.hasEnable(res.data.handleData.newData.per)
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
        el.children.forEach((ele) => {
          if (ele.enable === 1) {
            hasEnableArr.push(ele['id'])
          }
        })
      })
      return hasEnableArr
    },
    /**
     * 模块分配popover中确认按钮事件
     * @param modules
     * @param keys
     */
    getCheckedModules (modules, keys) {
      let pids = []
      // treeData 返回的数据 非权限数据 没有返回父级key 需要手动将其添加
      this.modulePermissions.newData.per.forEach((el) => {
        pids.push(el['id'])
        if (keys.indexOf(el['id']) === -1) {
          modules.forEach((ele) => {
            if (ele.pid === el.id) {
              keys.push(el.id)
            }
          })
        }
      })
      this.setRoleModulesById(keys)
      this.modulePermissionsClose()
    },
    /**
     * 针对角色进行模块权限分配
     * @param keys
     */
    setRoleModulesById (keys) {
      let _params = {
        roleid: this.tableData[this.currentIndex]['id'],
        moduleids: keys && keys.length > 0 ? keys.join(',') : null
      }
      this.$api.setRoleModulesById(_params).then(res => {
        if (res.data.successed) {
          this.$message({
            message: '为角色分配模块成功',
            type: 'success'
          })
        } else {
          this.$message({
            message: '为角色分配模块失败',
            type: 'error'
          })
        }
      }).catch(e => {
        this.$message({
          message: '为角色分配模块失败',
          type: 'error'
        })
      })
    },
    /**
     * 模块分配中popover中取消按钮事件
     */
    modulePermissionsClose () {
      this.$set(this.tableData[this.currentIndex], 'modulePermissionVisible', false)
    },
    /**
     * 依据id进行当前行高亮的渲染
     * @param row
     * @param rowIndex
     * @returns {string}
     */
    tableRowClassName ({row, rowIndex}) {
      if (this.id === row.id) {
        return 'current-row'
      }
      return ''
    }
  },
  components: {
    roleForm,
    modulePermissions
  },
  destroyed () {
    window.onresize = null
  }
}
</script>
