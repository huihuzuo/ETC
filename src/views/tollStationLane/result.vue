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
            <div class="result-list-item-div" v-for="item in data" @click="handleClick(item)" :class="currentSelect === item.id ? 'result-list-currentSelect' : ''">
              <div class="item-left">
                <span class="item-left-icon"></span>
              </div>
              <div class="item-right">
                <div class="item-right-first" :title="item.plazaName + item.id.toString().substring(18, 20) + '车道' + '(' + item.id + ')'">{{item.plazaName + item.id.toString().substring(18, 20) + '车道'}}（{{item.id}}）</div>
                <div class="item-right-second" :title="item.type | rangeConversion(tollLaneType)">{{item.type | rangeConversion(tollLaneType)}}</div>
              </div>
            </div>
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
<style lang="scss">
  $layerName: 'tollStationLane';
  .result-wrap {
    &-content {
      width: 100%;
      &-data {
        width: 100%;
        height: 100%;
      }
      &-top {
        .result-list-item-div {
          &:hover {
            .item-left {
              &-icon {
                background: url("../../../static/images/icon/icon_map_" + $layerName + "_hover.png") no-repeat;
              }
            }
          }
          .item-left {
            &-icon {
              background: url("../../../static/images/icon/icon_map_" + $layerName + ".png") no-repeat;
            }
          }
        }
      }
    }
  }
</style>
<script>
  import {mapState} from 'vuex'
  import noData from '@/components/common/noData'
  import clonedeep from 'lodash.clonedeep'
  const _layerName = 'tollStationLane' // 收费站车道LayerName
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
        tollLaneType: config.range.tollLaneType, // 收费站类型select
        currentPage: 1, // 当前页码
        limit: 10, // 当前页码显示数量
        total: 0, // 当前页数据总数
        data: [], // 当前显示数据
        loading: false, // loading
        _params: null, // 时时使用的查询参数
        currentSelect: null // 当前选择的item项
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
        this.currentSelect = clonedeep(this.resultParams['lastViewIdentify'])['id']
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
          this.currentPage = this._params['current']
          this.limit = this._params['limit']
          this.currentSelect = clonedeep(this.resultParams['lastViewIdentify'])['id']
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
        this.currentSelect = null
        this.currentPage = val
        this.queryResultList()
      },
      /**
       * 列表中的每一个item点击事件
       * @param item
       */
      handleClick (item) {
        this.currentSelect = item['id']
        this.$store.dispatch('actionResultParams', {
          layerName: _layerName,
          _params: this._params,
          lastViewIdentify: item
        })
        this.$router.push({
          name: 'tollStationLaneDetail',
          query: {
            id: item.id
          }
        })
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
          xzqh: this.queryParams && this.queryParams._params && this.queryParams._params.division ? this.queryParams._params.division : null, // 行政区划
          lxbm: this.queryParams && this.queryParams._params && this.queryParams._params.roadcode ? this.queryParams._params.roadcode : null, // 路线编码
          name: this.queryParams && this.queryParams._params && this.queryParams._params.name ? this.queryParams._params.name : null, // 收费站名称
          plazaName: this.queryParams && this.queryParams._params && this.queryParams._params.plazaName ? this.queryParams._params.plazaName : null, // 收费站广场名称
          plazaLaneId: this.queryParams && this.queryParams._params && this.queryParams._params.plazaLaneId ? this.queryParams._params.plazaLaneId : null, // 收费车道编号
          laneType: this.queryParams && this.queryParams._params && this.queryParams._params.laneType ? this.queryParams._params.laneType : null, // 收费车道类型
          greenTraffic: this.queryParams && this.queryParams._params && this.queryParams._params.greenTraffic ? this.queryParams._params.greenTraffic : null, // 是否绿通
          status: this.queryParams && this.queryParams._params && this.queryParams._params.status ? this.queryParams._params.status : null, // 使用状态
          operations: operations
        }
        this._params = _params
        this.$api.loadTollStationLaneList(_params).then(res => {
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
          // this.handleData(clonedeep(this.data))
        })
      },
      /**
       * 处理收费车道数据,用于显示关联的收费广场具体是哪一个
       * @param data
       */
      handleData (data) {
        const promise = new Promise((resolve, reject) => {
          data.forEach((el, index) => {
            this.$api.queryTollStationSquareDetailById(el.id).then(res => {
              if (res.data.successed) {
                this.$set(el, 'tollStationSquareName', res.data['name'])
              }
              resolve(data)
            }).catch(e => {
            }).finally(() => {
            })
          })
        })
        Promise.all([promise]).then((resultList) => {
          this.data = resultList[0]
          this.loading = false
        })
      }
    },
    components: {
      noData
    },
    destroyed () {
      this.currentSelect = null
    }
  }
</script>
