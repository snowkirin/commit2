<template>
  <div class="contents">
    <div class="contents-header">
      <h3>FAQ</h3>
      <p>줄라이 서비스에 대해서</p>
    </div>
    <div class="content">
      <div class="faq-list">
        <div
          class="item"
          v-for="(data, idx) in faqData"
          :key="idx"
          data-show="false"
        >
          <div
            class="question-wrap"
            @click="clickQuestion"
          >
            <p class="txt-question">Q. {{ data.title }}</p>
            <i class="icon-plus">+</i>
          </div>
          <div class="answer-wrap">
            <p class="txt-answer">{{ data.content }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MainFaq',
  data() {
    return {
      faqData: [
        {
          title: '요금제는 어떻게 되나요?',
          content: '줄라이는 현재 78,000원 단일 요금제만 제공해드리고 있습니다. \r\n이는 하기 서비스를 모두 포함한 금액입니다\r\n- 월 2회 (1 Set/1회) 의 상하의 코디된 의류 제공\r\n- 전문 스타일리스트의 스타일링 서비스 및 제공된 옷의 활용 Tip 제공\r\n- 세탁 비용 무료\r\n- 배송, 수거 비용 무료'
        },
        {
          title: '줄라이서비스는 어떤 브랜드들을 제공하나요?',
          content: '패션 전문 소싱 디렉터와 스타일리스트들이 고객의 취향과 스타일 관련 데이터를 수집하여 패션트렌드에 맞는 최상의 제품들을 소싱하고 있습니다\r\n검증된 해외브랜드 및 국내신진 디자이너 브랜드를 중심으로 서비스하고 있으며, 지속적으로 새로운 제품들을 업데이트하여 다양한 스타일을 경험 하실 수 있도록 하고 있습니다.'
        },
        {
          title: '어떤 종류의 상품을 받게 되나요? 제가 받게될 상품을 미리 확인할 수있나요?',
          content: '고객님의 가입 정보를 토대로, 배송일 D-3일에 스타일리스트분들이 상하의 코디 옵션 2가지를 보내드립니다\r\n이때, 코디 사진 및 Tip을 통해 상품을 확인 후, 받으실 상품을 선택 가능합니다. '
        },
        {
          title: '입고 난 상품은 어떻게 반납하나요?',
          content: '입고난 옷은 세탁 필요없이, 배송 시 제공되었던 줄라이 수트케이스에 담아서 현관문 앞에 걸어두시면 저희가 수거와 동시에 다음 상품으로 맞교환해드립니다\r\n맞교환 일정은 미리 알림톡으로 안내해드립니다.'
        },
        {
          title: '서비스 지역의 제한은 있나요?',
          content: '현재 서울, 경기도 분당, 하남 지역에 국한하여 서비스를 제공하고 있습니다\r\n추후 다른 지역으로도 확대 예정입니다.'
        },
        {
          title: '사이즈 제한 있나요?',
          content: '줄라이는 보통 55~66반 사이즈 까지의 크기를 취급하고 있습니다.'
        }
      ]
    };
  },
  methods: {
    clickQuestion(event) {
      const item = event.target.className === 'item' ? event.target : event.target.closest('.item')
      if (item.getAttribute('data-show') === 'false') {
        item.setAttribute('data-show', 'true');
      }
      else {
        item.setAttribute('data-show', 'false');
      }
    }
  }
};
</script>
<style scoped lang="scss" src="@/assets/css/main-style.scss"></style>
<style scoped lang="scss">
  .content {
    padding: 0 25px;
  }
  .item {
    border: 1px solid #d8d8d8;
    margin-top: 15px;
    &[data-show="false"] {
      .answer-wrap {
        display: none;
      }
    }
    &[data-show="true"] {
      .answer-wrap {
        display: block;
      }
    }
    &:nth-child(1) {
      margin-top: 0;
    }
  }
  .question-wrap{
    padding: 15px 42px 15px 17px;
    position: relative;
    cursor: pointer;
    user-select: none;
    .icon-plus {
      position: absolute;
      width: 18px;
      height: 18px;
      text-indent: -9999em;
      overflow: hidden;
      right: 16px;
      top: 16px;
      &::before,
      &::after {
        content: '';
        display: block;
        width: 100%;
        height: 1px;
        background-color: #3d3d35;
        transform-origin: 0 0;
        position: absolute;
        left: 50%;
        top: 50%;
      }
      &::before {
        transform: rotate(90deg) translate(-50%, -50%);
      }
      &::after {
        transform: translate(-50%, -50%);
      }
    }
  }
  .answer-wrap {
    display: none;
    padding: 10px 42px 10px 17px;
    background-color: #f7f7f7;
  }
  .txt-question {
    @include fontSize(15px);
    text-indent: -16px;
    margin-left: 16px;
  }
  .txt-answer {
    @include fontSize(14px);
    color: #797979;
  }

</style>
