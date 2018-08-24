<template>
  <div class="contents">
    <!--<vue-json-pretty :data="currentData.products"></vue-json-pretty>-->
    <div class="content">
      <div v-if="!isCurrentData">
        <div class="none">
          <div class="inner txt-centering">
            <p>
              조금만 기다리세요<br/>
              곧 옷장이 채워집니다.
            </p>
          </div>
        </div>
      </div>
      <div v-else>
        <feedBack
          ref="feedback"
          v-if="!_.isEmpty(feedbacksData)"
          :data="feedbacksData"
          :subscriptionId="isFeedbacksDirect ? Current.feedbacksDirect.subscription_id: currentData.subscriptionId"
          :type="isFeedbacksDirect ? 'direct' : 'current'">
          <!--:subscriptionId="feedbackDirect.subscription_id ? feedbackDirect.subscription_id : currentCloset.subscription_id"-->
        </feedBack>
        <div class="current" v-show="!isFeedbacksDirect">
          <!-- Swiper ?-->
          <div class="product-image">
            <div v-show="$mq === 'sm'">
              <div class="list-product-image">
                <swiper :options="swiperOption">
                  <swiper-slide
                    class="item"
                    v-for="(data, idx) in currentData.products"
                    :key="idx"
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
              <div class="list-product-image">
                <div
                  class="item"
                  v-for="(data, idx) in currentData.products"
                  :key="idx"
                >
                  <div class="img-box">
                    <img :src="$common.ZulyImage(data.image.width)+data.image.path" alt="">
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- // Swiper -->
          <div class="product-explain">
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

import VueJsonPretty from 'vue-json-pretty';

export default {
  name: 'current',
  data() {
    return {
      feedbacksData: {},
      directFeedbackCheck: false,

      isCurrentData: false,
      isFeedbacksData: false,
      isFeedbacksDirect: false,

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
    VueJsonPretty
  },
  computed: {
    ...mapGetters({
      isLogin: 'login/isLogin',
      Current: 'subscriptions/Current'
      // currentCloset: 'mypage/closet/getCurrentCloset',
      // currentNone: 'mypage/closet/getCurrentNone',
      // feedbackDirect: 'login/feedbackDirect',
    })
  },
  methods: {
    ...mapActions({
      getCurrent: 'subscriptions/getCurrent',
      getFeedbacks: 'subscriptions/getFeedbacks'
      // setCurrentCloset: 'mypage/closet/setCurrentCloset',
      // buyUsedProduct: 'mypage/closet/buyUsedProduct',
      // initPaymentCurrent: 'mypage/closet/initPaymentCurrent',
    }),
    setCurrentData() {
      this.currentData = {
        subscriptionId: this.Current.result[0].subscription_id,
        stylist: this.Current.result[0].stylist,
        stylingTitle: this.Current.result[0].styling_title,
        stylingTip: this.Current.result[0].styling_tip,
        hashTag: this.Current.result[0].hashtag,
        products: this.Current.result[0].products
      };
    },
    callFeedbacks(formData) {}
  },
  async created() {
    // 피드백 직접접속을 위한 분기
    if (this.isLogin) {
      // 로그인 상태
      console.log('로그인');
      if (!_.isEmpty(this.Current)) {
        // 스토어에 현재의 옷장 데이터가 없다면 API 호출.
        await this.getCurrent().then(res => {
          if (_.isEmpty(res.data.result)) {
            // 현재의 옷장 데이터가 없다면. (준비되지 않았다면)
            this.isCurrentData = false;
          } else {
            // 현재의 옷장 데이터가 있다면
            this.setCurrentData();
            // 피드백 API 호출
            const formData = {
              subscriptionId: this.currentData.subscriptionId
            };
            this.getFeedbacks(formData).then(res => {
              if (res.data.result) {
                // 피드백 데이터가 있다면
                this.feedbacksData = this.Current.feedbacks;
                console.log(this.feedbacksData);
                this.isFeedbacksData = true;
              } else {
                // 피드백 데이터가 없다면
                this.isFeedbacksData = false;
              }
            });
            this.isCurrentData = true;
          }
        });
      } else {
        // 스토어에 현재의 옷장 데이터가 있다면  currentData에 필터해서 넣는다.
        this.setCurrentData();
        this.isCurrentData = true;
      }
    } else {
      // 비로그인 상태
      console.log('비로그인!');
      const formData = {
        subscriptionId: this.Current.feedbacksDirect.subscription_id
      };
      this.getFeedbacks(formData).then(res => {
        if (res.data.result) {
          // 피드백 데이터가 있다면
          this.feedbacksData = this.Current.feedbacks;
          this.isFeedbacksData = true;
          this.isFeedbacksDirect = true;
        } else {
          // 피드백 데이터가 없다면
          this.isFeedbacksData = false;
          this.isFeedbacksDirect = false;
        }
      });
      this.isCurrentData = true;
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
    font-size: 18px;
    line-height: 28px;
    letter-spacing: -1.2px;
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
    content: "ZULY STYLE";
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
  .swiper-pagination {
    bottom: 20px;
  }
  .swiper-button-prev,
  .swiper-button-next {
    height: 32px;
    width: 32px;
    border: 1px solid #b9b9b9;
    border-width: 1px 1px 0 0;
    background-image: none;
  }
  .swiper-button-prev {
    -webkit-transform: rotate(-135deg);
    transform: rotate(-135deg);
    left: 26px;
  }
  .swiper-button-next {
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
    right: 26px;
  }
  .swiper-button-disabled {
    display: none;
  }
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
  &::before {
    content: "#";
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
  .current-styling {
    margin-top: 0;
  }
  .list-product-image {
    text-align: center;
    .item {
      display: inline-block;
      vertical-align: top;
      &:nth-child(2) {
        margin-left: 30px;
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
    text-align: center;
  }
  .txt-tip-today-style {
    @include fontSize(44px);
    line-height: 44px;
    text-align: left;
    padding-left: 30px;
    &::before {
      left: 0;
    }
  }
}
@media (min-width: 1280px) {
}
</style>
