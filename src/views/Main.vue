<template>
  <div>
    <MainHeader></MainHeader>
    <div class="container">
      <MainFirst />
      <MainHowToUse />
      <MainReviewer />
      <MainFaq />
      <MainBrand />
    </div>
    <MainFooter></MainFooter>
  </div>
</template>

<script>
import MainHeader from '@/components/main/MainHeader';
import MainFirst from '@/components/main/MainFirst';
import MainHowToUse from '@/components/main/MainHowToUse';
import MainReviewer from '@/components/main/MainReviewer';
import MainFaq from '@/components/main/MainFaq';
import MainBrand from '@/components/main/MainBrand';
import MainFooter from '@/components/main/MainFooter';

export default {
  name: 'Main',
  components: {
    MainHeader,
    MainFirst,
    MainHowToUse,
    MainReviewer,
    MainFaq,
    MainBrand,
    MainFooter
  }
};
</script>

<style scoped lang="scss">
.container {
  padding-bottom: 30px;
  @media (min-width: 768px) {
    padding-bottom: 50px;
  }
  @media (min-width: 1080px) {
    padding-bottom: 80px;
  }
}
</style>
