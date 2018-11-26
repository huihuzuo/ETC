<template>
  <div class="query-form-wrap">
    <div class="result-wrap-head">
      <span class="return-icon iconfont icon-fanhui" @click="goback"></span>
      <span>编辑</span>
    </div>
    <div class="query-form-wrap-content">
      <el-form :model="form" label-width="100px" :label-position="'left'" ref="tollStationSquareRules" :rules="tollStationSquareRules" size="small">
        <div class="form-content-scroll-edit">
          <span class="query-form-wrap-content-title">基本信息</span>
          <el-form-item label="收费广场编号" prop="plazaId">
            <el-input v-model="form.plazaId" disabled></el-input>
          </el-form-item>
          <el-form-item label="收费广场名称" prop="plazaName">
            <el-input v-model="form.plazaName" placeholder="请选择收费广场名称"></el-input>
          </el-form-item>
          <el-form-item label="广场类型" prop="plazaType">
            <el-select v-model="form.plazaType" placeholder="请选择广场类型">
              <el-option v-for="item in tollStationType" :label="item.label" :value="item.value" :key="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="桩号" prop="stakeNum">
            <el-input v-model="form.stakeNum" placeholder="请输入桩号"></el-input>
          </el-form-item>
          <el-form-item label="ETC车道数" prop="etclaneCount">
            <el-input v-model="form.etclaneCount" placeholder="请输入ETC车道数"></el-input>
          </el-form-item>
          <el-form-item label="MTC车道数" prop="mtclaneCount">
            <el-input v-model="form.mtclaneCount" placeholder="请输入MTC车道数"></el-input>
          </el-form-item>
          <el-form-item label="混合车道数" prop="mixLaneCount">
            <el-input v-model="form.mixLaneCount" placeholder="请输入混合车道数"></el-input>
          </el-form-item>
          <span class="query-form-wrap-content-title">车道示意图</span>
          <div class="addLaneCount">
            <div>ETC车道&nbsp;<span class="etcCount">{{this.etclaneCount}}</span>&nbsp;条，</div>
            <div>MTC车道&nbsp;<span class="mtcCount">{{this.mtclaneCount}}</span>&nbsp;条，</div>
            <div>混合车道&nbsp;<span class="mixCount">{{this.mixLaneCount}}</span>&nbsp;条</div>
          </div>
          <div class="tab-content">
            <toll-station-lane-sketch-map :data="tollLaneData"  @handleLaneClick="handleLaneClick" :etcLaneCheckStatus="etcLaneCheckStatus" :mtcLaneCheckStatus="mtcLaneCheckStatus" :mixLaneCheckStatus="mixLaneCheckStatus"></toll-station-lane-sketch-map>
          </div>
          <div>
            <span class="query-form-wrap-content-title">空间信息</span>
            <span class="query-form-wrap-content-title-icon iconfont" @click="handClick()">&#xe60d;</span>
          </div>
          <el-form-item label="经度">
            <el-input v-model="form.lng" placeholder="请输入经度或者地图点选" disabled></el-input>
          </el-form-item>
          <el-form-item label="纬度">
            <el-input v-model="form.lat" placeholder="请输入纬度或者地图点选" disabled></el-input>
          </el-form-item>
        </div>
        <div class="form-button">
          <el-form-item>
            <el-button class="default-primary-button" type="primary" @click="onEdit()">保 存</el-button>
            <el-button class="default-button" @click="onCancel()">取消</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <div class="toll-station-dialog-wrap">
      <div class="dialog-wrap" v-if="dialogVisible">
        <div class="el-dialog__title">
          <span class="label">收费车道信息</span>
          <span class="close iconfont icon-guanbi" @click="handleClose()"></span>
        </div>
        <div class="el-dialog__body">
          <div class="toll-station-edit-wrap">
            <el-form :model="tollStationLane" label-width="105px" :label-position="'left'" ref="tollStationLaneRules" :rules="tollStationLaneRules" size="small">
              <div class="form-content-scroll-children">
                <div class="form-content-scroll-item">
                  <el-form-item label="收费车道编号" prop="id">
                    <el-input v-model="tollStationLane.id" placeholder="请选择车道类型" disabled></el-input>
                  </el-form-item>
                </div>
                <div class="form-content-scroll-item">
                  <el-form-item label="车道类型" prop="type">
                    <el-select v-model="tollStationLane.type" placeholder="请选择车道类型">
                      <el-option v-for="item in tollLaneType" :label="item.label" :value="item.value" :key="item.value"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <div class="form-content-scroll-item">
                  <el-form-item label="是否绿通">
                    <el-select v-model="tollStationLane.greenTraffic " placeholder="请选择是否绿通">
                      <el-option v-for="item in isGreen" :label="item.label" :value="item.value" :key="item.value"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <div class="form-content-scroll-item">
                  <el-form-item label="潮汐车道反向时间">
                    <el-time-picker
                      is-range
                      v-model="tollStationLane.tidalTime"
                      range-separator="和"
                      format="HH:mm"
                      value-format="HHmm"
                      start-placeholder="开始时间"
                      end-placeholder="结束时间"
                      placeholder="选择时间范围">
                    </el-time-picker>
                  </el-form-item>
                </div>
                <div class="form-content-scroll-item">
                  <el-form-item label="起始日期">
                    <el-input v-model="tollStationLane.startTime" placeholder="请输入起始日期"></el-input>
                  </el-form-item>
                </div>
                <div class="form-content-scroll-item">
                  <el-form-item label="终止日期">
                    <el-input v-model="tollStationLane.endTime" placeholder="请输入终止日期"></el-input>
                  </el-form-item>
                </div>
                <div class="form-content-scroll-item" style="width: 100%;">
                  <el-form-item label="使用状态">
                    <el-select v-model="tollStationLane.status" placeholder="请选择使用状态">
                      <el-option v-for="item in tollLaneStatus" :label="item.label" :value="item.value" :key="item.value"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <div class="form-button">
                  <span @click="handleClick('laneUpdate')">更 新</span>
                  <span @click="handleClick('laneRemove')">删 除</span>
                </div>
              </div>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
  .addLaneCount{
    margin-left:13px;
    div{
      float:left;
      height:18px;
      font-size:12px;
      margin-bottom:5px;
      .etcCount{
        color:rgb(59, 197, 104);
      }
      .mtcCount{
        color:rgb(241, 157, 24);
      }
      .mixCount{
        color:#1b9de8;
      }
    }
  }
  .toll-station-dialog-wrap{
    .dialog-wrap{
      width: 750px !important;
      height: 400px;
      position: absolute;
      top: 50%;
      margin-top: -330px;
      left: 50%;
      margin-left: 292px;
      background-color: #FFF;
      box-shadow: 0px 0px 1px rgba(13, 5, 9, 0.15);
      .el-dialog__title{
        width: 100%;
        height: 40px;
        line-height: 40px;
        span{
          display: inline-block;
        }
        .label{
          height: 15px;
          font-family: MicrosoftYaHei;
          font-size: 14px;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 1px;
          color: #4e5258;
          font-size: 16px !important;
          float: left;
          line-height: 30px;
          margin: 15px 20px 0;
        }
        .close{
          width: 10px;
          height: 10px;
          cursor: pointer;
          background-color: #c8c9cb;
          margin-right: 15px;

          &:hover{
            color: #2c9eff;
          }
          float: right;
        }
      }
      .el-dialog__body{
        height: calc(100% - 38px);
        width: 100%;
        overflow: hidden;
        .toll-station-edit-wrap{
          width: 105%;
          height: 100%;
          overflow-y: scroll;
          overflow-x: hidden;
          .form-content-scroll-children{
            width: 100%;
            height: auto;
            overflow: hidden;
            .form-content-scroll-item{
              width: calc(50% - 40px);
              margin: 0 20px;
              height: auto;
              float: left;
              .el-form-item{
                width: 300px !important;
              }
              .el-select>.el-input{
                width: 194px !important;
              }
              .el-range-editor--small.el-input__inner{
                width: 196px !important;
              }
              .el-date-editor .el-range-separator{
                width: 30px !important;
              }
            }
          }
          .detail-wrap-content-part-two{
            width: 100%;
            .label-card{
              width: 100%;
              height: 30px;
              line-height: 30px;
            }
            .addLaneCount{
              width: 100%;
              height: auto;
              overflow: hidden;
            }
          }
        }
        .detail-wrap-tab-content{
          width: 100%;
          float: left;
        }
      }
      .form-button{
        text-align: center;
        span{
          width: 80px;
          height: 30px;
          border: 1px #dcdfe6 solid;
          border-radius: 15px;
          line-height: 30px;
          color: rgb(114, 117, 141);
          cursor: pointer;
          display: inline-block;
          font-family: '宋体';
          &:hover{
            color: #2c9eff;
            border: 1px #2c9eff solid;
          }
        }
        span:nth-child(2){
          margin-left: 60px;
        }
      }
    }
  }
</style>
<script>
  import { Wgs84ToMercator02, Mercator02ToWgs84 } from '../../service/https'
  import MapEvent from '../../mixin/MapEvent'
  import tollStationLaneSketchMap from '../../components/common/tollStationLaneSketchMap'
  import filters from '../../filters/filters'
  export default {
    props: {},
    data () {
      return {
        isModal: true,
        dialogVisible: false,
        form: {
          operation: 2,
          plazaId: '',
          plazaName: '',
          plazaType: '',
          stakeNum: '',
          etclaneCount: '',
          mtclaneCount: '',
          mixLaneCount: '',
          lat: '',
          lng: ''
        },
        tollStationLane: {
          id: '',
          name: '',
          operation: 2,
          plazaLaneId: '',
          type: '',
          greenTraffic: '',
          status: '',
          tidalTime: '',
          startTime: '',
          endTime: '',
          tollLaneType: ''
        },
        tollLaneType: config.range.tollLaneType,
        isGreen: config.range.isGreen,         // 是否绿通
        tollLaneStatus: config.range.tollLaneStatus,   // 使用状态
        tollLaneData: [],
        tollStationType: config.range.tollStationType, // 收费站类型select
        tollStationSquareRules: {
          plazaName: [{required: true, message: '请输入收费广场名称', trigger: 'blur'}],
          etclaneCount: [{validator: this.checkEtcLaneCount, trigger: 'blur'}],
          mtclaneCount: [{validator: this.checkMtcLaneCount, trigger: 'blur'}],
          mixLaneCount: [{validator: this.checkMixLaneCount, trigger: 'blur'}]
        },
        currentLaneId: '',
        tollStationLaneRules: {},
        isShowLaneInfo: false,
        laneInfo: {},
        etclaneCount: 0,
        mtclaneCount: 0,
        mixLaneCount: 0,
        etcLaneCheckStatus: '通过',
        mtcLaneCheckStatus: '通过',
        mixLaneCheckStatus: '通过'
      }
    },
    mounted () {
      /*
      * 信息回调
      * */
      this.loadDetailById(this.$route.params.id)
      this.queryTollStationLaneResultList()
    },
    watch: {
      laneInfo (v, ov) {
        this.color = filters.formatTollLaneTypeColor(this.laneInfo['type'], this.tollLaneType)
      }
    },
    mixins: [MapEvent],
    methods: {
      handleClose () {
        this.dialogVisible = false
      },
      goback () {
        this.$router.push('/tollStationSquareList')
      },
      viewPointLocation () {},
      loadDetailById (id) {
        this.$api.queryTollStationSquareDetailById(id).then(res => {
          if (res.data.code === 200) {
            let obj = res.data.data
            this.form = {
              plazaId: obj.id,
              plazaName: obj.name,
              id: obj.id,
              name: obj.name,
              plazaType: obj.plazaType,
              operation: 2,
              stakeNum: obj.stakeNum,
              etclaneCount: obj.etclaneCount,
              mtclaneCount: obj.mtclaneCount,
              mixLaneCount: obj.mixLaneCount,
              lat: obj.lat,
              lng: obj.lng
            }
            if (obj.lng && obj.lat) {
              const coordinates = Wgs84ToMercator02(obj.lng, obj.lat)
              this.handClick(coordinates[0], coordinates[1])
              this.viewPointLocation(coordinates[0], coordinates[1])
            }
          } else {
            this.$message.error('详情查询失败')
          }
        }).catch(e => {
          console.log(e)
          this.$message.error('详情查询失败')
        })
      },
      /**
       * 收费站广场、车道编辑、更新事件
       */
      handleClick (alias) {
        switch (alias) {
          case 'laneUpdate':
            if (this.tollStationLane.tidalTime && this.tollStationLane.tidalTime instanceof Array) {
              this.tollStationLane.tidalTime = this.tollStationLane.tidalTime.join('')
            }
            this.tollStationLane['operation'] = 2
            this.modifyTollStationLane(this.tollStationLane)
            this.dialogVisible = false
            this.queryTollStationLaneResultList()
            break
          case 'laneRemove':
            this.tollStationLane['operation'] = 3
            this.modifyTollStationLane(this.tollStationLane)
            this.dialogVisible = false
            break
        }
      },
      /**
       * 更新、删除收费车道
       */
      modifyTollStationLane (item) {
        this.$api.editTollStationLane(item).then(res => {
          if (res.status === 200) {
            this.$message({
              message: '编辑成功！',
              type: 'success'
            })
            this.queryTollStationLaneResultList()
          } else {
            this.$message.error('编辑失败')
          }
        }).catch(e => {
          this.$message.error('编辑失败')
        })
      },
      /*
      * 地图
      * */
      handClick (lng, lat) {
        if (lng && lat) {
          this.monitorPoint(null, [lng, lat])
        } else {
          let drawObj = this.drawPoint()
          drawObj.on('drawend', event => {
            this.monitorPoint(event)
            this.$Maps.removeInteraction(drawObj)
          })
        }
      },
      monitorPoint (event, coordinates) {
        let obj = {}
        obj['attributes'] = {}
        obj['attributes']['layerName'] = 'drawPoint'
        let coord = coordinates && coordinates.length > 0 ? coordinates : event.feature.getGeometry().getCoordinates()
        obj['geometry'] = coord
        obj['geometryType'] = 'Point'
        let point = this.addPoint(obj, require('../../../static/images/icon/icon_map_tollStationSquare.png'), require('../../../static/images/icon/icon_map_tollStationSquare_hover.png'))
        coord = Mercator02ToWgs84(obj['geometry'])
        this.form.lng = coord[0]
        this.form.lat = coord[1]
        if (point !== null && point !== undefined) {
          point.on('feature:onmove', event => {
            let coordinate = event.target.getGeometry().getCoordinates()
            coordinate = Mercator02ToWgs84(coordinate)
            this.form.lng = coordinate[0]
            this.form.lat = coordinate[1]
          })
        }
      },
      /**
      * 收费车道示意图点击显示气泡
      * */
      handleLaneClick (item) {
        this.dialogVisible = true
        this.currentLaneId = item['id']
        this.queryTollStationLaneById()
      },
      /**
       * 查询收费车道详情
       */
      queryTollStationLaneById () {
        this.$api.queryTollStationLaneDetailById(this.currentLaneId).then(res => {
          if (res.data.code === 200) {
            let obj = res.data.data
            if (obj && obj['tidalTime'].length > 5) {
              let time = obj['tidalTime']
              this.tollStationLane.tidalTime = [time.substr(0, 4), time.substr(4, 4)]
            }
            this.tollStationLane = obj
          } else {
            this.$message.error('详情查询失败')
          }
        }).catch(e => {
          this.$message.error('详情查询失败')
        })
      },
      onEdit () {
        /*
        * 校验规则
        * */
        this.$refs.tollStationSquareRules.validate((valid) => {
          if (valid) {
            this.$api.editTollStationSquare(this.form).then(res => {
              if (res.status === 200) {
                this.$message({
                  message: '编辑成功！',
                  type: 'success'
                })
                this.$router.push({ name: 'tollStationSquareList' })
              } else {
                this.$message.error('编辑失败')
              }
            }).catch(e => {
              this.$message.error('编辑失败')
            })
          }
        })
      },
      /*
      * 点击取消按钮回归对应路由页面
      * */
      onCancel () {
        this.$router.push({ name: 'tollStationSquareList' })
      },
      /**
       * 根据广场编号获取收费车道
       */
      queryTollStationLaneResultList () {
        this.$api.queryTollStationLaneListByPlazaid(this.$route.params.id).then(res => {
          if (res.status === 200) {
            this.etclaneCount = 0
            this.mtclaneCount = 0
            this.mixLaneCount = 0
            this.tollLaneData = res.data.data
            /*
            * 三种车道类型的校验规则
            * */
            this.tollLaneData.forEach((el) => {
              switch (el['type']) {
                case 1:
                  this.etclaneCount = this.etclaneCount + 1
                  break
                case 2:
                  this.mtclaneCount = this.mtclaneCount + 1
                  break
                case 3:
                  this.mixLaneCount = this.mixLaneCount + 1
                  break
              }
            })
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
        /*
         * 三种车道类型的校验规则
         * */
      checkEtcLaneCount (rule, value, callback) {
        if (value) {
          if (parseInt(value) === this.etclaneCount) {
            this.etcLaneCheckStatus = '通过'
            callback()
          } else {
            this.etcLaneCheckStatus = '不通过'
            return callback(new Error('车道示意图显示ETC车道数为' + this.etclaneCount))
          }
        } else {
          if (this.etclaneCount === 0) {
            this.etcLaneCheckStatus = '通过'
            callback()
          } else {
            this.etcLaneCheckStatus = '不通过'
            return callback(new Error('车道示意图显示ETC车道数为' + this.etclaneCount))
          }
        }
      },
      checkMtcLaneCount (rule, value, callback) {
        if (value) {
          if (parseInt(value) === this.mtclaneCount) {
            this.mtcLaneCheckStatus = '通过'
            callback()
          } else {
            this.mtcLaneCheckStatus = '不通过'
            return callback(new Error('车道示意图显示MTC车道数为' + this.mtclaneCount))
          }
        } else {
          if (this.mtclaneCount === 0) {
            this.mtcLaneCheckStatus = '通过'
            callback()
          } else {
            this.mtcLaneCheckStatus = '不通过'
            return callback(new Error('车道示意图显示MTC车道数为' + this.mtclaneCount))
          }
        }
      },
      checkMixLaneCount (rule, value, callback) {
        if (value) {
          if (parseInt(value) === this.mixLaneCount) {
            this.mixLaneCheckStatus = '通过'
            callback()
          } else {
            this.mixLaneCheckStatus = '不通过'
            return callback(new Error('车道示意图显示混合车道数为' + this.mixLaneCount))
          }
        } else {
          if (this.mixLaneCount === 0) {
            this.mixLaneCheckStatus = '通过'
            callback()
          } else {
            this.mixLaneCheckStatus = '不通过'
            return callback(new Error('车道示意图显示混合车道数为' + this.mixLaneCount))
          }
        }
      }
    },
    components: {
      tollStationLaneSketchMap
    },
    destroyed () {
      if (!this.$Maps) return
      this.$Maps.removeLayerByLayerName('drawPoint')
    }
  }
</script>
