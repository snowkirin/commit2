<template>
  <div class="main">
    <zuly-header></zuly-header>
      <router-view />
    <zuly-footer></zuly-footer>
  </div>
</template>

<script>
import ZulyHeader from '@/components/common/Header';
import ZulyFooter from '@/components/common/Footer';

export default {
  name: 'zuly-main',
  components: {
    ZulyHeader,
    ZulyFooter,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
