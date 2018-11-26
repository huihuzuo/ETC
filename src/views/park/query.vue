<template>
  <div class="query-form-wrap">
    <div class="query-form-wrap-head">查询</div>
    <div class="query-form-wrap-content">
      <el-form ref="form" :model="form" label-width="100px" :label-position="'left'" size="small">
        <div class="form-content-scroll">
          <el-form-item label="行政区划">
            <el-select v-model="form.division" placeholder="请选择行政区划" clearable>
              <el-option v-for="item in division" :label="item.label" :value="item.value" :key="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="停车场编号">
            <el-input v-model="form.id" placeholder="请输入停车场编号" clearable></el-input>
          </el-form-item>
          <el-form-item label="停车场名称">
            <el-input v-model="form.name" placeholder="请输入停车场名称" clearable></el-input>
          </el-form-item>
        </div>
        <div class="form-button">
          <el-form-item>
            <el-button class="default-primary-button" type="primary" @click="onQuery">查 询</el-button>
            <el-button class="default-button" @click="onReset">重 置</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>
<style lang="scss">
</style>
<script>
  import {mapState} from 'vuex'
  import clonedeep from 'lodash.clonedeep'
  const _layerName = 'park' // 停车场LayerName
  export default {
    props: {},
    computed: {
      ...mapState({
        queryParams: state => state.params.queryParams // 查询参数便于返回时有之前的查询参数
      })
    },
    data () {
      return {
        operation: config.range.operation, // 操作状态select
        division: config.range.division, // 行政区划省select
        form: {
          id: null, // 停车场编号
          name: null, // 停车场名称
          division: null // 行政区划
          // 具体条件待接口确认后再修改
        }
      }
    },
    mounted () {
      // queryParams有值this.form回填
      if (this.queryParams && this.queryParams['layerName'] === _layerName) {
        this.form = clonedeep(this.queryParams['_params'])
      }
    },
    watch: {
      /**
       * 监听queryParams值
       * @param v
       * @param ov
       */
      queryParams (v, ov) {
        if (this.queryParams && this.queryParams['layerName'] === _layerName) {
          this.form = clonedeep(this.queryParams['_params'])
        }
      }
    },
    methods: {
      /**
       * 查询按钮
       */
      onQuery () {
        this.$store.dispatch('actionQueryParams', {
          layerName: _layerName,
          _params: this.form
        })
        this.$router.push({
          name: _layerName + 'Result'
        })
      },
      /**
       * 重置按钮
       */
      onReset () {
        this.form = {
          id: null, // 停车场编号
          name: null, // 停车场名称
          division: null // 行政区划
        }
      }
    },
    components: {}
  }
</script>
