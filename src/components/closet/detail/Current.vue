<template>
  <div class="contents">
    <!--<ItemPayment/>-->
    <div class="content">
      <!-- 데이터가 존재하지 않는다면 -->
      <div v-if="!isCurrentData">
        <div class="none">
          <div class="inner center-align">
            <p>
              조금만 기다리세요<br/>
              곧 옷장이 채워집니다.
            </p>
          </div>
        </div>
      </div>
      <div v-else>
        <component :is="feedbacksType" :feedbackData="CurrentFeedbacks" v-if="feedbacksType"></component>
        <div class="current" v-show="!isCurrentFeedbacksDirect">
          <!-- Swiper ?-->
          <div class="product-image">
            <div v-show="$mq === 'sm'">
              <div class="list-product-image">
                <swiper :options="swiperOption">
                  <swiper-slide
                    class="item"
                    v-for="(data, idx) in currentData.products"
                    :key="idx"
                    v-if="data.id !== null"
                  >
                    <div class="img-box">
                      <img :src="$common.ZulyImage(data.image.width)+data.image.path" alt="">
                    </div>
                  </swiper-slide>
                  <div class="swiper-pagination" slot="pagination"></div>
                  <div class="swiper-button-prev" slot="button-prev"></div>
                  <div class="swiper-button-next" slot="button-next"></div>
                </swiper>
              </div>
            </div>
            <div v-show="$mq !== 'sm'">
              <div
                class="list-product-image"
                :class="{'single-product': isProductEmptyCheck, 'multi-product': !isProductEmptyCheck}"
              >
                <div
                  class="item"
                  v-for="(data, idx) in currentData.products"
                  :key="idx"
                  v-if="data.id !== null"
                >
                  <div class="img-box">
                    <img :src="$common.ZulyImage(data.image.width)+data.image.path" alt="">
                  </div>
                </div>
              </div>
            </div>
          </div>


          <!-- // Swiper -->
          <div class="product-explain" v-if="$mq === 'sm'">
            <div>
              <p class="txt-tip-today-style">TIP <span class="txt-dash"></span><br/>TODAY&apos;S STYLE</p>
            </div>
            <div class="styling-desc">
              <p class="txt-styling-title">{{currentData.stylingTitle}}</p>
              <p class="txt-styling-tip">{{currentData.stylingTip}}</p>
            </div>
          </div>

          <div
            class="product-explain"
            :class="{'single-product': isProductEmptyCheck, 'multi-product': !isProductEmptyCheck}"
            v-else
          >
            <div>
              <p class="txt-tip-today-style">TIP <span class="txt-dash"></span><br/>TODAY&apos;S STYLE</p>
            </div>
            <div class="styling-desc">
              <p class="txt-styling-title">{{currentData.stylingTitle}}</p>
              <p class="txt-styling-tip">{{currentData.stylingTip}}</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>

</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { swiper, swiperSlide } from 'vue-awesome-swiper';

import FeedBack from '@/components/closet/feedback/Index';
import DetailModal from '@/components/common/DetailModal';

import 'swiper/dist/css/swiper.css';

import ItemPayment from '@/components/closet/detail/ItemPayment';

export default {
  name: 'current',
  data() {
    return {
      feedbacksData: {},
      isCurrentData: false,
      isFeedback: false,
      feedbacksType: null,

      isProductEmptyCheck: false,

      // 2018-08-21 API 결과값 가공
      currentData: {
        subscriptionId: null,
        stylist: '',
        stylingTitle: '',
        stylingTip: '',
        hashTag: null,
        products: []
      },
      // Swiper Options
      swiperOption: {
        slidesPerView: 'auto',
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      }
    };
  },
  components: {
    FeedBack,
    DetailModal,
    swiper,
    swiperSlide,
    ItemPayment
  },
  watch: {
    isCurrentFeedbacks() {
      this.currentFeedbackType();
    },
    isCurrentFeedbacksDirect() {
      this.currentFeedbackType();
    }
  },
  computed: {
    ...mapGetters({
      CurrentResult: 'subscriptions/CurrentResult', // 현재의 옷장 데이터
      CurrentImages: 'subscriptions/CurrentImages', // 현재의 옷장 이미지 데이터
      CurrentFeedbacks: 'subscriptions/CurrentFeedbacks', // 현재의 옷장 피드백 데이터
      isCurrentFeedbacks: 'subscriptions/isCurrentFeedbacks',
      CurrentFeedbacksDirect: 'subscriptions/CurrentFeedbacksDirect', // 현재의 옷장 피드백 직접접속 데이터
      isCurrentFeedbacksDirect: 'subscriptions/isCurrentFeedbacksDirect'
    })
  },
  methods: {
    ...mapActions({
      getCurrent: 'subscriptions/getCurrent',
      getCurrentFeedbacks: 'subscriptions/getCurrentFeedbacks',
      destroyCurrentFeedbackDirect: 'subscriptions/destroyCurrentFeedbackDirect'
    }),
    clickShow() {
      this.isFeedback = true;
    },
    clickHide() {
      this.isFeedback = false;
    },
    setCurrentData() {
      // CurrentResult를 관리하기 편하게 변환
      /*
      * 상품이 하나밖에 없을때 체크.
      * 원래 하나하나 체크할려다가 디자인상 맞출수 없음.
      * */
      _.forEach(this.CurrentResult.products, value => {
        if (_.isNull(value.id)) {
          this.isProductEmptyCheck = true;
        }
      });

      this.currentData = {
        subscriptionId: this.CurrentResult.subscription_id,
        stylist: this.CurrentResult.stylist,
        stylingTitle: this.CurrentResult.styling_title,
        stylingTip: this.CurrentResult.styling_tip,
        hashTag: this.CurrentResult.hashtag,
        products: this.CurrentResult.products
      };
    },
    currentFeedbackType() {
      if (this.isCurrentFeedbacks && !this.isCurrentFeedbacksDirect) {
        // CurrentFeedback은 true, isCurrentFeedbacksDirect는 false일 경우
        this.feedbacksType = () =>
          import('@/components/closet/feedback/FeedbackCurrent.vue');
      }
      if (this.isCurrentFeedbacks && this.isCurrentFeedbacksDirect) {
        // isCurrentFeedbacks 와 isCurrentFeedbacksDirect 둘다 true일때만
        this.feedbacksType = () =>
          import('@/components/closet/feedback/FeedbackDirect.vue');
      }
    }
  },
  async created() {
    // 직접접속 이라면
    if (this.isCurrentFeedbacksDirect) {
      const formData = {
        subscriptionId: this.CurrentFeedbacksDirect.subscription_id
      };

      this.getCurrentFeedbacks(formData).then(res => {
        if (res.data.result) {
          // 피드백 데이터가 있다면
          this.isCurrentData = true;
        }
      });
    } else {
      await this.getCurrent().then(res => {
        if (!_.isEmpty(res.data.result)) {
          // 현재의 옷장 데이터가 있다면
          this.setCurrentData();
          this.isCurrentData = true;
          // 피드백 API 호출
          const formData = {
            subscriptionId: this.currentData.subscriptionId
          };
          this.getCurrentFeedbacks(formData).then(res => {
            if (res.data.result) {
              this.feedbacksData = this.CurrentFeedbacks;
            }
          });
        }
      });
    }
  },
  mounted() {
    this.currentFeedbackType();
  },
  destroyed() {
    if (this.isCurrentFeedbacksDirect) {
      this.destroyCurrentFeedbackDirect();
    }
  }
};
</script>

<style scoped lang="scss" src="@/assets/css/closet-style.scss">
</style>
<style scoped lang="scss">
.none {
  height: 500px;
  background: url(~@/assets/img/closet/img_none.png) no-repeat 50% 0;
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
    font-size: 17px;
    line-height: 25px;
    letter-spacing: -1px;
  }
}

.current {
  background-color: #d8d8d8;
  padding: 30px;
}
.list-product-image {
  position: relative;
  &::before {
    @include fontSize(14px, en);
    font-weight: 700;
    color: #fff;
    content: 'ZULY STYLE';
    display: block;
    position: absolute;
    bottom: 70px;
    left: -5px;
    transform: rotate(90deg);
    transform-origin: 0 0;
  }
  .item {
    border: 10px solid $color-white;
  }
  .img-box {
    img {
      width: 100%;
    }
  }
}
.swiper-container {
}

.product-explain {
  margin-top: 20px;
}
.txt-tip-today-style {
  @include fontSize(32px, en);
  font-weight: 700;
  position: relative;
  display: inline-block;
  line-height: 32px; // 간격을 위해 다시 설정
  padding-left: 20px;
  margin-left: -20px;
  &::before {
    content: '#';
    display: inline-block;
    position: absolute;
    left: 0;
  }
  .txt-dash {
    vertical-align: super;
    display: inline-block;
    width: 45px;
    border-bottom: 3px solid #333;
  }
}
.styling-desc {
  margin-top: 10px;
  .txt-styling-title,
  .txt-styling-tip {
    @include fontSize(15px);
    text-align: left;
  }
}

@media (min-width: 768px) {
  .current {
    padding-top: 50px;
    padding-bottom: 50px;
  }
  .current-styling {
    margin-top: 0;
  }
  .list-product-image {
    margin: 0 auto;
    &::before {
      left: -5px;
    }
    &.single-product {
      width: 280px;
      &::before {
        bottom: 90px;
      }
    }
    &.multi-product {
      width: 590px;
      &::before {
        bottom: 160px;
      }
    }
    .item {
      display: inline-block;
      vertical-align: top;
      &:nth-child(2) {
        margin-left: 25px;
        margin-top: 70px;
      }
    }
    .img-box {
      width: 260px;
      img {
        width: 100%;
      }
    }
  }
  .product-explain {
    &.single-product {
      text-align: center;
      .txt-tip-today-style {
        text-align: left;
      }
      .styling-desc {
        display: inline-block;
      }
    }
    &.multi-product {
      width: 590px;
      margin: -45px auto 0;
      .txt-tip-today-style {
        margin-left: -30px;
      }
    }
  }
  .txt-tip-today-style {
    @include fontSize(44px);
    line-height: 44px;
    padding-left: 30px;
    letter-spacing: 0.5px;
    .txt-dash {
      width: 117px;
      border-bottom-width: 4px;
    }
    &::before {
      left: 0;
    }
  }
  .styling-desc {
    margin-top: 25px;
  }
}
@media (min-width: 1080px) {

}
</style>
