<template>
  <div class="closet-header">
    <p class="user">
      <span class="name">{{ Authentication.userName }}</span>님 옷장
    </p>
    <div class="info">
      <!--공지사항-->
      <div class="notice">
        <p class="title">공지사항</p>
        <p style="letter-spacing: 2px;">
          <span class="txt-number en-font">0</span>
          건
        </p>
      </div>
      <!--내일의 옷장 선택 -->
      <div class="tomorrow-closet">
        <p class="title">내일의 옷장 선택</p>
        <div class="txt-change">
          <span>{{ changeMsg }}</span>
        </div>
        <p>
          <span class="txt-number en-font">{{ printDDay(tomorrowCloset.select_dday) }}</span>
        </p>
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

<style scoped lang="scss">
  .closet-header {
    background-color: #be7979;
    color: #fff;
    padding: 23px 18px 24px;
    /*padding: 6.25vw;*/
    font-weight: 300;
  }
  .user {
    font-size: 32px;
    /*font-size: 10vw;*/
    letter-spacing: -2.2px;
    line-height: 40px;
    .name {
      color: #fff;
    }
  }
  .info {
    display: flex;
    margin-top: 27px;
    /*margin-top: 8.4375vw;*/
    /*height: 80px;*/
    /*height: 25vw;*/
    .notice,
    .tomorrow-closet {
      width: 50%;
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .notice {
      font-size: 16px;
      /*font-size: 5vw;*/
      &:after {
        content: '';
        display: block;
        width: 2px;
        height: 100%;
        background-color: rgba(255,255,255, 0.5);
        opacity: 0.5;
        position: absolute;
        top: 0;
        right: 0;
      }
    }
    .tomorrow-closet {
      padding-left: 20px;
      /*padding-left: 6.25vw;*/
      .txt-change {
        width: 57px;
        /*width: 17.8125vw;*/
        font-size: 12px;
        /*font-size: 3.75vw;*/
        letter-spacing: -0.8px;
        line-height: 21px;
        /*line-height: 6.5625vw;*/
        border-radius: 10px;
        /*border-radius: 3.125vw;*/
        border: 1px solid #fff;
        text-align: center;
        margin-top: 13px;
      }
    }
    .title {
      font-size: 14px;
      /*font-size: 4.375vw;*/
      letter-spacing: -1px;
    }
    .txt-number {
      font-size: 30px;
      /*font-size: 9.375vw;*/
      line-height: 36px;
    }
  }
</style>
