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
