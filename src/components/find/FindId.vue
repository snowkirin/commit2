<template>
  <div class="contents">
    <div class="contents-header">
      <h3>아이디 찾기</h3>
      <p>가입 당시 입력한 휴대전화 번호를 통해 아이디를 찾을 수 있습니다.</p>
    </div>
    <div class="content">
      <form>
        <div class="row">
          <div class="text-field">
            <input
              class="form-input"
              type="text"
              name=""
              placeholder="이름"
              v-model="userName"
            >
          </div>
        </div>
        <div class="row">
          <div class="grid-flex grid-fixed">
            <div class="column">
              <div class="text-field">
                <input
                  class="form-input"
                  type="tel"
                  name=""
                  placeholder="휴대전화"
                  v-model="phoneNumber"
                >
              </div>
            </div>
            <div class="column w-27">
              <button
                class="btn btn-secondary h-50"
                type="button"
                @click="clickPhoneVerify"
              >
                인증
              </button>
            </div>
          </div>

        </div>
        <div class="row">
          <div class="grid-flex grid-fixed">
            <div class="column">
              <div class="text-field">
                <input
                  class="form-input"
                  type="text"
                  name=""
                  v-model="authNumber"
                  placeholder="인증번호">
              </div>
            </div>
            <div class="column w-27">
              <button
                class="btn btn-secondary h-50"
                type="button"
                @click="clickAuthConfirm"
              >
                확인
              </button>
            </div>
          </div>
          <p v-if="authErr" class="txt-error">
            {{ authErrMessage }}
          </p>
        </div>
        <div class="button-wrap">
          <!--TODO: submit?-->
          <button
            type="button"
            class="btn btn-primary h-56"
            @click="clickComplete"
          >
            다음
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'findId',
  data() {
    return {
      authErr: false,
      authErrMessage: '',
      userName: '',
      phoneNumber: '',
      authNumber: ''
    };
  },
  computed: mapGetters({
    FindIdAuth: 'auth/FindIdAuth',
    isFindIdAuth: 'auth/isFindIdAuth'
  }),
  methods: {
    ...mapActions({
      postFindId: 'auth/postFindId',
      postFindIdAuth: 'auth/postFindIdAuth'
    }),

    clickPhoneVerify() {
      const formData = {
        name: this.userName,
        phone: this.phoneNumber
      };

      if (_.isEmpty(formData.name)) {
        this.$dialog.alert('이름을 입력해주세요.', {
          okText: '확인',
          customClass: 'zuly-alert',
          backdropClose: true
        });
        return;
      }
      if (_.isEmpty(formData.phone)) {
        this.$dialog.alert('휴대폰 번호를 입력해주세요.', {
          okText: '확인',
          customClass: 'zuly-alert',
          backdropClose: true
        });
        return;
      }

      this.postFindId(formData).then(res => {
        if (res.data.result) {
          alert('인증번호를 입력해 주세요.');
          this.startTimer();
          this.authErr = true;
        } else if (!res.data.result) {
          this.$dialog.alert('이름을 정확히 입력해주세요.', {
            okText: '확인',
            customClass: 'zuly-alert',
            backdropClose: true
          });
        } else {
          this.$dialog.alert('통신오류가 발생하였습니다.', {
            okText: '확인',
            customClass: 'zuly-alert',
            backdropClose: true
          });
        }
      });
    },
    clickAuthConfirm() {
      const formData = {
        authId: this.FindIdAuth,
        authNumber: this.authNumber
      };

      if (_.isEmpty(formData.authNumber)) {
        this.$dialog.alert('인증번호를 입력해주세요.', {
          okText: '확인',
          customClass: 'zuly-alert',
          backdropClose: true
        });
        return;
      }

      this.postFindIdAuth(formData, 'id').then(res => {
        if (res.data.result) {
          this.$dialog.alert('인증되었습니다.', {
            okText: '확인',
            customClass: 'zuly-alert',
            backdropClose: true
          });
          this.stopTimer();
        } else if (!res.data.result) {
          this.$dialog.alert('인증번호를 정확히 입력해주세요.', {
            okText: '확인',
            customClass: 'zuly-alert',
            backdropClose: true
          });
        } else {
          this.$dialog.alert('통신오류가 발생하였습니다.', {
            okText: '확인',
            customClass: 'zuly-alert',
            backdropClose: true
          });
        }
      });
    },
    clickComplete() {
      if (this.isFindIdAuth) {
        this.$router.push({ path: '/find/id-success' });
      } else {
        this.$dialog.alert('인증 후 진행해주세요.', {
          okText: '확인',
          customClass: 'zuly-alert',
          backdropClose: true
        });
      }
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

        this.authErrMessage = `메시지를 확인하시고 인증번호를 입력해주세요. ${minutes}:${seconds}`;

        if (printTimer <= 0) {
          clearInterval(interval);
        }
      }, 1000);

      window.interval = interval;
    },
    stopTimer() {
      this.authErr = false;
      clearInterval(window.interval);
    }
  }
};
</script>
<style scoped lang="scss" src="@/assets/css/login-style.scss">
</style>
<style scoped lang="scss">
</style>
