<!--权限分配tree-->
<template>
  <div class="module-permission">
    <div class="module-permission-tree">
      <el-tree
        class="module-permission-tree-check"
        ref="tree"
        :data="treeData"
        show-checkbox
        :node-key="nodeKey"
        :default-checked-keys="checkedKeys"
        :props="defaultProps">
      </el-tree>
    </div>
    <div class="module-permission-btn">
      <el-button class="mini-btn" size="mini" type="primary" plain @click="onConfirm">确认</el-button>
      <el-button class="mini-btn" size="mini" plain @click="onCancel">取消</el-button>
    </div>
  </div>
</template>
<style lang="scss">
  .module-permission {
    width: 100%;
    height: 100%;
    &-tree {
      width: 100%;
      height: calc(100% - 50px);
      .el-tree-node__label {
        font-family: SimSun;
        font-size: 12px;
        line-height: 28px;
        color: #4e5258;
      }
      .el-tree-node__content > .el-tree-node__expand-icon {
        position: absolute;
        right: 0;
      }
      .el-icon-caret-right {
        font-size: 11px;
        font-family: "iconfont" !important;
        &:before {
          content: "\eb11" !important;
        }
        font-style: normal;
      }
      .el-tree-node__expand-icon.expanded {
        -webkit-transform: rotate(180deg);
        transform: rotate(180deg);
      }
    }
    &-btn {
      width: 100%;
      height: 50px;
      padding-top: 15px;
      padding-left: 8px;
    }
  }
</style>
<script>
export default {
  props: {
    // tree数据
    treeData: {
      type: Array,
      default: function () {
        return []
      }
    },
    // 默认选中的数据的key的数组
    checkedKeys: {
      type: Array,
      default: function () {
        return []
      }
    },
    // node-key 标识
    nodeKey: {
      type: String,
      default: function () {
        return 'id'
      }
    },
    defaultProps: {
      type: Object,
      default: function () {
        return {
          children: 'children',
          label: 'name'
        }
      }
    }
  },
  data () {
    return {
    }
  },
  mounted () {
  },
  watch: {},
  methods: {
    /**
     * 确认按钮
     */
    onConfirm () {
      this.$emit('getCheckedNodes', this.$refs.tree.getCheckedNodes(), this.$refs.tree.getCheckedKeys())
    },
    /**
     * 取消按钮
     */
    onCancel () {
      this.$emit('onCancel')
    }
  },
  components: {}
}
</script>
