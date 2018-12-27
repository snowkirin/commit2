<template>
  <div>
    <div class="info-wrap">
      <div>
        <p class="txt-feedback-title">
          {{ prefix }}. {{data.info.name}}은 어떠셨나요?
        </p>
        <div class="product-wrap">
          <div class="image">
            <img
              :src="$common.ZulyImage(data.info.image_width)+data.info.image_path"
              @error="$common.IMAGE_NOT_EXIST($event)"
             alt="">
          </div>
        </div>
      </div>
    </div>
    <div class="question-wrap">
      <div class="row" :key="idx" v-for="(item, idx) in data.question">
        <p class="txt-feedback-title">{{ prefix }}-{{idx+1}}.{{item.question_text}}</p>
        <div>
          <ul class="list-flex">
            <li
              class="item w-25 h-50"
              v-for="(item2, idx2) in item.answer_code"
              :class="{'selected': _.has(item, 'customer_answer') && item2 === item.customer_answer }"
              :key="idx2"
              @click="clickItem(item, idx2, $event)"
            >
              {{item.answer_text[idx2]}}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SubscriptionAPI from '@/library/api/subscriptions';

export default {
  name: 'Feedback_Column',
  props: {
    data: {
      type: Object
    },
    feedbackId: {
      type: Number
    },
    subscriptionId: {
      type: Number
    },
    prefix: {
      type: String
    }
  },
  components: {},
  data() {
    return {
      reason: ''
    };
  },
  computed: {},
  methods: {
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
          // 모든값은 숫자 타입
          subscriptionId: this.CurrentFeedbacksDirect.subscription_id, // N
          feedbackId: this.CurrentFeedbacksDirect.feedback_id, // N
          barcode: data.barcode,
          clothType: data.cloth_type,
          questionCode: data.question_code,
          answerCode: _.parseInt(data.answer_code[idx])
        };

        // 이값을 보내자.
        SubscriptionAPI.PostFeedbacksAnswers(formData).then(res => {
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
            this.$dialog.alert(
              '통신중에 오류가 발생하였습니다. 잠시 후 다시 시도해 주세요.',
              this.$common.dialogAlertOptions
            );
          }
        });
      }
    }
  }
};
</script>

<style scoped lang="scss">
.info-wrap {
  .product-wrap {
    background-color: #e9e9e9;
    padding-top: 32px;
    padding-bottom: 32px;
  }
  .image {
    width: 170px;
    border: 5px solid #fff;
    margin: 0 auto;
    img {
      width: 100%;
    }
  }
}
.row {
  margin-top: 35px;
}
.txt-feedback-title {
  @include fontSize(15px);
  font-weight: 700;
  margin-bottom: 10px;
}
</style>
