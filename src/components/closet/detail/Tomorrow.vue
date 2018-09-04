<template>
  <div class="contents">
    <!--데이터가 없다면-->
    <div v-if="!isTomorrowData">
      <div class="none">
        <div class="inner center-align">
          <p>
            조금만 기다리세요<br/>
            곧 옷장이 채워집니다.
          </p>
        </div>
      </div>
    </div>
    <!--데이터가 있다면 -->
    <div v-else>
      <div class="contents-header">
        <h3>데일리룩 후보 중 마음에 드는 의상을 선택해주세요.</h3>
        <p>(기한 내 미선택 시, 회원님께 더 어울릴 스타일로 자동 지정 후 배송 됩니다.)</p>
      </div>
      <div class="content">
        <div class="grid-flex">
          <div class="column">
            <div
              class="product"
              :class="{selected: tomorrowData.selected === 'typeA'}"
            >
              <div class="product-top">
                <!-- Text ZONE-->
                <p class="txt-type">TYPE A</p>
                <p class="txt-styling-title">{{ tomorrowData.productA.stylingTitle }}</p>
              </div>
              <div class="product-mid">
                <div
                  class="product-image"
                  v-for="(data, idx) in tomorrowData.productA.products"
                  :key="idx"
                  v-if="data.id !== null"
                >
                  <div class="image">
                    <img :src="$common.ZulyImage()+data.image">
                  </div>
                  <button
                    type="button"
                    class="btn btn-product-detail h-40"
                    @click="clickProductDetail(data)"
                  >상품 상세보기</button>
                </div>
              </div>
              <div class="product-bot">
                <p class="txt-styling-tip">{{ tomorrowData.productA.stylingTip }}</p>
              </div>
              <div class="btn-selected">
                <button
                  type="button"
                  class="btn btn-primary h-56"
                  v-if="isShowButton"
                  @click="clickSelected('typeA')"
                >
                  A 선택하기
                </button>
              </div>
            </div>
          </div>
          <div class="column">
            <div
              class="product"
              :class="{selected: tomorrowData.selected === 'typeB'}"
            >
              <div class="product-top">
                <!-- Text ZONE-->
                <p class="txt-type">TYPE B</p>
                <p class="txt-styling-title">{{ tomorrowData.productB.stylingTitle }}</p>
              </div>
              <div class="product-mid">
                <div
                  class="product-image"
                  v-for="(data, idx) in tomorrowData.productB.products"
                  :key="idx"
                  v-if="data.id !== null"
                >
                  <div class="image">
                    <img :src="$common.ZulyImage()+data.image">
                  </div>
                  <button
                    type="button"
                    class="btn btn-product-detail h-40"
                    @click="clickProductDetail(data)"
                  >상품 상세보기</button>
                </div>
              </div>
              <div class="product-bot">
                <p class="txt-styling-tip">{{ tomorrowData.productB.stylingTip }}</p>
              </div>
              <div class="btn-selected">
                <button
                  type="button"
                  class="btn btn-primary h-56"
                  v-if="isShowButton"
                  @click="clickSelected('typeB')"
                >
                  B 선택하기
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="type-select-wrap" v-if="isShowButton">
          <button
            type="button"
            class="btn h-50 w-50"
            :class="tomorrowData.selected === 'typeA'? 'btn-primary' : 'btn-secondary'"
            @click="clickSelected('typeA')"
          >
            A 선택하기
          </button>
          <button
            type="button"
            class="btn h-50 w-50"
            :class="tomorrowData.selected === 'typeB'? 'btn-primary' : 'btn-secondary'"
            @click="clickSelected('typeB')"
          >
            B 선택하기
          </button>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
// 상품상세보기 팝업
import ModalProductDetail from '@/components/common/modal/ModalProductDetail.vue';
export default {
  name: 'tomorrow',
  components: {
    ModalProductDetail
  },
  data() {
    return {
      isTomorrowData: false,
      tomorrowData: {
        subscriptionStatus: null,
        subscriptionId: null,
        subscriptionDate: '',
        selected: '',
        productA: {},
        productB: {}
      }
    };
  },
  computed: {
    ...mapGetters({
      isLogin: 'login/isLogin',
      TomorrowResult: 'subscriptions/TomorrowResult',
      TomorrowProductDetail: 'subscriptions/TomorrowProductDetail',
      isTomorrowDirect: 'subscriptions/isTomorrowDirect',
      TomorrowDirectMemberId: 'subscriptions/TomorrowDirectMemberId'
    }),
    isShowButton() {
      return this.TomorrowResult.subscription_status === 14403;
    }
  },
  methods: {
    ...mapActions({
      getTomorrow: 'subscriptions/getTomorrow',
      putTomorrow: 'subscriptions/putTomorrow',
      getProductDetail: 'subscriptions/getProductDetail',
      destroyTomorrowDirect: 'subscriptions/destroyTomorrowDirect',
      putTomorrowDirect: 'subscriptions/putTomorrowDirect'
    }),
    processingData() {
      const data = this.TomorrowResult;
      const selectArray = ['styling_tip', 'styling_title', 'hashtag'];
      // 데이터 가공
      let productA = {
        stylingTip: '',
        stylingTitle: '',
        hashtag: '',
        products: []
      };
      let productB = {
        stylingTip: '',
        stylingTitle: '',
        hashtag: '',
        products: []
      };
      _.forEach(data.products, (value, idx) => {
        if (idx === 0 || idx === 1) {
          if (idx === 0) {
            const pickData = _.pick(value, selectArray);
            const omitData = _.omit(value, selectArray);
            if (value.selected !== null) {
              this.tomorrowData.selected = 'typeA';
            }
            productA.stylingTip = pickData.styling_tip;
            productA.stylingTitle = pickData.styling_title;
            productA.hashtag = pickData.hashtag;
            productA.products.push(omitData);
          } else {
            productA.products.push(value);
          }
        } else {
          if (idx === 2) {
            const pickData = _.pick(value, selectArray);
            const omitData = _.omit(value, selectArray);
            if (value.selected !== null) {
              this.tomorrowData.selected = 'typeB';
            }
            productB.stylingTip = pickData.styling_tip;
            productB.stylingTitle = pickData.styling_title;
            productB.hashtag = pickData.hashtag;
            productB.products.push(omitData);

          } else {
            productB.products.push(value);
          }
        }
      });
      this.tomorrowData.subscriptionStatus = data.subscription_status;
      this.tomorrowData.subscriptionId = data.subscription_id;
      this.tomorrowData.subscriptionDate = data.subscription_date;
      this.tomorrowData.productA = productA;
      this.tomorrowData.productB = productB;
    },
    async clickProductDetail(data) {
      console.log(data);
      const modalConfig = {
        scrollable: true,
        height: 'auto',
        width: '80%',
        adaptive: true
      };
      const productCode = data.product_id;
      // 불필요한 API 호출을 방지하기 위해
      if (!this.TomorrowProductDetail[productCode]) {
        // 해당 상품 정보가 스토어에 없으면
        await this.getProductDetail(productCode);
        this.$modal.show(
          ModalProductDetail,
          {data: this.TomorrowProductDetail[productCode]},
          modalConfig
        )
      } else {
        // 해당 상품 정보가 스토어에 있으면
        this.$modal.show(
          ModalProductDetail,
          {data: this.TomorrowProductDetail[productCode]},
          modalConfig
        );
      }
    },
    clickSelected(type) {
      if (type === 'typeA') {
      //  typeA를 선택하였을 경우
        const productId = _.map([this.tomorrowData.productA.products[0].id, this.tomorrowData.productA.products[1].id], _.parseInt);
        const formData = {
          subscription_id: this.tomorrowData.subscriptionId,
          products: productId
        };
        if (!this.isTomorrowDirect) {
          // 직접접속이 아닐경우
          this.putTomorrow(formData).then(res => {
            if (res.data.result) {
              this.tomorrowData.selected = type;
            }
          });
        } else {
          // 직접접속일 경우
          _.assign(formData, {member_id: this.TomorrowDirectMemberId});
          this.putTomorrowDirect(formData).then(res => {
            if (res.data.result) {
              this.tomorrowData.selected = type;
            }
          });
        }
      }
      else {
        // typeB를 선택하였을 경우
        const productId = _.map([this.tomorrowData.productB.products[0].id, this.tomorrowData.productB.products[1].id], _.parseInt);
        const formData = {
          subscription_id: this.tomorrowData.subscriptionId,
          products: productId
        };

        if (!this.isTomorrowDirect) {
          // 직접접속이 아닐경우
          this.putTomorrow(formData).then(res => {
            if (res.data.result) {
              this.tomorrowData.selected = type;
            }
          });
        } else {
          // 직접접속일 경우
          _.assign(formData, {member_id: this.TomorrowDirectMemberId});
          this.putTomorrowDirect(formData).then(res => {
            if (res.data.result) {
              this.tomorrowData.selected = type;
            }
          });
        }
      }
    }
  },
  async created() {
    if (!this.isTomorrowDirect) {
      await this.getTomorrow().then(res => {
        if (res.data.result) {
          // 데이터 존재한다면.
          this.processingData();
          this.isTomorrowData = true;
        } else {
          // 데이터가 존재하지 않는다면
          this.isTomorrowData = false;
        }
      });
    } else {
      this.processingData();
      this.isTomorrowData = true;
    }
  },
  destroyed() {
    if (this.isTomorrowDirect) {
      // 직접접속일때만 작동
      this.destroyTomorrowDirect(); // Tomorrow와 관련된 모든값 초기화
    }
  }
};
</script>
<style scoped lang="scss" src="@/assets/css/closet-style.scss"></style>
<style scoped lang="scss">
.none {
  height: 500px;
  background: url('~@/assets/img/closet/img_none.png') no-repeat 50% 0;
  position: relative;
  .inner {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    height: 160px;
    background-color: #fafafa;
    width: 90%;
  }
  p {
    text-align: center;
    font-size: 18px;
    line-height: 28px;
    letter-spacing: -1.2px;
  }
}

.content {
  padding-bottom: 135px;
}
.column {
  &:nth-child(2) {
    margin-top: 25px;
  }
}
/* 상품 정보 */
.product {
  background-color: #f9f9f9;
  border: 2px solid #e1e1e1;
  padding: 25px 20px 35px;
  text-align: center;
  position: relative;
  &.selected {
    &::before {
      @include fontSize(20px);
      font-weight: 100;
      color: #fff;
      white-space: pre;
      content: '좋아요.\A선택할께요.';
      background: {
        image: url('~@/assets/img/closet/ico_white.svg');
        repeat: no-repeat;
        position-x: 50%;
        size: 43px 38px;
      }
      padding-top: 60px;
      display: block;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      z-index: 10;
    }
    &::after {
      content: '';
      display: block;
      left: 0;
      top: 0;
      bottom: 0;
      right: 0;
      background-color: rgba(51, 51, 51, 0.4);
      position: absolute;
    }
  }
  .product-top {
    margin-bottom: 21px;
    .txt-type {
      @include fontSize(15px, en);
      font-weight: 700;
      margin-bottom: 6px;
    }
    .txt-styling-title {
      @include fontSize(18px);
    }
  }
  .product-mid {
    margin-bottom: 30px;
    .product-image {
      margin-top: 13px;
      border: 1px solid #e8e8e8;
      &:nth-child(1) {
        margin-top: 0;
      }
      .image {
        border: 5px solid #fff;
      }
      img {
        width: 100%;
      }
    }
    .btn-product-detail {
      border-top: 1px solid #e8e8e8;
      background-color: #fff;
    }
  }
  .product-bot {
    text-align: left;
    .txt-styling-tip {
      @include fontSize(15px);
    }
  }
}

.btn-selected {
  display: none;
  margin-top: 40px;
}

.type-select-wrap {
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 100;
}

@media (min-width: 768px) {
  .column {
    &:nth-child(2) {
      margin-top: 0;
      margin-left: 15px;
    }
  }

  .btn-selected {
    display: block;
  }
  .type-select-wrap {
    display: none;
  }
}

@media (min-width: 1280px) {
  .product {
    .product-top {
      .txt-type {
        @include fontSize(18px);
        margin-bottom: 12px;
      }
      .txt-styling-title {
        @include fontSize(20px);
      }
    }
    .product-mid {
      display: flex;
      justify-content: center;
      .product-image {
        margin-top: 0;
        width: 50%;
        &:nth-child(2) {
          margin-left: 7px;
        }
        .image {
        }
        img {
        }
      }
      .btn-product-detail {
      }
    }
    .product-bot {
      .txt-styling-tip {
        @include fontSize(15px);
      }
    }
  }
}
</style>
