<template>
  <div class="clothes subContent mauto">
    <div class="content-title mt70">
      <span v-show="!this.Authentication.authenticated">티셔츠</span>
      <styleMenu v-show="this.Authentication.authenticated" menuTitle="티셔츠"></styleMenu>
    </div>
    <div class="explain mt8">
      받고 싶지 않은 스타일을 모두 선택해주세요.
    </div>
    <div class="clothesLine mt25"></div>
    <div class="clothes-form w100 mauto mt30">
      <template v-for="(data, k) in printData">
        <div
          v-bind:key="k"
          class="clothes-card d-inlineblock"
          :data-id="data.code"
          :data-selected="data.selected"
          v-bind:class="[k + 1 === printData.length ? 'closet-select-mobile' : '', { 'card-oncolor': data.selected }]"
          v-bind:style="{
            marginRight: (k + 1) % 5 === 0 ? '0' : '7.5px',
            marginTop: (k + 1) > 5 ? '7.5px': 0,
          }"
          @click="pickClothes({ type: 'tshirt', id: data.code })"
        >
          <div class="clothes-image-area" v-bind:style="{ 'z-index': (data.selected) ? -1 : 0 }">
            <div
              class="clothes-images"
              v-bind:style="{
                'background-image': (data.name !== '선택 없음') ? `url(${$common.IMAGEURL()}common/items/${data.code}.png)` : 'url(/static/img/signup/none_logo.png)',
              }"
            >
            </div>
          </div>
          <div class="clothes-text">
            {{ data.name }}
          </div>
          <div class="clothes-btn" v-show="data.selected" :class="{ 'card-btn-oncolor': data.selected }">
            <div class="btn-times" :class="{ 'on': data.selected }"></div>
          </div>
        </div>
      </template>
    </div>
    <styleButton customCss="float: right;" currentNumber="5"></styleButton>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import StyleMenu from '@/components/join/common/StyleMenu';
import StyleButton from '@/components/join/common/StyleButton';

export default {
  name: 'tshirt',
  data() {
    return {
      leftSize: 0,
    };
  },
  components: {
    StyleMenu,
    StyleButton,
  },
  computed: {
    ...mapGetters({
      tshirtList: 'signup/getTshirt',
      selected: 'signup/getSelectTshirt',
      Authentication: 'login/Authentication',
      mypageStyleData: 'mypage/getMypageStyleData',
    }),
    printData() {
      const rtn = this.tshirtList;

      for (let i = 0; i < rtn.length; i += 1) {
        if (this.selected.indexOf(rtn[i].code) > -1) rtn[i].selected = true;
        else rtn[i].selected = false;
      }

      return rtn;
    },
  },
  methods: {
    ...mapActions({
      setClothes: 'signup/setClothes',
      pickClothes: 'signup/pickClothes',
      setMypageStyle: 'mypage/setMypageStyle',
    }),
    moveNext() {
      this.$localStorage.set('S5', JSON.stringify(this.selected));
      this.$router.push({ path: 'skirt' });
    },
  },
  async created() {
    await this.setClothes({
      type: 'tshirt',
      text: '티셔츠',
    });

    let localStorage = this.$localStorage.get('S5');

    if (this.Authentication.authenticated) {
      if (!this.mypageStyleData.bust_size) await this.setMypageStyle();

      const exceptClothes = this.mypageStyleData.except_clothes_code.split(',');

      if (this.selected.length <= 0) {
        for (let i = 0; i < exceptClothes.length; i += 1) {
          for (let j = 0; j < this.tshirtList.length; j += 1) {
            if (exceptClothes[i] === this.tshirtList[j].code.toString()) {
              this.pickClothes({ type: 'tshirt', id: this.tshirtList[j].code });
              break;
            }
          }
        }
      }
    } else if (localStorage) {
      localStorage = JSON.parse(localStorage);
      if (this.selected.length <= 0) {
        for (let i = 0; i < localStorage.length; i += 1) {
          this.pickClothes({ type: 'tshirt', id: localStorage[i] });
        }
      }
    }
  },
};
</script>

<style scoped>
  @media screen and (max-width: 486px) {
    .closet-select-mobile {
      margin-bottom: 80px;
    }
  }
</style>
