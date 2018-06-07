<template>
  <div class="faq">
    <div>
      <p class="main-point-text en-font">FAQ</p>
      <hr class="zuly-line">
      <div class="faq-card">
        <div class="w100">
          <div class="faq-question" @click="openFAQ($event)">
            <p class="faq-question-subject">
              <span class="faq-question-q">Q</span>
              <span class="faq-question-text">요금제는 어떻게 되나요?</span>
            </p>
          </div>
          <div class="faq-answer">
            <div class="faq-answer-text">
              <p>
                <strong>줄라이는 현재 78,000원 요금제 단일 상품 입니다.</strong>
              </p>
              <ul>
                <li>- 월 2회(2주 단위) 1개의 스타일 2개의 옷</li>
                <li>- 세탁 비용 무료</li>
                <li>- 배송, 수거 비용 무료</li>
                <li>- 전문 스타일리스트의 스타일링 서비스 및 제공된 옷의 활용 Tip 제공</li>
              </ul>
            </div>
          </div>
        </div>
        <div class="w100">
          <div class="faq-question" @click="openFAQ($event)">
            <p class="faq-question-subject">
              <span class="faq-question-q">Q</span>
              <span class="faq-question-text">회원이 되면 어떤 옷을 받는건가요?</span>
            </p>
          </div>
          <div class="faq-answer">
            <div class="faq-answer-text">
              <p>
                줄라이는 국내외 떠오르는 최고의 신진 디자이너 브랜드들을 엄선하여, 줄라이의 최고의 스타일링 팀이 직접 고른 의상을 회원님에 제공합니다.
                1회 제공되는 의류는 30만원 이상의 가격대의 제품으로 구성되어, 한달에 총 60만원대의 옷을 받게 됩니다.
                스타일링 된 옷을 회원님께 보내기 전, 회원님이 간편하게 고를 수 있도록 2가지 스타일 후보를 제공합니다.
              </p>
            </div>
          </div>
        </div>
        <div class="w100">
          <div class="faq-question" @click="openFAQ($event)">
            <p class="faq-question-subject">
              <span class="faq-question-q">Q</span>
              <span class="faq-question-text">정말 고르지 않아도 나에게 어울리는 옷을 보내주나요?</span>
            </p>
          </div>
          <div class="faq-answer">
            <div class="faq-answer-text">
              <p>
                문 앞에 줄라이의 옷이 놓이기 3일 전까지 회원님만의 줄라이 옷장에 추천 스타일이 제공 됩니다.
                해당 스타일은 가입 시 제공 된 정보와 구독 된 옷의 피드백을 통해 점점 더 회원님에게 맞춰지게 될 것입니다.
              </p>
            </div>
          </div>
        </div>
        <div class="w100">
          <div class="faq-question" @click="openFAQ($event)">
            <p class="faq-question-subject">
              <span class="faq-question-q">Q</span>
              <span class="faq-question-text">옷만 이쁘게 입고 세탁/보관 걱정 없이 문 앞에 두면 되는건가요?</span>
            </p>
          </div>
          <div class="faq-answer">
            <div class="faq-answer-text">
              <p>줄라이는 정말 세탁/보관/배송 걱정 없이 회원님께서 편하게 입은 옷을 정해진 날 문 앞에 수거 바구니에 담아 두시면 줄라이가 다음번 스타일링 된 옷으로 바꿔 놔드립니다.</p>
            </div>
          </div>
        </div>
        <div class="w100">
          <div class="faq-question" @click="openFAQ($event, 'last')">
            <p class="faq-question-subject">
              <span class="faq-question-q">Q</span>
              <span class="faq-question-text">서비스 지역의 제한은 있나요?</span>
              <!--<span class="faq-question-icon" @click="openFAQIcon($event, 'last')">
                <i class="fa fa-angle-down fa-lg"></i>
              </span>-->
            </p>
          </div>
          <div class="faq-answer">
            <div class="faq-answer-text">
              <p>현재 체험단 운영 기간에는 서울 지역에 국한하여 서비스를 제공하고 있습니다.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'faq',
  methods: {
    openFAQ(evt, view) {
      const obj = evt;
      if (obj.target.tagName === 'SPAN') {
        const answer = obj.target.parentNode.parentNode.parentNode.querySelector('.faq-answer');
        if (answer) {
          if (answer.style.display === 'none' || !answer.style.display) {
            answer.style.display = 'block';
            if (view) document.querySelector('.last-line').style.backgroundColor = '#dadada';
          } else {
            answer.style.display = 'none';
            if (view) document.querySelector('.last-line').style.backgroundColor = '#FFFFFF';
          }
        }
      } else if (obj.target.tagName === 'P') {
        const answer = obj.target.parentNode.parentNode.querySelector('.faq-answer');
        if (answer) {
          if (answer.style.display === 'none' || !answer.style.display) {
            answer.style.display = 'block';
            if (view) document.querySelector('.last-line').style.backgroundColor = '#dadada';
          } else {
            answer.style.display = 'none';
            if (view) document.querySelector('.last-line').style.backgroundColor = '#FFFFFF';
          }
        }
      }
    },
  },
};
</script>

<style scoped lang="scss">

  .faq {
    padding: 6.25vw;
  }
  .faq-question-subject {
    /*font-size: 18px;*/
    font-size: 5.625vw;
    display: flex;
    letter-spacing: -0.5px;
    /*padding: 20px 0;*/
    padding: 6.25vw 0;
    position: relative;
    /*line-height: 24px;*/
    line-height: 7.5vw;
    justify-content: space-between;
    &:after {
      position: absolute;
      content: '';
      display: block;
      width: 100%;
      border-bottom: 1px solid #dadada;
      bottom: 0;
      left: 0;
    }
    .faq-question-q {
      flex: 0 0 8.4375vw;
    }
    .faq-question-text {
      flex: 1 1 auto;
    }
    .faq-question-icon {
      align-self: center;
    }
  }

  .faq-answer {
    display: none;
    /*padding: 20px;*/
    padding: 6.25vw;
    background-color: #f5f5f5;
    .faq-answer-text {
      /*line-height: 23px;*/
      line-height: 7.1875vw;
      /*font-size: 15px;*/
      font-size: 4.6875vw;
      letter-spacing: -.6px;
      ul {
        list-style: none;
        padding: 0;
      }
      .faq-answer-text-title {
        /*line-height: 25px;*/
        line-height: 7.8125vw;
      }
    }
  }
</style>
