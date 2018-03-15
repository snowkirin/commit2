<template>
  <div class="faq-main side-padding-50 mt70">
    <div class="main-process d-flex">
      <div class="main-point-text" style="line-height: 0; position: relative;">
        <span class="en-font" style="padding-top: 6px; position: absolute;">FAQ</span>
      </div>
      <div class="w100 faq-card">
        <div class="w100">
          <div class="faq-line"></div>
          <div class="mt70 faq-question" @click="openFAQ">
            Q&nbsp;&nbsp;&nbsp;&nbsp;
            요금제는 어떻게 되나요?
            <div class="faq-question-icon">
              <i class="fa fa-angle-up fa-lg"></i>
            </div>
          </div>
          <div class="mt40 faq-text-line"></div>
          <div class="faq-answer">
            <div class="faq-answer-text">
              <span>ZULY는 현재 78,000원 요금제 단일 상품 입니다.</span><br/>
              - 월 2회 스타일링 된 의류 정기 배송 (1회 배송 의류 리테일가 40만원 기준)<br/>
              - 무료 세탁 서비스<br/>
              - 무료 수거/배송 서비스<br/>
              - 스타일링 TIP 제공으로 구성 되어 있습니다.
            </div>
          </div>
        </div>
        <div class="w100">
          <div class="mt40 faq-question" @click="openFAQ">
            Q&nbsp;&nbsp;&nbsp;&nbsp;
            회원이 되면 어떤 옷을 받는건가요?
            <div class="faq-question-icon">
              <i class="fa fa-angle-down fa-lg"></i>
            </div>
          </div>
          <div class="mt40 faq-text-line"></div>
          <div class="faq-answer">
            <div class="faq-answer-text">
            </div>
          </div>
        </div>
        <div class="w100">
          <div class="mt40 faq-question" @click="openFAQ">
            Q&nbsp;&nbsp;&nbsp;&nbsp;
            이용 중에 옷을 구매하고 싶으면 어떻게 하나요?
            <div class="faq-question-icon">
              <i class="fa fa-angle-down fa-lg"></i>
            </div>
          </div>
          <div class="mt40 faq-text-line"></div>
          <div class="faq-answer">
            <div class="faq-answer-text">
            </div>
          </div>
        </div>
        <div class="w100">
          <div class="mt40 faq-question" @click="openFAQ">
            Q&nbsp;&nbsp;&nbsp;&nbsp;
            배송 및 수거는 어떻게 이뤄지나요?
            <div class="faq-question-icon">
              <i class="fa fa-angle-down fa-lg"></i>
            </div>
          </div>
          <div class="mt40 faq-text-line"></div>
          <div class="faq-answer">
            <div class="faq-answer-text">
            </div>
          </div>
        </div>
        <div class="w100">
          <div class="mt40 faq-question" @click="openFAQ">
            Q&nbsp;&nbsp;&nbsp;&nbsp;
            서비스 지역의 제한은 있나요?
            <div class="faq-question-icon">
              <i class="fa fa-angle-down fa-lg"></i>
            </div>
          </div>
          <div class="mt40 faq-text-line last-line"></div>
          <div class="faq-answer">
            <div class="faq-answer-text">
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
    openFAQ(evt) {
      const obj = evt;
      const answer = obj.target.parentNode.querySelector('.faq-answer');
      const icon = obj.target.querySelector('i');

      if (answer.style.display === 'none' || !answer.style.display) {
        icon.classList.remove('fa-angle-down');
        icon.classList.add('fa-angle-up');
        answer.style.display = 'block';
      } else {
        icon.classList.remove('fa-angle-up');
        icon.classList.add('fa-angle-down');
        answer.style.display = 'none';
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
  background-color: #212121;
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
  height: 188px;
  background-color: #f5f5f5;
  display: none;
}

.faq-answer-text {
  padding: 30px 0 30px 30px;
  line-height: 1.56;
}

.last-line {
  background-color: #FFFFFF;
}
</style>
