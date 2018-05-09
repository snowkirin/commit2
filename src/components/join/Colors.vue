<template>
  <div class="colors subContent mauto">
    <div class="content-title mt70">
      <span id="menuTitle">색상 선택</span>
      <styleMenu v-show="this.Authentication.authenticated" :leftSize="leftSize"></styleMenu>
    </div>
    <div class="explain mt8">
      스타일링을 위한 색상 선택에 활용됩니다.
    </div>
    <div class="colorsLine mt25"></div>
    <div class="colors-form d-flex mt30 w100">
      <div class="colors-area">
        <div class="colors-title-detail">선호 색상(손이 가는 옷 색)</div>
        <template v-for="(color, k) in colors">
          <div class="colors-card"
            v-bind:key="k"
            v-on:mouseover="cardMouseOver"
            v-on:mouseout="cardMouseOut"
            :style="(prefer.indexOf(color.code) > -1 ?
            {
              backgroundColor: `#${color.code}`,
              color: (color.code === 'FFFFFF' || color.code === '') ? '#212121' : '#FFFFFF',
              border: (color.code === 'FFFFFF' || color.code === '') ? (color.code === 'FFFFFF') ? '2px solid #212121' : '2px solid #212121' : null,
              boxSizing: (color.code === 'FFFFFF' || color.code === '') ? 'border-box' : null,
              margin: ((k+1) % 3 === 2) ? '12px 12px 0 12px' : null,
            } : {
              margin: ((k+1) % 3 === 2) ? '12px 12px 0 12px' : null,
            } )"
            :data-selected="(prefer.indexOf(color.code) > -1 ? true : false)"
            :data-color="color.code"
            @click="colorPick($event, 'prefer')"
          >
            {{ color.text }}
          </div>
        </template>
      </div>
      <div class="colors-area-line" style="width: 8%; position: relative;">
        <div class="line"></div>
      </div>
      <div class="colors-area colors-area-last">
        <div class="colors-title-detail">기피 색상(손이 덜 가는 옷 색)</div>
        <template v-for="(color, k) in colors">
          <div class="colors-card"
            v-bind:key="k"
            v-on:mouseover="cardMouseOver"
            v-on:mouseout="cardMouseOut"
            :style="(except.indexOf(color.code) > -1 ?
            {
              backgroundColor: `#${color.code}`,
              color: (color.code === 'FFFFFF' || color.code === '') ? '#212121' : '#FFFFFF',
              border: (color.code === 'FFFFFF' || color.code === '') ? (color.code === 'FFFFFF') ? '2px solid #212121' : '2px solid #212121' : null,
              boxSizing: (color.code === 'FFFFFF' || color.code === '') ? 'border-box' : null,
              margin: ((k+1) % 3 === 2) ? '12px 12px 0 12px' : null,
            } : {
              margin: ((k+1) % 3 === 2) ? '12px 12px 0 12px' : null,
            } )"
            :data-selected="(except.indexOf(color.code) > -1 ? true : false)"
            :data-color="color.code"
            @click="colorPick($event, 'except')"
          >
            {{ color.text }}
          </div>
        </template>
      </div>
    </div>

    <styleButton btnMarginTop="40px" customCss="float: right;" currentNumber="3"></styleButton>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import StyleMenu from '@/components/join/common/StyleMenu';
import StyleButton from '@/components/join/common/StyleButton';

export default {
  name: 'colors',
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
      colors: 'signup/getColors',
      prefer: 'signup/getPreferColors',
      except: 'signup/getExceptColors',
      Authentication: 'login/Authentication',
      mypageStyleData: 'mypage/getMypageStyleData',
    }),
  },
  methods: {
    ...mapActions({
      setColors: 'signup/setColors',
      pickColors: 'signup/pickColors',
      setMypageStyle: 'mypage/setMypageStyle',
    }),
    cardMouseOver(evt) {
      const obj = evt;
      const title = obj.target.querySelector('.colors-card-text');
      const color = obj.target.getAttribute('data-color');
      const selected = obj.target.getAttribute('data-selected');
      const textColor = (color !== '000000') ? '212121' : 'FFFFFF';

      if (selected !== 'true') {
        if (obj.target) {
          obj.target.style.backgroundColor = `#${color}`;
          obj.target.style.color = `#${textColor}`;
        }
        if (title) {
          title.style.backgroundColor = `#${obj.target.getAttribute('data-color')}`;
          title.style.color = `#${textColor}`;
        }
      }
    },
    cardMouseOut(evt) {
      const obj = evt;
      const title = obj.target.querySelector('.colors-card-text');
      const selected = obj.target.getAttribute('data-selected');

      if (selected !== 'true') {
        if (obj.target) {
          obj.target.style.backgroundColor = '#F4F4F4';
          obj.target.style.color = '#212121';
        }
        if (title) {
          title.style.backgroundColor = '#F4F4F4';
          title.style.color = '#212121';
        }
      }
    },
    colorPick(evt, type) {
      this.pickColors({
        type,
        color: evt.target.getAttribute('data-color'),
      });
    },
    moveNext() {
      this.$localStorage.set('S3', JSON.stringify({
        prefer: this.prefer,
        except: this.except,
      }));

      this.$router.push({ path: 'blouse' });
    },
    fnPickColors(arr, type) {
      for (let i = 0; i < arr.length; i += 1) {
        this.pickColors({
          type,
          color: arr[i],
        });
      }
    },
  },
  async created() {
    this.setColors();
    let localStorage = this.$localStorage.get('S3');

    if (this.Authentication.authenticated) {
      if (!this.mypageStyleData.bust_size) await this.setMypageStyle();

      const getPreferColor = this.mypageStyleData.prefer_color_desc ? this.mypageStyleData.prefer_color_desc.split(',') : [];
      const getExceptColor = this.mypageStyleData.except_color_desc ? this.mypageStyleData.except_color_desc.split(',') : [];

      if (this.prefer.length <= 0) this.fnPickColors(getPreferColor, 'prefer');
      if (this.except.length <= 0) this.fnPickColors(getExceptColor, 'except');
    } else if (localStorage) {
      localStorage = JSON.parse(localStorage);
      if (this.prefer.length <= 0) this.fnPickColors(localStorage.prefer, 'prefer');
      if (this.except.length <= 0) this.fnPickColors(localStorage.except, 'except');
    }
  },
  mounted() {
    this.leftSize = (document.getElementById('menuTitle').offsetWidth / 2) + 10;
  },
};
</script>

<style scoped>
.line {
  width: 1px;
  height: 100%;
  background-color: #dadada;
  margin: auto;
}

.colors {
  text-align: center;
}

.colorsLine {
  height: 1px;
  opacity: 0.2;
  background-color: #212121;
}

.colors-area {
  width: 48.5%;
}

.colors-title-detail {
  font-size: 16px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: normal;
  text-align: left;
  color: #212121;
  margin-bottom: 5px;
}

.colors-card-list {
}

.colors-card {
  width: 118px;
  height: 56px;
  line-height: 54px;
  display: inline-block;
  vertical-align: middle;
  background-color: #f4f4f4;
  font-size: 18px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: -0.5px;
  color: #212121;
  cursor: pointer;
  margin-top: 12px;
  float: left;
}

.colors-card-text {
  position: relative;
  top: 25%;
}

.mt12 {
  margin-top: 12px;
}

.colors-block {
  display: inline-block;
  width: 2.5%;
}

#menuTitle {
  display: inline-block;
}

@media screen and (max-width: 486px) {
  .colors {
    padding: 0 4.8% 100px 4.8%;
  }

  .colors-form {
    display: block;
    width: fit-content;
  }

  .colors-area {
    display: inline-block;
    width: 100%;
  }

  .colors-card {
    width: 30.8%;
  }

  .colors-area-line {
    display: none;
  }

  .colors-area-last {
    margin-top: 40px;
  }
}

@media screen and (max-width: 360px) {
  .colors-card {
    width: 30.4%;
  }
}
</style>
