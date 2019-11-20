<template>
  <div>
    tel:{{messages}}
  </div>
</template>
<script>
export default {
  data () {
    return {
      messages: ''
    }
  },
  mounted () {
    this.$bus.$on('on-click', mes => {
      this.messages = mes
    })
  }
}
</script>
