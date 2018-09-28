<template>
    <component :is="subscriptionType"></component>
</template>

<script>
import Information from './Information';
import Restart from './Restart';
export default {
  name: 'Index_Subscription-Info',
  data() {
    return {
      type: 111
    };
  },
  computed: {
    subscriptionType() {
      if (this.type === 111) {
        return Information;
      } else {
        return Restart;
      }
    }
  },
  created() {}
};
</script>

<style scoped lang="scss" src="@/assets/css/closet-style.scss">
</style>
<style scoped>
</style>
