<template>
  <Slide
    @openMenu="handleOpenMenu"
    @closeMenu="handleCloseMenu"
    right
    width="320"
  >
    <a href="#" class="menu-item">
      <i class="menu-icon material-icons">3d_rotation</i>
      <span class="menu-text">회원 가입</span>
    </a>
    <a href="#" class="menu-item">
      <span class="menu-text">옷장</span>
    </a>
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
  .menu-text {
    white-space: nowrap;
  }
}

/deep/ .bm-burger-bars {
  background-color: #fff;
  height: 3px;
}
/deep/ .bm-menu {
  background-color: #fff;
}
</style>
