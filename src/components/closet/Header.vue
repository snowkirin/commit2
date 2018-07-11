<template>
  <div class="closet-header">
    <p class="user-info">
      {{ name }}님 옷장
      <!--{{ Authentication.userName }}님 옷장-->
    </p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'closet-header',
  data() {
    return {
      name: '김용주',
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
  }
  @media (min-width: 767px) {
    .closet-header {
      width: 1200px;
      margin: 0 auto;
      padding: {
        top: 17px;
        right: 32px;
        bottom: 19px;
        left: 0px;
      }
      font-weight: 300;
    }
    .user-info {
      font-size: 42px;
      letter-spacing: -3px;
      line-height: 62px;
    }
  }
</style>
