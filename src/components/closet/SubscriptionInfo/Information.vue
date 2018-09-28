<template>
  <div class="contents">
    <div class="contents-header">
      <h3>구독 상품 정보</h3>
    </div>
    <div class="content">
      <div class="product-information">
        <div class="table-info">
        <div class="header">
          <div class="cell">
            배송/회수 예정일
          </div>
          <div class="cell">
            이용 요금제
          </div>
          <div class="cell">
            배송/회수 예정일
          </div>
          <div class="cell">
            할인 혜택
          </div>
        </div>
        <div class="body">
          <div class="cell">
            2018.09.03
          </div>
          <div class="cell">
            월 2회 최대 4벌 이용 / 78,000원
          </div>
          <div class="cell">
            2018.09.03
          </div>
          <div class="cell">
            첫달 무료 이용 <span class="txt-time-limit">(~ 2018.09.10일 결제시까지 가능)</span>
          </div>
        </div>
      </div>

        <div class="button-wrap">
          <!-- 버튼-->
          <button
            type="button"
            class="btn btn-primary h-56"
            :disabled="isStopSubscription"
            @click="clickStopSubscription"
          >
            구독 중지
          </button>
          <button
            type="button"
            class="btn btn-primary h-56"
            @click="clickChangeDelivery"
          >
            {{ txtChangeDelivery }}
          </button>
        </div>
      </div>

      <div class="change-delivery" v-if="isChangeDelivery">
        <div class="form-title-wrap">
          <p class="txt-form-title">현재 변경 가능한 날짜 입니다.</p>
        </div>
        <div>
          <ul class="list-flex">
            <li
              v-for="(data, idx) in tempDeliveryData"
              :key="idx"
              class="item w-20 h-50"
              :class="[{'holy-day': data.is_holiday === 'Y'}]"
              style="flex-direction: column;"
              :style="calcDate(data, idx)"
            >
              <span class="txt-date-number">{{ data.month_day }}</span>
              <span>{{ data.day_of_week }}</span>
            </li>
          </ul>
        </div>
        <ol class="list">
          <li>
            1.  바로 다음 구독 상품의 배송일만 변경 가능하며 배송일을
            변경하시더라도 예정된 구독 일정에 따라 다음 구독 상품의
            회수 예정일 (9월 19일)은 변경되지 않습니다.
          </li>
          <li>
            2. 이번에 이용 중인 상품의 회수는 변경되는 배송일이 맞추어
            함께 이루어집니다.
          </li>
        </ol>
        <div class="button-wrap">
          <button type="button" class="btn btn-primary h-56">배송 예정일 변경</button>
        </div>

      </div>

      <div class="coupon">
        <div class="form-title-wrap">
          <p class="txt-form-title">이용 상품 구매 시 가능한 쿠폰 입니다.</p>
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
            <tr>
              <td>
                <div class="coupon-label">
                  <span>30%</span>
                </div>
              </td>
              <td>
                <div class="txt">WHITE 등급<br/>일반쿠폰 30%</div>
              </td>
              <td>
                <div class="txt">
                  2018.03.22~<br/>2019.01.01
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div class="coupon-label">
                  <span>30%</span>
                </div>
              </td>
              <td>
                <div class="txt">WHITE 등급<br/>일반쿠폰 30%</div>
              </td>
              <td>
                <div class="txt">
                  2018.03.22~<br/>2019.01.01
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
export default {
  name: 'Information',
  data() {
    return {
      isChangeDelivery: false, // 배송 예정일 변경 활성화 & 비활성화
      isStopSubscription: false, // 구독중지 상태 체크
      tempDeliveryData: [
        {
          solar_date: '2018-10-04',
          month_day: '10/4',
          day_of_week: '(목)',
          is_holiday: 'N'
        },
        {
          solar_date: '2018-10-05',
          month_day: '10/5',
          day_of_week: '(금)',
          is_holiday: 'N'
        },
        {
          solar_date: '2018-10-08',
          month_day: '10/8',
          day_of_week: '(월)',
          is_holiday: 'N'
        },
        {
          solar_date: '2018-10-09',
          month_day: '10/9',
          day_of_week: '(화)',
          is_holiday: 'Y'
        },
        {
          solar_date: '2018-10-10',
          month_day: '10/10',
          day_of_week: '(수)',
          is_holiday: 'N'
        },
        {
          solar_date: '2018-10-11',
          month_day: '10/11',
          day_of_week: '(목)',
          is_holiday: 'N'
        },
        {
          solar_date: '2018-10-12',
          month_day: '10/12',
          day_of_week: '(금)',
          is_holiday: 'N'
        }
      ]
    };
  },
  computed: {
    txtChangeDelivery() {
      if (this.isChangeDelivery) {
        return '취소';
      } else {
        return '배송 예정일 변경';
      }
    }
  },
  methods: {
    clickStopSubscription() {
      this.$dialog
        .confirm('정말 구독 중지 하시겠습니까?', {
          okText: '확인',
          cancelText: '취소',
          loader: true
        })
        .then((dialog) => {
          this.isStopSubscription = true;
          dialog.close();
        })
        .catch(() => {
          console.log('구독 중지 안해!');
        });
    },
    clickChangeDelivery() {
      this.isChangeDelivery = !this.isChangeDelivery;
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
    }
  }
};
</script>
<style scoped lang="scss" src="@/assets/css/closet-style.scss">
</style>
<style scoped lang="scss">
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

  .button-wrap {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    button {
      flex: 0 0 calc(50% - 5px);
    }
  }
}

.change-delivery {
  margin-top: 30px;
  .list-flex {
    background-color: #f5f5f5;
  }
  .list {
    @include fontSize(14px);
    li {
      margin-top: 10px;
      color: $color-secondary;
    }
  }
  .button-wrap {
    margin-top: 10px;
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
        text-align: center;
        .txt {
          display: inline-block;
          text-align: left;
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
    width: 70px;
    height: 38px;
    border: 1px solid #333;
    border-radius: 3px;
    padding-right: 16px;
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

}
</style>
