<template>
  <div>
    <span id="menuTitle">{{menuTitle}}</span>
    <div class="content-title-menu-box" @click="stylingMenuOnoff" :style="`margin-left: ${leftSize}px;`">
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
  data() {
    return {
      leftSize: 0,
    };
  },
  props: {
    menuTitle: {
      type: String,
      default: '',
    },
  },
  methods: {
    stylingMenuOnoff() {
      const mnu = document.querySelector('.content-menu-box');

      if (mnu.style.display === 'none' || !mnu.style.display) mnu.style.display = 'block';
      else mnu.style.display = 'none';
    },
  },
  mounted() {
    this.leftSize = (document.getElementById('menuTitle').offsetWidth / 2) + 10;
  },
};
</script>

<style scoped>
.style-menu {
  color: #212121;
  text-decoration: none;
}

#menuTitle {
  display: inline-block;
}

@media screen and (max-width: 486px) {
  .content-title-menu-box {
    top: 1px !important;
  }

  .content-menu-box {
    left: 50% !important;
  }
}
</style>
