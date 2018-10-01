<template>
  <div class="contents">
    <div class="contents-header">
      <h3>구독 정보입니다.</h3>
    </div>
    <div class="content">
      <div class="product-information">
        <div class="form-title-wrap">
          <p class="txt-form-title">구독 상품 정보</p>
        </div>
        <div class="table-info">
          <div class="header">
            <div class="cell">
              배송/회수 예정일
            </div>
            <div class="cell">
              이용 요금제
            </div>
            <div class="cell">
              결제 예정일
            </div>
            <div class="cell">
              할인 혜택
            </div>
          </div>
          <div class="body">
            <div class="cell">
              {{ SubscriptionInfo.info.return_date }}
            </div>
            <div class="cell">
              {{ SubscriptionInfo.info.membership_name }} / {{ SubscriptionInfo.info.membership_price }}원
            </div>
            <div class="cell">
              {{ SubscriptionInfo.info.payment_date }}
            </div>
            <div class="cell">
              <div :key="idx" v-for="(data, idx) in SubscriptionInfo.info.price_coupons">
                {{ data.coupon_name }}
                <span class="txt-time-limit"> ({{ data.end_date }} 결제시까지 가능)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="button-wrap info-button-wrap">
        <!-- 버튼-->
        <button
          type="button"
          v-if="User.type !== 14703"
          class="btn btn-primary h-56"
          :disabled="isStopSubscription || User.type === 14702"
          @click="clickStopSubscription"

        >
          구독 중지
        </button>

        <button
          v-if="User.type === 14701"
          type="button"
          class="btn btn-primary h-56"
          :style="isChangeDelivery ? 'background-color: #797979' : ''"
          @click="toggleChangeDelivery"
        >
          {{ txtChangeDelivery }}
        </button>
        <button
          type="button"
          class="btn btn-primary h-56"
          @click="clickGoRestart"
        >
          <!--v-if="User.type === 14703"-->
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
                  v-for="(data, idx) in ChangeDeliveryDays"
                  :key="idx"
                  class="item w-20 h-50"
                  :class="[{'holy-day': data.is_holiday === 'Y'}, {'selected-day': data.dday}, {'selected': data.solar_date === deliveryDate}]"
                  style="flex-direction: column;"
                  :style="calcDate(data, idx)"
                  @click="clickDeliveryDate(data, $event)"
                >
                  <span class="txt-date-number">{{ data.month_day }}</span>
                  <span>{{ data.day_of_week }}</span>
                </li>
              </ul>
            </div>
            <ol class="list">
              <li>
                1. 바로 다음 구독 상품의 배송일만 변경 가능하며 배송일을
                변경하시더라도 <br v-show="$mq !== 'sm'">예정된 구독 일정에 따라 다음 구독 상품의
                회수 예정일은 변경되지 않습니다.
              </li>
              <li>
                2. 이번에 이용 중인 상품의 회수는 변경되는 배송일이 맞추어
                함께 이루어집니다.
              </li>
            </ol>
          </div>
        </div>
        <div class="button-wrap">
          <button type="button" class="btn btn-primary h-56" @click="clickChangeDelivery">배송 예정일 변경</button>
        </div>
      </div>
      <div class="coupon">
        <div class="form-title-wrap">
          <p class="txt-form-title">이용 상품 구매 시 가능한 쿠폰</p>
        </div>

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
            <tr
              v-if="SubscriptionInfo.coupons.length === 0"
            >
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
                  {{ data.sale_rate }}{{ data.coupon_type === 15001 ? '원' : '%'}}
                </div>
              </td>
              <td>
                <div class="txt">{{ data.coupon_name }}</div>
              </td>
              <td>
                <div class="txt">
                  {{ data.start_date }}~<br/>
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
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  name: 'Information',
  data() {
    return {
      isChangeDelivery: false, // 배송 예정일 변경 활성화 & 비활성화
      isStopSubscription: false, // 구독중지 상태 체크
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
      successRestart: 'common/successRestart'
    }),
    clickStopSubscription() {
      this.$dialog
        .confirm(
          '이용 중인 구독 서비스를 중단 하시겠습니까?<br/>현재 이용 중인 옷의 회수 및 확인 작업 후 <br/>최종 완료 처리가 진행됩니다.',
          {
            okText: '중지하기',
            cancelText: '취소',
            loader: true,
            customClass: 'zuly-dialog',
            backdropClose: true,
            html: true
          }
        )
        .then(dialog => {
          this.isStopSubscription = true;
          dialog.close();
        })
        .catch(() => {
          console.log('구독 중지 안해!');
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
      if (eleTarget.classList.contains('selected-day')) {
        return false;
      }
      this.deliveryDate = data.solar_date;
    },
    clickGoRestart() {
      this.successRestart();
      this.$router.push({ path: '/closet/subscription/restart' });
    },
    toggleChangeDelivery() {
      this.isChangeDelivery = !this.isChangeDelivery;
    },
    clickChangeDelivery() {
      if (this.deliveryDate === '') {
        this.$dialog.alert('날짜를 선택해 주십시오.', {
          okText: '확인',
          customClass: 'zuly-alert'
        });
      } else {
        this.$dialog
          .alert('변경되었습니다.', {
            okText: '확인',
            customClass: 'zuly-alert',
            backdropClose: true
          })
          .then(dialog => {
            this.isChangeDelivery = false;
            dialog.close();
          });
      }
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
    pickCurrentDDay() {
      _.forEach(this.ChangeDeliveryDays, value => {
        if (value.dday) {
          this.dday = value.month_day;
        }
      });
    }
  },
  created() {
    this.getSubscriptionInfo();
    this.getChangeDeliveryDays();
    if (this.User.type !== 14703) {
      // 현재 유저 상태 : 구독중, 구독중지 요청중
      console.log('구독 중, 구독중지 요청');
    } else {
      // 현재 유저 상태 : 구독 중지
      console.log('구독 중지');
    }
  }
};
</script>
<style scoped lang="scss" src="@/assets/css/closet-style.scss">
</style>
<style scoped lang="scss">
.content {
  padding-top: 20px;
  border-top: 1px solid #333;
}

.product-information {
  .table-info {
    @include fontSize(14px);
    background-color: #f5f5f5;
    color: #797979;
    display: flex;
    border-top: 1px solid #e9e9e9;
    border-bottom: 1px solid #e9e9e9;
    .header {
      .cell {
        padding-left: 10px;
      }
    }
    .body {
      flex: 1 0 auto;
      .cell {
        text-align: right;
        padding-right: 10px;
      }
    }
    .cell {
      padding-top: 10px;
      padding-bottom: 10px;
      border-top: 1px solid #e9e9e9;
      &:first-child {
        border: 0;
      }
      .txt-time-limit {
        @include fontSize(12px);
      }
    }
  }
}

.button-wrap {
  margin-top: 10px;
}

.info-button-wrap {
  display: flex;
  justify-content: space-between;
  button {
    flex: 0 0 calc(50% - 5px);
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

.coupon {
  margin-top: 30px;
  .table-coupon {
    border-top: 1px solid #3d3d35;
    border-bottom: 1px solid #3d3d35;
    table {
      width: 100%;
      table-layout: fixed;
      @include fontSize(15px);
      th,
      td {
        vertical-align: middle;
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
        border-top: 1px solid #e9e9e9;
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
    &::after {
      @include fontSize(11px);
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

@media (min-width: 1080px) {
  .content {
    padding-top: 0;
    border-top: 0;
  }
  .product-information {
    .table-info {
      @include fontSize(15px);
      background-color: #fff;
      color: $color-primary;
      display: block;
      .header,
      .body {
        display: flex;
        align-items: center;
        .cell {
          text-align: center;
          flex-grow: 1;
          flex-shrink: 0;
          padding: 0;
          max-width: 25%;
          flex-basis: 25%;
        }
      }
      .header {
        border-top: 2px solid $color-primary;
        padding-top: 11px;
        padding-bottom: 11px;
        .cell {
          font-weight: 700;
          border-top: 0;
        }
      }
      .body {
        padding-top: 14px;
        padding-bottom: 14px;
        border-top: 1px solid #e9e9e9;
        .cell {
          border-top: 0;
        }
      }
      .cell {
        .txt-time-limit {
          @include fontSize(15px);
        }
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
      }
    }
  }
}
</style>
