<template>
  <!-- 이곳에는 상품 정보들이 담겨 있는 곳 -->
  <div v-if="data">
    <div class="list">
      <div
        v-for="(item, idx) in data"
        :key="idx"
        class="item"
        :class="{'selected': _.includes(activeIndex, idx)}"
        @click="clickItem(item, idx)"
      >
        <div class="thumb">
          <img
            v-lazyload
            src="@/assets/img/no-image.svg"
            :data-src="`http://dev-image.zuly.co.kr/medium/${item.image_path}`"
            data-err="@/assets/img/no-image.svg"
          />
        </div>
        <div class="after">
          <i class="menu-icon material-icons">favorite</i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ProductList",
    props: ['data'],
    data() {
      return {
        activeIndex: []
      }
    },
    components: {
    },
    methods: {
      clickItem(item, idx) {
        if (_.includes(this.activeIndex, idx)) {
          // 여기에 데이터 집어넣기
          this.activeIndex = _.without(this.activeIndex, idx);
        } else {
          // 아마 이건 필요없어지지 않을까 싶음
          this.activeIndex.push(idx);
        }
        this.$emit('func', item);
      }
    },
    created(){
    }
  };
</script>

<style scoped lang="scss">
  .list {
    display: flex;
    flex-flow: wrap;
    margin-top: -10px;
    margin-left: -10px;
    .item {
      display: flex;
      flex-direction: column;
      flex: 1 1 calc(25% - 10px);
      position: relative;
      margin-top: 10px;
      cursor: pointer;
      margin-left: 10px;
      overflow: hidden;
      border-radius: 10px;
      -webkit-box-shadow: 0 1px 2px 0 rgba(60,64,67,.3), 0 2px 6px 2px rgba(60,64,67,.15);
      -moz-box-shadow: 0 1px 2px 0 rgba(60,64,67,.3), 0 2px 6px 2px rgba(60,64,67,.15);
      box-shadow: 0 1px 2px 0 rgba(60,64,67,.3), 0 2px 6px 2px rgba(60,64,67,.15);
      .thumb {
        flex: 1 1 0;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .after {
        display: none;
      }
      &.selected {
        /*outline: 2px solid #ec4b1a;*/
        .after {
          position: absolute;
          display: flex;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0,0,0,.5);
          align-items: center;
          justify-content: center;
        }
      }
      .menu-icon {
        color: #ec4b1a;
        font-size: 5em;
      }

    }
  }


</style>
