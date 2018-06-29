<template>
  <div class="coupon">
    <p class="txt-main-title">쿠폰 번호를 입력하세요.</p>
    <form>
      <div class="form-group" data-grid="7:3">
        <input type="text" class="form-input">
        <button
          type="button"
          class="btn btn-primary">
          등록
        </button>
      </div>
    </form>
    <div class="line line__default"></div>
    <div class="coupon-list">
      <table>
        <thead>
        <tr>
          <th>쿠폰종류</th>
          <th>쿠폰명</th>
          <th>사용가능기간</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>
            <div class="coupon-ticket">
              <span class="percent en-font">30%</span>
              <span class="text">ZULY</span>
            </div>
          </td>
          <td>
            WHITE 등급<br/>일반쿠폰 30%
          </td>
          <td class="en-font">
            2018.03.01 ~ 2018.03.31
          </td>
        </tr>
        <tr>
          <td>
            <div class="coupon-ticket">
              <span class="percent en-font">30%</span>
              <span class="text">ZULY</span>
            </div>
          </td>
          <td>
            WHITE 등급<br/>일반쿠폰 30%
          </td>
          <td class="en-font">
            2018.03.01 ~ 2018.03.31
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
  <!--<div class="notice mt40">
    <div class="main-point-text closet-title">쿠폰 등록/내역</div>
    <div class="closet-title-text mt15">
      쿠폰 번호를 입력하세요.
    </div>
    <div class="security-input">
      <div class="inputGroup">
        <input type="text" name="coupon" class="form-login-group mt12 coupon-input" placeholder="쿠폰번호"/>
        <div style="display: inline-table; width: 1%;"></div>
        <button class="button-login coupon-button">등록</button>
      </div>
    </div>
    <div class="closet-content mt30">
      <div class="notice-content">
        <div class="notice-rows notice-header">
          <div class="notice-number-title">쿠폰종류</div>
          <div class="notice-subject-title">쿠폰명</div>
          <div class="notice-regdate-title">사용 가능 기간</div>
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
            WHITE 등급 일반쿠폰 3%
          </div>
          <div class="notice-regdate">
            2018.03.01~2018.03.31
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
            WHITE 등급 일반쿠폰 30%
          </div>
          <div class="notice-regdate">
            2018.03.01~2018.03.31
          </div>
        </div>
      </div>
    </div>
  </div>-->
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

<style scoped lang="scss">
  .coupon {
    padding: 20px;
  }
  .coupon-list {
    table {
      width: 100%;
      table-layout: fixed;
      border-bottom: 1px solid #333;
    }
    th, td {
      font-size: 15px;
      letter-spacing: -0.6px;
    }
    thead {
      th {
        height: 43px;
        &:first-child {
          text-align: left;
        }
        &:last-child {
          text-align: right;
        }
      }
    }
    tbody {
      tr {
        td {
          border-top: 1px solid #e9e9e9;
        }
      }
      td {
        line-height: 23px;
        height: 78px;
        &:last-child {
          text-align: left;
          letter-spacing: 0;
        }
      }
    }

  }
  .coupon-ticket {
    position: relative;
    overflow: hidden;
    width: 70px;
    height: 38px;
    border: 1px solid #333;
    border-radius: 3px;
    line-height: 36px;
    text-align: center;
    padding-right:16px;
    .percent {
      font-size: 15px;
      font-weight: 700;
    }
    .text {
      transform-origin: 0 0;
      -webkit-transform: rotate(90deg);
      transform: rotate(90deg);
      color: #fff;
      font-size: 11px;
      font-weight: 300;
      background-color: #333;
      position: absolute;
      width: 36px;
      top: 0;
      letter-spacing: 0;
      left: 100%;
      height: 16px;
      line-height: 16px;
    }
  }
  .txt-main-title {
    margin-bottom: 15px;
  }
  .line {
    margin-top: 20px;
  }

  @media (min-width: 1279px) {
    .coupon {
      padding: 20px 0;
      width: 1200px;
      margin: 0 auto;
    }
  }

/*.notice-rows {
  min-height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: -0.4px;
  color: #333333;
  border-bottom: solid 2px #e9e9e9;
}

.notice-header {
  line-height: 40px;
  font-weight: 600;
}

.notice-content {
}

.notice-number {
  width: 10%;
  text-align: center;
}

.notice-subject {
  width: 75%;
  text-align: center;
  word-break:break-all;
}

.notice-regdate {
  width: 15%;
  text-align: center;
  word-break:break-all;
}

.notice-number-title {
  width: 10%;
  text-align: center;
}

.notice-subject-title {
  width: 75%;
  text-align: center;
}

.notice-regdate-title {
  width: 15%;
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
  border: solid 1px #333333;
  display: inline-block;
  vertical-align: middle;
  font-size: 16px;
  font-weight: 600;
}

.coupon-input {
  width: 33%;
}

.coupon-button {
  width: 10%;
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
  top: -29.3%;
  left: 2.5%;
  width: 21px;
  line-height: 56px;
  font-size: 12px;
  letter-spacing: 0.5px;
  color: #FFFFFF;
  font-weight: normal;
  -webkit-transform: rotate(-270deg);
  -moz-transform: rotate(-270deg);
  -ms-transform: rotate(-270deg);
  -o-transform: rotate(-270deg);
  filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=3);
}

@media screen and (max-width: 486px) {
  .notice-number {
    width: 20% !important;
  }

  .notice-subject {
    width: 45% !important;
    padding: 0 20px 0 20px;
  }

  .notice-regdate {
    width: 35% !important;
  }

  .coupon-square {
    width: 100% !important;
  }

  .coupon-label {
    left: -21.5%;
  }

  .notice-number-title {
    width: 20%;
    text-align: center;
  }

  .notice-subject-title {
    width: 45%;
    padding: 0 20px 0 20px;
    text-align: center;
  }

  .notice-regdate-title {
    width: 35%;
    text-align: center;
  }

  .coupon-input {
    width: 60%;
  }

  .coupon-button {
    width: 39%;
    height: 50px !important;
    line-height: 0px !important;
  }
}*/
</style>
