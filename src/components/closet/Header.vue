<template>
  <div class="closet-header">
    <div class="closet-my-info">{{ Authentication.userName }}님 옷장</div>
    <div class="closet-noti-info">
      <div class="closet-noti-card">
        <div class="f16 noti-text">공지사항</div>
        <div class="f16 noti-count noti-count-first">
          <span>0</span> 건
        </div>
      </div>
    <div class="closet-line"></div>
    <!--    <div class="closet-noti-card closet-mobile">
        <div class="f16 noti-text">사용 가능 쿠폰</div>
        <div class="f16 noti-count">
          <span>0</span> 개
        </div>
      </div>-->
      <div class="closet-mobile" style="float: left"></div>
      <div class="closet-noti-card noti-last-card">
        <div class="f16 noti-text noti-last-text" style="width: 56%; display: inline-block;">내일의 옷장 선택</div>
        <div class="f16 noti-text-icon">{{changeMsg}}</div>
        <div class="f16 noti-count">
          <span>{{printDDay(tomorrowCloset.select_dday)}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'closet-header',
  data() {
    return {
      changeMsg: '변경가능',
    };
  },
  computed: mapGetters({
    tomorrowCloset: 'mypage/closet/getTomorrowCloset',
    Authentication: 'login/Authentication',
  }),
  methods: {
    ...mapActions({
      setTomorrowCloset: 'mypage/closet/setTomorrowCloset',
    }),
    printDDay(date) {
      let changeDay = '';
      if (date === 0 || date < 0) {
        changeDay = 'D day';
        this.changeMsg = '변경불가';
      } else {
        changeDay = `D-${date}`;
        this.changeMsg = '변경가능';
      }

      return changeDay;
    },
  },
  async created() {
    await this.setTomorrowCloset();
  },
};
</script>

<style scoped>
.closet-header {
  height: 235px;
  background-color: #7984a1;
}

.f16 {
  font-size: 16px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: -0.4px;
  text-align: left;
  color: #ffffff;
}

.closet-stylist-info {
  padding: 28px 0 0 30px;
  height: 23px;
}

.closet-my-info {
  padding: 30px 0 0 30px;
  line-height: 0.9;
  font-size: 56px;
  font-weight: 300;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: -3px;
  text-align: left;
  color: #ffffff;
}

.closet-line {
  width: 2px;
  height: 100%;
  background-color: #FFFFFF;
  opacity: 0.5;
  display: inline-block;
}

.closet-noti-info {
  margin-top: 30px;
  margin-right: 7px;
  height: 95px;
  float: right;
  box-sizing: border-box;
}

.closet-noti-card {
  display: inline-block;
  vertical-align: top;
  position: relative;
  width: 300px;
  height: 110%;
}

.noti-text {
  font-weight: 500;
  padding-left: 16px;
}

.noti-count {
  position: absolute;
  bottom: 0;
  right: 24px;
}

.noti-count span {
  font-size: 48px;
  font-weight: 200;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: -1.2px;
  text-align: left;
  color: #ffffff;
}

.noti-text-icon {
  border-radius: 10px;
  display: inline-block;
  font-size: 14px;
  border: 1px solid #FFFFFF;
  width: 28%;
  text-align:center;
}

@media screen and (max-width: 486px) {
  .closet-my-info {
    padding: 8% 4.8% 0 3.5% !important;
    font-size: 40px;
  }

  .closet-noti-info {
    padding: 0 4.8%;
  }

  .closet-noti-card {
    width: 45%;
  }

  .closet-mobile {
    display: none;
    float: left;
  }

  .noti-text {
    padding-left: 0;
  }

  .noti-last-text {
    width: 100% !important;
  }

  .noti-text-icon {
    width: fit-content;
    font-size: 12px;
    width: 60px;
    height: 20px;
    line-height: 20px;
    margin-top: 10px;
  }

  .noti-last-card {
    padding-left: 16px;
  }

  .noti-count-first {
    margin-top: 30px;
  }

  .noti-count {
    position: relative;
    bottom: 0;
    right: 0;
  }

  .noti-count span {
    font-size: 30px;
  }

  .closet-line {
    width: 1px !important;
  }
}
</style>
