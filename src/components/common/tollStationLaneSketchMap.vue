<!--收费车道示意图-->
<template>
  <div class="tollStationLaneSketchMap">
    <div class="tollStationLaneSketchMap-content">
      <div class="tollStationLaneSketchMap-lane-part" :style="boxStyle">
        <div class="everyLane" v-for="item in processedData" :key="item.id" :class="currentSelect === item.id ? 'result-list-currentSelect' : ''" @click="handleLaneClick(item)">
          <span class="everyLane-type" :style="styleObject(item)">{{item.type | rangeConversion(tollLaneType)}}</span>
          <span class="everyLane-num" :style="styleCheckStatus(item)">{{item.num}}</span>
          <span class="everyLane-lane" :style="styleCheckStatus(item)">车</span>
          <span class="everyLane-lane" :style="styleCheckStatus(item)">道</span>
        </div>
        <div class="plaza_no_data" v-if="processedData.length === 0">
            <span class="plaza_no_data_span">
              <div class="plaza_no_data_text">该广场无收费车道</div>
            </span>
        </div>
      </div>
      <div class="tollStationLaneSketchMap-tagging">
        （注：按行驶方向从左到右依次排序）
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  .tollStationLaneSketchMap {
    width: 100%;
    height: 100%;
    background-color: #fff;
    &-content {
      width: 257px;
      height: 100%;
      margin: auto;
      text-align: center;
    }
    &-lane-part {
      border: solid 1px #b2b4c4;
      height: 118px;
      overflow-y: hidden;
      display: flex;
      white-space: nowrap;
      margin: auto;
    }
    .plaza_no_data {
      width: 100%;
      height: 100%;
      text-align: center;
      display: table;
      &_span {
        display: table-cell;
        vertical-align: middle;
      }
      &_text {
        height: 40px;
        line-height: 40px;
        font-family: SimSun;
        font-size: 16px;
        color: #f25555;
      }
    }
    .everyLane {
      width: calc(257px / 6);
      height: calc(100% - 12px);
      float: left;
      padding: 0 3px;
      margin: 6px 0;
      border-right: 1px dashed #b2b4c4;
      cursor: pointer;
      &-type, &-num {
        width: 36px;
        display: block;
        text-align: center;
        font-size: 12px;
      }
      &-type {
        height: 16px;
        line-height: 16px;
        background-color: #1c8ffa;
        color: rgba(255, 255, 255, 0.8);
        font-family: SimSun;
      }
      &-num {
        height: 34px;
        line-height: 34px;
        font-family: MicrosoftYaHei;
        color: #72758d;
      }
      &-lane {
        width: 36px;
        display: block;
        text-align: center;
        font-family: SimSun;
        font-size: 12px;
        color: #72758d;
        height: 20px;
        line-height: 20px;
      }
    }
    .everyLane:last-child {
      border-right: none;
    }
    &-tagging {
      width: 100%;
      height: 30px;
      line-height: 30px;
      font-family: SimSun;
      font-size: 12px;
      color: rgba(0, 0, 0, 0.5);
      text-align: center;
      margin-left:-15px;
    }
  }
</style>
<script>
  import filters from '../../filters/filters'
  export default {
    props: {
      // 收费车道数据
      data: {
        type: Array,
        default: function () {
          return []
        }
      },
      // etc车道是否审核通过
      etcLaneCheckStatus: {
        type: String,
        default: function () {
          return '通过'
        }
      },
      // mtc车道是否审核通过
      mtcLaneCheckStatus: {
        type: String,
        default: function () {
          return '通过'
        }
      },
      // 混合车道是否审核通过
      mixLaneCheckStatus: {
        type: String,
        default: function () {
          return '通过'
        }
      }
    },
    data () {
      return {
        tollLaneType: config.range.tollLaneType, // 收费车道类型
        processedData: [], // 处理后的数据
        currentSelect: '',
        boxStyle: {} // box框样式
      }
    },
    mounted () {
      if (this.data && this.data.length > 0) {
        this.processedData = this.handleData(this.data)
        this.handleBoxStyle()
      }
    },
    watch: {
      data (v, ov) {
        this.processedData = this.handleData(this.data)
        this.handleBoxStyle()
      }
    },
    methods: {
      /**
       * 不同车道不同颜色显示处理
       * @param item
       */
      styleObject (item) {
        let style = {}
        style['backgroundColor'] = filters.formatTollLaneTypeColor(item['type'], this.tollLaneType)
        return style
      },
      /**
       * 是否审核通过显示颜色
       * @param item
       * @returns {{color: string}}
       */
      styleCheckStatus (item) {
        const defaultColor = '#72758d'
        const checkFailColor = '#f25555'
        let color = '#72758d'
        if (item.type === 1) {
          if (this.etcLaneCheckStatus === '不通过') {
            color = checkFailColor
          } else {
            color = defaultColor
          }
        }
        if (item.type === 2) {
          if (this.mtcLaneCheckStatus === '不通过') {
            color = checkFailColor
          } else {
            color = defaultColor
          }
        }
        if (item.type === 3) {
          if (this.mixLaneCheckStatus === '不通过') {
            color = checkFailColor
          } else {
            color = defaultColor
          }
        }
        return {
          color: color
        }
      },
      /**
       * 数据处理
       * @param data
       * @returns {*}
       */
      handleData (data) {
        data.forEach((el) => {
          el['tollPlazaId'] = el['id'].toString().substring(0, 18)
          el['num'] = el['id'].toString().substring(18, 20)
          el['reserveNum'] = el['id'].toString().substring(20, 21)
        })
        return data
      },
      /**
       * box框样式
       */
      handleBoxStyle () {
        const length = this.data.length
        const max = 6 // 车道默认显示最大值
        const boxWidth = 257 // 最大box宽度值
        let reallyBoxWidth = boxWidth // 最终实际宽度
        const everyLaneWidth = boxWidth / max // 每个车道宽度
        let overflowX = 'scroll'
        if (length < max) {
          reallyBoxWidth = everyLaneWidth * length
          overflowX = 'hidden'
        }
        if (length === max) {
          overflowX = 'hidden'
        }
        let style = {}
        style['width'] = reallyBoxWidth + 'px'
        style['overflowX'] = overflowX
        this.boxStyle = style
      },
      /**
       * 车道点击事件
       * @param item
       */
      handleLaneClick (item) {
        this.currentSelect = item.id
        this.$emit('handleLaneClick', item)
      }
    },
    components: {}
  }
</script>
