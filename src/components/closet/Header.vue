<template>
  <div class="closet-header">
    <p class="user-info">
      {{ User.displayName }}님 옷장
    </p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'closet-header',
  data() {
    return {};
  },
  computed: mapGetters({
    User: 'login/User'
  }),
  methods: {}
};
</script>

<style scoped lang="scss">
.closet-header {
  padding: 23px 18px 14px;
}
.user-info {
  @include fontSize(24px);
  font-weight: 100;
}
@media (min-width: 768px) {
  .closet-header {
    width: 708px;
    margin: 0 auto;
    padding-left: 0;
    padding-right: 0;
    padding-top: 19px;
    padding-bottom: 13px;
    font-weight: 300;
  }
  .user-info {
    @include fontSize(28px);
  }
}
@media (min-width: 1080px) {
  .closet-header {
    width: 1080px;
    padding-top: 30px;
    padding-bottom: 15px;
  }
  .user-info {
    @include fontSize(30px);
  }
}
</style>
