<template>
  <div class="contents">
    <div class="contents-header"><h3>회원 정보 및 결제 정보</h3></div>
    <form name="joinForm">
      <div class="content">
        <div class="grid-flex">
          <!-- Left Side -->
          <div class="column column-left">
            <!-- 사용자 계정 -->
            <div class="row user-account">
              <div class="form-title-wrap">
                <p class="txt-form-title">사용자 계정</p>
              </div>
              <div>
                <div class="form-row">
                  <div
                    class="text-field"
                    :class="{ 'text-field-error': errors.has('name') }"
                  >
                    <input
                      type="text"
                      name="name"
                      placeholder="이름"
                      autocomplete="name"
                      maxlength="15"
                      v-validate="'required'"
                      v-model="joinData.name"
                    />
                  </div>
                  <p v-if="errors.has('name')" class="txt-error">
                    이름을 입력해주세요.
                  </p>
                </div>
                <div class="form-row">
                  <div
                    :class="{ 'text-field-error': errors.has('email') }"
                    class="text-field"
                  >
                    <input
                      type="email"
                      name="email"
                      placeholder="이메일"
                      autocomplete="email"
                      maxlength="50"
                      v-validate="'required|email'"
                      v-model="joinData.email"
                    />
                  </div>
                  <p class="txt-error" v-if="errors.has('email')">
                    이메일을 정확하게 입력해주세요.
                  </p>
                </div>
                <div class="form-row">
                  <div
                    :class="{ 'text-field-error': errors.has('password') }"
                    class="text-field"
                  >
                    <input
                      type="password"
                      name="password"
                      placeholder="비밀번호 8자리 이상의 영문,숫자,특수문자(!@#$%^&*) 포함"
                      autocomplete="new-password"
                      maxlength="256"
                      ref="password"
                      v-validate="{
                        required: true,
                        regex: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}/
                      }"
                      v-model="joinData.password"
                      @keyup="pwdCheck(errors.has('password'))"
                    />
                  </div>
                  <p class="txt-error" v-show="errors.has('password')">
                    {{ pwdMsg }}
                  </p>
                </div>
                <div class="form-row">
                  <div
                    class="text-field"
                    :class="{
                      'text-field-error': errors.has('passwordConfirm')
                    }"
                  >
                    <input
                      type="password"
                      name="passwordConfirm"
                      placeholder="비밀번호 확인"
                      autocomplete="new-password"
                      maxlength="256"
                      v-validate="'required|confirmed:password'"
                    />
                  </div>
                  <p class="txt-error" v-if="errors.has('passwordConfirm')">
                    비밀번호가 일치하지 않습니다.
                  </p>
                </div>
              </div>
            </div>
            <!-- 휴대폰 번호 -->
            <div class="row">
              <div class="form-title-wrap">
                <p class="txt-form-title">휴대폰 번호</p>
              </div>
              <div class="form-row">
                <div class="grid-flex grid-fixed">
                  <div
                    class="text-field column"
                    :class="{ 'text-field-error': errors.has('phone') }"
                  >
                    <input
                      type="tel"
                      name="phone"
                      placeholder="( - 없이 입력)"
                      autocomplete="tel-national"
                      maxlength="14"
                      v-validate="{
                        required: true,
                        regex: /^01([0|1|6|7|8|9]?)?([0-9]{3,4})?([0-9]{4})/
                      }"
                      v-model="joinData.phone"
                    />
                  </div>
                  <div class="column w-31 o-2">
                    <button
                      type="button"
                      class="btn btn-secondary h-50"
                      id="phoneVerify"
                      @click="clickPhoneVerify"
                    >
                      인증
                    </button>
                  </div>
                </div>
                <p class="txt-error" v-if="errors.has('phone')">
                  휴대전화를 입력해주세요.
                </p>
              </div>
              <div v-show="isPhoneAuth" class="form-row">
                <div class="grid-flex grid-fixed">
                  <div
                    class="column text-field"
                    :class="{
                      'text-field-error': errors.has('phoneAuthNumber')
                    }"
                  >
                    <input
                      type="text"
                      name="phoneAuthNumber"
                      placeholder="인증번호"
                      autocomplete="tel-extension"
                      v-validate="'required'"
                    />
                  </div>
                  <div class="column w-31 o-2">
                    <button
                      type="button"
                      class="btn btn-secondary h-50"
                      id="authKeyConfirm"
                      @click="authKeyConfirm"
                    >
                      확인
                    </button>
                  </div>
                </div>
                <p class="txt-error" v-if="authErr">{{ authErrMessage }}</p>
              </div>
            </div>
            <!-- 주소 -->
            <div class="row">
              <div class="form-title-wrap">
                <p class="txt-form-title">주소</p>
              </div>
              <div class="form-row">
                <div class="grid-flex grid-fixed">
                  <div
                    class="column text-field"
                    :class="{ 'text-field-error': errors.has('zipcode') }"
                  >
                    <input
                      type="text"
                      name="zipcode"
                      placeholder="우편번호"
                      autocomplete="postal-code"
                      readonly
                      v-validate="'required'"
                      v-model="joinData.zipcode"
                      @click="openPostCode"
                    />
                  </div>
                  <div class="column w-31 o-2">
                    <button
                      type="button"
                      class="btn btn-secondary h-50"
                      @click="openPostCode"
                    >
                      주소찾기
                    </button>
                  </div>
                </div>
                <p></p>
              </div>
              <div class="form-row" v-show="isPostCode">
                <div class="postcode-wrap" id="postCode"></div>
              </div>
              <div class="form-row">
                <div
                  class="text-field"
                  :class="{ 'text-field-error': errors.has('address') }"
                >
                  <input
                    type="text"
                    name="address"
                    placeholder="주소"
                    autocomplete="address-line1"
                    maxlength="30"
                    readonly
                    v-validate="'required'"
                    v-model="joinData.addr"
                    @click="openPostCode"
                  />
                </div>
                <p class="txt-error" v-if="errors.has('address')">
                  주소가 입력되지 않았습니다.
                </p>
              </div>
              <div class="form-row">
                <div
                  class="text-field"
                  :class="{ 'text-field-error': errors.has('detail_address') }"
                >
                  <input
                    type="text"
                    name="detail_address"
                    placeholder="상세주소"
                    autocomplete="address-line2"
                    maxlength="30"
                    ref="detailAddress"
                    v-validate="'required'"
                    v-model="joinData.addrDetail"
                  />
                </div>
                <p class="txt-error" v-if="errors.has('detail_address')">
                  상세주소가 입력되지 않았습니다.
                </p>
                <p class="txt-delivery">
                  ※ 현재 서울 전지역과 경기 일부 지역에 한하여 서비스를 제공하고
                  있습니다.
                  <a
                    href="/pdf/shipping_area.pdf"
                    target="_blank"
                    class="txt-link"
                    >(배송지역 보기)</a
                  >
                </p>
              </div>
            </div>
            <div class="row">
              <div class="form-title-wrap">
                <p class="txt-form-title">공동 현관 비밀번호</p>
                <p class="txt-form-explain">
                  (문 앞까지 가기 전에 공동 현관이 있는 경우)
                </p>
              </div>
              <div>
                <div
                  class="text-field"
                  :class="{ 'text-field-error': errors.has('lobbyPassword') }"
                >
                  <input
                    type="text"
                    v-model="joinData.lobbyPassword"
                    class="form-input"
                    v-validate="'required'"
                    name="lobbyPassword"
                    placeholder="공용 현관이 없는 경우 없음을 입력해주세요."
                  />
                </div>
                <p class="txt-error" v-if="errors.has('lobbyPassword')">
                  공동 현관 비밀번호를 입력해 주세요.
                </p>
              </div>
            </div>
          </div>
          <!-- Right Side -->
          <div class="column column-right">
            <!-- 공동 현관 비밀번호 -->
            <div class="row">
              <div class="form-title-wrap">
                <p class="txt-form-title">배송일 지정</p>
              </div>
              <div>
                <div>
                  <ul class="list-flex list-delivery-days">
                    <li
                      v-for="(data, idx) in FirstDeliveryDays"
                      :key="idx"
                      class="item w-20 h-50"
                      :class="[
                        { selected: joinData.deliveryDate === data.solar_date },
                        { disabled: data.is_holiday === 'Y' }
                      ]"
                      style="flex-direction: column;"
                      :style="calcDate(data, idx)"
                      @click="selectDay(data)"
                    >
                      <span class="txt-date-number">{{ data.month_day }}</span>
                      <span>{{ data.day_of_week }}</span>
                    </li>
                  </ul>
                </div>
              </div>
              <notifications
                group="deliveryDate"
                width="100%"
                position="bottom left"
                :max="1"
                class="zuly-notify"
              />
            </div>
            <div class="row">
              <div class="form-title-wrap mb-5">
                <p class="txt-form-title">카드 결제 정보</p>
              </div>
              <div class="mb-10">
                <div class="grid-flex grid-fixed">
                  <div class="column">
                    <label class="label-card" for="cardNumber"
                      >카드 번호
                    </label>
                    <div
                      class="text-field"
                      :class="{ 'text-field-error': errors.has('cardNumber') }"
                    >
                      <input
                        id="cardNumber"
                        autocomplete="cc-exp"
                        type="text"
                        placeholder="( - 없이, 15~16자리)"
                        maxlength="16"
                        v-validate="'required'"
                        name="cardNumber"
                        v-model="joinData.cardNumber"
                      />
                    </div>
                  </div>
                  <div class="column w-31 o-2">
                    <label class="label-card" for="cardExpiry">유효기간</label>
                    <div
                      class="text-field"
                      :class="{ 'text-field-error': errors.has('cardExpiry') }"
                    >
                      <input
                        id="cardExpiry"
                        autocomplete="cc-exp"
                        type="text"
                        placeholder="MMYY"
                        v-validate="'required'"
                        @keyup="checkCardExpiry"
                        name="cardExpiry"
                      />
                    </div>
                  </div>
                </div>
                <p
                  class="txt-error"
                  v-show="errors.has('cardNumber') || errors.has('cardExpiry')"
                >
                  카드번호 & 유효기간을 입력해주세요.
                </p>
                <p class="txt-error" v-show="cardVerify">{{ cardVerifyMsg }}</p>
              </div>
              <div class="mb-10">
                <div class="grid-flex grid-fixed">
                  <div class="column">
                    <label class="label-card" for="birdthDay">생년월일</label>
                    <div
                      class="text-field"
                      :class="{ 'text-field-error': errors.has('birthDay') }"
                    >
                      <input
                        id="birdthDay"
                        type="text"
                        class="form-input"
                        name="birthDay"
                        v-model="joinData.userBirth"
                        placeholder="생년월일(YYMMDD)"
                        v-validate="'required'"
                        @keyup="checkBirthExpiry"
                      />
                    </div>
                  </div>

                  <div class="column w-31 o-2">
                    <label class="label-card" for="cardPwd">비밀번호</label>
                    <div
                      class="text-field"
                      :class="{ 'text-field-error': errors.has('cardPwd') }"
                    >
                      <input
                        id="cardPwd"
                        type="password"
                        placeholder="앞2자리"
                        v-model="joinData.cardPassword"
                        maxlength="2"
                        v-validate="'required'"
                        name="cardPwd"
                      />
                    </div>
                  </div>
                </div>
                <p class="txt-error" v-show="errors.has('birthDay')">
                  생년월일을 입력해주세요.
                </p>
                <p class="txt-error" v-show="birthVerify">
                  {{ birthVerifyMsg }}
                </p>
                <p class="txt-error" v-show="errors.has('cardPwd')">
                  카드비밀번호 앞 2자리를 입력해주세요.
                </p>
              </div>
            </div>
            <div class="row">
              <div class="form-title-wrap">
                <p class="txt-form-title">요금제</p>
              </div>
              <div>
                <div class="txt-payment">
                  <p>월 2회 단일 78,000원 요금제</p>
                </div>
                <div class="list-payment">
                  <ul>
                    <li>- 월 2회 의류 세트 정기 배송/수거 및 세탁</li>
                    <li>- 배송 전 상품 제안 및 스타일링 Tip 제공</li>
                    <li class="txt-warning">
                      - 구독 해지 전까지 매월 자동 결제
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="row">
              <div>
                <table class="table-order-total">
                  <colgroup>
                    <col width="*" />
                    <col :width="$mq === 'sm' ? 100 : 120" />
                  </colgroup>
                  <thead>
                    <tr>
                      <th colspan="2">주문 합계</th>
                    </tr>
                  </thead>
                  <tfoot>
                    <tr>
                      <td>월 결제금액</td>
                      <td>
                        <span class="txt-number">
                          <vue-numeric
                            v-if="isRecommendCode"
                            separator=","
                            :value="RecommendCode.total_price"
                            read-only
                          >
                          </vue-numeric>
                          <vue-numeric
                            v-else
                            separator=","
                            :value="Membership.promotion_price"
                            read-only
                          >
                          </vue-numeric>
                        </span>
                        <span class="txt-unit">원</span>
                      </td>
                    </tr>
                    <tr class="first-payment-wrap">
                      <td>첫 결제 금액</td>
                      <td>
                        <span>
                          <vue-numeric separator="," :value="39000" read-only>
                          </vue-numeric>
                          <span class="txt-unit">원</span>
                        </span>
                      </td>
                    </tr>
                  </tfoot>
                  <tbody>
                    <tr v-if="Membership.promotion_price !== Membership.price">
                      <td>프로모션 기간 금액</td>
                      <td>
                        <span class="txt-number">
                          <vue-numeric
                            separator=","
                            v-model="Membership.promotion_price"
                            read-only
                          />
                        </span>
                        <span class="txt-unit">원</span>
                      </td>
                    </tr>
                    <tr v-if="RecommendCode.sale_price">
                      <td>추천인 할인</td>
                      <td>
                        <span class="txt-number"
                          >(-)
                          <vue-numeric
                            separator=","
                            :value="RecommendCode.sale_price"
                            read-only
                          />
                        </span>
                        <span class="txt-unit">원</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="row">
              <div class="custom-checkbox">
                <input
                  class="custom-control-input"
                  type="checkbox"
                  name="payment_flag"
                  id="payment_flag"
                />
                <label class="custom-control-label" for="payment_flag">
                  상기 결제정보를 확인하였으며, 구매진행에 동의합니다. 첫번째
                  결제는 구독 상품 배송이 시작될때 이루어집니다.
                </label>
              </div>
            </div>

            <!-- 체크박스 -->
            <div class="checkbox-wrap">
              <div class="custom-checkbox">
                <input
                  class="custom-control-input"
                  type="checkbox"
                  name="private_flag"
                  id="private_flag"
                />
                <label class="custom-control-label" for="private_flag">
                  개인정보의 수집 및 이용에 대한 동의
                </label>
                <a href="#" class="txt-link" @click="viewModal('private')"
                  >자세히보기</a
                >
              </div>
              <div class="custom-checkbox">
                <input
                  class="custom-control-input"
                  type="checkbox"
                  name="use_flag"
                  id="use_flag"
                />
                <label class="custom-control-label" for="use_flag">
                  이용약관
                </label>
                <a href="#" class="txt-link" @click="viewModal('use')"
                  >자세히보기</a
                >
              </div>
              <div class="custom-checkbox">
                <input
                  class="custom-control-input"
                  type="checkbox"
                  name="marketingFlag"
                  id="marketingFlag"
                />
                <label
                  class="custom-control-label"
                  @click="toggleMarketing"
                  for="marketingFlag"
                >
                  [선택] 마케팅 정보 수신 동의
                </label>
                <a href="#" class="txt-link" @click="viewModal('marketing')"
                  >자세히보기</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="btn-complete">
        <button
          class="btn btn-primary h-56"
          type="button"
          @click="clickComplete"
        >
          완료
        </button>
      </div>
    </form>
    <simplert ref="alert" :useRadius="false" :useIcon="false" />
    <Terms :type="termsData" ref="terms" />
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import Simplert from 'vue2-simplert';
import VueNumeric from 'vue-numeric';
import Codes from '@/library/api/codes';
import Terms from '@/components/common/modal/terms/Terms.vue';

import axios from 'axios';
import _ from 'lodash';

const alertObject = {
  type: 'alert', // 타입
  customClass: 'popup-custom-class', // 커스텀 클래스 네임
  disableOverlayClick: false, // 오버레이 클릭시 닫기 방지
  customCloseBtnText: '확인' // 닫기 버튼 텍스트
};
export default {
  name: 'signUp-first',
  components: {
    Terms,
    Simplert,
    VueNumeric
  },
  data() {
    return {
      pwdMsg: '비밀번호를 입력해주세요.',
      isPwd: false,
      isPhoneAuth: false,
      authErr: false,
      authErrMessage: '',
      termsData: null,
      // 회원가입 정보
      joinData: {
        name: '',
        email: '',
        password: '',
        phone: '',
        ann: null,
        zipcode: '',
        addr: '',
        addrDetail: '',
        marketingAgree: 'N',
        lobbyPassword: null,
        deliveryDate: '',
        cardNumber: '',
        cardYearExpiry: '',
        cardMonthExpiry: '',
        userBirth: '',
        cardPassword: '',
        coupon: null,
        membershipId: 1,
        recommendCode: null
      },
      resultPostCode: {}, // 주소 결과값,
      isPostCode: false,

      deliveryDay: {
        monthDay: '',
        dayOfWeek: ''
      },
      cardVerify: false,
      cardVerifyMsg: '',
      birthVerify: false,
      birthVerifyMsg: '',
      isConfirm: false,
      isRecommendCode: false
    };
  },
  computed: {
    ...mapGetters({
      Join: 'signup/Join',
      isAuthenticated: 'login/isAuthenticated',
      PhoneVerify: 'signup/PhoneVerify',
      FirstDeliveryDays: 'codes/FirstDeliveryDays', // 첫구독시 배송일 데이터
      Membership: 'payment/Membership', // 멤버십 가격
      RecommendCode: 'payment/RecommendCode'
    }),
    msgDeliveryDay() {
      const date = _.split(this.deliveryDay.monthDay, '/');
      const week = _.trim(this.deliveryDay.dayOfWeek, '()');
      return `${date[0]}월 ${
        date[1]
        }일 첫 배송 후 격주 ${week}요일에 배송됩니다.`;
    }
  },
  methods: {
    ...mapActions({
      setJoin: 'signup/setJoin',
      postPhone: 'signup/postPhone',
      patchPhone: 'signup/patchPhone',

      getFirstDeliveryDays: 'codes/getFirstDeliveryDays', // 첫 구독시 배송일 데이터 호출
      getMembership: 'payment/getMembership',
      getRecommendCode: 'payment/getRecommendCode',
      postJoin: 'signup/postJoin'
    }),
    openPostCode() {
      if (!this.isPostCode) {
        const daum = window.daum;
        daum.postcode.load(() => {
          new window.daum.Postcode({
            width: '100%',
            height: '498px',
            onresize: () => {},
            onclose: state => {
              if (state === 'COMPLETE_CLOSE') {
              }
            },
            oncomplete: async data => {
              const validZipCode = await Codes.GetZipCodes(data.zonecode);
              if (!validZipCode.data.result) {
                this.$dialog.alert(
                  '입력하신 주소는 현재 서비스 지역이 아닙니다.',
                  {
                    okText: '확인',
                    customClass: 'zuly-alert',
                    backdropClose: true
                  }
                );
              }
              this.completePostCode(data);
            }
          }).embed(document.getElementById('postCode'), {});
        });
        this.isPostCode = true;
      }
    },
    closePostCode() {
      this.isPostCode = false;
    },
    completePostCode(result) {
      if (result.userSelectedType === 'R') {
        //  도로명 주소
        this.joinData.addr = result.roadAddress;
      } else {
        //  지번 주소
        this.joinData.addr = result.jibunAddress;
      }
      this.joinData.zipcode = result.zonecode;
      this.$refs.detailAddress.focus();
      this.closePostCode();
    },
    viewModal(param) {
      if (param === 'private') {
        this.$refs.terms.$data.type = 'Privacy';
      } else if (param === 'use') {
        this.$refs.terms.$data.type = 'Service';
      } else if (param === 'marketing') {
        this.$refs.terms.$data.type = 'Marketing';
      }
    },
    closeModal() {
      this.$refs.private.close();
      this.$refs.use.close();
      this.$refs.marketing.close();
    },
    pwdCheck(isBoolean) {
      const pwd = document.querySelector('input[name=password]');

      let checkBoolean = isBoolean;
      if (pwd.value === '') {
        if (!checkBoolean) checkBoolean = !checkBoolean;
        this.pwdMsg = '비밀번호를 입력해주세요.';
      } else {
        this.pwdMsg =
          '비밀번호 형식에 맞지 않습니다. 8자리 이상의 영문,숫자,특수문자(!@#$%^&*) 포함';
      }

      this.isPwd = !checkBoolean;
    },
    async clickPhoneVerify(event) {
      const joinForm = document.joinForm,
        email = joinForm.email,
        phone = joinForm.phone,
        phoneAuthNumber = joinForm.phoneAuthNumber;

      if (!this.joinData.email) {
        _.assign(alertObject, {
          message: '이메일을 먼저 입력해주세요.',
          onClose: function() {
            email.focus();
          }
        });
        this.$refs.alert.openSimplert(alertObject);
        return;
      }

      this.$validator.validate('phone', phone.value).then(result => {
        if (result) {
          const phoneData = {
            email: _.trim(this.joinData.email),
            phone: _.trim(this.joinData.phone)
          };
          this.postPhone(phoneData).then(res => {
            if (res.data.result) {
              this.isPhoneAuth = true;
              event.target.disabled = true;
              this.startTimer();
              this.authErr = true;
              phoneAuthNumber.focus();
            }
            if (res.data.phoneDuplicated) {
              _.assign(alertObject, {
                message: '이미 등록된 핸드폰 번호입니다. 다시 확인해 주세요.'
              });
              this.$refs.alert.openSimplert(alertObject);
            }
            if (res.data.emailDuplicated) {
              _.assign(alertObject, {
                message: '이미 등록된 이메일 주소입니다. 다시 확인해 주세요.'
              });
              this.$refs.alert.openSimplert(alertObject);
            }
          });
        } else {
          _.assign(alertObject, {
            message: '올바른 휴대폰번호를 입력해주세요.'
          });
          this.$refs.alert.openSimplert(alertObject);
        }
      });
    },
    async authKeyConfirm() {
      const joinForm = document.joinForm,
        phoneAuthNumber = joinForm.phoneAuthNumber;

      if (this.PhoneVerify.authId === null || this.PhoneVerify.authId === '') {
        _.assign(alertObject, {
          message: '먼저 휴대전화를 입력하고 인증버튼을 눌러주세요.'
        });
        this.$refs.alert.openSimplert(alertObject);
        return false;
      }

      if (phoneAuthNumber.value === '') {
        _.assign(alertObject, {
          message: '인증번호를 입력해주세요.',
          onClose: function() {
            phoneAuthNumber.focus();
          }
        });
        this.$refs.alert.openSimplert(alertObject);
        return;
      }

      let formData = {
        authId: this.PhoneVerify.authId,
        authNumber: phoneAuthNumber.value
      };
      await this.patchPhone(formData);

      if (this.PhoneVerify.isVerify) {
        const phone = document.querySelector('input[name=phone]');
        _.assign(alertObject, {
          message: '인증되었습니다.'
        });
        this.$refs.alert.openSimplert(alertObject);
        document.querySelector('#phoneVerify').disabled = true;
        document.querySelector('#authKeyConfirm').disabled = true;
        phone.disabled = true;
        phoneAuthNumber.disabled = true;
        this.authErr = false;
        clearInterval(window.interval);
        this.isPhoneAuth = false;
      } else {
        _.assign(alertObject, {
          message: '인증번호를 다시 확인하시고 진행해주세요.'
        });
        this.$refs.alert.openSimplert(alertObject);
      }

      return true;
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
          document.querySelector('#phoneVerify').disabled = false;
          this.authErr = false;
        }
      }, 1000);

      window.interval = interval;
    },
    toggleMarketing() {
      const isChecked = document.joinForm.marketingFlag.checked;
      if (isChecked) {
        this.joinData.marketingAgree = 'N';
      } else {
        this.joinData.marketingAgree = 'Y';
      }
    },
    selectDay(param) {
      if (param.is_holiday === 'Y') {
        return;
      } else {
        this.joinData.deliveryDate = param.solar_date;
        this.deliveryDay.monthDay = param.month_day;
        this.deliveryDay.dayOfWeek = param.day_of_week;
        this.$notify({
          group: 'deliveryDate',
          text: `※ ${this.msgDeliveryDay}`
        });
      }
    },
    checkCardExpiry(evt) {
      const cardReg = /^(0?[1-9]|1[0-2]|12)(1[9]|[2-9][0-9]|99)$/;
      if (!cardReg.test(evt.target.value)) {
        this.cardVerify = true;
        this.cardVerifyMsg =
          '카드유효기간을 MMYY(월년) 형태로 입력해주세요. (ex: 0323)';
      } else {
        const cardMonth = evt.target.value.substr(0, 2);
        const cardYear = evt.target.value.substr(2, 4);

        this.cardVerify = false;
        this.joinData.cardMonthExpiry = cardMonth;
        this.joinData.cardYearExpiry = _.padStart(cardYear, 4, '20');
      }
    },
    checkBirthExpiry(evt) {
      const birthReg = /^([0-9][0-9]|99)(0?[1-9]|1[0-2]|12)(0?[1-9]|[12][0-9]|3[01])$/;
      if (!birthReg.test(evt.target.value)) {
        this.birthVerify = true;
        this.birthVerifyMsg =
          '생년월일을 YYMMDD(년월일) 형태로 입력해주세요. (ex: 851211)';
      } else this.birthVerify = false;
    },
    couponVerify() {
      const coupon = document.querySelector('input[name=coupon]');
      return this.$common.InputDataValidation(
        coupon,
        '쿠폰을 입력해주세요.',
        true
      );
    },
    async recommendVerify() {
      if (
        this.joinData.recommendCode === '' ||
        this.joinData.recommendCode === null
      ) {
        _.assign(alertObject, {
          message: '추천인을 입력해 주세요.'
        });
        this.$refs.alert.openSimplert(alertObject);
        this.isRecommendCode = false;
      } else {
        const formData = {
          id: this.joinData.membershipId,
          code: this.joinData.recommendCode
        };
        await this.getRecommendCode(formData).then(res => {
          if (res.data.result) {
            _.assign(alertObject, {
              message: '정상 등록 되었습니다.'
            });
            this.$refs.alert.openSimplert(alertObject);
            this.isRecommendCode = true;
          } else {
            _.assign(alertObject, {
              message: '등록 가능한 추천인이 아닙니다.'
            });
            this.$refs.alert.openSimplert(alertObject);
            this.isRecommendCode = false;
          }
        });
      }
    },
    clearStorage() {
      this.$localStorage.remove('joinFirst');
      this.$localStorage.remove('Mood');
      this.$localStorage.remove('Size');
    },
    successJoin() {
      this.$router.push({
        path: '/join/add-info'
      });
    },
    calcDate(data, idx) {
      if (idx === 0) {
        if (data.day_of_week === '(월)') {
          return { marginLeft: 'calc(0% - 1px)' };
        } else if (data.day_of_week === '(화)') {
          return { marginLeft: 'calc(20% - 1px)' };
        } else if (data.day_of_week === '(수)') {
          return { marginLeft: 'calc(40% - 1px)' };
        } else if (data.day_of_week === '(목)') {
          return { marginLeft: 'calc(60% - 1px)' };
        } else {
          return { marginLeft: 'calc(80% - 1px)' };
        }
      }
    },
    clickComplete(e) {
      const joinForm = document.joinForm;
      
      const instance = axios.create();
      const API_URL = process.env.VUE_APP_API_URL;

      instance.interceptors.request.use(
        function(config) {
          e.target.disabled = true;
          return config;
        },
        function(error) {
          return error;
        }
      );
      instance.interceptors.response.use(
        function(response) {
          e.target.disabled = false;
          return response;
        },
        function(error) {
          e.target.disabled = false;
          return error;
        }
      );
      const paymentFlag = joinForm.payment_flag.checked;
      const useFlag = joinForm.use_flag.checked;
      const privateFlag = joinForm.private_flag.checked;
      
      // 배송일 지정
      if (this.joinData.deliveryDate === '') {
        _.assign(alertObject, {
          message: '배송일을 선택해주세요.'
        });
        this.$refs.alert.openSimplert(alertObject);
        return;
      }
      // 구매 동의 체크박스
      
      this.setJoin(this.joinData);
      this.$validator.validateAll().then(result => {
        if (result) {
          if (!paymentFlag) {
            _.assign(alertObject, {
              message: '구매진행에 동의해주세요.'
            });
            this.$refs.alert.openSimplert(alertObject);
            return;
          }
          if (!privateFlag) {
            _.assign(alertObject, {
              message: '개인정보의 수집 및 이용에 동의해주세요.'
            });
            this.$refs.alert.openSimplert(alertObject);
            return;
          }
          if (!useFlag) {
            _.assign(alertObject, {
              message: '이용약관을 확인해주세요.'
            });
            this.$refs.alert.openSimplert(alertObject);
            return;
          }
          if (this.PhoneVerify.isVerify) {
            if (!_.isEmpty(this.joinData.ann)) {
              const dateResult = this.joinData.ann;
              const monthResult = dateResult.substring(0, 2);
              const dayResult = dateResult.substring(2);
              this.joinData.ann = monthResult + '.' + dayResult;
            }
            // this.setJoin(this.joinData);
            // this.$router.push({ path: '/join/payment-info' });
            // return;
          } else {
            _.assign(alertObject, {
              message: '휴대전화 인증을 진행해주세요.'
            });
            this.$refs.alert.openSimplert(alertObject);
            return;
          }
          console.log(this.Join);
          instance
            .post(`${API_URL}/auth/join`, this.Join, {
              withCredentials: true
            })
            .then(res => {
              if (!res.data.result) {
                if (res.data.paymentRtn) {
                  // 카드정보는 정확히 입력하였으나 다른 이유로 오류가 난 경우
                  _.assign(alertObject, {
                    message:
                      '오류가 발생 되었습니다. 잠시 후 다시 시도해 주세요.'
                  });
                } else {
                  // 카드정보가 정확히 입력되지 않은 경우
                  _.assign(alertObject, {
                    message: '카드 정보를 확인해주세요.'
                  });
                }
                this.$refs.alert.openSimplert(alertObject);
              } else {
                this.successJoin();
              }
            });
        } else {
          document
            .querySelectorAll('.text-field-error input')[0]
            .setAttribute('tabindex', -1);
          document.querySelectorAll('.text-field-error input')[0].focus();
          document
            .querySelectorAll('.text-field-error input')[0]
            .setAttribute('tabindex', null);
        }
      });
    },
  },
  async created() {
    if (!_.isEmpty(this.Join)) {
      this.joinData = {
        name: this.Join.name ? this.Join.name : '',
        email: this.Join.email ? this.Join.email : '',
        phone: this.Join.phone ? this.Join.phone : ' ',
        skirtSize: this.Join.skirtSize ? this.Join.skirtSize : null,
        pantsSize: this.Join.pantsSize ? this.Join.pantsSize : null,
        bodyType: this.Join.bodyType ? this.Join.bodyType : null,
        age: this.Join.age ? this.Join.age : null,
        lobbyPassword: this.Join.lobbyPassword ? this.Join.lobbyPassword : null
      };
    }
    if (_.isEmpty(this.FirstDeliveryDays)) {
      await this.getFirstDeliveryDays();
    }
    this.getMembership();

    // POSTCODE
    const htmlScript = document.createElement('script');
    htmlScript.setAttribute(
      'src',
      'https://ssl.daumcdn.net/dmaps/map_js_init/postcode.v2.js?autoload=false'
    );
    document.head.appendChild(htmlScript);
  }
};
</script>

<style scoped lang="scss" src="@/assets/css/join-style.scss"></style>
<style scoped lang="scss">
.contents {
  .content {
    .column {
      // Left
      .row {
        margin-top: 30px;
      }
      &.column-left {
        .row {
          &:first-child {
            margin-top: 0;
          }
        }
      }

      .custom-checkbox {
        margin-bottom: 8px;
      }
    }
  }
}
.txt-delivery {
  @include fontSize(14px);
  color: $color-secondary;
  margin-top: 10px;
}
.form-row {
  margin-bottom: 10px;
  &:last-child {
    margin-bottom: 0;
  }
}

.checkbox-wrap {
  margin-top: 10px;
}

.postcode-wrap {
  border: 1px solid $color-primary;
  max-height: 500px;
  -webkit-overflow-scrolling: touch;
}

.label-card {
  @include fontSize(14px);
  display: block;
  margin-bottom: 5px;
}

.icon-dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  background-color: $color-primary;
  border-radius: 50%;
  overflow: hidden;
  font-size: 0;
  text-indent: -9999em;
  &:nth-child(1) {
    margin-right: 10px;
  }
}
.txt-delivery-date {
  @include fontSize(14px);
  color: $color-secondary;
  margin-top: 10px;
}

.txt-entrance {
  @include fontSize(14px);
  color: $color-secondary;
  font-weight: 400;
}

.txt-payment {
  border: 2px solid #333;
  padding-left: 16px;
  p {
    @include fontSize(15px);
    font-weight: 700;
    line-height: 46px;
  }
}
.list-payment {
  margin-top: 10px;
  li {
    @include fontSize(14px);
  }
}

.table-order-total {
  @include fontSize(15px);
  table-layout: fixed;
  width: 100%;
  .txt-number {
    @include fontSize(18px, en);
  }
  th,
  td {
    vertical-align: middle;
  }
  th {
    padding-bottom: 10px;
    font-weight: 700;
  }
  td {
    height: 60px;
    border-bottom: 1px solid #e9e9e9;
    &:nth-child(2) {
      text-align: right;
    }
  }
  thead {
    th {
      border-bottom: 1px solid $color-primary;
      font-weight: 700;
      text-align: left;
    }
  }
  tfoot {
    td {
      font-weight: 700;
    }
  }
  .first-payment-wrap {
    td {
      &:nth-child(1) {
        color: $color-primary;
      }
      color: #d16e7b;
    }
  }
}
@media (min-width: 768px) {
  .contents {
    padding-left: 0;
    padding-right: 0;
    .content {
      .column {
        &.column-right {
          .row {
            &:first-child {
              margin-top: 0;
            }
          }
        }
      }
    }
  }

  .table-order-total {
    @include fontSize(16px);
    .txt-number {
      @include fontSize(22px);
    }
  }
}
</style>
