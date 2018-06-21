<template>
  <header class="header">
    <div class="header-inner">
      <router-link to="/" class="logo">
        <img src="/static/img/logo/ZULY-BI.png" alt="ZULY">
      </router-link>
      <nav class="gnb" v-if="!gnbToggle">
        <ul>
          <li>
            <router-link to="/closet" class="menu-title">나만의 옷장</router-link>
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
      if (this.$mq === 'sm') {
        if (this.$route.path.indexOf('join') !== -1) {
          this.gnbToggle = true;
        }
      } else if (this.$mq === 'md') {
        console.log('md');
      } else {
        console.log('lg');
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
    /*height: 56px;*/
    padding: 17px 20px 20px 20px;
    &-inner {
      align-items: center;
      display: flex;
      height: 100%;
      justify-content: space-between;
    }
  }
  .logo {
    width: 64px;
    height: 19px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .gnb {
    margin-top: 5px;
    ul {
      display: flex;
    }
    li {
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

  @media (min-width: 1279px){
    .header {
      width: 1280px;
      margin: 0 auto;
      padding: 30px 40px;
    }
    .logo {
      width: 90px;
      height: 27px;
    }
    .gnb {
      margin-right: -2px;
      margin-top: 5px;
      li {
        font-size: 20px;
        letter-spacing: -0.5px;
        margin-right: 29px;
        &:not(:last-child):after {
          position: absolute;
          right: -17px;
          top: 7px;
          display: inline-block;
          content: '';
          width: 4px;
          height: 4px;
          background-color: #797979;
          overflow: hidden;
        }
      }
    }
  }
</style>
