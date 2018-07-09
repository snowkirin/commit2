<template>
  <div class="feedback" v-if="result">
    <div class="rating">
      <div class="inner">
        <p class="txt-rating">현재 대여 중인 <span class="txt-bold">의상 사이즈</span>가 어떠세요?</p>
        <ul class="list-rating">
          <li
            :class="{selected : rating === 'love'}"
            @click="clickRating('love')">
            <div class="image">
              <img :src="(rating !== 'love') ? '/static/img/closet/ico_feedback1.png' : '/static/img/closet/ico_feedback1_active.png'">
            </div>
            <p class="text">완전 좋아요!</p>
          </li>
          <li
            :class="{selected : rating === 'okay'}"
            @click="clickRating('okay')">
            <div class="image">
              <img :src="(rating !== 'okay') ? '/static/img/closet/ico_feedback2.png' : '/static/img/closet/ico_feedback2_active.png'">
            </div>
            <p class="text">괜찮아요!</p>
          </li>
          <li
            :class="{selected : rating === 'bad'}"
            @click="clickRating('bad')">
            <div class="image">
              <img :src="(rating !== 'bad') ? '/static/img/closet/ico_feedback3.png' : '/static/img/closet/ico_feedback3_active.png'">
            </div>
            <p class="text">아쉬워요!</p>
          </li>
        </ul>
      </div>
      <p class="txt-refer">※ 고객님의 의견은 맞춤형  큰 도움이 됩니다.</p>
    </div>
    <div class="review">
      <p class="txt-review">소중한 이용 후기 부탁드립니다.</p>
      <!--COMMON-->
      <div>
        <div class="section">
          <div
            v-for="(data, idx) in questionCommon"
            :key="idx"
            class="row">
            <div class="text">
              <p class="txt-point">
                {{ data.question_text }}
              </p>
            </div>
            <div>
              <ul class="square-list">
                <li
                  v-for="(data2, idx2) in data.answer_text"
                  :key="idx2"
                  @click="clickEvt(data, idx2, $event)">
                  <div class="txt-centering">{{ data2 }}</div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <!-- A -->
        <div class="section" v-if="_.isPlainObject(questionA.info)">

          <div class="row">
            <div class="text">
              <p class="txt-point">
                {{question.A.info.name}}
              </p>
            </div>
            <div class="image">
              <img :src="$common.IMAGEURL() + questionA.info.image_path" alt="">
            </div>
          </div>
          <div class="row" v-for="(data, idx) in questionA.question" :key="idx+'_A'">
            <div class="text">
              <p class="txt-point">
                {{ data.question_text }}
              </p>
            </div>
            <div>
              <ul class="square-list">
                :class="(data['answer_text'].length === 5 && idx2 === 3) ? 'line-break': ''"
                <li
                  v-for="(data2, idx2) in data.answer_text"
                  :key="idx2"
                  @click="clickEvt(data, idx2, $event)">
                  <div class="txt-centering">{{ data2 }}</div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div>
        <!-- B -->
        <div class="section" v-if="_.isPlainObject(questionB.info)">
          <div
            class="row">
            <div class="text">
              <p class="txt-point">
                {{question.A.info.name}}
              </p>
            </div>
            <div class="image">
              <img :src="$common.IMAGEURL() + questionB['info'].image_path" alt="">
            </div>
          </div>
          <div
            class="row"
            v-for="(data, idx) in questionB.question"
            :key="idx+'_B'">
            <div class="text">
              <p class="txt-point">
                {{ data.question_text }}
              </p>
            </div>
            <div>
              <ul class="square-list">
                :class="(data['answer_text'].length === 5 && idx2 === 3) ? 'line-break': ''"
                <li
                  v-for="(data2, idx2) in data.answer_text"
                  :key="idx2"
                  @click="clickEvt(data, idx2, $event)">
                  <div class="txt-centering">{{ data2 }}</div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <!-- NPS-->
        <div class="section" v-if="setNPS">
          <div
            class="row">
            <div class="text">
              <p class="txt-point">ZULY 서비스를 지인이나 친구에게 추천하실 의향이 있으신가요?</p>
              <p class="txt-refer">(적극 추천하는 것을 10점 만점으로 생각하고 점수를 매겨주세요.)</p>
            </div>
            <div>
              <ul class="square-list">
                <li
                  v-for="(data, idx) in ['10', '9', '8', '7', '6', '5' , '4', '3', '2', '1']"
                  @click="clickNps(data, idx, $event)"
                  :key="idx">
                  <div class="txt-centering">
                    {{ data }}
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <alert-modal ref="view" width="300" height="153"></alert-modal>
  </div>
</template>

<script>
import AlertModal from '@/components/common/AlertModal';
import Closet from '@/library/api/closet';


export default {
  name: 'feedBack',
  props: ['subscriptionId'],
  components: {
    AlertModal,
  },
  data() {
    return {
      rating: '',
      feedbackId: null,
      questionCommon: {},
      questionA: {},
      questionB: {},
      result: null,
      setNPS: null,
    };
  },
  computed: {
  },
  methods: {
    clickEvt(data, index, event) {
      const $this = this;
      const sendData = {
        subscriptionId: _.parseInt(this.subscriptionId),
        feedbackId: _.parseInt(this.feedbackId),
        barcode: (data.barcode) ? _.parseInt(data.barcode) : null,
        clothType: _.parseInt(data.cloth_type),
        questionCode: _.parseInt(data.question_code),
        answerCode: _.parseInt(data.answer_code[index]),
      };
      Closet.mypageFeedbackAnswer(sendData).then(function(res) {
        _.forEach(event.path[2].querySelectorAll('li'),function(value){
          value.classList.remove('selected');
        });
        event.target.parentNode.classList.add('selected');
        console.log('Click Feedback');
      }).catch(function(err) {
        $this.$common.viewAlertModal('서버와의 통신이 불안정합니다.', $this.$refs, 'alert');
        console.error(err);
        return false;
      });
    },
    clickNps(data, index, event) {
      const $this = this;
      const sendData = {
        subscriptionId: _.parseInt(this.subscriptionId),
        feedbackId: _.parseInt(this.feedbackId),
        npsScore: _.parseInt(data),
      };
      Closet.mypageFeedbackNps(sendData).then(function(res) {
        _.forEach(event.path[2].querySelectorAll('li'),function(value){
          value.classList.remove('selected');
        });
        event.target.parentNode.classList.add('selected');
        console.log('Click Nps');
      }).catch(function(err) {
        $this.$common.viewAlertModal('서버와의 통신이 불안정합니다.', $this.$refs, 'alert');
        console.error(err);
        return false;
      });
    },
    btnSubmit() {
      this.$common.viewAlertModal('의견 감사합니다.', this.$refs, 'alert');
    },
    clickRating(data) {
      this.rating = data;
    },
  },
  created() {
    const $this = this;
    Closet.mypageFeedback($this.subscriptionId).then(function(res) {
      if (res.data.result) {
        $this.feedbackId = res.data.feedback_id;
        $this.questionCommon = res.data.question.common;
        $this.questionA = res.data.question.A;
        $this.questionB = res.data.question.B;
        $this.question = res.data.question;
        $this.result = res.data.result;
        $this.setNPS = res.data.setNPS;
      } else {
        $this.result = res.data.result;
        $this.$emit('interface', false);

      }
    }).catch(function(err) {
      console.log(err);
    });

  },
  beforeMount() {

  },
};
</script>

<style scoped lang="scss">
  .feedback {
    // 부모의 패딩값 만큼.
    margin-left: -20px;
    width: 100vw;
    margin-bottom: 34px;
  }
  .rating {
    text-align: center;
    padding-left: 20px;
    padding-right: 20px;
    .inner {
      background-image: url('/static/img/closet/img_feedback.png');
      height: 187px;
      background-position: 50% 50%;
      background-size: cover;
      opacity: 0.9;
      padding-top: 32px;
      margin-bottom: 15px;
    }
    .txt-rating {
      font-size: 16px;
      line-height: 24px;
      letter-spacing: -1px;
      color: #fff;
    }
    .list-rating {
      font-size: 0;
      margin-top: 21px;
      li {
        display: inline-block;
        color: #fff;
        font-size: 14px;
        letter-spacing: -0.6px;
        opacity: 0.6;
        &:nth-child(1) {
          margin-left: 0;
        }
        &:nth-child(2) {
          margin-left: 24px;
        }
        &:nth-child(3) {
          margin-left: 32px;
        }
        &.selected {
          opacity: 1;
        }
      }
      .image {
        img {
          width: 50px;
          height: 50px;
        }
      }
      .text {
        margin-top: 8px;
      }
    }
  }
  .review {
    margin-top: 26px;
    border-bottom: 2px solid #333;
    background-color: #f5f5f5;
    padding-bottom: 40px;
    padding-left: 20px;
    padding-right: 20px;
    .txt-review {
      background-color: #797979;
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
      color: #fff;
      line-height: 43px;
      font-size: 16px;
      letter-spacing: -1px;
      text-align: center;
      height: 43px;
      position: relative;
      margin-left: -20px;
      width: calc(100% + 40px);
      &::before {
        content: '';
        display: block;
        position: absolute;
        border-bottom: 11px solid #797979;
        border-left: 11px solid transparent;
        border-right: 11px solid transparent;
        top: -11px;
        left: 50%;
        transform: translateX(-50%);
      }
    }
    .section {
      background-color: #f5f5f5;
      /*padding-left: 20px;*/
      /*padding-right: 20px;*/
      /*padding-bottom: 40px;*/
      /*border-bottom: 2px solid #333;*/
    }
    .section-a {
      padding-bottom: 30px;
      border-bottom: 1px dashed #a7a7a7;
    }
    .section-b {
      padding-top: 27px;
    }
    .text {
      margin-bottom: 12px;
      text-indent: -1px;
    }
    .txt-refer {
      margin-top: 4px;
    }
    .row {
      padding-top: 36px;
      .image {
        background-color: #e9e9e9;
        padding-top: 32px;
        padding-bottom: 32px;
        text-align: center;
        img {
          border: 5px solid #fff;
          width: 170px;
          height: 200px;
        }
      }
    }
    .form-row {
      margin-top: 10px;
    }
    // 기본모양
    .square-list {
      font-size: 0;
      margin-left: 1px;
      margin-top: 1px;
      // clearfix
      &::after {
        display: block;
        content: '';
        clear: both;
      }
      li {
        // 선택되지 않았을 경우 + 기본값
        background-color: #fff;
        font-size: 15px;
        color: #bbb;
        text-align: center;
        word-break: keep-all;
        float: left;
        border: 1px solid #c4c4c4;
        margin-left: -1px;
        margin-top: -1px;
        position: relative;
        cursor: pointer;
        // 가변 스타일
        width: calc(25% - 1px);
        //width: 123px;
        height: 50px;
        user-select: none;
        &.line-break {
          clear: both;
        }
        // 선택되었을 경우
        &.selected {
          color: #333;
          font-weight: 700;
          letter-spacing: -0.6px;
          outline: 2px solid #333;
          outline-offset: -2px;
          z-index: 10;
        }
      }
    }
    .btn-submit {
      padding-left: 20px;
      padding-right: 20px;
      button {
        width: 100%;
      }
    }
  }

  @media (min-width: 767px) {
    .feedback {
      margin-left: 0;
      width: auto;
    }
    .rating {
      width: 1200px;
      margin: 0 auto;
      padding-left: 0;
      padding-right: 0;
      .inner {
        height: 254px;
        padding-top: 52px;
        margin-bottom: 20px;
      }
      .txt-rating {
        font-size: 20px;
        line-height: 28px;
      }
      .list-rating {
        margin-top: 24px;
        li {
          font-size: 15px;
          opacity: 0.6;
          &:nth-child(2) {
            margin-left: 52px;
          }
          &:nth-child(3) {
            margin-left: 55px;
          }
        }
        .image {
          img {
            width: 65px;
            height: 65px;
          }
        }
        .text {
          margin-top: 12px;
        }
      }
    }
    .review {
      margin-top: 28px;
      width: 1200px;
      margin-left: auto;
      margin-right: auto;
      border-bottom: 0 none;
      background-color: transparent;
      .txt-review {
        line-height: 48px;
        height: 48px;
      }
      .section {
        padding-left: 0px;
        padding-right: 0px;
        padding-bottom: 40px;
        font-size: 0;
        border-bottom: 2px solid #333;
        position: relative;
        &::after {
          position: absolute;
          content: '';
          border-right: 1px solid #e9e9e9;
          height: 92.899%;
          left: calc(50% - 1px);
          top: 56px;
        }

      }
      .section-a {
        padding-bottom: 0;
        border-bottom: 0 none;
        display: inline-block;
        vertical-align: top;
        width: 50%;
        padding-left: 40px;
        padding-right: 70px;

      }
      .section-b {
        padding-top: 0;
        display: inline-block;
        vertical-align: top;
        width: 50%;
        padding-left: 50px;
        padding-right: 59px;
      }
      .text {
        margin-bottom: 12px;
      }
      .btn-submit {
        margin-top: 22px;
        text-align: right;
        padding-left: 0;
        padding-right: 0;
        button {
          width: 287px;
          font-size: 16px;
          letter-spacing: -0.6px;
        }
      }
    }
  }
</style>
