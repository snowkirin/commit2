<template>
  <header class="header">
    <router-link to="/" class="logo">
      <img src="@/assets/img/logo.png" alt="ZULY">
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
    <div class="header-line" v-if="!closetCheck"></div>
    <simplert ref="alert" :useRadius="false" :useIcon="false" />
  </header>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Simplert from 'vue2-simplert'
const alertObject = {
  type: 'alert', // 타입
  customClass: 'popup-custom-class', // 커스텀 클래스 네임
  disableOverlayClick: false, // 오버레이 클릭시 닫기 방지
  customCloseBtnText: '확인', // 닫기 버튼 텍스트
};

export default {
  name: "zuly-header",
  data() {
    return {
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
    Simplert
  },
  computed: mapGetters({
    Authentication: "login/Authentication"
  }),
  methods: {
    ...mapActions({
      doLogout: "login/doLogout"
    }),
    headerMediaQueries() {
      this.gnbToggle = this.$route.path.indexOf("join") !== -1;
    },
    clickLogout() {
      this.doLogout().then(() => {
        document.cookie = `${process.env.VUE_APP_TOKEN_NAME}=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/; domain=${process.env.VUE_APP_HOST}`;
        _.assign(alertObject, {
          message: '로그아웃 되었습니다.',
        });
        this.$refs.alert.openSimplert(alertObject);
        this.$router.push({ path: "/login" });
      });
    },
    checkMain() {
      if (
        this.$route.name === "IndexMain" ||
        this.$route.name === "Login" ||
        this.$route.path.indexOf("/find") !== -1 ||
        this.$route.path.indexOf("/join") !== -1
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
.header {
  @include clearfix;
  padding: 17px 20px 20px 20px;
  .logo {
    float: left;
    width: 66px;
    height: 20px;
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
      font-size: 16px;
      letter-spacing: -1px;
      margin-right: 20px;
      position: relative;
      cursor: pointer;
      &:last-child {
        margin-right: 0;
      }
      &:not(:last-child):after {
        position: absolute;
        right: -13px;
        top: 5px;
        display: inline-block;
        content: "";
        width: 3px;
        height: 3px;
        background-color: #797979;
        overflow: hidden;
      }
    }
  }
}
@media (min-width: 768px) {
  .header {
    width: 1200px;
    margin: 0 auto;
    padding: 30px 0 31px;
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
    .header-line {
      width: 100%;
      height: 1px;
      position: absolute;
      left: 0;
      top: 87px;
      background-color: #e9e9e9;
    }
  }
}
</style>
