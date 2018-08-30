<template>
  <div class="contents">
    <div v-if="!isPastData">
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
      <div class="contents-header">
        <h3>그 동안의 옷장을 확인하실 수 있습니다.</h3>
      </div>
      <div class="content">
        <div class="list-past">
          <div
            class="item"
            v-for="(data, idx) in PastResult"
            :key="idx"
          >
            <div>
              <div class="date-wrap">
                <p>
                  <span>{{PastResult.length - idx}}th</span> | <span>{{ data .subscription_date }}</span>
                </p>
              </div>
              <div class="image-wrap">
                <div>
                  <div
                    class="image"
                    v-for="(data2, idx2) in data.images"
                    :key="idx2"
                    v-if="data2 !== null"
                  >
                    <img :src="$common.ZulyImage() + data2" alt="">
                  </div>
                </div>
              </div>
              <div class="text-wrap">
                <p class="txt-styling-title">
                  {{ data.styling_title }}
                </p>
                <p class="txt-styling-tip">
                  {{ data.styling_tip }}
                </p>
              </div>
              <div class="link-wrap">
                <!--구매 정보 기획이 나오기 전까지 숨겨집니다. -->
                <a
                  class="txt-link"
                  href="#"
                  :data-id="data.id"
                  v-if="false"
                  @click="clickPastDetail"
                >
                  구매 정보 보기
                </a>
                <a
                  class="txt-link"
                  href="#"
                  :data-id="data.id"
                  v-if="(feedbacksData[idx] && feedbacksData[idx].result)"
                  @click="clickShowFeedBack"
                >
                  옷장 후기 입력하기
                </a>
              </div>
            </div>
            <feedBack
              v-if="feedbackToggle(idx)"
              :subscriptionId="data.id"
              :data="feedbacksData[idx]"
              :type="'past'">
            </feedBack>
            {{feedbacksData[idx]}}
          </div>

        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import VueJsonPretty from 'vue-json-pretty';
import CustomModal from '@/components/common/CustomModal';
import FeedBack from '@/components/closet/feedback/Index';

export default {
  name: 'past',
  data() {
    return {
      isPastData: false,
      feedbacksData: [],
    };
  },
  components: {
    CustomModal,
    FeedBack,
    VueJsonPretty
  },
  computed: {
    ...mapGetters({
      PastResult: 'subscriptions/PastResult',
      PastIsShow: 'subscriptions/PastIsShow',
      PastFeedbacks: 'subscriptions/PastFeedbacks'
    })
  },
  methods: {
    ...mapActions({
      getPast: 'subscriptions/getPast',
      getPastDetail: 'subscriptions/getPastDetail',
      getFeedbacks: 'subscriptions/getFeedbacks'
    }),
    feedbackToggle(idx) {
      if (this.feedbacksData[idx]) {
        if (this.feedbacksData[idx].result) {
          return true;
        }
      } else {
        return false;
      }
    },
    clickPastDetail(event) {
      event.preventDefault();
      const target = event.target;
      const subscriptionId = target.getAttribute('data-id');
      this.getPastDetail(subscriptionId).then(res => {
        console.log(res);
      });
    },
    clickShowFeedBack(event) {
      // 단순하게 Show Hide기능만 넣어야겠다.
      event.preventDefault();
      // const target = event.target;
      // const subscriptionId = target.getAttribute('data-id');
      // console.log(subscriptionId);
      // const formFeedBacks = {
      //   subscriptionId: subscriptionId,
      //   type: 'past'
      // };
      // this.getFeedbacks(formFeedBacks).then(res => {
      //   console.log(res);
      // })
    },
    setPastFeedbacks(data) {
      _.forEach(data, (value) => {
        const formFeedBacks = {
          subscriptionId: value.id,
          type: 'past'
        };
        this.getFeedbacks(formFeedBacks).then(res => {
          this.feedbacksData = _.concat(this.feedbacksData, res.data);
        });
      });
    },
  },
  async created() {
    await this.getPast().then(res => {
      this.isPastData = res.data.result.length !== 0;
      this.setPastFeedbacks(this.PastResult);
    });
  }
};
</script>
<style scoped lang="scss" src="@/assets/css/closet-style.scss"></style>
<style scoped lang="scss">
  .list-past {
    border-top: 1px solid #333;
    border-bottom: 1px solid #333;
    .item {
      border-top: 1px solid #e9e9e9;
      padding: 15px 0;
      &:nth-child(1) {
        border-top: 0 none;
      }
    }
  }
  .date-wrap {
    @include fontSize(16px, en);
    font-weight: 700;
    margin-bottom: 10px;
  }
  .image-wrap {
    text-align: center;
    .image {
      display: inline-block;
      vertical-align: top;
      width: 163px;
      & +.image {
        margin-left: 9px;
      }
      img {
        width: 100%;
      }
    }
  }

  .text-wrap {
    @include fontSize(15px);
    color: #797979;
    padding: 15px 0;
  }
  .txt-link {
    @include fontSize(14px);
    color: #566b9c;
    text-decoration: underline;
    & +.txt-link {
      margin-left: 15px;
    }
  }
</style>
