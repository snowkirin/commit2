<template>
  <div>
    <vue-json-pretty :data="data"></vue-json-pretty>
  </div>
</template>
<script>
  import VueJsonPretty from 'vue-json-pretty'
  export default {
    name: 'ModalProductDetail',
    props: ['data'],
    components: {
      VueJsonPretty
    },
    data() {
      return {
      }
    },
    created() {
    }
  }
</script>
<style scoped lang="scss">

</style>