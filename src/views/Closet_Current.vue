<template>
  <div class="contents">
    <!-- 데이터가 존재하지 않는다면 -->
    <div v-if="!CurrentDataExist">
      <NotYet/>
    </div>
    <div v-else>
      <component
        v-if="feedbacksType"
        :is="feedbacksType"
        :feedbackData="CurrentFeedBackData"
      />
      <div v-if="!CurrentFeedBackDirectState">
        <ItemPayment
          :data="CurrentData"
          @init="FETCH_CURRENT_DATA"
        />
        <div class="styling-tip">
          <p class="txt-title"># TODAY'S STYLE TIP</p>
          <p class="txt-desc">{{ CurrentData.result.styling_tip }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Closet_Current',
  data() {
    return {
      feedbacksType: null,
    };
  },
  components: {
    NotYet: () => import('@/components/closet/Common/NotYet.vue'),
    FeedBack: () => import('@/components/closet/feedback/Index'),
    ItemPayment: () => import('@/components/closet/Current/ItemPayment')
  },
  watch: {
    CurrentFeedBackState() {
      this.currentFeedbackType();
    },
    CurrentFeedBackDirectState() {
      this.currentFeedbackType();
    }
  },
  computed: {
    ...mapGetters({
      CurrentData: 'closet/CurrentData',
      CurrentDataExist: 'closet/CurrentDataExist',
      CurrentFeedBackData: 'closet/CurrentFeedBackData',
      CurrentFeedBackState: 'closet/CurrentFeedBackState',
      CurrentFeedBackDirectState: 'closet/CurrentFeedBackDirectState',
      DirectAccessFailure: 'closet/DirectAccessFailure'
    })
  },
  methods: {
    ...mapActions({
      FETCH_CURRENT_DATA: 'closet/FETCH_CURRENT_DATA',
    }),
    currentFeedbackType() {
      if (this.CurrentFeedBackState && !this.CurrentFeedBackDirectState) {
        // CurrentFeedback은 true, isCurrentFeedbacksDirect는 false일 경우
        this.feedbacksType = () =>
          import('@/components/closet/feedback/FeedbackCurrent.vue');
      }
      if (this.CurrentFeedBackState && this.CurrentFeedBackDirectState) {
        // isCurrentFeedbacks 와 isCurrentFeedbacksDirect 둘다 true일때만
        this.feedbacksType = () =>
          import('@/components/closet/feedback/FeedbackDirect.vue');
      }
    }
  },
  created() {
    if (this.DirectAccessFailure.result) {
      console.log('직접접근 실패')
      // alert(this.DirectAccessFailure.message);
    };
    if (!this.CurrentFeedBackDirectState) {
      this.FETCH_CURRENT_DATA();
    }
    this.currentFeedbackType();
  },
  destroyed() {
  }
};
</script>

<style scoped lang="scss" src="@/assets/css/closet-style.scss">
</style>
<style scoped lang="scss">
.styling-tip {
  background-color: #f5f5f5;
  padding: 15px 20px;
  margin-top: 30px;
  @include desktop {
    margin-top: 40px;
  }
  .txt-title {
    @include fontSize(15px, en);
    font-weight: 700;
    margin-bottom: 5px;
    color: #333;
  }
  .txt-desc {
    @include fontSize(14px);
    word-break: keep-all;
  }
}
</style>
