<template>
  <div class="role-form">
    <div class="role-form-head">
      <span v-if="operation === '编辑'" class="operating-icon iconfont icon-bianji"></span>
      <span v-if="operation === '添加'" class="operating-icon iconfont icon-add"></span>
      <span class="operating-title">{{operation}}</span>
      <span class="close-icon iconfont icon-guanbi" @click="onClose"></span>
    </div>
    <div class="role-form-content">
      <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="demo-ruleForm operating-form">
        <div class="form-content-wrap">
          <div class="form-content">
            <el-form-item label="角色名称" prop="name">
              <el-input v-model="form.name" size="small" placeholder="请输入角色名称"></el-input>
            </el-form-item>
            <el-form-item label="角色描述" prop="content">
              <el-input type="textarea" v-model="form.content" size="small" placeholder="请输入角色描述"></el-input>
            </el-form-item>
          </div>
        </div>
        <div class="form-button">
          <el-form-item>
            <el-button type="primary" @click="onSave('form')" size="small" class="no-icon-btn">保 存</el-button>
            <el-button @click="onReset('form')" size="small" class="no-icon-btn">重 置</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>
<style lang="scss">
  .role-form {
    z-index: 2;
    position: absolute;
    top: 0;
    right: 0;
    width: 320px;
    height: 100%;
    background-color: #ffffff;
    box-shadow: -4px 0 10px 0 rgba(107, 108, 124, 0.2);
    border-radius: 6px 0 0 6px;
    &-head {
      width: 100%;
      height: 40px;
      line-height: 40px;
      border-bottom: 1px solid #dadbdc;
      padding: 0 15px;
      .operating-icon {
        font-size: 13px;
        color: #1c8ffa;
        cursor: default;
      }
      .operating-title {
        font-family: SimSun;
        font-size: 12px;
        color: #4e5258;
        cursor: default;
      }
      .close-icon {
        float: right;
        font-size: 10px;
        color: #c8c9cb;
        cursor: pointer;
        &:hover {
          color: #1c8ffa;
        }
      }
    }
    &-content {
      height: calc(100% - 41px);
      width: 100%;
      position: relative;
      .el-form {
        padding-top: 10px;
        width: calc(100% - 20px);
        .el-textarea__inner {
          height: 200px;
        }
      }
    }
  }
</style>
<script>
import {mapState} from 'vuex'
import clonedeep from 'lodash.clonedeep'
export default {
  props: {},
  data () {
    return {
      form: {
        id: null, // 角色id
        name: null, // 角色名称
        content: null // 角色描述
      },
      rules: {
        name: [
          {required: true, validator: this.validIsUnique, trigger: 'blur'}
        ]
      }, // 校验规则
      operation: '添加' // title显示内容
    }
  },
  computed: {
    ...mapState({
      panelState: state => state.panel.panelState // 获取面板状态 及 编辑时同时获取编辑内容
    })
  },
  mounted () {
    // 处理form显示内容
    this.handleForm()
  },
  watch: {
    /**
     * 监听面板状态 处理form显示内容
     * @param v
     * @param ov
     */
    panelState (v, ov) {
      this.handleForm()
    }
  },
  methods: {
    /**
     * 处理form显示内容
     */
    handleForm () {
      if (this.panelState && this.panelState.operation === 'add') {
        this.operation = '添加'
      }
      if (this.panelState && this.panelState.operation === 'update') {
        this.operation = '编辑'
        this.form = clonedeep(this.panelState._params)
      }
    },
    /**
     * 保存按钮事件
     * @param formName
     */
    onSave (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          switch (this.operation) {
            case '添加':
              this.onAdd()
              break
            case '编辑':
              this.onUpdate()
              break
          }
        } else {
          this.$message({
            message: '信息校核失败,请核实后重新添加！',
            type: 'warning'
          })
          return false
        }
      })
    },
    /**
     * 重置按钮事件
     * @param formName
     */
    onReset (formName) {
      switch (this.operation) {
        case '添加':
          this.$refs[formName].resetFields()
          break
        case '编辑':
          this.form = clonedeep(this.panelState._params)
          break
      }
    },
    /**
     * 关闭按钮事件
     */
    onClose () {
      this.$store.dispatch('actionPanelState', {
        layerName: 'role',
        state: false
      })
    },
    /**
     * 添加角色方法
     */
    onAdd () {
      let _params = {
        name: this.form.name,
        content: this.form.content
      }
      this.$api.addRole(_params).then(res => {
        if (res.data.successed) {
          this.$message({
            message: '添加成功',
            type: 'success'
          })
          this.$store.dispatch('actionPanelState', {
            layerName: 'role',
            state: false,
            _params: {
              id: res.data.data
            },
            operation: 'addFinish'
          })
        } else {
          this.$message({
            message: '添加失败',
            type: 'error'
          })
        }
      }).catch(e => {
        this.$message({
          message: '添加失败',
          type: 'error'
        })
      })
    },
    /**
     * 编辑角色方法
     */
    onUpdate () {
      let _params = {
        id: this.form.id,
        name: this.form.name,
        content: this.form.content
      }
      this.$api.updateRole(_params).then(res => {
        if (res.data.successed) {
          this.$message({
            message: '编辑成功',
            type: 'success'
          })
          this.$store.dispatch('actionPanelState', {
            layerName: 'role',
            state: false,
            _params: {
              id: this.form.id
            },
            operation: 'editFinish'
          })
        } else {
          this.$message({
            message: '编辑失败',
            type: 'error'
          })
        }
      }).catch(e => {
        this.$message({
          message: '编辑失败',
          type: 'error'
        })
      })
    },
    /**
     * 校验角色名称唯一性
     * @param rule
     * @param value
     * @param callback
     * @returns {*}
     */
    validIsUnique (rule, value, callback) {
      if (!value) {
        return callback(new Error('角色名不能为空'))
      }
      if (this.panelState && this.panelState._params && this.panelState._params.name === value) {
        return callback()
      } else {
        this.$api.queryRoleByRoleName({
          name: value
        }).then(res => {
          if (res.data && res.data.data && res.data.data > 0) {
            callback(new Error('角色名已存在，请重新填写'))
          } else {
            callback()
          }
        })
      }
    }
  },
  components: {}
}
</script>
