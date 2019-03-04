<template>
  <div>
    <div>
      <p
        v-if="displayText"
        class="display-text"
      >
        {{ displayText }}
      </p>
    </div>
    <ul class="list">
      <li
        v-for="(item, idx) in listData"
        :key="idx"
        class="item"
        :class="{'selected': activeIndex === idx}"
        @click="onClick(item, idx)"
      >
        <img :src="`${require('@/assets/img/join/img_body' + (idx+1) +'.png')}`" alt="">
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "BodyType",
    props: {
      listData: {
        type: Array,
        required: true
      }
    },
    data() {
      return {
        displayText: '',
        activeIndex: undefined
      }
    },
    methods: {
      onClick(item, idx) {
        this.activeIndex = idx;
        this.displayText = item.description;

        this.$emit('func', item)
      }
    }
  }
</script>

<style scoped lang="scss">
  .display-text {
    font-size: 14px;
    text-align: center;
    color: #797979;
    padding: 10px 25px;
    background-color: #f5f5f5;
    margin-bottom: 10px;
  }
  .list {
    display: flex;
    flex-flow: wrap;
    margin-top: -10px;
    margin-left: -10px;
    align-items: center;
    justify-content: center;
    .item {
      width: calc(33.33333% - 10px);
      cursor: pointer;
      border: 1px solid #c4c4c4;
      flex-direction: column;
      margin-left: 10px;
      margin-top: 10px;
      img {
        width: 100%;
        opacity: 0.3;
      }
      &.selected {
        outline: 2px solid #333;
        outline-offset: -2px;
        img {
          opacity: 1;
        }
      }
    }
  }
</style>
