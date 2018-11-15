<template>
  <!-- Mobile Version -->
  <div>
    <component
      :is="whichStep"
      :productData="productData"
      @sequence="setSequence"
      @selectProduct="selectProduct"
      :selectedProduct="selectedProduct"
    ></component>
  </div>

</template>

<script>
export default {
  name: 'ItemPayment',
  components: {
    Step1: () => import('./ItemPayment_Step1'),
    Step2: () => import('./ItemPayment_Step2'),
    Step3: () => import('./ItemPayment_Step3')
  },
  data() {
    return {
      productData: [
        {
          image: {
            path: 'https://placeimg.com/640/860/people'
          },
          product: {
            id: 4985092180912,
            name: '레드 슬림 롱 트렌치',
            brand: '어몽',
            price: 138000
          }
        },
        {
          image: {
            path: 'https://placeimg.com/640/860/tech'
          },
          product: {
            id: 7808431231238,
            name: '폴딩 스커트',
            brand: '유니스',
            price: 78000
          }
        }
      ],
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
    }
  }
};
</script>

<style scoped lang="scss">
</style>
