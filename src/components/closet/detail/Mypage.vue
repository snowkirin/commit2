<template>
  <div class="contents">
    <div class="contents-header">
      <h3>나의 정보를 변경 하실 수 있습니다.</h3>
    </div>
    <div class="content">
      <vue-json-pretty :data="Mypage"></vue-json-pretty>
      <div>

        <form>
          <!-- 휴대폰-->
          <div>
            <div class="form-title-wrap">
              <p class="txt-form-title">휴대폰 번호</p>
            </div>

            <div class="form-row">
              <div class="grid-flex grid-fixed">
                <div class="column">
                  <div class="text-field">
                    <input
                      type="text"
                      readonly
                      :value="initData.phone_no">
                  </div>
                </div>
                <div class="column w-26 o-3">
                  <button
                    type="button"
                    class="btn btn-secondary h-50"
                    @click="clickTogglePhone"
                  >
                    {{ isFlag.phoneNumber ? '변경 취소' : '변경'}}
                  </button>
                </div>
              </div>
            </div>

            <div v-if="isFlag.phoneNumber" class="form-row">
              <div class="grid-flex grid-fixed">
                <div class="column">
                  <div class="text-field">
                    <input
                      type="text"
                      name="latestPhoneNumber"
                      ref="latestPhoneNumberInput"
                      v-model.trim="latestData.phone_no"
                    >
                  </div>
                </div>
                <div class="column w-26 o-3">
                  <button
                    type="button"
                    class="btn btn-secondary h-50"
                    ref="latestPhoneNumberButton"
                    @click="clickSendPhoneAuth"
                  >
                    인증 전송
                  </button>
                </div>
              </div>
            </div>

            <div v-if="isFlag.phoneAuth" class="form-row">
              <div class="grid-flex grid-fixed">
                <div class="column">
                  <div class="text-field">
                    <input type="text" v-model="phoneAuthNumber">
                  </div>
                </div>
                <div class="column w-26 o-3">
                  <button type="button" class="btn btn-secondary h-50" @click="clickChangePhone">변경</button>
                </div>
              </div>
              <p
                class="txt-error">
                {{ authErrMessage }}
              </p>
            </div>

          </div>
        </form>
        <form data-vv-scope="password">
          <!--비밀번호 -->
          <div>
            <div class="form-title-wrap">
              <p class="txt-form-title">비밀번호 변경</p>
            </div>

            <div class="form-row">
              <div class="grid-flex grid-fixed">
                <div class="column w-71">
                  <div class="text-field">
                    <input type="text">
                  </div>
                </div>
              </div>
            </div>
            <div class="form-row">
              <div class="grid-flex grid-fixed">
                <div class="column w-71">
                  <div class="text-field">
                    <input type="text">
                  </div>
                </div>
              </div>
            </div>
            <div class="form-row">
              <div class="grid-flex grid-fixed">
                <div class="column">
                  <div class="text-field">
                    <input type="text">
                  </div>
                </div>
                <div class="column w-26 o-3">
                  <button type="button" class="btn btn-primary h-50">변경</button>
                </div>
              </div>
            </div>
          </div>
        </form>

        <!--결재 카드-->
        <div>
          <div class="form-title-wrap">
            <p class="txt-form-title">결제 카드</p>
            <p>카드 정보 : {{ !initData.card_name?null:initData.card_name.substring(0,2) }} (일시불) / 마지막 3자리: {{
              !initData.card_number?null:initData.card_number.substring(initData.card_number.length -3) }}</p>
          </div>
          <div class="form-row">
            <div class="grid-flex grid-fixed">
              <div class="column">
                <div class="text-field">
                  <input type="text">
                </div>
              </div>
              <div class="column w-23 o-3">
                <div class="text-field">
                  <input type="text">
                </div>
              </div>
            </div>
          </div>
          <div class="form-row">
            <div class="grid-flex grid-fixed">
              <div class="column">
                <div class="text-field">
                  <input type="text">
                </div>
              </div>
            </div>
          </div>
          <div class="form-row">
            <div class="grid-flex grid-fixed">
              <div class="column">
                <div class="text-field">
                  <input type="text">
                </div>
              </div>
              <div class="column">
                **
              </div>
              <div class="column w-26 o-3">
                <button type="button" class="btn btn-primary h-50">변경</button>
              </div>
            </div>
          </div>
        </div>
        <!--주소-->
        <div>
          <div class="form-title-wrap">
            <p class="txt-form-title">주소</p>
          </div>
          <div class="form-row">
            <div class="grid-flex grid-fixed">
              <div class="column">
                <div class="text-field">
                  <input
                    type="text"
                    :value="_.isEmpty(latestData.zipcode) ? initData.zipcode : latestData.zipcode"
                    readonly
                    @click="clickOpenPostCode"
                  >
                </div>
              </div>
              <div class="column w-26 o-3">
                <button
                  type="button"
                  class="btn btn-secondary h-50"
                  @click="clickOpenPostCode"
                >
                  주소 찾기
                </button>
              </div>
            </div>
          </div>
          <div class="form-row" v-if="isFlag.postCode">
            <div style="position: relative;max-height: 400px; overflow: auto;">
              <div>우편번호 검색 <button type="button" @click="clickClosePostCode">X</button></div>
              <DaumPostCode style="border: 1px solid #3d3d35;"></DaumPostCode>

            </div>

          </div>
          <div class="form-row">
            <div class="grid-flex grid-fixed">

              <div class="column">
                <div class="text-field">
                  <input
                    type="text"
                    readonly
                    :value="_.isEmpty(latestData.address) ? initData.address : latestData.address"
                    @click="clickOpenPostCode"
                  >
                </div>
              </div>
            </div>
          </div>
          <div class="form-row">
            <div class="grid-flex grid-fixed">

              <div class="column">
                <div class="text-field">
                  <input type="text" ref="">
                </div>
              </div>
              <div class="column w-26 o-3">
                <button type="button" class="btn btn-primary h-50">변경</button>
              </div>
            </div>
          </div>
        </div>
        <!--공동 현관-->
        <div>
          <div class="form-title-wrap">
            <p class="txt-form-title">공동 현관 번호</p>
          </div>
          <div class="form-row">
            <div class="grid-flex grid-fixed">
              <div class="column">
                <div class="text-field">
                  <input type="text">
                </div>
              </div>
              <div class="column w-26 o-3">
                <button type="button" class="btn btn-primary h-50">변경</button>
              </div>
            </div>
          </div>
        </div>
        <!--기념-->
        <div>
          <div class="form-title-wrap">
            <p class="txt-form-title">기념일</p>
          </div>
          <div class="form-row">
            <div class="grid-flex grid-fixed">
              <div class="column">
                <div class="text-field">
                  <input type="text">
                </div>
              </div>
              <div class="column w-26 o-3">
                <button type="button" class="btn btn-primary h-50">변경</button>
              </div>
            </div>
          </div>
        </div>
        <!--회원 가입일-->
        <div v-if="false">
          <div class="form-title-wrap">
            <p class="txt-form-title">회원 가입일</p>
          </div>
          <div class="form-row">
            <div class="grid-flex grid-fixed">
              <div class="column">
                <div class="text-field">
                  <input type="text">
                </div>
              </div>
              <div class="column">
                <button type="button" class="btn btn-primary h-50">회원탈퇴</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import VueJsonPretty from 'vue-json-pretty';

const alertObject = {
  type: 'alert', // 타입
  customClass: 'popup-custom-class', // 커스텀 클래스 네임
  disableOverlayClick: false, // 오버레이 클릭시 닫기 방지
  customCloseBtnText: '확인' // 닫기 버튼 텍스트
};

export default {
  name: 'mypage',
  components: {
    VueJsonPretty
  },
  data() {
    return {
      initData: {}, // 기본값
      latestData: {
        email: '',
        name: '',
        phone_no: '',
        zipcode: '',
        address: '',
        address_detail: '',
        memorial_day: '',
        delivery_day: null,
        delivery_date: '',
        address_password: '',
        card_name: '',
        card_number: '',
        stylist: ''
      }, // v-model 적용될 값
      isFlag: {
        // Show / Hide할 Flag들이 들어갈곳
        phoneNumber: false,
        phoneAuth: false,
        postCode: false,
      },
      authErrMessage: '',
      phoneAuthNumber: '',
    };
  },
  computed: {
    ...mapGetters({
      Mypage: 'member/Mypage'
    })
  },
  methods: {
    ...mapActions({
      getMypage: 'member/getMypage'
    }),
    setMypageData() {
      this.initData = this.Mypage;
    },
    startTimer() {
      const timer =
        Date.parse(new Date(new Date().getTime() + 3 * 60 * 1000)) / 1000;
      let minutes;
      let seconds;

      if (window.interval) clearInterval(window.interval);

      const interval = setInterval(() => {
        const currentTime = Date.parse(new Date()) / 1000;
        const printTimer = timer - currentTime;

        minutes = parseInt(printTimer / 60, 10);
        seconds = parseInt(printTimer % 60, 10);

        minutes = minutes < 10 ? `0${minutes}` : minutes;
        seconds = seconds < 10 ? `0${seconds}` : seconds;

        this.authErrMessage = `메시지를 확인하시고 인증번호를 입력해주세요.  ${minutes}:${seconds}`;

        if (printTimer <= 0) {
          clearInterval(interval);
          _.assign(alertObject, {
            message: '시간이 초과되었습니다. 다시 인증해주십시오.'
          });
          this.$refs.alert.openSimplert(alertObject);
        }
      }, 1000);

      window.interval = interval;
    },
    clickTogglePhone() {
      if (this.isFlag.phoneAuth) {
        this.$refs.latestPhoneNumberInput.disabled = false;
        this.$refs.latestPhoneNumberButton.disabled = false;
        clearInterval(window.interval);
        this.authErrMessage = '';
        this.isFlag.phoneAuth = false;
      }
      this.isFlag.phoneNumber = !this.isFlag.phoneNumber;

    },
    clickSendPhoneAuth() {
      const regexPhoneNumber = /^\d{3}\d{3,4}\d{4}$/;
      if (this.latestData.phone_no === this.initData.phone_no) {
        alert('같은 번호로는 변경이 불가능 합니다.');
        return;
      }
      if (_.isEmpty(this.latestData.phone_no)) {
        alert('핸드폰번호를 입력해 주세요.');
        return;
      } else {
        if (_.isEmpty(this.latestData.phone_no.match(regexPhoneNumber))) {
          alert('핸드폰번호를 정확히 입력해 주세요.');
          return;
        }
      }

      this.$refs.latestPhoneNumberInput.disabled = true;
      this.$refs.latestPhoneNumberButton.disabled = true;

      this.isFlag.phoneAuth = true;
      this.startTimer();
    },
    clickChangePhone() {
      if (_.isEmpty(this.phoneAuthNumber)) {
        alert('인증번호를 입력해 주세요.');
        return;
      }

      // 성공 했다면
      this.$refs.latestPhoneNumberInput.disabled = false;
      this.$refs.latestPhoneNumberButton.disabled = false;
      clearInterval(window.interval);
      this.authErrMessage = '';
      this.isFlag.phoneNumber = false;
      this.isFlag.phoneAuth = false;

      // 성공 못했다면
      alert('정확히 입력해 주세요.');

    },
    clickChangePassword() {
      // 비밀번호 변경
    },
    clickChangePayment() {
      // 결제 변경
    },
    clickOpenPostCode() {
      this.isFlag.postCode = true;
    },
    clickClosePostCode() {
      this.isFlag.postCode = false;
    },
    clickChangeAddr() {
      // 주소 변경
    },
    clickChangeFrontNumber() {
      // 공동 현관 비밀번호 변경
    },
    clickChangeAnn() {
      // 기념일 변경
    }
  },
  async created() {
    await this.getMypage();
    this.setMypageData();
  }
};
</script>

<style scoped lang="scss" src="@/assets/css/closet-style.scss">
</style>
<style scoped lang="scss">
  input[readonly] {
    color: #bbb;
  }

  .form-row {
    margin-bottom: 10px;
    &:last-child {
      margin-bottom: 0;
    }
  }
</style>
