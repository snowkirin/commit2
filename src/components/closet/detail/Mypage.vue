<template>
  <div class="contents">
    <div class="contents-header">
      <h3>나의 정보를 변경 하실 수 있습니다.</h3>
    </div>
    <div class="content">
      <div>
        <div>
          <p class="txt-form-title">휴대폰 번호</p>
          <div class="grid-flex grid-fixed">
            <div class="column">
              <div class="text-field">
                <input type="text">
              </div>
            </div>
            <div class="column">
              <button type="button" class="btn btn-secondary h-50">변경</button>
            </div>
          </div>
        </div>
        <div>
          <p class="txt-form-title">비밀번호 변경</p>
          <div class="grid-flex grid-fixed">
            <div class="column">

            </div>
            <div class="column">

            </div>
          </div>
        </div>
        <div>
          <p class="txt-form-title">결제 카드</p>
          <div class="grid-flex grid-fixed">
            <div class="column">

            </div>
            <div class="column">

            </div>
          </div>
        </div>
        <div>
          <p class="txt-form-title">주소</p>
          <div class="grid-flex grid-fixed">
            <div class="column">

            </div>
            <div class="column">

            </div>
          </div>
        </div>
        <div>
          <p class="txt-form-title">공동 현관 번호</p>
          <div class="grid-flex grid-fixed">
            <div class="column">

            </div>
            <div class="column">

            </div>
          </div>
        </div>
        <div>
          <p class="txt-form-title">기념일</p>
          <div class="grid-flex grid-fixed">
            <div class="column">

            </div>
            <div class="column">

            </div>
          </div>
        </div>
        <div>
          <p class="txt-form-title">회원 가입일</p>
          <div class="grid-flex grid-fixed">
            <div class="column">

            </div>
            <div class="column">

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
