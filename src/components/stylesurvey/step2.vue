<template>
  <div>
    <div>
      <p>아래 사진을 보고 "가장 받고 싶은"</p>
      <p>스타일을 2가지 선택해주세요.</p>
    </div>
    <div class="ui two column row celled grid container">
      <div class="eight wide column favoriteImage" v-for="myFavorite in myFavoriteList" @click="selectedImage(myFavorite.key)" v-bind:class="{ selected_dbb: myFavorite.selected }">
        <img class="ui massive rounded image centered" v-bind:src="myFavorite.image" >
        <div class="middle">
          <i class="empty big heart icon"></i>
        </div>
      </div>
    </div>

    <div class="ui two column row grid container">
      <div class="eight wide column div-align-left">
        <button class="Grey massive ui button">
          Prev
        </button>
      </div>
      <div class="eight wide column div-align-right">
        <button class="Grey massive ui button">
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
    'myFavoriteList',
  ]),
  methods: {
    ...mapActions([
    ]),
  },
  created() {
    this.$store.dispatch('setMyFavoriteList');

    console.log(this.myFavoriteList);
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
  opacity: 1;
  position: absolute;
  top: 80%;
  left: 75%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%)
}

.favoriteImage:hover .image {
  opacity: 0.7;
  border: 3px solid red;
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
