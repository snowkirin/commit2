<template>
  <div class="contents">
    <div class="contents-header">
      <h3>사이즈</h3>
      <p>즐겨입는 옷의 사이즈와 체형 관련 정보를 입력해주세요.</p>
    </div>
    <form>

      <FlexList
        title="안녕하세요~"
        :data="sizes.blouse"
        textExpress="name"
        :excludeData="['44','44반','66반','77']"
      >
      </FlexList>

      <div class="content">
        <div class="grid-flex">
          <div class="column column-left">
            <div class="row">
              <div class="form-title-wrap">
                <p class="txt-form-title">블라우스/셔츠</p>
              </div>
              <div>
                <ul class="list-flex">
                  <li
                    class="item w-25 h-50 lang-en"
                    :class="[
                      { selected: joinData.blouseSize === data.code },
                      setDisabledClass('blouse', data.name)
                    ]"
                    v-for="(data, idx) in sizes.blouse"
                    :key="idx"
                    @click="setData('blouseSize', data, $event)"
                  >
                    {{ data.name }}
                  </li>
                </ul>
              </div>
            </div>
            <div class="row">
              <div class="form-title-wrap">
                <p class="txt-form-title">치마</p>
              </div>
              <div>
                <ul class="list-flex">
                  <li
                    class="item w-25 h-50 lang-en"
                    :class="[
                      { selected: joinData.skirtSize === data.code },
                      setDisabledClass('skirt', data.name)
                    ]"
                    v-for="(data, idx) in sizes.skirt"
                    :key="idx"
                    @click="setData('skirtSize', data, $event)"
                  >
                    {{ data.name }}
                  </li>
                </ul>
              </div>
            </div>
            <div class="row">
              <div class="form-title-wrap">
                <p class="txt-form-title">바지 (inch)</p>
              </div>
              <div>
                <ul class="list-flex">
                  <li
                    class="item w-25 h-50 lang-en"
                    :class="[
                      { selected: joinData.pantsSize === data.code },
                      setDisabledClass('pants', data.name)
                    ]"
                    v-for="(data, idx) in sizes.pants"
                    v-if="data.name !== '31'"
                    :key="idx"
                    @click="setData('pantsSize', data, $event)"
                  >
                    {{ data.name }}
                  </li>
                </ul>
              </div>
            </div>
            <div class="row">
              <div class="form-title-wrap">
                <p class="txt-form-title">키 (cm)</p>
              </div>
              <div>
                <div
                  class="text-field"
                  :class="{ 'text-field-error': errors.has('tallSize') }"
                >
                  <input
                    type="text"
                    name="tallSize"
                    minlength="3"
                    maxlength="3"
                    ref="tallSize"
                    v-model="joinData.tallSize"
                    v-validate="{ required: true, regex: /^\d+$/ }"
                    data-vv-as="키"
                    placeholder="최근 측정한 키를 입력해주세요."
                  />
                </div>
                <p class="txt-error" v-show="errors.has('tallSize')">
                  {{ errors.first('tallSize') }}
                </p>
              </div>
            </div>
          </div>
          <div class="column column-right">
            <div class="row">
              <div class="form-title-wrap">
                <p class="txt-form-title">가슴둘레 (브래지어 기준)</p>
              </div>
              <div>
                <ul class="list-flex">
                  <li
                    class="item w-25 h-50 lang-en"
                    :class="{ selected: chestCircumResult === data }"
                    v-for="(data, idx) in chestCircum"
                    :key="idx"
                    @click="setData('chestCircum', data, $event)"
                  >
                    {{ data }}
                  </li>
                </ul>

                <!--
                  <div
                    class="text-field"
                    :class="{'text-field-error': errors.has('bustSize')}"
                  >
                    <input
                      type="text"
                      v-model="joinData.bustSize"
                      name="bustSize"
                      ref="bustSize"
                      v-validate="{ required: true, regex: /([0-9]{2,3})([a-fA-F]{1})$/ }"
                      placeholder="예) 80A">
                  </div>
                -->
                <p class="txt-error" v-show="errors.has('bustSize')">
                  {{ errors.first('bustSize') }}
                </p>
              </div>
            </div>
            <div class="row">
              <div class="form-title-wrap">
                <p class="txt-form-title">컵</p>
              </div>
              <div>
                <ul class="list-flex">
                  <li
                    class="item w-25 h-50 lang-en"
                    :class="{ selected: chestCupResult === data }"
                    v-for="(data, idx) in chestCup"
                    :key="idx"
                    @click="setData('chestCup', data, $event)"
                  >
                    {{ data }}
                  </li>
                </ul>
              </div>
            </div>
            <div class="row">
              <div class="form-title-wrap">
                <p class="txt-form-title">체형</p>
              </div>
              <div class="body-type">
                <p v-if="!_.isEmpty(bodyTypeText)" class="txt-body-type">
                  {{ bodyTypeText }}
                </p>
                <ul class="list-body-type">
                  <li
                    :class="{ selected: joinData.bodyType === data.code }"
                    v-for="(data, idx) in sizes.body_type"
                    :key="idx"
                    @click="setData('bodyType', data, $event)"
                  >
                    <img
                      :src="
                        `${require('@/assets/img/signup/img_body' +
                          (idx + 1) +
                          '.png')}`
                      "
                    />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="btn-complete">
        <button
          type="button"
          class="btn btn-primary h-56"
          @click="clickComplete"
        >
          <span>다음(1/4)</span>
        </button>
      </div>
    </form>
    <simplert ref="alert" :useRadius="false" :useIcon="false" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import FlexList from '@/components/join/common/FlexList';
import Simplert from 'vue2-simplert';

export default {
  name: 'size',
  data: function() {
    return {
      baseUrl: process.env.BASE_URL,
      chestCircum: [60, 65, 70, 75, 80, 85, 90, 95, 100, 105, 110, 115],
      chestCup: ['A', 'B', 'C', 'D'],
      chestCircumResult: null,
      chestCupResult: null,
      bodyTypeText: '',
      joinData: {
        tallSize: null,
        bustSize: null,
        blouseSize: null,
        skirtSize: null,
        pantsSize: null,
        bodyType: null
      }
    };
  },
  components: {
    Simplert,
    FlexList
  },
  computed: {
    ...mapGetters({
      sizes: 'common/sizes',
      // Join: 'signup/Join'
    })
  },
  methods: {
    ...mapActions({
      FETCH_SIZES: 'common/FETCH_SIZES',
      // setSizes: 'signup/setSizes',
      // setJoin: 'signup/setJoin',
      // enterJoin: 'signup/enterJoin'
    }),
    setDisabledClass(type, data) {
      // type: 블라우즈/셔츠, 치마, 바지
      if (type === 'blouse' || type === 'skirt') {
        return {
          disabled:
            data === '44' || data === '44반' || data === '66반' || data === '77'
        };
      } else if (type === 'pants') {
        return {
          disabled: data === '25' || data === '30'
        };
      }
    },
    setData(type, data, event) {
      if (!event.target.classList.contains('disabled')) {
        if (type === 'chestCircum') {
          this.chestCircumResult = data;
        } else if (type === 'chestCup') {
          this.chestCupResult = data;
        } else {
          this.joinData[type] = data.code;
          if (type === 'bodyType') {
            this.bodyTypeText = data.description;
          }
        }
      }
    },
    clickComplete() {
      let obj = {
        type: 'alert', // 타입
        customClass: 'popup-custom-class', // 커스텀 클래스 네임
        disableOverlayClick: false, // 오버레이 클릭시 닫기 방지
        customCloseBtnText: '확인' // 닫기 버튼 텍스트
      };

      if (this.joinData.blouseSize === null) {
        _.assign(obj, {
          message: '블라우스/셔츠 항목을 확인해 주세요.'
        });
        this.$refs.alert.openSimplert(obj);
        return false;
      }
      if (this.joinData.skirtSize === null) {
        _.assign(obj, {
          message: '치마 항목을 확인해 주세요.'
        });
        this.$refs.alert.openSimplert(obj);
        return false;
      }
      if (this.joinData.pantsSize === null) {
        _.assign(obj, {
          message: '바지 항목을 확인해 주세요.'
        });
        this.$refs.alert.openSimplert(obj);
        return false;
      }
      if (this.joinData.bodyType === null) {
        _.assign(obj, {
          message: '체형 항목을 확인해 주세요.'
        });
        this.$refs.alert.openSimplert(obj);
        return false;
      }
      if (_.isNull(this.chestCircumResult)) {
        _.assign(obj, {
          message: '가슴둘레 항목을 확인해 주세요.'
        });
        this.$refs.alert.openSimplert(obj);
        return false;
      }
      if (_.isNull(this.chestCupResult)) {
        _.assign(obj, {
          message: '컵 항목을 확인해 주세요.'
        });
        this.$refs.alert.openSimplert(obj);
        return false;
      }
      this.$validator.validateAll().then(result => {
        if (result) {
          // String To Number
          this.joinData.tallSize = _.parseInt(this.joinData.tallSize);
          // 가슴둘레 + 컵 합쳐서 joinData.bustSize에 넣기
          this.joinData.bustSize = this.chestCircumResult + this.chestCupResult;
          // Save Store
          this.setJoin(this.joinData);

          this.$router.push({
            path: '/join/preferred-style'
          });
        } else {
          if (this.errors.has('tallSize')) {
            this.$refs.tallSize.focus();
            return false;
          }
        }
      });
    }
  },
  async created() {
    if (_.isEmpty(this.sizes)) {
      await this.FETCH_SIZES();
    }
    // if (_.isEmpty(this.Sizes) || !_.isObject(this.Sizes)) {
    //   await this.getSizes();
    // }
    // if (!_.isEmpty(this.Join)) {
    //   const circumSize = this.Join.bustSize
    //     ? _.parseInt(this.Join.bustSize)
    //     : null; // 숫자만 가져오기
    //   const cupSize = this.Join.bustSize
    //     ? _.trim(this.Join.bustSize, circumSize)
    //     : null; //
    //   this.chestCircumResult = circumSize;
    //   this.chestCupResult = cupSize;
    //   this.joinData = {
    //     tallSize: this.Join.tallSize ? this.Join.tallSize : null,
    //     bustSize: this.Join.bustSize ? this.Join.bustSize : null,
    //     blouseSize: this.Join.blouseSize ? this.Join.blouseSize : null,
    //     skirtSize: this.Join.skirtSize ? this.Join.skirtSize : null,
    //     pantsSize: this.Join.pantsSize ? this.Join.pantsSize : null,
    //     bodyType: this.Join.bodyType ? this.Join.bodyType : null
    //   };
    // }
    //
    // this.enterJoin();
  },
  mounted: function() {
    if (this.joinData.bodyType === 12701) {
      this.bodyTypeText =
        '허리둘레와 엉덩이 둘레가 거의 같으며 골격이 잘 발달되지 않은 보이쉬한 일자형 체형입니다.';
    } else if (this.joinData.bodyType === 12702) {
      this.bodyTypeText =
        '전체적으로 어깨가 잘 발달되어 상체가 넓고 아래로 내려갈수록 점점 작아지는 체형입니다.';
    } else if (this.joinData.bodyType === 12703) {
      this.bodyTypeText =
        '전반적으로 상체에 살이 많고 배가 조금 나온, 둥글둥글한 모습을 띠고 있는 체형입니다.';
    } else if (this.joinData.bodyType === 12704) {
      this.bodyTypeText =
        '어깨에 비해서 히프 사이즈가 크고 하체로 갈수록 점점 넓어지는 한국인에게 흔히 볼 수 있는 체형입니다.';
    } else if (this.joinData.bodyType === 12705) {
      this.bodyTypeText =
        '가슴둘레와 엉덩이 둘레는 거의 비슷한데, 허리는 가는 이상적인 체형입니다.';
    }
  }
};
</script>

<style scoped lang="scss" src="@/assets/css/join-style.scss"></style>
<style scoped lang="scss">
.list-flex {
  background-color: #f5f5f5;
}
.column-left {
  .row {
    &:first-child {
      margin-top: 0;
    }
  }
}
.row {
  margin-top: 30px;
}
.txt-body-type {
  @include fontSize(14px);
  text-align: center;
  color: #797979;
  padding: 9px 27px 11.3px;
  background-color: #f5f5f5;
  margin-bottom: 10px;
}
.list-body-type {
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
/* Desktop Style */
@media screen and (min-width: 768px) {
  .body-type {
    .txt-body-type {
      @include fontSize(15px);
      padding: 12px 27px;
    }
    .list-body-type {
      text-align: center;
    }
  }
  .column > .row {
    &:nth-child(1) {
      margin-top: 0;
    }
  }
}
</style>
