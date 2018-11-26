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
          <el-form-item label="路线编码">
            <el-input v-model="form.roadcode" placeholder="请输入路线编码" clearable></el-input>
            <!--<el-autocomplete-->
            <!--v-model="form.roadname"-->
            <!--:fetch-suggestions="querySearchAsync"-->
            <!--placeholder="请输入路线名称或编码"-->
            <!--value-key="label"-->
            <!--@select="handleSelect"-->
            <!--&gt;</el-autocomplete>-->
          </el-form-item>
          <el-form-item label="标识点编码">
            <el-input v-model="form.id" placeholder="请输入标识点编码" clearable></el-input>
          </el-form-item>
          <el-form-item label="标识点名称">
            <el-input v-model="form.name" placeholder="请输入标识点名称" clearable></el-input>
          </el-form-item>
          <el-form-item label="标识点类型">
            <el-select v-model="form.type" placeholder="请选择标识点类型" clearable>
              <el-option v-for="item in identificPointType" :label="item.label" :value="item.value" :key="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="使用状态">
            <el-select v-model="form.status" placeholder="请选择使用状态" clearable>
              <el-option v-for="item in tollLaneStatus" :label="item.label" :value="item.value" :key="item.value"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="form-button">
          <el-form-item>
            <el-button class="default-primary-button" type="primary" @click="onQuery('form')">查 询</el-button>
            <el-button class="default-button" @click="onReset('form')">重 置</el-button>
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
  const _layerName = 'identificPoint' // 标识点LayerName
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
        identificPointType: config.range.identificPointType, // 标识点类型select
        tollLaneStatus: config.range.tollLaneStatus,   // 使用状态
        division: config.range.division, // 行政区划省select
        form: {
          name: null, // 标识点名称
          id: null, // 标识点编码
          type: null, // 标识点类型
          roadcode: null, // 路线编码
          division: null, // 行政区划
          roadname: null, // 路线名称
          status: null  // 使用状态
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
      onQuery (formName) {
        this.$store.dispatch('actionQueryParams', {
          layerName: _layerName,
          _params: this.form
        })
        this.$router.push({
          name: _layerName + 'Result'
        })
        // console.log(_layerName)
      },
      /**
       * 重置按钮
       */
      onReset (formName) {
        this.form = {
          name: null, // 收费站名称
          id: null, // 收费站编码
          type: null, // 收费站类型
          roadname: null, // 路线名称
          division: null, // 行政区划
          roadcode: null // 路线编码
        }
      },
      /**
       * 路线数据查询服务
       * @param queryString
       * @param cb
       */
      querySearchAsync (queryString, cb) {
        let _params = {
          name: queryString
        }
        this.$api.loadRoadList(_params).then(res => {
          if (res.status === 200) {
            const restaurants = res.data.data
            const results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants
            clearTimeout(this.timeout)
            this.timeout = setTimeout(() => {
              cb(results)
            }, 3000 * Math.random())
          } else {
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
        })
      },
      /**
       * 路线数据过滤
       * @param queryString
       * @returns {function(*): boolean}
       */
      createStateFilter (queryString) {
        return (state) => {
          return (state.label.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
        }
      },
      /**
       * 检索出的路线点击事件
       * @param item
       */
      handleSelect (item) {
        this.form.roadcode = item.id
      }
    },
    components: {}
  }
</script>
