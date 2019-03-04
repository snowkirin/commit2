<template>
  <div>
    <div>
      <p>
        {{ title }}
      </p>
    </div>
    <div>
      <ul
        class="list"
      >
        <li
          v-for="(item, idx) in listData"
          class="item"
          :class="[{'selected': activeIndex === idx}, {'disabled': item.exception}]"
          :key="idx"
          @click="selected(item, idx)"
        >
          <span>{{ item.name }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: "FlexList",
    props: {
      title: {
        type: String,
        default: ''
      },
      listData: {
        type: Array,
        required: true,
        default: function() {
          return [];
        }
      }
    },
    data() {
      return {
        activeIndex: undefined
      }
    },
    methods: {
      selected(item, idx) {
        if (item.exception) {
          return false;
        }
        this.activeIndex = idx;
        this.$emit('func', item);
      }
    }
  }
</script>

<style scoped lang="scss">
  .list {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    background-color: #f5f5f5;
    .item {
      display: inline-flex;
      width: calc(25% + ( 1px / 1.333 ));
      align-items: center;
      justify-content: center;
      border: 1px solid #c4c4c4;
      color: #bbb;
      margin-left: -1px;
      margin-top: -1px;
      position: relative;
      top: 1px;
      left: 1px;
      height: 50px;
      cursor: pointer;
      background-color: #fff;
      &.disabled {
        color: #bbb;
        background-color: #f5f5f5;
        border: 1px solid #dadada;
        cursor: not-allowed;
      }
      &.selected {
        color: #3d3d35;
        outline: 2px solid #3d3d35;
        outline-offset: -2px;
        font-weight: 700;
        z-index: 1;
      }
    }
  }
</style>
