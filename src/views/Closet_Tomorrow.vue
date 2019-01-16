<template>
  <div class="contents">
    <CMS/>
    <!-- 데이터가 없다면 -->
    <div v-if="!TomorrowDataExist">
      <NotYet/>
    </div>
    <!-- 데이터가 있다면 -->
    <div v-else>
      <div class="contents-header">
        <h3>데일리룩 후보 중 마음에 드는 의상을 선택해주세요.</h3>
        <p>
          (기한 내 미선택 시, 회원님께 더 어울릴 스타일로 자동 지정 후 배송 됩니다.)
        </p>
      </div>
      <div class="content">
        <Products
          :data="TomorrowData"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import ModalProductDetail from '@/components/common/modal/ModalProductDetail.vue';
import Products from '@/components/closet/Tomorrow/Products.vue';
import CMS from '@/components/closet/Tomorrow/CMS.vue';
export default {
  name: 'Closet_Tomorrow',
  components: {
    NotYet: () => import('@/components/closet/Common/NotYet.vue'),
    ModalProductDetail,
    Products,
    CMS
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      TomorrowData: 'closet/TomorrowData',
      TomorrowDataExist: 'closet/TomorrowDataExist',
      TomorrowDirectState: 'closet/TomorrowDirectState',
      User: 'common/User'
    }),
    isShowButton() {
      // 선택 버튼은 스타일 지정 상태일때만 보여야 한다.
      return this.TomorrowResult.subscription_status === 14403;
    }
  },
  methods: {
    ...mapActions({
      FETCH_TOMORROW_DATA: 'closet/FETCH_TOMORROW_DATA'
    })
  },
  mounted() {
    if (!this.TomorrowDirectState) {
      this.FETCH_TOMORROW_DATA();
    }
    window.mid = this.User.userId;
  },
  destroyed() {
    if (this.TomorrowDirectState) {
      this.$store.commit('closet/RESET_STATE');
    }
  }
};
</script>
<style scoped lang="scss" src="@/assets/css/closet-style.scss">
</style>
