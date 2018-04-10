<template>
  <component v-bind:is="dataViewType"></component>
</template>

<script>
import { mapActions } from 'vuex';
import CustomerService from '@/components/closet/detail/CustomerService';
import MCustomerService from '@/components/closet/detail/MCustomerService';

export default {
  name: 'respView',
  data() {
    return {
      dataViewType: 'mCustomerService',
    };
  },
  props: {
    viewType: {
      type: String,
      default: 'mCustomerService',
    },
  },
  components: {
    CustomerService,
    MCustomerService,
  },
  methods: {
    ...mapActions({
      setInquiriesList: 'mypage/inquiries/setInquiriesList',
    }),
    mobileVisible() {
      if (window.outerWidth <= 486) this.dataViewType = 'mCustomerService';
      else this.dataViewType = 'customerService';
    },
  },
  created() {
    this.dataViewType = this.viewType;

    this.mobileVisible();
    this.setInquiriesList();
    window.addEventListener('resize', this.mobileVisible);
  },
  destroyed() {
    window.removeEventListener('resize', this.mobileVisible);
  },
};
</script>

<style scoped>
</style>
