<template>
<div class="address-modal" :data-id="dataId">
  <div name="addressArea"></div>
</div>
</template>

<script>
export default {
  name: 'address-modal',
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
    this.modal = document.querySelector('div.address-modal');
  },

};
</script>

<style scoped>
.address-modal {
  z-index: 100;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  width: 500px;
  height: 500px;
  background-color: #ffffff;
  box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.17);
  border: solid 1px #212121 !important;
  border: solid 1px var(--black-two);
  display:none;
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
  .address-modal {
    width: 300px !important;
    height: 500px !important;
  }
}
</style>
