<template>
  <div class="signup subContent mauto">
    <div class="content-title mt70">정기구독/회원가입</div>
    <div class="signupLine mt25"></div>

    <div class="w100 mt30 mauto">
      <div class="signup-area d-inlinetable" style="margin-right: 30px;">
        <div class="signup-title-detail">사용자 계정</div>
        <div class="field" :class="{ error: errors.has('name') }">
          <input type="text" name="name" class="form-login-input mt20" placeholder="이름" v-validate="'required'" maxlength="15" />
          <span class="error" v-show="errors.has('name')">이름을 입력해주세요.</span>
        </div>
        <div class="field" :class="{ error: errors.has('email') }">
          <input type="text" name="email" class="form-login-input mt12" placeholder="이메일" v-validate="'required|email'" maxlength="50" />
          <span class="error" v-show="errors.has('email')">이메일을 정확하게 입력해주세요.</span>
        </div>
        <div class="field" :class="{ error: errors.has('password') }">
          <input type="password" name="password" class="form-login-input mt12" placeholder="비밀번호 8자리 이상의 영문,숫자,특수문자 포함" v-validate="{ required: true, regex: pwdRegex }" @keyup="pwdCheck(errors.has('password'))" maxlength="256" />
          <span class="error" v-show="errors.has('password')">{{ pwdMsg }}</span>
        </div>
        <div class="field" :class="{ error: errors.has('password_confirm') }">
          <input type="password" name="password_confirm" class="form-login-input mt12" placeholder="비밀번호 확인" v-validate="'required|confirmed:password'" @change="pwdConfirm(errors.has('passwordConfirmation'))" maxlength="256" />
          <span class="error" v-show="errors.has('password_confirm')">비밀번호가 일치하지 않습니다.</span>
        </div>
      </div>
      <div class="signup-area signup-area-last d-inlinetable">
        <div class="signup-title-detail">연락처 정보</div>
        <div class="field" :class="{ error: errors.has('phone') }">
          <div class="inputGroup">
            <input type="text" name="phone" class="form-login-group mt20" placeholder="휴대전화" style="width: 72%;" v-validate="'required'" maxlength="14" />
            <div style="display: inline-table; width: 3%;"></div>
            <button id="phoneVerify" class="button-grey" style="width: 25%;" @click="phoneVerify">인증</button>
          </div>
          <span class="error" v-show="errors.has('phone')">휴대전화를 입력해주세요.</span>
        </div>
        <div class="field" :class="{ error: errors.has('phone_auth_number') }">
          <div class="inputGroup">
            <input type="text" name="phone_auth_number" class="form-login-group mt12" placeholder="인증번호" style="width: 72%;" v-validate="'required'" />
            <div style="display: inline-table; width: 3%;"></div>
            <button id="authKeyConfirm" class="button-grey" style="width: 25%;" @click="authKeyConfirm">확인</button>
          </div>
          <span class="error" v-show="authErr">{{ authErrMessage }}</span>
        </div>
        <div class="field datepicker">
          <datepicker name="ann" class="mt12" input-class="form-login-input" placeholder="기념일을 입력하시면, 기념일날 할인 쿠폰 지급" language="ko" format="MM.dd"></datepicker>
        </div>
        <div class="field" :class="{ error: errors.has('zipcode') }">
          <div class="inputGroup">
            <input type="text" name="zipcode" class="form-login-group mt12" placeholder="우편번호" style="width: 72%;" v-validate="'required'" />
            <div style="display: inline-table; width: 3%;"></div>
            <button class="button-grey" style="width: 25%;" @click="openDaumPopup">주소찾기</button>
          </div>
        </div>
        <div class="field" :class="{ error: errors.has('address') }">
          <input type="text" name="address" class="form-login-input mt12" placeholder="주소" v-validate="'required'" maxlength="30" />
          <span class="error" v-show="errors.has('address')">주소가 입력되지 않았습니다.</span>
        </div>
        <div class="field" :class="{ error: errors.has('detail_address') }">
          <input type="text" name="detail_address" class="form-login-input mt12" placeholder="상세주소" v-validate="'required'" maxlength="30" />
          <span class="error" v-show="errors.has('detail_address')">상세주소가 입력되지 않았습니다.</span>
        </div>
        <div class="signup-chk-area mt15">
          <label class="container">
            <input type="checkbox" name="private_flag" value="Y" />
            <span class="checkmark"></span>
          </label>
          <div class="checkboxText">
            개인정보의 수집 및 이용에 대한 동의
            <span style="margin-left: 5px;" @click="viewModal('private')">자세히 보기</span>
          </div>
        </div>
        <div class="signup-chk-area mt12">
          <label class="container">
            <input type="checkbox" name="use_flag" value="Y" />
            <span class="checkmark"></span>
          </label>
          <div class="checkboxText">
            이용약관
            <span style="margin-left: 5px;" @click="viewModal('use')">자세히 보기</span>
          </div>
        </div>
      </div>
      <div class="mt40">
        <div id="next-btn" class="next-btn" style="width: 392px; float: right;">
          <button class="button-login" @click="validateBeforeSubmit">
            다음 (12/13)
          </button>
        </div>
      </div>
    </div>
    <address-modal ref="address" dataId="address"></address-modal>
    <signup-modal ref="private" dataId="private" title="개인정보 관리 지침" :content="privateText"></signup-modal>
    <signup-modal ref="use" dataId="use" title="이용약관"></signup-modal>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Datepicker from 'vuejs-datepicker';
import AddressModal from '@/components/common/AddressModal';
import SignupModal from '@/components/common/SignupModal';
import PrivateText from '@/info/private';


export default {
  name: 'signUp-first',
  components: {
    Datepicker,
    AddressModal,
    SignupModal,
  },
  data() {
    return {
      pwdRegex: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*?&^])[A-Za-z\d$@$!%*?&]{8,}/,
      pwdMsg: '비밀번호를 입력해주세요.',
      isPwd: false,
      isPwdConfirm: false,
      authErr: false,
      authErrMessage: '',
      privateText: PrivateText.text,
    };
  },
  computed: mapGetters({
    isLogin: 'login/isLogin',
    phoneAuthKey: 'signup/getPhoneAuthKey',
    phoneVerifyResult: 'signup/getPhoneVerify',
    phoneAuth: 'signup/getPhoneAuth',
  }),
  watch: {
    phoneVerifyResult(value) {
      if (value) {
        this.startTimer();
        this.authErr = true;
      }
    },
  },
  methods: {
    ...mapActions({
      setFirstData: 'signup/setFirstData',
      actPhoneVerify: 'signup/phoneVerify',
      actPhoneCheckVerify: 'signup/phoneCheckVerify',
    }),
    viewModal(ref) {
      this.$refs[ref].openModal();
    },
    closeModal(ref) {
      this.$refs[ref].closeModal();
    },
    pwdCheck(isBoolean) {
      const pwd = document.querySelector('input[name=password]');

      let checkBoolean = isBoolean;
      if (pwd.value === '') {
        if (!checkBoolean) checkBoolean = !checkBoolean;
        this.pwdMsg = '비밀번호를 입력해주세요.';
      } else {
        this.pwdMsg = '비밀번호가 안전하지 않습니다. (최소 8자리 이상의 영문,숫자,특수문자 포함)';
      }

      if (checkBoolean) this.isPwd = false;
      else this.isPwd = true;
    },
    pwdConfirm(isBoolean) {
      if (isBoolean) this.isPwdConfirm = false;
      else this.isPwdConfirm = true;
    },
    checkBoxEvt(evt) {
      const chkbox = evt.path[1].querySelector('input[type=checkbox]');
      if (chkbox.checked) chkbox.checked = false;
      else chkbox.checked = true;
    },
    async phoneVerify() {
      const email = document.querySelector('input[name=email]');
      const phone = document.querySelector('input[name=phone]');

      if (!this.$common.InputDataValidation(email, '이메일을 먼저 입력해주세요.', true)) return;

      this.$validator.validate('phone', phone.value).then((result) => {
        if (result) {
          if (this.$common.phoneValidation(phone.value)) {
            this.actPhoneVerify({
              email: email.value,
              phone: phone.value.split('-').join(''),
            });

            return true;
          }

          alert('올바른 휴대폰번호를 입력해주세요.');
        }

        phone.focus();
        return false;
      });
    },
    async authKeyConfirm() {
      const phoneAuthNumber = document.querySelector('input[name=phone_auth_number]');

      if (!this.phoneAuthKey) {
        alert('먼저 휴대전화를 입력하고 인증버튼을 눌러주세요.');
        return false;
      }

      if (!this.$common.InputDataValidation(phoneAuthNumber, '인증번호를 입력해주세요.', true)) return false;

      await this.actPhoneCheckVerify({
        authNumber: phoneAuthNumber.value,
      });

      if (this.phoneAuth) {
        const phone = document.querySelector('input[name=phone]');

        alert('인증되었습니다.');
        document.querySelector('#phoneVerify').disabled = true;
        document.querySelector('#authKeyConfirm').disabled = true;
        phone.disabled = true;
        phoneAuthNumber.disabled = true;
        this.authErr = false;
      } else alert('인증번호를 다시 확인하시고 진행해주세요.');

      return true;
    },
    validateBeforeSubmit() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          const privateFlag = document.querySelector('input[name=private_flag]:checked');
          const useFlag = document.querySelector('input[name=use_flag]:checked');

          if (!privateFlag) {
            alert('개인정보의 수집 및 이용에 동의해주세요.');
            return;
          }
          if (!useFlag) {
            alert('이용약관을 확인해주세요.');
            return;
          }
          if (this.phoneAuth) {
            const name = document.querySelector('input[name=name]').value;
            const email = document.querySelector('input[name=email]').value;
            const phone = document.querySelector('input[name=phone]').value;
            const ann = document.querySelector('input[name=ann]').value;
            const zipcode = document.querySelector('input[name=zipcode]').value;
            const addr = document.querySelector('input[name=address]').value;
            const addrDetail = document.querySelector('input[name=detail_address]').value;

            const signup = {
              name,
              email,
              password: document.querySelector('input[name=password]').value,
              phone,
              ann,
              zipcode,
              addr,
              addrDetail,
            };

            this.setFirstData(signup);
            this.$localStorage.set('S14', JSON.stringify({
              name,
              email,
              phone,
              ann,
              zipcode,
              addr,
              addrDetail,
            }));

            this.$router.push({ path: '/join/signup/2' });
            return;
          }

          alert('휴대전화 인증을 진행해주세요.');
          return;
        }

        document.querySelectorAll('div.error')[0].setAttribute('tabindex', -1);
        document.querySelectorAll('div.error')[0].focus();
        document.querySelectorAll('div.error')[0].setAttribute('tabindex', null);
      });
    },
    openDaumPopup() {
      this.viewModal('address');
      const zipcode = document.querySelector('input[name=zipcode]');
      const address = document.querySelector('input[name=address]');
      const detailAddress = document.querySelector('input[name=detail_address]');

      const daum = window.daum;

      daum.postcode.load(() => {
        new window.daum.Postcode({
          width: '100%',
          height: '433',
          onclose: (state) => {
            if (state === 'COMPLETE_CLOSE') {
              this.closeModal('address');
            }
          },
          oncomplete: (data) => {
            zipcode.value = data.zonecode;

            if (data.userSelectedType === 'R') address.value = data.roadAddress;
            else address.value = data.jibunAddress;

            this.$validator.validate('zipcode');
            this.$validator.validate('address');

            detailAddress.focus();
          },
        }).embed(document.querySelector('div[name=addressArea]'), {});
      });
    },
    startTimer() {
      const timer = Date.parse(new Date(new Date().getTime() + (3 * 60 * 1000))) / 1000;
      let minutes;
      let seconds;

      if (window.interval) clearInterval(window.interval);

      const interval = setInterval(() => {
        const currentTime = Date.parse(new Date()) / 1000;
        const printTimer = timer - currentTime;

        minutes = parseInt(printTimer / 60, 10);
        seconds = parseInt(printTimer % 60, 10);

        minutes = (minutes < 10) ? `0${minutes}` : minutes;
        seconds = (seconds < 10) ? `0${seconds}` : seconds;

        this.authErrMessage = `메시지를 확인하시고 인증번호를 입력해주세요.  ${minutes}:${seconds}`;

        if (printTimer <= 0) {
          clearInterval(interval);
        }
      }, 1000);

      window.interval = interval;
    },
    btnFixedEvt() {
      const btn = document.getElementById('next-btn');
      btn.classList.remove('next-btn', 'next-btn-mobile');

      if (window.scrollY > 380) btn.classList.add('next-btn');
      else btn.classList.add('next-btn-mobile');
    },
  },
  created() {
    const htmlScript = document.createElement('script');
    htmlScript.setAttribute('src', 'https://ssl.daumcdn.net/dmaps/map_js_init/postcode.v2.js?autoload=false');
    document.head.appendChild(htmlScript);
  },
  mounted() {
    let localStorage = this.$localStorage.get('S14');

    if (localStorage) {
      localStorage = JSON.parse(localStorage);

      document.querySelector('input[name=name]').value = localStorage.name;
      document.querySelector('input[name=email]').value = localStorage.email;
      document.querySelector('input[name=phone]').value = localStorage.phone;
      document.querySelector('input[name=ann]').value = localStorage.ann;
      document.querySelector('input[name=zipcode]').value = localStorage.zipcode;
      document.querySelector('input[name=address]').value = localStorage.addr;
      document.querySelector('input[name=detail_address]').value = localStorage.addrDetail;
    }
  },
  beforeMount() {
    window.addEventListener('scroll', this.btnFixedEvt);
  },
  destroyed() {
    window.removeEventListener('scroll', this.btnFixedEvt);
  },
};
</script>

<style scoped>
.signupLine {
  height: 1px;
  opacity: 0.2;
  background-color: #333333;
}

.signup-area {
  width: 392px;
}

.signup-title-detail {
  font-size: 16px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: normal;
  text-align: left;
  color: #333333;
}

.signup-chk-area {
  height: 24px;
  display: table;
  cursor: pointer;
}

.checkboxText {
  text-align: left;
  display: table-cell;
  vertical-align: bottom;
  letter-spacing: -0.4px;
}

.checkboxText span {
  color: #566b9c;
  text-decoration: underline;
}

.field {
  text-align: left;
}

@media screen and (max-width: 486px) {
  .signup {
    padding: 0 4.8% 470px 4.8% !important;
  }

  .signup-area {
    width: 100%;
    margin-right: 0px !important;
  }

  .signup-area-last {
    margin-top: 30px;
  }

  .next-btn {
    width: 100% !important;
    float: none !important;
  }

  .next-btn-mobile {
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
