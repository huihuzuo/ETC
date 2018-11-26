<template>
  <div class="query-form-wrap">
    <div class="result-wrap-head">
      <span class="return-icon iconfont icon-fanhui" @click="goback"></span>
      <span>编辑</span>
    </div>
    <div class="query-form-wrap-content">
      <el-form :model="form" label-width="80px" :label-position="'left'" ref="etcServerRules" :rules="etcServerRules" size="small">
        <div class="form-content-scroll-edit">
          <span class="query-form-wrap-content-title">基本信息</span>
          <el-form-item label="网点编号" prop="name">
            <el-input v-model="form.id" disabled></el-input>
          </el-form-item>
          <el-form-item label="网点名称" prop="name">
            <el-input v-model="form.name" placeholder="请输入网点名称"></el-input>
          </el-form-item>
          <el-form-item label="联系人姓名">
            <el-input v-model="form.contact" placeholder="请输入联系人姓名"></el-input>
          </el-form-item>
          <el-form-item label="联系电话">
            <el-input v-model="form.tel" placeholder="请输入联系电话"></el-input>
          </el-form-item>
          <el-form-item label="地址">
            <el-input v-model="form.address" placeholder="请输入地址"></el-input>
          </el-form-item>
          <el-form-item label="服务项目">
            <el-select v-model="form.serviceItems" placeholder="请选择服务项目" multiple collapse-tags clearable>
              <el-option
                v-for="item in serviceProject"
                :label="item.label"
                :value="item.value"
                :key="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="营业时间">
            <el-input v-model="form.businessHours" placeholder="请输入营业时间"></el-input>
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
        <div class="form-button edit-form-button">
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
</style>
<script>
  import { Wgs84ToMercator02, Mercator02ToWgs84 } from '../../service/https'
  import MapEvent from '../../mixin/MapEvent'
  export default {
    props: {},
    data () {
      return {
        value: '',
        form: {
          contact: '',
          id: '',
          name: '',
          tel: '',
          address: '',
          startTime: '',
          endTime: '',
          operation: 2,
          lat: '',
          lng: '',
          businessHours: '',
          serviceItems: []
        },
        serviceProject: config.range.serviceProject,  // 服务项目
        etcServerRules: {
          name: [{required: true, message: '请输入收费站名称', trigger: 'blur'}]
        }
      }
    },
    mounted () {
      this.loadDetailById(this.$route.params.id)
    },
    watch: {},
    mixins: [MapEvent],
    methods: {
      goback () {
        this.$router.push('/ETCServerList')
      },
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
        let point = this.addPoint(obj, require('../../../static/images/icon/icon_map_ETCServer.png'), require('../../../static/images/icon/icon_map_ETCServer_hover.png'))
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
        this.$api.queryETCServerDetailById(id).then(res => {
          if (res.data.code === 200) {
            let obj = res.data.data
            this.form = obj
            this.form['operation'] = 2
            this.form['serviceItems'] = obj.serviceItems ? obj.serviceItems.split(',') : []
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
        this.$refs.etcServerRules.validate((valid) => {
          if (valid) {
            let _params = this.form
            _params['serviceItems'] = this.form['serviceItems'].join(',')
            this.$api.editETCServer(_params).then(res => {
              if (res.status === 200) {
                this.$message({
                  message: '编辑成功！',
                  type: 'success'
                })
                this.$router.push({ name: 'ETCServerList' })
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
        this.$router.push({ name: 'ETCServerList' })
      }
    },
    components: {}
  }
</script>
