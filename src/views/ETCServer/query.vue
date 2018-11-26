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
          <el-form-item label="服务网点编号">
            <el-input v-model="form.id" placeholder="请输入服务网点编号" clearable></el-input>
          </el-form-item>
          <el-form-item label="服务网点名称">
            <el-input v-model="form.name" placeholder="请输入服务网点名称" clearable></el-input>
          </el-form-item>
          <el-form-item label="服务项目">
            <el-select v-model="form.serviceItems" multiple collapse-tags placeholder="请选择服务项目" clearable>
              <el-option v-for="item in serviceProject" :label="item.label" :value="item.value" :key="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="合作机构类别">
            <el-select v-model="form.orgType" placeholder="请选择合作机构类别" clearable>
              <el-option v-for="item in orgType" :label="item.label" :value="item.value" :key="item.value"></el-option>
            </el-select>
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
  const _layerName = 'ETCServer' // etc服务网点LayerName
  export default {
    props: {},
    computed: {
      ...mapState({
        queryParams: state => state.params.queryParams // 查询参数便于返回时有之前的查询参数
      })
    },
    data () {
      return {
        serviceProject: config.range.serviceProject, // 服务项目select
        operation: config.range.operation, // 操作状态select
        division: config.range.division, // 行政区划省select
        orgType: config.range.orgType, // 合作机构类别select
        form: {
          division: null, // 行政区划
          id: null, // 服务网点编号
          name: null, // 服务网点名称
          serviceItems: [], // 服务项目
          orgType: null // 合作机构类别
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
          division: null, // 行政区划
          id: null, // 服务网点编号
          name: null, // 服务网点名称
          serviceItems: [], // 服务项目
          orgType: null // 合作机构类别
        }
      }
    },
    components: {}
  }
</script>
