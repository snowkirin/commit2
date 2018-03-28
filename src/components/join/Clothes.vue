<template>
  <div class="clothes subContent mauto">
    <div class="content-title mt30">티셔츠/스웻셔츠</div>
    <div class="explain mt15">
      받고 싶지 않은 스타일을 모두 선택해주세요.
    </div>
    <div class="clothesLine mt25"></div>
    <div class="clothes-form w100 mauto" style="margin-top: 23px;">
      <template v-for="(clothe, k) in printClothes">
        <div
          v-bind:key="k"
          class="clothes-card d-inlineblock"
          :data-id="clothe.id"
          :data-selected="clothe.selected"
          :class="{ 'card-oncolor': clothe.selected }"
          @click="pickClothes(clothe.id)"
        >
          <div class="clothes-images">
            {{ clothe.src }}
          </div>
          <div class="clothes-text">
            {{ clothe.title }}
          </div>
          <div class="clothes-btn" v-show="clothe.selected" :class="{ 'card-btn-oncolor': clothe.selected }">
            <div class="btn-times" :class="{ 'on': clothe.selected }"></div>
          </div>
        </div>
      </template>
      <div class="mt50">
        <div style="width: 392px; float: right;">
          <button class="button-login" @click="moveNext">
            다음
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'clothes',
  computed: {
    ...mapGetters({
      clothes: 'signup/getClothes',
      selectedClothes: 'signup/getSelectClothes',
    }),
    printClothes() {
      const rtn = this.clothes;

      for (let i = 0; i < rtn.length; i += 1) {
        if (this.selectedClothes.indexOf(rtn[i].id) > -1) rtn[i].selected = true;
        else rtn[i].selected = false;
      }

      return rtn;
    },
  },
  methods: {
    ...mapActions({
      setClothes: 'signup/setClothes',
      pickClothes: 'signup/pickClothes',
    }),
    cardHoverEvt(obj) {
      const target = obj;

      target.onmouseover = () => {
        if (target.getAttribute('data-selected') !== 'true') {
          target.classList.remove('card-offcolor');
          target.querySelector('.clothes-btn').classList.remove('card-btn-offcolor');

          target.classList.add('card-oncolor');
          target.querySelector('.clothes-btn').classList.add('card-btn-oncolor');
          target.querySelector('.btn-times').classList.add('on');
        }
      };

      target.onmouseout = () => {
        if (target.getAttribute('data-selected') !== 'true') {
          target.classList.remove('card-oncolor');
          target.querySelector('.clothes-btn').classList.remove('card-btn-oncolor');

          target.classList.add('card-offcolor');
          target.querySelector('.clothes-btn').classList.add('card-btn-offcolor');
          target.querySelector('.btn-times').classList.remove('on');
        }
      };
    },
    moveNext() {
      this.$router.push({ path: 'patterns' });
    },
  },
  created() {
    this.setClothes();
  },
  mounted() {
    const clothesCard = document.querySelectorAll('.clothes-card');

    for (let i = 0; i < clothesCard.length; i += 1) {
      this.cardHoverEvt(clothesCard[i]);
    }
  },
};
</script>

<style scoped>
.clothesLine {
  height: 1px;
  opacity: 0.2;
  background-color: #212121;
}

.clothes-card {
  width: 186px;
  height: 245px;
  background-color: #f4f4f4;
  position: relative;
  margin: 17px 10px 0 0;
  cursor: pointer;
  border: solid 2px #f4f4f4;
}

.clothes-images {
  padding: 15px;
  width: 160px;
  height: 180px;
}

.clothes-text {
  font-size: 18px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: normal;
  text-align: center;
  color: #333333;
  padding-bottom: 15px;
}

.clothes-btn {
  width: 49px;
  height: 49px;
  position: absolute;
  opacity: 1;
  top: 9.8%;
  left: 87.4%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

div.btn-times {
  width: 100%;
  height: 100%;
  position: relative;
  border-radius: 6px;
}

div.btn-times:before, div.btn-times:after {
  content: '';
  position: absolute;
  width: 44px;
  height: 2px;
  background-color: #dadada;
  border-radius: 2px;
  top: 22px;
  box-shadow: 0 0 2px 0 #ccc;
}

div.btn-times:before {
  -webkit-transform: rotate(45deg);
  -moz-transform: rotate(45deg);
  transform: rotate(45deg);
  left: 3px;
}

div.btn-times:after {
  -webkit-transform: rotate(-45deg);
  -moz-transform: rotate(-45deg);
  transform: rotate(-45deg);
  right: 3px;
}

.on:before, .on:after {
  background-color: #FFFFFF !important;
  box-shadow: unset !important;
}

.card-oncolor {
  border: solid 2px #f45649;
  opacity: 0.8;
  background-color: #7a7979;
}

.card-offcolor {
  background-color: #f4f4f4;
}

.card-btn-oncolor {
  background-color: #fb5143;
}

.card-btn-offcolor {
  background-color: #f4f4f4;
}
</style>
