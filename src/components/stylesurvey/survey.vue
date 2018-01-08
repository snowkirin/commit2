<template>
  <div class="style-survey ui">
    <component v-bind:is="getSurveyView"></component>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Step1 from '@/components/stylesurvey/step1';
import Step2 from '@/components/stylesurvey/step2';
import Step3 from '@/components/stylesurvey/step3';
import Step4 from '@/components/stylesurvey/step4';

export default {
  name: 'style-survey',
  components: {
    Step1,
    Step2,
    Step3,
    Step4,
  },
  computed: mapGetters([
    'getSurveyView',
  ]),
  methods: {
    ...mapActions([
      'setSurveyView',
    ]),
  },
  watch: {
    $route(to) {
      const viewIdx = (to.params.id === undefined) ? '1' : to.params.id;
      this.setSurveyView(viewIdx);
    },
  },
  created() {
    if (this.$route.params.id !== undefined) this.$store.dispatch('setSurveyView', this.$route.params.id);
  },
};
</script>

<style scoped>
  div.style-survey {
    margin-top: 20px;
  }
</style>
