<!--  fasdklfjaslkfj -->
<template>
  <input :type="type" :placeholder="placeholder" @change="onChange($event.target.value)">
</template>

<script>
  export default {
    name: "Input",
    props: {
      type: {
        type: String,
        default: 'text'
      },
      placeholder: {
        type: String,
        default: ''
      }
    },
    methods: {
      onChange(value) {
        this.$emit('input', value);
      }
    }
  }
</script>

<style scoped lang="scss">
  input {
    border: 1px solid #cacaca;
  }
</style>
