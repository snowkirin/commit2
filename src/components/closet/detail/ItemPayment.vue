<template>
  <!-- Mobile Version -->
  <div>
    <component
      :is="whichStep"
      :data="data"
      @sequence="setSequence"
      @selectProduct="selectProduct"
      @init="resetData"
      :selectedProduct="selectedProduct"
    ></component>
  </div>

</template>

<script>
export default {
  name: 'ItemPayment',
  props: {
    data: Object,

  },
  components: {
    Step1: () => import('./ItemPayment_Step1'),
    Step2: () => import('./ItemPayment_Step2'),
    Step3: () => import('./ItemPayment_Step3')
  },
  data() {
    return {
      selectedProduct: [],
      sequence: 'step1'
    };
  },
  computed: {
    whichStep() {
      switch (this.sequence) {
        case 'step1':
          return 'Step1';
        case 'step2':
          return 'Step2';
        case 'step3':
          return 'Step3';
        default:
          return 'Step1';
      }
    }
  },
  methods: {
    setSequence(param) {
      this.sequence = param;
    },
    selectProduct(param) {
      this.selectedProduct = param;
    },
    resetData() {
      this.$emit('init');
    },
  }
};
</script>

<style scoped lang="scss">
</style>
