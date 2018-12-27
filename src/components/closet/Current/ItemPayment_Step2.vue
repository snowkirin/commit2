<template>
  <div>
    <div class="mobile" v-if="$mq === 'sm'">
      <div class="payment-item">
        <div class="payment-item__header"><p>결제 상품</p></div>
        <div class="payment-item__content">
          <div class="inner">
            <div class="items">
              <div
                v-for="(item, idx) in selectedProduct.products"
                :key="idx"
                class="item"
              >
                <p class="txt-name">{{ item.name }}</p>
                <p class="txt-price">
                  <span class="amount">{{
                    _.parseInt(item.sale_price) | currency('', 0)
                  }}</span
                  ><span class="unit">원</span>
                </p>
              </div>
            </div>
            <div class="coupon">
              <select v-model="selectCoupon" v-if="data.coupons.length === 0">
                <option value="">사용 가능한 쿠폰이 없습니다.</option>
              </select>
              <select v-model="selectCoupon" v-else>
                <option value="">쿠폰 사용하지 않음</option>
                <option
                  v-for="(item, idx) in data.coupons"
                  :key="idx"
                  :value="item"
                >
                  {{ item.coupon_name }}
                </option>
              </select>
              <i data-v-5a0e556a="" class="fas fa-sort"></i>
            </div>
          </div>
        </div>
        <div class="payment-item__footer">
          <p class="txt-final-payment">최종 결제 금액</p>
          <p class="txt-final-price">
            <span class="amount">{{
              finalPaymentAmount | currency('', 0)
            }}</span>
            <span class="unit">원</span>
          </p>
        </div>
      </div>
      <div class="check-wrap">
        <div class="custom-checkbox">
          <input
            class="custom-control-input"
            type="checkbox"
            id="productPaymentMobile"
          />
          <label class="custom-control-label" for="productPaymentMobile">
            상기 상품 구매는 줄라이 구독 서비스를 통해 현재 고객님께서 이용중인
            상품을 구매하는 것이므로 교환 및 반품, 환불이 불가능 합니다. 위
            내용을 확인하였으며 결제에 동의 합니다.
          </label>
        </div>
      </div>
      <div class="button-wrap">
        <button type="button" @click="backStep" class="btn btn-primary h-50">
          취소
        </button>
        <button type="button" @click="nextStep" class="btn btn-primary h-50">
          등록된 카드로 결제
        </button>
      </div>
    </div>
    <div class="desktop" v-else>
      <div class="payment-table">
        <table>
          <colgroup>
            <col width="*" />
            <col width="180" />
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
                    <span class="txt-price-amount">{{
                      finalPaymentAmount | currency('', 0)
                    }}</span>
                    <span class="txt-price-unit">원</span>
                  </div>
                </div>
              </td>
            </tr>
          </tfoot>
          <tbody>
            <tr v-for="(item, idx) in selectedProduct.products" :key="idx" class="item">
              <td>
                <div class="left-side">
                  <div class="image">
                    <img
                      :src="$common.IMAGEURL() + item.image.path"
                      @click="emitProductDetails(item.barcode)"
                    />
                  </div>
                </div>
                <div class="right-side">
                  <div>
                    <p class="txt-name">{{ item.name }}</p>
                    <p class="txt-brand">{{ item.brand_kor_name }}</p>
                  </div>
                </div>
              </td>
              <td>
                <span class="txt-price-amount">{{
                  _.parseInt(item.sale_price) | currency('', 0)
                }}</span
                ><span class="txt-price-unit">원</span>
              </td>
            </tr>
            <tr class="coupon">
              <td colspan="2">
                <div class="coupon-wrap">
                  <p class="txt-coupon">쿠폰</p>
                  <div class="select-wrap">
                    <select
                      v-model="selectCoupon"
                      v-if="data.coupons.length === 0"
                    >
                      <option value="">사용 가능한 쿠폰이 없습니다.</option>
                    </select>
                    <select v-model="selectCoupon" v-else>
                      <option value="">쿠폰 사용하지 않음</option>
                      <option
                        v-for="(item, idx) in data.coupons"
                        :key="idx"
                        :value="item"
                      >
                        {{ item.coupon_name }}
                      </option>
                    </select>
                    <i data-v-5a0e556a="" class="fas fa-sort"></i>
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
            id="productPaymentDesktop"
          />
          <label class="custom-control-label" for="productPaymentDesktop">
            상기 상품 구매는 줄라이 구독 서비스를 통해 현재 고객님께서 이용중인
            상품을 구매하는 것이므로 교환 및 반품, 환불이 불가능 합니다. 위
            내용을 확인하였으며 결제에 동의 합니다.
          </label>
        </div>
      </div>
      <div class="button-wrap">
        <button type="button" @click="backStep" class="btn btn-primary h-50">
          취소
        </button>
        <button type="button" @click="nextStep" class="btn btn-primary h-50">
          등록된 카드로 결제
        </button>
      </div>
    </div>

    <div class="payment-loading" v-if="loading">
      <div class="loading-inner">
        <p>결제 진행중</p>
        <div class="loaders">
          <div class="line-spin-fade-loader">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SubscriptionsAPI from '@/library/api/subscriptions';

export default {
  name: 'ItemPayment_Step2',
  props: {
    selectedProduct: Object,
    data: Object
  },
  data() {
    return {
      selectCoupon: '',
      finalPrice: 0,
      loading: false
    };
  },
  computed: {
    finalPaymentAmount() {
      let price = 0;
      _.forEach(this.selectedProduct.products, value => {
        price += _.parseInt(value.sale_price);
      });
      if (this.selectCoupon !== '') {
        if (this.selectCoupon.sale_type === 14601) {
          price = price - price * (this.selectCoupon.sale_rate / 100);
        } else if (this.selectCoupon.sale_type === 14602) {
          price = price - this.selectCoupon.sale_price;
        }
      }
      return price < 0 ? 0 : price;
    }
  },
  methods: {
    backStep() {
      this.$emit('sequence', 'step1');
    },
    async nextStep() {
      const paymentCheck =
        this.$mq === 'sm'
          ? document.getElementById('productPaymentMobile')
          : document.getElementById('productPaymentDesktop');
      this.finalPrice = this.finalPaymentAmount;
      if (paymentCheck.checked) {
        let formData = {
          subscriptionId: this.data.result.subscription_id, // Number
          barcodes: [], // Number In Array
          salePrices: [], // Number In Array
          orderPrices: [], // Number In Array
          totalAmount: this.finalPrice, // Number
          usedCoupon: this.selectCoupon === '' ? null : this.selectCoupon.id // Number 쿠폰을 사용하지 않을 시 null로
        };
        _.forEach(this.selectedProduct.products, value => {
          formData.salePrices.push(_.parseInt(value.sale_price));
          formData.barcodes.push(_.parseInt(value.barcode));
          if (this.selectCoupon !== '') {
            if (this.selectCoupon.sale_type === 14601) {
              let price =
                _.parseInt(value.sale_price) -
                _.parseInt(value.sale_price) *
                  (this.selectCoupon.sale_rate / 100);
              price = price < 0 ? 0 : price;
              formData.orderPrices.push(price);
            } else if (this.selectCoupon.sale_type === 14602) {
              let price =
                _.parseInt(value.sale_price) -
                this.selectCoupon.sale_price / this.selectedProduct.products.length;
              price = price < 0 ? 0 : price;
              formData.orderPrices.push(price);
            }
          } else {
            formData.orderPrices.push(_.parseInt(value.sale_price));
          }
        });
        try {
          this.loading = true;
          const resultData = await SubscriptionsAPI.PostOrders(formData);
          if (resultData.data.result) {
            this.$emit('sequence', 'step3');
          } else {
            this.$dialog.alert(
              `결제에 실패하였습니다. <br/>${resultData.data.fail_reason}`,
              {
                okText: '확인',
                customClass: 'zuly-alert',
                backdropClose: true,
                html: true
              }
            );
            this.loading = false;
          }
        } catch {
          this.$dialog.alert('결제 중 오류가 발생하였습니다.', {
            okText: '확인',
            customClass: 'zuly-alert',
            backdropClose: true
          });
          this.loading = false;
        }
      } else {
        this.$dialog.alert('구매 진행에 동의해주세요.', {
          okText: '확인',
          customClass: 'zuly-alert',
          backdropClose: true
        });
      }
    },
    emitProductDetails(param) {
      this.$emit('productDetail', param);
    }
  }
};
</script>

<style scoped lang="scss">
@-webkit-keyframes line-spin-fade-loader {
  50% {
    opacity: 0.3;
  }
  100% {
    opacity: 1;
  }
}

@keyframes line-spin-fade-loader {
  50% {
    opacity: 0.3;
  }
  100% {
    opacity: 1;
  }
}

.line-spin-fade-loader {
  position: relative;
  top: -10px;
  left: -4px;
}
.line-spin-fade-loader > div:nth-child(1) {
  top: 20px;
  left: 0;
  -webkit-animation: line-spin-fade-loader 1.2s -0.84s infinite ease-in-out;
  animation: line-spin-fade-loader 1.2s -0.84s infinite ease-in-out;
}
.line-spin-fade-loader > div:nth-child(2) {
  top: 13.63636px;
  left: 13.63636px;
  -webkit-transform: rotate(-45deg);
  transform: rotate(-45deg);
  -webkit-animation: line-spin-fade-loader 1.2s -0.72s infinite ease-in-out;
  animation: line-spin-fade-loader 1.2s -0.72s infinite ease-in-out;
}
.line-spin-fade-loader > div:nth-child(3) {
  top: 0;
  left: 20px;
  -webkit-transform: rotate(90deg);
  transform: rotate(90deg);
  -webkit-animation: line-spin-fade-loader 1.2s -0.6s infinite ease-in-out;
  animation: line-spin-fade-loader 1.2s -0.6s infinite ease-in-out;
}
.line-spin-fade-loader > div:nth-child(4) {
  top: -13.63636px;
  left: 13.63636px;
  -webkit-transform: rotate(45deg);
  transform: rotate(45deg);
  -webkit-animation: line-spin-fade-loader 1.2s -0.48s infinite ease-in-out;
  animation: line-spin-fade-loader 1.2s -0.48s infinite ease-in-out;
}
.line-spin-fade-loader > div:nth-child(5) {
  top: -20px;
  left: 0;
  -webkit-animation: line-spin-fade-loader 1.2s -0.36s infinite ease-in-out;
  animation: line-spin-fade-loader 1.2s -0.36s infinite ease-in-out;
}
.line-spin-fade-loader > div:nth-child(6) {
  top: -13.63636px;
  left: -13.63636px;
  -webkit-transform: rotate(-45deg);
  transform: rotate(-45deg);
  -webkit-animation: line-spin-fade-loader 1.2s -0.24s infinite ease-in-out;
  animation: line-spin-fade-loader 1.2s -0.24s infinite ease-in-out;
}
.line-spin-fade-loader > div:nth-child(7) {
  top: 0;
  left: -20px;
  -webkit-transform: rotate(90deg);
  transform: rotate(90deg);
  -webkit-animation: line-spin-fade-loader 1.2s -0.12s infinite ease-in-out;
  animation: line-spin-fade-loader 1.2s -0.12s infinite ease-in-out;
}
.line-spin-fade-loader > div:nth-child(8) {
  top: 13.63636px;
  left: -13.63636px;
  -webkit-transform: rotate(45deg);
  transform: rotate(45deg);
  -webkit-animation: line-spin-fade-loader 1.2s 0s infinite ease-in-out;
  animation: line-spin-fade-loader 1.2s 0s infinite ease-in-out;
}
.line-spin-fade-loader > div {
  background-color: #000;
  width: 4px;
  height: 35px;
  border-radius: 2px;
  margin: 2px;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  position: absolute;
  width: 5px;
  height: 15px;
}
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
        .fa-sort {
          position: absolute;
          right: 10px;
          top: 18px;
        }
        select {
          @include fontSize(14px);
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
    .custom-control-label {
      color: #f45649;
    }
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
                @include fontSize(14px);
                width: 100%;
                height: 50px;
                border: 1px solid #c4c4c4;
                padding-left: 13px;
                padding-right: 13px;
              }
              .fa-sort {
                position: absolute;
                top: 18px;
                right: 10px;
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
      color: #f45649;
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
.payment-loading {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.6);
  z-index: 9999;
  .loading-inner {
    position: absolute;
    top: 50%;
    left: 50%;
  }
  .loaders {
    transform-origin: 0 0;
    transform: scale(0.75);
  }
  p {
    @include fontSize(15px);
    height: 60px;
    transform: translateX(-50%);
  }
}
</style>
