<template>
  <div class="process">
    <p class="main-point-text">Process</p>
    <hr class="zuly-line">
    <div>
      <div class="step step1">
        <div class="img">
          <img src="/static/img/icons/icon_main1.svg" alt="">
        </div>
        <div class="detail">
          <p class="txt-step en-font">STEP 01</p>
          <p class="txt-title">스타일 정보를 입력</p>
          <p class="txt-desc">스타일리스트가 입력정보로 어울리는 옷을 제안합니다.</p>
        </div>
      </div>

      <div class="step step2">
        <div class="img">
          <img src="/static/img/icons/icon_main2.svg" alt="">
        </div>
        <div class="detail">
          <p class="txt-step en-font">STEP 02</p>
          <p class="txt-title">정해진 날짜에 배송/수거</p>
          <p class="txt-desc">당신이 선택한 옷이 2주 단위로 배송/수거 됩니다.</p>
        </div>
      </div>

      <div class="step step3">
        <div class="img">
          <img src="/static/img/icons/icon_main3.svg" alt="">
        </div>
        <div class="detail">
          <p class="txt-step en-font">STEP 03</p>
          <p class="txt-title">세탁/보관 걱정 없이 수거</p>
          <p class="txt-desc">2주간 편하게 입고, 문 앞에 두면 끝. 더 입고 싶다면 반납 없이 구매도 가능합니다.</p>
        </div>
      </div>

      <div class="step step4">
        <div class="img">
          <img src="/static/img/icons/icon_main4.svg" alt="">
        </div>
        <div class="detail">
          <p class="txt-step en-font">STEP 04</p>
          <p class="txt-title">피드백 전달</p>
          <p class="txt-desc">더 나은 스타일 제안을 위해 의견 주세요. 나를 이해하는 스타일이 제공 됩니다.</p>
        </div>
      </div>

    </div>
  </div>


</template>

<script>
export default {
  name: 'process',
};
</script>

<style scoped lang="scss">
  .process {
    /*padding: 20px;*/
    padding: 6.25vw;
  }
  .step {
    display: flex;
    /*margin-top: 35px;*/
    margin-top: 10.9375vw;
    .img {
      flex: 0 0 21.43%;
      /*margin-right: 22px;*/
      margin-right: 6.875vw;
      img {
        max-width: 100%;
      }
    }
    .detail {
      .txt-step {
        /*font-size: 12px;*/
        font-size: 3.75vw;
        color: #b47a3d;
        font-weight: 700;
      }
      .txt-title {
        /*font-size: 18px;*/
        font-size: 5.625vw;
        letter-spacing: -.5px;
        /*margin: 10px 0 12px;*/
        margin: 3.125vw 0 3.75vw;
      }
      .txt-desc {
        /*font-size: 15px;*/
        font-size: 4.6875vw;
        /*line-height: 23px;*/
        line-height: 7.1875vw;
        letter-spacing: -.5px;
        word-break: keep-all;
      }
    }
  }
</style>
