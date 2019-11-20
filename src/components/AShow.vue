<template>
  <div>
    <p>AShow：{{conent}}</p>
  </div>
</template>
<script>
export default {
  props: {
    conent: {
      type: [String, Number],
      default: ''
    }
  }
}
</script>
