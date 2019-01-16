<template>
  <div class="contents">
    <div v-if="!PastDataExist">
      <NotYet/>
    </div>
    <div v-else>
      <div class="contents-header">
        <h3>그 동안의 옷장을 확인하실 수 있습니다.</h3>
      </div>
      <div class="content mt-15">
        <div class="past">
          <div class="past-header">
            <div class="index-wrap content-item">회차</div>
            <div class="history-wrap content-item">옷장 내역</div>
          </div>

          <div class="past-body">
            <!--<div v-if="!isPastData">
              <div class="none"><p>과거의 옷장 내역이 없습니다.</p></div>
            </div>-->
            <template v-for="(data, idx) in PastData">
              <div :key="idx" class="body-row">
                <div class="past-content">
                  <div class="index-wrap content-item">
                    <span class="txt-index"
                    >{{ PastData.length - idx
                      }}{{ suffixNumber(PastData.length - idx) }}</span
                    ><span class="txt-date">{{ data.subscription_date }}</span>
                  </div>
                  <div class="image-wrap content-item">
                    <div class="list-image">
                      <div
                        v-for="(imgData, imgIdx) in data.products"
                        :key="imgIdx"
                        v-if="imgData.image_path !== null"
                      >
                        <img
                          :src="$common.ZulyImage() + imgData.image_path"
                          @click="clickProductDetails(imgData)"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="text-wrap content-item">
                    <p class="txt-styling-title">{{ data.styling_title }}</p>
                    <p class="txt-styling-tip">{{ data.styling_tip }}</p>
                  </div>
                  <div
                    v-if="
                      _.has(PastFeedBackData[idx], 'result') &&
                        PastFeedBackData[idx].result
                    "
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
                    :ref="'feedback' + idx"
                    v-if="
                      _.has(PastFeedBackData[idx], 'result') &&
                        PastFeedBackData[idx].result
                    "
                    :feedbackData="PastFeedBackData[idx]"
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
    <!--<div>
      <div class="contents-header">
        <h3>그 동안의 옷장을 확인하실 수 있습니다.</h3>
      </div>
      <div class="content mt-15">
        <div class="past">
          <div class="past-header">
            <div class="index-wrap content-item">회차</div>
            <div class="history-wrap content-item">옷장 내역</div>
          </div>

          <div class="past-body">
            <div v-if="!isPastData">
              <div class="none"><p>과거의 옷장 내역이 없습니다.</p></div>
            </div>
            <template v-else v-for="(data, idx) in PastData">
              <div :key="idx" class="body-row">
                <div class="past-content">
                  <div class="index-wrap content-item">
                    <span class="txt-index"
                      >{{ PastData.length - idx
                      }}{{ suffixNumber(PastData.length - idx) }}</span
                    ><span class="txt-date">{{ data.subscription_date }}</span>
                  </div>
                  <div class="image-wrap content-item">
                    <div class="list-image">
                      <div
                        v-for="(imgData, imgIdx) in data.products"
                        :key="imgIdx"
                        v-if="imgData.image_path !== null"
                      >
                        <img
                          :src="$common.ZulyImage() + imgData.image_path"
                          @click="clickProductDetails(imgData)"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="text-wrap content-item">
                    <p class="txt-styling-title">{{ data.styling_title }}</p>
                    <p class="txt-styling-tip">{{ data.styling_tip }}</p>
                  </div>
                  <div
                    v-if="
                      _.has(feedbackData[idx], 'result') &&
                        feedbackData[idx].result
                    "
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
                    :ref="'feedback' + idx"
                    v-if="
                      _.has(feedbackData[idx], 'result') &&
                        feedbackData[idx].result
                    "
                    :feedbackData="feedbackData[idx]"
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
    </div>-->
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import ModalProductDetail from '@/components/common/modal/ModalProductDetail.vue';
import FeedbackPast from '@/components/closet/feedback/FeedbackPast';
import SubsciptionAPI from '@/library/api/subscriptions';

export default {
  name: 'Closet_Past',
  data() {
    return {
    };
  },
  components: {
    NotYet: () => import('@/components/closet/Common/NotYet.vue'),
    FeedbackPast,
    ModalProductDetail
  },
  watch: {},
  computed: {
    ...mapGetters({
      PastData: 'closet/PastData',
      PastDataExist: 'closet/PastDataExist',
      PastFeedBackData: 'closet/PastFeedBackData'
    })
  },
  methods: {
    ...mapActions({
      FETCH_PAST_DATA: 'closet/FETCH_PAST_DATA'
    }),
    async clickProductDetails(param) {
      const modalConfig = {
        scrollable: true,
        height: 'auto',
        width: '98%',
        maxWidth: 600,
        adaptive: true
      };
      try {
        const resultData = await SubsciptionAPI.GetProductDetail(param.barcode);
        this.$modal.show(
          ModalProductDetail,
          { data: resultData.data },
          modalConfig
        );
      } catch {
        this.$dialog.alert('데이터가 존재하지 않습니다.', {
          okText: '확인',
          customClass: 'zuly-alert',
          backdropClose: true
        });
      }
    },
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
    await this.FETCH_PAST_DATA();
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
          cursor: pointer;
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
      &:hover {
        color: #566b9c;
        text-decoration: underline;
      }
    }
  }
}

.past-table-header {
  display: none;
}

@media (min-width: 1080px) {
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
    border-top: 2px solid $color-primary;
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
