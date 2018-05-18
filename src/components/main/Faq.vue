<template>
  <div class="faq-main side-padding-50 mt70">
    <div class="main-process d-flex">
      <div class="main-point-text" style="line-height: 0; position: relative;">
        <span class="en-font" style="padding-top: 6px; position: absolute;">FAQ</span>
      </div>
      <div class="w100 faq-card">
        <div class="w100">
          <div class="faq-line"></div>
          <div class="mt70 faq-question" @click="openFAQ($event)">
            <div class="faq-question-subject">Q&nbsp;&nbsp;&nbsp;&nbsp;요금제는 어떻게 되나요?</div>
            <div class="faq-question-icon" @click="openFAQIcon($event)">
              <i class="fa fa-angle-down fa-lg"></i>
            </div>
          </div>
          <div class="mt40 faq-text-line"></div>
          <div class="faq-answer">
            <div class="faq-answer-text">
              <span>줄라이는 현재 78,000원 요금제 단일 상품 입니다.</span><br/>
              - 월 2회(2주 단위) 1개의 스타일 2개의 옷<br/>
              - 세탁 비용 무료<br/>
              - 배송, 수거 비용 무료<br/>
              - 전문 스타일리스트의 스타일링 서비스 및 제공된 옷의 활용 Tip 제공
            </div>
          </div>
        </div>
        <div class="w100">
          <div class="mt40 faq-question" @click="openFAQ($event)">
            <div class="faq-question-subject">Q&nbsp;&nbsp;&nbsp;&nbsp;회원이 되면 어떤 옷을 받는건가요?</div>
            <div class="faq-question-icon" @click="openFAQIcon($event)">
              <i class="fa fa-angle-down fa-lg"></i>
            </div>
          </div>
          <div class="mt40 faq-text-line"></div>
          <div class="faq-answer">
            <div class="faq-answer-text">
              줄라이는 국내외 떠오르는 최고의 신진 디자이너 브랜드들을 엄선하여, 줄라이의 최고의 스타일링 팀이 직접 고른 의상을 회원님에 제공합니다.<br/>
              1회 제공되는 의류는 30만원 이상의 가격대의 제품으로 구성되어, 한달에 총 60만원대의 옷을 받게 됩니다.<br/>
              스타일링 된 옷을 회원님께 보내기 전, 회원님이 간편하게 고를 수 있도록 2가지 스타일 후보를 제공합니다.
            </div>
          </div>
        </div>
        <div class="w100">
          <div class="mt40 faq-question" @click="openFAQ($event)">
            <div class="faq-question-subject">Q&nbsp;&nbsp;&nbsp;&nbsp;정말 고르지 않아도 나에게 어울리는 옷을 보내주나요?</div>
            <div class="faq-question-icon" @click="openFAQIcon($event)">
              <i class="fa fa-angle-down fa-lg"></i>
            </div>
          </div>
          <div class="mt40 faq-text-line"></div>
          <div class="faq-answer">
            <div class="faq-answer-text">
              문 앞에 줄라이의 옷이 놓이기 3일 전까지 회원님만의 줄라이 옷장에 추천 스타일이 제공 됩니다. <br/>
              해당 스타일은 가입 시 제공 된 정보와 구독 된 옷의 피드백을 통해 점점 더 회원님에게 맞춰지게 될 것입니다.
            </div>
          </div>
        </div>
        <div class="w100">
          <div class="mt40 faq-question" @click="openFAQ($event)">
            <div class="faq-question-subject">Q&nbsp;&nbsp;&nbsp;&nbsp;옷만 이쁘게 입고 세탁/보관 걱정 없이 문 앞에 두면 되는건가요?</div>
            <div class="faq-question-icon" @click="openFAQIcon($event)">
              <i class="fa fa-angle-down fa-lg"></i>
            </div>
          </div>
          <div class="mt40 faq-text-line"></div>
          <div class="faq-answer">
            <div class="faq-answer-text">
              줄라이는 정말 세탁/보관/배송 걱정 없이 회원님께서 편하게 입은 옷을 정해진 날 문 앞에 수거 바구니에 담아 두시면 줄라이가 다음번 스타일링 된 옷으로 바꿔 놔드립니다.
            </div>
          </div>
        </div>
        <div class="w100">
          <div class="mt40 faq-question" @click="openFAQ($event, 'last')">
            <div class="faq-question-subject">Q&nbsp;&nbsp;&nbsp;&nbsp;서비스 지역의 제한은 있나요?</div>
            <div class="faq-question-icon" @click="openFAQIcon($event, 'last')">
              <i class="fa fa-angle-down fa-lg"></i>
            </div>
          </div>
          <div class="mt40 faq-text-line last-line"></div>
          <div class="faq-answer">
            <div class="faq-answer-text">
              현재 체험단 운영 기간에는 서울 지역에 국한하여 서비스를 제공하고 있습니다.
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
      const answer = obj.target.parentNode.parentNode.querySelector('.faq-answer');
      const icon = obj.target.parentNode.querySelector('i');

      if (answer) {
        if (answer.style.display === 'none' || !answer.style.display) {
          icon.classList.remove('fa-angle-down');
          icon.classList.add('fa-angle-up');
          answer.style.display = 'block';

          if (view) document.querySelector('.last-line').style.backgroundColor = '#dadada';
        } else {
          icon.classList.remove('fa-angle-up');
          icon.classList.add('fa-angle-down');
          answer.style.display = 'none';

          if (view) document.querySelector('.last-line').style.backgroundColor = '#FFFFFF';
        }
      }
    },
    openFAQIcon(evt, view) {
      const obj = evt;
      const answer = obj.target.parentNode.parentNode.parentNode.querySelector('.faq-answer');
      const icon = obj.target;

      if (answer) {
        if (answer.style.display === 'none' || !answer.style.display) {
          icon.classList.remove('fa-angle-down');
          icon.classList.add('fa-angle-up');
          answer.style.display = 'block';

          if (view) document.querySelector('.last-line').style.backgroundColor = '#dadada';
        } else {
          icon.classList.remove('fa-angle-up');
          icon.classList.add('fa-angle-down');
          answer.style.display = 'none';

          if (view) document.querySelector('.last-line').style.backgroundColor = '#FFFFFF';
        }
      }
    },
  },
};
</script>

<style scoped>
.faq-main {
  width: 1300px;
  margin: auto;
}

.main-point-text {
  width: 200px;
}

.faq-line {
  height: 2px;
  background-color: #333333;
}

.faq-text-line {
  height: 1px;
  background-color: #dadada;
}

.faq-question {
  display: block;
  cursor: pointer;
}

.faq-question-icon {
  float: right;
}

.faq-answer {
  background-color: #f5f5f5;
  display: none;
}

.faq-answer-text {
  padding: 30px 30px 30px 30px;
  line-height: 1.56;
}

.last-line {
  background-color: #FFFFFF;
}

.faq-question-subject {
  display: inline-block;
  width: 85%;
}

.mobile-process-line {
  height: 2px;
  background-color: #333333;
  margin-bottom: 42px;
}

.firstProcess,
.secondProcess,
.thirdProcess,
.fourthProcess {
  background-size: 900px 900px;
  height: 89px;
}

@media screen and (max-width: 486px) {
  .faq-question {
    margin-top: 32px !important;
  }

  span.en-font {
    padding-top: 13px !important;
  }

  .faq-answer-text {
    padding: 20px !important;
    font-size: 14px !important;
  }

  .mt40 {
    margin-top: 30px !important;
  }
}
</style>
