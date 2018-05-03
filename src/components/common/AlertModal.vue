<template>
<div class="alert-frame">
  <div class="alert-content">
    <div class="alert-message en-font" v-html="content"></div>
    <a class="button-alert" @click="closeModal">확인</a>
  </div>
</div>
</template>

<script>
export default {
  name: 'alert-modal',
  components: {
  },
  data() {
    return {
      content: '',
      type: 'alert',
      path: null,
      modal: null,
    };
  },
  props: {
    dataId: {
      type: String,
    },
    title: {
      type: String,
      default: '',
    },
    width: {
      type: String,
      default: '300',
    },
    height: {
      type: String,
      default: '138',
    },
    isConfirm: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    openModal(msg, type, path) {
      this.modal.style.display = 'block';
      this.content = msg;
      this.type = type;
      this.path = path;
    },
    closeModal() {
      if (this.type === 'confirm') {
        this.$emit('update:isConfirm', true);
        if (this.path !== null) {
          this.$router.push({ path: this.path });
        }
      }
      this.modal.style.display = 'none';
    },
  },
  mounted() {
    this.modal = document.querySelector('div.alert-frame');
  },
};
</script>

<style scoped>
.alert-frame {
  display: none;
  position: fixed;
  overflow: hidden;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: transparent;
  z-index: 1000;
  opacity: 1;
  text-align: center;
}

.alert-content {
  position: absolute;
  top: 50%;
  left: 50%;
  box-sizing: border-box;
  min-width: 300px;
  width: inherit;
  height: inherit;
  padding: 25px;
  background-color: #ffffff;
  box-shadow: rgba(0, 0, 0, 0.2) 5px 5px 30px 0px;
  border: solid 1px #212121 !important;
  border: solid 1px var(--black-two);
  opacity: 1;
  transform: translate(-50%, -50%) scale(1);
}

.alert-message {
  width: 100%;
  margin-bottom: 20px;
  font-size: 18px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.4;
  letter-spacing: -0.2px;
  text-align: center;
  color: #212121;
}

@media screen and (max-width: 486px) {
  .alert-frame {
    top: 0;
    background: rgba(0,0,0,.7);
  }
}
</style>
