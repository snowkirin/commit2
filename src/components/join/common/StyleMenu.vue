<template>
  <div style="display: table-row; position: relative;">
    <div class="content-title-menu-box" @click="stylingMenuOnoff" :style="`left: ${leftSize};`">
      <div class="arrow-down"></div>
    </div>
    <div class="content-menu-box">
      <div class="content-menu-box-detail">사이즈</div>
      <div class="content-menu-box-detail">선호 스타일</div>
      <div class="content-menu-box-detail">색상</div>
      <div class="content-menu-box-detail">블라우스</div>
      <div class="content-menu-box-detail">티셔츠</div>
      <div class="content-menu-box-detail">스커트</div>
      <div class="content-menu-box-detail">니트/베스트</div>
      <div class="content-menu-box-detail">셔츠</div>
      <div class="content-menu-box-detail">팬츠</div>
      <div class="content-menu-box-detail">원피스</div>
      <div class="content-menu-box-detail">패턴</div>
      <div class="content-menu-box-detail">재질</div>
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
  components: {
  },
  methods: {
    stylingMenuOnoff() {
      const mnu = document.querySelector('.content-menu-box');

      if (mnu.style.display === 'none') mnu.style.display = 'block';
      else mnu.style.display = 'none';
    },
  },
};
</script>

<style scoped>
</style>
