<template>
  <div class="statistic-analysis-wrap">
    <div class="statistic-analysis-wrap-content">
      <div class="statistic-analysis-wrap-content-header">ETC基础数据分析</div>
      <div class="statistic-analysis-wrap-content-content">
        <div class="left">
          <div class="top">
            <ul>
              <li style="width: 50px; height: 50px; background-color: #1c8ffa; line-height: 50px; text-align: center; border-radius: 25px; margin: 25px 20px 0 25px;"><span class="iconfont icon-shoufeizhan" style="font-size: 40px; color: #FFF;"></span></li>
              <li>
                <div class="totalStationNum zy">{{ tollStationData.totalCount }}</div>
                <div class="totalStationLabel">收费站总数</div>
              </li>
              <li>
                <div class="totalStationNum qy">{{ tollStationData.virtualCount }}</div>
                <div class="totalStationLabel">虚拟站点总数</div>
              </li>
            </ul>
          </div>
          <div class="center">
            <div class="totalStationType" id="totalStationType"></div>
            <div class="totalStationType-title">按收费站类型统计</div>
          </div>
          <div class="bottom">
            <div class="bottom-left">
              <div class="bottom-left-top">
                <div class="m1">
                  <span>{{ tollPlazaLaneData.totalCount }}</span>
                  <span class="iconfont icon-shoufeichedao" style="color: #1c8ffa;"></span>
                </div>
                <div class="m2">
                  收费车道总数
                </div>
                <div class="m3" style="margin-top: 39px;" v-for="(item, index) in tollPlazaLaneData.statGreenTraffic">
                  <div class="m3-num">
                    <span>{{ item.val }}</span>
                    <span>{{ item.percent }}%</span>
                  </div>
                  <el-progress :percentage="item.percent" :stroke-width="progressWidth" color="#1a82ee" :show-text="showText"></el-progress>
                  <div class="m3-label">{{ item.name }}</div>
                </div>
              </div>
            </div>
            <div class="bottom-right">
              <ul>
                <li v-for="(item, index) in tollPlazaLaneData.statlantype" :key="index">
                  <div class="bottom-right-label" v-if="item.name !== '混合（ETC+MTC）'"><span>{{item.name}}</span><span>车道</span></div>
                  <div class="bottom-right-label" v-if="item.name === '混合（ETC+MTC）'"><span></span><span>混合(ETC+MTC)</span></div>
                  <div class="bottom-right-user-status">
                    <span>在用: <div class="num">{{item.onlanecount}}</div></span>
                    <span>停用: <div class="num">{{item.outlanecount}}</div></span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="right">
          <div class="right-top">
            <div class="right-left">
              <div class="h1">收费站广场总数</div>
              <div class="h2"></div>
              <div class="h5"></div>
              <div class="h3">
                <span class="arrow-left"></span>
                <span class="box-top"></span>
                <span class="box-content">{{ tollPlazaData.totalCount }}</span>
                <span class="box-bottom"></span>
                <span class="arrow-right"></span>
              </div>
              <div class="m3 h4" style="margin-top: 30px;" v-for="(item, index) in tollPlazaData.statContent">
                <div class="m3-num">
                  <span>{{ item.val }}</span>
                  <span>{{ item.percent }}%</span>
                </div>
                <el-progress :percentage="item.percent" :stroke-width="progressWidth2" color="#1a82ee" :show-text="showText"></el-progress>
                <div class="m3-label">{{ item.name }}</div>
              </div>
            </div>
            <div class="right-right">
              <div class="right-right-top">
                <div class="right-right-top-left">
                  <div class="m1">
                    <span>{{ gasData.totalCount }}</span>
                    <span class="iconfont icon-jiayouzhan" style="color: #1c8ffa;"></span>
                  </div>
                  <div class="m2">
                    加油站总数
                  </div>
                  <div class="m3" style="margin-top: 39px;">
                    <div class="m3-num">
                      <span>{{ gasData.runCount }}</span>
                      <span>{{ gasData.percent }}%</span>
                    </div>
                    <el-progress :percentage="gasData.percent" :stroke-width="progressWidth" color="#1a82ee" :show-text="showText"></el-progress>
                    <div class="m3-label">正在运营数量</div>
                  </div>
                </div>
                <div class="right-right-top-left">
                  <div class="m1">
                    <span style="color: #f25555;">{{ parkData.totalCount }}</span>
                    <span class="iconfont icon-tingchechang" style="color: #f25555;"></span>
                  </div>
                  <div class="m2">
                    停车场总数
                  </div>
                  <div class="m3" style="margin-top: 39px;">
                    <div class="m3-num">
                      <span style="color: #f25555;">{{ parkData.runCount }}</span>
                      <span style="color: #f25555;">{{ parkData.percent }}%</span>
                    </div>
                    <el-progress :percentage="parkData.percent" :stroke-width="progressWidth" color="#f25555" :show-text="showText"></el-progress>
                    <div class="m3-label">正在运行数量</div>
                  </div>
                </div>
              </div>
              <div class="right-right-bottom">
                <div class="right-right-bottom-left">
                  <div class="m1">
                    <span style="color: #3bc568;">{{ serviceAreaData.totalCount }}</span>
                    <span class="iconfont icon-servicearea" style="color:#3bc568;"></span>
                  </div>
                  <div class="m2">
                    服务区总数
                  </div>
                  <div class="m3" style="margin-top: 39px;">
                    <div class="m3-num">
                      <span style="color: #3bc568;">{{ serviceAreaData.runCount }}</span>
                      <span style="color: #3bc568;">{{ serviceAreaData.percent }}%</span>
                    </div>
                    <el-progress :percentage="serviceAreaData.percent" :stroke-width="progressWidth" color="#3bc568" :show-text="showText"></el-progress>
                    <div class="m3-label">正在运营数量</div>
                  </div>
                </div>
                <div class="right-right-bottom-right">
                  <div class="pieChart3-title">包含加油站的服务区</div>
                  <div class="pieChart3">
                    <el-progress type="circle" :stroke-width="16" :percentage="serviceAreaData.hasGaspercent" :color="'#3BC568'"></el-progress>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="right-bottom">
            <div class="right-bottom-left">
              <div class="right-bottom-left-title">网点总数： {{ serviceData.totalCount }}</div>
              <div class="pieChart2" id="pieChart2"></div>
              <div class="pieChart2-title">服务网点统计</div>
            </div>
            <div class="right-bottom-right">
              <div class="right-bottom-right-title">客服合作机构分类统计</div>
              <div class="barChart" id="barChart"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'index',
    data () {
      return {
        showText: false,
        progressWidth: 3,
        userStatus: [],
        progressWidth2: 10,
        totalStationTypeOption: {
          color: ['#f19d18', '#1c8ffa', '#f25555'],
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
          },
          series: [
            {
              name: '按收费站类型统计',
              type: 'pie',
              radius: ['50%', '70%'],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: true
                },
                formatter: '{b}: {d}'
              },
              labelLine: {
                normal: {
                  show: true
                }
              },
              data: [
                {value: 335, name: '共建省界站'},
                {value: 310, name: '分建省界站'},
                {value: 234, name: '非省界站'}
              ]
            }
          ]
        },
        pieChart2Option: {
          color: ['#f19d18', '#1c8ffa', '#f25555'],
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
          },
          series: [
            {
              name: '服务网点',
              type: 'pie',
              radius: '65%',
              center: ['50%', '60%'],
              // radius: ['50%', '70%'],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: false
                },
                formatter: '{b}: {d}'
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data: [
                {value: 335, name: '合作代理网点'},
                {value: 234, name: '自营网点'}
              ]
            }
          ]
        },
        barChartOption: {
          grid: {
            left: '0',
            right: '0',
            bottom: '0',
            containLabel: true
          },
          xAxis: [{
            gridIndex: 0,
            type: 'value',
            show: false,
            min: 0,
            max: 100,
            nameLocation: 'middle',
            nameGap: 5
          }],
          yAxis: [{
            gridIndex: 0,
            min: 0,
            show: false,
            max: 100,
            nameLocation: 'middle',
            nameGap: 30
          }],
          series: [{
            type: 'scatter',
            symbol: 'circle',
            symbolSize: 120,
            label: {
              normal: {
                show: true,
                formatter: '{b}',
                color: '#fff',
                textStyle: {
                  fontSize: '20'
                }
              }
            },
            itemStyle: {
              normal: {
                color: '#00acea'
              }
            },
            data: []
          }]
        },
        tollStationData: {},
        tollPlazaData: {},
        tollPlazaLaneData: {},
        serviceData: {},
        serviceAreaData: {},
        parkData: {},
        gasData: {},
        datalist: [
          {
            offset: [25, 35],
            symbolSize: 120,
            opacity: 0.95,
            color: '#f467ce'
          },
          {
            offset: [40, 95],
            symbolSize: 95,
            opacity: 0.88,
            color: '#7aabe2'
          },
          {
            offset: [10, 80],
            symbolSize: 90,
            opacity: 0.84,
            color: '#ff7123'
          },
          {
            offset: [58, 45],
            symbolSize: 90,
            opacity: 0.8,
            color: '#3BC568'
          },
          {
            offset: [90, 50],
            symbolSize: 65,
            opacity: 0.75,
            color: '#000'
          },
          {
            offset: [75, 10],
            symbolSize: 70,
            opacity: 0.7,
            color: '#01a'
          },
          {
            offset: [75, 105],
            symbolSize: 60,
            opacity: 0.68,
            color: '#1b9de8'
          },
          {
            offset: [105, 82],
            symbolSize: 50,
            opacity: 0.6,
            color: '#68333f'
          }
        ],
        plantCap: []
      }
    },
    watch: {
      tollStationData (val) {
        if (val && val['tollstat'] && val['tollstat'].length > 0) {
          val['tollstat'].forEach(item => {
            item['value'] = item['val']
          })
          this.totalStationTypeOption['series'][0]['data'] = val['tollstat']
          this.initPieEcharts('totalStationType', this.totalStationTypeOption)
        }
      },
      tollPlazaData (val) {
        if (val && val['statContent'] && val['statContent'].length > 0) {
          val['statContent'].forEach(item => {
            item['percent'] = (item['val'] / val['totalCount']).toFixed(2) * 100
          })
        }
      },
      tollPlazaLaneData (val) {
        if (val['totalCount'] !== 0) {
          if (val && val['statGreenTraffic'] && val['statGreenTraffic'].length > 0) {
            val['statGreenTraffic'].forEach(item => {
              item['percent'] = (item['val'] / val['totalCount']).toFixed(2) * 100
              if (item['name'] === '是') {
                item['name'] = '绿通数量'
              } else if (item['name'] === '否') {
                item['name'] = '非绿通数量'
              }
            })
          }
        }
      },
      serviceData (val) {
        if (val['totalCount'] !== 0) {
          if (val && val['statServiceType'] && val['statServiceType'].length > 0) {
            val['statServiceType'].forEach(item => {
              item['value'] = item['val']
            })
            this.pieChart2Option['series'][0]['data'] = val['statServiceType']
            this.initPieEcharts('pieChart2', this.pieChart2Option)
          }
          if (val && val['statOrgType'] && val['statOrgType'].length > 0) {
            val['statOrgType'].forEach(item => {
              item['value'] = item.val
            })
          }
          this.plantCap = val['statOrgType']
          var datas = []
          for (var i = 0; i < this.plantCap.length; i++) {
            var item = this.plantCap[i]
            var itemToStyle = this.datalist[i]
            datas.push({
              name: item.value + '\n' + item.name,
              value: itemToStyle.offset,
              symbolSize: itemToStyle.symbolSize,
              label: {
                normal: {
                  textStyle: {
                    fontSize: 14,
                    color: '#FFF'
                  }
                }
              },
              itemStyle: {
                normal: {
                  color: itemToStyle.color,
                  opacity: itemToStyle.opacity
                }
              }
            })
          }
          this.barChartOption['series'][0]['data'] = datas
          this.initPieEcharts('barChart', this.barChartOption)
        }
      },
      gasData (val) {
        if (val['totalCount'] !== 0) {
          val['percent'] = (val['runCount'] / val['totalCount']).toFixed(2) * 100
        }
      },
      parkData (val) {
        if (val['totalCount'] !== 0) {
          val['percent'] = (val['runCount'] / val['totalCount']).toFixed(2) * 100
        }
      },
      serviceAreaData (val) {
        if (val['totalCount'] !== 0) {
          val['percent'] = (val['runCount'] / val['totalCount']).toFixed(2) * 100
          val['hasGaspercent'] = (val['hasGasCount'] / val['totalCount']).toFixed(2) * 100
        }
      }
    },
    mounted () {
      this.loadData()
    },
    methods: {
      loadData () {
        this.loadTollStation()
        this.loadTollPlaza()
        this.loadTollPlazaLane()
        this.loadETCServer()
        this.loadServiceArea()
        this.loadPark()
        this.loadGas()
      },
      loadTollStation () {
        this.$api.statTollByType({}).then(res => {
          if (res.data.code === 200) {
            this.tollStationData = res.data.data
          } else {
            this.$message.error('收费站统计数据加载失败')
          }
        }).catch(e => {
          this.$message.error('收费站统计数据加载失败')
        })
      },
      loadTollPlaza () {
        this.$api.statTollPlaza({}).then(res => {
          if (res.data.code === 200) {
            this.tollPlazaData = res.data.data
          } else {
            this.$message.error('收费站广场统计数据加载失败')
          }
        }).catch(e => {
          this.$message.error('收费站广场统计数据加载失败')
        })
      },
      loadTollPlazaLane () {
        this.$api.statPlazaLane({}).then(res => {
          if (res.data.code === 200) {
            this.tollPlazaLaneData = res.data.data
          } else {
            this.$message.error('收费站车道统计数据加载失败!')
          }
        }).catch(e => {
          this.$message.error('收费站车道统计数据加载失败')
        })
      },
      loadETCServer () {
        this.$api.statServicePoint({}).then(res => {
          if (res.data.code === 200) {
            this.serviceData = res.data.data
          } else {
            this.$message.error('ETC服务网点统计数据加载失败')
          }
        }).catch(e => {
          this.$message.error('ETC服务网点统计数据加载失败')
        })
      },
      loadServiceArea () {
        this.$api.statFwq({}).then(res => {
          if (res.data.code === 200) {
            this.serviceAreaData = res.data.data
          } else {
            this.$message.error('服务区统计数据加载失败')
          }
        }).catch(e => {
          this.$message.error('服务区统计数据加载失败')
        })
      },
      loadPark () {
        this.$api.statFwq({}).then(res => {
          if (res.data.code === 200) {
            this.parkData = res.data.data
          } else {
            this.$message.error('停车场数据加载失败')
          }
        }).catch(e => {
          this.$message.error('停车场统计数据加载失败')
        })
      },
      loadGas () {
        this.$api.statGas({}).then(res => {
          if (res.data.code === 200) {
            this.gasData = res.data.data
          } else {
            this.$message.error('加油站数据加载失败')
          }
        }).catch(e => {
          this.$message.error('加油站统计数据加载失败')
        })
      },
      initPieEcharts (id, option) {
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById(id))
        // 绘制图表
        myChart.setOption(option)
      }
    }
  }
</script>

<style lang="scss">
  .statistic-analysis-wrap{
    width: 100%;
    height: 100%;
    padding: auto;
    overflow: hidden;
    background-color: #f2f2f2;
    .statistic-analysis-wrap-content{
      width: 1550px;
      height: calc(100% - 80px);
      margin: 40px auto;
      background-color: #FFF;
      &-header{
        width: 100%;
        height: 58px;
        line-height: 58px;
        color: #1b9de8;
        text-align: center;
      }
      .m1{
        width: 100%;
        height: 34px;
        line-height: 34px;
        span:nth-child(1){
          width: 46px;
          height: 23px;
          float: left;
          font-family: ArialMT;
          font-size: 30px;
          font-weight: normal;
          font-stretch: normal;
          line-height: 19px;
          letter-spacing: 0px;
          color: #1c8ffa;
        }
        span:nth-child(2){
          float: right;
          display: inline;
          font-size: 40px;
        }
      }
      .m2{
        width: 100%;
        height: 14px;
        font-family: MicrosoftYaHei;
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 11px;
        letter-spacing: 0px;
        color: #4e5258;
      }
      .m3{
        width: 100%;
        .m3-num{
          width: 100%;
          height: 12px;
          font-family: ArialMT;
          font-size: 14px;
          font-weight: normal;
          font-stretch: normal;
          line-height: 11px;
          letter-spacing: 0px;
          color: #1c8ffa;
          margin-bottom: 10px;
          span{
            color: #1c8ffa;
          }
          span:nth-child(1){
            float: left;
          }
          span:nth-child(2){
            float: right;
          }
        }
        .m3-num:nth-child(2){
          span{
            color: #f25555;
          }
        }
        .m3-label{
          font-family: MicrosoftYaHei;
          font-size: 14px;
          font-weight: normal;
          font-stretch: normal;
          line-height: 11px;
          letter-spacing: 0px;
          color: #4e5258;
          margin-top: 10px;
        }
      }
      &-content{
        width: calc(100% - 39px * 2);
        height: calc(100% - 39px * 2);
        margin: 39px 100px;
        .left{
          width: 430px;
          height: 100%;
          float: left;
          .top{
            width: 430px;
            height: 110px;
            background-color: #ffffff;
            box-shadow: 0px 2px 4px 2px
            rgba(20, 106, 251, 0.2);
            ul{
              width: 100%;
              height: 100%;
              li{
                width: calc(100% / 3);
                height: 100%;
                float: left;
                text-align: center;
                .zy{
                  color: #1a82ee;
                }
                .qy{
                  color: #f25555;
                }
                .totalStationNum{
                  font-family: ArialMT;
                  font-size: 30px;
                  font-weight: normal;
                  font-stretch: normal;
                  line-height: 19px;
                  letter-spacing: 0px;
                  margin-top: 26px;
                }
                .totalStationLabel{
                  font-family: MicrosoftYaHei;
                  font-size: 14px;
                  font-weight: normal;
                  font-stretch: normal;
                  line-height: 19px;
                  letter-spacing: 0px;
                  color: #4e5258;
                  margin-top: 21px;
                }
              }
            }
          }
          .center{
            width: 430px;
            height: 288px;
            background-color: #ffffff;
            box-shadow: 0px 2px 4px 2px
            rgba(20, 106, 251, 0.2);
            margin: 31px 0;
            .totalStationType{
              width: 350px;
              height: 221px;
              margin: 38.5px auto 0;
            }
            .totalStationType-title{
              width: 100%;
              text-align: center;
              height: 14px;
              font-family: MicrosoftYaHei;
              font-size: 14px;
              font-weight: normal;
              font-stretch: normal;
              line-height: 11px;
              letter-spacing: 0px;
              color: #4e5258;
              margin-top: 10px;
            }
          }
          .bottom{
            width: 430px;
            height: 304px;
            background-color: #ffffff;
            margin: auto;
            box-shadow: 0px 2px 4px 2px
            rgba(20, 106, 251, 0.2);
            margin: 31px 0;
            padding: 39px 41px 41px 41px;
            .bottom-left{
              width: 145px;
              height: 100%;
              float: left;
              .bottom-left-top{
                width: 100%;
              }
            }
            .bottom-right{
              width: calc(100% - 145px - 40px);
              height: 100%;
              float: left;
              margin-left: 40px;
              ul{
                padding: 0;
                li{
                  padding: 0;
                  list-style: none;
                  width: 100%;
                  height: 80px;
                  .bottom-right-label{
                    width: 30px;
                    height: 80px;
                    float: left;
                    color: #1c8ffa;
                    overflow: hidden;
                    span{
                      display: block;
                    }
                    span:nth-child(1){
                      width: 30px;
                      transform: rotate(90deg);
                      padding: 0;
                      margin: 0;
                      position: relative;
                      left: -9px;
                      top: 7px;
                    }
                    span:nth-child(2){
                      width: 15px;
                      height: 40px;
                      position: relative;
                      top: 10px;
                    }
                  }
                  .bottom-right-user-status{
                    width: calc(100% - 14px);
                    span{
                      display: block;
                      margin-bottom: 20px;
                      .num{
                        display: inline-block;
                        font-size: 14px;
                        color: #1b9de8;
                        font-weight: bold;
                      }
                    }
                  }
                }
                li:nth-child(2){
                  margin: 20px 0;
                }
              }
            }
          }
        }
        .right{
          width: calc(100% - 430px - 31px);
          height: 100%;
          margin-left: 31px;
          float: left;
          .right-top{
            width: 100%;
            height: 428px;
            .right-left{
              width: 440px;
              height: 428px;
              background-color: #ffffff;
              box-shadow: 0px 2px 4px 2px
              rgba(20, 106, 251, 0.2);
              float: left;
              padding-top: 60px;
              .h1{
                width: 100%;
                text-align: center;
                height: 16px;
                font-family: MicrosoftYaHei;
                font-size: 16px;
                font-weight: normal;
                font-stretch: normal;
                line-height: 19px;
                letter-spacing: 0px;
                color: #1c8ffa;
              }
              .h2{
                width: 200px;
                margin: auto;
                height: 1px;
                text-align: center;
                background-color: #1c8ffa;
                margin: 15px auto 20px;
              }
              .h3{
                width: 100%;
                height: 43px;
                font-family: ArialMT;
                font-size: 30px;
                text-align: center;
                font-weight: normal;
                font-stretch: normal;
                line-height: 43px;
                letter-spacing: 0px;
                color: #1a82ee;
                .arrow-left{
                  width: 30px;
                  height: 30px;
                  border-top: 1px solid #409EFF;
                  border-left: 1px solid #409EFF;
                  transform: rotate(-45deg);
                  display: inline-block;
                }
                .box-top{
                  width: 200px;
                  height: 1px;
                  display: inline-block;
                  background-color: #409EFF;
                  position: relative;
                  top: -35px;
                  left: -24px;
                }
                .box-content{
                  height: 40.43px;
                  display: inline-block;
                  width: 200px;
                  margin: auto;
                  position: relative;
                  left: 103px;
                  top: -45px;
                  text-align: center;
                }
                .box-bottom{
                  width: 200px;
                  height: 1px;
                  display: inline-block;
                  background-color: #409EFF;
                  position: relative;
                  top: -37px;
                  left: -108px
                }
                .arrow-right{
                  width: 30px;
                  height: 30px;
                  border-top: 1px solid #409EFF;
                  border-right: 1px solid #409EFF;
                  transform: rotate(45deg);
                  display: inline-block;
                  position: relative;
                  top: -86px;
                  left: 95px;
                }
              }
              .h4{
                width: 200px;
                margin: auto;
              }
              .h5{
                height:0;
                width:0;
                overflow: hidden;
                font-size: 0;
                line-height: 0;
                border-color:#409EFF transparent transparent transparent;
                border-style:solid dashed dashed dashed;
                border-width:16px;
                margin: auto;
              }
            }
            .right-right{
              width: calc(100% - 440px - 31px);
              height: 428px;
              float: left;
              margin-left: 31px;
              .right-right-top{
                width: 430px;
                height: 199px;
                background-color: #ffffff;
                box-shadow: 0px 2px 4px 2px
                rgba(20, 106, 251, 0.2);
                .right-right-top-left{
                  width: 50%;
                  float: left;
                  height: 100%;
                  padding: 39px 41px;
                }
              }
              .right-right-bottom{
                width: 430px;
                height: 199px;
                background-color: #ffffff;
                box-shadow: 0px 2px 4px 2px
                rgba(20, 106, 251, 0.2);
                margin-top: 31px;
                .right-right-bottom-left{
                  width: 50%;
                  float: left;
                  height: 100%;
                  padding: 39px 41px;
                  .h6{
                    span:nth-child(2){
                      background: none;
                      font-size: 30px;
                      color: #f19d18;
                    }
                  }
                }
                .right-right-bottom-right{
                  width: 50%;
                  height: 199px;
                  background-color: #ffffff;
                  float: left;
                  .pieChart3-title{
                    width: 100%;
                    height: 40px;
                    line-height: 40px;
                    font-size: 14px;
                    text-align: center;
                  }
                  .pieChart3{
                    width: 200px;
                    height: 200px;
                    margin: 20px;
                    padding-left: 20px;
                  }
                }
              }
            }
          }
          .right-bottom{
            width: 900px;
            height: 304px;
            background-color: #ffffff;
            box-shadow: 0px 2px 4px 2px
            rgba(20, 106, 251, 0.2);
            margin-top: 31px;
            .right-bottom-left{
              width: 220px;
              height: 100%;
              float: left;
              border-right: 1px #cacbcc dashed;
              .right-bottom-left-title{
                height: 30px;
                line-height: 30px;
                margin: 10px 20px;
                font-size: 14px;
              }
              .pieChart2{
                width: 142px;
                height: 142px;
                margin: 20px 39px 20px 39px;
              }
              .pieChart2-title{
                width: 100%;
                text-align: center;
                height: 14px;
                font-family: MicrosoftYaHei;
                font-size: 14px;
                font-weight: normal;
                font-stretch: normal;
                line-height: 11px;
                letter-spacing: 0px;
                color: #4e5258;
              }
            }
            .right-bottom-right{
              width: calc(100% - 221px);
              height: 100%;
              float: left;
              .right-bottom-right-title{
                height: 40px;
                line-height: 40px;
                font-size: 14px;
                margin-left: 20px;
              }
              .barChart{
                width: 100%;
                height: calc(100% - 40px);
              }
            }
          }
        }
      }
    }
  }
</style>
