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
            <div @mouseover="mouseover(item, $index)" @mouseout="mouseout(item, $index)" class="result-list-item-div" v-for="(item, $index) in data" @click="handleClick(item)" :class="currentSelect === item.id ? 'result-list-currentSelect' : ''">
              <div class="item-left">
                <img :src="require('../../../static/images/icon/icon_map_' + layerName + handleIcon(item, true) + '.png')"/>
              </div>
              <div class="item-right">
                <div class="item-right-first" :title="item.name + '(' + item.id + ')'">{{item.name}}（{{item.id}}）</div>
                <div class="item-right-second" :title="item.type | rangeConversion(tollStationType)">{{item.type | rangeConversion(tollStationType)}}</div>
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
<style lang="scss" scoped>
  $layerName: 'tollStation';
  .result-wrap {
    &-content {
      width: 100%;
      &-data {
        width: 100%;
        height: 100%;
      }
      &-top {
        .result-list-item-div {
          .item-left {
            img {
              margin-top: 10px;
              margin-left: 5px;
            }
          }
        }
      }
    }
  }
</style>
<script>
  import {mapState} from 'vuex'
  import { Wgs84ToMercator02 } from '../../service/https'
  import noData from '@/components/common/noData'
  import clonedeep from 'lodash.clonedeep'
  const _layerName = 'tollStation' // 收费站LayerName
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
        tollStationType: config.range.tollStationType, // 收费站类型select
        currentPage: 1, // 当前页码
        limit: 10, // 当前页码显示数量
        total: 0, // 当前页数据总数
        data: [], // 当前显示数据
        loading: false, // loading
        _params: null, // 时时使用的查询参数
        currentSelect: null, // 当前选择的item项
        layerName: _layerName
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
          this.currentPage = this._params['page']
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
          name: 'tollStationDetail',
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
        // 绑定接口后 name和lxbm待确定
        let _params = {
          limit: this.limit,
          page: this.currentPage,
          stationid: this.queryParams && this.queryParams._params && this.queryParams._params.id ? this.queryParams._params.id : null, // 收费站编码
          type: this.queryParams && this.queryParams._params && this.queryParams._params.type ? this.queryParams._params.type : null, // 收费站类型
          xzqh: this.queryParams && this.queryParams._params && this.queryParams._params.division ? this.queryParams._params.division : null, // 行政区划
          lxbm: this.queryParams && this.queryParams._params && this.queryParams._params.roadcode ? this.queryParams._params.roadcode : null, // 路线编码
          operations: operations
        }
        console.log(_params)
        this._params = _params
        this.$api.loadTollStationList(_params).then(res => {
          if (res.data.successed) {
            if (res.data.data.entitys) {
              this.data = res.data.data.entitys
              this.total = res.data.data.totalCount
              this.addPoints(this.handleData(this.data))
            } else {
              this.data = []
              this.total = 0
            }
          } else {
            this.$message({
              message: '收费站查询失败',
              type: 'error'
            })
          }
        }).catch(e => {
          console.log(e)
          this.$message({
            message: '收费站查询失败',
            type: 'error'
          })
        }).finally(() => {
          this.loading = false
        })
      },
      /**
       * 处理数据,将对应的数据处理成GeoJSON数据格式
       * @param data
       * @returns {Array}
       */
      handleData (data) {
        let point = {}
        let points = []
        let coordinates = []
        data.forEach((el) => {
          point = {}
          if (el['lng'] && el['lat']) {
            coordinates = Wgs84ToMercator02(el['lng'], el['lat'])
            point = {
              attributes: el,
              properties: el,
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: [coordinates[0], coordinates[1]]
              }
            }
            point['attributes']['style'] = {
              image: {
                type: 'icon',
                image: {
                  imageSrc: require('../../../static/images/icon/icon_map_' + _layerName + this.handleIcon(el) + '.png'),
                  imageAnchor: [0.5, 0.5]
                }
              }
            }
            point['attributes']['selectStyle'] = {
              image: {
                type: 'icon',
                image: {
                  imageSrc: require('../../../static/images/icon/icon_map_' + _layerName + this.handleIcon(el) + '_hover.png'),
                  imageAnchor: [0.5, 0.5]
                }
              }
            }
            points.push(point)
          }
        })
        return points
      },
      /**
       * 在地图上标记数据列表对应的空间位置
       * @param _points
       */
      addPoints (_points) {
        if (!this.$Maps) return
        this.$Maps.removeLayerByLayerName(_layerName)
        if (_points && _points.length <= 0) return
        this.$Maps.addPoints(_points, {
          layerName: _layerName,
          geomType: 'GeoJSON',
          zoomToExtent: true,
          selectable: true
        })
      },
      /**
       * 根据不同收费站处理不同收费站图标
       * @param item
       * @param flag
       * @returns {string}
       */
      handleIcon (item, flag) {
        switch (item['type']) {
          case 1: // 合建
            return flag && item['isMouseOver'] ? '_join_hover' : '_join'
          case 2: // 分建
            return flag && item['isMouseOver'] ? '_branch_hover' : '_branch'
          default:
            return flag && item['isMouseOver'] ? '_hover' : ''
        }
      },
      /**
       * div 移出事件 移出后 更换图标
       * @param item
       * @param index
       */
      mouseout (item, index) {
        this.$set(this.data[index], 'isMouseOver', false)
        this.$Maps.unHighLightFeature(item['id'], '', true)
      },
      /**
       * div 滑过事件 滑过时 更换图标
       * @param item
       * @param index
       */
      mouseover (item, index) {
        this.$set(this.data[index], 'isMouseOver', true)
        this.$Maps.highLightFeature(item['id'], '', true)
      }
    },
    components: {
      noData
    },
    destroyed () {
      this.currentSelect = null
      if (!this.$Maps) return
      this.$Maps.removeLayerByLayerName(_layerName)
      this.$ClearAllPopover()
    }
  }
</script>
