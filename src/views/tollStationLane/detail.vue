<template>
  <div class="detail-wrap">
    <div class="detail-wrap-head">
      <span class="return-icon iconfont icon-fanhui" @click="onReturn"></span>
      <span>{{name}}详情</span>
    </div>
    <div class="detail-wrap-content" v-loading="loading">
      <div class="detail-wrap-scroll">
        <div class="detail-wrap">
          <div class="detail-wrap-content-part-one">
            <div class="label-card">基本信息</div>
            <div class="detail-info">
              <div>
                <span>收费站车道编号：</span>
                <span>{{detailInfo.id}}</span>
              </div>
              <div>
                <span>收费站车道所属收费广场：</span>
                <span>{{detailInfo.tollStationSquareName}}</span>
              </div>
              <div>
                <span>收费广场所属收费站：</span>
                <span>{{detailInfo.tollStationName}}</span>
              </div>
              <div>
                <span>车道类型：</span>
                <span :style="{backgroundColor: color}" class="lane-type">{{detailInfo.type  | rangeConversion(tollLaneType)}}</span>
              </div>
              <div>
                <span>是否绿通：</span>
                <span :style="{color: detailInfo.greenTraffic === 1 ? '#3bc568' : '#f25555'}">{{detailInfo.greenTraffic | rangeConversion(greenTraffic)}}</span>
              </div>
              <div>
                <span>是否支持计重收费：</span>
                <span>{{detailInfo.weightCharge | rangeConversion(isWeightCharge)}}</span>
              </div>
              <div>
                <span>潮汐车道反向时间：</span>
                <span>{{detailInfo.tidalTime | formatTidalTime}}</span>
              </div>
              <div>
                <span>起始日期：</span>
                <span>{{detailInfo.startTime}}</span>
              </div>
              <div>
                <span>终止日期：</span>
                <span>{{detailInfo.endTime}}</span>
              </div>
              <div>
                <span>使用状态：</span>
                <span :style="{color: detailInfo.status === 2 ? '#3bc568' : '#f25555'}">{{detailInfo.status | rangeConversion(tollLaneStatus)}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
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
            .lane-type {
              width: 36px;
              height: 16px;
              line-height: 16px;
              text-align: center;
              display: inline-block;
              background-color: #3bc568;
              margin-top: 10px;
              color: #ffffff !important;
            }
          }
        }
      }
    }
  }
</style>
<script>
  import filters from '../../filters/filters'
  export default {
    props: {},
    data () {
      return {
        greenTraffic: config.range.isGreen, // 是否绿通select
        tollLaneType: config.range.tollLaneType, // 车道类型select
        tollLaneStatus: config.range.tollLaneStatus, // 收费站车道状态select
        isWeightCharge: config.range.isWeightCharge, // 是否支持计重select
        detailInfo: {}, // 详情数据
        tollStationSquareData: [], // 关联的收费广场数据
        id: null, // 通过此值进行详情查询和收费站广场数据查询
        loading: false, // loading
        color: '', // 车道类型对应的color值
        name: null // 收费站车道title-name值
      }
    },
    mounted () {
      this.id = this.$route.query.id
      // 开始查询详情数据
      this.queryDetail()
    },
    watch: {
      /**
       * 监听车道信息值 监听到后处理对应的车道类型color
       * @param v
       * @param ov
       */
      detailInfo (v, ov) {
        this.color = filters.formatTollLaneTypeColor(this.detailInfo['type'], this.tollLaneType)
      },
      /**
       * 监听收费站车道返回到对应的收费广场信息后处理title上方显示的name值
       * @param v
       * @param ov
       */
      'detailInfo.tollStationSquareName' (v, ov) {
        if (this.detailInfo && this.detailInfo['tollStationSquareName']) {
          this.name = this.detailInfo.tollStationSquareName + this.detailInfo.id.toString().substring(18, 20) + '车道'
        }
      }
    },
    methods: {
      /**
       * 返回按钮
       */
      onReturn () {
        this.$router.push({
          name: 'tollStationLaneResult'
        })
      },
      /**
       * 详情查询服务-收费车道
       */
      queryDetail () {
        this.loading = true
        this.$api.queryTollStationLaneDetailById(this.id).then(res => {
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
          this.queryTollStationSquareDetail()
        })
      },
      /**
       * 详情查询服务-根据收费站广场编号查询收费站广场
       */
      queryTollStationSquareDetail () {
        let id = this.id.toString().substring(0, 18) // 收费车道编号前18位为收费广场编号
        this.$api.queryTollStationSquareDetailById(id).then(res => {
          if (res.data.successed) {
            this.$set(this.detailInfo, 'tollStationSquareName', res.data.data['name'])
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
          this.queryTollStationDetail()
        })
      },
      /**
       * 详情查询服务-根据收费站编号查询收费站
       */
      queryTollStationDetail () {
        let id = this.id.toString().substring(0, 14) // 收费车道编号前14位为收费站编号
        this.$api.queryTollStationDetailById(id).then(res => {
          if (res.data.successed) {
            this.$set(this.detailInfo, 'tollStationName', res.data.data['name'])
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
    }
  }
</script>
