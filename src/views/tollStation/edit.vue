<template>
  <div class="query-form-wrap">
    <div class="result-wrap-head">
      <span class="return-icon iconfont icon-fanhui" @click="goback"></span>
      <span>编辑</span>
    </div>
    <div class="query-form-wrap-content">
      <el-form :model="form" label-width="100px" :label-position="'left'" ref="tollStationRules" :rules="tollStationRules" size="small">
        <div class="form-content-scroll">
          <span class="query-form-wrap-content-title">基本信息</span>
          <el-form-item label="收费站编码" prop="stationid">
            <el-input v-model="form.id" disabled></el-input>
          </el-form-item>
          <el-form-item label="收费站名称" prop="name">
            <el-input v-model="form.name" placeholder="请选择收费站名称"></el-input>
          </el-form-item>
          <el-form-item label="收费站类型">
            <el-select v-model="form.type" placeholder="请选择收费站类型">
              <el-option v-for="item in tollStationType" :label="item.label" :value="item.value" :key="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="该省在临省编号">
            <el-input v-model="form.neighborId" placeholder="请输入该省在临省编号"></el-input>
          </el-form-item>
          <el-form-item label="收费站广场数量" prop="tollPlazaCount">
            <el-input v-model="form.tollPlazaCount" placeholder="收费站广场数量"></el-input>
          </el-form-item>
          <div class="detail-wrap-content-part-two" v-if="tollStationSquareData.length > 0">
            <div class="label-card" style="margin: 30px 0 10px;">收费站广场列表</div>
            <toll-station-square-result-edit-list :tollStationSquareData="tollStationSquareData" @tollStationSquareOperation="tollStationSquareOperation"></toll-station-square-result-edit-list>
          </div>
        </div>
        <div class="form-button" style="margin-top: 10px;">
          <el-form-item>
            <el-button class="default-primary-button" type="primary" @click="onEdit()">保 存</el-button>
            <el-button class="default-button" @click="onCancel()">取消</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <div class="dialog-wrap" v-if="dialogVisible">
      <div class="el-dialog__title">
        <span class="label">收费站广场信息</span>
        <span class="close iconfont icon-guanbi" @click="handleClose()"></span>
      </div>
      <div class="el-dialog__body">
        <div class="toll-station-edit-wrap">
          <el-form :model="tollStationSquare" label-width="105px" :label-position="'left'" ref="tollStationSquareRules" :rules="tollStationSquareRules"  size="small">
            <span class="query-form-wrap-content-title">收费广场基本信息</span>
            <div class="form-content-scroll-edit">
              <div class="form-content-scroll-children">
                <div class="form-content-scroll-item">
                  <el-form-item label="收费广场编号" prop="plazaId">
                    <el-input v-model="tollStationSquare.id" disabled></el-input>
                  </el-form-item>
                </div>
                <div class="form-content-scroll-item">
                  <el-form-item label="收费广场名称" prop="name">
                    <el-input v-model="tollStationSquare.name" placeholder="请输入收费广场名称"></el-input>
                  </el-form-item>
                </div>
                <div class="form-content-scroll-item">
                  <el-form-item label="广场类型" prop="plazaType">
                    <el-select v-model="tollStationSquare.plazaType" placeholder="请选择广场类型">
                      <el-option v-for="item in tollStationType" :label="item.label" :value="item.value" :key="item.value"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <div class="form-content-scroll-item">
                  <el-form-item label="桩号" prop="stakeNum">
                    <el-input v-model="tollStationSquare.stakeNum" placeholder="请输入桩号"></el-input>
                  </el-form-item>
                </div>
                <div class="form-content-scroll-item">
                  <el-form-item label="经度">
                    <el-input v-model="tollStationSquare.lng" placeholder="请输入经度或者地图点选" disabled></el-input>
                  </el-form-item>
                </div>
                <div class="form-content-scroll-item">
                  <el-form-item label="纬度">
                    <el-input v-model="tollStationSquare.lat" placeholder="请输入纬度或者地图点选" disabled></el-input>
                  </el-form-item>
                </div>
                <div class="form-content-scroll-item">
                  <el-form-item label="桩号" prop="stakeNum">
                    <el-input v-model="tollStationSquare.stakeNum" placeholder="请输入桩号"></el-input>
                  </el-form-item>
                </div>
                <div class="form-content-scroll-item">
                  <el-form-item label="ETC车道数" prop="etclaneCount">
                    <el-input v-model="tollStationSquare.etclaneCount" placeholder="请输入ETC车道数"></el-input>
                  </el-form-item>
                </div>
                <div class="form-content-scroll-item">
                  <el-form-item label="MTC车道数" prop="mtclaneCount">
                    <el-input v-model="tollStationSquare.mtclaneCount" placeholder="请输入MTC车道数"></el-input>
                  </el-form-item>
                </div>
                <div class="form-content-scroll-item">
                  <el-form-item label="混合车道数" prop="mixLaneCount">
                    <el-input v-model="tollStationSquare.mixLaneCount" placeholder="请输入混合车道数"></el-input>
                  </el-form-item>
                </div>
                <div class="form-button">
                  <span @click="handleClick('squareUpdate')">更 新</span>
                  <span @click="handleClick('squareRemove')">删 除</span>
                </div>
              </div>
              <div class="detail-wrap-content-part-two" style="margin-top: 40px;">
                <div class="label-card">车道示意图</div>
                <div class="addLaneCount">
                  <div>ETC车道&nbsp;<span class="etcCount">{{this.etclaneCount}}</span>&nbsp;条，</div>
                  <div>MTC车道&nbsp;<span class="mtcCount">{{this.mtclaneCount}}</span>&nbsp;条，</div>
                  <div>混合车道&nbsp;<span class="mixCount">{{this.mixLaneCount}}</span>&nbsp;条</div>
                </div>
                <div class="detail-wrap-tab-content">
                  <toll-station-lane-sketch-map :data="tollLaneData"  @handleLaneClick="handleLaneClick" :etcLaneCheckStatus="etcLaneCheckStatus" :mtcLaneCheckStatus="mtcLaneCheckStatus" :mixLaneCheckStatus="mixLaneCheckStatus"></toll-station-lane-sketch-map>
                </div>
              </div>
              <span v-if="isShowLaneInfo" class="query-form-wrap-content-title">收费车道基本信息</span>
              <div v-if="isShowLaneInfo" class="form-content-scroll-children">
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
            </div>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
  .dialog-wrap{
    width: 750px !important;
    height: 660px;
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
</style>
<script>
  import { Wgs84ToMercator02, Mercator02ToWgs84 } from '@/service/https'
  import tollStationLaneSketchMap from '@/components/common/tollStationLaneSketchMap'
  import tollStationSquareResultEditList from '@/components/common/tollStationSquareResultEditList'
  const _layerName = 'tollStationSquare'
  export default {
    props: {},
    data () {
      return {
        id: '',
        dialogVisible: false,
        isModal: false,
        form: {
          id: '',
          name: '',
          type: '',
          operation: 2,
          tollPlazaCount: '',
          neighborId: ''
        },
        currentSquareId: '',
        tollStationSquare: {
          operation: 2,
          id: '',
          name: '',
          plazaType: '',
          stakeNum: '',
          etclaneCount: 0,
          mtclaneCount: 0,
          mixLaneCount: 0,
          lat: '',
          lng: ''
        },
        currentLaneId: '',
        isShowLaneInfo: false,
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
        tollStationSquareData: [], // 关联的收费广场数据
        tollStationType: config.range.tollStationType, // 收费站类型select
        tollStationRules: {
          name: [{required: true, message: '请输入收费站名称', trigger: 'blur'}],
          tollPlazaCount: [{validator: this.checktollPlazaCount, trigger: 'change'}]
        },
        tollLaneType: config.range.tollLaneType,
        isGreen: config.range.isGreen,         // 是否绿通
        tollLaneStatus: config.range.tollLaneStatus,   // 使用状态
        laneInfo: {},
        tollLaneData: [],
        etclaneCount: 0,
        mtclaneCount: 0,
        mixLaneCount: 0,
        etcLaneCheckStatus: '通过',
        mtcLaneCheckStatus: '通过',
        mixLaneCheckStatus: '通过',
        tollStationSquareRules: {
          name: [{required: true, message: '请输入收费广场名称', trigger: 'blur'}],
          etclaneCount: [{validator: this.checkEtcLaneCount, trigger: 'change'}],
          mtclaneCount: [{validator: this.checkMtcLaneCount, trigger: 'change'}],
          mixLaneCount: [{validator: this.checkMixLaneCount, trigger: 'change'}]
        }
      }
    },
    mounted () {
      this.id = this.$route.params.id
      this.loadDetailById(this.$route.params.id)
    },
    watch: {
      dialogVisible (val) {
        if (!val) {
          this.queryTollStationSquareResultList()
        }
      }
    },
    methods: {
      goback () {
        this.$router.push('/tollStationList')
      },
      handleClose () {
        this.dialogVisible = false
      },
      /**
       * 收费站编辑
       */
      onEdit () {
        this.$refs.tollStationRules.validate((valid) => {
          if (valid) {
            this.form['operation'] = 2
            this.$api.removeTollStation(this.form).then(res => {
              if (res.status === 200) {
                this.$message({
                  message: '编辑成功！',
                  type: 'success'
                })
              } else {
                this.$message.error('编辑失败')
              }
            }).catch(e => {
              this.$message.error('编辑失败')
            })
          }
        })
      },
      /**
       * 收费站详情
     */
      loadDetailById (id) {
        this.$api.queryTollStationDetailById(id).then(res => {
          if (res.data.code === 200) {
            this.queryTollStationSquareResultList(res.data.data)
          } else {
            this.$message.error('详情查询失败')
          }
        }).catch(e => {
          this.$message.error('详情查询失败')
        })
      },
      /**
       * 收费站广场、车道编辑、更新事件
       */
      handleClick (alias) {
        switch (alias) {
          case 'squareUpdate':
            this.tollStationSquare['operation'] = 2
            this.modifyTollStationSquare(this.tollStationSquare, '编辑')
            // this.queryTollStationSquareResultList()
            break
          case 'squareRemove':
            this.tollStationSquare['operation'] = 3
            this.modifyTollStationSquare(this.tollStationSquare, '删除')
            this.dialogVisible = false
            this.queryTollStationSquareResultList()
            break
          case 'laneUpdate':
            if (this.tollStationLane.tidalTime && this.tollStationLane.tidalTime instanceof Array) {
              this.tollStationLane.tidalTime = this.tollStationLane.tidalTime.join('')
            }
            this.tollStationLane['operation'] = 2
            this.modifyTollStationLane(this.tollStationLane)
            this.isShowLaneInfo = false
            this.queryTollStationLaneResultList()
            break
          case 'laneRemove':
            this.tollStationLane['operation'] = 3
            this.modifyTollStationLane(this.tollStationLane)
            this.isShowLaneInfo = false
            break
        }
      },
      /**
       * 收费站广场列表查询服务
       */
      queryTollStationSquareResultList (tollStation) {
        this.$api.queryTollStationSquareListBySfzBh(this.id).then(res => {
          if (res.data.successed) {
            this.tollStationSquareData = res.data.data
            if (tollStation) {
              this.form = tollStation
            }
            if (this.dialogVisible) {
              this.$Maps.removeLayerByLayerName(_layerName)
              this.addPoints(this.handleData([this.tollStationSquare]))
            }
            // this.queryTollStationLaneResultList()
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
       * 收费站广场删除/编辑
       * @param id
       */
      tollStationSquareOperation (params) {
        this.currentSquareId = params['item']['id']
        switch (params.alias) {
          case 'remove':
            this.tollStationSquare = params.item
            this.tollStationSquare['operation'] = 3
            this.modifyTollStationSquare(this.tollStationSquare, '删除')
            break
          case 'edit':
            this.dialogVisible = true
            this.$Maps.removeLayerByLayerName(_layerName)
            this.queryTollStationSquareById()
            break
          case 'coordinate':
            this.tollStationSquare['lat'] = params['item']['lat']
            this.tollStationSquare['lng'] = params['item']['lng']
            break
        }
      },
      /**
       * 收费站广场删除、更新服务
       */
      modifyTollStationSquare (item, label) {
        this.$refs.tollStationSquareRules.validate((valid) => {
          if (valid) {
            this.$api.editTollStationSquare(item).then(res => {
              if (res.status === 200) {
                this.$message({
                  message: '收费站广场' + label + '成功！',
                  type: 'success'
                })
                this.queryTollStationSquareResultList()
              } else {
                this.$message.error('收费站广场' + label + '失败')
              }
            }).catch(e => {
              this.$message.error('收费站广场' + label + '失败')
            })
          }
        })
      },
      /**
       * 查询收费站广场详情
       */
      queryTollStationSquareById () {
        this.$api.queryTollStationSquareDetailById(this.currentSquareId).then(res => {
          if (res.data.successed) {
            this.addPoints(this.handleData([res.data.data]))
            this.queryTollStationLaneResultList(res.data.data)
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
          selectable: true,
          moveable: true
        })
        this.$Maps.getMap().on('feature:onmove', (event) => {
          let property = event.value.getProperties()
          let coordinate = event.value.getGeometry().getCoordinates()
          coordinate = Mercator02ToWgs84(coordinate)
          property['lng'] = coordinate[0]
          property['lat'] = coordinate[1]
          this.$emit('tollStationSquareOperation', {
            alias: 'coordinate',
            item: property
          })
        })
      },
      /**
       * 根据广场编号获取收费车道
       */
      queryTollStationLaneResultList (tollStationSquare) {
        this.$api.queryTollStationLaneListByPlazaid(this.currentSquareId).then(res => {
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
            if (tollStationSquare) {
              this.tollStationSquare = tollStationSquare
              this.tollStationSquare['operation'] = 2
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
        })
      },
      /**
      * 收费车道示意图点击显示气泡
      */
      handleLaneClick (item) {
        this.isShowLaneInfo = true
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
      onCancel () {
        this.$router.push({ name: 'tollStationList' })
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
      },
      /**
       * 收费站广场数量的验证
       */
      checktollPlazaCount (rule, value, callback) {
        if (value) {
          if (this.tollStationSquareData.length !== parseInt(value)) {
            return callback(new Error('收费站广场数量为' + this.tollStationSquareData.length))
          } else {
            callback()
          }
        }
      }
    },
    components: {
      tollStationLaneSketchMap,
      tollStationSquareResultEditList
    }
  }
</script>
