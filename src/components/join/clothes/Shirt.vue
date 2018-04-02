<template>
  <div class="clothes subContent mauto">
    <div class="content-title mt30">
      셔츠
      <styleMenu v-show="this.Authentication.authenticated" leftSize="55%"></styleMenu>
    </div>
    <div class="explain mt15">
      받고 싶지 않은 스타일을 모두 선택해주세요.
    </div>
    <div class="clothesLine mt25"></div>
    <div class="clothes-form w100 mauto" style="margin-top: 23px;">
      <template v-for="(data, k) in printData">
        <div
          v-bind:key="k"
          class="clothes-card d-inlineblock"
          :data-id="data.code"
          :data-selected="data.selected"
          :class="{ 'card-oncolor': data.selected }"
          v-bind:style="{
            marginRight: (k + 1) % 5 === 0 ? '0' : '7.5px',
            marginTop: (k + 1) > 5 ? '7.5px': 0,
          }"
          @click="pickClothes({ type: 'shirt', id: data.code })"
        >
          <div class="clothes-image-area" v-bind:style="{ 'z-index': (data.selected) ? -1 : 0 }">
            <div
              class="clothes-images"
              v-bind:style="{
                backgroundImage: `url(http://dev-image.zuly.co.kr/common/items/${data.code}.png)`,
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
    <styleButton customCss="float: right;"></styleButton>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import StyleMenu from '@/components/join/common/StyleMenu';
import StyleButton from '@/components/join/common/StyleButton';

export default {
  name: 'shirt',
  components: {
    StyleMenu,
    StyleButton,
  },
  computed: {
    ...mapGetters({
      dataList: 'signup/getShirt',
      selected: 'signup/getSelectShirt',
      Authentication: 'login/Authentication',
      mypageStyleData: 'mypage/getMypageStyleData',
    }),
    printData() {
      const rtn = this.dataList;

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
      this.$localStorage.set('S8', JSON.stringify(this.selected));
      this.$router.push({ path: 'pants' });
    },
  },
  async created() {
    await this.setClothes({
      type: 'shirt',
      text: '셔츠',
    });

    let localStorage = this.$localStorage.get('S8');

    if (this.Authentication.authenticated) {
      if (!this.mypageStyleData.bust_size) await this.setMypageStyle();

      const exceptClothes = this.mypageStyleData.except_clothes_code.split(',');

      if (this.selected.length <= 0) {
        for (let i = 0; i < exceptClothes.length; i += 1) {
          for (let j = 0; j < this.dataList.length; j += 1) {
            if (exceptClothes[i] === this.dataList[j].code.toString()) {
              this.pickClothes({ type: 'shirt', id: this.dataList[j].code });
              break;
            }
          }
        }
      }
    } else if (localStorage) {
      localStorage = JSON.parse(localStorage);
      if (this.selected.length <= 0) {
        for (let i = 0; i < localStorage.length; i += 1) {
          this.pickClothes({ type: 'shirt', id: localStorage[i] });
        }
      }
    }
  },
  mounted() {
  },
};
</script>

<style scoped>
</style>
