<template>
  <div>
    {{id}}
  </div>
</template>
<script>
export default {
  props: {
    id: {
      type: String,
      default: 'xz'
    }
  },
  // beforeRouteUpdate (to, from, next) {
  //   console.log(to.name, from.name)
  // }
  //
}
</script>
