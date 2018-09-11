<template>
  <div class="contents">
    <div>
      <div class="contents-header">
        <h3>그 동안의 옷장을 확인하실 수 있습니다.</h3>
      </div>
      <div class="content">
        <div class="past">
          <div class="past-header">
            <div class="cell">
              회차
            </div>
            <div class="cell">
              옷장 내역
            </div>
          </div>
          <div class="past-body-wrap">
            <div v-if="!isPastData">
              <div class="none">
                <p>과거의 옷장 내역이 없습니다.</p>
              </div>
            </div>
            <div v-else class="past-body" v-for="(data, idx) in PastResult" :key="idx">
              <div class="cell index-wrap">
                <span class="txt-index">{{PastResult.length - idx}}{{suffixNumber(PastResult.length - idx)}}</span><span class="txt-date">{{ data.subscription_date }}</span>
              </div>
              <div class="cell image-wrap">
                <div class="list-image">
                  <div v-for="(dataImg, idxImg) in data.images" :key="idxImg" v-if="dataImg !== null">
                    <img
                      :src="$common.ZulyImage() + dataImg"
                      alt="">
                  </div>
                </div>
              </div>
              <div class="cell text-wrap">
                <p class="txt-styling-title">{{ data.styling_title }}</p>
                <p class="txt-styling-tip">{{ data.styling_tip }}</p>
              </div>
              <div class="cell link-wrap">
                <a href="#" class="txt-link">구매 정보 보기</a>
                <a href="#" class="txt-link" @click="clickShowFeedBack(idx, $event)">옷장 후기 입력하기</a>
              </div>
            </div>
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
      feedbacksData: []
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
      getPastFeedbacks: 'subscriptions/getPastFeedbacks'
    }),

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
      this.getPastDetail(subscriptionId).then(res => {
        console.log(res);
      });
    },
    clickShowFeedBack(idx, event) {
      // 단순하게 Show Hide기능만 넣어야겠다.
      event.preventDefault();
      console.log(this.$refs.feedback);
      this.$refs.feedback[idx].$el.style.display = 'block';
    },
    clickHideFeedBack(){},
    setPastFeedbacks(data) {
      _.forEach(data, value => {
        console.log(value.id);
        const formData = {
          subscriptionId: value.id
        }
        this.getPastFeedbacks(formData).then(res => {
          console.log(res);
          this.feedbacksData = _.concat(this.feedbacksData, res.data);
        });
      });
    }
  },
  async created() {
    await this.getPast().then(res => {
      this.isPastData = res.data.result.length !== 0;
    });
    await this.setPastFeedbacks(this.PastResult);
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
  .past-body-wrap {
  }
  .past-body {
    padding-top: 15px;
    padding-bottom: 15px;
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
    border-top: 2px solid $color-primary;
    border-bottom: 1px solid $color-primary;
    .past-header,
    .past-body {
      width: 100%;
      display: table;
    }
    .past-header {
      .cell {
        @include fontSize(15px);
        height: 43px;
        text-align: center;
        font-weight: 700;
      }
    }
    .past-body {
      padding-top: 20px;
      padding-bottom: 20px;
      &:first-child {
        border-top: 1px solid #e9e9e9;
      }
      .index-wrap {
        padding-left: 19px;
      }
      .image-wrap {
        width: 13.916666666666666%;
        padding-right: 22px;
      }
      .text-wrap {
        width: 57.99999999999999%;
        padding-right: 22px;
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
    .cell {
      display: table-cell;
      vertical-align: middle;
      &:nth-child(1) {
        // 공통 영역
        width: 15.166666666666668%;
      }
    }
  }
}
</style>
