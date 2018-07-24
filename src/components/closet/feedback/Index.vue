<template>
  <div class="feedback">
    <div class="rating" v-if="type === 'current' || type === 'direct'">
      <div class="inner">
        <p class="txt-rating">현재 대여 중인 <span class="txt-bold">의상 사이즈</span>가 어떠세요?</p>
        <ul class="list-rating">
          <li
            :class="{selected : rating === 'love'}"
            @click="clickRating(questionCommon[0], 0, 'love')">
            <div class="image">
              <img :src="(rating === 'love') ? '/static/img/closet/ico_feedback1_active.svg': '/static/img/closet/ico_feedback1.svg'">
            </div>
            <p class="text">{{ questionCommon[0].answer_text[0] }}</p>
          </li>
          <li
            :class="{selected : rating === 'okay'}"
            @click="clickRating(questionCommon[0], 1, 'okay')">
            <div class="image">
              <img :src="(rating === 'okay') ? '/static/img/closet/ico_feedback2_active.svg' : '/static/img/closet/ico_feedback2.svg'">
            </div>
            <p class="text">{{ questionCommon[0].answer_text[1] }}</p>
          </li>
          <li
            :class="{selected : rating === 'bad'}"
            @click="clickRating(questionCommon[0], 2, 'bad')">
            <div class="image">
              <img :src="(rating === 'bad') ? '/static/img/closet/ico_feedback3_active.svg' : '/static/img/closet/ico_feedback3.svg'">
            </div>
            <p class="text">{{ questionCommon[0].answer_text[2] }}</p>
          </li>
        </ul>
      </div>
      <p class="txt-refer">※ 고객님의 의견은 맞춤형  큰 도움이 됩니다.</p>
    </div>
    <div
      class="review"
      ref="review"
      :style="(type === 'direct') ? 'display:block;': 'display: none;'">
      <p class="txt-review" v-if="type === 'current' || type === 'direct'">소중한 이용 후기 부탁드립니다.</p>
      <div class="clearfix section-wrapper">
        <div class="section-left">
          <div class="section">
            <div class="row">
              <div class="text">
                <p class="txt-point">
                  {{ questionCommon[1].question_text }}
                </p>
              </div>
              <div>
                <ul class="square-list">
                  <li
                    v-for="(data2, idx2) in questionCommon[1].answer_text"
                    :key="idx2"
                    :class="{selected:  questionCommon[1].customer_answer === questionCommon[1].answer_code[idx2]}"
                    @click="clickEvt(questionCommon[1], idx2, $event)">
                    <div class="txt-centering">{{ data2 }}</div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="section" v-if="_.isPlainObject(questionA.info)">

            <div class="row">
              <div class="text">
                <p class="txt-point">
                  A. {{question.A.info.name}}
                </p>
              </div>
              <div class="image">
                <img :src="$common.IMAGEURL() + questionA.info.image_path" alt="">
              </div>
            </div>
            <div class="row" v-for="(data, idx) in questionA.question" :key="idx+'_A'">
              <div class="text">
                <p class="txt-point">
                  A-{{ idx+1 }}.{{ data.question_text }}
                </p>
              </div>
              <div>
                <ul class="square-list">
                  <li
                    v-for="(data2, idx2) in data.answer_text"
                    :key="idx2"
                    :class="[(data['answer_text'].length === 5 && idx2 === 3) ? 'line-break': '', {selected: data.customer_answer === data.answer_code[idx2]}]"
                    @click="clickEvt(data, idx2, $event)">
                    <div class="txt-centering">{{ data2 }}</div>
                  </li>
                </ul>
                <div
                  class="form-row"
                  :style="data.customer_answer === '13003' || data.customer_answer === '14003' ? 'display:block;' : 'display: none;'"
                  ref="reasons"
                  v-if="data.question_text === '색상 및 패턴'"
                  :data-questionCode="data.question_code"
                  :data-clothType="data.cloth_type">
                  <input
                    type="text"
                    placeholder="색상, 패턴이 맘에 들지 않은 이유를 적어주세요."
                    :value="data.customer_answer_reason === 'null' ? '' : data.customer_answer_reason"
                    class="form-input">
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="section-right">
          <div class="section" v-if="_.isPlainObject(questionB.info)">
            <div
              class="row">
              <div class="text">
                <p class="txt-point">
                  B. {{question.B.info.name}}
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
                  B-{{ idx+1 }}.{{ data.question_text }}
                </p>
              </div>
              <div>
                <ul class="square-list">
                  <li
                    v-for="(data2, idx2) in data.answer_text"
                    :class="[(data['answer_text'].length === 5 && idx2 === 3) ? 'line-break': '', {selected: data.customer_answer === data.answer_code[idx2]}]"
                    :key="idx2"
                    @click="clickEvt(data, idx2, $event)">
                    <div class="txt-centering">{{ data2 }}</div>
                  </li>
                </ul>
                <div
                  :style="data.customer_answer && data.customer_answer.indexOf('003') !== -1 ? 'display:block;' : 'display: none;'"
                  class="form-row"
                  v-if="data.question_text === '색상 및 패턴'"
                  ref="reasons"
                  :data-questionCode="data.question_code"
                  :data-clothType="data.cloth_type">
                  <input
                    type="text"
                    placeholder="색상, 패턴이 맘에 들지 않은 이유를 적어주세요."
                    :value="data.customer_answer_reason === 'null' ? '' : data.customer_answer_reason"
                    class="form-input">
                </div>
              </div>
            </div>
          </div>
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
                    :class="{selected: scoreNPS === parseInt(data)}"
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

      <div class="btn-submit">
        <button
          type="button"
          @click="btnSubmit"
          class="btn btn-primary">
          제출 하기
        </button>
      </div>
    </div>
    <alert-modal ref="view" width="300" height="153"></alert-modal>
  </div>
</template>

<script>
import AlertModal from '@/components/common/AlertModal';
import Closet from '@/library/api/closet';

import VueJsonPretty from 'vue-json-pretty';

export default {
  name: 'feedBack',
  props: {
    data: {
      type: Object,
    },
    type: {
      type: String,
      default: 'current',
    },
    subscriptionId: {
      type: Number,
    },
  },
  components: {
    AlertModal,
    VueJsonPretty
  },
  data() {
    return {
      rating: '',
      subId: null,
      feedbackId: null,
      questionCommon: {},
      questionA: {},
      questionB: {},
      result: false,
      setNPS: null,
      scoreNPS: null,
    };
  },
  computed: {
  },
  methods: {
    clickEvt(data, index, event) {
      const $this = this;
      const sendData = {
        subscriptionId: this.subId,
        feedbackId: _.parseInt(this.feedbackId),
        barcode: (data.barcode) ? _.parseInt(data.barcode) : null,
        clothType: _.parseInt(data.cloth_type),
        questionCode: _.parseInt(data.question_code),
        answerCode: _.parseInt(data.answer_code[index]),
      };
      if (data.question_text === '색상 및 패턴') {
        if (data.answer_text[index] === '별로') {
          event.target.parentElement.parentElement.parentElement.querySelector('.form-row').style.display = 'block';
          event.target.parentElement.parentElement.parentElement.querySelector('.form-row').setAttribute('data-answerCode', data.answer_code[index]);
        } else {
          event.target.parentElement.parentElement.parentElement.querySelector('.form-row').style.display = 'none';
          event.target.parentElement.parentElement.parentElement.querySelector('.form-row').querySelector('input').value = '';
        }
      }
      Closet.mypageFeedbackAnswer(sendData).then(function(res) {
        _.forEach(event.target.parentElement.parentElement.querySelectorAll('li'),function(value){
          value.classList.remove('selected');
        });
        event.target.parentNode.classList.add('selected');
      }).catch(function(err) {
        $this.$common.viewAlertModal('서버와의 통신이 불안정합니다.', $this.$refs, 'alert');
        console.error(err);
        return false;
      });
    },
    clickNps(data, index, event) {
      const $this = this;
      const sendData = {
        subscriptionId: _.parseInt(this.subId),
        feedbackId: _.parseInt(this.feedbackId),
        npsScore: _.parseInt(data),
      };
      Closet.mypageFeedbackNps(sendData).then(function(res) {
        _.forEach(event.target.parentElement.parentElement.querySelectorAll('li'),function(value){
          value.classList.remove('selected');
        });
        event.target.parentNode.classList.add('selected');
      }).catch(function(err) {
        $this.$common.viewAlertModal('서버와의 통신이 불안정합니다.', $this.$refs, 'alert');
        console.error(err);
        return false;
      });
    },
    btnSubmit() {
      const $this = this;
      let flag = false;
      if (this.$refs.reasons.length !== 0) {
        const reasons = this.$refs.reasons;
        _.forEach(reasons, function(data) {
          if (data.style.display === 'block'){
            if (data.querySelector('input').value === '') {
              alert('별로인 이유를 적어주세요.');
              data.querySelector('input').focus();
              flag = true;
            } else {
              const sendData = {
                subscriptionId: _.parseInt($this.subId),
                feedbackId: _.parseInt($this.feedbackId),
                clothType: _.parseInt(data.dataset.clothtype),
                questionCode: _.parseInt(data.dataset.questioncode),
                answerReason: data.querySelector('input').value,
                answerCode: _.parseInt(data.dataset.answercode),
              };
              Closet.mypageFeedbackAnswerReason(sendData).then(function(res) {
                console.log(res);
              }).catch(function(err) {
                console.log(err);
              });
            }
          }
        });
      }
      if (this.type === 'direct'){
        this.$router.push({ path: '/login' });
      }
      if (!flag) {
        this.$common.viewAlertModal('의견 감사합니다.', this.$refs, 'alert');
        this.$refs.review.style.display = 'none';
      }
    },


    clickRating(data, index, string) {
      const $this = this;

      const sendData = {
        subscriptionId: this.subId,
        feedbackId: _.parseInt(this.feedbackId),
        barcode: (data.barcode) ? _.parseInt(data.barcode) : null,
        clothType: _.parseInt(data.cloth_type),
        questionCode: _.parseInt(data.question_code),
        answerCode: _.parseInt(data.answer_code[index]),
      };
      Closet.mypageFeedbackAnswer(sendData).then(function(res) {
      }).catch(function(err) {
        $this.$common.viewAlertModal('서버와의 통신이 불안정합니다.', $this.$refs, 'alert');
        console.error(err);
        return false;
      });
      this.rating = string;
      this.$refs.review.style.display = 'block';
    },
  },
  created() {
    if (this.data.result) {
      this.subId = this.subscriptionId;
      this.feedbackId = this.data.feedback_id;
      this.questionCommon = this.data.question.common;
      this.questionA = this.data.question.A;
      this.questionB = this.data.question.B;
      this.question = this.data.question;
      this.result = this.data.result;
      this.setNPS = this.data.setNPS;
      this.scoreNPS = this.data.nps_score;
    } else {
      this.result = this.data.result;
    }
  },
  mounted() {
    if (this.questionCommon[0].customer_answer === '10001') {
      this.rating = 'love';
    } else if (this.questionCommon[0].customer_answer === '10002') {
      this.rating = 'okay';
    } else if (this.questionCommon[0].customer_answer === '10003') {
      this.rating = 'bad';
    }
  },
};
</script>

<style scoped lang="scss">
  .feedback {
    // 부모의 패딩값 만큼.
    width: 100vw;
    margin-left: -20px;
    margin-bottom: 34px;
    margin-top: 16px;
  }
  .rating {
    text-align: center;
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 14px;
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
        letter-spacing: -0.8px;
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
    border-bottom: 1px solid #333;
    background-color: #f5f5f5;
    padding-bottom: 40px;
    padding-left: 20px;
    padding-right: 20px;
    .txt-review {
      background-color: #797979;
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
      color: #fff;
      line-height: 40px;
      font-size: 15px;
      letter-spacing: -0.9px;
      text-align: center;
      height: 40px;
      position: relative;
      margin-left: -20px;
      width: calc(100% + 40px);
      &::before {
        content: '';
        display: block;
        position: absolute;
        border-bottom: 8px solid #797979;
        border-left: 8px solid transparent;
        border-right: 8px solid transparent;
        top: -8px;
        left: 50%;
        transform: translateX(-50%);
      }
    }
    .section-wrapper {
      background-color: #f5f5f5;
    }
    .section {
    }
    .section-a {
      padding-bottom: 30px;
    }
    .section-b {
      border-top: 1px dashed #a7a7a7;
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
        letter-spacing: -0.9px;
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
      margin-top: 40px;
      button {
        width: 100%;
      }
    }
  }

  @media (min-width: 768px) {
    .feedback {
      margin-left: 0;
      width: auto;
    }
    .rating {
      width: 1200px;
      margin: 0 auto;
      padding-left: 0;
      padding-right: 0;
      padding-top: 14px;
      .inner {
        height: 244px;
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
          letter-spacing: -0.9px;
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
      padding: 0;
      .txt-review {
        line-height: 48px;
        height: 48px;
      }
      .section-wrapper {
        border-bottom: 2px solid #333;
        font-size: 0;
        padding-bottom: 40px;
        position: relative;
      }
      .section {
        padding-left: 0px;
        padding-right: 0px;
        padding-bottom: 0px;
        font-size: 0;
        position: relative;
      }
      .section-left {
        padding-bottom: 0;
        border-bottom: 0 none;
        display: inline-block;
        vertical-align: top;
        width: 50%;
        padding-left: 40px;
        padding-right: 70px;

      }
      .section-right {
        padding-top: 0;
        display: inline-block;
        vertical-align: top;
        width: 50%;
        padding-left: 50px;
        padding-right: 59px;
        &::before {
          position: absolute;
          content: '';
          display: block;
          top: 55px;
          left: 50%;
          transform: translateX(-50%);
          height: calc(100% - 42px - 55px);
          width: 1px;
          background-color: #e9e9e9;
        }
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
          height: 60px;
          letter-spacing: -0.6px;
        }
      }
    }
  }
</style>
