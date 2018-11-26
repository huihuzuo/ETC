<template>
  <div class="list-wrap">
    <div class="modal">
      <div class="list-wrap-form">
        <el-form :inline="true" :model="tableForm" class="demo-form-inline form-inline">
          <div class="form-inline-left">
            <el-form-item label="行政区划">
              <el-select size="small" v-model="tableForm.xzqh" placeholder="请选择" clearable>
                <el-option
                  v-for="item in division"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="石化企业">
              <el-select size="small" v-model="tableForm.companyNum" placeholder="请选择" clearable>
                <el-option
                  v-for="item in petrifactionCompany"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="加油站编号">
              <el-input
                placeholder="请输入"
                v-model="tableForm.id"
                size="small"
                clearable>
              </el-input>
            </el-form-item>
            <el-form-item label="加油站名称">
              <el-input
                placeholder="请输入"
                v-model="tableForm.name"
                size="mini"
                clearable>
              </el-input>
            </el-form-item>
            <el-form-item label="操作状态">
              <el-select size="small" v-model="tableForm.operation" placeholder="请选择" clearable>
                <el-option
                  v-for="item in operation"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button class="no-icon-btn" type="primary" size="small" @click="onQuery">查 询</el-button>
            </el-form-item>
          </div>
        </el-form>
      </div>
      <div class="list-wrap-content">
        <div class="table-part">
          <el-table
            :row-class-name="tableRowClassName"
            :highlight-current-row="true"
            :height="height"
            class="common-table"
            ref="multipleTable"
            :data="tableData3"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column
              type="index"
              label="序号"
              width="50">
            </el-table-column>
            <el-table-column
              label="操作">
              <template slot-scope="scope">
                <el-button type="text"  @click="handClick('edit', scope.row)">编辑</el-button>
                <!--数据状态operation不为3时 才可进行删除操作-->
                <el-button type="text"  @click="handClick('remove', scope.row)" v-if="scope.row.operation !== 3">删除</el-button>
                <!--已是删除数据后 即operation === 3 不可进行删除操作-->
                <el-button type="text" disabled v-if="scope.row.operation === 3">---</el-button>
              </template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="name"
              label="加油站名称">
            </el-table-column>
            <el-table-column
              prop="gasStationOperatorId"
              label="所属运营方编号">
            </el-table-column>
            <el-table-column
              prop="address"
              label="加油站地址">
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="lat"
              label="加油站纬度">
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="lng"
              label="加油站经度">
            </el-table-column>
            <el-table-column
              prop="clearingId"
              show-overflow-tooltip
              label="清分结算机构编码">
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="operation"
              label="数据状态"
              :formatter="formatterOperation">
            </el-table-column>
            <el-table-column
              prop="startTime"
              label="起始日期">
            </el-table-column>
            <el-table-column
              prop="endTime"
              label="终止日期">
            </el-table-column>
          </el-table>
        </div>
        <div class="pager-part">
          <el-pagination
            class="common-pager"
            background
            @size-change="handleSizeChange"
            @current-change="currentChange"
            :current-page.sync="tableForm.page"
            :page-size="tableForm.limit"
            :page-sizes="pageSizes"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
</style>
<script>
  import page from '../../components/common/pager'
  import filters from '../../filters/filters'
  import {mapState} from 'vuex'
  import clonedeep from 'lodash.clonedeep'
  const _layerName = 'gasStation' // 加油站LayerName
  export default {
    props: {},
    data () {
      return {
        height: 600,
        total: 100000,
        limit: 10,
        currpage: 1,
        tableForm: {
          xzqh: '',
          companyNum: '',
          id: '',
          name: '',
          operation: '',
          limit: 10,
          page: 1,
          startTime: '',
          endTime: ''
        },
        value: '',
        operation: config.range.operation,
        division: config.range.division,
        petrifactionCompany: config.range.petrifactionCompany,
        tableData3: [],
        pageSizes: [],
        id: null // 根据此id值高亮数据
      }
    },
    mounted () {
      this.$nextTick(() => {
        $('.list-wrap-content').height($('.modal').height() - $('.list-wrap-form').height() - 50)
        this.height = document.querySelector('.table-part').offsetHeight
        this.tableForm.limit = parseInt((this.height - 50) / 40)
        this.pageSizes = [clonedeep(this.tableForm.limit), clonedeep(this.tableForm.limit) * 2, clonedeep(this.tableForm.limit) * 3, clonedeep(this.tableForm.limit) * 4]
        // 当确定上一次查询数据有值时才进行依据上一次查询参数及页码进行查询
        if (this.resultParams && this.resultParams['layerName'] === _layerName) {
          this.tableForm = clonedeep(this.resultParams)._params
          this.pageSizes = [clonedeep(this.tableForm.limit), clonedeep(this.tableForm.limit) * 2, clonedeep(this.tableForm.limit) * 3, clonedeep(this.tableForm.limit) * 4]
        }
        this.onSeach()
      })
    },
    computed: {
      ...mapState({
        resultParams: state => state.params.resultParams // 查询结果列表参数便于返回时拿到之前的页码以及上一次浏览器的记录
      })
    },
    watch: {
      /**
       * 监听之前查询时是否有参数
       * @param v
       * @param ov
       */
      resultParams (v, ov) {
        if (this.resultParams) {
          this.tableForm = clonedeep(this.resultParams)._params
          this.pageSizes = [clonedeep(this.tableForm.limit), clonedeep(this.tableForm.limit) * 2, clonedeep(this.tableForm.limit) * 3, clonedeep(this.tableForm.limit) * 4]
          this.onSeach()
        }
      }
    },
    methods: {
      /**
       * 编辑、删除按钮 点击事件
       * @param type
       * @param item
       */
      handClick (type, item) {
        switch (type) {
          case 'remove':
            this.removeHand(item)
            break
          case 'edit':
            // 点击编辑和删除的时候页面进行store存值
            this.$store.dispatch('actionResultParams', {
              layerName: _layerName,
              _params: this.tableForm,
              lastViewIdentify: item
            })
            let params = {id: item.id}
            this.$router.push({ name: 'gasStationEdit', params })
            break
        }
      },
      /**
       * 确认删除弹框 确认删除弹框样式有所调整
       * @param item
       */
      removeHand (item) {
        this.$confirm('确认删除该信息吗?', '提示', {
          confirmButtonText: '确 认',
          cancelButtonText: '取 消',
          type: 'warning',
          cancelButtonClass: 'no-icon-btn',
          confirmButtonClass: 'no-icon-btn',
          center: true,
          closeOnClickModal: false,
          customClass: 'message-box'
        }).then(() => {
          item['operation'] = 3
          this.$api.removeGasStation(item).then(res => {
            if (res.status === 200) {
              this.$message({
                message: '删除成功！',
                type: 'success'
              })
              // 点击编辑和删除的时候页面进行store存值
              this.$store.dispatch('actionResultParams', {
                layerName: _layerName,
                _params: this.tableForm,
                lastViewIdentify: item
              })
            } else {
              this.$message.error('删除失败')
            }
          }).catch(e => {
            this.$message.error('删除失败')
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          })
        })
      },
      onSeach () {
        this.loading = this.$loading({
          lock: true,
          text: '加载中',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.8)'
        })
        this.$api.loadGasStationList(this.tableForm).then(res => {
          if (res.data.code === 200) {
            this.total = res.data.data.totalCount
            this.tableData3 = res.data.data.entitys
          } else {
            this.$message.error('加载列表失败')
          }
        }).catch(e => {
          this.$message.error('加载列表失败')
        }).finally(() => {
          this.loading.close()
          if (this.resultParams) {
            this.id = this.resultParams.lastViewIdentify.id
            this.$store.dispatch('actionResultParams', null)
          }
        })
      },
      /**
       * 查询按钮点击事件、因为点击查询后 数据应从第一页开始查询
       */
      onQuery () {
        this.tableForm.page = 1
        this.onSeach()
      },
      /**
       * 分页选择每页多少条事件
       * @param size
       */
      handleSizeChange (size) {
        this.id = null
        this.tableForm.limit = size
        this.onSeach()
      },
      /**
       * 页面点击事件
       * @param val
       */
      currentChange (val) {
        this.id = null
        this.tableForm.page = val
        this.onSeach()
      },
      handleSelectionChange (val) {
        console.log(val)
      },
      formatterOperation (row, column, cellValue, index) {
        return filters.rangeConversion(cellValue, this.operation)
      },
      /**
       * 依据id进行当前行高亮的渲染
       * @param row
       * @param rowIndex
       * @returns {string}
       */
      tableRowClassName ({row, rowIndex}) {
        if (this.id === row.id) {
          return 'current-row'
        }
        return ''
      }
    },
    components: {
      page
    }
  }
</script>
