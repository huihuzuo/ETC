<template>
  <div class="block">
    <el-pagination
      class="common-pager"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currpage"
      :page-size="limit"
      layout="total, prev, pager, next"
      :total="total">
    </el-pagination>
</div>
</template>
<script>
  export default {
    data () {
      return {
        currpage: 1
      }
    },
    props: {
      total: {
        required: true
      },
      limit: {
        required: true
      }
    },
    methods: {
      handleSizeChange (val) {
        this.$emit('currentpage', val)
      },
      handleCurrentChange (val) {
        this.currpage = val
        this.$emit('currentpage', val)
      }
    }
  }
</script>
