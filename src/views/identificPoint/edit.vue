<template>
  <div class="query-form-wrap">
    <div class="result-wrap-head">
      <span class="return-icon iconfont icon-fanhui" @click="goback"></span>
      <span>编辑</span>
    </div>
    <div class="query-form-wrap-content">
      <el-form :model="form" label-width="100px" :label-position="'left'" ref="identificPointRules" :rules="identificPointRules" size="small">
        <div class="form-content-scroll-edit">
          <span class="query-form-wrap-content-title">基本信息</span>
          <el-form-item label="标识点编码" prop="id">
            <el-input v-model="form.id" disabled></el-input>
          </el-form-item>
          <el-form-item label="标识点名称" prop="name">
            <el-input v-model="form.name" placeholder="请选择标识点名称"></el-input>
          </el-form-item>
          <el-form-item label="标识点类型">
            <el-select v-model="form.type" placeholder="请选择标识点类型">
              <el-option v-for="item in identificPointType" :label="item.label" :value="item.value" :key="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="收费路段编号">
            <el-input v-model="form.sectionId" placeholder="收费路段编号"></el-input>
          </el-form-item>
          <el-form-item label="标识点HEX字符串">
            <el-input v-model="form.hex" placeholder="标识点HEX字符串"></el-input>
          </el-form-item>
          <el-form-item label="邻省标识点编号">
            <el-input v-model="form.neighborId" placeholder="请输入邻省标识点编号"></el-input>
          </el-form-item>
          <el-form-item label="邻省标识点Hex">
            <el-input v-model="form.neighborHex" placeholder="请输入邻省标识点Hex"></el-input>
          </el-form-item>
          <el-form-item label="桩号">
            <el-input v-model="form.pileNumber" placeholder="请输入桩号"></el-input>
          </el-form-item>
          <el-form-item label="使用状态">
            <el-select v-model="form.status" placeholder="请选择使用状态" clearable>
              <el-option v-for="item in tollLaneStatus" :label="item.label" :value="item.value" :key="item.value"></el-option>
            </el-select>
          </el-form-item>
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
          <div>
            <span class="query-form-wrap-content-title">门架信息</span>
          </div>
          <el-form-item label="龙门架数量">
            <el-select v-model="form.gantryNum" placeholder="请选择龙门架数量" clearable>
              <el-option v-for="item in grantry" :label="item.label" :value="item.value" :key="item.value"></el-option>
            </el-select>
          </el-form-item>
          <div v-for="(item, index) in num" :key="index">
            <div v-show="index < num">
              <div>
                <span class="grantryLine">第{{index + 1}}排门架</span>
              </div>
              <el-form-item label="RSU厂商代码">
                <el-input v-model="form.rsuManUid_1"></el-input>
              </el-form-item>
              <el-form-item label="RSU型号">
                <el-input v-model="form.rsuModel_1"></el-input>
              </el-form-item>
              <el-form-item label="RSU编号">
                <el-input v-model="form.rsuId_1"></el-input>
              </el-form-item>
              <el-form-item label="RSU软件版本号">
                <el-input v-model="form.rsuVerId_1"></el-input>
              </el-form-item>
            </div>
          </div>
        </div>
        <div class="form-button">
          <el-form-item>
            <el-button class="default-primary-button" type="primary" @click="onEdit()">保 存</el-button>
            <el-button class="default-button" @click="onCancel()">取消</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>
<style lang="scss">
  .grantryLine{
    display:inline-block;
    height:30px;
    line-height:20px;
    color: #212121;
  }
</style>
<script>
  import { Wgs84ToMercator02, Mercator02ToWgs84 } from '../../service/https'
  import MapEvent from '../../mixin/MapEvent'
  export default {
    props: {},
    data () {
      return {
        form: {
          id: '',
          name: '',
          type: '',
          operation: 2,
          neighborId: '',
          lat: '',
          lng: '',
          sectionId: '',
          pileNumber: '',
          hex: '',
          neighborHex: '',
          rsuManUid_1: '',
          rsuModel_1: '',
          rsuId_1: '',
          rsuVerId_1: '',
          rsuManUid_2: '',
          rsuModel_2: '',
          rsuId_2: '',
          rsuVerId_2: '',
          rsuManUid_3: '',
          rsuModel_3: '',
          rsuId_3: '',
          rsuVerId_3: '',
          gantryNum: ''
        },
        identificPointType: config.range.identificPointType, // 标识点类型select
        tollLaneStatus: config.range.tollLaneStatus, // 使用状态
        grantry: config.range.grantry, // 龙门架数量
        identificPointRules: {
          name: [{required: true, message: '请输入标识点名称', trigger: 'blur'}]
        },
        num: 3
      }
    },
    mounted () {
      this.loadDetailById(this.$route.params.id)
    },
    watch: {
      'form.gantryNum' (v, ov) {
        this.num = v
      }
    },
    mixins: [MapEvent],
    methods: {
      goback () {
        this.$router.push('/identificPointList')
      },
      loadDetailById (id) {
        this.$api.queryIdentificPointDetailById(id).then(res => {
          if (res.data.code === 200) {
            let obj = res.data.data
            this.form = {
              id: obj.id,
              name: obj.name,
              type: obj.type,
              operation: 2,
              neighborId: obj.neighborId,
              lat: obj.lat,
              lng: obj.lng,
              sectionId: obj.sectionId
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
          this.$message.error('详情查询失败')
        })
      },
      /**
       * 在地图范围内查看到当前点
       * @param lng
       * @param lat
       */
      viewPointLocation (lng, lat) {
        this.$Maps.getMap().getView().animate({
          center: [lng, lat],
          duration: 500
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
      onEdit () {
        this.$refs.identificPointRules.validate((valid) => {
          if (valid) {
            this.$api.editIdentificPoint(this.form).then(res => {
              if (res.status === 200) {
                this.$message({
                  message: '编辑成功！',
                  type: 'success'
                })
                this.$router.push({ name: 'identificPointList' })
              } else {
                this.$message.error('编辑失败')
              }
            }).catch(e => {
              this.$message.error('编辑失败')
            })
          }
        })
      },
      onCancel () {
        this.$router.push({ name: 'identificPointList' })
      }
    },
    components: {}
  }
</script>

