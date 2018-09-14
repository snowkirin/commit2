<template>
  <div class="contents">
    <div class="contents-header">
      <h3>FAQ</h3>
      <p>줄라이 서비스에 대해서</p>
    </div>
    <div class="content">
      <div>
        <div class="grid-flex list-faq">
          <div
            class="column"
            v-for="(data, idx) in FaqMainListResult"
            :key="idx"
          >
            <div
              class="item"
              data-show="false"
            >
              <div
                class="question-wrap"
                @click="clickQuestion"
              >
                <p class="txt-question">Q. {{ data.title }}</p>
                <i class="icon-plus">+</i>
              </div>
              <div class="answer-wrap">
                <p class="txt-answer">{{ data.content }}</p>
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

export default {
  name: 'MainFaq',
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      FaqMainListResult: 'faq/FaqMainListResult'
    })
  },
  methods: {
    ...mapActions({
      getFaqMain: 'faq/getFaqMain'
    }),
    clickQuestion(event) {
      const item =
        event.target.className === 'item'
          ? event.target
          : event.target.closest('.item');
      if (item.getAttribute('data-show') === 'false') {
        item.setAttribute('data-show', 'true');
      } else {
        item.setAttribute('data-show', 'false');
      }
    }
  },
  async created() {
    if (this.FaqMainListResult.length === 0) {
      const formData = {
        id: '113,122,112,114,111,120'
      };
      this.getFaqMain(formData);
    }
  }
};
</script>
<style scoped lang="scss" src="@/assets/css/main-style.scss">
</style>
<style scoped lang="scss">
.content {
}
.list-faq {
  .column {
    margin-top: 15px;
    &:nth-child(1) {
      margin-top: 0;
    }
  }
  .item {
    border: 1px solid #d8d8d8;
    &[data-show='false'] {
      .answer-wrap {
        display: none;
      }
    }
    &[data-show='true'] {
      .answer-wrap {
        display: block;
      }
    }
    &:nth-child(1) {
      margin-top: 0;
    }
  }
  .question-wrap {
    padding: 15px 42px 15px 17px;
    position: relative;
    cursor: pointer;
    user-select: none;
    .icon-plus {
      position: absolute;
      width: 18px;
      height: 18px;
      text-indent: -9999em;
      overflow: hidden;
      right: 16px;
      top: 16px;
      &::before,
      &::after {
        content: '';
        display: block;
        width: 100%;
        height: 1px;
        background-color: #3d3d35;
        transform-origin: 0 0;
        position: absolute;
        left: 50%;
        top: 50%;
      }
      &::before {
        transform: rotate(90deg) translate(-50%, -50%);
      }
      &::after {
        transform: translate(-50%, -50%);
      }
    }
  }
  .answer-wrap {
    display: none;
    padding: 10px 15px;
    background-color: #f7f7f7;
  }
  .txt-question {
    @include fontSize(15px);
    text-indent: -16px;
    margin-left: 16px;
  }
  .txt-answer {
    @include fontSize(14px);
    color: #797979;
    white-space: pre-wrap;
  }
}
@media (min-width: 768px) {
  .list-faq {
    .column {
      flex-basis: calc(50% - (27px / 2));
      &:nth-child(even) {
        margin-left: 27px;
      }
      &:nth-child(2) {
        margin-top: 0;
      }
    }
  }
}
@media (min-width: 1280px) {
  .list-faq {
    width: 1030px;
    margin: 0 auto;
    .column {
      flex-basis: calc(33.333% - (55px / 3));
      &:nth-child(1) {
      }
      &:nth-child(2) {
        margin-left: 27.5px;
      }
      &:nth-child(3) {
        margin-left: 27.5px;
        margin-top: 0;
      }
      &:nth-child(4) {
        margin-left: 0;
      }
      &:nth-child(5) {
        margin-left: 27.5px;
      }
      &:nth-child(6) {
        margin-left: 27.5px;
      }
    }
  }
}
</style>
