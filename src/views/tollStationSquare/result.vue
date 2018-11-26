<template>
  <div class="result-wrap">
    <div class="result-wrap-head">
      <span class="return-icon iconfont icon-fanhui" @click="onReturn"></span>
      <span>查询结果</span>
    </div>
    <div class="result-wrap-content" v-loading="loading">
      <no-data v-if="data.length === 0"></no-data>
      <div class="result-wrap-content-data" v-if="data.length > 0">
        <div class="result-wrap-content-top-scroll">
          <div class="result-wrap-content-top">
            <toll-station-square-result-list :tollStationSquareData="data"></toll-station-square-result-list>
          </div>
        </div>
        <div class="result-wrap-content-pager">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="limit"
            :pager-count="5"
            layout="prev, pager, next"
            :total="total">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  .result-wrap {
    &-content {
      width: 100%;
      &-data {
        width: 100%;
        height: 100%;
      }
      &-top {
      }
    }
  }
</style>
<script>
  import {mapState} from 'vuex'
  import noData from '@/components/common/noData'
  import clonedeep from 'lodash.clonedeep'
  import tollStationSquareResultList from '../../components/common/tollStationSquareResultList'
  const _layerName = 'tollStationSquare' // 收费站广场LayerName
  const operations = '1,2' // 查询模块 默认查询 1(新增)和2(编辑)的内容 3(删除)的内容不做查询

  export default {
    props: {},
    computed: {
      ...mapState({
        queryParams: state => state.params.queryParams, // 查询参数便于拿到上一表单的查询条件
        resultParams: state => state.params.resultParams // 查询结果列表参数便于返回时拿到之前的页码以及上一次浏览器的记录
      })
    },
    data () {
      return {
        currentPage: 1, // 当前页码
        limit: 10, // 当前页码显示数量
        total: 0, // 当前页数据总数
        data: [], // 当前显示数据
        loading: false, // loading
        _params: null // 时时使用的查询参数
      }
    },
    mounted () {
      // 拿到表单传输过来的参数
      if (this.queryParams) {
        if (this.queryParams && this.queryParams['layerName'] === _layerName) {
          this._params = clonedeep(this.queryParams['_params'])
        }
      }
      // 若是通过详情页进行返回的 则拿到查询结果列表参数以便记住上次查询的内容
      if (this.resultParams) {
        this._params = clonedeep(this.resultParams['_params'])
        this.currentPage = this._params['page']
        this.limit = this._params['limit']
      }
      // 开始查询结果列表
      this.queryResultList()
    },
    watch: {
      /**
       * 拿到表单传输过来的参数对列表进行查询
       * @param v
       * @param ov
       */
      queryParams (v, ov) {
        if (this.queryParams && this.queryParams['layerName'] === _layerName) {
          this._params = clonedeep(this.queryParams['_params'])
        }
      },
      /**
       * 是通过详情页进行返回的 则拿到查询结果列表参数以便记住上次查询的内容
       * @param v
       * @param ov
       */
      resultParams (v, ov) {
        if (this.resultParams && this.resultParams['layerName'] === _layerName) {
          this._params = clonedeep(this.resultParams['_params'])
          this.currentPage = this._params['page']
          this.limit = this._params['limit']
        }
      }
    },
    methods: {
      /**
       * 返回按钮
       */
      onReturn () {
        // 返回到上一级时清除结果列表
        this.$store.dispatch('actionResultParams', null)
        this.$router.push({
          name: _layerName + 'Query'
        })
      },
      /**
       * 分页点击事件
       * @param val
       */
      handleCurrentChange (val) {
        this.currentPage = val
        this.queryResultList()
      },
      /**
       * 查询结果列表
       */
      queryResultList () {
        this.loading = true
        this.limit = parseInt(($('.result-wrap-content').height() - 40) / 72)
        // 其他参数待确认接口后补充  除limit和 current 为查询表单传输参数 部分参数可能需要处理
        // resultParams actionResultParams 里存储处理后的参数
        let _params = {
          limit: this.limit,
          page: this.currentPage,
          name: this.queryParams && this.queryParams._params && this.queryParams._params.name ? this.queryParams._params.name : null, // 收费站名称
          lxbm: this.queryParams && this.queryParams._params && this.queryParams._params.roadcode ? this.queryParams._params.roadcode : null, // 路线编码
          xzqh: this.queryParams && this.queryParams._params && this.queryParams._params.division ? this.queryParams._params.division : null, // 行政区划
          type: this.queryParams && this.queryParams._params && this.queryParams._params.type ? this.queryParams._params.type : null, // 收费站类型
          plazaType: this.queryParams && this.queryParams._params && this.queryParams._params.plazaType ? this.queryParams._params.plazaType : null, // 收费广场类型
          plazaId: this.queryParams && this.queryParams._params && this.queryParams._params.plazaId ? this.queryParams._params.plazaId : null, // 收费广场编码
          plazaName: this.queryParams && this.queryParams._params && this.queryParams._params.plazaName ? this.queryParams._params.plazaName : null, // 收费广场名称
          stationid: this.queryParams && this.queryParams._params && this.queryParams._params.stationid ? this.queryParams._params.stationid : null, // 收费站编码
          operations: operations
        }
        this._params = _params
        this.$api.loadTollStationSquareList(_params).then(res => {
          if (res.data.successed) {
            if (res.data.data.entitys) {
              this.data = res.data.data.entitys
              this.total = res.data.data.totalCount
            } else {
              this.data = []
              this.total = 0
            }
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
          this.loading = false
        })
      }
    },
    components: {
      noData,
      tollStationSquareResultList
    },
    destroyed () {
      this.$store.dispatch('actionResultParams', null)
      if (!this.$Maps) return
      this.$Maps.removeLayerByLayerName(_layerName)
      this.$ClearAllPopover()
    }
  }
</script>
