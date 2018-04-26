<template>
<div class="alert-modal" :data-id="dataId">
  <div class="alert-modal-content" v-html="content"></div>
  <div class="alert-btn-area">
    <a class="button-login" style="width: 100px;" @click="closeModal">확인</a>
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
  },
  methods: {
    openModal(msg) {
      this.modal.style.display = 'block';
      this.content = msg;
    },
    closeModal() {
      this.modal.style.display = 'none';
    },
  },
  mounted() {
    this.modal = document.querySelector('div.alert-modal');
    this.modal.style.width = `${this.width}px`;
    this.modal.style.height = `${this.height}px`;
  },

};
</script>

<style scoped>
.alert-modal {
  z-index: 100;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  background-color: #ffffff;
  box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.17);
  border: solid 1px #212121 !important;
  border: solid 1px var(--black-two);
  display:none;
}

.alert-modal-content {
  width: 100%;
  margin-top: 26px;
  font-size: 20px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.4;
  letter-spacing: -0.5px;
  text-align: center;
  color: #212121;
}

.alert-btn-area {
  margin-top: 26px;
  margin-bottom: 300px;
  text-align: center;
}

.alert-modal-btn {
  width: 100px;
  height: 40px;
  background-color: #212121;
  border: solid 1px #999999;
}

.alert-btn-name {
  font-size: 18px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 2.67;
  letter-spacing: -0.5px;
  text-align: left;
  color: #ffffff;
}

div.btn-times {
  width: 100%;
  height: 100%;
  position: relative;
  border-radius: 6px;
}

div.btn-times:before, div.btn-times:after {
  content: '';
  position: absolute;
  width: 30px;
  height: 2px;
  background-color: #212121;
  border-radius: 2px;
  top: 23px;
  box-shadow: 0 0 2px 0 #ccc;
}

div.btn-times:before {
  -webkit-transform: rotate(45deg);
  -moz-transform: rotate(45deg);
  transform: rotate(45deg);
  left: 9px;
}

div.btn-times:after {
  -webkit-transform: rotate(-45deg);
  -moz-transform: rotate(-45deg);
  transform: rotate(-45deg);
  right: 9px;
}

.scroll {
  height: 50%;
  overflow: scroll;
}

.scroll::-webkit-scrollbar {
  width: 8px;
}

.scroll::-webkit-scrollbar-thumb {
  border-radius: 4px;
  background-color: #dadada;
}

.csView {
  display: inline-block;
  font-size: 18px;
  line-height: 1;
  letter-spacing: -0.5px;
  color: #808080;
}

@media screen and (max-width: 486px) {
  .alert-modal {
    width: 80% !important;
    height: 80% !important;
  }

  .alert-modal-btn {
    top: 4.4%;
    left: 92%;
  }
}
</style>
