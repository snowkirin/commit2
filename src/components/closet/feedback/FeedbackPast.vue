<template>
  <div class="feedback-content" ref="feedbackContent">
    <div class="feedback-answer">
      <div class="grid-flex">
        <div
          class="column column-left"
          :class="{'only-column': feedbackDataResult.isEmptyB}"
        >
          <div class="common-wrap">
            <template
              v-for="(data, idx) in feedbackDataResult.questionCommon"
              v-if="idx === 1">
              <div :key="idx">
                <p class="txt-feedback-title">
                  {{data.question_text}}
                </p>
                <div>
                  <ul class="list-flex">
                    <!-- 초기에 customer_answer 값이 있고 그 값이 현재 렌더링 된 코드의 값과 같다면 -->
                    <li
                      class="item w-25 h-50"
                      v-for="(data2, idx2) in data.answer_text"
                      :class="{'selected': _.has(data, 'customer_answer') && data.answer_code[idx2] === data.customer_answer}"
                      :key="idx2"
                      @click="clickCommonStyle(data, idx2, $event)"
                    >
                      {{data2}}
                    </li>
                  </ul>
                </div>
              </div>

            </template>
          </div>
          <div class="info-wrap">
            <div>
              <p class="txt-feedback-title">A. {{feedbackDataResult.infoA.name}}는 어떠셨나요?</p>
              <div class="product-wrap">
                <div class="image">
                  <img
                    :src="$common.ZulyImage(feedbackDataResult.infoA.image_width)+feedbackDataResult.infoA.image_path"
                    alt="">
                </div>
              </div>
            </div>
          </div>
          <div class="question-wrap">
            <template v-for="(data, idx) in feedbackDataResult.questionA">
              <div class="row" :key="idx">
                <p class="txt-feedback-title">A-{{idx+1}}.{{data.question_text}}</p>
                <div>
                  <ul class="list-flex">
                    <li
                      class="item w-25 h-50"
                      v-for="(data2, idx2) in data.answer_code"
                      :class="{'selected': _.has(data, 'customer_answer') && data2 === data.customer_answer }"
                      :key="idx2"
                      @click="clickItem(data, idx2, $event)"
                    >
                      {{data.answer_text[idx2]}}
                    </li>
                  </ul>
                </div>
                <div
                  class="text-field mt-10"
                  style="display: none;"
                  :style="_.has(data, 'customer_answer') && data.customer_answer.indexOf('003') !== -1 ? 'display:block' : null"
                  v-if="data.question_text === '색상 및 패턴'"
                >
                  <input
                    v-if="_.has(data, 'customer_answer_reason') && data.customer_answer_reason !== 'null'"
                    type="text"
                    v-model="reasonA = data.customer_answer_reason"
                    placeholder="색상, 패턴이 맘에 들지 않은 이유를 적어주세요."
                    :data-active="_.has(data, 'customer_answer_reason') && data.customer_answer.indexOf('003') !== -1 ? 'true' : 'false'"
                    :data-answerCode="_.has(data, 'customer_answer') && data.customer_answer.indexOf('003') !== -1 ? data.customer_answer : ''"
                    :data-clothType="data.cloth_type"
                    :data-barCode="data.barcode"
                    :data-questionCode="data.question_code"
                  >
                  <input
                    v-else
                    type="text"
                    v-model="reasonA"
                    placeholder="색상, 패턴이 맘에 들지 않은 이유를 적어주세요."
                    :data-active="_.has(data, 'customer_answer_reason') && data.customer_answer.indexOf('003') !== -1 ? 'true' : 'false'"
                    :data-answerCode="_.has(data, 'customer_answer') && data.customer_answer.indexOf('003') !== -1 ? data.customer_answer : ''"
                    :data-clothType="data.cloth_type"
                    :data-barCode="data.barcode"
                    :data-questionCode="data.question_code"
                  >
                </div>
              </div>
            </template>
          </div>
          <div class="nps-wrap" v-if="feedbackDataResult.setNPS && feedbackDataResult.isEmptyB">
            <div class="text-nps-wrap">
              <p class="txt-feedback-title">ZULY 서비스를 지인이나 친구에게 추천하실 의향이 있으신가요?</p>
              <p class="txt-nps">(적극 추천하는 것을 10점 만점으로 생각하고 점수를 매겨주세요.)</p>
            </div>
            <ul class="list-flex">
              <li
                class="item w-20 h-50"
                v-for="(data, idx) in ['10', '9', '8', '7', '6', '5' , '4', '3', '2', '1']"
                :class="{'selected': feedbackDataResult.npsScore === _.parseInt(data)}"
                :key="idx"
                @click="clickNPS(data, $event)"
              >
                {{data}}
              </li>
            </ul>
          </div>
        </div>
        <div class="column column-right" v-if="!feedbackDataResult.isEmptyB">
          <!-- 질문 B Info-->
          <div class="info-wrap">
            <div>
              <p class="txt-feedback-title">B. {{feedbackDataResult.infoB.name}}는 어떠셨나요?</p>
              <div class="product-wrap">
                <div class="image">
                  <img
                    :src="$common.ZulyImage(feedbackDataResult.infoB.image_width)+feedbackDataResult.infoB.image_path"
                    alt="">
                </div>
              </div>
            </div>
          </div>
          <div class="question-wrap">
            <template v-for="(data, idx) in feedbackDataResult.questionB">
              <div class="row" :key="idx">
                <p class="txt-feedback-title">B-{{idx+1}}.{{data.question_text}}</p>
                <div>
                  <ul class="list-flex">
                    <li
                      class="item w-25 h-50"
                      v-for="(data2, idx2) in data.answer_code"
                      :class="{'selected': _.has(data, 'customer_answer') && data2 === data.customer_answer }"
                      :key="idx2"
                      @click="clickItem(data, idx2, $event)"
                    >
                      {{data.answer_text[idx2]}}
                    </li>
                  </ul>
                </div>
                <div
                  class="text-field mt-10"
                  style="display: none;"
                  :style="_.has(data, 'customer_answer') && data.customer_answer.indexOf('003') !== -1 ? 'display:block' : null"
                  v-if="data.question_text === '색상 및 패턴'"
                >
                  <input
                    v-if="_.has(data, 'customer_answer_reason') && data.customer_answer_reason !== 'null'"
                    type="text"
                    v-model="reasonB = data.customer_answer_reason"
                    placeholder="색상, 패턴이 맘에 들지 않은 이유를 적어주세요."
                    :data-active="_.has(data, 'customer_answer_reason') && data.customer_answer.indexOf('003') !== -1 ? 'true' : 'false'"
                    :data-answerCode="_.has(data, 'customer_answer') && data.customer_answer.indexOf('003') !== -1 ? data.customer_answer : ''"
                    :data-clothType="data.cloth_type"
                    :data-barCode="data.barcode"
                    :data-questionCode="data.question_code"
                  >
                  <input
                    v-else
                    type="text"
                    v-model="reasonB"
                    placeholder="색상, 패턴이 맘에 들지 않은 이유를 적어주세요."
                    :data-active="_.has(data, 'customer_answer_reason') && data.customer_answer.indexOf('003') !== -1 ? 'true' : 'false'"
                    :data-answerCode="_.has(data, 'customer_answer') && data.customer_answer.indexOf('003') !== -1 ? data.customer_answer : ''"
                    :data-clothType="data.cloth_type"
                    :data-barCode="data.barcode"
                    :data-questionCode="data.question_code"
                  >
                </div>
              </div>
            </template>
          </div>
          <div class="nps-wrap" v-if="feedbackDataResult.setNPS && !feedbackDataResult.isEmptyB">
            <div class="text-nps-wrap">
              <p class="txt-feedback-title">ZULY 서비스를 지인이나 친구에게 추천하실 의향이 있으신가요?</p>
              <p class="txt-nps">(적극 추천하는 것을 10점 만점으로 생각하고 점수를 매겨주세요.)</p>
            </div>
            <ul class="list-flex">
              <li
                class="item w-20 h-50"
                v-for="(data, idx) in ['10', '9', '8', '7', '6', '5' , '4', '3', '2', '1']"
                :class="{'selected': feedbackDataResult.npsScore === _.parseInt(data)}"
                :key="idx"
                @click="clickNPS(data, $event)"
              >
                {{data}}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="button-wrap" v-if="$mq !== 'lg'">
        <button type="button" class="btn btn-primary h-56" @click="clickComplete">제출하기</button>
      </div>
    </div>
    <div class="button-wrap" v-if="$mq === 'lg'">
      <button type="button" class="btn btn-primary h-56" @click="clickComplete">제출하기</button>
    </div>
    <simplert ref="alert" :useRadius="false" :useIcon="false" />
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import Simplert from 'vue2-simplert';

const alertObject = {
  type: 'alert', // 타입
  customClass: 'popup-custom-class', // 커스텀 클래스 네임
  disableOverlayClick: false, // 오버레이 클릭시 닫기 방지
  customCloseBtnText: '확인' // 닫기 버튼 텍스트
};

export default {
  name: 'FeedbackPast',
  props: {
    feedbackData: {}, // FeedbackData
    subscriptionId: {} // SubscriptionId
  },
  data() {
    return {
      feedbackDataResult: {},
      reasonA: '',
      reasonB: ''
    };
  },
  components: {
    Simplert
  },
  methods: {
    ...mapActions({
      postFeedbacksAnswers: 'subscriptions/postFeedbacksAnswers',
      postFeedbacksAnswersReasons: 'subscriptions/postFeedbacksAnswersReasons',
      postFeedbacksNps: 'subscriptions/postFeedbacksNps'
    }),
    clickCommonStyle(data, idx, event) {
      const target =
        event.target.tagName === 'LI'
          ? event.target
          : event.target.closest('li');
      const list = event.target.closest('ul');
      const item = list.querySelectorAll('li');
      const formData = {
        // 모든값은 숫자 타입
        subscriptionId: this.subscriptionId, // N
        feedbackId: this.feedbackDataResult.feedbackId, // N
        barcode: null,
        clothType: data.cloth_type,
        questionCode: data.question_code,
        answerCode: _.parseInt(data.answer_code[idx])
      };
      this.postFeedbacksAnswers(formData).then(res => {
        if (res.data.result) {
          _.forEach(item, value => {
            value.classList.remove('selected');
          });
          target.classList.add('selected');
        } else {
          _.assign(alertObject, {
            message:
              '통신중에 오류가 발생하였습니다. 잠시 후 다시 시도해 주세요.'
          });
          this.$refs.alert.openSimplert(alertObject);
        }
      });
    },
    clickItem(data, idx, event) {
      const target =
        event.target.tagName === 'LI'
          ? event.target
          : event.target.closest('li');
      const list = target.closest('ul');
      const item = list.querySelectorAll('li');

      // Selected 효과 및 값 전송
      if (!target.classList.contains('selected')) {
        const formData = {
          answerCode: _.parseInt(data.answer_code[idx]),
          barcode: data.barcode,
          clothType: data.cloth_type,
          feedbackId: this.feedbackDataResult.feedbackId, // N
          questionCode: data.question_code,
          subscriptionId: this.subscriptionId // N
        };
        // 이값을 보내자.
        this.postFeedbacksAnswers(formData).then(res => {
          if (res.data.result) {
            _.forEach(item, value => {
              value.classList.remove('selected');
            });
            target.classList.add('selected');
            if (data.question_text === '색상 및 패턴') {
              const textField = event.target
                .closest('.row')
                .querySelector('.text-field');
              const _input = textField.querySelector('input');
              if (data.answer_code[idx].indexOf('003') !== -1) {
                textField.style.display = 'block';
                _input.setAttribute('data-answerCode', data.answer_code[idx]);
                _input.setAttribute('data-active', 'true');
                _input.focus();
              } else {
                // False 이면 나중에 제출하기 할때 아무런 반응이 없음
                _input.setAttribute('data-active', 'false');
                textField.style.display = 'none';
              }
            }
          } else {
            _.assign(alertObject, {
              message:
                '통신중에 오류가 발생하였습니다. 잠시 후 다시 시도해 주세요.'
            });
            this.$refs.alert.openSimplert(alertObject);
          }
        })
      }
    },
    clickNPS(data, event) {
      const target =
        event.target.tagName === 'LI'
          ? event.target
          : event.target.closest('li');
      const list = target.closest('ul');
      const item = list.querySelectorAll('li');

      const formData = {
        subscriptionId: this.subscriptionId, // N
        feedbackId: this.feedbackDataResult.feedbackId, // N
        npsScore: data
      };
      // 선택한걸 클릭하지 않았을 경우만 작동한다.
      if (!target.classList.contains('selected')) {
        this.postFeedbacksNps(formData).then(res => {
          if (res.data.result) {
            _.forEach(item, value => {
              value.classList.remove('selected');
            });
            target.classList.add('selected');
          } else {
            _.assign(alertObject, {
              message:
                '통신중에 오류가 발생하였습니다. 잠시 후 다시 시도해 주세요.'
            });
            this.$refs.alert.openSimplert(alertObject);
          }
        });
      }
    },
    clickComplete() {
      const fbContent = this.$refs.feedbackContent;
      const inputs = fbContent.querySelectorAll('input[type="text"]');
      let reasonFlag = true;
      _.forEach(inputs, data => {
        if (data.getAttribute('data-active') === 'true') {
          if (data.value === '') {
            reasonFlag = false;
            _.assign(alertObject, {
              message: '별로인 이유를 적어주세요.'
            });
            this.$refs.alert.openSimplert(alertObject);
            return false;
          } else {
            reasonFlag = true;
            const formData = {
              subscriptionId: this.subscriptionId, // N
              feedbackId: this.feedbackDataResult.feedbackId, // N
              clothType: _.parseInt(data.getAttribute('data-clothType')), // N
              questionCode: _.parseInt(data.getAttribute('data-questionCode')), // N
              answerCode: _.parseInt(data.getAttribute('data-answerCode')), // N
              answerReason: data.value, // S
              barcode: _.parseInt(data.getAttribute('data-barCode')) // N
            };
            // 보내야 할 값
            this.postFeedbacksAnswersReasons(formData);
          }
        }
      });
      if (reasonFlag) {
        const _this = this;
        _.assign(alertObject, {
          message: '소중한 의견 감사드립니다.',
          onClose: function() {
            _this.$emit('hide');
          }
        });
        this.$refs.alert.openSimplert(alertObject);
      }
    },
    processingData(params) {
      let formData = {
        result: params.result,
        feedbackId: params.feedback_id,
        setNPS: params.setNPS,
        npsScore: params.nps_score,
        questionCommon: params.question.common,
        questionA: params.question.A.question,
        infoA: params.question.A.info,
        questionB: params.question.B.question,
        infoB: params.question.B.info
      };
      const checkEmpty = {
        isEmptyA: _.isEmpty(formData.infoA) && _.isEmpty(formData.questionA),
        isEmptyB: _.isEmpty(formData.infoB) && _.isEmpty(formData.questionB)
      };
      _.assign(formData, checkEmpty);
      this.feedbackDataResult = formData;
    }
  },
  async created() {
    await this.processingData(this.feedbackData);
  }
};
</script>

<style scoped lang="scss" src="./feedback-style.scss">
</style>
