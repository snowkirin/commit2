<template>
  <div class="contents">
    <div class="contents-header">
      <h3>그 동안의 옷장을 확인하실 수 있습니다.</h3>
    </div>
    <div class="content">

    </div>
  </div>
  <!--<div class="past">
    <div>
      <p class="txt-main-title">그 동안의 옷장을 확인하실 수 있습니다.</p>
    </div>
    <div class="line line__default"></div>
    <div>
      <ul class="list-closet">
        <li
          v-for="(data, idx) in pastCloset"
          class="closet-item"
          :key="idx">
          <p class="order">
            <span class="number">{{ numberSuffix(idx, pastCloset.length) }}</span>
            <span class="date"> {{ data.subscription_date }}</span>
          </p>
          <div class="product-desc">
            <ul
              class="list-product clearfix">
              <li
                v-for="(img, idx2) in data.images"
                :key="idx2"
                class="image"
              >
                <img :src="(img !== null)? API_IMAGE_URL + img : 'http://via.placeholder.com/60x70?text=Image '" alt=""/>
              </li>
            </ul>
            <div class="style-tip">
              <p class="title">ZULY Comment</p>
              <p class="explain">
                &lt;!&ndash;심플하지만 갖춰입은듯 스타일리쉬 한 룩!
                - 허리에서 포켓까지 이어진 바이올렛톤의 새틴 배색이 포인트인 팬츠로, 이러한 디자인의 특징을 살려서 블라우스를 입을때 앞면을 살짝..&ndash;&gt;
                {{ printStylingTip(data.styling_tip) }}
              </p>
            </div>
            <div class="list-link">
              <a
                @click="viewModal(data.id)"
                href="#"
                class="txt-link"
                style="display: none;"
                v-if="data.is_sold === 'N'">
                구매 정보 보기
              </a>
              <br v-if="$mq !== 'sm'">
              <a
                href="#"
                v-if="feedbackToggle(idx)"
                @click.prevent="clickShowFeedback(idx)"
                class="txt-link">
                옷장 후기 입력하기
              </a>
            </div>
          </div>
          <feedBack
            :ref="'feedback'+idx"
            :subscriptionId="data.id"
            :data="feedbackData[idx]"
            :type="'past'"
            v-if="feedbackToggle(idx)">
          </feedBack>
        </li>
      </ul>
    </div>
    <custom-modal ref="view" :dataId="dataId" title="" width="500" height="530" modalType="pastView"></custom-modal>
  </div>-->
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import CustomModal from '@/components/common/CustomModal';
import FeedBack from '@/components/closet/feedback/Index';
import Closet from '@/library/api/closet';

export default {
  name: 'past',
  data() {
    return {
      API_IMAGE_URL: process.env.API_IMAGE_URL,
      feedbackData: [],
      dataId: null
    };
  },
  components: {
    CustomModal,
    FeedBack
  },
  computed: {
    ...mapGetters({
      pastCloset: 'mypage/closet/getPastCloset',
      pastNone: 'mypage/closet/getPastNone'
    })
  },
  methods: {
    ...mapActions({
      setPastCloset: 'mypage/closet/setPastCloset'
    }),
    clickShowFeedback(idx) {
      const feedback = this.$refs['feedback' + idx][0];
      const review = feedback.$refs.review;
      const elem = document.documentElement.scrollTop
        ? document.documentElement
        : document.body;
      if (review.style.display !== 'block') {
        review.style.display = 'block';
        elem.scrollTop = feedback.$el.offsetTop;
      }
    },
    feedbackToggle(idx) {
      if (this.feedbackData[idx]) {
        if (this.feedbackData[idx].result) {
          return true;
        }
      } else {
        return false;
      }
    },
    viewModal(id) {
      this.dataId = id.toString();
      this.$refs.view.openModal();
    },
    numberSuffix(num, total) {
      let result;
      if (num === 0) {
        if (total === 1) {
          result = `${total}st`;
        } else if (total === 2) {
          result = `${total}nd`;
        } else if (total === 3) {
          result = `${total}rd`;
        } else {
          result = `${total}th`;
        }
      } else if (num > 0) {
        const number = total - 1;
        if (number === 1) {
          result = `${number}st`;
        } else if (number === 2) {
          result = `${number}nd`;
        } else if (number === 3) {
          result = `${number}rd`;
        } else {
          result = `${number}th`;
        }
      }
      return result;
    },
    printStylingTip(data) {
      let printData = data;
      printData = printData.replace(new RegExp(/\r?\n/, 'g'), '<br/>');

      return printData;
    },
    feedbackInfo(data) {
      const $this = this;
      _.forEach(data, function(value) {
        const subscriptionId = value.id;
        Closet.mypageFeedback(subscriptionId)
          .then(function(res) {
            $this.feedbackData = _.concat($this.feedbackData, res.data);
          })
          .catch(function(err) {
            console.log(err);
          });
      });
    }
  },
  async created() {
    await this.setPastCloset();
    await this.feedbackInfo(this.pastCloset);
  }
};
</script>
<style scoped lang="scss" src="@/assets/css/closet-style.scss">
</style>
<style scoped lang="scss">
.past {
  padding: 25px 20px 20px 20px;
}
.txt-main-title {
  word-break: keep-all;
}
.line {
  margin-top: 10px;
}
.list-closet {
  .closet-item {
    border-bottom: 1px solid #e9e9e9;
    padding-top: 17px;
    padding-bottom: 26px;
  }
  .order {
    margin-bottom: 10px;
    font-family: "Open Sans", "맑은 고딕", "Malgun Gothic", sans-serif;
    .number,
    .date {
      line-height: 21px;
      font-size: 16px;
      font-weight: 700;
      letter-spacing: -1px;
    }
    .number {
      position: relative;
      margin-right: 12px;
      &:after {
        content: "";
        display: block;
        position: absolute;
        border-right: 1px solid #979797;
        height: 12px;
        top: 6px;
        right: -10px;
      }
    }
  }
  .list-product {
    margin-bottom: 16px;
    .image {
      width: 48.5745%;
      &:nth-child(1) {
        float: left;
      }
      &:nth-child(2) {
        float: right;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .style-tip {
    margin-bottom: 19px;
    .title,
    .explain {
      font-size: 15px;
      letter-spacing: -0.9px;
    }
    .title {
      line-height: 21px;
      font-weight: 700;
      margin-bottom: 7px;
    }
    .explain {
      line-height: 23px;
      color: #797979;
    }
  }
}
.list-link {
  a {
    margin-right: 15px;
  }
}
@media (min-width: 768px) {
  .past {
    width: 1200px;
    margin: 0 auto;
    padding: 32px 0 0 0;
  }
  .line {
    margin-top: 26px;
    margin-bottom: 5px;
    border-width: 2px;
  }
  .list-closet {
    .closet-item {
      padding-top: 21px;
      padding-bottom: 30px;
    }
    .order {
      text-indent: 7px;
      margin-bottom: 15px;
    }
    .product-desc {
      display: flex;
    }
    .list-product {
      margin-bottom: 0;
      flex-grow: 0;
      flex-shrink: 0;
      flex-basis: 234px;
      .image {
        width: 112px;
        height: 132px;
        &:nth-child(1) {
          margin-right: 10px;
        }
        &:nth-child(2) {
          float: left;
        }
      }
    }
    .style-tip {
      margin-left: 28px;
      margin-bottom: 0;
      margin-right: 98px;
      flex-grow: 0;
      flex-shrink: 0;
      flex-basis: 697px;
      .title {
        margin-bottom: 10px;
      }
    }
  }
  .purchase-info {
    margin-top: 62px;
  }
}
</style>
