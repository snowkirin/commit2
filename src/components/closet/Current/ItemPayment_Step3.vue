<template>
  <div class="step3">
    <div class="complete">
      <div class="txt-complete-title">
        <p>결제가 완료 되었습니다.</p>
      </div>
      <div class="txt-complete-desc">
        <p class="txt-purchase-info">
          고객님께서는
          <span class=" txt-emphasis">{{`${selectedProduct.products[0].name} ${selectedProduct.products.length -1 !== 0 ? '외 ' + (selectedProduct.products.length -1)+'벌': '상품'}`}}</span>{{ selectedProduct.products.length -1 !== 0 ? '을/를' : '을'}} 구매하셨습니다.
          <br/>
          해당 상품은 반납하지 않고 계속 이용 가능합니다.
        </p>
        <p
          v-if="data.result.products.length !== selectedProduct.products.length"
          class="txt-purchase-noti"
        >
          ※ 구매하지 않으신 상품은 돌아오는 배송/수거일에 맞춰 문앞에 걸어주시기 바랍니다.
        </p>
        <p class="txt-purchase-bonus">
          상품 구매 기념으로 <br v-if="$mq === 'sm'"/>
          <span class="txt-point">구독 요금 {{selectedProduct.products.length * selectedProduct.info.sale_rate}}% 할인({{ 78000 * ( (selectedProduct.products.length * selectedProduct.info.sale_rate) / 100) | currency('', 0)}}원) 혜택</span><!--
           -->을 제공해 드렸습니다. <br v-if="$mq !== 'sm'">다음 요금 결제 시 자동 적용됩니다.
        </p>
        <div class="link-subscription">
          <router-link to="/closet/subscribe-info" class="txt-link">구독 정보 보러가기</router-link>
        </div>
      </div>
    </div>
    <div class="button-wrap">
      <button
        type="button"
        class="btn btn-primary h-50"
        @click="complete"
      >확인</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ItemPayment_Step3',
  props: {
    data: Object,
    selectedProduct: Object
  },
  data() {
    return {};
  },
  methods: {
    async complete() {
      // await this.$store.dispatch('subscriptions/CURRENT');
      await this.$emit('init');
      this.$emit('sequence', 'step1');
    }
  }
};
</script>

<style scoped lang="scss">
.complete {
  padding: 0 20px;
  border: 2px solid #e9e9e9;
  margin-bottom: 20px;
  @include tablet {
    padding: 0;
    border: 2px solid #3d3d35;
    margin-bottom: 30px;
  }
}
.txt-complete-title {
  text-align: center;
  padding-top: 30px;
  padding-bottom: 31px;
  border-bottom: 1px solid #e9e9e9;
  @include tablet {
    padding-top: 35px;
    padding-bottom: 38px;
  }
  p {
    @include fontSize(17px);
  }
}
.txt-complete-desc {
  padding-top: 15px;
  padding-bottom: 25px;
  @include tablet {
    background-color: #f7f7f7;
    padding-top: 30px;
    padding-bottom: 30px;
    text-align: center;
  }
  p {
    @include fontSize(14px);
    color: #797979;
  }
  .txt-emphasis {
    color: #3d3d35;
    font-weight: 700;
  }
  .txt-point {
    color: #f45649;
    font-weight: 700;
  }
  .link-subscription {
    text-align: right;
    @include tablet {
      text-align: center;
    }
    .txt-link {
      @include fontSize(14px);
    }
  }
  .txt-purchase-info {
    margin-bottom: 10px;
  }
  .txt-purchase-noti {
    color: #3d3d35;
    margin-bottom: 10px;
  }
  .txt-purchase-bonus {
    margin-bottom: 15px;
    @include tablet {
      margin-bottom: 20px;
    }
  }
}
.button-wrap {
  @include tablet {
    text-align: right;
    button {
      width: 252px;
    }
  }
}
</style>
