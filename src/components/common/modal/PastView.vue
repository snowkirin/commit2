<template>
  <div class="past-view">
    <template v-if="pastDetail.products">
      <template  v-for="(detail, k) in pastDetail.products.data">
        <div v-bind:key="k" class="past-view-content">
          <div class="thumnail-image-area">
            <div
              class="thumnail-image"
              v-bind:style="{
                'background-image': `url(${API_IMAGE_URL}${detail.image_path})`,
              }"
            >
            </div>
          </div>
          <div class="content-area">
            <div class="brand mt10">[{{ detail.brand_kor_name }}]</div>
            <div class="mt10">{{ detail.product_name }}</div>
            <div class="price mt20">
              <span class="normal-price">{{ $common.numberWithCommas(detail.used_price) }}원</span>
              <div class="vertical-line"></div>
              혜택가 {{ $common.numberWithCommas(detail.used_price) }}원 <span style="color: #f45649;">({{ detail.discount_rate }}%↓)</span>
            </div>
          </div>
        </div>
      </template>

      <div class="dotted-line" style="margin: 20px 0;"></div>
      <div class="past-view-text">
        <p>주문 수량 : {{ pastDetail.products.count }}</p>
        <p>할인 금액 : {{ $common.numberWithCommas(pastDetail.products.discount_amount) }}원</p>
        <p>최종 결제 금액 : <span>{{ $common.numberWithCommas(pastDetail.products.total_amount) }}원</span></p>
        <!-- p>결제 수단 신용카드 : [ 현대카드 ] ****-****-****-2335</p>
        <p>결제일 : 2018-03-22 오전 9:13:57</p>
        <p class="past-view-text-print">증빙서류출력</p -->
      </div>
    </template>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'pastView',
  data() {
    return {
      API_IMAGE_URL: process.env.API_IMAGE_URL,
    };
  },
  props: {
    dataId: {
      type: String,
      default: '',
    },
  },
  computed: {
    ...mapGetters({
      pastDetail: 'mypage/closet/getPastDetail',
    }),
  },
  methods: {
    ...mapActions({
      pastDetailView: 'mypage/closet/pastDetailView',
    }),
  },
  watch: {
    dataId() {
      this.pastDetailView({ pastId: this.dataId });
    },
  },
};
</script>

<style scoped>
.content-area {
  font-size: 16px;
  line-height: 1;
  color: #333333;
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
  font-size: 16px;
  line-height: 1;
  color: #333333;
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

.thumnail-image-area {
  position: relative;
  display: inline-block;
  width: 89px;
  height: 112px;
  background-color: #f5f5f5;
  border: solid 1px #e9e9e9;
  margin-right: 13px;
}

.thumnail-image {
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%,-50%);
  width: 81px;
  height: 102px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
</style>
