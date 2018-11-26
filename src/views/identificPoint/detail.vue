<template>
  <div class="detail-wrap">
    <div class="detail-wrap-head">
      <span class="return-icon iconfont icon-fanhui" @click="onReturn"></span>
      <span>{{detailInfo.name}}详情</span>
    </div>
    <div class="detail-wrap-content" v-loading="loading">
      <div class="detail-wrap-scroll">
        <div class="detail-wrap">
          <div class="detail-wrap-content-part-one">
            <div class="label-card">基本信息</div>
            <div class="detail-info">
              <div>
                <span>标识点编号：</span>
                <span>{{detailInfo.id}}</span>
              </div>
              <div>
                <span>标识点名称：</span>·1
                <span>{{detailInfo.name}}</span>
              </div>
              <div>
                <span>标识点类型：</span>
                <span>{{detailInfo.type | rangeConversion(identificPointType)}}</span>
              </div>
              <div>
                <span>路段编号：</span>
                <span>{{detailInfo.sectionId}}</span>
              </div>
              <div>
                <span>经度：</span>
                <span>{{detailInfo.lng}}</span>
              </div>
              <div>
                <span>纬度：</span>
                <span>{{detailInfo.lat}}</span>
              </div>
              <div>
                <span>桩号：</span>
                <span>{{detailInfo.pileNumber}}</span>
              </div>
              <div>
                <span>标识点HEX字符串：</span>
                <span>{{detailInfo.hex}}</span>
              </div>
              <div>
                <span>邻省标识点编号：</span>
                <span>{{detailInfo.neighborId}}</span>
              </div>
              <div>
                <span>邻省标识点Hex：</span>
                <span>{{detailInfo.neighborHex}}</span>
              </div>
              <div>
                <span>龙门架数量：</span>
                <span>{{detailInfo.gantryNum}}</span>
              </div>
              <div>
                <span>第一排门架RSU厂商代码：</span>
                <span>{{detailInfo.rsuManUid_1}}</span>
              </div>
              <div>
                <span>第一排门架RSU型号：</span>
                <span>{{detailInfo.rsuModel_1}}</span>
              </div>
              <div>
                <span>第一排门架RSU编号：</span>
                <span>{{detailInfo.rsuId_1}}</span>
              </div>
              <div>
                <span>第一排门架RSU软件版本号：</span>
                <span>{{detailInfo.rsuVerId_1}}</span>
              </div>
              <div>
                <span>第二排门架RSU厂商代码：</span>
                <span>{{detailInfo.rsuManUid_2}}</span>
              </div>
              <div>
                <span>第二排门架RSU型号：</span>
                <span>{{detailInfo.rsuModel_2}}</span>
              </div>
              <div>
                <span>第二排门架RSU编号：</span>
                <span>{{detailInfo.rsuId_2}}</span>
              </div>
              <div>
                <span>第二排门架RSU软件版本号：</span>
                <span>{{detailInfo.rsuVerId_2}}</span>
              </div>
              <div>
                <span>第三排门架RSU厂商代码：</span>
                <span>{{detailInfo.rsuManUid_3}}</span>
              </div>
              <div>
                <span>第三排门架RSU型号：</span>
                <span>{{detailInfo.rsuModel_3}}</span>
              </div>
              <div>
                <span>第三排门架RSU编号：</span>
                <span>{{detailInfo.rsuId_3}}</span>
              </div>
              <div>
                <span>第三排门架RSU软件版本号：</span>
                <span>{{detailInfo.rsuVerId_3}}</span>
              </div>
              <div>
                <span>操作时间：</span>
                <span>{{detailInfo.operationTime}}</span>
              </div>
            </div>
          </div>
          <div class="detail-wrap-content-part-two">
            <div class="label-card">收费站广场列表</div>
            <toll-station-square-result-list :tollStationSquareData="tollStationSquareData"></toll-station-square-result-list>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
  .detail-wrap {
    &-content {
      .label-card {
        width: 100%;
        height: 30px;
        line-height: 30px;
        font-family: SimSun;
        font-size: 12px;
        color: #1a82ee;
        cursor: default;
        padding-left: 15px;
      }
      &-part-one {
        .detail-info {
          div {
            span:nth-child(1) {
              color: #7a7d82;
            }
            span:nth-child(2) {
              color: #4d4d4d;
            }
          }
        }
      }
    }
  }
</style>
<script>
  import identificPointResultList from '@/components/common/identificPointResultList'
  export default {
    props: {},
    data () {
      return {
        identificPointType: config.range.identificPointType, // 标识点类型选择
        detailInfo: {}, // 详情数据
        tollStationSquareData: [], // 关联的收费广场数据
        id: null, // 通过此值进行详情查询和收费站广场数据查询
        loading: false // loading
      }
    },
    mounted () {
      this.id = this.$route.query.id
      // 开始查询详情数据
      this.queryDetail()
    },
    watch: {
    },
    methods: {
      /**
       * 返回按钮
       */
      onReturn () {
        this.$router.push({
          name: 'identificPointResult'
        })
      },
      /**
       * 详情查询服务
       */
      queryDetail () {
        this.loading = true
        this.$api.queryIdentificPointDetailById(this.id).then(res => {
          if (res.data.successed) {
            this.detailInfo = res.data.data
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
          this.queryTollStationSquareResultList()
        })
      },
      /**
       * 收费站广场列表查询服务
       */
      queryTollStationSquareResultList () {
        this.$api.queryTollStationSquareListBySfzBh(this.id).then(res => {
          if (res.data.successed) {
            this.tollStationSquareData = res.data.data
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
      identificPointResultList
    }
  }
</script>
