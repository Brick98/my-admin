<template>
  <div>
    email:
    <button @click="handleClick">按我</button>
  </div>
</template>
<script>
export default {
  methods: {
    handleClick () {
      this.$bus.$emit('on-click', 'hell world ')
    }
  },
  mounted () {
    console.log(this.$bus)
  }
}
</script>
