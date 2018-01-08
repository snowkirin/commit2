<template>
  <div id="app">
    <zuly-main></zuly-main>
  </div>
</template>

<script>
import ZulyMain from '@/components/Main';

export default {
  name: 'app',
  components: {
    ZulyMain,
  },
};
</script>

<style>
* {
  font-family: 'HanSans', 'Avenir', Helvetica, Arial, sans-serif;
}

#app {
  font-family: 'HanSans', 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.blind {
  display: none;
}
</style>
