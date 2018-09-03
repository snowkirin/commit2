<template>
  <div class="feedback">
    <div
      class="evaluate-wrap"
      v-if="type === 'current' || type === 'direct'"
    >
      <div class="inner-wrap center-align">
        <div>
          <div>
            <p class="txt-how">현재 대여 중인 <strong>의상 사이즈</strong>가 어떠세요?</p>
            <p class="txt-helpful">※ 고객님의 의견은 맞춤형 큰 도움이 됩니다.</p>
          </div>
          <div>
            <ul class="list-rating">
              <li
                :class="{selected : rating === 'love'}"
                @click="clickRating(questionCommon[0], 0, 'love')">
                <div class="image">
                  <GreatIconNomralSVG viewBox="0 0 62 62" v-if="rating !== 'love'"/>
                  <GreatIconActiveSVG viewBox="0 0 62 62" v-else/>
                </div>
                <p class="text">{{ questionCommon[0].answer_text[0] }}</p>
              </li>
              <li
                :class="{selected : rating === 'okay'}"
                @click="clickRating(questionCommon[0], 1, 'okay')">
                <div class="image">
                  <OkayIconNormalSVG viewBox="0 0 62 62" v-if="rating !== 'okay'"/>
                  <OkayIconActiveSVG viewBox="0 0 62 62" v-else/>
                </div>
                <p class="text">{{ questionCommon[0].answer_text[1] }}</p>
              </li>
              <li
                :class="{selected : rating === 'bad'}"
                @click="clickRating(questionCommon[0], 2, 'bad')">
                <div class="image">
                  <TooBadNormalSVG viewBox="0 0 62 62" v-if="rating !== 'bad'"/>
                  <TooBadActiveSVG viewBox="0 0 62 62" v-else/>
                </div>
                <p class="text">{{ questionCommon[0].answer_text[2] }}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div
      class="postscript-wrap"
      ref="postscript"
      style="display: none;"
      v-if="type === 'current' || type === 'direct'"
    >
      <div class="center-align">
        <p class="txt-postscript">소중한 이용 후기 부탁드립니다.</p>
      </div>
    </div>
    <div
      class="review"
      ref="review"
      :style="(type === 'direct') ? 'display:block;': (type === 'past') ? 'display:block' : 'display: none;'"
    >
      <!---->
      <div class="grid-flex">
        <div class="column" v-if="_.isPlainObject(questionA.info)">
          <div class="section">
            <div class="row">
              <div class="text">
                <p class="txt-point">
                  {{ questionCommon[1].question_text }}
                </p>
              </div>
              <div>
                <ul class="list-flex">
                  <li
                    class="item w-25 h-50"
                    :class="{selected:  questionCommon[1].customer_answer === questionCommon[1].answer_code[idx2]}"
                    v-for="(data2, idx2) in questionCommon[1].answer_text"
                    :key="idx2"
                    @click="clickEvt(questionCommon[1], idx2, $event)"
                  >
                    {{ data2 }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="section">
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
                <ul class="list-flex">
                  <li
                    class="item w-25 h-50"
                    v-for="(data2, idx2) in data.answer_text"
                    :key="idx2"
                    :class="[{selected: data.customer_answer === data.answer_code[idx2]}]"
                    @click="clickEvt(data, idx2, $event)">
                    {{ data2 }}
                  </li>
                </ul>
                <div
                  class="text-field"
                  ref="reasons"
                  :style="data.customer_answer === '13003' || data.customer_answer === '14003' ? 'display:block;' : 'display: none;'"
                  v-if="data.question_text === '색상 및 패턴'"
                  :data-questionCode="data.question_code"
                  :data-clothType="data.cloth_type">
                  <input
                    type="text"
                    placeholder="색상, 패턴이 맘에 들지 않은 이유를 적어주세요."
                    :value="data.customer_answer_reason === 'null' ? '' : data.customer_answer_reason"
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="column" v-if="_.isPlainObject(questionB.info)">
          <div class="section">
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
                <ul class="list-flex">
                  <li
                    class="item w-25 h-50"
                    v-for="(data2, idx2) in data.answer_text"
                    :class="[(data['answer_text'].length === 5 && idx2 === 3) ? 'line-break': '', {selected: data.customer_answer === data.answer_code[idx2]}]"
                    :key="idx2"
                    @click="clickEvt(data, idx2, $event)">
                    {{ data2 }}
                  </li>
                </ul>
                <div
                  :style="data.customer_answer && data.customer_answer.indexOf('003') !== -1 ? 'display:block;' : 'display: none;'"
                  class="text-field"
                  v-if="data.question_text === '색상 및 패턴'"
                  ref="reasons"
                  :data-questionCode="data.question_code"
                  :data-clothType="data.cloth_type">
                  <input
                    type="text"
                    placeholder="색상, 패턴이 맘에 들지 않은 이유를 적어주세요."
                    :value="data.customer_answer_reason === 'null' ? '' : data.customer_answer_reason"
                  >
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
                <ul class="list-flex">
                  <li
                    class="item w-20 h-50"
                    v-for="(data, idx) in ['10', '9', '8', '7', '6', '5' , '4', '3', '2', '1']"
                    @click="clickNps(data, idx, $event)"
                    :class="{selected: scoreNPS === parseInt(data)}"
                    :key="idx">
                    {{ data }}
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
          class="btn btn-primary h-56">
          제출 하기
        </button>
      </div>

    </div>
    <alert-modal ref="view" width="300" height="153"></alert-modal>
  </div>
</template>

<script>
import GreatIconNomralSVG from '@/assets/img/closet/ico_feedback1_off.svg?inline';
import GreatIconActiveSVG from '@/assets/img/closet/ico_feedback1_on.svg?inline';
import OkayIconNormalSVG from '@/assets/img/closet/ico_feedback2_off.svg?inline';
import OkayIconActiveSVG from '@/assets/img/closet/ico_feedback2_on.svg?inline';
import TooBadNormalSVG from '@/assets/img/closet/ico_feedback3_off.svg?inline';
import TooBadActiveSVG from '@/assets/img/closet/ico_feedback3_on.svg?inline';

import AlertModal from '@/components/common/AlertModal';
import Closet from '@/library/api/closet';

import VueJsonPretty from 'vue-json-pretty';

export default {
  name: 'feedBack',
  props: {
    data: {
      type: Object
    },
    type: {
      type: String,
      default: 'current'
    },
    subscriptionId: {
      type: Number
    }
  },
  components: {
    GreatIconNomralSVG,
    GreatIconActiveSVG,
    OkayIconNormalSVG,
    OkayIconActiveSVG,
    TooBadNormalSVG,
    TooBadActiveSVG,
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
      scoreNPS: null
    };
  },
  computed: {},
  methods: {
    clickEvt(data, index, event) {
      const sendData = {
        subscriptionId: this.subId,
        feedbackId: _.parseInt(this.feedbackId),
        barcode: data.barcode ? _.parseInt(data.barcode) : null,
        clothType: _.parseInt(data.cloth_type),
        questionCode: _.parseInt(data.question_code),
        answerCode: _.parseInt(data.answer_code[index])
      };
      const textField = event.target.closest('.row').querySelector('.text-field');
      const targetList = event.target.closest('.list-flex');
      if (data.question_text === '색상 및 패턴') {
        if (data.answer_text[index] === '별로') {
          textField.style.display = 'block';
          textField.setAttribute('data-answerCode', data.answer_code[index]);
        } else {
          textField.style.display = 'none';
          textField.querySelector('input').value = '';
        }
      }
      Closet.mypageFeedbackAnswer(sendData)
        .then(() => {
          _.forEach(targetList.querySelectorAll('li'), value => {
            value.classList.remove('selected');
          });
          event.target.classList.add('selected');
        })
        .catch(() => {
          alert('서버와의 통신이 불안정합니다.');
        });
    },
    clickNps(data, index, event) {
      const sendData = {
        subscriptionId: _.parseInt(this.subId),
        feedbackId: _.parseInt(this.feedbackId),
        npsScore: _.parseInt(data)
      };
      const targetList = event.target.closest('.list-flex');
      Closet.mypageFeedbackNps(sendData)
        .then(() => {
          _.forEach(targetList.querySelectorAll('li'), (value) => {
            value.classList.remove('selected');
          });
          event.target.classList.add('selected');
        })
        .catch(() => {
          alert('서버와의 통신이 불안정합니다.');
        });
    },
    clickRating(data, index, string) {
      const sendData = {
        subscriptionId: this.subId,
        feedbackId: _.parseInt(this.feedbackId),
        barcode: data.barcode ? _.parseInt(data.barcode) : null,
        clothType: _.parseInt(data.cloth_type),
        questionCode: _.parseInt(data.question_code),
        answerCode: _.parseInt(data.answer_code[index])
      };
      Closet.mypageFeedbackAnswer(sendData)
        .then(() => {})
        .catch(() => {
          alert('서버와의 통신이 불안정합니다.');
        });
      this.rating = string;
      this.$refs.postscript.style.display = 'block';
      this.$refs.review.style.display = 'block';
    },
    btnSubmit() {
      const $this = this;
      let flag = false;
      if (this.$refs.reasons.length !== 0) {
        const reasons = this.$refs.reasons;
        _.forEach(reasons, function(data) {
          if (data.style.display === 'block') {
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
                answerCode: _.parseInt(data.dataset.answercode)
              };
              Closet.mypageFeedbackAnswerReason(sendData)
                .then(function(res) {
                  console.log(res);
                })
                .catch(function(err) {
                  console.log(err);
                });
            }
          }
        });
      }
      if (this.type === 'direct') {
        this.$router.push({ path: '/login' });
      }
      if (!flag) {
        alert('의견 감사합니다');
        this.$refs.review.style.display = 'none';
      }
    }
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
  }
};
</script>

<style scoped lang="scss">
.feedback {
  // 부모의 패딩값 만큼.
  width: 100%;
}

/* 평가 부분*/
.evaluate-wrap {
  text-align: center;
  margin-bottom: 20px;
  .inner-wrap {
    background: {
      image: url('~@/assets/img/closet/img_feedback.png');
      position: 50% 50%;
      size: cover;
    }
    height: 187px;
    opacity: 0.8;
  }
  .txt-how {
    @include fontSize(16px);
    color: #fff;
    strong {
      font-weight: 700;
    }
  }
  .txt-helpful {
    @include fontSize(12px);
    color: #b8b8b8;
  }

  .list-rating {
    font-size: 0;
    margin-top: 21px;
    li {
      @include fontSize(14px);
      display: inline-block;
      color: #fff;
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
      svg {
        width: 50px;
        height: 50px;
      }
    }
    .text {
      margin-top: 8px;
    }
  }
}

.postscript-wrap {
  position: relative;
  background-color: #bbb;
  height: 40px;
  &::before {
    content: '';
    display: block;
    position: absolute;
    border-bottom: 10px solid #bbb;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    top: -10px;
    left: 50%;
    transform: translateX(-50%);
  }
  .txt-postscript {
    @include fontSize(15px);
    color: #fff;
  }
}

.review {
  border-bottom: 1px solid #333;
  background-color: #f5f5f5;
  padding-bottom: 40px;
  padding-left: 20px;
  padding-right: 20px;
  .text {
    margin-bottom: 12px;
    text-indent: -1px;
  }
  .row {
    .image {
      background-color: #e9e9e9;
      padding-top: 32px;
      padding-bottom: 32px;
      text-align: center;
      img {
        border: 5px solid #fff;
        width: 170px;
      }
    }
  }
  .text-field {
    margin-top: 10px;
  }
  // 기본모양
  .btn-submit {
    margin-top: 40px;
    button {
      width: 100%;
    }
  }
}

@media (min-width: 768px) {
  .evaluate-wrap {
    .inner-wrap {
    }
    .txt-how {
      @include fontSize(20px);
      margin-bottom: 5px;
    }
    .txt-helpful {
      @include fontSize(14px);
    }

    .list-rating {
      margin-top: 24px;
      li {
        @include fontSize(15px);
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

  .feedback {
    margin-left: 0;
    width: auto;
  }
  .rating {
    width: 1200px;
    margin: 0 auto;
    .inner {
      height: 244px;
      padding-top: 52px;
      margin-bottom: 20px;
    }
    .txt-rating {
      @include fontSize(20px);
    }
  }
  .review {
    margin-top: 28px;
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 25px;
    border-bottom: 0 none;
    background-color: #f5f5f5;
    padding: 0;
    .txt-review {
      line-height: 48px;
      height: 48px;
    }
    .section {
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
  .column {
    padding: 20px;
  }
}
</style>
