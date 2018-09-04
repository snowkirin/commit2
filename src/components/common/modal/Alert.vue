<template>
  <div class="modal-contents">
    <div class="modal-header">
      <h1>{{ title }}</h1>
    </div>
    <div class="modal-content">
      <div v-if="textType === 'html'">
        <div v-html="text"></div>
      </div>
      <div v-else>
        <p>{{ text }}</p>
      </div>

    </div>
    <div class="modal-close">
      <!-- 임시 스타일 -->
      <a @click="$emit('close')">
        <i class="fa fa-times"></i>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "AlertModal",
  props: {
    title: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    },
    textType: {
      type: String
    }
  }
};
</script>
<style scoped lang="scss">
.modal-contents {
  padding: 16px 20px;
  position: relative;
  .modal-header {
    @include fontSize(15px);
    font-weight: 700;
  }
  .modal-content {
    @include fontSize(14px);
  }
  .modal-close {
    position: absolute;
    right: 21px;
    top: 18px;
    font-size: 24px;
  }
}
</style>
