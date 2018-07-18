<!--TODO: 구조및 스타일 수정할것 2018-06-29 -->
<template>
  <div class="container">
    <p class="txt-main-point">Process</p>
    <div class="line line__default"></div>
    <div class="step">
      <div class="left">
        <div class="step1">
          <div class="image">
            <img src="/static/img/icons/icon_main1.svg" alt="">
          </div>
          <div class="detail">
            <p class="txt-step">STEP 01</p>
            <p class="txt-title">스타일 정보를 입력</p>
            <p class="txt-desc">스타일리스트가 입력정보로<br v-show="$mq === 'lg'"> 어울리는 옷을 제안합니다.</p>
          </div>
        </div>
        <div class="step2">
          <div class="image">
            <img src="/static/img/icons/icon_main2.svg" alt="">
          </div>
          <div class="detail">
            <p class="txt-step">STEP 02</p>
            <p class="txt-title">정해진 날짜에 배송/수거</p>
            <p class="txt-desc">당신이 선택한 옷이 <br v-show="$mq === 'lg'">2주 단위로 배송/수거 됩니다.</p>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="step3">
          <div class="image">
            <img src="/static/img/icons/icon_main3.svg" alt="">
          </div>
          <div class="detail">
            <p class="txt-step">STEP 03</p>
            <p class="txt-title">세탁/보관 걱정 없이 수거</p>
            <p class="txt-desc">2주간 편하게 입고, 문 앞에 두면 끝. <br v-show="$mq === 'lg'">더 입고 싶다면 반납 없이 구매도 가능합니다.</p>
          </div>
        </div>
        <div class="step4">
          <div class="image">
            <img src="/static/img/icons/icon_main4.svg" alt="">
          </div>
          <div class="detail">
            <p class="txt-step">STEP 04</p>
            <p class="txt-title">피드백 전달</p>
            <p class="txt-desc">더 나은 스타일 제안을 위해 의견 주세요. <br v-show="$mq === 'lg'">나를 이해하는 스타일이 제공 됩니다.</p>
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

<style scoped lang="scss">
  .container {
    padding: 31px 20px 6px 20px
  }
  .line {
    position: absolute;
    width: calc(100% - 20px);
    margin-top: 6px;
  }
  .step1,
  .step2,
  .step3,
  .step4 {
    display: flex;
    .image,
    .detail {
      align-self: flex-start;
    }
    .image {
      img {
        width: 100%;
        height: 100%;
        opacity: 0.8;
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
        font-size: 17px;
        letter-spacing: -1px;
        margin: 6px 0;
      }
      .txt-desc {
        font-size: 15px;
        line-height: 23px;
        word-break: keep-all;
      }
    }
  }
  .step1 {
    margin-top: 35px;
    .image {
      margin-left: -3px;
      flex-grow: 0;
      flex-shrink: 0;
      flex-basis: 68px;
    }
    .detail {
      padding-left: 18px;
      .txt-step {
        margin-top: 4px;
      }
      .txt-title {
        font-size: 17px;
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
  .step2 {
    margin-top: 32px;
    .image {
      flex-grow: 0;
      flex-shrink: 0;
      flex-basis: 70px;
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
  .step3 {
    margin-top: 31px;
    .image {
      flex-grow: 0;
      flex-shrink: 0;
      flex-basis: 70px;
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
  .step4 {
    margin-top: 33px;
    .image {
      flex-grow: 0;
      flex-shrink: 0;
      flex-basis: 66px;
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
  @media (min-width: 767px) {
    .container {
      width: 1200px;
      margin: 0 auto;
      display: flex;
      padding: 65px 0 57px;
    }
    .txt-main-point {
      flex-grow: 0;
      flex-shrink: 0;
      flex-basis: 202px;
    }
    .line {
      display: none;
    }
    .step {
      display: flex;
      margin-top: 2px;
      flex: 1;
      .left {
        flex-grow: 1;
        flex-shrink: 0;
        flex-basis: 50%;
        border-right: 1px solid #dadada;
        margin-top: 3px;
      }
      .right {
        flex-grow: 1;
        flex-shrink: 0;
        flex-basis: 50%;
        padding-left: 48px;
      }
    }

    .step1,
    .step2,
    .step3,
    .step4 {
      .detail {
        .txt-step {
          font-size: 14px;
        }
        .txt-title {
          font-size: 22px;
          line-height: 38px;
          letter-spacing: -1.1px;
        }
        .txt-desc {
          font-size: 16px;
          line-height: 24px;
          word-break: keep-all;
          letter-spacing: -0.5px;
        }
      }
    }
    .step1 {
      margin-top: 0;
      .image {
        flex-grow: 0;
        flex-shrink: 0;
        flex-basis: 90px;
        margin-left: -5px;
      }
      .detail {
        padding-left: 34px;
        .txt-step {
          margin-top: 2px;
        }
        .txt-title {
          margin: 2px 0 1px -2px;
        }
      }
    }
    .step2 {
      margin-top: 57px;
      .image {
        flex-basis: 91px;
        margin-left: -6px
      }
      .detail {
        padding-left: 34px;
        .txt-title {
          margin: 2px 0 -1px -1px;
          letter-spacing: -0.6px;
        }
      }
    }
    .step3 {
      margin-top: 0;
      margin-left: 7px;
      .image {
        flex-basis: 89px;
      }
      .detail {
        padding-left: 33px;
        .txt-title {
          margin: 2px 0 1px;
          letter-spacing: -0.6px;
        }
      }
    }
    .step4 {
      margin-top: 59px;
      .image {
        flex-basis: 88px;
      }
      .detail {
        padding-left: 37px;
        .txt-title {
          margin: 2px 0 -1px;
          letter-spacing: -0.6px;
        }
      }
    }
  }
</style>
