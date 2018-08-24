<template>
<div class="address-frame">
  <div class="address-content">
    <div class="custom-modal-title">
      <div>주소찾기</div>
      <div class="custom-modal-btn" @click="closeModal">
        <div class="btn-times"></div>
      </div>
    </div>
    <div name="addressArea"></div>
  </div>
</div>
</template>

<script>
export default {
  name: 'address-modal',
  components: {},
  data() {
    return {
      modal: null
    };
  },
  props: {
    dataId: {
      type: String
    }
  },
  methods: {
    openModal() {
      this.modal.style.display = 'block';
    },
    closeModal() {
      this.modal.style.display = 'none';
    }
  },
  mounted() {
    this.modal = document.querySelector('div.address-frame');
  }
};
</script>

<style scoped>
.address-frame {
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

.address-content {
  position: absolute;
  top: 50%;
  left: 50%;
  margin: auto;
  width: 500px;
  height: 500px;
  box-sizing: border-box;
  background-color: #ffffff;
  box-shadow: rgba(0, 0, 0, 0.2) 5px 5px 30px 0px;
  border: solid 1px #333333 !important;
  border: solid 1px var(--black-two);
  opacity: 1;
  transform: translate(-50%, -50%) scale(1);
}

.custom-modal-title {
  width: 100%;
  padding: 20px;
  font-size: 23px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.08;
  letter-spacing: -0.7px;
  text-align: left;
  color: #333333;
  box-sizing: border-box;
  border-bottom: solid 1px #333333 !important;
}

.custom-modal-btn {
  width: 48px;
  height: 48px;
  background-color: #ffffff;
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

div.btn-times:before,
div.btn-times:after {
  content: "";
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

@media screen and (max-width: 486px) {
  .address-frame {
    top: 0;
    background: rgba(0, 0, 0, 0.7);
  }

  .address-content {
    width: inherit;
    height: inherit;
  }

  .custom-modal-btn {
    top: 6.3%;
    left: 91.4%;
  }
}
</style>
