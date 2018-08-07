<template>
  <div class="container">
    <div class="container-header">
      <p class="size-title">사이즈</p>
      <p class="size-text">즐겨입는 옷의 사이즈와 체형 관련 정보를 입력해주세요.</p>
      <div class="line line__default"></div>
    </div>
    <form>
      <div class="contents">
        <div class="content">
          <div class="blouse">
            <p class="txt-point">블라우스/셔츠</p>
            <div class="flex-list">
              <ul>
                <li
                  v-for="(data, idx) in sizeCode.blouse"
                  v-if="!(data.name === '44'|| data.name === '77')"
                  :key="idx"
                  @click="setData('blouseSize', data)"
                  :class="{selected: sizeData.blouseSize  === data.code}">
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
                  v-for="(data, idx) in sizeCode.skirt"
                  v-if="!(data.name === '44'|| data.name === '77')"
                  :key="idx"
                  :class="{selected: sizeData.skirtSize === data.code}"
                  @click="setData('skirtSize', data)">
                  {{ data.name }}
                </li>
              </ul>
            </div>
          </div>
          <div class="pants">
            <p class="txt-point">바지 (inch)</p>
            <div class="flex-list">
              <ul>
                <li
                  v-for="(data, idx) in sizeCode.pants"
                  v-if="!(data.name === '25'|| data.name === '31')"
                  :key="idx"
                  :class="{selected: sizeData.pantsSize === data.code}"
                  @click="setData('pantsSize', data)">
                  {{ data.name }}
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
                  v-model.number="sizeData.tallSize"
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
                  v-validate="{ required: true, regex: /([0-9]{2,3})([a-fA-F]{1})$/ }"
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
              <p class="text" v-if="bodyTypeText">
                {{ bodyTypeText }}
              </p>
              <ul class="body-type-list">
                <template v-for="(data, idx) in sizeCode.body_type">
                  <li
                    :class="{selected: sizeData.bodyType === data.code}"
                    @click="setData('bodyType', data)"
                    :key="idx">
                    <img :src="data.url"/>
                    {{data }}
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
          <span>다음</span>
        </button>
      </div>
    </form>
    <alert-modal ref="view" width="320" height="190"></alert-modal>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import AlertModal from '@/components/common/AlertModal';
import Codes from '@/library/api/codes';

export default {
  name: 'size',
  data() {
    return {
      sizeCode: {},
      bodyTypeText: '',
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
    AlertModal,
  },
  computed: {
    ...mapGetters({
      Authentication: 'login/Authentication',
      // mypageStyleData: 'mypage/getMypageStyleData',
    }),
  },
  methods: {
    ...mapActions({
      btnSetSize: 'signup/setSize',
      // setSizeData: 'signup/setSizeData',
      // setMypageStyle: 'mypage/setMypageStyle',
      // setMypageCache: 'mypage/setMypageCache',
    }),
    setData(type, data) {
      this.sizeData[type] = data.code;
      if (type === 'bodyType') {
        this.bodyTypeText = data.description;
      }
    },
    btnNextStep() {
      if (this.sizeData.blouseSize === null) {
        this.$common.viewAlertModal('블라우스/셔츠 항목을 확인해 주세요.', this.$refs, 'alert');
        return false;
      }
      if (this.sizeData.skirtSize === null) {
        this.$common.viewAlertModal('치마 항목을 확인해 주세요.', this.$refs, 'alert');
        return false;
      }
      if (this.sizeData.pantsSize === null) {
        this.$common.viewAlertModal('바지 항목을 확인해 주세요.', this.$refs, 'alert');
        return false;
      }
      if (this.sizeData.bodyType === null) {
        this.$common.viewAlertModal('체형 항목을 확인해 주세요.', this.$refs, 'alert');
        return false;
      }
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.$localStorage.set('Size', JSON.stringify(this.sizeData));
          this.btnSetSize(this.sizeData);
          this.$router.push({
            path: 'styling',
          });
        } else {
          this.$common.viewAlertModal('필수 입력 항목을 확인해 주세요.', this.$refs, 'alert');
        }
      });
    },
  },
  mounted() {
    const localStorage = this.$localStorage.get('Size');
    if (localStorage) {
      this.sizeData = JSON.parse(localStorage);
      if (this.sizeData.bodyType === 12701) {
        this.bodyTypeText = '허리둘레와 엉덩이 둘레가 거의 같으며 골격이 잘 발달되지 않은 보이쉬한 일자형 체형입니다.';
      } else if (this.sizeData.bodyType === 12702) {
        this.bodyTypeText = '전체적으로 어깨가 잘 발달되어 상체가 넓고 아래로 내려갈수록 점점 작아지는 체형입니다.';
      } else if (this.sizeData.bodyType === 12703) {
        this.bodyTypeText = '전반적으로 상체에 살이 많고 배가 조금 나온, 둥글둥글한 모습을 띠고 있는 체형입니다.';
      } else if (this.sizeData.bodyType === 12704) {
        this.bodyTypeText = '어깨에 비해서 히프 사이즈가 크고 하체로 갈수록 점점 넓어지는 한국인에게 흔히 볼 수 있는 체형입니다.';
      } else if (this.sizeData.bodyType === 12705) {
        this.bodyTypeText = '가슴둘레와 엉덩이 둘레는 거의 비슷한데, 허리는 가는 이상적인 체형입니다.'
      }
    }
  },
  created() {
    const $this = this;
    Codes.getSize().then((res) => {
      $this.sizeCode = res.data;
    }).catch((err) => {
      console.error(err);
    });
  },
};
</script>

<style scoped lang="scss">
  @mixin clearfix {
    &:after {
      content: '';
      display: block;
      clear: both;
    }
  }
  .container {
    padding: {
      top: 24px;
      left: 20px;
      right: 20px;
      bottom: 17px;
    }
    .container-header {
      .line {
        border-width: 2px;
        margin-top: 17px;
        margin-bottom: 17px;
      }
      .size-title {
        font-size: 24px;
        line-height: 32px;
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
    }
    .contents {
      .txt-point {
        margin-bottom: 13px;
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
          margin-left: 1px;
          margin-top: 1px;
          background: #f5f5f5;
          font-size: 0;
        }
        li {
          display: inline-block;
          width: calc(25% + 1px);
          position: relative;
          border: 1px solid #c4c4c4;
          margin-left: -1px;
          margin-top: -1px;
          line-height: 48px;
          text-align: center;
          color: #bbb;
          letter-spacing: -0.9px;
          background-color: #fff;
          user-select: none;
          cursor: pointer;
          font-family: 'Open Sans', '맑은 고딕', 'Malgun Gothic', sans-serif;
          font-size: 15px;
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
            cursor: pointer;
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
    }
    .btn-next {
      width: 100%;
      margin-top: 41px;
      button {
        width: 100%;
        height: 50px;
      }
    }
  }
/* Desktop Style */
@media screen and (min-width:768px){
  .container {
    width: 795px;
    margin: 0 auto;
    padding: 74px 0 0 0;
    .container-header {
      .size-title {
        font-size: 30px;
        line-height: 38px;
        letter-spacing: -2.2px;
      }
      .size-text {
        font-size: 16px;
        line-height: 23px;
        letter-spacing: -1px;
        margin-top: 5px;
      }
      .line {
        margin-top: 26px;
        margin-bottom: 24px;
      }
    }
    .contents {
      display: flex;
      border-bottom: 1px solid #333;
      padding-bottom: 30px;
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
        .text {
          font-size: 15px;
          line-height: 23px;
          letter-spacing: -0.9px;
          padding: 12px 27px;
        }
        .body-type-list {
          text-align: center;
        }
      }
    }
    .btn-next {
      position: relative;
      text-align: right;
      margin-top: 0;
      button {
        width: 288px;
        height: 60px;
        margin-top: 29px;
        font-size: 16px;
        letter-spacing: -1px;
      }
    }
  }

}
</style>
