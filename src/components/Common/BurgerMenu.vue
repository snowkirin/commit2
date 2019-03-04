<template>
  <Slide
    @openMenu="handleOpenMenu"
    @closeMenu="handleCloseMenu"
    right
    width="320"
  >
    <router-link to="/" class="menu-text">메인</router-link>
    <router-link to="/join" class="menu-text">회원 가입</router-link>
    <router-link to="/closet" class="menu-text">옷장</router-link>


    <!--<a href="#" class="menu-item">
      &lt;!&ndash;<i class="menu-icon material-icons">3d_rotation</i>&ndash;&gt;
      <span class="menu-text">회원 가입</span>activeIndex(oldVal,newVal) {
    //   console.log(oldVal, newVal);
    //   this.activeIndex = newVal;
    // }
    </a>
    <a href="#" class="menu-item">
      <span class="menu-text">옷장</span>
    </a>-->
  </Slide>
</template>

<script>
import { Slide } from "vue-burger-menu";
export default {
  name: "BurgerMenu",
  components: {
    Slide
  },
  methods: {
    handleOpenMenu() {
      console.log("Open");
    },
    handleCloseMenu() {
      console.log("Close");
    }
  }
};
</script>

<style scoped lang="scss">
.menu-item {
  .menu-icon,
  .menu-text {
    color: #000;
    font-size: 20px;
  }
  .menu-icon {
  }
}
.menu-text {
  white-space: nowrap;
}
</style>
