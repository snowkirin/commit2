<template>
  <div class="content-header">
    <slot name="header"></slot>
    <slot name="content"></slot>
  </div>
</template>

<script>
  export default {
    name: "Title"
  }
</script>

<style scoped lang="scss">
  .content-header {
    text-align: center;
    h3 {
      font-size: 30px;
    }
    p {
      font-size: 15px;
      color: #797979;
    }
  }
</style>
