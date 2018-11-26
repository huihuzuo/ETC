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
                <span>ETC服务网点编号：</span>
                <span>{{detailInfo.id}}</span>
              </div>
              <div>
                <span>ETC服务网点名称：</span>
                <span>{{detailInfo.name}}</span>
              </div>
              <div>
                <span>联系人姓名：</span>
                <span>{{detailInfo.contact}}</span>
              </div>
              <div>
                <span>联系电话：</span>
                <span>{{detailInfo.tel}}</span>
              </div>
              <div>
                <span>服务项目：</span>
                <span>{{detailInfo.serviceItems | rangeConversion(serviceProject)}}</span>
              </div>
              <div>
                <span>营业时间：</span>
                <span>{{detailInfo.businessHours}}</span>
              </div>
              <div>
                <span>地址：</span>
                <span>{{detailInfo.address}}</span>
              </div>
              <div>
                <span>起始日期：</span>
                <span>{{detailInfo.startTime}}</span>
              </div>
              <div>
                <span>终止日期：</span>
                <span>{{detailInfo.endTime}}</span>
              </div>
            </div>
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
  export default {
    props: {},
    data () {
      return {
        serviceProject: config.range.serviceProject, // 服务项目select
        detailInfo: {}, // 详情数据
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
          name: 'ETCServerResult'
        })
      },
      /**
       * 详情查询服务
       */
      queryDetail () {
        this.loading = true
        this.$api.queryETCServerDetailById(this.id).then(res => {
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
          this.loading = false
        })
      }
    },
    components: {
    }
  }
</script>
