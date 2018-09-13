<template>
  <div class="contents">
    <div>
      <div class="contents-header">
        <h3>그 동안의 옷장을 확인하실 수 있습니다.</h3>
      </div>
      <div class="content">
        <div class="past">
          <div class="past-header">
            <div class="index-wrap content-item">회차</div>
            <div class="history-wrap content-item">옷장 내역</div>
          </div>

          <div class="past-body">
            <div
              v-if="!isPastData"
            >
              <div class="none">
                <p>과거의 옷장 내역이 없습니다.</p>
              </div>
            </div>
            <template
              v-else
              v-for="(data, idx) in PastResult"
            >
              <div :key="idx" class="body-row">
                <div class="past-content">
                  <div class="index-wrap content-item">
                    <span class="txt-index">{{PastResult.length - idx}}{{suffixNumber(PastResult.length - idx)}}</span><span class="txt-date">{{ data.subscription_date }}</span>
                  </div>
                  <div class="image-wrap content-item">
                    <div class="list-image">
                      <div v-for="(imgData, imgIdx) in data.images" :key="imgIdx" v-if="imgData !== null">
                        <img
                          :src="$common.ZulyImage() + imgData"
                          alt="">
                      </div>
                    </div>
                  </div>
                  <div class="text-wrap content-item">
                    <p class="txt-styling-title">{{ data.styling_title }}</p>
                    <p class="txt-styling-tip">{{ data.styling_tip }}</p>
                  </div>
                  <div
                    v-if="_.has(feedbackData[(PastResult.length -1) - idx], 'result') && feedbackData[(PastResult.length -1) - idx].result"
                    class="link-wrap content-item"
                  >
                    <a
                      href="#"
                      class="txt-link"
                      @click="clickFeedbackShow(idx, $event)"
                    >
                      옷장 후기 입력하기
                    </a>
                  </div>
                </div>
                <div>
                  <feedback-past
                    style="display: none"
                    :ref="'feedback'+idx"
                    v-if="_.has(feedbackData[(PastResult.length -1) - idx], 'result') && feedbackData[(PastResult.length -1) - idx].result"
                    :feedbackData="feedbackData[(PastResult.length -1) - idx]"
                    :subscriptionId="data.id"
                    @hide="clickFeedbackHide(idx)"
                  >
                  </feedback-past>
                </div>
              </div>
            </template>
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
import FeedbackPast from '@/components/closet/feedback/FeedbackPast';

export default {
  name: 'past',
  data() {
    return {
      isPastData: false,
      feedbackData: []
    };
  },
  components: {
    CustomModal,
    FeedbackPast,
    VueJsonPretty
  },
  watch: {
    feedbackData() {}
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
      getPastFeedbacks: 'subscriptions/getPastFeedbacks'
    }),
    clickFeedbackShow(idx, event) {
      event.preventDefault();
      this.$refs['feedback' + idx][0].$el.style.display = 'block';
    },
    clickFeedbackHide(idx) {
      this.$refs['feedback' + idx][0].$el.style.display = 'none';
    },
    checkFeedback(data) {
      const formData = {
        subscriptionId: data.id
      };
      this.getPastFeedbacks(formData).then(res => {
        this.feedbacksData.push(res.data);
      });
    },
    suffixNumber(data) {
      if (data === 1) {
        return 'st';
      } else if (data === 2) {
        return 'nd';
      } else if (data === 3) {
        return 'rd';
      } else {
        return 'th';
      }
    },
    clickPastDetail(event) {
      event.preventDefault();
      const target = event.target;
      const subscriptionId = target.getAttribute('data-id');
      this.getPastDetail(subscriptionId);
    }
  },
  async created() {
    await this.getPast().then(res => {
      this.isPastData = res.data.result.length !== 0;
    });

    this.PastResult.forEach(value => {
      const formData = {
        subscriptionId: value.id
      };
      this.getPastFeedbacks(formData).then(res => {
        this.feedbackData.push(res.data);
      });
    });
  }
};
</script>
<style scoped lang="scss" src="@/assets/css/closet-style.scss">
</style>
<style scoped lang="scss">
.none {
  padding-top: 14px;
  padding-bottom: 16px;
  p {
    @include fontSize(15px);
    text-align: center;
  }
}

.past {
  border-top: 1px solid $color-primary;
  border-bottom: 1px solid $color-primary;
  .past-header {
    display: none;
  }
  .past-content {
    padding-top: 15px;
    padding-bottom: 15px;
  }
  .body-row {
    border-top: 1px solid #e9e9e9;
    &:first-child {
      border-top: 0 none;
    }
  }
  .index-wrap {
    span {
      @include fontSize(16px, en);
      font-weight: 700;
    }
    .txt-index {
      position: relative;
      margin-right: 15px;
      &::after {
        position: absolute;
        content: '';
        display: block;
        right: -8px;
        border-right: 1px solid #979797;
        height: 12px;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }
  .image-wrap {
    margin-top: 11px;
    .list-image {
      font-size: 0;
      div {
        display: inline-block;
        width: calc(50% - 5px);
        vertical-align: top;
        img {
          width: 100%;
        }
        &:nth-child(2) {
          margin-left: 10px;
        }
      }
    }
  }
  .text-wrap {
    margin-top: 15px;
    p {
      @include fontSize(15px);
      color: $color-secondary;
      white-space: pre-wrap;
    }
  }
  .link-wrap {
    @include fontSize(14px);
    margin-top: 15px;
    .txt-link {
      &:not(:first-child) {
        margin-left: 15px;
      }
    }
  }
}

.past-table-header {
  display: none;
}

@media (min-width: 1280px) {
  .none {
    border-top: 1px solid #e9e9e9;
    position: relative;
    &::after {
      content: '';
      display: block;
      width: 100%;
      position: absolute;
      left: 0;
      bottom: -1px;
      border-bottom: 1px solid #e9e9e9;
    }
  }

  .past {
    .body-row {
      &:first-child {
        border-top: 1px solid #e9e9e9;
      }
    }
    .past-header,
    .past-content {
      display: flex;
      align-items: center;
      .content-item {
        flex-grow: 1;
        flex-shrink: 0;
      }
      .index-wrap {
        flex-basis: 15.166666666666668%;
        max-width: 15.166666666666668%;
        padding-left: 19px;
      }
      .image-wrap,
      .text-wrap,
      .link-wrap {
        margin-top: 0;
      }
    }
    .past-header {
      padding-top: 10px;
      padding-bottom: 10px;
      .content-item {
        @include fontSize(15px);
        font-weight: 700;
        text-align: center;
      }
    }
    .past-content {
      padding-top: 20px;
      padding-bottom: 20px;
      .index-wrap {
      }
      .image-wrap {
        flex-basis: 13.916666666666666%;
        max-width: 13.916666666666666%;
        padding-right: 22px;
      }
      .text-wrap {
        flex-basis: 57.99999999999999%;
        max-width: 57.99999999999999%;
      }
      .link-wrap {
        .txt-link {
          display: block;
          &:not(:first-child) {
            margin-left: 0;
          }
        }
      }
    }
  }
}
</style>
