<template>
  <div>
    <div>
      <p>아래 사진을 보고 "가장 받고 싶은"</p>
      <p>스타일을 2가지 선택해주세요.</p>
    </div>
    <div class="ui two column row celled grid container">
      <div class="eight wide column favoriteImage" v-for="myFavorite in myFvList" @click="selectedImage(myFavorite.key)">
        <img class="ui massive rounded image centered" v-bind:src="myFavorite.image" >
        <div class="middle" v-bind:class="{ 'show-middle': myFavorite.selected }">
          <i class="heart red big icon"></i>
        </div>
      </div>
    </div>

    <div class="ui two column row grid container">
      <div class="eight wide column div-align-left">
        <button class="Grey massive ui button" @click="prevStep()">
          Prev
        </button>
      </div>
      <div class="eight wide column div-align-right">
        <button class="Grey massive ui button" @click="nextStep()">
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'survey-step2',
  components: {
  },
  computed: mapGetters([
    'myFvList',
    'fvSelectedList',
  ]),
  methods: {
    ...mapActions([
      'setSelectedImage',
      'setSurveyView',
    ]),
    selectedImage(key) {
      if (!this.fvSelectedList.has(key)) {
        if (this.fvSelectedList.size > 1) {
          alert('이미 2가지 스타일을 고르셨어요.');
        } else {
          this.setSelectedImage({ imgKey: key, cat: 2 });
        }
      } else {
        this.setSelectedImage({ imgKey: key, cat: 2 });
      }
    },
    prevStep() {
      this.$router.push({ path: '/stylesurvey/1' });
      this.setSurveyView(this.$route.params.id);
    },
    nextStep() {
      this.$router.push({ path: '/stylesurvey/3' });
      this.setSurveyView(this.$route.params.id);
    },
  },
  created() {
    this.$store.dispatch('setMyFavoriteList');
  },
};
</script>

<style scoped>
div.survey-step2 {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  width: 100%;
}

.div-align-left {
  text-align: left;
}

.div-align-right {
  text-align: right;
}

.selected_dbb {
  background-color: #ff838344;
}

.middle {
  transition: .5s ease;
  position: absolute;
  opacity: 0;
  top: 85%;
  left: 80%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%)
}

.show-middle {
  opacity: 1;
}

.favoriteImage:hover .image {
  opacity: 0.7;
}

@media screen and (min-width: 480px) {
  img {
    height: 500px !important;
  }
}

@media screen and (max-width: 480px) {
  img {
    height: 180px !important;
  }
}
</style>
