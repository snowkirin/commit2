<template>
  <div
    class="modal-contents"
    :class="modalType"
  >
    <div class="modal-header" v-if="modalTitle">
      <p>
        {{ modalTitle }}
      </p>
    </div>
    <div class="modal-content">
      <slot></slot>
      <div v-if="modalContentType === 'html'">
        <div v-html="modalContent"></div>
      </div>
      <div v-else>
        <p>
          {{ modalContent }}
        </p>
      </div>
    </div>
    <div class="modal-close">
      <a class="btn-close" @click="(modalCustomCloseFunc) ? modalCustomCloseFunc() : $emit('close')">
        <span class="icon-close"></span>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "CommonModal",
  props: {
    modalType: {
      type: String
    },
    modalTitle: {
      type: String
    },
    modalContent: {
      type: String
    },
    modalContentType: {
      type: String
    },
    modalCustomCloseFunc: {}
  },
  created() {},
  mounted() {}
};
</script>

<style scoped lang="scss">
.modal-contents {
  padding: 16px 20px;
  &.type1 {
    padding: 30px 30px 20px;
  }
  &.type2 {
    padding: 16px 20px;
  }
  .modal-content {
    margin-top: 15px;
  }
  .modal-close {
    position: absolute;
    top: 18px;
    right: 21px;
    overflow: hidden;
    .btn-close {
      cursor: pointer;
    }
    .icon-close {
      display: block;
      width: 16px;
      height: 16px;
      position: relative;
      &::before,
      &::after {
        content: "";
        display: block;
        width: 100%;
        height: 1px;
        background-color: #333;
        position: absolute;
        transform-origin: 50% 50%;
        top: 50%;
        left: 0;
      }
      &::before {
        transform: rotate(45deg);
      }
      &::after {
        transform: rotate(-45deg);
      }
    }
  }
}
</style>
