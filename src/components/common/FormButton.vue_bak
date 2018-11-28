<template>
  <button class="btn btn-primary h-56" @click="clickInteraction" ref="formButton" type="button">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'FormButton',
  props: {
    apiData: {
      // required: true,
    }
  },
  methods: {
    async clickInteraction() {
      _.throttle(
        this.apiData().then(res => {
          if (res.data.result) {
            this.$emit('success');
          }
        }),
        10000
      );
    }
  },
  created() {}
};
</script>

<style scoped>
</style>
