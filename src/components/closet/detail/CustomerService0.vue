<template>
  <div class="customer-service mt44">
    <div class="main-point-text closet-title">문의 신청 / 내역</div>
    <div class="closet-title-text mt20">
      고객님의 소중한 의견으로<br/>
      한 뼘 더 자라는 ZULY가 되겠습니다.
    </div>
    <div class="customer-service-content mt50">
      <div class="cs-left-area">
        <div class="cs-left-top">
          <div class="cs-left-title">나의 문의내역</div>
          <div class="cs-left-btn">
            <button class="button-login" @click="viewModal">문의하기</button>
          </div>
        </div>
        <div class="greyLine"></div>
        <div class="cs-left-content scroll">
          <template v-for="(inquiries, k) in inquiriesList">
            <div v-bind:key="k" class="cs-left-data">
              <div class="cs-left-data-title">
                <div class="subject">{{ inquiries.subject }}</div>
                <div class="date">
                  {{ inquiries.inserted.substring(2, 10) }}
                </div>
              </div>
              <div class="cs-left-data-text">
              </div>
            </div>
          </template>
        </div>
      </div>
      <div class="cs-right-area">
        <div class="cs-left-title" style="color: #797979;">이전 문의내역을 선택하시거나 새로운 1:1 채팅문의를 시작해 주세요.</div>
        <div class="greyLine"></div>
        <div class="current-date-area mt30">03.20 화</div>
        <div class="talk-content scroll">
          <div class="talk-area">
            <div class="talk-area-left">
              <div class="admin-icon">
                <div class="admin-icon-logo"></div>
              </div>
              <div class="balloon">
                <div class="balloon-text">
                  접수하신 문의내용을 확인중입니다.<br/>
                  상담사가 확인 후 답변 드리겠습니다.
                </div>
                <div class="balloon-bottom">
                  답변시 알림메세지 전송, 고객센터 > <br/>
                  1:1채팅문의 > 나의 문의내역에서 답변 확인
                </div>
              </div>
              <div class="talk-date">오전 10:40</div>
            </div>
          </div>
          <div class="talk-area">
            <div class="talk-area-right">
              <div class="right-balloon">
                <div class="balloon-text">asdfasdfasdfasdfasdfasdfasdf</div>
              </div>
              <div class="talk-date">오전 10:40</div>
            </div>
          </div>
          <div class="talk-area">
            <div class="talk-area-left">
              <div class="admin-icon">
                <div class="admin-icon-logo"></div>
              </div>
              <div class="balloon">
                <div class="balloon-text">
                  접수하신 문의내용을 확인중입니다.<br/>
                  상담사가 확인 후 답변 드리겠습니다.
                </div>
                <div class="balloon-bottom">
                  답변시 알림메세지 전송, 고객센터 > <br/>
                  1:1채팅문의 > 나의 문의내역에서 답변 확인
                </div>
              </div>
              <div class="talk-date">오전 10:40</div>
            </div>
          </div>
          <div class="talk-area">
            <div class="talk-area-left">
              <div class="admin-icon">
                <div class="admin-icon-logo"></div>
              </div>
              <div class="balloon">
                <div class="balloon-text">
                  접수하신 문의내용을 확인중입니다.<br/>
                  상담사가 확인 후 답변 드리겠습니다.
                </div>
                <div class="balloon-bottom">
                  답변시 알림메세지 전송, 고객센터 > <br/>
                  1:1채팅문의 > 나의 문의내역에서 답변 확인
                </div>
              </div>
              <div class="talk-date">오전 10:40</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <custom-modal ref="view" dataId="view" title="문의하기" width="796" height="530" modalType="csView"></custom-modal>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import CustomModal from '@/components/common/CustomModal';

export default {
  name: 'customerService',
  components: {
    CustomModal,
  },
  computed: {
    ...mapGetters({
      inquiriesList: 'mypage/inquiries/getInquiriesList',
    }),
  },
  methods: {
    ...mapActions({
      setInquiriesList: 'mypage/inquiries/setInquiriesList',
    }),
    viewModal() {
      this.$refs.view.openModal();
    },
  },
  created() {
    this.setInquiriesList();
  },
};
</script>

<style scoped>
.greyLine {
  margin-top: 24px;
}

.customer-service {
  padding-bottom: 410px;
}

.customer-service-content {
  display: flex;
  height: 700px;
  border: solid 2px #e9e9e9;
}

.cs-left-area {
  width: 32.6%;
  padding: 0 30px;
}

.cs-right-area {
  width: 67.4%;
  padding-left: 20px;
  padding-right: 33px;
}

.cs-left-block {
  width: 22.7%;
}

.cs-left-top > div {
  display: inline-block;
}

.cs-left-btn {
  float: right;
  padding-top: 17px;
  width: 45.9%;
  height: 50px;
}

.cs-left-title {
  padding-top: 30px;
  font-size: 18px;
  font-weight: 600;
  line-height: 2;
  letter-spacing: -0.5px;
  color: #212121;
}

.cs-left-content {
  height: 84.5%;
  overflow-y: scroll;
}

.cs-left-data {
  width: 100%;
  margin-top: 30px;
  display: inline-block;
  border-bottom: 1px solid #d3d3d3;
}

.cs-left-data-title > .subject {
  display: inline-block;
  font-size: 18px;
  line-height: 1;
  letter-spacing: -0.5px;
  color: #212121;
}

.cs-left-data-title > .date {
  display: inline-block;
  float: right;
  font-size: 16px;
  line-height: 1;
  letter-spacing: -0.4px;
  color: #797979;
}

.cs-left-data-text {
  width: 80%;
  margin: 20px 0 40px 0;
}

.cs-right-area {
 background-color: #f5f5f5;
}

.balloon {
  display: inline-block;
  position: relative;
  background: #FFFFFF;
  width: auto;
  height: auto;
  padding: 0px;
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  border-radius: 4px;
  margin-left: 7px;
  vertical-align: top;
  box-shadow: 0 1px 1px 0 rgba(0,0,0,0.2);
  border-top-left-radius: 0;
}

.balloon-text {
  padding: 20px 20px;
  font-size: 18px;
  line-height: 1.56;
  letter-spacing: -0.5px;
  color: #212121;
}

.balloon-bottom {
  border-top-color: rgba(0,0,0,0.1);
  padding: 20px 20px;
  background-color: #f5f5f5;
  font-size: 16px;
  line-height: 1.63;
  letter-spacing: -0.4px;
  color: #797979;
}

.balloon:before {
  content: '';
  position: absolute;
  top: 2px;
  left: -8px;
  border: 8px solid transparent;
  border-top-color: rgba(0,0,0,0.1);
  border-right-width: 0;
}

.balloon:after {
  content: '';
  position: absolute;
  top: 0px;
  left: -8px;
  border: 8px solid transparent;
  border-top-color: #ffffff;
  border-right-width: 0;
}

.right-balloon {
  background: #566b9c;
  display: inline-block;
  position: relative;
  width: auto;
  height: auto;
  padding: 0px;
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  border-radius: 4px;
  margin-left: 7px;
  vertical-align: top;
  box-shadow: 0 1px 1px 0 rgba(0,0,0,0.2);
  border-top-left-radius: 0;
}

.right-balloon:before {
  content: '';
  position: absolute;
  top: 2px;
  right: -6px;
  border: 8px solid transparent;
  border-top-color: rgba(0,0,0,0.1);
  border-left-width: 0;
}

.right-balloon:after {
  content: '';
  position: absolute;
  top: 0px;
  right: -6px;
  border: 8px solid transparent;
  border-top-color: #566b9c;
  border-left-width: 0;
}

.admin-icon {
  display: inline-block;
  border-radius: 50%;
  border: 2px solid;
  height: 43px;
  width: 43px;
}

.admin-icon-logo {
  width: 35px;
  height: 10px;
  background-image: url(/static/img/logo/ZULY-BI.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: relative;
  top: 40%;
  left: 10%;
}

.current-date-area {
  text-align: center;
  color: #212121;
  font-size: 18px;
  line-height: 1;
  letter-spacing: -0.5px;
  color: #212121;
}

.talk-area-right {
  width: 98%;
  display: flex;
  -webkit-flex-direction: row-reverse;
  -ms-flex-direction: row-reverse;
  flex-direction: row-reverse;
  -webkit-align-items: flex-start;
  -webkit-box-align: flex-start;
  -ms-flex-align: flex-start;
  align-items: flex-start;
}

.talk-area-right > .talk-date {
  display: flex;
  align-self: flex-end;
}

.right-balloon > .balloon-text {
  color: #FFFFFF;
}

.talk-content {
  height: 76%;
  overflow-y: scroll;
  overflow-x: hidden;
}

.talk-area {
  margin-top: 20px;
}

.talk-date {
  display: inline-block;
  vertical-align: bottom;
  font-size: 14px;
  line-height: 1;
  color: #797979;
  letter-spacing: -0.4px;
}
</style>
