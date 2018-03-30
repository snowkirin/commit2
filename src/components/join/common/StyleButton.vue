<template>
  <div class="mauto" :style="`width: ${btnSize}; margin-top: ${btnMarginTop}; ${customCss}`">
    <template v-if="this.Authentication.authenticated">
      <div class="d-flex" style="justify-content: space-between;">
        <div style="width: 190px;">
          <button class="button-grey" @click="moveNext">
            저장 후 나가기
          </button>
        </div>
        <div style="width: 190px;">
          <button class="button-login" @click="moveNext">
            다음
          </button>
        </div>
      </div>
    </template>
    <template v-else>
      <button class="button-login" @click="moveNext">
        다음
      </button>
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'styleButton',
  props: {
    btnSize: {
      type: String,
      default: '392px',
    },
    btnMarginTop: {
      type: String,
      default: '50px',
    },
    customCss: {
      type: String,
      default: '',
    },
  },
  components: {
  },
  computed: mapGetters({
    Authentication: 'login/Authentication',
  }),
  methods: {
    moveNext() {
      this.$parent.moveNext();
    },
  },
};
</script>

<style scoped>
</style>
