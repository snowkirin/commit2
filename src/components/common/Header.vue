<template>
  <header class="side-margin-42 mt30">
    <div class="left">
      <div class="logo"></div>
    </div>
    <div class="right talign-right">
      <a href="#" class="menu-title">나만의 옷장</a>
      <span class="dot side-margin-5">&#9642;</span>
      <a href="#" class="menu-title">로그인</a>
    </div>
  </header>
</template>

<script>
export default {
  name: 'zuly-header',
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
</style>
