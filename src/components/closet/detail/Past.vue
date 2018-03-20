<template>
  <div class="past mt44">
    <div class="main-point-text closet-title">과거의 옷장</div>
    <div class="closet-title-text mt20">
      그 동안의 과거 옷장을 확인하실 수 있습니다.
    </div>
    <div class="closet-content mt50">
      <div class="past-content">
        <div class="content-first-number">
          7th
          <div class="vertical-line"></div>
          18.03.20
        </div>
        <div class="content-second mt20">
          <div class="content-second-thumnail">
            IMAGE THUMNAIL
          </div>
          <div class="content-second-text">
            <div class="content-second-title">Styling Tip</div>
            <div class="content-second-tip mt10">
              대체로 여성스러운 스타일로 부드럽고 연한 파스텔 색상에 부드러운 디자인선, 유연한 소재나 문양을 선호한다. 실크, 시폰, 저지, 울 크레이프.. 제가 거의 매일 입다시피 해서 지인들은 ‘샌더 셔츠’라 부르기도 해요.
              시스 마잔은 다양한 소재와 색을 활용해 남녀 모두를 위한 코듀로이 셔츠를 선보입니다.
            </div>
          </div>
          <div class="content-second-view">
            <div class="content-second-view-cell" @click="viewModal">
              구매정보 보기
            </div>
          </div>
        </div>
      </div>
      <div class="past-content">
        <div class="content-first-number">
          7th
          <div class="vertical-line"></div>
          18.03.20
        </div>
        <div class="content-second mt20">
          <div class="content-second-thumnail">
            IMAGE THUMNAIL
          </div>
          <div class="content-second-text">
            <div class="content-second-title">Styling Tip</div>
            <div class="content-second-tip mt10">
              대체로 여성스러운 스타일로 부드럽고 연한 파스텔 색상에 부드러운 디자인선, 유연한 소재나 문양을 선호한다. 실크, 시폰, 저지, 울 크레이프.. 제가 거의 매일 입다시피 해서 지인들은 ‘샌더 셔츠’라 부르기도 해요.
              시스 마잔은 다양한 소재와 색을 활용해 남녀 모두를 위한 코듀로이 셔츠를 선보입니다.
            </div>
          </div>
          <div class="content-second-view">
            <div class="content-second-view-cell">
              구매정보 보기
            </div>
          </div>
        </div>
      </div>
      <div class="past-content">
        <div class="content-first-number">
          7th
          <div class="vertical-line"></div>
          18.03.20
        </div>
        <div class="content-second mt20">
          <div class="content-second-thumnail">
            IMAGE THUMNAIL
          </div>
          <div class="content-second-text">
            <div class="content-second-title">Styling Tip</div>
            <div class="content-second-tip mt10">
              대체로 여성스러운 스타일로 부드럽고 연한 파스텔 색상에 부드러운 디자인선, 유연한 소재나 문양을 선호한다. 실크, 시폰, 저지, 울 크레이프.. 제가 거의 매일 입다시피 해서 지인들은 ‘샌더 셔츠’라 부르기도 해요.
              시스 마잔은 다양한 소재와 색을 활용해 남녀 모두를 위한 코듀로이 셔츠를 선보입니다.
            </div>
          </div>
          <div class="content-second-view">
            <div class="content-second-view-cell">
              구매정보 보기
            </div>
          </div>
        </div>
      </div>
    </div>

    <custom-modal ref="view" dataId="view" title="주문번호 12345" width="500" height="530" modalType="pastView"></custom-modal>
  </div>
</template>

<script>
import CustomModal from '@/components/common/CustomModal';

export default {
  name: 'past',
  components: {
    CustomModal,
  },
  methods: {
    viewModal() {
      this.$refs.view.openModal();
    },
  },
};
</script>

<style scoped>
.closet-title-text {
  font-size: 36px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: -3.8px;
  text-align: left;
}

.closet-card-block {
  display: inline-block;
  width: 1.1%;
}

.closet-content {
  border-top: solid 2px #212121;
}

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
</style>
