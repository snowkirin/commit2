<template>
  <div>
    <div>
      <p>피하고 싶은 색상을 모두 선택해주세요.</p>
    </div>
    <div class="ui four column row grid container" style="margin-top: 25px;">
      <div class="five wide column ui colors" v-for="color in exceptColors" v-bind:style="{ 'background-color': '#'+ color.code }" @click="selectedColors(color.key)">
        <div v-if="color.text === 'white'" class="middle" style="color: black;">
          {{ color.text }}
        </div>
        <div v-else class="middle" style="color: white;">
          {{ color.text }}
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
  name: 'survey-step3',
  components: {
  },
  computed: mapGetters([
    'exceptColors',
    'selectedExceptColors',
  ]),
  methods: {
    ...mapActions([
      'setSelectedColor',
    ]),
    selectedColors(key) {
      this.setSelectedColor({ colorKey: key, cat: 1 });
      console.log(this.selectedExceptColors);
    },
  },
  created() {
    this.$store.dispatch('setExceptionColors');
  },
};
</script>

<style scoped>
div.container {
  height: auto;
}

.div-align-left {
  text-align: left;
}

.div-align-right {
  text-align: right;
}

.colors {
  height: 100px;
  margin: 3px 3px 3px 3px;
}

.middle {
  font-family: HanSans;
  font-size: 14px;
  line-height: 1.42857143;
  font-weight: bold;
  position: absolute;
  opacity: 1;
  top: 15%;
  left: 23%;
  transform: translate(-35%, -50%);
  -ms-transform: translate(-35%, -50%)
}

.colors:hover {
  opacity: 0.4;
}
</style>
