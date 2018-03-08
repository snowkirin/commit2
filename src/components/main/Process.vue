<template>
  <div class="side-margin-50 mt70">
    <div class="main-process d-flex">
      <div class="main-point-text" style="line-height: 0;">
        PROCESS
      </div>
      <div class="w100 d-flex">
        <div style="width:49%;">
          <div class="d-flex">
            <div class="process-icon">
              <i class="fa fa-file fa-4x"></i>
            </div>
            <div>
              <div class="process-title">1. 나의 정보를 입력</div>
              <div class="process-text mt10">
                당신에게 어울리는 데일리룩 2가지를<br/>
                스타일리스트가 제안합니다.<br/>
                <a href="#">스타일리스트 소개</a>
              </div>
            </div>
          </div>
          <div class="d-flex mt30">
            <div class="process-icon">
              <i class="fa fa-file fa-4x"></i>
            </div>
            <div>
              <div class="process-title">2. 새벽 정기 배송/수거</div>
              <div class="process-text mt10">
                2주간 편하게 입고, 문 앞에 걸어 두면 끝.<br/>
                더 입고 싶다면 반납 없이 구매도 가능합니다.<br/>
                <a href="#">세탁 방법 소개</a>
              </div>
            </div>
          </div>
        </div>
        <div style="width: 2%;">
          <div class="line"></div>
        </div>
        <div class="ml40" style="width:49%;">
          <div class="d-flex">
            <div class="process-icon">
              <i class="fa fa-file fa-4x"></i>
            </div>
            <div>
              <div class="process-title">3. 세탁/보관 문 앞</div>
              <div class="process-text mt10">
                회원님이 잠든 사이 문 앞에서 선택된 스타일의<br/>
                옷이 2주 단위로 새벽 배송/수거 됩니다.<br/>
                <a href="#">지역별 배송 일자</a>
              </div>
            </div>
          </div>
          <div class="d-flex mt30">
            <div class="process-icon">
              <i class="fa fa-file fa-4x"></i>
            </div>
            <div>
              <div class="process-title">4. 피드백 전달</div>
              <div class="process-text mt10">
                나만의 스타일리스트에게<br/>
                좋았던 점, 아쉬운 점을 이야기 해주세요<br/>
                다음 스타일링에 반영합니다.<br/>
                <a href="#">피드백 예시</a>
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
.main-point-text {
  width: 200px;
}

.line {
  width: 1px;
  height: 351px;
  background-color: #dadada;
}

.process-title {
  font-size: 28px;
  font-weight: 520;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.36;
  letter-spacing: -1.3px;
  text-align: left;
  color: #212121;
}

.process-text {
  font-size: 18px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.56;
  letter-spacing: -0.6px;
  text-align: left;
  color: #212121;
}

.process-text a {
  font-weight: 500;
  color: #405a94;
}

.process-icon {
  width: 90px;
}
</style>
