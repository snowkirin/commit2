<template>
  <div>
    <BurgerMenu/>
    <router-view/>
  </div>

</template>

<script>
  import BurgerMenu from "@/components/Common/BurgerMenu.vue";
  export default {
    name: "Join",
    components: {
      BurgerMenu
    }
  }
</script>

<style scoped>

</style>
