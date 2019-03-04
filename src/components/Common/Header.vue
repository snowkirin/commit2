<template>
  <div class="header">
    <BurgerMenu/>
  </div>
</template>

<script>
  import BurgerMenu from "@/components/Common/BurgerMenu.vue";
  export default {
    name: "Header",
    components: {
      BurgerMenu
    }
  }
</script>

<style scoped lang="scss">
  .header {
    height: 100px;
    -webkit-box-shadow: 0 1px 2px 0 rgba(60,64,67,.3), 0 2px 6px 2px rgba(60,64,67,.15);
    -moz-box-shadow: 0 1px 2px 0 rgba(60,64,67,.3), 0 2px 6px 2px rgba(60,64,67,.15);
    box-shadow: 0 1px 2px 0 rgba(60,64,67,.3), 0 2px 6px 2px rgba(60,64,67,.15);
  }
</style>
