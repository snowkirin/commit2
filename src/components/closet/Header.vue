<template>
  <div class="closet-header">
    <p class="user-info">
      {{ Authentication.userName }}님 옷장
    </p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'closet-header',
  data() {
    return {
    };
  },
  computed: mapGetters({
    Authentication: 'login/Authentication',
  }),
  methods: {
  },
};
</script>

<style scoped lang="scss">
  .closet-header {
    padding: 23px 18px 14px;
  }
  .user-info {
    font-size: 26px;
    letter-spacing: -1.8px;
    line-height: 34px;
    margin-left: -2px;
  }
  @media (min-width: 768px) {
    .closet-header {
      width: 1200px;
      margin: 0 auto;
      padding: {
        top: 9px;
        right: 32px;
        bottom: 20px;
        left: 0px;
      }
      font-weight: 300;
    }
    .user-info {
      font-size: 38px;
      letter-spacing: -3.4px;
      line-height: 57px;
      font-weight: 300;
    }
  }
</style>
