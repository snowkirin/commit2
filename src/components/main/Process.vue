<template>
  <div class="process-main side-padding-50 mt70">
    <div class="main-process d-flex">
      <div class="main-point-text" style="line-height: 0; position: relative;">
        <span class="en-font" style="padding-top: 7px; position: absolute;">PROCESS</span>
      </div>
      <div class="main-process-info w100 d-flex">
        <div class="process-half-area">
          <div class="d-flex process-card">
            <div class="process-icon">
              <div class="firstProcess"></div>
            </div>
            <div class="ml30">
              <div class="process-title">1. 스타일 정보를 입력</div>
              <div class="process-text mt10">
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
              <div class="process-title">2. 정해진 날짜에 배송/수거</div>
              <div class="process-text mt10">
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
              <div class="process-title">3. 세탁/보관 걱정 없이 수거</div>
              <div class="process-text mt10">
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
              <div class="process-title">4. 피드백 전달</div>
              <div class="process-text mt10">
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
  width: 1300px;
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
  background: url('/static/img/icons/zuly_icon.png') no-repeat -340px -341px;
  width: 89px;
  height: 89px;
}

.secondProcess {
  background: url('/static/img/icons/zuly_icon.png') no-repeat -539px -341px;
  width: 89px;
  height: 89px;
}

.thirdProcess {
  background: url('/static/img/icons/zuly_icon.png') no-repeat -440px -341px;
  width: 89px;
  height: 89px;
}

.fourthProcess {
  background: url('/static/img/icons/zuly_icon.png') no-repeat -638px -341px;
  width: 89px;
  height: 89px;
}
</style>
