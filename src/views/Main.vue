<template>
  <div class="wrap">
    <div class="content">
      <VideoBackground />
      <BurgerMenu />
    </div>
  </div>
</template>

<script>
import BurgerMenu from "@/components/Common/BurgerMenu.vue";
import VideoBackground from "@/components/Main/VideoBackground.vue";
export default {
  name: "Main",
  components: {
    BurgerMenu,
    VideoBackground
  },
  data() {
    return {};
  },
  methods: {},
  computed: {},
  mounted() {}
};
</script>

<style scoped lang="scss">
.wrap {
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 100%;
  height: 100%;
}
.content {
  flex: 1;
}
</style>
