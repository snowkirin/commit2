<template>
  <div class="container">
    <div>
      <p class="title">아이디 찾기</p>
      <p class="explain">가입 당시 입력한 휴대전화 번호를 통해 아이디를 찾을 수 있습니다.</p>
    </div>
    <div class="line line__default"></div>
    <div class="contents">
      <div class="content">
        <p class="txt-desc">입력하신 정보와 일치하는 아이디는 아래와 같습니다.</p>
        <p class="txt-userid">{{ userId }}</p>
        <router-link to="/login" class="menu-title">로그인</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'success',
  computed: mapGetters({
    phoneAuth: 'common/getPhoneAuth',
    userId: 'common/getUserId',
  }),
  created() {
    let rtn = false;
    if (this.userId) rtn = !rtn;
    if (!rtn) {
      alert('잘못된 접근입니다.');
      this.$router.push({ path: '/' });
    }
  },
};
</script>

<style scoped lang="scss">
  .container {
    padding: 24px 20px 121px;
    text-align: center;
    .title {
      font-size: 24px;
      line-height: 32px;
      letter-spacing: -1.4px;
    }
    .explain {
      font-size: 14px;
      line-height: 20px;
      letter-spacing: -0.8px;
      color: #797979;
      margin-top: 3px;
    }
    .line {
      margin-top: 14px;
      margin-bottom: 19px;
      border-width: 2px;
    }
    .txt-desc {
      color: #333;
      font-size: 15px;
      letter-spacing: -0.9px;
      line-height: 23px;
      margin-bottom: 10px;
    }
    .txt-userid {
      margin-bottom: 30px;
      color: #ec4b1a;
      font-size: 15px;
      letter-spacing: -0.9px;
      line-height: 23px;
    }
    .menu-title {
    }
  }
  @media (min-width: 768px) {
    .container {
      width: 390px;
      margin: 0 auto;
      padding: 72px 0 119px 0;
      .title {
        font-size: 32px;
        line-height: 40px;
        letter-spacing: -1.7px;
      }
      .explain {
        font-size: 16px;
        line-height: 23px;
        letter-spacing: -1px;
        margin-top: 5px;
        white-space: nowrap;
      }
      .line {
        margin-top: 25px;
        margin-bottom: 30px;
      }
      .button {
        button {
          height: 60px;
        }
      }
    }
  }
</style>
