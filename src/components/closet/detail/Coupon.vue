<template>
  <div class="notice mt40">
    <div class="main-point-text closet-title">쿠폰 등록/내역</div>
    <div class="closet-title-text mt20">
      쿠폰 번호를 입력하세요.
    </div>
    <div class="security-input">
      <div class="inputGroup">
        <input type="text" name="coupon" class="form-login-group mt12" placeholder="쿠폰번호" style="width: 33%;" />
        <div style="display: inline-table; width: 1%;"></div>
        <button class="button-login" style="width: 10%;">등록</button>
      </div>
    </div>
    <div class="closet-content mt50">
      <div class="notice-content">
        <div class="notice-rows notice-header">
          <div class="notice-number">쿠폰종류</div>
          <div class="notice-subject">쿠폰명</div>
          <div class="notice-regdate">사용 가능 기간</div>
        </div>
        <div class="notice-rows">
          <div class="notice-number">
            <div class="coupon-square mauto">
              <div class="coupon-text">3%</div>
              <div class="coupon-label-back">
                <div class="coupon-label">ZULY</div>
              </div>
            </div>
          </div>
          <div class="notice-subject">
            2
          </div>
          <div class="notice-regdate">
            3
          </div>
        </div>
        <div class="notice-rows">
          <div class="notice-number">
            <div class="coupon-square mauto">
              <div class="coupon-text">30%</div>
              <div class="coupon-label-back">
                <div class="coupon-label">ZULY</div>
              </div>
            </div>
          </div>
          <div class="notice-subject">
            2
          </div>
          <div class="notice-regdate">
            3
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'coupon',
  computed: {
    ...mapGetters({
      noticeList: 'mypage/notice/getNoticeList',
    }),
  },
  methods: {
    ...mapActions({
      setNoticeList: 'mypage/notice/setNoticeList',
    }),
    noticeView(id) {
      const noticeContent = document.querySelector(`[data-id="${id}"]`);

      if (noticeContent.style.display === 'none' || noticeContent.style.display === '') noticeContent.style.display = 'block';
      else noticeContent.style.display = 'none';
    },
  },
  created() {
    this.setNoticeList();
  },
};
</script>

<style scoped>
.notice {
  display: inline-block;
  width: 100%;
}

.notice-rows {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: -0.4px;
  color: #212121;
  border-bottom: solid 2px #e9e9e9;
}

.notice-header {
  height: 40px;
  line-height: 40px;
  font-weight: 600;
}

.notice-content {
  height: 60px;
  line-height: 60px;
}

.notice-number {
  width: 10%;
  text-align: center;
}

.notice-subject {
  width: 80%;
}

.notice-regdate {
  width: 10%;
  text-align: center;
}

.no-data {
  justify-content: center;
}

.new-content {
  font-size: 14px;
  font-weight: 600;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: normal;
  color: #f45649;
}

.notice-rows-data {
  display: none;
  background-color: #f5f5f5;
  padding: 22px 30px;
  line-height: 1;
}

.coupon-square {
  display: flex !important;
  position: relative;
  width: 85px;
  height: 40px;
  border-radius: 3px;
  background-color: #ffffff;
  border: solid 1px #212121;
  display: inline-block;
  vertical-align: middle;
  font-size: 16px;
  font-weight: 600;
}

.coupon-text {
  display: inline-block;
  line-height: 40px;
  width: 75%;
}

.coupon-label-back {
  display: inline-block;
  position: relative;
  width: 25%;
  background-color: #797979;
}

.coupon-label {
  position: absolute;
  top: -41.3%;
  left: 2.5%;
  width: 21px;
  font-size: 14px;
  color: #FFFFFF;
  font-weight: normal;
  -webkit-transform: rotate(-270deg);
  -moz-transform: rotate(-270deg);
  -ms-transform: rotate(-270deg);
  -o-transform: rotate(-270deg);
  filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=3);
}

@media screen and (max-width: 486px) {
  .notice {
    width: fit-content !important;
  }

  .notice-number {
    width: 15% !important;
  }

  .notice-subject {
    width: 60% !important;
  }

  .notice-regdate {
    width: 25% !important;
  }
}
</style>
