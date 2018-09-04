<template>
  <button class="btn btn-primary h-56" @click="clickInteraction" ref="formButton" type="button">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "FormButton",
  props: {
    apiData: {
      // required: true,
    }
  },
  methods: {
    async clickInteraction() {
      this.apiData()
        .then(res => {
          this.$refs.formButton.disabled = true;
          if (res.data.result) {
            this.$emit("success");
          } else if (!res.data.result) {
          } else {
            alert('통신 오류가 발생하였습니다.');
          }
        })
        .catch(err => {
          if (this.$refs.formButton) {
            this.$refs.formButton.disabled = false;
          }
        })
        .then(() => {
          if (this.$refs.formButton) {
            this.$refs.formButton.disabled = false;
          }
        });
    }
  },
  created() {}
};
</script>

<style scoped>
</style>
