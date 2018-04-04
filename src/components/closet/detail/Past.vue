<template>
  <div class="past mt40">
    <div class="main-point-text closet-title">과거의 옷장</div>
    <div class="closet-title-text mt20">
      그 동안의 옷장을 확인하실 수 있습니다.
    </div>
    <div class="closet-content mt50">
      <template v-for="(past, k) in pastCloset">
        <div v-bind:key="k" class="past-content">
          <div class="content-first-number">
            {{ ( k > 0 ) ? pastCloset.length - 1 : pastCloset.length }}th
            <div class="vertical-line"></div>
            {{ past.subscription_date }}
          </div>
          <div class="content-second mt20">
            <div class="content-second-thumnail">
              <template v-for="(image, j) in past.images">
                <div
                  v-bind:key="j"
                  class="thumnail-image-area"
                >
                  <div
                    class="thumnail-image"
                    v-bind:style="{
                      backgroundImage: `url(${API_IMAGE_URL}${image}`,
                    }"
                  >

                  </div>
                </div>
              </template>
            </div>
            <div class="content-second-text">
              <div class="content-second-title">Styling Tip</div>
              <div class="content-second-tip mt10">
                {{ past.styling_tip }}
              </div>
            </div>
            <div class="content-second-view">
              <div class="content-second-view-cell" @click="viewModal(past.id)" v-show="past.is_sold === 'Y'">
                구매정보 보기
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>

    <custom-modal ref="view" :dataId="dataId" title="" width="500" height="530" modalType="pastView"></custom-modal>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import CustomModal from '@/components/common/CustomModal';

export default {
  name: 'past',
  data() {
    return {
      API_IMAGE_URL: process.env.API_IMAGE_URL,
      dataId: null,
    };
  },
  components: {
    CustomModal,
  },
  computed: {
    ...mapGetters({
      pastCloset: 'mypage/closet/getPastCloset',
    }),
  },
  methods: {
    ...mapActions({
      setPastCloset: 'mypage/closet/setPastCloset',
    }),
    viewModal(id) {
      this.dataId = id.toString();
      this.$refs.view.openModal();
    },
  },
  created() {
    this.setPastCloset();
  },
};
</script>

<style scoped>
.past-content {
  padding: 30px 0;
  border-bottom: solid 2px #e9e9e9;
}

.content-first-number {
  display: flex;
  font-size: 20px;
  font-weight: 600;
  line-height: 1;
  letter-spacing: normal;
  color: #212121;
}

.content-second {
  display: flex;
  justify-content: space-between;
}

.content-second-text {
  width: 69.6%;
  font-size: 18px;
  letter-spacing: -1.2px;
  color: #212121;
}

.content-second-title {
  font-size: 16px;
  font-weight: 600;
}

.content-second-tip {
  line-height: 1.4;
}

.content-second-view {
  width: 11%;
  text-align: right;
}

.content-second-view-cell {
  position: relative;
  top: 50%;
  font-size: 18px;
  color: #566b9c;
  text-decoration: underline;
  letter-spacing: -0.8px;
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
