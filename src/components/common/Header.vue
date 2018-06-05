<template>
  <header class="header">
    <router-link to="/" class="logo">
      <img src="/static/img/logo/ZULY-BI.png" alt="ZULY">
    </router-link>
    <nav class="menu">
      <ul>
        <li>
          <router-link to="/closet" class="menu-title">나만의 옷장</router-link>
        </li>
        <!--<li class="interval">-->
          <!--<span class="mobile-point" style="display: inline-block; width:3px; height:3px; background-color: #333333; opacity: 0.5;"></span>-->
        <!--</li>-->
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
    <div v-show="headerLine" class="headerLine mt60"></div>
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
    align-items: center;
    display: flex;
    justify-content: space-between;
    padding: 30px 20px;
  }
  .logo {
    width: 71px;
    height: 21px;
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
      margin-right: 25px;
      position: relative;
      &:last-child {
        margin-right: 0;
      }
      &:not(:last-child):after {
        position: absolute;
        right: -12px;
        top: 10px;
        display: inline-block;
        content: '';
        width: 3px;
        height: 3px;
        background-color: #333;
        opacity: 0.5;
      }
    }
  }
.side-margin-50 {
  margin: 0 50px 0 53px;
}

/*.logo {*/
  /*width: 99px;*/
  /*height: 30px;*/
  /*background-image: url('/static/img/logo/ZULY-BI.png');*/
  /*background-size: 100% 100%;*/
/*}*/

div.headerLine {
  width: 100%;
  height: 3px;
  background-color: #333333;
}

ul.header-menu {
  padding: 0;
  position: relative;
  top: -6px;
}

li.interval {
  margin: 0 15px;
}

span.menu-title {
  cursor: pointer;
}

@media screen and (max-width: 486px) {
  div.headerLine {
    display: inline-block;
  }

  .mt60 {
    margin-top: 15px !important;
  }

  .zuly-menu {
    margin-top: 5px !important;
  }

  /*.logo {*/
    /*width: 73px;*/
    /*height: 22px;*/
  /*}*/

  .pd20 {
    padding-top: 10px !important;
  }

  ul.header-menu {
    padding: 0;
    position: relative;
    top: -11px;
  }

  li.interval {
    margin: 0 10px;
  }

  span.mobile-point {
    top: -3px;
    position: relative;
  }

  .menu-title {
    letter-spacing: -1px;
  }
}
</style>
