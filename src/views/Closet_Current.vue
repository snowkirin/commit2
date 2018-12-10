<template>
  <div class="contents">
    <!-- 데이터가 존재하지 않는다면 -->
    <div v-if="!isCurrentData">
      <div class="none">
        <div class="inner center-align">
          <p>
            조금만 기다리세요<br />
            곧 옷장이 채워집니다.
          </p>
        </div>
      </div>
    </div>
    <div v-else>
      <component
        :is="feedbacksType"
        :feedbackData="CurrentFeedbacks"
        v-if="feedbacksType"
      ></component>
      <div v-if="!isCurrentFeedbacksDirect">
        <ItemPayment :data="currentData" @init="setCurrentData" />
        <div class="styling-tip">
          <p class="txt-title"># TODAY'S STYLE TIP</p>
          <p class="txt-desc">{{ currentData.styling_tip }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { swiper, swiperSlide } from 'vue-awesome-swiper';

import FeedBack from '@/components/closet/feedback/Index';
import ItemPayment from '@/components/closet/Current/ItemPayment';

import 'swiper/dist/css/swiper.css';

export default {
  name: 'Closet_Current',
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
        products: [],
        coupons: [],
        images: {}
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
    // DetailModal,
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
      CurrentCoupons: 'subscriptions/CurrentCoupons', // 현재의 옷장 쿠폰 데이터
      CurrentFeedbacks: 'subscriptions/CurrentFeedbacks', // 현재의 옷장 피드백 데이터
      isCurrentFeedbacks: 'subscriptions/isCurrentFeedbacks',
      CurrentFeedbacksDirect: 'subscriptions/CurrentFeedbacksDirect', // 현재의 옷장 피드백 직접접속 데이터
      isCurrentFeedbacksDirect: 'subscriptions/isCurrentFeedbacksDirect'
    })
  },
  methods: {
    ...mapActions({
      CURRENT: 'subscriptions/CURRENT',
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
      _.forEach(this.CurrentResult.products, value => {
        if (_.isNull(value.id)) {
          this.isProductEmptyCheck = true;
        }
      });

      this.currentData = {
        ...this.CurrentResult,
        coupons: [...this.CurrentCoupons],
        images: {...this.CurrentImages}
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
    },
  },
  async created() {
    // 직접접속 이라면
    if (this.isCurrentFeedbacksDirect) {
      const formData = {
        subscriptionId: this.CurrentFeedbacksDirect.subscription_id
      };

      await this.getCurrentFeedbacks(formData).then(res => {
        if (res.data.result) {
          // 피드백 데이터가 있다면
          this.isCurrentData = true;
        }
      });
    } else {
      const result = await this.CURRENT();
      if (!_.isEmpty(result.result)) {
        this.setCurrentData();
        this.isCurrentData = true;
        const formData = {
          subscriptionId: this.currentData.subscription_id
        };
        this.getCurrentFeedbacks(formData).then(res => {
          if (res.data.result) {
            this.feedbacksData = this.CurrentFeedbacks;
          }
        });
      }
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

<style scoped lang="scss" src="@/assets/css/closet-style.scss"></style>
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
.styling-tip {
  background-color: #f5f5f5;
  padding: 15px 20px;
  margin-top: 30px;
  @include desktop {
    margin-top: 40px;
  }
  .txt-title {
    @include fontSize(15px, en);
    font-weight: 700;
    margin-bottom: 5px;
    color: #333;
  }
  .txt-desc {
    @include fontSize(14px);
    word-break: keep-all;
  }
}
</style>