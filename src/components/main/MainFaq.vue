<template>
  <div class="contents">
    <div class="contents-header">
      <h3>FAQ</h3>
      <p>줄라이 서비스에 대해서</p>
    </div>
    <div class="content">
      <div class="row">
        <div class="question-wrap">
          <p class="txt-question">Q.  어떤 종류의 상품을 받게 되나요? 제가 받게 될 상품을 미리 확인할 수 있나요?</p>
          <i class="icon-plus">+</i>
        </div>
        <div class="answer-wrap">
          <p class="txt-answer">현재 서울, 경기도 분당, 하남 지역에 국한하여 서비스를 제공하고 있습니다.</p>
        </div>
      </div>
      <div class="row">
        <div class="question-wrap">
          <p class="txt-question">Q.  어떤 종류의 상품을 받게 되나요? 제가 받게 될 상품을 미리 확인할 수 있나요?</p>
          <i class="icon-plus">+</i>
        </div>
        <div class="answer-wrap">
          <p class="txt-answer">현재 서울, 경기도 분당, 하남 지역에 국한하여 서비스를 제공하고 있습니다.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MainFaq",
  methods: {
  }
};
</script>
<style scoped lang="scss" src="@/assets/css/main-style.scss"></style>
<style scoped lang="scss">
  .content {
    padding: 0 25px;
  }
  .row {
    border: 1px solid #d8d8d8;
    margin-top: 15px;
    &:nth-child(1) {
      margin-top: 0;
    }
  }
  .question-wrap{
    padding: 15px 42px 15px 17px;
    position: relative;
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
    padding: 10px 42px 10px 17px;
    background-color: #f7f7f7;
  }
  .question-wrap {
  }
  .txt-question {
    @include fontSize(15px);
    text-indent: -16px;
    margin-left: 16px;
  }
  .txt-answer {
    @include fontSize(14px);
    color: #797979;
  }

</style>
