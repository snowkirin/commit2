<template>
  <header
    class="header"
    :class="{'header-main': isMain }"
    :style="[calcBanner, calcMain]"
  >
    <router-link to="/" class="logo">
      <ZulyLogoSVG class="logo-svg"/>
    </router-link>
    <nav class="global-navigation">
      <ul>
        <li v-if="menu.closet">
          <router-link
            to="/closet/tomorrow"
            class="menu-title">
            나만의 옷장
          </router-link>
        </li>
        <li v-if="menu.login">
          <router-link
            v-if="!Authentication.isAuthenticated"
            to="/login">
            로그인
          </router-link>
          <span
            v-else
            @click="clickLogout">
              로그아웃
            </span>
        </li>
      </ul>
    </nav>
    <simplert ref="alert" :useRadius="false" :useIcon="false" />
  </header>
</template>

<script>
import ZulyLogoSVG from '@/assets/img/logo.svg?inline';
import { mapGetters, mapActions, mapMutations } from 'vuex';
import Simplert from 'vue2-simplert';
const alertObject = {
  type: 'alert', // 타입
  customClass: 'popup-custom-class', // 커스텀 클래스 네임
  disableOverlayClick: false, // 오버레이 클릭시 닫기 방지
  customCloseBtnText: '확인' // 닫기 버튼 텍스트
};

export default {
  name: 'zuly-header',
  data() {
    return {
      isMain: false,
      headerLine: false,
      gnbToggle: false,
      isClose: false,
      result: null,
      menu: {
        closet: false,
        login: false
      }
    };
  },
  props: {
    closetCheck: {
      type: Boolean
    }
  },
  watch: {
    $route() {
      this.headerMediaQueries();
      this.checkMain();
    }
  },
  components: {
    Simplert,
    ZulyLogoSVG
  },
  computed: {
    ...mapGetters({
      isLogin: 'login/isLogin',
      Authentication: 'login/Authentication',
      isMainBanner: 'common/isMainBanner'
    }),
    calcBanner() {
      if (this.isMain && this.isMainBanner) {
        return {
          top: '40px'
        };
      }
    },
    calcMain() {
      if (this.isMain && this.isLogin && this.$mq === 'sm') {
        return {
          display: 'block'
        }
      } else if (this.isMain && this.isLogin) {
        return {
          display: 'block'
        }
      } else if (this.isMain && !this.isLogin && this.$mq !== 'sm') {
        return {
          display: 'none'
        }
      }
    }
  },
  methods: {
    ...mapActions({
      doLogout: 'login/doLogout'
    }),
    ...mapMutations({
      resetState: 'subscriptions/RESET_STATE'
    }),
    // ...mapMutations(['RESET_STATE']),
    headerMediaQueries() {
      this.gnbToggle = this.$route.path.indexOf('join') !== -1;
      this.isMain = this.$route.name === 'IndexMain';
    },
    clickLogout() {
      this.doLogout().then(() => {
        document.cookie = `${
          process.env.VUE_APP_TOKEN_NAME
        }=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/; domain=${
          process.env.VUE_APP_HOST
        }`;
        _.assign(alertObject, {
          message: '로그아웃 되었습니다.'
        });
        this.$refs.alert.openSimplert(alertObject);
        this.resetState();
        this.$router.push({ path: '/login' });
      });
    },
    checkMain() {
      if (
        this.$route.name === 'IndexMain' ||
        this.$route.name === 'Login' ||
        this.$route.path.indexOf('/find') !== -1 ||
        this.$route.path.indexOf('/join') !== -1
      ) {
        if (this.Authentication.isAuthenticated) {
          this.menu.login = false;
          this.menu.closet = true;
        } else {
          this.menu.login = true;
          this.menu.closet = false;
        }
      } else {
        this.menu.closet = true;
        this.menu.login = true;
      }
    }
  },
  created() {
    this.headerMediaQueries();
    this.checkMain();
  }
};
</script>

<style scoped lang="scss">
/* 메인을 제외한 화면 */
.logo-svg {
  width: 66px;
  height: 20px;
  /deep/ path {
    fill: $color-primary;
  }
}
.header {
  @include clearfix;
  padding: 21px 18px;
  .logo {
    float: left;
    width: 66px;
    height: 20px;
  }
  .global-navigation {
    float: right;
    font-size: 0;
    li {
      @include fontSize(15px);
      display: inline-block;
      margin-right: 20px;
      position: relative;
      cursor: pointer;
      vertical-align: top;
      &:last-child {
        margin-right: 0;
      }
      &:not(:last-child):after {
        display: block;
        content: '';
        width: 3px;
        height: 3px;
        position: absolute;
        top: 50%;
        right: -13px;
        transform: translateY(-50%);
        background-color: #797979;
        overflow: hidden;
        border-radius: 2px;
      }
    }
  }
}

/* 현재 화면이 메인일때 */
.header-main {
  position: absolute;
  display: none;
  z-index: 10;
  width: 100%;
  .logo-svg {
    /deep/ path {
      fill: #fff;
    }
  }
  .global-navigation {
    color: #fff;
  }
}

@media (min-width: 768px) {
  .header {
    width: 708px;
    margin: 0 auto;
    padding-left: 0;
    padding-right: 0;
    .global-navigation {
      margin-top: 0;
      li {
        margin-right: 26px;
        &:not(:last-child):after {
        }
      }
    }
    .header-line {
      width: 100%;
      height: 1px;
      position: absolute;
      left: 0;
      top: 73px;
      background-color: #e9e9e9;
    }
  }
  .header-main {
    left: 50%;
    transform: translateX(-50%);
    display: block;
    .header-line {
      display: none;
    }
  }
}

@media (min-width: 1280px) {
  .logo-svg {
    width: 85px;
    height: 25px;
  }
  .header {
    width: 1280px;
    padding: 35px 40px;
    .global-navigation {
      li {
        @include fontSize(18px);
      }
    }
  }
}
</style>
