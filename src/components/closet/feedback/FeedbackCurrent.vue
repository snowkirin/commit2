<template>
  <div class="feedback">
    <div class="feedback-header">
      <div class="inner">
        <div class="text-wrap">
          <p class="txt-how">현재 대여 중인 <strong>의상 사이즈</strong>가 어떠세요?</p>
          <p class="txt-helpful">※ 고객님의 의견은 맞춤형 큰 도움이 됩니다.</p>
        </div>
        <div class="evaluate-wrap">
          <template
            v-for="(data, idx) in data.questionCommon"
            v-if="idx === 0"
          >
            <ul
              class="list-evaluate"
              :key="idx">
              <li
                class="item"
                :class="[
                  calcEvaluateClass(data2),
                  {'selected': _.has(data, 'customer_answer') && data.customer_answer === data2}
                ]"
                v-for="(data2, idx2) in data.answer_code"
                :key="idx2"
                @click="clickCommonStyle(data, idx2, $event)"
              >
                <div class="image"></div>
                <p class="txt-evaluate">
                  {{data.answer_text[idx2]}}
                </p>
              </li>
            </ul>
          </template>
        </div>
      </div>
    </div>
    <div class="feedback-content" ref="feedbackContent" v-show="isAnswer">
      <div class="review-wrap">
        <p class="txt-review">
          소중한 이용 후기 부탁드립니다.
        </p>
      </div>
      <div>
        <div class="feedback-answer">
          <div class="grid-flex">
            <div class="column column-left">
              <div class="common-wrap">
                <template
                  v-for="(data, idx) in data.questionCommon"
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
                  <p class="txt-feedback-title">A. {{data.infoA.name}}는 어떠셨나요?</p>
                  <div class="product-wrap">
                    <div class="image">
                      <img :src="$common.ZulyImage(data.infoA.image_width)+data.infoA.image_path" alt="">
                    </div>
                  </div>
                </div>
              </div>
              <div class="question-wrap">
                <template v-for="(data, idx) in data.questionA">
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
              <div class="nps-wrap" v-if="data.setNPS && data.isEmptyB">
                <div class="text-nps-wrap">
                  <p class="txt-feedback-title">ZULY 서비스를 지인이나 친구에게 추천하실 의향이 있으신가요?</p>
                  <p class="txt-nps">(적극 추천하는 것을 10점 만점으로 생각하고 점수를 매겨주세요.)</p>
                </div>
                <ul class="list-flex">
                  <li
                    class="item w-20 h-50"
                    v-for="(item, idx) in ['10', '9', '8', '7', '6', '5' , '4', '3', '2', '1']"
                    :class="{'selected': data.npsScore === _.parseInt(item)}"
                    :key="idx"
                    @click="clickNPS(item, $event)"
                  >
                    {{item}}
                  </li>
                </ul>
              </div>
            </div>
            <div class="column column-right" v-if="!data.isEmptyB">
              <!-- 질문 B Info-->
              <div class="info-wrap">
                <div>
                  <p class="txt-feedback-title">B. {{data.infoB.name}}는 어떠셨나요?</p>
                  <div class="product-wrap">
                    <div class="image">
                      <img :src="$common.ZulyImage(data.infoB.image_width)+data.infoB.image_path" alt="">
                    </div>
                  </div>
                </div>
              </div>
              <div class="question-wrap">
                <template v-for="(data, idx) in data.questionB">
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
              <div class="nps-wrap" v-if="data.setNPS && !data.isEmptyB">
                <div class="text-nps-wrap">
                  <p class="txt-feedback-title">ZULY 서비스를 지인이나 친구에게 추천하실 의향이 있으신가요?</p>
                  <p class="txt-nps">(적극 추천하는 것을 10점 만점으로 생각하고 점수를 매겨주세요.)</p>
                </div>
                <ul class="list-flex">
                  <li
                    class="item w-20 h-50"
                    v-for="(item, idx) in ['10', '9', '8', '7', '6', '5' , '4', '3', '2', '1']"
                    :class="{'selected': data.npsScore === _.parseInt(item)}"
                    :key="idx"
                    @click="clickNPS(item, $event)"
                  >
                    {{item}}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="button-wrap">
          <button type="button" class="btn btn-primary h-56" @click="clickComplete">제출하기</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'FeedbackCurrent',
  props: {
    feedbackData: {}
  },
  data() {
    return {
      data: {},
      isAnswer: false,
      reasonA: '',
      reasonB: ''
    };
  },
  components: {},
  computed: {
    ...mapGetters({
      CurrentFeedbacks: 'subscriptions/CurrentFeedbacks',
      CurrentResult: 'subscriptions/CurrentResult'
    })
  },
  methods: {
    ...mapActions({
      postFeedbacksAnswers: 'subscriptions/postFeedbacksAnswers',
      postFeedbacksAnswersReasons: 'subscriptions/postFeedbacksAnswersReasons',
      postFeedbacksNps: 'subscriptions/postFeedbacksNps'
    }),

    calcEvaluateClass(data) {
      if (data === '10001') {
        return 'great';
      } else if (data === '10002') {
        return 'okay';
      } else if (data === '10003') {
        return 'too-bad';
      }
    },
    clickCommonStyle(data, idx, event) {
      const target =
        event.target.tagName === 'LI'
          ? event.target
          : event.target.closest('li');
      const list = event.target.closest('ul');
      const item = list.querySelectorAll('li');
      const formData = {
        // 모든값은 숫자 타입
        subscriptionId: this.CurrentResult[0].subscription_id, // N
        feedbackId: this.CurrentFeedbacks.feedback_id, // N
        barcode: null,
        clothType: data.cloth_type,
        questionCode: data.question_code,
        answerCode: _.parseInt(data.answer_code[idx])
      };
      _.forEach(item, value => {
        value.classList.remove('selected');
      });
      target.classList.add('selected');
      this.postFeedbacksAnswers(formData);
      this.isAnswer = true;
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
        _.forEach(item, value => {
          value.classList.remove('selected');
        });
        target.classList.add('selected');

        const formData = {
          // 모든값은 숫자 타입
          subscriptionId: this.CurrentResult[0].subscription_id, // N
          feedbackId: this.CurrentFeedbacks.feedback_id, // N
          barcode: data.barcode,
          clothType: data.cloth_type,
          questionCode: data.question_code,
          answerCode: _.parseInt(data.answer_code[idx])
        };
        // 이값을 보내자.
        this.postFeedbacksAnswers(formData);
      }

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
    },
    clickNPS(data, event) {
      const target =
        event.target.tagName === 'LI'
          ? event.target
          : event.target.closest('li');
      const list = target.closest('ul');
      const item = list.querySelectorAll('li');

      const formData = {
        subscriptionId: this.CurrentResult[0].subscription_id, // N
        feedbackId: this.CurrentFeedbacks.feedback_id, // N
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
            alert('통신오류!');
          }
        });
      }
    },
    clickComplete() {
      const fbContent = this.$refs.feedbackContent;
      const inputs = fbContent.querySelectorAll('input[type="text"');
      _.forEach(inputs, data => {
        if (data.getAttribute('data-active') === 'true') {
          if (data.value === '') {
            alert('값을 입력해 주세요.');
            return false;
          } else {
            const formData = {
              subscriptionId: this.CurrentResult[0].subscription_id, // N
              feedbackId: this.CurrentFeedbacks.feedback_id, // N
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
      alert('소중한 의견 감사드립니다.');
      this.isAnswer = false;
    },
    processingData() {
      const feedbackData = this.feedbackData;
      let formData = {
        result: feedbackData.result,
        feedbackId: feedbackData.feedback_id,
        setNPS: feedbackData.setNPS,
        npsScore: feedbackData.nps_score,
        questionCommon: feedbackData.question.common,
        questionA: feedbackData.question.A.question,
        infoA: feedbackData.question.A.info,
        questionB: feedbackData.question.B.question,
        infoB: feedbackData.question.B.info
      };
      const checkEmpty = {
        isEmptyA: _.isEmpty(formData.infoA) && _.isEmpty(formData.questionA),
        isEmptyB: _.isEmpty(formData.infoB) && _.isEmpty(formData.questionB)
      };
      _.assign(formData, checkEmpty);
      this.data = formData;
    }
  },
  async created() {
    await this.processingData();
  }
};
</script>

<style scoped lang="scss" src="./feedback-style.scss">
</style>
