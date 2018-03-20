<template>
  <div class="past-view">
    <div class="past-view-content">
      <div class="image-area">
        IMAGE AREA
      </div>
      <div class="content-area">
        <div class="brand mt10">[지방시]</div>
        <div class="mt10">니트 티셔츠 7258240016</div>
        <div class="price mt20">
          <span class="normal-price">240,000원</span>
          <div class="vertical-line"></div>
          혜택가 168,000원 <span style="color: #f45649;">(20%↓)</span>
        </div>
      </div>
    </div>
    <div class="past-view-content mt20">
      <div class="image-area">
        IMAGE AREA
      </div>
      <div class="content-area">
        <div class="brand mt10">[지방시]</div>
        <div class="mt10">니트 티셔츠 7258240016</div>
        <div class="price mt20">
          <span class="normal-price">240,000원</span>
          <div class="vertical-line"></div>
          혜택가 168,000원 <span style="color: #f45649;">(20%↓)</span>
        </div>
      </div>
    </div>
    <div class="dotted-line" style="margin: 20px 0;"></div>
    <div class="past-view-text">
      <p>주문 수량 : 2</p>
      <p>할인 금액 :  -22,800원</p>
      <p>최종 결제 금액  :  <span>205,200원</span></p>
      <p>결제 수단 신용카드 : [ 현대카드 ] ****-****-****-2335</p>
      <p>결제일 : 2018-03-22 오전 9:13:57</p>
      <p class="past-view-text-print">증빙서류출력</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'pastView',
  props: {
    dataId: {
      type: String,
      default: '',
    },
  },
  methods: {
  },
};
</script>

<style scoped>
.content-area {
  font-size: 18px;
  line-height: 1;
  color: #212121;
  margin-left: 20px;
}

.past-view-content {
  display: flex;
}

.brand {
  font-weight: 600;
}

.price {
  display: flex;
}

.normal-price {
  color: #797979;
}

.past-view-text {
  font-size: 18px;
  line-height: 1;
  color: #212121;
}

.past-view-text p {
  -webkit-margin-before: 0em;
  -webkit-margin-after: 0.5em;
}

.past-view-text span {
  font-weight: 600;
  color: #f45649;
}

.past-view-text-print {
  -webkit-margin-before: 1em !important;
  -webkit-margin-after: 0.5em;
  color: #566b9c;
  text-decoration: underline;
}
</style>
