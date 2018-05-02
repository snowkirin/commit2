<template>
<div class="custom-modal" :data-id="this.modalType">
  <div class="custom-modal-title">
    {{ title }}
    <div v-if="this.modalType === 'csView'" class="csView">(상담사 업무시간 : 오전 10시~오후 5시)</div>
    <div class="custom-modal-btn" @click="closeModal">
      <div class="btn-times"></div>
    </div>
  </div>
  <div class="custom-modal-content scroll">
    <component v-bind:is="modalType" :data-id="dataId"></component>
  </div>
</div>
</template>

<script>
import PastView from '@/components/common/modal/PastView';
import CsView from '@/components/common/modal/CsView';

export default {
  name: 'custom-modal',
  components: {
    PastView,
    CsView,
  },
  data() {
    return {
      modal: null,
    };
  },
  props: {
    modalType: {
      type: String,
      default: '',
    },
    dataId: {
      type: String,
    },
    title: {
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
    parentRefCall() {
      this.closeModal();
      this.$parent.setInquiriesList();
    },
  },
  mounted() {
    this.modal = document.querySelector(`div.custom-modal[data-id="${this.modalType}"]`);
    this.modal.style.width = `${this.width}px`;
    this.modal.style.height = `${this.height}px`;

    if (this.modalType === 'csView') {
      this.modal.style.border = 'solid 1px #212121';
      this.modal.style.backgroundColor = '#f5f5f5';
      this.modal.querySelector('.custom-modal-title').style.cssText = 'border-bottom: 1px solid #212121; background-color: #FFFFFF;';
      this.modal.querySelector('.custom-modal-content').style.height = '66.5%';
    }
  },

};
</script>

<style scoped>
.custom-modal {
  z-index: 100;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  width: 705px;
  height: 635px;
  background-color: #ffffff;
  box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.17);
  border: solid 1px #212121;
  border: solid 1px var(--black-two);
  display:none;
}

.custom-modal-title {
  width: 100%;
  padding: 25px;
  font-size: 26px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.08;
  letter-spacing: -0.7px;
  text-align: left;
  color: #212121;
  box-sizing: border-box;
}

.custom-modal-content {
  width: 92.9%;
  padding: 0 0 20px 20px;
  font-size: 14px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.71;
  letter-spacing: -0.4px;
  text-align: left;
  color: #212121;
}

.custom-modal-btn {
  width: 48px;
  height: 48px;
  background-color: #FFFFFF;
  position: absolute;
  opacity: 1;
  top: 7.4%;
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
  height: 84%;
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
  .custom-modal {
    width: 80% !important;
    height: 80% !important;
  }

  .custom-modal-btn {
    top: 5.3%;
    left: 91.4%;
  }

  .scroll {
    height: 78%;
    overflow: scroll;
  }
}
</style>
