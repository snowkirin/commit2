<template>
  <div class="process-main side-padding-50 mt70">
    <div class="main-process d-flex">
      <div class="main-point-text" style="line-height: 0; position: relative;">
        <span class="en-font" style="padding-top: 7px; position: absolute;">PROCESS</span>
      </div>
      <div class="main-process-info w100 d-flex">
        <div class="mobile-process-line"></div>
        <div class="process-half-area">
          <div class="d-flex process-card">
            <div class="process-icon">
              <div class="firstProcess"></div>
            </div>
            <div class="ml30">
              <div class="en-font step-number">STEP 01</div>
              <div class="process-title">스타일 정보를 입력</div>
              <div class="process-text mt5">
                스타일리스트가 입력정보로<br/>
                어울리는 옷을 제안합니다.<br/>
                <a href="#" class="hide-area">스타일리스트 소개</a>
              </div>
            </div>
          </div>
          <div class="d-flex process-card mt60">
            <div class="process-icon">
              <div class="secondProcess"></div>
            </div>
            <div class="ml30">
              <div class="en-font step-number">STEP 02</div>
              <div class="process-title">정해진 날짜에 배송/수거</div>
              <div class="process-text mt5">
                당신이 선택한 옷이<br/>
                2주 단위로 배송/수거 됩니다.<br/>
                <a href="#" class="hide-area">지역별 배송 일자</a>
              </div>
            </div>
          </div>
        </div>
        <div class="process-line" style="width: 2%;">
          <div class="line"></div>
        </div>
        <div class="process-half-area half-second ml40">
          <div class="d-flex process-card">
            <div class="process-icon">
              <div class="thirdProcess"></div>
            </div>
            <div class="ml30">
              <div class="en-font step-number">STEP 03</div>
              <div class="process-title">세탁/보관 걱정 없이 수거</div>
              <div class="process-text mt5">
                2주간 편하게 입고, 문 앞에 두면 끝.<br/>
                더 입고 싶다면 반납 없이 구매도 가능합니다.<br/>
                <a href="#" class="hide-area">세탁 방법 소개</a>
              </div>
            </div>
          </div>
          <div class="d-flex process-card mt60">
            <div class="process-icon">
              <div class="fourthProcess"></div>
            </div>
            <div class="ml30">
              <div class="en-font step-number">STEP 04</div>
              <div class="process-title">피드백 전달</div>
              <div class="process-text mt5">
                더 나은 스타일 제안을 위해 의견 주세요.<br/>
                나를 이해하는 스타일이 제공 됩니다.<br/>
                <a href="#" class="hide-area">피드백 예시</a>
              </div>

            </div>
          </div>
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

<style scoped>
.process-main {
  width: 1200px;
  margin: auto;
}

.main-point-text {
  width: 200px;
}

.line {
  width: 1px;
  height: 98%;
  background-color: #dadada;
}

.process-half-area {
  position: relative;
  width: 49%;
  bottom: 5px;
}

.process-text {
  line-height: 1.56;
}

.process-text a {
  font-weight: 500;
  color: #405a94;
}

.process-icon {
  width: 90px;
}

.firstProcess {
  background: url('/static/img/icons/icon_main1.svg') no-repeat 37.322% 37.431%;
  width: 89px;
  height: 89px;
  padding-top: 5px;
}

.secondProcess {
  background: url('/static/img/icons/icon_main2.svg') no-repeat 59.166% 37.431%;
  width: 89px;
  height: 89px;
}

.thirdProcess {
  background: url('/static/img/icons/icon_main3.svg') no-repeat 48.299% 37.431%;
  width: 89px;
  height: 89px;
  padding-top: 10px;
}

.fourthProcess {
  background: url('/static/img/icons/icon_main4.svg') no-repeat 70.033% 37.431%;
  width: 89px;
  height: 89px;
  padding-top: 10px;
  padding-left: 3px;
}

@media screen and (max-width: 486px) {
  .mobile-process-line {
    height: 2px;
    background-color: #333333;
    margin-bottom: 30px;
  }

  .firstProcess,
  .secondProcess,
  .fourthProcess {
    width: 68px;
    height: 68px;
  }

  .thirdProcess{
    width: 70px;
    height: 70px;
  }


  span.en-font {
    padding-top: 14px !important;
  }

  .process-icon {
    width: 80px;
    flex: 0 0 80px;
  }
}
</style>
