<template>
  <header class="side-margin-42 pd30">
    <div class="left">
      <router-link to="/">
         <div class="logo"></div>
      </router-link>
    </div>
    <div class="right talign-right">
      <ul style="display: inline-flex; list-style: none;">
        <li>
          <a href="#" class="menu-title">나만의 옷장</a>
        </li>
        <li style="margin: 0 15px 0 15px;">
          <span style="display: inline-block; width:4px; height:4px; background-color: #212121; opacity: 0.5;"></span>
        </li>
        <li>
          <router-link to="/login" class="menu-title">
            로그인
          </router-link>
        </li>
      </ul>
    </div>
    <div v-show="headerLine" class="headerLine mt60"></div>
  </header>
</template>

<script>
export default {
  name: 'zuly-header',
  data() {
    return {
      headerLine: false,
    };
  },
  watch: {
    $route: 'headerLineEvt',
  },
  methods: {
    headerLineEvt() {
      if (this.$route.path !== '/') this.headerLine = true;
      else this.headerLine = false;
    },
  },
  created() {
    this.headerLineEvt();
  },
};
</script>

<style scoped>
.logo {
  width: 99px;
  height: 40px;
  background-image: url('/static/img/logo/ZULY-BI.png');
  background-size: 100% 100%;
}

div.right {
  padding-right: 8px;
}

div.headerLine {
  width: 100%;
  height: 3px;
  background-color: #212121;
}
</style>
