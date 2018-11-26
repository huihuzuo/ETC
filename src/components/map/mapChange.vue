<template>
  <div class="map-change">
    <div id="mapType">
      <div class="normal" :class="{ active: type == 'image' }" data-name="vector" @click="mapChange('image')">
        <span class="mapType-label">影像</span>
      </div>
      <div class="earth" :class="{ active: type == 'vector' }" data-name="earth" @click="mapChange('vector')">
        <span class="mapType-label">矢量</span>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
  .map-change {
    position: absolute;
    right: 15px;
    bottom: 82px;
    cursor: pointer;
    padding: 10px;
    border-radius: 3px;
    transition: .3s;
    z-index: 2;
    box-shadow:  0 2px 4px 0 rgba(99, 168, 235, 0.2);
    &:hover {
      background-color: rgba(255, 255, 255, 1);
    }
    #mapType {
      height: 66px;
      transition-property: width, background-color;
      transition-duration: .3s;
      width: 100px;
      &:hover{
        width: 166px;
        div:nth-child(1) {
          position: absolute;
          opacity: 1;
          right: 96px;
          &:hover{
            .threeW-wrap{
              display: block;
              width: 100%;
              .el-radio__label{
                padding-left: 2px;
              }
              .el-radio+.el-radio{
                margin-left: 0;
              }
            }
          }
        }
        div:nth-child(2) {
          position: absolute;
          opacity: 1;
          right: 10px;
        }
      }
      .panorama-wrap{
        position: absolute;
        top: 0px;
        right: 0;
        line-height: 25px;
        text-align: center;
        width: 80px;
        height: 25px;
        background-color: rgba(67, 73, 84, 0.7);
        display: none;
        font-size: 10px;
        color:#FFF;
      }
      .threeW-wrap{
        position: absolute;
        top: 0px;
        right: 0;
        line-height: 25px;
        text-align: center;
        width: 80px;
        height: 25px;
        background-color: rgba(67, 73, 84, 0.7);
        display: none;
        font-size: 10px;
        color:#FFF;
      }
      .active {
        border-color: rgba(170,170,170, 0.5);
        span {
          background-color: rgba(170,170,170, 0.5);
          color: #FFFFFF;
        }
      }
      div{
        height: 65px;
        width: 80px;
        float: left;
        border-radius: 3px;
        box-sizing: border-box;
        text-align: right;
        line-height: 65px;
        position: relative;
        border: solid 1px rgba(26, 130, 238, 1);
        transition: .3s;
        .mapType-label {
          position: absolute;
          bottom: 0;
          right: 0;
          display: inline-block;
          font-size: 12px;
          width: 30px;
          height: 18px;
          background-color: rgba(26, 130, 238, 1);
          line-height: 18px;
          color: #FFF;
          border-top-left-radius: 2px;
        }
        &:hover {
          border-color: rgba(44, 132, 206, 0.39);
          span {
            background-color: rgba(44, 132, 206, 0.39);
            color: #FFFFFF;
          }
        }
      }
      div:nth-child(1) {
        background: url("../../../static/images/maptype.png") 0 -65px no-repeat;
        position: absolute;
        right: 22px;
      }
      div:nth-child(2) {
        margin-left: 10px;
        background: url("../../../static/images/maptype.png") 0 0 no-repeat;
        position: absolute;
        right: 16px;
      }
      &:hover {
        border-color: #00a2d4;
      }
    }
  }

</style>
<script>
  export default {
    data () {
      return {
        type: ''
      }
    },
    mounted () {
      if (this.$route.meta && this.$route.meta.isShowMap) {
        if (!this.$Maps) {
          this.mapChange('vector')
        }
      }
    },
    watch: {
      '$route' (v, ov) {
        if (this.$route.meta && this.$route.meta.isShowMap) {
          if (!this.$Maps) {
            this.mapChange('vector')
          }
        }
      }
    },
    methods: {
      mapChange (type) {
        if (this.$route.meta && this.$route.meta.isShowMap) {
          this.type = type
          if (this.$Maps) {
            this.changeBaseLayer(type)
          } else {
            this.$emit('initMap')
          }
        }
      },
      changeBaseLayer (type) {
        let layers =  config.Maps.getBaseLayers()
        layers.forEach(layer => {
          if (layer.get('layerName') === type) {
            layer.setVisible(true)
          } else {
            layer.setVisible(false)
          }
        })
      }
    }
  }
</script>
