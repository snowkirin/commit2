<template>
  <component :is="feedbackType" :data="feedbackData"></component>
</template>

<script>
import FeedbackCurrent from './FeedbackCurrent';
import FeedbackDirect from './FeedbackDirect';
import FeedbackPast from './FeedbackPast';
export default {
  props: {
    type: {
      // type은 문자열이고, 필수값이다.
      type: String,
      required: true
    },
    data: {},
    subscriptionId: {}
  },
  data() {
    return {
      feedbackData: {}
    }
  },
  computed: {
    feedbackType() {
      if (this.type === 'current') {
        return FeedbackCurrent;
      } else if (this.type === 'current-direct') {
        return FeedbackDirect;
      } else if (this.type === 'past') {
        return FeedbackPast;
      }
    }
  },
  methods: {
    processingData() {
      const feedbackData = this.data;
      console.log(this.data);
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
      this.feedbackData = formData;
    }
  },
  async created() {
    console.log(this.type);
    // TODO: 추후에 MIXIN사용할것!!!!! (2018-09-07)
    await this.processingData();
  }
};
</script>
<style scoped lang="scss">
</style>
