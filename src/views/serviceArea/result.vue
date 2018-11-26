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
                <span class="item-left-icon"></span>
              </div>
              <div class="item-right">
                <div class="item-right-first" :title="item.name + '(' + item.id + ')'">{{item.name}}（{{item.id}}）</div>
                <div class="item-right-second" :title="item.stakeNum">{{item.stakeNum}}</div>
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
  $layerName: 'serviceArea';
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
  import { Wgs84ToMercator02 } from '../../service/https'
  import {mapState} from 'vuex'
  import noData from '@/components/common/noData'
  import clonedeep from 'lodash.clonedeep'
  const _layerName = 'serviceArea' // 服务区LayerName
  const operations = '1,2' // 查询模块 默认查询 1(新增)和2(编辑)的内容 3(删除)的内容不做查询

  export default {
    props: {},
    computed: {
      ...mapState({
        loadMapSuccess: state => state.map.loadMapSuccess, // 地图是否加载完成
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
      if (this.loadMapSuccess) {
        // 确认地图加载完成后,开始查询结果列表
        this.queryResultList()
      }
    },
    watch: {
      /**
       * 确认地图加载完成后,开始查询结果列表 确保空间位置可以顺利标注在地图上
       * @param v
       * @param ov
       */
      loadMapSuccess (v, ov) {
        if (this.loadMapSuccess) {
          this.queryResultList()
        }
      },
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
        let coordinates = []
        let popoverClassName = null
        if (item['lng'] && item['lat']) {
          coordinates = Wgs84ToMercator02(item['lng'], item['lat'])
          popoverClassName = null
        } else {
          coordinates = this.$Maps.getView().getCenter()
          popoverClassName = 'space-error-bubble'
        }
        this.$ShowPopover(_layerName, this.$Maps.getMap(), {
          id: item['id'],
          layerName: _layerName,
          coordinates: coordinates,
          properties: item,
          zoomToExtent: true,
          className: popoverClassName
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
          sxxfx: this.queryParams && this.queryParams._params && this.queryParams._params.sxxfx ? this.queryParams._params.sxxfx : null, // 上下行方向
          name: this.queryParams && this.queryParams._params && this.queryParams._params.name ? this.queryParams._params.name : null, // 服务区名称
          id: this.queryParams && this.queryParams._params && this.queryParams._params.id ? this.queryParams._params.id : null, // 服务区编号
          xzqh: this.queryParams && this.queryParams._params && this.queryParams._params.division ? this.queryParams._params.division : null, // 行政区划
          operations: operations
        }
        this._params = _params
        this.$api.loadServiceAreaList(_params).then(res => {
          if (res.status === 200) {
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
          style: {
            image: {
              type: 'icon',
              image: {
                imageSrc: require('../../../static/images/icon/icon_map_' + _layerName + '.png'),
                imageAnchor: [0.5, 0.5]
              }
            }
          },
          selectStyle: {
            image: {
              type: 'icon',
              image: {
                imageSrc: require('../../../static/images/icon/icon_map_' + _layerName + '_hover.png'),
                imageAnchor: [0.5, 0.5]
              }
            }
          },
          zoomToExtent: true,
          selectable: true
        })
      },
      /**
       * div 移出事件 移出后 更换图标
       * @param item
       * @param index
       */
      mouseout (item, index) {
        this.$Maps.unHighLightFeature(item['id'], '', true)
      },
      /**
       * div 滑过事件 滑过时 更换图标
       * @param item
       * @param index
       */
      mouseover (item, index) {
        this.$Maps.highLightFeature(item['id'], '', true)
      }
    },
    components: {
      noData
    },
    destroyed () {
      this.currentSelect = null
      this.$store.dispatch('actionResultParams', null)
      if (!this.$Maps) return
      this.$Maps.removeLayerByLayerName(_layerName)
      this.$ClearAllPopover()
    }
  }
</script>
