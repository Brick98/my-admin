<template>
  <svg class="icon" aria-hidden="true" :style="style">
      <use :xlink:href="iconName"></use>
  </svg>
</template>
<script>
export default {
  props:{
    icon:{
      type:String,
      defaule:''
    },
    size:{
      type:Number,
      defaule:20
    }
  },
  computed:{
    iconName(){
      return `#icon-${this.icon}`
    },
    style(){
      return{
        fontSize:`${this.size}px`
      }
    }
  }
}
</script>
