<template>
    <div class="circle-wrapper" :style="wrapperStyle">
      <Row :gutter="16" class="row-wrapper">
          <Col v-for="(item,index) in labelList" :span="span">
              <p class="unit-p">{{item.value}}{{item.unit}}</p>
              <p class="text-p">{{item.text}}</p>
          </Col>
      </Row>
      <i-circle
        :size="size"
        :trail-width="8"
        :stroke-width="9"
        :percent="percent"
        stroke-linecap="square"
        :stroke-color="color">
        <div class="demo-Circle-custom">
            <h1 :style="style">{{this.percent}}%</h1>
            <span>
                完成比
            </span>
        </div>
    </i-circle>
    </div>
    
</template>
<script>
export default {
  props: {
    width:{
      type: Number,
      default: 200
    },
    labelList:{
      type:Array,
      default:()=>[]
    },
    size: {
      type: Number,
      default: 130
    },
    fontSize: {
      type: Number,
      default: 28
    },
    color: {
      type: String,
      default: "#43a3fb"
    },
    percent: {
      type: Number,
      default: 0
    }
  },
  computed: {
    style() {
      return {
        color: this.color,
        fontSize: this.fontSize
      };
    },
    wrapperStyle() {
      return {
        width: this.width+'px'
      };
    },
    span(){
      return Math.floor(24/this.labelList.length)
    }
  }
};
</script>
<style lang="less">
.ivu-chart-circle-inner {
  top: 55%;
}
.circle-wrapper {
  display: inline-block;
  text-align: center;
  .row-wrapper{
    margin-bottom: 10px;
  }
  .unit-p{
    font-weight: bold;
  }
}
.demo-Circle-custom {
  & h1 {
    // color: #43a3fb;
    // font-size: 28px;
    font-weight: normal;
  }
  & p {
    color: #657180;
    font-size: 14px;
    margin: 10px 0 10px;
  }
  & span {
    display: block;
    padding-top: 5px;
    color: #657180;
    font-size: 14px;
  }
  & span i {
    font-style: normal;
    color: #3f414d;
  }
}
</style>