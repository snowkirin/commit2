<template>
  <div>
    <div>
      나의 이미지와 맞는것을 선택해주세요.
    </div>
    <div class="ui two column row celled grid">
      <div class="eight wide column dbb" v-for="myimage in myImageList" @click="selectedImage(myimage.key)" v-bind:class="{ selected_dbb: myimage.selected }">
        {{ myimage.text }}
      </div>
    </div>
<<<<<<< HEAD
    <div class="ui two column row grid container">
      <div class="eight wide column div-align-left">
      </div>
      <div class="eight wide column div-align-right">
        <button class="Grey massive ui button" @click="nextStep()">
          Next
        </button>
      </div>
=======
    <div class="step1-bottom">
      <button class="Grey massive ui button" @click="nextStep()">
        Next
      </button>
>>>>>>> first commit
    </div>
  </div>
</div?>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'survey-step1',
  components: {
  },
  computed: mapGetters([
    'myImageList',
    'selectedList',
  ]),
  methods: {
    ...mapActions([
      'setSurveyView',
      'setSelectedImage',
    ]),
    selectedImage(key) {
<<<<<<< HEAD
      this.setSelectedImage({ imgKey: key, cat: 1 });
=======
      this.setSelectedImage(key);
>>>>>>> first commit
    },
    nextStep() {
      this.$router.push({ path: '/stylesurvey/2' });
      this.setSurveyView(this.$route.params.id);
    },
  },
  created() {
    this.$store.dispatch('setMyImageList');
  },
};
</script>

<style scoped>
div.survey-step1 {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  width: 100%;
}

.dbb {
  cursor: pointer;
  border-bottom: 1px solid #d4d4d5;
}

.selected_dbb {
  background-color: #ff838344;
}

.step1-bottom {
  text-align: right;
}
</style>
