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
                <p>줄라이는 현재 78,000원 단일 요금제만 제공해드리고 있습니다.</p>
              </div>
              <div class="explain">
                <p>
                  이는 하기 서비스를 모두 포함한 금액입니다.
                </p>
                <ul>
                  <li>
                    - 월 2회 (1 Set/1회) 의 상하의 코디된 의류 제공
                  </li>
                  <li>
                    - 전문 스타일리스트의 스타일링 서비스 및 제공된 옷의 활용 Tip 제공
                  </li>
                  <li>
                    - 세탁 비용 무료
                  </li>
                  <li>
                    - 배송, 수거 비용 무료
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </li>
        <li class="faq-item">
          <div class="question" @click="toggleFAQ($event)">
            <p class="txt-question">
              <span class="q">Q</span>
              <span class="title">줄라이서비스는 어떤 브랜드들을 제공하나요?</span>
              <span class="icon">
                <i class="fa fa-angle-down"></i>
              </span>
            </p>
          </div>
          <div class="answer">
            <div class="txt-answer">
              <div class="explain">
                <p>
                  패션 전문 소싱 디렉터와 스타일리스트들이 고객의 취향과 스타일 관련 데이터를 수집하여 패션트렌드에 맞는 최상의 제품들을 소싱하고 있습니다. 하나의 아이템 당 20~50만원 선의 검증된 해외브랜드 및 국내신진 디자이너 브랜드를 중심으로 서비스하고 있으며, 지속적으로 새로운 제품들을 업데이트하여 다양한 스타일을 경험 하실 수 있도록 하고 있습니다.
                </p>
              </div>
            </div>
          </div>
        </li>
        <li class="faq-item">
          <div class="question" @click="toggleFAQ($event)">
            <p class="txt-question">
              <span class="q">Q</span>
              <span class="title">어떤 종류의 상품을 받게 되나요? 제가 받게될 상품을 미리 확인할 수있나요?</span>
              <span class="icon">
                <i class="fa fa-angle-down"></i>
              </span>
            </p>
          </div>
          <div class="answer">
            <div class="txt-answer">
              <div class="explain">
                <p>
                  고객님의 가입 정보를 토대로, 배송일 D-3일에 스타일리스트분들이 상하의 코디 옵션 2가지를 보내드립니다. 이때, 코디 사진 및 Tip을 통해 상품을 확인 후, 받으실 상품을 선택 가능합니다.
                </p>
              </div>
            </div>
          </div>
        </li>
        <li class="faq-item">
          <div class="question" @click="toggleFAQ($event)">
            <p class="txt-question">
              <span class="q">Q</span>
              <span class="title">입고 난 상품은 어떻게 반납하나요?</span>
              <span class="icon">
                <i class="fa fa-angle-down"></i>
              </span>
            </p>
          </div>
          <div class="answer">
            <div class="txt-answer">
              <div class="explain">
                <p>입고 난 옷은 세탁 필요 없이, 배송 시 제공되었던 줄라이 슈트케이스에 담아서 현관문 앞에 걸어두시면 저희가 수거와 동시에 다음 상품으로 맞교환해드립니다. 맞교환 일정은 미리 알림톡으로 안내해드립니다.</p>
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
          <div class="answer" style="margin-bottom: 20px;">
            <div class="txt-answer">
              <div class="explain">
                <p>현재 서울, 경기도 분당, 하남 지역에 국한하여 서비스를 제공하고 있습니다. 추후 다른 지역으로도 확대 예정입니다.</p>
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
    /*position: absolute;*/
    width: 100%;
    /*width: calc(100% - 20px);*/
    margin-top: 9px;
    border-width: 2px;
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
      user-select: none;
      &.two-line {
        padding: {
          top: 15px;
          bottom: 15px;
        }
      }
      .txt-question {
        font-size: 17px;
        display: flex;
        letter-spacing: -0.5px;
        line-height: 24px;
        justify-content: space-between;
        word-break: keep-all;
        cursor: pointer;
        .q {
          flex-grow: 0;
          flex-shrink: 0;
          flex-basis: 20px;
        }
        .title {
          flex-grow: 1;
          flex-shrink: 1;
          flex-basis: auto;
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
          line-height: 23px;
          margin-bottom: 5px;
          color: #212121;
          font-size: 15px;
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
  @media (min-width: 768px) {
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
      position: absolute;
    }
    .icon {
      display: block;
      font-size: 39px;
    }
    .txt-main-point {
      flex-grow: 0;
      flex-shrink: 0;
      flex-basis: 202px;
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
            flex-grow: 0;
            flex-shrink: 0;
            flex-basis: 24px;
          }
          .title {
            flex-grow: 1;
            flex-shrink: 1;
            flex-basis: auto;
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
