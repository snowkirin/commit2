<template>
  <div class="contents">
    <div class="contents-header">
      <h3>구독 서비스를 재 신청할 수 있습니다</h3>
    </div>
    <div class="content">
      <div class="restart-wrap">
        <div class="change-delivery">
          <div class="form-title-wrap">
            <p class="txt-form-title">배송일 지정</p>
          </div>
          <div>
            <ul class="list-flex">
              <li
                v-for="(data, idx) in deliveryDateData"
                :key="idx"
                class="item w-20 h-50"
                :class="[
                  { 'holy-day': data.is_holiday === 'Y' },
                  { selected: data.solar_date === deliveryDate }
                ]"
                style="flex-direction: column;"
                :style="calcDate(data, idx)"
                @click="clickDeliveryDate(data, $event)"
              >
                <span class="txt-date-number">{{ data.month_day }}</span>
                <span>{{ data.day_of_week }}</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="change-payment">
          <div class="change-payment-inner">
            <div class="form-title-wrap">
              <p class="txt-form-title">결제 카드 인증 또는 변경</p>
            </div>
            <div class="button-wrap">
              <button
                v-if="!isChangePayment"
                type="button"
                class="btn btn-primary h-50 btn-recertification"
                @click="clickCheckBillingKey"
              >
                등록 카드 (끝3자리:{{ calcCardNumber }}) 재인증
              </button>
              <button
                type="button"
                class="btn h-50 btn-toggle-payment"
                :class="[
                  { 'btn-primary': !isChangePayment },
                  { 'btn-secondary': isChangePayment }
                ]"
                @click="toggleChangePayment"
              >
                {{ txtChangePayment }}
              </button>
            </div>
          </div>

          <div v-if="isChangePayment" class="card-input-wrap">
            <form data-vv-scope="payment" name="payment">
              <div class="form-row">
                <div class="grid-flex grid-fixed">
                  <div class="column">
                    <label class="label-card" for="newCardNumber"
                      >카드번호</label
                    >
                    <div
                      class="text-field"
                      :class="{
                        'text-field-error': errors.has('payment.newCardNumber')
                      }"
                    >
                      <input
                        id="newCardNumber"
                        type="text"
                        placeholder="( - 없이, 15~16자리)"
                        name="newCardNumber"
                        maxlength="16"
                        v-validate="{ numeric: true, max: 16, min: 15 }"
                        data-vv-as="카드 번호"
                        v-model.trim="newCardNumber"
                      />
                    </div>
                  </div>
                  <div class="column w-23 o-3">
                    <label class="label-card" for="newCardValidity"
                      >유효기간</label
                    >
                    <div
                      class="text-field"
                      :class="{
                        'text-field-error': errors.has(
                          'payment.newCardValidity'
                        )
                      }"
                    >
                      <input
                        id="newCardValidity"
                        type="text"
                        placeholder="MMYY"
                        maxlength="4"
                        name="newCardValidity"
                        v-validate="{ date_format: 'MMYY' }"
                        data-vv-as="카드 유효 기간"
                        v-model.trim="newCardValidity"
                      />
                    </div>
                  </div>
                </div>
                <p
                  class="txt-error"
                  v-if="
                    errors.has('payment.newCardNumber') ||
                      errors.has('payment.newCardValidity')
                  "
                >
                  {{ errors.first('payment.newCardNumber') }}
                  <br v-if="errors.has('payment.newCardNumber')" />
                  {{ errors.first('payment.newCardValidity') }}
                </p>
              </div>
              <div class="form-row">
                <div class="grid-flex grid-fixed">
                  <div class="column">
                    <label class="label-card" for="newCardBirth"
                      >생년월일</label
                    >
                    <div
                      class="text-field"
                      :class="{
                        'text-field-error': errors.has('payment.newCardBirth')
                      }"
                    >
                      <input
                        id="newCardBirth"
                        type="text"
                        placeholder="YYMMDD"
                        maxlength="6"
                        name="newCardBirth"
                        v-validate="{ date_format: 'YYMMDD' }"
                        data-vv-as="생년월일"
                        v-model.trim="newCardBitrh"
                      />
                    </div>
                  </div>

                  <div class="column o-3">
                    <label class="label-card" for="newCardPassword"
                      >카드 비밀번호</label
                    >
                    <div
                      class="text-field"
                      :class="{
                        'text-field-error': errors.has(
                          'payment.newCardPassword'
                        )
                      }"
                    >
                      <input
                        id="newCardPassword"
                        type="password"
                        placeholder="앞 두자리"
                        maxlength="2"
                        name="newCardPassword"
                        v-validate="{ digits: 2 }"
                        data-vv-as="비밀번호"
                        v-model.trim="newCardPassword"
                      />
                    </div>
                  </div>

                  <div class="column w-26 o-3">
                    <label class="label-card">&nbsp;</label>
                    <button
                      type="button"
                      class="btn btn-primary h-50"
                      @click="clickChangePayment"
                    >
                      변경
                    </button>
                  </div>
                </div>
                <p
                  class="txt-error"
                  v-if="
                    errors.has('payment.newCardBirth') ||
                      errors.has('payment.newCardPassword')
                  "
                >
                  {{ errors.first('payment.newCardBirth') }}
                  <br v-show="errors.has('payment.newCardBirth')" />
                  {{ errors.first('payment.newCardPassword') }}
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div class="restart-button-wrap">
        <button type="button" class="btn btn-secondary h-56" @click="clickBack">
          취소
        </button>
        <button
          type="button"
          class="btn btn-primary h-56"
          :disabled="!restartValid"
          @click="clickSubscribe"
        >
          구독 신청
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import CalendarAPI from '@/library/api/calendar';
import MemberAPI from '@/library/api/member';

export default {
  name: 'Restart',
  components: {},
  data() {
    return {
      deliveryDateData: [],

      isChangePayment: false,

      currentCardName: '',
      currentCardNumber: '',

      newCardNumber: '',
      newCardValidity: '',
      newCardBitrh: '',
      newCardPassword: '',

      deliveryDate: '',
      checkCardValid: false
    };
  },
  computed: {
    ...mapGetters({
      // 필요한 정보 가져오기
      // 카드번호
      // 배송날짜
      // isBillingKey: 'member/isBillingKey',
      // FirstDeliveryDays: 'codes/FirstDeliveryDays',
      // Mypage: 'member/Mypage',
      // isRestart: 'common/isRestart'
    }),
    calcCardNumber() {
      return this.currentCardNumber.substring(
        this.currentCardNumber.length - 3
      );
    },
    txtChangePayment() {
      if (this.isChangePayment) {
        return '취소';
      } else {
        return '변경';
      }
    },
    restartValid() {
      return this.deliveryDate !== '' && this.checkCardValid;
    }
  },
  methods: {
    ...mapActions({
      // checkBillingKey: 'member/checkBillingKey',
      // getFirstDeliveryDays: 'codes/getFirstDeliveryDays',
      // getMypage: 'member/getMypage',
      // patchPayment: 'member/patchPayment',
      // putSubscriptionRestart: 'subscriptions/putSubscriptionRestart',
      // changeUserType: 'login/changeUserType',
      // doLogout: 'common/doLogout'
    }),
    setMypageData(param) {
      this.currentCardName = param.card_name;
      this.currentCardNumber = param.card_number;
    },
    toggleChangePayment() {
      this.isChangePayment = !this.isChangePayment;
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
    clickCheckBillingKey() {
      this.checkBillingKey().then(res => {
        if (res.data.result) {
          this.$dialog.alert('유효한 카드입니다.', {
            okText: '확인',
            customClass: 'zuly-alert',
            backdropClose: true
          });
          this.checkCardValid = true;
        } else {
          this.$dialog.alert('사용 할 수 없는 카드입니다', {
            okText: '확인',
            customClass: 'zuly-alert',
            backdropClose: true
          });
          this.checkCardValid = false;
        }
      });
    },
    clickDeliveryDate(data, event) {
      const eleTarget =
        event.target.tagName === 'LI'
          ? event.target
          : event.target.closest('li');
      if (eleTarget.classList.contains('holy-day')) {
        return false;
      }
      if (eleTarget.classList.contains('selected')) {
        return false;
      }
      this.deliveryDate = data.solar_date;
    },
    clickBack() {
      this.$router.go(-1);
    },
    clickChangePayment() {
      const formData = {
        cardNumber: this.newCardNumber,
        cardYearExpiry: this.newCardValidity,
        cardMonthExpiry: this.newCardValidity,
        userBirth: this.newCardBitrh,
        cardPassword: this.newCardPassword
      };

      if (_.isEmpty(formData.cardNumber)) {
        this.$dialog.alert('카드번호를 입력해 주세요.', {
          okText: '확인',
          customClass: 'zuly-alert',
          backdropClose: true
        });
        return;
      }
      if (
        _.isEmpty(formData.cardYearExpiry) ||
        _.isEmpty(formData.cardMonthExpiry)
      ) {
        this.$dialog.alert('카드 유효기간을 입력해 주세요.', {
          okText: '확인',
          customClass: 'zuly-alert',
          backdropClose: true
        });
        return;
      }
      if (_.isEmpty(formData.userBirth)) {
        this.$dialog.alert('생년월일을 입력해 주세요.', {
          okText: '확인',
          customClass: 'zuly-alert',
          backdropClose: true
        });
        return;
      }
      if (_.isEmpty(formData.cardPassword)) {
        this.$dialog.alert('카드 비밀번호를 입력해 주세요.', {
          okText: '확인',
          customClass: 'zuly-alert',
          backdropClose: true
        });
        return;
      }
      this.$validator.validateAll('payment').then(result => {
        if (result) {
          formData.cardYearExpiry = `20${formData.cardYearExpiry.substring(2)}`;
          formData.cardMonthExpiry = formData.cardMonthExpiry.substring(0, 2);
          this.patchPayment(formData).then(res => {
            if (res.data.result) {
              this.$dialog.alert('카드정보가 변경되었습니다.', {
                okText: '확인',
                customClass: 'zuly-alert',
                backdropClose: true
              });
              this.currentCardNumber = this.newCardNumber;
              // 입력했던 카드 정보 초기화
              this.newCardNumber = '';
              this.newCardValidity = '';
              this.newCardBitrh = '';
              this.newCardPassword = '';
              this.checkCardValid = true;
            } else {
              this.$dialog.alert(
                '통신 오류가 발생하였습니다. 카드정보를 정확히 입력해 주세요.',
                {
                  okText: '확인',
                  customClass: 'zuly-alert',
                  backdropClose: true
                }
              );
              this.checkCardValid = false;
            }
          });
        } else {
          const formTarget = document.payment;
          const errorTarget = formTarget.querySelectorAll(
            '.text-field-error input'
          );
          errorTarget[0].focus();
        }
      });
    },
    resetStore() {},
    clickSubscribe() {
      const formData = {
        date: this.deliveryDate
      };
      this.putSubscriptionRestart(formData).then(res => {
        if (res.data.result) {
          this.$dialog.alert(
            '구독 재시작 신청이 완료 되었습니다. 로그인을 다시 해주시기 바랍니다',
            {
              okText: '확인',
              customClass: 'zuly-alert',
              backdropClose: true
            }
          );
          this.isChangePayment = false;
          this.deliveryDate = '';
          this.checkCardValid = false;

          document.cookie = `${
            process.env.VUE_APP_TOKEN_NAME
          }=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/; domain=${
            process.env.VUE_APP_HOST
          }`;
          this.resetStore();
          this.$router.push({ path: '/login' });
        } else {
          this.$dialog.alert(
            '통신오류가 발생하였습니다. 잠시 후 다시 시도해주세요.',
            {
              okText: '확인',
              customClass: 'zuly-alert',
              backdropClose: true
            }
          );
        }
      });
    }
  },
  async created() {
    // 배송일 데이터 가져오기
    CalendarAPI.GetFirstDeliveryDays().then(({ data }) => {
      this.deliveryDateData = data.result;
    });
    // 카드 정보 가져오기
    MemberAPI.GetMyPage().then(({ data }) => {
      if (data.result) {
        this.setMypageData(data.data);
      } else {
        // 개인정보를 가져 올 수 없음.
        alert('정보를 가져올 수 없습니다. 잠시 후 다시 시도해 주세요.');
      }
    });
  }
};
</script>
<style scoped lang="scss" src="@/assets/css/closet-style.scss"></style>
<style scoped lang="scss">
.content {
  margin-top: 15px !important;
}
.restart-wrap {
  border-top: 1px solid #333;
  border-bottom: 1px solid #3d3d35;
  padding-top: 20px;
  padding-bottom: 30px;
}
.change-payment {
  margin-top: 30px;
  .card-input-wrap {
    margin-top: 20px;
    padding-top: 20px;
    border-top: 1px solid #dadada;
  }
  .button-wrap {
    text-align: right;
    button {
      vertical-align: top;
    }
    .btn-recertification {
      width: 200px;
    }
    .btn-toggle-payment {
      width: 88px;
      margin-left: 10px;
    }
  }
}

.label-card {
  @include fontSize(14px);
  display: block;
  margin-bottom: 5px;
}

.form-row {
  margin-bottom: 10px;
  &:last-child {
    margin-bottom: 0;
  }
}

.restart-button-wrap {
  margin-top: 30px;
  button {
    width: calc(50% - 5px);
    &:nth-child(2) {
      margin-left: 10px;
    }
  }
}

.list-flex {
  background-color: #e9e9e9;
  .item {
    line-height: 18px;
    letter-spacing: 0;
  }
  .selected-day {
    color: #566b9c;
    background-color: #f5f5f5;
    border: 1px solid #dadada;
  }
  .holy-day {
    color: #f45649;
    background-color: #f5f5f5;
    border: 1px solid #dadada;
  }
}

@media (min-width: 1080px) {
  .content {
    margin-top: 20px !important;
  }
  .restart-wrap {
    display: flex;
    background-color: #f7f7f7;
    padding-top: 30px;
    padding-left: 30px;
    padding-right: 30px;
    padding-bottom: 30px;
    border-top: 2px solid $color-primary;
    .change-delivery,
    .change-payment {
      flex: 0 1 50%;
      max-width: 50%;
    }
    .change-delivery {
    }
    .change-payment {
      margin-top: 0;
      margin-left: 60px;
      .change-payment-inner {
        display: flex;
        justify-content: space-between;
        .txt-form-title {
          span {
            display: block;
          }
        }
      }
      .card-input-wrap {
        margin-top: 20px;
        border-top: 1px solid #cacaca;
      }
    }
  }
  .restart-button-wrap {
    text-align: right;
    button {
      width: 252px;
      &:nth-child(2) {
        margin-left: 24px;
      }
    }
  }
}
</style>
