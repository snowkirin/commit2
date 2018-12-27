<template>
  <div>
    <div class="grid-flex">
      <ProductsItem
        :product-data="data"
        product-target="productA"
        product-name="TYPE A"
      />
      <ProductsItem
        :product-data="data"
        product-target="productB"
        product-name="TYPE B"
      />
    </div>
    <div class="button-wrap">
      <button
        class="btn h-56"
        :class="[{'btn-primary' :TomorrowSelected === 'TYPE A'}, {'btn-secondary' :TomorrowSelected !== 'TYPE A'}]"
        type="button" @click="changeType('TYPE A')">TYPE A {{TomorrowSelected === 'TYPE A'? '선택됨' : '선택하기'}}</button>
      <button
        class="btn h-56"
        :class="[{'btn-primary' :TomorrowSelected === 'TYPE B'}, {'btn-secondary' :TomorrowSelected !== 'TYPE B'}]"
        type="button" @click="changeType('TYPE B')">TYPE B {{TomorrowSelected === 'TYPE B'? '선택됨' : '선택하기'}}</button>
    </div>
  </div>
</template>

<script>
import ProductsItem from './Products_Item.vue';
import { mapActions, mapGetters } from 'vuex';
export default {
  name: 'Products',
  components: {
    ProductsItem
  },
  props: {
    data: {
      type: Object
    }
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      TomorrowSelected: 'closet/TomorrowSelected'
    })
  },
  methods: {
    ...mapActions({
      UPDATE_TOMORROW_SELECTED: 'closet/UPDATE_TOMORROW_SELECTED'
    }),
    changeType(param) {
      this.$dialog.alert(
        `${param}를 선택하셨습니다.`,
        this.$common.dialogAlertOptions
      );
      this.UPDATE_TOMORROW_SELECTED(param);
    }
  }
};
</script>

<style scoped lang="scss">
.grid-flex {
  @include mobile {
    margin-top: -25px;
  }
  @include tablet {
    margin-left: -15px;
  }
}
.button-wrap {
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #fff;
  z-index: 1000;
  @include desktop {
    display: none;
  }
  button {
    &:nth-child(2) {
      margin-left: 1px;
    }
  }
}
</style>
