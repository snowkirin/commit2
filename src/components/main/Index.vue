<template>
  <div class="container">
		<MainFirst/>
		<MainHowToUse/>
		<MainReviewer/>
		<MainFaq/>
  </div>
</template>

<script>
import MainFirst from './MainFirst';
import MainHowToUse from './MainHowToUse';
import MainReviewer from './MainReviewer';
import MainFaq from './MainFaq';
export default {
  name: 'MainIndex',
  components: {
		MainFirst,
		MainHowToUse,
		MainReviewer,
		MainFaq
  }
};
</script>

<style scoped lang="scss">
/* Main Common Style */
@media (min-width: 768px) {
  .contents {
    /*width: 1200px;*/
    /*margin: 0 auto;*/
  }
}
</style>
