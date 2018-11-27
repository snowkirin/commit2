<template>
  <div class="contents">
    <div class="contents-header">
      <h3>안전하게 보호하기 위해 비밀번호를 다시 한번 확인 합니다.</h3>
    </div>
    <div class="content">
      <div class="grid-flex grid-fixed">
        <div class="column">
          <div class="text-field">
            <input
              type="password"
              name="password"
              placeholder="비밀번호"
              v-model="password"
              @keyup.enter="$refs.btnComplete.click()"
            />
            <!--v-validate="'required'"-->
          </div>
        </div>
        <div class="column w-31 o-3">
          <button
            type="button"
            class="btn btn-primary h-50"
            ref="btnComplete"
            @click="passwordCheck"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'mypageSecurity',
  data() {
    return {
      password: ''
    };
  },
  computed: {
    ...mapGetters({
      PasswordAuth: 'auth/PasswordAuth'
    })
  },
  methods: {
    ...mapActions({
      postPassword: 'auth/postPassword'
    }),
    async passwordCheck() {
      const formData = {
        password: this.password
      };
      if (this.password === '') {
        alert('비밀번호를 입력해주세요.');
        return;
      }
      await this.postPassword(formData).then(res => {
        if (res.data.result) {
          if (this.PasswordAuth) {
            this.$router.push({ path: '/closet/my-info/mypage' });
          }
        } else if (!res.data.result) {
          this.$dialog.alert('비밀번호를 정확히 입력해 주세요.', {
            okText: '확인',
            customClass: 'zuly-alert',
            backdropClose: true
          });
        } else {
          this.$dialog.alert(
            '통신오류가 발생하였습니다. 잠시 후 다시 시도해 주세요.',
            {
              okText: '확인',
              customClass: 'zuly-alert',
              backdropClose: true
            }
          );
        }
      });
    }
  }
};
</script>

<style scoped lang="scss" src="@/assets/css/closet-style.scss">
</style>
<style scoped lang="scss">
@media (min-width: 768px) {
  .content {
    width: 600px;
  }
}
</style>
