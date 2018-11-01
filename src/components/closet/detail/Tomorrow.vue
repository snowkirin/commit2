<template>
  <div
    class="contents"
    :style="promotionStyle"
    ref="contents"
  >
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
      <div class="promotion-wrap" v-if="promotionOpenDate">
        <div class="band-banner" v-if="isPromotionShow">
          <p
            @click="clickPromotion"
          >
            <img src="@/assets/img/closet/event_banner.png"/>
          </p>
        </div>
        <transition
          name="popover-promotion"
          v-on:before-enter="beforeEnter"
          v-on:after-enter="afterEnter"
          v-on:before-leave="beforeLeave"
          v-on:after-leave="afterLeave"
        >
          <div v-if="isPromotionContentShow" class="promotion">
            <div class="promotion-content">
              <div>
                <img src="@/assets/img/closet/event_banner_more.png" alt="">
              </div>
              <button
                type="button"
                class="btn btn-close"
                @click="hidePromotion"
              >
                <span class="icon-close">X</span>
              </button>
            </div>
          </div>
        </transition>
        <div
          class="dim_overlay"
          v-if="isPromotionContentShow && $mq === 'sm'"
          :style="{height: promotionSize + 'px'}"></div>
      </div>
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
                  >{{data.category}} 상세보기
                  </button>
                </div>
              </div>
              <div class="product-bot">
                <p class="txt-styling-tip">{{ tomorrowData.productA.stylingTip }}</p>
              </div>
              <div
                class="btn-selected"
                v-if="isShowButton"
              >
                <button
                  type="button"
                  class="btn btn-primary h-56"
                  @click="clickSelected('typeA')"
                >
                  {{tomorrowData.selected === 'typeA' ? 'A 선택됨' : 'A 선택하기'}}
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
                  >{{data.category}} 상세보기
                  </button>
                </div>
              </div>
              <div class="product-bot">
                <p class="txt-styling-tip">{{ tomorrowData.productB.stylingTip }}</p>
              </div>
              <div
                class="btn-selected"
                v-if="isShowButton"
              >
                <button
                  type="button"
                  class="btn btn-primary h-56"
                  @click="clickSelected('typeB')"
                >
                  {{tomorrowData.selected === 'typeB' ? 'B 선택됨' : 'B 선택하기'}}
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
            {{tomorrowData.selected === 'typeA' ? 'A 선택됨' : 'A 선택하기'}}
          </button>
          <button
            type="button"
            class="btn h-50 w-50"
            :class="tomorrowData.selected === 'typeB'? 'btn-primary' : 'btn-secondary'"
            @click="clickSelected('typeB')"
          >
            {{tomorrowData.selected === 'typeB' ? 'B 선택됨' : 'B 선택하기'}}
          </button>
        </div>
      </div>

    </div>
    <simplert ref="alert" :useRadius="false" :useIcon="false"/>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Simplert from 'vue2-simplert';
// 상품상세보기 팝업
import ModalProductDetail from '@/components/common/modal/ModalProductDetail.vue';

const alertObject = {
  type: 'alert', // 타입
  customClass: 'popup-custom-class', // 커스텀 클래스 네임
  disableOverlayClick: false, // 오버레이 클릭시 닫기 방지
  customCloseBtnText: '확인' // 닫기 버튼 텍스트
};

export default {
  name: 'tomorrow',
  components: {
    ModalProductDetail,
    Simplert
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
      },
      isPromotionShow: true,
      isPromotionContentShow: false,
      promotionSize: 0,
      promotionOpenDate: false,
    };
  },
  computed: {
    ...mapGetters({
      TomorrowResult: 'subscriptions/TomorrowResult',
      TomorrowProductDetail: 'subscriptions/TomorrowProductDetail',
      isTomorrowDirect: 'subscriptions/isTomorrowDirect',
      TomorrowDirectMemberId: 'subscriptions/TomorrowDirectMemberId',
      User: 'login/User'
    }),
    isShowButton() {
      // 선택 버튼은 스타일 지정 상태일때만 보여야 한다.
      return this.TomorrowResult.subscription_status === 14403;
    },
    promotionStyle() {
      if (this.isPromotionShow) {
        return {
          // overflow: 'hidden'
        };
      }
    }
  },
  methods: {
    ...mapActions({
      getTomorrow: 'subscriptions/getTomorrow',
      putTomorrow: 'subscriptions/putTomorrow',
      getTomorrowProductDetail: 'subscriptions/getTomorrowProductDetail',
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
      const modalConfig = {
        scrollable: true,
        height: 'auto',
        width: '98%',
        maxWidth: 600,
        adaptive: true
      };
      const productCode = data.product_id;
      // 불필요한 API 호출을 방지하기 위해
      if (!this.TomorrowProductDetail[productCode]) {
        // 해당 상품 정보가 스토어에 없으면
        await this.getTomorrowProductDetail(productCode);
        this.$modal.show(
          ModalProductDetail,
          { data: this.TomorrowProductDetail[productCode] },
          modalConfig
        );
      } else {
        // 해당 상품 정보가 스토어에 있으면
        this.$modal.show(
          ModalProductDetail,
          { data: this.TomorrowProductDetail[productCode] },
          modalConfig
        );
      }
    },
    clickSelected(type) {
      if (type === 'typeA') {
        //  typeA를 선택하였을 경우
        const productId = _.map(
          [
            this.tomorrowData.productA.products[0].id,
            this.tomorrowData.productA.products[1].id
          ],
          _.parseInt
        );
        const formData = {
          subscription_id: this.tomorrowData.subscriptionId,
          products: productId
        };
        if (!this.isTomorrowDirect) {
          // 직접접속이 아닐경우
          this.putTomorrow(formData).then(res => {
            if (res.data.result) {
              this.tomorrowData.selected = type;
              _.assign(alertObject, {
                message: 'TYPE A를 선택하셨습니다.'
              });
              this.$refs.alert.openSimplert(alertObject);
            }
          });
        } else {
          // 직접접속일 경우
          _.assign(formData, { member_id: this.TomorrowDirectMemberId });
          this.putTomorrowDirect(formData).then(res => {
            if (res.data.result) {
              this.tomorrowData.selected = type;
              _.assign(alertObject, {
                message: 'TYPE A를 선택하셨습니다.'
              });
              this.$refs.alert.openSimplert(alertObject);
            }
          });
        }
      } else {
        // typeB를 선택하였을 경우
        const productId = _.map(
          [
            this.tomorrowData.productB.products[0].id,
            this.tomorrowData.productB.products[1].id
          ],
          _.parseInt
        );
        const formData = {
          subscription_id: this.tomorrowData.subscriptionId,
          products: productId
        };

        if (!this.isTomorrowDirect) {
          // 직접접속이 아닐경우
          this.putTomorrow(formData).then(res => {
            if (res.data.result) {
              this.tomorrowData.selected = type;
              _.assign(alertObject, {
                message: 'TYPE B를 선택하셨습니다.'
              });
              this.$refs.alert.openSimplert(alertObject);
            }
          });
        } else {
          // 직접접속일 경우
          _.assign(formData, { member_id: this.TomorrowDirectMemberId });
          this.putTomorrowDirect(formData).then(res => {
            if (res.data.result) {
              this.tomorrowData.selected = type;
              _.assign(alertObject, {
                message: 'TYPE B를 선택하셨습니다.'
              });
              this.$refs.alert.openSimplert(alertObject);
            }
          });
        }
      }
    },
    clickPromotion() {
      const _body = window.document.body,
        _bodyHeight = _body.offsetHeight,
        _contentsOffsetTop = _body.querySelector('.contents').offsetTop;
      this.isPromotionContentShow = true;
      this.promotionSize = _bodyHeight - _contentsOffsetTop;
    },
    hidePromotion() {
      this.isPromotionContentShow = false;
      this.isPromotionShow = false;
    },

    // Animation
    beforeEnter() {
      this.$refs.contents.style.overflow = 'hidden';
    },
    afterEnter() {
      this.$refs.contents.removeAttribute('style');
    },
    beforeLeave() {
      this.$refs.contents.style.overflow = 'hidden';
    },
    afterLeave() {
      this.$refs.contents.removeAttribute('style');
    },
    calcPromotionOpen() {
      const d = new Date();
      // 10월 29일 오전 9시
      if (d.getFullYear() > 2018) {
        this.promotionOpenDate = true;
        return;
      }
      if (d.getMonth() + 1 > 10) {
        this.promotionOpenDate = true;
        return;
      }
      if (d.getFullYear() >= 2018 && d.getDate() >= 29 && d.getHours() >= 9) {
        this.promotionOpenDate = true;

      }
    }
  },
  async created() {
    if (!this.isTomorrowDirect) {
      // 직접 접속이 아닐때. 이 부분은 세션전처리.
      await this.getTomorrow().then(res => {
        if (res.data.result) {
          // 데이터 존재한다면.
          this.processingData();
          this.isTomorrowData = true;
        }
      });
    } else {
      // 직접 접속 일경우.  이미 데이터가 존재하므로 프로세싱.
      this.processingData();
      this.isTomorrowData = true;
    }
    window.mid = this.User.userId;
    this.calcPromotionOpen();
  },
  destroyed() {
    if (this.isTomorrowDirect) {
      // 직접접속일때만 작동
      this.destroyTomorrowDirect(); // Tomorrow와 관련된 모든값 초기화
    }
  }
};
</script>
<style scoped lang="scss" src="@/assets/css/closet-style.scss">
</style>
<style scoped lang="scss">
@keyframes slideInDown {
  from {
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0);
    visibility: visible;
  }
  to {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}

@keyframes rotation {
  from {
    -webkit-transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(359deg);
  }
}

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

.contents {
  position: relative;
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
      outline: 3px solid $color-primary;
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
      font-weight: 100;
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
      @include fontSize(14px);
      border-top: 1px solid #e8e8e8;
      background-color: #fff;
      color: $color-secondary;
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
  button {
    &:nth-child(2) {
      border-left: 1px solid #fff;
    }
  }
}

.promotion-wrap {
  margin-top: -30px;
  margin-left: -20px;
  margin-right: -20px;
  margin-bottom: 30px;

  .btn-close {
    position: absolute;
    right: 17px;
    width: 20px;
    height: 20px;
    overflow: hidden;
    text-indent: -9999em;
    &:hover {
      animation: rotation 1s;
    }
    .icon-close {
      display: block;
      width: 20px;
      height: 20px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      &::before,
      &::after {
        content: '';
        display: block;
        width: 100%;
        height: 1px;
        background-color: #fff;
        position: absolute;
        transform-origin: 50% 50%;
        top: 50%;
        left: 0;
      }
      &::before {
        transform: rotate(45deg);
      }
      &::after {
        transform: rotate(-45deg);
      }
    }
  }
  .band-banner {
    position: relative;
    text-align: center;
    background-color: #745140;
    cursor: pointer;
    img {
      width: 375px;
      max-width: 100%;
    }
  }
  .promotion {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    z-index: 10000;
    .promotion-content {
      position: relative;
      z-index: 10;
      background-color: #745140;
      width: 100%;
      img {
        width: 100%;
      }
    }
    .btn-close {
      top: 18px;
    }
  }
}
.popover-promotion-enter-active {
  animation: slideInDown 0.5s;
}
.popover-promotion-leave-active {
  animation: slideInDown 0.5s reverse;
}

.dim_overlay {
  position: absolute;
  width: 100%;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 100;
}

@media (min-width: 768px) {
  .promotion-wrap {
    margin-left: 0;
    margin-right: 0;
  }

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

@media (min-width: 1080px) {
  .promotion-wrap {
    margin-top: -40px;
    margin-bottom: 40px;
    .band-banner {
      img {
        width: 410px;
      }
    }
    .promotion {
      .promotion-content {
        text-align: center;
        padding: 15px;
        img {
          width: 458px;
        }
      }
      &::before {
        display: none;
      }
      .btn-close {
        top: 20px;
      }
    }
  }
  .product {
    .product-top {
      .txt-type {
        @include fontSize(18px, en);
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
