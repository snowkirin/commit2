<template>
  <div class="patterns subContent mauto">
    <div class="content-title mt30">
      기피 재질
      <styleMenu v-show="this.Authentication.authenticated" leftSize="59%"></styleMenu>
    </div>
    <div class="explain mt15">
      받고 싶지 않은 스타일을 모두 선택해주세요.
    </div>
    <div class="patternsLine mt25"></div>
    <div class="patterns-form w100 mt40 mauto">
      <template v-for="(data, k) in printDataList">
        <div
          v-bind:key="k"
          class="patterns-card d-inlineblock"
          :data-id="data.code"
          :data-selected="data.selected"
          :class="{ 'card-oncolor': data.selected }"
          @click="pickManagement({ type: 'material', id: data.code })"
        >
          <div class="patterns-images">
            {{ data.description }}
          </div>
          <div class="patterns-text">
            {{ data.name }}
          </div>
          <div class="patterns-btn" :class="{ 'card-btn-oncolor': data.selected }">
            <div class="btn-times" :class="{ 'on': data.selected }"></div>
          </div>
        </div>
      </template>
    </div>

    <styleButton customCss="float: right;" :lastPage="true"></styleButton>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import StyleMenu from '@/components/join/common/StyleMenu';
import StyleButton from '@/components/join/common/StyleButton';

export default {
  name: 'material',
  components: {
    StyleMenu,
    StyleButton,
  },
  computed: {
    ...mapGetters({
      dataList: 'signup/getMaterial',
      selected: 'signup/getSelectMaterial',
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
      this.$localStorage.set('S12', JSON.stringify(this.selected));
      this.$router.push({ path: 'requirement' });
    },
  },
  async created() {
    await this.setManagement({
      type: 'material',
      code: this.$const.MANAGEMENT_MATERIAL,
    });

    let localStorage = this.$localStorage.get('S12');

    if (this.Authentication.authenticated) {
      if (!this.mypageStyleData.bust_size) await this.setMypageStyle();

      const exceptData = this.mypageStyleData.except_material_code.split(',');

      if (this.selected.length <= 0) {
        for (let i = 0; i < exceptData.length; i += 1) {
          for (let j = 0; j < this.dataList.length; j += 1) {
            if (exceptData[i] === this.dataList[j].code.toString()) {
              this.pickManagement({ type: 'material', id: this.dataList[j].code });
              break;
            }
          }
        }
      }
    } else if (localStorage) {
      localStorage = JSON.parse(localStorage);
      if (this.selected.length <= 0) {
        for (let i = 0; i < localStorage.length; i += 1) {
          this.pickManagement({ type: 'material', id: localStorage[i] });
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
  background-color: #333333;
}

.patterns-card {
  width: 186px;
  height: 186px;
  background-color: #FFFFFF;
  border: solid 2px #dadada;
  position: relative;
  border-radius: 50%;
  margin: 12px 10px 0 0;
  cursor: pointer;
}

.patterns-images {
  padding: 15px;
  width: 160px;
  height: 180px;
}

.patterns-text {
  font-size: 16px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: normal;
  text-align: center;
  color: #333333;
  position: absolute;
  opacity: 1;
  top: 50%;
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
</style>
