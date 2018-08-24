<template>
  <component v-bind:is="dataViewType"></component>
</template>

<script>
import { mapActions } from 'vuex';
import MCustomerService from '@/components/closet/detail/MCustomerService';

export default {
  name: 'respView',
  data() {
    return {
      dataViewType: 'mCustomerService'
    };
  },
  props: {
    viewType: {
      type: String,
      default: 'mCustomerService'
    }
  },
  components: {
    MCustomerService
  },
  methods: {
    ...mapActions({
      setInquiriesList: 'mypage/inquiries/setInquiriesList'
    })
  },
  created() {
    this.dataViewType = this.viewType;
    this.setInquiriesList();
  },
  destroyed() {}
};
</script>

<style scoped>
</style>
