<template>
  <div class="step3">
    <div class="complete">
      <div class="txt-complete-title">
        <p>결제가 완료 되었습니다.</p>
      </div>
      <div class="txt-complete-desc">
        <p>
          고객님께서는
          {{
          `${selectedProduct[0].product.name}
          ${selectedProduct.length -1 !== 0 ? '외' + (selectedProduct.length -1)+'개': ''}`
          }}을/를 구매하셨습니다. 해당 상품은 반납하지 않고 계속 이용 가능합니다.
        </p>
        <p v-if="productData.length !== selectedProduct.length" style="color: #3d3d35;">
          ※ 구매하지 않으신 상품은 돌아오는 배송/수거일에 맞춰 문앞에 걸어주시기 바랍니다.
        </p>
        <p>
          상품 구매 기념으로 <br/>
          <span class="txt-point">{{'구독 요금 20% 할인(15,600원)'}}</span>
           혜택을 제공해 드렸습니다. 다음 요금 결제 시 자동 적용됩니다.
        </p>
        <div class="link-subscription">
          <a href="" class="txt-link">구독 정보 보러가기</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ItemPayment_Step3',
  props: {
    productData: Array,
    selectedProduct: Array
  },
  data() {
    return {};
  }
};
</script>

<style scoped lang="scss">
.complete {
  padding: 25px 20px;
  border: 2px solid #e9e9e9;
}
.txt-complete-title {
  text-align: center;
  padding-top: 5px;
  padding-bottom: 31px;
  border-bottom: 1px solid #e9e9e9;
  p {
    @include fontSize(17px);
  }
}
.txt-complete-desc {
  padding-top: 15px;
  p {
    @include fontSize(14px);
    color: #797979;
    margin-bottom: 10px;
    &:last-child {
      margin-bottom: 15px;
    }
  }
  .txt-point {
    color: #f45649;
  }
  .link-subscription {
    text-align: right;
    .txt-link {
      @include fontSize(14px);
    }
  }
}
</style>
