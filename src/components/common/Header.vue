<template>
  <header class="header">
    <div class="header-inner">
      <router-link to="/" class="logo">
        <img src="/static/img/logo/ZULY-BI.png" alt="ZULY">
      </router-link>
      <nav class="menu">
        <ul>
          <li>
            <router-link to="/closet" class="menu-title">나만의 옷장</router-link>
          </li>
          <li>
          <span v-if="Authentication.authenticated" class="menu-title" @click="doLogout">
            로그아웃
          </span>
            <router-link v-else to="/login" class="menu-title">
              로그인
            </router-link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'zuly-header',
  data() {
    return {
      headerLine: false,
    };
  },
  watch: {
    $route: 'headerLineEvt',
  },
  computed: mapGetters({
    Authentication: 'login/Authentication',
  }),
  methods: {
    headerLineEvt() {
      if (this.$route.path.indexOf('closet') !== -1) this.headerLine = false;
      else if (this.$route.path !== '/') this.headerLine = true;
      else this.headerLine = false;
    },
    doLogout() {
      document.cookie = `${process.env.TOKEN_NAME}=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/; domain=${process.env.HOST}`;
      this.$router.push({ path: '/login' });
    },
  },
  created() {
    this.headerLineEvt();
  },
};
</script>

<style scoped lang="scss">
  .header {
    padding: 10px 20px;
    /*padding: 9.375vw 6.25vw;*/
    .header-inner {
      height: 35px;
      align-items: center;
      display: flex;
      justify-content: space-between;
    }
  }
  .logo {
    width: 71px;
    height: 21px;
    /*width: 22.1875vw;*/
    /*height: 6.5625vw;*/
    img {
      width: 100%;
      height: 100%;
    }
  }

  .menu {
    ul {
      display: flex;
      list-style: none;
      margin: 0;
    }
    li {
      line-height: 21px;
      /*line-height: 6.5625vw;*/
      margin-right: 25px;
      /*margin-right: 7.8125vw;*/
      position: relative;
      font-size: 16px;
      /*font-size: 5vw;*/
      &:last-child {
        margin-right: 0;
      }
      &:not(:last-child):after {
        position: absolute;
         right: -12px;
        top: 10px;
        /*top: 3.125vw;*/
        /*right: -3.75vw;*/
        display: inline-block;
        content: '';
        /*width: 0.9375vw;*/
        /*height: 0.9375vw;*/
        width: 3px;
        height: 3px;
        background-color: #333;
        opacity: 0.5;
      }
    }
  }
</style>
