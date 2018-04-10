<template>
  <div style="display: table-row; position: relative;">
    <div class="content-title-menu-box" @click="stylingMenuOnoff" :style="`left: ${printLeftSize};`">
      <div class="arrow-down"></div>
    </div>
    <div class="content-menu-box">
      <div class="content-menu-box-detail"><router-link to="/join/size" class="style-menu">사이즈</router-link></div>
      <div class="content-menu-box-detail"><router-link to="/join/styling" class="style-menu">선호 스타일</router-link></div>
      <div class="content-menu-box-detail"><router-link to="/join/colors" class="style-menu">색상</router-link></div>
      <div class="content-menu-box-detail"><router-link to="/join/blouse" class="style-menu">블라우스</router-link></div>
      <div class="content-menu-box-detail"><router-link to="/join/tshirt" class="style-menu">티셔츠</router-link></div>
      <div class="content-menu-box-detail"><router-link to="/join/skirt" class="style-menu">스커트</router-link></div>
      <div class="content-menu-box-detail"><router-link to="/join/knitvest" class="style-menu">니트/베스트</router-link></div>
      <div class="content-menu-box-detail"><router-link to="/join/shirt" class="style-menu">셔츠</router-link></div>
      <div class="content-menu-box-detail"><router-link to="/join/pants" class="style-menu">팬츠</router-link></div>
      <div class="content-menu-box-detail"><router-link to="/join/onepiece" class="style-menu">원피스</router-link></div>
      <div class="content-menu-box-detail"><router-link to="/join/patterns" class="style-menu">패턴</router-link></div>
      <!-- div class="content-menu-box-detail"><router-link to="/join/material" class="style-menu">재질</router-link></div -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'styleMenu',
  props: {
    leftSize: {
      type: String,
      default: '58%',
    },
  },
  computed: {
    printLeftSize() {
      let rtn = this.leftSize;
      if (window.outerWidth <= 486) rtn = `${(parseInt(this.leftSize.replace('%', ''), 10) + 18).toString()}%`;
      return rtn;
    },
  },
  methods: {
    stylingMenuOnoff() {
      const mnu = document.querySelector('.content-menu-box');

      if (mnu.style.display === 'none' || !mnu.style.display) mnu.style.display = 'block';
      else mnu.style.display = 'none';
    },
  },
};
</script>

<style scoped>
.style-menu {
  color: #212121;
  text-decoration: none;
}

@media screen and (max-width: 486px) {
  .content-title-menu-box {
    top: 1px !important;
  }

  .content-menu-box {
    left: 32% !important;
  }
}
</style>
