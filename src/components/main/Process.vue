<template>
  <div class="process">
    <p class="txt-main-point">Process</p>
    <div class="line line__default"></div>
    <div>
      <div class="step step1">
        <div class="image">
          <img src="/static/img/icons/icon_main1.svg" alt="">
        </div>
        <div class="detail">
          <p class="txt-step">STEP 01</p>
          <p class="txt-title">스타일 정보를 입력</p>
          <p class="txt-desc">스타일리스트가 입력정보로 어울리는 옷을 제안합니다.</p>
        </div>
      </div>

      <div class="step step2">
        <div class="image">
          <img src="/static/img/icons/icon_main2.svg" alt="">
        </div>
        <div class="detail">
          <p class="txt-step">STEP 02</p>
          <p class="txt-title">정해진 날짜에 배송/수거</p>
          <p class="txt-desc">당신이 선택한 옷이 2주 단위로 배송/수거 됩니다.</p>
        </div>
      </div>

      <div class="step step3">
        <div class="image">
          <img src="/static/img/icons/icon_main3.svg" alt="">
        </div>
        <div class="detail">
          <p class="txt-step">STEP 03</p>
          <p class="txt-title">세탁/보관 걱정 없이 수거</p>
          <p class="txt-desc">2주간 편하게 입고, 문 앞에 두면 끝. 더 입고 싶다면 반납 없이 구매도 가능합니다.</p>
        </div>
      </div>

      <div class="step step4">
        <div class="image">
          <img src="/static/img/icons/icon_main4.svg" alt="">
        </div>
        <div class="detail">
          <p class="txt-step">STEP 04</p>
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
    padding: 36px 20px 6px 20px
  }
  .line {
    position: absolute;
    width: calc(100% - 20px);
    margin-top: 6px;
  }
  .step {
    display: flex;
    .image,
    .detail {
      align-self: flex-start;
    }
    .image {
      img {
        width: 100%;
        height: 100%;
      }
    }
    .detail {
      .txt-step {
        font-size: 12px;
        color: #b47a3d;
        font-weight: 700;
        font-family: 'Open Sans', '맑은 고딕', 'Malgun Gothic', sans-serif;
      }
      .txt-title {
        font-size: 18px;
      }
      .txt-desc {
        font-size: 15px;
        line-height: 23px;
        word-break: keep-all;
      }
    }
    &.step1 {
      margin-top: 35px;
      .image {
        margin-left: -3px;
        flex: 0 0 68px;
      }
      .detail {
        padding-left: 18px;
        .txt-step {
          margin-top: 4px;
        }
        .txt-title {
          font-size: 18px;
          letter-spacing: -1px;
          margin: 6px 0;
        }
        .txt-desc {
          font-size: 15px;
          line-height: 23px;
          letter-spacing: -.3px;
          word-break: keep-all;
        }
      }
    }
    &.step2 {
      margin-top: 32px;
      .image {
        flex: 0 0 70px;
        margin-left: -4px;
      }
      .detail {
        padding-left: 17px;
        .txt-step {
          margin-top: 4px;
        }
        .txt-title {
          letter-spacing: -.5px;
          margin: {
            top: 6px;
            bottom: 8px;
          }
        }
        .txt-desc {
          letter-spacing: -0.4px;
        }
      }
    }
    &.step3 {
      margin-top: 31px;
      .image {
        flex: 0 0 70px;
        margin-left: -4px;
      }
      .detail {
        padding-left: 17px;
        .txt-step {
          margin-top: 5px;
        }
        .txt-title {
          margin: {
            top: 6px;
            bottom: 8px;
          }
          letter-spacing: -0.5px;
        }
        .txt-desc {
          letter-spacing: -0.4px;
        }
      }
    }
    &.step4 {
      margin-top: 33px;
      .image {
        flex: 0 0 66px;
      }
      .detail {
        padding-left: 17px;
        .txt-step {
          margin-top: 2px;
        }
        .txt-title {
          margin: {
            top: 6px;
            bottom: 6px;
          }
          letter-spacing: -0.5px;
        }
        .txt-desc {
          letter-spacing: -0.4px;
        }
      }
    }
  }
</style>
