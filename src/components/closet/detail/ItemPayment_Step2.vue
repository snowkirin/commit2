<template>
  <div>
    <div class="mobile" v-if="$mq !== 'lg'">
      <div class="payment-item">
        <div class="payment-item__header">
          <p>결제 상품</p>
        </div>
        <div class="payment-item__content">
          <div class="inner">
            <div class="items">
              <div
                v-for="(data, idx) in selectedProduct"
                :key="idx"
                class="item"
              >
                <p class="txt-name">{{data.product.name}}</p>
                <p class="txt-price"><span class="amount">{{ data.product.price | currency('', 0) }}</span><span class="unit">원</span></p>
              </div>
            </div>
            <div class="coupon">
              <select v-model="selectCoupon">
                <option value="">쿠폰 선택 하세요</option>
                <option v-for="(data, idx) in couponData" :key="idx" :value="data">
                  {{ data.coupon_name }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <div class="payment-item__footer">
          <p class="txt-final-payment">최종 결제 금액</p>
          <p class="txt-final-price">
            <span class="amount">{{finalPaymentAmount | currency('', 0)}}</span>
            <span class="unit">원</span>
          </p>
        </div>
      </div>
      <div class="check-wrap">
        <div class="custom-checkbox">
          <input
            class="custom-control-input"
            type="checkbox"
            id="productPayment"
          >
          <label
            class="custom-control-label"
            for="productPayment"
          >
            상기 상품 구매는 줄라이 구독 서비스를 통해 현재 고객님께서 이용중인 상품을 구매하는 것이므로 교환 및 환불이 불가능합니다. 구매 진행에 동의합니다 (필수)
          </label>
        </div>
      </div>
      <div class="button-wrap">
        <button
          type="button"
          @click="backStep"
          class="btn btn-primary h-50"
        >
          취소
        </button>
        <button
          type="button"
          @click="nextStep"
          class="btn btn-primary h-50"
        >
          등록된 카드로 결제
        </button>
      </div>

    </div>
    <div class="desktop" v-else>
      <div class="payment-table">
          <table>
            <colgroup>
              <col width="*">
              <col width="180">
            </colgroup>
            <thead>
            <tr>
              <th>결제 상품</th>
              <th>구매 가격</th>
            </tr>
            </thead>
            <tfoot>
            <tr>
              <td colspan="2">
                <div class="final-payment">
                  <p class="txt-final-payment">최종 결제 금액</p>
                  <div class="final-price">
                    <span class="txt-price-amount">{{finalPaymentAmount | currency('', 0)}}</span>
                    <span class="txt-price-unit">원</span>
                  </div>
                </div>
              </td>
            </tr>
            </tfoot>
            <tbody>
            <tr
              v-for="(data, idx) in selectedProduct"
              :key="idx"
              class="item"
            >
              <td>
                <div class="left-side">
                  <div class="image">
                    <img :src="data.image.path">
                  </div>
                </div>
                <div class="right-side">
                  <div>
                    <p class="txt-name">{{ data.product.name }}</p>
                    <p class="txt-brand">{{ data.product.brand }}</p>
                  </div>
                </div>
              </td>
              <td>
                <span class="txt-price-amount">{{data.product.price | currency('', 0)}}</span><span class="txt-price-unit">원</span>
              </td>
            </tr>
            <tr class="coupon">
              <td colspan="2">
                <div class="coupon-wrap">
                  <p class="txt-coupon">쿠폰</p>
                  <div class="select-wrap">
                    <select v-model="selectCoupon">
                      <option value="">쿠폰 선택 하세요</option>
                      <option v-for="(data, idx) in couponData" :key="idx" :value="data">
                        {{ data.coupon_name }}
                      </option>
                    </select>
                  </div>
                </div>

              </td>
            </tr>
            </tbody>

          </table>
        </div>
      <div class="check-wrap">
        <div class="custom-checkbox">
          <input
            class="custom-control-input"
            type="checkbox"
            id="productPayment"
          >
          <label
            class="custom-control-label"
            for="productPayment"
          >
            상기 상품 구매는 줄라이 구독 서비스를 통해 현재 고객님께서 이용중인 상품을 구매하는 것이므로 교환 및 환불이 불가능합니다. 구매 진행에 동의합니다 (필수)
          </label>
        </div>
      </div>
      <div class="button-wrap">
        <button
          type="button"
          @click="backStep"
          class="btn btn-primary h-50"
        >
          취소
        </button>
        <button
          type="button"
          @click="nextStep"
          class="btn btn-primary h-50"
        >
          등록된 카드로 결제
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ItemPayment_Step2',
  props: {
    selectedProduct: Array
  },
  data() {
    return {
      couponData: [
        {
          sale_type: 14601,
          sale_rate: 20,
          coupon_name: '20% 할인 쿠폰'
        },
        {
          sale_type: 14601,
          sale_rate: 30,
          coupon_name: '30% 할인 쿠폰'
        },
        {
          sale_type: 14602,
          sale_price: 50000,
          coupon_name: '5만원 할인 쿠폰'
        },
        {
          sale_type: 14602,
          sale_price: 3000,
          coupon_name: '3천원 할인 쿠폰'
        }
      ],
      selectCoupon: '',
      finalPrice: 0,
      progress: false
    };
  },
  computed: {
    finalPaymentAmount() {
      let price = 0;
      _.forEach(this.selectedProduct, value => {
        price += value.product.price;
      });
      if (this.selectCoupon !== '') {
        if (this.selectCoupon.sale_type === 14601) {
          price = price - price * (this.selectCoupon.sale_rate / 100);
        } else if (this.selectCoupon.sale_type === 14602) {
          price = price - this.selectCoupon.sale_price;
        }
      }
      return price;
    }
  },
  methods: {
    backStep() {
      this.$emit('sequence', 'step1');
    },
    nextStep() {
      const paymentCheck = document.getElementById('productPayment');
      this.finalPrice = this.finalPaymentAmount;
      if (this.finalPrice === 0) {
        alert('알 수 없는 에러가 발생!');
      } else {
        if (paymentCheck.checked) {
          alert(`${this.finalPrice}원이 결재됩니다!!!!!!!!!!!!!!!!!!!!!!!`);
          this.$emit('sequence', 'step3');
        } else {
          alert('구매 진행에 동의해주세요!');
        }
      }
    }
  },
  created() {
    //  시작할때 Subscription.info 정보 호출해야 쿠폰 데이터를 가져 올 수 있다.
  }
};
</script>

<style scoped lang="scss">
.mobile {
  .payment-item {
    display: flex;
    flex-direction: column;
    border: 2px solid #e9e9e9;
    margin-bottom: 20px;
    &__header {
      padding: 10px 15px;
      p {
        @include fontSize(14px);
        color: #797979;
      }
    }
    &__content {
      padding: 0 15px;
      .inner {
        padding-top: 16px;
        padding-bottom: 20px;
        border-top: 1px solid #e9e9e9;
      }
      .item {
        display: flex;
        justify-content: space-between;
        margin-bottom: 15px;
        &:last-child {
          margin-bottom: 20px;
        }
      }
      .txt-name,
      .txt-price {
        display: inline-block;
        vertical-align: middle;
      }
      .txt-name {
        @include fontSize(14px);
      }
      .txt-price {
        font-weight: 700;
        span {
          vertical-align: middle;
        }
        .amount {
          @include fontSize(17px, en);
        }
        .unit {
          @include fontSize(17px);
        }
      }
      .coupon {
        position: relative;
        select {
          @include fontSize(15px);
          height: 50px;
          width: 100%;
          padding-left: 10px;
          padding-right: 10px;
          border: 1px solid #c4c4c4;
        }
      }
    }
    &__footer {
      display: flex;
      background-color: #f7f7f7;
      height: 50px;
      padding-left: 15px;
      padding-right: 15px;
      font-weight: 700;
      align-items: center;
      justify-content: space-between;
      .txt-final-payment,
      .txt-final-price {
      }
      .txt-final-payment {
        @include fontSize(15px);
      }
      .txt-final-price {
        color: #ec4b1a;
        span {
          vertical-align: middle;
        }
        .amount {
          @include fontSize(20px, en);
        }
        .unit {
          @include fontSize(15px);
        }
      }
    }
  }
  .check-wrap {
    margin-bottom: 30px;
  }
  .button-wrap {
    display: flex;
    button {
      &:nth-child(1) {
        flex: 0 0 105px;
        margin-right: 10px;
      }
    }
  }
}
.desktop {
  .payment-table {
    border-top: 2px solid #3d3d35;
    border-bottom: 1px solid #3d3d35;
    margin-bottom: 20px;
    table {
      table-layout: fixed;
      width: 100%;
      th,
      td {
        border-bottom: 1px solid #e9e9e9;
      }
      thead {
        th {
          @include fontSize(15px);
          text-align: center;
          height: 44px;
          vertical-align: middle;
          font-weight: 700;
        }
      }
      tfoot {
        td {
          background-color: #f7f7f7;
          height: 90px;
          vertical-align: middle;
          font-weight: 700;
          padding-right: 20px;
          .final-payment {
            display: flex;
            align-items: center;
            justify-content: flex-end;
          }
          .txt-final-payment {
            @include fontSize(15px);
            flex: 0 0 121px;
          }
          .final-price {
            flex: 0 0 250px;
            text-align: right;
          }
          .txt-price-amount {
            @include fontSize(26px, en);
            color: #f45649;
          }
          .txt-price-unit {
            @include fontSize(17px);
          }
        }
      }
      tbody {
        .item {
          td {
            &:nth-child(1) {
              padding-left: 30px;
              padding-top: 20px;
              padding-bottom: 21px;
            }
            &:nth-child(2) {
              text-align: center;
            }
            .txt-price-amount,
            .txt-price-unit {
              font-weight: 700;
            }
            .txt-price-amount {
              @include fontSize(17px, en);
            }
            .txt-price-unit {
              @include fontSize(17px);
            }
            .left-side,
            .right-side {
              display: inline-block;
              vertical-align: middle;
            }
            .left-side {
              margin-right: 13px;
              .image {
                img {
                  width: 70px;
                  height: 94px;
                }
              }
            }
            .right-side {
              .txt-name {
                @include fontSize(15px);
              }
              .txt-brand {
                @include fontSize(14px);
              }
            }
          }
        }
        .coupon {
          td {
            padding-top: 20px;
            padding-bottom: 20px;
            padding-right: 20px;
            .coupon-wrap {
              display: flex;
              align-items: center;
              justify-content: flex-end;
            }
            .txt-coupon {
              @include fontSize(15px);
              font-weight: 700;
              flex: 0 0 121px;
            }
            .select-wrap {
              position: relative;
              flex: 0 0 250px;
              select {
                width: 100%;
                height: 50px;
                border: 1px solid #c4c4c4;
                padding-left: 13px;
                padding-right: 13px;
              }
            }

          }
        }
      }
    }
  }
  .check-wrap {
    margin-bottom: 30px;
    .custom-control-label {
      @include fontSize(14px);
    }
  }
  .button-wrap {
    text-align: right;
    button {
      width: 252px;
      &:not(:first-child) {
        margin-left: 24px;
      }
    }
  }
}
</style>
