<template>
  <div class="mypage mt44">
    <div class="main-point-text closet-title">나의 정보관리</div>
    <div class="closet-title-text mt20">
      나의 정보와 지불 방법을 변경 하실 수 있습니다.
    </div>
    <div class="mypage-content mt50">
      <div class="mypage-content-area">
        <div class="mypage-content-left" style="margin-bottom: 40px;">
          <div class="mypage-content-row">
            <div class="mypage-content-header">이름</div>
            <div class="mypage-content-data mt40">성신혜</div>
          </div>
          <div class="mypage-content-row" style="margin-top: 63px;">
            <div class="mypage-content-header">이메일</div>
            <div class="mypage-content-data">
              wonyong@onionground.com
              <button id="phoneVerify" class="button-grey" style="width: 25%; margin-left: 40px;" @click="phoneVerify">이메일 변경</button>
            </div>
          </div>
          <div class="mypage-content-row">
            <div class="mypage-content-header">비밀번호 변경</div>
            <div class="mypage-content-data mt20">
              <div class="field" :class="{ error: errors.has('ann') }">
                <input type="text" name="ann" class="form-login-input" style="width: 60%;" placeholder="현재 비밀번호" v-validate="'required'" />
                <span class="error" v-show="errors.has('ann')">기념일을 입력해주세요.</span>
              </div>
            </div>
            <div class="mypage-content-data mt10">
              <div class="field" :class="{ error: errors.has('ann') }">
                <input type="text" name="ann" class="form-login-input" style="width: 60%;" placeholder="신규 비밀번호" v-validate="'required'" />
                <span class="error" v-show="errors.has('ann')">기념일을 입력해주세요.</span>
              </div>
            </div>
            <div class="mypage-content-data mt10">
              <div class="field" :class="{ error: errors.has('phone') }">
                <div class="inputGroup">
                  <input type="text" name="phone" class="form-login-group" placeholder="신규 비밀번호 확인" style="width: 60%;" v-validate="'required'" />
                  <div style="display: inline-table; width: 1.5%;"></div>
                  <button id="phoneVerify" class="button-grey" style="width: 25%;" @click="phoneVerify">비밀번호 변경</button>
                </div>
                <span class="error" v-show="errors.has('phone')">신규 비밀번호를 입력해주세요.</span>
              </div>
            </div>
          </div>
          <div class="mypage-content-row">
            <div class="mypage-content-header">휴대폰 번호</div>
            <div class="mypage-content-data mt20">
              <div class="field" :class="{ error: errors.has('phone') }">
                <div class="inputGroup">
                  <input type="text" name="phone" class="form-login-group" placeholder="휴대전화" style="width: 60%;" v-validate="'required'" />
                  <div style="display: inline-table; width: 1.5%;"></div>
                  <button id="phoneVerify" class="button-grey" style="width: 25%;" @click="phoneVerify">휴대폰번호 변경</button>
                </div>
                <span class="error" v-show="errors.has('phone')">휴대전화를 입력해주세요.</span>
              </div>
            </div>
            <div class="mypage-content-data mt10">
              <div class="field" :class="{ error: errors.has('phone') }">
                <div class="inputGroup">
                  <input type="text" name="phone" class="form-login-group" placeholder="휴대전화" style="width: 60%;" v-validate="'required'" />
                  <div style="display: inline-table; width: 1.5%;"></div>
                  <button id="phoneVerify" class="button-grey" style="width: 25%;" @click="phoneVerify">인증</button>
                </div>
                <span class="error" v-show="errors.has('phone')">휴대전화를 입력해주세요.</span>
              </div>
            </div>
            <div class="mypage-content-data mt10">
              <div class="field" :class="{ error: errors.has('phone_auth_number') }">
                <div class="inputGroup">
                  <input type="text" name="phone_auth_number" class="form-login-group" placeholder="인증번호" style="width: 60%;" v-validate="'required'" />
                  <div style="display: inline-table; width: 1.5%;"></div>
                  <button id="authKeyConfirm" class="button-grey" style="width: 25%;" @click="authKeyConfirm">확인</button>
                </div>
                <span class="error" v-show="authErr">{{ authErrMessage }}</span>
              </div>
            </div>
          </div>
          <div class="myapge-content-row mt40">
            <div class="mypage-content-header">주소</div>
            <div class="mypage-content-data mt20">
              <div class="field" :class="{ error: errors.has('zipcode') }">
                <div class="inputGroup">
                  <input type="text" name="zipcode" class="form-login-group" placeholder="우편번호" style="width: 43.6%;" v-validate="'required'" />
                  <div style="display: inline-table; width: 1.5%;"></div>
                  <button class="button-grey" style="width: 15%;" @click="openDaumPopup">주소찾기</button>
                </div>
              </div>
            </div>
            <div class="mypage-content-data mt10">
              <div class="field" :class="{ error: errors.has('address') }">
                <input type="text" name="address" class="form-login-input" placeholder="주소" style="width: 60%;" v-validate="'required'" />
                <span class="error" v-show="errors.has('address')">주소가 입력되지 않았습니다.</span>
              </div>
            </div>
            <div class="mypage-content-data mt10">
              <div class="field" :class="{ error: errors.has('detail_address') }">
                <input type="text" name="detail_address" class="form-login-input" placeholder="상세주소" style="width: 60%;" v-validate="'required'" />
                <span class="error" v-show="errors.has('detail_address')">상세주소가 입력되지 않았습니다.</span>
              </div>
            </div>
          </div>
        </div>
        <div class="mypage-content-center"></div>
        <div class="mypage-content-right">
          <div class="mypage-content-row">
            <div class="mypage-content-header">기념일</div>
            <div class="mypage-content-data mt20">
              <div class="field" :class="{ error: errors.has('ann') }">
                <input type="text" name="ann" class="form-login-input" style="width: 50%;" placeholder="기념일" v-validate="'required'" />
                <span class="error" v-show="errors.has('ann')">기념일을 입력해주세요.</span>
              </div>
            </div>
          </div>
          <div class="mypage-content-row">
            <div class="mypage-content-header">배송일 지정</div>
            <div class="mypage-content-data mt30">
              <div>
                <label class="form-input-radio">
                  <input type="radio" name="delivery_day" />월요일
                  <span class="checkmark-radio"></span>
                </label>
                <label class="form-input-radio" style="margin-left: 40px">
                  <input type="radio" name="delivery_day" />화요일
                  <span class="checkmark-radio"></span>
                </label>
                <label class="form-input-radio" style="margin-left: 40px">
                  <input type="radio" name="delivery_day" />수요일
                  <span class="checkmark-radio"></span>
                </label>
              </div>
              <div class="mt20">
                <label class="form-input-radio">
                  <input type="radio" name="delivery_day" />목요일
                  <span class="checkmark-radio"></span>
                </label>
                <label class="form-input-radio" style="margin-left: 40px">
                  <input type="radio" name="delivery_day" />금요일
                  <span class="checkmark-radio"></span>
                </label>
              </div>
            </div>
          </div>
          <div class="mypage-content-row">
            <div class="mypage-content-header">공동 현관 번호 <span>(배송을 위해 공동현관 비밀번호 알려주세요)</span></div>
            <div class="mypage-content-data mt20">
              <div class="field" :class="{ error: errors.has('ann') }">
                <input type="text" name="ann" class="form-login-input" style="width: 50%;" placeholder="공동 현관 번호" v-validate="'required'" />
                <span class="error" v-show="errors.has('ann')">기념일을 입력해주세요.</span>
              </div>
            </div>
          </div>
          <div class="mypage-content-row">
            <div class="mypage-content-header">카드 결제 정보</div>
            <div class="mypage-content-data mt20">
              <div class="field" :class="{ error: errors.has('cardNumber') }">
                <div class="inputGroup">
                  <div class="inputIconLabel" style="display: inline-table; width: 50%;">
                    <input type="text" name="cardNumber" class="form-login-input" placeholder="카드번호(- 없이 16자리 입력)" maxlength="16" @keydown="$common.NumberValidateEvt" v-validate="'required'" />
                    <i class="fa fa-credit-card fa-lg"></i>
                  </div>
                  <div style="display: inline-table; width: 1.5%;"></div>
                  <input type="text" name="cardExpiry" class="form-login-group" placeholder="MM/YY" style="width: 15%;" v-validate="'required'" @keyup="checkCardExpiry" />
                  <span class="error" v-show="(errors.has('cardNumber') || errors.has('cardExpiry'))">카드번호 & 유효기간을 입력해주세요.</span>
                  <span class="error" v-show="cardVerify">{{ cardVerifyMsg }}</span>
                </div>
              </div>
              <div class="field mt12 talign-left" :class="{ error: errors.has('birthDay') }">
                <input type="text" name="birthDay" class="form-login-input" placeholder="생년월일(YY/MM/DD)" style="width: 66.2%;" v-validate="'required'" @keyup="checkBirthExpiry" />
                <span class="error" v-show="errors.has('birthDay')">생년월일을 입력해주세요.</span>
                <span class="error" v-show="birthVerify">{{ birthVerifyMsg }}</span>
              </div>
              <div class="field mt12 talign-left" :class="{ error: errors.has('cardPwd') }">
                <input type="password" name="cardPwd" class="form-login-input" placeholder="비밀번호" style="width: 15%;" maxlength="2" v-validate="'required'" />
                <span class="password-icon-position">
                  <i class="fa fa-circle" style="font-size: 8px;"></i>
                  <i class="fa fa-circle" style="font-size: 8px;"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'mypage',
  methods: {
  },
};
</script>

<style scoped>
.mypage {
}

.closet-title-text {
  font-size: 36px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: -3.8px;
  text-align: left;
}

.mypage-content {
  border-top: 2px solid #212121;
  border-bottom: 2px solid #212121;
}

.mypage-content-area {
  display: flex;
}

.mypage-content-center {
  width: 0.1%;
  background-color: #797979;
  margin: 30px;
  opacity: 0.5;
}

.mypage-content-left, .mypage-content-right {
  width: 49.8%;
}

.mypage-content-row {
  margin-top: 40px;
}

.mypage-content-header {
  font-size: 16px;
  font-weight: 600;
  line-height: 1;
  letter-spacing: -0.4px;
  color: #212121;
}

.mypage-content-data {
  font-size: 18px;
  line-height: 1;
  color: #212121;
}

.mypage-content-header span {
  font-weight: normal;
}
</style>
