<template>
  <div class="style-btn-area mauto" :style="`width: ${btnSize}; margin-top: ${btnMarginTop}; ${customCss}`">
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
        다음 <span v-show="currentNumber !== ''">({{currentNumber}}/13)</span>
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
    currentNumber: {
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

@media screen and (max-width: 486px) {
  .button-grey{
    height: 60px !important;
  }
  .button-login{
    height: 60px !important;
  }
  .style-btn-area {
    position: fixed !important;
    width: 100% !important;
    bottom: 0 !important;
    left: 0 !important;
    z-index: 999 !important;
    margin-top: 0 !important;
    float: none !important;
  }
}
</style>
