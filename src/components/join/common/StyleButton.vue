<template>
  <div class="mauto" :style="`width: ${btnSize}; margin-top: ${btnMarginTop}; ${customCss}`">
    <template v-if="this.Authentication.authenticated">
      <template v-if="lastPage">
        <div style="width: 100%;">
          <button class="button-grey" @click="saveExit">
            저장 후 나가기
          </button>
        </div>
      </template>
      <template v-else>
        <div class="d-flex" style="justify-content: space-between;">
          <div style="width: 190px;">
            <button class="button-grey" @click="saveExit">
              저장 후 나가기
            </button>
          </div>
          <div style="width: 190px;">
            <button class="button-login" @click="moveNext">
              다음
            </button>
          </div>
        </div>
      </template>
    </template>
    <template v-else>
      <button class="button-login" @click="moveNext">
        다음
      </button>
    </template>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'styleButton',
  props: {
    currentLocation: {
      type: String,
      default: '',
    },
    btnSize: {
      type: String,
      default: '392px',
    },
    btnMarginTop: {
      type: String,
      default: '50px',
    },
    customCss: {
      type: String,
      default: '',
    },
    lastPage: {
      type: Boolean,
      default: false,
    },
  },
  components: {
  },
  computed: mapGetters({
    Authentication: 'login/Authentication',
    mypageStyleData: 'mypage/getMypageStyleData',
  }),
  methods: {
    ...mapActions({
      actSaveExit: 'signup/saveExit',
    }),
    moveNext() {
      this.$parent.moveNext();
    },
    async saveExit() {
      if (this.currentLocation === 'size') await this.$parent.saveSize();
      if (await this.actSaveExit(this.mypageStyleData)) {
        alert('정보수정이 완료되었습니다.');
        this.$router.push('/closet/style');
      } else {
        alert('잠시후 다시 시도해주세요.');
      }
    },
  },
};
</script>

<style scoped>
</style>
