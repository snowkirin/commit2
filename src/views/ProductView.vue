<template>
  <!-- 이곳에는 상품 정보들이 담겨 있는 곳 -->
  <div>
    <!-- Image List -->
    <div class="wrapper">
      <div v-for="item in showList" :key="item" class="item">
        <img
          v-lazyload
          src="@/assets/img/no-image.svg"
          :data-src="`https://picsum.photos/200/300?image=${item}`"
          data-err="@/assets/img/no-image.svg"
        />
      </div>
    </div>
    <infinite-loading @infinite="infiniteHandler"></infinite-loading>
  </div>
</template>

<script>
import InfiniteLoading from "vue-infinite-loading";

export default {
  name: "ProductView",
  components: {
    InfiniteLoading
  },
  data() {
    return {
      showList: [],
      originalList: []
    };
  },
  methods: {
    infiniteHandler($state) {
      setTimeout(() => {
        const temp = [];
        if (this.showList.length >= this.originalList.length) {
          $state.complete();
        } else {
          for (
            let i = this.showList.length + 1;
            i <= this.showList.length + 20;
            i++
          ) {
            temp.push(i);
          }
          this.showList = this.showList.concat(temp);
          $state.loaded();
        }
      }, 1000);
    }
  },
  created() {
    for (let i = 0; i < 100; i++) {
      this.originalList.push(i);
    }
  }
};
</script>

<style scoped lang="scss">
.item {
  display: inline-block;
  width: 33%;
  vertical-align: top;
  img {
    width: 100%;
  }
}
</style>
