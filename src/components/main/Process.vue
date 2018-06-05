<template>
  <div class="process">
    <p class="main-point-text">Process</p>
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
    padding: 20px;
  }
  .step {
    display: flex;
    margin-top: 35px;
    .img {
      flex: 0 0 21.43%;
      margin-right: 22px;
      img {
        max-width: 100%;
      }
    }
    .detail {
      .txt-step {
        font-size: 12px;
        color: #b47a3d;
        font-weight: 700;
      }
      .txt-title {
        font-size: 18px;
        letter-spacing: -.5px;
        margin: 10px 0 12px;
      }
      .txt-desc {
        font-size: 15px;
        line-height: 23px;
        letter-spacing: -.5px;
        word-break: keep-all;
      }
    }
  }
/*.process-main {*/
  /*width: 1200px;*/
  /*margin: auto;*/
/*}*/

/*.main-point-text {*/
  /*width: 200px;*/
/*}*/

/*.line {*/
  /*width: 1px;*/
  /*height: 98%;*/
  /*background-color: #dadada;*/
/*}*/

/*.process-half-area {*/
  /*position: relative;*/
  /*width: 49%;*/
  /*bottom: 5px;*/
/*}*/

/*.process-text {*/
  /*line-height: 1.56;*/
/*}*/

/*.process-text a {*/
  /*font-weight: 500;*/
  /*color: #405a94;*/
/*}*/

/*.process-icon {*/
  /*width: 90px;*/
/*}*/

/*.firstProcess {*/
  /*background: url('/static/img/icons/icon_main1.svg') no-repeat 37.322% 37.431%;*/
  /*width: 89px;*/
  /*height: 89px;*/
  /*padding-top: 5px;*/
/*}*/

/*.secondProcess {*/
  /*background: url('/static/img/icons/icon_main2.svg') no-repeat 59.166% 37.431%;*/
  /*width: 89px;*/
  /*height: 89px;*/
/*}*/

/*.thirdProcess {*/
  /*background: url('/static/img/icons/icon_main3.svg') no-repeat 48.299% 37.431%;*/
  /*width: 89px;*/
  /*height: 89px;*/
  /*padding-top: 10px;*/
/*}*/

/*.fourthProcess {*/
  /*background: url('/static/img/icons/icon_main4.svg') no-repeat 70.033% 37.431%;*/
  /*width: 89px;*/
  /*height: 89px;*/
  /*padding-top: 10px;*/
  /*padding-left: 3px;*/
/*}*/

/*@media screen and (max-width: 486px) {*/
  /*.mobile-process-line {*/
    /*height: 2px;*/
    /*background-color: #333333;*/
    /*margin-bottom: 30px;*/
  /*}*/

  /*.firstProcess,*/
  /*.secondProcess,*/
  /*.fourthProcess {*/
    /*width: 68px;*/
    /*height: 68px;*/
  /*}*/

  /*.thirdProcess{*/
    /*width: 70px;*/
    /*height: 70px;*/
  /*}*/


  /*span.en-font {*/
    /*padding-top: 14px !important;*/
  /*}*/

  /*.process-icon {*/
    /*width: 80px;*/
    /*flex: 0 0 80px;*/
  /*}*/
/*}*/
</style>
