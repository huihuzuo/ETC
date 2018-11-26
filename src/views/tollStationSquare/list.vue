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
            <el-form-item label="路线编码">
              <el-input
                placeholder="请输入"
                v-model="tableForm.lxbm"
                size="small"
                clearable>
              </el-input>
            </el-form-item>
            <el-form-item label="收费站编码">
              <el-input
                placeholder="请输入"
                v-model="tableForm.stationid"
                size="small"
                clearable>
              </el-input>
            </el-form-item>
            <el-form-item label="收费站类型">
              <el-select size="small" v-model="tableForm.type" placeholder="请选择">
                <el-option
                  v-for="item in tollStationType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="收费站名称">
              <el-input
                placeholder="请输入"
                v-model="tableForm.name"
                size="small"
                clearable>
              </el-input>
            </el-form-item>
            <el-form-item label="广场类型">
              <el-select size="small" v-model="tableForm.plazaType" placeholder="请选择">
                <el-option
                  v-for="item in plazaType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="收费站广场编码">
              <el-input
                placeholder="请输入"
                v-model="tableForm.id"
                size="small"
                clearable>
              </el-input>
            </el-form-item>
            <el-form-item label="收费站广场名称">
              <el-input
                placeholder="请输入"
                v-model="tableForm.plazaName"
                size="small"
                clearable>
              </el-input>
            </el-form-item>
            <el-form-item label="操作状态">
              <el-select size="small" v-model="tableForm.operations" placeholder="请选择" clearable>
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
              label="收费站广场名称">
            </el-table-column>
            <el-table-column
              prop="plazaTypeName"
              label="广场类型">
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="operation"
              label="数据状态"
              :formatter="formatterOperation">
            </el-table-column>
            <el-table-column
              prop="lng"
              label="经度">
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="lat"
              label="纬度">
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="stakeNum"
              label="桩号">
            </el-table-column>
            <el-table-column
              prop="etclaneCount"
              show-overflow-tooltip
              label="ETC车道数">
            </el-table-column>
            <el-table-column
              prop="mtclaneCount"
              label="MTC车道数">
            </el-table-column>
            <el-table-column
              prop="mixLaneCount"
              label="混合车道数">
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
  const _layerName = 'tollStationSquare' // 收费站广场LayerName
  export default {
    props: {},
    data () {
      return {
        limit: 10,
        height: 600,
        total: 100000,
        currpage: 1,
        tableForm: {
          id: '',
          lxbm: '',
          limit: 10,
          page: 1,
          xzqh: '',
          type: '',
          name: '',
          plazaId: '',
          plazaType: '',
          plazaName: '',
          operation: '',
          stationid: '',
          lng: '',
          lat: ''
        },
        plazaType: config.range.plazaType,
        operation: config.range.operation,
        division: config.range.division,
        tollStationType: config.range.tollStationType,
        value: '',
        tableData3: [],
        pageSizes: [],
        id: null // 根据此id值高亮数据
      }
    },
    computed: {
      ...mapState({
        resultParams: state => state.params.resultParams // 查询结果列表参数便于返回时拿到之前的页码以及上一次浏览器的记录
      })
    },
    mounted () {
      this.$nextTick(() => {
        $('.list-wrap-content').height($('.modal').height() - $('.list-wrap-form').height() - 50)
        this.height = document.querySelector('.table-part').offsetHeight
        this.pageSizes = [clonedeep(this.tableForm.limit), clonedeep(this.tableForm.limit) * 2, clonedeep(this.tableForm.limit) * 3, clonedeep(this.tableForm.limit) * 4]
        // 当确定上一次查询数据有值时才进行依据上一次查询参数及页码进行查询
        if (this.resultParams && this.resultParams['layerName'] === _layerName) {
          this.tableForm = clonedeep(this.resultParams)._params
          this.pageSizes = [clonedeep(this.tableForm.limit), clonedeep(this.tableForm.limit) * 2, clonedeep(this.tableForm.limit) * 3, clonedeep(this.tableForm.limit) * 4]
        }
        this.onSeach()
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
            this.$router.push({ name: 'tollStationSquareEdit', params })
            break
        }
      },
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
          this.$api.removeTollStation(item).then(res => {
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
            message: '已取消删除'
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
        this.$api.loadTollStationSquareList(this.tableForm).then(res => {
          if (res.data.code === 200) {
            this.tableData3 = res.data.data.entitys
            this.total = res.data.data.totalCount
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
      },
      /*
      * 格式化操作
      * */
      formatterOperation (row, column, cellValue, index) {
        return filters.rangeConversion(cellValue, this.operation)
      }
    },
    components: {
      page
    }
  }
</script>
