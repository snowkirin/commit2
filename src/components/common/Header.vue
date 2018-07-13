<template>
  <header class="header clearfix">
    <router-link to="/" class="logo">
      <img src="/static/img/logo/ZULY-BI.png" alt="ZULY">
    </router-link>
    <nav class="global-navigation" v-if="!gnbToggle">
      <ul>
        <li>
          <router-link
            to="/closet/tomorrow"
            class="menu-title">
            나만의 옷장
          </router-link>
        </li>
        <li>
          <router-link
            v-if="!Authentication.authenticated"
            to="/login">
            로그인
          </router-link>
          <span
            v-else
            @click="doLogout">
              로그아웃
            </span>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'zuly-header',
  data() {
    return {
      headerLine: true,
      gnbToggle: false,
    };
  },
  watch: {
    // $route: 'headerLineEvt',
    $route: 'headerMediaQueries',
  },
  computed: mapGetters({
    Authentication: 'login/Authentication',
  }),
  methods: {
    headerMediaQueries() {
      if (this.$route.path.indexOf('join') !== -1) {
        this.gnbToggle = true;
      } else {
        this.gnbToggle = false;
      }
    },
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
    this.headerMediaQueries();
  },
};
</script>

<style scoped lang="scss">
  .header {
    padding: 17px 20px 20px 20px;
    .logo {
      float: left;
      width: 64px;
      height: 19px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .global-navigation {
      float: right;
      margin-top: 5px;
      font-size: 0;
      li {
        display: inline-block;
        font-size: 15px;
        letter-spacing: -1px;
        margin-right: 20px;
        position: relative;
        &:last-child {
          margin-right: 0;
        }
        &:not(:last-child):after {
          position: absolute;
          right: -13px;
          top: 5px;
          display: inline-block;
          content: '';
          width: 3px;
          height: 3px;
          background-color: #797979;
          overflow: hidden;
        }
      }
    }
  }
  @media (min-width: 767px) {
    .header {
      width: 1200px;
      margin: 0 auto;
      padding: 30px 0 31px;
      border-bottom: 1px solid #dadada;
      .logo {
        width: 90px;
        height: 27px;
      }
      .global-navigation {
        margin-top: 0;
        li {
          font-size: 20px;
          letter-spacing: -1.3px;
          margin-right: 26px;
          &:not(:last-child):after {
            right: -13px;
            top: 9px;
            border-radius: 2px;
          }
        }
      }
    }
  }
</style>
