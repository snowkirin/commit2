<template>
  <!-- 이곳에는 상품 정보들이 담겨 있는 곳 -->
  <div>
    <ProductList/>
    <!-- Image List -->
    <div class="list">
      <div
        v-for="(item, idx) in list"
        :key="idx"
        class="item"
        :class="{'selected': _.includes(activeIndex, idx)}"
        @click="clickItem(item)"
      >
        <i class="menu-icon material-icons">favorite</i>
        <div class="thumb">
          <img
            v-lazyload
            src="@/assets/img/no-image.svg"
            :data-src="`http://dev-image.zuly.co.kr/'medium/${item.image_path}`"
            data-err="@/assets/img/no-image.svg"
          />
        </div>
      </div>
    </div>
    <infinite-loading @infinite="infiniteHandler"></infinite-loading>
  </div>
</template>

<script>
  import ProductList from '@/components/Common/ProductList.vue';
import InfiniteLoading from "vue-infinite-loading";

export default {
  name: "ProductView",
  props: [],

  components: {
    ProductList,
    InfiniteLoading
  },
  data() {
    return {
      page: 1,
      list: [],
    };
  },
  methods: {
    infiniteHandler($state) {
      setTimeout(() => {
        const temp = [];
        if (this.showList.length >= this.originalList.length) {
          $state.complete();
        } else {
          for (let i = this.showList.length + 1; i <= this.showList.length + 16; i++) {
            temp.push(i);
          }
          this.showList = this.showList.concat(temp);
          $state.loaded();
        }
      }, 1000);
    },
    clickItem(data) {
      if (_.includes(this.activeIndex, data)) {
        // 여기에 데이터 집어넣기
        this.activeIndex = _.without(this.activeIndex, data);
      } else {
        // 아마 이건 필요없어지지 않을까 싶음
        this.activeIndex.push(data);
      }
    }
  },
  created() {
  }
};
</script>

<style scoped lang="scss">
.list {
  display: flex;
  flex-flow: wrap;
  margin-top: -10px;
  .item {
    display: flex;
    flex-direction: column;
    flex: 1 1 calc(50% - 5px);
    position: relative;
    margin-top: 10px;
    cursor: pointer;

    &.selected {
      outline: 2px solid #ec4b1a;
    }
    &:nth-child(2n) {
      margin-left: 10px;
    }
    .menu-icon {
      position: absolute;
      flex: none;
    }
    .thumb {
      flex: 1 1 0;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}


</style>
