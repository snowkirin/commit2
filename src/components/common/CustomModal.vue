<template>
<div class="custom-modal" :data-id="dataId">
  <div class="custom-modal-title">
    {{ title }}
    <div class="custom-modal-btn" @click="closeModal">
      <div class="btn-times"></div>
    </div>
  </div>
  <div class="custom-modal-content scroll">
    {{ content }}
  </div>
</div>
</template>

<script>
export default {
  name: 'custom-modal',
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
  },
  methods: {
    openModal() {
    },
    closeModal() {
      document.querySelector('.custom-modal').style.display = 'none';
    },
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
}

.custom-modal-content {
  width: 92.9%;
  padding: 0 0 25px 25px;
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
  top: 6%;
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
</style>
