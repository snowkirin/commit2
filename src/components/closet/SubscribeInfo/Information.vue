<template>
  <div>
    <div class="contents">
      <div class="contents-header">
        <h3>이용중인 구독 서비스 정보입니다.</h3>
      </div>

      <div class="content">
        <div class="product-information">
          <div class="form-title-wrap">
            <p class="txt-form-title">구독 정보</p>
          </div>
          <div class="table-info">
            <!-- Mobile용 Table -->
            <table v-if="$mq !== 'lg'">
              <tbody>
                <tr>
                  <th>배송/회수 예정일</th>
                  <td>
                    {{
                      User.type !== 14703
                        ? SubscriptionInfo.info.return_date
                        : ''
                    }}
                  </td>
                </tr>
                <tr>
                  <th>이용 요금제</th>
                  <td>
                    {{
                      User.type !== 14703
                        ? SubscriptionInfo.info.membership_name +
                          SubscriptionInfo.info.membership_price +
                          '원'
                        : '이용중이 아닙니다.'
                    }}
                  </td>
                </tr>
                <tr>
                  <th>결제 예정일</th>
                  <td>
                    {{
                      User.type !== 14703
                        ? SubscriptionInfo.info.payment_date
                        : ''
                    }}
                  </td>
                </tr>
                <tr>
                  <th>할인 혜택</th>
                  <td>
                    <div
                      v-if="User.type !== 14703"
                      :key="idx"
                      v-for="(data, idx) in SubscriptionInfo.info.price_coupons"
                      class="txt-discount"
                    >
                      {{ data.coupon_name }}
                      <span class="txt-time-limit">
                        ({{ data.end_date }} 결제시까지 적용)</span
                      >
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <!-- Desktop용 Table -->

            <table v-else>
              <thead>
                <th>배송/회수 예정일</th>
                <th>이용 요금제</th>
                <th>결제 예정일</th>
                <th>할인 혜택</th>
              </thead>
              <tbody>
                <tr>
                  <template v-if="User.type !== 14703">
                    <td>{{ SubscriptionInfo.info.return_date }}</td>
                    <td>
                      {{
                        `${SubscriptionInfo.info.membership_name} / ${
                          SubscriptionInfo.info.membership_price
                        }원`
                      }}
                    </td>
                    <td>{{ SubscriptionInfo.info.payment_date }}</td>
                    <td>
                      <div
                        :key="idx"
                        v-for="(data, idx) in SubscriptionInfo.info
                          .price_coupons"
                        class="txt-discount"
                      >
                        {{ data.coupon_name }}
                        <span class="txt-time-limit">
                          ({{ data.end_date }} 결제시까지 적용)</span
                        >
                      </div>
                    </td>
                  </template>
                  <template v-else>
                    <td colspan="4">이용중이 아닙니다.</td>
                  </template>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="button-wrap info-button-wrap">
          <!-- 버튼 -->
          <button
            type="button"
            v-if="User.type !== 14703"
            class="btn btn-primary h-56"
            :disabled="User.type === 14702"
            @click="clickStopSubscription"
          >
            구독 중지
          </button>

          <!--
            <button
              v-if="User.type === 14701"
              type="button"
              class="btn btn-primary h-56"
              :style="isChangeDelivery ? 'background-color: #797979' : ''"
              @click="toggleChangeDelivery"
            >
              {{ txtChangeDelivery }}
            </button>
          -->
          <button
            v-if="User.type === 14703"
            type="button"
            class="btn btn-primary h-56"
            @click="clickGoRestart"
          >
            구독 재시작
          </button>
        </div>
        <div class="change-delivery" v-if="isChangeDelivery">
          <div class="inner-wrap">
            <div class="form-title-wrap">
              <p class="txt-form-title">현재 변경 가능한 날짜</p>
            </div>
            <div class="row-content">
              <div class="date">
                <ul class="list-flex">
                  <li
                    v-for="(data, idx) in ChangeDeliveryDays.list"
                    :key="idx"
                    class="item w-20 h-50"
                    :class="[
                      { 'holy-day': data.is_holiday === 'Y' },
                      { 'selected-day': data.dday },
                      { selected: data.solar_date === deliveryDate }
                    ]"
                    style="flex-direction: column;"
                    :style="calcDate(data, idx)"
                    @click="clickDeliveryDate(data, $event);"
                  >
                    <span class="txt-date-number">{{ data.month_day }}</span>
                    <span>{{ data.day_of_week }}</span>
                  </li>
                </ul>
              </div>
              <ol class="list">
                <li>
                  1. 바로 다음 구독 상품의 배송일만 변경 가능하며 배송일을
                  변경하시더라도 <br v-show="$mq !== 'sm'" />예정된 구독 일정에
                  따라 다음 구독 상품의 회수 예정일은 변경되지 않습니다.
                </li>
                <li>
                  2. 이번에 이용 중인 상품의 회수는 변경되는 배송일이 맞추어
                  함께 이루어집니다.
                </li>
              </ol>
            </div>
          </div>
          <div class="button-wrap">
            <button
              type="button"
              class="btn btn-primary h-56"
              @click="clickChangeDelivery"
              :disabled="deliveryDate === ''"
            >
              배송 예정일 변경
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="contents">
      <div class="contents-header">
        <h3>이용 상품 구매시 사용 가능한 쿠폰입니다.</h3>
      </div>
      <div class="content">
        <div class="coupon">
          <div class="table-coupon">
            <table>
              <thead>
                <tr>
                  <th>쿠폰 종류</th>
                  <th>쿠폰명</th>
                  <th>사용가능기간</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="SubscriptionInfo.coupons.length === 0">
                  <td colspan="3" style="text-align: center">
                    현재 쿠폰이 없습니다.
                  </td>
                </tr>
                <tr
                  v-else
                  v-for="(data, idx) in SubscriptionInfo.coupons"
                  :key="idx"
                >
                  <td>
                    <div class="coupon-label">
                      {{
                        data.sale_type === 14602
                          ? `${data.sale_price}원`
                          : `${data.sale_rate}%`
                      }}
                    </div>
                  </td>
                  <td>
                    <div class="txt">{{ data.coupon_name }}</div>
                  </td>
                  <td>
                    <div class="txt">
                      {{ data.start_date }}~<br />
                      {{ data.end_date }}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  name: 'Information',
  data() {
    return {
      isChangeDelivery: false, // 배송 예정일 변경 활성화 & 비활성화
      deliveryDate: ''
    };
  },
  computed: {
    ...mapGetters({
      User: 'login/User',
      SubscriptionInfo: 'subscriptions/SubscriptionInfo',
      ChangeDeliveryDays: 'codes/ChangeDeliveryDays'
    }),
    txtChangeDelivery() {
      if (this.isChangeDelivery) {
        return '취소';
      } else {
        return '배송 예정일 변경';
      }
    }
  },
  methods: {
    ...mapActions({
      getSubscriptionInfo: 'subscriptions/getSubscriptionInfo',
      getChangeDeliveryDays: 'codes/getChangeDeliveryDays',
      successRestart: 'common/successRestart',
      postCancel: 'login/postCancel', // 구독 중지 및 회원 탈퇴
      changeUserType: 'login/changeUserType', // 유저 타입 변경,
      patchUpdateSubscriptionReturnDate:
        'subscriptions/patchUpdateSubscriptionReturnDate' // 배송일 변경
    }),

    // 구독중지
    clickStopSubscription() {
      this.$dialog
        .confirm(
          '이용 중인 구독 서비스를 중단 하시겠습니까?<br/>현재 이용 중인 옷의 회수 및 확인 작업 후 <br/>최종 완료 처리가 진행됩니다.',
          {
            okText: '중지하기',
            cancelText: '취소',
            customClass: 'zuly-dialog',
            backdropClose: true,
            html: true
          }
        )
        .then(() => {
          const formData = {
            reqType: 15101
          };
          this.postCancel(formData).then(res => {
            if (res.data.result) {
              this.$dialog.alert('구독 중지되었습니다.', {
                okText: '확인',
                customClass: 'zuly-alert',
                backdropClose: true
              });
              this.changeUserType(14702);
            } else {
              this.$dialog.alert('통신 오류가 발생하였습니다.', {
                okText: '확인',
                customClass: 'zuly-alert',
                backdropClose: true
              });
            }
          });
        });
    },
    // 구독 중지 상태일때 구독 재시작 버튼
    clickGoRestart() {
      this.successRestart();
      this.$router.push({ path: '/closet/subscribe-info/restart' });
    },

    // 배송일 스타일 관련
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
    // 배송일 변경 Show/Hide
    toggleChangeDelivery() {
      this.isChangeDelivery = !this.isChangeDelivery;
    },
    // 배송일 날짜 클릭
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
      if (eleTarget.classList.contains('selected-day')) {
        return false;
      }
      this.deliveryDate = data.solar_date;
    },

    // 배송일 변경 버튼 클릭
    clickChangeDelivery() {
      const formData = {
        idNext: this.ChangeDeliveryDays.idNext,
        date: this.deliveryDate
      };

      this.patchUpdateSubscriptionReturnDate(formData).then(res => {
        if (res.data.result) {
          this.$dialog.alert('변경되었습니다.', {
            okText: '확인',
            customClass: 'zuly-alert',
            backdropClose: true
          });
          this.isChangeDelivery = false;
        } else {
          this.$dialog.alert(
            '통신 오류가 발생하였습니다. 잠시후 다시 시도해 주세요.',
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
  created() {
    if (this.User.type === 14701) {
      // 구독중일때만 배송일 변경관련 정보 가져옴
      // this.getChangeDeliveryDays();
    }
    if (this.User.type !== 14703) {
      this.getSubscriptionInfo();
    }
  }
};
</script>
<style scoped lang="scss" src="@/assets/css/closet-style.scss"></style>
<style scoped lang="scss">
.contents {
  &:nth-child(2) {
    padding-top: 40px;
  }
}

.content {
  margin-top: 0 !important;
}

.contents-header {
  border-bottom: 1px solid $color-primary;
  padding-bottom: 15px;
}

.product-information {
  margin-top: 10px;
  .table-info {
    @include fontSize(14px);
    background-color: #f5f5f5;
    color: #797979;
    border-top: 1px solid #e9e9e9;
    border-bottom: 1px solid #e9e9e9;
    table {
      width: 100%;
      table-layout: fixed;
    }
    tr {
      &:last-child {
        th,
        td {
          border-bottom: 0;
        }
      }
    }
    th,
    td {
      padding-top: 10px;
      padding-bottom: 10px;
      border-bottom: 1px solid #e9e9e9;
    }
    th {
      text-align: left;
      width: 120px;
      padding-left: 10px;
    }
    td {
      text-align: right;
      padding-right: 10px;
      word-break: keep-all;
    }
    .txt-time-limit {
      @include fontSize(12px);
    }
    .txt-discount {
      color: #f45649;
    }
  }
}

.coupon {
  .table-coupon {
    table {
      width: 100%;
      @include fontSize(15px);
      th,
      td {
        vertical-align: middle;
        border-bottom: 1px solid #e9e9e9;
      }
      th {
        color: $color-primary;
        font-weight: 700;
        padding-top: 10px;
        padding-bottom: 10px;
        &:nth-child(1) {
          text-align: left;
        }
        &:nth-child(2),
        &:nth-child(3) {
          text-align: center;
        }
      }
      td {
        padding-top: 16px;
        padding-bottom: 15px;
        .txt {
          display: inline-block;
          text-align: left;
        }
        &:nth-child(2),
        &:nth-child(3) {
          text-align: center;
        }
        &:nth-child(3) {
          @include langEn;
        }
      }
      tbody {
        tr {
          &:last-child {
            td {
              border-bottom: 1px solid $color-primary;
            }
          }
        }
      }
    }
  }
  .coupon-label {
    @include fontSize(15px, en);
    line-height: 36px;
    font-weight: 700;
    text-align: center;
    position: relative;
    display: inline-block;
    height: 38px;
    border: 1px solid #333;
    border-radius: 3px;
    padding-left: 16px;
    padding-right: 32px;
    white-space: nowrap;
    &::after {
      @include fontSize(11px, en);
      content: 'ZULY';
      text-align: center;
      line-height: 16px;
      font-weight: 400;
      color: #fff;
      display: block;
      position: absolute;
      width: 36px;
      height: 16px;
      background-color: #333;
      transform-origin: 0 0;
      transform: rotate(90deg);
      left: 100%;
      top: 0;
    }
  }
}

.button-wrap {
  margin-top: 10px;
}

.info-button-wrap {
  text-align: right;
  button {
    width: calc(50% - 5px);
    &:nth-child(2) {
      margin-left: 10px;
    }
  }
}

.change-delivery {
  margin-top: 30px;
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
  .list {
    @include fontSize(14px);
    li {
      margin-top: 10px;
      color: $color-secondary;
    }
  }
}

@media (min-width: 1080px) {
  .contents {
    &:nth-child(2) {
      padding-top: 50px;
    }
  }
  .content {
    margin-top: 0 !important;
  }
  .contents-header {
    padding-bottom: 20px;
    border-bottom: 2px solid $color-primary;
  }
  .product-information {
    margin-top: 0;
    .form-title-wrap {
      display: none;
    }
    .table-info {
      @include fontSize(15px);
      background-color: #fff;
      color: $color-primary;
      border-top: 0;

      table {
        width: 100%;
        table-layout: fixed;
      }
      tr {
        &:last-child {
          th,
          td {
            border-bottom: 0;
          }
        }
      }
      th,
      td {
        border-bottom: 1px solid #e9e9e9;
        text-align: center;
        vertical-align: middle;
      }
      th {
        width: auto;
        padding-left: 0;
        font-weight: 700;
      }
      td {
        padding-right: 0;
        padding-top: 15px;
        padding-bottom: 15px;
      }
      .txt-time-limit {
        @include fontSize(15px);
      }
    }
  }
  .button-wrap {
    margin-top: 30px;
    text-align: right;
    button {
      width: 252px;
      &:nth-child(2) {
        margin-left: 24px;
      }
    }
  }
  .info-button-wrap {
    display: block;
  }

  .change-delivery {
    .inner-wrap {
      background-color: #f7f7f7;
      padding: 30px;
      border-top: 1px solid #e9e9e9;
      border-bottom: 1px solid $color-primary;
    }
    .row-content {
      display: flex;
      .date,
      .list {
        flex: 0 1 50%;
        max-width: 50%;
      }
      .list {
        margin-left: 30px;
        li {
          margin-top: 0;
        }
      }
    }
  }
  .coupon {
    .table-coupon {
      table {
        th,
        td {
          text-align: center !important;
        }
        tbody {
          tr {
            &:last-child {
              td {
                border-bottom: 1px solid #e9e9e9;
              }
            }
          }
        }
      }
    }
  }
}
</style>
