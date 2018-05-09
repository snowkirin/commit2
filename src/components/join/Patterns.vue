<template>
  <div class="patterns subContent mauto">
    <div class="content-title mt70">
      <span v-show="!this.Authentication.authenticated">기피 패턴</span>
      <styleMenu v-show="this.Authentication.authenticated" menuTitle="기피 패턴"></styleMenu>
    </div>
    <div class="explain mt8">
      받고 싶지 않은 스타일을 모두 선택해주세요.
    </div>
    <div class="patternsLine mt25"></div>
    <div class="patterns-form w100 mauto" style="margin-top: 18px;">
      <template v-for="(data, k) in printDataList">
        <div
          v-bind:key="k"
          class="patterns-card d-inlineblock"
          :data-id="data.code"
          :data-selected="data.selected"
          :class="[k + 1 === printDataList.length ? 'closet-select-mobile' : '', {'card-oncolor': data.selected, 'pattern-mobile': (k % 2 === 0) ? (k !== 0) ? true : false : false, }]"
          @click="pickManagement({ type: 'pattern', id: data.code })"
          v-bind:style="{
            marginTop: ((k+1) % 6 === 0) ? '35px' : null,
          }"
        >
          <div class="patterns-images">
            <div v-show="data.selected" class="card-greyscale"></div>
            <div
              class="patterns-image"
              v-bind:style="{
                'background-image': (data.name !== '선택 없음') ? `url(${$common.IMAGEURL()}common/patterns/${data.code}.png)` : 'url(/static/img/signup/none_logo.png)',
              }"
            >
            </div>
          </div>
          <div class="patterns-text">
            {{ data.name }}
          </div>
          <div v-show="data.selected" class="patterns-btn" :class="{ 'card-btn-oncolor': data.selected }">
            <div class="btn-times" :class="{ 'on': data.selected }"></div>
          </div>
        </div>
      </template>
    </div>

    <styleButton customCss="float: right;" currentNumber="10" btnMarginTop="60px" :lastPage="true"></styleButton>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import StyleMenu from '@/components/join/common/StyleMenu';
import StyleButton from '@/components/join/common/StyleButton';

export default {
  name: 'patterns',
  components: {
    StyleMenu,
    StyleButton,
  },
  computed: {
    ...mapGetters({
      dataList: 'signup/getPattern',
      selected: 'signup/getSelectPattern',
      Authentication: 'login/Authentication',
      mypageStyleData: 'mypage/getMypageStyleData',
    }),
    printDataList() {
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
      setManagement: 'signup/setManagement',
      pickManagement: 'signup/pickManagement',
      setMypageStyle: 'mypage/setMypageStyle',
    }),
    cardHoverEvt(obj) {
      const target = obj;

      target.onmouseover = () => {
        if (target.getAttribute('data-selected') !== 'true') {
          target.classList.remove('card-offcolor');
          target.querySelector('.patterns-btn').classList.remove('card-btn-offcolor');

          target.classList.add('card-oncolor');
          target.querySelector('.patterns-btn').classList.add('card-btn-oncolor');
          target.querySelector('.btn-times').classList.add('on');
        }
      };

      target.onmouseout = () => {
        if (target.getAttribute('data-selected') !== 'true') {
          target.classList.remove('card-oncolor');
          target.querySelector('.patterns-btn').classList.remove('card-btn-oncolor');

          target.classList.add('card-offcolor');
          target.querySelector('.patterns-btn').classList.add('card-btn-offcolor');
          target.querySelector('.btn-times').classList.remove('on');
        }
      };
    },
    moveNext() {
      this.$localStorage.set('S11', JSON.stringify(this.selected));
      this.$router.push({ path: 'requirement' });
    },
  },
  async created() {
    await this.setManagement({
      type: 'pattern',
      code: this.$const.MANAGEMENT_PATTERN,
    });

    let localStorage = this.$localStorage.get('S11');

    if (this.Authentication.authenticated) {
      if (!this.mypageStyleData.bust_size) await this.setMypageStyle();

      const exceptData = this.mypageStyleData.except_pattern_code.split(',');

      if (this.selected.length <= 0) {
        for (let i = 0; i < exceptData.length; i += 1) {
          for (let j = 0; j < this.dataList.length; j += 1) {
            if (exceptData[i] === this.dataList[j].code.toString()) {
              this.pickManagement({ type: 'pattern', id: this.dataList[j].code });
              break;
            }
          }
        }
      }
    } else if (localStorage) {
      localStorage = JSON.parse(localStorage);
      if (this.selected.length <= 0) {
        for (let i = 0; i < localStorage.length; i += 1) {
          this.pickManagement({ type: 'pattern', id: localStorage[i] });
        }
      }
    }
  },
  mounted() {
    const patternsCard = document.querySelectorAll('.patterns-card');

    for (let i = 0; i < patternsCard.length; i += 1) {
      this.cardHoverEvt(patternsCard[i]);
    }
  },
};
</script>

<style scoped>
.patternsLine {
  height: 1px;
  opacity: 0.2;
  background-color: #212121;
}

.patterns-card {
  width: 186px;
  height: 186px;
  background-color: #FFFFFF;
  border: solid 2px #FFFFFF;
  position: relative;
  border-radius: 50%;
  margin: 12px 10px 0 0;
  cursor: pointer;
}

.patterns-images {
  position:relative;
  width: 100%;
  height: 180px;
}

.patterns-image {
  height: 186px;
  width: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  border-radius: 100px;
  -webkit-border-radius: 100px;
  -moz-border-radius: 100px;
  background-color: #f4f4f4;
}

.patterns-text {
  width: 100%;
  font-size: 18px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: normal;
  text-align: center;
  color: #333333;
  position: absolute;
  opacity: 1;
  top: 110%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

.patterns-btn {
  width: 46px;
  height: 46px;
  border-radius: 50%;
  border: solid 2px #dadada;
  background-color: #FFFFFF;
  position: absolute;
  opacity: 1;
  top: 10%;
  left: 87%;
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
  width: 30px;
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
  left: 8px;
}

div.btn-times:after {
  -webkit-transform: rotate(-45deg);
  -moz-transform: rotate(-45deg);
  transform: rotate(-45deg);
  right: 8px;
}

.on:before, .on:after {
  background-color: #FFFFFF !important;
  box-shadow: unset !important;
}

.card-oncolor {
  background-color: #ebebeb;
  border: solid 2px #fb5143;
}

.card-offcolor {
  background-color: #FFFFFF;
  border: solid 2px #dadada;
}

.card-btn-oncolor {
  background-color: #fb5143;
  border: solid 2px #fb4143;
}

.card-btn-offcolor {
  background-color: #FFFFFF;
  border: solid 2px #dadada;
}

.card-greyscale {
  background-color: rgba(0, 0, 0, 0.4);
  width: 100%;
  height: 104%;
  position: absolute;
  border-radius: 100px;
  -webkit-border-radius: 100px;
  -moz-border-radius: 100px;
}

@media screen and (max-width: 486px) {
  .patterns-image {
    height: 145px !important;
  }

  .pattern-mobile {
    margin-top: 40px !important;
  }

  .card-greyscale {
    height: 81%;
  }

  .closet-select-mobile {
    margin-bottom: 100px;
  }
}
</style>
