<template>
  <div class="cs-view">
    <div class="current-date-area mt30">
      {{ $moment().format("MM.DD ddd") }}
    </div>
    <div class="talk-content-area">
      <div class="talk-area">
        <div class="talk-area-left">
          <div class="admin-icon">
            <div class="admin-icon-logo"></div>
          </div>
          <div class="balloon">
            <div class="balloon-text">
              어떤 부분이 궁금하신가요?<br/>
              <div class="mt10">
                <div class="balloon-square-area" @click="selectInquiries($event, $const.INQUIRIES_SUBSCRIBE)">구독문의</div>
                <div class="balloon-square-area" @click="selectInquiries($event, $const.INQUIRIES_ORDER)">주문문의</div>
                <div class="balloon-square-area" @click="selectInquiries($event, $const.INQUIRIES_DELIVERY)">배송문의</div>
              </div>
              <div style="margin-top: 5px;">
                <div class="balloon-square-area" @click="selectInquiries($event, $const.INQUIRIES_NORMAL)">일반(기타)문의</div>
              </div>
            </div>
          </div>
          <div class="talk-date">{{ $moment().format("A hh:mm") }}</div>
        </div>
      </div>
      <template v-for="(inquiries, k) in newInquiries">
        <div v-bind:key="k" class="talk-area">
          <div v-bind:class="{ 'talk-area-right': (inquiries.type === 'q'), 'talk-area-left': (inquiries.type === 'a') }">
            <div v-show="(inquiries.type === 'a')" class="admin-icon">
              <div class="admin-icon-logo"></div>
            </div>
            <div v-bind:class="{ 'right-balloon': (inquiries.type === 'q'), 'balloon': (inquiries.type === 'a') }">
              <div class="balloon-text">
                {{ inquiries.text }}
              </div>
            </div>
            <div class="talk-date">
              {{ inquiries.regdate }}
            </div>
          </div>
        </div>
      </template>
      <div class="talk-area" v-show="lastAnswer">
        <div class="talk-area-left">
          <div class="admin-icon">
            <div class="admin-icon-logo"></div>
          </div>
          <div class="balloon">
            <div class="balloon-text">
              감사합니다. 질문해주신 내용을 확인 후, 답변드리겠습니다.<br/>
              추가 질문이 있으신가요? <br/>
              <div class="mt10">
                <div class="balloon-square-area" @click="selectLastAnswer('continue')">네, 질문할게요.</div>
                <div class="balloon-square-area" @click="selectLastAnswer('stop')">아니요, 괜찮아요.</div>
              </div>
            </div>
          </div>
          <div class="talk-date">{{ currentTime }}</div>
        </div>
      </div>
    </div>
    <div class="talk-input-box">
      <div class="inputGroup">
        <input type="text" name="message" class="form-login-group mt12" placeholder="문의유형을 먼저 선택해주세요." style="width: 82%;" disabled @keydown="submitEvt($event, sendMessage)" />
        <div style="display: inline-table; width: 2%;"></div>
        <button id="sendMessage" class="button-login" style="width: 15%;" @click="sendMessage">전송</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'csView',
  props: {
    dataId: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      currentTime: this.$moment().format('A hh:mm'),
      lastProc: true,
      lastAnswer: false,
      nextInquiries: false,
    };
  },
  computed: {
    ...mapGetters({
      inquiriesList: 'mypage/inquiries/getInquiriesList',
      newInquiries: 'mypage/inquiries/getNewInquiries',
    }),
  },
  methods: {
    ...mapActions({
      actSelectInquiries: 'mypage/inquiries/selectInquiries',
      actSetNewInquiries: 'mypage/inquiries/setNewInquiries',
      setSaveInquiries: 'mypage/inquiries/setSaveInquiries',
    }),
    async selectLastAnswer(type) {
      if (type === 'continue') {
        this.lastAnswer = false;
        document.querySelector('input[name=message]').disabled = false;
        document.getElementById('sendMessage').disabled = false;
        document.querySelector('input[name=message]').focus();
      } else {
        await this.setSaveInquiries();
        this.$parent.parentRefCall();
      }
    },
    selectInquiries($evt, target) {
      const inquiriesCat = document.querySelector('.balloon-square-active');
      if (inquiriesCat) inquiriesCat.classList.remove('balloon-square-active');
      $evt.target.classList.add('balloon-square-active');
      this.actSelectInquiries(target);

      this.nextInquiries = true;
      const message = document.querySelector('input[name=message]');
      message.placeholder = '질문을 적어주세요.';
      message.disabled = false;
      message.focus();
    },
    sendMessage() {
      if (this.nextInquiries) {
        this.lastProc = true;
        const message = document.querySelector('input[name=message]');
        if (!this.$common.InputDataValidation(message, '문의내용을 입력해주세요.', true)) return;

        this.actSetNewInquiries({
          type: 'q',
          text: message.value,
          regdate: this.$moment().format('A hh:mm'),
        });

        const prevDataLength = this.newInquiries.length;
        message.value = '';
        message.focus();

        setTimeout(() => {
          if (this.lastProc) {
            if (this.newInquiries.length === prevDataLength) {
              this.currentTime = this.$moment().format('A hh:mm');
              this.lastAnswer = true;
              message.disabled = true;
              document.getElementById('sendMessage').disabled = true;
            } else this.lastAnswer = false;
          }
        }, 2000);
      } else alert('문의유형을 먼저 선택해주세요.');
    },
    submitEvt(evt, callback) {
      if (evt.keyCode === 13) callback();
      else this.lastProc = false;
    },
    modalScrollEvt() {
      const modal = document.querySelector('.custom-modal-content');
      modal.scrollTo(0, modal.scrollHeight);
    },
  },
  updated() {
    this.modalScrollEvt();
  },
};
</script>

<style scoped>
.cs-view {
  height: 90%;
}

.talk-content-area {
  height: 94%;
}

.current-date-area {
  text-align: center;
  color: #333333;
  font-size: 16px;
  line-height: 1;
  letter-spacing: -0.5px;
  color: #333333;
}

.talk-input-box {
  bottom: 25px;
  position: absolute;
  width: 94.5%;
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
  padding: 10px 15px;
  font-size: 14px;
  line-height: 1.56;
  letter-spacing: -0.8px;
  color: #333333;
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
  width: 30px;
  height: 10px;
  background-image: url(/static/img/logo/ZULY-BI.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: relative;
  top: 40%;
  left: 15%;
}

.current-date-area {
  text-align: center;
  color: #333333;
  font-size: 16px;
  line-height: 1;
  letter-spacing: -0.5px;
  color: #333333;
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

.balloon-square-area {
  display: inline-block;
  text-align: center;
  width: 160px;
  height: 50px;
  background-color: #ffffff;
  border: solid 1px #e9e9e9;
  font-size: 14px;
  line-height: 50px;
  letter-spacing: -0.5px;
  color: #797979;
  cursor: pointer;
}

.balloon-square-area:hover {
  background-color: #566b9c;
  color: #ffffff;
}

.balloon-square-active {
  background-color: #566b9c;
  color: #ffffff;
}
</style>
