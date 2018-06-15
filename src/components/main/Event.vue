<template>
  <div>
    <router-link
      class="btn-free-month"
      v-if="!Authentication.authenticated"
      to="/join/size">
      한달 무료 신청
      <span class="icon-arrow">&rightarrow;</span>
    </router-link>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  name: 'event',
  computed: mapGetters({
    Authentication: 'login/Authentication',
  }),
};
</script>

<style scoped lang="scss">
  .btn-free-month {
    position: fixed;
    display: inline-block;
    background-color: #333;
    color: #fff;
    left: 0;
    bottom: 0;
    right: 0;
    font-size: 18px;
    letter-spacing: -.9px;
    padding: 20px;
    cursor: pointer;
    text-decoration: none;
    &:hover {
      background-color: #fb5143;
    }
  }
  .icon-arrow {
    width: 26px;
    height: 18px;
    display: inline-block;
    text-indent: -9999em;
    overflow: hidden;
    background: url(/static/img/icons/zuly_icon.png) no-repeat -43px -8px;
    background-size: 215px 215px;
    position: absolute;
    right: 20px;

  }
</style>
