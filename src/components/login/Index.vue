<template>
  <div class="container">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'Login'
};
</script>

<style scoped lang="scss">
  .container {
    padding-bottom: 70px;
    @media(min-width: 768px) {
      padding-bottom: 100px;
    }
    @media (min-width: 1280px) {
      padding-bottom: 120px;
    }
  }
</style>
