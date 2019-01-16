import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      isAuthenticated: 'common/isAuthenticated'
    })
  },
  methods: {
    ...mapActions({
      LOGOUT: 'common/LOGOUT'
    }),
    resetStore() {
      this.$store.commit('common/RESET_STATE');
      this.$store.commit('join/RESET_STATE');
      this.$store.commit('closet/RESET_STATE');
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
