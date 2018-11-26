<template>
  <div class="">
    <!--list 模板-->
    <div class="modal">
      <div class="list-wrap-form">
        <el-form :inline="true" :model="tableForm" class="demo-form-inline form-inline">
          <div class="form-inline-left">
            <!--放过滤条件 以el-form为条件放置-->

            <!--<el-form-item label="行政区划">-->
              <!--<el-select size="small" v-model="tableForm.xzqh" placeholder="请选择" clearable>-->
                <!--<el-option-->
                  <!--v-for="item in division"-->
                  <!--:key="item.value"-->
                  <!--:label="item.label"-->
                  <!--:value="item.value">-->
                <!--</el-option>-->
              <!--</el-select>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="服务网点编号">-->
              <!--<el-input-->
                <!--placeholder="请输入"-->
                <!--v-model="tableForm.id"-->
                <!--size="small"-->
                <!--clearable>-->
              <!--</el-input>-->
            <!--</el-form-item>-->
            <el-form-item>
              <el-button class="no-icon-btn" type="primary" size="small" @click="onSeach">查 询</el-button>
            </el-form-item>
          </div>
        </el-form>
      </div>
      <div class="list-wrap-content">
        <div class="table-part">
           <!--放el-table-->
        </div>
        <div class="pager-part">
          <!--放page组件-->
        </div>
      </div>
    </div>

    <!--edit模板 大体上不变 el-form-item 无按钮部分的放在上面的div里  按钮的放在下面的div里-->
    <div class="form-content-scroll"></div>
    <div class="form-button edit-form-button"></div>
  </div>
</template>

<script type="text/babel">
  export default {
    name: 'template',
    data () {
      return {
      }
    },
    mounted () {
    },
    methods: {
    },
    components: {
    }
  }
</script>

<style lang="scss">
</style>
