<!--TODO: 구조및 스타일 수정할것 2018-06-29 -->
<template>
  <div class="container">
    <p class="txt-main-point">FAQ</p>
    <div class="line line__default"></div>
    <div class="row">
      <ul class="faq-list">
        <li class="faq-item">
          <div class="question" @click="toggleFAQ($event)">
            <p class="txt-question">
              <span class="q">Q</span>
              <span class="title">요금제는 어떻게 되나요?</span>
              <span class="icon">
                <i class="fa fa-angle-down"></i>
              </span>
            </p>
          </div>
          <div class="answer">
            <div class="txt-answer">
              <div class="emphasis">
                <p>ZULY는 현재 78,000원 요금제 단일 상품 입니다.</p>
              </div>
              <div class="explain">
                <ul>
                  <li>- 월 2회(2주 단위) 1개의 스타일 2개의 옷</li>
                  <li>- 세탁 비용 무료</li>
                  <li>- 배송, 수거 비용 무료</li>
                  <li>- 전문 스타일리스트의 스타일링 서비스 및 제공된 옷의 활용 Tip 제공</li>
                </ul>
              </div>
            </div>
          </div>
        </li>
        <li class="faq-item">
          <div class="question" @click="toggleFAQ($event)">
            <p class="txt-question">
              <span class="q">Q</span>
              <span class="title">회원이 되면 어떤 옷을 받는건가요?</span>
              <span class="icon">
                <i class="fa fa-angle-down"></i>
              </span>
            </p>
          </div>
          <div class="answer">
            <div class="txt-answer">
              <div class="explain">
                <p>
                  줄라이는 국내외 떠오르는 최고의 신진 디자이너 브랜드들을 엄선하여, 줄라이의 최고의 스타일링 팀이 직접 고른 의상을 회원님에 제공합니다.<br/>
                  1회 제공되는 의류는 30만원 이상의 가격대의 제품으로 구성되어, 한달에 총 60만원대의 옷을 받게 됩니다.<br/>
                  스타일링 된 옷을 회원님께 보내기 전, 회원님이 간편하게 고를 수 있도록 2가지 스타일 후보를 제공합니다.
                </p>
              </div>
            </div>
          </div>
        </li>
        <li class="faq-item">
          <div class="question" @click="toggleFAQ($event)">
            <p class="txt-question">
              <span class="q">Q</span>
              <span class="title">정말 고르지 않아도 나에게 어울리는 옷을 보내주나요?</span>
              <span class="icon">
                <i class="fa fa-angle-down"></i>
              </span>
            </p>
          </div>
          <div class="answer">
            <div class="txt-answer">
              <div class="explain">
                <p>
                  문 앞에 줄라이의 옷이 놓이기 3일 전까지 회원님만의 줄라이 옷장에 추천 스타일이 제공 됩니다.<br/>
                  해당 스타일은 가입 시 제공 된 정보와 구독 된 옷의 피드백을 통해 점점 더 회원님에게 맞춰지게 될 것입니다.
                </p>
              </div>
            </div>
          </div>
        </li>
        <li class="faq-item">
          <div class="question" @click="toggleFAQ($event)">
            <p class="txt-question">
              <span class="q">Q</span>
              <span class="title">옷만 이쁘게 입고 세탁/보관 걱정 없이 문 앞에 두면 되는건가요?</span>
              <span class="icon">
                <i class="fa fa-angle-down"></i>
              </span>
            </p>
          </div>
          <div class="answer">
            <div class="txt-answer">
              <div class="explain">
                <p>줄라이는 정말 세탁/보관/배송 걱정 없이 회원님께서 편하게 입은 옷을 정해진 날 문 앞에 수거 바구니에 담아 두시면 줄라이가 다음번 스타일링 된 옷으로 바꿔 놔드립니다.</p>
              </div>
            </div>
          </div>
        </li>
        <li class="faq-item">
          <div class="question" @click="toggleFAQ($event, 'last')">
            <p class="txt-question">
              <span class="q">Q</span>
              <span class="title">서비스 지역의 제한은 있나요?</span>
              <span class="icon">
                <i class="fa fa-angle-down"></i>
              </span>
            </p>
          </div>
          <div class="answer">
            <div class="txt-answer">
              <div class="explain">
                <p>ZULY는 현재 78,000원 요금제 단일 상품 입니다.</p>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'faq',
  methods: {
    toggleFAQ(e, order) {
      if (e.target.tagName === 'SPAN') {
        const item = e.target.parentNode.parentNode.parentNode;
        const question = item.querySelector('.question');
        const answer = item.querySelector('.answer');
        const icon = question.querySelector('.fa');
        if (answer.style.display === 'none' || !answer.style.display) {
          if (order === 'last') {
            question.style.borderBottomColor = '#dadada';
          }
          icon.classList.remove('fa-angle-down');
          icon.classList.add('fa-angle-up');
          answer.style.display = 'block';
        } else {
          if (order === 'last') {
            question.style.borderBottomColor = '#fff';
          }
          icon.classList.remove('fa-angle-up');
          icon.classList.add('fa-angle-down');
          answer.style.display = 'none';
        }
      } else if (e.target.tagName === 'P') {
        const item = e.target.parentNode.parentNode.parentNode;
        const question = item.querySelector('.question');
        const answer = item.querySelector('.answer');
        const icon = question.querySelector('.fa');
        if (answer.style.display === 'none' || !answer.style.display) {
          if (order === 'last') {
            question.style.borderBottomColor = '#dadada';
          }
          icon.classList.remove('fa-angle-down');
          icon.classList.add('fa-angle-up');
          answer.style.display = 'block';
        } else {
          if (order === 'last') {
            question.style.borderBottomColor = '#fff';
          }
          icon.classList.remove('fa-angle-up');
          icon.classList.add('fa-angle-down');
          answer.style.display = 'none';
        }
      } else if (e.target.tagName === 'I') {
        const item = e.target.parentNode.parentNode.parentNode.parentNode;
        const question = item.querySelector('.question');
        const answer = item.querySelector('.answer');
        const icon = question.querySelector('.fa');
        if (answer.style.display === 'none' || !answer.style.display) {
          if (order === 'last') {
            question.style.borderBottomColor = '#dadada';
          }
          icon.classList.remove('fa-angle-down');
          icon.classList.add('fa-angle-up');
          answer.style.display = 'block';
        } else {
          if (order === 'last') {
            question.style.borderBottomColor = '#fff';
          }
          icon.classList.remove('fa-angle-up');
          icon.classList.add('fa-angle-down');
          answer.style.display = 'none';
        }
      }
    },
  },
};
</script>

<style scoped lang="scss">
  .container {
    padding: 20px 20px 10px 20px;
  }
  .line {
    position: absolute;
    width: calc(100% - 20px);
    margin-top: 9px;
  }
  .row {
    margin-top: 21px;
  }
  .faq-list {
  }
  .icon {
    font-size: 22px;
    align-self: center;
  }
  .faq-item {
    .question {
      position: relative;
      border-bottom: 1px solid #dadada;
      padding: {
        top: 29px;
        bottom: 29px;
      }
      &.two-line {
        padding: {
          top: 15px;
          bottom: 15px;
        }
      }
      .txt-question {
        font-size: 18px;
        display: flex;
        letter-spacing: -0.5px;
        line-height: 24px;
        justify-content: space-between;
        word-break: keep-all;
        cursor: pointer;
        .q {
          flex: 0 0 20px;
        }
        .title {
          flex: 1 1 auto;
        }
      }
    }
    .answer {
      display: none;
      padding: 13px 16px 16px 20px;
      background-color: #f5f5f5;
      .txt-answer {
        word-break: keep-all;
        letter-spacing: -1px;
        .emphasis {
          font-weight: 700;
          line-height: 25px;
          margin-bottom: 5px;
          color: #212121;
        }
        .explain {
          line-height: 23px;
          color: #333;
        }
      }
    }
    &:last-child {
      .question {
        border-bottom-color: #fff;
      }
    }
  }
  @media (min-width: 767px) {
    .container {
      width: 1200px;
      margin: 0 auto;
      display: flex;
      padding: 0 0 35px;
      position: relative;
    }
    .line {
      order: -1;
      left: 203px;
      width: 997px;
    }
    .icon {
      display: block;
      font-size: 39px;
    }
    .txt-main-point {
      flex: 0 0 202px;
    }
    .row {
      margin-top: 42px;
      flex: 1;
    }
    .faq-item {
      .question {
        padding: {
          top: 28px;
          bottom: 29px;
        }
        &.two-line {
          padding: {
            top: 15px;
            bottom: 15px;
          }
        }
        .txt-question {
          font-size: 22px;
          letter-spacing: -0.7px;
          line-height: 38px;
          .q {
            flex: 0 0 24px;
          }
          .title {
            flex: 1 1 auto;
          }
        }
      }
      .answer {
        padding: 23px 30px 26px;
        .txt-answer {
          word-break: keep-all;
          letter-spacing: -0.4px;
          .emphasis {
            font-size: 16px;
            line-height: 28px;
            margin-bottom: 15px;
            color: #333;
          }
          .explain {
            font-size: 16px;
            line-height: 24px;
          }
        }
      }
      &:last-child {
        .question {
          border-bottom-color: #fff;
        }
      }
    }
  }

</style>
