<template>
<div>
  <Card shadow style="width:250px">
      <p slot="title">
          Classic film
      </p>
      <a href="#" slot="extra" @click.prevent="changeLimit">
          <Icon type="ios-loop-strong"></Icon>
          Change
      </a>
      <my-circle :percent="80" :label-list="labelList2" :width="200"></my-circle>
  </Card>
  <Card shadow style="width:450px">
      <p slot="title">
          Classic film
      </p>
      <a href="#" slot="extra" @click.prevent="changeLimit">
          <Icon type="ios-loop-strong"></Icon>
          Change
      </a>
      <my-circle :percent="50" :label-list="labelList" :color="color" :width="400"></my-circle>
  </Card>
  
</div>
</template>
<script>
  import MyCircle from '_c/my-circle'
    export default {
      components:{
        MyCircle
      },
      data(){
        return{
          labelList:[
            {
              value:10,
              unit:'条',
              text:'日指标'
            },
            {
              value:0.4,
              unit:'亿元',
              text:'全年指标'
            },
            {
              value:0.4,
              unit:'亿元',
              text:'全年指标'
            },
            {
              value:0.4,
              unit:'亿元',
              text:'全年指标'
            }
          ],
          labelList2:[
            {
              value:10,
              unit:'条',
              text:'日指标'
            },
            {
              value:0.4,
              unit:'亿元',
              text:'全年指标'
            }
          ],
          color:'red'
        }
      }
    }
</script>
<style lang="less">

</style>
