<template>
  <div class="content">
    <ProductList :data="list" @func="productSelect"/>
    <infinite-loading @infinite="infiniteHandler"></infinite-loading>

    <button
      type="button"
      class="btn btn-success"
      @click="onSubmit"
    >다음</button>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import AuthAPI from '@/api/auth';
  import InfiniteLoading from "vue-infinite-loading";
  import ProductList from '@/components/Common/ProductList.vue'
  export default {
    name: "PreferredStyle",
    components: {
      InfiniteLoading,
      ProductList
    },
    data() {
      return {
        page: 1,
        list: [],
        selectedProductList: {
          preferProducts: []
        },
      }
    },
    computed: {
      ...mapGetters({
        SizeData: 'join/SizeData'
      }),
    },
    methods: {
      ...mapActions({
        SaveJoinData: 'join/SaveJoinData'
      }),
      infiniteHandler($state) {
        setTimeout(() => {
          AuthAPI.GetProduct({
            params: {
              blouseSize: this.SizeData.blouseSize,
              skirtSize: this.SizeData.skirtSize,
              pantsSize: this.SizeData.pantsSize,
              page: this.page,
            }
          }).then(({data}) => {
            if (data.data.length) {
              this.page += 1;
              this.list.push(...data.data);
              $state.loaded();
            } else {
              $state.complete();
            }
          });
        }, 1000)
      },
      productSelect(param) {
        let index = _.findIndex(this.selectedProductList.preferProducts, {productId: param.id});
        if (index === -1) {
          this.selectedProductList.preferProducts.push({
            productId: param.id,
            favorite_flag: true,
            demand_flag: true
          });
        } else {
          if (this.selectedProductList.preferProducts[index].favorite_flag && this.selectedProductList.preferProducts[index].demand_flag) {
            this.selectedProductList.preferProducts.splice(index, 1, {
              productId: param.id,
              favorite_flag: false,
              demand_flag: false
            })
          } else {
            this.selectedProductList.preferProducts.splice(index, 1, {
              productId: param.id,
              favorite_flag: true,
              demand_flag: true
            })
          }
        }
      },
      onSubmit() {
        console.log(this.selectedProductList);
        this.SaveJoinData('preferred-style', this.selectedProductList);
      }
    },
    mounted() {
      // 미리 선택해둔 값이 있으면 빨갛게 표시
      console.log(this.SizeData);
    }
  }
</script>

<style scoped lang="scss">
  .btn-success {
    background-color: #3d3d35;
    color: #fff;
    width: 100%;
    height: 50px;
    position: fixed;
    bottom: 0;
    left: 0;
  }
</style>
