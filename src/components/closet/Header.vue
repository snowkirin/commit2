<template>
  <div class="closet-header">
    <p class="user">
      <span class="name">{{ Authentication.userName }}</span>님 옷장
    </p>
    <div class="info">
      <div class="notice">
        <p class="title">공지사항</p>
        <p class="number">
          <span>0</span> 건
        </p>
      </div>
      <div class="tomorrow-closet">
        <div class="clearfix">
          <p class="title">내일의 옷장 선택</p>
          <div class="txt-change">
            <span>{{ changeMsg }}</span>
          </div>
        </div>
        <p class="number">
          <span>D-9</span>
          <!--<span>{{ printDDay(tomorrowCloset.select_dday) }}</span>-->
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
    font-weight: 300;
  }
  .user {
    font-size: 32px;
    letter-spacing: -2.2px;
    line-height: 40px;
  }
  .info {
    display: flex;
    margin-top: 28px;
    .notice,
    .tomorrow-closet {
      position: relative;
      display: flex;
      flex-direction: column;
      .title {
        font-size: 14px;
        letter-spacing: -1px;
      }
      .number {
        span {
          font-size: 30px;
          line-height: 36px;
          font-family: 'Open Sans', '맑은 고딕', 'Malgun Gothic', sans-serif;
          letter-spacing: 0;
        }
      }
    }
    .notice {
      flex: 1 1 59.15492957746479%;
      &:after {
        content: '';
        display: block;
        width: 2px;
        height: 80px;
        background-color: rgba(255,255,255, 0.5);
        opacity: 0.5;
        position: absolute;
        top: 0;
        right: 0;
      }
      .number {
        font-size: 16px;
        letter-spacing: 2.3px;
        margin-top: 35px;
        span {
          font-size: 30px;
          line-height: 36px;
          font-family: 'Open Sans', '맑은 고딕', 'Malgun Gothic', sans-serif;
          letter-spacing: 0;
        }
      }
    }
    .tomorrow-closet {
      padding-left: 22px;
      flex: 1 1 116px;
      .txt-change {
        width: 57px;
        font-size: 12px;
        letter-spacing: -0.8px;
        line-height: 21px;
        border-radius: 10px;
        border: 1px solid #fff;
        text-align: center;
        margin-top: 13px;
      }
    }
  }
  @media (min-width: 1279px) {
    .closet-header {
      width: 1200px;
      margin: 0 auto;
      padding: {
        top: 17px;
        right: 32px;
        bottom: 19px;
        left: 26px;
      }
    }
    .user {
      font-size: 42px;
      letter-spacing: -3px;
      line-height: 62px;
    }
    .info {
      margin-top: 9px;
      .notice,
      .tomorrow-closet {
        text-align: right;
        .title {
          font-size: 16px;
          letter-spacing: -1.1px;
          line-height: 24px;
        }
        .number {
          font-size: 16px;
          letter-spacing: -1.1px;
          line-height: 27px;
          span {
            font-size: 42px;
            line-height: 57px;
            letter-spacing: 0;
          }
        }
      }
      .notice {
        flex: 0 0 73.8%;
        .title {
          margin-right: 216px;
          margin-top: 3px;
        }
        .number {
          margin-top: 18px;
          margin-right: 30px;
        }
      }
      .tomorrow-closet {
        padding-left: 28px;
        flex: 1;
        .title {
          float: left;
        }
        .txt-change {
          float: right;
          margin-top: 3px;
          font-size: 14px;
          letter-spacing: -1px;
          line-height: 22px;
          width: 64px;
          border-radius: 30px;
        }
        .number {
          margin-top: 18px;
        }
      }
    }
  }
</style>
