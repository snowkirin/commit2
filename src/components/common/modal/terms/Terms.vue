<template>
  <component :is="termsComponent" @close="onClose" v-if="termsComponent"/>
</template>

<script>
export default {
  name: 'Terms',
  data() {
    return {
      type: null,
      termsComponent: null
    };
  },
  watch: {
    type() {
      this.loader();
    }
  },
  computed: {

  },
  methods: {
    loader() {
      if (!this.type) {
        this.termsComponent = null;
        return;
      }
      this.termsComponent = () => import(`./Terms${this.type}`);
    },
    onClose() {
      this.type = null;
    }
  },
  // mounted() {
  //   this.loader();
  // }
};
</script>

<style scoped>
</style>
