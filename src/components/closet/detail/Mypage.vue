<template>
  <div class="contents">
    <div class="contents-header">
      <h3>나의 정보를 변경 하실 수 있습니다.</h3>
    </div>
    <div class="content">
      <div>
        <div>
          <p class="txt-form-title"></p>
          <div class="form-row">
            <div class="text-field">
              <input type="text">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'mypage',
  components: {
  },
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters({
      Mypage: 'member/Mypage'
    }),
  },
  methods: {
    ...mapActions({
      getMypage: 'member/getMypage'
    }),
  },
  async created() {
    await this.getMypage()
  }
};
</script>

<style scoped lang="scss" src="@/assets/css/closet-style.scss">
</style>
<style scoped lang="scss">
</style>
