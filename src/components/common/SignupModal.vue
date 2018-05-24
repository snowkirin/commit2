<template>
<div class="signup-frame" :data-id="dataId">
  <div class="signup-content">
    <div class="custom-modal-title">{{ title }}
      <div class="custom-modal-btn" @click="closeModal">
        <div class="btn-times"></div>
      </div>
    </div>
    <div class="custom-modal-content scroll" v-html="content">
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'signup-modal',
  components: {
  },
  data() {
    return {
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
    content: {
      type: String,
      default: '',
    },
    width: {
      type: String,
      default: '705',
    },
    height: {
      type: String,
      default: '635',
    },
  },
  methods: {
    openModal() {
      this.modal.style.display = 'block';
    },
    closeModal() {
      this.modal.style.display = 'none';
    },
  },
  mounted() {
    this.modal = document.querySelector(`div.signup-frame[data-id="${this.dataId}"]`);

    if (this.modalType === 'csView') {
      this.modal.style.border = 'solid 1px #333333';
      this.modal.style.backgroundColor = '#f5f5f5';
      this.modal.querySelector('.custom-modal-title').style.cssText = 'border-bottom: 1px solid #333333; background-color: #FFFFFF;';
      this.modal.querySelector('.custom-modal-content').style.height = '68.5%';
    }
  },

};
</script>

<style scoped>
.signup-frame {
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

.signup-content {
  position: absolute;
  top: 50%;
  left: 50%;
  box-sizing: border-box;
  min-width: 300px;
  width: 705px;
  height: 85%;
  padding: 25px;
  background-color: #ffffff;
  box-shadow: rgba(0, 0, 0, 0.2) 5px 5px 30px 0px;
  border: solid 1px #333333 !important;
  border: solid 1px var(--black-two);
  opacity: 1;
  transform: translate(-50%, -50%) scale(1);
}

.custom-modal-title {
  width: 100%;
  padding-bottom: 20px;
  font-size: 23px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.08;
  letter-spacing: -0.7px;
  text-align: left;
  color: #333333;
  box-sizing: border-box;
}

.custom-modal-content {
  font-size: 14px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.71;
  letter-spacing: -0.4px;
  text-align: left;
  color: #333333;
}

.custom-modal-btn {
  width: 48px;
  height: 48px;
  background-color: #FFFFFF;
  position: absolute;
  opacity: 1;
  top: 5%;
  left: 95%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
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
  background-color: #333333;
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
  height: 96%;
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
  font-size: 16px;
  line-height: 1;
  letter-spacing: -0.5px;
  color: #808080;
}


@media screen and (max-width: 486px) {
  .signup-frame {
    top: 0;
    background: rgba(0,0,0,.7);
  }

  .signup-content {
    width: 80% !important;
    height: 80% !important;
  }

  .custom-modal-btn {
    top: 6.3%;
    left: 91.4%;
  }

  .scroll {
    height: 94%;
    overflow: scroll;
  }
}
</style>
