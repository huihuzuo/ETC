<template>
  <div class="query-form-wrap">
    <div class="result-wrap-head">
      <span class="return-icon iconfont icon-fanhui" @click="goback"></span>
      <span>编辑</span>
    </div>
    <div class="query-form-wrap-content">
      <el-form :model="form" label-width="100px" :label-position="'left'" ref="parkRules" :rules="parkRules" size="small">
        <div class="form-content-scroll-edit">
          <span class="query-form-wrap-content-title">基本信息</span>
          <el-form-item label="停车场编号" prop="name">
            <el-input v-model="form.id" disabled></el-input>
          </el-form-item>
          <el-form-item label="停车场名称" prop="name">
            <el-input v-model="form.name" placeholder="请输入停车场名称"></el-input>
          </el-form-item>
          <el-form-item label="所属运行方编号">
            <el-input v-model="form.parkOperatorId" placeholder="请输入所属运行方编号"></el-input>
          </el-form-item>
          <el-form-item label="停车场地址">
            <el-input v-model="form.address" placeholder="请输入停车场地址"></el-input>
          </el-form-item>
          <el-form-item label="清分结算机构编码">
            <el-input v-model="form.clearingId" placeholder="请输入服务区桩号" disabled></el-input>
          </el-form-item>
          <el-form-item label="起始日期">
            <el-input v-model="form.startTime" placeholder="请输入起始日期"></el-input>
          </el-form-item>
          <el-form-item label="终止日期">
            <el-input v-model="form.endTime" placeholder="请输入终止日期"></el-input>
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
        </div>
        <div class="form-button">
          <el-form-item>
            <el-button class="default-primary-button" type="primary" @click="onEdit()">保 存</el-button>
            <el-button class="default-button" @click="onCancel">取 消</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>
<style lang="scss">
</style>
<script>
  import { Wgs84ToMercator02, Mercator02ToWgs84 } from '../../service/https'
  import MapEvent from '../../mixin/MapEvent'
  export default {
    props: {},
    data () {
      return {
        form: {
          operation: 2,
          id: '',
          name: '',
          parkOperatorId: '',
          lat: '',
          lng: '',
          address: '',
          startTime: '',
          endTime: '',
          clearingId: ''
        },
        drawObj: '',
        value: '',
        parkRules: {
          name: [{required: true, message: '请输入收费站名称', trigger: 'blur'}]
        }
      }
    },
    mixins: [MapEvent],
    mounted () {
      this.loadDetailById(this.$route.params.id)
    },
    watch: {},
    methods: {
      goback () {
        this.$router.push('/parkList')
      },
      viewPointLocation () {},
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
        let point = this.addPoint(obj, require('../../../static/images/icon/icon_map_park.png'), require('../../../static/images/icon/icon_map_park_hover.png'))
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
      loadDetailById (id) {
        this.$api.queryParkDetailById(id).then(res => {
          if (res.data.code === 200) {
            let obj = res.data.data
            this.form = obj
            this.form['operation'] = 2
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
      onEdit () {
        this.$refs.parkRules.validate((valid) => {
          if (valid) {
            this.$api.editPark(this.form).then(res => {
              if (res.status === 200) {
                this.$message({
                  message: '编辑成功！',
                  type: 'success'
                })
                this.$router.push({ name: 'parkList' })
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
        this.$router.push({ name: 'parkList' })
      }
    },
    components: {}
  }
</script>
