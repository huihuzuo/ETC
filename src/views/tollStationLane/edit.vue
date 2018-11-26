<template>
  <div class="query-form-wrap">
    <div class="result-wrap-head">
      <span class="return-icon iconfont icon-fanhui" @click="goback"></span>
      <span>编辑</span>
    </div>
    <div class="query-form-wrap-content">
      <el-form :model="form" label-width="100px" :label-position="'left'" ref="tollStationLaneRules" :rules="tollStationLaneRules" size="small">
        <div class="form-content-scroll-edit">
          <span class="query-form-wrap-content-title">基本信息</span>
          <el-form-item label="收费车道编号" prop="id">
            <el-input v-model="form.id" placeholder="请选择车道类型" disabled></el-input>
          </el-form-item>
          <el-form-item label="车道类型" prop="type">
            <el-select v-model="form.type" placeholder="请选择车道类型">
              <el-option v-for="item in tollLaneType" :label="item.label" :value="item.value" :key="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否绿通">
            <el-select v-model="form.greenTraffic " placeholder="请选择是否绿通">
              <el-option v-for="item in isGreen" :label="item.label" :value="item.value" :key="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="潮汐车道反向时间">
            <el-input v-model="form.tidalTime" placeholder="请输入潮汐车道反向时间"></el-input>
          </el-form-item>
          <el-form-item label="起始日期">
            <el-input v-model="form.startTime" placeholder="请输入起始日期"></el-input>
          </el-form-item>
          <el-form-item label="终止日期">
            <el-input v-model="form.endTime" placeholder="请输入终止日期"></el-input>
          </el-form-item>
          <el-form-item label="使用状态">
            <el-select v-model="form.status" placeholder="请选择使用状态">
              <el-option v-for="item in tollLaneStatus" :label="item.label" :value="item.value" :key="item.value"></el-option>
            </el-select>
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
  </div>
</template>
<style lang="scss">
</style>
<script>
  export default {
    props: {},
    data () {
      return {
        form: {
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
        tollStationLaneRules: {
          name: [{required: true, message: '请输入收费站名称', trigger: 'blur'}]
        }
      }
    },
    mounted () {
      this.loadDetailById(this.$route.params.id)
    },
    watch: {},
    methods: {
      goback () {
        this.$router.push('/tollStationLaneList')
      },
      loadDetailById (id) {
        this.$api.queryTollStationLaneDetailById(id).then(res => {
          if (res.data.code === 200) {
            let obj = res.data.data
            this.form = {
              id: obj.id,
              name: obj.name,
              type: obj.type,
              operation: 2,
              plazaLaneId: obj.plazaLaneId,
              tollLaneType: obj.tollLaneType,
              greenTraffic: obj.greenTraffic,
              status: obj.status,
              tidalTime: obj.tidalTime
            }
          } else {
            this.$message.error('详情查询失败')
          }
        }).catch(e => {
          this.$message.error('详情查询失败')
        })
      },
      onEdit () {
        this.$refs.tollStationLaneRules.validate((valid) => {
          if (valid) {
            this.$api.editTollStationLane(this.form).then(res => {
              if (res.status === 200) {
                this.$message({
                  message: '编辑成功！',
                  type: 'success'
                })
                this.$router.push({ name: 'tollStationLaneList' })
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
        this.$router.push({ name: 'tollStationLaneList' })
      }
    },
    components: {}
  }
</script>
