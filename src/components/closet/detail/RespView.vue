<template>
  <component v-bind:is="viewType"></component>
</template>

<script>
import { mapActions } from 'vuex';
import CustomerService from '@/components/closet/detail/CustomerService';
import MCustomerService from '@/components/closet/detail/MCustomerService';

export default {
  name: 'respView',
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
      if (window.outerWidth <= 486) this.viewType = 'mCustomerService';
      else this.viewType = 'customerService';
    },
  },
  created() {
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
