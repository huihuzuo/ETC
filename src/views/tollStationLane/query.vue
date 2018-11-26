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
          <el-form-item label="收费站名称">
            <el-input v-model="form.name" placeholder="请输入收费站名称" clearable></el-input>
          </el-form-item>
          <el-form-item label="收费站广场名称">
            <el-input v-model="form.plazaName" placeholder="请输入收费站广场名称" clearable></el-input>
          </el-form-item>
          <el-form-item label="收费车道编号">
            <el-input v-model="form.plazaLaneId" placeholder="请输入收费车道编号" clearable></el-input>
          </el-form-item>
          <el-form-item label="收费车道类型">
            <el-select v-model="form.laneType" placeholder="请选择收费车道类型" clearable>
              <el-option v-for="item in tollLaneType" :label="item.label" :value="item.value" :key="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否绿通">
            <el-select v-model="form.greenTraffic" placeholder="请选择是否绿通" clearable>
              <el-option v-for="item in isGreen" :label="item.label" :value="item.value" :key="item.value"></el-option>
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
  const _layerName = 'tollStationLane' // 收费站车道LayerName
  export default {
    props: {},
    computed: {
      ...mapState({
        queryParams: state => state.params.queryParams // 查询参数便于返回时有之前的查询参数
      })
    },
    data () {
      return {
        tollLaneStatus: config.range.tollLaneStatus, // 收费车道使用状态select
        operation: config.range.operation, // 操作状态select
        division: config.range.division, // 行政区划省select
        tollLaneType: config.range.tollLaneType, // 收费查到类型select
        isGreen: config.range.isGreen, // 是否绿通select
        form: {
          division: null, // 行政区划
          roadcode: null, // 路线编码
          roadname: null, // 路线名称
          name: null, // 收费站名称
          plazaName: null, // 收费站广场名称
          plazaLaneId: null, // 收费车道编号
          laneType: null, // 收费车道类型
          greenTraffic: null, // 是否绿通
          status: null // 使用状态
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
          roadcode: null, // 路线编码
          roadname: null, // 路线名称
          name: null, // 收费站名称
          plazaName: null, // 收费站广场名称
          plazaLaneId: null, // 收费车道编号
          laneType: null, // 收费车道类型
          greenTraffic: null, // 是否绿通
          status: null // 使用状态
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
