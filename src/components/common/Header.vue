<template>
  <header
    class="header"
    :class="`is-${types !== undefined ? types : 'another'}`"
  >
    <div class="header-inner">
      <router-link to="/" class="logo">
        <ZulyLogoSVG class="logo-svg" viewBox="0 0 66 20" />
      </router-link>
      <nav class="global-navigation" v-if="types === 'closet'">
        <ul>
          <li v-if="isAuthenticated">
            <router-link to="/closet/tomorrow" class="menu-title">
              나만의 옷장
            </router-link>
          </li>
          <li>
            <router-link v-if="!isAuthenticated" to="/login">
              로그인
            </router-link>
            <span v-else @click="clickLogout">로그아웃</span>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
import ZulyLogoSVG from '@/assets/img/logo.svg?inline';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'zuly-header',
  props: ['types'],
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
  components: {
    ZulyLogoSVG
  },
  computed: {
    ...mapGetters({
      isAuthenticated: 'login/isAuthenticated'
    })
  },
  methods: {
    ...mapActions({
      LOGOUT: 'login/LOGOUT'
    }),
    resetStore() {
      // Vuex 초기화
      this.$store.commit('auth/RESET_STATE');
      this.$store.commit('codes/RESET_STATE');
      this.$store.commit('common/RESET_STATE');
      this.$store.commit('faq/RESET_STATE');
      this.$store.commit('inquiries/RESET_STATE');
      this.$store.commit('login/RESET_STATE');
      this.$store.commit('member/RESET_STATE');
      this.$store.commit('notices/RESET_STATE');
      this.$store.commit('payment/RESET_STATE');
      this.$store.commit('signup/RESET_STATE');
      this.$store.commit('subscriptions/RESET_STATE');
    },
    clickLogout() {
      this.LOGOUT().then(() => {
        if (!this.isAuthenticated) {
          this.$dialog.alert('로그아웃 되었습니다.', {
            okText: '확인',
            customClass: 'zuly-alert',
            backdropClose: true
          });
          document.cookie = `${
            process.env.VUE_APP_TOKEN_NAME
          }=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/; domain=${
            process.env.VUE_APP_HOST
          }`;
          this.resetStore();
          this.$router.push({ path: '/login' });
        }
      });
    }
  },
};
</script>

<style scoped lang="scss">
.header {
  /* Tablet ~ Desktop */
  @include tablet {
    border-bottom: 1px solid #dadada;
  }
  &.is-closet {
    @include tablet {
      border-bottom: 0;
    }
  }

  .header-inner {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: {
      top: 18px;
      bottom: 18px;
      left: 21px;
      right: 21px;
    }
    /* Tablet Style */
    @include tablet {
      width: 708px;
      padding: {
        top: 18px;
        bottom: 15px;
        left: 0;
        right: 0;
      }
      margin: 0 auto;
    }
    /* Desktop Style */
    @include desktop {
      width: 1080px;
      padding: {
        top: 25px;
        bottom: 20px;
      }
    }
  }
  .logo {
    .logo-svg {
      width: 66px;
      height: 20px;
      /deep/ path {
        fill: $color-primary;
      }
      /* Desktop Style */
      @include desktop {
        width: 85px;
        height: 25px;
      }
    }
  }
  .global-navigation {
    margin-left: auto;
    font-size: 0;
    li {
      @include fontSize(15px);
      line-height: 1;
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
      /* Tablet Style */
      @include tablet {
        margin-right: 26px;
      }
      /* Desktop Style */
      @include desktop {
        @include fontSize(17px);
        line-height: 25px;
      }
    }
  }
  &.join {
    .global-navigation {
      display: none;
    }
  }
}
</style>
