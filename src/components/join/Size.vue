<template>
  <div class="size">
    <p class="size-title">사이즈</p>
    <p
      class="size-text">
      즐겨입는 옷의 사이즈와 체형 관련 정보를 입력해주세요.
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
                  v-for="(data, idx) in setSize.blouse"
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
                  v-for="(data, idx) in setSize.skirt"
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
                  v-for="(data, idx) in setSize.pants"
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
              <p class="text" ref="bodyTypeText">마른 일자형 몸매로, 허리둘레와 엉덩이 둘레가 거의  같고 상체에 곡선이 발달되지 않았습니다.</p>
              <ul class="body-type-list">
                <template v-for="(data, idx) in setSize.body_type">
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
          <span v-if="$mq !== 'sm'">정보 수정하기</span>
          <span v-else>다음</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Codes from '@/library/api/codes';

export default {
  name: 'size',
  data() {
    return {
      setSize: {},
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
        this.$refs.bodyTypeText.innerText = data.description;
      }
    },
    btnNextStep() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.$localStorage.set('Size', JSON.stringify(this.sizeData));
          this.btnSetSize(this.sizeData);
          this.$router.push({
            path: 'styling',
          });
        } else {
          alert('Error');
        }
      });
    },
  },
  mounted() {
    const localStorage = this.$localStorage.get('Size');
    if (localStorage) {
      this.sizeData = JSON.parse(localStorage);
    }
  },
  created() {
    const $this = this;
    Codes.getSize().then(function(res) {
      $this.setSize = res.data;
    }).catch(function(err) {
      console.error(err);
    });
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
  .line {
    border-width: 2px;
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
      user-select: none;
      cursor: pointer;
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
  .btn-next {
    position: fixed;
    left:0;
    right: 0;
    bottom: 0;
    button {
      width: 100%;
      height: 60px;
      font-size: 18px;
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
      letter-spacing: -0.6px;
      padding: 12px 27px;
    }
    .body-type-list {
      text-align: left;
      li {
        text-align: center;
      }
    }
  }
  .btn-next {
    position: relative;
    text-align: right;
    button {
      width: 288px;
      height: 60px;
      margin-top: 29px;
      font-size: 16px;
    }
  }
}
</style>
