<template>
  <div class="size">
    <p class="size-title">사이즈</p>
    <p
      v-if="$mq === 'lg'"
      class="size-text">
      즐겨입는 옷의 사이즈와 체형 관련 정보를 입력해주세요.
    </p>
    <p
      v-else
      class="size-text">
      즐겨입는 옷의 사이즈와 체형 관련 정보를 <br/>입력해주세요.
    </p>
    <div class="line line__default"></div>
    <form>
      <div class="contents">
        <div class="content">
          <div class="blouse">
            <p class="txt-point">블라우스/셔츠</p>
            <div class="flex-list">
              <ul>
                <li
                  v-for="(data, idx) in sizes.blouse"
                  :key="idx"
                  :class="{selected: sizeData.blouseSize === data.code}"
                  @click="setData('blouseSize', data.code)">
                  {{ data.name }}
                </li>
              </ul>
            </div>
          </div>
          <div class="skirt">
            <p class="txt-point">치마</p>
            <div class="flex-list">
              <ul>
                <li
                  v-for="(data, idx) in skirtData"
                  :key="idx"
                  :class="{selected: sizeData.skirtSize === data.code}"
                  @click="setData('skirtSize', data.code)">
                  {{ data.size }}
                </li>
              </ul>
            </div>
          </div>
          <div class="pants">
            <p class="txt-point">바지 (inch)</p>
            <div class="flex-list">
              <ul>
                <li
                  v-for="(data, idx) in pantsData"
                  :key="idx"
                  :class="{selected: sizeData.pantsSize === data.code}"
                  @click="setData('pantsSize', data.code)">
                  {{ data.size }}
                </li>
              </ul>
            </div>
          </div>
          <div class="height">
            <p class="txt-point">키 (cm)</p>
            <div
              :class="{error: errors.has('height')}">
              <div>
                <input
                  type="number"
                  class="form-input"
                  name="height"
                  maxlength="3"
                  v-model="sizeData.tallSize"
                  v-validate="'required'"
                  placeholder="최근 측정한 키를 입력해주세요.">
              </div>
              <p
                class="txt-error"
                v-show="errors.has('height')">
                키를 입력해주세요.
              </p>
            </div>
          </div>
        </div>
        <div class="content">
          <div class="chest">
            <p class="txt-point">가슴 (브래지어)</p>
            <div
              :class="{error: errors.has('chest')}">
              <div>
                <input
                  type="text"
                  class="form-input"
                  v-model="sizeData.bustSize"
                  name="chest"
                  v-validate="'required'"
                  placeholder="예) 80A">
              </div>
              <p
                class="txt-error"
                v-if="errors.has('chest')">
                가슴을 입력해주세요.
              </p>
            </div>

          </div>
          <div class="body-type">
            <p class="txt-point">체형</p>
            <div>
              <p class="text">마른 일자형 몸매로, 허리둘레와 엉덩이 둘레가 거의  같고 상체에 곡선이 발달되지 않았습니다.</p>
              <ul class="body-type-list">
                <template v-for="(data, idx) in bodyTypeData">
                  <li
                    :class="{selected: sizeData.bodyType === data.code}"
                    @click="setData('bodyType', data.code)"
                    :key="idx">
                    <img :src="data.image"/>
                  </li>
                </template>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div class="btn-next">
        <button
          type="button"
          class="btn btn-primary"
          @click="btnNextStep">
          다음
        </button>
      </div>
    </form>
  </div>
  <!--<div class="size subContent mauto size-margin">
    <div class="content-title mt70">
      <span v-show="!this.Authentication.authenticated">사이즈</span>
      <styleMenu v-show="this.Authentication.authenticated" menuTitle="사이즈"></styleMenu>
    </div>
    <div class="explain mt10">
      다음 질문들은 스타일리스트가 체형을 정확히 파악하여 연출하는데 도움이 됩니다.
    </div>
    <div class="sizeLine mt25"></div>
    <div class="content-form mauto">
      <sizeTooltip ref="tall" :dataId="0" sizeTitle="키" customTooltip="최근에 측정된 키를 입력해주세요."></sizeTooltip>
      <div class="tall-input-group" :class="{ error: errors.has('tall') }">
        <div class="tall-input">
          <input type="number" name="tall" class="form-login-input" placeholder="최근 측정한 키를 입력" v-validate="'required'" maxlength="3"/>
        </div>
        <div class="tall-input-unit">cm</div>
      </div>
      <div class="field">
        <span class="error" v-show="errors.has('tall')" style="text">키를 입력해주세요.</span>
      </div>
      <sizeTooltip
        ref="bust"
        :bustError.sync="bustError"
        :dataId="1"
        :dataSet="[75, 80, 85, 90]"
        :initData="initData"
        sizeUnit="cm"
        sizeTitle="가슴"
        customTooltip="평상시 착용 하시는 브래지어 사이즈에서 앞에 있는 숫자를 입력해 주세요. 예를 들어 지금 착용하신 브래지어에 80A 이라고 라벨에 적혀 있다면, 80 이라고 입력 해주세요.">
      </sizeTooltip>
      <div class="field">
        <span class="error" v-show="!initFlag && bustError">가슴 사이즈를 선택해주세요.</span>
      </div>
      <sizeTooltip
        ref="waist"
        :waistError.sync="waistError"
        :dataId="2"
        :dataSet="[24, 26, 28, 30]"
        :initData="initData"
        sizeUnit="inch"
        sizeTitle="허리"
        customTooltip="즐겨 입으시는 바지의 인치를 입력 해주세요.">
      </sizeTooltip>
      <div class="field">
        <span class="error" v-show="!initFlag && waistError">허리 사이즈를 선택해주세요.</span>
      </div>
      <sizeTooltip
        ref="hip"
        :hipError.sync="hipError"
        :dataId="3"
        :dataSet="[80, 85, 90, 95]"
        :initData="initData"
        sizeUnit="cm"
        sizeTitle="힙"
        customTooltip="평상시 착용 하시는 팬티의 사이즈 숫자를 입력해 주세요. 예를 들어 지금 착용하신 팬티에 90 이라고 라벨에 적혀 있다면, 90이라고 입력 해주세요.">
      </sizeTooltip>
      <div class="field">
        <span class="error" v-show="!initFlag && hipError">힙 사이즈를 선택해주세요.</span>
      </div>
      <styleButton currentLocation="size" currentNumber="1"></styleButton>
    </div>
  </div>-->
</template>

<script>
//   export default {
//   name: 'size',
//   data() {
//     return {
//       clickCount: 0,
//       initFlag: true,
//       bustError: true,
//       waistError: true,
//       hipError: true,
//       initData: {},
//       sizeData: {
//         blouse: 44,
//         skirt: 44,
//         pants: 25,
//         height: null,
//         chest: null,
//         bodyType: 1,
//       },
//     };
//   },
//   components: {
//     SizeTooltip,
//     StyleMenu,
//     StyleButton,
//     ToolTip,
//   },
//   computed: {
//     ...mapGetters({
//       Authentication: 'login/Authentication',
//       mypageStyleData: 'mypage/getMypageStyleData',
//     }),
//   },
//   methods: {
//     ...mapActions({
//       setSizeData: 'signup/setSizeData',
//       setMypageStyle: 'mypage/setMypageStyle',
//       setMypageCache: 'mypage/setMypageCache',
//     }),
//     setData(type, data) {
//       this.sizeData[type] = data;
//     },
//     btnNextStep() {
//       this.$validator.validateAll().then((result) => {
//         if (result) {
//           this.$router.push({
//             path: 'styling',
//           });
//         } else {
//           alert('Error');
//         }
//       });
//     },
//     toolTipEvt() {
//       this.$refs.mtooltip.toolTipEvt();
//     },
//     loadSize(type) {
//       let rtn = 0;
//       if (type === 'tall') rtn = (this.mypageStyleData.tall_size) ? this.mypageStyleData.tall_size : 0;
//       else if (type === 'bust') rtn = (this.mypageStyleData.bust_size) ? this.mypageStyleData.bust_size : 0;
//       else if (type === 'waist') rtn = (this.mypageStyleData.waist_size) ? this.mypageStyleData.waist_size : 0;
//       else if (type === 'hip') rtn = (this.mypageStyleData.hip_size) ? this.mypageStyleData.hip_size : 0;
//
//       return rtn;
//     },
//     stylingMenuOnoff() {
//       const mnu = document.querySelector('.content-menu-box');
//
//       if (mnu.style.display === 'none') mnu.style.display = 'block';
//       else mnu.style.display = 'none';
//     },
//     async saveSize() {
//       const sizeData = {
//         tall: document.querySelector('input[name=tall]').value,
//         bust: this.$refs.bust.value,
//         waist: this.$refs.waist.value,
//         hip: this.$refs.hip.value,
//       };
//       await this.setSizeData(sizeData);
//       this.$localStorage.set('S1', JSON.stringify(sizeData));
//     },
//     moveNext() {
//       this.initFlag = false;
//       this.$validator.validateAll().then((result) => {
//         if (result) {
//           if (!this.bustError && !this.waistError && !this.hipError) {
//             this.saveSize();
//             this.$router.push({ path: 'styling' });
//           }
//         }
//       });
//     },
//   },
//   async mounted() {
//     let localStorage = this.$localStorage.get('S1');
//
//     if (this.Authentication.authenticated) {
//       if (!this.mypageStyleData.bust_size) await this.setMypageStyle();
//       document.querySelector('input[name=tall]').value = this.mypageStyleData.tall_size;
//       this.initData = {
//         bust: this.mypageStyleData.bust_size,
//         waist: this.mypageStyleData.waist_size,
//         hip: this.mypageStyleData.hip_size,
//       };
//     } else if (localStorage) {
//       localStorage = JSON.parse(localStorage);
//       document.querySelector('input[name=tall]').value = localStorage.tall;
//       this.setMypageCache({
//         tall_size: localStorage.tall,
//         bust_size: localStorage.bust,
//         waist_size: localStorage.waist,
//         hip_size: localStorage.hip,
//       });
//       this.initData = {
//         bust: localStorage.bust,
//         waist: localStorage.waist,
//         hip: localStorage.hip,
//       };
//     }
//   },
// };
import { mapActions, mapGetters } from 'vuex';
import Codes from '@/library/api/codes';
import SizeTooltip from '@/components/join/SizeTooltip';
import StyleMenu from '@/components/join/common/StyleMenu';
import StyleButton from '@/components/join/common/StyleButton';
import ToolTip from '@/components/join/common/ToolTip';

export default {
  name: 'size',
  data() {
    return {
      sizes: {},
      blouseData: [
        {
          size: 44,
          code: 13801,
        },
        {
          size: 55,
          code: 13802,
        },
        {
          size: 66,
          code: 13803,
        },
        {
          size: 77,
          code: 13804,
        },
      ],
      skirtData: [
        {
          size: 44,
          code: 13901,
        },
        {
          size: 55,
          code: 13902,
        },
        {
          size: 66,
          code: 13903,
        },
        {
          size: 77,
          code: 13904,
        },
      ],
      pantsData: [
        {
          size: 25,
          code: 14001,
        },
        {
          size: 26,
          code: 14002,
        },
        {
          size: 27,
          code: 14003,
        },
        {
          size: 28,
          code: 14004,
        },
        {
          size: 29,
          code: 14005,
        },
        {
          size: 30,
          code: 14006,
        },
        {
          size: 31,
          code: 14007,
        },
      ],
      bodyTypeData: [
        {
          image: '/static/img/signup/img_body1.png',
          code: 12701,
        },
        {
          image: '/static/img/signup/img_body2.png',
          code: 12702,
        },
        {
          image: '/static/img/signup/img_body3.png',
          code: 12703,
        },
        {
          image: '/static/img/signup/img_body4.png',
          code: 12704,
        },
        {
          image: '/static/img/signup/img_body5.png',
          code: 12705,
        },
      ],
      sizeData: {
        tallSize: null,
        bustSize: null,
        blouseSize: null,
        skirtSize: null,
        pantsSize: null,
        bodyType: null,
      },
    };
  },
  components: {
    SizeTooltip,
    StyleMenu,
    StyleButton,
    ToolTip,
  },
  computed: {
    ...mapGetters({
      Authentication: 'login/Authentication',
      mypageStyleData: 'mypage/getMypageStyleData',
    }),
  },
  methods: {
    ...mapActions({
      setSizeData: 'signup/setSizeData',
      setMypageStyle: 'mypage/setMypageStyle',
      setMypageCache: 'mypage/setMypageCache',
    }),
    setData(type, data) {
      this.sizeData[type] = data;
    },
    btnNextStep() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.$localStorage.set('s1', JSON.stringify(this.sizeData));
          this.$router.push({
            path: 'styling',
          });
        } else {
          alert('Error');
        }
      });
    },
    async getSizes() {
      const result = await Codes.getSizes();
      this.sizes = { ...result.data };
    },
  },
  mounted() {
    const localStorage = this.$localStorage.get('s1');
    if (localStorage) {
      this.sizeData = JSON.parse(localStorage);
    }
    this.getSizes();
  },
};

</script>

<style scoped lang="scss">
  .size {
    padding: {
      top: 24px;
      left: 20px;
      right: 20px;
      bottom: 86px;
    }
  }
  .size-title {
    font-size: 26px;
    line-height: 34px;
    letter-spacing: -1.4px;
    text-align: center;
  }
  .size-text {
    font-size: 14px;
    line-height: 20px;
    letter-spacing: -0.8px;
    color: #797979;
    text-align: center;
    margin-top: 3px;
  }
  .txt-point {
    margin-bottom: 13px;
  }

  .line {
    margin-top: 17px;
    margin-bottom: 17px;
  }
  .blouse {

  }
  .skirt {
    // 35.8
    margin-top: 36px;
  }
  .pants {
    margin-top: 36px;
  }
  .height {
    margin-top: 36px;
  }
  .chest {
    margin-top: 35px;
  }
  .body-type {
    margin-top: 36px;
  }

  .flex-list {
    ul {
      list-style: none;
      padding: 0;
      display: flex;
      flex-wrap: wrap;
      margin-left: 1px;
      margin-top: 1px;
      background: #f5f5f5;
    }
    li {
      flex: 0 4 calc(25% + 1px);
      position: relative;
      border: 1px solid #c4c4c4;
      margin-left: -1px;
      margin-top: -1px;
      line-height: 48px;
      text-align: center;
      color: #bbb;
      letter-spacing: -0.6px;
      background: #fff;
      &.selected {
        font-weight: 700;
        color: #333;
        z-index: 10;
        outline: 2px solid #333;
        outline-offset: -2px;
      }
    }
  }
  .body-type {
    .text {
      text-align: center;
      font-size: 14px;
      color: #797979;
      line-height: 20px;
      letter-spacing: -0.8px;
      padding: 9px 27px 11.3px;
      background-color: #f5f5f5;
      margin-bottom: 10px;
    }
    .body-type-list {
      list-style: none;
      font-size: 0;
      text-align: center;
      margin-left: -8px;
      margin-top: -10px;
      li {
        display: inline-block;
        margin-left: 8px;
        margin-top: 10px;
        width: 106px;
        height: 178px;
        border: 1px solid #c4c4c4;
        img {
          max-width: 100%;
          max-height: 100%;
          opacity: 0.3;
        }
        &.selected {
          outline: 2px solid #333;
          outline-offset: -2px;
          opacity: 1;
          img {
            opacity: 1;
          }
        }
      }
    }
  }
  .btn-next {
    position: fixed;
    left:0;
    right: 0;
    bottom: 0;
    button {
      width: 100%;
    }
  }

.sizeLine {
  height: 1px;
  opacity: 0.2;
  background-color: #333333;
}

.size-tt-text {
  width: 392px;
  text-align: left;
  font-size: 16px;
  font-weight: 600;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: -0.4px;
  color: #333333;
}

.fa-exclamation-circle {
  display: none;
}

.tooltipLocation {
  position: absolute;
  z-index: 5;
  left: -1%;
  top: 24%;
}

.tall-input-group {
  width: 392px;
  display: table;
  table-layout: fixed;
  padding: 0;
  height: 50px;
}

.tall-input {
  display: table-cell;
  text-align: center;
  width: 75%;
}

.tall-input-unit {
  display: table-cell;
  vertical-align:bottom;
  text-align: left;
  padding-left: 15px;
  height: 50px;
  font-size: 16px;
  font-weight: 300;
  padding-bottom: 10px;
}

.field {
  text-align: left;
}

/* Desktop Style */
@media screen and (min-width:767px){
  .size {
    width: 795px;
    margin: 0 auto;
    padding: 74px 0 0 0;
  }
  .size-title {
    font-size: 32px;
    line-height: 40px;
    letter-spacing: -1.7px;
  }
  .size-text {
    font-size: 16px;
    line-height: 23px;
    letter-spacing: -0.6px;
    margin-top: 5px;
  }
  .line {
    margin-top: 26px;
    margin-bottom: 24px;
  }
  .contents {
    display: flex;
    border-bottom: 1px solid #333;
    .content {
      &:nth-child(1){
        width: 387.5px;
        padding-right: 53.5px;
        border-right: 1px solid #e9e9e9;
      }
      &:nth-child(2){
        width: 405.5px;
        padding-left: 39.5px;
        padding-right: 32px;
      }
    }
  }
  .skirt {
    margin-top: 33px;
  }
  .pants {
    margin-top: 35px;
  }
  .height {
    margin-top: 33px;
  }
  .chest {
    margin-top: 0;
  }
  .body-type {
    margin-top: 33px;
  }

  .body-type {
    .body-type-list {
      text-align: left;
      li {
        text-align: center;
      }
    }
  }
}
</style>
