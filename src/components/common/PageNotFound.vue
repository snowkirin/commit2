<template>
<div>
</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'pageNotFound',
  computed: mapGetters({
    Authentication: 'login/Authentication',
  }),
  methods: {
  },
  created() {
    if (this.$route.path === '/index.html') this.$router.push({ path: '/' });
  },
};
</script>

<style scoped>
</style>
